(function() {    
    angular
        .module('twif')
        .factory('PreferencesService', PreferencesService);

    PreferencesService.$inject = ['AWSClient', 'PREFERENCES'];

    function PreferencesService(AWSClient, PREFERENCES) {
        var service = {
            getMatches: getMatches
        };
        
        return service;
        
        function getMatches(params) {
            
            var queryParams = {
               TableName: 'Users',
               Key: {
                   UserId: UserId,
                   Email: Email
               },
               AttributesToGet: [
                   'NonProfits'
               ]
            };
            AWSClient.docClient.update(queryParams, function (err, data){
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    return data;
                }
            });
        }
    }
})();