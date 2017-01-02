package com.lvwang.osf.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.lvwang.osf.dao.RecommendDAO;
import com.lvwang.osf.model.Tag;
import com.lvwang.osf.model.User;

@Service("recommendService")
public class RecommendService {
	
	@Autowired
	@Qualifier("userService")
	private UserService userService;
	
	@Autowired
	@Qualifier("tagService")
	private TagService tagService;
	
	@Autowired
	@Qualifier("recommendDao")
	private RecommendDAO recommendDao;
	
	public List<User> getRecommendUsers(int count) {
		
		List<Integer> ids = recommendDao.getRecommendUsers(count);
		List<User> users = userService.findAllbyIDs(ids);
		return users;
	}

	public List<Tag> getRecommendTags(int count) {
		List<Integer> ids = recommendDao.getRecommendTags(count);
		return tagService.getTagsByIDs(ids);
	}
	
}
