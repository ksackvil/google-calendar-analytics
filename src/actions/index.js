export const set_cals = (data) => {
    return {
        type: 'SET_CALS',
        payload: data
    }
};

export const append_events = (data) => {
    return {
        type: 'APPEND_EVENTS',
        payload: data
    }
};

export const get_prev_week = () => {
    return {
        type: 'GET_PREV_WEEK'
    }
};

export const get_next_week = () => {
    return {
        type: 'GET_NEXT_WEEK'
    }
};