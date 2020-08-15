import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Card, CardSection, Button, Confirm } from './common';
import ExpenseItemOverview from './ExpenseItemOverview';


class ExpensesMonth extends Component {

    render() {
        return (
            <ScrollView>
                <ExpenseItemOverview />
                <ExpenseItemOverview />
                <ExpenseItemOverview />
                <ExpenseItemOverview />
                <ExpenseItemOverview />
            </ScrollView>
        );
    }
}

export default ExpensesMonth;
