#!/bin/bash

docker -v

if [ $? != 0 ]
    then
        echo '[ERROR] Docker NOT installed.'
        exit
fi

mvn -v

if [ $? != 0 ]
    then
        echo '[ERROR] Maven NOT installed.'
        exit
fi

mvn package -Pdocker  -Dmaven.test.skip=true docker:build

if [ $? != 0 ]
    then
        echo '[ERROR] build failed.'
        exit
fi

echo '[INFO] pulling images...'
docker pull lvwangbeta/poplar-mysql
docker pull redis
docker pull zookeeper
docker images


echo '[INFO] creating docker network...'
docker network create --subnet=172.18.0.0/16 poplar-network
echo '[INFO] poplar-network is created, subnet:172.18.0.0/16'

echo '[INFO] starting instance...'
docker run --name poplar-zookeeper --restart always -d  --net poplar-network --ip 172.18.0.6  zookeeper
docker run --net poplar-network --ip 172.18.0.8  --name poplar-mysql -p 3307:3306 -e MYSQL_ROOT_PASSWORD=123456 -d  lvwangbeta/poplar-mysql
docker run --net poplar-network --ip 172.18.0.9 --name poplar-redis -p 6380:6379 -d redis

docker run --net poplar-network --ip 172.18.0.2 --name=poplar-user-service -p 8082:8082 -d lvwangbeta/poplar-user-service
docker run --net poplar-network --ip 172.18.0.3 --name=poplar-feed-service -p 8083:8083 -d lvwangbeta/poplar-feed-service
docker run --net poplar-network --ip 172.18.0.4 --name=poplar-action-service -p 8084:8084 -d lvwangbeta/poplar-action-service
docker run --net poplar-network --ip 172.18.0.5 --name=poplar-tag-service -p 8085:8085 -d lvwangbeta/poplar-tag-service
docker run --net poplar-network --ip 172.18.0.10 --name=poplar-api -p 8080:8080 -d lvwangbeta/poplar-api

docker run --net poplar-network --ip 172.18.0.11 --name poplar-dubbo-admin -p 9092:8080 -d lvwangbeta/poplar-dubbo-admin

docker ps
