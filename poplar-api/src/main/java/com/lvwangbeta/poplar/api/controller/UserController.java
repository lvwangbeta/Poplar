package com.lvwangbeta.poplar.api.controller;

import com.alibaba.dubbo.config.annotation.Reference;

import com.lvwangbeta.poplar.common.intr.UserService;
import com.lvwangbeta.poplar.common.model.Message;
import com.lvwangbeta.poplar.common.model.User;
import com.lvwangbeta.poplar.common.util.Property;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Reference
    private UserService userService;

    @ResponseBody
    @RequestMapping(value="/register/{username}/{email}/{password}")
    public Message register(@PathVariable("username") String username, @PathVariable("email") String email, @PathVariable("password") String password) {
        Message message = new Message();
        message = userService.register(username, email, password, message);
        if(message.getErrno().equals(Property.SUCCESS_ACCOUNT_REG)) {
            message.add("token", userService.genToken((User)message.get("user")));
        }
        return message;
    }


    @ResponseBody
    @RequestMapping("/login/{email}/{password}")
    public Message login(@PathVariable String email, @PathVariable String password) {
        Message message = userService.login(email, password);
        if(Property.isSuccess(message.getErrno())) {
            message.add("token", userService.genToken((User)message.get("user")));
        }
        return message;
    }

    @ResponseBody
    @RequestMapping(value="/replace/avatar/{img}")
    public Message replaceAvatar(@RequestAttribute("uid") int uid, @PathVariable("img") String img) {
        Message message = new Message();
        userService.replaceAvatar(uid, img+".jpg");
        message.add("avatar", img+".jpg");
        message.setErrno(Property.SUCCESS_AVATAR_CHANGE);
        return message;
    }

    @ResponseBody
    @RequestMapping(value="/check/email/{email}")
    public Message isEmailExist(@PathVariable("email") String email){
        Message message = new Message();
        User user = userService.findByEmail(email);
        if(user == null || user.getId() == 0) {
            message.setErrno(Property.ERROR_EMAIL_NOT_REG);
        } else {
            message.setErrno(Property.ERROR_EMAIL_EXIST);
        }
        return message;
    }
}
