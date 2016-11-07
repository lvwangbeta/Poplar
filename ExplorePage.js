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
      <NavigatorIOS
        style={{flex: 1}}
        initialRoute={{
          title: '探索',
          component: ExploreContainer,
          passProps: { token: '6b6478dd-33ab-492e-b06d-05b7f1106c47', secret:'osf' },
        }}
        />
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
    //backgroundColor: 'white',
    marginTop: -20,
  },
});

module.exports = ExplorePage;
