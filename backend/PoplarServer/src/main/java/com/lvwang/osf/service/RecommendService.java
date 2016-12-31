package com.lvwang.osf.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.lvwang.osf.dao.RecommendDAO;
import com.lvwang.osf.model.User;

@Service("recommendService")
public class RecommendService {
	
	@Autowired
	@Qualifier("userService")
	private UserService userService;
	
	@Autowired
	@Qualifier("recommendDao")
	private RecommendDAO recommendDao;
	
	public List<User> getRecommendUsers(int count) {
		
		List<Integer> ids = recommendDao.getRecommendUsers(3);
		List<User> users = userService.findAllbyIDs(ids);
		return users;
	}

}
