var exclusions;
var exclusionString;
// Send a message to the background with the callback

function removeExclusions(exclusions) {
	var query = '[class*=areaCell]';
	var deleted = false;
    var elems = document.querySelectorAll(query);
      var i;
      var j;
      for(i = 0; i < elems.length; i++){
      	var str = elems[i].innerHTML.toLowerCase();
      	var j;
      	for(j = 0; j < exclusions.length; j++)
  	    if((str.indexOf(exclusions[j]) !== -1) && exclusions[j].trim() !== "" ) {
      		var parent = elems[i];
        	for(var j = 0; j < 3 ; j++){
            	parent = parent.parentNode;
        	}
	        if(parent.parentNode !== null) {
	        	parent.parentNode.removeChild(parent);	
	        }
      	}
    }
}

	var query = '[id*=extendedRefine]';
    var elems = document.querySelectorAll(query);
    var newElem = document.createElement('div');
    newElem.className="listings col1";
    newElem.innerHTML = "<strong>Excludera områden:</strong> <input type='text' id='extensionInput'></input>";
    elems[0].appendChild(newElem);


	var query = '[class*=showHits]';
    var elems = document.querySelectorAll(query);
    var query = '[id*=extensionInput]';
   	var inputElem = document.querySelectorAll(query);
    elems[0].onclick = function() {
    	exclusionString = inputElem[0].value;
    	var partsOfStr = exclusionString.split(',');
    	var i;
    	for(i = 0; i< partsOfStr.length ; i++) {
    		partsOfStr[i] = partsOfStr[i].trim();
    	}
    	chrome.runtime.sendMessage({
   		message : "setExclusion",
		exclusion : partsOfStr}
		);
		removeExclusions(partsOfStr);
    };
    
	
 chrome.runtime.sendMessage(
	{message : "getExclusions"},
    function(respondedExclusions) {
    	removeExclusions(respondedExclusions);
  }
 );
// in the callback go through the DOM and remove all objects that should be removed.
