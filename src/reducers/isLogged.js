const loggedReducer = (state = false, action) => {
    switch(action.type) {
        case 'LOGIN':
            return true;
        default:
            return state;
    }
};

export default loggedReducer;