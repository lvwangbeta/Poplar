<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>写日志</title>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/bootstrap2.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/navbar.css">
 	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/semantic.css">
 	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/font-awesome.min.css">
  	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/froala_editor.min.css">
  	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/froala_style.min.css">
  	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/style.css">


</head>
<body>
	<%@ include file="../topbar.jsp" %>
	<div class="container">
		<div class="row">
			<div class="span8">
				<div class="ui form">
				  <div class="field">
				    <label>标题</label>
				    <input type="text" id="title">
				  </div>
				  <div class="field">
				    <label>正文</label>
				    <textarea id="content"></textarea>
				    
				    <!--   <textarea id="content" class="post"></textarea> -->
				  </div>	

					<div class="field">
					  	<label>标签:</label>
					  	<div class="tags">
					  		<input type="text" class="tag-input" id="tag-input" placeholder="空格添加标签">
						    <div class="tagfield">   
						    </div>
					  		
					  	</div>
					</div>
				  			  
<!-- 				  <div class="inline field">
				    <label>隐私:</label>
					<input type="radio" name="post_status" value="0" checked="checked"> 公开
					<input type="radio" name="post_status" value="1"> 仅自己可见
				  </div>
				  <div class="inline field">
				  	<label>评论:</label>
					<input type="radio" name="comment_status" value="0" checked="checked"> 允许评论
					<input type="radio" name="comment_status" value="1"> 不允许评论				  	
				  </div> -->
				  <div class="ui button green" id="send">发表</div>
				  <div class="ui button" id="cancel">取消</div>
				</div>				
				
			</div>
		</div>
	</div>
	<div class="ui basic small modal cancel-tip">
	    <div class="content">
	      <p>确定取消编辑吗?</p>
	    </div>
	    <div class="actions">
	      <div class="ui red basic cancel inverted button">
	        <i class="remove icon"></i>
	        否,留在本页
	      </div>
	      <div class="ui green ok inverted button">
	        <i class="checkmark icon"></i>
	        是
	      </div>
	    </div>
	</div>
	
  	<script type="text/javascript" src="<%=request.getContextPath() %>/js/jquery-1.11.1.min.js"></script> 
  	<script type="text/javascript" src="<%=request.getContextPath() %>/js/froala_editor.min.js"></script>
  	<script type="text/javascript" src="<%=request.getContextPath() %>/js/semantic.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath() %>/js/basic.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath() %>/js/code.js"></script>
  	<script type="text/javascript" src="<%=request.getContextPath() %>/js/tag.js"></script>
  	<%-- <script type="text/javascript" src="<%=request.getContextPath() %>/js/post.js"></script> --%>
  	<script>
      $(function() {
          $('#content').editable({
        	  inlineMode: false,
        	  imageUploadURL: '<%=request.getContextPath() %>/album/upload/postphoto',
        	  imageUploadParam: "uploader_input"
          });

      	$('#send').click(function() {	
      		var that = this;
      		$(this).addClass('loading');
    		var title = escape($('#title').val());
    		var content = $('#content').val();

    		var post_status = 0 // $('input[name="post_status"][checked]').val();
    		var comment_status = 0 // $('input[name="comment_status"][checked]').val();
    		$.ajax({
    			url: basePath + '/post/create',
    			type: 'POST',
    			dataType: 'json',
    			data: {
    			       content: content,
    			       title: title,
    			       tags: tags.join(' '),
    			       post_status: post_status,
    			       comment_status: comment_status}
    		})
    		.success(function(data) {
    			$(that).removeClass('loading');
    			var status = data.status;
    			var author = data.post.post_author;
    			if(SUCCESS_POST_CREATE == status) {
    				self.location = basePath;
    			}
    		})
    		.fail(function() {
    			console.log("error");
    		})
    		.always(function() {
    			console.log("complete");
    		});
    		
    	});
          
        
      	$('#cancel').click(function(){
    		$('.cancel-tip')
	  		  .modal({
	  		    closable  : true,
	  		    onDeny    : function(){
	  		      return true;
	  		    },
	  		    onApprove : function() {
	  				self.location = basePath;
	  		    }
	  		  })
	  		  .modal('show');      		
      	});
      	
      	
      });
    </script>	  	
</body>
</html>