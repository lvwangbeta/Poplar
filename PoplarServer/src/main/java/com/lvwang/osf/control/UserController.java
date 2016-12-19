package com.lvwang.osf.control;

import java.util.List;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.lvwang.osf.model.Album;
import com.lvwang.osf.model.Post;
import com.lvwang.osf.model.User;
import com.lvwang.osf.service.AlbumService;
import com.lvwang.osf.service.FollowService;
import com.lvwang.osf.service.PostService;
import com.lvwang.osf.service.UserService;
import com.lvwang.osf.util.Property;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	@Qualifier("userService")
	private UserService userService;
	
	@Autowired
	@Qualifier("postService")
	private PostService postService;
	
	@Autowired
	@Qualifier("albumService")
	private AlbumService albumService;
	
	@Autowired
	@Qualifier("followService")
	private FollowService followService;
	
	@RequestMapping("/{id}")
	public ModelAndView collection(@PathVariable("id") int id, HttpSession session) {	
		User me = (User) session.getAttribute("user");
		
		ModelAndView mav = new ModelAndView();
		User user = userService.findById(id);
		mav.addObject("u", user);
		mav.addObject("follow", followService.isFollowing(me==null?0:me.getId(), id));
		
		mav.addObject("counter", userService.getCounterOfFollowAndShortPost(user.getId()));
		
		List<Post> posts = postService.findPostsOfUser(id);
		mav.addObject("posts", posts);
		List<Album> albums = albumService.getAlbumsOfUser(id);
		mav.addObject("albums", albums);
		mav.setViewName("user/index");
		return mav;
	}
}
