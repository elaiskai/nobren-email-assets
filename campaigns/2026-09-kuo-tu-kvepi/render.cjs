const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const {pathToFileURL}=require('url');
const hostCss=`#emailHost h1,#emailHost h2,#emailHost h3{font-family:Georgia,serif;text-align:left;margin:0 0 24px!important;padding:0;line-height:1.2;color:#333}#emailHost p{margin:0 0 18px!important;font-family:Georgia,serif;line-height:1.5}#emailHost td{font-family:Georgia,serif;text-align:left}#emailHost table{border-spacing:2px;border-collapse:separate}#emailHost img{display:inline;vertical-align:baseline}`;
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const hosted=process.argv.includes('--hosted');const reports=[];
for(const [name,width]of[['desktop',820],['mobile',390],['mobile-320',320]]){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
 await page.goto(pathToFileURL(path.join(__dirname,hosted?'newsletter-klaviyo.html':'newsletter.html')).href,{waitUntil:'load'});await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth));
 const report=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth,wrap:document.querySelector('.nq-wrap').getBoundingClientRect().width,images:document.images.length,height:document.body.scrollHeight,cards:document.querySelectorAll('.nq-product').length,overflow:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>e.tagName+'.'+e.className),clipped:[...document.querySelectorAll('p,h1,h2,h3,a')].filter(e=>e.clientWidth&&e.scrollWidth>e.clientWidth+1).map(e=>e.textContent),introAlign:getComputedStyle(document.querySelector('.nq-intro h1')).textAlign,tablesAccessible:[...document.querySelectorAll('table')].every(e=>e.getAttribute('role')==='presentation'),ctaRows:[...document.querySelectorAll('.nq-grid')].map(e=>[...e.querySelectorAll('.nq-product-button')].map(a=>Math.round(a.getBoundingClientRect().y)))}));
 if(report.overflow.length||report.clipped.length||report.cards!==6||report.images!==10||!report.tablesAccessible||report.introAlign!=='center'||report.ctaRows.some(r=>Math.abs(r[0]-r[1])>1))throw Error(JSON.stringify(report));
 await page.screenshot({path:path.join(__dirname,`preview-${hosted?'hosted-':''}${name}.png`),fullPage:true});
 const bounds=await page.evaluate(()=>{const wrap=document.querySelector('.nq-wrap').getBoundingClientRect(),intro=document.querySelector('.nq-intro').getBoundingClientRect(),grids=[...document.querySelectorAll('.nq-grid')].map(e=>e.getBoundingClientRect()),ending=document.querySelector('.nq-ending').getBoundingClientRect(),image=document.querySelector('img[src$="closing/dialogue.png"]').getBoundingClientRect();return{hero:{x:wrap.x,y:wrap.y+scrollY,width:wrap.width,height:intro.bottom-wrap.y},products:{x:wrap.x,y:grids[0].top+scrollY,width:wrap.width,height:grids.at(-1).bottom-grids[0].top},closing:{x:wrap.x,y:image.top+scrollY,width:wrap.width,height:ending.bottom-image.top}};});
 for(const [key,clip] of Object.entries(bounds))await page.screenshot({path:path.join(__dirname,`preview-${key}-${name}.png`),clip,fullPage:true});
 if(hosted){
  const block=fs.readFileSync(path.join(__dirname,'klaviyo-block.html'),'utf8');let baseline;
  for(const external of [false,true]){
   await page.setContent(`<!doctype html><html lang="lt"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="margin:0;padding:0"><div id="emailHost" style="width:600px;max-width:100%;margin:0 auto">${block}</div>${external?'<style>'+hostCss+'</style>':''}</body></html>`,{waitUntil:'load'});await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth));
   const embedded=await page.evaluate(()=>({height:document.body.scrollHeight,scroll:document.documentElement.scrollWidth,intro:getComputedStyle(document.querySelector('.nq-intro h1')).textAlign,images:document.images.length}));
   if(embedded.scroll>width||embedded.images!==10||embedded.intro!=='center')throw Error('Klaviyo block failed '+JSON.stringify(embedded));
   if(!external)baseline=embedded;else if(embedded.height!==baseline.height)throw Error('Host styles changed email height '+JSON.stringify({baseline,embedded}));
  }
  report.hostStylesIsolated=true;
 }
 reports.push({name,...report});console.log(JSON.stringify({name,...report}));await page.close();
}
await browser.close();fs.writeFileSync(path.join(__dirname,hosted?'qa-hosted-report.json':'qa-report.json'),JSON.stringify(reports,null,2));})().catch(e=>{console.error(e);process.exit(1)});
