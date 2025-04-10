function saveToStorage(key, data) {
    const storageData = {};
    storageData[key] = data;
    localStorage.setItem(key, JSON.stringify(storageData));
  }
  
  function loadFromStorage(key, callback) {
    const data = localStorage.getItem(key);
    if (data) {
      callback(JSON.parse(data)[key]);
    } else {
      callback(null);
    }
  }
  
  function clearStorage() {
    localStorage.clear();
  }
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'save-data') {
      saveToStorage(message.key, message.data);
      sendResponse({ status: 'Data saved' });
    }
  
    if (message.type === 'load-data') {
      loadFromStorage(message.key, sendResponse);
      return true;
    }
  
    if (message.type === 'clear-storage') {
      clearStorage();
      sendResponse({ status: 'Storage cleared' });
    }
  });
  