'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  NavigatorIOS,
  Navigator,
} from 'react-native';

var FeedList = require('./FeedList');


var MainPage = React.createClass({
  render: function(){

    return (
      <NavigatorIOS
        style={{flex: 1}}
        initialRoute={{
          title: '首页',
          component: FeedList,
        }}
        />
    );
  },
});


var styles = StyleSheet.create({
  container: {
    flex:1,
    //backgroundColor: 'white',
    //marginTop: -20,
  },
});

module.exports = MainPage;
