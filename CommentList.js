'use strict';

import React from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';
var Md5 = require('./Md5');
var PoplarEnv = require('./PoplarEnv');
var CommentCell = require('./CommentCell');
var NewComment = require('./component/NewComment');
var LikeAction = require('./component/actions/Like');
var CommentAction = require('./component/actions/Comment');

var COMMENT_URL = 'http://localhost:8080/com.lvwang.osf/api/v1/comment/';

var CommentList = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      replyModalVisible: false,
      commentsArray: [],
      likeCounter: this.props.likeCounter,
      commentCounter: this.props.commentCounter,
      likeed: this.props.likeed,
      commented: this.props.commented,
    };
  },

  componentDidMount: function() {
    this.fetchData();

  },

  /*
    被评论的feed类型
  */
  getCommentObjType: function(type) {
    var type_str = '';
    switch (type) {
      case PoplarEnv.COMMENT_OBJ_TYPE.POST:
        type_str = 'post';
        break;
      case PoplarEnv.COMMENT_OBJ_TYPE.PHOTO:
        type_str = 'photo';
        break;
      case PoplarEnv.COMMENT_OBJ_TYPE.ALBUM:
        type_str = 'album';
        break;
      case PoplarEnv.COMMENT_OBJ_TYPE.SPOST:
        type_str = 'spost';
        break;
      default:
        type_str = '';

    }
    return type_str;
  },

  fetchData: function() {
    var type_str = this.getCommentObjType(this.props.object_type);
    var sign = Md5.hex_md5('/com.lvwang.osf/api/v1/comment/'+type_str+'/'+this.props.object_id+'?ts=123456&'+this.props.secret);
    console.log('sign:' + sign);
    var url = COMMENT_URL+type_str+'/'+this.props.object_id+'?ts=123456&sign=' + sign;
    var headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token':this.props.token,
    }};

    fetch(url, headers)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          //dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          commentsArray: responseData.comments,
          dataSource: this.state.dataSource.cloneWithRows(responseData.comments),
          loaded: true,
        });
      })
      .done();
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>
      </View>

    );
  },


  setReplyModalVisible: function() {
    this.setState({replyModalVisible: true});
  },

  setReplyModalInVisible: function() {
    this.setState({replyModalVisible: false});
  },

  addNewComment: function(comment) {
    console.log('add new comment to comments list');
    var commentsArray = this.state.commentsArray;
    commentsArray.push({ id: 19,
     comment_object_type: 2,
     comment_object_id: 77,
     comment_author: 23,
     comment_author_name: 'demo1',
     comment_author_avatar: '5245526e-9b78-4c69-9a99-4bd454f015a0.jpeg',
     comment_ts: 1465097153000,
     comment_content: '呵呵hhhhhh',
     comment_parent: 0,
     comment_parent_author: 0,
     comment_parent_author_name: null });


    this.setState({
      commentCounter: this.state.commentCounter + 1,
      dataSource: this.state.dataSource.cloneWithRows(commentsArray),
    });

  },

  render: function() {
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View>
        <NewComment
          visible={this.state.replyModalVisible}
          callbackParentSetReplyModalInVisible={this.setReplyModalInVisible}
          callbackParentPushNewComment={this.addNewComment}
          object_type={this.props.object_type}
          object_id={this.props.object_id}
        />

        <View style={styles.feedActions}>
            <View style={{flex:1}}></View>
            <View style={styles.feedActionComment}>
              <CommentAction counter={this.state.commentCounter} callbackParentSetReplyModalVisible={this.setReplyModalVisible}/>
              <View>
                <Image style={{marginTop:5}} source={require('./imgs/triangle.png')} />
              </View>
            </View>
            <View style={styles.feedActionLike}>
              <LikeAction counter={this.state.likeCounter} />
            </View>
        </View>

        <View style={styles.commentList}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        </View>
      </View>
    );
  },

  renderRow: function(comment) {
    return(
      <CommentCell
          comment={comment}
          callbackParentSetReplyModalVisible={this.setReplyModalVisible}
        />
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  commentList: {
    marginTop: -10,
    marginLeft:20,
    marginRight:20,
    padding: 10,
    paddingTop: 0,
    backgroundColor: '#F3F3F3',
  },
  feedActions:{
    //borderWidth: 1,
    //borderTopColor: '#EEEEEE',
    flex :1,
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 5,
  },
  feedActionComment: {
    width: 40,
    padding: 5,
    marginRight: 5,
  },
  feedActionLike: {
    width: 40,
    padding: 5,
  },
});

module.exports = CommentList;
