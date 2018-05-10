parcelRequire=function(e,r,n,t){function i(n,t){function o(e){return i(o.resolve(e))}function c(r){return e[n][1][r]||r}if(!r[n]){if(!e[n]){var l="function"==typeof parcelRequire&&parcelRequire;if(!t&&l)return l(n,!0);if(u)return u(n,!0);if(f&&"string"==typeof n)return f(n);var p=new Error("Cannot find module '"+n+"'");throw p.code="MODULE_NOT_FOUND",p}o.resolve=c;var a=r[n]=new i.Module(n);e[n][0].call(a.exports,o,a,a.exports,this)}return r[n].exports}function o(e){this.id=e,this.bundle=i,this.exports={}}var u="function"==typeof parcelRequire&&parcelRequire,f="function"==typeof require&&require;i.isParcelRequire=!0,i.Module=o,i.modules=e,i.cache=r,i.parent=u;for(var c=0;c<n.length;c++)i(n[c]);if(n.length){var l=i(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):t&&(this[t]=l)}return i}({6:[function(require,module,exports) {
var global = arguments[3];
var e=arguments[3];!function(){"use strict";function t(e,t,n,r,o,i){return{tag:e,key:t,attrs:n,children:r,text:o,dom:i,domSize:void 0,state:void 0,_state:void 0,events:void 0,instance:void 0,skip:!1}}t.normalize=function(e){return Array.isArray(e)?t("[",void 0,void 0,t.normalizeChildren(e),void 0,void 0):null!=e&&"object"!=typeof e?t("#",void 0,void 0,!1===e?"":e,void 0,void 0):e},t.normalizeChildren=function(e){for(var n=0;n<e.length;n++)e[n]=t.normalize(e[n]);return e};var n=/(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,r={},o={}.hasOwnProperty;function i(e){for(var t in e)if(o.call(e,t))return!1;return!0}function l(e){var l,a=arguments[1],u=2;if(null==e||"string"!=typeof e&&"function"!=typeof e&&"function"!=typeof e.view)throw Error("The selector must be either a string or a component.");if("string"==typeof e)var s=r[e]||function(e){for(var t,o="div",i=[],l={};t=n.exec(e);){var a=t[1],u=t[2];if(""===a&&""!==u)o=u;else if("#"===a)l.id=u;else if("."===a)i.push(u);else if("["===t[3][0]){var s=t[6];s&&(s=s.replace(/\\(["'])/g,"$1").replace(/\\\\/g,"\\")),"class"===t[4]?i.push(s):l[t[4]]=""===s?s:s||!0}}return i.length>0&&(l.className=i.join(" ")),r[e]={tag:o,attrs:l}}(e);if(null==a?a={}:("object"!=typeof a||null!=a.tag||Array.isArray(a))&&(a={},u=1),arguments.length===u+1)l=arguments[u],Array.isArray(l)||(l=[l]);else for(l=[];u<arguments.length;)l.push(arguments[u++]);var f=t.normalizeChildren(l);return"string"==typeof e?function(e,n,r){var l,a,u=!1,s=n.className||n.class;if(!i(e.attrs)&&!i(n)){var f={};for(var c in n)o.call(n,c)&&(f[c]=n[c]);n=f}for(var c in e.attrs)o.call(e.attrs,c)&&(n[c]=e.attrs[c]);for(var c in void 0!==s&&(void 0!==n.class&&(n.class=void 0,n.className=s),null!=e.attrs.className&&(n.className=e.attrs.className+" "+s)),n)if(o.call(n,c)&&"key"!==c){u=!0;break}return Array.isArray(r)&&1===r.length&&null!=r[0]&&"#"===r[0].tag?a=r[0].children:l=r,t(e.tag,n.key,u?n:void 0,l,a)}(s,a,f):t(e,a.key,a,f)}l.trust=function(e){return null==e&&(e=""),t("<",void 0,void 0,e,void 0,void 0)},l.fragment=function(e,n){return t("[",e.key,e,t.normalizeChildren(n),void 0,void 0)};var a=l;if((u=function(e){if(!(this instanceof u))throw new Error("Promise must be called with `new`");if("function"!=typeof e)throw new TypeError("executor must be a function");var t=this,n=[],r=[],o=s(n,!0),i=s(r,!1),l=t._instance={resolvers:n,rejectors:r},a="function"==typeof setImmediate?setImmediate:setTimeout;function s(e,o){return function u(s){var c;try{if(!o||null==s||"object"!=typeof s&&"function"!=typeof s||"function"!=typeof(c=s.then))a(function(){o||0!==e.length||console.error("Possible unhandled promise rejection:",s);for(var t=0;t<e.length;t++)e[t](s);n.length=0,r.length=0,l.state=o,l.retry=function(){u(s)}});else{if(s===t)throw new TypeError("Promise can't be resolved w/ itself");f(c.bind(s))}}catch(e){i(e)}}}function f(e){var t=0;function n(e){return function(n){t++>0||e(n)}}var r=n(i);try{e(n(o),r)}catch(e){r(e)}}f(e)}).prototype.then=function(e,t){var n,r,o=this._instance;function i(e,t,i,l){t.push(function(t){if("function"!=typeof e)i(t);else try{n(e(t))}catch(e){r&&r(e)}}),"function"==typeof o.retry&&l===o.state&&o.retry()}var l=new u(function(e,t){n=e,r=t});return i(e,o.resolvers,n,!0),i(t,o.rejectors,r,!1),l},u.prototype.catch=function(e){return this.then(null,e)},u.resolve=function(e){return e instanceof u?e:new u(function(t){t(e)})},u.reject=function(e){return new u(function(t,n){n(e)})},u.all=function(e){return new u(function(t,n){var r=e.length,o=0,i=[];if(0===e.length)t([]);else for(var l=0;l<e.length;l++)!function(l){function a(e){o++,i[l]=e,o===r&&t(i)}null==e[l]||"object"!=typeof e[l]&&"function"!=typeof e[l]||"function"!=typeof e[l].then?a(e[l]):e[l].then(a,n)}(l)})},u.race=function(e){return new u(function(t,n){for(var r=0;r<e.length;r++)e[r].then(t,n)})},"undefined"!=typeof window){void 0===window.Promise&&(window.Promise=u);var u=window.Promise}else if(void 0!==e){void 0===e.Promise&&(e.Promise=u);u=e.Promise}var s=function(e){if("[object Object]"!==Object.prototype.toString.call(e))return"";var t=[];for(var n in e)r(n,e[n]);return t.join("&");function r(e,n){if(Array.isArray(n))for(var o=0;o<n.length;o++)r(e+"["+o+"]",n[o]);else if("[object Object]"===Object.prototype.toString.call(n))for(var o in n)r(e+"["+o+"]",n[o]);else t.push(encodeURIComponent(e)+(null!=n&&""!==n?"="+encodeURIComponent(n):""))}},f=new RegExp("^file://","i"),c=function(e,t){var n,r=0;function o(){var e=0;function t(){0==--e&&"function"==typeof n&&n()}return function n(r){var o=r.then;return r.then=function(){e++;var i=o.apply(r,arguments);return i.then(t,function(n){if(t(),0===e)throw n}),n(i)},r}}function i(e,t){if("string"==typeof e){var n=e;null==(e=t||{}).url&&(e.url=n)}return e}function l(e,t){if(null==t)return e;for(var n=e.match(/:[^\/]+/gi)||[],r=0;r<n.length;r++){var o=n[r].slice(1);null!=t[o]&&(e=e.replace(n[r],t[o]))}return e}function a(e,t){var n=s(t);return""!==n&&(e+=(e.indexOf("?")<0?"?":"&")+n),e}function u(e){try{return""!==e?JSON.parse(e):null}catch(t){throw new Error(e)}}function c(e){return e.responseText}function d(e,t){if("function"==typeof e){if(!Array.isArray(t))return new e(t);for(var n=0;n<t.length;n++)t[n]=new e(t[n])}return t}return{request:function(n,r){var s=o();n=i(n,r);var v=new t(function(t,r){null==n.method&&(n.method="GET"),n.method=n.method.toUpperCase();var o="GET"!==n.method&&"TRACE"!==n.method&&("boolean"!=typeof n.useBody||n.useBody);"function"!=typeof n.serialize&&(n.serialize="undefined"!=typeof FormData&&n.data instanceof FormData?function(e){return e}:JSON.stringify),"function"!=typeof n.deserialize&&(n.deserialize=u),"function"!=typeof n.extract&&(n.extract=c),n.url=l(n.url,n.data),o?n.data=n.serialize(n.data):n.url=a(n.url,n.data);var i=new e.XMLHttpRequest,s=!1,v=i.abort;for(var h in i.abort=function(){s=!0,v.call(i)},i.open(n.method,n.url,"boolean"!=typeof n.async||n.async,"string"==typeof n.user?n.user:void 0,"string"==typeof n.password?n.password:void 0),n.serialize!==JSON.stringify||!o||n.headers&&n.headers.hasOwnProperty("Content-Type")||i.setRequestHeader("Content-Type","application/json; charset=utf-8"),n.deserialize!==u||n.headers&&n.headers.hasOwnProperty("Accept")||i.setRequestHeader("Accept","application/json, text/*"),n.withCredentials&&(i.withCredentials=n.withCredentials),n.headers)({}).hasOwnProperty.call(n.headers,h)&&i.setRequestHeader(h,n.headers[h]);"function"==typeof n.config&&(i=n.config(i,n)||i),i.onreadystatechange=function(){if(!s&&4===i.readyState)try{var e=n.extract!==c?n.extract(i,n):n.deserialize(n.extract(i,n));if(i.status>=200&&i.status<300||304===i.status||f.test(n.url))t(d(n.type,e));else{var o=new Error(i.responseText);for(var l in e)o[l]=e[l];r(o)}}catch(e){r(e)}},o&&null!=n.data?i.send(n.data):i.send()});return!0===n.background?v:s(v)},jsonp:function(n,u){var s=o();n=i(n,u);var f=new t(function(t,o){var i=n.callbackName||"_mithril_"+Math.round(1e16*Math.random())+"_"+r++,u=e.document.createElement("script");e[i]=function(r){u.parentNode.removeChild(u),t(d(n.type,r)),delete e[i]},u.onerror=function(){u.parentNode.removeChild(u),o(new Error("JSONP request failed")),delete e[i]},null==n.data&&(n.data={}),n.url=l(n.url,n.data),n.data[n.callbackKey||"callback"]=i,u.src=a(n.url,n.data),e.document.documentElement.appendChild(u)});return!0===n.background?f:s(f)},setCompletionCallback:function(e){n=e}}}(window,u),d=function(e){var n,r=e.document,o=r.createDocumentFragment(),i={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"};function l(e){return e.attrs&&e.attrs.xmlns||i[e.tag]}function a(e,t,n,r,o,i,l){for(var a=n;a<r;a++){var s=t[a];null!=s&&u(e,s,o,l,i)}}function u(e,n,i,c,d){var v=n.tag;if("string"!=typeof v)return function(e,t,n,r,i){if(f(t,n),null!=t.instance){var l=u(e,t.instance,n,r,i);return t.dom=t.instance.dom,t.domSize=null!=t.dom?t.instance.domSize:0,m(e,l,i),l}return t.domSize=0,o}(e,n,i,c,d);switch(n.state={},null!=n.attrs&&S(n.attrs,n,i),v){case"#":return function(e,t,n){return t.dom=r.createTextNode(t.children),m(e,t.dom,n),t.dom}(e,n,d);case"<":return s(e,n,d);case"[":return function(e,t,n,o,i){var l=r.createDocumentFragment();if(null!=t.children){var u=t.children;a(l,u,0,u.length,n,null,o)}return t.dom=l.firstChild,t.domSize=l.childNodes.length,m(e,l,i),l}(e,n,i,c,d);default:return function(e,n,o,i,u){var s=n.tag,f=n.attrs,c=f&&f.is,d=(i=l(n)||i)?c?r.createElementNS(i,s,{is:c}):r.createElementNS(i,s):c?r.createElement(s,{is:c}):r.createElement(s);n.dom=d,null!=f&&function(e,t,n){for(var r in t)x(e,r,null,t[r],n)}(n,f,i);if(m(e,d,u),null!=n.attrs&&null!=n.attrs.contenteditable)g(n);else if(null!=n.text&&(""!==n.text?d.textContent=n.text:n.children=[t("#",void 0,void 0,n.text,void 0,void 0)]),null!=n.children){var v=n.children;a(d,v,0,v.length,o,null,i),function(e){var t=e.attrs;"select"===e.tag&&null!=t&&("value"in t&&x(e,"value",null,t.value,void 0),"selectedIndex"in t&&x(e,"selectedIndex",null,t.selectedIndex,void 0))}(n)}return d}(e,n,i,c,d)}}function s(e,t,n){var o={caption:"table",thead:"table",tbody:"table",tfoot:"table",tr:"tbody",th:"tr",td:"tr",colgroup:"table",col:"colgroup"}[(t.children.match(/^\s*?<(\w+)/im)||[])[1]]||"div",i=r.createElement(o);i.innerHTML=t.children,t.dom=i.firstChild,t.domSize=i.childNodes.length;for(var l,a=r.createDocumentFragment();l=i.firstChild;)a.appendChild(l);return m(e,a,n),a}function f(e,n){var r;if("function"==typeof e.tag.view){if(e.state=Object.create(e.tag),null!=(r=e.state.view).$$reentrantLock$$)return o;r.$$reentrantLock$$=!0}else{if(e.state=void 0,null!=(r=e.tag).$$reentrantLock$$)return o;r.$$reentrantLock$$=!0,e.state=null!=e.tag.prototype&&"function"==typeof e.tag.prototype.view?new e.tag(e):e.tag(e)}if(e._state=e.state,null!=e.attrs&&S(e.attrs,e,n),S(e._state,e,n),e.instance=t.normalize(e._state.view.call(e.state,e)),e.instance===e)throw Error("A view cannot return the vnode it received as argument");r.$$reentrantLock$$=null}function c(e,t,n,r,o,i,l){if(t!==n&&(null!=t||null!=n))if(null==t)a(e,n,0,n.length,o,i,l);else if(null==n)y(t,0,t.length,n);else{if(t.length===n.length){for(var s=!1,f=0;f<n.length;f++)if(null!=n[f]&&null!=t[f]){s=null==n[f].key&&null==t[f].key;break}if(s){for(f=0;f<t.length;f++)t[f]!==n[f]&&(null==t[f]&&null!=n[f]?u(e,n[f],o,l,p(t,f+1,i)):null==n[f]?y(t,f,f+1,n):d(e,t[f],n[f],o,p(t,f+1,i),r,l));return}}if(r=r||function(e,t){if(null!=e.pool&&Math.abs(e.pool.length-t.length)<=Math.abs(e.length-t.length)){var n=e[0]&&e[0].children&&e[0].children.length||0,r=e.pool[0]&&e.pool[0].children&&e.pool[0].children.length||0,o=t[0]&&t[0].children&&t[0].children.length||0;if(Math.abs(r-o)<=Math.abs(n-o))return!0}return!1}(t,n)){var c=t.pool;t=t.concat(t.pool)}for(var g,w=0,b=0,x=t.length-1,k=n.length-1;x>=w&&k>=b;){if((S=t[w])!==(E=n[b])||r)if(null==S)w++;else if(null==E)b++;else if(S.key===E.key){var C=null!=c&&w>=t.length-c.length||null==c&&r;b++,d(e,S,E,o,p(t,++w,i),C,l),r&&S.tag===E.tag&&m(e,h(S),i)}else{if((S=t[x])!==E||r)if(null==S)x--;else if(null==E)b++;else{if(S.key!==E.key)break;C=null!=c&&x>=t.length-c.length||null==c&&r;d(e,S,E,o,p(t,x+1,i),C,l),(r||b<k)&&m(e,h(S),p(t,w,i)),x--,b++}else x--,b++}else w++,b++}for(;x>=w&&k>=b;){var S,E;if((S=t[x])!==(E=n[k])||r)if(null==S)x--;else if(null==E)k--;else if(S.key===E.key){C=null!=c&&x>=t.length-c.length||null==c&&r;d(e,S,E,o,p(t,x+1,i),C,l),r&&S.tag===E.tag&&m(e,h(S),i),null!=S.dom&&(i=S.dom),x--,k--}else{if(g||(g=v(t,x)),null!=E){var z=g[E.key];if(null!=z){var A=t[z];C=null!=c&&z>=t.length-c.length||null==c&&r;d(e,A,E,o,p(t,x+1,i),r,l),m(e,h(A),i),t[z].skip=!0,null!=A.dom&&(i=A.dom)}else{i=u(e,E,o,l,i)}}k--}else x--,k--;if(k<b)break}a(e,n,b,k+1,o,i,l),y(t,w,x+1,n)}}function d(e,n,r,o,i,a,v){var p=n.tag;if(p===r.tag){if(r.state=n.state,r._state=n._state,r.events=n.events,!a&&function(e,t){var n,r;null!=e.attrs&&"function"==typeof e.attrs.onbeforeupdate&&(n=e.attrs.onbeforeupdate.call(e.state,e,t));"string"!=typeof e.tag&&"function"==typeof e._state.onbeforeupdate&&(r=e._state.onbeforeupdate.call(e.state,e,t));if(!(void 0===n&&void 0===r||n||r))return e.dom=t.dom,e.domSize=t.domSize,e.instance=t.instance,!0;return!1}(r,n))return;if("string"==typeof p)switch(null!=r.attrs&&(a?(r.state={},S(r.attrs,r,o)):E(r.attrs,r,o)),p){case"#":!function(e,t){e.children.toString()!==t.children.toString()&&(e.dom.nodeValue=t.children);t.dom=e.dom}(n,r);break;case"<":!function(e,t,n,r){t.children!==n.children?(h(t),s(e,n,r)):(n.dom=t.dom,n.domSize=t.domSize)}(e,n,r,i);break;case"[":!function(e,t,n,r,o,i,l){c(e,t.children,n.children,r,o,i,l);var a=0,u=n.children;if(n.dom=null,null!=u){for(var s=0;s<u.length;s++){var f=u[s];null!=f&&null!=f.dom&&(null==n.dom&&(n.dom=f.dom),a+=f.domSize||1)}1!==a&&(n.domSize=a)}}(e,n,r,a,o,i,v);break;default:!function(e,n,r,o,i){var a=n.dom=e.dom;i=l(n)||i,"textarea"===n.tag&&(null==n.attrs&&(n.attrs={}),null!=n.text&&(n.attrs.value=n.text,n.text=void 0));(function(e,t,n,r){if(null!=n)for(var o in n)x(e,o,t&&t[o],n[o],r);if(null!=t)for(var o in t)null!=n&&o in n||("className"===o&&(o="class"),"o"!==o[0]||"n"!==o[1]||k(o)?"key"!==o&&e.dom.removeAttribute(o):C(e,o,void 0))})(n,e.attrs,n.attrs,i),null!=n.attrs&&null!=n.attrs.contenteditable?g(n):null!=e.text&&null!=n.text&&""!==n.text?e.text.toString()!==n.text.toString()&&(e.dom.firstChild.nodeValue=n.text):(null!=e.text&&(e.children=[t("#",void 0,void 0,e.text,void 0,e.dom.firstChild)]),null!=n.text&&(n.children=[t("#",void 0,void 0,n.text,void 0,void 0)]),c(a,e.children,n.children,r,o,null,i))}(n,r,a,o,v)}else!function(e,n,r,o,i,l,a){if(l)f(r,o);else{if(r.instance=t.normalize(r._state.view.call(r.state,r)),r.instance===r)throw Error("A view cannot return the vnode it received as argument");null!=r.attrs&&E(r.attrs,r,o),E(r._state,r,o)}null!=r.instance?(null==n.instance?u(e,r.instance,o,a,i):d(e,n.instance,r.instance,o,i,l,a),r.dom=r.instance.dom,r.domSize=r.instance.domSize):null!=n.instance?(w(n.instance,null),r.dom=void 0,r.domSize=0):(r.dom=n.dom,r.domSize=n.domSize)}(e,n,r,o,i,a,v)}else w(n,null),u(e,r,o,v,i)}function v(e,t){var n={},r=0;for(r=0;r<t;r++){var o=e[r];if(null!=o){var i=o.key;null!=i&&(n[i]=r)}}return n}function h(e){var t=e.domSize;if(null!=t||null==e.dom){var n=r.createDocumentFragment();if(t>0){for(var o=e.dom;--t;)n.appendChild(o.nextSibling);n.insertBefore(o,n.firstChild)}return n}return e.dom}function p(e,t,n){for(;t<e.length;t++)if(null!=e[t]&&null!=e[t].dom)return e[t].dom;return n}function m(e,t,n){n&&n.parentNode?e.insertBefore(t,n):e.appendChild(t)}function g(e){var t=e.children;if(null!=t&&1===t.length&&"<"===t[0].tag){var n=t[0].children;e.dom.innerHTML!==n&&(e.dom.innerHTML=n)}else if(null!=e.text||null!=t&&0!==t.length)throw new Error("Child node of a contenteditable must be trusted")}function y(e,t,n,r){for(var o=t;o<n;o++){var i=e[o];null!=i&&(i.skip?i.skip=!1:w(i,r))}}function w(e,t){var n,r=1,o=0;e.attrs&&"function"==typeof e.attrs.onbeforeremove&&(null!=(n=e.attrs.onbeforeremove.call(e.state,e))&&"function"==typeof n.then&&(r++,n.then(i,i)));"string"!=typeof e.tag&&"function"==typeof e._state.onbeforeremove&&(null!=(n=e._state.onbeforeremove.call(e.state,e))&&"function"==typeof n.then&&(r++,n.then(i,i)));function i(){if(++o===r&&(function e(t){t.attrs&&"function"==typeof t.attrs.onremove&&t.attrs.onremove.call(t.state,t);if("string"!=typeof t.tag)"function"==typeof t._state.onremove&&t._state.onremove.call(t.state,t),null!=t.instance&&e(t.instance);else{var n=t.children;if(Array.isArray(n))for(var r=0;r<n.length;r++){var o=n[r];null!=o&&e(o)}}}(e),e.dom)){var n=e.domSize||1;if(n>1)for(var i=e.dom;--n;)b(i.nextSibling);b(e.dom),null==t||null!=e.domSize||null!=(l=e.attrs)&&(l.oncreate||l.onupdate||l.onbeforeremove||l.onremove)||"string"!=typeof e.tag||(t.pool?t.pool.push(e):t.pool=[e])}var l}i()}function b(e){var t=e.parentNode;null!=t&&t.removeChild(e)}function x(e,t,n,o,i){var l=e.dom;if("key"!==t&&"is"!==t&&(n!==o||function(e,t){return"value"===t||"checked"===t||"selectedIndex"===t||"selected"===t&&e.dom===r.activeElement}(e,t)||"object"==typeof o)&&void 0!==o&&!k(t)){var a,u=t.indexOf(":");if(u>-1&&"xlink"===t.substr(0,u))l.setAttributeNS("http://www.w3.org/1999/xlink",t.slice(u+1),o);else if("o"===t[0]&&"n"===t[1]&&"function"==typeof o)C(e,t,o);else if("style"===t)!function(e,t,n){t===n&&(e.style.cssText="",t=null);if(null==n)e.style.cssText="";else if("string"==typeof n)e.style.cssText=n;else{for(var r in"string"==typeof t&&(e.style.cssText=""),n)e.style[r]=n[r];if(null!=t&&"string"!=typeof t)for(var r in t)r in n||(e.style[r]="")}}(l,n,o);else if(t in l&&("href"!==(a=t)&&"list"!==a&&"form"!==a&&"width"!==a&&"height"!==a)&&void 0===i&&!function(e){return e.attrs.is||e.tag.indexOf("-")>-1}(e)){if("value"===t){var s=""+o;if(("input"===e.tag||"textarea"===e.tag)&&e.dom.value===s&&e.dom===r.activeElement)return;if("select"===e.tag)if(null===o){if(-1===e.dom.selectedIndex&&e.dom===r.activeElement)return}else if(null!==n&&e.dom.value===s&&e.dom===r.activeElement)return;if("option"===e.tag&&null!=n&&e.dom.value===s)return}if("input"===e.tag&&"type"===t)return void l.setAttribute(t,o);l[t]=o}else"boolean"==typeof o?o?l.setAttribute(t,""):l.removeAttribute(t):l.setAttribute("className"===t?"class":t,o)}}function k(e){return"oninit"===e||"oncreate"===e||"onupdate"===e||"onremove"===e||"onbeforeremove"===e||"onbeforeupdate"===e}function C(e,t,r){var o=e.dom,i="function"!=typeof n?r:function(e){var t=r.call(o,e);return n.call(o,e),t};if(t in o)o[t]="function"==typeof r?i:null;else{var l=t.slice(2);if(void 0===e.events&&(e.events={}),e.events[t]===i)return;null!=e.events[t]&&o.removeEventListener(l,e.events[t],!1),"function"==typeof r&&(e.events[t]=i,o.addEventListener(l,e.events[t],!1))}}function S(e,t,n){"function"==typeof e.oninit&&e.oninit.call(t.state,t),"function"==typeof e.oncreate&&n.push(e.oncreate.bind(t.state,t))}function E(e,t,n){"function"==typeof e.onupdate&&n.push(e.onupdate.bind(t.state,t))}return{render:function(e,n){if(!e)throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");var o=[],i=r.activeElement,l=e.namespaceURI;null==e.vnodes&&(e.textContent=""),Array.isArray(n)||(n=[n]),c(e,e.vnodes,t.normalizeChildren(n),!1,o,null,"http://www.w3.org/1999/xhtml"===l?void 0:l),e.vnodes=n,null!=i&&r.activeElement!==i&&i.focus();for(var a=0;a<o.length;a++)o[a]()},setEventCallback:function(e){return n=e}}};var v=function(e){var t=d(e);t.setEventCallback(function(e){!1===e.redraw?e.redraw=void 0:o()});var n=[];function r(e){var t=n.indexOf(e);t>-1&&n.splice(t,2)}function o(){for(var e=1;e<n.length;e+=2)n[e]()}return{subscribe:function(e,t){r(e),n.push(e,function(e){var t=0,n=null,r="function"==typeof requestAnimationFrame?requestAnimationFrame:setTimeout;return function(){var o=Date.now();0===t||o-t>=16?(t=o,e()):null===n&&(n=r(function(){n=null,e(),t=Date.now()},16-(o-t)))}}(t))},unsubscribe:r,redraw:o,render:t.render}}(window);c.setCompletionCallback(v.redraw);var h;a.mount=(h=v,function(e,n){if(null===n)return h.render(e,[]),void h.unsubscribe(e);if(null==n.view&&"function"!=typeof n)throw new Error("m.mount(element, component) expects a component, not a vnode");h.subscribe(e,function(){h.render(e,t(n))}),h.redraw()});var p=u,m=function(e){if(""===e||null==e)return{};"?"===e.charAt(0)&&(e=e.slice(1));for(var t=e.split("&"),n={},r={},o=0;o<t.length;o++){var i=t[o].split("="),l=decodeURIComponent(i[0]),a=2===i.length?decodeURIComponent(i[1]):"";"true"===a?a=!0:"false"===a&&(a=!1);var u=l.split(/\]\[?|\[/),s=n;l.indexOf("[")>-1&&u.pop();for(var f=0;f<u.length;f++){var c=u[f],d=u[f+1],v=""==d||!isNaN(parseInt(d,10)),h=f===u.length-1;if(""===c)null==r[l=u.slice(0,f).join()]&&(r[l]=0),c=r[l]++;null==s[c]&&(s[c]=h?a:v?[]:{}),s=s[c]}}return n},g=function(e){var t,n="function"==typeof e.history.pushState,r="function"==typeof setImmediate?setImmediate:setTimeout;function o(t){var n=e.location[t].replace(/(?:%[a-f89][a-f0-9])+/gim,decodeURIComponent);return"pathname"===t&&"/"!==n[0]&&(n="/"+n),n}function i(e,t,n){var r=e.indexOf("?"),o=e.indexOf("#"),i=r>-1?r:o>-1?o:e.length;if(r>-1){var l=o>-1?o:e.length,a=m(e.slice(r+1,l));for(var u in a)t[u]=a[u]}if(o>-1){var s=m(e.slice(o+1));for(var u in s)n[u]=s[u]}return e.slice(0,i)}var l={prefix:"#!",getPath:function(){switch(l.prefix.charAt(0)){case"#":return o("hash").slice(l.prefix.length);case"?":return o("search").slice(l.prefix.length)+o("hash");default:return o("pathname").slice(l.prefix.length)+o("search")+o("hash")}},setPath:function(t,r,o){var a={},u={};if(t=i(t,a,u),null!=r){for(var f in r)a[f]=r[f];t=t.replace(/:([^\/]+)/g,function(e,t){return delete a[t],r[t]})}var c=s(a);c&&(t+="?"+c);var d=s(u);if(d&&(t+="#"+d),n){var v=o?o.state:null,h=o?o.title:null;e.onpopstate(),o&&o.replace?e.history.replaceState(v,h,l.prefix+t):e.history.pushState(v,h,l.prefix+t)}else e.location.href=l.prefix+t}};return l.defineRoutes=function(o,a,u){function s(){var t=l.getPath(),n={},r=i(t,n,n),s=e.history.state;if(null!=s)for(var f in s)n[f]=s[f];for(var c in o){var d=new RegExp("^"+c.replace(/:[^\/]+?\.{3}/g,"(.*?)").replace(/:[^\/]+/g,"([^\\/]+)")+"/?$");if(d.test(r))return void r.replace(d,function(){for(var e=c.match(/:[^\/]+/g)||[],r=[].slice.call(arguments,1,-2),i=0;i<e.length;i++)n[e[i].replace(/:|\./g,"")]=decodeURIComponent(r[i]);a(o[c],n,t,c)})}u(t,n)}var f;n?e.onpopstate=(f=s,function(){null==t&&(t=r(function(){t=null,f()}))}):"#"===l.prefix.charAt(0)&&(e.onhashchange=s),s()},l};a.route=function(e,n){var r,o,i,l,a,u=g(e),s=function(e,s,f){if(null==e)throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined");var c=function(){null!=r&&n.render(e,r(t(o,i.key,i)))},d=function(e){if(e===s)throw new Error("Could not resolve default route "+s);u.setPath(s,null,{replace:!0})};u.defineRoutes(f,function(e,t,n){var u=a=function(e,s){u===a&&(o=null==s||"function"!=typeof s.view&&"function"!=typeof s?"div":s,i=t,l=n,a=null,r=(e.render||function(e){return e}).bind(e),c())};e.view||"function"==typeof e?u({},e):e.onmatch?p.resolve(e.onmatch(t,n)).then(function(t){u(e,t)},d):u(e,"div")},d),n.subscribe(e,c)};return s.set=function(e,t,n){null!=a&&((n=n||{}).replace=!0),a=null,u.setPath(e,t,n)},s.get=function(){return l},s.prefix=function(e){u.prefix=e},s.link=function(e){e.dom.setAttribute("href",u.prefix+e.attrs.href),e.dom.onclick=function(e){if(!(e.ctrlKey||e.metaKey||e.shiftKey||2===e.which)){e.preventDefault(),e.redraw=!1;var t=this.getAttribute("href");0===t.indexOf(u.prefix)&&(t=t.slice(u.prefix.length)),s.set(t,void 0,void 0)}}},s.param=function(e){return void 0!==i&&void 0!==e?i[e]:i},s}(window,v),a.withAttr=function(e,t,n){return function(r){t.call(n||this,e in r.currentTarget?r.currentTarget[e]:r.currentTarget.getAttribute(e))}};var y=d(window);a.render=y.render,a.redraw=v.redraw,a.request=c.request,a.jsonp=c.jsonp,a.parseQueryString=m,a.buildQueryString=s,a.version="1.1.6",a.vnode=t,"undefined"!=typeof module?module.exports=a:window.m=a}();
},{}],25:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.content=n;var e=require("../../../node_modules/mithril/mithril"),t=r(e);function r(e){return e&&e.__esModule?e:{default:e}}function n(e){return(0,t.default)("div",{class:"content"},e)}
},{"../../../node_modules/mithril/mithril":6}],26:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.layout=r;var e=require("../../../node_modules/mithril/mithril"),o=u(e),t=require("../components");function u(e){return e&&e.__esModule?e:{default:e}}function r(e,u){return o.default.vnode("div",void 0,{class:"layout "+(e||"")},[(0,o.default)(t.Menu),o.default.vnode.normalize(u),(0,o.default)(t.Footer)],void 0,void 0)}
},{"../../../node_modules/mithril/mithril":6,"../components":11}],23:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./content");Object.defineProperty(exports,"content",{enumerable:!0,get:function(){return e.content}});var t=require("./layout");Object.defineProperty(exports,"layout",{enumerable:!0,get:function(){return t.layout}});
},{"./content":25,"./layout":26}],12:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Contact=void 0;var e=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),t=require("../../../node_modules/mithril/mithril"),n=o(t),r=require("../templates");function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var u=function(){function t(){i(this,t)}return e(t,[{key:"view",value:function(){return(0,r.layout)("contact",[n.default.vnode("p",void 0,void 0,void 0,"Contact",void 0)])}}]),t}();exports.Contact=u;
},{"../../../node_modules/mithril/mithril":6,"../templates":23}],13:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Footer=void 0;var e=function(){function e(e,o){for(var t=0;t<o.length;t++){var r=o[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(o,t,r){return t&&e(o.prototype,t),r&&e(o,r),o}}(),o=require("../../../node_modules/mithril/mithril"),t=n(o),r=require("./");function n(e){return e&&e.__esModule?e:{default:e}}function i(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}var a=(new Date).getFullYear(),d=function(){function o(){i(this,o)}return e(o,[{key:"view",value:function(){return t.default.vnode("div",void 0,{className:"footer"},[t.default.vnode("div",void 0,{className:"links"},[t.default.vnode("a",void 0,{href:"/",oncreate:t.default.route.link},void 0,"HOME",void 0),t.default.vnode("a",void 0,{href:"/journal",oncreate:t.default.route.link},void 0,"JOURNAL",void 0),t.default.vnode("a",void 0,{href:"/contact",oncreate:t.default.route.link},void 0,"CONTACT",void 0)],void 0,void 0),(0,t.default)(r.Paragraph,{class:"copyright",content:["Copyright © "+a+", Tidemann&Co – All rights reserved."]}),t.default.vnode("div",void 0,{className:"ampersand"},[],void 0,void 0)],void 0,void 0)}}]),o}();exports.Footer=d;
},{"../../../node_modules/mithril/mithril":6,"./":11}],14:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Home=void 0;var e=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),t=require("../../../node_modules/mithril/mithril"),n=o(t),a=require("./"),i=require("../templates");function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=function(){function t(){r(this,t)}return e(t,[{key:"view",value:function(){return(0,i.layout)("home",[(0,n.default)(a.Title,{content:"Quality is built on love."}),(0,n.default)(a.Line),(0,i.content)([(0,n.default)(a.Paragraph,{content:"Tidemann&Co is a Copenhagen-based corporation with activities in software and investments. We believe that quality is built on proper planning, efficient execution and a genuine love for what you do."}),(0,n.default)(a.Paragraph,{content:"Our craft is software. We live and breathe the art and science of computers, because it enables us to do so many amazing things. Software breaks barriers and builds bridges in business, society and life in general."}),(0,n.default)(a.Paragraph,{content:"We invest in people, not ideas. We bet on the ability to make things happen and we match with anyone who cares deeply for what they do."}),(0,n.default)(a.Paragraph,{content:"All the best,"}),(0,n.default)(a.Paragraph,{content:[n.default.vnode("span",void 0,{className:"name"},void 0,"Kasper Tidemann",void 0),n.default.vnode("span",void 0,{className:"title"},void 0,"CEO, Tidemann&Co",void 0),n.default.vnode("div",void 0,{className:"signature"},[],void 0,void 0)]})])])}}]),t}();exports.Home=s;
},{"../../../node_modules/mithril/mithril":6,"./":11,"../templates":23}],15:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Journal=void 0;var e=function(){function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}}(),r=require("../../../node_modules/mithril/mithril"),n=o(r),t=require("../templates");function o(e){return e&&e.__esModule?e:{default:e}}function u(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}var i=function(){function r(){u(this,r)}return e(r,[{key:"view",value:function(){return(0,t.layout)("journal",[n.default.vnode("p",void 0,void 0,void 0,"Journal",void 0)])}}]),r}();exports.Journal=i;
},{"../../../node_modules/mithril/mithril":6,"../templates":23}],16:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Line=void 0;var e=function(){function e(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,r,t){return r&&e(n.prototype,r),t&&e(n,t),n}}(),n=require("../../../node_modules/mithril/mithril"),r=t(n);function t(e){return e&&e.__esModule?e:{default:e}}function i(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(){i(this,n)}return e(n,[{key:"view",value:function(e){return r.default.vnode("div",void 0,{className:"line"},[],void 0,void 0)}}]),n}();exports.Line=o;
},{"../../../node_modules/mithril/mithril":6}],27:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=exports.breakpoints={mobile:450};
},{}],24:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./breakpoints");Object.defineProperty(exports,"breakpoints",{enumerable:!0,get:function(){return e.breakpoints}});
},{"./breakpoints":27}],17:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Menu=void 0;var e=function(){function e(e,o){for(var n=0;n<o.length;n++){var i=o[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(o,n,i){return n&&e(o.prototype,n),i&&e(o,i),o}}(),o=require("../../../node_modules/mithril/mithril"),n=t(o),i=require("../helpers");function t(e){return e&&e.__esModule?e:{default:e}}function r(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}function u(){window.innerHeight<=i.breakpoints.mobile?console.log("Show menu!"):n.default.route.set("/")}var a=function(){function o(){r(this,o)}return e(o,[{key:"view",value:function(){return n.default.vnode("div",void 0,{className:"menu"},[n.default.vnode("div",void 0,{className:"logo",onclick:u},[],void 0,void 0),n.default.vnode("div",void 0,{className:"links"},[n.default.vnode("a",void 0,{href:"/journal",oncreate:n.default.route.link},void 0,"JOURNAL",void 0),n.default.vnode("a",void 0,{href:"/contact",oncreate:n.default.route.link},void 0,"CONTACT",void 0)],void 0,void 0)],void 0,void 0)}}]),o}();exports.Menu=a;
},{"../../../node_modules/mithril/mithril":6,"../helpers":24}],18:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Paragraph=void 0;var e=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}(),r=require("../../../node_modules/mithril/mithril"),t=n(r);function n(e){return e&&e.__esModule?e:{default:e}}function a(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}var o=function(){function r(){a(this,r)}return e(r,[{key:"view",value:function(e){return(0,t.default)("p",{class:"paragraph "+(e.attrs.class||"")},e.attrs.content)}}]),r}();exports.Paragraph=o;
},{"../../../node_modules/mithril/mithril":6}],19:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Title=void 0;var e=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),t=require("../../../node_modules/mithril/mithril"),n=r(t);function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(){i(this,t)}return e(t,[{key:"view",value:function(e){return(0,n.default)("h1",{class:"title"},e.attrs.content)}}]),t}();exports.Title=o;
},{"../../../node_modules/mithril/mithril":6}],11:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./contact");Object.defineProperty(exports,"Contact",{enumerable:!0,get:function(){return e.Contact}});var r=require("./footer");Object.defineProperty(exports,"Footer",{enumerable:!0,get:function(){return r.Footer}});var t=require("./home");Object.defineProperty(exports,"Home",{enumerable:!0,get:function(){return t.Home}});var n=require("./journal");Object.defineProperty(exports,"Journal",{enumerable:!0,get:function(){return n.Journal}});var o=require("./line");Object.defineProperty(exports,"Line",{enumerable:!0,get:function(){return o.Line}});var u=require("./menu");Object.defineProperty(exports,"Menu",{enumerable:!0,get:function(){return u.Menu}});var a=require("./paragraph");Object.defineProperty(exports,"Paragraph",{enumerable:!0,get:function(){return a.Paragraph}});var i=require("./title");Object.defineProperty(exports,"Title",{enumerable:!0,get:function(){return i.Title}});
},{"./contact":12,"./footer":13,"./home":14,"./journal":15,"./line":16,"./menu":17,"./paragraph":18,"./title":19}],4:[function(require,module,exports) {
"use strict";var e=require("../../node_modules/mithril/mithril"),t=r(e),o=require("./components");function r(e){return e&&e.__esModule?e:{default:e}}t.default.route.prefix(""),t.default.route(document.body,"/",{"/":o.Home,"/contact":o.Contact,"/journal":o.Journal});
},{"../../node_modules/mithril/mithril":6,"./components":11}]},{},[4], null)
//# sourceMappingURL=/js.77df5a88.map