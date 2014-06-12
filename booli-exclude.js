var exclusions;
// Send a message to the background with the callback
chrome.runtime.sendMessage(
	{message : "getExclusions"},
    function(respondedExclusions) {
    	removeExclusions(respondedExclusions)
  }
 );

function removeExclusions(exclusions) {
	var query = '[class*=areaCell]';
	var deleted = false;
    var elems = document.querySelectorAll(query);
      var i;
      for(i = 0; i < elems.length; i++){
      	var str = elems[i].innerHTML.toLowerCase();
      	var j;
      	for(var exclusion in exclusions)
  	    if(str.indexOf(exclusions[exclusion]) !== -1) {
      		var parent = elems[i];
        	for(var j = 0; j < 3 ; j++){
            	parent = parent.parentNode;
        	}
	        if(parent.parentNode !== null) {
	        	parent.parentNode.removeChild(parent);	
	        }
      	}
    }
    // look at the innerHTML
	// search for class areaCell
	//go through them looking for an exclusion
	//remove it
}
// in the callback go through the DOM and remove all objects that should be removed.
