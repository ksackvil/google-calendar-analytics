const INITIAL_STATE = [];

const calendarsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_CALS':
            return action.payload;
        default:
            return state;
    }
};

export default calendarsReducer;