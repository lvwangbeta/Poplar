package com.lvwangbeta.poplar.common.model;

public class Auth implements java.io.Serializable{
    private int id;
    private int user_id;
    private int indentify_type;
    private String identifier;
    private String credential;


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

    public int getIndentify_type() {
        return indentify_type;
    }

    public void setIndentify_type(int indentify_type) {
        this.indentify_type = indentify_type;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getCredential() {
        return credential;
    }

    public void setCredential(String credential) {
        this.credential = credential;
    }
}
