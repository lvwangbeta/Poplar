<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>通知</title>
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
			<div class="span4">
				<div class="ui vertical menu">
				  <a class="item" href='<c:url value="/notifications/comment"/>' >
				  	评论
				    <div class="ui red label">${notifications.comment }</div>
				  </a>
				  <a class="item" href='<c:url value="/notifications/like"/>'>
				   	喜欢
				   	<div class="ui red label">${notifications.like }</div>
				  </a>
				  <a class="item" href='<c:url value="/notifications/follow"/>'>
				    关注
				    <div class="ui red label">${notifications.follow }</div>
				  </a>
				  <a class="active teal item" href='<c:url value="/notifications/system"/>'>
				    系统消息
				    <div class="ui red label">${notifications.system }</div>
				  </a> 
				</div>
			
			</div>
			<!-- end span4  -->
			
			<div class="span6">
				<div class="ui secondary menu">
				    <a class="item active" data-tab="notread">未读</a>
				    <a class="item" data-tab="read">已读</a>
				  </div>
				  <div class="ui tab  active" data-tab="notread">
						<div class="ui relaxed list">
							<c:forEach items="${notis }" var="notification" begin="0" end="9">
							  <c:if test="${notification.notify_type eq dic.notify_type_system }">
								  <div class="item">
								    <img class="ui avatar image" src="<c:url value="${img_base_url }${notification.notifier_avatar }" />">
								    <div class="content">
								      <a class="header" href="<c:url value="/user/${notification.notifier }" /> ">${notification.notifier_name }</a>
								    </div>
								  </div>	
							  </c:if>							

							</c:forEach>
						</div>
				  </div>
				  <div class="ui tab " data-tab="read">
				    5
				  </div>
						
			</div>
		</div>
	</div>
	<script type="text/javascript">
	$(document).ready(function(){
		$('.menu .item').tab()
	});
	</script>
</body>
</html>