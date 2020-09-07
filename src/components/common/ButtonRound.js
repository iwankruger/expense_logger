import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonRound = (props) => {
    const { buttonStyle, textStyle } = styles;
    return (
        <TouchableOpacity onPress={props.onPress} style={buttonStyle}>
            <Text style={textStyle}>{props.children}</Text>
        </TouchableOpacity>
    );
 
};


const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#118ab2',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        borderWidth: 1,
        borderColor: '#118ab2',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignSelf: 'center'
    }
};

export { ButtonRound };
