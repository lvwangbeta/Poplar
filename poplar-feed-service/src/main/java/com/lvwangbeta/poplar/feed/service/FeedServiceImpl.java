package com.lvwangbeta.poplar.feed.service;

import com.alibaba.dubbo.config.annotation.Service;
import com.lvwangbeta.poplar.common.intr.FeedService;
import com.lvwangbeta.poplar.common.model.*;
import com.lvwangbeta.poplar.common.util.Dic;
import com.lvwangbeta.poplar.common.util.Property;
import com.lvwangbeta.poplar.feed.dao.*;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class FeedServiceImpl implements FeedService {

    public static final int FEED_COUNT_PER_PAGE = 10;
    public static final int FEED_COUNT = 200;	//feed缓存量

    @Autowired
    @Qualifier("eventDao")
    private EventDAO eventDao;

    @Autowired
    @Qualifier("feedDao")
    private FeedDAO feedDao;

    @Autowired
    @Qualifier("postDao")
    private PostDAO postDao;

    @Autowired
    @Qualifier("albumDao")
    private AlbumDAO albumDao;

    @Autowired
    @Qualifier("tagDao")
    private TagDAO tagDao;

    @Autowired
    @Qualifier("relationDao")
    private RelationDAO relationDao;

    @Override
    public int newFeed(int objectType, Object obj) {
        Event event = toEvent(objectType, obj);
        int eventId = eventDao.save(event);
        event.setId(eventId);
        return eventId;
    }


    public Message newFeed(int id, String params, Message message){

        Album album = toAlbum(params);
        int eventId = 0;
        //text with no photos
        if(album.getPhotos() == null || album.getPhotos_count() == 0) {
            if(album.getAlbum_desc() == null || album.getAlbum_desc().length() == 0) {
                message.setErrno(Property.ERROR_POST_EMPTY);
                return message;
            }
            Post post = newPost(id, album.getAlbum_desc());
            eventId = newEvent(Dic.OBJECT_TYPE_SHORTPOST, post);
            album.setId(post.getId());
        } else {
            newAlbum(id, album);
            newPhotos(album);
            eventId = newEvent(Dic.OBJECT_TYPE_ALBUM, album);

        }
        message.setErrno(Property.SUCCESS_ALBUM_CREATE);
        message.add("event_id", eventId);
        message.add("album", album);
        return message;
    }

    public int newEvent(int object_type, Object obj) {
        Event event = toEvent(object_type, obj);
        int event_id = eventDao.save(event);
        event.setId(event_id);
        //eventIndexService.add(event, obj);
        return event_id;
    }


    private Album toAlbum(String params) {
        Album album = new Album();
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode root = mapper.readTree(params);

            album.setAlbum_desc(root.path("album_desc").getTextValue());

            JsonNode photos = root.path("photos");
            if(photos.size() > 0) {
                album.setCover(photos.get(0).path("key").getTextValue());

                List<Photo> photos2upd = new ArrayList<Photo>();
                album.setPhotos(photos2upd);
                for(int i=0; i<photos.size(); i++) {
                    //int photo_id = Integer.parseInt(photos.get(i).path("id").getTextValue());
                    String key = photos.get(i).path("key").getTextValue();
                    String photo_desc = photos.get(i).path("desc").getTextValue();
                    Photo photo = new Photo();
                    //photo.setId(photo_id);
                    photo.setKey(key);
                    photo.setDesc(photo_desc);
                    photos2upd.add(photo);

                    System.out.println("photo_key:"+key+" desc:"+photo_desc);
                }
                album.setPhotos_count(photos2upd.size());
            }

            JsonNode tags = root.path("tags");
            if(tags.size() > 0) {
                List<Tag> tag_list = new ArrayList<Tag>();
                album.setAlbum_tags_list(tag_list);
                for(int i=0; i<tags.size(); i++) {
                    Tag t = new Tag();
                    t.setTag(tags.get(i).getTextValue());
                    tag_list.add(t);
                }
                //album.setAlbum_tags(TagService.toString(tag_list));
                //System.out.println("album tags:"+TagService.toString(tag_list));
            }


        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return album;
    }

    @Override
    public Post newPost(Integer author, String content) {
        if(content == null || content.length() == 0){
            return null;
        }
        Post post = new ShortPost();
        post.setPost_author(author);
        post.setPost_content(content);
        post.setId(postDao.save(post));
        return post;
    }

    private List<Tag> newTags(List<Tag> tags) {
        List<Tag> taglist = new ArrayList<Tag>();
        if(tags == null || tags.size() == 0) {
            return taglist;
        }
        for(Tag tag: tags) {
            if(tag.getTag() == null || tag.getTag().length() == 0) {
                continue;
            }
            Integer id = tagDao.getTagID(tag.getTag());
            if(id != null) {
                Tag tg = new Tag();
                tg.setId(id);
                tg.setTag(tag.getTag());
                taglist.add(tg);
                continue;
            }

            id = tagDao.save(tag);
            if(id != null) {
                Tag tg = new Tag();
                tg.setId(id);
                tg.setTag(tag.getTag());
                taglist.add(tg);
            }
        }
        return taglist;
    }

    public static String tags2String(List<Tag> tags) {
        if(tags == null || tags.size() == 0)
            return null;
        StringBuffer buffer = new StringBuffer();
        for(Tag tag: tags) {
            buffer.append(tag.getTag()+":"+tag.getId()+" ");
        }
        return buffer.toString();
    }

    public static List<Tag> tagString2List(String tags) {
        if(tags == null || tags.length() == 0)
            return new ArrayList<Tag>();
        String[] tag_and_id_strs = tags.split(" ");
        List<Tag> tag_list = new ArrayList<Tag>();
        for(String tag : tag_and_id_strs) {
            String[] tag_and_id = tag.split(":");
            Tag t = new Tag();
            if(tag_and_id.length > 1) {
                t.setId(Integer.valueOf(tag.split(":")[1]) );
            }
            t.setTag(tag.split(":")[0]);

            tag_list.add(t);
        }

        return tag_list;
    }

    @Override
    public Album newAlbum(int user_id, Album album) {
        album.setUser_id(user_id);
        album.setStatus(0);
        int id = albumDao.saveAlbum(album);
        if(id != 0){
            album.setId(id);
        }
        //save tag
        List<Tag> tags = newTags(album.getAlbum_tags_list());
        album.setAlbum_tags_list(tags);
        album.setAlbum_tags(tags2String(album.getAlbum_tags_list()));
        System.out.println("album tags:"+album.getAlbum_tags());
        albumDao.updateAlbumInfo(album);

        //save album tag relation
        for(Tag tag: tags) {
            newRelation(2, album.getId(), tag.getId());
        }
        return album;
    }

    public void newPhotos(Album album) {
        List<Photo> photos = album.getPhotos();
        for(Photo photo : photos) {
            photo.setAlbum_id(album.getId());
            photo.setId(albumDao.savePhoto(photo));
        }
    }

    private Relation newRelation(int object_type, int object_id, int tag_id) {
        int id = relationDao.save(new Relation(object_type, object_id, tag_id));
        if(id != 0){
            Relation relation = new Relation();
            relation.setId(id);
            relation.setObject_type(object_type);
            relation.setObject_id(object_id);
            relation.setTag_id(tag_id);
            return relation;
        } else {
            return null;
        }
    }

    @Override
    public void push(List<Integer> followers, int eventId) {
        if(followers != null && followers.size() != 0) {
            for(Integer follower: followers) {
                System.out.println("follwer:"+follower);
                feedDao.save(follower, eventId);
            }
        }
    }

    private Event toEvent(int objectType, Object obj) {
        Event event = new Event();
        if(Dic.OBJECT_TYPE_POST == objectType) {
            Post post = (Post)obj;
            event.setObject_type(Dic.OBJECT_TYPE_POST);
            event.setObject_id(post.getId());
            event.setUser_id(post.getPost_author());
            event.setTitle(post.getPost_title());
            event.setSummary(post.getPost_excerpt());
            event.setContent(post.getPost_cover());
            event.setLike_count(post.getLike_count());
            event.setShare_count(post.getShare_count());
            event.setComment_count(post.getComment_count());
            event.setTags_list(post.getPost_tags_list());
            event.setTags(post.getPost_tags());
        } else if(Dic.OBJECT_TYPE_ALBUM == objectType) {
            Album album = (Album)obj;
            event.setObject_type(Dic.OBJECT_TYPE_ALBUM);
            event.setObject_id(album.getId());
            event.setUser_id(album.getUser_id());
            event.setTitle(album.getCover());
            event.setSummary(album.getAlbum_desc());

            List<Photo> photos = album.getPhotos();
            StringBuffer keys = new StringBuffer();
            for(Photo photo:photos) {
                keys.append(photo.getKey()+":");
            }
            event.setContent(keys.toString());
            event.setLike_count(0);
            event.setShare_count(0);
            event.setComment_count(0);
            event.setTags_list(album.getAlbum_tags_list());
            event.setTags(album.getAlbum_tags());

        } else if(Dic.OBJECT_TYPE_PHOTO == objectType) {
            //event_id = eventDao.savePhotoEvent((Photo)obj);
        } else if(Dic.OBJECT_TYPE_SHORTPOST == objectType){
            ShortPost spost = (ShortPost) obj;
            event.setObject_type(Dic.OBJECT_TYPE_SHORTPOST);
            event.setObject_id(spost.getId());
            event.setSummary(spost.getPost_content());
            event.setUser_id(spost.getPost_author());
            event.setLike_count(spost.getLike_count());
            event.setShare_count(spost.getShare_count());
            event.setComment_count(spost.getComment_count());
        }
        return event;
    }
    public List<Event> getFeedsOfPage(int user_id, int num) {
        long all_feeds_count = feedDao.count("feed:user:"+user_id);
        System.out.println("all feeds count :" + all_feeds_count);
        List<Integer> event_ids = feedDao.fetch("feed:user:"+user_id,
                FEED_COUNT_PER_PAGE*(num-1),
                FEED_COUNT_PER_PAGE-1);
        return getEventsWithIDs(event_ids);

    }
    public List<Event> getFeedsOfPage(int user_id, int num, int feed_id) {
        List<Integer> event_ids = new ArrayList<Integer>();
        int index = -1;
        long all_feeds_count = feedDao.count("feed:user:"+user_id);
        System.out.println("all feeds count :" + all_feeds_count);
        event_ids = feedDao.fetch("feed:user:"+user_id, FEED_COUNT_PER_PAGE*(num-1), FEED_COUNT_PER_PAGE);
        /*
        while(index == -1) {
            event_ids = feedDao.fetch("feed:user:"+user_id,
                    FEED_COUNT_PER_PAGE*(num-1)-1,
                    FEED_COUNT_PER_PAGE);

            if(FEED_COUNT_PER_PAGE*num >= all_feeds_count) {
                break;
            }

            num++;
            index = event_ids.indexOf(feed_id);
            System.out.println("index: " + index);
        }
        if(index != -1) {
            event_ids = event_ids.subList(index+1, event_ids.size());
            System.out.println("len: " + event_ids.size());
            for(int id: event_ids) {
                System.out.println("event id:"+id);
            }
        }
        */
        //return decorateFeeds(user_id, event_ids);
        return getEventsWithIDs(event_ids);
    }

    public List<Event> getFeedsByTagOfPage(int user_id, int tag_id, int num) {
        List<Integer> event_ids = feedDao.fetch("feed:tag:"+tag_id,
                FEED_COUNT_PER_PAGE*(num-1),
                FEED_COUNT_PER_PAGE-1);
        return getEventsWithIDs(event_ids);

    }

    private List<Event> getEventsWithIDs(List<Integer> event_ids) {
        if(event_ids == null || event_ids.size() == 0) return new ArrayList<Event>();
        List<Event> events = eventDao.getEventsWithIDs(event_ids);
        if(events != null) {
            for(Event event: events) {
                event.setTags_list(tagString2List(event.getTags()));
            }
        } else {
            events = new ArrayList<Event>();
        }
        return events;
    }

    public void cacheFeed2Tag(int tag_id, int event_id) {
        feedDao.saveTagFeed(tag_id, event_id);
    }

}
