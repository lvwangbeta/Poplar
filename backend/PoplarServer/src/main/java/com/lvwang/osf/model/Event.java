package com.lvwang.osf.model;

import java.util.Date;
import java.util.List;

import com.lvwang.osf.search.Searchable;
import com.lvwang.osf.service.TagService;

public class Event implements Searchable{
	
	private int id;
	private int object_type;
	private int object_id;
	private Date ts;
	private int user_id;
	private String user_name;
	private String user_avatar;
	private int like_count;
	private int share_count;
	private int comment_count;
	private String title;
	private String summary;
	private String content;
	private List<Tag> tags;
	private String tags_str;
	private int following_user_id;
	private String following_user_name;
	private int follower_user_id;
	private String follower_user_name;
	private boolean is_like;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getObject_type() {
		return object_type;
	}
	public void setObject_type(int object_type) {
		this.object_type = object_type;
	}
	public int getObject_id() {
		return object_id;
	}
	public void setObject_id(int object_id) {
		this.object_id = object_id;
	}
	public Date getTs() {
		return ts;
	}
	public void setTs(Date ts) {
		this.ts = ts;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getUser_avatar() {
		return user_avatar;
	}
	public void setUser_avatar(String user_avatar) {
		this.user_avatar = user_avatar;
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
	public int getComment_count() {
		return comment_count;
	}
	public void setComment_count(int comment_count) {
		this.comment_count = comment_count;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public List<Tag> getTags() {
		return tags;
	}
	public String getTags_str(){
		return TagService.toString(tags);
	}
	public void setTags(String tags) {
		this.tags = TagService.toList(tags);
	}
	public void setTags_list(List<Tag> tags) {
		this.tags = tags;
	}
	public int getFollowing_user_id() {
		return following_user_id;
	}
	public void setFollowing_user_id(int following_user_id) {
		this.following_user_id = following_user_id;
	}
	public String getFollowing_user_name() {
		return following_user_name;
	}
	public void setFollowing_user_name(String following_user_name) {
		this.following_user_name = following_user_name;
	}
	public int getFollower_user_id() {
		return follower_user_id;
	}
	public void setFollower_user_id(int follower_user_id) {
		this.follower_user_id = follower_user_id;
	}
	public String getFollower_user_name() {
		return follower_user_name;
	}
	public void setFollower_user_name(String follower_user_name) {
		this.follower_user_name = follower_user_name;
	}
	public boolean isIs_like() {
		return is_like;
	}
	public void setIs_like(boolean is_like) {
		this.is_like = is_like;
	}
}
