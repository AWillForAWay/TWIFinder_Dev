(function() {
    angular
        .module('twif')
        .service('AWSClient', AWSClient);
    
    AWSClient.$inject = ['COGNITO_IDENTITY_POOL_ID', 'AWS_ACCOUNT_ID', 'COGNITO_UNAUTH_ROLE_ARN', 'COGNITO_AUTH_ROLE_ARN', 'COGNITO_REGION', 'DYNAMODB_REGION_DEV'];
    function AWSClient(COGNITO_IDENTITY_POOL_ID, AWS_ACCOUNT_ID, COGNITO_UNAUTH_ROLE_ARN, COGNITO_AUTH_ROLE_ARN, COGNITO_REGION, DYNAMODB_REGION_DEV) {
        
        // var creds = new AWS.CognitoIdentityCredentials({
        //    AccountId: AWS_ACCOUNT_ID,
        //    IdentityPoolId: COGNITO_IDENTITY_POOL_ID,
        //    RoleArn: COGNITO_UNAUTH_ROLE_ARN
        // });
        // AWS.config.update({ region: COGNITO_REGION });
        // AWS.config.credentials = creds;
        
        var dynamoDB;
        
        var docClient;
        
        var service = {
            docClient: docClient,
            dynamoDB: dynamoDB,
            updateWithFacebook: updateWithFacebook
        }
        
        return service;
        
        function updateWithFacebook(access_token) {
            var updatedCreds = new AWS.CognitoIdentityCredentials({
                AccountId: AWS_ACCOUNT_ID,
                IdentityPoolId: COGNITO_IDENTITY_POOL_ID,
                RoleArn: COGNITO_AUTH_ROLE_ARN
            });
            updatedCreds.params.Logins = {};
            updatedCreds.params.Logins['graph.facebook.com'] = access_token;
            
            // updatedCreds.expired = true;
            AWS.config.update({
                credentials: updatedCreds
            });
            AWS.config.update({ region: COGNITO_REGION });
            
            this.dynamoDB = new AWS.DynamoDB({
                region: DYNAMODB_REGION_DEV
            });
            
            this.docClient = new AWS.DynamoDB.DocumentClient({region: DYNAMODB_REGION_DEV, LogLevel: 1});
           
        }
    }
})();