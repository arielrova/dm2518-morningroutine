morningRoutine.factory('backend', function() {
  var userID;
  var firebase = new Firebase("https://glaring-torch-8524.firebaseio.com/");

  var today = new Date();
  var lengthOfDay = 1000 * 60 * 60 * 24; // Milliseconds in a day

  var todayToString = today.toLocaleDateString();
  var todayString = todayToString.split("-");
  todayString = todayString[0] + todayString[1] + todayString[2];

  var yesterday = new Date(new Date().getTime() - lengthOfDay);
  var yesterdayToString = yesterday.toLocaleDateString();
  var yesterdayString = yesterdayToString.split("-");
  yesterdayString = yesterdayString[0] + yesterdayString[1] + yesterdayString[2];

  var tomorrow = new Date(new Date().getTime() + lengthOfDay);
  var tomorrowToString = tomorrow.toLocaleDateString();
  var tomorrowString = tomorrowToString.split("-");
  tomorrowString = tomorrowString[0] + tomorrowString[1] + tomorrowString[2];
  console.log(tomorrowString);

  var exampleDays = {
    yesterday: {
      weatherMorning: { temp: 12, precip: 2 },
      weatherNoon: { temp: 13, precip: 0 },
      weatherEvening: { temp: 7, precip: 0 }
    },
    today: {
      weatherMorning: { temp: 10, precip: 0 },
      weatherNoon: { temp: 15, precip: 10 },
      weatherEvening: { temp: 8, precip: 5 }
    },
    tomorrow: {
      weatherMorning: { temp: 15, precip: 3 },
      weatherNoon: { temp: 20, precip: 7 },
      weatherEvening: { temp: 15, precip: 0 }
    }
  };

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
  }

  var write = function(lunchbox, umbrella) {
    exampleUserData.lunchBox = lunchbox;
    exampleUserData.umbrella = umbrella;
  };

  var read = function(date) {
    if (date == yesterdayString) {
      return userData[1];
    } else if (date == todayString) {
      return userData[2];
    } else if (date == tomorrowString) {
      return userData[3];
    }
  };

  var getUserID = function() {
    return userID;
  };

  var setUserID = function(id) {
    userID = id;
  };

  var getDate = function() {
    return todayString;
  };

  var getTomorrow = function() {
    return tomorrowString;
  };

  var getYesterday = function() {
    return yesterdayString;
  };

  var getDayData = function(date) {
    if (date == yesterdayString) {
      return exampleDays[1];
    } else if (date == todayString) {
      return exampleDays[2];
    } else if (date == tomorrowString) {
      return exampleDays[3];
    }
  };

  var retrieveData = function() {
    firebase.child("users/" + userID + "/leaveTime").on("value", function(snapshot) {
      var leave = snapshot.val();
      for (var i in userData) {
        userData[i].leaveTime.hour = leave.hour;
        userData[i].leaveTime.minutes = leave.minutes;
      }
    });

    firebase.child("users/" + userID + "/days").on("value", function(snapshot) {
      var days = snapshot.val();
      var k = 1;
      for (var j in days) {
        if (j == yesterdayString || j == todayString || j == tomorrowString) {
          userData[k].umbrella = days[j].umbrella;
          userData[k].lunchBox = days[j].lunchbox;
          k = k + 1;
        } else {
          userData[k].umbrella = false;
          userData[k].lunchBox = false;
        }
      }
    });
  };

  return {
    getUserID: getUserID,
    write: write,
    read: read,
    getDate: getDate,
    getTomorrow: getTomorrow,
    getYesterday: getYesterday,
    getDayData: getDayData,
    setUserID: setUserID,
    retrieveData: retrieveData
  };
});
