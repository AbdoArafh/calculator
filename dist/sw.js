if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let f={};const o=e=>s(e,c),t={module:{uri:c},exports:f,require:o};i[c]=Promise.all(n.map((e=>t[e]||o(e)))).then((e=>(r(...e),f)))}}define(["./workbox-e0782b83"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.50fd6ffa.js",revision:null},{url:"assets/index.d96f2d07.css",revision:null},{url:"index.html",revision:"f1cde54797153aab211fdf6e056d8cbc"},{url:"registerSW.js",revision:"7a3217f0fb7ae3b80cf5889c9f24ccbe"},{url:"favicon.svg",revision:"ce95d53df6cc885d97ce2a85abc1eb34"},{url:"apple-touch-icon.png",revision:"5fef57e9ec09f26bc9fef0b62a6e8c68"},{url:"192x192.png",revision:"ce1ba3db197fb4b0052144081153dc4e"},{url:"512x512.png",revision:"4fe1d11442b342683d9825c94fe5197e"},{url:"manifest.webmanifest",revision:"0a2562463544d8f4d7165dd69e9a8d34"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));