package com.lvwang.osf.model;

public class Interest {
	private int id;
	private int user_id;
	private int tag_id;
	
	public Interest(int user_id, int tag_id) {
		this.user_id = user_id;
		this.tag_id = tag_id;
	}
	
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
	public int getTag_id() {
		return tag_id;
	}
	public void setTag_id(int tag_id) {
		this.tag_id = tag_id;
	}
}
