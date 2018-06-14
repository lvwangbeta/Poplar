'use strict';

import React, { Component } from 'react';
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

export default class MinePage extends Component{

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
        style={{borderBottomWidth: 0.5, borderBottomColor: '#F3F3F3'}}
        title={{title: '我的'}}
        rightButton={<SettingsBtn {...this.props}/>}
        />
        <Mine {...this.props}/>
      </View>
    );
  }
};


var styles = StyleSheet.create({
  container: {
    flex:1,
  },
});
