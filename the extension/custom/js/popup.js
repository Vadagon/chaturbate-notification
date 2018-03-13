var app = angular.module('app', []);
app.controller('ctrl', function($scope) {
	$scope.tab = {
		settings: !1
	}
	$scope.d = {
		token: [10, 10, 10],
		duration: [10, 10, 10],
		pack: 1,
		font: {
			style: 0,
			color: 'FFFFFF'
		},
		back: {
			color: 'FFFFFF',
			trans: 44
		}
	}
	$scope.font = ["'Mina', sans-serif", "'Rammetto One', cursive", "'Merriweather', serif"]

	sGet('data', (e)=>{
		console.log(e)
		if(e){
			$scope.d = e;
			$scope.$apply()
		}else{
			sSet()
		}

		// $scope.d = d(1/60)
		// $scope.swither = !e.terminated;
		// $scope.$apply()
		// $scope.switching = function(){
		// 	$scope.swither?$scope.do(1):$scope.do(3)
		// }
	})
	
    $scope.do = function(e=1, event){
    	if(e==11){
    		event.target.textContent = 'Saved!'
    		sSet()
    	}

		chrome.runtime.sendMessage({
			c: e,
			d: $scope.d
		})
    }





	function sGet(e, callback){
	    chrome.storage.local.get(e, function(items){
			if(typeof items[e] == 'undefined')
				items[e] = !1;
	        callback(items[e])
	    })
	}
	function sSet(){
	    chrome.storage.local.set({data: $scope.d})
	}
});