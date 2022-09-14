
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

	const { Error: Error_1, Object: Object_1, console: console_1$6 } = globals;

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

	function create_fragment$8(ctx) {
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
			id: create_fragment$8.name,
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

	function instance$8($$self, $$props, $$invalidate) {
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
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$6.warn(`<Router> was created with unknown prop '${key}'`);
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

			init(this, options, instance$8, create_fragment$8, safe_not_equal, {
				routes: 3,
				prefix: 4,
				restoreScrollState: 5
			});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Router",
				options,
				id: create_fragment$8.name
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

	const { console: console_1$5 } = globals;
	const file$6 = "src/Core.svelte";

	function create_fragment$7(ctx) {
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
				add_location(link, file$6, 51, 1, 1128);
				attr_dev(span0, "id", "idDocNav");
				add_location(span0, file$6, 53, 2, 1195);
				attr_dev(a0, "href", "https://squery-vercel-app.translate.goog/?&_x_tr_sl=auto&_x_tr_tl=ja&_x_tr_hl=en&_x_tr_pto=wapp");
				set_style(a0, "color", "#fff", 1);
				add_location(a0, file$6, 54, 45, 1268);
				set_style(div0, "float", "right");
				set_style(div0, "margin-right", "20px");
				add_location(div0, file$6, 54, 2, 1225);
				attr_dev(section0, "id", "idHead");
				add_location(section0, file$6, 52, 1, 1171);
				attr_dev(a1, "href", "./");
				set_style(a1, "color", "#fff");
				add_location(a1, file$6, 59, 44, 1529);
				attr_dev(div1, "id", "idLeftLogo");
				attr_dev(div1, "class", "notranslate");
				add_location(div1, file$6, 59, 3, 1488);
				attr_dev(section1, "id", "idLeftTop");
				add_location(section1, file$6, 58, 2, 1460);
				attr_dev(div2, "name", "");
				attr_dev(div2, "class", "cSub");
				add_location(div2, file$6, 63, 4, 1666);
				attr_dev(a2, "href", "./#/docs/");
				add_location(a2, file$6, 64, 28, 1732);
				attr_dev(div3, "name", "");
				attr_dev(div3, "class", "cF");
				add_location(div3, file$6, 64, 4, 1708);
				attr_dev(a3, "href", "./#/examples/");
				add_location(a3, file$6, 65, 28, 1804);
				attr_dev(div4, "name", "");
				attr_dev(div4, "class", "cF");
				add_location(div4, file$6, 65, 4, 1780);
				attr_dev(a4, "href", "./#/sq/");
				add_location(a4, file$6, 66, 28, 1875);
				attr_dev(div5, "name", "");
				attr_dev(div5, "class", "cF");
				add_location(div5, file$6, 66, 4, 1851);
				set_style(div6, "font-weight", "300");
				add_location(div6, file$6, 62, 3, 1632);
				attr_dev(div7, "name", "");
				attr_dev(div7, "class", "cSub");
				add_location(div7, file$6, 69, 3, 1932);
				attr_dev(a5, "href", "https://beacons.ai/exis");
				attr_dev(a5, "target", "_blank");
				add_location(a5, file$6, 70, 27, 2001);
				attr_dev(div8, "name", "");
				attr_dev(div8, "class", "cF");
				add_location(div8, file$6, 70, 3, 1977);
				attr_dev(a6, "href", "https://github.com/exis9/sQuery");
				attr_dev(a6, "target", "_blank");
				add_location(a6, file$6, 71, 27, 2095);
				attr_dev(div9, "name", "");
				attr_dev(div9, "class", "cF");
				add_location(div9, file$6, 71, 3, 2071);
				attr_dev(a7, "href", "https://twitter.com/ExisVR");
				attr_dev(a7, "target", "_blank");
				attr_dev(a7, "class", "notranslate");
				add_location(a7, file$6, 72, 27, 2195);
				attr_dev(div10, "name", "");
				attr_dev(div10, "class", "cF");
				add_location(div10, file$6, 72, 3, 2171);
				attr_dev(a8, "href", "https://stackoverflow.com/questions/tagged/squery");
				attr_dev(a8, "target", "_blank");
				add_location(a8, file$6, 73, 27, 2311);
				attr_dev(div11, "name", "");
				attr_dev(div11, "class", "cF");
				add_location(div11, file$6, 73, 3, 2287);
				attr_dev(a9, "href", "#a");
				attr_dev(a9, "onclick", "alert('Sorry! Please contact me using twitter DM for now..!');return false");
				add_location(a9, file$6, 74, 27, 2432);
				attr_dev(div12, "name", "");
				attr_dev(div12, "class", "cF");
				add_location(div12, file$6, 74, 3, 2408);
				attr_dev(section2, "class", "cScrollable");
				add_location(section2, file$6, 61, 2, 1599);
				attr_dev(section3, "id", "idLeft");
				add_location(section3, file$6, 57, 1, 1436);
				add_location(span1, file$6, 79, 28, 2603);
				attr_dev(div13, "class", "menu__toggler");
				add_location(div13, file$6, 79, 1, 2576);
				add_location(br0, file$6, 83, 2, 2664);
				add_location(br1, file$6, 83, 6, 2668);
				attr_dev(section4, "id", "idDoc");
				add_location(section4, file$6, 81, 1, 2625);
				add_location(main, file$6, 50, 0, 1120);
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
			id: create_fragment$7.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$7($$self, $$props, $$invalidate) {
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
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$5.warn(`<Core> was created with unknown prop '${key}'`);
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
			init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Core",
				options,
				id: create_fragment$7.name
			});
		}
	}

	/* src/Home.svelte generated by Svelte v3.44.0 */
	const file$5 = "src/Home.svelte";

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
				add_location(div0, file$5, 7, 34, 235);
				attr_dev(h1, "class", "notranslate");
				add_location(h1, file$5, 7, 1, 202);
				add_location(h20, file$5, 10, 2, 291);
				add_location(b0, file$5, 12, 3, 327);
				add_location(red0, file$5, 12, 27, 351);
				add_location(b1, file$5, 12, 81, 405);
				add_location(b2, file$5, 12, 146, 470);
				add_location(br0, file$5, 13, 3, 553);
				add_location(br1, file$5, 13, 7, 557);
				add_location(br2, file$5, 15, 3, 687);
				add_location(br3, file$5, 15, 7, 691);
				add_location(i0, file$5, 16, 3, 699);
				add_location(br4, file$5, 17, 3, 820);
				add_location(br5, file$5, 17, 7, 824);
				add_location(b3, file$5, 18, 38, 867);
				add_location(b4, file$5, 18, 72, 901);
				add_location(i1, file$5, 18, 3, 832);
				add_location(br6, file$5, 19, 3, 959);
				add_location(br7, file$5, 19, 7, 963);
				add_location(red1, file$5, 20, 137, 1105);
				add_location(blue, file$5, 20, 197, 1165);
				add_location(br8, file$5, 21, 3, 1211);
				add_location(br9, file$5, 21, 7, 1215);
				add_location(red2, file$5, 22, 91, 1311);
				add_location(br10, file$5, 24, 3, 1487);
				add_location(br11, file$5, 24, 7, 1491);
				add_location(th0, file$5, 29, 5, 1560);
				add_location(th1, file$5, 30, 5, 1579);
				add_location(th2, file$5, 31, 5, 1600);
				add_location(th3, file$5, 32, 5, 1619);
				add_location(th4, file$5, 33, 5, 1645);
				add_location(tr0, file$5, 28, 5, 1550);
				add_location(thead, file$5, 27, 5, 1537);
				add_location(td0, file$5, 38, 5, 1725);
				add_location(strong0, file$5, 39, 9, 1754);
				add_location(td1, file$5, 39, 5, 1750);
				add_location(td2, file$5, 40, 5, 1787);
				add_location(td3, file$5, 41, 5, 1809);
				add_location(strong1, file$5, 42, 9, 1835);
				add_location(td4, file$5, 42, 5, 1831);
				add_location(tr1, file$5, 37, 5, 1715);
				add_location(td5, file$5, 45, 5, 1890);
				add_location(strong2, file$5, 46, 9, 1917);
				add_location(td6, file$5, 46, 5, 1913);
				add_location(td7, file$5, 47, 5, 1950);
				add_location(td8, file$5, 48, 5, 1970);
				add_location(strong3, file$5, 49, 9, 1994);
				add_location(td9, file$5, 49, 5, 1990);
				add_location(tr2, file$5, 44, 5, 1880);
				add_location(td10, file$5, 52, 5, 2048);
				add_location(strong4, file$5, 53, 9, 2089);
				add_location(td11, file$5, 53, 5, 2085);
				add_location(td12, file$5, 54, 5, 2123);
				add_location(td13, file$5, 55, 5, 2142);
				add_location(strong5, file$5, 56, 9, 2167);
				add_location(td14, file$5, 56, 5, 2163);
				add_location(tr3, file$5, 51, 5, 2038);
				add_location(tbody, file$5, 36, 5, 1702);
				add_location(table, file$5, 26, 4, 1524);
				attr_dev(div1, "class", "cTable");
				add_location(div1, file$5, 25, 3, 1499);
				add_location(br12, file$5, 61, 3, 2248);
				add_location(br13, file$5, 61, 7, 2252);
				add_location(br14, file$5, 64, 3, 2508);
				add_location(br15, file$5, 64, 7, 2512);
				add_location(br16, file$5, 66, 3, 2685);
				add_location(br17, file$5, 66, 7, 2689);
				add_location(i2, file$5, 67, 7, 2701);
				add_location(h3, file$5, 67, 3, 2697);
				add_location(div2, file$5, 11, 2, 318);
				attr_dev(doc0, "name", "What_is_sQuery");
				add_location(doc0, file$5, 9, 1, 261);
				add_location(h21, file$5, 72, 2, 2812);
				add_location(br18, file$5, 74, 51, 2914);
				attr_dev(a, "href", "./#/docs");
				add_location(a, file$5, 76, 19, 3020);
				add_location(div3, file$5, 73, 2, 2857);
				attr_dev(doc1, "name", "Installation");
				add_location(doc1, file$5, 71, 1, 2784);
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

	function create_fragment$6(ctx) {
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
			id: create_fragment$6.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$6($$self, $$props, $$invalidate) {
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
			init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Home",
				options,
				id: create_fragment$6.name
			});
		}
	}

	let name = 'sQuery - Native Speed jQuery for Svelte/SolidJS';

	let loadProc = function( bDoc = true ){
		sQuery('body').hide().fadeIn(400);

		if ( bDoc ){
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
		} else {
			window.setDocTitle = (v, ot)=>{
				let c = sQuery('.cF[name="'+v+'"]').siblings().filter('.cSub').text();
				if ( !c )
					return
		
				let title = ot + ' - sQuery Install';
				if (window.history.replaceState)
					window.history.replaceState({n:v}, title, './?n='+v+'#/install' );
				document.title = title;
				
				let h = '<a class="cWhite" href="./#/install">sQuery Install</a> -> <a class="cWhite" href="./?n='+c.replace(/ /g,'')+'#/install">' 
					+ c + '</a> -> <a class="cWhite" href="./?p&n='+v+'#/install">' + sQuery('.cF[name='+v+']').text().replace('・','') +'</a>';
				sQuery('#idDocNav').html(h);
				sQuery('.cF').removeClass('active');
				sQuery('.cF[name="'+v+'"]').addClass('active');
			};
		}

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
<span>click me!</span>

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

	reactScript: `
<script src="https://cdn.jsdelivr.net/gh/exis9/squery@latest/squery.min.js"></script>
<script>
sq(()=>{
	sq('body').css('background', 'skyblue')
	sq('body').prepend('<h1>Hello sQuery CDN!</h1>')
})
</script>
`,
	reactModule: `
import { sq } from './sq.js';
sq('body').prepend('<h1>Hello sQuery!</h1>')
`,

	nextScript: `
<script src="https://cdn.jsdelivr.net/gh/exis9/squery@latest/squery.min.js"></script>
<script>
sq(()=>{
	sq('body').css('background', 'skyblue')
	sq('body').prepend('<h1>Hello sQuery CDN (Next.js)!</h1>')
})
</script>
`,
	nextModule: `
import { sq } from './sq.js';
sq('body').prepend('<h1>Hello sQuery (Next.js)!</h1>')
`,

	svelteScript: `
<script src="https://cdn.jsdelivr.net/gh/exis9/squery@latest/squery.min.js"></script>
<script>
sq(()=>{
	sq('body').css('background', 'skyblue')
	sq('body').prepend('<h1>Hello sQuery CDN! (Svelte)</h1>')
})
</script>
`,
	svelteModule: `
import { sq } from './sq.js';
sq('body').prepend('<h1>Hello sQuery! (Svelte)</h1>')
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
<div>RX78-2 GUNDAM</div>
<div>C3PO</div>
<div>Megaman X</div>
<div>Evangelion Unit-01</div>
 
<script>
	sq( "div" ).contains( "Megaman" ).css( "text-decoration", "underline" );
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
	<li id="jojo">JoJo's Bizarre Adventure</li>
	<li id="dbz">Dragon Ball Z</li>
	<li id="naruto">Naruto</li>
</ul>
<div id="msg"></div>
<script>
	sq('#msg').text( "Index of Dragn Ball Z: " + sq( "#dbz" ).index() )
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
<div id="a">a</div>
<div id="b">b</div>
<div id="c" style="display:none">c</div>
<div id="d">d</div>

<div id="console"></div>

<script>
	setTimeout(()=>{
		const a = sq('#a').isVisible().toString()
		const b = sq('#b').isVisible().toString()
		const c = sq('#c').isVisible().toString()
		const d = sq('#d').isVisible().toString()
	
		sq('#console').html( 'a:'+a+', ' + 'b:'+b+', ' + 'c:'+c+', ' + 'd:'+d)
	}, 1000)
</script>
`,


	html:`
<div>
	<div>Hello! I'm PS5!!</div>
	<div>Hello! I'm Xbox Series X!!</div>
	<div class="alexa">Hello! I'm Alexa!!</div>
	<div>Konichiwa! I'm Shinzo Abe!!</div>
	<div>Hi! I'm Yamagami!!</div>
	<div>Ha! I'm Donald Trump!!</div>
	<div>Ha! I'm Merkel!!</div>
	<div>WRYYY! I'm Shi Jinping!! Fuck Taiwan!</div>
	<div>I'm TSMC! Taiwan #1!</div>
</div>
<br><br>
Output: <div id="console"></div>

<script>
	let h = '<b>' + sq('.alexa').html() + '</b>'
	sq('#console').html( h )
</script>
`,

	text:`
<div>
	<div>Hello! I'm PlayStation 5!!</div>
	<div>Hello! I'm Xbox Series S!!</div>
	<div class="alexa">Hello! I'm <span style="color:red">Alexa</span>!!</div>
	<div>Pika! I'm Pikachu!!</div>
	<div>Hi! I'm Siri!!</div>
	<div>Hi! I'm Bitcoin!!</div>
</div>
<br><br>
Output: <div id="console"></div>

<script>
	// html tags are ignored when you get a text using text()
	let h = '<b>' + sq('.alexa').text() + '</b>' 
	
	// html tags are automatically converted to a normal text
	sq('#console').text( h ) 
</script>
`,

	val:`
<input type="text" value="Mewtwo">
<div id="console"></div>
<script>
	sq('input[type="text"]').on('keyup', function(){
		const v = sq(this).val()
		sq('#console').html( 'The strongest pokemon: ' + v )
	})
	sq('input[type="text"]').trigger('keyup')
</script>
`,

	css:`
<div id="css1">css1</div>
<div id="css2" style="color:red;font-size:20px">css2</div>
<div id="css3">css3</div>
<div id="css4">css4</div>
<div id="css5">css5</div>
<script>
	const cssText = sq('#css2').css()
	sq('#css3').css('color', cssText.color )
	sq('#css4').css({
		color: cssText.color,
		fontSize: cssText.fontSize,
		//'font-size': cssText['font-size'] is also fine!
	})
	sq('#css5').css('font-size', sq('#css2').css('font-size') )
</script>
`,

	attr:`
Click the best Final Fantasy.<br><br>
<div data-text="7">Final Fantasy Ⅶ</div>
<div data-text="8">Final Fantasy Ⅷ</div>
<div data-text="9">Final Fantasy Ⅸ</div>
<div data-text="10">Final Fantasy X</div>
<div data-text="11">Final Fantasy 11</div>
<div data-text="12">Final Fantasy 12</div>
<div data-text="13">Final Fantasy 13</div>
<div data-text="14">Final Fantasy 14</div>
<div data-text="15">Final Fantasy 15</div>
<div data-text="16">Final Fantasy 16</div>

<script>
	sq('div').on('click', function(){
		const ff = sq(this).attr('data-text')
		alert( 'Your Best Final Fantasy is.. Final Fantasy ' + ff )
	})
</script>
`,

	prop:`
<input id="check1" type="checkbox" checked="checked"> 
<button>Click me!!</button>

<script>
	sq('button').on('click', function(){
		const b = sq('#check1').prop( 'checked' )
		sq('#check1').prop( 'checked', !b )
	})
</script>
`,

	get:`
<ul>
  <li id="t1">The Terminator 1</li>
  <li id="t2">The Terminator 2</li>
</ul>
<script>
	// getting the 2nd li as a native JavaScript Object (not sQuery object)
	const js_object = sq( "li" ).get( 1 )
	// setting the innerHTML with a native JavaScript code
	js_object.innerHTML = 'The Terminator 2（master piece）'
</script>
`,

	show:`
<ul>
  <li id="t1">The Terminator 1</li>
  <li id="t2">The Terminator 2</li>
  <li id="t3">The Terminator 3</li>
  <li id="t4" style="display:none">The Terminator 4</li>
</ul>
<button>click me!</button>
<script>
	sq('button').on('click', function(){
		sq('#t3').hide()
		sq('#t4').show()
		alert('T3 does not exist. T4 is okay.')
	})
</script>
`,

	remove:`
<div>1 <button>x</button></div>
<div>2 <button>x</button></div>
<div>3 <button>x</button></div>
<div>4 <button>x</button></div>
<div>5 <button>x</button></div>
<div>6 <button>x</button></div>
<div>7 <button>x</button></div>
<script>
	sq('div button').on('click', function(){
		sq(this).parent().remove()
	})
</script>
`,

	before:`
<style>
	div {
		padding: 4px;
		margin: 8px;
	}
</style>
<div id="area1" style="background-color: #aaa">
	area1
	<div id="area2" style="background-color: pink">area2</div>
	<div id="area3" style="background-color: blue">area3</div>
</div>
<script>
	sq('#area2').before('<div>Inserted Text!!!</div>')
</script>
`,

	after:`
<style>
	div {
		padding: 4px;
		margin: 8px;
	}
</style>
<div id="area1" style="background-color: #aaa">
	area1
	<div id="area2" style="background-color: pink">area2</div>
	<div id="area3" style="background-color: blue">area3</div>
</div>
<script>
	sq('#area2').after('<div>Inserted Text!!!</div>')
</script>
`,

	prepend:`
<style>
	div {
		padding: 4px;
		margin: 8px;
	}
</style>
<div id="area1" style="background-color: #aaa">
	area1
	<div id="area2" style="background-color: pink">area2</div>
	<div id="area3" style="background-color: blue">area3</div>
</div>
<script>
	sq('#area2').prepend('<div>Inserted Text!!!</div>')
</script>
`,

	append:`
<style>
	div {
		padding: 4px;
		margin: 8px;
	}
</style>
<div id="area1" style="background-color: #aaa">
	area1
	<div id="area2" style="background-color: pink">area2</div>
	<div id="area3" style="background-color: blue">area3</div>
</div>
<script>
	sq('#area2').append('<div>Inserted Text!!!</div>')
</script>
`,

	replaceWith:`
<style>
	div {
		padding: 4px;
		margin: 8px;
	}
</style>
<div id="area1" style="background-color: #aaa">
	area1
	<div id="area2" style="background-color: pink">area2</div>
	<div id="area3" style="background-color: blue">area3</div>
</div>
<script>
	sq('#area2').replaceWith('<div>Inserted Text!!!</div>')
</script>
`,

	addClass:`
<style>
	.poison {
		color: purple;
		font-weight: bold;
	}
</style>
<div>Your Pokemon</div>
<button>Add poison!</button> <button>Remove poison!</button>

<script>
	sq('button').eq(0).on('click', function(){
		sq('div').addClass('poison')
	})
	sq('button').eq(1).on('click', function(){
		sq('div').removeClass('poison')
	})
</script>
`,

	toggleClass:`
<style>
	.poison {
		color: purple;
		font-weight: bold;
	}
</style>
<div>Your Pokemon</div>
<button>poison!</button>

<script>
	sq('button').on('click', function(){
		sq('div').toggleClass('poison')
	})
</script>
`,

	width:`
<style>
#memo {
	width: 300px; 
	height: 100px;
	max-width: 500px;
	border: 4px solid blue;
	margin: 3px;
	padding: 13px;
	box-sizing: content-box;
}
</style>
<textarea id="memo">resize this!</textarea>
<br>
<button>Get the width and height</button>
<script>
	sq('button').on('click', function(){
		const el = sq('#memo')
		const w = el.width() + 'px'
		const h = el.height() + 'px'
		el.val( "width: " + w + "　height: " + h )
	})
</script>
`,


	innerWidth:`
<style>
#memo {
	width: 300px; 
	height: 100px;
	max-width: 500px;
	border: 4px solid blue;
	margin: 3px;
	padding: 13px;
	box-sizing: content-box;
}
</style>
<textarea id="memo">resize this!</textarea>
<br>
<button>Get the innerWidth and innerHeight</button>
<script>
	sq('button').on('click', function(){
		const el = sq('#memo')
		const w = el.innerWidth() + 'px'
		const h = el.innerHeight() + 'px'
		el.val( "innerWidth: " + w + "　innerHeight: " + h )
	})
</script>
`,


	outerWidth:`
<style>
#memo {
	width: 300px; 
	height: 100px;
	max-width: 500px;
	border: 4px solid blue;
	margin: 3px;
	padding: 13px;
	box-sizing: content-box;
}
</style>
<textarea id="memo">resize this!</textarea>
<br>
<button>Get the outerWidth and outerHeight</button>
<script>
	sq('button').on('click', function(){
		const el = sq('#memo')
		const w = el.outerWidth() + 'px'
		const h = el.outerHeight() + 'px'
		el.val( "outerWidth: " + w + "　outerHeight: " + h )
	})
</script>
`,

	offset:`
<style>
p {
	margin-left: 10px;
}
</style>

<div>
	<p>Hello</p>
	<p>2nd Paragraph</p>
</div>

<script>
	let p = sq( "p" ).last()
	let offset = p.offset()
	p.html( "left: " + offset.left + ", top: " + offset.top )
</script>
`,

	pos:`
<style>
p {
	margin-left: 10px;
}
</style>

<div>
	<p>Hello</p>
	<p>2nd Paragraph</p>
</div>

<script>
	let p = sq( "p" ).first()
	let position = p.pos()
	sq( "p" ).last().text( "left: " + position.left + ", top: " + position.top )
</script>
`,

	fadeIn:`
<div>Life is Strange...</div>
<button>FadeIn</button> <button>FadeOut</button> <button>FadeInOut</button> <button>FadeOutIn</button>
<script>
	sq('button').eq(0).on('click', ()=>{
		sq('div').fadeIn(800)
	})
	sq('button').eq(1).on('click', ()=>{
		sq('div').fadeOut(800)
	})
	sq('button').eq(2).on('click', ()=>{
		sq('div').fadeIn(800, ()=>{
			sq('div').fadeOut(800)
		})
	})
	sq('button').eq(3).on('click', ()=>{
		sq('div').fadeOut(800, ()=>{
			sq('div').fadeIn(800)
		})
	})
</script>
`,

	animateSimple: `
<style>
#container {
	position: relative;
	width: 100%;
	height: calc(100% - 24px);
	background-color: #eee;
}
#object {
	background-color: #f00;
	width: 20px;
	height: 20px;
	position: absolute;
	top: 0;
	left: 0;
}
</style>
<button>animate</button> 
<div id="container">
	<div id="object"></div>
</div>
<script src="squery.min.js"></script>
<script>
sq('button').on('click', ()=>{
	sq('#object').animate({
		left: '40%',
		top: '20%',
		transform: "scale(10, 3) rotate(130deg)"
	}, 900 )
})
</script>
`,

	animate:`
<style>
	#container {
		position: relative;
		width: 100%;
		height: calc(100% - 24px);
		background-color: #eee;
	}
	#object1, #object2, #object3 {
		background-color: red;
		width: 20px;
		height: 20px;
		position: absolute;
		top: 0;
		left: 0;
	}
	#object2 {
		left: 100px;
		background-color: blue;
	}
	#object3 {
		left: 200px;
		background-color: orange;
	}
</style>
<button>animate object 1</button> 
<button>animate object 2</button> 
<button>animate object 3(Infinity)</button> 
<div id="container">
	<div id="object1"></div>
	<div id="object2"></div>
	<div id="object3"></div>
</div>
<script>
	// for object 1
	sq('button').eq(0).on('click', ()=>{
		sq('#object1').animate({
			left: '40px',
			top: '200px'
		}, 600 )
	})

	// for object 2
	sq('button').eq(1).on('click', ()=>{
		// reset pos
		sq('#object2').css({
			left: '100px',
			top: '0px'
		})

		sq('#object2').animate({
			left: '140px',
			top: '200px'
		}, 1000, function(){ //The callback when the animation finishes
			// saving the final state
			sq('#object2').css({
				left: '140px',
				top: '200px'
			})
		})
	})

	// for object 3
	sq('button').eq(2).on('click', function(){
		sq('#object3').animate({
			left: '240px',
			top: '250px'
		}, {iterations: Infinity}, 900 )
		sq(this).prop('disabled', true)
	})
</script>
`,

	scroll:`
<body>
	<button>Scroll Smoothly</button> <button>Scroll Instantly</button> <button>Scroll 300px only</button>
	<div style="height:200%; background-color: #eee;margin:10px"></div>
</body>
<script>
	sq('button').eq(0).on('click', ()=>{
		sq('body').scroll( 10000 ) //scroll 10000px from the top
	})
	sq('button').eq(1).on('click', ()=>{
		sq('body').scroll( 10000, true ) //true is for instant scroll
	})
	sq('button').eq(2).on('click', ()=>{
		sq('body').scroll( 300 ) //scroll 300px only
	})
</script>
`,

	scrollTop:`
<body>
	<div style="width: 200%; height:200%; background-color: #eee;margin:10px; padding:40px;">
		Click anywhere!<br>
		If you scroll, the values will be different!
	</div>
</body>
<script>
	sq('div').on('click', function(){
		const x = sq('body').scrollLeft()
		const y = sq('body').scrollTop()
		alert( 'left: ' + x + 'px  ' + 'top: ' + y + 'px' )
	})
</script>
`,

	scrollToElement:`
<button>scroll to bottom</button>

<div style="height:200%; background-color: #eee;margin:10px"></div>

<button>scroll to top</button>

<script>
	sq('button').eq(0).on('click', ()=>{
		sq('button').eq(1).scrollToElement()
	})
	sq('button').eq(1).on('click', ()=>{
		sq('button').eq(0).scrollToElement()
	})
</script>
`,

	each:`
<ul>
  <li>Bulbasaur</li>
  <li>Ivysaur</li>
  <li>Venusaur</li>
  <li>Charmander</li>
  <li>Charmeleon</li>
  <li>Charizard</li>
</ul>

<div id="console"></div>

<script>
	sq( "li" ).each(function( index ) {
		sq('#console').append( 'No. ' + (index+1) + ': ' + sq( this ).text() + '<br>' )
	})
</script>
`,

	on:`
<button id="hello">I say hello infinitely!</button>
<button id="hello2">I say hello only one time!</button>
<script>
	sq('#hello').on('click', function(){
		alert('hello!')
	})
	sq('#hello2').on('click', function(){
		alert('Hello! And... good-bye!')
		sq(this).off('click').css('color', '#999')
	})
</script>
`,

	onf:`
<body></body>
<script>
	// This won't work!
	sq('#hello1').on('click', function(){
		alert('hello 1!')
	})
	// This will work!
	sq('body').onf('click', '#hello2', function(){
		alert('hello 2!')
	})
	sq('body').append('<button id="hello1">hello 1</button> ')
	sq('body').append('<button id="hello2">hello 2</button> ')
</script>
`,

	trg:`
<ul>
  <li>Bulbasaur</li>
  <li>Ivysaur</li>
  <li>Venusaur</li>
  <li>Charmander</li>
  <li>Charmeleon</li>
  <li>Charizard</li>
</ul>

<script>
	sq('li').on('click', function(){
		let idx = sq(this).index()
		sq('li').css('color', 'black')
		sq('li').eq( idx ).css('color', 'red')
	})
	sq('li').eq(3).trg('click') //Triggering a Charmander click
	//sq('li').eq(3).trigger() //this also works!
</script>
`,

	// examples
	fetch:`
<div id="console">loading...</div>
<script>
	my_ajax('https://ptsv2.com/t/ends/post', {name: 'Steve Jobs', age: 21} )
	

	function my_ajax( url, data ){
		fetch( 
			url, 
			{
				method: 'POST',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				body: "data=" + JSON.stringify( data )
			}
		).then( res => {
			console.log( res )
			if ( res.status == 200 )
				sq('#console').html( 'sent!' )
		}).catch( error => {
			console.log( error )
		})
	}
</script>
`,

	axios:`
<div id="console">loading...</div>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
	axios({
		method: 'GET',
		url: 'https://api.github.com/users/shawnquinn',
	})
	.then( function( res ){
		if ( res.status == 200 )
			sq('#console').html( 'GET succeeded!' )
		console.log( res.data )
	})
	.catch( function(error){
		console.log(error)
	})
</script>
`

	};

	/* src/Sq_editorI.svelte generated by Svelte v3.44.0 */

	const { console: console_1$4 } = globals;
	const file$4 = "src/Sq_editorI.svelte";

	function create_fragment$5(ctx) {
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
				add_location(link0, file$4, 133, 1, 3600);
				attr_dev(link1, "rel", "preconnect");
				attr_dev(link1, "href", "https://fonts.gstatic.com");
				attr_dev(link1, "crossorigin", "");
				add_location(link1, file$4, 134, 1, 3661);
				attr_dev(link2, "href", "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300&display=swap");
				attr_dev(link2, "rel", "stylesheet");
				add_location(link2, file$4, 135, 1, 3731);
				attr_dev(link3, "rel", "stylesheet");
				attr_dev(link3, "href", "./Docs.css");
				add_location(link3, file$4, 137, 1, 3843);
				attr_dev(link4, "rel", "stylesheet");
				attr_dev(link4, "href", "./Sq_editor.css");
				add_location(link4, file$4, 138, 1, 3886);
				attr_dev(textarea, "placeholder", "Enter HTML Source Code");
				attr_dev(textarea, "id", "editing");
				attr_dev(textarea, "spellcheck", "false");
				add_location(textarea, file$4, 141, 3, 4021);
				attr_dev(code, "class", "language-html");
				attr_dev(code, "id", "highlighting-content");
				add_location(code, file$4, 143, 4, 4162);
				attr_dev(pre, "id", "highlighting");
				attr_dev(pre, "aria-hidden", "true");
				add_location(pre, file$4, 142, 3, 4115);
				attr_dev(div, "class", "cCodeSpace svelte-6uqz72");
				add_location(div, file$4, 140, 2, 3993);
				attr_dev(iframe, "id", "idResult");
				attr_dev(iframe, "title", "editor");
				attr_dev(iframe, "class", "svelte-6uqz72");
				add_location(iframe, file$4, 147, 2, 4309);
				attr_dev(section, "class", "cCodeCont");
				attr_dev(section, "data-cname", /*cname*/ ctx[0]);
				attr_dev(section, "style", /*style*/ ctx[1]);
				add_location(section, file$4, 139, 1, 3934);
				add_location(main, file$4, 132, 0, 3592);
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
			id: create_fragment$5.name,
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

	function instance$5($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Sq_editorI', slots, []);
		let { cname, mh = 0, autoload = false, bOnlyCode = false } = $$props;
		let sq_code = safe_sq_code(g_codes[cname]);
		let style = '';

		if (mh) {
			style = `max-height:${mh}px;`;
		}

		function registerEvents(bAutoLoad = false, bOnlyCode = false) {
			const pel = sQuery(`.cCodeCont[data-cname="${cname}"]`);

			if (bOnlyCode == '1') {
				pel.find('#idResult').hide();
				pel.addClass('cFloatLeft');
			} else {
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
			}

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

			registerEvents(autoload, bOnlyCode);
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

		const writable_props = ['cname', 'mh', 'autoload', 'bOnlyCode'];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$4.warn(`<Sq_editorI> was created with unknown prop '${key}'`);
		});

		$$self.$$set = $$props => {
			if ('cname' in $$props) $$invalidate(0, cname = $$props.cname);
			if ('mh' in $$props) $$invalidate(2, mh = $$props.mh);
			if ('autoload' in $$props) $$invalidate(3, autoload = $$props.autoload);
			if ('bOnlyCode' in $$props) $$invalidate(4, bOnlyCode = $$props.bOnlyCode);
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
			bOnlyCode,
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
			if ('bOnlyCode' in $$props) $$invalidate(4, bOnlyCode = $$props.bOnlyCode);
			if ('sq_code' in $$props) sq_code = $$props.sq_code;
			if ('style' in $$props) $$invalidate(1, style = $$props.style);
			if ('c' in $$props) c = $$props.c;
			if ('loadProc' in $$props) loadProc = $$props.loadProc;
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		return [cname, style, mh, autoload, bOnlyCode];
	}

	class Sq_editorI extends SvelteComponentDev {
		constructor(options) {
			super(options);

			init(this, options, instance$5, create_fragment$5, safe_not_equal, {
				cname: 0,
				mh: 2,
				autoload: 3,
				bOnlyCode: 4
			});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Sq_editorI",
				options,
				id: create_fragment$5.name
			});

			const { ctx } = this.$$;
			const props = options.props || {};

			if (/*cname*/ ctx[0] === undefined && !('cname' in props)) {
				console_1$4.warn("<Sq_editorI> was created without expected prop 'cname'");
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

		get bOnlyCode() {
			throw new Error("<Sq_editorI>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set bOnlyCode(value) {
			throw new Error("<Sq_editorI>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}
	}

	/* src/Docs.svelte generated by Svelte v3.44.0 */

	const { console: console_1$3 } = globals;
	const file$3 = "src/Docs.svelte";

	function create_fragment$4(ctx) {
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
		let hr;
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
		let br0;
		let br1;
		let br2;
		let br3;
		let br4;
		let br5;
		let br6;
		let br7;
		let t134;
		let div67;
		let span1;
		let t135;
		let section4;
		let h1;
		let span2;
		let t136;
		let div68;
		let t138;
		let doc0;
		let h20;
		let t140;
		let div69;
		let t141;
		let a2;
		let t143;
		let a3;
		let t145;
		let t146;
		let div72;
		let div71;
		let div70;
		let t147;
		let small0;
		let t149;
		let sqi0;
		let t150;
		let div75;
		let div74;
		let div73;
		let t151;
		let t152;
		let sqi1;
		let t153;
		let div78;
		let div77;
		let div76;
		let t154;
		let small1;
		let t155;
		let a4;
		let t157;
		let t158;
		let sqi2;
		let t159;
		let div81;
		let div80;
		let div79;
		let t160;
		let t161;
		let sqi3;
		let t162;
		let doc1;
		let h21;
		let t164;
		let div92;
		let t165;
		let div91;
		let div82;
		let h30;
		let t167;
		let p0;
		let t168;
		let br8;
		let t169;
		let b0;
		let t171;
		let a5;
		let t173;
		let div83;
		let h31;
		let t175;
		let p1;
		let t176;
		let b1;
		let t178;
		let br9;
		let t179;
		let a6;
		let t181;
		let a7;
		let t183;
		let t184;
		let div84;
		let h32;
		let t186;
		let p2;
		let t187;
		let br10;
		let t188;
		let br11;
		let t189;
		let br12;
		let t190;
		let b2;
		let t191;
		let br13;
		let t192;
		let br14;
		let t193;
		let t194;
		let div85;
		let h33;
		let t196;
		let p3;
		let t197;
		let br15;
		let br16;
		let t198;
		let b3;
		let br17;
		let t200;
		let br18;
		let t201;
		let br19;
		let t202;
		let br20;
		let t203;
		let b4;
		let t204;
		let br21;
		let t205;
		let br22;
		let t206;
		let div86;
		let h34;
		let t208;
		let p4;
		let t209;
		let br23;
		let t210;
		let br24;
		let t211;
		let b5;
		let t213;
		let br25;
		let t214;
		let br26;
		let t215;
		let br27;
		let t216;
		let br28;
		let t217;
		let br29;
		let t218;
		let br30;
		let t219;
		let br31;
		let t220;
		let br32;
		let t221;
		let t222;
		let div90;
		let h35;
		let t224;
		let p5;
		let small2;
		let br33;
		let t226;
		let t227;
		let div89;
		let div88;
		let div87;
		let t228;
		let t229;
		let sqi4;
		let t230;
		let doc2;
		let h22;
		let t232;
		let div93;
		let img0;
		let img0_src_value;
		let t233;
		let br34;
		let t234;
		let t235;
		let div98;
		let div95;
		let div94;
		let t236;
		let t237;
		let sqi5;
		let t238;
		let div97;
		let div96;
		let t239;
		let t240;
		let sqi6;
		let t241;
		let doc3;
		let h23;
		let t243;
		let div101;
		let t244;
		let a8;
		let t246;
		let br35;
		let t247;
		let img1;
		let img1_src_value;
		let t248;
		let div100;
		let h40;
		let t250;
		let div99;
		let a9;
		let t252;
		let br36;
		let t253;
		let br37;
		let t254;
		let br38;
		let br39;
		let t255;
		let a10;
		let t257;
		let t258;
		let doc4;
		let h24;
		let t260;
		let div104;
		let t261;
		let a11;
		let t263;
		let br40;
		let t264;
		let img2;
		let img2_src_value;
		let t265;
		let div103;
		let h41;
		let t267;
		let div102;
		let a12;
		let t269;
		let br41;
		let br42;
		let t270;
		let a13;
		let t272;
		let t273;
		let doc5;
		let h25;
		let t275;
		let div107;
		let t276;
		let a14;
		let t278;
		let br43;
		let t279;
		let img3;
		let img3_src_value;
		let t280;
		let div106;
		let h42;
		let t282;
		let div105;
		let a15;
		let t284;
		let br44;
		let br45;
		let t285;
		let br46;
		let t286;
		let br47;
		let br48;
		let t287;
		let a16;
		let t289;
		let t290;
		let doc6;
		let h26;
		let t292;
		let div110;
		let t293;
		let a17;
		let t295;
		let br49;
		let t296;
		let img4;
		let img4_src_value;
		let t297;
		let div109;
		let h43;
		let t299;
		let div108;
		let a18;
		let t301;
		let br50;
		let t302;
		let br51;
		let br52;
		let t303;
		let br53;
		let br54;
		let t304;
		let a19;
		let t306;
		let t307;
		let doc7;
		let h27;
		let t309;
		let div113;
		let t310;
		let a20;
		let t312;
		let br55;
		let t313;
		let img5;
		let img5_src_value;
		let t314;
		let div112;
		let h44;
		let t316;
		let div111;
		let a21;
		let t318;
		let br56;
		let t319;
		let t320;
		let doc8;
		let h28;
		let t322;
		let div114;
		let t323;
		let span3;
		let t324;
		let div117;
		let div116;
		let div115;
		let t325;
		let t326;
		let sqi7;
		let t327;
		let div118;
		let br57;
		let t328;
		let span4;
		let t329;
		let div121;
		let div120;
		let div119;
		let t330;
		let t331;
		let sqi8;
		let t332;
		let doc9;
		let h29;
		let t334;
		let div122;
		let t335;
		let span5;
		let t336;
		let div125;
		let div124;
		let div123;
		let t337;
		let t338;
		let sqi9;
		let t339;
		let div126;
		let br58;
		let t340;
		let t341;
		let div129;
		let div128;
		let div127;
		let t342;
		let t343;
		let sqi10;
		let t344;
		let doc10;
		let h210;
		let t346;
		let div130;
		let t347;
		let span6;
		let t348;
		let div133;
		let div132;
		let div131;
		let t349;
		let t350;
		let sqi11;
		let t351;
		let div134;
		let br59;
		let t352;
		let span7;
		let t353;
		let div137;
		let div136;
		let div135;
		let t354;
		let t355;
		let sqi12;
		let t356;
		let doc11;
		let h211;
		let t358;
		let div138;
		let t359;
		let span8;
		let t360;
		let div141;
		let div140;
		let div139;
		let t361;
		let t362;
		let sqi13;
		let t363;
		let doc12;
		let h212;
		let t365;
		let div142;
		let t366;
		let span9;
		let t367;
		let div145;
		let div144;
		let div143;
		let t368;
		let t369;
		let sqi14;
		let t370;
		let doc13;
		let h213;
		let t372;
		let div146;
		let t373;
		let span10;
		let t374;
		let div149;
		let div148;
		let div147;
		let t375;
		let t376;
		let sqi15;
		let t377;
		let doc14;
		let h214;
		let t379;
		let div150;
		let t380;
		let span11;
		let t381;
		let div153;
		let div152;
		let div151;
		let t382;
		let t383;
		let sqi16;
		let t384;
		let doc15;
		let h215;
		let t386;
		let div154;
		let t387;
		let span12;
		let t388;
		let div157;
		let div156;
		let div155;
		let t389;
		let t390;
		let sqi17;
		let t391;
		let doc16;
		let h216;
		let t393;
		let div158;
		let t394;
		let span13;
		let t395;
		let div161;
		let div160;
		let div159;
		let t396;
		let t397;
		let sqi18;
		let t398;
		let doc17;
		let h217;
		let t400;
		let div162;
		let t401;
		let span14;
		let t402;
		let div165;
		let div164;
		let div163;
		let t403;
		let t404;
		let sqi19;
		let t405;
		let doc18;
		let h218;
		let t407;
		let div166;
		let t408;
		let span15;
		let t409;
		let div169;
		let div168;
		let div167;
		let t410;
		let t411;
		let sqi20;
		let t412;
		let div170;
		let br60;
		let t413;
		let span16;
		let t414;
		let div173;
		let div172;
		let div171;
		let t415;
		let t416;
		let sqi21;
		let t417;
		let doc19;
		let h219;
		let t419;
		let div174;
		let t420;
		let span17;
		let t421;
		let div177;
		let div176;
		let div175;
		let t422;
		let t423;
		let sqi22;
		let t424;
		let doc20;
		let h220;
		let t426;
		let div178;
		let t427;
		let span18;
		let t428;
		let div181;
		let div180;
		let div179;
		let t429;
		let t430;
		let sqi23;
		let t431;
		let div182;
		let br61;
		let t432;
		let span19;
		let t433;
		let div185;
		let div184;
		let div183;
		let t434;
		let t435;
		let sqi24;
		let t436;
		let doc21;
		let h221;
		let t438;
		let div186;
		let t439;
		let span20;
		let t440;
		let div189;
		let div188;
		let div187;
		let t441;
		let t442;
		let sqi25;
		let t443;
		let doc22;
		let h222;
		let t445;
		let div190;
		let t446;
		let span21;
		let t447;
		let div193;
		let div192;
		let div191;
		let t448;
		let t449;
		let sqi26;
		let t450;
		let doc23;
		let h223;
		let t452;
		let div194;
		let t453;
		let span22;
		let t454;
		let div197;
		let div196;
		let div195;
		let t455;
		let t456;
		let sqi27;
		let t457;
		let doc24;
		let h224;
		let t459;
		let div198;
		let t460;
		let span23;
		let t461;
		let div201;
		let div200;
		let div199;
		let t462;
		let t463;
		let sqi28;
		let t464;
		let doc25;
		let h225;
		let t466;
		let div202;
		let t467;
		let span24;
		let t468;
		let div205;
		let div204;
		let div203;
		let t469;
		let t470;
		let sqi29;
		let t471;
		let doc26;
		let h226;
		let t473;
		let div206;
		let t474;
		let span25;
		let t475;
		let div209;
		let div208;
		let div207;
		let t476;
		let t477;
		let sqi30;
		let t478;
		let doc27;
		let h227;
		let t480;
		let div210;
		let t481;
		let span26;
		let t482;
		let div213;
		let div212;
		let div211;
		let t483;
		let t484;
		let sqi31;
		let t485;
		let doc28;
		let h228;
		let t487;
		let div214;
		let t488;
		let span27;
		let t489;
		let div217;
		let div216;
		let div215;
		let t490;
		let t491;
		let sqi32;
		let t492;
		let doc29;
		let h229;
		let t494;
		let div218;
		let t495;
		let span28;
		let t496;
		let div221;
		let div220;
		let div219;
		let t497;
		let t498;
		let sqi33;
		let t499;
		let doc30;
		let h230;
		let t501;
		let div222;
		let t502;
		let span29;
		let t503;
		let br62;
		let br63;
		let t504;
		let span30;
		let t505;
		let div225;
		let div224;
		let div223;
		let t506;
		let t507;
		let sqi34;
		let t508;
		let doc31;
		let h231;
		let t510;
		let div226;
		let t511;
		let span31;
		let t512;
		let div229;
		let div228;
		let div227;
		let t513;
		let t514;
		let sqi35;
		let t515;
		let doc32;
		let h232;
		let t517;
		let div230;
		let t518;
		let span32;
		let t519;
		let div233;
		let div232;
		let div231;
		let t520;
		let t521;
		let sqi36;
		let t522;
		let div234;
		let br64;
		let t523;
		let span33;
		let t524;
		let div237;
		let div236;
		let div235;
		let t525;
		let t526;
		let sqi37;
		let t527;
		let doc33;
		let h233;
		let t529;
		let div238;
		let t530;
		let span34;
		let t531;
		let div241;
		let div240;
		let div239;
		let t532;
		let t533;
		let sqi38;
		let t534;
		let div242;
		let br65;
		let t535;
		let span35;
		let t536;
		let div245;
		let div244;
		let div243;
		let t537;
		let t538;
		let sqi39;
		let t539;
		let doc34;
		let h234;
		let t541;
		let div246;
		let t542;
		let span36;
		let t543;
		let div249;
		let div248;
		let div247;
		let t544;
		let t545;
		let sqi40;
		let t546;
		let doc35;
		let h235;
		let t548;
		let div250;
		let t549;
		let span37;
		let t550;
		let br66;
		let t551;
		let span38;
		let t552;
		let div253;
		let div252;
		let div251;
		let t553;
		let t554;
		let sqi41;
		let t555;
		let doc36;
		let h236;
		let t557;
		let div254;
		let t558;
		let span39;
		let t559;
		let div257;
		let div256;
		let div255;
		let t560;
		let t561;
		let sqi42;
		let t562;
		let doc37;
		let h237;
		let t564;
		let div258;
		let t565;
		let span40;
		let t566;
		let br67;
		let t567;
		let span41;
		let t568;
		let div261;
		let div260;
		let div259;
		let t569;
		let t570;
		let sqi43;
		let t571;
		let doc38;
		let h238;
		let t573;
		let div262;
		let t574;
		let b6;
		let t576;
		let span42;
		let t577;
		let br68;
		let t578;
		let b7;
		let t580;
		let span43;
		let t581;
		let div265;
		let div264;
		let div263;
		let t582;
		let t583;
		let sqi44;
		let t584;
		let doc39;
		let h239;
		let t586;
		let div266;
		let t587;
		let b8;
		let t589;
		let span44;
		let t590;
		let br69;
		let t591;
		let b9;
		let t593;
		let span45;
		let t594;
		let div269;
		let div268;
		let div267;
		let t595;
		let t596;
		let sqi45;
		let t597;
		let doc40;
		let h240;
		let t599;
		let div270;
		let t600;
		let span46;
		let t601;
		let div273;
		let div272;
		let div271;
		let t602;
		let t603;
		let sqi46;
		let t604;
		let doc41;
		let h241;
		let t606;
		let div274;
		let t607;
		let span47;
		let t608;
		let div277;
		let div276;
		let div275;
		let t609;
		let t610;
		let sqi47;
		let t611;
		let doc42;
		let h242;
		let t613;
		let div279;
		let t614;
		let span48;
		let t615;
		let div278;
		let t617;
		let div282;
		let div281;
		let div280;
		let t618;
		let t619;
		let sqi48;
		let t620;
		let doc43;
		let h243;
		let t622;
		let div284;
		let t623;
		let div283;
		let t624;
		let a22;
		let b10;
		let t626;
		let a23;
		let b11;
		let t628;
		let t629;
		let div287;
		let div286;
		let div285;
		let t630;
		let t631;
		let sqi49;
		let t632;
		let br70;
		let t633;
		let div290;
		let div289;
		let div288;
		let t634;
		let t635;
		let sqi50;
		let t636;
		let doc44;
		let h244;
		let t638;
		let div291;
		let t639;
		let span49;
		let t640;
		let div294;
		let div293;
		let div292;
		let t641;
		let t642;
		let sqi51;
		let t643;
		let doc45;
		let h245;
		let t645;
		let div295;
		let t646;
		let span50;
		let t647;
		let span51;
		let t648;
		let div298;
		let div297;
		let div296;
		let t649;
		let t650;
		let sqi52;
		let t651;
		let doc46;
		let h246;
		let t653;
		let div299;
		let t654;
		let span52;
		let t655;
		let div302;
		let div301;
		let div300;
		let t656;
		let t657;
		let sqi53;
		let t658;
		let doc47;
		let h247;
		let t660;
		let div303;
		let t661;
		let span53;
		let t662;
		let div306;
		let div305;
		let div304;
		let t663;
		let t664;
		let sqi54;
		let t665;
		let doc48;
		let h248;
		let t667;
		let div307;
		let t668;
		let span54;
		let t669;
		let br71;
		let t670;
		let span55;
		let t671;
		let br72;
		let t672;
		let t673;
		let div310;
		let div309;
		let div308;
		let t674;
		let t675;
		let sqi55;
		let t676;
		let br73;
		let t677;
		let div311;
		let t679;
		let div314;
		let div313;
		let div312;
		let t680;
		let t681;
		let sqi56;
		let t682;
		let doc49;
		let h249;
		let t684;
		let div315;
		let t685;
		let span56;
		let t686;
		let div318;
		let div317;
		let div316;
		let t687;
		let t688;
		let sqi57;
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
				props: { cname: "html", mh: "410" },
				$$inline: true
			});

		sqi28 = new Sq_editorI({
				props: { cname: "text", mh: "410" },
				$$inline: true
			});

		sqi29 = new Sq_editorI({
				props: { cname: "val", mh: "410" },
				$$inline: true
			});

		sqi30 = new Sq_editorI({
				props: { cname: "css", mh: "410" },
				$$inline: true
			});

		sqi31 = new Sq_editorI({
				props: { cname: "attr", mh: "410" },
				$$inline: true
			});

		sqi32 = new Sq_editorI({
				props: { cname: "prop", mh: "410" },
				$$inline: true
			});

		sqi33 = new Sq_editorI({
				props: { cname: "get", mh: "410" },
				$$inline: true
			});

		sqi34 = new Sq_editorI({
				props: { cname: "show", mh: "410" },
				$$inline: true
			});

		sqi35 = new Sq_editorI({
				props: { cname: "remove", mh: "410" },
				$$inline: true
			});

		sqi36 = new Sq_editorI({
				props: { cname: "before", mh: "410" },
				$$inline: true
			});

		sqi37 = new Sq_editorI({
				props: { cname: "after", mh: "410" },
				$$inline: true
			});

		sqi38 = new Sq_editorI({
				props: { cname: "prepend", mh: "410" },
				$$inline: true
			});

		sqi39 = new Sq_editorI({
				props: { cname: "append", mh: "410" },
				$$inline: true
			});

		sqi40 = new Sq_editorI({
				props: { cname: "replaceWith", mh: "410" },
				$$inline: true
			});

		sqi41 = new Sq_editorI({
				props: { cname: "addClass", mh: "410" },
				$$inline: true
			});

		sqi42 = new Sq_editorI({
				props: { cname: "toggleClass", mh: "410" },
				$$inline: true
			});

		sqi43 = new Sq_editorI({
				props: { cname: "width", mh: "410" },
				$$inline: true
			});

		sqi44 = new Sq_editorI({
				props: { cname: "innerWidth", mh: "410" },
				$$inline: true
			});

		sqi45 = new Sq_editorI({
				props: { cname: "outerWidth", mh: "410" },
				$$inline: true
			});

		sqi46 = new Sq_editorI({
				props: { cname: "offset", mh: "410" },
				$$inline: true
			});

		sqi47 = new Sq_editorI({
				props: { cname: "pos", mh: "410" },
				$$inline: true
			});

		sqi48 = new Sq_editorI({
				props: { cname: "fadeIn", mh: "410" },
				$$inline: true
			});

		sqi49 = new Sq_editorI({
				props: { cname: "animateSimple", mh: "410" },
				$$inline: true
			});

		sqi50 = new Sq_editorI({
				props: { cname: "animate", mh: "410" },
				$$inline: true
			});

		sqi51 = new Sq_editorI({
				props: { cname: "scroll", mh: "410" },
				$$inline: true
			});

		sqi52 = new Sq_editorI({
				props: { cname: "scrollTop", mh: "410" },
				$$inline: true
			});

		sqi53 = new Sq_editorI({
				props: { cname: "scrollToElement", mh: "410" },
				$$inline: true
			});

		sqi54 = new Sq_editorI({
				props: { cname: "each", mh: "410" },
				$$inline: true
			});

		sqi55 = new Sq_editorI({
				props: { cname: "on", mh: "410" },
				$$inline: true
			});

		sqi56 = new Sq_editorI({
				props: { cname: "onf", mh: "410" },
				$$inline: true
			});

		sqi57 = new Sq_editorI({
				props: { cname: "trg", mh: "410" },
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
				hr = element("hr");
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
				div35.textContent = "Operations";
				t71 = space();
				div36 = element("div");
				div36.textContent = "html";
				t73 = space();
				div37 = element("div");
				div37.textContent = "text";
				t75 = space();
				div38 = element("div");
				div38.textContent = "val";
				t77 = space();
				div39 = element("div");
				div39.textContent = "css";
				t79 = space();
				div40 = element("div");
				div40.textContent = "attr";
				t81 = space();
				div41 = element("div");
				div41.textContent = "prop";
				t83 = space();
				div42 = element("div");
				div42.textContent = "get";
				t85 = space();
				div43 = element("div");
				div43.textContent = "show / hide";
				t87 = space();
				div44 = element("div");
				div44.textContent = "remove";
				t89 = space();
				div45 = element("div");
				div45.textContent = "before / after";
				t91 = space();
				div46 = element("div");
				div46.textContent = "prepend / append";
				t93 = space();
				div47 = element("div");
				div47.textContent = "replaceWith";
				t95 = space();
				div48 = element("div");
				div48.textContent = "addClass / removeClass";
				t97 = space();
				div49 = element("div");
				div49.textContent = "toggleClass";
				t99 = space();
				div50 = element("div");
				div50.textContent = "Size & Position";
				t101 = space();
				div51 = element("div");
				div51.textContent = "width / height";
				t103 = space();
				div52 = element("div");
				div52.textContent = "innerWidth / innerHeight";
				t105 = space();
				div53 = element("div");
				div53.textContent = "outerWidth / outerHeight";
				t107 = space();
				div54 = element("div");
				div54.textContent = "offset";
				t109 = space();
				div55 = element("div");
				div55.textContent = "pos (position)";
				t111 = space();
				div56 = element("div");
				div56.textContent = "Animations";
				t113 = space();
				div57 = element("div");
				div57.textContent = "fadeIn / fadeOut";
				t115 = space();
				div58 = element("div");
				div58.textContent = "animate";
				t117 = space();
				div59 = element("div");
				div59.textContent = "scroll";
				t119 = space();
				div60 = element("div");
				div60.textContent = "scrollTop / scrollLeft";
				t121 = space();
				div61 = element("div");
				div61.textContent = "scrollToElement";
				t123 = space();
				div62 = element("div");
				div62.textContent = "Loops";
				t125 = space();
				div63 = element("div");
				div63.textContent = "each";
				t127 = space();
				div64 = element("div");
				div64.textContent = "Events";
				t129 = space();
				div65 = element("div");
				div65.textContent = "on / off / onf";
				t131 = space();
				div66 = element("div");
				div66.textContent = "trg (trigger)";
				t133 = space();
				br0 = element("br");
				br1 = element("br");
				br2 = element("br");
				br3 = element("br");
				br4 = element("br");
				br5 = element("br");
				br6 = element("br");
				br7 = element("br");
				t134 = space();
				div67 = element("div");
				span1 = element("span");
				t135 = space();
				section4 = element("section");
				h1 = element("h1");
				span2 = element("span");
				t136 = text("sQuery Docs");
				div68 = element("div");
				div68.textContent = `${name}`;
				t138 = space();
				doc0 = element("doc");
				h20 = element("h2");
				h20.textContent = "Installation";
				t140 = space();
				div69 = element("div");
				t141 = text("Download ");
				a2 = element("a");
				a2.textContent = "sQuery.zip";
				t143 = text(" or use CDN. (");
				a3 = element("a");
				a3.textContent = "Github page";
				t145 = text(")");
				t146 = space();
				div72 = element("div");
				div71 = element("div");
				div70 = element("div");
				t147 = text("\n\t\t\t\t\tTo use sQuery, put squery.min.js somewhere just like jQuery. ");
				small0 = element("small");
				small0.textContent = "(NOTE: sq is equivalent to $ in jQuery)";
				t149 = space();
				create_component(sqi0.$$.fragment);
				t150 = space();
				div75 = element("div");
				div74 = element("div");
				div73 = element("div");
				t151 = text("Or you can also use CDN!");
				t152 = space();
				create_component(sqi1.$$.fragment);
				t153 = space();
				div78 = element("div");
				div77 = element("div");
				div76 = element("div");
				t154 = text("ES6 module is also supported! ");
				small1 = element("small");
				t155 = text("(NOTE: () =>｛ ｝ is the ES6's ");
				a4 = element("a");
				a4.textContent = "arrow function";
				t157 = text(")");
				t158 = space();
				create_component(sqi2.$$.fragment);
				t159 = space();
				div81 = element("div");
				div80 = element("div");
				div79 = element("div");
				t160 = text("ES6 module CDN!");
				t161 = space();
				create_component(sqi3.$$.fragment);
				t162 = space();
				doc1 = element("doc");
				h21 = element("h2");
				h21.textContent = "Difference between jQuery";
				t164 = space();
				div92 = element("div");
				t165 = text("sQuery is not a simple jQuery clone. It's made for using with modern frontend frameworks.\n\t\t\t\tThere are some differences between jQuery.\n\n\t\t\t\t");
				div91 = element("div");
				div82 = element("div");
				h30 = element("h3");
				h30.textContent = "sQuery uses sq not $. But you can customize!";
				t167 = space();
				p0 = element("p");
				t168 = text("sQuery avoids using $ since Svelte and jQuery use $.");
				br8 = element("br");
				t169 = text("\n\t\t\t\t\t\t\tActually, you ");
				b0 = element("b");
				b0.textContent = "can";
				t171 = text(" use $ in sQuery! See ");
				a5 = element("a");
				a5.textContent = "Use like jQuery";
				t173 = space();
				div83 = element("div");
				h31 = element("h3");
				h31.textContent = "sQuery doesn't have $.ajax function. Use fetch or axios instead";
				t175 = space();
				p1 = element("p");
				t176 = text("Since this is the modern trend, sQuery also doesn't have ajax functions just as ");
				b1 = element("b");
				b1.textContent = "React/Vue/Svelte";
				t178 = text(" do.");
				br9 = element("br");
				t179 = text("\n\t\t\t\t\t\t\tYou should use ");
				a6 = element("a");
				a6.textContent = "axios";
				t181 = text(" or ");
				a7 = element("a");
				a7.textContent = "native fetch function";
				t183 = text(" not $.ajax.");
				t184 = space();
				div84 = element("div");
				h32 = element("h3");
				h32.textContent = "Never use .click(). Stick to .on() and .trigger()";
				t186 = space();
				p2 = element("p");
				t187 = text(".click() and some event methods in jQuery used to be very widely used. However it's been depricated in the latest jQuery.\n\t\t\t\t\t\t\tjQuery has .on() and .trigger() methods, which are faster and better. ");
				br10 = element("br");
				t188 = text("\n\t\t\t\t\t\t\tIn sQuery, you can do something like this just like the latest jQuery:");
				br11 = element("br");
				t189 = space();
				br12 = element("br");
				t190 = space();
				b2 = element("b");
				t191 = text("sq('selector').on('click', ... //registering a click event");
				br13 = element("br");
				t192 = text("\n\t\t\t\t\t\t\t\tsq('selector').trigger('click') //triggering a click event");
				br14 = element("br");
				t193 = text("\n\t\t\t\t\t\t\t\tsq('selector').trg('click') //triggering a click event (shorthand)");
				t194 = space();
				div85 = element("div");
				h33 = element("h3");
				h33.textContent = "Never use :contains / :is";
				t196 = space();
				p3 = element("p");
				t197 = text(":contains in jQuery used to be very widely used. However it's been depricated in the latest jQuery.\n\t\t\t\t\t\t\t");
				br15 = element("br");
				br16 = element("br");
				t198 = space();
				b3 = element("b");
				b3.textContent = "$(\":contains('selector')\")";
				br17 = element("br");
				t200 = space();
				br18 = element("br");
				t201 = text("\n\t\t\t\t\t\t\tsQuery also doesn't support them for various performance reasons. Instead, sQuery just supports performant methods to do the same things just like the latest jQuery does.");
				br19 = element("br");
				t202 = space();
				br20 = element("br");
				t203 = space();
				b4 = element("b");
				t204 = text(".contains('selector')");
				br21 = element("br");
				t205 = text("\n\t\t\t\t\t\t\t\t.is('selector')");
				br22 = element("br");
				t206 = space();
				div86 = element("div");
				h34 = element("h3");
				h34.textContent = "Why sQuery doesn't support all the functions in jQuery?";
				t208 = space();
				p4 = element("p");
				t209 = text("sQuery has major core functions in jQuery.");
				br23 = element("br");
				t210 = text("\n\t\t\t\t\t\t\tHowever, it's not made for supporting everything.");
				br24 = element("br");
				t211 = text("\n\t\t\t\t\t\t\tsQuery is made for working with modern js frameworks such as ");
				b5 = element("b");
				b5.textContent = "React/Vue/Svelte/Angular";
				t213 = text(" with replacing lengthy vanilla JavaScript codes.");
				br25 = element("br");
				t214 = space();
				br26 = element("br");
				t215 = text("\n\t\t\t\t\t\t\tAs a result, with sQuery, the total code size could be smaller than without it especially in big projects.");
				br27 = element("br");
				t216 = text("\n\t\t\t\t\t\t\tIf sQuery supports all functions and all features in jQuery, the code size would be 3 times or something? It wouldn't be worthy at all!");
				br28 = element("br");
				t217 = text("\n\t\t\t\t\t\t\tThat's why I cut down all the unessential functions from jQuery since the purpose of sQuery is simple, solid, and small.");
				br29 = element("br");
				t218 = space();
				br30 = element("br");
				t219 = text("\n\t\t\t\t\t\t\tFor instance, let's assume the following scenario: sQuery + Vue.js:");
				br31 = element("br");
				t220 = text("\n\t\t\t\t\t\t\tThanks to sQuery, you can code just like jQuery, and you can also use the virtual DOM and auto code optimizations Vue provides.");
				br32 = element("br");
				t221 = text("\n\t\t\t\t\t\t\tIf you do DOM manipulations relatively a lot, sQuery doesn't increase the total code size as a result of cutting down of lengthy vanila JS codes, so you won't lose anything in this scenario.");
				t222 = space();
				div90 = element("div");
				h35 = element("h3");
				h35.textContent = "Adding custom methods to sQuery (just like jQuery $.fn)";
				t224 = space();
				p5 = element("p");
				small2 = element("small");
				small2.textContent = "NOTE: This is for maniacs. You don't even need to know this if you just want to use sQuery.";
				br33 = element("br");
				t226 = text("\n\t\t\t\t\t\t\tI didn't imprement unimportant methods in sQuery to keep it small and performant. \n\t\t\t\t\t\t\tHowever, if you need more methods, you can always very easily imprement on your own using _SQ.");
				t227 = space();
				div89 = element("div");
				div88 = element("div");
				div87 = element("div");
				t228 = text("\n\t\t\t\t\t\t\t\tCustom Methods");
				t229 = space();
				create_component(sqi4.$$.fragment);
				t230 = space();
				doc2 = element("doc");
				h22 = element("h2");
				h22.textContent = "Use like jQuery";
				t232 = space();
				div93 = element("div");
				img0 = element("img");
				t233 = text("\n\t\t\t\tsQuery might look awkward for jQuery fans since it uses sq not $.");
				br34 = element("br");
				t234 = text("\n\t\t\t\tActually, you can use $ very easily by just declaring $.");
				t235 = space();
				div98 = element("div");
				div95 = element("div");
				div94 = element("div");
				t236 = text("\n\t\t\t\t\tReplacing sq to $");
				t237 = space();
				create_component(sqi5.$$.fragment);
				t238 = space();
				div97 = element("div");
				div96 = element("div");
				t239 = text("\n\t\t\t\t\tReplacing sq to $ (module version)");
				t240 = space();
				create_component(sqi6.$$.fragment);
				t241 = space();
				doc3 = element("doc");
				h23 = element("h2");
				h23.textContent = "Use with React";
				t243 = space();
				div101 = element("div");
				t244 = text("See ");
				a8 = element("a");
				a8.textContent = "the sQuery Installation Guide for React";
				t246 = text("!");
				br35 = element("br");
				t247 = space();
				img1 = element("img");
				t248 = space();
				div100 = element("div");
				h40 = element("h4");
				h40.textContent = "What is React?";
				t250 = space();
				div99 = element("div");
				a9 = element("a");
				a9.textContent = "React.js Official site";
				t252 = text("\n\t\t\t\t\tA JavaScript library for building user interfaces.");
				br36 = element("br");
				t253 = text("\n\t\t\t\t\tReact makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.\n\t\t\t\t\tDeclarative views make your code more predictable and easier to debug.");
				br37 = element("br");
				t254 = text("\n\t\t\t\t\tPerformance-wise, many reserches indicate SolidJS or Svelte is the fastest among major js frameworks. If your project doesn't need Next.js, I personally recommend you to try SolidJS or Svelte.\n\t\t\t\t\t");
				br38 = element("br");
				br39 = element("br");
				t255 = text("\n\t\t\t\t\tSPA/SSR/SSG?: ");
				a10 = element("a");
				a10.textContent = "Next.js";
				t257 = text(" is the de facto standard react framework for routing.");
				t258 = space();
				doc4 = element("doc");
				h24 = element("h2");
				h24.textContent = "Use with Vue.js";
				t260 = space();
				div104 = element("div");
				t261 = text("See ");
				a11 = element("a");
				a11.textContent = "the sQuery Installation Guide for Vue.js";
				t263 = text("!");
				br40 = element("br");
				t264 = space();
				img2 = element("img");
				t265 = space();
				div103 = element("div");
				h41 = element("h4");
				h41.textContent = "What is Vue.js?";
				t267 = space();
				div102 = element("div");
				a12 = element("a");
				a12.textContent = "Vue.js Official site";
				t269 = text("\n\t\t\t\t\tAn approachable, performant and versatile framework for building web user interfaces. \n\t\t\t\t\tBuilds on top of standard HTML, CSS and JavaScript with intuitive API and world-class documentation. \n\t\t\t\t\tPerformant. Truly reactive, compiler-optimized rendering system that rarely requires manual optimization.\n\t\t\t\t\t");
				br41 = element("br");
				br42 = element("br");
				t270 = text("\n\t\t\t\t\tSPA/SSR/SSG?: ");
				a13 = element("a");
				a13.textContent = "Nuxt.js";
				t272 = text(" is the most well-used vue framework for routing.");
				t273 = space();
				doc5 = element("doc");
				h25 = element("h2");
				h25.textContent = "Use with Svelte";
				t275 = space();
				div107 = element("div");
				t276 = text("See ");
				a14 = element("a");
				a14.textContent = "the sQuery Installation Guide for Svelte";
				t278 = text("!");
				br43 = element("br");
				t279 = space();
				img3 = element("img");
				t280 = space();
				div106 = element("div");
				h42 = element("h4");
				h42.textContent = "What is Svelte?";
				t282 = space();
				div105 = element("div");
				a15 = element("a");
				a15.textContent = "Svelte Official site";
				t284 = text("\n\t\t\t\t\tSvelte is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app.\n\t\t\t\t\tInstead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes.");
				br44 = element("br");
				br45 = element("br");
				t285 = text("\n\t\t\t\t\tSvelte doesn't have the Virtual DOM but it's actually one of the most performant major frameworks today.");
				br46 = element("br");
				t286 = text("\n\t\t\t\t\tBy the way, this website is made by Svelte and sQuery!\n\t\t\t\t\t");
				br47 = element("br");
				br48 = element("br");
				t287 = text("\n\t\t\t\t\tSPA/SSR/SSG?: Svelte has multiple good frameworks for routing. ");
				a16 = element("a");
				a16.textContent = "Sveltekit";
				t289 = text(" is the official framework and will be the de facto standard in the future.");
				t290 = space();
				doc6 = element("doc");
				h26 = element("h2");
				h26.textContent = "Use with SolidJS";
				t292 = space();
				div110 = element("div");
				t293 = text("See ");
				a17 = element("a");
				a17.textContent = "the sQuery Installation Guide for SolidJS";
				t295 = text("!");
				br49 = element("br");
				t296 = space();
				img4 = element("img");
				t297 = space();
				div109 = element("div");
				h43 = element("h4");
				h43.textContent = "What is SolidJS?";
				t299 = space();
				div108 = element("div");
				a18 = element("a");
				a18.textContent = "SolidJS Official site";
				t301 = text("\n\t\t\t\t\tA declarative, efficient and flexible JavaScript library for building user interfaces.");
				br50 = element("br");
				t302 = text("\n\t\t\t\t\tSolid stands on the shoulders of giants, particularly React and Knockout. If you've developed with React Hooks before, Solid should seem very natural. In fact, more natural as Solid's model is much simpler with no Hook rules. Every Component executes once and it is the Hooks and bindings that execute many times as their dependencies update.\n\t\t\t\t\tSolid follows the same philosophy as React with unidirectional data flow, read/write segregation, and immutable interfaces. It however has a completely different implementation that forgoes using a Virtual DOM.");
				br51 = element("br");
				br52 = element("br");
				t303 = text("\n\t\t\t\t\tSolidJS doesn't have the Virtual DOM but it's actually the most performant framework today.\n\t\t\t\t\t");
				br53 = element("br");
				br54 = element("br");
				t304 = text("\n\t\t\t\t\tSPA/SSR/SSG?: Read ");
				a19 = element("a");
				a19.textContent = "the official documentation";
				t306 = text(" for SSR/SSG!");
				t307 = space();
				doc7 = element("doc");
				h27 = element("h2");
				h27.textContent = "Use with Angular";
				t309 = space();
				div113 = element("div");
				t310 = text("See ");
				a20 = element("a");
				a20.textContent = "the sQuery Installation Guide for Angular";
				t312 = text("!");
				br55 = element("br");
				t313 = space();
				img5 = element("img");
				t314 = space();
				div112 = element("div");
				h44 = element("h4");
				h44.textContent = "What is Angular?";
				t316 = space();
				div111 = element("div");
				a21 = element("a");
				a21.textContent = "Angular Official site";
				t318 = text("\n\t\t\t\t\tAngular is a platform for building mobile and desktop web applications.");
				br56 = element("br");
				t319 = text("\n\t\t\t\t\tAngular is a TypeScript-based free and open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations.");
				t320 = space();
				doc8 = element("doc");
				h28 = element("h2");
				h28.textContent = "filter / not";
				t322 = space();
				div114 = element("div");
				t323 = text("filter: Reduce the set of matched elements to those that match the selector or pass the function's test. \n\t\t\t\t");
				span3 = element("span");
				t324 = space();
				div117 = element("div");
				div116 = element("div");
				div115 = element("div");
				t325 = text("\n\t\t\t\t\tFilter the elements");
				t326 = space();
				create_component(sqi7.$$.fragment);
				t327 = space();
				div118 = element("div");
				br57 = element("br");
				t328 = text("\n\t\t\t\tnot: The opposite version of filter. Remove elements from the set of matched elements. \n\t\t\t\t");
				span4 = element("span");
				t329 = space();
				div121 = element("div");
				div120 = element("div");
				div119 = element("div");
				t330 = text("\n\t\t\t\t\tFilter the non-matched elements");
				t331 = space();
				create_component(sqi8.$$.fragment);
				t332 = space();
				doc9 = element("doc");
				h29 = element("h2");
				h29.textContent = "eq";
				t334 = space();
				div122 = element("div");
				t335 = text("Reduce the set of matched elements to the one at the specified index. \n\t\t\t\t");
				span5 = element("span");
				t336 = space();
				div125 = element("div");
				div124 = element("div");
				div123 = element("div");
				t337 = text("\n\t\t\t\t\tReduce the set using an integer indicating the 0-based position of the element.");
				t338 = space();
				create_component(sqi9.$$.fragment);
				t339 = space();
				div126 = element("div");
				br58 = element("br");
				t340 = text("\n\t\t\t\tYou can also use a minus value! (Counting backwards from the last element in the set)");
				t341 = space();
				div129 = element("div");
				div128 = element("div");
				div127 = element("div");
				t342 = text("\n\t\t\t\t\tReduce the set using an integer indicating the position of the element, counting backwards from the last element in the set.");
				t343 = space();
				create_component(sqi10.$$.fragment);
				t344 = space();
				doc10 = element("doc");
				h210 = element("h2");
				h210.textContent = "first / last";
				t346 = space();
				div130 = element("div");
				t347 = text("first: Reduce the set of matched elements to the first in the set. \n\t\t\t\t");
				span6 = element("span");
				t348 = space();
				div133 = element("div");
				div132 = element("div");
				div131 = element("div");
				t349 = text("\n\t\t\t\t\tfirst");
				t350 = space();
				create_component(sqi11.$$.fragment);
				t351 = space();
				div134 = element("div");
				br59 = element("br");
				t352 = text("\n\t\t\t\tlast: Reduce the set of matched elements to the last in the set. \n\t\t\t\t");
				span7 = element("span");
				t353 = space();
				div137 = element("div");
				div136 = element("div");
				div135 = element("div");
				t354 = text("\n\t\t\t\t\tlast");
				t355 = space();
				create_component(sqi12.$$.fragment);
				t356 = space();
				doc11 = element("doc");
				h211 = element("h2");
				h211.textContent = "has";
				t358 = space();
				div138 = element("div");
				t359 = text("Returns boolean result of the selector argument against the collection.\n\t\t\t\t");
				span8 = element("span");
				t360 = space();
				div141 = element("div");
				div140 = element("div");
				div139 = element("div");
				t361 = text("\n\t\t\t\t\thas");
				t362 = space();
				create_component(sqi13.$$.fragment);
				t363 = space();
				doc12 = element("doc");
				h212 = element("h2");
				h212.textContent = "contains";
				t365 = space();
				div142 = element("div");
				t366 = text("Select all elements that contain the specified text.\n\t\t\t\t");
				span9 = element("span");
				t367 = space();
				div145 = element("div");
				div144 = element("div");
				div143 = element("div");
				t368 = text("\n\t\t\t\t\tcontains");
				t369 = space();
				create_component(sqi14.$$.fragment);
				t370 = space();
				doc13 = element("doc");
				h213 = element("h2");
				h213.textContent = "slice";
				t372 = space();
				div146 = element("div");
				t373 = text("Reduce the set of matched elements to a subset specified by a range of indices.\n\t\t\t\t");
				span10 = element("span");
				t374 = space();
				div149 = element("div");
				div148 = element("div");
				div147 = element("div");
				t375 = text("\n\t\t\t\t\tslice");
				t376 = space();
				create_component(sqi15.$$.fragment);
				t377 = space();
				doc14 = element("doc");
				h214 = element("h2");
				h214.textContent = "index";
				t379 = space();
				div150 = element("div");
				t380 = text("Returns the index of the element in its parent\n\t\t\t\t");
				span11 = element("span");
				t381 = space();
				div153 = element("div");
				div152 = element("div");
				div151 = element("div");
				t382 = text("\n\t\t\t\t\tindex");
				t383 = space();
				create_component(sqi16.$$.fragment);
				t384 = space();
				doc15 = element("doc");
				h215 = element("h2");
				h215.textContent = "is";
				t386 = space();
				div154 = element("div");
				t387 = text("Returns whether the provided selector matches the first element in the collection.\n\t\t\t\t");
				span12 = element("span");
				t388 = space();
				div157 = element("div");
				div156 = element("div");
				div155 = element("div");
				t389 = text("\n\t\t\t\t\t.is( selector )");
				t390 = space();
				create_component(sqi17.$$.fragment);
				t391 = space();
				doc16 = element("doc");
				h216 = element("h2");
				h216.textContent = "find";
				t393 = space();
				div158 = element("div");
				t394 = text("Returns selector match descendants from the first element in the collection.\n\t\t\t\t");
				span13 = element("span");
				t395 = space();
				div161 = element("div");
				div160 = element("div");
				div159 = element("div");
				t396 = text("\n\t\t\t\t\t.find( selector )");
				t397 = space();
				create_component(sqi18.$$.fragment);
				t398 = space();
				doc17 = element("doc");
				h217 = element("h2");
				h217.textContent = "children";
				t400 = space();
				div162 = element("div");
				t401 = text("Returns a collection of child elements\n\t\t\t\t");
				span14 = element("span");
				t402 = space();
				div165 = element("div");
				div164 = element("div");
				div163 = element("div");
				t403 = text("\n\t\t\t\t\t.children( selector )");
				t404 = space();
				create_component(sqi19.$$.fragment);
				t405 = space();
				doc18 = element("doc");
				h218 = element("h2");
				h218.textContent = "next / prev";
				t407 = space();
				div166 = element("div");
				t408 = text("next: Returns next sibling\n\t\t\t\t");
				span15 = element("span");
				t409 = space();
				div169 = element("div");
				div168 = element("div");
				div167 = element("div");
				t410 = text("\n\t\t\t\t\tnext");
				t411 = space();
				create_component(sqi20.$$.fragment);
				t412 = space();
				div170 = element("div");
				br60 = element("br");
				t413 = text("\n\t\t\t\tprev: Returns the previous adjacent element.\n\t\t\t\t");
				span16 = element("span");
				t414 = space();
				div173 = element("div");
				div172 = element("div");
				div171 = element("div");
				t415 = text("\n\t\t\t\t\tprev");
				t416 = space();
				create_component(sqi21.$$.fragment);
				t417 = space();
				doc19 = element("doc");
				h219 = element("h2");
				h219.textContent = "siblings";
				t419 = space();
				div174 = element("div");
				t420 = text("Returns a collection of sibling elements.\n\t\t\t\t");
				span17 = element("span");
				t421 = space();
				div177 = element("div");
				div176 = element("div");
				div175 = element("div");
				t422 = text("\n\t\t\t\t\tsiblings");
				t423 = space();
				create_component(sqi22.$$.fragment);
				t424 = space();
				doc20 = element("doc");
				h220 = element("h2");
				h220.textContent = "parent / parents";
				t426 = space();
				div178 = element("div");
				t427 = text("parent: Returns parent element.\n\t\t\t\t");
				span18 = element("span");
				t428 = space();
				div181 = element("div");
				div180 = element("div");
				div179 = element("div");
				t429 = text("\n\t\t\t\t\tparent");
				t430 = space();
				create_component(sqi23.$$.fragment);
				t431 = space();
				div182 = element("div");
				br61 = element("br");
				t432 = text("\n\t\t\t\tparents: Returns recursive parent by selector.\n\t\t\t\t");
				span19 = element("span");
				t433 = space();
				div185 = element("div");
				div184 = element("div");
				div183 = element("div");
				t434 = text("\n\t\t\t\t\tparents");
				t435 = space();
				create_component(sqi24.$$.fragment);
				t436 = space();
				doc21 = element("doc");
				h221 = element("h2");
				h221.textContent = "closest";
				t438 = space();
				div186 = element("div");
				t439 = text("Returns the closest matching selector up the DOM tree.\n\t\t\t\t");
				span20 = element("span");
				t440 = space();
				div189 = element("div");
				div188 = element("div");
				div187 = element("div");
				t441 = text("\n\t\t\t\t\tclosest");
				t442 = space();
				create_component(sqi25.$$.fragment);
				t443 = space();
				doc22 = element("doc");
				h222 = element("h2");
				h222.textContent = "hasClass";
				t445 = space();
				div190 = element("div");
				t446 = text("Returns the boolean result of checking if the first element in the collection has the className attribute.\n\t\t\t\t");
				span21 = element("span");
				t447 = space();
				div193 = element("div");
				div192 = element("div");
				div191 = element("div");
				t448 = text("\n\t\t\t\t\thasClass");
				t449 = space();
				create_component(sqi26.$$.fragment);
				t450 = space();
				doc23 = element("doc");
				h223 = element("h2");
				h223.textContent = "html";
				t452 = space();
				div194 = element("div");
				t453 = text("Returns the HTML text of the first element in the collection, sets the HTML if provided.\n\t\t\t\t");
				span22 = element("span");
				t454 = space();
				div197 = element("div");
				div196 = element("div");
				div195 = element("div");
				t455 = text("\n\t\t\t\t\thtml");
				t456 = space();
				create_component(sqi27.$$.fragment);
				t457 = space();
				doc24 = element("doc");
				h224 = element("h2");
				h224.textContent = "text";
				t459 = space();
				div198 = element("div");
				t460 = text("Returns the inner text of the first element in the collection, sets the text if textContent is provided.\n\t\t\t\t");
				span23 = element("span");
				t461 = space();
				div201 = element("div");
				div200 = element("div");
				div199 = element("div");
				t462 = text("\n\t\t\t\t\ttext");
				t463 = space();
				create_component(sqi28.$$.fragment);
				t464 = space();
				doc25 = element("doc");
				h225 = element("h2");
				h225.textContent = "val";
				t466 = space();
				div202 = element("div");
				t467 = text("Returns an inputs value. If value is supplied, sets all inputs in collection's value to the value argument.\n\t\t\t\t");
				span24 = element("span");
				t468 = space();
				div205 = element("div");
				div204 = element("div");
				div203 = element("div");
				t469 = text("\n\t\t\t\t\tval");
				t470 = space();
				create_component(sqi29.$$.fragment);
				t471 = space();
				doc26 = element("doc");
				h226 = element("h2");
				h226.textContent = "css";
				t473 = space();
				div206 = element("div");
				t474 = text("Returns a CSS property value when just property is supplied. Sets a CSS property when property and value are supplied, and set multiple properties when an object is supplied.\n\t\t\t\t");
				span25 = element("span");
				t475 = space();
				div209 = element("div");
				div208 = element("div");
				div207 = element("div");
				t476 = text("\n\t\t\t\t\tcss(property) / css(property, value) / css(object)");
				t477 = space();
				create_component(sqi30.$$.fragment);
				t478 = space();
				doc27 = element("doc");
				h227 = element("h2");
				h227.textContent = "attr";
				t480 = space();
				div210 = element("div");
				t481 = text("Without attrValue, returns the attribute value of the first element in the collection. With attrValue, sets the attribute value of each element of the collection.\n\t\t\t\t");
				span26 = element("span");
				t482 = space();
				div213 = element("div");
				div212 = element("div");
				div211 = element("div");
				t483 = text("\n\t\t\t\t\tattr");
				t484 = space();
				create_component(sqi31.$$.fragment);
				t485 = space();
				doc28 = element("doc");
				h228 = element("h2");
				h228.textContent = "prop";
				t487 = space();
				div214 = element("div");
				t488 = text("Without a value, returns the prop value of the first element in the collection. With a value, sets the prop value of each element of the collection.\n\t\t\t\t");
				span27 = element("span");
				t489 = space();
				div217 = element("div");
				div216 = element("div");
				div215 = element("div");
				t490 = text("\n\t\t\t\t\tprop");
				t491 = space();
				create_component(sqi32.$$.fragment);
				t492 = space();
				doc29 = element("doc");
				h229 = element("h2");
				h229.textContent = "get";
				t494 = space();
				div218 = element("div");
				t495 = text("Returns the element at the index\n\t\t\t\t");
				span28 = element("span");
				t496 = space();
				div221 = element("div");
				div220 = element("div");
				div219 = element("div");
				t497 = text("\n\t\t\t\t\tget");
				t498 = space();
				create_component(sqi33.$$.fragment);
				t499 = space();
				doc30 = element("doc");
				h230 = element("h2");
				h230.textContent = "show / hide";
				t501 = space();
				div222 = element("div");
				t502 = text("show: Shows the specified elements\n\t\t\t\t");
				span29 = element("span");
				t503 = space();
				br62 = element("br");
				br63 = element("br");
				t504 = text("\n\t\t\t\thide: Hides the specified elements\n\t\t\t\t");
				span30 = element("span");
				t505 = space();
				div225 = element("div");
				div224 = element("div");
				div223 = element("div");
				t506 = text("\n\t\t\t\t\tshow / hide");
				t507 = space();
				create_component(sqi34.$$.fragment);
				t508 = space();
				doc31 = element("doc");
				h231 = element("h2");
				h231.textContent = "remove";
				t510 = space();
				div226 = element("div");
				t511 = text("Removes the specified elements\n\t\t\t\t");
				span31 = element("span");
				t512 = space();
				div229 = element("div");
				div228 = element("div");
				div227 = element("div");
				t513 = text("\n\t\t\t\t\tremove");
				t514 = space();
				create_component(sqi35.$$.fragment);
				t515 = space();
				doc32 = element("doc");
				h232 = element("h2");
				h232.textContent = "before / after";
				t517 = space();
				div230 = element("div");
				t518 = text("before: Insert content, specified by the parameter, before each element in the set of matched elements.\n\t\t\t\t");
				span32 = element("span");
				t519 = space();
				div233 = element("div");
				div232 = element("div");
				div231 = element("div");
				t520 = text("\n\t\t\t\t\tbefore");
				t521 = space();
				create_component(sqi36.$$.fragment);
				t522 = space();
				div234 = element("div");
				br64 = element("br");
				t523 = text("\n\t\t\t\tafter: Insert content, specified by the parameter, after each element in the set of matched elements.\n\t\t\t\t");
				span33 = element("span");
				t524 = space();
				div237 = element("div");
				div236 = element("div");
				div235 = element("div");
				t525 = text("\n\t\t\t\t\tafter");
				t526 = space();
				create_component(sqi37.$$.fragment);
				t527 = space();
				doc33 = element("doc");
				h233 = element("h2");
				h233.textContent = "prepend / append";
				t529 = space();
				div238 = element("div");
				t530 = text("prepend: Prepends element to the first element in collection.\n\t\t\t\t");
				span34 = element("span");
				t531 = space();
				div241 = element("div");
				div240 = element("div");
				div239 = element("div");
				t532 = text("\n\t\t\t\t\tprepend");
				t533 = space();
				create_component(sqi38.$$.fragment);
				t534 = space();
				div242 = element("div");
				br65 = element("br");
				t535 = text("\n\t\t\t\tappend: Appends the target element to the first element in the collection.\n\t\t\t\t");
				span35 = element("span");
				t536 = space();
				div245 = element("div");
				div244 = element("div");
				div243 = element("div");
				t537 = text("\n\t\t\t\t\tappend");
				t538 = space();
				create_component(sqi39.$$.fragment);
				t539 = space();
				doc34 = element("doc");
				h234 = element("h2");
				h234.textContent = "replaceWith";
				t541 = space();
				div246 = element("div");
				t542 = text("Replace an element with the provided new content \n\t\t\t\t");
				span36 = element("span");
				t543 = space();
				div249 = element("div");
				div248 = element("div");
				div247 = element("div");
				t544 = text("\n\t\t\t\t\treplaceWith");
				t545 = space();
				create_component(sqi40.$$.fragment);
				t546 = space();
				doc35 = element("doc");
				h235 = element("h2");
				h235.textContent = "addClass / removeClass";
				t548 = space();
				div250 = element("div");
				t549 = text("addClass: Adds the specified class to each element in the set of matched elements.\n\t\t\t\t");
				span37 = element("span");
				t550 = space();
				br66 = element("br");
				t551 = text("\n\t\t\t\tremoveClass: Remove a single class from each element in the set of matched elements.\n\t\t\t\t");
				span38 = element("span");
				t552 = space();
				div253 = element("div");
				div252 = element("div");
				div251 = element("div");
				t553 = text("\n\t\t\t\t\taddClass / removeClass");
				t554 = space();
				create_component(sqi41.$$.fragment);
				t555 = space();
				doc36 = element("doc");
				h236 = element("h2");
				h236.textContent = "toggleClass";
				t557 = space();
				div254 = element("div");
				t558 = text("Toggles the specified class to each element in the set of matched elements.\n\t\t\t\t");
				span39 = element("span");
				t559 = space();
				div257 = element("div");
				div256 = element("div");
				div255 = element("div");
				t560 = text("\n\t\t\t\t\ttoggleClass");
				t561 = space();
				create_component(sqi42.$$.fragment);
				t562 = space();
				doc37 = element("doc");
				h237 = element("h2");
				h237.textContent = "width / height";
				t564 = space();
				div258 = element("div");
				t565 = text("width: Get the current computed width for the first element in the set of matched elements or set the width of every matched element.\n\t\t\t\t");
				span40 = element("span");
				t566 = space();
				br67 = element("br");
				t567 = text("\n\t\t\t\theight: Get the current computed height for the first element in the set of matched elements or set the width of every matched element.\n\t\t\t\t");
				span41 = element("span");
				t568 = space();
				div261 = element("div");
				div260 = element("div");
				div259 = element("div");
				t569 = text("\n\t\t\t\t\twidth / height");
				t570 = space();
				create_component(sqi43.$$.fragment);
				t571 = space();
				doc38 = element("doc");
				h238 = element("h2");
				h238.textContent = "innerWidth / innerHeight";
				t573 = space();
				div262 = element("div");
				t574 = text("innerWidth: Get the current computed inner width (");
				b6 = element("b");
				b6.textContent = "including padding but not border";
				t576 = text(") for the first element in the set of matched elements or set the inner width of every matched element.\n\t\t\t\t");
				span42 = element("span");
				t577 = space();
				br68 = element("br");
				t578 = text("\n\t\t\t\tinnerHeight: Get the current computed inner height (");
				b7 = element("b");
				b7.textContent = "including padding but not border";
				t580 = text(") for the first element in the set of matched elements or set the height width of every matched element.\n\t\t\t\t");
				span43 = element("span");
				t581 = space();
				div265 = element("div");
				div264 = element("div");
				div263 = element("div");
				t582 = text("\n\t\t\t\t\tinnerWidth / innerHeight");
				t583 = space();
				create_component(sqi44.$$.fragment);
				t584 = space();
				doc39 = element("doc");
				h239 = element("h2");
				h239.textContent = "outerWidth / outerHeight";
				t586 = space();
				div266 = element("div");
				t587 = text("outerWidth: Get the current computed outer width (");
				b8 = element("b");
				b8.textContent = "including padding and border";
				t589 = text(") for the first element in the set of matched elements or set the outer width of every matched element.\n\t\t\t\t");
				span44 = element("span");
				t590 = space();
				br69 = element("br");
				t591 = text("\n\t\t\t\touterHeight: Get the current computed outer height (");
				b9 = element("b");
				b9.textContent = "including padding and border";
				t593 = text(") for the first element in the set of matched elements or set the outer height of every matched element.\n\t\t\t\t");
				span45 = element("span");
				t594 = space();
				div269 = element("div");
				div268 = element("div");
				div267 = element("div");
				t595 = text("\n\t\t\t\t\touterWidth / outerHeight");
				t596 = space();
				create_component(sqi45.$$.fragment);
				t597 = space();
				doc40 = element("doc");
				h240 = element("h2");
				h240.textContent = "offset";
				t599 = space();
				div270 = element("div");
				t600 = text("Get the current coordinates of the first element, or set the coordinates of every element, in the set of matched elements, relative to the document.\n\t\t\t\t");
				span46 = element("span");
				t601 = space();
				div273 = element("div");
				div272 = element("div");
				div271 = element("div");
				t602 = text("\n\t\t\t\t\toffset");
				t603 = space();
				create_component(sqi46.$$.fragment);
				t604 = space();
				doc41 = element("doc");
				h241 = element("h2");
				h241.textContent = "pos (position)";
				t606 = space();
				div274 = element("div");
				t607 = text("Get the current coordinates of the first element in the set of matched elements, relative to the offset parent.\n\t\t\t\t");
				span47 = element("span");
				t608 = space();
				div277 = element("div");
				div276 = element("div");
				div275 = element("div");
				t609 = text("\n\t\t\t\t\tpos (position)");
				t610 = space();
				create_component(sqi47.$$.fragment);
				t611 = space();
				doc42 = element("doc");
				h242 = element("h2");
				h242.textContent = "fadeIn / fadeOut";
				t613 = space();
				div279 = element("div");
				t614 = text("Display the matched elements by fading them to opaque. \n\t\t\t\t");
				span48 = element("span");
				t615 = space();
				div278 = element("div");
				div278.textContent = "NOTE: In jQuery, you could method-chain fadeIn and fadeOut to make a blink animation, but sQuery doesn't support it for a performance reason. Just use a callback function instead if you need a blink animation.";
				t617 = space();
				div282 = element("div");
				div281 = element("div");
				div280 = element("div");
				t618 = text("\n\t\t\t\t\tfadeIn / fadeOut");
				t619 = space();
				create_component(sqi48.$$.fragment);
				t620 = space();
				doc43 = element("doc");
				h243 = element("h2");
				h243.textContent = "animate";
				t622 = space();
				div284 = element("div");
				t623 = text("Perform a custom animation of a set of CSS properties.\n\t\t\t\t");
				div283 = element("div");
				t624 = text("NOTE: There are some differences to the ");
				a22 = element("a");
				b10 = element("b");
				b10.textContent = "jQuery's animate";
				t626 = text(". sQuery uses the native ");
				a23 = element("a");
				b11 = element("b");
				b11.textContent = "ES6 native animate";
				t628 = text(" method internally.");
				t629 = space();
				div287 = element("div");
				div286 = element("div");
				div285 = element("div");
				t630 = text("\n\t\t\t\t\tanimate");
				t631 = space();
				create_component(sqi49.$$.fragment);
				t632 = space();
				br70 = element("br");
				t633 = space();
				div290 = element("div");
				div289 = element("div");
				div288 = element("div");
				t634 = text("\n\t\t\t\t\tanimate (More advanced Example)");
				t635 = space();
				create_component(sqi50.$$.fragment);
				t636 = space();
				doc44 = element("doc");
				h244 = element("h2");
				h244.textContent = "scroll";
				t638 = space();
				div291 = element("div");
				t639 = text("Scroll the elements in the current chain.\n\t\t\t\t");
				span49 = element("span");
				t640 = space();
				div294 = element("div");
				div293 = element("div");
				div292 = element("div");
				t641 = text("\n\t\t\t\t\tscroll");
				t642 = space();
				create_component(sqi51.$$.fragment);
				t643 = space();
				doc45 = element("doc");
				h245 = element("h2");
				h245.textContent = "scrollTop / scrollLeft";
				t645 = space();
				div295 = element("div");
				t646 = text("Get the current vertical position of the scroll bar for the first element in the set of matched elements or set the vertical position of the scroll bar for every matched element.\n\t\t\t\t");
				span50 = element("span");
				t647 = space();
				span51 = element("span");
				t648 = space();
				div298 = element("div");
				div297 = element("div");
				div296 = element("div");
				t649 = text("\n\t\t\t\t\tscrollTop / scrollLeft");
				t650 = space();
				create_component(sqi52.$$.fragment);
				t651 = space();
				doc46 = element("doc");
				h246 = element("h2");
				h246.textContent = "scrollToElement";
				t653 = space();
				div299 = element("div");
				t654 = text("Scroll to the first element in the set of matched elements\n\t\t\t\t");
				span52 = element("span");
				t655 = space();
				div302 = element("div");
				div301 = element("div");
				div300 = element("div");
				t656 = text("\n\t\t\t\t\tscrollToElement");
				t657 = space();
				create_component(sqi53.$$.fragment);
				t658 = space();
				doc47 = element("doc");
				h247 = element("h2");
				h247.textContent = "each";
				t660 = space();
				div303 = element("div");
				t661 = text("Iterate over a jQuery object, executing a function for each matched element.\n\t\t\t\t");
				span53 = element("span");
				t662 = space();
				div306 = element("div");
				div305 = element("div");
				div304 = element("div");
				t663 = text("\n\t\t\t\t\teach");
				t664 = space();
				create_component(sqi54.$$.fragment);
				t665 = space();
				doc48 = element("doc");
				h248 = element("h2");
				h248.textContent = "on / off / onf";
				t667 = space();
				div307 = element("div");
				t668 = text("on: Adds event listener to collection elments.\n\t\t\t\t");
				span54 = element("span");
				t669 = space();
				br71 = element("br");
				t670 = text("\n\t\t\t\toff: Removes event listener from collection elments. \n\t\t\t\t");
				span55 = element("span");
				t671 = space();
				br72 = element("br");
				t672 = text("\n\t\t\t\tonf: Adds future event listener to collection elments.");
				t673 = space();
				div310 = element("div");
				div309 = element("div");
				div308 = element("div");
				t674 = text("\n\t\t\t\t\ton / off");
				t675 = space();
				create_component(sqi55.$$.fragment);
				t676 = space();
				br73 = element("br");
				t677 = space();
				div311 = element("div");
				div311.textContent = "NOTE: In sQuery, sq(document).onf('click', 'selector') equivalents to $(document).on('click', 'selector') in jQuery. .onf() can register future element events.";
				t679 = space();
				div314 = element("div");
				div313 = element("div");
				div312 = element("div");
				t680 = text("\n\t\t\t\t\tonf");
				t681 = space();
				create_component(sqi56.$$.fragment);
				t682 = space();
				doc49 = element("doc");
				h249 = element("h2");
				h249.textContent = "trg (trigger)";
				t684 = space();
				div315 = element("div");
				t685 = text("Triggers supplied event on elements in collection.\n\t\t\t\t");
				span56 = element("span");
				t686 = space();
				div318 = element("div");
				div317 = element("div");
				div316 = element("div");
				t687 = text("\n\t\t\t\t\ttrg (trigger)");
				t688 = space();
				create_component(sqi57.$$.fragment);
				attr_dev(link0, "rel", "stylesheet");
				attr_dev(link0, "href", "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-tomorrow.min.css");
				add_location(link0, file$3, 39, 1, 902);
				if (!src_url_equal(script.src, script_src_value = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js")) attr_dev(script, "src", script_src_value);
				add_location(script, file$3, 40, 1, 1016);
				attr_dev(link1, "rel", "stylesheet");
				attr_dev(link1, "href", "./Docs.css");
				add_location(link1, file$3, 41, 1, 1106);
				attr_dev(span0, "id", "idDocNav");
				add_location(span0, file$3, 43, 2, 1173);
				attr_dev(a0, "href", "https://squery-vercel-app.translate.goog/?&_x_tr_sl=auto&_x_tr_tl=ja&_x_tr_hl=en&_x_tr_pto=wapp#/docs");
				set_style(a0, "color", "#fff", 1);
				add_location(a0, file$3, 44, 45, 1246);
				set_style(div0, "float", "right");
				set_style(div0, "margin-right", "20px");
				add_location(div0, file$3, 44, 2, 1203);
				attr_dev(section0, "id", "idHead");
				add_location(section0, file$3, 42, 1, 1149);
				attr_dev(a1, "href", "./");
				set_style(a1, "color", "#fff");
				add_location(a1, file$3, 49, 44, 1513);
				attr_dev(div1, "id", "idLeftLogo");
				attr_dev(div1, "class", "notranslate");
				add_location(div1, file$3, 49, 3, 1472);
				add_location(hr, file$3, 52, 4, 1605);
				attr_dev(input, "id", "idDS");
				attr_dev(input, "type", "text");
				attr_dev(input, "placeholder", "search docs");
				attr_dev(input, "autocorrect", "off");
				attr_dev(input, "autocapitalize", "off");
				attr_dev(input, "spellcheck", "false");
				add_location(input, file$3, 54, 5, 1651);
				attr_dev(div2, "id", "idDSC");
				add_location(div2, file$3, 55, 5, 1770);
				set_style(div3, "position", "relative");
				add_location(div3, file$3, 53, 4, 1614);
				attr_dev(div4, "id", "idLeftSearchCont");
				add_location(div4, file$3, 51, 3, 1573);
				attr_dev(section1, "id", "idLeftTop");
				add_location(section1, file$3, 48, 2, 1444);
				attr_dev(div5, "name", "");
				attr_dev(div5, "class", "cSub");
				add_location(div5, file$3, 62, 4, 1904);
				attr_dev(div6, "name", "Installation");
				attr_dev(div6, "class", "cF");
				add_location(div6, file$3, 63, 4, 1956);
				attr_dev(div7, "name", "Difference_between_jQuery");
				attr_dev(div7, "class", "cF");
				add_location(div7, file$3, 64, 4, 2016);
				attr_dev(div8, "name", "Use_with_jQuery");
				attr_dev(div8, "class", "cF");
				add_location(div8, file$3, 65, 4, 2102);
				attr_dev(div9, "name", "Use_with_React");
				attr_dev(div9, "class", "cF");
				add_location(div9, file$3, 66, 4, 2168);
				attr_dev(div10, "name", "Use_with_Vue");
				attr_dev(div10, "class", "cF");
				add_location(div10, file$3, 67, 4, 2232);
				attr_dev(div11, "name", "Use_with_Svelte");
				attr_dev(div11, "class", "cF");
				add_location(div11, file$3, 68, 4, 2295);
				attr_dev(div12, "name", "Use_with_SolidJS");
				attr_dev(div12, "class", "cF");
				add_location(div12, file$3, 69, 4, 2361);
				attr_dev(div13, "name", "Use_with_Angular");
				attr_dev(div13, "class", "cF");
				add_location(div13, file$3, 70, 4, 2429);
				set_style(div14, "font-weight", "300");
				add_location(div14, file$3, 61, 3, 1870);
				attr_dev(div15, "name", "");
				attr_dev(div15, "class", "cSub");
				add_location(div15, file$3, 73, 3, 2508);
				attr_dev(div16, "name", "filter-not");
				attr_dev(div16, "class", "cF notranslate");
				add_location(div16, file$3, 74, 3, 2558);
				attr_dev(div17, "name", "eq");
				attr_dev(div17, "class", "cF notranslate");
				add_location(div17, file$3, 75, 3, 2626);
				attr_dev(div18, "name", "first-last");
				attr_dev(div18, "class", "cF notranslate");
				add_location(div18, file$3, 76, 3, 2676);
				attr_dev(div19, "name", "has");
				attr_dev(div19, "class", "cF notranslate");
				add_location(div19, file$3, 77, 3, 2744);
				attr_dev(div20, "name", "contains");
				attr_dev(div20, "class", "cF notranslate");
				add_location(div20, file$3, 78, 3, 2796);
				attr_dev(div21, "name", "slice");
				attr_dev(div21, "class", "cF notranslate");
				add_location(div21, file$3, 79, 3, 2858);
				attr_dev(div22, "name", "index");
				attr_dev(div22, "class", "cF notranslate");
				add_location(div22, file$3, 80, 3, 2914);
				attr_dev(div23, "name", "is");
				attr_dev(div23, "class", "cF notranslate");
				add_location(div23, file$3, 81, 3, 2970);
				attr_dev(div24, "name", "");
				attr_dev(div24, "class", "cSub");
				add_location(div24, file$3, 83, 3, 3022);
				attr_dev(div25, "name", "find");
				attr_dev(div25, "class", "cF notranslate");
				add_location(div25, file$3, 84, 3, 3072);
				attr_dev(div26, "name", "children");
				attr_dev(div26, "class", "cF notranslate");
				add_location(div26, file$3, 85, 3, 3126);
				attr_dev(div27, "name", "");
				attr_dev(div27, "class", "cSub");
				add_location(div27, file$3, 87, 3, 3190);
				attr_dev(div28, "name", "next-prev");
				attr_dev(div28, "class", "cF notranslate");
				add_location(div28, file$3, 88, 3, 3242);
				attr_dev(div29, "name", "siblings");
				attr_dev(div29, "class", "cF notranslate");
				add_location(div29, file$3, 89, 3, 3308);
				attr_dev(div30, "class", "cSub");
				add_location(div30, file$3, 91, 3, 3372);
				attr_dev(div31, "name", "parent-parents");
				attr_dev(div31, "class", "cF notranslate");
				add_location(div31, file$3, 92, 3, 3415);
				attr_dev(div32, "name", "closest");
				attr_dev(div32, "class", "cF notranslate");
				add_location(div32, file$3, 93, 3, 3491);
				attr_dev(div33, "name", "");
				attr_dev(div33, "class", "cSub");
				add_location(div33, file$3, 95, 3, 3552);
				attr_dev(div34, "name", "hasClass");
				attr_dev(div34, "class", "cF notranslate");
				add_location(div34, file$3, 96, 3, 3602);
				attr_dev(div35, "name", "");
				attr_dev(div35, "class", "cSub");
				add_location(div35, file$3, 98, 3, 3668);
				attr_dev(div36, "name", "html");
				attr_dev(div36, "class", "cF notranslate");
				add_location(div36, file$3, 99, 3, 3714);
				attr_dev(div37, "name", "text");
				attr_dev(div37, "class", "cF notranslate");
				add_location(div37, file$3, 100, 3, 3768);
				attr_dev(div38, "name", "val");
				attr_dev(div38, "class", "cF notranslate");
				add_location(div38, file$3, 101, 3, 3822);
				attr_dev(div39, "name", "css");
				attr_dev(div39, "class", "cF notranslate");
				add_location(div39, file$3, 102, 3, 3874);
				attr_dev(div40, "name", "attr");
				attr_dev(div40, "class", "cF notranslate");
				add_location(div40, file$3, 103, 3, 3926);
				attr_dev(div41, "name", "prop");
				attr_dev(div41, "class", "cF notranslate");
				add_location(div41, file$3, 104, 3, 3980);
				attr_dev(div42, "name", "get");
				attr_dev(div42, "class", "cF notranslate");
				add_location(div42, file$3, 105, 3, 4034);
				attr_dev(div43, "name", "show-hide");
				attr_dev(div43, "class", "cF notranslate");
				add_location(div43, file$3, 106, 3, 4086);
				attr_dev(div44, "name", "remove");
				attr_dev(div44, "class", "cF notranslate");
				add_location(div44, file$3, 107, 3, 4152);
				attr_dev(div45, "name", "before-after");
				attr_dev(div45, "class", "cF notranslate");
				add_location(div45, file$3, 108, 3, 4210);
				attr_dev(div46, "name", "prepend-append");
				attr_dev(div46, "class", "cF notranslate");
				add_location(div46, file$3, 109, 3, 4282);
				attr_dev(div47, "name", "replaceWith");
				attr_dev(div47, "class", "cF notranslate");
				add_location(div47, file$3, 110, 3, 4358);
				attr_dev(div48, "name", "addClass-removeClass");
				attr_dev(div48, "class", "cF notranslate");
				add_location(div48, file$3, 111, 3, 4426);
				attr_dev(div49, "name", "toggleClass");
				attr_dev(div49, "class", "cF notranslate");
				add_location(div49, file$3, 112, 3, 4514);
				attr_dev(div50, "name", "");
				attr_dev(div50, "class", "cSub");
				add_location(div50, file$3, 114, 3, 4583);
				attr_dev(div51, "name", "width-height");
				attr_dev(div51, "class", "cF notranslate");
				add_location(div51, file$3, 115, 3, 4634);
				attr_dev(div52, "name", "innerWidth-innerHeight");
				attr_dev(div52, "class", "cF notranslate");
				add_location(div52, file$3, 116, 3, 4706);
				attr_dev(div53, "name", "outerWidth-outerHeight");
				attr_dev(div53, "class", "cF notranslate");
				add_location(div53, file$3, 117, 3, 4798);
				attr_dev(div54, "name", "offset");
				attr_dev(div54, "class", "cF notranslate");
				add_location(div54, file$3, 118, 3, 4890);
				attr_dev(div55, "name", "pos-position");
				attr_dev(div55, "class", "cF notranslate");
				add_location(div55, file$3, 119, 3, 4948);
				attr_dev(div56, "name", "");
				attr_dev(div56, "class", "cSub");
				add_location(div56, file$3, 121, 3, 5024);
				attr_dev(div57, "name", "fadeIn-fadeOut");
				attr_dev(div57, "class", "cF notranslate");
				add_location(div57, file$3, 122, 3, 5070);
				attr_dev(div58, "name", "animate");
				attr_dev(div58, "class", "cF notranslate");
				add_location(div58, file$3, 123, 3, 5146);
				attr_dev(div59, "name", "scroll");
				attr_dev(div59, "class", "cF notranslate");
				add_location(div59, file$3, 124, 3, 5206);
				attr_dev(div60, "name", "scrollTop-scrollLeft");
				attr_dev(div60, "class", "cF notranslate");
				add_location(div60, file$3, 125, 3, 5264);
				attr_dev(div61, "name", "scrollToElement");
				attr_dev(div61, "class", "cF notranslate");
				add_location(div61, file$3, 126, 3, 5352);
				attr_dev(div62, "name", "");
				attr_dev(div62, "class", "cSub");
				add_location(div62, file$3, 128, 3, 5429);
				attr_dev(div63, "name", "each");
				attr_dev(div63, "class", "cF notranslate");
				add_location(div63, file$3, 129, 3, 5470);
				attr_dev(div64, "name", "");
				attr_dev(div64, "class", "cSub");
				add_location(div64, file$3, 131, 3, 5525);
				attr_dev(div65, "name", "on-off-onf");
				attr_dev(div65, "class", "cF notranslate");
				add_location(div65, file$3, 132, 3, 5567);
				attr_dev(div66, "name", "trg-trigger");
				attr_dev(div66, "class", "cF notranslate");
				add_location(div66, file$3, 133, 3, 5637);
				add_location(br0, file$3, 135, 3, 5708);
				add_location(br1, file$3, 135, 7, 5712);
				add_location(br2, file$3, 135, 11, 5716);
				add_location(br3, file$3, 135, 15, 5720);
				add_location(br4, file$3, 135, 19, 5724);
				add_location(br5, file$3, 135, 23, 5728);
				add_location(br6, file$3, 135, 27, 5732);
				add_location(br7, file$3, 135, 31, 5736);
				attr_dev(section2, "class", "cScrollable");
				add_location(section2, file$3, 60, 2, 1837);
				attr_dev(section3, "id", "idLeft");
				add_location(section3, file$3, 47, 1, 1420);
				add_location(span1, file$3, 140, 28, 5797);
				attr_dev(div67, "class", "menu__toggler");
				add_location(div67, file$3, 140, 1, 5770);
				add_location(div68, file$3, 143, 76, 5916);
				attr_dev(span2, "onclick", "location.href='./';");
				set_style(span2, "cursor", "pointer");
				add_location(span2, file$3, 143, 6, 5846);
				add_location(h1, file$3, 143, 2, 5842);
				add_location(h20, file$3, 146, 3, 5978);
				attr_dev(a2, "href", "https://github.com/exis9/sQuery/archive/refs/heads/main.zip");
				attr_dev(a2, "target", "_blank");
				set_style(a2, "font-size", "18px");
				add_location(a2, file$3, 148, 13, 6039);
				attr_dev(a3, "href", "https://github.com/exis9/sQuery");
				attr_dev(a3, "target", "_blank");
				add_location(a3, file$3, 148, 148, 6174);
				attr_dev(div69, "class", "cPreDesc");
				add_location(div69, file$3, 147, 3, 6003);
				attr_dev(div70, "class", "cBack");
				add_location(div70, file$3, 152, 5, 6297);
				add_location(small0, file$3, 153, 66, 6389);
				attr_dev(div71, "class", "cDesc");
				add_location(div71, file$3, 151, 4, 6272);
				add_location(div72, file$3, 150, 3, 6262);
				attr_dev(div73, "class", "cBack");
				add_location(div73, file$3, 158, 23, 6573);
				attr_dev(div74, "class", "cDesc");
				add_location(div74, file$3, 158, 4, 6554);
				set_style(div75, "margin-top", "30px");
				add_location(div75, file$3, 157, 3, 6520);
				attr_dev(div76, "class", "cBack");
				add_location(div76, file$3, 162, 23, 6735);
				attr_dev(a4, "href", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions");
				attr_dev(a4, "target", "_blank");
				add_location(a4, file$3, 162, 114, 6826);
				add_location(small1, file$3, 162, 78, 6790);
				attr_dev(div77, "class", "cDesc");
				add_location(div77, file$3, 162, 4, 6716);
				set_style(div78, "margin-top", "30px");
				add_location(div78, file$3, 161, 3, 6682);
				attr_dev(div79, "class", "cBack");
				add_location(div79, file$3, 166, 23, 7078);
				attr_dev(div80, "class", "cDesc");
				add_location(div80, file$3, 166, 4, 7059);
				set_style(div81, "margin-top", "30px");
				add_location(div81, file$3, 165, 3, 7025);
				attr_dev(doc0, "name", "Installation");
				add_location(doc0, file$3, 145, 2, 5949);
				add_location(h21, file$3, 172, 3, 7229);
				add_location(h30, file$3, 179, 6, 7498);
				add_location(br8, file$3, 181, 59, 7621);
				add_location(b0, file$3, 182, 21, 7647);
				attr_dev(a5, "href", "./?n=Use_with_jQuery#/docs");
				attr_dev(a5, "target", "_blank");
				add_location(a5, file$3, 182, 53, 7679);
				add_location(p0, file$3, 180, 6, 7558);
				attr_dev(div82, "class", "cAccr");
				add_location(div82, file$3, 178, 5, 7472);
				add_location(h31, file$3, 187, 6, 7810);
				add_location(b1, file$3, 189, 87, 7980);
				add_location(br9, file$3, 189, 114, 8007);
				attr_dev(a6, "href", "https://github.com/axios/axios");
				attr_dev(a6, "target", "_blank");
				add_location(a6, file$3, 190, 22, 8034);
				attr_dev(a7, "href", "https://www.javascripttutorial.net/javascript-fetch-api/");
				attr_dev(a7, "target", "_blank");
				add_location(a7, file$3, 190, 90, 8102);
				add_location(p1, file$3, 188, 6, 7889);
				attr_dev(div83, "class", "cAccr");
				add_location(div83, file$3, 186, 5, 7784);
				add_location(h32, file$3, 195, 6, 8276);
				add_location(br10, file$3, 198, 77, 8551);
				add_location(br11, file$3, 199, 77, 8633);
				add_location(br12, file$3, 200, 7, 8645);
				add_location(br13, file$3, 202, 66, 8727);
				add_location(br14, file$3, 203, 66, 8798);
				add_location(b2, file$3, 201, 7, 8657);
				add_location(p2, file$3, 196, 6, 8341);
				attr_dev(div84, "class", "cAccr");
				add_location(div84, file$3, 194, 5, 8250);
				add_location(h33, file$3, 210, 6, 8945);
				add_location(br15, file$3, 213, 7, 9104);
				add_location(br16, file$3, 213, 11, 9108);
				add_location(b3, file$3, 214, 7, 9120);
				add_location(br17, file$3, 214, 40, 9153);
				add_location(br18, file$3, 215, 7, 9165);
				add_location(br19, file$3, 216, 177, 9347);
				add_location(br20, file$3, 217, 7, 9359);
				add_location(br21, file$3, 219, 29, 9404);
				add_location(br22, file$3, 220, 23, 9432);
				add_location(b4, file$3, 218, 7, 9371);
				add_location(p3, file$3, 211, 6, 8986);
				attr_dev(div85, "class", "cAccr");
				add_location(div85, file$3, 209, 5, 8919);
				add_location(h34, file$3, 226, 6, 9504);
				add_location(br23, file$3, 228, 49, 9628);
				add_location(br24, file$3, 229, 56, 9689);
				add_location(b5, file$3, 230, 68, 9762);
				add_location(br25, file$3, 230, 148, 9842);
				add_location(br26, file$3, 231, 7, 9854);
				add_location(br27, file$3, 232, 113, 9972);
				add_location(br28, file$3, 233, 142, 10119);
				add_location(br29, file$3, 234, 127, 10251);
				add_location(br30, file$3, 235, 7, 10263);
				add_location(br31, file$3, 236, 74, 10342);
				add_location(br32, file$3, 237, 134, 10481);
				add_location(p4, file$3, 227, 6, 9575);
				attr_dev(div86, "class", "cAccr");
				add_location(div86, file$3, 225, 5, 9478);
				add_location(h35, file$3, 243, 6, 10739);
				add_location(small2, file$3, 245, 7, 10821);
				add_location(br33, file$3, 245, 113, 10927);
				add_location(p5, file$3, 244, 6, 10810);
				attr_dev(div87, "class", "cBack");
				add_location(div87, file$3, 251, 8, 11182);
				attr_dev(div88, "class", "cDesc");
				add_location(div88, file$3, 250, 7, 11154);
				add_location(div89, file$3, 249, 6, 11141);
				attr_dev(div90, "class", "cAccr");
				add_location(div90, file$3, 242, 5, 10713);
				set_style(div91, "margin-top", "10px");
				add_location(div91, file$3, 177, 4, 7436);
				attr_dev(div92, "class", "cPreDesc");
				add_location(div92, file$3, 173, 3, 7267);
				attr_dev(doc1, "name", "Difference_between_jQuery");
				add_location(doc1, file$3, 171, 2, 7187);
				add_location(h22, file$3, 263, 3, 11386);
				attr_dev(img0, "class", "cFWLogo");
				if (!src_url_equal(img0.src, img0_src_value = "img/jquery.png")) attr_dev(img0, "src", img0_src_value);
				attr_dev(img0, "alt", "jquery");
				attr_dev(img0, "title", "jquery");
				add_location(img0, file$3, 265, 4, 11441);
				add_location(br34, file$3, 266, 69, 11581);
				attr_dev(div93, "class", "cPreDesc");
				add_location(div93, file$3, 264, 3, 11414);
				attr_dev(div94, "class", "cBack");
				add_location(div94, file$3, 271, 5, 11695);
				attr_dev(div95, "class", "cDesc");
				add_location(div95, file$3, 270, 4, 11670);
				attr_dev(div96, "class", "cBack");
				add_location(div96, file$3, 277, 5, 11825);
				attr_dev(div97, "class", "cDesc");
				add_location(div97, file$3, 276, 4, 11800);
				add_location(div98, file$3, 269, 3, 11660);
				attr_dev(doc2, "name", "Use_with_jQuery");
				add_location(doc2, file$3, 262, 2, 11354);
				add_location(h23, file$3, 285, 3, 12002);
				attr_dev(a8, "class", "cFWLink");
				attr_dev(a8, "href", "/?n=Use_with_React#/install");
				attr_dev(a8, "target", "_blank");
				add_location(a8, file$3, 287, 8, 12060);
				add_location(br35, file$3, 287, 122, 12174);
				attr_dev(img1, "class", "cFWLogo");
				if (!src_url_equal(img1.src, img1_src_value = "img/react.png")) attr_dev(img1, "src", img1_src_value);
				attr_dev(img1, "alt", "React.js");
				attr_dev(img1, "title", "React.js");
				add_location(img1, file$3, 288, 4, 12183);
				add_location(h40, file$3, 290, 5, 12288);
				attr_dev(a9, "class", "cFWLink cBlueBack");
				attr_dev(a9, "href", "https://reactjs.org/");
				attr_dev(a9, "target", "_blank");
				add_location(a9, file$3, 291, 30, 12342);
				attr_dev(div99, "class", "cFWLinkCont");
				add_location(div99, file$3, 291, 5, 12317);
				add_location(br36, file$3, 292, 55, 12501);
				add_location(br37, file$3, 294, 75, 12788);
				add_location(br38, file$3, 296, 5, 12996);
				add_location(br39, file$3, 296, 9, 13000);
				attr_dev(a10, "class", "cFWLink cBlueBack");
				attr_dev(a10, "href", "https://nextjs.org/");
				attr_dev(a10, "target", "_blank");
				add_location(a10, file$3, 297, 19, 13024);
				attr_dev(div100, "class", "cFWDesc");
				add_location(div100, file$3, 289, 4, 12261);
				attr_dev(div101, "class", "cPreDesc");
				add_location(div101, file$3, 286, 3, 12029);
				attr_dev(doc3, "name", "Use_with_React");
				add_location(doc3, file$3, 284, 2, 11971);
				add_location(h24, file$3, 303, 3, 13222);
				attr_dev(a11, "class", "cFWLink");
				attr_dev(a11, "href", "/?n=Use_with_Vue#/install");
				attr_dev(a11, "target", "_blank");
				add_location(a11, file$3, 305, 8, 13281);
				add_location(br40, file$3, 305, 121, 13394);
				attr_dev(img2, "class", "cFWLogo");
				if (!src_url_equal(img2.src, img2_src_value = "img/vuejs.png")) attr_dev(img2, "src", img2_src_value);
				attr_dev(img2, "alt", "Vue.js");
				attr_dev(img2, "title", "Vue.js");
				add_location(img2, file$3, 306, 4, 13403);
				add_location(h41, file$3, 308, 5, 13504);
				attr_dev(a12, "class", "cFWLink cBlueBack");
				attr_dev(a12, "href", "https://reactjs.org/");
				attr_dev(a12, "target", "_blank");
				add_location(a12, file$3, 309, 30, 13559);
				attr_dev(div102, "class", "cFWLinkCont");
				add_location(div102, file$3, 309, 5, 13534);
				add_location(br41, file$3, 313, 5, 13976);
				add_location(br42, file$3, 313, 9, 13980);
				attr_dev(a13, "class", "cFWLink cBlueBack");
				attr_dev(a13, "href", "https://nuxtjs.org/");
				attr_dev(a13, "target", "_blank");
				add_location(a13, file$3, 314, 19, 14004);
				attr_dev(div103, "class", "cFWDesc");
				add_location(div103, file$3, 307, 4, 13477);
				attr_dev(div104, "class", "cPreDesc");
				add_location(div104, file$3, 304, 3, 13250);
				attr_dev(doc4, "name", "Use_with_Vue");
				add_location(doc4, file$3, 302, 2, 13193);
				add_location(h25, file$3, 320, 3, 14200);
				attr_dev(a14, "class", "cFWLink");
				attr_dev(a14, "href", "/?n=Use_with_Svelte#/install");
				attr_dev(a14, "target", "_blank");
				add_location(a14, file$3, 322, 8, 14259);
				add_location(br43, file$3, 322, 124, 14375);
				attr_dev(img3, "class", "cFWLogo");
				if (!src_url_equal(img3.src, img3_src_value = "img/svelte.png")) attr_dev(img3, "src", img3_src_value);
				attr_dev(img3, "alt", "Svelte");
				attr_dev(img3, "title", "Svelte");
				add_location(img3, file$3, 323, 4, 14384);
				add_location(h42, file$3, 325, 5, 14486);
				attr_dev(a15, "class", "cFWLink cBlueBack");
				attr_dev(a15, "href", "https://reactjs.org/");
				attr_dev(a15, "target", "_blank");
				add_location(a15, file$3, 326, 30, 14541);
				attr_dev(div105, "class", "cFWLinkCont");
				add_location(div105, file$3, 326, 5, 14516);
				add_location(br44, file$3, 328, 145, 15029);
				add_location(br45, file$3, 328, 149, 15033);
				add_location(br46, file$3, 329, 109, 15147);
				add_location(br47, file$3, 331, 5, 15217);
				add_location(br48, file$3, 331, 9, 15221);
				attr_dev(a16, "class", "cFWLink cBlueBack");
				attr_dev(a16, "href", "https://kit.svelte.dev/");
				attr_dev(a16, "target", "_blank");
				add_location(a16, file$3, 332, 68, 15294);
				attr_dev(div106, "class", "cFWDesc");
				add_location(div106, file$3, 324, 4, 14459);
				attr_dev(div107, "class", "cPreDesc");
				add_location(div107, file$3, 321, 3, 14228);
				attr_dev(doc5, "name", "Use_with_Svelte");
				add_location(doc5, file$3, 319, 2, 14168);
				add_location(h26, file$3, 338, 3, 15523);
				attr_dev(a17, "class", "cFWLink");
				attr_dev(a17, "href", "/?n=Use_with_SolidJS#/install");
				attr_dev(a17, "target", "_blank");
				add_location(a17, file$3, 340, 8, 15583);
				add_location(br49, file$3, 340, 126, 15701);
				attr_dev(img4, "class", "cFWLogo");
				if (!src_url_equal(img4.src, img4_src_value = "img/solidjs.jpg")) attr_dev(img4, "src", img4_src_value);
				attr_dev(img4, "alt", "SolidJS");
				attr_dev(img4, "title", "SolidJS");
				add_location(img4, file$3, 341, 4, 15710);
				add_location(h43, file$3, 343, 5, 15815);
				attr_dev(a18, "class", "cFWLink cBlueBack");
				attr_dev(a18, "href", "https://reactjs.org/");
				attr_dev(a18, "target", "_blank");
				add_location(a18, file$3, 344, 30, 15871);
				attr_dev(div108, "class", "cFWLinkCont");
				add_location(div108, file$3, 344, 5, 15846);
				add_location(br50, file$3, 345, 91, 16065);
				add_location(br51, file$3, 347, 215, 16633);
				add_location(br52, file$3, 347, 219, 16637);
				add_location(br53, file$3, 349, 5, 16744);
				add_location(br54, file$3, 349, 9, 16748);
				attr_dev(a19, "class", "cFWLink cBlueBack");
				attr_dev(a19, "href", "https://www.solidjs.com/guides/server");
				attr_dev(a19, "target", "_blank");
				add_location(a19, file$3, 350, 24, 16777);
				attr_dev(div109, "class", "cFWDesc");
				add_location(div109, file$3, 342, 4, 15788);
				attr_dev(div110, "class", "cPreDesc");
				add_location(div110, file$3, 339, 3, 15552);
				attr_dev(doc6, "name", "Use_with_SolidJS");
				add_location(doc6, file$3, 337, 2, 15490);
				add_location(h27, file$3, 356, 3, 16975);
				attr_dev(a20, "class", "cFWLink");
				attr_dev(a20, "href", "/?n=Use_with_Angular#/install");
				attr_dev(a20, "target", "_blank");
				add_location(a20, file$3, 358, 8, 17035);
				add_location(br55, file$3, 358, 126, 17153);
				attr_dev(img5, "class", "cFWLogo");
				if (!src_url_equal(img5.src, img5_src_value = "img/angular.png")) attr_dev(img5, "src", img5_src_value);
				attr_dev(img5, "alt", "Angular");
				attr_dev(img5, "title", "Angular");
				add_location(img5, file$3, 359, 4, 17162);
				add_location(h44, file$3, 361, 5, 17267);
				attr_dev(a21, "class", "cFWLink cBlueBack");
				attr_dev(a21, "href", "https://reactjs.org/");
				attr_dev(a21, "target", "_blank");
				add_location(a21, file$3, 362, 30, 17323);
				attr_dev(div111, "class", "cFWLinkCont");
				add_location(div111, file$3, 362, 5, 17298);
				add_location(br56, file$3, 363, 76, 17502);
				attr_dev(div112, "class", "cFWDesc");
				add_location(div112, file$3, 360, 4, 17240);
				attr_dev(div113, "class", "cPreDesc");
				add_location(div113, file$3, 357, 3, 17004);
				attr_dev(doc7, "name", "Use_with_Angular");
				add_location(doc7, file$3, 355, 2, 16942);
				attr_dev(h28, "class", "notranslate");
				add_location(h28, file$3, 372, 3, 17737);
				attr_dev(span3, "class", "cJQVer");
				attr_dev(span3, "v", "filter");
				add_location(span3, file$3, 375, 4, 17919);
				attr_dev(div114, "class", "cPreDesc");
				add_location(div114, file$3, 373, 3, 17782);
				attr_dev(div115, "class", "cBack");
				add_location(div115, file$3, 379, 5, 18007);
				attr_dev(div116, "class", "cDesc");
				add_location(div116, file$3, 378, 4, 17982);
				add_location(div117, file$3, 377, 3, 17972);
				add_location(br57, file$3, 386, 4, 18150);
				attr_dev(span4, "class", "cJQVer");
				attr_dev(span4, "v", "not");
				add_location(span4, file$3, 388, 4, 18251);
				attr_dev(div118, "class", "cPreDesc");
				add_location(div118, file$3, 385, 3, 18123);
				attr_dev(div119, "class", "cBack");
				add_location(div119, file$3, 392, 5, 18336);
				attr_dev(div120, "class", "cDesc");
				add_location(div120, file$3, 391, 4, 18311);
				add_location(div121, file$3, 390, 3, 18301);
				attr_dev(doc8, "name", "filter-not");
				add_location(doc8, file$3, 371, 2, 17710);
				attr_dev(h29, "class", "notranslate");
				add_location(h29, file$3, 400, 3, 18488);
				attr_dev(span5, "class", "cJQVer");
				attr_dev(span5, "v", "eq");
				add_location(span5, file$3, 403, 4, 18625);
				attr_dev(div122, "class", "cPreDesc");
				add_location(div122, file$3, 401, 3, 18523);
				attr_dev(div123, "class", "cBack");
				add_location(div123, file$3, 407, 5, 18709);
				attr_dev(div124, "class", "cDesc");
				add_location(div124, file$3, 406, 4, 18684);
				add_location(div125, file$3, 405, 3, 18674);
				add_location(br58, file$3, 414, 4, 18908);
				attr_dev(div126, "class", "cPreDesc");
				add_location(div126, file$3, 413, 3, 18881);
				attr_dev(div127, "class", "cBack");
				add_location(div127, file$3, 419, 5, 19051);
				attr_dev(div128, "class", "cDesc");
				add_location(div128, file$3, 418, 4, 19026);
				add_location(div129, file$3, 417, 3, 19016);
				attr_dev(doc9, "name", "eq");
				add_location(doc9, file$3, 399, 2, 18469);
				attr_dev(h210, "class", "notranslate");
				add_location(h210, file$3, 427, 3, 19304);
				attr_dev(span6, "class", "cJQVer");
				attr_dev(span6, "v", "first");
				add_location(span6, file$3, 430, 4, 19448);
				attr_dev(div130, "class", "cPreDesc");
				add_location(div130, file$3, 428, 3, 19349);
				attr_dev(div131, "class", "cBack");
				add_location(div131, file$3, 434, 5, 19535);
				attr_dev(div132, "class", "cDesc");
				add_location(div132, file$3, 433, 4, 19510);
				add_location(div133, file$3, 432, 3, 19500);
				add_location(br59, file$3, 441, 4, 19663);
				attr_dev(span7, "class", "cJQVer");
				attr_dev(span7, "v", "last");
				add_location(span7, file$3, 443, 4, 19742);
				attr_dev(div134, "class", "cPreDesc");
				add_location(div134, file$3, 440, 3, 19636);
				attr_dev(div135, "class", "cBack");
				add_location(div135, file$3, 447, 5, 19828);
				attr_dev(div136, "class", "cDesc");
				add_location(div136, file$3, 446, 4, 19803);
				add_location(div137, file$3, 445, 3, 19793);
				attr_dev(doc10, "name", "first-last");
				add_location(doc10, file$3, 426, 2, 19277);
				attr_dev(h211, "class", "notranslate");
				add_location(h211, file$3, 456, 3, 19958);
				attr_dev(span8, "class", "cJQVer");
				attr_dev(span8, "v", "has");
				add_location(span8, file$3, 459, 4, 20097);
				attr_dev(div138, "class", "cPreDesc");
				add_location(div138, file$3, 457, 3, 19994);
				attr_dev(div139, "class", "cBack");
				add_location(div139, file$3, 463, 5, 20182);
				attr_dev(div140, "class", "cDesc");
				add_location(div140, file$3, 462, 4, 20157);
				add_location(div141, file$3, 461, 3, 20147);
				attr_dev(doc11, "name", "has");
				add_location(doc11, file$3, 455, 2, 19938);
				attr_dev(h212, "class", "notranslate");
				add_location(h212, file$3, 472, 3, 20313);
				attr_dev(span9, "class", "cJQVer");
				attr_dev(span9, "v", "contains");
				add_location(span9, file$3, 475, 4, 20438);
				attr_dev(div142, "class", "cPreDesc");
				add_location(div142, file$3, 473, 3, 20354);
				attr_dev(div143, "class", "cBack");
				add_location(div143, file$3, 479, 5, 20528);
				attr_dev(div144, "class", "cDesc");
				add_location(div144, file$3, 478, 4, 20503);
				add_location(div145, file$3, 477, 3, 20493);
				attr_dev(doc12, "name", "contains");
				add_location(doc12, file$3, 471, 2, 20288);
				attr_dev(h213, "class", "notranslate");
				add_location(h213, file$3, 489, 3, 20667);
				attr_dev(span10, "class", "cJQVer");
				attr_dev(span10, "v", "slice");
				add_location(span10, file$3, 492, 4, 20816);
				attr_dev(div146, "class", "cPreDesc");
				add_location(div146, file$3, 490, 3, 20705);
				attr_dev(div147, "class", "cBack");
				add_location(div147, file$3, 496, 5, 20903);
				attr_dev(div148, "class", "cDesc");
				add_location(div148, file$3, 495, 4, 20878);
				add_location(div149, file$3, 494, 3, 20868);
				attr_dev(doc13, "name", "slice");
				add_location(doc13, file$3, 488, 2, 20645);
				attr_dev(h214, "class", "notranslate");
				add_location(h214, file$3, 506, 3, 21036);
				attr_dev(span11, "class", "cJQVer");
				attr_dev(span11, "v", "index");
				add_location(span11, file$3, 509, 4, 21152);
				attr_dev(div150, "class", "cPreDesc");
				add_location(div150, file$3, 507, 3, 21074);
				attr_dev(div151, "class", "cBack");
				add_location(div151, file$3, 513, 5, 21239);
				attr_dev(div152, "class", "cDesc");
				add_location(div152, file$3, 512, 4, 21214);
				add_location(div153, file$3, 511, 3, 21204);
				attr_dev(doc14, "name", "index");
				add_location(doc14, file$3, 505, 2, 21014);
				attr_dev(h215, "class", "notranslate");
				add_location(h215, file$3, 523, 3, 21369);
				attr_dev(span12, "class", "cJQVer");
				attr_dev(span12, "v", "is");
				add_location(span12, file$3, 526, 4, 21518);
				attr_dev(div154, "class", "cPreDesc");
				add_location(div154, file$3, 524, 3, 21404);
				attr_dev(div155, "class", "cBack");
				add_location(div155, file$3, 530, 5, 21602);
				attr_dev(div156, "class", "cDesc");
				add_location(div156, file$3, 529, 4, 21577);
				add_location(div157, file$3, 528, 3, 21567);
				attr_dev(doc15, "name", "is");
				add_location(doc15, file$3, 522, 2, 21350);
				attr_dev(h216, "class", "notranslate");
				add_location(h216, file$3, 540, 3, 21741);
				attr_dev(span13, "class", "cJQVer");
				attr_dev(span13, "v", "find");
				add_location(span13, file$3, 543, 4, 21886);
				attr_dev(div158, "class", "cPreDesc");
				add_location(div158, file$3, 541, 3, 21778);
				attr_dev(div159, "class", "cBack");
				add_location(div159, file$3, 547, 5, 21972);
				attr_dev(div160, "class", "cDesc");
				add_location(div160, file$3, 546, 4, 21947);
				add_location(div161, file$3, 545, 3, 21937);
				attr_dev(doc16, "name", "find");
				add_location(doc16, file$3, 539, 2, 21720);
				attr_dev(h217, "class", "notranslate");
				add_location(h217, file$3, 557, 3, 22119);
				attr_dev(span14, "class", "cJQVer");
				attr_dev(span14, "v", "children");
				add_location(span14, file$3, 560, 4, 22230);
				attr_dev(div162, "class", "cPreDesc");
				add_location(div162, file$3, 558, 3, 22160);
				attr_dev(div163, "class", "cBack");
				add_location(div163, file$3, 564, 5, 22320);
				attr_dev(div164, "class", "cDesc");
				add_location(div164, file$3, 563, 4, 22295);
				add_location(div165, file$3, 562, 3, 22285);
				attr_dev(doc17, "name", "children");
				add_location(doc17, file$3, 556, 2, 22094);
				attr_dev(h218, "class", "notranslate");
				add_location(h218, file$3, 574, 3, 22476);
				attr_dev(span15, "class", "cJQVer");
				attr_dev(span15, "v", "next");
				add_location(span15, file$3, 577, 4, 22578);
				attr_dev(div166, "class", "cPreDesc");
				add_location(div166, file$3, 575, 3, 22520);
				attr_dev(div167, "class", "cBack");
				add_location(div167, file$3, 581, 5, 22664);
				attr_dev(div168, "class", "cDesc");
				add_location(div168, file$3, 580, 4, 22639);
				add_location(div169, file$3, 579, 3, 22629);
				add_location(br60, file$3, 588, 4, 22790);
				attr_dev(span16, "class", "cJQVer");
				attr_dev(span16, "v", "prev");
				add_location(span16, file$3, 590, 4, 22848);
				attr_dev(div170, "class", "cPreDesc");
				add_location(div170, file$3, 587, 3, 22763);
				attr_dev(div171, "class", "cBack");
				add_location(div171, file$3, 594, 5, 22934);
				attr_dev(div172, "class", "cDesc");
				add_location(div172, file$3, 593, 4, 22909);
				add_location(div173, file$3, 592, 3, 22899);
				attr_dev(doc18, "name", "next-prev");
				add_location(doc18, file$3, 573, 2, 22450);
				attr_dev(h219, "class", "notranslate");
				add_location(h219, file$3, 604, 3, 23068);
				attr_dev(span17, "class", "cJQVer");
				attr_dev(span17, "v", "siblings");
				add_location(span17, file$3, 607, 4, 23182);
				attr_dev(div174, "class", "cPreDesc");
				add_location(div174, file$3, 605, 3, 23109);
				attr_dev(div175, "class", "cBack");
				add_location(div175, file$3, 611, 5, 23272);
				attr_dev(div176, "class", "cDesc");
				add_location(div176, file$3, 610, 4, 23247);
				add_location(div177, file$3, 609, 3, 23237);
				attr_dev(doc19, "name", "siblings");
				add_location(doc19, file$3, 603, 2, 23043);
				attr_dev(h220, "class", "notranslate");
				add_location(h220, file$3, 621, 3, 23420);
				attr_dev(span18, "class", "cJQVer");
				attr_dev(span18, "v", "parent");
				add_location(span18, file$3, 624, 4, 23532);
				attr_dev(div178, "class", "cPreDesc");
				add_location(div178, file$3, 622, 3, 23469);
				attr_dev(div179, "class", "cBack");
				add_location(div179, file$3, 628, 5, 23620);
				attr_dev(div180, "class", "cDesc");
				add_location(div180, file$3, 627, 4, 23595);
				add_location(div181, file$3, 626, 3, 23585);
				add_location(br61, file$3, 635, 4, 23750);
				attr_dev(span19, "class", "cJQVer");
				attr_dev(span19, "v", "parents");
				add_location(span19, file$3, 637, 4, 23810);
				attr_dev(div182, "class", "cPreDesc");
				add_location(div182, file$3, 634, 3, 23723);
				attr_dev(div183, "class", "cBack");
				add_location(div183, file$3, 641, 5, 23899);
				attr_dev(div184, "class", "cDesc");
				add_location(div184, file$3, 640, 4, 23874);
				add_location(div185, file$3, 639, 3, 23864);
				attr_dev(doc20, "name", "parent-parents");
				add_location(doc20, file$3, 620, 2, 23389);
				attr_dev(h221, "class", "notranslate");
				add_location(h221, file$3, 651, 3, 24038);
				attr_dev(span20, "class", "cJQVer");
				attr_dev(span20, "v", "closest");
				add_location(span20, file$3, 654, 4, 24164);
				attr_dev(div186, "class", "cPreDesc");
				add_location(div186, file$3, 652, 3, 24078);
				attr_dev(div187, "class", "cBack");
				add_location(div187, file$3, 658, 5, 24253);
				attr_dev(div188, "class", "cDesc");
				add_location(div188, file$3, 657, 4, 24228);
				add_location(div189, file$3, 656, 3, 24218);
				attr_dev(doc21, "name", "closest");
				add_location(doc21, file$3, 650, 2, 24014);
				attr_dev(h222, "class", "notranslate");
				add_location(h222, file$3, 668, 3, 24393);
				attr_dev(span21, "class", "cJQVer");
				attr_dev(span21, "v", "hasClass");
				add_location(span21, file$3, 671, 4, 24572);
				attr_dev(div190, "class", "cPreDesc");
				add_location(div190, file$3, 669, 3, 24434);
				attr_dev(div191, "class", "cBack");
				add_location(div191, file$3, 675, 5, 24662);
				attr_dev(div192, "class", "cDesc");
				add_location(div192, file$3, 674, 4, 24637);
				add_location(div193, file$3, 673, 3, 24627);
				attr_dev(doc22, "name", "hasClass");
				add_location(doc22, file$3, 667, 2, 24368);
				attr_dev(h223, "class", "notranslate");
				add_location(h223, file$3, 700, 3, 25173);
				attr_dev(span22, "class", "cJQVer");
				attr_dev(span22, "v", "html");
				add_location(span22, file$3, 703, 4, 25330);
				attr_dev(div194, "class", "cPreDesc");
				add_location(div194, file$3, 701, 3, 25210);
				attr_dev(div195, "class", "cBack");
				add_location(div195, file$3, 707, 5, 25416);
				attr_dev(div196, "class", "cDesc");
				add_location(div196, file$3, 706, 4, 25391);
				add_location(div197, file$3, 705, 3, 25381);
				attr_dev(doc23, "name", "html");
				add_location(doc23, file$3, 699, 2, 25152);
				attr_dev(h224, "class", "notranslate");
				add_location(h224, file$3, 717, 3, 25546);
				attr_dev(span23, "class", "cJQVer");
				attr_dev(span23, "v", "text");
				add_location(span23, file$3, 720, 4, 25719);
				attr_dev(div198, "class", "cPreDesc");
				add_location(div198, file$3, 718, 3, 25583);
				attr_dev(div199, "class", "cBack");
				add_location(div199, file$3, 724, 5, 25805);
				attr_dev(div200, "class", "cDesc");
				add_location(div200, file$3, 723, 4, 25780);
				add_location(div201, file$3, 722, 3, 25770);
				attr_dev(doc24, "name", "text");
				add_location(doc24, file$3, 716, 2, 25525);
				attr_dev(h225, "class", "notranslate");
				add_location(h225, file$3, 734, 3, 25934);
				attr_dev(span24, "class", "cJQVer");
				attr_dev(span24, "v", "val");
				add_location(span24, file$3, 737, 4, 26109);
				attr_dev(div202, "class", "cPreDesc");
				add_location(div202, file$3, 735, 3, 25970);
				attr_dev(div203, "class", "cBack");
				add_location(div203, file$3, 741, 5, 26194);
				attr_dev(div204, "class", "cDesc");
				add_location(div204, file$3, 740, 4, 26169);
				add_location(div205, file$3, 739, 3, 26159);
				attr_dev(doc25, "name", "val");
				add_location(doc25, file$3, 733, 2, 25914);
				attr_dev(h226, "class", "notranslate");
				add_location(h226, file$3, 751, 3, 26321);
				attr_dev(span25, "class", "cJQVer");
				attr_dev(span25, "v", "css");
				add_location(span25, file$3, 754, 4, 26563);
				attr_dev(div206, "class", "cPreDesc");
				add_location(div206, file$3, 752, 3, 26357);
				attr_dev(div207, "class", "cBack");
				add_location(div207, file$3, 758, 5, 26648);
				attr_dev(div208, "class", "cDesc");
				add_location(div208, file$3, 757, 4, 26623);
				add_location(div209, file$3, 756, 3, 26613);
				attr_dev(doc26, "name", "css");
				add_location(doc26, file$3, 750, 2, 26301);
				attr_dev(h227, "class", "notranslate");
				add_location(h227, file$3, 768, 3, 26823);
				attr_dev(span26, "class", "cJQVer");
				attr_dev(span26, "v", "attr");
				add_location(span26, file$3, 771, 4, 27054);
				attr_dev(div210, "class", "cPreDesc");
				add_location(div210, file$3, 769, 3, 26860);
				attr_dev(div211, "class", "cBack");
				add_location(div211, file$3, 775, 5, 27140);
				attr_dev(div212, "class", "cDesc");
				add_location(div212, file$3, 774, 4, 27115);
				add_location(div213, file$3, 773, 3, 27105);
				attr_dev(doc27, "name", "attr");
				add_location(doc27, file$3, 767, 2, 26802);
				attr_dev(h228, "class", "notranslate");
				add_location(h228, file$3, 785, 3, 27270);
				attr_dev(span27, "class", "cJQVer");
				attr_dev(span27, "v", "prop");
				add_location(span27, file$3, 788, 4, 27487);
				attr_dev(div214, "class", "cPreDesc");
				add_location(div214, file$3, 786, 3, 27307);
				attr_dev(div215, "class", "cBack");
				add_location(div215, file$3, 792, 5, 27573);
				attr_dev(div216, "class", "cDesc");
				add_location(div216, file$3, 791, 4, 27548);
				add_location(div217, file$3, 790, 3, 27538);
				attr_dev(doc28, "name", "prop");
				add_location(doc28, file$3, 784, 2, 27249);
				attr_dev(h229, "class", "notranslate");
				add_location(h229, file$3, 802, 3, 27702);
				attr_dev(span28, "class", "cJQVer");
				attr_dev(span28, "v", "get");
				add_location(span28, file$3, 805, 4, 27802);
				attr_dev(div218, "class", "cPreDesc");
				add_location(div218, file$3, 803, 3, 27738);
				attr_dev(div219, "class", "cBack");
				add_location(div219, file$3, 809, 5, 27887);
				attr_dev(div220, "class", "cDesc");
				add_location(div220, file$3, 808, 4, 27862);
				add_location(div221, file$3, 807, 3, 27852);
				attr_dev(doc29, "name", "get");
				add_location(doc29, file$3, 801, 2, 27682);
				attr_dev(h230, "class", "notranslate");
				add_location(h230, file$3, 819, 3, 28020);
				attr_dev(span29, "class", "cJQVer");
				attr_dev(span29, "v", "show");
				add_location(span29, file$3, 822, 4, 28130);
				add_location(br62, file$3, 823, 4, 28172);
				add_location(br63, file$3, 823, 8, 28176);
				attr_dev(span30, "class", "cJQVer");
				attr_dev(span30, "v", "hide");
				add_location(span30, file$3, 825, 4, 28224);
				attr_dev(div222, "class", "cPreDesc");
				add_location(div222, file$3, 820, 3, 28064);
				attr_dev(div223, "class", "cBack");
				add_location(div223, file$3, 829, 5, 28310);
				attr_dev(div224, "class", "cDesc");
				add_location(div224, file$3, 828, 4, 28285);
				add_location(div225, file$3, 827, 3, 28275);
				attr_dev(doc30, "name", "show-hide");
				add_location(doc30, file$3, 818, 2, 27994);
				attr_dev(h231, "class", "notranslate");
				add_location(h231, file$3, 839, 3, 28449);
				attr_dev(span31, "class", "cJQVer");
				attr_dev(span31, "v", "remove");
				add_location(span31, file$3, 842, 4, 28550);
				attr_dev(div226, "class", "cPreDesc");
				add_location(div226, file$3, 840, 3, 28488);
				attr_dev(div227, "class", "cBack");
				add_location(div227, file$3, 846, 5, 28638);
				attr_dev(div228, "class", "cDesc");
				add_location(div228, file$3, 845, 4, 28613);
				add_location(div229, file$3, 844, 3, 28603);
				attr_dev(doc31, "name", "remove");
				add_location(doc31, file$3, 838, 2, 28426);
				attr_dev(h232, "class", "notranslate");
				add_location(h232, file$3, 856, 3, 28780);
				attr_dev(span32, "class", "cJQVer");
				attr_dev(span32, "v", "before");
				add_location(span32, file$3, 859, 4, 28962);
				attr_dev(div230, "class", "cPreDesc");
				add_location(div230, file$3, 857, 3, 28827);
				attr_dev(div231, "class", "cBack");
				add_location(div231, file$3, 863, 5, 29050);
				attr_dev(div232, "class", "cDesc");
				add_location(div232, file$3, 862, 4, 29025);
				add_location(div233, file$3, 861, 3, 29015);
				add_location(br64, file$3, 870, 4, 29180);
				attr_dev(span33, "class", "cJQVer");
				attr_dev(span33, "v", "after");
				add_location(span33, file$3, 872, 4, 29295);
				attr_dev(div234, "class", "cPreDesc");
				add_location(div234, file$3, 869, 3, 29153);
				attr_dev(div235, "class", "cBack");
				add_location(div235, file$3, 876, 5, 29382);
				attr_dev(div236, "class", "cDesc");
				add_location(div236, file$3, 875, 4, 29357);
				add_location(div237, file$3, 874, 3, 29347);
				attr_dev(doc32, "name", "before-after");
				add_location(doc32, file$3, 855, 2, 28751);
				attr_dev(h233, "class", "notranslate");
				add_location(h233, file$3, 886, 3, 29524);
				attr_dev(span34, "class", "cJQVer");
				attr_dev(span34, "v", "prepend");
				add_location(span34, file$3, 889, 4, 29666);
				attr_dev(div238, "class", "cPreDesc");
				add_location(div238, file$3, 887, 3, 29573);
				attr_dev(div239, "class", "cBack");
				add_location(div239, file$3, 893, 5, 29755);
				attr_dev(div240, "class", "cDesc");
				add_location(div240, file$3, 892, 4, 29730);
				add_location(div241, file$3, 891, 3, 29720);
				add_location(br65, file$3, 900, 4, 29887);
				attr_dev(span35, "class", "cJQVer");
				attr_dev(span35, "v", "append");
				add_location(span35, file$3, 902, 4, 29975);
				attr_dev(div242, "class", "cPreDesc");
				add_location(div242, file$3, 899, 3, 29860);
				attr_dev(div243, "class", "cBack");
				add_location(div243, file$3, 906, 5, 30063);
				attr_dev(div244, "class", "cDesc");
				add_location(div244, file$3, 905, 4, 30038);
				add_location(div245, file$3, 904, 3, 30028);
				attr_dev(doc33, "name", "prepend-append");
				add_location(doc33, file$3, 885, 2, 29493);
				attr_dev(h234, "class", "notranslate");
				add_location(h234, file$3, 916, 3, 30204);
				attr_dev(span36, "class", "cJQVer");
				attr_dev(span36, "v", "replaceWith");
				add_location(span36, file$3, 919, 4, 30329);
				attr_dev(div246, "class", "cPreDesc");
				add_location(div246, file$3, 917, 3, 30248);
				attr_dev(div247, "class", "cBack");
				add_location(div247, file$3, 923, 5, 30422);
				attr_dev(div248, "class", "cDesc");
				add_location(div248, file$3, 922, 4, 30397);
				add_location(div249, file$3, 921, 3, 30387);
				attr_dev(doc34, "name", "replaceWith");
				add_location(doc34, file$3, 915, 2, 30176);
				attr_dev(h235, "class", "notranslate");
				add_location(h235, file$3, 933, 3, 30582);
				attr_dev(span37, "class", "cJQVer");
				attr_dev(span37, "v", "addClass");
				add_location(span37, file$3, 936, 4, 30751);
				add_location(br66, file$3, 937, 4, 30797);
				attr_dev(span38, "class", "cJQVer");
				attr_dev(span38, "v", "removeClass");
				add_location(span38, file$3, 939, 4, 30895);
				attr_dev(div250, "class", "cPreDesc");
				add_location(div250, file$3, 934, 3, 30637);
				attr_dev(div251, "class", "cBack");
				add_location(div251, file$3, 943, 5, 30988);
				attr_dev(div252, "class", "cDesc");
				add_location(div252, file$3, 942, 4, 30963);
				add_location(div253, file$3, 941, 3, 30953);
				attr_dev(doc35, "name", "addClass-removeClass");
				add_location(doc35, file$3, 932, 2, 30545);
				attr_dev(h236, "class", "notranslate");
				add_location(h236, file$3, 953, 3, 31147);
				attr_dev(span39, "class", "cJQVer");
				attr_dev(span39, "v", "toggleClass");
				add_location(span39, file$3, 956, 4, 31298);
				attr_dev(div254, "class", "cPreDesc");
				add_location(div254, file$3, 954, 3, 31191);
				attr_dev(div255, "class", "cBack");
				add_location(div255, file$3, 960, 5, 31391);
				attr_dev(div256, "class", "cDesc");
				add_location(div256, file$3, 959, 4, 31366);
				add_location(div257, file$3, 958, 3, 31356);
				attr_dev(doc36, "name", "toggleClass");
				add_location(doc36, file$3, 952, 2, 31119);
				attr_dev(h237, "class", "notranslate");
				add_location(h237, file$3, 970, 3, 31543);
				attr_dev(span40, "class", "cJQVer");
				attr_dev(span40, "v", "width");
				add_location(span40, file$3, 973, 4, 31755);
				add_location(br67, file$3, 974, 4, 31798);
				attr_dev(span41, "class", "cJQVer");
				attr_dev(span41, "v", "height");
				add_location(span41, file$3, 976, 4, 31947);
				attr_dev(div258, "class", "cPreDesc");
				add_location(div258, file$3, 971, 3, 31590);
				attr_dev(div259, "class", "cBack");
				add_location(div259, file$3, 980, 5, 32035);
				attr_dev(div260, "class", "cDesc");
				add_location(div260, file$3, 979, 4, 32010);
				add_location(div261, file$3, 978, 3, 32000);
				attr_dev(doc37, "name", "width-height");
				add_location(doc37, file$3, 969, 2, 31514);
				attr_dev(h238, "class", "notranslate");
				add_location(h238, file$3, 990, 3, 32194);
				add_location(b6, file$3, 992, 54, 32328);
				attr_dev(span42, "class", "cJQVer");
				attr_dev(span42, "v", "innerWidth");
				add_location(span42, file$3, 993, 4, 32475);
				add_location(br68, file$3, 994, 4, 32523);
				add_location(b7, file$3, 995, 56, 32584);
				attr_dev(span43, "class", "cJQVer");
				attr_dev(span43, "v", "innerHeight");
				add_location(span43, file$3, 996, 4, 32732);
				attr_dev(div262, "class", "cPreDesc");
				add_location(div262, file$3, 991, 3, 32251);
				attr_dev(div263, "class", "cBack");
				add_location(div263, file$3, 1000, 5, 32825);
				attr_dev(div264, "class", "cDesc");
				add_location(div264, file$3, 999, 4, 32800);
				add_location(div265, file$3, 998, 3, 32790);
				attr_dev(doc38, "name", "innerWidth-innerHeight");
				add_location(doc38, file$3, 989, 2, 32155);
				attr_dev(h239, "class", "notranslate");
				add_location(h239, file$3, 1010, 3, 32999);
				add_location(b8, file$3, 1012, 54, 33133);
				attr_dev(span44, "class", "cJQVer");
				attr_dev(span44, "v", "outerWidth");
				add_location(span44, file$3, 1013, 4, 33276);
				add_location(br69, file$3, 1014, 4, 33324);
				add_location(b9, file$3, 1015, 56, 33385);
				attr_dev(span45, "class", "cJQVer");
				attr_dev(span45, "v", "outerHeight");
				add_location(span45, file$3, 1016, 4, 33529);
				attr_dev(div266, "class", "cPreDesc");
				add_location(div266, file$3, 1011, 3, 33056);
				attr_dev(div267, "class", "cBack");
				add_location(div267, file$3, 1020, 5, 33622);
				attr_dev(div268, "class", "cDesc");
				add_location(div268, file$3, 1019, 4, 33597);
				add_location(div269, file$3, 1018, 3, 33587);
				attr_dev(doc39, "name", "outerWidth-outerHeight");
				add_location(doc39, file$3, 1009, 2, 32960);
				attr_dev(h240, "class", "notranslate");
				add_location(h240, file$3, 1030, 3, 33780);
				attr_dev(span46, "class", "cJQVer");
				attr_dev(span46, "v", "offset");
				add_location(span46, file$3, 1033, 4, 33999);
				attr_dev(div270, "class", "cPreDesc");
				add_location(div270, file$3, 1031, 3, 33819);
				attr_dev(div271, "class", "cBack");
				add_location(div271, file$3, 1037, 5, 34087);
				attr_dev(div272, "class", "cDesc");
				add_location(div272, file$3, 1036, 4, 34062);
				add_location(div273, file$3, 1035, 3, 34052);
				attr_dev(doc40, "name", "offset");
				add_location(doc40, file$3, 1029, 2, 33757);
				attr_dev(h241, "class", "notranslate");
				add_location(h241, file$3, 1047, 3, 34229);
				attr_dev(span47, "class", "cJQVer");
				attr_dev(span47, "v", "pos");
				add_location(span47, file$3, 1050, 4, 34419);
				attr_dev(div274, "class", "cPreDesc");
				add_location(div274, file$3, 1048, 3, 34276);
				attr_dev(div275, "class", "cBack");
				add_location(div275, file$3, 1054, 5, 34504);
				attr_dev(div276, "class", "cDesc");
				add_location(div276, file$3, 1053, 4, 34479);
				add_location(div277, file$3, 1052, 3, 34469);
				attr_dev(doc41, "name", "pos-position");
				add_location(doc41, file$3, 1046, 2, 34200);
				attr_dev(h242, "class", "notranslate");
				add_location(h242, file$3, 1064, 3, 34653);
				attr_dev(span48, "class", "cJQVer");
				attr_dev(span48, "v", "fadeIn");
				add_location(span48, file$3, 1067, 4, 34789);
				attr_dev(div278, "class", "cNote");
				add_location(div278, file$3, 1068, 4, 34833);
				attr_dev(div279, "class", "cPreDesc");
				add_location(div279, file$3, 1065, 3, 34702);
				attr_dev(div280, "class", "cBack");
				add_location(div280, file$3, 1074, 5, 35127);
				attr_dev(div281, "class", "cDesc");
				add_location(div281, file$3, 1073, 4, 35102);
				add_location(div282, file$3, 1072, 3, 35092);
				attr_dev(doc42, "name", "fadeIn-fadeOut");
				add_location(doc42, file$3, 1063, 2, 34622);
				attr_dev(h243, "class", "notranslate");
				add_location(h243, file$3, 1084, 3, 35274);
				add_location(b10, file$3, 1088, 124, 35544);
				attr_dev(a22, "href", "https://api.jquery.com/animate/");
				attr_dev(a22, "target", "_blank");
				set_style(a22, "font-size", "14px");
				add_location(a22, file$3, 1088, 45, 35465);
				add_location(b11, file$3, 1088, 288, 35708);
				attr_dev(a23, "href", "https://developer.mozilla.org/en-US/docs/Web/API/Element/animate");
				attr_dev(a23, "target", "_blank");
				set_style(a23, "font-size", "14px");
				add_location(a23, file$3, 1088, 176, 35596);
				attr_dev(div283, "class", "cNote");
				add_location(div283, file$3, 1087, 4, 35400);
				attr_dev(div284, "class", "cPreDesc");
				add_location(div284, file$3, 1085, 3, 35314);
				attr_dev(div285, "class", "cBack");
				add_location(div285, file$3, 1093, 5, 35816);
				attr_dev(div286, "class", "cDesc");
				add_location(div286, file$3, 1092, 4, 35791);
				add_location(div287, file$3, 1091, 3, 35781);
				add_location(br70, file$3, 1099, 3, 35930);
				attr_dev(div288, "class", "cBack");
				add_location(div288, file$3, 1103, 5, 35974);
				attr_dev(div289, "class", "cDesc");
				add_location(div289, file$3, 1102, 4, 35949);
				add_location(div290, file$3, 1101, 3, 35939);
				attr_dev(doc43, "name", "animate");
				add_location(doc43, file$3, 1083, 2, 35250);
				attr_dev(h244, "class", "notranslate");
				add_location(h244, file$3, 1113, 3, 36136);
				attr_dev(span49, "class", "cJQVer");
				attr_dev(span49, "v", "scroll");
				add_location(span49, file$3, 1116, 4, 36248);
				attr_dev(div291, "class", "cPreDesc");
				add_location(div291, file$3, 1114, 3, 36175);
				attr_dev(div292, "class", "cBack");
				add_location(div292, file$3, 1120, 5, 36336);
				attr_dev(div293, "class", "cDesc");
				add_location(div293, file$3, 1119, 4, 36311);
				add_location(div294, file$3, 1118, 3, 36301);
				attr_dev(doc44, "name", "scroll");
				add_location(doc44, file$3, 1112, 2, 36113);
				attr_dev(h245, "class", "notranslate");
				add_location(h245, file$3, 1130, 3, 36486);
				attr_dev(span50, "class", "cJQVer");
				attr_dev(span50, "v", "scrollTop");
				add_location(span50, file$3, 1133, 4, 36751);
				attr_dev(span51, "class", "cJQVer");
				attr_dev(span51, "v", "scrollLeft");
				add_location(span51, file$3, 1134, 4, 36799);
				attr_dev(div295, "class", "cPreDesc");
				add_location(div295, file$3, 1131, 3, 36541);
				attr_dev(div296, "class", "cBack");
				add_location(div296, file$3, 1138, 5, 36891);
				attr_dev(div297, "class", "cDesc");
				add_location(div297, file$3, 1137, 4, 36866);
				add_location(div298, file$3, 1136, 3, 36856);
				attr_dev(doc45, "name", "scrollTop-scrollLeft");
				add_location(doc45, file$3, 1129, 2, 36449);
				attr_dev(h246, "class", "notranslate");
				add_location(h246, file$3, 1148, 3, 37055);
				attr_dev(span52, "class", "cJQVer");
				attr_dev(span52, "v", "scrollToElement");
				add_location(span52, file$3, 1151, 4, 37193);
				attr_dev(div299, "class", "cPreDesc");
				add_location(div299, file$3, 1149, 3, 37103);
				attr_dev(div300, "class", "cBack");
				add_location(div300, file$3, 1155, 5, 37290);
				attr_dev(div301, "class", "cDesc");
				add_location(div301, file$3, 1154, 4, 37265);
				add_location(div302, file$3, 1153, 3, 37255);
				attr_dev(doc46, "name", "scrollToElement");
				add_location(doc46, file$3, 1147, 2, 37023);
				attr_dev(h247, "class", "notranslate");
				add_location(h247, file$3, 1165, 3, 37442);
				attr_dev(span53, "class", "cJQVer");
				attr_dev(span53, "v", "each");
				add_location(span53, file$3, 1168, 4, 37587);
				attr_dev(div303, "class", "cPreDesc");
				add_location(div303, file$3, 1166, 3, 37479);
				attr_dev(div304, "class", "cBack");
				add_location(div304, file$3, 1172, 5, 37673);
				attr_dev(div305, "class", "cDesc");
				add_location(div305, file$3, 1171, 4, 37648);
				add_location(div306, file$3, 1170, 3, 37638);
				attr_dev(doc47, "name", "each");
				add_location(doc47, file$3, 1164, 2, 37421);
				attr_dev(h248, "class", "notranslate");
				add_location(h248, file$3, 1182, 3, 37809);
				attr_dev(span54, "class", "cJQVer");
				attr_dev(span54, "v", "on");
				add_location(span54, file$3, 1185, 4, 37934);
				add_location(br71, file$3, 1186, 4, 37974);
				attr_dev(span55, "class", "cJQVer");
				attr_dev(span55, "v", "off");
				add_location(span55, file$3, 1188, 4, 38041);
				add_location(br72, file$3, 1189, 4, 38082);
				attr_dev(div307, "class", "cPreDesc");
				add_location(div307, file$3, 1183, 3, 37856);
				attr_dev(div308, "class", "cBack");
				add_location(div308, file$3, 1194, 5, 38194);
				attr_dev(div309, "class", "cDesc");
				add_location(div309, file$3, 1193, 4, 38169);
				add_location(div310, file$3, 1192, 3, 38159);
				add_location(br73, file$3, 1199, 3, 38294);
				attr_dev(div311, "class", "cNote");
				add_location(div311, file$3, 1201, 3, 38303);
				attr_dev(div312, "class", "cBack");
				add_location(div312, file$3, 1206, 5, 38535);
				attr_dev(div313, "class", "cDesc");
				add_location(div313, file$3, 1205, 4, 38510);
				add_location(div314, file$3, 1204, 3, 38500);
				attr_dev(doc48, "name", "on-off-onf");
				add_location(doc48, file$3, 1181, 2, 37782);
				attr_dev(h249, "class", "notranslate");
				add_location(h249, file$3, 1216, 3, 38670);
				attr_dev(span56, "class", "cJQVer");
				attr_dev(span56, "v", "trigger");
				add_location(span56, file$3, 1219, 4, 38798);
				attr_dev(div315, "class", "cPreDesc");
				add_location(div315, file$3, 1217, 3, 38716);
				attr_dev(div316, "class", "cBack");
				add_location(div316, file$3, 1223, 5, 38887);
				attr_dev(div317, "class", "cDesc");
				add_location(div317, file$3, 1222, 4, 38862);
				add_location(div318, file$3, 1221, 3, 38852);
				attr_dev(doc49, "name", "trg-trigger");
				add_location(doc49, file$3, 1215, 2, 38642);
				attr_dev(section4, "id", "idDoc");
				add_location(section4, file$3, 142, 1, 5819);
				add_location(main, file$3, 38, 0, 894);
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
				append_dev(div4, hr);
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
				append_dev(section2, br0);
				append_dev(section2, br1);
				append_dev(section2, br2);
				append_dev(section2, br3);
				append_dev(section2, br4);
				append_dev(section2, br5);
				append_dev(section2, br6);
				append_dev(section2, br7);
				append_dev(main, t134);
				append_dev(main, div67);
				append_dev(div67, span1);
				append_dev(main, t135);
				append_dev(main, section4);
				append_dev(section4, h1);
				append_dev(h1, span2);
				append_dev(span2, t136);
				append_dev(span2, div68);
				append_dev(section4, t138);
				append_dev(section4, doc0);
				append_dev(doc0, h20);
				append_dev(doc0, t140);
				append_dev(doc0, div69);
				append_dev(div69, t141);
				append_dev(div69, a2);
				append_dev(div69, t143);
				append_dev(div69, a3);
				append_dev(div69, t145);
				append_dev(doc0, t146);
				append_dev(doc0, div72);
				append_dev(div72, div71);
				append_dev(div71, div70);
				append_dev(div71, t147);
				append_dev(div71, small0);
				append_dev(div72, t149);
				mount_component(sqi0, div72, null);
				append_dev(doc0, t150);
				append_dev(doc0, div75);
				append_dev(div75, div74);
				append_dev(div74, div73);
				append_dev(div74, t151);
				append_dev(div75, t152);
				mount_component(sqi1, div75, null);
				append_dev(doc0, t153);
				append_dev(doc0, div78);
				append_dev(div78, div77);
				append_dev(div77, div76);
				append_dev(div77, t154);
				append_dev(div77, small1);
				append_dev(small1, t155);
				append_dev(small1, a4);
				append_dev(small1, t157);
				append_dev(div78, t158);
				mount_component(sqi2, div78, null);
				append_dev(doc0, t159);
				append_dev(doc0, div81);
				append_dev(div81, div80);
				append_dev(div80, div79);
				append_dev(div80, t160);
				append_dev(div81, t161);
				mount_component(sqi3, div81, null);
				append_dev(section4, t162);
				append_dev(section4, doc1);
				append_dev(doc1, h21);
				append_dev(doc1, t164);
				append_dev(doc1, div92);
				append_dev(div92, t165);
				append_dev(div92, div91);
				append_dev(div91, div82);
				append_dev(div82, h30);
				append_dev(div82, t167);
				append_dev(div82, p0);
				append_dev(p0, t168);
				append_dev(p0, br8);
				append_dev(p0, t169);
				append_dev(p0, b0);
				append_dev(p0, t171);
				append_dev(p0, a5);
				append_dev(div91, t173);
				append_dev(div91, div83);
				append_dev(div83, h31);
				append_dev(div83, t175);
				append_dev(div83, p1);
				append_dev(p1, t176);
				append_dev(p1, b1);
				append_dev(p1, t178);
				append_dev(p1, br9);
				append_dev(p1, t179);
				append_dev(p1, a6);
				append_dev(p1, t181);
				append_dev(p1, a7);
				append_dev(p1, t183);
				append_dev(div91, t184);
				append_dev(div91, div84);
				append_dev(div84, h32);
				append_dev(div84, t186);
				append_dev(div84, p2);
				append_dev(p2, t187);
				append_dev(p2, br10);
				append_dev(p2, t188);
				append_dev(p2, br11);
				append_dev(p2, t189);
				append_dev(p2, br12);
				append_dev(p2, t190);
				append_dev(p2, b2);
				append_dev(b2, t191);
				append_dev(b2, br13);
				append_dev(b2, t192);
				append_dev(b2, br14);
				append_dev(b2, t193);
				append_dev(div91, t194);
				append_dev(div91, div85);
				append_dev(div85, h33);
				append_dev(div85, t196);
				append_dev(div85, p3);
				append_dev(p3, t197);
				append_dev(p3, br15);
				append_dev(p3, br16);
				append_dev(p3, t198);
				append_dev(p3, b3);
				append_dev(p3, br17);
				append_dev(p3, t200);
				append_dev(p3, br18);
				append_dev(p3, t201);
				append_dev(p3, br19);
				append_dev(p3, t202);
				append_dev(p3, br20);
				append_dev(p3, t203);
				append_dev(p3, b4);
				append_dev(b4, t204);
				append_dev(b4, br21);
				append_dev(b4, t205);
				append_dev(b4, br22);
				append_dev(div91, t206);
				append_dev(div91, div86);
				append_dev(div86, h34);
				append_dev(div86, t208);
				append_dev(div86, p4);
				append_dev(p4, t209);
				append_dev(p4, br23);
				append_dev(p4, t210);
				append_dev(p4, br24);
				append_dev(p4, t211);
				append_dev(p4, b5);
				append_dev(p4, t213);
				append_dev(p4, br25);
				append_dev(p4, t214);
				append_dev(p4, br26);
				append_dev(p4, t215);
				append_dev(p4, br27);
				append_dev(p4, t216);
				append_dev(p4, br28);
				append_dev(p4, t217);
				append_dev(p4, br29);
				append_dev(p4, t218);
				append_dev(p4, br30);
				append_dev(p4, t219);
				append_dev(p4, br31);
				append_dev(p4, t220);
				append_dev(p4, br32);
				append_dev(p4, t221);
				append_dev(div91, t222);
				append_dev(div91, div90);
				append_dev(div90, h35);
				append_dev(div90, t224);
				append_dev(div90, p5);
				append_dev(p5, small2);
				append_dev(p5, br33);
				append_dev(p5, t226);
				append_dev(div90, t227);
				append_dev(div90, div89);
				append_dev(div89, div88);
				append_dev(div88, div87);
				append_dev(div88, t228);
				append_dev(div89, t229);
				mount_component(sqi4, div89, null);
				append_dev(section4, t230);
				append_dev(section4, doc2);
				append_dev(doc2, h22);
				append_dev(doc2, t232);
				append_dev(doc2, div93);
				append_dev(div93, img0);
				append_dev(div93, t233);
				append_dev(div93, br34);
				append_dev(div93, t234);
				append_dev(doc2, t235);
				append_dev(doc2, div98);
				append_dev(div98, div95);
				append_dev(div95, div94);
				append_dev(div95, t236);
				append_dev(div98, t237);
				mount_component(sqi5, div98, null);
				append_dev(div98, t238);
				append_dev(div98, div97);
				append_dev(div97, div96);
				append_dev(div97, t239);
				append_dev(div98, t240);
				mount_component(sqi6, div98, null);
				append_dev(section4, t241);
				append_dev(section4, doc3);
				append_dev(doc3, h23);
				append_dev(doc3, t243);
				append_dev(doc3, div101);
				append_dev(div101, t244);
				append_dev(div101, a8);
				append_dev(div101, t246);
				append_dev(div101, br35);
				append_dev(div101, t247);
				append_dev(div101, img1);
				append_dev(div101, t248);
				append_dev(div101, div100);
				append_dev(div100, h40);
				append_dev(div100, t250);
				append_dev(div100, div99);
				append_dev(div99, a9);
				append_dev(div100, t252);
				append_dev(div100, br36);
				append_dev(div100, t253);
				append_dev(div100, br37);
				append_dev(div100, t254);
				append_dev(div100, br38);
				append_dev(div100, br39);
				append_dev(div100, t255);
				append_dev(div100, a10);
				append_dev(div100, t257);
				append_dev(section4, t258);
				append_dev(section4, doc4);
				append_dev(doc4, h24);
				append_dev(doc4, t260);
				append_dev(doc4, div104);
				append_dev(div104, t261);
				append_dev(div104, a11);
				append_dev(div104, t263);
				append_dev(div104, br40);
				append_dev(div104, t264);
				append_dev(div104, img2);
				append_dev(div104, t265);
				append_dev(div104, div103);
				append_dev(div103, h41);
				append_dev(div103, t267);
				append_dev(div103, div102);
				append_dev(div102, a12);
				append_dev(div103, t269);
				append_dev(div103, br41);
				append_dev(div103, br42);
				append_dev(div103, t270);
				append_dev(div103, a13);
				append_dev(div103, t272);
				append_dev(section4, t273);
				append_dev(section4, doc5);
				append_dev(doc5, h25);
				append_dev(doc5, t275);
				append_dev(doc5, div107);
				append_dev(div107, t276);
				append_dev(div107, a14);
				append_dev(div107, t278);
				append_dev(div107, br43);
				append_dev(div107, t279);
				append_dev(div107, img3);
				append_dev(div107, t280);
				append_dev(div107, div106);
				append_dev(div106, h42);
				append_dev(div106, t282);
				append_dev(div106, div105);
				append_dev(div105, a15);
				append_dev(div106, t284);
				append_dev(div106, br44);
				append_dev(div106, br45);
				append_dev(div106, t285);
				append_dev(div106, br46);
				append_dev(div106, t286);
				append_dev(div106, br47);
				append_dev(div106, br48);
				append_dev(div106, t287);
				append_dev(div106, a16);
				append_dev(div106, t289);
				append_dev(section4, t290);
				append_dev(section4, doc6);
				append_dev(doc6, h26);
				append_dev(doc6, t292);
				append_dev(doc6, div110);
				append_dev(div110, t293);
				append_dev(div110, a17);
				append_dev(div110, t295);
				append_dev(div110, br49);
				append_dev(div110, t296);
				append_dev(div110, img4);
				append_dev(div110, t297);
				append_dev(div110, div109);
				append_dev(div109, h43);
				append_dev(div109, t299);
				append_dev(div109, div108);
				append_dev(div108, a18);
				append_dev(div109, t301);
				append_dev(div109, br50);
				append_dev(div109, t302);
				append_dev(div109, br51);
				append_dev(div109, br52);
				append_dev(div109, t303);
				append_dev(div109, br53);
				append_dev(div109, br54);
				append_dev(div109, t304);
				append_dev(div109, a19);
				append_dev(div109, t306);
				append_dev(section4, t307);
				append_dev(section4, doc7);
				append_dev(doc7, h27);
				append_dev(doc7, t309);
				append_dev(doc7, div113);
				append_dev(div113, t310);
				append_dev(div113, a20);
				append_dev(div113, t312);
				append_dev(div113, br55);
				append_dev(div113, t313);
				append_dev(div113, img5);
				append_dev(div113, t314);
				append_dev(div113, div112);
				append_dev(div112, h44);
				append_dev(div112, t316);
				append_dev(div112, div111);
				append_dev(div111, a21);
				append_dev(div112, t318);
				append_dev(div112, br56);
				append_dev(div112, t319);
				append_dev(section4, t320);
				append_dev(section4, doc8);
				append_dev(doc8, h28);
				append_dev(doc8, t322);
				append_dev(doc8, div114);
				append_dev(div114, t323);
				append_dev(div114, span3);
				append_dev(doc8, t324);
				append_dev(doc8, div117);
				append_dev(div117, div116);
				append_dev(div116, div115);
				append_dev(div116, t325);
				append_dev(div117, t326);
				mount_component(sqi7, div117, null);
				append_dev(doc8, t327);
				append_dev(doc8, div118);
				append_dev(div118, br57);
				append_dev(div118, t328);
				append_dev(div118, span4);
				append_dev(doc8, t329);
				append_dev(doc8, div121);
				append_dev(div121, div120);
				append_dev(div120, div119);
				append_dev(div120, t330);
				append_dev(div121, t331);
				mount_component(sqi8, div121, null);
				append_dev(section4, t332);
				append_dev(section4, doc9);
				append_dev(doc9, h29);
				append_dev(doc9, t334);
				append_dev(doc9, div122);
				append_dev(div122, t335);
				append_dev(div122, span5);
				append_dev(doc9, t336);
				append_dev(doc9, div125);
				append_dev(div125, div124);
				append_dev(div124, div123);
				append_dev(div124, t337);
				append_dev(div125, t338);
				mount_component(sqi9, div125, null);
				append_dev(doc9, t339);
				append_dev(doc9, div126);
				append_dev(div126, br58);
				append_dev(div126, t340);
				append_dev(doc9, t341);
				append_dev(doc9, div129);
				append_dev(div129, div128);
				append_dev(div128, div127);
				append_dev(div128, t342);
				append_dev(div129, t343);
				mount_component(sqi10, div129, null);
				append_dev(section4, t344);
				append_dev(section4, doc10);
				append_dev(doc10, h210);
				append_dev(doc10, t346);
				append_dev(doc10, div130);
				append_dev(div130, t347);
				append_dev(div130, span6);
				append_dev(doc10, t348);
				append_dev(doc10, div133);
				append_dev(div133, div132);
				append_dev(div132, div131);
				append_dev(div132, t349);
				append_dev(div133, t350);
				mount_component(sqi11, div133, null);
				append_dev(doc10, t351);
				append_dev(doc10, div134);
				append_dev(div134, br59);
				append_dev(div134, t352);
				append_dev(div134, span7);
				append_dev(doc10, t353);
				append_dev(doc10, div137);
				append_dev(div137, div136);
				append_dev(div136, div135);
				append_dev(div136, t354);
				append_dev(div137, t355);
				mount_component(sqi12, div137, null);
				append_dev(section4, t356);
				append_dev(section4, doc11);
				append_dev(doc11, h211);
				append_dev(doc11, t358);
				append_dev(doc11, div138);
				append_dev(div138, t359);
				append_dev(div138, span8);
				append_dev(doc11, t360);
				append_dev(doc11, div141);
				append_dev(div141, div140);
				append_dev(div140, div139);
				append_dev(div140, t361);
				append_dev(div141, t362);
				mount_component(sqi13, div141, null);
				append_dev(section4, t363);
				append_dev(section4, doc12);
				append_dev(doc12, h212);
				append_dev(doc12, t365);
				append_dev(doc12, div142);
				append_dev(div142, t366);
				append_dev(div142, span9);
				append_dev(doc12, t367);
				append_dev(doc12, div145);
				append_dev(div145, div144);
				append_dev(div144, div143);
				append_dev(div144, t368);
				append_dev(div145, t369);
				mount_component(sqi14, div145, null);
				append_dev(section4, t370);
				append_dev(section4, doc13);
				append_dev(doc13, h213);
				append_dev(doc13, t372);
				append_dev(doc13, div146);
				append_dev(div146, t373);
				append_dev(div146, span10);
				append_dev(doc13, t374);
				append_dev(doc13, div149);
				append_dev(div149, div148);
				append_dev(div148, div147);
				append_dev(div148, t375);
				append_dev(div149, t376);
				mount_component(sqi15, div149, null);
				append_dev(section4, t377);
				append_dev(section4, doc14);
				append_dev(doc14, h214);
				append_dev(doc14, t379);
				append_dev(doc14, div150);
				append_dev(div150, t380);
				append_dev(div150, span11);
				append_dev(doc14, t381);
				append_dev(doc14, div153);
				append_dev(div153, div152);
				append_dev(div152, div151);
				append_dev(div152, t382);
				append_dev(div153, t383);
				mount_component(sqi16, div153, null);
				append_dev(section4, t384);
				append_dev(section4, doc15);
				append_dev(doc15, h215);
				append_dev(doc15, t386);
				append_dev(doc15, div154);
				append_dev(div154, t387);
				append_dev(div154, span12);
				append_dev(doc15, t388);
				append_dev(doc15, div157);
				append_dev(div157, div156);
				append_dev(div156, div155);
				append_dev(div156, t389);
				append_dev(div157, t390);
				mount_component(sqi17, div157, null);
				append_dev(section4, t391);
				append_dev(section4, doc16);
				append_dev(doc16, h216);
				append_dev(doc16, t393);
				append_dev(doc16, div158);
				append_dev(div158, t394);
				append_dev(div158, span13);
				append_dev(doc16, t395);
				append_dev(doc16, div161);
				append_dev(div161, div160);
				append_dev(div160, div159);
				append_dev(div160, t396);
				append_dev(div161, t397);
				mount_component(sqi18, div161, null);
				append_dev(section4, t398);
				append_dev(section4, doc17);
				append_dev(doc17, h217);
				append_dev(doc17, t400);
				append_dev(doc17, div162);
				append_dev(div162, t401);
				append_dev(div162, span14);
				append_dev(doc17, t402);
				append_dev(doc17, div165);
				append_dev(div165, div164);
				append_dev(div164, div163);
				append_dev(div164, t403);
				append_dev(div165, t404);
				mount_component(sqi19, div165, null);
				append_dev(section4, t405);
				append_dev(section4, doc18);
				append_dev(doc18, h218);
				append_dev(doc18, t407);
				append_dev(doc18, div166);
				append_dev(div166, t408);
				append_dev(div166, span15);
				append_dev(doc18, t409);
				append_dev(doc18, div169);
				append_dev(div169, div168);
				append_dev(div168, div167);
				append_dev(div168, t410);
				append_dev(div169, t411);
				mount_component(sqi20, div169, null);
				append_dev(doc18, t412);
				append_dev(doc18, div170);
				append_dev(div170, br60);
				append_dev(div170, t413);
				append_dev(div170, span16);
				append_dev(doc18, t414);
				append_dev(doc18, div173);
				append_dev(div173, div172);
				append_dev(div172, div171);
				append_dev(div172, t415);
				append_dev(div173, t416);
				mount_component(sqi21, div173, null);
				append_dev(section4, t417);
				append_dev(section4, doc19);
				append_dev(doc19, h219);
				append_dev(doc19, t419);
				append_dev(doc19, div174);
				append_dev(div174, t420);
				append_dev(div174, span17);
				append_dev(doc19, t421);
				append_dev(doc19, div177);
				append_dev(div177, div176);
				append_dev(div176, div175);
				append_dev(div176, t422);
				append_dev(div177, t423);
				mount_component(sqi22, div177, null);
				append_dev(section4, t424);
				append_dev(section4, doc20);
				append_dev(doc20, h220);
				append_dev(doc20, t426);
				append_dev(doc20, div178);
				append_dev(div178, t427);
				append_dev(div178, span18);
				append_dev(doc20, t428);
				append_dev(doc20, div181);
				append_dev(div181, div180);
				append_dev(div180, div179);
				append_dev(div180, t429);
				append_dev(div181, t430);
				mount_component(sqi23, div181, null);
				append_dev(doc20, t431);
				append_dev(doc20, div182);
				append_dev(div182, br61);
				append_dev(div182, t432);
				append_dev(div182, span19);
				append_dev(doc20, t433);
				append_dev(doc20, div185);
				append_dev(div185, div184);
				append_dev(div184, div183);
				append_dev(div184, t434);
				append_dev(div185, t435);
				mount_component(sqi24, div185, null);
				append_dev(section4, t436);
				append_dev(section4, doc21);
				append_dev(doc21, h221);
				append_dev(doc21, t438);
				append_dev(doc21, div186);
				append_dev(div186, t439);
				append_dev(div186, span20);
				append_dev(doc21, t440);
				append_dev(doc21, div189);
				append_dev(div189, div188);
				append_dev(div188, div187);
				append_dev(div188, t441);
				append_dev(div189, t442);
				mount_component(sqi25, div189, null);
				append_dev(section4, t443);
				append_dev(section4, doc22);
				append_dev(doc22, h222);
				append_dev(doc22, t445);
				append_dev(doc22, div190);
				append_dev(div190, t446);
				append_dev(div190, span21);
				append_dev(doc22, t447);
				append_dev(doc22, div193);
				append_dev(div193, div192);
				append_dev(div192, div191);
				append_dev(div192, t448);
				append_dev(div193, t449);
				mount_component(sqi26, div193, null);
				append_dev(section4, t450);
				append_dev(section4, doc23);
				append_dev(doc23, h223);
				append_dev(doc23, t452);
				append_dev(doc23, div194);
				append_dev(div194, t453);
				append_dev(div194, span22);
				append_dev(doc23, t454);
				append_dev(doc23, div197);
				append_dev(div197, div196);
				append_dev(div196, div195);
				append_dev(div196, t455);
				append_dev(div197, t456);
				mount_component(sqi27, div197, null);
				append_dev(section4, t457);
				append_dev(section4, doc24);
				append_dev(doc24, h224);
				append_dev(doc24, t459);
				append_dev(doc24, div198);
				append_dev(div198, t460);
				append_dev(div198, span23);
				append_dev(doc24, t461);
				append_dev(doc24, div201);
				append_dev(div201, div200);
				append_dev(div200, div199);
				append_dev(div200, t462);
				append_dev(div201, t463);
				mount_component(sqi28, div201, null);
				append_dev(section4, t464);
				append_dev(section4, doc25);
				append_dev(doc25, h225);
				append_dev(doc25, t466);
				append_dev(doc25, div202);
				append_dev(div202, t467);
				append_dev(div202, span24);
				append_dev(doc25, t468);
				append_dev(doc25, div205);
				append_dev(div205, div204);
				append_dev(div204, div203);
				append_dev(div204, t469);
				append_dev(div205, t470);
				mount_component(sqi29, div205, null);
				append_dev(section4, t471);
				append_dev(section4, doc26);
				append_dev(doc26, h226);
				append_dev(doc26, t473);
				append_dev(doc26, div206);
				append_dev(div206, t474);
				append_dev(div206, span25);
				append_dev(doc26, t475);
				append_dev(doc26, div209);
				append_dev(div209, div208);
				append_dev(div208, div207);
				append_dev(div208, t476);
				append_dev(div209, t477);
				mount_component(sqi30, div209, null);
				append_dev(section4, t478);
				append_dev(section4, doc27);
				append_dev(doc27, h227);
				append_dev(doc27, t480);
				append_dev(doc27, div210);
				append_dev(div210, t481);
				append_dev(div210, span26);
				append_dev(doc27, t482);
				append_dev(doc27, div213);
				append_dev(div213, div212);
				append_dev(div212, div211);
				append_dev(div212, t483);
				append_dev(div213, t484);
				mount_component(sqi31, div213, null);
				append_dev(section4, t485);
				append_dev(section4, doc28);
				append_dev(doc28, h228);
				append_dev(doc28, t487);
				append_dev(doc28, div214);
				append_dev(div214, t488);
				append_dev(div214, span27);
				append_dev(doc28, t489);
				append_dev(doc28, div217);
				append_dev(div217, div216);
				append_dev(div216, div215);
				append_dev(div216, t490);
				append_dev(div217, t491);
				mount_component(sqi32, div217, null);
				append_dev(section4, t492);
				append_dev(section4, doc29);
				append_dev(doc29, h229);
				append_dev(doc29, t494);
				append_dev(doc29, div218);
				append_dev(div218, t495);
				append_dev(div218, span28);
				append_dev(doc29, t496);
				append_dev(doc29, div221);
				append_dev(div221, div220);
				append_dev(div220, div219);
				append_dev(div220, t497);
				append_dev(div221, t498);
				mount_component(sqi33, div221, null);
				append_dev(section4, t499);
				append_dev(section4, doc30);
				append_dev(doc30, h230);
				append_dev(doc30, t501);
				append_dev(doc30, div222);
				append_dev(div222, t502);
				append_dev(div222, span29);
				append_dev(div222, t503);
				append_dev(div222, br62);
				append_dev(div222, br63);
				append_dev(div222, t504);
				append_dev(div222, span30);
				append_dev(doc30, t505);
				append_dev(doc30, div225);
				append_dev(div225, div224);
				append_dev(div224, div223);
				append_dev(div224, t506);
				append_dev(div225, t507);
				mount_component(sqi34, div225, null);
				append_dev(section4, t508);
				append_dev(section4, doc31);
				append_dev(doc31, h231);
				append_dev(doc31, t510);
				append_dev(doc31, div226);
				append_dev(div226, t511);
				append_dev(div226, span31);
				append_dev(doc31, t512);
				append_dev(doc31, div229);
				append_dev(div229, div228);
				append_dev(div228, div227);
				append_dev(div228, t513);
				append_dev(div229, t514);
				mount_component(sqi35, div229, null);
				append_dev(section4, t515);
				append_dev(section4, doc32);
				append_dev(doc32, h232);
				append_dev(doc32, t517);
				append_dev(doc32, div230);
				append_dev(div230, t518);
				append_dev(div230, span32);
				append_dev(doc32, t519);
				append_dev(doc32, div233);
				append_dev(div233, div232);
				append_dev(div232, div231);
				append_dev(div232, t520);
				append_dev(div233, t521);
				mount_component(sqi36, div233, null);
				append_dev(doc32, t522);
				append_dev(doc32, div234);
				append_dev(div234, br64);
				append_dev(div234, t523);
				append_dev(div234, span33);
				append_dev(doc32, t524);
				append_dev(doc32, div237);
				append_dev(div237, div236);
				append_dev(div236, div235);
				append_dev(div236, t525);
				append_dev(div237, t526);
				mount_component(sqi37, div237, null);
				append_dev(section4, t527);
				append_dev(section4, doc33);
				append_dev(doc33, h233);
				append_dev(doc33, t529);
				append_dev(doc33, div238);
				append_dev(div238, t530);
				append_dev(div238, span34);
				append_dev(doc33, t531);
				append_dev(doc33, div241);
				append_dev(div241, div240);
				append_dev(div240, div239);
				append_dev(div240, t532);
				append_dev(div241, t533);
				mount_component(sqi38, div241, null);
				append_dev(doc33, t534);
				append_dev(doc33, div242);
				append_dev(div242, br65);
				append_dev(div242, t535);
				append_dev(div242, span35);
				append_dev(doc33, t536);
				append_dev(doc33, div245);
				append_dev(div245, div244);
				append_dev(div244, div243);
				append_dev(div244, t537);
				append_dev(div245, t538);
				mount_component(sqi39, div245, null);
				append_dev(section4, t539);
				append_dev(section4, doc34);
				append_dev(doc34, h234);
				append_dev(doc34, t541);
				append_dev(doc34, div246);
				append_dev(div246, t542);
				append_dev(div246, span36);
				append_dev(doc34, t543);
				append_dev(doc34, div249);
				append_dev(div249, div248);
				append_dev(div248, div247);
				append_dev(div248, t544);
				append_dev(div249, t545);
				mount_component(sqi40, div249, null);
				append_dev(section4, t546);
				append_dev(section4, doc35);
				append_dev(doc35, h235);
				append_dev(doc35, t548);
				append_dev(doc35, div250);
				append_dev(div250, t549);
				append_dev(div250, span37);
				append_dev(div250, t550);
				append_dev(div250, br66);
				append_dev(div250, t551);
				append_dev(div250, span38);
				append_dev(doc35, t552);
				append_dev(doc35, div253);
				append_dev(div253, div252);
				append_dev(div252, div251);
				append_dev(div252, t553);
				append_dev(div253, t554);
				mount_component(sqi41, div253, null);
				append_dev(section4, t555);
				append_dev(section4, doc36);
				append_dev(doc36, h236);
				append_dev(doc36, t557);
				append_dev(doc36, div254);
				append_dev(div254, t558);
				append_dev(div254, span39);
				append_dev(doc36, t559);
				append_dev(doc36, div257);
				append_dev(div257, div256);
				append_dev(div256, div255);
				append_dev(div256, t560);
				append_dev(div257, t561);
				mount_component(sqi42, div257, null);
				append_dev(section4, t562);
				append_dev(section4, doc37);
				append_dev(doc37, h237);
				append_dev(doc37, t564);
				append_dev(doc37, div258);
				append_dev(div258, t565);
				append_dev(div258, span40);
				append_dev(div258, t566);
				append_dev(div258, br67);
				append_dev(div258, t567);
				append_dev(div258, span41);
				append_dev(doc37, t568);
				append_dev(doc37, div261);
				append_dev(div261, div260);
				append_dev(div260, div259);
				append_dev(div260, t569);
				append_dev(div261, t570);
				mount_component(sqi43, div261, null);
				append_dev(section4, t571);
				append_dev(section4, doc38);
				append_dev(doc38, h238);
				append_dev(doc38, t573);
				append_dev(doc38, div262);
				append_dev(div262, t574);
				append_dev(div262, b6);
				append_dev(div262, t576);
				append_dev(div262, span42);
				append_dev(div262, t577);
				append_dev(div262, br68);
				append_dev(div262, t578);
				append_dev(div262, b7);
				append_dev(div262, t580);
				append_dev(div262, span43);
				append_dev(doc38, t581);
				append_dev(doc38, div265);
				append_dev(div265, div264);
				append_dev(div264, div263);
				append_dev(div264, t582);
				append_dev(div265, t583);
				mount_component(sqi44, div265, null);
				append_dev(section4, t584);
				append_dev(section4, doc39);
				append_dev(doc39, h239);
				append_dev(doc39, t586);
				append_dev(doc39, div266);
				append_dev(div266, t587);
				append_dev(div266, b8);
				append_dev(div266, t589);
				append_dev(div266, span44);
				append_dev(div266, t590);
				append_dev(div266, br69);
				append_dev(div266, t591);
				append_dev(div266, b9);
				append_dev(div266, t593);
				append_dev(div266, span45);
				append_dev(doc39, t594);
				append_dev(doc39, div269);
				append_dev(div269, div268);
				append_dev(div268, div267);
				append_dev(div268, t595);
				append_dev(div269, t596);
				mount_component(sqi45, div269, null);
				append_dev(section4, t597);
				append_dev(section4, doc40);
				append_dev(doc40, h240);
				append_dev(doc40, t599);
				append_dev(doc40, div270);
				append_dev(div270, t600);
				append_dev(div270, span46);
				append_dev(doc40, t601);
				append_dev(doc40, div273);
				append_dev(div273, div272);
				append_dev(div272, div271);
				append_dev(div272, t602);
				append_dev(div273, t603);
				mount_component(sqi46, div273, null);
				append_dev(section4, t604);
				append_dev(section4, doc41);
				append_dev(doc41, h241);
				append_dev(doc41, t606);
				append_dev(doc41, div274);
				append_dev(div274, t607);
				append_dev(div274, span47);
				append_dev(doc41, t608);
				append_dev(doc41, div277);
				append_dev(div277, div276);
				append_dev(div276, div275);
				append_dev(div276, t609);
				append_dev(div277, t610);
				mount_component(sqi47, div277, null);
				append_dev(section4, t611);
				append_dev(section4, doc42);
				append_dev(doc42, h242);
				append_dev(doc42, t613);
				append_dev(doc42, div279);
				append_dev(div279, t614);
				append_dev(div279, span48);
				append_dev(div279, t615);
				append_dev(div279, div278);
				append_dev(doc42, t617);
				append_dev(doc42, div282);
				append_dev(div282, div281);
				append_dev(div281, div280);
				append_dev(div281, t618);
				append_dev(div282, t619);
				mount_component(sqi48, div282, null);
				append_dev(section4, t620);
				append_dev(section4, doc43);
				append_dev(doc43, h243);
				append_dev(doc43, t622);
				append_dev(doc43, div284);
				append_dev(div284, t623);
				append_dev(div284, div283);
				append_dev(div283, t624);
				append_dev(div283, a22);
				append_dev(a22, b10);
				append_dev(div283, t626);
				append_dev(div283, a23);
				append_dev(a23, b11);
				append_dev(div283, t628);
				append_dev(doc43, t629);
				append_dev(doc43, div287);
				append_dev(div287, div286);
				append_dev(div286, div285);
				append_dev(div286, t630);
				append_dev(div287, t631);
				mount_component(sqi49, div287, null);
				append_dev(doc43, t632);
				append_dev(doc43, br70);
				append_dev(doc43, t633);
				append_dev(doc43, div290);
				append_dev(div290, div289);
				append_dev(div289, div288);
				append_dev(div289, t634);
				append_dev(div290, t635);
				mount_component(sqi50, div290, null);
				append_dev(section4, t636);
				append_dev(section4, doc44);
				append_dev(doc44, h244);
				append_dev(doc44, t638);
				append_dev(doc44, div291);
				append_dev(div291, t639);
				append_dev(div291, span49);
				append_dev(doc44, t640);
				append_dev(doc44, div294);
				append_dev(div294, div293);
				append_dev(div293, div292);
				append_dev(div293, t641);
				append_dev(div294, t642);
				mount_component(sqi51, div294, null);
				append_dev(section4, t643);
				append_dev(section4, doc45);
				append_dev(doc45, h245);
				append_dev(doc45, t645);
				append_dev(doc45, div295);
				append_dev(div295, t646);
				append_dev(div295, span50);
				append_dev(div295, t647);
				append_dev(div295, span51);
				append_dev(doc45, t648);
				append_dev(doc45, div298);
				append_dev(div298, div297);
				append_dev(div297, div296);
				append_dev(div297, t649);
				append_dev(div298, t650);
				mount_component(sqi52, div298, null);
				append_dev(section4, t651);
				append_dev(section4, doc46);
				append_dev(doc46, h246);
				append_dev(doc46, t653);
				append_dev(doc46, div299);
				append_dev(div299, t654);
				append_dev(div299, span52);
				append_dev(doc46, t655);
				append_dev(doc46, div302);
				append_dev(div302, div301);
				append_dev(div301, div300);
				append_dev(div301, t656);
				append_dev(div302, t657);
				mount_component(sqi53, div302, null);
				append_dev(section4, t658);
				append_dev(section4, doc47);
				append_dev(doc47, h247);
				append_dev(doc47, t660);
				append_dev(doc47, div303);
				append_dev(div303, t661);
				append_dev(div303, span53);
				append_dev(doc47, t662);
				append_dev(doc47, div306);
				append_dev(div306, div305);
				append_dev(div305, div304);
				append_dev(div305, t663);
				append_dev(div306, t664);
				mount_component(sqi54, div306, null);
				append_dev(section4, t665);
				append_dev(section4, doc48);
				append_dev(doc48, h248);
				append_dev(doc48, t667);
				append_dev(doc48, div307);
				append_dev(div307, t668);
				append_dev(div307, span54);
				append_dev(div307, t669);
				append_dev(div307, br71);
				append_dev(div307, t670);
				append_dev(div307, span55);
				append_dev(div307, t671);
				append_dev(div307, br72);
				append_dev(div307, t672);
				append_dev(doc48, t673);
				append_dev(doc48, div310);
				append_dev(div310, div309);
				append_dev(div309, div308);
				append_dev(div309, t674);
				append_dev(div310, t675);
				mount_component(sqi55, div310, null);
				append_dev(doc48, t676);
				append_dev(doc48, br73);
				append_dev(doc48, t677);
				append_dev(doc48, div311);
				append_dev(doc48, t679);
				append_dev(doc48, div314);
				append_dev(div314, div313);
				append_dev(div313, div312);
				append_dev(div313, t680);
				append_dev(div314, t681);
				mount_component(sqi56, div314, null);
				append_dev(section4, t682);
				append_dev(section4, doc49);
				append_dev(doc49, h249);
				append_dev(doc49, t684);
				append_dev(doc49, div315);
				append_dev(div315, t685);
				append_dev(div315, span56);
				append_dev(doc49, t686);
				append_dev(doc49, div318);
				append_dev(div318, div317);
				append_dev(div317, div316);
				append_dev(div317, t687);
				append_dev(div318, t688);
				mount_component(sqi57, div318, null);
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
		validate_slots('Docs', slots, []);
		document.getElementsByTagName('body')[0].style.display = 'none';

		if (sQuery().isPageLoaded()) {
			console.log('spa loaded');

			setTimeout(
				() => {
					loadProc();
					appendReload();
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

					appendReload();
				},
				100
			);
		});

		function appendReload() {
			sQuery('.cDesc').each(function () {
				sQuery(this).append('<div class="cReload">reload</div>');
			});

			sQuery('.cReload').show();

			sQuery('.cReload').on('click', function () {
				const el = sQuery(this).parent().parent().find('iframe');
				el.attr('src', el.attr('src'));
			});
		}

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$3.warn(`<Docs> was created with unknown prop '${key}'`);
		});

		$$self.$capture_state = () => ({ sq: sQuery, name, loadProc, Sqi: Sq_editorI, appendReload });
		return [];
	}

	class Docs extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Docs",
				options,
				id: create_fragment$4.name
			});
		}
	}

	/* src/Examples.svelte generated by Svelte v3.44.0 */

	const { console: console_1$2 } = globals;
	const file$2 = "src/Examples.svelte";

	function create_fragment$3(ctx) {
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
		let hr;
		let t8;
		let div3;
		let input;
		let t9;
		let div2;
		let t11;
		let section2;
		let div5;
		let t13;
		let div6;
		let t15;
		let div7;
		let t17;
		let br0;
		let br1;
		let br2;
		let br3;
		let br4;
		let br5;
		let br6;
		let br7;
		let t18;
		let div8;
		let span1;
		let t19;
		let section4;
		let h1;
		let span2;
		let t20;
		let div9;
		let t22;
		let doc0;
		let h20;
		let t24;
		let div10;
		let t26;
		let div13;
		let div12;
		let div11;
		let t27;
		let t28;
		let sqi0;
		let t29;
		let doc1;
		let h21;
		let t31;
		let div14;
		let t33;
		let div17;
		let div16;
		let div15;
		let t34;
		let t35;
		let sqi1;
		let current;

		sqi0 = new Sq_editorI({
				props: { cname: "fetch", mh: "410" },
				$$inline: true
			});

		sqi1 = new Sq_editorI({
				props: { cname: "axios", mh: "410" },
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
				hr = element("hr");
				t8 = space();
				div3 = element("div");
				input = element("input");
				t9 = space();
				div2 = element("div");
				div2.textContent = "×";
				t11 = space();
				section2 = element("section");
				div5 = element("div");
				div5.textContent = "Examples";
				t13 = space();
				div6 = element("div");
				div6.textContent = "fetch (alternative $.ajax)";
				t15 = space();
				div7 = element("div");
				div7.textContent = "axios (alternative $.ajax)";
				t17 = space();
				br0 = element("br");
				br1 = element("br");
				br2 = element("br");
				br3 = element("br");
				br4 = element("br");
				br5 = element("br");
				br6 = element("br");
				br7 = element("br");
				t18 = space();
				div8 = element("div");
				span1 = element("span");
				t19 = space();
				section4 = element("section");
				h1 = element("h1");
				span2 = element("span");
				t20 = text("sQuery Examples");
				div9 = element("div");
				div9.textContent = `${name}`;
				t22 = space();
				doc0 = element("doc");
				h20 = element("h2");
				h20.textContent = "fetch";
				t24 = space();
				div10 = element("div");
				div10.textContent = "In this example, I'm going to show you $.ajax like example using the ES6 native fetch function.";
				t26 = space();
				div13 = element("div");
				div12 = element("div");
				div11 = element("div");
				t27 = text("\n\t\t\t\t\tfetch");
				t28 = space();
				create_component(sqi0.$$.fragment);
				t29 = space();
				doc1 = element("doc");
				h21 = element("h2");
				h21.textContent = "axios";
				t31 = space();
				div14 = element("div");
				div14.textContent = "In this example, I'm going to show you $.ajax like example using axios.";
				t33 = space();
				div17 = element("div");
				div16 = element("div");
				div15 = element("div");
				t34 = text("\n\t\t\t\t\taxios");
				t35 = space();
				create_component(sqi1.$$.fragment);
				attr_dev(link0, "rel", "stylesheet");
				attr_dev(link0, "href", "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-tomorrow.min.css");
				add_location(link0, file$2, 33, 1, 685);
				if (!src_url_equal(script.src, script_src_value = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js")) attr_dev(script, "src", script_src_value);
				add_location(script, file$2, 34, 1, 799);
				attr_dev(link1, "rel", "stylesheet");
				attr_dev(link1, "href", "./Docs.css");
				add_location(link1, file$2, 35, 1, 889);
				attr_dev(span0, "id", "idDocNav");
				add_location(span0, file$2, 37, 2, 956);
				attr_dev(a0, "href", "https://squery-vercel-app.translate.goog/?&_x_tr_sl=auto&_x_tr_tl=ja&_x_tr_hl=en&_x_tr_pto=wapp#/examples");
				set_style(a0, "color", "#fff", 1);
				add_location(a0, file$2, 38, 45, 1029);
				set_style(div0, "float", "right");
				set_style(div0, "margin-right", "20px");
				add_location(div0, file$2, 38, 2, 986);
				attr_dev(section0, "id", "idHead");
				add_location(section0, file$2, 36, 1, 932);
				attr_dev(a1, "href", "./");
				set_style(a1, "color", "#fff");
				add_location(a1, file$2, 43, 44, 1300);
				attr_dev(div1, "id", "idLeftLogo");
				attr_dev(div1, "class", "notranslate");
				add_location(div1, file$2, 43, 3, 1259);
				add_location(hr, file$2, 46, 4, 1392);
				attr_dev(input, "id", "idDS");
				attr_dev(input, "type", "text");
				attr_dev(input, "placeholder", "search docs");
				attr_dev(input, "autocorrect", "off");
				attr_dev(input, "autocapitalize", "off");
				attr_dev(input, "spellcheck", "false");
				add_location(input, file$2, 48, 5, 1438);
				attr_dev(div2, "id", "idDSC");
				add_location(div2, file$2, 49, 5, 1557);
				set_style(div3, "position", "relative");
				add_location(div3, file$2, 47, 4, 1401);
				attr_dev(div4, "id", "idLeftSearchCont");
				add_location(div4, file$2, 45, 3, 1360);
				attr_dev(section1, "id", "idLeftTop");
				add_location(section1, file$2, 42, 2, 1231);
				attr_dev(div5, "name", "");
				attr_dev(div5, "class", "cSub");
				add_location(div5, file$2, 55, 3, 1657);
				attr_dev(div6, "name", "fetch");
				attr_dev(div6, "class", "cF notranslate");
				add_location(div6, file$2, 56, 3, 1701);
				attr_dev(div7, "name", "axios");
				attr_dev(div7, "class", "cF notranslate");
				add_location(div7, file$2, 57, 3, 1778);
				add_location(br0, file$2, 59, 3, 1857);
				add_location(br1, file$2, 59, 7, 1861);
				add_location(br2, file$2, 59, 11, 1865);
				add_location(br3, file$2, 59, 15, 1869);
				add_location(br4, file$2, 59, 19, 1873);
				add_location(br5, file$2, 59, 23, 1877);
				add_location(br6, file$2, 59, 27, 1881);
				add_location(br7, file$2, 59, 31, 1885);
				attr_dev(section2, "class", "cScrollable");
				add_location(section2, file$2, 54, 2, 1624);
				attr_dev(section3, "id", "idLeft");
				add_location(section3, file$2, 41, 1, 1207);
				add_location(span1, file$2, 64, 28, 1946);
				attr_dev(div8, "class", "menu__toggler");
				add_location(div8, file$2, 64, 1, 1919);
				add_location(div9, file$2, 67, 80, 2069);
				attr_dev(span2, "onclick", "location.href='./';");
				set_style(span2, "cursor", "pointer");
				add_location(span2, file$2, 67, 6, 1995);
				add_location(h1, file$2, 67, 2, 1991);
				attr_dev(h20, "class", "notranslate");
				add_location(h20, file$2, 70, 3, 2124);
				attr_dev(div10, "class", "cPreDesc");
				add_location(div10, file$2, 71, 3, 2162);
				attr_dev(div11, "class", "cBack");
				add_location(div11, file$2, 76, 5, 2334);
				attr_dev(div12, "class", "cDesc");
				add_location(div12, file$2, 75, 4, 2309);
				add_location(div13, file$2, 74, 3, 2299);
				attr_dev(doc0, "name", "fetch");
				add_location(doc0, file$2, 69, 2, 2102);
				attr_dev(h21, "class", "notranslate");
				add_location(h21, file$2, 85, 3, 2466);
				attr_dev(div14, "class", "cPreDesc");
				add_location(div14, file$2, 86, 3, 2504);
				attr_dev(div15, "class", "cBack");
				add_location(div15, file$2, 91, 5, 2652);
				attr_dev(div16, "class", "cDesc");
				add_location(div16, file$2, 90, 4, 2627);
				add_location(div17, file$2, 89, 3, 2617);
				attr_dev(doc1, "name", "axios");
				add_location(doc1, file$2, 84, 2, 2444);
				attr_dev(section4, "id", "idDoc");
				add_location(section4, file$2, 66, 1, 1968);
				add_location(main, file$2, 32, 0, 677);
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
				append_dev(div4, hr);
				append_dev(div4, t8);
				append_dev(div4, div3);
				append_dev(div3, input);
				append_dev(div3, t9);
				append_dev(div3, div2);
				append_dev(section3, t11);
				append_dev(section3, section2);
				append_dev(section2, div5);
				append_dev(section2, t13);
				append_dev(section2, div6);
				append_dev(section2, t15);
				append_dev(section2, div7);
				append_dev(section2, t17);
				append_dev(section2, br0);
				append_dev(section2, br1);
				append_dev(section2, br2);
				append_dev(section2, br3);
				append_dev(section2, br4);
				append_dev(section2, br5);
				append_dev(section2, br6);
				append_dev(section2, br7);
				append_dev(main, t18);
				append_dev(main, div8);
				append_dev(div8, span1);
				append_dev(main, t19);
				append_dev(main, section4);
				append_dev(section4, h1);
				append_dev(h1, span2);
				append_dev(span2, t20);
				append_dev(span2, div9);
				append_dev(section4, t22);
				append_dev(section4, doc0);
				append_dev(doc0, h20);
				append_dev(doc0, t24);
				append_dev(doc0, div10);
				append_dev(doc0, t26);
				append_dev(doc0, div13);
				append_dev(div13, div12);
				append_dev(div12, div11);
				append_dev(div12, t27);
				append_dev(div13, t28);
				mount_component(sqi0, div13, null);
				append_dev(section4, t29);
				append_dev(section4, doc1);
				append_dev(doc1, h21);
				append_dev(doc1, t31);
				append_dev(doc1, div14);
				append_dev(doc1, t33);
				append_dev(doc1, div17);
				append_dev(div17, div16);
				append_dev(div16, div15);
				append_dev(div16, t34);
				append_dev(div17, t35);
				mount_component(sqi1, div17, null);
				current = true;
			},
			p: noop,
			i: function intro(local) {
				if (current) return;
				transition_in(sqi0.$$.fragment, local);
				transition_in(sqi1.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(sqi0.$$.fragment, local);
				transition_out(sqi1.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) detach_dev(main);
				destroy_component(sqi0);
				destroy_component(sqi1);
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

	function instance$3($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Examples', slots, []);
		document.getElementsByTagName('body')[0].style.display = 'none';

		if (sQuery().isPageLoaded()) {
			console.log('spa loaded');

			setTimeout(
				() => {
					loadProc();
					appendReload();
				},
				1
			);
		}

		sQuery(() => {
			loadProc();
			appendReload();
		});

		function appendReload() {
			sQuery('.cDesc').each(function () {
				sQuery(this).append('<div class="cReload">reload</div>');
			});

			sQuery('.cReload').show();

			sQuery('.cReload').on('click', function () {
				const el = sQuery(this).parent().parent().find('iframe');
				el.attr('src', el.attr('src'));
			});
		}

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$2.warn(`<Examples> was created with unknown prop '${key}'`);
		});

		$$self.$capture_state = () => ({ sq: sQuery, name, loadProc, Sqi: Sq_editorI, appendReload });
		return [];
	}

	class Examples extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Examples",
				options,
				id: create_fragment$3.name
			});
		}
	}

	/* src/Install.svelte generated by Svelte v3.44.0 */

	const { console: console_1$1 } = globals;
	const file$1 = "src/Install.svelte";

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
		let br0;
		let br1;
		let br2;
		let br3;
		let br4;
		let br5;
		let br6;
		let br7;
		let t30;
		let div15;
		let span1;
		let t31;
		let section4;
		let h1;
		let span2;
		let t32;
		let div16;
		let t34;
		let doc0;
		let h20;
		let t36;
		let div17;
		let img0;
		let img0_src_value;
		let t37;
		let ul0;
		let li0;
		let t38;
		let a2;
		let t40;
		let t41;
		let li1;
		let t43;
		let li2;
		let t44;
		let a3;
		let t46;
		let t47;
		let div22;
		let div18;
		let t48;
		let br8;
		let br9;
		let t49;
		let br10;
		let br11;
		let t50;
		let t51;
		let a4;
		let t53;
		let div19;
		let t54;
		let br12;
		let br13;
		let t55;
		let br14;
		let br15;
		let t56;
		let t57;
		let hr1;
		let t58;
		let div20;
		let t60;
		let div21;
		let t62;
		let br16;
		let t63;
		let div23;
		let t64;
		let b0;
		let t66;
		let br17;
		let t67;
		let img1;
		let img1_src_value;
		let t68;
		let br18;
		let br19;
		let t69;
		let br20;
		let t70;
		let sqi0;
		let t71;
		let br21;
		let t72;
		let b1;
		let t74;
		let img2;
		let img2_src_value;
		let t75;
		let img3;
		let img3_src_value;
		let t76;
		let hr2;
		let t77;
		let b2;
		let t79;
		let b3;
		let t81;
		let br22;
		let br23;
		let t82;
		let sqi1;
		let t83;
		let img4;
		let img4_src_value;
		let t84;
		let img5;
		let img5_src_value;
		let t85;
		let doc1;
		let h21;
		let t87;
		let div24;
		let img6;
		let img6_src_value;
		let t88;
		let ul1;
		let li3;
		let t89;
		let a5;
		let t91;
		let t92;
		let li4;
		let t94;
		let li5;
		let t95;
		let a6;
		let t97;
		let t98;
		let div29;
		let div25;
		let t99;
		let br24;
		let br25;
		let t100;
		let br26;
		let br27;
		let t101;
		let br28;
		let t102;
		let hr3;
		let t103;
		let div26;
		let t105;
		let div27;
		let t107;
		let div28;
		let t109;
		let br29;
		let t110;
		let div30;
		let t111;
		let b4;
		let t113;
		let br30;
		let t114;
		let img7;
		let img7_src_value;
		let t115;
		let br31;
		let br32;
		let t116;
		let br33;
		let t117;
		let sqi2;
		let t118;
		let br34;
		let t119;
		let b5;
		let t121;
		let img8;
		let img8_src_value;
		let t122;
		let img9;
		let img9_src_value;
		let t123;
		let hr4;
		let t124;
		let b6;
		let t126;
		let b7;
		let t128;
		let br35;
		let br36;
		let t129;
		let sqi3;
		let t130;
		let img10;
		let img10_src_value;
		let t131;
		let img11;
		let img11_src_value;
		let t132;
		let doc2;
		let h22;
		let t134;
		let div31;
		let img12;
		let img12_src_value;
		let t135;
		let a7;
		let t137;
		let br37;
		let t138;
		let t139;
		let doc3;
		let h23;
		let t141;
		let div34;
		let img13;
		let img13_src_value;
		let t142;
		let a8;
		let t144;
		let div32;
		let t145;
		let br38;
		let t146;
		let br39;
		let t147;
		let br40;
		let t148;
		let t149;
		let div33;
		let t151;
		let sqi4;
		let t152;
		let sqi5;
		let t153;
		let doc4;
		let h24;
		let t155;
		let div35;
		let img14;
		let img14_src_value;
		let t156;
		let a9;
		let t158;
		let br41;
		let t159;
		let t160;
		let doc5;
		let h25;
		let t162;
		let div36;
		let img15;
		let img15_src_value;
		let t163;
		let a10;
		let t165;
		let br42;
		let t166;
		let current;

		sqi0 = new Sq_editorI({
				props: {
					cname: "reactScript",
					mh: "240",
					bOnlyCode: "1"
				},
				$$inline: true
			});

		sqi1 = new Sq_editorI({
				props: {
					cname: "reactModule",
					mh: "100",
					bOnlyCode: "1"
				},
				$$inline: true
			});

		sqi2 = new Sq_editorI({
				props: {
					cname: "nextScript",
					mh: "240",
					bOnlyCode: "1"
				},
				$$inline: true
			});

		sqi3 = new Sq_editorI({
				props: {
					cname: "nextModule",
					mh: "100",
					bOnlyCode: "1"
				},
				$$inline: true
			});

		sqi4 = new Sq_editorI({
				props: {
					cname: "svelteScript",
					mh: "240",
					bOnlyCode: "1"
				},
				$$inline: true
			});

		sqi5 = new Sq_editorI({
				props: {
					cname: "svelteModule",
					mh: "100",
					bOnlyCode: "1"
				},
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
				div6.textContent = "・Use with React";
				t15 = space();
				div7 = element("div");
				div7.textContent = "・Use with Next.js";
				t17 = space();
				div8 = element("div");
				div8.textContent = "・Use with Vue.js";
				t19 = space();
				div9 = element("div");
				div9.textContent = "・Use with Nuxt.js";
				t21 = space();
				div10 = element("div");
				div10.textContent = "・Use with Svelte";
				t23 = space();
				div11 = element("div");
				div11.textContent = "・Use with SvelteKit";
				t25 = space();
				div12 = element("div");
				div12.textContent = "・Use with SolidJS";
				t27 = space();
				div13 = element("div");
				div13.textContent = "・Use with Angular";
				t29 = space();
				br0 = element("br");
				br1 = element("br");
				br2 = element("br");
				br3 = element("br");
				br4 = element("br");
				br5 = element("br");
				br6 = element("br");
				br7 = element("br");
				t30 = space();
				div15 = element("div");
				span1 = element("span");
				t31 = space();
				section4 = element("section");
				h1 = element("h1");
				span2 = element("span");
				t32 = text("sQuery Install");
				div16 = element("div");
				div16.textContent = `${name}`;
				t34 = space();
				doc0 = element("doc");
				h20 = element("h2");
				h20.textContent = "Use with React";
				t36 = space();
				div17 = element("div");
				img0 = element("img");
				t37 = space();
				ul0 = element("ul");
				li0 = element("li");
				t38 = text("Download & install the latest ");
				a2 = element("a");
				a2.textContent = "node.js";
				t40 = text(" if you didn't install it yet.");
				t41 = space();
				li1 = element("li");
				li1.textContent = "Open the terminal (or Command Prompt if you use Windows), move to the directory anywhere you want to download a new react project using \"cd\" command or something";
				t43 = space();
				li2 = element("li");
				t44 = text("Follow the ");
				a3 = element("a");
				a3.textContent = "create-react-app";
				t46 = text(" tutorial or just try the following commands.");
				t47 = space();
				div22 = element("div");
				div18 = element("div");
				t48 = text("npx create-react-app@latest test");
				br8 = element("br");
				br9 = element("br");
				t49 = text("\n\t\t\t\t\tcd test");
				br10 = element("br");
				br11 = element("br");
				t50 = text("\n\t\t\t\t\tnpm start");
				t51 = text("\n\t\t\t\t*NOTE*: If you want to use ");
				a4 = element("a");
				a4.textContent = "TypeScript";
				t53 = text(", try this instead.\n\t\t\t\t");
				div19 = element("div");
				t54 = text("npx create-react-app@latest test --template typescript");
				br12 = element("br");
				br13 = element("br");
				t55 = text("\n\t\t\t\t\tcd test");
				br14 = element("br");
				br15 = element("br");
				t56 = text("\n\t\t\t\t\tnpm start");
				t57 = space();
				hr1 = element("hr");
				t58 = text("\n\n\t\t\t\tTo launch the site (development):\n\t\t\t\t");
				div20 = element("div");
				div20.textContent = "npm start";
				t60 = text("\n\n\t\t\t\tTo build the site (production):\n\t\t\t\t");
				div21 = element("div");
				div21.textContent = "npm run build";
				t62 = space();
				br16 = element("br");
				t63 = space();
				div23 = element("div");
				t64 = text("Now, you have a react project folder. Let's launch a local React server. You can launch and open the react site locally by just typing ");
				b0 = element("b");
				b0.textContent = "npm start";
				t66 = text(" in the terminal.");
				br17 = element("br");
				t67 = space();
				img1 = element("img");
				t68 = space();
				br18 = element("br");
				br19 = element("br");
				t69 = text("\n\t\t\t\tThe easiest way to implement sQuery in your React project is just directly adding your sQuery code to a .html file.");
				br20 = element("br");
				t70 = text("\n\t\t\t\tThis is just a sample sQuery code to try! (If you prefer the ES6's module style, it's also supported! Use sq.min.js instead!)\n\t\t\t\t");
				create_component(sqi0.$$.fragment);
				t71 = space();
				br21 = element("br");
				t72 = text("\n\t\t\t\tIn this case, I added the above code in index.html in ");
				b1 = element("b");
				b1.textContent = "public folder";
				t74 = text(".\n\t\t\t\t");
				img2 = element("img");
				t75 = text("\n\n\t\t\t\tIt works perfectly if you write all your sQuery codes only in the .html part.\n\t\t\t\t");
				img3 = element("img");
				t76 = space();
				hr2 = element("hr");
				t77 = text("\n\t\t\t\tIf you want to use sQuery in other parts such as inside React modules, I recommend the other way.\n\t\t\t\tYou need to add ");
				b2 = element("b");
				b2.textContent = "sq.js and sq.d.ts";
				t79 = text(" to your project folder. (In this case, ");
				b3 = element("b");
				b3.textContent = "src folder";
				t81 = text(")");
				br22 = element("br");
				br23 = element("br");
				t82 = text("\n\t\t\t\tThis is just a sample sQuery code to try!\n\t\t\t\t");
				create_component(sqi1.$$.fragment);
				t83 = space();
				img4 = element("img");
				t84 = space();
				img5 = element("img");
				t85 = space();
				doc1 = element("doc");
				h21 = element("h2");
				h21.textContent = "Use with Next.js";
				t87 = space();
				div24 = element("div");
				img6 = element("img");
				t88 = space();
				ul1 = element("ul");
				li3 = element("li");
				t89 = text("Download & install the latest ");
				a5 = element("a");
				a5.textContent = "node.js";
				t91 = text(" if you didn't install it yet.");
				t92 = space();
				li4 = element("li");
				li4.textContent = "Open the terminal (or Command Prompt if you use Windows), move to the directory anywhere you want to download a new react project using \"cd\" command or something";
				t94 = space();
				li5 = element("li");
				t95 = text("Follow the ");
				a6 = element("a");
				a6.textContent = "Create a Next.js App";
				t97 = text(" tutorial or just try the following commands.");
				t98 = space();
				div29 = element("div");
				div25 = element("div");
				t99 = text("npx create-next-app nextjs-blog --use-npm --example \"https://github.com/vercel/next-learn/tree/master/basics/learn-starter\"");
				br24 = element("br");
				br25 = element("br");
				t100 = text("\n\t\t\t\t\tcd nextjs-blog");
				br26 = element("br");
				br27 = element("br");
				t101 = text("\n\t\t\t\t\tnpm start");
				br28 = element("br");
				t102 = space();
				hr3 = element("hr");
				t103 = text("\n\n\t\t\t\tStarts the development server:\n\t\t\t\t");
				div26 = element("div");
				div26.textContent = "npm run dev";
				t105 = text("\n\t\t\t\t\n\t\t\t\tBuilds the app for production:\n\t\t\t\t");
				div27 = element("div");
				div27.textContent = "npm run build";
				t107 = text("\n\n\t\t\t\tRuns the built app in production mode:\n\t\t\t\t");
				div28 = element("div");
				div28.textContent = "npm start";
				t109 = space();
				br29 = element("br");
				t110 = space();
				div30 = element("div");
				t111 = text("Now, you have a Next.js project folder. Let's launch a local Next.js server. You can launch and open the Next.js site locally by just typing ");
				b4 = element("b");
				b4.textContent = "npm run dev";
				t113 = text(" in the terminal.");
				br30 = element("br");
				t114 = space();
				img7 = element("img");
				t115 = space();
				br31 = element("br");
				br32 = element("br");
				t116 = text("\n\t\t\t\tThe easiest way to implement sQuery in your Next.js project is just directly adding your sQuery code to a .html file.");
				br33 = element("br");
				t117 = text("\n\t\t\t\tThis is just a sample sQuery code to try! (If you prefer the ES6's module style, it's also supported! Use sq.min.js instead!)\n\t\t\t\t");
				create_component(sqi2.$$.fragment);
				t118 = space();
				br34 = element("br");
				t119 = text("\n\t\t\t\tIn this case, I added the above code in index.html in ");
				b5 = element("b");
				b5.textContent = "public folder";
				t121 = text(".\n\t\t\t\t");
				img8 = element("img");
				t122 = text("\n\n\t\t\t\tIt works perfectly if you write all your sQuery codes only in the .html part.\n\t\t\t\t");
				img9 = element("img");
				t123 = space();
				hr4 = element("hr");
				t124 = text("\n\t\t\t\tIf you want to use sQuery in other parts such as inside React modules, I recommend the other way.\n\t\t\t\tYou need to add ");
				b6 = element("b");
				b6.textContent = "sq.js and sq.d.ts";
				t126 = text(" to your project folder. (In this case, ");
				b7 = element("b");
				b7.textContent = "src folder";
				t128 = text(")");
				br35 = element("br");
				br36 = element("br");
				t129 = text("\n\t\t\t\tThis is just a sample sQuery code to try!\n\t\t\t\t");
				create_component(sqi3.$$.fragment);
				t130 = space();
				img10 = element("img");
				t131 = space();
				img11 = element("img");
				t132 = space();
				doc2 = element("doc");
				h22 = element("h2");
				h22.textContent = "Use with Vue.js";
				t134 = space();
				div31 = element("div");
				img12 = element("img");
				t135 = text("\n\t\t\t\tGo to see the ");
				a7 = element("a");
				a7.textContent = "official installation guide";
				t137 = text(" for now.");
				br37 = element("br");
				t138 = text("\n\t\t\t\tI'll update this section soon!");
				t139 = space();
				doc3 = element("doc");
				h23 = element("h2");
				h23.textContent = "Use with Svelte";
				t141 = space();
				div34 = element("div");
				img13 = element("img");
				t142 = text("\n\t\t\t\tSvelte requires node.js. Install ");
				a8 = element("a");
				a8.textContent = "node.js";
				t144 = text(".\n\t\t\t\t");
				div32 = element("div");
				t145 = text("npm create svelte@latest my-app");
				br38 = element("br");
				t146 = text("\n\t\t\t\t\tcd my-app");
				br39 = element("br");
				t147 = text("\n\t\t\t\t\tnpm install");
				br40 = element("br");
				t148 = text("\n\t\t\t\t\tnpm run dev -- --open");
				t149 = space();
				div33 = element("div");
				div33.textContent = "The easiest way to implement sQuery is just adding the following code to the DOM part.";
				t151 = space();
				create_component(sqi4.$$.fragment);
				t152 = text("\n\t\t\t\tor you can also do with the module version!\n\t\t\t\t");
				create_component(sqi5.$$.fragment);
				t153 = space();
				doc4 = element("doc");
				h24 = element("h2");
				h24.textContent = "Use with SolidJS";
				t155 = space();
				div35 = element("div");
				img14 = element("img");
				t156 = text("\n\t\t\t\tGo to see the ");
				a9 = element("a");
				a9.textContent = "official installation guide";
				t158 = text(" for now.");
				br41 = element("br");
				t159 = text("\n\t\t\t\tI'll update this section soon!");
				t160 = space();
				doc5 = element("doc");
				h25 = element("h2");
				h25.textContent = "Use with Angular";
				t162 = space();
				div36 = element("div");
				img15 = element("img");
				t163 = text("\n\t\t\t\tGo to see the ");
				a10 = element("a");
				a10.textContent = "official installation guide";
				t165 = text(" for now.");
				br42 = element("br");
				t166 = text("\n\t\t\t\tI'll update this section soon!");
				attr_dev(link0, "rel", "stylesheet");
				attr_dev(link0, "href", "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-tomorrow.min.css");
				add_location(link0, file$1, 39, 1, 916);
				if (!src_url_equal(script.src, script_src_value = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js")) attr_dev(script, "src", script_src_value);
				add_location(script, file$1, 40, 1, 1030);
				attr_dev(link1, "rel", "stylesheet");
				attr_dev(link1, "href", "./Docs.css");
				add_location(link1, file$1, 41, 1, 1120);
				attr_dev(span0, "id", "idDocNav");
				add_location(span0, file$1, 43, 2, 1187);
				attr_dev(a0, "href", "https://squery-vercel-app.translate.goog/?&_x_tr_sl=auto&_x_tr_tl=ja&_x_tr_hl=en&_x_tr_pto=wapp#/docs");
				set_style(a0, "color", "#fff", 1);
				add_location(a0, file$1, 44, 45, 1260);
				set_style(div0, "float", "right");
				set_style(div0, "margin-right", "20px");
				add_location(div0, file$1, 44, 2, 1217);
				attr_dev(section0, "id", "idHead");
				add_location(section0, file$1, 42, 1, 1163);
				attr_dev(a1, "href", "./");
				set_style(a1, "color", "#fff");
				add_location(a1, file$1, 49, 44, 1527);
				attr_dev(div1, "id", "idLeftLogo");
				attr_dev(div1, "class", "notranslate");
				add_location(div1, file$1, 49, 3, 1486);
				add_location(hr0, file$1, 52, 4, 1619);
				attr_dev(input, "id", "idDS");
				attr_dev(input, "type", "text");
				attr_dev(input, "placeholder", "search");
				attr_dev(input, "autocorrect", "off");
				attr_dev(input, "autocapitalize", "off");
				attr_dev(input, "spellcheck", "false");
				add_location(input, file$1, 54, 5, 1665);
				attr_dev(div2, "id", "idDSC");
				add_location(div2, file$1, 55, 5, 1779);
				set_style(div3, "position", "relative");
				add_location(div3, file$1, 53, 4, 1628);
				attr_dev(div4, "id", "idLeftSearchCont");
				add_location(div4, file$1, 51, 3, 1587);
				attr_dev(section1, "id", "idLeftTop");
				add_location(section1, file$1, 48, 2, 1458);
				attr_dev(div5, "name", "");
				attr_dev(div5, "class", "cSub");
				add_location(div5, file$1, 62, 4, 1913);
				attr_dev(div6, "name", "Use_with_React");
				attr_dev(div6, "class", "cF");
				add_location(div6, file$1, 63, 4, 1965);
				attr_dev(div7, "name", "Use_with_Next");
				attr_dev(div7, "class", "cF");
				add_location(div7, file$1, 64, 4, 2029);
				attr_dev(div8, "name", "Use_with_Vue");
				attr_dev(div8, "class", "cF");
				add_location(div8, file$1, 65, 4, 2094);
				attr_dev(div9, "name", "Use_with_Nuxt.js");
				attr_dev(div9, "class", "cF");
				add_location(div9, file$1, 66, 4, 2157);
				attr_dev(div10, "name", "Use_with_Svelte");
				attr_dev(div10, "class", "cF");
				add_location(div10, file$1, 67, 4, 2225);
				attr_dev(div11, "name", "Use_with_SveltekitKit");
				attr_dev(div11, "class", "cF");
				add_location(div11, file$1, 68, 4, 2291);
				attr_dev(div12, "name", "Use_with_SolidJS");
				attr_dev(div12, "class", "cF");
				add_location(div12, file$1, 69, 4, 2366);
				attr_dev(div13, "name", "Use_with_Angular");
				attr_dev(div13, "class", "cF");
				add_location(div13, file$1, 70, 4, 2434);
				set_style(div14, "font-weight", "300");
				add_location(div14, file$1, 61, 3, 1879);
				add_location(br0, file$1, 73, 3, 2513);
				add_location(br1, file$1, 73, 7, 2517);
				add_location(br2, file$1, 73, 11, 2521);
				add_location(br3, file$1, 73, 15, 2525);
				add_location(br4, file$1, 73, 19, 2529);
				add_location(br5, file$1, 73, 23, 2533);
				add_location(br6, file$1, 73, 27, 2537);
				add_location(br7, file$1, 73, 31, 2541);
				attr_dev(section2, "class", "cScrollable");
				add_location(section2, file$1, 60, 2, 1846);
				attr_dev(section3, "id", "idLeft");
				add_location(section3, file$1, 47, 1, 1434);
				add_location(span1, file$1, 78, 28, 2602);
				attr_dev(div15, "class", "menu__toggler");
				add_location(div15, file$1, 78, 1, 2575);
				add_location(div16, file$1, 81, 79, 2724);
				attr_dev(span2, "onclick", "location.href='./';");
				set_style(span2, "cursor", "pointer");
				add_location(span2, file$1, 81, 6, 2651);
				add_location(h1, file$1, 81, 2, 2647);
				add_location(h20, file$1, 84, 3, 2788);
				attr_dev(img0, "class", "cFWLogo");
				if (!src_url_equal(img0.src, img0_src_value = "img/react.png")) attr_dev(img0, "src", img0_src_value);
				attr_dev(img0, "alt", "React.js");
				attr_dev(img0, "title", "React.js");
				add_location(img0, file$1, 87, 4, 2843);
				attr_dev(a2, "href", "https://nodejs.org/");
				attr_dev(a2, "target", "_blank");
				add_location(a2, file$1, 89, 39, 3044);
				add_location(li0, file$1, 89, 5, 3010);
				add_location(li1, file$1, 90, 5, 3142);
				attr_dev(a3, "href", "https://create-react-app.dev/docs/getting-started");
				attr_dev(a3, "target", "_blank");
				add_location(a3, file$1, 91, 20, 3333);
				add_location(li2, file$1, 91, 5, 3318);
				set_style(ul0, "list-style-type", "decimal");
				set_style(ul0, "margin-left", "30px");
				set_style(ul0, "line-height", "2");
				set_style(ul0, "font-size", "13px");
				add_location(ul0, file$1, 88, 4, 2921);
				attr_dev(div17, "class", "cPreDesc");
				add_location(div17, file$1, 86, 3, 2816);
				add_location(br8, file$1, 97, 37, 3585);
				add_location(br9, file$1, 97, 41, 3589);
				add_location(br10, file$1, 98, 12, 3606);
				add_location(br11, file$1, 98, 16, 3610);
				attr_dev(div18, "class", "cSh notranslate");
				add_location(div18, file$1, 96, 4, 3518);
				attr_dev(a4, "href", "https://www.typescriptlang.org/");
				attr_dev(a4, "target", "_blank");
				add_location(a4, file$1, 101, 31, 3672);
				add_location(br12, file$1, 103, 59, 3855);
				add_location(br13, file$1, 103, 63, 3859);
				add_location(br14, file$1, 104, 12, 3876);
				add_location(br15, file$1, 104, 16, 3880);
				attr_dev(div19, "class", "cSh notranslate");
				add_location(div19, file$1, 102, 4, 3766);
				add_location(hr1, file$1, 108, 4, 3916);
				attr_dev(div20, "class", "cSh notranslate");
				add_location(div20, file$1, 111, 4, 3964);
				attr_dev(div21, "class", "cSh notranslate");
				add_location(div21, file$1, 116, 4, 4061);
				add_location(div22, file$1, 95, 3, 3508);
				add_location(br16, file$1, 120, 3, 4134);
				add_location(b0, file$1, 122, 139, 4287);
				add_location(br17, file$1, 122, 172, 4320);
				attr_dev(img1, "class", "cImg");
				attr_dev(img1, "alt", "react install");
				if (!src_url_equal(img1.src, img1_src_value = "img/tutorial/react/1.png")) attr_dev(img1, "src", img1_src_value);
				add_location(img1, file$1, 123, 4, 4329);
				add_location(br18, file$1, 124, 4, 4403);
				add_location(br19, file$1, 124, 8, 4407);
				add_location(br20, file$1, 125, 119, 4531);
				add_location(br21, file$1, 129, 4, 4730);
				add_location(b1, file$1, 130, 58, 4793);
				attr_dev(img2, "class", "cImg");
				attr_dev(img2, "alt", "react install");
				if (!src_url_equal(img2.src, img2_src_value = "img/tutorial/react/script/1.png")) attr_dev(img2, "src", img2_src_value);
				add_location(img2, file$1, 131, 4, 4819);
				attr_dev(img3, "class", "cImg");
				attr_dev(img3, "alt", "react install");
				if (!src_url_equal(img3.src, img3_src_value = "img/tutorial/react/script/2.png")) attr_dev(img3, "src", img3_src_value);
				add_location(img3, file$1, 134, 4, 4983);
				add_location(hr2, file$1, 135, 4, 5064);
				add_location(b2, file$1, 137, 20, 5191);
				add_location(b3, file$1, 137, 84, 5255);
				add_location(br22, file$1, 137, 102, 5273);
				add_location(br23, file$1, 137, 106, 5277);
				attr_dev(img4, "class", "cImg");
				attr_dev(img4, "alt", "react install");
				if (!src_url_equal(img4.src, img4_src_value = "img/tutorial/react/module/1.png")) attr_dev(img4, "src", img4_src_value);
				add_location(img4, file$1, 140, 4, 5391);
				attr_dev(img5, "class", "cImg");
				attr_dev(img5, "alt", "react install");
				if (!src_url_equal(img5.src, img5_src_value = "img/tutorial/react/module/2.png")) attr_dev(img5, "src", img5_src_value);
				add_location(img5, file$1, 141, 4, 5472);
				add_location(div23, file$1, 121, 3, 4142);
				attr_dev(doc0, "name", "Use_with_React");
				add_location(doc0, file$1, 83, 2, 2757);
				add_location(h21, file$1, 146, 3, 5601);
				attr_dev(img6, "class", "cFWLogo");
				if (!src_url_equal(img6.src, img6_src_value = "img/react.png")) attr_dev(img6, "src", img6_src_value);
				attr_dev(img6, "alt", "React.js");
				attr_dev(img6, "title", "React.js");
				add_location(img6, file$1, 149, 4, 5658);
				attr_dev(a5, "href", "https://nodejs.org/");
				attr_dev(a5, "target", "_blank");
				add_location(a5, file$1, 151, 39, 5859);
				add_location(li3, file$1, 151, 5, 5825);
				add_location(li4, file$1, 152, 5, 5957);
				attr_dev(a6, "href", "https://nextjs.org/learn/basics/create-nextjs-app/setup");
				attr_dev(a6, "target", "_blank");
				add_location(a6, file$1, 153, 20, 6148);
				add_location(li5, file$1, 153, 5, 6133);
				set_style(ul1, "list-style-type", "decimal");
				set_style(ul1, "margin-left", "30px");
				set_style(ul1, "line-height", "2");
				set_style(ul1, "font-size", "13px");
				add_location(ul1, file$1, 150, 4, 5736);
				attr_dev(div24, "class", "cPreDesc");
				add_location(div24, file$1, 148, 3, 5631);
				add_location(br24, file$1, 159, 128, 6501);
				add_location(br25, file$1, 159, 132, 6505);
				add_location(br26, file$1, 160, 19, 6529);
				add_location(br27, file$1, 160, 23, 6533);
				add_location(br28, file$1, 161, 14, 6552);
				attr_dev(div25, "class", "cSh notranslate");
				add_location(div25, file$1, 158, 4, 6343);
				add_location(hr3, file$1, 164, 4, 6573);
				attr_dev(div26, "class", "cSh notranslate");
				add_location(div26, file$1, 167, 4, 6618);
				attr_dev(div27, "class", "cSh notranslate");
				add_location(div27, file$1, 170, 4, 6709);
				attr_dev(div28, "class", "cSh notranslate");
				add_location(div28, file$1, 173, 4, 6806);
				add_location(div29, file$1, 157, 3, 6333);
				add_location(br29, file$1, 175, 3, 6864);
				add_location(b4, file$1, 177, 145, 7023);
				add_location(br30, file$1, 177, 180, 7058);
				attr_dev(img7, "class", "cImg");
				attr_dev(img7, "alt", "install");
				if (!src_url_equal(img7.src, img7_src_value = "img/tutorial/next/1.png")) attr_dev(img7, "src", img7_src_value);
				add_location(img7, file$1, 178, 4, 7067);
				add_location(br31, file$1, 179, 4, 7134);
				add_location(br32, file$1, 179, 8, 7138);
				add_location(br33, file$1, 180, 121, 7264);
				add_location(br34, file$1, 184, 4, 7462);
				add_location(b5, file$1, 185, 58, 7525);
				attr_dev(img8, "class", "cImg");
				attr_dev(img8, "alt", "Next.js install");
				if (!src_url_equal(img8.src, img8_src_value = "img/tutorial/next/script/1.png")) attr_dev(img8, "src", img8_src_value);
				add_location(img8, file$1, 186, 4, 7551);
				attr_dev(img9, "class", "cImg");
				attr_dev(img9, "alt", "Next.js install");
				if (!src_url_equal(img9.src, img9_src_value = "img/tutorial/next/script/2.png")) attr_dev(img9, "src", img9_src_value);
				add_location(img9, file$1, 189, 4, 7716);
				add_location(hr4, file$1, 190, 4, 7798);
				add_location(b6, file$1, 192, 20, 7925);
				add_location(b7, file$1, 192, 84, 7989);
				add_location(br35, file$1, 192, 102, 8007);
				add_location(br36, file$1, 192, 106, 8011);
				attr_dev(img10, "class", "cImg");
				attr_dev(img10, "alt", "Next.js install");
				if (!src_url_equal(img10.src, img10_src_value = "img/tutorial/next/module/1.png")) attr_dev(img10, "src", img10_src_value);
				add_location(img10, file$1, 195, 4, 8124);
				attr_dev(img11, "class", "cImg");
				attr_dev(img11, "alt", "Next.js install");
				if (!src_url_equal(img11.src, img11_src_value = "img/tutorial/next/module/2.png")) attr_dev(img11, "src", img11_src_value);
				add_location(img11, file$1, 196, 4, 8206);
				add_location(div30, file$1, 176, 3, 6872);
				attr_dev(doc1, "name", "Use_with_Next");
				add_location(doc1, file$1, 145, 2, 5571);
				add_location(h22, file$1, 201, 3, 8335);
				attr_dev(img12, "class", "cFWLogo");
				if (!src_url_equal(img12.src, img12_src_value = "img/vuejs.png")) attr_dev(img12, "src", img12_src_value);
				attr_dev(img12, "alt", "Vue.js");
				attr_dev(img12, "title", "Vue.js");
				add_location(img12, file$1, 203, 4, 8390);
				attr_dev(a7, "href", "https://vuejs.org/guide/quick-start.html");
				attr_dev(a7, "target", "_blank");
				add_location(a7, file$1, 204, 18, 8478);
				add_location(br37, file$1, 204, 125, 8585);
				attr_dev(div31, "class", "cPreDesc");
				add_location(div31, file$1, 202, 3, 8363);
				attr_dev(doc2, "name", "Use_with_Vue");
				add_location(doc2, file$1, 200, 2, 8306);
				add_location(h23, file$1, 210, 3, 8679);
				attr_dev(img13, "class", "cFWLogo");
				if (!src_url_equal(img13.src, img13_src_value = "img/svelte.png")) attr_dev(img13, "src", img13_src_value);
				attr_dev(img13, "alt", "Svelte");
				attr_dev(img13, "title", "Svelte");
				add_location(img13, file$1, 212, 4, 8734);
				attr_dev(a8, "href", "https://nodejs.org/");
				attr_dev(a8, "target", "_blank");
				add_location(a8, file$1, 213, 37, 8842);
				add_location(br38, file$1, 215, 36, 8969);
				add_location(br39, file$1, 216, 14, 8988);
				add_location(br40, file$1, 217, 16, 9009);
				attr_dev(div32, "class", "cSh notranslate");
				add_location(div32, file$1, 214, 4, 8903);
				add_location(div33, file$1, 221, 4, 9057);
				attr_dev(div34, "class", "cPreDesc");
				add_location(div34, file$1, 211, 3, 8707);
				attr_dev(doc3, "name", "Use_with_Svelte");
				add_location(doc3, file$1, 209, 2, 8647);
				add_location(h24, file$1, 233, 3, 9397);
				attr_dev(img14, "class", "cFWLogo");
				if (!src_url_equal(img14.src, img14_src_value = "img/solidjs.jpg")) attr_dev(img14, "src", img14_src_value);
				attr_dev(img14, "alt", "SolidJS");
				attr_dev(img14, "title", "SolidJS");
				add_location(img14, file$1, 235, 4, 9453);
				attr_dev(a9, "href", "https://vuejs.org/guide/quick-start.html");
				attr_dev(a9, "target", "_blank");
				add_location(a9, file$1, 236, 18, 9545);
				add_location(br41, file$1, 236, 125, 9652);
				attr_dev(div35, "class", "cPreDesc");
				add_location(div35, file$1, 234, 3, 9426);
				attr_dev(doc4, "name", "Use_with_SolidJS");
				add_location(doc4, file$1, 232, 2, 9364);
				add_location(h25, file$1, 242, 3, 9747);
				attr_dev(img15, "class", "cFWLogo");
				if (!src_url_equal(img15.src, img15_src_value = "img/angular.png")) attr_dev(img15, "src", img15_src_value);
				attr_dev(img15, "alt", "Angular");
				attr_dev(img15, "title", "Angular");
				add_location(img15, file$1, 244, 4, 9803);
				attr_dev(a10, "href", "https://vuejs.org/guide/quick-start.html");
				attr_dev(a10, "target", "_blank");
				add_location(a10, file$1, 245, 18, 9895);
				add_location(br42, file$1, 245, 125, 10002);
				attr_dev(div36, "class", "cPreDesc");
				add_location(div36, file$1, 243, 3, 9776);
				attr_dev(doc5, "name", "Use_with_Angular");
				add_location(doc5, file$1, 241, 2, 9714);
				attr_dev(section4, "id", "idDoc");
				add_location(section4, file$1, 80, 1, 2624);
				add_location(main, file$1, 38, 0, 908);
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
				append_dev(section2, br0);
				append_dev(section2, br1);
				append_dev(section2, br2);
				append_dev(section2, br3);
				append_dev(section2, br4);
				append_dev(section2, br5);
				append_dev(section2, br6);
				append_dev(section2, br7);
				append_dev(main, t30);
				append_dev(main, div15);
				append_dev(div15, span1);
				append_dev(main, t31);
				append_dev(main, section4);
				append_dev(section4, h1);
				append_dev(h1, span2);
				append_dev(span2, t32);
				append_dev(span2, div16);
				append_dev(section4, t34);
				append_dev(section4, doc0);
				append_dev(doc0, h20);
				append_dev(doc0, t36);
				append_dev(doc0, div17);
				append_dev(div17, img0);
				append_dev(div17, t37);
				append_dev(div17, ul0);
				append_dev(ul0, li0);
				append_dev(li0, t38);
				append_dev(li0, a2);
				append_dev(li0, t40);
				append_dev(ul0, t41);
				append_dev(ul0, li1);
				append_dev(ul0, t43);
				append_dev(ul0, li2);
				append_dev(li2, t44);
				append_dev(li2, a3);
				append_dev(li2, t46);
				append_dev(doc0, t47);
				append_dev(doc0, div22);
				append_dev(div22, div18);
				append_dev(div18, t48);
				append_dev(div18, br8);
				append_dev(div18, br9);
				append_dev(div18, t49);
				append_dev(div18, br10);
				append_dev(div18, br11);
				append_dev(div18, t50);
				append_dev(div22, t51);
				append_dev(div22, a4);
				append_dev(div22, t53);
				append_dev(div22, div19);
				append_dev(div19, t54);
				append_dev(div19, br12);
				append_dev(div19, br13);
				append_dev(div19, t55);
				append_dev(div19, br14);
				append_dev(div19, br15);
				append_dev(div19, t56);
				append_dev(div22, t57);
				append_dev(div22, hr1);
				append_dev(div22, t58);
				append_dev(div22, div20);
				append_dev(div22, t60);
				append_dev(div22, div21);
				append_dev(doc0, t62);
				append_dev(doc0, br16);
				append_dev(doc0, t63);
				append_dev(doc0, div23);
				append_dev(div23, t64);
				append_dev(div23, b0);
				append_dev(div23, t66);
				append_dev(div23, br17);
				append_dev(div23, t67);
				append_dev(div23, img1);
				append_dev(div23, t68);
				append_dev(div23, br18);
				append_dev(div23, br19);
				append_dev(div23, t69);
				append_dev(div23, br20);
				append_dev(div23, t70);
				mount_component(sqi0, div23, null);
				append_dev(div23, t71);
				append_dev(div23, br21);
				append_dev(div23, t72);
				append_dev(div23, b1);
				append_dev(div23, t74);
				append_dev(div23, img2);
				append_dev(div23, t75);
				append_dev(div23, img3);
				append_dev(div23, t76);
				append_dev(div23, hr2);
				append_dev(div23, t77);
				append_dev(div23, b2);
				append_dev(div23, t79);
				append_dev(div23, b3);
				append_dev(div23, t81);
				append_dev(div23, br22);
				append_dev(div23, br23);
				append_dev(div23, t82);
				mount_component(sqi1, div23, null);
				append_dev(div23, t83);
				append_dev(div23, img4);
				append_dev(div23, t84);
				append_dev(div23, img5);
				append_dev(section4, t85);
				append_dev(section4, doc1);
				append_dev(doc1, h21);
				append_dev(doc1, t87);
				append_dev(doc1, div24);
				append_dev(div24, img6);
				append_dev(div24, t88);
				append_dev(div24, ul1);
				append_dev(ul1, li3);
				append_dev(li3, t89);
				append_dev(li3, a5);
				append_dev(li3, t91);
				append_dev(ul1, t92);
				append_dev(ul1, li4);
				append_dev(ul1, t94);
				append_dev(ul1, li5);
				append_dev(li5, t95);
				append_dev(li5, a6);
				append_dev(li5, t97);
				append_dev(doc1, t98);
				append_dev(doc1, div29);
				append_dev(div29, div25);
				append_dev(div25, t99);
				append_dev(div25, br24);
				append_dev(div25, br25);
				append_dev(div25, t100);
				append_dev(div25, br26);
				append_dev(div25, br27);
				append_dev(div25, t101);
				append_dev(div25, br28);
				append_dev(div29, t102);
				append_dev(div29, hr3);
				append_dev(div29, t103);
				append_dev(div29, div26);
				append_dev(div29, t105);
				append_dev(div29, div27);
				append_dev(div29, t107);
				append_dev(div29, div28);
				append_dev(doc1, t109);
				append_dev(doc1, br29);
				append_dev(doc1, t110);
				append_dev(doc1, div30);
				append_dev(div30, t111);
				append_dev(div30, b4);
				append_dev(div30, t113);
				append_dev(div30, br30);
				append_dev(div30, t114);
				append_dev(div30, img7);
				append_dev(div30, t115);
				append_dev(div30, br31);
				append_dev(div30, br32);
				append_dev(div30, t116);
				append_dev(div30, br33);
				append_dev(div30, t117);
				mount_component(sqi2, div30, null);
				append_dev(div30, t118);
				append_dev(div30, br34);
				append_dev(div30, t119);
				append_dev(div30, b5);
				append_dev(div30, t121);
				append_dev(div30, img8);
				append_dev(div30, t122);
				append_dev(div30, img9);
				append_dev(div30, t123);
				append_dev(div30, hr4);
				append_dev(div30, t124);
				append_dev(div30, b6);
				append_dev(div30, t126);
				append_dev(div30, b7);
				append_dev(div30, t128);
				append_dev(div30, br35);
				append_dev(div30, br36);
				append_dev(div30, t129);
				mount_component(sqi3, div30, null);
				append_dev(div30, t130);
				append_dev(div30, img10);
				append_dev(div30, t131);
				append_dev(div30, img11);
				append_dev(section4, t132);
				append_dev(section4, doc2);
				append_dev(doc2, h22);
				append_dev(doc2, t134);
				append_dev(doc2, div31);
				append_dev(div31, img12);
				append_dev(div31, t135);
				append_dev(div31, a7);
				append_dev(div31, t137);
				append_dev(div31, br37);
				append_dev(div31, t138);
				append_dev(section4, t139);
				append_dev(section4, doc3);
				append_dev(doc3, h23);
				append_dev(doc3, t141);
				append_dev(doc3, div34);
				append_dev(div34, img13);
				append_dev(div34, t142);
				append_dev(div34, a8);
				append_dev(div34, t144);
				append_dev(div34, div32);
				append_dev(div32, t145);
				append_dev(div32, br38);
				append_dev(div32, t146);
				append_dev(div32, br39);
				append_dev(div32, t147);
				append_dev(div32, br40);
				append_dev(div32, t148);
				append_dev(div34, t149);
				append_dev(div34, div33);
				append_dev(div34, t151);
				mount_component(sqi4, div34, null);
				append_dev(div34, t152);
				mount_component(sqi5, div34, null);
				append_dev(section4, t153);
				append_dev(section4, doc4);
				append_dev(doc4, h24);
				append_dev(doc4, t155);
				append_dev(doc4, div35);
				append_dev(div35, img14);
				append_dev(div35, t156);
				append_dev(div35, a9);
				append_dev(div35, t158);
				append_dev(div35, br41);
				append_dev(div35, t159);
				append_dev(section4, t160);
				append_dev(section4, doc5);
				append_dev(doc5, h25);
				append_dev(doc5, t162);
				append_dev(doc5, div36);
				append_dev(div36, img15);
				append_dev(div36, t163);
				append_dev(div36, a10);
				append_dev(div36, t165);
				append_dev(div36, br42);
				append_dev(div36, t166);
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
				current = true;
			},
			o: function outro(local) {
				transition_out(sqi0.$$.fragment, local);
				transition_out(sqi1.$$.fragment, local);
				transition_out(sqi2.$$.fragment, local);
				transition_out(sqi3.$$.fragment, local);
				transition_out(sqi4.$$.fragment, local);
				transition_out(sqi5.$$.fragment, local);
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
		validate_slots('Install', slots, []);
		document.getElementsByTagName('body')[0].style.display = 'none';

		if (sQuery().isPageLoaded()) {
			console.log('spa loaded');

			setTimeout(
				() => {
					loadProc(false);
					appendReload();
				},
				1
			);
		}

		sQuery(() => {
			loadProc(false);

			setTimeout(
				() => {
					sQuery('.cJQVer').each(function () {
						const v = sQuery(this).attr('v');
						sQuery(this).html(`<a href="https://api.jquery.com/${v}" target=_blank class="notranslate">jQuery ${v}(doc)</a>`);
					});

					appendReload();
				},
				100
			);
		});

		function appendReload() {
			sQuery('.cDesc').each(function () {
				sQuery(this).append('<div class="cReload">reload</div>');
			});

			sQuery('.cReload').show();

			sQuery('.cReload').on('click', function () {
				const el = sQuery(this).parent().parent().find('iframe');
				el.attr('src', el.attr('src'));
			});
		}

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<Install> was created with unknown prop '${key}'`);
		});

		$$self.$capture_state = () => ({ sq: sQuery, name, loadProc, Sqi: Sq_editorI, appendReload });
		return [];
	}

	class Install extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Install",
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
			'/examples': Examples,
			'/install': Install,
			'/sq': Sq_editor,
			'/sqi': Sq_editorI,
			'*': Home
		};

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
		});

		$$self.$capture_state = () => ({
			Router,
			Home,
			Docs,
			Examples,
			Install,
			Sq: Sq_editor,
			Sqi: Sq_editorI,
			routes
		});

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
