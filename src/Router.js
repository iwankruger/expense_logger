import React from 'react';
import { Scene, Router, Drawer } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Screen1 from './components/Screen1';
import ExpensesMonth from './components/ExpensesMonth';
import IncomeOverview from './components/IncomeOverview';
import ExpensesAdd from './components/ExpensesAdd';
import IncomeAdd from './components/IncomeAdd';
import DrawerMenu from './components/DrawerMenu';
import ExpenseItemOverviewDetail from './components/ExpenseItemOverviewDetail';
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
                        //leftButtonIconStyle={{ color: 'red' }}
                        //navigationBarStyle={{ backgroundColor: 'red'}}
                        //tintColor={'#073b4c'}
                    >
                        <Scene key="expenses" component={ExpensesMonth} title={title} initial 
                            onRight={() => { synchroniseWithServer(); }}
                            rightTitle="Sync" 
                            drawer={true}
                        />
                        <Scene key="income" component={IncomeOverview} title={title} 
                            onRight={() => { synchroniseWithServer(); }}
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
                        rightButtonTextStyle={{ color: '#118ab2' }}
                    />
                    <Scene 
                        key="expensesOverviewDetail" 
                        component={ExpenseItemOverviewDetail} 
                        //title="Expense"
                        // onRight={() => { }}
                        // rightTitle="Save" 
                    />
                    <Scene 
                        key="incomeAdd" 
                        component={IncomeAdd} 
                        title="Add Income"
                        onRight={() => { }}
                        rightTitle="Save" 
                        rightButtonTextStyle={{ color: '#118ab2' }}
                    />

                    <Scene key="screen1" component={Screen1} title="Screen1" />
                
                </Scene> 
                 
            </Scene>
        </Router>
    );
};

export default RouterComponent;
