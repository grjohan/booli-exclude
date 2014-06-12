var exclusions = [];
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
	if(msg.message === "getExclusions") {
		response(exclusions);
	}
	else if( msg.message ==="setExclusion") {
		exclusions = msg.exclusion;
		response(exclusions);
		
	}
});