# RedSearch
###…a KentSearch fork.
**Current version: v0.7.1**

To get the libraries for this repository, visit [here](http://broaderator.com/private/kentsearch-lib.zip).

### Testing instructions

* `git clone` this repository
* Download the libraries from the hyperlink above
* Extract the contents of the downloaded .zip into the cloned directory
* Go to `chrome://extensions` on your Chrome, enable _Developer Mode_ if necessary, and _Load unpacked extension..._ from the cloned directory OR drag cloned directory onto chrome://extensions
* Testing subjects:
	* new tab and popup
		* conventional classes without `specialUrl`
		* special classes with `specialUrl` _(Spanish, for example)_
		* nonexistent class name/code
	* omnibox
		* name and code of conventional classes
		* name and code of special classes
		* nonexistent class name/code
