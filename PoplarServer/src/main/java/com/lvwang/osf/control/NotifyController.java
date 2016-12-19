package com.lvwang.osf.control;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.lvwang.osf.model.User;
import com.lvwang.osf.service.NotificationService;
import com.lvwang.osf.util.Dic;

@Controller
@RequestMapping("/notifications")
public class NotifyController {
	
	@Autowired
	@Qualifier("notificationService")
	private NotificationService notificationService;
	
	@RequestMapping("/comment")
	public ModelAndView comment(HttpSession session) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("notifications/comment");
		
		User user = (User) session.getAttribute("user");
		mav.addObject("dic", new Dic());
		mav.addObject("notis", notificationService.getNotifications(user.getId(), Dic.NOTIFY_TYPE_COMMENT));
		return mav;
	}
	
	@RequestMapping("/like")
	public ModelAndView like(HttpSession session) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("notifications/like");
		User user = (User) session.getAttribute("user");
		mav.addObject("dic", new Dic());
		mav.addObject("notis", notificationService.getNotifications(user.getId(), Dic.NOTIFY_TYPE_LIKE));
		return mav;
	}
	
	@RequestMapping("/follow")
	public ModelAndView follow(HttpSession session) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("notifications/follow");
		User user = (User) session.getAttribute("user");
		mav.addObject("dic", new Dic());
		mav.addObject("notis", notificationService.getNotifications(user.getId(), Dic.NOTIFY_TYPE_FOLLOW));
		return mav;
	}

	@RequestMapping("/system")
	public ModelAndView system(HttpSession session) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("notifications/system");
		User user = (User) session.getAttribute("user");
		mav.addObject("dic", new Dic());
		mav.addObject("notis", notificationService.getNotifications(user.getId(), Dic.NOTIFY_TYPE_SYSTEM));
		return mav;
	}
	
}
