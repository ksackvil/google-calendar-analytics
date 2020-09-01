const weekCountReducer = (state = 0, action) => {
    switch(action.type) {
        case 'GET_PREV_WEEK':
            return (state+1);
        case 'GET_NEXT_WEEK':
            return (state-1);
        default:
            return state;
    }
};

export default weekCountReducer;