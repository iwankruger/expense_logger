import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Screen1 from './components/Screen1';
import ExpensesMonth from './components/ExpensesMonth';
import ExpensesAdd from './components/ExpensesAdd';

const RouterComponent = () => {
    return (
        <Router>    
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Please Login" />
                </Scene>
                <Scene key="main" >
                    <Scene 
                        key="expensesAdd" 
                        component={ExpensesAdd} 
                        title="Monthly Expenses"
                        onRight={() => console.log('Save')}
                        rightTitle="Save" 
                    />
                    <Scene key="mainMenu" component={ExpensesMonth} title="Monthly Expenses" initial />
                    
                    <Scene key="screen1" component={Screen1} title="Screen1" />
                    
                </Scene>  
                 
            </Scene>
        </Router>
    );
};

export default RouterComponent;
