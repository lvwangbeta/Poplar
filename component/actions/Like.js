import React from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';


var Like = React.createClass({

  getInitialState: function(){
    return {
      counter: this.props.counter,
    };

  },

  pressLike: function() {
    this.setState({
      counter : this.state.counter + 1,
    });

  },

  render: function(){
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={this.pressLike}>
          <Image style={{marginRight: 5}} source={require('../../imgs/ios7-heart-outline.png')} />
        </TouchableOpacity>
        <Text>{this.state.counter}</Text>
      </View>
    );
  }



});

module.exports = Like;
