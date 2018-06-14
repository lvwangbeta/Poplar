'use strict';

import * as Secret from '../util/Secret';

export function showLoginPage(flag=true) {
  console.log('showing');
  if(flag == true) {
    return {
      type: 'LOGIN_PAGE_VISIBLE'
    }
  } else {
    return {
      type: 'LOGIN_PAGE_INVISIBLE'
    }
  }

}

// 检查本地token判断是否客户端已登录
export function isLogin() {
  return dispatch => {
      Secret.isLogin((result, token) => {
        if(result) {
          dispatch({
            type: 'LOGGED_IN',
          });
        } else {
          dispatch({
            type: 'NOT_LOGGED_IN',
          });
        }
      });
  }
}

export function login() {
  return dispatch => {
    dispatch(isLogging());
    let result = fetch('https://www.baidu.com/')
                 .then((res) => {
                   dispatch(loginSuccess());
                 }).catch((e) => {
                   dispatch(loginError());
                 })
  }
}


function isLogging() {
  console.log('logging');
  return {
    type: "LOGGIN_DONING"
  }
}

function loginSuccess() {
  console.log('loggin success');
  return {
    type: "LOGGIN_DONE",
    user: {
      id: '12313',
      name: 'poplar'
    }
  }
}

function loginError() {
  console.log('loggin error');
  return {
    type: "LOGGIN_ERROR"
  }
}
