package com.lvwang.osf.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lvwang.osf.dao.PostDAO;
import com.lvwang.osf.model.Event;
import com.lvwang.osf.model.Post;
import com.lvwang.osf.model.Tag;
import com.lvwang.osf.model.User;
import com.lvwang.osf.search.TagIndexService;
import com.lvwang.osf.util.Dic;
import com.lvwang.osf.util.Property;

@Service("postService")
public class PostService {

	public static final int POST_STATUS_PUB = 0;	//公开
	public static final int POST_STATUS_PRV = 1;	//私密
	public static final int POST_STATUS_SAVED = 2;	//保存
	public static final int POST_STATUS_EDIT = 3;	//编辑
	
	public static final int COMMENT_STATUS_ALLOWED = 0;		//允许评论
	public static final int COMMENT_STATUS_NOTALLOWED = 1;	//不允许评论
	
	public static final int POST_SUMMARY_LENGTH = 200;
	
	@Autowired
	@Qualifier("relationService")
	private RelationService relationService;
	
	@Autowired
	@Qualifier("tagService")
	private TagService tagService;
	
	@Autowired
	@Qualifier("userService")
	private UserService userService;

	@Autowired
	@Qualifier("eventService")
	private EventService eventService;

	@Autowired
	@Qualifier("feedService")
	private FeedService feedService;
	
	@Autowired
	@Qualifier("postDao")
	private PostDAO postDao;
	
	@Autowired
	@Qualifier("tagIndexService")
	private TagIndexService tagIndexService;
	
	@Transactional
	public Map<String, Object> newPost(Integer author, String title, String content, 
						Integer post_status, Integer comment_status, String param_tags, String post_cover) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		//1 field check
		if(author == null || 
		   title == null || title.length() == 0 ||
		   content == null || content.length() == 0) {
			map.put("status", Property.ERROR_POST_EMPTY);
			return map;
		}
		   
		
		if(post_status == null)
			post_status = POST_STATUS_PUB;
		if(post_status < 0 || post_status > 3) {
			map.put("status", Property.ERROR_POST_STATUS);
			return map;
		}
		
		if(comment_status == null)
			post_status = COMMENT_STATUS_ALLOWED;
		if(comment_status != 0 && comment_status != 1) {
			map.put("status", Property.ERROR_COMMENT_STATUS);
		}
		
		
		//2 save post
		Post post = new Post();
		post.setPost_author(author);
		post.setPost_title(title);
		post.setPost_excerpt(getSummary(content));
		post.setPost_content(content);
		post.setPost_status(post_status);
		post.setComment_status(comment_status);
		post.setLike_count(0);
		post.setShare_count(0);
		post.setComment_count(0);
		
		post.setPost_cover(post_cover);
		
		
		//3 save tags
		if(param_tags != null && param_tags.length() != 0) {	
			//此处会为tag建立index
			Map<String, Object> tagsmap = tagService.newTags(tagService.toList(param_tags));
			
			post.setPost_tags_list((List<Tag>)tagsmap.get("tags"));
			int id = savePost(post);
			post.setId(id);
			
			//4 save post tag relation
			for(Tag tag: (List<Tag>)tagsmap.get("tags")) {
				Map<String, Object> relmap = relationService.newRelation(
											 RelationService.RELATION_TYPE_POST, 
											 post.getId(), 
											 tag.getId()
											 );
			}			
			map.put("tags", tagsmap.get("tags"));
		} else {
			int id = savePost(post);
			post.setId(id);
			map.put("tags", new ArrayList<Tag>());
		}
				
		map.put("post", post);
		map.put("status", Property.SUCCESS_POST_CREATE);
		return map;
	}
	
	protected int savePost(Post post){
		return postDao.save(post);
	}
	
	public Post findPostByID(int id) {
		return postDao.getPostByID(id);
	}
	
	public List<Post> findPostsByIDs(int[] ids) {
		return null;
	}
	
	public List<Post> findPostsOfUser(int id) {
		return postDao.getPostsByUserID(id);
	}
	
	public List<Post> findPostsOfUser(int id, Object[] fromto) {
		return null;
	}
	
	public List<Post> findPostsOfUser(int id, String orderby, Object[] fromto) {
		return null;
	}
	
	public static String getSummary(String post_content) {
		if(post_content == null || post_content.length() == 0)
			return null;
		
		Document doc = Jsoup.parse(post_content);
		String text = doc.text().replaceAll("<script[^>]*>[\\d\\D]*?</script>", "");
		return text.substring(0, 
									  text.length() > POST_SUMMARY_LENGTH?
									  POST_SUMMARY_LENGTH:
									  text.length());
	}
	
	public User getAuthorOfPost(int id) {
		int user_id = postDao.getAuthorOfPost(id);
		return userService.findById(user_id);
	}
	
	public long count(int user_id){
		return postDao.count(user_id);
	}
	
	public void deletePost(int id){
		postDao.delete(id);
		Event event = eventService.getEvent(Dic.OBJECT_TYPE_POST, id);
		if(event != null){
			eventService.delete(Dic.OBJECT_TYPE_POST, id);
			feedService.delete(event.getObject_type(), event.getObject_id());
		}
	}
}
