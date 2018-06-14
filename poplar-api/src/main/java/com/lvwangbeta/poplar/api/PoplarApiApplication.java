package com.lvwangbeta.poplar.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;

@SpringBootApplication
public class PoplarApiApplication extends WebMvcConfigurerAdapter {

    public static void main(String[] args) {
        SpringApplication.run(PoplarApiApplication.class, args);
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        super.addArgumentResolvers(argumentResolvers);
        argumentResolvers.add(new RequestAttributeArgumentResolver());
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        super.addInterceptors(registry);
        registry.addInterceptor(new APIAccessAuthRequiredInterceptor())
                .addPathPatterns("/api/v1/**")
                .excludePathPatterns("/api/v1/user/login/**")
                .excludePathPatterns("/api/v1/user/check/email/*")
                .excludePathPatterns("/api/v1/user/register/**")
                .excludePathPatterns("/api/v1/feed/of/user/**");
    }
}
