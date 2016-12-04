import React from 'react';
import {
  Component,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

var NavigationBar = require('react-native-navbar');
var BackBtn = require('./component/navbar/BackBtn');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const margin = 20;

var SettingsPage = React.createClass({

  render:function() {
    return (
      <View style={styles.container}>
        <NavigationBar
        style={{borderBottomWidth: 0.5, borderBottomColor: '#F3F3F3'}}
        title={{title: '设置'}}
        leftButton={<BackBtn onPress={()=>this.props.navigator.pop()}/>}
        />
        <View style={{alignItems: 'center',}}>
          <View style={styles.logoutBtn}>
            <TouchableOpacity onPress={()=>{this.props.navigator.pop();this.props.logout()}}>
              <Text style={{color: 'red', fontSize: 16,}}>退出登录</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );

  },
});


var styles = StyleSheet.create({
  container: {
    flex:1,
  },
  logoutBtn: {
    width: windowWidth-margin*2,
    height: 40,
    marginTop: 10,
    borderRadius: 3,
    alignItems: 'center',
    padding: 10,
    borderColor: '#F3F3F3',
    borderWidth: 1,
  },
});

module.exports = SettingsPage;
