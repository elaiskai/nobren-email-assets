const fs=require('fs'),path=require('path');
const base=__dirname,GREEN='#173F38',PAPER='#F6F1E7',LIME='#DFEA9C',INK='#1D302B',MUTED='#626D64',WHITE='#FFFFFF';
const home='https://nobrenparfum.lt/lt/',collection=home+'populiariausi-kvepalai';
const campaign='2026_09_29_populiariausi_kvapai',assetCommit='20f1bf195484710ddd63dec4ad9aecde81ffe20e';
const cdn='https://raw.githubusercontent.com/elaiskai/nobren-email-assets/'+assetCommit+'/campaigns/2026-09-29-populiariausi-kvapai/';
const subject='Ar tavo kvapas tarp Nobren favoritų?';
const preheader='6 populiarūs kvapai ir TOP 10 mėginėlių rinkinys su −10 %.';
const copy={
 c35:{audience:'Vyrams',mood:'TVIRTAS CHARAKTERIS',notes:'Ananasai · beržas · muskusas',description:'Vaisių gaiva ir sodri mediena. Kai norisi kvapo su charakteriu.'},
 p20:{audience:'Moterims',mood:'ROŽIŲ ROMANTIKA',notes:'Turkiška rožė · bijūnai · ličiai',description:'Švelnūs žiedai su vaisių gaiva — subtiliam, jausmingam įspūdžiui.'},
 t3:{audience:'Unisex',mood:'VAISIŲ ENERGIJA',notes:'Marakuja · uogos · muskusas',description:'Sultingas, ryškus ir energingas. Vaisių mėgėjams, kurie nori išsiskirti.'},
 i3:{audience:'Unisex',mood:'SODRUS VAKARAS',notes:'Romas · tabakas · vanilė',description:'Šilta vanilė, prieskoniai ir romas — lėtam, jausmingam vakarui.'},
 n7:{audience:'Moterims',mood:'ŠVIESŪS ŽIEDAI',notes:'Ličiai · bijūnai · samanos',description:'Lengva vaisių ir žiedų dermė. Šviesus akcentas kasdienai.'},
 y12:{audience:'Vyrams',mood:'ŠVARI ELEGANCIJA',notes:'Bergamotė · apelsinų žiedai · pačiulis',description:'Gaivi pradžia ir švelni mediena. Tvarkingas, elegantiškas šleifas.'}
};
const data=JSON.parse(fs.readFileSync(path.join(base,'products.json'),'utf8'));
const products=data.filter(p=>p.id!=='top10').map(p=>({...p,...copy[p.id]})),set=data.find(p=>p.id==='top10');
for(const p of data){if(p.available_for_order!=='1'||(p.quantity<=0&&!p.allow_oosp))throw Error('Ordering unavailable: '+p.id);}
for(const p of products){const attrs=Object.values(p.attributes).map(a=>a.name);if(!copy[p.id]||!attrs.includes('30ml')||!attrs.includes('Su buteliuku')||Number(p.price_amount)!==29.9)throw Error('Check product variant '+p.id);}
if(products.length!==6||!set.has_discount||set.discount_percentage!=='−10%'||Number(set.price_amount)!==44.87)throw Error('Check 09-29 brief / TOP10 offer');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
const track=(url,key)=>{const u=new URL(url);u.searchParams.set('utm_source','klaviyo');u.searchParams.set('utm_medium','email');u.searchParams.set('utm_campaign',campaign);u.searchParams.set('utm_content',key);return u.href;};
const table=(body,attrs='')=>`<table role="presentation" cellpadding="0" cellspacing="0" border="0" ${attrs}>${body}</table>`;
const p=(text,style='',cls='')=>`<p${cls?` class="${cls}"`:''} style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;${style}">${text}</p>`;
const btn=(url,label,key,bg=GREEN,color=WHITE)=>table(`<tr><td bgcolor="${bg}" align="center" style="padding:0;background-color:${bg}!important;text-align:center;mso-padding-alt:16px 24px;"><a href="${esc(track(url,key))}" target="_blank" style="display:block;padding:16px 24px;font:700 12px/18px Arial,Helvetica,sans-serif;letter-spacing:.6px;color:${color}!important;text-align:center;text-decoration:none;mso-padding-alt:0;">${label} &nbsp;↗</a></td></tr>`,'align="center" style="margin:0 auto;"');
const img=(file,w,h,alt,extra='')=>`<img src="assets/${file}" width="${w}" height="${h}" alt="${esc(alt)}" ${extra} style="display:block;width:100%;max-width:${w}px;height:auto;border:0;">`;
const imageRow=(file,w,h,alt,url,key)=>`<tr><td style="padding:0;font-size:0;line-height:0;">${url?`<a href="${esc(track(url,key))}" target="_blank">`:''}${img(file,w,h,alt)}${url?'</a>':''}</td></tr>`;
const gap=`<td class="fav-gap" width="24" style="width:24px;padding:0;font-size:0;line-height:0;">&nbsp;</td>`;
const pair=(a,b,render)=>`<tr>${render(a)}${gap}${render(b)}</tr>`;
const cell=(content,padding='0',extra='')=>`<td valign="top" ${extra} style="padding:${padding};vertical-align:top;">${content}</td>`;
const productRows=[];
for(let i=0;i<products.length;i+=2){const a=products[i],b=products[i+1];productRows.push(`<tr><td class="fav-grid" style="padding:14px 34px 28px;">${table(`
${pair(a,b,x=>cell(p(x.mood,`font-size:10px;line-height:16px;letter-spacing:1px;font-weight:700;color:${GREEN};`,'fav-mood'),'0 0 10px'))}
${pair(a,b,x=>cell(`<a href="${esc(track(x.url,x.id+'_image'))}" target="_blank">${img('products/'+x.id+'.jpg',254,288,'Nobren '+x.displayName+' '+x.code)}</a>`,'0','class="fav-photo"'))}
${pair(a,b,x=>cell(`<h3 class="fav-product-title" style="margin:0;font:700 25px/29px Arial,Helvetica,sans-serif;letter-spacing:-.7px;color:${INK};">${x.displayName}</h3>`,'13px 0 0'))}
${pair(a,b,x=>cell(p(`NOBREN ${x.code} · ${x.audience}`,`font-size:10px;line-height:16px;letter-spacing:.3px;color:${MUTED};`),'5px 0 0'))}
${pair(a,b,x=>cell(p(x.notes,`font-size:12px;line-height:18px;font-weight:700;color:${INK};`,'fav-notes'),'9px 0 0'))}
${pair(a,b,x=>cell(p(x.description,`font-size:13px;line-height:20px;color:${MUTED};`,'fav-description'),'7px 0 0'))}
${pair(a,b,x=>cell(p(x.price.replace(/\s+€/,'&nbsp;€'),`font-size:27px;line-height:34px;font-weight:700;color:${GREEN};`,'fav-price')+p('30 ml · su buteliuku',`font-size:10px;line-height:17px;color:${MUTED};`),'12px 0 0'))}
${pair(a,b,x=>cell(table(`<tr><td bgcolor="${GREEN}" align="center" style="padding:0;background-color:${GREEN}!important;text-align:center;mso-padding-alt:15px 5px;"><a class="fav-product-button" href="${esc(track(x.url,x.id+'_cta'))}" target="_blank" style="display:block;padding:15px 5px;font:700 11px/16px Arial,Helvetica,sans-serif;letter-spacing:.2px;color:${WHITE}!important;text-decoration:none;text-align:center;mso-padding-alt:0;">PERŽIŪRĖTI PREKĘ</a></td></tr>`,'width="100%" style="width:100%;"'),'12px 0 0'))}
`,'class="fav-pair" width="100%" style="width:100%;table-layout:fixed;"')}</td></tr>`);}
const css=`
#nobren-favorites a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important}
@media screen and (max-width:620px){.fav-outer{padding:0!important}.fav-wrap{width:100%!important}.fav-pad{padding-left:24px!important;padding-right:24px!important}.fav-intro-title{font-size:31px!important;line-height:36px!important}.fav-copy{font-size:15px!important;line-height:24px!important}.fav-section-title{font-size:32px!important;line-height:37px!important}.fav-grid{padding:12px 17px 28px!important}.fav-gap{width:16px!important}.fav-mood{font-size:9px!important;letter-spacing:.4px!important;line-height:15px!important}.fav-product-title{font-size:22px!important;line-height:27px!important}.fav-notes{font-size:11px!important;line-height:17px!important}.fav-description{font-size:12px!important;line-height:18px!important}.fav-price{font-size:25px!important;line-height:31px!important}.fav-product-button{font-size:10px!important;letter-spacing:0!important;padding:14px 4px!important}.fav-offer-title{font-size:37px!important;line-height:41px!important}.fav-offer-price{font-size:44px!important;line-height:50px!important}.fav-foot-cell{display:block!important;width:100%!important;text-align:left!important}.fav-foot-nav{padding-top:16px!important;text-align:left!important}}
@media screen and (max-width:350px){.fav-pad{padding-left:20px!important;padding-right:20px!important}.fav-grid{padding-left:14px!important;padding-right:14px!important}.fav-gap{width:12px!important}.fav-mood{font-size:8px!important;letter-spacing:.1px!important}.fav-product-title{font-size:19px!important;line-height:24px!important}.fav-intro-title{font-size:29px!important;line-height:34px!important}.fav-offer-title{font-size:33px!important;line-height:38px!important}}
`;
const rows=`
<tr><td class="fav-hero-group" bgcolor="${GREEN}" style="padding:0;background-color:${GREEN}!important;">${table(`
${imageRow('brand/logo-strip.png',600,75,'Nobren Parfum LT',home,'logo')}
${imageRow('hero/hero-final.jpg',600,690,'Jūsų favoritai. Šeši populiariausi Nobren kvapai.',collection,'hero')}
<tr><td class="fav-pad fav-intro" align="center" style="padding:4px 48px 40px;text-align:center;">
${p('KVAPAI, PRIE KURIŲ GRĮŽTAMA',`font-size:10px;line-height:16px;letter-spacing:1.6px;font-weight:700;color:${LIME};text-align:center;`)}
<h1 class="fav-intro-title" style="margin:15px 0 0;font:700 35px/40px Arial,Helvetica,sans-serif;letter-spacing:-.9px;color:${WHITE};text-align:center;">Ar tavo kvapas<br>jau tarp jų?</h1>
${p('Nuo gaivių vaisių iki sodrios vanilės — šeši populiarūs Nobren kvapai, šešios skirtingos nuotaikos. Išsirink artimiausią sau.',`padding-top:17px;font-size:16px;line-height:25px;color:#E6ECE5;text-align:center;`,'fav-copy')}
${table(`<tr><td align="center" style="padding:23px 0 0;text-align:center;">${btn(collection,'PERŽIŪRĖTI KVAPUS','intro_cta',LIME,GREEN)}</td></tr>`,'width="100%" style="width:100%;"')}
</td></tr>`,'width="100%" style="width:100%;"')}</td></tr>
<tr><td class="fav-products" bgcolor="${PAPER}" style="padding:0;background-color:${PAPER}!important;">${table(`
<tr><td class="fav-pad" style="padding:35px 34px 15px;">${p('6 FAVORITAI · 30 ML · PO 29,90 €',`font-size:10px;line-height:16px;letter-spacing:1px;font-weight:700;color:${GREEN};`)}<h2 class="fav-section-title" style="margin:12px 0 0;font:700 37px/42px Arial,Helvetica,sans-serif;letter-spacing:-1.2px;color:${INK};">Nuo gaivių<br>iki sodrių.</h2></td></tr>
${productRows.join('\n')}
<tr><td class="fav-pad" style="padding:0 34px 30px;">${p('Nurodytos 30 ml kainos. Nuotraukose gali būti pavaizduotas kitos talpos buteliukas.',`font-size:10px;line-height:16px;color:${MUTED};`)}</td></tr>
`,'width="100%" style="width:100%;"')}</td></tr>
<tr><td class="fav-offer" bgcolor="${GREEN}" style="padding:0;background-color:${GREEN}!important;">${table(`
<tr><td class="fav-pad" align="center" style="padding:37px 42px 0;text-align:center;">${p('DAUGIAU PAŽINČIŲ SU KVAPAIS',`font-size:10px;line-height:16px;letter-spacing:1.6px;font-weight:700;color:${LIME};text-align:center;`)}<h2 class="fav-offer-title" style="margin:15px 0 0;font:700 44px/49px Arial,Helvetica,sans-serif;letter-spacing:-1.5px;color:${WHITE};text-align:center;">Nerandi vieno?<br>Pradėk nuo dešimties.</h2>${p('TOP 10 mėginėlių rinkinys · 10 × 5 ml',`padding-top:15px;font-size:15px;line-height:23px;color:#E6ECE5;text-align:center;`)}</td></tr>
${imageRow('closing/top10-final.jpg',600,400,'Nobren TOP 10 mėginėlių rinkinys: 10 × 5 ml.',set.url,'top10_image')}
<tr><td class="fav-pad" align="center" style="padding:0 44px 37px;text-align:center;">${table(`<tr><td bgcolor="${LIME}" style="padding:8px 15px;background-color:${LIME}!important;">${p('−10 % TOP 10 RINKINIUI',`font-size:12px;line-height:17px;font-weight:700;letter-spacing:.6px;color:${GREEN};text-align:center;`)}</td></tr>`,'align="center" style="margin:0 auto;"')}
${p(`<span style="text-decoration:line-through;color:#B6C4B8;">${set.regular_price}</span>`, 'padding-top:17px;font-size:18px;line-height:25px;text-align:center;')}
${p(set.price.replace(/\s+€/,'&nbsp;€'),`padding-top:2px;font-size:49px;line-height:55px;font-weight:700;letter-spacing:-1.5px;color:${WHITE};text-align:center;`,'fav-offer-price')}
${p('Išbandyk skirtingus aromatus ant savo odos ir atrask, prie kurio norisi sugrįžti.',`padding-top:14px;font-size:15px;line-height:24px;color:#E6ECE5;text-align:center;`,'fav-copy')}
${table(`<tr><td align="center" style="padding:24px 0 0;text-align:center;">${btn(set.url,'PERŽIŪRĖTI PREKĘ','top10_cta',LIME,GREEN)}</td></tr>`,'width="100%" style="width:100%;"')}
${p('Rinkinio variantą vyrui arba moteriai pasirink prekės puslapyje.',`padding-top:15px;font-size:10px;line-height:17px;color:#B6C4B8;text-align:center;`)}
</td></tr>
<tr><td class="fav-pad" style="padding:27px 34px 30px;border-top:1px solid #45635A;">${table(`<tr><td class="fav-foot-cell" valign="top" style="padding:0;vertical-align:top;"><a href="${esc(track(home,'footer_home'))}" style="font:700 13px/22px Arial,sans-serif;color:${LIME};text-decoration:none;">nobrenparfum.lt</a>${p('MB „Nobren parfum“<br>Gintaro g. 56, Vydmantai<br>© 2026 Nobren Parfum',`padding-top:7px;font-size:10px;line-height:17px;color:#B6C4B8;`)}</td><td class="fav-foot-cell fav-foot-nav" align="right" valign="top" style="padding:0;text-align:right;vertical-align:top;font:11px/25px Arial,sans-serif;"><a href="https://nobrenparfum.lt/lt/parduotuves" style="color:#B6C4B8;text-decoration:underline;">Kontaktai</a> &nbsp;·&nbsp; <a href="https://nobrenparfum.lt/lt/info/privatumo-politika" style="color:#B6C4B8;text-decoration:underline;">Privatumas</a><br><a href="{% unsubscribe_link %}" style="display:inline-block;color:#B6C4B8;text-decoration:underline;line-height:30px;">Atsisakyti prenumeratos</a></td></tr>`,'width="100%" style="width:100%;"')}</td></tr>
`,'width="100%" style="width:100%;"')}</td></tr>`;
const body=`<div style="display:none!important;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${preheader}</div>${table(`<tr><td class="fav-outer" align="center" style="padding:24px 12px;text-align:center;"><!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->${table(rows,`id="nobren-favorites" class="fav-wrap" width="600" align="center" bgcolor="${GREEN}" style="width:100%;max-width:600px;margin:0 auto;table-layout:fixed;background-color:${GREEN}!important;text-align:left;font-family:Arial,Helvetica,sans-serif;"`)}<!--[if mso]></td></tr></table><![endif]--></td></tr>`,'width="100%" bgcolor="#E5E8E1" style="width:100%;background-color:#E5E8E1!important;"')}`;
const hardened=body
 .replace(/<table\b([^>]*)>/g,(_,a)=>'<table'+(a.includes('style="')?a.replace('style="','style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0pt;mso-table-rspace:0pt;'):a+' style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0pt;mso-table-rspace:0pt;"')+'>')
 .replace(/<td\b([^>]*)>/g,(_,a)=>'<td'+(a.includes('style="')?a:a+' style="padding:0;"')+'>')
 .replace(/<td\b([^>]*)style="([^"]*)"/g,(_,a,s)=>{const align=(a.match(/\balign="([^"]+)"/)||[])[1]||'inherit';return '<td'+a+'style="text-align:'+align+';'+(/background-color:/.test(s)?s:'background-color:transparent!important;'+s)+'"';})
 .replace(/<(p|h[1-3])\b([^>]*)style="([^"]*)"/g,(_,t,a,s)=>'<'+t+a+'style="text-align:inherit;text-transform:none;font-style:normal;'+s+'"');
const html=`<!doctype html><html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><meta name="format-detection" content="telephone=no,address=no,email=no,date=no"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>Nobren · Jūsų favoritai</title><!--[if mso]><noscript><xml><o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office"><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]--><style>html,body{margin:0!important;padding:0!important;width:100%!important}${css}</style></head><body style="margin:0;padding:0;background-color:#E5E8E1;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">${hardened}</body></html>`;
const hosted=s=>s.replace(/src="(assets\/[^"\s]+)"/g,(_,asset)=>'src="'+cdn+asset+'"');
const block='<style>'+css+'</style>\n'+hosted(hardened).replace('padding:24px 12px;','padding:0;');
for(const [file,text]of [['newsletter.html',html],['newsletter-klaviyo.html',hosted(html)],['klaviyo-block.html',block],['klaviyo-block.txt',block]])fs.writeFileSync(path.join(base,file),text);
const plain=`Subject: ${subject}\nPreview line: ${preheader}\n\nJŪSŲ FAVORITAI\nAr tavo kvapas jau tarp jų?\nNuo gaivių vaisių iki sodrios vanilės — šeši populiarūs Nobren kvapai, šešios skirtingos nuotaikos. Išsirink artimiausią sau.\nPeržiūrėti kvapus: ${track(collection,'intro_cta')}\n\n${products.map(x=>`${x.displayName} · Nobren ${x.code} · ${x.audience}\n${x.notes}\n${x.description}\n${x.price} / 30 ml su buteliuku\nPeržiūrėti prekę: ${track(x.url,x.id+'_cta')}`).join('\n\n')}\n\nNERANDI VIENO? PRADĖK NUO DEŠIMTIES.\nTOP 10 mėginėlių rinkinys · 10 × 5 ml\n−10 % TOP 10 rinkiniui: ${set.price} vietoje ${set.regular_price}.\nIšbandyk skirtingus aromatus ant savo odos ir atrask, prie kurio norisi sugrįžti.\nRinkinio variantą vyrui arba moteriai pasirink prekės puslapyje.\nPeržiūrėti prekę: ${track(set.url,'top10_cta')}\n\nMB „Nobren parfum“\nGintaro g. 56, Vydmantai\nhttps://nobrenparfum.lt/lt/\nAtsisakyti prenumeratos: {% unsubscribe_link %}\n`;
fs.writeFileSync(path.join(base,'newsletter.txt'),plain);
console.log(JSON.stringify({subject,preheader,products:products.length,setPrice:set.price,blockBytes:Buffer.byteLength(block),htmlBytes:Buffer.byteLength(hosted(html))}));
