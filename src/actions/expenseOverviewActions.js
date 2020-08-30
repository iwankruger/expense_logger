import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    CATEGORY_UPDATE,
    EXPENSE_ADD_DESCRIPTION_UPDATE,
    EXPENSE_ADD_AMOUNT_UPDATE,
    EXPENSE_ADD_SAVE,
    EXPENSES_SYNCHRONISED,
    USER_DATA,
    DATE_CHANGED
} from './types';
import Moment from 'moment';
import * as config from '../../config';
import axios from 'axios';


export const synchroniseStatus = () => {

    return async (dispatch) => {
        try {
            console.log('SYNCHRONISE STATUS');
            let transactionUpload = await AsyncStorage.getItem('transactionUpload');
            
            // if no transactions exist, exit
            if (!transactionUpload) return dispatch({ type: EXPENSES_SYNCHRONISED, payload: true });
   
            // decode transactions into an object
            transactionUpload = JSON.parse(transactionUpload);
            
            if (transactionUpload.length === 0) return dispatch({ type: EXPENSES_SYNCHRONISED, payload: true });

            return dispatch({ type: EXPENSES_SYNCHRONISED, payload: false });
         
        } catch (e) {
            console.log(e);
        }
    }
}

export const synchronise = (date) => {
    console.log('ACTION synchronise');



    return async (dispatch) => {
        try {
            
            let loginData = await AsyncStorage.getItem('loginData');
            loginData = JSON.parse(loginData);
            const loginToken = loginData.loginToken;
            const login = loginData.login;
            console.log('LOGIN DATA ', loginData);

            // get stored transactions to upload/sync
            let transactionUpload = await AsyncStorage.getItem('transactionUpload');

            // upload transactions
            if (transactionUpload) {
                transactionUpload = JSON.parse(transactionUpload);

                console.log('transactions to upload ', transactionUpload);

                while (transactionUpload.length > 0) {
                    await addTransactions(loginToken, transactionUpload[0]);
                    transactionUpload.shift();
                }

                // save cleared transactions in memory
                transactionUpload = JSON.stringify(transactionUpload);
                await AsyncStorage.setItem('transactionUpload', transactionUpload);

                dispatch({ type: EXPENSES_SYNCHRONISED, payload: true });
            }

            let userData = await getUserDataFromServer(login, loginToken, date);
            userData = userDataFormat(userData.categories, userData.transactions);

            // store data to local device
            await AsyncStorage.setItem('userDataLocal', JSON.stringify(userData));

            dispatch({ type: USER_DATA, payload: userData });
            
        } catch (e) {
            console.log(e);
            AsyncStorage.setItem('loggedInStatus', JSON.stringify(false));
            dispatch({ type: EXPENSES_SYNCHRONISED, payload: false });
        }
    };
};

const addTransactions = (loginToken, transaction) => {
    return axios.post(`${config.server.API}/transactions`, transaction, {
        headers: {
          Authorization: loginToken
        }
      }).then((result) => {
        console.log('transaction upload ', result);
        
        return result;
    }).catch((error) => {
        throw error;
    });       
};


const getUserDataFromServer = async (login, loginToken, date) => {

    try {
        // set begin and end date of current month
        date = new Date(date);
        console.log('DATEE ', date);
        let dateBegin = new Date(date.getFullYear(), date.getMonth(), 1);
        let dateEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        dateBegin = Moment(dateBegin).format('YYYY-MM-DD');
        dateEnd = Moment(dateEnd).format('YYYY-MM-DD');

        const categories = await getCategories(loginToken);
        console.log('categories ', categories);

        const transactions = await getTransactions(loginToken, login, dateBegin, dateEnd);
        console.log('transactions ', transactions);

        return { categories, transactions };
    } catch (error) {
        return Promise.reject(error);
    }
};

const getCategories = (loginToken) => {
    return axios.get(`${config.server.API}/categories`,{
        headers: {
          Authorization: loginToken
        }
      }).then((categories) => { 
        return categories.data;
    }).catch((error) => {
        console.log('error get cat ', error);
        throw error;
    });       
};

const getTransactions = (loginToken, login, dateBegin, dateEnd) => {
    return axios.get(`${config.server.API}/transactions?userId=${login}&dateBegin=${dateBegin}&dateEnd=${dateEnd}`,{
        headers: {
          Authorization: loginToken
        }
      }).then((transactions) => {
        console.log('GET  transactions result ', transactions);
        
        return transactions.data;
    }).catch((error) => {
        throw error;
    });       
};

const userDataFormat = (categories, transactions) => {

    const data = [];
    console.log('CAT ', categories);
    console.log('CAT ', transactions);

    // calculate total for each category 
    const transactionTotals = {};
    for (let i = 0; i < transactions.length; i++) {
        let total = 0;
        if (transactionTotals[transactions[i].categoryId]) {
            total = transactionTotals[transactions[i].categoryId];
        }
        transactionTotals[transactions[i].categoryId] = total + transactions[i].value;
    }

    const dateMonth = Moment().format('YYYY-MM-DD');

    for (let i = 0; i < categories.length; i++) {
        // add total and remaining
        const total = transactionTotals[categories[i].categoryId] ? transactionTotals[categories[i].categoryId] : 0;
        const remaining = categories[i].budget - total;
        data.push({ ...categories[i], remaining, total, date: dateMonth });
    }

    const userData = {
        data,
        settings: {
            currency: 'R'
        },
        categories
    };

    return userData;

};

export const setMonth = (date) => {
    console.log('ACTION setMonth ', date);
    date = Moment(date, 'MM-YYYY').format('YYYY-MM-DD');
    console.log(date);
    return {
        type: DATE_CHANGED,
        payload: date
    };
};
// #set($bulk = $input.path('$'))
// {
//     "RequestItems": {  
//         "dev-transactions": [
//             #foreach($record in $bulk)
//             {
//                 "PutRequest": {
//                     "Item": {
//                         "userId": {
//                             "S": "$record.userId"
//                         },
//                         "date": {
//                             "S": "$record.date"
//                         },
//                         "category": {
//                             "S": "$record.category"
//                         },
//                         "categoryId": {
//                             "N": "$record.categoryId"
//                         },
//                         "description": {
//                             "S": "$record.description"
//                         },
//                         "value": {
//                             "N": "$record.value"
//                         }
//                     }
//                 }
//             }
//             #if($foreach.hasNext), 
//             #end
//             #end
//             ]
    
//     }
// }


// {
//     "TableName": "dev-transactions",
//         "Item": {
//             "userId": {
//                 "S": "$input.path('$.userId')"
//             },
//             "date": {
//                 "S": "$input.path('$.date')"
//             },
//             "category": {
//                 "S": "$input.path('$.category')"
//             },
//             "categoryId": {
//                 "N": "$input.path('$.categoryId')"
//             },
//             "description": {
//                 "S": "$input.path('$.description')"
//             },
//             "value": {
//                 "N": "$input.path('$.value')"
//             }
//         }


// }

// #set($bulk = $input.path('$'))
// {
//     "RequestItems": {
//         "dev-transactions": [
//             {
//                 "PutRequest": {
//                     "Item": {
//                         "userId": {
//                             "S": "44"
//                         },
//                         "date": {
//                             "S": "1"
//                         },
//                         "category": {
//                             "S": "food"
//                         },
//                         "categoryId": {
//                             "N": "2"
//                         },
//                         "description": {
//                             "S": "2"
//                         },
//                         "value": {
//                             "N": "1"
//                         }
//                     }
//                 }
//             }
//         ]

//     }
// }

// {
//     "RequestItems": {
//         "dev-transactions": [
//             {
//                 "PutRequest": {
//                     "Item":  {
//                         "userId": {"S": "44"},
//                         "date": {"S": "3"},
//                         "category": {"S": "food"},
//                         "categoryId": {"N": "2"},
//                         "description": {"S": "2"},
//                         "value": {"N": "1"}
//                     }
//                 }
//             },
//             {
//                 "PutRequest": {
//                     "Item":  {
//                         "userId": {"S": "44"},
//                         "date": {"S": "4"},
//                         "category": {"S": "food"},
//                         "categoryId": {"N": "2"},
//                         "description": {"S": "2"},
//                         "value": {"N": "1"}
//                     }
//                 }
//             }
//         ]
//     }
// }



// {
//     "RequestItems": {
//         "dev-transactions": [
//             {
//                 "PutRequest": {
//                     "Item":  {
//                         "userId": {"S": "44"},
//                         "date": {"S": "3"},
//                         "category": {"S": "food"},
//                         "categoryId": {"N": "2"},
//                         "description": {"S": "2"},
//                         "value": {"N": "1"}
//                     }
//                 }
//             }
//         ]
//     }
// }
