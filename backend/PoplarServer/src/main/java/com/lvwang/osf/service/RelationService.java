package com.lvwang.osf.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lvwang.osf.dao.RelationDAO;
import com.lvwang.osf.model.Relation;
import com.lvwang.osf.model.Tag;
import com.lvwang.osf.util.Property;

@Service("relationService")
public class RelationService {
	
	public static final int RELATION_TYPE_POST = 0;
	public static final int RELATION_TYPE_PHOTO = 1;
	public static final int RELATION_TYPE_ALBUM = 2;
	
	@Autowired
	@Qualifier("tagService")
	private TagService tagService;
	
	@Autowired
	@Qualifier("relationDao")
	private RelationDAO relationDao;
	
	@Transactional
	public Map<String, Object> newRelation(int object_type, int object_id, int tag_id) {
		Map<String, Object> ret = new HashMap<String, Object>();
		int id = relationDao.save(new Relation(object_type, object_id, tag_id));
		if(id != 0){
			Relation relation = new Relation();
			relation.setId(id);
			relation.setObject_type(object_type);
			relation.setObject_id(object_id);
			relation.setTag_id(tag_id);
			ret.put("relation", relation);
			ret.put("status", Property.SUCCESS_RELATION_CREATE);
		} else {
			ret.put("status", Property.ERROR_RELATION_CREATE);
		}
		return ret;
	}
	
	public void newRelation(int object_type, int object_id, int[] tags_id) {
		
	}
	
	
	/**
	 * 
	 * @param tag
	 * @return
	 */
	public List<Relation> getRelationsWithTag(String tag){
		List<Relation> relations = new ArrayList<Relation>();
		int tag_id = tagService.getID(tag);
		if(tag_id != 0) {
			List<Relation> rels = relationDao.get(tag_id);
			if(rels != null)
				relations = rels;
		}
		return relations;
	}
	
	/**
	 * 获取有列表中tag的关联关系
	 * 
	 * @param tags
	 * @return
	 */
	public List<Relation> getRelationsInTags(List<Tag> tags){
		if(tags == null || tags.size() == 0)
			return new ArrayList<Relation>();
		
		List<String> tag_ids = new ArrayList<String>();
		for(Tag tag : tags) {
			tag_ids.add(String.valueOf(tag.getId()));
		}
		
		return relationDao.getRelationsInTags(tag_ids);
	}
	
}
