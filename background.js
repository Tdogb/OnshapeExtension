var list = [
	["undo", "", [0,0]],
	["redo", "", [0,1]],
	["new-sketch", "s", [1,0]],
	["extrude", "e", [2,0]]
];
chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.local.get('names', function (result) {
		chrome.storage.local.set({'names_test': result});
	});
    chrome.storage.local.set({'names': list});
});
chrome.browserAction.onClicked.addListener(function (tab) {
	// for the current tab, inject the "inject.js" file & execute it
	s.src = chrome.extension.getURL('shortcutInsert.js');
		s.onload = function() {
    		this.remove();
		};
	chrome.tabs.executeScript(tab.ib, {
		file: 'shortcutInsert.js'
	});
});