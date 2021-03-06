(function () {
    'use strict';

    angular.module('map.query')
        .controller('QueryTableController', QueryTableController);

    QueryTableController.$inject = ['$scope', 'queryResults'];

    function QueryTableController($scope, queryResults) {
        var vm = this;
        vm.queryResults = queryResults;
        vm.tableColumns = ["genus", "specificEpithet", "dayOfYear", "year", "latitude", "longitude", "source", "subSource"];
        vm.tableData = [];
        vm.currentPage = 1;
        vm.pageSize = 50;
        vm.updatePage = updatePage;

        function updatePage() {
            var start = (vm.currentPage - 1) * vm.pageSize;
            var end = start + vm.pageSize;
            var data = vm.queryResults.data.slice(start, end);

            prepareTableData(data);
        }

        /*
         transform the data into an array so we can use sly-repeat to display it. sly-repeat bypasses the $watches
         greatly improving the performance of sizable tables
         */
        function prepareTableData(data) {
            vm.tableData = [];

            if (data.length > 0) {

                angular.forEach(data, function (resource) {
		    resource = resource._source
                    var resourceData = [];
                    angular.forEach(vm.tableColumns, function (key) {
                        resourceData.push(resource[key]);
                    });
                    vm.tableData.push(resourceData);
                });

            }
        }

        $scope.$watch('queryTableVm.queryResults.data', function () {
            vm.currentPage = 1;
            updatePage();
        });
    }

})();
