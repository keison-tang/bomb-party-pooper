// Saves options to chrome.storage
const saveOptions = () => {
  const isLazyModeEnabled =
    document.getElementById('isLazyModeEnabled').checked;

  chrome.storage.sync.set({ isLazyModeEnabled: isLazyModeEnabled }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');

    status.textContent = isLazyModeEnabled
      ? 'Lazy Mode enabled'
      : 'Lazy Mode disabled';

    setTimeout(() => {
      status.textContent = '';
    }, 1000);
  });
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get({ isLazyModeEnabled: false }, (items) => {
    document.getElementById('isLazyModeEnabled').checked =
      items.isLazyModeEnabled;
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
