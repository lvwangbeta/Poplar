<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OSF</title>
  <link rel="shortcut icon" href="<%=request.getContextPath() %>/img/favicon.ico" />
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/bootstrap2.css">
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/navbar.css">
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/semantic.css">
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/style.css">

  <script src="<%=request.getContextPath() %>/js/jquery.js"></script>
  <script src="<%=request.getContextPath() %>/js/jquery.infinitescroll.js"></script>
  <script src="<%=request.getContextPath() %>/js/semantic.js"></script>
  <script src="<%=request.getContextPath() %>/js/basic.js"></script>
  <script src="<%=request.getContextPath() %>/js/code.js"></script>
  <script src="<%=request.getContextPath() %>/js/like.js"></script>
  <script src="<%=request.getContextPath() %>/js/spost.js"></script>
  <script src="<%=request.getContextPath() %>/js/search.js"></script>
  <script src="<%=request.getContextPath() %>/js/emojione.js"></script>
</head>
<body>
  <%@ include file="topbar.jsp" %>
  <div class="container">
    <div class="row">  
          <div class="span8">  
	          	<div class="header_box">
	          		<div class="ui avatar image">
	                	<img src="${img_base_url }${user.user_avatar}">
	                </div>                
					<div id="action_bar">
						<div class="ui labeled icon menu actions" >
						  <a class="item sport_link" href="#">
						    <i class="blue big font icon"></i>
						    发状态
						  </a>
						  <a class="item album_link" href="<c:url value="/album/upload"/>">
						    <i class="pink big photo icon"></i>
						    传图片
						  </a>
						  <a class="item post_link" href="<c:url value="/post/create"/>">
						    <i class="big write icon"></i>
						    写日志
						  </a>
						  <a class="item link">
						    <i class="green big linkify icon"></i>
						    链接
						  </a>							
						</div>

					  <div class="short_post">
					  	<textarea placeholder="说点什么..." id="spost_content"></textarea>
					  	<div class="bar">
					  		<div id="img_upload_btn">
					  			<i class="smile icon"></i>
					  		</div>
					  		<div class="ui tiny blue button" id="spost_send">
					  			发表
					  		</div>
					  		<div class="ui tiny basic button" id="sport_cancel">
					  			取消
					  		</div>
					  	</div>
						<div id="emoji-list-container">
							<div class="emoji-list">
								<span>
									<img class="emojione"  data-shortname=":grinning:" src="<c:url value="/img/emoji/1F600.png" />">
								</span>
								<span>
									<img class="emojione"  data-shortname=":grin:" src="<c:url value="/img/emoji/1F601.png" />">
								</span>
								<span>
									<img class="emojione"  data-shortname=":joy:" src="<c:url value="/img/emoji/1F602.png" />">
								</span>
								<span>
									<img class="emojione"  data-shortname=":smiley:" src="<c:url value="/img/emoji/1F603.png" />">
								</span>
								<span>
									<img class="emojione"  data-shortname=":smile:" src="<c:url value="/img/emoji/1F604.png" />">
								</span>
								<span>
									<img class="emojione"  data-shortname=":sweat_smile:" src="<c:url value="/img/emoji/1F605.png" />">
								</span>
								<span>
									<img class="emojione"  data-shortname=":laughing:" src="<c:url value="/img/emoji/1F606.png" />">
								</span>
								<span>
									<img class="emojione"  data-shortname=":innocent:" src="<c:url value="/img/emoji/1F607.png" />">
								</span>
								<span>
									<img class="emojione"  data-shortname=":smiling_imp:" src="<c:url value="/img/emoji/1F608.png" />">
								</span>
								<span>
									<img class="emojione"  data-shortname=":imp:" src="<c:url value="/img/emoji/1F609.png" />">
								</span>
								<span>
									<img class="emojione"  data-shortname=":relieved:" src="<c:url value="/img/emoji/1F613.png" />">
								</span>
								<span>
									<img class="emojione"  data-shortname=":heart_eyes:" src="<c:url value="/img/emoji/1F614.png" />">
								</span>
								<span>
									<img class="emojione"  data-shortname=":sunglasses:" src="<c:url value="/img/emoji/1F615.png" />">
								</span>

							</div>
						</div>
					  </div>			  
					</div>
	               </div>	
	               <!-- end header_box -->         
                  <div class="ui feed" id="feeds">
                   <div class="event empty row">
                      <div class="label span2">
                        <img src="">
                      </div>
                      <div class="content span6">
                        <div class="summary">
                          <a href=""></a> 说
                          <div class="date">
                            刚刚
                          </div>
                        </div>
                        <div class="extra">
                        </div>
                        <div class="meta">							                     	
                          <div class="actions">
							  <a class="comment">
	                            <i class="comment outline icon"></i><span>0</span>
	                          </a>                           
	                          <a class="like">
	                          	<i class="heart icon" object_type="4" object_id=""></i><span>0</span>
	                          </a>                         
                          </div>

                        </div>                                               
                      </div>
                    </div> 
                    <!-- empty event , wait for full and show -->

                    <%@ include file="nextpage.jsp" %>                
                  </div>  <!--end feed -->
				  <div class="footer" style="left: 40%">
					 <i class="disabled big loading spinner icon"></i>
				  </div>   
                  <a id="next" href="<c:url value="/page/2" />"></a>
            </div>
          <div class="span4">
          	<div id="rightside">
          		<c:if test="${not empty sessionScope.user}">
	            <div class="ui card">
	              <div class="ui small centered circular  image">
	                <a href="<c:url value="/user/${user.id }" />"><img src="<c:url value="${img_base_url }${user.user_avatar }"/> "></a>
	              </div>
	              <div class="content">
	                <a class="header centered" href="<c:url value="/user/${user.id}" />">
	                	${user.user_name }
	                </a>
	                <div class="meta centered">
	                  <span class="date">不想成为画家的黑客不是好摄影师</span>
	                </div>	                
					<div class="ui mini statistics">
					  <div class="statistic">
					    <div class="value">
					      <a href="<c:url value="/followers" />">${counter.follower }</a>
					    </div>
					    <div class="label">粉丝
					    </div>
					  </div>
					  <div class="statistic">
					    <div class="value">
					      <a href="<c:url value="/followings"/>">${counter.following }</a>
					    </div>
					    <div class="label">关注
					    </div>
					  </div>
					  <div class="statistic">
					    <div class="value">
					      <a href="#">${counter.spost }</a>
					    </div>
					    <div class="label">状态
					    </div>
					  </div>
					</div>	<!-- end statistics --> 
					
					               
	              </div>
	            </div> 
	            </c:if>
				<jsp:include page="/sidebar"></jsp:include>					
										
            </div>           
          </div>
        </div>       
      </div>

    </div>

  </div>

  <script src="<%=request.getContextPath() %>/js/feed.js"></script>
</body>
</html>