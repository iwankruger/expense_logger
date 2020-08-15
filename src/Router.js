import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Screen1 from './components/Screen1';

const RouterComponent = () => {
    return (
        <Router>    
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Please Login" initial />
                </Scene>
                <Scene key="main">
                    <Scene key="screen1" component={Screen1} title="Screen1" />
                </Scene>    
            </Scene>
        </Router>
    );
};

export default RouterComponent;
