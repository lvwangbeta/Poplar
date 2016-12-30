import React from 'react';
import {
  Image,
  TouchableOpacity
} from 'react-native';

var BackBtn = React.createClass({
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require('../../imgs/back.png')}
          style={[{ width: 18, height: 18, marginLeft: 18, marginTop: 15},]}/>
      </TouchableOpacity>
    );
  }
});

module.exports = BackBtn;
