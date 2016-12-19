package com.lvwang.osf.api;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lvwang.osf.model.Album;
import com.lvwang.osf.model.Event;
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
	public Map<String, Object> newFeed(@RequestAttribute("uid") Integer id, @RequestBody String params) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		System.out.println("album upload params : " + params);
		
		Album album = toAlbum(params);
		User user = userService.findById(id);
		int albumID = ((Album) albumService.newAlbum(user.getId(), null, null, AlbumService.ALBUM_STAUS_TOBERELEASED,null).get("album")).getId();
		album.setId(albumID);
		album.setUser_id(id);
		
		List<Tag> tags = albumService.newPhotos(album);
		
		int event_id = eventService.newEvent(Dic.OBJECT_TYPE_ALBUM, album);
		//push to users who follow u
		if(event_id !=0 ) {
			feedService.push(user.getId(), event_id);
		}
		
		//push to users who follow the tags in the album
		for(Tag tag : tags) {
			List<Integer> i_users = interestService.getUsersInterestedInTag(tag.getId());
			for(int u : i_users) {
				feedService.push(u, event_id);
			}
			//cache feeds to tag list
			feedService.cacheFeed2Tag(tag.getId(), event_id);
		}
		
		map.put("album", album);
		map.put("status", Property.SUCCESS_ALBUM_CREATE);
		
		return map;
		
	}
	
	@ResponseBody
	@RequestMapping("/page/{num}")
	public Map<String, Object> nextPage(@PathVariable("num") String num_str, HttpSession session) {
		System.out.println(num_str);
		
		User user = (User)session.getAttribute("user");
		if(user == null) {
			return null;
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		int num = Integer.parseInt(num_str);
		List<Event> feeds = feedService.getFeedsOfPage(user.getId(), num);
		map.put("feeds", feeds);
		map.put("dic", new Dic());
		return map;
	}
}
