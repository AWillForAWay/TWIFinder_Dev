(function() {
    angular
        .module('twif')
        .controller('LoginController', LoginController);
    
    LoginController.$inject = ['FacebookService', 'UserService', '$ionicLoading', '$state']; 
       
    function LoginController(FacebookService, UserService, $ionicLoading, $state) {
        var vm = this;
        vm.login = login;
        
        function login() {
            $ionicLoading.show();
            FacebookService.login();
        }   
    }
})();