// ==UserScript==
// @author         xMAXIMx
// @id             scanner-link-copy@xMAXIMx
// @name           Scanner link-copy
// @version        0.2.1.1
// @description    Adds scanner link (copy mode) to IITC
// @category       Info
// @updateURL      https://raw.githubusercontent.com/IITC-CE/Community-plugins/master/dist/xMAXIMx/scanner-link-copy.meta.js
// @downloadURL    https://raw.githubusercontent.com/IITC-CE/Community-plugins/master/dist/xMAXIMx/scanner-link-copy.user.js
// @include        *://*.ingress.com/*
// @match          *://*.ingress.com/*
// ==/UserScript==
function wrapper(plugin_info) {
  if(typeof window.plugin !== 'function') window.plugin = function(){};
  window.plugin.scannerLinkCopy = function () {};
  window.plugin.scannerLinkCopy.portalInfo = function () {$('.linkdetails').append('<aside><a id="scannerLinkCopy" target="_blank" onclick="window.plugin.scannerLinkCopy.copyLink(\'https://link.ingress.com/portal/' + window.selectedPortal + '\')">Copy New Scanner Link</a></aside>');};
  window.plugin.scannerLinkCopy.copyLink = function (link){if (typeof android !== "undefined") {androidCopy(link);}else{navigator.clipboard.writeText(link);}}
  function setup() {window.addHook('portalDetailsUpdated', window.plugin.scannerLinkCopy.portalInfo);}
  setup.info = plugin_info;
  if (!window.bootPlugins) window.bootPlugins = [];
  window.bootPlugins.push(setup);
  if (window.iitcLoaded && typeof setup === 'function')setup();
}
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) {info.script = {version: GM_info.script.version,name: GM_info.script.name,description: GM_info.script.description};}
var textContent = document.createTextNode('('+ wrapper +')('+ JSON.stringify(info) +')');
script.appendChild(textContent);
(document.body || document.head || document.documentElement).appendChild(script);
