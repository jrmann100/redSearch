const kentClasses = {
  "5th Grade Band": "BAND5",
  "6th Grade Band": "BAND6",
  "6th Grade Chorus": "CHOR6",
  "Academic Workshop": "AWKS",
  "Advanced Band": "BANDA",
  "Advanced Choir": "CHORA",
  "Algebra 8": "ALGE8",
  "All Classes": "",
  "Architecture 8": "ARCH8",
  "Art 5, Art 6, Art 7, Art 8": "ART",
  "Coding 7": "CODE7",
  "Commencement Band": "BANDC",
  "Core 6 - Karlin": "CORE6-KAR",
  "Core 6 - Ms. Bridges": "CORE6-BRI",
  "Core 6 - Wells": "CORE6-WEL",
  "Drama 7": "DRAM7",
  "ELA/History Core 5 - Torrano": "ELAH5-TOR",
  "ELA/History Core 5 - Hagan": "ELAH5-HAG",
  "ELA/History Core 5 - Jelen": "ELAH5-JEL",
  "ELA/History Core 5 - Stephens": "ELAH5-STE",
  "English Language Development": "ELD",
  "Enterprise 7": "ENTR7",
  "Expressions 3D 7": "EX3D7",
  "Expressions 5": "EXPR5",
  "Expressions 6 - Goetz": "EXPR6-GOE",
  "Expressions 6 - Karlin": "EXPR6-KAR",
  "Expressions 6 - Osterman": "EXPR6-OST",
  "Expressions 6 - Wells": "EXPR6-WEL",
  "Expressions 8": "EXPR8",
  "Extended Math": "MATHX",
  "Extended Reading": "READX",
  "Film Making": "FILM78",
  "History 6 - Goetz": "HIST6-GOE",
  "History 7 - Mr. Palmer": "HIST7-PAL",
  "History 7 - Ms. Ward": "HIST7-WAR",
  "History 8 - Mr. Palmer": "HIST8-PAL",
  "History 8 - Ms. Ward": "HIST8-WAR",
  "Jazz Big Band": "BANDB",
  "Jazz Combo": "JAZZC",
  "Journalism 8": "JOUR8",
  "Kent Learning Center": "LRNC",
  "Kent Makers 6": "MAKR6",
  "Kent Makers 8": "MAKR8",
  "Language Arts 6 - Goetz": "ELA6-GOE",
  "Language Arts 7 - Maltzman": "ELA7-MAL",
  "Language Arts 7 - Moretti": "ELA7-MOR",
  "Language Arts 8 - Anderson": "ELA8-AND",
  "Language Arts 8 - Gavin": "ELA8-GAV",
  "Life Skills": "LIFE",
  "Math 7+ - Lentini": "PALG7",
  "Math/Science Core 5 - Bridgman": "MSCI5-BRI",
  "Math/Science Core 5 - Chusid": "MSCI5-CHU",
  "Math/Science Core 5 - Gallagher": "MSCI5-GAL",
  "Mathematics 6 - Klima": "MATH6-KLI",
  "Mathematics 6 - Lentini": "MATH6-LEN",
  "Mathematics 7 - Widelock": "MATH7-WID",
  "Mathematics 7 - Klima": "MATH7-KLI",
  "Mathematics 8 - Hettleman": "MATH8-HET",
  "Mathematics 8 - Widelock": "MATH8-WID",
  "PE 5": "PE5",
  "PE 6": "PE6",
  "PE 7": "PE7",
  "PE 8": "PE8",
  "Poetry 8": "POET8",
  "Robotics 5": "ROBT5",
  "Rock Band": "ROCKB",
  "Science 6": "SCI6",
  "Science 7": "SCI7",
  "Science 8": "SCI8",
  "Spanish A": "SPANA",
  "Spanish B": "SPANB",
  "Woodworking 5": "WOOD5",
  "Woodworking 8": "WOOD8"
};

// This JS file is shared between newtab.html and popup.html.
// id="submit-class-selection" for Search button
// id="class-selection" for input element
// id="ks-shared-resource-identity" and this="newtab/popup" for span to invisibilize by this script; put "script failed to load" in the span.
// id="options" for options link (icon button)
// id="about" for about link (icon button)
// class="back-to-main" for back to main searching tab
// MultiTab should have tabs with names main, options, and about
// id="search-error" for error bar (class undefined, try again!)

$("#ks-shared-resource-identity").css("display", "none");
$("#search-error").css("display", "none");
$(".ui.search").search({
	source: (function() {
		var output = [];
		for(var key in kentClasses)
			output.push({title: key})
		return output;
	})()
});

MultiTab = function(mtElem) {
	this.self = this;
	this.elem = mtElem;
	for(var tab of mtElem.children()) {
		$(tab).css("display", $(tab).attr("default") === "" ? "block" : "none");
	}
	this.select = function(tabName) {
		for(var tab of this.elem.children()) {
			$(tab).css("display", $(tab).attr("tab-name") === tabName ? "block" : "none");
		}
	}
}

mainMt = new MultiTab($("multi-tab"));
$("#options").click(function() {
	mainMt.select("options");
});
$("#about").click(function() {
	mainMt.select("about");
});
$(".back-to-main").click(function() {
	mainMt.select("main");
});
$("#submit-class-selection").click(function() {
	classSelection = $("#class-selection").val();
	if(!(classSelection in kentClasses)){
		$("#search-error").css("display", "block");
		return;
	}
	parent.window.postMessage({
		"*KsRedirectionHref*": "http://edlinesites.net/pages/Kent_Middle_School/Classes/" + kentClasses[classSelection]
	}, "*");
});
