const INITIAL_STATE = {};

/*
 * Fetches all visible calenders of signed in user.
 * Pre: User must be logged in
 * Pos: calendars state updated with list of calendars, listEvents() called
 */
function listCalenders() {
    gapi.client.calendar.calendarList.list({
      'showDeleted': false,
      'maxResults': 10,
    }).then((resp) => {
      console.log(resp.result.items);
    });
}

const calenderReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'FETCH_CALS':
            listCalenders();
            return true;
        default:
            return state;
    }
};

export default loggedReducer;