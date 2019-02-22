
// var len = (document.getElementsByClassName('shortcutsContainer')).length;
// console.log(len);



var names = [];
chrome.storage.local.get('names', function(result) {
		names = result;
		console.log(names);
		setupOptions();
	});

function setupOptions() {
	// console.log(names);
	// var parent = document.getElementById("root_list");
	// var shortcutsContainerDIV = document.createElement("div");
	// shortcutsContainerDIV.setAttribute("class", "shortcutsContainer");

	// var titleDIV = document.createElement("div");
	// titleDIV.setAttribute("class", "shortcutsContainer");
	// var pDIV = document.createElement("div");
	// pDIV.setAttribute("class", "title");
	// var p = document.createElement("p");
	// var content;

	// var keyDIV = document.createElement("div");
	// keyDIV.setAttribute("class", "key");
	// var input = document.createElement("input");
	// input.setAttribute("type", "text");
	// input.setAttribute("maxlength", "1");
	// input.setAttribute("autocomplete", "off");
	// var objArray = new Array(names.names.length);
	// console.log(names.names.length);
	// console.log(names.names);
	for(var i = 0; i < names.names.length; i++) {
		// objArray[i] = new htmlElement(names.names[i][0], names.names[i][1]);
		// console.log("i");
		// console.log(objArray[i]);
		var title = names.names[i][0];
		var key = names.names[i][1];
		var html1 = "<div id=" + title +" class=shortcutsContainer><div class=title><p>" + title + "</p></div><div class=key><input type=\"text\" maxlength=\"1\" autocomplete=\"off\" value = " + key + "></div></div>";
		//var html1 = "<div id=sketch class=shortcutsContainer><div class=title><p>Sketch</p></div><div class=key><input type=\"text\" maxlength=\"1\" autocomplete=\"off\"></div></div>";
		document.getElementById("root_list").innerHTML += html1;
		
		//var i=0;
		// console.log(names.names);
		// shortcutsContainerDIV.setAttribute("id", names.names[i][0]);
		// titleDIV.setAttribute("class", "title");
		// p.appendChild(document.createTextNode(names.names[i][0]));
		// input.setAttribute("value", names.names[i][1]);

		// titleDIV.appendChild(p);
		// keyDIV.appendChild(input);
		// shortcutsContainerDIV.appendChild(titleDIV);
		// shortcutsContainerDIV.appendChild(keyDIV);
		// document.body.appendChild(shortcutsContainerDIV);
	}
	(document.getElementById('save')).addEventListener('click', save_options);
}

function save_options() {
	console.log("ok");
	var list = names.names;
	for(var i = 0; i < list.length; i++) {
		var change = document.getElementsByTagName("input")
		list[i][1] = change[i].value;
		//console.log(list[i][1]);
	}
	chrome.storage.local.set({'names': list});
}
// class htmlElement {

// 	constructor(title, key) {
// 		this.title = title;
// 		this.key = key;
// 		var shortcutsContainerDIV = document.createElement("div");
// 		var html1 = "";
// 	}

// 	setup() {
		/*
		var parent = document.getElementById("root_list");
		
		shortcutsContainerDIV.setAttribute("class", "shortcutsContainer");
		console.log("hi");
		console.log(shortcutsContainerDIV);
		var titleDIV = document.createElement("div");
		titleDIV.setAttribute("class", "shortcutsContainer");
		var pDIV = document.createElement("div");
		pDIV.setAttribute("class", "title");
		var p = document.createElement("p");
		var content;

		var keyDIV = document.createElement("div");
		keyDIV.setAttribute("class", "key");
		var input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("maxlength", "1");
		input.setAttribute("autocomplete", "off");

		//console.log(names.names);
		shortcutsContainerDIV.setAttribute("id", this.title);
		titleDIV.setAttribute("class", "title");
		p.appendChild(document.createTextNode(this.title));
		input.setAttribute("value", this.key);

		titleDIV.appendChild(p);
		keyDIV.appendChild(input);
		shortcutsContainerDIV.appendChild(titleDIV);
		shortcutsContainerDIV.appendChild(keyDIV);
		document.getElementById("root_list").appendChild(this.shortcutsContainerDIV);
		*/
// 		html1 = "<div id=" + this.title +" class=shortcutsContainer><div class=title><p>" + this.title + "</p></div><div class=key><input type=\"text\" maxlength=\"1\" autocomplete=\"off\" value = " + this.key + "></div></div>";
// 	}
// 	get htmlF() {
// 		//document.appendChild(this.shortcutsContainerDIV);
// 		return this.html1;
// 	}
// }

