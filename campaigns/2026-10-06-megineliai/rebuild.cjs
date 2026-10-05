const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
execFileSync(process.execPath,[path.join(__dirname,'build.cjs')]);
const base='https://raw.githubusercontent.com/elaiskai/nobren-email-assets/main/campaigns/2026-10-06-megineliai/';
fs.copyFileSync(path.join(__dirname,'newsletter.html'),path.join(__dirname,'preview-local.html'));
for(const f of ['newsletter.html','klaviyo-block.html','klaviyo-block.txt'])fs.writeFileSync(path.join(__dirname,f),fs.readFileSync(path.join(__dirname,f),'utf8').replaceAll('src="assets/',`src="${base}assets/`));
console.log('Rebuilt public HTML. Run QA and inspect fresh previews before publishing.');
