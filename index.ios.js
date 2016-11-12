'use strict';

import React from 'react';
var FeedList = require('./FeedList');
var NewFeed = require('./NewFeed');
var ExplorePage = require('./ExplorePage');
var Mine = require('./Mine');
var LoginScreen = require('./LoginScreen');
var store = require('./Store');
var Md5 = require('./Md5');

import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Navigator,
  NavigatorIOS,
  Text,
  View,
} from 'react-native';

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';


var Poplar = React.createClass({

  getInitialState: function() {
    return {
      selectedTab:'mainTab',
      notifCount: 0,
      presses: 0,
      isLoggedIn: false,
      token: '6b6478dd-33ab-492e-b06d-05b7f1106c47',
      secret: 'osf',
      newFeedModalVisible: false,
    };
  },

  isLogIn: function() {

    if(this.state.token) {
      return true;
    }
    return false;

  },


  _renderContent: function(color: string, title: string, num?: number) {

    if(!this.isLogIn()) {
      return (<LoginScreen callbackParent={this.onChildChanged}/>);
    }

    console.log('user has login');

    if(title == '首页') {
      return (
        // <View style={[styles.tabContent, {backgroundColor: color}]}>
        //   <Text style={styles.tabText}>{pageText}</Text>
        //   <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
        // </View>
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: title,
            component: FeedList,
            passProps: { token: this.state.token, secret:this.state.secret },
          }}
        />
      );
    } else if(title == '我') {
      return(
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: title,
            component: Mine,
            passProps: { token: this.state.token, secret:this.state.secret },
          }}
        />
      );
    } else if(title == '发状态') {

    }
  },

  onChildChanged: function (newState) {
    this.setState({isLoggedIn: newState , selectedTab: 'mainTab'});
  },

  hideNewFeedMode: function() {
    this.setState({
      newFeedModalVisible: false,
    });
  },

  renderNewFeedModal: function(){
    return (<NewFeed modalVisible={this.state.newFeedModalVisible} hideNewFeedMode={this.hideNewFeedMode}/>);
  },

  render: function() {
    return (
      <TabBarIOS
        tintColor="#00B5AD"
        >
        <TabBarIOS.Item
          title="首页"
          icon={{uri: base64Icon, scale: 3}}
          selected={this.state.selectedTab === 'mainTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'mainTab',
            });
          }}>

          {this._renderContent('#414A8C', '首页')}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="探索"
          systemIcon="search"
          // icon={{uri: base64Icon, scale: 3}}
          selected={this.state.selectedTab === 'exploreTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'exploreTab',
            });
          }}>
          <ExplorePage />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          systemIcon="history"
          selected={this.state.selectedTab === 'newFeedTab'}
          onPress={() => {
            console.log('click new feed bar');
            console.log('last selected tab: ' + this.state.lastSelectedTab);
            this.setState({
              selectedTab: 'newFeedTab',
              newFeedModalVisible: true,
            });
          }}>
          {this.renderNewFeedModal()}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          systemIcon="featured"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'notifyTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'notifyTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          <NewFeed/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          icon={require('./flux.png')}
          title="我"
          selected={this.state.selectedTab === 'iTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'iTab',
            });
          }}>
          {this._renderContent('#414A8C', '我')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  tabContent: {
    // flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});


AppRegistry.registerComponent('Poplar', () => Poplar);
