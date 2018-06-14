package com.lvwangbeta.poplar.action.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.alibaba.dubbo.config.annotation.Service;
import com.lvwangbeta.poplar.action.dao.FollowDAO;
import com.lvwangbeta.poplar.common.intr.FollowService;
import com.lvwangbeta.poplar.common.model.Follower;
import com.lvwangbeta.poplar.common.model.Following;
import com.lvwangbeta.poplar.common.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

@Service
public class FollowServiceImpl implements FollowService {
	
	@Autowired
	@Qualifier("followDao")
	private FollowDAO followDao;
	
	public boolean newFollowing(int user_id, String user_name, int following_user_id, String following_user_name) {

		Following following = new Following();
		following.setUser_id(user_id);
		following.setUser_name(user_name);
		following.setFollowing_user_id(following_user_id);
		following.setFollowing_user_name(following_user_name);
		int id = followDao.saveFollowing(following);
		if(id == 0) {
			return false;
		}
		
		Follower follower = new Follower();
		follower.setUser_id(following_user_id);
		follower.setUser_name(following_user_name);
		follower.setFollower_user_id(user_id);
		follower.setFollower_user_name(user_name);
		followDao.saveFollower(follower);
		if(id == 0) {
			return false;
		}
		return true;
	}
	
	
	public boolean undoFollow(int user_id, int following_user_id) {
		Following following = new Following();
		following.setUser_id(user_id);
		following.setFollowing_user_id(following_user_id);
		if(followDao.delFollowing(following) == 0) {
			return false;
		}

		Follower follower = new Follower();
		follower.setUser_id(following_user_id);
		follower.setFollower_user_id(user_id);
		if(followDao.delFollower(follower) > 0) {
			return true;
		} else {
			return false;
		}
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
