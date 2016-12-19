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
  <script src="<%=request.getContextPath() %>/js/interest.js"></script>
  <script src="<%=request.getContextPath() %>/js/login.js"></script>  
</head>
<body>
  <%@ include file="../topbar.jsp" %>
  <%@ include file="../login_modal.jsp" %>
  <div class="container">
    <div class="row">  
          <div class="span8">  
				<form class="ui icon input" id="search-bar" action="<c:url value="/search/tag" />" method="get">
				  <input type="text" placeholder="搜索" value="${term }" name="term">
				  <i class="circular search link icon" id="search-bar-btn"></i>
				</form>
				<div class="ui secondary  menu">
				  <a class="item" href="<c:url value="/search/feed?term=${term }" />">
				    综合
				  </a>
				  <a class="item active" href="<c:url value="/search/tag?term=${term }" />">
				    标签
				  </a>
				  <a class="item" href="<c:url value="/search/user?term=${term }" />">
				    找人
				  </a>
				</div>
  				<div>
  				<div class="search tagboxes">
					<c:forEach items="${tags }" var="tag">
						<div class="tagbox">
							<div class="header">
								<div class="tag"><a href="<c:url value="/tag/${tag.id }" />">#${tag.tag }</a></div>
								<c:if test="${!isInterests[tag.id] }">
							  		<div class="ui mini inverted yellow button interest" tag_id="${tag.id }">
							  			+关注
							  		</div>
								</c:if>		
								<c:if test="${isInterests[tag.id] }">
							  		<div class="ui mini basic button interest" tag_id="${tag.id }">
							  			 已关注
							  		</div>
								</c:if>							
							</div>
							<div class="content">
								<c:forEach items="${feeds[tag.id] }" var="feed">
									<div class="imgbox">
										<c:if test="${feed.object_type eq dic.object_type_album }">
											<a href="<c:url value="/album/${feed.object_id }/photos" />">
												<img src="<c:url  value="${img_base_url }${feed.title }?imageView2/1/w/200/h/200" />" alt="" />
											</a>
										</c:if>
										<c:if test="${feed.object_type eq dic.object_type_post }">
											<a href="<c:url value="/post/${feed.object_id }" />">
												<img src="<c:url  value="${img_base_url }${feed.content }?imageView2/1/w/200/h/200" />" alt="" />
											</a>
										</c:if>
									</div>
								</c:forEach>
							</div>
						</div>
					</c:forEach>  					
  				</div>

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