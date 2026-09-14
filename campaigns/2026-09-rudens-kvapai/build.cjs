const fs=require('fs');
const path=require('path');
const base=__dirname;
const CDN='https://cdn.jsdelivr.net/gh/elaiskai/nobren-email-assets@7716a34a1d35e185f0a62d7efcc0c4aa88400ef2/campaigns/2026-09-rudens-kvapai/';
const home='https://nobrenparfum.lt/lt/';
const catalogue=home+'nisiniai-kvepalai';
const womenUrl=home+'kvepalai-moterims';
const menUrl=home+'kvepalai-vyrams';
const campaign='2026_09_rudens_kvapai';
const subject='Ruduo palieka šleifą. Atrask savąjį.';
const preheader='Rudens kvapai jai ir jam. Pabaigoje – naujiena „Madam A5“, kuri nelieka nepastebėta.';
const esc=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
const tracked=(url,content)=>url+'?utm_source=klaviyo&utm_medium=email&utm_campaign='+campaign+'&utm_content='+content;
const copy={
 'I12':{title:'Absolute Aphrodisiac',titleHtml:'Absolute<br>Aphrodisiac',description:'Sodri, kreminė vanilė su šilta oda – intymus, jausmingas ir nepaprastai viliojantis kvapas.'},
 'M6+':{title:'Grand Soir',titleHtml:'Grand Soir',description:'Kvapas, kurio neįmanoma perprasti iškart – jis vilioja, intriguoja ir nepaleidžia.'},
 'M10':{title:'Satin Mood',titleHtml:'Satin Mood',description:'Svaiginanti rožė, tamsus agarmedis ir šiltas gintaras – intensyvus, hipnotizuojantis prabangos šleifas.'},
 'M16':{title:'Leather Accord',titleHtml:'Leather Accord',description:'Prieskonių, odos ir šilto gintaro derinys – sodrus, gilus, egzotiškas ir paslaptingas.'},
 'T13':{title:'Tabacco Vanilla',titleHtml:'Tabacco Vanilla',description:'Tamsus tabakas, sodri kakava ir aštrūs prieskoniai – galingas, provokuojantis ir velniškai prabangus.'},
 'I4':{title:'Oud for Greatness',titleHtml:'Oud for<br>Greatness',description:'Galingas agarmedis, šafranas ir prieskoniai – tamsus, paslaptingas aromatas, spinduliuojantis prabanga ir jėga.'},
 'M19':{title:'History Of Santal',titleHtml:'History Of<br>Santal',description:'Apelsinų žiedai, migdolai ir muskusas su santalu – svaiginantis, kreminis aromatas su paslaptinga egzotikos aura.'},
 'B25':{title:'Back To Black',titleHtml:'Back To Black',description:'Tabakas, medus ir vyšnių atspalviai – tamsus, tirštas aromatas, turintis pavojingai traukiančio žavesio.'}
};
const products=JSON.parse(fs.readFileSync(path.join(base,'products.json'),'utf8')).map(p=>({...p,...copy[p.code]}));
const madam=JSON.parse(fs.readFileSync(path.join(base,'madam.json'),'utf8'));
const madamCopy=[
 'Pirmiausia atsiskleidžia vaisių akordai, kardamonas ir gintaras, suteikiantys kvapui šilumos bei gylio.',
 'Vėliau pasirodo kreminė tonka, ananasų niuansai ir švelnūs žiedai, o kompoziciją užbaigia vanilė, pačiulis ir sodrus gintaro akordas.',
 'Gintaras apgaubia aromatą šilta, spindinčia aura, suteikia jam prabangos ir ilgai išliekančio žavesio.',
 'Tai kvapas, kuris kuria įspūdį – sodrus šleifas, prabangos pojūtis ir aromatas, prie kurio norisi sugrįžti.'
];
const css=`
html,body{margin:0!important;padding:0!important;width:100%!important}body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}table{border-collapse:collapse;border-spacing:0}img{display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}p,h1,h2,h3{margin:0}a{color:inherit}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important}
@media screen and (max-width:620px){.outer{padding:0!important}.wrap{width:100%!important;max-width:600px!important}.pad{padding-left:22px!important;padding-right:22px!important}.section-head{padding-top:30px!important;padding-bottom:24px!important}.section-title{font-size:36px!important;line-height:40px!important;letter-spacing:-.8px!important}.card-text{padding-left:14px!important;padding-right:14px!important}.product-title{font-size:22px!important;line-height:25px!important;letter-spacing:-.5px!important}.product-copy{font-size:13px!important;line-height:19px!important}.product-price{font-size:24px!important;line-height:29px!important}.card-code{font-size:9px!important;letter-spacing:.6px!important}.grid-pad{padding-bottom:27px!important}.hero-copy{font-size:14px!important;line-height:23px!important}.hero-button{font-size:10px!important;letter-spacing:.6px!important;padding:16px 8px!important}.mast-label{font-size:9px!important;letter-spacing:.8px!important}.footer-cell{display:block!important;width:100%!important;box-sizing:border-box!important;text-align:left!important}.footer-links{padding-top:16px!important}.closing-title{font-size:35px!important;line-height:40px!important}.madam-title{font-size:31px!important;line-height:37px!important}.madam-copy{font-size:14px!important;line-height:24px!important}.madam-quote{font-size:31px!important;line-height:37px!important}.closing-pad{padding-top:36px!important;padding-bottom:34px!important}}
@media screen and (max-width:350px){.pad{padding-left:18px!important;padding-right:18px!important}.card-text{padding-left:11px!important;padding-right:11px!important}.product-title{font-size:19px!important;line-height:23px!important}.product-copy{font-size:12px!important;line-height:18px!important}.card-code{font-size:8px!important;letter-spacing:.3px!important}.product-price{font-size:22px!important;line-height:27px!important}.mast-label{font-size:8px!important}.section-title{font-size:32px!important;line-height:37px!important}.hero-button{font-size:9px!important;letter-spacing:.3px!important}.closing-title{font-size:31px!important;line-height:36px!important}.madam-title{font-size:28px!important;line-height:34px!important}.madam-quote{font-size:27px!important;line-height:33px!important}}
`;
const button=(url,text,tag,bg,ink,cls='')=>`<table role="presentation" width="100%"><tr><td align="center" bgcolor="${bg}" style="background-color:${bg};mso-padding-alt:16px 12px;"><a class="${cls}" href="${esc(tracked(url,tag))}" target="_blank" style="display:block;padding:16px 12px;color:${ink};font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;text-decoration:none;mso-padding-alt:0;">${text} &nbsp;↗</a></td></tr></table>`;
const pair=(list,ink)=>{
 const gutter='<td width="4%" style="width:4%;font-size:0;line-height:0;">&nbsp;</td>';
 const row=(fn,style,cls='')=>'<tr>'+list.map(p=>`<td class="${cls}" width="48%" valign="top" bgcolor="#FFFFFF" style="width:48%;background-color:#FFFFFF;${style}">${fn(p)}</td>`).join(gutter)+'</tr>';
 return `<table class="product-pair" role="presentation" width="100%" style="table-layout:fixed;">
 ${row(p=>`<a href="${esc(tracked(p.url,p.slug+'_image'))}" target="_blank"><img src="assets/products/${p.slug}.jpg" width="257" height="291" alt="Nobren ${p.title}, kvapo kodas ${p.code}, buteliukas ir dėžutė" style="width:100%;max-width:100%;height:auto;"></a>`,'padding:0;font-size:0;line-height:0;')}
 ${row(p=>`<p class="card-code" style="font-size:10px;line-height:15px;font-weight:700;letter-spacing:1px;color:${ink};">KVAPO KODAS&nbsp;${p.code}</p>`,'padding:13px 18px 0;','card-text')}
 ${row(p=>`<h3 class="product-title" style="font-family:Georgia,Times,serif;font-size:27px;line-height:30px;font-weight:400;letter-spacing:-.6px;color:#342824;">${p.titleHtml}</h3>`,'padding:9px 18px 0;','card-text')}
 ${row(p=>`<p class="product-copy" style="font-size:14px;line-height:21px;color:#64554E;">${p.description}</p>`,'padding:12px 18px 0;','card-text')}
 ${row(p=>`<p class="product-price" style="font-size:26px;line-height:31px;font-weight:700;letter-spacing:-.5px;color:${ink};white-space:nowrap;">${p.price.replace(/\s/g,'&nbsp;')}</p><p style="padding-top:3px;font-size:11px;line-height:16px;color:#756760;">30 ml</p>`,'padding:18px 18px 0;','card-text')}
 ${row(p=>button(p.url,'RINKTIS',p.slug+'_cta',ink,'#FFFFFF'),'padding:15px 18px 18px;','card-text')}
 </table>`;
};
const section=(which)=>{
 const female=which==='women';
 const list=female?products.slice(0,4):products.slice(4);
 const ink=female?'#6B2D3A':'#2C4036';
 const bg=female?'#F5E9DF':'#E6EAE2';
 const headingBg=female?bg:'#2C4036';
 const headingInk=female?ink:'#F8EEDF';
 const title=female?'Ruduo moterims.':'Ruduo vyrams.';
 return `<tr><td class="pad section-head" bgcolor="${headingBg}" style="padding:37px 32px 27px;background-color:${headingBg};color:${headingInk};">
 <p style="font-size:10px;line-height:15px;font-weight:700;letter-spacing:2px;">${female?'01 / JAI':'02 / JAM'}</p>
 <h2 class="section-title" style="padding-top:12px;font-family:Georgia,Times,serif;font-size:44px;line-height:49px;font-weight:400;letter-spacing:-1.2px;">${title}</h2>
 <p style="padding-top:11px;font-size:14px;line-height:22px;">${female?'Vanilės švelnumas. Rožės drąsa. Odos paslaptis.':'Tabako gelmė. Agarmedžio jėga. Santalo šiluma.'}</p>
 </td></tr>
 <tr><td class="pad grid-pad" bgcolor="${bg}" style="padding:${female?'0':'28px'} 32px 34px;background-color:${bg};">${pair(list.slice(0,2),ink)}<table role="presentation" width="100%"><tr><td height="24" style="height:24px;font-size:0;line-height:0;">&nbsp;</td></tr></table>${pair(list.slice(2,4),ink)}</td></tr>`;
};
const content=`<div style="display:none!important;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${preheader}</div>
<table role="presentation" width="100%" bgcolor="#E9E3DC" style="background-color:#E9E3DC;"><tr><td class="outer" align="center" style="padding:24px 12px;">
<!--[if mso]><table role="presentation" width="600"><tr><td><![endif]-->
<table class="wrap" role="presentation" width="600" bgcolor="#FAF6EE" style="width:600px;max-width:600px;table-layout:fixed;background-color:#FAF6EE;font-family:Arial,Helvetica,sans-serif;color:#342824;">
<tr><td class="pad" style="padding:22px 32px;"><table role="presentation" width="100%"><tr><td width="132"><a href="${esc(tracked(home,'logo'))}" target="_blank"><img src="assets/brand/logo.png" width="132" height="53" alt="Nobren Parfum LT" style="width:132px;height:auto;"></a></td><td class="mast-label" align="right" style="font-size:10px;line-height:17px;letter-spacing:1.5px;color:#6B2D3A;font-weight:700;">RUDENS KVAPAI<br><span style="font-weight:400;letter-spacing:.7px;">MOTERIMS IR VYRAMS</span></td></tr></table></td></tr>
<tr><td bgcolor="#3C2824" style="background-color:#3C2824;padding:0;font-size:0;line-height:0;"><a href="${esc(tracked(catalogue,'hero'))}" target="_blank"><img src="assets/hero/hero-final.jpg" width="600" height="690" alt="Ruduo palieka šleifą. Nobren Absolute Aphrodisiac I12 ir Tabacco Vanilla T13 šiltoje rudens šviesoje." style="display:block;width:100%;max-width:600px;height:auto;"></a></td></tr>
<tr><td class="pad" bgcolor="#3C2824" style="background-color:#3C2824;padding:2px 32px 32px;color:#F8EEDF;">
<h1 style="font-family:Georgia,Times,serif;font-size:29px;line-height:35px;font-weight:400;letter-spacing:-.3px;">Lėtesnis ritmas. Sodresni kvapai.</h1>
<p class="hero-copy" style="padding-top:13px;font-size:15px;line-height:24px;color:#E8D5C4;">Vanilė, oda, tabakas ir agarmedis. Aštuoni kvapai rudeniui ir viena naujiena, kuri nelieka nepastebėta.</p>
<table role="presentation" width="100%" style="margin-top:22px;table-layout:fixed;"><tr><td width="48%" style="width:48%;">${button(womenUrl,'KVAPAI MOTERIMS','hero_women','#F5E9DF','#3C2824','hero-button')}</td><td width="4%" style="width:4%;"></td><td width="48%" style="width:48%;">${button(menUrl,'KVAPAI VYRAMS','hero_men','#F5E9DF','#3C2824','hero-button')}</td></tr></table>
</td></tr>
${section('women')}
${section('men')}
<tr><td class="pad madam-start" bgcolor="#F5E9DF" style="background-color:#F5E9DF;padding:31px 32px 0;border-top:1px solid #C4B29F;color:#6B2D3A;">
<p style="font-size:10px;line-height:16px;font-weight:700;letter-spacing:2px;">NAUJIENA / MOTERIMS</p>
</td></tr>
<tr><td bgcolor="#F5E9DF" style="background-color:#F5E9DF;padding:0;font-size:0;line-height:0;"><a href="${esc(tracked(madam.url,'madam_image'))}" target="_blank"><img src="assets/closing/madam-final.jpg" width="600" height="460" alt="Naujiena Nobren Madam A5: tamsiai mėlynas buteliukas su auksiniu kamšteliu. Vaizde – 50 ml buteliukas." style="display:block;width:100%;max-width:600px;height:auto;"></a></td></tr>
<tr><td class="pad madam-content" bgcolor="#F5E9DF" style="background-color:#F5E9DF;padding:0 36px 37px;color:#3C2824;">
<h2 class="madam-title" style="font-family:Georgia,Times,serif;font-size:36px;line-height:41px;font-weight:400;letter-spacing:-.7px;color:#6B2D3A;">Kvapas, kuris nelieka nepastebėtas.</h2>
${madamCopy.map(paragraph=>`<p class="madam-copy" style="padding-top:17px;font-size:15px;line-height:25px;">${paragraph}</p>`).join('\n')}
<p class="madam-copy" style="padding-top:24px;font-size:15px;line-height:25px;">Jeigu ieškote išskirtinio kvapo, apie kurį aplinkiniai klaustų:</p>
<p class="madam-quote" style="padding-top:9px;font-family:Georgia,Times,serif;font-style:italic;font-size:37px;line-height:44px;letter-spacing:-.6px;color:#6B2D3A;">„Kuo jūs kvepiate?“</p>
<p style="padding-top:13px;font-size:14px;line-height:23px;">Rinkitės <strong>Nobren Madam A5.</strong></p>
<table role="presentation" width="100%" style="margin-top:25px;border-top:1px solid #C4B29F;"><tr><td style="padding-top:20px;"><p style="font-size:11px;line-height:16px;color:#6B2D3A;font-weight:700;letter-spacing:1px;">KVAPO KODAS A5 · 30 ML</p><p style="padding-top:7px;font-size:32px;line-height:38px;font-weight:700;letter-spacing:-.5px;color:#6B2D3A;">${madam.price.replace(/\s/g,'&nbsp;')}</p></td></tr></table>
<table role="presentation" width="100%" style="margin-top:18px;"><tr><td>${button(madam.url,'RINKTIS NOBREN MADAM A5','madam_cta','#6B2D3A','#FFFFFF')}</td></tr></table>
<p style="padding-top:13px;font-size:10px;line-height:16px;color:#786358;">Kaina nurodyta už 30 ml. Vizuale – 50 ml buteliukas.</p>
</td></tr>
<tr><td class="pad" bgcolor="#3C2824" style="background-color:#3C2824;padding:25px 32px 29px;border-top:1px solid #6D5145;"><table role="presentation" width="100%"><tr><td class="footer-cell" valign="top"><a href="${home}" style="font-size:12px;line-height:19px;font-weight:700;color:#F8EEDF;text-decoration:none;">nobrenparfum.lt</a><p style="padding-top:7px;font-size:10px;line-height:16px;color:#D4C0AF;">MB „Nobren parfum“<br>Gintaro g. 56, Vydmantai<br>© 2026 Nobren Parfum</p></td><td class="footer-cell footer-links" align="right" valign="top" style="font-size:11px;line-height:22px;color:#E8D5C4;"><a href="${home}parduotuves" style="color:#E8D5C4;text-decoration:underline;">Kontaktai</a> &nbsp;·&nbsp; <a href="${home}info/privatumo-politika" style="color:#E8D5C4;text-decoration:underline;">Privatumas</a><br><a href="{% unsubscribe_link %}" style="display:inline-block;color:#E8D5C4;text-decoration:underline;line-height:28px;">Atsisakyti prenumeratos</a></td></tr></table></td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table>`;
const head=`<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="x-apple-disable-message-reformatting"><meta name="format-detection" content="telephone=no,address=no,email=no,date=no"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>Ruduo palieka šleifą · Nobren</title><!--[if mso]><noscript><xml><o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office"><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]--><style>${css}</style>`;
const document=body=>`<!doctype html>\n<html lang="lt"><head>${head}</head><body style="margin:0;padding:0;background-color:#E9E3DC;">${body}</body></html>`;
const hosted=s=>CDN?s.replace(/src="(assets\/[^\"]+)"/g,(_,asset)=>'src="'+CDN+asset+'"'):s;
fs.writeFileSync(path.join(base,'newsletter.html'),document(content));
fs.writeFileSync(path.join(base,'newsletter-klaviyo.html'),document(hosted(content)));
const block='<style>'+css+'</style>\n'+hosted(content).replace('padding:24px 12px;','padding:0;');
fs.writeFileSync(path.join(base,'klaviyo-block.html'),block);
fs.writeFileSync(path.join(base,'klaviyo-block.txt'),block);
const plainProduct=p=>`Kvapo kodas ${p.code} / ${p.title}\n${p.description}\n${p.price} / 30 ml\nRinktis: ${tracked(p.url,p.slug+'_cta')}`;
fs.writeFileSync(path.join(base,'newsletter.txt'),`Tema: ${subject}\nPreview line: ${preheader}\n\nNOBREN · RUDENS KVAPAI MOTERIMS IR VYRAMS\n\nRuduo palieka šleifą.\nLėtesnis ritmas. Sodresni kvapai.\nVanilė, oda, tabakas ir agarmedis. Aštuoni kvapai rudeniui ir viena naujiena, kuri nelieka nepastebėta.\n\nRUDUO MOTERIMS\n\n${products.slice(0,4).map(plainProduct).join('\n\n')}\n\nRUDUO VYRAMS\n\n${products.slice(4).map(plainProduct).join('\n\n')}\n\nNAUJIENA MOTERIMS · NOBREN MADAM A5\nKvapas, kuris nelieka nepastebėtas.\n\n${madamCopy.join('\n\n')}\n\nJeigu ieškote išskirtinio kvapo, apie kurį aplinkiniai klaustų „kuo jūs kvepiate?“, rinkitės Nobren Madam A5.\n${madam.price} / 30 ml\nRinktis: ${tracked(madam.url,'madam_cta')}\n\nMB „Nobren parfum“\nGintaro g. 56, Vydmantai\n© 2026 Nobren Parfum\n${home}\nKontaktai: ${home}parduotuves\nPrivatumas: ${home}info/privatumo-politika\nAtsisakyti prenumeratos: {% unsubscribe_link %}\n`);
console.log('Built autumn email: 8 products + Madam A5; public CDN configured:',Boolean(CDN));
