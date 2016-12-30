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

import PoplarEnv from '../util/PoplarEnv';
import CommentCell from './CommentCell';
import NewComment from './NewComment';
import FeedActions from './actions/FeedActions';
import {getCommentsOfObject} from '../api/CommentAPI';


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
    getCommentsOfObject(type_str, this.props.object_id,this.state.limit, (result, comments) => {
      this.setState({
        commentsArray: comments,
        dataSource: this.state.dataSource.cloneWithRows(comments),
        loaded: true,
      });
    });
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
    console.log(comment);
    var commentsArray = this.state.commentsArray;
    commentsArray.push(comment);

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(commentsArray),
    });

  },

  componentWillReceiveProps: function(nextProps) {

    if(this.props.commentCounter == nextProps.commentCounter) return;

    if(nextProps.newComment != undefined && nextProps.newComment != null) {
        this.addNewComment(nextProps.newComment);
    }
  },

  render: function() {
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return this.renderCommentList(this.props.commentCounter);
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


  renderCommentList: function(commentCounter) {

    if(commentCounter > 0) {
      return (
        <TouchableOpacity style={styles.commentList} onPress={this.props.push2FeedDetail}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        </TouchableOpacity>
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
          push2FeedDetail={this.props.push2FeedDetail}
          showCommentBar={this.props.showCommentBar}
          hideCommentBar={this.props.hideCommentBar}
          from={this.props.from}
          reply={this.props.reply}
          refresh={this.props.refresh}
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
