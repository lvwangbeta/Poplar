$(document).ready(function(){

	
    // Create variables (in this scope) to hold the API and image size
    var jcrop_api,
        boundx,
        boundy,

        // Grab some information about the preview pane
        $preview = $('#preview-pane'),
        $pcnt = $('#preview-pane .preview-container'),
        $pimg = $('#preview-pane .preview-container img'),

        xsize = $pcnt.width(),
        ysize = $pcnt.height();
		x=0;
		y=0;
		width=0;
		height=0;

    $('#target').Jcrop({
      onChange: updatePreview,
      onSelect: updatePreview,
      aspectRatio: 1,
      allowMove: true,
      boxWidth: 500
    },function(){
      // Use the API to get the real image size
      var bounds = this.getBounds();
      boundx = bounds[0];
      boundy = bounds[1];
      // Store the API in the jcrop_api variable
      jcrop_api = this;
      // Move the preview into the jcrop container for css positioning
      $preview.appendTo(jcrop_api.ui.holder);
    });

    function updatePreview(c)
    {
      var bounds = jcrop_api.getBounds();
      boundx = bounds[0];
      boundy = bounds[1];
        
      if (parseInt(c.w) > 0)
      {
        var rx = xsize / c.w;
        var ry = ysize / c.h;
		
        x = Math.round(rx * c.x);
        y = Math.round(ry * c.y);
        width = c.w;
        height = c.h;
        
        
        $pimg.css({
          width: Math.round(rx * boundx) + 'px',
          height: Math.round(ry * boundy) + 'px',
          marginLeft: '-' + x + 'px',
          marginTop: '-' + y + 'px'
        });
      }
    };		

    
    
    $('#avatar_file').live('change', function(event) {
 	   $.ajaxFileUpload({
 	                		url: basePath+'/album/upload/avatar', 
 	                		secureuri:false,
 	                		fileElementId:'avatar_file',
 	                		success: function (data, status){
 	                				data = jQuery(data).find('pre:first').text();
 	                				data = jQuery.parseJSON(data);
 	                				
 	                				jcrop_api.setImage(data.link);
 	                				$('#target_img_cnt img').attr('src', data.link);
 	                				$('#preview-pane img').attr('src', data.link);
 	                				$('.crop_avatar_area').show();
 	                		},
 	                		error: function (data, status, e){
 	                    			alert(e);
 	                		}
 	            		}
 	        		);
 	});    
    
    $('#avatar_save').live('click', function(){
        //console.log('x:'+x+' y:'+y +' width:'+width+' height:'+height);
        var current_url = window.location.href;
        $.ajax({
          url: basePath + '/album/cropavatar',
          type: 'POST',
          dataType: 'json',
          data:{
            x:x,
            y:y,
            width: Math.round(width),
            height: Math.round(height)
          }
        })
        .success(function(data){
          if(data.status == SUCCESS_AVATAR_CHANGE){
            self.location=current_url;
          }
        })      	
    	
    });
    
    $('#avatar_cancle').live('click', function(){
    	$('.crop_avatar_area').hide();
    });
        

  });