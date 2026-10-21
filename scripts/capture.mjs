// Re-capture the owner's actual live/site-source interfaces for provenance review.
// CHROME_PATH may select a locally installed Chrome; otherwise install Playwright Chromium.
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {}), args:['--no-sandbox']});
await mkdir('test-results/source-captures',{recursive:true});
try {
  for (const [name,url,source] of [
    ['halal','https://mr04nazmul.github.io/Halal-japan/',null],
    ['receipt',null,'https://raw.githubusercontent.com/Mr04Nazmul/receipt-ai-japan/main/index.html'],
    ['nazorix',null,'https://raw.githubusercontent.com/Mr04Nazmul/nazulabs/main/index.html']
  ]) {
    const page=await browser.newPage({viewport:{width:1100,height:760},deviceScaleFactor:1});
    try {
      if(url) await page.goto(url,{waitUntil:'domcontentloaded'});
      else {const response=await fetch(source);if(!response.ok)throw new Error(`${source}: ${response.status}`);await page.setContent(await response.text(),{waitUntil:'domcontentloaded'});}
      await page.screenshot({path:`test-results/source-captures/${name}.png`});
      console.log(name,await page.title());
    } finally {await page.close();}
  }
} finally {await browser.close();}
