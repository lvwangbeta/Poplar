'use strict';

import React from 'react';

import {
    StyleSheet,
    AsyncStorage,
    Text,
    View,
    TouchableHighlight,
    Image,
    Dimensions,
    ScrollView,
    ListView,
} from 'react-native';

var FollowBtn = require('./actions/Follow');
var FeedDetail = require('../FeedDetail');
var FeedCell = require('../FeedCell');
import {getMyFeeds} from './api/FeedAPI';

const windowWidth = Dimensions.get('window').width;

var HomePage = React.createClass({

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

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>

      </View>

    );
  },

  renderFeed: function(feed) {
    return(
      <FeedCell
        onSelect={() => this.props.selectFeed(feed, false)}
        feed={feed}
        push2FeedDetail={() => this.props.selectFeed(feed, false)}
        nav2TagDetail={this.props.nav2TagDetail}
      />
    );
  },

  renderFeedList: function() {
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderFeed}
        />
      </View>
    );
  },

  render: function() {

    return (
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View>
            <Image resizeMode='cover' style={styles.background} source={require('../imgs/tag1.jpg')} />
            <Image style={styles.avatar} source={require('../imgs/tag2.jpg')} />
          </View>
          <View style={styles.metas}>
            <View style={styles.desc}>
              <Text style={styles.name}>断鸿</Text>
              <Text style={styles.motto}>Time to do it</Text>
              <FollowBtn/>
            </View>
            <View
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
            </View>
          </View>
        </View>
        <View style={styles.myfeedsList}>
          {this.renderFeedList()}
        </View>
      </ScrollView>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  card: {
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
    lineHeight: 14,
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
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = HomePage;
