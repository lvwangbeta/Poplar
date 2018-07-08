package com.lvwangbeta.poplar.api.controller;

import com.alibaba.dubbo.config.annotation.Reference;

import com.lvwangbeta.poplar.common.intr.UserService;
import com.lvwangbeta.poplar.common.model.Message;
import com.lvwangbeta.poplar.common.model.User;
import com.lvwangbeta.poplar.common.util.Property;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Reference
    private UserService userService;

    @ResponseBody
    @RequestMapping(value="/register/{username}/{email}/{password}")
    public Message register(@PathVariable("username") String username, @PathVariable("email") String email, @PathVariable("password") String password) {
        logger.debug("[Register begin] username:" + username + ", email:" + email);
        Message message = new Message();
        message = userService.register(username, email, password, message);
        if(message.getErrno().equals(Property.SUCCESS_ACCOUNT_REG)) {
            message.add("token", userService.genToken((User)message.get("user")));
        }
        logger.debug("[Register end] errno:" + message.getErrno());
        return message;
    }


    @ResponseBody
    @RequestMapping("/login/{email}/{password}")
    public Message login(@PathVariable String email, @PathVariable String password) {
        logger.debug("[Login begin] email:" + email);
        Message message = userService.login(email, password);
        if(Property.isSuccess(message.getErrno())) {
            message.add("token", userService.genToken((User)message.get("user")));
        }
        logger.debug("[Login end] errno:" + message.getErrno());
        return message;
    }

    @ResponseBody
    @RequestMapping(value="/logout", method=RequestMethod.POST)
    public Message logout(@RequestAttribute("token") String token) {
        logger.debug("[Logout begin] token:" + token);
        Message message = new Message();
        userService.delToken(token);
        message.setErrno(Property.SUCCESS_ACCOUNT_LOGOUT);
        logger.debug("[Logout end]");
        return message;
    }

    @ResponseBody
    @RequestMapping(value="/replace/avatar/{img}")
    public Message replaceAvatar(@RequestAttribute("uid") int uid, @PathVariable("img") String img) {
        logger.debug("[Replace Avatar begin] user id:" + uid + " , image url:" + img);
        Message message = new Message();
        userService.replaceAvatar(uid, img+".jpg");
        message.add("avatar", img+".jpg");
        message.setErrno(Property.SUCCESS_AVATAR_CHANGE);
        logger.debug("[Replace Avatar end] errno:" + message.getErrno());
        return message;
    }

    @ResponseBody
    @RequestMapping(value="/check/email/{email}")
    public Message isEmailExist(@PathVariable("email") String email){
        logger.debug("[Check email exist begin] email" + email);
        Message message = new Message();
        User user = userService.findByEmail(email);
        if(user == null || user.getId() == 0) {
            message.setErrno(Property.ERROR_EMAIL_NOT_REG);
            logger.debug("email NOT exist");
        } else {
            message.setErrno(Property.ERROR_EMAIL_EXIST);
            logger.debug("email exist");
        }
        logger.debug("[Check email exist end]");
        return message;
    }
}
