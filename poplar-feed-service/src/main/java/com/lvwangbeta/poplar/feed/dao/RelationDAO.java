package com.lvwangbeta.poplar.feed.dao;

import java.util.List;
import com.lvwangbeta.poplar.common.model.Relation;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface RelationDAO {
	
	String TABLE = "poplar_relations";
	
	@Insert("insert into "+ TABLE + "(object_type, object_id, tag_id) values(#{object_type},#{object_id},#{tag_id})")
	int save(Relation relation);

	boolean delete();
	
	@Select("select * from " + TABLE + " where tag_id = #{tag_id} order by add_ts")
	List<Relation> get(int tag_id) ;
	
	@Select("select * from " + TABLE + " where FIND_IN_SET(tag_id, #{tag_ids}) <> 0")
	List<Relation> getRelationsInTags(@Param("tag_ids") List<String> tag_ids);
}
