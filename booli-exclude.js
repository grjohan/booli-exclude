// Remove hits that match any exclusions
function removeExclusions(exclusions) {
	var query = '[class*=areaCell]';
    var elems = document.querySelectorAll(query);
      var i,j;
      for(i = 0; i < elems.length; i++){
      	var str = elems[i].innerHTML.toLowerCase();
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

// Get the parent for the exclusion element
var query = '[id*=refineBox]';
var elems = document.querySelectorAll(query);
var inputElem = addInputChild(elems[0]);
// If there are already exclusions in local storage, exclude them
var tempExclusionString = localStorage["booli.exclusions"];
if(tempExclusionString !== undefined){
    var i;
    var partsOfStr = tempExclusionString.split(',');
    for(i = 0; i< partsOfStr.length ; i++) {
      partsOfStr[i] = partsOfStr[i].trim();
      removeExclusions(partsOfStr);
    }
} 

// Add onclick to the button
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

// add the inputElement and text
function addInputChild(parent){
  var newElem = document.createElement('div');
  newElem.className="col1";
  newElem.innerHTML = "<strong>Excludera områden:</strong>";
  parent.appendChild(newElem);
  var childElement = document.createElement('input');
  newElem.appendChild(childElement);
  childElement.type="text";
  childElement.name="exclusions";
  childElement.className="autocomplete";
  childElement.placeholder = "Exclusions";
  return childElement;
}    

