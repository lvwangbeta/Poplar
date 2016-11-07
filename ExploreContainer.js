'use strict';

import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  NavigatorIOS,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Navigator,
} from 'react-native';

var TopGallery = require('./component/TopGallery');
var TagsSection = require('./component/TagsSection');
var UsersSection = require('./component/UsersSection');

var ExploreContainer = React.createClass({

  render: function(){
    return (
      <ScrollView style={styles.container}>
          <TopGallery />
          <TagsSection navigator={this.props.navigator}/>
          <UsersSection />
      </ScrollView>
    );
  },
});


var styles = StyleSheet.create({
  container: {
    flex:1,
    //backgroundColor: 'white',
  },
});

module.exports = ExploreContainer;
