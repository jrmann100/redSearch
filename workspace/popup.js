var KentClasses;
var KCVersion = "v0.7";

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

  var errorVisible = false;
  var errorElement = $("#search-error");

  function highlightError() {
    if (errorVisible) {
      errorElement.css("transform", "scale(1.1)");
      setTimeout(function() {
        errorElement.css("transform", "initial");
      }, 150);
    } else {
      errorElement
        .css("margin-top", "0")
        .css("visibility", "visible");
      errorVisible = true;
    }
  }

  function hideError() {
    if (errorVisible) {
      errorElement
        .css("margin-top", "-36px")
        .css("visibility", "hidden");
      errorVisible = false;
    }
  }

  /*
   * ## Class code / name acquisition documentation
   * 
   * For search box resolution, use `getClassByQuery()`. For now, that function provides name matching and class code matching as resolution methods. More may be added in the future.
   * 
   * For Semantic-UI `.search` data, use `getAutocompleteTags()`. This function fully conforms to Semantic-UI APIs.
   */


   /**
    * Tries to retrieve a Kent class using the capture provided, usually straight from the search box.
    *
    * Methods implemented at the moment:
    *  - Case-insensitive class name matching ("Drama 7", for example)
    *  - Case-insensitive class code matching ("DRAM7", for example)
    * 
    * @param {string} capture Capture for class query, usually straight from the search box.
    * @returns The class name of the matching class, or `null` if such class doesn't exist.
    */
   function getClassByQuery(capture) {

     for (var className in KentClasses) {
       // Method 1: case-insensitive name matching
       if (capture.trim().toLowerCase() === className.toLowerCase()) {
         return className;
       }

       // Method 2: case-insensitive class code matching
       if (capture.trim().toUpperCase() === KentClasses[className].classCode) {
         return className;
       }
     }

     return null;
   }

   /**
    * Composes information from all stored Kent classes in a way that's compatible with the Semantic-UI autocomplete API.
    * 
    * @returns the tag object, ready to be fed into Semantic-UI's `search` function.
    */
   function getAutocompleteTags() {
     var output = [];
     for (var key in KentClasses) {
       output.push({
         title: key,
         description: KentClasses[key].classCode
       });
     }
     return output;
   }

   $(".ui.search").search({
     source: getAutocompleteTags()
   });

  $("#submit-class-selection").click(function() {
    var className = getClassByQuery($("#class-selection").val());

    if (className === null) {
      highlightError();
      return;
    }

    redirect(
      KentClasses[className].specialUrl ||
      "http://edlinesites.net/pages/Kent_Middle_School/Classes/" + KentClasses[className].classCode);
  });

  $("#class-selection")
    .keyup(function(e) {
      if (e.which === 13) {
        $("#submit-class-selection").click();
      } else {
        hideError();
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
