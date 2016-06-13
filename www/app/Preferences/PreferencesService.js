(function() {    
    angular
        .module('twif')
        .factory('PreferencesService', PreferencesService);

    PreferencesService.$inject = ['AWSClient', 'PREFERENCES'];

    function PreferencesService(AWSClient, PREFERENCES) {
        var Volunteer_with_Friends = PREFERENCES[0],
            Volunteer_by_Myself = PREFERENCES[1],
            Volunteer_with_Others = PREFERENCES[2],
            Collecting_Items = PREFERENCES[3],
            Donating_Money = PREFERENCES[4],
            Attending_Events = PREFERENCES[5];
        var service = {
            savePreferences: savePreferences
        };
        
        return service;
        
        
        
        function savePreferences(params) {
            
            var queryParams = {
               TableName: 'Users',
               Key: {
                   UserId: UserId,
                   Email: Email
               },
               ExpressionAttributeNames: {
                   '#f': Volunteer_with_Friends,
                   '#m': Volunteer_by_Myself,
                   '#o': Volunteer_with_Others,
                   '#c': Collecting_Items,
                   '#d': Donating_Money,
                   '#a': Attending_Events,
               },
               ExpressionAttributeValues: {
                ':f': params[Volunteer_by_Friends],
                ':m': params[Volunteer_by_Myself],
                ':o': params[Volunteer_by_Others],
                ':c': params[Collecting_Items],
                ':d': params[Donating_Money],
                ':a': params[Attending_Events],
               },
               UpdateExpression: 'set #f = :f,'
                                   + '#m = :m,'
                                   + '#o = :o,'
                                   + '#c = :c,'
                                   + '#d = :d,'
                                   + '#a = :a'
            };
            AWSClient.docClient.update(queryParams, function (err, data){
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                }
            });
        }
    }
})();