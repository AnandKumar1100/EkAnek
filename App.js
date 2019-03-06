/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { Provider } from 'react-redux'
import AppNavigation from './App/Navigation/AppNavigation'
import store from './App/Redux'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation/>
      </Provider>
    );
  }
}