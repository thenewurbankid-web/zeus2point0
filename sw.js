// Zeus service worker: app shell offline, CDN libraries cached, live market/API data always from the network.
const V='zeus-2.2.3';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-180.png'];
const CDN=/^https:\/\/(unpkg\.com|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|esm\.run|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL).catch(()=>{})).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&!k.startsWith('webllm')).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(u.origin===location.origin){
    if(u.pathname.endsWith('status.json'))return;                                   // live-build status: network only
    if(r.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/')){  // app: network first, cached copy offline
      e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put(r,c));return res;}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))));return;}
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put(r,c));return res;})));return;}
  if(CDN.test(r.url)&&!/web-llm|mlc-ai/.test(r.url)){                                 // libraries: stale-while-revalidate
    e.respondWith(caches.open(V).then(c=>c.match(r).then(m=>{const net=fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone());return res;}).catch(()=>m);return m||net;})));}
});
self.addEventListener('notificationclick',e=>{e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{const c=cs.find(x=>'focus' in x);
    if(c){c.focus();c.postMessage({type:'open-alerts'});return;}return self.clients.openWindow('./#alerts');}));});
