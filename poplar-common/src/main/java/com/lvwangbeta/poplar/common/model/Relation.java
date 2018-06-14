package com.lvwangbeta.poplar.common.model;

import java.util.Date;

public class Relation implements java.io.Serializable{
	private int id;
	private int object_type;
	private int object_id;
	private int tag_id;
	private Date add_ts;
	
	public Relation() {
		
	}
	
	public Relation(int object_type, int object_id, int tag_id) {
		this.object_type = object_type;
		this.object_id = object_id;
		this.tag_id = tag_id;
	}
	
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
	public int getTag_id() {
		return tag_id;
	}
	public void setTag_id(int tag_id) {
		this.tag_id = tag_id;
	}
	public Date getAdd_ts() {
		return add_ts;
	}
	public void setAdd_ts(Date add_ts) {
		this.add_ts = add_ts;
	}
}
