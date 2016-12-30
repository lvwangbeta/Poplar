package com.lvwang.osf.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.lvwang.osf.mappers.ShortPostMapper;

@Repository("shortPostDao")
public class ShortPostDAOImpl extends PostDAOImpl{

	@Autowired
	private ShortPostMapper spMapper; 
	
	public long count(int user_id) {
		return spMapper.count(user_id);
	}
}
