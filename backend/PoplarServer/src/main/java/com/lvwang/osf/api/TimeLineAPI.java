package com.lvwang.osf.api;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
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
import org.springframework.beans.factory.annotation.Required;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lvwang.osf.model.Album;
import com.lvwang.osf.model.Event;
import com.lvwang.osf.model.Photo;
import com.lvwang.osf.model.ShortPost;
import com.lvwang.osf.model.Tag;
import com.lvwang.osf.model.User;
import com.lvwang.osf.service.AlbumService;
import com.lvwang.osf.service.EventService;
import com.lvwang.osf.service.FeedService;
import com.lvwang.osf.service.FollowService;
import com.lvwang.osf.service.InterestService;
import com.lvwang.osf.service.ShortPostService;
import com.lvwang.osf.service.TagService;
import com.lvwang.osf.service.UserService;
import com.lvwang.osf.util.Dic;
import com.lvwang.osf.util.Property;
import com.lvwang.osf.web.RequestAttribute;

@Controller
@RequestMapping("/api/v1/timeline")
public class TimeLineAPI {

	@Autowired
	@Qualifier("userService")
	private UserService userService;
	
	@Autowired
	@Qualifier("feedService")
	private FeedService feedService;
	
	@Autowired
	@Qualifier("albumService") 
	private AlbumService albumService;
	
	@Autowired
	@Qualifier("shortPostService")
	private ShortPostService shortPostService;
	
	@Autowired
	@Qualifier("interestService")
	private InterestService interestService;
	
	@Autowired
	@Qualifier("followService")
	private FollowService followService;
	
	@Autowired
	@Qualifier("eventService")
	private EventService eventService;
	
	@ResponseBody
	@RequestMapping("/")
	public Map<String, Object> showHomePage(@RequestAttribute("uid") Integer id) {
		Map<String, Object> map = new HashMap<String, Object>();
		System.out.println("uid" + id);
		List<Event> feeds = feedService.getFeeds(id);
		map.put("feeds", feeds);		
		map.put("dic", new Dic());
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
				album.setCover(photos.get(0).path("key").getTextValue());
				
				List<Photo> photos2upd = new ArrayList<Photo>();
				album.setPhotos(photos2upd);
				for(int i=0; i<photos.size(); i++) {
					//int photo_id = Integer.parseInt(photos.get(i).path("id").getTextValue());
					String key = photos.get(i).path("key").getTextValue();
					String photo_desc = photos.get(i).path("desc").getTextValue();
					Photo photo = new Photo();
					//photo.setId(photo_id);
					photo.setKey(key);
					photo.setDesc(photo_desc);
					photos2upd.add(photo);
					
					System.out.println("photo_key:"+key+" desc:"+photo_desc);
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
	
	@ResponseBody
	@RequestMapping("/new")
	public Map<String, Object> newFeed(@RequestAttribute("uid") Integer id, @RequestBody String params) throws UnsupportedEncodingException {
		Map<String, Object> map = new HashMap<String, Object>();
		
		String _params = URLDecoder.decode(params,"utf-8");
		
		System.out.println("album upload params : " + _params);
		
		Album album = toAlbum(_params);	
		User user = userService.findById(id);
		int event_id = 0;
		List<Tag> tags = new ArrayList<Tag>();
		
		//text with no photos
		if(album.getPhotos() == null || album.getPhotos_count() == 0) {	
			if(album.getAlbum_desc() == null || album.getAlbum_desc().length() == 0) {
				map.put("status", Property.ERROR_POST_EMPTY);
				return map;
			}
			ShortPost spost = (ShortPost) shortPostService.newPost(user.getId(), album.getAlbum_desc()).get("spost");
			event_id = eventService.newEvent(Dic.OBJECT_TYPE_SHORTPOST, spost);
			
		} else {
			//new album
			int albumID = ((Album) albumService.newAlbum(user.getId(), null, null, AlbumService.ALBUM_STAUS_TOBERELEASED,null).get("album")).getId();
			album.setId(albumID);
			album.setUser_id(id);
			
			tags = albumService.newPhotos(album);
			event_id = eventService.newEvent(Dic.OBJECT_TYPE_ALBUM, album);
		}
			
		
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
	 * num: page num
	 * id: feed id
	 */
	@ResponseBody
	@RequestMapping("/page/{num}/startfrom/{id}")
	public Map<String, Object> nextPage(@PathVariable("num") Integer num, @PathVariable("id") Integer id, @RequestAttribute("uid") Integer uid) {
		System.out.println(num);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		List<Event> feeds = new ArrayList<Event>();
		if(id != null && id != 0) {
			feeds = feedService.getFeedsOfPage(uid, num, id);
		} else {
			feeds = feedService.getFeedsOfPage(uid, num);
		}
		map.put("status", Property.SUCCESS_FEED_LOAD);
		map.put("feeds", feeds);
		return map;
	}
	
	/**
	 * 获取某个用户的feeds
	 */
	@ResponseBody
	@RequestMapping("/user/{account_id}/page/{num}/startfrom/{id}")
	public Map<String, Object> getFeedsOfUser(@PathVariable("account_id") Integer account_id,  @PathVariable("num") Integer num,@PathVariable("id") Integer id, @RequestAttribute("uid") Integer uid) {
		System.out.println("GET feeds of user " + account_id + " page " + num);
		Map<String, Object> map = new HashMap<String, Object>();
		
		User user = (User)userService.findById(account_id);
		if(user == null || user.getId() == 0) {
			map.put("status", Property.ERROR_ACCOUNT_NOTEXIST);
			return map;
		}
		
		List<Event> feeds = new ArrayList<Event>();
		if(id != null && id != 0) {
			feeds = feedService.getFeedsOfPage(user.getId(), num, id);
		} else {
			feeds = feedService.getFeedsOfPage(user.getId(), num);
		}
		map.put("status", Property.SUCCESS_FEED_LOAD);
		map.put("feeds", feeds);
		//map.put("dic", new Dic());
		return map;
	}
	
}
