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

export function logout() {
  return dispatch => {
    Secret.isLogin((result, token) => {
      console.log('[LOGOUT] token' + token);
      if(result) {
         Secret.logout((res) => {
            if(res) {
              dispatch({type: 'NOT_LOGGED_IN'});
            }
        });
      } else {
        dispatch({type: 'NOT_LOGGED_IN',});
      }
    });
  }
}
