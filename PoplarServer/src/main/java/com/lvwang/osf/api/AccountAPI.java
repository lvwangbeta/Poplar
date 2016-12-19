package com.lvwang.osf.api;

import java.util.HashMap;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lvwang.osf.model.User;
import com.lvwang.osf.service.UserService;
import com.lvwang.osf.util.Property;
import com.lvwang.osf.web.RequestAttribute;


@Controller
@RequestMapping("/api/v1/account")
public class AccountAPI {
	
	@Autowired
	private UserService userService;

	@ResponseBody
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public Map<String, Object> login(@RequestBody User user) {
		
		Map<String, Object> ret = userService.login(user.getUser_email(), user.getUser_pwd());
		String status = (String) ret.get("status");
		if(Property.SUCCESS_ACCOUNT_LOGIN.equals(status)) {
			ret.put("token", userService.newToken((User)ret.get("user")));	
		}
		return ret;		

	}
	
	@ResponseBody
	@RequestMapping(value="/logout", method=RequestMethod.POST)
	public Map<String, Object> logout(@RequestAttribute("token") String token) {
		
		Map<String, Object> ret = new HashMap<String, Object>();
		userService.delToken(token);
		ret.put("status", Property.SUCCESS_ACCOUNT_LOGOUT);
		return ret;		

	}
	
	
	@ResponseBody
	@RequestMapping(value="/register", method=RequestMethod.POST)
	public Map<String, String> register(@RequestBody User user) {
		System.out.println("resister....");
		Map<String, String> map = new HashMap<String, String>();
		String status = userService.register(user.getUser_email(), user.getUser_pwd(), user.getUser_cfm_pwd(), map);
		if(Property.SUCCESS_ACCOUNT_REG.equals(status)){
			userService.activateUser(user.getUser_email(), map.get("activationKey"));
			user.setUser_pwd(null);
			user.setUser_cfm_pwd(null);
			map.put("token", userService.newToken(user));
		} 
		map.put("status", status);
		return map;
	}
}
