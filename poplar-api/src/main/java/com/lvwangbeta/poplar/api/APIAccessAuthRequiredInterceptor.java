package com.lvwangbeta.poplar.api;

import java.io.UnsupportedEncodingException;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lvwangbeta.poplar.api.service.AuthService;
import com.lvwangbeta.poplar.common.model.User;
import com.lvwangbeta.poplar.common.util.CipherUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component
public class APIAccessAuthRequiredInterceptor implements HandlerInterceptor {

	public static final Logger logger = LoggerFactory.getLogger(APIAccessAuthRequiredInterceptor.class);

	public static final String SECRET = "osf";
	
	public static final String URL_TIMELINE = "/**/feed/user/*/startfrom/*/limit/*";
	public static final String URL_TAG_PATTERN = "/**/tag/*/page/*";
	public static final String URL_COMMENT_PATTERN = "/**/comment/*/*";
	public static final String URL_RECOMMEND_PATTERN = "/**/tag/recommend";
	
	public static AntPathMatcher matcher = new AntPathMatcher();

	@Autowired
	private AuthService authService;
	
	public void afterCompletion(HttpServletRequest arg0,
			HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
			Object arg2, ModelAndView arg3) throws Exception {
		// TODO Auto-generated method stub
		
	}
	
	
	private boolean checkSign(HttpServletRequest req) {
		Enumeration<String> keys = req.getParameterNames();
		String params_str = "";
		String sign = "";
		
		while(keys.hasMoreElements()) {
			String key = keys.nextElement();
			String value = req.getParameter(key);
			
			logger.debug("[REQ][PARAM] "+key + ": "+value);
			
			if(!"sign".equals(key)) {
				try {
					params_str += (key+"="+java.net.URLDecoder.decode(value, "utf-8")+"&");
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
			} else {
				sign = value;
			}
			
		}
		params_str = req.getRequestURI() + "?" +params_str + SECRET;
		
		System.out.println("params:"+params_str);
		
		String sign2 = CipherUtil.sign(params_str);
		logger.debug("[REQ] Sign:" + sign);
		logger.debug("[CHK] Sign:" + sign2);
		if(!sign.equalsIgnoreCase(sign2)) {
			return false;
		}
		return true;
		
	}
	
	public User token2User(String token) {
		if(token == null || token.length() == 0) return null;
		return authService.getUserByToken(token);
		
	}

	public boolean preHandle(HttpServletRequest req, HttpServletResponse resp,
			Object arg2) throws Exception {
		if(authService == null) {
			BeanFactory factory = WebApplicationContextUtils.getRequiredWebApplicationContext(req.getServletContext());
			authService = (AuthService) factory.getBean("authService");
		}
		
		String uri = req.getRequestURI();
		logger.debug("[REQ] URI: " + uri);
		logger.debug("[REQ] URL: " + req.getRequestURL());
		logger.debug("[REQ] Query String:" + req.getQueryString());
		if(checkSign(req)){
			String token = req.getHeader("X-Auth-Token");
			logger.debug("[REQ] Token:" + token);
			if(token == null || token.length() == 0 || "null".equalsIgnoreCase(token)) {
				logger.debug("[REQ] NO Token");
				if(matcher.match(URL_TIMELINE, uri)) {
					logger.debug("[REQ] No token access with uri match: " + URL_TIMELINE );
					req.setAttribute("uid", 0);
					return true;
				} else if(matcher.match(URL_TAG_PATTERN, uri)) {
					logger.debug("[REQ] No token access with uri match: " + URL_TAG_PATTERN );
					req.setAttribute("uid", 0);
					return true;
				} else if(matcher.match(URL_COMMENT_PATTERN, uri)) {
					logger.debug("[REQ] No token access with uri match: " + URL_COMMENT_PATTERN);
					req.setAttribute("uid", 0);
					return true;
				} else if(matcher.match(URL_RECOMMEND_PATTERN, uri)) {
					logger.debug("[REQ] No token access with uri match: " + URL_RECOMMEND_PATTERN);
					req.setAttribute("uid", 0);
					return true;
				}
			}
			User user = token2User(token);
			if(user == null) {
				logger.debug("[REQ] Token not found:" + token);
				return false;
			}
			logger.debug("[REQ] User ID:" + user.getId());
			req.setAttribute("uid", user.getId());
			req.setAttribute("token", token);
			return true;
		}
		
		return false;
	}

}
