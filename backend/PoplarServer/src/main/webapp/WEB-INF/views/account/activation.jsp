<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>账户激活</title>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/bootstrap2.css">	
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/navbar.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/semantic.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/style.css">
  	<script src="<%=request.getContextPath() %>/js/jquery.js"></script>
  	<script src="<%=request.getContextPath() %>/js/semantic.js"></script>
  	<script src="<%=request.getContextPath() %>/js/basic.js"></script>
  	<script src="<%=request.getContextPath() %>/js/code.js"></script>
</head>
<body>
<%@ include file="../topbar.jsp" %>
<div class="container">
	<div class="row">
		<div class="span8 offset2">
			<div class="ui piled segment" style="text-align: center;">
				<div style="margin: 40px;">
					<i class="massive mail outline icon"></i>
				</div>
				<c:if test="${empty status }">
					<div class="content">
						激活链接已发送到您的邮箱<a href="#">${email }</a>, 请激活 
					</div>
					<div class="ui divider"></div>
					<div class="content">
						没有收到？<a href="#" class="ui small primary button" id="resend" email="${email}">重新发送</a> 
					
					</div>
				</c:if>
				<c:if test="${ERROR_ACCOUNT_ACTIVATION_NOTEXIST eq status }">
					<div class="content">
						账户不存在
					</div>				
				</c:if>
				<c:if test="${ERROR_ACCOUNT_ACTIVATION_EXPIRED eq status }">
					<div class="content">
						链接已失效 <a href="#" class="ui small primary button" id="resend" email="${email}">重新发送</a>
					</div>				
				</c:if>
				<c:if test="${ERROR_ACCOUNT_ACTIVATION eq status }">
					<div class="content">
						未知错误
					</div>				
				</c:if>
			</div>	
		
			
		</div>
	</div>
</div>
<script type="text/javascript">
$(document).ready(function(){
	$('#resend').live('click', function(){
		if($(this).hasClass('loading')){
			return false;
		}
		var that = $(this);
		var email=$(this).attr('email');
		$.ajax({
			url: basePath + '/account/activation/mail/resend?email='+email,
			type: 'GET',
			dataType: 'json',
			beforeSend: function(){
				$(that).addClass('loading');
			}

		})
		.success(function(data){
			$(that).removeClass('loading');
			if(data.status == SUCCESS_ACCOUNT_ACTIVATION_EMAIL_RESEND){
				$(that).text('已发送');
			}
		})

	})
})




</script>
</body>
</html>