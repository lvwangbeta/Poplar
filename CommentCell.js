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

import URLConf from './component/api/URLConf';
var Md5 = require('./Md5');
var ReplyModal = require('./NewFeed');

const avatar_thumbnail = '?imageView2/1/w/100/h/100';

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
            <Image style={styles.avatar} source={{uri:URLConf.IMG_BASE_URL+this.props.comment.comment_author_avatar+avatar_thumbnail}} />
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
    height: 32,
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
    marginRight: 30,
    color: '#030303',
    lineHeight: 18,
  },
});

module.exports = CommentCell;
