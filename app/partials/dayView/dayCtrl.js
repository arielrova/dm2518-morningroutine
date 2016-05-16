morningRoutine.controller("dayCtrl", function($scope, $routeParams, backend) {
  $scope.user = backend.getUserID();
  //AnvändarID, just nu alltid bara "1".

  $scope.prevPage = function () {
    console.log('going to prev page');
  };

  $scope.nextPage = function () {
    console.log('going to next page');
  };

  $scope.thisDate = backend.getDate();
  //Dagens datum, just nu är idag alltid "20160507" men mer sofistikerad datumhantering följer

  $scope.userData = backend.read($scope.thisDate, $scope.user);
  console.log($scope.userData);
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
      $scope.thisDate = 20160506;
    } else if (event.currentTarget.id == "today") {
      $scope.thisDate = 20160507;
    } else {
      $scope.thisDate = 20160508;
    }
    $scope.dayData = backend.getDayData($scope.thisDate);
    $scope.userData = backend.read($scope.thisDate, $scope.user);
    console.log($scope.userData);
    console.log($scope.dayData);
  };
  /* Det här är bullshitfunktion för att vi ska komma igång med development.

  I framtiden ersätts den av något liknande, åtminstone utan hårdkodade datum :D  */


  $scope.write = function() {
    backend.write(umbrella, lunchBox);
  };
  // För att skriva till model/backend/data/firebase-pryl, använd backend.write().
  // Säg till vilka fler parametrar ni vill kunna skriva!

});
