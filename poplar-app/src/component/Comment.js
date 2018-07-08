'use strict';

import React, { Component } from 'react';

import {
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import LoginPage from '../LoginPage';
import {showLoginPage, isLogin} from  '../actions/loginAction';

class Comment extends Component{

  pressComment() {
    const {status,showLoginPage} = this.props;
    if(status == 'NOT_LOGGED_IN') {
      showLoginPage();
      return;
    }
    this.props.showCommentBar();
  }

  render() {
    const {status} = this.props;
    return (
      <View>
        {status == 'NOT_LOGGED_IN' && <LoginPage {...this.props}/>}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=>this.pressComment()} >
            <Image style={{width:24, height:24, marginRight: 5}} source={require('../imgs/chat.png')} />
          </TouchableOpacity>
          {/* <Text>{this.props.counter}</Text> */}
        </View>
      </View>
    );
  }
}

export default connect((state) => ({
  status: state.isLogin.status, //登录状态
  loginPageVisible: state.showLoginPage.loginPageVisible
}), (dispatch) => ({
  isLogin: () => dispatch(isLogin()),
  showLoginPage: () => dispatch(showLoginPage()),
}))(Comment)
