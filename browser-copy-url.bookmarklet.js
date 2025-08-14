javascript:(function(){
    'use strict';
    
    // Check browser compatibility
    function checkBrowserCompatibility() {
        // Check if Clipboard API is supported
        const clipboardSupported = navigator.clipboard && typeof navigator.clipboard.writeText === 'function';
        
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
        const url = window.location.href;
        const pageTitle = document.title;
        
        let textToCopy = url;
        
        // Format as markdown if requested
        if (asMarkdown) {
            textToCopy = `[${pageTitle}](${url})`;
        }
        
        // Copy to clipboard with fallback
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert(`URL copied as ${asMarkdown ? 'markdown' : 'plain text'}`);
            })
            .catch(err => {
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
                        alert(`URL copied as ${asMarkdown ? 'markdown' : 'plain text'}`);
                    } else {
                        alert('Failed to copy URL');
                    }
                    
                    document.body.removeChild(textArea);
                } catch (fallbackErr) {
                    alert('Failed to copy URL');
                }
            });
    }
    
    // Default to plain text in bookmarklet
    copyUrl(false);
})();