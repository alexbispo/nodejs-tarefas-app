var appTarefa = angular.module('appTarefa', []);

function mainController($scope, $http) {
	$scope.formData = {};
	
	$http.get('/api/tarefas').success(function(data) {
		$scope.tarefas = data;
		console.log(data);
	}).error(function(data) {
		console.log('Erro: ' + data);
	});
	
	$scope.criarTarefa = function() {
		$http.post('/api/tarefas', $scope.formData).success(function(data) {
			$scope.formData = {};
			$scope.tarefas = data;
			console.log(data);
		}).error(function(data) {
			console.log('Erro: ' + data);
		});	
	};
	
	$scope.deletarTarefa = function(id) {
		$http.delete('/api/tarefas/' + id).success(function(data) {
			$scope.tarefas = data;
			console.log(data);
		}).error(function(data) {
			console.log('Erro: ' + data);
		});
	};
	
	
}