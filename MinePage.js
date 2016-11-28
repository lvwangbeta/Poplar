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
var NavigationBar = require('react-native-navbar');

var MinePage = React.createClass({
  render: function(){

    return (
      <View style={styles.container}>
        <NavigationBar
        style={{borderBottomWidth: 0.5, borderBottomColor: '#F3F3F3'}}
        title={{title: '我'}}/>
        <Mine {...this.props}/>
      </View>
    );
  },
});


var styles = StyleSheet.create({
  container: {
    flex:1,
  },
});

module.exports = MinePage;
