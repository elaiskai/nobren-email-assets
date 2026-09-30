const fs=require('fs'),path=require('path');
const P='#FFFDF9',INK='#302823',MUTED='#756960',ACCENT='#742D3C',BORDER='#E5D9CF';
const subject='Ar dar parašyti?';
const preheader='Trumpai apie Nobren naujienas ir vienas klausimas tau.';
const property='nobren_keep_emails_20261001';
const redirect='https://nobrenparfum.lt/lt/nauji-kvapai';
const keepTag=`{% update_property_link '${property}' 'yes' '${redirect}' %}`;
const assetCommit='04dae649b7df440800fb0f9ecf3263bc555b0eca';
const logo='https://raw.githubusercontent.com/elaiskai/nobren-email-assets/'+assetCommit+'/campaigns/2026-10-01-ar-dar-parasyti/assets/logo-strip.png';
const table=(body,attrs='')=>`<table role="presentation" cellpadding="0" cellspacing="0" border="0" ${attrs} style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0pt;mso-table-rspace:0pt;">${body}</table>`;
const css=`@media screen and (max-width:620px){.ns26-outer{padding:0!important}.ns26-wrap{width:100%!important}.ns26-main{padding:3px 25px 24px!important}.ns26-title{font-size:43px!important;line-height:47px!important}.ns26-footer{padding:19px 25px 24px!important}}
@media screen and (max-width:350px){.ns26-main{padding-left:21px!important;padding-right:21px!important}.ns26-title{font-size:39px!important;line-height:44px!important}.ns26-copy{font-size:14px!important;line-height:22px!important}.ns26-button{font-size:11px!important;letter-spacing:.2px!important}}`;
const paragraph=(s,extra='')=>`<p class="ns26-copy" style="margin:0!important;padding:0;font:16px/25px Arial,Helvetica,sans-serif;color:${INK};text-align:left!important;${extra}">${s}</p>`;
const rows=`
<tr><td style="padding:0;line-height:0;font-size:0;background-color:transparent!important;"><img src="${logo}" width="600" height="72" alt="Nobren Parfum LT" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></td></tr>
<tr><td class="ns26-main" style="padding:6px 48px 27px;background-color:transparent!important;text-align:left;">
<p style="margin:0!important;padding:0;font:700 10px/16px Arial,sans-serif;letter-spacing:1.8px;color:${ACCENT};text-align:left!important;">TRUMPA ŽINUTĖ NUO NOBREN</p>
<h1 class="ns26-title" style="margin:11px 0 20px!important;padding:0;font:700 50px/55px Arial,Helvetica,sans-serif;letter-spacing:-1.8px;color:${ACCENT};text-align:left!important;">Ar dar parašyti?</h1>
${paragraph('Labas,')}
${paragraph('Norime dalintis kvapų naujienomis, kurios tau įdomios. Tad šiandien turime vieną klausimą: <strong>ar dar nori gauti Nobren laiškus?</strong>','padding-top:11px;')}
${table(`<tr><td style="padding:19px 0 19px;background-color:transparent!important;">${table(`<tr><td style="padding:14px 18px;border-left:3px solid ${ACCENT};background-color:transparent!important;"><p style="margin:0 0 7px!important;padding:0;font:700 10px/16px Arial,sans-serif;letter-spacing:1.2px;color:${ACCENT};text-align:left!important;">KAS NAUJO?</p>${paragraph('Pristatėme <strong>„Madam A5“</strong> su vaisių, tonkos ir vanilės natomis. O ieškantiems savo favorito — <strong>TOP 10 mėginėlių rinkinys</strong>.','font-size:14px;line-height:22px;')}</td></tr>`,'width="100%"')}</td></tr>`,'width="100%"')}
${table(`<tr><td bgcolor="${ACCENT}" align="center" style="padding:0;background-color:${ACCENT}!important;text-align:center;mso-padding-alt:17px 18px;"><a class="ns26-button" href="${keepTag}" style="display:block;padding:17px 18px;font:700 12px/18px Arial,sans-serif;letter-spacing:.5px;text-decoration:none;color:#FFFFFF!important;text-align:center!important;mso-padding-alt:0;">TAIP, NORIU GAUTI LAIŠKUS</a></td></tr>`,'width="100%"')}
<p style="margin:10px 0 0!important;padding:0;font:12px/19px Arial,sans-serif;color:${MUTED};text-align:center!important;">Vienas paspaudimas — ir liekame ryšyje.</p>
${paragraph('Jei į šį laišką nesureaguosi, daugiau naujienlaiškių nebesiųsime.','padding-top:23px;font-size:14px;line-height:22px;color:'+MUTED+';')}
${paragraph('Norisi atsisveikinti? <a class="ns26-unsubscribe" href="{% unsubscribe_link %}" style="color:'+ACCENT+'!important;text-decoration:underline;">Atsisakyti laiškų</a>.','padding-top:9px;font-size:14px;line-height:22px;color:'+MUTED+';')}
${paragraph('Iki kito kvapo,<br><strong>Nobren komanda</strong>','padding-top:23px;font-size:14px;line-height:22px;')}
</td></tr>
<tr><td class="ns26-footer" style="padding:19px 48px 25px;border-top:1px solid ${BORDER};background-color:transparent!important;text-align:left;"><p style="margin:0!important;padding:0;font:10px/17px Arial,sans-serif;color:${MUTED};text-align:left!important;">MB „Nobren parfum“ · Gintaro g. 56, Vydmantai<br>© 2026 Nobren Parfum</p></td></tr>`;
const inner=`<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" class="ns26-wrap" bgcolor="${P}" style="width:100%;max-width:600px;margin:0 auto;border-collapse:collapse;border-spacing:0;table-layout:fixed;background-color:${P}!important;">${rows}</table>`;
const body=`<div style="display:none!important;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${preheader}</div><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#EEE7E0" style="width:100%;border-collapse:collapse;border-spacing:0;background-color:#EEE7E0!important;"><tr><td align="center" class="ns26-outer" style="padding:24px 12px;text-align:center;"><!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->${inner}<!--[if mso]></td></tr></table><![endif]--></td></tr></table>`;
const full=b=>`<!doctype html><html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>Nobren · Ar dar parašyti?</title><style>html,body{margin:0!important;padding:0!important;width:100%!important}${css}</style></head><body style="margin:0;padding:0;-webkit-text-size-adjust:100%;background:#EEE7E0;">${b}</body></html>`;
const block=`<style>${css}</style>\n`+body.replace('padding:24px 12px;','padding:0;');
const preview=full(body).replace(logo,'assets/logo-strip.png').replace(keepTag,redirect).replace('{% unsubscribe_link %}','#preview-unsubscribe');
for(const [name,content]of [['newsletter.html',preview],['newsletter-klaviyo.html',full(body)],['klaviyo-block.html',block],['klaviyo-block.txt',block]])fs.writeFileSync(path.join(__dirname,name),content);
const text=`Subject: ${subject}\nPreview line: ${preheader}\n\nAR DAR PARAŠYTI?\n\nLabas,\n\nNorime dalintis kvapų naujienomis, kurios tau įdomios. Tad šiandien turime vieną klausimą: ar dar nori gauti Nobren laiškus?\n\nKAS NAUJO?\nPristatėme „Madam A5“ su vaisių, tonkos ir vanilės natomis. O ieškantiems savo favorito — TOP 10 mėginėlių rinkinys.\n\nTAIP, NORIU GAUTI LAIŠKUS: ${keepTag}\nVienas paspaudimas — ir liekame ryšyje.\n\nJei į šį laišką nesureaguosi, daugiau naujienlaiškių nebesiųsime.\n\nNorisi atsisveikinti? Atsisakyti laiškų: {% unsubscribe_link %}\n\nIki kito kvapo,\nNobren komanda\n\nMB „Nobren parfum“\nGintaro g. 56, Vydmantai\n© 2026 Nobren Parfum\n`;
fs.writeFileSync(path.join(__dirname,'newsletter.txt'),text);
console.log(JSON.stringify({subject,preheader,property,blockBytes:Buffer.byteLength(block)}));
