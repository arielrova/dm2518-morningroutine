morningRoutine.controller("dayCtrl", function($scope, $routeParams, backend, $http) {
  $scope.user = backend.getUserID();
  //AnvändarID, just nu alltid bara "1".
  backend.retrieveData();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        $scope.positionLAT = lat.toFixed(2);
        $scope.positionLON = lon.toFixed(2);
        console.log($scope.positionLAT);
        console.log("http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/" + $scope.positionLAT + "/lon/" + $scope.positionLON + "/data.json");


        // Plock lon och lat från mobilen och inserta här -------------------------------------------->
        $http.get("http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/" + $scope.positionLAT + "/lon/" + $scope.positionLON + "/data.json")
            .then(function(response) {
              $scope.weather = response.data.timeseries[0].t;
            });
      });
    });
  }

  $scope.prevPage = function() {
    console.log('going to prev page');
  };

  $scope.nextPage = function() {
    console.log('going to next page');
  };

  $scope.thisDate = backend.getDate();
  //Dagens datum, just nu är idag alltid "20160507" men mer sofistikerad datumhantering följer

  $scope.userData = backend.read($scope.thisDate);
  /* Hämtar userdata för dagens datum och det rätta användarIDt. Returnerar JSON-träd med:

  0. Boolean för matlåda. False om den inte är uttagen ur kylen, true om den är uttagen
  1. Boolean för paraply. False om det ibnte är medtaget, true on det är medtaget
  2. Tid som användaren måste gå hemifrån. Ett JSON-träd med hour och minutes, heltal */

  $scope.dayData = backend.getDayData($scope.thisDate);
  /* Hämtar data om dagen, returnerar JSON-träd med:

  1. Förmiddagens temperatur & nederbörd, grader i heltal celsius, nederbörd i heltal millimeter
  2. Eftermiddagens temperatur & nederbörd, grader i heltal celsius, nederbörd i heltal millimeter
  3. Kvällens temperatir och nederbörd, grader i heltal celsius, nederbörd i heltal millimeter
  */

  $scope.changeDay = function(event) {
    if (event.currentTarget.id == "yesterday") {
      $scope.thisDate = backend.getYesterday();
    } else if (event.currentTarget.id == "today") {
      $scope.thisDate = backend.getDate();
    } else {
      $scope.thisDate = backend.getTomorrow();
    }
    $scope.dayData = backend.getDayData($scope.thisDate);
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

  $scope.currentMessage = function() {
    // Här kan vi skicka olika meddelanden beroende av olika parametrar
    return "Don't forget your umbrella";
  }

  $scope.leavingTime = function() {
    // Skicka ut tiden när användaren ska åka hemifrån
    return "8:00 AM";
  }

  $scope.ifLunchbox = function() {
    var lunch = false;
    if (lunch == true) {
      return 'bag.png';
    } else if (lunch == false) {
      return 'fridge.png';
    }
  }

});
