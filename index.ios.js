'use strict';

import React from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

var App = require('./App/App');


var Poplar = React.createClass({

  render: function(){

    return (
      <Navigator
          initialRoute={{ component: App }}
          configureScene={(route) => {
              return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            let Component = route.component;
              return <Component {...route.params} navigator={navigator} />
          }} />
    );
  }
});

AppRegistry.registerComponent('Poplar', () => Poplar);
