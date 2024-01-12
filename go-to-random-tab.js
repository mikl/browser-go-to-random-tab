/* global chrome */
'use strict';

const LIMIT_CURRENT_WINDOW = 'limit-to-current-window'

function goToRandomTab() {
  chrome.storage.sync.get(LIMIT_CURRENT_WINDOW, data => {
    chrome.tabs.query({ active: false, currentWindow: data[LIMIT_CURRENT_WINDOW] }, tabs => {
      // If we need at least one other tabs to switch anywhere.
      if (tabs.length < 1) {
        return;
      }

      // Try switching tabs up to three times.
      for (let i = 0; i < 3; i += 1) {
        let newTabIndex = Math.floor(Math.random() * tabs.length);

        if (tabs[newTabIndex]) {
          chrome.windows.update(tabs[newTabIndex].windowId, { focused: true })
          chrome.tabs.update(tabs[newTabIndex].id, { active: true });
          break;
        }
      }
    })
  })
}

chrome.browserAction.onClicked.addListener(function (tab) {
  goToRandomTab();
});

chrome.commands.onCommand.addListener(function (command) {
  if (command == 'go-to-random-tab') {
    goToRandomTab();
  }
});

function init() {
  chrome.storage.sync.get(LIMIT_CURRENT_WINDOW, data => {
    let currentWindow = data[LIMIT_CURRENT_WINDOW]
    if (!(currentWindow == true || currentWindow == false)) { // init
      chrome.storage.sync.set({ LIMIT_CURRENT_WINDOW: false })
      currentWindow = false
    }

    chrome.contextMenus.create({
      id: LIMIT_CURRENT_WINDOW,
      title: "Limit to active window",
      type: 'checkbox',
      checked: currentWindow,
      contexts: ['browser_action'],
    })

    chrome.contextMenus.onClicked.addListener(info => {
      if (info.menuItemId == LIMIT_CURRENT_WINDOW) {
        chrome.storage.sync.set({ [LIMIT_CURRENT_WINDOW]: info.checked })
      }
    })
  })
}

init()
