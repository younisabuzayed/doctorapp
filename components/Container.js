import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default ({children}) => 
{
  
        return (
            <View style={styles.container}>
              {children}  
            </View>
        )
    
}

const styles= StyleSheet.create({
    container:
    {
        flex:1,
        padding: 10,
        justifyContent: "center"
    }
})
