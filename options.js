var OptionCardManager = function(div) {
	this.self = this;
	this.container = div;
	this._items = [];
	this.htmlTemplate = {
		"toggle": "<div class=\"inline field\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" tabindex=\"0\" class=\"hidden\" id=\"input\"><label>#{label}</label></div></div>"
	}
	this.appendCard = function(options) {
		// options: {"displayValue": "this is a toggle :)", "intervalValue": "togRandom", "type":"toggle"/"integer"/"string"/"numberRange"/"dropdown"(requires dropdownOptions), [dropdownOptions], [numberRange]}
		// todo
	}
}