'use strict';

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';

import URLConf from '../api/URLConf';
import {formatDate} from '../util/DateUtil';
import CommentList from './CommentList';
import FeedActions from './FeedActions';
import TagDetail from './TagDetail';

const windowWidth = Dimensions.get('window').width;
const margin = 20;
const imgInterval = 5;

const img_thumbnail = '?imageView2/1/w/200/h/200';
const avatar_thumbnail = '?imageView2/1/w/100/h/100';
const img_thumbnail_l = '?imageView2/1/w/1000/h/1000';

export default class FeedCell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      likeCounter: this.props.feed.like_count,
      isLiked: this.props.feed.is_like,
    };
  }

  renderFeedImages(content) {
    if(content == null) return [];
    var images = content.split(":");
    var imagesView = [];
    if(images.length == 2) {
      return (<Image source={{uri:URLConf.IMG_BASE_URL + images[0] + img_thumbnail_l}} style={styles.feedContentImageLarge}/>);
    } else {
      for(var i=0; i<images.length-1; i++) {
        imagesView.push(<Image source={{uri:URLConf.IMG_BASE_URL + images[i] + img_thumbnail}} style={styles.feedContentImage}/>);
      }
    }
    return imagesView;
  }

  nav2FeedDetail() {
    const {feed} = this.props;
    const {navigate} = this.props.navigation;
    const incrLikeCount = this.incrLikeCount;
    navigate(
      'FeedDetail',
      {
        feed: feed,
        navigate: navigate,
        isLiked: this.state.isLiked,
        likeCounter: this.state.likeCounter,
        incrLikeCount: ()=>this.incrLikeCount(),
        decrLikeCount: ()=>this.decrLikeCount(),
      }
    );
  }

  incrLikeCount() {
    console.log('increing like count in feedcell');
    this.setState({
      likeCounter: this.state.likeCounter+1,
      isLiked: true,
    });
  }

  decrLikeCount() {
    console.log('decreasing like count in feedcell');
    this.setState({
      likeCounter: this.state.likeCounter-1,
      isLiked: false,
    });
  }

  renderMetas(feed){
      return(
        <View style={{flex :1}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {/* {feed.tags && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tagsContainer}>
              {
                feed.tags_list.map(tag =>
                    <TouchableOpacity
                      onPress={() => this.nav2TagDetail(tag)}>
                      <Text style={{fontSize: 14, color: '#9B9B9B', marginRight: 5}}>{tag.tag}</Text>
                    </TouchableOpacity>)
              }
              </ScrollView>
            } */}
            <FeedActions
              {...this.props}
              feed={feed}
              isLiked={this.state.isLiked}
              likeCounter={this.state.likeCounter}
              commentCounter={feed.comment_count}
              nav2FeedDetail={()=>this.nav2FeedDetail()}
              incrLikeCount={()=>this.incrLikeCount()}
              decrLikeCount={()=>this.decrLikeCount()}
              />
          </View>
          {/*
          <CommentList
            object_type={feed.object_type}
            object_id={feed.object_id}
            commented={false}
            commentCounter={feed.comment_count}
            limit={3}
            nav2FeedDetail={()=>this.nav2FeedDetail()}
            caller={'FeedCell'}
          />
          */}
        </View>
      );
  }

  renderFeedContent(feed) {
    if(feed.summary == null || feed.summary.length == 0) {
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
  }

  selectFeed(feed, avatarCanClick=true) {
    const {navigate} = this.props.navigation;
    navigate(
      'FeedDetail',
      {
        feed: feed,
        isLiked: this.state.isLiked,
        likeCounter: this.state.likeCounter,
        navigate: navigate,
        incrLikeCount: ()=>this.incrLikeCount(),
        decrLikeCount: ()=>this.decrLikeCount(),
      }
    );
  }

  pressAvatar(feed) {
    const {navigate} = this.props.navigation;
    navigate(
      'UserDetail',
      {
        navigate: navigate,
        title: feed.user_name,
        feed: feed,
      }
    );
    // this.props.navigator.push({
    //   title: feed.user_name,
    //   component: HomePage,
    //   params: {userName: feed.user_name, userId: feed.user_id,navigator,avatar: feed.user_avatar, selectFeed:this.selectFeed, nav2TagDetail:this.nav2TagDetail},
    // });
  }

  render(){
    console.log('feed in feedcell:'+this.props.feed.user_avatar);
    return (
      <View>
        <TouchableOpacity
          onPress={()=>this.selectFeed(this.props.feed)}>
          <View style={styles.container}>
              <View style={styles.feedHeader}>
                  <View>
                    <TouchableOpacity onPress={()=>this.pressAvatar(this.props.feed)}>
                      <Image source={{uri:URLConf.IMG_BASE_URL + this.props.feed.user_avatar + avatar_thumbnail}} style={styles.avatar}/>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.feedUserInfo}>
                    <Text style={styles.feedUserName}>{this.props.feed.user_name}</Text>
                    <Text style={styles.feedTime}>{formatDate(this.props.feed.ts)}</Text>
                    {/* <Text style={styles.feedTime}>{this.props.feed.id+' '+this.props.page}</Text> */}
                  </View>
              </View>
              <View style={styles.feedContent}>
                {this.renderFeedContent(this.props.feed)}
              </View>
              {this.renderMetas(this.props.feed)}

          </View>

        </TouchableOpacity>

      </View>
    )
  }

};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 0,
    paddingBottom: 10,
    backgroundColor: 'white',
    //borderTopWidth: 0.5,
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
    marginTop: 2,
    marginBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 16,
  },
  feedTime: {
    fontSize: 12,
    color: '#7B7C84',
    lineHeight: 12,
    marginTop: 5,
  },

  feedContent: {
    flex: 1,
  },
  feedContentText: {
    flex: 1,
    textAlign: 'justify',
    margin: margin,
    marginTop: -10,
    fontSize: 16,
    color: '#333333',
    lineHeight: 20,
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
  feedContentImageLarge: {
    width: (windowWidth),
    height:(windowWidth),
    marginLeft: -20,
    marginBottom: imgInterval,
    marginRight: imgInterval,
  },
  feedActions:{
    //borderWidth: 1,
    //borderTopColor: '#EEEEEE',
    flex :1,
    flexDirection: 'row',
    //marginTop: 15,
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
  tagsContainer: {
    flex: 2,
    marginLeft: 20,
    marginTop: 10,

  }
});

// module.exports = FeedCell;
