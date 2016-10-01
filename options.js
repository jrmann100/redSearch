"use strict";
class OptionCardManager {
	replaceVar(string, var_, val) {
		return string.replace(new RegExp(`#\\{${var_}\\}`, "g"), val);
	}

	replaceVars(string, object) {
		for (let varName in object) {
			string = this.replaceVar(string, varName, object[varName]);
		}
		return string;
	}

	constructor(div, verbose) {
		this.self = this;
		this.appendCounter = 0;
		this.container = div;
		this.declaredOptions = [];
		this.verbose = verbose ? function(str) { console.info(`OCM [verbose] -> ${str}`); } : function() {};

		if (this.container.children().length !== 3) {
			throw "Container needs to have 3 columns inside";
		}
		this._items = [];
		/*this._htmlTemplate = {
			"toggle": "<div class=\"ui toggle checkbox ocm-element ocm-type--toggle\" id=\"#{inputId}\"><input type=\"checkbox\"><label/></div>",
			"integer": "<input class=\"ocm-element ocm-type--integer\" type=\"text\" id=\"#{inputId}\" placeholder=\"Integer only\">",
			"string": "<input class=\"ocm-element ocm-type--string\" type=\"text\" id=\"#{inputId}\" placeholder=\"#{placeholder}\">",
			"numberRange": "<input class=\"ocm-element ocm-type--numberRange\" type=\"text\" id=\"#{inputId}\" placeholder=\"Number between #{rangeMin} and #{rangeMax}\">",
			"dropdown": "<div class=\"ui selection\"><input class=\"ocm-element ocm-type--dropdown\" type=\"hidden\" id=\"#{inputId}\"><i class=\"dropdown icon\"></i><div class=\"default text\">#{placeholder}</div><div class=\"menu\">#{dropdownOptionsDivs}</div></div>"
		};*/

		this.cardTemplate = `<div class="ui card fluid"><div class="content"><div class="header">#{cardHeader}</div><div class="meta">#{cardType}</div><div class="ui description field form">#{editForm}</div></div></div>`;
		this.elementTools = {
			"toggle": {
				"template": `<div class="ui toggle checkbox ocm-element ocm-type--toggle" id="#{inputId}"><input type="checkbox"><label/></div>`,
				"generate": function(data, template) {
					return template;
				},
				"get": function(name) {
					return $(`#ocm-option--${name}`).checkbox("is checked");
				},
				"set": function(name, val) {
					$(`#ocm-option--${name}`).checkbox("set checked", val);
				},
				"primitiveType": "boolean"
			},
			"string": {
				"template": `<input class="ocm-element ocm-type--string" type="text" id="#{inputId}">`,
				"generate": function(data, template) {
					return template;
				},
				"get": function(name) {
					return $(`#ocm-option--${name}`)[0].value;
				},
				"set": function(name, val) {
					$(`#ocm-option--${name}`).value = val;
				},
				"primitiveType": "string"
			}
		};
		chrome.storage.sync.get({"values":{}}, (function(v) {
			this.options = v.values;
		}).bind(this));
	}


	appendHtml(html) {
		$(this.container.children()[this.appendCounter]).append(html);
		this.appendCounter = (this.appendCounter + 1) % 3;
	}

	appendCard(options) {
		// options: {"displayValue": "this is a toggle :)", "internalValue": "tagRandom", "type":"toggle"/"integer"/"string"/"numberRange"/"dropdown"(requires dropdownOptions), [dropdownOptions], [numberRange]}
		if (options.type in this.elementTools) {
			if (options.internalValue in this.declaredOptions){
				throw `InternalValue ${options.internalValue} already declared`;
			}
			this.verbose(`appendCard working with attr cardTemplate -> ${this.cardTemplate}`)
			let outputHtml = this.replaceVars(this.cardTemplate, {
				"cardHeader": options.displayValue,
				"cardType": options.type,
				"editForm": this.elementTools[options.type].generate(options, this.elementTools[options.type].template),
				"inputId": `ocm-option--${options.internalValue}`
			});
			this.verbose(`appendCard html output: ${outputHtml}`);
			this.appendHtml(outputHtml);
			$(`#ocm-option--${options.internalValue}`).ready((function() {
				this.elementTools[options.type].set(options.internalValue, this.options[options.internalValue]);
			}).bind(this));
			this.declaredOptions.push(options.internalValue);
			return;
		}
		throw "Options not supported: " + options;
	}

	appendCards() {
		chrome.storage.sync.get("display", (function(data) {
			for (let option of data.display) {
				this.appendCard(option);
			}
		}).bind(this));
	}

	flushOptions() {
		for (let elementTool in this.elementTools) {
			$(".ocm-element.ocm-type--" + elementTool).each((function(_, elem) {
				this.options[elem.getAttribute("id").substr(12)] = this.elementTools[elementTool].get(elem.getAttribute("id").substr(12));
			}).bind(this))
		}
		chrome.storage.sync.set({"values":this.options}, console.error);
	}
}
const ocm = new OptionCardManager($("#card-container"));
ocm.appendCards();
ocm.container.removeClass("loading");