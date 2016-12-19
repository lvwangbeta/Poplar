# URL Design #
-------------


在OSF中数据加载与请求遵循如下规则：  
* 首屏由后端渲染，直接传递给前端已经生成好的页面，典型的jsp模板加model渲染  
* 已展现的页面内的操作均由Ajax发送请求，根据服务端返回的状态字status对页面进行更新  




## Account ##



##  登录
  
登录页面  
	
	GET /account/login

用户登录请求

	POST /account/login
	{
		email: email,
		password: password
	}

返回数据格式 

	{
		status:status
	}
	
status数据字典说明见[status](status)

		
## 注册

注册页面  

	GET /account/register 

用户注册 
  
	POST /account/register
	{
		email: email,
		password: password,
		cfmPwd: cfmPwd
	} 
	
返回数据格式 

	{
		status:status
	}
	
  		
##  注册激活
	
key是系统为新注册用户生成的激活码，在用户邮箱注册后，系统会向注册邮箱发送激活链接，用户登录邮箱即可完成账户激活

	GET	/account/activation/{key}

成功激活后，会自动跳转至引导页面，引导用户选择兴趣标签  


## 退出 
	
用户退出当前登录，退出成功后直接跳转至登录界面

	GET /account/logout  
		

## 变更密码  

用户登录后即可进入 /account/setting/security 页面更改密码

	POST /account/changepwd  
	{
		old_pwd:old_pwd,
		new_pwd:new_pwd
	}

返回数据格式 

	{
		status:status
	}

如果忘记密码，还可以通过邮箱链接重置密码，还是在/account/setting/security 页面，点击忘记密码即可获取邮箱重置密码链接，之后进入重置密码页面，重置密码的数据请求：

	POST /account/resetpwd  
	{
		password:password,
		cfm_pwd:cfm_pwd
	}

返回数据格式 

	{
		status:status
	}


从以上数据交互规则可以看出首屏只加载入口页面，用户的页面内操作完全由Ajax请求发出，此时的服务端完全变成了数据接口，接收前端提交的用户数据，逻辑判断后返回必要的状态字，前端再根据此状态字进行页面更新，如错误提示，页面跳转等。


## User

## 用户个人主页    

	GET /user/{id}



## Post

## 日志详情页   

获取日志的详细信息及内容  
	
	GET /post/{id}

## 日志编辑页面(新增日志)
	
	GET /post/create

## 新增一篇日志

	POST /post/create
	{
		content: content,
		title: title,
		tags: tags.join(' '),
		post_status: post_status,
		comment_status: comment_status
	}		

返回数据格式 

	{
		status:status
	}
	

参数说明

| 字段           | 说明          | 备注                                 |
| -------------- |:-------------:| :-----                               |
| tags			 | 日志标签 	 | 多个标签用空格隔开                   |
| post_status    | 日志状态	     | 0：公开；1：私密；2：保存；3：编辑   |
| comment_status | 评论设置      | 0：允许评论；1：不允许评论           |


## 编辑日志页面(暂未实现)
	
	GET /post/{id}/edit

## 更新日志(保存修改)

	POST /post/{id}/update
	{
		content: content,
		title: title,
		tags: tags.join(' '),
		post_status: post_status,
		comment_status: comment_status
	}


   
## 删除一篇日志
	
	POST /post/delete/{id}



## Album


## 相册页面  

	GET /album/{id}/photos


## 图片上传页面(指定相册)

	GET /album/{album_id}/upload

## 图片上传页面(未指定相册)

	GET /album/upload

## 上传图片(指定相册)

	POST /album/{album_id}/upload/photo
	{
		album_id: album_id,
		uploader_input: img
	}

## 上传图片(未指定相册)
	
	POST /album/upload/photo
	{
		uploader_input: img
	}

参数说明

| 字段         | 说明      |
| -------------- |:-------------:|
| album_id | 相册ID |
| uploader_input | 用户选择上传的图片 MultipartFile格式|

返回数据格式 

	{
		status:status,
		photo:{
				id:id,
				key:key
				ts:ts
		}
	}
	
参数说明

| 字段         | 说明      |
| -------------- |:-------------:|
| status | 状态	|
| photot:id | 为上传的图片生成的数据库id |
| photot:key | 图片存储在与服务器上的唯一标识 |
| photot:ts | 图片上传时间戳|

这样前端接收到上传的图片的信息就可以回显展示了


## 保存相册

	POST　/ablum/create
	{
		album_desc: album_desc,
		photos:[
					{id:photo_id,desc:photo_desc},
				 	{id:photo_id,desc:photo_desc}
				 	{...}
				 ],
		tags:[tag,tag,...]
	}
	
参数说明

| 字段         | 说明      |
| -------------- |:-------------:|
| album_desc| 相册描述 |
| photos | 图片描述 |
| tags | 相册标签数组|


返回数据格式 

	{
		status:status
	}


## Comment

## 创建评论

	POST /comment/create
	{
		comment_object_type: 0,
		comment_object_id: id,
		comment_content: content,
		comment_parent: parent
	}

参数说明

| 字段         | 说明      |
| -------------- |:-------------:|
| comment\_object_type | 评论的对象类型 0：日志；1：图片；2：相册；4：说说 |
| comment\_object_id | 评论的对象ID |
| comment_content | 评论内容 |
| comment_parent | 回复的评论ID | 

返回数据格式 

	{
		avatar: avatar,
		author_id: author_id,
		author_name: author_name,
		reply_to_author: reply_to_author,
		reply_to_authorname: reply_to_authorname
	}
参数说明

| 字段         | 说明      |
| -------------- |:-------------:|
| avatar | 评论者头像 |
| author_id | 评论者id |
| author_name | 评论者用户名 |
| reply\_to_author | 回复对象id | 
| reply\_to_authorname | 回复对象用户名 | 

## 删除评论

	POST /comment/{id}/delete

## 评论列表

获取 日志/图片/相册/说说 的评论

	GET /commnet/{object_type}/{object_id}


## Tag 


## Like 

## Follow 

## Notification

## Explore 



