//this is the main module which will make the whole App
//use angular.
var newApp = angular.module('newApp', ['ngRoute']);

//config method runs code before application is runs


//this controller will receive data from the registration form
//and be manipulated here.
newApp.controller('registerController', ['$scope', function($scope) {

       $scope.user = {name: '', email: '', password: ''};
 }]);

//this controller will receive data from login Page
// be verified for user.
 newApp.controller('loginController', ['$scope', function($scope) {

        $scope.user = {name: '', email: '', password: ''};
  }]);

  //this controller will receive data from menu Page
    newApp.controller('itemsController', ['$scope', function($scope) {

      $scope.item = {
       cheese : 'NO',
       polony : 'NO',
       egg : 'NO'
     };

    //funtion to additems()
  $scope.addItems = function(){
    $scope.orders.push({
      cheese: $scope.item.cheese,
      polony: $scope.item.polony,
      egg: $scope.item.egg
  });
  //add code
  };

//array of orders
$scope.orders = [
  {
  cheese: "NO",
  polony: "NO",
  egg: "NO"
}
];

$scope.prices = [
  {
  cheesePrice: "3",
  polonyPrice: "3",
  eggPrice: "3"
}
];

}]);

newApp.controller('order-successController', ['$scope', '$location', function($scope,$location){

  $scope.item = {
   cheese : 'NO',
   polony : 'NO',
   egg : 'NO'
 };

  $scope.sendMessage = function(){
    $location.path('/order-success');
  };

}]);

// views and routing
newApp.config(['$routeProvider', function($routeProvider){

  $routeProvider
  .when('/home', {
    templateUrl: 'views/home.html'
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    // controller: 'registerController'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    // controller: 'loginController'
  })
  .when('/menu', {
    templateUrl: 'views/menu.html'
    //controller: 'itemsController'
  })
  .when('/order-success', {
    templateUrl: 'views/order-success.html'
    //controller: 'order-successController'
  })
  .otherwise({
    redirectTo: '/login'
  })
}]);
