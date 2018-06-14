'use strict';

 var PoplarEnv = {
   post_cover_thumbnail: '?imageView2/2/w/500',
   album_thumbnail: '?imageView2/1/w/200/h/200',

   COMMENT_OBJ_TYPE: {
     POST: 0,
     PHOTO: 1,
     ALBUM: 2,
     SPOST: 4,
   },

   dic: {
    /**
  	 * 数据字典(6位)
  	 * rules:
  	 * 第1位标示类别(0:错误(ERROR), 1:成功(SUCCESS),)
  	 * 第2-3位标示对象(00:username,
  	 * 			   01:emai,
  	 * 			   02:password,
  	 * 			   03:conformPassword
  	 * 			   04:account
  	 * 			   05:post,
  	 * 			   06:album,
  	 * 			   07:photo,
  	 * 			   08:comment
  	 * 			   09:tag
  	 * 			   10:relation
  	 * 			   11:follow
  	 * 			   12:interest
  	 * 			   ...)
  	 * 第4-6位标示对象的具体错误/成功类型
  	 *
  	 */

  	/***********************************************************************
  	 * ERROR
  	 ***********************************************************************/
  	 ERROR : "100000",
  	 ERROR_USERNAME_NOTEXIST : "000000",	//"用户名不存在",
  	 ERROR_USERNAME_OUTOFMAX : "000001",	//"用户名过长",
  	 ERROR_USERNAME_EXIST : "000003",		//"用户名已存在",
  	 ERROR_USERNAME_EMPTY : "000004",		//"用户名空",

  	 ERROR_EMAIL_EXIST : "001000",			//"用户已注册",
  	 ERROR_EMAIL_EMPTY : "001001",			//"邮箱输入为空",
  	 ERROR_EMAIL_FORMAT : "001002",		//"邮箱地址格式错误",
  	 ERROR_EMAIL_NOT_REG : "001003",		//邮箱未注册
  	 ERROR_EMAIL_RESETPWD_SEND : "001004",		//密码重置邮件发送失败

  	 ERROR_PWD_EMPTY : "002000",			//"请输入密码",
  	 ERROR_PWD_DIFF : "002001",			//"密码错误",
  	 ERROR_PWD_SHORT : "002002",			//"密码太短",
  	 ERROR_PWD_LONG : "002003",			//"密码太长",
  	 ERROR_PWD_RESET : "002005",			//重置密码错误
  	 ERROR_PWD_NOTAGREE : "002006",			//修改密码时输入的旧密码与原始密码不符

  	 ERROR_CFMPWD_EMPTY : "003000",		//"请输入确认密码",
  	 ERROR_CFMPWD_NOTAGREE : "003001",		//"密码输入不一致",
  	 ERROR_CFMPWD_SAME : "003002",		//新旧密码相同,

  	 ERROR_ACCOUNT_ACTIVATION : "004000",			//账户激活错误
  	 ERROR_ACCOUNT_ACTIVATION_EXPIRED : "004001",	//激活链接过期
  	 ERROR_ACCOUNT_ACTIVATION_NOTEXIST : "004002",	//激活账户不存在
  	 ERROR_ACCOUNT_INACTIVE: "004003",			//账户待激活
  	 ERROR_ACCOUNT_LOCK: "004004",			//账户已锁定
  	 ERROR_ACCOUNT_CANCELLED: "004005",			//账户已注销
  	 ERROR_ACCOUNT_EXIST: "004006",			//账户已注销
  	 ERROR_ACCOUNT_NOTLOGIN : "004007",

  	 ERROR_POST_EMPTY : "005000",				//post相关字段空
  	 ERROR_POST_STATUS : "005001",				//post状态异常

  	 ERROR_ALBUM_CREATE : "006000",				//
  	 ERROR_ALBUM_PERMISSIONDENIED : "006001",				//相册并不属于上传用户
  	 ERROR_ALBUM_UPDDESC : "006002", 			//更新相册描述错误
  	 ERROR_ALBUM_UPDCOVER : "006003", 			//更新相册封面错误

  	 ERROR_PHOTO_CREATE : "007000",
  	 ERROR_PHOTO_EMPTY : "007001",				//上传图片为空
  	 ERROR_PHOTO_UPDDESC : "007002",				//上传图片为空

  	 ERROR_COMMENT_EMPTY : "008000",				//comment empty
  	 ERROR_COMMENT_STATUS : "008001",				//comment状态异常
  	 ERROR_COMMENT_TYPE : "008002",				//comment type异常

  	 ERROR_TAG_EMPTY : "009000",				//tag empty
  	 ERROR_TAG_DUPLICATE : "009001",				//tag duplicate

  	 ERROR_RELATION_CREATE : "010000",				//

  	 ERROR_FOLLOW : "011000",				//follow failed
  	 ERROR_FOLLOW_UNDO : "011001",				//undo failed

  	 ERROR_AVATAR_CROP : "014000",
  	 ERROR_AVATAR_CHANGE : "014001",

  	 ERROR_FEED_NOMORE : "015000",

  	/***********************************************************************
  	 * SUCCESS
  	 ***********************************************************************/
  	 SUCCESS : "100000",

  	 SUCCESS_EMAIL_RESETPWD_SEND : "101000", //重置密码邮件发送成功

  	 SUCCESS_PWD_FORMAT : "102000",			//密码格式正确
  	 SUCCESS_PWD_RESET : "102002",
  	 SUCCESS_PWD_CHANGE : "102003",

  	 SUCCESS_ACCOUNT_REG : "104000",			//"注册成功",
  	 SUCCESS_ACCOUNT_LOGIN : "104001",		//"登陆成功",
  	 SUCCESS_ACCOUNT_ACTIVATION : "104002",		//账户激活成功
  	 SUCCESS_ACCOUNT_ACTIVATION_EMAIL_RESEND : "104003",
     SUCCESS_ACCOUNT_LOGOUT : "104005",

  	 SUCCESS_POST_CREATE : "105000",		//
  	 SUCCESS_POST_UPDATE : "105001",
  	 SUCCESS_POST_DELETE : "105002",

  	 SUCCESS_ALBUM_CREATE : "106000",
  	 SUCCESS_ALBUM_ALLOWED : "106001",
  	 SUCCESS_ALBUM_UPDATE : "106002",

  	 SUCCESS_PHOTO_CREATE : "107000",
  	 SUCCESS_PHOTO_UPDATE : "107001",
  	 SUCCESS_PHOTO_DELETE : "107002",

  	 SUCCESS_COMMENT_CREATE : "108000",


  	 SUCCESS_TAG_FORMAT : "109000",
  	 SUCCESS_TAG_CREATE : "109001",

  	 SUCCESS_RELATION_CREATE : "110000",

  	 SUCCESS_FOLLOW : "111000",
  	 SUCCESS_FOLLOW_UNDO : "111001",
  	 SUCCESS_INTEREST : "112000",
  	 SUCCESS_INTEREST_UNDO : "112001",

     SUCCESS_LIKE : "113000",
     SUCCESS_LIKE_UNDO : "113001",

  	 SUCCESS_AVATAR_CROP : "114000",
  	 SUCCESS_AVATAR_CHANGE : "114001",

  	 SUCCESS_FEED_LOAD : "115000",
  },


};

module.exports = PoplarEnv;
