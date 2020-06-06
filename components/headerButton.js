import React from 'react';
import {TouchableOpacity,TouchableNativeFeedback, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const HeaderButton = ({iconName, headerPassed, direction}) =>
{
    const margin = direction === 'right' ? {marginRight: 20} : {marginLeft: 20};
    return (
        <TouchableOpacity
        background={TouchableNativeFeedback.Ripple("rgba(0, 0, 0, .32)", true)}
        onPress={headerPassed}
        >
            <View style={margin}>
                <Ionicons name={iconName} size={35} color="white" />
            </View>
        </TouchableOpacity>
    )
}

export default HeaderButton;