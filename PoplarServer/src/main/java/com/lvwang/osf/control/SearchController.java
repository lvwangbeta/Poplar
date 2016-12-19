package com.lvwang.osf.control;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

@Controller
@RequestMapping("/search")
public class SearchController {

	@Autowired
	@Qualifier("feedService")
	private FeedService feedService;
	
	@Autowired
	@Qualifier("tagService")
	private TagService tagService;
	
	@Autowired
	@Qualifier("userService")
	private UserService userService;
	
	@Autowired
	@Qualifier("followService")
	private FollowService followService;
	
	@Autowired
	@Qualifier("eventService")
	private EventService eventService;
	
	@Autowired
	@Qualifier("interestService")
	private InterestService interestService;
	
	@RequestMapping("/feed")
	public ModelAndView searchFeed(@RequestParam("term") String term, HttpSession session) {
		System.out.println(term);
		User me = (User) session.getAttribute("user");
//		try {
//			//term = new String(term.getBytes("ISO-8859-1"),"UTF-8");
//		} catch (UnsupportedEncodingException e) {
//			e.printStackTrace();
//		}
		ModelAndView mav = new ModelAndView();
		mav.setViewName("search/feed");
		mav.addObject("feeds", feedService.getFeedsByTitleOrContentContains(me==null?0:me.getId(), term));
		mav.addObject("dic", new Dic());
		mav.addObject("term", term);
		return mav;
	}
	
	@RequestMapping("/feed/page/{num}")
	public ModelAndView searchFeedOfPage(@PathVariable("num") int num, 
										 @RequestParam("term") String term,
										 HttpSession session) {
		System.out.println(term);
		
		User me = (User) session.getAttribute("user");

		ModelAndView mav = new ModelAndView();
		mav.setViewName("nextpage");
		mav.addObject("feeds", feedService.getFeedsByTitleOrContentContains(me==null?0:me.getId(), term, num));
		mav.addObject("dic", new Dic());
		mav.addObject("term", term);
		return mav;
	}	
	
	@RequestMapping("/tag")
	public ModelAndView searchTag(@RequestParam("term") String term, HttpSession session) {
		User me = (User) session.getAttribute("user");
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("search/tag");
		List<Tag> tags = tagService.searchTag(term);
		mav.addObject("tags", tags);
		mav.addObject("isInterests", interestService.hasInterestInTags(me==null?0:me.getId(), tags));
		Map<Integer, List<Event>> feeds = new TreeMap<Integer, List<Event>>();
		for(Tag tag: tags){
			feeds.put(tag.getId(), feedService.getFeedsByTag(0, tag.getId(), 3));
		}
		mav.addObject("feeds", feeds);
		mav.addObject("term", term);
		mav.addObject("dic", new Dic());
		return mav;
	}

	@RequestMapping("/user")
	public ModelAndView searchUser(@RequestParam("term") String term, HttpSession session) {
		User me = (User) session.getAttribute("user");
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("search/user");
		
		List<User> users = userService.searchUserByName(term);
		mav.addObject("isFollowings", followService.isFollowing(me==null?0:me.getId(), users));
		
		Map<User, List<Event>> feeds = new HashMap<User, List<Event>>();
		for(User user: users){
			feeds.put(user, eventService.getEventsOfUser(user.getId(), 3));
		}
		mav.addObject("feeds", feeds);		
		mav.addObject("term", term);
		mav.addObject("dic", new Dic());
		return mav;
	}
	
}
