import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, ScrollView } from 'react-native';
import { Card, CardSection, Button, Confirm } from './common';
import ExpenseItemOverview from './ExpenseItemOverview';



class ExpensesMonth extends Component {

    componentWillMount() {
        //console.log('DEBUG', this.props.debug);
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
    return {
        // properties specified auth in reducers/index.js and email in reducers/AuthReducer.js
        // now available in the component as this.props.email
        userData: state.expenseItemOverviewReducer.userData
    };
};

export default connect(mapStateToProps, { 
   
})(ExpensesMonth);

