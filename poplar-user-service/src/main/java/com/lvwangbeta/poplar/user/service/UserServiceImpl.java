package com.lvwangbeta.poplar.user.service;

import com.alibaba.dubbo.config.annotation.Service;
import com.lvwangbeta.poplar.common.intr.UserService;
import com.lvwangbeta.poplar.common.model.Auth;
import com.lvwangbeta.poplar.common.model.Message;
import com.lvwangbeta.poplar.common.model.User;
import com.lvwangbeta.poplar.common.util.CipherUtil;
import com.lvwangbeta.poplar.common.util.Property;
import com.lvwangbeta.poplar.user.dao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    public static final String DEFAULT_AVATAR = "default_avatar.png";

    @Autowired
    @Qualifier("userDao")
    private UserDAO userDao;

    public Message register(String username, String email, String password, Message message){
        //1 empty check
        if(email == null || email.length() <= 0) {
            message.setErrno(Property.ERROR_EMAIL_EMPTY);
            return message;
        }

        //4 ValidateEmail
        if(!ValidateEmail(email)) {
            message.setErrno(Property.ERROR_EMAIL_FORMAT);
            return message;
        }
        //5 email exist?
        Auth auth = userDao.getUserAuthBy(1, email);
        if(auth != null) {
            message.setErrno(Property.ERROR_ACCOUNT_EXIST);
            return message;
        }

        if(password == null || password.length() <= 0) {
            message.setErrno(Property.ERROR_PWD_EMPTY);
            return message;
        }
        else {
            //3 password format validate
            /*
            String vpf_rs = CipherUtil.validatePasswordFormat(password);
            if(vpf_rs != Property.SUCCESS_PWD_FORMAT)
                return vpf_rs;
            */
        }

        User user = new User();
        user.setUser_name(username);
        user.setUser_avatar(DEFAULT_AVATAR);
        auth = new Auth();
        auth.setIndentify_type(1);
        auth.setIdentifier(email);
        auth.setCredential(CipherUtil.generatePassword(password));
        int id = userDao.save(user, auth);
        user.setId(id);

        message.add("user", user);
        message.setErrno(Property.SUCCESS_ACCOUNT_REG);
        return message;
    }

    private boolean ValidateEmail(String email) {
        boolean result = true;
        /*
        try {
            InternetAddress emailAddr = new InternetAddress(email);
            emailAddr.validate();
        } catch (AddressException e) {
            result = false;
        }
        */
        return result;
    }

    public User findUserByToken(String token) {
        return userDao.getUserByToken(token);
    }
    public User findByEmail(String email) {
        User user = userDao.getUserByEmail(email);
        return user;
    }
    public User findById(int id) {
        User user = userDao.getUserByID(id);
        return user;
    }
    public Message login(String email, String password) {
        Message message = new Message();
        //1 empty check
        message.setTransok("1");
        if(email == null || email.length() <= 0) {
            message.setErrno(Property.ERROR_EMAIL_EMPTY);
            return message;
        }

        if(password == null || password.length() <= 0){
            message.setErrno(Property.ERROR_PWD_EMPTY);
            return message;
        }

        //2 ValidateEmail
        if(!ValidateEmail(email)) {
            message.setErrno(Property.ERROR_EMAIL_FORMAT);
            return message;
        }

        //3 email exist?
        User user = findByEmail(email);
        if(user == null) {
            message.setErrno(Property.ERROR_EMAIL_NOT_REG);
            return message;
        }

        //5 password validate
        Auth auth = userDao.getUserAuthBy(1, email);
        if(!CipherUtil.validatePassword(auth.getCredential(), password)) {
            message.setErrno(Property.ERROR_PWD_DIFF);
            return message;
        }
        message.setErrno(Property.SUCCESS_ACCOUNT_LOGIN);
        message.add("user", user);
        return message;
    }

    public String genToken(User user) {
        String token = UUID.randomUUID().toString();
        userDao.insertToken(token, user);
        return token;
    }
    public void delToken(String token) {
        userDao.delToken(token);
    }
    public void replaceAvatar(int uid, String img) {
        userDao.updateAvatar(uid, img);
    }
}
