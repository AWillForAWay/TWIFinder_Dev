(function() {
    angular
        .module('twif')
        .controller('PreferencesController', LoginController);
    
    PreferencesController.$inject = ['PREFERENCES', 'PreferencesService', '$ionicPopup']; 
       
    function PreferencesController(PREFERENCES, PreferencesService, $ionicPopup) {
        var vm = this;
        var Volunteer_with_Friends = PREFERENCES[0],
            Volunteer_by_Myself = PREFERENCES[1],
            Volunteer_with_Others = PREFERENCES[2],
            Collecting_Items = PREFERENCES[3],
            Donating_Money = PREFERENCES[4],
            Attending_Events = PREFERENCES[5];
        var preferences = [
            {
                text: Volunteer_with_Friends,
                checked: false 
            },
            {
                text: Volunteer_by_Myself,
                checked: false 
            },
            {
                text: Volunteer_with_Others,
                checked: false 
            },
            {
                text: Collecting_Items,
                checked: false 
            },
            {
                text: Donating_Money,
                checked: false 
            },
            {
                text: Attending_Events,
                checked: false 
            }
        ];
        
        vm.savePreference = savePreference;
        vm.preferences = preferences;
        
        function savePreferences() {
            var params = {};
            
            for (item in preferences) {
                params[item.text] = item.checked;
            }
            //update user details with the new value
            return PreferencesService.savePreferences(params)
            .then(function (){ $state.go('tab.dash'); })
            .catch(showError);
        }
        
        function showError() {
            //show toast message
        }
    }
})();