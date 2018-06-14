package com.lvwangbeta.poplar.action.service;

import java.util.List;

import com.alibaba.dubbo.config.annotation.Service;
import com.lvwangbeta.poplar.action.dao.CommentDAO;
import com.lvwangbeta.poplar.common.intr.CommentService;
import com.lvwangbeta.poplar.common.model.Comment;
import com.lvwangbeta.poplar.common.model.Message;
import com.lvwangbeta.poplar.common.model.User;
import com.lvwangbeta.poplar.common.util.Dic;
import com.lvwangbeta.poplar.common.util.Property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;


@Service
public class CommentServiceImpl implements CommentService {

	public static final int COMMENT_TYPE_POST = 0;
	public static final int COMMENT_TYPE_PHOTO = 1;
	public static final int COMMENT_TYPE_ALBUM = 2;
	
	public static final String TYPE_POST = "post";
	public static final String TYPE_PHOTO = "photo";
	public static final String TYPE_ALBUM = "album";
	public static final String TYPE_SPOST = "spost";
	
	public static final int COUNT = 10;	//默认返回comment条数
	
	@Autowired
	@Qualifier("commentDao")
	private CommentDAO commentDao;

	
	public Message newComment(Integer comment_object_type, Integer comment_object_id,
						  Integer comment_author, String comment_author_name,
						  String comment_content, Integer comment_parent,
						  int comment_parent_author, String comment_parent_author_name, Message message){
		if(message == null) message = new Message();
		if(comment_content == null || comment_content.length() == 0) {
			message.setErrno(Property.ERROR_COMMENT_EMPTY);
			return message;
		}
		//不支持的评论类型
		if(Dic.checkType(comment_object_type) == null){
			message.setErrno(Property.ERROR_COMMENT_TYPE);
			return message;
		}

		Comment comment = new Comment();
		comment.setComment_object_type(comment_object_type);
		comment.setComment_object_id(comment_object_id);
		comment.setComment_author(comment_author);
		comment.setComment_author_name(comment_author_name);
		comment.setComment_content(comment_content);
		comment.setComment_parent(comment_parent);
		comment.setComment_parent_author(comment_parent_author);
		comment.setComment_parent_author_name(comment_parent_author_name);
		int commentId = commentDao.save(comment);
		comment.setId(commentId);
		message.setErrno(Property.SUCCESS_COMMENT_CREATE);
		message.add("comment", comment);
		return message;
		
	}
	
	public Comment findCommentByID(int id) {
		return commentDao.getCommentByID(id);
	}
	
	public List<Comment> getComments(String type, int id) {
		return getComments(type, id, 0, COUNT);
	}
	
	public List<Comment> getComments(String type, int id, int offset, int count) {
		if(type == null || type.length() == 0)
			return null;
		List<Comment> comments = null;
		if(type.equals(TYPE_POST)) {
			comments = commentDao.getCommentsOfPost(id, offset, count);
		} else if(type.equals(TYPE_PHOTO)) {
			comments = commentDao.getCommentsOfPhoto(id, offset, count);
		} else if(type.equals(TYPE_ALBUM)){
			comments = commentDao.getCommentsOfAlbum(id, offset, count);
		} else if(type.equals(TYPE_SPOST)){
			comments = commentDao.getCommentsOfShortPost(id, offset, count);
		}
		
		//add avatars;
		if(comments != null && comments.size() !=0) {
			for(Comment comment: comments) {
				//comment.setComment_author_avatar(userService.findById(comment.getComment_author()).getUser_avatar());
			}
		}
		return comments;
	}
	
	public User getCommentAuthor(int comment_id){
		return commentDao.getCommentAuthor(comment_id);
	}
	
	public int getCommentsCount(int object_type, int object_id) {
		return commentDao.commentsCount(object_type, object_id);
	}
}
