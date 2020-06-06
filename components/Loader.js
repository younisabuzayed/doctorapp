import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet, Platform } from 'react-native'

const ActivityIndicatorIos=
({title, loading}) =>
 {
    if(!loading)
    {
        return null;
    }
        return (
            <View style={styles.container}>
                <Text>Hello</Text>
                {title && <Text style={styles.text}>{title}</Text>}
            </View>
        )
    
}
const ActivityIndicatorAndroid =({title, loading}) =>
 {
    if(!loading)
    {
        return null;
    }
        return (
            <View style={styles.container}>
                <ActivityIndicator
                  size={75}
                  color="#20c997" />
                {title && <Text style={styles.text}>{title}</Text>}
            </View>
        )
    
}

export default Loader = Platform.select({
 ios: ActivityIndicatorIos,
 android: ActivityIndicatorAndroid
})
 const styles = StyleSheet.create({
     container:
     {
         flex: 1,
         justifyContent: "center",
         alignItems: "center",
         ...StyleSheet.absoluteFillObject,
         backgroundColor: "#fff",
         zIndex: 9999,
     },
     text:
     {
         color: '#000',
         marginTop: 15,
         fontSize: 18
     }
 })