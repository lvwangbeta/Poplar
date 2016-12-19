<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    

<div class="ui header">
    热门用户
</div>
<div class="ui vertical menu popusers">
  <div class="item">
  	<c:forEach items="${popusers }" var="popuser">
		<a href="<c:url value="/user/${popuser.id }" />" class="popuser">
			<img class="ui inline image" src="${img_base_url }${popuser.user_avatar}?imageView2/1/w/100/h/100">
		</a>
		<%-- <jsp:include page="/popup_usercard/${popuser.id }" flush="true"></jsp:include>	 --%>
	</c:forEach>
	<!-- end popup -->

	
  </div>
</div>
	
<!-- end menu -->	

<div class="ui header">
    热门标签
</div>
<div class="ui vertical menu poptags">
  <c:forEach items="${poptags }" var="poptag" begin="0" end="4">
	  <a href="<c:url value='/tag/${poptag.id }' />" target="_blank" />
		  <div class="tagitem" style="background: url(${img_base_url}${poptag.cover }?imageView2/1/w/255/h/80)">
		  	<div class="mask"></div>
		  	<div class="tag">
		  		# ${poptag.tag }
		  	</div>
		  </div>
	  </a>
  </c:forEach>
</div>					
  