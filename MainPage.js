'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';

var NavigationBar = require('react-native-navbar');
var FeedList = require('./FeedList');

var MainPage = React.createClass({
  render: function(){
    return (
      <View style={styles.container}>
        <NavigationBar
        title={{title: '首页'}}
          />
        <FeedList {...this.props}/>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex:1,
  },
});

module.exports = MainPage;
