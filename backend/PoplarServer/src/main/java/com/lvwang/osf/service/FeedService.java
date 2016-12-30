package com.lvwang.osf.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.lvwang.osf.dao.FeedDAO;
import com.lvwang.osf.model.Event;
import com.lvwang.osf.model.Relation;
import com.lvwang.osf.model.Tag;
import com.lvwang.osf.model.User;
import com.lvwang.osf.search.EventIndexService;

@Service("feedService")
public class FeedService {

	public static final int FEED_COUNT_PER_PAGE = 10;
	public static final int FEED_COUNT = 200;	//feed缓存量
	
	@Autowired
	@Qualifier("followService")
	private FollowService followService;
	
	@Autowired
	@Qualifier("feedDao")
	private FeedDAO feedDao;
	
	@Autowired
	@Qualifier("eventService")
	private EventService eventService;
	
	@Autowired
	@Qualifier("userService")
	private UserService userService;
	
	@Autowired
	@Qualifier("likeService")
	private LikeService likeService;
	
	@Autowired
	@Qualifier("commentService")
	private CommentService commentService;
	
	@Autowired
	@Qualifier("interestService")
	private InterestService interestService;
	
	@Autowired
	@Qualifier("relationService")
	private RelationService relationService;
	
	@Autowired
	@Qualifier("eventIndexService")
	private EventIndexService eventIndexService;
	
	public void push(List<Integer> followers, int event_id) {
		if(followers != null && followers.size()!=0) {
			for(Integer follower: followers) {
				feedDao.save("feed:user:"+follower, event_id);
			}
		}
	}
	
	/**
	 * 缓存feed到对应标签列表序列中
	 * 
	 * @param tag_id
	 * @param event_id
	 */
	public void cacheFeed2Tag(int tag_id, int event_id) {
		feedDao.save("feed:tag:"+tag_id, event_id);
	}
	
	public void cacheFeeds2Tag(int tag_id, List<Integer> events_id) {
		feedDao.saveAll("feed:tag:"+tag_id, events_id);
	}
	
	private List<Integer> getEventIDs(int user_id, int start, int count) {
		return feedDao.fetch("feed:user:"+user_id, start, count);
	}
	
	public List<Event> getFeeds(int user_id) {
		return getFeeds(user_id, FEED_COUNT_PER_PAGE);
	}
	
	public List<Event> getFeeds(int user_id, int count){
		List<Integer> event_ids = getEventIDs(user_id, 0, count-1);
		return decorateFeeds(user_id, event_ids);
	}
	
	private List<Event> decorateFeeds(int user_id, List<Integer> event_ids){
		List<Event> events = new ArrayList<Event>();
		if(event_ids != null && event_ids.size()!=0 ) {
			events = eventService.getEventsWithIDs(event_ids);
			addUserInfo(events);
			updLikeCount(user_id, events);
			addCommentCount(events);
		}
		System.out.println("events size: "+events.size());
		return events;
	}
	
	public List<Event> getFeedsOfPage(int user_id, int num) {
		long all_feeds_count = feedDao.count("feed:user:"+user_id);
		System.out.println("all feeds count :" + all_feeds_count);
		List<Integer> event_ids = feedDao.fetch("feed:user:"+user_id, 
												FEED_COUNT_PER_PAGE*(num-1), 
												FEED_COUNT_PER_PAGE-1);
		return decorateFeeds(user_id, event_ids);
		
	}
	
	public List<Event> getFeedsOfPage(int user_id, int num, int feed_id) {
		List<Integer> event_ids = new ArrayList<Integer>(); 
		int index = -1;
		long all_feeds_count = feedDao.count("feed:user:"+user_id);
		System.out.println("all feeds count :" + all_feeds_count);
		while(index == -1) {
			event_ids = feedDao.fetch("feed:user:"+user_id, 
					FEED_COUNT_PER_PAGE*(num-1)-1, 
					FEED_COUNT_PER_PAGE);
			
			if(FEED_COUNT_PER_PAGE*num >= all_feeds_count) {
				break;
			}
			
			num++;
			index = event_ids.indexOf(feed_id);
			System.out.println("index: " + index);
		}
		if(index != -1) {
			event_ids = event_ids.subList(index+1, event_ids.size());
			System.out.println("len: " + event_ids.size());
			for(int id: event_ids) {
				System.out.println("event id:"+id);
			}
		}
		return decorateFeeds(user_id, event_ids);
	}
	
	
	public List<Event> addUserInfo(List<Event> events) {
		if(events == null || events.size() == 0)
			return events;
		for(Event event : events) {
			User user = userService.findById(event.getUser_id());
			event.setUser_name(user.getUser_name());
			event.setUser_avatar(user.getUser_avatar());
		}
		return events;
	}
	
	public void updLikeCount(int user_id, List<Event> events){
		if(events == null || events.size() == 0)
			return;
		for(Event event : events) {
			event.setLike_count((int)likeService.likersCount(event.getObject_type(), 
															 event.getObject_id()));
			event.setIs_like(likeService.isLike(user_id, 
												event.getObject_type(), 
												event.getObject_id()));
		}
	}
	
	public void addCommentCount(List<Event> events){
		if(events == null || events.size() == 0)
			return;
		for(Event event : events) {
			event.setComment_count(commentService.getCommentsCount(event.getObject_type(), 
															 	   event.getObject_id()));
		}
	}
	
	public void pull() {
		
	}
	
	public void delete(int user_id, int event_id) {
		feedDao.delete("feed:user:"+user_id, event_id);
	}

	/**
	 * 获取tag标签的feed
	 * 
	 * @param user_id
	 * @param tag_id
	 * @return
	 */
	public List<Event> getFeedsByTag(int user_id, int tag_id) {
		return getFeedsByTag(user_id, tag_id, FEED_COUNT_PER_PAGE);
	}
	
	public List<Event> getFeedsByTag(int user_id, int tag_id, int count){
		List<Integer> event_ids = getEventIDsByTag(tag_id, 0, count-1);
		return decorateFeeds(user_id, event_ids);
	}
	
	public List<Event> getFeedsByTagOfPage(int user_id, int tag_id, int num) {
		List<Integer> event_ids = feedDao.fetch("feed:tag:"+tag_id, 
												FEED_COUNT_PER_PAGE*(num-1), 
												FEED_COUNT_PER_PAGE-1);
		return decorateFeeds(user_id, event_ids);
		
	}
	
	private List<Integer> getEventIDsByTag(int tag_id, int start, int count) {
		return feedDao.fetch("feed:tag:"+tag_id, start, count);
	}
	
	/**
	 * feeds search
	 */
	public List<Event> getFeedsByTitleOrContentContains(String term) {
		if(term == null || term.length() == 0) return new ArrayList<Event>();
		List<Integer> event_ids = eventIndexService.findByTitleOrContent(term);
		
		return decorateFeeds(0, event_ids);
	}
	public List<Event> getFeedsByTitleOrContentContains(int user_id, String term) {		
		return getFeedsByTitleOrContentContains(user_id, term, 1);
	}
	
	public List<Event> getFeedsByTitleOrContentContains(String term, int page) {
		if(term == null || term.length() == 0) return new ArrayList<Event>();
		List<Integer> event_ids = eventIndexService.findByTitleOrContent(term, (page-1)*FEED_COUNT_PER_PAGE, FEED_COUNT_PER_PAGE);
		
		return decorateFeeds(0, event_ids);
	}
	public List<Event> getFeedsByTitleOrContentContains(int user_id, String term, int page) {
		if(term == null || term.length() == 0) return new ArrayList<Event>();
		List<Integer> event_ids = eventIndexService.findByTitleOrContent(term, (page-1)*FEED_COUNT_PER_PAGE, FEED_COUNT_PER_PAGE);
		
		return decorateFeeds(user_id, event_ids);
	}
	
	/**
	 * feed推荐算法
	 * 这里只是简单实现, 可自己扩充
	 * @param user_id
	 * @return 推荐feed列表 - List<Event>
	 */
	public List<Event> getRecommendFeeds(int user_id) {
		return addUserInfo(eventService.getEventsHasPhoto(0, 20));
	}
	
	public List<Event> getRecommentFeedsOfPage(int user_id, int page) {
		return addUserInfo(eventService.getEventsHasPhoto(FEED_COUNT_PER_PAGE*(page-1), FEED_COUNT_PER_PAGE-1));
	}
	
	public void coldStart(int user_id){
		if(feedDao.count("feed:user:"+user_id) != 0){
			return ;
		}
		
		List<Tag> tags_inted = interestService.getTagsUserInterestedIn(user_id);
		List<Relation> relations = relationService.getRelationsInTags(tags_inted);
		List<Event> events = eventService.getEventsWithRelations(relations);
		
		//no choose , fetch latest feeds default
		if(events == null || events.size() == 0){
			events = eventService.getEvents(0, FEED_COUNT_PER_PAGE);
		}
			
		List<Integer> events_id = new ArrayList<Integer>();
		for(Event event : events) {
			events_id.add(event.getId());
		}
		feedDao.saveAll("feed:user:"+user_id, events_id);

	}
}
