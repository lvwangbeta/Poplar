$(document).ready(function(){

	$('#like').click(function() {
		var isLogin = $('meta[name=isLogin]').attr('content');
		if(isLogin == 'false'){
			$('.ui.small.modal.login-tip').modal('show');
			return false;
		}
		
		var object_type = $('meta[name=type]').attr('content');
		var object_id = $('meta[name=id]').attr('content');
		var author = $('meta[name=author]').attr('content');
		var url = basePath+"/like";

		if(object_type == 'post') {
			object_type = 0;
		} else if(object_type == 'photo') {
			object_type = 1;
		} else if(object_type == 'album') {
			object_type = 2;
		} else {
			return;
		}		

		if($(this).hasClass('empty')){
			url += '/do';
			$(this).removeClass().addClass('red heart icon');
		}
		else {
			url += '/undo';
			$(this).removeClass().addClass('empty red heart icon');
		}
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data:{
				author:author,
				object_type: object_type,
				object_id: object_id
			}
		})
		.success(function(data){
			
		})	
	});
	
	
	$('.trash').live('click', function(){
		$('.trash-tip')
		  .modal({
		    closable  : true,
		    onDeny    : function(){
		      return true;
		    },
		    onApprove : function() {
				var id = $('meta[name=id]').attr('content');
				$.ajax({
					url: basePath + '/post/delete/'+id,
					type: 'GET',
					dataType: 'json'
				})
				.success(function(data){
					if(data.status == SUCCESS_POST_DELETE) {
						self.location = basePath;
					}
				});
		    }
		  })
		  .modal('show');
		

	});
	
	
	
})