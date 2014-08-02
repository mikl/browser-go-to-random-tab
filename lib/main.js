'use strict';

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

function goToRandomTab() {
  var newTabNumber;

  newTabNumber = Math.round(Math.random() * (tabs.length - 1));

  // If the random tab selected was the one we are currently on, try
  // getting another random tab.
  if (tabs[newTabNumber] === tabs.activeTab) {
    goToRandomTab();
  }
  // Switch to the randomly selected tab if it exists.
  else if (tabs[newTabNumber]) {
    tabs[newTabNumber].activate();
  }
}

function handleClick(state) {
  if (tabs.length > 1) {
    goToRandomTab();
  }
}

var button = buttons.ActionButton({
  id: 'go-to-random-tab',
  label: 'Switch to a random open tab',
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});
