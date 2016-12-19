package com.lvwang.osf.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.lvwang.osf.model.User;
import com.lvwang.osf.service.NotificationService;
import com.lvwang.osf.util.Property;

public class NotifyInterceptor implements HandlerInterceptor{

	@Autowired
	@Qualifier("notificationService")
	private NotificationService notificationService;
	
	
	public void afterCompletion(HttpServletRequest arg0,
			HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
			Object arg2, ModelAndView arg3) throws Exception {
		// TODO Auto-generated method stub
		
	}

	public boolean preHandle(HttpServletRequest req, HttpServletResponse resp,
			Object arg2) throws Exception {
		// TODO Auto-generated method stub
		HttpSession session = req.getSession();
		User user = (User) session.getAttribute("user");
		if(user != null){
			session.setAttribute("notifications", notificationService.getNotificationsCount(user.getId()));
		}
		session.setAttribute("img_base_url", Property.IMG_BASE_URL);
		session.setAttribute("post_cover_thumbnail", Property.POST_COVER_THUMBNAIL);
		session.setAttribute("album_thumbnail", Property.ALBUM_THUMBNAIL);
		return true;
	}

}
