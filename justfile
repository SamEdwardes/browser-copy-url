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

# Start a clean environment for testing
test-all: clean setup test
    @echo "All tests completed successfully!"

# Clean up generated files
clean:
    @echo "Cleaning up..."
    rm -rf node_modules
    rm -rf playwright-report
    rm -rf test-results
    rm -f bun.lockb

# Start a demo page for manual testing
demo: serve

# Full CI workflow
ci: setup test
    @echo "✅ CI checks passed!"
