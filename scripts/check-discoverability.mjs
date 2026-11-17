import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4174']);
let browser;
try{
 for(let i=0;i<60;i++){try{if((await fetch('http://127.0.0.1:4174')).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 await mkdir('test-results',{recursive:true});const reports=[];
 for(const width of [320,390,1440])for(const suffix of ['','en/','ja/']){
  const page=await browser.newPage({viewport:{width,height:900}});
  // Production absolute URLs are intentional; serve their matching built files locally for this preview.
  await page.route('https://devnazu.jp/nihongo-path/**',async route=>{
   const response=await fetch(route.request().url().replace('https://devnazu.jp','http://127.0.0.1:4174'));
   await route.fulfill({status:response.status,headers:Object.fromEntries(response.headers),body:Buffer.from(await response.arrayBuffer())});
  });
  await page.goto('http://127.0.0.1:4174/nihongo-path/'+suffix,{waitUntil:'networkidle'});
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.locator('link[rel="alternate"][hreflang]').count(),4);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://devnazu.jp/nihongo-path/'+suffix);
  const schema=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());assert.equal(schema['@type'],'MobileApplication');
  assert.equal(await page.locator('a[href="https://play.google.com/store/apps/details?id=online.devnazu.books"]').count(),1);
  assert.equal(await page.locator('a[href="https://nihongo-path.en.uptodown.com/android"]').count(),1);
  for(const image of await page.locator('img').all())await image.scrollIntoViewIfNeeded();
  assert(await page.locator('img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0)));
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(axe.violations.map(v=>v.id),[]);
  reports.push({width,lang:suffix||'bn',canonical:true,images:true,noOverflow:true,accessibilityViolations:0});
  if(width===390)await page.screenshot({path:'test-results/nihongo-path-'+(suffix.replace('/','')||'bn')+'.png',fullPage:true});
  await page.close();
 }
 await writeFile('test-results/discoverability-qa.json',JSON.stringify(reports,null,2));console.log(JSON.stringify({passed:reports.length,reports}));
}finally{await browser?.close();server.kill();}
