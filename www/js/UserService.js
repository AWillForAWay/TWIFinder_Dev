(function() {    
    angular
        .module('twif')
        .factory('UserService', UserService);

    UserService.$inject = ['AWSClient', '$window', '$localstorage', 'PREFERENCES', '$ionicLoading', '$state'];

    function UserService(AWSClient, $window, $localstorage, PREFERENCES, $ionicLoading, $state) {
        
        var name = 'Austin Williams';
        var email = 'testemail@gmail.com';
        var preferences = PREFERENCES;
        var service = {
            name: name,
            email: email,
            preferences: preferences,
            logout: logout,
            setUser: setUser,
            getUser: getUser
        };
        return service;
        
        function logout() {
            return null;
        }
        
        function setUser(user_data) {
            $localstorage.setObject('user_data', user_data);
        }

        function getUser() {
            return $localstorage.getObject('user_data');
        }
        
        function checkIfUserExists(queryParams) {
            setUser({
                userID: queryParams.id,
                name: queryParams.name,
                email: queryParams.email,
                picture : "http://graph.facebook.com/" + profileInfo.id + "/picture?type=large"
            });
            var params = {
                TableName: 'Users',
                Key: {
                    UserId: queryParams.userId,
                    Email: queryParams.email
                }
            };
            AWSClient.docClient.get(params, function(err, data) {
                if(err) {
                    console.log('error: ' + err);
                    createUser();
                }
            });
        }
        
        function createUser() {
            var user = getUser();
            var Volunteer_with_Friends = Preferences[0],
                Volunteer_by_Myself = Preferences[1],
                Volunteer_with_Others = Preferences[2],
                Collecting_Items = Preferences[3],
                Donating_Money = Preferences[4],
                Attending_Events = Preferences[5];

            if(user.userId) {
                var params = {
                    TableName: 'Users',
                    Item: {
                        UserId: user.userId,
                        Email: user.email,
                        FirstName: user.name.split('\ ')[0],
                        LastName: user.name.split('\ ')[1],
                        Volunteer_with_Friends: false,
                        Volunteer_by_Myself: false,
                        Volunteer_with_Others: false,
                        Collecting_Items: false,
                        Donating_Money: false,
                        Attending_Events: false,
                    }  
                };
                AWSClient.docClient.put(params, function(err, data) {
                    if(err) {
                        console.log('error: ' + err);   
                    }
                    $ionicLoading.hide();
                    $state.go('tab.dash');
                });
            }
            else {
                console.log('user not found');
            }
        }
        
        function getUserByEmail(queryParams, callback) {
            var params = {
                TableName: 'Users',
                Key: {
                    Email: queryParams.email
                }
            };
            
            AWS.AWS.docClient.get(params, function(err, data){
                if(err) {
                    console.error('Unable to read item. JSON Error:', JSON.stringify(err, null, 2));
                }
                else {
                    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                    name = data.FirstName + ' ' + data.LastName;
                    email = data.Email;
                    
                }
            });
        }
        
        function updateUserPreference(queryParams, callback) {
            var params = {
                TableName: 'Users',
                Key: { UserId: queryParams.UserId },
                UpdateExpression: "SET " + queryParams.text + " = :c",
                ExpressionAttributeValues:{
                    ":c": queryParams.checked
                },
                ReturnValues: "UPDATED_NEW"
            }
        }
        
    }
})();