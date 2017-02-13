package com.lvwang.osf.service;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.lvwang.osf.dao.UserDAO;
import com.lvwang.osf.model.User;
import com.lvwang.osf.search.UserIndexService;
import com.lvwang.osf.util.CipherUtil;
import com.lvwang.osf.util.Dic;
import com.lvwang.osf.util.Property;

@Service("userService")
public class UserService {


	public static final int USERNAME_MAXLEN = 20;
	public static final int STATUS_USER_NORMAL = 0;				//正常
	public static final int STATUS_USER_INACTIVE = 1;			//待激活
	public static final int STATUS_USER_LOCK = 2;				//锁定
	public static final int STATUS_USER_CANCELLED = 3;			//注销
	
	public static final String DEFAULT_USER_AVATAR = "default-avatar.jpg";
	
	@Autowired
	@Qualifier("userDao")
	private UserDAO userDao;
	
	@Autowired
	@Qualifier("followService")
	private FollowService followService;
	
	@Autowired
	@Qualifier("shortPostService")
	private ShortPostService shortPostService;
	
	@Autowired
	@Qualifier("postService")
	private PostService postService;
	
	@Autowired
	@Qualifier("albumService")
	private AlbumService albumService;
	
	@Autowired
	@Qualifier("userIndexService")
	private UserIndexService userIndexService;
	
	private boolean ValidateEmail(String email) {
		boolean result = true;
		try {
			InternetAddress emailAddr = new InternetAddress(email);
			emailAddr.validate();
		} catch (AddressException e) {
			result = false;
		}
		return result;
	}
	
//	public String confirmPwd(String user_name, String user_pwd) {
//		if(user_pwd == null || user_name.length() == 0)
//			return Property.ERROR_PWD_EMPTY;
//		String pwd = userDao.getPwdByUsername(user_name);
//		if(pwd.equals(user_pwd)) 
//			return null;
//		else
//			return Property.ERROR_PWD_DIFF;
//			
//	}
	
	public String newToken(User user) {
		String token = UUID.randomUUID().toString();
		userDao.insertToken(token, user);
		return token;
	}
	
	public void delToken(String token) {
		userDao.delToken(token);
	}
	
	public boolean checkToken(String token) {
		return userDao.containsToken(token);
	}
	
	public User findUserByToken(String token) {
		return userDao.getUserByToken(token);
	}
	
	public User findByUsername(String username) {
		User user = userDao.getUserByUsername(username);
//		if(user != null){
//			addAvatar(user);
//		}
		return user;
	}
	
	public User findByEmail(String email) {
		User user = userDao.getUserByEmail(email);
//		if(user != null) {
//			addAvatar(user);
//		}
		return user;
	}
	
	public User findById(int id) {
		User user = userDao.getUserByID(id);
//		if(user != null) {
//			addAvatar(user);
//		}
		return user;
	}
	
	public List<User> findAllbyIDs(List<Integer> ids) {
		return userDao.getUsersByIDs(ids);
	}
	
	private void addAvatar(User user) {
		user.setUser_avatar(user.getUser_avatar());
	}
	
	public Map<String, Object> login(String email, String password) {
		Map<String, Object> ret = new HashMap<String, Object>();
		//1 empty check
		if(email == null || email.length() <= 0) {
			ret.put("status", Property.ERROR_EMAIL_EMPTY);
			return ret;
		}
			
		if(password == null || password.length() <= 0){
			ret.put("status", Property.ERROR_PWD_EMPTY);
			return ret;
		}
			
		
		//2 ValidateEmail 
		if(!ValidateEmail(email)) {
			ret.put("status", Property.ERROR_EMAIL_FORMAT);
			return ret;
		}

		//3 email exist?
		User user = findByEmail(email);
		if(user == null) {
			ret.put("status", Property.ERROR_EMAIL_NOT_REG);
			return ret;
		}
		else {
			//4 check user status
			if(STATUS_USER_NORMAL != user.getUser_status()) {
				ret.put("status", user.getUser_status());
				return ret;
			}
		}
		
		//5 password validate
		if(!CipherUtil.validatePassword(userDao.getPwdByEmail(email), password)) {
			ret.put("status", Property.ERROR_PWD_DIFF);
			return ret;
		}
		ret.put("status", Property.SUCCESS_ACCOUNT_LOGIN);
		ret.put("user", user);
		return ret;
	}
	
	@SuppressWarnings("deprecation")
	public String register(String email, String password, String conformPwd, Map<String, String> map) {
		//1 empty check
		if(email == null || email.length() <= 0)
			return Property.ERROR_EMAIL_EMPTY;
		else{
			//4 ValidateEmail
			if(!ValidateEmail(email))
				return Property.ERROR_EMAIL_FORMAT;
			
			//5 email exist?
			User user = findByEmail(email);
			if(user != null) {
							
				//6 user status check
				if(STATUS_USER_NORMAL == user.getUser_status())
					return Property.ERROR_ACCOUNT_EXIST;
				else if(STATUS_USER_INACTIVE == user.getUser_status()){
					map.put("activationKey", URLEncoder.encode(user.getUser_activationKey()));
					return Property.ERROR_ACCOUNT_INACTIVE;
				}
				else if(STATUS_USER_LOCK == user.getUser_status())
					return Property.ERROR_ACCOUNT_LOCK;
				else if(STATUS_USER_CANCELLED == user.getUser_status()) 
					return Property.ERROR_ACCOUNT_CANCELLED;
			}			
		}

		if(password == null || password.length() <= 0)
			return Property.ERROR_PWD_EMPTY;
		else {
			//3 password format validate
			String vpf_rs = CipherUtil.validatePasswordFormat(password);
			if(vpf_rs != Property.SUCCESS_PWD_FORMAT)
				return vpf_rs;
		}
		if(conformPwd == null || conformPwd.length() <= 0)
			return Property.ERROR_CFMPWD_EMPTY;
				
		//2 pwd == conformPwd ?
		if(!password.equals(conformPwd))
			return Property.ERROR_CFMPWD_NOTAGREE;
					
		
		User user = new User();
		user.setUser_pwd(CipherUtil.generatePassword(password));
		user.setUser_email(email);
		user.setUser_status(STATUS_USER_INACTIVE);
		user.setUser_avatar(DEFAULT_USER_AVATAR);
		String activationKey = CipherUtil.generateActivationUrl(email, password);
		user.setUser_activationKey(activationKey);
		int id =userDao.save(user);
		
		map.put("id", String.valueOf(id));
		map.put("activationKey", activationKey);
		return Property.SUCCESS_ACCOUNT_REG;
		
	}
		
	
	
	@SuppressWarnings("deprecation")
	public String register(String username, String email, String password, String conformPwd, Map<String, String> map) {
		//1 empty check
		if(email == null || email.length() <= 0)
			return Property.ERROR_EMAIL_EMPTY;
		else{
			//4 ValidateEmail
			if(!ValidateEmail(email))
				return Property.ERROR_EMAIL_FORMAT;
			
			//5 email exist?
			User user = findByEmail(email);
			if(user != null) {
							
				//6 user status check
				if(STATUS_USER_NORMAL == user.getUser_status())
					return Property.ERROR_ACCOUNT_EXIST;
				else if(STATUS_USER_INACTIVE == user.getUser_status()){
					map.put("activationKey", URLEncoder.encode(user.getUser_activationKey()));
					return Property.ERROR_ACCOUNT_INACTIVE;
				}
				else if(STATUS_USER_LOCK == user.getUser_status())
					return Property.ERROR_ACCOUNT_LOCK;
				else if(STATUS_USER_CANCELLED == user.getUser_status()) 
					return Property.ERROR_ACCOUNT_CANCELLED;
			}			
		}
		
		if(username == null || username.length() == 0) 
			return Property.ERROR_USERNAME_EMPTY;
		else {
			//username exist check
			if(findByUsername(username) != null) {
				return Property.ERROR_USERNAME_EXIST;
			}
		}
		
		
		if(password == null || password.length() <= 0)
			return Property.ERROR_PWD_EMPTY;
		else {
			//3 password format validate
			String vpf_rs = CipherUtil.validatePasswordFormat(password);
			if(vpf_rs != Property.SUCCESS_PWD_FORMAT)
				return vpf_rs;
		}
		if(conformPwd == null || conformPwd.length() <= 0)
			return Property.ERROR_CFMPWD_EMPTY;
				
		//2 pwd == conformPwd ?
		if(!password.equals(conformPwd))
			return Property.ERROR_CFMPWD_NOTAGREE;
					
		
		User user = new User();
		user.setUser_name(username);
		user.setUser_pwd(CipherUtil.generatePassword(password));
		user.setUser_email(email);
		user.setUser_status(STATUS_USER_INACTIVE);
		user.setUser_avatar(DEFAULT_USER_AVATAR);
		String activationKey = CipherUtil.generateActivationUrl(email, password);
		user.setUser_activationKey(activationKey);
		int id =userDao.save(user);
		
		map.put("id", String.valueOf(id));
		map.put("activationKey", activationKey);
		map.put("avatar", DEFAULT_USER_AVATAR);
		return Property.SUCCESS_ACCOUNT_REG;
		
	}
	
	public Map<String, Object> updateActivationKey(String email){
		//1 check user status
		User user = findByEmail(email);
		String status = null;
		Map<String, Object> map = new HashMap<String, Object>();
		if(user == null){
			status = Property.ERROR_EMAIL_NOT_REG;
		}
		
		if(STATUS_USER_INACTIVE == user.getUser_status()){
			//2 gen activation key
			String activationKey = CipherUtil.generateActivationUrl(email, new Date().toString());
			userDao.updateActivationKey(user.getId(), activationKey);
			status = Property.SUCCESS_ACCOUNT_ACTIVATION_KEY_UPD;
			map.put("activationKey", activationKey);
		} else {
			if(STATUS_USER_NORMAL == user.getUser_status())
				status = Property.ERROR_ACCOUNT_EXIST; //已激活
			else if(STATUS_USER_CANCELLED == user.getUser_status()) 
				status = Property.ERROR_ACCOUNT_CANCELLED;
			
			//status = Property.ERROR_ACCOUNT_ACTIVATION;
		}
		map.put("status", status);
		return map;
	}
	
	public String activateUser(String email, String key) {
		User user = findByEmail(email);
		if(user == null)
			return Property.ERROR_ACCOUNT_ACTIVATION_NOTEXIST;
		else {
			
			if(user.getUser_status() == STATUS_USER_INACTIVE ){
				if(user.getUser_activationKey().equals(key)){
					user.setUser_activationKey(null);
					user.setUser_status(STATUS_USER_NORMAL);
					
					userDao.activateUser(user);
				}else {
					return Property.ERROR_ACCOUNT_ACTIVATION_EXPIRED;
				}
			} else{
				if(user.getUser_status() == STATUS_USER_NORMAL){
					return Property.ERROR_ACCOUNT_EXIST;
				} else{
					return Property.ERROR_ACCOUNT_ACTIVATION;
				}
				
			}
		}
		return Property.SUCCESS_ACCOUNT_ACTIVATION;
	}
	
	public String findActivationKeyOfUser(int id) {
		return null;
	}
	
	public User findByActivationKey(String key) {
		return userDao.getUser("user_activationKey", new Object[]{key});
	}
	
	public int getStatus(String email) {
		User user = userDao.getUserByEmail(email);
		return user.getUser_status();
	}
	
	/**
	 * 推荐用户
	 * @param count
	 * @return
	 */
	public List<User> getRecommendUsers(int user_id, int count){
		//to do recommend logic
		
		List<User> users = userDao.getUsers(count);
		Iterator<User> it = users.iterator();
		while(it.hasNext()){
			User user = it.next();
			if(user.getId() == user_id) {
				it.remove();
				continue;
			}
			//addAvatar(user);
		}

		return users;
	}
	
	public List<Integer> getRecommendUsersID(int user_id, int count) {
		List<User> users = userDao.getUsers(count);
		List<Integer> ids =  new ArrayList<Integer>();
		Iterator<User> it = users.iterator();
		while(it.hasNext()){
			User user = it.next();
			if(user.getId() == user_id) {
				it.remove();
				continue;
			}
			ids.add(user.getId());
		}
		return ids;
	}
	
	public Map<String, Long> getCounterOfFollowAndShortPost(int user_id){
		Map<String, Long> counter = new HashMap<String, Long>();
		counter.put("follower", followService.followersCount(user_id));
		counter.put("following", followService.followingsCount(user_id));
		counter.put("spost", shortPostService.count(user_id));
		return counter;
	}
	
	public String changeAvatar(int user_id, String avatar) {
		userDao.updateAvatar(user_id, avatar);
		return Property.SUCCESS_AVATAR_CHANGE;
	}
	
	public void updateUsernameAndDesc(int user_id, String username, String desc){
		userDao.updateUsernameAndDesc(user_id, username, desc);
	}
	
	/**
	 * return reset password key
	 * @param user_id
	 * @return
	 */
	public String updateResetPwdKey(String email){
		String key = CipherUtil.generateRandomLinkUseEmail(email);
		userDao.updateResetPwdKey(email, key);
		return key;
	}
	
	/**
	 * 检查是否有权限重置密码
	 * @param email
	 * @param key
	 */
	public boolean isAllowedResetPwd(String email, String key){
		if( (email==null) || (key==null)){
			return false;
		}
		
		String resetpwd_key = userDao.getRestPwdKey(email);
		boolean result = false;
		if(resetpwd_key == null || resetpwd_key.length() ==0){
			result = false;
		} else {
			result = resetpwd_key.equals(key) ? true : false;
		}
		
		return result;
	}

	/**
	 * 重置密码
	 * @param email
	 * @param password
	 * @return
	 */
	public String resetPassword(String email, String password, String cfm_pwd){
		if( password == null || password.length() == 0){
			return Property.ERROR_PWD_EMPTY;
		}
		if(cfm_pwd == null || cfm_pwd.length()==0){
			return Property.ERROR_CFMPWD_EMPTY;
		}
			 
		if(!password.equals(cfm_pwd)) {
			return Property.ERROR_CFMPWD_NOTAGREE;
		}
		
		String vpf_rs = CipherUtil.validatePasswordFormat(password);
		if(vpf_rs != Property.SUCCESS_PWD_FORMAT)
			return vpf_rs;
		
		userDao.updatePassword(email, CipherUtil.generatePassword(password));
		userDao.updateResetPwdKey(email, null);
		return Property.SUCCESS_PWD_RESET;
	}
	
	/**
	 * 修改密码
	 * @param email
	 * @param old_pwd
	 * @param new_pwd
	 * @return
	 */
	public String changePassword(String email, String old_pwd, String new_pwd){
		if( old_pwd == null || old_pwd.length() == 0){
			return Property.ERROR_PWD_EMPTY;
		}
		if( new_pwd == null || new_pwd.length() == 0){
			return Property.ERROR_PWD_EMPTY;
		}
		if(new_pwd.equals(old_pwd)){
			return Property.ERROR_CFMPWD_SAME;
		}
				
		String vpf_rs = CipherUtil.validatePasswordFormat(new_pwd);
		if(vpf_rs != Property.SUCCESS_PWD_FORMAT)
			return vpf_rs;
		
		String current_pwd = userDao.getPwdByEmail(email);
		if(!current_pwd.equals(CipherUtil.generatePassword(old_pwd))){
			return Property.ERROR_PWD_NOTAGREE;
		}
		
		userDao.updatePassword(email, CipherUtil.generatePassword(new_pwd));
		return Property.SUCCESS_PWD_CHANGE;
	}
	
	public User getAuthor(int object_type, int object_id){
		if(object_type == Dic.OBJECT_TYPE_POST){
			return postService.getAuthorOfPost(object_id);
		} else if(object_type == Dic.OBJECT_TYPE_ALBUM){
			return albumService.getAuthorOfALbum(object_id);
		} else if(object_type == Dic.OBJECT_TYPE_SHORTPOST) {
			return shortPostService.getAuthorOfPost(object_id);
		} else if(object_type == Dic.OBJECT_TYPE_PHOTO) {
			return albumService.getAuthorOfPhoto(object_id);
		} else {
			return new User();
		}
	}
	
	public void indexUser(User user){
		userIndexService.add(user);
	}
	
	public List<User> searchUserByName(String username) {
		List<Integer> user_ids = userIndexService.findUserByName(username);
		return findAllbyIDs(user_ids);	
	}
}
