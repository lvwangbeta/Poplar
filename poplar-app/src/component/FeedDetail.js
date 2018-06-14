'use strict';

import React, { Component } from 'react';
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
// import ShareBtn from './navbar/ShareBtn';
// import ShareModal from './ShareModal';
import NavigationBar from 'react-native-navbar';
import LikeAction from './Like';
import CommentAction from './Comment';
import CommentBar from './CommentBar';
import CommentList from './CommentList';
import PhotoSwiper from './PhotoSwiper';
import TagDetail from './TagDetail';
// import HomePage from './HomePage';
import PoplarEnv from '../util/PoplarEnv';
import {formatDate} from '../util/DateUtil';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const margin = 20;
const imgInterval = 5;

const IMAGE_BASE_URL = URLConf.IMG_BASE_URL;
const img_thumbnail = '?imageView2/1/w/200/h/200';
const img_thumbnail_l = '?imageView2/1/w/1000/h/1000';
const avatar_thumbnail = '?imageView2/1/w/100/h/100'

export default class FeedDetail extends Component{

  constructor(props) {
    super(props);
    this.state = {
      params: this.props.navigation.state.params,
      isComment: false,
      comment: null,
      commentBarVisible: false,
      commentCounter: this.props.navigation.state.params.feed.comment_count,
      commentParent:null,
      showViewer: false,
      showIndex: 0,
      shareModalVisible:false,
      isLiked: this.props.navigation.state.params.feed.is_like,
      likeCounter: this.props.navigation.state.params.feed.like_count,
    };
    console.log('likeCounter:'+this.state.likeCounter);
  }

  incrLikeCount() {
    console.log('increing like count in FeedDetail:' + this.state.likeCounter + " -> " + (this.state.likeCounter + 1));
    this.setState({
      likeCounter : this.state.likeCounter + 1,
      isLiked: true,
    });
    this.props.navigation.state.params.incrLikeCount();
  }

  decrLikeCount() {
    console.log('decreasing like count in FeedDetail:' + this.state.likeCounter + " -> " + (this.state.likeCounter - 1));
    this.setState({
      likeCounter: this.state.likeCounter - 1,
      isLiked: false,
    });
    this.props.navigation.state.params.decrLikeCount();
  }

  renderFeedImages(content) {
    if(content == null) return [];
    var images = content.split(":");
    var imagesView = [];
    if(images.length == 2) {
      return (<Image source={{uri:URLConf.IMG_BASE_URL + images[0] + img_thumbnail_l}} style={styles.feedContentImageLarge}/>);
    } else {
      for(let i=0; i<images.length-1; i++) {
        imagesView.push(<View style={styles.feedContentImage}>
                          <TouchableOpacity key={i} onPress={e => this.thumbPressHandle(i)}>
                            <Image source={{uri:IMAGE_BASE_URL + images[i] + img_thumbnail}} style={styles.feedContentImage}/>
                          </TouchableOpacity>
                        </View>);
      }
    }
    return imagesView;
  }

  back(){
    this.props.navigation.goBack();
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

  pushNewComment2List(comment) {
    this.setState({
      commentCounter: this.state.commentCounter + 1,
      comment: comment,
    });
  }

  renderCommentBar() {
    if(this.state.commentBarVisible) {
      return (<CommentBar
                commentParent={this.state.commentParent}
                commentObjectType={this.state.params.feed.object_type}
                commentObjectId={this.state.params.feed.object_id}
                visible={true}
                pushNewComment2List={(comment)=>this.pushNewComment2List(comment)}
                hideCommentBar={()=>this.hideCommentBar()}/>);
    } else {
      return (<View/>);
    }
  }

  showCommentBar() {
    this.setState({
      commentParent:null,
      commentBarVisible: true,
    });
  }

  hideCommentBar() {
    this.setState({
      isComment: false,
      commentBarVisible: false,
    });
  }

  reply(comment) {
    this.setState({
      commentBarVisible: true,
      commentParent:comment,
    });
  }

  viewerPressHandle() {
    this.setState({
      showViewer: false
    })
  }

  thumbPressHandle(i) {
    this.setState({
      showViewer: true,
      showIndex: i,
    });
  }

  renderFeedContent(feed) {
    if(this.state.params.feed.object_type == PoplarEnv.COMMENT_OBJ_TYPE.ALBUM) {
      return (
        <View>
          {this.state.params.feed.summary != '' && <Text style={styles.feedContentText}>{this.state.params.feed.summary}</Text>}
          <View style={styles.feedContentImages}>{this.renderFeedImages(this.state.params.feed.content)}</View>
        </View>
      );
    }
    //short post
    return (
      <View>
        <Text style={styles.feedContentText}>{this.state.params.feed.summary}</Text>
      </View>
    );
  }

  pressAvatar() {
    let {navigator,feed} = this.props;
    this.props.navigator.push({
      title: feed.user_name,
      component: HomePage,
      params: {token: this.props.token, refresh:this.props.refresh}
      //passProps: {feed:feed, nav2TagDetail:this.nav2TagDetail},
    });
  }

  hideShareModal() {
    this.setState({
      shareModalVisible: false,
    });
  }

  nav2TagDetail(tag) {
    const {navigate} = this.props.navigation;
    navigate(
      'TagDetail',
      {
        tag: tag,
        navigate: navigate,
      }
    );
  }

  render(){
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
        {/* {this.state.shareModalVisible && <ShareModal hideShareModal={this.hideShareModal}/>} */}
        {!this.state.showViewer &&
          <NavigationBar style={{borderBottomWidth: 0.5, borderBottomColor: '#F3F3F3'}}
                         title={{title: '正文'}}
                         leftButton={<BackBtn onPress={()=>this.props.navigation.goBack()}/>}
                         // rightButton={<ShareBtn onPress={()=>{this.setState({shareModalVisible: true})}}/>}
                       />
        }
        <ScrollView>
          {this.state.params.feed.content && <PhotoSwiper imgList={this.state.params.feed.content.slice(0,-1).split(':')}
            showViewer={this.state.showViewer}
            showIndex={this.state.showIndex}
            viewerPressHandle={()=>this.viewerPressHandle()}/>
          }
          {!this.state.showViewer &&
            <View>
              <View style={styles.container}>
                  <View style={styles.feedHeader}>
                      <View>
                      {
                        this.props.avatarCanClick ?
                        <TouchableOpacity onPress={() => this.pressAvatar()}>
                          <Image source={{uri:IMAGE_BASE_URL + this.state.params.feed.user_avatar + avatar_thumbnail}} style={styles.avatar}/>
                        </TouchableOpacity> :
                        <TouchableOpacity>
                          <Image source={{uri:IMAGE_BASE_URL + this.state.params.feed.user_avatar + avatar_thumbnail}} style={styles.avatar}/>
                        </TouchableOpacity>
                      }

                      </View>
                      <View style={styles.feedUserInfo}>
                        <Text style={styles.feedUserName}>{this.state.params.feed.user_name}</Text>
                        <Text style={styles.feedTime}>{formatDate(this.state.params.feed.ts)}</Text>
                      </View>
                  </View>
                  {this.renderFeedContent()}
              </View>

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  {this.state.params.feed.tags && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tagsContainer}>
                    {
                      this.state.params.feed.tags_list.map(tag => <TouchableOpacity
                                                        onPress={() => this.nav2TagDetail(tag)}>
                                                        <Text style={{color: '#9B9B9B', marginRight: 5}}>{tag.tag}</Text>
                                                      </TouchableOpacity>)
                    }
                    </ScrollView>
                  }
                </View>
                <View style={styles.feedActions}>
                    <View style={{flex:1}}></View>
                    <View style={styles.feedActionComment}>
                      <CommentAction counter={this.state.commentCounter} showCommentBar={()=>this.showCommentBar()} />
                      {/* {this.renderCommentTip(this.state.commentCounter)} */}
                    </View>
                    <View style={styles.feedActionLike}>
                      <LikeAction feed={this.state.params.feed}
                                  isLiked={this.state.params.isLiked}
                                  counter={this.state.params.likeCounter}
                                  incrLikeCount={()=>this.incrLikeCount()}
                                  decrLikeCount={()=>this.decrLikeCount()}
                                  isLikedInDetail={this.state.isLiked}
                                  from={'FeedDetail'}/>
                    </View>
                </View>
              </View>

              <CommentList
                object_type={this.state.params.feed.object_type}
                object_id={this.state.params.feed.object_id}
                liked={false}
                commented={false}
                commentCounter={this.state.commentCounter}
                newComment={this.state.comment}
                reply={(comment)=>this.reply(comment)}
                caller={'FeedDetail'}
              />
          </View>
          }
        </ScrollView>
        {this.renderCommentBar()}

      </View>
    )
  }

}

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
  },
  feedContentText: {
    flex: 1,
    margin: margin,
    marginTop: -10,
    fontSize: 16,
    color: '#333333',
    lineHeight: 18,
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
