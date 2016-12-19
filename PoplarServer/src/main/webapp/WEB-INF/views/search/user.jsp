<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OSF</title>
  <c:if test="${not empty sessionScope.user}">
	<meta name="isLogin" content="true"/>
  </c:if>
  <c:if test="${empty sessionScope.user}">
	<meta name="isLogin" content="false"/>
  </c:if>  
  <link rel="shortcut icon" href="<%=request.getContextPath() %>/img/favicon.ico" />
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/bootstrap2.css">
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/navbar.css">
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/semantic.css">
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/style.css">

  <script src="<%=request.getContextPath() %>/js/jquery.js"></script>
  <script src="<%=request.getContextPath() %>/js/semantic.js"></script>
  <script src="<%=request.getContextPath() %>/js/basic.js"></script>
  <script src="<%=request.getContextPath() %>/js/code.js"></script>
  <script src="<%=request.getContextPath() %>/js/like.js"></script>
  <script src="<%=request.getContextPath() %>/js/search.js"></script>
  <script src="<%=request.getContextPath() %>/js/follow.js"></script>
  <script src="<%=request.getContextPath() %>/js/login.js"></script>  
</head>
<body>
  <%@ include file="../topbar.jsp" %>
  <%@ include file="../login_modal.jsp" %>
  <div class="container">
    <div class="row">  
          <div class="span8">  
				<form class="ui icon input" id="search-bar" action="<c:url value="/search/user" />" method="get">
				  <input type="text" placeholder="搜索" value="${term }" name="term">
				  <i class="circular search link icon" id="search-bar-btn"></i>
				</form>
				<div class="ui secondary  menu">
				  <a class="item" href="<c:url value="/search/feed?term=${term }" />">
				    综合
				  </a>
				  <a class="item" href="<c:url value="/search/tag?term=${term }" />">
				    标签
				  </a>
				  <a class="item active" href="<c:url value="/search/user?term=${term }" />">
				    找人
				  </a>
				</div>
  				<div>
				<div class="search users">							
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
				<!--end users  -->

  				</div>
                  
				  <div class="footer" style="left: 40%">
					 <i class="disabled big loading spinner icon"></i>
				  </div>   
                  <a id="next" href="<c:url value="/page/2" />"></a>
            </div>
          <div class="span4">
          	<div id="rightside">
          		<c:if test="${not empty sessionScope.user}">
	            <div class="ui card">
	              <div class="ui small centered circular  image">
	                <a href="<c:url value="/user/${user.id }" />"><img src="<c:url value="${img_base_url }${user.user_avatar }"/> "></a>
	              </div>
	              <div class="content">
	                <a class="header centered" href="<c:url value="/user/${user.id}" />">
	                	${user.user_name }
	                </a>
	                <div class="meta centered">
	                  <span class="date">不想成为画家的黑客不是好摄影师</span>
	                </div>	                
					<div class="ui mini statistics">
					  <div class="statistic">
					    <div class="value">
					      <a href="<c:url value="/followers" />">${counter.follower }</a>
					    </div>
					    <div class="label">粉丝
					    </div>
					  </div>
					  <div class="statistic">
					    <div class="value">
					      <a href="<c:url value="/followings"/>">${counter.following }</a>
					    </div>
					    <div class="label">关注
					    </div>
					  </div>
					  <div class="statistic">
					    <div class="value">
					      <a href="#">${counter.spost }</a>
					    </div>
					    <div class="label">状态
					    </div>
					  </div>
					</div>	<!-- end statistics --> 
					
					               
	              </div>
	            </div> 
	            </c:if>
				<jsp:include page="/sidebar"></jsp:include>					
										
            </div>           
          </div>
        </div>       
      </div>

    </div>

  </div>
</body>
</html>