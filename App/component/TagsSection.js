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

import TagBox from './TagBox';
import TagDetail from './TagDetail';
import {getRecommendTags} from '../api/RecommendAPI';

const windowWidth = Dimensions.get('window').width;
const margin = 10;
const interval = 5;
const tagWidth = (windowWidth-margin*2-interval*2 ) / 3;


var TagsSection = React.createClass({

  getInitialState: function() {
    return {
      loaded: false,
      tags: [],
    };
  },

  componentDidMount: function() {
    getRecommendTags((result, tags) => {
      this.setState({
        loaded: true,
        tags: tags,
      });
    });
  },

  renderTags: function() {
    if(!this.state.loaded) {
      return <View><Text>Loading ... </Text></View>
    }

    var tagViews = [];
    var tags = this.state.tags;
    for(let i in tags) {
      tagViews.push(<TagBox {...this.props} tag={tags[i]}/>);
    }
    return tagViews;

  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{marginLeft: 5}}>热门标签</Text>
        </View>
        <View style={styles.main}>
          {this.renderTags()}
        </View>
      </View>
    )
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
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
    bottom:0,
    width: tagWidth,
    height: 18,
    padding: 2,
    backgroundColor: 'rgba(0,0,0,.4)',
    zIndex: 1,
  },
  image: {
    width: tagWidth,
    height: tagWidth,
  },
});

module.exports = TagsSection;
