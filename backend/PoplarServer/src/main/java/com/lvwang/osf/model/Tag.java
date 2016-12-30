package com.lvwang.osf.model;

import java.util.Date;

import com.lvwang.osf.search.Searchable;

public class Tag implements Searchable{
	private int id;
	private String tag;
	private Date add_ts;
	private String cover;
	
	public Tag() {
		
	}
	
	public Tag(String tag) {
		this.tag = tag;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public Date getAdd_ts() {
		return add_ts;
	}
	public void setAdd_ts(Date add_ts) {
		this.add_ts = add_ts;
	}
	public String getCover() {
		return cover;
	}
	public void setCover(String cover) {
		this.cover = cover;
	}
}
