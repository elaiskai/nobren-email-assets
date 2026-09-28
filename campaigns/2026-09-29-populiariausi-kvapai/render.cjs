const {chromium}=require('playwright'),path=require('path'),fs=require('fs');const {pathToFileURL}=require('url');
(async()=>{const hosted=process.argv.includes('--hosted');const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const reports=[];try{
for(const [name,width]of[['desktop',820],['mobile',390],['mobile-320',320]]){
 const page=await browser.newPage({viewport:{width,height:950},deviceScaleFactor:1,colorScheme:'light'});await page.goto(pathToFileURL(path.join(__dirname,hosted?'newsletter-klaviyo.html':'newsletter.html')).href,{waitUntil:'load'});await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
 const report=await page.evaluate(()=>{
  const titles=[...document.querySelectorAll('.fav-product-title')],prices=[...document.querySelectorAll('.fav-price')],ctas=[...document.querySelectorAll('.fav-product-button')];
  const descriptions=[...document.querySelectorAll('.fav-description')];
  const productInfo=titles.map((el,i)=>({title:el.textContent,price:prices[i].textContent,volume:prices[i].nextElementSibling.textContent,url:ctas[i].href,descriptionGap:Math.round(prices[i].getBoundingClientRect().top-descriptions[i].getBoundingClientRect().bottom)}));
  const alignment=[...document.querySelectorAll('.fav-pair')].map(table=>[...table.querySelectorAll('.fav-product-button')].map(a=>Math.round(a.getBoundingClientRect().top)));
  const overflow=[...document.querySelectorAll('body *')].filter(el=>el.getBoundingClientRect().right>innerWidth+1||el.getBoundingClientRect().left< -1).map(e=>e.tagName+'.'+e.className);
  return{width:innerWidth,container:document.querySelector('.fav-wrap').getBoundingClientRect().width,height:document.body.scrollHeight,images:[...document.images].map(i=>({src:i.getAttribute('src'),w:i.naturalWidth,h:i.naturalHeight})),productInfo,alignment,overflow,presentationTables:[...document.querySelectorAll('table')].every(t=>t.getAttribute('role')==='presentation'),offer:document.querySelector('.fav-offer').innerText,footerColor:getComputedStyle(document.querySelector('.fav-offer')).backgroundColor};
 });
 if(report.overflow.length||report.productInfo.length!==6||report.productInfo.some(p=>!p.price.includes('29,90')||!p.volume.includes('30 ml')||p.descriptionGap>40)||report.alignment.some(a=>Math.abs(a[0]-a[1])>1)||!report.presentationTables||!report.offer.includes('44,87')||!report.offer.includes('49,86')||!report.offer.includes('−10 %'))throw Error('Layout check failed '+name+' '+JSON.stringify(report));
 await page.screenshot({path:path.join(__dirname,`preview-${hosted?'hosted-':''}${name}.png`),fullPage:true});
 if(name!=='mobile-320')for(const [part,selector]of[['hero','.fav-hero-group'],['products','.fav-products'],['offer','.fav-offer']])await page.locator(selector).screenshot({path:path.join(__dirname,`preview-${part}-${name}.png`)});
 reports.push({name,...report});console.log(JSON.stringify({name,height:report.height,overflow:report.overflow,descriptionGaps:report.productInfo.map(p=>p.descriptionGap)}));await page.close();
}
}finally{await browser.close();}fs.writeFileSync(path.join(__dirname,'qa',hosted?'hosted.json':'local.json'),JSON.stringify(reports,null,2));})().catch(e=>{console.error(e);process.exit(1)});
