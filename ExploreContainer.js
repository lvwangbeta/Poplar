'use strict';

import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Navigator,
} from 'react-native';

var TopGallery = require('./component/TopGallery');
var TagsSection = require('./component/TagsSection');
var UsersSection = require('./component/UsersSection');
var TagDetail = require('./component/TagDetail');

var ExploreContainer = React.createClass({

  nav2TagDetail: function(tag) {
    this.props.navigator.push({
        title: tag.tag,
        component: TagDetail,
    });
  },

  render: function(){
    return (
      <ScrollView style={styles.container}>
          <TopGallery navigator={this.props.navigator}/>
          <TagsSection token={this.props.token}
                       navigator={this.props.navigator}
                       nav2TagDetail={this.nav2TagDetail}
                       refresh={this.props.refresh}/>
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
