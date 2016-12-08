'use strict';

import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

import Swiper from 'react-native-swiper';

const windowWidth = Dimensions.get('window').width;
const HEIGHT = 150;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: HEIGHT,
  },
  image: {
    width: windowWidth,
    height: HEIGHT,
    flex: 1
  },
  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    width: windowWidth,
    marginLeft:-10,
    marginTop: -13,
    paddingLeft:10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    opacity: 0.8,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

});


var TopGallary = React.createClass({

  getInitialState: function() {
    return {
      imgList: [
        'https://gitlab.pro/yuji/demo/uploads/d6133098b53fe1a5f3c5c00cf3c2d670/DVrj5Hz.jpg_1',
        'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
        'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jpg',
        'https://gitlab.pro/yuji/demo/uploads/576ef91941b0bda5761dde6914dae9f0/kD3eeHe.jpg'
      ],
      loadQueue: [0, 0, 0, 0],
      loaded: true,
    };
  },


  componentDidMount: function() {

  },


  render: function(){

    return (
      <Swiper style={styles.wrapper} height={180}
        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
        dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
        activeDot={<View style={{backgroundColor: '#000', width: 7, height: 7, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
        paginationStyle={{
          bottom: -15, left: null, right: 10
        }} loop>
        <View style={styles.slide} title={<Text numberOfLines={1} style={styles.title}>This is frist slide</Text>}>
          <Image resizeMode='cover' style={styles.image} source={require('../imgs/tag1.jpg')} />
        </View>
        <View style={styles.slide} title={<Text numberOfLines={1} style={styles.title}>This is second slide</Text>}>
          <Image resizeMode='cover' style={styles.image} source={require('../imgs/tag2.jpg')} />
        </View>
        <View style={styles.slide} title={<Text numberOfLines={1} style={styles.title}>This is third slide</Text>}>
          <Image resizeMode='cover' style={styles.image} source={require('../imgs/tag3.jpg')} />
        </View>
        <View style={styles.slide} title={<Text numberOfLines={1} style={styles.title}>Learn from Kim K to land that job</Text>}>
          <Image resizeMode='cover' style={styles.image} source={require('../imgs/tag2.jpg')} />
        </View>
      </Swiper>
    );
  },

});

module.exports = TopGallary;
