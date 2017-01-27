(function(){
    angular.module('starter')
            .controller('CallController', ['$scope', '$state', '$timeout', '$ionicModal', 'SocketService', CallController]);
    
    function CallController($scope, $state, $timeout, $ionicModal, SocketService){
        
        var r = new Random();
        
        var id = r.integer(10000, 99999);
        $scope.id = id;
        
        $scope.contact = {};
        
        $scope.callInProgress = false;
        $scope.callIgnored = false;
        $scope.callEnded = false;
        
        SocketService.emit('login', {'id': id});
        
        $ionicModal.fromTemplateUrl('templates/call-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal){
            $scope.call_modal = modal;
        });
        
        function(isInitiatior, peer_id){
            
        }
        
    }
})();