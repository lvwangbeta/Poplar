package com.lvwang.osf.control;


import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.lvwang.osf.model.Album;
import com.lvwang.osf.model.Photo;
import com.lvwang.osf.model.Tag;
import com.lvwang.osf.model.User;
import com.lvwang.osf.service.AlbumService;
import com.lvwang.osf.service.EventService;
import com.lvwang.osf.service.FeedService;
import com.lvwang.osf.service.FollowService;
import com.lvwang.osf.service.InterestService;
import com.lvwang.osf.service.TagService;
import com.lvwang.osf.service.UserService;
import com.lvwang.osf.util.Dic;
import com.lvwang.osf.util.Property;

@Controller
@RequestMapping("/album")
public class AlbumController {

	
	@Autowired
	@Qualifier("albumService") 
	private AlbumService albumService;
	
	@Autowired
	@Qualifier("eventService")
	private EventService eventService;
	
	@Autowired
	@Qualifier("feedService")
	private FeedService feedService;
	
	@Autowired
	@Qualifier("interestService")
	private InterestService interestService;
	
	@Autowired
	@Qualifier("followService")
	private FollowService followService;
	
	@Autowired
	@Qualifier("userService")
	private UserService userService;
	
	@RequestMapping("/{id}/photos")
	public ModelAndView album(@PathVariable("id") int id, HttpSession session) {
		User me = (User) session.getAttribute("user");
		
		ModelAndView mav = new ModelAndView();
		Album album = albumService.getAlbum(id);
		mav.addObject("album", album);
		
		User author = albumService.getAuthorOfALbum(id); 
		mav.addObject("u", author);
		
		mav.addObject("follow", followService.isFollowing(me==null?0:me.getId(), author.getId()));
		
		mav.setViewName("album/index");
		return mav;
	}
	
	@ResponseBody
	@RequestMapping("/{id}")
	public Album getAlbumInfo(@PathVariable("id") int id) {
		return albumService.getAlbum(id);
	}
	
	/*
	 * 相册上传页面
	 * 指定album
	 */
	@RequestMapping(value="/{album_id}/upload", method=RequestMethod.GET)
	public String albumUploadPage(@PathVariable("album_id") int id) {
		return "album/upload";
	}
	
	
	/*
	 * 相册上传页面
	 * 未指定album
	 */
	@RequestMapping(value="/upload", method=RequestMethod.GET)
	public ModelAndView albumUploadPage(HttpSession session) {
		ModelAndView mav = new ModelAndView();
		User user = (User) session.getAttribute("user");
		Integer album_id = albumService.getToBeReleasedAlbum(user.getId());
		if(album_id != null) {
			List<Photo> photos = albumService.getPhotosOfAlbum(album_id);
			session.setAttribute("album_id", album_id);
			//mav.addObject("photos", photos); 
			session.setAttribute("photos", photos);
		} else {
			session.setAttribute("photos", new ArrayList<Photo>());
		}
		mav.setViewName("album/upload");
		return mav;
	}
	
	@ResponseBody
	@RequestMapping(value="/delete/photo/{id}", method=RequestMethod.GET)
	public Map<String, Object> deletePhoto(@PathVariable("id") int id){
		Map<String, Object> map = new HashMap<String, Object>();
		albumService.deletePhoto(id);
		map.put("status", Property.SUCCESS_PHOTO_DELETE);
		return map;
	}
	
	/*
	 * 上传图片到相册
	 */
	@ResponseBody
	@RequestMapping(value="/{album_id}/upload/photo",  method=RequestMethod.POST)
	public Map<String, Object> albumUpload(@PathVariable("album_id") int album_id, 
										   @RequestParam("uploader_input") MultipartFile img, 
										   HttpSession session) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		if(img.isEmpty()) {
			map.put("status", Property.ERROR_PHOTO_EMPTY);
			return map;
		}
		
		User user = (User) session.getAttribute("user");
		//检查相册是否属于用户
		if(!Property.SUCCESS_ALBUM_ALLOWED.equals(albumService.checkUserOfAlbum(album_id, user.getId()))) {
			map.put("status", Property.ERROR_ALBUM_PERMISSIONDENIED);
			return map;
		}
		//上传图片
		Map<String, Object> photoMap = albumService.newPhoto(album_id, img, null);
		map.put("status", photoMap.get("status"));
		map.put("photo", photoMap.get("photo"));
		
		return map;
	}
	
	private Album toAlbum(String params) {
		Album album = new Album();
		ObjectMapper mapper = new ObjectMapper();
		try {
			JsonNode root = mapper.readTree(params);
			
			album.setAlbum_desc(root.path("album_desc").getTextValue());
			
			JsonNode photos = root.path("photos");
			if(photos.size() > 0) {
				album.setCover(albumService.getKeyofPhoto(
					 	  	   Integer.parseInt(photos.get(0).path("id").getTextValue())
				));
				
				List<Photo> photos2upd = new ArrayList<Photo>();
				album.setPhotos(photos2upd);
				for(int i=0; i<photos.size(); i++) {
					int photo_id = Integer.parseInt(photos.get(i).path("id").getTextValue());
					String photo_desc = photos.get(i).path("desc").getTextValue();
					Photo photo = new Photo();
					photo.setId(photo_id);
					photo.setDesc(photo_desc);
					photos2upd.add(photo);
					
					System.out.println("photo_id:"+photo_id+" desc:"+photo_desc);
				}
				album.setPhotos_count(photos2upd.size());
			}
			
			JsonNode tags = root.path("tags");
			if(tags.size() > 0) {
				List<Tag> tag_list = new ArrayList<Tag>();
				album.setAlbum_tags_list(tag_list);
				album.setAlbum_tags(TagService.toString(tag_list));
				for(int i=0; i<tags.size(); i++) {
					Tag t = new Tag();
					t.setTag(tags.get(i).getTextValue());
					tag_list.add(t);
				}
			}
			
			
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return album;
	}
	
	/*
	 * 创建相册
	 * 
	 */
	@ResponseBody
	@RequestMapping(value="/create", method=RequestMethod.POST) 
	public Map<String, Object> createAlbum(@RequestBody String params, HttpSession session) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		System.out.println(params);
		
		Album album = toAlbum(params);
		if(album.getPhotos_count() == 0) {
			map.put("status", Property.ERROR_ALBUM_EMPTY);
			return map;
		}
		
		album.setId((Integer)session.getAttribute("album_id"));
		User user = (User)session.getAttribute("user");
		album.setUser_id(user.getId());
		album.setPhotos((List<Photo>)session.getAttribute("photos") );
		List<Tag> tags = albumService.updateAlbum(album);
		
		int event_id = eventService.newEvent(Dic.OBJECT_TYPE_ALBUM, album);
		
		//push to users who follow u
		List<Integer> followers = followService.getFollowerIDs(user.getId());
		followers.add(user.getId());
		feedService.push(followers, event_id);
		
		//push to users who follow the tags
		Set<Integer> followers_set = new HashSet<Integer>();
		for(Tag tag : tags) {
			List<Integer> i_users = interestService.getUsersInterestedInTag(tag.getId());
			for(int u: i_users) {
				if(u != user.getId())
					followers_set.add(u);
			}
						
			//cache feeds to tag list
			feedService.cacheFeed2Tag(tag.getId(), event_id);
		}
		feedService.push(new ArrayList<Integer>(followers_set), event_id);
		
		map.put("album", album);
		map.put("status", Property.SUCCESS_ALBUM_UPDATE);
		return map;
	}
	
	
	
	/*
	 * 未指定相册
	 * 临时创建相册
	 */
	@ResponseBody
	@RequestMapping(value="/upload/photo", method=RequestMethod.POST)
	public Map<String, Object> uploadPhoto(@RequestParam("uploader_input") MultipartFile img,
										    HttpSession session) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(img.isEmpty()) {
			map.put("status", Property.ERROR_PHOTO_EMPTY);
			return map;
		}
		
		User user = (User) session.getAttribute("user");
		Integer album_id = (Integer)session.getAttribute("album_id");
		
		//创建临时相册
		if(album_id == null || album_id == 0) {
			Map<String, Object> albumMap = albumService.newAlbum(user.getId(), null, null, AlbumService.ALBUM_STAUS_TOBERELEASED,null);
			if(!Property.SUCCESS_ALBUM_CREATE.equals(albumMap.get("status")) ) {
				map.put("status", albumMap.get("status"));
				return map;
			}
			album_id = ((Album)albumMap.get("album")).getId();
			session.setAttribute("album_id", album_id);
		}
		
		//上传图片
		Map<String, Object> photoMap = albumService.newPhoto(album_id, img, null);
		Photo photo = (Photo)photoMap.get("photo");	
		
		List<Photo> photos = (List<Photo>)session.getAttribute("photos");
		if(photos == null) {
			photos = new ArrayList<Photo>();
			session.setAttribute("photots", photos);
		}
		photos.add(photo);
		
		map.put("status", photoMap.get("status"));	
		map.put("id", photo.getId());
		map.put("key", photo.getKey());
		return map;
	}
	
	/*
	 * post 中图片上传
	 * 
	 */
	@ResponseBody
	@RequestMapping(value="/upload/postphoto", method=RequestMethod.POST)
	public Map<String, Object> postPhotoUpload(@RequestParam("uploader_input") MultipartFile img,
										    HttpSession session) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(img.isEmpty()) {
			map.put("status", Property.ERROR_PHOTO_EMPTY);
			return map;
		}
		
		//upload photo
		map = albumService.uploadPhoto(img);
		//set post cover
		session.setAttribute("post_cover", map.get("key"));
		return map;
	}
	
	/**
	 * 上传头像 
	 * @param img
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/upload/avatar", method=RequestMethod.POST)
	public Map<String, Object> avatarUpload(@RequestParam("avatar_file") MultipartFile img,
										    HttpSession session) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(img.isEmpty()) {
			map.put("status", Property.ERROR_PHOTO_EMPTY);
			return map;
		}
		
		//upload photo
		map = albumService.uploadPhoto(img);
		
		//save to local
		albumService.saveImgToLocal(img, (String)map.get("key"));
		
		session.setAttribute("temp_avatar", map.get("key"));
		
		return map;
	}
	
	@ResponseBody
	@RequestMapping(value="/cropavatar", method=RequestMethod.POST)
	public Map<String, Object> cropAvatar(@RequestParam("x") int x,
										 @RequestParam("y") int y,
										 @RequestParam("width") int width,
										 @RequestParam("height") int height,
									     HttpSession session){
		
		//System.out.println("x:"+x+" y:"+y + " width:"+width+ " height:"+height);
		Map<String, Object> map = new HashMap<String, Object>();
		
		String key = (String) session.getAttribute("temp_avatar");
		if(key == null || key.length() == 0){
			map.put("status", Property.ERROR_AVATAR_CHANGE);
			return map;
		}
		
		String avatar_img = albumService.cropAvatar(key, x, y, width, height);
		String status = userService.changeAvatar(((User)session.getAttribute("user")).getId(), avatar_img);
		if(Property.SUCCESS_AVATAR_CHANGE.equals(status)) {
			//update session
			((User)session.getAttribute("user")).setUser_avatar(avatar_img);			
		}
		
		map.put("status", status);
		return map;
		
	}
	
	
	
}
