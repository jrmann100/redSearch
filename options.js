// returns {title: ..., body: ...} for our form
function getValuesFromForm(form) {
	return form.serializeArray().reduce(function(a, b) {
		a[b.name] = b.value;
		return a;
	}, {});
}

// displays the requested message for given duration in milliseconds
function displayMessage(msg, duration) {
	duration = duration || 500;
	$("#msg-ctr").fadeIn(duration).html(msg).delay(duration*5).fadeOut(duration);
}

$("#problem-report").submit(function(evt) {
	// don't reload the page
	evt.preventDefault();

	// validation
	var formData = getValuesFromForm($(this));
	if (formData.title.length == 0) {
		alert("You need to fill in the summary");
		return false;
	}

	// AJAX request to GitHub
	formData.labels = ["auto-submit"];
	$.ajax({
		url: "https://api.github.com/repos/jrmann100/kentSearch/issues",
		data: JSON.stringify(formData),
		type: "POST",
		headers: {
			"Authorization": "token f6219e1468cf6760a3139f645d9c210371ee1d4e"
		},
		success: function(data) {
			displayMessage(`Your issue has been submitted <a href="${data.url}">here</a>. All is well!`);
		},
		error: function(data) {
			var parsed = JSON.parse(data);
			console.table(parsed);
			displayMessage("There was a problem whilst submitting your issue. View console for more information.");
		}
	});
});
