/* global gapi */
import KEYS from '../apiGoogleconfig.json'

// Client ID and API key from the Developer Console
var CLIENT_ID = KEYS.clientId;
var API_KEY = KEYS.apiKey;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

/*
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}
  
/*
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(() => {
        handleLogin();
    }, (error) => {
        this.appendPre(JSON.stringify(error, null, 2));
    });
}

function isLoggedIn() {
    return (gapi.auth2.getAuthInstance().isSignedIn.get());
}

/*
 *  Sign in the user upon button click.
 */
function handleLogin() {
    gapi.auth2.getAuthInstance().signIn();
}
  
/*
 *  Sign out the user upon button click.
 */
function handleLogout() {
    console.log('logging out');
    gapi.auth2.getAuthInstance().signOut();
}
  
const loggedReducer = (state = false, action) => {
    switch(action.type) {
        case 'FIRST_LOGIN':
            handleClientLoad();
            return true;
        case 'LOGIN':
            if(!isLoggedIn()) {
                handleLogin();
            }
            else {
                console.log('user already logged in')
            }

            return true;
        case 'LOGOUT':
            if(isLoggedIn()) {
                handleLogout();
            }
            else {
                console.log('user already logged out')
            }

            return false;
        default:
            return state;
    }
};

export default loggedReducer;