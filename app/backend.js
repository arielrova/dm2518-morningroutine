morningRoutine.factory('backend', function() {
  var userID;
  var firebase = new Firebase("https://glaring-torch-8524.firebaseio.com/");
  console.log(firebase);

  var today = new Date();
  var lengthOfDay = 1000 * 60 * 60 * 24; // Milliseconds in a day
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

  var userData = {
    1: {
      lunchBox: false,
      umbrella: false,
      leaveTime: {
        hour: 0,
        minutes: 0
      }
    },
    2: {
      lunchBox: false,
      umbrella: false,
      leaveTime: {
        hour: 0,
        minutes: 0
      }
    },
    3: {
      lunchBox: false,
      umbrella: false,
      leaveTime: {
        hour: 0,
        minutes: 0
      }
    }
  };

  var emptyDay = {
    lunchBox: false,
    umbrella: false,
    leaveTime: {
      hour: 0,
      minutes: 0
    }
  };


  var writeTime = function(date, user, minutes, hour) {
    firebase.child("users/" + user + "/days/" + date).set({
      leaveTime: {
        hour: hour,
        minutes: minutes
      }
    });
  };

  var writeRemember = function(umbrella, lunchbox) {
    firebase.child("users/" + user + "/days/" + date).set({
      lunchbox: lunchbox,
      umbrella: umbrella
    });
  };

  var read = function(date) {
    if (date == todayString) {
      return userData[1];
    } else if (date == tomorrowString) {
      return userData[2];
    } else if (date == nextDayString) {
      return userData[3];
    }
  };

  var getUserID = function() {
    return userID;
  };

  var setUserID = function(id) {
    userID = id;
  };

  var getAPIdate = function() {
    return hehe;
  };

  var getDate = function() {
    return todayString;
  };

  var getTomorrow = function() {
    return tomorrowString;
  };

  var getDayAfterTomorrow = function() {
    return nextDayString;
  };

  var getAPITomorrow = function() {
    return fixedDate;
  };

  var getAPINextday = function() {
    return nextdayDate;
  };

  var retrieveData = function() {
    console.log("hello, I'm retrieve!");
    firebase.child("users/" + userID + "/days").on("value", function(snapshot) {
      console.log(snapshot);
      var days = snapshot.val();
      var k = 1;
      for (var j in days) {
        if (j == todayString || j == tomorrowString || j == nextDayString) {
          userData[k].umbrella = days[j].umbrella;
          userData[k].lunchBox = days[j].lunchbox;
          userData[k].leaveTime.hour = days[j].leaveTime.hour;
          userData[k].leaveTime.minutes = days[j].leaveTime.minutes;
          k = k + 1;
        } else {
          userData[k].umbrella = false;
          userData[k].lunchBox = false;
          userData[k].leaveTime = {
            hour: 8,
            minutes: 0
          };
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
