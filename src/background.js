'use strict';

function defineBadgeInfo() {
  const extTitle = chrome.i18n.getMessage('extension_title') + ' - ';
  if (document.querySelectorAll('div[aria-modal]').length === 1) {
    return { text: '✔️', color: '#73ad21', title: extTitle + chrome.i18n.getMessage('consent_panel_hidden') };
  }
  return { text: '❔', color: 'yellow', title: extTitle + chrome.i18n.getMessage('consent_panel_unknown') };
}

function runBadgeUpdateScript(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.tabId },
    function: defineBadgeInfo
  }, (response) => {
    chrome.action.setBadgeText({ tabId: tab.tabId, text: response[0].result.text });
    chrome.action.setBadgeBackgroundColor({ tabId: tab.tabId, color: response[0].result.color });
    chrome.action.setTitle({ tabId: tab.tabId, title: response[0].result.title });
  });
}

chrome.webNavigation.onCommitted.addListener(function (tab) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    if (tabs.length > 0) {
      // Prevents action without permission (in that case, URL param will not be reachable)
      if (tabs[0].url === undefined) {
        return;
      }
      runBadgeUpdateScript(tab);
    }
  });
});
