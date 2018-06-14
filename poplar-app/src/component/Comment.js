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


export default class Comment extends Component{

  pressComment() {
    this.props.showCommentBar();
  }

  render() {
    return (
      <View>
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
