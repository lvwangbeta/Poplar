package com.lvwang.osf.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lvwang.osf.model.Event;
import com.lvwang.osf.model.Tag;
import com.lvwang.osf.model.User;
import com.lvwang.osf.service.FeedService;
import com.lvwang.osf.service.InterestService;
import com.lvwang.osf.service.TagService;
import com.lvwang.osf.service.UserService;
import com.lvwang.osf.util.Dic;
import com.lvwang.osf.util.Property;
import com.lvwang.osf.web.RequestAttribute;

@Controller
@RequestMapping("/api/v1/tag")
public class TagAPI {
	
	@Autowired
	@Qualifier("tagService")
	private TagService tagService;
	
	@Autowired
	@Qualifier("interestService")
	private InterestService interestService;
	
	@Autowired
	@Qualifier("feedService")
	private FeedService feedService;
	
	@Autowired
	@Qualifier("userService")
	private UserService userService;
	
	@ResponseBody
	@RequestMapping("/{tag_id}")
	public Map<String, Object> getFeedsByTag(@PathVariable("tag_id") int tag_id, HttpSession session) {

		
		Tag tag = tagService.getTagByID(tag_id);
		if(tag == null) {
			return null;
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("tag", tag.getTag());
		
		User user = (User)session.getAttribute("user");
		if(user != null) {
			map.put("isInterest", 
						  interestService.hasInterestInTag(user.getId(), tag_id));
			
		} else {
			map.put("isInterest", false);
		}
		
		List<Event> feeds = feedService.getFeedsByTagOfPage(user!=null?user.getId():0, tag_id, 1);
		map.put("feeds", feeds);
		map.put("dic", new Dic());
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/{tag_id}/page/{page}")
	public Map<String, Object> getFeedsByTagOfPage(@PathVariable("tag_id") int tag_id, 
											@PathVariable("page") int page,
											@RequestAttribute("uid") Integer id) {
		
		Tag tag = tagService.getTagByID(tag_id);
		if(tag == null) {
			return null;
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		User user = null;
		if(id != null && id !=0) {
			user = (User) userService.findById(id);
		}
		
		List<Event> feeds = feedService.getFeedsByTagOfPage(user!=null?user.getId():0, tag_id, page);
		map.put("feeds", feeds);
		map.put("dic", new Dic());
		return map;
	}
	
	
	/**
	 * 对某个标签感兴趣
	 */
	@ResponseBody
	@RequestMapping("/{tag_id}/interest")
	public Map<String, Object> interest(@PathVariable("tag_id") int tag_id, HttpSession session) {
		Map<String, Object> ret = new HashMap<String, Object>();
		
		User user = (User) session.getAttribute("user");
		interestService.interestInTag(user.getId(), tag_id);
				
		ret.put("status", Property.SUCCESS_INTEREST);
		return ret;
	}
	
	
	/**
	 * 
	 */
	@ResponseBody
	@RequestMapping("/{tag_id}/undointerest")
	public Map<String, Object> undoInterest(@PathVariable("tag_id") int tag_id, HttpSession session) {
		Map<String, Object> ret = new HashMap<String, Object>();
		
		User user = (User) session.getAttribute("user");
		interestService.undoInterestInTag(user.getId(), tag_id);
		
		ret.put("status", Property.SUCCESS_INTEREST_UNDO);
		return ret;
	}
}
