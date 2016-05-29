angular.module('twif')

.controller('DashCtrl', function($scope) {
  
})

.controller('LoginCtrl', ['$scope', '$ionicLoading', 'FacebookService', 'UserService', function($scope, $ionicLoading, FacebookService, UserService) {
  var vm = this;
  vm.login = login;
  
  
  function login() {
    $ionicLoading.show();
    FacebookService.login();
  }
  
}])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('PreferencesCtrl', ['PREFERENCES', function(PREFERENCES) {
  var vm = this;
  var Volunteer_with_Friends = Preferences[0],
      Volunteer_by_Myself = Preferences[1],
      Volunteer_with_Others = Preferences[2],
      Collecting_Items = Preferences[3],
      Donating_Money = Preferences[4],
      Attending_Events = Preferences[5];
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
  
  function savePreferences(item, checked) {
    var newItem = item;
    var check = checked;
    //update user details with the new value

  }
  
}])

.controller('AccountCtrl', ['UserService', function(UserService, AWS) {
  var vm = this;
  
  function savePreference(item, checked) {
    var newItem = item;
    var check = checked;
    //update user details with the new value

  }
  
  function logout() {
    UserService.logout();
  }
  
  vm.preferences = UserService.preferences;
  vm.name = UserService.name;
  vm.email = UserService.email;
  vm.categories = UserService.categories;
  vm.saveCategory = saveCategory;
  vm.logout = logout;
}]);