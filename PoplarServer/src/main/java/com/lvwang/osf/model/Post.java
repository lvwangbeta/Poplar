package com.lvwang.osf.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class Post implements Serializable{
	

	private static final long serialVersionUID = 1041319130842178407L;
	private int id;
	private int post_author;
	private Date post_ts;
	private String post_content;
	private String post_title;
	private String post_excerpt;
	private int post_status;
	private int comment_status;
	private String post_pwd;
	private Date post_lastts;
	private int like_count;
	private int share_count;
	private int comment_count;
	private String post_url;
	private String post_tags;
	private List<Tag> post_tags_list;
	private int post_album;
	private String post_cover;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getPost_author() {
		return post_author;
	}
	public void setPost_author(int post_author) {
		this.post_author = post_author;
	}
	public Date getPost_ts() {
		return post_ts;
	}
	public void setPost_ts(Date post_ts) {
		this.post_ts = post_ts;
	}
	public String getPost_content() {
		return post_content;
	}
	public void setPost_content(String post_content) {
		this.post_content = post_content;
	}
	public String getPost_title() {
		return post_title;
	}
	public void setPost_title(String post_title) {
		this.post_title = post_title;
	}
	public String getPost_excerpt() {
		return post_excerpt;
	}
	public void setPost_excerpt(String post_excerpt) {
		this.post_excerpt = post_excerpt;
	}
	public int getPost_status() {
		return post_status;
	}
	public void setPost_status(int post_status) {
		this.post_status = post_status;
	}
	public int getComment_status() {
		return comment_status;
	}
	public void setComment_status(int comment_status) {
		this.comment_status = comment_status;
	}
	public String getPost_pwd() {
		return post_pwd;
	}
	public void setPost_pwd(String post_pwd) {
		this.post_pwd = post_pwd;
	}
	public Date getPost_lastts() {
		return post_lastts;
	}
	public void setPost_lastts(Date post_lastts) {
		this.post_lastts = post_lastts;
	}
	public int getComment_count() {
		return comment_count;
	}
	public void setComment_count(int comment_count) {
		this.comment_count = comment_count;
	}
	public String getPost_url() {
		return post_url;
	}
	public void setPost_url(String post_url) {
		this.post_url = post_url;
	}
	public int getLike_count() {
		return like_count;
	}
	public void setLike_count(int like_count) {
		this.like_count = like_count;
	}
	public int getShare_count() {
		return share_count;
	}
	public void setShare_count(int share_count) {
		this.share_count = share_count;
	}
	public List<Tag> getPost_tags_list() {
		return post_tags_list;
	}
	public void setPost_tags_list(List<Tag> post_tags_list) {
		this.post_tags_list = post_tags_list;
	}
	public int getPost_album() {
		return post_album;
	}
	public void setPost_album(int post_album) {
		this.post_album = post_album;
	}
	public String getPost_cover() {
		return post_cover;
	}
	public void setPost_cover(String post_cover) {
		this.post_cover = post_cover;
	}
	public String getPost_tags() {
		return post_tags;
	}
	public void setPost_tags(String post_tags) {
		this.post_tags = post_tags;
	}

}
