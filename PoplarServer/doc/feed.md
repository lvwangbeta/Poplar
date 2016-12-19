# 事件分发机制
----------------

事件分发机制以用户的行为作为出发点，当用户进行如下类型操作时，
关注其的用户会收到对应Feed推送，构成基本社交网络信息流


## 日志类

- 新建日志 

## 相册类 

- 新建相册 
- 相册追加图片 

## 喜欢 

- 喜欢日志 
- 喜欢相册 
- 喜欢图片 

## 转发 

- 转发日志 
- 转发相册

## 关注

- 关注某人 
- 关注标签 


用户的以上行为均可构成一个Event事件，在事件分发中心被分发 
事件分发可分为两类 

## 基于用户关注用户

假使用户A做出以上行为，其关注者Followers将收到与之对应的Event事件
在Push模型中，用户A的Event将主动推送到其各个Follower的Feed流中，等待被读取
而在Pull模型中，用户A的Event并不会主动推送给其Follower，而是在其Follow读取Feed
时再去获取A的Event到Feed流

### Push

就本项目来说，构造基于用户关系的Feed流需要如下表和配置

	osf_users: 用户表
	osf_posts: 日志表
	osf_albums: 相册表 
	osf_followings: 关注表
	osf_followers； 粉丝表
	osf_likes
	osf_events: 事件表

Feed信息流采用Redis存储，每个用户都会有一个类型是List<Event_ID>的Feed流，保存10页收到的最新Feed

	feeds:user:{user_id}   ------>   List<event_id>

当用户进行之前所述的行为，用户的行为首先会被封装为一个Event事件，然后将Event_ID添加到其Follower的Feed流中

## 基于用户关注标签
