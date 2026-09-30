const fs=require('fs'),path=require('path');
const P='#FFFDF9',INK='#302823',MUTED='#756960',ACCENT='#742D3C',BORDER='#E5D9CF';
const subject='Ar dar parašyti?',preheader='Nauji kvapai tavo namams. Ar dar nori Nobren naujienų?';
const property='nobren_keep_emails_20261001',redirect='https://nobrenparfum.lt/lt/nauji-kvapai';
const keepTag=`{% update_property_link '${property}' 'yes' '${redirect}' %}`;
const assetCommit='61df4a17ddd2445f90fa8b2022ad5db4b713dbf6';
const cdn='https://raw.githubusercontent.com/elaiskai/nobren-email-assets/'+assetCommit+'/campaigns/2026-10-01-ar-dar-parasyti/';
const products=JSON.parse(fs.readFileSync(path.join(__dirname,'products.json'),'utf8'));
const descriptions={'amber-expresso':'Šilta kava ir švelni ambra jaukiam namų fonui.','velvet-dust':'Oda, agarmedis ir šilta, kreminė mediena.'};
for(const p of products){if(p.available_for_order!=='1'||(p.quantity<=0&&!p.allow_oosp)||!p.flags?.new||!Object.values(p.attributes).some(a=>a.name==='50ml')||p.price_amount!==18.9)throw Error('Check product: '+p.id);p.copy=descriptions[p.id];}
if(products.length!==2)throw Error('Expected two news products');
const esc=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
const track=(url,key)=>{const u=new URL(url);u.searchParams.set('utm_source','klaviyo');u.searchParams.set('utm_medium','email');u.searchParams.set('utm_campaign','2026_10_01_ar_dar_parasyti');u.searchParams.set('utm_content',key);return esc(u.href);};
const table=(body,attrs='',extra='')=>`<table role="presentation" cellpadding="0" cellspacing="0" border="0" ${attrs} style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0pt;mso-table-rspace:0pt;${extra}">${body}</table>`;
const image=(file,w,h,alt)=>`<img src="assets/${file}" width="${w}" height="${h}" alt="${alt}" style="display:block;width:100%;max-width:${w}px;height:auto;border:0;">`;
const css=`@media screen and (max-width:620px){.ns26-outer{padding:0!important}.ns26-wrap{width:100%!important}.ns26-main{padding:3px 25px 24px!important}.ns26-title{font-size:33px!important;line-height:38px!important}.ns26-footer{padding:19px 25px 24px!important}.ns26-grid{padding:4px 18px 26px!important}.ns26-gap{width:16px!important}.ns26-product-title{font-size:21px!important;line-height:25px!important}.ns26-product-copy{font-size:12px!important;line-height:18px!important}.ns26-product-button{font-size:10px!important;letter-spacing:0!important}}
@media screen and (max-width:350px){.ns26-main{padding-left:21px!important;padding-right:21px!important}.ns26-title{font-size:30px!important;line-height:35px!important}.ns26-copy{font-size:14px!important;line-height:22px!important}.ns26-button{font-size:11px!important;letter-spacing:.2px!important}.ns26-grid{padding-left:15px!important;padding-right:15px!important}.ns26-gap{width:12px!important}.ns26-product-title{font-size:19px!important;line-height:24px!important}}`;
const paragraph=(s,extra='')=>`<p class="ns26-copy" style="margin:0!important;padding:0;font:16px/25px Arial,Helvetica,sans-serif;color:${INK};text-align:left!important;${extra}">${s}</p>`;
const gap='<td class="ns26-gap" width="22" style="width:22px;padding:0;font-size:0;line-height:0;background-color:transparent!important;">&nbsp;</td>';
const pair=fn=>'<tr>'+products.map(fn).join(gap)+'</tr>';
const cell=(body,padding)=>`<td valign="top" style="padding:${padding};vertical-align:top;background-color:transparent!important;text-align:left;">${body}</td>`;
const cards=table([
pair(p=>cell(`<a href="${track(p.url,p.id+'_image')}">${image('products/'+p.id+'.jpg',247,280,'Nobren '+p.displayName+' namų kvapas, 50 ml')}</a>`,'0')),
pair(p=>cell(`<h3 class="ns26-product-title" style="margin:0!important;padding:0;font:700 24px/28px Arial,sans-serif;color:${INK};letter-spacing:-.7px;text-align:left!important;">${p.displayName}</h3>`,'13px 0 0')),
pair(p=>cell('<p style="margin:0!important;padding:0;font:11px/17px Arial,sans-serif;color:'+MUTED+';text-align:left!important;">50 ml · namų kvapas</p>','4px 0 0')),
pair(p=>cell(`<p class="ns26-product-copy" style="margin:0!important;padding:0;font:13px/20px Arial,sans-serif;color:${MUTED};text-align:left!important;">${p.copy}</p>`,'8px 0 0')),
pair(p=>cell(`<p class="ns26-product-price" style="margin:0!important;padding:0;font:700 25px/31px Arial,sans-serif;color:${ACCENT};text-align:left!important;">${p.price.replace(/\s+€/,'&nbsp;€')}</p>`,'11px 0 0')),
pair(p=>cell(table(`<tr><td align="center" style="padding:0;border:1px solid ${ACCENT};background-color:transparent!important;text-align:center;mso-padding-alt:13px 4px;"><a class="ns26-product-button" href="${track(p.url,p.id+'_cta')}" style="display:block;padding:13px 4px;font:700 11px/18px Arial,sans-serif;letter-spacing:.2px;color:${ACCENT}!important;text-decoration:none;text-align:center!important;mso-padding-alt:0;">PERŽIŪRĖTI PREKĘ</a></td></tr>`,'width="100%"'),'11px 0 0'))
].join('\n'),'class="ns26-products" width="100%"','width:100%;table-layout:fixed;');
const rows=`
<tr><td style="padding:0;line-height:0;font-size:0;background-color:transparent!important;">${image('logo-strip.png',600,72,'Nobren Parfum LT')}</td></tr>
<tr><td style="padding:0;line-height:0;font-size:0;background-color:transparent!important;">${image('hero/hero-home-v1.jpg',600,400,'Naujienos iš Nobren. Nauji kvapai tavo namams.')}</td></tr>
<tr><td class="ns26-main" style="padding:5px 42px 28px;background-color:transparent!important;text-align:left;">
<h1 class="ns26-title" style="margin:0 0 13px!important;padding:0;font:700 36px/41px Arial,sans-serif;letter-spacing:-1.2px;color:${ACCENT};text-align:left!important;">Ar dar parašyti?</h1>
${paragraph('„Nobren“ naujienų lentynoje — kvapai namams. Jei nori apie mūsų atradimus girdėti ir toliau, likime ryšyje.')}
${table(`<tr><td style="padding:19px 0 0;background-color:transparent!important;">${table(`<tr><td bgcolor="${ACCENT}" align="center" style="padding:0;background-color:${ACCENT}!important;text-align:center;mso-padding-alt:17px 18px;"><a class="ns26-button" href="${keepTag}" style="display:block;padding:17px 18px;font:700 12px/18px Arial,sans-serif;letter-spacing:.5px;text-decoration:none;color:#FFFFFF!important;text-align:center!important;mso-padding-alt:0;">TAIP, NORIU GAUTI LAIŠKUS</a></td></tr>`,'width="100%"')}</td></tr>`,'width="100%"')}
<p style="margin:10px 0 0!important;padding:0;font:12px/19px Arial,sans-serif;color:${MUTED};text-align:center!important;">Vienas paspaudimas — ir liekame ryšyje.</p>
</td></tr>
<tr><td class="ns26-main" style="padding:0 42px 17px;background-color:transparent!important;text-align:left;"><p style="margin:0 0 7px!important;padding:0;font:700 10px/16px Arial,sans-serif;letter-spacing:1.3px;color:${ACCENT};text-align:left!important;">NAMŲ KVAPŲ NAUJIENOS</p><h2 style="margin:0!important;padding:0;font:700 27px/32px Arial,sans-serif;letter-spacing:-.7px;color:${INK};text-align:left!important;">Dvi naujos pažintys.</h2></td></tr>
<tr><td class="ns26-grid" style="padding:4px 42px 30px;background-color:transparent!important;">${cards}</td></tr>
<tr><td class="ns26-main" style="padding:0 42px 27px;background-color:transparent!important;text-align:left;">
${paragraph('Jei į šį laišką nesureaguosi, daugiau naujienlaiškių nebesiųsime.','font-size:14px;line-height:22px;color:'+MUTED+';')}
${paragraph('Norisi atsisveikinti? <a class="ns26-unsubscribe" href="{% unsubscribe_link %}" style="color:'+ACCENT+'!important;text-decoration:underline;">Atsisakyti laiškų</a>.','padding-top:9px;font-size:14px;line-height:22px;color:'+MUTED+';')}
${paragraph('Iki kito kvapo,<br><strong>Nobren komanda</strong>','padding-top:20px;font-size:14px;line-height:22px;')}
</td></tr>
<tr><td class="ns26-footer" style="padding:19px 42px 25px;border-top:1px solid ${BORDER};background-color:transparent!important;text-align:left;"><p style="margin:0!important;padding:0;font:10px/17px Arial,sans-serif;color:${MUTED};text-align:left!important;">MB „Nobren parfum“ · Gintaro g. 56, Vydmantai<br>© 2026 Nobren Parfum</p></td></tr>`;
const inner=`<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" class="ns26-wrap" bgcolor="${P}" style="width:100%;max-width:600px;margin:0 auto;border-collapse:collapse;border-spacing:0;table-layout:fixed;background-color:${P}!important;">${rows}</table>`;
const body=`<div style="display:none!important;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${preheader}</div><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#EEE7E0" style="width:100%;border-collapse:collapse;border-spacing:0;background-color:#EEE7E0!important;"><tr><td align="center" class="ns26-outer" style="padding:24px 12px;text-align:center;"><!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->${inner}<!--[if mso]></td></tr></table><![endif]--></td></tr></table>`;
const full=b=>`<!doctype html><html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>Nobren · Ar dar parašyti?</title><style>html,body{margin:0!important;padding:0!important;width:100%!important}${css}</style></head><body style="margin:0;padding:0;-webkit-text-size-adjust:100%;background:#EEE7E0;">${b}</body></html>`;
const hosted=s=>s.replace(/src="(assets\/[^"\s]+)"/g,(_,file)=>'src="'+cdn+file+'"');
const block=`<style>${css}</style>\n`+hosted(body).replace('padding:24px 12px;','padding:0;');
const preview=full(body).replace(keepTag,redirect).replace('{% unsubscribe_link %}','#preview-unsubscribe');
for(const [name,content]of [['newsletter.html',preview],['newsletter-klaviyo.html',hosted(full(body))],['klaviyo-block.html',block],['klaviyo-block.txt',block]])fs.writeFileSync(path.join(__dirname,name),content);
const text=`Subject: ${subject}\nPreview line: ${preheader}\n\nNAUJI KVAPAI. TAVO NAMAMS.\n\nAr dar parašyti?\n„Nobren“ naujienų lentynoje — kvapai namams. Jei nori apie mūsų atradimus girdėti ir toliau, likime ryšyje.\n\nTAIP, NORIU GAUTI LAIŠKUS: ${keepTag}\nVienas paspaudimas — ir liekame ryšyje.\n\nDVI NAUJOS PAŽINTYS\n${products.map(p=>`${p.displayName}\n50 ml · namų kvapas · ${p.price}\n${p.copy}\nPeržiūrėti prekę: ${track(p.url,p.id+'_cta').replace(/&amp;/g,'&')}`).join('\n\n')}\n\nJei į šį laišką nesureaguosi, daugiau naujienlaiškių nebesiųsime.\nNorisi atsisveikinti? Atsisakyti laiškų: {% unsubscribe_link %}\n\nIki kito kvapo,\nNobren komanda\n\nMB „Nobren parfum“\nGintaro g. 56, Vydmantai\n© 2026 Nobren Parfum\n`;
fs.writeFileSync(path.join(__dirname,'newsletter.txt'),text);
console.log(JSON.stringify({subject,preheader,property,products:products.map(p=>({name:p.displayName,price:p.price})),blockBytes:Buffer.byteLength(block)}));
