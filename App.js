'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  NavigatorIOS,
  Navigator,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
var NewFeed = require('./NewFeed');
var ExplorePage = require('./ExplorePage');
var MainPage = require('./MainPage');
var MinePage = require('./MinePage');
var FeedList = require('./FeedList');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const tabBarHeight = 50;

var App = React.createClass({
  getInitialState: function() {
    return {
      selectedTab:'mainTab',
      notifCount: 0,
      newFeedModalVisible: false,
      showTabBar: true,
    };
  },


  hideNewFeedMode: function() {
    console.log('call back');
    this.setState({
      newFeedModalVisible: false,
      selectedTab: 'mainTab',
    });
  },

  hideTabBar: function() {
    this.setState({
      showTabBar: false,
    });
  },

  showTabBar: function() {
    this.setState({
      showTabBar: true,
    });
  },

  render: function() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'mainTab'}
          renderIcon={() => <Image style={styles.icon} source={require('./imgs/home.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('./imgs/home_selected.png')} />}
          onPress={() => this.setState({ selectedTab: 'mainTab' })}>
          {/* <FeedList navigator={this.props.navigator}/> */}
          <MainPage {...this.props}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'exploreTab'}
          renderIcon={() => <Image style={styles.icon} source={require('./imgs/search.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('./imgs/search_selected.png')} />}
          onPress={() => this.setState({ selectedTab: 'exploreTab' })}>
          <ExplorePage {...this.props}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'addTab'}
          renderIcon={() => <Image style={styles.icon} source={require('./imgs/add.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('./imgs/add.png')} />}
          onPress={() => this.setState({ selectedTab: 'addTab' })}>
          <ExplorePage />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'alarmTab'}
          renderIcon={() => <Image style={styles.icon} source={require('./imgs/alarm.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('./imgs/alarm_selected.png')} />}
          onPress={() => this.setState({ selectedTab: 'addTab' })}>

        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'iTab'}
          renderIcon={() => <Image style={styles.icon} source={require('./imgs/user.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('./imgs/user_selected.png')} />}
          onPress={() => this.setState({ selectedTab: 'iTab' })}>
          <MinePage />
        </TabNavigator.Item>
      </TabNavigator>
    );
  },
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  main: {
    height: windowHeight - tabBarHeight,
    width: windowWidth,
  },
  tabBar: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    height: tabBarHeight,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderTopWidth: 1,
    borderTopColor: '#F3F3F3',
  },

  tabBarItem: {
    flex:1,
    width: windowWidth / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    height: 28,
    width: 28,
  },
});

module.exports = App;
