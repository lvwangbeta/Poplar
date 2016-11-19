'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

PoplarTabBar = React.createClass({
  render:function() {
    return (
      <View style={styles.container}>
        

      </View>

    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',

  },

});

module.exports = PoplarTabBar;
