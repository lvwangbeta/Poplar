//获取光标位置
(function(jQuery){
	jQuery.fn.getCursorPosition = function(){
		if(this.lengh == 0) return -1;
		return $(this).getSelectionStart();
	}
	jQuery.fn.setCursorPosition = function(position){
		if(this.lengh == 0) return this;
		return $(this).setSelection(position, position);
	}
	jQuery.fn.getSelection = function(){
		if(this.lengh == 0) return -1;
		var s = $(this).getSelectionStart();
		var e = $(this).getSelectionEnd();
		return this[0].value.substring(s,e);
	}
	jQuery.fn.getSelectionStart = function(){
		if(this.lengh == 0) return -1;
		input = this[0];

		var pos = input.value.length;

		if (input.createTextRange) {
			var r = document.selection.createRange().duplicate();
			r.moveEnd('character', input.value.length);
			if (r.text == '') 
			pos = input.value.length;
			pos = input.value.lastIndexOf(r.text);
		} else if(typeof(input.selectionStart)!="undefined")
		pos = input.selectionStart;

		return pos;
	}
	jQuery.fn.getSelectionEnd = function(){
		if(this.lengh == 0) return -1;
		input = this[0];

		var pos = input.value.length;

		if (input.createTextRange) {
			var r = document.selection.createRange().duplicate();
			r.moveStart('character', -input.value.length);
			if (r.text == '') 
			pos = input.value.length;
			pos = input.value.lastIndexOf(r.text);
		} else if(typeof(input.selectionEnd)!="undefined")
		pos = input.selectionEnd;

		return pos;
	}
	jQuery.fn.setSelection = function(selectionStart, selectionEnd) {
			if(this.lengh == 0) return this;
			input = this[0];

			if (input.createTextRange) {
					var range = input.createTextRange();
					range.collapse(true);
					range.moveEnd('character', selectionEnd);
					range.moveStart('character', selectionStart);
					range.select();
			} else if (input.setSelectionRange) {
					input.focus();
					input.setSelectionRange(selectionStart, selectionEnd);
			}

			return this;
	}
	jQuery.fn.insertAtCousor = function(myValue){
		var $t=$(this)[0];
		if (document.selection) {
			this.focus();
			sel = document.selection.createRange();
			sel.text = myValue;
			this.focus();
		}else if($t.selectionStart || $t.selectionStart == '0'){
			var startPos = $t.selectionStart;
			var endPos = $t.selectionEnd;
			var scrollTop = $t.scrollTop;
			$t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
			this.focus();
			$t.selectionStart = startPos + myValue.length;
			$t.selectionEnd = startPos + myValue.length;
			$t.scrollTop = scrollTop;
		}else{
			this.value += myValue;
			this.focus();
		}
	}
})(jQuery);

$(document).ready(function(){
	$('#spost_send').live('click',function() {
		var content = emojione.shortnameToImage(escape($('#spost_content').val()));
		//alert(content);
		//return false;
		$.ajax({
			url: basePath + '/spost/create',
			type: 'POST',
			dataType: 'json',
			data: {
			       content: content
			   }
		})
		.success(function(data) {
			var status = data.status;
			var author = data.spost.post_author;
			if(SUCCESS_POST_CREATE == status) {
				var short_post=$('.empty.event:first').clone();
				$(short_post).removeClass('empty');
				$(short_post).find('img:first').attr('src', img_base_url + data.avatar);
				$(short_post).find('.summary > a').attr('href', basePath+'/user/'+data.spost.post_author);
				$(short_post).find('.summary > a').text(data.author_name);
				$(short_post).find('.extra').html(data.spost.post_content);
				$(short_post).find('.like > i').attr('object_id', data.spost.id);

				$(short_post).css('display', 'block');
				$('.feed:first').prepend($(short_post));
				$('#spost_content').val('');
				$('#emoji-list-container').fadeToggle('fast');
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});


	$(".actions .sport_link").click(function(){
		$(this).parent('.actions:first').css('display', 'none');
		$('.short_post').css('display', 'block');
	});
	
	$('#sport_cancel').click(function(){
		$('.short_post').css('display', 'none');
		$('#action_bar .actions:first').css('display', 'block');
	});
	
	
	//添加表情
	$('.smile.icon').click(function(){
		$('#emoji-list-container').fadeToggle('fast');
	});

	
	$('img.emojione').click(function(){
		var shortname = $(this).attr('data-shortname');
		$('#spost_content').insertAtCousor(shortname);
	});
	
	
})