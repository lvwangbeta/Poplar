package com.lvwang.osf.dao.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.lvwang.osf.dao.RelationDAO;
import com.lvwang.osf.mappers.RelationMapper;
import com.lvwang.osf.model.Relation;

@Repository("relationDao")
public class RelationDAOImpl implements RelationDAO{
	
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
