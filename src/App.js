/* global gapi */
import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import KEYS from './apiGoogleconfig.json'
import './App.css';

  // Client ID and API key from the Developer Console
  var CLIENT_ID = KEYS.clientId;
  var API_KEY = KEYS.apiKey;

  // Array of API discovery doc URLs for APIs used by the quickstart
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  var authorizeButton = document.getElementById('authorize_button');
  var signoutButton = document.getElementById('signout_button');

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      calendars: []
    };

    this.handleClientLoad = this.handleClientLoad.bind(this);
    this.initClient =  this.initClient.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.handleSignoutClick = this.handleSignoutClick.bind(this);
    this.appendPre = this.appendPre.bind(this);
    this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
    this.listCalenders = this.listCalenders.bind(this);
  }

  componentDidMount() {
    this.handleClientLoad();
  }
  
    /**
   *  On load, called to load the auth2 library and API client library.
   */
  handleClientLoad() {
    gapi.load('client:auth2', this.initClient);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(() => {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

      // Handle the initial sign-in state.
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = this.handleAuthClick;
      signoutButton.onclick = this.handleSignoutClick;
    }, (error) => {
      this.appendPre(JSON.stringify(error, null, 2));
    });
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorizeButton.style.display = 'none';
      signoutButton.style.display = 'block';
      this.listUpcomingEvents();
      this.listCalenders();
    } else {
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node. Used to display the results of the API call.
   *
   * @param {string} message Text to be placed in pre element.
   */
  appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }

  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  listUpcomingEvents() {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then((response) => {
      var events = response.result.items;
      this.appendPre('Upcoming events:');

      if (events.length > 0) {
        for (let i = 0; i < events.length; i++) {
          var event = events[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          this.appendPre(event.summary + ' (' + when + ')')
        }
      } else {
        this.appendPre('No upcoming events found.');
      }
    });
  }

    /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  listCalenders() {
    gapi.client.calendar.calendarList.list({
      'showDeleted': false,
      'maxResults': 10,
    }).then((resp) => {
      // console.log(resp.result.items);
      this.setState({calendars: resp.result.items});
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.calendars.map((c, i) => (
          <ul key={i}>{c.summary}</ul>
        ))}
      </div>
    );
  }
}

export default App;