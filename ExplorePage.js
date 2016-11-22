'use strict';

import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  NavigatorIOS,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Navigator,
} from 'react-native';

var NavigationBar = require('react-native-navbar');
var ExploreContainer = require('./ExploreContainer');

var ExplorePage = React.createClass({
  getInitialState: function(){
    return {
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    this.setState({loaded: true});
  },

  render: function(){
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={styles.container}>
        <NavigationBar
        style={{borderBottomWidth: 0.5, borderBottomColor: '#F3F3F3'}}
        title={{title: '探索'}}/>
        <ExploreContainer {...this.props}/>
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
});

var styles = StyleSheet.create({
  container: {
    flex:1,
  },
});

module.exports = ExplorePage;
