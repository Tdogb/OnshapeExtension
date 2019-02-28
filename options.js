let names = new Array();
chrome.storage.local.get('names', function(result) {
		names = result.names;
		console.log(names.names);
		setupOptions();
});

function setupOptions() {
	for(let i = 0; i < names.length; i++) {
		let title = names[i][0];
		let key = names[i][1];
		let html1 = "<div id=" + title +" class=shortcutsContainer><div class=title><p class=pTitle>" + title + "</p></div><div class=key><input type=\"text\" maxlength=\"1\" autocomplete=\"off\" value = " + key + "></div></div>";
		document.getElementById("root_list").innerHTML += html1;
	}
	document.getElementById("root_list").innerHTML += "<div id=\"status\"></div><button id=\"save\">Save</button>";
	(document.getElementById('save')).addEventListener('click', save_options);
}

function save_options() {
	let list = names;
	for(let i = 0; i < list.length; i++) {
		let change = document.getElementsByTagName("input");
		list[i][1] = change[i].value;
	}
	chrome.storage.local.set({'names': list});
}