package com.lvwangbeta.poplar.feed.dao.impl;

import java.util.Iterator;
import java.util.List;

import com.lvwangbeta.poplar.common.model.Post;
import com.lvwangbeta.poplar.feed.dao.PostDAO;
import com.lvwangbeta.poplar.feed.dao.PostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("postDao")
public class PostDAOImpl implements PostDAO {

	@Autowired
	private PostMapper postMapper;
	
	public Post getPostByID(int id) {
		Post post = postMapper.getPostByID(id);
		//post.setPost_tags_list(TagService.toList(post.getPost_tags()));
		return post;
	}

	public List<Post> getPostsByIDs(int[] ids) {
		return null;
	}

	public List<Post> getPostsByUserID(int id) {
		List<Post> posts = postMapper.getPostsByUserID(id);
		Iterator<Post> it = posts.iterator();
		while(it.hasNext()) {
			Post post = it.next();
			//post.setPost_tags_list(TagService.toList(post.getPost_tags()));
		}
		return posts;
	}
	

	public int save(final Post post) {
		postMapper.save(post);
		return post.getId();
	}

	public void delete(int id) {
		postMapper.delete(id);
	}

	public int getAuthorOfPost(int id) {
		return postMapper.getAuthorOfPost(id);
	}
	
	public long count(int user_id){
		return postMapper.count(user_id);
	}
	
}
