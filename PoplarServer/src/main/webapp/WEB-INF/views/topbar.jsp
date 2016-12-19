<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/menu.css">
	<nav class="navbar navbar-default navbar-fixed-top">
	  <div class="nav-container container-fluid">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header">
	      <a class="navbar-brand" href="<c:url value="/"/>">OSF</a>
	    </div>
	
	    <!-- Collect the nav links, forms, and other content for toggling -->
	    <div class="collapse navbar-collapse">
	      <ul class="nav navbar-nav">
	        <li class="active"><a href="<c:url value="/explore" />">探索</a></li>
	      </ul>
	      <ul class="nav navbar-nav navbar-right">
	      	<li>
				<form class="ui icon input search" id="search-form" action="<c:url value="/search/feed" />" method="get">
				  <input type="text" placeholder="搜索..."  name="term">
				  <i class="circular search link icon" id="search-btn"></i>
				</form>	      		      	
	      	</li>
	      	<c:if test="${not empty sessionScope.user}">
	      		<li>
	      			<%-- <a href='<c:url value="/user/${sessionScope.user.id }"></c:url>'>${sessionScope.user.user_name }</a> --%>
	      			<div class="ui simple dropdown item">
				      ${sessionScope.user.user_name }
				      <i class="dropdown icon"></i>
					  <div class="ui vertical menu">
						  <a class="item" href="<c:url value="/notifications/comment" />">
						    评论
						    <div class="ui red label">${notifications.comment }</div>
						  </a>
						  <a class="item" href="<c:url value="/notifications/like" />">
						    喜欢
						    <div class="ui red label">${notifications.like }</div>
						  </a>
						  <a class="item" href="<c:url value="/notifications/follow" />">
						    关注
						    <div class="ui red label">${notifications.follow }</div>
						  </a>
						  <a class="item" href="<c:url value="/notifications/system" />">
						    系统消息
						    <div class="ui red label">${notifications.system }</div>
						  </a>
						  <a href='<c:url value="/account/setting/info" />' class="item">设置</a>
						  <a href='<c:url value="/account/logout" />' class="item">退出</a>
					  </div>
				    </div>
	      		</li> 

   				 
	      	</c:if>
	      	<c:if test="${empty sessionScope.user}">
		        <li><a href='<c:url value="/account/register"></c:url>'>注册</a></li>
		        <li></li>
		        <li><a href='<c:url value="/account/login"></c:url>'>登录</a></li>
	        </c:if>
	      </ul>
	            
	      
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
	</nav>
    