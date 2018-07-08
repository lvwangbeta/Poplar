'use strict';

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import {getToken} from '../util/Secret';
import * as WeChat from 'react-native-wechat';
// import PopupLoginRegPage from '../PopupLoginRegPage';

export default class Share extends Component{

  constructor(props){
    super(props);
    this.state = {
    };

  }

  pressLike() {
    //getToken(this.checkLogin);
    try {
      let result = WeChat.shareToTimeline({
        type: 'text',
        description: 'hello, wechat'
      });
      console.log('share text message to time line successful:', result);
    } catch (e) {
      if (e instanceof WeChat.WechatError) {
        console.error(e.stack);
      } else {
        throw e;
      }
    }
  }


  render(){
    return (
      <View style={{flexDirection: 'row', }}>
        <TouchableOpacity onPress={()=>this.pressLike()}>
          <Image style={{width:24, height:24, marginRight: 4}} source={require('../imgs/share.png')} />
        </TouchableOpacity>

      </View>
    );
  }



};
