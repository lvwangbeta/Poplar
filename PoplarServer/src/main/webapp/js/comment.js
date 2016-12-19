$(document).ready(function(){

	var commentType = 0;	//0 single comment for post; 1 comment to reply others
	var commentParent = 0;

	$("a.reply").live('click', function(){
		var isLogin = $('meta[name=isLogin]').attr('content');
		if(isLogin == 'false'){
			$('.ui.small.modal').modal('show');
			return false;
		}

		
		commentType = 1;
		var ref = $(this).attr('ref');		
		var commentRef = $('#comment'+ref);
			replyTo = $(commentRef).find('.author:first').text();
		var avatarRef = $(commentRef).find('a.avatar img:first').attr('src');
		var commentContentRef = $(commentRef).find('.commentContent p:first()').text();
		commentParent = $(commentRef).attr('id').substring(7);

		var header = $('<div id="header"><img  class="ui avatar image" src="'+avatarRef+'"><span>'+commentContentRef+'</span></div>');
		$('#replyarea').prepend($(header));
		$('#replycontent').focus();

	});



	$('#replybtn').live('click', function() {
		var isLogin = $('meta[name=isLogin]').attr('content');
		if(isLogin == 'false'){
			$('.ui.small.modal.login-tip').modal('show');
			return false;
		}
		
		var header;		

		if(commentType == 0) {
			header = '<a class="author">me</a>';
		}
		else if(commentType == 1) {
			//var replyTo = $(this).attr('replyTo');
			header = '<a class="author">我</a> 回复 ' + '<a class="author">'+replyTo+'</a>';
		}			
		var commentContent = escape($('#replycontent').val());
		if(commentContent == null || commentContent.length == 0) {
			return;
		}
		var commentObjectType = $('meta[name=type]').attr('content');
		if(commentObjectType == 'post') {
			commentObjectType = 0;
		} else if(commentObjectType == 'photo') {
			commentObjectType = 1;
		} else if(commentObjectType == 'album') {
			commentObjectType = 2;
		} else {
			return;
		}

		var commentObjectID = $('meta[name=id]').attr('content');

		$.ajax({
			url: basePath + '/comment/create',
			type: 'POST',
			dataType: 'json',
			data: {comment_object_type: commentObjectType,
				   comment_object_id: commentObjectID,
				   comment_content: commentContent,
				   comment_parent: commentParent}
		})
		.success(function(data) {
			var status = data.status;
			var comment = $('<div class="comment" id="4">'+
							    '<a class="avatar">'+
							      '<img src="'+img_base_url+data.avatar+'?imageView2/1/w/48/h/48">'+
							    '</a>'+
							    '<div class="content">'+
							      header+
							      '<div class="metadata">'+
							        '<span class="date">刚刚</span>'+
							      '</div>'+
							      '<div class="text commentContent">'+
							        '<p>'+commentContent+'</p>'+
							      '</div>'+
							    '</div>'+
							  '</div>');
			$('#commentList').prepend(comment);
			$('#header').remove();
			$('#replycontent').val('');
			$('#replycontent').focus();
			commentType = 0;
			commentParent = 0;
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
		

	});



});