'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import TopGallery from './TopGallery';
import TagsSection from './TagsSection';

export default class ExploreContainer extends Component{

  render(){
    return (
      <ScrollView style={styles.container}>
          <TopGallery navigator={this.props.navigator}/>
          <TagsSection {...this.props}/>
          {/*
          <UsersSection navigator={this.props.navigator} refresh={this.props.refresh}/> */}
      </ScrollView>
    );
  }
};


var styles = StyleSheet.create({
  container: {
    flex:1,
    //backgroundColor: 'white',
  },
});

// module.exports = ExploreContainer;
