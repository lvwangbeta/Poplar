'use strict';

import React from 'react';
import {AsyncStorage} from 'react-native';
import URLConf from '../api/URLConf';
import Md5 from './Md5';
import PoplarEnv from '../../PoplarEnv';

// const token = '6b6478dd-33ab-492e-b06d-05b7f1106c47';
const token = '';
const secret = 'osf';
const LOGIN_URL = URLConf.API_HOST + '/account/login';
const LOGOUT_URL = URLConf.API_HOST + '/account/logout';

export default {
  token, secret
}


export function isLogin(that) {
  AsyncStorage.getItem('user', (err, result) => {
    console.log('token : '+result);
    if(typeof(result) == 'string') {
      that.setState({
        isLogin: true,
        token: result,
      });
    }
  });
}

export function getToken() {
  AsyncStorage.getItem('user', (err, result) => {
    console.log(result);
    return result;
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
      if(responseData.token === PoplarEnv.SUCCESS_ACCOUNT_LOGIN) {
        AsyncStorage.setItem('user', responseData.token);
      }
      console.log('ret code code : ' + retCode);
      return retCode;
    }).done();

}

export function logout(that) {

  var sign = Md5.hex_md5(LOGOUT_URL.replace(URLConf.APP_SERVER_HOST, '') + '?ts=123456&'+secret);
  console.log('sign:' + sign);
  var url = LOGOUT_URL+'?ts=123456&sign=' + sign;

  var options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token':that.state.token,
    },
    body: JSON.stringify({token: that.state.token})
  };
  fetch(url, options).then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      if(responseData.token === PoplarEnv.SUCCESS_ACCOUNT_LOGOUT) {
        AsyncStorage.removeItem('user', (err)=>{
          that.setState({
            token: '',
            isLogin: false,
          })
        });
      }
    }).done();

}

export function register() {

}
