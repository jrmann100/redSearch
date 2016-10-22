var KentClasses;
var KCVersion = "v0.5.5";

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
		$('.results').append(
			`<div style="right: 2px; bottom: 2px; position: absolute; font-size: 9px;">
				<span>${KCVersion}</span>
				<i id="options" class="setting link icon"></i>
			</div>`);
		$("#options").click(function() {
			redirect(chrome.extension.getURL("options.html"));
		});
	};

	$("#scriptfail").css("display", "none");

	$(".ui.search").search({
		source: (function() {
			var output = [];
			for(var key in KentClasses)
				output.push({title: key})
			return output;
		})()
	});

	var errorVisible = false;

	$("#submit-class-selection").click(function() {
		classSelection = $("#class-selection").val();
		if(!(classSelection in KentClasses)){
			if (!errorVisible) {
				$("#search-error")
					.css("margin-top", "0")
					.css("visibility", "visible");
				errorVisible = true;
			}
			return;
		}
		redirect(
			KentClasses[classSelection].specialUrl ||
			"http://edlinesites.net/pages/Kent_Middle_School/Classes/" + KentClasses[classSelection].classCode);
	});

	$("#class-selection")
		.keyup(function(e) {
			if (e.which == 13) {
				$("#submit-class-selection").click();
			} else if (errorVisible) {
				$("#search-error")
					.css("margin-top", "-40px")
					.css("visibility", "hidden");
				errorVisible = false;
			}
		});

	$(".ks-help").click(function(e) {
		chrome.runtime.sendMessage({
			"type": "*KsResourceRequest*",
			"requestVar": "url"
		}, function(response) {
			redirect(response + "options.html");
		});
	});

	$("body").css("visibility", "visible");
});
