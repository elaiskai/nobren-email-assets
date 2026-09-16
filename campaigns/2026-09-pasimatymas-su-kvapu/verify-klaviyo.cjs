const fs=require('fs');
const path=require('path');
const {chromium}=require('playwright');
const hostCss=`#klaviyoHost h1,#klaviyoHost h2,#klaviyoHost h3{font-family:Georgia,serif;text-align:left;margin:0 0 24px!important;padding:0;line-height:1.2;color:#333}#klaviyoHost p{margin:0 0 18px!important;font-family:Georgia,serif;line-height:1.5}#klaviyoHost td{font-family:Georgia,serif;text-align:left}#klaviyoHost table{border-spacing:2px;border-collapse:separate}#klaviyoHost img{display:inline;vertical-align:baseline}`;
const makePage=(block,host=false)=>`<!doctype html><html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background:#ECEDE8"><div id="klaviyoHost" style="width:600px;max-width:100%;margin:0 auto">${block}</div>${host?'<style>'+hostCss+'</style>':''}</body></html>`;
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const fixed=fs.readFileSync(path.join(__dirname,'klaviyo-block.html'),'utf8');
 const oldPath=path.join(__dirname,'before-klaviyo-v5/klaviyo-block.html');
 const reports=[];
 async function render(block,width,host,label){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  await page.setContent(makePage(block,host),{waitUntil:'load'});
  await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
  const result=await page.evaluate(()=>{
   const intro=document.querySelector('.intro'),h=intro.querySelector('h1'),p=intro.querySelector('.hero-copy'),button=intro.querySelector('a');
   const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}};
   return{width:innerWidth,scroll:document.documentElement.scrollWidth,images:document.images.length,headingAlign:getComputedStyle(h).textAlign,headingMargin:getComputedStyle(h).margin,copyMargin:getComputedStyle(p).margin,intro:rect(intro),heading:rect(h),copy:rect(p),button:rect(button),height:document.body.scrollHeight};
  });
  if(label){
   const r=result.intro;
   await page.screenshot({path:path.join(__dirname,`preview-${label}.png`),clip:{x:r.x,y:r.y-80,width:r.width,height:r.height+105},fullPage:true});
  }
  await page.close();return result;
 }
 if(fs.existsSync(oldPath)){
  const before=await render(fs.readFileSync(oldPath,'utf8'),820,true,'klaviyo-before');
  if(before.headingAlign!=='left'||before.copyMargin==='0px')throw Error('Fixture failed to reproduce host style collision');
  console.log('Reproduced previous issue:',JSON.stringify(before));
 }
 for(const [label,width] of [['desktop',820],['mobile',390],['mobile-320',320]]){
  const standalone=await render(fixed,width,false);
  const embedded=await render(fixed,width,true,`klaviyo-fixed-${label}`);
  if(embedded.headingAlign!=='center'||embedded.headingMargin!=='0px'||embedded.copyMargin!=='0px'||embedded.scroll!==width||embedded.images!==13)throw Error('Embedded regression: '+JSON.stringify(embedded));
  for(const key of ['intro','heading','copy','button'])for(const dim of ['y','height'])if(Math.abs(standalone[key][dim]-embedded[key][dim])>.1)throw Error(`Host shifted ${key}.${dim}: ${standalone[key][dim]} != ${embedded[key][dim]}`);
  if(standalone.height!==embedded.height)throw Error('Host styles changed the full email height: '+JSON.stringify({standalone,embedded}));
  reports.push({label,standalone,embedded});
  console.log('Verified host isolation:',label,JSON.stringify(embedded));
 }
 // The intro itself must also stay aligned when an editor discards style tags.
 const noStyle=await render(fixed.replace(/<style>[\s\S]*?<\/style>/g,''),820,true);
 if(noStyle.headingAlign!=='center'||noStyle.headingMargin!=='0px'||noStyle.copyMargin!=='0px')throw Error('Inline fallback failed');
 console.log('Intro inline fallback passed');
 fs.writeFileSync(path.join(__dirname,'qa-klaviyo-report.json'),JSON.stringify(reports,null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
