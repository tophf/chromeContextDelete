chrome.contextMenus.create({
	id: "Delete", title: "&Delete text", contexts: ["editable"]
}, function() { var clearError = chrome.runtime.lastError; });

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	chrome.tabs.executeScript({
		allFrames: true,
		matchAboutBlank: true,
		code: getFunctionText(deleteTextInFrame).replace(/__url/, info.frameUrl || info.pageUrl)
	});
});

function deleteTextInFrame() {
	if (location.href == "__url" &&
		document.activeElement &&
		document.activeElement.localName.match(/^(input|textarea)$/))
	{
		document.execCommand("delete");
	}
}

function getFunctionText(f) {
	return f.toString().replace(/^.+?\{([\s\S]*?)\}$/, '$1');
}
