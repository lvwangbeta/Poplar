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

import NavigationBar from 'react-native-navbar';
import BackBtn from './component/navbar/BackBtn';
import About from './About';

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
        <TouchableOpacity style={styles.cell} onPress={ () => {
            this.props.navigator.push({
              title: '关于',
              component: About,
              params: {navigator: this.props.navigator}
            });
          }
        }>
          <Text style={{fontSize: 16}}>关于</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center',}}>
            <TouchableOpacity style={styles.logoutBtn} onPress={()=>{this.props.navigator.pop();this.props.logout()}}>
              <Text style={{color: 'red', fontSize: 16,}}>退出登录</Text>
            </TouchableOpacity>
        </View>
      </View>
    );

  },
});


var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
  },
  cell: {
    height: 40,
    marginTop: 10,
    width:windowWidth,
    paddingLeft: margin,
    paddingRight: margin,
    paddingTop: 10,
    borderColor: '#F3F3F3',
    borderWidth: 1,
  },
  logoutBtn: {
    width: windowWidth,
    height: 40,
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
    borderColor: '#F3F3F3',
    borderWidth: 1,
  },
});

module.exports = SettingsPage;
