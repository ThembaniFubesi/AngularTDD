angular.module("addressBook",[])
    .service("contactService", function($http){
        var self = this;
        self.contacts = [];

        $http.get("http://localhost:9001/contacts").then(function(res){
            while(res.data[0]){
                self.contacts.push(res.data.pop());
            }
        });

        self.addContact = function(contact){
            this.contacts.push(contact);
        };
    })
    .controller("contactController", function(contactService, $scope){

        $scope.contacts = contactService.contacts;

    })
    .filter("proper", function(){
        return function(name){
            var type = typeof name;
            if(type !== "string" && type !== "number") throw new Error();
            return name.toString().split(" ").map(function(word){
                return word[0].toUpperCase().concat(word.slice(1));
            }).join(" ");
        };
    })
    .directive("avatar", function(){
       return{
            restrict:"AE",
            scope:{
                name:"="
            },
           template:"<span class=\"avatar\">{{name[0] | proper}}</span>"

       };
    })
    .controller("addContact", function($scope, contactService){
        $scope.addContact = function(){
            contactService.addContact($scope.contact);
        };

    })