import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from './common';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged } from '../actions';


class LoginForm extends Component {

    onEmailChange(text) {
        // call action emailChanged that will set EMAIL_CHANGED action
        // the action will then be dispatched to the reducers
        // the AuthReducer will be invoked with the EMAIL_CHANGED action
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        lable="Email"
                        placeholder="email@domain.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        secureTextEntry
                        lable="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>
                <CardSection>
                    <Button>
                        Login
                    </Button>
                </CardSection>
            </Card>
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
        email: state.auth.email,
        password: state.auth.password 
    };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged })(LoginForm);
