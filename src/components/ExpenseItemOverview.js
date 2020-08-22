import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, CardSection, Button, ButtonRound } from './common';
import { StackedBarChart } from 'react-native-svg-charts';
import { Actions } from 'react-native-router-flux';



// ef476f rooi
// ffd166 geel 
// 06d6a0 groen
// 118ab2 blou
// 073b4c donker blou


class MenuItem extends Component {

    componentWillMount() {
        console.log('DEBUG', this.props);
    }

    onButtonPress(text) {
        //this.props.expenseAdd('add');
        const { category, categoryId } = this.props.data;
        //console.log(categoryId);
        Actions.expensesAdd({ categoryId, category });
    }

    render() {
        const { category, budget, remaining, total } = this.props.data;
        const { currency } = this.props.settings;
        
        // calculate graph values
        let spendPercentage = (total / budget) * 100;
        
        if (spendPercentage > 100) spendPercentage = 100;
        
        const chartData = [{
            spent: spendPercentage,
            balance: 100 - spendPercentage,
        }];

        // set graph colors
        const colors = ['#06d6a0', '#ddd'];
        const keys = ['spent', 'balance'];

        if (spendPercentage >= 80) colors[0] = '#ef476f';

        return (
            <Card>
                <CardSection style={{ backgroundColor1: 'green' }}>
                    <View style={{ backgroundColor1: 'red', flexDirection: 'column', flex: 1 }}>
                        <View style={{ backgroundColor1: 'orange', flexDirection: 'row' }} >
                            <Text style={{ fontWeight: 'bold' }}>{category}</Text>
                        </View>
                        <View style={{ backgroundColor1: 'orange', flexDirection: 'row', flex1: 1 }} >
                            <View style={{ backgroundColor1: 'orange', flexDirection: 'column', flex: 1 }}>
                                <Text style={{ fontSize: 10 }}>Amount</Text>
                                <Text>{currency} {total}</Text>
                            </View> 
                            <View style={{ backgroundColor1: 'white', flexDirection: 'column', flex: 1 }}>
                                <Text style={{ fontSize: 10 }}>Budget</Text>
                                <Text>{currency} {budget}</Text>
                            </View>
                            <View style={{ backgroundColor1: 'blue', flexDirection: 'column', flex: 1 }}>
                                <Text style={{ fontSize: 10 }}>Remaining</Text>
                                <Text>{currency} {remaining}</Text>
                            </View> 
                            <ButtonRound style={{ alignSelf: 'center' }} onPress={this.onButtonPress.bind(this)}>+</ButtonRound>
                        </View>
                        <View style={{ backgroundColor1: 'green', flexDirection: 'row' }} >
                            <StackedBarChart
                                style={{ height: 5, flex: 1 }}
                                keys={keys}
                                colors={colors}
                                data={chartData}
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


const mapStateToProps = state => {
    console.log('PROP', state.admin);
    return {
        
    };
};

export default MenuItem;
