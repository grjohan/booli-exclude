var exclusions = {};
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
	if(msg.message === "getExclusions") {
		response(exclusions);
	}
	else if( msg.message ==="addExclusion") {
		exclusions[msg.exclusion] = msg.exclusion; 
	}
	else if( msg.message ==="removeExclusion") {
		delete exclusions[msg.exclusion];
	}
});