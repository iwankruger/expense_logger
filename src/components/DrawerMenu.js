import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, SafeAreaView, TouchableOpacity, Avatar, ScrollView, Image } from 'react-native';
import { Card, CardSection, Button, Confirm } from './common';
import {Actions} from 'react-native-router-flux';
import MonthPicker, { ACTION_DATE_SET, ACTION_DISMISSED } from 'react-native-month-year-picker';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DrawMenuItem from './DrawMenuItem';
import { setMonth, logout, clearLocalData } from '../actions';

class DrawerMenu extends Component {

    state = { monthSelectedShow: false };

    showMonthSelector = () => {
        this.setState({ monthSelectedShow: true });
    }

    onValueChange = (event, newDate) => {
        
        this.setState({ monthSelectedShow: false });

        if (event === ACTION_DISMISSED) {
            // todo
        }

        if (event === ACTION_DATE_SET) {
            this.props.setMonth(newDate); 
        }
    }

    render() {
        return (
            <ScrollView>
                <SafeAreaView>
                    {this.state.monthSelectedShow && (
                    <MonthPicker
                        onChange={this.onValueChange}
                        value={Moment(this.props.date).format('MM-YYYY')}
                        minimumDate={new Date(2000, 1)}
                        maximumDate={new Date(2099, 12)}
                        enableAutoDarkMode={false}
                        //cancelButton={() => { this.setState({ monthSelectedShow: false }); }}
                    />
                    )}
                </SafeAreaView>
                <View style={{ flexDirection1: 'row', marginBottom: 20 }}>
                    <View style={thumbnailContainerStyle}>
                        <Icon name={'user'} size={100} color="#118ab2" />
                    </View>
                    <View style={textAlign}>
                        <Text style={headerTextStyle}>{this.props.login}</Text>
                    </View>
                </View>
                <DrawMenuItem title='Month' menuSelected={'test'} icon={'calendar-alt'} text='' itemSelectedAction={() => { this.showMonthSelector(); }} />
                <DrawMenuItem title='Income' menuSelected={'test'} icon={'wallet'} text='' itemSelectedAction={() => { Actions.pop(); Actions.income(); }}/>
                <DrawMenuItem title='Expenses' menuSelected={'test'} icon={'credit-card'} text='' itemSelectedAction={() => { Actions.pop(); Actions.expenses(); }} />
                <DrawMenuItem title='Charts' menuSelected={'test'} icon={'chart-line'} text='' itemSelectedAction={() => { /*Actions.expensesAdd({ });*/ }}/>
                <DrawMenuItem title='Settings' menuSelected={'test'} icon={'cog'} text='' itemSelectedAction={() => {}}/>
                <DrawMenuItem title='Clear Local Data' menuSelected={'test'} icon={'trash-alt'} text='' itemSelectedAction={() => { this.props.clearLocalData(); }}/>
                <DrawMenuItem title='Logout' menuSelected={'test'} icon={'door-closed'} text='' itemSelectedAction={() => { this.props.logout(); }}/>
            </ScrollView>
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
      height: 100,
      width: 100
    },
    thumbnailContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10,
      marginTop: 20,
      marginBottom: 10,
      //backgroundColor: 'red'
    },
    imageStyle: {
      height: 300,
      flex: 1,
      width: null
    },
    textAlign: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
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


const mapStateToProps = state => {
    return {
        date: state.expenseItemOverviewReducer.date,
        login: state.expenseItemOverviewReducer.login
    };
};

export default connect(mapStateToProps, { 
    setMonth,
    logout,
    clearLocalData
})(DrawerMenu);

