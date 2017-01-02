package com.lvwang.osf.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.lvwang.osf.dao.TagDAO;
import com.lvwang.osf.mappers.TagMapper;
import com.lvwang.osf.model.Tag;

@Repository("tagDao")
public class TagDAOImpl implements TagDAO{

	@Autowired
	private TagMapper tagMapper;
	
	public int save(Tag tag) {
		tagMapper.save(tag);
		return tag.getId();
	}

	public Tag getTagByID(int id) {
		return tagMapper.getTagByID(id);
	}
	
	public Integer getTagID(final String tag) {
		return tagMapper.getTagID(tag);
	}
	
	public List<Tag> getTags(List<String> tags_id){
		return tagMapper.getTags(tags_id);
	}
	
	public List<Tag> getTagsHasCover() {
		return tagMapper.getTagsHasCover();
	}

	public List<Tag> getTags(String tags_id) {
		return tagMapper.getTags(tags_id);
	}

	
}
