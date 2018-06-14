package com.lvwangbeta.poplar.common.intr;

import com.lvwangbeta.poplar.common.model.Album;
import com.lvwangbeta.poplar.common.model.Event;
import com.lvwangbeta.poplar.common.model.Message;
import com.lvwangbeta.poplar.common.model.Post;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface FeedService {
    int FEED_COUNT = 200;
    int newFeed(int objectType, Object obj);
    Message newFeed(int id, String params, Message message) throws UnsupportedEncodingException;
    Post newPost(Integer author, String content);
    Album newAlbum(int userId, Album album);
    void push(List<Integer> followers, int eventId);
    List<Event> getFeedsOfPage(int user_id, int num);
    List<Event> getFeedsOfPage(int user_id, int num, int feed_id);
    List<Event> getFeedsByTagOfPage(int user_id, int tag_id, int num);
    void cacheFeed2Tag(int tag_id, int event_id);
}
