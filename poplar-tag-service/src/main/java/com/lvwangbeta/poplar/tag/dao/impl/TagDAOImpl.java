package com.lvwangbeta.poplar.tag.dao.impl;

import com.lvwangbeta.poplar.common.model.Tag;
import com.lvwangbeta.poplar.tag.dao.TagDAO;
import com.lvwangbeta.poplar.tag.dao.TagMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("tagDao")
public class TagDAOImpl implements TagDAO {

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
	
	public List<Tag> getTagsFromList(List<String> tags_id){
		return tagMapper.getTagsFromList(tags_id);
	}
	
	public List<Tag> getTagsHasCover() {
		return tagMapper.getTagsHasCover();
	}

	public List<Tag> getTags(String tags_id) {
		return tagMapper.getTags(tags_id);
	}

	
}
