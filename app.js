(function() {
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective);



  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService)
  {
    var menu = this;
    menu.name="";

    menu.getItems=function () {


       MenuSearchService.getMatchedMenuItems().then(function (response) {

        var foundItems=response.data.menu_items.filter(function(Item) {
	return Item.name.toLowerCase().includes(menu.name.toLowerCase());
});;
         console.log(foundItems);
        menu.foundItems =foundItems;
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });

    }


    menu.OnRemove = function (itemIndex) {
       menu.foundItems.splice(itemIndex, 1);
     };
  }


  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (Name) {
    var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),

      });



    return response;

    };



  }
}());
