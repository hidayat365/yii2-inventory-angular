'use strict';
myApp_item.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/item/index', {
        templateUrl: 'views/item/index.html',
        controller: 'index'
    })
    .when('/item/create', {
        templateUrl: 'views/item/create.html',
        controller: 'create',
        resolve: {
            item: function(services, $route){
                return services.getItems();
            }
        }
    })
    .when('/item/update/:itemId', {
        templateUrl: 'views/item/update.html',
        controller: 'update',
        resolve: {
          item: function(services, $route){
            var itemId = $route.current.params.itemId;
            return services.getItem(itemId);
          }
        }
    })
    .when('/item/delete/:itemId', {
        templateUrl: 'views/item/index.html',
        controller: 'delete',
    })
    .otherwise({
        redirectTo: '/item/index'
    });
}]);

myApp_item.controller('index', ['$scope', '$http', 'services',
    function($scope,$http,services) {
    $scope.message = 'Daftar Seluruh Barang di Database';
    // ambil list barang dari web-service
    services.getItems().then(function(data){
        $scope.items = data.data;
    });
    // fungsi untuk delete barang di grid
    $scope.deleteItem = function(itemID) {
        if(confirm("Are you sure to delete item number: " + itemID)==true && itemID>0){
            services.deleteItem(itemID);
            $route.reload();
        }
    };
}])
.controller('create', ['$scope', '$http', 'services','$location','item',
    function($scope,$http,services,$location,item) {
    $scope.message = 'Form Create Barang Baru.';
    // fungsi untuk create barang di grid
    $scope.createItem = function(item) {
        var results = services.createItem(item);
    }
}])
.controller('update', ['$scope', '$http', '$routeParams', 'services','$location','item',
    function($scope,$http,$routeParams,services,$location,item) {
    $scope.message = 'Form Update Data Barang.';
    // copy data agar bisa dibandingkan perubahannya
    var original = item.data;
    $scope.item = angular.copy(original);
    // fungsi pengecekan apakan ada perubahan data?
    $scope.isClean = function() {
        return angular.equals(original, $scope.item);
    }
    // fungsi untuk update barang ke database
    $scope.updateItem = function(item) {
        var results = services.updateItem(item);
    }
}]);
