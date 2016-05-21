morningRoutine.controller("loginCtrl", function($scope, $routeParams, backend) {

  $scope.thisDate = backend.getDate();

  $scope.updateUser = function(user) {
    backend.setUserID(user);
    console.log(user);
  };

});
