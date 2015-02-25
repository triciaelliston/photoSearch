angular.module('PhotoApp', [])
  .config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })

/*  .controller('PhotoSearchCtrl', function($scope, $timeout, $q, $http) { */
  .controller('PhotoSearchCtrl', function($scope, $timeout, $http, $q, $sce) {

    $scope.embedUrl = "http://instagram.com/";
    
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

		function wait() {
      console.log("inside wait");
			var defer = $q.defer();
			$timeout(function() {
        console.log("after timeout");
				defer.resolve();
      }, 2000);
      console.log("before return defer.promise");
			return defer.promise;
		}
    
/*  function notify() {
      $scope.notifySaved = true;
      return wait().then(function() {
        console_log("after return wait");
         $scope.notifySaved = false; 
      });
    }
    */

    function notify() {
      console.log("inside notify");
      $scope.notifySuccess = true;
      return wait().then(function() {
        console.log("after wait");
         $scope.notifySuccess = false; 
         $scope.searching = false;
      });
    }

    $scope.searchPhotos = function(searchTag) {
      console.log("inside searchPhotos");
      $scope.searchTagDisplay = $scope.searchTag;
      var url = 'https://api.instagram.com/v1/tags/' + $scope.searchTag + '/media/recent';
      var myClientID = '94410b208fe54cda8983731a648a9558';
      var request = {
        client_id: "94410b208fe54cda8983731a648a9558",
        outputMode: 'json',
        callback: "JSON_CALLBACK"
      }
      $scope.searchTag = ' ';
      console.log(url);
      console.log(myClientID);
      $scope.searching = true;
			$http({
        method: 'JSONP',
        url: url,
        params: request
      })
        .success(function(responseObject) {
          console.log("inside success");
          $scope.results = responseObject.data;
          console.log($scope.results)
          
          notify();
        })
        .error(function() {
          console.log("inside error");
          $scope.error = true;
          notify().then(function() {
            $scope.error = false;
          });
        })
		};
  });
