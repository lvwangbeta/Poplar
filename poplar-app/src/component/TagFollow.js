'use strict';

import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Modal,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {getToken} from '../util/Secret';
import {followTag, undoFollowTag} from '../api/ActionAPI';
import {isInterest} from '../api/TagAPI';
import { connect } from 'react-redux';
import LoginPage from '../LoginPage';
import {showLoginPage, isLogin} from  '../actions/loginAction';
// import PopupLoginRegPage from '../PopupLoginRegPage';

class TagFollow extends Component{

  constructor(props) {
    super(props);
    this.state= {
      isFollowed: false,
      loginRegPageVisible: false,
    }
  }

  componentDidMount() {
    isInterest(this.props.tagId, (result, err) => {
      if(result) {
        this.setState({
          isFollowed: true,
        });
      }
    });
  }

  onPress() {
    const {status,showLoginPage} = this.props;
    if(status == 'NOT_LOGGED_IN') {
      showLoginPage();
      return;
    }

    if(this.state.isFollowed)  {
      undoFollowTag(this.props.tagId, (result, err) => {
        if(!result) {
          if(err == 'not logged in') {
            this.setState({loginRegPageVisible: true});
          }
        } else {
          this.setState({
            isFollowed: false,
          });
        }
      });
    } else {
      followTag(this.props.tagId, (result, err) => {
        if(!result) {
          if(err == 'not logged in') {
            this.setState({loginRegPageVisible: true});
          }
        } else {
          this.setState({
            isFollowed: true,
          });
        }
      });
    }
  }

  updateFollowBtnStatus(token) {
    if(token) {
      this.setState({
        isFollowed: true,
      });
    }
  }

  render() {
    const {status} = this.props;
    return(
      <View>
        {status == 'NOT_LOGGED_IN' && <LoginPage {...this.props}/>}
        <TouchableOpacity ref={'btn'} style={[styles.btn, {backgroundColor: this.state.isFollowed?'#FBBD08':'rgba(0,0,0,0.0)'}]} onPress={()=>this.onPress()} >
          <Text style={{color: this.state.isFollowed?'#F3F3F3':'#FBBD08'}}>{this.state.isFollowed?'已关注':'+ 关注'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

};

var styles = StyleSheet.create({
  btn: {
    height: 24,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#FBBD08',
    borderRadius: 12,
  },
  text: {
    color: '#FBBD08',
  },

});

export default connect((state) => ({
  status: state.isLogin.status, //登录状态
  loginPageVisible: state.showLoginPage.loginPageVisible
}), (dispatch) => ({
  isLogin: () => dispatch(isLogin()),
  showLoginPage: () => dispatch(showLoginPage()),
}))(TagFollow)
