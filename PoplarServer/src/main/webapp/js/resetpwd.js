$(document).ready(function(){
	$('#password, #cfm_pwd').focus(function(){
		$(this).next().hide();
		$(this).parent().removeClass('error');
	});
	
	$('#reset_btn').live('click', function(){
		var password = $('#password').val();
		var cfm_pwd = $('#cfm_pwd').val();
		var reset_btn = $(this);
		var password_tip = $('#password_tip');
		var cfm_pwd_tip = $('#cfm_pwd_tip');
		
		if(password == null || password.length == 0){
			$(password_tip).parent().addClass('error');
			$(password_tip).text('请输入密码').show();
			return false;
		}
		if(cfm_pwd == null || cfm_pwd.length == 0){
			$(cfm_pwd_tip).parent().addClass('error');
			$(cfm_pwd_tip).text('请确认密码').show();
			return false;
		}
		if(password != cfm_pwd){
			$(password_tip).parent().addClass('error');
			$(cfm_pwd_tip).parent().addClass('error');
			$(cfm_pwd_tip).text('密码不一致').show();
			return false;
		}
		
		
		$(password_tip).parent().addClass('disabled');
		$(cfm_pwd_tip).parent().addClass('disabled');
		$(this).addClass("loading");
		
		$.ajax({
			url:basePath+"/account/resetpwd",
			type: 'POST',
	        dataType: 'json',
	        data:{
	        	password:password,
	        	cfm_pwd:cfm_pwd
	        }
		})
		.success(function(data){
			if(data.status == SUCCESS_PWD_RESET){
				$(reset_btn).removeClass('loading').text('密码已重置');
				setTimeout(function(){
					self.location=basePath;
				},1500);
				
			} else {
				if(data.status == ERROR_PWD_EMPTY){
					$(password_tip).parent().addClass('error');
					$(password_tip).text('请输入密码').show();
				} else if(data.status == ERROR_CFMPWD_EMPTY){
					$(cfm_pwd_tip).parent().addClass('error');
					$(cfm_pwd_tip).text('请确认密码').show();
				} else if(data.status == ERROR_CFMPWD_NOTAGREE){
					$(password_tip).parent().addClass('error');
					$(cfm_pwd_tip).parent().addClass('error');
					$(cfm_pwd_tip).text('密码不一致').show();
				} 
				
				$(password_tip).parent().removeClass('disabled');
				$(cfm_pwd_tip).parent().removeClass('disabled');
				$(this).removeClass("loading").text('保存');
			}
		})
		
	});
})