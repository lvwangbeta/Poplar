'use strict';

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import LikeAction from './Like';

export default class FeedActions extends Component{

  constructor(props) {
    super(props);
    this.state = {
      likeCounter: this.props.likeCounter,
      isLiked: this.props.isLiked,
    };
  }

  renderCommentTip(commentCounter) {
    if(commentCounter > 0) {
      return (
        <View>
          <Image style={{marginTop:5}} source={require('../imgs/triangle.png')} />
        </View>
      );
    } else {
      return (<View />);
    }
  }

  render() {
    return (
      <View style={styles.feedActions}>
          {/* <View style={{flex:1}}></View> */}
          <View style={styles.feedActionComment}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={()=>this.props.nav2FeedDetail()}>
                  <Image style={{width:24, height:24, marginRight: 4}} source={require('../imgs/chat.png')} />
                </TouchableOpacity>
                <Text style={{top: 4, left: 2}}>{this.props.commentCounter!=0&&this.props.commentCounter}</Text>
              </View>
            </View>
            {/* {this.renderCommentTip(this.props.commentCounter)} */}
          </View>
          <View style={styles.feedActionLike}>
            <LikeAction feed={this.props.feed}
                        isLiked={this.props.isLiked}
                        counter={this.props.likeCounter}
                        incrLikeCount={this.props.incrLikeCount}
                        decrLikeCount={this.props.decrLikeCount}
                        from={'FeedCell'}/>
          </View>
      </View>
    );
  }
};


var styles = StyleSheet.create({
  feedActions:{
    flex: 1,
    flexDirection: 'row',
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 14,
  },
  feedActionComment: {
    width: 50,
    padding: 4,
    marginRight: 4,
  },
  feedActionLike: {
    width: 50,
    padding: 4,
    marginRight: 4,
  },
});

// module.exports = FeedActions;
