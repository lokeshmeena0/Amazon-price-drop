const amazonextension = angular.module("amazonextension", ['ui.router']);

amazonextension.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
            url:'/home',
            templateUrl:'./views/home.html',
        })
        .state('login', {
            url: '/login',
            templateUrl: './views/login.html',
            controller: 'Login'
        })
        .state('sign-up', {
            url: '/sign-up',
            templateUrl: './views/sign-up.html',
            controller: 'SignUp'
        });

        $urlRouterProvider.otherwise('/login');
});

amazonextension.controller('Login', ['$scope','$state', function($scope, $state){
    $scope.sendMsg = function(){
        console.log("This is called");
        $scope.msg = 'btn clicked';
    }
    $scope.SignIn = function(){
        $scope.formData = {
            'isLogin':true,
            'data':{
                'email': $scope.email,
                'password': $scope.password,
            }
        };
        console.log($scope.formData);
        chrome.runtime.sendMessage({data: $scope.formData});
    }
    $scope.goToSignUp = function(){
        $state.go('sign-up');
    }
}]);

amazonextension.controller('SignUp', ['$scope','$state', function($scope, $state){
    $scope.signUp = function(){
        $scope.formData = {
            'data':{
                'email': $scope.email,
                'name': $scope.name,
                'password': $scope.password,
                'confirm': $scope.confirm,
            },
            'isLogin':false,
        };
        console.log($scope.formData);
        chrome.runtime.sendMessage({data: $scope.formData});
    }
}]);

