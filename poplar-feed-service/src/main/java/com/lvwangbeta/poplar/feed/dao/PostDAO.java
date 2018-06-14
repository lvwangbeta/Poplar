package com.lvwangbeta.poplar.feed.dao;

import java.util.List;

import com.lvwangbeta.poplar.common.model.Post;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;


public interface PostDAO {
	
	String TABLE = "poplar_posts";
	
	@Select("select * from " + TABLE + " where id = #{id}")
	Post getPostByID(int id);
	
	//not imple
	List<Post> getPostsByIDs(int[] ids); 
	
	@Select("select * from " + TABLE + " where post_author = #{id} and post_title is not null")
	List<Post> getPostsByUserID(int id);

	@Select("select post_author from " + TABLE + " where id = #{id}")
	int getAuthorOfPost(int id);
	
	@Select("select count(1) counter from " + TABLE + " where post_author = #{user_id} and post_title is not null")
	long count(int user_id);
	
	@Insert("insert into " 
			+ TABLE + 
			" (post_author, post_title, post_content,"
			+ "post_excerpt, post_status,"
			+ "post_pwd, comment_status, post_tags, post_cover)"
			+ " values(#{post_author},#{post_title},#{post_content},#{post_excerpt},"
			+ "#{post_status},#{post_pwd},#{comment_status},#{post_tags},#{post_cover})")
	@Options(useGeneratedKeys=true, keyProperty="id", keyColumn="id", useCache=true)
	int save(Post post);
	
	@Delete("delete from " + TABLE + " where id = #{id}")
	@Options(flushCache=Options.FlushCachePolicy.TRUE)
	void delete(int id);
}
