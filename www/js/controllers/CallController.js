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
        
        function call(isInitiatior, peer_id){
            
        }
        
        $scope.startCall = function(){            
            $scope.isCalling = true;
            $scope.callIgnored = false;
            $scope.callEnded = false;
            
            SocketService.emit('sendMessage', {
                'id' : id,
                'peer_id' : $scope.peer_id,
                'type' : 'call'
            });
            
            $scope.call_modal.show();
        }
        
        $scope.closeModal = function(){
            $scope.call_modal.hide();
        }
        
        $scope.ignore = function(){
            $scope.call_modal.hide();
        }
        
        function onMessageReceive(message){
            console.log("onMessageReceive called: \n", message);
            switch (message.type){
                case 'call':
                    $scope.isCalling = false;
                    $scope.callEnded = false;
                    $scope.callIgnored = false;
                    $scope.callEnded = false;
                    
                    $scope.call_modal.show();
                    $scope.peer_id = message.id;
                    
                    $scope.current_modal = 'call_modal';
                    break;
            }
        }
        
        SocketService.on('messageReceived', onMessageReceive);
        
        
        
    }
})();