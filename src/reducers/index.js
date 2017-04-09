import {combineReducers} from 'redux';

import {shots} from './shots';
import {ships} from './ships';

const rootReducer = combineReducers({
    ships,
    shots
});

export default rootReducer;
