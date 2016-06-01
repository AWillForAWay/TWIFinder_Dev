(function() {
    angular
        .module('twif')
        .controller('LoginController', LoginController);
    
    LoginController.$inject = ['FacebookService', 'UserService', '$ionicLoading', '$state']; 
       
    function LoginController(FacebookService, UserService, $ionicLoading, $state) {
        var vm = this;
        vm.login = login;
        
        checkLoginStatus();
        
        function checkLoginStatus() {
            var user = UserService.getUser('facebook');
            if(user.userId) {
                $state.go('tab.dash');
            }
        }
  
        function login() {
            $ionicLoading.show();
            FacebookService.login();
        }   
    }
})();