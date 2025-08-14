# Browser Copy URL

A lightweight JavaScript utility that enhances web browsing by adding convenient URL copying functionality to any web page with simple keyboard shortcuts.

## Features

### 🔗 Quick URL Copy

- **Shortcut**: `Cmd+Shift+C` (macOS) / `Ctrl+Shift+C` (Windows/Linux)
- **Function**: Copies the current page URL to clipboard in plain text format
- **Use Case**: Perfect for quick sharing or bookmarking

### 📝 Markdown URL Copy

- **Shortcut**: `Ctrl+Shift+C`
- **Function**: Copies the current page URL in markdown link format: `[Page Title](URL)`
- **Use Case**: Ideal for documentation, notes, or markdown-based content creation

### 🔔 Visual Feedback

- Non-intrusive notification showing the copied content
- Automatically fades out after 3 seconds
- Shows both the copy format and the actual copied text

### 🛠️ Special URL Handling

- **Atlassian URLs**: Automatically removes square brackets from page titles when creating markdown links
- **Salesforce URLs**: Strips query parameters from force.com URLs for cleaner sharing

## Installation Options

### Browser Extension

1. Save `browser-copy-url.js` as your extension's content script
2. Load as an unpacked extension or package for distribution
3. The functionality will be automatically available on all web pages

### Userscript

1. Install a userscript manager like [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/)
2. Add `browser-copy-url.user.js` to your userscript manager
3. The script will run automatically on all websites

### Bookmarklet

1. Create a new bookmark in your browser
2. Set the URL to the contents of `browser-copy-url.bookmarklet.js`
3. Click the bookmark on any page to activate the URL copy functionality (without keyboard shortcuts)

## Security Considerations

- Uses modern Clipboard API for secure clipboard access
- No external dependencies or network requests
- Minimal permission requirements
- Client-side only - no data transmission

## Future Enhancements

- [ ] Customizable keyboard shortcuts
- [ ] Additional format options (HTML, rich text)
- [ ] Support for copying selected text with URL context
- [ ] Settings panel for user preferences

## Development

To modify the code:

1. Edit the desired JavaScript file (`browser-copy-url.js`, `browser-copy-url.user.js`, or `browser-copy-url.bookmarklet.js`)
2. If editing the bookmarklet, ensure the code remains compact and self-contained
3. Test in various browsers to ensure compatibility

## License

MIT

