const INITIAL_STATE = [];

const eventsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'APPEND_EVENTS':
            console.log(action.payload);
            let newState = state.concat(action.payload)
            return newState;
        default:
            return state;
    }
};

export default eventsReducer;