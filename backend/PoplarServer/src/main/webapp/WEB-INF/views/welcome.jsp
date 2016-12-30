<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Cache-Control" content="no-cache">
	<meta http-equiv="Expires" content="0">
	<title>Welcome to OSF</title>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/bootstrap2.css">
  	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/navbar.css">
  	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/semantic.css">
  	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/jquery.fullPage.css">
  	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/welcome.css">
	<style>
	.section1 { background: url("<%=request.getContextPath() %>/img/background.png") no-repeat; background-size: cover;}
	.section4 { background: url("<%=request.getContextPath() %>/img/gallery/8.jpg") no-repeat;
				background-size: cover;}
	</style>
  	<script src="<%=request.getContextPath() %>/js/jquery.js"></script>
  	<script src="<%=request.getContextPath() %>/js/jquery.fullPage.js"></script>
  	<script src="http://cdn.staticfile.org/jquery-easing/1.3/jquery.easing.min.js"></script>
    <script src="<%=request.getContextPath() %>/js/semantic.js"></script>
    <script src="<%=request.getContextPath() %>/js/basic.js"></script>
    <script src="<%=request.getContextPath() %>/js/code.js"></script>
    <script src="<%=request.getContextPath() %>/js/login.js"></script>
</head>
<body>
	<div class="nav">
		<div class="navbar">
			<div class="logo">
				<img src="<%=request.getContextPath() %>/img/logo.png" alt="" />
				<span><a href="<c:url value="/explore" />">探索</a></span>
			</div>
			<a href="https://github.com/lvwangbeta/osf"><i class="github icon"></i></a>
		</div>
	</div>
	<div id="welcome">

		<div class="section section1">
			<div class="container">
				<div class="row">
					<div class="span12">
						<div class="row">
							<div class="span6 overview">
								<p class="initials">OSF</p>
								<p class="en_initials">Open Share Freedom</p>
								<p class="zh_initials">开放 分享 自由</p>
							</div>
							<div class="span6">
								<div class="login ui form">
									<div class="login_header">
										欢迎登录
									</div>
									<div id="error" class="ui red inverted segment hidden">
								  		
								  	</div>
									<div class="field">
										<input id="email" type="text" name="email" placeholder="电子邮箱">
									</div>
									<div class="field">
										<input id="password" type="password" name="password" placeholder="密码">
									</div>
									<div class="field">
										<button class="login_btn" id="loginbtn">登录</button>
										<button class="register_btn" id="registerbtn">注册</button>
										<!-- <span class="forget_pwd"><a href="#">忘记密码?</a></span> -->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="pulldown_tip">
				<img src="<%=request.getContextPath() %>/img/pulldown_tip.png" alt="向下滑动">
			</div>
		</div>
		<div class="section section2">
			<div class="container">
				<div class="row">
					<div class="span12 center">
						<div class="header">
							OSF是什么
						</div>	
					
					</div>
				</div>
				<div class="row">
					<div class="span12 center">
						<div class="content">
							<p>你可以用它打造一个SNS网站</p>
							<p>也可以从Tag出发构建一个垂直兴趣社区</p>
							<p>甚至是两者的混合，但绝不仅此</p>
						</div>
					</div>
				</div>
			</div>
			<div class="container tags">
				<c:forEach items="${tags }" var="tag" begin="0" end="9">
					<div class="tagbox">
						<a href="<c:url value="/tag/${tag.id }" />">
							<img class="visible" src="<c:url value="${img_base_url }${tag.cover }?imageView2/1/w/200/h/200" />" alt="" />
							<span class="desc">#${tag.tag }</span>
						</a>
					</div>								
				</c:forEach>

			</div>
			<!-- end tags -->	
		</div>
		<div class="section section3">
			<div class="container">
				<div class="row">
					<div class="span12 center">
						<div class="header">
							在OSF 你可以
						</div>	
					
					</div>
				</div>
			</div>	
			<div class="features row1">
				<div class="feature">
					<div class="circle">
						<i class="blue big font icon"></i>
					</div>
					<div class="header">说说</div>
					<div class="desc">发送简短的消息<br/>分享你此时的状态</div>
				</div>
				<div class="feature">
					<div class="circle">
						<i class="pink big photo icon"></i>
					</div>
					<div class="header">相册</div>
					<div class="desc">上传图片<br/>记录美好时刻</div>
				</div>
				<div class="feature">
					<div class="circle">
						<i class="big write icon"></i>
					</div>
					<div class="header">日志</div>
					<div class="desc">记录生活点滴</div>
				</div>
			</div>	
			<div class="features row1">
				<div class="feature">
					<div class="circle">
						<i class="big orange tag icon"></i>
					</div>
					<div class="header">标签</div>
					<div class="desc">兴趣<br/>从标签出发</div>
				</div>
				<div class="feature">
					<div class="circle">
						<i class="big users icon"></i>
					</div>
					<div class="header">朋友</div>
					<div class="desc">关注喜欢的朋友<br/>不错过他的动态</div>
				</div>
				<div class="feature">
					<div class="circle">
						<i class="big red heart icon"></i>
					</div>
					<div class="header">喜欢</div>
					<div class="desc">相册、日志<br/>喜欢就收藏起来吧</div>
				</div>
			</div>
						
		</div>
		<!-- end section3 -->
		<div class="section section4">
			<div class="container">
				<div class="row">
					<div class="span12 center">
						<div class="header">
							探索, OSF
						</div>					
					</div>
				</div>			
				<div class="row">
					<div class="span6 offset3">
						<div class="row">
							<a class="login_btn span3" href="<c:url value="/account/login" />">登录</a>
							<a class="register_btn span3" href="<c:url value="/account/register" />">注册</a>						
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
	$(document).ready(function(){
		
		$('#welcome').fullpage({
			sectionsColor: ['#FFFFFF', '#FFFFFF', '#F7F8FA', '#FFFFFF'],
			'navigation': true,
			afterLoad: function(anchorLink, index){
				if(index == 2){
					$('.section2').find('p').fadeIn(2000);
				}
				if(index == 3){
					$('.section3').find('.features').delay(50).animate({
						bottom: '0'
					}, 1000, 'easeOutExpo');
				
				}
				if(index == 4){
					
				}

			}
		});
			
	});
	</script>

</body>
</html>