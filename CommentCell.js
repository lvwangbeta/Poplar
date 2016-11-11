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

  onPress: function() {

    if(this.props.from == 'FeedDetail') {
      this.props.reply(this.props.comment);
    } else {
      this.props.push2FeedDetail();
    }
  },

  renderAuthorName: function(comment) {
    if(comment.comment_parent_author_name != undefined && comment.comment_parent_author_name != null) {
      return (<View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.username}>{comment.comment_author_name}</Text>
                <Text> 回复 </Text>
                <Text style={styles.username}>{comment.comment_parent_author_name}</Text>
              </View>
            );
    } else {
      return (<Text style={styles.username}>{this.props.comment.comment_author_name}</Text>);
    }

  },

  render: function(){
    return (
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <View style={styles.commentBox}>
            <Image style={styles.avatar} source={require('./imgs/avatar.png')} />
            <View>
                {this.renderAuthorName(this.props.comment)}
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
