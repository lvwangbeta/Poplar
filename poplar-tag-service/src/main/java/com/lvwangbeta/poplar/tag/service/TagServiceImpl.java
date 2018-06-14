package com.lvwangbeta.poplar.tag.service;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.dubbo.config.annotation.Service;
import com.lvwangbeta.poplar.common.intr.TagService;
import com.lvwangbeta.poplar.common.model.Tag;
import com.lvwangbeta.poplar.tag.dao.TagDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

@Service
public class TagServiceImpl implements TagService {

	//@Autowired
	//@Qualifier("tagIndexService")
	//private TagIndexService tagIndexService;
	
	@Autowired
	@Qualifier("tagDao")
	private TagDAO tagDao;

	
	/*
	public List<Tag> searchTag(String term) {
		List<Integer> tag_ids = tagIndexService.findTag(term);
		return getTagsByIDs(tag_ids);
	}
	*/

	/**
	 * 获取推荐tag
	 * 简单实现，获取有cover的tag
	 * @param user_id
	 * @return
	 */
	public List<Tag> getRecommendTags(int user_id){

		return tagDao.getTagsHasCover();
	}
	
	public Tag getTagByID(int id) {
		return tagDao.getTagByID(id);
	}
	
	public List<Tag> getTagsByIDs(List<Integer> ids) {
		List<String> ids_str = new ArrayList<String>();
		for(int i=0; i<ids.size(); i++) {
			ids_str.add(String.valueOf(ids.get(i)));
		}
		return tagDao.getTags(ids_str.toString().replace('[', ' ').replace(']', ' '));
	}

}
