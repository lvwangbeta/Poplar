package com.lvwang.osf.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.lvwang.osf.model.Follower;
import com.lvwang.osf.model.Following;

public interface FollowDAO {
	
	String TABLE_FOLLOWING = "osf_followings";
	String TABLE_FOLLOWER = "osf_followers";
	
	List<Integer> getFollowingIDs(int user_id);
	List<Integer> getFollowerIDs(int user_id);
	
	boolean hasFollowing(int user_a, int user_b);
	boolean hasFollower(int user_a, int user_b);
	
	
	@Insert("insert into " + TABLE_FOLLOWING + "(user_id, user_name, "
			+ "following_user_id, "
			+ "following_user_name) "
			+ "values(#{user_id},#{user_name},#{following_user_id},#{following_user_name})")
	@Options(useGeneratedKeys=true, keyProperty="id", keyColumn="id", flushCache=true)
	int saveFollowing(Following following);
	
	@Insert("insert into " + TABLE_FOLLOWER + "(user_id, user_name, "
			+ "follower_user_id, "
			+ "follower_user_name) "
			+ "values(#{user_id},#{user_name},#{follower_user_id},#{follower_user_name})")
	@Options(useGeneratedKeys=true, keyProperty="id", keyColumn="id", flushCache=true)
	int saveFollower(Follower follower);
	
	@Delete("delete from " + TABLE_FOLLOWING + " where user_id=#{user_id} and following_user_id=#{following_user_id}")
	int delFollowing(Following following);
	
	@Delete("delete from " + TABLE_FOLLOWER + " where user_id=#{user_id} and follower_user_id=#{follower_user_id}")
	int delFollower(Follower follower);
	
	@Select("select * from " + TABLE_FOLLOWING + " where user_id=#{user_id}")
	List<Following> getFollowings(int user_id);
	
	@Select("select * from " + TABLE_FOLLOWER + " where user_id=#{user_id}")
	List<Follower> getFollowers(int user_id);
	
	@Select("select following_user_id from " 
			+ TABLE_FOLLOWING +" where user_id=#{user_id} and FIND_IN_SET(following_user_id, #{following_ids})")
	List<Integer> isFollowingUsers(@Param("user_id")int user_id, @Param("following_ids")List<Integer> following_ids);
	
	long getFollowersCount(int user_id);
	long getFollowingsCount(int user_id);
}
