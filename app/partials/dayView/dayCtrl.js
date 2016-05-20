morningRoutine.controller("dayCtrl", function($scope, $routeParams, backend, $http) {
  $scope.user = backend.getUserID();
  $scope.mLeavetime = 00;
  $scope.hLeavetime = 08;

  //AnvändarID, just nu alltid bara "1".
  backend.retrieveData();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        var lat = position.coords.latitude.toFixed(2);
        var lon = position.coords.longitude.toFixed(2);


  $scope.getWeather = function (date) {
    $http.get("http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/"
            + lat + "/lon/" + lon+ "/data.json")
        .then(function(response) {
          var timeseries = response.data.timeseries;
          console.log("http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/"
              + lat + "/lon/" + lon+ "/data.json");
          for (var i in timeseries) {
            if (timeseries[i].validTime == date ) {
              $scope.temp = timeseries[i].t;
              console.log("TEMP" + $scope.temp);
              if (timeseries[i].pit == 0 && timeseries[i].tcc > 2) {
                $scope.rain = false;
                $scope.sun = false;
                $scope.cloud = true;
                $scope.currentMessage = "Clouds everywhere. Eat them!";
                $scope.clothes = 'clothes2.png'
              } else if (timeseries[i].pit == 0 && timeseries[i].tcc < 2) {
                $scope.rain = false;
                $scope.sun = true;
                $scope.cloud = false;
                $scope.currentMessage = "Don't forget your sunglasses!";
                $scope.clothes = 'clothes1.png'
              } else {
                $scope.currentMessage = "Don't forget your umbrellaELLA.";
                $scope.rain = true;
                $scope.sun = false;
                $scope.cloud = false;
                $scope.clothes = 'clothes3.png'
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
      $scope.getWeather($scope.apiDate);

    } else if ($scope.apiDate == backend.getAPINextday()){
      $scope.apiDate = backend.getAPITomorrow();
      $scope.getWeather($scope.apiDate);
    } else {}
  };

  $scope.nextPage = function() {
    if ($scope.apiDate == backend.getAPIdate()) {
      $scope.apiDate = backend.getAPITomorrow();
      $scope.getWeather($scope.apiDate);

    } else if ($scope.apiDate == backend.getAPITomorrow()) {
      $scope.apiDate = backend.getAPINextday();
      $scope.getWeather($scope.apiDate);

    }
  };

  $scope.thisDate = backend.getDate();
  //Dagens datum, just nu är idag alltid "20160507" men mer sofistikerad datumhantering följer


  $scope.userData = backend.read($scope.thisDate);
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

    } else if (event.currentTarget.id == "today") {
      $scope.apiDate = backend.getAPIdate();
      $scope.getWeather($scope.apiDate);

    } else {
      $scope.apiDate = backend.getAPINextday();
      $scope.getWeather($scope.apiDate);
    }

    $scope.userData = backend.read($scope.thisDate);
    console.log($scope.userData);
  };
  /* Det här är bullshitfunktion för att vi ska komma igång med development.

  I framtiden ersätts den av något liknande, åtminstone utan hårdkodade datum :D  */


  $scope.write = function() {
    backend.write(umbrella, lunchBox);
  };
  // För att skriva till model/backend/data/firebase-pryl, använd backend.write().
  // Säg till vilka fler parametrar ni vill kunna skriva!

  $scope.currentMessage = '';

  $scope.breakfast = 'breakfast3.png';

  $scope.clothes = 'clothes1.png';

  $scope.leavingTime = function() {
    // Skicka ut tiden när användaren ska åka hemifrån
    return "8:00 AM";
  };

  $scope.ifLunchbox = function() {
    var lunch = false;
    if (lunch == true) {
      return 'bag.png';
    } else if (lunch == false) {
      return 'fridge.png';
    }
  }


      });
    });
  }
});
