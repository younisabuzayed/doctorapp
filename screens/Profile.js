import React, { Component } from 'react'
import { Text, View, KeyboardAvoidingView, AsyncStorage,ScrollView,Alert } from 'react-native'
import ScreenTitle from '../components/ScreenTitle';
import Input from '../components/input';
import Button from '../components/Button';
import axios from '../config/axios';
import { PROFILE_URL } from '../config/urls';
import Loader from '../components/Loader';
import Container from '../components/Container';
import { transformName } from '../config/helpers';
import withHeader from '../hoc/withHeader';
import styles from './styles/profileStyles';

 class ProfileScreen extends Component {
    constructor(props)
    {
        super(props);
        this.state =
        {
            isLoading: false,
            user: null,
        }
    }

    componentDidMount()
    {
        this._getProfile();
    }

    _getProfile =async () =>
    {
        this.setState({isLoading: true})
        try 
        {
            const token = await AsyncStorage.getItem("accessToken")
            axios.defaults.headers.common.Authorization = `JWT ${token}`;
            const response = await axios.get(PROFILE_URL);
            this.setState({user: response.data,isLoading: false})
        } 
        catch (e) 
        {
            this.setState({
                isLoading:false,
            });
        }
    }
    _signOut = async () =>
    {
        Alert.alert(
            '',
            "Are you sure to sign out?",
            [
                {
                    text: "Cancel",
                    style: 'cancel'
                },
                {
                    text: "Okay",
                    onPress: async () =>
                    {
                        await AsyncStorage.clear();
                        this.props.navigation.navigate("Main");
                    }
                }
            ],
            {cancelable: false}
        )
    }

    render() {
        const {user, isLoading} = this.state
        return (
            <View style={styles.container}>
                <Loader title="Profile is Loading" loading={isLoading} />
                {user && (
                    <View>
                        <View style={styles.userMetaContainer}>
                            <View style={styles.userAvtar}>
                                <Text style={styles.userAvtarText}>
                                    {transformName(user.name)}
                                </Text>
                            </View>
                            <View style={styles.userMeta}>
                                <Text >{user.name}</Text>
                                <Text >{user.email}</Text>
                            </View>
                        </View>
                        {user.profile && (
                            <View>

                                <View style={styles.doctorInfo}>
                                    <View style={styles.infoCell}>
                                        <Text style={styles.infoTitle}>Speialization</Text>
                                        <Text style={styles.infoText} >
                                            {user.profile.speialization}
                                        </Text>
                                    </View>

                                    <View style={styles.infoCell}>
                                        <Text style={styles.infoTitle}>Address</Text>
                                        <Text style={styles.infoText} >
                                            {user.profile.address}
                                        </Text>
                                    </View>

                                    <View style={styles.infoCell}>
                                        <Text style={styles.infoTitle}>Working Hours</Text>
                                        <Text style={styles.infoText} >
                                            {user.profile.workingHours}
                                        </Text>
                                    </View>

                                    <View style={styles.infoCell}>
                                        <Text style={styles.infoTitle}>Phone</Text>
                                        <Text style={styles.infoText} >
                                            {user.profile.phone}
                                        </Text>
                                    </View>
                                </View>

                            </View>
                        )}
                    </View>
                )}
                 <Button
                    buttonStyles={styles.logoutButton}
                    textStyles={styles.buttonText}
                    text="Sign Out"
                    onPress={this._signOut}
                 />
            </View>
        )
    }
}

export default withHeader(ProfileScreen, "Profile");