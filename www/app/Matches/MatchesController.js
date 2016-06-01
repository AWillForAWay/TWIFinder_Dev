(function() {
    angular
        .module('twif')
        .controller('MatchesController', MatchesController);
    
    MatchesController.$inject = ['UserService', '$state']; 
       
    function MatchesController(FacebookService, UserService, $ionicLoading, $state) {
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