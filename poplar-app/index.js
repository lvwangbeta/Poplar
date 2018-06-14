import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry} from 'react-native';
import { StackNavigator } from 'react-navigation';
import App from './src/App';
import configureStore from './src/store/index';
import TagDetail from './src/component/TagDetail';
import FeedDetail from './src/component/FeedDetail';
import UserDetail from './src/component/UserDetail';
import SettingsPage from './src/SettingsPage';
import About from './src/About';

const store = configureStore();
const Main = StackNavigator({
  Home: { screen: App },
  TagDetail: { screen: TagDetail },
  FeedDetail: { screen: FeedDetail },
  UserDetail: {screen: UserDetail},
  SettingsPage: {screen: SettingsPage},
  AboutPage: {screen: About},
}, {
  headerMode: 'none'
});

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}


AppRegistry.registerComponent('Poplar', () => Root);
