# CLAUDE.md

## Project Overview

**browser-copy-url** is a lightweight JavaScript utility that enhances web browsing by adding convenient URL copying functionality to any web page. With simple keyboard shortcuts, users can quickly copy the current page's URL in plain text or markdown format.

Refer to @README.md for more details.

## Features

### 🔗 Quick URL Copy

- **Shortcut**: `Cmd+Shift+C` (macOS) / `Ctrl+Shift+C` (Windows/Linux)
- **Function**: Copies the current page URL to clipboard in plain text format
- **Use Case**: Perfect for quick sharing or bookmarking

### 📝 Markdown URL Copy

- **Shortcut**: `Ctrl+Shift+C`
- **Function**: Copies the current page URL in markdown link format: `[Page Title](URL)`
- **Use Case**: Ideal for documentation, notes, or markdown-based content creation

## Technical Details

### Implementation

- **Language**: Pure JavaScript (ES6+)
- **Dependencies**: None - vanilla JavaScript only
- **File Structure**: Single file implementation for maximum portability
- **Browser Compatibility**: Modern browsers supporting Clipboard API

### Key Components

- Event listeners for keyboard shortcuts
- Clipboard API integration for reliable copying
- Document title extraction for markdown formatting
- Cross-platform keyboard shortcut handling

## Installation & Usage

### Browser Extension

1. Load the JavaScript file as a content script in your browser extension
2. The functionality will be automatically available on all web pages

### Bookmarklet

1. Wrap the code in a bookmarklet format
2. Save as a browser bookmark for on-demand activation

### User Script

1. Use with userscript managers like Tampermonkey or Greasemonkey
2. Configure to run on all websites

## Use Cases

- **Developers**: Quickly copy URLs for bug reports or documentation
- **Content Creators**: Generate markdown links for articles and posts
- **Researchers**: Efficiently collect and format web references
- **General Users**: Streamline URL sharing workflow

## Browser Support

- ✅ Chrome 66+
- ✅ Firefox 63+
- ✅ Safari 13.1+
- ✅ Edge 79+

_Requires Clipboard API support for secure clipboard access_

## Security Considerations

- Uses modern Clipboard API for secure clipboard access
- No external dependencies or network requests
- Minimal permission requirements
- Client-side only - no data transmission

## Future Enhancements

- [ ] Customizable keyboard shortcuts
- [ ] Additional format options (HTML, rich text)
- [ ] Visual feedback for successful copies
- [ ] Settings panel for user preferences
- [ ] Support for copying selected text with URL context
