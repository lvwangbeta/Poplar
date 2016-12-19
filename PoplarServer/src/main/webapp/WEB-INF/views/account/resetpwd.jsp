<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>重置密码</title>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/bootstrap2.css">	
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/navbar.css">
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/semantic.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/style.css">
	
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/jquery.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/basic.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/code.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/resetpwd.js"></script>
</head>
<body>
	<%@ include file="../topbar.jsp" %>
	<div class="container">
		<div class="row">
			<div class="span8 offset2">
				<div class="ui header">
					重置密码
				</div>
				<div class="ui divider"></div>
				
				<div class="reset_pwd">

					<div class="ui form" style="margin-top: 30px">
						<div class="inline field">
							<label for="#">新密码</label>
							<input type="password" id="password">
							<span id="password_tip" style="color: red; display: none"></span>
						</div>
						<div class="inline field">
							<label for="#">确认密码</label>
							<input type="password" id="cfm_pwd">
							<span id="cfm_pwd_tip" style="color: red; display: none"></span>
						</div>
						
						<div class="inline field">
							<label for="#"></label>
							<div class="ui tiny blue button" id="reset_btn">保存</div>
						</div>					
					</div>		
				</div>
				
			</div>
		</div>
	
	</div>
</body>
</html>