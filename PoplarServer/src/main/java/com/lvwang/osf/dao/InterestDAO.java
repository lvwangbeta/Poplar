package com.lvwang.osf.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.lvwang.osf.model.Interest;
import com.lvwang.osf.model.Tag;

public interface InterestDAO {
	
	String TABLE_INTEREST = "osf_interests";
	String TABLE_TAG = "osf_tags";
	
	@Insert("insert into " + TABLE_INTEREST + " (user_id, tag_id) values(#{user_id},#{tag_id})")
	@Options(useGeneratedKeys=true, keyProperty="id", keyColumn="id", flushCache=true)
	int saveInterest(Interest interest);
	
	@Delete("delete from " + TABLE_INTEREST +" where user_id=#{user_id} and tag_id=#{tag_id}")
	int delInterest(Interest interest);
	
	@Select("select user_id from " + TABLE_INTEREST + " where tag_id=#{tag_id}")
	List<Integer> getUsersInterestInTag(int tag_id);
	
	@Select("select count(*) count from " +TABLE_INTEREST + " where user_id=#{user_id} and tag_id=#{tag_id}")
	Boolean hasInterestInTag(@Param("user_id")int user_id, @Param("tag_id")int tag_id);
	
	List<Integer> hasInterestInTags(int user_id, List<Integer> tag_ids);
	
	@Select("select t2.* from " + TABLE_INTEREST + " t1, " + TABLE_TAG + " t2 " +
			" where t1.user_id=#{user_id} and t1.tag_id=t2.id")
	List<Tag> getTagsUserInterestedIn(int user_id);
}
