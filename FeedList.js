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
} from 'react-native';

var FeedCell = require('./FeedCell');
var FeedDetail = require('./FeedDetail');
var TagDetail = require('./component/TagDetail');
var HomePage = require('./component/HomePage');
import {getMyFeeds} from './component/api/FeedAPI';

const windowWidth = Dimensions.get('window').width;

var FeedList = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    getMyFeeds(this);
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
    });
  },

  selectFeed: function(feed: Object) {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: '正文',
        component: FeedDetail,
        passProps: {feed:feed, pressAvatar:()=>this.pressAvatar(feed), nav2TagDetail:this.nav2TagDetail},
      });
    }
  },

  pressAvatar: function(feed) {
    this.props.navigator.push({
      title: feed.user_name,
      component: HomePage,
      passProps: {feed:feed, secret:this.props.secret, token:this.props.token},
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
        secret={this.props.secret}
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
    marginTop: 65,
    backgroundColor: 'white',
  },
});

module.exports = FeedList;
