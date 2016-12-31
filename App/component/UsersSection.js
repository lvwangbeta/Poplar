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

import URLConf from '../api/URLConf';
import {getRecommendUsers} from '../api/RecommendAPI';

const IMAGE_BASE_URL = URLConf.IMG_BASE_URL;
const avatar_thumbnail = '?imageView2/1/w/100/h/100'
const windowWidth = Dimensions.get('window').width;
const margin = 10;
const interval = 5;
const tagWidth = (windowWidth-margin*2-interval*2 ) / 3;

var UsersSection = React.createClass({

  getInitialState: function() {
    return {
      loaded: false,
      users: [],
    };
  },

  componentDidMount: function() {
    getRecommendUsers((result, users) => {
      this.setState({
        loaded: true,
        users: users,
      });
    });
  },


  renderUsers: function() {
    if(!this.state.loaded) {
      return <View><Text>Loading ... </Text></View>
    }

    var userViews = [];
    var users = this.state.users;
    for(let i in users) {
      userViews.push(
        <TouchableOpacity style={styles.tagBox}>
          <View style={styles.tagTitle}><Text style={{fontSize: 13,textAlign: 'center'}}>{users[i].user_name}</Text></View>
          <Image resizeMode='cover' style={styles.image} source={{uri: IMAGE_BASE_URL + users[i].user_avatar + avatar_thumbnail}} />
        </TouchableOpacity>
      );
    }
    return userViews;

  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{marginLeft: 5}}>热门用户</Text>
        </View>
        <View style={styles.main}>
          {this.renderUsers()}
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
    //justifyContent: 'flex-start',
    flexWrap: 'wrap',
    margin: 5,
  },
  tagBox: {
    //position: 'relative',
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
