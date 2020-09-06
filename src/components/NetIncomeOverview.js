import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { Card, CardSection, Button, ButtonRound } from './common';
import { StackedBarChart, LineChart, XAxis, Grid, BarChart } from 'react-native-svg-charts';
import { Actions } from 'react-native-router-flux';
import Moment from 'moment';



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
        const categories = this.props.categories;
        console.log(categories);
        Actions.expensesAdd({ categoryId, category, categories });
    }

    showExpenseDetail() {
        const { category, categoryId } = this.props.data;
        const expenses = this.props.expenses;
        console.log('CCCCCCCLLLLLLIIIIIIIICCCCCCCCCCKKKKKKKK ');
        Actions.expensesOverviewDetail({ categoryId, category, expenses });
    }

    render() {
        const { expensesTotal, incomeAfterTaxAmount, incomeNet, settings, expenses, incomes } = this.props.financialData;
        const { currency } = settings;

        //const dateRange = Moment(expenses[0].date).format();
        const dateCurrent = Moment(expenses[0].date).format('YYYY-MM-01');
        let date = new Date(expenses[0].date);
        //let date = new Date('2021-02-01');
        const monthLastDay = parseInt(Moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format('DD'));
        console.log('DATTTTTTTTTTTTTT ', monthLastDay);

        // set graph colors
        const colors = ['#06d6a0', '#073b4c'];
        const keys = ['income', 'expense'];
        const chartData = [];

        for (let i = 0; i < monthLastDay; i++) {
            chartData.push({ income: 0, expense: 0 });
        }

        for (let i = 0; i < expenses.length; i++) {
            //const expenseDate = expenses[i].date;
            const expenseDayIndex = parseInt(Moment(expenses[i].date).format('DD')) - 1;
            const expenseAmount = expenses[i].expenseAmount;
            console.log(expenseDayIndex);
            chartData[expenseDayIndex].expense += expenseAmount;
        }

        for (let i = 0; i < incomes.length; i++) {
            //const expenseDate = expenses[i].date;
            const expenseDayIndex = parseInt(Moment(incomes[i].date).format('DD')) - 1;
            const incomeGrossAmount = incomes[i].incomeGrossAmount ? incomes[i].incomeGrossAmount : 0;
            const taxAmount = incomes[i].taxAmount ? incomes[i].taxAmount : 0;
            const uifAmount = incomes[i].uifAmount ? incomes[i].uifAmount : 0;
            const otherTaxAmount = incomes[i].otherTaxAmount ? incomes[i].otherTaxAmount : 0;
            const incomeTaxAmount = taxAmount + uifAmount + otherTaxAmount;
            const incomeAfterTaxAmountDay = incomeGrossAmount - incomeTaxAmount;
            console.log(expenseDayIndex);
            chartData[expenseDayIndex].income += incomeAfterTaxAmountDay;
        }


        //const chartData = [50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80];
        const fill = 'rgb(134, 65, 244)';

        //if (spendPercentage >= 80) colors[0] = '#ef476f';
        //else if (spendPercentage >= 60) colors[0] = '#ffd166';

        return (
            <Card>
                <CardSection style={{ backgroundColor1: 'green' }}>
                    <View style={{ backgroundColor1: 'red', flexDirection: 'column', flex: 1 }}>
                        <View style={{ backgroundColor1: 'green', flexDirection: 'row' }} >
                            <View style={{ backgroundColor1: 'green', height: 100, padding1: 20,flex: 1 }}>
                                {/* <BarChart
                                    style={{ flex: 1 }}
                                    data={chartData}
                                    gridMin={0}
                                    contentInset={{ top: 10, bottom: 10 }}
                                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                                > */}
                                <StackedBarChart
                                style={{ height: 5, flex: 1 }}
                                keys={keys}
                                colors={colors}
                                data={chartData}
                                showGrid={false}
                                horizontal={false}
                                contentInset={{ top: 0, bottom: 0 }}
                                >
                                    <Grid />
                                </StackedBarChart>    

                                {/* <BarChart style={{ height: 200 }} 
                                    data={chartData} 
                                    svg={{ fill }} 
                                    contentInset={{ top: 30, bottom: 30 }}>
                                    <Grid />
                                </BarChart> */}
                                <XAxis
                                    style={{ marginHorizontal: -10 }}
                                    data={chartData}
                                    formatLabel={(value, index) => index}
                                    contentInset={{ left: 10, right: 10 }}
                                    svg={{ fontSize: 10, fill: 'black' }}
                                />
                            </View>      
                        </View>
                        <View style={{ backgroundColor1: 'orange', flexDirection: 'row', flex1: 1 }} >
                            <View style={{ backgroundColor1: 'white', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                                <Text style={{ fontSize1: 10, fontWeight: 'bold' }}>Income After Tax</Text>
                                <Text>{currency} {expensesTotal.toFixed(2)}</Text>
                            </View>
                            <View style={{ backgroundColor1: 'white', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                                <Text style={{ fontSize1: 10, fontWeight: 'bold' }}>Expenses</Text>
                                <Text>{currency} {incomeAfterTaxAmount.toFixed(2)}</Text>
                            </View>
                            <View style={{ backgroundColor1: 'white', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                                <Text style={{ fontSize1: 10, fontWeight: 'bold' }}>Net Income</Text>
                                <Text>{currency} {incomeNet.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                </CardSection>

            </Card>);

        const { categoryId, category, budget, remaining, total } = this.props.data;
        //const { currency } = this.props.settings;

        console.log('ITEM ', this.props.data);
        
        // calculate graph values
        let spendPercentage = (total / budget) * 100;
        
        if (spendPercentage > 100) spendPercentage = 100;
        
        chartData = [{
            spent: spendPercentage,
            balance: 100 - spendPercentage,
        }];

        

        return (
            <TouchableWithoutFeedback
                key={1}
                onPress={this.showExpenseDetail.bind(this)}
            >
                <View>
            <Card>
                <CardSection style={{ backgroundColor1: 'green' }}>
                    <View style={{ backgroundColor1: 'red', flexDirection: 'column', flex: 1 }}>
                        <View style={{ backgroundColor1: 'orange', flexDirection: 'row' }} >
                            <Text style={{ fontWeight: 'bold' }}>{category}</Text>
                        </View>
                        <View style={{ backgroundColor1: 'orange', flexDirection: 'row', flex1: 1 }} >
                            <View style={{ backgroundColor1: 'orange', flexDirection: 'column', flex: 1 }}>
                                <Text style={{ fontSize: 10 }}>Amount</Text>
                                <Text>{currency} {total.toFixed(2)}</Text>
                            </View> 
                            <View style={{ backgroundColor1: 'white', flexDirection: 'column', flex: 1 }}>
                                <Text style={{ fontSize: 10 }}>Budget</Text>
                                <Text>{currency} {budget.toFixed(2)}</Text>
                            </View>
                            <View style={{ backgroundColor1: 'blue', flexDirection: 'column', flex: 1 }}>
                                <Text style={{ fontSize: 10 }}>Remaining</Text>
                                <Text>{currency} {remaining.toFixed(2)}</Text>
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
