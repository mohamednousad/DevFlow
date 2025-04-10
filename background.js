chrome.runtime.onInstalled.addListener(() => {
    console.log('DevFlow Boost extension installed');
    chrome.storage.local.set({
      'data-saver': false,
      'ad-blocker': true,
      'focus-mode': false,
      'meeting-assistant': false
    });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'toggle-data-saver') {
      chrome.storage.local.set({ 'data-saver': message.status });
    }
    if (message.type === 'toggle-ad-blocker') {
      chrome.storage.local.set({ 'ad-blocker': message.status });
    }
    if (message.type === 'toggle-focus-mode') {
      chrome.storage.local.set({ 'focus-mode': message.status });
    }
    if (message.type === 'toggle-meeting-assistant') {
      chrome.storage.local.set({ 'meeting-assistant': message.status });
    }
    sendResponse({ status: 'Settings updated' });
  });
  