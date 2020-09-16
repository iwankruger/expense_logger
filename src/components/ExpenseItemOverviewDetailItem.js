import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, CardSection, Button, ButtonRound } from './common';
import { StackedBarChart } from 'react-native-svg-charts';
import { Actions } from 'react-native-router-flux';
import Moment from 'moment';


// ef476f rooi
// ffd166 geel 
// 06d6a0 groen
// 118ab2 blou
// 073b4c donker blou


class ExpenseItemOverviewDetailItem extends Component {

    componentWillMount() {
       
    }

    addBoldStyling() {

    }

    render() {
        const { categoryId, category, description, expenseAmount, date } = this.props.data;
        const { currency } = this.props.settings;
        const incomeDate = (date) ? Moment(date, 'YYYY-MM-DD hh:mm:ss.SSS [GMT]ZZ').format('YYYY-MM-DD hh:mm:ss') : null;
        
        return (
            <View style={{ padding: 5, borderBottomWidth: 1, borderColor: '#ddd' }}>
                
                    <View style={{ backgroundColor1: 'red', flexDirection: 'column', flex: 1 }}>
                        { incomeDate &&
                        <Text style={{ fontSize: 10 }}>{incomeDate}</Text>
                        }
                        <View style={{ backgroundColor1: 'orange', flexDirection: 'row', flex1: 1 }} >
                            <View style={{ backgroundColor1: 'orange', flexDirection: 'column', flex: 1 }}>
                                <Text style={this.props.settingsAdditional} >{category}</Text>
                            </View>
                            <View style={{ backgroundColor1: 'orange', flexDirection: 'column', flex: 1 }}>
                            <Text style={this.props.settingsAdditional}>{description}</Text>
                            </View> 
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={{ ...this.props.settingsAdditional, alignSelf: 'flex-end' }}>{currency} {expenseAmount ? expenseAmount.toFixed(2) : 0}</Text>
                            </View>
                            {/* <ButtonRound style={{ alignSelf: 'center' }} onPress={this.onButtonPress.bind(this)}>+</ButtonRound> */}
                        </View>
                    </View>
                    
          
          </View>
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


export default ExpenseItemOverviewDetailItem;
