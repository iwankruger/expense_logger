import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    CATEGORY_UPDATE,
    EXPENSE_ADD_DESCRIPTION_UPDATE,
    EXPENSE_ADD_AMOUNT_UPDATE,
    EXPENSE_ADD_SAVE,
    EXPENSES_SYNCHRONISED
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

export const synchronise = () => {
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
            
            // if no transactions exist, exit
            if (!transactionUpload) return;

            console.log('transactions to upload ', transactionUpload);    
            // decode transactions into an object
            transactionUpload = JSON.parse(transactionUpload);
            

            console.log('transactions to upload ', transactionUpload);

            while (transactionUpload.length > 0) {
                await addTransactions(loginToken, transactionUpload[0]);
                transactionUpload.shift();
            }

             // save cleared transactions in memory
             transactionUpload = JSON.stringify(transactionUpload);
             console.log('transactions to upload save ', transactionUpload);
             await AsyncStorage.setItem('transactionUpload', transactionUpload);

            //todo await AsyncStorage.setItem('transactionUpload', transactionUpload);     

            // go to main screen
            // Actions.main();
            

            dispatch({ type: EXPENSES_SYNCHRONISED, payload: true });

            // synchroniseStatus();
            
        } catch (e) {
            console.log(e);
        }
    };
};

const addTransactions = (loginToken, transaction) => {
    console.log('loginToken ', loginToken);
    console.log('transaction ', transaction);
    //throw new Error('DDDDDDD BBBBB UUUUU GGGG');
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
