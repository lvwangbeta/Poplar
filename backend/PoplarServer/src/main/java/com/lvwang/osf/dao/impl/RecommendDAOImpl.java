package com.lvwang.osf.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.lvwang.osf.dao.RecommendDAO;
import com.lvwang.osf.mappers.RecommendMapper;

@Repository("recommendDao")
public class RecommendDAOImpl implements RecommendDAO{

	@Autowired
	private RecommendMapper recommendMapper;
	
	public List<Integer> getRecommendUsers(int count) {
		return recommendMapper.getRecommendUsers(count);
	}

	public List<Integer> getRecommendTags(int count) {
		return recommendMapper.getRecommendTags(count);
	}

	
}
