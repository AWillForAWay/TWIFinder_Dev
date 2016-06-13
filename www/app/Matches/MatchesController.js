(function() {
    angular
        .module('twif')
        .controller('MatchesController', MatchesController);
    
    MatchesController.$inject = ['$state', 'MatchesService']; 
       
    function MatchesController($state, MatchesService) {
        var vm = this;
  
        function getMatches() {
            
        }   
    }
})();