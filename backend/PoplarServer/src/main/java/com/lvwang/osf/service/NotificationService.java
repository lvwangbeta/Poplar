package com.lvwang.osf.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.lvwang.osf.dao.NotificationDAO;
import com.lvwang.osf.dao.impl.NotificationDAOImpl;
import com.lvwang.osf.model.Event;
import com.lvwang.osf.model.Notification;
import com.lvwang.osf.model.User;
import com.lvwang.osf.util.Dic;

@Service("notificationService")
public class NotificationService {
	
	@Autowired
	@Qualifier("notificationDao")
	private NotificationDAOImpl notificationDao;
	
	@Autowired
	@Qualifier("userService")
	private UserService userService;
	
	@Autowired
	@Qualifier("eventService")
	private EventService eventService;
	
	/**
	 * save notification
	 * 
	 * @param notification
	 * @return notification id
	 */
	public int doNotify(Notification notification){
		int id = notificationDao.save(notification);
		//refreshNotifications(notification.getNotified_user());
		refreshNotification(notification);
		return id;
	}
	
	public Map<String, Long> getNotificationsCount(int user_id){
		Map<String, Long> notifications = notificationDao.getNotificationsCount(user_id);
		//Map<String, Integer> notifications_with_type = new HashMap<String, Integer>();
		//for(Integer type: notifications.keySet()) {
		//	notifications_with_type.put(Dic.toNotifyTypeDesc(type), notifications.get(type));
		//}
		return notifications;
	}
	
	public void refreshNotification(Notification notification){
		notificationDao.refreshNotification(notification);
	}
	
	public List<Notification> getNotifications(int user_id, int notify_type){
		
		List<Notification> notifications  = null;
		
		if(notify_type == Dic.NOTIFY_TYPE_COMMENT) {
			//notifications = notificationDao.getNotificationsOfTypes(user_id, Dic.NOTIFY_TYPE_COMMENT,Dic.NOTIFY_TYPE_COMMENT_REPLY);
			notifications = notificationDao.getNotificationsOfTypes(user_id, Arrays.asList(Dic.NOTIFY_TYPE_COMMENT,Dic.NOTIFY_TYPE_COMMENT_REPLY));
		} else {
			notifications = notificationDao.getNotificationsOfType(user_id, notify_type);
		}
		
		if(notifications != null) {
			for(Notification notification : notifications){
				User user = userService.findById(notification.getNotifier());
				notification.setNotifier_name(user.getUser_name());
				notification.setNotifier_avatar(user.getUser_avatar());
				
				Event event = eventService.getEvent(notification.getObject_type(), notification.getObject_id());
				
				String object_title = null;
				if(Dic.OBJECT_TYPE_POST == notification.getObject_type()) {
					object_title = event.getTitle();
				} else if(Dic.OBJECT_TYPE_ALBUM == notification.getObject_type()){
					object_title = event.getSummary();
				} else if(Dic.OBJECT_TYPE_SHORTPOST == notification.getObject_type()) {
					object_title = event.getSummary();
				} 
				if(object_title != null){
					int len = object_title.length();
					if(len > 20) {
						object_title = object_title.substring(0, 20);
					}
				}
				notification.setObject_title(object_title);
			}
		}
		return notifications;
	}
}
