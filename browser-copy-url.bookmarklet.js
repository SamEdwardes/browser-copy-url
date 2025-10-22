javascript: (function () {
  'use strict';

  // Create notification element
  function createNotification() {
    const notif = document.createElement('div');
    notif.id = 'browser-copy-url-notification';
    notif.style.position = 'fixed';
    notif.style.bottom = '20px';
    notif.style.right = '20px';
    notif.style.padding = '10px 15px';
    notif.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    notif.style.color = 'white';
    notif.style.borderRadius = '4px';
    notif.style.zIndex = '999999';
    notif.style.fontSize = '14px';
    notif.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    notif.style.opacity = '0';
    notif.style.transform = 'translateY(10px)';
    notif.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    notif.style.maxWidth = '80vw';
    notif.style.wordBreak = 'break-word';
    document.body.appendChild(notif);
    return notif;
  }

  // Show notification with copied text
  function showNotification(message, textCopied) {
    // Get or create notification element
    let notif = document.getElementById('browser-copy-url-notification');
    if (!notif) {
      notif = createNotification();
    }

    // Set notification content
    const messageText = document.createElement('div');
    messageText.textContent = message;
    messageText.style.marginBottom = '5px';
    messageText.style.fontWeight = 'bold';

    const copiedText = document.createElement('div');
    copiedText.textContent = textCopied;
    copiedText.style.fontSize = '12px';
    copiedText.style.opacity = '0.8';
    copiedText.style.textOverflow = 'ellipsis';
    copiedText.style.overflow = 'hidden';
    copiedText.style.maxHeight = '60px';

    // Clear previous content and add new content
    notif.innerHTML = '';
    notif.appendChild(messageText);
    notif.appendChild(copiedText);

    // Show notification
    notif.style.opacity = '1';
    notif.style.transform = 'translateY(0)';

    // Hide after 3 seconds
    setTimeout(() => {
      notif.style.opacity = '0';
      notif.style.transform = 'translateY(10px)';
      // Remove from DOM after fade out
      setTimeout(() => {
        if (notif.parentNode) {
          notif.parentNode.removeChild(notif);
        }
      }, 300);
    }, 3000);
  }

  // Check browser compatibility
  function checkBrowserCompatibility() {
    // Check if Clipboard API is supported
    const clipboardSupported =
      navigator.clipboard && typeof navigator.clipboard.writeText === 'function';

    if (!clipboardSupported) {
      alert('browser-copy-url: Clipboard API not supported in this browser');
      return false;
    }

    return true;
  }

  // Exit if browser compatibility check fails
  if (!checkBrowserCompatibility()) {
    return;
  }

  // Platform detection for correct shortcut handling
  const isMac = navigator.platform.toLowerCase().includes('mac');

  function copyUrl(asMarkdown) {
    let url = window.location.href;
    const pageTitle = document.title;

    // Strip parameters from force.com URLs
    if (url.includes('force.com') && url.includes('?')) {
      url = url.split('?')[0];
    }

    let textToCopy = url;

    // Format as markdown if requested
    if (asMarkdown) {
      // Special handling for Zendesk URLs - format as "Ticket {number} - {clean title}"
      if (url.includes('zendesk.com')) {
        // Extract ticket number from URL
        const ticketMatch = url.match(/\/tickets\/(\d+)/);
        const ticketNumber = ticketMatch ? ticketMatch[1] : '';

        // Clean the title: remove "Ticket: " prefix and " – {company} – Zendesk" suffix
        let cleanTitle = pageTitle
          .replace(/^Ticket:\s*/, '') // Remove "Ticket: " prefix
          .replace(/\s*–\s*[^–]+\s*–\s*Zendesk\s*$/, '') // Remove " – {any company} – Zendesk" suffix
          .replace(/\s*–\s*Zendesk\s*$/, '') // Remove " – Zendesk" suffix (fallback)
          .trim();

        // Format as "Ticket {number} - {clean title}"
        textToCopy = `[Ticket ${ticketNumber} - ${cleanTitle}](${url})`;
      }
      // Special handling for Atlassian.net URLs - remove square brackets from title
      else if (url.includes('atlassian.net')) {
        const cleanTitle = pageTitle.replace(/[\[\]]/g, '');
        textToCopy = `[${cleanTitle}](${url})`;
      } else {
        textToCopy = `[${pageTitle}](${url})`;
      }
    }

    // Copy to clipboard with fallback
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // Replace alert with non-intrusive notification
        const message = `URL copied as ${asMarkdown ? 'markdown' : 'plain text'}`;
        showNotification(message, textToCopy);
      })
      .catch((err) => {
        // Fallback method for some browsers
        try {
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();

          const successful = document.execCommand('copy');
          if (successful) {
            // Replace alert with non-intrusive notification
            const message = `URL copied as ${asMarkdown ? 'markdown' : 'plain text'}`;
            showNotification(message, textToCopy);
          } else {
            showNotification('Failed to copy URL', '');
          }

          document.body.removeChild(textArea);
        } catch (fallbackErr) {
          showNotification('Failed to copy URL', '');
        }
      });
  }

  // Default to plain text in bookmarklet
  copyUrl(false);
})();
