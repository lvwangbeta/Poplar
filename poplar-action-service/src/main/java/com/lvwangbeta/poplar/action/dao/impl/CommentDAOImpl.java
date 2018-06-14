package com.lvwangbeta.poplar.action.dao.impl;


import javax.annotation.Resource;

import com.lvwangbeta.poplar.action.dao.CommentDAO;
import com.lvwangbeta.poplar.action.dao.CommentMapper;
import com.lvwangbeta.poplar.common.model.Comment;
import com.lvwangbeta.poplar.common.model.User;
import com.lvwangbeta.poplar.common.util.Dic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("commentDao")
public class CommentDAOImpl implements CommentDAO {
	
	
	private static final String COUNTER = "counter";
	
	@Autowired
	private CommentMapper commentMapper;
	
	@Autowired
	private RedisTemplate<String, String> redisTemplate; 
	
	@Resource(name="redisTemplate")
	private HashOperations<String, String, Integer> hashOps;
	
	public User getCommentAuthor(int comment_id){
		return commentMapper.getCommentAuthor(comment_id);
	}
	
	public Comment getCommentByID(int id) {
		return commentMapper.getCommentByID(id);
	}
	
	public List<Comment> getCommentsOfPost(int id, int offset, int count) {
		return commentMapper.getCommentsOfPost(id, offset, count);
	}

	public List<Comment> getCommentsOfShortPost(int id, int offset, int count) {
		return commentMapper.getCommentsOfShortPost(id, offset, count);			
	}
	
	public List<Comment> getCommentsOfPhoto(int id, int offset, int count) {
		return commentMapper.getCommentsOfPhoto(id, offset, count);
	}

	public List<Comment> getCommentsOfAlbum(int id, int offset, int count) {
		return commentMapper.getCommentsOfAlbum(id, offset, count);
	}

	public int save(final Comment comment) {		
		commentMapper.save(comment);
		
		String key = "comment:"+Dic.checkType(comment.getComment_object_type())+":"+comment.getComment_object_id();
		Integer count = hashOps.get(COUNTER, key);
		
		if(count == null) {
			count = 0;
		}
		hashOps.put(COUNTER, key, count+1);
		
		return comment.getId();
	}

	public boolean delete(int id) {
		return false;
	}

	public int commentsCount(int object_type, int object_id){
		String type = Dic.checkType(object_type);
		if(type == null)
			return 0;
		Integer count = hashOps.get(COUNTER, "comment:"+type+":"+object_id);
		return count==null ? 0 : count;
	}
}
