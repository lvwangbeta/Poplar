'use strict';

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions
} from 'react-native';

import URLConf from '../api/URLConf';
import BackBtn from './navbar/BackBtn';
import ShareBtn from './navbar/ShareBtn';
import ShareModal from './ShareModal';
import NavigationBar from 'react-native-navbar';
import LikeAction from './actions/Like';
import CommentAction from './actions/Comment';
import CommentBar from './CommentBar';
import CommentList from './CommentList';
import PhotoSwiper from './PhotoSwiper';
import TagDetail from './TagDetail';
import HomePage from './HomePage';
import PoplarEnv from '../util/PoplarEnv';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const margin = 20;
const imgInterval = 5;

const IMAGE_BASE_URL = URLConf.IMG_BASE_URL;
const img_thumbnail = '?imageView2/1/w/200/h/200';
const avatar_thumbnail = '?imageView2/1/w/100/h/100'

var FeedDetail = React.createClass({

  getInitialState: function() {
    return ({
      isComment: false,
      comment: null,
      commentBarVisible: false,
      commentCounter: this.props.feed.comment_count,
      commentParent:null,
      showViewer: false,
      showIndex: 0,
      shareModalVisible:false,
    });
  },

  renderFeedImages: function(content) {
    return this.props.feed.content.slice(0,-1).split(':').map((item, i) =>
            <View style={styles.feedContentImage}>
              <TouchableOpacity key={i} onPress={e => this.thumbPressHandle(i)}>
                <Image source={{uri:IMAGE_BASE_URL + item + img_thumbnail}} style={styles.feedContentImage}/>
              </TouchableOpacity>
            </View>
          );
  },

  back: function(){
    this.props.navigator.pop();
  },


  renderCommentTip : function(commentCounter) {
    if(commentCounter > 0) {
      return (
        <View>
          <Image style={{marginTop:5}} source={require('../imgs/triangle.png')} />
        </View>
      );
    } else {
      return (<View />);
    }
  },

  pushNewComment2List: function(comment) {
    this.setState({
      commentCounter: this.state.commentCounter + 1,
      comment: comment,
    });
  },

  renderCommentBar: function() {
    if(this.state.commentBarVisible) {
      return (<CommentBar
                commentParent={this.state.commentParent}
                commentObjectType={this.props.feed.object_type}
                commentObjectId={this.props.feed.object_id}
                visible={true}
                pushNewComment2List={this.pushNewComment2List}
                hideCommentBar={this.hideCommentBar}/>);
    } else {
      return (<View/>);
    }
  },

  showCommentBar: function() {
    this.setState({
      commentParent:null,
      commentBarVisible: true,
    });
  },

  hideCommentBar: function() {
    this.setState({
      isComment: false,
      commentBarVisible: false,
    });
  },

  reply: function(comment) {
    this.setState({
      commentBarVisible: true,
      commentParent:comment,
    });
  },

  viewerPressHandle: function() {
    this.setState({
      showViewer: false
    })
  },

  thumbPressHandle: function(i) {
    this.setState({
      showViewer: true,
      showIndex: i,
    });
  },

  renderFeedContent: function(feed) {
    if(this.props.feed.object_type == PoplarEnv.COMMENT_OBJ_TYPE.ALBUM) {
      return (
        <View>
          <Text style={styles.feedContentText}>{this.props.feed.summary}</Text>
          <View style={styles.feedContentImages}>{this.renderFeedImages(this.props.feed.content)}</View>
        </View>
      );
    }
    //short post
    return (
      <View>
        <Text style={styles.feedContentText}>{this.props.feed.summary}</Text>
      </View>
    );
  },

  pressAvatar: function() {
    let {navigator,feed} = this.props;
    this.props.navigator.push({
      title: feed.user_name,
      component: HomePage,
      params: {token: this.props.token, refresh:this.props.refresh}
      //passProps: {feed:feed, nav2TagDetail:this.nav2TagDetail},
    });
  },

  hideShareModal: function() {
    this.setState({
      shareModalVisible: false,
    });
  },

  render: function(){
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
        {this.state.shareModalVisible && <ShareModal hideShareModal={this.hideShareModal}/>}
        <NavigationBar style={{borderBottomWidth: 0.5, borderBottomColor: '#F3F3F3'}}
                       title={{title: '正文'}}
                       leftButton={<BackBtn onPress={()=>this.props.navigator.pop()}/>}
                       rightButton={<ShareBtn onPress={()=>{this.setState({shareModalVisible: true})}}/>}/>
        <ScrollView>
          {this.props.feed.content && <PhotoSwiper imgList={this.props.feed.content.slice(0,-1).split(':')}
            showViewer={this.state.showViewer}
            showIndex={this.state.showIndex}
            viewerPressHandle={this.viewerPressHandle}/>
          }
          <View style={styles.container}>
              <View style={styles.feedHeader}>
                  <View>
                  {
                    this.props.avatarCanClick ?
                    <TouchableOpacity onPress={() => this.pressAvatar()}>
                      <Image source={{uri:IMAGE_BASE_URL + this.props.feed.user_avatar + avatar_thumbnail}} style={styles.avatar}/>
                    </TouchableOpacity> :
                    <TouchableOpacity>
                      <Image source={{uri:IMAGE_BASE_URL + this.props.feed.user_avatar + avatar_thumbnail}} style={styles.avatar}/>
                    </TouchableOpacity>
                  }

                  </View>
                  <View style={styles.feedUserInfo}>
                    <Text style={styles.feedUserName}>{this.props.feed.user_name}</Text>
                    <Text style={styles.feedTime}>2015-1-5</Text>
                  </View>
              </View>
              {this.renderFeedContent()}
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              {this.props.feed.tags && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tagsContainer}>
                {
                  this.props.feed.tags.map(tag => <TouchableOpacity
                                                    onPress={() => this.props.nav2TagDetail(tag)}>
                                                    <Text style={{color: '#9B9B9B', marginRight: 5}}>{tag.tag}</Text>
                                                  </TouchableOpacity>)
                }
                </ScrollView>
              }
            </View>
            <View style={styles.feedActions}>
                <View style={{flex:1}}></View>
                <View style={styles.feedActionComment}>
                  <CommentAction counter={this.state.commentCounter} showCommentBar={this.showCommentBar} refresh={this.props.refresh}/>
                  {this.renderCommentTip(this.state.commentCounter)}
                </View>
                <View style={styles.feedActionLike}>
                  <LikeAction feed={this.props.feed} counter={this.props.feed.like_count} refresh={this.props.refresh}/>
                </View>
            </View>
          </View>

          <CommentList
            secret={this.props.secret}
            token={this.props.token}
            object_type={this.props.feed.object_type}
            object_id={this.props.feed.object_id}
            liked={false}
            commented={false}
            likeCounter={6}
            commentCounter={this.state.commentCounter}
            newComment={this.state.comment}
            from={'FeedDetail'}
            reply={this.reply}
            refresh={this.props.refresh}
          />

        </ScrollView>
        {this.renderCommentBar()}

      </View>
    )
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
  },

  feedHeader: {
    flex: 1,
    flexDirection: 'row',
    margin: margin,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  feedUserInfo: {
    marginLeft: 10,
  },

  feedUserName: {
    marginTop: 3,
    fontSize: 17,
    color: '#00B5AD',
    lineHeight: 18,
  },
  feedTime: {
    fontSize: 15,
    color: '#7B7C84',
    lineHeight: 15,
    marginTop: 5,
  },

  feedContent: {
  },
  feedContentText: {
    flex: 1,
    margin: margin,
    marginTop: -10,
    fontSize: 15,
    color: '#333333',
    lineHeight: 19,
  },
  feedContentSingleImage: {
    flex: 1,
    height:170,
  },
  feedContentImages: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: margin,
  },
  feedContentImage: {
    width: (windowWidth-margin*2-imgInterval*2) / 3,
    height:(windowWidth-margin*2-imgInterval*2) / 3,
    marginBottom: imgInterval,
    marginRight: imgInterval,
  },
  feedActions:{
    //borderWidth: 1,
    //borderTopColor: '#EEEEEE',
    flex :1,
    flexDirection: 'row',
    padding: 20,
    paddingTop: 5,
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
  thumbnail: {
    flex: 1,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  tagsContainer: {
    flex: 3,
    marginLeft: 20,
    marginTop: 10,
  }
});

module.exports = FeedDetail;
