package com.lvwangbeta.poplar.feed.dao;

import java.util.List;
import java.util.Map;

import com.lvwangbeta.poplar.common.model.Event;
import org.apache.ibatis.annotations.Param;


public interface EventDAO {
	
	String TABLE = "poplar_events";
	
	int save(Event event);
	
	List<Event> getEvents(@Param("start") int start, @Param("step") int step);
	List<Event> getEventsWithIDs(@Param("event_ids") List<Integer> event_ids);
	List<Event> getEventsWithRelations(Map<Integer, List<Integer>> relations);
	List<Event> getEventsOfUser(int user_id, int count);
	List<Event> getEventsOfUserFrom(int user_id, int start, int count);
	List<Event> getEventsHasPhoto(int start, int step);
	void delete(int id);
	void deleteByObject(int object_type, int object_id);
	Event getEvent(int object_type, int object_id);
}
