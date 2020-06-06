import React, { Component } from "react";
import {createAppContainer,createStackNavigator, createDrawerNavigator} from 'react-navigation';


//Screens
import HomeScreen from '../screens/Home';
import DoctorsScreen from '../screens/Doctors';
import Drawer from "../components/Drawer";
import SignUpScreen from '../screens/SignUp';
import SignInScreen from "../screens/SignIn";
import ProfileScreen from "../screens/Profile";

const DoctorsStack = createStackNavigator({
    DoctorsScreen: 
    {
        screen: DoctorsScreen,
    },
    
});
const ProfileStack = createStackNavigator({
    ProfileScreen:
    {
        screen: ProfileScreen
    }
})

const DrawerNavigation = createDrawerNavigator({
    Doctors: 
     {
      screen: DoctorsStack,
      navigationOptions: {
          drawerLabel:"Doctors"
        }
     },
     Profile: 
     {
         screen: ProfileStack,
         navigationOptions:
         {
             drawerLabel: "User Profile"
         }
     }
    
    },{
    contentOptions:
    {
        itemStyle:
        {
            
        }
        ,labelStyle:
        {
            fontSize: 18,
            marginLeft: 5
        },
        activeTintColor: '#fff',
        activeBackgroundColor: '#007bff',
       
     
        
        
    },
    drawerPosition:'left',
    drawerWidth: 300,
    contentComponent: props =>
    {
        return<Drawer drawerProps={props} />
    }
});
export default createAppContainer(
    createStackNavigator({
        Main: HomeScreen,
        SignUp:SignUpScreen,
        SignIn: SignInScreen,
        DrawerNav: DrawerNavigation
    },
    {
        headerMode: 'none',
    })
)