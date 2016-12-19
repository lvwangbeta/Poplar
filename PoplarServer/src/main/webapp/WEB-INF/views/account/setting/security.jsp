<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>账户安全</title>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/bootstrap2.css">	
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/navbar.css">
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/semantic.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/style.css">
	
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/jquery.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/basic.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/code.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/setting.js"></script>
</head>
<body>
	<%@ include file="../../topbar.jsp" %>
	<div class="container">
		<div class="row">
			<div class="span4">
				<div class="ui vertical menu">
				  <a class="item" href='<c:url value="/account/setting/info"/>' >
				    个人信息
				  </a>
				  <a class="item" href='<c:url value="/account/setting/avatar"/>'>
				    头像
				  </a>
				  <a class="active teal item" href='<c:url value="/account/setting/security"/>'>
				    账户安全
				  </a>
				</div>
			
			</div>
			<div class="span8">
				<div class="ui header">
					账户安全
				</div>
				<div class="ui divider"></div>
				
				<div class="security">
					<div class="ui form" style="margin-top: 30px">
						<div class="inline field">
							<label for="">密码</label>
							<a href="#" class="ui tiny button" id="change_pwd">修改</a>
						</div>
						<div class="change_pwd_area">
							
							<div class="inline field">
								<label for="#">旧密码</label>
								<input type="password" id="old_pwd">
								<span id="old_pwd_tip" style="color: red; display: none"></span>
							</div>
							<div class="inline field">
								<label for="#">新密码</label>
								<input type="password" id="new_pwd" >
								<span id="new_pwd_tip" style="color: red; display: none"></span>
							</div>					

							<div class="ui tiny blue button" id="save_pwd">保存</div>
							<div class="ui tiny basic button" id="cancle_save_pwd">取消</div>
						</div>					
					</div>
					<div class="ui form" style="margin-top: 30px">
						<div class="inline field">
							<a href="#" id="forget_pwd">忘记密码? 邮箱验证修改</a>
						</div>

						<div class="email_check_area">
							<div class="ui tiny blue button" id="send_check_email">发送邮件验证</div>						
						</div>						
					</div>		
				</div>
				
			</div>
		</div>
	
	</div>
</body>
</html>