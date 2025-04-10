chrome.storage.local.get(['settings'], (data) => {
    const settings = data.settings || {};
    if (settings.focusMode) {
      blockDistractingSites();
    }
    if (settings.darkMode) {
      enableDarkMode();
    }
  });
  
  function blockDistractingSites() {
    const distractingSites = ['facebook.com', 'twitter.com'];
    const currentUrl = window.location.href;
    distractingSites.forEach(site => {
      if (currentUrl.includes(site)) {
        window.location.replace('about:blank');
      }
    });
  }
  
  function enableDarkMode() {
    const body = document.querySelector('body');
    body.style.backgroundColor = '#121212';
    body.style.color = '#e0e0e0';
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      el.style.backgroundColor = '#121212';
      el.style.color = '#e0e0e0';
    });
  }
  
  function saveTextSnippet() {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      chrome.storage.local.get(['snippets'], (data) => {
        const snippets = data.snippets || [];
        snippets.push(selectedText);
        chrome.storage.local.set({ snippets });
      });
    }
  }
  
  document.addEventListener('mouseup', saveTextSnippet);
  