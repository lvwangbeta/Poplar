package com.lvwang.osf.web;

import java.io.PrintWriter;

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

public class LoginRequiredInterceptor implements HandlerInterceptor{

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

	public boolean preHandle(HttpServletRequest req, HttpServletResponse rpo,
			Object arg2) throws Exception {
		
		System.out.println("login required inter:"+req.getRequestURL());
		
		HttpSession session = req.getSession();		
		
		User user = (User) session.getAttribute("user");
		if(user == null){
			String contextPath = req.getContextPath();
			String servletPath = req.getServletPath();
			session.setAttribute("lastvisit", contextPath+servletPath);
			rpo.setCharacterEncoding("UTF-8");  
		    rpo.setContentType("application/json; charset=utf-8"); 
		    PrintWriter writer = rpo.getWriter();
		    String json = "{\"status\":\""+Property.ERROR_ACCOUNT_NOTLOGIN+"\"}";
		    writer.write(json);
		    writer.close();
		} else {
			session.setAttribute("notifications", notificationService.getNotificationsCount(user.getId()));
			return true;
		}
		
		
		
		return false;
	}

}
