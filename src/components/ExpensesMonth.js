import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, ScrollView } from 'react-native';
import { Card, CardSection, Button, Confirm } from './common';
import ExpenseItemOverview from './ExpenseItemOverview';
import { synchronise, synchroniseStatus } from '../actions/expenseOverviewActions';



class ExpensesMonth extends Component {

    componentWillMount() {
        console.log('DEBUGGGGGGGGGGGGGGGGGGGGGGGGGGGG');

        const status = this.props.synchroniseStatusFlag;
        console.log('STATUS ',this.props.synchroniseStatusFlag);
        this.props.synchroniseStatus();
        // link save button in navigation to function
        this.props.navigation.setParams({
            'onRight': this.synchronise
        });
        
        if (this.props.synchroniseStatusFlag) {
            this.syncTextGreen();
        } else {
            this.syncTextRed();
        }
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
        if (prevProps.synchroniseStatusFlag === this.props.synchroniseStatusFlag) return;
        
        if (this.props.synchroniseStatusFlag) {
            this.syncTextGreen();
            return;
        }
        this.syncTextRed();

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
       this.props.synchronise();
    }

    
    renderMonthData() {
        const items = [];

        if (!this.props.userData) return;

        const { data, settings, categories } = this.props.userData;
        console.log('DEBUG', settings);
        console.log('GGG ');
        for (let i = 0; i < data.length; i++) {
            items.push(<ExpenseItemOverview key={`${i}`} label={`${i}`} value={`${i}`} data={data[i]} settings={settings} categories={categories} />);
        }
        return (items);

    }

    render() {
        return (
            <ScrollView>
                { this.renderMonthData() }
            </ScrollView>
        );
    }
}

// get state back into the component
// the task of this helper is to get the state back 
// into the form from the state object
const mapStateToProps = state => {
    console.log('VIEW ', state.expenseItemOverviewReducer.synchroniseStatus);
    return {
        // properties specified auth in reducers/index.js and email in reducers/AuthReducer.js
        // now available in the component as this.props.email
        userData: state.expenseItemOverviewReducer.userData,
        synchroniseStatusFlag: state.expenseItemOverviewReducer.synchroniseStatus,
    };
};

export default connect(mapStateToProps, { 
    synchronise,
    synchroniseStatus
})(ExpensesMonth);

