package com.lvwang.osf.model;

import java.io.Serializable;
import java.util.Date;

import com.lvwang.osf.search.Searchable;

public class User implements Serializable, Searchable{

	private static final long serialVersionUID = 1L;
	private int id;
	private String user_name;
	private String user_email;
	private String user_pwd;
	private String user_cfm_pwd;
	private String user_nicename;
	private Date user_registered_date;
	private int user_status;
	private String user_avatar;
	private String user_activationKey;
	private String user_desc;
	
	public boolean equals(Object that){
		User user = (User)that;
		return this.id == user.getId()?true:false;
	}
	public int hashCode() {
		return this.id;
	}
	
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getUser_email() {
		return user_email;
	}
	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}
	public String getUser_pwd() {
		return user_pwd;
	}
	public void setUser_pwd(String user_pwd) {
		this.user_pwd = user_pwd;
	}
	public String getUser_nicename() {
		return user_nicename;
	}
	public void setUser_nicename(String user_nicename) {
		this.user_nicename = user_nicename;
	}
	public Date getUser_registered_date() {
		return user_registered_date;
	}
	public void setUser_registered_date(Date user_registered_date) {
		this.user_registered_date = user_registered_date;
	}
	public int getUser_status() {
		return user_status;
	}
	public void setUser_status(int user_status) {
		this.user_status = user_status;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUser_activationKey() {
		return user_activationKey;
	}
	public void setUser_activationKey(String user_activationKey) {
		this.user_activationKey = user_activationKey;
	}
	public String getUser_avatar() {
		return user_avatar;
	}
	public void setUser_avatar(String user_avatar) {
		this.user_avatar = user_avatar;
	}
	public String getUser_desc() {
		return user_desc;
	}
	public void setUser_desc(String user_desc) {
		this.user_desc = user_desc;
	}
	public String getUser_cfm_pwd() {
		return user_cfm_pwd;
	}
	public void setUser_cfm_pwd(String user_cfm_pwd) {
		this.user_cfm_pwd = user_cfm_pwd;
	}
}
