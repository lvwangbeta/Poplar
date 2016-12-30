package com.lvwang.osf.control;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

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

import com.lvwang.osf.model.User;
import com.lvwang.osf.service.MailService;
import com.lvwang.osf.service.UserService;
import com.lvwang.osf.util.Property;

@Controller
@RequestMapping("/account")
public class AccountController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	@Qualifier("mailService")
	private MailService mailService;
	
	@RequestMapping(value="/login", method=RequestMethod.GET)
	public String login(HttpSession session) {
		if(session.getAttribute("user") != null)
			return "redirect:/";
		
		return "account/login";
	}
	
	@RequestMapping(value="/setting/info", method=RequestMethod.GET)
	public String settingInfoPage(HttpSession session){		
		return "account/setting/info";
	}
	
	@ResponseBody
	@RequestMapping(value="/setting/info", method=RequestMethod.POST)
	public Map<String, Object> settingInfo(@RequestParam("user_name") String user_name, 
							  @RequestParam("user_desc") String user_desc,
							  HttpSession session){	
		User me = (User)session.getAttribute("user");
		Map<String, Object> map = new HashMap<String, Object>();
		
		String status = null;
		
		if(user_name == null || user_name.length() == 0){
			user_name = me.getUser_name();
		} else {
			User user = userService.findByUsername(user_name);
			
			if(user != null){
				status = Property.ERROR_USERNAME_EXIST;
				map.put("status", status);
				return map;
			} 
		}
		
		
		//username is ok, but return a error status
		status = Property.ERROR_USERNAME_NOTEXIST;
		userService.updateUsernameAndDesc(me.getId(), 
										  user_name,
										  user_desc);
		//update session
		me.setUser_name(user_name);
		me.setUser_desc(user_desc);
	
		map.put("status", status);
		return map;
	}
	
	
	@RequestMapping(value="/setting/avatar")
	public ModelAndView settingAvatar(HttpSession session){
		ModelAndView mav = new ModelAndView();
		mav.setViewName("account/setting/avatar");
		return mav;
	}
	
	@RequestMapping(value="/setting/security")
	public String settingSecurity(HttpSession session){
		return "account/setting/security";
	}

	@RequestMapping(value="/resetpwd", method=RequestMethod.GET)
	public ModelAndView resetpwdPage(@RequestParam("key") String key, 
						   @RequestParam("email") String email,
						   HttpSession session){
		ModelAndView mav = new ModelAndView();
		//set user login
		User user = userService.findByEmail(email);
		session.setAttribute("user", user);
		
		String status = null;
		if(userService.isAllowedResetPwd(email, key)){
			status = Property.SUCCESS_PWD_RESET_ALLOWED;
		} else {
			status = Property.ERROR_PWD_RESET_NOTALLOWED;
		}
		mav.addObject("status", status);
		mav.addObject("SUCCESS_PWD_RESET_ALLOWED", Property.SUCCESS_PWD_RESET_ALLOWED);
		mav.addObject("ERROR_PWD_RESET_NOTALLOWED", Property.ERROR_PWD_RESET_NOTALLOWED);
		mav.setViewName("account/resetpwd");
		return mav;
	}
	
	@ResponseBody
	@RequestMapping(value="/resetpwd", method=RequestMethod.POST)
	public Map<String, Object> resetpwd(@RequestParam("password") String password, 
										@RequestParam("cfm_pwd") String cfm_pwd,
										HttpSession session){
		Map<String, Object> map = new HashMap<String, Object>();
		User user = (User)session.getAttribute("user");
		
		map.put("status", userService.resetPassword(user.getUser_email(), password, cfm_pwd));
		return map;
	}
	
	@ResponseBody
	@RequestMapping(value="/changepwd", method=RequestMethod.POST)
	public Map<String, Object> changepwd(@RequestParam("old_pwd") String old_pwd, 
										@RequestParam("new_pwd") String new_pwd,
										HttpSession session){
		Map<String, Object> map = new HashMap<String, Object>();
		User user = (User)session.getAttribute("user");
		map.put("status", userService.changePassword(user.getUser_email(), old_pwd, new_pwd));
		return map;
	}
	
	
	@ResponseBody
	@RequestMapping(value="/send_resetpwd_email")
	public Map<String, Object> sendResetPwdEmail(HttpSession session){
		Map<String, Object> map = new HashMap<String, Object>();
		User user = (User) session.getAttribute("user");
		mailService.sendResetPwdEmail(user.getUser_email(), userService.updateResetPwdKey(user.getUser_email()));
		map.put("status", Property.SUCCESS_EMAIL_RESETPWD_SEND);
		return map;
	}
	
	
	
	@ResponseBody
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public Map<String, Object> login(@RequestParam("email") String email,
					    @RequestParam("password") String password,
					    HttpSession session) {
		/*
		String status = userService.login(email, password);
		if(Property.SUCCESS_ACCOUNT_LOGIN.equals(status)) {
			User user = userService.findByEmail(email);
			session.setAttribute("user", user);			
		}
		*/
		Map<String, Object> ret = userService.login(email, password);
		String status = (String) ret.get("status");
		if(Property.SUCCESS_ACCOUNT_LOGIN.equals(status)) {
			session.setAttribute("user", (User)ret.get("user"));			
		}
		return ret;		
	}
	
	@RequestMapping(value="/register", method=RequestMethod.GET)
	public String register() {
		return "account/register";
	}
	
	@ResponseBody
	@RequestMapping(value="/register", method=RequestMethod.POST)
	public Map<String, String> register(@RequestParam("username") String username,
										@RequestParam("email") String email,
						 				@RequestParam("password") String password,
						 				@RequestParam("cfmPwd") String cfmPwd) {
		System.out.println("resister....");
		Map<String, String> map = new HashMap<String, String>();
		String status = userService.register(username, email, password, cfmPwd, map);
		if(Property.SUCCESS_ACCOUNT_REG.equals(status)){
			mailService.sendAccountActivationEmail(email, map.get("activationKey"));
		} 
		map.put("status", status);
		return map;
	}
	
	private void initStatus(ModelAndView mav) {
		mav.addObject("ERROR_ACCOUNT_ACTIVATION_NOTEXIST", Property.ERROR_ACCOUNT_ACTIVATION_NOTEXIST);
		mav.addObject("ERROR_ACCOUNT_ACTIVATION_EXPIRED", Property.ERROR_ACCOUNT_ACTIVATION_EXPIRED);
		mav.addObject("ERROR_ACCOUNT_ACTIVATION", Property.ERROR_ACCOUNT_ACTIVATION);
	}
	
	@RequestMapping("/activation/mail/send")
	public ModelAndView actication(@RequestParam("email") String email) {
		ModelAndView mav = new ModelAndView();	
		mav.setViewName("account/activation");
		initStatus(mav);
		mav.addObject("email", email);
		return mav;
	}
	
	@ResponseBody
	@RequestMapping("/activation/mail/resend")
	public Map<String, String> acticationMailResend(@RequestParam("email") String email) {
		Map<String, String> ret = new HashMap<String, String>();
		Map<String, Object> map  = userService.updateActivationKey(email);
		ret.put("status", (String)map.get("status"));
		if(Property.SUCCESS_ACCOUNT_ACTIVATION_KEY_UPD.equals((String)map.get("status"))){
			mailService.sendAccountActivationEmail(email, (String)map.get("activationKey"));
			ret.put("status", Property.SUCCESS_ACCOUNT_ACTIVATION_EMAIL_RESEND);
		}
		return ret;
	}	
	
	@RequestMapping("/activation/{key}")
	public ModelAndView activation(@PathVariable("key") String key, 
								   @RequestParam("email") String email, 
								   HttpSession session) {
		ModelAndView mav = new ModelAndView();	
				
		String status = null;
		try {
			status = userService.activateUser(email, URLDecoder.decode(key, "utf-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if(Property.SUCCESS_ACCOUNT_ACTIVATION.equals(status) ||
		   Property.ERROR_ACCOUNT_EXIST.equals(status)){
			mav.setViewName("redirect:/guide");
			User user = userService.findByEmail(email);
			session.setAttribute("user", user);
			userService.indexUser(user);
		} else {
			mav.setViewName("account/activation");
			mav.addObject("status", status);
			mav.addObject("email", email);
			mav.addObject("ERROR_ACCOUNT_ACTIVATION_NOTEXIST", Property.ERROR_ACCOUNT_ACTIVATION_NOTEXIST);
			mav.addObject("ERROR_ACCOUNT_ACTIVATION_EXPIRED", Property.ERROR_ACCOUNT_ACTIVATION_EXPIRED);
			mav.addObject("ERROR_ACCOUNT_ACTIVATION", Property.ERROR_ACCOUNT_ACTIVATION);
		}
		return mav;
	}
	
	@RequestMapping("/completeinfo")
	public void completeUserInfo(HttpSession session) {
		
	}
	
	@RequestMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "account/login";
	}
}
