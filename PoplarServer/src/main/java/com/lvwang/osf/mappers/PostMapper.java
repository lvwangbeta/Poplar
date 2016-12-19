package com.lvwang.osf.mappers;

import org.apache.ibatis.annotations.CacheNamespace;

import com.lvwang.osf.dao.PostDAO;

@CacheNamespace
public interface PostMapper extends PostDAO{
	

}
