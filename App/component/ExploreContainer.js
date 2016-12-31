'use strict';

import React from 'react';
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
import UsersSection from './UsersSection';
import TagDetail from './TagDetail';

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
          <UsersSection navigator={this.props.navigator} refresh={this.props.refresh}/>
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
