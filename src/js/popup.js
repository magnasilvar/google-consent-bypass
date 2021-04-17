'use strict';

function fillPopup() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length > 0) {
      chrome.action.getBadgeText({ tabId: tabs[0].id }, (result) => {
        let messageToTranslate;
        let classStyle;
        if (result === '❔') {
          messageToTranslate = 'consent_panel_unknown';
          classStyle = 'consent-panel-unknown';
        } else if (result === '✔️') {
          messageToTranslate = 'consent_panel_hidden';
          classStyle = 'consent-panel-hidden';
        } else {
          messageToTranslate = 'not_supported';
          classStyle = 'not-supported';
        }
        document.getElementById('content').innerHTML = chrome.i18n.getMessage(messageToTranslate);
        document.getElementById('content').classList.add(classStyle);
      })
    }
  });
}

function localizeHtml() {
  const elements = document.getElementsByTagName('html');
  for (const element of elements) {
    element.innerHTML = element.innerHTML.replace(/__MSG_([a-z_]+)__/g, (match, p1) =>
        chrome.i18n.getMessage(p1));
  }
}

fillPopup();
localizeHtml();
