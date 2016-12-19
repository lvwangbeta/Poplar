package com.lvwang.osf.web;

import java.lang.annotation.Annotation;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

public class RequestAttributeArgumentResolver implements HandlerMethodArgumentResolver{

	public Object resolveArgument(MethodParameter param,
			ModelAndViewContainer mavContainer, NativeWebRequest nativeWebRequest,
			WebDataBinderFactory webBinderFactory) throws Exception {
		
		RequestAttribute ra = (RequestAttribute)param.getParameterAnnotation(RequestAttribute.class);
		return nativeWebRequest.getAttribute(ra.value(), nativeWebRequest.SCOPE_REQUEST);
	}

	public boolean supportsParameter(MethodParameter param) {
		return param.getParameterAnnotation(RequestAttribute.class) != null;
	}

	
	
}
