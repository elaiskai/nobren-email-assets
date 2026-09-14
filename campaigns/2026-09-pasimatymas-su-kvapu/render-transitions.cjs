const {chromium}=require('playwright');
const sharp=require('sharp');
const {pathToFileURL}=require('url');
const path=require('path');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const page=await browser.newPage({viewport:{width:600,height:1800},deviceScaleFactor:1});
 await page.goto(pathToFileURL(path.join(__dirname,'notes-compose.html')).href,{waitUntil:'load'});
 await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth));
 for(const id of ['a','b','c']){
  const shot=await page.locator('#'+id).screenshot();
  await sharp(shot).jpeg({quality:94,mozjpeg:true}).toFile(path.join(__dirname,`assets/campaign/notes-${id}-v4.jpg`));
 }
 await browser.close();
 const curve='<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="168" viewBox="0 0 1200 168"><rect width="1200" height="168" fill="#FFFFFF"/><path d="M0 92 C320 14 820 152 1200 58 L1200 168 L0 168Z" fill="#22231F"/></svg>';
 await sharp(Buffer.from(curve)).png().toFile(path.join(__dirname,'assets/transitions/closing-entry-v4.png'));
 console.log('Rendered three blended ingredient panels and closing entry.');
})().catch(e=>{console.error(e);process.exit(1)});
