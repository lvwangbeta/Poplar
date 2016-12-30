'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const margin = 10;
const interval = 5;
const tagWidth = (windowWidth-margin*2-interval*2 ) / 3;

var UsersSection = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{marginLeft: 5}}>热门用户</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.tagBox}>
            <View style={styles.tagTitle}><Text style={{fontSize: 13,textAlign: 'center'}}>小菜鸡</Text></View>
            <Image resizeMode='cover' style={styles.image} source={require('../imgs/tag1.jpg')} />
          </View>
          <View style={styles.tagBox}>
            <View style={styles.tagTitle}><Text style={{fontSize: 13,textAlign: 'center'}}>两排杨树</Text></View>
            <Image resizeMode='cover' style={styles.image} source={require('../imgs/tag2.jpg')} />
          </View>
          <View style={styles.tagBox}>
            <View style={styles.tagTitle}><Text style={{fontSize: 13,textAlign: 'center'}}>Tomcat</Text></View>
            <Image resizeMode='cover' style={styles.image} source={require('../imgs/tag3.jpg')} />
          </View>
          <View style={styles.tagBox}>
            <View style={styles.tagTitle}><Text style={{fontSize: 13,textAlign: 'center'}}>Tim Cook</Text></View>
            <Image resizeMode='cover' style={styles.image} source={require('../imgs/tag2.jpg')} />
          </View>
          <View style={styles.tagBox}>
            <View style={styles.tagTitle}><Text style={{fontSize: 13,textAlign: 'center'}}>Happy end</Text></View>
            <Image resizeMode='cover' style={styles.image} source={require('../imgs/tag1.jpg')} />
          </View>
          <View style={styles.tagBox}>
            <View style={styles.tagTitle}><Text style={{fontSize: 13,textAlign: 'center'}}>哆啦A梦</Text></View>
            <Image resizeMode='cover' style={styles.image} source={require('../imgs/tag3.jpg')} />
          </View>
        </View>
      </View>
    )
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 50,
  },
  header: {
    height: 15,
    marginLeft:10,
    marginRight:10,
    marginBottom: 5,
    borderLeftWidth: 3,
    borderLeftColor: '#00B5AD',
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    margin: 5,
  },
  tagBox: {
    position: 'relative',
    width: tagWidth,
    height: tagWidth,
    marginLeft: interval,
    marginBottom: interval,
  },
  tagTitle: {
    position: 'absolute',
    bottom:10,
    width: tagWidth,
    height: 18,
    padding: 2,
    zIndex: 1,
  },
  image: {
    alignSelf: 'center',
    width: tagWidth-36,
    height: tagWidth-36,
    borderRadius:(tagWidth-36)/2,
  },
});

module.exports = UsersSection;
