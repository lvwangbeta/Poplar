'use strict';

import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

// import TagDetail from './TagDetail';
import URLConf from '../api/URLConf';
import BlankTemplate from './BlankTemplate';

const windowWidth = Dimensions.get('window').width;
const margin = 20;

export default class Followers extends Component {

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.followingBox}>
            <View>
              <Image source={require('../imgs/avatar3.jpg')} style={styles.avatar}/>
            </View>
            <View style={styles.name}><Text style={{fontSize:16}}>Hana</Text></View>
            <TouchableOpacity style={styles.followBtn}><Text style={{color: 'white', fontWeight: '600'}}>已关注</Text></TouchableOpacity>
        </View>
        <View style={styles.followingBox}>
          <View>
            <Image source={require('../imgs/avatar4.jpg')} style={styles.avatar}/>
          </View>
            <View style={styles.name}><Text style={{fontSize:16}}>Alice</Text></View>
            <TouchableOpacity style={styles.unFollowBtn}><Text style={{color: '#FBBD08', fontWeight: 'normal',}}>+关注</Text></TouchableOpacity>
        </View>
        <View style={styles.followingBox}>
          <View>
            <Image source={require('../imgs/avatar5.jpg')} style={styles.avatar}/>
          </View>
            <View style={styles.name}><Text style={{fontSize:16}}>ふじいずき</Text></View>
            <TouchableOpacity style={styles.followBtn}><Text style={{color: 'white', fontWeight: '600'}}>已关注</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
};


var styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  followingBox: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#F3F3F3'
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F3F3',
  },
  name: {
    width: windowWidth - margin*2 - 100 - 80,
    height: 20,
    marginLeft: margin,
    marginRight: margin,
    marginTop: 10,
  },
  unFollowBtn: {
    width: 80,
    height: 30,
    padding: 6,
    paddingLeft: 18,
    marginLeft: margin,
    marginRight: margin,
    marginTop: 5,
    borderColor: '#FBBD08',
    borderWidth: 1,
    borderRadius: 15,
  },
  followBtn: {
    width: 80,
    height: 30,
    padding: 6,
    paddingLeft: 18,
    marginLeft: margin,
    marginRight: margin,
    marginTop: 5,
    backgroundColor: '#FBBD08',
    borderRadius: 15,
  }
});

module.exports = Followers;
