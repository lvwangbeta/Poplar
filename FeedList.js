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

var Md5 = require('./Md5');
var FeedCell = require('./FeedCell');
var FeedDetail = require('./FeedDetail');

const windowWidth = Dimensions.get('window').width;
var REQUEST_URL = 'http://localhost:8080/com.lvwang.osf/api/v1/timeline/';

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
    var sign = Md5.hex_md5('/com.lvwang.osf/api/v1/timeline/?ts=123456&'+this.props.secret);
    console.log('sign:' + sign);
    var url = REQUEST_URL+'?ts=123456&sign=' + sign;
    var headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token':this.props.token,
    }};

    fetch(url, headers)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.feeds),
          loaded: true,
        });
      })
      .done();
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
  selectFeed: function(feed: Object) {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: '正文',
        component: FeedDetail,
        passProps: {feed:feed, secret:this.props.secret, token:this.props.token},
      });
    }
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
        onSelect={() => this.selectFeed(feed)}
        feed={feed}
        token={this.props.token}
        secret={this.props.secret}
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
    paddingTop: 70,
    backgroundColor: 'white',
  },
});

module.exports = FeedList;
