<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Expires" content="0">

<c:if test="${not empty sessionScope.user}">
	<meta name="isLogin" content="true"/>
</c:if>
<c:if test="${empty sessionScope.user}">
	<meta name="isLogin" content="false"/>
</c:if>
<title>探索OSF</title>
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/bootstrap2.css">
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/navbar.css">
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/semantic.css">
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/style.css">
  <script src="<%=request.getContextPath() %>/js/jquery.js"></script>

  <script src="<%=request.getContextPath() %>/js/semantic.js"></script>
  <script src="<%=request.getContextPath() %>/js/basic.js"></script>
  <script src="<%=request.getContextPath() %>/js/code.js"></script>
  <script src="<%=request.getContextPath() %>/js/follow.js"></script>
  <script src="<%=request.getContextPath() %>/js/login.js"></script>
</head>
<body>
 	<%@ include file="topbar.jsp" %>
	<%@ include file="login_modal.jsp" %>
	<div class="explore">
		<div style="background-color: white; width:100%">
			<div class="topbar">
					<div class="header">
						<div>探索<div class="active"></div></div>
						<div>标签<div></div></div>
						<div>用户<div></div></div>
					</div>
				<!-- <div class="active"></div> -->
			</div>		
		</div>

		<div class="main">
			<div class="gallery container" >
				<!-- <div class="box first-item"></div> -->
				<c:forEach items="${events }" var="event">
					<div class="box">
						<c:if test="${event.object_type eq dic.object_type_post }">
							<a href="<c:url value="/post/${event.object_id }" />">
								<img src="<c:url value="${img_base_url }${event.content }?imageView2/1/w/300/h/240" />" alt="" />
							</a>
						</c:if>
						<c:if test="${event.object_type eq dic.object_type_album }">
							<a href="<c:url value="/album/${event.object_id }/photos" />">
								<img src="<c:url value="${img_base_url }${event.title }?imageView2/1/w/300/h/240" />" alt="" />
							</a>
						</c:if>
 						<div class="meta">
							<a href="<c:url value="/user/${event.user_id }" />">
								<img class="ui avatar image" src="${img_base_url }${event.user_avatar}?imageView2/1/w/48/h/48">
								<span>${event.user_name}</span>
							</a>
						</div>
					</div>
				</c:forEach>
			</div>	
			<div class="tags" style="display: none">
				<div class="container">
					<div class="row">
						<div>
							<c:forEach items="${tags }" var="tag" begin="0" end="9">
								<div class="tagbox">
									<div>
										<img class="visible" src="<c:url value="${img_base_url }${tag.cover }?imageView2/1/w/200/h/200" />" alt="" />
										<span class="desc">#${tag.tag }</span>
									</div>
									<c:if test="${!isInterests[tag.id] }">
										<div class="hidden">
											<a href="#" id="${tag.id }" action="interest">加关注</a>
										</div>									
									</c:if>
									<c:if test="${isInterests[tag.id] }">
										<div class="interested">
											<a href="#" id="${tag.id }" action="undointerest">已关注</a>
										</div>											
									</c:if>

								</div>								
							</c:forEach>

						</div>
					</div>
				</div>
			</div>
			<div class="users" style="display: none">
				<div class="container">
					<div class="row">
						
						<c:forEach items="${feeds }" var="feed">
							<div class="userbox">
								<div class="header">
									<img class="avatar" src="${img_base_url }${feed.key.user_avatar }" alt="" />
									<div class="desc">${feed.key.user_name }</div>
									<c:if test="${isFollowings[feed.key.id] }">
										<div class="ui tiny basic button follow" following="${feed.key.id }">已关注</div>
									</c:if>
									<c:if test="${!isFollowings[feed.key.id] }">
										<div class="ui inverted yellow tiny  button follow" following="${feed.key.id }">+关注</div>
									</c:if>
								</div>
								<div class="content">	
									<c:forEach items="${feed.value }" var="f">
										<c:if test="${f.object_type eq dic.object_type_post }">
										   <a class="box" href="<c:url value="/post/${f.object_id }" />" href="<c:url value="/post/${f.object_id }" />">
												<img src="${img_base_url }${f.content }${album_thumbnail}" alt="" />
												<div class="cover">
													${f.title }
												</div>
											</a>
								
										</c:if>							
										<c:if test="${f.object_type eq dic.object_type_album }">
											<a class="box" href="<c:url value="/album/${f.object_id }/photos" />" href="<c:url value="/album/${f.object_id }/photos" />">
												<img src="${img_base_url }${f.title }${album_thumbnail}" alt="" />
												<div class="cover">
													${f.summary }
												</div>		
											</a>							
										</c:if>	
										<c:if test="${f.object_type eq dic.object_type_shortpost }">
											<div class="box" >
												<i class="disabled large quote left icon"></i>
												${f.summary }
												<i class="disabled large quote right icon"></i>
											</div>											
										</c:if>				
									</c:forEach>
								</div>
							</div>
						</c:forEach>
					
	
					</div>
					<!-- end a row -->

				</div>
				
			</div>
		</div>
	</div>
	<div class="footer">
		<i class="disabled big loading spinner icon"></i>
	</div>	
	<script src="<%=request.getContextPath() %>/js/explore.js"></script>
</body>
</html>
