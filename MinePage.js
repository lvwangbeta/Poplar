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

var Mine = require('./Mine');

var MinePage = React.createClass({
  render: function(){

    return (
      <NavigatorIOS
        style={{flex: 1}}
        initialRoute={{
          title: '首页',
          component: Mine,
        }}
        />
    );
  },
});


var styles = StyleSheet.create({
  container: {
    flex:1,
    //backgroundColor: 'white',
    marginTop: -20,
  },
});

module.exports = MinePage;
