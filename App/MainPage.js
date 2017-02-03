'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import FeedList from './component/FeedList';

var MainPage = React.createClass({
  render: function(){
    return (
      <View style={styles.container}>
        <NavigationBar
        style={{borderBottomWidth: 0.5, borderBottomColor: '#F3F3F3'}}
        title={{title: '首页'}}/>
        {/* <View style={styles.header}>
          <Text style={{color: 'white'}}>发送中...</Text>
        </View> */}
        <FeedList {...this.props}/>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex:1,
  },
  header: {
    flex: 1,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 189, 8, 0.8)',
  }
});

module.exports = MainPage;
