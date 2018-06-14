package com.lvwangbeta.poplar.action.service;

import java.util.List;

import com.alibaba.dubbo.config.annotation.Service;
import com.lvwangbeta.poplar.action.dao.LikeMapper;
import com.lvwangbeta.poplar.common.intr.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;


@Service
public class LikeServiceImpl implements LikeService {
	
	@Autowired
	@Qualifier("likeDao")
	private LikeMapper likeDao;
	
	public void like(int user_id, int object_type, int object_id){
		likeDao.like(user_id, object_type, object_id);
	}
	
	public void undoLike(int user_id, int object_type, int object_id){
		likeDao.undoLike(user_id, object_type, object_id);
	}
	
	/**
	 * 判断用户是否喜欢某个对象
	 * @param user_id
	 * @param object_type
	 * @param object_id
	 * @return
	 */
	public boolean isLike(int user_id, int object_type, int object_id) {
		return likeDao.isLike(user_id, object_type, object_id);
	}
	
	/**
	 * 返回喜欢某个对象的用户数量
	 * @param object_type
	 * @param object_id
	 * @return
	 */
	public long likersCount(int object_type, int object_id) {
		return likeDao.likersCount(object_type, object_id);
	}
	
	/**
	 * 返回喜欢某个对象的用户ID列表
	 * @param object_type
	 * @param object_id
	 * @return
	 */
	public List<Integer> likers(int object_type, int object_id){
		return likeDao.getLikers(object_type, object_id);
	}
	
	/**
	 * 用户喜欢的对象数量(部分对象类型)
	 * @param user_id
	 * @return
	 */
	public int likeCount(int user_id){
		return 0;
	}
}
