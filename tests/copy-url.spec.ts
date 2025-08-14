import { test, expect } from '@playwright/test';

test.describe('Browser Copy URL', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to our test page
    await page.goto('/tests/example.html');
    
    // Wait for the script to load and initialize
    await page.waitForTimeout(500);
  });

  test('page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Test Page for Browser Copy URL');
  });

  test('should create notification element when copying URL', async ({ page }) => {
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
    // Mock the URL and document title for Atlassian
    await page.evaluate(() => {
      Object.defineProperty(window, 'location', {
        value: { href: 'https://example.atlassian.net/browse/TEST-123' }
      });
      document.title = 'TEST-123 [Bug] Some issue with brackets';
    });
    
    // Set up clipboard write capture
    const clipboardPromise = page.evaluate(() => {
      return new Promise(resolve => {
        // @ts-ignore
        navigator.clipboard.writeText = text => {
          resolve(text);
          return Promise.resolve();
        };
      });
    });
    
    // Trigger markdown copy
    await page.keyboard.press('Control+Shift+C');
    
    // Get the clipboard content
    const clipboardContent = await clipboardPromise;
    
    // Verify brackets were removed
    expect(clipboardContent).toContain('TEST-123 Bug Some issue with brackets');
    expect(clipboardContent).not.toContain('[Bug]');
  });

  test('should show notification with copied text', async ({ page }) => {
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
});