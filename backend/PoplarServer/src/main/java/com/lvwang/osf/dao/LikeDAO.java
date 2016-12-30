package com.lvwang.osf.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface LikeDAO {
	
	String TABLE = "osf_likes";
	
	boolean isLike(int user_id, int object_type, int object_id);
	long likersCount(int object_type, int object_id);
	
	@Insert("insert into " + TABLE + " (user_id, object_type, object_id) values(#{user_id},#{object_type},#{object_id})")
	void like(@Param("user_id")int user_id, @Param("object_type")int object_type, @Param("object_id")int object_id);
	
	@Delete("delete from " + TABLE + " where user_id=#{user_id} and object_type=#{object_type} and object_id=#{object_id}")
	void undoLike(@Param("user_id")int user_id, @Param("object_type")int object_type, @Param("object_id")int object_id);
		
	@Select("select user_id from " + TABLE + " where object_type=#{object_type} and object_id=#{object_id}")
	List<Integer> getLikers(@Param("object_type")int object_type, @Param("object_id")int object_id); 
}
