package com.lvwangbeta.poplar.common.model;

import java.util.Date;
import java.util.Map;
import java.util.TreeMap;

/**
 * 回送调用方的报文对象
 * 可序列化为JSON
 */
public class Message implements java.io.Serializable{

    private String transok; //0-正常 1-报错
    private String errno;   //报错码
    private String errmsg;  //报错信息
    private String timestamp;

    private Map<String, Object> data;

    public Message() {
        transok = "0";
        errno = "0";
        errmsg = "";
        timestamp = String.valueOf(new Date().getTime());
        data = new TreeMap<String, Object>();
    }

    public Message clearAll() {
        data.clear();
        return this;
    }

    public Object get(String key) {
        return data.get(key);
    }

    public Message add(String key, Object value) {
        data.put(key, value);
        return this;
    }

    public Message remove(String key) {
        data.remove(key);
        return this;
    }


    public String getTransok() {
        return transok;
    }

    public void setTransok(String transok) {
        this.transok = transok;
    }

    public String getErrno() {
        return errno;
    }

    public void setErrno(String errno) {
        this.errno = errno;
    }

    public String getErrmsg() {
        return errmsg;
    }

    public void setErrmsg(String errmsg) {
        this.errmsg = errmsg;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public Map<String, Object> getData() {
        return data;
    }
    public void setData(Map<String, Object> data) {
        this.data = data;
    }
}
