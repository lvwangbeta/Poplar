import React from 'react';

import {
  View,
  Image,
  Text,
  Modal,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

var LikeAction = require('./Like');

var FeedActions = React.createClass({

  pressComment: function() {
    //this.props.showCommentBar();
    this.props.push2FeedDetail();
  },

  renderCommentTip : function(commentCounter) {
    if(commentCounter > 0) {
      return (
        <View>
          <Image style={{marginTop:5}} source={require('../../imgs/triangle.png')} />
        </View>
      );
    } else {
      return (<View />);
    }
  },

  render: function() {
    return (
      <View style={styles.feedActions}>
          <View style={{flex:1}}></View>
          <View style={styles.feedActionComment}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <TouchableHighlight onPress={this.pressComment}>
                  <Image style={{marginRight: 5}} source={require('../../imgs/ios7-chatbubble-outline.png')} />
                </TouchableHighlight>
                <Text>{this.props.commentCounter}</Text>
              </View>
            </View>
            {this.renderCommentTip(this.props.commentCounter)}
          </View>
          <View style={styles.feedActionLike}>
            <LikeAction counter={this.props.likeCounter} />
          </View>
      </View>
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

module.exports = FeedActions;
