'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import {isLogin, logout} from './component/util/Secret';
var NewFeed = require('./NewFeed');
var ExplorePage = require('./ExplorePage');
var MainPage = require('./MainPage');
var MinePage = require('./MinePage');
var LoginRegPage = require('./LoginRegPage');

var App = React.createClass({
  getInitialState: function() {
    return {
      selectedTab:'mainTab',
      notifCount: 0,
      isLogin: false,
      token: undefined,
    };
  },

  componentWillMount: function() {
    isLogin(this);
  },

  logout: function() {
    logout(this);
  },

  refresh: function(isLogin, token) {
    this.setState({
      isLogin: isLogin,
      token: token,
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
          {this.state.isLogin ? <MainPage token={this.state.token} {...this.props}/> : <LoginRegPage refresh={this.refresh}/>}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'exploreTab'}
          renderIcon={() => <Image style={styles.icon} source={require('./imgs/search.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('./imgs/search_selected.png')} />}
          onPress={() => this.setState({ selectedTab: 'exploreTab' })}>
          <ExplorePage token={this.state.token} refresh={this.refresh} {...this.props}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'addTab'}
          renderIcon={() => <Image style={styles.icon} source={require('./imgs/add.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('./imgs/add.png')} />}
          onPress={this.state.isLogin ? ()=>{this.props.navigator.push({
            title: '发状态',
            component: NewFeed,
            params: {token:this.state.token ,pop: ()=>this.props.navigator.pop()}
          })} : ()=>this.setState({ selectedTab: 'addTab' })}
          >
          {this.state.isLogin ? <View/> : <LoginRegPage refresh={this.refresh}/>}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'alarmTab'}
          renderIcon={() => <Image style={styles.icon} source={require('./imgs/alarm.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('./imgs/alarm_selected.png')} />}
          onPress={() => this.setState({ selectedTab: 'alarmTab' })}>
          <LoginRegPage/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'iTab'}
          renderIcon={() => <Image style={styles.icon} source={require('./imgs/user.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('./imgs/user_selected.png')} />}
          onPress={() => this.setState({ selectedTab: 'iTab' })}>
          {this.state.isLogin ? <MinePage token={this.state.token} logout={this.logout} {...this.props}/> : <LoginRegPage refresh={this.refresh}/>}
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
  icon: {
    height: 28,
    width: 28,
  },
});

module.exports = App;
