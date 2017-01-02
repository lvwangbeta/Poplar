import React from 'react';

import {
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import {getToken} from '../../util/Secret';
import PopupLoginRegPage from '../../PopupLoginRegPage';

var Comment = React.createClass({

  getInitialState: function(){
    return {
      loginRegPageVisible: false,
    };

  },

  checkLogin:function(token) {
    console.log('new comment btn token:' + token);
    if(!token) {
      this.setState({loginRegPageVisible: true});
    } else {
      this.props.showCommentBar();
    }
  },

  hideLoginRegPage: function() {
    this.setState({
      loginRegPageVisible: false,
    });
  },

  refresh: function(isLogin, token) {
    this.setState({
      loginRegPageVisible: false,
    }, this.props.refresh(isLogin, token));
  },

  pressComment: function() {
    getToken(this.checkLogin);
    //this.props.showCommentBar();
    //this.props.push2FeedDetail();
  },

  render: function() {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          {this.state.loginRegPageVisible && <PopupLoginRegPage hideLoginRegPage={this.hideLoginRegPage} refresh={this.refresh}/>}
          <TouchableOpacity onPress={this.pressComment} >
            <Image style={{width:22, height:22, marginRight: 5}} source={require('../../imgs/chat.png')} />
          </TouchableOpacity>
          {/* <Text>{this.props.counter}</Text> */}
        </View>
      </View>
    );
  },


});


module.exports = Comment;
