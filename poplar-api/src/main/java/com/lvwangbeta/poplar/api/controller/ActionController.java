package com.lvwangbeta.poplar.api.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.lvwangbeta.poplar.common.intr.FollowService;
import com.lvwangbeta.poplar.common.intr.InterestService;
import com.lvwangbeta.poplar.common.intr.LikeService;
import com.lvwangbeta.poplar.common.intr.UserService;
import com.lvwangbeta.poplar.common.model.Message;
import com.lvwangbeta.poplar.common.model.User;
import com.lvwangbeta.poplar.common.util.Property;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/api/v1/action/") 
public class ActionController {

	public static final Logger logger = LoggerFactory.getLogger(ActionController.class);

	@Reference
	private UserService userService;

	@Reference
	private LikeService likeService;

	@Reference
	private InterestService interestService;

	@Reference
	private FollowService followService;

	/*
	@Autowired
	@Qualifier("notificationService")
	private NotificationService notificationService;
	*/
	
	@ResponseBody
	@RequestMapping("/do/like/{object_type}/{object_id}/of/{author}")
	public Message like(@PathVariable("author") int author,
						@PathVariable("object_type") int object_type,
						@PathVariable("object_id") int object_id,
						@RequestAttribute("uid") Integer id){
		logger.debug("[Like begin]");
		Message message = new Message();
		User me = (User)userService.findById(id);
				
		likeService.like(me.getId(), object_type, object_id);
		message.setErrno(Property.SUCCESS_LIKE);
		/*
		Notification notification = new Notification(Dic.NOTIFY_TYPE_LIKE, 
													 0, 
													 object_type, 
													 object_id, 
													 author, 
													 me.getId()
													 );
		notificationService.doNotify(notification);
		*/
		logger.debug("[Like end]");
		return message;
	}
	
	
	@ResponseBody
	@RequestMapping("/undo/like/{object_type}/{object_id}")
	public Message undolike(@PathVariable("object_type") int object_type,
										@PathVariable("object_id") int object_id,
										@RequestAttribute("uid") Integer id){
		logger.debug("[UndoLike begin]");
		Message message = new Message();
		User me = (User)userService.findById(id);
		likeService.undoLike(me.getId(), object_type, object_id);
		message.setErrno(Property.SUCCESS_LIKE_UNDO);
		logger.debug("[UndoLike end]");
		return message;
	}


	@ResponseBody
	@RequestMapping("/do/interest/tag/{tag_id}")
	public Message interest(@PathVariable("tag_id") int tag_id, @RequestAttribute("uid") Integer id) {
		logger.debug("[Interest begin]");
		Message message = new Message();
		interestService.interestInTag(id, tag_id);
		message.setErrno(Property.SUCCESS_INTEREST);
		logger.debug("[Interest end]");
		return message;
	}


	@ResponseBody
	@RequestMapping("/undo/interest/tag/{tag_id}")
	public Message undoInterest(@PathVariable("tag_id") int tag_id, @RequestAttribute("uid") Integer id) {
		logger.debug("[UndoInterest begin]");
		Message message = new Message();
		interestService.undoInterestInTag(id, tag_id);
		message.setErrno(Property.SUCCESS_INTEREST_UNDO);
		logger.debug("[UndoInterest end]");
		return message;
	}

	@ResponseBody
	@RequestMapping("/is/interested/in/tag/{tag_id}")
	public Message isInterest(@PathVariable("tag_id") int tag_id, @RequestAttribute("uid") Integer id) {
		Message message = new Message();
		message.add("is_interest", interestService.hasInterestInTag(id, tag_id));
		message.setErrno(Property.SUCCESS);
		return message;
	}

	@ResponseBody
	@RequestMapping("/do/follow/user/{user_id}")
	public Message follow(@PathVariable("user_id") int user_id, @RequestAttribute("uid") Integer id) {
		logger.debug("[Follow begin]");
		Message message = new Message();
		User user = (User) userService.findById(id);
		boolean result = followService.newFollowing(user.getId(),
				user.getUser_name(),
				user_id,
				userService.findById(user_id).getUser_name());
		/*
		Notification notification = new Notification(Dic.NOTIFY_TYPE_FOLLOW,
				0,
				Dic.OBJECT_TYPE_USER,
				user_id,
				user_id,
				user.getId());
		notificationService.doNotify(notification);
		*/
		if(result) {
			message.setErrno(Property.SUCCESS_FOLLOW);
		} else {
			message.setTransok("1");
			message.setErrno(Property.ERROR_FOLLOW);
		}
		logger.debug("[Follow end]");
		return message;
	}

	@ResponseBody
	@RequestMapping("/undo/follow/user/{user_id}")
	public Message undoFollow(@PathVariable("user_id") int user_id, @RequestAttribute("uid") Integer id) {
		logger.debug("[UndoFollow begin]");
		Message message = new Message();
		boolean result = followService.undoFollow(id, user_id);
		if(result) {
			message.setErrno(Property.SUCCESS_FOLLOW_UNDO);
		} else {
			message.setErrno(Property.ERROR_FOLLOW_UNDO);
		}
		logger.debug("[UndoFollow end]");
		return message;
	}

	@ResponseBody
	@RequestMapping("/is/follow/{user_id}")
	public Message isFollow(@PathVariable("user_id") int user_id, @RequestAttribute("uid") Integer id) {
		Message message = new Message();
		boolean result = followService.isFollowing(id, user_id);
		message.setErrno(Property.SUCCESS);
		message.add("is_follow", result);
		return message;
	}


	/*
	@ResponseBody
	@RequestMapping("/is/follow/{user_id}")
	public Map<String, Object> isFollow(@PathVariable("user_id") int user_id, @RequestAttribute("uid") Integer id) {
		Map<String, Object> map = new HashMap<String, Object>();
		boolean result = followService.isFollowing(id, user_id);
		map.put("status", Property.SUCCESS);
		map.put("isfollow", result);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/do/follow/{user_id}")
	public Map<String, Object> follow(@PathVariable("user_id") int user_id, @RequestAttribute("uid") Integer id) {
		User user = (User) userService.findById(id);
		Map<String, Object> map = followService.newFollowing(user.getId(), 
															 user.getUser_name(), 
															 user_id, 
															 userService.findById(user_id).getUser_name());
		Notification notification = new Notification(Dic.NOTIFY_TYPE_FOLLOW, 
												     0, 
												     Dic.OBJECT_TYPE_USER, 
												     user_id, 
												     user_id, 
												     user.getId());
		notificationService.doNotify(notification);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/undo/follow/{user_id}")
	public Map<String, Object> undoFollow(@PathVariable("user_id") int user_id, @RequestAttribute("uid") Integer id) {
		Map<String, Object> map = followService.undoFollow(id, user_id);
		return map;
	}
	

	@ResponseBody
	@RequestMapping("/do/followtag/{tag_id}")
	public Map<String, Object> interest(@PathVariable("tag_id") int tag_id, @RequestAttribute("uid") Integer id) {
		Map<String, Object> ret = new HashMap<String, Object>();
		
		User user = (User) userService.findById(id);
		interestService.interestInTag(user.getId(), tag_id);
				
		ret.put("status", Property.SUCCESS_INTEREST);
		return ret;
	}
	

	@ResponseBody
	@RequestMapping("/undo/followtag/{tag_id}")
	public Map<String, Object> undoInterest(@PathVariable("tag_id") int tag_id, @RequestAttribute("uid") Integer id) {
		Map<String, Object> ret = new HashMap<String, Object>();
		
		User user = (User) userService.findById(id);
		interestService.undoInterestInTag(user.getId(), tag_id);
		
		ret.put("status", Property.SUCCESS_INTEREST_UNDO);
		return ret;
	}
	
	@ResponseBody
	@RequestMapping("/tag/{tag_id}/details")
	public Map<String, Object> detatils(@PathVariable("tag_id") int tag_id, @RequestAttribute("uid") Integer id) {
		Map<String, Object> ret = new HashMap<String, Object>();
		
		ret.put("isfollow", interestService.hasInterestInTag(id, tag_id));
		ret.put("status", Property.SUCCESS);
		
		return ret;
	}
	*/
}
