morningRoutine.controller("loginCtrl", function($scope, $routeParams, backend) {

  $scope.user = backend.getUserID();
  $scope.thisDate = backend.getDate();

  $scope.updateUser = function(user) {
    backend.setUserID($scope.user);
    console.log(user);
  };

});
