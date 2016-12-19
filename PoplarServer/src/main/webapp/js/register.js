$(document).ready(function(){
	$('#registerBtn').live('click', function() {
		var that = this;
		$(this).addClass('loading');
		//clear tips
		$('div.error').removeClass('error');
		$('span.tip').text('');

		var username = $.trim($('#username').val());
		var email = $.trim($('#email').val());
		var password = $('#password').val();
		var cfmPwd = $('#cfmPwd').val();

		$.ajax({
			url: basePath+'/account/register',
			type: 'POST',
			dataType: 'json',
			data: { username:username,
					email: email,
				   password: password,
				   cfmPwd: cfmPwd},
		})
		.success(function(data) {
			$(that).removeClass('loading');
			if(data.status == '104000') {
				self.location = basePath + '/account/activation/mail/send?email='+email;
			} else { //error
				var status = data.status;
				switch(status.charAt(2)) {
					case '0':  //username error
						if(status == '000003') { //user name exist
							username = '';
							$('#usernameTip').text('用户名已存在');
						} else if(status == '000004') { //user name empty
							$('#usernameTip').text('请输入用户名');
						}
						$('#username').parent('div.field:first').addClass('error');
						break;

					case '1':  //email error
						if(status == '001000') {
							$('#emailTip').text('邮箱已注册 <a href="#">登录</a>');
						} else if(status == '001001') {
							$('#emailTip').text('请输入邮箱地址');
						} else if(status == '001002') {
							$('#emailTip').text('请输入正确的邮箱地址');
						} 
						$('#email').parent('div.field:first').addClass('error');
						break;

					case '2':  //password error
						if(status == '002000') {  //password empty
							$('#passwordTip').text('请输入密码');
						}
						$('#password').parent('div.field:first').addClass('error');
						break;

					case '3':  //confirm password error
						if(status == '003000') {  
							$('#cfmPwdTip').text('请再次输入密码');
							$('#cfmPwdTip').parent('div.field:first').addClass('error');
						} else if(status == '003001') {
							$('#passwordTip').text('密码输入不一致');
							$('#password').parent('div.field:first').addClass('error');
							$('#cfmPwd').parent('div.field:first').addClass('error');
						}
						break;
					case '4':
						if(status == '004003') {
							var activationUrl = basePath + '/account/activation/mail/send?email='+email;
							$('#emailTip').html('<a href="'+activationUrl+'">已注册,请激活</a>');
						}
						$('#email').parent('div.field:first').addClass('error');
						break;
					default:
						break;
				}
			} 

		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});




})