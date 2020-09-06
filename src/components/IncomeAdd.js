import React, { Component } from 'react';
import { View, Text, Picker, TextInput, Button as ButtonRn  } from 'react-native';
import { Card, CardSection, Button, Confirm, Input } from './common';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Moment from 'moment';
import { categoryUpdate, descriptionUpdate, amountUpdate, 
    incomeAdd, 
    incomeGrossUpdate, 
    incomeTaxUpdate, 
    incomeUifUpdate, 
    incomeOtherTaxUpdate, 
    incomeAfterTaxUpdate,
    categoryUpdateIncome 
} from '../actions';
import { connect } from 'react-redux';


class IncomeAdd extends Component {
    
    state = { isDatePickerVisible: false, date: Moment(new Date()).format('YYYY-MM-DD') };

    componentWillMount() {
        console.log('DEBUG123', this.props);
        this.props.categoryUpdateIncome(this.props.category);

        // link save button in navigation to function
        this.props.navigation.setParams({
            'onRight': this.save
        });
    }

    save = () => {
        console.log('Add save');
        
        const categorySelectedIncome = this.props.categorySelectedIncome;    
        const categories = this.props.categories;
        const description = this.props.description;
        const grossAmount = this.props.grossAmount;
        const taxAmount = this.props.taxAmount;
        const uifAmount = this.props.uifAmount;
        const otherTaxAmount = this.props.otherTaxAmount;
        const afterTaxAmount = this.props.afterTaxAmount;
        const date = this.state.date;
    
        // get categoryId from selected category
        let categoryId = null;
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].category === categorySelectedIncome) {
                categoryId = categories[i].categoryId;
                break;          
            }
        }
        

        this.props.incomeAdd({ 
            date, 
            category: categorySelectedIncome, 
            categoryId, 
            description, 
            grossAmount,
            taxAmount,
            uifAmount,
            otherTaxAmount,
            afterTaxAmount });
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
        this.setState({ date });
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
                            selectedValue={this.props.categorySelectedIncome}
                            onValueChange={value => { 
                                console.log('S ',value);
                                this.props.categoryUpdateIncome(value); 
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
                            placeholder={'Gross Amount (R)'}
                            autoCorrect={false}
                            style={styles.inputStyle}
                            value={this.props.grossAmount}
                            onChangeText={(value) => { this.props.incomeGrossUpdate(value); }}
                            //underlineColorAndroid="transparent"
                            underlineColorAndroid={'transparent'}
                            //keyboardType="visible-password"
                        />
                    </View>

                </CardSection>
                <CardSection style={styles.containerStyle}>
                    <View style={styles.containerStyle2}>
                        <TextInput
                            placeholder={'Tax Amount (R)'}
                            autoCorrect={false}
                            style={styles.inputStyle}
                            value={this.props.taxAmount}
                            onChangeText={(value) => { this.props.incomeTaxUpdate(value); }}
                            //underlineColorAndroid="transparent"
                            underlineColorAndroid={'transparent'}
                            //keyboardType="visible-password"
                        />
                    </View>
                </CardSection>
                <CardSection style={styles.containerStyle}>
                    <View style={styles.containerStyle2}>
                        <TextInput
                            placeholder={'UIF Amount (R)'}
                            autoCorrect={false}
                            style={styles.inputStyle}
                            value={this.props.uifAmount}
                            onChangeText={(value) => { this.props.incomeUifUpdate(value); }}
                            //underlineColorAndroid="transparent"
                            underlineColorAndroid={'transparent'}
                            //keyboardType="visible-password"
                        />
                    </View>
                </CardSection>
                <CardSection style={styles.containerStyle}>
                    <View style={styles.containerStyle2}>
                        <TextInput
                            placeholder={'Other Tax Amount (R)'}
                            autoCorrect={false}
                            style={styles.inputStyle}
                            value={this.props.otherTaxAmount}
                            onChangeText={(value) => { this.props.incomeOtherTaxUpdate(value); }}
                            //underlineColorAndroid="transparent"
                            underlineColorAndroid={'transparent'}
                            //keyboardType="visible-password"
                        />
                    </View>
                </CardSection>
                <CardSection style={styles.containerStyle}>
                    <View style={styles.containerStyle2}>
                        <TextInput
                            placeholder={'After Tax Amount (R)'}
                            autoCorrect={false}
                            style={styles.inputStyle}
                            value={this.props.afterTaxAmount}
                            onChangeText={(value) => { this.props.incomeAfterTaxUpdate(value); }}
                            //underlineColorAndroid="transparent"
                            underlineColorAndroid={'transparent'}
                            //keyboardType="visible-password"
                        />
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

                
            </Card>
        );
    }
}




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
        categorySelectedIncome: state.incomeAdd.categorySelectedIncome,
        description: state.expenseAdd.description,
        //amount: state.expenseAdd.amount,
        grossAmount: state.incomeAdd.grossAmount,
        taxAmount: state.incomeAdd.taxAmount,
        uifAmount: state.incomeAdd.uifAmount,
        otherTaxAmount: state.incomeAdd.otherTaxAmount,
        afterTaxAmount: state.incomeAdd.afterTaxAmount
    };
};

export default connect(mapStateToProps, { 
    categoryUpdate,
    descriptionUpdate,
    amountUpdate,
    incomeAdd,
    incomeGrossUpdate,
    incomeTaxUpdate, 
    incomeUifUpdate, 
    incomeOtherTaxUpdate, 
    incomeAfterTaxUpdate,
    categoryUpdateIncome  
})(IncomeAdd);
