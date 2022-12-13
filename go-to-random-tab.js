/* global chrome */
'use strict';

const DISCARDED = "discarded"
const HIDDEN = "hidden"
const STORAGE_KEY = "options"

const capitalize = ([firstChar, ...otherChars]) => `${firstChar.toUpperCase()}${(otherChars.join(''))}`

function goToRandomTab() {

  //check options
  chrome.storage.local.get([STORAGE_KEY],  (storage) => {    

    // Filtering options for tabs.query().
    let query = {
       // Avoid switching to the current tab.
       active: false,
       currentWindow: true,
       discarded: storage[STORAGE_KEY][DISCARDED],
       hidden: storage[STORAGE_KEY][HIDDEN]
    }

    chrome.tabs.query(query, (tabs) => {
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

    })

  })
}


chrome.browserAction.onClicked.addListener(function(tab) {
  goToRandomTab();
})

chrome.commands.onCommand.addListener(function(command) {
  if (command == "go-to-random-tab") {
    goToRandomTab();
  }
})

chrome.contextMenus.removeAll();

chrome.contextMenus.create({
  id: DISCARDED, 
  title: capitalize(DISCARDED),
  type: "checkbox",
  contexts: ["browser_action"],
})

chrome.contextMenus.create({
  id: HIDDEN,
  title: capitalize(HIDDEN),
  type: "checkbox",
  contexts: ["browser_action"],
})

// initialize store
chrome.storage.local.clear()
chrome.storage.local.set({
  options: {
    discarded: false,
    hidden: false
  }
})


chrome.contextMenus.onClicked.addListener((info) => {
  if(info.menuItemId === DISCARDED || info.menuItemId === HIDDEN) {
    if(info.checked != info.wasChecked) {

      chrome.storage.local.get([STORAGE_KEY],  (storage) => {
        
        storage[STORAGE_KEY][info.menuItemId] = info.checked
        chrome.storage.local.set({options: storage[STORAGE_KEY]})

      })
    }
  }
})
