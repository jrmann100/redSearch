// Launch when DOM is ready.
function whenDocumentIsReady(fn) {
if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

whenDocumentIsReady(function() {
    window.onsubmit = function(e) {
        // Just change these next two lines.
        var boxy = document.getElementById('theBox').value;
        window.open("http://www.edlinesites.net/pages/Kent_Middle_School/Classes/" + boxy);
        //Figure out a way to open webpage from popup...
        e.preventDefault();
    }

}
)
