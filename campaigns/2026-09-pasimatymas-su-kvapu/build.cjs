const fs = require('fs');
const path = require('path');
const base = __dirname;
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const home = 'https://nobrenparfum.lt/lt/';
const collection = home + 'nisiniai-kvepalai';
const campaign = '2026_09_pasimatymas_su_kvapu';
const tracked = (url, content) => url + '?utm_source=klaviyo&utm_medium=email&utm_campaign=' + campaign + '&utm_content=' + content;
const items = [
  {id:'a',code:'P22',product:'Diptyque',audience:'Unisex',num:'01',name:'Žalias<br>impulsas.',label:'GAIVI PAŽINTIS · UNISEX',bg:'#E6EDBC',ink:'#243829',notes:'Figų lapai · figos · figmedžio mediena',description:'Kai norisi žalumos, švelnumo ir lengvo medienos prisilietimo.',alt:'Aromato A užuomina: prinokusios figos ir žalias figmedžio lapas.',url:collection+'/-nobren-nisiniai-kvepalai-unisex-p22.html'},
  {id:'b',code:'X1',product:'Lira',audience:'Moterims',num:'02',name:'Saldus<br>flirtas.',label:'GURMANIŠKA PAŽINTIS · MOTERIMS',bg:'#F4C8A7',ink:'#642D23',notes:'Raudonasis apelsinas · karamelė · cinamonas',description:'Sultingas citrusas, karamelės saldumas ir žiupsnelis prieskonių.',alt:'Aromato B užuomina: raudonasis apelsinas, karamelė ir cinamonas.',url:collection+'/-nobren-nisiniai-kvepalai-moterims-x1.html'},
  {id:'c',code:'B71',product:'Smoking Hot',audience:'Unisex',num:'03',name:'Dūminė<br>intriga.',label:'DŪMINĖ PAŽINTIS · UNISEX',bg:'#D4C6DF',ink:'#3C254A',notes:'Kaljano dūmai · tabako absoliutas · burbono vanilė',description:'Šiltas, dūminis derinys su švelnia vanilės nata. Smalsu?',alt:'Aromato C užuomina: tabako lapas, vanilės ankštys ir dūmų vingis.',url:collection+'/-nobren-nisiniai-kvepalai-unisex-b71.html'}
];
const products = [
  {...items[0],group:'A'},
  {id:'c44',group:'A',code:'C44',product:'Silver Mountain',audience:'Unisex',ink:'#243829',notes:'Žalioji arbata · juodieji serbentai · bergamotė',url:collection+'/-nobren-silver-nisiniai-kvepalai-unisex-c44.html'},
  {...items[1],group:'B'},
  {id:'m12',group:'B',code:'M12',product:'Intense Cafe',audience:'Unisex',ink:'#642D23',notes:'Kavos pupelės · rožės · vanilė',url:collection+'/-nobren-nisiniai-kvepalai-unisex-m12.html'},
  {...items[2],group:'C'},
  {id:'t15',group:'C',code:'T15',product:'Oud Wood',audience:'Unisex',ink:'#3C254A',notes:'Santalo mediena · agarmedis · kardamonas',url:collection+'/-nobren-wood-nisiniai-kvepalai-unisex-t15.html'}
].map(p=>({...p,price:'29,90 €',volume:'30 ml'}));
const samplesUrl=home+'megineliu-rinkiniai/-megineliu-rinkinys-nobren-rekomenduoja-5x5ml.html';
const css = `
html,body{margin:0!important;padding:0!important;width:100%!important}body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}table{border-collapse:collapse;border-spacing:0}img{border:0;outline:none;text-decoration:none;display:block;-ms-interpolation-mode:bicubic}a{color:inherit}p,h1,h2,h3{margin:0}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important}
@media screen and (max-width:620px){.outer{padding:0!important}.wrap{width:100%!important;max-width:600px!important}.pad{padding-left:26px!important;padding-right:26px!important}.headline{font-size:66px!important;line-height:62px!important;letter-spacing:-3px!important}.intro{padding-top:0!important;padding-bottom:28px!important}.intro-title{font-size:25px!important;line-height:31px!important;letter-spacing:-.6px!important}.note-gutter{padding:0 12px 18px!important}.stack{display:block!important;width:100%!important;box-sizing:border-box!important}.picture{width:100%!important;height:auto!important}.detail{padding:14px 20px 28px!important}.tiletitle{font-size:35px!important;line-height:37px!important}.footer-nav{display:block!important;text-align:left!important;padding-top:20px!important}.mast-label{font-size:9px!important;letter-spacing:1px!important}.hero-copy{font-size:15px!important;line-height:24px!important}.product-thumb-cell{width:112px!important}.product-thumb{width:112px!important}.product-info{padding-left:15px!important}.product-title{font-size:23px!important;line-height:27px!important}.product-notes{font-size:13px!important;line-height:19px!important}.closing-title{font-size:35px!important;line-height:38px!important;letter-spacing:-1.2px!important}.closing-copy{font-size:14px!important;line-height:23px!important}.closing-pad{padding-top:14px!important}.closing-price{font-size:33px!important;line-height:38px!important}}
@media screen and (max-width:350px){.headline{font-size:59px!important;line-height:56px!important}.pad{padding-left:22px!important;padding-right:22px!important}.mast-label{font-size:8px!important;letter-spacing:.5px!important}.tiletitle{font-size:36px!important;line-height:37px!important}.closing-title{font-size:30px!important;line-height:33px!important}.product-thumb-cell{width:100px!important}.product-thumb{width:100px!important}}
`;
const preheader = 'Šeši kvapai nuo figų žalumos iki dūminės vanilės. O pabaigoje – dar penkios pažintys.';
const row = p => `<tr><td class="note-gutter" bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:0 24px 20px;"><table role="presentation" width="100%" dir="${p.id==='b'?'rtl':'ltr'}" bgcolor="${p.bg}" style="background-color:${p.bg};table-layout:fixed;"><tr>
<td class="stack" width="50%" valign="middle" dir="ltr" style="width:50%;padding:0;font-size:0;line-height:0;"><a href="${esc(tracked(p.url,p.id+'_image'))}" target="_blank"><img class="picture" src="assets/campaign/notes-${p.id}-v4.jpg" width="276" height="276" alt="${p.alt}" style="width:276px;max-width:100%;height:auto;"></a></td>
<td class="stack" width="50%" valign="middle" dir="ltr" style="width:50%;padding:0;color:${p.ink};"><table role="presentation" width="100%"><tr><td class="detail" style="padding:20px 12px 24px 24px;"><table role="presentation" width="100%"><tr><td style="font-size:9px;line-height:14px;letter-spacing:.6px;font-weight:700;">${p.label}</td><td align="right" style="font-size:23px;line-height:25px;font-weight:400;">${p.id.toUpperCase()}</td></tr></table>
<h2 class="tiletitle" style="padding-top:14px;font-family:Arial,Helvetica,sans-serif;font-size:34px;line-height:35px;letter-spacing:-1.3px;font-weight:700;">${p.name}</h2>
<p style="padding-top:15px;font-size:13px;line-height:20px;font-weight:700;">${p.notes}</p>

<table role="presentation" style="margin-top:17px;"><tr><td bgcolor="${p.ink}" style="background-color:${p.ink};mso-padding-alt:15px 17px;"><a href="${esc(tracked(p.url,p.id+'_reveal'))}" target="_blank" style="display:block;padding:15px 17px;color:#FFFFFF;font-size:11px;line-height:14px;font-weight:700;letter-spacing:1.1px;text-decoration:none;mso-padding-alt:0;">PAŽINTI KVAPĄ &nbsp;↗</a></td></tr></table>
</td></tr></table></td></tr></table></td></tr>`;
const productRow = p => `<tr><td style="padding:12px 0;border-top:1px solid #D8D8CF;"><table role="presentation" width="100%" style="table-layout:fixed;"><tr>
<td class="product-thumb-cell" width="160" valign="middle" bgcolor="#FFFFFF" style="width:160px;padding:0;background-color:#FFFFFF;font-size:0;line-height:0;"><a href="${esc(tracked(p.url,p.id+'_product_image'))}" target="_blank"><img class="product-thumb" src="assets/products/${p.code.toLowerCase()}.jpg" width="160" height="181" alt="Nobren ${p.product} ${p.code}, buteliukas ir dėžutė" style="display:block;width:160px;max-width:100%;height:auto;"></a></td>
<td valign="middle" class="product-info" style="padding:10px 0 10px 26px;"><p style="font-size:10px;line-height:15px;letter-spacing:1.3px;font-weight:700;color:${p.ink};">${p.group} / ${p.code} · ${p.audience.toUpperCase()}</p><h3 class="product-title" style="margin:0;padding-top:7px;font-size:28px;line-height:32px;letter-spacing:-.8px;color:#22231F;">${p.product}</h3><p class="product-notes" style="padding-top:7px;font-size:13px;line-height:19px;color:#62645B;">${p.notes}</p>
<p style="padding-top:12px;font-size:25px;line-height:30px;letter-spacing:-.5px;font-weight:700;color:#22231F;"><span style="white-space:nowrap;">${p.price.replace(' ','&nbsp;')}</span> <span style="display:inline-block;margin-left:7px;font-size:12px;line-height:18px;letter-spacing:0;font-weight:400;color:#62645B;white-space:nowrap;">/ ${p.volume}</span></p>
<a href="${esc(tracked(p.url,p.id+'_product_cta'))}" target="_blank" style="display:inline-block;margin-top:3px;padding:12px 0;font-size:11px;line-height:20px;font-weight:700;letter-spacing:1px;color:#22231F;text-decoration:underline;text-underline-offset:4px;">RINKTIS KVAPĄ &nbsp;↗</a></td>
</tr></table></td></tr>`;
const contentTemplate = `<div style="display:none!important;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${preheader}</div>
<table role="presentation" width="100%" bgcolor="#ECEDE8" style="background-color:#ECEDE8;"><tr><td class="outer" align="center" style="padding:24px 12px;">
<!--[if mso]><table role="presentation" width="600"><tr><td><![endif]-->
<table role="presentation" class="wrap" align="center" width="600" bgcolor="#FFFFFF" style="width:100%;max-width:600px;margin:0 auto;table-layout:fixed;background-color:#FFFFFF;font-family:Arial,Helvetica,sans-serif;color:#22231F;text-align:left;">
<tr><td class="pad" style="padding:23px 32px 12px;"><table role="presentation" width="100%"><tr><td width="132"><a href="${esc(tracked(home,'logo'))}" target="_blank"><img src="assets/brand/logo.png" width="132" height="53" alt="Nobren Parfum LT" style="width:132px;height:auto;"></a></td><td align="right" class="mast-label" style="font-size:10px;line-height:16px;letter-spacing:1.6px;font-weight:700;">KVAPŲ PAŽINTYS<br><span style="font-weight:400;letter-spacing:.7px;">RINKIS PAGAL NATAS</span></td></tr></table></td></tr>
<tr><td bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:0;font-size:0;line-height:0;"><a href="${esc(tracked(collection,'hero'))}" target="_blank"><img src="assets/hero/hero-final-v4.jpg" width="600" height="720" alt="Kuris tave suvilios? Nobren P22, X1 ir B71 su figų, apelsino bei vanilės natų užuominomis." style="display:block;width:100%;max-width:600px;height:auto;"></a></td></tr>
<tr><td class="pad intro" align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:0 36px 34px;text-align:center;">
<table role="presentation" width="100%" style="width:100%;table-layout:fixed;">
<tr><td align="center" style="padding:0;text-align:center;"><p style="text-align:center;font-size:10px;line-height:16px;letter-spacing:2px;font-weight:700;color:#7A4355;">PASIMATYMAS SU KVAPU</p></td></tr>
<tr><td align="center" style="padding:13px 0 0;text-align:center;"><h1 class="intro-title" style="margin:0;padding:0;text-align:center;font-size:30px;line-height:36px;letter-spacing:-.8px;font-weight:700;color:#22231F;"><span style="white-space:nowrap;">Šeši kvapai.</span> <span style="white-space:nowrap;">Trys nuotaikos.</span></h1></td></tr>
<tr><td align="center" style="padding:12px 0 0;text-align:center;"><p class="hero-copy" style="text-align:center;font-size:15px;line-height:24px;color:#62645B;">Nuo figų žalumos iki dūminės vanilės.<br>Kurią norisi pažinti iš arčiau?</p></td></tr>
<tr><td align="center" style="padding:22px 0 0;text-align:center;"><table role="presentation" align="center" style="margin:0 auto;"><tr><td align="center" bgcolor="#22231F" style="background-color:#22231F;text-align:center;mso-padding-alt:16px 25px;"><a href="${esc(tracked(collection,'hero_cta'))}" target="_blank" style="display:block;padding:16px 25px;font-size:12px;line-height:16px;letter-spacing:1.2px;font-weight:700;color:#FFFFFF;text-decoration:none;mso-padding-alt:0;">ATRASK SAVO KVAPĄ &nbsp;↗</a></td></tr></table></td></tr>
</table>
</td></tr>
${items.map(row).join('\n')}
<tr><td class="pad" bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:18px 36px 12px;">
<p style="font-size:10px;line-height:15px;letter-spacing:1.8px;font-weight:700;color:#62645B;">TAVO NAUJA PAŽINTIS</p>
<h2 style="padding-top:12px;font-size:35px;line-height:38px;letter-spacing:-1.2px;font-weight:700;">Susipažink iš arčiau.</h2>
<p style="padding-top:12px;font-size:14px;line-height:22px;color:#62645B;">Šeši aromatai. Kiekvienam – sava traukos priežastis.</p>
<table role="presentation" width="100%" style="margin-top:22px;">${products.map(productRow).join('\n')}</table>
<p style="padding-top:12px;border-top:1px solid #D8D8CF;font-size:10px;line-height:16px;color:#62645B;">X1, C44 ir T15 pristatomi naujo dizaino buteliukuose.</p>
</td></tr>
<tr><td bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:0;font-size:0;line-height:0;"><img src="assets/transitions/closing-entry-v4.png" width="600" height="84" alt="" role="presentation" style="display:block;width:100%;max-width:600px;height:auto;"></td></tr>
<tr><td class="pad closing-pad" bgcolor="#22231F" style="background-color:#22231F;padding:17px 36px 4px;">
<p style="font-size:10px;line-height:15px;letter-spacing:1.7px;font-weight:700;color:#E6EDBC;">DAR NERADAI SAVO KVAPO?</p>
<h2 class="closing-title" style="padding-top:17px;font-size:44px;line-height:47px;letter-spacing:-1.8px;font-weight:700;color:#F35482;">Penki pasimatymai.<br><span style="color:#FFFFFF;">Vienas favoritas.</span></h2>
</td></tr>
<tr><td bgcolor="#22231F" style="background-color:#22231F;padding:0;font-size:0;line-height:0;"><a href="${esc(tracked(samplesUrl,'samples_image'))}" target="_blank"><img src="assets/closing/closing-final-v3.jpg" width="600" height="465" alt="Nobren rekomenduoja: penkių kvepalų mėginėlių rinkinys juodoje dėžutėje." style="width:100%;max-width:600px;height:auto;display:block;"></a></td></tr>
<tr><td class="pad" bgcolor="#22231F" style="background-color:#22231F;padding:0 36px 38px;color:#FFFFFF;">
<p style="font-size:11px;line-height:16px;letter-spacing:1.4px;font-weight:700;color:#E6EDBC;">NOBREN REKOMENDUOJA · 5 × 5 ML</p>
<p class="closing-copy" style="padding-top:12px;font-size:15px;line-height:24px;color:#E6E7DF;">Pažintį pradėk nuo mėginėlių. Penki Nobren komandos atrinkti aromatai – penkios progos atrasti savo favoritą.</p>
<p style="padding-top:11px;font-size:12px;line-height:19px;color:#C4C6BC;">Rinkiniai moterims ir vyrams.</p>
<p class="closing-price" style="padding-top:21px;font-size:38px;line-height:42px;font-weight:700;letter-spacing:-1px;color:#FFFFFF;">22,50&nbsp;€ <span style="font-size:13px;line-height:20px;font-weight:400;letter-spacing:0;color:#C4C6BC;">/ rinkinys</span></p>
<table role="presentation" width="100%" style="margin-top:20px;"><tr><td bgcolor="#E6EDBC" align="center" style="background-color:#E6EDBC;mso-padding-alt:18px 18px;"><a href="${esc(tracked(samplesUrl,'samples_cta'))}" target="_blank" style="display:block;padding:18px 18px;font-size:12px;line-height:16px;letter-spacing:1px;font-weight:700;color:#22231F;text-decoration:none;mso-padding-alt:0;">PRADĖTI NUO PENKIŲ &nbsp;↗</a></td></tr></table>
<p style="padding-top:14px;font-size:10px;line-height:16px;color:#C4C6BC;">Rinkinio vaizdas iliustracinis. Aromatai priklauso nuo pasirinkto rinkinio.</p>
</td></tr>
<tr><td class="pad" bgcolor="#22231F" style="background-color:#22231F;padding:25px 36px 27px;border-top:1px solid #45463E;"><table role="presentation" width="100%"><tr><td class="stack" valign="top"><a href="${esc(home)}" style="font-size:12px;line-height:20px;color:#FFFFFF;font-weight:700;text-decoration:none;">nobrenparfum.lt</a><p style="padding-top:7px;font-size:10px;line-height:16px;color:#C4C6BC;">MB „Nobren parfum“<br>Gintaro g. 56, Vydmantai<br>© 2026 Nobren Parfum</p></td><td class="stack footer-nav" valign="top" align="right" style="font-size:11px;line-height:22px;color:#C4C6BC;"><a href="https://nobrenparfum.lt/lt/parduotuves" style="color:#C4C6BC;text-decoration:underline;">Kontaktai</a> &nbsp;·&nbsp; <a href="https://nobrenparfum.lt/lt/info/privatumo-politika" style="color:#C4C6BC;text-decoration:underline;">Privatumas</a><br><a href="{% unsubscribe_link %}" style="display:inline-block;color:#C4C6BC;text-decoration:underline;line-height:28px;">Atsisakyti prenumeratos</a></td></tr></table></td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table>`;
// Keep the email's typography independent of the parent Klaviyo template.
// Inline resets survive a removed style block and override host heading defaults.
const content = contentTemplate
 .replace(/<(p|h[1-3])\b([^>]*)style="([^"]*)"/g, (_,tag,attrs,style) => {
  const align=(style.match(/(?:^|;)\s*text-align:([^;]+)/)||[])[1]||'inherit';
  return '<'+tag+attrs+'style="padding:0;font-family:Arial,Helvetica,sans-serif;color:inherit;text-transform:none;font-style:normal;'+style+'margin:0!important;text-align:'+align+'!important;"';
 })
 .replace(/<img\b([^>]*)style="([^"]*)"/g, (_,attrs,style) => '<img'+attrs+'style="display:block;border:0;outline:none;'+style+'"')
 .replace(/<table\b/g, '<table cellpadding="0" cellspacing="0" border="0"')
 .replace(/<table\b([^>]*)>/g, (_,attrs) => '<table'+(attrs.includes('style="')
   ? attrs.replace('style="','style="border-collapse:collapse;border-spacing:0;')
   : attrs+' style="border-collapse:collapse;border-spacing:0;"')+'>')
 .replace(/<td\b([^>]*)>/g, (_,attrs) => '<td'+(attrs.includes('style="')?attrs:attrs+' style="padding:0;"')+'>')
 .replace(/<td\b([^>]*)style="([^"]*)"/g, (_,attrs,style) => {
  const align=(attrs.match(/\balign="([^"]+)"/)||[])[1]||'inherit';
  return '<td'+attrs+'style="font-family:Arial,Helvetica,sans-serif;text-align:'+align+';'+style+'"';
 });
const html = `<!doctype html>
<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="x-apple-disable-message-reformatting"><meta name="format-detection" content="telephone=no,address=no,email=no,date=no"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>Pasimatymas su kvapu · Nobren</title><!--[if mso]><noscript><xml><o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office"><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]--><style>${css}</style></head><body style="margin:0;padding:0;background-color:#ECEDE8;">${content}</body></html>`;
const assetCdn = 'https://cdn.jsdelivr.net/gh/elaiskai/nobren-email-assets@9d32d00304486684158efafc6da2f72213874810/campaigns/2026-09-pasimatymas-su-kvapu/';
const hosted = source => source.replace(/src="(assets\/[^"]+)"/g, (_, asset) => 'src="'+assetCdn+asset+'"');
const hostedBlock = '<style>'+css+'</style>\n'+hosted(content).replace('padding:24px 12px;', 'padding:0;');
fs.writeFileSync(path.join(base,'newsletter.html'),html);
fs.writeFileSync(path.join(base,'newsletter-klaviyo.html'),hosted(html));
fs.writeFileSync(path.join(base,'klaviyo-block.html'),hostedBlock);
fs.writeFileSync(path.join(base,'klaviyo-block.txt'),hostedBlock);
if(fs.existsSync(path.join(base,'klaviyo-import')))fs.writeFileSync(path.join(base,'klaviyo-import/nobren.html'),hosted(html));
const plain = `Tema: Kuris kvapas tave suvilios?
Preheader: ${preheader}

NOBREN · PASIMATYMAS SU KVAPU

Kuris tave suvilios?

Šeši kvapai. Trys nuotaikos.
Nuo figų žalumos iki dūminės vanilės. Kurią norisi pažinti iš arčiau?

6 KVAPAI. TAVO PASIRINKIMAS.

${products.map(p=>`${p.group} · Nobren ${p.product} · ${p.code} · ${p.audience}\n${p.notes}\n${p.price} / ${p.volume}\nRinktis kvapą: ${tracked(p.url,p.id+'_product_cta')}`).join('\n\n')}

X1, C44 ir T15 pristatomi naujo dizaino buteliukuose.

PENKI PASIMATYMAI. VIENAS FAVORITAS.

NOBREN REKOMENDUOJA · 5 × 5 ML
Pažintį pradėk nuo mėginėlių. Penki Nobren komandos atrinkti aromatai – penkios progos atrasti savo favoritą.
Rinkiniai moterims ir vyrams.
22,50 € / rinkinys
Aromatai priklauso nuo pasirinkto rinkinio.
Pradėti nuo penkių: ${tracked(samplesUrl,'samples_cta')}

MB „Nobren parfum“
Gintaro g. 56, Vydmantai
https://nobrenparfum.lt/lt/
Kontaktai: https://nobrenparfum.lt/lt/parduotuves
Privatumas: https://nobrenparfum.lt/lt/info/privatumo-politika
Atsisakyti prenumeratos: {% unsubscribe_link %}
`;
fs.writeFileSync(path.join(base,'newsletter.txt'),plain);
console.log('Built local preview, hosted Klaviyo HTML, paste block and plaintext');
