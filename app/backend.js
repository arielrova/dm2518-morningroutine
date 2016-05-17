morningRoutine.factory('backend', function() {

  var today = new Date();
  today = today.toLocaleDateString();
  console.log(today);

  var exampleDay = {
    20160506: {
      weatherMorning: { temp: 12, precip: 2 },
      weatherNoon: { temp: 13, precip: 0 },
      weatherEvening: { temp: 7, precip: 0 }
    },
    20160507: {
      weatherMorning: { temp: 10, precip: 0 },
      weatherNoon: { temp: 15, precip: 10 },
      weatherEvening: { temp: 8, precip: 5 }
    },
    20160508: {
      weatherMorning: { temp: 15, precip: 3 },
      weatherNoon: { temp: 20, precip: 7 },
      weatherEvening: { temp: 15, precip: 0 }
    }
  };

  var exampleUserData = {
    20160506: {
      lunchBox: true,
      umbrella: true,
      leaveTime: { hour: 15, minutes: 15 }
    },
    20160507: {
      lunchBox: false,
      umbrella: false,
      leaveTime: { hour: 9, minutes: 30 }
    },
    20160508: {
      lunchBox: false,
      umbrella: false,
      leaveTime: { hour: 7, minutes: 30 }
    }
  };

  var write = function(lunchbox, umbrella) {
    exampleUserData.lunchBox = lunchbox;
    exampleUserData.umbrella = umbrella;
  };

  var read = function(date, user) {
    return exampleUserData[date];
  };

  var getUserID = function() {
    return 1;
  };

  var getDate = function() {
    return 20160507;
  };

  var getDayData = function(date) {
    return exampleDay[date];
  };

  return {
    getUserID: getUserID,
    write: write,
    read: read,
    getDate: getDate,
    getDayData: getDayData
  };
});
