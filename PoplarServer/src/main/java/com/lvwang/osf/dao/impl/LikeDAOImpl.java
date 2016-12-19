package com.lvwang.osf.dao.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Repository;

import com.lvwang.osf.dao.LikeDAO;
import com.lvwang.osf.mappers.LikeMapper;
import com.lvwang.osf.util.Dic;

@Repository("likeDao")
public class LikeDAOImpl implements LikeDAO{
	
	private static final String LIKE_KEY = "like:";  //缓存喜欢object的用户id
		
	@Autowired
	private LikeMapper likeMapper;
	
	@Autowired
	@Qualifier("redisTemplate")
	private RedisTemplate<String, String> redisTemplate; 
	
	@Resource(name="redisTemplate")
	private SetOperations<String, Integer> setOps;
	

	public void like(final int user_id, final int object_type, final int object_id) {
		likeMapper.like(user_id, object_type, object_id);
		setOps.add(LIKE_KEY+Dic.checkType(object_type) + ":"+object_id,	user_id);
	}

	public void undoLike(final int user_id, final int object_type, final int object_id) {		
		likeMapper.undoLike(user_id, object_type, object_id);
		setOps.remove(LIKE_KEY+Dic.checkType(object_type) + ":"+object_id,	user_id);
		
	}
	
	
	public boolean isLike(int user_id, int object_type, int object_id) {	
		return setOps.isMember(LIKE_KEY+Dic.checkType(object_type) + ":"+object_id, user_id);
	}

	public long likersCount(int object_type, int object_id) {
		return setOps.size(LIKE_KEY+Dic.checkType(object_type) + ":"+object_id);
	}

//	private void cacheLikers(int object_type, int object_id){
//		getLikers(object_type, object_id);
//	}
	
	public List<Integer> getLikers(int object_type, int object_id) {
		//key e.g like:post:1
		final String key = LIKE_KEY+Dic.checkType(object_type) + ":"+object_id;
		List<Integer> likers = null;
		if(!redisTemplate.hasKey(key) ){
			likers = likeMapper.getLikers(object_type, object_id);
			setOps.add(key, (Integer[]) likers.toArray());
			
		} 
		return likers;
	}


}
