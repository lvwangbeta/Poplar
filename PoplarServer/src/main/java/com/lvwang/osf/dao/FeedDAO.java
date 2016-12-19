package com.lvwang.osf.dao;

import java.util.List;

public interface FeedDAO {
	
	void save(String key, int event_id);
	void saveAll(String key, List<Integer> events_id);
	void delete(String key, int event_id);
	Long count(String key);
	List<Integer> fetch(String key);
	List<Integer> fetch(String key, long start, long step);

}
