import React from 'react';
import {
  Component,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

var SettingsBtn = React.createClass({

  render:function() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require('../../imgs/back.png')}
          style={[{ width: 18, height: 18, marginLeft: 18, marginTop: 15},]}/>
      </TouchableOpacity>
    );

  },
});


var styles = StyleSheet.create({
  container: {
    flex:1,
  },
});

module.exports = SettingsBtn;
