morningRoutine.controller("dayCtrl", function($scope, $routeParams, backend, $http) {
  $scope.userParam = $routeParams.user;
  backend.setUserID($scope.userParam);
  $scope.user = backend.getUserID();
  $scope.mSetLeaveTime = 00;
  $scope.hSetLeaveTime = 08;
  $scope.mLeavetime = 0;
  $scope.hLeavetime = 8;
  $scope.isToday = true;
  $scope.isFuture = false;
  $scope.SetLeaveTime = { value: new Date(1970, 0, 1, $scope.hSetLeaveTime, $scope.mSetLeaveTime) };
  /*  $('#today-view').hide();
    $('#loading').show();

    $('.standard-text').bind('load', function() {
      $('#loading').hide();
      $('#content').fadeIn('slow');
    });*/

  //AnvändarID, just nu alltid bara "1".
  backend.retrieveData();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.$apply(function() {
        var lat = position.coords.latitude.toFixed(2);
        var lon = position.coords.longitude.toFixed(2);

        $scope.getWeather = function(date) {
          $http.get("http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/" + lat + "/lon/" + lon + "/data.json")
            .then(function(response) {
              var timeseries = response.data.timeseries;
              for (var i in timeseries) {
                if (timeseries[i].validTime == date) {
                  $scope.temp = timeseries[i].t;
                  if (timeseries[i].pit === 0 && timeseries[i].tcc > 2) {
                    $scope.rain = false;
                    $scope.sun = false;
                    $scope.cloud = true;
                    $scope.currentMessage = "Clouds everywhere. Eat them!";
                    $scope.clothes = 'clothes2.png';
                  } else if (timeseries[i].pit === 0 && timeseries[i].tcc < 2) {
                    $scope.rain = false;
                    $scope.sun = true;
                    $scope.cloud = false;
                    $scope.currentMessage = "Don't forget your sunglasses!";
                    $scope.clothes = 'clothes1.png';
                  } else {
                    $scope.currentMessage = "Don't forget your umbrellaELLA.";
                    $scope.rain = true;
                    $scope.sun = false;
                    $scope.cloud = false;
                    $scope.clothes = 'clothes3.png';
                  }
                }
              }
            });

        };


        $scope.apiDate = backend.getAPIdate();

        $scope.getWeather($scope.apiDate);

        $scope.prevPage = function() {
          if ($scope.apiDate == backend.getAPITomorrow()) {
            $scope.apiDate = backend.getAPIdate();
            $scope.isToday = true;
            $scope.isFuture = false;
            $("#today").addClass("active");
            $("#tomorrow").removeClass("active");
            $("#nextday").removeClass("active");
            $scope.getWeather($scope.apiDate);
            $scope.thisDate = backend.getDate();

          } else if ($scope.apiDate == backend.getAPINextday()) {
            $scope.apiDate = backend.getAPITomorrow();
            $scope.getWeather($scope.apiDate);
            $scope.isToday = false;
            $scope.isFuture = true;
            $scope.thisDate = backend.getTomorrow();
            $("#today").removeClass("active");
            $("#tomorrow").addClass("active");
            $("#nextday").removeClass("active");

          } else {}
        };

        $scope.nextPage = function() {
          if ($scope.apiDate == backend.getAPIdate()) {
            $scope.apiDate = backend.getAPITomorrow();
            $scope.getWeather($scope.apiDate);
            $scope.isToday = false;
            $scope.isFuture = true;
            $scope.thisDate = backend.getTomorrow();
            $("#today").removeClass("active");
            $("#tomorrow").addClass("active");
            $("#nextday").removeClass("active");

          } else if ($scope.apiDate == backend.getAPITomorrow()) {
            $scope.apiDate = backend.getAPINextday();
            $scope.getWeather($scope.apiDate);
            $scope.isToday = false;
            $scope.isFuture = true;
            $scope.thisDate = backend.getDayAfterTomorrow();
            $("#today").removeClass("active");
            $("#tomorrow").removeClass("active");
            $("#nextday").addClass("active");
          }
        };

        $scope.thisDate = backend.getDate();
        //Dagens datum, just nu är idag alltid "20160507" men mer sofistikerad datumhantering följer

        $scope.getBreakfast = function() {
          // Hämtar den aktuella tiden för att sedan jämföra med den av användaren
          // givna tiden för att gå hemifrån. Uppdateras med ng-change när användaren 
          // ändrar sin tid.

          currentTime = new Date();
          currentHour = currentTime.getHours();
          currentMinute = currentTime.getMinutes();
          currentCalc = currentHour * 60 + currentMinute;

          leaveCalc = $scope.hLeavetime * 60 + $scope.mLeavetime;

          // Sätter nuvarande tid till kl 7:45 för att kunna testa
          currentCalc = 600;

          diff = leaveCalc - currentCalc;

          if (diff <= 0) {
            $scope.breakfast = 'breakfast4.png';
          } else if (diff <= 15) {
            $scope.breakfast = 'breakfast1.png';
          } else if (diff > 15 && diff <= 30) {
            $scope.breakfast = 'breakfast2.png';
          } else if (diff > 30) {
            $scope.breakfast = 'breakfast3.png';
          }
        };

        $scope.getBreakfast();

        $scope.userData = backend.read($scope.thisDate);
        $scope.mLeavetime = String($scope.userData.leaveTime.minutes);
        if ($scope.mLeavetime.length == 1) {
          $scope.mLeavetime = $scope.mLeavetime + "0";
        }
        $scope.hLeavetime = String($scope.userData.leaveTime.hour);
        if ($scope.hLeavetime.length == 1) {
          $scope.hLeavetime = "0" + $scope.hLeavetime;
        }

        /* Hämtar userdata för dagens datum och det rätta användarIDt. Returnerar JSON-träd med:

        0. Boolean för matlåda. False om den inte är uttagen ur kylen, true om den är uttagen
        1. Boolean för paraply. False om det ibnte är medtaget, true on det är medtaget
        2. Tid som användaren måste gå hemifrån. Ett JSON-träd med hour och minutes, heltal */

        /* Hämtar data om dagen, returnerar JSON-träd med:

        1. Förmiddagens temperatur & nederbörd, grader i heltal celsius, nederbörd i heltal millimeter
        2. Eftermiddagens temperatur & nederbörd, grader i heltal celsius, nederbörd i heltal millimeter
        3. Kvällens temperatir och nederbörd, grader i heltal celsius, nederbörd i heltal millimeter
        */

        $scope.changeDay = function(event) {
          if (event.currentTarget.id == "tomorrow") {
            $scope.apiDate = backend.getAPITomorrow();
            $scope.getWeather($scope.apiDate);
            //event.currentTarget.id.addClass("active");
            $scope.isToday = false;
            $scope.isFuture = true;
            $scope.thisDate = backend.getTomorrow();
            $("#today").removeClass("active");
            $("#tomorrow").addClass("active");
            $("#nextday").removeClass("active");

          } else if (event.currentTarget.id == "today") {
            $scope.apiDate = backend.getAPIdate();
            $scope.getWeather($scope.apiDate);
            $scope.isToday = true;
            $scope.isFuture = false;
            $scope.thisDate = backend.getDate();
            $("#today").addClass("active");
            $("#tomorrow").removeClass("active");
            $("#nextday").removeClass("active");

          } else {
            $scope.apiDate = backend.getAPINextday();
            $scope.getWeather($scope.apiDate);
            $scope.isToday = false;
            $scope.isFuture = true;
            $scope.thisDate = backend.getDayAfterTomorrow();
            $("#today").removeClass("active");
            $("#tomorrow").removeClass("active");
            $("#nextday").addClass("active");
          }
          $scope.userData = backend.read($scope.thisDate);
          $scope.readTime($scope.userData.leaveTime.hour, $scope.userData.leaveTime.minutes);
        };

        $scope.readTime = function(hour, minutes) {
          console.log(hour);
          console.log(minutes);
          if (hour.length == 1) {
            hour = 0 + $scope.hour;
          }
          if (minutes.length == 1) {
            minutes = minutes + 0;
          }
          $scope.SetLeaveTime = { value: new Date(1970, 0, 1, hour, minutes) };


        };

        $scope.writeTime = function() {
          // Hämta ut minuter och timmar för att skicka till db
          var hour = $scope.SetLeaveTime.value.getHours();
          var minute = $scope.SetLeaveTime.value.getMinutes();
          hour = parseInt(hour);
          minute = parseInt(minute);
          backend.writeTime($scope.thisDate, $scope.user, minute, hour);
        };

        $scope.currentMessage = '';

        $scope.breakfast = 'breakfast3.png';

        $scope.clothes = 'clothes1.png';

        $scope.leavingTime = function() {
          // Skicka ut tiden när användaren ska åka hemifrån
          return "8:00 AM";
        };

        $scope.ifLunchbox = function() {
          var lunch = false;
          if (lunch === true) {
            return 'bag.png';
          } else if (lunch === false) {
            return 'fridge.png';
          }
        };


      });
    });
  }
});
