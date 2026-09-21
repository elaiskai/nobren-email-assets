const fs=require('fs');const path=require('path');
const root='https://nobrenparfum.lt/lt/nisiniai-kvepalai/';
const selected=[
 ['T21','Lost Cherry','-nobren-nisiniai-kvepalai-unisex-t21.html'],
 ['B5','Angels Share','-nobren-nisiniai-kvepalai-unisex-b5.html'],
 ['I6','Atomic Rose','-ikvepti-atomic-rose-nisiniai-kvepalai-unisex-i6.html'],
 ['P20','Delina','-ikvepti-delina-nisiniai-kvepalai-moterims-p20.html'],
 ['X3','Alexandria II','-nobren-nisiniai-kvepalai-unisex-x3.html'],
 ['S1','Erba Pura','-ikvepti-ebra-pura-nisiniai-kvepalai-unisex-s1.html']
];
const decode=s=>s.replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const clean=s=>decode(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
async function download(url,file){const r=await fetch(url,{signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error(r.status+' '+url);fs.writeFileSync(path.join(__dirname,file),Buffer.from(await r.arrayBuffer()));}
(async()=>{
 const results=await Promise.allSettled(selected.map(async([code,displayName,slug])=>{
  const url=root+slug;const r=await fetch(url,{signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error(r.status+' '+url);const html=await r.text();const m=html.match(/data-product="([^"]+)"/);if(!m)throw Error('Product data missing: '+code);const p=JSON.parse(decode(m[1]));
  const image=p.cover.large.url;await download(image,'assets/products/'+code.toLowerCase()+'.jpg');
  return{code,displayName,name:p.name,url,image,price:p.price,price_amount:p.price_amount,attributes:p.attributes,quantity:p.quantity,available_for_order:p.available_for_order,new_bottle:clean(p.description_short).includes('NAUJO DIZAINO'),description_short:clean(p.description_short),features:p.features,checkedAt:new Date().toISOString()};
 }));
 for(const r of results)if(r.status==='rejected')throw r.reason;
 const products=results.map(r=>r.value);fs.writeFileSync(path.join(__dirname,'products.json'),JSON.stringify(products,null,2));
 await download('https://nobrenparfum.lt/img/shop_logo.png','assets/brand/logo.png');
 for(const p of products)console.log(JSON.stringify({code:p.code,name:p.name,price:p.price,volume:Object.values(p.attributes).map(a=>a.name),quantity:p.quantity,newBottle:p.new_bottle,notes:p.features.filter(f=>f.name.includes('NATOS')).map(f=>f.value)}));
})().catch(e=>{console.error(e);process.exit(1)});
