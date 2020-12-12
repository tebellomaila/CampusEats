var myKotaApp = angular.module('myKotaApp', ['ngRoute']);

myKotaApp.config(['$routeProvider', function($routeProvider){

$routeProvider
.when('/home',{
  templateUrl:'./views/home.html'
  controller:'KotaController'
})
.when('/register',{
  templateUrl:'./views/register.html'
})
.when('/Order',{
  templateUrl:'./views/Order.html',
  controller:'KotaController'
}).otherwise({
  redirectTo:'/home'
});

}]);


myKotaApp.controller('KotaController',['$scope','$http',function($scope, $http){

$scope.removeKota= function(kota){
  var removedKota = $scope.kotas.indexOf(kota);
  $scope.kotas.splice(removedKota, 1);
}

$http.get('data/kotas.json').success(function(data){
  $scope.kotas = data;
});

}]);
