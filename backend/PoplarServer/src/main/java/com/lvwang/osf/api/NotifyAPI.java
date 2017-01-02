package com.lvwang.osf.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lvwang.osf.service.NotificationService;
import com.lvwang.osf.util.Property;
import com.lvwang.osf.web.RequestAttribute;

@Controller
@RequestMapping("/api/v1/notify/") 
public class NotifyAPI {

	@Autowired
	@Qualifier("notificationService")
	private NotificationService notificationService;
	
	@ResponseBody
	@RequestMapping("/all")
	public Map<String, Object> getAllNotifications(@RequestAttribute("uid") Integer id) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("notifications", notificationService.getAllNotifications(id));
		map.put("status", Property.SUCCESS);
		return map;
	}
}
