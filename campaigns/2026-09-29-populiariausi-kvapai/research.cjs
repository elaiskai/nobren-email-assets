const fs=require('fs'),path=require('path');
const root='https://nobrenparfum.lt/lt/';
const selected=[
 ['c35','C35','Aventus','nisiniai-kvepalai/-ikvepti-aventus-nisiniai-kvepalai-vyrams-c35.html'],
 ['p20','P20*','Delina','nisiniai-kvepalai/-ikvepti-delina-nisiniai-kvepalai-moterims-p20.html'],
 ['t3','T3*','Kirke','nisiniai-kvepalai/-ikvepti-kirke-nisiniai-kvepalai-unisex-t3.html'],
 ['i3','I3 / 13','Side Effect','nisiniai-kvepalai/-ikvepti-side-effect-nisiniai-kvepalai-unisex-i3.html'],
 ['n7','N7','Fleur Narcotique','nisiniai-kvepalai/-nobren-fle-nisiniai-kvepalai-moterims-n7.html'],
 ['y12','Y12','MYSLF','kvepalai-vyrams/-ikvepti-myslf-kvepalai-vyrams-y12.html'],
 ['top10','TOP 10','TOP 10','dovanu-rinkiniai/--dovanu-rinkinys-idealu-top10.html']
];
const decode=s=>s.replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const clean=s=>decode(s||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
async function download(url,dest){const r=await fetch(url,{signal:AbortSignal.timeout(40000)});if(!r.ok)throw Error(r.status+' '+url);fs.writeFileSync(path.join(__dirname,dest),Buffer.from(await r.arrayBuffer()));}
(async()=>{
 for(const dir of ['assets/products','assets/brand','assets/hero','assets/closing','qa'])fs.mkdirSync(path.join(__dirname,dir),{recursive:true});
 const results=await Promise.allSettled(selected.map(async([id,code,displayName,slug])=>{
  const url=root+slug;const r=await fetch(url,{signal:AbortSignal.timeout(40000)});if(!r.ok)throw Error(r.status+' '+url);const html=await r.text();const m=html.match(/data-product="([^"]+)"/);if(!m)throw Error('Product data missing '+id);const p=JSON.parse(decode(m[1]));
  const image=p.cover.large.url;await download(image,'assets/products/'+id+'.jpg');
  return{id,code,displayName,name:p.name,url,image,price:p.price,price_amount:p.price_amount,regular_price:p.regular_price,regular_price_amount:p.regular_price_amount,has_discount:p.has_discount,discount_percentage:p.discount_percentage,attributes:p.attributes,quantity:p.quantity,available_for_order:p.available_for_order,allow_oosp:p.allow_oosp,new_bottle:clean(p.description_short).includes('NAUJO DIZAINO'),description_short:clean(p.description_short),description:clean(p.description),features:p.features,checkedAt:new Date().toISOString()};
 }));for(const r of results)if(r.status==='rejected')throw r.reason;
 const products=results.map(r=>r.value);fs.writeFileSync(path.join(__dirname,'products.json'),JSON.stringify(products,null,2));await download('https://nobrenparfum.lt/img/shop_logo.png','assets/brand/logo.png');
 for(const p of products)console.log(JSON.stringify({id:p.id,price:p.price,regular:p.regular_price,discount:p.discount_percentage,quantity:p.quantity,available:p.available_for_order,allow_oosp:p.allow_oosp}));
})().catch(e=>{console.error(e);process.exit(1)});
