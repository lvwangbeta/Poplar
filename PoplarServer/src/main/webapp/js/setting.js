$(document).ready(function(){
    $('.setting.info .field').live('click', function(){
    	$(this).removeClass('error');
    });
    
    $('#user_name').live('click', function(){
    	$('#user_name_tip').text('');
    });
    
    $('#info_cancle').live('click', function(){
    	$(this).hide();
    	$('#user_name').parent('.field:first').addClass('disabled');
    	$('#user_desc').parent('.field:first').addClass('disabled');
    	$('#info_save').removeClass('info_save blue').addClass('modify').text('修改');
    });
    
    $('#info_save').live('click', function(){
    	if($(this).hasClass('modify')) {
    		$('.setting.info .disabled.field').removeClass('disabled');
    		$(this).text('保存');
    		$(this).removeClass('modify').addClass('info_save blue');
    		$('#info_cancle').css('display', 'inline');
    		return false;
    	}
        var current_url = window.location.href;
        var user_name = $('#user_name').val();
        var user_desc = $('#user_desc').val();
//        if(user_name == null || user_name == '' || user_name.length == 0){
//        	$('#user_name').parent('.field:first').addClass('error');
//        	$('#user_name_tip').text('请输入用户名');
//        	return false;
//        }
        
        $.ajax({
          url: basePath + '/account/setting/info',
          type: 'POST',
          dataType: 'json',
          data:{
        	  user_name: user_name,
        	  user_desc:user_desc
          }
        })
        .success(function(data){
          if(data.status == ERROR_USERNAME_EXIST){
        	  $('#user_name').parent('.field:first').addClass('error');
        	  $('#user_name_tip').text('用户名已存在');
          } 
//          else if(data.status == ERROR_USERNAME_EMPTY ){
//          	  $('#user_name').parent('.field:first').addClass('error');
//        	  $('#user_name_tip').text('请输入用户名');
//          } 
          else {
        	  self.location = current_url;
          }
        })       	
    });
    
    $('#change_pwd').live('click', function(){
    	$(this).parent().hide();
    	$('.change_pwd_area').show();
    	$('.email_check_area').hide();
    	
    });
    $('#cancle_save_pwd').live('click', function(){
    	$('.change_pwd_area').hide();
    	$('.change_pwd_area').prev().show();
    });
    
    $('#forget_pwd').live('click', function(){
    	$('.email_check_area').show();
    });
    
    $('#send_check_email').live('click', function(){
    	$(this).addClass("loading");
    	$.get(basePath + '/account/send_resetpwd_email', function(data){
    		if(data.status == SUCCESS_EMAIL_RESETPWD_SEND){
    			$('#send_check_email').removeClass("loading").addClass("disabled").text("已发送");
    		}
    	})
    	
    });
    
    
    
    //change password 
	$('#new_pwd, #old_pwd').focus(function(){
		$(this).next().hide();
		$(this).parent().removeClass('error');
	});
	
	$('#save_pwd').live('click', function(){
		var old_pwd = $('#old_pwd').val();
		var new_pwd = $('#new_pwd').val();
		var save_pwd_btn = $(this);
		var new_pwd_tip = $('#new_pwd_tip');
		var old_pwd_tip = $('#old_pwd_tip');
		
		if(old_pwd == null || old_pwd.length == 0){
			$(old_pwd_tip).parent().addClass('error');
			$(old_pwd_tip).text('请输入旧密码').show();
			return false;
		}
		if(new_pwd == null || new_pwd.length == 0){
			$(new_pwd_tip).parent().addClass('error');
			$(new_pwd_tip).text('请确认新密码').show();
			return false;
		}
		if(new_pwd == old_pwd){
			$(new_pwd_tip).parent().addClass('error');
			$(new_pwd_tip).text('新密码不能与原密码一样').show();
			return false;
		}
			
		$(new_pwd_tip).parent().addClass('disabled');
		$(old_pwd_tip).parent().addClass('disabled');
		$(this).addClass("loading");
		
		$.ajax({
			url:basePath+"/account/changepwd",
			type: 'POST',
	        dataType: 'json',
	        data:{
	        	old_pwd:old_pwd,
	        	new_pwd:new_pwd
	        }
		})
		.success(function(data){
			if(data.status == SUCCESS_PWD_CHANGE){
				$(save_pwd_btn).removeClass('loading').text('密码已修改');
				setTimeout(function(){
					self.location=basePath;
				},1500);
				
			} else {		
				if(data.status == ERROR_PWD_NOTAGREE){
					$(old_pwd_tip).parent().addClass('error');
					$(old_pwd_tip).text('旧密码输入错误').show();
				}
				$(old_pwd_tip).parent().removeClass('disabled');
				$(new_pwd_tip).parent().removeClass('disabled');
				$(save_pwd_btn).removeClass("loading").text('保存');
			}
		})
		
	});
    
    
    
    
})