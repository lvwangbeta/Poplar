package com.lvwangbeta.poplar.tag;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.lvwangbeta.poplar.tag.dao")
public class PoplarTagServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PoplarTagServiceApplication.class, args);
    }
}
