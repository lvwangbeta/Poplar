'use strict';

import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class SettingsBtn extends Component{

  constructor(props) {
    super(props);
  }

  nav2SettingsPage() {
    const {navigate} = this.props.navigation;
    navigate(
      'SettingsPage',
      {
        navigate: navigate,
      }
    );
  }

  render() {
    return (
      <TouchableOpacity onPress={()=>this.nav2SettingsPage()} style={styles.container}>
        <Image
          source={require('../../imgs/settings.png')}
          style={[{ width: 18, height: 18, marginRight: 18, marginTop: 15},]}/>
      </TouchableOpacity>
    );

  }
}


var styles = StyleSheet.create({
  container: {

  },
});
