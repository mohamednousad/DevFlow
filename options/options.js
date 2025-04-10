document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['settings'], (data) => {
      const settings = data.settings || {};
      document.getElementById('focusMode').checked = settings.focusMode || false;
      document.getElementById('darkMode').checked = settings.darkMode || false;
      document.getElementById('shortcuts').value = settings.shortcuts || '';
    });
  
    document.getElementById('saveSettings').addEventListener('click', () => {
      const settings = {
        focusMode: document.getElementById('focusMode').checked,
        darkMode: document.getElementById('darkMode').checked,
        shortcuts: document.getElementById('shortcuts').value
      };
      chrome.storage.local.set({ settings });
      alert('Settings Saved');
    });
  });
  