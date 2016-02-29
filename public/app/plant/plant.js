(function() {
  angular
    .module('plantApp')
    .controller('PlantController', ['$scope', 'PiData', '$location', '$routeParams', '$rootScope',
      function($scope, PiData, $location, $routeParams, $rootScope) {
        var vm = this;

        // VARIABLES
        vm.pis = PiData.pis;
        vm.lightSets = PiData.light;
        vm.soilSets = PiData.soilRaw;
        vm.airSets = PiData.air;
        vm.scheduleSet = PiData.schedule;
        vm.pump = false;
        vm.pi = PiData.name;
        vm.soilLabels = PiData.soilLabels;
        vm.soilSeries = PiData.soilSeries;
        vm.labelsSoil = vm.soilLabels;
        vm.dataSoil = [vm.soilSeries];
        vm.seriesSoil = ['Humidity'];
        vm.lightLabels = PiData.lightLabels;
        vm.lightSeries = PiData.lightSeries;
        vm.labelsLight = vm.lightLabels;
        vm.dataLight = vm.lightSeries;
        vm.seriesLight = ['Lux', 'IR', 'Visible'];
        vm.airLabels = PiData.airLabels;
        vm.airSeries = PiData.airSeries;
        vm.labelsAir = vm.airLabels;
        vm.dataAir = vm.airSeries;
        vm.seriesAir = ['Temp(F)', 'Humidity'];


        // FUNCTIONS
        vm.setSchedule = setSchedule;
        vm.setAutomation = setAutomation;
        vm.fetchPlantData = fetchPlantData;
        vm.logData = logData;
        vm.pumpStatus = pumpStatus;

        function setSchedule(obj) {
          obj[0].auto = false;
          PiData.putSchedule(obj);
          console.log(obj);
        };

        function setAutomation(obj) {
          obj[0].auto = true;
          PiData.putSchedule(obj);
          console.log(obj);
        };

        function fetchPlantData(id) {
          PiData.fetchPi($routeParams.id);
        }

        function logData(data) {
          console.log(data);
        }

        function pumpStatus(data) {
          PiData.pumpControl(data)
        }


      },
    ])
})()
