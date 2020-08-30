import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, SafeAreaView, TouchableOpacity, Avatar, ScrollView, Image } from 'react-native';
import { Card, CardSection, Button, Confirm } from './common';
import {Actions} from 'react-native-router-flux';
import MonthPicker, { ACTION_DATE_SET, ACTION_DISMISSED } from 'react-native-month-year-picker';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DrawMenuItem from './DrawMenuItem';
import { setMonth } from '../actions/expenseOverviewActions';


// const [date, setDate] = useState(new Date());
//     const [show, setShow] = useState(false);
    
//     const showPicker = useCallback((value) => setShow(value), []);
    
//     const onValueChange = useCallback(
//         (event, newDate) => {
//         const selectedDate = newDate || date;
    
//         showPicker(false);
//         setDate(selectedDate);
//         },
//         [date, showPicker],
//     );




class DrawerMenu extends Component {

    state = { monthSelectedShow: false };

    showMonthSelector = () => {
        this.setState({ monthSelectedShow: true });
        console.log('show picket')
        console.log(this.props)
    }

    onValueChange = (event, newDate) => {
        console.log('VVVVVVVVVVVVVVv');
        console.log(event);
        console.log(newDate);

        this.setState({ monthSelectedShow: false });

        if (event === ACTION_DISMISSED) {
            console.log('DDDDD');
            
        }

        if (event === ACTION_DATE_SET) {
            console.log('SSSS');
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
                        <Text style={headerTextStyle}>{'hello'}</Text>
                    </View>
                </View>
                <DrawMenuItem title='Month' menuSelected={'test'} icon={'calendar-alt'} text='' itemSelectedAction={() => { this.showMonthSelector(); }} />
                <DrawMenuItem title='Charts' menuSelected={'test'} icon={'chart-line'} text='' itemSelectedAction={() => { /*Actions.expensesAdd({ });*/ }}/>
                <DrawMenuItem title='Settings' menuSelected={'test'} icon={'cog'} text='' itemSelectedAction={() => {}}/>
            </ScrollView>
        );
    }

    
    // //let monthSelectedShow = false;
    // state = { monthSelected: `${new Date()}`, monthSelectedShow: false };

    // //showPicker = useCallback((value) => setShow(value), []);

    // showMonthSelector = () => {
    //     this.setState({ monthSelectedShow: true });
    //     console.log('show picket')
    //     console.log(this.props)
    // }

    // render() {
    //     return (
            
    //         <View>
    //             <View style={{}}>
    //                 <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        
    //                     <Text style={{ color: '#f9f9f9', marginTop: '3%', fontFamily: 'sans-serif-condensed' }}>{`Hi `}</Text>
    //                     <Text style={{ color: '#f9f9f9', fontFamily: 'sans-serif-condensed' }}>{`email`}</Text>
    //                 </View>
    //             </View>
    //             <CardSection>
    //                 <Button onPress={ Actions.pop }>Close</Button>
    //             </CardSection>
    //             <Card>
    //                 <CardSection>
    //                     <View>
    //                         <Text>Scanner</Text>
    //                     </View>
    //                 </CardSection>
    //             </Card>
    //             <SafeAreaView>
    //                 <Text>Month Year Picker Example</Text>
    //                 <Text>{this.state.monthSelected}</Text>
    //                 <TouchableOpacity onPress={() => this.showMonthSelector()}>
    //                     <Text>OPEN</Text>
    //                 </TouchableOpacity>
    //                 {this.state.monthSelectedShow && (
    //                 <MonthPicker
    //                     onChange={() => {}}
    //                     value={'12-1999'}
    //                     minimumDate={new Date(2000, 1)}
    //                     maximumDate={new Date(2099, 12)}
    //                     enableAutoDarkMode={false}
    //                 />
    //                 )}
                    
                    
                 
    //             </SafeAreaView>
    //             <Text>Item 1</Text>
    //             <Text>Item 2</Text>
    //             <Text>Item 3</Text>
    //             <Text>Item 4</Text>
    //             <Text>Item 5</Text>
    //             <Text>Item 6</Text>

    //         </View>
    //     );
    // }
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
        date: state.expenseItemOverviewReducer.date
    };
};

export default connect(mapStateToProps, { 
    setMonth
})(DrawerMenu);

