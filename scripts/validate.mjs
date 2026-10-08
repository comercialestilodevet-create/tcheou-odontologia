import { readFileSync, existsSync } from "node:fs";
import { resolve, extname } from "node:path";
const root=process.cwd();
const html=readFileSync(resolve(root,"index.html"),"utf8");
const js=readFileSync(resolve(root,"js/script.js"),"utf8");
const errors=[];
if(!/^<!doctype html>/i.test(html.trim())) errors.push("index.html: missing doctype");
if(!/<html[^>]+lang="pt-BR"/i.test(html)) errors.push("index.html: lang pt-BR missing");
for(const ref of [...html.matchAll(/(?:href|src)="(\/[^"]+)"/g)].map(m=>m[1]).filter(x=>!/^\/\//.test(x)&&!x.startsWith("/api/")&&!x.includes("://"))){
 const p=resolve(root,"."+ref);
 if(!existsSync(p)) errors.push("Missing local asset: "+ref);
}
try{new Function(js)}catch(e){errors.push("js/script.js syntax error: "+e.message)}
if(!/<meta[^>]+name="description"/i.test(html)) errors.push("meta description missing");
if(!/<script[^>]+type="application\/ld\+json"/i.test(html)) errors.push("JSON-LD missing");
if(!/wa\.me|api\.whatsapp\.com/i.test(html)) errors.push("WhatsApp CTA missing");
if(!existsSync(resolve(root,"robots.txt"))) errors.push("robots.txt missing");
if(!existsSync(resolve(root,"sitemap.xml"))) errors.push("sitemap.xml missing");
if(errors.length){console.error("\n"+errors.map(x=>"✖ "+x).join("\n"));process.exit(1)}
console.log("✓ Tcheou Odontologia static validation passed");
console.log("✓ HTML metadata / local references / JavaScript syntax / SEO essentials verified");
