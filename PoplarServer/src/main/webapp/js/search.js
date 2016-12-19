$(document).ready(function(){
	$('#search-btn, #search-bar-btn').click(function(){
		if($.trim($(this).prev().val()).length==0) return false;
		self.location=basePath+"/search/feed?term="+$.trim($(this).prev().val());
	});

});