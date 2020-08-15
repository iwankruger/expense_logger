import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Screen1 from './components/Screen1';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene key="login" component={LoginForm} title="Please Login" initial />
                <Scene key="screen1" component={Screen1} title="Screen1" />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
