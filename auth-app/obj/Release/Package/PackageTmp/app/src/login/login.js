(function () {

    angular
         .module('users')
         .controller('Login', [
            'userService', '$state', 'store',
            Login
         ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function Login(userService, $state, store) {
        var self = this;

        self.username = store.get('username');;
        self.login = doLogin;
        // Load all registered users

        //userService
        //      .loadAllUsers()
        //      .then(function (users) {
        //          self.users = [].concat(users);
        //          self.selected = users[0];
        //      });

        // *********************************
        // Internal methods
        // *********************************

        /**
         * Hide or Show the 'left' sideNav area
         */
        function doLogin() {
            store.remove('username');
            store.set('username', self.username); 
            $state.go('user');
           
        }

        /**
         * Select the current avatars
         * @param menuId
         */
        //function selectUser(user) {
        //    self.selected = angular.isNumber(user) ? $scope.users[user] : user;
        //}



    }

})();