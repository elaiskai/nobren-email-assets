const { chromium } = require('playwright');
const path = require('path');
const { pathToFileURL } = require('url');

async function main() {
  const campaign = path.resolve(__dirname, '..');
  const source = path.resolve(campaign, process.argv[2] || 'newsletter.html');
  const outputDir = process.env.OUTPUT_DIR
    ? path.resolve(process.env.OUTPUT_DIR)
    : campaign;
  const outputPrefix = process.env.OUTPUT_PREFIX || 'preview';
  require('fs').mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  for (const size of [
    { width: 820, height: 900, file: 'desktop.png' },
    { width: 390, height: 844, file: 'mobile.png' },
    { width: 320, height: 760, file: 'mobile-320.png' },
  ]) {
    const page = await browser.newPage({ viewport: size, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(source).href, { waitUntil: 'load' });
    await page.waitForFunction(
      () => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0),
      null,
      { timeout: 15000 },
    );
    await page.screenshot({
      path: path.join(outputDir, `${outputPrefix}-${size.file}`),
      fullPage: true,
    });
    await page.close();
  }
  await Promise.race([browser.close(), new Promise((resolve) => setTimeout(resolve, 3000))]);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
