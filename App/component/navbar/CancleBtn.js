import React from 'react';
import {
  Image,
  TouchableOpacity
} from 'react-native';

var CancleBtn = React.createClass({
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require('../../imgs/multiply.png')}
          style={[{ width: 18, height: 18, marginLeft: 18, marginTop: 15},]}/>
      </TouchableOpacity>
    );
  }
});

module.exports = CancleBtn;
