import React from 'react';
import {
  Component,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native';

var NavigationBar = require('react-native-navbar');
var BackBtn = require('./component/navbar/BackBtn');

var SettingsPage = React.createClass({

  render:function() {
    return (
      <View style={styles.container}>
        <NavigationBar
        style={{borderBottomWidth: 0.5, borderBottomColor: '#F3F3F3'}}
        title={{title: '设置'}}
        leftButton={<BackBtn onPress={()=>this.props.navigator.pop()}/>}
        />
        <View>
          <TouchableOpacity onPress={()=>{this.props.navigator.pop();this.props.logout()}}>
            <Text>退出登录</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

  },
});


var styles = StyleSheet.create({
  container: {
    flex:1,
  },
});

module.exports = SettingsPage;
