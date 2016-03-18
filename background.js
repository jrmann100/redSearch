function resetDefaultSuggestion() {
  chrome.omnibox.setDefaultSuggestion({
      description: "Try returning your class ID. Don't remember? Enter a backslash for a directory."
  });
}

resetDefaultSuggestion();

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
"Try returning your class ID. Don't remember? Enter a backslash for a directory."
});

chrome.omnibox.onInputCancelled.addListener(function() {
  resetDefaultSuggestion();
});

function navigate(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
  });
}

chrome.omnibox.onInputEntered.addListener(function(text) {
  navigate("http://www.edlinesites.net/pages/Kent_Middle_School/Classes/" + text);
});

