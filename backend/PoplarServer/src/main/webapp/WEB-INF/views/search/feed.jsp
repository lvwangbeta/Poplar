<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OSF</title>
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
</head>
<body>
  <%@ include file="../topbar.jsp" %>
  <div class="container">
    <div class="row">  
          <div class="span8">  
				<form class="ui icon input" id="search-bar" action="<c:url value="/search/feed" />" method="get">
				  <input type="text" placeholder="搜索" value="${term }" name="term">
				  <i class="circular search link icon" id="search-bar-btn"></i>
				</form>
				<div class="ui secondary  menu">
				  <a class="item active" href="<c:url value="/search/feed?term=${term }" />">
				    综合
				  </a>
				  <a class="item" href="<c:url value="/search/tag?term=${term }" />">
				    标签
				  </a>
				  <a class="item" href="<c:url value="/search/user?term=${term }" />">
				    找人
				  </a>
				</div>
                 <div class="ui feed" id="feeds">
                    <%@ include file="../nextpage.jsp" %>                
                  </div>  <!--end feed -->
                  
				  <div class="footer" style="left: 40%">
					 <i class="disabled big loading spinner icon"></i>
				  </div>   
                  <a id="next" href="<c:url value="/search/feed/page/2?term=${term }" />"></a>
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

  <script src="<%=request.getContextPath() %>/js/feed.js"></script>
</body>
</html>