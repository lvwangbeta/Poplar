import React from 'react';

import {
  View,
  Image,
  Text,
  Modal,
  TouchableHighlight
} from 'react-native';

var Comment = React.createClass({

  pressComment: function() {
    this.props.showCommentBar();
  },

  render: function() {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight onPress={this.pressComment}>
            <Image style={{marginRight: 5}} source={require('../../imgs/ios7-chatbubble-outline.png')} />
          </TouchableHighlight>
          <Text>{this.props.counter}</Text>
        </View>
      </View>
    );
  },


});


module.exports = Comment;
