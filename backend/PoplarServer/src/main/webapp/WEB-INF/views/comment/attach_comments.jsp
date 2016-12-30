<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.lvwang.osf.model.User" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


	 <!-- <div class="comments-attach"> -->
	 		<div class="ui divider"></div>
			<div class="ui middle aligned list">
			  <div class="item" style="margin-bottom: 20px;margin-top: 14px">
			    <div class="content">
					<div class="ui fluid mini action input">
					  <input type="text">
					  <div class="ui blue button reply">评论</div>
					  <div class="ui button cancle" style="margin-left: 10px">取消</div>
					</div>
			    </div>
			  </div>
			  
			  
			  <c:forEach items="${comments }" var="comment">
				  <div class="item">

				    <c:if test="${!empty sessionScope.user }">
				    	<c:if test="${comment.comment_author ne sessionScope.user.id }">
						    <div class="right floated content actions">
						      <a class="reply" comment_object_id="${comment.comment_object_id }" 
						      reply_to_author="${comment.comment_author }" 
						      reply_to_authorname="${comment.comment_author_name }" 
						      comment_object_type=${comment.comment_object_type  } 
						      comment_parent=${comment.id }>回复</a>
						    </div>
				    	</c:if>
				    </c:if>
				    <img class="ui avatar image" src="<c:url value="${img_base_url }${comment.comment_author_avatar }"/>">
					<div class="content">
					  	<c:if test="${comment.comment_parent == 0 }">
					    	<a class="author"  href="<c:url value="/user/${comment.comment_author }" />" >${comment.comment_author_name }</a>
					    </c:if>
					    <c:if test="${comment.comment_parent != 0 }">
					    	<a class="author" href="<c:url value="/user/${comment.comment_author }" />">${comment.comment_author_name }</a> 回复 <a class="author" href="<c:url value="/user/${comment.comment_parent_author }" />">${comment.comment_parent_author_name }</a>
					    </c:if>
					    ${comment.comment_content }
					 </div>
					 <!-- end content -->
				  </div>
	
				  <div class="ui divider"></div>	
			  </c:forEach>
			</div>   	
<!-- 	   </div> -->
	   <!-- end attach -->  
