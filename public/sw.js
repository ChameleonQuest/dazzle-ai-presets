if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>n(e,i),m={module:{uri:i},exports:c,require:r};s[i]=Promise.all(a.map((e=>m[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"d1dc7c20ef09d8a6402fa232d3ba37f5"},{url:"/_next/static/chunks/182-3182bb10222112c4.js",revision:"lOmTmGs7BOG9ZmYX-OBj_"},{url:"/_next/static/chunks/4bd1b696-706542d81d24ca2f.js",revision:"lOmTmGs7BOG9ZmYX-OBj_"},{url:"/_next/static/chunks/579-b11470fee0a41dce.js",revision:"lOmTmGs7BOG9ZmYX-OBj_"},{url:"/_next/static/chunks/app/_not-found/page-0366ad202f3b1da8.js",revision:"lOmTmGs7BOG9ZmYX-OBj_"},{url:"/_next/static/chunks/app/gem-runner/page-dc8b666966bf3816.js",revision:"lOmTmGs7BOG9ZmYX-OBj_"},{url:"/_next/static/chunks/app/gem-saver/page-a46e9d5717c14aab.js",revision:"lOmTmGs7BOG9ZmYX-OBj_"},{url:"/_next/static/chunks/app/layout-9572965267a26314.js",revision:"lOmTmGs7BOG9ZmYX-OBj_"},{url:"/_next/static/chunks/app/page-102cd6983fdfcc67.js",revision:"lOmTmGs7BOG9ZmYX-OBj_"},{url:"/_next/static/chunks/framework-d2f4bc65ced8d4a1.js",revision:"lOmTmGs7BOG9ZmYX-OBj_"},{url:"/_next/static/chunks/main-58568ce52b07a0fc.js",revision:"lOmTmGs7BOG9ZmYX-OBj_"},{url:"/_next/static/chunks/main-app-9382b1c4c1d07deb.js",revision:"lOmTmGs7BOG9ZmYX-OBj_"},{url:"/_next/static/chunks/pages/_app-daa5cb8560567b4d.js",revision:"lOmTmGs7BOG9ZmYX-OBj_"},{url:"/_next/static/chunks/pages/_error-4cacf33de97c3163.js",revision:"lOmTmGs7BOG9ZmYX-OBj_"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-7d9af9209f826a9f.js",revision:"lOmTmGs7BOG9ZmYX-OBj_"},{url:"/_next/static/css/b822c13ff5e54850.css",revision:"b822c13ff5e54850"},{url:"/_next/static/css/f01f762b1c0b0b5e.css",revision:"f01f762b1c0b0b5e"},{url:"/_next/static/lOmTmGs7BOG9ZmYX-OBj_/_buildManifest.js",revision:"8cef47ffe085f462e592c295cb609ed6"},{url:"/_next/static/lOmTmGs7BOG9ZmYX-OBj_/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/file-text.svg",revision:"888af2151b1f3cad46bd4f5730a98594"},{url:"/globe.svg",revision:"101ba0a88108a8ea12a3efeb8fb67e0a"},{url:"/images/dazzle-icon-192x192.png",revision:"db88350b62d31068f225c83e902d17ed"},{url:"/images/dazzle-icon-512x512.png",revision:"3b0c5ee789c78161ed038651e2932026"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/service-worker.js",revision:"779a11e265c70f3ef38d6821ea76675a"},{url:"/vercel.svg",revision:"8bb08185574bc8e792bece7536c726f5"},{url:"/window.svg",revision:"34857d17263ccc6b04245b92a9f013ff"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
