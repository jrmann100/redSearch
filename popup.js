var KentClasses;

// retrieve the classes
chrome.runtime.sendMessage({
	"type": "*KsResourceRequest*",
	"requestVar": "classes"
}, function(response) {
	KentClasses = response;

	// This JS file is shared between newtab.html and popup.html.
	// id="submit-class-selection" for Search button
	// id="class-selection" for input element
	// id="search-error" for error bar (class undefined, try again!)

	function redirect(newHTML) {
		window.top !== window.self ? 
			parent.window.postMessage({"*KsRedirectionHref*": newHTML}, "*") :
			chrome.tabs.create({url: newHTML});
	}

	$(".ui.search").search.settings.onSearchQuery = function(){
		$('.results').append("<div style=\"right: 2px; bottom: 2px; position: absolute; font-size: 9px;\"><span>v0.4</span><i id=\"options\" class=\"setting link icon\"></i></div>");
		$("#options").click(function() {
			redirect(chrome.extension.getURL("options.html"));
		});
	};

	$("#scriptfail").css("display", "none");
	$("#search-error").css("display", "none");

	$(".ui.search").search({
		source: (function() {
			var output = [];
			for(var key in KentClasses)
				output.push({title: key})
			return output;
		})()
	});

	$('.results').append("<div style=\"right: 0; bottom: 0; position: absolute;\">v0.4</div>")

	$("#submit-class-selection").click(function() {
		classSelection = $("#class-selection").val();
		if(!(classSelection in KentClasses)){
			$("#search-error").css("display", "block");
			return;
		}
		redirect(KentClasses[classSelection].startsWith("http") ? 
			KentClasses[classSelection] :
			"http://edlinesites.net/pages/Kent_Middle_School/Classes/" + KentClasses[classSelection]);
	});

	$("#class-selection").keypress(function(e) {
		if (e.which == 13) $("#submit-class-selection").click();
	});

	$("body").css("visibility", "visible");
});
