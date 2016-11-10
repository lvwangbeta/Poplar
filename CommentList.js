'use strict';

import React from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';
var Md5 = require('./Md5');
var PoplarEnv = require('./PoplarEnv');
var CommentCell = require('./CommentCell');
var NewComment = require('./component/NewComment');
var CommentBar = require('./component/CommentBar');
var FeedActions = require('./component/actions/FeedActions');

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
      limit: this.props.limit, //评论显示行数

      comment: null,
      commentBarVisible: false,
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
    console.log('get comment url : ' + url);
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
          commentsArray: responseData.comments.slice(0, this.state.limit),
          dataSource: this.state.dataSource.cloneWithRows(responseData.comments.slice(0, this.state.limit)),
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
    commentsArray.push(comment);


    this.setState({
      //commentCounter: this.state.commentCounter + 1,
      dataSource: this.state.dataSource.cloneWithRows(commentsArray),
    });

  },


  render: function() {
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return this.renderCommentList(this.props.commentCounter);
  },

  pushComment2Feed: function(comment) {
    console.log('pushComment2Feed');
    var commentsArray = this.state.commentsArray;
    commentsArray.push(comment);

    this.setState({
      isComment: true,
      dataSource: this.state.dataSource.cloneWithRows(commentsArray),
    });

  },

  showCommentBar: function() {
    this.setState({
      commentBarVisible: true,
    });
  },

  hideCommentBar: function() {
    this.setState({
      isComment: false,
      commentBarVisible: false,
    });
  },

  renderCommentBar: function() {
    if(this.state.commentBarVisible) {
      return (<CommentBar visible={true} pushComment2Feed={this.pushComment2Feed} hideCommentBar={this.hideCommentBar}/>);
    } else {
      return (<View/>);
    }
  },

  renderCommentList: function(commentCounter) {

    // console.log(this.props.newComment);
    //
    // if(this.props.newComment != null && this.props.newComment != undefined) {
    //   console.log(this.props.newComment.comment_content);
    //   this.addNewComment(this.props.newComment);
    // }

    if(commentCounter > 0) {
      return (
        <View style={styles.commentList}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        </View>
      );
    } else {
      return (<View/>);
    }

  },

  renderRow: function(comment) {
    if(comment == null || comment == undefined) {
      return (<View />);
    }
    return(
      <CommentCell
          comment={comment}
          showCommentBar={this.props.showCommentBar}
          hideCommentBar={this.props.hideCommentBar}
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
