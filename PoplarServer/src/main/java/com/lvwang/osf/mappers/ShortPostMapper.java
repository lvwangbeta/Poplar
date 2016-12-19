package com.lvwang.osf.mappers;

import org.apache.ibatis.annotations.Select;


public interface ShortPostMapper extends PostMapper{
	
	@Select("select count(1) counter from " + TABLE + " where post_author=#{user_id} and post_title is null")
	long count(int user_id);

}
