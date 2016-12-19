<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>OSF密码重置</title>
	<style type="text/css">
	body{
		font-family: '微软雅黑','Helvetica Neue',sans-serif;
	}
	.container{
		max-width: 600px;
		margin: 0 auto;
	}
	.segment{
		background: #fff;
    	border: 1px solid #e9e9e9;
    	border-radius: 3px;
    	padding: 20px;
	}
	.header{
		margin: 10px 0 30px 0;
		font-weight: 400;
    	font-size: 20px;
	}
	.logo{
	    margin: 0 auto;
	    text-align: center;
	    margin-bottom: 28px;		
	}
	.logo img{
		width: 28px;
		height: auto;
	}
	</style>
</head>
<body>
	<div class="container">
		<div class="segment">
			<div class="logo">
				<img src="$img_base_url$logo_for_mail.png">
			</div>
			<div class="content">
				<div class="header">
					密码重置
				</div>
				<div>
					<p>点击如下链接，重置您的OSF账户密码:</p>
					<a href="$href$">$link$</a>
				</div>
				<p>
					如果链接无法点击，请复制到浏览器打开
				</p>
				
			</div>
		</div>

	</div>
</body>
</html>