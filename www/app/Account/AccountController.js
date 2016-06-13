(function() {
    angular
        .module('twif')
        .controller('AccountController', AccountController);
    
    AccountController.$inject = ['AccountService', '$state', 'PREFERENCES', 'FacebookService']; 
       
    function AccountController(AccountService, $state, PREFERENCES, FacebookService) {
        var vm = this;
        vm.name = AccountService.name;
        vm.email = AccountService.email;
        vm.savePreference = savePreference;
        vm.logout = logout;
        
        var Volunteer_with_Friends = PREFERENCES[0],
            Volunteer_by_Myself = PREFERENCES[1],
            Volunteer_with_Others = PREFERENCES[2],
            Collecting_Items = PREFERENCES[3],
            Donating_Money = PREFERENCES[4],
            Attending_Events = PREFERENCES[5];
  
        //vm.preferences = AccountService.getPreferencesForUser();
        AccountService.getPreferencesForUser()
        .then(function(data) {
            vm.preferences = [
                {
                    text: Volunteer_with_Friends,
                    checked: data.Item[Volunteer_with_Friends]
                },
                {
                    text: Volunteer_by_Myself,
                    checked: data.Item[Volunteer_by_Myself]
                },
                {
                    text: Volunteer_with_Others,
                    checked: data.Item[Volunteer_with_Others]
                },
                {
                    text: Collecting_Items,
                    checked: data.Item[Collecting_Items]
                },
                {
                    text: Donating_Money,
                    checked: data.Item[Donating_Money]
                },
                {
                    text: Attending_Events,
                    checked: data.Item[Donating_Money]
                }
            ];
        });
  
        function savePreference(item) {
            var newItem = item;
            //update user details with the new value
            AccountService.savePreference(item)
            .then(function(result){
               if(result) {
                   console.log(result);
               } 
            });
            
        }
        
        function logout() {
            FacebookService.logout();
        }
    }
    
})();