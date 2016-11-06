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
  View
} from 'react-native';

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
                  <Text style={styles.feedContentText}>{this.props.feed.summary}</Text>
                  <View style={styles.feedContentImages}>{this.renderFeedImages(this.props.feed.content)}</View>
              </View>

              <View style={styles.feedActions}>
                  <View style={styles.feedActionShare}><Text>share</Text></View>
                  <View style={styles.feedActionComment}><Text>comment</Text></View>
                  <View style={styles.feedActionLike}><Text>like</Text></View>
              </View>
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
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#EEEEEE',
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
    width: 100,
    height:100,
    margin:1.5,
  },
  feedActions:{
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
  },
  feedActionShare: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#EEEEEE',
  },
  feedActionComment: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedActionLike: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#EEEEEE',
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
