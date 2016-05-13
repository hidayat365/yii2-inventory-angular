'use strict';
myApp_item.factory("services", ['$http','$location','$route',
    function($http,$location,$route) {
    var obj = {};
    obj.getItems = function(){
        return $http.get(serviceBase + 'item-rest');
    }
    obj.createItem = function (item) {
        return $http.post( serviceBase + 'item-rest/create', item )
            .then( successHandler )
            .catch( errorHandler );
        function successHandler( result ) {
            $location.path('/item/index');
        }
        function errorHandler( result ){
            alert("Error data")
            $location.path('/item/create')
        }
    };
    obj.getItem = function(itemID){
        return $http.get(serviceBase + 'item-rest/' + itemID);
    }

    obj.updateItem = function (item) {
        return $http.put(serviceBase + 'item-rest/update/' + item.id, item )
            .then( successHandler )
            .catch( errorHandler );
        function successHandler( result ) {
            $location.path('/item/index');
        }
        function errorHandler( result ){
            alert("Error data")
            $location.path('/item/update/' + item.id)
        }
    };
    obj.deleteItem = function (itemID) {
        return $http.delete(serviceBase + 'item-rest/delete/' + itemID)
            .then( successHandler )
            .catch( errorHandler );
        function successHandler( result ) {
            $route.reload();
        }
        function errorHandler( result ){
            alert("Error data")
            $route.reload();
        }
    };
    return obj;
}]);
