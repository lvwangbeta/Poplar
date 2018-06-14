package com.lvwangbeta.poplar.feed.dao.impl;


import java.util.List;

import com.lvwangbeta.poplar.common.model.Relation;
import com.lvwangbeta.poplar.feed.dao.RelationDAO;
import com.lvwangbeta.poplar.feed.dao.RelationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("relationDao")
public class RelationDAOImpl implements RelationDAO {
	
	@Autowired
	private RelationMapper relationMapper;
	
	public int save(Relation relation) {
		relationMapper.save(relation);
		return relation.getId();
	}

	public boolean delete() {
		// TODO Auto-generated method stub
		return false;
	}

	public List<Relation> get(final int tag_id) {
		return relationMapper.get(tag_id);
	}

	public List<Relation> getRelationsInTags(List<String> tag_ids) {
		return relationMapper.getRelationsInTags(tag_ids);
		
	}
	
}
