import eventsReducer from './events';
import calendarsReducer from './calendars';
import weekCountReducer from './weekCount';

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    events: eventsReducer,
    weekCount: weekCountReducer,
    calendars: calendarsReducer
});

export default rootReducer;