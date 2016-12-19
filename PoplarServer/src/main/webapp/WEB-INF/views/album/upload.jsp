<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>相册</title>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/bootstrap2.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/navbar.css">
 	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/semantic.css">
  	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/style.css">

	<script type="text/javascript" src="<%=request.getContextPath() %>/js/jquery.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/ajaxfileupload.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/basic.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/code.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/tag.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/album.js"></script>	
	
	<style>
	.uploader-button input {
		width: 70px;
		height:20px;
		opacity: 0;
		
	}
	.uploader-button.ui.button{
		background: url("<c:url value="/img/uploader_button.png"/>") no-repeat;
	}
	#uploadedphotos textarea {
		border: 0;
		resize: none;
		width: 100%;
	}
	</style>
</head>
<body>
	<%@ include file="../topbar.jsp" %>
	<div class="container">
		<div class="row">
			<div class="span8">
				<div class="ui three cards" id="uploadedphotos">
				  <c:forEach items="${photos }" var="photo">
					  <div class="card" id="card${photo.id }">
					    <a class="image" href="#">
					      <img src="<c:url value="${img_base_url }${photo.key }?imageView2/1/w/200/h/200" />">
					    </a>
					    <div class="content">
					    	<textarea rows="" cols="" placeholder="添加描述..."></textarea>
					    </div>
					    <div class="extra meta">
							<a href="#"><i class="delete icon"></i>删除</a>
					    </div>
					  </div>
				  </c:forEach>
				
				</div>	<!-- end cards -->		<!-- end uploadedphotos -->		
				<div id="uploadarea">
					<span class="uploader-button ui button">
						<input type="file" id="uploader_input" name="uploader_input"/>
					</span>
					<span>
						选择照片上传,支持jpeg,png,5M
					</span>										
				</div> <!-- end uploadarea -->
				
				
			</div>	<!-- end span8 -->
			
			<div class="span4">
					<div class="ui form">
						<div class="field">
						  	<label>标签:</label>
						  	<div class="tags">
						  		<input type="text" class="tag-input" id="tag-input" placeholder="空格添加标签">
						  		<div class="tagfield">   
							    </div>
						  	</div>
						</div>
					
						<div class="field">
							<label>描述:</label>
							<textarea rows="" cols="" id="album_desc"></textarea>
						</div>
						
					</div>
					<div class="ui tiny blue button disabled" id="saveAlbumBtn">
						保存
					</div>
					

			</div> <!-- end span4 -->
		</div>
	</div>

</body>
</html>