package com.lvwang.osf.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.lvwang.osf.dao.AlbumDAO;
import com.lvwang.osf.dao.EventDAO;
import com.lvwang.osf.model.Album;
import com.lvwang.osf.model.Event;
import com.lvwang.osf.model.Photo;
import com.lvwang.osf.model.Post;
import com.lvwang.osf.model.Relation;
import com.lvwang.osf.model.ShortPost;
import com.lvwang.osf.search.EventIndexService;
import com.lvwang.osf.util.Dic;

@Service("eventService")
public class EventService {
	
	@Autowired
	@Qualifier("eventDao")
	private EventDAO eventDao; 
	
	@Autowired
	@Qualifier("albumDao")
	private AlbumDAO albumDao;
		
	@Autowired
	@Qualifier("eventIndexService")
	private EventIndexService eventIndexService;
	
	private Event toEvent(int object_type, Object obj) {
		Event event = new Event();
		if(Dic.OBJECT_TYPE_POST == object_type) {
			Post post = (Post)obj;
			event.setObject_type(Dic.OBJECT_TYPE_POST);
			event.setObject_id(post.getId());
			event.setUser_id(post.getPost_author());
			event.setTitle(post.getPost_title());
			event.setSummary(post.getPost_excerpt());
			event.setContent(post.getPost_cover());
			event.setLike_count(post.getLike_count());
			event.setShare_count(post.getShare_count());
			event.setComment_count(post.getComment_count());
			event.setTags_list(post.getPost_tags_list());
			
		} else if(Dic.OBJECT_TYPE_ALBUM == object_type) {
			Album album = (Album)obj;
			event.setObject_type(Dic.OBJECT_TYPE_ALBUM);
			event.setObject_id(album.getId());
			event.setUser_id(album.getUser_id());
			event.setTitle(album.getCover());
			event.setSummary(album.getAlbum_desc());
			
			List<Photo> photos = album.getPhotos();
			StringBuffer keys = new StringBuffer();
			for(Photo photo:photos) {
				keys.append(photo.getKey()+":");
			}
			event.setContent(keys.toString());
			event.setLike_count(0);
			event.setShare_count(0);
			event.setComment_count(0);
			event.setTags_list(album.getAlbum_tags_list());
			
		} else if(Dic.OBJECT_TYPE_PHOTO == object_type) {
			//event_id = eventDao.savePhotoEvent((Photo)obj);
		} else if(Dic.OBJECT_TYPE_SHORTPOST == object_type){
			ShortPost spost = (ShortPost) obj;
			event.setObject_type(Dic.OBJECT_TYPE_SHORTPOST);
			event.setObject_id(spost.getId());
			event.setSummary(spost.getPost_content());
			event.setUser_id(spost.getPost_author());
			event.setLike_count(spost.getLike_count());
			event.setShare_count(spost.getShare_count());
			event.setComment_count(spost.getComment_count());
		}
		return event;
	}
	
	/**
	 * 保存event，并索引
	 * @param object_type
	 * @param obj
	 * @return event_id
	 */
	public int newEvent(int object_type, Object obj) {
		Event event = toEvent(object_type, obj);
		int event_id = eventDao.save(event);
		event.setId(event_id);
		eventIndexService.add(event, obj);
		return event_id;
	}
	
	/**
	 * 
	 * @param limit
	 * @param count
	 * @return
	 */
	public List<Event> getEvents(int start, int step) {
		return eventDao.getEvents(start, step);
	}
	
	
	/*
	 * 根据relation关系(object_type, object_id)查询event
	 */
	public List<Event> getEventsWithRelations(List<Relation> relations) {
		List<Event> events = new ArrayList<Event>();
		if(relations != null && relations.size() != 0) {
			Map<Integer, List<Integer>> category = new HashMap<Integer, List<Integer>>();
			for(Relation relation : relations) {
				if(!category.containsKey(relation.getObject_type())) {
					category.put(relation.getObject_type(), new ArrayList<Integer>());
				}
				category.get(relation.getObject_type()).add(relation.getObject_id());
			}
			events = eventDao.getEventsWithRelations(category);
		}
		return events;
	}
	
	/**
	 * 获取含有图片的Event
	 * @param start 
	 * @param step
	 * @return 
	 */
	public List<Event> getEventsHasPhoto(int start, int step) {
		return eventDao.getEventsHasPhoto(start, step);
	}
	
	public Event getEvent(int object_type, int object_id){
		return eventDao.getEvent(object_type, object_id);
	}
	
	/*
	 * 根据event id查询event
	 */
	public List<Event> getEventsWithIDs(List<Integer> event_ids) {
		return eventDao.getEventsWithIDs(event_ids);
	}
	
	public List<Event> getEventsOfUser(int user_id, int count){
		return eventDao.getEventsOfUser(user_id, count);
	}
	
	public List<Event> getEventsOfUser(int user_id, int start, int count){
		return eventDao.getEventsOfUserFrom(user_id, start, count);
	}
		
	
	public void delete(int id){
		eventDao.delete(id);
	}
	
	public void delete(int object_type, int object_id){
		eventDao.deleteByObject(object_type, object_id);
	}
	
	
}
