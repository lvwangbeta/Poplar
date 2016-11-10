import React from 'react';

import {
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

var Comment = React.createClass({

  pressComment: function() {
    this.props.showCommentBar();
    //this.props.push2FeedDetail();
  },

  render: function() {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={this.pressComment}>
            <Image style={{marginRight: 5}} source={require('../../imgs/ios7-chatbubble-outline.png')} />
          </TouchableOpacity>
          <Text>{this.props.counter}</Text>
        </View>
      </View>
    );
  },


});


module.exports = Comment;
