package com.lvwang.osf.dao.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Repository;

import com.lvwang.osf.dao.FollowDAO;
import com.lvwang.osf.mappers.FollowMapper;
import com.lvwang.osf.model.Follower;
import com.lvwang.osf.model.Following;
import com.lvwang.osf.util.OSFUtils;

@Repository("followDao")
public class FollowDAOImpl implements FollowDAO{
	
	private static final String FOLLOWING_KEY = "following:user:";
	private static final String FOLLOWER_KEY = "follower:user:";
	
	private static final int FOLLOW_SCAN_COUNT = 10;
	
	@Autowired
	private FollowMapper followMapper;
	
	@Autowired
	@Qualifier("redisTemplate")
	private RedisTemplate<String, String> redisTemplate; 
	
	@Resource(name="redisTemplate")
	private SetOperations<String, Integer> setOps;
	
	public int saveFollowing(final Following following) {
		
		followMapper.saveFollowing(following);
		
		setOps.add(FOLLOWING_KEY+following.getUser_id(), following.getFollowing_user_id());
		
		return following.getId();
	}
	
	
	public int saveFollower(final Follower follower) {
		followMapper.saveFollower(follower);
		setOps.add(FOLLOWER_KEY+follower.getUser_id() ,follower.getFollower_user_id());
		
		return follower.getId();
	}

	public long getFollowersCount(int user_id) {
		return setOps.size(FOLLOWER_KEY+user_id);
	}
	
	public long getFollowingsCount(int user_id) {
		return setOps.size(FOLLOWING_KEY+user_id);
	}
	
	public List<Integer> getFollowingIDs(int user_id) {
		Set<Integer> members = setOps.members(FOLLOWING_KEY+user_id);
		return OSFUtils.toList(members);
		
	}
	
	public List<Integer> getFollowerIDs(int user_id) {
		Set<Integer> members = setOps.members(FOLLOWER_KEY+user_id);
		return OSFUtils.toList(members);
	}
	
	public List<Following> getFollowings(int user_id) {
		return followMapper.getFollowings(user_id);
	}

	public List<Follower> getFollowers(final int user_id) {		
		return followMapper.getFollowers(user_id);
	}

	public int delFollowing(final Following following) {
		int effrows = followMapper.delFollowing(following);
		
		setOps.remove(FOLLOWING_KEY+following.getUser_id(), following.getFollowing_user_id());
		return effrows;
	}

	public int delFollower(final Follower follower) {
		int effrows = followMapper.delFollower(follower);
		setOps.remove(FOLLOWER_KEY+follower.getUser_id(), follower.getFollower_user_id());
		return effrows;
	}

	public boolean hasFollowing(int user_a, int user_b) {
		return setOps.isMember(FOLLOWING_KEY+user_a, user_b);
	}
	
	public boolean hasFollower(int user_a, int user_b) {
		return setOps.isMember(FOLLOWER_KEY+user_a, user_b);
	}

	public List<Integer> isFollowingUsers(int user_id,
			List<Integer> following_ids) {
		List<Integer> result = new ArrayList<Integer>();
		Iterator<Integer> ids_it = following_ids.iterator();
		while(ids_it.hasNext()) {
			int id = ids_it.next();
			if(hasFollowing(user_id, id )) {
				result.add(id);
			}
		}
		return result;
	}
}
