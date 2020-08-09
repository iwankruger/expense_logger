import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {

    return (
        <View style={[styles.containerStyles, props.style]}>
            {props.children}   
        </View>
    );
};

const styles = {
    containerStyles: {
        borderBottomWidth: 1, 
        padding: 5,   
        shadowColor: '#FFF',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export { CardSection };