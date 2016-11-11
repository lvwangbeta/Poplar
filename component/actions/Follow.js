import React from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet
} from 'react-native';



var Follow = React.createClass({

  getInitialState: function() {
    return ({
      isFollowed: false,
      isClicked: false,
    });
  },

  onPress: function() {
    this.setState({
      isFollowed: !this.state.isFollowed,
      isClicked: !this.state.isClicked,
    });
  },

  render: function() {
    return(
      <TouchableOpacity ref={'btn'} style={[styles.btn, {backgroundColor: this.state.isFollowed?'#FBBD08':'rgba(0,0,0,0.0)'}]} onPress={this.onPress} >
        <Text style={{color: this.state.isFollowed?'#F3F3F3':'#FBBD08'}}>{this.state.isFollowed?'已关注':'+ 关注'}</Text>
      </TouchableOpacity>
    );
  }

});

var styles = StyleSheet.create({

  btn: {
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#FBBD08',
    borderRadius: 15,
  },

  text: {
    color: '#FBBD08',
  },

});

module.exports = Follow;
