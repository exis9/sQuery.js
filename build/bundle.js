
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
	'use strict';

	/*eslint-disable*/

	if ( typeof _JQ === 'undefined' )
	{
		class _JQ {
			constructor(){this.ac=[];this.wa=[];}
			isW(v){
				const wStr = Object.prototype.toString.call(window);
				function isWindow(arg){
					let str,self,hasSelf;
					str = Object.prototype.toString.call(arg);
					switch (wStr){case '[object DOMWindow]':case '[object Window]':case '[object global]': return str === wStr}
					if ('self' in arg)
					{
						hasSelf = arg.hasOwnProperty('self');
						try {
							if (hasSelf)
								self = arg.self;
							
							delete arg.self;
							if (hasSelf)
								arg.self = self;
						}catch (e){return true}
					}
					return false
				}
				return isWindow(v)
			}
			remove(el){if (el) el.remove();}
			before( el, h ){if (el) el.insertAdjacentHTML('beforebegin', h);}
			after( el, h ){if (el) el.insertAdjacentHTML('afterend', h);}
			prepend( el, h ){if (el) el.insertAdjacentHTML('afterbegin', h);}
			append( el, h ){if (el) el.insertAdjacentHTML('beforeend', h);}
			prop(el, p, v){if (el) el.style.setProperty(p,v);}
			addClass(el, n){if (el) el.classList.add(n);}
			removeClass(el, n){if (el) el.classList.remove(n);}
			toggleClass(el, n){if (el) el.classList.toggle(n);}
			show( el, d='block' ){
				if (!el) return
				if (d === 'none') d = 'block';
				el.style.visibility = 'visible';
				el.style.display = d;
				el.style.opacity = 1;
			}
			hide( el ){
				if (!el) return
				el.style.visibility = 'hidden';
				el.style.display = 'none';
				el.style.opacity = 0;
			}
			animate( el, kf, op, sp, cb, cb2 ){
				if (!el) return
				if ( typeof op === 'number' )
					cb2 = cb, cb = sp, sp = op, op = null;
				if ( sp === undefined )
					sp = 500;
				if (!op) op = {};
				if (!op.duration) op.duration = sp;
				//if (!op.fill) op.fill = 'both'
				el.animate( kf, op ).onfinish = ()=>{
					if ( cb ) cb.bind( el )();
					if ( cb2 ) cb2.bind( el )();
				};
			}
			isVisible(el){
				if (!(el instanceof Element)) return false
				const style = getComputedStyle(el);
				if (style.display === 'none') return false
				if (style.visibility !== 'visible') return false
				if (style.opacity < 0.1) return false
				if (el.offsetWidth + el.offsetHeight + el.getBoundingClientRect().height + el.getBoundingClientRect().width === 0)
					return false

				const elemCenter = {
					x: el.getBoundingClientRect().left + el.offsetWidth/2,
					y: el.getBoundingClientRect().top + el.offsetHeight/2
				};
				if (elemCenter.x < 0) return false
				if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false
				if (elemCenter.y < 0) return false
				if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false
				let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
				do {
					if (pointContainer === el) return true
				} while (pointContainer = pointContainer.parentNode)
				return false
			}
			fadeIn( el, ms, cb, d='inline-block' ){
				let o = parseFloat(el.style.opacity);
				if ( isNaN(o) )
					this.isVisible(el) ? o=1 : o=0;

				this.animate( el, [{'opacity': o}, {'opacity': 1}], {
					easing: 'ease-in'
				}, ms, ()=>{
					el.style.opacity = 1;
				}, cb);
				this.show(el, d);
			}
			fadeOut( el, ms, cb ){
				let o = parseFloat(el.style.opacity);
				if ( isNaN(o) )
					o = 1;

				this.animate( el, [{'opacity': o}, {'opacity': 0}], {
					easing: 'ease-out'
				}, ms, ()=>{
					this.hide(el);
				}, cb);
			}
			each(el, f, i){return f.apply(el, [i])}
		}

		class _SF {
			constructor(){
				this.b = 0;
				this.el = [];
				this.disp = [];
				this.fOb = {};
				this.v = undefined;
			}
			_setEl(el){
				this.el = [];
				if ( el ){
					this.v = el?.value;
					let n = el.length;
					if ( n || el instanceof NodeList )
						this.el = Array.from(el);
					else if ( n !== 0 )
						this.el = [el];
					else if (_jq.isW(el))
						this.el = el;
				}
				this.length = this.el.length;
				if ( !this.b )
					this.b = 1;
				
				this._saveDisp();
			}
			_th(){return this}
			_saveDisp(){
				this.disp = [];
				let cnt = 0;
				if ( _jq.isW(this.el) )
					return
				this.el?.forEach(el => {
					this.disp[cnt] = 'none';
					if ( el ){
						let d = 'block';
						if ( !_jq.isW(el) && el !== document )
							d = window.getComputedStyle(el).display;

						if ( d && d !== 'none' )
							this.disp[cnt] = d;
					}
					cnt++;
				});
			}
			setEl(el){ this._setEl(el); return this}
			doc(){ return this.setEl( document ) }
			win(){ return this.setEl( window ) }
			ob(el){ return this.setEl( el ) } //this or other elements

			q(s){ return this.setEl( document.querySelector(s) ) }
			qa(s){ return this.setEl( document.querySelectorAll(s) ) }
			id(s){ return this.setEl( document.getElementById(s) ) }
			cl(s){ return this.setEl( document.getElementsByClassName(s) ) }
			tg(s){ return this.setEl( document.getElementsByTagName(s) ) }

			get(i=null){if ( i!==null ) return this.el[i]; return this.el}
			_wh(n,v){
				if (_jq.isW(this.el))
				{
					if (n == 'width')return window.innerWidth
					return window.innerHeight
				}
				if ( v !== undefined )
				{
					this.el?.forEach(el => {
						if (typeof v === 'function') v = v();
						if (typeof v === 'string') el.style[n] = v;
						else el.style[n] = v + 'px';
					});
					return this
				}
				return parseFloat(getComputedStyle(this.el[0], null)[n].replace('px', ''))
			}
			width(v){return this._wh('width',v)}
			height(v){return this._wh('height',v)}
			innerWidth(){return this.el[0].clientWidth}
			innerHeight(){return this.el[0].clientHeight}
			outerWidth(){return this.el[0].offsetWidth}
			outerHeight(){return this.el[0].offsetHeight}
			offset(){return this.el[0].getBoundingClientRect()}
			pos(){return {left: this.el[0].offsetLeft, top: this.el[0].offsetTop}}
			position(){return this.pos()}
			_fd( fn, ...args ){
				let i=0;
				this.el?.forEach(el => {_jq[fn]( el, ...args, this.disp[ i++ ] );});
				return this
			}
			show(){return this._fd('show')}
			fadeIn( ms=500, cb ){return this._fd('fadeIn', ms, cb)}
			isVisible(){return _jq.isVisible(this.el)}
			_vs(n,v){
				if( !this.el || !this.el[0] ) return undefined;
				if (v !== undefined){this.el?.forEach(el=>el[n] = v);return this}
				return this.el[0][n]
			}
			prop(p, v){return this._vs(p,v)}
			scrollTop(v){return this._vs('scrollTop',v)}
			scrollLeft(v){return this._vs('scrollLeft',v)}
			scroll(y,b){
				if (b) b = 'instant';
				else b = 'smooth';
				if (_jq.isW(this.el)) return window.scroll({top: y, behavior: b})
				else this.el?.forEach(el=>el.scroll({top: y, behavior: b}));
				return this
			}
			scrollToElement(o=50,b){
				if( !this.el || !this.el[0] ) return this;
				if (b) b = 'instant';
				else b = 'smooth';
				const br = document.body.getBoundingClientRect().top,
				er = this.el[0].getBoundingClientRect().top, ep = er - br;
				window.scrollTo({top: ep - o,behavior: b});
				return this
			}
			animate( kf, op, sp, cb ){
				let f=()=>{this.css(kf[1]);};
				if ( typeof op === 'number' )cb = f;
				this.el?.forEach(el => {_jq.animate( el, kf, op, sp, cb, f);});
				return this
			}

			each( f ){
				let i = 0;
				this.el?.every(el => {
					if ( _jq.each( el, f, i++ ) === false )
						return false
					return true
				});
				return this
			}
			attr(a, v){
				if( !this.el || !this.el[0] ) return undefined;
				if ( v === undefined )
					return this.el[0].getAttribute(a)

				this.el.forEach(el => el.setAttribute(a,v));
				return this
			}
			prop(p, v){
				if( !this.el || !this.el[0] ) return undefined;
				if ( v === undefined )
					return this.el[0][p]

				this.el.forEach(el => el[p]=v);
				return this
			}
			removeAttr(a){this.el.forEach(el => el.removeAttribute(a));return this}
			removeProp(p){return this.removeAttr(p)}
			_fv( n, v ){
				let r = this.el && this.el[0];
				if ( v !== null )
				{
					if( !r ) return this
					this.el.forEach(el=>el[n] = v);
					return this
				}
				if( !r ) return undefined
				return this.el[0][n]
			}
			html(v=null){
				if (typeof v === 'object' && !Array.isArray(v) && v !== null)
				{
					this._fv('innerHTML','').get(0).append(v);
					return this
				}
				return this._fv( 'innerHTML', v )
			}
			text(v=null){return this._fv( 'innerText', v )}
			val(v=null){
				if ( v===null && typeof this.v !== 'undefined' )
					return this.v
				return this._fv( 'value', v )
			}
			css(c, v=null){
				if( !this.el || !this.el[0] ) return undefined;
				if ( c )
				{
					let set = (c, v)=>{
						c = c.replace(/-([a-z])/g, function(g){ return g[1].toUpperCase(); }); //dash to camel case
						if ( v !== null ){
							this.el.forEach(el=>el.style[c] = v);
							return this
						}
						return this.el[0].style[c]
					};
					if ( typeof c === 'object' )//object
					{
						Object.keys( c ).forEach(k =>set(k, c[k]));
						return this
					}
					return set(c, v)
				}
				return this.el[0].style
			}
			eq(i){
				if (i<0)i = this.el.length+i;
				if ( this.el && this.el[i] )
					return sq(this.el[i])._th()
				return sq(0)._th()
			}
			not(s){
				if ( this.el )
				{
					let a=[];
					this.el.forEach(el=>{if ( !el.matches(s) )a.push(el);});
					return sq(a)._th()
				}
				return this
			}

			filter(f){
				if( this.el )
				{
					let a = [];
					if ( typeof f === 'function')
						this.el.forEach(el => {if ( Array.prototype.filter.call( el, f ) )a.push(el);});
					else
						this.el.forEach(el => {if ( el.matches(f) )a.push(el);});
					return sq(a)._th()
				}
				return this
			}
			is(s){
				let r=false;
				this.el?.forEach(el=>{if ( el.matches(s) )r=true;});
				return r
			}
			find(s){
				if ( this.el )
				{
					let a = [];
					this.el.forEach(el=>{
						let q = el.querySelectorAll(s);
						if ( q.length )
							a = a.concat( Array.from(q) );
					});
					return sq(a)._th()
				}
				return this
			}
			has(s){
				if ( this.el )
				{
					let a = [];
					this.el.forEach(el=>{if (el.querySelector(s))a.push( el );});
					return sq(a)._th()
				}
				return this
			}
			contains(t,b){
				if ( this.el )
				{
					let a = [];
					this.el.forEach(el=>{
						if ( (b && el?.innerHTML.includes(t)) || (!b && el?.innerText.includes(t)) )
							a.push( el );
					});
					return sq(a)._th()
				}
				return this
			}
			first(){if ( this.el )return sq(this.el[0])._th();return this}
			last(){if ( this.el )return sq(this.el[this.el.length-1])._th();return this}
			index(){
				if (!this.el) return -1
				let i = 0;
				while (this.el[0] = this.el[0].previousElementSibling)
					i++;
				return i
			}
			slice(s,e){
				let a = [];
				if ( this.el ){
					let n = this.el.length;
					if (!e)e = n;
					if (s < 0)s = n+s;
					if (e < 0)e = n+e;
					for ( let i=s; i < e; i++ )
						a.push(this.el[i]);
				}
				return sq(a)._th()
			}
			parent(){
				if ( this.el )
				{
					let a = [];
					this.el.forEach(el=>{
						if ( el?.parentNode)
							a.push( el.parentNode );
					});
					return sq(a)._th()
				}
				return this
			}
			parents(){
				if ( this.el )
				{
					let a = [];
					this.el.forEach(el=>{
						let p = el.parentNode;
						while (p !== document ){
							let o = p;
							a.push(o);
							p = o?.parentNode;
						}
					});
					a = [...new Set(a)];
					return sq(a)._th()
				}
				return this
			}
			closest(s){
				if ( this.el )
				{
					let a = [];
					this.el.forEach(el=>{
						let c = el.closest(s);
						if ( c )
							a.push(c);
					});
					a = [...new Set(a)];
					return sq(a)._th()
				}
				return this
			}
			children(){
				if ( this.el )
				{
					let a = [];
					this.el.forEach(el=>{if ( el.children?.length )a = a.concat( Array.from(el.children) );});
					return sq(a)._th()
				}
				return this
			}
			prev(){
				if ( this.el )
				{
					let a = [];
					this.el.forEach(el=>{if ( el.previousElementSibling )a.push( el.previousElementSibling );});
					return sq(a)._th()
				}
				return this
			}
			next(){
				if ( this.el )
				{
					let a = [];
					this.el.forEach(el=>{
						if ( el.nextElementSibling )
							a.push( el.nextElementSibling );
					});
					return sq(a)._th()
				}
				return this
			}
			siblings(){
				if ( this.el )
				{
					let a = [];
					this.el.forEach(el=>{
						if ( el.parentNode )
						{
							let s = el.parentNode.firstChild;
							while(s){
								if (s.nodeType === 1 && s !== el)
									a.push(s);
								s = s.nextSibling;
							}
						}
					});
					return sq(a)._th()
				}
				return this
			}


			_setAC(ev,f){
				let i = _jq.ac.length;
				_jq.ac[i] = {'ev':ev, 'f':f};
				return i
			}
			_setSQA(el,ev,i){
				if (!el.getAttribute)return
				let v = el.getAttribute('sq-'+ev);
				if (!v)v = '';
				v += ',' + i;
				el.setAttribute('sq-'+ev, v);
			}
			_setSQW(ev,i){
				let v = _jq.wa[ev];
				if (!v)v = '';
				v += ',' + i;
				_jq.wa[ev]=v;
			}
			onf(ev, s, f){
				this.el?.forEach(el=>{
					let u = (e)=>{
						let tg = e.target;
						while (tg) {
							if (tg.matches(s)){
								if ( f.bind( /*e.target*/el.querySelectorAll(s) )(e) === false )
								{
									e.preventDefault();
									e.stopImmediatePropagation();
									return
								}
							}
							tg = tg.parentElement;
						}
					};
					let i = this._setAC( ev, u );
					el.querySelectorAll(s)?.forEach(q=>this._setSQA(q,ev,i));
					el.addEventListener( ev, u );
				});
				return this
			}
			on(ev, f){
				let u=(e)=>{
					//console.log('u: ', e.path, e.target)
					if ( f.bind( e.currentTarget/*this.e.target or this.el*/ )(e) === false )
					{
						e.preventDefault();
						e.stopImmediatePropagation();
					}
				};
				let i = this._setAC(ev,u);
				if (_jq.isW(this.el))
					this._setSQW(ev,i), window.addEventListener(ev,u);
				else
					this.el?.forEach(el=>{this._setSQA(el,ev,i);el.addEventListener(ev,u);});
				return this
			}
			off(ev){
				if (_jq.isW(this.el)){
					let v = _jq.wa[ev], a = v?.split(',');
					a?.forEach(t=>{
						if ( _jq.ac[t]?.f )
							window.removeEventListener( ev, _jq.ac[t].f );
					});
				} else
					this.el?.forEach(el=>{
						let v = el.getAttribute('sq-'+ev), a = v?.split(',');
						a?.forEach(t=>{
							if ( _jq.ac[t]?.f )
							{
								el.removeEventListener( ev, _jq.ac[t].f );
								document.removeEventListener( ev, _jq.ac[t].f );
							}
						});
					});
				return this
			}
			trg(ev,b=1,c=0){this.el?.forEach(el=>{let v = new Event(ev, {bubbles:b,composed:c});el.dispatchEvent(v);});return this}
			trigger(ev,b=1,c=0){this.trg(ev,b,c);}

			_f( funcName, ...args ){this.el?.forEach(el => {_jq[funcName]( el, ...args );});return this}
			remove(){return this._f('remove')}
			before( h ){return this._f('before', h)}
			after( h ){return this._f('after', h)}
			prepend( h ){return this._f('prepend', h)}
			append( h ){return this._f('append', h)}
			replaceWith( h ){this.el?.forEach(el=>el.outerHTML = h); return this}
			addClass( n ){return this._f('addClass', n)}
			hasClass( n ){return this.el[0]?.classList.contains(n)?true:false}
			removeClass( n ){return this._f('removeClass', n)}
			toggleClass( n ){return this._f('toggleClass', n)}


			_fsd( funcName, ...args ){
				if( !this.el ) return this
				this._saveDisp();
				this.el.forEach(el => {_jq[funcName]( el, ...args );});
				return this
			}
			fadeOut( ms=500, cb ){return this._fsd('fadeOut', ms, cb)}
			hide(){return this._fsd('hide')}
			isPageLoaded(){let s=document.readyState;if(s==='complete'||s==='loaded')return true;return false}
		}

		let _jq = new _JQ();
		var sq = function(s, t){
			let _q = new _SF(), c = typeof s;
			if ( c !== 'string' )
			{
				if ( c === 'function')
				{
					document.addEventListener('DOMContentLoaded',(e)=>s(e));
					return
				}
				switch ( s ){
					case document: return _q.doc(s)
					case window: return _q.win(s)
					default: return _q.ob(s)
				}
			}
			switch (t){
				case 'id': return _q.id(s.replace('#',''))
				case 'class': case 'cl': return _q.cl(s.replace('.',''))
				case 'tag': case 'tg': return _q.tg(s)
				case 'q': return _q.q(s)
				default: return _q.qa(s)
			}
		}, sQuery = sq;
	}

	function noop() { }
	function assign(tar, src) {
	    // @ts-ignore
	    for (const k in src)
	        tar[k] = src[k];
	    return tar;
	}
	function add_location(element, file, line, column, char) {
	    element.__svelte_meta = {
	        loc: { file, line, column, char }
	    };
	}
	function run(fn) {
	    return fn();
	}
	function blank_object() {
	    return Object.create(null);
	}
	function run_all(fns) {
	    fns.forEach(run);
	}
	function is_function(thing) {
	    return typeof thing === 'function';
	}
	function safe_not_equal(a, b) {
	    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}
	let src_url_equal_anchor;
	function src_url_equal(element_src, url) {
	    if (!src_url_equal_anchor) {
	        src_url_equal_anchor = document.createElement('a');
	    }
	    src_url_equal_anchor.href = url;
	    return element_src === src_url_equal_anchor.href;
	}
	function is_empty(obj) {
	    return Object.keys(obj).length === 0;
	}
	function subscribe(store, ...callbacks) {
	    if (store == null) {
	        return noop;
	    }
	    const unsub = store.subscribe(...callbacks);
	    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
	}
	function create_slot(definition, ctx, $$scope, fn) {
	    if (definition) {
	        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
	        return definition[0](slot_ctx);
	    }
	}
	function get_slot_context(definition, ctx, $$scope, fn) {
	    return definition[1] && fn
	        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
	        : $$scope.ctx;
	}
	function get_slot_changes(definition, $$scope, dirty, fn) {
	    if (definition[2] && fn) {
	        const lets = definition[2](fn(dirty));
	        if ($$scope.dirty === undefined) {
	            return lets;
	        }
	        if (typeof lets === 'object') {
	            const merged = [];
	            const len = Math.max($$scope.dirty.length, lets.length);
	            for (let i = 0; i < len; i += 1) {
	                merged[i] = $$scope.dirty[i] | lets[i];
	            }
	            return merged;
	        }
	        return $$scope.dirty | lets;
	    }
	    return $$scope.dirty;
	}
	function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
	    if (slot_changes) {
	        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
	        slot.p(slot_context, slot_changes);
	    }
	}
	function get_all_dirty_from_scope($$scope) {
	    if ($$scope.ctx.length > 32) {
	        const dirty = [];
	        const length = $$scope.ctx.length / 32;
	        for (let i = 0; i < length; i++) {
	            dirty[i] = -1;
	        }
	        return dirty;
	    }
	    return -1;
	}
	function append(target, node) {
	    target.appendChild(node);
	}
	function insert(target, node, anchor) {
	    target.insertBefore(node, anchor || null);
	}
	function detach(node) {
	    node.parentNode.removeChild(node);
	}
	function element(name) {
	    return document.createElement(name);
	}
	function text(data) {
	    return document.createTextNode(data);
	}
	function space() {
	    return text(' ');
	}
	function empty() {
	    return text('');
	}
	function attr(node, attribute, value) {
	    if (value == null)
	        node.removeAttribute(attribute);
	    else if (node.getAttribute(attribute) !== value)
	        node.setAttribute(attribute, value);
	}
	function children(element) {
	    return Array.from(element.childNodes);
	}
	function set_style(node, key, value, important) {
	    node.style.setProperty(key, value, important ? 'important' : '');
	}
	function custom_event(type, detail, bubbles = false) {
	    const e = document.createEvent('CustomEvent');
	    e.initCustomEvent(type, bubbles, false, detail);
	    return e;
	}

	let current_component;
	function set_current_component(component) {
	    current_component = component;
	}
	function get_current_component() {
	    if (!current_component)
	        throw new Error('Function called outside component initialization');
	    return current_component;
	}
	function afterUpdate(fn) {
	    get_current_component().$$.after_update.push(fn);
	}
	function onDestroy(fn) {
	    get_current_component().$$.on_destroy.push(fn);
	}
	function createEventDispatcher() {
	    const component = get_current_component();
	    return (type, detail) => {
	        const callbacks = component.$$.callbacks[type];
	        if (callbacks) {
	            // TODO are there situations where events could be dispatched
	            // in a server (non-DOM) environment?
	            const event = custom_event(type, detail);
	            callbacks.slice().forEach(fn => {
	                fn.call(component, event);
	            });
	        }
	    };
	}
	// TODO figure out if we still want to support
	// shorthand events, or if we want to implement
	// a real bubbling mechanism
	function bubble(component, event) {
	    const callbacks = component.$$.callbacks[event.type];
	    if (callbacks) {
	        // @ts-ignore
	        callbacks.slice().forEach(fn => fn.call(this, event));
	    }
	}

	const dirty_components = [];
	const binding_callbacks = [];
	const render_callbacks = [];
	const flush_callbacks = [];
	const resolved_promise = Promise.resolve();
	let update_scheduled = false;
	function schedule_update() {
	    if (!update_scheduled) {
	        update_scheduled = true;
	        resolved_promise.then(flush);
	    }
	}
	function tick() {
	    schedule_update();
	    return resolved_promise;
	}
	function add_render_callback(fn) {
	    render_callbacks.push(fn);
	}
	let flushing = false;
	const seen_callbacks = new Set();
	function flush() {
	    if (flushing)
	        return;
	    flushing = true;
	    do {
	        // first, call beforeUpdate functions
	        // and update components
	        for (let i = 0; i < dirty_components.length; i += 1) {
	            const component = dirty_components[i];
	            set_current_component(component);
	            update$1(component.$$);
	        }
	        set_current_component(null);
	        dirty_components.length = 0;
	        while (binding_callbacks.length)
	            binding_callbacks.pop()();
	        // then, once components are updated, call
	        // afterUpdate functions. This may cause
	        // subsequent updates...
	        for (let i = 0; i < render_callbacks.length; i += 1) {
	            const callback = render_callbacks[i];
	            if (!seen_callbacks.has(callback)) {
	                // ...so guard against infinite loops
	                seen_callbacks.add(callback);
	                callback();
	            }
	        }
	        render_callbacks.length = 0;
	    } while (dirty_components.length);
	    while (flush_callbacks.length) {
	        flush_callbacks.pop()();
	    }
	    update_scheduled = false;
	    flushing = false;
	    seen_callbacks.clear();
	}
	function update$1($$) {
	    if ($$.fragment !== null) {
	        $$.update();
	        run_all($$.before_update);
	        const dirty = $$.dirty;
	        $$.dirty = [-1];
	        $$.fragment && $$.fragment.p($$.ctx, dirty);
	        $$.after_update.forEach(add_render_callback);
	    }
	}
	const outroing = new Set();
	let outros;
	function group_outros() {
	    outros = {
	        r: 0,
	        c: [],
	        p: outros // parent group
	    };
	}
	function check_outros() {
	    if (!outros.r) {
	        run_all(outros.c);
	    }
	    outros = outros.p;
	}
	function transition_in(block, local) {
	    if (block && block.i) {
	        outroing.delete(block);
	        block.i(local);
	    }
	}
	function transition_out(block, local, detach, callback) {
	    if (block && block.o) {
	        if (outroing.has(block))
	            return;
	        outroing.add(block);
	        outros.c.push(() => {
	            outroing.delete(block);
	            if (callback) {
	                if (detach)
	                    block.d(1);
	                callback();
	            }
	        });
	        block.o(local);
	    }
	}

	const globals = (typeof window !== 'undefined'
	    ? window
	    : typeof globalThis !== 'undefined'
	        ? globalThis
	        : global);

	function get_spread_update(levels, updates) {
	    const update = {};
	    const to_null_out = {};
	    const accounted_for = { $$scope: 1 };
	    let i = levels.length;
	    while (i--) {
	        const o = levels[i];
	        const n = updates[i];
	        if (n) {
	            for (const key in o) {
	                if (!(key in n))
	                    to_null_out[key] = 1;
	            }
	            for (const key in n) {
	                if (!accounted_for[key]) {
	                    update[key] = n[key];
	                    accounted_for[key] = 1;
	                }
	            }
	            levels[i] = n;
	        }
	        else {
	            for (const key in o) {
	                accounted_for[key] = 1;
	            }
	        }
	    }
	    for (const key in to_null_out) {
	        if (!(key in update))
	            update[key] = undefined;
	    }
	    return update;
	}
	function get_spread_object(spread_props) {
	    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
	}
	function create_component(block) {
	    block && block.c();
	}
	function mount_component(component, target, anchor, customElement) {
	    const { fragment, on_mount, on_destroy, after_update } = component.$$;
	    fragment && fragment.m(target, anchor);
	    if (!customElement) {
	        // onMount happens before the initial afterUpdate
	        add_render_callback(() => {
	            const new_on_destroy = on_mount.map(run).filter(is_function);
	            if (on_destroy) {
	                on_destroy.push(...new_on_destroy);
	            }
	            else {
	                // Edge case - component was destroyed immediately,
	                // most likely as a result of a binding initialising
	                run_all(new_on_destroy);
	            }
	            component.$$.on_mount = [];
	        });
	    }
	    after_update.forEach(add_render_callback);
	}
	function destroy_component(component, detaching) {
	    const $$ = component.$$;
	    if ($$.fragment !== null) {
	        run_all($$.on_destroy);
	        $$.fragment && $$.fragment.d(detaching);
	        // TODO null out other refs, including component.$$ (but need to
	        // preserve final state?)
	        $$.on_destroy = $$.fragment = null;
	        $$.ctx = [];
	    }
	}
	function make_dirty(component, i) {
	    if (component.$$.dirty[0] === -1) {
	        dirty_components.push(component);
	        schedule_update();
	        component.$$.dirty.fill(0);
	    }
	    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
	}
	function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
	    const parent_component = current_component;
	    set_current_component(component);
	    const $$ = component.$$ = {
	        fragment: null,
	        ctx: null,
	        // state
	        props,
	        update: noop,
	        not_equal,
	        bound: blank_object(),
	        // lifecycle
	        on_mount: [],
	        on_destroy: [],
	        on_disconnect: [],
	        before_update: [],
	        after_update: [],
	        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
	        // everything else
	        callbacks: blank_object(),
	        dirty,
	        skip_bound: false,
	        root: options.target || parent_component.$$.root
	    };
	    append_styles && append_styles($$.root);
	    let ready = false;
	    $$.ctx = instance
	        ? instance(component, options.props || {}, (i, ret, ...rest) => {
	            const value = rest.length ? rest[0] : ret;
	            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
	                if (!$$.skip_bound && $$.bound[i])
	                    $$.bound[i](value);
	                if (ready)
	                    make_dirty(component, i);
	            }
	            return ret;
	        })
	        : [];
	    $$.update();
	    ready = true;
	    run_all($$.before_update);
	    // `false` as a special case of no DOM component
	    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
	    if (options.target) {
	        if (options.hydrate) {
	            const nodes = children(options.target);
	            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	            $$.fragment && $$.fragment.l(nodes);
	            nodes.forEach(detach);
	        }
	        else {
	            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	            $$.fragment && $$.fragment.c();
	        }
	        if (options.intro)
	            transition_in(component.$$.fragment);
	        mount_component(component, options.target, options.anchor, options.customElement);
	        flush();
	    }
	    set_current_component(parent_component);
	}
	/**
	 * Base class for Svelte components. Used when dev=false.
	 */
	class SvelteComponent {
	    $destroy() {
	        destroy_component(this, 1);
	        this.$destroy = noop;
	    }
	    $on(type, callback) {
	        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
	        callbacks.push(callback);
	        return () => {
	            const index = callbacks.indexOf(callback);
	            if (index !== -1)
	                callbacks.splice(index, 1);
	        };
	    }
	    $set($$props) {
	        if (this.$$set && !is_empty($$props)) {
	            this.$$.skip_bound = true;
	            this.$$set($$props);
	            this.$$.skip_bound = false;
	        }
	    }
	}

	function dispatch_dev(type, detail) {
	    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.0' }, detail), true));
	}
	function append_dev(target, node) {
	    dispatch_dev('SvelteDOMInsert', { target, node });
	    append(target, node);
	}
	function insert_dev(target, node, anchor) {
	    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
	    insert(target, node, anchor);
	}
	function detach_dev(node) {
	    dispatch_dev('SvelteDOMRemove', { node });
	    detach(node);
	}
	function attr_dev(node, attribute, value) {
	    attr(node, attribute, value);
	    if (value == null)
	        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
	    else
	        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
	}
	function validate_slots(name, slot, keys) {
	    for (const slot_key of Object.keys(slot)) {
	        if (!~keys.indexOf(slot_key)) {
	            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
	        }
	    }
	}
	/**
	 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
	 */
	class SvelteComponentDev extends SvelteComponent {
	    constructor(options) {
	        if (!options || (!options.target && !options.$$inline)) {
	            throw new Error("'target' is a required option");
	        }
	        super();
	    }
	    $destroy() {
	        super.$destroy();
	        this.$destroy = () => {
	            console.warn('Component was already destroyed'); // eslint-disable-line no-console
	        };
	    }
	    $capture_state() { }
	    $inject_state() { }
	}

	/**
	 * @typedef {Object} WrappedComponent Object returned by the `wrap` method
	 * @property {SvelteComponent} component - Component to load (this is always asynchronous)
	 * @property {RoutePrecondition[]} [conditions] - Route pre-conditions to validate
	 * @property {Object} [props] - Optional dictionary of static props
	 * @property {Object} [userData] - Optional user data dictionary
	 * @property {bool} _sveltesparouter - Internal flag; always set to true
	 */

	/**
	 * @callback AsyncSvelteComponent
	 * @returns {Promise<SvelteComponent>} Returns a Promise that resolves with a Svelte component
	 */

	/**
	 * @callback RoutePrecondition
	 * @param {RouteDetail} detail - Route detail object
	 * @returns {boolean|Promise<boolean>} If the callback returns a false-y value, it's interpreted as the precondition failed, so it aborts loading the component (and won't process other pre-condition callbacks)
	 */

	/**
	 * @typedef {Object} WrapOptions Options object for the call to `wrap`
	 * @property {SvelteComponent} [component] - Svelte component to load (this is incompatible with `asyncComponent`)
	 * @property {AsyncSvelteComponent} [asyncComponent] - Function that returns a Promise that fulfills with a Svelte component (e.g. `{asyncComponent: () => import('Foo.svelte')}`)
	 * @property {SvelteComponent} [loadingComponent] - Svelte component to be displayed while the async route is loading (as a placeholder); when unset or false-y, no component is shown while component
	 * @property {object} [loadingParams] - Optional dictionary passed to the `loadingComponent` component as params (for an exported prop called `params`)
	 * @property {object} [userData] - Optional object that will be passed to events such as `routeLoading`, `routeLoaded`, `conditionsFailed`
	 * @property {object} [props] - Optional key-value dictionary of static props that will be passed to the component. The props are expanded with {...props}, so the key in the dictionary becomes the name of the prop.
	 * @property {RoutePrecondition[]|RoutePrecondition} [conditions] - Route pre-conditions to add, which will be executed in order
	 */

	/**
	 * Wraps a component to enable multiple capabilities:
	 * 1. Using dynamically-imported component, with (e.g. `{asyncComponent: () => import('Foo.svelte')}`), which also allows bundlers to do code-splitting.
	 * 2. Adding route pre-conditions (e.g. `{conditions: [...]}`)
	 * 3. Adding static props that are passed to the component
	 * 4. Adding custom userData, which is passed to route events (e.g. route loaded events) or to route pre-conditions (e.g. `{userData: {foo: 'bar}}`)
	 * 
	 * @param {WrapOptions} args - Arguments object
	 * @returns {WrappedComponent} Wrapped component
	 */
	function wrap$1(args) {
	    if (!args) {
	        throw Error('Parameter args is required')
	    }

	    // We need to have one and only one of component and asyncComponent
	    // This does a "XNOR"
	    if (!args.component == !args.asyncComponent) {
	        throw Error('One and only one of component and asyncComponent is required')
	    }

	    // If the component is not async, wrap it into a function returning a Promise
	    if (args.component) {
	        args.asyncComponent = () => Promise.resolve(args.component);
	    }

	    // Parameter asyncComponent and each item of conditions must be functions
	    if (typeof args.asyncComponent != 'function') {
	        throw Error('Parameter asyncComponent must be a function')
	    }
	    if (args.conditions) {
	        // Ensure it's an array
	        if (!Array.isArray(args.conditions)) {
	            args.conditions = [args.conditions];
	        }
	        for (let i = 0; i < args.conditions.length; i++) {
	            if (!args.conditions[i] || typeof args.conditions[i] != 'function') {
	                throw Error('Invalid parameter conditions[' + i + ']')
	            }
	        }
	    }

	    // Check if we have a placeholder component
	    if (args.loadingComponent) {
	        args.asyncComponent.loading = args.loadingComponent;
	        args.asyncComponent.loadingParams = args.loadingParams || undefined;
	    }

	    // Returns an object that contains all the functions to execute too
	    // The _sveltesparouter flag is to confirm the object was created by this router
	    const obj = {
	        component: args.asyncComponent,
	        userData: args.userData,
	        conditions: (args.conditions && args.conditions.length) ? args.conditions : undefined,
	        props: (args.props && Object.keys(args.props).length) ? args.props : {},
	        _sveltesparouter: true
	    };

	    return obj
	}

	const subscriber_queue = [];
	/**
	 * Creates a `Readable` store that allows reading by subscription.
	 * @param value initial value
	 * @param {StartStopNotifier}start start and stop notifications for subscriptions
	 */
	function readable(value, start) {
	    return {
	        subscribe: writable(value, start).subscribe
	    };
	}
	/**
	 * Create a `Writable` store that allows both updating and reading by subscription.
	 * @param {*=}value initial value
	 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
	 */
	function writable(value, start = noop) {
	    let stop;
	    const subscribers = new Set();
	    function set(new_value) {
	        if (safe_not_equal(value, new_value)) {
	            value = new_value;
	            if (stop) { // store is ready
	                const run_queue = !subscriber_queue.length;
	                for (const subscriber of subscribers) {
	                    subscriber[1]();
	                    subscriber_queue.push(subscriber, value);
	                }
	                if (run_queue) {
	                    for (let i = 0; i < subscriber_queue.length; i += 2) {
	                        subscriber_queue[i][0](subscriber_queue[i + 1]);
	                    }
	                    subscriber_queue.length = 0;
	                }
	            }
	        }
	    }
	    function update(fn) {
	        set(fn(value));
	    }
	    function subscribe(run, invalidate = noop) {
	        const subscriber = [run, invalidate];
	        subscribers.add(subscriber);
	        if (subscribers.size === 1) {
	            stop = start(set) || noop;
	        }
	        run(value);
	        return () => {
	            subscribers.delete(subscriber);
	            if (subscribers.size === 0) {
	                stop();
	                stop = null;
	            }
	        };
	    }
	    return { set, update, subscribe };
	}
	function derived(stores, fn, initial_value) {
	    const single = !Array.isArray(stores);
	    const stores_array = single
	        ? [stores]
	        : stores;
	    const auto = fn.length < 2;
	    return readable(initial_value, (set) => {
	        let inited = false;
	        const values = [];
	        let pending = 0;
	        let cleanup = noop;
	        const sync = () => {
	            if (pending) {
	                return;
	            }
	            cleanup();
	            const result = fn(single ? values[0] : values, set);
	            if (auto) {
	                set(result);
	            }
	            else {
	                cleanup = is_function(result) ? result : noop;
	            }
	        };
	        const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
	            values[i] = value;
	            pending &= ~(1 << i);
	            if (inited) {
	                sync();
	            }
	        }, () => {
	            pending |= (1 << i);
	        }));
	        inited = true;
	        sync();
	        return function stop() {
	            run_all(unsubscribers);
	            cleanup();
	        };
	    });
	}

	function parse(str, loose) {
		if (str instanceof RegExp) return { keys:false, pattern:str };
		var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
		arr[0] || arr.shift();

		while (tmp = arr.shift()) {
			c = tmp[0];
			if (c === '*') {
				keys.push('wild');
				pattern += '/(.*)';
			} else if (c === ':') {
				o = tmp.indexOf('?', 1);
				ext = tmp.indexOf('.', 1);
				keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
				pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
				if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
			} else {
				pattern += '/' + tmp;
			}
		}

		return {
			keys: keys,
			pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
		};
	}

	/* node_modules/svelte-spa-router/Router.svelte generated by Svelte v3.44.0 */

	const { Error: Error_1, Object: Object_1, console: console_1$4 } = globals;

	// (251:0) {:else}
	function create_else_block(ctx) {
		let switch_instance;
		let switch_instance_anchor;
		let current;
		const switch_instance_spread_levels = [/*props*/ ctx[2]];
		var switch_value = /*component*/ ctx[0];

		function switch_props(ctx) {
			let switch_instance_props = {};

			for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
				switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
			}

			return {
				props: switch_instance_props,
				$$inline: true
			};
		}

		if (switch_value) {
			switch_instance = new switch_value(switch_props());
			switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
		}

		const block = {
			c: function create() {
				if (switch_instance) create_component(switch_instance.$$.fragment);
				switch_instance_anchor = empty();
			},
			m: function mount(target, anchor) {
				if (switch_instance) {
					mount_component(switch_instance, target, anchor);
				}

				insert_dev(target, switch_instance_anchor, anchor);
				current = true;
			},
			p: function update(ctx, dirty) {
				const switch_instance_changes = (dirty & /*props*/ 4)
				? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*props*/ ctx[2])])
				: {};

				if (switch_value !== (switch_value = /*component*/ ctx[0])) {
					if (switch_instance) {
						group_outros();
						const old_component = switch_instance;

						transition_out(old_component.$$.fragment, 1, 0, () => {
							destroy_component(old_component, 1);
						});

						check_outros();
					}

					if (switch_value) {
						switch_instance = new switch_value(switch_props());
						switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
						create_component(switch_instance.$$.fragment);
						transition_in(switch_instance.$$.fragment, 1);
						mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
					} else {
						switch_instance = null;
					}
				} else if (switch_value) {
					switch_instance.$set(switch_instance_changes);
				}
			},
			i: function intro(local) {
				if (current) return;
				if (switch_instance) transition_in(switch_instance.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				if (switch_instance) transition_out(switch_instance.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) detach_dev(switch_instance_anchor);
				if (switch_instance) destroy_component(switch_instance, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_else_block.name,
			type: "else",
			source: "(251:0) {:else}",
			ctx
		});

		return block;
	}

	// (244:0) {#if componentParams}
	function create_if_block(ctx) {
		let switch_instance;
		let switch_instance_anchor;
		let current;
		const switch_instance_spread_levels = [{ params: /*componentParams*/ ctx[1] }, /*props*/ ctx[2]];
		var switch_value = /*component*/ ctx[0];

		function switch_props(ctx) {
			let switch_instance_props = {};

			for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
				switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
			}

			return {
				props: switch_instance_props,
				$$inline: true
			};
		}

		if (switch_value) {
			switch_instance = new switch_value(switch_props());
			switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
		}

		const block = {
			c: function create() {
				if (switch_instance) create_component(switch_instance.$$.fragment);
				switch_instance_anchor = empty();
			},
			m: function mount(target, anchor) {
				if (switch_instance) {
					mount_component(switch_instance, target, anchor);
				}

				insert_dev(target, switch_instance_anchor, anchor);
				current = true;
			},
			p: function update(ctx, dirty) {
				const switch_instance_changes = (dirty & /*componentParams, props*/ 6)
				? get_spread_update(switch_instance_spread_levels, [
						dirty & /*componentParams*/ 2 && { params: /*componentParams*/ ctx[1] },
						dirty & /*props*/ 4 && get_spread_object(/*props*/ ctx[2])
					])
				: {};

				if (switch_value !== (switch_value = /*component*/ ctx[0])) {
					if (switch_instance) {
						group_outros();
						const old_component = switch_instance;

						transition_out(old_component.$$.fragment, 1, 0, () => {
							destroy_component(old_component, 1);
						});

						check_outros();
					}

					if (switch_value) {
						switch_instance = new switch_value(switch_props());
						switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
						create_component(switch_instance.$$.fragment);
						transition_in(switch_instance.$$.fragment, 1);
						mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
					} else {
						switch_instance = null;
					}
				} else if (switch_value) {
					switch_instance.$set(switch_instance_changes);
				}
			},
			i: function intro(local) {
				if (current) return;
				if (switch_instance) transition_in(switch_instance.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				if (switch_instance) transition_out(switch_instance.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) detach_dev(switch_instance_anchor);
				if (switch_instance) destroy_component(switch_instance, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block.name,
			type: "if",
			source: "(244:0) {#if componentParams}",
			ctx
		});

		return block;
	}

	function create_fragment$6(ctx) {
		let current_block_type_index;
		let if_block;
		let if_block_anchor;
		let current;
		const if_block_creators = [create_if_block, create_else_block];
		const if_blocks = [];

		function select_block_type(ctx, dirty) {
			if (/*componentParams*/ ctx[1]) return 0;
			return 1;
		}

		current_block_type_index = select_block_type(ctx);
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

		const block = {
			c: function create() {
				if_block.c();
				if_block_anchor = empty();
			},
			l: function claim(nodes) {
				throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				if_blocks[current_block_type_index].m(target, anchor);
				insert_dev(target, if_block_anchor, anchor);
				current = true;
			},
			p: function update(ctx, [dirty]) {
				let previous_block_index = current_block_type_index;
				current_block_type_index = select_block_type(ctx);

				if (current_block_type_index === previous_block_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				} else {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					} else {
						if_block.p(ctx, dirty);
					}

					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			},
			i: function intro(local) {
				if (current) return;
				transition_in(if_block);
				current = true;
			},
			o: function outro(local) {
				transition_out(if_block);
				current = false;
			},
			d: function destroy(detaching) {
				if_blocks[current_block_type_index].d(detaching);
				if (detaching) detach_dev(if_block_anchor);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$6.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function wrap(component, userData, ...conditions) {
		// Use the new wrap method and show a deprecation warning
		// eslint-disable-next-line no-console
		console.warn('Method `wrap` from `svelte-spa-router` is deprecated and will be removed in a future version. Please use `svelte-spa-router/wrap` instead. See http://bit.ly/svelte-spa-router-upgrading');

		return wrap$1({ component, userData, conditions });
	}

	/**
	 * @typedef {Object} Location
	 * @property {string} location - Location (page/view), for example `/book`
	 * @property {string} [querystring] - Querystring from the hash, as a string not parsed
	 */
	/**
	 * Returns the current location from the hash.
	 *
	 * @returns {Location} Location object
	 * @private
	 */
	function getLocation() {
		const hashPosition = window.location.href.indexOf('#/');

		let location = hashPosition > -1
		? window.location.href.substr(hashPosition + 1)
		: '/';

		// Check if there's a querystring
		const qsPosition = location.indexOf('?');

		let querystring = '';

		if (qsPosition > -1) {
			querystring = location.substr(qsPosition + 1);
			location = location.substr(0, qsPosition);
		}

		return { location, querystring };
	}

	const loc = readable(null, // eslint-disable-next-line prefer-arrow-callback
	function start(set) {
		set(getLocation());

		const update = () => {
			set(getLocation());
		};

		window.addEventListener('hashchange', update, false);

		return function stop() {
			window.removeEventListener('hashchange', update, false);
		};
	});

	const location$1 = derived(loc, $loc => $loc.location);
	const querystring = derived(loc, $loc => $loc.querystring);
	const params = writable(undefined);

	async function push(location) {
		if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
			throw Error('Invalid parameter location');
		}

		// Execute this code when the current call stack is complete
		await tick();

		// Note: this will include scroll state in history even when restoreScrollState is false
		history.replaceState(
			{
				...history.state,
				__svelte_spa_router_scrollX: window.scrollX,
				__svelte_spa_router_scrollY: window.scrollY
			},
			undefined,
			undefined
		);

		window.location.hash = (location.charAt(0) == '#' ? '' : '#') + location;
	}

	async function pop() {
		// Execute this code when the current call stack is complete
		await tick();

		window.history.back();
	}

	async function replace(location) {
		if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
			throw Error('Invalid parameter location');
		}

		// Execute this code when the current call stack is complete
		await tick();

		const dest = (location.charAt(0) == '#' ? '' : '#') + location;

		try {
			const newState = { ...history.state };
			delete newState['__svelte_spa_router_scrollX'];
			delete newState['__svelte_spa_router_scrollY'];
			window.history.replaceState(newState, undefined, dest);
		} catch(e) {
			// eslint-disable-next-line no-console
			console.warn('Caught exception while replacing the current page. If you\'re running this in the Svelte REPL, please note that the `replace` method might not work in this environment.');
		}

		// The method above doesn't trigger the hashchange event, so let's do that manually
		window.dispatchEvent(new Event('hashchange'));
	}

	function link(node, opts) {
		opts = linkOpts(opts);

		// Only apply to <a> tags
		if (!node || !node.tagName || node.tagName.toLowerCase() != 'a') {
			throw Error('Action "link" can only be used with <a> tags');
		}

		updateLink(node, opts);

		return {
			update(updated) {
				updated = linkOpts(updated);
				updateLink(node, updated);
			}
		};
	}

	// Internal function used by the link function
	function updateLink(node, opts) {
		let href = opts.href || node.getAttribute('href');

		// Destination must start with '/' or '#/'
		if (href && href.charAt(0) == '/') {
			// Add # to the href attribute
			href = '#' + href;
		} else if (!href || href.length < 2 || href.slice(0, 2) != '#/') {
			throw Error('Invalid value for "href" attribute: ' + href);
		}

		node.setAttribute('href', href);

		node.addEventListener('click', event => {
			// Prevent default anchor onclick behaviour
			event.preventDefault();

			if (!opts.disabled) {
				scrollstateHistoryHandler(event.currentTarget.getAttribute('href'));
			}
		});
	}

	// Internal function that ensures the argument of the link action is always an object
	function linkOpts(val) {
		if (val && typeof val == 'string') {
			return { href: val };
		} else {
			return val || {};
		}
	}

	/**
	 * The handler attached to an anchor tag responsible for updating the
	 * current history state with the current scroll state
	 *
	 * @param {string} href - Destination
	 */
	function scrollstateHistoryHandler(href) {
		// Setting the url (3rd arg) to href will break clicking for reasons, so don't try to do that
		history.replaceState(
			{
				...history.state,
				__svelte_spa_router_scrollX: window.scrollX,
				__svelte_spa_router_scrollY: window.scrollY
			},
			undefined,
			undefined
		);

		// This will force an update as desired, but this time our scroll state will be attached
		window.location.hash = href;
	}

	function instance$6($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Router', slots, []);
		let { routes = {} } = $$props;
		let { prefix = '' } = $$props;
		let { restoreScrollState = false } = $$props;

		/**
	 * Container for a route: path, component
	 */
		class RouteItem {
			/**
	 * Initializes the object and creates a regular expression from the path, using regexparam.
	 *
	 * @param {string} path - Path to the route (must start with '/' or '*')
	 * @param {SvelteComponent|WrappedComponent} component - Svelte component for the route, optionally wrapped
	 */
			constructor(path, component) {
				if (!component || typeof component != 'function' && (typeof component != 'object' || component._sveltesparouter !== true)) {
					throw Error('Invalid component object');
				}

				// Path must be a regular or expression, or a string starting with '/' or '*'
				if (!path || typeof path == 'string' && (path.length < 1 || path.charAt(0) != '/' && path.charAt(0) != '*') || typeof path == 'object' && !(path instanceof RegExp)) {
					throw Error('Invalid value for "path" argument - strings must start with / or *');
				}

				const { pattern, keys } = parse(path);
				this.path = path;

				// Check if the component is wrapped and we have conditions
				if (typeof component == 'object' && component._sveltesparouter === true) {
					this.component = component.component;
					this.conditions = component.conditions || [];
					this.userData = component.userData;
					this.props = component.props || {};
				} else {
					// Convert the component to a function that returns a Promise, to normalize it
					this.component = () => Promise.resolve(component);

					this.conditions = [];
					this.props = {};
				}

				this._pattern = pattern;
				this._keys = keys;
			}

			/**
	 * Checks if `path` matches the current route.
	 * If there's a match, will return the list of parameters from the URL (if any).
	 * In case of no match, the method will return `null`.
	 *
	 * @param {string} path - Path to test
	 * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
	 */
			match(path) {
				// If there's a prefix, check if it matches the start of the path.
				// If not, bail early, else remove it before we run the matching.
				if (prefix) {
					if (typeof prefix == 'string') {
						if (path.startsWith(prefix)) {
							path = path.substr(prefix.length) || '/';
						} else {
							return null;
						}
					} else if (prefix instanceof RegExp) {
						const match = path.match(prefix);

						if (match && match[0]) {
							path = path.substr(match[0].length) || '/';
						} else {
							return null;
						}
					}
				}

				// Check if the pattern matches
				const matches = this._pattern.exec(path);

				if (matches === null) {
					return null;
				}

				// If the input was a regular expression, this._keys would be false, so return matches as is
				if (this._keys === false) {
					return matches;
				}

				const out = {};
				let i = 0;

				while (i < this._keys.length) {
					// In the match parameters, URL-decode all values
					try {
						out[this._keys[i]] = decodeURIComponent(matches[i + 1] || '') || null;
					} catch(e) {
						out[this._keys[i]] = null;
					}

					i++;
				}

				return out;
			}

			/**
	 * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoading`, `routeLoaded` and `conditionsFailed` events
	 * @typedef {Object} RouteDetail
	 * @property {string|RegExp} route - Route matched as defined in the route definition (could be a string or a reguar expression object)
	 * @property {string} location - Location path
	 * @property {string} querystring - Querystring from the hash
	 * @property {object} [userData] - Custom data passed by the user
	 * @property {SvelteComponent} [component] - Svelte component (only in `routeLoaded` events)
	 * @property {string} [name] - Name of the Svelte component (only in `routeLoaded` events)
	 */
			/**
	 * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
	 * 
	 * @param {RouteDetail} detail - Route detail
	 * @returns {boolean} Returns true if all the conditions succeeded
	 */
			async checkConditions(detail) {
				for (let i = 0; i < this.conditions.length; i++) {
					if (!await this.conditions[i](detail)) {
						return false;
					}
				}

				return true;
			}
		}

		// Set up all routes
		const routesList = [];

		if (routes instanceof Map) {
			// If it's a map, iterate on it right away
			routes.forEach((route, path) => {
				routesList.push(new RouteItem(path, route));
			});
		} else {
			// We have an object, so iterate on its own properties
			Object.keys(routes).forEach(path => {
				routesList.push(new RouteItem(path, routes[path]));
			});
		}

		// Props for the component to render
		let component = null;

		let componentParams = null;
		let props = {};

		// Event dispatcher from Svelte
		const dispatch = createEventDispatcher();

		// Just like dispatch, but executes on the next iteration of the event loop
		async function dispatchNextTick(name, detail) {
			// Execute this code when the current call stack is complete
			await tick();

			dispatch(name, detail);
		}

		// If this is set, then that means we have popped into this var the state of our last scroll position
		let previousScrollState = null;

		let popStateChanged = null;

		if (restoreScrollState) {
			popStateChanged = event => {
				// If this event was from our history.replaceState, event.state will contain
				// our scroll history. Otherwise, event.state will be null (like on forward
				// navigation)
				if (event.state && event.state.__svelte_spa_router_scrollY) {
					previousScrollState = event.state;
				} else {
					previousScrollState = null;
				}
			};

			// This is removed in the destroy() invocation below
			window.addEventListener('popstate', popStateChanged);

			afterUpdate(() => {
				// If this exists, then this is a back navigation: restore the scroll position
				if (previousScrollState) {
					window.scrollTo(previousScrollState.__svelte_spa_router_scrollX, previousScrollState.__svelte_spa_router_scrollY);
				} else {
					// Otherwise this is a forward navigation: scroll to top
					window.scrollTo(0, 0);
				}
			});
		}

		// Always have the latest value of loc
		let lastLoc = null;

		// Current object of the component loaded
		let componentObj = null;

		// Handle hash change events
		// Listen to changes in the $loc store and update the page
		// Do not use the $: syntax because it gets triggered by too many things
		const unsubscribeLoc = loc.subscribe(async newLoc => {
			lastLoc = newLoc;

			// Find a route matching the location
			let i = 0;

			while (i < routesList.length) {
				const match = routesList[i].match(newLoc.location);

				if (!match) {
					i++;
					continue;
				}

				const detail = {
					route: routesList[i].path,
					location: newLoc.location,
					querystring: newLoc.querystring,
					userData: routesList[i].userData,
					params: match && typeof match == 'object' && Object.keys(match).length
					? match
					: null
				};

				// Check if the route can be loaded - if all conditions succeed
				if (!await routesList[i].checkConditions(detail)) {
					// Don't display anything
					$$invalidate(0, component = null);

					componentObj = null;

					// Trigger an event to notify the user, then exit
					dispatchNextTick('conditionsFailed', detail);

					return;
				}

				// Trigger an event to alert that we're loading the route
				// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
				dispatchNextTick('routeLoading', Object.assign({}, detail));

				// If there's a component to show while we're loading the route, display it
				const obj = routesList[i].component;

				// Do not replace the component if we're loading the same one as before, to avoid the route being unmounted and re-mounted
				if (componentObj != obj) {
					if (obj.loading) {
						$$invalidate(0, component = obj.loading);
						componentObj = obj;
						$$invalidate(1, componentParams = obj.loadingParams);
						$$invalidate(2, props = {});

						// Trigger the routeLoaded event for the loading component
						// Create a copy of detail so we don't modify the object for the dynamic route (and the dynamic route doesn't modify our object too)
						dispatchNextTick('routeLoaded', Object.assign({}, detail, {
							component,
							name: component.name,
							params: componentParams
						}));
					} else {
						$$invalidate(0, component = null);
						componentObj = null;
					}

					// Invoke the Promise
					const loaded = await obj();

					// Now that we're here, after the promise resolved, check if we still want this component, as the user might have navigated to another page in the meanwhile
					if (newLoc != lastLoc) {
						// Don't update the component, just exit
						return;
					}

					// If there is a "default" property, which is used by async routes, then pick that
					$$invalidate(0, component = loaded && loaded.default || loaded);

					componentObj = obj;
				}

				// Set componentParams only if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
				// Of course, this assumes that developers always add a "params" prop when they are expecting parameters
				if (match && typeof match == 'object' && Object.keys(match).length) {
					$$invalidate(1, componentParams = match);
				} else {
					$$invalidate(1, componentParams = null);
				}

				// Set static props, if any
				$$invalidate(2, props = routesList[i].props);

				// Dispatch the routeLoaded event then exit
				// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
				dispatchNextTick('routeLoaded', Object.assign({}, detail, {
					component,
					name: component.name,
					params: componentParams
				})).then(() => {
					params.set(componentParams);
				});

				return;
			}

			// If we're still here, there was no match, so show the empty component
			$$invalidate(0, component = null);

			componentObj = null;
			params.set(undefined);
		});

		onDestroy(() => {
			unsubscribeLoc();
			popStateChanged && window.removeEventListener('popstate', popStateChanged);
		});

		const writable_props = ['routes', 'prefix', 'restoreScrollState'];

		Object_1.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$4.warn(`<Router> was created with unknown prop '${key}'`);
		});

		function routeEvent_handler(event) {
			bubble.call(this, $$self, event);
		}

		function routeEvent_handler_1(event) {
			bubble.call(this, $$self, event);
		}

		$$self.$$set = $$props => {
			if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
			if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
			if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
		};

		$$self.$capture_state = () => ({
			readable,
			writable,
			derived,
			tick,
			_wrap: wrap$1,
			wrap,
			getLocation,
			loc,
			location: location$1,
			querystring,
			params,
			push,
			pop,
			replace,
			link,
			updateLink,
			linkOpts,
			scrollstateHistoryHandler,
			onDestroy,
			createEventDispatcher,
			afterUpdate,
			parse,
			routes,
			prefix,
			restoreScrollState,
			RouteItem,
			routesList,
			component,
			componentParams,
			props,
			dispatch,
			dispatchNextTick,
			previousScrollState,
			popStateChanged,
			lastLoc,
			componentObj,
			unsubscribeLoc
		});

		$$self.$inject_state = $$props => {
			if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
			if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
			if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
			if ('component' in $$props) $$invalidate(0, component = $$props.component);
			if ('componentParams' in $$props) $$invalidate(1, componentParams = $$props.componentParams);
			if ('props' in $$props) $$invalidate(2, props = $$props.props);
			if ('previousScrollState' in $$props) previousScrollState = $$props.previousScrollState;
			if ('popStateChanged' in $$props) popStateChanged = $$props.popStateChanged;
			if ('lastLoc' in $$props) lastLoc = $$props.lastLoc;
			if ('componentObj' in $$props) componentObj = $$props.componentObj;
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*restoreScrollState*/ 32) {
				// Update history.scrollRestoration depending on restoreScrollState
				history.scrollRestoration = restoreScrollState ? 'manual' : 'auto';
			}
		};

		return [
			component,
			componentParams,
			props,
			routes,
			prefix,
			restoreScrollState,
			routeEvent_handler,
			routeEvent_handler_1
		];
	}

	class Router extends SvelteComponentDev {
		constructor(options) {
			super(options);

			init(this, options, instance$6, create_fragment$6, safe_not_equal, {
				routes: 3,
				prefix: 4,
				restoreScrollState: 5
			});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Router",
				options,
				id: create_fragment$6.name
			});
		}

		get routes() {
			throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set routes(value) {
			throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get prefix() {
			throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set prefix(value) {
			throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get restoreScrollState() {
			throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set restoreScrollState(value) {
			throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}
	}

	/* src/Core.svelte generated by Svelte v3.44.0 */

	const { console: console_1$3 } = globals;
	const file$4 = "src/Core.svelte";

	function create_fragment$5(ctx) {
		let main;
		let link;
		let t0;
		let section0;
		let span0;
		let t1;
		let div0;
		let a0;
		let t3;
		let section3;
		let section1;
		let div1;
		let a1;
		let t5;
		let section2;
		let div6;
		let div2;
		let t7;
		let div3;
		let a2;
		let t9;
		let div4;
		let a3;
		let t11;
		let div5;
		let a4;
		let t13;
		let div7;
		let t15;
		let div8;
		let a5;
		let t17;
		let div9;
		let a6;
		let t19;
		let div10;
		let a7;
		let t21;
		let div11;
		let a8;
		let t23;
		let div12;
		let a9;
		let t25;
		let div13;
		let span1;
		let t26;
		let section4;
		let t27;
		let br0;
		let br1;
		let current;
		const default_slot_template = /*#slots*/ ctx[1].default;
		const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

		const block = {
			c: function create() {
				main = element("main");
				link = element("link");
				t0 = space();
				section0 = element("section");
				span0 = element("span");
				t1 = space();
				div0 = element("div");
				a0 = element("a");
				a0.textContent = "日本語に翻訳";
				t3 = space();
				section3 = element("section");
				section1 = element("section");
				div1 = element("div");
				a1 = element("a");
				a1.textContent = "sQuery v1.03";
				t5 = space();
				section2 = element("section");
				div6 = element("div");
				div2 = element("div");
				div2.textContent = "Learn";
				t7 = space();
				div3 = element("div");
				a2 = element("a");
				a2.textContent = "documentation";
				t9 = space();
				div4 = element("div");
				a3 = element("a");
				a3.textContent = "examples";
				t11 = space();
				div5 = element("div");
				a4 = element("a");
				a4.textContent = "online editor";
				t13 = space();
				div7 = element("div");
				div7.textContent = "Community";
				t15 = space();
				div8 = element("div");
				a5 = element("a");
				a5.textContent = "About me";
				t17 = space();
				div9 = element("div");
				a6 = element("a");
				a6.textContent = "github";
				t19 = space();
				div10 = element("div");
				a7 = element("a");
				a7.textContent = "twitter";
				t21 = space();
				div11 = element("div");
				a8 = element("a");
				a8.textContent = "questions";
				t23 = space();
				div12 = element("div");
				a9 = element("a");
				a9.textContent = "e-mail";
				t25 = space();
				div13 = element("div");
				span1 = element("span");
				t26 = space();
				section4 = element("section");
				if (default_slot) default_slot.c();
				t27 = space();
				br0 = element("br");
				br1 = element("br");
				attr_dev(link, "rel", "stylesheet");
				attr_dev(link, "href", "./Docs.css");
				add_location(link, file$4, 51, 1, 1128);
				attr_dev(span0, "id", "idDocNav");
				add_location(span0, file$4, 53, 2, 1195);
				attr_dev(a0, "href", "https://squery-vercel-app.translate.goog/?&_x_tr_sl=auto&_x_tr_tl=ja&_x_tr_hl=en&_x_tr_pto=wapp");
				set_style(a0, "color", "#fff", 1);
				add_location(a0, file$4, 54, 45, 1268);
				set_style(div0, "float", "right");
				set_style(div0, "margin-right", "20px");
				add_location(div0, file$4, 54, 2, 1225);
				attr_dev(section0, "id", "idHead");
				add_location(section0, file$4, 52, 1, 1171);
				attr_dev(a1, "href", "./");
				set_style(a1, "color", "#fff");
				add_location(a1, file$4, 59, 44, 1529);
				attr_dev(div1, "id", "idLeftLogo");
				attr_dev(div1, "class", "notranslate");
				add_location(div1, file$4, 59, 3, 1488);
				attr_dev(section1, "id", "idLeftTop");
				add_location(section1, file$4, 58, 2, 1460);
				attr_dev(div2, "name", "");
				attr_dev(div2, "class", "cSub");
				add_location(div2, file$4, 63, 4, 1666);
				attr_dev(a2, "href", "./#/docs/");
				add_location(a2, file$4, 64, 28, 1732);
				attr_dev(div3, "name", "");
				attr_dev(div3, "class", "cF");
				add_location(div3, file$4, 64, 4, 1708);
				attr_dev(a3, "href", "./#/examples/");
				add_location(a3, file$4, 65, 28, 1804);
				attr_dev(div4, "name", "");
				attr_dev(div4, "class", "cF");
				add_location(div4, file$4, 65, 4, 1780);
				attr_dev(a4, "href", "./#/sq/");
				add_location(a4, file$4, 66, 28, 1875);
				attr_dev(div5, "name", "");
				attr_dev(div5, "class", "cF");
				add_location(div5, file$4, 66, 4, 1851);
				set_style(div6, "font-weight", "300");
				add_location(div6, file$4, 62, 3, 1632);
				attr_dev(div7, "name", "");
				attr_dev(div7, "class", "cSub");
				add_location(div7, file$4, 69, 3, 1932);
				attr_dev(a5, "href", "https://beacons.ai/exis");
				attr_dev(a5, "target", "_blank");
				add_location(a5, file$4, 70, 27, 2001);
				attr_dev(div8, "name", "");
				attr_dev(div8, "class", "cF");
				add_location(div8, file$4, 70, 3, 1977);
				attr_dev(a6, "href", "https://github.com/exis9/sQuery");
				attr_dev(a6, "target", "_blank");
				add_location(a6, file$4, 71, 27, 2095);
				attr_dev(div9, "name", "");
				attr_dev(div9, "class", "cF");
				add_location(div9, file$4, 71, 3, 2071);
				attr_dev(a7, "href", "https://twitter.com/ExisVR");
				attr_dev(a7, "target", "_blank");
				attr_dev(a7, "class", "notranslate");
				add_location(a7, file$4, 72, 27, 2195);
				attr_dev(div10, "name", "");
				attr_dev(div10, "class", "cF");
				add_location(div10, file$4, 72, 3, 2171);
				attr_dev(a8, "href", "https://stackoverflow.com/questions/tagged/squery");
				attr_dev(a8, "target", "_blank");
				add_location(a8, file$4, 73, 27, 2311);
				attr_dev(div11, "name", "");
				attr_dev(div11, "class", "cF");
				add_location(div11, file$4, 73, 3, 2287);
				attr_dev(a9, "href", "#a");
				attr_dev(a9, "onclick", "alert('Sorry! Please contact me using twitter DM for now..!');return false");
				add_location(a9, file$4, 74, 27, 2432);
				attr_dev(div12, "name", "");
				attr_dev(div12, "class", "cF");
				add_location(div12, file$4, 74, 3, 2408);
				attr_dev(section2, "class", "cScrollable");
				add_location(section2, file$4, 61, 2, 1599);
				attr_dev(section3, "id", "idLeft");
				add_location(section3, file$4, 57, 1, 1436);
				add_location(span1, file$4, 79, 28, 2603);
				attr_dev(div13, "class", "menu__toggler");
				add_location(div13, file$4, 79, 1, 2576);
				add_location(br0, file$4, 83, 2, 2664);
				add_location(br1, file$4, 83, 6, 2668);
				attr_dev(section4, "id", "idDoc");
				add_location(section4, file$4, 81, 1, 2625);
				add_location(main, file$4, 50, 0, 1120);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, main, anchor);
				append_dev(main, link);
				append_dev(main, t0);
				append_dev(main, section0);
				append_dev(section0, span0);
				append_dev(section0, t1);
				append_dev(section0, div0);
				append_dev(div0, a0);
				append_dev(main, t3);
				append_dev(main, section3);
				append_dev(section3, section1);
				append_dev(section1, div1);
				append_dev(div1, a1);
				append_dev(section3, t5);
				append_dev(section3, section2);
				append_dev(section2, div6);
				append_dev(div6, div2);
				append_dev(div6, t7);
				append_dev(div6, div3);
				append_dev(div3, a2);
				append_dev(div6, t9);
				append_dev(div6, div4);
				append_dev(div4, a3);
				append_dev(div6, t11);
				append_dev(div6, div5);
				append_dev(div5, a4);
				append_dev(section2, t13);
				append_dev(section2, div7);
				append_dev(section2, t15);
				append_dev(section2, div8);
				append_dev(div8, a5);
				append_dev(section2, t17);
				append_dev(section2, div9);
				append_dev(div9, a6);
				append_dev(section2, t19);
				append_dev(section2, div10);
				append_dev(div10, a7);
				append_dev(section2, t21);
				append_dev(section2, div11);
				append_dev(div11, a8);
				append_dev(section2, t23);
				append_dev(section2, div12);
				append_dev(div12, a9);
				append_dev(main, t25);
				append_dev(main, div13);
				append_dev(div13, span1);
				append_dev(main, t26);
				append_dev(main, section4);

				if (default_slot) {
					default_slot.m(section4, null);
				}

				append_dev(section4, t27);
				append_dev(section4, br0);
				append_dev(section4, br1);
				current = true;
			},
			p: function update(ctx, [dirty]) {
				if (default_slot) {
					if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
						update_slot_base(
							default_slot,
							default_slot_template,
							ctx,
							/*$$scope*/ ctx[0],
							!current
							? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
							: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
							null
						);
					}
				}
			},
			i: function intro(local) {
				if (current) return;
				transition_in(default_slot, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(default_slot, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) detach_dev(main);
				if (default_slot) default_slot.d(detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$5.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$5($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Core', slots, ['default']);
		document.getElementsByTagName('body')[0].style.display = 'none';

		//import Docs from "./Docs.svelte";
		//import Hello from "./pages/Hello.svelte";
		//import Hello2 from "./pages/Hello2.svelte";
		window.loadProc = function () {
			sQuery('body').hide().fadeIn(400);

			sQuery(document).onf('click', '.menu__toggler', function () {
				let el = sQuery('.menu__toggler');
				el.toggleClass('active');
				if (sQuery('.menu__toggler').hasClass('active')) sQuery('#idLeft').fadeIn(500).animate([{ left: "-200px" }, { left: "0px" }], 300); else sQuery('#idLeft').fadeOut(500).animate([{ left: "0px" }, { left: "-200px" }], 300);
				return false;
			});
		};

		if (sQuery().isPageLoaded()) {
			console.log('spa loaded');
			window.loadProc();
		} //setTimeout(() => {
		//	window.loadProc()

		//}, 1);
		sQuery(() => {
			console.log('loaded');
			window.loadProc();
		});

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$3.warn(`<Core> was created with unknown prop '${key}'`);
		});

		$$self.$$set = $$props => {
			if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
		};

		$$self.$capture_state = () => ({ push, sq: sQuery });
		return [$$scope, slots];
	}

	class Core extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Core",
				options,
				id: create_fragment$5.name
			});
		}
	}

	/* src/Home.svelte generated by Svelte v3.44.0 */
	const file$3 = "src/Home.svelte";

	// (7:0) <Core>
	function create_default_slot$1(ctx) {
		let h1;
		let t0;
		let div0;
		let t2;
		let doc0;
		let h20;
		let t4;
		let div2;
		let b0;
		let t6;
		let red0;
		let t8;
		let b1;
		let t10;
		let b2;
		let t12;
		let br0;
		let br1;
		let t13;
		let br2;
		let br3;
		let t14;
		let i0;
		let t16;
		let br4;
		let br5;
		let t17;
		let i1;
		let t18;
		let b3;
		let t20;
		let b4;
		let t22;
		let t23;
		let br6;
		let br7;
		let t24;
		let red1;
		let t26;
		let blue;
		let t28;
		let br8;
		let br9;
		let t29;
		let red2;
		let t31;
		let br10;
		let br11;
		let t32;
		let div1;
		let table;
		let thead;
		let tr0;
		let th0;
		let t34;
		let th1;
		let t36;
		let th2;
		let t38;
		let th3;
		let t40;
		let th4;
		let t42;
		let tbody;
		let tr1;
		let td0;
		let t44;
		let td1;
		let strong0;
		let t46;
		let td2;
		let t48;
		let td3;
		let t50;
		let td4;
		let strong1;
		let t52;
		let tr2;
		let td5;
		let t54;
		let td6;
		let strong2;
		let t56;
		let td7;
		let t58;
		let td8;
		let t60;
		let td9;
		let strong3;
		let t62;
		let tr3;
		let td10;
		let t64;
		let td11;
		let strong4;
		let t66;
		let td12;
		let t68;
		let td13;
		let t70;
		let td14;
		let strong5;
		let t72;
		let br12;
		let br13;
		let t73;
		let br14;
		let br15;
		let t74;
		let br16;
		let br17;
		let t75;
		let h3;
		let i2;
		let t77;
		let doc1;
		let h21;
		let t79;
		let div3;
		let t80;
		let br18;
		let t81;
		let a;
		let t83;

		const block = {
			c: function create() {
				h1 = element("h1");
				t0 = text("sQuery.js");
				div0 = element("div");
				div0.textContent = `${/*name*/ ctx[0]}`;
				t2 = space();
				doc0 = element("doc");
				h20 = element("h2");
				h20.textContent = "What is sQuery?";
				t4 = space();
				div2 = element("div");
				b0 = element("b");
				b0.textContent = "sQuery";
				t6 = text(" is like a ");
				red0 = element("red");
				red0.textContent = "super minified ES6 modern jQuery";
				t8 = text("(less than ");
				b1 = element("b");
				b1.textContent = "9.5KB";
				t10 = text(") that works great with modern JS frameworks such as ");
				b2 = element("b");
				b2.textContent = "Svelte/SolidJS/React/Preact/Vue.js/Angular";
				t12 = text(" without any special settings.\n\t\t\t");
				br0 = element("br");
				br1 = element("br");
				t13 = text("\n\t\t\tsQuery is probably something you're looking for especially if you're a modern js framework user but still love jQuery.\n\t\t\t");
				br2 = element("br");
				br3 = element("br");
				t14 = space();
				i0 = element("i");
				i0.textContent = "Have you ever thought the React/Vue virtual DOM is great but you still want a minimum DOM wrapper like jQuery?";
				t16 = space();
				br4 = element("br");
				br5 = element("br");
				t17 = space();
				i1 = element("i");
				t18 = text("Have you ever thought repeating ");
				b3 = element("b");
				b3.textContent = "document.getElementById";
				t20 = text(" or ");
				b4 = element("b");
				b4.textContent = "document.querySelectorAll";
				t22 = text(" is a stupid idea?");
				t23 = space();
				br6 = element("br");
				br7 = element("br");
				t24 = text("\n\t\t\tI know what you want. You want good old-fashioned simple DOM manipulation methods just like jQuery offers but you don't want to add a ");
				red1 = element("red");
				red1.textContent = "300KB+ jQuery file";
				t26 = text(" in your project. And you want ");
				blue = element("blue");
				blue.textContent = "native JavaScript speed";
				t28 = text(", too.\n\t\t\t");
				br8 = element("br");
				br9 = element("br");
				t29 = text("\n\t\t\tWell, sQuery is just 9.5KB, and with Nginx/Apache http Gzipped compression, it would be ");
				red2 = element("red");
				red2.textContent = "2.5KB";
				t31 = text("!!\n\t\t\tIt offers core jQuery-like functionality such as selector, method chain, dom/css operations, events, fadeIn, fadeOut, animation, each loop, and so on!\n\t\t\t");
				br10 = element("br");
				br11 = element("br");
				t32 = space();
				div1 = element("div");
				table = element("table");
				thead = element("thead");
				tr0 = element("tr");
				th0 = element("th");
				th0.textContent = "Size";
				t34 = space();
				th1 = element("th");
				th1.textContent = "sQuery";
				t36 = space();
				th2 = element("th");
				th2.textContent = "Cash";
				t38 = space();
				th3 = element("th");
				th3.textContent = "Zepto 1.2.0";
				t40 = space();
				th4 = element("th");
				th4.textContent = "jQuery Slim 3.4.1";
				t42 = space();
				tbody = element("tbody");
				tr1 = element("tr");
				td0 = element("td");
				td0.textContent = "Unminified";
				t44 = space();
				td1 = element("td");
				strong0 = element("strong");
				strong0.textContent = "13 KB";
				t46 = space();
				td2 = element("td");
				td2.textContent = "36.5 KB";
				t48 = space();
				td3 = element("td");
				td3.textContent = "58.7 KB";
				t50 = space();
				td4 = element("td");
				strong1 = element("strong");
				strong1.textContent = "227 KB";
				t52 = space();
				tr2 = element("tr");
				td5 = element("td");
				td5.textContent = "Minified";
				t54 = space();
				td6 = element("td");
				strong2 = element("strong");
				strong2.textContent = "9.5KB";
				t56 = space();
				td7 = element("td");
				td7.textContent = "16 KB";
				t58 = space();
				td8 = element("td");
				td8.textContent = "26 KB";
				t60 = space();
				td9 = element("td");
				strong3 = element("strong");
				strong3.textContent = "71 KB";
				t62 = space();
				tr3 = element("tr");
				td10 = element("td");
				td10.textContent = "Minified & Gzipped";
				t64 = space();
				td11 = element("td");
				strong4 = element("strong");
				strong4.textContent = "2.9 KB";
				t66 = space();
				td12 = element("td");
				td12.textContent = "6 KB";
				t68 = space();
				td13 = element("td");
				td13.textContent = "9.8 KB";
				t70 = space();
				td14 = element("td");
				strong5 = element("strong");
				strong5.textContent = "24.4 KB";
				t72 = space();
				br12 = element("br");
				br13 = element("br");
				t73 = text("\n\n\t\t\tActually, the size of your whole project could be even smaller with sQuery than without it, since you don't have to write lengthy native DOM codes over and over again. (Also, more good news: sQuery is basically the same speed as native codes!)\n\t\t\t");
				br14 = element("br");
				br15 = element("br");
				t74 = text("\n\t\t\tsQuery is NOT exactly like jQuery but rather a super simple esential DOM library with near-native speed that takes your development experience to the next level.\n\t\t\t");
				br16 = element("br");
				br17 = element("br");
				t75 = space();
				h3 = element("h3");
				i2 = element("i");
				i2.textContent = "sQuery's 'S' is for Simple, Small, Speed, and Solid";
				t77 = space();
				doc1 = element("doc");
				h21 = element("h2");
				h21.textContent = "Read the documentation and start!";
				t79 = space();
				div3 = element("div");
				t80 = text("There are CDN/zip/module/npm options for sQuery.");
				br18 = element("br");
				t81 = text("\n\t\t\tIf you already know jQuery, you basically don't need any additional knowledge.\n\t\t\tLet's go to the ");
				a = element("a");
				a.textContent = "documentation";
				t83 = text(" page and start!");
				add_location(div0, file$3, 7, 34, 235);
				attr_dev(h1, "class", "notranslate");
				add_location(h1, file$3, 7, 1, 202);
				add_location(h20, file$3, 10, 2, 291);
				add_location(b0, file$3, 12, 3, 327);
				add_location(red0, file$3, 12, 27, 351);
				add_location(b1, file$3, 12, 81, 405);
				add_location(b2, file$3, 12, 146, 470);
				add_location(br0, file$3, 13, 3, 553);
				add_location(br1, file$3, 13, 7, 557);
				add_location(br2, file$3, 15, 3, 687);
				add_location(br3, file$3, 15, 7, 691);
				add_location(i0, file$3, 16, 3, 699);
				add_location(br4, file$3, 17, 3, 820);
				add_location(br5, file$3, 17, 7, 824);
				add_location(b3, file$3, 18, 38, 867);
				add_location(b4, file$3, 18, 72, 901);
				add_location(i1, file$3, 18, 3, 832);
				add_location(br6, file$3, 19, 3, 959);
				add_location(br7, file$3, 19, 7, 963);
				add_location(red1, file$3, 20, 137, 1105);
				add_location(blue, file$3, 20, 197, 1165);
				add_location(br8, file$3, 21, 3, 1211);
				add_location(br9, file$3, 21, 7, 1215);
				add_location(red2, file$3, 22, 91, 1311);
				add_location(br10, file$3, 24, 3, 1487);
				add_location(br11, file$3, 24, 7, 1491);
				add_location(th0, file$3, 29, 5, 1560);
				add_location(th1, file$3, 30, 5, 1579);
				add_location(th2, file$3, 31, 5, 1600);
				add_location(th3, file$3, 32, 5, 1619);
				add_location(th4, file$3, 33, 5, 1645);
				add_location(tr0, file$3, 28, 5, 1550);
				add_location(thead, file$3, 27, 5, 1537);
				add_location(td0, file$3, 38, 5, 1725);
				add_location(strong0, file$3, 39, 9, 1754);
				add_location(td1, file$3, 39, 5, 1750);
				add_location(td2, file$3, 40, 5, 1787);
				add_location(td3, file$3, 41, 5, 1809);
				add_location(strong1, file$3, 42, 9, 1835);
				add_location(td4, file$3, 42, 5, 1831);
				add_location(tr1, file$3, 37, 5, 1715);
				add_location(td5, file$3, 45, 5, 1890);
				add_location(strong2, file$3, 46, 9, 1917);
				add_location(td6, file$3, 46, 5, 1913);
				add_location(td7, file$3, 47, 5, 1950);
				add_location(td8, file$3, 48, 5, 1970);
				add_location(strong3, file$3, 49, 9, 1994);
				add_location(td9, file$3, 49, 5, 1990);
				add_location(tr2, file$3, 44, 5, 1880);
				add_location(td10, file$3, 52, 5, 2048);
				add_location(strong4, file$3, 53, 9, 2089);
				add_location(td11, file$3, 53, 5, 2085);
				add_location(td12, file$3, 54, 5, 2123);
				add_location(td13, file$3, 55, 5, 2142);
				add_location(strong5, file$3, 56, 9, 2167);
				add_location(td14, file$3, 56, 5, 2163);
				add_location(tr3, file$3, 51, 5, 2038);
				add_location(tbody, file$3, 36, 5, 1702);
				add_location(table, file$3, 26, 4, 1524);
				attr_dev(div1, "class", "cTable");
				add_location(div1, file$3, 25, 3, 1499);
				add_location(br12, file$3, 61, 3, 2248);
				add_location(br13, file$3, 61, 7, 2252);
				add_location(br14, file$3, 64, 3, 2508);
				add_location(br15, file$3, 64, 7, 2512);
				add_location(br16, file$3, 66, 3, 2685);
				add_location(br17, file$3, 66, 7, 2689);
				add_location(i2, file$3, 67, 7, 2701);
				add_location(h3, file$3, 67, 3, 2697);
				add_location(div2, file$3, 11, 2, 318);
				attr_dev(doc0, "name", "What_is_sQuery");
				add_location(doc0, file$3, 9, 1, 261);
				add_location(h21, file$3, 72, 2, 2812);
				add_location(br18, file$3, 74, 51, 2914);
				attr_dev(a, "href", "./#/docs");
				add_location(a, file$3, 76, 19, 3020);
				add_location(div3, file$3, 73, 2, 2857);
				attr_dev(doc1, "name", "Installation");
				add_location(doc1, file$3, 71, 1, 2784);
			},
			m: function mount(target, anchor) {
				insert_dev(target, h1, anchor);
				append_dev(h1, t0);
				append_dev(h1, div0);
				insert_dev(target, t2, anchor);
				insert_dev(target, doc0, anchor);
				append_dev(doc0, h20);
				append_dev(doc0, t4);
				append_dev(doc0, div2);
				append_dev(div2, b0);
				append_dev(div2, t6);
				append_dev(div2, red0);
				append_dev(div2, t8);
				append_dev(div2, b1);
				append_dev(div2, t10);
				append_dev(div2, b2);
				append_dev(div2, t12);
				append_dev(div2, br0);
				append_dev(div2, br1);
				append_dev(div2, t13);
				append_dev(div2, br2);
				append_dev(div2, br3);
				append_dev(div2, t14);
				append_dev(div2, i0);
				append_dev(div2, t16);
				append_dev(div2, br4);
				append_dev(div2, br5);
				append_dev(div2, t17);
				append_dev(div2, i1);
				append_dev(i1, t18);
				append_dev(i1, b3);
				append_dev(i1, t20);
				append_dev(i1, b4);
				append_dev(i1, t22);
				append_dev(div2, t23);
				append_dev(div2, br6);
				append_dev(div2, br7);
				append_dev(div2, t24);
				append_dev(div2, red1);
				append_dev(div2, t26);
				append_dev(div2, blue);
				append_dev(div2, t28);
				append_dev(div2, br8);
				append_dev(div2, br9);
				append_dev(div2, t29);
				append_dev(div2, red2);
				append_dev(div2, t31);
				append_dev(div2, br10);
				append_dev(div2, br11);
				append_dev(div2, t32);
				append_dev(div2, div1);
				append_dev(div1, table);
				append_dev(table, thead);
				append_dev(thead, tr0);
				append_dev(tr0, th0);
				append_dev(tr0, t34);
				append_dev(tr0, th1);
				append_dev(tr0, t36);
				append_dev(tr0, th2);
				append_dev(tr0, t38);
				append_dev(tr0, th3);
				append_dev(tr0, t40);
				append_dev(tr0, th4);
				append_dev(table, t42);
				append_dev(table, tbody);
				append_dev(tbody, tr1);
				append_dev(tr1, td0);
				append_dev(tr1, t44);
				append_dev(tr1, td1);
				append_dev(td1, strong0);
				append_dev(tr1, t46);
				append_dev(tr1, td2);
				append_dev(tr1, t48);
				append_dev(tr1, td3);
				append_dev(tr1, t50);
				append_dev(tr1, td4);
				append_dev(td4, strong1);
				append_dev(tbody, t52);
				append_dev(tbody, tr2);
				append_dev(tr2, td5);
				append_dev(tr2, t54);
				append_dev(tr2, td6);
				append_dev(td6, strong2);
				append_dev(tr2, t56);
				append_dev(tr2, td7);
				append_dev(tr2, t58);
				append_dev(tr2, td8);
				append_dev(tr2, t60);
				append_dev(tr2, td9);
				append_dev(td9, strong3);
				append_dev(tbody, t62);
				append_dev(tbody, tr3);
				append_dev(tr3, td10);
				append_dev(tr3, t64);
				append_dev(tr3, td11);
				append_dev(td11, strong4);
				append_dev(tr3, t66);
				append_dev(tr3, td12);
				append_dev(tr3, t68);
				append_dev(tr3, td13);
				append_dev(tr3, t70);
				append_dev(tr3, td14);
				append_dev(td14, strong5);
				append_dev(div2, t72);
				append_dev(div2, br12);
				append_dev(div2, br13);
				append_dev(div2, t73);
				append_dev(div2, br14);
				append_dev(div2, br15);
				append_dev(div2, t74);
				append_dev(div2, br16);
				append_dev(div2, br17);
				append_dev(div2, t75);
				append_dev(div2, h3);
				append_dev(h3, i2);
				insert_dev(target, t77, anchor);
				insert_dev(target, doc1, anchor);
				append_dev(doc1, h21);
				append_dev(doc1, t79);
				append_dev(doc1, div3);
				append_dev(div3, t80);
				append_dev(div3, br18);
				append_dev(div3, t81);
				append_dev(div3, a);
				append_dev(div3, t83);
			},
			p: noop,
			d: function destroy(detaching) {
				if (detaching) detach_dev(h1);
				if (detaching) detach_dev(t2);
				if (detaching) detach_dev(doc0);
				if (detaching) detach_dev(t77);
				if (detaching) detach_dev(doc1);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_default_slot$1.name,
			type: "slot",
			source: "(7:0) <Core>",
			ctx
		});

		return block;
	}

	function create_fragment$4(ctx) {
		let core;
		let current;

		core = new Core({
				props: {
					$$slots: { default: [create_default_slot$1] },
					$$scope: { ctx }
				},
				$$inline: true
			});

		const block = {
			c: function create() {
				create_component(core.$$.fragment);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				mount_component(core, target, anchor);
				current = true;
			},
			p: function update(ctx, [dirty]) {
				const core_changes = {};

				if (dirty & /*$$scope*/ 2) {
					core_changes.$$scope = { dirty, ctx };
				}

				core.$set(core_changes);
			},
			i: function intro(local) {
				if (current) return;
				transition_in(core.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(core.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				destroy_component(core, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$4.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$4($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Home', slots, []);
		let name = 'sQuery - Native Speed jQuery for Svelte/SolidJS';
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
		});

		$$self.$capture_state = () => ({ push, sq: sQuery, Core, name });

		$$self.$inject_state = $$props => {
			if ('name' in $$props) $$invalidate(0, name = $$props.name);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		return [name];
	}

	class Home extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Home",
				options,
				id: create_fragment$4.name
			});
		}
	}

	let name = 'sQuery - Native Speed jQuery for Svelte';

	let loadProc = function(){
		sQuery('body').hide().fadeIn(400);

		window.setDocTitle = (v, ot)=>{
			let c = sQuery('.cF[name="'+v+'"]').siblings().filter('.cSub').text();
			if ( !c )
				return

			let title = ot + ' - sQuery Docs';
			if (window.history.replaceState)
				window.history.replaceState({n:v}, title, './?n='+v+'#/docs' );
			document.title = title;
			
			let h = '<a class="cWhite" href="./#/docs">sQuery Docs</a> -> <a class="cWhite" href="./?n='+c.replace(/ /g,'')+'#/docs">' 
				+ c + '</a> -> <a class="cWhite" href="./?p&n='+v+'#/docs">' + sQuery('.cF[name='+v+']').text().replace('・','') +'</a>';
			sQuery('#idDocNav').html(h);
			sQuery('.cF').removeClass('active');
			sQuery('.cF[name="'+v+'"]').addClass('active');
		};

		sQuery(document).onf('click', '.menu__toggler', function(){
			let el = sQuery('.menu__toggler');
			el.toggleClass('active');
			if ( sQuery('.menu__toggler').hasClass('active') )
				sQuery('#idLeft').fadeIn(500).animate([{left:"-200px"}, {left:"0px"}], 300);
			else	
				sQuery('#idLeft').fadeOut(500).animate([{left:"0px"}, {left:"-200px"}], 300);
			
			return false
		});
		sQuery('.cF').on('click', function(){
			let t = sQuery(this).attr('name');
			sQuery('doc[name="'+t+'"]').scrollToElement();
		});
		setTimeout(()=>{
			sQuery(document).on('scroll', function(){
				let isOnScreen = function(element){
					let curPos = element.offset(),
						curTop = curPos.top - sQuery('body').scrollTop(),
						screenHeight = sQuery('body').height();
					return (curTop > screenHeight) ? false : true;
				};
		
				let el;
				sQuery('doc').each(function(){
					if ( isOnScreen( sQuery(this) ) )
						el = sQuery(this);
				});
				if ( el )
				{
					let ot = sQuery('.cF[name="'+el.attr('name')+'"]').text();
					window.setDocTitle( el.attr('name'), ot );
				}
			});
		},2500);
		
		window.clearDS = ()=> {
			sQuery('#idDS').val('');
			sQuery('#idDSC').fadeOut();
			sQuery('.cF').fadeIn();
			sQuery('.cF').each(function(){
				sQuery(this).html(sQuery(this).text());
			});
		};
		sQuery('#idDS').on('keyup', function(){
			let v = sQuery(this).val().trim();
			//console.log(v)
			sQuery('.cF').show();
			sQuery('.cF').each(function(){
				let t = sQuery(this).text(), lt = t.toLowerCase(), lv = v.toLowerCase();
				if ( lt.toLowerCase().includes(lv) )
					sQuery(this).html( t.replace(new RegExp(v, 'i'), "<b>$&</b>") );
				else
					sQuery(this).hide();
			});
			if ( sQuery(this).val() != '' )
			sQuery('#idDSC').show();
		}).on('blur', function(){
			if ( sQuery(this).val() == '' )
				window.clearDS();
		});
		sQuery('#idDSC').on('click',function(){
			window.clearDS();
		});
		setTimeout(function(){
			function qs(key) {
				key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
				let match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
				return match && decodeURIComponent(match[1].replace(/\+/g, " "));
			}
			const n = qs('n'); 
			if ( n )
				document.querySelector(`doc[name="${n}"]`).scrollIntoView();
		}, 1000);
	};

	/* PrismJS 1.25.0
	https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript */
	var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(u){var c=/\blang(?:uage)?-([\w-]+)\b/i,n=0,e={},M={manual:u.Prism&&u.Prism.manual,disableWorkerMessageHandler:u.Prism&&u.Prism.disableWorkerMessageHandler,util:{encode:function e(n){return n instanceof W?new W(n.type,e(n.content),n.alias):Array.isArray(n)?n.map(e):n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function t(e,r){var a,n;switch(r=r||{},M.util.type(e)){case"Object":if(n=M.util.objId(e),r[n])return r[n];for(var i in a={},r[n]=a,e)e.hasOwnProperty(i)&&(a[i]=t(e[i],r));return a;case"Array":return n=M.util.objId(e),r[n]?r[n]:(a=[],r[n]=a,e.forEach(function(e,n){a[n]=t(e,r);}),a);default:return e}},getLanguage:function(e){for(;e&&!c.test(e.className);)e=e.parentElement;return e?(e.className.match(c)||[,"none"])[1].toLowerCase():"none"},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(e){var n=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack)||[])[1];if(n){var t=document.getElementsByTagName("script");for(var r in t)if(t[r].src==n)return t[r]}return null}},isActive:function(e,n,t){for(var r="no-"+n;e;){var a=e.classList;if(a.contains(n))return !0;if(a.contains(r))return !1;e=e.parentElement;}return !!t}},languages:{plain:e,plaintext:e,text:e,txt:e,extend:function(e,n){var t=M.util.clone(M.languages[e]);for(var r in n)t[r]=n[r];return t},insertBefore:function(t,e,n,r){var a=(r=r||M.languages)[t],i={};for(var l in a)if(a.hasOwnProperty(l)){if(l==e)for(var o in n)n.hasOwnProperty(o)&&(i[o]=n[o]);n.hasOwnProperty(l)||(i[l]=a[l]);}var s=r[t];return r[t]=i,M.languages.DFS(M.languages,function(e,n){n===s&&e!=t&&(this[e]=i);}),i},DFS:function e(n,t,r,a){a=a||{};var i=M.util.objId;for(var l in n)if(n.hasOwnProperty(l)){t.call(n,l,n[l],r||l);var o=n[l],s=M.util.type(o);"Object"!==s||a[i(o)]?"Array"!==s||a[i(o)]||(a[i(o)]=!0,e(o,t,l,a)):(a[i(o)]=!0,e(o,t,null,a));}}},plugins:{},highlightAll:function(e,n){M.highlightAllUnder(document,e,n);},highlightAllUnder:function(e,n,t){var r={callback:t,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};M.hooks.run("before-highlightall",r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),M.hooks.run("before-all-elements-highlight",r);for(var a,i=0;a=r.elements[i++];)M.highlightElement(a,!0===n,r.callback);},highlightElement:function(e,n,t){var r=M.util.getLanguage(e),a=M.languages[r];e.className=e.className.replace(c,"").replace(/\s+/g," ")+" language-"+r;var i=e.parentElement;i&&"pre"===i.nodeName.toLowerCase()&&(i.className=i.className.replace(c,"").replace(/\s+/g," ")+" language-"+r);var l={element:e,language:r,grammar:a,code:e.textContent};function o(e){l.highlightedCode=e,M.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,M.hooks.run("after-highlight",l),M.hooks.run("complete",l),t&&t.call(l.element);}if(M.hooks.run("before-sanity-check",l),(i=l.element.parentElement)&&"pre"===i.nodeName.toLowerCase()&&!i.hasAttribute("tabindex")&&i.setAttribute("tabindex","0"),!l.code)return M.hooks.run("complete",l),void(t&&t.call(l.element));if(M.hooks.run("before-highlight",l),l.grammar)if(n&&u.Worker){var s=new Worker(M.filename);s.onmessage=function(e){o(e.data);},s.postMessage(JSON.stringify({language:l.language,code:l.code,immediateClose:!0}));}else o(M.highlight(l.code,l.grammar,l.language));else o(M.util.encode(l.code));},highlight:function(e,n,t){var r={code:e,grammar:n,language:t};return M.hooks.run("before-tokenize",r),r.tokens=M.tokenize(r.code,r.grammar),M.hooks.run("after-tokenize",r),W.stringify(M.util.encode(r.tokens),r.language)},tokenize:function(e,n){var t=n.rest;if(t){for(var r in t)n[r]=t[r];delete n.rest;}var a=new i;return I(a,a.head,e),function e(n,t,r,a,i,l){for(var o in r)if(r.hasOwnProperty(o)&&r[o]){var s=r[o];s=Array.isArray(s)?s:[s];for(var u=0;u<s.length;++u){if(l&&l.cause==o+","+u)return;var c=s[u],g=c.inside,f=!!c.lookbehind,h=!!c.greedy,d=c.alias;if(h&&!c.pattern.global){var p=c.pattern.toString().match(/[imsuy]*$/)[0];c.pattern=RegExp(c.pattern.source,p+"g");}for(var v=c.pattern||c,m=a.next,y=i;m!==t.tail&&!(l&&y>=l.reach);y+=m.value.length,m=m.next){var b=m.value;if(t.length>n.length)return;if(!(b instanceof W)){var k,x=1;if(h){if(!(k=z(v,y,n,f))||k.index>=n.length)break;var w=k.index,A=k.index+k[0].length,P=y;for(P+=m.value.length;P<=w;)m=m.next,P+=m.value.length;if(P-=m.value.length,y=P,m.value instanceof W)continue;for(var E=m;E!==t.tail&&(P<A||"string"==typeof E.value);E=E.next)x++,P+=E.value.length;x--,b=n.slice(y,P),k.index-=y;}else if(!(k=z(v,0,b,f)))continue;var w=k.index,S=k[0],O=b.slice(0,w),L=b.slice(w+S.length),N=y+b.length;l&&N>l.reach&&(l.reach=N);var j=m.prev;O&&(j=I(t,j,O),y+=O.length),q(t,j,x);var C=new W(o,g?M.tokenize(S,g):S,d,S);if(m=I(t,j,C),L&&I(t,m,L),1<x){var _={cause:o+","+u,reach:N};e(n,t,r,m.prev,y,_),l&&_.reach>l.reach&&(l.reach=_.reach);}}}}}}(e,a,n,a.head,0),function(e){var n=[],t=e.head.next;for(;t!==e.tail;)n.push(t.value),t=t.next;return n}(a)},hooks:{all:{},add:function(e,n){var t=M.hooks.all;t[e]=t[e]||[],t[e].push(n);},run:function(e,n){var t=M.hooks.all[e];if(t&&t.length)for(var r,a=0;r=t[a++];)r(n);}},Token:W};function W(e,n,t,r){this.type=e,this.content=n,this.alias=t,this.length=0|(r||"").length;}function z(e,n,t,r){e.lastIndex=n;var a=e.exec(t);if(a&&r&&a[1]){var i=a[1].length;a.index+=i,a[0]=a[0].slice(i);}return a}function i(){var e={value:null,prev:null,next:null},n={value:null,prev:e,next:null};e.next=n,this.head=e,this.tail=n,this.length=0;}function I(e,n,t){var r=n.next,a={value:t,prev:n,next:r};return n.next=a,r.prev=a,e.length++,a}function q(e,n,t){for(var r=n.next,a=0;a<t&&r!==e.tail;a++)r=r.next;(n.next=r).prev=n,e.length-=a;}if(u.Prism=M,W.stringify=function n(e,t){if("string"==typeof e)return e;if(Array.isArray(e)){var r="";return e.forEach(function(e){r+=n(e,t);}),r}var a={type:e.type,content:n(e.content,t),tag:"span",classes:["token",e.type],attributes:{},language:t},i=e.alias;i&&(Array.isArray(i)?Array.prototype.push.apply(a.classes,i):a.classes.push(i)),M.hooks.run("wrap",a);var l="";for(var o in a.attributes)l+=" "+o+'="'+(a.attributes[o]||"").replace(/"/g,"&quot;")+'"';return "<"+a.tag+' class="'+a.classes.join(" ")+'"'+l+">"+a.content+"</"+a.tag+">"},!u.document)return u.addEventListener&&(M.disableWorkerMessageHandler||u.addEventListener("message",function(e){var n=JSON.parse(e.data),t=n.language,r=n.code,a=n.immediateClose;u.postMessage(M.highlight(r,M.languages[t],t)),a&&u.close();},!1)),M;var t=M.util.currentScript();function r(){M.manual||M.highlightAll();}if(t&&(M.filename=t.src,t.hasAttribute("data-manual")&&(M.manual=!0)),!M.manual){var a=document.readyState;"loading"===a||"interactive"===a&&t&&t.defer?document.addEventListener("DOMContentLoaded",r):window.requestAnimationFrame?window.requestAnimationFrame(r):window.setTimeout(r,16);}return M}(_self);"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
	Prism.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup,Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"));}),Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(a,e){var s={};s["language-"+e]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[e]},s.cdata=/^<!\[CDATA\[|\]\]>$/i;var t={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:s}};t["language-"+e]={pattern:/[\s\S]+/,inside:Prism.languages[e]};var n={};n[a]={pattern:RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g,function(){return a}),"i"),lookbehind:!0,greedy:!0,inside:t},Prism.languages.insertBefore("markup","cdata",n);}}),Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(a,e){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp("(^|[\"'\\s])(?:"+a+")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))","i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:Prism.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}});}}),Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,Prism.languages.xml=Prism.languages.extend("markup",{}),Prism.languages.ssml=Prism.languages.xml,Prism.languages.atom=Prism.languages.xml,Prism.languages.rss=Prism.languages.xml;
	!function(s){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;s.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|"+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},s.languages.css.atrule.inside.rest=s.languages.css;var t=s.languages.markup;t&&(t.tag.addInlined("style","css"),t.tag.addAttribute("style","css"));}(Prism);
	Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};
	Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)","javascript")),Prism.languages.js=Prism.languages.javascript;

	function update(text, pel=sq('.cCodeCont')) {
		let result_element = pel.find("#highlighting-content").get(0);
		// Handle final newlines (see article)
		if(text[text.length-1] == "\n") {
			text += " ";
		}
		// Update code
		result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
		// Syntax Highlight
		Prism.highlightElement(result_element);
	}
	  
	function sync_scroll(element, pel=sq('.cCodeCont')) {
		/* Scroll result to scroll coords of event - sync with textarea */
		let result_element = pel.find("#highlighting").get(0);
		// Get and set x and y
		result_element.scrollTop = element.scrollTop;
		result_element.scrollLeft = element.scrollLeft;
	}
	  
	function check_tab(element, event, pel=sq('.cCodeCont')) {
		let code = element.value;
		if(event.key == "Tab") {
			event.preventDefault(); // stop normal

			if ( window.bShift ){
				let start = element.selectionStart, end = element.selectionEnd;
				/* Tab key pressed */
				let before_tab = code.slice(0, element.selectionStart); // text before tab

				let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab

				let m_tab = code.substring(element.selectionStart, element.selectionEnd);
				m_tab = m_tab.replace(/\n\t/g, '\n').replace(/\n  /g, '\n');

				element.selectionStart + 1; // where cursor moves after tab - moving forward by 1 char to after tab
				element.value = before_tab.replace(/\t$/,'') + m_tab + after_tab; // add tab char
				element.setSelectionRange(start, end);
				update(element.value, pel); // Update text to include indent
			} else {
				/* Tab key pressed */
				let before_tab = code.slice(0, element.selectionStart); // text before tab

				let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab

				let m_tab = code.substring(element.selectionStart, element.selectionEnd);
				m_tab = m_tab.replace(/\n/g, '\n\t');

				let cursor_pos = element.selectionStart + 1; // where cursor moves after tab - moving forward by 1 char to after tab
				element.value = before_tab + "\t" + m_tab + after_tab; // add tab char
				// move cursor
				element.selectionStart = cursor_pos;
				element.selectionEnd = cursor_pos;
				update(element.value, pel); // Update text to include indent
			}
			
		}
	}

	let g_codes = {
		custom: `
<script src="squery.min.js"></script>
<script>
const $ = sq
$(function(){
	$('body')
		.html('<div class="str">Am I jQuery?</div>')
		.css('background', 'rgb(230,30,100)')
	
	$('.str').css({
		color: '#fff',
		fontSize: '20px',
	})
})
</script>
	`,

		custom_module: `
<script type="module">
import {sq as $} from './sq.min.js'
$(function(){
	$('body').css('background', 'rgb(230,30,100)')
	$('body').html('Am I jQuery?')
})
</script>
	`,


		c1: `
<script src="squery.min.js"></script>
<script>
sq(function(){
	sq('body').css('background', 'skyblue')
	sq('body').html('<h1>Hello sQuery!</h1>')
})
</script>`,

		c1_cdn: `
<script src="https://cdn.jsdelivr.net/gh/exis9/squery@latest/squery.min.js"></script>
<script>
sq(function(){
	sq('body').css('background', 'skyblue')
	sq('body').html('<h1>Hello sQuery CDN!</h1>')
})
</script>`,
		
		c2: `
<script type="module">
import {sq} from './sq.min.js'
sq(()=>{
	sq('body').css('background', 'rgb(230,30,100)')
	sq('body').html('<h1>Hi, sQuery module!</h1>')
})
</script>`,

	c2_cdn: `
<script type="module">
import {sq} from 'https://cdn.jsdelivr.net/gh/exis9/squery@latest/sq.min.js'
sq(()=>{
	sq('body').css('background', 'rgb(230,30,100)')
	sq('body').html('<h1>Hi, sQuery CDN module!</h1>')
})
</script>`,

	customMethods: `
<span>click here!</span>

<script>
	_SQ.NewMethod = function(){ //_SQ.MethodName creates a new method!
		alert("hello")
		return this //if you need the method chain, don't forget this
	}

	_SQ.BgChange = function( color ){
		let el = this.el[0] //the first element chosen by the selector
		el.style.background = color //css styling
		return this
	}

	sq('span').on( 'click', ()=>{
		sq('body').BgChange('red') //changes the background
		setTimeout(()=>{
			sq('body').NewMethod().BgChange('skyblue') //alerts hello and then changes the background
		}, 1000)
	})
</script>
`,

	filter: `
<div>a</div>
<div class="middle">b</div>
<div class="middle2">c</div>
<div class="middle">d</div>
<div class="middle">e</div>
<div>f</div>

<script>
sq(()=>{
	sq('div')
		.css('background', '#c8ebcc')
		.filter('.middle' )
		.css('color', 'red');
})
</script>`,

	not: `
<div> a </div>
<div id="pokemon"> b </div>
<div> c </div>
<div class="pikachu"> d </div>
<div class="mew"> e </div>
<div class="mewtwo"> f </div>
<div> g </div>
 
<script>
	sq("div")
		.not("#pokemon, .mewtwo")
		.css("color", "red");
</script>
`,

	eq: `
<style>
div {
	border: 1px solid blue;
	margin: 10px;
	padding: 10px;
}
.blue {
	color: white;
	background: blue;
}
</style>

<div>0</div>
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>

<script>
	sq( "body" ).find( "div" ).eq( 2 ).addClass( "blue" );
</script>
`,

	eq2: `
<style>
div {
	border: 1px solid red;
	margin: 10px;
	padding: 10px;
}
.red {
	color: white;
	background: red;
}
</style>

<div>0</div>
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
 
<script>
	sq( "body" ).find( "div" ).eq( -2 ).addClass( "red" );
</script>
`,

	first: `
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
  <li>forth(last)</li>
</ul>

<script>
	sq('ul li').first().css('color', 'red')
</script>
`,

	last: `
<ul>
	<li>first</li>
	<li>second</li>
	<li>third</li>
	<li>forth(last)</li>
</ul>

<script>
	sq('ul li').last().css('color', 'red')
</script>
`,

	has: `
<ul>
  <li>list item 1</li>
  <li>list item 2
    <ul>
      <li>list item 2-a</li>
      <li>list item 2-b</li>
    </ul>
  </li>
  <li>list item 3</li>
  <li>list item 4</li>
</ul>

<script>
	sq( "li" ).has( "ul" ).css( "background-color", "red" );
</script>
`,

	contains: `
<div>John Resig</div>
<div>George Martin</div>
<div>Malcom John Sinclair</div>
<div>J. Ohn</div>
 
<script>
	sq( "div" ).contains( "John" ).css( "text-decoration", "underline" );
</script>
`,

	slice: `
<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li>list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
</ul>

<script>
	sq( "li" ).slice( 1 ).css( "background-color", "red" );
	//sq( "li" ).slice( 2, 4 ).css( "background-color", "yellow" );
</script>
`,

	index: `
<ul>
	<li id="foo">foo</li>
	<li id="bar">bar</li>
	<li id="baz">baz</li>
</ul>
<div id="msg"></div>
<script>
	sq('#msg').text( "Index of bar: " + sq( "#bar" ).index() )
</script>
`,

	is: `
<ul>
	<li>list <strong>item 1</strong></li>
	<li><span>list item 2</span></li>
	<li>list item 3</li>
</ul>
<script>
	sq( "ul" ).on('click', function( event ) {
		var target = sq( event.target );
		if ( target.is( "li" ) ) {
			target.css( "background-color", "red" );
		}
	});
</script>
`,

	find: `
<ul class="level-1">
	<li class="item-i">I</li>
	<li class="item-ii">
		II
		<ul class="level-2">
			<li class="item-a">A</li>
			<li class="item-b">B
			<ul class="level-3">
				<li class="item-1">1</li>
				<li class="item-2">2</li>
				<li class="item-3">3</li>
			</ul>
			</li>
			<li class="item-c">C</li>
		</ul>
	</li>
	<li class="item-iii">III</li>
</ul>
<script>
	sq( "li.item-ii" ).find( "li" ).css( "background-color", "red" );
</script>
`,

	children: `
<ul class="level-1">
  <li class="item-i">I</li>
  <li class="item-ii">II
    <ul class="level-2">
      <li class="item-a">A</li>
      <li class="item-b">B
        <ul class="level-3">
          <li class="item-1">1</li>
          <li class="item-2">2</li>
          <li class="item-3">3</li>
        </ul>
      </li>
      <li class="item-c">C</li>
    </ul>
  </li>
  <li class="item-iii">III</li>
</ul>

<script>
	sq( "ul.level-3" ).children().css( "background-color", "red" );
</script>
`,

	next: `
<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li class="third-item">list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
</ul>

<script>
	sq( "li.third-item" ).next().css( "background-color", "red" );
</script>
`,

	prev: `
<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li class="third-item">list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
</ul>

<script>
	sq( "li.third-item" ).prev().css( "background-color", "red" );
</script>
`,

	siblings: `
<ul>
	<li>list item 1</li>
	<li>list item 2</li>
	<li class="third-item">list item 3</li>
	<li>list item 4</li>
	<li>list item 5</li>
</ul>

<script>
	sq( "li.third-item" ).siblings().css( "background-color", "red" );
</script>
`,

	parent:`
<ul class="level-1">
  <li class="item-i">I</li>
  <li class="item-ii">II
    <ul class="level-2">
      <li class="item-a">A</li>
      <li class="item-b">B
        <ul class="level-3">
          <li class="item-1">1</li>
          <li class="item-2">2</li>
          <li class="item-3">3</li>
        </ul>
      </li>
      <li class="item-c">C</li>
    </ul>
  </li>
  <li class="item-iii">III</li>
</ul>

<script>
	sq( "li.item-a" ).parent().css( "background-color", "red" );
</script>
`,

	parents:`
<ul class="level-1">
  <li class="item-i">I</li>
  <li class="item-ii">II
    <ul class="level-2">
      <li class="item-a">A</li>
      <li class="item-b">B
        <ul class="level-3">
          <li class="item-1">1</li>
          <li class="item-2">2</li>
          <li class="item-3">3</li>
        </ul>
      </li>
      <li class="item-c">C</li>
    </ul>
  </li>
  <li class="item-iii">III</li>
</ul>

<script>
	sq( "li" ).css( "background-color", "pink" )
	sq( "li.item-a" ).parents().css( "background-color", "red" );
</script>
`,

	closest:`
<ul id="one" class="level-1">
  <li class="item-i">I</li>
  <li id="ii" class="item-ii">II
    <ul class="level-2">
      <li class="item-a">A</li>
      <li class="item-b">B
        <ul class="level-3">
          <li class="item-1">1</li>
          <li class="item-2">2</li>
          <li class="item-3">3</li>
        </ul>
      </li>
      <li class="item-c">C</li>
    </ul>
  </li>
  <li class="item-iii">III</li>
</ul>

<script>
	sq( "li.item-a" )
		.closest( "ul" )
		.css( "background-color", "red" );
</script>
`,

	hasClass:`
<style>
	.selected {
		color: red;
	}
</style>

<p>This paragraph is black and is the first paragraph.</p>
<p class="selected">This paragraph is red and is the second paragraph.</p>

<br><br>

<div id="result1">First paragraph has selected class: </div>
<div id="result2">Second paragraph has selected class: </div>
<div id="result3">At least one paragraph has selected class: </div>

<script>
	sq( "#result1" ).append( sq( "p" ).first().hasClass( "selected" ).toString() );
	sq( "#result2" ).append( sq( "p" ).last().hasClass( "selected" ).toString() );
	sq( "#result3" ).append( sq( "p" ).hasClass( "selected" ).toString() ) ;
</script>
`,

	isVisible:`
<script>
	sq
</script>
`,

	isPageLoaded:`
<script>
	sq
</script>
`,

	html:`
<script>
	sq
</script>
`,

	text:`
<script>
	sq
</script>
`,

	val:`
<script>
	sq
</script>
`,

	css:`
<script>
	sq
</script>
`,

	attr:`
<script>
	sq
</script>
`,

	prop:`
<script>
	sq
</script>
`,

	get:`
<script>
	sq
</script>
`,

	show:`
<script>
	sq
</script>
`,

	hide:`
<script>
	sq
</script>
`,

	remove:`
<script>
	sq
</script>
`,

	before:`
<script>
	sq
</script>
`,

	after:`
<script>
	sq
</script>
`,

	prepend:`
<script>
	sq
</script>
`,

	append:`
<script>
	sq
</script>
`,

	replaceWith:`
<script>
	sq
</script>
`,

	addClass:`
<script>
	sq
</script>
`,

	removeClass:`
<script>
	sq
</script>
`,

	toggleClass:`
<script>
	sq
</script>
`,

	width:`
<script>
	sq
</script>
`,


	innerWidth:`
<script>
	sq
</script>
`,


	outerWidth:`
<script>
	sq
</script>
`,

	offset:`
<script>
	sq
</script>
`,

	pos:`
<script>
	sq
</script>
`,

	fadeIn:`
<script>
	sq
</script>
`,

	animate:`
<script>
	sq
</script>
`,

	scroll:`
<script>
	sq
</script>
`,

	scrollTop:`
<script>
	sq
</script>
`,

	scrollToElement:`
<script>
	sq
</script>
`,

	each:`
<script>
	sq
</script>
`,

	on:`
<script>
	sq
</script>
`,

	off:`
<script>
	sq
</script>
`,

	onf:`
<script>
	sq
</script>
`,

	trg:`
<script>
	sq
</script>
`,

	};

	/* src/Sq_editorI.svelte generated by Svelte v3.44.0 */

	const { console: console_1$2 } = globals;
	const file$2 = "src/Sq_editorI.svelte";

	function create_fragment$3(ctx) {
		let main;
		let link0;
		let t0;
		let link1;
		let t1;
		let link2;
		let t2;
		let link3;
		let t3;
		let link4;
		let t4;
		let section;
		let div;
		let textarea;
		let t5;
		let pre;
		let code;
		let t6;
		let iframe;

		const block = {
			c: function create() {
				main = element("main");
				link0 = element("link");
				t0 = space();
				link1 = element("link");
				t1 = space();
				link2 = element("link");
				t2 = space();
				link3 = element("link");
				t3 = space();
				link4 = element("link");
				t4 = space();
				section = element("section");
				div = element("div");
				textarea = element("textarea");
				t5 = space();
				pre = element("pre");
				code = element("code");
				t6 = space();
				iframe = element("iframe");
				attr_dev(link0, "rel", "preconnect");
				attr_dev(link0, "href", "https://fonts.googleapis.com");
				add_location(link0, file$2, 127, 1, 3412);
				attr_dev(link1, "rel", "preconnect");
				attr_dev(link1, "href", "https://fonts.gstatic.com");
				attr_dev(link1, "crossorigin", "");
				add_location(link1, file$2, 128, 1, 3473);
				attr_dev(link2, "href", "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300&display=swap");
				attr_dev(link2, "rel", "stylesheet");
				add_location(link2, file$2, 129, 1, 3543);
				attr_dev(link3, "rel", "stylesheet");
				attr_dev(link3, "href", "./Docs.css");
				add_location(link3, file$2, 131, 1, 3655);
				attr_dev(link4, "rel", "stylesheet");
				attr_dev(link4, "href", "./Sq_editor.css");
				add_location(link4, file$2, 132, 1, 3698);
				attr_dev(textarea, "placeholder", "Enter HTML Source Code");
				attr_dev(textarea, "id", "editing");
				attr_dev(textarea, "spellcheck", "false");
				add_location(textarea, file$2, 135, 3, 3833);
				attr_dev(code, "class", "language-html");
				attr_dev(code, "id", "highlighting-content");
				add_location(code, file$2, 137, 4, 3974);
				attr_dev(pre, "id", "highlighting");
				attr_dev(pre, "aria-hidden", "true");
				add_location(pre, file$2, 136, 3, 3927);
				attr_dev(div, "class", "cCodeSpace svelte-1kumkx6");
				add_location(div, file$2, 134, 2, 3805);
				attr_dev(iframe, "id", "idResult");
				attr_dev(iframe, "title", "editor");
				attr_dev(iframe, "class", "svelte-1kumkx6");
				add_location(iframe, file$2, 141, 2, 4121);
				attr_dev(section, "class", "cCodeCont");
				attr_dev(section, "data-cname", /*cname*/ ctx[0]);
				attr_dev(section, "style", /*style*/ ctx[1]);
				add_location(section, file$2, 133, 1, 3746);
				add_location(main, file$2, 126, 0, 3404);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, main, anchor);
				append_dev(main, link0);
				append_dev(main, t0);
				append_dev(main, link1);
				append_dev(main, t1);
				append_dev(main, link2);
				append_dev(main, t2);
				append_dev(main, link3);
				append_dev(main, t3);
				append_dev(main, link4);
				append_dev(main, t4);
				append_dev(main, section);
				append_dev(section, div);
				append_dev(div, textarea);
				append_dev(div, t5);
				append_dev(div, pre);
				append_dev(pre, code);
				append_dev(section, t6);
				append_dev(section, iframe);
			},
			p: function update(ctx, [dirty]) {
				if (dirty & /*cname*/ 1) {
					attr_dev(section, "data-cname", /*cname*/ ctx[0]);
				}

				if (dirty & /*style*/ 2) {
					attr_dev(section, "style", /*style*/ ctx[1]);
				}
			},
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) detach_dev(main);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$3.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function safe_sq_code(t) {
		if (!t) t = '';
		let v = 'script src="squery.min.js"></script';
		v = '<' + v + '>\n';
		if (!t.includes('squery.min.js') && !t.includes('./sq.min.js')) t = t.replace('<script>', v + '<script>');
		return t.trim();
	}

	function instance$3($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Sq_editorI', slots, []);
		let { cname, mh, autoload } = $$props;
		let sq_code = safe_sq_code(g_codes[cname]);
		let style = '';

		if (mh) {
			style = `max-height:${mh}px;`;
		}

		function registerEvents(bAutoLoad = false) {
			const pel = sQuery(`.cCodeCont[data-cname="${cname}"]`);

			pel.find('#editing').off('change').on('change', function () {
				//console.log('change')
				let code = pel.find('#editing').val().replace(/'/g, "\\'").replace(/\n/g, "\\n");

				//document.getElementById('idResult').contentWindow.document.write(code);
				let myIFrame = pel.find('#idResult').get(0);

				//console.log(bAutoLoad)
				if (bAutoLoad) {
					myIFrame.src = `javascript: '${code}'`;
				} else {
					pel.find('#idResult').//.attr('data-code', code)
					attr('src', `javascript: '<div style="display:flex;align-items: center; justify-content: center;height:100%"><div style="max-width:200px;color:#fff;background-color:#2196f3;padding:20px">Tap or mouseover to load!</div></div>'`).on('mouseover', function () {
						const code = pel.find('#editing').val().replace(/'/g, "\\'").replace(/\n/g, "\\n");

						//console.log(code)
						sQuery(this).attr('src', `javascript: '${code}'`);

						sQuery(this).off('mouseover');
					});
				}
			});

			pel.find('#editing').off('input').on('input', function () {
				//console.log('input')
				update(this.value, pel);

				sync_scroll(this, pel);
			});

			pel.find('#editing').off('keydown').on('keydown', function (e) {
				//console.log('keydown')
				bAutoLoad = true;

				switch (e.keyCode) {
					case 9:
						window.bTab = true;
						e.preventDefault();
						return false;
					case 16:
						window.bShift = true;
						e.preventDefault();
						return false;
					case 17:
						window.bCtrl = true;
						e.preventDefault();
						return false;
				}

				if (!e.key.toLowerCase().includes('arrow')) {
					setTimeout(
						() => {
							sQuery(this).trg('change');
						},
						1
					);
				}
			});

			pel.find('#editing').off('keyup').on('keyup', function (e) {
				//console.log('keyup' )
				check_tab(this, e, pel);

				switch (e.keyCode) {
					case 9:
						return false;
					case 16:
						window.bShift = false;
						return false;
					case 17:
						window.bCtrl = false;
						return false;
				}
			});

			pel.find('#editing').off('scroll').on('scroll', function (e) {
				sync_scroll(this, pel);
			});
		}

		let c = ``;

		let loadProc = function () {
			const pel = sQuery(`.cCodeCont[data-cname="${cname}"]`);
			sQuery('body').show();

			setTimeout(
				() => {
					pel.find('textarea').val(sq_code); //console.log(sq_code)
					update(sq_code, pel);
					pel.find('#editing').trg('change');
				},
				100
			); //console.log(sq_code)

			registerEvents(autoload);
			pel.find('#editing').val(c).trg('input').trg('change');
			sQuery('#idDoc').css({ 'width': '100%', 'max-width': '100%' });
			pel.find('.cF').contains('editor').addClass('active');
		};

		if (sQuery().isPageLoaded()) {
			console.log('spa loaded');

			setTimeout(
				() => {
					loadProc();
				},
				1
			);
		}

		sQuery(() => {
			loadProc();
		});

		const writable_props = ['cname', 'mh', 'autoload'];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$2.warn(`<Sq_editorI> was created with unknown prop '${key}'`);
		});

		$$self.$$set = $$props => {
			if ('cname' in $$props) $$invalidate(0, cname = $$props.cname);
			if ('mh' in $$props) $$invalidate(2, mh = $$props.mh);
			if ('autoload' in $$props) $$invalidate(3, autoload = $$props.autoload);
		};

		$$self.$capture_state = () => ({
			sq: sQuery,
			update,
			sync_scroll,
			check_tab,
			g_codes,
			cname,
			mh,
			autoload,
			sq_code,
			style,
			safe_sq_code,
			registerEvents,
			c,
			loadProc
		});

		$$self.$inject_state = $$props => {
			if ('cname' in $$props) $$invalidate(0, cname = $$props.cname);
			if ('mh' in $$props) $$invalidate(2, mh = $$props.mh);
			if ('autoload' in $$props) $$invalidate(3, autoload = $$props.autoload);
			if ('sq_code' in $$props) sq_code = $$props.sq_code;
			if ('style' in $$props) $$invalidate(1, style = $$props.style);
			if ('c' in $$props) c = $$props.c;
			if ('loadProc' in $$props) loadProc = $$props.loadProc;
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		return [cname, style, mh, autoload];
	}

	class Sq_editorI extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$3, create_fragment$3, safe_not_equal, { cname: 0, mh: 2, autoload: 3 });

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Sq_editorI",
				options,
				id: create_fragment$3.name
			});

			const { ctx } = this.$$;
			const props = options.props || {};

			if (/*cname*/ ctx[0] === undefined && !('cname' in props)) {
				console_1$2.warn("<Sq_editorI> was created without expected prop 'cname'");
			}

			if (/*mh*/ ctx[2] === undefined && !('mh' in props)) {
				console_1$2.warn("<Sq_editorI> was created without expected prop 'mh'");
			}

			if (/*autoload*/ ctx[3] === undefined && !('autoload' in props)) {
				console_1$2.warn("<Sq_editorI> was created without expected prop 'autoload'");
			}
		}

		get cname() {
			throw new Error("<Sq_editorI>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set cname(value) {
			throw new Error("<Sq_editorI>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get mh() {
			throw new Error("<Sq_editorI>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set mh(value) {
			throw new Error("<Sq_editorI>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get autoload() {
			throw new Error("<Sq_editorI>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set autoload(value) {
			throw new Error("<Sq_editorI>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}
	}

	/* src/Docs.svelte generated by Svelte v3.44.0 */

	const { console: console_1$1 } = globals;
	const file$1 = "src/Docs.svelte";

	function create_fragment$2(ctx) {
		let main;
		let link0;
		let t0;
		let script;
		let script_src_value;
		let t1;
		let link1;
		let t2;
		let section0;
		let span0;
		let t3;
		let div0;
		let a0;
		let t5;
		let section3;
		let section1;
		let div1;
		let a1;
		let t7;
		let div4;
		let hr0;
		let t8;
		let div3;
		let input;
		let t9;
		let div2;
		let t11;
		let section2;
		let div14;
		let div5;
		let t13;
		let div6;
		let t15;
		let div7;
		let t17;
		let div8;
		let t19;
		let div9;
		let t21;
		let div10;
		let t23;
		let div11;
		let t25;
		let div12;
		let t27;
		let div13;
		let t29;
		let div15;
		let t31;
		let div16;
		let t33;
		let div17;
		let t35;
		let div18;
		let t37;
		let div19;
		let t39;
		let div20;
		let t41;
		let div21;
		let t43;
		let div22;
		let t45;
		let div23;
		let t47;
		let div24;
		let t49;
		let div25;
		let t51;
		let div26;
		let t53;
		let div27;
		let t55;
		let div28;
		let t57;
		let div29;
		let t59;
		let div30;
		let t61;
		let div31;
		let t63;
		let div32;
		let t65;
		let div33;
		let t67;
		let div34;
		let t69;
		let div35;
		let t71;
		let div36;
		let t73;
		let div37;
		let t75;
		let div38;
		let t77;
		let div39;
		let t79;
		let div40;
		let t81;
		let div41;
		let t83;
		let div42;
		let t85;
		let div43;
		let t87;
		let div44;
		let t89;
		let div45;
		let t91;
		let div46;
		let t93;
		let div47;
		let t95;
		let div48;
		let t97;
		let div49;
		let t99;
		let div50;
		let t101;
		let div51;
		let t103;
		let div52;
		let t105;
		let div53;
		let t107;
		let div54;
		let t109;
		let div55;
		let t111;
		let div56;
		let t113;
		let div57;
		let t115;
		let div58;
		let t117;
		let div59;
		let t119;
		let div60;
		let t121;
		let div61;
		let t123;
		let div62;
		let t125;
		let div63;
		let t127;
		let div64;
		let t129;
		let div65;
		let t131;
		let div66;
		let t133;
		let div67;
		let t135;
		let div68;
		let t137;
		let br0;
		let br1;
		let br2;
		let br3;
		let br4;
		let br5;
		let br6;
		let br7;
		let t138;
		let div69;
		let span1;
		let t139;
		let section4;
		let h1;
		let span2;
		let t140;
		let div70;
		let t142;
		let doc0;
		let h20;
		let t144;
		let div71;
		let t145;
		let a2;
		let t147;
		let a3;
		let t149;
		let t150;
		let div74;
		let div73;
		let div72;
		let t151;
		let small0;
		let t153;
		let sqi0;
		let t154;
		let div77;
		let div76;
		let div75;
		let t155;
		let t156;
		let sqi1;
		let t157;
		let div80;
		let div79;
		let div78;
		let t158;
		let small1;
		let t159;
		let a4;
		let t161;
		let t162;
		let sqi2;
		let t163;
		let div83;
		let div82;
		let div81;
		let t164;
		let t165;
		let sqi3;
		let t166;
		let doc1;
		let h21;
		let t168;
		let div93;
		let t169;
		let div92;
		let div84;
		let h30;
		let t171;
		let p0;
		let t172;
		let br8;
		let t173;
		let b0;
		let t175;
		let a5;
		let t177;
		let div85;
		let h31;
		let t179;
		let p1;
		let t180;
		let b1;
		let t182;
		let br9;
		let t183;
		let a6;
		let t185;
		let a7;
		let t187;
		let t188;
		let div86;
		let h32;
		let t190;
		let p2;
		let t191;
		let br10;
		let br11;
		let t192;
		let b2;
		let br12;
		let t194;
		let br13;
		let t195;
		let br14;
		let t196;
		let br15;
		let t197;
		let b3;
		let t198;
		let br16;
		let t199;
		let br17;
		let t200;
		let t201;
		let div87;
		let h33;
		let t203;
		let p3;
		let t204;
		let br18;
		let t205;
		let br19;
		let t206;
		let b4;
		let t208;
		let br20;
		let t209;
		let br21;
		let t210;
		let br22;
		let t211;
		let br23;
		let t212;
		let br24;
		let t213;
		let br25;
		let t214;
		let br26;
		let t215;
		let br27;
		let t216;
		let t217;
		let div91;
		let h34;
		let t219;
		let p4;
		let small2;
		let br28;
		let t221;
		let t222;
		let div90;
		let div89;
		let div88;
		let t223;
		let t224;
		let sqi4;
		let t225;
		let doc2;
		let h22;
		let t227;
		let div94;
		let t228;
		let br29;
		let t229;
		let t230;
		let div99;
		let div96;
		let div95;
		let t231;
		let t232;
		let sqi5;
		let t233;
		let div98;
		let div97;
		let t234;
		let t235;
		let sqi6;
		let t236;
		let doc3;
		let h23;
		let t238;
		let div100;
		let t239;
		let a8;
		let t241;
		let br30;
		let t242;
		let a9;
		let t244;
		let t245;
		let div105;
		let div101;
		let t246;
		let br31;
		let t247;
		let br32;
		let t248;
		let br33;
		let t249;
		let a10;
		let t251;
		let div102;
		let t252;
		let br34;
		let t253;
		let br35;
		let t254;
		let br36;
		let t255;
		let hr1;
		let t256;
		let div103;
		let t258;
		let div104;
		let t260;
		let doc4;
		let h24;
		let t262;
		let div106;
		let t263;
		let a11;
		let t265;
		let br37;
		let t266;
		let t267;
		let doc5;
		let h25;
		let t269;
		let div107;
		let t270;
		let a12;
		let t272;
		let br38;
		let t273;
		let t274;
		let doc6;
		let h26;
		let t276;
		let div108;
		let t277;
		let a13;
		let t279;
		let br39;
		let t280;
		let t281;
		let doc7;
		let h27;
		let t283;
		let div109;
		let t284;
		let a14;
		let t286;
		let br40;
		let t287;
		let t288;
		let doc8;
		let h28;
		let t290;
		let div110;
		let t291;
		let span3;
		let t292;
		let div113;
		let div112;
		let div111;
		let t293;
		let t294;
		let sqi7;
		let t295;
		let div114;
		let br41;
		let t296;
		let span4;
		let t297;
		let div117;
		let div116;
		let div115;
		let t298;
		let t299;
		let sqi8;
		let t300;
		let doc9;
		let h29;
		let t302;
		let div118;
		let t303;
		let span5;
		let t304;
		let div121;
		let div120;
		let div119;
		let t305;
		let t306;
		let sqi9;
		let t307;
		let div122;
		let br42;
		let t308;
		let t309;
		let div125;
		let div124;
		let div123;
		let t310;
		let t311;
		let sqi10;
		let t312;
		let doc10;
		let h210;
		let t314;
		let div126;
		let t315;
		let span6;
		let t316;
		let div129;
		let div128;
		let div127;
		let t317;
		let t318;
		let sqi11;
		let t319;
		let div130;
		let br43;
		let t320;
		let span7;
		let t321;
		let div133;
		let div132;
		let div131;
		let t322;
		let t323;
		let sqi12;
		let t324;
		let doc11;
		let h211;
		let t326;
		let div134;
		let t327;
		let span8;
		let t328;
		let div137;
		let div136;
		let div135;
		let t329;
		let t330;
		let sqi13;
		let t331;
		let doc12;
		let h212;
		let t333;
		let div138;
		let t334;
		let span9;
		let t335;
		let div141;
		let div140;
		let div139;
		let t336;
		let t337;
		let sqi14;
		let t338;
		let doc13;
		let h213;
		let t340;
		let div142;
		let t341;
		let span10;
		let t342;
		let div145;
		let div144;
		let div143;
		let t343;
		let t344;
		let sqi15;
		let t345;
		let doc14;
		let h214;
		let t347;
		let div146;
		let t348;
		let span11;
		let t349;
		let div149;
		let div148;
		let div147;
		let t350;
		let t351;
		let sqi16;
		let t352;
		let doc15;
		let h215;
		let t354;
		let div150;
		let t355;
		let span12;
		let t356;
		let div153;
		let div152;
		let div151;
		let t357;
		let t358;
		let sqi17;
		let t359;
		let doc16;
		let h216;
		let t361;
		let div154;
		let t362;
		let span13;
		let t363;
		let div157;
		let div156;
		let div155;
		let t364;
		let t365;
		let sqi18;
		let t366;
		let doc17;
		let h217;
		let t368;
		let div158;
		let t369;
		let span14;
		let t370;
		let div161;
		let div160;
		let div159;
		let t371;
		let t372;
		let sqi19;
		let t373;
		let doc18;
		let h218;
		let t375;
		let div162;
		let t376;
		let span15;
		let t377;
		let div165;
		let div164;
		let div163;
		let t378;
		let t379;
		let sqi20;
		let t380;
		let div166;
		let br44;
		let t381;
		let span16;
		let t382;
		let div169;
		let div168;
		let div167;
		let t383;
		let t384;
		let sqi21;
		let t385;
		let doc19;
		let h219;
		let t387;
		let div170;
		let t388;
		let span17;
		let t389;
		let div173;
		let div172;
		let div171;
		let t390;
		let t391;
		let sqi22;
		let t392;
		let doc20;
		let h220;
		let t394;
		let div174;
		let t395;
		let span18;
		let t396;
		let div177;
		let div176;
		let div175;
		let t397;
		let t398;
		let sqi23;
		let t399;
		let div178;
		let br45;
		let t400;
		let span19;
		let t401;
		let div181;
		let div180;
		let div179;
		let t402;
		let t403;
		let sqi24;
		let t404;
		let doc21;
		let h221;
		let t406;
		let div182;
		let t407;
		let span20;
		let t408;
		let div185;
		let div184;
		let div183;
		let t409;
		let t410;
		let sqi25;
		let t411;
		let doc22;
		let h222;
		let t413;
		let div186;
		let t414;
		let span21;
		let t415;
		let div189;
		let div188;
		let div187;
		let t416;
		let t417;
		let sqi26;
		let t418;
		let doc23;
		let h223;
		let t420;
		let div190;
		let t421;
		let span22;
		let t422;
		let div193;
		let div192;
		let div191;
		let t423;
		let t424;
		let sqi27;
		let t425;
		let doc24;
		let h224;
		let t427;
		let div194;
		let t428;
		let span23;
		let t429;
		let div197;
		let div196;
		let div195;
		let t430;
		let t431;
		let sqi28;
		let t432;
		let doc25;
		let h225;
		let t434;
		let div198;
		let t435;
		let span24;
		let t436;
		let div201;
		let div200;
		let div199;
		let t437;
		let t438;
		let sqi29;
		let t439;
		let doc26;
		let h226;
		let t441;
		let div202;
		let t442;
		let span25;
		let t443;
		let div205;
		let div204;
		let div203;
		let t444;
		let t445;
		let sqi30;
		let t446;
		let doc27;
		let h227;
		let t448;
		let div206;
		let t449;
		let span26;
		let t450;
		let div209;
		let div208;
		let div207;
		let t451;
		let t452;
		let sqi31;
		let t453;
		let doc28;
		let h228;
		let t455;
		let div210;
		let t456;
		let span27;
		let t457;
		let div213;
		let div212;
		let div211;
		let t458;
		let t459;
		let sqi32;
		let t460;
		let doc29;
		let h229;
		let t462;
		let div214;
		let t463;
		let span28;
		let t464;
		let div217;
		let div216;
		let div215;
		let t465;
		let t466;
		let sqi33;
		let t467;
		let doc30;
		let h230;
		let t469;
		let div218;
		let t470;
		let span29;
		let t471;
		let div221;
		let div220;
		let div219;
		let t472;
		let t473;
		let sqi34;
		let t474;
		let doc31;
		let h231;
		let t476;
		let div222;
		let t477;
		let span30;
		let t478;
		let div225;
		let div224;
		let div223;
		let t479;
		let t480;
		let sqi35;
		let t481;
		let doc32;
		let h232;
		let t483;
		let div226;
		let t484;
		let span31;
		let t485;
		let div229;
		let div228;
		let div227;
		let t486;
		let t487;
		let sqi36;
		let t488;
		let div230;
		let br46;
		let t489;
		let span32;
		let t490;
		let div233;
		let div232;
		let div231;
		let t491;
		let t492;
		let sqi37;
		let t493;
		let doc33;
		let h233;
		let t495;
		let div234;
		let t496;
		let span33;
		let t497;
		let div237;
		let div236;
		let div235;
		let t498;
		let t499;
		let sqi38;
		let t500;
		let doc34;
		let h234;
		let t502;
		let div238;
		let t503;
		let span34;
		let t504;
		let div241;
		let div240;
		let div239;
		let t505;
		let t506;
		let sqi39;
		let t507;
		let div242;
		let br47;
		let t508;
		let span35;
		let t509;
		let div245;
		let div244;
		let div243;
		let t510;
		let t511;
		let sqi40;
		let t512;
		let doc35;
		let h235;
		let t514;
		let div246;
		let t515;
		let span36;
		let t516;
		let div249;
		let div248;
		let div247;
		let t517;
		let t518;
		let sqi41;
		let t519;
		let div250;
		let br48;
		let t520;
		let span37;
		let t521;
		let div253;
		let div252;
		let div251;
		let t522;
		let t523;
		let sqi42;
		let t524;
		let doc36;
		let h236;
		let t526;
		let div254;
		let t527;
		let span38;
		let t528;
		let div257;
		let div256;
		let div255;
		let t529;
		let t530;
		let sqi43;
		let t531;
		let doc37;
		let h237;
		let t533;
		let div258;
		let t534;
		let span39;
		let t535;
		let div261;
		let div260;
		let div259;
		let t536;
		let t537;
		let sqi44;
		let t538;
		let div262;
		let br49;
		let t539;
		let span40;
		let t540;
		let div265;
		let div264;
		let div263;
		let t541;
		let t542;
		let sqi45;
		let t543;
		let doc38;
		let h238;
		let t545;
		let div266;
		let t546;
		let span41;
		let t547;
		let div269;
		let div268;
		let div267;
		let t548;
		let t549;
		let sqi46;
		let t550;
		let doc39;
		let h239;
		let t552;
		let div270;
		let t553;
		let span42;
		let t554;
		let div273;
		let div272;
		let div271;
		let t555;
		let t556;
		let sqi47;
		let t557;
		let doc40;
		let h240;
		let t559;
		let div274;
		let t560;
		let span43;
		let t561;
		let div277;
		let div276;
		let div275;
		let t562;
		let t563;
		let sqi48;
		let t564;
		let doc41;
		let h241;
		let t566;
		let div278;
		let t567;
		let span44;
		let t568;
		let div281;
		let div280;
		let div279;
		let t569;
		let t570;
		let sqi49;
		let t571;
		let doc42;
		let h242;
		let t573;
		let div282;
		let t574;
		let span45;
		let t575;
		let div285;
		let div284;
		let div283;
		let t576;
		let t577;
		let sqi50;
		let t578;
		let doc43;
		let h243;
		let t580;
		let div286;
		let t581;
		let span46;
		let t582;
		let div289;
		let div288;
		let div287;
		let t583;
		let t584;
		let sqi51;
		let t585;
		let doc44;
		let h244;
		let t587;
		let div290;
		let t588;
		let span47;
		let t589;
		let div293;
		let div292;
		let div291;
		let t590;
		let t591;
		let sqi52;
		let t592;
		let doc45;
		let h245;
		let t594;
		let div294;
		let t595;
		let span48;
		let t596;
		let div297;
		let div296;
		let div295;
		let t597;
		let t598;
		let sqi53;
		let t599;
		let doc46;
		let h246;
		let t601;
		let div298;
		let t602;
		let span49;
		let t603;
		let div301;
		let div300;
		let div299;
		let t604;
		let t605;
		let sqi54;
		let t606;
		let doc47;
		let h247;
		let t608;
		let div302;
		let t609;
		let span50;
		let t610;
		let div305;
		let div304;
		let div303;
		let t611;
		let t612;
		let sqi55;
		let t613;
		let doc48;
		let h248;
		let t615;
		let div306;
		let t616;
		let span51;
		let t617;
		let div309;
		let div308;
		let div307;
		let t618;
		let t619;
		let sqi56;
		let t620;
		let doc49;
		let h249;
		let t622;
		let div310;
		let t623;
		let span52;
		let t624;
		let div313;
		let div312;
		let div311;
		let t625;
		let t626;
		let sqi57;
		let t627;
		let doc50;
		let h250;
		let t629;
		let div314;
		let t630;
		let span53;
		let t631;
		let div317;
		let div316;
		let div315;
		let t632;
		let t633;
		let sqi58;
		let t634;
		let doc51;
		let h251;
		let t636;
		let div318;
		let t637;
		let span54;
		let t638;
		let div321;
		let div320;
		let div319;
		let t639;
		let t640;
		let sqi59;
		let current;

		sqi0 = new Sq_editorI({
				props: { cname: "c1", mh: "240", autoload: "true" },
				$$inline: true
			});

		sqi1 = new Sq_editorI({
				props: { cname: "c1_cdn", mh: "240" },
				$$inline: true
			});

		sqi2 = new Sq_editorI({
				props: { cname: "c2", mh: "240" },
				$$inline: true
			});

		sqi3 = new Sq_editorI({
				props: { cname: "c2_cdn", mh: "240" },
				$$inline: true
			});

		sqi4 = new Sq_editorI({
				props: { cname: "customMethods", mh: "410" },
				$$inline: true
			});

		sqi5 = new Sq_editorI({
				props: { cname: "custom", mh: "410" },
				$$inline: true
			});

		sqi6 = new Sq_editorI({
				props: { cname: "custom_module", mh: "240" },
				$$inline: true
			});

		sqi7 = new Sq_editorI({
				props: { cname: "filter", mh: "410" },
				$$inline: true
			});

		sqi8 = new Sq_editorI({
				props: { cname: "not", mh: "410" },
				$$inline: true
			});

		sqi9 = new Sq_editorI({
				props: { cname: "eq", mh: "410" },
				$$inline: true
			});

		sqi10 = new Sq_editorI({
				props: { cname: "eq2", mh: "410" },
				$$inline: true
			});

		sqi11 = new Sq_editorI({
				props: { cname: "first", mh: "410" },
				$$inline: true
			});

		sqi12 = new Sq_editorI({
				props: { cname: "last", mh: "410" },
				$$inline: true
			});

		sqi13 = new Sq_editorI({
				props: { cname: "has", mh: "410" },
				$$inline: true
			});

		sqi14 = new Sq_editorI({
				props: { cname: "contains", mh: "410" },
				$$inline: true
			});

		sqi15 = new Sq_editorI({
				props: { cname: "slice", mh: "410" },
				$$inline: true
			});

		sqi16 = new Sq_editorI({
				props: { cname: "index", mh: "410" },
				$$inline: true
			});

		sqi17 = new Sq_editorI({
				props: { cname: "is", mh: "410" },
				$$inline: true
			});

		sqi18 = new Sq_editorI({
				props: { cname: "find", mh: "410" },
				$$inline: true
			});

		sqi19 = new Sq_editorI({
				props: { cname: "children", mh: "410" },
				$$inline: true
			});

		sqi20 = new Sq_editorI({
				props: { cname: "next", mh: "410" },
				$$inline: true
			});

		sqi21 = new Sq_editorI({
				props: { cname: "prev", mh: "410" },
				$$inline: true
			});

		sqi22 = new Sq_editorI({
				props: { cname: "siblings", mh: "410" },
				$$inline: true
			});

		sqi23 = new Sq_editorI({
				props: { cname: "parent", mh: "410" },
				$$inline: true
			});

		sqi24 = new Sq_editorI({
				props: { cname: "parents", mh: "410" },
				$$inline: true
			});

		sqi25 = new Sq_editorI({
				props: { cname: "closest", mh: "410" },
				$$inline: true
			});

		sqi26 = new Sq_editorI({
				props: { cname: "hasClass", mh: "410" },
				$$inline: true
			});

		sqi27 = new Sq_editorI({
				props: { cname: "isVisible", mh: "410" },
				$$inline: true
			});

		sqi28 = new Sq_editorI({
				props: { cname: "isPageLoaded", mh: "410" },
				$$inline: true
			});

		sqi29 = new Sq_editorI({
				props: { cname: "html", mh: "410" },
				$$inline: true
			});

		sqi30 = new Sq_editorI({
				props: { cname: "text", mh: "410" },
				$$inline: true
			});

		sqi31 = new Sq_editorI({
				props: { cname: "val", mh: "410" },
				$$inline: true
			});

		sqi32 = new Sq_editorI({
				props: { cname: "css", mh: "410" },
				$$inline: true
			});

		sqi33 = new Sq_editorI({
				props: { cname: "attr", mh: "410" },
				$$inline: true
			});

		sqi34 = new Sq_editorI({
				props: { cname: "prop", mh: "410" },
				$$inline: true
			});

		sqi35 = new Sq_editorI({
				props: { cname: "get", mh: "410" },
				$$inline: true
			});

		sqi36 = new Sq_editorI({
				props: { cname: "show", mh: "410" },
				$$inline: true
			});

		sqi37 = new Sq_editorI({
				props: { cname: "hide", mh: "410" },
				$$inline: true
			});

		sqi38 = new Sq_editorI({
				props: { cname: "remove", mh: "410" },
				$$inline: true
			});

		sqi39 = new Sq_editorI({
				props: { cname: "before", mh: "410" },
				$$inline: true
			});

		sqi40 = new Sq_editorI({
				props: { cname: "after", mh: "410" },
				$$inline: true
			});

		sqi41 = new Sq_editorI({
				props: { cname: "prepend", mh: "410" },
				$$inline: true
			});

		sqi42 = new Sq_editorI({
				props: { cname: "append", mh: "410" },
				$$inline: true
			});

		sqi43 = new Sq_editorI({
				props: { cname: "replaceWith", mh: "410" },
				$$inline: true
			});

		sqi44 = new Sq_editorI({
				props: { cname: "addClass", mh: "410" },
				$$inline: true
			});

		sqi45 = new Sq_editorI({
				props: { cname: "removeClass", mh: "410" },
				$$inline: true
			});

		sqi46 = new Sq_editorI({
				props: { cname: "toggleClass", mh: "410" },
				$$inline: true
			});

		sqi47 = new Sq_editorI({
				props: { cname: "width", mh: "410" },
				$$inline: true
			});

		sqi48 = new Sq_editorI({
				props: { cname: "innerWidth", mh: "410" },
				$$inline: true
			});

		sqi49 = new Sq_editorI({
				props: { cname: "outerWidth", mh: "410" },
				$$inline: true
			});

		sqi50 = new Sq_editorI({
				props: { cname: "offset", mh: "410" },
				$$inline: true
			});

		sqi51 = new Sq_editorI({
				props: { cname: "pos", mh: "410" },
				$$inline: true
			});

		sqi52 = new Sq_editorI({
				props: { cname: "fadeIn", mh: "410" },
				$$inline: true
			});

		sqi53 = new Sq_editorI({
				props: { cname: "animate", mh: "410" },
				$$inline: true
			});

		sqi54 = new Sq_editorI({
				props: { cname: "scroll", mh: "410" },
				$$inline: true
			});

		sqi55 = new Sq_editorI({
				props: { cname: "scrollTop", mh: "410" },
				$$inline: true
			});

		sqi56 = new Sq_editorI({
				props: { cname: "scrollToElement", mh: "410" },
				$$inline: true
			});

		sqi57 = new Sq_editorI({
				props: { cname: "each", mh: "410" },
				$$inline: true
			});

		sqi58 = new Sq_editorI({
				props: { cname: "on", mh: "410" },
				$$inline: true
			});

		sqi59 = new Sq_editorI({
				props: { cname: "trg-trigger", mh: "410" },
				$$inline: true
			});

		const block = {
			c: function create() {
				main = element("main");
				link0 = element("link");
				t0 = space();
				script = element("script");
				t1 = space();
				link1 = element("link");
				t2 = space();
				section0 = element("section");
				span0 = element("span");
				t3 = space();
				div0 = element("div");
				a0 = element("a");
				a0.textContent = "日本語に翻訳";
				t5 = space();
				section3 = element("section");
				section1 = element("section");
				div1 = element("div");
				a1 = element("a");
				a1.textContent = "sQuery HOME";
				t7 = space();
				div4 = element("div");
				hr0 = element("hr");
				t8 = space();
				div3 = element("div");
				input = element("input");
				t9 = space();
				div2 = element("div");
				div2.textContent = "×";
				t11 = space();
				section2 = element("section");
				div14 = element("div");
				div5 = element("div");
				div5.textContent = "Getting Started";
				t13 = space();
				div6 = element("div");
				div6.textContent = "・Installation";
				t15 = space();
				div7 = element("div");
				div7.textContent = "・Difference between jQuery";
				t17 = space();
				div8 = element("div");
				div8.textContent = "・Use like jQuery";
				t19 = space();
				div9 = element("div");
				div9.textContent = "・Use with React";
				t21 = space();
				div10 = element("div");
				div10.textContent = "・Use with Vue.js";
				t23 = space();
				div11 = element("div");
				div11.textContent = "・Use with Svelte";
				t25 = space();
				div12 = element("div");
				div12.textContent = "・Use with SolidJS";
				t27 = space();
				div13 = element("div");
				div13.textContent = "・Use with Angular";
				t29 = space();
				div15 = element("div");
				div15.textContent = "Self Selectors";
				t31 = space();
				div16 = element("div");
				div16.textContent = "filter / not";
				t33 = space();
				div17 = element("div");
				div17.textContent = "eq";
				t35 = space();
				div18 = element("div");
				div18.textContent = "first / last";
				t37 = space();
				div19 = element("div");
				div19.textContent = "has";
				t39 = space();
				div20 = element("div");
				div20.textContent = "contains";
				t41 = space();
				div21 = element("div");
				div21.textContent = "slice";
				t43 = space();
				div22 = element("div");
				div22.textContent = "index";
				t45 = space();
				div23 = element("div");
				div23.textContent = "is";
				t47 = space();
				div24 = element("div");
				div24.textContent = "Child Elements";
				t49 = space();
				div25 = element("div");
				div25.textContent = "find";
				t51 = space();
				div26 = element("div");
				div26.textContent = "children";
				t53 = space();
				div27 = element("div");
				div27.textContent = "Sibling Elements";
				t55 = space();
				div28 = element("div");
				div28.textContent = "next / prev";
				t57 = space();
				div29 = element("div");
				div29.textContent = "siblings";
				t59 = space();
				div30 = element("div");
				div30.textContent = "Parent Elements";
				t61 = space();
				div31 = element("div");
				div31.textContent = "parent / parents";
				t63 = space();
				div32 = element("div");
				div32.textContent = "closest";
				t65 = space();
				div33 = element("div");
				div33.textContent = "Boolean Checks";
				t67 = space();
				div34 = element("div");
				div34.textContent = "hasClass";
				t69 = space();
				div35 = element("div");
				div35.textContent = "isVisible";
				t71 = space();
				div36 = element("div");
				div36.textContent = "isPageLoaded";
				t73 = space();
				div37 = element("div");
				div37.textContent = "Operations";
				t75 = space();
				div38 = element("div");
				div38.textContent = "html";
				t77 = space();
				div39 = element("div");
				div39.textContent = "text";
				t79 = space();
				div40 = element("div");
				div40.textContent = "val";
				t81 = space();
				div41 = element("div");
				div41.textContent = "css";
				t83 = space();
				div42 = element("div");
				div42.textContent = "attr";
				t85 = space();
				div43 = element("div");
				div43.textContent = "prop";
				t87 = space();
				div44 = element("div");
				div44.textContent = "get";
				t89 = space();
				div45 = element("div");
				div45.textContent = "show / hide";
				t91 = space();
				div46 = element("div");
				div46.textContent = "remove";
				t93 = space();
				div47 = element("div");
				div47.textContent = "before / after";
				t95 = space();
				div48 = element("div");
				div48.textContent = "prepend / append";
				t97 = space();
				div49 = element("div");
				div49.textContent = "replaceWith";
				t99 = space();
				div50 = element("div");
				div50.textContent = "addClass / removeClass";
				t101 = space();
				div51 = element("div");
				div51.textContent = "toggleClass";
				t103 = space();
				div52 = element("div");
				div52.textContent = "Size & Position";
				t105 = space();
				div53 = element("div");
				div53.textContent = "width / height";
				t107 = space();
				div54 = element("div");
				div54.textContent = "innerWidth / innerHeight";
				t109 = space();
				div55 = element("div");
				div55.textContent = "outerWidth / outerHeight";
				t111 = space();
				div56 = element("div");
				div56.textContent = "offset";
				t113 = space();
				div57 = element("div");
				div57.textContent = "pos (position)";
				t115 = space();
				div58 = element("div");
				div58.textContent = "Animations";
				t117 = space();
				div59 = element("div");
				div59.textContent = "fadeIn / fadeOut";
				t119 = space();
				div60 = element("div");
				div60.textContent = "animate";
				t121 = space();
				div61 = element("div");
				div61.textContent = "scroll";
				t123 = space();
				div62 = element("div");
				div62.textContent = "scrollTop / scrollLeft";
				t125 = space();
				div63 = element("div");
				div63.textContent = "scrollToElement";
				t127 = space();
				div64 = element("div");
				div64.textContent = "Loops";
				t129 = space();
				div65 = element("div");
				div65.textContent = "each";
				t131 = space();
				div66 = element("div");
				div66.textContent = "Events";
				t133 = space();
				div67 = element("div");
				div67.textContent = "on / off / onf";
				t135 = space();
				div68 = element("div");
				div68.textContent = "trg (trigger)";
				t137 = space();
				br0 = element("br");
				br1 = element("br");
				br2 = element("br");
				br3 = element("br");
				br4 = element("br");
				br5 = element("br");
				br6 = element("br");
				br7 = element("br");
				t138 = space();
				div69 = element("div");
				span1 = element("span");
				t139 = space();
				section4 = element("section");
				h1 = element("h1");
				span2 = element("span");
				t140 = text("sQuery Docs");
				div70 = element("div");
				div70.textContent = `${name}`;
				t142 = space();
				doc0 = element("doc");
				h20 = element("h2");
				h20.textContent = "Installation";
				t144 = space();
				div71 = element("div");
				t145 = text("Download ");
				a2 = element("a");
				a2.textContent = "sQuery.zip";
				t147 = text(" or use CDN. (");
				a3 = element("a");
				a3.textContent = "Github page";
				t149 = text(")");
				t150 = space();
				div74 = element("div");
				div73 = element("div");
				div72 = element("div");
				t151 = text("\n\t\t\t\t\tTo use sQuery, put squery.min.js somewhere just like jQuery. ");
				small0 = element("small");
				small0.textContent = "(NOTE: sq is equivalent to $ in jQuery)";
				t153 = space();
				create_component(sqi0.$$.fragment);
				t154 = space();
				div77 = element("div");
				div76 = element("div");
				div75 = element("div");
				t155 = text("Or you can also use CDN!");
				t156 = space();
				create_component(sqi1.$$.fragment);
				t157 = space();
				div80 = element("div");
				div79 = element("div");
				div78 = element("div");
				t158 = text("ES6 module is also supported! ");
				small1 = element("small");
				t159 = text("(NOTE: () =>｛ ｝ is the ES6's ");
				a4 = element("a");
				a4.textContent = "arrow function";
				t161 = text(")");
				t162 = space();
				create_component(sqi2.$$.fragment);
				t163 = space();
				div83 = element("div");
				div82 = element("div");
				div81 = element("div");
				t164 = text("ES6 module CDN!");
				t165 = space();
				create_component(sqi3.$$.fragment);
				t166 = space();
				doc1 = element("doc");
				h21 = element("h2");
				h21.textContent = "Difference between jQuery";
				t168 = space();
				div93 = element("div");
				t169 = text("sQuery is not a simple jQuery clone. It's made for using with modern frontend frameworks.\n\t\t\t\tThere are some differences between jQuery.\n\n\t\t\t\t");
				div92 = element("div");
				div84 = element("div");
				h30 = element("h3");
				h30.textContent = "sQuery uses sq not $. But you can customize!";
				t171 = space();
				p0 = element("p");
				t172 = text("sQuery avoids using $ since Svelte and jQuery use $.");
				br8 = element("br");
				t173 = text("\n\t\t\t\t\t\t\tActually, you ");
				b0 = element("b");
				b0.textContent = "can";
				t175 = text(" use $ in sQuery! See ");
				a5 = element("a");
				a5.textContent = "Use like jQuery";
				t177 = space();
				div85 = element("div");
				h31 = element("h3");
				h31.textContent = "sQuery doesn't have $.ajax function. Use fetch or axios instead";
				t179 = space();
				p1 = element("p");
				t180 = text("Since this is the modern trend, sQuery also doesn't have any ajax functions just like ");
				b1 = element("b");
				b1.textContent = "React/Vue/Svelte";
				t182 = text(" do.");
				br9 = element("br");
				t183 = text("\n\t\t\t\t\t\t\tYou should use ");
				a6 = element("a");
				a6.textContent = "axios";
				t185 = text(" or ");
				a7 = element("a");
				a7.textContent = "native fetch function";
				t187 = text(" not $.ajax.");
				t188 = space();
				div86 = element("div");
				h32 = element("h3");
				h32.textContent = "Never use :contains / :is / :visible";
				t190 = space();
				p2 = element("p");
				t191 = text(":contains in jQuery used to be very widely used. However it's been depricated in the latest jQuery.\n\t\t\t\t\t\t\t");
				br10 = element("br");
				br11 = element("br");
				t192 = space();
				b2 = element("b");
				b2.textContent = "$(\":contains('selector')\")";
				br12 = element("br");
				t194 = space();
				br13 = element("br");
				t195 = text("\n\t\t\t\t\t\t\tsQuery also doesn't support them for various performance reasons. Instead, sQuery just supports performant methods to do the same things just like the latest jQuery does.");
				br14 = element("br");
				t196 = space();
				br15 = element("br");
				t197 = space();
				b3 = element("b");
				t198 = text(".contains('selector')");
				br16 = element("br");
				t199 = text("\n\t\t\t\t\t\t\t\t.is('selector')");
				br17 = element("br");
				t200 = text("\n\t\t\t\t\t\t\t\t.isVisible('selector')");
				t201 = space();
				div87 = element("div");
				h33 = element("h3");
				h33.textContent = "Why sQuery doesn't support all the functions in jQuery?";
				t203 = space();
				p3 = element("p");
				t204 = text("sQuery has major core functions in jQuery.");
				br18 = element("br");
				t205 = text("\n\t\t\t\t\t\t\tHowever, it's not made for supporting everything.");
				br19 = element("br");
				t206 = text("\n\t\t\t\t\t\t\tsQuery is made for working with modern js frameworks such as ");
				b4 = element("b");
				b4.textContent = "React/Vue/Svelte/Angular";
				t208 = text(" with replacing lengthy vanilla JavaScript codes.");
				br20 = element("br");
				t209 = space();
				br21 = element("br");
				t210 = text("\n\t\t\t\t\t\t\tAs a result, with sQuery, the total code size could be smaller than without it especially in big projects.");
				br22 = element("br");
				t211 = text("\n\t\t\t\t\t\t\tIf sQuery supports all functions and all features in jQuery, the code size would be 3 times or something? It wouldn't be worthy at all!");
				br23 = element("br");
				t212 = text("\n\t\t\t\t\t\t\tThat's why I cut down all the unessential functions from jQuery since the purpose of sQuery is simple, solid, and small.");
				br24 = element("br");
				t213 = space();
				br25 = element("br");
				t214 = text("\n\t\t\t\t\t\t\tFor instance, let's assume the following scenario: sQuery + Vue.js:");
				br26 = element("br");
				t215 = text("\n\t\t\t\t\t\t\tThanks to sQuery, you can code just like jQuery, and you can also use the virtual DOM and auto code optimizations Vue provides.");
				br27 = element("br");
				t216 = text("\n\t\t\t\t\t\t\tIf you do DOM manipulations relatively a lot, sQuery doesn't increase the total code size as a result of cutting down of lengthy vanila JS codes, so you won't lose anything in this scenario.");
				t217 = space();
				div91 = element("div");
				h34 = element("h3");
				h34.textContent = "Adding custom methods to sQuery (just like jQuery $.)";
				t219 = space();
				p4 = element("p");
				small2 = element("small");
				small2.textContent = "NOTE: This is for maniacs. You don't even need to know this if you just want to use sQuery.";
				br28 = element("br");
				t221 = text("\n\t\t\t\t\t\t\tI didn't imprement unimportant methods in sQuery to keep it small and performant. \n\t\t\t\t\t\t\tHowever, if you need more methods, you can always very easily imprement on your own using _SQ.");
				t222 = space();
				div90 = element("div");
				div89 = element("div");
				div88 = element("div");
				t223 = text("\n\t\t\t\t\t\t\t\tCustom Methods");
				t224 = space();
				create_component(sqi4.$$.fragment);
				t225 = space();
				doc2 = element("doc");
				h22 = element("h2");
				h22.textContent = "Use like jQuery";
				t227 = space();
				div94 = element("div");
				t228 = text("sQuery might look awkward for jQuery fans since it uses sq not $.");
				br29 = element("br");
				t229 = text("\n\t\t\t\tActually, you can use $ very easily by just declaring $.");
				t230 = space();
				div99 = element("div");
				div96 = element("div");
				div95 = element("div");
				t231 = text("\n\t\t\t\t\tReplacing sq to $");
				t232 = space();
				create_component(sqi5.$$.fragment);
				t233 = space();
				div98 = element("div");
				div97 = element("div");
				t234 = text("\n\t\t\t\t\tReplacing sq to $ (module version)");
				t235 = space();
				create_component(sqi6.$$.fragment);
				t236 = space();
				doc3 = element("doc");
				h23 = element("h2");
				h23.textContent = "Use with React";
				t238 = space();
				div100 = element("div");
				t239 = text("Install ");
				a8 = element("a");
				a8.textContent = "node.js";
				t241 = text(" if you didn't install it.");
				br30 = element("br");
				t242 = text("\n\t\t\t\tOpen the terminal, and follow the ");
				a9 = element("a");
				a9.textContent = "create-react-app";
				t244 = text(" tutorial.");
				t245 = space();
				div105 = element("div");
				div101 = element("div");
				t246 = text("npx create-react-app@latest test");
				br31 = element("br");
				t247 = text("\n\t\t\t\t\tcd test");
				br32 = element("br");
				t248 = text("\n\t\t\t\t\tnpm start");
				br33 = element("br");
				t249 = text("\n\t\t\t\t*NOTE*: If you want to use ");
				a10 = element("a");
				a10.textContent = "TypeScript";
				t251 = text(", try this instead.\n\t\t\t\t");
				div102 = element("div");
				t252 = text("npx create-react-app@latest test --template typescript");
				br34 = element("br");
				t253 = text("\n\t\t\t\t\tcd test");
				br35 = element("br");
				t254 = text("\n\t\t\t\t\tnpm start");
				br36 = element("br");
				t255 = space();
				hr1 = element("hr");
				t256 = text("\n\n\t\t\t\tTo launch the site (development):\n\t\t\t\t");
				div103 = element("div");
				div103.textContent = "npm start";
				t258 = text("\n\n\t\t\t\tTo build the site (production):\n\t\t\t\t");
				div104 = element("div");
				div104.textContent = "npm run build";
				t260 = space();
				doc4 = element("doc");
				h24 = element("h2");
				h24.textContent = "Use with Vue.js";
				t262 = space();
				div106 = element("div");
				t263 = text("Go to see the ");
				a11 = element("a");
				a11.textContent = "official installation guide";
				t265 = text(" for now.");
				br37 = element("br");
				t266 = text("\n\t\t\t\tI'll update this section soon!");
				t267 = space();
				doc5 = element("doc");
				h25 = element("h2");
				h25.textContent = "Use with Svelte";
				t269 = space();
				div107 = element("div");
				t270 = text("Go to see the ");
				a12 = element("a");
				a12.textContent = "official installation guide";
				t272 = text(" for now.");
				br38 = element("br");
				t273 = text("\n\t\t\t\tI'll update this section soon!");
				t274 = space();
				doc6 = element("doc");
				h26 = element("h2");
				h26.textContent = "Use with SolidJS";
				t276 = space();
				div108 = element("div");
				t277 = text("Go to see the ");
				a13 = element("a");
				a13.textContent = "official installation guide";
				t279 = text(" for now.");
				br39 = element("br");
				t280 = text("\n\t\t\t\tI'll update this section soon!");
				t281 = space();
				doc7 = element("doc");
				h27 = element("h2");
				h27.textContent = "Use with Angular";
				t283 = space();
				div109 = element("div");
				t284 = text("Go to see the ");
				a14 = element("a");
				a14.textContent = "official installation guide";
				t286 = text(" for now.");
				br40 = element("br");
				t287 = text("\n\t\t\t\tI'll update this section soon!");
				t288 = space();
				doc8 = element("doc");
				h28 = element("h2");
				h28.textContent = "filter / not";
				t290 = space();
				div110 = element("div");
				t291 = text("filter: Reduce the set of matched elements to those that match the selector or pass the function's test. \n\t\t\t\t");
				span3 = element("span");
				t292 = space();
				div113 = element("div");
				div112 = element("div");
				div111 = element("div");
				t293 = text("\n\t\t\t\t\tFilter the elements");
				t294 = space();
				create_component(sqi7.$$.fragment);
				t295 = space();
				div114 = element("div");
				br41 = element("br");
				t296 = text("\n\t\t\t\tnot: The opposite version of filter. Remove elements from the set of matched elements. \n\t\t\t\t");
				span4 = element("span");
				t297 = space();
				div117 = element("div");
				div116 = element("div");
				div115 = element("div");
				t298 = text("\n\t\t\t\t\tFilter the non-matched elements");
				t299 = space();
				create_component(sqi8.$$.fragment);
				t300 = space();
				doc9 = element("doc");
				h29 = element("h2");
				h29.textContent = "eq";
				t302 = space();
				div118 = element("div");
				t303 = text("Reduce the set of matched elements to the one at the specified index. \n\t\t\t\t");
				span5 = element("span");
				t304 = space();
				div121 = element("div");
				div120 = element("div");
				div119 = element("div");
				t305 = text("\n\t\t\t\t\tReduce the set using an integer indicating the 0-based position of the element.");
				t306 = space();
				create_component(sqi9.$$.fragment);
				t307 = space();
				div122 = element("div");
				br42 = element("br");
				t308 = text("\n\t\t\t\tYou can also use a minus value! (Counting backwards from the last element in the set)");
				t309 = space();
				div125 = element("div");
				div124 = element("div");
				div123 = element("div");
				t310 = text("\n\t\t\t\t\tReduce the set using an integer indicating the position of the element, counting backwards from the last element in the set.");
				t311 = space();
				create_component(sqi10.$$.fragment);
				t312 = space();
				doc10 = element("doc");
				h210 = element("h2");
				h210.textContent = "first / last";
				t314 = space();
				div126 = element("div");
				t315 = text("first: Reduce the set of matched elements to the first in the set. \n\t\t\t\t");
				span6 = element("span");
				t316 = space();
				div129 = element("div");
				div128 = element("div");
				div127 = element("div");
				t317 = text("\n\t\t\t\t\tfirst");
				t318 = space();
				create_component(sqi11.$$.fragment);
				t319 = space();
				div130 = element("div");
				br43 = element("br");
				t320 = text("\n\t\t\t\tlast: Reduce the set of matched elements to the last in the set. \n\t\t\t\t");
				span7 = element("span");
				t321 = space();
				div133 = element("div");
				div132 = element("div");
				div131 = element("div");
				t322 = text("\n\t\t\t\t\tlast");
				t323 = space();
				create_component(sqi12.$$.fragment);
				t324 = space();
				doc11 = element("doc");
				h211 = element("h2");
				h211.textContent = "has";
				t326 = space();
				div134 = element("div");
				t327 = text("Returns boolean result of the selector argument against the collection.\n\t\t\t\t");
				span8 = element("span");
				t328 = space();
				div137 = element("div");
				div136 = element("div");
				div135 = element("div");
				t329 = text("\n\t\t\t\t\thas");
				t330 = space();
				create_component(sqi13.$$.fragment);
				t331 = space();
				doc12 = element("doc");
				h212 = element("h2");
				h212.textContent = "contains";
				t333 = space();
				div138 = element("div");
				t334 = text("Select all elements that contain the specified text.\n\t\t\t\t");
				span9 = element("span");
				t335 = space();
				div141 = element("div");
				div140 = element("div");
				div139 = element("div");
				t336 = text("\n\t\t\t\t\tcontains");
				t337 = space();
				create_component(sqi14.$$.fragment);
				t338 = space();
				doc13 = element("doc");
				h213 = element("h2");
				h213.textContent = "slice";
				t340 = space();
				div142 = element("div");
				t341 = text("Reduce the set of matched elements to a subset specified by a range of indices.\n\t\t\t\t");
				span10 = element("span");
				t342 = space();
				div145 = element("div");
				div144 = element("div");
				div143 = element("div");
				t343 = text("\n\t\t\t\t\tslice");
				t344 = space();
				create_component(sqi15.$$.fragment);
				t345 = space();
				doc14 = element("doc");
				h214 = element("h2");
				h214.textContent = "index";
				t347 = space();
				div146 = element("div");
				t348 = text("Returns the index of the element in its parent\n\t\t\t\t");
				span11 = element("span");
				t349 = space();
				div149 = element("div");
				div148 = element("div");
				div147 = element("div");
				t350 = text("\n\t\t\t\t\tindex");
				t351 = space();
				create_component(sqi16.$$.fragment);
				t352 = space();
				doc15 = element("doc");
				h215 = element("h2");
				h215.textContent = "is";
				t354 = space();
				div150 = element("div");
				t355 = text("Returns whether the provided selector matches the first element in the collection.\n\t\t\t\t");
				span12 = element("span");
				t356 = space();
				div153 = element("div");
				div152 = element("div");
				div151 = element("div");
				t357 = text("\n\t\t\t\t\t.is( selector )");
				t358 = space();
				create_component(sqi17.$$.fragment);
				t359 = space();
				doc16 = element("doc");
				h216 = element("h2");
				h216.textContent = "find";
				t361 = space();
				div154 = element("div");
				t362 = text("Returns selector match descendants from the first element in the collection.\n\t\t\t\t");
				span13 = element("span");
				t363 = space();
				div157 = element("div");
				div156 = element("div");
				div155 = element("div");
				t364 = text("\n\t\t\t\t\t.find( selector )");
				t365 = space();
				create_component(sqi18.$$.fragment);
				t366 = space();
				doc17 = element("doc");
				h217 = element("h2");
				h217.textContent = "children";
				t368 = space();
				div158 = element("div");
				t369 = text("Returns a collection of child elements\n\t\t\t\t");
				span14 = element("span");
				t370 = space();
				div161 = element("div");
				div160 = element("div");
				div159 = element("div");
				t371 = text("\n\t\t\t\t\t.children( selector )");
				t372 = space();
				create_component(sqi19.$$.fragment);
				t373 = space();
				doc18 = element("doc");
				h218 = element("h2");
				h218.textContent = "next / prev";
				t375 = space();
				div162 = element("div");
				t376 = text("next: Returns next sibling\n\t\t\t\t");
				span15 = element("span");
				t377 = space();
				div165 = element("div");
				div164 = element("div");
				div163 = element("div");
				t378 = text("\n\t\t\t\t\tnext");
				t379 = space();
				create_component(sqi20.$$.fragment);
				t380 = space();
				div166 = element("div");
				br44 = element("br");
				t381 = text("\n\t\t\t\tprev: Returns the previous adjacent element.\n\t\t\t\t");
				span16 = element("span");
				t382 = space();
				div169 = element("div");
				div168 = element("div");
				div167 = element("div");
				t383 = text("\n\t\t\t\t\tprev");
				t384 = space();
				create_component(sqi21.$$.fragment);
				t385 = space();
				doc19 = element("doc");
				h219 = element("h2");
				h219.textContent = "siblings";
				t387 = space();
				div170 = element("div");
				t388 = text("Returns a collection of sibling elements.\n\t\t\t\t");
				span17 = element("span");
				t389 = space();
				div173 = element("div");
				div172 = element("div");
				div171 = element("div");
				t390 = text("\n\t\t\t\t\tsiblings");
				t391 = space();
				create_component(sqi22.$$.fragment);
				t392 = space();
				doc20 = element("doc");
				h220 = element("h2");
				h220.textContent = "parent / parents";
				t394 = space();
				div174 = element("div");
				t395 = text("parent: Returns parent element.\n\t\t\t\t");
				span18 = element("span");
				t396 = space();
				div177 = element("div");
				div176 = element("div");
				div175 = element("div");
				t397 = text("\n\t\t\t\t\tparent");
				t398 = space();
				create_component(sqi23.$$.fragment);
				t399 = space();
				div178 = element("div");
				br45 = element("br");
				t400 = text("\n\t\t\t\tparents: Returns recursive parent by selector.\n\t\t\t\t");
				span19 = element("span");
				t401 = space();
				div181 = element("div");
				div180 = element("div");
				div179 = element("div");
				t402 = text("\n\t\t\t\t\tparents");
				t403 = space();
				create_component(sqi24.$$.fragment);
				t404 = space();
				doc21 = element("doc");
				h221 = element("h2");
				h221.textContent = "closest";
				t406 = space();
				div182 = element("div");
				t407 = text("Returns the closest matching selector up the DOM tree.\n\t\t\t\t");
				span20 = element("span");
				t408 = space();
				div185 = element("div");
				div184 = element("div");
				div183 = element("div");
				t409 = text("\n\t\t\t\t\tclosest");
				t410 = space();
				create_component(sqi25.$$.fragment);
				t411 = space();
				doc22 = element("doc");
				h222 = element("h2");
				h222.textContent = "hasClass";
				t413 = space();
				div186 = element("div");
				t414 = text("Returns the boolean result of checking if the first element in the collection has the className attribute.\n\t\t\t\t");
				span21 = element("span");
				t415 = space();
				div189 = element("div");
				div188 = element("div");
				div187 = element("div");
				t416 = text("\n\t\t\t\t\thasClass");
				t417 = space();
				create_component(sqi26.$$.fragment);
				t418 = space();
				doc23 = element("doc");
				h223 = element("h2");
				h223.textContent = "isVisible";
				t420 = space();
				div190 = element("div");
				t421 = text("Returns boolean result of the selector argument's visibility\n\t\t\t\t");
				span22 = element("span");
				t422 = space();
				div193 = element("div");
				div192 = element("div");
				div191 = element("div");
				t423 = text("\n\t\t\t\t\tisVisible");
				t424 = space();
				create_component(sqi27.$$.fragment);
				t425 = space();
				doc24 = element("doc");
				h224 = element("h2");
				h224.textContent = "isPageLoaded";
				t427 = space();
				div194 = element("div");
				t428 = text("Returns boolean result of the page loading\n\t\t\t\t");
				span23 = element("span");
				t429 = space();
				div197 = element("div");
				div196 = element("div");
				div195 = element("div");
				t430 = text("\n\t\t\t\t\tisPageLoaded");
				t431 = space();
				create_component(sqi28.$$.fragment);
				t432 = space();
				doc25 = element("doc");
				h225 = element("h2");
				h225.textContent = "html";
				t434 = space();
				div198 = element("div");
				t435 = text("Returns the HTML text of the first element in the collection, sets the HTML if provided.\n\t\t\t\t");
				span24 = element("span");
				t436 = space();
				div201 = element("div");
				div200 = element("div");
				div199 = element("div");
				t437 = text("\n\t\t\t\t\thtml");
				t438 = space();
				create_component(sqi29.$$.fragment);
				t439 = space();
				doc26 = element("doc");
				h226 = element("h2");
				h226.textContent = "text";
				t441 = space();
				div202 = element("div");
				t442 = text("Returns the inner text of the first element in the collection, sets the text if textContent is provided.\n\t\t\t\t");
				span25 = element("span");
				t443 = space();
				div205 = element("div");
				div204 = element("div");
				div203 = element("div");
				t444 = text("\n\t\t\t\t\ttext");
				t445 = space();
				create_component(sqi30.$$.fragment);
				t446 = space();
				doc27 = element("doc");
				h227 = element("h2");
				h227.textContent = "val";
				t448 = space();
				div206 = element("div");
				t449 = text("Returns an inputs value. If value is supplied, sets all inputs in collection's value to the value argument.\n\t\t\t\t");
				span26 = element("span");
				t450 = space();
				div209 = element("div");
				div208 = element("div");
				div207 = element("div");
				t451 = text("\n\t\t\t\t\tval");
				t452 = space();
				create_component(sqi31.$$.fragment);
				t453 = space();
				doc28 = element("doc");
				h228 = element("h2");
				h228.textContent = "css";
				t455 = space();
				div210 = element("div");
				t456 = text("Returns a CSS property value when just property is supplied. Sets a CSS property when property and value are supplied, and set multiple properties when an object is supplied.\n\t\t\t\t");
				span27 = element("span");
				t457 = space();
				div213 = element("div");
				div212 = element("div");
				div211 = element("div");
				t458 = text("\n\t\t\t\t\tcss(property) / css(property, value) / css(object)");
				t459 = space();
				create_component(sqi32.$$.fragment);
				t460 = space();
				doc29 = element("doc");
				h229 = element("h2");
				h229.textContent = "attr";
				t462 = space();
				div214 = element("div");
				t463 = text("Without attrValue, returns the attribute value of the first element in the collection. With attrValue, sets the attribute value of each element of the collection.\n\t\t\t\t");
				span28 = element("span");
				t464 = space();
				div217 = element("div");
				div216 = element("div");
				div215 = element("div");
				t465 = text("\n\t\t\t\t\tattr");
				t466 = space();
				create_component(sqi33.$$.fragment);
				t467 = space();
				doc30 = element("doc");
				h230 = element("h2");
				h230.textContent = "prop";
				t469 = space();
				div218 = element("div");
				t470 = text("Without a value, returns the prop value of the first element in the collection. With a value, sets the prop value of each element of the collection.\n\t\t\t\t");
				span29 = element("span");
				t471 = space();
				div221 = element("div");
				div220 = element("div");
				div219 = element("div");
				t472 = text("\n\t\t\t\t\tprop");
				t473 = space();
				create_component(sqi34.$$.fragment);
				t474 = space();
				doc31 = element("doc");
				h231 = element("h2");
				h231.textContent = "get";
				t476 = space();
				div222 = element("div");
				t477 = text("Returns the element at the index\n\t\t\t\t");
				span30 = element("span");
				t478 = space();
				div225 = element("div");
				div224 = element("div");
				div223 = element("div");
				t479 = text("\n\t\t\t\t\tget");
				t480 = space();
				create_component(sqi35.$$.fragment);
				t481 = space();
				doc32 = element("doc");
				h232 = element("h2");
				h232.textContent = "show / hide";
				t483 = space();
				div226 = element("div");
				t484 = text("show: Shows the specified elements\n\t\t\t\t");
				span31 = element("span");
				t485 = space();
				div229 = element("div");
				div228 = element("div");
				div227 = element("div");
				t486 = text("\n\t\t\t\t\tshow");
				t487 = space();
				create_component(sqi36.$$.fragment);
				t488 = space();
				div230 = element("div");
				br46 = element("br");
				t489 = text("\n\t\t\t\thide: Hides the specified elements\n\t\t\t\t");
				span32 = element("span");
				t490 = space();
				div233 = element("div");
				div232 = element("div");
				div231 = element("div");
				t491 = text("\n\t\t\t\t\thide");
				t492 = space();
				create_component(sqi37.$$.fragment);
				t493 = space();
				doc33 = element("doc");
				h233 = element("h2");
				h233.textContent = "remove";
				t495 = space();
				div234 = element("div");
				t496 = text("Removes the specified elements\n\t\t\t\t");
				span33 = element("span");
				t497 = space();
				div237 = element("div");
				div236 = element("div");
				div235 = element("div");
				t498 = text("\n\t\t\t\t\tremove");
				t499 = space();
				create_component(sqi38.$$.fragment);
				t500 = space();
				doc34 = element("doc");
				h234 = element("h2");
				h234.textContent = "before / after";
				t502 = space();
				div238 = element("div");
				t503 = text("before: Insert content, specified by the parameter, before each element in the set of matched elements.\n\t\t\t\t");
				span34 = element("span");
				t504 = space();
				div241 = element("div");
				div240 = element("div");
				div239 = element("div");
				t505 = text("\n\t\t\t\t\tbefore");
				t506 = space();
				create_component(sqi39.$$.fragment);
				t507 = space();
				div242 = element("div");
				br47 = element("br");
				t508 = text("\n\t\t\t\tafter: Insert content, specified by the parameter, after each element in the set of matched elements.\n\t\t\t\t");
				span35 = element("span");
				t509 = space();
				div245 = element("div");
				div244 = element("div");
				div243 = element("div");
				t510 = text("\n\t\t\t\t\tafter");
				t511 = space();
				create_component(sqi40.$$.fragment);
				t512 = space();
				doc35 = element("doc");
				h235 = element("h2");
				h235.textContent = "prepend / append";
				t514 = space();
				div246 = element("div");
				t515 = text("prepend: \n\t\t\t\t");
				span36 = element("span");
				t516 = space();
				div249 = element("div");
				div248 = element("div");
				div247 = element("div");
				t517 = text("\n\t\t\t\t\tprepend");
				t518 = space();
				create_component(sqi41.$$.fragment);
				t519 = space();
				div250 = element("div");
				br48 = element("br");
				t520 = text("\n\t\t\t\tappend: \n\t\t\t\t");
				span37 = element("span");
				t521 = space();
				div253 = element("div");
				div252 = element("div");
				div251 = element("div");
				t522 = text("\n\t\t\t\t\tappend");
				t523 = space();
				create_component(sqi42.$$.fragment);
				t524 = space();
				doc36 = element("doc");
				h236 = element("h2");
				h236.textContent = "replaceWith";
				t526 = space();
				div254 = element("div");
				t527 = text("aaa\n\t\t\t\t");
				span38 = element("span");
				t528 = space();
				div257 = element("div");
				div256 = element("div");
				div255 = element("div");
				t529 = text("\n\t\t\t\t\treplaceWith");
				t530 = space();
				create_component(sqi43.$$.fragment);
				t531 = space();
				doc37 = element("doc");
				h237 = element("h2");
				h237.textContent = "addClass / removeClass";
				t533 = space();
				div258 = element("div");
				t534 = text("addClass: \n\t\t\t\t");
				span39 = element("span");
				t535 = space();
				div261 = element("div");
				div260 = element("div");
				div259 = element("div");
				t536 = text("\n\t\t\t\t\taddClass");
				t537 = space();
				create_component(sqi44.$$.fragment);
				t538 = space();
				div262 = element("div");
				br49 = element("br");
				t539 = text("\n\t\t\t\tremoveClass: \n\t\t\t\t");
				span40 = element("span");
				t540 = space();
				div265 = element("div");
				div264 = element("div");
				div263 = element("div");
				t541 = text("\n\t\t\t\t\tremoveClass");
				t542 = space();
				create_component(sqi45.$$.fragment);
				t543 = space();
				doc38 = element("doc");
				h238 = element("h2");
				h238.textContent = "toggleClass";
				t545 = space();
				div266 = element("div");
				t546 = text("aaa\n\t\t\t\t");
				span41 = element("span");
				t547 = space();
				div269 = element("div");
				div268 = element("div");
				div267 = element("div");
				t548 = text("\n\t\t\t\t\ttoggleClass");
				t549 = space();
				create_component(sqi46.$$.fragment);
				t550 = space();
				doc39 = element("doc");
				h239 = element("h2");
				h239.textContent = "width / height";
				t552 = space();
				div270 = element("div");
				t553 = text("aaa\n\t\t\t\t");
				span42 = element("span");
				t554 = space();
				div273 = element("div");
				div272 = element("div");
				div271 = element("div");
				t555 = text("\n\t\t\t\t\twidth / height");
				t556 = space();
				create_component(sqi47.$$.fragment);
				t557 = space();
				doc40 = element("doc");
				h240 = element("h2");
				h240.textContent = "innerWidth / innerHeight";
				t559 = space();
				div274 = element("div");
				t560 = text("aaa\n\t\t\t\t");
				span43 = element("span");
				t561 = space();
				div277 = element("div");
				div276 = element("div");
				div275 = element("div");
				t562 = text("\n\t\t\t\t\tinnerWidth / innerHeight");
				t563 = space();
				create_component(sqi48.$$.fragment);
				t564 = space();
				doc41 = element("doc");
				h241 = element("h2");
				h241.textContent = "outerWidth / outerHeight";
				t566 = space();
				div278 = element("div");
				t567 = text("aaa\n\t\t\t\t");
				span44 = element("span");
				t568 = space();
				div281 = element("div");
				div280 = element("div");
				div279 = element("div");
				t569 = text("\n\t\t\t\t\touterWidth / outerHeight");
				t570 = space();
				create_component(sqi49.$$.fragment);
				t571 = space();
				doc42 = element("doc");
				h242 = element("h2");
				h242.textContent = "offset";
				t573 = space();
				div282 = element("div");
				t574 = text("aaa\n\t\t\t\t");
				span45 = element("span");
				t575 = space();
				div285 = element("div");
				div284 = element("div");
				div283 = element("div");
				t576 = text("\n\t\t\t\t\toffset");
				t577 = space();
				create_component(sqi50.$$.fragment);
				t578 = space();
				doc43 = element("doc");
				h243 = element("h2");
				h243.textContent = "pos (position)";
				t580 = space();
				div286 = element("div");
				t581 = text("aaa\n\t\t\t\t");
				span46 = element("span");
				t582 = space();
				div289 = element("div");
				div288 = element("div");
				div287 = element("div");
				t583 = text("\n\t\t\t\t\tpos (position)");
				t584 = space();
				create_component(sqi51.$$.fragment);
				t585 = space();
				doc44 = element("doc");
				h244 = element("h2");
				h244.textContent = "fadeIn / fadeOut";
				t587 = space();
				div290 = element("div");
				t588 = text("aaa\n\t\t\t\t");
				span47 = element("span");
				t589 = space();
				div293 = element("div");
				div292 = element("div");
				div291 = element("div");
				t590 = text("\n\t\t\t\t\tfadeIn / fadeOut");
				t591 = space();
				create_component(sqi52.$$.fragment);
				t592 = space();
				doc45 = element("doc");
				h245 = element("h2");
				h245.textContent = "animate";
				t594 = space();
				div294 = element("div");
				t595 = text("aaa\n\t\t\t\t");
				span48 = element("span");
				t596 = space();
				div297 = element("div");
				div296 = element("div");
				div295 = element("div");
				t597 = text("\n\t\t\t\t\tanimate");
				t598 = space();
				create_component(sqi53.$$.fragment);
				t599 = space();
				doc46 = element("doc");
				h246 = element("h2");
				h246.textContent = "scroll";
				t601 = space();
				div298 = element("div");
				t602 = text("aaa\n\t\t\t\t");
				span49 = element("span");
				t603 = space();
				div301 = element("div");
				div300 = element("div");
				div299 = element("div");
				t604 = text("\n\t\t\t\t\tscroll");
				t605 = space();
				create_component(sqi54.$$.fragment);
				t606 = space();
				doc47 = element("doc");
				h247 = element("h2");
				h247.textContent = "scrollTop / scrollLeft";
				t608 = space();
				div302 = element("div");
				t609 = text("aaa\n\t\t\t\t");
				span50 = element("span");
				t610 = space();
				div305 = element("div");
				div304 = element("div");
				div303 = element("div");
				t611 = text("\n\t\t\t\t\tscrollTop / scrollLeft");
				t612 = space();
				create_component(sqi55.$$.fragment);
				t613 = space();
				doc48 = element("doc");
				h248 = element("h2");
				h248.textContent = "scrollToElement";
				t615 = space();
				div306 = element("div");
				t616 = text("aaa\n\t\t\t\t");
				span51 = element("span");
				t617 = space();
				div309 = element("div");
				div308 = element("div");
				div307 = element("div");
				t618 = text("\n\t\t\t\t\tscrollToElement");
				t619 = space();
				create_component(sqi56.$$.fragment);
				t620 = space();
				doc49 = element("doc");
				h249 = element("h2");
				h249.textContent = "each";
				t622 = space();
				div310 = element("div");
				t623 = text("aaa\n\t\t\t\t");
				span52 = element("span");
				t624 = space();
				div313 = element("div");
				div312 = element("div");
				div311 = element("div");
				t625 = text("\n\t\t\t\t\teach");
				t626 = space();
				create_component(sqi57.$$.fragment);
				t627 = space();
				doc50 = element("doc");
				h250 = element("h2");
				h250.textContent = "on / off / onf";
				t629 = space();
				div314 = element("div");
				t630 = text("aaa\n\t\t\t\t");
				span53 = element("span");
				t631 = space();
				div317 = element("div");
				div316 = element("div");
				div315 = element("div");
				t632 = text("\n\t\t\t\t\ton / off / onf");
				t633 = space();
				create_component(sqi58.$$.fragment);
				t634 = space();
				doc51 = element("doc");
				h251 = element("h2");
				h251.textContent = "trg (trigger)";
				t636 = space();
				div318 = element("div");
				t637 = text("aaa\n\t\t\t\t");
				span54 = element("span");
				t638 = space();
				div321 = element("div");
				div320 = element("div");
				div319 = element("div");
				t639 = text("\n\t\t\t\t\ttrg (trigger)");
				t640 = space();
				create_component(sqi59.$$.fragment);
				attr_dev(link0, "rel", "stylesheet");
				attr_dev(link0, "href", "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-tomorrow.min.css");
				add_location(link0, file$1, 27, 1, 583);
				if (!src_url_equal(script.src, script_src_value = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js")) attr_dev(script, "src", script_src_value);
				add_location(script, file$1, 28, 1, 697);
				attr_dev(link1, "rel", "stylesheet");
				attr_dev(link1, "href", "./Docs.css");
				add_location(link1, file$1, 29, 1, 787);
				attr_dev(span0, "id", "idDocNav");
				add_location(span0, file$1, 31, 2, 854);
				attr_dev(a0, "href", "https://squery-vercel-app.translate.goog/?&_x_tr_sl=auto&_x_tr_tl=ja&_x_tr_hl=en&_x_tr_pto=wapp#/docs");
				set_style(a0, "color", "#fff", 1);
				add_location(a0, file$1, 32, 45, 927);
				set_style(div0, "float", "right");
				set_style(div0, "margin-right", "20px");
				add_location(div0, file$1, 32, 2, 884);
				attr_dev(section0, "id", "idHead");
				add_location(section0, file$1, 30, 1, 830);
				attr_dev(a1, "href", "./");
				set_style(a1, "color", "#fff");
				add_location(a1, file$1, 37, 44, 1194);
				attr_dev(div1, "id", "idLeftLogo");
				attr_dev(div1, "class", "notranslate");
				add_location(div1, file$1, 37, 3, 1153);
				add_location(hr0, file$1, 40, 4, 1286);
				attr_dev(input, "id", "idDS");
				attr_dev(input, "type", "text");
				attr_dev(input, "placeholder", "search docs");
				attr_dev(input, "autocorrect", "off");
				attr_dev(input, "autocapitalize", "off");
				attr_dev(input, "spellcheck", "false");
				add_location(input, file$1, 42, 5, 1332);
				attr_dev(div2, "id", "idDSC");
				add_location(div2, file$1, 43, 5, 1451);
				set_style(div3, "position", "relative");
				add_location(div3, file$1, 41, 4, 1295);
				attr_dev(div4, "id", "idLeftSearchCont");
				add_location(div4, file$1, 39, 3, 1254);
				attr_dev(section1, "id", "idLeftTop");
				add_location(section1, file$1, 36, 2, 1125);
				attr_dev(div5, "name", "");
				attr_dev(div5, "class", "cSub");
				add_location(div5, file$1, 50, 4, 1585);
				attr_dev(div6, "name", "Installation");
				attr_dev(div6, "class", "cF");
				add_location(div6, file$1, 51, 4, 1637);
				attr_dev(div7, "name", "Difference_between_jQuery");
				attr_dev(div7, "class", "cF");
				add_location(div7, file$1, 52, 4, 1697);
				attr_dev(div8, "name", "Use_with_jQuery");
				attr_dev(div8, "class", "cF");
				add_location(div8, file$1, 53, 4, 1783);
				attr_dev(div9, "name", "Use_with_React");
				attr_dev(div9, "class", "cF");
				add_location(div9, file$1, 54, 4, 1849);
				attr_dev(div10, "name", "Use_with_Vue");
				attr_dev(div10, "class", "cF");
				add_location(div10, file$1, 55, 4, 1913);
				attr_dev(div11, "name", "Use_with_Svelte");
				attr_dev(div11, "class", "cF");
				add_location(div11, file$1, 56, 4, 1976);
				attr_dev(div12, "name", "Use_with_SolidJS");
				attr_dev(div12, "class", "cF");
				add_location(div12, file$1, 57, 4, 2042);
				attr_dev(div13, "name", "Use_with_Angular");
				attr_dev(div13, "class", "cF");
				add_location(div13, file$1, 58, 4, 2110);
				set_style(div14, "font-weight", "300");
				add_location(div14, file$1, 49, 3, 1551);
				attr_dev(div15, "name", "");
				attr_dev(div15, "class", "cSub");
				add_location(div15, file$1, 61, 3, 2189);
				attr_dev(div16, "name", "filter-not");
				attr_dev(div16, "class", "cF notranslate");
				add_location(div16, file$1, 62, 3, 2239);
				attr_dev(div17, "name", "eq");
				attr_dev(div17, "class", "cF notranslate");
				add_location(div17, file$1, 63, 3, 2307);
				attr_dev(div18, "name", "first-last");
				attr_dev(div18, "class", "cF notranslate");
				add_location(div18, file$1, 64, 3, 2357);
				attr_dev(div19, "name", "has");
				attr_dev(div19, "class", "cF notranslate");
				add_location(div19, file$1, 65, 3, 2425);
				attr_dev(div20, "name", "contains");
				attr_dev(div20, "class", "cF notranslate");
				add_location(div20, file$1, 66, 3, 2477);
				attr_dev(div21, "name", "slice");
				attr_dev(div21, "class", "cF notranslate");
				add_location(div21, file$1, 67, 3, 2539);
				attr_dev(div22, "name", "index");
				attr_dev(div22, "class", "cF notranslate");
				add_location(div22, file$1, 68, 3, 2595);
				attr_dev(div23, "name", "is");
				attr_dev(div23, "class", "cF notranslate");
				add_location(div23, file$1, 69, 3, 2651);
				attr_dev(div24, "name", "");
				attr_dev(div24, "class", "cSub");
				add_location(div24, file$1, 71, 3, 2703);
				attr_dev(div25, "name", "find");
				attr_dev(div25, "class", "cF notranslate");
				add_location(div25, file$1, 72, 3, 2753);
				attr_dev(div26, "name", "children");
				attr_dev(div26, "class", "cF notranslate");
				add_location(div26, file$1, 73, 3, 2807);
				attr_dev(div27, "name", "");
				attr_dev(div27, "class", "cSub");
				add_location(div27, file$1, 75, 3, 2871);
				attr_dev(div28, "name", "next-prev");
				attr_dev(div28, "class", "cF notranslate");
				add_location(div28, file$1, 76, 3, 2923);
				attr_dev(div29, "name", "siblings");
				attr_dev(div29, "class", "cF notranslate");
				add_location(div29, file$1, 77, 3, 2989);
				attr_dev(div30, "class", "cSub");
				add_location(div30, file$1, 79, 3, 3053);
				attr_dev(div31, "name", "parent-parents");
				attr_dev(div31, "class", "cF notranslate");
				add_location(div31, file$1, 80, 3, 3096);
				attr_dev(div32, "name", "closest");
				attr_dev(div32, "class", "cF notranslate");
				add_location(div32, file$1, 81, 3, 3172);
				attr_dev(div33, "name", "");
				attr_dev(div33, "class", "cSub");
				add_location(div33, file$1, 83, 3, 3233);
				attr_dev(div34, "name", "hasClass");
				attr_dev(div34, "class", "cF notranslate");
				add_location(div34, file$1, 84, 3, 3283);
				attr_dev(div35, "name", "isVisible");
				attr_dev(div35, "class", "cF notranslate");
				add_location(div35, file$1, 85, 3, 3345);
				attr_dev(div36, "name", "isPageLoaded");
				attr_dev(div36, "class", "cF notranslate");
				add_location(div36, file$1, 86, 3, 3409);
				attr_dev(div37, "name", "");
				attr_dev(div37, "class", "cSub");
				add_location(div37, file$1, 89, 3, 3484);
				attr_dev(div38, "name", "html");
				attr_dev(div38, "class", "cF notranslate");
				add_location(div38, file$1, 90, 3, 3530);
				attr_dev(div39, "name", "text");
				attr_dev(div39, "class", "cF notranslate");
				add_location(div39, file$1, 91, 3, 3584);
				attr_dev(div40, "name", "val");
				attr_dev(div40, "class", "cF notranslate");
				add_location(div40, file$1, 92, 3, 3638);
				attr_dev(div41, "name", "css");
				attr_dev(div41, "class", "cF notranslate");
				add_location(div41, file$1, 93, 3, 3690);
				attr_dev(div42, "name", "attr");
				attr_dev(div42, "class", "cF notranslate");
				add_location(div42, file$1, 94, 3, 3742);
				attr_dev(div43, "name", "prop");
				attr_dev(div43, "class", "cF notranslate");
				add_location(div43, file$1, 95, 3, 3796);
				attr_dev(div44, "name", "get");
				attr_dev(div44, "class", "cF notranslate");
				add_location(div44, file$1, 96, 3, 3850);
				attr_dev(div45, "name", "show-hide");
				attr_dev(div45, "class", "cF notranslate");
				add_location(div45, file$1, 97, 3, 3902);
				attr_dev(div46, "name", "remove");
				attr_dev(div46, "class", "cF notranslate");
				add_location(div46, file$1, 98, 3, 3968);
				attr_dev(div47, "name", "before-after");
				attr_dev(div47, "class", "cF notranslate");
				add_location(div47, file$1, 99, 3, 4026);
				attr_dev(div48, "name", "prepend-append");
				attr_dev(div48, "class", "cF notranslate");
				add_location(div48, file$1, 100, 3, 4098);
				attr_dev(div49, "name", "replaceWith");
				attr_dev(div49, "class", "cF notranslate");
				add_location(div49, file$1, 101, 3, 4174);
				attr_dev(div50, "name", "addClass-removeClass");
				attr_dev(div50, "class", "cF notranslate");
				add_location(div50, file$1, 102, 3, 4242);
				attr_dev(div51, "name", "toggleClass");
				attr_dev(div51, "class", "cF notranslate");
				add_location(div51, file$1, 103, 3, 4330);
				attr_dev(div52, "name", "");
				attr_dev(div52, "class", "cSub");
				add_location(div52, file$1, 105, 3, 4399);
				attr_dev(div53, "name", "width-height");
				attr_dev(div53, "class", "cF notranslate");
				add_location(div53, file$1, 106, 3, 4450);
				attr_dev(div54, "name", "innerWidth-innerHeight");
				attr_dev(div54, "class", "cF notranslate");
				add_location(div54, file$1, 107, 3, 4522);
				attr_dev(div55, "name", "outerWidth-outerHeight");
				attr_dev(div55, "class", "cF notranslate");
				add_location(div55, file$1, 108, 3, 4614);
				attr_dev(div56, "name", "offset");
				attr_dev(div56, "class", "cF notranslate");
				add_location(div56, file$1, 109, 3, 4706);
				attr_dev(div57, "name", "pos-position");
				attr_dev(div57, "class", "cF notranslate");
				add_location(div57, file$1, 110, 3, 4764);
				attr_dev(div58, "name", "");
				attr_dev(div58, "class", "cSub");
				add_location(div58, file$1, 112, 3, 4840);
				attr_dev(div59, "name", "fadeIn-fadeOut");
				attr_dev(div59, "class", "cF notranslate");
				add_location(div59, file$1, 113, 3, 4886);
				attr_dev(div60, "name", "animate");
				attr_dev(div60, "class", "cF notranslate");
				add_location(div60, file$1, 114, 3, 4962);
				attr_dev(div61, "name", "scroll");
				attr_dev(div61, "class", "cF notranslate");
				add_location(div61, file$1, 115, 3, 5022);
				attr_dev(div62, "name", "scrollTop-scrollLeft");
				attr_dev(div62, "class", "cF notranslate");
				add_location(div62, file$1, 116, 3, 5080);
				attr_dev(div63, "name", "scrollToElement");
				attr_dev(div63, "class", "cF notranslate");
				add_location(div63, file$1, 117, 3, 5168);
				attr_dev(div64, "name", "");
				attr_dev(div64, "class", "cSub");
				add_location(div64, file$1, 119, 3, 5245);
				attr_dev(div65, "name", "each");
				attr_dev(div65, "class", "cF notranslate");
				add_location(div65, file$1, 120, 3, 5286);
				attr_dev(div66, "name", "");
				attr_dev(div66, "class", "cSub");
				add_location(div66, file$1, 122, 3, 5341);
				attr_dev(div67, "name", "on-off-onf");
				attr_dev(div67, "class", "cF notranslate");
				add_location(div67, file$1, 123, 3, 5383);
				attr_dev(div68, "name", "trg-trigger");
				attr_dev(div68, "class", "cF notranslate");
				add_location(div68, file$1, 124, 3, 5453);
				add_location(br0, file$1, 126, 3, 5524);
				add_location(br1, file$1, 126, 7, 5528);
				add_location(br2, file$1, 126, 11, 5532);
				add_location(br3, file$1, 126, 15, 5536);
				add_location(br4, file$1, 126, 19, 5540);
				add_location(br5, file$1, 126, 23, 5544);
				add_location(br6, file$1, 126, 27, 5548);
				add_location(br7, file$1, 126, 31, 5552);
				attr_dev(section2, "class", "cScrollable");
				add_location(section2, file$1, 48, 2, 1518);
				attr_dev(section3, "id", "idLeft");
				add_location(section3, file$1, 35, 1, 1101);
				add_location(span1, file$1, 131, 28, 5613);
				attr_dev(div69, "class", "menu__toggler");
				add_location(div69, file$1, 131, 1, 5586);
				add_location(div70, file$1, 134, 76, 5732);
				attr_dev(span2, "onclick", "location.href='./';");
				set_style(span2, "cursor", "pointer");
				add_location(span2, file$1, 134, 6, 5662);
				add_location(h1, file$1, 134, 2, 5658);
				add_location(h20, file$1, 137, 3, 5794);
				attr_dev(a2, "href", "https://github.com/exis9/sQuery/archive/refs/heads/main.zip");
				attr_dev(a2, "target", "_blank");
				set_style(a2, "font-size", "18px");
				add_location(a2, file$1, 139, 13, 5855);
				attr_dev(a3, "href", "https://github.com/exis9/sQuery");
				attr_dev(a3, "target", "_blank");
				add_location(a3, file$1, 139, 148, 5990);
				attr_dev(div71, "class", "cPreDesc");
				add_location(div71, file$1, 138, 3, 5819);
				attr_dev(div72, "class", "cBack");
				add_location(div72, file$1, 143, 5, 6113);
				add_location(small0, file$1, 144, 66, 6205);
				attr_dev(div73, "class", "cDesc");
				add_location(div73, file$1, 142, 4, 6088);
				add_location(div74, file$1, 141, 3, 6078);
				attr_dev(div75, "class", "cBack");
				add_location(div75, file$1, 149, 23, 6389);
				attr_dev(div76, "class", "cDesc");
				add_location(div76, file$1, 149, 4, 6370);
				set_style(div77, "margin-top", "30px");
				add_location(div77, file$1, 148, 3, 6336);
				attr_dev(div78, "class", "cBack");
				add_location(div78, file$1, 153, 23, 6551);
				attr_dev(a4, "href", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions");
				attr_dev(a4, "target", "_blank");
				add_location(a4, file$1, 153, 114, 6642);
				add_location(small1, file$1, 153, 78, 6606);
				attr_dev(div79, "class", "cDesc");
				add_location(div79, file$1, 153, 4, 6532);
				set_style(div80, "margin-top", "30px");
				add_location(div80, file$1, 152, 3, 6498);
				attr_dev(div81, "class", "cBack");
				add_location(div81, file$1, 157, 23, 6894);
				attr_dev(div82, "class", "cDesc");
				add_location(div82, file$1, 157, 4, 6875);
				set_style(div83, "margin-top", "30px");
				add_location(div83, file$1, 156, 3, 6841);
				attr_dev(doc0, "name", "Installation");
				add_location(doc0, file$1, 136, 2, 5765);
				add_location(h21, file$1, 163, 3, 7045);
				add_location(h30, file$1, 170, 6, 7314);
				add_location(br8, file$1, 172, 59, 7437);
				add_location(b0, file$1, 173, 21, 7463);
				attr_dev(a5, "href", "./?n=Use_with_jQuery#/docs");
				attr_dev(a5, "target", "_blank");
				add_location(a5, file$1, 173, 53, 7495);
				add_location(p0, file$1, 171, 6, 7374);
				attr_dev(div84, "class", "cAccr");
				add_location(div84, file$1, 169, 5, 7288);
				add_location(h31, file$1, 178, 6, 7626);
				add_location(b1, file$1, 180, 93, 7802);
				add_location(br9, file$1, 180, 120, 7829);
				attr_dev(a6, "href", "https://github.com/axios/axios");
				attr_dev(a6, "target", "_blank");
				add_location(a6, file$1, 181, 22, 7856);
				attr_dev(a7, "href", "https://www.javascripttutorial.net/javascript-fetch-api/");
				attr_dev(a7, "target", "_blank");
				add_location(a7, file$1, 181, 90, 7924);
				add_location(p1, file$1, 179, 6, 7705);
				attr_dev(div85, "class", "cAccr");
				add_location(div85, file$1, 177, 5, 7600);
				add_location(h32, file$1, 186, 6, 8098);
				add_location(br10, file$1, 189, 7, 8268);
				add_location(br11, file$1, 189, 11, 8272);
				add_location(b2, file$1, 190, 7, 8284);
				add_location(br12, file$1, 190, 40, 8317);
				add_location(br13, file$1, 191, 7, 8329);
				add_location(br14, file$1, 192, 177, 8511);
				add_location(br15, file$1, 193, 7, 8523);
				add_location(br16, file$1, 195, 29, 8568);
				add_location(br17, file$1, 196, 23, 8596);
				add_location(b3, file$1, 194, 7, 8535);
				add_location(p2, file$1, 187, 6, 8150);
				attr_dev(div86, "class", "cAccr");
				add_location(div86, file$1, 185, 5, 8072);
				add_location(h33, file$1, 203, 6, 8699);
				add_location(br18, file$1, 205, 49, 8823);
				add_location(br19, file$1, 206, 56, 8884);
				add_location(b4, file$1, 207, 68, 8957);
				add_location(br20, file$1, 207, 148, 9037);
				add_location(br21, file$1, 208, 7, 9049);
				add_location(br22, file$1, 209, 113, 9167);
				add_location(br23, file$1, 210, 142, 9314);
				add_location(br24, file$1, 211, 127, 9446);
				add_location(br25, file$1, 212, 7, 9458);
				add_location(br26, file$1, 213, 74, 9537);
				add_location(br27, file$1, 214, 134, 9676);
				add_location(p3, file$1, 204, 6, 8770);
				attr_dev(div87, "class", "cAccr");
				add_location(div87, file$1, 202, 5, 8673);
				add_location(h34, file$1, 220, 6, 9934);
				add_location(small2, file$1, 222, 7, 10014);
				add_location(br28, file$1, 222, 113, 10120);
				add_location(p4, file$1, 221, 6, 10003);
				attr_dev(div88, "class", "cBack");
				add_location(div88, file$1, 228, 8, 10375);
				attr_dev(div89, "class", "cDesc");
				add_location(div89, file$1, 227, 7, 10347);
				add_location(div90, file$1, 226, 6, 10334);
				attr_dev(div91, "class", "cAccr");
				add_location(div91, file$1, 219, 5, 9908);
				set_style(div92, "margin-top", "10px");
				add_location(div92, file$1, 168, 4, 7252);
				attr_dev(div93, "class", "cPreDesc");
				add_location(div93, file$1, 164, 3, 7083);
				attr_dev(doc1, "name", "Difference_between_jQuery");
				add_location(doc1, file$1, 162, 2, 7003);
				add_location(h22, file$1, 240, 3, 10579);
				add_location(br29, file$1, 242, 69, 10699);
				attr_dev(div94, "class", "cPreDesc");
				add_location(div94, file$1, 241, 3, 10607);
				attr_dev(div95, "class", "cBack");
				add_location(div95, file$1, 247, 5, 10813);
				attr_dev(div96, "class", "cDesc");
				add_location(div96, file$1, 246, 4, 10788);
				attr_dev(div97, "class", "cBack");
				add_location(div97, file$1, 253, 5, 10943);
				attr_dev(div98, "class", "cDesc");
				add_location(div98, file$1, 252, 4, 10918);
				add_location(div99, file$1, 245, 3, 10778);
				attr_dev(doc2, "name", "Use_with_jQuery");
				add_location(doc2, file$1, 239, 2, 10547);
				add_location(h23, file$1, 261, 3, 11120);
				attr_dev(a8, "href", "https://nodejs.org/");
				attr_dev(a8, "target", "_blank");
				add_location(a8, file$1, 263, 12, 11182);
				add_location(br30, file$1, 263, 95, 11265);
				attr_dev(a9, "href", "https://create-react-app.dev/docs/getting-started");
				attr_dev(a9, "target", "_blank");
				add_location(a9, file$1, 264, 38, 11308);
				attr_dev(div100, "class", "cPreDesc");
				add_location(div100, file$1, 262, 3, 11147);
				add_location(br31, file$1, 268, 37, 11505);
				add_location(br32, file$1, 269, 12, 11522);
				add_location(br33, file$1, 270, 14, 11541);
				attr_dev(div101, "class", "cSh notranslate");
				add_location(div101, file$1, 267, 4, 11438);
				attr_dev(a10, "href", "https://www.typescriptlang.org/");
				attr_dev(a10, "target", "_blank");
				add_location(a10, file$1, 272, 31, 11588);
				add_location(br34, file$1, 274, 59, 11771);
				add_location(br35, file$1, 275, 12, 11788);
				add_location(br36, file$1, 276, 14, 11807);
				attr_dev(div102, "class", "cSh notranslate");
				add_location(div102, file$1, 273, 4, 11682);
				add_location(hr1, file$1, 279, 4, 11828);
				attr_dev(div103, "class", "cSh notranslate");
				add_location(div103, file$1, 282, 4, 11876);
				attr_dev(div104, "class", "cSh notranslate");
				add_location(div104, file$1, 287, 4, 11973);
				add_location(div105, file$1, 266, 3, 11428);
				attr_dev(doc3, "name", "Use_with_React");
				add_location(doc3, file$1, 260, 2, 11089);
				add_location(h24, file$1, 294, 3, 12084);
				attr_dev(a11, "href", "https://vuejs.org/guide/quick-start.html");
				attr_dev(a11, "target", "_blank");
				add_location(a11, file$1, 296, 18, 12153);
				add_location(br37, file$1, 296, 125, 12260);
				attr_dev(div106, "class", "cPreDesc");
				add_location(div106, file$1, 295, 3, 12112);
				attr_dev(doc4, "name", "Use_with_Vue");
				add_location(doc4, file$1, 293, 2, 12055);
				add_location(h25, file$1, 302, 3, 12354);
				attr_dev(a12, "href", "https://vuejs.org/guide/quick-start.html");
				attr_dev(a12, "target", "_blank");
				add_location(a12, file$1, 304, 18, 12423);
				add_location(br38, file$1, 304, 125, 12530);
				attr_dev(div107, "class", "cPreDesc");
				add_location(div107, file$1, 303, 3, 12382);
				attr_dev(doc5, "name", "Use_with_Svelte");
				add_location(doc5, file$1, 301, 2, 12322);
				add_location(h26, file$1, 310, 3, 12625);
				attr_dev(a13, "href", "https://vuejs.org/guide/quick-start.html");
				attr_dev(a13, "target", "_blank");
				add_location(a13, file$1, 312, 18, 12695);
				add_location(br39, file$1, 312, 125, 12802);
				attr_dev(div108, "class", "cPreDesc");
				add_location(div108, file$1, 311, 3, 12654);
				attr_dev(doc6, "name", "Use_with_SolidJS");
				add_location(doc6, file$1, 309, 2, 12592);
				add_location(h27, file$1, 318, 3, 12897);
				attr_dev(a14, "href", "https://vuejs.org/guide/quick-start.html");
				attr_dev(a14, "target", "_blank");
				add_location(a14, file$1, 320, 18, 12967);
				add_location(br40, file$1, 320, 125, 13074);
				attr_dev(div109, "class", "cPreDesc");
				add_location(div109, file$1, 319, 3, 12926);
				attr_dev(doc7, "name", "Use_with_Angular");
				add_location(doc7, file$1, 317, 2, 12864);
				attr_dev(h28, "class", "notranslate");
				add_location(h28, file$1, 328, 3, 13165);
				attr_dev(span3, "class", "cJQVer");
				attr_dev(span3, "v", "filter");
				add_location(span3, file$1, 331, 4, 13347);
				attr_dev(div110, "class", "cPreDesc");
				add_location(div110, file$1, 329, 3, 13210);
				attr_dev(div111, "class", "cBack");
				add_location(div111, file$1, 335, 5, 13435);
				attr_dev(div112, "class", "cDesc");
				add_location(div112, file$1, 334, 4, 13410);
				add_location(div113, file$1, 333, 3, 13400);
				add_location(br41, file$1, 342, 4, 13578);
				attr_dev(span4, "class", "cJQVer");
				attr_dev(span4, "v", "not");
				add_location(span4, file$1, 344, 4, 13679);
				attr_dev(div114, "class", "cPreDesc");
				add_location(div114, file$1, 341, 3, 13551);
				attr_dev(div115, "class", "cBack");
				add_location(div115, file$1, 348, 5, 13764);
				attr_dev(div116, "class", "cDesc");
				add_location(div116, file$1, 347, 4, 13739);
				add_location(div117, file$1, 346, 3, 13729);
				attr_dev(doc8, "name", "filter-not");
				add_location(doc8, file$1, 327, 2, 13138);
				attr_dev(h29, "class", "notranslate");
				add_location(h29, file$1, 356, 3, 13916);
				attr_dev(span5, "class", "cJQVer");
				attr_dev(span5, "v", "eq");
				add_location(span5, file$1, 359, 4, 14053);
				attr_dev(div118, "class", "cPreDesc");
				add_location(div118, file$1, 357, 3, 13951);
				attr_dev(div119, "class", "cBack");
				add_location(div119, file$1, 363, 5, 14137);
				attr_dev(div120, "class", "cDesc");
				add_location(div120, file$1, 362, 4, 14112);
				add_location(div121, file$1, 361, 3, 14102);
				add_location(br42, file$1, 370, 4, 14336);
				attr_dev(div122, "class", "cPreDesc");
				add_location(div122, file$1, 369, 3, 14309);
				attr_dev(div123, "class", "cBack");
				add_location(div123, file$1, 375, 5, 14479);
				attr_dev(div124, "class", "cDesc");
				add_location(div124, file$1, 374, 4, 14454);
				add_location(div125, file$1, 373, 3, 14444);
				attr_dev(doc9, "name", "eq");
				add_location(doc9, file$1, 355, 2, 13897);
				attr_dev(h210, "class", "notranslate");
				add_location(h210, file$1, 383, 3, 14732);
				attr_dev(span6, "class", "cJQVer");
				attr_dev(span6, "v", "first");
				add_location(span6, file$1, 386, 4, 14876);
				attr_dev(div126, "class", "cPreDesc");
				add_location(div126, file$1, 384, 3, 14777);
				attr_dev(div127, "class", "cBack");
				add_location(div127, file$1, 390, 5, 14963);
				attr_dev(div128, "class", "cDesc");
				add_location(div128, file$1, 389, 4, 14938);
				add_location(div129, file$1, 388, 3, 14928);
				add_location(br43, file$1, 397, 4, 15091);
				attr_dev(span7, "class", "cJQVer");
				attr_dev(span7, "v", "last");
				add_location(span7, file$1, 399, 4, 15170);
				attr_dev(div130, "class", "cPreDesc");
				add_location(div130, file$1, 396, 3, 15064);
				attr_dev(div131, "class", "cBack");
				add_location(div131, file$1, 403, 5, 15256);
				attr_dev(div132, "class", "cDesc");
				add_location(div132, file$1, 402, 4, 15231);
				add_location(div133, file$1, 401, 3, 15221);
				attr_dev(doc10, "name", "first-last");
				add_location(doc10, file$1, 382, 2, 14705);
				attr_dev(h211, "class", "notranslate");
				add_location(h211, file$1, 412, 3, 15386);
				attr_dev(span8, "class", "cJQVer");
				attr_dev(span8, "v", "has");
				add_location(span8, file$1, 415, 4, 15525);
				attr_dev(div134, "class", "cPreDesc");
				add_location(div134, file$1, 413, 3, 15422);
				attr_dev(div135, "class", "cBack");
				add_location(div135, file$1, 419, 5, 15610);
				attr_dev(div136, "class", "cDesc");
				add_location(div136, file$1, 418, 4, 15585);
				add_location(div137, file$1, 417, 3, 15575);
				attr_dev(doc11, "name", "has");
				add_location(doc11, file$1, 411, 2, 15366);
				attr_dev(h212, "class", "notranslate");
				add_location(h212, file$1, 428, 3, 15741);
				attr_dev(span9, "class", "cJQVer");
				attr_dev(span9, "v", "contains");
				add_location(span9, file$1, 431, 4, 15866);
				attr_dev(div138, "class", "cPreDesc");
				add_location(div138, file$1, 429, 3, 15782);
				attr_dev(div139, "class", "cBack");
				add_location(div139, file$1, 435, 5, 15956);
				attr_dev(div140, "class", "cDesc");
				add_location(div140, file$1, 434, 4, 15931);
				add_location(div141, file$1, 433, 3, 15921);
				attr_dev(doc12, "name", "contains");
				add_location(doc12, file$1, 427, 2, 15716);
				attr_dev(h213, "class", "notranslate");
				add_location(h213, file$1, 445, 3, 16095);
				attr_dev(span10, "class", "cJQVer");
				attr_dev(span10, "v", "slice");
				add_location(span10, file$1, 448, 4, 16244);
				attr_dev(div142, "class", "cPreDesc");
				add_location(div142, file$1, 446, 3, 16133);
				attr_dev(div143, "class", "cBack");
				add_location(div143, file$1, 452, 5, 16331);
				attr_dev(div144, "class", "cDesc");
				add_location(div144, file$1, 451, 4, 16306);
				add_location(div145, file$1, 450, 3, 16296);
				attr_dev(doc13, "name", "slice");
				add_location(doc13, file$1, 444, 2, 16073);
				attr_dev(h214, "class", "notranslate");
				add_location(h214, file$1, 462, 3, 16464);
				attr_dev(span11, "class", "cJQVer");
				attr_dev(span11, "v", "index");
				add_location(span11, file$1, 465, 4, 16580);
				attr_dev(div146, "class", "cPreDesc");
				add_location(div146, file$1, 463, 3, 16502);
				attr_dev(div147, "class", "cBack");
				add_location(div147, file$1, 469, 5, 16667);
				attr_dev(div148, "class", "cDesc");
				add_location(div148, file$1, 468, 4, 16642);
				add_location(div149, file$1, 467, 3, 16632);
				attr_dev(doc14, "name", "index");
				add_location(doc14, file$1, 461, 2, 16442);
				attr_dev(h215, "class", "notranslate");
				add_location(h215, file$1, 479, 3, 16797);
				attr_dev(span12, "class", "cJQVer");
				attr_dev(span12, "v", "is");
				add_location(span12, file$1, 482, 4, 16946);
				attr_dev(div150, "class", "cPreDesc");
				add_location(div150, file$1, 480, 3, 16832);
				attr_dev(div151, "class", "cBack");
				add_location(div151, file$1, 486, 5, 17030);
				attr_dev(div152, "class", "cDesc");
				add_location(div152, file$1, 485, 4, 17005);
				add_location(div153, file$1, 484, 3, 16995);
				attr_dev(doc15, "name", "is");
				add_location(doc15, file$1, 478, 2, 16778);
				attr_dev(h216, "class", "notranslate");
				add_location(h216, file$1, 496, 3, 17169);
				attr_dev(span13, "class", "cJQVer");
				attr_dev(span13, "v", "find");
				add_location(span13, file$1, 499, 4, 17314);
				attr_dev(div154, "class", "cPreDesc");
				add_location(div154, file$1, 497, 3, 17206);
				attr_dev(div155, "class", "cBack");
				add_location(div155, file$1, 503, 5, 17400);
				attr_dev(div156, "class", "cDesc");
				add_location(div156, file$1, 502, 4, 17375);
				add_location(div157, file$1, 501, 3, 17365);
				attr_dev(doc16, "name", "find");
				add_location(doc16, file$1, 495, 2, 17148);
				attr_dev(h217, "class", "notranslate");
				add_location(h217, file$1, 513, 3, 17547);
				attr_dev(span14, "class", "cJQVer");
				attr_dev(span14, "v", "children");
				add_location(span14, file$1, 516, 4, 17658);
				attr_dev(div158, "class", "cPreDesc");
				add_location(div158, file$1, 514, 3, 17588);
				attr_dev(div159, "class", "cBack");
				add_location(div159, file$1, 520, 5, 17748);
				attr_dev(div160, "class", "cDesc");
				add_location(div160, file$1, 519, 4, 17723);
				add_location(div161, file$1, 518, 3, 17713);
				attr_dev(doc17, "name", "children");
				add_location(doc17, file$1, 512, 2, 17522);
				attr_dev(h218, "class", "notranslate");
				add_location(h218, file$1, 530, 3, 17904);
				attr_dev(span15, "class", "cJQVer");
				attr_dev(span15, "v", "next");
				add_location(span15, file$1, 533, 4, 18006);
				attr_dev(div162, "class", "cPreDesc");
				add_location(div162, file$1, 531, 3, 17948);
				attr_dev(div163, "class", "cBack");
				add_location(div163, file$1, 537, 5, 18092);
				attr_dev(div164, "class", "cDesc");
				add_location(div164, file$1, 536, 4, 18067);
				add_location(div165, file$1, 535, 3, 18057);
				add_location(br44, file$1, 544, 4, 18218);
				attr_dev(span16, "class", "cJQVer");
				attr_dev(span16, "v", "prev");
				add_location(span16, file$1, 546, 4, 18276);
				attr_dev(div166, "class", "cPreDesc");
				add_location(div166, file$1, 543, 3, 18191);
				attr_dev(div167, "class", "cBack");
				add_location(div167, file$1, 550, 5, 18362);
				attr_dev(div168, "class", "cDesc");
				add_location(div168, file$1, 549, 4, 18337);
				add_location(div169, file$1, 548, 3, 18327);
				attr_dev(doc18, "name", "next-prev");
				add_location(doc18, file$1, 529, 2, 17878);
				attr_dev(h219, "class", "notranslate");
				add_location(h219, file$1, 560, 3, 18496);
				attr_dev(span17, "class", "cJQVer");
				attr_dev(span17, "v", "siblings");
				add_location(span17, file$1, 563, 4, 18610);
				attr_dev(div170, "class", "cPreDesc");
				add_location(div170, file$1, 561, 3, 18537);
				attr_dev(div171, "class", "cBack");
				add_location(div171, file$1, 567, 5, 18700);
				attr_dev(div172, "class", "cDesc");
				add_location(div172, file$1, 566, 4, 18675);
				add_location(div173, file$1, 565, 3, 18665);
				attr_dev(doc19, "name", "siblings");
				add_location(doc19, file$1, 559, 2, 18471);
				attr_dev(h220, "class", "notranslate");
				add_location(h220, file$1, 577, 3, 18848);
				attr_dev(span18, "class", "cJQVer");
				attr_dev(span18, "v", "parent");
				add_location(span18, file$1, 580, 4, 18960);
				attr_dev(div174, "class", "cPreDesc");
				add_location(div174, file$1, 578, 3, 18897);
				attr_dev(div175, "class", "cBack");
				add_location(div175, file$1, 584, 5, 19048);
				attr_dev(div176, "class", "cDesc");
				add_location(div176, file$1, 583, 4, 19023);
				add_location(div177, file$1, 582, 3, 19013);
				add_location(br45, file$1, 591, 4, 19178);
				attr_dev(span19, "class", "cJQVer");
				attr_dev(span19, "v", "parents");
				add_location(span19, file$1, 593, 4, 19238);
				attr_dev(div178, "class", "cPreDesc");
				add_location(div178, file$1, 590, 3, 19151);
				attr_dev(div179, "class", "cBack");
				add_location(div179, file$1, 597, 5, 19327);
				attr_dev(div180, "class", "cDesc");
				add_location(div180, file$1, 596, 4, 19302);
				add_location(div181, file$1, 595, 3, 19292);
				attr_dev(doc20, "name", "parent-parents");
				add_location(doc20, file$1, 576, 2, 18817);
				attr_dev(h221, "class", "notranslate");
				add_location(h221, file$1, 607, 3, 19466);
				attr_dev(span20, "class", "cJQVer");
				attr_dev(span20, "v", "closest");
				add_location(span20, file$1, 610, 4, 19592);
				attr_dev(div182, "class", "cPreDesc");
				add_location(div182, file$1, 608, 3, 19506);
				attr_dev(div183, "class", "cBack");
				add_location(div183, file$1, 614, 5, 19681);
				attr_dev(div184, "class", "cDesc");
				add_location(div184, file$1, 613, 4, 19656);
				add_location(div185, file$1, 612, 3, 19646);
				attr_dev(doc21, "name", "closest");
				add_location(doc21, file$1, 606, 2, 19442);
				attr_dev(h222, "class", "notranslate");
				add_location(h222, file$1, 624, 3, 19821);
				attr_dev(span21, "class", "cJQVer");
				attr_dev(span21, "v", "hasClass");
				add_location(span21, file$1, 627, 4, 20000);
				attr_dev(div186, "class", "cPreDesc");
				add_location(div186, file$1, 625, 3, 19862);
				attr_dev(div187, "class", "cBack");
				add_location(div187, file$1, 631, 5, 20090);
				attr_dev(div188, "class", "cDesc");
				add_location(div188, file$1, 630, 4, 20065);
				add_location(div189, file$1, 629, 3, 20055);
				attr_dev(doc22, "name", "hasClass");
				add_location(doc22, file$1, 623, 2, 19796);
				attr_dev(h223, "class", "notranslate");
				add_location(h223, file$1, 641, 3, 20233);
				attr_dev(span22, "class", "cJQVer");
				attr_dev(span22, "v", "isVisible");
				add_location(span22, file$1, 644, 4, 20367);
				attr_dev(div190, "class", "cPreDesc");
				add_location(div190, file$1, 642, 3, 20275);
				attr_dev(div191, "class", "cBack");
				add_location(div191, file$1, 648, 5, 20458);
				attr_dev(div192, "class", "cDesc");
				add_location(div192, file$1, 647, 4, 20433);
				add_location(div193, file$1, 646, 3, 20423);
				attr_dev(doc23, "name", "isVisible");
				add_location(doc23, file$1, 640, 2, 20207);
				attr_dev(h224, "class", "notranslate");
				add_location(h224, file$1, 658, 3, 20606);
				attr_dev(span23, "class", "cJQVer");
				attr_dev(span23, "v", "isPageLoaded");
				add_location(span23, file$1, 661, 4, 20725);
				attr_dev(div194, "class", "cPreDesc");
				add_location(div194, file$1, 659, 3, 20651);
				attr_dev(div195, "class", "cBack");
				add_location(div195, file$1, 665, 5, 20819);
				attr_dev(div196, "class", "cDesc");
				add_location(div196, file$1, 664, 4, 20794);
				add_location(div197, file$1, 663, 3, 20784);
				attr_dev(doc24, "name", "isPageLoaded");
				add_location(doc24, file$1, 657, 2, 20577);
				attr_dev(h225, "class", "notranslate");
				add_location(h225, file$1, 675, 3, 20965);
				attr_dev(span24, "class", "cJQVer");
				attr_dev(span24, "v", "html");
				add_location(span24, file$1, 678, 4, 21122);
				attr_dev(div198, "class", "cPreDesc");
				add_location(div198, file$1, 676, 3, 21002);
				attr_dev(div199, "class", "cBack");
				add_location(div199, file$1, 682, 5, 21208);
				attr_dev(div200, "class", "cDesc");
				add_location(div200, file$1, 681, 4, 21183);
				add_location(div201, file$1, 680, 3, 21173);
				attr_dev(doc25, "name", "html");
				add_location(doc25, file$1, 674, 2, 20944);
				attr_dev(h226, "class", "notranslate");
				add_location(h226, file$1, 692, 3, 21338);
				attr_dev(span25, "class", "cJQVer");
				attr_dev(span25, "v", "text");
				add_location(span25, file$1, 695, 4, 21511);
				attr_dev(div202, "class", "cPreDesc");
				add_location(div202, file$1, 693, 3, 21375);
				attr_dev(div203, "class", "cBack");
				add_location(div203, file$1, 699, 5, 21597);
				attr_dev(div204, "class", "cDesc");
				add_location(div204, file$1, 698, 4, 21572);
				add_location(div205, file$1, 697, 3, 21562);
				attr_dev(doc26, "name", "text");
				add_location(doc26, file$1, 691, 2, 21317);
				attr_dev(h227, "class", "notranslate");
				add_location(h227, file$1, 709, 3, 21726);
				attr_dev(span26, "class", "cJQVer");
				attr_dev(span26, "v", "val");
				add_location(span26, file$1, 712, 4, 21901);
				attr_dev(div206, "class", "cPreDesc");
				add_location(div206, file$1, 710, 3, 21762);
				attr_dev(div207, "class", "cBack");
				add_location(div207, file$1, 716, 5, 21986);
				attr_dev(div208, "class", "cDesc");
				add_location(div208, file$1, 715, 4, 21961);
				add_location(div209, file$1, 714, 3, 21951);
				attr_dev(doc27, "name", "val");
				add_location(doc27, file$1, 708, 2, 21706);
				attr_dev(h228, "class", "notranslate");
				add_location(h228, file$1, 726, 3, 22113);
				attr_dev(span27, "class", "cJQVer");
				attr_dev(span27, "v", "css");
				add_location(span27, file$1, 729, 4, 22355);
				attr_dev(div210, "class", "cPreDesc");
				add_location(div210, file$1, 727, 3, 22149);
				attr_dev(div211, "class", "cBack");
				add_location(div211, file$1, 733, 5, 22440);
				attr_dev(div212, "class", "cDesc");
				add_location(div212, file$1, 732, 4, 22415);
				add_location(div213, file$1, 731, 3, 22405);
				attr_dev(doc28, "name", "css");
				add_location(doc28, file$1, 725, 2, 22093);
				attr_dev(h229, "class", "notranslate");
				add_location(h229, file$1, 743, 3, 22615);
				attr_dev(span28, "class", "cJQVer");
				attr_dev(span28, "v", "attr");
				add_location(span28, file$1, 746, 4, 22846);
				attr_dev(div214, "class", "cPreDesc");
				add_location(div214, file$1, 744, 3, 22652);
				attr_dev(div215, "class", "cBack");
				add_location(div215, file$1, 750, 5, 22932);
				attr_dev(div216, "class", "cDesc");
				add_location(div216, file$1, 749, 4, 22907);
				add_location(div217, file$1, 748, 3, 22897);
				attr_dev(doc29, "name", "attr");
				add_location(doc29, file$1, 742, 2, 22594);
				attr_dev(h230, "class", "notranslate");
				add_location(h230, file$1, 760, 3, 23062);
				attr_dev(span29, "class", "cJQVer");
				attr_dev(span29, "v", "prop");
				add_location(span29, file$1, 763, 4, 23279);
				attr_dev(div218, "class", "cPreDesc");
				add_location(div218, file$1, 761, 3, 23099);
				attr_dev(div219, "class", "cBack");
				add_location(div219, file$1, 767, 5, 23365);
				attr_dev(div220, "class", "cDesc");
				add_location(div220, file$1, 766, 4, 23340);
				add_location(div221, file$1, 765, 3, 23330);
				attr_dev(doc30, "name", "prop");
				add_location(doc30, file$1, 759, 2, 23041);
				attr_dev(h231, "class", "notranslate");
				add_location(h231, file$1, 777, 3, 23494);
				attr_dev(span30, "class", "cJQVer");
				attr_dev(span30, "v", "get");
				add_location(span30, file$1, 780, 4, 23594);
				attr_dev(div222, "class", "cPreDesc");
				add_location(div222, file$1, 778, 3, 23530);
				attr_dev(div223, "class", "cBack");
				add_location(div223, file$1, 784, 5, 23679);
				attr_dev(div224, "class", "cDesc");
				add_location(div224, file$1, 783, 4, 23654);
				add_location(div225, file$1, 782, 3, 23644);
				attr_dev(doc31, "name", "get");
				add_location(doc31, file$1, 776, 2, 23474);
				attr_dev(h232, "class", "notranslate");
				add_location(h232, file$1, 794, 3, 23812);
				attr_dev(span31, "class", "cJQVer");
				attr_dev(span31, "v", "show");
				add_location(span31, file$1, 797, 4, 23922);
				attr_dev(div226, "class", "cPreDesc");
				add_location(div226, file$1, 795, 3, 23856);
				attr_dev(div227, "class", "cBack");
				add_location(div227, file$1, 801, 5, 24008);
				attr_dev(div228, "class", "cDesc");
				add_location(div228, file$1, 800, 4, 23983);
				add_location(div229, file$1, 799, 3, 23973);
				add_location(br46, file$1, 808, 4, 24134);
				attr_dev(span32, "class", "cJQVer");
				attr_dev(span32, "v", "hide");
				add_location(span32, file$1, 810, 4, 24182);
				attr_dev(div230, "class", "cPreDesc");
				add_location(div230, file$1, 807, 3, 24107);
				attr_dev(div231, "class", "cBack");
				add_location(div231, file$1, 814, 5, 24268);
				attr_dev(div232, "class", "cDesc");
				add_location(div232, file$1, 813, 4, 24243);
				add_location(div233, file$1, 812, 3, 24233);
				attr_dev(doc32, "name", "show-hide");
				add_location(doc32, file$1, 793, 2, 23786);
				attr_dev(h233, "class", "notranslate");
				add_location(h233, file$1, 824, 3, 24400);
				attr_dev(span33, "class", "cJQVer");
				attr_dev(span33, "v", "remove");
				add_location(span33, file$1, 827, 4, 24501);
				attr_dev(div234, "class", "cPreDesc");
				add_location(div234, file$1, 825, 3, 24439);
				attr_dev(div235, "class", "cBack");
				add_location(div235, file$1, 831, 5, 24589);
				attr_dev(div236, "class", "cDesc");
				add_location(div236, file$1, 830, 4, 24564);
				add_location(div237, file$1, 829, 3, 24554);
				attr_dev(doc33, "name", "remove");
				add_location(doc33, file$1, 823, 2, 24377);
				attr_dev(h234, "class", "notranslate");
				add_location(h234, file$1, 841, 3, 24731);
				attr_dev(span34, "class", "cJQVer");
				attr_dev(span34, "v", "before");
				add_location(span34, file$1, 844, 4, 24913);
				attr_dev(div238, "class", "cPreDesc");
				add_location(div238, file$1, 842, 3, 24778);
				attr_dev(div239, "class", "cBack");
				add_location(div239, file$1, 848, 5, 25001);
				attr_dev(div240, "class", "cDesc");
				add_location(div240, file$1, 847, 4, 24976);
				add_location(div241, file$1, 846, 3, 24966);
				add_location(br47, file$1, 855, 4, 25131);
				attr_dev(span35, "class", "cJQVer");
				attr_dev(span35, "v", "after");
				add_location(span35, file$1, 857, 4, 25246);
				attr_dev(div242, "class", "cPreDesc");
				add_location(div242, file$1, 854, 3, 25104);
				attr_dev(div243, "class", "cBack");
				add_location(div243, file$1, 861, 5, 25333);
				attr_dev(div244, "class", "cDesc");
				add_location(div244, file$1, 860, 4, 25308);
				add_location(div245, file$1, 859, 3, 25298);
				attr_dev(doc34, "name", "before-after");
				add_location(doc34, file$1, 840, 2, 24702);
				attr_dev(h235, "class", "notranslate");
				add_location(h235, file$1, 871, 3, 25475);
				attr_dev(span36, "class", "cJQVer");
				attr_dev(span36, "v", "prepend");
				add_location(span36, file$1, 874, 4, 25565);
				attr_dev(div246, "class", "cPreDesc");
				add_location(div246, file$1, 872, 3, 25524);
				attr_dev(div247, "class", "cBack");
				add_location(div247, file$1, 878, 5, 25654);
				attr_dev(div248, "class", "cDesc");
				add_location(div248, file$1, 877, 4, 25629);
				add_location(div249, file$1, 876, 3, 25619);
				add_location(br48, file$1, 885, 4, 25786);
				attr_dev(span37, "class", "cJQVer");
				attr_dev(span37, "v", "append");
				add_location(span37, file$1, 887, 4, 25808);
				attr_dev(div250, "class", "cPreDesc");
				add_location(div250, file$1, 884, 3, 25759);
				attr_dev(div251, "class", "cBack");
				add_location(div251, file$1, 891, 5, 25896);
				attr_dev(div252, "class", "cDesc");
				add_location(div252, file$1, 890, 4, 25871);
				add_location(div253, file$1, 889, 3, 25861);
				attr_dev(doc35, "name", "prepend-append");
				add_location(doc35, file$1, 870, 2, 25444);
				attr_dev(h236, "class", "notranslate");
				add_location(h236, file$1, 901, 3, 26037);
				attr_dev(span38, "class", "cJQVer");
				attr_dev(span38, "v", "replaceWith");
				add_location(span38, file$1, 904, 4, 26116);
				attr_dev(div254, "class", "cPreDesc");
				add_location(div254, file$1, 902, 3, 26081);
				attr_dev(div255, "class", "cBack");
				add_location(div255, file$1, 908, 5, 26209);
				attr_dev(div256, "class", "cDesc");
				add_location(div256, file$1, 907, 4, 26184);
				add_location(div257, file$1, 906, 3, 26174);
				attr_dev(doc36, "name", "replaceWith");
				add_location(doc36, file$1, 900, 2, 26009);
				attr_dev(h237, "class", "notranslate");
				add_location(h237, file$1, 918, 3, 26369);
				attr_dev(span39, "class", "cJQVer");
				attr_dev(span39, "v", "addClass");
				add_location(span39, file$1, 921, 4, 26466);
				attr_dev(div258, "class", "cPreDesc");
				add_location(div258, file$1, 919, 3, 26424);
				attr_dev(div259, "class", "cBack");
				add_location(div259, file$1, 925, 5, 26556);
				attr_dev(div260, "class", "cDesc");
				add_location(div260, file$1, 924, 4, 26531);
				add_location(div261, file$1, 923, 3, 26521);
				add_location(br49, file$1, 932, 4, 26690);
				attr_dev(span40, "class", "cJQVer");
				attr_dev(span40, "v", "removeClass");
				add_location(span40, file$1, 934, 4, 26717);
				attr_dev(div262, "class", "cPreDesc");
				add_location(div262, file$1, 931, 3, 26663);
				attr_dev(div263, "class", "cBack");
				add_location(div263, file$1, 938, 5, 26810);
				attr_dev(div264, "class", "cDesc");
				add_location(div264, file$1, 937, 4, 26785);
				add_location(div265, file$1, 936, 3, 26775);
				attr_dev(doc37, "name", "addClass-removeClass");
				add_location(doc37, file$1, 917, 2, 26332);
				attr_dev(h238, "class", "notranslate");
				add_location(h238, file$1, 948, 3, 26961);
				attr_dev(span41, "class", "cJQVer");
				attr_dev(span41, "v", "toggleClass");
				add_location(span41, file$1, 951, 4, 27040);
				attr_dev(div266, "class", "cPreDesc");
				add_location(div266, file$1, 949, 3, 27005);
				attr_dev(div267, "class", "cBack");
				add_location(div267, file$1, 955, 5, 27133);
				attr_dev(div268, "class", "cDesc");
				add_location(div268, file$1, 954, 4, 27108);
				add_location(div269, file$1, 953, 3, 27098);
				attr_dev(doc38, "name", "toggleClass");
				add_location(doc38, file$1, 947, 2, 26933);
				attr_dev(h239, "class", "notranslate");
				add_location(h239, file$1, 965, 3, 27285);
				attr_dev(span42, "class", "cJQVer");
				attr_dev(span42, "v", "width");
				add_location(span42, file$1, 968, 4, 27367);
				attr_dev(div270, "class", "cPreDesc");
				add_location(div270, file$1, 966, 3, 27332);
				attr_dev(div271, "class", "cBack");
				add_location(div271, file$1, 972, 5, 27454);
				attr_dev(div272, "class", "cDesc");
				add_location(div272, file$1, 971, 4, 27429);
				add_location(div273, file$1, 970, 3, 27419);
				attr_dev(doc39, "name", "width-height");
				add_location(doc39, file$1, 964, 2, 27256);
				attr_dev(h240, "class", "notranslate");
				add_location(h240, file$1, 982, 3, 27613);
				attr_dev(span43, "class", "cJQVer");
				attr_dev(span43, "v", "innerWidth");
				add_location(span43, file$1, 985, 4, 27705);
				attr_dev(div274, "class", "cPreDesc");
				add_location(div274, file$1, 983, 3, 27670);
				attr_dev(div275, "class", "cBack");
				add_location(div275, file$1, 989, 5, 27797);
				attr_dev(div276, "class", "cDesc");
				add_location(div276, file$1, 988, 4, 27772);
				add_location(div277, file$1, 987, 3, 27762);
				attr_dev(doc40, "name", "innerWidth-innerHeight");
				add_location(doc40, file$1, 981, 2, 27574);
				attr_dev(h241, "class", "notranslate");
				add_location(h241, file$1, 999, 3, 27971);
				attr_dev(span44, "class", "cJQVer");
				attr_dev(span44, "v", "outerWidth");
				add_location(span44, file$1, 1002, 4, 28063);
				attr_dev(div278, "class", "cPreDesc");
				add_location(div278, file$1, 1000, 3, 28028);
				attr_dev(div279, "class", "cBack");
				add_location(div279, file$1, 1006, 5, 28155);
				attr_dev(div280, "class", "cDesc");
				add_location(div280, file$1, 1005, 4, 28130);
				add_location(div281, file$1, 1004, 3, 28120);
				attr_dev(doc41, "name", "outerWidth-outerHeight");
				add_location(doc41, file$1, 998, 2, 27932);
				attr_dev(h242, "class", "notranslate");
				add_location(h242, file$1, 1016, 3, 28313);
				attr_dev(span45, "class", "cJQVer");
				attr_dev(span45, "v", "offset");
				add_location(span45, file$1, 1019, 4, 28387);
				attr_dev(div282, "class", "cPreDesc");
				add_location(div282, file$1, 1017, 3, 28352);
				attr_dev(div283, "class", "cBack");
				add_location(div283, file$1, 1023, 5, 28475);
				attr_dev(div284, "class", "cDesc");
				add_location(div284, file$1, 1022, 4, 28450);
				add_location(div285, file$1, 1021, 3, 28440);
				attr_dev(doc42, "name", "offset");
				add_location(doc42, file$1, 1015, 2, 28290);
				attr_dev(h243, "class", "notranslate");
				add_location(h243, file$1, 1033, 3, 28617);
				attr_dev(span46, "class", "cJQVer");
				attr_dev(span46, "v", "pos");
				add_location(span46, file$1, 1036, 4, 28699);
				attr_dev(div286, "class", "cPreDesc");
				add_location(div286, file$1, 1034, 3, 28664);
				attr_dev(div287, "class", "cBack");
				add_location(div287, file$1, 1040, 5, 28784);
				attr_dev(div288, "class", "cDesc");
				add_location(div288, file$1, 1039, 4, 28759);
				add_location(div289, file$1, 1038, 3, 28749);
				attr_dev(doc43, "name", "pos-position");
				add_location(doc43, file$1, 1032, 2, 28588);
				attr_dev(h244, "class", "notranslate");
				add_location(h244, file$1, 1050, 3, 28933);
				attr_dev(span47, "class", "cJQVer");
				attr_dev(span47, "v", "fadeIn");
				add_location(span47, file$1, 1053, 4, 29017);
				attr_dev(div290, "class", "cPreDesc");
				add_location(div290, file$1, 1051, 3, 28982);
				attr_dev(div291, "class", "cBack");
				add_location(div291, file$1, 1057, 5, 29105);
				attr_dev(div292, "class", "cDesc");
				add_location(div292, file$1, 1056, 4, 29080);
				add_location(div293, file$1, 1055, 3, 29070);
				attr_dev(doc44, "name", "fadeIn-fadeOut");
				add_location(doc44, file$1, 1049, 2, 28902);
				attr_dev(h245, "class", "notranslate");
				add_location(h245, file$1, 1067, 3, 29252);
				attr_dev(span48, "class", "cJQVer");
				attr_dev(span48, "v", "animate");
				add_location(span48, file$1, 1070, 4, 29327);
				attr_dev(div294, "class", "cPreDesc");
				add_location(div294, file$1, 1068, 3, 29292);
				attr_dev(div295, "class", "cBack");
				add_location(div295, file$1, 1074, 5, 29416);
				attr_dev(div296, "class", "cDesc");
				add_location(div296, file$1, 1073, 4, 29391);
				add_location(div297, file$1, 1072, 3, 29381);
				attr_dev(doc45, "name", "animate");
				add_location(doc45, file$1, 1066, 2, 29228);
				attr_dev(h246, "class", "notranslate");
				add_location(h246, file$1, 1084, 3, 29554);
				attr_dev(span49, "class", "cJQVer");
				attr_dev(span49, "v", "scroll");
				add_location(span49, file$1, 1087, 4, 29628);
				attr_dev(div298, "class", "cPreDesc");
				add_location(div298, file$1, 1085, 3, 29593);
				attr_dev(div299, "class", "cBack");
				add_location(div299, file$1, 1091, 5, 29716);
				attr_dev(div300, "class", "cDesc");
				add_location(div300, file$1, 1090, 4, 29691);
				add_location(div301, file$1, 1089, 3, 29681);
				attr_dev(doc46, "name", "scroll");
				add_location(doc46, file$1, 1083, 2, 29531);
				attr_dev(h247, "class", "notranslate");
				add_location(h247, file$1, 1101, 3, 29866);
				attr_dev(span50, "class", "cJQVer");
				attr_dev(span50, "v", "scrollTop");
				add_location(span50, file$1, 1104, 4, 29956);
				attr_dev(div302, "class", "cPreDesc");
				add_location(div302, file$1, 1102, 3, 29921);
				attr_dev(div303, "class", "cBack");
				add_location(div303, file$1, 1108, 5, 30047);
				attr_dev(div304, "class", "cDesc");
				add_location(div304, file$1, 1107, 4, 30022);
				add_location(div305, file$1, 1106, 3, 30012);
				attr_dev(doc47, "name", "scrollTop-scrollLeft");
				add_location(doc47, file$1, 1100, 2, 29829);
				attr_dev(h248, "class", "notranslate");
				add_location(h248, file$1, 1118, 3, 30211);
				attr_dev(span51, "class", "cJQVer");
				attr_dev(span51, "v", "scrollToElement");
				add_location(span51, file$1, 1121, 4, 30294);
				attr_dev(div306, "class", "cPreDesc");
				add_location(div306, file$1, 1119, 3, 30259);
				attr_dev(div307, "class", "cBack");
				add_location(div307, file$1, 1125, 5, 30391);
				attr_dev(div308, "class", "cDesc");
				add_location(div308, file$1, 1124, 4, 30366);
				add_location(div309, file$1, 1123, 3, 30356);
				attr_dev(doc48, "name", "scrollToElement");
				add_location(doc48, file$1, 1117, 2, 30179);
				attr_dev(h249, "class", "notranslate");
				add_location(h249, file$1, 1135, 3, 30543);
				attr_dev(span52, "class", "cJQVer");
				attr_dev(span52, "v", "each");
				add_location(span52, file$1, 1138, 4, 30615);
				attr_dev(div310, "class", "cPreDesc");
				add_location(div310, file$1, 1136, 3, 30580);
				attr_dev(div311, "class", "cBack");
				add_location(div311, file$1, 1142, 5, 30701);
				attr_dev(div312, "class", "cDesc");
				add_location(div312, file$1, 1141, 4, 30676);
				add_location(div313, file$1, 1140, 3, 30666);
				attr_dev(doc49, "name", "each");
				add_location(doc49, file$1, 1134, 2, 30522);
				attr_dev(h250, "class", "notranslate");
				add_location(h250, file$1, 1152, 3, 30837);
				attr_dev(span53, "class", "cJQVer");
				attr_dev(span53, "v", "on");
				add_location(span53, file$1, 1155, 4, 30919);
				attr_dev(div314, "class", "cPreDesc");
				add_location(div314, file$1, 1153, 3, 30884);
				attr_dev(div315, "class", "cBack");
				add_location(div315, file$1, 1159, 5, 31003);
				attr_dev(div316, "class", "cDesc");
				add_location(div316, file$1, 1158, 4, 30978);
				add_location(div317, file$1, 1157, 3, 30968);
				attr_dev(doc50, "name", "on-off-onf");
				add_location(doc50, file$1, 1151, 2, 30810);
				attr_dev(h251, "class", "notranslate");
				add_location(h251, file$1, 1169, 3, 31148);
				attr_dev(span54, "class", "cJQVer");
				attr_dev(span54, "v", "trg-trigger");
				add_location(span54, file$1, 1172, 4, 31229);
				attr_dev(div318, "class", "cPreDesc");
				add_location(div318, file$1, 1170, 3, 31194);
				attr_dev(div319, "class", "cBack");
				add_location(div319, file$1, 1176, 5, 31322);
				attr_dev(div320, "class", "cDesc");
				add_location(div320, file$1, 1175, 4, 31297);
				add_location(div321, file$1, 1174, 3, 31287);
				attr_dev(doc51, "name", "trg-trigger");
				add_location(doc51, file$1, 1168, 2, 31120);
				attr_dev(section4, "id", "idDoc");
				add_location(section4, file$1, 133, 1, 5635);
				add_location(main, file$1, 26, 0, 575);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, main, anchor);
				append_dev(main, link0);
				append_dev(main, t0);
				append_dev(main, script);
				append_dev(main, t1);
				append_dev(main, link1);
				append_dev(main, t2);
				append_dev(main, section0);
				append_dev(section0, span0);
				append_dev(section0, t3);
				append_dev(section0, div0);
				append_dev(div0, a0);
				append_dev(main, t5);
				append_dev(main, section3);
				append_dev(section3, section1);
				append_dev(section1, div1);
				append_dev(div1, a1);
				append_dev(section1, t7);
				append_dev(section1, div4);
				append_dev(div4, hr0);
				append_dev(div4, t8);
				append_dev(div4, div3);
				append_dev(div3, input);
				append_dev(div3, t9);
				append_dev(div3, div2);
				append_dev(section3, t11);
				append_dev(section3, section2);
				append_dev(section2, div14);
				append_dev(div14, div5);
				append_dev(div14, t13);
				append_dev(div14, div6);
				append_dev(div14, t15);
				append_dev(div14, div7);
				append_dev(div14, t17);
				append_dev(div14, div8);
				append_dev(div14, t19);
				append_dev(div14, div9);
				append_dev(div14, t21);
				append_dev(div14, div10);
				append_dev(div14, t23);
				append_dev(div14, div11);
				append_dev(div14, t25);
				append_dev(div14, div12);
				append_dev(div14, t27);
				append_dev(div14, div13);
				append_dev(section2, t29);
				append_dev(section2, div15);
				append_dev(section2, t31);
				append_dev(section2, div16);
				append_dev(section2, t33);
				append_dev(section2, div17);
				append_dev(section2, t35);
				append_dev(section2, div18);
				append_dev(section2, t37);
				append_dev(section2, div19);
				append_dev(section2, t39);
				append_dev(section2, div20);
				append_dev(section2, t41);
				append_dev(section2, div21);
				append_dev(section2, t43);
				append_dev(section2, div22);
				append_dev(section2, t45);
				append_dev(section2, div23);
				append_dev(section2, t47);
				append_dev(section2, div24);
				append_dev(section2, t49);
				append_dev(section2, div25);
				append_dev(section2, t51);
				append_dev(section2, div26);
				append_dev(section2, t53);
				append_dev(section2, div27);
				append_dev(section2, t55);
				append_dev(section2, div28);
				append_dev(section2, t57);
				append_dev(section2, div29);
				append_dev(section2, t59);
				append_dev(section2, div30);
				append_dev(section2, t61);
				append_dev(section2, div31);
				append_dev(section2, t63);
				append_dev(section2, div32);
				append_dev(section2, t65);
				append_dev(section2, div33);
				append_dev(section2, t67);
				append_dev(section2, div34);
				append_dev(section2, t69);
				append_dev(section2, div35);
				append_dev(section2, t71);
				append_dev(section2, div36);
				append_dev(section2, t73);
				append_dev(section2, div37);
				append_dev(section2, t75);
				append_dev(section2, div38);
				append_dev(section2, t77);
				append_dev(section2, div39);
				append_dev(section2, t79);
				append_dev(section2, div40);
				append_dev(section2, t81);
				append_dev(section2, div41);
				append_dev(section2, t83);
				append_dev(section2, div42);
				append_dev(section2, t85);
				append_dev(section2, div43);
				append_dev(section2, t87);
				append_dev(section2, div44);
				append_dev(section2, t89);
				append_dev(section2, div45);
				append_dev(section2, t91);
				append_dev(section2, div46);
				append_dev(section2, t93);
				append_dev(section2, div47);
				append_dev(section2, t95);
				append_dev(section2, div48);
				append_dev(section2, t97);
				append_dev(section2, div49);
				append_dev(section2, t99);
				append_dev(section2, div50);
				append_dev(section2, t101);
				append_dev(section2, div51);
				append_dev(section2, t103);
				append_dev(section2, div52);
				append_dev(section2, t105);
				append_dev(section2, div53);
				append_dev(section2, t107);
				append_dev(section2, div54);
				append_dev(section2, t109);
				append_dev(section2, div55);
				append_dev(section2, t111);
				append_dev(section2, div56);
				append_dev(section2, t113);
				append_dev(section2, div57);
				append_dev(section2, t115);
				append_dev(section2, div58);
				append_dev(section2, t117);
				append_dev(section2, div59);
				append_dev(section2, t119);
				append_dev(section2, div60);
				append_dev(section2, t121);
				append_dev(section2, div61);
				append_dev(section2, t123);
				append_dev(section2, div62);
				append_dev(section2, t125);
				append_dev(section2, div63);
				append_dev(section2, t127);
				append_dev(section2, div64);
				append_dev(section2, t129);
				append_dev(section2, div65);
				append_dev(section2, t131);
				append_dev(section2, div66);
				append_dev(section2, t133);
				append_dev(section2, div67);
				append_dev(section2, t135);
				append_dev(section2, div68);
				append_dev(section2, t137);
				append_dev(section2, br0);
				append_dev(section2, br1);
				append_dev(section2, br2);
				append_dev(section2, br3);
				append_dev(section2, br4);
				append_dev(section2, br5);
				append_dev(section2, br6);
				append_dev(section2, br7);
				append_dev(main, t138);
				append_dev(main, div69);
				append_dev(div69, span1);
				append_dev(main, t139);
				append_dev(main, section4);
				append_dev(section4, h1);
				append_dev(h1, span2);
				append_dev(span2, t140);
				append_dev(span2, div70);
				append_dev(section4, t142);
				append_dev(section4, doc0);
				append_dev(doc0, h20);
				append_dev(doc0, t144);
				append_dev(doc0, div71);
				append_dev(div71, t145);
				append_dev(div71, a2);
				append_dev(div71, t147);
				append_dev(div71, a3);
				append_dev(div71, t149);
				append_dev(doc0, t150);
				append_dev(doc0, div74);
				append_dev(div74, div73);
				append_dev(div73, div72);
				append_dev(div73, t151);
				append_dev(div73, small0);
				append_dev(div74, t153);
				mount_component(sqi0, div74, null);
				append_dev(doc0, t154);
				append_dev(doc0, div77);
				append_dev(div77, div76);
				append_dev(div76, div75);
				append_dev(div76, t155);
				append_dev(div77, t156);
				mount_component(sqi1, div77, null);
				append_dev(doc0, t157);
				append_dev(doc0, div80);
				append_dev(div80, div79);
				append_dev(div79, div78);
				append_dev(div79, t158);
				append_dev(div79, small1);
				append_dev(small1, t159);
				append_dev(small1, a4);
				append_dev(small1, t161);
				append_dev(div80, t162);
				mount_component(sqi2, div80, null);
				append_dev(doc0, t163);
				append_dev(doc0, div83);
				append_dev(div83, div82);
				append_dev(div82, div81);
				append_dev(div82, t164);
				append_dev(div83, t165);
				mount_component(sqi3, div83, null);
				append_dev(section4, t166);
				append_dev(section4, doc1);
				append_dev(doc1, h21);
				append_dev(doc1, t168);
				append_dev(doc1, div93);
				append_dev(div93, t169);
				append_dev(div93, div92);
				append_dev(div92, div84);
				append_dev(div84, h30);
				append_dev(div84, t171);
				append_dev(div84, p0);
				append_dev(p0, t172);
				append_dev(p0, br8);
				append_dev(p0, t173);
				append_dev(p0, b0);
				append_dev(p0, t175);
				append_dev(p0, a5);
				append_dev(div92, t177);
				append_dev(div92, div85);
				append_dev(div85, h31);
				append_dev(div85, t179);
				append_dev(div85, p1);
				append_dev(p1, t180);
				append_dev(p1, b1);
				append_dev(p1, t182);
				append_dev(p1, br9);
				append_dev(p1, t183);
				append_dev(p1, a6);
				append_dev(p1, t185);
				append_dev(p1, a7);
				append_dev(p1, t187);
				append_dev(div92, t188);
				append_dev(div92, div86);
				append_dev(div86, h32);
				append_dev(div86, t190);
				append_dev(div86, p2);
				append_dev(p2, t191);
				append_dev(p2, br10);
				append_dev(p2, br11);
				append_dev(p2, t192);
				append_dev(p2, b2);
				append_dev(p2, br12);
				append_dev(p2, t194);
				append_dev(p2, br13);
				append_dev(p2, t195);
				append_dev(p2, br14);
				append_dev(p2, t196);
				append_dev(p2, br15);
				append_dev(p2, t197);
				append_dev(p2, b3);
				append_dev(b3, t198);
				append_dev(b3, br16);
				append_dev(b3, t199);
				append_dev(b3, br17);
				append_dev(b3, t200);
				append_dev(div92, t201);
				append_dev(div92, div87);
				append_dev(div87, h33);
				append_dev(div87, t203);
				append_dev(div87, p3);
				append_dev(p3, t204);
				append_dev(p3, br18);
				append_dev(p3, t205);
				append_dev(p3, br19);
				append_dev(p3, t206);
				append_dev(p3, b4);
				append_dev(p3, t208);
				append_dev(p3, br20);
				append_dev(p3, t209);
				append_dev(p3, br21);
				append_dev(p3, t210);
				append_dev(p3, br22);
				append_dev(p3, t211);
				append_dev(p3, br23);
				append_dev(p3, t212);
				append_dev(p3, br24);
				append_dev(p3, t213);
				append_dev(p3, br25);
				append_dev(p3, t214);
				append_dev(p3, br26);
				append_dev(p3, t215);
				append_dev(p3, br27);
				append_dev(p3, t216);
				append_dev(div92, t217);
				append_dev(div92, div91);
				append_dev(div91, h34);
				append_dev(div91, t219);
				append_dev(div91, p4);
				append_dev(p4, small2);
				append_dev(p4, br28);
				append_dev(p4, t221);
				append_dev(div91, t222);
				append_dev(div91, div90);
				append_dev(div90, div89);
				append_dev(div89, div88);
				append_dev(div89, t223);
				append_dev(div90, t224);
				mount_component(sqi4, div90, null);
				append_dev(section4, t225);
				append_dev(section4, doc2);
				append_dev(doc2, h22);
				append_dev(doc2, t227);
				append_dev(doc2, div94);
				append_dev(div94, t228);
				append_dev(div94, br29);
				append_dev(div94, t229);
				append_dev(doc2, t230);
				append_dev(doc2, div99);
				append_dev(div99, div96);
				append_dev(div96, div95);
				append_dev(div96, t231);
				append_dev(div99, t232);
				mount_component(sqi5, div99, null);
				append_dev(div99, t233);
				append_dev(div99, div98);
				append_dev(div98, div97);
				append_dev(div98, t234);
				append_dev(div99, t235);
				mount_component(sqi6, div99, null);
				append_dev(section4, t236);
				append_dev(section4, doc3);
				append_dev(doc3, h23);
				append_dev(doc3, t238);
				append_dev(doc3, div100);
				append_dev(div100, t239);
				append_dev(div100, a8);
				append_dev(div100, t241);
				append_dev(div100, br30);
				append_dev(div100, t242);
				append_dev(div100, a9);
				append_dev(div100, t244);
				append_dev(doc3, t245);
				append_dev(doc3, div105);
				append_dev(div105, div101);
				append_dev(div101, t246);
				append_dev(div101, br31);
				append_dev(div101, t247);
				append_dev(div101, br32);
				append_dev(div101, t248);
				append_dev(div101, br33);
				append_dev(div105, t249);
				append_dev(div105, a10);
				append_dev(div105, t251);
				append_dev(div105, div102);
				append_dev(div102, t252);
				append_dev(div102, br34);
				append_dev(div102, t253);
				append_dev(div102, br35);
				append_dev(div102, t254);
				append_dev(div102, br36);
				append_dev(div105, t255);
				append_dev(div105, hr1);
				append_dev(div105, t256);
				append_dev(div105, div103);
				append_dev(div105, t258);
				append_dev(div105, div104);
				append_dev(section4, t260);
				append_dev(section4, doc4);
				append_dev(doc4, h24);
				append_dev(doc4, t262);
				append_dev(doc4, div106);
				append_dev(div106, t263);
				append_dev(div106, a11);
				append_dev(div106, t265);
				append_dev(div106, br37);
				append_dev(div106, t266);
				append_dev(section4, t267);
				append_dev(section4, doc5);
				append_dev(doc5, h25);
				append_dev(doc5, t269);
				append_dev(doc5, div107);
				append_dev(div107, t270);
				append_dev(div107, a12);
				append_dev(div107, t272);
				append_dev(div107, br38);
				append_dev(div107, t273);
				append_dev(section4, t274);
				append_dev(section4, doc6);
				append_dev(doc6, h26);
				append_dev(doc6, t276);
				append_dev(doc6, div108);
				append_dev(div108, t277);
				append_dev(div108, a13);
				append_dev(div108, t279);
				append_dev(div108, br39);
				append_dev(div108, t280);
				append_dev(section4, t281);
				append_dev(section4, doc7);
				append_dev(doc7, h27);
				append_dev(doc7, t283);
				append_dev(doc7, div109);
				append_dev(div109, t284);
				append_dev(div109, a14);
				append_dev(div109, t286);
				append_dev(div109, br40);
				append_dev(div109, t287);
				append_dev(section4, t288);
				append_dev(section4, doc8);
				append_dev(doc8, h28);
				append_dev(doc8, t290);
				append_dev(doc8, div110);
				append_dev(div110, t291);
				append_dev(div110, span3);
				append_dev(doc8, t292);
				append_dev(doc8, div113);
				append_dev(div113, div112);
				append_dev(div112, div111);
				append_dev(div112, t293);
				append_dev(div113, t294);
				mount_component(sqi7, div113, null);
				append_dev(doc8, t295);
				append_dev(doc8, div114);
				append_dev(div114, br41);
				append_dev(div114, t296);
				append_dev(div114, span4);
				append_dev(doc8, t297);
				append_dev(doc8, div117);
				append_dev(div117, div116);
				append_dev(div116, div115);
				append_dev(div116, t298);
				append_dev(div117, t299);
				mount_component(sqi8, div117, null);
				append_dev(section4, t300);
				append_dev(section4, doc9);
				append_dev(doc9, h29);
				append_dev(doc9, t302);
				append_dev(doc9, div118);
				append_dev(div118, t303);
				append_dev(div118, span5);
				append_dev(doc9, t304);
				append_dev(doc9, div121);
				append_dev(div121, div120);
				append_dev(div120, div119);
				append_dev(div120, t305);
				append_dev(div121, t306);
				mount_component(sqi9, div121, null);
				append_dev(doc9, t307);
				append_dev(doc9, div122);
				append_dev(div122, br42);
				append_dev(div122, t308);
				append_dev(doc9, t309);
				append_dev(doc9, div125);
				append_dev(div125, div124);
				append_dev(div124, div123);
				append_dev(div124, t310);
				append_dev(div125, t311);
				mount_component(sqi10, div125, null);
				append_dev(section4, t312);
				append_dev(section4, doc10);
				append_dev(doc10, h210);
				append_dev(doc10, t314);
				append_dev(doc10, div126);
				append_dev(div126, t315);
				append_dev(div126, span6);
				append_dev(doc10, t316);
				append_dev(doc10, div129);
				append_dev(div129, div128);
				append_dev(div128, div127);
				append_dev(div128, t317);
				append_dev(div129, t318);
				mount_component(sqi11, div129, null);
				append_dev(doc10, t319);
				append_dev(doc10, div130);
				append_dev(div130, br43);
				append_dev(div130, t320);
				append_dev(div130, span7);
				append_dev(doc10, t321);
				append_dev(doc10, div133);
				append_dev(div133, div132);
				append_dev(div132, div131);
				append_dev(div132, t322);
				append_dev(div133, t323);
				mount_component(sqi12, div133, null);
				append_dev(section4, t324);
				append_dev(section4, doc11);
				append_dev(doc11, h211);
				append_dev(doc11, t326);
				append_dev(doc11, div134);
				append_dev(div134, t327);
				append_dev(div134, span8);
				append_dev(doc11, t328);
				append_dev(doc11, div137);
				append_dev(div137, div136);
				append_dev(div136, div135);
				append_dev(div136, t329);
				append_dev(div137, t330);
				mount_component(sqi13, div137, null);
				append_dev(section4, t331);
				append_dev(section4, doc12);
				append_dev(doc12, h212);
				append_dev(doc12, t333);
				append_dev(doc12, div138);
				append_dev(div138, t334);
				append_dev(div138, span9);
				append_dev(doc12, t335);
				append_dev(doc12, div141);
				append_dev(div141, div140);
				append_dev(div140, div139);
				append_dev(div140, t336);
				append_dev(div141, t337);
				mount_component(sqi14, div141, null);
				append_dev(section4, t338);
				append_dev(section4, doc13);
				append_dev(doc13, h213);
				append_dev(doc13, t340);
				append_dev(doc13, div142);
				append_dev(div142, t341);
				append_dev(div142, span10);
				append_dev(doc13, t342);
				append_dev(doc13, div145);
				append_dev(div145, div144);
				append_dev(div144, div143);
				append_dev(div144, t343);
				append_dev(div145, t344);
				mount_component(sqi15, div145, null);
				append_dev(section4, t345);
				append_dev(section4, doc14);
				append_dev(doc14, h214);
				append_dev(doc14, t347);
				append_dev(doc14, div146);
				append_dev(div146, t348);
				append_dev(div146, span11);
				append_dev(doc14, t349);
				append_dev(doc14, div149);
				append_dev(div149, div148);
				append_dev(div148, div147);
				append_dev(div148, t350);
				append_dev(div149, t351);
				mount_component(sqi16, div149, null);
				append_dev(section4, t352);
				append_dev(section4, doc15);
				append_dev(doc15, h215);
				append_dev(doc15, t354);
				append_dev(doc15, div150);
				append_dev(div150, t355);
				append_dev(div150, span12);
				append_dev(doc15, t356);
				append_dev(doc15, div153);
				append_dev(div153, div152);
				append_dev(div152, div151);
				append_dev(div152, t357);
				append_dev(div153, t358);
				mount_component(sqi17, div153, null);
				append_dev(section4, t359);
				append_dev(section4, doc16);
				append_dev(doc16, h216);
				append_dev(doc16, t361);
				append_dev(doc16, div154);
				append_dev(div154, t362);
				append_dev(div154, span13);
				append_dev(doc16, t363);
				append_dev(doc16, div157);
				append_dev(div157, div156);
				append_dev(div156, div155);
				append_dev(div156, t364);
				append_dev(div157, t365);
				mount_component(sqi18, div157, null);
				append_dev(section4, t366);
				append_dev(section4, doc17);
				append_dev(doc17, h217);
				append_dev(doc17, t368);
				append_dev(doc17, div158);
				append_dev(div158, t369);
				append_dev(div158, span14);
				append_dev(doc17, t370);
				append_dev(doc17, div161);
				append_dev(div161, div160);
				append_dev(div160, div159);
				append_dev(div160, t371);
				append_dev(div161, t372);
				mount_component(sqi19, div161, null);
				append_dev(section4, t373);
				append_dev(section4, doc18);
				append_dev(doc18, h218);
				append_dev(doc18, t375);
				append_dev(doc18, div162);
				append_dev(div162, t376);
				append_dev(div162, span15);
				append_dev(doc18, t377);
				append_dev(doc18, div165);
				append_dev(div165, div164);
				append_dev(div164, div163);
				append_dev(div164, t378);
				append_dev(div165, t379);
				mount_component(sqi20, div165, null);
				append_dev(doc18, t380);
				append_dev(doc18, div166);
				append_dev(div166, br44);
				append_dev(div166, t381);
				append_dev(div166, span16);
				append_dev(doc18, t382);
				append_dev(doc18, div169);
				append_dev(div169, div168);
				append_dev(div168, div167);
				append_dev(div168, t383);
				append_dev(div169, t384);
				mount_component(sqi21, div169, null);
				append_dev(section4, t385);
				append_dev(section4, doc19);
				append_dev(doc19, h219);
				append_dev(doc19, t387);
				append_dev(doc19, div170);
				append_dev(div170, t388);
				append_dev(div170, span17);
				append_dev(doc19, t389);
				append_dev(doc19, div173);
				append_dev(div173, div172);
				append_dev(div172, div171);
				append_dev(div172, t390);
				append_dev(div173, t391);
				mount_component(sqi22, div173, null);
				append_dev(section4, t392);
				append_dev(section4, doc20);
				append_dev(doc20, h220);
				append_dev(doc20, t394);
				append_dev(doc20, div174);
				append_dev(div174, t395);
				append_dev(div174, span18);
				append_dev(doc20, t396);
				append_dev(doc20, div177);
				append_dev(div177, div176);
				append_dev(div176, div175);
				append_dev(div176, t397);
				append_dev(div177, t398);
				mount_component(sqi23, div177, null);
				append_dev(doc20, t399);
				append_dev(doc20, div178);
				append_dev(div178, br45);
				append_dev(div178, t400);
				append_dev(div178, span19);
				append_dev(doc20, t401);
				append_dev(doc20, div181);
				append_dev(div181, div180);
				append_dev(div180, div179);
				append_dev(div180, t402);
				append_dev(div181, t403);
				mount_component(sqi24, div181, null);
				append_dev(section4, t404);
				append_dev(section4, doc21);
				append_dev(doc21, h221);
				append_dev(doc21, t406);
				append_dev(doc21, div182);
				append_dev(div182, t407);
				append_dev(div182, span20);
				append_dev(doc21, t408);
				append_dev(doc21, div185);
				append_dev(div185, div184);
				append_dev(div184, div183);
				append_dev(div184, t409);
				append_dev(div185, t410);
				mount_component(sqi25, div185, null);
				append_dev(section4, t411);
				append_dev(section4, doc22);
				append_dev(doc22, h222);
				append_dev(doc22, t413);
				append_dev(doc22, div186);
				append_dev(div186, t414);
				append_dev(div186, span21);
				append_dev(doc22, t415);
				append_dev(doc22, div189);
				append_dev(div189, div188);
				append_dev(div188, div187);
				append_dev(div188, t416);
				append_dev(div189, t417);
				mount_component(sqi26, div189, null);
				append_dev(section4, t418);
				append_dev(section4, doc23);
				append_dev(doc23, h223);
				append_dev(doc23, t420);
				append_dev(doc23, div190);
				append_dev(div190, t421);
				append_dev(div190, span22);
				append_dev(doc23, t422);
				append_dev(doc23, div193);
				append_dev(div193, div192);
				append_dev(div192, div191);
				append_dev(div192, t423);
				append_dev(div193, t424);
				mount_component(sqi27, div193, null);
				append_dev(section4, t425);
				append_dev(section4, doc24);
				append_dev(doc24, h224);
				append_dev(doc24, t427);
				append_dev(doc24, div194);
				append_dev(div194, t428);
				append_dev(div194, span23);
				append_dev(doc24, t429);
				append_dev(doc24, div197);
				append_dev(div197, div196);
				append_dev(div196, div195);
				append_dev(div196, t430);
				append_dev(div197, t431);
				mount_component(sqi28, div197, null);
				append_dev(section4, t432);
				append_dev(section4, doc25);
				append_dev(doc25, h225);
				append_dev(doc25, t434);
				append_dev(doc25, div198);
				append_dev(div198, t435);
				append_dev(div198, span24);
				append_dev(doc25, t436);
				append_dev(doc25, div201);
				append_dev(div201, div200);
				append_dev(div200, div199);
				append_dev(div200, t437);
				append_dev(div201, t438);
				mount_component(sqi29, div201, null);
				append_dev(section4, t439);
				append_dev(section4, doc26);
				append_dev(doc26, h226);
				append_dev(doc26, t441);
				append_dev(doc26, div202);
				append_dev(div202, t442);
				append_dev(div202, span25);
				append_dev(doc26, t443);
				append_dev(doc26, div205);
				append_dev(div205, div204);
				append_dev(div204, div203);
				append_dev(div204, t444);
				append_dev(div205, t445);
				mount_component(sqi30, div205, null);
				append_dev(section4, t446);
				append_dev(section4, doc27);
				append_dev(doc27, h227);
				append_dev(doc27, t448);
				append_dev(doc27, div206);
				append_dev(div206, t449);
				append_dev(div206, span26);
				append_dev(doc27, t450);
				append_dev(doc27, div209);
				append_dev(div209, div208);
				append_dev(div208, div207);
				append_dev(div208, t451);
				append_dev(div209, t452);
				mount_component(sqi31, div209, null);
				append_dev(section4, t453);
				append_dev(section4, doc28);
				append_dev(doc28, h228);
				append_dev(doc28, t455);
				append_dev(doc28, div210);
				append_dev(div210, t456);
				append_dev(div210, span27);
				append_dev(doc28, t457);
				append_dev(doc28, div213);
				append_dev(div213, div212);
				append_dev(div212, div211);
				append_dev(div212, t458);
				append_dev(div213, t459);
				mount_component(sqi32, div213, null);
				append_dev(section4, t460);
				append_dev(section4, doc29);
				append_dev(doc29, h229);
				append_dev(doc29, t462);
				append_dev(doc29, div214);
				append_dev(div214, t463);
				append_dev(div214, span28);
				append_dev(doc29, t464);
				append_dev(doc29, div217);
				append_dev(div217, div216);
				append_dev(div216, div215);
				append_dev(div216, t465);
				append_dev(div217, t466);
				mount_component(sqi33, div217, null);
				append_dev(section4, t467);
				append_dev(section4, doc30);
				append_dev(doc30, h230);
				append_dev(doc30, t469);
				append_dev(doc30, div218);
				append_dev(div218, t470);
				append_dev(div218, span29);
				append_dev(doc30, t471);
				append_dev(doc30, div221);
				append_dev(div221, div220);
				append_dev(div220, div219);
				append_dev(div220, t472);
				append_dev(div221, t473);
				mount_component(sqi34, div221, null);
				append_dev(section4, t474);
				append_dev(section4, doc31);
				append_dev(doc31, h231);
				append_dev(doc31, t476);
				append_dev(doc31, div222);
				append_dev(div222, t477);
				append_dev(div222, span30);
				append_dev(doc31, t478);
				append_dev(doc31, div225);
				append_dev(div225, div224);
				append_dev(div224, div223);
				append_dev(div224, t479);
				append_dev(div225, t480);
				mount_component(sqi35, div225, null);
				append_dev(section4, t481);
				append_dev(section4, doc32);
				append_dev(doc32, h232);
				append_dev(doc32, t483);
				append_dev(doc32, div226);
				append_dev(div226, t484);
				append_dev(div226, span31);
				append_dev(doc32, t485);
				append_dev(doc32, div229);
				append_dev(div229, div228);
				append_dev(div228, div227);
				append_dev(div228, t486);
				append_dev(div229, t487);
				mount_component(sqi36, div229, null);
				append_dev(doc32, t488);
				append_dev(doc32, div230);
				append_dev(div230, br46);
				append_dev(div230, t489);
				append_dev(div230, span32);
				append_dev(doc32, t490);
				append_dev(doc32, div233);
				append_dev(div233, div232);
				append_dev(div232, div231);
				append_dev(div232, t491);
				append_dev(div233, t492);
				mount_component(sqi37, div233, null);
				append_dev(section4, t493);
				append_dev(section4, doc33);
				append_dev(doc33, h233);
				append_dev(doc33, t495);
				append_dev(doc33, div234);
				append_dev(div234, t496);
				append_dev(div234, span33);
				append_dev(doc33, t497);
				append_dev(doc33, div237);
				append_dev(div237, div236);
				append_dev(div236, div235);
				append_dev(div236, t498);
				append_dev(div237, t499);
				mount_component(sqi38, div237, null);
				append_dev(section4, t500);
				append_dev(section4, doc34);
				append_dev(doc34, h234);
				append_dev(doc34, t502);
				append_dev(doc34, div238);
				append_dev(div238, t503);
				append_dev(div238, span34);
				append_dev(doc34, t504);
				append_dev(doc34, div241);
				append_dev(div241, div240);
				append_dev(div240, div239);
				append_dev(div240, t505);
				append_dev(div241, t506);
				mount_component(sqi39, div241, null);
				append_dev(doc34, t507);
				append_dev(doc34, div242);
				append_dev(div242, br47);
				append_dev(div242, t508);
				append_dev(div242, span35);
				append_dev(doc34, t509);
				append_dev(doc34, div245);
				append_dev(div245, div244);
				append_dev(div244, div243);
				append_dev(div244, t510);
				append_dev(div245, t511);
				mount_component(sqi40, div245, null);
				append_dev(section4, t512);
				append_dev(section4, doc35);
				append_dev(doc35, h235);
				append_dev(doc35, t514);
				append_dev(doc35, div246);
				append_dev(div246, t515);
				append_dev(div246, span36);
				append_dev(doc35, t516);
				append_dev(doc35, div249);
				append_dev(div249, div248);
				append_dev(div248, div247);
				append_dev(div248, t517);
				append_dev(div249, t518);
				mount_component(sqi41, div249, null);
				append_dev(doc35, t519);
				append_dev(doc35, div250);
				append_dev(div250, br48);
				append_dev(div250, t520);
				append_dev(div250, span37);
				append_dev(doc35, t521);
				append_dev(doc35, div253);
				append_dev(div253, div252);
				append_dev(div252, div251);
				append_dev(div252, t522);
				append_dev(div253, t523);
				mount_component(sqi42, div253, null);
				append_dev(section4, t524);
				append_dev(section4, doc36);
				append_dev(doc36, h236);
				append_dev(doc36, t526);
				append_dev(doc36, div254);
				append_dev(div254, t527);
				append_dev(div254, span38);
				append_dev(doc36, t528);
				append_dev(doc36, div257);
				append_dev(div257, div256);
				append_dev(div256, div255);
				append_dev(div256, t529);
				append_dev(div257, t530);
				mount_component(sqi43, div257, null);
				append_dev(section4, t531);
				append_dev(section4, doc37);
				append_dev(doc37, h237);
				append_dev(doc37, t533);
				append_dev(doc37, div258);
				append_dev(div258, t534);
				append_dev(div258, span39);
				append_dev(doc37, t535);
				append_dev(doc37, div261);
				append_dev(div261, div260);
				append_dev(div260, div259);
				append_dev(div260, t536);
				append_dev(div261, t537);
				mount_component(sqi44, div261, null);
				append_dev(doc37, t538);
				append_dev(doc37, div262);
				append_dev(div262, br49);
				append_dev(div262, t539);
				append_dev(div262, span40);
				append_dev(doc37, t540);
				append_dev(doc37, div265);
				append_dev(div265, div264);
				append_dev(div264, div263);
				append_dev(div264, t541);
				append_dev(div265, t542);
				mount_component(sqi45, div265, null);
				append_dev(section4, t543);
				append_dev(section4, doc38);
				append_dev(doc38, h238);
				append_dev(doc38, t545);
				append_dev(doc38, div266);
				append_dev(div266, t546);
				append_dev(div266, span41);
				append_dev(doc38, t547);
				append_dev(doc38, div269);
				append_dev(div269, div268);
				append_dev(div268, div267);
				append_dev(div268, t548);
				append_dev(div269, t549);
				mount_component(sqi46, div269, null);
				append_dev(section4, t550);
				append_dev(section4, doc39);
				append_dev(doc39, h239);
				append_dev(doc39, t552);
				append_dev(doc39, div270);
				append_dev(div270, t553);
				append_dev(div270, span42);
				append_dev(doc39, t554);
				append_dev(doc39, div273);
				append_dev(div273, div272);
				append_dev(div272, div271);
				append_dev(div272, t555);
				append_dev(div273, t556);
				mount_component(sqi47, div273, null);
				append_dev(section4, t557);
				append_dev(section4, doc40);
				append_dev(doc40, h240);
				append_dev(doc40, t559);
				append_dev(doc40, div274);
				append_dev(div274, t560);
				append_dev(div274, span43);
				append_dev(doc40, t561);
				append_dev(doc40, div277);
				append_dev(div277, div276);
				append_dev(div276, div275);
				append_dev(div276, t562);
				append_dev(div277, t563);
				mount_component(sqi48, div277, null);
				append_dev(section4, t564);
				append_dev(section4, doc41);
				append_dev(doc41, h241);
				append_dev(doc41, t566);
				append_dev(doc41, div278);
				append_dev(div278, t567);
				append_dev(div278, span44);
				append_dev(doc41, t568);
				append_dev(doc41, div281);
				append_dev(div281, div280);
				append_dev(div280, div279);
				append_dev(div280, t569);
				append_dev(div281, t570);
				mount_component(sqi49, div281, null);
				append_dev(section4, t571);
				append_dev(section4, doc42);
				append_dev(doc42, h242);
				append_dev(doc42, t573);
				append_dev(doc42, div282);
				append_dev(div282, t574);
				append_dev(div282, span45);
				append_dev(doc42, t575);
				append_dev(doc42, div285);
				append_dev(div285, div284);
				append_dev(div284, div283);
				append_dev(div284, t576);
				append_dev(div285, t577);
				mount_component(sqi50, div285, null);
				append_dev(section4, t578);
				append_dev(section4, doc43);
				append_dev(doc43, h243);
				append_dev(doc43, t580);
				append_dev(doc43, div286);
				append_dev(div286, t581);
				append_dev(div286, span46);
				append_dev(doc43, t582);
				append_dev(doc43, div289);
				append_dev(div289, div288);
				append_dev(div288, div287);
				append_dev(div288, t583);
				append_dev(div289, t584);
				mount_component(sqi51, div289, null);
				append_dev(section4, t585);
				append_dev(section4, doc44);
				append_dev(doc44, h244);
				append_dev(doc44, t587);
				append_dev(doc44, div290);
				append_dev(div290, t588);
				append_dev(div290, span47);
				append_dev(doc44, t589);
				append_dev(doc44, div293);
				append_dev(div293, div292);
				append_dev(div292, div291);
				append_dev(div292, t590);
				append_dev(div293, t591);
				mount_component(sqi52, div293, null);
				append_dev(section4, t592);
				append_dev(section4, doc45);
				append_dev(doc45, h245);
				append_dev(doc45, t594);
				append_dev(doc45, div294);
				append_dev(div294, t595);
				append_dev(div294, span48);
				append_dev(doc45, t596);
				append_dev(doc45, div297);
				append_dev(div297, div296);
				append_dev(div296, div295);
				append_dev(div296, t597);
				append_dev(div297, t598);
				mount_component(sqi53, div297, null);
				append_dev(section4, t599);
				append_dev(section4, doc46);
				append_dev(doc46, h246);
				append_dev(doc46, t601);
				append_dev(doc46, div298);
				append_dev(div298, t602);
				append_dev(div298, span49);
				append_dev(doc46, t603);
				append_dev(doc46, div301);
				append_dev(div301, div300);
				append_dev(div300, div299);
				append_dev(div300, t604);
				append_dev(div301, t605);
				mount_component(sqi54, div301, null);
				append_dev(section4, t606);
				append_dev(section4, doc47);
				append_dev(doc47, h247);
				append_dev(doc47, t608);
				append_dev(doc47, div302);
				append_dev(div302, t609);
				append_dev(div302, span50);
				append_dev(doc47, t610);
				append_dev(doc47, div305);
				append_dev(div305, div304);
				append_dev(div304, div303);
				append_dev(div304, t611);
				append_dev(div305, t612);
				mount_component(sqi55, div305, null);
				append_dev(section4, t613);
				append_dev(section4, doc48);
				append_dev(doc48, h248);
				append_dev(doc48, t615);
				append_dev(doc48, div306);
				append_dev(div306, t616);
				append_dev(div306, span51);
				append_dev(doc48, t617);
				append_dev(doc48, div309);
				append_dev(div309, div308);
				append_dev(div308, div307);
				append_dev(div308, t618);
				append_dev(div309, t619);
				mount_component(sqi56, div309, null);
				append_dev(section4, t620);
				append_dev(section4, doc49);
				append_dev(doc49, h249);
				append_dev(doc49, t622);
				append_dev(doc49, div310);
				append_dev(div310, t623);
				append_dev(div310, span52);
				append_dev(doc49, t624);
				append_dev(doc49, div313);
				append_dev(div313, div312);
				append_dev(div312, div311);
				append_dev(div312, t625);
				append_dev(div313, t626);
				mount_component(sqi57, div313, null);
				append_dev(section4, t627);
				append_dev(section4, doc50);
				append_dev(doc50, h250);
				append_dev(doc50, t629);
				append_dev(doc50, div314);
				append_dev(div314, t630);
				append_dev(div314, span53);
				append_dev(doc50, t631);
				append_dev(doc50, div317);
				append_dev(div317, div316);
				append_dev(div316, div315);
				append_dev(div316, t632);
				append_dev(div317, t633);
				mount_component(sqi58, div317, null);
				append_dev(section4, t634);
				append_dev(section4, doc51);
				append_dev(doc51, h251);
				append_dev(doc51, t636);
				append_dev(doc51, div318);
				append_dev(div318, t637);
				append_dev(div318, span54);
				append_dev(doc51, t638);
				append_dev(doc51, div321);
				append_dev(div321, div320);
				append_dev(div320, div319);
				append_dev(div320, t639);
				append_dev(div321, t640);
				mount_component(sqi59, div321, null);
				current = true;
			},
			p: noop,
			i: function intro(local) {
				if (current) return;
				transition_in(sqi0.$$.fragment, local);
				transition_in(sqi1.$$.fragment, local);
				transition_in(sqi2.$$.fragment, local);
				transition_in(sqi3.$$.fragment, local);
				transition_in(sqi4.$$.fragment, local);
				transition_in(sqi5.$$.fragment, local);
				transition_in(sqi6.$$.fragment, local);
				transition_in(sqi7.$$.fragment, local);
				transition_in(sqi8.$$.fragment, local);
				transition_in(sqi9.$$.fragment, local);
				transition_in(sqi10.$$.fragment, local);
				transition_in(sqi11.$$.fragment, local);
				transition_in(sqi12.$$.fragment, local);
				transition_in(sqi13.$$.fragment, local);
				transition_in(sqi14.$$.fragment, local);
				transition_in(sqi15.$$.fragment, local);
				transition_in(sqi16.$$.fragment, local);
				transition_in(sqi17.$$.fragment, local);
				transition_in(sqi18.$$.fragment, local);
				transition_in(sqi19.$$.fragment, local);
				transition_in(sqi20.$$.fragment, local);
				transition_in(sqi21.$$.fragment, local);
				transition_in(sqi22.$$.fragment, local);
				transition_in(sqi23.$$.fragment, local);
				transition_in(sqi24.$$.fragment, local);
				transition_in(sqi25.$$.fragment, local);
				transition_in(sqi26.$$.fragment, local);
				transition_in(sqi27.$$.fragment, local);
				transition_in(sqi28.$$.fragment, local);
				transition_in(sqi29.$$.fragment, local);
				transition_in(sqi30.$$.fragment, local);
				transition_in(sqi31.$$.fragment, local);
				transition_in(sqi32.$$.fragment, local);
				transition_in(sqi33.$$.fragment, local);
				transition_in(sqi34.$$.fragment, local);
				transition_in(sqi35.$$.fragment, local);
				transition_in(sqi36.$$.fragment, local);
				transition_in(sqi37.$$.fragment, local);
				transition_in(sqi38.$$.fragment, local);
				transition_in(sqi39.$$.fragment, local);
				transition_in(sqi40.$$.fragment, local);
				transition_in(sqi41.$$.fragment, local);
				transition_in(sqi42.$$.fragment, local);
				transition_in(sqi43.$$.fragment, local);
				transition_in(sqi44.$$.fragment, local);
				transition_in(sqi45.$$.fragment, local);
				transition_in(sqi46.$$.fragment, local);
				transition_in(sqi47.$$.fragment, local);
				transition_in(sqi48.$$.fragment, local);
				transition_in(sqi49.$$.fragment, local);
				transition_in(sqi50.$$.fragment, local);
				transition_in(sqi51.$$.fragment, local);
				transition_in(sqi52.$$.fragment, local);
				transition_in(sqi53.$$.fragment, local);
				transition_in(sqi54.$$.fragment, local);
				transition_in(sqi55.$$.fragment, local);
				transition_in(sqi56.$$.fragment, local);
				transition_in(sqi57.$$.fragment, local);
				transition_in(sqi58.$$.fragment, local);
				transition_in(sqi59.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(sqi0.$$.fragment, local);
				transition_out(sqi1.$$.fragment, local);
				transition_out(sqi2.$$.fragment, local);
				transition_out(sqi3.$$.fragment, local);
				transition_out(sqi4.$$.fragment, local);
				transition_out(sqi5.$$.fragment, local);
				transition_out(sqi6.$$.fragment, local);
				transition_out(sqi7.$$.fragment, local);
				transition_out(sqi8.$$.fragment, local);
				transition_out(sqi9.$$.fragment, local);
				transition_out(sqi10.$$.fragment, local);
				transition_out(sqi11.$$.fragment, local);
				transition_out(sqi12.$$.fragment, local);
				transition_out(sqi13.$$.fragment, local);
				transition_out(sqi14.$$.fragment, local);
				transition_out(sqi15.$$.fragment, local);
				transition_out(sqi16.$$.fragment, local);
				transition_out(sqi17.$$.fragment, local);
				transition_out(sqi18.$$.fragment, local);
				transition_out(sqi19.$$.fragment, local);
				transition_out(sqi20.$$.fragment, local);
				transition_out(sqi21.$$.fragment, local);
				transition_out(sqi22.$$.fragment, local);
				transition_out(sqi23.$$.fragment, local);
				transition_out(sqi24.$$.fragment, local);
				transition_out(sqi25.$$.fragment, local);
				transition_out(sqi26.$$.fragment, local);
				transition_out(sqi27.$$.fragment, local);
				transition_out(sqi28.$$.fragment, local);
				transition_out(sqi29.$$.fragment, local);
				transition_out(sqi30.$$.fragment, local);
				transition_out(sqi31.$$.fragment, local);
				transition_out(sqi32.$$.fragment, local);
				transition_out(sqi33.$$.fragment, local);
				transition_out(sqi34.$$.fragment, local);
				transition_out(sqi35.$$.fragment, local);
				transition_out(sqi36.$$.fragment, local);
				transition_out(sqi37.$$.fragment, local);
				transition_out(sqi38.$$.fragment, local);
				transition_out(sqi39.$$.fragment, local);
				transition_out(sqi40.$$.fragment, local);
				transition_out(sqi41.$$.fragment, local);
				transition_out(sqi42.$$.fragment, local);
				transition_out(sqi43.$$.fragment, local);
				transition_out(sqi44.$$.fragment, local);
				transition_out(sqi45.$$.fragment, local);
				transition_out(sqi46.$$.fragment, local);
				transition_out(sqi47.$$.fragment, local);
				transition_out(sqi48.$$.fragment, local);
				transition_out(sqi49.$$.fragment, local);
				transition_out(sqi50.$$.fragment, local);
				transition_out(sqi51.$$.fragment, local);
				transition_out(sqi52.$$.fragment, local);
				transition_out(sqi53.$$.fragment, local);
				transition_out(sqi54.$$.fragment, local);
				transition_out(sqi55.$$.fragment, local);
				transition_out(sqi56.$$.fragment, local);
				transition_out(sqi57.$$.fragment, local);
				transition_out(sqi58.$$.fragment, local);
				transition_out(sqi59.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) detach_dev(main);
				destroy_component(sqi0);
				destroy_component(sqi1);
				destroy_component(sqi2);
				destroy_component(sqi3);
				destroy_component(sqi4);
				destroy_component(sqi5);
				destroy_component(sqi6);
				destroy_component(sqi7);
				destroy_component(sqi8);
				destroy_component(sqi9);
				destroy_component(sqi10);
				destroy_component(sqi11);
				destroy_component(sqi12);
				destroy_component(sqi13);
				destroy_component(sqi14);
				destroy_component(sqi15);
				destroy_component(sqi16);
				destroy_component(sqi17);
				destroy_component(sqi18);
				destroy_component(sqi19);
				destroy_component(sqi20);
				destroy_component(sqi21);
				destroy_component(sqi22);
				destroy_component(sqi23);
				destroy_component(sqi24);
				destroy_component(sqi25);
				destroy_component(sqi26);
				destroy_component(sqi27);
				destroy_component(sqi28);
				destroy_component(sqi29);
				destroy_component(sqi30);
				destroy_component(sqi31);
				destroy_component(sqi32);
				destroy_component(sqi33);
				destroy_component(sqi34);
				destroy_component(sqi35);
				destroy_component(sqi36);
				destroy_component(sqi37);
				destroy_component(sqi38);
				destroy_component(sqi39);
				destroy_component(sqi40);
				destroy_component(sqi41);
				destroy_component(sqi42);
				destroy_component(sqi43);
				destroy_component(sqi44);
				destroy_component(sqi45);
				destroy_component(sqi46);
				destroy_component(sqi47);
				destroy_component(sqi48);
				destroy_component(sqi49);
				destroy_component(sqi50);
				destroy_component(sqi51);
				destroy_component(sqi52);
				destroy_component(sqi53);
				destroy_component(sqi54);
				destroy_component(sqi55);
				destroy_component(sqi56);
				destroy_component(sqi57);
				destroy_component(sqi58);
				destroy_component(sqi59);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$2.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$2($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Docs', slots, []);
		document.getElementsByTagName('body')[0].style.display = 'none';

		if (sQuery().isPageLoaded()) {
			console.log('spa loaded');

			setTimeout(
				() => {
					loadProc();
				},
				1
			);
		}

		sQuery(() => {
			loadProc();

			setTimeout(
				() => {
					sQuery('.cJQVer').each(function () {
						const v = sQuery(this).attr('v');
						sQuery(this).html(`<a href="https://api.jquery.com/${v}" target=_blank class="notranslate">jQuery ${v}(doc)</a>`);
					});
				},
				100
			);
		});

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<Docs> was created with unknown prop '${key}'`);
		});

		$$self.$capture_state = () => ({ sq: sQuery, name, loadProc, Sqi: Sq_editorI });
		return [];
	}

	class Docs extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Docs",
				options,
				id: create_fragment$2.name
			});
		}
	}

	/* src/Sq_editor.svelte generated by Svelte v3.44.0 */

	const { console: console_1 } = globals;
	const file = "src/Sq_editor.svelte";

	// (104:0) <Core>
	function create_default_slot(ctx) {
		let link0;
		let t0;
		let link1;
		let t1;
		let link2;
		let t2;
		let link3;
		let t3;
		let link4;
		let t4;
		let h1;
		let t6;
		let section;
		let div;
		let textarea;
		let t7;
		let pre;
		let code;
		let t8;
		let iframe;

		const block = {
			c: function create() {
				link0 = element("link");
				t0 = space();
				link1 = element("link");
				t1 = space();
				link2 = element("link");
				t2 = space();
				link3 = element("link");
				t3 = space();
				link4 = element("link");
				t4 = space();
				h1 = element("h1");
				h1.textContent = "sQuery Online Editor";
				t6 = space();
				section = element("section");
				div = element("div");
				textarea = element("textarea");
				t7 = space();
				pre = element("pre");
				code = element("code");
				t8 = space();
				iframe = element("iframe");
				attr_dev(link0, "rel", "preconnect");
				attr_dev(link0, "href", "https://fonts.googleapis.com");
				add_location(link0, file, 104, 0, 2349);
				attr_dev(link1, "rel", "preconnect");
				attr_dev(link1, "href", "https://fonts.gstatic.com");
				attr_dev(link1, "crossorigin", "");
				add_location(link1, file, 105, 0, 2409);
				attr_dev(link2, "href", "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300&display=swap");
				attr_dev(link2, "rel", "stylesheet");
				add_location(link2, file, 106, 0, 2478);
				attr_dev(link3, "rel", "stylesheet");
				attr_dev(link3, "href", "./Docs.css");
				add_location(link3, file, 108, 1, 2590);
				attr_dev(link4, "rel", "stylesheet");
				attr_dev(link4, "href", "./Sq_editor.css");
				add_location(link4, file, 109, 1, 2633);
				attr_dev(h1, "class", "svelte-1xmg9bp");
				add_location(h1, file, 110, 1, 2681);
				attr_dev(textarea, "placeholder", "Enter HTML Source Code");
				attr_dev(textarea, "id", "editing");
				attr_dev(textarea, "spellcheck", "false");
				add_location(textarea, file, 113, 3, 2770);
				attr_dev(code, "class", "language-html");
				attr_dev(code, "id", "highlighting-content");
				add_location(code, file, 115, 4, 2911);
				attr_dev(pre, "id", "highlighting");
				attr_dev(pre, "aria-hidden", "true");
				add_location(pre, file, 114, 3, 2864);
				attr_dev(div, "class", "cCodeSpace svelte-1xmg9bp");
				add_location(div, file, 112, 2, 2742);
				attr_dev(iframe, "id", "idResult");
				attr_dev(iframe, "title", "editor");
				attr_dev(iframe, "class", "svelte-1xmg9bp");
				add_location(iframe, file, 120, 2, 3059);
				attr_dev(section, "class", "cCodeCont");
				add_location(section, file, 111, 1, 2712);
			},
			m: function mount(target, anchor) {
				insert_dev(target, link0, anchor);
				insert_dev(target, t0, anchor);
				insert_dev(target, link1, anchor);
				insert_dev(target, t1, anchor);
				insert_dev(target, link2, anchor);
				insert_dev(target, t2, anchor);
				insert_dev(target, link3, anchor);
				insert_dev(target, t3, anchor);
				insert_dev(target, link4, anchor);
				insert_dev(target, t4, anchor);
				insert_dev(target, h1, anchor);
				insert_dev(target, t6, anchor);
				insert_dev(target, section, anchor);
				append_dev(section, div);
				append_dev(div, textarea);
				append_dev(div, t7);
				append_dev(div, pre);
				append_dev(pre, code);
				append_dev(section, t8);
				append_dev(section, iframe);
			},
			d: function destroy(detaching) {
				if (detaching) detach_dev(link0);
				if (detaching) detach_dev(t0);
				if (detaching) detach_dev(link1);
				if (detaching) detach_dev(t1);
				if (detaching) detach_dev(link2);
				if (detaching) detach_dev(t2);
				if (detaching) detach_dev(link3);
				if (detaching) detach_dev(t3);
				if (detaching) detach_dev(link4);
				if (detaching) detach_dev(t4);
				if (detaching) detach_dev(h1);
				if (detaching) detach_dev(t6);
				if (detaching) detach_dev(section);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_default_slot.name,
			type: "slot",
			source: "(104:0) <Core>",
			ctx
		});

		return block;
	}

	function create_fragment$1(ctx) {
		let core;
		let current;

		core = new Core({
				props: {
					$$slots: { default: [create_default_slot] },
					$$scope: { ctx }
				},
				$$inline: true
			});

		const block = {
			c: function create() {
				create_component(core.$$.fragment);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				mount_component(core, target, anchor);
				current = true;
			},
			p: function update(ctx, [dirty]) {
				const core_changes = {};

				if (dirty & /*$$scope*/ 4) {
					core_changes.$$scope = { dirty, ctx };
				}

				core.$set(core_changes);
			},
			i: function intro(local) {
				if (current) return;
				transition_in(core.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(core.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				destroy_component(core, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$1.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$1($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Sq_editor', slots, []);

		let c = `<p id="p1">element1<\/p>
<p id="p2">element2<\/p>
<p id="p3">element3<\/p>

<script src="./squery.min.js"><\/script>
<script>
sq(()=>{
	sq('p').css('font-size', '22px')
	sq('p').on('click', function(){
		sq(this).css('background', 'yellow')
	})
	sq('p[id="p2"]').on('mouseover', function(){
		sq(this).css({
			border: '1px dotted blue',
			textShadow: '2px 2px 8px #44f'
		})
	}).on('mouseout', function(){
		sq(this).css({
			border: 'none',
			textShadow: 'none'
		})
	})
})
<\/script>
`;

		let loadProc = function () {
			console.log('load 2');
			sQuery('body').hide().fadeIn(400);

			sQuery('#editing').on('change', function () {
				//console.log('change')
				let code = sQuery('#editing').val().replace(/'/g, "\\'").replace(/\n/g, "\\n");

				//document.getElementById('idResult').contentWindow.document.write(code);
				var myIFrame = document.getElementById('idResult');

				myIFrame.src = "javascript:'" + code + "'";
			});

			sQuery('#editing').on('input', function () {
				//console.log('input')
				update(this.value);

				sync_scroll(this);
			});

			sQuery('#editing').on('keydown', function (e) {
				//console.log('keydown')
				switch (e.keyCode) {
					case 9:
						window.bTab = true;
						e.preventDefault();
						return false;
					case 16:
						window.bShift = true;
						e.preventDefault();
						return false;
					case 17:
						window.bCtrl = true;
						e.preventDefault();
						return false;
				}
			}); //

			sQuery('#editing').on('keyup', function (e) {
				//console.log('keyup' )
				check_tab(this, e);

				switch (e.keyCode) {
					case 9:
						return false;
					case 16:
						window.bShift = false;
						return false;
					case 17:
						window.bCtrl = false;
						return false;
				}
			});

			sQuery('#editing').on('scroll', function (e) {
				sync_scroll(this);
			});

			sQuery('#editing').val(c).trg('input').trg('change');
			sQuery('#idDoc').css({ 'width': '100%', 'max-width': '100%' });
			sQuery('.cF').contains('editor').addClass('active');
		};

		if (sQuery().isPageLoaded()) {
			console.log('spa loaded');

			setTimeout(
				() => {
					loadProc();
				},
				1
			);
		}

		sQuery(() => {
			console.log('loaded');
			loadProc();
		});

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Sq_editor> was created with unknown prop '${key}'`);
		});

		$$self.$capture_state = () => ({
			sq: sQuery,
			update,
			sync_scroll,
			check_tab,
			Core,
			c,
			loadProc
		});

		$$self.$inject_state = $$props => {
			if ('c' in $$props) c = $$props.c;
			if ('loadProc' in $$props) loadProc = $$props.loadProc;
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		return [];
	}

	class Sq_editor extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Sq_editor",
				options,
				id: create_fragment$1.name
			});
		}
	}

	/* src/App.svelte generated by Svelte v3.44.0 */

	function create_fragment(ctx) {
		let router;
		let current;

		router = new Router({
				props: { routes: /*routes*/ ctx[0] },
				$$inline: true
			});

		const block = {
			c: function create() {
				create_component(router.$$.fragment);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				mount_component(router, target, anchor);
				current = true;
			},
			p: noop,
			i: function intro(local) {
				if (current) return;
				transition_in(router.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(router.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				destroy_component(router, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('App', slots, []);

		const routes = {
			'/': Home,
			'/docs': Docs,
			'/sq': Sq_editor,
			'/sqi': Sq_editorI,
			'*': Home
		};

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
		});

		$$self.$capture_state = () => ({ Router, Home, Docs, Sq: Sq_editor, Sqi: Sq_editorI, routes });
		return [routes];
	}

	class App extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance, create_fragment, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "App",
				options,
				id: create_fragment.name
			});
		}
	}

	const app = new App({
		target: document.body,
		props: {
			//name: 'sQuery - Native speed jQuery for Svelte'
		}
	});

	return app;

})();
//# sourceMappingURL=bundle.js.map
