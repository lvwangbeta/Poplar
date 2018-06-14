'use strict';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  AsyncStorage
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';
var CustomTabBar = require('./CustomTabBar');
import PoplarEnv from '../util/PoplarEnv';
import Md5 from '../util/Md5';
import Secret from '../util/Secret';
import {getToken} from '../util/Secret';
import FeedCell from './FeedCell';
import {getFeedsOfUser} from '../api/FeedAPI';
import {getUserInfo} from '../util/Secret';
import URLConf from '../api/URLConf';
import Followings from './Followings';
import Followers from './Followers';
import FollowBtn from './FollowBtn';
import FeedList from './FeedList';
const avatar_thumbnail = '?imageView2/1/w/100/h/100';
const windowWidth = Dimensions.get('window').width;

export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.navigation.state.params.feed.user_name,
      avatar: this.props.navigation.state.params.feed.user_avatar,
      userId: this.props.navigation.state.params.feed.user_id,
      feeds:[],
      feedId: 0,
    };
  }

  componentDidMount() {

    // getUserInfo((user) => {
    //   this.setState({userName:user.userName, avatar: user.avatar});
    //   getFeedsOfUser(user.userId, this.state.feeds, this.state.feedId, 10, (result, feeds, noMore) => {
    //     console.log('result:'+result+' hasnoMore:'+noMore+ ' userFeeds'+feeds);
    //     if(result) {
    //       if(!noMore) {
    //         this.setState({
    //           feeds: feeds,
    //           feedId: feeds[feeds.length-1].id,
    //         });
    //       } else {
    //       }
    //
    //     }
    //   });
    // });
  }


  renderAvatar() {
    return (
      <TouchableOpacity>
          <Image source={{uri:URLConf.IMG_BASE_URL + this.state.avatar + avatar_thumbnail}} style={styles.avatar}/>
      </TouchableOpacity>
    );
  }

  header() {
    return (
      <View style={styles.minecard}>
        <View>
          <Image resizeMode='cover' style={styles.background} source={require('../imgs/tag1.jpg')} />
          {this.renderAvatar()}
        </View>
        <View style={styles.metas}>
          <View style={styles.desc}>
            <Text style={styles.name}>{this.state.userName}</Text>
            <Text style={styles.motto}>你好吗? 我很好</Text>
            <FollowBtn uid={this.state.userId}/>
          </View>
          {/* <View
            style={{flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderBottomColor: '#F3F3F3',
                    marginTop: 10,
                    paddingBottom: 10,}}>
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}><Text>12</Text><Text>关注</Text></View>
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}><Text>56</Text><Text>粉丝</Text></View>
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}><Text>108</Text><Text>状态</Text></View>
          </View> */}
          <ScrollableTabView
                 initialPage={2}
                 renderTabBar={() => <CustomTabBar/>}>
                 <Followings tabLabel='12 关注'/>
                 <Followers tabLabel='56 粉丝' />
                 <FeedList tabLabel='108 状态' caller={'user'} uid={this.state.userId} />
          </ScrollableTabView>
        </View>
      </View>
    );
  }

  renderFeed(feed) {
    // for(let key in feed) {
    //   console.log('key:'+key+' value:'+feed[key]);
    //   for(let j in feed[key]) {
    //     console.log('key in:'+j+' value in:'+feed[key][j]);
    //   }
    // }
    return(
      <FeedCell
        // {...this.props}
        // onSelect={() => this.selectFeed(feed)}
        feed={feed.item}
        // page={this.state.page}
        // pressAvatar={() =>this.pressAvatar(feed)}
      />
    );
  }

  render() {
    return(
      <FlatList
        style={styles.container}
        //data={this.state.feeds}
        ListHeaderComponent={()=>this.header()}
      />
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listView: {
    //marginTop: 65,
    backgroundColor: 'white',
  },
  minecard: {
    position: 'relative',
  },
  background: {
    height: 180,
    width:windowWidth,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    position: 'absolute',
    bottom: -20,
    left: windowWidth/2 - 40,
    borderColor: 'white',
    borderWidth: 2,
  },
  desc: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#F3F3F3',
    paddingBottom: 10,
  },
  motto:{
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    fontSize: 15,
    //lineHeight: 14,
    color: '#9B9B9B',
  },
  name: {
    marginTop: 30,
    alignSelf: 'center',
    fontSize: 17,
    lineHeight: 18,
  },
  myfeedsList: {

  },
});
