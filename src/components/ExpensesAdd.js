import React, { Component } from 'react';
import { View, Text, Picker, TextInput, Button as ButtonRn  } from 'react-native';
import { Card, CardSection, Button, Confirm, Input } from './common';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Moment from 'moment';
import { categoryUpdate } from '../actions';
import { connect } from 'react-redux';


class ExpensesAdd extends Component {

    state = { isDatePickerVisible: false, date: '' };

    componentWillMount() {
        console.log('DEBUG123', this.props);
        this.props.categoryUpdate(this.props.category);
    }

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
        console.log('show picket')
        console.log(this.props)
    }

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    }

    handleConfirm = (date) => {
        date = Moment(date).format('YYYY-MM-DD');
        this.setState({ date: date });
        this.hideDatePicker();
    }

    renderPickerData = () => {
        const categories = this.props.categories;
        const items = [];
        console.log('CCCC ', categories);
        //console.log('CCCC ', categories[0].category);
        for (let i = 0; i < categories.length; i++) {
            items.push(<Picker.Item key={`${categories[i].categoryId}`} label={`${categories[i].category}`} value={`${categories[i].category}`} />);
        }
        return (items);
    }

   

    render() {
        return (
            <Card>
                <CardSection style={styles.containerStyle}>
                    <View style={styles.containerStyle2}>
                        <Picker 
                            style={{ flex: 1 }}
                            selectedValue={this.props.categorySelected}
                            onValueChange={value => { 
                                console.log('S ',value);
                                this.props.categoryUpdate(value); 
                            }}
                        >
                            {this.renderPickerData()}
                            
                        </Picker>
                    </View>
                </CardSection>
                <CardSection style={styles.containerStyle}>
                    <View style={styles.containerStyle2}>
                        <TextInput
                            placeholder={'Description'}
                            autoCorrect={false}
                            style={styles.inputStyle}
                            value={''}
                            onChangeText={() => {}}
                        />
                    </View>
                </CardSection>
                <CardSection style={styles.containerStyle}>
                    <View style={styles.containerStyle2}>
                        <TextInput
                            placeholder={'Amount (R)'}
                            autoCorrect={false}
                            style={styles.inputStyle}
                            value={''}
                            onChangeText={() => {}}
                        />
                    </View>

                </CardSection>
                <CardSection style={styles.containerStyle}>
                    <View style={{ flex: 1 }}>
                            <TextInput
                                placeholder={'Date'}
                                autoCorrect={false}
                                style={styles.inputStyle}
                                value={this.state.date}
                                onChangeText={() => {}}
                            />
                    </View>
                    <View style={{  }} >
                        <Icon name="calendar-alt" size={30} color="#118ab2" onPress={this.showDatePicker} />
                        <DateTimePickerModal
                            isVisible={this.state.isDatePickerVisible}
                            mode="date"
                            onConfirm={this.handleConfirm}
                            onCancel={this.hideDatePicker}
                        />
                    </View>
                        
                </CardSection>
                <CardSection style={styles.containerStyle}>

                </CardSection>

                
                
                
                
                      
                        
            </Card>
        );
    }
}

//  <View style={{ flexDirection: 'column', flex: 1 }} >
// <View style={ { 'flex-direction': 'column', flex: 1, padding: 5, position: 'relative' } } > </View> 

{/* <CardSection style={styles.containerStyle}>
    <View style={ {paddingLeft1: 20, 'flex-direction': 'row', flex: 1 } }>
        <View style={ {paddingLeft1: 20, 'flex-direction': 'row', flex: 1} } >
            <Icon name="calendar-alt" size={30} color="#118ab2" onPress={this.showDatePicker} />
            <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
            />
        </View>
        <View style={ {paddingLeft: 5, 'flex-direction': 'row', flex: 1}}>
            <Text>Hello</Text>
            <Text>Hello</Text>
        </View>
    </View>
</CardSection> */}


const styles = {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    }, 
    containerStyle: {
        flexDirection: 'row',
        borderBottomWidth: 0,
        
    },
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        paddingTop: 0, 
        paddingBottom: 0,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    lableStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle2: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
    
};



const mapStateToProps = state => {
  
    return {
        categorySelected: state.expenseAdd.categorySelected
    };
};

export default connect(mapStateToProps, { 
    categoryUpdate 
})(ExpensesAdd);
