package com.lvwangbeta.poplar.feed.dao;

import java.util.List;

import com.lvwangbeta.poplar.common.model.Tag;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;


public interface TagDAO {

	String TABLE = "poplar_tags";
	
	@Insert("insert into "+TABLE + "(tag) values(#{tag})")
	@Options(useGeneratedKeys=true, keyProperty="id", keyColumn="id", flushCache=Options.FlushCachePolicy.TRUE)
	int save(Tag tag);
	
	@Select("select * from " + TABLE + " where id=#{id}")
	Tag getTagByID(int id);
	
	@Select("select id from "+TABLE+" where tag=#{tag}")
	Integer getTagID(String tag);
	
	@Select("select * from "+ TABLE + " where FIND_IN_SET(id, #{tags_id}) <> 0")
	List<Tag> getTagsFromList(@Param("tags_id") List<String> tags_id);
	
	@Select("select * from "+ TABLE + " where id in (${tags_id})")
	List<Tag> getTags(@Param("tags_id") String tags_id);
	
	/**
	 * 获取有封面的tag
	 * @return
	 */
	@Select("select * from "+ TABLE + " where cover is not null limit 12")
	List<Tag> getTagsHasCover();
	
	
}
