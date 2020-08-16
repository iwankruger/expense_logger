import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, CardSection, Button, ButtonRound } from './common';
import { StackedBarChart } from 'react-native-svg-charts'

const data = [
  {

      spent: 10,
      balance: 2,
  
  }
]

// ef476f rooi
// ffd166 geel 
// 06d6a0 groen
// 118ab2 blou
// 073b4c donker blou
const colors = ['#06d6a0', '#ddd']
const keys = ['spent', 'balance']

class MenuItem extends Component {

    render() {
        return (
            <Card>
                <CardSection style={{ backgroundColor1: 'green' }}>
                    <View style={{ backgroundColor1: 'red', flexDirection: 'column', flex: 1 }}>
                        <View style={{ backgroundColor1: 'orange', flexDirection: 'row' }} >
                            <Text style={{ fontWeight: 'bold' }}>Header </Text>
                        </View>
                        <View style={{ backgroundColor1: 'orange', flexDirection: 'row', flex1: 1 }} >
                            <View style={{ backgroundColor1: 'orange', flexDirection: 'column', flex: 1 }}>
                                <Text style={{ fontSize: 10 }}>Amount</Text>
                                <Text >R 125.00</Text>
                            </View> 
                            <View style={{ backgroundColor1: 'white', flexDirection: 'column', flex: 1 }}>
                                <Text style={{ fontSize: 10 }}>Budget</Text>
                                <Text >R 650.00</Text>
                            </View>
                            <View style={{ backgroundColor1: 'blue', flexDirection: 'column', flex: 1 }}>
                                <Text style={{ fontSize: 10 }}>Remaining</Text>
                                <Text >R 525.00</Text>
                            </View> 
                            <ButtonRound style={{ alignSelf: 'center' }}>+</ButtonRound>
                        </View>
                        <View style={{ backgroundColor1: 'green', flexDirection: 'row' }} >
                            <StackedBarChart
                                style={{ height: 5, flex: 1 }}
                                keys={keys}
                                colors={colors}
                                data={data}
                                showGrid={false}
                                horizontal={true}
                                contentInset={{ top: 0, bottom: 0 }}
                            />
                            
                        </View>
                    </View>
                    
            </CardSection>
          </Card>
        );
    }
}

{/* <Card>
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
</Card> */}

{/* <View style={bodyStyle} backgroundColor='yellow'>
                            <Text >Header</Text>
                        </View>
                        <View style={bodyStyle}>
                            <View style={bodyStyle} backgroundColor='red'>
                                <Text >Scanner</Text>
                            </View>
                            <View style={bodyStyle} backgroundColor='green'>
                                <Text style={bodyStyle}>Scanner</Text>
                            </View>
                            <View style={bodyStyle} backgroundColor='blue'>
                                <Text style={bodyStyle}>Scanner</Text>
                            </View>
                        </View> */}

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
    },
    bodyStyle: {
        flex: 1,
        justifyContent: 'center',
        //flexDirection: 'row',
    },
    debug: {
        alignItems: 'center'   
    }
  };

//   containerStyles: {
//     borderBottomWidth: 1, 
//     padding: 5,   
//     shadowColor: '#FFF',
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//     borderColor: '#ddd',
//     position: 'relative'
// }

  const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    imageStyle,
    bodyStyle,
    debug
  } = styles;

export default MenuItem;