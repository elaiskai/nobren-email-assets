const {chromium}=require('playwright');
const sharp=require('sharp');
const {pathToFileURL}=require('url');
const path=require('path');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const page=await browser.newPage({viewport:{width:1200,height:930},deviceScaleFactor:1});
 await page.goto(pathToFileURL(path.join(__dirname,'closing-compose.html')).href,{waitUntil:'load'});
 await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth));
 const screenshot=await page.locator('.closing').screenshot();
 await sharp(screenshot).jpeg({quality:92,mozjpeg:true}).toFile(path.join(__dirname,'assets/closing/closing-final-v3.jpg'));
 await browser.close();
 console.log('Closing rendered: 1200 × 930');
})().catch(e=>{console.error(e);process.exit(1)});
