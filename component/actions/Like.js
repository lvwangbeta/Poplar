import React from 'react';

import {
  View,
  Image,
  Text,
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
        <TouchableHighlight onPress={this.pressLike}>
          <Image style={{marginRight: 5}} source={require('../../imgs/ios7-heart-outline.png')} />
        </TouchableHighlight>
        <Text>{this.state.counter}</Text>
      </View>
    );
  }



});

module.exports = Like;
