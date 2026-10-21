import {chromium} from '@playwright/test';
import {readFile,writeFile} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/tmp/chrome-test/chrome-headless-shell-linux64/chrome-headless-shell',proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined,args:['--no-sandbox']});
for(const [name,url] of [['halal','https://mr04nazmul.github.io/Halal-japan/'],['receipt',null],['nazorix',null]]){
 const page=await browser.newPage({viewport:{width:1100,height:760},deviceScaleFactor:1});
 try{if(url)await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});else await page.setContent(await readFile('/tmp/devnazu-captures/'+name+'.html','utf8'),{waitUntil:'domcontentloaded'});await page.waitForTimeout(2500);console.log(name,(await page.title()),(await page.locator('body').innerText()).slice(0,250));await page.screenshot({path:'public/images/'+name+'.png'});}catch(e){console.log(name,e.message)}finally{await page.close()}
}
await browser.close();
