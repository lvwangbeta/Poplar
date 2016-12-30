package com.lvwang.osf.control;

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
import org.springframework.web.servlet.ModelAndView;

import com.lvwang.osf.model.Event;
import com.lvwang.osf.model.Tag;
import com.lvwang.osf.model.User;
import com.lvwang.osf.service.EventService;
import com.lvwang.osf.service.FeedService;
import com.lvwang.osf.service.FollowService;
import com.lvwang.osf.service.InterestService;
import com.lvwang.osf.service.TagService;
import com.lvwang.osf.service.UserService;
import com.lvwang.osf.util.Dic;
import com.lvwang.osf.util.Property;

@Controller
@RequestMapping("/explore")
public class ExploreController {
	
	@Autowired
	@Qualifier("interestService")
	private InterestService interestService;
	
	@Autowired
	@Qualifier("tagService")
	private TagService tagService;
	
	@Autowired
	@Qualifier("feedService")
	private FeedService feedService;
	
	@Autowired
	@Qualifier("eventService")
	private EventService eventService;
	
	@Autowired
	@Qualifier("userService")
	private UserService userService;
	
	@Autowired
	@Qualifier("followService")
	private FollowService followService;
	
	private static final int PAGE_COUNT_REQ_LIMIT = 3;	//未登录状态下可加载的explore页数限制
	
	
	@RequestMapping("")
	public ModelAndView explore(HttpSession session){
		ModelAndView mav = new ModelAndView();
		mav.setViewName("explore");
		
		User user = (User) session.getAttribute("user");
		
		mav.addObject("events", feedService.getRecommendFeeds(user==null?0:user.getId()));
		
		List<Tag> tags_recommend = tagService.getRecommendTags(user==null?0:user.getId());
		mav.addObject("tags", tags_recommend);
		mav.addObject("isInterests", interestService.hasInterestInTags(user==null?0:user.getId(), tags_recommend));
		
		List<User> rec_users = userService.getRecommendUsers(user==null?0:user.getId(), 4);
		mav.addObject("isFollowings", followService.isFollowing(user==null?0:user.getId(), rec_users));
		
		Map<User, List<Event>> feeds = new HashMap<User, List<Event>>();
		for(User rec_user: rec_users){
			feeds.put(rec_user, eventService.getEventsOfUser(rec_user.getId(), 4));
		}
		mav.addObject("feeds", feeds);
		mav.addObject("dic", new Dic());
		return mav;
	}
	
	@ResponseBody
	@RequestMapping("/page/{num}")
	public Map<String, Object> page(@PathVariable("num") int num, HttpSession session) {
		
		User user = (User) session.getAttribute("user");
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		if(user == null && num > PAGE_COUNT_REQ_LIMIT) {
			result.put("status", Property.ERROR_ACCOUNT_NOTLOGIN);
			return result;
		}
		
		List<Event> events = feedService.getRecommentFeedsOfPage(user==null?0:user.getId(), num);
		if(events == null || events.size() == 0) {
			result.put("status", Property.ERROR_FEED_NOMORE);
		} else {
			result.put("events", events);
			result.put("status", Property.SUCCESS_FEED_LOAD);
		}
		
		return result;
	}
}
