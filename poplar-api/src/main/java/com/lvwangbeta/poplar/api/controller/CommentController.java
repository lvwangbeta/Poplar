package com.lvwangbeta.poplar.api.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.lvwangbeta.poplar.common.intr.CommentService;
import com.lvwangbeta.poplar.common.intr.FeedService;
import com.lvwangbeta.poplar.common.intr.UserService;
import com.lvwangbeta.poplar.common.model.Comment;
import com.lvwangbeta.poplar.common.model.Message;
import com.lvwangbeta.poplar.common.model.User;
import com.lvwangbeta.poplar.common.util.Property;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/v1/comment")
public class CommentController {

    @Reference
    private CommentService commentService;

    @Reference
    private UserService userService;

    /*
    @Autowired
    @Qualifier("notificationService")
    private NotificationService notificationService;
    */

    @Reference
    private FeedService feedService;

    @ResponseBody
    @RequestMapping("/{id}")
    public Message comment(@PathVariable("id") int id) {
        Comment comment = commentService.findCommentByID(id);
        Message message = new Message();
        if(comment == null) {
            message.setErrno(Property.ERROR);
        }else {
            message.setErrno(Property.SUCCESS);
            message.add("comment", comment);
        }
        return message;
    }

    @ResponseBody
    @RequestMapping(value="/create", method=RequestMethod.POST)
    public Message createComment(@RequestBody Comment comment, @RequestAttribute("uid") Integer id) {
        Message message = new Message();
        User user = (User)userService.findById(id);
        User comment_parent_author = new User();
        if(comment.getComment_parent() !=0 ){
            comment_parent_author = commentService.getCommentAuthor(comment.getComment_parent());
        }

        message = commentService.newComment(comment.getComment_object_type(),
                comment.getComment_object_id(),
                user.getId(),
                user.getUser_name(),
                comment.getComment_content(),
                comment.getComment_parent(),
                comment_parent_author.getId(),
                comment_parent_author.getUser_name(),
                message);

        /*
        Notification notification =  new Notification(Dic.NOTIFY_TYPE_COMMENT,
                Integer.parseInt(ret.get("id")),
                comment.getComment_object_type(),
                comment.getComment_object_id(),
                userService.getAuthor(comment.getComment_object_type(),
                        comment.getComment_object_id()).getId(),
                user.getId()
        );
        if(comment.getComment_parent()!=0) {
            //reply notification
            notification.setNotify_type(Dic.NOTIFY_TYPE_COMMENT_REPLY);
            notification.setNotified_user(comment_parent_author.getId());
            notificationService.doNotify(notification);
        } else {
            //comment notification
            notificationService.doNotify(notification);
        }
        */
        return message;
    }

    /**
     * feed附属的comments
     * @param type
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping(value="/{type}/{id}")
    public Message getComments(@PathVariable("type") String type, @PathVariable("id") int id) {
        System.out.println("comment to feed type:"+type + " id:"+id);
        Message message = new Message();
        message.add("comments", commentService.getComments(type, id));
        message.setErrno(Property.SUCCESS);
        return message;
    }


}