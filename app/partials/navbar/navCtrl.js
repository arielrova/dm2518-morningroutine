morningRoutine.controller("navCtrl", function($scope, $routeParams, backend) {
  $scope.user = backend.getUserID();
  $scope.thisDate = backend.getDate();
});
