package com.lvwangbeta.poplar.api.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.lvwangbeta.poplar.common.intr.*;
import com.lvwangbeta.poplar.common.model.*;
import com.lvwangbeta.poplar.common.util.Property;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;

@RestController
@RequestMapping("/api/v1/feed")
public class FeedController {

    public static final Logger logger = LoggerFactory.getLogger(FeedController.class);

    @Reference
    private UserService userService;

    @Reference
    private FeedService feedService;

    @Reference
    private CommentService commentService;

    @Reference
    private LikeService likeService;

    @Reference
    private TagService tagService;

    @Reference
    private InterestService interestService;

    @Reference
    private FollowService followService;

    @ResponseBody
    @RequestMapping("/new")
    public Message newFeed(@RequestAttribute("uid") Integer id, @RequestBody String params) throws UnsupportedEncodingException {
        logger.debug("[New feed begin] user id:"+id);
        //int event_id = 0;
        //List<Tag> tags = new ArrayList<Tag>();
        String _params = URLDecoder.decode(params,"utf-8");
        logger.debug("album upload params: " + _params);

        Message message = new Message();
        message = feedService.newFeed(id, _params, message);
        if(!Property.isSuccess(message.getErrno())) return message;

        Album album = (Album)message.get("album");
        int eventId = (int)message.get("event_id");
        logger.debug("save feed done, event id:" + eventId);
        List<Tag> tags = album.getAlbum_tags_list();

        //push to users who follow u
        List<Integer> followers = followService.getFollowerIDs(id);
        followers.add(id);
        Set<Integer> followerSet = new HashSet<Integer>(followers);

        //push to users who follow the tags
        if(tags != null) {
            for(Tag tag : tags) {
                List<Integer> i_users = interestService.getUsersInterestedInTag(tag.getId());
                for(int u: i_users) {
                    if(u != id)
                        followerSet.add(u);
                }
                //cache feeds to tag list
                feedService.cacheFeed2Tag(tag.getId(), eventId);
            }
        }
        logger.debug("pushing feed to followers:"+followerSet.toArray());
        feedService.push(new ArrayList<Integer>(followerSet), eventId);

        message.setErrno(Property.SUCCESS_ALBUM_CREATE);
        message.add("event_id", eventId);
        logger.debug("[New feed end]");
        return message;
    }

    @ResponseBody
    @RequestMapping("/page/{num}/startfrom/{id}")
    public Map<String, Object> nextPage(@PathVariable("num") Integer num, @PathVariable("id") Integer id, @RequestAttribute("uid") Integer uid) {
        logger.debug("[Getting feed list of page " + num + " start from " + id + " ]");

        Map<String, Object> map = new HashMap<String, Object>();

        List<Event> feeds = new ArrayList<Event>();
        if(id != null && id != 0) {
            feeds = feedService.getFeedsOfPage(uid, num, id);
        } else {
            feeds = feedService.getFeedsOfPage(uid, num);
        }
        map.put("status", Property.SUCCESS_FEED_LOAD);
        map.put("feeds", feeds);

        decorateFeeds(uid, feeds);
        logger.debug("Found {} feeds: {}", feeds.size(), feeds.toArray());
        return map;
    }

    @ResponseBody
    @RequestMapping("/with/tag/{tag_id}/page/{page}")
    public Message getFeedsByTagOfPage(@PathVariable("tag_id") int tag_id,
                                       @PathVariable("page") int page,
                                       @RequestAttribute("uid") Integer id) {

        Message message = new Message();
        Tag tag = tagService.getTagByID(tag_id);
        if(tag == null) {
            return message;
        }

        List<Event> feeds = feedService.getFeedsByTagOfPage(id, tag_id, page);
        //map.put("dic", new Dic());
        decorateFeeds(id, feeds);
        message.add("feeds", feeds);
        return message;
    }

    private void decorateFeeds(int uid, List<Event> feeds){
        if(feeds != null && feeds.size() != 0 ) {
            addUserInfo(feeds);
            updLikeCount(uid, feeds);
            addCommentCount(feeds);
        }
    }

    private void addUserInfo(List<Event> feeds) {
        if(feeds == null || feeds.size() == 0)
            return;
        for(Event feed : feeds) {
            User user = userService.findById(feed.getUser_id());
            feed.setUser_name(user.getUser_name());
            feed.setUser_avatar(user.getUser_avatar());
        }
    }

    private void updLikeCount(int uid, List<Event> feeds){
        if(feeds == null || feeds.size() == 0)
            return;

        for(Event feed : feeds) {
            feed.setLike_count((int)likeService.likersCount(feed.getObject_type(),
                    feed.getObject_id()));
            feed.setIs_like(likeService.isLike(uid,
                    feed.getObject_type(),
                    feed.getObject_id()));
        }

    }

    private void addCommentCount(List<Event> feeds){
        if(feeds == null || feeds.size() == 0)
            return;
        for(Event feed : feeds) {
            feed.setComment_count(commentService.getCommentsCount(
                    feed.getObject_type(),
                    feed.getObject_id()));
        }
    }

    /**
     * 获取某个用户的feeds
     */
    @ResponseBody
    @RequestMapping("/of/user/{account_id}/page/{num}/startfrom/{id}")
    public Message getFeedsOfUser(@PathVariable("account_id") Integer account_id,  @PathVariable("num") Integer num, @PathVariable("id") Integer id) {
        logger.debug("[Getting feed list of user " + account_id + "page " + num + " start from " + id + " ]");

        Message message = new Message();
        User user = (User)userService.findById(account_id);
        if(user == null || user.getId() == 0) {
            message.setErrno(Property.ERROR_ACCOUNT_NOTEXIST);
            return message;
        }

        List<Event> feeds = new ArrayList<Event>();
        if(id != null && id != 0) {
            feeds = feedService.getFeedsOfPage(user.getId(), num, id);
        } else {
            feeds = feedService.getFeedsOfPage(user.getId(), num);
        }
        decorateFeeds(account_id, feeds);
        message.setErrno(Property.SUCCESS_FEED_LOAD);
        message.add("feeds", feeds);
        logger.debug("Found {} feeds: {}", feeds.size(), feeds.toArray());
        return message;
    }
}
