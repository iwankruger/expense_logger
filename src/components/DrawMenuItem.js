import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from './common';
import { menuItemSelected } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome5';


// notes 
// TouchableWithoutFeedback needs a View child component

class DrawMenuItem extends Component {

    render() {
        const title = this.props.title;
        const text = this.props.text;
        const imageSource = this.props.imageSource;
        const icon = this.props.icon;

        return (
            <TouchableWithoutFeedback
                key={title}
                onPress={() => { this.props.itemSelectedAction(); }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={thumbnailContainerStyle}>
                        <Icon name={icon} size={20} color="#118ab2" />
                    </View>
                    <View style={textAlign}>
                        <Text style={headerTextStyle}>{title}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    headerContentStyle: {
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    headerTextStyle: {
      fontSize: 18,
    },
    thumbnailStyle: {
      height: 20,
      width: 20
    },
    thumbnailContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 5,
      marginBottom: 5,
      width: 30
    },
    imageStyle: {
      height: 300,
      flex: 1,
      width: null
    },
    textAlign: {
      flex: 1, 
      justifyContent: 'center', 
      //alignItems: 'center',
    }
  };

  const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    imageStyle,
    textAlign
  } = styles;

export default connect(null, { menuItemSelected })(DrawMenuItem);
