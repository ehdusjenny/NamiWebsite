angular.module('namiworld')
.service('FoodArticle', function() {
  var article;

  var getArticle = function() {
      return article;
  };

  var setArticle = function(articleObject){
      article = articleObject;
  };

  return {
    getArticle: getArticle,
    setArticle: setArticle
  };

});