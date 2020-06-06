import React from 'react';
import {DrawerItems} from 'react-navigation';
import {ScrollView, View, ImageBackground, Text, StyleSheet,AsyncStorage} from 'react-native';
import { ME_URL } from '../config/urls';
import axios from '../config/axios';
import { transformName } from '../config/helpers';

class Drawer extends React.Component 
{

    constructor(props)
    {
        super(props);
        this.state=
        {
            user: null,
        }
    }
    componentDidMount()
    {
        this._getProfile();
    }

    _getProfile= async() =>
    {
        const token = await AsyncStorage.getItem("accessToken");
        axios.defaults.headers.common.Authorization = `JWT ${token}`;
        const response = await axios.get(ME_URL);
        this.setState({user: response.data});
    }
    render()
    {
        const {user} = this.state;

        return(
            <ScrollView>
                <View style={styles.drawerHeaderContainer} >
                    <ImageBackground source={require('../assets/ac.png')} style={styles.background} >
                       
                  {user &&(
                    <View style={styles.userMeta}>
                        <View style={styles.userAvatar}>
                            <Text style={styles.userAvatarText}>{transformName(user.name)}</Text>
                        </View>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.email}>{user.email}</Text>
                    </View>
                    ) }
                        
                    </ImageBackground>
                </View>
                <DrawerItems {...this.props.drawerProps} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    drawerHeaderContainer:
    {
        height: 180,
    },
    background:
    {
        height: "100%",
        width: '100%',
        justifyContent: 'flex-start',
    },
    userMeta:
    {
        marginBottom: 5,
        marginTop:30,
        marginLeft: 10,
        alignItems:"flex-start",
    },
    userAvatar:
    {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor:"#007bff",
        alignSelf:'flex-start',
        marginTop:10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems:'center'
    },
    userAvatarText:
    {
        fontSize: 25,
        fontWeight: 'bold',
        color:'#fff'
    },
    userName:
    {
        fontSize: 20,
        fontWeight: 'bold',
        color:'#fff'
    },
    email:
    {
        fontSize: 16,
        color:'#fff'

    }
})

export default Drawer;