'use strict';

import React from 'react';
import {AsyncStorage} from 'react-native';
import URLConf from '../api/URLConf';
import Md5 from './Md5';
import PoplarEnv from './PoplarEnv';

// const token = '6b6478dd-33ab-492e-b06d-05b7f1106c47';
const token = '';
const secret = 'osf';
const LOGIN_URL = URLConf.API_HOST + '/account/login';
const LOGOUT_URL = URLConf.API_HOST + '/account/logout';

export default {
  token, secret
}


export function isLogin(callback) {
  AsyncStorage.getItem('token', (err, result) => {
    console.log('token : '+result);
    if(typeof(result) == 'string') {
      callback(true, result);
    }else {
      callback(false, result);
    }
  });
}

export function getToken(callback) {
  AsyncStorage.getItem('token', (err, result) => {
    console.log(result);
    callback(result);
  });
}

export function getUserInfo(callback) {
  //AsyncStorage.clear();
  AsyncStorage.multiGet(['userId', 'userName', 'avatar'], (err, data) => {
    console.log('user info :' + data);
    var user = {};
    user.userId = data[0][1];
    user.userName = data[1][1];
    user.avatar = data[2][1];
    console.log('user info: '+ user.userName);
    callback(user);
  });
}

export function rmToken() {
  AsyncStorage.removeItem('token', (err)=>{
    console.log('token rm');
  });
}

export function login(user_email, user_pwd) {

  var url = LOGIN_URL;
  var options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({user_email: user_email, user_pwd: user_pwd})
  };
  let retCode;
  fetch(url, options).then((response) => response.json())
    .then((responseData) => {
      retCode = responseData.status;
      console.log(responseData);
      if(responseData.token === PoplarEnv.dic.SUCCESS_ACCOUNT_LOGIN) {
        AsyncStorage.setItem('token', responseData.token);
      }
      console.log('ret code code : ' + retCode);
      return retCode;
    }).done();

}

export function logout(callback) {

  getToken((token) => {
    var sign = Md5.hex_md5(LOGOUT_URL.replace(URLConf.APP_SERVER_HOST, '') + '?ts=123456&'+secret);
    console.log('sign:' + sign);
    var url = LOGOUT_URL+'?ts=123456&sign=' + sign;

    var options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token':token,
      },
      body: JSON.stringify({token: token})
    };
    fetch(url, options).then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if(responseData.status === PoplarEnv.dic.SUCCESS_ACCOUNT_LOGOUT) {
          AsyncStorage.removeItem('token', (err)=>{
            callback(true);
          });
        }
      }).done();
  });
}

export function register() {

}
