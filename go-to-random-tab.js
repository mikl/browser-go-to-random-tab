/* global chrome */
'use strict';

// Filtering options for tabs.query().
const tabFilter = {
  // Avoid switching to the current tab.
  active: false,
  currentWindow: true,
};

function goToRandomTab() {
  chrome.tabs.query(tabFilter, function (tabs) {
    // If we need at least one other tabs to switch anywhere.
    if (tabs.length < 1) {
      return;
    }

    // Try switching tabs up to three times.
    for (let i = 0; i < 3; i += 1) {
      let newTabIndex = Math.floor(Math.random() * tabs.length);

      if (tabs[newTabIndex]) {
        chrome.tabs.update(tabs[newTabIndex].id, { active: true });
        break;
      }
    }
  });
}

chrome.browserAction.onClicked.addListener(function (tab) {
  goToRandomTab();
});

chrome.commands.onCommand.addListener(function (command) {
  if (command == 'go-to-random-tab') {
    goToRandomTab();
  }
});
