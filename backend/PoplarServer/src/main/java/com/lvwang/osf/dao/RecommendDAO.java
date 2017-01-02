package com.lvwang.osf.dao;

import java.util.List;

import org.apache.ibatis.annotations.Select;


public interface RecommendDAO {

	String TABLE = "osf_recommends";
	
	@Select("select id from " + TABLE + " where category='user' limit #{param1}")
	List<Integer> getRecommendUsers(int count);
	
	@Select("select id from " + TABLE + " where category='tag' limit #{param1}")
	List<Integer> getRecommendTags(int count);
}
