import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, ScrollView } from 'react-native';
import { Card, CardSection, Button, Confirm, ButtonRound } from './common';
import ExpenseItemOverviewDetailItem from './ExpenseItemOverviewDetailItem';
import { synchronise, synchroniseStatus } from '../actions/expenseOverviewActions';
import Moment from 'moment';
import { Actions } from 'react-native-router-flux';


class ExpenseItemOverviewDetail extends Component {

    componentWillMount() {
        
        const title = `${Moment(new Date(this.props.date)).format('MMMM Y')} Expenses`;
        this.props.navigation.setParams({ title });

        // const status = this.props.synchroniseStatusFlag;
        // console.log('STATUS ',this.props.synchroniseStatusFlag);
        // this.props.synchroniseStatus();
        // // link save button in navigation to function
        // this.props.navigation.setParams({
        //     'onRight': this.synchronise
        // });
        
        // if (this.props.synchroniseStatusFlag) {
        //     this.syncTextGreen();
        // } else {
        //     this.syncTextRed();
        // }
        // this.props.navigation.setParams({
        //     //'rightTitle': 'test',
        //     //rightButtonTextStyle: {color: '#06d6a0'},
        //     rightButtonTextStyle: {color: '#ef476f'},
        // });
        // this.props.navigation.setParams({
        //     'titleStyle': {color:'red'}
        // });

        


        
    }

    

    componentDidUpdate(prevProps) {
        console.log(`${prevProps.synchroniseStatusFlag} == ${this.props.synchroniseStatusFlag}`);
        if (prevProps.synchroniseStatusFlag !== this.props.synchroniseStatusFlag) {
            if (this.props.synchroniseStatusFlag) return this.syncTextGreen();

            this.syncTextRed();
        }

        if (prevProps.date !== this.props.date) {
            const title = `${Moment(new Date(this.props.date)).format('MMMM Y')} Income`;
            this.props.navigation.setParams({ title });
        }

        

    }

    syncTextRed() {
        // set sync text to red
        this.props.navigation.setParams({
            rightButtonTextStyle: { color: '#ef476f' },
        });
    }

    syncTextGreen() {
        // set sync text to green
        this.props.navigation.setParams({
            rightButtonTextStyle: { color: '#06d6a0' },
        });
    }

    synchronise = () => {
       console.log('synchronise'); 
       this.props.synchronise(this.props.date);
    }

    onButtonPressAddIncome(text) {
        const { data, settings, categoriesIncome } = this.props.userData;
 
        const category = (categoriesIncome && Array.isArray(categoriesIncome) && categoriesIncome.length > 0
            && categoriesIncome[0].category) ? categoriesIncome[0].category : null;

        Actions.incomeAdd({ category, categories: categoriesIncome });

    }

    
    renderIncomeData() {
        const items = [];

        console.log('PROPS ',this.props);
        const { category, categoryId, expenses } = this.props;

        if (!this.props.userData) return;

        const { incomeOverview, settings, categoriesIncome } = this.props.userData;

        //if (!incomeOverview) return;

        items.push(
            <View style={{ padding: 5, borderBottomWidth: 1, borderColor: '#ddd' }}>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <View style={{ flexDirection: 'row'}} >
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={{ fontWeight: 'bold' }} >Category</Text>
                            </View>
                            <View style={{ backgroundColor1: 'orange', flexDirection: 'column', flex: 1 }}>
                            <Text style={{ fontWeight: 'bold' }}>Description</Text>
                            </View> 
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>Amount</Text>
                            </View>
                        </View>
                    </View>
            </View>
        );

        for (let i = 0; i < expenses.length; i++) {
            //const settingsAdditional = i === 0 ? { fontWeight: 'bold' } : { };
            if (categoryId == expenses[i].categoryId || !categoryId) {
                items.push(<ExpenseItemOverviewDetailItem key={`${i}`} label={`${i}`} value={`${i}`} data={expenses[i]} settings={settings} categories={{}} settingsAdditional={{}} />);
            }
        }
        return (items);

    }

    render() {
        return (
            <ScrollView>
                <Card>
                    <CardSection style={{ flexDirection: 'column' }}>
                        { this.renderIncomeData() }
                    </CardSection>
                </Card>
            </ScrollView>
        );
    }
}

// get state back into the component
// the task of this helper is to get the state back 
// into the form from the state object
const mapStateToProps = state => {
    console.log('VIEW ', state.expenseItemOverviewReducer.date);
    return {
        // properties specified auth in reducers/index.js and email in reducers/AuthReducer.js
        // now available in the component as this.props.email
        userData: state.expenseItemOverviewReducer.userData,
        date: state.expenseItemOverviewReducer.date,
        synchroniseStatusFlag: state.expenseItemOverviewReducer.synchroniseStatus,
    };
};

export default connect(mapStateToProps, { 
    synchronise,
    synchroniseStatus
})(ExpenseItemOverviewDetail);

