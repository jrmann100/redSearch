try{
	document.getElementById("most-visited").innerHTML = "<iframe id='iframe' style='width: 672px; height: 500px; background:rgba(255,255,255,0);' src=\"" + chrome.extension.getURL("newtab.html") + "\" frameborder=\"0\"></iframe>";
}catch(e){}

window.addEventListener("message", function(origin){
	if(origin.data && origin.data['*KsRedirectionHref*']){
		window.location.href = origin.data['*KsRedirectionHref*'];
	}
});

