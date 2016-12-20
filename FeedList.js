'use strict';

import React from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  RefreshControl
} from 'react-native';

var FeedCell = require('./FeedCell');
var FeedDetail = require('./FeedDetail');
var TagDetail = require('./component/TagDetail');
var HomePage = require('./component/HomePage');
import {getMyFeeds, refresh} from './component/api/FeedAPI';

const windowWidth = Dimensions.get('window').width;

var FeedList = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      isRefreshing: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    getMyFeeds(this);
  },

  onRefresh: function() {
    this.setState({isRefreshing: true});
    refresh('', this);
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

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>

      </View>

    );
  },

  nav2TagDetail: function(tag) {
    this.props.navigator.push({
        title: tag.tag,
        component: TagDetail,
        params: {token: this.props.token}
    });
  },

  selectFeed: function(feed, avatarCanClick=true) {
    //this.props.hideTabBar();
    let navigator = this.props.navigator;
    this.props.navigator.push({
      title: '正文',
      component: FeedDetail,
      params: {token:this.props.token, navigator, feed, nav2TagDetail:this.nav2TagDetail, avatarCanClick:avatarCanClick}
    });
  },

  pressAvatar: function(feed) {
    let navigator = this.props.navigator;
    this.props.navigator.push({
      title: feed.user_name,
      component: HomePage,
      params: {token:this.props.token, feed,navigator, selectFeed: this.selectFeed, nav2TagDetail:this.nav2TagDetail},
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
});

module.exports = FeedList;
