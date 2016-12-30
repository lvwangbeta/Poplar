import React from 'react';

import {
  View,
  Image,
  Text,
  Modal,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import Md5 from '../util/Md5';

var COMMENT_URL = 'http://localhost:8080/com.lvwang.osf/api/v1/comment/';

var NewComment = React.createClass({

  getInitialState: function() {
    return {
      replyModalVisible: false,
      commentObjectType: this.props.object_type,
      commentObjectID: this.props.object_id,
      commentContent: null,
      commentParent: 0,
    }
  },

  cancle: function() {
    this.props.callbackParentSetReplyModalInVisible();
  },

  send: function() {
    console.log('new comment ');

    this.cancle();
    this.props.callbackParentPushNewComment();
    return ;

    var sign = Md5.hex_md5('/com.lvwang.osf/api/v1/comment/create?ts=123456&'+'osf');
    console.log('sign:' + sign);
    var url = COMMENT_URL+'create?ts=123456&sign=' + sign;
    var options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token':'6b6478dd-33ab-492e-b06d-05b7f1106c47',
      },
      body: JSON.stringify({
        comment_object_type: this.state.commentObjectType,
        comment_object_id: this.state.commentObjectID,
        comment_content: 'a new comment test',
        comment_parent: 0
      })
    };

    fetch(url, options).then((response) => response.text())
      .then((responseData) => {
        console.log(responseData);
        this.cancle();
      }).done();

  },

  render: function() {
    return (
      <Modal
        animated={true}
        animationType={"slide"}
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {alert("Modal has been closed.")}}
        >

        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={styles.nav}>
            <View style={styles.cancleBtn} >
              <Text onPress={this.cancle}>cancle</Text>
            </View>
            <View style={styles.title}><Text style={{textAlign: 'center'}}>newFeed</Text></View>
            <View style={styles.sendBtn}><Text onPress={this.send} style={{textAlign: 'right'}}>send</Text></View>
          </View>
          <View style={{flex:1, backgroundColor: 'skyblue'}} />
          <View style={{height: 50, backgroundColor: 'steelblue'}} />
        </View>
      </Modal>


    );
  },

});



var styles = StyleSheet.create({
  nav: {
    //flex: 1,
    flexDirection: 'row',
    height: 70,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  cancleBtn: {
    width: 50,
  },
  sendBtn: {
    width: 50,
  },
  title: {
    flex: 1,
  },
});

module.exports = NewComment;
