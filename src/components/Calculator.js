import React, { Component } from 'react';
import { View, Text, Picker, TextInput, Button as ButtonRn, Modal, StatusBar, SafeAreaView, TouchableOpacity  } from 'react-native';
import { Card, CardSection, Button, Confirm, Input } from './common';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Moment from 'moment';
import { categoryUpdate, descriptionUpdate, amountUpdate, expenseAdd } from '../actions';
import { connect } from 'react-redux';
import ButtonCalculator from './ButtonCalculator';


const Row = ({ children }) => (
    <View style={{ flexDirection: "row" }}>{children}</View>
);

const initialState = {
    currentValue: "0",
    operator: null,
    previousValue: null,
    currentValueResult: 0
  };
  
export const handleNumber = (value, state) => {
    if (state.currentValue === "0") {
      return { currentValue: `${value}` };
    }
    console.log('value');
    console.log(value);
    console.log({
        currentValue: `${state.currentValue}${value}`
      });
    return {
      currentValue: `${state.currentValue}${value}`
    };
  };
  
const handleEqual = state => {
    const { currentValue, previousValue, operator } = state;

    return {
        currentValue: `${parseFloat(eval(currentValue)).toFixed(2)}`
    };

};
  
  const calculator = (type, value, state) => {
    switch (type) {
      case "number":
        return handleNumber(value, state);
      case "operator":
        return handleNumber(value, state);
      case "equal":
        return handleEqual(state);
      case "clear":
        return initialState;
      case "posneg":
        return {
          currentValue: `${parseFloat(state.currentValue) * -1}`
        };
      case "percentage":
        return {
          currentValue: `${parseFloat(state.currentValue) * 0.01}`
        };
      default:
        return state;
    }
  };





class Calculator extends Component {
    
    state = initialState;

    componentWillMount() {
        console.log('CALCULATOR', this.props);
        
    }

    

    handleTap = (type, value) => {
        console.log('click');
        

        this.setState((state) => {
            console.log(state);
            let newState = calculator(type, value, state);
            console.log('new state');
            console.log(newState);
            return newState;
        });
    };

   

    render() {

        return (
            <View style={{
                flex: 1,
                backgroundColor: "#202020",
                justifyContent: "flex-end"
              }}
            //   width={300} height={400}
              >
                <StatusBar barStyle="light-content" />
                <SafeAreaView>
                    <Text style={{
                            color: "#fff",
                            fontSize: 40,
                            textAlign: "right",
                            marginRight: 20,
                            marginBottom: 10
                        }}>
                        {this.state.currentValue}
                    </Text>
                    <Row>
                        <ButtonCalculator
                        text="C"
                        theme="secondary"
                        onPress={() => this.handleTap("clear")}
                        />
                        <ButtonCalculator
                        text="+/-"
                        theme="secondary"
                        onPress={() => this.handleTap("posneg")}
                        />
                        <ButtonCalculator
                        text="%"
                        theme="secondary"
                        onPress={() => this.handleTap("percentage")}
                        />
                        <ButtonCalculator
                        text="/"
                        theme="accent"
                        onPress={() => this.handleTap("operator", "/")}
                        />
                    </Row>
    
                    <Row>
                        <ButtonCalculator text="7" onPress={() => this.handleTap("number", 7)} />
                        <ButtonCalculator text="8" onPress={() => this.handleTap("number", 8)} />
                        <ButtonCalculator text="9" onPress={() => this.handleTap("number", 9)} />
                        <ButtonCalculator
                        text="x"
                        theme="accent"
                        onPress={() => this.handleTap("operator", "*")}
                        />
                    </Row>
    
                    <Row>
                        <ButtonCalculator text="4" onPress={() => this.handleTap("number", 4)} />
                        <ButtonCalculator text="5" onPress={() => this.handleTap("number", 5)} />
                        <ButtonCalculator text="6" onPress={() => this.handleTap("number", 6)} />
                        <ButtonCalculator
                        text="-"
                        theme="accent"
                        onPress={() => this.handleTap("operator", "-")}
                        />
                    </Row>
    
                    <Row>
                        <ButtonCalculator text="1" onPress={() => this.handleTap("number", 1)} />
                        <ButtonCalculator text="2" onPress={() => this.handleTap("number", 2)} />
                        <ButtonCalculator text="3" onPress={() => this.handleTap("number", 3)} />
                        <ButtonCalculator
                        text="+"
                        theme="accent"
                        onPress={() => this.handleTap("operator", "+")}
                        />
                    </Row>
    
                    <Row>
                        <ButtonCalculator
                        text="0"
                        size="double"
                        onPress={() => this.handleTap("number", 0)}
                        />
                        <ButtonCalculator text="." onPress={() => this.handleTap("number", ".")} />
                        <ButtonCalculator
                        text="="
                        theme="accent"
                        onPress={() => this.handleTap("equal")}
                        />
                    </Row>
                    
                </SafeAreaView>
                <View style={{
                        //borderBottomWidth: 1, 
                        padding: 5,   
                        //shadowColor: '#FFF',
                        //justifyContent: 'flex-start',
                        flexDirection: 'row',
                        //borderColor: '#ddd',
                        //position: 'relative',
                        backgroundColor: '#202020'
                    }}>
                        {/* <Button onPress={()=>{}}>cancel</Button>
                        <Button onPress={()=>{}}>save</Button> */}
                        <TouchableOpacity onPress={this.props.onCancel} 
                        style={{
                            flex: 1,
                            alignSelf: 'stretch',
                            backgroundColor: '#073b4c',
                            borderRadius: 5,
                            borderWidth: 0,
                            borderColor: '#fff',
                            marginLeft: 5,
                            marginRight: 5
                        }}>
                            <Text style={{
                                alignSelf: 'center',
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: '600',
                                paddingTop: 10,
                                paddingBottom: 10
                            }}>cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => { this.props.onSave(this.state.currentValue); }} 
                        style={{
                            flex: 1,
                            alignSelf: 'stretch',
                            backgroundColor: '#073b4c',
                            borderRadius: 5,
                            borderWidth: 0,
                            borderColor: '#fff',
                            marginLeft: 5,
                            marginRight: 5
                        }}>
                            <Text style={{
                                alignSelf: 'center',
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: '600',
                                paddingTop: 10,
                                paddingBottom: 10
                            }}>save</Text>
                        </TouchableOpacity>
                    </View>
          </View>
        );

        
    }
   

    

    
}










const mapStateToProps = state => {
  
    return {
        
    };
};

export default Calculator;
