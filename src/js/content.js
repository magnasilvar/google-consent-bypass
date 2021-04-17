'use strict';

const consentPanelId = 'Sx9Kwc';

function onMutation(mutations) {
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      if (node.id === consentPanelId) {
        observer.disconnect();
        node.style.visibility = 'hidden';
        document.body.style.overflow = 'visible';
        return;
      }
    }
  }
}

const observer = new MutationObserver(onMutation);
// MutationObserver is required to hide consent panel from DOM during page loading before rendering
// so that there's no blinking.
observer.observe(document, { childList: true, subtree: true });
