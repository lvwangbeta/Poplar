<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
 
					<div class='popup usercard'>
						<div class='row'>
							<div class='span1'>
								<div class='ui tiny centered circular image'>
									<img src='${img_base_url }${u.user_avatar}' alt='${u.user_name }' />
								</div>
								
							</div>
							<div class='span2'>
								<div class='content'>
      								<div class='ui sub header'>${u.user_name }</div>
      								${u.user_desc }
    							</div>
							</div>
						</div>
						<div class='row'>
							<div class='span1'>
								<button class='ui tiny inverted yellow button follow'>关注</button>
							</div>
							<div class='span2'>
								<div class='ui mini statistics'>
								  <div class='statistic'>
								    <div class='value'>
								      ${counter.follower }
								    </div>
								    <div class='label'>粉丝
								    </div>
								  </div>
								  <div class='statistic'>
								    <div class='value'>
								       ${counter.following }
								    </div>
								    <div class='label'>关注
								    </div>
								  </div>
								  <div class='statistic'>
								    <div class='value'>
								      ${counter.spost }
								    </div>
								    <div class='label'>状态
								    </div>
								  </div>
								</div>	<!-- end statistics --> 
							</div>
						</div>
					</div>