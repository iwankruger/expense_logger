import React, { Component } from 'react';
import { View, Text, Picker, TextInput, Button as ButtonRn, Modal } from 'react-native';
import { Card, CardSection, Button, Confirm, Input } from './common';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Moment from 'moment';
import { categoryUpdate, descriptionUpdate, amountUpdate, expenseAdd } from '../actions';
import { connect } from 'react-redux';
import Calculator from './Calculator';


class ExpensesAdd extends Component {
    
    state = { isDatePickerVisible: false, date: Moment(new Date()).format('YYYY-MM-DD'), calculatorVisible: false };

    componentWillMount() {
        this.props.categoryUpdate(this.props.category);

        // link save button in navigation to function
        this.props.navigation.setParams({
            'onRight': this.save
        });

        this.setState({ calculatorVisible: false });
    }

    save = () => {
        const categorySelected = this.props.categorySelected;    
        const categories = this.props.categories;
        const description = this.props.description;
        const value = this.props.amount;
        const date = this.state.date;
    
        // get categoryId from selected category
        let categoryId = null;
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].category === categorySelected) {
                categoryId = categories[i].categoryId;
                break;          
            }
        }

        this.props.expenseAdd({ date, category: categorySelected, categoryId, description, value });
    }

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
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
                            value={this.props.description}
                            onChangeText={(value) => { this.props.descriptionUpdate(value); }}
                            //underlineColorAndroid='transparent'
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            //keyboardType="visible-password"
                        />
                    </View>
                </CardSection>
                <CardSection style={styles.containerStyle}>
                    <View style={styles.containerStyle2}>
                        <TextInput
                            placeholder={'Amount (R)'}
                            autoCorrect={false}
                            style={styles.inputStyle}
                            value={this.props.amount}
                            onChangeText={(value) => { this.props.amountUpdate(value); }}
                            //underlineColorAndroid="transparent"
                            underlineColorAndroid={'transparent'}
                            //keyboardType="visible-password"
                        />
                    </View>
                    <View style={{  }} >
                        <Icon name="calculator" size={30} color="#118ab2" onPress={() => { this.setState({ calculatorVisible: true })} } />
                        <Modal
                            visible={this.state.calculatorVisible}
                            transparent
                            animationType="slide"
                            onRequestClose={() => {}}
                            >
                                <View style={{flex: 1, backgroundColor: 'red',width1:400, height1:400}}>
                                    <Calculator onSave={(value) => {
                                        this.props.amountUpdate(value)
                                        this.setState({ calculatorVisible: false })
                                        }}
                                        onCancel={() => {this.setState({ calculatorVisible: false })}}
                                    />
                                </View>
                        </Modal>
                    </View>

                </CardSection>
                <CardSection style={styles.containerStyle}>
                    <View style={styles.containerStyle2}>
                            <TextInput
                                placeholder={'Date'}
                                autoCorrect={false}
                                style={styles.inputStyle}
                                value={this.state.date}
                                onChangeText={() => {}}
                                underlineColorAndroid="transparent"
                                //keyboardType="visible-password"
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
        //height: 40,
        
        
    },
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        //paddingTop: 0, 
        //paddingBottom: 0,
        fontSize: 18,
        lineHeight: 23,
        flex: 1,
        //backgroundColor: 'red'
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
        categorySelected: state.expenseAdd.categorySelected,
        description: state.expenseAdd.description,
        amount: state.expenseAdd.amount
    };
};

export default connect(mapStateToProps, { 
    categoryUpdate,
    descriptionUpdate,
    amountUpdate,
    expenseAdd 
})(ExpensesAdd);
