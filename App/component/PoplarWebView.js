'use strict';

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  WebView
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import BackBtn from './navbar/BackBtn';

var PoplarWebView = React.createClass({

  render: function() {
    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        <NavigationBar style={{borderBottomWidth: 0.5, borderBottomColor: '#F3F3F3'}}
                       title={{title: '正文'}}
                       leftButton={<BackBtn onPress={()=>this.props.navigator.pop()}/>}/>
        <WebView source={{uri:'http://www.dgtle.com/article-16861-1.html'}}
                 startInLoadingState={true}
                 domStorageEnabled={true}
                 javaScriptEnabled={true}
        />
      </View>
    );
  },

});

module.exports = PoplarWebView;
