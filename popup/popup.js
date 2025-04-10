document.getElementById("googleMeet").addEventListener("click", () => {
  window.open("https://meet.google.com", "_blank");
});

document.getElementById("github").addEventListener("click", () => {
  window.open("https://github.com", "_blank");
});

document.getElementById("googleKeep").addEventListener("click", () => {
  window.open("https://keep.google.com", "_blank");
});

document.getElementById("vsCode").addEventListener("click", () => {
  window.open("https://code.visualstudio.com", "_blank");
});

document.getElementById("vsCode").addEventListener("click", () => {
  window.open(
    "vscode://GitHub.Copilot-Chat/chat?mode=agent&referrer=vscode-agentcta",
    "_blank"
  );
});

document.getElementById("googleCalendar").addEventListener("click", () => {
  window.open("https://calendar.google.com", "_blank");
});


const AdBlocker = (() => {
  let adsBlockedCount = 0;
  let isActive = false;
  let observer = null;
  let checkInterval = null;
  let statusElement = null;

  const adSelectors = [
    'iframe[src*="ads"]',
    'iframe[src*="adservice"]',
    'div[id*="ad-"]',
    'div[class*="ad_"]',
    'div[class*="Ad_"]',
    'div[class*="banner"]',
    'script[src*="ads"]',
    'img[src*="ads"]',
    'ins.adsbygoogle',
    'div[data-ad-client]',
    'div[data-ad-slot]',
    'div[data-ad-target]',
    'div[data-adunit]',
    'div[data-ad-unit]',
    'div[data-ad-status]',
    'div[data-ad-refresh]'
  ];

  const init = () => {
    isActive = localStorage.getItem('adBlockerEnabled') === 'true';
    adsBlockedCount = parseInt(localStorage.getItem('adsBlockedCount')) || 0;
    
    const toggleElement = document.getElementById('addBlocker');
    if (toggleElement) {
      toggleElement.checked = isActive;
      toggleElement.addEventListener('change', handleToggle);
    }
    
    createStatusElement();
    if (isActive) enable();
  };

  const saveState = () => {
    localStorage.setItem('adBlockerEnabled', isActive);
    localStorage.setItem('adsBlockedCount', adsBlockedCount);
  };

  const createStatusElement = () => {
    statusElement = document.createElement('div');
    statusElement.id = 'adblocker-status';
    statusElement.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 10px 15px;
      border-radius: 5px;
      font-family: 'Segoe UI', sans-serif;
      font-size: 13px;
      font-weight: 500;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 9999;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    document.body.appendChild(statusElement);
    updateStatus();
  };

  const updateStatus = () => {
    if (!statusElement) return;
    
    if (isActive) {
      statusElement.innerHTML = `
        <i class="fas fa-shield-alt" style="color:#4CAF50;"></i>
        <span>Ad Blocker: ON • Blocked: ${adsBlockedCount}</span>
      `;
      statusElement.style.backgroundColor = '#e8f5e9';
      statusElement.style.color = '#2e7d32';
    } else {
      statusElement.innerHTML = `
        <i class="fas fa-shield-alt" style="color:#f44336;"></i>
        <span>Ad Blocker: OFF</span>
      `;
      statusElement.style.backgroundColor = '#ffebee';
      statusElement.style.color = '#c62828';
    }
  };

  const handleToggle = (e) => {
    if (e.target.checked) {
      enable();
    } else {
      disable();
    }
  };

  const blockAds = () => {
    document.querySelectorAll(adSelectors.join(',')).forEach(ad => {
      if (ad.style.display !== 'none') {
        ad.style.display = 'none';
        adsBlockedCount++;
        saveState();
        updateStatus();
      }
    });
  };

  const enable = () => {
    isActive = true;
    saveState();
    
    blockAds();
    
    observer = new MutationObserver(blockAds);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style']
    });
    
    checkInterval = setInterval(blockAds, 1000);
    
    updateStatus();
    showNotification('Ad Blocker Enabled', `Blocking ads on this page`, 'success');
  };

  const disable = () => {
    isActive = false;
    saveState();
    
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    
    if (checkInterval) {
      clearInterval(checkInterval);
      checkInterval = null;
    }
    
    document.querySelectorAll(adSelectors.join(',')).forEach(ad => {
      if (ad.style.display === 'none') {
        ad.style.display = '';
      }
    });
    
    updateStatus();
    showNotification('Ad Blocker Disabled', `Ads are now visible`, 'warning');
  };

  const showNotification = (title, message, type) => {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px;
      border-radius: 5px;
      background-color: ${type === 'success' ? '#4CAF50' : '#FF9800'};
      color: white;
      box-shadow: 0 3px 10px rgba(0,0,0,0.2);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: fadeIn 0.3s ease-out;
    `;
    
    notification.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
      <div>
        <div style="font-weight:600;">${title}</div>
        <div style="font-size:0.9em;">${message}</div>
      </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-10px); }
    }
  `;
  document.head.appendChild(style);

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
  AdBlocker.init();
});



// Save note
document.getElementById('saveNote').addEventListener('click', () => {
  const noteContent = document.querySelector('.notes-textarea').value;
  if (noteContent.trim() !== '') {
    localStorage.setItem('quickNote', noteContent);
    showNotification('Note Saved', 'Your note has been saved successfully', 'success');
  } else {
    showNotification('Empty Note', 'Please type something to save', 'warning');
  }
});

document.getElementById('clearNote').addEventListener('click', () => {
  document.querySelector('.notes-textarea').value = '';
  localStorage.removeItem('quickNote');
  showNotification('Note Cleared', 'Your note has been removed', 'info');
});

window.addEventListener('load', () => {
  const savedNote = localStorage.getItem('quickNote');
  if (savedNote) {
    document.querySelector('.notes-textarea').value = savedNote;
  }
});

function showNotification(title, message, type) {
  const colors = {
    success: { bg: '#4CAF50', icon: 'fa-check-circle' },
    warning: { bg: '#FF9800', icon: 'fa-exclamation-triangle' },
    info: { bg: '#2196F3', icon: 'fa-info-circle' }
  };

  const notification = document.createElement('div');
  notification.className = 'custom-notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px;
    border-radius: 8px;
    background-color: ${colors[type].bg};
    color: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 300px;
    transform: translateX(150%);
    transition: transform 0.3s ease-out;
  `;

  notification.innerHTML = `
    <i class="fas ${colors[type].icon}" style="font-size: 1.2rem;"></i>
    <div>
      <div style="font-weight: 600; font-size: 0.95rem;">${title}</div>
      <div style="font-size: 0.85rem; opacity: 0.9;">${message}</div>
    </div>
  `;

  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);

  setTimeout(() => {
    notification.style.transform = 'translateX(150%)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

const style = document.createElement('style');
style.textContent = `
  .notes-textarea {
    width: 100%;
    min-height: 120px;
    padding: 14px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    resize: none;
    margin-bottom: 16px;
    font-family: inherit;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    background-color: #f9f9f9;
  }
  
  .notes-textarea:focus {
    outline: none;
    border-color:rgba(67, 98, 238, 0.29);
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.1);
    background-color: white;
  }
  
  @keyframes slideIn {
    from { transform: translateX(150%); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); }
    to { transform: translateX(150%); }
  }
`;
document.head.appendChild(style);


// Link section
document.getElementById('savePageLink').addEventListener('click', saveLink);
document.getElementById('clearLinks').addEventListener('click', clearLinks);
loadSavedLinks();

function saveLink() {
  const linkInput = document.getElementById('pageLink');
  const url = linkInput.value.trim();
  
  if(url && isValidUrl(url)) {
    const links = JSON.parse(localStorage.getItem('savedLinks') || '[]');
    links.push(url);
    localStorage.setItem('savedLinks', JSON.stringify(links));
    linkInput.value = '';
    showNotification('Link Saved', 'URL added to saved links', 'success');
    loadSavedLinks();
  } else {
    showNotification('Invalid URL', 'Please enter a valid URL starting with http:// or https://', 'warning');
  }
}

function clearLinks() {
  localStorage.removeItem('savedLinks');
  document.getElementById('savedLinksList').innerHTML = '';
  showNotification('Links Cleared', 'All saved links removed', 'info');
}

function loadSavedLinks() {
  const links = JSON.parse(localStorage.getItem('savedLinks') || '[]');
  const list = document.getElementById('savedLinksList');
  list.innerHTML = links.map(link => `
    <li>
      <a href="${link}" target="_blank">${link}</a>
      <i class="fas fa-times remove-link" data-url="${link}"></i>
    </li>
  `).join('');
  
  document.querySelectorAll('.remove-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const url = e.target.getAttribute('data-url');
      removeLink(url);
    });
  });
}

function removeLink(url) {
  const links = JSON.parse(localStorage.getItem('savedLinks') || '[]')
    .filter(link => link !== url);
  localStorage.setItem('savedLinks', JSON.stringify(links));
  loadSavedLinks();
  showNotification('Link Removed', 'URL deleted from saved links', 'info');
}

function isValidUrl(string) {
  try { new URL(string); return true; }
  catch { return false; }
}