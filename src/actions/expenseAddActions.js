import { AsyncStorage } from 'react-native';
import {
    CATEGORY_UPDATE
} from './types';

export const categoryUpdate = (category) => {
    console.log('ACTION ', category)
    return {
        type: CATEGORY_UPDATE,
        payload: category
    };
};

