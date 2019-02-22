var list = [
	["sketch", "s"],
	["extrude", "e"],
	["revolve", "r"],
	["sweep", "w"]
];
chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.local.set({'names': list});
});

chrome.browserAction.onClicked.addListener(function (tab) {
	// for the current tab, inject the "inject.js" file & execute it
	console.log(tab);
	s.src = chrome.extension.getURL('shortcutInsert.js');
		s.onload = function() {
    		this.remove();
		};
	chrome.tabs.executeScript(tab.ib, {
		file: 'shortcutInsert.js'
	});
});

