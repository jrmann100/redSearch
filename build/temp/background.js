//Get Classes. Source: http://youmightnotneedjquery.com/
var request = new XMLHttpRequest();
request.open('GET', 'classes.json', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
     KentClasses = (JSON.parse(request.responseText));
  } else {
    // We reached our target server, but it returned an error

  }
};
request.onerror = function() {
  // There was a connection error of some sort
};

request.send();

// if the sender is trying to retrieve KentSearch global data, send it to them
chrome.runtime.onMessage.addListener(function(req, sender, respond) {
	if (req.type = "*KsResourceRequest*") {
		// switch has better expandability than if...else
		switch (req.requestVar) {
			case "classes":
				respond(KentClasses);
				break;
			case "url":
				respond(chrome.extension.getURL(""))
				break;
		}
	}
});

const OmniBoxSuggestion = "Try returning your class ID. Don't remember? Enter \"DIRECTORY\" for a directory.";

function resetDefaultSuggestion() {
	chrome.omnibox.setDefaultSuggestion({
		description: OmniBoxSuggestion
	});
}

resetDefaultSuggestion();

chrome.omnibox.onInputChanged.addListener(resetDefaultSuggestion);
chrome.omnibox.onInputCancelled.addListener(resetDefaultSuggestion);

function navigate(url) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.update(tabs[0].id, {url: url});
	});
}

function isValidClassCode(ccode) {
	for (var key in KentClasses) {
		if (KentClasses[key].classCode === ccode) {
			return KentClasses[key].specialUrl || true;
		}
	}
	return false;
}

const EdlinePrefix = "http://www.edlinesites.net/pages/Kent_Middle_School/Classes/";
var currentSpecialUrl;

chrome.omnibox.onInputEntered.addListener(function(text) {
	if (currentSpecialUrl = isValidClassCode(text.toUpperCase())){
		navigate((typeof currentSpecialUrl == "string") ?
			currentSpecialUrl :
			EdlinePrefix + text);
	} else if (text in KentClasses) {
		navigate(KentClasses[text].specialUrl || EdlinePrefix + KentClasses[text].classCode);
	} else {
		alert(`Class ${text} does not exist. Try again!`);
	}
});
