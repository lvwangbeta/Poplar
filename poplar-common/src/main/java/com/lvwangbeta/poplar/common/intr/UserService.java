package com.lvwangbeta.poplar.common.intr;

import com.lvwangbeta.poplar.common.model.Message;
import com.lvwangbeta.poplar.common.model.User;

public interface UserService {
    Message register(String username, String email, String password, Message message);
    User findUserByToken(String token);
    User findById(int id);
    User findByEmail(String email);
    Message login(String email, String password);
    String genToken(User user);
    void delToken(String token);
    void replaceAvatar(int uid, String img);
}
