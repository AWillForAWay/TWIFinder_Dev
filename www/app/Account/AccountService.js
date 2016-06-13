(function() {    
    angular
        .module('twif')
        .factory('AccountService', AccountService);

    AccountService.$inject = ['AWSClient', 'UserService', 'PREFERENCES', '$q'];

    function AccountService(AWSClient, UserService, PREFERENCES, $q) {
        var user = UserService.getUser();
        var name = user.name;
        var Email = user.email;
        var UserId = parseInt(user.userId);

        var service = {
            name: name,
            email: Email,
            savePreference: savePreference,
            getPreferencesForUser: getPreferencesForUser
        };
        
        return service;
        
        function getPreferencesForUser() {
            var prefs = $q.defer();
            var queryParams = {
               TableName: 'Users',
               Key: {
                   UserId: UserId,
                   Email: Email
               },
               AttributesToGet: [
                   'Volunteer with Friends',
                   'Volunteer by Myself',
                   'Volunteer with Others',
                   'Collecting Items',
                   'Donating Money',
                   'Attending Events'
               ]
            };
            AWSClient.docClient.get(queryParams, function (err, data){
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                    prefs.reject(err);
                } else {
                    prefs.resolve(data);
                }
            });
            return prefs.promise;
        }
        
        function savePreference(updatedPreference) {
            var result = $q.defer();
            var queryParams = {
               TableName: 'Users',
               Key: {
                   UserId: UserId,
                   Email: Email
               },
               ExpressionAttributeNames: {
                   '#p': updatedPreference['text']
               },
               ExpressionAttributeValues: {
                ':c': updatedPreference['checked']
               },
               UpdateExpression: 'set #p = :c'
            };
            AWSClient.docClient.update(queryParams, function (err, data){
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                    result.reject(err);
                } else {
                    result.resolve(data);
                }
            });
            return result.promise;
        }
    }
})();