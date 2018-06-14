package com.lvwangbeta.poplar.common.util;

public class Property {
    /*
     * 数据字典(6位)
     * rules:
     * 第1位标示类别(0:错误(ERROR); 1:成功(SUCCESS);)
     * 第2-3位标示对象(00:username;
     * 			   01:emai;
     * 			   02:password;
     * 			   03:conformPassword
     * 			   04:account
     * 			   05:post;
     * 			   06:album;
     * 			   07:photo;
     * 			   08:comment
     * 			   09:tag
     * 			   10:relation
     * 			   11:follow
     * 			   12:interest
     * 			   13:like
     * 			   14:avatar
     * 			   15:feed
     * 			   ...)
     * 第4-6位标示对象的具体错误/成功类型
     *
     */

    public static boolean isSuccess(String errcode) {
        if(errcode == null || errcode.length() == 0) {
            return false;
        }
        if(errcode.startsWith("0")) {
            return false;
        } else if(errcode.startsWith("1")) {
            return true;
        } else {
            return false;
        }
    }

    /***********************************************************************
     * ERROR
     ***********************************************************************/
    public static final String ERROR = "000000";
    public static final String ERROR_USERNAME_NOTEXIST = "000000";	//"用户名不存在";
    public static final String ERROR_USERNAME_OUTOFMAX = "000001";	//"用户名过长";
    public static final String ERROR_USERNAME_EXIST = "000003";		//"用户名已存在";
    public static final String ERROR_USERNAME_EMPTY = "000004";		//"用户名空";

    public static final String ERROR_EMAIL_EXIST = "001000";			//"用户已注册";
    public static final String ERROR_EMAIL_EMPTY = "001001";			//"邮箱输入为空";
    public static final String ERROR_EMAIL_FORMAT = "001002";		//"邮箱地址格式错误";
    public static final String ERROR_EMAIL_NOT_REG = "001003";		//邮箱未注册
    public static final String ERROR_EMAIL_RESETPWD_SEND = "001004";		//密码重置邮件发送失败

    public static final String ERROR_PWD_EMPTY = "002000";			//"请输入密码";
    public static final String ERROR_PWD_DIFF = "002001";			//"密码错误";
    public static final String ERROR_PWD_SHORT = "002002";			//"密码太短";
    public static final String ERROR_PWD_LONG = "002003";			//"密码太长";
    public static final String ERROR_PWD_RESET_NOTALLOWED = "002004";			//不允许重置密码
    public static final String ERROR_PWD_RESET = "002005";			//重置密码错误
    public static final String ERROR_PWD_NOTAGREE = "002006";			//修改密码时输入的旧密码与原始密码不符

    public static final String ERROR_CFMPWD_EMPTY = "003000";		//"请输入确认密码";
    public static final String ERROR_CFMPWD_NOTAGREE = "003001";		//"密码输入不一致";
    public static final String ERROR_CFMPWD_SAME = "003002";		//新旧密码相同;

    public static final String ERROR_ACCOUNT_ACTIVATION = "004000";			//账户激活错误
    public static final String ERROR_ACCOUNT_ACTIVATION_EXPIRED = "004001";	//激活链接过期
    public static final String ERROR_ACCOUNT_ACTIVATION_NOTEXIST = "004002";	//激活账户不存在
    public static final String ERROR_ACCOUNT_INACTIVE= "004003";			//账户待激活
    public static final String ERROR_ACCOUNT_LOCK= "004004";			//账户已锁定
    public static final String ERROR_ACCOUNT_CANCELLED= "004005";			//账户已注销
    public static final String ERROR_ACCOUNT_EXIST= "004006";			//账户已存在(已激活)
    public static final String ERROR_ACCOUNT_NOTLOGIN = "004007";
    public static final String ERROR_ACCOUNT_NOTEXIST = "004008";

    public static final String ERROR_POST_EMPTY = "005000";				//post相关字段空
    public static final String ERROR_POST_STATUS = "005001";				//post状态异常

    public static final String ERROR_ALBUM_CREATE = "006000";				//
    public static final String ERROR_ALBUM_PERMISSIONDENIED = "006001";				//相册并不属于上传用户
    public static final String ERROR_ALBUM_UPDDESC = "006002"; 			//更新相册描述错误
    public static final String ERROR_ALBUM_UPDCOVER = "006003"; 			//更新相册封面错误
    public static final String ERROR_ALBUM_EMPTY = "006004"; 			//上传相册为空

    public static final String ERROR_PHOTO_CREATE = "007000";
    public static final String ERROR_PHOTO_EMPTY = "007001";				//上传图片为空
    public static final String ERROR_PHOTO_UPDDESC = "007002";				//上传图片为空

    public static final String ERROR_COMMENT_EMPTY = "008000";				//comment empty
    public static final String ERROR_COMMENT_STATUS = "008001";				//comment状态异常
    public static final String ERROR_COMMENT_TYPE = "008002";				//comment type异常

    public static final String ERROR_TAG_EMPTY = "009000";				//tag empty
    public static final String ERROR_TAG_DUPLICATE = "009001";				//tag duplicate

    public static final String ERROR_RELATION_CREATE = "010000";				//

    public static final String ERROR_FOLLOW = "011000";				//follow failed
    public static final String ERROR_FOLLOW_UNDO = "011001";				//undo failed\

    public static final String ERROR_INTEREST = "012000";
    public static final String ERROR_INTEREST_UNDO = "012001";

    public static final String ERROR_LIKE = "013000";
    public static final String ERROR_LIKE_UNDO = "013001";

    public static final String ERROR_AVATAR_CROP = "014000";
    public static final String ERROR_AVATAR_CHANGE = "014001";

    public static final String ERROR_FEED_NOMORE = "015000";

    /***********************************************************************
     * SUCCESS
     ***********************************************************************/
    public static final String SUCCESS = "100000";

    public static final String SUCCESS_EMAIL_RESETPWD_SEND = "101000";		//密码重置邮件发送成功

    public static final String SUCCESS_PWD_FORMAT = "102000";			//密码格式正确
    public static final String SUCCESS_PWD_RESET_ALLOWED = "102001";
    public static final String SUCCESS_PWD_RESET = "102002";
    public static final String SUCCESS_PWD_CHANGE = "102003";

    public static final String SUCCESS_ACCOUNT_REG = "104000";			//"注册成功";
    public static final String SUCCESS_ACCOUNT_LOGIN = "104001";		//"登陆成功";
    public static final String SUCCESS_ACCOUNT_ACTIVATION = "104002";		//账户激活成功
    public static final String SUCCESS_ACCOUNT_ACTIVATION_EMAIL_RESEND = "104003";
    public static final String SUCCESS_ACCOUNT_ACTIVATION_KEY_UPD = "104004";
    public static final String SUCCESS_ACCOUNT_LOGOUT = "104005";

    public static final String SUCCESS_POST_CREATE = "105000";		//
    public static final String SUCCESS_POST_UPDATE = "105001";		//
    public static final String SUCCESS_POST_DELETE = "105002";		//

    public static final String SUCCESS_ALBUM_CREATE = "106000";
    public static final String SUCCESS_ALBUM_ALLOWED = "106001";
    public static final String SUCCESS_ALBUM_UPDATE = "106002";

    public static final String SUCCESS_PHOTO_CREATE = "107000";
    public static final String SUCCESS_PHOTO_UPDATE = "107001";
    public static final String SUCCESS_PHOTO_DELETE = "107002";

    public static final String SUCCESS_COMMENT_CREATE = "108000";


    public static final String SUCCESS_TAG_FORMAT = "109000";
    public static final String SUCCESS_TAG_CREATE = "109001";

    public static final String SUCCESS_RELATION_CREATE = "110000";

    public static final String SUCCESS_FOLLOW = "111000";
    public static final String SUCCESS_FOLLOW_UNDO = "111001";

    public static final String SUCCESS_INTEREST = "112000";
    public static final String SUCCESS_INTEREST_UNDO = "112001";

    public static final String SUCCESS_LIKE = "113000";
    public static final String SUCCESS_LIKE_UNDO = "113001";

    public static final String SUCCESS_AVATAR_CROP = "114000";
    public static final String SUCCESS_AVATAR_CHANGE = "114001";

    public static final String SUCCESS_FEED_LOAD = "115000";
}
