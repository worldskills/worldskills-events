(function() {
    'use strict';

    angular.module('eventsApp').component('wsEntitySelect', {
        templateUrl: 'views/ws_entity_select.html',
        bindings: {
            entity: '='
        },
        controller: ['$scope', '$uibModal', 'WsEntity', function ($scope, $uibModal, WsEntity) {

            var ctrl = this;
            $scope.entitiesTree = [];
            $scope.entityFilter = {query: ''};
            function parseTree(entity) {
                var node = {label: entity.name.text, children: [], data: entity};
                angular.forEach(entity.children, function (child) {
                    var childNode = parseTree(child);
                    if (childNode !== false) {
                        node.children.push(childNode);
                    }
                });
                if (node.label.toLowerCase().indexOf($scope.entityFilter.query.toLowerCase()) != -1 || node.children.length > 0) {
                    if ($scope.entityFilter.query && node.children.length > 0) {
                        node.expanded = true;
                    }
                    return node;
                } else {
                    return false;
                }
            }
            function createTree() {
                $scope.entitiesTree = [];
                angular.forEach($scope.entities, function (entity) {
                    var node = parseTree(entity);
                    if (node !== false) {
                        $scope.entitiesTree.push(node);
                    }
                });
            }
            WsEntity.query(function(data) {
                $scope.entities = data.ws_entities;
            });

            $scope.selectedEntity = null;
            $scope.selectEntity = function (entity) {
                ctrl.entity = entity.data.id;
                $scope.selectedEntity = entity;
            };
            $scope.clearEntity = function () {
                ctrl.entity = null;
                $scope.selectedEntity = null;
                $scope.wsEntityModal.close();
            };
            $scope.okEntity = function (entity) {
                $scope.wsEntityModal.close();
            };
            $scope.filterEntityTree = function () {
                createTree();
            };
            $scope.selectWsEntity = function () {
                createTree();
                $scope.wsEntityModal = $uibModal.open({
                    templateUrl: 'views/ws_entity_tree.html',
                    size: 'md',
                    scope: $scope
                });
            };

        }]

    });

})();
