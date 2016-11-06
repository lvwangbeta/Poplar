'use strict';

import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Navigator,
} from 'react-native';

var TopGallery = require('./component/TopGallery');
var TagsSection = require('./component/TagsSection');
var UsersSection = require('./component/UsersSection');
var TagDetail = require('./component/TagDetail');
var FeedDetail = require('./FeedDetail');

var _navigator;


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

  renderScene: function(route, navigator) {
    _navigator = navigator;

    if(route.type == 'explorePage') {
      return (
          <View style={{flex: 1}}>
              <View style={styles.navContainer}>
                <Text style={{textAlign: 'center',marginTop: 25,fontSize: 16, color: 'white', fontWeight: 'bold'}}>探索</Text>
              </View>
              <ScrollView style={styles.container}>
                  <TopGallery />
                  <TagsSection navigator={navigator}/>
                  <UsersSection />
              </ScrollView>
          </View>
      );

    } else if(route.type == 'tagDetail') {
      return (<TagDetail navigator={navigator} />);
    } else if(route.type == 'feed') {
      return (<route.component navigator={navigator} {...route.passProps} />);
    }
  },
  configureScene(route, routeStack) {
      if (route.type == 'Bottom') {
        return Navigator.SceneConfigs.FloatFromBottom; // 底部弹出
      }
      return Navigator.SceneConfigs.PushFromRight; // 右侧弹出
  },

  render: function(){
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <Navigator
        style={{flex: 1}}
        initialRoute={{type: 'explorePage'}}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
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
  navContainer: {
    height: 50,
    backgroundColor: '#00B5AD',
    zIndex: 1,

  },
});

module.exports = ExplorePage;
