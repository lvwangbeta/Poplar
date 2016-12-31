package com.lvwang.osf.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.lvwang.osf.model.Event;


public interface EventDAO {
	
	String TABLE = "osf_events";
	
	int save(Event event);
	
	List<Event> getEvents(@Param("start")int start, @Param("step")int step);
	
	
	List<Event> getEventsWithIDs(@Param("event_ids")List<Integer> event_ids);
	List<Event> getEventsWithRelations(Map<Integer, List<Integer>> relations);
	List<Event> getEventsOfUser(int user_id, int count);
	List<Event> getEventsOfUserFrom(int user_id, int start, int count);
	List<Event> getEventsHasPhoto(int start, int step);
	void delete(int id);
	void deleteByObject(int object_type, int object_id);
	Event getEvent(int object_type, int object_id);
}
