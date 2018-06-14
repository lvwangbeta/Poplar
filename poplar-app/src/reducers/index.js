/**
* 聚合reducers
**/

'use strict';

import { combineReducers } from 'redux';
import {isLogin, showLoginPage,} from './LoginReducer';
import {showRegPage} from './RegisterReducer';
import {showNewFeedPage} from './NewFeedReducer';

const rootReducer = combineReducers({
  isLogin: isLogin,
  showNewFeedPage: showNewFeedPage,
  showLoginPage: showLoginPage,
  showRegPage: showRegPage,
});

export default rootReducer;
