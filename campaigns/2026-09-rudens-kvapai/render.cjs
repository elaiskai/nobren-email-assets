const {chromium}=require('playwright');
const path=require('path');
const {pathToFileURL}=require('url');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const hosted=process.argv.includes('--hosted');
 for(const [name,width] of [['desktop',820],['mobile',390],['mobile-320',320]]){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  await page.goto(pathToFileURL(path.join(__dirname,hosted?'newsletter-klaviyo.html':'newsletter.html')).href,{waitUntil:'load'});
  await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0),{},{timeout:30000});
  const report=await page.evaluate(()=>({width:innerWidth,container:document.querySelector('.wrap').getBoundingClientRect().width,scroll:document.documentElement.scrollWidth,height:document.body.scrollHeight,images:document.images.length,products:document.querySelectorAll('.product-title').length,allPresentation:[...document.querySelectorAll('table')].every(t=>t.getAttribute('role')==='presentation'),overflow:[...document.querySelectorAll('.wrap *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1||e.scrollWidth>e.clientWidth+2&&['P','H3','A'].includes(e.tagName)).map(e=>({tag:e.tagName,text:e.textContent.slice(0,70)}))}));
  if(report.images!==11||report.products!==8||report.scroll>width||report.overflow.length||!report.allPresentation)throw Error(JSON.stringify(report));
  await page.screenshot({path:path.join(__dirname,`preview-${name}.png`),fullPage:true});
  if(name!=='mobile-320')for(const i of [0,2])await page.locator('.product-pair').nth(i).screenshot({path:path.join(__dirname,`preview-${i===0?'women':'men'}-${name}.png`)});
  const a=await page.locator('.madam-start').boundingBox();const b=await page.locator('.madam-content').boundingBox();if(a&&b){const scrollY=await page.evaluate(()=>window.scrollY);await page.screenshot({path:path.join(__dirname,`preview-madam-${name}.png`),fullPage:true,clip:{x:a.x,y:a.y+scrollY,width:a.width,height:b.y+b.height-a.y}});}
  console.log(name,JSON.stringify(report));
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
