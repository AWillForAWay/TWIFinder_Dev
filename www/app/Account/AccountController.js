(function() {
    angular
        .module('twif')
        .controller('AccountController', AccountController);
    
    AccountController.$inject = ['UserService', '$state', 'FacebookService']; 
       
    function AccountController(UserService, $state, FacebookService) {
       var vm = this;
  
        function savePreference(item, checked) {
            var newItem = item;
            var check = checked;
            //update user details with the new value

        }
        
        function logout() {
            FacebookService.logout();
        }
        
        vm.preferences = UserService.preferences;
        vm.name = UserService.name;
        vm.email = UserService.email;
        vm.categories = UserService.categories;
        vm.saveCategory = saveCategory;
        vm.logout = logout;
    }
})();