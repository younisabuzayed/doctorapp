import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Button from '../components/Button';


export default class HomeScreen extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = 
    {
      token: "",
    };
  }
  _checkToken = async () =>
  {
    const token = await AsyncStorage.getItem("accessToken");
    this.setState({token}) 
  }
 render()
  { 
    return (
      <React.Fragment>
          <NavigationEvents onWillFocus ={this._checkToken} />
          <ImageBackground 
          source={require('../assets/doc-bg.png')}
          style={styles.background}
          >
            <View style={styles.conatiner}>
              <View style={styles.textConatiner}>
                <Text style={styles.title}>Welcome to Doctor App</Text>
                <Text style={styles.text}>First application of association between doctors and patients</Text>

              </View>
              {this.state.token? (
                  <Button text="Show Doctors Menu" onPress={() => this.props.navigation.navigate("Doctors")} />
                ):
                (
                  <React.Fragment>
                    <Button text="Login" onPress={() => this.props.navigation.navigate("SignIn")} />
                    <TouchableOpacity tit onPress={() => this.props.navigation.navigate("SignUp")} >
                      <Text style={styles.registerButton}>Create New Account</Text>
                    </TouchableOpacity>
                  </React.Fragment>
                )}
            </View>
          
          </ImageBackground>
      </React.Fragment>
   
   );
 }
}
const textStyles = 
{
  color: "#fff",
  textAlign: "center",
}
const styles = StyleSheet.create({
background: 
{
  width: "100%",
  height: "100%"
},
conatiner:
{
  backgroundColor: "rgba(0,0,0,0.5)",
  flex: 1,
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center'
},
textConatiner:
{
  marginBottom: 30,
},
title:
{
  ...textStyles,
  fontSize: 35,
  fontFamily: 'roboto-black'
 
},
text:
{
  ...textStyles,
  fontSize: 20
},
registerButton:
{
  ...textStyles,
  marginTop: 10,
  fontSize: 16,
}
});