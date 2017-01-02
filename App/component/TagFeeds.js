'use strict';

import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import {getTagFeedsOfPage} from '../api/TagAPI';
import TagFeedCell from './TagFeedCell';
import FeedDetail from './FeedDetail';
import HomePage from './HomePage';

const windowWidth = Dimensions.get('window').width;

var TagFeeds = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  componentDidMount: function() {
    getTagFeedsOfPage(this.props.tagId, 1, (result, feeds) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(feeds),
        loaded: true,
      });
    });
  },


  render: function() {
    const { onScroll = () => {} } = this.props;
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
        <View style={{flex: 1}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderFeed}
            style={styles.listView}
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

  selectFeed: function(feed, avatarCanClick=true) {
    let navigator = this.props.navigator;
    this.props.navigator.push({
      title: '正文',
      component: FeedDetail,
      params: {navigator, feed, nav2TagDetail:this.props.nav2TagDetail, avatarCanClick:avatarCanClick, refresh:this.props.refresh}
    });
  },

  pressAvatar: function(feed) {
    let navigator = this.props.navigator;
    this.props.navigator.push({
      title: feed.user_name,
      component: HomePage,
      params: {userName: feed.user_name, userId: feed.user_id, navigator, avatar: feed.user_avatar, refresh:this.props.refresh},
    });
  },


  renderFeed: function(feed) {
    return(
      <TagFeedCell
        navigator={this.props.navigator}
        onSelect={() => this.selectFeed(feed)}
        token={this.props.token}
        feed={feed}
        refresh={this.props.refresh}
        nav2TagDetail={this.props.nav2TagDetail}
        pressAvatar={() =>this.pressAvatar(feed)}
        push2FeedDetail={() => this.selectFeed(feed)}
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
    backgroundColor: 'white',
  },
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height:50,
    backgroundColor: '#00B5AD',
  },
  back: {
    marginLeft:10,
    marginTop:23,
  },
  title: {
    alignSelf:'center',
    marginTop: 10,
  },
  right: {
    marginRight:10,
    marginTop:23,
  },



});

module.exports = TagFeeds;
