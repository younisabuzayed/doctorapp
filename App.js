import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppNavigation from './config/routes';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions'
export default class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state=
    {
      isReady: false,
    }
  }
async componentWillMount()
{
  await Permissions.askAsync(Permissions.LOCATION)
}
 async _getFonts()
  {
    await Font.loadAsync({
      "roboto-black": require('./assets/fonts/Roboto-Black.ttf')
    })
  }
  render() {
    if(!this.state.isReady)
    {
      return (
        <AppLoading startAsync={this._getFonts} onFinish={() => this.setState({isReady: true})} onError={console.error}/>
      );
    }
    
     return <AppNavigation />
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});
