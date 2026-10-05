import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const brands=JSON.parse(fs.readFileSync(root+'/data/brands.json','utf8'));
const official=JSON.parse(fs.readFileSync(root+'/data/official-checks.json','utf8'));
const records=[];
let index=0;
async function get(url,kind){if(!url)return null;try{const r=await fetch(url,{signal:AbortSignal.timeout(12000),headers:{'User-Agent':'CloudTrailsEditorial/1.0 (+https://jichangnetwork.blog/about/)'}});const text=await r.text();const result={url,status:r.status,finalUrl:r.url,checkedAt:new Date().toISOString(),kind};if(kind==='config'){try{const j=JSON.parse(text);result.publicName=j.data?.app_name??j.app_name??null;result.publicDescription=j.data?.app_description??j.app_description??null;}catch{result.parseable=false;}}else{result.title=text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim()??null;result.sha256=createHash('sha256').update(text).digest('hex');}return result;}catch(e){return{url,status:null,error:e.name,checkedAt:new Date().toISOString(),kind};}}
async function worker(){while(index<brands.length){const b=brands[index++];const old=official.records.find(r=>r.id===b.id);const [source,config]=await Promise.all([get(b.source,'reference-page'),get(old?.configUrl,'config')]);records.push({id:b.id,source,publicConfig:config,currentPriceVerified:false,couponCheckoutVerified:false,ownSpeedTest:false});console.log(b.id,source?.status??'unavailable',config?.status??'unavailable');}}
await Promise.all([worker(),worker(),worker(),worker()]);
records.sort((a,b)=>brands.findIndex(x=>x.id===a.id)-brands.findIndex(x=>x.id===b.id));
const report={checkedDate:'2026-10-05',method:'重新读取已有资料来源和10月3日发现的面板公开配置。HTTP可访问性只说明读取成功；套餐数值沿用10月3日转录的参考资料，不表示现价或购买页已确认。未登录、注册、购买或测速。',records};
fs.writeFileSync(root+'/data/public-review.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({checked:records.length,sourceAccessible:records.filter(r=>r.source?.status===200).length,configAccessible:records.filter(r=>r.publicConfig?.status===200).length}));
