# API Design #
-------------

poplar作为服务后端对不同渠道前端提供无差别的REST请求处理和JSON格式数据返回

Request：除注册、登录、未登录内容浏览URL外需要携带poplar派发的认证token访问资源，该token在用户首次登录时返回给客户端存储

Response：请求响应采用固定格式的JSON，transok、errno、errmsg、timestamp、data固定属性，其中transok=1则表示这次请求处理成功，error为报错码，timestamp为处理时间戳，data属性为一个子JSON对象，内容与对应的请求URL相适应

```json
{
    "transok":"0",
    "errno":"104001",
    "errmsg":"",
    "timestamp":"1527778054125",
    "data":{
    	"token":"bf3cdf45-0f15-46da-bdc9-2fce982d08cb",
        ...
    }
}
```



# `/api/v1/`

所有API以`/api/v1`为前缀开始

## `/user` ##

用户注册、登录、激活、详情等API

###  `/login` 

登录
	GET /api/v1/user/login/{email}/{password}

返回数据格式 

```json
{ transok: '0',
  errno: '104001',
  errmsg: '',
  timestamp: '1527683982578',
  data: 
   { token: '59219b84-d5f8-45f2-9415-68bfefdaba1e',
     user: 
      { id: 3,
        user_name: 'lvwangbeta',
        user_avatar: null,
        user_desc: null,
        user_gender: 0,
        user_birthday: null,
        user_location: null,
        user_cover: null 
        } 
    } 
 }
```




### `/register` 

注册

	GET /api/v1/user/register/{email}/{password}/{username}

返回数据格式 

	{
	    "transok":"0",
	    "errno":"104000",
	    "errmsg":"",
	    "timestamp":"1527778054125",
	    "data":{
	    	"token":"bf3cdf45-0f15-46da-bdc9-2fce982d08cb",
	    }
	}



### `/info`

用户信息详情

```
GET /api/v1/user/info/{id}
```





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





## `/feed`

Feed处理相关API

### `/new`

创建新feed，支持相册、图片上传、说说



### `/page/{num}/startfrom/{id}`

获取feed信息流

num:翻页页码

id:下一页起始feed id

```
GET /api/v1/feed/page/{num}/startfrom/{id}
```

	{
	    "transok":"0",
	    "errno":"100000",
	    "errmsg":"",
	    "timestamp":"1527778054125",
	    "data":{
	    	"token":[
	                {  id: 9,
	                   object_type: 2,
	                   object_id: 2,
	                   ts: 1528288129000,
	                   user_id: 3,
	                   user_name: 'lvwang',
	                   user_avatar: 'default_avatar.png',
	                   like_count: 0,
	                   share_count: 0,
	                   comment_count: 0,
	                   title: 'F6B2F542-9907-4957-A5C9-F44ECCCC3BAB.jpeg',
	                   summary: '最喜欢王菲一边开着水龙头一边说因为下雨没有办法交电费.还有那个 加洲梦的音乐.',
	                   content: 'F6B2F542-9907-4957-A5C9-F44ECCCC3BAB.jpeg:8CC04BFF-1C43-4FEA-991B-D6350B89BC8B.jpeg:F9792684-8DD8-470C-9DA1-2456C7F7A038.jpeg:8AE42997-B136-479B-B5D7-FC2FFF270EA2.jpeg:9C8CE1D0-47C9-4FEE-8DDF-1B51B3775668.jpeg:C171DF9D-738D-4F92-B601-0B92A6D28080.jpeg:A8AFA8EF-91F1-43D3-972E-01B155EDBB01.jpeg:E002C964-1258-4545-8782-A7F21042FCE1.jpeg:43B1079F-7BF9-4603-8D84-D9BDDEED9993.jpeg:',
	                   tags: null,
	                   tags_list: null,
	                   following_user_id: 0,
	                   following_user_name: null,
	                   follower_user_id: 0,
	                   follower_user_name: null,
	                   is_like: false },
	                   {...}
	    	]
	    }
	}



## `/comment`

评论

### `/create`

创建新评论/回复

```
POST /api/v1/comment/create
```

返回数据格式





### `/{type}/{id}`

获取feed评论列表

type:feed类型(post/photo/album/spost)

id:feed id 

```
GET /api/v1/comment/{type}/{id}
```

返回数据格式

```
{ transok: '0',
  errno: '100000',
  errmsg: '',
  timestamp: '1528293364737',
  data: 
   { comments: 
      [ { id: 4,
          comment_object_type: 2,
          comment_object_id: 3,
          comment_author: 3,
          comment_author_name: 'lvwang',
          comment_author_avatar: null,
          comment_ts: 1528293350000,
          comment_content: '城市里的现代童话..加州住着不同的人，流泪的房子和变胖的香皂',
          comment_parent: 3,
          comment_parent_author: 3,
          comment_parent_author_name: 'lvwang' },
          {...}
       ]
   }
}
```




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



