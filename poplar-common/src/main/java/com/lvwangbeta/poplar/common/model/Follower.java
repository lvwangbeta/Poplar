package com.lvwangbeta.poplar.common.model;

import java.util.Date;

public class Follower implements java.io.Serializable{
	private int id;
	private int user_id;
	private String user_name;
	private int follower_user_id;
	private String follower_user_name;
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
	public Date getTs() {
		return ts;
	}
	public void setTs(Date ts) {
		this.ts = ts;
	}

}
