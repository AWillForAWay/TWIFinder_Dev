(function() {    
    angular
        .module('twif')
        .factory('UserService', UserService);

    UserService.$inject = ['AWS', '$window'];

    function UserService(AWS, $window) {
        
        var name = 'Austin Williams';
        var email = 'testemail@gmail.com';
        var service = {
            name: name,
            email: email,
            logout: logout,
            setUser: setUser,
            getUser: getUser
        };
        return service;
        
        function logout() {
            return null;
        }
        
        function setUser(user_data) {
            $window.localStorage.starter_facebook_user = JSON.stringify(user_data);
        }

        function getUser() {
            return JSON.parse($window.localStorage.starter_facebook_user || '{}');
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