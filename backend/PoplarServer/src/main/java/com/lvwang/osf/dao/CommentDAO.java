package com.lvwang.osf.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.lvwang.osf.model.Comment;
import com.lvwang.osf.model.User;
import com.lvwang.osf.service.CommentService;
import com.lvwang.osf.util.Dic;

public interface CommentDAO {
	
	String TABLE = "osf_comments";
	
	@Select("select * from " + TABLE + " where id = #{id}")
	Comment getCommentByID(int id);
	
	@Select("select comment_author id,comment_author_name user_name from " + TABLE + " where id=#{comment_id}")
	User getCommentAuthor(int comment_id);
	
	@Select("select * from " + TABLE + " where comment_object_type="+CommentService.COMMENT_TYPE_POST
			+" and comment_object_id = #{id} order by comment_ts desc limit #{offset},#{count}")
	List<Comment> getCommentsOfPost(@Param("id")int id, @Param("offset") int offset, @Param("count")int count);
	
	@Select("select * from " + TABLE + " where comment_object_type="+CommentService.COMMENT_TYPE_PHOTO
			+" and comment_object_id=#{id} order by comment_ts desc limit #{offset},#{count}")
	List<Comment> getCommentsOfPhoto(@Param("id")int id, @Param("offset") int offset, @Param("count")int count);
	
	@Select("select * from " + TABLE + " where comment_object_type="+CommentService.COMMENT_TYPE_ALBUM
			+" and comment_object_id=#{id} order by comment_ts desc limit #{offset},#{count}")	
	List<Comment> getCommentsOfAlbum(@Param("id")int id, @Param("offset") int offset, @Param("count")int count);
	
	@Select("select * from " + TABLE + " where comment_object_type="+Dic.OBJECT_TYPE_SHORTPOST
			+" and comment_object_id=#{id} order by comment_ts desc limit #{offset},#{count}")		
	List<Comment> getCommentsOfShortPost(@Param("id")int id, @Param("offset") int offset, @Param("count")int count);

	@Insert("insert into " + TABLE + "(comment_object_type, comment_object_id,"
			+ "comment_author, comment_author_name,"
			+ "comment_content, comment_parent, comment_parent_author, comment_parent_author_name) "
			+ "values(#{comment_object_type},#{comment_object_id},"
			+ "#{comment_author},#{comment_author_name},"
			+ "#{comment_content},#{comment_parent},#{comment_parent_author},#{comment_parent_author_name})")
	@Options(useGeneratedKeys=true, keyProperty="id", keyColumn="id", flushCache=true)
	int save(Comment comment);
	
	
	boolean delete(int id);
	
	int commentsCount(int object_type, int object_id);
}
