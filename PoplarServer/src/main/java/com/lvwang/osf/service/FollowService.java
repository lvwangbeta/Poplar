package com.lvwang.osf.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.lvwang.osf.dao.FollowDAO;
import com.lvwang.osf.model.Follower;
import com.lvwang.osf.model.Following;
import com.lvwang.osf.model.User;
import com.lvwang.osf.util.Property;

@Service("followService")
public class FollowService {
	
	@Autowired
	@Qualifier("followDao")
	private FollowDAO followDao;
	
	public Map<String, Object> newFollowing(int user_id, String user_name, int following_user_id, String following_user_name) {
		Map<String, Object> map = new HashMap<String, Object>();
		Following following = new Following();
		
		following.setUser_id(user_id);
		following.setUser_name(user_name);
		following.setFollowing_user_id(following_user_id);
		following.setFollowing_user_name(following_user_name);
		int id = followDao.saveFollowing(following);
		if(id == 0) {
			map.put("status", Property.ERROR_FOLLOW);
			return map;
		}
		map.put("following", following);
		
		Follower follower = new Follower();
		follower.setUser_id(following_user_id);
		follower.setUser_name(following_user_name);
		follower.setFollower_user_id(user_id);
		follower.setFollower_user_name(user_name);
		followDao.saveFollower(follower);
		if(id == 0) {
			map.put("status", Property.ERROR_FOLLOW);
			return map;
		}
		map.put("follower", follower);
		map.put("status", Property.SUCCESS_FOLLOW);
		return map;
	}
	
	
	public Map<String, Object> undoFollow(int user_id, int following_user_id) {
		Map<String, Object> map = new HashMap<String, Object>();
		Following following = new Following();
		following.setUser_id(user_id);
		following.setFollowing_user_id(following_user_id);
		if(followDao.delFollowing(following) == 0) {
			map.put("status", Property.ERROR_FOLLOW_UNDO);
			return map;
		}
		map.put("following", following);
		
		Follower follower = new Follower();
		follower.setUser_id(following_user_id);
		follower.setFollower_user_id(user_id);
		if(followDao.delFollower(follower) > 0) {
			map.put("status", Property.SUCCESS_FOLLOW_UNDO);
			map.put("follower", follower);
		} else {
			map.put("status", Property.ERROR_FOLLOW_UNDO);
		}
		return map;
	}
	
	public long followersCount(int user_id) {
		return followDao.getFollowersCount(user_id);
	}
	public long followingsCount(int user_id) {
		return followDao.getFollowingsCount(user_id);
	}
	
	public List<Integer> getFollowerIDs(int user_id) {
		return followDao.getFollowerIDs(user_id);
	}
	
	public List<Integer> getFollowingIDs(int user_id) {
		return followDao.getFollowingIDs(user_id);
	}
	
	public List<Follower> getFollowers(int user_id) {
		return followDao.getFollowers(user_id);
	}
	
	public List<Following> getFollowings(int user_id) {
		return followDao.getFollowings(user_id);
	}
	
	public boolean isFollowing(int user_a, int user_b){
		return followDao.hasFollowing(user_a, user_b);
	}
	
	
	public Map<Integer, Boolean> isFollowing(int user_id, List<User> users){
		if(users == null || users.size() == 0) {
			return null;
		}
		Map<Integer, Boolean> result = new TreeMap<Integer, Boolean>();
		List<Integer> users_id = new ArrayList<Integer>();
		for(User user: users) {
			users_id.add(user.getId());
			result.put(user.getId(), false);
		}
		List<Integer> following_users = followDao.isFollowingUsers(user_id, users_id);
		for(int i=0; i<following_users.size(); i++) {
			result.put(following_users.get(i), true);
		}
		return result;
	}
}
