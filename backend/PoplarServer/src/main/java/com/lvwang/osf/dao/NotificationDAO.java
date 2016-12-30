package com.lvwang.osf.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.lvwang.osf.model.Notification;

public interface NotificationDAO {
	int save(Notification notification);
	void delete(int id);
	Notification get(int notification_id);
	List<Notification> getAllOfUser(int user_id);
	List<Notification> getNotificationsOfType(int user_id, int notify_type);
	//List<Notification> getNotificationsOfTypes(int user_id, @Param("notify_types")Object... notify_types);
	List<Notification> getNotificationsOfTypes(int user_id, @Param("notify_types")List<Integer> notify_types);
			
	List<Map<String, Number>> getNotificationsCount(int user_id);
	void refreshNotification(Notification notification);
}
