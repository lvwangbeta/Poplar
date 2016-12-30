$(document).ready(function(){
	$('.follow').live('click', function(event) {
		var isLogin = $('meta[name=isLogin]').attr('content');
		if(isLogin == 'false'){
			$('.ui.small.modal.login-tip').modal('show');
			return false;
		}
		
		var following_user_id = $(this).attr('following');
		var url = '';
		var that = $(this);

		if(!$(this).hasClass('basic')) {
			url = basePath + '/follow/'+following_user_id;
		} else {
			url = basePath + '/follow/undo/'+following_user_id;
		}
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: {param1: 'value1'},
		})
		.done(function(data) {
			if(SUCCESS_FOLLOW == data.status) {
				$(that).text('已关注');
				$(that).removeClass('yellow');
				$(that).removeClass('inverted');
				$(that).addClass('basic');
			} else if(SUCCESS_FOLLOW_UNDO == data.status) {
				$(that).text('+关注');
				$(that).removeClass('basic');
				$(that).addClass('yellow');
				$(that).addClass('inverted');
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