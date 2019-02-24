//chrome.commands.onCommand.addListener(function(command) {
//Inject a script to monitor keyboard keys
var foundButtons = false;
var inputHappening = false;
var timeout1 = 10;
//(function() {
//(document.body).addEventListener("input", function(){ inputCheck(); });
//(document.body).addEventListener("keypress", function(keyEvt){ setTimeout(keyhit(keyEvt), 3); });

//});

var names;
chrome.storage.local.get('names', function(result) {
	names = result.names;
	for(let i = 0; i < names.length; i++) {
		console.log(names[i][1]);
		Mousetrap.bind(names[i][1], function(e) {keyHit(e);});
	}
});

// //Use the onload and onunload
// function inputCheck() {
// 	inputHappening = true;
// 	console.log("inputcheck");
// 	setTimeout(inputHappeningFalse, timeout1);
// }
//
// function inputHappeningFalse() {
// 	inputHappening = false;
// }
/*
	Small window extrude: .os-tool-dropdown-content > .tool:nth-child(1)
	Small window revolve: .os-tool-dropdown-content > .tool:nth-child(2)
	Large window extrude: .toolbar-item:nth-child(2) .os-row > .tool:nth-child(1)
	Large window revolve: .toolbar-item:nth-child(2) .os-row > .tool:nth-child(2)
*/
function keyHit(keyEvt) {
	console.log("keyhit")
	if(!inputHappening) {
		if(!foundButtons) {
			foundButtons = getButtons();
			if(foundButtons) {
				executeKeypress(keyEvt);
			}
		}
		else {
			executeKeypress(keyEvt);
		}
	}
}

function executeKeypress(keyEvt) {
	for(let i = 0; i < names.length; i++) {
		console.log(names[i][1]);
		if(keyEvt.key == names[i][1]) {
			pressButton(names[i][0]);
		}
	}
	console.log("keypress");
}

function pressButton(_button) {
	let listOfButtons = document.querySelectorAll(".tool");
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
	let toolbar = document.querySelectorAll(".toolbar-item");
    let svgs = toolbar[0].getElementsByClassName("os-svg-icon");
	console.log("getButtons: ");
	console.log(svgs);
	console.log(toolbar);
	console.log("end");
	return toolbar.length > 0;
}