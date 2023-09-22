(function(){
'use strict';


angular.module('NarrowItDown', [])
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
.controller('NarrowItDownController', NarrowItDownController)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    restrict: 'E',
    templateUrl: 'found-items.html',
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    controller: MenuItemsDirectiveController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}

function MenuItemsDirectiveController() {
    var menu = this;
  }


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService){
    
    var menu = this;
    menu.searchTerm = '';
    var founditems = [];
   menu.getItems = function(){
       
        var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm.toLowerCase());
    

    promise.then(function(response){
         menu.foundItems = response;
    });

    console.log(menu.foundItems);
};
    
    menu.removeItem = function(index){
       menu.foundItems.splice(index, 1);
    }


};

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
    var service = this;
    var items;
    service.getMatchedMenuItems = function(searchTerm){
        return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
         
        }).then(function (response){
        
            service.extracteddata = Object.values(response.data);
            service.items = [];
   
            for(var j=0; j< service.extracteddata.length; j++){

                var arr1 = service.items;
                service.items = arr1.concat(service.extracteddata[j].menu_items);
              
            }
            console.log("Service items are: " + service.items);
          

            service.matchedItems = [];
            for(var i=0; i<service.items.length; i++){
                service.itemDescription = service.items[i].description.toLowerCase();
                if(service.itemDescription.indexOf(searchTerm) !== -1 && searchTerm !== ''){
                    service.matchedItems.push(service.items[i]);
                }
            }
            return service.matchedItems;
        });

        
    };
}

})();