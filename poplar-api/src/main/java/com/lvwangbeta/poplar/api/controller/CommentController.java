package com.lvwangbeta.poplar.api.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.lvwangbeta.poplar.common.intr.CommentService;
import com.lvwangbeta.poplar.common.intr.FeedService;
import com.lvwangbeta.poplar.common.intr.UserService;
import com.lvwangbeta.poplar.common.model.Comment;
import com.lvwangbeta.poplar.common.model.Message;
import com.lvwangbeta.poplar.common.model.User;
import com.lvwangbeta.poplar.common.util.Property;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/v1/comment")
public class CommentController {

    public static final Logger logger = LoggerFactory.getLogger(CommentController.class);

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
        logger.debug("[New Comment begin] ");
        logger.debug("{} add comment to feed type:{} id:{}", id, comment.getComment_object_type(), comment.getComment_object_id());
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
        logger.debug("[New Comment end] ");
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
        logger.debug("[Getting comment list]  feed type:"+type + " id:"+id);
        Message message = new Message();
        List<Comment> comments = commentService.getComments(type, id);
        //add avatars;
        if(comments != null && comments.size() !=0) {
            for(Comment comment: comments) {
                comment.setComment_author_avatar(userService.findById(comment.getComment_author()).getUser_avatar());
            }
        }
        message.add("comments", comments);
        message.setErrno(Property.SUCCESS);
        logger.debug("Found {} comments", comments==null?0:comments.size());
        return message;
    }


}