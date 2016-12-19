<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<title>${u.user_name }</title>
	<c:if test="${not empty sessionScope.user}">
		<meta name="isLogin" content="true"/>
	</c:if>
	<c:if test="${empty sessionScope.user}">
		<meta name="isLogin" content="false"/>
	</c:if>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/bootstrap2.css">
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/navbar.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/semantic.css">
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/style.css">
    
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
          <div class="span8">     
          		<div class="ui feed">
          			<h4 class="ui header">我的日志 (<a href="#"> 全部 </a>)</h4>
          			<c:forEach items="${posts }" var="post">     			
	          			<div class="ui divider"></div>
	                    <div class="event">                    
	                      <div class="content">
	                        <div class="text">
	                        	<div class="row">
	                        	<c:if test="${not empty post.post_cover}">
	                        		<div class="span6">
	                        	</c:if>
	                        	<c:if test="${empty post.post_cover}">
	                        		<div class="span8">
	                        	</c:if>
	                        		
	                        			<h3 class="ui header">
	                        				<a href="<%=request.getContextPath() %>/post/${post.id}">${post.post_title }</a>
	                        			</h3>
	                        			<div>
	                        				${post.post_excerpt }
	                        			</div>
	                        			<div class="postmeta">
	
	                        			</div>
	                        		</div>
	                        		<c:if test="${not empty post.post_cover}">
		                        		<div class="span2">
		                        			<img class="ui small image" src="${img_base_url }${post.post_cover }?imageView2/1/w/200/h/200" alt=""  />
		                        		</div>
	                        		</c:if>
	                        		
	                        	</div>
	                        </div>
	                        <div class="meta">
	                          <span style="float: left"> 
	                        	<i class="tag icon"></i>
	                        	<c:forEach items="${post.post_tags }" var="tag">
	                        		<a href="<c:url value="/tag/${tag.id }" />">${tag.tag }</a>
	                        	</c:forEach>
	                          </span>
	                          <span style="float: right">
<%-- 		                          <a class="like">
		                            <i class="like icon"></i> ${post.like_count }
		                          </a>
		                          <a class="share">
		                            <i class="share alternate icon"></i> ${post.share_count }
		                          </a>   
		                          <a class="comment">
		                            <i class="comment outline icon"></i> ${post.comment_count }
		                          </a>    --%>
							  </span>
	                        </div>


	                      </div>
	                    </div>     <!-- end event -->  
                    </c:forEach>

          		
          			<h4 class="ui header albumheader">我的相册 (<a href="#"> 全部 </a>)</h4>
          			<div class="ui divider"></div>
                    <div class="event">                    
                      <div class="content">
						<div class="ui four cards">
						  <c:forEach items="${albums }" var="album">
							  <div class="card">
							    <a class="image" href="<c:url value="/album/${album.id}/photos"/>">
							      <img src="<c:url value="${img_base_url}${album.cover }?imageView2/1/w/200/h/200"/>">
							    </a>
							    <div class="extra">
							      ${album.album_desc }
							    </div>
							  </div>						  						  
						  </c:forEach>
						</div>
                      </div>
                    </div>
          			
          	</div>     <!-- end feed --> 
          </div> <!-- end span8 -->
          
          <div class="span4">
          	<div id="rightside">
				<%@ include file="../usercard.jsp" %>  
            </div>           
          </div>
          <!-- end span4 -->
     </div>
     <!-- end row -->
   </div>
   <!-- end container -->

</body>
</html>