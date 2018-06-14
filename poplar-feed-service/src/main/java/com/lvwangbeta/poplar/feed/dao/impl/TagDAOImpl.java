package com.lvwangbeta.poplar.feed.dao.impl;

import java.util.List;

import com.lvwangbeta.poplar.common.model.Tag;
import com.lvwangbeta.poplar.feed.dao.TagDAO;
import com.lvwangbeta.poplar.feed.dao.TagMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


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
