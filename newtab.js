//var mv = document.getElementById("most-visited");
//var xhr = new XMLHttpRequest();
//xhr.open("get", chrome.extension.getURL("newtab.html"));
//xhr.onreadystatechange = () => {
//	if (xhr.readyState == 4 && xhr.status == 200) {
//		mv.innerHTML = xhr.responseText;
//	}
//}
//xhr.send();


//var xml = new XMLHttpRequest();
//xml.open("GET", chrome.extension.getURL("popup.js"), false);
//xml.send(null);
//eval(xml.responseText); delete xml;

document.getElementById("most-visited").innerHTML = "<iframe style='width: 100%; background:rgba(255,255,255,0.5); height: 300px;' src=\"" + chrome.extension.getURL("newtab.html") + "\" frameborder=\"0\"></iframe>";