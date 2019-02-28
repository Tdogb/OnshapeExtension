//chrome.commands.onCommand.addListener(function(command) {
//Inject a script to monitor keyboard keys
let foundButtons = false;
let inputHappening = false;
//(function() {
//(document.body).addEventListener("input", function(){ inputCheck(); });
//(document.body).addEventListener("keypress", function(keyEvt){ setTimeout(keyhit(keyEvt), 3); });

//});

let names;
let new_names;
let toolbarPosition = new Array();
chrome.storage.local.get('names', function(result) {
	names = result.names;
	for(let i = 0; i < names.length; i++) {
		//console.log(names[i][1]);
		Mousetrap.bind(names[i][1], function(e) {keyHit(e);});
	}
});
/*
	Small window extrude: .os-tool-dropdown-content > .tool:nth-child(1)
	Small window revolve: .os-tool-dropdown-content > .tool:nth-child(2)
	Large window extrude: .toolbar-item:nth-child(2) .os-row > .tool:nth-child(1)
	Large window revolve: .toolbar-item:nth-child(2) .os-row > .tool:nth-child(2)
*/
function keyHit(keyEvt) {
	if(document.getElementById("feature-dialog") == null) {
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
		if(keyEvt.key == names[i][1]) {
			pressButton(names[i][2][0], names[i][2][1]+1);
		}
	}
	//console.log("keypress");
}

function pressButton(toolbar_item, tool) {
	//let listOfButtons = document.querySelectorAll(".tool");
	//let toolbar_item = 0;
	//let tool = 0;
	let tool_click;
	//if we are in parts studio

	tool_click = document.querySelector(".toolbar-item:nth-child(" + toolbar_item +") .os-row > .tool:nth-child(" + tool + ")");
	//.toolbar-item:nth-child(2) .os-row > .tool:nth-child(1)
	let event = document.createEvent('MouseEvent');
	event.initMouseEvent('click', true, true, window, 1, 0,0,0,0,false,false,false,false,0,null);
	tool_click.dispatchEvent(event);
}

function getButtons() {
	let toolbar = document.querySelectorAll(".toolbar-item");
	let svgs = new Array();
	let newNames = new Array();
	for(let i = 0; i < toolbar.length; i++) {
	    let temp = toolbar[i].getElementsByClassName("os-svg-icon");
	    if(temp.length != 0) {
            svgs[i] = temp;
        }
    }
	let iterate = 0;
    for(let i = 0; i < svgs.length; i++) {
        for(let b = 0; b < svgs[i].length; b++) {
            let temp = svgs[i][b].innerHTML.slice(svgs[i][b].innerHTML.search("svg-icon-") + "svg-icon-".length, svgs[i][b].innerHTML.search("-button"));
            if(temp != "expanded\"></use") {
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
    console.log(newNames);
    console.log(names);
    for(let i = 0; i < newNames.length; i++) {
        if(i < names.length) {
        	for(let b = 0; b < names.length; b++) {
        		if(newNames[i] === names[b][0]) {
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
    //console.log(svgs);
	//console.log(newNames);
	//console.log(new_names);
	return toolbar.length > 0;
}