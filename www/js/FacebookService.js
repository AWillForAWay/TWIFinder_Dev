(function() {
    angular
        .module('twif')
        .service('FacebookService', FacebookService);
    FacebookService.$inject = ['$q', 'AWSClient'];
    function FacebookService($q, AWSClient) {
        var service = {
            login: login,
            logout: logout
        };
        return service;

        function fbLoginSuccess(response) {
            if (!response.authResponse){
                fbLoginError("Cannot find the authResponse");
                return;
            }

            var authResponse = response.authResponse;

            getFacebookProfileInfo(authResponse)
            .then(function(profileInfo) {
                // For the purpose of this example I will store user data on local storage
                UserService.setUser({
                    authResponse: authResponse,
                    userID: profileInfo.id,
                    name: profileInfo.name,
                    email: profileInfo.email,
                    picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
                });
                AWSClient.updateWithFacebook(authResponse.accessToken);
            }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
            });
        }
        
        function fbLoginError(error) {
            console.log('fbLoginError', error);
        }
        
        function login() {
            facebookConnectPlugin.getLoginStatus(function(response){
                if(response.status === 'connected') {
                    //user is logged in
                    //so we check if we already have their info
                    
                    console.log('login', response.status);
                    
                    var user = UserService.getUser('facebook');
                    
                    if(!user.userId) {
                        this.getLoginStatus(response.authResponse)
                        .then(function(profileInfo) {
                            UserService.setUser({
                                authResponse: authResponse,
                                userId: profileInfo.id,
                                name: profileInfo.name,
                                email: profileInfo.email,
                                picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
                            });
                            AWSClient.updateWithFacebook(authResponse.accessToken);
                        }, function(fail) {
                            console.log('failed to get profile info', fail);
                        });
                    }
                } else {
                    facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
                }
            });
        }
        
        function logout() {
            facebookConnectPlugin.logout(function() {
                console.log('logout successful');
            },
            function(fail) {
                console.log('failed to logout from facebook', fail);
            });
        }
        
        function getLoginStatus(authResponse) {
            var info = $q.defer();
            facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
                function (response) {
                    console.log(response);
                    info.resolve(response);
                },
                function (response) {
                    console.log(response);
                    info.reject(response);
                }
            );
            return info.promise;
        }     
    }   
})();