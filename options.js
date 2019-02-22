var names = [];
chrome.storage.local.get('names', function(result) {
		names = result;
		console.log(names);
		setupOptions();
	});

function setupOptions() {
	for(let i = 0; i < names.names.length; i++) {
		let title = names.names[i][0];
		let key = names.names[i][1];
		let html1 = "<div id=" + title +" class=shortcutsContainer><div class=title><p>" + title + "</p></div><div class=key><input type=\"text\" maxlength=\"1\" autocomplete=\"off\" value = " + key + "></div></div>";document.getElementById("root_list").innerHTML += html1;
	}
	(document.getElementById('save')).addEventListener('click', save_options);
}

function save_options() {
	console.log("ok");
	let list = names.names;
	for(let i = 0; i < list.length; i++) {
		let change = document.getElementsByTagName("input")
		list[i][1] = change[i].value;
	}
	chrome.storage.local.set({'names': list});
}