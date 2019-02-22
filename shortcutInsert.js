//chrome.commands.onCommand.addListener(function(command) {
//Inject a script to montitor keyboard keys

(function() {
	(document.body).addEventListener("keypress", function(keyEvt){ keyhit(keyEvt); });
})();

var names;
chrome.storage.local.get('names', function(result) {
	names = result.names;
});

/*
	Small window extrude: .os-tool-dropdown-content > .tool:nth-child(1)
	Small window revolve: .os-tool-dropdown-content > .tool:nth-child(2)
	Large window extrude: .toolbar-item:nth-child(2) .os-row > .tool:nth-child(1)
	Large window revolve: .toolbar-item:nth-child(2) .os-row > .tool:nth-child(2)
*/
function keyhit(keyEvt) {
	for(let i = 0; i < names.length; i++) {
		console.log(names[i][1]);
		if(keyEvt.key == names[i][1]) {
			pressButton(names[i][0]);
		}
	}
	console.log("keypress");
}

function pressButton(_button) {
	var listOfButtons = document.querySelectorAll(".tool");
	console.log(listOfButtons);
	var toolbar_item = 0;
	var tool = 0;
	//if we are in parts studio
	switch(_button) {
		case "sketch":
			break;
		case "extrude":
			toolbar_item=2;
			tool = 1;
			break;
		case "revolve":
			toolbar_item=2;
			tool = 2;
			break;
	};
	var tool_click = document.querySelector(".toolbar-item:nth-child(" + toolbar_item +") .os-row > .tool:nth-child(" + tool + ")");
	//.toolbar-item:nth-child(2) .os-row > .tool:nth-child(1)
	var event = document.createEvent('MouseEvent');
	event.initMouseEvent('click', true, true, window, 1, 0,0,0,0,false,false,false,false,0,null);
	tool_click.dispatchEvent(event);
}

function getButtons() {
	var tbLen = document.querySelectorAll(".toolbar-item");
	var tLen;
	for(var i=1; i <= tbLen.length; i++) {

	}
}