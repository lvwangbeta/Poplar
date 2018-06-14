'use strict';

import React, { Component } from 'react';
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

import NavigationBar from 'react-native-navbar';
import ExploreContainer from './component/ExploreContainer';

export default class ExplorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({loaded: true});
  }

  render(){
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={styles.container}>
        <NavigationBar
        style={{borderBottomWidth: 0.5, borderBottomColor: '#F3F3F3'}}
        title={{title: '探索'}}/>
        <ExploreContainer {...this.props}/>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>

      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex:1,
  },
});
