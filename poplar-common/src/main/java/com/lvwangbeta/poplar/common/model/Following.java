package com.lvwangbeta.poplar.common.model;

import java.util.Date;

public class Following implements java.io.Serializable{
	private int id;
	private int user_id;
	private String user_name;
	private int following_user_id;
	private String following_user_name;
	private Date ts;
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
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
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
	public Date getTs() {
		return ts;
	}
	public void setTs(Date ts) {
		this.ts = ts;
	}
}
