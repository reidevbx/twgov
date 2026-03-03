var GovTW=(function(a){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=globalThis,J=B.ShadowRoot&&(B.ShadyCSS===void 0||B.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol(),rt=new WeakMap;let st=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(J&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=rt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&rt.set(e,t))}return t}toString(){return this.cssText}};const mt=r=>new st(typeof r=="string"?r:r+"",void 0,Q),w=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((i,o,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+r[s+1],r[0]);return new st(e,r,Q)},xt=(r,t)=>{if(J)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),o=B.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=e.cssText,r.appendChild(i)}},at=J?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return mt(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:kt,defineProperty:St,getOwnPropertyDescriptor:At,getOwnPropertyNames:Gt,getOwnPropertySymbols:Ct,getPrototypeOf:Et}=Object,L=globalThis,nt=L.trustedTypes,Ot=nt?nt.emptyScript:"",Pt=L.reactiveElementPolyfillSupport,U=(r,t)=>r,F={toAttribute(r,t){switch(t){case Boolean:r=r?Ot:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},X=(r,t)=>!kt(r,t),lt={attribute:!0,type:String,converter:F,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??=Symbol("metadata"),L.litPropertyMetadata??=new WeakMap;let E=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);o!==void 0&&St(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=At(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:o,set(n){const h=o?.call(this);s?.call(this,n),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??lt}static _$Ei(){if(this.hasOwnProperty(U("elementProperties")))return;const t=Et(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(U("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(U("properties"))){const e=this.properties,i=[...Gt(e),...Ct(e)];for(const o of i)this.createProperty(o,e[o])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,o]of e)this.elementProperties.set(i,o)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const o=this._$Eu(e,i);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const o of i)e.unshift(at(o))}else t!==void 0&&e.push(at(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return xt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(o!==void 0&&i.reflect===!0){const s=(i.converter?.toAttribute!==void 0?i.converter:F).toAttribute(e,i.type);this._$Em=t,s==null?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const s=i.getPropertyOptions(o),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:F;this._$Em=o;const h=n.fromAttribute(e,s.type);this[o]=h??this._$Ej?.get(o)??h,this._$Em=null}}requestUpdate(t,e,i,o=!1,s){if(t!==void 0){const n=this.constructor;if(o===!1&&(s=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??X)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),s!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,s]of this._$Ep)this[o]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,s]of i){const{wrapped:n}=s,h=this[o];n!==!0||this._$AL.has(o)||h===void 0||this.C(o,void 0,s,h)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[U("elementProperties")]=new Map,E[U("finalized")]=new Map,Pt?.({ReactiveElement:E}),(L.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=globalThis,ct=r=>r,V=Y.trustedTypes,dt=V?V.createPolicy("lit-html",{createHTML:r=>r}):void 0,ht="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,pt="?"+m,zt=`<${pt}>`,S=document,I=()=>S.createComment(""),D=r=>r===null||typeof r!="object"&&typeof r!="function",tt=Array.isArray,Rt=r=>tt(r)||typeof r?.[Symbol.iterator]=="function",et=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,vt=/>/g,A=RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gt=/'/g,ft=/"/g,bt=/^(?:script|style|textarea|title)$/i,Tt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),p=Tt(1),O=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),_t=new WeakMap,G=S.createTreeWalker(S,129);function wt(r,t){if(!tt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return dt!==void 0?dt.createHTML(t):t}const Ut=(r,t)=>{const e=r.length-1,i=[];let o,s=t===2?"<svg>":t===3?"<math>":"",n=j;for(let h=0;h<e;h++){const d=r[h];let g,f,u=-1,$=0;for(;$<d.length&&(n.lastIndex=$,f=n.exec(d),f!==null);)$=n.lastIndex,n===j?f[1]==="!--"?n=ut:f[1]!==void 0?n=vt:f[2]!==void 0?(bt.test(f[2])&&(o=RegExp("</"+f[2],"g")),n=A):f[3]!==void 0&&(n=A):n===A?f[0]===">"?(n=o??j,u=-1):f[1]===void 0?u=-2:(u=n.lastIndex-f[2].length,g=f[1],n=f[3]===void 0?A:f[3]==='"'?ft:gt):n===ft||n===gt?n=A:n===ut||n===vt?n=j:(n=A,o=void 0);const k=n===A&&r[h+1].startsWith("/>")?" ":"";s+=n===j?d+zt:u>=0?(i.push(g),d.slice(0,u)+ht+d.slice(u)+m+k):d+m+(u===-2?h:k)}return[wt(r,s+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class H{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,n=0;const h=t.length-1,d=this.parts,[g,f]=Ut(t,e);if(this.el=H.createElement(g,i),G.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(o=G.nextNode())!==null&&d.length<h;){if(o.nodeType===1){if(o.hasAttributes())for(const u of o.getAttributeNames())if(u.endsWith(ht)){const $=f[n++],k=o.getAttribute(u).split(m),Z=/([.?@])?(.*)/.exec($);d.push({type:1,index:s,name:Z[2],strings:k,ctor:Z[1]==="."?Dt:Z[1]==="?"?jt:Z[1]==="@"?Ht:W}),o.removeAttribute(u)}else u.startsWith(m)&&(d.push({type:6,index:s}),o.removeAttribute(u));if(bt.test(o.tagName)){const u=o.textContent.split(m),$=u.length-1;if($>0){o.textContent=V?V.emptyScript:"";for(let k=0;k<$;k++)o.append(u[k],I()),G.nextNode(),d.push({type:2,index:++s});o.append(u[$],I())}}}else if(o.nodeType===8)if(o.data===pt)d.push({type:2,index:s});else{let u=-1;for(;(u=o.data.indexOf(m,u+1))!==-1;)d.push({type:7,index:s}),u+=m.length-1}s++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function P(r,t,e=r,i){if(t===O)return t;let o=i!==void 0?e._$Co?.[i]:e._$Cl;const s=D(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(r),o._$AT(r,e,i)),i!==void 0?(e._$Co??=[])[i]=o:e._$Cl=o),o!==void 0&&(t=P(r,o._$AS(r,t.values),o,i)),t}class It{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??S).importNode(e,!0);G.currentNode=o;let s=G.nextNode(),n=0,h=0,d=i[0];for(;d!==void 0;){if(n===d.index){let g;d.type===2?g=new M(s,s.nextSibling,this,t):d.type===1?g=new d.ctor(s,d.name,d.strings,this,t):d.type===6&&(g=new Mt(s,this,t)),this._$AV.push(g),d=i[++h]}n!==d?.index&&(s=G.nextNode(),n++)}return G.currentNode=S,o}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),D(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==O&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Rt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=H.createElement(wt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const s=new It(o,this),n=s.u(this.options);s.p(e),this.T(n),this._$AH=s}}_$AC(t){let e=_t.get(t.strings);return e===void 0&&_t.set(t.strings,e=new H(t)),e}k(t){tt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new M(this.O(I()),this.O(I()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const i=ct(t).nextSibling;ct(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class W{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(t,e=this,i,o){const s=this.strings;let n=!1;if(s===void 0)t=P(this,t,e,0),n=!D(t)||t!==this._$AH&&t!==O,n&&(this._$AH=t);else{const h=t;let d,g;for(t=s[0],d=0;d<s.length-1;d++)g=P(this,h[i+d],e,d),g===O&&(g=this._$AH[d]),n||=!D(g)||g!==this._$AH[d],g===c?t=c:t!==c&&(t+=(g??"")+s[d+1]),this._$AH[d]=g}n&&!o&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Dt extends W{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}}class jt extends W{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}}class Ht extends W{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=P(this,t,e,0)??c)===O)return;const i=this._$AH,o=t===c&&i!==c||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==c&&(i===c||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Mt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}const Nt=Y.litHtmlPolyfillSupport;Nt?.(H,M),(Y.litHtmlVersions??=[]).push("3.3.2");const Bt=(r,t,e)=>{const i=e?.renderBefore??t;let o=i._$litPart$;if(o===void 0){const s=e?.renderBefore??null;i._$litPart$=o=new M(t.insertBefore(I(),s),s,void 0,e??{})}return o._$AI(r),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ot=globalThis;class v extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Bt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return O}}v._$litElement$=!0,v.finalized=!0,ot.litElementHydrateSupport?.({LitElement:v});const Lt=ot.litElementPolyfillSupport;Lt?.({LitElement:v}),(ot.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const y=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ft={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:X},Vt=(r=Ft,t,e)=>{const{kind:i,metadata:o}=e;let s=globalThis.litPropertyMetadata.get(o);if(s===void 0&&globalThis.litPropertyMetadata.set(o,s=new Map),i==="setter"&&((r=Object.create(r)).wrapped=!0),s.set(e.name,r),i==="accessor"){const{name:n}=e;return{set(h){const d=t.get.call(this);t.set.call(this,h),this.requestUpdate(n,d,r,!0,h)},init(h){return h!==void 0&&this.C(n,void 0,r,h),h}}}if(i==="setter"){const{name:n}=e;return function(h){const d=this[n];t.call(this,h),this.requestUpdate(n,d,r,!0,h)}}throw Error("Unsupported decorator location: "+i)};function l(r){return(t,e)=>typeof e=="object"?Vt(r,t,e):((i,o,s)=>{const n=o.hasOwnProperty(s);return o.constructor.createProperty(s,i),n?Object.getOwnPropertyDescriptor(o,s):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function yt(r){return l({...r,state:!0,attribute:!1})}var Wt=Object.defineProperty,Kt=Object.getOwnPropertyDescriptor,C=(r,t,e,i)=>{for(var o=i>1?void 0:i?Kt(t,e):t,s=r.length-1,n;s>=0;s--)(n=r[s])&&(o=(i?n(t,e,o):n(o))||o);return i&&o&&Wt(t,e,o),o};a.GovButton=class extends v{constructor(){super(...arguments),this.variant="primary",this.disabled=!1,this.size="md",this.href="",this.target="",this.rel=""}_handleLinkKeydown(t){t.key===" "&&(t.preventDefault(),t.target.click())}render(){return this.href?p`
        <a
          href=${this.disabled?c:this.href}
          target=${this.target||c}
          rel=${this.rel||c}
          role="button"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?-1:0}
          @keydown=${this._handleLinkKeydown}
        ><slot></slot></a>
      `:p`
      <button
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled?"true":"false"}
      >
        <slot></slot>
      </button>
    `}},a.GovButton.shadowRootOptions={...v.shadowRootOptions,delegatesFocus:!0},a.GovButton.styles=w`
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
  `,C([l({type:String,reflect:!0})],a.GovButton.prototype,"variant",2),C([l({type:Boolean,reflect:!0})],a.GovButton.prototype,"disabled",2),C([l({type:String,reflect:!0})],a.GovButton.prototype,"size",2),C([l({type:String})],a.GovButton.prototype,"href",2),C([l({type:String})],a.GovButton.prototype,"target",2),C([l({type:String})],a.GovButton.prototype,"rel",2),a.GovButton=C([y("govtw-button")],a.GovButton);var qt=Object.defineProperty,Zt=Object.getOwnPropertyDescriptor,z=(r,t,e,i)=>{for(var o=i>1?void 0:i?Zt(t,e):t,s=r.length-1,n;s>=0;s--)(n=r[s])&&(o=(i?n(t,e,o):n(o))||o);return i&&o&&qt(t,e,o),o};a.GovCheckbox=class extends v{constructor(){super(),this.checked=!1,this.disabled=!1,this.value="on",this.name="",this.label="",this._internals=this.attachInternals()}_handleChange(t){const e=t.target;this.checked=e.checked,this._internals.setFormValue(this.checked?this.value:null),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}updated(t){t.has("checked")&&this._internals.setFormValue(this.checked?this.value:null)}formResetCallback(){this.checked=!1}render(){return p`
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
    `}},a.GovCheckbox.shadowRootOptions={...v.shadowRootOptions,delegatesFocus:!0},a.GovCheckbox.formAssociated=!0,a.GovCheckbox.styles=w`
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
  `,z([l({type:Boolean,reflect:!0})],a.GovCheckbox.prototype,"checked",2),z([l({type:Boolean,reflect:!0})],a.GovCheckbox.prototype,"disabled",2),z([l({type:String})],a.GovCheckbox.prototype,"value",2),z([l({type:String})],a.GovCheckbox.prototype,"name",2),z([l({type:String})],a.GovCheckbox.prototype,"label",2),a.GovCheckbox=z([y("govtw-checkbox")],a.GovCheckbox);var Jt=Object.defineProperty,Qt=Object.getOwnPropertyDescriptor,b=(r,t,e,i)=>{for(var o=i>1?void 0:i?Qt(t,e):t,s=r.length-1,n;s>=0;s--)(n=r[s])&&(o=(i?n(t,e,o):n(o))||o);return i&&o&&Jt(t,e,o),o};a.GovInput=class extends v{constructor(){super(),this.label="",this.hint="",this.error="",this.name="",this.value="",this.type="text",this.autocomplete="",this.inputmode="",this.placeholder="",this.prefix="",this.suffix="",this.width="full",this.disabled=!1,this.spellcheck=!1,this._internals=this.attachInternals()}_handleInput(t){const e=t.target;this.value=e.value,this._internals.setFormValue(this.value),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))}_handleChange(t){const e=t.target;this.value=e.value,this._internals.setFormValue(this.value),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}updated(t){t.has("value")&&this._internals.setFormValue(this.value)}formResetCallback(){this.value=""}render(){const t=!!this.error,e="input",i="hint",o="error",s=[this.hint?i:"",t?o:""].filter(Boolean).join(" ")||void 0;return p`
      <div class="form-group ${t?"form-group--error":""}">
        ${this.label?p`<label class="label" for=${e}>${this.label}</label>`:c}
        ${this.hint?p`<span class="hint" id=${i}>${this.hint}</span>`:c}
        ${t?p`<span class="error-message" id=${o}>${this.error}</span>`:c}
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
            aria-describedby=${s||c}
            @input=${this._handleInput}
            @change=${this._handleChange}
          />
          ${this.suffix?p`<span class="input-suffix" aria-hidden="true">${this.suffix}</span>`:c}
        </div>
      </div>
    `}},a.GovInput.shadowRootOptions={...v.shadowRootOptions,delegatesFocus:!0},a.GovInput.formAssociated=!0,a.GovInput.styles=w`
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
  `,b([l({type:String})],a.GovInput.prototype,"label",2),b([l({type:String})],a.GovInput.prototype,"hint",2),b([l({type:String})],a.GovInput.prototype,"error",2),b([l({type:String})],a.GovInput.prototype,"name",2),b([l({type:String})],a.GovInput.prototype,"value",2),b([l({type:String})],a.GovInput.prototype,"type",2),b([l({type:String})],a.GovInput.prototype,"autocomplete",2),b([l({type:String})],a.GovInput.prototype,"inputmode",2),b([l({type:String})],a.GovInput.prototype,"placeholder",2),b([l({type:String})],a.GovInput.prototype,"prefix",2),b([l({type:String})],a.GovInput.prototype,"suffix",2),b([l({type:String,reflect:!0})],a.GovInput.prototype,"width",2),b([l({type:Boolean,reflect:!0})],a.GovInput.prototype,"disabled",2),b([l({type:Boolean})],a.GovInput.prototype,"spellcheck",2),a.GovInput=b([y("govtw-input")],a.GovInput);var Xt=Object.defineProperty,Yt=Object.getOwnPropertyDescriptor,K=(r,t,e,i)=>{for(var o=i>1?void 0:i?Yt(t,e):t,s=r.length-1,n;s>=0;s--)(n=r[s])&&(o=(i?n(t,e,o):n(o))||o);return i&&o&&Xt(t,e,o),o};a.GovFieldset=class extends v{constructor(){super(...arguments),this.error="",this._hasLegend=!1,this._hasHint=!1}_onLegendSlotChange(t){const e=t.target;this._hasLegend=e.assignedNodes({flatten:!0}).length>0}_onHintSlotChange(t){const e=t.target;this._hasHint=e.assignedNodes({flatten:!0}).length>0}render(){const t=!!this.error;return p`
      <div class="${t?"fieldset-wrapper--error":""}">
        <fieldset
          class="fieldset"
          aria-describedby=${[this._hasHint?"fieldset-hint":"",t?"fieldset-error":""].filter(Boolean).join(" ")||c}
        >
          <legend class="fieldset__legend ${this._hasLegend?"":"fieldset__legend--empty"}">
            <slot name="legend" @slotchange=${this._onLegendSlotChange}></slot>
          </legend>
          <div
            class="fieldset__hint ${this._hasHint?"":"fieldset__hint--empty"}"
            id="fieldset-hint"
          >
            <slot name="hint" @slotchange=${this._onHintSlotChange}></slot>
          </div>
          ${t?p`<span class="fieldset__error" id="fieldset-error">${this.error}</span>`:c}
          <div class="fieldset__content">
            <slot></slot>
          </div>
        </fieldset>
      </div>
    `}},a.GovFieldset.styles=w`
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
  `,K([l({type:String})],a.GovFieldset.prototype,"error",2),K([yt()],a.GovFieldset.prototype,"_hasLegend",2),K([yt()],a.GovFieldset.prototype,"_hasHint",2),a.GovFieldset=K([y("govtw-fieldset")],a.GovFieldset);var te=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,$t=(r,t,e,i)=>{for(var o=i>1?void 0:i?ee(t,e):t,s=r.length-1,n;s>=0;s--)(n=r[s])&&(o=(i?n(t,e,o):n(o))||o);return i&&o&&te(t,e,o),o};a.GovStack=class extends v{constructor(){super(...arguments),this.space="4"}render(){return p`
      <div class="stack" style="--_stack-space: var(--govtw-space-${this.space}, ${Number(this.space)*4}px)">
        <slot></slot>
      </div>
    `}},a.GovStack.styles=w`
    :host {
      display: block;
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: var(--_stack-space);
    }
  `,$t([l({type:String})],a.GovStack.prototype,"space",2),a.GovStack=$t([y("govtw-stack")],a.GovStack);var oe=Object.defineProperty,ie=Object.getOwnPropertyDescriptor,N=(r,t,e,i)=>{for(var o=i>1?void 0:i?ie(t,e):t,s=r.length-1,n;s>=0;s--)(n=r[s])&&(o=(i?n(t,e,o):n(o))||o);return i&&o&&oe(t,e,o),o};a.GovSidebar=class extends v{constructor(){super(...arguments),this.sideWidth="16rem",this.contentMin="60",this.space="6",this.side="right"}render(){return p`
      <div
        class="sidebar"
        style="
          --_sidebar-space: var(--govtw-space-${this.space}, ${Number(this.space)*4}px);
          --_side-width: ${this.sideWidth};
          --_content-min: ${this.contentMin}%;
        "
      >
        <slot></slot>
      </div>
    `}},a.GovSidebar.styles=w`
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
  `,N([l({type:String,attribute:"side-width"})],a.GovSidebar.prototype,"sideWidth",2),N([l({type:String,attribute:"content-min"})],a.GovSidebar.prototype,"contentMin",2),N([l({type:String})],a.GovSidebar.prototype,"space",2),N([l({type:String})],a.GovSidebar.prototype,"side",2),a.GovSidebar=N([y("govtw-sidebar")],a.GovSidebar);var re=Object.defineProperty,se=Object.getOwnPropertyDescriptor,q=(r,t,e,i)=>{for(var o=i>1?void 0:i?se(t,e):t,s=r.length-1,n;s>=0;s--)(n=r[s])&&(o=(i?n(t,e,o):n(o))||o);return i&&o&&re(t,e,o),o};a.GovCluster=class extends v{constructor(){super(...arguments),this.space="3",this.align="start",this.verticalAlign="center"}render(){const t={start:"flex-start",center:"center",end:"flex-end","space-between":"space-between"},e={start:"flex-start",center:"center",end:"flex-end",baseline:"baseline"};return p`
      <div
        class="cluster"
        style="
          --_cluster-space: var(--govtw-space-${this.space}, ${Number(this.space)*4}px);
          --_justify: ${t[this.align]||"flex-start"};
          --_align: ${e[this.verticalAlign]||"center"};
        "
      >
        <slot></slot>
      </div>
    `}},a.GovCluster.styles=w`
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
  `,q([l({type:String})],a.GovCluster.prototype,"space",2),q([l({type:String})],a.GovCluster.prototype,"align",2),q([l({type:String,attribute:"vertical-align"})],a.GovCluster.prototype,"verticalAlign",2),a.GovCluster=q([y("govtw-cluster")],a.GovCluster);var ae=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,it=(r,t,e,i)=>{for(var o=i>1?void 0:i?ne(t,e):t,s=r.length-1,n;s>=0;s--)(n=r[s])&&(o=(i?n(t,e,o):n(o))||o);return i&&o&&ae(t,e,o),o};a.GovContainer=class extends v{constructor(){super(...arguments),this.maxWidth="1020px",this.padding="4"}render(){return p`
      <div
        class="container"
        style="
          --_max-width: ${this.maxWidth};
          --_padding: var(--govtw-space-${this.padding}, ${Number(this.padding)*4}px);
        "
      >
        <slot></slot>
      </div>
    `}},a.GovContainer.styles=w`
    :host {
      display: block;
    }

    .container {
      max-inline-size: var(--_max-width);
      margin-inline: auto;
      padding-inline: var(--_padding);
    }
  `,it([l({type:String,attribute:"max-width"})],a.GovContainer.prototype,"maxWidth",2),it([l({type:String})],a.GovContainer.prototype,"padding",2),a.GovContainer=it([y("govtw-container")],a.GovContainer);var le=Object.defineProperty,ce=Object.getOwnPropertyDescriptor,_=(r,t,e,i)=>{for(var o=i>1?void 0:i?ce(t,e):t,s=r.length-1,n;s>=0;s--)(n=r[s])&&(o=(i?n(t,e,o):n(o))||o);return i&&o&&le(t,e,o),o};a.GovTextarea=class extends v{constructor(){super(),this.label="",this.hint="",this.error="",this.name="",this.value="",this.autocomplete="",this.placeholder="",this.rows=5,this.maxlength=0,this.disabled=!1,this.spellcheck=!1,this._internals=this.attachInternals()}_handleInput(t){const e=t.target;this.value=e.value,this._internals.setFormValue(this.value),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))}_handleChange(t){const e=t.target;this.value=e.value,this._internals.setFormValue(this.value),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}updated(t){t.has("value")&&this._internals.setFormValue(this.value)}formResetCallback(){this.value=""}render(){const t=!!this.error,e="textarea",i="hint",o="error",s="count",n=[this.hint?i:"",t?o:"",this.maxlength>0?s:""].filter(Boolean).join(" ")||void 0,h=this.maxlength>0?this.maxlength-this.value.length:null,d=h!==null&&h<0;return p`
      <div class="form-group ${t?"form-group--error":""}">
        ${this.label?p`<label class="label" for=${e}>${this.label}</label>`:c}
        ${this.hint?p`<span class="hint" id=${i}>${this.hint}</span>`:c}
        ${t?p`<span class="error-message" id=${o}>${this.error}</span>`:c}
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
          aria-describedby=${n||c}
          @input=${this._handleInput}
          @change=${this._handleChange}
        ></textarea>
        ${h!==null?p`<span
              class="character-count ${d?"character-count--over":""}"
              id=${s}
              aria-live="polite"
            >${d?`已超過 ${Math.abs(h)} 個字`:`還可輸入 ${h} 個字`}</span>`:c}
      </div>
    `}},a.GovTextarea.shadowRootOptions={...v.shadowRootOptions,delegatesFocus:!0},a.GovTextarea.formAssociated=!0,a.GovTextarea.styles=w`
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
  `,_([l({type:String})],a.GovTextarea.prototype,"label",2),_([l({type:String})],a.GovTextarea.prototype,"hint",2),_([l({type:String})],a.GovTextarea.prototype,"error",2),_([l({type:String})],a.GovTextarea.prototype,"name",2),_([l({type:String})],a.GovTextarea.prototype,"value",2),_([l({type:String})],a.GovTextarea.prototype,"autocomplete",2),_([l({type:String})],a.GovTextarea.prototype,"placeholder",2),_([l({type:Number})],a.GovTextarea.prototype,"rows",2),_([l({type:Number})],a.GovTextarea.prototype,"maxlength",2),_([l({type:Boolean,reflect:!0})],a.GovTextarea.prototype,"disabled",2),_([l({type:Boolean})],a.GovTextarea.prototype,"spellcheck",2),a.GovTextarea=_([y("govtw-textarea")],a.GovTextarea);var de=Object.defineProperty,he=Object.getOwnPropertyDescriptor,R=(r,t,e,i)=>{for(var o=i>1?void 0:i?he(t,e):t,s=r.length-1,n;s>=0;s--)(n=r[s])&&(o=(i?n(t,e,o):n(o))||o);return i&&o&&de(t,e,o),o};a.GovLink=class extends v{constructor(){super(...arguments),this.href="",this.target="",this.rel="",this.noVisited=!1,this.noUnderline=!1}render(){return p`
      <a
        href=${this.href||"#"}
        target=${this.target||c}
        rel=${this.rel||c}
      ><slot></slot></a>
    `}},a.GovLink.shadowRootOptions={...v.shadowRootOptions,delegatesFocus:!0},a.GovLink.styles=w`
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
  `,R([l({type:String})],a.GovLink.prototype,"href",2),R([l({type:String})],a.GovLink.prototype,"target",2),R([l({type:String})],a.GovLink.prototype,"rel",2),R([l({type:Boolean,reflect:!0,attribute:"no-visited"})],a.GovLink.prototype,"noVisited",2),R([l({type:Boolean,reflect:!0,attribute:"no-underline"})],a.GovLink.prototype,"noUnderline",2),a.GovLink=R([y("govtw-link")],a.GovLink);var pe=Object.defineProperty,ue=Object.getOwnPropertyDescriptor,T=(r,t,e,i)=>{for(var o=i>1?void 0:i?ue(t,e):t,s=r.length-1,n;s>=0;s--)(n=r[s])&&(o=(i?n(t,e,o):n(o))||o);return i&&o&&pe(t,e,o),o};const x=new Map;return a.GovRadio=class extends v{constructor(){super(),this.checked=!1,this.disabled=!1,this.value="",this.name="",this.label="",this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),this._register()}disconnectedCallback(){super.disconnectedCallback(),this._unregister()}_register(){this.name&&(x.has(this.name)||x.set(this.name,new Set),x.get(this.name).add(this))}_unregister(){if(!this.name)return;const t=x.get(this.name);t&&(t.delete(this),t.size===0&&x.delete(this.name))}_select(){this.disabled||this.checked||(this._uncheckSiblings(),this.checked=!0,this._internals.setFormValue(this.value),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}_uncheckSiblings(){if(!this.name)return;const t=x.get(this.name);if(t)for(const e of t)e!==this&&(e.checked=!1)}updated(t){if(t.has("checked")){this._internals.setFormValue(this.checked?this.value:null);const e=this.shadowRoot?.querySelector("input");e&&(e.checked=this.checked)}if(t.has("name")){const e=t.get("name");if(e){const i=x.get(e);i&&(i.delete(this),i.size===0&&x.delete(e))}this._register()}}formResetCallback(){this.checked=!1}_handleClick(t){t.preventDefault(),this._select()}_handleKeydown(t){(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this._select())}render(){return p`
      <label class="radio" @click=${this._handleClick}>
        <input
          type="radio"
          class="radio__input"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          role="radio"
          aria-checked=${this.checked?"true":"false"}
          tabindex="0"
          @keydown=${this._handleKeydown}
        />
        <span class="radio__circle"></span>
        <span class="radio__label">
          ${this.label||p`<slot></slot>`}
        </span>
      </label>
    `}},a.GovRadio.shadowRootOptions={...v.shadowRootOptions,delegatesFocus:!0},a.GovRadio.formAssociated=!0,a.GovRadio.styles=w`
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
  `,T([l({type:Boolean,reflect:!0})],a.GovRadio.prototype,"checked",2),T([l({type:Boolean,reflect:!0})],a.GovRadio.prototype,"disabled",2),T([l({type:String})],a.GovRadio.prototype,"value",2),T([l({type:String})],a.GovRadio.prototype,"name",2),T([l({type:String})],a.GovRadio.prototype,"label",2),a.GovRadio=T([y("govtw-radio")],a.GovRadio),Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),a})({});
