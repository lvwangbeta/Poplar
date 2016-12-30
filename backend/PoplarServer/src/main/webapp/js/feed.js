  $(document).ready(function(){
	  
	var page_num = 1,
		no_more = false;  
	
//  	$('#feeds').infinitescroll({
//  		loading: {
//  		    finished: undefined,
//  		    finishedMsg: "没有更多的了",
//  		                img: null,
//  		    msg: null,
//  		    msgText: "正在加载...",
//  		    selector: null,
//  		    speed: 'fast',
//  		    start: undefined
//  		},
//		navSelector  	: "#next:last",
//		nextSelector 	: "a#next:last",
//		itemSelector 	: ".event",
//		dataType	 	: 'html',
//		animate      : true, 
//		extraScrollPx: 100
//  	});
  	$(window).scroll(function() {
  		
  		if(no_more) {
  			//$('.footer').css('display', 'block').html('没有更多了');
			return false;
		}
  		
  		if($(window).scrollTop() + $(window).height() == $(document).height()) {
  			page_num++;	//next page
  			var url = $('#next').attr('href').replace(new RegExp("page/\\d"), 'page/'+page_num);
  			$('#next').attr('href', url);
  			$.ajax({
  				//url: basePath + '/page/' + page_num,
  				url: url,
  				type: 'GET' ,
  				dataType: 'html'
  			})
  			.success(function(data){
  				if($.trim(data).length == 0){
  					no_more = true;
  					$('.footer').css('display', 'block').html('没有更多了');
  					return false;
  				} 
  				$('#feeds').append(data);
  			});
  		}
  	});
  	
  	
  	var comment_parent = '0';
  	
  	//发送评论
	$('.input .reply').live('click', function(){
		var event = $(this).parents('.event');
		var comment_object_type = $(event).attr('object_type');
		var comment_object_id = $(event).attr('object_id');
		var comment_content = escape($(this).prev().val());
		
		var that = this;
		//comment_parent = '0';
		$.ajax({
			url: basePath + '/comment/create',
			type: 'POST',
			dataType: 'json',
			data: {comment_object_type: comment_object_type,
				   comment_object_id: comment_object_id,
				   comment_content: comment_content,
				   comment_parent:comment_parent==null?0:comment_parent
				   }
		})
		.success(function(data){
			var comment = $('<div class="item">'+
								'<img class="ui avatar image" src="">'+
								'<div class="content">'+
									'<a class="author replyer" href=""></a>'+
								'</div>'+
							'</div>'+
							'<div class="ui divider"></div>');
			$(comment).find('img').attr('src', img_base_url + data.avatar);
			$(comment).find('a.replyer').attr('href', basePath + '/user/' + data.author_id).text(data.author_name);
			if(comment_parent != '0'){
				var reply_to_html = $('<a class="author replyto" href=""></a>');
				$(reply_to_html).attr('href', basePath + '/user/' + data.reply_to_author).text(data.reply_to_authorname);
				$(comment).find('.content').append('回复').append($(reply_to_html));
			}
			
			$(comment).find('.content').append(comment_content);
			
			$(that).parents('.item').after($(comment));
			$(that).parents('.item').find('.labeled').removeClass('labeled').find('.label').remove();
			$(that).prev().val('');
			comment_parent = '0';
		});
	});  	
  	
	//取消评论
	$('.input .cancle').live('click', function(){		
		var comment_area = $(this).parents('.input');
		$(comment_area).removeClass('labeled').find('.label').remove();
		$(comment_area).find(':input').val(''); 
		comment_parent = '0';
		
	});
	
	//回复评论
  	$('.actions .reply').live('click', function(){
  		
  		var comment_area = $(this).parents('.list').find('.input');
  		$(comment_area).removeClass('labeled').find('.label').remove();
  		$(comment_area).find(':input').val('').focus();
  		
  		var reply_to_html = $('<div class="ui label"></div>');
  		var reply_to_author = $(this).attr('reply_to_author');
  		var reply_to_authorname = $(this).attr('reply_to_authorname');
  		var comment_object_type = $(this).attr('comment_object_type');
  		var comment_object_id = $(this).attr('comment_object_id');
		comment_parent = $(this).attr('comment_parent');
		
  		$(comment_area).addClass('labeled').prepend($(reply_to_html).append('回复:'+reply_to_authorname));
  		
//  		$('.input :input').live('blur', function(){
//  			$(comment_area).removeClass('labeled').find('.label').remove();
//  	  		$(this).val(''); 			
//  		});
  	});

  	//获取feed
  	$('.comment.outline.icon').live('click', function(){
  		
  		var comments_attach = $(this).parents('.content').find('.comments-attach');
  		if($(comments_attach).text() != null && $(comments_attach).text() != ''){
  			$(comments_attach).slideToggle();
  			return false;
  		}
  		
  		var object_type = $(this).parents('.event').attr('type');
  		var object_id = $(this).parents('.event').attr('object_id');
  		var that = $(this);
  		
		$.ajax({
			url: basePath + '/comment/attach/'+object_type+'/'+object_id,
			type: 'GET'
		})
		.success(function(data){	
			$(comments_attach).text('');
			$(data).appendTo($(comments_attach));
			$(comments_attach).slideToggle();
		});
  		
  		
  	});
  	
  })