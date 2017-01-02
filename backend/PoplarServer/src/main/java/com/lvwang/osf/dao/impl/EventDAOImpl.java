package com.lvwang.osf.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.lvwang.osf.dao.EventDAO;
import com.lvwang.osf.mappers.EventMapper;
import com.lvwang.osf.model.Event;
import com.lvwang.osf.model.Post;
import com.lvwang.osf.service.TagService;
import com.lvwang.osf.util.Dic;

@Repository("eventDao")
public class EventDAOImpl implements EventDAO{

	private static final String TABLE = "osf_events";
	
//	@Autowired
//	private JdbcTemplate jdbcTemplate; 
//	
//	@Autowired
//	private NamedParameterJdbcTemplate namedParaJdbcTemplate;
	
	@Autowired
	private EventMapper eventMapper;
	
	public int save(final Event event) {
		eventMapper.save(event);
		return event.getId();
		
//		final String sql = "insert into " + TABLE + " values(null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
//		KeyHolder keyHolder = new GeneratedKeyHolder();
//		jdbcTemplate.update(new PreparedStatementCreator() {
//			
//			public PreparedStatement createPreparedStatement(Connection con)
//					throws SQLException {
//				PreparedStatement ps = con.prepareStatement(sql, new String[]{"id"});
//				ps.setInt(1, event.getObject_type());
//				ps.setInt(2, event.getObject_id());
//				ps.setTimestamp(3, (Timestamp) event.getTs());
//				ps.setInt(4, event.getUser_id());
//				ps.setString(5, event.getUser_name());
//				ps.setString(6, event.getUser_avatar());
//				ps.setInt(7, event.getLike_count());
//				ps.setInt(8, event.getShare_count());
//				ps.setInt(9, event.getComment_count());
//				ps.setString(10, event.getTitle());
//				ps.setString(11, event.getSummary());
//				ps.setString(12, event.getContent());
//				ps.setString(13, TagService.toString(event.getTags()));
//				ps.setInt(14, event.getFollowing_user_id());
//				ps.setString(15, event.getFollowing_user_name());
//				ps.setInt(16, event.getFollower_user_id());
//				ps.setString(17, event.getFollower_user_name());
//				return ps;
//			}
//		}, keyHolder);
//		return keyHolder.getKey().intValue();
	}
	
//	public int savePostEvent(final Post post) {
		
//		final String sql = "insert into " + TABLE + "(object_type, object_id, "
//					+ "user_id, "
//					+ "like_count, share_count, comment_count, "
//					+ "title, summary, content,tags) "
//					+ "values(?,?,?,?,?,?,?,?,?,?)";
//		KeyHolder keyHolder = new GeneratedKeyHolder();
//		jdbcTemplate.update(new PreparedStatementCreator() {
//			
//			public PreparedStatement createPreparedStatement(Connection con)
//					throws SQLException {
//				PreparedStatement ps = con.prepareStatement(sql, new String[]{"id"});
//				ps.setInt(1, Dic.OBJECT_TYPE_POST);
//				ps.setInt(2, post.getId());
//				ps.setInt(3, post.getPost_author());
//				ps.setInt(4, post.getLike_count());
//				ps.setInt(5, post.getShare_count());
//				ps.setInt(6, post.getComment_count());
//				ps.setString(7, post.getPost_title());
//				ps.setString(8, post.getPost_excerpt());
//				ps.setString(9, null);
//				ps.setString(10, TagService.toString(post.getPost_tags_list()));
//				return ps;
//			}
//		}, keyHolder);
//		return keyHolder.getKey().intValue();
//	}


	public List<Event> getEventsWithIDs(List<Integer> event_ids) {
		return eventMapper.getEventsWithIDs(event_ids);
//		String sql = "select * from " + TABLE + " where id in (:ids) order by ts desc";
//		HashMap<String, Object> paramMap = new HashMap<String, Object>();
//		paramMap.put("ids", event_ids);
//		return namedParaJdbcTemplate.query(sql, paramMap, new RowMapper<Event>() {
//
//			public Event mapRow(ResultSet rs, int rowNum) throws SQLException {
//					Event event = new Event();
//					event.setComment_count(rs.getInt("comment_count"));
//					event.setContent(rs.getString("content"));
//					event.setFollower_user_id(rs.getInt("follower_user_id"));
//					event.setFollower_user_name(rs.getString("follower_user_name"));
//					event.setFollowing_user_id(rs.getInt("following_user_id"));
//					event.setFollowing_user_name(rs.getString("following_user_name"));
//					event.setId(rs.getInt("id"));
//					event.setLike_count(rs.getInt("like_count"));
//					event.setObject_id(rs.getInt("object_id"));
//					event.setObject_type(rs.getInt("object_type"));
//					event.setShare_count(rs.getInt("share_count"));
//					event.setSummary(rs.getString("summary"));
//					event.setTags(TagService.toList(rs.getString("tags")));
//					event.setTitle(rs.getString("title"));
//					event.setTs(rs.getTimestamp("ts"));
//					event.setUser_avatar(rs.getString("user_avatar"));
//					event.setUser_id(rs.getInt("user_id"));
//					event.setUser_name(rs.getString("user_name"));
//					return event;
//					return generateEvent(rs); 
//			}
//		});
		
	}
	
	public List<Event> getEventsWithRelations(Map<Integer, List<Integer>> relationsCategory) {
		
		if(relationsCategory == null || relationsCategory.size() == 0) {
			return new ArrayList<Event>();
		}
//		Map<String, List<Integer>> map = new HashMap<String, List<Integer>>();
//		for(Integer type: relationsCategory.keySet()) {	
//			map.put(String.valueOf(type), relationsCategory.get(type));
//		}
		return eventMapper.getEventsWithRelations(relationsCategory);

		
//		StringBuffer sql = new StringBuffer("select * from " + TABLE + " where ");
//		
//		int i = 0;
//		HashMap<String, Object> paramMap = new HashMap<String, Object>();
//		for(Integer type: relationsCategory.keySet()) {		
//			if(i != 0) {
//				sql.append(" or ");
//			}
//			sql.append("(object_type="+type + " and object_id in (:" + String.valueOf(type)+i +"))");
//			paramMap.put(String.valueOf(type)+i, relationsCategory.get(type));
//			i++;
//		}
//		System.out.println(sql.toString());
//		return namedParaJdbcTemplate.query(sql.toString(), paramMap, new RowMapper<Event>() {
//
//			public Event mapRow(ResultSet rs, int rowNum) throws SQLException {
//				return generateEvent(rs);
//			}
//		});
		
	}
	
//	private Event generateEvent(ResultSet rs) throws SQLException{
//		Event event = new Event();
//		event.setComment_count(rs.getInt("comment_count"));
//		event.setContent(rs.getString("content"));
//		event.setFollower_user_id(rs.getInt("follower_user_id"));
//		event.setFollower_user_name(rs.getString("follower_user_name"));
//		event.setFollowing_user_id(rs.getInt("following_user_id"));
//		event.setFollowing_user_name(rs.getString("following_user_name"));
//		event.setId(rs.getInt("id"));
//		event.setLike_count(rs.getInt("like_count"));
//		event.setObject_id(rs.getInt("object_id"));
//		event.setObject_type(rs.getInt("object_type"));
//		event.setShare_count(rs.getInt("share_count"));
//		event.setSummary(rs.getString("summary"));
//		event.setTags(TagService.toList(rs.getString("tags")));
//		event.setTitle(rs.getString("title"));
//		event.setTs(rs.getTimestamp("ts"));
//		event.setUser_avatar(rs.getString("user_avatar"));
//		event.setUser_id(rs.getInt("user_id"));
//		event.setUser_name(rs.getString("user_name"));
//		return event;		
//	}
	
	public List<Event> getEventsOfUser(int user_id, int count) {
//		String sql = "select * from " + TABLE + " where user_id=? order by ts desc limit ? ";
//		return jdbcTemplate.query(sql, new Object[]{user_id, count},  new RowMapper<Event>(){
//
//			public Event mapRow(ResultSet rs, int arg1) throws SQLException {
//				return generateEvent(rs);
//			}
//			
//		});
		return eventMapper.getEventsOfUser(user_id, count);
	}
	
	public List<Event> getEventsOfUserFrom(int user_id, int start, int count) {
		return eventMapper.getEventsOfUserFrom(user_id, start, count);
	}

	public List<Event> getEventsHasPhoto(int start, int step){
//		String sql = "select * from " + TABLE + " where (object_type=? and content is not null) "
//					 + "or (object_type=? and title is not null) limit ?,?";
//		return jdbcTemplate.query(sql, 
//								  new Object[]{
//												Dic.OBJECT_TYPE_POST, 
//												Dic.OBJECT_TYPE_ALBUM,
//												start, step},  
//								  new RowMapper<Event>(){
//
//			public Event mapRow(ResultSet rs, int arg1) throws SQLException {
//				return generateEvent(rs);
//			}
//			
//		});
		return eventMapper.getEventsHasPhoto(start, step);
	}
	
	public void delete(int id) {
// 		String sql = "delete from " + TABLE + " where id=?";
// 		jdbcTemplate.update(sql, new Object[]{id});
		eventMapper.delete(id);
	}

	public void deleteByObject(int object_type, int object_id) {
//		String sql = "delete from " + TABLE + " where object_type=? and object_id=?";
//		jdbcTemplate.update(sql, new Object[]{object_type, object_id});
		eventMapper.deleteByObject(object_type, object_id);
	}

	public Event getEvent(final int object_type, final int object_id) {
//		final String sql = "select * from " + TABLE + " where object_type=? and object_id=?";
//		return jdbcTemplate.query(new PreparedStatementCreator() {
//			
//			public PreparedStatement createPreparedStatement(Connection con)
//					throws SQLException {
//				PreparedStatement ps = con.prepareStatement(sql);
//				ps.setInt(1, object_type);
//				ps.setInt(2, object_id);
//				return ps;
//			}
//		}, new ResultSetExtractor<Event>() {
//
//			public Event extractData(ResultSet rs) throws SQLException,
//					DataAccessException {
//				if(rs.next()){
//					return generateEvent(rs);
//				}
//				return new Event();
//			}
//		});
		return eventMapper.getEvent(object_type, object_id);
	}

	public List<Event> getEvents(int start, int step) {
//		String sql = "select * from " + TABLE + " limit ?,?";		
//		return jdbcTemplate.query(sql, 
//								  new Object[]{start, step},  
//								  new RowMapper<Event>(){
//	
//			public Event mapRow(ResultSet rs, int arg1) throws SQLException {
//				return generateEvent(rs);
//			}
//			
//		});
		return  eventMapper.getEvents(start, step);
	}
}
