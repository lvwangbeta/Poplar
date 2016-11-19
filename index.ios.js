'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

var NewFeed = require('./NewFeed');
var ExplorePage = require('./ExplorePage');
var MainPage = require('./MainPage');
var MinePage = require('./MinePage');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const tabBarHeight = 50;


var Poplar = React.createClass({

  getInitialState: function() {
    return {
      selectedTab:'exploreTab',
      notifCount: 0,
      presses: 0,
      isLoggedIn: false,
      token: '6b6478dd-33ab-492e-b06d-05b7f1106c47',
      secret: 'osf',
      newFeedModalVisible: false,
    };
  },



  renderContent: function(num?: number) {

    console.log('selected tab: '+ this.state.selectedTab);

    if(this.state.selectedTab == 'mainTab') {
      return <MainPage />;
    } else if(this.state.selectedTab == 'iTab') {
      return <MinePage />;
    } else if(this.state.selectedTab == 'exploreTab') {
      return <ExplorePage />;
    }
  },

  hideNewFeedMode: function() {
    this.setState({
      newFeedModalVisible: false,
    });
  },

  render: function() {
    return (
      <View style={{flex:1, flexDirection: 'column'}}>
        {
          this.state.newFeedModalVisible && <NewFeed modalVisible={this.state.newFeedModalVisible} hideNewFeedMode={this.hideNewFeedMode}/>
        }
        <View style={styles.main}>
          {this.renderContent()}
        </View>
        <View style={styles.tabBar}>
          <View style={styles.tabBarItem}>
            <TouchableOpacity onPress={()=>{this.setState({selectedTab:'mainTab'})}}>
              {
                this.state.selectedTab == 'mainTab' ?
                <Image style={styles.icon} source={require('./imgs/home_selected.png')} /> :
                <Image style={styles.icon} source={require('./imgs/home.png')} />
              }
            </TouchableOpacity>
          </View>
          <View style={styles.tabBarItem}>
            <TouchableOpacity onPress={()=>{this.setState({selectedTab:'exploreTab'})}}>
            {
              this.state.selectedTab == 'exploreTab' ?
              <Image style={styles.icon} source={require('./imgs/search_selected.png')} /> :
              <Image style={styles.icon} source={require('./imgs/search.png')} />
            }
            </TouchableOpacity>
          </View>
          <View style={styles.tabBarItem}>
            <TouchableOpacity onPress={() => {this.setState({newFeedModalVisible: true})}}>
              <Image style={styles.icon} source={require('./imgs/add.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.tabBarItem}>
            <TouchableOpacity>
            {
              this.state.selectedTab == 'alarmTab' ?
              <Image style={styles.icon} source={require('./imgs/alarm_selected.png')} /> :
              <Image style={styles.icon} source={require('./imgs/alarm.png')} />
            }
            </TouchableOpacity>
          </View>
          <View style={styles.tabBarItem}>
            <TouchableOpacity onPress={()=>{this.setState({selectedTab:'iTab'})}}>
            {
              this.state.selectedTab == 'iTab' ?
              <Image style={styles.icon} source={require('./imgs/user_selected.png')} /> :
              <Image style={styles.icon} source={require('./imgs/user.png')} />
            }
            </TouchableOpacity>
          </View>
        </View>

      </View>
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
    height: 32,
    width: 32,
  },


  tabContent: {
    // flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});


AppRegistry.registerComponent('Poplar', () => Poplar);
