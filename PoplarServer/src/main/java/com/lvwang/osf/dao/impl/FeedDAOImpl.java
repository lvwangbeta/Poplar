package com.lvwang.osf.dao.impl;

import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.lvwang.osf.dao.FeedDAO;
import com.lvwang.osf.service.FeedService;

@Repository("feedDao")
public class FeedDAOImpl implements FeedDAO{

	@Autowired
	@Qualifier("redisTemplate")
	private RedisTemplate<String, String> redisTemplate; 
	
	
	@Resource(name="redisTemplate")
	private ListOperations<String, Integer> listOps;
	
	public void save(String key, int event_id) {
		listOps.leftPush(key, event_id);
	}

	public void delete(String key, int event_id) {
		listOps.remove(key, 0, event_id);
		
	}

	public Long count(String key){
		return listOps.size(key);
	}
	
	public List<Integer> fetch(String key) {
		return listOps.range(key, 0, listOps.size(key)-1);
	}
	
	public List<Integer> fetch(String key, long start, long step) {
		return listOps.range(key, start, start+step);
	}

	public void saveAll(String key, List<Integer> events_id) {
		Iterator<Integer> events_it = events_id.iterator();
		int count = 0;
		while(events_it.hasNext() && count<FeedService.FEED_COUNT) {
			save(key, events_it.next());
			count++;
		}
	}


}
