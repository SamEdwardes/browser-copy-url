import { test, expect } from '@playwright/test';

// Using regular test approach instead of describe to avoid compatibility issues with Bun
test('has correct page title', async ({ page }) => {
  // Navigate to our test page
  await page.goto('/tests/example.html');

  // Wait for the script to load and initialize
  await page.waitForTimeout(500);

  // Test page title
  await expect(page).toHaveTitle('Test Page for Browser Copy URL');
});

test('should create notification element when copying URL', async ({ page }) => {
  // Navigate to our test page
  await page.goto('/tests/example.html');

  // Wait for the script to load and initialize
  await page.waitForTimeout(500);
  // Mock clipboard API
  await page.evaluate(() => {
    // @ts-ignore
    navigator.clipboard.writeText = async (text) => {
      console.log('Mocked clipboard write:', text);
      return Promise.resolve();
    };
  });

  // Trigger the keyboard shortcut
  await page.keyboard.press('Control+Shift+C');

  // Check if notification appears
  const notification = await page.waitForSelector('#browser-copy-url-notification');
  expect(notification).toBeTruthy();

  // Check notification content
  const notificationText = await notification.textContent();
  expect(notificationText).toContain('URL copied');
});

test('should handle Atlassian URLs correctly', async ({ page }) => {
  // Navigate to our special Atlassian test page
  await page.goto('/tests/example-atlassian.html');

  // Wait for the script to load and initialize
  await page.waitForTimeout(500);

  // Set up clipboard write capture
  const clipboardPromise = page.evaluate(() => {
    return new Promise((resolve) => {
      // @ts-ignore
      navigator.clipboard.writeText = (text) => {
        resolve(text);
        return Promise.resolve();
      };
    });
  });

  // Trigger markdown copy
  await page.keyboard.press('Control+Shift+C');

  // Get the clipboard content
  const clipboardContent = await clipboardPromise;

  // Split the clipboard content to analyze the markdown components
  console.log('Clipboard content:', clipboardContent);

  // Instead of checking for exact string, verify the structure with regex
  expect(clipboardContent).toMatch(/\[TEST-123 Bug Some issue with brackets\]/);
  expect(clipboardContent).not.toMatch(/\[TEST-123 \[Bug\]/);
  expect(clipboardContent).toContain('https://example.atlassian.net/browse/TEST-123');

  // Make sure the notification shows the modified title
  const notification = await page.waitForSelector('#browser-copy-url-notification');
  const notificationText = await notification.textContent();
  expect(notificationText).not.toContain('[Bug]');
});

test('should handle Zendesk URLs correctly', async ({ page }) => {
  // Navigate to our special Zendesk test page
  await page.goto('/tests/example-zendesk.html');

  // Wait for the script to load and initialize
  await page.waitForTimeout(500);

  // Set up clipboard write capture
  const clipboardPromise = page.evaluate(() => {
    return new Promise((resolve) => {
      // @ts-ignore
      navigator.clipboard.writeText = (text) => {
        resolve(text);
        return Promise.resolve();
      };
    });
  });

  // Trigger markdown copy
  await page.keyboard.press('Control+Shift+C');

  // Get the clipboard content
  const clipboardContent = await clipboardPromise;

  // Split the clipboard content to analyze the markdown components
  console.log('Clipboard content:', clipboardContent);

  // Verify the formatted title follows the pattern: [Ticket {number} - {clean title}](url)
  expect(clipboardContent).toMatch(/\[Ticket 122694 - My really hard support problem\]/);
  expect(clipboardContent).not.toContain('Example Support');
  expect(clipboardContent).not.toContain('Zendesk');
  expect(clipboardContent).not.toContain('Ticket:');
  expect(clipboardContent).toContain('https://example.zendesk.com/agent/tickets/122694');

  // Make sure the notification shows the modified title
  const notification = await page.waitForSelector('#browser-copy-url-notification');
  const notificationText = await notification.textContent();
  expect(notificationText).toContain('Ticket 122694 - My really hard support problem');
});

test('should show notification with copied text', async ({ page }) => {
  // Navigate to our test page
  await page.goto('/tests/example.html');

  // Wait for the script to load and initialize
  await page.waitForTimeout(500);
  // Mock clipboard API
  await page.evaluate(() => {
    // @ts-ignore
    navigator.clipboard.writeText = async (text) => {
      console.log('Mocked clipboard write:', text);
      return Promise.resolve();
    };
  });

  // Trigger the keyboard shortcut
  await page.keyboard.press('Control+Shift+C');

  // Check if notification appears with the correct structure
  const notification = await page.waitForSelector('#browser-copy-url-notification');

  // Check if it has both the header and content sections
  const messageElement = await notification.$('div');
  expect(await messageElement?.textContent()).toContain('URL copied');

  // Check if it disappears after a few seconds
  await page.waitForTimeout(3500); // Wait longer than the 3s timeout
  const notificationAfterTimeout = await page.$('#browser-copy-url-notification');
  expect(notificationAfterTimeout).toBeNull();
});
