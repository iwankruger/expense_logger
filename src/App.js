import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import LoginForm from './components/LoginForm';
import ReduxThunk from 'redux-thunk';


class App extends Component {


    componentWillMount() {
        // Initialise stuff here
    }

    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <LoginForm />
            </Provider>
        );
    }
}

export default App;
