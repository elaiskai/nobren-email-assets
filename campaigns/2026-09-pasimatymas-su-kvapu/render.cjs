const {chromium} = require('playwright');
const {pathToFileURL} = require('url');
const path = require('path');
const fs = require('fs');
(async()=>{
 const hosted=process.argv.includes('--hosted');
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const reports=[];
 for(const [name,width] of [['desktop',820],['mobile',390],['mobile-320',320]]){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  await page.goto(pathToFileURL(path.join(__dirname,hosted?'newsletter-klaviyo.html':'newsletter.html')).href,{waitUntil:'load'});
  await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
  await page.screenshot({path:path.join(__dirname,`preview-${hosted?'hosted-':''}${name}.png`),fullPage:true});
  const report=await page.evaluate(()=>({containerWidth:document.querySelector('.wrap').getBoundingClientRect().width,width:innerWidth,scroll:document.documentElement.scrollWidth,height:document.body.scrollHeight,images:[...document.images].map(i=>({src:i.getAttribute('src'),alt:i.alt,w:i.naturalWidth,h:i.naturalHeight})),products:[...document.querySelectorAll('.product-info')].map(e=>({title:e.querySelector('h3').textContent,priceCorrect:e.textContent.includes('29,90\u00a0€'),volumeCorrect:e.textContent.includes('30 ml'),cta:e.querySelector('a').href})),tablesAccessible:[...document.querySelectorAll('table')].every(t=>t.getAttribute('role')==='presentation'),overflow:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>e.tagName+'.'+e.className)}));
  reports.push({name,...report});
  if(report.overflow.length||report.products.length!==6||report.products.some(p=>!p.priceCorrect||!p.volumeCorrect)||!report.tablesAccessible)throw Error('Email preflight failed: '+name);
  console.log(name,JSON.stringify({containerWidth:report.containerWidth,height:report.height,images:report.images.length,products:report.products.length,overflow:report.overflow}));
  if(name!=='mobile-320'){
   const introBounds=await page.evaluate(()=>{const wrap=document.querySelector('.wrap').getBoundingClientRect();const last=document.querySelector('.note-gutter').closest('tr').nextElementSibling;return{x:wrap.x,y:wrap.y+scrollY,width:wrap.width,height:last.getBoundingClientRect().bottom-wrap.y};});
   await page.screenshot({path:path.join(__dirname,`preview-intro-${name}.png`),clip:introBounds,fullPage:true});
   const product=page.locator('.product-title').first().locator('xpath=ancestor::td[contains(concat(" ", normalize-space(@class), " "), " pad ")][1]');
   await product.screenshot({path:path.join(__dirname,`preview-products-${name}.png`)});
   const bounds=await page.evaluate(()=>{const first=document.querySelector('.closing-pad');const last=first.closest('tr').nextElementSibling.nextElementSibling;const a=first.getBoundingClientRect(),b=last.getBoundingClientRect();return{x:a.x,y:a.y+scrollY,width:a.width,height:b.bottom-a.y};});
   await page.screenshot({path:path.join(__dirname,`preview-closing-${name}.png`),clip:bounds,fullPage:true});
  }
  await page.close();
 }
 await browser.close();
 fs.writeFileSync(path.join(__dirname,hosted?'qa-hosted-report.json':'qa-report.json'),JSON.stringify(reports,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
