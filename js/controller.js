// jshint esversion: 6
(function(){
    "use strict";

    window.onload = function(){

        // handle the display of comments on comment update
        api.onFollowingsUpdate(function(partners){
            // if there exist any followings, then do the following
            if (document.querySelector('#followings') !== null){
                let followingList = document.querySelector('#followings');
                followingList.innerHTML= '';
                partners.forEach(function(partner){
                    // for each partner, create the following element
                    followingList.innerHTML += "<li>" + partner + "</li>";
                });
            }
        });

        // add event listener for follow buttons
        document.querySelectorAll('.followBtn').forEach(followButton => {
            followButton.addEventListener('click', event => {
                api.addPartner(followButton.value);
            })
          })
        // add event listener for unfollow buttons
        document.querySelectorAll('.unfollowBtn').forEach(unfollowButton => {
            unfollowButton.addEventListener('click', event => {
                api.deletePartner(unfollowButton.value);
            })
          })
    };
}());