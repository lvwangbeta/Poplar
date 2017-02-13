'use strict';

import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TextInput,
  RefreshControl,
  Alert
} from 'react-native';

import FeedCell from './FeedCell';
import FeedDetail from './FeedDetail';
import TagDetail from './TagDetail';
import HomePage from './HomePage';
import BlankTemplate from './BlankTemplate';
import {getMyFeeds, refresh, load} from '../api/FeedAPI';
import {getToken} from '../util/Secret';

const windowWidth = Dimensions.get('window').width;

var FeedList = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      page: 1,
      feedId: 0,
      feeds:[],
      noMore: false,
      loaded: false,
      isRefreshing: false,
      isLoadingMore: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.token == this.props.token) return;
    this.setState({loaded: false}, refresh('', (result, feeds)=>{
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(feeds),
        isRefreshing: false,
        loaded: true,
        noMore: false,
        page: 1,
        feeds: feeds,
        feedId: 0,
      });
    }));

  },

  updateFeedList: function(result, feeds, noMore) {
    if(result) {
      if(!noMore) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feeds),
          isRefreshing: false,
          isLoadingMore: false,
          loaded: true,
          page: this.state.page+1,
          feedId: feeds != null&&feeds.length != 0 ? feeds[feeds.length-1].id: 0,
        });
      } else {
        this.setState({
          isLoadingMore: false,
          loaded: true,
          noMore: true,
        });
      }
    }

  },

  fetchData: function() {
    //getMyFeeds(this);
    load(0, this.state.feeds, this.state.page, (result, feeds, noMore) => {this.updateFeedList(result, feeds, noMore)});
  },

  onRefresh: function() {
    this.setState({isRefreshing: true, feeds: [], dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })}, refresh('', (result, feeds)=>{
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(feeds),
        isRefreshing: false,
        loaded: true,
        noMore: false,
        page: 1,
        feeds: feeds,
        feedId: 0,
      });
    }));
  },

  render: function() {
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View>
        <ListView
          isComment={this.state.isComment}
          dataSource={this.state.dataSource}
          renderRow={this.renderFeed}
          renderFooter={this.renderFooter}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0}
          style={styles.listView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
              tintColor="#F3F3F3"
              title="刷新中..."
              titleColor="#9B9B9B"
              colors={['#F3F3F3', '#F3F3F3', '#F3F3F3']}
              progressBackgroundColor="#F3F3F3"
            />
          }
        />
      </View>
    );

  },
  onEndReached: function() {
    if(this.state.noMore || this.state.isLoadingMore) return;
    this.setState({isLoadingMore: true}, load(this.state.feedId, this.state.feeds, this.state.page, (result, feeds, noMore) => {this.updateFeedList(result, feeds, noMore)}));
  },
  renderFooter: function() {
    if(this.state.isLoadingMore) {
      return (
        <View style={styles.footer}>
          <Text>正在加载...</Text>
        </View>

      );
    } else if(this.state.noMore){
      return(
        <View style={styles.footer}>
          <Text style={{color: '#adadad'}}>没有更多了</Text>
        </View>
      );
    }
  },

  renderLoadingView: function() {
    return (
      <BlankTemplate/>

    );
  },

  nav2TagDetail: function(tag) {
    this.props.navigator.push({
        title: tag.tag,
        component: TagDetail,
        params: {token: this.props.token, tag: tag}
    });
  },

  selectFeed: function(feed, avatarCanClick=true) {
    //this.props.hideTabBar();
    let navigator = this.props.navigator;
    this.props.navigator.push({
      title: '正文',
      component: FeedDetail,
      params: {navigator, feed, nav2TagDetail:this.nav2TagDetail, avatarCanClick:avatarCanClick}
    });
  },

  pressAvatar: function(feed) {
    let navigator = this.props.navigator;
    this.props.navigator.push({
      title: feed.user_name,
      component: HomePage,
      params: {userName: feed.user_name, userId: feed.user_id,navigator,avatar: feed.user_avatar, selectFeed:this.selectFeed, nav2TagDetail:this.nav2TagDetail},
    });
  },

  pushComment2Feed: function(comment) {
    console.log('pushComment2Feed');
    this.setState({
      isComment: true,
      comment: comment,
    }, ()=>{
      console.log(this.state.comment);
    });

  },
  renderFeed: function(feed) {
    return(
      <FeedCell
        navigator={this.props.navigator}
        onSelect={() => this.selectFeed(feed)}
        feed={feed}
        page={this.state.page}
        token={this.props.token}
        pressAvatar={() =>this.pressAvatar(feed)}
        push2FeedDetail={() => this.selectFeed(feed)}
        nav2TagDetail={this.nav2TagDetail}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  listView: {
    //marginTop: 65,
    backgroundColor: 'white',
  },
  footer: {
    width:windowWidth,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = FeedList;
