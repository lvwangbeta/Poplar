package com.lvwang.osf.control;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lvwang.osf.model.Post;
import com.lvwang.osf.model.Tag;
import com.lvwang.osf.model.User;
import com.lvwang.osf.service.EventService;
import com.lvwang.osf.service.FeedService;
import com.lvwang.osf.service.FollowService;
import com.lvwang.osf.service.InterestService;
import com.lvwang.osf.service.LikeService;
import com.lvwang.osf.service.PostService;
import com.lvwang.osf.service.RelationService;
import com.lvwang.osf.service.TagService;
import com.lvwang.osf.util.Dic;
import com.lvwang.osf.util.Property;

@Controller
@RequestMapping("/post")
public class PostController {
	
	@Autowired
	@Qualifier("postService")
	private PostService postService;
	
	@Autowired
	@Qualifier("relationService")
	private RelationService relationService;
	
	@Autowired
	@Qualifier("tagService")
	private TagService tagService;
	
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
	@Qualifier("likeService")
	private LikeService likeService;
	
	@RequestMapping("/{id}")
	public ModelAndView post(@PathVariable("id") int id, HttpSession session) {
		User me = (User) session.getAttribute("user");
		
		ModelAndView mav = new ModelAndView();
		User author = postService.getAuthorOfPost(id);
		mav.addObject("u", author);
		mav.addObject("follow", followService.isFollowing(me==null?0:me.getId(), author.getId()));
		mav.addObject("is_like", likeService.isLike(me==null?0:me.getId(), Dic.OBJECT_TYPE_POST, id));
		mav.addObject("post", postService.findPostByID(id));
		mav.setViewName("post/index");
		return mav;
	}
	
	@RequestMapping(value="/create", method=RequestMethod.GET)
	public String createPost() {
		return "post/create";
	}
	
	@ResponseBody
	@RequestMapping(value="/create", method=RequestMethod.POST)
	public Map<String, Object> createPost(					
						@RequestParam("title") String title,
						@RequestParam("content") String content,
						@RequestParam("post_status") int post_status,
						@RequestParam("comment_status") int comment_status,
						@RequestParam("tags") String param_tags,
						HttpSession session) {
				
		User user = (User)session.getAttribute("user");
		String post_cover = (String) session.getAttribute("post_cover");
		session.removeAttribute("post_cover");
		//1 save post
		Map<String, Object> map = postService.newPost(user.getId(), 
													  title, 
													  content, 
													  post_status, 
													  comment_status,
													  param_tags,
													  post_cover);
		String status = (String)map.get("status");
		Post post = (Post)map.get("post");
		
		
		
		//2 add event 
		if(Property.SUCCESS_POST_CREATE.equals(status)) {
			int event_id = eventService.newEvent(Dic.OBJECT_TYPE_POST, post);
			
			//3 push to followers
			List<Integer> followers = followService.getFollowerIDs(user.getId());
			followers.add(user.getId());
			feedService.push(followers, event_id);
			
			//4 push to users who follow the tags in the post
			List<Tag> tags = (ArrayList<Tag>)map.get("tags");
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
			
		}
		return map;
		
	}
	
	@ResponseBody
	@RequestMapping("/delete/{id}")
	public Map<String, Object> deletePost(@PathVariable("id") int id){
		Map<String, Object> map = new HashMap<String, Object>();
		postService.deletePost(id);
		map.put("status", Property.SUCCESS_POST_DELETE);
		return map;
	}
	
	
}
