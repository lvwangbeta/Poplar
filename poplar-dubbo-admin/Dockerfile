FROM tomcat:7.0.77-jre8

MAINTAINER lvwangbeta <lvwangbeta@163.com>

#定义工作目录
ENV TOMCAT_BASE /usr/local/tomcat


#复制war包
COPY ./dubbo-admin.war $TOMCAT_BASE/webapps/

#删除默认的ROOT文件件
RUN rm -rf $TOMCAT_BASE/webapps/ROOT

RUN unzip $TOMCAT_BASE/webapps/dubbo-admin.war -d webapps/ROOT

RUN rm $TOMCAT_BASE/webapps/ROOT/WEB-INF/dubbo.properties

COPY ./dubbo.properties $TOMCAT_BASE/webapps/ROOT/WEB-INF/dubbo.properties