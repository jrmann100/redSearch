var OptionCardManager = function(div) {
	this.self = this;
	this.container = div;
	this._items = [];
	this.htmlTemplate = {
		"toggle": "<div class=\"inline field\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" tabindex=\"0\" class=\"hidden\" id=\"#{inputId}\"><label>#{label}</label></div></div>",
		"integer": "<div class=\"field\"><label>#{label}</label><input type=\"text\" id=\"#{inputId}\" placeholder=\"Integer only\"></div>",
		"string": "<div class=\"field\"><label>#{label}</label><input type=\"text\" id=\"#{inputId}\" placeholder=\"#{placeholder}\"></div>",
		"numberRange": "<div class=\"field\"><label>#{label}</label><input type=\"text\" id=\"#{inputId}\" placeholder=\"Number between #{rangeMin} and #{rangeMax}\"></div>",
		"dropdown": "<div class=\"field\"><label>#{label}</label><div class=\"ui selection dropdownOptions\"><input type=\"hidden\" id=\"#{inputId}\"><i class=\"dropdown icon\"></i><div class=\"default text\">#{placeholder}</div><div class=\"menu\">#{dropdownOptionsDivs}</div></div></div>"
	};
	
	this.replaceVar = function(string, var_, val) {
		return string.replace(new RegExp(`#\\{${var_}\\}`, "g"), val);
	};

	this.replaceVars = function(string, object) {
		for (let varName in object) {
			string = this.replaceVar(varName, object[varName]);
		}
		return string;
	}

	this.generateToken = function() {

	};

	chrome.storage.sync.get("values", (function(self){
		return function(val) {
			self.valueBuffer = val;
		}
	})(this));
	chrome.storage.sync.get("display", (function(self){
		return function(val) {
			self.displayAttributeBuffer = val;
		}
	})(this));

	this.htmlGenerator = {
		"toggle": function(data, template) {
			return this.replaceVars(template, {
				"inputId": `ocm-option:${data.internalValue}`, 
				"label": data.displayValue}
			);
		}
	};

	this.appendCard = function(options) {
		// options: {"displayValue": "this is a toggle :)", "intervalValue": "tagRandom", "type":"toggle"/"integer"/"string"/"numberRange"/"dropdown"(requires dropdownOptions), [dropdownOptions], [numberRange]}
		if (options.type in this.htmlGenerator) {
			let elementHtml = this.htmlGenerator[options.type](options, htmlTemplate[options.type]);
		} else {
			throw "Options not supported: " + options;
		}
	};
}