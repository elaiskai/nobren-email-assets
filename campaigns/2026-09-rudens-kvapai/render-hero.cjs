const {chromium}=require('playwright');
const sharp=require('sharp');
const path=require('path');
const {pathToFileURL}=require('url');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const page=await browser.newPage({viewport:{width:1200,height:1380},deviceScaleFactor:1});
 await page.goto(pathToFileURL(path.join(__dirname,'hero-compose.html')).href,{waitUntil:'load'});
 await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
 await sharp(await page.locator('.hero').screenshot()).jpeg({quality:92,mozjpeg:true}).toFile(path.join(__dirname,'assets/hero/hero-final.jpg'));
 await browser.close();
 console.log('Hero saved: 1200 × 1380');
})().catch(e=>{console.error(e);process.exit(1)});
