'use strict';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'Delete',
    title: '&Delete text',
    contexts: ['editable'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.scripting.executeScript({
    target: {
      tabId: tab.id,
      frameIds: [info.frameId || 0],
    },
    /* global document */
    func: () => {
      if (/^(input|textarea)$/.test(document.activeElement?.localName))
        document.execCommand('delete');
    },
  });
});
