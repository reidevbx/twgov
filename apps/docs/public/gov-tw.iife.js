var GovTW=(function(n){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=globalThis,Y=B.ShadowRoot&&(B.ShadyCSS===void 0||B.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol(),nt=new WeakMap;let at=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==Q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Y&&t===void 0){const o=e!==void 0&&e.length===1;o&&(t=nt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&nt.set(e,t))}return t}toString(){return this.cssText}};const St=i=>new at(typeof i=="string"?i:i+"",void 0,Q),w=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((o,r,s)=>o+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[s+1],i[0]);return new at(e,i,Q)},At=(i,t)=>{if(Y)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const o=document.createElement("style"),r=B.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=e.cssText,i.appendChild(o)}},lt=Y?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return St(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Gt,defineProperty:Ct,getOwnPropertyDescriptor:Et,getOwnPropertyNames:Ot,getOwnPropertySymbols:Pt,getPrototypeOf:Tt}=Object,H=globalThis,ct=H.trustedTypes,Rt=ct?ct.emptyScript:"",zt=H.reactiveElementPolyfillSupport,z=(i,t)=>i,L={toAttribute(i,t){switch(t){case Boolean:i=i?Rt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},X=(i,t)=>!Gt(i,t),dt={attribute:!0,type:String,converter:L,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??=Symbol("metadata"),H.litPropertyMetadata??=new WeakMap;let O=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=dt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(t,o,e);r!==void 0&&Ct(this.prototype,t,r)}}static getPropertyDescriptor(t,e,o){const{get:r,set:s}=Et(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:r,set(a){const h=r?.call(this);s?.call(this,a),this.requestUpdate(t,h,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??dt}static _$Ei(){if(this.hasOwnProperty(z("elementProperties")))return;const t=Tt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(z("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(z("properties"))){const e=this.properties,o=[...Ot(e),...Pt(e)];for(const r of o)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[o,r]of e)this.elementProperties.set(o,r)}this._$Eh=new Map;for(const[e,o]of this.elementProperties){const r=this._$Eu(e,o);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const r of o)e.unshift(lt(r))}else t!==void 0&&e.push(lt(t));return e}static _$Eu(t,e){const o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return At(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,o);if(r!==void 0&&o.reflect===!0){const s=(o.converter?.toAttribute!==void 0?o.converter:L).toAttribute(e,o.type);this._$Em=t,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const o=this.constructor,r=o._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const s=o.getPropertyOptions(r),a=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:L;this._$Em=r;const h=a.fromAttribute(e,s.type);this[r]=h??this._$Ej?.get(r)??h,this._$Em=null}}requestUpdate(t,e,o,r=!1,s){if(t!==void 0){const a=this.constructor;if(r===!1&&(s=this[t]),o??=a.getPropertyOptions(t),!((o.hasChanged??X)(s,e)||o.useDefault&&o.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,o))))return;this.C(t,e,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:r,wrapped:s},a){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),s!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,s]of o){const{wrapped:a}=s,h=this[r];a!==!0||this._$AL.has(r)||h===void 0||this.C(r,void 0,s,h)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(e)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[z("elementProperties")]=new Map,O[z("finalized")]=new Map,zt?.({ReactiveElement:O}),(H.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tt=globalThis,ht=i=>i,F=tt.trustedTypes,pt=F?F.createPolicy("lit-html",{createHTML:i=>i}):void 0,ut="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,vt="?"+$,Nt=`<${vt}>`,S=document,N=()=>S.createComment(""),I=i=>i===null||typeof i!="object"&&typeof i!="function",et=Array.isArray,It=i=>et(i)||typeof i?.[Symbol.iterator]=="function",ot=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gt=/-->/g,ft=/>/g,A=RegExp(`>|${ot}(?:([^\\s"'>=/]+)(${ot}*=${ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bt=/'/g,_t=/"/g,wt=/^(?:script|style|textarea|title)$/i,Ut=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),p=Ut(1),G=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),yt=new WeakMap,C=S.createTreeWalker(S,129);function mt(i,t){if(!et(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(t):t}const Dt=(i,t)=>{const e=i.length-1,o=[];let r,s=t===2?"<svg>":t===3?"<math>":"",a=U;for(let h=0;h<e;h++){const d=i[h];let g,f,u=-1,m=0;for(;m<d.length&&(a.lastIndex=m,f=a.exec(d),f!==null);)m=a.lastIndex,a===U?f[1]==="!--"?a=gt:f[1]!==void 0?a=ft:f[2]!==void 0?(wt.test(f[2])&&(r=RegExp("</"+f[2],"g")),a=A):f[3]!==void 0&&(a=A):a===A?f[0]===">"?(a=r??U,u=-1):f[1]===void 0?u=-2:(u=a.lastIndex-f[2].length,g=f[1],a=f[3]===void 0?A:f[3]==='"'?_t:bt):a===_t||a===bt?a=A:a===gt||a===ft?a=U:(a=A,r=void 0);const k=a===A&&i[h+1].startsWith("/>")?" ":"";s+=a===U?d+Nt:u>=0?(o.push(g),d.slice(0,u)+ut+d.slice(u)+$+k):d+$+(u===-2?h:k)}return[mt(i,s+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]};class D{constructor({strings:t,_$litType$:e},o){let r;this.parts=[];let s=0,a=0;const h=t.length-1,d=this.parts,[g,f]=Dt(t,e);if(this.el=D.createElement(g,o),C.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(r=C.nextNode())!==null&&d.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(const u of r.getAttributeNames())if(u.endsWith(ut)){const m=f[a++],k=r.getAttribute(u).split($),J=/([.?@])?(.*)/.exec(m);d.push({type:1,index:s,name:J[2],strings:k,ctor:J[1]==="."?Mt:J[1]==="?"?Bt:J[1]==="@"?Ht:V}),r.removeAttribute(u)}else u.startsWith($)&&(d.push({type:6,index:s}),r.removeAttribute(u));if(wt.test(r.tagName)){const u=r.textContent.split($),m=u.length-1;if(m>0){r.textContent=F?F.emptyScript:"";for(let k=0;k<m;k++)r.append(u[k],N()),C.nextNode(),d.push({type:2,index:++s});r.append(u[m],N())}}}else if(r.nodeType===8)if(r.data===vt)d.push({type:2,index:s});else{let u=-1;for(;(u=r.data.indexOf($,u+1))!==-1;)d.push({type:7,index:s}),u+=$.length-1}s++}}static createElement(t,e){const o=S.createElement("template");return o.innerHTML=t,o}}function P(i,t,e=i,o){if(t===G)return t;let r=o!==void 0?e._$Co?.[o]:e._$Cl;const s=I(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(i),r._$AT(i,e,o)),o!==void 0?(e._$Co??=[])[o]=r:e._$Cl=r),r!==void 0&&(t=P(i,r._$AS(i,t.values),r,o)),t}class jt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,r=(t?.creationScope??S).importNode(e,!0);C.currentNode=r;let s=C.nextNode(),a=0,h=0,d=o[0];for(;d!==void 0;){if(a===d.index){let g;d.type===2?g=new j(s,s.nextSibling,this,t):d.type===1?g=new d.ctor(s,d.name,d.strings,this,t):d.type===6&&(g=new Lt(s,this,t)),this._$AV.push(g),d=o[++h]}a!==d?.index&&(s=C.nextNode(),a++)}return C.currentNode=S,r}p(t){let e=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class j{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,r){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),I(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==G&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):It(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,r=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=D.createElement(mt(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===r)this._$AH.p(e);else{const s=new jt(r,this),a=s.u(this.options);s.p(e),this.T(a),this._$AH=s}}_$AC(t){let e=yt.get(t.strings);return e===void 0&&yt.set(t.strings,e=new D(t)),e}k(t){et(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,r=0;for(const s of t)r===e.length?e.push(o=new j(this.O(N()),this.O(N()),this,this.options)):o=e[r],o._$AI(s),r++;r<e.length&&(this._$AR(o&&o._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const o=ht(t).nextSibling;ht(t).remove(),t=o}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class V{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,r,s){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=c}_$AI(t,e=this,o,r){const s=this.strings;let a=!1;if(s===void 0)t=P(this,t,e,0),a=!I(t)||t!==this._$AH&&t!==G,a&&(this._$AH=t);else{const h=t;let d,g;for(t=s[0],d=0;d<s.length-1;d++)g=P(this,h[o+d],e,d),g===G&&(g=this._$AH[d]),a||=!I(g)||g!==this._$AH[d],g===c?t=c:t!==c&&(t+=(g??"")+s[d+1]),this._$AH[d]=g}a&&!r&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Mt extends V{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}}class Bt extends V{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}}class Ht extends V{constructor(t,e,o,r,s){super(t,e,o,r,s),this.type=5}_$AI(t,e=this){if((t=P(this,t,e,0)??c)===G)return;const o=this._$AH,r=t===c&&o!==c||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==c&&(o===c||r);r&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Lt{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}const Ft=tt.litHtmlPolyfillSupport;Ft?.(D,j),(tt.litHtmlVersions??=[]).push("3.3.2");const Vt=(i,t,e)=>{const o=e?.renderBefore??t;let r=o._$litPart$;if(r===void 0){const s=e?.renderBefore??null;o._$litPart$=r=new j(t.insertBefore(N(),s),s,void 0,e??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rt=globalThis;let v=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Vt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}};v._$litElement$=!0,v.finalized=!0,rt.litElementHydrateSupport?.({LitElement:v});const Wt=rt.litElementPolyfillSupport;Wt?.({LitElement:v}),(rt.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const y=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Kt={attribute:!0,type:String,converter:L,reflect:!1,hasChanged:X},qt=(i=Kt,t,e)=>{const{kind:o,metadata:r}=e;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),o==="setter"&&((i=Object.create(i)).wrapped=!0),s.set(e.name,i),o==="accessor"){const{name:a}=e;return{set(h){const d=t.get.call(this);t.set.call(this,h),this.requestUpdate(a,d,i,!0,h)},init(h){return h!==void 0&&this.C(a,void 0,i,h),h}}}if(o==="setter"){const{name:a}=e;return function(h){const d=this[a];t.call(this,h),this.requestUpdate(a,d,i,!0,h)}}throw Error("Unsupported decorator location: "+o)};function l(i){return(t,e)=>typeof e=="object"?qt(i,t,e):((o,r,s)=>{const a=r.hasOwnProperty(s);return r.constructor.createProperty(s,o),a?Object.getOwnPropertyDescriptor(r,s):void 0})(i,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Zt(i){return l({...i,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jt=(i,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(i,t,e),e);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $t(i){return(t,e)=>{const{slot:o,selector:r}=i??{},s="slot"+(o?`[name=${o}]`:":not([name])");return Jt(t,e,{get(){const a=this.renderRoot?.querySelector(s),h=a?.assignedElements(i)??[];return r===void 0?h:h.filter(d=>d.matches(r))}})}}var Yt=Object.defineProperty,Qt=Object.getOwnPropertyDescriptor,x=(i,t,e,o)=>{for(var r=o>1?void 0:o?Qt(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&Yt(t,e,r),r};n.GovButton=class extends v{constructor(){super(...arguments),this.variant="primary",this.disabled=!1,this.size="md",this.type="button",this.href="",this.target="",this.rel=""}_handleLinkKeydown(t){t.key===" "&&(t.preventDefault(),t.currentTarget.click())}render(){if(this.href){const t=this.target==="_blank"&&!this.rel?"noopener noreferrer":this.rel;return p`
        <a
          href=${this.disabled?c:this.href}
          target=${this.target||c}
          rel=${t||c}
          role="button"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?-1:0}
          @keydown=${this._handleLinkKeydown}
        ><slot></slot></a>
      `}return p`
      <button
        type=${this.type}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled?"true":"false"}
      >
        <slot></slot>
      </button>
    `}},n.GovButton.shadowRootOptions={...v.shadowRootOptions,delegatesFocus:!0},n.GovButton.styles=w`
    :host {
      display: inline-block;
      outline: none !important;
    }

    /*
     * GOV.UK-inspired button technique:
     * - inset box-shadow 底部深色，營造立體感
     * - hover 時背景加深，提供明暗回饋
     * - active 時 inset shadow 消失，模擬按壓
     * - focus 使用黃色外框 ring，貼合圓角
     * - transparent border 確保 Windows 高對比模式下邊界可見
     * - 有 href 時渲染 <a role="button">，無 href 時渲染 <button>
     */

    button,
    a {
      font-family: var(--govtw-button-font-family);
      font-weight: var(--govtw-button-font-weight);
      border: 2px solid transparent;
      border-radius: var(--govtw-button-border-radius);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--govtw-spacing-2);
      line-height: 1.5;
      box-shadow: inset 0 -3px 0 var(--_shadow-color);
      text-decoration: none;
      -webkit-appearance: none;
    }

    /* Sizes — default (md) */
    button,
    a {
      font-size: var(--govtw-font-size-base);
      padding: var(--govtw-spacing-2) var(--govtw-spacing-4);
    }

    :host([size="sm"]) :is(button, a) {
      font-size: var(--govtw-font-size-sm);
      padding: var(--govtw-spacing-1) var(--govtw-spacing-3);
    }

    :host([size="lg"]) :is(button, a) {
      font-size: var(--govtw-font-size-lg);
      padding: var(--govtw-spacing-3) var(--govtw-spacing-6);
    }

    /* ===== Primary ===== */
    :host([variant="primary"]) :is(button, a) {
      --_bg: var(--govtw-button-primary-bg);
      --_shadow-color: color-mix(in srgb, var(--_bg) 60%, black);
      background: var(--_bg);
      color: var(--govtw-button-primary-color);
    }
    :host([variant="primary"]) :is(button, a):hover:not(:disabled):not([aria-disabled="true"]) {
      background: color-mix(in srgb, var(--_bg) 85%, black);
    }
    :host([variant="primary"]) :is(button, a):active:not(:disabled):not([aria-disabled="true"]) {
      background: color-mix(in srgb, var(--_bg) 65%, black);
    }

    /* ===== Secondary ===== */
    :host([variant="secondary"]) :is(button, a) {
      --_bg: var(--govtw-button-secondary-bg);
      --_shadow-color: color-mix(in srgb, var(--_bg) 40%, black);
      background: var(--_bg);
      color: var(--govtw-button-secondary-color);
      border-color: var(--govtw-button-secondary-border-color);
    }
    :host([variant="secondary"]) :is(button, a):hover:not(:disabled):not([aria-disabled="true"]) {
      background: color-mix(in srgb, var(--_bg) 80%, black);
    }
    :host([variant="secondary"]) :is(button, a):active:not(:disabled):not([aria-disabled="true"]) {
      background: color-mix(in srgb, var(--_bg) 65%, black);
    }

    /* ===== Danger ===== */
    :host([variant="danger"]) :is(button, a) {
      --_bg: var(--govtw-button-danger-bg);
      --_shadow-color: color-mix(in srgb, var(--_bg) 60%, black);
      background: var(--_bg);
      color: var(--govtw-button-danger-color);
    }
    :host([variant="danger"]) :is(button, a):hover:not(:disabled):not([aria-disabled="true"]) {
      background: color-mix(in srgb, var(--_bg) 85%, black);
    }
    :host([variant="danger"]) :is(button, a):active:not(:disabled):not([aria-disabled="true"]) {
      background: color-mix(in srgb, var(--_bg) 65%, black);
    }

    /* ===== Active / Pressed ===== */
    :is(button, a):active:not(:disabled):not([aria-disabled="true"]) {
      box-shadow: none;
    }

    /* ===== Focus — 黃色 focus ring，貼合圓角 ===== */
    :is(button, a):focus-visible {
      outline: none;
      box-shadow:
        inset 0 -3px 0 var(--_shadow-color),
        0 0 0 var(--govtw-button-focus-width) var(--govtw-button-focus-color);
    }

    :host(:focus-within) {
      outline: none;
    }

    /* ===== Disabled — <button> ===== */
    button:disabled {
      opacity: var(--govtw-button-disabled-opacity);
      cursor: not-allowed;
    }
    button:disabled:active {
      box-shadow: inset 0 -3px 0 var(--_shadow-color);
    }

    /* ===== Disabled — <a> (aria-disabled) ===== */
    a[aria-disabled="true"] {
      opacity: var(--govtw-button-disabled-opacity);
      cursor: not-allowed;
      pointer-events: none;
    }
  `,x([l({type:String,reflect:!0})],n.GovButton.prototype,"variant",2),x([l({type:Boolean,reflect:!0})],n.GovButton.prototype,"disabled",2),x([l({type:String,reflect:!0})],n.GovButton.prototype,"size",2),x([l({type:String})],n.GovButton.prototype,"type",2),x([l({type:String})],n.GovButton.prototype,"href",2),x([l({type:String})],n.GovButton.prototype,"target",2),x([l({type:String})],n.GovButton.prototype,"rel",2),n.GovButton=x([y("govtw-button")],n.GovButton);var Xt=Object.defineProperty,te=Object.getOwnPropertyDescriptor,T=(i,t,e,o)=>{for(var r=o>1?void 0:o?te(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&Xt(t,e,r),r};n.GovCheckbox=class extends v{constructor(){super(),this.checked=!1,this.disabled=!1,this.value="on",this.name="",this.label="",this._internals=this.attachInternals()}_handleChange(t){const e=t.target;this.checked=e.checked,this._internals.setFormValue(this.checked?this.value:null),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}updated(t){(t.has("checked")||t.has("value"))&&this._internals.setFormValue(this.checked?this.value:null)}formResetCallback(){this.checked=!1}render(){return p`
      <label class="checkbox">
        <input
          type="checkbox"
          class="checkbox__input"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
        />
        <span class="checkbox__box"></span>
        <span class="checkbox__label">
          ${this.label||p`<slot></slot>`}
        </span>
      </label>
    `}},n.GovCheckbox.shadowRootOptions={...v.shadowRootOptions,delegatesFocus:!0},n.GovCheckbox.formAssociated=!0,n.GovCheckbox.styles=w`
    :host {
      display: block;
      outline: none !important;
    }

    /*
     * GOV.UK-inspired checkbox technique:
     * - 原生 input 以 opacity:0 覆蓋在自訂方塊上，保留無障礙
     * - 自訂方塊用 ::after 偽元素旋轉邊框畫勾號
     * - focus 使用黃色 #fd0 ring，跟 button 一致
     * - hover 邊框加粗，提供不依賴色彩的回饋
     */

    .checkbox {
      display: flex;
      align-items: flex-start;
      gap: var(--govtw-spacing-3, 12px);
      cursor: pointer;
      position: relative;
      min-height: 44px;
      padding: var(--govtw-spacing-1, 4px) 0;
    }

    /* ===== 原生 input，不可見但可操作 ===== */
    .checkbox__input {
      position: absolute;
      width: var(--govtw-checkbox-size);
      height: var(--govtw-checkbox-size);
      margin: 0;
      opacity: 0;
      cursor: pointer;
      z-index: 1;
    }

    .checkbox__input:disabled {
      cursor: not-allowed;
    }

    /* ===== 自訂視覺方塊 ===== */
    .checkbox__box {
      position: relative;
      display: inline-flex;
      flex-shrink: 0;
      width: var(--govtw-checkbox-size);
      height: var(--govtw-checkbox-size);
      border: 2px solid var(--govtw-checkbox-border-color);
      border-radius: var(--govtw-checkbox-border-radius);
      background: var(--govtw-checkbox-bg);
      box-sizing: border-box;
      transition: border-color 0.15s, border-width 0.1s;
    }

    /* ===== 勾號：旋轉邊框技巧 ===== */
    .checkbox__box::after {
      content: '';
      position: absolute;
      top: 8px;
      left: 7px;
      width: 20px;
      height: 10px;
      border-left: 4px solid var(--govtw-checkbox-check-color);
      border-bottom: 4px solid var(--govtw-checkbox-check-color);
      transform: rotate(-45deg);
      opacity: 0;
    }

    /* ===== Checked ===== */
    .checkbox__input:checked + .checkbox__box {
      border-color: var(--govtw-checkbox-check-color);
    }

    .checkbox__input:checked + .checkbox__box::after {
      opacity: 1;
    }

    /* ===== Hover ===== */
    .checkbox__input:hover:not(:disabled) + .checkbox__box {
      border-width: 4px;
    }

    /* hover 時勾號位置微調（border 從 2px 變 4px） */
    .checkbox__input:hover:not(:disabled):checked + .checkbox__box::after {
      top: 6px;
      left: 5px;
    }

    /* ===== Focus — 黃色 ring ===== */
    .checkbox__input:focus-visible + .checkbox__box {
      box-shadow: 0 0 0 var(--govtw-checkbox-focus-width) var(--govtw-checkbox-focus-color);
    }

    :host(:focus-within) {
      outline: none;
    }

    /* ===== Disabled ===== */
    :host([disabled]) .checkbox {
      cursor: not-allowed;
    }

    :host([disabled]) .checkbox__box {
      opacity: 0.5;
    }

    :host([disabled]) .checkbox__label {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ===== 標籤文字 ===== */
    .checkbox__label {
      font-family: var(--govtw-font-sans);
      font-size: var(--govtw-font-size-base);
      color: var(--govtw-checkbox-label-color);
      line-height: 1.5;
      padding-top: 8px;
      user-select: none;
    }
  `,T([l({type:Boolean,reflect:!0})],n.GovCheckbox.prototype,"checked",2),T([l({type:Boolean,reflect:!0})],n.GovCheckbox.prototype,"disabled",2),T([l({type:String})],n.GovCheckbox.prototype,"value",2),T([l({type:String})],n.GovCheckbox.prototype,"name",2),T([l({type:String})],n.GovCheckbox.prototype,"label",2),n.GovCheckbox=T([y("govtw-checkbox")],n.GovCheckbox);var ee=Object.defineProperty,oe=Object.getOwnPropertyDescriptor,b=(i,t,e,o)=>{for(var r=o>1?void 0:o?oe(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&ee(t,e,r),r};n.GovInput=class extends v{constructor(){super(),this.label="",this.hint="",this.error="",this.name="",this.value="",this.type="text",this.autocomplete="",this.inputmode="",this.placeholder="",this.prefix="",this.suffix="",this.width="full",this.disabled=!1,this.spellcheck=!1,this._internals=this.attachInternals()}_handleInput(t){const e=t.target;this.value=e.value,this._internals.setFormValue(this.value),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))}_handleChange(t){const e=t.target;this.value=e.value,this._internals.setFormValue(this.value),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}updated(t){t.has("value")&&this._internals.setFormValue(this.value)}formResetCallback(){this.value=""}render(){const t=!!this.error,e="input",o="hint",r="error",s=[this.hint?o:"",t?r:""].filter(Boolean).join(" ")||void 0;return p`
      <div class="form-group ${t?"form-group--error":""}">
        ${this.label?p`<label class="label" for=${e}>${this.label}</label>`:c}
        ${this.hint?p`<span class="hint" id=${o}>${this.hint}</span>`:c}
        ${t?p`<span class="error-message" id=${r}>${this.error}</span>`:c}
        <div class="input-wrapper ${this.prefix||this.suffix?"input-wrapper--has-affix":""}">
          ${this.prefix?p`<span class="input-prefix" aria-hidden="true">${this.prefix}</span>`:c}
          <input
            class="input ${t?"input--error":""}"
            id=${e}
            type=${this.type}
            .value=${this.value}
            name=${this.name||c}
            placeholder=${this.placeholder||c}
            autocomplete=${this.autocomplete||c}
            inputmode=${this.inputmode||c}
            ?disabled=${this.disabled}
            .spellcheck=${this.spellcheck}
            aria-invalid=${t?"true":c}
            aria-describedby=${s||c}
            @input=${this._handleInput}
            @change=${this._handleChange}
          />
          ${this.suffix?p`<span class="input-suffix" aria-hidden="true">${this.suffix}</span>`:c}
        </div>
      </div>
    `}},n.GovInput.shadowRootOptions={...v.shadowRootOptions,delegatesFocus:!0},n.GovInput.formAssociated=!0,n.GovInput.styles=w`
    :host {
      display: block;
      outline: none !important;
    }

    /*
     * GOV.UK-inspired text input:
     * - 明確的 label + 可選的 hint / error
     * - 2px 邊框，focus 時黃色 ring + 黑色粗邊框
     * - error 時左側紅色邊線 + 紅色邊框
     * - prefix / suffix 用於單位或符號
     */

    .form-group {
      margin-bottom: var(--govtw-spacing-6, 24px);
    }

    .form-group--error {
      border-left: 4px solid var(--govtw-input-error-color);
      padding-left: var(--govtw-spacing-4, 16px);
    }

    /* ===== Label ===== */
    .label {
      display: block;
      font-family: var(--govtw-input-font-family);
      font-size: var(--govtw-input-font-size);
      font-weight: 700;
      color: var(--govtw-input-color);
      margin-bottom: var(--govtw-spacing-1, 4px);
    }

    /* ===== Hint ===== */
    .hint {
      display: block;
      font-family: var(--govtw-input-font-family);
      font-size: var(--govtw-input-font-size);
      color: var(--govtw-input-hint-color);
      margin-bottom: var(--govtw-spacing-2, 8px);
    }

    /* ===== Error message ===== */
    .error-message {
      display: block;
      font-family: var(--govtw-input-font-family);
      font-size: var(--govtw-input-font-size);
      font-weight: 700;
      color: var(--govtw-input-error-color);
      margin-bottom: var(--govtw-spacing-2, 8px);
    }

    /* ===== Input wrapper (for prefix / suffix) ===== */
    .input-wrapper {
      display: flex;
      align-items: stretch;
      border-radius: var(--govtw-input-border-radius);
    }

    .input-wrapper--has-affix {
      display: inline-flex;
    }

    .input-prefix,
    .input-suffix {
      display: flex;
      align-items: center;
      font-family: var(--govtw-input-font-family);
      font-size: var(--govtw-input-font-size);
      color: var(--govtw-input-color);
      background: var(--govtw-input-disabled-bg);
      border: 2px solid var(--govtw-input-border-color);
      padding: var(--govtw-spacing-2, 8px) var(--govtw-spacing-3, 12px);
      white-space: nowrap;
    }

    .input-prefix {
      border-right: 0;
      border-radius: var(--govtw-input-border-radius) 0 0 var(--govtw-input-border-radius);
    }

    .input-suffix {
      border-left: 0;
      border-radius: 0 var(--govtw-input-border-radius) var(--govtw-input-border-radius) 0;
    }

    /* 有 prefix/suffix 時，focus 樣式移到 wrapper */
    .input-wrapper--has-affix:focus-within {
      outline: var(--govtw-input-focus-width) solid var(--govtw-input-focus-color);
      outline-offset: 0;
      box-shadow: inset 0 0 0 1px var(--govtw-input-border-color);
    }

    .input-wrapper--has-affix .input:focus {
      outline: none;
      box-shadow: none;
    }

    /* ===== Input ===== */
    .input {
      font-family: var(--govtw-input-font-family);
      font-size: var(--govtw-input-font-size);
      line-height: 1.5;
      color: var(--govtw-input-color);
      background: var(--govtw-input-bg);
      border: 2px solid var(--govtw-input-border-color);
      border-radius: var(--govtw-input-border-radius);
      padding: var(--govtw-spacing-2, 8px);
      width: 100%;
      box-sizing: border-box;
      margin: 0;
      -webkit-appearance: none;
      appearance: none;
    }

    /* prefix / suffix 時修正圓角 */
    .input-wrapper .input {
      border-radius: 0;
    }

    .input-wrapper .input:first-child {
      border-radius: var(--govtw-input-border-radius) 0 0 var(--govtw-input-border-radius);
    }

    .input-wrapper .input:last-child {
      border-radius: 0 var(--govtw-input-border-radius) var(--govtw-input-border-radius) 0;
    }

    .input-wrapper .input:only-child {
      border-radius: var(--govtw-input-border-radius);
    }

    /* ===== 固定寬度 ===== */
    :host([width="20"]) .input { max-width: 41ex; }
    :host([width="10"]) .input { max-width: 23ex; }
    :host([width="5"]) .input { max-width: 10.8ex; }
    :host([width="4"]) .input { max-width: 9ex; }
    :host([width="3"]) .input { max-width: 7.2ex; }
    :host([width="2"]) .input { max-width: 5.4ex; }

    /* ===== Focus — 黃色 ring + 黑色粗邊框 ===== */
    .input:focus {
      outline: var(--govtw-input-focus-width) solid var(--govtw-input-focus-color);
      outline-offset: 0;
      border-color: var(--govtw-input-border-color);
      box-shadow: inset 0 0 0 1px var(--govtw-input-border-color);
    }

    /* ===== Error ===== */
    .input--error {
      border-color: var(--govtw-input-error-color);
    }

    .input--error:focus {
      border-color: var(--govtw-input-border-color);
    }

    /* ===== Disabled ===== */
    .input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--govtw-input-disabled-bg);
    }
  `,b([l({type:String})],n.GovInput.prototype,"label",2),b([l({type:String})],n.GovInput.prototype,"hint",2),b([l({type:String})],n.GovInput.prototype,"error",2),b([l({type:String})],n.GovInput.prototype,"name",2),b([l({type:String})],n.GovInput.prototype,"value",2),b([l({type:String})],n.GovInput.prototype,"type",2),b([l({type:String})],n.GovInput.prototype,"autocomplete",2),b([l({type:String})],n.GovInput.prototype,"inputmode",2),b([l({type:String})],n.GovInput.prototype,"placeholder",2),b([l({type:String})],n.GovInput.prototype,"prefix",2),b([l({type:String})],n.GovInput.prototype,"suffix",2),b([l({type:String,reflect:!0})],n.GovInput.prototype,"width",2),b([l({type:Boolean,reflect:!0})],n.GovInput.prototype,"disabled",2),b([l({type:Boolean})],n.GovInput.prototype,"spellcheck",2),n.GovInput=b([y("govtw-input")],n.GovInput);var re=Object.defineProperty,ie=Object.getOwnPropertyDescriptor,W=(i,t,e,o)=>{for(var r=o>1?void 0:o?ie(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&re(t,e,r),r};n.GovFieldset=class extends v{constructor(){super(...arguments),this.error=""}render(){const t=!!this.error,e=(this._legendElements?.length??0)>0,o=(this._hintElements?.length??0)>0;return p`
      <div class="${t?"fieldset-wrapper--error":""}">
        <fieldset
          class="fieldset"
          aria-describedby=${[o?"fieldset-hint":"",t?"fieldset-error":""].filter(Boolean).join(" ")||c}
        >
          <legend class="fieldset__legend ${e?"":"fieldset__legend--empty"}">
            <slot name="legend"></slot>
          </legend>
          <div
            class="fieldset__hint ${o?"":"fieldset__hint--empty"}"
            id="fieldset-hint"
          >
            <slot name="hint"></slot>
          </div>
          ${t?p`<span class="fieldset__error" id="fieldset-error">${this.error}</span>`:c}
          <div class="fieldset__content">
            <slot></slot>
          </div>
        </fieldset>
      </div>
    `}},n.GovFieldset.styles=w`
    :host {
      display: block;
    }

    /*
     * GOV.UK-inspired fieldset:
     * - 用 <fieldset> + <legend> 組合相關欄位
     * - legend / hint 由使用者透過 slot 傳入，樣式自行控制
     * - error 時左側紅色邊線
     */

    .fieldset-wrapper--error {
      border-left: 4px solid var(--govtw-fieldset-error-color);
      padding-left: var(--govtw-spacing-4);
    }

    .fieldset {
      border: none;
      padding: 0;
      margin: 0;
      min-width: 0;
    }

    /* ===== Legend ===== */
    .fieldset__legend {
      padding: 0;
      margin-bottom: 0;
    }

    /* Slotted 標題/段落的 margin 由 fieldset 控制 */
    .fieldset__legend ::slotted(*) {
      margin: 0;
    }

    /* 隱藏空的 legend（沒有 slot 內容時） */
    .fieldset__legend--empty {
      display: none;
    }

    /* ===== Hint ===== */
    .fieldset__hint {
      display: block;
      margin-bottom: var(--govtw-spacing-4);
    }

    .fieldset__hint ::slotted(*) {
      margin: 0;
    }

    .fieldset__hint--empty {
      display: none;
    }

    /* ===== Error ===== */
    .fieldset__error {
      display: block;
      font-weight: 700;
      color: var(--govtw-fieldset-error-color);
      margin-bottom: var(--govtw-spacing-4);
    }

    /* ===== Slot 內容間距 ===== */
    .fieldset__content {
      display: flex;
      flex-direction: column;
      gap: var(--govtw-spacing-4);
    }
  `,W([l({type:String})],n.GovFieldset.prototype,"error",2),W([$t({slot:"legend",flatten:!0})],n.GovFieldset.prototype,"_legendElements",2),W([$t({slot:"hint",flatten:!0})],n.GovFieldset.prototype,"_hintElements",2),n.GovFieldset=W([y("govtw-fieldset")],n.GovFieldset);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const se={ATTRIBUTE:1},ne=i=>(...t)=>({_$litDirective$:i,values:t});let ae=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xt="important",le=" !"+xt,K=ne(class extends ae{constructor(i){if(super(i),i.type!==se.ATTRIBUTE||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{const o=i[e];return o==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(i,[t]){const{style:e}=i.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const o of this.ft)t[o]==null&&(this.ft.delete(o),o.includes("-")?e.removeProperty(o):e[o]=null);for(const o in t){const r=t[o];if(r!=null){this.ft.add(o);const s=typeof r=="string"&&r.endsWith(le);o.includes("-")||s?e.setProperty(o,s?r.slice(0,-11):r,s?xt:""):e[o]=r}}return G}});var ce=Object.defineProperty,de=Object.getOwnPropertyDescriptor,kt=(i,t,e,o)=>{for(var r=o>1?void 0:o?de(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&ce(t,e,r),r};n.GovStack=class extends v{constructor(){super(...arguments),this.space=4}render(){return p`
      <div
        class="stack"
        style=${K({"--_stack-space":`var(--govtw-space-${this.space})`})}
      >
        <slot></slot>
      </div>
    `}},n.GovStack.styles=w`
    :host {
      display: block;
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: var(--_stack-space);
    }
  `,kt([l({type:Number})],n.GovStack.prototype,"space",2),n.GovStack=kt([y("govtw-stack")],n.GovStack);var he=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,M=(i,t,e,o)=>{for(var r=o>1?void 0:o?pe(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&he(t,e,r),r};n.GovSidebar=class extends v{constructor(){super(...arguments),this.sideWidth="16rem",this.contentMin=60,this.space=6,this.side="right"}render(){return p`
      <div
        class="sidebar"
        style=${K({"--_sidebar-space":`var(--govtw-space-${this.space})`,"--_side-width":this.sideWidth,"--_content-min":`${this.contentMin}%`})}
      >
        <slot></slot>
      </div>
    `}},n.GovSidebar.styles=w`
    :host {
      display: block;
    }

    .sidebar {
      display: flex;
      flex-wrap: wrap;
      gap: var(--_sidebar-space);
    }

    /* 主內容：flex-grow 撐滿，flex-basis 0 讓 min-width 生效 */
    .sidebar > ::slotted(:first-child) {
      flex-grow: 999;
      flex-basis: 0;
      min-inline-size: var(--_content-min);
    }

    .sidebar > ::slotted(:last-child) {
      flex-grow: 1;
      flex-basis: var(--_side-width);
    }

    /* side=left 時反轉順序 */
    :host([side="left"]) .sidebar > ::slotted(:first-child) {
      flex-grow: 1;
      flex-basis: var(--_side-width);
      min-inline-size: auto;
    }

    :host([side="left"]) .sidebar > ::slotted(:last-child) {
      flex-grow: 999;
      flex-basis: 0;
      min-inline-size: var(--_content-min);
    }
  `,M([l({type:String,attribute:"side-width"})],n.GovSidebar.prototype,"sideWidth",2),M([l({type:Number,attribute:"content-min"})],n.GovSidebar.prototype,"contentMin",2),M([l({type:Number})],n.GovSidebar.prototype,"space",2),M([l({type:String})],n.GovSidebar.prototype,"side",2),n.GovSidebar=M([y("govtw-sidebar")],n.GovSidebar);var ue=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,q=(i,t,e,o)=>{for(var r=o>1?void 0:o?ve(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&ue(t,e,r),r};const ge={start:"flex-start",center:"center",end:"flex-end","space-between":"space-between"},fe={start:"flex-start",center:"center",end:"flex-end",baseline:"baseline"};n.GovCluster=class extends v{constructor(){super(...arguments),this.space=3,this.align="start",this.verticalAlign="center"}render(){return p`
      <div
        class="cluster"
        style=${K({"--_cluster-space":`var(--govtw-space-${this.space})`,"--_justify":ge[this.align],"--_align":fe[this.verticalAlign]})}
      >
        <slot></slot>
      </div>
    `}},n.GovCluster.styles=w`
    :host {
      display: block;
    }

    .cluster {
      display: flex;
      flex-wrap: wrap;
      gap: var(--_cluster-space);
      justify-content: var(--_justify);
      align-items: var(--_align);
    }
  `,q([l({type:Number})],n.GovCluster.prototype,"space",2),q([l({type:String})],n.GovCluster.prototype,"align",2),q([l({type:String,attribute:"vertical-align"})],n.GovCluster.prototype,"verticalAlign",2),n.GovCluster=q([y("govtw-cluster")],n.GovCluster);var be=Object.defineProperty,_e=Object.getOwnPropertyDescriptor,it=(i,t,e,o)=>{for(var r=o>1?void 0:o?_e(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&be(t,e,r),r};n.GovContainer=class extends v{constructor(){super(...arguments),this.maxWidth="1020px",this.padding=4}render(){return p`
      <div
        class="container"
        style=${K({"--_max-width":this.maxWidth,"--_padding":`var(--govtw-space-${this.padding})`})}
      >
        <slot></slot>
      </div>
    `}},n.GovContainer.styles=w`
    :host {
      display: block;
    }

    .container {
      max-inline-size: var(--_max-width);
      margin-inline: auto;
      padding-inline: var(--_padding);
    }
  `,it([l({type:String,attribute:"max-width"})],n.GovContainer.prototype,"maxWidth",2),it([l({type:Number})],n.GovContainer.prototype,"padding",2),n.GovContainer=it([y("govtw-container")],n.GovContainer);var we=Object.defineProperty,ye=Object.getOwnPropertyDescriptor,_=(i,t,e,o)=>{for(var r=o>1?void 0:o?ye(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&we(t,e,r),r};n.GovTextarea=class extends v{constructor(){super(),this.label="",this.hint="",this.error="",this.name="",this.value="",this.autocomplete="",this.placeholder="",this.rows=5,this.maxlength=0,this.disabled=!1,this.spellcheck=!1,this._internals=this.attachInternals()}_handleInput(t){const e=t.target;this.value=e.value,this._internals.setFormValue(this.value),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))}_handleChange(t){const e=t.target;this.value=e.value,this._internals.setFormValue(this.value),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}updated(t){t.has("value")&&this._internals.setFormValue(this.value)}formResetCallback(){this.value=""}render(){const t=!!this.error,e="textarea",o="hint",r="error",s="count",a=[this.hint?o:"",t?r:"",this.maxlength>0?s:""].filter(Boolean).join(" ")||void 0,h=this.maxlength>0?this.maxlength-this.value.length:null,d=h!==null&&h<0;return p`
      <div class="form-group ${t?"form-group--error":""}">
        ${this.label?p`<label class="label" for=${e}>${this.label}</label>`:c}
        ${this.hint?p`<span class="hint" id=${o}>${this.hint}</span>`:c}
        ${t?p`<span class="error-message" id=${r}>${this.error}</span>`:c}
        <textarea
          class="textarea ${t?"textarea--error":""}"
          id=${e}
          .value=${this.value}
          rows=${this.rows}
          name=${this.name||c}
          placeholder=${this.placeholder||c}
          autocomplete=${this.autocomplete||c}
          ?disabled=${this.disabled}
          .spellcheck=${this.spellcheck}
          aria-invalid=${t?"true":c}
          aria-describedby=${a||c}
          @input=${this._handleInput}
          @change=${this._handleChange}
        ></textarea>
        ${h!==null?p`<span
              class="character-count ${d?"character-count--over":""}"
              id=${s}
              aria-live="polite"
            >${d?`已超過 ${Math.abs(h)} 個字`:`還可輸入 ${h} 個字`}</span>`:c}
      </div>
    `}},n.GovTextarea.shadowRootOptions={...v.shadowRootOptions,delegatesFocus:!0},n.GovTextarea.formAssociated=!0,n.GovTextarea.styles=w`
    :host {
      display: block;
      outline: none !important;
    }

    /*
     * GOV.UK-inspired textarea:
     * - 明確的 label + 可選的 hint / error
     * - 2px 邊框，focus 時黃色 ring + 黑色粗邊框
     * - error 時左側紅色邊線 + 紅色邊框
     * - 可選的字數計數器
     */

    .form-group {
      margin-bottom: var(--govtw-spacing-6, 24px);
    }

    .form-group--error {
      border-left: 4px solid var(--govtw-textarea-error-color);
      padding-left: var(--govtw-spacing-4, 16px);
    }

    /* ===== Label ===== */
    .label {
      display: block;
      font-family: var(--govtw-textarea-font-family);
      font-size: var(--govtw-textarea-font-size);
      font-weight: 700;
      color: var(--govtw-textarea-color);
      margin-bottom: var(--govtw-spacing-1, 4px);
    }

    /* ===== Hint ===== */
    .hint {
      display: block;
      font-family: var(--govtw-textarea-font-family);
      font-size: var(--govtw-textarea-font-size);
      color: var(--govtw-textarea-hint-color);
      margin-bottom: var(--govtw-spacing-2, 8px);
    }

    /* ===== Error message ===== */
    .error-message {
      display: block;
      font-family: var(--govtw-textarea-font-family);
      font-size: var(--govtw-textarea-font-size);
      font-weight: 700;
      color: var(--govtw-textarea-error-color);
      margin-bottom: var(--govtw-spacing-2, 8px);
    }

    /* ===== Textarea ===== */
    .textarea {
      font-family: var(--govtw-textarea-font-family);
      font-size: var(--govtw-textarea-font-size);
      line-height: 1.5;
      color: var(--govtw-textarea-color);
      background: var(--govtw-textarea-bg);
      border: 2px solid var(--govtw-textarea-border-color);
      border-radius: var(--govtw-textarea-border-radius);
      padding: var(--govtw-spacing-2, 8px);
      width: 100%;
      box-sizing: border-box;
      margin: 0;
      resize: vertical;
      -webkit-appearance: none;
      appearance: none;
    }

    /* ===== Focus — 黃色 ring + 黑色粗邊框 ===== */
    .textarea:focus {
      outline: var(--govtw-textarea-focus-width) solid var(--govtw-textarea-focus-color);
      outline-offset: 0;
      border-color: var(--govtw-textarea-border-color);
      box-shadow: inset 0 0 0 1px var(--govtw-textarea-border-color);
    }

    /* ===== Error ===== */
    .textarea--error {
      border-color: var(--govtw-textarea-error-color);
    }

    .textarea--error:focus {
      border-color: var(--govtw-textarea-border-color);
    }

    /* ===== Disabled ===== */
    .textarea:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--govtw-textarea-disabled-bg);
    }

    /* ===== 字數計數 ===== */
    .character-count {
      font-family: var(--govtw-textarea-font-family);
      font-size: var(--govtw-font-size-sm);
      color: var(--govtw-textarea-hint-color);
      margin-top: var(--govtw-spacing-1, 4px);
    }

    .character-count--over {
      color: var(--govtw-textarea-error-color);
      font-weight: 700;
    }
  `,_([l({type:String})],n.GovTextarea.prototype,"label",2),_([l({type:String})],n.GovTextarea.prototype,"hint",2),_([l({type:String})],n.GovTextarea.prototype,"error",2),_([l({type:String})],n.GovTextarea.prototype,"name",2),_([l({type:String})],n.GovTextarea.prototype,"value",2),_([l({type:String})],n.GovTextarea.prototype,"autocomplete",2),_([l({type:String})],n.GovTextarea.prototype,"placeholder",2),_([l({type:Number})],n.GovTextarea.prototype,"rows",2),_([l({type:Number})],n.GovTextarea.prototype,"maxlength",2),_([l({type:Boolean,reflect:!0})],n.GovTextarea.prototype,"disabled",2),_([l({type:Boolean})],n.GovTextarea.prototype,"spellcheck",2),n.GovTextarea=_([y("govtw-textarea")],n.GovTextarea);var me=Object.defineProperty,$e=Object.getOwnPropertyDescriptor,R=(i,t,e,o)=>{for(var r=o>1?void 0:o?$e(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&me(t,e,r),r};n.GovLink=class extends v{constructor(){super(...arguments),this.href="",this.target="",this.rel="",this.noVisited=!1,this.noUnderline=!1}render(){if(!this.href)return p`<slot></slot>`;const t=this.target==="_blank"&&!this.rel?"noopener noreferrer":this.rel;return p`
      <a
        href=${this.href}
        target=${this.target||c}
        rel=${t||c}
      ><slot></slot></a>
    `}},n.GovLink.shadowRootOptions={...v.shadowRootOptions,delegatesFocus:!0},n.GovLink.styles=w`
    :host {
      display: inline;
      outline: none !important;
    }

    /*
     * GOV.UK-inspired link technique:
     * - 預設：底線 1px，色彩為品牌連結色
     * - hover：底線加粗至 3px，顏色加深
     * - focus：黃色背景 + 黑色粗底線，移除原本底線
     * - visited：紫色，可用 no-visited 屬性關閉
     * - active：顏色加深
     */

    a {
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      color: var(--govtw-link-color);
      text-decoration-line: underline;
      text-decoration-thickness: var(--govtw-link-underline-thickness);
      text-decoration-skip-ink: none;
      text-underline-offset: var(--govtw-link-underline-offset);
      cursor: pointer;
    }

    a:visited {
      color: var(--govtw-link-visited-color);
    }

    :host([no-visited]) a:visited {
      color: var(--govtw-link-color);
    }

    :host([no-underline]) a {
      text-decoration-line: none;
    }

    :host([no-underline]) a:hover {
      text-decoration-line: underline;
    }

    a:hover {
      color: var(--govtw-link-hover-color);
      text-decoration-thickness: var(--govtw-link-hover-underline-thickness);
    }

    /*
     * Focus & Active — GOV.UK 雙色指標：
     * 黃色背景 (#fd0) + 黑色粗底線
     * 確保在任何背景色上都有足夠對比度
     */
    a:active,
    a:focus-visible,
    a:visited:active,
    a:visited:focus-visible,
    :host([no-visited]) a:visited:active,
    :host([no-visited]) a:visited:focus-visible {
      outline: var(--govtw-focus-width) solid transparent;
      background-color: var(--govtw-link-focus-bg);
      color: var(--govtw-link-focus-color);
      text-decoration: none;
      box-shadow:
        0 -2px var(--govtw-link-focus-bg),
        0 4px var(--govtw-link-focus-underline-color);
    }
  `,R([l({type:String})],n.GovLink.prototype,"href",2),R([l({type:String})],n.GovLink.prototype,"target",2),R([l({type:String})],n.GovLink.prototype,"rel",2),R([l({type:Boolean,reflect:!0,attribute:"no-visited"})],n.GovLink.prototype,"noVisited",2),R([l({type:Boolean,reflect:!0,attribute:"no-underline"})],n.GovLink.prototype,"noUnderline",2),n.GovLink=R([y("govtw-link")],n.GovLink);var xe=Object.defineProperty,ke=Object.getOwnPropertyDescriptor,E=(i,t,e,o)=>{for(var r=o>1?void 0:o?ke(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&xe(t,e,r),r};const Z=new WeakMap;function Se(i,t,e){let o=Z.get(i);o||(o=new Map,Z.set(i,o));let r=o.get(t);r||(r=new Set,o.set(t,r)),r.add(e)}function Ae(i,t,e){const o=Z.get(i),r=o?.get(t);r&&(r.delete(e),r.size===0&&o.delete(t))}function st(i,t){return Z.get(i)?.get(t)}return n.GovRadio=class extends v{constructor(){super(),this.checked=!1,this.disabled=!1,this.value="",this.name="",this.label="",this._tabStop=!1,this._currentScope=null,this._currentName="",this._internals=this.attachInternals()}get _scope(){return this._internals.form??document}connectedCallback(){super.connectedCallback(),this._register()}disconnectedCallback(){super.disconnectedCallback(),this._unregister()}formAssociatedCallback(){this.isConnected&&(this._unregister(),this._register())}_register(){this.name&&(this._currentScope=this._scope,this._currentName=this.name,Se(this._currentScope,this._currentName,this),n.GovRadio._updateGroupTabStops(this._currentScope,this._currentName))}_unregister(){if(!this._currentScope||!this._currentName)return;const t=this._currentScope,e=this._currentName;Ae(t,e,this),this._currentScope=null,this._currentName="",this._tabStop=!1,n.GovRadio._updateGroupTabStops(t,e)}static _updateGroupTabStops(t,e){const o=st(t,e);if(!o)return;const r=[...o].filter(a=>a.isConnected&&!a.disabled).sort((a,h)=>a.compareDocumentPosition(h)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1),s=r.find(a=>a.checked)??r[0];for(const a of o)a._tabStop=a===s}_select(){this.disabled||this.checked||(this._uncheckSiblings(),this.checked=!0,this._internals.setFormValue(this.value),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}_uncheckSiblings(){if(!this._currentScope||!this._currentName)return;const t=st(this._currentScope,this._currentName);if(t)for(const e of t)e!==this&&(e.checked=!1)}_getGroupRadios(){if(!this._currentScope||!this._currentName)return[this];const t=st(this._currentScope,this._currentName);return!t||t.size===0?[this]:[...t].filter(e=>e.isConnected&&!e.disabled).sort((e,o)=>e.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1)}_focusSibling(t){const e=this._getGroupRadios();if(e.length===0)return;const o=e.indexOf(this);if(o===-1)return;const r=e[(o+t+e.length)%e.length];r._select(),r.focus()}updated(t){t.has("checked")&&(this._internals.setFormValue(this.checked?this.value:null),this._currentScope&&this._currentName&&n.GovRadio._updateGroupTabStops(this._currentScope,this._currentName)),t.has("disabled")&&this._currentScope&&this._currentName&&n.GovRadio._updateGroupTabStops(this._currentScope,this._currentName),t.has("name")&&(this._unregister(),this._register()),t.has("value")&&this.checked&&this._internals.setFormValue(this.value)}formResetCallback(){this.checked=!1}_handleClick(t){t.preventDefault(),this._select()}_handleKeydown(t){if(t.key===" "||t.key==="Enter"){t.preventDefault(),this._select();return}t.key==="ArrowDown"||t.key==="ArrowRight"?(t.preventDefault(),this._focusSibling(1)):(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this._focusSibling(-1))}render(){return p`
      <label class="radio" @click=${this._handleClick}>
        <input
          type="radio"
          class="radio__input"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          tabindex=${this._tabStop?0:-1}
          @keydown=${this._handleKeydown}
        />
        <span class="radio__circle"></span>
        <span class="radio__label">
          ${this.label||p`<slot></slot>`}
        </span>
      </label>
    `}},n.GovRadio.shadowRootOptions={...v.shadowRootOptions,delegatesFocus:!0},n.GovRadio.formAssociated=!0,n.GovRadio.styles=w`
    :host {
      display: block;
      outline: none !important;
    }

    .radio {
      display: flex;
      align-items: flex-start;
      gap: var(--govtw-spacing-3);
      cursor: pointer;
      position: relative;
      min-height: 44px;
      padding: var(--govtw-spacing-1) 0;
    }

    /* ===== 原生 input，不可見但可操作 ===== */
    .radio__input {
      position: absolute;
      width: var(--govtw-radio-size);
      height: var(--govtw-radio-size);
      margin: 0;
      opacity: 0;
      cursor: pointer;
      z-index: 1;
    }

    .radio__input:disabled {
      cursor: not-allowed;
    }

    /* ===== 自訂視覺圓形 ===== */
    .radio__circle {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: var(--govtw-radio-size);
      height: var(--govtw-radio-size);
      border: 2px solid var(--govtw-radio-border-color);
      border-radius: 50%;
      background: var(--govtw-radio-bg);
      box-sizing: border-box;
      transition: border-color 0.15s, border-width 0.1s;
    }

    /* ===== 選取圓點：零寬高 + 粗 border + border-radius ===== */
    .radio__circle::after {
      content: '';
      width: 0;
      height: 0;
      border: 10px solid var(--govtw-radio-selected-color);
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.15s;
    }

    /* ===== Checked — 用 :host([checked]) 而非 :checked ===== */
    :host([checked]) .radio__circle {
      border-color: var(--govtw-radio-selected-color);
    }

    :host([checked]) .radio__circle::after {
      opacity: 1;
    }

    /* ===== Hover ===== */
    .radio__input:hover:not(:disabled) + .radio__circle {
      border-width: 4px;
    }

    :host([checked]) .radio__input:hover:not(:disabled) + .radio__circle::after {
      border-width: 8px;
    }

    /* ===== Focus — 黃色 ring ===== */
    .radio__input:focus-visible + .radio__circle {
      box-shadow: 0 0 0 var(--govtw-radio-focus-width) var(--govtw-radio-focus-color);
    }

    :host(:focus-within) {
      outline: none;
    }

    /* ===== Disabled ===== */
    :host([disabled]) .radio {
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* ===== 標籤文字 ===== */
    .radio__label {
      line-height: 1.5;
      padding-top: 8px;
      user-select: none;
    }
  `,E([l({type:Boolean,reflect:!0})],n.GovRadio.prototype,"checked",2),E([l({type:Boolean,reflect:!0})],n.GovRadio.prototype,"disabled",2),E([l({type:String})],n.GovRadio.prototype,"value",2),E([l({type:String})],n.GovRadio.prototype,"name",2),E([l({type:String})],n.GovRadio.prototype,"label",2),E([Zt()],n.GovRadio.prototype,"_tabStop",2),n.GovRadio=E([y("govtw-radio")],n.GovRadio),Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),n})({});
