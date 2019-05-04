/**
 * Created by ljunb on 2017/5/25.
 */
import React, { PureComponent } from "react";
import { Provider } from 'react-redux';
import store from './store/appStore';
import { View, Text, StatusBar, Platform } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import TabBarView from './pages/TabBarView';
import Splash from './pages/Splash'
import './global.js'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {Platform.OS === 'ios' ? <TabBarView /> : <Splash />}
      </Provider>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: App
  }
});

export default createAppContainer(AppNavigator);
