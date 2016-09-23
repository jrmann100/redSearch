const kentClasses = {
  "5th Grade Band": "BAND5",
  "6th Grade Band": "BAND6",
  "6th Grade Chorus": "CHOR6",
  "Academic Workshop": "AWKS",
  "Advanced Band": "BANDA",
  "Advanced Choir": "CHORA",
  "Algebra 8": "ALGE8",
  "All Classes": "",
  "Architecture 8": "ARCH8",
  "Art 5, Art 6, Art 7, Art 8": "ART",
  "Coding 7": "CODE7",
  "Commencement Band": "BANDC",
  "Core 6 - Karlin": "CORE6-KAR",
  "Core 6 - Ms. Bridges": "CORE6-BRI",
  "Core 6 - Wells": "CORE6-WEL",
  "Drama 7": "DRAM7",
  "ELA/History Core 5 - Torrano": "ELAH5-TOR",
  "ELA/History Core 5 - Hagan": "ELAH5-HAG",
  "ELA/History Core 5 - Jelen": "ELAH5-JEL",
  "ELA/History Core 5 - Stephens": "ELAH5-STE",
  "English Language Development": "ELD",
  "Enterprise 7": "ENTR7",
  "Expressions 3D 7": "EX3D7",
  "Expressions 5": "EXPR5",
  "Expressions 6 - Goetz": "EXPR6-GOE",
  "Expressions 6 - Karlin": "EXPR6-KAR",
  "Expressions 6 - Osterman": "EXPR6-OST",
  "Expressions 6 - Wells": "EXPR6-WEL",
  "Expressions 8": "EXPR8",
  "Extended Math": "MATHX",
  "Extended Reading": "READX",
  "Film Making": "FILM78",
  "History 6 - Goetz": "HIST6-GOE",
  "History 7 - Mr. Palmer": "HIST7-PAL",
  "History 7 - Ms. Ward": "HIST7-WAR",
  "History 8 - Mr. Palmer": "HIST8-PAL",
  "History 8 - Ms. Ward": "HIST8-WAR",
  "Jazz Big Band": "BANDB",
  "Jazz Combo": "JAZZC",
  "Journalism 8": "JOUR8",
  "Kent Learning Center": "LRNC",
  "Kent Makers 6": "MAKR6",
  "Kent Makers 8": "MAKR8",
  "Language Arts 6 - Goetz": "ELA6-GOE",
  "Language Arts 7 - Maltzman": "ELA7-MAL",
  "Language Arts 7 - Moretti": "ELA7-MOR",
  "Language Arts 8 - Anderson": "ELA8-AND",
  "Language Arts 8 - Gavin": "ELA8-GAV",
  "Life Skills": "LIFE",
  "Math 7+ - Lentini": "PALG7",
  "Math/Science Core 5 - Bridgman": "MSCI5-BRI",
  "Math/Science Core 5 - Chusid": "MSCI5-CHU",
  "Math/Science Core 5 - Gallagher": "MSCI5-GAL",
  "Mathematics 6 - Klima": "MATH6-KLI",
  "Mathematics 6 - Lentini": "MATH6-LEN",
  "Mathematics 7 - Widelock": "MATH7-WID",
  "Mathematics 7- Klima": "MATH7-KLI",
  "Mathematics 8 - Hettleman": "MATH8-HET",
  "Mathematics 8 - Widelock": "MATH8-WID",
  "PE 5": "PE5",
  "PE 6": "PE6",
  "PE 7": "PE7",
  "PE 8": "PE8",
  "Poetry 8": "POET8",
  "Robotics 5": "ROBT5",
  "Rock Band": "ROCKB",
  "Science 6": "SCI6",
  "Science 7": "SCI7",
  "Science 8": "SCI8",
  "Spanish A": "SPANA",
  "Spanish B": "SPANB",
  "Woodworking 5": "WOOD5",
  "Woodworking 8": "WOOD8"
};


document.getElementById('aboutPage').onclick = function() {
  window.open("http://broaderator.com/projects/kentSearch/about.html");
};

modManager = {
	loaded_modules: [],
	selected_module: undefined,
	get_module_entry: function(name){
		for(var i of [].slice.call(document.getElementsByName("module_entry"))){
			if(i.getAttribute("data-module") === name){
				return i;
			}
		}
	},
	get_module_radio: function(name){
		for(var i of [].slice.call(document.getElementsByName("module_sel"))){
			if(i.getAttribute("value") === name){
				return i;
			}
		}
	},
	refreshHtml: function(){
		document.getElementById("SearchForm").innerHTML = '';
		this.loaded_modules.forEach(function(item, index){
			//Create elements.
			var element = document.createElement(item.html_elem_properties.tag ? 
			    item.html_elem_properties.tag : "input");
			Object.keys(item.html_elem_properties.attributes).forEach(function(i, index){
				element.setAttribute(i, item.html_elem_properties.attributes[i]);
			});
			element.setAttribute("name", "module_entry");
			element.setAttribute("data-module", item.name);
			element.style.display = 'none';
			document.getElementById("SearchForm").appendChild(element);
			if(item.html_elem_properties.innerHTML){
				item.html_elem_properties.innerHTML.forEach(function(atem, index){
					modManager.get_module_entry(item.name).appendChild(atem);
				});
			}
		});
		var submit_button = document.createElement("button");
		//submit_button.setAttribute("type", "submit");
		submit_button.id = 'SubmitButton';
		submit_button.innerHTML = "Go";
		//submit_button.setAttribute("onclick", "modManager.go_to();");
		document.getElementById("SearchForm").appendChild(submit_button);
		document.getElementById("SearchForm").appendChild(document.createElement("br"));
		this.loaded_modules.forEach(function(item, index){
			var radio_element = document.createElement("input");
			radio_element.setAttribute("type", "radio");
			radio_element.setAttribute("name", "module_sel");
			radio_element.setAttribute("value", item.name);
			//radio_element.setAttribute("onclick", "modManager.select(this.value);");
			document.getElementById("SearchForm").appendChild(radio_element);
			document.getElementById("SearchForm").innerHTML += " " + item.name;
			if(item.attributes.indexOf("no_newline") === -1){
				document.getElementById("SearchForm").appendChild(document.createElement("br"));
			}
		});
		(function() {
			//Outsider scope onclick
			document.getElementById("SubmitButton").onclick = function() {
				modManager.go_to();
			};
			[].slice.call(document.getElementsByName("module_sel")).forEach(function(item){
				item.onclick = function() {
					modManager.select(this.value);
				};
			});
		})();
	},
	get: function(name){
		for(var i of Object.keys(this.loaded_modules)){
			if(this.loaded_modules[i].name === name){
				return this.loaded_modules[i];
			}
		}
	},
	select: function(name) {
		if(!this.get(name)) return false;
		this.selected_module = this.get(name);
		this.refreshHtml();
		for(var i of [].slice.call(document.getElementsByName("module_sel"))){
			if(i.getAttribute("value") === name){
				i.setAttribute("checked", "checked");
			}
		}
		for(var a of [].slice.call(document.getElementsByName("module_entry"))){
			if(a.getAttribute("data-module") === name){
				a.style.display = 'inline';
			}
		}
	},
	load: function(mod){
		/*
		Module format:
		handle_submit (function(elem))
		name (string)
		attributes (array)
		html_elem_properties (object)
		properties format: {
			attributes: {
				type: (text, password)
				value: (str)
				placeholder: (...)
			},
			(optional) tag: ... (default: input),
			(optional) innerHTML: ... (default: [] (Expecting array of DOM elements))
		}
		*/
		for(var i of ["handle_submit", "name", "attributes", "html_elem_properties"]){
			if(Object.keys(mod).indexOf(i) === -1){
				console.log("Invalid module inserted (missing key " + i + ")");
				return false;
			}
		}
		
		if(this.get(mod.name)){
			console.log("Duplicate module inserted");
			return false;
		}
		
		//Module valid.
		
		this.loaded_modules.push(mod);
		this.select(mod.name);
		return true;
	},
	unload: function(name){
		if(this.get(name)){
			this.loaded_modules.pop(this.get(name)).name;
			if(this.loaded_modules.length === 0){
				this.refreshHtml();
			}else{
				this.select(this.loaded_modules[0].name);
			}
			return true;
		}else{
			console.log("Cannot unload module " + name + ", module not found");
			return false;
		}
	},
	
	go_to: function() {
		if(this.selected_module){
			this.selected_module.handle_submit(this.get_module_entry(this.selected_module.name));
		}
	}
};


// --- Standard Modules


var nameSel_Elements = [];
Object.keys(kentClasses).forEach(function(item, index){
	var elem = document.createElement("option");
	elem.innerHTML = item;
	elem.value = kentClasses[item];
	nameSel_Elements.push(elem);
});
modManager.load({
	name: "Name Selection",
	handle_submit: function(elem){
		window.open("http://edlinesites.net/pages/Kent_Middle_School/Classes/" + elem.value);
	},
	attributes: [],
	html_elem_properties: {
		attributes: {},
		tag: 'select',
		innerHTML: nameSel_Elements
	}
});

modManager.load({
	name: "ID Entry",
	handle_submit: function(elem){
		for(var i in kentClasses){
			if(elem.value.toUpperCase() === kentClasses[i]){
				window.open("http://edlinesites.net/pages/Kent_Middle_School/Classes/" + elem.value);
				return true;
			}
		}
		alert("That class cannot be found.");
	},
	attributes: [],
	html_elem_properties: {
		attributes: {
			placeholder: 'Class ID...',
			type: 'text'
		}
	}
});