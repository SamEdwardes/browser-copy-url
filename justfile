# browser-copy-url justfile
# https://github.com/casey/just

# List available recipes
@_:
    @just --list

# Install dependencies
setup:
    bun install
    bun playwright install chromium

# Start the development server
serve:
    bun run serve

# Run tests in headless mode
test:
    bun test

# Run tests with UI mode
test-ui:
    bun test:ui

# Run tests with debug mode
test-debug:
    bun test:debug

# Generate test report (run after tests)
test-report:
    @echo "Opening test report..."
    open playwright-report/index.html

# Format all JavaScript/TypeScript/HTML files
format:
    @echo "Formatting code..."
    bun run format

# Validate bookmarklet code size
check-bookmarklet:
    @echo "Checking bookmarklet size..."
    wc -c browser-copy-url.bookmarklet.js | awk '{print "Bookmarklet size: " $$1 " bytes"}'
    @if [ $$(wc -c < browser-copy-url.bookmarklet.js) -gt 6000 ]; then \
        echo "⚠️  Warning: Bookmarklet size exceeds 6KB, which may cause issues in some browsers."; \
    else \
        echo "✅ Bookmarklet size is acceptable."; \
    fi

# Start a clean environment for testing all variants
test-all: clean setup test
    @echo "All tests completed successfully!"

# Create distribution files
build:
    @echo "Building distribution files..."
    mkdir -p dist
    cp browser-copy-url.js dist/
    cp browser-copy-url.user.js dist/
    cp browser-copy-url.bookmarklet.js dist/
    cp manifest.json dist/
    @echo "✅ Build files created in dist/ directory"

# Clean up generated files
clean:
    @echo "Cleaning up..."
    rm -rf node_modules
    rm -rf playwright-report
    rm -rf test-results
    rm -rf dist
    rm -f bun.lockb

# Create a ZIP file for distribution
package: build
    @echo "Creating distribution package..."
    cd dist && zip -r ../browser-copy-url.zip .
    @echo "✅ Package created as browser-copy-url.zip"

# Start a demo page for manual testing
demo: serve

# Full CI workflow
ci: setup test check-bookmarklet build
    @echo "✅ CI checks passed!"
