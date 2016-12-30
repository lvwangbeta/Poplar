'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Navigator,
} from 'react-native';

import Mine from './component/Mine';
import SettingsBtn from './component/navbar/SettingsBtn';
import SettingsPage from './SettingsPage';
import NavigationBar from 'react-native-navbar';

var MinePage = React.createClass({
  render: function(){

    return (
      <View style={styles.container}>
        <NavigationBar
        style={{borderBottomWidth: 0.5, borderBottomColor: '#F3F3F3'}}
        title={{title: '我'}}
        rightButton={<SettingsBtn onPress={()=>this.props.navigator.push({
          title: '设置',
          component: SettingsPage,
          params: {logout: this.props.logout}
        })}/>}/>
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
