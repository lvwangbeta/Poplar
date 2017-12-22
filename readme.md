Poplar
=======

![Poplar](./doc/imgs/poplar.png)  


2.0版本将带来如下更新，敬请期待（预计2018年1月中完成）
- React由15.3.2升级至16.0.0
- React Native由0.36.1升级至0.50.4
- 导航改用React Navigation
- 应用全局状态（登录、账户信息），弹出层（登录、注册页面、 发送状态页面）使用react-redux管理
- 后端框架由Spring/Spring MVC 3.X 迁移至Spring Boot 1.5.8
- 后端部署方式采用Docker打包成3个独立镜像：集成Tomcat的应用服务器、MySQL数据库服务器、Redis服务器



Poplar is a social networking application written by React Native, backend server is implemented by Spring framework. I choose MySQL and Redis as persistent and cache solution. The focus of Poplar is on social and interest, enables you to build a social theme application on Poplar quickly.

## Screen Shot

![detail](./doc/imgs/feedDetail.gif)
![new](./doc/imgs/new.gif)
![explore](./doc/imgs/explore.gif)
![comment](./doc/imgs/comment.gif)


![screenshot](./doc/imgs/screenshot.png)


## Install Poplar

	git clone https://github.com/lvwangbeta/Poplar.git 
	cd Poplar && npm install
	react-native link
double click `ios/Poplar.xcodeproj` run it directly from `Xcode`


## App Configue 
edit `/App/api/URLConf.js` to configue backend server url and image server address.
	
* Application server

		const APP_SERVER_HOST = 'http://127.0.0.1:8080';

* Image server address, upload and download images. Follow [qiniu-sdk](https://github.com/qiniu/react-native-sdk) to configue qiniu image storage.

		const IMG_BASE_URL = 'http://ogj1ador4.bkt.clouddn.com/'; 
		


## Server Configue 

Make sure you have installed `MySQL` and `Redis`, edit `/backend/PoplarServer/src/main/resources/spring/property.properties` to configue domain and database.
You can init database using `/Poplar/backend/PoplarServer/doc/osf.sql`

	#domain
	domain.name=localhost
	domain.ip=127.0.0.1
	domain.port=8080
	context=com.lvwang.osf

	#jdbc config
	jdbc.driver=com.mysql.jdbc.Driver
	jdbc.url=jdbc:mysql://localhost:3306/osf
	jdbc.username=root
	jdbc.password=xxxxxx


	#Redis config
	redis.host=localhost
	redis.port=6379
	redis.password=
	redis.maxIdle=300
	redis.maxActive=600
	redis.maxWait=1000
	redis.testOnBorrow=true

## Dependencies

	react-native-image-crop-picker
	react-native-keyboard-spacer
	react-native-navbar
	react-native-parallax-scroll-view
	react-native-photo-view
	react-native-qiniu
	react-native-scrollable-tab-view
	react-native-swiper
	react-native-tab-navigator
	react-native-wechat




## Introduction

![framework](./doc/imgs/framework.png)


## Roadmap
* support emoji
* support third party login

## License GPL

Copyright (C) 2017 Poplar

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
