'use strict';

import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity
} from 'react-native';

export default class BackBtn extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require('../../imgs/back.png')}
          style={[{ width: 18, height: 18, marginLeft: 18, marginTop: 15},]}/>
      </TouchableOpacity>
    );
  }
}
