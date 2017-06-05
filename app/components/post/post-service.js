'use strict'; angular.module('myApp.post.service',
    [])
    .factory('Post', function($http) { var
        postService = {
            getData: function () {
                return $http.get('../data/post.json').then(function (response){ return
                    response.data;
                });
            }
        }
        return postService;
    })
