morningRoutine.factory('backend', function() {
  var userID;
  var firebase = new Firebase("https://glaring-torch-8524.firebaseio.com/");

  /* This is very messy string handling, please look away! We know. There should've been loops and shit for this!

  But the point is... In the end of these 60 lines we get todays, tomorrows and the day after tomorrow
  as strings on the form of "20160101" which is used throughout as key for the data.
  Additionally the SMHI-api needs another format of the date string, so thats taken care of too! */
  var today = new Date();
  var lengthOfDay = 1000 * 60 * 60 * 24;
  var todayToString = today.toLocaleString();
  var APItoday = today.toISOString();
  var lol = APItoday.split("");
  lol[14] = "0";
  lol[15] = "0";
  lol[17] = "0";
  lol[18] = "0";
  lol[19] = "";
  lol[20] = "";
  lol[21] = "";
  lol[22] = "";
  var hehe = lol.toString().replace(/,/g, "");

  var todayDay = today.getUTCDate();
  var todayYear = today.getUTCFullYear();
  var todayMonth = today.getUTCMonth();
  todayMonth = "0" + String(todayMonth + 1);
  var todayString = todayYear + todayMonth + todayDay;

  var tomorrow = new Date(new Date().getTime() + lengthOfDay);
  var APItomorrow = tomorrow.toISOString();
  var fixdate = APItomorrow.split("");
  fixdate[14] = "0";
  fixdate[15] = "0";
  fixdate[17] = "0";
  fixdate[18] = "0";
  fixdate[19] = "";
  fixdate[20] = "";
  fixdate[21] = "";
  fixdate[22] = "";
  var fixedDate = fixdate.toString().replace(/,/g, "");

  var nextday = new Date(new Date().getTime() + 2 * lengthOfDay);
  var APInextday = nextday.toISOString();
  var nextfixdate = APInextday.split("");
  nextfixdate[14] = "0";
  nextfixdate[15] = "0";
  nextfixdate[17] = "0";
  nextfixdate[18] = "0";
  nextfixdate[19] = "";
  nextfixdate[20] = "";
  nextfixdate[21] = "";
  nextfixdate[22] = "";
  var nextdayDate = nextfixdate.toString().replace(/,/g, "");

  var tomorrowToString = tomorrow.toLocaleString();
  var tomorrowDay = tomorrow.getUTCDate();
  var tomorrowYear = tomorrow.getUTCFullYear();
  var tomorrowMonth = tomorrow.getUTCMonth();
  tomorrowMonth = "0" + String(tomorrowMonth + 1);
  var tomorrowString = tomorrowYear + tomorrowMonth + tomorrowDay;

  var nextToString = nextday.toLocaleString();
  var nextDay = nextday.getUTCDate();
  var nextYear = nextday.getUTCFullYear();
  var nextMonth = nextday.getUTCMonth();
  nextMonth = String(todayMonth);
  var nextDayString = nextYear + nextMonth + nextDay;

  /* This is the userData-object which acts as fallback if there was no data loaded from Firebase.
  If there is data from Firebase, of course this gets overwritten */

  var userData = {
    1: {
      lunchBox: false,
      umbrella: false,
      leaveTime: {
        hour: 8,
        minutes: 0
      }
    },
    2: {
      lunchBox: false,
      umbrella: false,
      leaveTime: {
        hour: 8,
        minutes: 0
      }
    },
    3: {
      lunchBox: false,
      umbrella: false,
      leaveTime: {
        hour: 8,
        minutes: 0
      }
    }
  };

  /* writeTime is the function thats called when the user sets a new time they need to be leaving home.
  It takes the userID and the days date as keys to put the data in the right place over at Firebase */
  var writeTime = function(date, user, minutes, hour) {
    firebase.child("users/" + user + "/days/" + date).set({
      leaveTime: {
        hour: hour,
        minutes: minutes
      }
    });
  };

  /* Same thing for the stuff you need to remember. So that if you close the app but did remember your lunchbox,
  that will still show */
  var writeRemember = function(umbrella, lunchbox) {
    firebase.child("users/" + user + "/days/" + date).set({
      lunchbox: lunchbox,
      umbrella: umbrella
    });
  };

  /* This is how the "frontend" gets user data. The objects in userData are mapped to a relative date, so whatever
  todays date is, today will always be mapped to userData[1]. Tomorrow is always userData[2], etc. */
  var read = function(date) {
    retrieveData();
    if (date == todayString) {
      return userData[1];
    } else if (date == tomorrowString) {
      return userData[2];
    } else if (date == nextDayString) {
      return userData[3];
    }
  };

  /* Returns user id */
  var getUserID = function() {
    return userID;
  };

  /* Sets user id upon login */
  var setUserID = function(id) {
    userID = id;
  };

  /* Returns the date string formatted for SMHI */
  var getAPIdate = function() {
    return hehe;
  };

  /* Returns todays date string */
  var getDate = function() {
    return todayString;
  };

  /* Tomorrows */
  var getTomorrow = function() {
    return tomorrowString;
  };

  /* And the day after tomorrow. */
  var getDayAfterTomorrow = function() {
    return nextDayString;
  };

  /* Blablabla, you get it... */
  var getAPITomorrow = function() {
    return fixedDate;
  };

  var getAPINextday = function() {
    return nextdayDate;
  };

  /* This is backends read interface with Firebase. It uses the userID to identify the right subtree, 
  then it loops all the days contained within. If the key matches any of the dates we are keeping track of,
  the data is put into the userData object. A second iterator, k, keeps track so that the data is put into 
  the right relative spot. */
  var retrieveData = function() {
    firebase.child("users/" + userID + "/days").on("value", function(snapshot) {
      var days = snapshot.val();
      var k = 1;
      for (var j in days) {
        if (j == todayString || j == tomorrowString || j == nextDayString) {
          userData[k].umbrella = days[j].umbrella;
          userData[k].lunchBox = days[j].lunchbox;
          userData[k].leaveTime.hour = days[j].leaveTime.hour;
          userData[k].leaveTime.minutes = days[j].leaveTime.minutes;
          k = k + 1;
        }
      }
    });
  };

  return {
    getUserID: getUserID,
    writeTime: writeTime,
    writeRemember: writeRemember,
    read: read,
    getAPIdate: getAPIdate,
    getDate: getDate,
    getTomorrow: getTomorrow,
    getDayAfterTomorrow: getDayAfterTomorrow,
    setUserID: setUserID,
    retrieveData: retrieveData,
    getAPITomorrow: getAPITomorrow,
    getAPINextday: getAPINextday
  };
});
