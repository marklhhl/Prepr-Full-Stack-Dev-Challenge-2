// jshint esversion: 6
let api = (function(){
    "use strict";

    let module = {};

    // instantiate followings object, which includes the list of partners that the user is following
    if (!localStorage.getItem('followings')){
        localStorage.setItem('followings', JSON.stringify({partners: []}));
    }
    
    // add a partner to the followings list
    module.addPartner = function(name){
        let followings = JSON.parse(localStorage.getItem('followings'));
        let index = followings.partners.findIndex(function(partner){
            return partner === name;
        });
        // add the partner if it does not exist in storage
        if (index === -1){
            followings.partners.push(name);
            followings.partners.get
            localStorage.setItem('followings', JSON.stringify(followings));
            //notify following handlers
            notifyFollowingsHandlers();
        }
    };
    
    // delete a partner from the followings list
    module.deletePartner = function(name){
        let followings = JSON.parse(localStorage.getItem('followings'));
        let index = followings.partners.findIndex(function(partner){
            return partner === name;
        });
        // return null if partner name does not exist
        if (index === -1) return null;
        followings.partners.splice(index, 1);
        localStorage.setItem('followings', JSON.stringify(followings));
        //notify following handlers
        notifyFollowingsHandlers();
    };

    // function for getting all the partners that a user followed
    let getFollowings = function(){
        let followings = JSON.parse(localStorage.getItem('followings'));
        return followings.partners;
    };

    // following handlers
    let followingsHandlers = [];

    function notifyFollowingsHandlers(){
        followingsHandlers.forEach(function(handler){
            handler(getFollowings());
        });
    }

    // call handler when a partner is followed or unfollowed
    module.onFollowingsUpdate = function(handler){
        followingsHandlers.push(handler);
        handler(getFollowings());
    };
    
    return module;
})();