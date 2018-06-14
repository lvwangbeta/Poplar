'use strict';

import React, { Component } from 'react';
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
import {getCommentsOfObject} from '../api/CommentAPI';
import URLConf from '../api/URLConf';

const avatar_thumbnail = '?imageView2/1/w/48/h/48';

export default class CommentList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      replyModalVisible: false,
      commentsArray: [],
      commentCounter: this.props.commentCounter,
      commented: this.props.commented,
      limit: this.props.limit, //评论显示行数

      comment: null,
      commentBarVisible: false,
    };
  }

  componentDidMount() {
    this.fetchData();

  }

  /*
    被评论的feed类型
  */
  getCommentObjType(type) {
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
  }

  fetchData() {
    var type_str = this.getCommentObjType(this.props.object_type);
    getCommentsOfObject(type_str, this.props.object_id,this.state.limit, (result, comments) => {
      this.setState({
        commentsArray: comments,
        dataSource: this.state.dataSource.cloneWithRows(comments),
        loaded: true,
      });
    });
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>
      </View>

    );
  }


  setReplyModalVisible() {
    this.setState({replyModalVisible: true});
  }

  setReplyModalInVisible() {
    this.setState({replyModalVisible: false});
  }

  addNewComment(comment) {
    console.log('add new comment to comments list');
    console.log(comment);
    var commentsArray = this.state.commentsArray;
    commentsArray.push(comment);

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(commentsArray),
    });

  }

  componentWillReceiveProps(nextProps) {

    if(this.props.commentCounter == nextProps.commentCounter) return;

    if(nextProps.newComment != undefined && nextProps.newComment != null) {
        this.addNewComment(nextProps.newComment);
    }
  }

  render() {
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return this.renderCommentList(this.props.commentCounter);
  }


  showCommentBar() {
    this.setState({
      commentBarVisible: true,
    });
  }

  hideCommentBar() {
    this.setState({
      isComment: false,
      commentBarVisible: false,
    });
  }


  renderCommentList(commentCounter) {

    if(commentCounter > 0) {
      return (
        <TouchableOpacity style={styles.commentList} onPress={this.props.nav2FeedDetail}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(comment)=>this.renderRow(comment, this.props.caller)}
          />
        </TouchableOpacity>
      );
    } else {
      return (<View/>);
    }

  }

  renderAuthorName(comment) {
    if(comment.comment_parent_author_name != undefined && comment.comment_parent_author_name != null) {
      return (<View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.username}>{comment.comment_author_name}</Text>
                <Text style={{fontSize: 14, color: '#9B9B9B', bottom: 1}}> 回复 </Text>
                <Text style={styles.username}>{comment.comment_parent_author_name}</Text>
              </View>
            );
    } else {
      return (<Text style={styles.username}>{comment.comment_author_name}</Text>);
    }

  }

  renderRow(comment, caller) {
    if(comment == null || comment == undefined) {
      return (<View />);
    } else {
      if(caller == 'FeedCell') {
        return(
              <View style={styles.commentBox}>
                <Image style={styles.avatar} source={{uri:URLConf.IMG_BASE_URL+comment.comment_author_avatar+avatar_thumbnail}} />
                <View style={{flex:1}}>
                    {this.renderAuthorName(comment)}
                    <Text style={styles.comment}>{comment.comment_content}</Text>
                </View>
              </View>
        );
      } else if(caller == 'FeedDetail') {
        return(
          <CommentCell comment={comment} reply={this.props.reply}/>
        );
      }
    }
  }
};

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
    marginLeft:8,
    marginRight:8,
    paddingTop: 0,
  },
  commentBox: {
    flex: 1,
    flexDirection: 'row',
    //borderColor: 'black',
    //borderWidth: 1,
    padding: 10,
    paddingBottom: 4,
  },
  avatar: {
    borderRadius: 16,
    width: 32,
    height: 32,
    marginRight: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    // lineHeight: 13,
    marginBottom: 4,
  },
  commentTime: {

  },
  comment: {
    fontSize: 14,
    color: '#030303',
    lineHeight: 18,
  },
});

module.exports = CommentList;
