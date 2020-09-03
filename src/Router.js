import React from 'react';
import { Scene, Router, Drawer } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Screen1 from './components/Screen1';
import ExpensesMonth from './components/ExpensesMonth';
import IncomeOverview from './components/IncomeOverview';
import ExpensesAdd from './components/ExpensesAdd';
import DrawerMenu from './components/DrawerMenu';
import { synchroniseWithServer } from './actions';

import Moment from 'moment';

const RouterComponent = () => {
    const title = `${Moment().format('MMMM Y')} Expenses`;
    return (
        <Router>    
            <Scene key="root" hideNavBar>

                <Scene key="auth" initial>
                    <Scene key="login" component={LoginForm} title="Please Login" />
                </Scene>

                
                <Scene key="main" >
                    <Drawer key="drawer" drawer 
                        contentComponent={DrawerMenu} 
                        drawerWidth1={220}
                        tapToClose={true}
                        hideNavBar
                    >
                        <Scene key="expenses" component={ExpensesMonth} title={title} initial 
                            onRight={() => { console.log('sync'); synchroniseWithServer(); }}
                            rightTitle="Sync" 
                            drawer={true}
                        />
                        <Scene key="income" component={IncomeOverview} title={title} 
                            onRight={() => { console.log('sync'); synchroniseWithServer(); }}
                            rightTitle="Sync" 
                            drawer={true}
                        />
                    </Drawer> 

                    <Scene 
                        key="expensesAdd" 
                        component={ExpensesAdd} 
                        title="Add Expense"
                        onRight={() => { }}
                        rightTitle="Save" 
                    />

                    <Scene key="screen1" component={Screen1} title="Screen1" />
                
                </Scene> 
                 
            </Scene>
        </Router>
    );
};

export default RouterComponent;
