package com.lvwangbeta.poplar.user.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


import javax.annotation.Resource;

import com.lvwangbeta.poplar.common.model.Auth;
import com.lvwangbeta.poplar.common.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;


@Repository("userDao")
public class UserDAO{


    private static final String TABLE_USER = "poplar_users";
    private static final String TABLE_AUTH = "poplar_user_auths";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private NamedParameterJdbcTemplate namedParaJdbcTemplate;

    @Autowired
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
                    user.setUser_avatar(rs.getString("user_avatar"));
                    user.setUser_desc(rs.getString("user_desc"));
                    user.setUser_gender(rs.getInt("user_gender"));
                    user.setUser_birthday(rs.getString("user_birthday"));
                    user.setUser_location(rs.getString("user_location"));
                    user.setUser_cover(rs.getString("user_cover"));
                }
                return user;
            }

        });

        return user;
    }

    public Auth getUserAuthBy(int identifyType, String identifier) {
        String sql = "select * from " + TABLE_AUTH + " where identify_type=? and identifier=?";
        return jdbcTemplate.query(sql, new Object[]{identifyType, identifier}, new ResultSetExtractor<Auth>() {
            @Override
            public Auth extractData(ResultSet rs) throws SQLException, DataAccessException {
                Auth auth = null;
                if(rs.next()) {
                    auth = new Auth();
                    auth.setId(rs.getInt("id"));
                    auth.setUser_id(rs.getInt("user_id"));
                    auth.setIndentify_type(rs.getInt("identify_type"));
                    auth.setIdentifier(rs.getString("identifier"));
                    auth.setCredential(rs.getString("credential"));
                }
                return auth;
            }
        });
    }

    public User getUserByEmail(String email) {
        Auth auth = getUserAuthBy(1, email);
        if(auth == null) {
            return null;
        }
        String sql = "select * from " + TABLE_USER + " where id=?";
        return queryUser(sql, new Object[]{auth.getUser_id()});
    }

    public User getUserByID(int id) {
        String key = "user:"+id;
        User user = (User) mapOps.get("user", key);
        if(user == null) {
            String sql = "select * from "+TABLE_USER + " where id=?";
            user = queryUser(sql, new Object[]{id});
            mapOps.put("user", key, user);
        }
        return user;
    }


    //返回生成主键 user id
    public int save(User user, Auth auth) {
        final String sql = "insert into " + TABLE_USER +
                           "(user_name, user_avatar, user_desc, user_gender, user_birthday, user_location, user_cover) " +
                           "values(?,?,?,?,?,?,?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(new PreparedStatementCreator() {
            public PreparedStatement createPreparedStatement(Connection con)
                    throws SQLException {
                PreparedStatement ps = con.prepareStatement(sql, new String[]{"id"});
                ps.setString(1, user.getUser_name());
                ps.setString(2, user.getUser_avatar());
                ps.setString(3, user.getUser_desc());
                ps.setInt(4, user.getUser_gender());
                ps.setString(5, user.getUser_birthday());
                ps.setString(6, user.getUser_location());
                ps.setString(7, user.getUser_cover());
                return ps;
            }
        }, keyHolder );
        int id = keyHolder.getKey().intValue();

        final String authSql = "insert into " + TABLE_AUTH +
              "(user_id, identify_type, identifier, credential) " +
              "values(?,?,?,?)";
        jdbcTemplate.update(new PreparedStatementCreator(){
            public PreparedStatement createPreparedStatement(Connection con)
                    throws SQLException {
                PreparedStatement ps = con.prepareStatement(authSql);
                ps.setInt(1, id);
                ps.setInt(2, auth.getIndentify_type());
                ps.setString(3, auth.getIdentifier());
                ps.setString(4, auth.getCredential());
                return ps;
            }
        });
        return id;
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

    public void updateAvatar(final int user_id, final String user_avatar) {
        final String sql = "update " + TABLE_USER + " set user_avatar=? where id=?";
        jdbcTemplate.update(new PreparedStatementCreator() {

            public PreparedStatement createPreparedStatement(Connection con)
                    throws SQLException {
                PreparedStatement ps =  con.prepareStatement(sql);
                ps.setString(1, user_avatar);
                ps.setInt(2, user_id);
                return ps;
            }
        });
        //del cache
        mapOps.delete("user", "user:"+user_id);
    }

}
