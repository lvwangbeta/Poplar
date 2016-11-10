'use strict';

import React from 'react';

import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';

var Md5 = require('./Md5');
var ReplyModal = require('./NewFeed');

var COMMENT_URL = 'http://localhost:8080/com.lvwang.osf/api/v1/comment/';


var CommentCell = React.createClass({

  render: function(){
    return (
      <View>
        <TouchableOpacity onPress={this.props.push2FeedDetail}>
          <View style={styles.commentBox}>
            <Image style={styles.avatar} source={require('./imgs/avatar.png')} />
            <View>
                <Text style={styles.username}>Kevin Rikina</Text>
                <Text style={styles.comment}>{this.props.comment.comment_content}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  commentBox: {
    flex: 1,
    flexDirection: 'row',
    //borderColor: 'black',
    //borderWidth: 1,
    padding: 10,
  },
  avatar: {
    borderRadius: 16,
    width: 32,
    marginRight: 10,
  },
  username: {
    fontSize: 12,
    color: '#00B5AD',
    lineHeight: 13,
    marginBottom: 5,
  },
  commentTime: {

  },
  comment: {
    fontSize: 14,
    color: '#030303',
    lineHeight: 13,
  },
});

module.exports = CommentCell;
