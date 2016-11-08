'use strict';

import React from 'react';
import {
  Image,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  Dimensions
} from 'react-native';
var LikeAction = require('./component/actions/Like');
var CommentAction = require('./component/actions/Comment');
var CommentList = require('./CommentList');

const windowWidth = Dimensions.get('window').width;
const margin = 20;
const imgInterval = 5;

var IMAGE_BASE_URL = 'http://7xkkim.com1.z0.glb.clouddn.com/';

var FeedCell = React.createClass({

  renderFeedImages: function(content) {
    if(content == null) return [];
    var images = content.split(":");
    var imagesView = [];
    for(var i=0; i<images.length-1; i++) {
        imagesView.push(<Image source={{uri:IMAGE_BASE_URL + images[i]}} style={styles.feedContentImage}/>);
    }
    return imagesView;
  },

  renderCommentList: function(){
      return(
        <CommentList
          secret={this.props.secret}
          token={this.props.token}
          object_type={this.props.feed.object_type}
          object_id={this.props.feed.object_id}
          liked={false}
          commented={false}
          likeCounter={this.props.feed.like_count}
          commentCounter={this.props.feed.comment_count}
          callbackParentSetReplyModalVisible={this.setReplyModalVisible}
          limit={5}
        />
      );
  },

  renderFeedContent: function(feed) {
    if(feed.summary == null) {
      return (
        <View style={styles.feedContentImages}>{this.renderFeedImages(this.props.feed.content)}</View>
      );
    }
    return (
      <View>
        <Text style={styles.feedContentText}>{this.props.feed.summary}</Text>
        <View style={styles.feedContentImages}>{this.renderFeedImages(this.props.feed.content)}</View>
      </View>
    );
  },

  render: function(){
    return (
      <View>
        <TouchableHighlight
          onPress={this.props.onSelect}>
          <View style={styles.container}>
              <View style={styles.feedHeader}>
                  <Image source={{uri:IMAGE_BASE_URL + this.props.feed.user_avatar}} style={styles.avatar}/>
                  <View style={styles.feedUserInfo}>
                    <Text style={styles.feedUserName}>Kevin</Text>
                    <Text style={styles.feedTime}>2015-1-5</Text>
                  </View>
              </View>
              <View style={styles.feedContent}>
                {this.renderFeedContent(this.props.feed)}
              </View>

              {/*
              <View style={styles.feedActions}>
                  <View style={{flex:1}}></View>
                  <View style={styles.feedActionComment}>
                    <CommentAction counter={this.props.feed.comment_count} callbackParentSetReplyModalVisible={this.setReplyModalVisible}/>
                    {this.renderCommentList(this.props.feed.comment_count)}
                  </View>
                  <View style={styles.feedActionLike}>
                    <LikeAction counter={this.props.feed.like_count} />
                  </View>
              </View>
              */}
              {this.renderCommentList()}

          </View>

        </TouchableHighlight>

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
    marginBottom: 10,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#EEEEEE',
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
    marginTop: -30,
    marginLeft: margin,
  },
  feedContentImage: {
    width: (windowWidth-margin*2-imgInterval*2) / 3,
    height:(windowWidth-margin*2-imgInterval*2) / 3,
    marginRight: imgInterval,
  },
  feedActions:{
    //borderWidth: 1,
    //borderTopColor: '#EEEEEE',
    flex :1,
    flexDirection: 'row',
    marginTop: 15,
    marginRight: margin,
    marginBottom: 5,
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
  listView: {
    paddingTop: 70,
    backgroundColor: 'white',
  },
});

module.exports = FeedCell;
