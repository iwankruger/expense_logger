import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, CardSection, Button } from './common';


class MenuItem extends Component {

    render() {
        return (
            <Card>
                <CardSection>
                <View style={thumbnailContainerStyle}>
                    <Image
                        style={thumbnailStyle}
                        source={{ uri: 'https://via.placeholder.com/400' }}
                    />
                  </View>
                  <View>
                      <Text>Scanner</Text>
                  </View>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    headerContentStyle: {
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    headerTextStyle: {
      fontSize: 18
    },
    thumbnailStyle: {
      height: 100,
      width: 100
    },
    thumbnailContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10
    },
    imageStyle: {
      height: 300,
      flex: 1,
      width: null
    }
  };

  const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    imageStyle
  } = styles;

export default MenuItem;