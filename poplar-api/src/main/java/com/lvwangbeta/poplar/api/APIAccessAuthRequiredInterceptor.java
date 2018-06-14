package com.lvwangbeta.poplar.api;

import java.io.UnsupportedEncodingException;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lvwangbeta.poplar.api.service.AuthService;
import com.lvwangbeta.poplar.common.model.User;
import com.lvwangbeta.poplar.common.util.CipherUtil;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component
public class APIAccessAuthRequiredInterceptor implements HandlerInterceptor {

	
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
			
			System.out.println("key:"+key + " value:"+value);
			
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
		System.out.println("sign:"+sign);
		System.out.println("sign2:"+sign2);
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
		System.out.println("uri: "+ uri);
		System.out.println("api access required :"+req.getRequestURL());
		System.out.println("query :"+req.getQueryString());		
		if(checkSign(req)){
			String token = req.getHeader("X-Auth-Token");
			System.out.println("token:"+token);
			if(token == null || token.length() == 0 || "null".equalsIgnoreCase(token)) {
				System.out.println("NO TOKEN");
				if(matcher.match(URL_TIMELINE, uri)) {
					System.out.println("no auth access with uri match : " + URL_TIMELINE );
					req.setAttribute("uid", 0);
					return true;
				} else if(matcher.match(URL_TAG_PATTERN, uri)) {
					System.out.println("no auth access with uri match : " + URL_TAG_PATTERN );
					req.setAttribute("uid", 0);
					return true;
				} else if(matcher.match(URL_COMMENT_PATTERN, uri)) {
					System.out.println("no auth access with uri match : " + URL_COMMENT_PATTERN);
					req.setAttribute("uid", 0);
					return true;
				} else if(matcher.match(URL_RECOMMEND_PATTERN, uri)) {
					System.out.println("no auth access with uri match : " + URL_RECOMMEND_PATTERN);
					req.setAttribute("uid", 0);
					return true;
				}
			}
			User user = token2User(token);
			if(user == null) {
				System.out.println("can not find user by token:"+token);
				return false;
			}
			System.out.println("uid int" + user.getId());
			req.setAttribute("uid", user.getId());
			req.setAttribute("token", token);
			return true;
		}
		
		return false;
	}

}
