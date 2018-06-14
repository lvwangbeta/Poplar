package com.lvwangbeta.poplar.api.service;

import com.lvwangbeta.poplar.common.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("authService")
public class AuthService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Resource(name="redisTemplate")
    private HashOperations<String, String, Object> mapOps;

    public User getUserByToken(String token) {
        return (User) mapOps.get("tokens:", token);
    }
}
