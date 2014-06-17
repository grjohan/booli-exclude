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
	var query = '[id*=refineBox]';
    var elems = document.querySelectorAll(query);
    var newElem = document.createElement('div');
    newElem.className="col1";
    newElem.innerHTML = "<strong>Excludera områden:</strong>";
    elems[0].appendChild(newElem);
    var inputElem = document.createElement('input');
    inputElem.type="text";
    inputElem.name="exclusions";
    inputElem.className="autocomplete";
    var tempExclusionString = localStorage["booli.exclusions"];
    if(tempExclusionString !== undefined){
        var i;
        var partsOfStr = tempExclusionString.split(',');
        for(i = 0; i< partsOfStr.length ; i++) {
        partsOfStr[i] = partsOfStr[i].trim();
        removeExclusions(partsOfStr);
      }
    }
    newElem.appendChild(inputElem);


	var query = '[class*=showHits]';
    var elems = document.querySelectorAll(query);
    elems[0].onclick = function() {
    	exclusionString = inputElem.value;
      localStorage["booli.exclusions"] = exclusionString; 
    	var partsOfStr = exclusionString.split(',');
    	var i;
    	for(i = 0; i< partsOfStr.length ; i++) {
    		partsOfStr[i] = partsOfStr[i].trim();
    	}
		removeExclusions(partsOfStr);
    };
    
 var query = '[class*=toggleRefine]';
 var elems = document.querySelectorAll(query);

