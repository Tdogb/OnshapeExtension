//chrome.commands.onCommand.addListener(function(command) {
//Inject a script to monitor keyboard keys
let foundButtons = false;
let inputHappening = false;
let names;
let new_names;
let toolbarPosition = new Array();
let observerConfig = {attributes: false, childList: true, subtree: true};

let observer = new MutationObserver(function (mutationList, observer) {
	for(let mutation in mutationList) {
	}
	//console.log(mutationList);
});
observer.observe(document, observerConfig);

chrome.storage.local.get('names', function(result) {
	names = result.names;
	for(let i = 0; i < names.length; i++) {
		Mousetrap.bind(names[i][1], function(e) {keyHit(e);});
	}
});

//TEMPORARY
chrome.storage.local.get('names_test', function (result) {
	console.log(result);
});

function keyHit(keyEvt) {
	//TEMPORARY

	console.log(keyEvt);
	console.log(inputHappening);
	console.log(foundButtons);
	//console.log("len: " + $("[command-id=UNDO_A_CHANGE]").length > 0);
	if(document.getElementById("feature-dialog") == null) { //&& $("[command-id='UNDO_A_CHANGE']").length > 0
		if (!inputHappening) {
			if (!foundButtons) {
				foundButtons = getButtons();
				if (foundButtons) {
					executeKeypress(keyEvt);
				}
			} else {
				executeKeypress(keyEvt);
			}
		}
	}
}

function executeKeypress(keyEvt) {
	for(let i = 0; i < names.length; i++) {
		if(keyEvt.key === names[i][1]) {
			pressButton(names[i][2][0], names[i][2][1]+1);
		}
	}
	console.log("keypress");
}

function pressButton(toolbar_item, tool) {
	console.log(toolbar_item + " " + tool);
	let tool_click;
	//if we are in parts studio
	tool_click = document.querySelector(".toolbar-item:nth-child(" + toolbar_item +") .os-row > .tool:nth-child(" + tool + ")");
	console.log("tool_click: " + tool_click);
	let event = document.createEvent('MouseEvent');
	event.initMouseEvent('click', true, true, window, 1, 0,0,0,0,false,false,false,false,0,null);
	tool_click.dispatchEvent(event);
}

function getButtons() {
	console.log("getbuttons");
	let toolbar = $(".toolbar-item");
	let svgs = new Array();
	let newNames = new Array();
	for(let i = 0; i < toolbar.length; i++) {
	    let temp = toolbar[i].getElementsByClassName("os-svg-icon");
	    if(temp.length !== 0) {
            svgs[i] = temp;
        }
    }
	let iterate = 0;
    for(let i = 0; i < svgs.length; i++) {
        for(let b = 0; b < svgs[i].length; b++) {
            let temp = svgs[i][b].innerHTML.slice(svgs[i][b].innerHTML.search("svg-icon-") + "svg-icon-".length, svgs[i][b].innerHTML.search("-button"));
            if(temp !== "expanded\"></use") {
            	toolbarPosition[iterate] = [i,b];
                newNames[iterate] = temp;
                iterate++;
            }
        }
    }
    console.log(toolbarPosition);
    /*
    format to go into chrome storage
     */
    new_names = new Array(newNames.length);
    new_names = names;
    console.log(newNames);
    console.log(names);
    console.log(new_names);
    if(newNames.length > names.length) {
    	for(let i = 0; i < newNames.length; i++) {

		}
		for(let i = 0; i < newNames.length; i++) {
			if(i >= toolbarPosition.length) {
				for(let b = 0; b < names.length; b++) {
					if (newNames[i] === names[b][0]) {
						new_names[i] = [newNames[i], names[b][1], toolbarPosition[i]];
					}
				}
			}
			else if(i < toolbarPosition.length){
				new_names[i] = [newNames[i], "", toolbarPosition[i]];
			}
			else {
				new_names[i] = [newNames[i], "", ["",""]];
			}
		}
		chrome.storage.local.set({'names': new_names});
		chrome.storage.local.get('names', function(result) {
			console.log("Result after setting new_names:");
			console.log(result);
		});
		return toolbar.length > 0;
	}
    return true;
}