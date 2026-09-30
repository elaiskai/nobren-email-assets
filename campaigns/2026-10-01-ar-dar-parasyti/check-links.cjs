const fs=require('fs'),path=require('path'),crypto=require('crypto');
(async()=>{
const html=fs.readFileSync(path.join(__dirname,'newsletter-klaviyo.html'),'utf8');
if(html.includes('VISUAL_COMMIT'))throw Error('Unpublished asset placeholder');
const sources=[...html.matchAll(/src="([^"]+)"/g)].map(m=>m[1]);
if(sources.length!==4)throw Error('Expected logo, hero and two products');
const images=await Promise.all(sources.map(async url=>{const r=await fetch(url);if(!r.ok)throw Error('Image '+r.status+' '+url);const bytes=Buffer.from(await r.arrayBuffer());const local=fs.readFileSync(path.join(__dirname,'assets',url.split('/assets/')[1]));const hash=b=>crypto.createHash('sha256').update(b).digest('hex');if(hash(bytes)!==hash(local))throw Error('Image mismatch '+url);return{url,status:r.status,bytes:bytes.length,sha256:hash(bytes)};}));
const products=JSON.parse(fs.readFileSync(path.join(__dirname,'products.json'),'utf8'));
const urls=['https://nobrenparfum.lt/lt/nauji-kvapai',...products.map(p=>p.url)];
const links=await Promise.all(urls.map(async url=>{const r=await fetch(url);if(!r.ok)throw Error('Page '+r.status+' '+url);const html=await r.text();return{url,status:r.status,title:html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim(),checkedAt:new Date().toISOString()};}));
fs.writeFileSync(path.join(__dirname,'qa/sources.json'),JSON.stringify(links,null,2)+'\n');
fs.writeFileSync(path.join(__dirname,'qa/links.json'),JSON.stringify({checkedAt:new Date().toISOString(),images,links},null,2)+'\n');
console.log(JSON.stringify({images:images.length,links:links.length,allMatch:true}));
})().catch(e=>{console.error(e);process.exit(1)});
