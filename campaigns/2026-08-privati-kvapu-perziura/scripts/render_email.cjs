const { chromium } = require('playwright');
const path = require('path');
const { pathToFileURL } = require('url');

async function render() {
  const campaignDir = path.resolve(__dirname, '..');
  const url = pathToFileURL(path.join(campaignDir, 'newsletter.html')).href;
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const sizes = [
    { width: 820, height: 900, file: 'preview-desktop.png' },
    { width: 390, height: 844, file: 'preview-mobile.png' },
    { width: 320, height: 760, file: 'preview-mobile-320.png' },
  ];

  for (const size of sizes) {
    const page = await browser.newPage({ viewport: { width: size.width, height: size.height }, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForFunction(
      () => Array.from(document.images).every((img) => img.complete && img.naturalWidth > 0),
      null,
      { timeout: 15000 },
    );
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(campaignDir, size.file), fullPage: true });
    await page.close();
  }

  await Promise.race([
    browser.close(),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);
  process.exit(0);
}

render().catch((error) => {
  console.error(error);
  process.exit(1);
});
