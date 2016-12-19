<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<c:if test="${not empty sessionScope.user}">
	<meta name="isLogin" content="true"/>
</c:if>
<c:if test="${empty sessionScope.user}">
	<meta name="isLogin" content="false"/>
</c:if>
<title>OSF</title>
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/bootstrap2.css">
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/navbar.css">
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/semantic.css">
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/style.css">
  <script src="<%=request.getContextPath() %>/js/jquery.js"></script>
  <script src="<%=request.getContextPath() %>/js/semantic.js"></script>
  <script src="<%=request.getContextPath() %>/js/basic.js"></script>
  <script src="<%=request.getContextPath() %>/js/code.js"></script>
  <script src="<%=request.getContextPath() %>/js/explore.js"></script>
  <script src="<%=request.getContextPath() %>/js/follow.js"></script>
  <script src="<%=request.getContextPath() %>/js/login.js"></script>
  <script src="<%=request.getContextPath() %>/js/guide.js"></script>
  
</head>
<body>
 	<%@ include file="topbar.jsp" %>
	<%@ include file="login_modal.jsp" %>
	<div class="explore">
		<div class="topbar">
			<div class="container">
				<div class="header" style="text-align: center">
					<div>关注你喜欢的</div>
				</div>
			</div>
		</div>

		<div class="main" style="text-align: center;">
			<div class="tags">
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
			<!-- end tags -->
			
			<div class="ui green button" id="ok" style="margin: 0 auto; margin-bottom: 50px">好了</div>
			
		</div>
	</div>
</body>
</html>