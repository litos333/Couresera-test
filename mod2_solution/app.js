(function(){
'use strict';

angular.module('ShoppingListCheckOff', [])
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.controller('ToBuyController', ToBuyController);


ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function ToBuyController ($scope, ShoppingListCheckOffService){

    var ToBuy = this;
    ShoppingListCheckOffService.PushItems();
    ToBuy.items = ShoppingListCheckOffService.getItems();
    ToBuy.BuyItems = function(item){
        ShoppingListCheckOffService.BuyItems(item);
        console.log(item);
       
    }

};
AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function AlreadyBoughtController ($scope, ShoppingListCheckOffService){

    var AlreadyBought = this;
    AlreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
    
};


function ShoppingListCheckOffService(){

    var service = this;
var items = [];
var object1 = {
    quantity: 10,
    name: "cookies",
};
var object2 = {
    quantity: 5,
    name: "meatballs",
};
var object3 = {
    quantity: 2,
    name: "soda bottles",
};
var object4 = {
    quantity: 20,
    name: "popcorn bags",
};
var object5 = {
    quantity: 6,
    name: "ketchup bottles",
};

    service.PushItems = function(){
        items.push(object1, object2, object3, object4, object5);
        console.log(items);
    };


var BoughtItems = [];

   service.getItems = function(){
    return items;
   };
   service.getBoughtItems = function(){
    return BoughtItems;
   };

   service.BuyItems = function(item){
    BoughtItems.push(items[item]);
    items.splice(item,1);
    console.log(BoughtItems);
   };


}




})();