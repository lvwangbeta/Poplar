<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="type" content="post">
	<meta name="id" content="${post.id }">
	<meta name="author" content="${post.post_author }">
	<c:if test="${not empty sessionScope.user}">
		<meta name="isLogin" content="true"/>
	</c:if>
	<c:if test="${empty sessionScope.user}">
		<meta name="isLogin" content="false"/>
	</c:if>
	<title>${post.post_title }</title>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/bootstrap2.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/navbar.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/semantic.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/style.css">
	<style>
	.post img{
		max-width: 620px;
	}
	</style>
	
  	<script type="text/javascript" src="<%=request.getContextPath() %>/js/jquery.js"></script>
  	<script type="text/javascript" src="<%=request.getContextPath() %>/js/semantic.js"></script>
  	<script type="text/javascript" src="<%=request.getContextPath() %>/js/basic.js"></script>
  	<script type="text/javascript" src="<%=request.getContextPath() %>/js/code.js"></script>
  	<script type="text/javascript" src="<%=request.getContextPath() %>/js/comment.js"></script>
  	<script type="text/javascript" src="<%=request.getContextPath() %>/js/post.js"></script>
  	<script type="text/javascript" src="<%=request.getContextPath() %>/js/follow.js"></script>
  	<script type="text/javascript" src="<%=request.getContextPath() %>/js/login.js"></script>
</head>
<body>
	
	<%@ include file="../topbar.jsp" %>
	<%@ include file="../login_modal.jsp" %>
	<div class="container">
		<div class="row">
			<div class="span8 offset2">

						<div class="post" id="post${post.id }">
							<div class="header">
								${post.post_title }
							</div>
							<div class="date">
								<i class="wait icon"></i><span>2015-05-01</span>
							</div>
							<div class="meta">
								<div class="author">
									<a href="<c:url value="/user/${u.id }" />">
										<img class="ui avatar image" src="<c:url value="${img_base_url }${u.user_avatar }" />">
									</a>
									<span>${u.user_name }</span>
									<c:if test="${!empty sessionScope.user }">
										<c:if test="${sessionScope.user.id ne u.id }">
											<c:if test="${follow }">
												<span class="ui tiny basic button follow" following="${u.id }">已关注</span>
											</c:if>
											<c:if test="${!follow }">
												<span class="ui inverted tiny yellow button follow" following="${u.id }">+关注</span> 
											</c:if>									
										</c:if>						
									</c:if>	
									<c:if test="${empty sessionScope.user }">
										<span class="ui inverted tiny yellow button follow" following="${u.id }">+关注</span>
									</c:if>
								</div>
								<div class="tags">
									<c:forEach items="${post.post_tags_list }" var="tag">
										<a class="ui label" href="<c:url value="/tag/${tag.id}" />">${tag.tag }</a>
									</c:forEach>
								</div>
							</div>
							<div class="post-content">
								${post.post_content }
							</div>

						</div>
						<div>
							<div class="action">
								<div class="ui circular icon basic button">						
								  <i class="share alternate icon"></i>	
								</div>							
								<div class="ui circular orange icon button">
								  <i class="weibo icon" id="weiboshare"></i>
								</div>
								<div class="ui circular blue icon button">
								  <i class="qq icon" id="qqshare"></i>
								</div>
								<div class="ui circular green icon button">
								  <i class="wechat icon" id="wechatshare"></i>
								</div>	
								<div class="ui circular icon basic button post like">
								  <c:if test="${!is_like }">
								  	<i class="empty red heart icon" id="like"></i>
								  </c:if>
								  <c:if test="${is_like }">
								  	<i class="red heart icon" id="like"></i>
								  </c:if>
								</div>	
								<c:if test="${u.id eq user.id}">
								<div class="ui circular icon basic button post trash">
									<i class="trash outline icon"></i>
								</div>
								</c:if>
							</div>
						</div>
					</div>
		</div>
	</div>
	
	<!--  -->
	<div class="comments">
		<div class="container">
			<div class="row">
				<div class="span8 offset2">
					<div class="ui comments" id="comments">
						  <div id="replyarea">
							  <form class="ui reply form" id="replyform">
							    <div class="field">
							      <textarea id="replycontent"></textarea>
							    </div>
								<div class="ui tiny primary button" id="replybtn">
								  评论
								</div>							    
							  </form>								
						  </div>
						  
						  							
						  <jsp:include page="/comment/post/${post.id }"></jsp:include>				  	
						  
					  </div>
					  <!-- comment list -->					
					</div>
				</div>

			 </div>
		</div>
		<!-- end comment -->
	</div>
	
	<%@ include file="../trash_tip.jsp" %>
</body>
</html>