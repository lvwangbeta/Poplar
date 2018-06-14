package com.lvwangbeta.poplar.feed;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@MapperScan("com.lvwangbeta.poplar.feed.dao")
public class PoplarFeedServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PoplarFeedServiceApplication.class, args);
    }
}
