(function() {
    angular
        .module('twif-constants', [])
        .constant('COGNITO_IDENTITY_POOL_ID', 'us-east-1:a78e9647-71d2-4488-860a-b789bfce12bb')
        .constant('COGNITO_UNAUTH_ROLE_ARN', 'arn:aws:iam::358315803191:role/Cognito_TWIFinderUnauth_Role')
        .constant('COGNITO_AUTH_ROLE_ARN', 'arn:aws:iam::358315803191:role/Cognito_TWIFinderAuth_Role')
        .constant('AWS_ACCOUNT_ID', '358315803191')
        .constant('DYNAMODB_REGION_DEV', 'us-west-2')
        .constant('COGNITO_REGION', 'us-east-1')
        .constant('PREFERENCES', 
                    ["Volunteer with Friends",
                    "Volunteer by Myself",
                    "Volunteer with Others",
                    "Collecting Items",
                    "Donating Money",
                    "Attending Events"]
        );
    
})();