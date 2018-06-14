'use strict';

import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TextInput,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const margin = 20;
const imgInterval = 5;

export default class BlankTemplate extends Component{
  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 10}}><Text style={{color: '#adadad'}}>Loading...</Text></View>
        <View style={styles.feedBox}>
          <View style={styles.feedHeader}>
            <View style={styles.avatar}></View>
            <View style={styles.username}></View>

          </View>
          <View style={{flex: 1, marginTop: 10}}>
            <View style={styles.line}></View>
            <View style={styles.line}></View>
            <View style={styles.shortLine}></View>
          </View>
        </View>
        <View style={styles.feedBox}>
          <View style={styles.feedHeader}>
            <View style={styles.avatar}></View>
            <View style={styles.username}></View>

          </View>
          <View style={{flex: 1, marginTop: 10}}>
            <View style={styles.line}></View>
            <View style={styles.line}></View>
            <View style={styles.shortLine}></View>
          </View>
        </View>
        <View style={styles.feedBox}>
          <View style={styles.feedHeader}>
            <View style={styles.avatar}></View>
            <View style={styles.username}></View>

          </View>
          <View style={{flex: 1, marginTop: 10}}>
            <View style={styles.line}></View>
            <View style={styles.line}></View>
            <View style={styles.shortLine}></View>
          </View>
        </View>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: margin,
    //marginRight: margin,
    marginTop: 30,
  },
  feedBox: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 0,
    paddingBottom: 10,
    backgroundColor: 'white',
    //borderTopWidth: 0.5,
    //borderBottomWidth: 0.5,
    //borderColor: '#EEEEEE',
  },
  feedHeader: {
    //flex: 1,
    flexDirection: 'row',
    //margin: margin,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F3F3',
  },
  username: {
    width: windowWidth- margin - margin*2 - margin*2,
    height: 20,
    marginLeft: margin,
    marginRight: margin,
    marginTop: 10,
    backgroundColor: '#F3F3F3',
  },
  line: {
    width: windowWidth -margin*2,
    height: 10,
    marginTop: 10,
    backgroundColor: '#F3F3F3',
  },
  shortLine: {
    width: windowWidth / 2,
    height: 10,
    marginTop: 10,
    backgroundColor: '#F3F3F3',
  }
});

// module.exports = BlankTemplate;
