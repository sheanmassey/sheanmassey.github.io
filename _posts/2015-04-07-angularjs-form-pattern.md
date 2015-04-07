---
layout: post
---

A few patterns Ive landed while using angularjs.

Organizing your resources with a factory and $resource:

{% highlight js %}
angular.factory('API', ['$resource', function($resource){
    return {
        book: $resource('/api/book/:id', {id: '@id'}, {}),
        config: $resource('/api/config/')
    };
}]);
{% endhighlight %}

The edit / cancel pattern:

{% highlight js %}
angular.controller('BookCtrl', ['$scope', 'API', function($scope, API){
    $scope.config = null;
    $scope.books = [];

    $scope.selectedBook = null;
    $scope.selectedBookEdit = null;
    $scope.showBookEditor = false;

    API.config.get(function(c){
        $scope.config = c;
    });

    API.book.query(function(books){
        $scope.books = books;
    });

    $scope.selectBook = function(b){
        $scope.selectedBook = b;
        $scope.selectedBookEdit = angularjs.copy(b);
        $scope.showBookEditor = true;
    };

    $scope.newBook = function(){
        $scope.selectedBook = null;
        $scope.selectedBookEdit = {};
        $scope.showBookEditor = true;
    };

    $scope.editorOnSave = function(){
        var book = API.book( $scope.selectedBookEdit );

        book.$save(function(api_book){
            if ( $scope.selectedBook ) {
                $scope.books.splice( $scope.books.indexOf( $scope.selectedBook ), 1 );
            }
            $scope.books.push(api_book);
            $scope.selectedBook = api_book;
            $scope.selectedBookEdit = angularjs.copy(api_book);
        });
    };

    $scope.editorOnCancel = function(){
        $scope.selectedBook = null;
        // could reset it or keep it around just in case the user wants to come back:
        $scope.selectedBookEdit = null;
        $scope.showBookEditor = false;
    };
}]);
{% endhighlight %}
