import React from 'react';
import {ScrollView, KeyboardAvoidingView, CheckBox, View, Text, Platform,} from 'react-native';
import * as Location from'expo-location'
import styles from './styles/authStyles';
import ScreenTitle from '../components/ScreenTitle';
import Input from '../components/input';
import Button from '../components/Button';
import axios from '../config/axios';
import { SINGNUP_URL } from '../config/urls';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
export default class SignUpScreen extends React.Component
{
    constructor(props) 
    {
        super(props);
        this.state =
        {
            name: "",
            email: "",
            password: "",
            specialization: "",
            phone: "",
            address: "",
            workingHours: "",
            userType: false,
            location: null,
            isLoading: false,
            alert:
            {
                messages: null,
                type: "",
            }
        }
        // this.handleOnChange = this.handleOnChange.bind(this);

    }
    componentWillMount()
    {
        this._getLocation();
    }
    componentDidUpdate()
    {
        if(this.state.alert.messages)
        {
            setTimeout(() =>
            {
                this.setState({alert: {messages: null}})
            }, 3000)
        }
    }
    componentWillUnMount()
    {
        clearTimeout();
    }
    _getLocation = async () =>
    {
        try 
        {
            let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
            this.setState({location})    
        } catch (e) {
            this.setState({location: null})
        }
    }
    
    changeNameHandler = (value) =>
    {
        this.setState({name: value})
    };

    changeEmailHandler = (value) =>
    {
        this.setState({email: value})
    };

    changePasswordHandler= (value) =>
    {
        this.setState({password: value})
    };

    changeSpecializationHandler = (value) =>
    {
        this.setState({specialization: value})
    };

    changePhoneHandler = (value) =>
    {
        this.setState({phone: value})
    };

    changeAddressHandler = (value) =>
    {
        this.setState({address: value })
    };

    changeWorkingHoursHandler = (value) =>
    {
        this.setState({workingHours: value})
    };

    changeUserTypeHandler = () =>
    {
        this.setState({ userType: !this.state.userType})
    }
    handleOnChange=(e) => 
    {
        console.log(e)
        this.setState({[e.name]: e.text});
    }
    validate() 
    {
        const {name, email, password, specialization, address, phone, workingHours, userType} = this.state;
        let validationErrors = [];
        let passed = true;
        if(!name) 
        {
            validationErrors.push(" Please put your name");
            passed= false;
        }
        if(!email) 
        {
            validationErrors.push(" Please put your email");
            passed= false;
        }
        if(!password) 
        {
            validationErrors.push(" Please put your password");
            passed= false;
        }
        if(userType)
        {
            if(!specialization) 
            {
                validationErrors.push(" Please put your specialization");
                passed= false;
            }
            if(!address) 
            {
                validationErrors.push(" Please put your address");
                passed= false;
            }
            if(!phone) 
            {
                validationErrors.push(" Please put your phone nuber");
                passed= false;
            }
            if(!workingHours) 
            {
                validationErrors.push(" Please put your working hours");
                passed= false;
            }
        }
        if(validationErrors.length > 0)
        {
            this.setState({alert: {messages: validationErrors, type: "danger"}})
        }
        return passed
    }

    _SignUp = async () =>
    {
        if(!this.validate()) return;
        this.setState({isLoading: true})
        const { name, email, password, specialization, address, phone, workingHours,location, userType } = this.state;
        const body =
        {
            name, 
            email, 
            password, 
            specialization, 
            address, 
            phone, 
            workingHours, 
            userType: userType ? "doctor" : 'normal',
            location:
            {
                latitude: location ? location.coords.latitude: null,
                longitude: location ? location.coords.longitude: null
            },
            isLoading: false
        }
        try 
        {
            const response = await axios.post(SINGNUP_URL, body);
            this.setState({
                name:'',
                email: '',
                password: '',
                specialization: '',
                address: '',
                phone: '',
                workingHours: '',
                userType: false,
                location: null

            });
            this.props.navigation.navigate("SignIn",
            {
                alert:{messages:"Your account has been successfully registered", type:"success"}
            });
        } 
        catch(e){
            console.log(e);
            this.setState({
                alert: { messages: e.response.data.message, type: "danger"},
                isLoading: false
            });
            
        }



        
    }

    render()
    {
        const { name, email, password, specialization, address, phone, workingHours, userType, isLoading, alert } = this.state;
        return(
            <ScrollView contentContainerStyle={{paddingVertical: 40}}>
                <Loader title="A new account is creating" loading={isLoading} />
                <Alert messages={alert.messages} type={alert.type} />
                <View style={styles.container}>
                    <ScreenTitle 
                        title="Create new account"
                        icon="md-person-add"
                    />
                    <KeyboardAvoidingView behavior="padding" enabled >

                        <Input 
                            name='name'
                            placeholder="Name" 
                            onChangeText={this.changeNameHandler}
                            value={name} 
                            // onChange={this.handleOnChange}
                         />

                        <Input 
                            name='email'
                            placeholder="Email" 
                            onChangeText={this.changeEmailHandler}
                            // onChange={this.handleOnChange}
                            value={email} />

                        <Input 
                            name='password'
                            placeholder="Password" 
                            secureTextEntry
                            onChangeText={this.changePasswordHandler}
                            // onChange={this.handleOnChange}
                            value={password} />

                        <View 
                            style={styles.checkBoxContainer}
                            >
                            <CheckBox 
                                style={styles.checkBoxLabel} 
                                    name='userType'
                                    value={userType} 
                                    onChange={this.changeUserTypeHandler} 
                                    // onChange={this.handleOnChange}
                                    />

                            <Text style={styles.checkBoxLabel} >Doctors</Text>

                        </View>
                        {userType && (
                            <React.Fragment>
                                <Input 
                                    name='specialization'
                                    // onChange={this.handleOnChange}
                                    onChangeText={this.changeSpecializationHandler}
                                    placeholder="Specialization" value = {specialization} />

                                <Input 
                                   name="workingHours"
                                //    onChange={this.handleOnChange}
                                    onChangeText={this.changeWorkingHoursHandler}

                                    placeholder="Hours work"  value={workingHours} />

                                <Input 
                                   name="address"

                                    onChangeText={this.changeAddressHandler}
                                    // onChange={this.handleOnChange}

                                    placeholder="Address" value={address} />

                                <Input 
                                    name='phone'
                                    onChangeText={this.changePhoneHandler}
                                    // onChange={this.handleOnChange}

                                    placeholder="Phone Number" value={phone} />
                            </React.Fragment>
                        )}

                       
                        <Button 
                            text="New Account" 
                            onPress={this._SignUp}
                        />
                        <View style={{height: 30}} />
                        {/* <Button text="Home" onPress={() => this.props.navigation.navigate("Main")} />    */}
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        )
    }
}

