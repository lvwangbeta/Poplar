Poplar
=======

![Poplar](./doc/imgs/poplar.png)  

![show](./show.png)  

2.0版本将带来如下更新，敬请期待（即将更新，久等了抱歉！！！）
- 更统一的UI风格
- React由15.3.2升级至16.0.0
- React Native由0.36.1升级至0.50.4
- 导航改用React Navigation
- 应用全局状态（登录、账户信息），弹出层（登录、注册页面、 发送状态页面）使用react-redux管理
- 后端框架由Spring/Spring MVC 3.X 迁移至Spring Boot 1.5.8
- 后端部署方式采用Docker打包成3个独立镜像：集成Tomcat的应用服务器、MySQL数据库服务器、Redis服务器
- 微服务化拆分



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

> NOTE: Make sure you have installed Maven and Docker

```shell
cd poplar && ./build.sh
```



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

## License MIT


