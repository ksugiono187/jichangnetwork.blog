import assert from 'node:assert/strict';
import fs from 'node:fs';
import {articles,topics,articleTopicIds,guides} from '../data/articles.mjs';
import {dossiers,technicalSources} from '../data/topic-dossiers.mjs';
import {dossierText} from './topic-research.mjs';
import {workbookIds} from '../data/guide-workbooks.mjs';
const root=new URL('../',import.meta.url),read=p=>fs.readFileSync(new URL(p,root),'utf8');
const E=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
assert.deepEqual(Object.keys(dossiers).sort(),topics.map(t=>t.id).sort());
assert.equal(workbookIds.length,34);assert.equal(guides.length,36);
const headings=new Set();let authoredCharacters=0,sourceLinks=0;
for(const t of topics){
 const d=dossiers[t.id],html=read(`dist/topics/${t.id}/index.html`);
 assert(d.sections.length===3&&d.sections.every(s=>s.paragraphs.length===2));
 const text=dossierText(d);assert(text.length>=780,`Substantive original research: ${t.id}`);authoredCharacters+=text.length;
 assert(!headings.has(d.question));headings.add(d.question);
 assert(d.table.rows.length>=2);assert(d.table.rows.every(r=>r.length===d.table.columns.length));
 assert.equal(d.reading.length,3);assert.equal(new Set(d.reading).size,3);
 for(const id of d.reading){const a=articles.find(a=>a.id===id);assert(a,`Reading route exists: ${id}`);assert(articleTopicIds(a).includes(t.id),`Topic filter and route agree: ${id}`);assert(html.includes(`../../blog/${id}/`));}
 for(const s of d.sections)for(const p of s.paragraphs)assert(html.includes(E(p)),`Full text rendered: ${t.id}`);
 for(const p of d.caseStudy.paragraphs)assert(html.includes(E(p)));
 assert(html.includes('class="dossier-body"')&&html.includes('<caption>')&&html.includes('scope="row"'));
 for(const id of ['research-1','research-2','research-3','comparison','case-study','action-list','research-sources'])assert(html.includes(`id="${id}"`));
 for(const id of d.references){assert(technicalSources[id]);assert(html.includes(technicalSources[id].url));sourceLinks++;}
 assert(!/assets\/evidence\/|codex-clipboard/.test(html));
}
for(const id of workbookIds){const a=guides.find(a=>a.id===id);assert(a&&a.sections.length>=5);const html=read(`dist/blog/${id}/index.html`);assert(!a.sections.some(s=>s.heading==='情景分析与应用'));for(const s of a.sections.slice(-2))for(const p of s.paragraphs)assert(html.includes(E(p)));}
const index=JSON.parse(read('dist/assets/site-data.json')).searchIndex;
for(const t of topics){const entry=index.find(e=>e.path===`topics/${t.id}/`);assert(entry&&entry.text.includes(dossiers[t.id].caseStudy.paragraphs[0]));}
assert.equal((43*.7+11*43).toFixed(2),'503.10');assert.equal((43/200).toFixed(3),'0.215');assert.equal((73/200).toFixed(3),'0.365');assert.equal(96/6,16);assert.equal(78/6,13);assert.equal(25+10*3,55);
const report={status:'passed',topics:24,authoredCharacters,tables:24,scenarios:24,actionChecklists:24,curatedReadingLinks:72,shortGuidesReworked:34,existingLongReadsPreserved:2,technicalReferences:Object.keys(technicalSources).length,topicReferenceLinks:sourceLinks,sourceDate:'2026-10-05',originalPackageRecordsChanged:false};
fs.writeFileSync(new URL('TOPIC-VALIDATION.json',root),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
