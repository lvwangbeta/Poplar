'use strict';

import React from 'react';
import {
  Image,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  Modal,
  ScrollView,
  Dimensions
} from 'react-native';

var LikeAction = require('./component/actions/Like');
var CommentAction = require('./component/actions/Comment');
var CommentBar = require('./component/CommentBar');
var CommentList = require('./CommentList');
var PhotoSwiper = require('./component/PhotoSwiper');

const windowWidth = Dimensions.get('window').width;
const margin = 20;
const imgInterval = 5;

const IMAGE_BASE_URL = 'http://ogj1ador4.bkt.clouddn.com/';
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
    });
  },

  renderFeedImages: function(content) {
    if(content == null) return [];
    var images = content.split(":");
    var imagesView = [];
    for(var i=0; i<images.length-1; i++) {
        imagesView.push(<Image source={{uri:IMAGE_BASE_URL + images[i] + img_thumbnail}} style={styles.feedContentImage}/>);
    }
    return imagesView;
  },

  back: function(){
    this.props.navigator.pop();
  },


  renderCommentTip : function(commentCounter) {
    if(commentCounter > 0) {
      return (
        <View>
          <Image style={{marginTop:5}} source={require('./imgs/triangle.png')} />
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

  render: function(){
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ScrollView>
          {this.props.feed.content && <PhotoSwiper imgList={this.props.feed.content.slice(0,-1).split(':')}
            showViewer={this.state.showViewer}
            showIndex={this.state.showIndex}
            viewerPressHandle={this.viewerPressHandle}/>
          }
          <View style={styles.container}>
              <View style={styles.feedHeader}>
                  <View>
                    <TouchableOpacity onPress={this.props.pressAvatar}>
                      <Image source={{uri:IMAGE_BASE_URL + this.props.feed.user_avatar + avatar_thumbnail}} style={styles.avatar}/>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.feedUserInfo}>
                    <Text style={styles.feedUserName}>Kevin</Text>
                    <Text style={styles.feedTime}>2015-1-5</Text>
                  </View>
              </View>
              <View style={styles.feedContent}>
                  <Text style={styles.feedContentText}>{this.props.feed.summary}</Text>

                  {this.props.feed.content &&
                  <View style={styles.feedContentImages}>
                    {
                      this.props.feed.content.split(':').map((item, i) =>
                      <View style={styles.feedContentImage}>
                        <TouchableOpacity key={i} onPress={e => this.thumbPressHandle(i)}>
                          <Image source={{uri:IMAGE_BASE_URL + item + img_thumbnail}} style={styles.feedContentImage}/>
                        </TouchableOpacity>
                      </View>
                      )
                    }
                  </View>
                }
              </View>
          </View>

          <View style={styles.feedActions}>
              <View style={{flex:1}}></View>
              <View style={styles.feedActionComment}>
                <CommentAction counter={this.state.commentCounter} showCommentBar={this.showCommentBar}/>
                {this.renderCommentTip(this.state.commentCounter)}
              </View>
              <View style={styles.feedActionLike}>
                <LikeAction counter={this.props.feed.like_count} />
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
          />

        </ScrollView>
        {this.renderCommentBar()}
      </View>
    )
  },

});

var styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    //margin: 10,
    //borderRadius: 2,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderLeftWidth:0,
    borderRightWidth: 0,
    borderBottomWidth:0,
  },
  feedHeader: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
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
    margin: 10,
    fontSize: 15,
    color: '#333333',
    lineHeight: 19,
    flex: 1,
  },
  feedContentSingleImage: {
    flex: 1,
    height:170,
  },
  feedContentImages: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginBottom: 10,
  },
  feedContentImage: {
    width: (windowWidth-margin*2-imgInterval*2) / 3,
    height:(windowWidth-margin*2-imgInterval*2) / 3,
    marginBottom: imgInterval,
    marginRight: imgInterval,
  },

  thumbnail: {
    flex: 1,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  listView: {
    paddingTop: 70,
    backgroundColor: 'white',
  },
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
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height:50,
    backgroundColor: '#00B5AD',
  },
  navBack: {
    marginLeft:10,
    marginTop:23,
  },
  navTitle: {
    alignSelf:'center',
    marginTop: 10,
  },
  navRight: {
    marginRight:10,
    marginTop:23,
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

module.exports = FeedDetail;
