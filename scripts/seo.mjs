export function keywordsFor(file,article,brands,topics){
 if(article)return [...new Set([article.title.split('：')[0],topics.find(t=>t.id===article.topic)?.name,...article.brandIds.map(id=>brands.find(b=>b.id===id)?.name),article.kind==='guide'?'机场选购指南':'机场套餐分析'].filter(Boolean))].join(',');
 const brand=brands.find(b=>file===`brands/${b.id}/index.html`);
 if(brand)return `${brand.name},${brand.name}机场,${brand.name}套餐,${brand.name}官方入口,${brand.name}流量周期`;
 const topic=topics.find(t=>file===`topics/${t.id}/index.html`);
 if(topic)return `${topic.name},机场选购指南,机场套餐分析`;
 const pages={
 'index.html':'机场推荐,机场推荐2026,机场网络,机场套餐对比,机场选购指南',
 'blog/index.html':'机场推荐博客,机场套餐分析,机场选购方法',
 'topics/index.html':'机场选购专题,机场选购指南,流量与付款周期',
 'compare/index.html':'机场套餐对比,机场价格对比,机场流量对比',
 'select/index.html':'机场选购工具,机场月预算,流量预算计算',
 'coupons/index.html':'机场优惠码,机场推广入口,优惠条件核对',
 'guide/index.html':'机场选购指南,机场推荐,套餐与续费核对',
 'research/index.html':'机场公开证据,机场官方入口,套餐资料核对',
 'updates/index.html':'机场资料更新,套餐版本记录,公开访问复查',
 'about/index.html':'机场网络,机场网络博客,编辑身份',
 'methodology/index.html':'机场套餐计算口径,机场编辑方法,流量重置',
 'disclosure/index.html':'机场推广披露,推广链接,优惠码条件',
 'privacy/index.html':'机场网络隐私说明,本地收藏,浏览记录',
 'contact/index.html':'机场资料更正,公开证据,更正草稿',
 'sitemap/index.html':'机场网络站点地图,品牌档案索引,博客索引',
 'search/index.html':'机场网络搜索,品牌搜索,博客搜索',
 'library/index.html':'机场网络收藏,最近阅读',
 '404.html':'机场网络,页面未找到'};
 return pages[file]??'机场网络,机场选购资料';
}
export function writeSeoArtifacts(fs,out,config,pages){
 const indexed=pages.filter(p=>p.index);
 const groups=[['pages',indexed.filter(p=>! /^(brands|blog|topics)\/.+\//.test(p.file))],['brands',indexed.filter(p=>/^brands\/.+\//.test(p.file))],['articles',indexed.filter(p=>/^blog\/.+\//.test(p.file))],['topics',indexed.filter(p=>/^topics\/.+\//.test(p.file))]];
 const escape=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
 for(const [group,rows]of groups)fs.writeFileSync(`${out}/sitemap-${group}.xml`,`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${rows.map(p=>`<url><loc>${escape(p.canonical)}</loc><lastmod>${config.date}</lastmod></url>`).join('')}</urlset>`);
 const index=`<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${groups.map(([group])=>`<sitemap><loc>${escape(config.url)}/sitemap-${group}.xml</loc><lastmod>${config.date}</lastmod></sitemap>`).join('')}</sitemapindex>`;
 fs.writeFileSync(out+'/sitemap.xml',index);
 fs.writeFileSync(out+'/sitemap-index.xml',index);
 const report={site:config.name,domain:config.url,primaryKeyword:config.primaryKeyword,pageCount:pages.length,indexablePages:indexed.length,noindexPages:pages.filter(p=>!p.index).map(p=>p.canonical),sitemaps:groups.map(([group,rows])=>({url:config.url+`/sitemap-${group}.xml`,pages:rows.length})),bingVerification:'not connected; no verification token supplied',bingSubmission:'not submitted; production domain not verified',pages:pages.map(p=>({url:p.canonical,title:p.title+' | '+config.name,description:p.desc,keywords:p.keywords,indexable:p.index}))};
 fs.writeFileSync(out+'/seo-report.json',JSON.stringify(report,null,2));
 const csv=x=>'"'+String(x??'').replaceAll('"','""')+'"';
 fs.writeFileSync(out+'/tdk.csv','\uFEFFURL,Title,Description,Keywords,Indexable\r\n'+report.pages.map(p=>[p.url,p.title,p.description,p.keywords,p.indexable].map(csv).join(',')).join('\r\n'));
 return report;
}
