var myApp = angular.module('myApp',[]);
var booliPopupController = function ($scope) {
chrome.runtime.sendMessage(
	{message : "getExclusions"},
    function(exclusions) {
    	$scope.$apply(function(){
    		$scope.exclusions = exclusions;
    	})
    }
 );

chrome.runtime.onMessage.addListener(function(msg, sender, response) {
	if(msg === "getExclusions" && sender=== "exclude") {
		response($scope.exclusions);
	}
});

$scope.excludeClick = function(query) {
	$scope.exclusions[query] = query;

	chrome.runtime.sendMessage({
    message : "addExclusion",
	exclusion : query}
 );

}

$scope.removeExclusion = function(remove) {
	delete $scope.exclusions[remove];
	chrome.runtime.sendMessage({
    message : "removeExclusion",
	exclusion : remove}
 );
}	

};

