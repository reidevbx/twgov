var GovTW=(function(n){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N=globalThis,J=N.ShadowRoot&&(N.ShadyCSS===void 0||N.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol(),rt=new WeakMap;let st=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(J&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=rt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&rt.set(e,t))}return t}toString(){return this.cssText}};const $t=r=>new st(typeof r=="string"?r:r+"",void 0,Q),w=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((i,o,s)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+r[s+1],r[0]);return new st(e,r,Q)},mt=(r,t)=>{if(J)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),o=N.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=e.cssText,r.appendChild(i)}},nt=J?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return $t(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:xt,defineProperty:kt,getOwnPropertyDescriptor:St,getOwnPropertyNames:At,getOwnPropertySymbols:Gt,getPrototypeOf:Ct}=Object,B=globalThis,at=B.trustedTypes,Et=at?at.emptyScript:"",Ot=B.reactiveElementPolyfillSupport,T=(r,t)=>r,F={toAttribute(r,t){switch(t){case Boolean:r=r?Et:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},X=(r,t)=>!xt(r,t),lt={attribute:!0,type:String,converter:F,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??=Symbol("metadata"),B.litPropertyMetadata??=new WeakMap;let C=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);o!==void 0&&kt(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=St(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:o,set(a){const d=o?.call(this);s?.call(this,a),this.requestUpdate(t,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??lt}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;const t=Ct(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){const e=this.properties,i=[...At(e),...Gt(e)];for(const o of i)this.createProperty(o,e[o])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,o]of e)this.elementProperties.set(i,o)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const o=this._$Eu(e,i);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const o of i)e.unshift(nt(o))}else t!==void 0&&e.push(nt(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return mt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(o!==void 0&&i.reflect===!0){const s=(i.converter?.toAttribute!==void 0?i.converter:F).toAttribute(e,i.type);this._$Em=t,s==null?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const s=i.getPropertyOptions(o),a=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:F;this._$Em=o;const d=a.fromAttribute(e,s.type);this[o]=d??this._$Ej?.get(o)??d,this._$Em=null}}requestUpdate(t,e,i,o=!1,s){if(t!==void 0){const a=this.constructor;if(o===!1&&(s=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??X)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),s!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,s]of this._$Ep)this[o]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,s]of i){const{wrapped:a}=s,d=this[o];a!==!0||this._$AL.has(o)||d===void 0||this.C(o,void 0,s,d)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[T("elementProperties")]=new Map,C[T("finalized")]=new Map,Ot?.({ReactiveElement:C}),(B.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=globalThis,ct=r=>r,L=Y.trustedTypes,ht=L?L.createPolicy("lit-html",{createHTML:r=>r}):void 0,dt="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,pt="?"+m,Pt=`<${pt}>`,S=document,U=()=>S.createComment(""),I=r=>r===null||typeof r!="object"&&typeof r!="function",tt=Array.isArray,zt=r=>tt(r)||typeof r?.[Symbol.iterator]=="function",et=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,vt=/>/g,A=RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gt=/'/g,ft=/"/g,bt=/^(?:script|style|textarea|title)$/i,Rt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),p=Rt(1),E=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),_t=new WeakMap,G=S.createTreeWalker(S,129);function wt(r,t){if(!tt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ht!==void 0?ht.createHTML(t):t}const Tt=(r,t)=>{const e=r.length-1,i=[];let o,s=t===2?"<svg>":t===3?"<math>":"",a=j;for(let d=0;d<e;d++){const h=r[d];let g,f,u=-1,$=0;for(;$<h.length&&(a.lastIndex=$,f=a.exec(h),f!==null);)$=a.lastIndex,a===j?f[1]==="!--"?a=ut:f[1]!==void 0?a=vt:f[2]!==void 0?(bt.test(f[2])&&(o=RegExp("</"+f[2],"g")),a=A):f[3]!==void 0&&(a=A):a===A?f[0]===">"?(a=o??j,u=-1):f[1]===void 0?u=-2:(u=a.lastIndex-f[2].length,g=f[1],a=f[3]===void 0?A:f[3]==='"'?ft:gt):a===ft||a===gt?a=A:a===ut||a===vt?a=j:(a=A,o=void 0);const k=a===A&&r[d+1].startsWith("/>")?" ":"";s+=a===j?h+Pt:u>=0?(i.push(g),h.slice(0,u)+dt+h.slice(u)+m+k):h+m+(u===-2?d:k)}return[wt(r,s+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class D{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,a=0;const d=t.length-1,h=this.parts,[g,f]=Tt(t,e);if(this.el=D.createElement(g,i),G.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(o=G.nextNode())!==null&&h.length<d;){if(o.nodeType===1){if(o.hasAttributes())for(const u of o.getAttributeNames())if(u.endsWith(dt)){const $=f[a++],k=o.getAttribute(u).split(m),Z=/([.?@])?(.*)/.exec($);h.push({type:1,index:s,name:Z[2],strings:k,ctor:Z[1]==="."?It:Z[1]==="?"?jt:Z[1]==="@"?Dt:V}),o.removeAttribute(u)}else u.startsWith(m)&&(h.push({type:6,index:s}),o.removeAttribute(u));if(bt.test(o.tagName)){const u=o.textContent.split(m),$=u.length-1;if($>0){o.textContent=L?L.emptyScript:"";for(let k=0;k<$;k++)o.append(u[k],U()),G.nextNode(),h.push({type:2,index:++s});o.append(u[$],U())}}}else if(o.nodeType===8)if(o.data===pt)h.push({type:2,index:s});else{let u=-1;for(;(u=o.data.indexOf(m,u+1))!==-1;)h.push({type:7,index:s}),u+=m.length-1}s++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function O(r,t,e=r,i){if(t===E)return t;let o=i!==void 0?e._$Co?.[i]:e._$Cl;const s=I(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(r),o._$AT(r,e,i)),i!==void 0?(e._$Co??=[])[i]=o:e._$Cl=o),o!==void 0&&(t=O(r,o._$AS(r,t.values),o,i)),t}class Ut{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??S).importNode(e,!0);G.currentNode=o;let s=G.nextNode(),a=0,d=0,h=i[0];for(;h!==void 0;){if(a===h.index){let g;h.type===2?g=new M(s,s.nextSibling,this,t):h.type===1?g=new h.ctor(s,h.name,h.strings,this,t):h.type===6&&(g=new Mt(s,this,t)),this._$AV.push(g),h=i[++d]}a!==h?.index&&(s=G.nextNode(),a++)}return G.currentNode=S,o}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=O(this,t,e),I(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):zt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=D.createElement(wt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const s=new Ut(o,this),a=s.u(this.options);s.p(e),this.T(a),this._$AH=s}}_$AC(t){let e=_t.get(t.strings);return e===void 0&&_t.set(t.strings,e=new D(t)),e}k(t){tt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new M(this.O(U()),this.O(U()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const i=ct(t).nextSibling;ct(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class V{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(t,e=this,i,o){const s=this.strings;let a=!1;if(s===void 0)t=O(this,t,e,0),a=!I(t)||t!==this._$AH&&t!==E,a&&(this._$AH=t);else{const d=t;let h,g;for(t=s[0],h=0;h<s.length-1;h++)g=O(this,d[i+h],e,h),g===E&&(g=this._$AH[h]),a||=!I(g)||g!==this._$AH[h],g===c?t=c:t!==c&&(t+=(g??"")+s[h+1]),this._$AH[h]=g}a&&!o&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class It extends V{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}}class jt extends V{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}}class Dt extends V{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=O(this,t,e,0)??c)===E)return;const i=this._$AH,o=t===c&&i!==c||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==c&&(i===c||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Mt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){O(this,t)}}const Ht=Y.litHtmlPolyfillSupport;Ht?.(D,M),(Y.litHtmlVersions??=[]).push("3.3.2");const Nt=(r,t,e)=>{const i=e?.renderBefore??t;let o=i._$litPart$;if(o===void 0){const s=e?.renderBefore??null;i._$litPart$=o=new M(t.insertBefore(U(),s),s,void 0,e??{})}return o._$AI(r),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ot=globalThis;class v extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Nt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}}v._$litElement$=!0,v.finalized=!0,ot.litElementHydrateSupport?.({LitElement:v});const Bt=ot.litElementPolyfillSupport;Bt?.({LitElement:v}),(ot.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const y=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ft={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:X},Lt=(r=Ft,t,e)=>{const{kind:i,metadata:o}=e;let s=globalThis.litPropertyMetadata.get(o);if(s===void 0&&globalThis.litPropertyMetadata.set(o,s=new Map),i==="setter"&&((r=Object.create(r)).wrapped=!0),s.set(e.name,r),i==="accessor"){const{name:a}=e;return{set(d){const h=t.get.call(this);t.set.call(this,d),this.requestUpdate(a,h,r,!0,d)},init(d){return d!==void 0&&this.C(a,void 0,r,d),d}}}if(i==="setter"){const{name:a}=e;return function(d){const h=this[a];t.call(this,d),this.requestUpdate(a,h,r,!0,d)}}throw Error("Unsupported decorator location: "+i)};function l(r){return(t,e)=>typeof e=="object"?Lt(r,t,e):((i,o,s)=>{const a=o.hasOwnProperty(s);return o.constructor.createProperty(s,i),a?Object.getOwnPropertyDescriptor(o,s):void 0})(r,t,e)}var Vt=Object.defineProperty,Wt=Object.getOwnPropertyDescriptor,W=(r,t,e,i)=>{for(var o=i>1?void 0:i?Wt(t,e):t,s=r.length-1,a;s>=0;s--)(a=r[s])&&(o=(i?a(t,e,o):a(o))||o);return i&&o&&Vt(t,e,o),o};n.GovButton=class extends v{constructor(){super(...arguments),this.variant="primary",this.disabled=!1,this.size="md"}render(){return p`
      <button
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
     */

    button {
      font-family: var(--govtw-button-font-family);
      font-weight: var(--govtw-button-font-weight);
      border: 2px solid transparent;
      border-radius: var(--govtw-button-border-radius);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--govtw-spacing-2, 8px);
      line-height: 1.5;
      box-shadow: inset 0 -3px 0 var(--_shadow-color);
      text-decoration: none;
      -webkit-appearance: none;
    }

    /* Sizes — default (md) */
    button {
      font-size: var(--govtw-font-size-base, 1rem);
      padding: var(--govtw-spacing-2, 8px) var(--govtw-spacing-4, 16px);
    }

    :host([size="sm"]) button {
      font-size: var(--govtw-font-size-sm, 0.875rem);
      padding: var(--govtw-spacing-1, 4px) var(--govtw-spacing-3, 12px);
    }

    :host([size="lg"]) button {
      font-size: var(--govtw-font-size-lg, 1.125rem);
      padding: var(--govtw-spacing-3, 12px) var(--govtw-spacing-6, 24px);
    }

    /* ===== Primary ===== */
    :host([variant="primary"]) button {
      --_bg: var(--govtw-button-primary-bg);
      --_shadow-color: color-mix(in srgb, var(--_bg) 60%, black);
      background: var(--_bg);
      color: var(--govtw-button-primary-color);
    }
    :host([variant="primary"]) button:hover:not(:disabled) {
      background: color-mix(in srgb, var(--_bg) 85%, black);
    }
    :host([variant="primary"]) button:active:not(:disabled) {
      background: color-mix(in srgb, var(--_bg) 65%, black);
    }

    /* ===== Secondary ===== */
    :host([variant="secondary"]) button {
      --_bg: var(--govtw-button-secondary-bg);
      --_shadow-color: color-mix(in srgb, var(--_bg) 40%, black);
      background: var(--_bg);
      color: var(--govtw-button-secondary-color);
      border-color: var(--govtw-button-secondary-border-color);
    }
    :host([variant="secondary"]) button:hover:not(:disabled) {
      background: color-mix(in srgb, var(--_bg) 80%, black);
    }
    :host([variant="secondary"]) button:active:not(:disabled) {
      background: color-mix(in srgb, var(--_bg) 65%, black);
    }

    /* ===== Danger ===== */
    :host([variant="danger"]) button {
      --_bg: var(--govtw-button-danger-bg);
      --_shadow-color: color-mix(in srgb, var(--_bg) 60%, black);
      background: var(--_bg);
      color: var(--govtw-button-danger-color);
    }
    :host([variant="danger"]) button:hover:not(:disabled) {
      background: color-mix(in srgb, var(--_bg) 85%, black);
    }
    :host([variant="danger"]) button:active:not(:disabled) {
      background: color-mix(in srgb, var(--_bg) 65%, black);
    }

    /* ===== Active / Pressed ===== */
    button:active:not(:disabled) {
      box-shadow: none;
    }

    /* ===== Focus — 黃色 focus ring，貼合圓角 ===== */
    button:focus-visible {
      outline: none;
      box-shadow:
        inset 0 -3px 0 var(--_shadow-color),
        0 0 0 var(--govtw-button-focus-width) var(--govtw-button-focus-color);
    }

    :host(:focus-within) {
      outline: none;
    }

    /* ===== Disabled ===== */
    button:disabled {
      opacity: var(--govtw-button-disabled-opacity);
      cursor: not-allowed;
    }
    button:disabled:active {
      box-shadow: inset 0 -3px 0 var(--_shadow-color);
    }
  `,W([l({type:String,reflect:!0})],n.GovButton.prototype,"variant",2),W([l({type:Boolean,reflect:!0})],n.GovButton.prototype,"disabled",2),W([l({type:String,reflect:!0})],n.GovButton.prototype,"size",2),n.GovButton=W([y("govtw-button")],n.GovButton);var qt=Object.defineProperty,Kt=Object.getOwnPropertyDescriptor,P=(r,t,e,i)=>{for(var o=i>1?void 0:i?Kt(t,e):t,s=r.length-1,a;s>=0;s--)(a=r[s])&&(o=(i?a(t,e,o):a(o))||o);return i&&o&&qt(t,e,o),o};n.GovCheckbox=class extends v{constructor(){super(),this.checked=!1,this.disabled=!1,this.value="on",this.name="",this.label="",this._internals=this.attachInternals()}_handleChange(t){const e=t.target;this.checked=e.checked,this._internals.setFormValue(this.checked?this.value:null),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}updated(t){t.has("checked")&&this._internals.setFormValue(this.checked?this.value:null)}formResetCallback(){this.checked=!1}render(){return p`
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
  `,P([l({type:Boolean,reflect:!0})],n.GovCheckbox.prototype,"checked",2),P([l({type:Boolean,reflect:!0})],n.GovCheckbox.prototype,"disabled",2),P([l({type:String})],n.GovCheckbox.prototype,"value",2),P([l({type:String})],n.GovCheckbox.prototype,"name",2),P([l({type:String})],n.GovCheckbox.prototype,"label",2),n.GovCheckbox=P([y("govtw-checkbox")],n.GovCheckbox);var Zt=Object.defineProperty,Jt=Object.getOwnPropertyDescriptor,b=(r,t,e,i)=>{for(var o=i>1?void 0:i?Jt(t,e):t,s=r.length-1,a;s>=0;s--)(a=r[s])&&(o=(i?a(t,e,o):a(o))||o);return i&&o&&Zt(t,e,o),o};n.GovInput=class extends v{constructor(){super(),this.label="",this.hint="",this.error="",this.name="",this.value="",this.type="text",this.autocomplete="",this.inputmode="",this.placeholder="",this.prefix="",this.suffix="",this.width="full",this.disabled=!1,this.spellcheck=!1,this._internals=this.attachInternals()}_handleInput(t){const e=t.target;this.value=e.value,this._internals.setFormValue(this.value),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))}_handleChange(t){const e=t.target;this.value=e.value,this._internals.setFormValue(this.value),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}updated(t){t.has("value")&&this._internals.setFormValue(this.value)}formResetCallback(){this.value=""}render(){const t=!!this.error,e="input",i="hint",o="error",s=[this.hint?i:"",t?o:""].filter(Boolean).join(" ")||void 0;return p`
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
  `,b([l({type:String})],n.GovInput.prototype,"label",2),b([l({type:String})],n.GovInput.prototype,"hint",2),b([l({type:String})],n.GovInput.prototype,"error",2),b([l({type:String})],n.GovInput.prototype,"name",2),b([l({type:String})],n.GovInput.prototype,"value",2),b([l({type:String})],n.GovInput.prototype,"type",2),b([l({type:String})],n.GovInput.prototype,"autocomplete",2),b([l({type:String})],n.GovInput.prototype,"inputmode",2),b([l({type:String})],n.GovInput.prototype,"placeholder",2),b([l({type:String})],n.GovInput.prototype,"prefix",2),b([l({type:String})],n.GovInput.prototype,"suffix",2),b([l({type:String,reflect:!0})],n.GovInput.prototype,"width",2),b([l({type:Boolean,reflect:!0})],n.GovInput.prototype,"disabled",2),b([l({type:Boolean})],n.GovInput.prototype,"spellcheck",2),n.GovInput=b([y("govtw-input")],n.GovInput);var Qt=Object.defineProperty,Xt=Object.getOwnPropertyDescriptor,q=(r,t,e,i)=>{for(var o=i>1?void 0:i?Xt(t,e):t,s=r.length-1,a;s>=0;s--)(a=r[s])&&(o=(i?a(t,e,o):a(o))||o);return i&&o&&Qt(t,e,o),o};n.GovFieldset=class extends v{constructor(){super(...arguments),this.legend="",this.hint="",this.error=""}render(){const t=!!this.error;return p`
      <div class="${t?"fieldset-wrapper--error":""}">
        <fieldset
          class="fieldset"
          aria-describedby=${[this.hint?"fieldset-hint":"",t?"fieldset-error":""].filter(Boolean).join(" ")||c}
        >
          ${this.legend?p`<legend class="fieldset__legend">${this.legend}</legend>`:c}
          ${this.hint?p`<span class="fieldset__hint" id="fieldset-hint">${this.hint}</span>`:c}
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
     * - legend 可作為頁面標題
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
      margin-bottom: var(--govtw-spacing-4);
    }

    /* ===== Hint ===== */
    .fieldset__hint {
      display: block;
      margin-bottom: var(--govtw-spacing-4);
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
  `,q([l({type:String})],n.GovFieldset.prototype,"legend",2),q([l({type:String})],n.GovFieldset.prototype,"hint",2),q([l({type:String})],n.GovFieldset.prototype,"error",2),n.GovFieldset=q([y("govtw-fieldset")],n.GovFieldset);var Yt=Object.defineProperty,te=Object.getOwnPropertyDescriptor,yt=(r,t,e,i)=>{for(var o=i>1?void 0:i?te(t,e):t,s=r.length-1,a;s>=0;s--)(a=r[s])&&(o=(i?a(t,e,o):a(o))||o);return i&&o&&Yt(t,e,o),o};n.GovStack=class extends v{constructor(){super(...arguments),this.space="4"}render(){return p`
      <div class="stack" style="--_stack-space: var(--govtw-space-${this.space}, ${Number(this.space)*4}px)">
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
  `,yt([l({type:String})],n.GovStack.prototype,"space",2),n.GovStack=yt([y("govtw-stack")],n.GovStack);var ee=Object.defineProperty,oe=Object.getOwnPropertyDescriptor,H=(r,t,e,i)=>{for(var o=i>1?void 0:i?oe(t,e):t,s=r.length-1,a;s>=0;s--)(a=r[s])&&(o=(i?a(t,e,o):a(o))||o);return i&&o&&ee(t,e,o),o};n.GovSidebar=class extends v{constructor(){super(...arguments),this.sideWidth="16rem",this.contentMin="60",this.space="6",this.side="right"}render(){return p`
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
  `,H([l({type:String,attribute:"side-width"})],n.GovSidebar.prototype,"sideWidth",2),H([l({type:String,attribute:"content-min"})],n.GovSidebar.prototype,"contentMin",2),H([l({type:String})],n.GovSidebar.prototype,"space",2),H([l({type:String})],n.GovSidebar.prototype,"side",2),n.GovSidebar=H([y("govtw-sidebar")],n.GovSidebar);var ie=Object.defineProperty,re=Object.getOwnPropertyDescriptor,K=(r,t,e,i)=>{for(var o=i>1?void 0:i?re(t,e):t,s=r.length-1,a;s>=0;s--)(a=r[s])&&(o=(i?a(t,e,o):a(o))||o);return i&&o&&ie(t,e,o),o};n.GovCluster=class extends v{constructor(){super(...arguments),this.space="3",this.align="start",this.verticalAlign="center"}render(){const t={start:"flex-start",center:"center",end:"flex-end","space-between":"space-between"},e={start:"flex-start",center:"center",end:"flex-end",baseline:"baseline"};return p`
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
  `,K([l({type:String})],n.GovCluster.prototype,"space",2),K([l({type:String})],n.GovCluster.prototype,"align",2),K([l({type:String,attribute:"vertical-align"})],n.GovCluster.prototype,"verticalAlign",2),n.GovCluster=K([y("govtw-cluster")],n.GovCluster);var se=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,it=(r,t,e,i)=>{for(var o=i>1?void 0:i?ne(t,e):t,s=r.length-1,a;s>=0;s--)(a=r[s])&&(o=(i?a(t,e,o):a(o))||o);return i&&o&&se(t,e,o),o};n.GovContainer=class extends v{constructor(){super(...arguments),this.maxWidth="1020px",this.padding="4"}render(){return p`
      <div
        class="container"
        style="
          --_max-width: ${this.maxWidth};
          --_padding: var(--govtw-space-${this.padding}, ${Number(this.padding)*4}px);
        "
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
  `,it([l({type:String,attribute:"max-width"})],n.GovContainer.prototype,"maxWidth",2),it([l({type:String})],n.GovContainer.prototype,"padding",2),n.GovContainer=it([y("govtw-container")],n.GovContainer);var ae=Object.defineProperty,le=Object.getOwnPropertyDescriptor,_=(r,t,e,i)=>{for(var o=i>1?void 0:i?le(t,e):t,s=r.length-1,a;s>=0;s--)(a=r[s])&&(o=(i?a(t,e,o):a(o))||o);return i&&o&&ae(t,e,o),o};n.GovTextarea=class extends v{constructor(){super(),this.label="",this.hint="",this.error="",this.name="",this.value="",this.autocomplete="",this.placeholder="",this.rows=5,this.maxlength=0,this.disabled=!1,this.spellcheck=!1,this._internals=this.attachInternals()}_handleInput(t){const e=t.target;this.value=e.value,this._internals.setFormValue(this.value),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))}_handleChange(t){const e=t.target;this.value=e.value,this._internals.setFormValue(this.value),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}updated(t){t.has("value")&&this._internals.setFormValue(this.value)}formResetCallback(){this.value=""}render(){const t=!!this.error,e="textarea",i="hint",o="error",s="count",a=[this.hint?i:"",t?o:"",this.maxlength>0?s:""].filter(Boolean).join(" ")||void 0,d=this.maxlength>0?this.maxlength-this.value.length:null,h=d!==null&&d<0;return p`
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
          aria-describedby=${a||c}
          @input=${this._handleInput}
          @change=${this._handleChange}
        ></textarea>
        ${d!==null?p`<span
              class="character-count ${h?"character-count--over":""}"
              id=${s}
              aria-live="polite"
            >${h?`已超過 ${Math.abs(d)} 個字`:`還可輸入 ${d} 個字`}</span>`:c}
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
  `,_([l({type:String})],n.GovTextarea.prototype,"label",2),_([l({type:String})],n.GovTextarea.prototype,"hint",2),_([l({type:String})],n.GovTextarea.prototype,"error",2),_([l({type:String})],n.GovTextarea.prototype,"name",2),_([l({type:String})],n.GovTextarea.prototype,"value",2),_([l({type:String})],n.GovTextarea.prototype,"autocomplete",2),_([l({type:String})],n.GovTextarea.prototype,"placeholder",2),_([l({type:Number})],n.GovTextarea.prototype,"rows",2),_([l({type:Number})],n.GovTextarea.prototype,"maxlength",2),_([l({type:Boolean,reflect:!0})],n.GovTextarea.prototype,"disabled",2),_([l({type:Boolean})],n.GovTextarea.prototype,"spellcheck",2),n.GovTextarea=_([y("govtw-textarea")],n.GovTextarea);var ce=Object.defineProperty,he=Object.getOwnPropertyDescriptor,z=(r,t,e,i)=>{for(var o=i>1?void 0:i?he(t,e):t,s=r.length-1,a;s>=0;s--)(a=r[s])&&(o=(i?a(t,e,o):a(o))||o);return i&&o&&ce(t,e,o),o};n.GovLink=class extends v{constructor(){super(...arguments),this.href="",this.target="",this.rel="",this.noVisited=!1,this.noUnderline=!1}render(){return p`
      <a
        href=${this.href||"#"}
        target=${this.target||c}
        rel=${this.rel||c}
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
  `,z([l({type:String})],n.GovLink.prototype,"href",2),z([l({type:String})],n.GovLink.prototype,"target",2),z([l({type:String})],n.GovLink.prototype,"rel",2),z([l({type:Boolean,reflect:!0,attribute:"no-visited"})],n.GovLink.prototype,"noVisited",2),z([l({type:Boolean,reflect:!0,attribute:"no-underline"})],n.GovLink.prototype,"noUnderline",2),n.GovLink=z([y("govtw-link")],n.GovLink);var de=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,R=(r,t,e,i)=>{for(var o=i>1?void 0:i?pe(t,e):t,s=r.length-1,a;s>=0;s--)(a=r[s])&&(o=(i?a(t,e,o):a(o))||o);return i&&o&&de(t,e,o),o};const x=new Map;return n.GovRadio=class extends v{constructor(){super(),this.checked=!1,this.disabled=!1,this.value="",this.name="",this.label="",this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),this._register()}disconnectedCallback(){super.disconnectedCallback(),this._unregister()}_register(){this.name&&(x.has(this.name)||x.set(this.name,new Set),x.get(this.name).add(this))}_unregister(){if(!this.name)return;const t=x.get(this.name);t&&(t.delete(this),t.size===0&&x.delete(this.name))}_select(){this.disabled||this.checked||(this._uncheckSiblings(),this.checked=!0,this._internals.setFormValue(this.value),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}_uncheckSiblings(){if(!this.name)return;const t=x.get(this.name);if(t)for(const e of t)e!==this&&(e.checked=!1)}updated(t){if(t.has("checked")){this._internals.setFormValue(this.checked?this.value:null);const e=this.shadowRoot?.querySelector("input");e&&(e.checked=this.checked)}if(t.has("name")){const e=t.get("name");if(e){const i=x.get(e);i&&(i.delete(this),i.size===0&&x.delete(e))}this._register()}}formResetCallback(){this.checked=!1}_handleClick(t){t.preventDefault(),this._select()}_handleKeydown(t){(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this._select())}render(){return p`
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
  `,R([l({type:Boolean,reflect:!0})],n.GovRadio.prototype,"checked",2),R([l({type:Boolean,reflect:!0})],n.GovRadio.prototype,"disabled",2),R([l({type:String})],n.GovRadio.prototype,"value",2),R([l({type:String})],n.GovRadio.prototype,"name",2),R([l({type:String})],n.GovRadio.prototype,"label",2),n.GovRadio=R([y("govtw-radio")],n.GovRadio),Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),n})({});
