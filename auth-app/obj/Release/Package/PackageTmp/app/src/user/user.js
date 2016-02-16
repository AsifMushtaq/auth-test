(function () {

    angular
         .module('users')
         .controller('User', [
            'userService', 'store', '$firebaseObject', '$timeout', '$mdDialog',
            User
         ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function User(userService, store, $firebaseObject, $timeout, $mdDialog) {
        var self = this;

        self.username = store.get('username');
        self.send = send;
        self.varified = false;

        var ref = new Firebase("https://domain-auth.firebaseio.com/verify-receive");
        self.varificationCode = $firebaseObject(ref);

        $timeout(function () {
            self.showConfirm();
        }, 3000);
        

        function send() {
            var ref2 = new Firebase("https://domain-auth.firebaseio.com/verify-receive");
            var sendMessage = $firebaseObject(ref2);
            //self.varificationCode.$value = {
            //    verification_key: "89"
            //};;
            sendMessage.$value = { email: guid() };
            sendMessage.$save();
            self.varified = true;
        }


        self.showConfirm = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                  .title('Press verify to authorise your request.')
                  .textContent("You've just made a request to login using Passwordless Authentication on a DomainGroup website.")
                  .ariaLabel('Lucky day')
                  .targetEvent(ev)
                  .ok('Verify!')
                  .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                self.status = 'Verified';
            }, function () {
                self.status = 'Canceled';
            });
        };


        /**
         * Select the current avatars
         * @param menuId
         */
        //function selectUser(user) {
        //    self.selected = angular.isNumber(user) ? $scope.users[user] : user;
        //}

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
        }

    }

})();