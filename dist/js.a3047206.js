// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../../node_modules/mithril/mithril.js":[function(require,module,exports) {
var global = arguments[3];
;(function() {
"use strict"
function Vnode(tag, key, attrs0, children, text, dom) {
	return {tag: tag, key: key, attrs: attrs0, children: children, text: text, dom: dom, domSize: undefined, state: undefined, _state: undefined, events: undefined, instance: undefined, skip: false}
}
Vnode.normalize = function(node) {
	if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
	if (node != null && typeof node !== "object") return Vnode("#", undefined, undefined, node === false ? "" : node, undefined, undefined)
	return node
}
Vnode.normalizeChildren = function normalizeChildren(children) {
	for (var i = 0; i < children.length; i++) {
		children[i] = Vnode.normalize(children[i])
	}
	return children
}
var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
var selectorCache = {}
var hasOwn = {}.hasOwnProperty
function isEmpty(object) {
	for (var key in object) if (hasOwn.call(object, key)) return false
	return true
}
function compileSelector(selector) {
	var match, tag = "div", classes = [], attrs = {}
	while (match = selectorParser.exec(selector)) {
		var type = match[1], value = match[2]
		if (type === "" && value !== "") tag = value
		else if (type === "#") attrs.id = value
		else if (type === ".") classes.push(value)
		else if (match[3][0] === "[") {
			var attrValue = match[6]
			if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")
			if (match[4] === "class") classes.push(attrValue)
			else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true
		}
	}
	if (classes.length > 0) attrs.className = classes.join(" ")
	return selectorCache[selector] = {tag: tag, attrs: attrs}
}
function execSelector(state, attrs, children) {
	var hasAttrs = false, childList, text
	var className = attrs.className || attrs.class
	if (!isEmpty(state.attrs) && !isEmpty(attrs)) {
		var newAttrs = {}
		for(var key in attrs) {
			if (hasOwn.call(attrs, key)) {
				newAttrs[key] = attrs[key]
			}
		}
		attrs = newAttrs
	}
	for (var key in state.attrs) {
		if (hasOwn.call(state.attrs, key)) {
			attrs[key] = state.attrs[key]
		}
	}
	if (className !== undefined) {
		if (attrs.class !== undefined) {
			attrs.class = undefined
			attrs.className = className
		}
		if (state.attrs.className != null) {
			attrs.className = state.attrs.className + " " + className
		}
	}
	for (var key in attrs) {
		if (hasOwn.call(attrs, key) && key !== "key") {
			hasAttrs = true
			break
		}
	}
	if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") {
		text = children[0].children
	} else {
		childList = children
	}
	return Vnode(state.tag, attrs.key, hasAttrs ? attrs : undefined, childList, text)
}
function hyperscript(selector) {
	// Because sloppy mode sucks
	var attrs = arguments[1], start = 2, children
	if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
		throw Error("The selector must be either a string or a component.");
	}
	if (typeof selector === "string") {
		var cached = selectorCache[selector] || compileSelector(selector)
	}
	if (attrs == null) {
		attrs = {}
	} else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
		attrs = {}
		start = 1
	}
	if (arguments.length === start + 1) {
		children = arguments[start]
		if (!Array.isArray(children)) children = [children]
	} else {
		children = []
		while (start < arguments.length) children.push(arguments[start++])
	}
	var normalized = Vnode.normalizeChildren(children)
	if (typeof selector === "string") {
		return execSelector(cached, attrs, normalized)
	} else {
		return Vnode(selector, attrs.key, attrs, normalized)
	}
}
hyperscript.trust = function(html) {
	if (html == null) html = ""
	return Vnode("<", undefined, undefined, html, undefined, undefined)
}
hyperscript.fragment = function(attrs1, children) {
	return Vnode("[", attrs1.key, attrs1, Vnode.normalizeChildren(children), undefined, undefined)
}
var m = hyperscript
/** @constructor */
var PromisePolyfill = function(executor) {
	if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`")
	if (typeof executor !== "function") throw new TypeError("executor must be a function")
	var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false)
	var instance = self._instance = {resolvers: resolvers, rejectors: rejectors}
	var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout
	function handler(list, shouldAbsorb) {
		return function execute(value) {
			var then
			try {
				if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
					if (value === self) throw new TypeError("Promise can't be resolved w/ itself")
					executeOnce(then.bind(value))
				}
				else {
					callAsync(function() {
						if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value)
						for (var i = 0; i < list.length; i++) list[i](value)
						resolvers.length = 0, rejectors.length = 0
						instance.state = shouldAbsorb
						instance.retry = function() {execute(value)}
					})
				}
			}
			catch (e) {
				rejectCurrent(e)
			}
		}
	}
	function executeOnce(then) {
		var runs = 0
		function run(fn) {
			return function(value) {
				if (runs++ > 0) return
				fn(value)
			}
		}
		var onerror = run(rejectCurrent)
		try {then(run(resolveCurrent), onerror)} catch (e) {onerror(e)}
	}
	executeOnce(executor)
}
PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
	var self = this, instance = self._instance
	function handle(callback, list, next, state) {
		list.push(function(value) {
			if (typeof callback !== "function") next(value)
			else try {resolveNext(callback(value))} catch (e) {if (rejectNext) rejectNext(e)}
		})
		if (typeof instance.retry === "function" && state === instance.state) instance.retry()
	}
	var resolveNext, rejectNext
	var promise = new PromisePolyfill(function(resolve, reject) {resolveNext = resolve, rejectNext = reject})
	handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false)
	return promise
}
PromisePolyfill.prototype.catch = function(onRejection) {
	return this.then(null, onRejection)
}
PromisePolyfill.resolve = function(value) {
	if (value instanceof PromisePolyfill) return value
	return new PromisePolyfill(function(resolve) {resolve(value)})
}
PromisePolyfill.reject = function(value) {
	return new PromisePolyfill(function(resolve, reject) {reject(value)})
}
PromisePolyfill.all = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		var total = list.length, count = 0, values = []
		if (list.length === 0) resolve([])
		else for (var i = 0; i < list.length; i++) {
			(function(i) {
				function consume(value) {
					count++
					values[i] = value
					if (count === total) resolve(values)
				}
				if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
					list[i].then(consume, reject)
				}
				else consume(list[i])
			})(i)
		}
	})
}
PromisePolyfill.race = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		for (var i = 0; i < list.length; i++) {
			list[i].then(resolve, reject)
		}
	})
}
if (typeof window !== "undefined") {
	if (typeof window.Promise === "undefined") window.Promise = PromisePolyfill
	var PromisePolyfill = window.Promise
} else if (typeof global !== "undefined") {
	if (typeof global.Promise === "undefined") global.Promise = PromisePolyfill
	var PromisePolyfill = global.Promise
} else {
}
var buildQueryString = function(object) {
	if (Object.prototype.toString.call(object) !== "[object Object]") return ""
	var args = []
	for (var key0 in object) {
		destructure(key0, object[key0])
	}
	return args.join("&")
	function destructure(key0, value) {
		if (Array.isArray(value)) {
			for (var i = 0; i < value.length; i++) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else if (Object.prototype.toString.call(value) === "[object Object]") {
			for (var i in value) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else args.push(encodeURIComponent(key0) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""))
	}
}
var FILE_PROTOCOL_REGEX = new RegExp("^file://", "i")
var _8 = function($window, Promise) {
	var callbackCount = 0
	var oncompletion
	function setCompletionCallback(callback) {oncompletion = callback}
	function finalizer() {
		var count = 0
		function complete() {if (--count === 0 && typeof oncompletion === "function") oncompletion()}
		return function finalize(promise0) {
			var then0 = promise0.then
			promise0.then = function() {
				count++
				var next = then0.apply(promise0, arguments)
				next.then(complete, function(e) {
					complete()
					if (count === 0) throw e
				})
				return finalize(next)
			}
			return promise0
		}
	}
	function normalize(args, extra) {
		if (typeof args === "string") {
			var url = args
			args = extra || {}
			if (args.url == null) args.url = url
		}
		return args
	}
	function request(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			if (args.method == null) args.method = "GET"
			args.method = args.method.toUpperCase()
			var useBody = (args.method === "GET" || args.method === "TRACE") ? false : (typeof args.useBody === "boolean" ? args.useBody : true)
			if (typeof args.serialize !== "function") args.serialize = typeof FormData !== "undefined" && args.data instanceof FormData ? function(value) {return value} : JSON.stringify
			if (typeof args.deserialize !== "function") args.deserialize = deserialize
			if (typeof args.extract !== "function") args.extract = extract
			args.url = interpolate(args.url, args.data)
			if (useBody) args.data = args.serialize(args.data)
			else args.url = assemble(args.url, args.data)
			var xhr = new $window.XMLHttpRequest(),
				aborted = false,
				_abort = xhr.abort
			xhr.abort = function abort() {
				aborted = true
				_abort.call(xhr)
			}
			xhr.open(args.method, args.url, typeof args.async === "boolean" ? args.async : true, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined)
			if (args.serialize === JSON.stringify && useBody && !(args.headers && args.headers.hasOwnProperty("Content-Type"))) {
				xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
			}
			if (args.deserialize === deserialize && !(args.headers && args.headers.hasOwnProperty("Accept"))) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}
			if (args.withCredentials) xhr.withCredentials = args.withCredentials
			for (var key in args.headers) if ({}.hasOwnProperty.call(args.headers, key)) {
				xhr.setRequestHeader(key, args.headers[key])
			}
			if (typeof args.config === "function") xhr = args.config(xhr, args) || xhr
			xhr.onreadystatechange = function() {
				// Don't throw errors on xhr.abort().
				if(aborted) return
				if (xhr.readyState === 4) {
					try {
						var response = (args.extract !== extract) ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args))
						if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || FILE_PROTOCOL_REGEX.test(args.url)) {
							resolve(cast(args.type, response))
						}
						else {
							var error = new Error(xhr.responseText)
							for (var key in response) error[key] = response[key]
							reject(error)
						}
					}
					catch (e) {
						reject(e)
					}
				}
			}
			if (useBody && (args.data != null)) xhr.send(args.data)
			else xhr.send()
		})
		return args.background === true ? promise0 : finalize(promise0)
	}
	function jsonp(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++
			var script = $window.document.createElement("script")
			$window[callbackName] = function(data) {
				script.parentNode.removeChild(script)
				resolve(cast(args.type, data))
				delete $window[callbackName]
			}
			script.onerror = function() {
				script.parentNode.removeChild(script)
				reject(new Error("JSONP request failed"))
				delete $window[callbackName]
			}
			if (args.data == null) args.data = {}
			args.url = interpolate(args.url, args.data)
			args.data[args.callbackKey || "callback"] = callbackName
			script.src = assemble(args.url, args.data)
			$window.document.documentElement.appendChild(script)
		})
		return args.background === true? promise0 : finalize(promise0)
	}
	function interpolate(url, data) {
		if (data == null) return url
		var tokens = url.match(/:[^\/]+/gi) || []
		for (var i = 0; i < tokens.length; i++) {
			var key = tokens[i].slice(1)
			if (data[key] != null) {
				url = url.replace(tokens[i], data[key])
			}
		}
		return url
	}
	function assemble(url, data) {
		var querystring = buildQueryString(data)
		if (querystring !== "") {
			var prefix = url.indexOf("?") < 0 ? "?" : "&"
			url += prefix + querystring
		}
		return url
	}
	function deserialize(data) {
		try {return data !== "" ? JSON.parse(data) : null}
		catch (e) {throw new Error(data)}
	}
	function extract(xhr) {return xhr.responseText}
	function cast(type0, data) {
		if (typeof type0 === "function") {
			if (Array.isArray(data)) {
				for (var i = 0; i < data.length; i++) {
					data[i] = new type0(data[i])
				}
			}
			else return new type0(data)
		}
		return data
	}
	return {request: request, jsonp: jsonp, setCompletionCallback: setCompletionCallback}
}
var requestService = _8(window, PromisePolyfill)
var coreRenderer = function($window) {
	var $doc = $window.document
	var $emptyFragment = $doc.createDocumentFragment()
	var nameSpace = {
		svg: "http://www.w3.org/2000/svg",
		math: "http://www.w3.org/1998/Math/MathML"
	}
	var onevent
	function setEventCallback(callback) {return onevent = callback}
	function getNameSpace(vnode) {
		return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag]
	}
	//create
	function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				createNode(parent, vnode, hooks, ns, nextSibling)
			}
		}
	}
	function createNode(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		if (typeof tag === "string") {
			vnode.state = {}
			if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
			switch (tag) {
				case "#": return createText(parent, vnode, nextSibling)
				case "<": return createHTML(parent, vnode, nextSibling)
				case "[": return createFragment(parent, vnode, hooks, ns, nextSibling)
				default: return createElement(parent, vnode, hooks, ns, nextSibling)
			}
		}
		else return createComponent(parent, vnode, hooks, ns, nextSibling)
	}
	function createText(parent, vnode, nextSibling) {
		vnode.dom = $doc.createTextNode(vnode.children)
		insertNode(parent, vnode.dom, nextSibling)
		return vnode.dom
	}
	function createHTML(parent, vnode, nextSibling) {
		var match1 = vnode.children.match(/^\s*?<(\w+)/im) || []
		var parent1 = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}[match1[1]] || "div"
		var temp = $doc.createElement(parent1)
		temp.innerHTML = vnode.children
		vnode.dom = temp.firstChild
		vnode.domSize = temp.childNodes.length
		var fragment = $doc.createDocumentFragment()
		var child
		while (child = temp.firstChild) {
			fragment.appendChild(child)
		}
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createFragment(parent, vnode, hooks, ns, nextSibling) {
		var fragment = $doc.createDocumentFragment()
		if (vnode.children != null) {
			var children = vnode.children
			createNodes(fragment, children, 0, children.length, hooks, null, ns)
		}
		vnode.dom = fragment.firstChild
		vnode.domSize = fragment.childNodes.length
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createElement(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		var attrs2 = vnode.attrs
		var is = attrs2 && attrs2.is
		ns = getNameSpace(vnode) || ns
		var element = ns ?
			is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
			is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)
		vnode.dom = element
		if (attrs2 != null) {
			setAttrs(vnode, attrs2, ns)
		}
		insertNode(parent, element, nextSibling)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else {
			if (vnode.text != null) {
				if (vnode.text !== "") element.textContent = vnode.text
				else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			}
			if (vnode.children != null) {
				var children = vnode.children
				createNodes(element, children, 0, children.length, hooks, null, ns)
				setLateAttrs(vnode)
			}
		}
		return element
	}
	function initComponent(vnode, hooks) {
		var sentinel
		if (typeof vnode.tag.view === "function") {
			vnode.state = Object.create(vnode.tag)
			sentinel = vnode.state.view
			if (sentinel.$$reentrantLock$$ != null) return $emptyFragment
			sentinel.$$reentrantLock$$ = true
		} else {
			vnode.state = void 0
			sentinel = vnode.tag
			if (sentinel.$$reentrantLock$$ != null) return $emptyFragment
			sentinel.$$reentrantLock$$ = true
			vnode.state = (vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function") ? new vnode.tag(vnode) : vnode.tag(vnode)
		}
		vnode._state = vnode.state
		if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
		initLifecycle(vnode._state, vnode, hooks)
		vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))
		if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
		sentinel.$$reentrantLock$$ = null
	}
	function createComponent(parent, vnode, hooks, ns, nextSibling) {
		initComponent(vnode, hooks)
		if (vnode.instance != null) {
			var element = createNode(parent, vnode.instance, hooks, ns, nextSibling)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0
			insertNode(parent, element, nextSibling)
			return element
		}
		else {
			vnode.domSize = 0
			return $emptyFragment
		}
	}
	//update
	function updateNodes(parent, old, vnodes, recycling, hooks, nextSibling, ns) {
		if (old === vnodes || old == null && vnodes == null) return
		else if (old == null) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns)
		else if (vnodes == null) removeNodes(old, 0, old.length, vnodes)
		else {
			if (old.length === vnodes.length) {
				var isUnkeyed = false
				for (var i = 0; i < vnodes.length; i++) {
					if (vnodes[i] != null && old[i] != null) {
						isUnkeyed = vnodes[i].key == null && old[i].key == null
						break
					}
				}
				if (isUnkeyed) {
					for (var i = 0; i < old.length; i++) {
						if (old[i] === vnodes[i]) continue
						else if (old[i] == null && vnodes[i] != null) createNode(parent, vnodes[i], hooks, ns, getNextSibling(old, i + 1, nextSibling))
						else if (vnodes[i] == null) removeNodes(old, i, i + 1, vnodes)
						else updateNode(parent, old[i], vnodes[i], hooks, getNextSibling(old, i + 1, nextSibling), recycling, ns)
					}
					return
				}
			}
			recycling = recycling || isRecyclable(old, vnodes)
			if (recycling) {
				var pool = old.pool
				old = old.concat(old.pool)
			}
			var oldStart = 0, start = 0, oldEnd = old.length - 1, end = vnodes.length - 1, map
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldStart], v = vnodes[start]
				if (o === v && !recycling) oldStart++, start++
				else if (o == null) oldStart++
				else if (v == null) start++
				else if (o.key === v.key) {
					var shouldRecycle = (pool != null && oldStart >= old.length - pool.length) || ((pool == null) && recycling)
					oldStart++, start++
					updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), shouldRecycle, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
				}
				else {
					var o = old[oldEnd]
					if (o === v && !recycling) oldEnd--, start++
					else if (o == null) oldEnd--
					else if (v == null) start++
					else if (o.key === v.key) {
						var shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)
						updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)
						if (recycling || start < end) insertNode(parent, toFragment(o), getNextSibling(old, oldStart, nextSibling))
						oldEnd--, start++
					}
					else break
				}
			}
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldEnd], v = vnodes[end]
				if (o === v && !recycling) oldEnd--, end--
				else if (o == null) oldEnd--
				else if (v == null) end--
				else if (o.key === v.key) {
					var shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)
					updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
					if (o.dom != null) nextSibling = o.dom
					oldEnd--, end--
				}
				else {
					if (!map) map = getKeyMap(old, oldEnd)
					if (v != null) {
						var oldIndex = map[v.key]
						if (oldIndex != null) {
							var movable = old[oldIndex]
							var shouldRecycle = (pool != null && oldIndex >= old.length - pool.length) || ((pool == null) && recycling)
							updateNode(parent, movable, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
							insertNode(parent, toFragment(movable), nextSibling)
							old[oldIndex].skip = true
							if (movable.dom != null) nextSibling = movable.dom
						}
						else {
							var dom = createNode(parent, v, hooks, ns, nextSibling)
							nextSibling = dom
						}
					}
					end--
				}
				if (end < start) break
			}
			createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
			removeNodes(old, oldStart, oldEnd + 1, vnodes)
		}
	}
	function updateNode(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		var oldTag = old.tag, tag = vnode.tag
		if (oldTag === tag) {
			vnode.state = old.state
			vnode._state = old._state
			vnode.events = old.events
			if (!recycling && shouldNotUpdate(vnode, old)) return
			if (typeof oldTag === "string") {
				if (vnode.attrs != null) {
					if (recycling) {
						vnode.state = {}
						initLifecycle(vnode.attrs, vnode, hooks)
					}
					else updateLifecycle(vnode.attrs, vnode, hooks)
				}
				switch (oldTag) {
					case "#": updateText(old, vnode); break
					case "<": updateHTML(parent, old, vnode, nextSibling); break
					case "[": updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns); break
					default: updateElement(old, vnode, recycling, hooks, ns)
				}
			}
			else updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns)
		}
		else {
			removeNode(old, null)
			createNode(parent, vnode, hooks, ns, nextSibling)
		}
	}
	function updateText(old, vnode) {
		if (old.children.toString() !== vnode.children.toString()) {
			old.dom.nodeValue = vnode.children
		}
		vnode.dom = old.dom
	}
	function updateHTML(parent, old, vnode, nextSibling) {
		if (old.children !== vnode.children) {
			toFragment(old)
			createHTML(parent, vnode, nextSibling)
		}
		else vnode.dom = old.dom, vnode.domSize = old.domSize
	}
	function updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns) {
		updateNodes(parent, old.children, vnode.children, recycling, hooks, nextSibling, ns)
		var domSize = 0, children = vnode.children
		vnode.dom = null
		if (children != null) {
			for (var i = 0; i < children.length; i++) {
				var child = children[i]
				if (child != null && child.dom != null) {
					if (vnode.dom == null) vnode.dom = child.dom
					domSize += child.domSize || 1
				}
			}
			if (domSize !== 1) vnode.domSize = domSize
		}
	}
	function updateElement(old, vnode, recycling, hooks, ns) {
		var element = vnode.dom = old.dom
		ns = getNameSpace(vnode) || ns
		if (vnode.tag === "textarea") {
			if (vnode.attrs == null) vnode.attrs = {}
			if (vnode.text != null) {
				vnode.attrs.value = vnode.text //FIXME handle0 multiple children
				vnode.text = undefined
			}
		}
		updateAttrs(vnode, old.attrs, vnode.attrs, ns)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else if (old.text != null && vnode.text != null && vnode.text !== "") {
			if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text
		}
		else {
			if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)]
			if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			updateNodes(element, old.children, vnode.children, recycling, hooks, null, ns)
		}
	}
	function updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		if (recycling) {
			initComponent(vnode, hooks)
		} else {
			vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))
			if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
			if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks)
			updateLifecycle(vnode._state, vnode, hooks)
		}
		if (vnode.instance != null) {
			if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling)
			else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, recycling, ns)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.instance.domSize
		}
		else if (old.instance != null) {
			removeNode(old.instance, null)
			vnode.dom = undefined
			vnode.domSize = 0
		}
		else {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
		}
	}
	function isRecyclable(old, vnodes) {
		if (old.pool != null && Math.abs(old.pool.length - vnodes.length) <= Math.abs(old.length - vnodes.length)) {
			var oldChildrenLength = old[0] && old[0].children && old[0].children.length || 0
			var poolChildrenLength = old.pool[0] && old.pool[0].children && old.pool[0].children.length || 0
			var vnodesChildrenLength = vnodes[0] && vnodes[0].children && vnodes[0].children.length || 0
			if (Math.abs(poolChildrenLength - vnodesChildrenLength) <= Math.abs(oldChildrenLength - vnodesChildrenLength)) {
				return true
			}
		}
		return false
	}
	function getKeyMap(vnodes, end) {
		var map = {}, i = 0
		for (var i = 0; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				var key2 = vnode.key
				if (key2 != null) map[key2] = i
			}
		}
		return map
	}
	function toFragment(vnode) {
		var count0 = vnode.domSize
		if (count0 != null || vnode.dom == null) {
			var fragment = $doc.createDocumentFragment()
			if (count0 > 0) {
				var dom = vnode.dom
				while (--count0) fragment.appendChild(dom.nextSibling)
				fragment.insertBefore(dom, fragment.firstChild)
			}
			return fragment
		}
		else return vnode.dom
	}
	function getNextSibling(vnodes, i, nextSibling) {
		for (; i < vnodes.length; i++) {
			if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
		}
		return nextSibling
	}
	function insertNode(parent, dom, nextSibling) {
		if (nextSibling && nextSibling.parentNode) parent.insertBefore(dom, nextSibling)
		else parent.appendChild(dom)
	}
	function setContentEditable(vnode) {
		var children = vnode.children
		if (children != null && children.length === 1 && children[0].tag === "<") {
			var content = children[0].children
			if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content
		}
		else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted")
	}
	//remove
	function removeNodes(vnodes, start, end, context) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				if (vnode.skip) vnode.skip = false
				else removeNode(vnode, context)
			}
		}
	}
	function removeNode(vnode, context) {
		var expected = 1, called = 0
		if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
			var result = vnode.attrs.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeremove === "function") {
			var result = vnode._state.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		continuation()
		function continuation() {
			if (++called === expected) {
				onremove(vnode)
				if (vnode.dom) {
					var count0 = vnode.domSize || 1
					if (count0 > 1) {
						var dom = vnode.dom
						while (--count0) {
							removeNodeFromDOM(dom.nextSibling)
						}
					}
					removeNodeFromDOM(vnode.dom)
					if (context != null && vnode.domSize == null && !hasIntegrationMethods(vnode.attrs) && typeof vnode.tag === "string") { //TODO test custom elements
						if (!context.pool) context.pool = [vnode]
						else context.pool.push(vnode)
					}
				}
			}
		}
	}
	function removeNodeFromDOM(node) {
		var parent = node.parentNode
		if (parent != null) parent.removeChild(node)
	}
	function onremove(vnode) {
		if (vnode.attrs && typeof vnode.attrs.onremove === "function") vnode.attrs.onremove.call(vnode.state, vnode)
		if (typeof vnode.tag !== "string") {
			if (typeof vnode._state.onremove === "function") vnode._state.onremove.call(vnode.state, vnode)
			if (vnode.instance != null) onremove(vnode.instance)
		} else {
			var children = vnode.children
			if (Array.isArray(children)) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i]
					if (child != null) onremove(child)
				}
			}
		}
	}
	//attrs2
	function setAttrs(vnode, attrs2, ns) {
		for (var key2 in attrs2) {
			setAttr(vnode, key2, null, attrs2[key2], ns)
		}
	}
	function setAttr(vnode, key2, old, value, ns) {
		var element = vnode.dom
		if (key2 === "key" || key2 === "is" || (old === value && !isFormAttribute(vnode, key2)) && typeof value !== "object" || typeof value === "undefined" || isLifecycleMethod(key2)) return
		var nsLastIndex = key2.indexOf(":")
		if (nsLastIndex > -1 && key2.substr(0, nsLastIndex) === "xlink") {
			element.setAttributeNS("http://www.w3.org/1999/xlink", key2.slice(nsLastIndex + 1), value)
		}
		else if (key2[0] === "o" && key2[1] === "n" && typeof value === "function") updateEvent(vnode, key2, value)
		else if (key2 === "style") updateStyle(element, old, value)
		else if (key2 in element && !isAttribute(key2) && ns === undefined && !isCustomElement(vnode)) {
			if (key2 === "value") {
				var normalized0 = "" + value // eslint-disable-line no-implicit-coercion
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return
				//setting select[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "select") {
					if (value === null) {
						if (vnode.dom.selectedIndex === -1 && vnode.dom === $doc.activeElement) return
					} else {
						if (old !== null && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return
					}
				}
				//setting option[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "option" && old != null && vnode.dom.value === normalized0) return
			}
			// If you assign an input type1 that is not supported by IE 11 with an assignment expression, an error0 will occur.
			if (vnode.tag === "input" && key2 === "type") {
				element.setAttribute(key2, value)
				return
			}
			element[key2] = value
		}
		else {
			if (typeof value === "boolean") {
				if (value) element.setAttribute(key2, "")
				else element.removeAttribute(key2)
			}
			else element.setAttribute(key2 === "className" ? "class" : key2, value)
		}
	}
	function setLateAttrs(vnode) {
		var attrs2 = vnode.attrs
		if (vnode.tag === "select" && attrs2 != null) {
			if ("value" in attrs2) setAttr(vnode, "value", null, attrs2.value, undefined)
			if ("selectedIndex" in attrs2) setAttr(vnode, "selectedIndex", null, attrs2.selectedIndex, undefined)
		}
	}
	function updateAttrs(vnode, old, attrs2, ns) {
		if (attrs2 != null) {
			for (var key2 in attrs2) {
				setAttr(vnode, key2, old && old[key2], attrs2[key2], ns)
			}
		}
		if (old != null) {
			for (var key2 in old) {
				if (attrs2 == null || !(key2 in attrs2)) {
					if (key2 === "className") key2 = "class"
					if (key2[0] === "o" && key2[1] === "n" && !isLifecycleMethod(key2)) updateEvent(vnode, key2, undefined)
					else if (key2 !== "key") vnode.dom.removeAttribute(key2)
				}
			}
		}
	}
	function isFormAttribute(vnode, attr) {
		return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === $doc.activeElement
	}
	function isLifecycleMethod(attr) {
		return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
	}
	function isAttribute(attr) {
		return attr === "href" || attr === "list" || attr === "form" || attr === "width" || attr === "height"// || attr === "type"
	}
	function isCustomElement(vnode){
		return vnode.attrs.is || vnode.tag.indexOf("-") > -1
	}
	function hasIntegrationMethods(source) {
		return source != null && (source.oncreate || source.onupdate || source.onbeforeremove || source.onremove)
	}
	//style
	function updateStyle(element, old, style) {
		if (old === style) element.style.cssText = "", old = null
		if (style == null) element.style.cssText = ""
		else if (typeof style === "string") element.style.cssText = style
		else {
			if (typeof old === "string") element.style.cssText = ""
			for (var key2 in style) {
				element.style[key2] = style[key2]
			}
			if (old != null && typeof old !== "string") {
				for (var key2 in old) {
					if (!(key2 in style)) element.style[key2] = ""
				}
			}
		}
	}
	//event
	function updateEvent(vnode, key2, value) {
		var element = vnode.dom
		var callback = typeof onevent !== "function" ? value : function(e) {
			var result = value.call(element, e)
			onevent.call(element, e)
			return result
		}
		if (key2 in element) element[key2] = typeof value === "function" ? callback : null
		else {
			var eventName = key2.slice(2)
			if (vnode.events === undefined) vnode.events = {}
			if (vnode.events[key2] === callback) return
			if (vnode.events[key2] != null) element.removeEventListener(eventName, vnode.events[key2], false)
			if (typeof value === "function") {
				vnode.events[key2] = callback
				element.addEventListener(eventName, vnode.events[key2], false)
			}
		}
	}
	//lifecycle
	function initLifecycle(source, vnode, hooks) {
		if (typeof source.oninit === "function") source.oninit.call(vnode.state, vnode)
		if (typeof source.oncreate === "function") hooks.push(source.oncreate.bind(vnode.state, vnode))
	}
	function updateLifecycle(source, vnode, hooks) {
		if (typeof source.onupdate === "function") hooks.push(source.onupdate.bind(vnode.state, vnode))
	}
	function shouldNotUpdate(vnode, old) {
		var forceVnodeUpdate, forceComponentUpdate
		if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") forceVnodeUpdate = vnode.attrs.onbeforeupdate.call(vnode.state, vnode, old)
		if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeupdate === "function") forceComponentUpdate = vnode._state.onbeforeupdate.call(vnode.state, vnode, old)
		if (!(forceVnodeUpdate === undefined && forceComponentUpdate === undefined) && !forceVnodeUpdate && !forceComponentUpdate) {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
			vnode.instance = old.instance
			return true
		}
		return false
	}
	function render(dom, vnodes) {
		if (!dom) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.")
		var hooks = []
		var active = $doc.activeElement
		var namespace = dom.namespaceURI
		// First time0 rendering into a node clears it out
		if (dom.vnodes == null) dom.textContent = ""
		if (!Array.isArray(vnodes)) vnodes = [vnodes]
		updateNodes(dom, dom.vnodes, Vnode.normalizeChildren(vnodes), false, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace)
		dom.vnodes = vnodes
		// document.activeElement can return null in IE https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement
		if (active != null && $doc.activeElement !== active) active.focus()
		for (var i = 0; i < hooks.length; i++) hooks[i]()
	}
	return {render: render, setEventCallback: setEventCallback}
}
function throttle(callback) {
	//60fps translates to 16.6ms, round it down since setTimeout requires int
	var time = 16
	var last = 0, pending = null
	var timeout = typeof requestAnimationFrame === "function" ? requestAnimationFrame : setTimeout
	return function() {
		var now = Date.now()
		if (last === 0 || now - last >= time) {
			last = now
			callback()
		}
		else if (pending === null) {
			pending = timeout(function() {
				pending = null
				callback()
				last = Date.now()
			}, time - (now - last))
		}
	}
}
var _11 = function($window) {
	var renderService = coreRenderer($window)
	renderService.setEventCallback(function(e) {
		if (e.redraw === false) e.redraw = undefined
		else redraw()
	})
	var callbacks = []
	function subscribe(key1, callback) {
		unsubscribe(key1)
		callbacks.push(key1, throttle(callback))
	}
	function unsubscribe(key1) {
		var index = callbacks.indexOf(key1)
		if (index > -1) callbacks.splice(index, 2)
	}
	function redraw() {
		for (var i = 1; i < callbacks.length; i += 2) {
			callbacks[i]()
		}
	}
	return {subscribe: subscribe, unsubscribe: unsubscribe, redraw: redraw, render: renderService.render}
}
var redrawService = _11(window)
requestService.setCompletionCallback(redrawService.redraw)
var _16 = function(redrawService0) {
	return function(root, component) {
		if (component === null) {
			redrawService0.render(root, [])
			redrawService0.unsubscribe(root)
			return
		}
		
		if (component.view == null && typeof component !== "function") throw new Error("m.mount(element, component) expects a component, not a vnode")
		
		var run0 = function() {
			redrawService0.render(root, Vnode(component))
		}
		redrawService0.subscribe(root, run0)
		redrawService0.redraw()
	}
}
m.mount = _16(redrawService)
var Promise = PromisePolyfill
var parseQueryString = function(string) {
	if (string === "" || string == null) return {}
	if (string.charAt(0) === "?") string = string.slice(1)
	var entries = string.split("&"), data0 = {}, counters = {}
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i].split("=")
		var key5 = decodeURIComponent(entry[0])
		var value = entry.length === 2 ? decodeURIComponent(entry[1]) : ""
		if (value === "true") value = true
		else if (value === "false") value = false
		var levels = key5.split(/\]\[?|\[/)
		var cursor = data0
		if (key5.indexOf("[") > -1) levels.pop()
		for (var j = 0; j < levels.length; j++) {
			var level = levels[j], nextLevel = levels[j + 1]
			var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10))
			var isValue = j === levels.length - 1
			if (level === "") {
				var key5 = levels.slice(0, j).join()
				if (counters[key5] == null) counters[key5] = 0
				level = counters[key5]++
			}
			if (cursor[level] == null) {
				cursor[level] = isValue ? value : isNumber ? [] : {}
			}
			cursor = cursor[level]
		}
	}
	return data0
}
var coreRouter = function($window) {
	var supportsPushState = typeof $window.history.pushState === "function"
	var callAsync0 = typeof setImmediate === "function" ? setImmediate : setTimeout
	function normalize1(fragment0) {
		var data = $window.location[fragment0].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)
		if (fragment0 === "pathname" && data[0] !== "/") data = "/" + data
		return data
	}
	var asyncId
	function debounceAsync(callback0) {
		return function() {
			if (asyncId != null) return
			asyncId = callAsync0(function() {
				asyncId = null
				callback0()
			})
		}
	}
	function parsePath(path, queryData, hashData) {
		var queryIndex = path.indexOf("?")
		var hashIndex = path.indexOf("#")
		var pathEnd = queryIndex > -1 ? queryIndex : hashIndex > -1 ? hashIndex : path.length
		if (queryIndex > -1) {
			var queryEnd = hashIndex > -1 ? hashIndex : path.length
			var queryParams = parseQueryString(path.slice(queryIndex + 1, queryEnd))
			for (var key4 in queryParams) queryData[key4] = queryParams[key4]
		}
		if (hashIndex > -1) {
			var hashParams = parseQueryString(path.slice(hashIndex + 1))
			for (var key4 in hashParams) hashData[key4] = hashParams[key4]
		}
		return path.slice(0, pathEnd)
	}
	var router = {prefix: "#!"}
	router.getPath = function() {
		var type2 = router.prefix.charAt(0)
		switch (type2) {
			case "#": return normalize1("hash").slice(router.prefix.length)
			case "?": return normalize1("search").slice(router.prefix.length) + normalize1("hash")
			default: return normalize1("pathname").slice(router.prefix.length) + normalize1("search") + normalize1("hash")
		}
	}
	router.setPath = function(path, data, options) {
		var queryData = {}, hashData = {}
		path = parsePath(path, queryData, hashData)
		if (data != null) {
			for (var key4 in data) queryData[key4] = data[key4]
			path = path.replace(/:([^\/]+)/g, function(match2, token) {
				delete queryData[token]
				return data[token]
			})
		}
		var query = buildQueryString(queryData)
		if (query) path += "?" + query
		var hash = buildQueryString(hashData)
		if (hash) path += "#" + hash
		if (supportsPushState) {
			var state = options ? options.state : null
			var title = options ? options.title : null
			$window.onpopstate()
			if (options && options.replace) $window.history.replaceState(state, title, router.prefix + path)
			else $window.history.pushState(state, title, router.prefix + path)
		}
		else $window.location.href = router.prefix + path
	}
	router.defineRoutes = function(routes, resolve, reject) {
		function resolveRoute() {
			var path = router.getPath()
			var params = {}
			var pathname = parsePath(path, params, params)
			var state = $window.history.state
			if (state != null) {
				for (var k in state) params[k] = state[k]
			}
			for (var route0 in routes) {
				var matcher = new RegExp("^" + route0.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")
				if (matcher.test(pathname)) {
					pathname.replace(matcher, function() {
						var keys = route0.match(/:[^\/]+/g) || []
						var values = [].slice.call(arguments, 1, -2)
						for (var i = 0; i < keys.length; i++) {
							params[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i])
						}
						resolve(routes[route0], params, path, route0)
					})
					return
				}
			}
			reject(path, params)
		}
		if (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute)
		else if (router.prefix.charAt(0) === "#") $window.onhashchange = resolveRoute
		resolveRoute()
	}
	return router
}
var _20 = function($window, redrawService0) {
	var routeService = coreRouter($window)
	var identity = function(v) {return v}
	var render1, component, attrs3, currentPath, lastUpdate
	var route = function(root, defaultRoute, routes) {
		if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined")
		var run1 = function() {
			if (render1 != null) redrawService0.render(root, render1(Vnode(component, attrs3.key, attrs3)))
		}
		var bail = function(path) {
			if (path !== defaultRoute) routeService.setPath(defaultRoute, null, {replace: true})
			else throw new Error("Could not resolve default route " + defaultRoute)
		}
		routeService.defineRoutes(routes, function(payload, params, path) {
			var update = lastUpdate = function(routeResolver, comp) {
				if (update !== lastUpdate) return
				component = comp != null && (typeof comp.view === "function" || typeof comp === "function")? comp : "div"
				attrs3 = params, currentPath = path, lastUpdate = null
				render1 = (routeResolver.render || identity).bind(routeResolver)
				run1()
			}
			if (payload.view || typeof payload === "function") update({}, payload)
			else {
				if (payload.onmatch) {
					Promise.resolve(payload.onmatch(params, path)).then(function(resolved) {
						update(payload, resolved)
					}, bail)
				}
				else update(payload, "div")
			}
		}, bail)
		redrawService0.subscribe(root, run1)
	}
	route.set = function(path, data, options) {
		if (lastUpdate != null) {
			options = options || {}
			options.replace = true
		}
		lastUpdate = null
		routeService.setPath(path, data, options)
	}
	route.get = function() {return currentPath}
	route.prefix = function(prefix0) {routeService.prefix = prefix0}
	route.link = function(vnode1) {
		vnode1.dom.setAttribute("href", routeService.prefix + vnode1.attrs.href)
		vnode1.dom.onclick = function(e) {
			if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return
			e.preventDefault()
			e.redraw = false
			var href = this.getAttribute("href")
			if (href.indexOf(routeService.prefix) === 0) href = href.slice(routeService.prefix.length)
			route.set(href, undefined, undefined)
		}
	}
	route.param = function(key3) {
		if(typeof attrs3 !== "undefined" && typeof key3 !== "undefined") return attrs3[key3]
		return attrs3
	}
	return route
}
m.route = _20(window, redrawService)
m.withAttr = function(attrName, callback1, context) {
	return function(e) {
		callback1.call(context || this, attrName in e.currentTarget ? e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName))
	}
}
var _28 = coreRenderer(window)
m.render = _28.render
m.redraw = redrawService.redraw
m.request = requestService.request
m.jsonp = requestService.jsonp
m.parseQueryString = parseQueryString
m.buildQueryString = buildQueryString
m.version = "1.1.6"
m.vnode = Vnode
if (typeof module !== "undefined") module["exports"] = m
else window.m = m
}());
},{}],"../js/templates/content.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.content = content;

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Exports:
function content(content) {
  return (0, _mithril2.default)('div', { class: 'content' }, content);
} // Imports:
},{"mithril":"../../node_modules/mithril/mithril.js"}],"../js/helpers/breakpoints.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Exports:
var breakpoints = exports.breakpoints = {

  // Variables:
  mobile: 650,

  // Functions:
  isMobile: function isMobile() {
    return window.innerWidth <= this.mobile;
  }
};
},{}],"../js/helpers/date.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.date = date;
// Constants:
var months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'

  // Exports:
};function date(date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return months[date.getMonth() + 1] + ' ' + date.getDate() + ' ' + date.getFullYear();
}
},{}],"../js/helpers/journal-entries.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Posts:
var journalEntries = exports.journalEntries = [{
  author: {
    email: 'kt@tdmn.co',
    firstname: 'Kasper',
    id: '1',
    lastname: 'Tidemann'
  },
  content: 'Greve, Denmark – We are tremendously happy and proud to announce the opening of the brand new Alefarm Brewing at the new location in Greve, just outside Copenhagen.\n\nWe have been on a journey that took nearly a year from finding the right location to getting all equipment installed and running smoothly. It has been quite the ride - fun, challenging and deeply rewarding.\n\nAt the new brewery, we have invested in a 4-tank 26 hectoliter brewhouse along with 10 fermentation tanks. Combined with our new canning line, this makes for an excellent setup to get fresh beers out the door.\n\nWe will have a fixed line-up of beers supplemented by seasonal offerings, new releases and collaborations. The production is carried forward by an explorative, creative and spontaneous brewing philosophy.\n\nWe are delighted to welcome two new brewers, a brand manager and an operations manager to the Alefarm family. Every single person at Alefarm Brewing is a part of our common story and we are ecstatic to have such talented people join us.\n\nI would like to say a profound thank you to everyone involved in the process. Thank you for helping out, for believing in us and for lending an ear when times were tough.\n\nNow, good times await and excellent beers are to be made. We are so excited and look forward to welcoming you to the new brewery. Cheers!',
  created: '2018-07-24T10:13:23.120Z',
  excerpt: 'We are tremendously happy and proud to announce the opening of the brand new Alefarm Brewing at the new location in Greve, just outside Copenhagen.',
  id: '1',
  slug: 'proudly-presenting-alefarm-brewing-2-0',
  title: 'Proudly presenting Alefarm Brewing 2.0'
}];
},{}],"../js/helpers/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _breakpoints = require('./breakpoints');

Object.defineProperty(exports, 'breakpoints', {
  enumerable: true,
  get: function () {
    return _breakpoints.breakpoints;
  }
});

var _date = require('./date');

Object.defineProperty(exports, 'date', {
  enumerable: true,
  get: function () {
    return _date.date;
  }
});

var _journalEntries = require('./journal-entries');

Object.defineProperty(exports, 'journalEntries', {
  enumerable: true,
  get: function () {
    return _journalEntries.journalEntries;
  }
});
},{"./breakpoints":"../js/helpers/breakpoints.js","./date":"../js/helpers/date.js","./journal-entries":"../js/helpers/journal-entries.js"}],"../js/templates/layout.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.layout = layout;

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _helpers = require('../helpers');

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Variables:
var $html = null; // Imports:

var firstRun = true;
var logoActivated = false;
var overlayRoute = null;
var overlayShow = false;
var overlayToggled = false;
var overlayToggling = false;

// Functions:
function activateLogo() {
  logoActivated = true;
}

function shouldShowOverlay() {
  overlayShow = overlayShow && overlayRoute === window.location.href;

  return overlayShow;
}

function show(vnode) {
  if (!firstRun) {
    var className = '';

    if (logoActivated && _mithril2.default.route.get() === '/' && _helpers.breakpoints.isMobile()) {
      className = 'layout-mobile-show-home';

      logoActivated = false;
    } else if (overlayToggled) {
      className = 'layout-show';
    }

    if (className) {
      vnode.dom.classList.add(className);

      setTimeout(function () {
        vnode.dom.classList.remove(className);
      }, 500);
    }
  }

  firstRun = false;
}

function toggleOverlay(options) {
  if (!overlayToggling) {
    overlayShow = !overlayShow;
    overlayToggling = true;

    if (!$html) {
      $html = document.getElementsByTagName('html')[0];
    }

    if (overlayShow) {
      overlayRoute = window.location.href;
      overlayToggled = true;

      $html.style.height = '100%';
      $html.style.overflow = 'hidden';

      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';

      if (_helpers.breakpoints.isMobile()) {
        setTimeout(function () {
          $html.style.backgroundColor = '#f7941d';

          overlayToggling = false;
        }, 500);
      }
    } else {
      $html.style.backgroundColor = '';

      setTimeout(function () {
        overlayRoute = null;
        overlayToggled = false;
        overlayToggling = false;

        $html.style.height = '';
        $html.style.overflow = '';

        document.body.style.height = '';
        document.body.style.overflow = '';
      }, 500);
    }
  }
}

// Exports:
function layout(className, contents) {
  return [shouldShowOverlay() ? (0, _mithril2.default)(_components.Overlay, { overlayShow: overlayShow, toggleOverlay: toggleOverlay }) : null, _mithril2.default.vnode('div', undefined, { class: 'layout ' + (className || ''), oncreate: show }, [(0, _mithril2.default)(_components.Menu, { activateLogo: activateLogo, toggleOverlay: toggleOverlay }), (0, _mithril2.default)('div', { class: 'contents' }, contents), (0, _mithril2.default)(_components.Footer, { toggleOverlay: toggleOverlay })], undefined, undefined)];
}
},{"mithril":"../../node_modules/mithril/mithril.js","../helpers":"../js/helpers/index.js","../components":"../js/components/index.js"}],"../js/templates/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _content = require('./content');

Object.defineProperty(exports, 'content', {
  enumerable: true,
  get: function () {
    return _content.content;
  }
});

var _layout = require('./layout');

Object.defineProperty(exports, 'layout', {
  enumerable: true,
  get: function () {
    return _layout.layout;
  }
});
},{"./content":"../js/templates/content.js","./layout":"../js/templates/layout.js"}],"../js/components/contact.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contact = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ = require('./');

var _templates = require('../templates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var Contact = function () {
  function Contact() {
    _classCallCheck(this, Contact);
  }

  _createClass(Contact, [{
    key: 'view',
    value: function view() {
      return (0, _templates.layout)('contact', [(0, _mithril2.default)(_.Title, { content: 'Get in touch.' }), (0, _mithril2.default)(_.Line, { class: 'hidden-on-mobile' }), (0, _templates.content)([(0, _mithril2.default)(_.Paragraph, { content: 'At Tidemann&Co, we are here to help. We offer consulting, software development, startup advice and everything else to companies and people who are ready to embrace bold ideas and new ways of thinking.' }), (0, _mithril2.default)(_.Paragraph, { content: ['Let us know what\'s on your mind at ', (0, _mithril2.default)(_.Link, { content: 'hey@tdmn.co', external: true, to: 'mailto:hey@tdmn.co' }), ' and we will get right back to you.'] })])]);
    }
  }]);

  return Contact;
}();

// Exports:


exports.Contact = Contact;
},{"mithril":"../../node_modules/mithril/mithril.js","./":"../js/components/index.js","../templates":"../js/templates/index.js"}],"../js/components/footer.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Variables:
var year = new Date().getFullYear();

// Functions:
function toggleOverlay(vnode) {
  return function () {
    window.scrollTo(0, 0);

    vnode.attrs.toggleOverlay();
  };
}

// Classes:

var Footer = function () {
  function Footer() {
    _classCallCheck(this, Footer);
  }

  _createClass(Footer, [{
    key: 'view',
    value: function view(vnode) {
      return _mithril2.default.vnode('div', undefined, {
        className: 'footer'
      }, [_mithril2.default.vnode('div', undefined, {
        className: 'links'
      }, [(0, _mithril2.default)(_.Link, { content: 'JOURNAL', to: '/journal' }), (0, _mithril2.default)(_.Link, { content: 'CONTACT', to: '/contact' }), (0, _mithril2.default)(_.Link, { content: 'MORE', onmousedown: toggleOverlay(vnode) })], undefined, undefined), (0, _mithril2.default)(_.Paragraph, { class: 'copyright', content: ['Copyright © ' + year + ', Tidemann&Co – All rights reserved.'] }), _mithril2.default.vnode('div', undefined, {
        className: 'ampersand'
      }, [], undefined, undefined)], undefined, undefined);
    }
  }]);

  return Footer;
}();

// Exports:


exports.Footer = Footer;
},{"mithril":"../../node_modules/mithril/mithril.js","./":"../js/components/index.js"}],"../js/components/home.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ = require('./');

var _templates = require('../templates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var Home = function () {
  function Home() {
    _classCallCheck(this, Home);
  }

  _createClass(Home, [{
    key: 'view',
    value: function view() {
      return (0, _templates.layout)('home', [(0, _mithril2.default)(_.Title, { content: 'Quality is built on love.' }), (0, _mithril2.default)(_.Line, { class: 'hidden-on-mobile' }), (0, _templates.content)([(0, _mithril2.default)(_.Paragraph, { content: 'Tidemann&Co is a Copenhagen-based corporation with activities in software and investments. We believe that quality is built on proper planning, efficient execution and a genuine love for what you do.' }), (0, _mithril2.default)(_.Paragraph, { content: 'Our craft is software. We live and breathe the art and science of computers, because it enables us to do so many amazing things. Software breaks barriers and builds bridges in business, society and life in general.' }), (0, _mithril2.default)(_.Paragraph, { content: 'We invest in people, not ideas. We bet on the ability to make things happen and we match with anyone who cares deeply for what they do.' }), (0, _mithril2.default)(_.Signature)])]);
    }
  }]);

  return Home;
}();

// Exports:


exports.Home = Home;
},{"mithril":"../../node_modules/mithril/mithril.js","./":"../js/components/index.js","../templates":"../js/templates/index.js"}],"../js/components/investment.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Investment = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var Investment = function () {
  function Investment() {
    _classCallCheck(this, Investment);
  }

  _createClass(Investment, [{
    key: 'view',
    value: function view(vnode) {
      return _mithril2.default.vnode('div', undefined, { class: 'investment ' + (vnode.attrs.class || '') }, [_mithril2.default.vnode('div', undefined, {
        className: 'icon'
      }, [], undefined, undefined), _mithril2.default.vnode('div', undefined, {
        className: 'description'
      }, [_mithril2.default.vnode('h2', undefined, undefined, [(0, _mithril2.default)(_.Link, { content: vnode.attrs.title, external: true, to: vnode.attrs.url })], undefined, undefined), (0, _mithril2.default)(_.Paragraph, { content: vnode.attrs.description })], undefined, undefined)], undefined, undefined);
    }
  }]);

  return Investment;
}();

// Exports:


exports.Investment = Investment;
},{"mithril":"../../node_modules/mithril/mithril.js","./":"../js/components/index.js"}],"../js/components/investments.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Investments = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ = require('./');

var _templates = require('../templates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var Investments = function () {
  function Investments() {
    _classCallCheck(this, Investments);
  }

  _createClass(Investments, [{
    key: 'view',
    value: function view() {
      return (0, _templates.layout)('investments', [(0, _mithril2.default)(_.Title, { content: 'We invest in people.' }), (0, _mithril2.default)(_.Line, { class: 'hidden-on-mobile' }), (0, _templates.content)([(0, _mithril2.default)(_.Paragraph, { content: 'We invest in people, not ideas. We bet on the ability to make things happen and we match with anyone who cares deeply for what they do.' }), (0, _mithril2.default)(_.Paragraph, { content: 'We currently have investments in the following companies:' }), _mithril2.default.vnode('div', undefined, {
        className: 'investments'
      }, [(0, _mithril2.default)(_.Investment, {
        class: 'alefarm-brewing',
        description: 'Alefarm Brewing is a Copenhagen-based craft brewery with a focus on modern hoppy offerings and a wide array of unique, flavorful mixed fermentation farmhouse ales.',
        title: 'Alefarm Brewing IVS',
        url: 'https://alefarm.dk/'
      }), (0, _mithril2.default)(_.Investment, {
        class: 'live-company',
        description: 'Live Company is the one-stop shop for professional audio and visual solutions for events, concerts, festivals, conferences and more. With expert staff ready to assist, everything from planning to the running of an event is a breeze.',
        title: 'Live Company A/S',
        url: 'https://livecompany.dk/'
      }), (0, _mithril2.default)(_.Investment, {
        class: 'helium',
        description: 'HELIUM is a creative and experimental cocktail bar located in one of the most decadent streets of Copenhagen. Served at the bar is marvellous combinations featuring different kinds of spirits, bitters, syrups, juices and cordials.',
        title: 'HELIUM ApS',
        url: 'http://heliumcph.dk'
      })], undefined, undefined)])]);
    }
  }]);

  return Investments;
}();

// Exports:


exports.Investments = Investments;
},{"mithril":"../../node_modules/mithril/mithril.js","./":"../js/components/index.js","../templates":"../js/templates/index.js"}],"../../node_modules/tdmnco-model-js/dist/index.js":[function(require,module,exports) {
var define;
parcelRequire=function(e,r,n,t){function i(n,t){function o(e){return i(o.resolve(e))}function c(r){return e[n][1][r]||r}if(!r[n]){if(!e[n]){var l="function"==typeof parcelRequire&&parcelRequire;if(!t&&l)return l(n,!0);if(u)return u(n,!0);if(f&&"string"==typeof n)return f(n);var p=new Error("Cannot find module '"+n+"'");throw p.code="MODULE_NOT_FOUND",p}o.resolve=c;var a=r[n]=new i.Module(n);e[n][0].call(a.exports,o,a,a.exports,this)}return r[n].exports}function o(e){this.id=e,this.bundle=i,this.exports={}}var u="function"==typeof parcelRequire&&parcelRequire,f="function"==typeof require&&require;i.isParcelRequire=!0,i.Module=o,i.modules=e,i.cache=r,i.parent=u;for(var c=0;c<n.length;c++)i(n[c]);if(n.length){var l=i(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):t&&(this[t]=l)}return i}({3:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n=[],r=!0,o={};try{localStorage.setItem("tdmnco-model-js",{}),localStorage.removeItem("tdmnco-model-js")}catch(t){console.warn("Model.js: localStorage not supported!",t),r=!1}var a=function(){function a(t){if(e(this,a),!t.id)throw new Error("Model.js: cannot create instance without an id!");Object.assign(this,t);var n=(this.constructor.prototype.modelName||this.constructor.name)+"-"+this.id;return o[n]={updates:[]},new Proxy(this,{get:function(t,e,n){return Reflect.get(t,e,n)},set:function(t,e,r){var a=o[n].updates;if(a.length){var i=!0,c=!1,s=void 0;try{for(var u,l=a[Symbol.iterator]();!(i=(u=l.next()).done);i=!0){(0,u.value)(e,t[e],r)}}catch(t){c=!0,s=t}finally{try{!i&&l.return&&l.return()}finally{if(c)throw s}}}return Reflect.set(t,e,r),!0}})}return t(a,[{key:"_cache",value:function(){var t=this._cached(),e=(new Date).toISOString();return t?(t.instance=this,t.updated=e):(t={created:e,random:Math.random(),instance:this},n[this._id()]=t),t}},{key:"_cached",value:function(){return n[this._id()]}},{key:"_id",value:function(){return(this.modelName||this.constructor.name)+"-"+this.id}},{key:"onUpdate",value:function(t){o[this._id()].updates.push(t)}},{key:"save",value:function(){this._cache(),r&&localStorage.setItem(this._id(),JSON.stringify(this))}}],[{key:"get",value:function(t){t=(this.prototype.modelName||this.prototype.constructor.name)+"-"+t;var e=n[t];return!e&&r?new this(JSON.parse(localStorage.getItem(t))):e.instance}}]),a}();exports.Model=a;
},{}],1:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./model");Object.defineProperty(exports,"Model",{enumerable:!0,get:function(){return e.Model}});
},{"./model":3}]},{},[1], null)
//# sourceMappingURL=/index.map
},{}],"../js/models/journal-entry.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JournalEntry = undefined;

var _tdmncoModelJs = require('tdmnco-model-js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Imports:


// Classes:
var JournalEntry = function (_Model) {
  _inherits(JournalEntry, _Model);

  function JournalEntry(data) {
    _classCallCheck(this, JournalEntry);

    return _possibleConstructorReturn(this, (JournalEntry.__proto__ || Object.getPrototypeOf(JournalEntry)).call(this, data, {
      endpoint: '',
      modelName: 'JournalEntry'
    }));
  }

  return JournalEntry;
}(_tdmncoModelJs.Model);

// Prototyping:


JournalEntry.prototype.modelName = 'JournalEntry';

// Exports:
exports.JournalEntry = JournalEntry;
},{"tdmnco-model-js":"../../node_modules/tdmnco-model-js/dist/index.js"}],"../js/models/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _journalEntry = require('./journal-entry');

Object.defineProperty(exports, 'JournalEntry', {
  enumerable: true,
  get: function () {
    return _journalEntry.JournalEntry;
  }
});
},{"./journal-entry":"../js/models/journal-entry.js"}],"../js/components/journal.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Journal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ = require('./');

var _helpers = require('../helpers');

var _models = require('../models');

var _templates = require('../templates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Variables:
var journalEntry1 = new _models.JournalEntry(_helpers.journalEntries[0]);

// Context:
journalEntry1.save();

// Classes:

var Journal = function () {
  function Journal() {
    _classCallCheck(this, Journal);
  }

  _createClass(Journal, [{
    key: 'view',
    value: function view() {
      return (0, _templates.layout)('journal', [(0, _mithril2.default)(_.Title, { content: 'Journal.' }), (0, _mithril2.default)(_.Line, { class: 'hidden-on-mobile' }), (0, _templates.content)([(0, _mithril2.default)(_.JournalEntrySummary, { journalEntry: journalEntry1 })])]);
    }
  }]);

  return Journal;
}();

// Exports:


exports.Journal = Journal;
},{"mithril":"../../node_modules/mithril/mithril.js","./":"../js/components/index.js","../helpers":"../js/helpers/index.js","../models":"../js/models/index.js","../templates":"../js/templates/index.js"}],"../js/components/journal-entry.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JournalEntry = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ = require('./');

var _helpers = require('../helpers');

var _models = require('../models');

var _templates = require('../templates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var JournalEntry = function () {
  function JournalEntry() {
    _classCallCheck(this, JournalEntry);
  }

  _createClass(JournalEntry, [{
    key: 'oninit',
    value: function oninit(vnode) {
      vnode.attrs.journalEntry = _models.JournalEntry.get('1'); // m.route.param('slug')
    }
  }, {
    key: 'view',
    value: function view(vnode) {
      return (0, _templates.layout)('journal-entry', [(0, _mithril2.default)(_.Title, { content: vnode.attrs.journalEntry.title }), (0, _mithril2.default)(_.Subtitle, { content: ['By ', (0, _mithril2.default)(_.Link, { content: vnode.attrs.journalEntry.author.firstname + ' ' + vnode.attrs.journalEntry.author.lastname, external: true, to: 'mailto:' + vnode.attrs.journalEntry.author.email }), ', ', (0, _helpers.date)(vnode.attrs.journalEntry.created)] }), (0, _mithril2.default)(_.Line, { class: 'hidden-on-mobile' }), (0, _templates.content)([vnode.attrs.journalEntry.content.split('\n\n').map(function (paragraph) {
        return (0, _mithril2.default)(_.Paragraph, { content: paragraph });
      }), (0, _mithril2.default)(_.Signature)])]);
    }
  }]);

  return JournalEntry;
}();

// Exports:


exports.JournalEntry = JournalEntry;
},{"mithril":"../../node_modules/mithril/mithril.js","./":"../js/components/index.js","../helpers":"../js/helpers/index.js","../models":"../js/models/index.js","../templates":"../js/templates/index.js"}],"../js/components/journal-entry-summary.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JournalEntrySummary = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _helpers = require('../helpers');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var JournalEntrySummary = function () {
  function JournalEntrySummary() {
    _classCallCheck(this, JournalEntrySummary);
  }

  _createClass(JournalEntrySummary, [{
    key: 'view',
    value: function view(vnode) {
      return _mithril2.default.vnode('div', undefined, { class: 'journal-entry-summary ' + (vnode.attrs.class || '') }, [_mithril2.default.vnode('h2', undefined, {
        className: 'title'
      }, [(0, _mithril2.default)(_.Link, { content: vnode.attrs.journalEntry.title, to: '/journal/' + vnode.attrs.journalEntry.slug })], undefined, undefined), (0, _mithril2.default)(_.Paragraph, { content: vnode.attrs.journalEntry.excerpt }), (0, _mithril2.default)(_.Paragraph, { class: 'author', content: ['By ', (0, _mithril2.default)(_.Link, { content: vnode.attrs.journalEntry.author.firstname + ' ' + vnode.attrs.journalEntry.author.lastname, external: true, to: 'mailto:' + vnode.attrs.journalEntry.author.email }), ', ', (0, _helpers.date)(vnode.attrs.journalEntry.created)] })], undefined, undefined);
    }
  }]);

  return JournalEntrySummary;
}();

// Exports:


exports.JournalEntrySummary = JournalEntrySummary;
},{"mithril":"../../node_modules/mithril/mithril.js","../helpers":"../js/helpers/index.js","./":"../js/components/index.js"}],"../js/components/line.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Line = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var Line = function () {
  function Line() {
    _classCallCheck(this, Line);
  }

  _createClass(Line, [{
    key: 'view',
    value: function view(vnode) {
      return _mithril2.default.vnode('div', undefined, { class: 'line ' + (vnode.attrs.class || '') }, [], undefined, undefined);
    }
  }]);

  return Line;
}();

// Exports:


exports.Line = Line;
},{"mithril":"../../node_modules/mithril/mithril.js"}],"../js/components/link.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Functions:
function beforeRoute(vnode) {
  return function () {
    if (vnode.attrs.external) {} else {
      window.scrollTo(0, 0);
    }
  };
}

// Classes:

var Link = function () {
  function Link() {
    _classCallCheck(this, Link);
  }

  _createClass(Link, [{
    key: 'view',
    value: function view(vnode) {
      return (0, _mithril2.default)('a', { class: 'link ' + (vnode.attrs.class || ''), href: vnode.attrs.to, oncreate: vnode.attrs.external ? null : _mithril2.default.route.link, onmousedown: vnode.attrs.onmousedown, onmouseup: beforeRoute(vnode) }, vnode.attrs.content);
    }
  }]);

  return Link;
}();

// Exports:


exports.Link = Link;
},{"mithril":"../../node_modules/mithril/mithril.js"}],"../js/components/menu.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Functions:
function home(vnode) {
  return function () {
    vnode.attrs.activateLogo();

    _mithril2.default.route.set('/');
  };
}

// Classes:

var Menu = function () {
  function Menu() {
    _classCallCheck(this, Menu);
  }

  _createClass(Menu, [{
    key: 'view',
    value: function view(vnode) {
      return _mithril2.default.vnode('div', undefined, {
        className: 'menu'
      }, [_mithril2.default.vnode('div', undefined, {
        className: 'logo',
        onclick: home(vnode) }, [], undefined, undefined), _mithril2.default.vnode('div', undefined, {
        className: 'toggle',
        onclick: vnode.attrs.toggleOverlay }, [_mithril2.default.vnode('div', undefined, {
        className: 'toggle-line toggle-line-one'
      }, [], undefined, undefined), _mithril2.default.vnode('div', undefined, {
        className: 'toggle-line toggle-line-two'
      }, [], undefined, undefined), _mithril2.default.vnode('div', undefined, {
        className: 'toggle-line toggle-line-three'
      }, [], undefined, undefined)], undefined, undefined), _mithril2.default.vnode('div', undefined, {
        className: 'links'
      }, [(0, _mithril2.default)(_.Link, { content: 'SOFTWARE', to: '/software' }), (0, _mithril2.default)(_.Link, { content: 'INVESTMENTS', to: '/investments' }), (0, _mithril2.default)(_.Link, { content: 'JOURNAL', to: '/journal' }), (0, _mithril2.default)(_.Link, { content: 'CONTACT', to: '/contact' })], undefined, undefined)], undefined, undefined);
    }
  }]);

  return Menu;
}();

// Exports:


exports.Menu = Menu;
},{"mithril":"../../node_modules/mithril/mithril.js","./":"../js/components/index.js"}],"../js/components/overlay.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Overlay = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var Overlay = function () {
  function Overlay() {
    _classCallCheck(this, Overlay);
  }

  _createClass(Overlay, [{
    key: 'onbeforeremove',
    value: function onbeforeremove(vnode) {
      return new Promise(function (resolve) {
        vnode.dom.classList.remove('overlay-show');
        vnode.dom.classList.add('overlay-hide');

        _mithril2.default.redraw();

        setTimeout(function () {
          resolve();
        }, 500);
      });
    }
  }, {
    key: 'view',
    value: function view(vnode) {
      return _mithril2.default.vnode('div', undefined, {
        className: 'overlay overlay-show'
      }, [_mithril2.default.vnode('div', undefined, {
        className: 'links'
      }, [_mithril2.default.vnode('div', undefined, {
        className: 'ampersand',
        onclick: vnode.attrs.toggleOverlay }, [], undefined, undefined), (0, _mithril2.default)(_.Link, { class: 'overlay-link-one', content: 'HOME', onmousedown: vnode.attrs.toggleOverlay, to: '/' }), (0, _mithril2.default)(_.Link, { class: 'overlay-link-two', content: 'SOFTWARE', onmousedown: vnode.attrs.toggleOverlay, to: '/software' }), (0, _mithril2.default)(_.Link, { class: 'overlay-link-three', content: 'INVESTMENTS', onmousedown: vnode.attrs.toggleOverlay, to: '/investments' }), (0, _mithril2.default)(_.Link, { class: 'overlay-link-four', content: 'JOURNAL', onmousedown: vnode.attrs.toggleOverlay, to: '/journal' }), (0, _mithril2.default)(_.Link, { class: 'overlay-link-five', content: 'CONTACT', onmousedown: vnode.attrs.toggleOverlay, to: '/contact' })], undefined, undefined)], undefined, undefined);
    }
  }]);

  return Overlay;
}();

// Exports:


exports.Overlay = Overlay;
},{"mithril":"../../node_modules/mithril/mithril.js","./":"../js/components/index.js"}],"../js/components/paragraph.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paragraph = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var Paragraph = function () {
  function Paragraph() {
    _classCallCheck(this, Paragraph);
  }

  _createClass(Paragraph, [{
    key: 'view',
    value: function view(vnode) {
      return (0, _mithril2.default)('p', { class: 'paragraph ' + (vnode.attrs.class || '') }, vnode.attrs.content);
    }
  }]);

  return Paragraph;
}();

// Exports:


exports.Paragraph = Paragraph;
},{"mithril":"../../node_modules/mithril/mithril.js"}],"../js/components/signature.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Signature = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var Signature = function () {
  function Signature() {
    _classCallCheck(this, Signature);
  }

  _createClass(Signature, [{
    key: 'view',
    value: function view(vnode) {
      return [(0, _mithril2.default)(_.Paragraph, { content: 'All the best,' }), (0, _mithril2.default)(_.Paragraph, { class: 'signature', content: [_mithril2.default.vnode('span', undefined, {
          className: 'name'
        }, undefined, 'Kasper Tidemann', undefined), _mithril2.default.vnode('span', undefined, {
          className: 'title'
        }, undefined, 'CEO, Tidemann&Co', undefined), _mithril2.default.vnode('div', undefined, undefined, [], undefined, undefined)] })];
    }
  }]);

  return Signature;
}();

// Exports:


exports.Signature = Signature;
},{"mithril":"../../node_modules/mithril/mithril.js","./":"../js/components/index.js"}],"../js/components/software.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Software = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ = require('./');

var _templates = require('../templates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var Software = function () {
  function Software() {
    _classCallCheck(this, Software);
  }

  _createClass(Software, [{
    key: 'view',
    value: function view() {
      return (0, _templates.layout)('software', [(0, _mithril2.default)(_.Title, { content: 'Our craft is yours.' }), (0, _mithril2.default)(_.Line, { class: 'hidden-on-mobile' }), (0, _templates.content)([(0, _mithril2.default)(_.Paragraph, { content: 'Our craft is software. We live and breathe the art and science of computers, because it enables us to do so many amazing things. Software breaks barriers and builds bridges in business, society and life in general.' }), (0, _mithril2.default)(_.Paragraph, { content: 'We work with companies in a wide range of sectors, ranging from banking to food production. Our clients include local shops and high-profile enterprises that need quality software solutions to get the job done.' }), _mithril2.default.vnode('div', undefined, {
        className: 'products'
      }, [(0, _mithril2.default)(_.SoftwareProduct, {
        class: 'consulting',
        description: 'We deliver world-class consulting services in all aspects of software development. Working with us equals quality that is built on proper planning, efficient execution, and a genuine love for what you do.',
        title: 'Consulting',
        to: '/software/consulting'
      }), (0, _mithril2.default)(_.SoftwareProduct, {
        class: 'data-platform',
        description: 'The Tidemann&Co Data Platform is our flagship solution for managing data. It builds upon database technologies that enable distributed, fault-tolerant operations that keep data safe and make scaling a breeze.',
        title: 'Data Platform',
        to: '/software/data-platform'
      }), (0, _mithril2.default)(_.SoftwareProduct, {
        class: 'storage-engine',
        description: 'The Tidemann&Co Storage Engine is an application for storing files. Optimized for storing large files across clusters of servers, it allows for simple access through interfaces familiar to any developer.',
        title: 'Storage Engine',
        to: '/software/storage-engine'
      }), (0, _mithril2.default)(_.SoftwareProduct, {
        class: 'content-editor',
        description: 'The Tidemann&Co Content Editor puts you in control of the data stored in the Tidemann&Co stack. Upload, edit and publish any content to relevant channels in order to reach the right people.',
        title: 'Content Editor',
        to: '/software/content-editor'
      })], undefined, undefined)])]);
    }
  }]);

  return Software;
}();

// Exports:


exports.Software = Software;
},{"mithril":"../../node_modules/mithril/mithril.js","./":"../js/components/index.js","../templates":"../js/templates/index.js"}],"../js/components/software-consulting.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoftwareConsulting = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ = require('./');

var _templates = require('../templates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var SoftwareConsulting = function () {
  function SoftwareConsulting() {
    _classCallCheck(this, SoftwareConsulting);
  }

  _createClass(SoftwareConsulting, [{
    key: 'view',
    value: function view() {
      return (0, _templates.layout)('software-consulting', [(0, _mithril2.default)(_.Title, { content: 'Get the job done.' }), (0, _mithril2.default)(_.Line, { class: 'hidden-on-mobile' }), (0, _templates.content)([(0, _mithril2.default)(_.Paragraph, { content: 'Are you looking for the best software developers available? Then we should talk.' }), (0, _mithril2.default)(_.Paragraph, { content: 'We provide companies and organizations with expert-level, creative and inspiring consultants with the ability to get the job done in time - and on budget.' }), (0, _mithril2.default)(_.Paragraph, { content: 'We are digital natives at heart. We dream in code and believe for software to be a thing of beauty if done right. We are wildly passionate about the projects we work on - and we are entirely committed to the clients we work with.' }), (0, _mithril2.default)(_.Paragraph, { content: 'Our work is quality built on proper planning, efficient execution, and a genuine love for what we do.' }), (0, _mithril2.default)(_.Paragraph, { content: ['For consulting needs, please ', (0, _mithril2.default)(_.Link, { content: 'contact us', to: '/contact' }), ' for more information - we\'re happy to hear from you.'] })])]);
    }
  }]);

  return SoftwareConsulting;
}();

// Exports:


exports.SoftwareConsulting = SoftwareConsulting;
},{"mithril":"../../node_modules/mithril/mithril.js","./":"../js/components/index.js","../templates":"../js/templates/index.js"}],"../js/components/software-content-editor.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoftwareContentEditor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ = require('./');

var _templates = require('../templates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var SoftwareContentEditor = function () {
  function SoftwareContentEditor() {
    _classCallCheck(this, SoftwareContentEditor);
  }

  _createClass(SoftwareContentEditor, [{
    key: 'view',
    value: function view() {
      return (0, _templates.layout)('software-content-editor', [(0, _mithril2.default)(_.Title, { content: 'Empower yourself.' }), (0, _mithril2.default)(_.Line, { class: 'hidden-on-mobile' }), (0, _templates.content)([(0, _mithril2.default)(_.Paragraph, { content: 'The Tidemann&Co Content Editor puts you in control of the data stored in the Tidemann&Co stack. Upload, edit and publish any content to relevant channels in order to reach the right people.' }), (0, _mithril2.default)(_.Paragraph, { content: 'The Content Editor is based on years of working with content in a wide range of areas. We are planning to open-source the Content Editor soon.' }), (0, _mithril2.default)(_.Paragraph, { content: ['For demonstration, pricing and support, please ', (0, _mithril2.default)(_.Link, { content: 'contact us', to: '/contact' }), ' for more information - we\'re delighted to hear from you.'] })])]);
    }
  }]);

  return SoftwareContentEditor;
}();

// Exports:


exports.SoftwareContentEditor = SoftwareContentEditor;
},{"mithril":"../../node_modules/mithril/mithril.js","./":"../js/components/index.js","../templates":"../js/templates/index.js"}],"../js/components/software-data-platform.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoftwareDataPlatform = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ = require('./');

var _templates = require('../templates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var SoftwareDataPlatform = function () {
  function SoftwareDataPlatform() {
    _classCallCheck(this, SoftwareDataPlatform);
  }

  _createClass(SoftwareDataPlatform, [{
    key: 'view',
    value: function view() {
      return (0, _templates.layout)('software-data-platform', [(0, _mithril2.default)(_.Title, { content: 'Data is everywhere.' }), (0, _mithril2.default)(_.Line, { class: 'hidden-on-mobile' }), (0, _templates.content)([(0, _mithril2.default)(_.Paragraph, { content: 'The Tidemann&Co Data Platform is our flagship solution for managing data. It builds upon database technologies that enable distributed, fault-tolerant operations that keep data safe and make scaling a breeze.' }), (0, _mithril2.default)(_.Paragraph, { content: 'The Data Platform is based on years of working with data in scenarios spanning small setups to enterprise-level installations. We are planning to open-source the Data Platform soon.' }), (0, _mithril2.default)(_.Paragraph, { content: ['For demonstration, pricing and support, please ', (0, _mithril2.default)(_.Link, { content: 'contact us', to: '/contact' }), ' for more information - we\'re ready to hear from you.'] })])]);
    }
  }]);

  return SoftwareDataPlatform;
}();

// Exports:


exports.SoftwareDataPlatform = SoftwareDataPlatform;
},{"mithril":"../../node_modules/mithril/mithril.js","./":"../js/components/index.js","../templates":"../js/templates/index.js"}],"../js/components/software-product.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoftwareProduct = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var SoftwareProduct = function () {
  function SoftwareProduct() {
    _classCallCheck(this, SoftwareProduct);
  }

  _createClass(SoftwareProduct, [{
    key: 'view',
    value: function view(vnode) {
      return _mithril2.default.vnode('div', undefined, { class: 'software-product ' + (vnode.attrs.class || '') }, [_mithril2.default.vnode('div', undefined, {
        className: 'icon'
      }, [], undefined, undefined), _mithril2.default.vnode('div', undefined, {
        className: 'description'
      }, [_mithril2.default.vnode('h2', undefined, undefined, [(0, _mithril2.default)(_.Link, { content: vnode.attrs.title, to: vnode.attrs.to })], undefined, undefined), (0, _mithril2.default)(_.Paragraph, { content: vnode.attrs.description })], undefined, undefined)], undefined, undefined);
    }
  }]);

  return SoftwareProduct;
}();

// Exports:


exports.SoftwareProduct = SoftwareProduct;
},{"mithril":"../../node_modules/mithril/mithril.js","./":"../js/components/index.js"}],"../js/components/software-storage-engine.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoftwareStorageEngine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ = require('./');

var _templates = require('../templates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var SoftwareStorageEngine = function () {
  function SoftwareStorageEngine() {
    _classCallCheck(this, SoftwareStorageEngine);
  }

  _createClass(SoftwareStorageEngine, [{
    key: 'view',
    value: function view() {
      return (0, _templates.layout)('software-storage-engine', [(0, _mithril2.default)(_.Title, { content: 'Storage made easy.' }), (0, _mithril2.default)(_.Line, { class: 'hidden-on-mobile' }), (0, _templates.content)([(0, _mithril2.default)(_.Paragraph, { content: 'The Tidemann&Co Storage Engine is an application for storing files. Optimized for handling large files across clusters of servers, it allows for simple access through interfaces familiar to any developer.' }), (0, _mithril2.default)(_.Paragraph, { content: 'The Storage Engine is based on years of working with files and replication for managing and safe-keeping data. We are planning to open-source the Storage Engine soon.' }), (0, _mithril2.default)(_.Paragraph, { content: ['For demonstration, pricing and support, please ', (0, _mithril2.default)(_.Link, { content: 'contact us', to: '/contact' }), ' for more information - we\'re happy to hear from you.'] })])]);
    }
  }]);

  return SoftwareStorageEngine;
}();

// Exports:


exports.SoftwareStorageEngine = SoftwareStorageEngine;
},{"mithril":"../../node_modules/mithril/mithril.js","./":"../js/components/index.js","../templates":"../js/templates/index.js"}],"../js/components/subtitle.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subtitle = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var Subtitle = function () {
  function Subtitle() {
    _classCallCheck(this, Subtitle);
  }

  _createClass(Subtitle, [{
    key: 'view',
    value: function view(vnode) {
      return (0, _mithril2.default)('h3', { class: 'subtitle' }, vnode.attrs.content);
    }
  }]);

  return Subtitle;
}();

// Exports:


exports.Subtitle = Subtitle;
},{"mithril":"../../node_modules/mithril/mithril.js"}],"../js/components/title.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Title = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Imports:


// Classes:
var Title = function () {
  function Title() {
    _classCallCheck(this, Title);
  }

  _createClass(Title, [{
    key: 'view',
    value: function view(vnode) {
      return (0, _mithril2.default)('h1', { class: 'title' }, vnode.attrs.content);
    }
  }]);

  return Title;
}();

// Exports:


exports.Title = Title;
},{"mithril":"../../node_modules/mithril/mithril.js"}],"../js/components/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _contact = require('./contact');

Object.defineProperty(exports, 'Contact', {
  enumerable: true,
  get: function () {
    return _contact.Contact;
  }
});

var _footer = require('./footer');

Object.defineProperty(exports, 'Footer', {
  enumerable: true,
  get: function () {
    return _footer.Footer;
  }
});

var _home = require('./home');

Object.defineProperty(exports, 'Home', {
  enumerable: true,
  get: function () {
    return _home.Home;
  }
});

var _investment = require('./investment');

Object.defineProperty(exports, 'Investment', {
  enumerable: true,
  get: function () {
    return _investment.Investment;
  }
});

var _investments = require('./investments');

Object.defineProperty(exports, 'Investments', {
  enumerable: true,
  get: function () {
    return _investments.Investments;
  }
});

var _journal = require('./journal');

Object.defineProperty(exports, 'Journal', {
  enumerable: true,
  get: function () {
    return _journal.Journal;
  }
});

var _journalEntry = require('./journal-entry');

Object.defineProperty(exports, 'JournalEntry', {
  enumerable: true,
  get: function () {
    return _journalEntry.JournalEntry;
  }
});

var _journalEntrySummary = require('./journal-entry-summary');

Object.defineProperty(exports, 'JournalEntrySummary', {
  enumerable: true,
  get: function () {
    return _journalEntrySummary.JournalEntrySummary;
  }
});

var _line = require('./line');

Object.defineProperty(exports, 'Line', {
  enumerable: true,
  get: function () {
    return _line.Line;
  }
});

var _link = require('./link');

Object.defineProperty(exports, 'Link', {
  enumerable: true,
  get: function () {
    return _link.Link;
  }
});

var _menu = require('./menu');

Object.defineProperty(exports, 'Menu', {
  enumerable: true,
  get: function () {
    return _menu.Menu;
  }
});

var _overlay = require('./overlay');

Object.defineProperty(exports, 'Overlay', {
  enumerable: true,
  get: function () {
    return _overlay.Overlay;
  }
});

var _paragraph = require('./paragraph');

Object.defineProperty(exports, 'Paragraph', {
  enumerable: true,
  get: function () {
    return _paragraph.Paragraph;
  }
});

var _signature = require('./signature');

Object.defineProperty(exports, 'Signature', {
  enumerable: true,
  get: function () {
    return _signature.Signature;
  }
});

var _software = require('./software');

Object.defineProperty(exports, 'Software', {
  enumerable: true,
  get: function () {
    return _software.Software;
  }
});

var _softwareConsulting = require('./software-consulting');

Object.defineProperty(exports, 'SoftwareConsulting', {
  enumerable: true,
  get: function () {
    return _softwareConsulting.SoftwareConsulting;
  }
});

var _softwareContentEditor = require('./software-content-editor');

Object.defineProperty(exports, 'SoftwareContentEditor', {
  enumerable: true,
  get: function () {
    return _softwareContentEditor.SoftwareContentEditor;
  }
});

var _softwareDataPlatform = require('./software-data-platform');

Object.defineProperty(exports, 'SoftwareDataPlatform', {
  enumerable: true,
  get: function () {
    return _softwareDataPlatform.SoftwareDataPlatform;
  }
});

var _softwareProduct = require('./software-product');

Object.defineProperty(exports, 'SoftwareProduct', {
  enumerable: true,
  get: function () {
    return _softwareProduct.SoftwareProduct;
  }
});

var _softwareStorageEngine = require('./software-storage-engine');

Object.defineProperty(exports, 'SoftwareStorageEngine', {
  enumerable: true,
  get: function () {
    return _softwareStorageEngine.SoftwareStorageEngine;
  }
});

var _subtitle = require('./subtitle');

Object.defineProperty(exports, 'Subtitle', {
  enumerable: true,
  get: function () {
    return _subtitle.Subtitle;
  }
});

var _title = require('./title');

Object.defineProperty(exports, 'Title', {
  enumerable: true,
  get: function () {
    return _title.Title;
  }
});
},{"./contact":"../js/components/contact.js","./footer":"../js/components/footer.js","./home":"../js/components/home.js","./investment":"../js/components/investment.js","./investments":"../js/components/investments.js","./journal":"../js/components/journal.js","./journal-entry":"../js/components/journal-entry.js","./journal-entry-summary":"../js/components/journal-entry-summary.js","./line":"../js/components/line.js","./link":"../js/components/link.js","./menu":"../js/components/menu.js","./overlay":"../js/components/overlay.js","./paragraph":"../js/components/paragraph.js","./signature":"../js/components/signature.js","./software":"../js/components/software.js","./software-consulting":"../js/components/software-consulting.js","./software-content-editor":"../js/components/software-content-editor.js","./software-data-platform":"../js/components/software-data-platform.js","./software-product":"../js/components/software-product.js","./software-storage-engine":"../js/components/software-storage-engine.js","./subtitle":"../js/components/subtitle.js","./title":"../js/components/title.js"}],"../js/index.js":[function(require,module,exports) {
'use strict';

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _components = require('./components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prefix:
// Imports:
_mithril2.default.route.prefix('');

// Routes:
_mithril2.default.route(document.body, '/', {
  '/': _components.Home,
  '/contact': _components.Contact,
  '/investments': _components.Investments,
  '/journal': _components.Journal,
  '/journal/:slug': _components.JournalEntry,
  '/software': _components.Software,
  '/software/consulting': _components.SoftwareConsulting,
  '/software/content-editor': _components.SoftwareContentEditor,
  '/software/data-platform': _components.SoftwareDataPlatform,
  '/software/storage-engine': _components.SoftwareStorageEngine
});
},{"mithril":"../../node_modules/mithril/mithril.js","./components":"../js/components/index.js"}]},{},["../js/index.js"], null)
//# sourceMappingURL=/js.a3047206.map