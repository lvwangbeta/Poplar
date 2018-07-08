/**
* 聚合reducers
**/

'use strict';

import { combineReducers } from 'redux';
import {isLogin, showLoginPage,logout} from './LoginReducer';
import {showRegPage} from './RegisterReducer';
import {showNewFeedPage} from './NewFeedReducer';

const rootReducer = combineReducers({
  isLogin: isLogin,
  logout: logout,
  showNewFeedPage: showNewFeedPage,
  showLoginPage: showLoginPage,
  showRegPage: showRegPage,
});

export default rootReducer;
