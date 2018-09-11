(function() {
    'use strict';

    angular.module('eventsApp').controller('BaseSponsorsCtrl', function($scope, BaseSponsor) {
        $scope.baseSponsors = BaseSponsor.query({entity: 1, limit: 900});
    });

    angular.module('eventsApp').controller('BaseSponsorCtrl', function($scope, $stateParams, BaseSponsor) {
        $scope.id = $stateParams.id;
        $scope.baseSponsor = BaseSponsor.get({id: $scope.id}, function () {
            $scope.title = $scope.baseSponsor.name.text;
            if ($scope.baseSponsor.logo != null) {
                $scope.logoImage = $scope.baseSponsor.logo.thumbnail + '_small';
            }
        });
        $scope.removeLogo = false;
    });
  
      angular.module('eventsApp').controller('BaseSponsorCreateCtrl', function($scope, $stateParams, BaseSponsor) {
          $scope.id = $stateParams.id;
          $scope.baseSponsor = new BaseSponsor();
          $scope.baseSponsor.name = {text: '', lang_code: 'en'};
          $scope.baseSponsor.description = {text: '', lang_code: 'en'};
          $scope.baseSponsor.entity = {id: 1};
          $scope.title = 'Add Base Sponsor';
      });

    angular.module('eventsApp').controller('BaseSponsorFormCtrl', function($scope, $state, $stateParams, alert, $upload, $q, WORLDSKILLS_API_IMAGES, BaseSponsor, BaseSector) {

        var logo = $q.when();

        $scope.onFileSelect = function($files) {
            var deferred = $q.defer();
            logo = deferred.promise;
            $scope.upload = $upload.upload({
                url: WORLDSKILLS_API_IMAGES,
                file: $files[0],
            }).success(function(data, status, headers, config) {
                deferred.resolve(data);
            });
        };

        $scope.save = function() {
            $scope.submitted = true;
            logo.then(function (logo) {
                if ($scope.form.$valid) {
                    $scope.loading = true;
                    if (typeof logo != 'undefined') {
                        $scope.baseSponsor.logo = {id: logo.id, thumbnail_hash: logo.thumbnail_hash};
                    } else if ($scope.removeLogo) {
                        delete $scope.baseSponsor.logo;
                    }
                    if ($scope.baseSponsor.id) {
                        $scope.baseSponsor.$update(function () {
                            alert.success('The Base Sponsor has been updated successfully.');
                            $state.go('base_sponsors');
                        });
                    } else {
                        $scope.baseSponsor.$save(function () {
                            alert.success('The Base Sponsor has been added successfully.');
                            $state.go('base_sponsors');
                        });
                    }
                }
            });
        };
    });

})();
