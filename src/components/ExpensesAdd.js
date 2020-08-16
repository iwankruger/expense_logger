import React, { Component } from 'react';
import { View, Text, Picker, TextInput, Button as ButtonRn  } from 'react-native';
import { Card, CardSection, Button, Confirm, Input } from './common';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


class ExpensesAdd extends Component {

    state = { isDatePickerVisible: false };

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
        console.log('show picket')
        console.log(this.props)
    }

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    }

    handleConfirm = (date) => {
        console.warn('A date has been picked: ', date);
        this.hideDatePicker();
    }

    renderPickerData = () => {
        const items = [];
        for (let i = 1; i <= 30; i++) {
            items.push(<Picker.Item key={`${i}`} label={`${i}`} value={`${i}`} />);
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
                            selectedValue={this.props.codeMax}
                            onValueChange={value => {  }}
                        >
                            <Picker.Item key={`1`} label={`1`} value={`Kos`} />
                            <Picker.Item key={`2`} label={`2`} value={`Petrol`} />
                        </Picker>
                    </View>
                </CardSection>
                <CardSection style={styles.containerStyle}>
                    <View style={styles.containerStyle2}>
                        <TextInput
                            secureTextEntry={ () => {} }
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
                            secureTextEntry={ () => { return false } }
                            placeholder={'Amount (R)'}
                            autoCorrect={false}
                            style={styles.inputStyle}
                            value={''}
                            onChangeText={() => {}}
                        />
                    </View>
                </CardSection>
                <View>
                <ButtonRn title="Show Date Picker" onPress={this.showDatePicker} />
                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
                </View>

                
                
                
                
                      
                        
            </Card>
        );
    }
}

//  <View style={{ flexDirection: 'column', flex: 1 }} >
// <View style={ { 'flex-direction': 'column', flex: 1, padding: 5, position: 'relative' } } > </View> 

const styles = {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    }, 
    containerStyle: {
        'flex-direction': 'column',
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

export default ExpensesAdd;
