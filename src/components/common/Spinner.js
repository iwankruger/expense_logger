import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Spinner = ({size}) => {

    return (
        <View style={styles.spinnerStyles}>
            <ActivityIndicator size={size || 'large'} color="#007aff" />
        </View>
    );
};

const styles = {
    spinnerStyles: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export { Spinner };
