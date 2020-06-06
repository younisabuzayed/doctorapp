import React from 'react';
import { View, TextInput, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default class Input extends React.Component
{
    state = 
    {
        focused: false,
    }

    render()
    {
        const {
            onChangeText,
            inputStyles,
            value,
            placeholder,
            secureTextEntry,
            icon,
            onChange
        } = this.props;
        return (
            <View>
                <TextInput
                 style={[styles.input,
                 inputStyles,
                 this.state.focused && styles.focused
                 ]}
                 onChangeText={onChangeText}
                 placeholder={placeholder}
                 secureTextEntry={secureTextEntry}
                 onFocus={() => this.setState({focused: true})}
                 onBlur={() => this.setState({focused: false})}
                 value={value}
                 onChange={onChange}
                />
                {icon && <Ionicons name={icon} size={30} color='#ccc' style={styles.icon} />}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:
    {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input:
    {
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
        width: 300,
        fontSize: 18,
        padding: 5,
        marginBottom: 30,
        textAlign: "left"
    },
    focused:
    {
        borderBottomColor: '#007bff'
    },
    icon:
    {
        position: "absolute", left: 10
    }
})