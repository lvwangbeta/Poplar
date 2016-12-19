package com.lvwang.osf.model;

import java.util.Date;
import java.util.List;

public class Album {
	
	private int id;
	private int user_id;
	private Date create_ts;
	private String album_title;
	private String album_desc;
	private Date last_add_ts;
	private int photos_count;
	private int status;
	private String cover;
	private int like_count;
	private int share_count;
	private int comment_count;
	private List<Photo> photos;
	private List<Tag> album_tags_list;
	private String album_tags;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public Date getCreate_ts() {
		return create_ts;
	}
	public void setCreate_ts(Date create_ts) {
		this.create_ts = create_ts;
	}
	public String getAlbum_title() {
		return album_title;
	}
	public void setAlbum_title(String album_title) {
		this.album_title = album_title;
	}
	public String getAlbum_desc() {
		return album_desc;
	}
	public void setAlbum_desc(String album_desc) {
		this.album_desc = album_desc;
	}
	public Date getLast_add_ts() {
		return last_add_ts;
	}
	public void setLast_add_ts(Date last_add_ts) {
		this.last_add_ts = last_add_ts;
	}
	public int getPhotos_count() {
		return photos_count;
	}
	public void setPhotos_count(int photos_count) {
		this.photos_count = photos_count;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getCover() {
		return cover;
	}
	public void setCover(String cover) {
		this.cover = cover;
	}
	public List<Photo> getPhotos() {
		return photos;
	}
	public void setPhotos(List<Photo> photos) {
		this.photos = photos;
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
	public List<Tag> getAlbum_tags_list() {
		return album_tags_list;
	}
	public void setAlbum_tags_list(List<Tag> album_tags_list) {
		this.album_tags_list = album_tags_list;
	}
	public String getAlbum_tags() {
		return album_tags;
	}
	public void setAlbum_tags(String album_tags) {
		this.album_tags = album_tags;
	}
}
