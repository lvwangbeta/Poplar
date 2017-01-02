package com.lvwang.osf.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lvwang.osf.service.RecommendService;
import com.lvwang.osf.util.Property;


@Controller
@RequestMapping("/api/v1/recommend/") 
public class RecommendAPI {

	@Autowired
	@Qualifier("recommendService")
	private RecommendService recommendService;
	
	@ResponseBody
	@RequestMapping("/users")
	public Map<String, Object> recommendUsers() {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("users", recommendService.getRecommendUsers(10));
		map.put("status", Property.SUCCESS);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/tags")
	public Map<String, Object> recommendTags() {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("tags", recommendService.getRecommendTags(10));
		map.put("status", Property.SUCCESS);
		return map;
	}
}
