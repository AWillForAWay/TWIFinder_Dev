(function() {
    angular
        .module('twif')
        .service('FacebookService', FacebookService);
    FacebookService.$inject = ['$q', 'AWSClient', 'UserService', '$state', '$ionicLoading', '$ionicPopup', '$localstorage'];
    function FacebookService($q, AWSClient, UserService, $state, $ionicLoading, $ionicPopup, $localstorage) {
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
            AWSClient.updateWithFacebook(authResponse.accessToken);
            
            getFacebookProfileInfo(authResponse)
            .then(function(profileInfo) {
                UserService.checkIfUserExists({
                    'userId': profileInfo.id,
                    'email': profileInfo.email,
                    'name': profileInfo.name,
                });
            }, function(fail){
                // Fail get profile info
                console.log('profile info fail', fail);
            });
        }
        
        function fbLoginError(error) {
            $ionicPopup.show({
                title: 'Login Error!',
                template: 'There was an error logging in to Facebook. Please try again. ' + error
            });
            console.log('fbLoginError', error);
        }
        
        function login() {
            if (!window.cordova) {
                facebookConnectPlugin.browserInit(1024907954257058);
            }
            facebookConnectPlugin.getLoginStatus(function(response){
                if(response.status === 'connected') {
                    //user is logged in
                    //so we check if we already have their info
                    
                    console.log('login', response.status);
                    
                    var user = UserService.getUser('facebook');
                    
                    if(!user.userId) {
                        AWSClient.updateWithFacebook(response.authResponse.accessToken);
                        getFacebookProfileInfo(response.authResponse)
                        .then(function(profileInfo) {
                            //We can assume that the user is already in the 
                            //db if we are connected so we can call setUser
                            UserService.setUser({
                                userId: profileInfo.id,
                                name: profileInfo.name,
                                email: profileInfo.email,
                                picture : "http://graph.facebook.com/" + profileInfo.userID + "/picture?type=large"
                            });   
                            $ionicLoading.hide();
                            $state.go('tab.dash');                         
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
        
        function getFacebookProfileInfo(authResponse) {
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