package com.lvwang.osf.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.lvwang.osf.dao.UserDAO;
import com.lvwang.osf.model.User;

@Repository("userDao")
public class UserDAOImpl implements UserDAO{

	private static final String TABLE = "osf_users"; 
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private NamedParameterJdbcTemplate namedParaJdbcTemplate;
	
	@Autowired
	@Qualifier("redisTemplate")
	private RedisTemplate<String, String> redisTemplate; 
	
	@Resource(name="redisTemplate")
	private HashOperations<String, String, Object> mapOps;
	
	private User queryUser(String sql, Object[] args) {
		User user = jdbcTemplate.query(sql, args, new ResultSetExtractor<User>(){

			public User extractData(ResultSet rs) throws SQLException,
					DataAccessException {
				User user = null;
				if(rs.next()) {
					user = new User();
					user.setId(rs.getInt("id"));
					user.setUser_name(rs.getString("user_name"));
					user.setUser_email(rs.getString("user_email"));
					//user.setUser_pwd(rs.getString("user_pwd"));
					user.setUser_registered_date(rs.getDate("user_registered_date"));
					user.setUser_status(rs.getInt("user_status"));	
					user.setUser_activationKey(rs.getString("user_activationKey"));
					user.setUser_avatar(rs.getString("user_avatar"));
					user.setUser_desc(rs.getString("user_desc"));
				}
				return user;
			}

		});

		return user;
	}
	
	public User getUserByID(int id) {
		String key = "user:"+id;
		User user = (User) mapOps.get("user", key);
		if(user == null) {
			String sql = "select * from "+TABLE + " where id=?";
			user = queryUser(sql, new Object[]{id});
			mapOps.put("user", key, user);
		}
		return user;
	}

	public User getUserByEmail(String email) {
		String sql = "select * from " + TABLE + " where user_email=?";
		return queryUser(sql, new Object[]{email});
	}

	public User getUserByUsername(String username) {
		String sql = "select * from " + TABLE + " where user_name=?";
		return queryUser(sql, new Object[]{username});
	}

	public String getPwdByEmail(String email) {
		String sql = "select user_pwd from " + TABLE + " where user_email=?";
		return jdbcTemplate.query(sql, new Object[]{email}, new ResultSetExtractor<String>(){

			public String extractData(ResultSet rs) throws SQLException,
					DataAccessException {
				String password = null;
				if(rs.next()){
					password = rs.getString("user_pwd");
				}
				return password;
			}
			
		});
	}

	public User getUser(String condition, Object[] args){
		String sql = "select * from " + TABLE + " where "+condition+"=?";
		return queryUser(sql, args);
	}
	
	public List<User> getUsersByIDs(List<Integer> ids) {
		if(ids == null || ids.size() == 0){
			return new ArrayList<User>();
		}
		
		String sql = "select * from "+ TABLE + " where id in (:ids)";
		HashMap<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("ids", ids);
		return namedParaJdbcTemplate.query(sql, paramMap, new RowMapper<User>() {

			public User mapRow(ResultSet rs, int row) throws SQLException {
				User user = new User();
				user.setId(rs.getInt("id"));
				user.setUser_name(rs.getString("user_name"));
				user.setUser_email(rs.getString("user_email"));
				//user.setUser_pwd(rs.getString("user_pwd"));
				user.setUser_registered_date(rs.getDate("user_registered_date"));
				user.setUser_status(rs.getInt("user_status"));	
				user.setUser_activationKey(rs.getString("user_activationKey"));
				user.setUser_avatar(rs.getString("user_avatar"));
				user.setUser_desc(rs.getString("user_desc"));
				return user;
			}
		});
		
	}
	
	public List<User> getUsersByIDs(int[] ids) {
		StringBuffer sb = new StringBuffer();
		sb.append("select * from "+ TABLE+" where id in (");
		for(int i=0; i<ids.length; i++){
			if(i != 0)
				sb.append(",");
			sb.append(ids[i]);
		}
		sb.append(")");
		System.out.println(sb.toString());
		List<User> users = jdbcTemplate.query(sb.toString(), new RowMapper<User>(){

			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				User user = new User();
				user.setId(rs.getInt("id"));
				user.setUser_name(rs.getString("user_name"));
				user.setUser_email(rs.getString("user_email"));
				user.setUser_pwd(rs.getString("user_pwd"));
				user.setUser_registered_date(rs.getDate("user_registered_date"));
				user.setUser_status(rs.getInt("user_status"));	
				user.setUser_desc(rs.getString("user_desc"));
				return user;
			}
		});
		return users;
		
	}
	
	//返回生成主键 user id
	public int save(final User user) {
		final String sql = "insert into " + TABLE + 
					 "(user_name, user_email, user_pwd, user_activationKey, user_status, user_avatar) "
					 + "values(?,?,?,?,?,?)";
		//jdbcTemplate.update(sql);
		
		KeyHolder keyHolder = new GeneratedKeyHolder();
		jdbcTemplate.update(new PreparedStatementCreator() {
			
			public PreparedStatement createPreparedStatement(Connection con)
					throws SQLException {
				PreparedStatement ps = con.prepareStatement(sql, new String[]{"id"});
				ps.setString(1, user.getUser_name());
				ps.setString(2, user.getUser_email());
				ps.setString(3, user.getUser_pwd());
				ps.setString(4, user.getUser_activationKey());
				ps.setInt(5, user.getUser_status());
				ps.setString(6, user.getUser_avatar());
				return ps;
			}
		}, keyHolder );
		return keyHolder.getKey().intValue();
		
	}

	public int activateUser(final User user) {
		final String sql = "update " + TABLE + " set user_status=?, user_activationKey=?"+
					 " where id=?";
		return jdbcTemplate.update(new PreparedStatementCreator() {
			
			public PreparedStatement createPreparedStatement(Connection con)
					throws SQLException {
				PreparedStatement ps = con.prepareStatement(sql);
				ps.setInt(1, user.getUser_status());
				ps.setString(2, user.getUser_activationKey());
				ps.setInt(3, user.getId());
				return ps;
			}
		});
		
	}
	

	
	
	//delete user by user id
	public boolean delete(int id) {
		// TODO Auto-generated method stub
		String sql = "delete from " + TABLE + " where id=";
		int effrows = jdbcTemplate.update(sql, id);
		return effrows==1?true:false;
		
	}
	
	public void updateActivationKey(final int user_id, final String key){
		final String  sql = "update " + TABLE + " set user_activationKey=? where id=?";
		jdbcTemplate.update(new PreparedStatementCreator() {
			
			public PreparedStatement createPreparedStatement(Connection con)
					throws SQLException {
				PreparedStatement ps =  con.prepareStatement(sql);
				ps.setString(1, key);
				ps.setInt(2, user_id);
				return ps;
			}
		});
	}
	
	public void updateAvatar(final int user_id, final String avatar){
		final String sql = "update " + TABLE + " set user_avatar=? where id=?";
		jdbcTemplate.update(new PreparedStatementCreator() {
			
			public PreparedStatement createPreparedStatement(Connection con)
					throws SQLException {
				PreparedStatement ps =  con.prepareStatement(sql);
				ps.setString(1, avatar);
				ps.setInt(2, user_id);
				return ps;
			}
		});
		
		//update cahce
		User user = (User)mapOps.get("user", "user:"+user_id);
		if(user == null) {
			user = getUserByID(user_id);
		}
		user.setUser_avatar(avatar);
		mapOps.put("user", "user:"+user_id, user);
	}

	public List<User> getUsers(int count) {
		// TODO Auto-generated method stub
		String sql = "select * from " + TABLE + " limit ?";
		return jdbcTemplate.query(sql, new Object[]{count}, new RowMapper<User>(){

			public User mapRow(ResultSet rs, int arg1) throws SQLException {
				User user = new User();
				user.setId(rs.getInt("id"));
				user.setUser_avatar(rs.getString("user_avatar"));
				user.setUser_email(rs.getString("user_email"));
				user.setUser_name(rs.getString("user_name"));
				user.setUser_registered_date(rs.getTimestamp("user_registered_date"));
				user.setUser_status(rs.getInt("user_status"));
				user.setUser_desc(rs.getString("user_desc"));
				return user;
			}
			
		});
	}

	public void updateUsernameAndDesc(final int user_id, final String username, final String desc) {
		final String sql = "update " + TABLE + " set user_name=?, user_desc=? where id=?";
		jdbcTemplate.update(new PreparedStatementCreator() {
			
			public PreparedStatement createPreparedStatement(Connection con)
					throws SQLException {
				PreparedStatement ps =  con.prepareStatement(sql);
				ps.setString(1, username);
				ps.setString(2, desc);
				ps.setInt(3, user_id);
				return ps;
			}
		});
		
		//update cahce
		User user = (User)mapOps.get("user", "user:"+user_id);
		user.setUser_name(username);
		user.setUser_desc(desc);
		mapOps.put("user", "user:"+user_id, user);
		
	}

	public String getRestPwdKey(String email) {
		String sql = "select resetpwd_key from " + TABLE + " where user_email=?";
		return jdbcTemplate.query(sql, new Object[]{email}, new ResultSetExtractor<String>(){

			public String extractData(ResultSet rs) throws SQLException,
					DataAccessException {
				String key = null;
				if(rs.next()) {
					key = rs.getString("resetpwd_key");
				}
				return key;
			}
			
		});
	}

	public void updateResetPwdKey(final String email, final String key) {
		final String sql = "update " + TABLE + " set resetpwd_key=? where user_email=?";
		jdbcTemplate.update(new PreparedStatementCreator() {
			
			public PreparedStatement createPreparedStatement(Connection con)
					throws SQLException {
				PreparedStatement ps =  con.prepareStatement(sql);
				ps.setString(1, key);
				ps.setString(2, email);
				return ps;
			}
		});
		
	}

	public void updatePassword(final String email, final String password) {
		final String sql = "update " + TABLE + " set user_pwd=? where user_email=?";
		jdbcTemplate.update(new PreparedStatementCreator() {
			
			public PreparedStatement createPreparedStatement(Connection con)
					throws SQLException {
				PreparedStatement ps =  con.prepareStatement(sql);
				ps.setString(1, password);
				ps.setString(2, email);
				return ps;
			}
		});
	}

	public void insertToken(String token, User user) {
		mapOps.put("tokens:", token, user);
	}

	public void delToken(String token) {
		mapOps.delete("tokens:", token);
	}
	
	public boolean containsToken(String token) {
		return mapOps.hasKey("tokens:", token);
	}

	public User getUserByToken(String token) {
		return (User) mapOps.get("tokens:", token);
	}
	
}
