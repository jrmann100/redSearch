// Complimentary copy of outdated classes in case of Internet outage
var KentClasses = {"5th Grade Band":{"classCode":"BAND5"},"6th Grade Band":{"classCode":"BAND6"},"6th Grade Chorus":{"classCode":"CHOR6"},"Academic Workshop":{"classCode":"AWKS"},"Advanced Band":{"classCode":"BANDA"},"Advanced Choir":{"classCode":"CHORA"},"Algebra 8":{"classCode":"ALGE8"},"All Classes":{"classCode":""},"Architecture 8":{"classCode":"ARCH8"},"Art 5, Art 6, Art 7, Art 8":{"classCode":"ART"},"Coding 7":{"classCode":"CODE7"},"Commencement Band":{"classCode":"BANDC"},"Core 6 - Karlin":{"classCode":"CORE6-KAR"},"Core 6 - Ms. Bridges":{"classCode":"CORE6-BRI"},"Core 6 - Wells":{"classCode":"CORE6-WEL"},"Drama 7":{"classCode":"DRAM7"},"ELA/History Core 5 - Hagan":{"classCode":"ELAH5-HAG"},"ELA/History Core 5 - Stephens":{"classCode":"ELAH5-STE"},"English Language Development":{"classCode":"ELD"},"Enterprise 7":{"classCode":"ENTR7"},"Expressions 3D 7":{"classCode":"EX3D7"},"Expressions 5":{"classCode":"EXPR5"},"Expressions 6 - Goetz":{"classCode":"EXPR6-GOE"},"Expressions 6 - Karlin":{"classCode":"EXPR6-KAR"},"Expressions 6 - Osterman":{"classCode":"EXPR6-OST"},"Expressions 6 - Wells":{"classCode":"EXPR6-WEL"},"Expressions 8":{"classCode":"EXPR8"},"Extended Math":{"classCode":"MATHX"},"Extended Reading":{"classCode":"READX"},"Film Making":{"classCode":"FILM78"},"History 6 - Goetz":{"classCode":"HIST6-GOE"},"History 8 - Mr. Palmer":{"classCode":"HIST8-PAL","specialUrl":"https://sites.google.com/a/kentfieldschools.org/palmer-ush/home"},"Jazz Big Band":{"classCode":"BANDB"},"Jazz Combo":{"classCode":"JAZZC"},"Journalism 8":{"classCode":"JOUR8"},"Kent Learning Center":{"classCode":"LRNC"},"Kent Makers 6":{"classCode":"MAKR6"},"Kent Makers 8":{"classCode":"MAKR8"},"Language Arts 6 - Goetz":{"classCode":"ELA6-GOE"},"Language Arts 7 - Maltzman":{"classCode":"ELA7-MAL"},"Language Arts 7 - Moretti":{"classCode":"ELA7-MOR"},"Language Arts 8 - Anderson":{"classCode":"ELA8-AND","specialUrl":"https://classroom.google.com/u/1/c/MjExMzYxMzQ0MFpa"},"Language Arts 8 - Gavin":{"classCode":"ELA8-GAV"},"Life Skills":{"classCode":"LIFE"},"Math 7+ - Lentini":{"classCode":"PALG7"},"Math/Science Core 5 - Bridgman":{"classCode":"MSCI5-BRI"},"Math/Science Core 5 - Chusid":{"classCode":"MSCI5-CHU"},"Math/Science Core 5 - Gallagher":{"classCode":"MSCI5-GAL"},"Mathematics 6 - Klima":{"classCode":"MATH6-KLI"},"Mathematics 6 - Lentini":{"classCode":"MATH6-LEN"},"Mathematics 7 - Widelock":{"classCode":"MATH7-WID"},"Mathematics 7 - Klima":{"classCode":"MATH7-KLI"},"Mathematics 8 - Hettleman":{"classCode":"MATH8-HET"},"Mathematics 8 - Widelock":{"classCode":"MATH8-WID"},"PE 5":{"classCode":"PE5"},"PE 6":{"classCode":"PE6"},"PE 7":{"classCode":"PE7"},"PE 8":{"classCode":"PE8"},"Poetry 8":{"classCode":"POET8"},"Robotics 5":{"classCode":"ROBT5"},"Rock Band":{"classCode":"ROCKB"},"Science 6":{"classCode":"SCI6"},"Science 7":{"classCode":"SCI7"},"Science 8":{"classCode":"SCI8","specialUrl":"https://classroom.google.com/u/1/c/MTk0MTM5NjYzM1pa"},"Spanish A":{"classCode":"SPANA","specialUrl":"https://sites.google.com/a/kentfieldschools.org/mrs-roubinian-spanish/"},"Spanish B":{"classCode":"SPANB","specialUrl":"https://sites.google.com/a/kentfieldschools.org/ncalmels/"},"Woodworking 5":{"classCode":"WOOD5"},"Woodworking 8":{"classCode":"WOOD8"}};

function fetchClasses() {
	var ajax = new XMLHttpRequest();
	ajax.onabort = function() {
		console.warn('Unable to retrieve classes from remote server, using fallback instead');
	}
	ajax.onerror = ajax.onabort;
	ajax.onload = function() {
		try {
			KentClasses = JSON.parse(this.responseText);
		} catch (jsonException) {
			console.warn("Couldn't parse data from remote server, using fallback instead");
		}
	};
	ajax.open("GET", "http://broaderator.com/projects/kentSearch/classes.json");
	ajax.send();
}

fetchClasses();
setInterval(fetchClasses, 1000 * 60 * 30);

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

const OmniBoxSuggestion = "Try returning your class name or class ID. Don't remember? Return for a directory.";

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
