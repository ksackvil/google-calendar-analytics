/* global gapi */
import React, {useEffect, useState, useRef} from 'react';
import KEYS from './apiGoogleconfig.json'
import './App.css';
import DoughnutChart from './components/DoughnutChart';
import {useSelector, useDispatch} from 'react-redux';
import { set_cals, append_events, get_prev_week, get_next_week } from './actions';
import Charts from './components/Charts';
import calenderReducer from './reducers/events';

// class App extends React.Component {

//   constructor() {
//     super();
//     this.state = {
//       calendars: [],      // list of all visible calenders by id
//       thisWeekEvents: [], // list of all events
//       week: 0
//     };

//     this.handleClientLoad = this.handleClientLoad.bind(this);
//     this.initClient =  this.initClient.bind(this);
//     this.updateSigninStatus = this.updateSigninStatus.bind(this);
//     this.handleAuthClick = this.handleAuthClick.bind(this);
//     this.handleSignoutClick = this.handleSignoutClick.bind(this);
//     this.appendPre = this.appendPre.bind(this);
//     this.listUpcomingEvents = this.listEvents.bind(this);
//     this.listCalenders = this.listCalenders.bind(this);
//     this.getLastSunday = this.getLastSunday.bind(this);
//     this.getNextSunday =this.getNextSunday.bind(this);
//   }

//   componentDidMount() {
//     this.handleClientLoad();
//     // const count = useSelector(state => state.counter);
//   }
  
//     /**
//    *  On load, called to load the auth2 library and API client library.
//    */
//   handleClientLoad() {
//     gapi.load('client:auth2', this.initClient);
//   }

//   /**
//    *  Initializes the API client library and sets up sign-in state
//    *  listeners.
//    */
//   initClient() {
//     gapi.client.init({
//       apiKey: API_KEY,
//       clientId: CLIENT_ID,
//       discoveryDocs: DISCOVERY_DOCS,
//       scope: SCOPES
//     }).then(() => {
//       // Listen for sign-in state changes.
//       gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

//       // Handle the initial sign-in state.
//       this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//       authorizeButton.onclick = this.handleAuthClick;
//       signoutButton.onclick = this.handleSignoutClick;
//     }, (error) => {
//       this.appendPre(JSON.stringify(error, null, 2));
//     });
//   }

//   /**
//    *  Called when the signed in status changes, to update the UI
//    *  appropriately. After a sign-in, the API is called.
//    */
//   updateSigninStatus(isSignedIn) {
//     if (isSignedIn) {
//       authorizeButton.style.display = 'none';
//       signoutButton.style.display = 'block';
//       this.listCalenders();
//     } else {
//       authorizeButton.style.display = 'block';
//       signoutButton.style.display = 'none';
//     }
//   }

//   /**
//    *  Sign in the user upon button click.
//    */
//   handleAuthClick(event) {
//     gapi.auth2.getAuthInstance().signIn();
//   }

//   /**
//    *  Sign out the user upon button click.
//    */
//   handleSignoutClick(event) {
//     gapi.auth2.getAuthInstance().signOut();
//   }

//   /**
//    * Append a pre element to the body containing the given message
//    * as its text node. Used to display the results of the API call.
//    *
//    * @param {string} message Text to be placed in pre element.
//    */
//   appendPre(message) {
//     var pre = document.getElementById('content');
//     var textContent = document.createTextNode(message + '\n');
//     pre.appendChild(textContent);
//   }

//   getLastSunday(maxItr) {
//     let t = new Date();

//     t.setDate((t.getDate() - (7*maxItr) ) - t.getDay());
//     t.setHours(0,0,0,0)

//     return t;
//   }

//   getNextSunday(maxItr) {
//     let t = new Date();

//     t.setDate((t.getDate() - (7*maxItr) ) + (6-t.getDay()));
//     t.setHours(23,59,59,999)
    
//     return t;
//   }

//   /**
//    * Print the summary and start datetime/date of the next ten events in
//    * the authorized user's calendar. If no events are found an
//    * appropriate message is printed.
//    */
//   listEvents() {
//     let weekEventsTemp = [];

//     this.state.calendars.forEach(cal => {
//       console.log(cal.summary);
//       gapi.client.calendar.events.list({
//         'calendarId': `${cal.id}`,
//         'timeMin': (this.getLastSunday(0)).toISOString(),
//         'timeMax': (this.getNextSunday(0)).toISOString(),
//         'showDeleted': false,
//         'singleEvents': true,
//         'orderBy': 'startTime'
//       }).then((response) => {
//         let events = response.result.items;
        
//         // weekEventsTemp.push({
//         //   id: cal.id,
//         //   name: cal.summary,
//         //   events: events
//         // });
//         let temp = {
//           id: cal.id,
//           name: cal.summary,
//           events: events
//         };
//         this.setState({thisWeekEvents: this.state.thisWeekEvents.concat(temp)})
//         // this.appendPre(`\n${cal.summary} events:`);
//         // if (events.length > 0) {
//         //   for (let i = 0; i < events.length; i++) {
//         //     var event = events[i];
//         //     var when = event.start.dateTime;
//         //     if (!when) {
//         //       when = event.start.date;
//         //     }
//         //     this.appendPre(event.summary + ' (' + when + ')')
//         //   }
//         // } else {
//         //   this.appendPre('No upcoming events found.');
//         // }

//       });
      
//     });
//   }

//   /*
//    * Fetches all visible calenders of signed in user.
//    * Pre: User must be logged in
//    * Pos: calendars state updated with list of calendars, listEvents() called
//    */
//   listCalenders() {
//     gapi.client.calendar.calendarList.list({
//       'showDeleted': false,
//       'maxResults': 10,
//     }).then((resp) => {
//       console.log(resp.result.items);
//       this.setState({
//         calendars: resp.result.items
//       }, this.listEvents);
//     });
//   }

//   render() {
//     console.log(this.state.thisWeekEvents);
//     return (
//       <div className="App">
//         <div>

//         </div>
//         {this.state.thisWeekEvents.map((c, i) => (
//           <div key={i}>
//             {c.name}
//             <div>
//               {
//                 c.events.map((e,i) => (
//                   <div>{e.summary} {e.start.dateTime}</div>
//                 ))
//               }
//             </div>
//           </div>
//         ))}
//         <DoughnutChart />
//       </div>
//     );
//   }
// }

// Client ID and API key from the Developer Console
const CLIENT_ID = KEYS.clientId;
const API_KEY = KEYS.apiKey;

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

function App() {
  const dispatch = useDispatch();
  const weekCount = useSelector(state => state.weekCount);
  const calendars = useSelector(state => state.calendars);
  const events = useSelector(state => state.events);

  useEffect(() => {
    gapi.load('client:auth2', initClient);
  }, []);

  const initClient = () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(() => {
      getCalendars();
    });
  };

  const getCalendars = () => {
    gapi.client.calendar.calendarList.list({
      'showDeleted': false,
      'maxResults': 10,
    }).then((resp) => {
      dispatch(set_cals(resp.result.items))
      getEvents(resp.result.items);
    });
  };

  const getEvents = (cals) => {
    cals.forEach(cal => {
      gapi.client.calendar.events.list({
        'calendarId': `${cal.id}`,
        'timeMin': (getLastSunday(weekCount)).toISOString(),
        'timeMax': (getNextSunday(weekCount)).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'orderBy': 'startTime'
      }).then((response) => {
        dispatch(append_events({
          id: cal.id,
          name: cal.summary,
          events: response.result.items
        }));
      });
    });
  };

  const getLastSunday = (maxItr) => {
    let t = new Date();

    t.setDate((t.getDate() - (7*maxItr) ) - t.getDay());
    t.setHours(0,0,0,0)
    return t;
  };

  const getNextSunday = (maxItr) => {
    let t = new Date();

    t.setDate((t.getDate() - (7*maxItr) ) + (6-t.getDay()));
    t.setHours(23,59,59,999)
    return t;
  };

  const changeWeek = (type) => {
    if(type === 'prev') {
      dispatch(get_prev_week());
    }
    else if (type === 'next') {
      dispatch(get_next_week());
    }
    getEvents(calendars);
  }

  return(
    <div>
        <button onClick={() => changeWeek('prev')}>-</button>
        <button onClick={() => changeWeek('next')}>+</button>
        {
          events.map((event, i) => {
            return(
              event.events.map((eve, index) => {
                return(<div>{eve.summary}</div>)
              })
            )
          })
        }
    </div>
  )
};

export default App;