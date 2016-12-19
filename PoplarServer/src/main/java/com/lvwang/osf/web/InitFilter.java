package com.lvwang.osf.web;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.lvwang.osf.util.Property;

/**
 * Servlet Filter implementation class AuthMgt
 */
@WebFilter("/InitFilter")
public class InitFilter implements Filter {


    /**
     * Default constructor. 
     */
    public InitFilter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
		System.out.println("destory");
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

		HttpSession session = ((HttpServletRequest)request).getSession();
		session.setAttribute("img_base_url", Property.IMG_BASE_URL);
		session.setAttribute("post_cover_thumbnail", Property.POST_COVER_THUMBNAIL);
		session.setAttribute("album_thumbnail", Property.ALBUM_THUMBNAIL);
		
		chain.doFilter(request, response);

		
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}