(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const h of u.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerPolicy&&(u.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?u.credentials="include":l.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(l){if(l.ep)return;l.ep=!0;const u=i(l);fetch(l.href,u)}})();var Mh={exports:{}},Ho={};var f_;function rM(){if(f_)return Ho;f_=1;var o=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(s,l,u){var h=null;if(u!==void 0&&(h=""+u),l.key!==void 0&&(h=""+l.key),"key"in l){u={};for(var d in l)d!=="key"&&(u[d]=l[d])}else u=l;return l=u.ref,{$$typeof:o,type:s,key:h,ref:l!==void 0?l:null,props:u}}return Ho.Fragment=t,Ho.jsx=i,Ho.jsxs=i,Ho}var h_;function oM(){return h_||(h_=1,Mh.exports=rM()),Mh.exports}var Av=oM(),yh={exports:{}},Go={},Eh={exports:{}},bh={};var d_;function lM(){return d_||(d_=1,(function(o){function t(B,F){var $=B.length;B.push(F);t:for(;0<$;){var ct=$-1>>>1,Et=B[ct];if(0<l(Et,F))B[ct]=F,B[$]=Et,$=ct;else break t}}function i(B){return B.length===0?null:B[0]}function s(B){if(B.length===0)return null;var F=B[0],$=B.pop();if($!==F){B[0]=$;t:for(var ct=0,Et=B.length,N=Et>>>1;ct<N;){var Z=2*(ct+1)-1,St=B[Z],bt=Z+1,Nt=B[bt];if(0>l(St,$))bt<Et&&0>l(Nt,St)?(B[ct]=Nt,B[bt]=$,ct=bt):(B[ct]=St,B[Z]=$,ct=Z);else if(bt<Et&&0>l(Nt,$))B[ct]=Nt,B[bt]=$,ct=bt;else break t}}return F}function l(B,F){var $=B.sortIndex-F.sortIndex;return $!==0?$:B.id-F.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var u=performance;o.unstable_now=function(){return u.now()}}else{var h=Date,d=h.now();o.unstable_now=function(){return h.now()-d}}var m=[],p=[],v=1,x=null,g=3,E=!1,T=!1,D=!1,y=!1,S=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,z=typeof setImmediate<"u"?setImmediate:null;function C(B){for(var F=i(p);F!==null;){if(F.callback===null)s(p);else if(F.startTime<=B)s(p),F.sortIndex=F.expirationTime,t(m,F);else break;F=i(p)}}function I(B){if(D=!1,C(B),!T)if(i(m)!==null)T=!0,w||(w=!0,W());else{var F=i(p);F!==null&&j(I,F.startTime-B)}}var w=!1,P=-1,b=5,U=-1;function V(){return y?!0:!(o.unstable_now()-U<b)}function G(){if(y=!1,w){var B=o.unstable_now();U=B;var F=!0;try{t:{T=!1,D&&(D=!1,L(P),P=-1),E=!0;var $=g;try{e:{for(C(B),x=i(m);x!==null&&!(x.expirationTime>B&&V());){var ct=x.callback;if(typeof ct=="function"){x.callback=null,g=x.priorityLevel;var Et=ct(x.expirationTime<=B);if(B=o.unstable_now(),typeof Et=="function"){x.callback=Et,C(B),F=!0;break e}x===i(m)&&s(m),C(B)}else s(m);x=i(m)}if(x!==null)F=!0;else{var N=i(p);N!==null&&j(I,N.startTime-B),F=!1}}break t}finally{x=null,g=$,E=!1}F=void 0}}finally{F?W():w=!1}}}var W;if(typeof z=="function")W=function(){z(G)};else if(typeof MessageChannel<"u"){var lt=new MessageChannel,pt=lt.port2;lt.port1.onmessage=G,W=function(){pt.postMessage(null)}}else W=function(){S(G,0)};function j(B,F){P=S(function(){B(o.unstable_now())},F)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(B){B.callback=null},o.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<B?Math.floor(1e3/B):5},o.unstable_getCurrentPriorityLevel=function(){return g},o.unstable_next=function(B){switch(g){case 1:case 2:case 3:var F=3;break;default:F=g}var $=g;g=F;try{return B()}finally{g=$}},o.unstable_requestPaint=function(){y=!0},o.unstable_runWithPriority=function(B,F){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var $=g;g=B;try{return F()}finally{g=$}},o.unstable_scheduleCallback=function(B,F,$){var ct=o.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?ct+$:ct):$=ct,B){case 1:var Et=-1;break;case 2:Et=250;break;case 5:Et=1073741823;break;case 4:Et=1e4;break;default:Et=5e3}return Et=$+Et,B={id:v++,callback:F,priorityLevel:B,startTime:$,expirationTime:Et,sortIndex:-1},$>ct?(B.sortIndex=$,t(p,B),i(m)===null&&B===i(p)&&(D?(L(P),P=-1):D=!0,j(I,$-ct))):(B.sortIndex=Et,t(m,B),T||E||(T=!0,w||(w=!0,W()))),B},o.unstable_shouldYield=V,o.unstable_wrapCallback=function(B){var F=g;return function(){var $=g;g=F;try{return B.apply(this,arguments)}finally{g=$}}}})(bh)),bh}var p_;function uM(){return p_||(p_=1,Eh.exports=lM()),Eh.exports}var Th={exports:{}},ae={};var m_;function cM(){if(m_)return ae;m_=1;var o=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),u=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),g=Symbol.iterator;function E(N){return N===null||typeof N!="object"?null:(N=g&&N[g]||N["@@iterator"],typeof N=="function"?N:null)}var T={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D=Object.assign,y={};function S(N,Z,St){this.props=N,this.context=Z,this.refs=y,this.updater=St||T}S.prototype.isReactComponent={},S.prototype.setState=function(N,Z){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,Z,"setState")},S.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function L(){}L.prototype=S.prototype;function z(N,Z,St){this.props=N,this.context=Z,this.refs=y,this.updater=St||T}var C=z.prototype=new L;C.constructor=z,D(C,S.prototype),C.isPureReactComponent=!0;var I=Array.isArray;function w(){}var P={H:null,A:null,T:null,S:null},b=Object.prototype.hasOwnProperty;function U(N,Z,St){var bt=St.ref;return{$$typeof:o,type:N,key:Z,ref:bt!==void 0?bt:null,props:St}}function V(N,Z){return U(N.type,Z,N.props)}function G(N){return typeof N=="object"&&N!==null&&N.$$typeof===o}function W(N){var Z={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(St){return Z[St]})}var lt=/\/+/g;function pt(N,Z){return typeof N=="object"&&N!==null&&N.key!=null?W(""+N.key):Z.toString(36)}function j(N){switch(N.status){case"fulfilled":return N.value;case"rejected":throw N.reason;default:switch(typeof N.status=="string"?N.then(w,w):(N.status="pending",N.then(function(Z){N.status==="pending"&&(N.status="fulfilled",N.value=Z)},function(Z){N.status==="pending"&&(N.status="rejected",N.reason=Z)})),N.status){case"fulfilled":return N.value;case"rejected":throw N.reason}}throw N}function B(N,Z,St,bt,Nt){var tt=typeof N;(tt==="undefined"||tt==="boolean")&&(N=null);var xt=!1;if(N===null)xt=!0;else switch(tt){case"bigint":case"string":case"number":xt=!0;break;case"object":switch(N.$$typeof){case o:case t:xt=!0;break;case v:return xt=N._init,B(xt(N._payload),Z,St,bt,Nt)}}if(xt)return Nt=Nt(N),xt=bt===""?"."+pt(N,0):bt,I(Nt)?(St="",xt!=null&&(St=xt.replace(lt,"$&/")+"/"),B(Nt,Z,St,"",function(te){return te})):Nt!=null&&(G(Nt)&&(Nt=V(Nt,St+(Nt.key==null||N&&N.key===Nt.key?"":(""+Nt.key).replace(lt,"$&/")+"/")+xt)),Z.push(Nt)),1;xt=0;var Mt=bt===""?".":bt+":";if(I(N))for(var zt=0;zt<N.length;zt++)bt=N[zt],tt=Mt+pt(bt,zt),xt+=B(bt,Z,St,tt,Nt);else if(zt=E(N),typeof zt=="function")for(N=zt.call(N),zt=0;!(bt=N.next()).done;)bt=bt.value,tt=Mt+pt(bt,zt++),xt+=B(bt,Z,St,tt,Nt);else if(tt==="object"){if(typeof N.then=="function")return B(j(N),Z,St,bt,Nt);throw Z=String(N),Error("Objects are not valid as a React child (found: "+(Z==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":Z)+"). If you meant to render a collection of children, use an array instead.")}return xt}function F(N,Z,St){if(N==null)return N;var bt=[],Nt=0;return B(N,bt,"","",function(tt){return Z.call(St,tt,Nt++)}),bt}function $(N){if(N._status===-1){var Z=N._result;Z=Z(),Z.then(function(St){(N._status===0||N._status===-1)&&(N._status=1,N._result=St)},function(St){(N._status===0||N._status===-1)&&(N._status=2,N._result=St)}),N._status===-1&&(N._status=0,N._result=Z)}if(N._status===1)return N._result.default;throw N._result}var ct=typeof reportError=="function"?reportError:function(N){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof N=="object"&&N!==null&&typeof N.message=="string"?String(N.message):String(N),error:N});if(!window.dispatchEvent(Z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",N);return}console.error(N)},Et={map:F,forEach:function(N,Z,St){F(N,function(){Z.apply(this,arguments)},St)},count:function(N){var Z=0;return F(N,function(){Z++}),Z},toArray:function(N){return F(N,function(Z){return Z})||[]},only:function(N){if(!G(N))throw Error("React.Children.only expected to receive a single React element child.");return N}};return ae.Activity=x,ae.Children=Et,ae.Component=S,ae.Fragment=i,ae.Profiler=l,ae.PureComponent=z,ae.StrictMode=s,ae.Suspense=m,ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=P,ae.__COMPILER_RUNTIME={__proto__:null,c:function(N){return P.H.useMemoCache(N)}},ae.cache=function(N){return function(){return N.apply(null,arguments)}},ae.cacheSignal=function(){return null},ae.cloneElement=function(N,Z,St){if(N==null)throw Error("The argument must be a React element, but you passed "+N+".");var bt=D({},N.props),Nt=N.key;if(Z!=null)for(tt in Z.key!==void 0&&(Nt=""+Z.key),Z)!b.call(Z,tt)||tt==="key"||tt==="__self"||tt==="__source"||tt==="ref"&&Z.ref===void 0||(bt[tt]=Z[tt]);var tt=arguments.length-2;if(tt===1)bt.children=St;else if(1<tt){for(var xt=Array(tt),Mt=0;Mt<tt;Mt++)xt[Mt]=arguments[Mt+2];bt.children=xt}return U(N.type,Nt,bt)},ae.createContext=function(N){return N={$$typeof:h,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null},N.Provider=N,N.Consumer={$$typeof:u,_context:N},N},ae.createElement=function(N,Z,St){var bt,Nt={},tt=null;if(Z!=null)for(bt in Z.key!==void 0&&(tt=""+Z.key),Z)b.call(Z,bt)&&bt!=="key"&&bt!=="__self"&&bt!=="__source"&&(Nt[bt]=Z[bt]);var xt=arguments.length-2;if(xt===1)Nt.children=St;else if(1<xt){for(var Mt=Array(xt),zt=0;zt<xt;zt++)Mt[zt]=arguments[zt+2];Nt.children=Mt}if(N&&N.defaultProps)for(bt in xt=N.defaultProps,xt)Nt[bt]===void 0&&(Nt[bt]=xt[bt]);return U(N,tt,Nt)},ae.createRef=function(){return{current:null}},ae.forwardRef=function(N){return{$$typeof:d,render:N}},ae.isValidElement=G,ae.lazy=function(N){return{$$typeof:v,_payload:{_status:-1,_result:N},_init:$}},ae.memo=function(N,Z){return{$$typeof:p,type:N,compare:Z===void 0?null:Z}},ae.startTransition=function(N){var Z=P.T,St={};P.T=St;try{var bt=N(),Nt=P.S;Nt!==null&&Nt(St,bt),typeof bt=="object"&&bt!==null&&typeof bt.then=="function"&&bt.then(w,ct)}catch(tt){ct(tt)}finally{Z!==null&&St.types!==null&&(Z.types=St.types),P.T=Z}},ae.unstable_useCacheRefresh=function(){return P.H.useCacheRefresh()},ae.use=function(N){return P.H.use(N)},ae.useActionState=function(N,Z,St){return P.H.useActionState(N,Z,St)},ae.useCallback=function(N,Z){return P.H.useCallback(N,Z)},ae.useContext=function(N){return P.H.useContext(N)},ae.useDebugValue=function(){},ae.useDeferredValue=function(N,Z){return P.H.useDeferredValue(N,Z)},ae.useEffect=function(N,Z){return P.H.useEffect(N,Z)},ae.useEffectEvent=function(N){return P.H.useEffectEvent(N)},ae.useId=function(){return P.H.useId()},ae.useImperativeHandle=function(N,Z,St){return P.H.useImperativeHandle(N,Z,St)},ae.useInsertionEffect=function(N,Z){return P.H.useInsertionEffect(N,Z)},ae.useLayoutEffect=function(N,Z){return P.H.useLayoutEffect(N,Z)},ae.useMemo=function(N,Z){return P.H.useMemo(N,Z)},ae.useOptimistic=function(N,Z){return P.H.useOptimistic(N,Z)},ae.useReducer=function(N,Z,St){return P.H.useReducer(N,Z,St)},ae.useRef=function(N){return P.H.useRef(N)},ae.useState=function(N){return P.H.useState(N)},ae.useSyncExternalStore=function(N,Z,St){return P.H.useSyncExternalStore(N,Z,St)},ae.useTransition=function(){return P.H.useTransition()},ae.version="19.2.7",ae}var g_;function tp(){return g_||(g_=1,Th.exports=cM()),Th.exports}var Ah={exports:{}},Ln={};var __;function fM(){if(__)return Ln;__=1;var o=tp();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)p+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function u(m,p,v){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:x==null?null:""+x,children:m,containerInfo:p,implementation:v}}var h=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Ln.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Ln.createPortal=function(m,p){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return u(m,p,null,v)},Ln.flushSync=function(m){var p=h.T,v=s.p;try{if(h.T=null,s.p=2,m)return m()}finally{h.T=p,s.p=v,s.d.f()}},Ln.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},Ln.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Ln.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var v=p.as,x=d(v,p.crossOrigin),g=typeof p.integrity=="string"?p.integrity:void 0,E=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;v==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:x,integrity:g,fetchPriority:E}):v==="script"&&s.d.X(m,{crossOrigin:x,integrity:g,fetchPriority:E,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Ln.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var v=d(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},Ln.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var v=p.as,x=d(v,p.crossOrigin);s.d.L(m,v,{crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Ln.preloadModule=function(m,p){if(typeof m=="string")if(p){var v=d(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},Ln.requestFormReset=function(m){s.d.r(m)},Ln.unstable_batchedUpdates=function(m,p){return m(p)},Ln.useFormState=function(m,p,v){return h.H.useFormState(m,p,v)},Ln.useFormStatus=function(){return h.H.useHostTransitionStatus()},Ln.version="19.2.7",Ln}var v_;function hM(){if(v_)return Ah.exports;v_=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(t){console.error(t)}}return o(),Ah.exports=fM(),Ah.exports}var x_;function dM(){if(x_)return Go;x_=1;var o=uM(),t=tp(),i=hM();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function u(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function h(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function d(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(u(e)!==e)throw Error(s(188))}function p(e){var n=e.alternate;if(!n){if(n=u(e),n===null)throw Error(s(188));return n!==e?null:e}for(var a=e,r=n;;){var c=a.return;if(c===null)break;var f=c.alternate;if(f===null){if(r=c.return,r!==null){a=r;continue}break}if(c.child===f.child){for(f=c.child;f;){if(f===a)return m(c),e;if(f===r)return m(c),n;f=f.sibling}throw Error(s(188))}if(a.return!==r.return)a=c,r=f;else{for(var _=!1,R=c.child;R;){if(R===a){_=!0,a=c,r=f;break}if(R===r){_=!0,r=c,a=f;break}R=R.sibling}if(!_){for(R=f.child;R;){if(R===a){_=!0,a=f,r=c;break}if(R===r){_=!0,r=f,a=c;break}R=R.sibling}if(!_)throw Error(s(189))}}if(a.alternate!==r)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:n}function v(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=v(e),n!==null)return n;e=e.sibling}return null}var x=Object.assign,g=Symbol.for("react.element"),E=Symbol.for("react.transitional.element"),T=Symbol.for("react.portal"),D=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),L=Symbol.for("react.consumer"),z=Symbol.for("react.context"),C=Symbol.for("react.forward_ref"),I=Symbol.for("react.suspense"),w=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),U=Symbol.for("react.activity"),V=Symbol.for("react.memo_cache_sentinel"),G=Symbol.iterator;function W(e){return e===null||typeof e!="object"?null:(e=G&&e[G]||e["@@iterator"],typeof e=="function"?e:null)}var lt=Symbol.for("react.client.reference");function pt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===lt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case D:return"Fragment";case S:return"Profiler";case y:return"StrictMode";case I:return"Suspense";case w:return"SuspenseList";case U:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case T:return"Portal";case z:return e.displayName||"Context";case L:return(e._context.displayName||"Context")+".Consumer";case C:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case P:return n=e.displayName||null,n!==null?n:pt(e.type)||"Memo";case b:n=e._payload,e=e._init;try{return pt(e(n))}catch{}}return null}var j=Array.isArray,B=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,F=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,$={pending:!1,data:null,method:null,action:null},ct=[],Et=-1;function N(e){return{current:e}}function Z(e){0>Et||(e.current=ct[Et],ct[Et]=null,Et--)}function St(e,n){Et++,ct[Et]=e.current,e.current=n}var bt=N(null),Nt=N(null),tt=N(null),xt=N(null);function Mt(e,n){switch(St(tt,n),St(Nt,e),St(bt,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?O0(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=O0(n),e=P0(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}Z(bt),St(bt,e)}function zt(){Z(bt),Z(Nt),Z(tt)}function te(e){e.memoizedState!==null&&St(xt,e);var n=bt.current,a=P0(n,e.type);n!==a&&(St(Nt,e),St(bt,a))}function Kt(e){Nt.current===e&&(Z(bt),Z(Nt)),xt.current===e&&(Z(xt),Io._currentValue=$)}var He,re;function de(e){if(He===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);He=n&&n[1]||"",re=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+He+e+re}var pe=!1;function ue(e,n){if(!e||pe)return"";pe=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(n){var vt=function(){throw Error()};if(Object.defineProperty(vt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(vt,[])}catch(ut){var ot=ut}Reflect.construct(e,[],vt)}else{try{vt.call()}catch(ut){ot=ut}e.call(vt.prototype)}}else{try{throw Error()}catch(ut){ot=ut}(vt=e())&&typeof vt.catch=="function"&&vt.catch(function(){})}}catch(ut){if(ut&&ot&&typeof ut.stack=="string")return[ut.stack,ot.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=r.DetermineComponentFrameRoot(),_=f[0],R=f[1];if(_&&R){var H=_.split(`
`),nt=R.split(`
`);for(c=r=0;r<H.length&&!H[r].includes("DetermineComponentFrameRoot");)r++;for(;c<nt.length&&!nt[c].includes("DetermineComponentFrameRoot");)c++;if(r===H.length||c===nt.length)for(r=H.length-1,c=nt.length-1;1<=r&&0<=c&&H[r]!==nt[c];)c--;for(;1<=r&&0<=c;r--,c--)if(H[r]!==nt[c]){if(r!==1||c!==1)do if(r--,c--,0>c||H[r]!==nt[c]){var mt=`
`+H[r].replace(" at new "," at ");return e.displayName&&mt.includes("<anonymous>")&&(mt=mt.replace("<anonymous>",e.displayName)),mt}while(1<=r&&0<=c);break}}}finally{pe=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?de(a):""}function Ye(e,n){switch(e.tag){case 26:case 27:case 5:return de(e.type);case 16:return de("Lazy");case 13:return e.child!==n&&n!==null?de("Suspense Fallback"):de("Suspense");case 19:return de("SuspenseList");case 0:case 15:return ue(e.type,!1);case 11:return ue(e.type.render,!1);case 1:return ue(e.type,!0);case 31:return de("Activity");default:return""}}function Ze(e){try{var n="",a=null;do n+=Ye(e,a),a=e,e=e.return;while(e);return n}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}var Ce=Object.prototype.hasOwnProperty,je=o.unstable_scheduleCallback,Le=o.unstable_cancelCallback,Ke=o.unstable_shouldYield,q=o.unstable_requestPaint,De=o.unstable_now,Ee=o.unstable_getCurrentPriorityLevel,O=o.unstable_ImmediatePriority,M=o.unstable_UserBlockingPriority,J=o.unstable_NormalPriority,st=o.unstable_LowPriority,ft=o.unstable_IdlePriority,Tt=o.log,wt=o.unstable_setDisableYieldValue,ht=null,dt=null;function Rt(e){if(typeof Tt=="function"&&wt(e),dt&&typeof dt.setStrictMode=="function")try{dt.setStrictMode(ht,e)}catch{}}var Bt=Math.clz32?Math.clz32:Qt,Lt=Math.log,Dt=Math.LN2;function Qt(e){return e>>>=0,e===0?32:31-(Lt(e)/Dt|0)|0}var Jt=256,ne=262144,k=4194304;function At(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function gt(e,n,a){var r=e.pendingLanes;if(r===0)return 0;var c=0,f=e.suspendedLanes,_=e.pingedLanes;e=e.warmLanes;var R=r&134217727;return R!==0?(r=R&~f,r!==0?c=At(r):(_&=R,_!==0?c=At(_):a||(a=R&~e,a!==0&&(c=At(a))))):(R=r&~f,R!==0?c=At(R):_!==0?c=At(_):a||(a=r&~e,a!==0&&(c=At(a)))),c===0?0:n!==0&&n!==c&&(n&f)===0&&(f=c&-c,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:c}function Ct(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function It(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function yt(){var e=k;return k<<=1,(k&62914560)===0&&(k=4194304),e}function Wt(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function Gt(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function $e(e,n,a,r,c,f){var _=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var R=e.entanglements,H=e.expirationTimes,nt=e.hiddenUpdates;for(a=_&~a;0<a;){var mt=31-Bt(a),vt=1<<mt;R[mt]=0,H[mt]=-1;var ot=nt[mt];if(ot!==null)for(nt[mt]=null,mt=0;mt<ot.length;mt++){var ut=ot[mt];ut!==null&&(ut.lane&=-536870913)}a&=~vt}r!==0&&Oe(e,r,0),f!==0&&c===0&&e.tag!==0&&(e.suspendedLanes|=f&~(_&~n))}function Oe(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var r=31-Bt(n);e.entangledLanes|=n,e.entanglements[r]=e.entanglements[r]|1073741824|a&261930}function $n(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var r=31-Bt(a),c=1<<r;c&n|e[r]&n&&(e[r]|=n),a&=~c}}function ti(e,n){var a=n&-n;return a=(a&42)!==0?1:Kr(a),(a&(e.suspendedLanes|n))!==0?0:a}function Kr(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Qr(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Jr(){var e=F.p;return e!==0?e:(e=window.event,e===void 0?32:a_(e.type))}function Gs(e,n){var a=F.p;try{return F.p=e,n()}finally{F.p=a}}var Ii=Math.random().toString(36).slice(2),fn="__reactFiber$"+Ii,Tn="__reactProps$"+Ii,Xn="__reactContainer$"+Ii,ls="__reactEvents$"+Ii,rl="__reactListeners$"+Ii,ol="__reactHandles$"+Ii,us="__reactResources$"+Ii,ba="__reactMarker$"+Ii;function Ta(e){delete e[fn],delete e[Tn],delete e[ls],delete e[rl],delete e[ol]}function Ji(e){var n=e[fn];if(n)return n;for(var a=e.parentNode;a;){if(n=a[Xn]||a[fn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=V0(e);e!==null;){if(a=e[fn])return a;e=V0(e)}return n}e=a,a=e.parentNode}return null}function ji(e){if(e=e[fn]||e[Xn]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function cs(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function Aa(e){var n=e[us];return n||(n=e[us]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function hn(e){e[ba]=!0}var ll=new Set,A={};function Y(e,n){rt(e,n),rt(e+"Capture",n)}function rt(e,n){for(A[e]=n,e=0;e<n.length;e++)ll.add(n[e])}var it=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),at={},Ot={};function Ht(e){return Ce.call(Ot,e)?!0:Ce.call(at,e)?!1:it.test(e)?Ot[e]=!0:(at[e]=!0,!1)}function Ut(e,n,a){if(Ht(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var r=n.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function Xt(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function Vt(e,n,a,r){if(r===null)e.removeAttribute(a);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+r)}}function jt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function oe(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Yt(e,n,a){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var c=r.get,f=r.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return c.call(this)},set:function(_){a=""+_,f.call(this,_)}}),Object.defineProperty(e,n,{enumerable:r.enumerable}),{getValue:function(){return a},setValue:function(_){a=""+_},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Te(e){if(!e._valueTracker){var n=oe(e)?"checked":"value";e._valueTracker=Yt(e,n,""+e[n])}}function tn(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),r="";return e&&(r=oe(e)?e.checked?"true":"false":e.value),e=r,e!==a?(n.setValue(e),!0):!1}function We(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Pe=/[\n"\\]/g;function Ie(e){return e.replace(Pe,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Ft(e,n,a,r,c,f,_,R){e.name="",_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"?e.type=_:e.removeAttribute("type"),n!=null?_==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+jt(n)):e.value!==""+jt(n)&&(e.value=""+jt(n)):_!=="submit"&&_!=="reset"||e.removeAttribute("value"),n!=null?me(e,_,jt(n)):a!=null?me(e,_,jt(a)):r!=null&&e.removeAttribute("value"),c==null&&f!=null&&(e.defaultChecked=!!f),c!=null&&(e.checked=c&&typeof c!="function"&&typeof c!="symbol"),R!=null&&typeof R!="function"&&typeof R!="symbol"&&typeof R!="boolean"?e.name=""+jt(R):e.removeAttribute("name")}function Nn(e,n,a,r,c,f,_,R){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){Te(e);return}a=a!=null?""+jt(a):"",n=n!=null?""+jt(n):a,R||n===e.value||(e.value=n),e.defaultValue=n}r=r??c,r=typeof r!="function"&&typeof r!="symbol"&&!!r,e.checked=R?e.checked:!!r,e.defaultChecked=!!r,_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"&&(e.name=_),Te(e)}function me(e,n,a){n==="number"&&We(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function xn(e,n,a,r){if(e=e.options,n){n={};for(var c=0;c<a.length;c++)n["$"+a[c]]=!0;for(a=0;a<e.length;a++)c=n.hasOwnProperty("$"+e[a].value),e[a].selected!==c&&(e[a].selected=c),c&&r&&(e[a].defaultSelected=!0)}else{for(a=""+jt(a),n=null,c=0;c<e.length;c++){if(e[c].value===a){e[c].selected=!0,r&&(e[c].defaultSelected=!0);return}n!==null||e[c].disabled||(n=e[c])}n!==null&&(n.selected=!0)}}function ei(e,n,a){if(n!=null&&(n=""+jt(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+jt(a):""}function Ti(e,n,a,r){if(n==null){if(r!=null){if(a!=null)throw Error(s(92));if(j(r)){if(1<r.length)throw Error(s(93));r=r[0]}a=r}a==null&&(a=""),n=a}a=jt(n),e.defaultValue=a,r=e.textContent,r===a&&r!==""&&r!==null&&(e.value=r),Te(e)}function ni(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var ze=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function en(e,n,a){var r=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?r?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":r?e.setProperty(n,a):typeof a!="number"||a===0||ze.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function Ai(e,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,a!=null){for(var r in a)!a.hasOwnProperty(r)||n!=null&&n.hasOwnProperty(r)||(r.indexOf("--")===0?e.setProperty(r,""):r==="float"?e.cssFloat="":e[r]="");for(var c in n)r=n[c],n.hasOwnProperty(c)&&a[c]!==r&&en(e,c,r)}else for(var f in n)n.hasOwnProperty(f)&&en(e,f,n[f])}function Ue(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var zi=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ra=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function fs(e){return Ra.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function $i(){}var _c=null;function vc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Vs=null,Xs=null;function Lp(e){var n=ji(e);if(n&&(e=n.stateNode)){var a=e[Tn]||null;t:switch(e=n.stateNode,n.type){case"input":if(Ft(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Ie(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var r=a[n];if(r!==e&&r.form===e.form){var c=r[Tn]||null;if(!c)throw Error(s(90));Ft(r,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(n=0;n<a.length;n++)r=a[n],r.form===e.form&&tn(r)}break t;case"textarea":ei(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&xn(e,!!a.multiple,n,!1)}}}var xc=!1;function Op(e,n,a){if(xc)return e(n,a);xc=!0;try{var r=e(n);return r}finally{if(xc=!1,(Vs!==null||Xs!==null)&&(Kl(),Vs&&(n=Vs,e=Xs,Xs=Vs=null,Lp(n),e)))for(n=0;n<e.length;n++)Lp(e[n])}}function jr(e,n){var a=e.stateNode;if(a===null)return null;var r=a[Tn]||null;if(r===null)return null;a=r[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var ta=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Sc=!1;if(ta)try{var $r={};Object.defineProperty($r,"passive",{get:function(){Sc=!0}}),window.addEventListener("test",$r,$r),window.removeEventListener("test",$r,$r)}catch{Sc=!1}var Ca=null,Mc=null,ul=null;function Pp(){if(ul)return ul;var e,n=Mc,a=n.length,r,c="value"in Ca?Ca.value:Ca.textContent,f=c.length;for(e=0;e<a&&n[e]===c[e];e++);var _=a-e;for(r=1;r<=_&&n[a-r]===c[f-r];r++);return ul=c.slice(e,1<r?1-r:void 0)}function cl(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function fl(){return!0}function Ip(){return!1}function kn(e){function n(a,r,c,f,_){this._reactName=a,this._targetInst=c,this.type=r,this.nativeEvent=f,this.target=_,this.currentTarget=null;for(var R in e)e.hasOwnProperty(R)&&(a=e[R],this[R]=a?a(f):f[R]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?fl:Ip,this.isPropagationStopped=Ip,this}return x(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=fl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=fl)},persist:function(){},isPersistent:fl}),n}var hs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},hl=kn(hs),to=x({},hs,{view:0,detail:0}),ax=kn(to),yc,Ec,eo,dl=x({},to,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Tc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==eo&&(eo&&e.type==="mousemove"?(yc=e.screenX-eo.screenX,Ec=e.screenY-eo.screenY):Ec=yc=0,eo=e),yc)},movementY:function(e){return"movementY"in e?e.movementY:Ec}}),zp=kn(dl),sx=x({},dl,{dataTransfer:0}),rx=kn(sx),ox=x({},to,{relatedTarget:0}),bc=kn(ox),lx=x({},hs,{animationName:0,elapsedTime:0,pseudoElement:0}),ux=kn(lx),cx=x({},hs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),fx=kn(cx),hx=x({},hs,{data:0}),Bp=kn(hx),dx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},px={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},mx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gx(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=mx[e])?!!n[e]:!1}function Tc(){return gx}var _x=x({},to,{key:function(e){if(e.key){var n=dx[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=cl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?px[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Tc,charCode:function(e){return e.type==="keypress"?cl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?cl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),vx=kn(_x),xx=x({},dl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Fp=kn(xx),Sx=x({},to,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Tc}),Mx=kn(Sx),yx=x({},hs,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ex=kn(yx),bx=x({},dl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Tx=kn(bx),Ax=x({},hs,{newState:0,oldState:0}),Rx=kn(Ax),Cx=[9,13,27,32],Ac=ta&&"CompositionEvent"in window,no=null;ta&&"documentMode"in document&&(no=document.documentMode);var wx=ta&&"TextEvent"in window&&!no,Hp=ta&&(!Ac||no&&8<no&&11>=no),Gp=" ",Vp=!1;function Xp(e,n){switch(e){case"keyup":return Cx.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function kp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ks=!1;function Dx(e,n){switch(e){case"compositionend":return kp(n);case"keypress":return n.which!==32?null:(Vp=!0,Gp);case"textInput":return e=n.data,e===Gp&&Vp?null:e;default:return null}}function Ux(e,n){if(ks)return e==="compositionend"||!Ac&&Xp(e,n)?(e=Pp(),ul=Mc=Ca=null,ks=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Hp&&n.locale!=="ko"?null:n.data;default:return null}}var Nx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Wp(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Nx[e.type]:n==="textarea"}function qp(e,n,a,r){Vs?Xs?Xs.push(r):Xs=[r]:Vs=r,n=nu(n,"onChange"),0<n.length&&(a=new hl("onChange","change",null,a,r),e.push({event:a,listeners:n}))}var io=null,ao=null;function Lx(e){C0(e,0)}function pl(e){var n=cs(e);if(tn(n))return e}function Yp(e,n){if(e==="change")return n}var Zp=!1;if(ta){var Rc;if(ta){var Cc="oninput"in document;if(!Cc){var Kp=document.createElement("div");Kp.setAttribute("oninput","return;"),Cc=typeof Kp.oninput=="function"}Rc=Cc}else Rc=!1;Zp=Rc&&(!document.documentMode||9<document.documentMode)}function Qp(){io&&(io.detachEvent("onpropertychange",Jp),ao=io=null)}function Jp(e){if(e.propertyName==="value"&&pl(ao)){var n=[];qp(n,ao,e,vc(e)),Op(Lx,n)}}function Ox(e,n,a){e==="focusin"?(Qp(),io=n,ao=a,io.attachEvent("onpropertychange",Jp)):e==="focusout"&&Qp()}function Px(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return pl(ao)}function Ix(e,n){if(e==="click")return pl(n)}function zx(e,n){if(e==="input"||e==="change")return pl(n)}function Bx(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var ii=typeof Object.is=="function"?Object.is:Bx;function so(e,n){if(ii(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),r=Object.keys(n);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var c=a[r];if(!Ce.call(n,c)||!ii(e[c],n[c]))return!1}return!0}function jp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function $p(e,n){var a=jp(e);e=0;for(var r;a;){if(a.nodeType===3){if(r=e+a.textContent.length,e<=n&&r>=n)return{node:a,offset:n-e};e=r}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=jp(a)}}function tm(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?tm(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function em(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=We(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=We(e.document)}return n}function wc(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var Fx=ta&&"documentMode"in document&&11>=document.documentMode,Ws=null,Dc=null,ro=null,Uc=!1;function nm(e,n,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Uc||Ws==null||Ws!==We(r)||(r=Ws,"selectionStart"in r&&wc(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ro&&so(ro,r)||(ro=r,r=nu(Dc,"onSelect"),0<r.length&&(n=new hl("onSelect","select",null,n,a),e.push({event:n,listeners:r}),n.target=Ws)))}function ds(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var qs={animationend:ds("Animation","AnimationEnd"),animationiteration:ds("Animation","AnimationIteration"),animationstart:ds("Animation","AnimationStart"),transitionrun:ds("Transition","TransitionRun"),transitionstart:ds("Transition","TransitionStart"),transitioncancel:ds("Transition","TransitionCancel"),transitionend:ds("Transition","TransitionEnd")},Nc={},im={};ta&&(im=document.createElement("div").style,"AnimationEvent"in window||(delete qs.animationend.animation,delete qs.animationiteration.animation,delete qs.animationstart.animation),"TransitionEvent"in window||delete qs.transitionend.transition);function ps(e){if(Nc[e])return Nc[e];if(!qs[e])return e;var n=qs[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in im)return Nc[e]=n[a];return e}var am=ps("animationend"),sm=ps("animationiteration"),rm=ps("animationstart"),Hx=ps("transitionrun"),Gx=ps("transitionstart"),Vx=ps("transitioncancel"),om=ps("transitionend"),lm=new Map,Lc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Lc.push("scrollEnd");function Ri(e,n){lm.set(e,n),Y(n,[e])}var ml=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},mi=[],Ys=0,Oc=0;function gl(){for(var e=Ys,n=Oc=Ys=0;n<e;){var a=mi[n];mi[n++]=null;var r=mi[n];mi[n++]=null;var c=mi[n];mi[n++]=null;var f=mi[n];if(mi[n++]=null,r!==null&&c!==null){var _=r.pending;_===null?c.next=c:(c.next=_.next,_.next=c),r.pending=c}f!==0&&um(a,c,f)}}function _l(e,n,a,r){mi[Ys++]=e,mi[Ys++]=n,mi[Ys++]=a,mi[Ys++]=r,Oc|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Pc(e,n,a,r){return _l(e,n,a,r),vl(e)}function ms(e,n){return _l(e,null,null,n),vl(e)}function um(e,n,a){e.lanes|=a;var r=e.alternate;r!==null&&(r.lanes|=a);for(var c=!1,f=e.return;f!==null;)f.childLanes|=a,r=f.alternate,r!==null&&(r.childLanes|=a),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(c=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,c&&n!==null&&(c=31-Bt(a),e=f.hiddenUpdates,r=e[c],r===null?e[c]=[n]:r.push(n),n.lane=a|536870912),f):null}function vl(e){if(50<wo)throw wo=0,Wf=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Zs={};function Xx(e,n,a,r){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ai(e,n,a,r){return new Xx(e,n,a,r)}function Ic(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ea(e,n){var a=e.alternate;return a===null?(a=ai(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function cm(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function xl(e,n,a,r,c,f){var _=0;if(r=e,typeof e=="function")Ic(e)&&(_=1);else if(typeof e=="string")_=ZS(e,a,bt.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case U:return e=ai(31,a,n,c),e.elementType=U,e.lanes=f,e;case D:return gs(a.children,c,f,n);case y:_=8,c|=24;break;case S:return e=ai(12,a,n,c|2),e.elementType=S,e.lanes=f,e;case I:return e=ai(13,a,n,c),e.elementType=I,e.lanes=f,e;case w:return e=ai(19,a,n,c),e.elementType=w,e.lanes=f,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case z:_=10;break t;case L:_=9;break t;case C:_=11;break t;case P:_=14;break t;case b:_=16,r=null;break t}_=29,a=Error(s(130,e===null?"null":typeof e,"")),r=null}return n=ai(_,a,n,c),n.elementType=e,n.type=r,n.lanes=f,n}function gs(e,n,a,r){return e=ai(7,e,r,n),e.lanes=a,e}function zc(e,n,a){return e=ai(6,e,null,n),e.lanes=a,e}function fm(e){var n=ai(18,null,null,0);return n.stateNode=e,n}function Bc(e,n,a){return n=ai(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var hm=new WeakMap;function gi(e,n){if(typeof e=="object"&&e!==null){var a=hm.get(e);return a!==void 0?a:(n={value:e,source:n,stack:Ze(n)},hm.set(e,n),n)}return{value:e,source:n,stack:Ze(n)}}var Ks=[],Qs=0,Sl=null,oo=0,_i=[],vi=0,wa=null,Bi=1,Fi="";function na(e,n){Ks[Qs++]=oo,Ks[Qs++]=Sl,Sl=e,oo=n}function dm(e,n,a){_i[vi++]=Bi,_i[vi++]=Fi,_i[vi++]=wa,wa=e;var r=Bi;e=Fi;var c=32-Bt(r)-1;r&=~(1<<c),a+=1;var f=32-Bt(n)+c;if(30<f){var _=c-c%5;f=(r&(1<<_)-1).toString(32),r>>=_,c-=_,Bi=1<<32-Bt(n)+c|a<<c|r,Fi=f+e}else Bi=1<<f|a<<c|r,Fi=e}function Fc(e){e.return!==null&&(na(e,1),dm(e,1,0))}function Hc(e){for(;e===Sl;)Sl=Ks[--Qs],Ks[Qs]=null,oo=Ks[--Qs],Ks[Qs]=null;for(;e===wa;)wa=_i[--vi],_i[vi]=null,Fi=_i[--vi],_i[vi]=null,Bi=_i[--vi],_i[vi]=null}function pm(e,n){_i[vi++]=Bi,_i[vi++]=Fi,_i[vi++]=wa,Bi=n.id,Fi=n.overflow,wa=e}var An=null,Qe=null,Me=!1,Da=null,xi=!1,Gc=Error(s(519));function Ua(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw lo(gi(n,e)),Gc}function mm(e){var n=e.stateNode,a=e.type,r=e.memoizedProps;switch(n[fn]=e,n[Tn]=r,a){case"dialog":_e("cancel",n),_e("close",n);break;case"iframe":case"object":case"embed":_e("load",n);break;case"video":case"audio":for(a=0;a<Uo.length;a++)_e(Uo[a],n);break;case"source":_e("error",n);break;case"img":case"image":case"link":_e("error",n),_e("load",n);break;case"details":_e("toggle",n);break;case"input":_e("invalid",n),Nn(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":_e("invalid",n);break;case"textarea":_e("invalid",n),Ti(n,r.value,r.defaultValue,r.children)}a=r.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||r.suppressHydrationWarning===!0||N0(n.textContent,a)?(r.popover!=null&&(_e("beforetoggle",n),_e("toggle",n)),r.onScroll!=null&&_e("scroll",n),r.onScrollEnd!=null&&_e("scrollend",n),r.onClick!=null&&(n.onclick=$i),n=!0):n=!1,n||Ua(e,!0)}function gm(e){for(An=e.return;An;)switch(An.tag){case 5:case 31:case 13:xi=!1;return;case 27:case 3:xi=!0;return;default:An=An.return}}function Js(e){if(e!==An)return!1;if(!Me)return gm(e),Me=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||rh(e.type,e.memoizedProps)),a=!a),a&&Qe&&Ua(e),gm(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Qe=G0(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Qe=G0(e)}else n===27?(n=Qe,Wa(e.type)?(e=fh,fh=null,Qe=e):Qe=n):Qe=An?Mi(e.stateNode.nextSibling):null;return!0}function _s(){Qe=An=null,Me=!1}function Vc(){var e=Da;return e!==null&&(Zn===null?Zn=e:Zn.push.apply(Zn,e),Da=null),e}function lo(e){Da===null?Da=[e]:Da.push(e)}var Xc=N(null),vs=null,ia=null;function Na(e,n,a){St(Xc,n._currentValue),n._currentValue=a}function aa(e){e._currentValue=Xc.current,Z(Xc)}function kc(e,n,a){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===a)break;e=e.return}}function Wc(e,n,a,r){var c=e.child;for(c!==null&&(c.return=e);c!==null;){var f=c.dependencies;if(f!==null){var _=c.child;f=f.firstContext;t:for(;f!==null;){var R=f;f=c;for(var H=0;H<n.length;H++)if(R.context===n[H]){f.lanes|=a,R=f.alternate,R!==null&&(R.lanes|=a),kc(f.return,a,e),r||(_=null);break t}f=R.next}}else if(c.tag===18){if(_=c.return,_===null)throw Error(s(341));_.lanes|=a,f=_.alternate,f!==null&&(f.lanes|=a),kc(_,a,e),_=null}else _=c.child;if(_!==null)_.return=c;else for(_=c;_!==null;){if(_===e){_=null;break}if(c=_.sibling,c!==null){c.return=_.return,_=c;break}_=_.return}c=_}}function js(e,n,a,r){e=null;for(var c=n,f=!1;c!==null;){if(!f){if((c.flags&524288)!==0)f=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var _=c.alternate;if(_===null)throw Error(s(387));if(_=_.memoizedProps,_!==null){var R=c.type;ii(c.pendingProps.value,_.value)||(e!==null?e.push(R):e=[R])}}else if(c===xt.current){if(_=c.alternate,_===null)throw Error(s(387));_.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(e!==null?e.push(Io):e=[Io])}c=c.return}e!==null&&Wc(n,e,a,r),n.flags|=262144}function Ml(e){for(e=e.firstContext;e!==null;){if(!ii(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function xs(e){vs=e,ia=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Rn(e){return _m(vs,e)}function yl(e,n){return vs===null&&xs(e),_m(e,n)}function _m(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},ia===null){if(e===null)throw Error(s(308));ia=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else ia=ia.next=n;return a}var kx=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,r){e.push(r)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},Wx=o.unstable_scheduleCallback,qx=o.unstable_NormalPriority,dn={$$typeof:z,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function qc(){return{controller:new kx,data:new Map,refCount:0}}function uo(e){e.refCount--,e.refCount===0&&Wx(qx,function(){e.controller.abort()})}var co=null,Yc=0,$s=0,tr=null;function Yx(e,n){if(co===null){var a=co=[];Yc=0,$s=Jf(),tr={status:"pending",value:void 0,then:function(r){a.push(r)}}}return Yc++,n.then(vm,vm),n}function vm(){if(--Yc===0&&co!==null){tr!==null&&(tr.status="fulfilled");var e=co;co=null,$s=0,tr=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function Zx(e,n){var a=[],r={status:"pending",value:null,reason:null,then:function(c){a.push(c)}};return e.then(function(){r.status="fulfilled",r.value=n;for(var c=0;c<a.length;c++)(0,a[c])(n)},function(c){for(r.status="rejected",r.reason=c,c=0;c<a.length;c++)(0,a[c])(void 0)}),r}var xm=B.S;B.S=function(e,n){n0=De(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Yx(e,n),xm!==null&&xm(e,n)};var Ss=N(null);function Zc(){var e=Ss.current;return e!==null?e:qe.pooledCache}function El(e,n){n===null?St(Ss,Ss.current):St(Ss,n.pool)}function Sm(){var e=Zc();return e===null?null:{parent:dn._currentValue,pool:e}}var er=Error(s(460)),Kc=Error(s(474)),bl=Error(s(542)),Tl={then:function(){}};function Mm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function ym(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then($i,$i),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,bm(e),e;default:if(typeof n.status=="string")n.then($i,$i);else{if(e=qe,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(r){if(n.status==="pending"){var c=n;c.status="fulfilled",c.value=r}},function(r){if(n.status==="pending"){var c=n;c.status="rejected",c.reason=r}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,bm(e),e}throw ys=n,er}}function Ms(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(ys=a,er):a}}var ys=null;function Em(){if(ys===null)throw Error(s(459));var e=ys;return ys=null,e}function bm(e){if(e===er||e===bl)throw Error(s(483))}var nr=null,fo=0;function Al(e){var n=fo;return fo+=1,nr===null&&(nr=[]),ym(nr,e,n)}function ho(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Rl(e,n){throw n.$$typeof===g?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Tm(e){function n(Q,X){if(e){var et=Q.deletions;et===null?(Q.deletions=[X],Q.flags|=16):et.push(X)}}function a(Q,X){if(!e)return null;for(;X!==null;)n(Q,X),X=X.sibling;return null}function r(Q){for(var X=new Map;Q!==null;)Q.key!==null?X.set(Q.key,Q):X.set(Q.index,Q),Q=Q.sibling;return X}function c(Q,X){return Q=ea(Q,X),Q.index=0,Q.sibling=null,Q}function f(Q,X,et){return Q.index=et,e?(et=Q.alternate,et!==null?(et=et.index,et<X?(Q.flags|=67108866,X):et):(Q.flags|=67108866,X)):(Q.flags|=1048576,X)}function _(Q){return e&&Q.alternate===null&&(Q.flags|=67108866),Q}function R(Q,X,et,_t){return X===null||X.tag!==6?(X=zc(et,Q.mode,_t),X.return=Q,X):(X=c(X,et),X.return=Q,X)}function H(Q,X,et,_t){var $t=et.type;return $t===D?mt(Q,X,et.props.children,_t,et.key):X!==null&&(X.elementType===$t||typeof $t=="object"&&$t!==null&&$t.$$typeof===b&&Ms($t)===X.type)?(X=c(X,et.props),ho(X,et),X.return=Q,X):(X=xl(et.type,et.key,et.props,null,Q.mode,_t),ho(X,et),X.return=Q,X)}function nt(Q,X,et,_t){return X===null||X.tag!==4||X.stateNode.containerInfo!==et.containerInfo||X.stateNode.implementation!==et.implementation?(X=Bc(et,Q.mode,_t),X.return=Q,X):(X=c(X,et.children||[]),X.return=Q,X)}function mt(Q,X,et,_t,$t){return X===null||X.tag!==7?(X=gs(et,Q.mode,_t,$t),X.return=Q,X):(X=c(X,et),X.return=Q,X)}function vt(Q,X,et){if(typeof X=="string"&&X!==""||typeof X=="number"||typeof X=="bigint")return X=zc(""+X,Q.mode,et),X.return=Q,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case E:return et=xl(X.type,X.key,X.props,null,Q.mode,et),ho(et,X),et.return=Q,et;case T:return X=Bc(X,Q.mode,et),X.return=Q,X;case b:return X=Ms(X),vt(Q,X,et)}if(j(X)||W(X))return X=gs(X,Q.mode,et,null),X.return=Q,X;if(typeof X.then=="function")return vt(Q,Al(X),et);if(X.$$typeof===z)return vt(Q,yl(Q,X),et);Rl(Q,X)}return null}function ot(Q,X,et,_t){var $t=X!==null?X.key:null;if(typeof et=="string"&&et!==""||typeof et=="number"||typeof et=="bigint")return $t!==null?null:R(Q,X,""+et,_t);if(typeof et=="object"&&et!==null){switch(et.$$typeof){case E:return et.key===$t?H(Q,X,et,_t):null;case T:return et.key===$t?nt(Q,X,et,_t):null;case b:return et=Ms(et),ot(Q,X,et,_t)}if(j(et)||W(et))return $t!==null?null:mt(Q,X,et,_t,null);if(typeof et.then=="function")return ot(Q,X,Al(et),_t);if(et.$$typeof===z)return ot(Q,X,yl(Q,et),_t);Rl(Q,et)}return null}function ut(Q,X,et,_t,$t){if(typeof _t=="string"&&_t!==""||typeof _t=="number"||typeof _t=="bigint")return Q=Q.get(et)||null,R(X,Q,""+_t,$t);if(typeof _t=="object"&&_t!==null){switch(_t.$$typeof){case E:return Q=Q.get(_t.key===null?et:_t.key)||null,H(X,Q,_t,$t);case T:return Q=Q.get(_t.key===null?et:_t.key)||null,nt(X,Q,_t,$t);case b:return _t=Ms(_t),ut(Q,X,et,_t,$t)}if(j(_t)||W(_t))return Q=Q.get(et)||null,mt(X,Q,_t,$t,null);if(typeof _t.then=="function")return ut(Q,X,et,Al(_t),$t);if(_t.$$typeof===z)return ut(Q,X,et,yl(X,_t),$t);Rl(X,_t)}return null}function kt(Q,X,et,_t){for(var $t=null,Ae=null,qt=X,ce=X=0,xe=null;qt!==null&&ce<et.length;ce++){qt.index>ce?(xe=qt,qt=null):xe=qt.sibling;var Re=ot(Q,qt,et[ce],_t);if(Re===null){qt===null&&(qt=xe);break}e&&qt&&Re.alternate===null&&n(Q,qt),X=f(Re,X,ce),Ae===null?$t=Re:Ae.sibling=Re,Ae=Re,qt=xe}if(ce===et.length)return a(Q,qt),Me&&na(Q,ce),$t;if(qt===null){for(;ce<et.length;ce++)qt=vt(Q,et[ce],_t),qt!==null&&(X=f(qt,X,ce),Ae===null?$t=qt:Ae.sibling=qt,Ae=qt);return Me&&na(Q,ce),$t}for(qt=r(qt);ce<et.length;ce++)xe=ut(qt,Q,ce,et[ce],_t),xe!==null&&(e&&xe.alternate!==null&&qt.delete(xe.key===null?ce:xe.key),X=f(xe,X,ce),Ae===null?$t=xe:Ae.sibling=xe,Ae=xe);return e&&qt.forEach(function(Qa){return n(Q,Qa)}),Me&&na(Q,ce),$t}function ee(Q,X,et,_t){if(et==null)throw Error(s(151));for(var $t=null,Ae=null,qt=X,ce=X=0,xe=null,Re=et.next();qt!==null&&!Re.done;ce++,Re=et.next()){qt.index>ce?(xe=qt,qt=null):xe=qt.sibling;var Qa=ot(Q,qt,Re.value,_t);if(Qa===null){qt===null&&(qt=xe);break}e&&qt&&Qa.alternate===null&&n(Q,qt),X=f(Qa,X,ce),Ae===null?$t=Qa:Ae.sibling=Qa,Ae=Qa,qt=xe}if(Re.done)return a(Q,qt),Me&&na(Q,ce),$t;if(qt===null){for(;!Re.done;ce++,Re=et.next())Re=vt(Q,Re.value,_t),Re!==null&&(X=f(Re,X,ce),Ae===null?$t=Re:Ae.sibling=Re,Ae=Re);return Me&&na(Q,ce),$t}for(qt=r(qt);!Re.done;ce++,Re=et.next())Re=ut(qt,Q,ce,Re.value,_t),Re!==null&&(e&&Re.alternate!==null&&qt.delete(Re.key===null?ce:Re.key),X=f(Re,X,ce),Ae===null?$t=Re:Ae.sibling=Re,Ae=Re);return e&&qt.forEach(function(sM){return n(Q,sM)}),Me&&na(Q,ce),$t}function Xe(Q,X,et,_t){if(typeof et=="object"&&et!==null&&et.type===D&&et.key===null&&(et=et.props.children),typeof et=="object"&&et!==null){switch(et.$$typeof){case E:t:{for(var $t=et.key;X!==null;){if(X.key===$t){if($t=et.type,$t===D){if(X.tag===7){a(Q,X.sibling),_t=c(X,et.props.children),_t.return=Q,Q=_t;break t}}else if(X.elementType===$t||typeof $t=="object"&&$t!==null&&$t.$$typeof===b&&Ms($t)===X.type){a(Q,X.sibling),_t=c(X,et.props),ho(_t,et),_t.return=Q,Q=_t;break t}a(Q,X);break}else n(Q,X);X=X.sibling}et.type===D?(_t=gs(et.props.children,Q.mode,_t,et.key),_t.return=Q,Q=_t):(_t=xl(et.type,et.key,et.props,null,Q.mode,_t),ho(_t,et),_t.return=Q,Q=_t)}return _(Q);case T:t:{for($t=et.key;X!==null;){if(X.key===$t)if(X.tag===4&&X.stateNode.containerInfo===et.containerInfo&&X.stateNode.implementation===et.implementation){a(Q,X.sibling),_t=c(X,et.children||[]),_t.return=Q,Q=_t;break t}else{a(Q,X);break}else n(Q,X);X=X.sibling}_t=Bc(et,Q.mode,_t),_t.return=Q,Q=_t}return _(Q);case b:return et=Ms(et),Xe(Q,X,et,_t)}if(j(et))return kt(Q,X,et,_t);if(W(et)){if($t=W(et),typeof $t!="function")throw Error(s(150));return et=$t.call(et),ee(Q,X,et,_t)}if(typeof et.then=="function")return Xe(Q,X,Al(et),_t);if(et.$$typeof===z)return Xe(Q,X,yl(Q,et),_t);Rl(Q,et)}return typeof et=="string"&&et!==""||typeof et=="number"||typeof et=="bigint"?(et=""+et,X!==null&&X.tag===6?(a(Q,X.sibling),_t=c(X,et),_t.return=Q,Q=_t):(a(Q,X),_t=zc(et,Q.mode,_t),_t.return=Q,Q=_t),_(Q)):a(Q,X)}return function(Q,X,et,_t){try{fo=0;var $t=Xe(Q,X,et,_t);return nr=null,$t}catch(qt){if(qt===er||qt===bl)throw qt;var Ae=ai(29,qt,null,Q.mode);return Ae.lanes=_t,Ae.return=Q,Ae}finally{}}}var Es=Tm(!0),Am=Tm(!1),La=!1;function Qc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Jc(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Oa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Pa(e,n,a){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(we&2)!==0){var c=r.pending;return c===null?n.next=n:(n.next=c.next,c.next=n),r.pending=n,n=vl(e),um(e,null,a),n}return _l(e,r,n,a),vl(e)}function po(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var r=n.lanes;r&=e.pendingLanes,a|=r,n.lanes=a,$n(e,a)}}function jc(e,n){var a=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var c=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var _={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?c=f=_:f=f.next=_,a=a.next}while(a!==null);f===null?c=f=n:f=f.next=n}else c=f=n;a={baseState:r.baseState,firstBaseUpdate:c,lastBaseUpdate:f,shared:r.shared,callbacks:r.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var $c=!1;function mo(){if($c){var e=tr;if(e!==null)throw e}}function go(e,n,a,r){$c=!1;var c=e.updateQueue;La=!1;var f=c.firstBaseUpdate,_=c.lastBaseUpdate,R=c.shared.pending;if(R!==null){c.shared.pending=null;var H=R,nt=H.next;H.next=null,_===null?f=nt:_.next=nt,_=H;var mt=e.alternate;mt!==null&&(mt=mt.updateQueue,R=mt.lastBaseUpdate,R!==_&&(R===null?mt.firstBaseUpdate=nt:R.next=nt,mt.lastBaseUpdate=H))}if(f!==null){var vt=c.baseState;_=0,mt=nt=H=null,R=f;do{var ot=R.lane&-536870913,ut=ot!==R.lane;if(ut?(ve&ot)===ot:(r&ot)===ot){ot!==0&&ot===$s&&($c=!0),mt!==null&&(mt=mt.next={lane:0,tag:R.tag,payload:R.payload,callback:null,next:null});t:{var kt=e,ee=R;ot=n;var Xe=a;switch(ee.tag){case 1:if(kt=ee.payload,typeof kt=="function"){vt=kt.call(Xe,vt,ot);break t}vt=kt;break t;case 3:kt.flags=kt.flags&-65537|128;case 0:if(kt=ee.payload,ot=typeof kt=="function"?kt.call(Xe,vt,ot):kt,ot==null)break t;vt=x({},vt,ot);break t;case 2:La=!0}}ot=R.callback,ot!==null&&(e.flags|=64,ut&&(e.flags|=8192),ut=c.callbacks,ut===null?c.callbacks=[ot]:ut.push(ot))}else ut={lane:ot,tag:R.tag,payload:R.payload,callback:R.callback,next:null},mt===null?(nt=mt=ut,H=vt):mt=mt.next=ut,_|=ot;if(R=R.next,R===null){if(R=c.shared.pending,R===null)break;ut=R,R=ut.next,ut.next=null,c.lastBaseUpdate=ut,c.shared.pending=null}}while(!0);mt===null&&(H=vt),c.baseState=H,c.firstBaseUpdate=nt,c.lastBaseUpdate=mt,f===null&&(c.shared.lanes=0),Ha|=_,e.lanes=_,e.memoizedState=vt}}function Rm(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function Cm(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Rm(a[e],n)}var ir=N(null),Cl=N(0);function wm(e,n){e=da,St(Cl,e),St(ir,n),da=e|n.baseLanes}function tf(){St(Cl,da),St(ir,ir.current)}function ef(){da=Cl.current,Z(ir),Z(Cl)}var si=N(null),Si=null;function Ia(e){var n=e.alternate;St(un,un.current&1),St(si,e),Si===null&&(n===null||ir.current!==null||n.memoizedState!==null)&&(Si=e)}function nf(e){St(un,un.current),St(si,e),Si===null&&(Si=e)}function Dm(e){e.tag===22?(St(un,un.current),St(si,e),Si===null&&(Si=e)):za()}function za(){St(un,un.current),St(si,si.current)}function ri(e){Z(si),Si===e&&(Si=null),Z(un)}var un=N(0);function wl(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||uh(a)||ch(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var sa=0,le=null,Ge=null,pn=null,Dl=!1,ar=!1,bs=!1,Ul=0,_o=0,sr=null,Kx=0;function on(){throw Error(s(321))}function af(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!ii(e[a],n[a]))return!1;return!0}function sf(e,n,a,r,c,f){return sa=f,le=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,B.H=e===null||e.memoizedState===null?dg:Sf,bs=!1,f=a(r,c),bs=!1,ar&&(f=Nm(n,a,r,c)),Um(e),f}function Um(e){B.H=So;var n=Ge!==null&&Ge.next!==null;if(sa=0,pn=Ge=le=null,Dl=!1,_o=0,sr=null,n)throw Error(s(300));e===null||mn||(e=e.dependencies,e!==null&&Ml(e)&&(mn=!0))}function Nm(e,n,a,r){le=e;var c=0;do{if(ar&&(sr=null),_o=0,ar=!1,25<=c)throw Error(s(301));if(c+=1,pn=Ge=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}B.H=pg,f=n(a,r)}while(ar);return f}function Qx(){var e=B.H,n=e.useState()[0];return n=typeof n.then=="function"?vo(n):n,e=e.useState()[0],(Ge!==null?Ge.memoizedState:null)!==e&&(le.flags|=1024),n}function rf(){var e=Ul!==0;return Ul=0,e}function of(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function lf(e){if(Dl){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Dl=!1}sa=0,pn=Ge=le=null,ar=!1,_o=Ul=0,sr=null}function Bn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return pn===null?le.memoizedState=pn=e:pn=pn.next=e,pn}function cn(){if(Ge===null){var e=le.alternate;e=e!==null?e.memoizedState:null}else e=Ge.next;var n=pn===null?le.memoizedState:pn.next;if(n!==null)pn=n,Ge=e;else{if(e===null)throw le.alternate===null?Error(s(467)):Error(s(310));Ge=e,e={memoizedState:Ge.memoizedState,baseState:Ge.baseState,baseQueue:Ge.baseQueue,queue:Ge.queue,next:null},pn===null?le.memoizedState=pn=e:pn=pn.next=e}return pn}function Nl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function vo(e){var n=_o;return _o+=1,sr===null&&(sr=[]),e=ym(sr,e,n),n=le,(pn===null?n.memoizedState:pn.next)===null&&(n=n.alternate,B.H=n===null||n.memoizedState===null?dg:Sf),e}function Ll(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return vo(e);if(e.$$typeof===z)return Rn(e)}throw Error(s(438,String(e)))}function uf(e){var n=null,a=le.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var r=le.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(n={data:r.data.map(function(c){return c.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Nl(),le.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),r=0;r<e;r++)a[r]=V;return n.index++,a}function ra(e,n){return typeof n=="function"?n(e):n}function Ol(e){var n=cn();return cf(n,Ge,e)}function cf(e,n,a){var r=e.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=a;var c=e.baseQueue,f=r.pending;if(f!==null){if(c!==null){var _=c.next;c.next=f.next,f.next=_}n.baseQueue=c=f,r.pending=null}if(f=e.baseState,c===null)e.memoizedState=f;else{n=c.next;var R=_=null,H=null,nt=n,mt=!1;do{var vt=nt.lane&-536870913;if(vt!==nt.lane?(ve&vt)===vt:(sa&vt)===vt){var ot=nt.revertLane;if(ot===0)H!==null&&(H=H.next={lane:0,revertLane:0,gesture:null,action:nt.action,hasEagerState:nt.hasEagerState,eagerState:nt.eagerState,next:null}),vt===$s&&(mt=!0);else if((sa&ot)===ot){nt=nt.next,ot===$s&&(mt=!0);continue}else vt={lane:0,revertLane:nt.revertLane,gesture:null,action:nt.action,hasEagerState:nt.hasEagerState,eagerState:nt.eagerState,next:null},H===null?(R=H=vt,_=f):H=H.next=vt,le.lanes|=ot,Ha|=ot;vt=nt.action,bs&&a(f,vt),f=nt.hasEagerState?nt.eagerState:a(f,vt)}else ot={lane:vt,revertLane:nt.revertLane,gesture:nt.gesture,action:nt.action,hasEagerState:nt.hasEagerState,eagerState:nt.eagerState,next:null},H===null?(R=H=ot,_=f):H=H.next=ot,le.lanes|=vt,Ha|=vt;nt=nt.next}while(nt!==null&&nt!==n);if(H===null?_=f:H.next=R,!ii(f,e.memoizedState)&&(mn=!0,mt&&(a=tr,a!==null)))throw a;e.memoizedState=f,e.baseState=_,e.baseQueue=H,r.lastRenderedState=f}return c===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function ff(e){var n=cn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var r=a.dispatch,c=a.pending,f=n.memoizedState;if(c!==null){a.pending=null;var _=c=c.next;do f=e(f,_.action),_=_.next;while(_!==c);ii(f,n.memoizedState)||(mn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,r]}function Lm(e,n,a){var r=le,c=cn(),f=Me;if(f){if(a===void 0)throw Error(s(407));a=a()}else a=n();var _=!ii((Ge||c).memoizedState,a);if(_&&(c.memoizedState=a,mn=!0),c=c.queue,pf(Im.bind(null,r,c,e),[e]),c.getSnapshot!==n||_||pn!==null&&pn.memoizedState.tag&1){if(r.flags|=2048,rr(9,{destroy:void 0},Pm.bind(null,r,c,a,n),null),qe===null)throw Error(s(349));f||(sa&127)!==0||Om(r,n,a)}return a}function Om(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=le.updateQueue,n===null?(n=Nl(),le.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function Pm(e,n,a,r){n.value=a,n.getSnapshot=r,zm(n)&&Bm(e)}function Im(e,n,a){return a(function(){zm(n)&&Bm(e)})}function zm(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!ii(e,a)}catch{return!0}}function Bm(e){var n=ms(e,2);n!==null&&Kn(n,e,2)}function hf(e){var n=Bn();if(typeof e=="function"){var a=e;if(e=a(),bs){Rt(!0);try{a()}finally{Rt(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ra,lastRenderedState:e},n}function Fm(e,n,a,r){return e.baseState=a,cf(e,Ge,typeof r=="function"?r:ra)}function Jx(e,n,a,r,c){if(zl(e))throw Error(s(485));if(e=n.action,e!==null){var f={payload:c,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(_){f.listeners.push(_)}};B.T!==null?a(!0):f.isTransition=!1,r(f),a=n.pending,a===null?(f.next=n.pending=f,Hm(n,f)):(f.next=a.next,n.pending=a.next=f)}}function Hm(e,n){var a=n.action,r=n.payload,c=e.state;if(n.isTransition){var f=B.T,_={};B.T=_;try{var R=a(c,r),H=B.S;H!==null&&H(_,R),Gm(e,n,R)}catch(nt){df(e,n,nt)}finally{f!==null&&_.types!==null&&(f.types=_.types),B.T=f}}else try{f=a(c,r),Gm(e,n,f)}catch(nt){df(e,n,nt)}}function Gm(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(r){Vm(e,n,r)},function(r){return df(e,n,r)}):Vm(e,n,a)}function Vm(e,n,a){n.status="fulfilled",n.value=a,Xm(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,Hm(e,a)))}function df(e,n,a){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do n.status="rejected",n.reason=a,Xm(n),n=n.next;while(n!==r)}e.action=null}function Xm(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function km(e,n){return n}function Wm(e,n){if(Me){var a=qe.formState;if(a!==null){t:{var r=le;if(Me){if(Qe){e:{for(var c=Qe,f=xi;c.nodeType!==8;){if(!f){c=null;break e}if(c=Mi(c.nextSibling),c===null){c=null;break e}}f=c.data,c=f==="F!"||f==="F"?c:null}if(c){Qe=Mi(c.nextSibling),r=c.data==="F!";break t}}Ua(r)}r=!1}r&&(n=a[0])}}return a=Bn(),a.memoizedState=a.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:km,lastRenderedState:n},a.queue=r,a=cg.bind(null,le,r),r.dispatch=a,r=hf(!1),f=xf.bind(null,le,!1,r.queue),r=Bn(),c={state:n,dispatch:null,action:e,pending:null},r.queue=c,a=Jx.bind(null,le,c,f,a),c.dispatch=a,r.memoizedState=e,[n,a,!1]}function qm(e){var n=cn();return Ym(n,Ge,e)}function Ym(e,n,a){if(n=cf(e,n,km)[0],e=Ol(ra)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var r=vo(n)}catch(_){throw _===er?bl:_}else r=n;n=cn();var c=n.queue,f=c.dispatch;return a!==n.memoizedState&&(le.flags|=2048,rr(9,{destroy:void 0},jx.bind(null,c,a),null)),[r,f,e]}function jx(e,n){e.action=n}function Zm(e){var n=cn(),a=Ge;if(a!==null)return Ym(n,a,e);cn(),n=n.memoizedState,a=cn();var r=a.queue.dispatch;return a.memoizedState=e,[n,r,!1]}function rr(e,n,a,r){return e={tag:e,create:a,deps:r,inst:n,next:null},n=le.updateQueue,n===null&&(n=Nl(),le.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(r=a.next,a.next=e,e.next=r,n.lastEffect=e),e}function Km(){return cn().memoizedState}function Pl(e,n,a,r){var c=Bn();le.flags|=e,c.memoizedState=rr(1|n,{destroy:void 0},a,r===void 0?null:r)}function Il(e,n,a,r){var c=cn();r=r===void 0?null:r;var f=c.memoizedState.inst;Ge!==null&&r!==null&&af(r,Ge.memoizedState.deps)?c.memoizedState=rr(n,f,a,r):(le.flags|=e,c.memoizedState=rr(1|n,f,a,r))}function Qm(e,n){Pl(8390656,8,e,n)}function pf(e,n){Il(2048,8,e,n)}function $x(e){le.flags|=4;var n=le.updateQueue;if(n===null)n=Nl(),le.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function Jm(e){var n=cn().memoizedState;return $x({ref:n,nextImpl:e}),function(){if((we&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function jm(e,n){return Il(4,2,e,n)}function $m(e,n){return Il(4,4,e,n)}function tg(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function eg(e,n,a){a=a!=null?a.concat([e]):null,Il(4,4,tg.bind(null,n,e),a)}function mf(){}function ng(e,n){var a=cn();n=n===void 0?null:n;var r=a.memoizedState;return n!==null&&af(n,r[1])?r[0]:(a.memoizedState=[e,n],e)}function ig(e,n){var a=cn();n=n===void 0?null:n;var r=a.memoizedState;if(n!==null&&af(n,r[1]))return r[0];if(r=e(),bs){Rt(!0);try{e()}finally{Rt(!1)}}return a.memoizedState=[r,n],r}function gf(e,n,a){return a===void 0||(sa&1073741824)!==0&&(ve&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=a0(),le.lanes|=e,Ha|=e,a)}function ag(e,n,a,r){return ii(a,n)?a:ir.current!==null?(e=gf(e,a,r),ii(e,n)||(mn=!0),e):(sa&42)===0||(sa&1073741824)!==0&&(ve&261930)===0?(mn=!0,e.memoizedState=a):(e=a0(),le.lanes|=e,Ha|=e,n)}function sg(e,n,a,r,c){var f=F.p;F.p=f!==0&&8>f?f:8;var _=B.T,R={};B.T=R,xf(e,!1,n,a);try{var H=c(),nt=B.S;if(nt!==null&&nt(R,H),H!==null&&typeof H=="object"&&typeof H.then=="function"){var mt=Zx(H,r);xo(e,n,mt,ui(e))}else xo(e,n,r,ui(e))}catch(vt){xo(e,n,{then:function(){},status:"rejected",reason:vt},ui())}finally{F.p=f,_!==null&&R.types!==null&&(_.types=R.types),B.T=_}}function tS(){}function _f(e,n,a,r){if(e.tag!==5)throw Error(s(476));var c=rg(e).queue;sg(e,c,n,$,a===null?tS:function(){return og(e),a(r)})}function rg(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:$,baseState:$,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ra,lastRenderedState:$},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ra,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function og(e){var n=rg(e);n.next===null&&(n=e.alternate.memoizedState),xo(e,n.next.queue,{},ui())}function vf(){return Rn(Io)}function lg(){return cn().memoizedState}function ug(){return cn().memoizedState}function eS(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=ui();e=Oa(a);var r=Pa(n,e,a);r!==null&&(Kn(r,n,a),po(r,n,a)),n={cache:qc()},e.payload=n;return}n=n.return}}function nS(e,n,a){var r=ui();a={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},zl(e)?fg(n,a):(a=Pc(e,n,a,r),a!==null&&(Kn(a,e,r),hg(a,n,r)))}function cg(e,n,a){var r=ui();xo(e,n,a,r)}function xo(e,n,a,r){var c={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(zl(e))fg(n,c);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var _=n.lastRenderedState,R=f(_,a);if(c.hasEagerState=!0,c.eagerState=R,ii(R,_))return _l(e,n,c,0),qe===null&&gl(),!1}catch{}finally{}if(a=Pc(e,n,c,r),a!==null)return Kn(a,e,r),hg(a,n,r),!0}return!1}function xf(e,n,a,r){if(r={lane:2,revertLane:Jf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},zl(e)){if(n)throw Error(s(479))}else n=Pc(e,a,r,2),n!==null&&Kn(n,e,2)}function zl(e){var n=e.alternate;return e===le||n!==null&&n===le}function fg(e,n){ar=Dl=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function hg(e,n,a){if((a&4194048)!==0){var r=n.lanes;r&=e.pendingLanes,a|=r,n.lanes=a,$n(e,a)}}var So={readContext:Rn,use:Ll,useCallback:on,useContext:on,useEffect:on,useImperativeHandle:on,useLayoutEffect:on,useInsertionEffect:on,useMemo:on,useReducer:on,useRef:on,useState:on,useDebugValue:on,useDeferredValue:on,useTransition:on,useSyncExternalStore:on,useId:on,useHostTransitionStatus:on,useFormState:on,useActionState:on,useOptimistic:on,useMemoCache:on,useCacheRefresh:on};So.useEffectEvent=on;var dg={readContext:Rn,use:Ll,useCallback:function(e,n){return Bn().memoizedState=[e,n===void 0?null:n],e},useContext:Rn,useEffect:Qm,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,Pl(4194308,4,tg.bind(null,n,e),a)},useLayoutEffect:function(e,n){return Pl(4194308,4,e,n)},useInsertionEffect:function(e,n){Pl(4,2,e,n)},useMemo:function(e,n){var a=Bn();n=n===void 0?null:n;var r=e();if(bs){Rt(!0);try{e()}finally{Rt(!1)}}return a.memoizedState=[r,n],r},useReducer:function(e,n,a){var r=Bn();if(a!==void 0){var c=a(n);if(bs){Rt(!0);try{a(n)}finally{Rt(!1)}}}else c=n;return r.memoizedState=r.baseState=c,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:c},r.queue=e,e=e.dispatch=nS.bind(null,le,e),[r.memoizedState,e]},useRef:function(e){var n=Bn();return e={current:e},n.memoizedState=e},useState:function(e){e=hf(e);var n=e.queue,a=cg.bind(null,le,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:mf,useDeferredValue:function(e,n){var a=Bn();return gf(a,e,n)},useTransition:function(){var e=hf(!1);return e=sg.bind(null,le,e.queue,!0,!1),Bn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var r=le,c=Bn();if(Me){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),qe===null)throw Error(s(349));(ve&127)!==0||Om(r,n,a)}c.memoizedState=a;var f={value:a,getSnapshot:n};return c.queue=f,Qm(Im.bind(null,r,f,e),[e]),r.flags|=2048,rr(9,{destroy:void 0},Pm.bind(null,r,f,a,n),null),a},useId:function(){var e=Bn(),n=qe.identifierPrefix;if(Me){var a=Fi,r=Bi;a=(r&~(1<<32-Bt(r)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Ul++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Kx++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:vf,useFormState:Wm,useActionState:Wm,useOptimistic:function(e){var n=Bn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=xf.bind(null,le,!0,a),a.dispatch=n,[e,n]},useMemoCache:uf,useCacheRefresh:function(){return Bn().memoizedState=eS.bind(null,le)},useEffectEvent:function(e){var n=Bn(),a={impl:e};return n.memoizedState=a,function(){if((we&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},Sf={readContext:Rn,use:Ll,useCallback:ng,useContext:Rn,useEffect:pf,useImperativeHandle:eg,useInsertionEffect:jm,useLayoutEffect:$m,useMemo:ig,useReducer:Ol,useRef:Km,useState:function(){return Ol(ra)},useDebugValue:mf,useDeferredValue:function(e,n){var a=cn();return ag(a,Ge.memoizedState,e,n)},useTransition:function(){var e=Ol(ra)[0],n=cn().memoizedState;return[typeof e=="boolean"?e:vo(e),n]},useSyncExternalStore:Lm,useId:lg,useHostTransitionStatus:vf,useFormState:qm,useActionState:qm,useOptimistic:function(e,n){var a=cn();return Fm(a,Ge,e,n)},useMemoCache:uf,useCacheRefresh:ug};Sf.useEffectEvent=Jm;var pg={readContext:Rn,use:Ll,useCallback:ng,useContext:Rn,useEffect:pf,useImperativeHandle:eg,useInsertionEffect:jm,useLayoutEffect:$m,useMemo:ig,useReducer:ff,useRef:Km,useState:function(){return ff(ra)},useDebugValue:mf,useDeferredValue:function(e,n){var a=cn();return Ge===null?gf(a,e,n):ag(a,Ge.memoizedState,e,n)},useTransition:function(){var e=ff(ra)[0],n=cn().memoizedState;return[typeof e=="boolean"?e:vo(e),n]},useSyncExternalStore:Lm,useId:lg,useHostTransitionStatus:vf,useFormState:Zm,useActionState:Zm,useOptimistic:function(e,n){var a=cn();return Ge!==null?Fm(a,Ge,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:uf,useCacheRefresh:ug};pg.useEffectEvent=Jm;function Mf(e,n,a,r){n=e.memoizedState,a=a(r,n),a=a==null?n:x({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var yf={enqueueSetState:function(e,n,a){e=e._reactInternals;var r=ui(),c=Oa(r);c.payload=n,a!=null&&(c.callback=a),n=Pa(e,c,r),n!==null&&(Kn(n,e,r),po(n,e,r))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var r=ui(),c=Oa(r);c.tag=1,c.payload=n,a!=null&&(c.callback=a),n=Pa(e,c,r),n!==null&&(Kn(n,e,r),po(n,e,r))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=ui(),r=Oa(a);r.tag=2,n!=null&&(r.callback=n),n=Pa(e,r,a),n!==null&&(Kn(n,e,a),po(n,e,a))}};function mg(e,n,a,r,c,f,_){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,f,_):n.prototype&&n.prototype.isPureReactComponent?!so(a,r)||!so(c,f):!0}function gg(e,n,a,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,r),n.state!==e&&yf.enqueueReplaceState(n,n.state,null)}function Ts(e,n){var a=n;if("ref"in n){a={};for(var r in n)r!=="ref"&&(a[r]=n[r])}if(e=e.defaultProps){a===n&&(a=x({},a));for(var c in e)a[c]===void 0&&(a[c]=e[c])}return a}function _g(e){ml(e)}function vg(e){console.error(e)}function xg(e){ml(e)}function Bl(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(r){setTimeout(function(){throw r})}}function Sg(e,n,a){try{var r=e.onCaughtError;r(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function Ef(e,n,a){return a=Oa(a),a.tag=3,a.payload={element:null},a.callback=function(){Bl(e,n)},a}function Mg(e){return e=Oa(e),e.tag=3,e}function yg(e,n,a,r){var c=a.type.getDerivedStateFromError;if(typeof c=="function"){var f=r.value;e.payload=function(){return c(f)},e.callback=function(){Sg(n,a,r)}}var _=a.stateNode;_!==null&&typeof _.componentDidCatch=="function"&&(e.callback=function(){Sg(n,a,r),typeof c!="function"&&(Ga===null?Ga=new Set([this]):Ga.add(this));var R=r.stack;this.componentDidCatch(r.value,{componentStack:R!==null?R:""})})}function iS(e,n,a,r,c){if(a.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(n=a.alternate,n!==null&&js(n,a,c,!0),a=si.current,a!==null){switch(a.tag){case 31:case 13:return Si===null?Ql():a.alternate===null&&ln===0&&(ln=3),a.flags&=-257,a.flags|=65536,a.lanes=c,r===Tl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([r]):n.add(r),Zf(e,r,c)),!1;case 22:return a.flags|=65536,r===Tl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([r])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([r]):a.add(r)),Zf(e,r,c)),!1}throw Error(s(435,a.tag))}return Zf(e,r,c),Ql(),!1}if(Me)return n=si.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=c,r!==Gc&&(e=Error(s(422),{cause:r}),lo(gi(e,a)))):(r!==Gc&&(n=Error(s(423),{cause:r}),lo(gi(n,a))),e=e.current.alternate,e.flags|=65536,c&=-c,e.lanes|=c,r=gi(r,a),c=Ef(e.stateNode,r,c),jc(e,c),ln!==4&&(ln=2)),!1;var f=Error(s(520),{cause:r});if(f=gi(f,a),Co===null?Co=[f]:Co.push(f),ln!==4&&(ln=2),n===null)return!0;r=gi(r,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=c&-c,a.lanes|=e,e=Ef(a.stateNode,r,e),jc(a,e),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Ga===null||!Ga.has(f))))return a.flags|=65536,c&=-c,a.lanes|=c,c=Mg(c),yg(c,e,a,r),jc(a,c),!1}a=a.return}while(a!==null);return!1}var bf=Error(s(461)),mn=!1;function Cn(e,n,a,r){n.child=e===null?Am(n,null,a,r):Es(n,e.child,a,r)}function Eg(e,n,a,r,c){a=a.render;var f=n.ref;if("ref"in r){var _={};for(var R in r)R!=="ref"&&(_[R]=r[R])}else _=r;return xs(n),r=sf(e,n,a,_,f,c),R=rf(),e!==null&&!mn?(of(e,n,c),oa(e,n,c)):(Me&&R&&Fc(n),n.flags|=1,Cn(e,n,r,c),n.child)}function bg(e,n,a,r,c){if(e===null){var f=a.type;return typeof f=="function"&&!Ic(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,Tg(e,n,f,r,c)):(e=xl(a.type,null,r,n,n.mode,c),e.ref=n.ref,e.return=n,n.child=e)}if(f=e.child,!Nf(e,c)){var _=f.memoizedProps;if(a=a.compare,a=a!==null?a:so,a(_,r)&&e.ref===n.ref)return oa(e,n,c)}return n.flags|=1,e=ea(f,r),e.ref=n.ref,e.return=n,n.child=e}function Tg(e,n,a,r,c){if(e!==null){var f=e.memoizedProps;if(so(f,r)&&e.ref===n.ref)if(mn=!1,n.pendingProps=r=f,Nf(e,c))(e.flags&131072)!==0&&(mn=!0);else return n.lanes=e.lanes,oa(e,n,c)}return Tf(e,n,a,r,c)}function Ag(e,n,a,r){var c=r.children,f=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,e!==null){for(r=n.child=e.child,c=0;r!==null;)c=c|r.lanes|r.childLanes,r=r.sibling;r=c&~f}else r=0,n.child=null;return Rg(e,n,f,a,r)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&El(n,f!==null?f.cachePool:null),f!==null?wm(n,f):tf(),Dm(n);else return r=n.lanes=536870912,Rg(e,n,f!==null?f.baseLanes|a:a,a,r)}else f!==null?(El(n,f.cachePool),wm(n,f),za(),n.memoizedState=null):(e!==null&&El(n,null),tf(),za());return Cn(e,n,c,a),n.child}function Mo(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Rg(e,n,a,r,c){var f=Zc();return f=f===null?null:{parent:dn._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},e!==null&&El(n,null),tf(),Dm(n),e!==null&&js(e,n,r,!0),n.childLanes=c,null}function Fl(e,n){return n=Gl({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function Cg(e,n,a){return Es(n,e.child,null,a),e=Fl(n,n.pendingProps),e.flags|=2,ri(n),n.memoizedState=null,e}function aS(e,n,a){var r=n.pendingProps,c=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Me){if(r.mode==="hidden")return e=Fl(n,r),n.lanes=536870912,Mo(null,e);if(nf(n),(e=Qe)?(e=H0(e,xi),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:wa!==null?{id:Bi,overflow:Fi}:null,retryLane:536870912,hydrationErrors:null},a=fm(e),a.return=n,n.child=a,An=n,Qe=null)):e=null,e===null)throw Ua(n);return n.lanes=536870912,null}return Fl(n,r)}var f=e.memoizedState;if(f!==null){var _=f.dehydrated;if(nf(n),c)if(n.flags&256)n.flags&=-257,n=Cg(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(mn||js(e,n,a,!1),c=(a&e.childLanes)!==0,mn||c){if(r=qe,r!==null&&(_=ti(r,a),_!==0&&_!==f.retryLane))throw f.retryLane=_,ms(e,_),Kn(r,e,_),bf;Ql(),n=Cg(e,n,a)}else e=f.treeContext,Qe=Mi(_.nextSibling),An=n,Me=!0,Da=null,xi=!1,e!==null&&pm(n,e),n=Fl(n,r),n.flags|=4096;return n}return e=ea(e.child,{mode:r.mode,children:r.children}),e.ref=n.ref,n.child=e,e.return=n,e}function Hl(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function Tf(e,n,a,r,c){return xs(n),a=sf(e,n,a,r,void 0,c),r=rf(),e!==null&&!mn?(of(e,n,c),oa(e,n,c)):(Me&&r&&Fc(n),n.flags|=1,Cn(e,n,a,c),n.child)}function wg(e,n,a,r,c,f){return xs(n),n.updateQueue=null,a=Nm(n,r,a,c),Um(e),r=rf(),e!==null&&!mn?(of(e,n,f),oa(e,n,f)):(Me&&r&&Fc(n),n.flags|=1,Cn(e,n,a,f),n.child)}function Dg(e,n,a,r,c){if(xs(n),n.stateNode===null){var f=Zs,_=a.contextType;typeof _=="object"&&_!==null&&(f=Rn(_)),f=new a(r,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=yf,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=r,f.state=n.memoizedState,f.refs={},Qc(n),_=a.contextType,f.context=typeof _=="object"&&_!==null?Rn(_):Zs,f.state=n.memoizedState,_=a.getDerivedStateFromProps,typeof _=="function"&&(Mf(n,a,_,r),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(_=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),_!==f.state&&yf.enqueueReplaceState(f,f.state,null),go(n,r,f,c),mo(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),r=!0}else if(e===null){f=n.stateNode;var R=n.memoizedProps,H=Ts(a,R);f.props=H;var nt=f.context,mt=a.contextType;_=Zs,typeof mt=="object"&&mt!==null&&(_=Rn(mt));var vt=a.getDerivedStateFromProps;mt=typeof vt=="function"||typeof f.getSnapshotBeforeUpdate=="function",R=n.pendingProps!==R,mt||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(R||nt!==_)&&gg(n,f,r,_),La=!1;var ot=n.memoizedState;f.state=ot,go(n,r,f,c),mo(),nt=n.memoizedState,R||ot!==nt||La?(typeof vt=="function"&&(Mf(n,a,vt,r),nt=n.memoizedState),(H=La||mg(n,a,H,r,ot,nt,_))?(mt||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=nt),f.props=r,f.state=nt,f.context=_,r=H):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{f=n.stateNode,Jc(e,n),_=n.memoizedProps,mt=Ts(a,_),f.props=mt,vt=n.pendingProps,ot=f.context,nt=a.contextType,H=Zs,typeof nt=="object"&&nt!==null&&(H=Rn(nt)),R=a.getDerivedStateFromProps,(nt=typeof R=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(_!==vt||ot!==H)&&gg(n,f,r,H),La=!1,ot=n.memoizedState,f.state=ot,go(n,r,f,c),mo();var ut=n.memoizedState;_!==vt||ot!==ut||La||e!==null&&e.dependencies!==null&&Ml(e.dependencies)?(typeof R=="function"&&(Mf(n,a,R,r),ut=n.memoizedState),(mt=La||mg(n,a,mt,r,ot,ut,H)||e!==null&&e.dependencies!==null&&Ml(e.dependencies))?(nt||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(r,ut,H),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(r,ut,H)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||_===e.memoizedProps&&ot===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||_===e.memoizedProps&&ot===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=ut),f.props=r,f.state=ut,f.context=H,r=mt):(typeof f.componentDidUpdate!="function"||_===e.memoizedProps&&ot===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||_===e.memoizedProps&&ot===e.memoizedState||(n.flags|=1024),r=!1)}return f=r,Hl(e,n),r=(n.flags&128)!==0,f||r?(f=n.stateNode,a=r&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,e!==null&&r?(n.child=Es(n,e.child,null,c),n.child=Es(n,null,a,c)):Cn(e,n,a,c),n.memoizedState=f.state,e=n.child):e=oa(e,n,c),e}function Ug(e,n,a,r){return _s(),n.flags|=256,Cn(e,n,a,r),n.child}var Af={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Rf(e){return{baseLanes:e,cachePool:Sm()}}function Cf(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=li),e}function Ng(e,n,a){var r=n.pendingProps,c=!1,f=(n.flags&128)!==0,_;if((_=f)||(_=e!==null&&e.memoizedState===null?!1:(un.current&2)!==0),_&&(c=!0,n.flags&=-129),_=(n.flags&32)!==0,n.flags&=-33,e===null){if(Me){if(c?Ia(n):za(),(e=Qe)?(e=H0(e,xi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:wa!==null?{id:Bi,overflow:Fi}:null,retryLane:536870912,hydrationErrors:null},a=fm(e),a.return=n,n.child=a,An=n,Qe=null)):e=null,e===null)throw Ua(n);return ch(e)?n.lanes=32:n.lanes=536870912,null}var R=r.children;return r=r.fallback,c?(za(),c=n.mode,R=Gl({mode:"hidden",children:R},c),r=gs(r,c,a,null),R.return=n,r.return=n,R.sibling=r,n.child=R,r=n.child,r.memoizedState=Rf(a),r.childLanes=Cf(e,_,a),n.memoizedState=Af,Mo(null,r)):(Ia(n),wf(n,R))}var H=e.memoizedState;if(H!==null&&(R=H.dehydrated,R!==null)){if(f)n.flags&256?(Ia(n),n.flags&=-257,n=Df(e,n,a)):n.memoizedState!==null?(za(),n.child=e.child,n.flags|=128,n=null):(za(),R=r.fallback,c=n.mode,r=Gl({mode:"visible",children:r.children},c),R=gs(R,c,a,null),R.flags|=2,r.return=n,R.return=n,r.sibling=R,n.child=r,Es(n,e.child,null,a),r=n.child,r.memoizedState=Rf(a),r.childLanes=Cf(e,_,a),n.memoizedState=Af,n=Mo(null,r));else if(Ia(n),ch(R)){if(_=R.nextSibling&&R.nextSibling.dataset,_)var nt=_.dgst;_=nt,r=Error(s(419)),r.stack="",r.digest=_,lo({value:r,source:null,stack:null}),n=Df(e,n,a)}else if(mn||js(e,n,a,!1),_=(a&e.childLanes)!==0,mn||_){if(_=qe,_!==null&&(r=ti(_,a),r!==0&&r!==H.retryLane))throw H.retryLane=r,ms(e,r),Kn(_,e,r),bf;uh(R)||Ql(),n=Df(e,n,a)}else uh(R)?(n.flags|=192,n.child=e.child,n=null):(e=H.treeContext,Qe=Mi(R.nextSibling),An=n,Me=!0,Da=null,xi=!1,e!==null&&pm(n,e),n=wf(n,r.children),n.flags|=4096);return n}return c?(za(),R=r.fallback,c=n.mode,H=e.child,nt=H.sibling,r=ea(H,{mode:"hidden",children:r.children}),r.subtreeFlags=H.subtreeFlags&65011712,nt!==null?R=ea(nt,R):(R=gs(R,c,a,null),R.flags|=2),R.return=n,r.return=n,r.sibling=R,n.child=r,Mo(null,r),r=n.child,R=e.child.memoizedState,R===null?R=Rf(a):(c=R.cachePool,c!==null?(H=dn._currentValue,c=c.parent!==H?{parent:H,pool:H}:c):c=Sm(),R={baseLanes:R.baseLanes|a,cachePool:c}),r.memoizedState=R,r.childLanes=Cf(e,_,a),n.memoizedState=Af,Mo(e.child,r)):(Ia(n),a=e.child,e=a.sibling,a=ea(a,{mode:"visible",children:r.children}),a.return=n,a.sibling=null,e!==null&&(_=n.deletions,_===null?(n.deletions=[e],n.flags|=16):_.push(e)),n.child=a,n.memoizedState=null,a)}function wf(e,n){return n=Gl({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function Gl(e,n){return e=ai(22,e,null,n),e.lanes=0,e}function Df(e,n,a){return Es(n,e.child,null,a),e=wf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Lg(e,n,a){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),kc(e.return,n,a)}function Uf(e,n,a,r,c,f){var _=e.memoizedState;_===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:c,treeForkCount:f}:(_.isBackwards=n,_.rendering=null,_.renderingStartTime=0,_.last=r,_.tail=a,_.tailMode=c,_.treeForkCount=f)}function Og(e,n,a){var r=n.pendingProps,c=r.revealOrder,f=r.tail;r=r.children;var _=un.current,R=(_&2)!==0;if(R?(_=_&1|2,n.flags|=128):_&=1,St(un,_),Cn(e,n,r,a),r=Me?oo:0,!R&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Lg(e,a,n);else if(e.tag===19)Lg(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(c){case"forwards":for(a=n.child,c=null;a!==null;)e=a.alternate,e!==null&&wl(e)===null&&(c=a),a=a.sibling;a=c,a===null?(c=n.child,n.child=null):(c=a.sibling,a.sibling=null),Uf(n,!1,c,a,f,r);break;case"backwards":case"unstable_legacy-backwards":for(a=null,c=n.child,n.child=null;c!==null;){if(e=c.alternate,e!==null&&wl(e)===null){n.child=c;break}e=c.sibling,c.sibling=a,a=c,c=e}Uf(n,!0,a,null,f,r);break;case"together":Uf(n,!1,null,null,void 0,r);break;default:n.memoizedState=null}return n.child}function oa(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),Ha|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(js(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,a=ea(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=ea(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function Nf(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&Ml(e)))}function sS(e,n,a){switch(n.tag){case 3:Mt(n,n.stateNode.containerInfo),Na(n,dn,e.memoizedState.cache),_s();break;case 27:case 5:te(n);break;case 4:Mt(n,n.stateNode.containerInfo);break;case 10:Na(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,nf(n),null;break;case 13:var r=n.memoizedState;if(r!==null)return r.dehydrated!==null?(Ia(n),n.flags|=128,null):(a&n.child.childLanes)!==0?Ng(e,n,a):(Ia(n),e=oa(e,n,a),e!==null?e.sibling:null);Ia(n);break;case 19:var c=(e.flags&128)!==0;if(r=(a&n.childLanes)!==0,r||(js(e,n,a,!1),r=(a&n.childLanes)!==0),c){if(r)return Og(e,n,a);n.flags|=128}if(c=n.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),St(un,un.current),r)break;return null;case 22:return n.lanes=0,Ag(e,n,a,n.pendingProps);case 24:Na(n,dn,e.memoizedState.cache)}return oa(e,n,a)}function Pg(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)mn=!0;else{if(!Nf(e,a)&&(n.flags&128)===0)return mn=!1,sS(e,n,a);mn=(e.flags&131072)!==0}else mn=!1,Me&&(n.flags&1048576)!==0&&dm(n,oo,n.index);switch(n.lanes=0,n.tag){case 16:t:{var r=n.pendingProps;if(e=Ms(n.elementType),n.type=e,typeof e=="function")Ic(e)?(r=Ts(e,r),n.tag=1,n=Dg(null,n,e,r,a)):(n.tag=0,n=Tf(null,n,e,r,a));else{if(e!=null){var c=e.$$typeof;if(c===C){n.tag=11,n=Eg(null,n,e,r,a);break t}else if(c===P){n.tag=14,n=bg(null,n,e,r,a);break t}}throw n=pt(e)||e,Error(s(306,n,""))}}return n;case 0:return Tf(e,n,n.type,n.pendingProps,a);case 1:return r=n.type,c=Ts(r,n.pendingProps),Dg(e,n,r,c,a);case 3:t:{if(Mt(n,n.stateNode.containerInfo),e===null)throw Error(s(387));r=n.pendingProps;var f=n.memoizedState;c=f.element,Jc(e,n),go(n,r,null,a);var _=n.memoizedState;if(r=_.cache,Na(n,dn,r),r!==f.cache&&Wc(n,[dn],a,!0),mo(),r=_.element,f.isDehydrated)if(f={element:r,isDehydrated:!1,cache:_.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=Ug(e,n,r,a);break t}else if(r!==c){c=gi(Error(s(424)),n),lo(c),n=Ug(e,n,r,a);break t}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Qe=Mi(e.firstChild),An=n,Me=!0,Da=null,xi=!0,a=Am(n,null,r,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(_s(),r===c){n=oa(e,n,a);break t}Cn(e,n,r,a)}n=n.child}return n;case 26:return Hl(e,n),e===null?(a=q0(n.type,null,n.pendingProps,null))?n.memoizedState=a:Me||(a=n.type,e=n.pendingProps,r=iu(tt.current).createElement(a),r[fn]=n,r[Tn]=e,wn(r,a,e),hn(r),n.stateNode=r):n.memoizedState=q0(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return te(n),e===null&&Me&&(r=n.stateNode=X0(n.type,n.pendingProps,tt.current),An=n,xi=!0,c=Qe,Wa(n.type)?(fh=c,Qe=Mi(r.firstChild)):Qe=c),Cn(e,n,n.pendingProps.children,a),Hl(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Me&&((c=r=Qe)&&(r=PS(r,n.type,n.pendingProps,xi),r!==null?(n.stateNode=r,An=n,Qe=Mi(r.firstChild),xi=!1,c=!0):c=!1),c||Ua(n)),te(n),c=n.type,f=n.pendingProps,_=e!==null?e.memoizedProps:null,r=f.children,rh(c,f)?r=null:_!==null&&rh(c,_)&&(n.flags|=32),n.memoizedState!==null&&(c=sf(e,n,Qx,null,null,a),Io._currentValue=c),Hl(e,n),Cn(e,n,r,a),n.child;case 6:return e===null&&Me&&((e=a=Qe)&&(a=IS(a,n.pendingProps,xi),a!==null?(n.stateNode=a,An=n,Qe=null,e=!0):e=!1),e||Ua(n)),null;case 13:return Ng(e,n,a);case 4:return Mt(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=Es(n,null,r,a):Cn(e,n,r,a),n.child;case 11:return Eg(e,n,n.type,n.pendingProps,a);case 7:return Cn(e,n,n.pendingProps,a),n.child;case 8:return Cn(e,n,n.pendingProps.children,a),n.child;case 12:return Cn(e,n,n.pendingProps.children,a),n.child;case 10:return r=n.pendingProps,Na(n,n.type,r.value),Cn(e,n,r.children,a),n.child;case 9:return c=n.type._context,r=n.pendingProps.children,xs(n),c=Rn(c),r=r(c),n.flags|=1,Cn(e,n,r,a),n.child;case 14:return bg(e,n,n.type,n.pendingProps,a);case 15:return Tg(e,n,n.type,n.pendingProps,a);case 19:return Og(e,n,a);case 31:return aS(e,n,a);case 22:return Ag(e,n,a,n.pendingProps);case 24:return xs(n),r=Rn(dn),e===null?(c=Zc(),c===null&&(c=qe,f=qc(),c.pooledCache=f,f.refCount++,f!==null&&(c.pooledCacheLanes|=a),c=f),n.memoizedState={parent:r,cache:c},Qc(n),Na(n,dn,c)):((e.lanes&a)!==0&&(Jc(e,n),go(n,null,null,a),mo()),c=e.memoizedState,f=n.memoizedState,c.parent!==r?(c={parent:r,cache:r},n.memoizedState=c,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=c),Na(n,dn,r)):(r=f.cache,Na(n,dn,r),r!==c.cache&&Wc(n,[dn],a,!0))),Cn(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function la(e){e.flags|=4}function Lf(e,n,a,r,c){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(c&335544128)===c)if(e.stateNode.complete)e.flags|=8192;else if(l0())e.flags|=8192;else throw ys=Tl,Kc}else e.flags&=-16777217}function Ig(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!J0(n))if(l0())e.flags|=8192;else throw ys=Tl,Kc}function Vl(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?yt():536870912,e.lanes|=n,cr|=n)}function yo(e,n){if(!Me)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Je(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,r=0;if(n)for(var c=e.child;c!==null;)a|=c.lanes|c.childLanes,r|=c.subtreeFlags&65011712,r|=c.flags&65011712,c.return=e,c=c.sibling;else for(c=e.child;c!==null;)a|=c.lanes|c.childLanes,r|=c.subtreeFlags,r|=c.flags,c.return=e,c=c.sibling;return e.subtreeFlags|=r,e.childLanes=a,n}function rS(e,n,a){var r=n.pendingProps;switch(Hc(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Je(n),null;case 1:return Je(n),null;case 3:return a=n.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),aa(dn),zt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Js(n)?la(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Vc())),Je(n),null;case 26:var c=n.type,f=n.memoizedState;return e===null?(la(n),f!==null?(Je(n),Ig(n,f)):(Je(n),Lf(n,c,null,r,a))):f?f!==e.memoizedState?(la(n),Je(n),Ig(n,f)):(Je(n),n.flags&=-16777217):(e=e.memoizedProps,e!==r&&la(n),Je(n),Lf(n,c,e,r,a)),null;case 27:if(Kt(n),a=tt.current,c=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==r&&la(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return Je(n),null}e=bt.current,Js(n)?mm(n):(e=X0(c,r,a),n.stateNode=e,la(n))}return Je(n),null;case 5:if(Kt(n),c=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==r&&la(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return Je(n),null}if(f=bt.current,Js(n))mm(n);else{var _=iu(tt.current);switch(f){case 1:f=_.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:f=_.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":f=_.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":f=_.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":f=_.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof r.is=="string"?_.createElement("select",{is:r.is}):_.createElement("select"),r.multiple?f.multiple=!0:r.size&&(f.size=r.size);break;default:f=typeof r.is=="string"?_.createElement(c,{is:r.is}):_.createElement(c)}}f[fn]=n,f[Tn]=r;t:for(_=n.child;_!==null;){if(_.tag===5||_.tag===6)f.appendChild(_.stateNode);else if(_.tag!==4&&_.tag!==27&&_.child!==null){_.child.return=_,_=_.child;continue}if(_===n)break t;for(;_.sibling===null;){if(_.return===null||_.return===n)break t;_=_.return}_.sibling.return=_.return,_=_.sibling}n.stateNode=f;t:switch(wn(f,c,r),c){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break t;case"img":r=!0;break t;default:r=!1}r&&la(n)}}return Je(n),Lf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==r&&la(n);else{if(typeof r!="string"&&n.stateNode===null)throw Error(s(166));if(e=tt.current,Js(n)){if(e=n.stateNode,a=n.memoizedProps,r=null,c=An,c!==null)switch(c.tag){case 27:case 5:r=c.memoizedProps}e[fn]=n,e=!!(e.nodeValue===a||r!==null&&r.suppressHydrationWarning===!0||N0(e.nodeValue,a)),e||Ua(n,!0)}else e=iu(e).createTextNode(r),e[fn]=n,n.stateNode=e}return Je(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(r=Js(n),a!==null){if(e===null){if(!r)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[fn]=n}else _s(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Je(n),e=!1}else a=Vc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(ri(n),n):(ri(n),null);if((n.flags&128)!==0)throw Error(s(558))}return Je(n),null;case 13:if(r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(c=Js(n),r!==null&&r.dehydrated!==null){if(e===null){if(!c)throw Error(s(318));if(c=n.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(s(317));c[fn]=n}else _s(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Je(n),c=!1}else c=Vc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=c),c=!0;if(!c)return n.flags&256?(ri(n),n):(ri(n),null)}return ri(n),(n.flags&128)!==0?(n.lanes=a,n):(a=r!==null,e=e!==null&&e.memoizedState!==null,a&&(r=n.child,c=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(c=r.alternate.memoizedState.cachePool.pool),f=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(f=r.memoizedState.cachePool.pool),f!==c&&(r.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),Vl(n,n.updateQueue),Je(n),null);case 4:return zt(),e===null&&eh(n.stateNode.containerInfo),Je(n),null;case 10:return aa(n.type),Je(n),null;case 19:if(Z(un),r=n.memoizedState,r===null)return Je(n),null;if(c=(n.flags&128)!==0,f=r.rendering,f===null)if(c)yo(r,!1);else{if(ln!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(f=wl(e),f!==null){for(n.flags|=128,yo(r,!1),e=f.updateQueue,n.updateQueue=e,Vl(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)cm(a,e),a=a.sibling;return St(un,un.current&1|2),Me&&na(n,r.treeForkCount),n.child}e=e.sibling}r.tail!==null&&De()>Yl&&(n.flags|=128,c=!0,yo(r,!1),n.lanes=4194304)}else{if(!c)if(e=wl(f),e!==null){if(n.flags|=128,c=!0,e=e.updateQueue,n.updateQueue=e,Vl(n,e),yo(r,!0),r.tail===null&&r.tailMode==="hidden"&&!f.alternate&&!Me)return Je(n),null}else 2*De()-r.renderingStartTime>Yl&&a!==536870912&&(n.flags|=128,c=!0,yo(r,!1),n.lanes=4194304);r.isBackwards?(f.sibling=n.child,n.child=f):(e=r.last,e!==null?e.sibling=f:n.child=f,r.last=f)}return r.tail!==null?(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=De(),e.sibling=null,a=un.current,St(un,c?a&1|2:a&1),Me&&na(n,r.treeForkCount),e):(Je(n),null);case 22:case 23:return ri(n),ef(),r=n.memoizedState!==null,e!==null?e.memoizedState!==null!==r&&(n.flags|=8192):r&&(n.flags|=8192),r?(a&536870912)!==0&&(n.flags&128)===0&&(Je(n),n.subtreeFlags&6&&(n.flags|=8192)):Je(n),a=n.updateQueue,a!==null&&Vl(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==a&&(n.flags|=2048),e!==null&&Z(Ss),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),aa(dn),Je(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function oS(e,n){switch(Hc(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return aa(dn),zt(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Kt(n),null;case 31:if(n.memoizedState!==null){if(ri(n),n.alternate===null)throw Error(s(340));_s()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(ri(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));_s()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return Z(un),null;case 4:return zt(),null;case 10:return aa(n.type),null;case 22:case 23:return ri(n),ef(),e!==null&&Z(Ss),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return aa(dn),null;case 25:return null;default:return null}}function zg(e,n){switch(Hc(n),n.tag){case 3:aa(dn),zt();break;case 26:case 27:case 5:Kt(n);break;case 4:zt();break;case 31:n.memoizedState!==null&&ri(n);break;case 13:ri(n);break;case 19:Z(un);break;case 10:aa(n.type);break;case 22:case 23:ri(n),ef(),e!==null&&Z(Ss);break;case 24:aa(dn)}}function Eo(e,n){try{var a=n.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var c=r.next;a=c;do{if((a.tag&e)===e){r=void 0;var f=a.create,_=a.inst;r=f(),_.destroy=r}a=a.next}while(a!==c)}}catch(R){Fe(n,n.return,R)}}function Ba(e,n,a){try{var r=n.updateQueue,c=r!==null?r.lastEffect:null;if(c!==null){var f=c.next;r=f;do{if((r.tag&e)===e){var _=r.inst,R=_.destroy;if(R!==void 0){_.destroy=void 0,c=n;var H=a,nt=R;try{nt()}catch(mt){Fe(c,H,mt)}}}r=r.next}while(r!==f)}}catch(mt){Fe(n,n.return,mt)}}function Bg(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{Cm(n,a)}catch(r){Fe(e,e.return,r)}}}function Fg(e,n,a){a.props=Ts(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(r){Fe(e,n,r)}}function bo(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof a=="function"?e.refCleanup=a(r):a.current=r}}catch(c){Fe(e,n,c)}}function Hi(e,n){var a=e.ref,r=e.refCleanup;if(a!==null)if(typeof r=="function")try{r()}catch(c){Fe(e,n,c)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(c){Fe(e,n,c)}else a.current=null}function Hg(e){var n=e.type,a=e.memoizedProps,r=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&r.focus();break t;case"img":a.src?r.src=a.src:a.srcSet&&(r.srcset=a.srcSet)}}catch(c){Fe(e,e.return,c)}}function Of(e,n,a){try{var r=e.stateNode;wS(r,e.type,a,n),r[Tn]=n}catch(c){Fe(e,e.return,c)}}function Gg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Wa(e.type)||e.tag===4}function Pf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||Gg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Wa(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function If(e,n,a){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=$i));else if(r!==4&&(r===27&&Wa(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(If(e,n,a),e=e.sibling;e!==null;)If(e,n,a),e=e.sibling}function Xl(e,n,a){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(r!==4&&(r===27&&Wa(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Xl(e,n,a),e=e.sibling;e!==null;)Xl(e,n,a),e=e.sibling}function Vg(e){var n=e.stateNode,a=e.memoizedProps;try{for(var r=e.type,c=n.attributes;c.length;)n.removeAttributeNode(c[0]);wn(n,r,a),n[fn]=e,n[Tn]=a}catch(f){Fe(e,e.return,f)}}var ua=!1,gn=!1,zf=!1,Xg=typeof WeakSet=="function"?WeakSet:Set,En=null;function lS(e,n){if(e=e.containerInfo,ah=cu,e=em(e),wc(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var r=a.getSelection&&a.getSelection();if(r&&r.rangeCount!==0){a=r.anchorNode;var c=r.anchorOffset,f=r.focusNode;r=r.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break t}var _=0,R=-1,H=-1,nt=0,mt=0,vt=e,ot=null;e:for(;;){for(var ut;vt!==a||c!==0&&vt.nodeType!==3||(R=_+c),vt!==f||r!==0&&vt.nodeType!==3||(H=_+r),vt.nodeType===3&&(_+=vt.nodeValue.length),(ut=vt.firstChild)!==null;)ot=vt,vt=ut;for(;;){if(vt===e)break e;if(ot===a&&++nt===c&&(R=_),ot===f&&++mt===r&&(H=_),(ut=vt.nextSibling)!==null)break;vt=ot,ot=vt.parentNode}vt=ut}a=R===-1||H===-1?null:{start:R,end:H}}else a=null}a=a||{start:0,end:0}}else a=null;for(sh={focusedElem:e,selectionRange:a},cu=!1,En=n;En!==null;)if(n=En,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,En=e;else for(;En!==null;){switch(n=En,f=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)c=e[a],c.ref.impl=c.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&f!==null){e=void 0,a=n,c=f.memoizedProps,f=f.memoizedState,r=a.stateNode;try{var kt=Ts(a.type,c);e=r.getSnapshotBeforeUpdate(kt,f),r.__reactInternalSnapshotBeforeUpdate=e}catch(ee){Fe(a,a.return,ee)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)lh(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":lh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,En=e;break}En=n.return}}function kg(e,n,a){var r=a.flags;switch(a.tag){case 0:case 11:case 15:fa(e,a),r&4&&Eo(5,a);break;case 1:if(fa(e,a),r&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(_){Fe(a,a.return,_)}else{var c=Ts(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(c,n,e.__reactInternalSnapshotBeforeUpdate)}catch(_){Fe(a,a.return,_)}}r&64&&Bg(a),r&512&&bo(a,a.return);break;case 3:if(fa(e,a),r&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Cm(e,n)}catch(_){Fe(a,a.return,_)}}break;case 27:n===null&&r&4&&Vg(a);case 26:case 5:fa(e,a),n===null&&r&4&&Hg(a),r&512&&bo(a,a.return);break;case 12:fa(e,a);break;case 31:fa(e,a),r&4&&Yg(e,a);break;case 13:fa(e,a),r&4&&Zg(e,a),r&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=_S.bind(null,a),zS(e,a))));break;case 22:if(r=a.memoizedState!==null||ua,!r){n=n!==null&&n.memoizedState!==null||gn,c=ua;var f=gn;ua=r,(gn=n)&&!f?ha(e,a,(a.subtreeFlags&8772)!==0):fa(e,a),ua=c,gn=f}break;case 30:break;default:fa(e,a)}}function Wg(e){var n=e.alternate;n!==null&&(e.alternate=null,Wg(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&Ta(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var nn=null,Wn=!1;function ca(e,n,a){for(a=a.child;a!==null;)qg(e,n,a),a=a.sibling}function qg(e,n,a){if(dt&&typeof dt.onCommitFiberUnmount=="function")try{dt.onCommitFiberUnmount(ht,a)}catch{}switch(a.tag){case 26:gn||Hi(a,n),ca(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:gn||Hi(a,n);var r=nn,c=Wn;Wa(a.type)&&(nn=a.stateNode,Wn=!1),ca(e,n,a),Lo(a.stateNode),nn=r,Wn=c;break;case 5:gn||Hi(a,n);case 6:if(r=nn,c=Wn,nn=null,ca(e,n,a),nn=r,Wn=c,nn!==null)if(Wn)try{(nn.nodeType===9?nn.body:nn.nodeName==="HTML"?nn.ownerDocument.body:nn).removeChild(a.stateNode)}catch(f){Fe(a,n,f)}else try{nn.removeChild(a.stateNode)}catch(f){Fe(a,n,f)}break;case 18:nn!==null&&(Wn?(e=nn,B0(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),vr(e)):B0(nn,a.stateNode));break;case 4:r=nn,c=Wn,nn=a.stateNode.containerInfo,Wn=!0,ca(e,n,a),nn=r,Wn=c;break;case 0:case 11:case 14:case 15:Ba(2,a,n),gn||Ba(4,a,n),ca(e,n,a);break;case 1:gn||(Hi(a,n),r=a.stateNode,typeof r.componentWillUnmount=="function"&&Fg(a,n,r)),ca(e,n,a);break;case 21:ca(e,n,a);break;case 22:gn=(r=gn)||a.memoizedState!==null,ca(e,n,a),gn=r;break;default:ca(e,n,a)}}function Yg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{vr(e)}catch(a){Fe(n,n.return,a)}}}function Zg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{vr(e)}catch(a){Fe(n,n.return,a)}}function uS(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new Xg),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new Xg),n;default:throw Error(s(435,e.tag))}}function kl(e,n){var a=uS(e);n.forEach(function(r){if(!a.has(r)){a.add(r);var c=vS.bind(null,e,r);r.then(c,c)}})}function qn(e,n){var a=n.deletions;if(a!==null)for(var r=0;r<a.length;r++){var c=a[r],f=e,_=n,R=_;t:for(;R!==null;){switch(R.tag){case 27:if(Wa(R.type)){nn=R.stateNode,Wn=!1;break t}break;case 5:nn=R.stateNode,Wn=!1;break t;case 3:case 4:nn=R.stateNode.containerInfo,Wn=!0;break t}R=R.return}if(nn===null)throw Error(s(160));qg(f,_,c),nn=null,Wn=!1,f=c.alternate,f!==null&&(f.return=null),c.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)Kg(n,e),n=n.sibling}var Ci=null;function Kg(e,n){var a=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:qn(n,e),Yn(e),r&4&&(Ba(3,e,e.return),Eo(3,e),Ba(5,e,e.return));break;case 1:qn(n,e),Yn(e),r&512&&(gn||a===null||Hi(a,a.return)),r&64&&ua&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?r:a.concat(r))));break;case 26:var c=Ci;if(qn(n,e),Yn(e),r&512&&(gn||a===null||Hi(a,a.return)),r&4){var f=a!==null?a.memoizedState:null;if(r=e.memoizedState,a===null)if(r===null)if(e.stateNode===null){t:{r=e.type,a=e.memoizedProps,c=c.ownerDocument||c;e:switch(r){case"title":f=c.getElementsByTagName("title")[0],(!f||f[ba]||f[fn]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=c.createElement(r),c.head.insertBefore(f,c.querySelector("head > title"))),wn(f,r,a),f[fn]=e,hn(f),r=f;break t;case"link":var _=K0("link","href",c).get(r+(a.href||""));if(_){for(var R=0;R<_.length;R++)if(f=_[R],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){_.splice(R,1);break e}}f=c.createElement(r),wn(f,r,a),c.head.appendChild(f);break;case"meta":if(_=K0("meta","content",c).get(r+(a.content||""))){for(R=0;R<_.length;R++)if(f=_[R],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){_.splice(R,1);break e}}f=c.createElement(r),wn(f,r,a),c.head.appendChild(f);break;default:throw Error(s(468,r))}f[fn]=e,hn(f),r=f}e.stateNode=r}else Q0(c,e.type,e.stateNode);else e.stateNode=Z0(c,r,e.memoizedProps);else f!==r?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,r===null?Q0(c,e.type,e.stateNode):Z0(c,r,e.memoizedProps)):r===null&&e.stateNode!==null&&Of(e,e.memoizedProps,a.memoizedProps)}break;case 27:qn(n,e),Yn(e),r&512&&(gn||a===null||Hi(a,a.return)),a!==null&&r&4&&Of(e,e.memoizedProps,a.memoizedProps);break;case 5:if(qn(n,e),Yn(e),r&512&&(gn||a===null||Hi(a,a.return)),e.flags&32){c=e.stateNode;try{ni(c,"")}catch(kt){Fe(e,e.return,kt)}}r&4&&e.stateNode!=null&&(c=e.memoizedProps,Of(e,c,a!==null?a.memoizedProps:c)),r&1024&&(zf=!0);break;case 6:if(qn(n,e),Yn(e),r&4){if(e.stateNode===null)throw Error(s(162));r=e.memoizedProps,a=e.stateNode;try{a.nodeValue=r}catch(kt){Fe(e,e.return,kt)}}break;case 3:if(ru=null,c=Ci,Ci=au(n.containerInfo),qn(n,e),Ci=c,Yn(e),r&4&&a!==null&&a.memoizedState.isDehydrated)try{vr(n.containerInfo)}catch(kt){Fe(e,e.return,kt)}zf&&(zf=!1,Qg(e));break;case 4:r=Ci,Ci=au(e.stateNode.containerInfo),qn(n,e),Yn(e),Ci=r;break;case 12:qn(n,e),Yn(e);break;case 31:qn(n,e),Yn(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,kl(e,r)));break;case 13:qn(n,e),Yn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(ql=De()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,kl(e,r)));break;case 22:c=e.memoizedState!==null;var H=a!==null&&a.memoizedState!==null,nt=ua,mt=gn;if(ua=nt||c,gn=mt||H,qn(n,e),gn=mt,ua=nt,Yn(e),r&8192)t:for(n=e.stateNode,n._visibility=c?n._visibility&-2:n._visibility|1,c&&(a===null||H||ua||gn||As(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){H=a=n;try{if(f=H.stateNode,c)_=f.style,typeof _.setProperty=="function"?_.setProperty("display","none","important"):_.display="none";else{R=H.stateNode;var vt=H.memoizedProps.style,ot=vt!=null&&vt.hasOwnProperty("display")?vt.display:null;R.style.display=ot==null||typeof ot=="boolean"?"":(""+ot).trim()}}catch(kt){Fe(H,H.return,kt)}}}else if(n.tag===6){if(a===null){H=n;try{H.stateNode.nodeValue=c?"":H.memoizedProps}catch(kt){Fe(H,H.return,kt)}}}else if(n.tag===18){if(a===null){H=n;try{var ut=H.stateNode;c?F0(ut,!0):F0(H.stateNode,!1)}catch(kt){Fe(H,H.return,kt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}r&4&&(r=e.updateQueue,r!==null&&(a=r.retryQueue,a!==null&&(r.retryQueue=null,kl(e,a))));break;case 19:qn(n,e),Yn(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,kl(e,r)));break;case 30:break;case 21:break;default:qn(n,e),Yn(e)}}function Yn(e){var n=e.flags;if(n&2){try{for(var a,r=e.return;r!==null;){if(Gg(r)){a=r;break}r=r.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var c=a.stateNode,f=Pf(e);Xl(e,f,c);break;case 5:var _=a.stateNode;a.flags&32&&(ni(_,""),a.flags&=-33);var R=Pf(e);Xl(e,R,_);break;case 3:case 4:var H=a.stateNode.containerInfo,nt=Pf(e);If(e,nt,H);break;default:throw Error(s(161))}}catch(mt){Fe(e,e.return,mt)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Qg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;Qg(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function fa(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)kg(e,n.alternate,n),n=n.sibling}function As(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Ba(4,n,n.return),As(n);break;case 1:Hi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&Fg(n,n.return,a),As(n);break;case 27:Lo(n.stateNode);case 26:case 5:Hi(n,n.return),As(n);break;case 22:n.memoizedState===null&&As(n);break;case 30:As(n);break;default:As(n)}e=e.sibling}}function ha(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var r=n.alternate,c=e,f=n,_=f.flags;switch(f.tag){case 0:case 11:case 15:ha(c,f,a),Eo(4,f);break;case 1:if(ha(c,f,a),r=f,c=r.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(nt){Fe(r,r.return,nt)}if(r=f,c=r.updateQueue,c!==null){var R=r.stateNode;try{var H=c.shared.hiddenCallbacks;if(H!==null)for(c.shared.hiddenCallbacks=null,c=0;c<H.length;c++)Rm(H[c],R)}catch(nt){Fe(r,r.return,nt)}}a&&_&64&&Bg(f),bo(f,f.return);break;case 27:Vg(f);case 26:case 5:ha(c,f,a),a&&r===null&&_&4&&Hg(f),bo(f,f.return);break;case 12:ha(c,f,a);break;case 31:ha(c,f,a),a&&_&4&&Yg(c,f);break;case 13:ha(c,f,a),a&&_&4&&Zg(c,f);break;case 22:f.memoizedState===null&&ha(c,f,a),bo(f,f.return);break;case 30:break;default:ha(c,f,a)}n=n.sibling}}function Bf(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&uo(a))}function Ff(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&uo(e))}function wi(e,n,a,r){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Jg(e,n,a,r),n=n.sibling}function Jg(e,n,a,r){var c=n.flags;switch(n.tag){case 0:case 11:case 15:wi(e,n,a,r),c&2048&&Eo(9,n);break;case 1:wi(e,n,a,r);break;case 3:wi(e,n,a,r),c&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&uo(e)));break;case 12:if(c&2048){wi(e,n,a,r),e=n.stateNode;try{var f=n.memoizedProps,_=f.id,R=f.onPostCommit;typeof R=="function"&&R(_,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(H){Fe(n,n.return,H)}}else wi(e,n,a,r);break;case 31:wi(e,n,a,r);break;case 13:wi(e,n,a,r);break;case 23:break;case 22:f=n.stateNode,_=n.alternate,n.memoizedState!==null?f._visibility&2?wi(e,n,a,r):To(e,n):f._visibility&2?wi(e,n,a,r):(f._visibility|=2,or(e,n,a,r,(n.subtreeFlags&10256)!==0||!1)),c&2048&&Bf(_,n);break;case 24:wi(e,n,a,r),c&2048&&Ff(n.alternate,n);break;default:wi(e,n,a,r)}}function or(e,n,a,r,c){for(c=c&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=e,_=n,R=a,H=r,nt=_.flags;switch(_.tag){case 0:case 11:case 15:or(f,_,R,H,c),Eo(8,_);break;case 23:break;case 22:var mt=_.stateNode;_.memoizedState!==null?mt._visibility&2?or(f,_,R,H,c):To(f,_):(mt._visibility|=2,or(f,_,R,H,c)),c&&nt&2048&&Bf(_.alternate,_);break;case 24:or(f,_,R,H,c),c&&nt&2048&&Ff(_.alternate,_);break;default:or(f,_,R,H,c)}n=n.sibling}}function To(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,r=n,c=r.flags;switch(r.tag){case 22:To(a,r),c&2048&&Bf(r.alternate,r);break;case 24:To(a,r),c&2048&&Ff(r.alternate,r);break;default:To(a,r)}n=n.sibling}}var Ao=8192;function lr(e,n,a){if(e.subtreeFlags&Ao)for(e=e.child;e!==null;)jg(e,n,a),e=e.sibling}function jg(e,n,a){switch(e.tag){case 26:lr(e,n,a),e.flags&Ao&&e.memoizedState!==null&&KS(a,Ci,e.memoizedState,e.memoizedProps);break;case 5:lr(e,n,a);break;case 3:case 4:var r=Ci;Ci=au(e.stateNode.containerInfo),lr(e,n,a),Ci=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Ao,Ao=16777216,lr(e,n,a),Ao=r):lr(e,n,a));break;default:lr(e,n,a)}}function $g(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Ro(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];En=r,e0(r,e)}$g(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)t0(e),e=e.sibling}function t0(e){switch(e.tag){case 0:case 11:case 15:Ro(e),e.flags&2048&&Ba(9,e,e.return);break;case 3:Ro(e);break;case 12:Ro(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,Wl(e)):Ro(e);break;default:Ro(e)}}function Wl(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];En=r,e0(r,e)}$g(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Ba(8,n,n.return),Wl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Wl(n));break;default:Wl(n)}e=e.sibling}}function e0(e,n){for(;En!==null;){var a=En;switch(a.tag){case 0:case 11:case 15:Ba(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var r=a.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:uo(a.memoizedState.cache)}if(r=a.child,r!==null)r.return=a,En=r;else t:for(a=e;En!==null;){r=En;var c=r.sibling,f=r.return;if(Wg(r),r===a){En=null;break t}if(c!==null){c.return=f,En=c;break t}En=f}}}var cS={getCacheForType:function(e){var n=Rn(dn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return Rn(dn).controller.signal}},fS=typeof WeakMap=="function"?WeakMap:Map,we=0,qe=null,ge=null,ve=0,Be=0,oi=null,Fa=!1,ur=!1,Hf=!1,da=0,ln=0,Ha=0,Rs=0,Gf=0,li=0,cr=0,Co=null,Zn=null,Vf=!1,ql=0,n0=0,Yl=1/0,Zl=null,Ga=null,Sn=0,Va=null,fr=null,pa=0,Xf=0,kf=null,i0=null,wo=0,Wf=null;function ui(){return(we&2)!==0&&ve!==0?ve&-ve:B.T!==null?Jf():Jr()}function a0(){if(li===0)if((ve&536870912)===0||Me){var e=ne;ne<<=1,(ne&3932160)===0&&(ne=262144),li=e}else li=536870912;return e=si.current,e!==null&&(e.flags|=32),li}function Kn(e,n,a){(e===qe&&(Be===2||Be===9)||e.cancelPendingCommit!==null)&&(hr(e,0),Xa(e,ve,li,!1)),Gt(e,a),((we&2)===0||e!==qe)&&(e===qe&&((we&2)===0&&(Rs|=a),ln===4&&Xa(e,ve,li,!1)),Gi(e))}function s0(e,n,a){if((we&6)!==0)throw Error(s(327));var r=!a&&(n&127)===0&&(n&e.expiredLanes)===0||Ct(e,n),c=r?pS(e,n):Yf(e,n,!0),f=r;do{if(c===0){ur&&!r&&Xa(e,n,0,!1);break}else{if(a=e.current.alternate,f&&!hS(a)){c=Yf(e,n,!1),f=!1;continue}if(c===2){if(f=n,e.errorRecoveryDisabledLanes&f)var _=0;else _=e.pendingLanes&-536870913,_=_!==0?_:_&536870912?536870912:0;if(_!==0){n=_;t:{var R=e;c=Co;var H=R.current.memoizedState.isDehydrated;if(H&&(hr(R,_).flags|=256),_=Yf(R,_,!1),_!==2){if(Hf&&!H){R.errorRecoveryDisabledLanes|=f,Rs|=f,c=4;break t}f=Zn,Zn=c,f!==null&&(Zn===null?Zn=f:Zn.push.apply(Zn,f))}c=_}if(f=!1,c!==2)continue}}if(c===1){hr(e,0),Xa(e,n,0,!0);break}t:{switch(r=e,f=c,f){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Xa(r,n,li,!Fa);break t;case 2:Zn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(c=ql+300-De(),10<c)){if(Xa(r,n,li,!Fa),gt(r,0,!0)!==0)break t;pa=n,r.timeoutHandle=I0(r0.bind(null,r,a,Zn,Zl,Vf,n,li,Rs,cr,Fa,f,"Throttled",-0,0),c);break t}r0(r,a,Zn,Zl,Vf,n,li,Rs,cr,Fa,f,null,-0,0)}}break}while(!0);Gi(e)}function r0(e,n,a,r,c,f,_,R,H,nt,mt,vt,ot,ut){if(e.timeoutHandle=-1,vt=n.subtreeFlags,vt&8192||(vt&16785408)===16785408){vt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:$i},jg(n,f,vt);var kt=(f&62914560)===f?ql-De():(f&4194048)===f?n0-De():0;if(kt=QS(vt,kt),kt!==null){pa=f,e.cancelPendingCommit=kt(p0.bind(null,e,n,f,a,r,c,_,R,H,mt,vt,null,ot,ut)),Xa(e,f,_,!nt);return}}p0(e,n,f,a,r,c,_,R,H)}function hS(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var r=0;r<a.length;r++){var c=a[r],f=c.getSnapshot;c=c.value;try{if(!ii(f(),c))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Xa(e,n,a,r){n&=~Gf,n&=~Rs,e.suspendedLanes|=n,e.pingedLanes&=~n,r&&(e.warmLanes|=n),r=e.expirationTimes;for(var c=n;0<c;){var f=31-Bt(c),_=1<<f;r[f]=-1,c&=~_}a!==0&&Oe(e,a,n)}function Kl(){return(we&6)===0?(Do(0),!1):!0}function qf(){if(ge!==null){if(Be===0)var e=ge.return;else e=ge,ia=vs=null,lf(e),nr=null,fo=0,e=ge;for(;e!==null;)zg(e.alternate,e),e=e.return;ge=null}}function hr(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,NS(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),pa=0,qf(),qe=e,ge=a=ea(e.current,null),ve=n,Be=0,oi=null,Fa=!1,ur=Ct(e,n),Hf=!1,cr=li=Gf=Rs=Ha=ln=0,Zn=Co=null,Vf=!1,(n&8)!==0&&(n|=n&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=n;0<r;){var c=31-Bt(r),f=1<<c;n|=e[c],r&=~f}return da=n,gl(),a}function o0(e,n){le=null,B.H=So,n===er||n===bl?(n=Em(),Be=3):n===Kc?(n=Em(),Be=4):Be=n===bf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,oi=n,ge===null&&(ln=1,Bl(e,gi(n,e.current)))}function l0(){var e=si.current;return e===null?!0:(ve&4194048)===ve?Si===null:(ve&62914560)===ve||(ve&536870912)!==0?e===Si:!1}function u0(){var e=B.H;return B.H=So,e===null?So:e}function c0(){var e=B.A;return B.A=cS,e}function Ql(){ln=4,Fa||(ve&4194048)!==ve&&si.current!==null||(ur=!0),(Ha&134217727)===0&&(Rs&134217727)===0||qe===null||Xa(qe,ve,li,!1)}function Yf(e,n,a){var r=we;we|=2;var c=u0(),f=c0();(qe!==e||ve!==n)&&(Zl=null,hr(e,n)),n=!1;var _=ln;t:do try{if(Be!==0&&ge!==null){var R=ge,H=oi;switch(Be){case 8:qf(),_=6;break t;case 3:case 2:case 9:case 6:si.current===null&&(n=!0);var nt=Be;if(Be=0,oi=null,dr(e,R,H,nt),a&&ur){_=0;break t}break;default:nt=Be,Be=0,oi=null,dr(e,R,H,nt)}}dS(),_=ln;break}catch(mt){o0(e,mt)}while(!0);return n&&e.shellSuspendCounter++,ia=vs=null,we=r,B.H=c,B.A=f,ge===null&&(qe=null,ve=0,gl()),_}function dS(){for(;ge!==null;)f0(ge)}function pS(e,n){var a=we;we|=2;var r=u0(),c=c0();qe!==e||ve!==n?(Zl=null,Yl=De()+500,hr(e,n)):ur=Ct(e,n);t:do try{if(Be!==0&&ge!==null){n=ge;var f=oi;e:switch(Be){case 1:Be=0,oi=null,dr(e,n,f,1);break;case 2:case 9:if(Mm(f)){Be=0,oi=null,h0(n);break}n=function(){Be!==2&&Be!==9||qe!==e||(Be=7),Gi(e)},f.then(n,n);break t;case 3:Be=7;break t;case 4:Be=5;break t;case 7:Mm(f)?(Be=0,oi=null,h0(n)):(Be=0,oi=null,dr(e,n,f,7));break;case 5:var _=null;switch(ge.tag){case 26:_=ge.memoizedState;case 5:case 27:var R=ge;if(_?J0(_):R.stateNode.complete){Be=0,oi=null;var H=R.sibling;if(H!==null)ge=H;else{var nt=R.return;nt!==null?(ge=nt,Jl(nt)):ge=null}break e}}Be=0,oi=null,dr(e,n,f,5);break;case 6:Be=0,oi=null,dr(e,n,f,6);break;case 8:qf(),ln=6;break t;default:throw Error(s(462))}}mS();break}catch(mt){o0(e,mt)}while(!0);return ia=vs=null,B.H=r,B.A=c,we=a,ge!==null?0:(qe=null,ve=0,gl(),ln)}function mS(){for(;ge!==null&&!Ke();)f0(ge)}function f0(e){var n=Pg(e.alternate,e,da);e.memoizedProps=e.pendingProps,n===null?Jl(e):ge=n}function h0(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=wg(a,n,n.pendingProps,n.type,void 0,ve);break;case 11:n=wg(a,n,n.pendingProps,n.type.render,n.ref,ve);break;case 5:lf(n);default:zg(a,n),n=ge=cm(n,da),n=Pg(a,n,da)}e.memoizedProps=e.pendingProps,n===null?Jl(e):ge=n}function dr(e,n,a,r){ia=vs=null,lf(n),nr=null,fo=0;var c=n.return;try{if(iS(e,c,n,a,ve)){ln=1,Bl(e,gi(a,e.current)),ge=null;return}}catch(f){if(c!==null)throw ge=c,f;ln=1,Bl(e,gi(a,e.current)),ge=null;return}n.flags&32768?(Me||r===1?e=!0:ur||(ve&536870912)!==0?e=!1:(Fa=e=!0,(r===2||r===9||r===3||r===6)&&(r=si.current,r!==null&&r.tag===13&&(r.flags|=16384))),d0(n,e)):Jl(n)}function Jl(e){var n=e;do{if((n.flags&32768)!==0){d0(n,Fa);return}e=n.return;var a=rS(n.alternate,n,da);if(a!==null){ge=a;return}if(n=n.sibling,n!==null){ge=n;return}ge=n=e}while(n!==null);ln===0&&(ln=5)}function d0(e,n){do{var a=oS(e.alternate,e);if(a!==null){a.flags&=32767,ge=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){ge=e;return}ge=e=a}while(e!==null);ln=6,ge=null}function p0(e,n,a,r,c,f,_,R,H){e.cancelPendingCommit=null;do jl();while(Sn!==0);if((we&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(f=n.lanes|n.childLanes,f|=Oc,$e(e,a,f,_,R,H),e===qe&&(ge=qe=null,ve=0),fr=n,Va=e,pa=a,Xf=f,kf=c,i0=r,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,xS(J,function(){return x0(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||r){r=B.T,B.T=null,c=F.p,F.p=2,_=we,we|=4;try{lS(e,n,a)}finally{we=_,F.p=c,B.T=r}}Sn=1,m0(),g0(),_0()}}function m0(){if(Sn===1){Sn=0;var e=Va,n=fr,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=B.T,B.T=null;var r=F.p;F.p=2;var c=we;we|=4;try{Kg(n,e);var f=sh,_=em(e.containerInfo),R=f.focusedElem,H=f.selectionRange;if(_!==R&&R&&R.ownerDocument&&tm(R.ownerDocument.documentElement,R)){if(H!==null&&wc(R)){var nt=H.start,mt=H.end;if(mt===void 0&&(mt=nt),"selectionStart"in R)R.selectionStart=nt,R.selectionEnd=Math.min(mt,R.value.length);else{var vt=R.ownerDocument||document,ot=vt&&vt.defaultView||window;if(ot.getSelection){var ut=ot.getSelection(),kt=R.textContent.length,ee=Math.min(H.start,kt),Xe=H.end===void 0?ee:Math.min(H.end,kt);!ut.extend&&ee>Xe&&(_=Xe,Xe=ee,ee=_);var Q=$p(R,ee),X=$p(R,Xe);if(Q&&X&&(ut.rangeCount!==1||ut.anchorNode!==Q.node||ut.anchorOffset!==Q.offset||ut.focusNode!==X.node||ut.focusOffset!==X.offset)){var et=vt.createRange();et.setStart(Q.node,Q.offset),ut.removeAllRanges(),ee>Xe?(ut.addRange(et),ut.extend(X.node,X.offset)):(et.setEnd(X.node,X.offset),ut.addRange(et))}}}}for(vt=[],ut=R;ut=ut.parentNode;)ut.nodeType===1&&vt.push({element:ut,left:ut.scrollLeft,top:ut.scrollTop});for(typeof R.focus=="function"&&R.focus(),R=0;R<vt.length;R++){var _t=vt[R];_t.element.scrollLeft=_t.left,_t.element.scrollTop=_t.top}}cu=!!ah,sh=ah=null}finally{we=c,F.p=r,B.T=a}}e.current=n,Sn=2}}function g0(){if(Sn===2){Sn=0;var e=Va,n=fr,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=B.T,B.T=null;var r=F.p;F.p=2;var c=we;we|=4;try{kg(e,n.alternate,n)}finally{we=c,F.p=r,B.T=a}}Sn=3}}function _0(){if(Sn===4||Sn===3){Sn=0,q();var e=Va,n=fr,a=pa,r=i0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?Sn=5:(Sn=0,fr=Va=null,v0(e,e.pendingLanes));var c=e.pendingLanes;if(c===0&&(Ga=null),Qr(a),n=n.stateNode,dt&&typeof dt.onCommitFiberRoot=="function")try{dt.onCommitFiberRoot(ht,n,void 0,(n.current.flags&128)===128)}catch{}if(r!==null){n=B.T,c=F.p,F.p=2,B.T=null;try{for(var f=e.onRecoverableError,_=0;_<r.length;_++){var R=r[_];f(R.value,{componentStack:R.stack})}}finally{B.T=n,F.p=c}}(pa&3)!==0&&jl(),Gi(e),c=e.pendingLanes,(a&261930)!==0&&(c&42)!==0?e===Wf?wo++:(wo=0,Wf=e):wo=0,Do(0)}}function v0(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,uo(n)))}function jl(){return m0(),g0(),_0(),x0()}function x0(){if(Sn!==5)return!1;var e=Va,n=Xf;Xf=0;var a=Qr(pa),r=B.T,c=F.p;try{F.p=32>a?32:a,B.T=null,a=kf,kf=null;var f=Va,_=pa;if(Sn=0,fr=Va=null,pa=0,(we&6)!==0)throw Error(s(331));var R=we;if(we|=4,t0(f.current),Jg(f,f.current,_,a),we=R,Do(0,!1),dt&&typeof dt.onPostCommitFiberRoot=="function")try{dt.onPostCommitFiberRoot(ht,f)}catch{}return!0}finally{F.p=c,B.T=r,v0(e,n)}}function S0(e,n,a){n=gi(a,n),n=Ef(e.stateNode,n,2),e=Pa(e,n,2),e!==null&&(Gt(e,2),Gi(e))}function Fe(e,n,a){if(e.tag===3)S0(e,e,a);else for(;n!==null;){if(n.tag===3){S0(n,e,a);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Ga===null||!Ga.has(r))){e=gi(a,e),a=Mg(2),r=Pa(n,a,2),r!==null&&(yg(a,r,n,e),Gt(r,2),Gi(r));break}}n=n.return}}function Zf(e,n,a){var r=e.pingCache;if(r===null){r=e.pingCache=new fS;var c=new Set;r.set(n,c)}else c=r.get(n),c===void 0&&(c=new Set,r.set(n,c));c.has(a)||(Hf=!0,c.add(a),e=gS.bind(null,e,n,a),n.then(e,e))}function gS(e,n,a){var r=e.pingCache;r!==null&&r.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,qe===e&&(ve&a)===a&&(ln===4||ln===3&&(ve&62914560)===ve&&300>De()-ql?(we&2)===0&&hr(e,0):Gf|=a,cr===ve&&(cr=0)),Gi(e)}function M0(e,n){n===0&&(n=yt()),e=ms(e,n),e!==null&&(Gt(e,n),Gi(e))}function _S(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),M0(e,a)}function vS(e,n){var a=0;switch(e.tag){case 31:case 13:var r=e.stateNode,c=e.memoizedState;c!==null&&(a=c.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(n),M0(e,a)}function xS(e,n){return je(e,n)}var $l=null,pr=null,Kf=!1,tu=!1,Qf=!1,ka=0;function Gi(e){e!==pr&&e.next===null&&(pr===null?$l=pr=e:pr=pr.next=e),tu=!0,Kf||(Kf=!0,MS())}function Do(e,n){if(!Qf&&tu){Qf=!0;do for(var a=!1,r=$l;r!==null;){if(e!==0){var c=r.pendingLanes;if(c===0)var f=0;else{var _=r.suspendedLanes,R=r.pingedLanes;f=(1<<31-Bt(42|e)+1)-1,f&=c&~(_&~R),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,T0(r,f))}else f=ve,f=gt(r,r===qe?f:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(f&3)===0||Ct(r,f)||(a=!0,T0(r,f));r=r.next}while(a);Qf=!1}}function SS(){y0()}function y0(){tu=Kf=!1;var e=0;ka!==0&&US()&&(e=ka);for(var n=De(),a=null,r=$l;r!==null;){var c=r.next,f=E0(r,n);f===0?(r.next=null,a===null?$l=c:a.next=c,c===null&&(pr=a)):(a=r,(e!==0||(f&3)!==0)&&(tu=!0)),r=c}Sn!==0&&Sn!==5||Do(e),ka!==0&&(ka=0)}function E0(e,n){for(var a=e.suspendedLanes,r=e.pingedLanes,c=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var _=31-Bt(f),R=1<<_,H=c[_];H===-1?((R&a)===0||(R&r)!==0)&&(c[_]=It(R,n)):H<=n&&(e.expiredLanes|=R),f&=~R}if(n=qe,a=ve,a=gt(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,a===0||e===n&&(Be===2||Be===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Le(r),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Ct(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(r!==null&&Le(r),Qr(a)){case 2:case 8:a=M;break;case 32:a=J;break;case 268435456:a=ft;break;default:a=J}return r=b0.bind(null,e),a=je(a,r),e.callbackPriority=n,e.callbackNode=a,n}return r!==null&&r!==null&&Le(r),e.callbackPriority=2,e.callbackNode=null,2}function b0(e,n){if(Sn!==0&&Sn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(jl()&&e.callbackNode!==a)return null;var r=ve;return r=gt(e,e===qe?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(s0(e,r,n),E0(e,De()),e.callbackNode!=null&&e.callbackNode===a?b0.bind(null,e):null)}function T0(e,n){if(jl())return null;s0(e,n,!0)}function MS(){LS(function(){(we&6)!==0?je(O,SS):y0()})}function Jf(){if(ka===0){var e=$s;e===0&&(e=Jt,Jt<<=1,(Jt&261888)===0&&(Jt=256)),ka=e}return ka}function A0(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:fs(""+e)}function R0(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function yS(e,n,a,r,c){if(n==="submit"&&a&&a.stateNode===c){var f=A0((c[Tn]||null).action),_=r.submitter;_&&(n=(n=_[Tn]||null)?A0(n.formAction):_.getAttribute("formAction"),n!==null&&(f=n,_=null));var R=new hl("action","action",null,r,c);e.push({event:R,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(ka!==0){var H=_?R0(c,_):new FormData(c);_f(a,{pending:!0,data:H,method:c.method,action:f},null,H)}}else typeof f=="function"&&(R.preventDefault(),H=_?R0(c,_):new FormData(c),_f(a,{pending:!0,data:H,method:c.method,action:f},f,H))},currentTarget:c}]})}}for(var jf=0;jf<Lc.length;jf++){var $f=Lc[jf],ES=$f.toLowerCase(),bS=$f[0].toUpperCase()+$f.slice(1);Ri(ES,"on"+bS)}Ri(am,"onAnimationEnd"),Ri(sm,"onAnimationIteration"),Ri(rm,"onAnimationStart"),Ri("dblclick","onDoubleClick"),Ri("focusin","onFocus"),Ri("focusout","onBlur"),Ri(Hx,"onTransitionRun"),Ri(Gx,"onTransitionStart"),Ri(Vx,"onTransitionCancel"),Ri(om,"onTransitionEnd"),rt("onMouseEnter",["mouseout","mouseover"]),rt("onMouseLeave",["mouseout","mouseover"]),rt("onPointerEnter",["pointerout","pointerover"]),rt("onPointerLeave",["pointerout","pointerover"]),Y("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Y("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Y("onBeforeInput",["compositionend","keypress","textInput","paste"]),Y("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Y("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Y("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Uo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),TS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Uo));function C0(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var r=e[a],c=r.event;r=r.listeners;t:{var f=void 0;if(n)for(var _=r.length-1;0<=_;_--){var R=r[_],H=R.instance,nt=R.currentTarget;if(R=R.listener,H!==f&&c.isPropagationStopped())break t;f=R,c.currentTarget=nt;try{f(c)}catch(mt){ml(mt)}c.currentTarget=null,f=H}else for(_=0;_<r.length;_++){if(R=r[_],H=R.instance,nt=R.currentTarget,R=R.listener,H!==f&&c.isPropagationStopped())break t;f=R,c.currentTarget=nt;try{f(c)}catch(mt){ml(mt)}c.currentTarget=null,f=H}}}}function _e(e,n){var a=n[ls];a===void 0&&(a=n[ls]=new Set);var r=e+"__bubble";a.has(r)||(w0(n,e,2,!1),a.add(r))}function th(e,n,a){var r=0;n&&(r|=4),w0(a,e,r,n)}var eu="_reactListening"+Math.random().toString(36).slice(2);function eh(e){if(!e[eu]){e[eu]=!0,ll.forEach(function(a){a!=="selectionchange"&&(TS.has(a)||th(a,!1,e),th(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[eu]||(n[eu]=!0,th("selectionchange",!1,n))}}function w0(e,n,a,r){switch(a_(n)){case 2:var c=$S;break;case 8:c=tM;break;default:c=gh}a=c.bind(null,n,a,e),c=void 0,!Sc||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(c=!0),r?c!==void 0?e.addEventListener(n,a,{capture:!0,passive:c}):e.addEventListener(n,a,!0):c!==void 0?e.addEventListener(n,a,{passive:c}):e.addEventListener(n,a,!1)}function nh(e,n,a,r,c){var f=r;if((n&1)===0&&(n&2)===0&&r!==null)t:for(;;){if(r===null)return;var _=r.tag;if(_===3||_===4){var R=r.stateNode.containerInfo;if(R===c)break;if(_===4)for(_=r.return;_!==null;){var H=_.tag;if((H===3||H===4)&&_.stateNode.containerInfo===c)return;_=_.return}for(;R!==null;){if(_=Ji(R),_===null)return;if(H=_.tag,H===5||H===6||H===26||H===27){r=f=_;continue t}R=R.parentNode}}r=r.return}Op(function(){var nt=f,mt=vc(a),vt=[];t:{var ot=lm.get(e);if(ot!==void 0){var ut=hl,kt=e;switch(e){case"keypress":if(cl(a)===0)break t;case"keydown":case"keyup":ut=vx;break;case"focusin":kt="focus",ut=bc;break;case"focusout":kt="blur",ut=bc;break;case"beforeblur":case"afterblur":ut=bc;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ut=zp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ut=rx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ut=Mx;break;case am:case sm:case rm:ut=ux;break;case om:ut=Ex;break;case"scroll":case"scrollend":ut=ax;break;case"wheel":ut=Tx;break;case"copy":case"cut":case"paste":ut=fx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ut=Fp;break;case"toggle":case"beforetoggle":ut=Rx}var ee=(n&4)!==0,Xe=!ee&&(e==="scroll"||e==="scrollend"),Q=ee?ot!==null?ot+"Capture":null:ot;ee=[];for(var X=nt,et;X!==null;){var _t=X;if(et=_t.stateNode,_t=_t.tag,_t!==5&&_t!==26&&_t!==27||et===null||Q===null||(_t=jr(X,Q),_t!=null&&ee.push(No(X,_t,et))),Xe)break;X=X.return}0<ee.length&&(ot=new ut(ot,kt,null,a,mt),vt.push({event:ot,listeners:ee}))}}if((n&7)===0){t:{if(ot=e==="mouseover"||e==="pointerover",ut=e==="mouseout"||e==="pointerout",ot&&a!==_c&&(kt=a.relatedTarget||a.fromElement)&&(Ji(kt)||kt[Xn]))break t;if((ut||ot)&&(ot=mt.window===mt?mt:(ot=mt.ownerDocument)?ot.defaultView||ot.parentWindow:window,ut?(kt=a.relatedTarget||a.toElement,ut=nt,kt=kt?Ji(kt):null,kt!==null&&(Xe=u(kt),ee=kt.tag,kt!==Xe||ee!==5&&ee!==27&&ee!==6)&&(kt=null)):(ut=null,kt=nt),ut!==kt)){if(ee=zp,_t="onMouseLeave",Q="onMouseEnter",X="mouse",(e==="pointerout"||e==="pointerover")&&(ee=Fp,_t="onPointerLeave",Q="onPointerEnter",X="pointer"),Xe=ut==null?ot:cs(ut),et=kt==null?ot:cs(kt),ot=new ee(_t,X+"leave",ut,a,mt),ot.target=Xe,ot.relatedTarget=et,_t=null,Ji(mt)===nt&&(ee=new ee(Q,X+"enter",kt,a,mt),ee.target=et,ee.relatedTarget=Xe,_t=ee),Xe=_t,ut&&kt)e:{for(ee=AS,Q=ut,X=kt,et=0,_t=Q;_t;_t=ee(_t))et++;_t=0;for(var $t=X;$t;$t=ee($t))_t++;for(;0<et-_t;)Q=ee(Q),et--;for(;0<_t-et;)X=ee(X),_t--;for(;et--;){if(Q===X||X!==null&&Q===X.alternate){ee=Q;break e}Q=ee(Q),X=ee(X)}ee=null}else ee=null;ut!==null&&D0(vt,ot,ut,ee,!1),kt!==null&&Xe!==null&&D0(vt,Xe,kt,ee,!0)}}t:{if(ot=nt?cs(nt):window,ut=ot.nodeName&&ot.nodeName.toLowerCase(),ut==="select"||ut==="input"&&ot.type==="file")var Ae=Yp;else if(Wp(ot))if(Zp)Ae=zx;else{Ae=Px;var qt=Ox}else ut=ot.nodeName,!ut||ut.toLowerCase()!=="input"||ot.type!=="checkbox"&&ot.type!=="radio"?nt&&Ue(nt.elementType)&&(Ae=Yp):Ae=Ix;if(Ae&&(Ae=Ae(e,nt))){qp(vt,Ae,a,mt);break t}qt&&qt(e,ot,nt),e==="focusout"&&nt&&ot.type==="number"&&nt.memoizedProps.value!=null&&me(ot,"number",ot.value)}switch(qt=nt?cs(nt):window,e){case"focusin":(Wp(qt)||qt.contentEditable==="true")&&(Ws=qt,Dc=nt,ro=null);break;case"focusout":ro=Dc=Ws=null;break;case"mousedown":Uc=!0;break;case"contextmenu":case"mouseup":case"dragend":Uc=!1,nm(vt,a,mt);break;case"selectionchange":if(Fx)break;case"keydown":case"keyup":nm(vt,a,mt)}var ce;if(Ac)t:{switch(e){case"compositionstart":var xe="onCompositionStart";break t;case"compositionend":xe="onCompositionEnd";break t;case"compositionupdate":xe="onCompositionUpdate";break t}xe=void 0}else ks?Xp(e,a)&&(xe="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(xe="onCompositionStart");xe&&(Hp&&a.locale!=="ko"&&(ks||xe!=="onCompositionStart"?xe==="onCompositionEnd"&&ks&&(ce=Pp()):(Ca=mt,Mc="value"in Ca?Ca.value:Ca.textContent,ks=!0)),qt=nu(nt,xe),0<qt.length&&(xe=new Bp(xe,e,null,a,mt),vt.push({event:xe,listeners:qt}),ce?xe.data=ce:(ce=kp(a),ce!==null&&(xe.data=ce)))),(ce=wx?Dx(e,a):Ux(e,a))&&(xe=nu(nt,"onBeforeInput"),0<xe.length&&(qt=new Bp("onBeforeInput","beforeinput",null,a,mt),vt.push({event:qt,listeners:xe}),qt.data=ce)),yS(vt,e,nt,a,mt)}C0(vt,n)})}function No(e,n,a){return{instance:e,listener:n,currentTarget:a}}function nu(e,n){for(var a=n+"Capture",r=[];e!==null;){var c=e,f=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||f===null||(c=jr(e,a),c!=null&&r.unshift(No(e,c,f)),c=jr(e,n),c!=null&&r.push(No(e,c,f))),e.tag===3)return r;e=e.return}return[]}function AS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function D0(e,n,a,r,c){for(var f=n._reactName,_=[];a!==null&&a!==r;){var R=a,H=R.alternate,nt=R.stateNode;if(R=R.tag,H!==null&&H===r)break;R!==5&&R!==26&&R!==27||nt===null||(H=nt,c?(nt=jr(a,f),nt!=null&&_.unshift(No(a,nt,H))):c||(nt=jr(a,f),nt!=null&&_.push(No(a,nt,H)))),a=a.return}_.length!==0&&e.push({event:n,listeners:_})}var RS=/\r\n?/g,CS=/\u0000|\uFFFD/g;function U0(e){return(typeof e=="string"?e:""+e).replace(RS,`
`).replace(CS,"")}function N0(e,n){return n=U0(n),U0(e)===n}function Ve(e,n,a,r,c,f){switch(a){case"children":typeof r=="string"?n==="body"||n==="textarea"&&r===""||ni(e,r):(typeof r=="number"||typeof r=="bigint")&&n!=="body"&&ni(e,""+r);break;case"className":Xt(e,"class",r);break;case"tabIndex":Xt(e,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":Xt(e,a,r);break;case"style":Ai(e,r,f);break;case"data":if(n!=="object"){Xt(e,"data",r);break}case"src":case"href":if(r===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(a);break}r=fs(""+r),e.setAttribute(a,r);break;case"action":case"formAction":if(typeof r=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Ve(e,n,"name",c.name,c,null),Ve(e,n,"formEncType",c.formEncType,c,null),Ve(e,n,"formMethod",c.formMethod,c,null),Ve(e,n,"formTarget",c.formTarget,c,null)):(Ve(e,n,"encType",c.encType,c,null),Ve(e,n,"method",c.method,c,null),Ve(e,n,"target",c.target,c,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(a);break}r=fs(""+r),e.setAttribute(a,r);break;case"onClick":r!=null&&(e.onclick=$i);break;case"onScroll":r!=null&&_e("scroll",e);break;case"onScrollEnd":r!=null&&_e("scrollend",e);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(c.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":e.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){e.removeAttribute("xlink:href");break}a=fs(""+r),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,""+r):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":r===!0?e.setAttribute(a,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,r):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?e.setAttribute(a,r):e.removeAttribute(a);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?e.removeAttribute(a):e.setAttribute(a,r);break;case"popover":_e("beforetoggle",e),_e("toggle",e),Ut(e,"popover",r);break;case"xlinkActuate":Vt(e,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":Vt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":Vt(e,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":Vt(e,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":Vt(e,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":Vt(e,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":Vt(e,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":Vt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":Vt(e,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":Ut(e,"is",r);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=zi.get(a)||a,Ut(e,a,r))}}function ih(e,n,a,r,c,f){switch(a){case"style":Ai(e,r,f);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(c.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof r=="string"?ni(e,r):(typeof r=="number"||typeof r=="bigint")&&ni(e,""+r);break;case"onScroll":r!=null&&_e("scroll",e);break;case"onScrollEnd":r!=null&&_e("scrollend",e);break;case"onClick":r!=null&&(e.onclick=$i);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!A.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(c=a.endsWith("Capture"),n=a.slice(2,c?a.length-7:void 0),f=e[Tn]||null,f=f!=null?f[a]:null,typeof f=="function"&&e.removeEventListener(n,f,c),typeof r=="function")){typeof f!="function"&&f!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,r,c);break t}a in e?e[a]=r:r===!0?e.setAttribute(a,""):Ut(e,a,r)}}}function wn(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":_e("error",e),_e("load",e);var r=!1,c=!1,f;for(f in a)if(a.hasOwnProperty(f)){var _=a[f];if(_!=null)switch(f){case"src":r=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ve(e,n,f,_,a,null)}}c&&Ve(e,n,"srcSet",a.srcSet,a,null),r&&Ve(e,n,"src",a.src,a,null);return;case"input":_e("invalid",e);var R=f=_=c=null,H=null,nt=null;for(r in a)if(a.hasOwnProperty(r)){var mt=a[r];if(mt!=null)switch(r){case"name":c=mt;break;case"type":_=mt;break;case"checked":H=mt;break;case"defaultChecked":nt=mt;break;case"value":f=mt;break;case"defaultValue":R=mt;break;case"children":case"dangerouslySetInnerHTML":if(mt!=null)throw Error(s(137,n));break;default:Ve(e,n,r,mt,a,null)}}Nn(e,f,R,H,nt,_,c,!1);return;case"select":_e("invalid",e),r=_=f=null;for(c in a)if(a.hasOwnProperty(c)&&(R=a[c],R!=null))switch(c){case"value":f=R;break;case"defaultValue":_=R;break;case"multiple":r=R;default:Ve(e,n,c,R,a,null)}n=f,a=_,e.multiple=!!r,n!=null?xn(e,!!r,n,!1):a!=null&&xn(e,!!r,a,!0);return;case"textarea":_e("invalid",e),f=c=r=null;for(_ in a)if(a.hasOwnProperty(_)&&(R=a[_],R!=null))switch(_){case"value":r=R;break;case"defaultValue":c=R;break;case"children":f=R;break;case"dangerouslySetInnerHTML":if(R!=null)throw Error(s(91));break;default:Ve(e,n,_,R,a,null)}Ti(e,r,c,f);return;case"option":for(H in a)if(a.hasOwnProperty(H)&&(r=a[H],r!=null))switch(H){case"selected":e.selected=r&&typeof r!="function"&&typeof r!="symbol";break;default:Ve(e,n,H,r,a,null)}return;case"dialog":_e("beforetoggle",e),_e("toggle",e),_e("cancel",e),_e("close",e);break;case"iframe":case"object":_e("load",e);break;case"video":case"audio":for(r=0;r<Uo.length;r++)_e(Uo[r],e);break;case"image":_e("error",e),_e("load",e);break;case"details":_e("toggle",e);break;case"embed":case"source":case"link":_e("error",e),_e("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(nt in a)if(a.hasOwnProperty(nt)&&(r=a[nt],r!=null))switch(nt){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ve(e,n,nt,r,a,null)}return;default:if(Ue(n)){for(mt in a)a.hasOwnProperty(mt)&&(r=a[mt],r!==void 0&&ih(e,n,mt,r,a,void 0));return}}for(R in a)a.hasOwnProperty(R)&&(r=a[R],r!=null&&Ve(e,n,R,r,a,null))}function wS(e,n,a,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,f=null,_=null,R=null,H=null,nt=null,mt=null;for(ut in a){var vt=a[ut];if(a.hasOwnProperty(ut)&&vt!=null)switch(ut){case"checked":break;case"value":break;case"defaultValue":H=vt;default:r.hasOwnProperty(ut)||Ve(e,n,ut,null,r,vt)}}for(var ot in r){var ut=r[ot];if(vt=a[ot],r.hasOwnProperty(ot)&&(ut!=null||vt!=null))switch(ot){case"type":f=ut;break;case"name":c=ut;break;case"checked":nt=ut;break;case"defaultChecked":mt=ut;break;case"value":_=ut;break;case"defaultValue":R=ut;break;case"children":case"dangerouslySetInnerHTML":if(ut!=null)throw Error(s(137,n));break;default:ut!==vt&&Ve(e,n,ot,ut,r,vt)}}Ft(e,_,R,H,nt,mt,f,c);return;case"select":ut=_=R=ot=null;for(f in a)if(H=a[f],a.hasOwnProperty(f)&&H!=null)switch(f){case"value":break;case"multiple":ut=H;default:r.hasOwnProperty(f)||Ve(e,n,f,null,r,H)}for(c in r)if(f=r[c],H=a[c],r.hasOwnProperty(c)&&(f!=null||H!=null))switch(c){case"value":ot=f;break;case"defaultValue":R=f;break;case"multiple":_=f;default:f!==H&&Ve(e,n,c,f,r,H)}n=R,a=_,r=ut,ot!=null?xn(e,!!a,ot,!1):!!r!=!!a&&(n!=null?xn(e,!!a,n,!0):xn(e,!!a,a?[]:"",!1));return;case"textarea":ut=ot=null;for(R in a)if(c=a[R],a.hasOwnProperty(R)&&c!=null&&!r.hasOwnProperty(R))switch(R){case"value":break;case"children":break;default:Ve(e,n,R,null,r,c)}for(_ in r)if(c=r[_],f=a[_],r.hasOwnProperty(_)&&(c!=null||f!=null))switch(_){case"value":ot=c;break;case"defaultValue":ut=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(s(91));break;default:c!==f&&Ve(e,n,_,c,r,f)}ei(e,ot,ut);return;case"option":for(var kt in a)if(ot=a[kt],a.hasOwnProperty(kt)&&ot!=null&&!r.hasOwnProperty(kt))switch(kt){case"selected":e.selected=!1;break;default:Ve(e,n,kt,null,r,ot)}for(H in r)if(ot=r[H],ut=a[H],r.hasOwnProperty(H)&&ot!==ut&&(ot!=null||ut!=null))switch(H){case"selected":e.selected=ot&&typeof ot!="function"&&typeof ot!="symbol";break;default:Ve(e,n,H,ot,r,ut)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ee in a)ot=a[ee],a.hasOwnProperty(ee)&&ot!=null&&!r.hasOwnProperty(ee)&&Ve(e,n,ee,null,r,ot);for(nt in r)if(ot=r[nt],ut=a[nt],r.hasOwnProperty(nt)&&ot!==ut&&(ot!=null||ut!=null))switch(nt){case"children":case"dangerouslySetInnerHTML":if(ot!=null)throw Error(s(137,n));break;default:Ve(e,n,nt,ot,r,ut)}return;default:if(Ue(n)){for(var Xe in a)ot=a[Xe],a.hasOwnProperty(Xe)&&ot!==void 0&&!r.hasOwnProperty(Xe)&&ih(e,n,Xe,void 0,r,ot);for(mt in r)ot=r[mt],ut=a[mt],!r.hasOwnProperty(mt)||ot===ut||ot===void 0&&ut===void 0||ih(e,n,mt,ot,r,ut);return}}for(var Q in a)ot=a[Q],a.hasOwnProperty(Q)&&ot!=null&&!r.hasOwnProperty(Q)&&Ve(e,n,Q,null,r,ot);for(vt in r)ot=r[vt],ut=a[vt],!r.hasOwnProperty(vt)||ot===ut||ot==null&&ut==null||Ve(e,n,vt,ot,r,ut)}function L0(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function DS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),r=0;r<a.length;r++){var c=a[r],f=c.transferSize,_=c.initiatorType,R=c.duration;if(f&&R&&L0(_)){for(_=0,R=c.responseEnd,r+=1;r<a.length;r++){var H=a[r],nt=H.startTime;if(nt>R)break;var mt=H.transferSize,vt=H.initiatorType;mt&&L0(vt)&&(H=H.responseEnd,_+=mt*(H<R?1:(R-nt)/(H-nt)))}if(--r,n+=8*(f+_)/(c.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var ah=null,sh=null;function iu(e){return e.nodeType===9?e:e.ownerDocument}function O0(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function P0(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function rh(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var oh=null;function US(){var e=window.event;return e&&e.type==="popstate"?e===oh?!1:(oh=e,!0):(oh=null,!1)}var I0=typeof setTimeout=="function"?setTimeout:void 0,NS=typeof clearTimeout=="function"?clearTimeout:void 0,z0=typeof Promise=="function"?Promise:void 0,LS=typeof queueMicrotask=="function"?queueMicrotask:typeof z0<"u"?function(e){return z0.resolve(null).then(e).catch(OS)}:I0;function OS(e){setTimeout(function(){throw e})}function Wa(e){return e==="head"}function B0(e,n){var a=n,r=0;do{var c=a.nextSibling;if(e.removeChild(a),c&&c.nodeType===8)if(a=c.data,a==="/$"||a==="/&"){if(r===0){e.removeChild(c),vr(n);return}r--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")r++;else if(a==="html")Lo(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Lo(a);for(var f=a.firstChild;f;){var _=f.nextSibling,R=f.nodeName;f[ba]||R==="SCRIPT"||R==="STYLE"||R==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=_}}else a==="body"&&Lo(e.ownerDocument.body);a=c}while(a);vr(n)}function F0(e,n){var a=e;e=0;do{var r=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),r&&r.nodeType===8)if(a=r.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=r}while(a)}function lh(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":lh(a),Ta(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function PS(e,n,a,r){for(;e.nodeType===1;){var c=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(r){if(!e[ba])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==c.rel||e.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||e.getAttribute("title")!==(c.title==null?null:c.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(c.src==null?null:c.src)||e.getAttribute("type")!==(c.type==null?null:c.type)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var f=c.name==null?null:""+c.name;if(c.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=Mi(e.nextSibling),e===null)break}return null}function IS(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Mi(e.nextSibling),e===null))return null;return e}function H0(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Mi(e.nextSibling),e===null))return null;return e}function uh(e){return e.data==="$?"||e.data==="$~"}function ch(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function zS(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var r=function(){n(),a.removeEventListener("DOMContentLoaded",r)};a.addEventListener("DOMContentLoaded",r),e._reactRetry=r}}function Mi(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var fh=null;function G0(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return Mi(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function V0(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function X0(e,n,a){switch(n=iu(a),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function Lo(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Ta(e)}var yi=new Map,k0=new Set;function au(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ma=F.d;F.d={f:BS,r:FS,D:HS,C:GS,L:VS,m:XS,X:WS,S:kS,M:qS};function BS(){var e=ma.f(),n=Kl();return e||n}function FS(e){var n=ji(e);n!==null&&n.tag===5&&n.type==="form"?og(n):ma.r(e)}var mr=typeof document>"u"?null:document;function W0(e,n,a){var r=mr;if(r&&typeof n=="string"&&n){var c=Ie(n);c='link[rel="'+e+'"][href="'+c+'"]',typeof a=="string"&&(c+='[crossorigin="'+a+'"]'),k0.has(c)||(k0.add(c),e={rel:e,crossOrigin:a,href:n},r.querySelector(c)===null&&(n=r.createElement("link"),wn(n,"link",e),hn(n),r.head.appendChild(n)))}}function HS(e){ma.D(e),W0("dns-prefetch",e,null)}function GS(e,n){ma.C(e,n),W0("preconnect",e,n)}function VS(e,n,a){ma.L(e,n,a);var r=mr;if(r&&e&&n){var c='link[rel="preload"][as="'+Ie(n)+'"]';n==="image"&&a&&a.imageSrcSet?(c+='[imagesrcset="'+Ie(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(c+='[imagesizes="'+Ie(a.imageSizes)+'"]')):c+='[href="'+Ie(e)+'"]';var f=c;switch(n){case"style":f=gr(e);break;case"script":f=_r(e)}yi.has(f)||(e=x({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),yi.set(f,e),r.querySelector(c)!==null||n==="style"&&r.querySelector(Oo(f))||n==="script"&&r.querySelector(Po(f))||(n=r.createElement("link"),wn(n,"link",e),hn(n),r.head.appendChild(n)))}}function XS(e,n){ma.m(e,n);var a=mr;if(a&&e){var r=n&&typeof n.as=="string"?n.as:"script",c='link[rel="modulepreload"][as="'+Ie(r)+'"][href="'+Ie(e)+'"]',f=c;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=_r(e)}if(!yi.has(f)&&(e=x({rel:"modulepreload",href:e},n),yi.set(f,e),a.querySelector(c)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Po(f)))return}r=a.createElement("link"),wn(r,"link",e),hn(r),a.head.appendChild(r)}}}function kS(e,n,a){ma.S(e,n,a);var r=mr;if(r&&e){var c=Aa(r).hoistableStyles,f=gr(e);n=n||"default";var _=c.get(f);if(!_){var R={loading:0,preload:null};if(_=r.querySelector(Oo(f)))R.loading=5;else{e=x({rel:"stylesheet",href:e,"data-precedence":n},a),(a=yi.get(f))&&hh(e,a);var H=_=r.createElement("link");hn(H),wn(H,"link",e),H._p=new Promise(function(nt,mt){H.onload=nt,H.onerror=mt}),H.addEventListener("load",function(){R.loading|=1}),H.addEventListener("error",function(){R.loading|=2}),R.loading|=4,su(_,n,r)}_={type:"stylesheet",instance:_,count:1,state:R},c.set(f,_)}}}function WS(e,n){ma.X(e,n);var a=mr;if(a&&e){var r=Aa(a).hoistableScripts,c=_r(e),f=r.get(c);f||(f=a.querySelector(Po(c)),f||(e=x({src:e,async:!0},n),(n=yi.get(c))&&dh(e,n),f=a.createElement("script"),hn(f),wn(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},r.set(c,f))}}function qS(e,n){ma.M(e,n);var a=mr;if(a&&e){var r=Aa(a).hoistableScripts,c=_r(e),f=r.get(c);f||(f=a.querySelector(Po(c)),f||(e=x({src:e,async:!0,type:"module"},n),(n=yi.get(c))&&dh(e,n),f=a.createElement("script"),hn(f),wn(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},r.set(c,f))}}function q0(e,n,a,r){var c=(c=tt.current)?au(c):null;if(!c)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=gr(a.href),a=Aa(c).hoistableStyles,r=a.get(n),r||(r={type:"style",instance:null,count:0,state:null},a.set(n,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=gr(a.href);var f=Aa(c).hoistableStyles,_=f.get(e);if(_||(c=c.ownerDocument||c,_={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,_),(f=c.querySelector(Oo(e)))&&!f._p&&(_.instance=f,_.state.loading=5),yi.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},yi.set(e,a),f||YS(c,e,a,_.state))),n&&r===null)throw Error(s(528,""));return _}if(n&&r!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=_r(a),a=Aa(c).hoistableScripts,r=a.get(n),r||(r={type:"script",instance:null,count:0,state:null},a.set(n,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function gr(e){return'href="'+Ie(e)+'"'}function Oo(e){return'link[rel="stylesheet"]['+e+"]"}function Y0(e){return x({},e,{"data-precedence":e.precedence,precedence:null})}function YS(e,n,a,r){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?r.loading=1:(n=e.createElement("link"),r.preload=n,n.addEventListener("load",function(){return r.loading|=1}),n.addEventListener("error",function(){return r.loading|=2}),wn(n,"link",a),hn(n),e.head.appendChild(n))}function _r(e){return'[src="'+Ie(e)+'"]'}function Po(e){return"script[async]"+e}function Z0(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var r=e.querySelector('style[data-href~="'+Ie(a.href)+'"]');if(r)return n.instance=r,hn(r),r;var c=x({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement("style"),hn(r),wn(r,"style",c),su(r,a.precedence,e),n.instance=r;case"stylesheet":c=gr(a.href);var f=e.querySelector(Oo(c));if(f)return n.state.loading|=4,n.instance=f,hn(f),f;r=Y0(a),(c=yi.get(c))&&hh(r,c),f=(e.ownerDocument||e).createElement("link"),hn(f);var _=f;return _._p=new Promise(function(R,H){_.onload=R,_.onerror=H}),wn(f,"link",r),n.state.loading|=4,su(f,a.precedence,e),n.instance=f;case"script":return f=_r(a.src),(c=e.querySelector(Po(f)))?(n.instance=c,hn(c),c):(r=a,(c=yi.get(f))&&(r=x({},a),dh(r,c)),e=e.ownerDocument||e,c=e.createElement("script"),hn(c),wn(c,"link",r),e.head.appendChild(c),n.instance=c);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(r=n.instance,n.state.loading|=4,su(r,a.precedence,e));return n.instance}function su(e,n,a){for(var r=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=r.length?r[r.length-1]:null,f=c,_=0;_<r.length;_++){var R=r[_];if(R.dataset.precedence===n)f=R;else if(f!==c)break}f?f.parentNode.insertBefore(e,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function hh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function dh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var ru=null;function K0(e,n,a){if(ru===null){var r=new Map,c=ru=new Map;c.set(a,r)}else c=ru,r=c.get(a),r||(r=new Map,c.set(a,r));if(r.has(e))return r;for(r.set(e,null),a=a.getElementsByTagName(e),c=0;c<a.length;c++){var f=a[c];if(!(f[ba]||f[fn]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var _=f.getAttribute(n)||"";_=e+_;var R=r.get(_);R?R.push(f):r.set(_,[f])}}return r}function Q0(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function ZS(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function J0(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function KS(e,n,a,r){if(a.type==="stylesheet"&&(typeof r.media!="string"||matchMedia(r.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var c=gr(r.href),f=n.querySelector(Oo(c));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=ou.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=f,hn(f);return}f=n.ownerDocument||n,r=Y0(r),(c=yi.get(c))&&hh(r,c),f=f.createElement("link"),hn(f);var _=f;_._p=new Promise(function(R,H){_.onload=R,_.onerror=H}),wn(f,"link",r),a.instance=f}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=ou.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var ph=0;function QS(e,n){return e.stylesheets&&e.count===0&&uu(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var r=setTimeout(function(){if(e.stylesheets&&uu(e,e.stylesheets),e.unsuspend){var f=e.unsuspend;e.unsuspend=null,f()}},6e4+n);0<e.imgBytes&&ph===0&&(ph=62500*DS());var c=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&uu(e,e.stylesheets),e.unsuspend)){var f=e.unsuspend;e.unsuspend=null,f()}},(e.imgBytes>ph?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(c)}}:null}function ou(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)uu(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var lu=null;function uu(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,lu=new Map,n.forEach(JS,e),lu=null,ou.call(e))}function JS(e,n){if(!(n.state.loading&4)){var a=lu.get(e);if(a)var r=a.get(null);else{a=new Map,lu.set(e,a);for(var c=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<c.length;f++){var _=c[f];(_.nodeName==="LINK"||_.getAttribute("media")!=="not all")&&(a.set(_.dataset.precedence,_),r=_)}r&&a.set(null,r)}c=n.instance,_=c.getAttribute("data-precedence"),f=a.get(_)||r,f===r&&a.set(null,c),a.set(_,c),this.count++,r=ou.bind(this),c.addEventListener("load",r),c.addEventListener("error",r),f?f.parentNode.insertBefore(c,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(c,e.firstChild)),n.state.loading|=4}}var Io={$$typeof:z,Provider:null,Consumer:null,_currentValue:$,_currentValue2:$,_threadCount:0};function jS(e,n,a,r,c,f,_,R,H){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Wt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Wt(0),this.hiddenUpdates=Wt(null),this.identifierPrefix=r,this.onUncaughtError=c,this.onCaughtError=f,this.onRecoverableError=_,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=H,this.incompleteTransitions=new Map}function j0(e,n,a,r,c,f,_,R,H,nt,mt,vt){return e=new jS(e,n,a,_,H,nt,mt,vt,R),n=1,f===!0&&(n|=24),f=ai(3,null,null,n),e.current=f,f.stateNode=e,n=qc(),n.refCount++,e.pooledCache=n,n.refCount++,f.memoizedState={element:r,isDehydrated:a,cache:n},Qc(f),e}function $0(e){return e?(e=Zs,e):Zs}function t_(e,n,a,r,c,f){c=$0(c),r.context===null?r.context=c:r.pendingContext=c,r=Oa(n),r.payload={element:a},f=f===void 0?null:f,f!==null&&(r.callback=f),a=Pa(e,r,n),a!==null&&(Kn(a,e,n),po(a,e,n))}function e_(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function mh(e,n){e_(e,n),(e=e.alternate)&&e_(e,n)}function n_(e){if(e.tag===13||e.tag===31){var n=ms(e,67108864);n!==null&&Kn(n,e,67108864),mh(e,67108864)}}function i_(e){if(e.tag===13||e.tag===31){var n=ui();n=Kr(n);var a=ms(e,n);a!==null&&Kn(a,e,n),mh(e,n)}}var cu=!0;function $S(e,n,a,r){var c=B.T;B.T=null;var f=F.p;try{F.p=2,gh(e,n,a,r)}finally{F.p=f,B.T=c}}function tM(e,n,a,r){var c=B.T;B.T=null;var f=F.p;try{F.p=8,gh(e,n,a,r)}finally{F.p=f,B.T=c}}function gh(e,n,a,r){if(cu){var c=_h(r);if(c===null)nh(e,n,r,fu,a),s_(e,r);else if(nM(c,e,n,a,r))r.stopPropagation();else if(s_(e,r),n&4&&-1<eM.indexOf(e)){for(;c!==null;){var f=ji(c);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var _=At(f.pendingLanes);if(_!==0){var R=f;for(R.pendingLanes|=2,R.entangledLanes|=2;_;){var H=1<<31-Bt(_);R.entanglements[1]|=H,_&=~H}Gi(f),(we&6)===0&&(Yl=De()+500,Do(0))}}break;case 31:case 13:R=ms(f,2),R!==null&&Kn(R,f,2),Kl(),mh(f,2)}if(f=_h(r),f===null&&nh(e,n,r,fu,a),f===c)break;c=f}c!==null&&r.stopPropagation()}else nh(e,n,r,null,a)}}function _h(e){return e=vc(e),vh(e)}var fu=null;function vh(e){if(fu=null,e=Ji(e),e!==null){var n=u(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=h(n),e!==null)return e;e=null}else if(a===31){if(e=d(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return fu=e,null}function a_(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ee()){case O:return 2;case M:return 8;case J:case st:return 32;case ft:return 268435456;default:return 32}default:return 32}}var xh=!1,qa=null,Ya=null,Za=null,zo=new Map,Bo=new Map,Ka=[],eM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function s_(e,n){switch(e){case"focusin":case"focusout":qa=null;break;case"dragenter":case"dragleave":Ya=null;break;case"mouseover":case"mouseout":Za=null;break;case"pointerover":case"pointerout":zo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Bo.delete(n.pointerId)}}function Fo(e,n,a,r,c,f){return e===null||e.nativeEvent!==f?(e={blockedOn:n,domEventName:a,eventSystemFlags:r,nativeEvent:f,targetContainers:[c]},n!==null&&(n=ji(n),n!==null&&n_(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,c!==null&&n.indexOf(c)===-1&&n.push(c),e)}function nM(e,n,a,r,c){switch(n){case"focusin":return qa=Fo(qa,e,n,a,r,c),!0;case"dragenter":return Ya=Fo(Ya,e,n,a,r,c),!0;case"mouseover":return Za=Fo(Za,e,n,a,r,c),!0;case"pointerover":var f=c.pointerId;return zo.set(f,Fo(zo.get(f)||null,e,n,a,r,c)),!0;case"gotpointercapture":return f=c.pointerId,Bo.set(f,Fo(Bo.get(f)||null,e,n,a,r,c)),!0}return!1}function r_(e){var n=Ji(e.target);if(n!==null){var a=u(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){e.blockedOn=n,Gs(e.priority,function(){i_(a)});return}}else if(n===31){if(n=d(a),n!==null){e.blockedOn=n,Gs(e.priority,function(){i_(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function hu(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=_h(e.nativeEvent);if(a===null){a=e.nativeEvent;var r=new a.constructor(a.type,a);_c=r,a.target.dispatchEvent(r),_c=null}else return n=ji(a),n!==null&&n_(n),e.blockedOn=a,!1;n.shift()}return!0}function o_(e,n,a){hu(e)&&a.delete(n)}function iM(){xh=!1,qa!==null&&hu(qa)&&(qa=null),Ya!==null&&hu(Ya)&&(Ya=null),Za!==null&&hu(Za)&&(Za=null),zo.forEach(o_),Bo.forEach(o_)}function du(e,n){e.blockedOn===n&&(e.blockedOn=null,xh||(xh=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,iM)))}var pu=null;function l_(e){pu!==e&&(pu=e,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){pu===e&&(pu=null);for(var n=0;n<e.length;n+=3){var a=e[n],r=e[n+1],c=e[n+2];if(typeof r!="function"){if(vh(r||a)===null)continue;break}var f=ji(a);f!==null&&(e.splice(n,3),n-=3,_f(f,{pending:!0,data:c,method:a.method,action:r},r,c))}}))}function vr(e){function n(H){return du(H,e)}qa!==null&&du(qa,e),Ya!==null&&du(Ya,e),Za!==null&&du(Za,e),zo.forEach(n),Bo.forEach(n);for(var a=0;a<Ka.length;a++){var r=Ka[a];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Ka.length&&(a=Ka[0],a.blockedOn===null);)r_(a),a.blockedOn===null&&Ka.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(r=0;r<a.length;r+=3){var c=a[r],f=a[r+1],_=c[Tn]||null;if(typeof f=="function")_||l_(a);else if(_){var R=null;if(f&&f.hasAttribute("formAction")){if(c=f,_=f[Tn]||null)R=_.formAction;else if(vh(c)!==null)continue}else R=_.action;typeof R=="function"?a[r+1]=R:(a.splice(r,3),r-=3),l_(a)}}}function u_(){function e(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(_){return c=_})},focusReset:"manual",scroll:"manual"})}function n(){c!==null&&(c(),c=null),r||setTimeout(a,20)}function a(){if(!r&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var r=!1,c=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){r=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),c!==null&&(c(),c=null)}}}function Sh(e){this._internalRoot=e}mu.prototype.render=Sh.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,r=ui();t_(a,r,e,n,null,null)},mu.prototype.unmount=Sh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;t_(e.current,2,null,e,null,null),Kl(),n[Xn]=null}};function mu(e){this._internalRoot=e}mu.prototype.unstable_scheduleHydration=function(e){if(e){var n=Jr();e={blockedOn:null,target:e,priority:n};for(var a=0;a<Ka.length&&n!==0&&n<Ka[a].priority;a++);Ka.splice(a,0,e),a===0&&r_(e)}};var c_=t.version;if(c_!=="19.2.7")throw Error(s(527,c_,"19.2.7"));F.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=p(n),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var aM={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:B,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var gu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!gu.isDisabled&&gu.supportsFiber)try{ht=gu.inject(aM),dt=gu}catch{}}return Go.createRoot=function(e,n){if(!l(e))throw Error(s(299));var a=!1,r="",c=_g,f=vg,_=xg;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(c=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(_=n.onRecoverableError)),n=j0(e,1,!1,null,null,a,r,null,c,f,_,u_),e[Xn]=n.current,eh(e),new Sh(n)},Go.hydrateRoot=function(e,n,a){if(!l(e))throw Error(s(299));var r=!1,c="",f=_g,_=vg,R=xg,H=null;return a!=null&&(a.unstable_strictMode===!0&&(r=!0),a.identifierPrefix!==void 0&&(c=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(_=a.onCaughtError),a.onRecoverableError!==void 0&&(R=a.onRecoverableError),a.formState!==void 0&&(H=a.formState)),n=j0(e,1,!0,n,a??null,r,c,H,f,_,R,u_),n.context=$0(null),a=n.current,r=ui(),r=Kr(r),c=Oa(r),c.callback=null,Pa(a,c,r),a=r,n.current.lanes=a,Gt(n,a),Gi(n),e[Xn]=n.current,eh(e),new mu(n)},Go.version="19.2.7",Go}var S_;function pM(){if(S_)return yh.exports;S_=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(t){console.error(t)}}return o(),yh.exports=dM(),yh.exports}var mM=pM(),_u=tp();const ep="185",gM=0,M_=1,_M=2,Yu=1,vM=2,jo=3,rs=0,Jn=1,Li=2,Zi=0,zr=1,tc=2,y_=3,E_=4,xM=5,Ls=100,SM=101,MM=102,yM=103,EM=104,bM=200,TM=201,AM=202,RM=203,ld=204,ud=205,CM=206,wM=207,DM=208,UM=209,NM=210,LM=211,OM=212,PM=213,IM=214,cd=0,fd=1,hd=2,Hr=3,dd=4,pd=5,md=6,gd=7,Rv=0,zM=1,BM=2,Ki=0,np=1,ip=2,ap=3,cc=4,sp=5,rp=6,op=7,Cv=300,Bs=301,Gr=302,Rh=303,Ch=304,fc=306,_d=1e3,Ma=1001,vd=1002,Dn=1003,FM=1004,vu=1005,vn=1006,wh=1007,Ps=1008,di=1009,wv=1010,Dv=1011,tl=1012,lp=1013,Qi=1014,qi=1015,pi=1016,up=1017,cp=1018,el=1020,Uv=35902,Nv=35899,Lv=1021,Ov=1022,Oi=1023,Ea=1026,Is=1027,Pv=1028,fp=1029,Fs=1030,hp=1031,dp=1033,Zu=33776,Ku=33777,Qu=33778,Ju=33779,xd=35840,Sd=35841,Md=35842,yd=35843,Ed=36196,bd=37492,Td=37496,Ad=37488,Rd=37489,ec=37490,Cd=37491,wd=37808,Dd=37809,Ud=37810,Nd=37811,Ld=37812,Od=37813,Pd=37814,Id=37815,zd=37816,Bd=37817,Fd=37818,Hd=37819,Gd=37820,Vd=37821,Xd=36492,kd=36494,Wd=36495,qd=36283,Yd=36284,nc=36285,Zd=36286,HM=3200,Kd=0,GM=1,is="",Qn="srgb",ic="srgb-linear",ac="linear",Ne="srgb",xr=7680,b_=519,VM=512,XM=513,kM=514,pp=515,WM=516,qM=517,mp=518,YM=519,Qd=35044,T_="300 es",Yi=2e3,nl=2001;function ZM(o){for(let t=o.length-1;t>=0;--t)if(o[t]>=65535)return!0;return!1}function sc(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function KM(){const o=sc("canvas");return o.style.display="block",o}const A_={};function rc(...o){const t="THREE."+o.shift();console.log(t,...o)}function Iv(o){const t=o[0];if(typeof t=="string"&&t.startsWith("TSL:")){const i=o[1];i&&i.isStackTrace?o[0]+=" "+i.getLocation():o[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return o}function ie(...o){o=Iv(o);const t="THREE."+o.shift();{const i=o[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...o)}}function be(...o){o=Iv(o);const t="THREE."+o.shift();{const i=o[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...o)}}function Br(...o){const t=o.join(" ");t in A_||(A_[t]=!0,ie(...o))}function QM(o,t,i){return new Promise(function(s,l){function u(){switch(o.clientWaitSync(t,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:l();break;case o.TIMEOUT_EXPIRED:setTimeout(u,i);break;default:s()}}setTimeout(u,i)})}const JM={[cd]:fd,[hd]:md,[dd]:gd,[Hr]:pd,[fd]:cd,[md]:hd,[gd]:dd,[pd]:Hr};class Hs{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(i)===-1&&s[t].push(i)}hasEventListener(t,i){const s=this._listeners;return s===void 0?!1:s[t]!==void 0&&s[t].indexOf(i)!==-1}removeEventListener(t,i){const s=this._listeners;if(s===void 0)return;const l=s[t];if(l!==void 0){const u=l.indexOf(i);u!==-1&&l.splice(u,1)}}dispatchEvent(t){const i=this._listeners;if(i===void 0)return;const s=i[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let u=0,h=l.length;u<h;u++)l[u].call(this,t);t.target=null}}}const On=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Dh=Math.PI/180,Jd=180/Math.PI;function ss(){const o=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(On[o&255]+On[o>>8&255]+On[o>>16&255]+On[o>>24&255]+"-"+On[t&255]+On[t>>8&255]+"-"+On[t>>16&15|64]+On[t>>24&255]+"-"+On[i&63|128]+On[i>>8&255]+"-"+On[i>>16&255]+On[i>>24&255]+On[s&255]+On[s>>8&255]+On[s>>16&255]+On[s>>24&255]).toLowerCase()}function ye(o,t,i){return Math.max(t,Math.min(i,o))}function jM(o,t){return(o%t+t)%t}function Uh(o,t,i){return(1-i)*o+i*t}function Wi(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ke(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Cp=class Cp{constructor(t=0,i=0){this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,s=this.y,l=t.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=ye(this.x,t.x,i.x),this.y=ye(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=ye(this.x,t,i),this.y=ye(this.y,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ye(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(ye(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y;return i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const s=Math.cos(i),l=Math.sin(i),u=this.x-t.x,h=this.y-t.y;return this.x=u*s-h*l+t.x,this.y=u*l+h*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Cp.prototype.isVector2=!0;let Zt=Cp;class Wr{constructor(t=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=s,this._w=l}static slerpFlat(t,i,s,l,u,h,d){let m=s[l+0],p=s[l+1],v=s[l+2],x=s[l+3],g=u[h+0],E=u[h+1],T=u[h+2],D=u[h+3];if(x!==D||m!==g||p!==E||v!==T){let y=m*g+p*E+v*T+x*D;y<0&&(g=-g,E=-E,T=-T,D=-D,y=-y);let S=1-d;if(y<.9995){const L=Math.acos(y),z=Math.sin(L);S=Math.sin(S*L)/z,d=Math.sin(d*L)/z,m=m*S+g*d,p=p*S+E*d,v=v*S+T*d,x=x*S+D*d}else{m=m*S+g*d,p=p*S+E*d,v=v*S+T*d,x=x*S+D*d;const L=1/Math.sqrt(m*m+p*p+v*v+x*x);m*=L,p*=L,v*=L,x*=L}}t[i]=m,t[i+1]=p,t[i+2]=v,t[i+3]=x}static multiplyQuaternionsFlat(t,i,s,l,u,h){const d=s[l],m=s[l+1],p=s[l+2],v=s[l+3],x=u[h],g=u[h+1],E=u[h+2],T=u[h+3];return t[i]=d*T+v*x+m*E-p*g,t[i+1]=m*T+v*g+p*x-d*E,t[i+2]=p*T+v*E+d*g-m*x,t[i+3]=v*T-d*x-m*g-p*E,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,s,l){return this._x=t,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const s=t._x,l=t._y,u=t._z,h=t._order,d=Math.cos,m=Math.sin,p=d(s/2),v=d(l/2),x=d(u/2),g=m(s/2),E=m(l/2),T=m(u/2);switch(h){case"XYZ":this._x=g*v*x+p*E*T,this._y=p*E*x-g*v*T,this._z=p*v*T+g*E*x,this._w=p*v*x-g*E*T;break;case"YXZ":this._x=g*v*x+p*E*T,this._y=p*E*x-g*v*T,this._z=p*v*T-g*E*x,this._w=p*v*x+g*E*T;break;case"ZXY":this._x=g*v*x-p*E*T,this._y=p*E*x+g*v*T,this._z=p*v*T+g*E*x,this._w=p*v*x-g*E*T;break;case"ZYX":this._x=g*v*x-p*E*T,this._y=p*E*x+g*v*T,this._z=p*v*T-g*E*x,this._w=p*v*x+g*E*T;break;case"YZX":this._x=g*v*x+p*E*T,this._y=p*E*x+g*v*T,this._z=p*v*T-g*E*x,this._w=p*v*x-g*E*T;break;case"XZY":this._x=g*v*x-p*E*T,this._y=p*E*x-g*v*T,this._z=p*v*T+g*E*x,this._w=p*v*x+g*E*T;break;default:ie("Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const s=i/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,s=i[0],l=i[4],u=i[8],h=i[1],d=i[5],m=i[9],p=i[2],v=i[6],x=i[10],g=s+d+x;if(g>0){const E=.5/Math.sqrt(g+1);this._w=.25/E,this._x=(v-m)*E,this._y=(u-p)*E,this._z=(h-l)*E}else if(s>d&&s>x){const E=2*Math.sqrt(1+s-d-x);this._w=(v-m)/E,this._x=.25*E,this._y=(l+h)/E,this._z=(u+p)/E}else if(d>x){const E=2*Math.sqrt(1+d-s-x);this._w=(u-p)/E,this._x=(l+h)/E,this._y=.25*E,this._z=(m+v)/E}else{const E=2*Math.sqrt(1+x-s-d);this._w=(h-l)/E,this._x=(u+p)/E,this._y=(m+v)/E,this._z=.25*E}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let s=t.dot(i)+1;return s<1e-8?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ye(this.dot(t),-1,1)))}rotateTowards(t,i){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const s=t._x,l=t._y,u=t._z,h=t._w,d=i._x,m=i._y,p=i._z,v=i._w;return this._x=s*v+h*d+l*p-u*m,this._y=l*v+h*m+u*d-s*p,this._z=u*v+h*p+s*m-l*d,this._w=h*v-s*d-l*m-u*p,this._onChangeCallback(),this}slerp(t,i){let s=t._x,l=t._y,u=t._z,h=t._w,d=this.dot(t);d<0&&(s=-s,l=-l,u=-u,h=-h,d=-d);let m=1-i;if(d<.9995){const p=Math.acos(d),v=Math.sin(p);m=Math.sin(m*p)/v,i=Math.sin(i*p)/v,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+u*i,this._w=this._w*m+h*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+u*i,this._w=this._w*m+h*i,this.normalize();return this}slerpQuaternions(t,i,s){return this.copy(t).slerp(i,s)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),u=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),u*Math.sin(i),u*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const wp=class wp{constructor(t=0,i=0,s=0){this.x=t,this.y=i,this.z=s}set(t,i,s){return s===void 0&&(s=this.z),this.x=t,this.y=i,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(R_.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(R_.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,s=this.y,l=this.z,u=t.elements;return this.x=u[0]*i+u[3]*s+u[6]*l,this.y=u[1]*i+u[4]*s+u[7]*l,this.z=u[2]*i+u[5]*s+u[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,u=t.elements,h=1/(u[3]*i+u[7]*s+u[11]*l+u[15]);return this.x=(u[0]*i+u[4]*s+u[8]*l+u[12])*h,this.y=(u[1]*i+u[5]*s+u[9]*l+u[13])*h,this.z=(u[2]*i+u[6]*s+u[10]*l+u[14])*h,this}applyQuaternion(t){const i=this.x,s=this.y,l=this.z,u=t.x,h=t.y,d=t.z,m=t.w,p=2*(h*l-d*s),v=2*(d*i-u*l),x=2*(u*s-h*i);return this.x=i+m*p+h*x-d*v,this.y=s+m*v+d*p-u*x,this.z=l+m*x+u*v-h*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,s=this.y,l=this.z,u=t.elements;return this.x=u[0]*i+u[4]*s+u[8]*l,this.y=u[1]*i+u[5]*s+u[9]*l,this.z=u[2]*i+u[6]*s+u[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=ye(this.x,t.x,i.x),this.y=ye(this.y,t.y,i.y),this.z=ye(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=ye(this.x,t,i),this.y=ye(this.y,t,i),this.z=ye(this.z,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ye(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const s=t.x,l=t.y,u=t.z,h=i.x,d=i.y,m=i.z;return this.x=l*m-u*d,this.y=u*h-s*m,this.z=s*d-l*h,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const s=t.dot(this)/i;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return Nh.copy(this).projectOnVector(t),this.sub(Nh)}reflect(t){return this.sub(Nh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(ye(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return i*i+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){const l=Math.sin(i)*t;return this.x=l*Math.sin(s),this.y=Math.cos(i)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(t),this.y=i,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};wp.prototype.isVector3=!0;let K=wp;const Nh=new K,R_=new Wr,Dp=class Dp{constructor(t,i,s,l,u,h,d,m,p){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,s,l,u,h,d,m,p)}set(t,i,s,l,u,h,d,m,p){const v=this.elements;return v[0]=t,v[1]=l,v[2]=d,v[3]=i,v[4]=u,v[5]=m,v[6]=s,v[7]=h,v[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(t,i,s){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,u=this.elements,h=s[0],d=s[3],m=s[6],p=s[1],v=s[4],x=s[7],g=s[2],E=s[5],T=s[8],D=l[0],y=l[3],S=l[6],L=l[1],z=l[4],C=l[7],I=l[2],w=l[5],P=l[8];return u[0]=h*D+d*L+m*I,u[3]=h*y+d*z+m*w,u[6]=h*S+d*C+m*P,u[1]=p*D+v*L+x*I,u[4]=p*y+v*z+x*w,u[7]=p*S+v*C+x*P,u[2]=g*D+E*L+T*I,u[5]=g*y+E*z+T*w,u[8]=g*S+E*C+T*P,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[1],l=t[2],u=t[3],h=t[4],d=t[5],m=t[6],p=t[7],v=t[8];return i*h*v-i*d*p-s*u*v+s*d*m+l*u*p-l*h*m}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],u=t[3],h=t[4],d=t[5],m=t[6],p=t[7],v=t[8],x=v*h-d*p,g=d*m-v*u,E=p*u-h*m,T=i*x+s*g+l*E;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const D=1/T;return t[0]=x*D,t[1]=(l*p-v*s)*D,t[2]=(d*s-l*h)*D,t[3]=g*D,t[4]=(v*i-l*m)*D,t[5]=(l*u-d*i)*D,t[6]=E*D,t[7]=(s*m-p*i)*D,t[8]=(h*i-s*u)*D,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,s,l,u,h,d){const m=Math.cos(u),p=Math.sin(u);return this.set(s*m,s*p,-s*(m*h+p*d)+h+t,-l*p,l*m,-l*(-p*h+m*d)+d+i,0,0,1),this}scale(t,i){return Br("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Lh.makeScale(t,i)),this}rotate(t){return Br("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Lh.makeRotation(-t)),this}translate(t,i){return Br("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Lh.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<9;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Dp.prototype.isMatrix3=!0;let se=Dp;const Lh=new se,C_=new se().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),w_=new se().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $M(){const o={enabled:!0,workingColorSpace:ic,spaces:{},convert:function(l,u,h){return this.enabled===!1||u===h||!u||!h||(this.spaces[u].transfer===Ne&&(l.r=ya(l.r),l.g=ya(l.g),l.b=ya(l.b)),this.spaces[u].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[u].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Ne&&(l.r=Fr(l.r),l.g=Fr(l.g),l.b=Fr(l.b))),l},workingToColorSpace:function(l,u){return this.convert(l,this.workingColorSpace,u)},colorSpaceToWorking:function(l,u){return this.convert(l,u,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===is?ac:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,u=this.workingColorSpace){return l.fromArray(this.spaces[u].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,u,h){return l.copy(this.spaces[u].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,u){return Br("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),o.workingToColorSpace(l,u)},toWorkingColorSpace:function(l,u){return Br("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),o.colorSpaceToWorking(l,u)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return o.define({[ic]:{primaries:t,whitePoint:s,transfer:ac,toXYZ:C_,fromXYZ:w_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Qn},outputColorSpaceConfig:{drawingBufferColorSpace:Qn}},[Qn]:{primaries:t,whitePoint:s,transfer:Ne,toXYZ:C_,fromXYZ:w_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Qn}}}),o}const Se=$M();function ya(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function Fr(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let Sr;class ty{static getDataURL(t,i="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let s;if(t instanceof HTMLCanvasElement)s=t;else{Sr===void 0&&(Sr=sc("canvas")),Sr.width=t.width,Sr.height=t.height;const l=Sr.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),s=Sr}return s.toDataURL(i)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=sc("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),u=l.data;for(let h=0;h<u.length;h++)u[h]=ya(u[h]/255)*255;return s.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(ya(i[s]/255)*255):i[s]=ya(i[s]);return{data:i,width:t.width,height:t.height}}else return ie("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ey=0;class gp{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ey++}),this.uuid=ss(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?t.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?t.set(i.displayWidth,i.displayHeight,0):i!==null?t.set(i.width,i.height,i.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let u;if(Array.isArray(l)){u=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?u.push(Oh(l[h].image)):u.push(Oh(l[h]))}else u=Oh(l);s.url=u}return i||(t.images[this.uuid]=s),s}}function Oh(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?ty.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(ie("Texture: Unable to serialize Texture."),{})}let ny=0;const Ph=new K;class zn extends Hs{constructor(t=zn.DEFAULT_IMAGE,i=zn.DEFAULT_MAPPING,s=Ma,l=Ma,u=vn,h=Ps,d=Oi,m=di,p=zn.DEFAULT_ANISOTROPY,v=is){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ny++}),this.uuid=ss(),this.name="",this.source=new gp(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=u,this.minFilter=h,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new Zt(0,0),this.repeat=new Zt(1,1),this.center=new Zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new se,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ph).x}get height(){return this.source.getSize(Ph).y}get depth(){return this.source.getSize(Ph).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const i in t){const s=t[i];if(s===void 0){ie(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ie(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Cv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _d:t.x=t.x-Math.floor(t.x);break;case Ma:t.x=t.x<0?0:1;break;case vd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _d:t.y=t.y-Math.floor(t.y);break;case Ma:t.y=t.y<0?0:1;break;case vd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}zn.DEFAULT_IMAGE=null;zn.DEFAULT_MAPPING=Cv;zn.DEFAULT_ANISOTROPY=1;const Up=class Up{constructor(t=0,i=0,s=0,l=1){this.x=t,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,s,l){return this.x=t,this.y=i,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,u=this.w,h=t.elements;return this.x=h[0]*i+h[4]*s+h[8]*l+h[12]*u,this.y=h[1]*i+h[5]*s+h[9]*l+h[13]*u,this.z=h[2]*i+h[6]*s+h[10]*l+h[14]*u,this.w=h[3]*i+h[7]*s+h[11]*l+h[15]*u,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,s,l,u;const m=t.elements,p=m[0],v=m[4],x=m[8],g=m[1],E=m[5],T=m[9],D=m[2],y=m[6],S=m[10];if(Math.abs(v-g)<.01&&Math.abs(x-D)<.01&&Math.abs(T-y)<.01){if(Math.abs(v+g)<.1&&Math.abs(x+D)<.1&&Math.abs(T+y)<.1&&Math.abs(p+E+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const z=(p+1)/2,C=(E+1)/2,I=(S+1)/2,w=(v+g)/4,P=(x+D)/4,b=(T+y)/4;return z>C&&z>I?z<.01?(s=0,l=.707106781,u=.707106781):(s=Math.sqrt(z),l=w/s,u=P/s):C>I?C<.01?(s=.707106781,l=0,u=.707106781):(l=Math.sqrt(C),s=w/l,u=b/l):I<.01?(s=.707106781,l=.707106781,u=0):(u=Math.sqrt(I),s=P/u,l=b/u),this.set(s,l,u,i),this}let L=Math.sqrt((y-T)*(y-T)+(x-D)*(x-D)+(g-v)*(g-v));return Math.abs(L)<.001&&(L=1),this.x=(y-T)/L,this.y=(x-D)/L,this.z=(g-v)/L,this.w=Math.acos((p+E+S-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=ye(this.x,t.x,i.x),this.y=ye(this.y,t.y,i.y),this.z=ye(this.z,t.z,i.z),this.w=ye(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=ye(this.x,t,i),this.y=ye(this.y,t,i),this.z=ye(this.z,t,i),this.w=ye(this.w,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ye(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Up.prototype.isVector4=!0;let an=Up;class iy extends Hs{constructor(t=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},s),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=s.depth,this.scissor=new an(0,0,t,i),this.scissorTest=!1,this.viewport=new an(0,0,t,i),this.textures=[];const l={width:t,height:i,depth:s.depth},u=new zn(l),h=s.count;for(let d=0;d<h;d++)this.textures[d]=u.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview,this.useArrayDepthTexture=s.useArrayDepthTexture}_setTextureOptions(t={}){const i={minFilter:vn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(i.mapping=t.mapping),t.wrapS!==void 0&&(i.wrapS=t.wrapS),t.wrapT!==void 0&&(i.wrapT=t.wrapT),t.wrapR!==void 0&&(i.wrapR=t.wrapR),t.magFilter!==void 0&&(i.magFilter=t.magFilter),t.minFilter!==void 0&&(i.minFilter=t.minFilter),t.format!==void 0&&(i.format=t.format),t.type!==void 0&&(i.type=t.type),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(i.colorSpace=t.colorSpace),t.flipY!==void 0&&(i.flipY=t.flipY),t.generateMipmaps!==void 0&&(i.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(i.internalFormat=t.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,s=1){if(this.width!==t||this.height!==i||this.depth!==s){this.width=t,this.height=i,this.depth=s;for(let l=0,u=this.textures.length;l<u;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++){this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},t.textures[i].image);this.textures[i].source=new gp(l)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class jn extends iy{constructor(t=1,i=1,s={}){super(t,i,s),this.isWebGLRenderTarget=!0}}class zv extends zn{constructor(t=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Dn,this.minFilter=Dn,this.wrapR=Ma,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ay extends zn{constructor(t=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Dn,this.minFilter=Dn,this.wrapR=Ma,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const uc=class uc{constructor(t,i,s,l,u,h,d,m,p,v,x,g,E,T,D,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,s,l,u,h,d,m,p,v,x,g,E,T,D,y)}set(t,i,s,l,u,h,d,m,p,v,x,g,E,T,D,y){const S=this.elements;return S[0]=t,S[4]=i,S[8]=s,S[12]=l,S[1]=u,S[5]=h,S[9]=d,S[13]=m,S[2]=p,S[6]=v,S[10]=x,S[14]=g,S[3]=E,S[7]=T,S[11]=D,S[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new uc().fromArray(this.elements)}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(t){const i=this.elements,s=t.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,s){return this.determinantAffine()===0?(t.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(t,i,s){return this.set(t.x,i.x,s.x,0,t.y,i.y,s.y,0,t.z,i.z,s.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const i=this.elements,s=t.elements,l=1/Mr.setFromMatrixColumn(t,0).length(),u=1/Mr.setFromMatrixColumn(t,1).length(),h=1/Mr.setFromMatrixColumn(t,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*u,i[5]=s[5]*u,i[6]=s[6]*u,i[7]=0,i[8]=s[8]*h,i[9]=s[9]*h,i[10]=s[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,s=t.x,l=t.y,u=t.z,h=Math.cos(s),d=Math.sin(s),m=Math.cos(l),p=Math.sin(l),v=Math.cos(u),x=Math.sin(u);if(t.order==="XYZ"){const g=h*v,E=h*x,T=d*v,D=d*x;i[0]=m*v,i[4]=-m*x,i[8]=p,i[1]=E+T*p,i[5]=g-D*p,i[9]=-d*m,i[2]=D-g*p,i[6]=T+E*p,i[10]=h*m}else if(t.order==="YXZ"){const g=m*v,E=m*x,T=p*v,D=p*x;i[0]=g+D*d,i[4]=T*d-E,i[8]=h*p,i[1]=h*x,i[5]=h*v,i[9]=-d,i[2]=E*d-T,i[6]=D+g*d,i[10]=h*m}else if(t.order==="ZXY"){const g=m*v,E=m*x,T=p*v,D=p*x;i[0]=g-D*d,i[4]=-h*x,i[8]=T+E*d,i[1]=E+T*d,i[5]=h*v,i[9]=D-g*d,i[2]=-h*p,i[6]=d,i[10]=h*m}else if(t.order==="ZYX"){const g=h*v,E=h*x,T=d*v,D=d*x;i[0]=m*v,i[4]=T*p-E,i[8]=g*p+D,i[1]=m*x,i[5]=D*p+g,i[9]=E*p-T,i[2]=-p,i[6]=d*m,i[10]=h*m}else if(t.order==="YZX"){const g=h*m,E=h*p,T=d*m,D=d*p;i[0]=m*v,i[4]=D-g*x,i[8]=T*x+E,i[1]=x,i[5]=h*v,i[9]=-d*v,i[2]=-p*v,i[6]=E*x+T,i[10]=g-D*x}else if(t.order==="XZY"){const g=h*m,E=h*p,T=d*m,D=d*p;i[0]=m*v,i[4]=-x,i[8]=p*v,i[1]=g*x+D,i[5]=h*v,i[9]=E*x-T,i[2]=T*x-E,i[6]=d*v,i[10]=D*x+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(sy,t,ry)}lookAt(t,i,s){const l=this.elements;return ci.subVectors(t,i),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),Ja.crossVectors(s,ci),Ja.lengthSq()===0&&(Math.abs(s.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),Ja.crossVectors(s,ci)),Ja.normalize(),xu.crossVectors(ci,Ja),l[0]=Ja.x,l[4]=xu.x,l[8]=ci.x,l[1]=Ja.y,l[5]=xu.y,l[9]=ci.y,l[2]=Ja.z,l[6]=xu.z,l[10]=ci.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,u=this.elements,h=s[0],d=s[4],m=s[8],p=s[12],v=s[1],x=s[5],g=s[9],E=s[13],T=s[2],D=s[6],y=s[10],S=s[14],L=s[3],z=s[7],C=s[11],I=s[15],w=l[0],P=l[4],b=l[8],U=l[12],V=l[1],G=l[5],W=l[9],lt=l[13],pt=l[2],j=l[6],B=l[10],F=l[14],$=l[3],ct=l[7],Et=l[11],N=l[15];return u[0]=h*w+d*V+m*pt+p*$,u[4]=h*P+d*G+m*j+p*ct,u[8]=h*b+d*W+m*B+p*Et,u[12]=h*U+d*lt+m*F+p*N,u[1]=v*w+x*V+g*pt+E*$,u[5]=v*P+x*G+g*j+E*ct,u[9]=v*b+x*W+g*B+E*Et,u[13]=v*U+x*lt+g*F+E*N,u[2]=T*w+D*V+y*pt+S*$,u[6]=T*P+D*G+y*j+S*ct,u[10]=T*b+D*W+y*B+S*Et,u[14]=T*U+D*lt+y*F+S*N,u[3]=L*w+z*V+C*pt+I*$,u[7]=L*P+z*G+C*j+I*ct,u[11]=L*b+z*W+C*B+I*Et,u[15]=L*U+z*lt+C*F+I*N,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[4],l=t[8],u=t[12],h=t[1],d=t[5],m=t[9],p=t[13],v=t[2],x=t[6],g=t[10],E=t[14],T=t[3],D=t[7],y=t[11],S=t[15],L=m*E-p*g,z=d*E-p*x,C=d*g-m*x,I=h*E-p*v,w=h*g-m*v,P=h*x-d*v;return i*(D*L-y*z+S*C)-s*(T*L-y*I+S*w)+l*(T*z-D*I+S*P)-u*(T*C-D*w+y*P)}determinantAffine(){const t=this.elements,i=t[0],s=t[4],l=t[8],u=t[1],h=t[5],d=t[9],m=t[2],p=t[6],v=t[10];return i*(h*v-d*p)-s*(u*v-d*m)+l*(u*p-h*m)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=s),this}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],u=t[3],h=t[4],d=t[5],m=t[6],p=t[7],v=t[8],x=t[9],g=t[10],E=t[11],T=t[12],D=t[13],y=t[14],S=t[15],L=i*d-s*h,z=i*m-l*h,C=i*p-u*h,I=s*m-l*d,w=s*p-u*d,P=l*p-u*m,b=v*D-x*T,U=v*y-g*T,V=v*S-E*T,G=x*y-g*D,W=x*S-E*D,lt=g*S-E*y,pt=L*lt-z*W+C*G+I*V-w*U+P*b;if(pt===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const j=1/pt;return t[0]=(d*lt-m*W+p*G)*j,t[1]=(l*W-s*lt-u*G)*j,t[2]=(D*P-y*w+S*I)*j,t[3]=(g*w-x*P-E*I)*j,t[4]=(m*V-h*lt-p*U)*j,t[5]=(i*lt-l*V+u*U)*j,t[6]=(y*C-T*P-S*z)*j,t[7]=(v*P-g*C+E*z)*j,t[8]=(h*W-d*V+p*b)*j,t[9]=(s*V-i*W-u*b)*j,t[10]=(T*w-D*C+S*L)*j,t[11]=(x*C-v*w-E*L)*j,t[12]=(d*U-h*G-m*b)*j,t[13]=(i*G-s*U+l*b)*j,t[14]=(D*z-T*I-y*L)*j,t[15]=(v*I-x*z+g*L)*j,this}scale(t){const i=this.elements,s=t.x,l=t.y,u=t.z;return i[0]*=s,i[4]*=l,i[8]*=u,i[1]*=s,i[5]*=l,i[9]*=u,i[2]*=s,i[6]*=l,i[10]*=u,i[3]*=s,i[7]*=l,i[11]*=u,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(t,i,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const s=Math.cos(i),l=Math.sin(i),u=1-s,h=t.x,d=t.y,m=t.z,p=u*h,v=u*d;return this.set(p*h+s,p*d-l*m,p*m+l*d,0,p*d+l*m,v*d+s,v*m-l*h,0,p*m-l*d,v*m+l*h,u*m*m+s,0,0,0,0,1),this}makeScale(t,i,s){return this.set(t,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,i,s,l,u,h){return this.set(1,s,u,0,t,1,h,0,i,l,1,0,0,0,0,1),this}compose(t,i,s){const l=this.elements,u=i._x,h=i._y,d=i._z,m=i._w,p=u+u,v=h+h,x=d+d,g=u*p,E=u*v,T=u*x,D=h*v,y=h*x,S=d*x,L=m*p,z=m*v,C=m*x,I=s.x,w=s.y,P=s.z;return l[0]=(1-(D+S))*I,l[1]=(E+C)*I,l[2]=(T-z)*I,l[3]=0,l[4]=(E-C)*w,l[5]=(1-(g+S))*w,l[6]=(y+L)*w,l[7]=0,l[8]=(T+z)*P,l[9]=(y-L)*P,l[10]=(1-(g+D))*P,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,s){const l=this.elements;t.x=l[12],t.y=l[13],t.z=l[14];const u=this.determinantAffine();if(u===0)return s.set(1,1,1),i.identity(),this;let h=Mr.set(l[0],l[1],l[2]).length();const d=Mr.set(l[4],l[5],l[6]).length(),m=Mr.set(l[8],l[9],l[10]).length();u<0&&(h=-h),Di.copy(this);const p=1/h,v=1/d,x=1/m;return Di.elements[0]*=p,Di.elements[1]*=p,Di.elements[2]*=p,Di.elements[4]*=v,Di.elements[5]*=v,Di.elements[6]*=v,Di.elements[8]*=x,Di.elements[9]*=x,Di.elements[10]*=x,i.setFromRotationMatrix(Di),s.x=h,s.y=d,s.z=m,this}makePerspective(t,i,s,l,u,h,d=Yi,m=!1){const p=this.elements,v=2*u/(i-t),x=2*u/(s-l),g=(i+t)/(i-t),E=(s+l)/(s-l);let T,D;if(m)T=u/(h-u),D=h*u/(h-u);else if(d===Yi)T=-(h+u)/(h-u),D=-2*h*u/(h-u);else if(d===nl)T=-h/(h-u),D=-h*u/(h-u);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=v,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=x,p[9]=E,p[13]=0,p[2]=0,p[6]=0,p[10]=T,p[14]=D,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,i,s,l,u,h,d=Yi,m=!1){const p=this.elements,v=2/(i-t),x=2/(s-l),g=-(i+t)/(i-t),E=-(s+l)/(s-l);let T,D;if(m)T=1/(h-u),D=h/(h-u);else if(d===Yi)T=-2/(h-u),D=-(h+u)/(h-u);else if(d===nl)T=-1/(h-u),D=-u/(h-u);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=v,p[4]=0,p[8]=0,p[12]=g,p[1]=0,p[5]=x,p[9]=0,p[13]=E,p[2]=0,p[6]=0,p[10]=T,p[14]=D,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<16;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t[i+9]=s[9],t[i+10]=s[10],t[i+11]=s[11],t[i+12]=s[12],t[i+13]=s[13],t[i+14]=s[14],t[i+15]=s[15],t}};uc.prototype.isMatrix4=!0;let sn=uc;const Mr=new K,Di=new sn,sy=new K(0,0,0),ry=new K(1,1,1),Ja=new K,xu=new K,ci=new K,D_=new sn,U_=new Wr;class os{constructor(t=0,i=0,s=0,l=os.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,s,l=this._order){return this._x=t,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,s=!0){const l=t.elements,u=l[0],h=l[4],d=l[8],m=l[1],p=l[5],v=l[9],x=l[2],g=l[6],E=l[10];switch(i){case"XYZ":this._y=Math.asin(ye(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-v,E),this._z=Math.atan2(-h,u)):(this._x=Math.atan2(g,p),this._z=0);break;case"YXZ":this._x=Math.asin(-ye(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(d,E),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-x,u),this._z=0);break;case"ZXY":this._x=Math.asin(ye(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-x,E),this._z=Math.atan2(-h,p)):(this._y=0,this._z=Math.atan2(m,u));break;case"ZYX":this._y=Math.asin(-ye(x,-1,1)),Math.abs(x)<.9999999?(this._x=Math.atan2(g,E),this._z=Math.atan2(m,u)):(this._x=0,this._z=Math.atan2(-h,p));break;case"YZX":this._z=Math.asin(ye(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-v,p),this._y=Math.atan2(-x,u)):(this._x=0,this._y=Math.atan2(d,E));break;case"XZY":this._z=Math.asin(-ye(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(g,p),this._y=Math.atan2(d,u)):(this._x=Math.atan2(-v,E),this._y=0);break;default:ie("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,s){return D_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(D_,i,s)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return U_.setFromEuler(this),this.setFromQuaternion(U_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}os.DEFAULT_ORDER="XYZ";class Bv{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let oy=0;const N_=new K,yr=new Wr,ga=new sn,Su=new K,Vo=new K,ly=new K,uy=new Wr,L_=new K(1,0,0),O_=new K(0,1,0),P_=new K(0,0,1),I_={type:"added"},cy={type:"removed"},Er={type:"childadded",child:null},Ih={type:"childremoved",child:null};class Un extends Hs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:oy++}),this.uuid=ss(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Un.DEFAULT_UP.clone();const t=new K,i=new os,s=new Wr,l=new K(1,1,1);function u(){s.setFromEuler(i,!1)}function h(){i.setFromQuaternion(s,void 0,!1)}i._onChange(u),s._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new sn},normalMatrix:{value:new se}}),this.matrix=new sn,this.matrixWorld=new sn,this.matrixAutoUpdate=Un.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return yr.setFromAxisAngle(t,i),this.quaternion.multiply(yr),this}rotateOnWorldAxis(t,i){return yr.setFromAxisAngle(t,i),this.quaternion.premultiply(yr),this}rotateX(t){return this.rotateOnAxis(L_,t)}rotateY(t){return this.rotateOnAxis(O_,t)}rotateZ(t){return this.rotateOnAxis(P_,t)}translateOnAxis(t,i){return N_.copy(t).applyQuaternion(this.quaternion),this.position.add(N_.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(L_,t)}translateY(t){return this.translateOnAxis(O_,t)}translateZ(t){return this.translateOnAxis(P_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ga.copy(this.matrixWorld).invert())}lookAt(t,i,s){t.isVector3?Su.copy(t):Su.set(t,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Vo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ga.lookAt(Vo,Su,this.up):ga.lookAt(Su,Vo,this.up),this.quaternion.setFromRotationMatrix(ga),l&&(ga.extractRotation(l.matrixWorld),yr.setFromRotationMatrix(ga),this.quaternion.premultiply(yr.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(be("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(I_),Er.child=t,this.dispatchEvent(Er),Er.child=null):be("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(cy),Ih.child=t,this.dispatchEvent(Ih),Ih.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ga.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ga.multiply(t.parent.matrixWorld)),t.applyMatrix4(ga),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(I_),Er.child=t,this.dispatchEvent(Er),Er.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const h=this.children[s].getObjectByProperty(t,i);if(h!==void 0)return h}}getObjectsByProperty(t,i,s=[]){this[t]===i&&s.push(this);const l=this.children;for(let u=0,h=l.length;u<h;u++)l[u].getObjectsByProperty(t,i,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vo,t,ly),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vo,uy,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const i=t.x,s=t.y,l=t.z,u=this.matrix.elements;u[12]+=i-u[0]*i-u[4]*s-u[8]*l,u[13]+=s-u[1]*i-u[5]*s-u[9]*l,u[14]+=l-u[2]*i-u[6]*s-u[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(t)}updateWorldMatrix(t,i,s=!1){const l=this.parent;if(t===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||s)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,s=!0),i===!0){const u=this.children;for(let h=0,d=u.length;h<d;h++)u[h].updateWorldMatrix(!1,!0,s)}}toJSON(t){const i=t===void 0||typeof t=="string",s={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(d=>({...d})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function u(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=u(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,v=m.length;p<v;p++){const x=m[p];u(t.shapes,x)}else u(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(u(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(u(t.materials,this.material[m]));l.material=d}else l.material=u(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(u(t.animations,m))}}if(i){const d=h(t.geometries),m=h(t.materials),p=h(t.textures),v=h(t.images),x=h(t.shapes),g=h(t.skeletons),E=h(t.animations),T=h(t.nodes);d.length>0&&(s.geometries=d),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),v.length>0&&(s.images=v),x.length>0&&(s.shapes=x),g.length>0&&(s.skeletons=g),E.length>0&&(s.animations=E),T.length>0&&(s.nodes=T)}return s.object=l,s;function h(d){const m=[];for(const p in d){const v=d[p];delete v.metadata,m.push(v)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}}Un.DEFAULT_UP=new K(0,1,0);Un.DEFAULT_MATRIX_AUTO_UPDATE=!0;Un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class zs extends Un{constructor(){super(),this.isGroup=!0,this.type="Group"}}const fy={type:"move"};class zh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const s of t.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,s){let l=null,u=null,h=null;const d=this._targetRay,m=this._grip,p=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(p&&t.hand){h=!0;for(const D of t.hand.values()){const y=i.getJointPose(D,s),S=this._getHandJoint(p,D);y!==null&&(S.matrix.fromArray(y.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=y.radius),S.visible=y!==null}const v=p.joints["index-finger-tip"],x=p.joints["thumb-tip"],g=v.position.distanceTo(x.position),E=.02,T=.005;p.inputState.pinching&&g>E+T?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&g<=E-T&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(u=i.getPose(t.gripSpace,s),u!==null&&(m.matrix.fromArray(u.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,u.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(u.linearVelocity)):m.hasLinearVelocity=!1,u.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(u.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:t,target:this})));d!==null&&(l=i.getPose(t.targetRaySpace,s),l===null&&u!==null&&(l=u),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(fy)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=u!==null),p!==null&&(p.visible=h!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const s=new zs;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[i.jointName]=s,t.add(s)}return t.joints[i.jointName]}}const Fv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ja={h:0,s:0,l:0},Mu={h:0,s:0,l:0};function Bh(o,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(t-o)*6*i:i<1/2?t:i<2/3?o+(t-o)*6*(2/3-i):o}class he{constructor(t,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,s)}set(t,i,s){if(i===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=Qn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Se.colorSpaceToWorking(this,i),this}setRGB(t,i,s,l=Se.workingColorSpace){return this.r=t,this.g=i,this.b=s,Se.colorSpaceToWorking(this,l),this}setHSL(t,i,s,l=Se.workingColorSpace){if(t=jM(t,1),i=ye(i,0,1),s=ye(s,0,1),i===0)this.r=this.g=this.b=s;else{const u=s<=.5?s*(1+i):s+i-s*i,h=2*s-u;this.r=Bh(h,u,t+1/3),this.g=Bh(h,u,t),this.b=Bh(h,u,t-1/3)}return Se.colorSpaceToWorking(this,l),this}setStyle(t,i=Qn){function s(u){u!==void 0&&parseFloat(u)<1&&ie("Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let u;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(u=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(u[4]),this.setRGB(Math.min(255,parseInt(u[1],10))/255,Math.min(255,parseInt(u[2],10))/255,Math.min(255,parseInt(u[3],10))/255,i);if(u=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(u[4]),this.setRGB(Math.min(100,parseInt(u[1],10))/100,Math.min(100,parseInt(u[2],10))/100,Math.min(100,parseInt(u[3],10))/100,i);break;case"hsl":case"hsla":if(u=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(u[4]),this.setHSL(parseFloat(u[1])/360,parseFloat(u[2])/100,parseFloat(u[3])/100,i);break;default:ie("Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const u=l[1],h=u.length;if(h===3)return this.setRGB(parseInt(u.charAt(0),16)/15,parseInt(u.charAt(1),16)/15,parseInt(u.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(u,16),i);ie("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=Qn){const s=Fv[t.toLowerCase()];return s!==void 0?this.setHex(s,i):ie("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ya(t.r),this.g=ya(t.g),this.b=ya(t.b),this}copyLinearToSRGB(t){return this.r=Fr(t.r),this.g=Fr(t.g),this.b=Fr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qn){return Se.workingToColorSpace(Pn.copy(this),t),Math.round(ye(Pn.r*255,0,255))*65536+Math.round(ye(Pn.g*255,0,255))*256+Math.round(ye(Pn.b*255,0,255))}getHexString(t=Qn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=Se.workingColorSpace){Se.workingToColorSpace(Pn.copy(this),i);const s=Pn.r,l=Pn.g,u=Pn.b,h=Math.max(s,l,u),d=Math.min(s,l,u);let m,p;const v=(d+h)/2;if(d===h)m=0,p=0;else{const x=h-d;switch(p=v<=.5?x/(h+d):x/(2-h-d),h){case s:m=(l-u)/x+(l<u?6:0);break;case l:m=(u-s)/x+2;break;case u:m=(s-l)/x+4;break}m/=6}return t.h=m,t.s=p,t.l=v,t}getRGB(t,i=Se.workingColorSpace){return Se.workingToColorSpace(Pn.copy(this),i),t.r=Pn.r,t.g=Pn.g,t.b=Pn.b,t}getStyle(t=Qn){Se.workingToColorSpace(Pn.copy(this),t);const i=Pn.r,s=Pn.g,l=Pn.b;return t!==Qn?`color(${t} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,i,s){return this.getHSL(ja),this.setHSL(ja.h+t,ja.s+i,ja.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,s){return this.r=t.r+(i.r-t.r)*s,this.g=t.g+(i.g-t.g)*s,this.b=t.b+(i.b-t.b)*s,this}lerpHSL(t,i){this.getHSL(ja),t.getHSL(Mu);const s=Uh(ja.h,Mu.h,i),l=Uh(ja.s,Mu.s,i),u=Uh(ja.l,Mu.l,i);return this.setHSL(s,l,u),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,s=this.g,l=this.b,u=t.elements;return this.r=u[0]*i+u[3]*s+u[6]*l,this.g=u[1]*i+u[4]*s+u[7]*l,this.b=u[2]*i+u[5]*s+u[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pn=new he;he.NAMES=Fv;class hy extends Un{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new os,this.environmentIntensity=1,this.environmentRotation=new os,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Ui=new K,_a=new K,Fh=new K,va=new K,br=new K,Tr=new K,z_=new K,Hh=new K,Gh=new K,Vh=new K,Xh=new an,kh=new an,Wh=new an;class bi{constructor(t=new K,i=new K,s=new K){this.a=t,this.b=i,this.c=s}static getNormal(t,i,s,l){l.subVectors(s,i),Ui.subVectors(t,i),l.cross(Ui);const u=l.lengthSq();return u>0?l.multiplyScalar(1/Math.sqrt(u)):l.set(0,0,0)}static getBarycoord(t,i,s,l,u){Ui.subVectors(l,i),_a.subVectors(s,i),Fh.subVectors(t,i);const h=Ui.dot(Ui),d=Ui.dot(_a),m=Ui.dot(Fh),p=_a.dot(_a),v=_a.dot(Fh),x=h*p-d*d;if(x===0)return u.set(0,0,0),null;const g=1/x,E=(p*m-d*v)*g,T=(h*v-d*m)*g;return u.set(1-E-T,T,E)}static containsPoint(t,i,s,l){return this.getBarycoord(t,i,s,l,va)===null?!1:va.x>=0&&va.y>=0&&va.x+va.y<=1}static getInterpolation(t,i,s,l,u,h,d,m){return this.getBarycoord(t,i,s,l,va)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(u,va.x),m.addScaledVector(h,va.y),m.addScaledVector(d,va.z),m)}static getInterpolatedAttribute(t,i,s,l,u,h){return Xh.setScalar(0),kh.setScalar(0),Wh.setScalar(0),Xh.fromBufferAttribute(t,i),kh.fromBufferAttribute(t,s),Wh.fromBufferAttribute(t,l),h.setScalar(0),h.addScaledVector(Xh,u.x),h.addScaledVector(kh,u.y),h.addScaledVector(Wh,u.z),h}static isFrontFacing(t,i,s,l){return Ui.subVectors(s,i),_a.subVectors(t,i),Ui.cross(_a).dot(l)<0}set(t,i,s){return this.a.copy(t),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(t,i,s,l){return this.a.copy(t[i]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,s,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ui.subVectors(this.c,this.b),_a.subVectors(this.a,this.b),Ui.cross(_a).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return bi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return bi.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,s,l,u){return bi.getInterpolation(t,this.a,this.b,this.c,i,s,l,u)}containsPoint(t){return bi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return bi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const s=this.a,l=this.b,u=this.c;let h,d;br.subVectors(l,s),Tr.subVectors(u,s),Hh.subVectors(t,s);const m=br.dot(Hh),p=Tr.dot(Hh);if(m<=0&&p<=0)return i.copy(s);Gh.subVectors(t,l);const v=br.dot(Gh),x=Tr.dot(Gh);if(v>=0&&x<=v)return i.copy(l);const g=m*x-v*p;if(g<=0&&m>=0&&v<=0)return h=m/(m-v),i.copy(s).addScaledVector(br,h);Vh.subVectors(t,u);const E=br.dot(Vh),T=Tr.dot(Vh);if(T>=0&&E<=T)return i.copy(u);const D=E*p-m*T;if(D<=0&&p>=0&&T<=0)return d=p/(p-T),i.copy(s).addScaledVector(Tr,d);const y=v*T-E*x;if(y<=0&&x-v>=0&&E-T>=0)return z_.subVectors(u,l),d=(x-v)/(x-v+(E-T)),i.copy(l).addScaledVector(z_,d);const S=1/(y+D+g);return h=D*S,d=g*S,i.copy(s).addScaledVector(br,h).addScaledVector(Tr,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class al{constructor(t=new K(1/0,1/0,1/0),i=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i+=3)this.expandByPoint(Ni.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,s=t.count;i<s;i++)this.expandByPoint(Ni.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const s=Ni.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const u=s.getAttribute("position");if(i===!0&&u!==void 0&&t.isInstancedMesh!==!0)for(let h=0,d=u.count;h<d;h++)t.isMesh===!0?t.getVertexPosition(h,Ni):Ni.fromBufferAttribute(u,h),Ni.applyMatrix4(t.matrixWorld),this.expandByPoint(Ni);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),yu.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),yu.copy(s.boundingBox)),yu.applyMatrix4(t.matrixWorld),this.union(yu)}const l=t.children;for(let u=0,h=l.length;u<h;u++)this.expandByObject(l[u],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ni),Ni.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,s;return t.normal.x>0?(i=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),i<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Xo),Eu.subVectors(this.max,Xo),Ar.subVectors(t.a,Xo),Rr.subVectors(t.b,Xo),Cr.subVectors(t.c,Xo),$a.subVectors(Rr,Ar),ts.subVectors(Cr,Rr),Cs.subVectors(Ar,Cr);let i=[0,-$a.z,$a.y,0,-ts.z,ts.y,0,-Cs.z,Cs.y,$a.z,0,-$a.x,ts.z,0,-ts.x,Cs.z,0,-Cs.x,-$a.y,$a.x,0,-ts.y,ts.x,0,-Cs.y,Cs.x,0];return!qh(i,Ar,Rr,Cr,Eu)||(i=[1,0,0,0,1,0,0,0,1],!qh(i,Ar,Rr,Cr,Eu))?!1:(bu.crossVectors($a,ts),i=[bu.x,bu.y,bu.z],qh(i,Ar,Rr,Cr,Eu))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ni).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ni).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(xa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),xa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),xa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),xa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),xa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),xa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),xa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),xa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(xa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const xa=[new K,new K,new K,new K,new K,new K,new K,new K],Ni=new K,yu=new al,Ar=new K,Rr=new K,Cr=new K,$a=new K,ts=new K,Cs=new K,Xo=new K,Eu=new K,bu=new K,ws=new K;function qh(o,t,i,s,l){for(let u=0,h=o.length-3;u<=h;u+=3){ws.fromArray(o,u);const d=l.x*Math.abs(ws.x)+l.y*Math.abs(ws.y)+l.z*Math.abs(ws.z),m=t.dot(ws),p=i.dot(ws),v=s.dot(ws);if(Math.max(-Math.max(m,p,v),Math.min(m,p,v))>d)return!1}return!0}const _n=new K,Tu=new Zt;let dy=0;class Pi extends Hs{constructor(t,i,s=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:dy++}),this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=s,this.usage=Qd,this.updateRanges=[],this.gpuType=qi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,s){t*=this.itemSize,s*=i.itemSize;for(let l=0,u=this.itemSize;l<u;l++)this.array[t+l]=i.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Tu.fromBufferAttribute(this,i),Tu.applyMatrix3(t),this.setXY(i,Tu.x,Tu.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)_n.fromBufferAttribute(this,i),_n.applyMatrix3(t),this.setXYZ(i,_n.x,_n.y,_n.z);return this}applyMatrix4(t){for(let i=0,s=this.count;i<s;i++)_n.fromBufferAttribute(this,i),_n.applyMatrix4(t),this.setXYZ(i,_n.x,_n.y,_n.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)_n.fromBufferAttribute(this,i),_n.applyNormalMatrix(t),this.setXYZ(i,_n.x,_n.y,_n.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)_n.fromBufferAttribute(this,i),_n.transformDirection(t),this.setXYZ(i,_n.x,_n.y,_n.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let s=this.array[t*this.itemSize+i];return this.normalized&&(s=Wi(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=ke(s,this.array)),this.array[t*this.itemSize+i]=s,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=Wi(i,this.array)),i}setX(t,i){return this.normalized&&(i=ke(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=Wi(i,this.array)),i}setY(t,i){return this.normalized&&(i=ke(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=Wi(i,this.array)),i}setZ(t,i){return this.normalized&&(i=ke(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=Wi(i,this.array)),i}setW(t,i){return this.normalized&&(i=ke(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,s){return t*=this.itemSize,this.normalized&&(i=ke(i,this.array),s=ke(s,this.array)),this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,l){return t*=this.itemSize,this.normalized&&(i=ke(i,this.array),s=ke(s,this.array),l=ke(l,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,i,s,l,u){return t*=this.itemSize,this.normalized&&(i=ke(i,this.array),s=ke(s,this.array),l=ke(l,this.array),u=ke(u,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=u,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Qd&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class Hv extends Pi{constructor(t,i,s){super(new Uint16Array(t),i,s)}}class Gv extends Pi{constructor(t,i,s){super(new Uint32Array(t),i,s)}}class rn extends Pi{constructor(t,i,s){super(new Float32Array(t),i,s)}}const py=new al,ko=new K,Yh=new K;class _p{constructor(t=new K,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const s=this.center;i!==void 0?s.copy(i):py.setFromPoints(t).getCenter(s);let l=0;for(let u=0,h=t.length;u<h;u++)l=Math.max(l,s.distanceToSquared(t[u]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const s=this.center.distanceToSquared(t);return i.copy(t),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ko.subVectors(t,this.center);const i=ko.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(ko,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Yh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ko.copy(t.center).add(Yh)),this.expandByPoint(ko.copy(t.center).sub(Yh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let my=0;const Ei=new sn,Zh=new Un,wr=new K,fi=new al,Wo=new al,bn=new K;class Vn extends Hs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:my++}),this.uuid=ss(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ZM(t)?Gv:Hv)(t,1):this.index=t,this}setIndirect(t,i=0){return this.indirect=t,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,s=0){this.groups.push({start:t,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const u=new se().getNormalMatrix(t);s.applyNormalMatrix(u),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ei.makeRotationFromQuaternion(t),this.applyMatrix4(Ei),this}rotateX(t){return Ei.makeRotationX(t),this.applyMatrix4(Ei),this}rotateY(t){return Ei.makeRotationY(t),this.applyMatrix4(Ei),this}rotateZ(t){return Ei.makeRotationZ(t),this.applyMatrix4(Ei),this}translate(t,i,s){return Ei.makeTranslation(t,i,s),this.applyMatrix4(Ei),this}scale(t,i,s){return Ei.makeScale(t,i,s),this.applyMatrix4(Ei),this}lookAt(t){return Zh.lookAt(t),Zh.updateMatrix(),this.applyMatrix4(Zh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wr).negate(),this.translate(wr.x,wr.y,wr.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,u=t.length;l<u;l++){const h=t[l];s.push(h.x,h.y,h.z||0)}this.setAttribute("position",new rn(s,3))}else{const s=Math.min(t.length,i.count);for(let l=0;l<s;l++){const u=t[l];i.setXYZ(l,u.x,u.y,u.z||0)}t.length>i.count&&ie("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new al);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){be("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let s=0,l=i.length;s<l;s++){const u=i[s];fi.setFromBufferAttribute(u),this.morphTargetsRelative?(bn.addVectors(this.boundingBox.min,fi.min),this.boundingBox.expandByPoint(bn),bn.addVectors(this.boundingBox.max,fi.max),this.boundingBox.expandByPoint(bn)):(this.boundingBox.expandByPoint(fi.min),this.boundingBox.expandByPoint(fi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&be('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _p);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){be("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(t){const s=this.boundingSphere.center;if(fi.setFromBufferAttribute(t),i)for(let u=0,h=i.length;u<h;u++){const d=i[u];Wo.setFromBufferAttribute(d),this.morphTargetsRelative?(bn.addVectors(fi.min,Wo.min),fi.expandByPoint(bn),bn.addVectors(fi.max,Wo.max),fi.expandByPoint(bn)):(fi.expandByPoint(Wo.min),fi.expandByPoint(Wo.max))}fi.getCenter(s);let l=0;for(let u=0,h=t.count;u<h;u++)bn.fromBufferAttribute(t,u),l=Math.max(l,s.distanceToSquared(bn));if(i)for(let u=0,h=i.length;u<h;u++){const d=i[u],m=this.morphTargetsRelative;for(let p=0,v=d.count;p<v;p++)bn.fromBufferAttribute(d,p),m&&(wr.fromBufferAttribute(t,p),bn.add(wr)),l=Math.max(l,s.distanceToSquared(bn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&be('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){be("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,u=i.uv;let h=this.getAttribute("tangent");(h===void 0||h.count!==s.count)&&(h=new Pi(new Float32Array(4*s.count),4),this.setAttribute("tangent",h));const d=[],m=[];for(let b=0;b<s.count;b++)d[b]=new K,m[b]=new K;const p=new K,v=new K,x=new K,g=new Zt,E=new Zt,T=new Zt,D=new K,y=new K;function S(b,U,V){p.fromBufferAttribute(s,b),v.fromBufferAttribute(s,U),x.fromBufferAttribute(s,V),g.fromBufferAttribute(u,b),E.fromBufferAttribute(u,U),T.fromBufferAttribute(u,V),v.sub(p),x.sub(p),E.sub(g),T.sub(g);const G=1/(E.x*T.y-T.x*E.y);isFinite(G)&&(D.copy(v).multiplyScalar(T.y).addScaledVector(x,-E.y).multiplyScalar(G),y.copy(x).multiplyScalar(E.x).addScaledVector(v,-T.x).multiplyScalar(G),d[b].add(D),d[U].add(D),d[V].add(D),m[b].add(y),m[U].add(y),m[V].add(y))}let L=this.groups;L.length===0&&(L=[{start:0,count:t.count}]);for(let b=0,U=L.length;b<U;++b){const V=L[b],G=V.start,W=V.count;for(let lt=G,pt=G+W;lt<pt;lt+=3)S(t.getX(lt+0),t.getX(lt+1),t.getX(lt+2))}const z=new K,C=new K,I=new K,w=new K;function P(b){I.fromBufferAttribute(l,b),w.copy(I);const U=d[b];z.copy(U),z.sub(I.multiplyScalar(I.dot(U))).normalize(),C.crossVectors(w,U);const G=C.dot(m[b])<0?-1:1;h.setXYZW(b,z.x,z.y,z.z,G)}for(let b=0,U=L.length;b<U;++b){const V=L[b],G=V.start,W=V.count;for(let lt=G,pt=G+W;lt<pt;lt+=3)P(t.getX(lt+0)),P(t.getX(lt+1)),P(t.getX(lt+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0||s.count!==i.count)s=new Pi(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let g=0,E=s.count;g<E;g++)s.setXYZ(g,0,0,0);const l=new K,u=new K,h=new K,d=new K,m=new K,p=new K,v=new K,x=new K;if(t)for(let g=0,E=t.count;g<E;g+=3){const T=t.getX(g+0),D=t.getX(g+1),y=t.getX(g+2);l.fromBufferAttribute(i,T),u.fromBufferAttribute(i,D),h.fromBufferAttribute(i,y),v.subVectors(h,u),x.subVectors(l,u),v.cross(x),d.fromBufferAttribute(s,T),m.fromBufferAttribute(s,D),p.fromBufferAttribute(s,y),d.add(v),m.add(v),p.add(v),s.setXYZ(T,d.x,d.y,d.z),s.setXYZ(D,m.x,m.y,m.z),s.setXYZ(y,p.x,p.y,p.z)}else for(let g=0,E=i.count;g<E;g+=3)l.fromBufferAttribute(i,g+0),u.fromBufferAttribute(i,g+1),h.fromBufferAttribute(i,g+2),v.subVectors(h,u),x.subVectors(l,u),v.cross(x),s.setXYZ(g+0,v.x,v.y,v.z),s.setXYZ(g+1,v.x,v.y,v.z),s.setXYZ(g+2,v.x,v.y,v.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,s=t.count;i<s;i++)bn.fromBufferAttribute(t,i),bn.normalize(),t.setXYZ(i,bn.x,bn.y,bn.z)}toNonIndexed(){function t(d,m){const p=d.array,v=d.itemSize,x=d.normalized,g=new p.constructor(m.length*v);let E=0,T=0;for(let D=0,y=m.length;D<y;D++){d.isInterleavedBufferAttribute?E=m[D]*d.data.stride+d.offset:E=m[D]*v;for(let S=0;S<v;S++)g[T++]=p[E++]}return new Pi(g,v,x)}if(this.index===null)return ie("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Vn,s=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=t(m,s);i.setAttribute(d,p)}const u=this.morphAttributes;for(const d in u){const m=[],p=u[d];for(let v=0,x=p.length;v<x;v++){const g=p[v],E=t(g,s);m.push(E)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,m=h.length;d<m;d++){const p=h[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];t.data.attributes[m]=p.toJSON(t.data)}const l={};let u=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],v=[];for(let x=0,g=p.length;x<g;x++){const E=p[x];v.push(E.toJSON(t.data))}v.length>0&&(l[m]=v,u=!0)}u&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(t.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere=d.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone());const l=t.attributes;for(const p in l){const v=l[p];this.setAttribute(p,v.clone(i))}const u=t.morphAttributes;for(const p in u){const v=[],x=u[p];for(let g=0,E=x.length;g<E;g++)v.push(x[g].clone(i));this.morphAttributes[p]=v}this.morphTargetsRelative=t.morphTargetsRelative;const h=t.groups;for(let p=0,v=h.length;p<v;p++){const x=h[p];this.addGroup(x.start,x.count,x.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gy{constructor(t,i){this.isInterleavedBuffer=!0,this.array=t,this.stride=i,this.count=t!==void 0?t.length/i:0,this.usage=Qd,this.updateRanges=[],this.version=0,this.uuid=ss()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,i,s){t*=this.stride,s*=i.stride;for(let l=0,u=this.stride;l<u;l++)this.array[t+l]=i.array[s+l];return this}set(t,i=0){return this.array.set(t,i),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ss()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const i=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),s=new this.constructor(i,this.stride);return s.setUsage(this.usage),s}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ss()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Fn=new K;class oc{constructor(t,i,s,l=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=i,this.offset=s,this.normalized=l}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let i=0,s=this.data.count;i<s;i++)Fn.fromBufferAttribute(this,i),Fn.applyMatrix4(t),this.setXYZ(i,Fn.x,Fn.y,Fn.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)Fn.fromBufferAttribute(this,i),Fn.applyNormalMatrix(t),this.setXYZ(i,Fn.x,Fn.y,Fn.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)Fn.fromBufferAttribute(this,i),Fn.transformDirection(t),this.setXYZ(i,Fn.x,Fn.y,Fn.z);return this}getComponent(t,i){let s=this.array[t*this.data.stride+this.offset+i];return this.normalized&&(s=Wi(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=ke(s,this.array)),this.data.array[t*this.data.stride+this.offset+i]=s,this}setX(t,i){return this.normalized&&(i=ke(i,this.array)),this.data.array[t*this.data.stride+this.offset]=i,this}setY(t,i){return this.normalized&&(i=ke(i,this.array)),this.data.array[t*this.data.stride+this.offset+1]=i,this}setZ(t,i){return this.normalized&&(i=ke(i,this.array)),this.data.array[t*this.data.stride+this.offset+2]=i,this}setW(t,i){return this.normalized&&(i=ke(i,this.array)),this.data.array[t*this.data.stride+this.offset+3]=i,this}getX(t){let i=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(i=Wi(i,this.array)),i}getY(t){let i=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(i=Wi(i,this.array)),i}getZ(t){let i=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(i=Wi(i,this.array)),i}getW(t){let i=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(i=Wi(i,this.array)),i}setXY(t,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(i=ke(i,this.array),s=ke(s,this.array)),this.data.array[t+0]=i,this.data.array[t+1]=s,this}setXYZ(t,i,s,l){return t=t*this.data.stride+this.offset,this.normalized&&(i=ke(i,this.array),s=ke(s,this.array),l=ke(l,this.array)),this.data.array[t+0]=i,this.data.array[t+1]=s,this.data.array[t+2]=l,this}setXYZW(t,i,s,l,u){return t=t*this.data.stride+this.offset,this.normalized&&(i=ke(i,this.array),s=ke(s,this.array),l=ke(l,this.array),u=ke(u,this.array)),this.data.array[t+0]=i,this.data.array[t+1]=s,this.data.array[t+2]=l,this.data.array[t+3]=u,this}clone(t){if(t===void 0){rc("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const i=[];for(let s=0;s<this.count;s++){const l=s*this.data.stride+this.offset;for(let u=0;u<this.itemSize;u++)i.push(this.data.array[l+u])}return new Pi(new this.array.constructor(i),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new oc(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){rc("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const i=[];for(let s=0;s<this.count;s++){const l=s*this.data.stride+this.offset;for(let u=0;u<this.itemSize;u++)i.push(this.data.array[l+u])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:i,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let _y=0;class qr extends Hs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_y++}),this.uuid=ss(),this.name="",this.type="Material",this.blending=zr,this.side=rs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ld,this.blendDst=ud,this.blendEquation=Ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new he(0,0,0),this.blendAlpha=0,this.depthFunc=Hr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=b_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xr,this.stencilZFail=xr,this.stencilZPass=xr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const s=t[i];if(s===void 0){ie(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ie(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector2&&s&&s.isVector2||l&&l.isEuler&&s&&s.isEuler||l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==zr&&(s.blending=this.blending),this.side!==rs&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==ld&&(s.blendSrc=this.blendSrc),this.blendDst!==ud&&(s.blendDst=this.blendDst),this.blendEquation!==Ls&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Hr&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==b_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xr&&(s.stencilFail=this.stencilFail),this.stencilZFail!==xr&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==xr&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.allowOverride===!1&&(s.allowOverride=!1),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(u){const h=[];for(const d in u){const m=u[d];delete m.metadata,h.push(m)}return h}if(i){const u=l(t.textures),h=l(t.images);u.length>0&&(s.textures=u),h.length>0&&(s.images=h)}return s}fromJSON(t,i){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new he().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=i[t.map]||null),t.matcap!==void 0&&(this.matcap=i[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=i[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=i[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=i[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let s=t.normalScale;Array.isArray(s)===!1&&(s=[s,s]),this.normalScale=new Zt().fromArray(s)}return t.displacementMap!==void 0&&(this.displacementMap=i[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=i[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=i[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=i[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=i[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=i[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=i[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=i[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=i[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=i[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=i[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Zt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=i[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=i[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=i[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=i[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=i[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let u=0;u!==l;++u)s[u]=i[u].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class hc extends qr{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new he(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Dr;const qo=new K,Ur=new K,Nr=new K,Lr=new Zt,Yo=new Zt,Vv=new sn,Au=new K,Zo=new K,Ru=new K,B_=new Zt,Kh=new Zt,F_=new Zt;class vp extends Un{constructor(t=new hc){if(super(),this.isSprite=!0,this.type="Sprite",Dr===void 0){Dr=new Vn;const i=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),s=new gy(i,5);Dr.setIndex([0,1,2,0,2,3]),Dr.setAttribute("position",new oc(s,3,0,!1)),Dr.setAttribute("uv",new oc(s,2,3,!1))}this.geometry=Dr,this.material=t,this.center=new Zt(.5,.5),this.count=1}raycast(t,i){t.camera===null&&be('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ur.setFromMatrixScale(this.matrixWorld),Vv.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Nr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ur.multiplyScalar(-Nr.z);const s=this.material.rotation;let l,u;s!==0&&(u=Math.cos(s),l=Math.sin(s));const h=this.center;Cu(Au.set(-.5,-.5,0),Nr,h,Ur,l,u),Cu(Zo.set(.5,-.5,0),Nr,h,Ur,l,u),Cu(Ru.set(.5,.5,0),Nr,h,Ur,l,u),B_.set(0,0),Kh.set(1,0),F_.set(1,1);let d=t.ray.intersectTriangle(Au,Zo,Ru,!1,qo);if(d===null&&(Cu(Zo.set(-.5,.5,0),Nr,h,Ur,l,u),Kh.set(0,1),d=t.ray.intersectTriangle(Au,Ru,Zo,!1,qo),d===null))return;const m=t.ray.origin.distanceTo(qo);m<t.near||m>t.far||i.push({distance:m,point:qo.clone(),uv:bi.getInterpolation(qo,Au,Zo,Ru,B_,Kh,F_,new Zt),face:null,object:this})}copy(t,i){return super.copy(t,i),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Cu(o,t,i,s,l,u){Lr.subVectors(o,i).addScalar(.5).multiply(s),l!==void 0?(Yo.x=u*Lr.x-l*Lr.y,Yo.y=l*Lr.x+u*Lr.y):Yo.copy(Lr),o.copy(t),o.x+=Yo.x,o.y+=Yo.y,o.applyMatrix4(Vv)}const Sa=new K,Qh=new K,wu=new K,es=new K,Jh=new K,Du=new K,jh=new K;class vy{constructor(t=new K,i=new K(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Sa)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=Sa.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(Sa.copy(this.origin).addScaledVector(this.direction,i),Sa.distanceToSquared(t))}distanceSqToSegment(t,i,s,l){Qh.copy(t).add(i).multiplyScalar(.5),wu.copy(i).sub(t).normalize(),es.copy(this.origin).sub(Qh);const u=t.distanceTo(i)*.5,h=-this.direction.dot(wu),d=es.dot(this.direction),m=-es.dot(wu),p=es.lengthSq(),v=Math.abs(1-h*h);let x,g,E,T;if(v>0)if(x=h*m-d,g=h*d-m,T=u*v,x>=0)if(g>=-T)if(g<=T){const D=1/v;x*=D,g*=D,E=x*(x+h*g+2*d)+g*(h*x+g+2*m)+p}else g=u,x=Math.max(0,-(h*g+d)),E=-x*x+g*(g+2*m)+p;else g=-u,x=Math.max(0,-(h*g+d)),E=-x*x+g*(g+2*m)+p;else g<=-T?(x=Math.max(0,-(-h*u+d)),g=x>0?-u:Math.min(Math.max(-u,-m),u),E=-x*x+g*(g+2*m)+p):g<=T?(x=0,g=Math.min(Math.max(-u,-m),u),E=g*(g+2*m)+p):(x=Math.max(0,-(h*u+d)),g=x>0?u:Math.min(Math.max(-u,-m),u),E=-x*x+g*(g+2*m)+p);else g=h>0?-u:u,x=Math.max(0,-(h*g+d)),E=-x*x+g*(g+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,x),l&&l.copy(Qh).addScaledVector(wu,g),E}intersectSphere(t,i){Sa.subVectors(t.center,this.origin);const s=Sa.dot(this.direction),l=Sa.dot(Sa)-s*s,u=t.radius*t.radius;if(l>u)return null;const h=Math.sqrt(u-l),d=s-h,m=s+h;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/i;return s>=0?s:null}intersectPlane(t,i){const s=this.distanceToPlane(t);return s===null?null:this.at(s,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let s,l,u,h,d,m;const p=1/this.direction.x,v=1/this.direction.y,x=1/this.direction.z,g=this.origin;return p>=0?(s=(t.min.x-g.x)*p,l=(t.max.x-g.x)*p):(s=(t.max.x-g.x)*p,l=(t.min.x-g.x)*p),v>=0?(u=(t.min.y-g.y)*v,h=(t.max.y-g.y)*v):(u=(t.max.y-g.y)*v,h=(t.min.y-g.y)*v),s>h||u>l||((u>s||isNaN(s))&&(s=u),(h<l||isNaN(l))&&(l=h),x>=0?(d=(t.min.z-g.z)*x,m=(t.max.z-g.z)*x):(d=(t.max.z-g.z)*x,m=(t.min.z-g.z)*x),s>m||d>l)||((d>s||s!==s)&&(s=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(t){return this.intersectBox(t,Sa)!==null}intersectTriangle(t,i,s,l,u){Jh.subVectors(i,t),Du.subVectors(s,t),jh.crossVectors(Jh,Du);let h=this.direction.dot(jh),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;es.subVectors(this.origin,t);const m=d*this.direction.dot(Du.crossVectors(es,Du));if(m<0)return null;const p=d*this.direction.dot(Jh.cross(es));if(p<0||m+p>h)return null;const v=-d*es.dot(jh);return v<0?null:this.at(v/h,u)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xp extends qr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new os,this.combine=Rv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const H_=new sn,Ds=new vy,Uu=new _p,G_=new K,Nu=new K,Lu=new K,Ou=new K,$h=new K,Pu=new K,V_=new K,Iu=new K;class Gn extends Un{constructor(t=new Vn,i=new xp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,h=l.length;u<h;u++){const d=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=u}}}}getVertexPosition(t,i){const s=this.geometry,l=s.attributes.position,u=s.morphAttributes.position,h=s.morphTargetsRelative;i.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(u&&d){Pu.set(0,0,0);for(let m=0,p=u.length;m<p;m++){const v=d[m],x=u[m];v!==0&&($h.fromBufferAttribute(x,t),h?Pu.addScaledVector($h,v):Pu.addScaledVector($h.sub(i),v))}i.add(Pu)}return i}raycast(t,i){const s=this.geometry,l=this.material,u=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Uu.copy(s.boundingSphere),Uu.applyMatrix4(u),Ds.copy(t.ray).recast(t.near),!(Uu.containsPoint(Ds.origin)===!1&&(Ds.intersectSphere(Uu,G_)===null||Ds.origin.distanceToSquared(G_)>(t.far-t.near)**2))&&(H_.copy(u).invert(),Ds.copy(t.ray).applyMatrix4(H_),!(s.boundingBox!==null&&Ds.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,i,Ds)))}_computeIntersections(t,i,s){let l;const u=this.geometry,h=this.material,d=u.index,m=u.attributes.position,p=u.attributes.uv,v=u.attributes.uv1,x=u.attributes.normal,g=u.groups,E=u.drawRange;if(d!==null)if(Array.isArray(h))for(let T=0,D=g.length;T<D;T++){const y=g[T],S=h[y.materialIndex],L=Math.max(y.start,E.start),z=Math.min(d.count,Math.min(y.start+y.count,E.start+E.count));for(let C=L,I=z;C<I;C+=3){const w=d.getX(C),P=d.getX(C+1),b=d.getX(C+2);l=zu(this,S,t,s,p,v,x,w,P,b),l&&(l.faceIndex=Math.floor(C/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const T=Math.max(0,E.start),D=Math.min(d.count,E.start+E.count);for(let y=T,S=D;y<S;y+=3){const L=d.getX(y),z=d.getX(y+1),C=d.getX(y+2);l=zu(this,h,t,s,p,v,x,L,z,C),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let T=0,D=g.length;T<D;T++){const y=g[T],S=h[y.materialIndex],L=Math.max(y.start,E.start),z=Math.min(m.count,Math.min(y.start+y.count,E.start+E.count));for(let C=L,I=z;C<I;C+=3){const w=C,P=C+1,b=C+2;l=zu(this,S,t,s,p,v,x,w,P,b),l&&(l.faceIndex=Math.floor(C/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const T=Math.max(0,E.start),D=Math.min(m.count,E.start+E.count);for(let y=T,S=D;y<S;y+=3){const L=y,z=y+1,C=y+2;l=zu(this,h,t,s,p,v,x,L,z,C),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}}}function xy(o,t,i,s,l,u,h,d){let m;if(t.side===Jn?m=s.intersectTriangle(h,u,l,!0,d):m=s.intersectTriangle(l,u,h,t.side===rs,d),m===null)return null;Iu.copy(d),Iu.applyMatrix4(o.matrixWorld);const p=i.ray.origin.distanceTo(Iu);return p<i.near||p>i.far?null:{distance:p,point:Iu.clone(),object:o}}function zu(o,t,i,s,l,u,h,d,m,p){o.getVertexPosition(d,Nu),o.getVertexPosition(m,Lu),o.getVertexPosition(p,Ou);const v=xy(o,t,i,s,Nu,Lu,Ou,V_);if(v){const x=new K;bi.getBarycoord(V_,Nu,Lu,Ou,x),l&&(v.uv=bi.getInterpolatedAttribute(l,d,m,p,x,new Zt)),u&&(v.uv1=bi.getInterpolatedAttribute(u,d,m,p,x,new Zt)),h&&(v.normal=bi.getInterpolatedAttribute(h,d,m,p,x,new K),v.normal.dot(s.direction)>0&&v.normal.multiplyScalar(-1));const g={a:d,b:m,c:p,normal:new K,materialIndex:0};bi.getNormal(Nu,Lu,Ou,g.normal),v.face=g,v.barycoord=x}return v}class Sy extends zn{constructor(t=null,i=1,s=1,l,u,h,d,m,p=Dn,v=Dn,x,g){super(null,h,d,m,p,v,l,u,x,g),this.isDataTexture=!0,this.image={data:t,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const td=new K,My=new K,yy=new se;class Ns{constructor(t=new K(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,s,l){return this.normal.set(t,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,s){const l=td.subVectors(s,i).cross(My.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i,s=!0){const l=t.delta(td),u=this.normal.dot(l);if(u===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const h=-(t.start.dot(this.normal)+this.constant)/u;return s===!0&&(h<0||h>1)?null:i.copy(t.start).addScaledVector(l,h)}intersectsLine(t){const i=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return i<0&&s>0||s<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const s=i||yy.getNormalMatrix(t),l=this.coplanarPoint(td).applyMatrix4(t),u=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(u),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Us=new _p,Ey=new Zt(.5,.5),Bu=new K;class Sp{constructor(t=new Ns,i=new Ns,s=new Ns,l=new Ns,u=new Ns,h=new Ns){this.planes=[t,i,s,l,u,h]}set(t,i,s,l,u,h){const d=this.planes;return d[0].copy(t),d[1].copy(i),d[2].copy(s),d[3].copy(l),d[4].copy(u),d[5].copy(h),this}copy(t){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,i=Yi,s=!1){const l=this.planes,u=t.elements,h=u[0],d=u[1],m=u[2],p=u[3],v=u[4],x=u[5],g=u[6],E=u[7],T=u[8],D=u[9],y=u[10],S=u[11],L=u[12],z=u[13],C=u[14],I=u[15];if(l[0].setComponents(p-h,E-v,S-T,I-L).normalize(),l[1].setComponents(p+h,E+v,S+T,I+L).normalize(),l[2].setComponents(p+d,E+x,S+D,I+z).normalize(),l[3].setComponents(p-d,E-x,S-D,I-z).normalize(),s)l[4].setComponents(m,g,y,C).normalize(),l[5].setComponents(p-m,E-g,S-y,I-C).normalize();else if(l[4].setComponents(p-m,E-g,S-y,I-C).normalize(),i===Yi)l[5].setComponents(p+m,E+g,S+y,I+C).normalize();else if(i===nl)l[5].setComponents(m,g,y,C).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Us.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Us.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Us)}intersectsSprite(t){Us.center.set(0,0,0);const i=Ey.distanceTo(t.center);return Us.radius=.7071067811865476+i,Us.applyMatrix4(t.matrixWorld),this.intersectsSphere(Us)}intersectsSphere(t){const i=this.planes,s=t.center,l=-t.radius;for(let u=0;u<6;u++)if(i[u].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Bu.x=l.normal.x>0?t.max.x:t.min.x,Bu.y=l.normal.y>0?t.max.y:t.min.y,Bu.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Bu)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Xv extends zn{constructor(t=[],i=Bs,s,l,u,h,d,m,p,v){super(t,i,s,l,u,h,d,m,p,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Mp extends zn{constructor(t,i,s,l,u,h,d,m,p){super(t,i,s,l,u,h,d,m,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Vr extends zn{constructor(t,i,s=Qi,l,u,h,d=Dn,m=Dn,p,v=Ea,x=1){if(v!==Ea&&v!==Is)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:t,height:i,depth:x};super(g,l,u,h,d,m,v,s,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new gp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class by extends Vr{constructor(t,i=Qi,s=Bs,l,u,h=Dn,d=Dn,m,p=Ea){const v={width:t,height:t,depth:1},x=[v,v,v,v,v,v];super(t,t,i,s,l,u,h,d,m,p),this.image=x,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class kv extends zn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class sl extends Vn{constructor(t=1,i=1,s=1,l=1,u=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:s,widthSegments:l,heightSegments:u,depthSegments:h};const d=this;l=Math.floor(l),u=Math.floor(u),h=Math.floor(h);const m=[],p=[],v=[],x=[];let g=0,E=0;T("z","y","x",-1,-1,s,i,t,h,u,0),T("z","y","x",1,-1,s,i,-t,h,u,1),T("x","z","y",1,1,t,s,i,l,h,2),T("x","z","y",1,-1,t,s,-i,l,h,3),T("x","y","z",1,-1,t,i,s,l,u,4),T("x","y","z",-1,-1,t,i,-s,l,u,5),this.setIndex(m),this.setAttribute("position",new rn(p,3)),this.setAttribute("normal",new rn(v,3)),this.setAttribute("uv",new rn(x,2));function T(D,y,S,L,z,C,I,w,P,b,U){const V=C/P,G=I/b,W=C/2,lt=I/2,pt=w/2,j=P+1,B=b+1;let F=0,$=0;const ct=new K;for(let Et=0;Et<B;Et++){const N=Et*G-lt;for(let Z=0;Z<j;Z++){const St=Z*V-W;ct[D]=St*L,ct[y]=N*z,ct[S]=pt,p.push(ct.x,ct.y,ct.z),ct[D]=0,ct[y]=0,ct[S]=w>0?1:-1,v.push(ct.x,ct.y,ct.z),x.push(Z/P),x.push(1-Et/b),F+=1}}for(let Et=0;Et<b;Et++)for(let N=0;N<P;N++){const Z=g+N+j*Et,St=g+N+j*(Et+1),bt=g+(N+1)+j*(Et+1),Nt=g+(N+1)+j*Et;m.push(Z,St,Nt),m.push(St,bt,Nt),$+=6}d.addGroup(E,$,U),E+=$,g+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sl(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class yp extends Vn{constructor(t=1,i=32,s=0,l=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:i,thetaStart:s,thetaLength:l},i=Math.max(3,i);const u=[],h=[],d=[],m=[],p=new K,v=new Zt;h.push(0,0,0),d.push(0,0,1),m.push(.5,.5);for(let x=0,g=3;x<=i;x++,g+=3){const E=s+x/i*l;p.x=t*Math.cos(E),p.y=t*Math.sin(E),h.push(p.x,p.y,p.z),d.push(0,0,1),v.x=(h[g]/t+1)/2,v.y=(h[g+1]/t+1)/2,m.push(v.x,v.y)}for(let x=1;x<=i;x++)u.push(x,x+1,0);this.setIndex(u),this.setAttribute("position",new rn(h,3)),this.setAttribute("normal",new rn(d,3)),this.setAttribute("uv",new rn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yp(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ep extends Vn{constructor(t=1,i=1,s=1,l=32,u=1,h=!1,d=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:i,height:s,radialSegments:l,heightSegments:u,openEnded:h,thetaStart:d,thetaLength:m};const p=this;l=Math.floor(l),u=Math.floor(u);const v=[],x=[],g=[],E=[];let T=0;const D=[],y=s/2;let S=0;L(),h===!1&&(t>0&&z(!0),i>0&&z(!1)),this.setIndex(v),this.setAttribute("position",new rn(x,3)),this.setAttribute("normal",new rn(g,3)),this.setAttribute("uv",new rn(E,2));function L(){const C=new K,I=new K;let w=0;const P=(i-t)/s;for(let b=0;b<=u;b++){const U=[],V=b/u,G=V*(i-t)+t;for(let W=0;W<=l;W++){const lt=W/l,pt=lt*m+d,j=Math.sin(pt),B=Math.cos(pt);I.x=G*j,I.y=-V*s+y,I.z=G*B,x.push(I.x,I.y,I.z),C.set(j,P,B).normalize(),g.push(C.x,C.y,C.z),E.push(lt,1-V),U.push(T++)}D.push(U)}for(let b=0;b<l;b++)for(let U=0;U<u;U++){const V=D[U][b],G=D[U+1][b],W=D[U+1][b+1],lt=D[U][b+1];(t>0||U!==0)&&(v.push(V,G,lt),w+=3),(i>0||U!==u-1)&&(v.push(G,W,lt),w+=3)}p.addGroup(S,w,0),S+=w}function z(C){const I=T,w=new Zt,P=new K;let b=0;const U=C===!0?t:i,V=C===!0?1:-1;for(let W=1;W<=l;W++)x.push(0,y*V,0),g.push(0,V,0),E.push(.5,.5),T++;const G=T;for(let W=0;W<=l;W++){const pt=W/l*m+d,j=Math.cos(pt),B=Math.sin(pt);P.x=U*B,P.y=y*V,P.z=U*j,x.push(P.x,P.y,P.z),g.push(0,V,0),w.x=j*.5+.5,w.y=B*.5*V+.5,E.push(w.x,w.y),T++}for(let W=0;W<l;W++){const lt=I+W,pt=G+W;C===!0?v.push(pt,pt+1,lt):v.push(pt+1,pt,lt),b+=3}p.addGroup(S,b,C===!0?1:2),S+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ep(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class bp extends Vn{constructor(t=[],i=[],s=1,l=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:i,radius:s,detail:l};const u=[],h=[];d(l),p(s),v(),this.setAttribute("position",new rn(u,3)),this.setAttribute("normal",new rn(u.slice(),3)),this.setAttribute("uv",new rn(h,2)),l===0?this.computeVertexNormals():this.normalizeNormals();function d(L){const z=new K,C=new K,I=new K;for(let w=0;w<i.length;w+=3)E(i[w+0],z),E(i[w+1],C),E(i[w+2],I),m(z,C,I,L)}function m(L,z,C,I){const w=I+1,P=[];for(let b=0;b<=w;b++){P[b]=[];const U=L.clone().lerp(C,b/w),V=z.clone().lerp(C,b/w),G=w-b;for(let W=0;W<=G;W++)W===0&&b===w?P[b][W]=U:P[b][W]=U.clone().lerp(V,W/G)}for(let b=0;b<w;b++)for(let U=0;U<2*(w-b)-1;U++){const V=Math.floor(U/2);U%2===0?(g(P[b][V+1]),g(P[b+1][V]),g(P[b][V])):(g(P[b][V+1]),g(P[b+1][V+1]),g(P[b+1][V]))}}function p(L){const z=new K;for(let C=0;C<u.length;C+=3)z.x=u[C+0],z.y=u[C+1],z.z=u[C+2],z.normalize().multiplyScalar(L),u[C+0]=z.x,u[C+1]=z.y,u[C+2]=z.z}function v(){const L=new K;for(let z=0;z<u.length;z+=3){L.x=u[z+0],L.y=u[z+1],L.z=u[z+2];const C=y(L)/2/Math.PI+.5,I=S(L)/Math.PI+.5;h.push(C,1-I)}T(),x()}function x(){for(let L=0;L<h.length;L+=6){const z=h[L+0],C=h[L+2],I=h[L+4],w=Math.max(z,C,I),P=Math.min(z,C,I);w>.9&&P<.1&&(z<.2&&(h[L+0]+=1),C<.2&&(h[L+2]+=1),I<.2&&(h[L+4]+=1))}}function g(L){u.push(L.x,L.y,L.z)}function E(L,z){const C=L*3;z.x=t[C+0],z.y=t[C+1],z.z=t[C+2]}function T(){const L=new K,z=new K,C=new K,I=new K,w=new Zt,P=new Zt,b=new Zt;for(let U=0,V=0;U<u.length;U+=9,V+=6){L.set(u[U+0],u[U+1],u[U+2]),z.set(u[U+3],u[U+4],u[U+5]),C.set(u[U+6],u[U+7],u[U+8]),w.set(h[V+0],h[V+1]),P.set(h[V+2],h[V+3]),b.set(h[V+4],h[V+5]),I.copy(L).add(z).add(C).divideScalar(3);const G=y(I);D(w,V+0,L,G),D(P,V+2,z,G),D(b,V+4,C,G)}}function D(L,z,C,I){I<0&&L.x===1&&(h[z]=L.x-1),C.x===0&&C.z===0&&(h[z]=I/2/Math.PI+.5)}function y(L){return Math.atan2(L.z,-L.x)}function S(L){return Math.atan2(-L.y,Math.sqrt(L.x*L.x+L.z*L.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bp(t.vertices,t.indices,t.radius,t.detail)}}class Tp extends bp{constructor(t=1,i=0){const s=(1+Math.sqrt(5))/2,l=[-1,s,0,1,s,0,-1,-s,0,1,-s,0,0,-1,s,0,1,s,0,-1,-s,0,1,-s,s,0,-1,s,0,1,-s,0,-1,-s,0,1],u=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(l,u,t,i),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:i}}static fromJSON(t){return new Tp(t.radius,t.detail)}}class dc extends Vn{constructor(t=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:s,heightSegments:l};const u=t/2,h=i/2,d=Math.floor(s),m=Math.floor(l),p=d+1,v=m+1,x=t/d,g=i/m,E=[],T=[],D=[],y=[];for(let S=0;S<v;S++){const L=S*g-h;for(let z=0;z<p;z++){const C=z*x-u;T.push(C,-L,0),D.push(0,0,1),y.push(z/d),y.push(1-S/m)}}for(let S=0;S<m;S++)for(let L=0;L<d;L++){const z=L+p*S,C=L+p*(S+1),I=L+1+p*(S+1),w=L+1+p*S;E.push(z,C,w),E.push(C,I,w)}this.setIndex(E),this.setAttribute("position",new rn(T,3)),this.setAttribute("normal",new rn(D,3)),this.setAttribute("uv",new rn(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dc(t.width,t.height,t.widthSegments,t.heightSegments)}}class lc extends Vn{constructor(t=.5,i=1,s=32,l=1,u=0,h=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:i,thetaSegments:s,phiSegments:l,thetaStart:u,thetaLength:h},s=Math.max(3,s),l=Math.max(1,l);const d=[],m=[],p=[],v=[];let x=t;const g=(i-t)/l,E=new K,T=new Zt;for(let D=0;D<=l;D++){for(let y=0;y<=s;y++){const S=u+y/s*h;E.x=x*Math.cos(S),E.y=x*Math.sin(S),m.push(E.x,E.y,E.z),p.push(0,0,1),T.x=(E.x/i+1)/2,T.y=(E.y/i+1)/2,v.push(T.x,T.y)}x+=g}for(let D=0;D<l;D++){const y=D*(s+1);for(let S=0;S<s;S++){const L=S+y,z=L,C=L+s+1,I=L+s+2,w=L+1;d.push(z,C,w),d.push(C,I,w)}}this.setIndex(d),this.setAttribute("position",new rn(m,3)),this.setAttribute("normal",new rn(p,3)),this.setAttribute("uv",new rn(v,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lc(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}function Xr(o){const t={};for(const i in o){t[i]={};for(const s in o[i]){const l=o[i][s];if(X_(l))l.isRenderTargetTexture?(ie("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][s]=null):t[i][s]=l.clone();else if(Array.isArray(l))if(X_(l[0])){const u=[];for(let h=0,d=l.length;h<d;h++)u[h]=l[h].clone();t[i][s]=u}else t[i][s]=l.slice();else t[i][s]=l}}return t}function Hn(o){const t={};for(let i=0;i<o.length;i++){const s=Xr(o[i]);for(const l in s)t[l]=s[l]}return t}function X_(o){return o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)}function Ty(o){const t=[];for(let i=0;i<o.length;i++)t.push(o[i].clone());return t}function Wv(o){const t=o.getRenderTarget();return t===null?o.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Se.workingColorSpace}const il={clone:Xr,merge:Hn};var Ay=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ry=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class In extends qr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ay,this.fragmentShader=Ry,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xr(t.uniforms),this.uniformsGroups=Ty(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(t).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}fromJSON(t,i){if(super.fromJSON(t,i),t.uniforms!==void 0)for(const s in t.uniforms){const l=t.uniforms[s];switch(this.uniforms[s]={},l.type){case"t":this.uniforms[s].value=i[l.value]||null;break;case"c":this.uniforms[s].value=new he().setHex(l.value);break;case"v2":this.uniforms[s].value=new Zt().fromArray(l.value);break;case"v3":this.uniforms[s].value=new K().fromArray(l.value);break;case"v4":this.uniforms[s].value=new an().fromArray(l.value);break;case"m3":this.uniforms[s].value=new se().fromArray(l.value);break;case"m4":this.uniforms[s].value=new sn().fromArray(l.value);break;default:this.uniforms[s].value=l.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const s in t.extensions)this.extensions[s]=t.extensions[s];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class qv extends In{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ko extends qr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new he(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kd,this.normalScale=new Zt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new os,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Cy extends qr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=HM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class wy extends qr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ap extends Un{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new he(t),this.intensity=i}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,i}}const ed=new sn,k_=new K,W_=new K;class Yv{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Zt(512,512),this.mapType=di,this.map=null,this.mapPass=null,this.matrix=new sn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sp,this._frameExtents=new Zt(1,1),this._viewportCount=1,this._viewports=[new an(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera,s=this.matrix;k_.setFromMatrixPosition(t.matrixWorld),i.position.copy(k_),W_.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(W_),i.updateMatrixWorld(),ed.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ed,i.coordinateSystem,i.reversedDepth),i.coordinateSystem===nl||i.reversedDepth?s.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(ed)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Fu=new K,Hu=new Wr,Vi=new K;class Zv extends Un{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new sn,this.projectionMatrix=new sn,this.projectionMatrixInverse=new sn,this.coordinateSystem=Yi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Fu,Hu,Vi),Vi.x===1&&Vi.y===1&&Vi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fu,Hu,Vi.set(1,1,1)).invert()}updateWorldMatrix(t,i,s=!1){super.updateWorldMatrix(t,i,s),this.matrixWorld.decompose(Fu,Hu,Vi),Vi.x===1&&Vi.y===1&&Vi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fu,Hu,Vi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ns=new K,q_=new Zt,Y_=new Zt;class hi extends Zv{constructor(t=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=Jd*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Dh*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Jd*2*Math.atan(Math.tan(Dh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,s){ns.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ns.x,ns.y).multiplyScalar(-t/ns.z),ns.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(ns.x,ns.y).multiplyScalar(-t/ns.z)}getViewSize(t,i){return this.getViewBounds(t,q_,Y_),i.subVectors(Y_,q_)}setViewOffset(t,i,s,l,u,h){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=u,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(Dh*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,u=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,p=h.fullHeight;u+=h.offsetX*l/m,i-=h.offsetY*s/p,l*=h.width/m,s*=h.height/p}const d=this.filmOffset;d!==0&&(u+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(u,u+l,i,i-s,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class Dy extends Yv{constructor(){super(new hi(90,1,.5,500)),this.isPointLightShadow=!0}}class Z_ extends Ap{constructor(t,i,s=0,l=2){super(t,i),this.isPointLight=!0,this.type="PointLight",this.distance=s,this.decay=l,this.shadow=new Dy}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,i){return super.copy(t,i),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const i=super.toJSON(t);return i.object.distance=this.distance,i.object.decay=this.decay,i.object.shadow=this.shadow.toJSON(),i}}class pc extends Zv{constructor(t=-1,i=1,s=1,l=-1,u=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=s,this.bottom=l,this.near=u,this.far=h,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,s,l,u,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=u,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let u=s-t,h=s+t,d=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;u+=p*this.view.offsetX,h=u+p*this.view.width,d-=v*this.view.offsetY,m=d-v*this.view.height}this.projectionMatrix.makeOrthographic(u,h,d,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class Uy extends Yv{constructor(){super(new pc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ny extends Ap{constructor(t,i){super(t,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Un.DEFAULT_UP),this.updateMatrix(),this.target=new Un,this.shadow=new Uy}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const i=super.toJSON(t);return i.object.shadow=this.shadow.toJSON(),i.object.target=this.target.uuid,i}}class Ly extends Ap{constructor(t,i){super(t,i),this.isAmbientLight=!0,this.type="AmbientLight"}}const Or=-90,Pr=1;class Oy extends Un{constructor(t,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new hi(Or,Pr,t,i);l.layers=this.layers,this.add(l);const u=new hi(Or,Pr,t,i);u.layers=this.layers,this.add(u);const h=new hi(Or,Pr,t,i);h.layers=this.layers,this.add(h);const d=new hi(Or,Pr,t,i);d.layers=this.layers,this.add(d);const m=new hi(Or,Pr,t,i);m.layers=this.layers,this.add(m);const p=new hi(Or,Pr,t,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[s,l,u,h,d,m]=i;for(const p of i)this.remove(p);if(t===Yi)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),u.up.set(0,0,-1),u.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===nl)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),u.up.set(0,0,1),u.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of i)this.add(p),p.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[u,h,d,m,p,v]=this.children,x=t.getRenderTarget(),g=t.getActiveCubeFace(),E=t.getActiveMipmapLevel(),T=t.xr.enabled;t.xr.enabled=!1;const D=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let y=!1;t.isWebGLRenderer===!0?y=t.state.buffers.depth.getReversed():y=t.reversedDepthBuffer,t.setRenderTarget(s,0,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,u),t.setRenderTarget(s,1,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,h),t.setRenderTarget(s,2,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,d),t.setRenderTarget(s,3,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,m),t.setRenderTarget(s,4,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,p),s.texture.generateMipmaps=D,t.setRenderTarget(s,5,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,v),t.setRenderTarget(x,g,E),t.xr.enabled=T,s.texture.needsPMREMUpdate=!0}}class Py extends hi{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Iy{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=zy.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function zy(){this._document.hidden===!1&&this.reset()}const Np=class Np{constructor(t,i,s,l){this.elements=[1,0,0,1],t!==void 0&&this.set(t,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(t,i=0){for(let s=0;s<4;s++)this.elements[s]=t[s+i];return this}set(t,i,s,l){const u=this.elements;return u[0]=t,u[2]=i,u[1]=s,u[3]=l,this}};Np.prototype.isMatrix2=!0;let K_=Np;function Q_(o,t,i,s){const l=By(s);switch(i){case Lv:return o*t;case Pv:return o*t/l.components*l.byteLength;case fp:return o*t/l.components*l.byteLength;case Fs:return o*t*2/l.components*l.byteLength;case hp:return o*t*2/l.components*l.byteLength;case Ov:return o*t*3/l.components*l.byteLength;case Oi:return o*t*4/l.components*l.byteLength;case dp:return o*t*4/l.components*l.byteLength;case Zu:case Ku:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case Qu:case Ju:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Sd:case yd:return Math.max(o,16)*Math.max(t,8)/4;case xd:case Md:return Math.max(o,8)*Math.max(t,8)/2;case Ed:case bd:case Ad:case Rd:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case Td:case ec:case Cd:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case wd:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Dd:return Math.floor((o+4)/5)*Math.floor((t+3)/4)*16;case Ud:return Math.floor((o+4)/5)*Math.floor((t+4)/5)*16;case Nd:return Math.floor((o+5)/6)*Math.floor((t+4)/5)*16;case Ld:return Math.floor((o+5)/6)*Math.floor((t+5)/6)*16;case Od:return Math.floor((o+7)/8)*Math.floor((t+4)/5)*16;case Pd:return Math.floor((o+7)/8)*Math.floor((t+5)/6)*16;case Id:return Math.floor((o+7)/8)*Math.floor((t+7)/8)*16;case zd:return Math.floor((o+9)/10)*Math.floor((t+4)/5)*16;case Bd:return Math.floor((o+9)/10)*Math.floor((t+5)/6)*16;case Fd:return Math.floor((o+9)/10)*Math.floor((t+7)/8)*16;case Hd:return Math.floor((o+9)/10)*Math.floor((t+9)/10)*16;case Gd:return Math.floor((o+11)/12)*Math.floor((t+9)/10)*16;case Vd:return Math.floor((o+11)/12)*Math.floor((t+11)/12)*16;case Xd:case kd:case Wd:return Math.ceil(o/4)*Math.ceil(t/4)*16;case qd:case Yd:return Math.ceil(o/4)*Math.ceil(t/4)*8;case nc:case Zd:return Math.ceil(o/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function By(o){switch(o){case di:case wv:return{byteLength:1,components:1};case tl:case Dv:case pi:return{byteLength:2,components:1};case up:case cp:return{byteLength:2,components:4};case Qi:case lp:case qi:return{byteLength:4,components:1};case Uv:case Nv:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ep}}));typeof window<"u"&&(window.__THREE__?ie("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ep);function Kv(){let o=null,t=!1,i=null,s=null;function l(u,h){i(u,h),s=o.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&o!==null&&(s=o.requestAnimationFrame(l),t=!0)},stop:function(){o!==null&&o.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(u){i=u},setContext:function(u){o=u}}}function Fy(o){const t=new WeakMap;function i(d,m){const p=d.array,v=d.usage,x=p.byteLength,g=o.createBuffer();o.bindBuffer(m,g),o.bufferData(m,p,v),d.onUploadCallback();let E;if(p instanceof Float32Array)E=o.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)E=o.HALF_FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?E=o.HALF_FLOAT:E=o.UNSIGNED_SHORT;else if(p instanceof Int16Array)E=o.SHORT;else if(p instanceof Uint32Array)E=o.UNSIGNED_INT;else if(p instanceof Int32Array)E=o.INT;else if(p instanceof Int8Array)E=o.BYTE;else if(p instanceof Uint8Array)E=o.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)E=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:g,type:E,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:x}}function s(d,m,p){const v=m.array,x=m.updateRanges;if(o.bindBuffer(p,d),x.length===0)o.bufferSubData(p,0,v);else{x.sort((E,T)=>E.start-T.start);let g=0;for(let E=1;E<x.length;E++){const T=x[g],D=x[E];D.start<=T.start+T.count+1?T.count=Math.max(T.count,D.start+D.count-T.start):(++g,x[g]=D)}x.length=g+1;for(let E=0,T=x.length;E<T;E++){const D=x[E];o.bufferSubData(p,D.start*v.BYTES_PER_ELEMENT,v,D.start,D.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function u(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=t.get(d);m&&(o.deleteBuffer(m.buffer),t.delete(d))}function h(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const v=t.get(d);(!v||v.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=t.get(d);if(p===void 0)t.set(d,i(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,d,m),p.version=d.version}}return{get:l,remove:u,update:h}}var Hy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Vy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Xy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ky=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Wy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Yy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zy=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Ky=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,$y=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,tE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,eE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,nE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,iE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,aE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,rE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,oE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,lE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,uE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,fE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,hE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gE="gl_FragColor = linearToOutputTexel( gl_FragColor );",_E=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,xE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,SE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ME=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,EE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,TE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,AE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,RE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,CE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,DE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,UE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,NE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,LE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,OE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,PE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,IE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,BE=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,FE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,HE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,GE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,VE=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,XE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,kE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,WE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,YE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ZE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,KE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,QE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,JE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$E=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,eb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nb=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ib=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ab=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,sb=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,rb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ob=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ub=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,cb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,fb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,db=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mb=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,gb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_b=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Eb=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Tb=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ab=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Cb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Db=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ub=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Nb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Lb=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ob=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Pb=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ib=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Fb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Hb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xb=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Yb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Zb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Kb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Qb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$b=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,eT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,sT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rT=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,oT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,lT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,fT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,mT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_T=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,fe={alphahash_fragment:Hy,alphahash_pars_fragment:Gy,alphamap_fragment:Vy,alphamap_pars_fragment:Xy,alphatest_fragment:ky,alphatest_pars_fragment:Wy,aomap_fragment:qy,aomap_pars_fragment:Yy,batching_pars_vertex:Zy,batching_vertex:Ky,begin_vertex:Qy,beginnormal_vertex:Jy,bsdfs:jy,iridescence_fragment:$y,bumpmap_pars_fragment:tE,clipping_planes_fragment:eE,clipping_planes_pars_fragment:nE,clipping_planes_pars_vertex:iE,clipping_planes_vertex:aE,color_fragment:sE,color_pars_fragment:rE,color_pars_vertex:oE,color_vertex:lE,common:uE,cube_uv_reflection_fragment:cE,defaultnormal_vertex:fE,displacementmap_pars_vertex:hE,displacementmap_vertex:dE,emissivemap_fragment:pE,emissivemap_pars_fragment:mE,colorspace_fragment:gE,colorspace_pars_fragment:_E,envmap_fragment:vE,envmap_common_pars_fragment:xE,envmap_pars_fragment:SE,envmap_pars_vertex:ME,envmap_physical_pars_fragment:NE,envmap_vertex:yE,fog_vertex:EE,fog_pars_vertex:bE,fog_fragment:TE,fog_pars_fragment:AE,gradientmap_pars_fragment:RE,lightmap_pars_fragment:CE,lights_lambert_fragment:wE,lights_lambert_pars_fragment:DE,lights_pars_begin:UE,lights_toon_fragment:LE,lights_toon_pars_fragment:OE,lights_phong_fragment:PE,lights_phong_pars_fragment:IE,lights_physical_fragment:zE,lights_physical_pars_fragment:BE,lights_fragment_begin:FE,lights_fragment_maps:HE,lights_fragment_end:GE,lightprobes_pars_fragment:VE,logdepthbuf_fragment:XE,logdepthbuf_pars_fragment:kE,logdepthbuf_pars_vertex:WE,logdepthbuf_vertex:qE,map_fragment:YE,map_pars_fragment:ZE,map_particle_fragment:KE,map_particle_pars_fragment:QE,metalnessmap_fragment:JE,metalnessmap_pars_fragment:jE,morphinstance_vertex:$E,morphcolor_vertex:tb,morphnormal_vertex:eb,morphtarget_pars_vertex:nb,morphtarget_vertex:ib,normal_fragment_begin:ab,normal_fragment_maps:sb,normal_pars_fragment:rb,normal_pars_vertex:ob,normal_vertex:lb,normalmap_pars_fragment:ub,clearcoat_normal_fragment_begin:cb,clearcoat_normal_fragment_maps:fb,clearcoat_pars_fragment:hb,iridescence_pars_fragment:db,opaque_fragment:pb,packing:mb,premultiplied_alpha_fragment:gb,project_vertex:_b,dithering_fragment:vb,dithering_pars_fragment:xb,roughnessmap_fragment:Sb,roughnessmap_pars_fragment:Mb,shadowmap_pars_fragment:yb,shadowmap_pars_vertex:Eb,shadowmap_vertex:bb,shadowmask_pars_fragment:Tb,skinbase_vertex:Ab,skinning_pars_vertex:Rb,skinning_vertex:Cb,skinnormal_vertex:wb,specularmap_fragment:Db,specularmap_pars_fragment:Ub,tonemapping_fragment:Nb,tonemapping_pars_fragment:Lb,transmission_fragment:Ob,transmission_pars_fragment:Pb,uv_pars_fragment:Ib,uv_pars_vertex:zb,uv_vertex:Bb,worldpos_vertex:Fb,background_vert:Hb,background_frag:Gb,backgroundCube_vert:Vb,backgroundCube_frag:Xb,cube_vert:kb,cube_frag:Wb,depth_vert:qb,depth_frag:Yb,distance_vert:Zb,distance_frag:Kb,equirect_vert:Qb,equirect_frag:Jb,linedashed_vert:jb,linedashed_frag:$b,meshbasic_vert:tT,meshbasic_frag:eT,meshlambert_vert:nT,meshlambert_frag:iT,meshmatcap_vert:aT,meshmatcap_frag:sT,meshnormal_vert:rT,meshnormal_frag:oT,meshphong_vert:lT,meshphong_frag:uT,meshphysical_vert:cT,meshphysical_frag:fT,meshtoon_vert:hT,meshtoon_frag:dT,points_vert:pT,points_frag:mT,shadow_vert:gT,shadow_frag:_T,sprite_vert:vT,sprite_frag:xT},Pt={common:{diffuse:{value:new he(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new se},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new se}},envmap:{envMap:{value:null},envMapRotation:{value:new se},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new se}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new se}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new se},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new se},normalScale:{value:new Zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new se},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new se}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new se}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new se}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new he(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new K},probesMax:{value:new K},probesResolution:{value:new K}},points:{diffuse:{value:new he(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0},uvTransform:{value:new se}},sprite:{diffuse:{value:new he(16777215)},opacity:{value:1},center:{value:new Zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new se},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0}}},ki={basic:{uniforms:Hn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.fog]),vertexShader:fe.meshbasic_vert,fragmentShader:fe.meshbasic_frag},lambert:{uniforms:Hn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new he(0)},envMapIntensity:{value:1}}]),vertexShader:fe.meshlambert_vert,fragmentShader:fe.meshlambert_frag},phong:{uniforms:Hn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new he(0)},specular:{value:new he(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:fe.meshphong_vert,fragmentShader:fe.meshphong_frag},standard:{uniforms:Hn([Pt.common,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.roughnessmap,Pt.metalnessmap,Pt.fog,Pt.lights,{emissive:{value:new he(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:fe.meshphysical_vert,fragmentShader:fe.meshphysical_frag},toon:{uniforms:Hn([Pt.common,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.gradientmap,Pt.fog,Pt.lights,{emissive:{value:new he(0)}}]),vertexShader:fe.meshtoon_vert,fragmentShader:fe.meshtoon_frag},matcap:{uniforms:Hn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,{matcap:{value:null}}]),vertexShader:fe.meshmatcap_vert,fragmentShader:fe.meshmatcap_frag},points:{uniforms:Hn([Pt.points,Pt.fog]),vertexShader:fe.points_vert,fragmentShader:fe.points_frag},dashed:{uniforms:Hn([Pt.common,Pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:fe.linedashed_vert,fragmentShader:fe.linedashed_frag},depth:{uniforms:Hn([Pt.common,Pt.displacementmap]),vertexShader:fe.depth_vert,fragmentShader:fe.depth_frag},normal:{uniforms:Hn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,{opacity:{value:1}}]),vertexShader:fe.meshnormal_vert,fragmentShader:fe.meshnormal_frag},sprite:{uniforms:Hn([Pt.sprite,Pt.fog]),vertexShader:fe.sprite_vert,fragmentShader:fe.sprite_frag},background:{uniforms:{uvTransform:{value:new se},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:fe.background_vert,fragmentShader:fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new se}},vertexShader:fe.backgroundCube_vert,fragmentShader:fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:fe.cube_vert,fragmentShader:fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:fe.equirect_vert,fragmentShader:fe.equirect_frag},distance:{uniforms:Hn([Pt.common,Pt.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:fe.distance_vert,fragmentShader:fe.distance_frag},shadow:{uniforms:Hn([Pt.lights,Pt.fog,{color:{value:new he(0)},opacity:{value:1}}]),vertexShader:fe.shadow_vert,fragmentShader:fe.shadow_frag}};ki.physical={uniforms:Hn([ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new se},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new se},clearcoatNormalScale:{value:new Zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new se},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new se},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new se},sheen:{value:0},sheenColor:{value:new he(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new se},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new se},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new se},transmissionSamplerSize:{value:new Zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new se},attenuationDistance:{value:0},attenuationColor:{value:new he(0)},specularColor:{value:new he(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new se},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new se},anisotropyVector:{value:new Zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new se}}]),vertexShader:fe.meshphysical_vert,fragmentShader:fe.meshphysical_frag};const Gu={r:0,b:0,g:0},ST=new sn,Qv=new se;Qv.set(-1,0,0,0,1,0,0,0,1);function MT(o,t,i,s,l,u){const h=new he(0);let d=l===!0?0:1,m,p,v=null,x=0,g=null;function E(L){let z=L.isScene===!0?L.background:null;if(z&&z.isTexture){const C=L.backgroundBlurriness>0;z=t.get(z,C)}return z}function T(L){let z=!1;const C=E(L);C===null?y(h,d):C&&C.isColor&&(y(C,1),z=!0);const I=o.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,u):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,u),(o.autoClear||z)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function D(L,z){const C=E(z);C&&(C.isCubeTexture||C.mapping===fc)?(p===void 0&&(p=new Gn(new sl(1,1,1),new In({name:"BackgroundCubeMaterial",uniforms:Xr(ki.backgroundCube.uniforms),vertexShader:ki.backgroundCube.vertexShader,fragmentShader:ki.backgroundCube.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(I,w,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(p)),p.material.uniforms.envMap.value=C,p.material.uniforms.backgroundBlurriness.value=z.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=z.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(ST.makeRotationFromEuler(z.backgroundRotation)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(Qv),p.material.toneMapped=Se.getTransfer(C.colorSpace)!==Ne,(v!==C||x!==C.version||g!==o.toneMapping)&&(p.material.needsUpdate=!0,v=C,x=C.version,g=o.toneMapping),p.layers.enableAll(),L.unshift(p,p.geometry,p.material,0,0,null)):C&&C.isTexture&&(m===void 0&&(m=new Gn(new dc(2,2),new In({name:"BackgroundMaterial",uniforms:Xr(ki.background.uniforms),vertexShader:ki.background.vertexShader,fragmentShader:ki.background.fragmentShader,side:rs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=C,m.material.uniforms.backgroundIntensity.value=z.backgroundIntensity,m.material.toneMapped=Se.getTransfer(C.colorSpace)!==Ne,C.matrixAutoUpdate===!0&&C.updateMatrix(),m.material.uniforms.uvTransform.value.copy(C.matrix),(v!==C||x!==C.version||g!==o.toneMapping)&&(m.material.needsUpdate=!0,v=C,x=C.version,g=o.toneMapping),m.layers.enableAll(),L.unshift(m,m.geometry,m.material,0,0,null))}function y(L,z){L.getRGB(Gu,Wv(o)),i.buffers.color.setClear(Gu.r,Gu.g,Gu.b,z,u)}function S(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return h},setClearColor:function(L,z=1){h.set(L),d=z,y(h,d)},getClearAlpha:function(){return d},setClearAlpha:function(L){d=L,y(h,d)},render:T,addToRenderList:D,dispose:S}}function yT(o,t){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),s={},l=g(null);let u=l,h=!1;function d(G,W,lt,pt,j){let B=!1;const F=x(G,pt,lt,W);u!==F&&(u=F,p(u.object)),B=E(G,pt,lt,j),B&&T(G,pt,lt,j),j!==null&&t.update(j,o.ELEMENT_ARRAY_BUFFER),(B||h)&&(h=!1,C(G,W,lt,pt),j!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,t.get(j).buffer))}function m(){return o.createVertexArray()}function p(G){return o.bindVertexArray(G)}function v(G){return o.deleteVertexArray(G)}function x(G,W,lt,pt){const j=pt.wireframe===!0;let B=s[W.id];B===void 0&&(B={},s[W.id]=B);const F=G.isInstancedMesh===!0?G.id:0;let $=B[F];$===void 0&&($={},B[F]=$);let ct=$[lt.id];ct===void 0&&(ct={},$[lt.id]=ct);let Et=ct[j];return Et===void 0&&(Et=g(m()),ct[j]=Et),Et}function g(G){const W=[],lt=[],pt=[];for(let j=0;j<i;j++)W[j]=0,lt[j]=0,pt[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:lt,attributeDivisors:pt,object:G,attributes:{},index:null}}function E(G,W,lt,pt){const j=u.attributes,B=W.attributes;let F=0;const $=lt.getAttributes();for(const ct in $)if($[ct].location>=0){const N=j[ct];let Z=B[ct];if(Z===void 0&&(ct==="instanceMatrix"&&G.instanceMatrix&&(Z=G.instanceMatrix),ct==="instanceColor"&&G.instanceColor&&(Z=G.instanceColor)),N===void 0||N.attribute!==Z||Z&&N.data!==Z.data)return!0;F++}return u.attributesNum!==F||u.index!==pt}function T(G,W,lt,pt){const j={},B=W.attributes;let F=0;const $=lt.getAttributes();for(const ct in $)if($[ct].location>=0){let N=B[ct];N===void 0&&(ct==="instanceMatrix"&&G.instanceMatrix&&(N=G.instanceMatrix),ct==="instanceColor"&&G.instanceColor&&(N=G.instanceColor));const Z={};Z.attribute=N,N&&N.data&&(Z.data=N.data),j[ct]=Z,F++}u.attributes=j,u.attributesNum=F,u.index=pt}function D(){const G=u.newAttributes;for(let W=0,lt=G.length;W<lt;W++)G[W]=0}function y(G){S(G,0)}function S(G,W){const lt=u.newAttributes,pt=u.enabledAttributes,j=u.attributeDivisors;lt[G]=1,pt[G]===0&&(o.enableVertexAttribArray(G),pt[G]=1),j[G]!==W&&(o.vertexAttribDivisor(G,W),j[G]=W)}function L(){const G=u.newAttributes,W=u.enabledAttributes;for(let lt=0,pt=W.length;lt<pt;lt++)W[lt]!==G[lt]&&(o.disableVertexAttribArray(lt),W[lt]=0)}function z(G,W,lt,pt,j,B,F){F===!0?o.vertexAttribIPointer(G,W,lt,j,B):o.vertexAttribPointer(G,W,lt,pt,j,B)}function C(G,W,lt,pt){D();const j=pt.attributes,B=lt.getAttributes(),F=W.defaultAttributeValues;for(const $ in B){const ct=B[$];if(ct.location>=0){let Et=j[$];if(Et===void 0&&($==="instanceMatrix"&&G.instanceMatrix&&(Et=G.instanceMatrix),$==="instanceColor"&&G.instanceColor&&(Et=G.instanceColor)),Et!==void 0){const N=Et.normalized,Z=Et.itemSize,St=t.get(Et);if(St===void 0)continue;const bt=St.buffer,Nt=St.type,tt=St.bytesPerElement,xt=Nt===o.INT||Nt===o.UNSIGNED_INT||Et.gpuType===lp;if(Et.isInterleavedBufferAttribute){const Mt=Et.data,zt=Mt.stride,te=Et.offset;if(Mt.isInstancedInterleavedBuffer){for(let Kt=0;Kt<ct.locationSize;Kt++)S(ct.location+Kt,Mt.meshPerAttribute);G.isInstancedMesh!==!0&&pt._maxInstanceCount===void 0&&(pt._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let Kt=0;Kt<ct.locationSize;Kt++)y(ct.location+Kt);o.bindBuffer(o.ARRAY_BUFFER,bt);for(let Kt=0;Kt<ct.locationSize;Kt++)z(ct.location+Kt,Z/ct.locationSize,Nt,N,zt*tt,(te+Z/ct.locationSize*Kt)*tt,xt)}else{if(Et.isInstancedBufferAttribute){for(let Mt=0;Mt<ct.locationSize;Mt++)S(ct.location+Mt,Et.meshPerAttribute);G.isInstancedMesh!==!0&&pt._maxInstanceCount===void 0&&(pt._maxInstanceCount=Et.meshPerAttribute*Et.count)}else for(let Mt=0;Mt<ct.locationSize;Mt++)y(ct.location+Mt);o.bindBuffer(o.ARRAY_BUFFER,bt);for(let Mt=0;Mt<ct.locationSize;Mt++)z(ct.location+Mt,Z/ct.locationSize,Nt,N,Z*tt,Z/ct.locationSize*Mt*tt,xt)}}else if(F!==void 0){const N=F[$];if(N!==void 0)switch(N.length){case 2:o.vertexAttrib2fv(ct.location,N);break;case 3:o.vertexAttrib3fv(ct.location,N);break;case 4:o.vertexAttrib4fv(ct.location,N);break;default:o.vertexAttrib1fv(ct.location,N)}}}}L()}function I(){U();for(const G in s){const W=s[G];for(const lt in W){const pt=W[lt];for(const j in pt){const B=pt[j];for(const F in B)v(B[F].object),delete B[F];delete pt[j]}}delete s[G]}}function w(G){if(s[G.id]===void 0)return;const W=s[G.id];for(const lt in W){const pt=W[lt];for(const j in pt){const B=pt[j];for(const F in B)v(B[F].object),delete B[F];delete pt[j]}}delete s[G.id]}function P(G){for(const W in s){const lt=s[W];for(const pt in lt){const j=lt[pt];if(j[G.id]===void 0)continue;const B=j[G.id];for(const F in B)v(B[F].object),delete B[F];delete j[G.id]}}}function b(G){for(const W in s){const lt=s[W],pt=G.isInstancedMesh===!0?G.id:0,j=lt[pt];if(j!==void 0){for(const B in j){const F=j[B];for(const $ in F)v(F[$].object),delete F[$];delete j[B]}delete lt[pt],Object.keys(lt).length===0&&delete s[W]}}}function U(){V(),h=!0,u!==l&&(u=l,p(u.object))}function V(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:U,resetDefaultState:V,dispose:I,releaseStatesOfGeometry:w,releaseStatesOfObject:b,releaseStatesOfProgram:P,initAttributes:D,enableAttribute:y,disableUnusedAttributes:L}}function ET(o,t,i){let s;function l(m){s=m}function u(m,p){o.drawArrays(s,m,p),i.update(p,s,1)}function h(m,p,v){v!==0&&(o.drawArraysInstanced(s,m,p,v),i.update(p,s,v))}function d(m,p,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,p,0,v);let g=0;for(let E=0;E<v;E++)g+=p[E];i.update(g,s,1)}this.setMode=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=d}function bT(o,t,i,s){let l;function u(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");l=o.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(P){return!(P!==Oi&&s.convert(P)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(P){const b=P===pi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==di&&s.convert(P)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==qi&&!b)}function m(P){if(P==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const v=m(p);v!==p&&(ie("WebGLRenderer:",p,"not supported, using",v,"instead."),p=v);const x=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control");i.reversedDepthBuffer===!0&&g===!1&&ie("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const E=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),T=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),D=o.getParameter(o.MAX_TEXTURE_SIZE),y=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),S=o.getParameter(o.MAX_VERTEX_ATTRIBS),L=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),z=o.getParameter(o.MAX_VARYING_VECTORS),C=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),I=o.getParameter(o.MAX_SAMPLES),w=o.getParameter(o.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:u,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:x,reversedDepthBuffer:g,maxTextures:E,maxVertexTextures:T,maxTextureSize:D,maxCubemapSize:y,maxAttributes:S,maxVertexUniforms:L,maxVaryings:z,maxFragmentUniforms:C,maxSamples:I,samples:w}}function TT(o){const t=this;let i=null,s=0,l=!1,u=!1;const h=new Ns,d=new se,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(x,g){const E=x.length!==0||g||s!==0||l;return l=g,s=x.length,E},this.beginShadows=function(){u=!0,v(null)},this.endShadows=function(){u=!1},this.setGlobalState=function(x,g){i=v(x,g,0)},this.setState=function(x,g,E){const T=x.clippingPlanes,D=x.clipIntersection,y=x.clipShadows,S=o.get(x);if(!l||T===null||T.length===0||u&&!y)u?v(null):p();else{const L=u?0:s,z=L*4;let C=S.clippingState||null;m.value=C,C=v(T,g,z,E);for(let I=0;I!==z;++I)C[I]=i[I];S.clippingState=C,this.numIntersection=D?this.numPlanes:0,this.numPlanes+=L}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function v(x,g,E,T){const D=x!==null?x.length:0;let y=null;if(D!==0){if(y=m.value,T!==!0||y===null){const S=E+D*4,L=g.matrixWorldInverse;d.getNormalMatrix(L),(y===null||y.length<S)&&(y=new Float32Array(S));for(let z=0,C=E;z!==D;++z,C+=4)h.copy(x[z]).applyMatrix4(L,d),h.normal.toArray(y,C),y[C+3]=h.constant}m.value=y,m.needsUpdate=!0}return t.numPlanes=D,t.numIntersection=0,y}}const as=4,J_=[.125,.215,.35,.446,.526,.582],Os=20,AT=256,Qo=new pc,j_=new he;let nd=null,id=0,ad=0,sd=!1;const RT=new K;class $_{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,i=0,s=.1,l=100,u={}){const{size:h=256,position:d=RT}=u;nd=this._renderer.getRenderTarget(),id=this._renderer.getActiveCubeFace(),ad=this._renderer.getActiveMipmapLevel(),sd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,s,l,m,d),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ev(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(nd,id,ad),this._renderer.xr.enabled=sd,t.scissorTest=!1,Ir(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===Bs||t.mapping===Gr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),nd=this._renderer.getRenderTarget(),id=this._renderer.getActiveCubeFace(),ad=this._renderer.getActiveMipmapLevel(),sd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:pi,format:Oi,colorSpace:ic,depthBuffer:!1},l=tv(t,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tv(t,i,s);const{_lodMax:u}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=CT(u)),this._blurMaterial=DT(u,t,i),this._ggxMaterial=wT(u,t,i)}return l}_compileMaterial(t){const i=new Gn(new Vn,t);this._renderer.compile(i,Qo)}_sceneToCubeUV(t,i,s,l,u){const m=new hi(90,1,i,s),p=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],x=this._renderer,g=x.autoClear,E=x.toneMapping;x.getClearColor(j_),x.toneMapping=Ki,x.autoClear=!1,x.state.buffers.depth.getReversed()&&(x.setRenderTarget(l),x.clearDepth(),x.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Gn(new sl,new xp({name:"PMREM.Background",side:Jn,depthWrite:!1,depthTest:!1})));const D=this._backgroundBox,y=D.material;let S=!1;const L=t.background;L?L.isColor&&(y.color.copy(L),t.background=null,S=!0):(y.color.copy(j_),S=!0);for(let z=0;z<6;z++){const C=z%3;C===0?(m.up.set(0,p[z],0),m.position.set(u.x,u.y,u.z),m.lookAt(u.x+v[z],u.y,u.z)):C===1?(m.up.set(0,0,p[z]),m.position.set(u.x,u.y,u.z),m.lookAt(u.x,u.y+v[z],u.z)):(m.up.set(0,p[z],0),m.position.set(u.x,u.y,u.z),m.lookAt(u.x,u.y,u.z+v[z]));const I=this._cubeSize;Ir(l,C*I,z>2?I:0,I,I),x.setRenderTarget(l),S&&x.render(D,m),x.render(t,m)}x.toneMapping=E,x.autoClear=g,t.background=L}_textureToCubeUV(t,i){const s=this._renderer,l=t.mapping===Bs||t.mapping===Gr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=nv()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ev());const u=l?this._cubemapMaterial:this._equirectMaterial,h=this._lodMeshes[0];h.material=u;const d=u.uniforms;d.envMap.value=t;const m=this._cubeSize;Ir(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(h,Qo)}_applyPMREM(t){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let u=1;u<l;u++)this._applyGGXFilter(t,u-1,u);i.autoClear=s}_applyGGXFilter(t,i,s){const l=this._renderer,u=this._pingPongRenderTarget,h=this._ggxMaterial,d=this._lodMeshes[s];d.material=h;const m=h.uniforms,p=s/(this._lodMeshes.length-1),v=i/(this._lodMeshes.length-1),x=Math.sqrt(p*p-v*v),g=0+p*1.25,E=x*g,{_lodMax:T}=this,D=this._sizeLods[s],y=3*D*(s>T-as?s-T+as:0),S=4*(this._cubeSize-D);m.envMap.value=t.texture,m.roughness.value=E,m.mipInt.value=T-i,Ir(u,y,S,3*D,2*D),l.setRenderTarget(u),l.render(d,Qo),m.envMap.value=u.texture,m.roughness.value=0,m.mipInt.value=T-s,Ir(t,y,S,3*D,2*D),l.setRenderTarget(t),l.render(d,Qo)}_blur(t,i,s,l,u){const h=this._pingPongRenderTarget;this._halfBlur(t,h,i,s,l,"latitudinal",u),this._halfBlur(h,t,s,s,l,"longitudinal",u)}_halfBlur(t,i,s,l,u,h,d){const m=this._renderer,p=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&be("blur direction must be either latitudinal or longitudinal!");const v=3,x=this._lodMeshes[l];x.material=p;const g=p.uniforms,E=this._sizeLods[s]-1,T=isFinite(u)?Math.PI/(2*E):2*Math.PI/(2*Os-1),D=u/T,y=isFinite(u)?1+Math.floor(v*D):Os;y>Os&&ie(`sigmaRadians, ${u}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Os}`);const S=[];let L=0;for(let P=0;P<Os;++P){const b=P/D,U=Math.exp(-b*b/2);S.push(U),P===0?L+=U:P<y&&(L+=2*U)}for(let P=0;P<S.length;P++)S[P]=S[P]/L;g.envMap.value=t.texture,g.samples.value=y,g.weights.value=S,g.latitudinal.value=h==="latitudinal",d&&(g.poleAxis.value=d);const{_lodMax:z}=this;g.dTheta.value=T,g.mipInt.value=z-s;const C=this._sizeLods[l],I=3*C*(l>z-as?l-z+as:0),w=4*(this._cubeSize-C);Ir(i,I,w,3*C,2*C),m.setRenderTarget(i),m.render(x,Qo)}}function CT(o){const t=[],i=[],s=[];let l=o;const u=o-as+1+J_.length;for(let h=0;h<u;h++){const d=Math.pow(2,l);t.push(d);let m=1/d;h>o-as?m=J_[h-o+as-1]:h===0&&(m=0),i.push(m);const p=1/(d-2),v=-p,x=1+p,g=[v,v,x,v,x,x,v,v,x,x,v,x],E=6,T=6,D=3,y=2,S=1,L=new Float32Array(D*T*E),z=new Float32Array(y*T*E),C=new Float32Array(S*T*E);for(let w=0;w<E;w++){const P=w%3*2/3-1,b=w>2?0:-1,U=[P,b,0,P+2/3,b,0,P+2/3,b+1,0,P,b,0,P+2/3,b+1,0,P,b+1,0];L.set(U,D*T*w),z.set(g,y*T*w);const V=[w,w,w,w,w,w];C.set(V,S*T*w)}const I=new Vn;I.setAttribute("position",new Pi(L,D)),I.setAttribute("uv",new Pi(z,y)),I.setAttribute("faceIndex",new Pi(C,S)),s.push(new Gn(I,null)),l>as&&l--}return{lodMeshes:s,sizeLods:t,sigmas:i}}function tv(o,t,i){const s=new jn(o,t,i);return s.texture.mapping=fc,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Ir(o,t,i,s,l){o.viewport.set(t,i,s,l),o.scissor.set(t,i,s,l)}function wT(o,t,i){return new In({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:AT,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:mc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function DT(o,t,i){const s=new Float32Array(Os),l=new K(0,1,0);return new In({name:"SphericalGaussianBlur",defines:{n:Os,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function ev(){return new In({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function nv(){return new In({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function mc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Jv extends jn{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new Xv(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new sl(5,5,5),u=new In({name:"CubemapFromEquirect",uniforms:Xr(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Jn,blending:Zi});u.uniforms.tEquirect.value=i;const h=new Gn(l,u),d=i.minFilter;return i.minFilter===Ps&&(i.minFilter=vn),new Oy(1,10,this).update(t,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(t,i=!0,s=!0,l=!0){const u=t.getRenderTarget();for(let h=0;h<6;h++)t.setRenderTarget(this,h),t.clear(i,s,l);t.setRenderTarget(u)}}function UT(o){let t=new WeakMap,i=new WeakMap,s=null;function l(g,E=!1){return g==null?null:E?h(g):u(g)}function u(g){if(g&&g.isTexture){const E=g.mapping;if(E===Rh||E===Ch)if(t.has(g)){const T=t.get(g).texture;return d(T,g.mapping)}else{const T=g.image;if(T&&T.height>0){const D=new Jv(T.height);return D.fromEquirectangularTexture(o,g),t.set(g,D),g.addEventListener("dispose",p),d(D.texture,g.mapping)}else return null}}return g}function h(g){if(g&&g.isTexture){const E=g.mapping,T=E===Rh||E===Ch,D=E===Bs||E===Gr;if(T||D){let y=i.get(g);const S=y!==void 0?y.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==S)return s===null&&(s=new $_(o)),y=T?s.fromEquirectangular(g,y):s.fromCubemap(g,y),y.texture.pmremVersion=g.pmremVersion,i.set(g,y),y.texture;if(y!==void 0)return y.texture;{const L=g.image;return T&&L&&L.height>0||D&&L&&m(L)?(s===null&&(s=new $_(o)),y=T?s.fromEquirectangular(g):s.fromCubemap(g),y.texture.pmremVersion=g.pmremVersion,i.set(g,y),g.addEventListener("dispose",v),y.texture):null}}}return g}function d(g,E){return E===Rh?g.mapping=Bs:E===Ch&&(g.mapping=Gr),g}function m(g){let E=0;const T=6;for(let D=0;D<T;D++)g[D]!==void 0&&E++;return E===T}function p(g){const E=g.target;E.removeEventListener("dispose",p);const T=t.get(E);T!==void 0&&(t.delete(E),T.dispose())}function v(g){const E=g.target;E.removeEventListener("dispose",v);const T=i.get(E);T!==void 0&&(i.delete(E),T.dispose())}function x(){t=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:x}}function NT(o){const t={};function i(s){if(t[s]!==void 0)return t[s];const l=o.getExtension(s);return t[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&Br("WebGLRenderer: "+s+" extension not supported."),l}}}function LT(o,t,i,s){const l={},u=new WeakMap;function h(x){const g=x.target;g.index!==null&&t.remove(g.index);for(const T in g.attributes)t.remove(g.attributes[T]);g.removeEventListener("dispose",h),delete l[g.id];const E=u.get(g);E&&(t.remove(E),u.delete(g)),s.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function d(x,g){return l[g.id]===!0||(g.addEventListener("dispose",h),l[g.id]=!0,i.memory.geometries++),g}function m(x){const g=x.attributes;for(const E in g)t.update(g[E],o.ARRAY_BUFFER)}function p(x){const g=[],E=x.index,T=x.attributes.position;let D=0;if(T===void 0)return;if(E!==null){const L=E.array;D=E.version;for(let z=0,C=L.length;z<C;z+=3){const I=L[z+0],w=L[z+1],P=L[z+2];g.push(I,w,w,P,P,I)}}else{const L=T.array;D=T.version;for(let z=0,C=L.length/3-1;z<C;z+=3){const I=z+0,w=z+1,P=z+2;g.push(I,w,w,P,P,I)}}const y=new(T.count>=65535?Gv:Hv)(g,1);y.version=D;const S=u.get(x);S&&t.remove(S),u.set(x,y)}function v(x){const g=u.get(x);if(g){const E=x.index;E!==null&&g.version<E.version&&p(x)}else p(x);return u.get(x)}return{get:d,update:m,getWireframeAttribute:v}}function OT(o,t,i){let s;function l(x){s=x}let u,h;function d(x){u=x.type,h=x.bytesPerElement}function m(x,g){o.drawElements(s,g,u,x*h),i.update(g,s,1)}function p(x,g,E){E!==0&&(o.drawElementsInstanced(s,g,u,x*h,E),i.update(g,s,E))}function v(x,g,E){if(E===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,g,0,u,x,0,E);let D=0;for(let y=0;y<E;y++)D+=g[y];i.update(D,s,1)}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=v}function PT(o){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(u,h,d){switch(i.calls++,h){case o.TRIANGLES:i.triangles+=d*(u/3);break;case o.LINES:i.lines+=d*(u/2);break;case o.LINE_STRIP:i.lines+=d*(u-1);break;case o.LINE_LOOP:i.lines+=d*u;break;case o.POINTS:i.points+=d*u;break;default:be("WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:s}}function IT(o,t,i){const s=new WeakMap,l=new an;function u(h,d,m){const p=h.morphTargetInfluences,v=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,x=v!==void 0?v.length:0;let g=s.get(d);if(g===void 0||g.count!==x){let V=function(){b.dispose(),s.delete(d),d.removeEventListener("dispose",V)};var E=V;g!==void 0&&g.texture.dispose();const T=d.morphAttributes.position!==void 0,D=d.morphAttributes.normal!==void 0,y=d.morphAttributes.color!==void 0,S=d.morphAttributes.position||[],L=d.morphAttributes.normal||[],z=d.morphAttributes.color||[];let C=0;T===!0&&(C=1),D===!0&&(C=2),y===!0&&(C=3);let I=d.attributes.position.count*C,w=1;I>t.maxTextureSize&&(w=Math.ceil(I/t.maxTextureSize),I=t.maxTextureSize);const P=new Float32Array(I*w*4*x),b=new zv(P,I,w,x);b.type=qi,b.needsUpdate=!0;const U=C*4;for(let G=0;G<x;G++){const W=S[G],lt=L[G],pt=z[G],j=I*w*4*G;for(let B=0;B<W.count;B++){const F=B*U;T===!0&&(l.fromBufferAttribute(W,B),P[j+F+0]=l.x,P[j+F+1]=l.y,P[j+F+2]=l.z,P[j+F+3]=0),D===!0&&(l.fromBufferAttribute(lt,B),P[j+F+4]=l.x,P[j+F+5]=l.y,P[j+F+6]=l.z,P[j+F+7]=0),y===!0&&(l.fromBufferAttribute(pt,B),P[j+F+8]=l.x,P[j+F+9]=l.y,P[j+F+10]=l.z,P[j+F+11]=pt.itemSize===4?l.w:1)}}g={count:x,texture:b,size:new Zt(I,w)},s.set(d,g),d.addEventListener("dispose",V)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(o,"morphTexture",h.morphTexture,i);else{let T=0;for(let y=0;y<p.length;y++)T+=p[y];const D=d.morphTargetsRelative?1:1-T;m.getUniforms().setValue(o,"morphTargetBaseInfluence",D),m.getUniforms().setValue(o,"morphTargetInfluences",p)}m.getUniforms().setValue(o,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(o,"morphTargetsTextureSize",g.size)}return{update:u}}function zT(o,t,i,s,l){let u=new WeakMap;function h(p){const v=l.render.frame,x=p.geometry,g=t.get(p,x);if(u.get(g)!==v&&(t.update(g),u.set(g,v)),p.isInstancedMesh&&(p.hasEventListener("dispose",m)===!1&&p.addEventListener("dispose",m),u.get(p)!==v&&(i.update(p.instanceMatrix,o.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,o.ARRAY_BUFFER),u.set(p,v))),p.isSkinnedMesh){const E=p.skeleton;u.get(E)!==v&&(E.update(),u.set(E,v))}return g}function d(){u=new WeakMap}function m(p){const v=p.target;v.removeEventListener("dispose",m),s.releaseStatesOfObject(v),i.remove(v.instanceMatrix),v.instanceColor!==null&&i.remove(v.instanceColor)}return{update:h,dispose:d}}const BT={[np]:"LINEAR_TONE_MAPPING",[ip]:"REINHARD_TONE_MAPPING",[ap]:"CINEON_TONE_MAPPING",[cc]:"ACES_FILMIC_TONE_MAPPING",[rp]:"AGX_TONE_MAPPING",[op]:"NEUTRAL_TONE_MAPPING",[sp]:"CUSTOM_TONE_MAPPING"};function FT(o,t,i,s,l,u){const h=new jn(t,i,{type:o,depthBuffer:l,stencilBuffer:u,samples:s?4:0,depthTexture:l?new Vr(t,i):void 0}),d=new jn(t,i,{type:pi,depthBuffer:!1,stencilBuffer:!1}),m=new Vn;m.setAttribute("position",new rn([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new rn([0,2,0,0,2,0],2));const p=new qv({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),v=new Gn(m,p),x=new pc(-1,1,1,-1,0,1);let g=null,E=null,T=!1,D,y=null,S=[],L=!1;this.setSize=function(z,C){h.setSize(z,C),d.setSize(z,C);for(let I=0;I<S.length;I++){const w=S[I];w.setSize&&w.setSize(z,C)}},this.setEffects=function(z){S=z,L=S.length>0&&S[0].isRenderPass===!0;const C=h.width,I=h.height;for(let w=0;w<S.length;w++){const P=S[w];P.setSize&&P.setSize(C,I)}},this.begin=function(z,C){if(T||z.toneMapping===Ki&&S.length===0)return!1;if(y=C,C!==null){const I=C.width,w=C.height;(h.width!==I||h.height!==w)&&this.setSize(I,w)}return L===!1&&z.setRenderTarget(h),D=z.toneMapping,z.toneMapping=Ki,!0},this.hasRenderPass=function(){return L},this.end=function(z,C){z.toneMapping=D,T=!0;let I=h,w=d;for(let P=0;P<S.length;P++){const b=S[P];if(b.enabled!==!1&&(b.render(z,w,I,C),b.needsSwap!==!1)){const U=I;I=w,w=U}}if(g!==z.outputColorSpace||E!==z.toneMapping){g=z.outputColorSpace,E=z.toneMapping,p.defines={},Se.getTransfer(g)===Ne&&(p.defines.SRGB_TRANSFER="");const P=BT[E];P&&(p.defines[P]=""),p.needsUpdate=!0}p.uniforms.tDiffuse.value=I.texture,z.setRenderTarget(y),z.render(v,x),y=null,T=!1},this.isCompositing=function(){return T},this.dispose=function(){h.depthTexture&&h.depthTexture.dispose(),h.dispose(),d.dispose(),m.dispose(),p.dispose()}}const jv=new zn,jd=new Vr(1,1),$v=new zv,tx=new ay,ex=new Xv,iv=[],av=[],sv=new Float32Array(16),rv=new Float32Array(9),ov=new Float32Array(4);function Yr(o,t,i){const s=o[0];if(s<=0||s>0)return o;const l=t*i;let u=iv[l];if(u===void 0&&(u=new Float32Array(l),iv[l]=u),t!==0){s.toArray(u,0);for(let h=1,d=0;h!==t;++h)d+=i,o[h].toArray(u,d)}return u}function Mn(o,t){if(o.length!==t.length)return!1;for(let i=0,s=o.length;i<s;i++)if(o[i]!==t[i])return!1;return!0}function yn(o,t){for(let i=0,s=t.length;i<s;i++)o[i]=t[i]}function gc(o,t){let i=av[t];i===void 0&&(i=new Int32Array(t),av[t]=i);for(let s=0;s!==t;++s)i[s]=o.allocateTextureUnit();return i}function HT(o,t){const i=this.cache;i[0]!==t&&(o.uniform1f(this.addr,t),i[0]=t)}function GT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Mn(i,t))return;o.uniform2fv(this.addr,t),yn(i,t)}}function VT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(o.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(Mn(i,t))return;o.uniform3fv(this.addr,t),yn(i,t)}}function XT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Mn(i,t))return;o.uniform4fv(this.addr,t),yn(i,t)}}function kT(o,t){const i=this.cache,s=t.elements;if(s===void 0){if(Mn(i,t))return;o.uniformMatrix2fv(this.addr,!1,t),yn(i,t)}else{if(Mn(i,s))return;ov.set(s),o.uniformMatrix2fv(this.addr,!1,ov),yn(i,s)}}function WT(o,t){const i=this.cache,s=t.elements;if(s===void 0){if(Mn(i,t))return;o.uniformMatrix3fv(this.addr,!1,t),yn(i,t)}else{if(Mn(i,s))return;rv.set(s),o.uniformMatrix3fv(this.addr,!1,rv),yn(i,s)}}function qT(o,t){const i=this.cache,s=t.elements;if(s===void 0){if(Mn(i,t))return;o.uniformMatrix4fv(this.addr,!1,t),yn(i,t)}else{if(Mn(i,s))return;sv.set(s),o.uniformMatrix4fv(this.addr,!1,sv),yn(i,s)}}function YT(o,t){const i=this.cache;i[0]!==t&&(o.uniform1i(this.addr,t),i[0]=t)}function ZT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Mn(i,t))return;o.uniform2iv(this.addr,t),yn(i,t)}}function KT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Mn(i,t))return;o.uniform3iv(this.addr,t),yn(i,t)}}function QT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Mn(i,t))return;o.uniform4iv(this.addr,t),yn(i,t)}}function JT(o,t){const i=this.cache;i[0]!==t&&(o.uniform1ui(this.addr,t),i[0]=t)}function jT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Mn(i,t))return;o.uniform2uiv(this.addr,t),yn(i,t)}}function $T(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Mn(i,t))return;o.uniform3uiv(this.addr,t),yn(i,t)}}function t1(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Mn(i,t))return;o.uniform4uiv(this.addr,t),yn(i,t)}}function e1(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l);let u;this.type===o.SAMPLER_2D_SHADOW?(jd.compareFunction=i.isReversedDepthBuffer()?mp:pp,u=jd):u=jv,i.setTexture2D(t||u,l)}function n1(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(t||tx,l)}function i1(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(t||ex,l)}function a1(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(t||$v,l)}function s1(o){switch(o){case 5126:return HT;case 35664:return GT;case 35665:return VT;case 35666:return XT;case 35674:return kT;case 35675:return WT;case 35676:return qT;case 5124:case 35670:return YT;case 35667:case 35671:return ZT;case 35668:case 35672:return KT;case 35669:case 35673:return QT;case 5125:return JT;case 36294:return jT;case 36295:return $T;case 36296:return t1;case 35678:case 36198:case 36298:case 36306:case 35682:return e1;case 35679:case 36299:case 36307:return n1;case 35680:case 36300:case 36308:case 36293:return i1;case 36289:case 36303:case 36311:case 36292:return a1}}function r1(o,t){o.uniform1fv(this.addr,t)}function o1(o,t){const i=Yr(t,this.size,2);o.uniform2fv(this.addr,i)}function l1(o,t){const i=Yr(t,this.size,3);o.uniform3fv(this.addr,i)}function u1(o,t){const i=Yr(t,this.size,4);o.uniform4fv(this.addr,i)}function c1(o,t){const i=Yr(t,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function f1(o,t){const i=Yr(t,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function h1(o,t){const i=Yr(t,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function d1(o,t){o.uniform1iv(this.addr,t)}function p1(o,t){o.uniform2iv(this.addr,t)}function m1(o,t){o.uniform3iv(this.addr,t)}function g1(o,t){o.uniform4iv(this.addr,t)}function _1(o,t){o.uniform1uiv(this.addr,t)}function v1(o,t){o.uniform2uiv(this.addr,t)}function x1(o,t){o.uniform3uiv(this.addr,t)}function S1(o,t){o.uniform4uiv(this.addr,t)}function M1(o,t,i){const s=this.cache,l=t.length,u=gc(i,l);Mn(s,u)||(o.uniform1iv(this.addr,u),yn(s,u));let h;this.type===o.SAMPLER_2D_SHADOW?h=jd:h=jv;for(let d=0;d!==l;++d)i.setTexture2D(t[d]||h,u[d])}function y1(o,t,i){const s=this.cache,l=t.length,u=gc(i,l);Mn(s,u)||(o.uniform1iv(this.addr,u),yn(s,u));for(let h=0;h!==l;++h)i.setTexture3D(t[h]||tx,u[h])}function E1(o,t,i){const s=this.cache,l=t.length,u=gc(i,l);Mn(s,u)||(o.uniform1iv(this.addr,u),yn(s,u));for(let h=0;h!==l;++h)i.setTextureCube(t[h]||ex,u[h])}function b1(o,t,i){const s=this.cache,l=t.length,u=gc(i,l);Mn(s,u)||(o.uniform1iv(this.addr,u),yn(s,u));for(let h=0;h!==l;++h)i.setTexture2DArray(t[h]||$v,u[h])}function T1(o){switch(o){case 5126:return r1;case 35664:return o1;case 35665:return l1;case 35666:return u1;case 35674:return c1;case 35675:return f1;case 35676:return h1;case 5124:case 35670:return d1;case 35667:case 35671:return p1;case 35668:case 35672:return m1;case 35669:case 35673:return g1;case 5125:return _1;case 36294:return v1;case 36295:return x1;case 36296:return S1;case 35678:case 36198:case 36298:case 36306:case 35682:return M1;case 35679:case 36299:case 36307:return y1;case 35680:case 36300:case 36308:case 36293:return E1;case 36289:case 36303:case 36311:case 36292:return b1}}class A1{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.setValue=s1(i.type)}}class R1{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=T1(i.type)}}class C1{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,s){const l=this.seq;for(let u=0,h=l.length;u!==h;++u){const d=l[u];d.setValue(t,i[d.id],s)}}}const rd=/(\w+)(\])?(\[|\.)?/g;function lv(o,t){o.seq.push(t),o.map[t.id]=t}function w1(o,t,i){const s=o.name,l=s.length;for(rd.lastIndex=0;;){const u=rd.exec(s),h=rd.lastIndex;let d=u[1];const m=u[2]==="]",p=u[3];if(m&&(d=d|0),p===void 0||p==="["&&h+2===l){lv(i,p===void 0?new A1(d,o,t):new R1(d,o,t));break}else{let x=i.map[d];x===void 0&&(x=new C1(d),lv(i,x)),i=x}}}class ju{constructor(t,i){this.seq=[],this.map={};const s=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let h=0;h<s;++h){const d=t.getActiveUniform(i,h),m=t.getUniformLocation(i,d.name);w1(d,m,this)}const l=[],u=[];for(const h of this.seq)h.type===t.SAMPLER_2D_SHADOW||h.type===t.SAMPLER_CUBE_SHADOW||h.type===t.SAMPLER_2D_ARRAY_SHADOW?l.push(h):u.push(h);l.length>0&&(this.seq=l.concat(u))}setValue(t,i,s,l){const u=this.map[i];u!==void 0&&u.setValue(t,s,l)}setOptional(t,i,s){const l=i[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,i,s,l){for(let u=0,h=i.length;u!==h;++u){const d=i[u],m=s[d.id];m.needsUpdate!==!1&&d.setValue(t,m.value,l)}}static seqWithValue(t,i){const s=[];for(let l=0,u=t.length;l!==u;++l){const h=t[l];h.id in i&&s.push(h)}return s}}function uv(o,t,i){const s=o.createShader(t);return o.shaderSource(s,i),o.compileShader(s),s}const D1=37297;let U1=0;function N1(o,t){const i=o.split(`
`),s=[],l=Math.max(t-6,0),u=Math.min(t+6,i.length);for(let h=l;h<u;h++){const d=h+1;s.push(`${d===t?">":" "} ${d}: ${i[h]}`)}return s.join(`
`)}const cv=new se;function L1(o){Se._getMatrix(cv,Se.workingColorSpace,o);const t=`mat3( ${cv.elements.map(i=>i.toFixed(4))} )`;switch(Se.getTransfer(o)){case ac:return[t,"LinearTransferOETF"];case Ne:return[t,"sRGBTransferOETF"];default:return ie("WebGLProgram: Unsupported color space: ",o),[t,"LinearTransferOETF"]}}function fv(o,t,i){const s=o.getShaderParameter(t,o.COMPILE_STATUS),u=(o.getShaderInfoLog(t)||"").trim();if(s&&u==="")return"";const h=/ERROR: 0:(\d+)/.exec(u);if(h){const d=parseInt(h[1]);return i.toUpperCase()+`

`+u+`

`+N1(o.getShaderSource(t),d)}else return u}function O1(o,t){const i=L1(t);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const P1={[np]:"Linear",[ip]:"Reinhard",[ap]:"Cineon",[cc]:"ACESFilmic",[rp]:"AgX",[op]:"Neutral",[sp]:"Custom"};function I1(o,t){const i=P1[t];return i===void 0?(ie("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+o+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Vu=new K;function z1(){Se.getLuminanceCoefficients(Vu);const o=Vu.x.toFixed(4),t=Vu.y.toFixed(4),i=Vu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function B1(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($o).join(`
`)}function F1(o){const t=[];for(const i in o){const s=o[i];s!==!1&&t.push("#define "+i+" "+s)}return t.join(`
`)}function H1(o,t){const i={},s=o.getProgramParameter(t,o.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const u=o.getActiveAttrib(t,l),h=u.name;let d=1;u.type===o.FLOAT_MAT2&&(d=2),u.type===o.FLOAT_MAT3&&(d=3),u.type===o.FLOAT_MAT4&&(d=4),i[h]={type:u.type,location:o.getAttribLocation(t,h),locationSize:d}}return i}function $o(o){return o!==""}function hv(o,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function dv(o,t){return o.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const G1=/^[ \t]*#include +<([\w\d./]+)>/gm;function $d(o){return o.replace(G1,X1)}const V1=new Map;function X1(o,t){let i=fe[t];if(i===void 0){const s=V1.get(t);if(s!==void 0)i=fe[s],ie('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return $d(i)}const k1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pv(o){return o.replace(k1,W1)}function W1(o,t,i,s){let l="";for(let u=parseInt(t);u<parseInt(i);u++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+u+" ]").replace(/UNROLLED_LOOP_INDEX/g,u);return l}function mv(o){let t=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?t+=`
#define HIGH_PRECISION`:o.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const q1={[Yu]:"SHADOWMAP_TYPE_PCF",[jo]:"SHADOWMAP_TYPE_VSM"};function Y1(o){return q1[o.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Z1={[Bs]:"ENVMAP_TYPE_CUBE",[Gr]:"ENVMAP_TYPE_CUBE",[fc]:"ENVMAP_TYPE_CUBE_UV"};function K1(o){return o.envMap===!1?"ENVMAP_TYPE_CUBE":Z1[o.envMapMode]||"ENVMAP_TYPE_CUBE"}const Q1={[Gr]:"ENVMAP_MODE_REFRACTION"};function J1(o){return o.envMap===!1?"ENVMAP_MODE_REFLECTION":Q1[o.envMapMode]||"ENVMAP_MODE_REFLECTION"}const j1={[Rv]:"ENVMAP_BLENDING_MULTIPLY",[zM]:"ENVMAP_BLENDING_MIX",[BM]:"ENVMAP_BLENDING_ADD"};function $1(o){return o.envMap===!1?"ENVMAP_BLENDING_NONE":j1[o.combine]||"ENVMAP_BLENDING_NONE"}function tA(o){const t=o.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function eA(o,t,i,s){const l=o.getContext(),u=i.defines;let h=i.vertexShader,d=i.fragmentShader;const m=Y1(i),p=K1(i),v=J1(i),x=$1(i),g=tA(i),E=B1(i),T=F1(u),D=l.createProgram();let y,S,L=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter($o).join(`
`),y.length>0&&(y+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter($o).join(`
`),S.length>0&&(S+=`
`)):(y=[mv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($o).join(`
`),S=[mv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+v:"",i.envMap?"#define "+x:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Ki?"#define TONE_MAPPING":"",i.toneMapping!==Ki?fe.tonemapping_pars_fragment:"",i.toneMapping!==Ki?I1("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",fe.colorspace_pars_fragment,O1("linearToOutputTexel",i.outputColorSpace),z1(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter($o).join(`
`)),h=$d(h),h=hv(h,i),h=dv(h,i),d=$d(d),d=hv(d,i),d=dv(d,i),h=pv(h),d=pv(d),i.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,y=[E,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,S=["#define varying in",i.glslVersion===T_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===T_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const z=L+y+h,C=L+S+d,I=uv(l,l.VERTEX_SHADER,z),w=uv(l,l.FRAGMENT_SHADER,C);l.attachShader(D,I),l.attachShader(D,w),i.index0AttributeName!==void 0?l.bindAttribLocation(D,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(D,0,"position"),l.linkProgram(D);function P(G){if(o.debug.checkShaderErrors){const W=l.getProgramInfoLog(D)||"",lt=l.getShaderInfoLog(I)||"",pt=l.getShaderInfoLog(w)||"",j=W.trim(),B=lt.trim(),F=pt.trim();let $=!0,ct=!0;if(l.getProgramParameter(D,l.LINK_STATUS)===!1)if($=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(l,D,I,w);else{const Et=fv(l,I,"vertex"),N=fv(l,w,"fragment");be("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(D,l.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+j+`
`+Et+`
`+N)}else j!==""?ie("WebGLProgram: Program Info Log:",j):(B===""||F==="")&&(ct=!1);ct&&(G.diagnostics={runnable:$,programLog:j,vertexShader:{log:B,prefix:y},fragmentShader:{log:F,prefix:S}})}l.deleteShader(I),l.deleteShader(w),b=new ju(l,D),U=H1(l,D)}let b;this.getUniforms=function(){return b===void 0&&P(this),b};let U;this.getAttributes=function(){return U===void 0&&P(this),U};let V=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return V===!1&&(V=l.getProgramParameter(D,D1)),V},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(D),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=U1++,this.cacheKey=t,this.usedTimes=1,this.program=D,this.vertexShader=I,this.fragmentShader=w,this}let nA=0;class iA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,i,s){const l=this._getShaderCacheForMaterial(t);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(s)===!1&&(l.add(s),s.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let s=i.get(t);return s===void 0&&(s=new Set,i.set(t,s)),s}_getShaderStage(t){const i=this.shaderCache;let s=i.get(t);return s===void 0&&(s=new aA(t),i.set(t,s)),s}}class aA{constructor(t){this.id=nA++,this.code=t,this.usedTimes=0}}function sA(o){return o===Fs||o===ec||o===nc}function rA(o,t,i,s,l,u){const h=new Bv,d=new iA,m=new Set,p=[],v=new Map,x=s.logarithmicDepthBuffer;let g=s.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(b){return m.add(b),b===0?"uv":`uv${b}`}function D(b,U,V,G,W,lt){const pt=G.fog,j=W.geometry,B=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?G.environment:null,F=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,$=t.get(b.envMap||B,F),ct=$&&$.mapping===fc?$.image.height:null,Et=E[b.type];b.precision!==null&&(g=s.getMaxPrecision(b.precision),g!==b.precision&&ie("WebGLProgram.getParameters:",b.precision,"not supported, using",g,"instead."));const N=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Z=N!==void 0?N.length:0;let St=0;j.morphAttributes.position!==void 0&&(St=1),j.morphAttributes.normal!==void 0&&(St=2),j.morphAttributes.color!==void 0&&(St=3);let bt,Nt,tt,xt;if(Et){const Gt=ki[Et];bt=Gt.vertexShader,Nt=Gt.fragmentShader}else{bt=b.vertexShader,Nt=b.fragmentShader;const Gt=d.getVertexShaderStage(b),$e=d.getFragmentShaderStage(b);d.update(b,Gt,$e),tt=Gt.id,xt=$e.id}const Mt=o.getRenderTarget(),zt=o.state.buffers.depth.getReversed(),te=W.isInstancedMesh===!0,Kt=W.isBatchedMesh===!0,He=!!b.map,re=!!b.matcap,de=!!$,pe=!!b.aoMap,ue=!!b.lightMap,Ye=!!b.bumpMap&&b.wireframe===!1,Ze=!!b.normalMap,Ce=!!b.displacementMap,je=!!b.emissiveMap,Le=!!b.metalnessMap,Ke=!!b.roughnessMap,q=b.anisotropy>0,De=b.clearcoat>0,Ee=b.dispersion>0,O=b.iridescence>0,M=b.sheen>0,J=b.transmission>0,st=q&&!!b.anisotropyMap,ft=De&&!!b.clearcoatMap,Tt=De&&!!b.clearcoatNormalMap,wt=De&&!!b.clearcoatRoughnessMap,ht=O&&!!b.iridescenceMap,dt=O&&!!b.iridescenceThicknessMap,Rt=M&&!!b.sheenColorMap,Bt=M&&!!b.sheenRoughnessMap,Lt=!!b.specularMap,Dt=!!b.specularColorMap,Qt=!!b.specularIntensityMap,Jt=J&&!!b.transmissionMap,ne=J&&!!b.thicknessMap,k=!!b.gradientMap,At=!!b.alphaMap,gt=b.alphaTest>0,Ct=!!b.alphaHash,It=!!b.extensions;let yt=Ki;b.toneMapped&&(Mt===null||Mt.isXRRenderTarget===!0)&&(yt=o.toneMapping);const Wt={shaderID:Et,shaderType:b.type,shaderName:b.name,vertexShader:bt,fragmentShader:Nt,defines:b.defines,customVertexShaderID:tt,customFragmentShaderID:xt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:g,batching:Kt,batchingColor:Kt&&W._colorsTexture!==null,instancing:te,instancingColor:te&&W.instanceColor!==null,instancingMorph:te&&W.morphTexture!==null,outputColorSpace:Mt===null?o.outputColorSpace:Mt.isXRRenderTarget===!0?Mt.texture.colorSpace:Se.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:He,matcap:re,envMap:de,envMapMode:de&&$.mapping,envMapCubeUVHeight:ct,aoMap:pe,lightMap:ue,bumpMap:Ye,normalMap:Ze,displacementMap:Ce,emissiveMap:je,normalMapObjectSpace:Ze&&b.normalMapType===GM,normalMapTangentSpace:Ze&&b.normalMapType===Kd,packedNormalMap:Ze&&b.normalMapType===Kd&&sA(b.normalMap.format),metalnessMap:Le,roughnessMap:Ke,anisotropy:q,anisotropyMap:st,clearcoat:De,clearcoatMap:ft,clearcoatNormalMap:Tt,clearcoatRoughnessMap:wt,dispersion:Ee,iridescence:O,iridescenceMap:ht,iridescenceThicknessMap:dt,sheen:M,sheenColorMap:Rt,sheenRoughnessMap:Bt,specularMap:Lt,specularColorMap:Dt,specularIntensityMap:Qt,transmission:J,transmissionMap:Jt,thicknessMap:ne,gradientMap:k,opaque:b.transparent===!1&&b.blending===zr&&b.alphaToCoverage===!1,alphaMap:At,alphaTest:gt,alphaHash:Ct,combine:b.combine,mapUv:He&&T(b.map.channel),aoMapUv:pe&&T(b.aoMap.channel),lightMapUv:ue&&T(b.lightMap.channel),bumpMapUv:Ye&&T(b.bumpMap.channel),normalMapUv:Ze&&T(b.normalMap.channel),displacementMapUv:Ce&&T(b.displacementMap.channel),emissiveMapUv:je&&T(b.emissiveMap.channel),metalnessMapUv:Le&&T(b.metalnessMap.channel),roughnessMapUv:Ke&&T(b.roughnessMap.channel),anisotropyMapUv:st&&T(b.anisotropyMap.channel),clearcoatMapUv:ft&&T(b.clearcoatMap.channel),clearcoatNormalMapUv:Tt&&T(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:wt&&T(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ht&&T(b.iridescenceMap.channel),iridescenceThicknessMapUv:dt&&T(b.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&T(b.sheenColorMap.channel),sheenRoughnessMapUv:Bt&&T(b.sheenRoughnessMap.channel),specularMapUv:Lt&&T(b.specularMap.channel),specularColorMapUv:Dt&&T(b.specularColorMap.channel),specularIntensityMapUv:Qt&&T(b.specularIntensityMap.channel),transmissionMapUv:Jt&&T(b.transmissionMap.channel),thicknessMapUv:ne&&T(b.thicknessMap.channel),alphaMapUv:At&&T(b.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Ze||q),vertexNormals:!!j.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!j.attributes.uv&&(He||At),fog:!!pt,useFog:b.fog===!0,fogExp2:!!pt&&pt.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||j.attributes.normal===void 0&&Ze===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:x,reversedDepthBuffer:zt,skinning:W.isSkinnedMesh===!0,hasPositionAttribute:j.attributes.position!==void 0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:St,numDirLights:U.directional.length,numPointLights:U.point.length,numSpotLights:U.spot.length,numSpotLightMaps:U.spotLightMap.length,numRectAreaLights:U.rectArea.length,numHemiLights:U.hemi.length,numDirLightShadows:U.directionalShadowMap.length,numPointLightShadows:U.pointShadowMap.length,numSpotLightShadows:U.spotShadowMap.length,numSpotLightShadowsWithMaps:U.numSpotLightShadowsWithMaps,numLightProbes:U.numLightProbes,numLightProbeGrids:lt.length,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:b.dithering,shadowMapEnabled:o.shadowMap.enabled&&V.length>0,shadowMapType:o.shadowMap.type,toneMapping:yt,decodeVideoTexture:He&&b.map.isVideoTexture===!0&&Se.getTransfer(b.map.colorSpace)===Ne,decodeVideoTextureEmissive:je&&b.emissiveMap.isVideoTexture===!0&&Se.getTransfer(b.emissiveMap.colorSpace)===Ne,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Li,flipSided:b.side===Jn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:It&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(It&&b.extensions.multiDraw===!0||Kt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Wt.vertexUv1s=m.has(1),Wt.vertexUv2s=m.has(2),Wt.vertexUv3s=m.has(3),m.clear(),Wt}function y(b){const U=[];if(b.shaderID?U.push(b.shaderID):(U.push(b.customVertexShaderID),U.push(b.customFragmentShaderID)),b.defines!==void 0)for(const V in b.defines)U.push(V),U.push(b.defines[V]);return b.isRawShaderMaterial===!1&&(S(U,b),L(U,b),U.push(o.outputColorSpace)),U.push(b.customProgramCacheKey),U.join()}function S(b,U){b.push(U.precision),b.push(U.outputColorSpace),b.push(U.envMapMode),b.push(U.envMapCubeUVHeight),b.push(U.mapUv),b.push(U.alphaMapUv),b.push(U.lightMapUv),b.push(U.aoMapUv),b.push(U.bumpMapUv),b.push(U.normalMapUv),b.push(U.displacementMapUv),b.push(U.emissiveMapUv),b.push(U.metalnessMapUv),b.push(U.roughnessMapUv),b.push(U.anisotropyMapUv),b.push(U.clearcoatMapUv),b.push(U.clearcoatNormalMapUv),b.push(U.clearcoatRoughnessMapUv),b.push(U.iridescenceMapUv),b.push(U.iridescenceThicknessMapUv),b.push(U.sheenColorMapUv),b.push(U.sheenRoughnessMapUv),b.push(U.specularMapUv),b.push(U.specularColorMapUv),b.push(U.specularIntensityMapUv),b.push(U.transmissionMapUv),b.push(U.thicknessMapUv),b.push(U.combine),b.push(U.fogExp2),b.push(U.sizeAttenuation),b.push(U.morphTargetsCount),b.push(U.morphAttributeCount),b.push(U.numDirLights),b.push(U.numPointLights),b.push(U.numSpotLights),b.push(U.numSpotLightMaps),b.push(U.numHemiLights),b.push(U.numRectAreaLights),b.push(U.numDirLightShadows),b.push(U.numPointLightShadows),b.push(U.numSpotLightShadows),b.push(U.numSpotLightShadowsWithMaps),b.push(U.numLightProbes),b.push(U.shadowMapType),b.push(U.toneMapping),b.push(U.numClippingPlanes),b.push(U.numClipIntersection),b.push(U.depthPacking)}function L(b,U){h.disableAll(),U.instancing&&h.enable(0),U.instancingColor&&h.enable(1),U.instancingMorph&&h.enable(2),U.matcap&&h.enable(3),U.envMap&&h.enable(4),U.normalMapObjectSpace&&h.enable(5),U.normalMapTangentSpace&&h.enable(6),U.clearcoat&&h.enable(7),U.iridescence&&h.enable(8),U.alphaTest&&h.enable(9),U.vertexColors&&h.enable(10),U.vertexAlphas&&h.enable(11),U.vertexUv1s&&h.enable(12),U.vertexUv2s&&h.enable(13),U.vertexUv3s&&h.enable(14),U.vertexTangents&&h.enable(15),U.anisotropy&&h.enable(16),U.alphaHash&&h.enable(17),U.batching&&h.enable(18),U.dispersion&&h.enable(19),U.batchingColor&&h.enable(20),U.gradientMap&&h.enable(21),U.packedNormalMap&&h.enable(22),U.vertexNormals&&h.enable(23),b.push(h.mask),h.disableAll(),U.fog&&h.enable(0),U.useFog&&h.enable(1),U.flatShading&&h.enable(2),U.logarithmicDepthBuffer&&h.enable(3),U.reversedDepthBuffer&&h.enable(4),U.skinning&&h.enable(5),U.morphTargets&&h.enable(6),U.morphNormals&&h.enable(7),U.morphColors&&h.enable(8),U.premultipliedAlpha&&h.enable(9),U.shadowMapEnabled&&h.enable(10),U.doubleSided&&h.enable(11),U.flipSided&&h.enable(12),U.useDepthPacking&&h.enable(13),U.dithering&&h.enable(14),U.transmission&&h.enable(15),U.sheen&&h.enable(16),U.opaque&&h.enable(17),U.pointsUvs&&h.enable(18),U.decodeVideoTexture&&h.enable(19),U.decodeVideoTextureEmissive&&h.enable(20),U.alphaToCoverage&&h.enable(21),U.numLightProbeGrids>0&&h.enable(22),U.hasPositionAttribute&&h.enable(23),b.push(h.mask)}function z(b){const U=E[b.type];let V;if(U){const G=ki[U];V=il.clone(G.uniforms)}else V=b.uniforms;return V}function C(b,U){let V=v.get(U);return V!==void 0?++V.usedTimes:(V=new eA(o,U,b,l),p.push(V),v.set(U,V)),V}function I(b){if(--b.usedTimes===0){const U=p.indexOf(b);p[U]=p[p.length-1],p.pop(),v.delete(b.cacheKey),b.destroy()}}function w(b){d.remove(b)}function P(){d.dispose()}return{getParameters:D,getProgramCacheKey:y,getUniforms:z,acquireProgram:C,releaseProgram:I,releaseShaderCache:w,programs:p,dispose:P}}function oA(){let o=new WeakMap;function t(h){return o.has(h)}function i(h){let d=o.get(h);return d===void 0&&(d={},o.set(h,d)),d}function s(h){o.delete(h)}function l(h,d,m){o.get(h)[d]=m}function u(){o=new WeakMap}return{has:t,get:i,remove:s,update:l,dispose:u}}function lA(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.material.id!==t.material.id?o.material.id-t.material.id:o.materialVariant!==t.materialVariant?o.materialVariant-t.materialVariant:o.z!==t.z?o.z-t.z:o.id-t.id}function gv(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.z!==t.z?t.z-o.z:o.id-t.id}function _v(){const o=[];let t=0;const i=[],s=[],l=[];function u(){t=0,i.length=0,s.length=0,l.length=0}function h(g){let E=0;return g.isInstancedMesh&&(E+=2),g.isSkinnedMesh&&(E+=1),E}function d(g,E,T,D,y,S){let L=o[t];return L===void 0?(L={id:g.id,object:g,geometry:E,material:T,materialVariant:h(g),groupOrder:D,renderOrder:g.renderOrder,z:y,group:S},o[t]=L):(L.id=g.id,L.object=g,L.geometry=E,L.material=T,L.materialVariant=h(g),L.groupOrder=D,L.renderOrder=g.renderOrder,L.z=y,L.group=S),t++,L}function m(g,E,T,D,y,S){const L=d(g,E,T,D,y,S);T.transmission>0?s.push(L):T.transparent===!0?l.push(L):i.push(L)}function p(g,E,T,D,y,S){const L=d(g,E,T,D,y,S);T.transmission>0?s.unshift(L):T.transparent===!0?l.unshift(L):i.unshift(L)}function v(g,E,T){i.length>1&&i.sort(g||lA),s.length>1&&s.sort(E||gv),l.length>1&&l.sort(E||gv),T&&(i.reverse(),s.reverse(),l.reverse())}function x(){for(let g=t,E=o.length;g<E;g++){const T=o[g];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:i,transmissive:s,transparent:l,init:u,push:m,unshift:p,finish:x,sort:v}}function uA(){let o=new WeakMap;function t(s,l){const u=o.get(s);let h;return u===void 0?(h=new _v,o.set(s,[h])):l>=u.length?(h=new _v,u.push(h)):h=u[l],h}function i(){o=new WeakMap}return{get:t,dispose:i}}function cA(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new K,color:new he};break;case"SpotLight":i={position:new K,direction:new K,color:new he,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new K,color:new he,distance:0,decay:0};break;case"HemisphereLight":i={direction:new K,skyColor:new he,groundColor:new he};break;case"RectAreaLight":i={color:new he,position:new K,halfWidth:new K,halfHeight:new K};break}return o[t.id]=i,i}}}function fA(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[t.id]=i,i}}}let hA=0;function dA(o,t){return(t.castShadow?2:0)-(o.castShadow?2:0)+(t.map?1:0)-(o.map?1:0)}function pA(o){const t=new cA,i=fA(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new K);const l=new K,u=new sn,h=new sn;function d(p){let v=0,x=0,g=0;for(let U=0;U<9;U++)s.probe[U].set(0,0,0);let E=0,T=0,D=0,y=0,S=0,L=0,z=0,C=0,I=0,w=0,P=0;p.sort(dA);for(let U=0,V=p.length;U<V;U++){const G=p[U],W=G.color,lt=G.intensity,pt=G.distance;let j=null;if(G.shadow&&G.shadow.map&&(G.shadow.map.texture.format===Fs?j=G.shadow.map.texture:j=G.shadow.map.depthTexture||G.shadow.map.texture),G.isAmbientLight)v+=W.r*lt,x+=W.g*lt,g+=W.b*lt;else if(G.isLightProbe){for(let B=0;B<9;B++)s.probe[B].addScaledVector(G.sh.coefficients[B],lt);P++}else if(G.isDirectionalLight){const B=t.get(G);if(B.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const F=G.shadow,$=i.get(G);$.shadowIntensity=F.intensity,$.shadowBias=F.bias,$.shadowNormalBias=F.normalBias,$.shadowRadius=F.radius,$.shadowMapSize=F.mapSize,s.directionalShadow[E]=$,s.directionalShadowMap[E]=j,s.directionalShadowMatrix[E]=G.shadow.matrix,L++}s.directional[E]=B,E++}else if(G.isSpotLight){const B=t.get(G);B.position.setFromMatrixPosition(G.matrixWorld),B.color.copy(W).multiplyScalar(lt),B.distance=pt,B.coneCos=Math.cos(G.angle),B.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),B.decay=G.decay,s.spot[D]=B;const F=G.shadow;if(G.map&&(s.spotLightMap[I]=G.map,I++,F.updateMatrices(G),G.castShadow&&w++),s.spotLightMatrix[D]=F.matrix,G.castShadow){const $=i.get(G);$.shadowIntensity=F.intensity,$.shadowBias=F.bias,$.shadowNormalBias=F.normalBias,$.shadowRadius=F.radius,$.shadowMapSize=F.mapSize,s.spotShadow[D]=$,s.spotShadowMap[D]=j,C++}D++}else if(G.isRectAreaLight){const B=t.get(G);B.color.copy(W).multiplyScalar(lt),B.halfWidth.set(G.width*.5,0,0),B.halfHeight.set(0,G.height*.5,0),s.rectArea[y]=B,y++}else if(G.isPointLight){const B=t.get(G);if(B.color.copy(G.color).multiplyScalar(G.intensity),B.distance=G.distance,B.decay=G.decay,G.castShadow){const F=G.shadow,$=i.get(G);$.shadowIntensity=F.intensity,$.shadowBias=F.bias,$.shadowNormalBias=F.normalBias,$.shadowRadius=F.radius,$.shadowMapSize=F.mapSize,$.shadowCameraNear=F.camera.near,$.shadowCameraFar=F.camera.far,s.pointShadow[T]=$,s.pointShadowMap[T]=j,s.pointShadowMatrix[T]=G.shadow.matrix,z++}s.point[T]=B,T++}else if(G.isHemisphereLight){const B=t.get(G);B.skyColor.copy(G.color).multiplyScalar(lt),B.groundColor.copy(G.groundColor).multiplyScalar(lt),s.hemi[S]=B,S++}}y>0&&(o.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Pt.LTC_FLOAT_1,s.rectAreaLTC2=Pt.LTC_FLOAT_2):(s.rectAreaLTC1=Pt.LTC_HALF_1,s.rectAreaLTC2=Pt.LTC_HALF_2)),s.ambient[0]=v,s.ambient[1]=x,s.ambient[2]=g;const b=s.hash;(b.directionalLength!==E||b.pointLength!==T||b.spotLength!==D||b.rectAreaLength!==y||b.hemiLength!==S||b.numDirectionalShadows!==L||b.numPointShadows!==z||b.numSpotShadows!==C||b.numSpotMaps!==I||b.numLightProbes!==P)&&(s.directional.length=E,s.spot.length=D,s.rectArea.length=y,s.point.length=T,s.hemi.length=S,s.directionalShadow.length=L,s.directionalShadowMap.length=L,s.pointShadow.length=z,s.pointShadowMap.length=z,s.spotShadow.length=C,s.spotShadowMap.length=C,s.directionalShadowMatrix.length=L,s.pointShadowMatrix.length=z,s.spotLightMatrix.length=C+I-w,s.spotLightMap.length=I,s.numSpotLightShadowsWithMaps=w,s.numLightProbes=P,b.directionalLength=E,b.pointLength=T,b.spotLength=D,b.rectAreaLength=y,b.hemiLength=S,b.numDirectionalShadows=L,b.numPointShadows=z,b.numSpotShadows=C,b.numSpotMaps=I,b.numLightProbes=P,s.version=hA++)}function m(p,v){let x=0,g=0,E=0,T=0,D=0;const y=v.matrixWorldInverse;for(let S=0,L=p.length;S<L;S++){const z=p[S];if(z.isDirectionalLight){const C=s.directional[x];C.direction.setFromMatrixPosition(z.matrixWorld),l.setFromMatrixPosition(z.target.matrixWorld),C.direction.sub(l),C.direction.transformDirection(y),x++}else if(z.isSpotLight){const C=s.spot[E];C.position.setFromMatrixPosition(z.matrixWorld),C.position.applyMatrix4(y),C.direction.setFromMatrixPosition(z.matrixWorld),l.setFromMatrixPosition(z.target.matrixWorld),C.direction.sub(l),C.direction.transformDirection(y),E++}else if(z.isRectAreaLight){const C=s.rectArea[T];C.position.setFromMatrixPosition(z.matrixWorld),C.position.applyMatrix4(y),h.identity(),u.copy(z.matrixWorld),u.premultiply(y),h.extractRotation(u),C.halfWidth.set(z.width*.5,0,0),C.halfHeight.set(0,z.height*.5,0),C.halfWidth.applyMatrix4(h),C.halfHeight.applyMatrix4(h),T++}else if(z.isPointLight){const C=s.point[g];C.position.setFromMatrixPosition(z.matrixWorld),C.position.applyMatrix4(y),g++}else if(z.isHemisphereLight){const C=s.hemi[D];C.direction.setFromMatrixPosition(z.matrixWorld),C.direction.transformDirection(y),D++}}}return{setup:d,setupView:m,state:s}}function vv(o){const t=new pA(o),i=[],s=[],l=[];function u(g){x.camera=g,i.length=0,s.length=0,l.length=0}function h(g){i.push(g)}function d(g){s.push(g)}function m(g){l.push(g)}function p(){t.setup(i)}function v(g){t.setupView(i,g)}const x={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:u,state:x,setupLights:p,setupLightsView:v,pushLight:h,pushShadow:d,pushLightProbeGrid:m}}function mA(o){let t=new WeakMap;function i(l,u=0){const h=t.get(l);let d;return h===void 0?(d=new vv(o),t.set(l,[d])):u>=h.length?(d=new vv(o),h.push(d)):d=h[u],d}function s(){t=new WeakMap}return{get:i,dispose:s}}const gA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_A=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,vA=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],xA=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],xv=new sn,Jo=new K,od=new K;function SA(o,t,i){let s=new Sp;const l=new Zt,u=new Zt,h=new an,d=new Cy,m=new wy,p={},v=i.maxTextureSize,x={[rs]:Jn,[Jn]:rs,[Li]:Li},g=new In({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Zt},radius:{value:4}},vertexShader:gA,fragmentShader:_A}),E=g.clone();E.defines.HORIZONTAL_PASS=1;const T=new Vn;T.setAttribute("position",new Pi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const D=new Gn(T,g),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yu;let S=this.type;this.render=function(w,P,b){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||w.length===0)return;this.type===vM&&(ie("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Yu);const U=o.getRenderTarget(),V=o.getActiveCubeFace(),G=o.getActiveMipmapLevel(),W=o.state;W.setBlending(Zi),W.buffers.depth.getReversed()===!0?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const lt=S!==this.type;lt&&P.traverse(function(pt){pt.material&&(Array.isArray(pt.material)?pt.material.forEach(j=>j.needsUpdate=!0):pt.material.needsUpdate=!0)});for(let pt=0,j=w.length;pt<j;pt++){const B=w[pt],F=B.shadow;if(F===void 0){ie("WebGLShadowMap:",B,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;l.copy(F.mapSize);const $=F.getFrameExtents();l.multiply($),u.copy(F.mapSize),(l.x>v||l.y>v)&&(l.x>v&&(u.x=Math.floor(v/$.x),l.x=u.x*$.x,F.mapSize.x=u.x),l.y>v&&(u.y=Math.floor(v/$.y),l.y=u.y*$.y,F.mapSize.y=u.y));const ct=o.state.buffers.depth.getReversed();if(F.camera._reversedDepth=ct,F.map===null||lt===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===jo){if(B.isPointLight){ie("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new jn(l.x,l.y,{format:Fs,type:pi,minFilter:vn,magFilter:vn,generateMipmaps:!1}),F.map.texture.name=B.name+".shadowMap",F.map.depthTexture=new Vr(l.x,l.y,qi),F.map.depthTexture.name=B.name+".shadowMapDepth",F.map.depthTexture.format=Ea,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Dn,F.map.depthTexture.magFilter=Dn}else B.isPointLight?(F.map=new Jv(l.x),F.map.depthTexture=new by(l.x,Qi)):(F.map=new jn(l.x,l.y),F.map.depthTexture=new Vr(l.x,l.y,Qi)),F.map.depthTexture.name=B.name+".shadowMap",F.map.depthTexture.format=Ea,this.type===Yu?(F.map.depthTexture.compareFunction=ct?mp:pp,F.map.depthTexture.minFilter=vn,F.map.depthTexture.magFilter=vn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Dn,F.map.depthTexture.magFilter=Dn);F.camera.updateProjectionMatrix()}const Et=F.map.isWebGLCubeRenderTarget?6:1;for(let N=0;N<Et;N++){if(F.map.isWebGLCubeRenderTarget)o.setRenderTarget(F.map,N),o.clear();else{N===0&&(o.setRenderTarget(F.map),o.clear());const Z=F.getViewport(N);h.set(u.x*Z.x,u.y*Z.y,u.x*Z.z,u.y*Z.w),W.viewport(h)}if(B.isPointLight){const Z=F.camera,St=F.matrix,bt=B.distance||Z.far;bt!==Z.far&&(Z.far=bt,Z.updateProjectionMatrix()),Jo.setFromMatrixPosition(B.matrixWorld),Z.position.copy(Jo),od.copy(Z.position),od.add(vA[N]),Z.up.copy(xA[N]),Z.lookAt(od),Z.updateMatrixWorld(),St.makeTranslation(-Jo.x,-Jo.y,-Jo.z),xv.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),F._frustum.setFromProjectionMatrix(xv,Z.coordinateSystem,Z.reversedDepth)}else F.updateMatrices(B);s=F.getFrustum(),C(P,b,F.camera,B,this.type)}F.isPointLightShadow!==!0&&this.type===jo&&L(F,b),F.needsUpdate=!1}S=this.type,y.needsUpdate=!1,o.setRenderTarget(U,V,G)};function L(w,P){const b=t.update(D);g.defines.VSM_SAMPLES!==w.blurSamples&&(g.defines.VSM_SAMPLES=w.blurSamples,E.defines.VSM_SAMPLES=w.blurSamples,g.needsUpdate=!0,E.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new jn(l.x,l.y,{format:Fs,type:pi})),g.uniforms.shadow_pass.value=w.map.depthTexture,g.uniforms.resolution.value=w.mapSize,g.uniforms.radius.value=w.radius,o.setRenderTarget(w.mapPass),o.clear(),o.renderBufferDirect(P,null,b,g,D,null),E.uniforms.shadow_pass.value=w.mapPass.texture,E.uniforms.resolution.value=w.mapSize,E.uniforms.radius.value=w.radius,o.setRenderTarget(w.map),o.clear(),o.renderBufferDirect(P,null,b,E,D,null)}function z(w,P,b,U){let V=null;const G=b.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(G!==void 0)V=G;else if(V=b.isPointLight===!0?m:d,o.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const W=V.uuid,lt=P.uuid;let pt=p[W];pt===void 0&&(pt={},p[W]=pt);let j=pt[lt];j===void 0&&(j=V.clone(),pt[lt]=j,P.addEventListener("dispose",I)),V=j}if(V.visible=P.visible,V.wireframe=P.wireframe,U===jo?V.side=P.shadowSide!==null?P.shadowSide:P.side:V.side=P.shadowSide!==null?P.shadowSide:x[P.side],V.alphaMap=P.alphaMap,V.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,V.map=P.map,V.clipShadows=P.clipShadows,V.clippingPlanes=P.clippingPlanes,V.clipIntersection=P.clipIntersection,V.displacementMap=P.displacementMap,V.displacementScale=P.displacementScale,V.displacementBias=P.displacementBias,V.wireframeLinewidth=P.wireframeLinewidth,V.linewidth=P.linewidth,b.isPointLight===!0&&V.isMeshDistanceMaterial===!0){const W=o.properties.get(V);W.light=b}return V}function C(w,P,b,U,V){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&V===jo)&&(!w.frustumCulled||s.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,w.matrixWorld);const lt=t.update(w),pt=w.material;if(Array.isArray(pt)){const j=lt.groups;for(let B=0,F=j.length;B<F;B++){const $=j[B],ct=pt[$.materialIndex];if(ct&&ct.visible){const Et=z(w,ct,U,V);w.onBeforeShadow(o,w,P,b,lt,Et,$),o.renderBufferDirect(b,null,lt,Et,w,$),w.onAfterShadow(o,w,P,b,lt,Et,$)}}}else if(pt.visible){const j=z(w,pt,U,V);w.onBeforeShadow(o,w,P,b,lt,j,null),o.renderBufferDirect(b,null,lt,j,w,null),w.onAfterShadow(o,w,P,b,lt,j,null)}}const W=w.children;for(let lt=0,pt=W.length;lt<pt;lt++)C(W[lt],P,b,U,V)}function I(w){w.target.removeEventListener("dispose",I);for(const b in p){const U=p[b],V=w.target.uuid;V in U&&(U[V].dispose(),delete U[V])}}}function MA(o,t){function i(){let k=!1;const At=new an;let gt=null;const Ct=new an(0,0,0,0);return{setMask:function(It){gt!==It&&!k&&(o.colorMask(It,It,It,It),gt=It)},setLocked:function(It){k=It},setClear:function(It,yt,Wt,Gt,$e){$e===!0&&(It*=Gt,yt*=Gt,Wt*=Gt),At.set(It,yt,Wt,Gt),Ct.equals(At)===!1&&(o.clearColor(It,yt,Wt,Gt),Ct.copy(At))},reset:function(){k=!1,gt=null,Ct.set(-1,0,0,0)}}}function s(){let k=!1,At=!1,gt=null,Ct=null,It=null;return{setReversed:function(yt){if(At!==yt){const Wt=t.get("EXT_clip_control");yt?Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.ZERO_TO_ONE_EXT):Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.NEGATIVE_ONE_TO_ONE_EXT),At=yt;const Gt=It;It=null,this.setClear(Gt)}},getReversed:function(){return At},setTest:function(yt){yt?Mt(o.DEPTH_TEST):zt(o.DEPTH_TEST)},setMask:function(yt){gt!==yt&&!k&&(o.depthMask(yt),gt=yt)},setFunc:function(yt){if(At&&(yt=JM[yt]),Ct!==yt){switch(yt){case cd:o.depthFunc(o.NEVER);break;case fd:o.depthFunc(o.ALWAYS);break;case hd:o.depthFunc(o.LESS);break;case Hr:o.depthFunc(o.LEQUAL);break;case dd:o.depthFunc(o.EQUAL);break;case pd:o.depthFunc(o.GEQUAL);break;case md:o.depthFunc(o.GREATER);break;case gd:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}Ct=yt}},setLocked:function(yt){k=yt},setClear:function(yt){It!==yt&&(It=yt,At&&(yt=1-yt),o.clearDepth(yt))},reset:function(){k=!1,gt=null,Ct=null,It=null,At=!1}}}function l(){let k=!1,At=null,gt=null,Ct=null,It=null,yt=null,Wt=null,Gt=null,$e=null;return{setTest:function(Oe){k||(Oe?Mt(o.STENCIL_TEST):zt(o.STENCIL_TEST))},setMask:function(Oe){At!==Oe&&!k&&(o.stencilMask(Oe),At=Oe)},setFunc:function(Oe,$n,ti){(gt!==Oe||Ct!==$n||It!==ti)&&(o.stencilFunc(Oe,$n,ti),gt=Oe,Ct=$n,It=ti)},setOp:function(Oe,$n,ti){(yt!==Oe||Wt!==$n||Gt!==ti)&&(o.stencilOp(Oe,$n,ti),yt=Oe,Wt=$n,Gt=ti)},setLocked:function(Oe){k=Oe},setClear:function(Oe){$e!==Oe&&(o.clearStencil(Oe),$e=Oe)},reset:function(){k=!1,At=null,gt=null,Ct=null,It=null,yt=null,Wt=null,Gt=null,$e=null}}}const u=new i,h=new s,d=new l,m=new WeakMap,p=new WeakMap;let v={},x={},g={},E=new WeakMap,T=[],D=null,y=!1,S=null,L=null,z=null,C=null,I=null,w=null,P=null,b=new he(0,0,0),U=0,V=!1,G=null,W=null,lt=null,pt=null,j=null;const B=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,$=0;const ct=o.getParameter(o.VERSION);ct.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(ct)[1]),F=$>=1):ct.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(ct)[1]),F=$>=2);let Et=null,N={};const Z=o.getParameter(o.SCISSOR_BOX),St=o.getParameter(o.VIEWPORT),bt=new an().fromArray(Z),Nt=new an().fromArray(St);function tt(k,At,gt,Ct){const It=new Uint8Array(4),yt=o.createTexture();o.bindTexture(k,yt),o.texParameteri(k,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(k,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let Wt=0;Wt<gt;Wt++)k===o.TEXTURE_3D||k===o.TEXTURE_2D_ARRAY?o.texImage3D(At,0,o.RGBA,1,1,Ct,0,o.RGBA,o.UNSIGNED_BYTE,It):o.texImage2D(At+Wt,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,It);return yt}const xt={};xt[o.TEXTURE_2D]=tt(o.TEXTURE_2D,o.TEXTURE_2D,1),xt[o.TEXTURE_CUBE_MAP]=tt(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),xt[o.TEXTURE_2D_ARRAY]=tt(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),xt[o.TEXTURE_3D]=tt(o.TEXTURE_3D,o.TEXTURE_3D,1,1),u.setClear(0,0,0,1),h.setClear(1),d.setClear(0),Mt(o.DEPTH_TEST),h.setFunc(Hr),Ye(!1),Ze(M_),Mt(o.CULL_FACE),pe(Zi);function Mt(k){v[k]!==!0&&(o.enable(k),v[k]=!0)}function zt(k){v[k]!==!1&&(o.disable(k),v[k]=!1)}function te(k,At){return g[k]!==At?(o.bindFramebuffer(k,At),g[k]=At,k===o.DRAW_FRAMEBUFFER&&(g[o.FRAMEBUFFER]=At),k===o.FRAMEBUFFER&&(g[o.DRAW_FRAMEBUFFER]=At),!0):!1}function Kt(k,At){let gt=T,Ct=!1;if(k){gt=E.get(At),gt===void 0&&(gt=[],E.set(At,gt));const It=k.textures;if(gt.length!==It.length||gt[0]!==o.COLOR_ATTACHMENT0){for(let yt=0,Wt=It.length;yt<Wt;yt++)gt[yt]=o.COLOR_ATTACHMENT0+yt;gt.length=It.length,Ct=!0}}else gt[0]!==o.BACK&&(gt[0]=o.BACK,Ct=!0);Ct&&o.drawBuffers(gt)}function He(k){return D!==k?(o.useProgram(k),D=k,!0):!1}const re={[Ls]:o.FUNC_ADD,[SM]:o.FUNC_SUBTRACT,[MM]:o.FUNC_REVERSE_SUBTRACT};re[yM]=o.MIN,re[EM]=o.MAX;const de={[bM]:o.ZERO,[TM]:o.ONE,[AM]:o.SRC_COLOR,[ld]:o.SRC_ALPHA,[NM]:o.SRC_ALPHA_SATURATE,[DM]:o.DST_COLOR,[CM]:o.DST_ALPHA,[RM]:o.ONE_MINUS_SRC_COLOR,[ud]:o.ONE_MINUS_SRC_ALPHA,[UM]:o.ONE_MINUS_DST_COLOR,[wM]:o.ONE_MINUS_DST_ALPHA,[LM]:o.CONSTANT_COLOR,[OM]:o.ONE_MINUS_CONSTANT_COLOR,[PM]:o.CONSTANT_ALPHA,[IM]:o.ONE_MINUS_CONSTANT_ALPHA};function pe(k,At,gt,Ct,It,yt,Wt,Gt,$e,Oe){if(k===Zi){y===!0&&(zt(o.BLEND),y=!1);return}if(y===!1&&(Mt(o.BLEND),y=!0),k!==xM){if(k!==S||Oe!==V){if((L!==Ls||I!==Ls)&&(o.blendEquation(o.FUNC_ADD),L=Ls,I=Ls),Oe)switch(k){case zr:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case tc:o.blendFunc(o.ONE,o.ONE);break;case y_:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case E_:o.blendFuncSeparate(o.DST_COLOR,o.ONE_MINUS_SRC_ALPHA,o.ZERO,o.ONE);break;default:be("WebGLState: Invalid blending: ",k);break}else switch(k){case zr:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case tc:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE,o.ONE,o.ONE);break;case y_:be("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case E_:be("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:be("WebGLState: Invalid blending: ",k);break}z=null,C=null,w=null,P=null,b.set(0,0,0),U=0,S=k,V=Oe}return}It=It||At,yt=yt||gt,Wt=Wt||Ct,(At!==L||It!==I)&&(o.blendEquationSeparate(re[At],re[It]),L=At,I=It),(gt!==z||Ct!==C||yt!==w||Wt!==P)&&(o.blendFuncSeparate(de[gt],de[Ct],de[yt],de[Wt]),z=gt,C=Ct,w=yt,P=Wt),(Gt.equals(b)===!1||$e!==U)&&(o.blendColor(Gt.r,Gt.g,Gt.b,$e),b.copy(Gt),U=$e),S=k,V=!1}function ue(k,At){k.side===Li?zt(o.CULL_FACE):Mt(o.CULL_FACE);let gt=k.side===Jn;At&&(gt=!gt),Ye(gt),k.blending===zr&&k.transparent===!1?pe(Zi):pe(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),h.setFunc(k.depthFunc),h.setTest(k.depthTest),h.setMask(k.depthWrite),u.setMask(k.colorWrite);const Ct=k.stencilWrite;d.setTest(Ct),Ct&&(d.setMask(k.stencilWriteMask),d.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),d.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),je(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?Mt(o.SAMPLE_ALPHA_TO_COVERAGE):zt(o.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(k){G!==k&&(k?o.frontFace(o.CW):o.frontFace(o.CCW),G=k)}function Ze(k){k!==gM?(Mt(o.CULL_FACE),k!==W&&(k===M_?o.cullFace(o.BACK):k===_M?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):zt(o.CULL_FACE),W=k}function Ce(k){k!==lt&&(F&&o.lineWidth(k),lt=k)}function je(k,At,gt){k?(Mt(o.POLYGON_OFFSET_FILL),(pt!==At||j!==gt)&&(pt=At,j=gt,h.getReversed()&&(At=-At),o.polygonOffset(At,gt))):zt(o.POLYGON_OFFSET_FILL)}function Le(k){k?Mt(o.SCISSOR_TEST):zt(o.SCISSOR_TEST)}function Ke(k){k===void 0&&(k=o.TEXTURE0+B-1),Et!==k&&(o.activeTexture(k),Et=k)}function q(k,At,gt){gt===void 0&&(Et===null?gt=o.TEXTURE0+B-1:gt=Et);let Ct=N[gt];Ct===void 0&&(Ct={type:void 0,texture:void 0},N[gt]=Ct),(Ct.type!==k||Ct.texture!==At)&&(Et!==gt&&(o.activeTexture(gt),Et=gt),o.bindTexture(k,At||xt[k]),Ct.type=k,Ct.texture=At)}function De(){const k=N[Et];k!==void 0&&k.type!==void 0&&(o.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function Ee(){try{o.compressedTexImage2D(...arguments)}catch(k){be("WebGLState:",k)}}function O(){try{o.compressedTexImage3D(...arguments)}catch(k){be("WebGLState:",k)}}function M(){try{o.texSubImage2D(...arguments)}catch(k){be("WebGLState:",k)}}function J(){try{o.texSubImage3D(...arguments)}catch(k){be("WebGLState:",k)}}function st(){try{o.compressedTexSubImage2D(...arguments)}catch(k){be("WebGLState:",k)}}function ft(){try{o.compressedTexSubImage3D(...arguments)}catch(k){be("WebGLState:",k)}}function Tt(){try{o.texStorage2D(...arguments)}catch(k){be("WebGLState:",k)}}function wt(){try{o.texStorage3D(...arguments)}catch(k){be("WebGLState:",k)}}function ht(){try{o.texImage2D(...arguments)}catch(k){be("WebGLState:",k)}}function dt(){try{o.texImage3D(...arguments)}catch(k){be("WebGLState:",k)}}function Rt(k){return x[k]!==void 0?x[k]:o.getParameter(k)}function Bt(k,At){x[k]!==At&&(o.pixelStorei(k,At),x[k]=At)}function Lt(k){bt.equals(k)===!1&&(o.scissor(k.x,k.y,k.z,k.w),bt.copy(k))}function Dt(k){Nt.equals(k)===!1&&(o.viewport(k.x,k.y,k.z,k.w),Nt.copy(k))}function Qt(k,At){let gt=p.get(At);gt===void 0&&(gt=new WeakMap,p.set(At,gt));let Ct=gt.get(k);Ct===void 0&&(Ct=o.getUniformBlockIndex(At,k.name),gt.set(k,Ct))}function Jt(k,At){const Ct=p.get(At).get(k);m.get(At)!==Ct&&(o.uniformBlockBinding(At,Ct,k.__bindingPointIndex),m.set(At,Ct))}function ne(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),h.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),o.pixelStorei(o.PACK_ALIGNMENT,4),o.pixelStorei(o.UNPACK_ALIGNMENT,4),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!1),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,o.BROWSER_DEFAULT_WEBGL),o.pixelStorei(o.PACK_ROW_LENGTH,0),o.pixelStorei(o.PACK_SKIP_PIXELS,0),o.pixelStorei(o.PACK_SKIP_ROWS,0),o.pixelStorei(o.UNPACK_ROW_LENGTH,0),o.pixelStorei(o.UNPACK_IMAGE_HEIGHT,0),o.pixelStorei(o.UNPACK_SKIP_PIXELS,0),o.pixelStorei(o.UNPACK_SKIP_ROWS,0),o.pixelStorei(o.UNPACK_SKIP_IMAGES,0),v={},x={},Et=null,N={},g={},E=new WeakMap,T=[],D=null,y=!1,S=null,L=null,z=null,C=null,I=null,w=null,P=null,b=new he(0,0,0),U=0,V=!1,G=null,W=null,lt=null,pt=null,j=null,bt.set(0,0,o.canvas.width,o.canvas.height),Nt.set(0,0,o.canvas.width,o.canvas.height),u.reset(),h.reset(),d.reset()}return{buffers:{color:u,depth:h,stencil:d},enable:Mt,disable:zt,bindFramebuffer:te,drawBuffers:Kt,useProgram:He,setBlending:pe,setMaterial:ue,setFlipSided:Ye,setCullFace:Ze,setLineWidth:Ce,setPolygonOffset:je,setScissorTest:Le,activeTexture:Ke,bindTexture:q,unbindTexture:De,compressedTexImage2D:Ee,compressedTexImage3D:O,texImage2D:ht,texImage3D:dt,pixelStorei:Bt,getParameter:Rt,updateUBOMapping:Qt,uniformBlockBinding:Jt,texStorage2D:Tt,texStorage3D:wt,texSubImage2D:M,texSubImage3D:J,compressedTexSubImage2D:st,compressedTexSubImage3D:ft,scissor:Lt,viewport:Dt,reset:ne}}function yA(o,t,i,s,l,u,h){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Zt,v=new WeakMap,x=new Set;let g;const E=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function D(O,M){return T?new OffscreenCanvas(O,M):sc("canvas")}function y(O,M,J){let st=1;const ft=Ee(O);if((ft.width>J||ft.height>J)&&(st=J/Math.max(ft.width,ft.height)),st<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const Tt=Math.floor(st*ft.width),wt=Math.floor(st*ft.height);g===void 0&&(g=D(Tt,wt));const ht=M?D(Tt,wt):g;return ht.width=Tt,ht.height=wt,ht.getContext("2d").drawImage(O,0,0,Tt,wt),ie("WebGLRenderer: Texture has been resized from ("+ft.width+"x"+ft.height+") to ("+Tt+"x"+wt+")."),ht}else return"data"in O&&ie("WebGLRenderer: Image in DataTexture is too big ("+ft.width+"x"+ft.height+")."),O;return O}function S(O){return O.generateMipmaps}function L(O){o.generateMipmap(O)}function z(O){return O.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?o.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function C(O,M,J,st,ft,Tt=!1){if(O!==null){if(o[O]!==void 0)return o[O];ie("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let wt;st&&(wt=t.get("EXT_texture_norm16"),wt||ie("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ht=M;if(M===o.RED&&(J===o.FLOAT&&(ht=o.R32F),J===o.HALF_FLOAT&&(ht=o.R16F),J===o.UNSIGNED_BYTE&&(ht=o.R8),J===o.UNSIGNED_SHORT&&wt&&(ht=wt.R16_EXT),J===o.SHORT&&wt&&(ht=wt.R16_SNORM_EXT)),M===o.RED_INTEGER&&(J===o.UNSIGNED_BYTE&&(ht=o.R8UI),J===o.UNSIGNED_SHORT&&(ht=o.R16UI),J===o.UNSIGNED_INT&&(ht=o.R32UI),J===o.BYTE&&(ht=o.R8I),J===o.SHORT&&(ht=o.R16I),J===o.INT&&(ht=o.R32I)),M===o.RG&&(J===o.FLOAT&&(ht=o.RG32F),J===o.HALF_FLOAT&&(ht=o.RG16F),J===o.UNSIGNED_BYTE&&(ht=o.RG8),J===o.UNSIGNED_SHORT&&wt&&(ht=wt.RG16_EXT),J===o.SHORT&&wt&&(ht=wt.RG16_SNORM_EXT)),M===o.RG_INTEGER&&(J===o.UNSIGNED_BYTE&&(ht=o.RG8UI),J===o.UNSIGNED_SHORT&&(ht=o.RG16UI),J===o.UNSIGNED_INT&&(ht=o.RG32UI),J===o.BYTE&&(ht=o.RG8I),J===o.SHORT&&(ht=o.RG16I),J===o.INT&&(ht=o.RG32I)),M===o.RGB_INTEGER&&(J===o.UNSIGNED_BYTE&&(ht=o.RGB8UI),J===o.UNSIGNED_SHORT&&(ht=o.RGB16UI),J===o.UNSIGNED_INT&&(ht=o.RGB32UI),J===o.BYTE&&(ht=o.RGB8I),J===o.SHORT&&(ht=o.RGB16I),J===o.INT&&(ht=o.RGB32I)),M===o.RGBA_INTEGER&&(J===o.UNSIGNED_BYTE&&(ht=o.RGBA8UI),J===o.UNSIGNED_SHORT&&(ht=o.RGBA16UI),J===o.UNSIGNED_INT&&(ht=o.RGBA32UI),J===o.BYTE&&(ht=o.RGBA8I),J===o.SHORT&&(ht=o.RGBA16I),J===o.INT&&(ht=o.RGBA32I)),M===o.RGB&&(J===o.UNSIGNED_SHORT&&wt&&(ht=wt.RGB16_EXT),J===o.SHORT&&wt&&(ht=wt.RGB16_SNORM_EXT),J===o.UNSIGNED_INT_5_9_9_9_REV&&(ht=o.RGB9_E5),J===o.UNSIGNED_INT_10F_11F_11F_REV&&(ht=o.R11F_G11F_B10F)),M===o.RGBA){const dt=Tt?ac:Se.getTransfer(ft);J===o.FLOAT&&(ht=o.RGBA32F),J===o.HALF_FLOAT&&(ht=o.RGBA16F),J===o.UNSIGNED_BYTE&&(ht=dt===Ne?o.SRGB8_ALPHA8:o.RGBA8),J===o.UNSIGNED_SHORT&&wt&&(ht=wt.RGBA16_EXT),J===o.SHORT&&wt&&(ht=wt.RGBA16_SNORM_EXT),J===o.UNSIGNED_SHORT_4_4_4_4&&(ht=o.RGBA4),J===o.UNSIGNED_SHORT_5_5_5_1&&(ht=o.RGB5_A1)}return(ht===o.R16F||ht===o.R32F||ht===o.RG16F||ht===o.RG32F||ht===o.RGBA16F||ht===o.RGBA32F)&&t.get("EXT_color_buffer_float"),ht}function I(O,M){let J;return O?M===null||M===Qi||M===el?J=o.DEPTH24_STENCIL8:M===qi?J=o.DEPTH32F_STENCIL8:M===tl&&(J=o.DEPTH24_STENCIL8,ie("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Qi||M===el?J=o.DEPTH_COMPONENT24:M===qi?J=o.DEPTH_COMPONENT32F:M===tl&&(J=o.DEPTH_COMPONENT16),J}function w(O,M){return S(O)===!0||O.isFramebufferTexture&&O.minFilter!==Dn&&O.minFilter!==vn?Math.log2(Math.max(M.width,M.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?M.mipmaps.length:1}function P(O){const M=O.target;M.removeEventListener("dispose",P),U(M),M.isVideoTexture&&v.delete(M),M.isHTMLTexture&&x.delete(M)}function b(O){const M=O.target;M.removeEventListener("dispose",b),G(M)}function U(O){const M=s.get(O);if(M.__webglInit===void 0)return;const J=O.source,st=E.get(J);if(st){const ft=st[M.__cacheKey];ft.usedTimes--,ft.usedTimes===0&&V(O),Object.keys(st).length===0&&E.delete(J)}s.remove(O)}function V(O){const M=s.get(O);o.deleteTexture(M.__webglTexture);const J=O.source,st=E.get(J);delete st[M.__cacheKey],h.memory.textures--}function G(O){const M=s.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),s.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let st=0;st<6;st++){if(Array.isArray(M.__webglFramebuffer[st]))for(let ft=0;ft<M.__webglFramebuffer[st].length;ft++)o.deleteFramebuffer(M.__webglFramebuffer[st][ft]);else o.deleteFramebuffer(M.__webglFramebuffer[st]);M.__webglDepthbuffer&&o.deleteRenderbuffer(M.__webglDepthbuffer[st])}else{if(Array.isArray(M.__webglFramebuffer))for(let st=0;st<M.__webglFramebuffer.length;st++)o.deleteFramebuffer(M.__webglFramebuffer[st]);else o.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&o.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&o.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let st=0;st<M.__webglColorRenderbuffer.length;st++)M.__webglColorRenderbuffer[st]&&o.deleteRenderbuffer(M.__webglColorRenderbuffer[st]);M.__webglDepthRenderbuffer&&o.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const J=O.textures;for(let st=0,ft=J.length;st<ft;st++){const Tt=s.get(J[st]);Tt.__webglTexture&&(o.deleteTexture(Tt.__webglTexture),h.memory.textures--),s.remove(J[st])}s.remove(O)}let W=0;function lt(){W=0}function pt(){return W}function j(O){W=O}function B(){const O=W;return O>=l.maxTextures&&ie("WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+l.maxTextures),W+=1,O}function F(O){const M=[];return M.push(O.wrapS),M.push(O.wrapT),M.push(O.wrapR||0),M.push(O.magFilter),M.push(O.minFilter),M.push(O.anisotropy),M.push(O.internalFormat),M.push(O.format),M.push(O.type),M.push(O.generateMipmaps),M.push(O.premultiplyAlpha),M.push(O.flipY),M.push(O.unpackAlignment),M.push(O.colorSpace),M.join()}function $(O,M){const J=s.get(O);if(O.isVideoTexture&&q(O),O.isRenderTargetTexture===!1&&O.isExternalTexture!==!0&&O.version>0&&J.__version!==O.version){const st=O.image;if(st===null)ie("WebGLRenderer: Texture marked for update but no image data found.");else if(st.complete===!1)ie("WebGLRenderer: Texture marked for update but image is incomplete");else{zt(J,O,M);return}}else O.isExternalTexture&&(J.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(o.TEXTURE_2D,J.__webglTexture,o.TEXTURE0+M)}function ct(O,M){const J=s.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&J.__version!==O.version){zt(J,O,M);return}else O.isExternalTexture&&(J.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(o.TEXTURE_2D_ARRAY,J.__webglTexture,o.TEXTURE0+M)}function Et(O,M){const J=s.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&J.__version!==O.version){zt(J,O,M);return}i.bindTexture(o.TEXTURE_3D,J.__webglTexture,o.TEXTURE0+M)}function N(O,M){const J=s.get(O);if(O.isCubeDepthTexture!==!0&&O.version>0&&J.__version!==O.version){te(J,O,M);return}i.bindTexture(o.TEXTURE_CUBE_MAP,J.__webglTexture,o.TEXTURE0+M)}const Z={[_d]:o.REPEAT,[Ma]:o.CLAMP_TO_EDGE,[vd]:o.MIRRORED_REPEAT},St={[Dn]:o.NEAREST,[FM]:o.NEAREST_MIPMAP_NEAREST,[vu]:o.NEAREST_MIPMAP_LINEAR,[vn]:o.LINEAR,[wh]:o.LINEAR_MIPMAP_NEAREST,[Ps]:o.LINEAR_MIPMAP_LINEAR},bt={[VM]:o.NEVER,[YM]:o.ALWAYS,[XM]:o.LESS,[pp]:o.LEQUAL,[kM]:o.EQUAL,[mp]:o.GEQUAL,[WM]:o.GREATER,[qM]:o.NOTEQUAL};function Nt(O,M){if(M.type===qi&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===vn||M.magFilter===wh||M.magFilter===vu||M.magFilter===Ps||M.minFilter===vn||M.minFilter===wh||M.minFilter===vu||M.minFilter===Ps)&&ie("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(O,o.TEXTURE_WRAP_S,Z[M.wrapS]),o.texParameteri(O,o.TEXTURE_WRAP_T,Z[M.wrapT]),(O===o.TEXTURE_3D||O===o.TEXTURE_2D_ARRAY)&&o.texParameteri(O,o.TEXTURE_WRAP_R,Z[M.wrapR]),o.texParameteri(O,o.TEXTURE_MAG_FILTER,St[M.magFilter]),o.texParameteri(O,o.TEXTURE_MIN_FILTER,St[M.minFilter]),M.compareFunction&&(o.texParameteri(O,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(O,o.TEXTURE_COMPARE_FUNC,bt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Dn||M.minFilter!==vu&&M.minFilter!==Ps||M.type===qi&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||s.get(M).__currentAnisotropy){const J=t.get("EXT_texture_filter_anisotropic");o.texParameterf(O,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,l.getMaxAnisotropy())),s.get(M).__currentAnisotropy=M.anisotropy}}}function tt(O,M){let J=!1;O.__webglInit===void 0&&(O.__webglInit=!0,M.addEventListener("dispose",P));const st=M.source;let ft=E.get(st);ft===void 0&&(ft={},E.set(st,ft));const Tt=F(M);if(Tt!==O.__cacheKey){ft[Tt]===void 0&&(ft[Tt]={texture:o.createTexture(),usedTimes:0},h.memory.textures++,J=!0),ft[Tt].usedTimes++;const wt=ft[O.__cacheKey];wt!==void 0&&(ft[O.__cacheKey].usedTimes--,wt.usedTimes===0&&V(M)),O.__cacheKey=Tt,O.__webglTexture=ft[Tt].texture}return J}function xt(O,M,J){return Math.floor(Math.floor(O/J)/M)}function Mt(O,M,J,st){const Tt=O.updateRanges;if(Tt.length===0)i.texSubImage2D(o.TEXTURE_2D,0,0,0,M.width,M.height,J,st,M.data);else{Tt.sort((Bt,Lt)=>Bt.start-Lt.start);let wt=0;for(let Bt=1;Bt<Tt.length;Bt++){const Lt=Tt[wt],Dt=Tt[Bt],Qt=Lt.start+Lt.count,Jt=xt(Dt.start,M.width,4),ne=xt(Lt.start,M.width,4);Dt.start<=Qt+1&&Jt===ne&&xt(Dt.start+Dt.count-1,M.width,4)===Jt?Lt.count=Math.max(Lt.count,Dt.start+Dt.count-Lt.start):(++wt,Tt[wt]=Dt)}Tt.length=wt+1;const ht=i.getParameter(o.UNPACK_ROW_LENGTH),dt=i.getParameter(o.UNPACK_SKIP_PIXELS),Rt=i.getParameter(o.UNPACK_SKIP_ROWS);i.pixelStorei(o.UNPACK_ROW_LENGTH,M.width);for(let Bt=0,Lt=Tt.length;Bt<Lt;Bt++){const Dt=Tt[Bt],Qt=Math.floor(Dt.start/4),Jt=Math.ceil(Dt.count/4),ne=Qt%M.width,k=Math.floor(Qt/M.width),At=Jt,gt=1;i.pixelStorei(o.UNPACK_SKIP_PIXELS,ne),i.pixelStorei(o.UNPACK_SKIP_ROWS,k),i.texSubImage2D(o.TEXTURE_2D,0,ne,k,At,gt,J,st,M.data)}O.clearUpdateRanges(),i.pixelStorei(o.UNPACK_ROW_LENGTH,ht),i.pixelStorei(o.UNPACK_SKIP_PIXELS,dt),i.pixelStorei(o.UNPACK_SKIP_ROWS,Rt)}}function zt(O,M,J){let st=o.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(st=o.TEXTURE_2D_ARRAY),M.isData3DTexture&&(st=o.TEXTURE_3D);const ft=tt(O,M),Tt=M.source;i.bindTexture(st,O.__webglTexture,o.TEXTURE0+J);const wt=s.get(Tt);if(Tt.version!==wt.__version||ft===!0){if(i.activeTexture(o.TEXTURE0+J),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const gt=Se.getPrimaries(Se.workingColorSpace),Ct=M.colorSpace===is?null:Se.getPrimaries(M.colorSpace),It=M.colorSpace===is||gt===Ct?o.NONE:o.BROWSER_DEFAULT_WEBGL;i.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,It)}i.pixelStorei(o.UNPACK_ALIGNMENT,M.unpackAlignment);let dt=y(M.image,!1,l.maxTextureSize);dt=De(M,dt);const Rt=u.convert(M.format,M.colorSpace),Bt=u.convert(M.type);let Lt=C(M.internalFormat,Rt,Bt,M.normalized,M.colorSpace,M.isVideoTexture);Nt(st,M);let Dt;const Qt=M.mipmaps,Jt=M.isVideoTexture!==!0,ne=wt.__version===void 0||ft===!0,k=Tt.dataReady,At=w(M,dt);if(M.isDepthTexture)Lt=I(M.format===Is,M.type),ne&&(Jt?i.texStorage2D(o.TEXTURE_2D,1,Lt,dt.width,dt.height):i.texImage2D(o.TEXTURE_2D,0,Lt,dt.width,dt.height,0,Rt,Bt,null));else if(M.isDataTexture)if(Qt.length>0){Jt&&ne&&i.texStorage2D(o.TEXTURE_2D,At,Lt,Qt[0].width,Qt[0].height);for(let gt=0,Ct=Qt.length;gt<Ct;gt++)Dt=Qt[gt],Jt?k&&i.texSubImage2D(o.TEXTURE_2D,gt,0,0,Dt.width,Dt.height,Rt,Bt,Dt.data):i.texImage2D(o.TEXTURE_2D,gt,Lt,Dt.width,Dt.height,0,Rt,Bt,Dt.data);M.generateMipmaps=!1}else Jt?(ne&&i.texStorage2D(o.TEXTURE_2D,At,Lt,dt.width,dt.height),k&&Mt(M,dt,Rt,Bt)):i.texImage2D(o.TEXTURE_2D,0,Lt,dt.width,dt.height,0,Rt,Bt,dt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Jt&&ne&&i.texStorage3D(o.TEXTURE_2D_ARRAY,At,Lt,Qt[0].width,Qt[0].height,dt.depth);for(let gt=0,Ct=Qt.length;gt<Ct;gt++)if(Dt=Qt[gt],M.format!==Oi)if(Rt!==null)if(Jt){if(k)if(M.layerUpdates.size>0){const It=Q_(Dt.width,Dt.height,M.format,M.type);for(const yt of M.layerUpdates){const Wt=Dt.data.subarray(yt*It/Dt.data.BYTES_PER_ELEMENT,(yt+1)*It/Dt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,gt,0,0,yt,Dt.width,Dt.height,1,Rt,Wt)}M.clearLayerUpdates()}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,gt,0,0,0,Dt.width,Dt.height,dt.depth,Rt,Dt.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,gt,Lt,Dt.width,Dt.height,dt.depth,0,Dt.data,0,0);else ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Jt?k&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,gt,0,0,0,Dt.width,Dt.height,dt.depth,Rt,Bt,Dt.data):i.texImage3D(o.TEXTURE_2D_ARRAY,gt,Lt,Dt.width,Dt.height,dt.depth,0,Rt,Bt,Dt.data)}else{Jt&&ne&&i.texStorage2D(o.TEXTURE_2D,At,Lt,Qt[0].width,Qt[0].height);for(let gt=0,Ct=Qt.length;gt<Ct;gt++)Dt=Qt[gt],M.format!==Oi?Rt!==null?Jt?k&&i.compressedTexSubImage2D(o.TEXTURE_2D,gt,0,0,Dt.width,Dt.height,Rt,Dt.data):i.compressedTexImage2D(o.TEXTURE_2D,gt,Lt,Dt.width,Dt.height,0,Dt.data):ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?k&&i.texSubImage2D(o.TEXTURE_2D,gt,0,0,Dt.width,Dt.height,Rt,Bt,Dt.data):i.texImage2D(o.TEXTURE_2D,gt,Lt,Dt.width,Dt.height,0,Rt,Bt,Dt.data)}else if(M.isDataArrayTexture)if(Jt){if(ne&&i.texStorage3D(o.TEXTURE_2D_ARRAY,At,Lt,dt.width,dt.height,dt.depth),k)if(M.layerUpdates.size>0){const gt=Q_(dt.width,dt.height,M.format,M.type);for(const Ct of M.layerUpdates){const It=dt.data.subarray(Ct*gt/dt.data.BYTES_PER_ELEMENT,(Ct+1)*gt/dt.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,Ct,dt.width,dt.height,1,Rt,Bt,It)}M.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,dt.width,dt.height,dt.depth,Rt,Bt,dt.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,Lt,dt.width,dt.height,dt.depth,0,Rt,Bt,dt.data);else if(M.isData3DTexture)Jt?(ne&&i.texStorage3D(o.TEXTURE_3D,At,Lt,dt.width,dt.height,dt.depth),k&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,dt.width,dt.height,dt.depth,Rt,Bt,dt.data)):i.texImage3D(o.TEXTURE_3D,0,Lt,dt.width,dt.height,dt.depth,0,Rt,Bt,dt.data);else if(M.isFramebufferTexture){if(ne)if(Jt)i.texStorage2D(o.TEXTURE_2D,At,Lt,dt.width,dt.height);else{let gt=dt.width,Ct=dt.height;for(let It=0;It<At;It++)i.texImage2D(o.TEXTURE_2D,It,Lt,gt,Ct,0,Rt,Bt,null),gt>>=1,Ct>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in o){const gt=o.canvas;if(gt.hasAttribute("layoutsubtree")||gt.setAttribute("layoutsubtree","true"),dt.parentNode!==gt){gt.appendChild(dt),x.add(M),gt.onpaint=Ct=>{const It=Ct.changedElements;for(const yt of x)It.includes(yt.image)&&(yt.needsUpdate=!0)},gt.requestPaint();return}if(o.texElementImage2D.length===3)o.texElementImage2D(o.TEXTURE_2D,o.RGBA8,dt);else{const It=o.RGBA,yt=o.RGBA,Wt=o.UNSIGNED_BYTE;o.texElementImage2D(o.TEXTURE_2D,0,It,yt,Wt,dt)}o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE)}}else if(Qt.length>0){if(Jt&&ne){const gt=Ee(Qt[0]);i.texStorage2D(o.TEXTURE_2D,At,Lt,gt.width,gt.height)}for(let gt=0,Ct=Qt.length;gt<Ct;gt++)Dt=Qt[gt],Jt?k&&i.texSubImage2D(o.TEXTURE_2D,gt,0,0,Rt,Bt,Dt):i.texImage2D(o.TEXTURE_2D,gt,Lt,Rt,Bt,Dt);M.generateMipmaps=!1}else if(Jt){if(ne){const gt=Ee(dt);i.texStorage2D(o.TEXTURE_2D,At,Lt,gt.width,gt.height)}k&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Rt,Bt,dt)}else i.texImage2D(o.TEXTURE_2D,0,Lt,Rt,Bt,dt);S(M)&&L(st),wt.__version=Tt.version,M.onUpdate&&M.onUpdate(M)}O.__version=M.version}function te(O,M,J){if(M.image.length!==6)return;const st=tt(O,M),ft=M.source;i.bindTexture(o.TEXTURE_CUBE_MAP,O.__webglTexture,o.TEXTURE0+J);const Tt=s.get(ft);if(ft.version!==Tt.__version||st===!0){i.activeTexture(o.TEXTURE0+J);const wt=Se.getPrimaries(Se.workingColorSpace),ht=M.colorSpace===is?null:Se.getPrimaries(M.colorSpace),dt=M.colorSpace===is||wt===ht?o.NONE:o.BROWSER_DEFAULT_WEBGL;i.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(o.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const Rt=M.isCompressedTexture||M.image[0].isCompressedTexture,Bt=M.image[0]&&M.image[0].isDataTexture,Lt=[];for(let yt=0;yt<6;yt++)!Rt&&!Bt?Lt[yt]=y(M.image[yt],!0,l.maxCubemapSize):Lt[yt]=Bt?M.image[yt].image:M.image[yt],Lt[yt]=De(M,Lt[yt]);const Dt=Lt[0],Qt=u.convert(M.format,M.colorSpace),Jt=u.convert(M.type),ne=C(M.internalFormat,Qt,Jt,M.normalized,M.colorSpace),k=M.isVideoTexture!==!0,At=Tt.__version===void 0||st===!0,gt=ft.dataReady;let Ct=w(M,Dt);Nt(o.TEXTURE_CUBE_MAP,M);let It;if(Rt){k&&At&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Ct,ne,Dt.width,Dt.height);for(let yt=0;yt<6;yt++){It=Lt[yt].mipmaps;for(let Wt=0;Wt<It.length;Wt++){const Gt=It[Wt];M.format!==Oi?Qt!==null?k?gt&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Wt,0,0,Gt.width,Gt.height,Qt,Gt.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Wt,ne,Gt.width,Gt.height,0,Gt.data):ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?gt&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Wt,0,0,Gt.width,Gt.height,Qt,Jt,Gt.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Wt,ne,Gt.width,Gt.height,0,Qt,Jt,Gt.data)}}}else{if(It=M.mipmaps,k&&At){It.length>0&&Ct++;const yt=Ee(Lt[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Ct,ne,yt.width,yt.height)}for(let yt=0;yt<6;yt++)if(Bt){k?gt&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,0,0,Lt[yt].width,Lt[yt].height,Qt,Jt,Lt[yt].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,ne,Lt[yt].width,Lt[yt].height,0,Qt,Jt,Lt[yt].data);for(let Wt=0;Wt<It.length;Wt++){const $e=It[Wt].image[yt].image;k?gt&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Wt+1,0,0,$e.width,$e.height,Qt,Jt,$e.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Wt+1,ne,$e.width,$e.height,0,Qt,Jt,$e.data)}}else{k?gt&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,0,0,Qt,Jt,Lt[yt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,ne,Qt,Jt,Lt[yt]);for(let Wt=0;Wt<It.length;Wt++){const Gt=It[Wt];k?gt&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Wt+1,0,0,Qt,Jt,Gt.image[yt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Wt+1,ne,Qt,Jt,Gt.image[yt])}}}S(M)&&L(o.TEXTURE_CUBE_MAP),Tt.__version=ft.version,M.onUpdate&&M.onUpdate(M)}O.__version=M.version}function Kt(O,M,J,st,ft,Tt){const wt=u.convert(J.format,J.colorSpace),ht=u.convert(J.type),dt=C(J.internalFormat,wt,ht,J.normalized,J.colorSpace),Rt=s.get(M),Bt=s.get(J);if(Bt.__renderTarget=M,!Rt.__hasExternalTextures){const Lt=Math.max(1,M.width>>Tt),Dt=Math.max(1,M.height>>Tt);ft===o.TEXTURE_3D||ft===o.TEXTURE_2D_ARRAY?i.texImage3D(ft,Tt,dt,Lt,Dt,M.depth,0,wt,ht,null):i.texImage2D(ft,Tt,dt,Lt,Dt,0,wt,ht,null)}i.bindFramebuffer(o.FRAMEBUFFER,O),Ke(M)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,st,ft,Bt.__webglTexture,0,Le(M)):(ft===o.TEXTURE_2D||ft>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&ft<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,st,ft,Bt.__webglTexture,Tt),i.bindFramebuffer(o.FRAMEBUFFER,null)}function He(O,M,J){if(o.bindRenderbuffer(o.RENDERBUFFER,O),M.depthBuffer){const st=M.depthTexture,ft=st&&st.isDepthTexture?st.type:null,Tt=I(M.stencilBuffer,ft),wt=M.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;Ke(M)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Le(M),Tt,M.width,M.height):J?o.renderbufferStorageMultisample(o.RENDERBUFFER,Le(M),Tt,M.width,M.height):o.renderbufferStorage(o.RENDERBUFFER,Tt,M.width,M.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,wt,o.RENDERBUFFER,O)}else{const st=M.textures;for(let ft=0;ft<st.length;ft++){const Tt=st[ft],wt=u.convert(Tt.format,Tt.colorSpace),ht=u.convert(Tt.type),dt=C(Tt.internalFormat,wt,ht,Tt.normalized,Tt.colorSpace);Ke(M)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Le(M),dt,M.width,M.height):J?o.renderbufferStorageMultisample(o.RENDERBUFFER,Le(M),dt,M.width,M.height):o.renderbufferStorage(o.RENDERBUFFER,dt,M.width,M.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function re(O,M,J){const st=M.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(o.FRAMEBUFFER,O),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ft=s.get(M.depthTexture);if(ft.__renderTarget=M,(!ft.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),st){if(ft.__webglInit===void 0&&(ft.__webglInit=!0,M.depthTexture.addEventListener("dispose",P)),ft.__webglTexture===void 0){ft.__webglTexture=o.createTexture(),i.bindTexture(o.TEXTURE_CUBE_MAP,ft.__webglTexture),Nt(o.TEXTURE_CUBE_MAP,M.depthTexture);const Rt=u.convert(M.depthTexture.format),Bt=u.convert(M.depthTexture.type);let Lt;M.depthTexture.format===Ea?Lt=o.DEPTH_COMPONENT24:M.depthTexture.format===Is&&(Lt=o.DEPTH24_STENCIL8);for(let Dt=0;Dt<6;Dt++)o.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,0,Lt,M.width,M.height,0,Rt,Bt,null)}}else $(M.depthTexture,0);const Tt=ft.__webglTexture,wt=Le(M),ht=st?o.TEXTURE_CUBE_MAP_POSITIVE_X+J:o.TEXTURE_2D,dt=M.depthTexture.format===Is?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;if(M.depthTexture.format===Ea)Ke(M)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,dt,ht,Tt,0,wt):o.framebufferTexture2D(o.FRAMEBUFFER,dt,ht,Tt,0);else if(M.depthTexture.format===Is)Ke(M)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,dt,ht,Tt,0,wt):o.framebufferTexture2D(o.FRAMEBUFFER,dt,ht,Tt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function de(O){const M=s.get(O),J=O.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==O.depthTexture){const st=O.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),st){const ft=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,st.removeEventListener("dispose",ft)};st.addEventListener("dispose",ft),M.__depthDisposeCallback=ft}M.__boundDepthTexture=st}if(O.depthTexture&&!M.__autoAllocateDepthBuffer)if(J)for(let st=0;st<6;st++)re(M.__webglFramebuffer[st],O,st);else{const st=O.texture.mipmaps;st&&st.length>0?re(M.__webglFramebuffer[0],O,0):re(M.__webglFramebuffer,O,0)}else if(J){M.__webglDepthbuffer=[];for(let st=0;st<6;st++)if(i.bindFramebuffer(o.FRAMEBUFFER,M.__webglFramebuffer[st]),M.__webglDepthbuffer[st]===void 0)M.__webglDepthbuffer[st]=o.createRenderbuffer(),He(M.__webglDepthbuffer[st],O,!1);else{const ft=O.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Tt=M.__webglDepthbuffer[st];o.bindRenderbuffer(o.RENDERBUFFER,Tt),o.framebufferRenderbuffer(o.FRAMEBUFFER,ft,o.RENDERBUFFER,Tt)}}else{const st=O.texture.mipmaps;if(st&&st.length>0?i.bindFramebuffer(o.FRAMEBUFFER,M.__webglFramebuffer[0]):i.bindFramebuffer(o.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=o.createRenderbuffer(),He(M.__webglDepthbuffer,O,!1);else{const ft=O.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Tt=M.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,Tt),o.framebufferRenderbuffer(o.FRAMEBUFFER,ft,o.RENDERBUFFER,Tt)}}i.bindFramebuffer(o.FRAMEBUFFER,null)}function pe(O,M,J){const st=s.get(O);M!==void 0&&Kt(st.__webglFramebuffer,O,O.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),J!==void 0&&de(O)}function ue(O){const M=O.texture,J=s.get(O),st=s.get(M);O.addEventListener("dispose",b);const ft=O.textures,Tt=O.isWebGLCubeRenderTarget===!0,wt=ft.length>1;if(wt||(st.__webglTexture===void 0&&(st.__webglTexture=o.createTexture()),st.__version=M.version,h.memory.textures++),Tt){J.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(M.mipmaps&&M.mipmaps.length>0){J.__webglFramebuffer[ht]=[];for(let dt=0;dt<M.mipmaps.length;dt++)J.__webglFramebuffer[ht][dt]=o.createFramebuffer()}else J.__webglFramebuffer[ht]=o.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){J.__webglFramebuffer=[];for(let ht=0;ht<M.mipmaps.length;ht++)J.__webglFramebuffer[ht]=o.createFramebuffer()}else J.__webglFramebuffer=o.createFramebuffer();if(wt)for(let ht=0,dt=ft.length;ht<dt;ht++){const Rt=s.get(ft[ht]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=o.createTexture(),h.memory.textures++)}if(O.samples>0&&Ke(O)===!1){J.__webglMultisampledFramebuffer=o.createFramebuffer(),J.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let ht=0;ht<ft.length;ht++){const dt=ft[ht];J.__webglColorRenderbuffer[ht]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,J.__webglColorRenderbuffer[ht]);const Rt=u.convert(dt.format,dt.colorSpace),Bt=u.convert(dt.type),Lt=C(dt.internalFormat,Rt,Bt,dt.normalized,dt.colorSpace,O.isXRRenderTarget===!0),Dt=Le(O);o.renderbufferStorageMultisample(o.RENDERBUFFER,Dt,Lt,O.width,O.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+ht,o.RENDERBUFFER,J.__webglColorRenderbuffer[ht])}o.bindRenderbuffer(o.RENDERBUFFER,null),O.depthBuffer&&(J.__webglDepthRenderbuffer=o.createRenderbuffer(),He(J.__webglDepthRenderbuffer,O,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(Tt){i.bindTexture(o.TEXTURE_CUBE_MAP,st.__webglTexture),Nt(o.TEXTURE_CUBE_MAP,M);for(let ht=0;ht<6;ht++)if(M.mipmaps&&M.mipmaps.length>0)for(let dt=0;dt<M.mipmaps.length;dt++)Kt(J.__webglFramebuffer[ht][dt],O,M,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+ht,dt);else Kt(J.__webglFramebuffer[ht],O,M,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);S(M)&&L(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(wt){for(let ht=0,dt=ft.length;ht<dt;ht++){const Rt=ft[ht],Bt=s.get(Rt);let Lt=o.TEXTURE_2D;(O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Lt=O.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Lt,Bt.__webglTexture),Nt(Lt,Rt),Kt(J.__webglFramebuffer,O,Rt,o.COLOR_ATTACHMENT0+ht,Lt,0),S(Rt)&&L(Lt)}i.unbindTexture()}else{let ht=o.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(ht=O.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(ht,st.__webglTexture),Nt(ht,M),M.mipmaps&&M.mipmaps.length>0)for(let dt=0;dt<M.mipmaps.length;dt++)Kt(J.__webglFramebuffer[dt],O,M,o.COLOR_ATTACHMENT0,ht,dt);else Kt(J.__webglFramebuffer,O,M,o.COLOR_ATTACHMENT0,ht,0);S(M)&&L(ht),i.unbindTexture()}O.depthBuffer&&de(O)}function Ye(O){const M=O.textures;for(let J=0,st=M.length;J<st;J++){const ft=M[J];if(S(ft)){const Tt=z(O),wt=s.get(ft).__webglTexture;i.bindTexture(Tt,wt),L(Tt),i.unbindTexture()}}}const Ze=[],Ce=[];function je(O){if(O.samples>0){if(Ke(O)===!1){const M=O.textures,J=O.width,st=O.height;let ft=o.COLOR_BUFFER_BIT;const Tt=O.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,wt=s.get(O),ht=M.length>1;if(ht)for(let Rt=0;Rt<M.length;Rt++)i.bindFramebuffer(o.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Rt,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,wt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Rt,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer);const dt=O.texture.mipmaps;dt&&dt.length>0?i.bindFramebuffer(o.DRAW_FRAMEBUFFER,wt.__webglFramebuffer[0]):i.bindFramebuffer(o.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let Rt=0;Rt<M.length;Rt++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(ft|=o.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(ft|=o.STENCIL_BUFFER_BIT)),ht){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,wt.__webglColorRenderbuffer[Rt]);const Bt=s.get(M[Rt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,Bt,0)}o.blitFramebuffer(0,0,J,st,0,0,J,st,ft,o.NEAREST),m===!0&&(Ze.length=0,Ce.length=0,Ze.push(o.COLOR_ATTACHMENT0+Rt),O.depthBuffer&&O.resolveDepthBuffer===!1&&(Ze.push(Tt),Ce.push(Tt),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,Ce)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,Ze))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),ht)for(let Rt=0;Rt<M.length;Rt++){i.bindFramebuffer(o.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Rt,o.RENDERBUFFER,wt.__webglColorRenderbuffer[Rt]);const Bt=s.get(M[Rt]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,wt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Rt,o.TEXTURE_2D,Bt,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&m){const M=O.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[M])}}}function Le(O){return Math.min(l.maxSamples,O.samples)}function Ke(O){const M=s.get(O);return O.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function q(O){const M=h.render.frame;v.get(O)!==M&&(v.set(O,M),O.update())}function De(O,M){const J=O.colorSpace,st=O.format,ft=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||J!==ic&&J!==is&&(Se.getTransfer(J)===Ne?(st!==Oi||ft!==di)&&ie("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):be("WebGLTextures: Unsupported texture color space:",J)),M}function Ee(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(p.width=O.naturalWidth||O.width,p.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(p.width=O.displayWidth,p.height=O.displayHeight):(p.width=O.width,p.height=O.height),p}this.allocateTextureUnit=B,this.resetTextureUnits=lt,this.getTextureUnits=pt,this.setTextureUnits=j,this.setTexture2D=$,this.setTexture2DArray=ct,this.setTexture3D=Et,this.setTextureCube=N,this.rebindTextures=pe,this.setupRenderTarget=ue,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=je,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=Kt,this.useMultisampledRTT=Ke,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function EA(o,t){function i(s,l=is){let u;const h=Se.getTransfer(l);if(s===di)return o.UNSIGNED_BYTE;if(s===up)return o.UNSIGNED_SHORT_4_4_4_4;if(s===cp)return o.UNSIGNED_SHORT_5_5_5_1;if(s===Uv)return o.UNSIGNED_INT_5_9_9_9_REV;if(s===Nv)return o.UNSIGNED_INT_10F_11F_11F_REV;if(s===wv)return o.BYTE;if(s===Dv)return o.SHORT;if(s===tl)return o.UNSIGNED_SHORT;if(s===lp)return o.INT;if(s===Qi)return o.UNSIGNED_INT;if(s===qi)return o.FLOAT;if(s===pi)return o.HALF_FLOAT;if(s===Lv)return o.ALPHA;if(s===Ov)return o.RGB;if(s===Oi)return o.RGBA;if(s===Ea)return o.DEPTH_COMPONENT;if(s===Is)return o.DEPTH_STENCIL;if(s===Pv)return o.RED;if(s===fp)return o.RED_INTEGER;if(s===Fs)return o.RG;if(s===hp)return o.RG_INTEGER;if(s===dp)return o.RGBA_INTEGER;if(s===Zu||s===Ku||s===Qu||s===Ju)if(h===Ne)if(u=t.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(s===Zu)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Ku)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Qu)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Ju)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=t.get("WEBGL_compressed_texture_s3tc"),u!==null){if(s===Zu)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Ku)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Qu)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Ju)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===xd||s===Sd||s===Md||s===yd)if(u=t.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(s===xd)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Sd)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Md)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===yd)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Ed||s===bd||s===Td||s===Ad||s===Rd||s===ec||s===Cd)if(u=t.get("WEBGL_compressed_texture_etc"),u!==null){if(s===Ed||s===bd)return h===Ne?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(s===Td)return h===Ne?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC;if(s===Ad)return u.COMPRESSED_R11_EAC;if(s===Rd)return u.COMPRESSED_SIGNED_R11_EAC;if(s===ec)return u.COMPRESSED_RG11_EAC;if(s===Cd)return u.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===wd||s===Dd||s===Ud||s===Nd||s===Ld||s===Od||s===Pd||s===Id||s===zd||s===Bd||s===Fd||s===Hd||s===Gd||s===Vd)if(u=t.get("WEBGL_compressed_texture_astc"),u!==null){if(s===wd)return h===Ne?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Dd)return h===Ne?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Ud)return h===Ne?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Nd)return h===Ne?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Ld)return h===Ne?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Od)return h===Ne?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Pd)return h===Ne?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Id)return h===Ne?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===zd)return h===Ne?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Bd)return h===Ne?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Fd)return h===Ne?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Hd)return h===Ne?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Gd)return h===Ne?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Vd)return h===Ne?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Xd||s===kd||s===Wd)if(u=t.get("EXT_texture_compression_bptc"),u!==null){if(s===Xd)return h===Ne?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===kd)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Wd)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===qd||s===Yd||s===nc||s===Zd)if(u=t.get("EXT_texture_compression_rgtc"),u!==null){if(s===qd)return u.COMPRESSED_RED_RGTC1_EXT;if(s===Yd)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===nc)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Zd)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===el?o.UNSIGNED_INT_24_8:o[s]!==void 0?o[s]:null}return{convert:i}}const bA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,TA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class AA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i){if(this.texture===null){const s=new kv(t.texture);(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,s=new In({vertexShader:bA,fragmentShader:TA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Gn(new dc(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class RA extends Hs{constructor(t,i){super();const s=this;let l=null,u=1,h=null,d="local-floor",m=1,p=null,v=null,x=null,g=null,E=null,T=null;const D=typeof XRWebGLBinding<"u",y=new AA,S={},L=i.getContextAttributes();let z=null,C=null;const I=[],w=[],P=new Zt;let b=null;const U=new hi;U.viewport=new an;const V=new hi;V.viewport=new an;const G=[U,V],W=new Py;let lt=null,pt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(tt){let xt=I[tt];return xt===void 0&&(xt=new zh,I[tt]=xt),xt.getTargetRaySpace()},this.getControllerGrip=function(tt){let xt=I[tt];return xt===void 0&&(xt=new zh,I[tt]=xt),xt.getGripSpace()},this.getHand=function(tt){let xt=I[tt];return xt===void 0&&(xt=new zh,I[tt]=xt),xt.getHandSpace()};function j(tt){const xt=w.indexOf(tt.inputSource);if(xt===-1)return;const Mt=I[xt];Mt!==void 0&&(Mt.update(tt.inputSource,tt.frame,p||h),Mt.dispatchEvent({type:tt.type,data:tt.inputSource}))}function B(){l.removeEventListener("select",j),l.removeEventListener("selectstart",j),l.removeEventListener("selectend",j),l.removeEventListener("squeeze",j),l.removeEventListener("squeezestart",j),l.removeEventListener("squeezeend",j),l.removeEventListener("end",B),l.removeEventListener("inputsourceschange",F);for(let tt=0;tt<I.length;tt++){const xt=w[tt];xt!==null&&(w[tt]=null,I[tt].disconnect(xt))}lt=null,pt=null,y.reset();for(const tt in S)delete S[tt];t.setRenderTarget(z),E=null,g=null,x=null,l=null,C=null,Nt.stop(),s.isPresenting=!1,t.setPixelRatio(b),t.setSize(P.width,P.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(tt){u=tt,s.isPresenting===!0&&ie("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(tt){d=tt,s.isPresenting===!0&&ie("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||h},this.setReferenceSpace=function(tt){p=tt},this.getBaseLayer=function(){return g!==null?g:E},this.getBinding=function(){return x===null&&D&&(x=new XRWebGLBinding(l,i)),x},this.getFrame=function(){return T},this.getSession=function(){return l},this.setSession=async function(tt){if(l=tt,l!==null){if(z=t.getRenderTarget(),l.addEventListener("select",j),l.addEventListener("selectstart",j),l.addEventListener("selectend",j),l.addEventListener("squeeze",j),l.addEventListener("squeezestart",j),l.addEventListener("squeezeend",j),l.addEventListener("end",B),l.addEventListener("inputsourceschange",F),L.xrCompatible!==!0&&await i.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(P),D&&"createProjectionLayer"in XRWebGLBinding.prototype){let Mt=null,zt=null,te=null;L.depth&&(te=L.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Mt=L.stencil?Is:Ea,zt=L.stencil?el:Qi);const Kt={colorFormat:i.RGBA8,depthFormat:te,scaleFactor:u};x=this.getBinding(),g=x.createProjectionLayer(Kt),l.updateRenderState({layers:[g]}),t.setPixelRatio(1),t.setSize(g.textureWidth,g.textureHeight,!1),C=new jn(g.textureWidth,g.textureHeight,{format:Oi,type:di,depthTexture:new Vr(g.textureWidth,g.textureHeight,zt,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:L.stencil,colorSpace:t.outputColorSpace,samples:L.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const Mt={antialias:L.antialias,alpha:!0,depth:L.depth,stencil:L.stencil,framebufferScaleFactor:u};E=new XRWebGLLayer(l,i,Mt),l.updateRenderState({baseLayer:E}),t.setPixelRatio(1),t.setSize(E.framebufferWidth,E.framebufferHeight,!1),C=new jn(E.framebufferWidth,E.framebufferHeight,{format:Oi,type:di,colorSpace:t.outputColorSpace,stencilBuffer:L.stencil,resolveDepthBuffer:E.ignoreDepthValues===!1,resolveStencilBuffer:E.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(m),p=null,h=await l.requestReferenceSpace(d),Nt.setContext(l),Nt.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function F(tt){for(let xt=0;xt<tt.removed.length;xt++){const Mt=tt.removed[xt],zt=w.indexOf(Mt);zt>=0&&(w[zt]=null,I[zt].disconnect(Mt))}for(let xt=0;xt<tt.added.length;xt++){const Mt=tt.added[xt];let zt=w.indexOf(Mt);if(zt===-1){for(let Kt=0;Kt<I.length;Kt++)if(Kt>=w.length){w.push(Mt),zt=Kt;break}else if(w[Kt]===null){w[Kt]=Mt,zt=Kt;break}if(zt===-1)break}const te=I[zt];te&&te.connect(Mt)}}const $=new K,ct=new K;function Et(tt,xt,Mt){$.setFromMatrixPosition(xt.matrixWorld),ct.setFromMatrixPosition(Mt.matrixWorld);const zt=$.distanceTo(ct),te=xt.projectionMatrix.elements,Kt=Mt.projectionMatrix.elements,He=te[14]/(te[10]-1),re=te[14]/(te[10]+1),de=(te[9]+1)/te[5],pe=(te[9]-1)/te[5],ue=(te[8]-1)/te[0],Ye=(Kt[8]+1)/Kt[0],Ze=He*ue,Ce=He*Ye,je=zt/(-ue+Ye),Le=je*-ue;if(xt.matrixWorld.decompose(tt.position,tt.quaternion,tt.scale),tt.translateX(Le),tt.translateZ(je),tt.matrixWorld.compose(tt.position,tt.quaternion,tt.scale),tt.matrixWorldInverse.copy(tt.matrixWorld).invert(),te[10]===-1)tt.projectionMatrix.copy(xt.projectionMatrix),tt.projectionMatrixInverse.copy(xt.projectionMatrixInverse);else{const Ke=He+je,q=re+je,De=Ze-Le,Ee=Ce+(zt-Le),O=de*re/q*Ke,M=pe*re/q*Ke;tt.projectionMatrix.makePerspective(De,Ee,O,M,Ke,q),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert()}}function N(tt,xt){xt===null?tt.matrixWorld.copy(tt.matrix):tt.matrixWorld.multiplyMatrices(xt.matrixWorld,tt.matrix),tt.matrixWorldInverse.copy(tt.matrixWorld).invert()}this.updateCamera=function(tt){if(l===null)return;let xt=tt.near,Mt=tt.far;y.texture!==null&&(y.depthNear>0&&(xt=y.depthNear),y.depthFar>0&&(Mt=y.depthFar)),W.near=V.near=U.near=xt,W.far=V.far=U.far=Mt,(lt!==W.near||pt!==W.far)&&(l.updateRenderState({depthNear:W.near,depthFar:W.far}),lt=W.near,pt=W.far),W.layers.mask=tt.layers.mask|6,U.layers.mask=W.layers.mask&-5,V.layers.mask=W.layers.mask&-3;const zt=tt.parent,te=W.cameras;N(W,zt);for(let Kt=0;Kt<te.length;Kt++)N(te[Kt],zt);te.length===2?Et(W,U,V):W.projectionMatrix.copy(U.projectionMatrix),Z(tt,W,zt)};function Z(tt,xt,Mt){Mt===null?tt.matrix.copy(xt.matrixWorld):(tt.matrix.copy(Mt.matrixWorld),tt.matrix.invert(),tt.matrix.multiply(xt.matrixWorld)),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.updateMatrixWorld(!0),tt.projectionMatrix.copy(xt.projectionMatrix),tt.projectionMatrixInverse.copy(xt.projectionMatrixInverse),tt.isPerspectiveCamera&&(tt.fov=Jd*2*Math.atan(1/tt.projectionMatrix.elements[5]),tt.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(g===null&&E===null))return m},this.setFoveation=function(tt){m=tt,g!==null&&(g.fixedFoveation=tt),E!==null&&E.fixedFoveation!==void 0&&(E.fixedFoveation=tt)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(W)},this.getCameraTexture=function(tt){return S[tt]};let St=null;function bt(tt,xt){if(v=xt.getViewerPose(p||h),T=xt,v!==null){const Mt=v.views;E!==null&&(t.setRenderTargetFramebuffer(C,E.framebuffer),t.setRenderTarget(C));let zt=!1;Mt.length!==W.cameras.length&&(W.cameras.length=0,zt=!0);for(let re=0;re<Mt.length;re++){const de=Mt[re];let pe=null;if(E!==null)pe=E.getViewport(de);else{const Ye=x.getViewSubImage(g,de);pe=Ye.viewport,re===0&&(t.setRenderTargetTextures(C,Ye.colorTexture,Ye.depthStencilTexture),t.setRenderTarget(C))}let ue=G[re];ue===void 0&&(ue=new hi,ue.layers.enable(re),ue.viewport=new an,G[re]=ue),ue.matrix.fromArray(de.transform.matrix),ue.matrix.decompose(ue.position,ue.quaternion,ue.scale),ue.projectionMatrix.fromArray(de.projectionMatrix),ue.projectionMatrixInverse.copy(ue.projectionMatrix).invert(),ue.viewport.set(pe.x,pe.y,pe.width,pe.height),re===0&&(W.matrix.copy(ue.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),zt===!0&&W.cameras.push(ue)}const te=l.enabledFeatures;if(te&&te.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&D){x=s.getBinding();const re=x.getDepthInformation(Mt[0]);re&&re.isValid&&re.texture&&y.init(re,l.renderState)}if(te&&te.includes("camera-access")&&D){t.state.unbindTexture(),x=s.getBinding();for(let re=0;re<Mt.length;re++){const de=Mt[re].camera;if(de){let pe=S[de];pe||(pe=new kv,S[de]=pe);const ue=x.getCameraImage(de);pe.sourceTexture=ue}}}}for(let Mt=0;Mt<I.length;Mt++){const zt=w[Mt],te=I[Mt];zt!==null&&te!==void 0&&te.update(zt,xt,p||h)}St&&St(tt,xt),xt.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:xt}),T=null}const Nt=new Kv;Nt.setAnimationLoop(bt),this.setAnimationLoop=function(tt){St=tt},this.dispose=function(){}}}const CA=new sn,nx=new se;nx.set(-1,0,0,0,1,0,0,0,1);function wA(o,t){function i(y,S){y.matrixAutoUpdate===!0&&y.updateMatrix(),S.value.copy(y.matrix)}function s(y,S){S.color.getRGB(y.fogColor.value,Wv(o)),S.isFog?(y.fogNear.value=S.near,y.fogFar.value=S.far):S.isFogExp2&&(y.fogDensity.value=S.density)}function l(y,S,L,z,C){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?u(y,S):S.isMeshLambertMaterial?(u(y,S),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(u(y,S),x(y,S)):S.isMeshPhongMaterial?(u(y,S),v(y,S),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(u(y,S),g(y,S),S.isMeshPhysicalMaterial&&E(y,S,C)):S.isMeshMatcapMaterial?(u(y,S),T(y,S)):S.isMeshDepthMaterial?u(y,S):S.isMeshDistanceMaterial?(u(y,S),D(y,S)):S.isMeshNormalMaterial?u(y,S):S.isLineBasicMaterial?(h(y,S),S.isLineDashedMaterial&&d(y,S)):S.isPointsMaterial?m(y,S,L,z):S.isSpriteMaterial?p(y,S):S.isShadowMaterial?(y.color.value.copy(S.color),y.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function u(y,S){y.opacity.value=S.opacity,S.color&&y.diffuse.value.copy(S.color),S.emissive&&y.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(y.map.value=S.map,i(S.map,y.mapTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.bumpMap&&(y.bumpMap.value=S.bumpMap,i(S.bumpMap,y.bumpMapTransform),y.bumpScale.value=S.bumpScale,S.side===Jn&&(y.bumpScale.value*=-1)),S.normalMap&&(y.normalMap.value=S.normalMap,i(S.normalMap,y.normalMapTransform),y.normalScale.value.copy(S.normalScale),S.side===Jn&&y.normalScale.value.negate()),S.displacementMap&&(y.displacementMap.value=S.displacementMap,i(S.displacementMap,y.displacementMapTransform),y.displacementScale.value=S.displacementScale,y.displacementBias.value=S.displacementBias),S.emissiveMap&&(y.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,y.emissiveMapTransform)),S.specularMap&&(y.specularMap.value=S.specularMap,i(S.specularMap,y.specularMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest);const L=t.get(S),z=L.envMap,C=L.envMapRotation;z&&(y.envMap.value=z,y.envMapRotation.value.setFromMatrix4(CA.makeRotationFromEuler(C)).transpose(),z.isCubeTexture&&z.isRenderTargetTexture===!1&&y.envMapRotation.value.premultiply(nx),y.reflectivity.value=S.reflectivity,y.ior.value=S.ior,y.refractionRatio.value=S.refractionRatio),S.lightMap&&(y.lightMap.value=S.lightMap,y.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,y.lightMapTransform)),S.aoMap&&(y.aoMap.value=S.aoMap,y.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,y.aoMapTransform))}function h(y,S){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,S.map&&(y.map.value=S.map,i(S.map,y.mapTransform))}function d(y,S){y.dashSize.value=S.dashSize,y.totalSize.value=S.dashSize+S.gapSize,y.scale.value=S.scale}function m(y,S,L,z){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,y.size.value=S.size*L,y.scale.value=z*.5,S.map&&(y.map.value=S.map,i(S.map,y.uvTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest)}function p(y,S){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,y.rotation.value=S.rotation,S.map&&(y.map.value=S.map,i(S.map,y.mapTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest)}function v(y,S){y.specular.value.copy(S.specular),y.shininess.value=Math.max(S.shininess,1e-4)}function x(y,S){S.gradientMap&&(y.gradientMap.value=S.gradientMap)}function g(y,S){y.metalness.value=S.metalness,S.metalnessMap&&(y.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,y.metalnessMapTransform)),y.roughness.value=S.roughness,S.roughnessMap&&(y.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,y.roughnessMapTransform)),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)}function E(y,S,L){y.ior.value=S.ior,S.sheen>0&&(y.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),y.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(y.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,y.sheenColorMapTransform)),S.sheenRoughnessMap&&(y.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,y.sheenRoughnessMapTransform))),S.clearcoat>0&&(y.clearcoat.value=S.clearcoat,y.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(y.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,y.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(y.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Jn&&y.clearcoatNormalScale.value.negate())),S.dispersion>0&&(y.dispersion.value=S.dispersion),S.iridescence>0&&(y.iridescence.value=S.iridescence,y.iridescenceIOR.value=S.iridescenceIOR,y.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(y.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,y.iridescenceMapTransform)),S.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),S.transmission>0&&(y.transmission.value=S.transmission,y.transmissionSamplerMap.value=L.texture,y.transmissionSamplerSize.value.set(L.width,L.height),S.transmissionMap&&(y.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,y.transmissionMapTransform)),y.thickness.value=S.thickness,S.thicknessMap&&(y.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=S.attenuationDistance,y.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(y.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(y.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=S.specularIntensity,y.specularColor.value.copy(S.specularColor),S.specularColorMap&&(y.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,y.specularColorMapTransform)),S.specularIntensityMap&&(y.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,y.specularIntensityMapTransform))}function T(y,S){S.matcap&&(y.matcap.value=S.matcap)}function D(y,S){const L=t.get(S).light;y.referencePosition.value.setFromMatrixPosition(L.matrixWorld),y.nearDistance.value=L.shadow.camera.near,y.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function DA(o,t,i,s){let l={},u={},h=[];const d=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function m(C,I){const w=I.program;s.uniformBlockBinding(C,w)}function p(C,I){let w=l[C.id];w===void 0&&(y(C),w=v(C),l[C.id]=w,C.addEventListener("dispose",L));const P=I.program;s.updateUBOMapping(C,P);const b=t.render.frame;u[C.id]!==b&&(g(C),u[C.id]=b)}function v(C){const I=x();C.__bindingPointIndex=I;const w=o.createBuffer(),P=C.__size,b=C.usage;return o.bindBuffer(o.UNIFORM_BUFFER,w),o.bufferData(o.UNIFORM_BUFFER,P,b),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,I,w),w}function x(){for(let C=0;C<d;C++)if(h.indexOf(C)===-1)return h.push(C),C;return be("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(C){const I=l[C.id],w=C.uniforms,P=C.__cache;o.bindBuffer(o.UNIFORM_BUFFER,I);for(let b=0,U=w.length;b<U;b++){const V=w[b];if(Array.isArray(V))for(let G=0,W=V.length;G<W;G++)E(V[G],b,G,P);else E(V,b,0,P)}o.bindBuffer(o.UNIFORM_BUFFER,null)}function E(C,I,w,P){if(D(C,I,w,P)===!0){const b=C.__offset,U=C.value;if(Array.isArray(U)){let V=0;for(let G=0;G<U.length;G++){const W=U[G],lt=S(W);T(W,C.__data,V),typeof W!="number"&&typeof W!="boolean"&&!W.isMatrix3&&!ArrayBuffer.isView(W)&&(V+=lt.storage/Float32Array.BYTES_PER_ELEMENT)}}else T(U,C.__data,0);o.bufferSubData(o.UNIFORM_BUFFER,b,C.__data)}}function T(C,I,w){typeof C=="number"||typeof C=="boolean"?I[0]=C:C.isMatrix3?(I[0]=C.elements[0],I[1]=C.elements[1],I[2]=C.elements[2],I[3]=0,I[4]=C.elements[3],I[5]=C.elements[4],I[6]=C.elements[5],I[7]=0,I[8]=C.elements[6],I[9]=C.elements[7],I[10]=C.elements[8],I[11]=0):ArrayBuffer.isView(C)?I.set(new C.constructor(C.buffer,C.byteOffset,I.length)):C.toArray(I,w)}function D(C,I,w,P){const b=C.value,U=I+"_"+w;if(P[U]===void 0)return typeof b=="number"||typeof b=="boolean"?P[U]=b:ArrayBuffer.isView(b)?P[U]=b.slice():P[U]=b.clone(),!0;{const V=P[U];if(typeof b=="number"||typeof b=="boolean"){if(V!==b)return P[U]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(V.equals(b)===!1)return V.copy(b),!0}}return!1}function y(C){const I=C.uniforms;let w=0;const P=16;for(let U=0,V=I.length;U<V;U++){const G=Array.isArray(I[U])?I[U]:[I[U]];for(let W=0,lt=G.length;W<lt;W++){const pt=G[W],j=Array.isArray(pt.value)?pt.value:[pt.value];for(let B=0,F=j.length;B<F;B++){const $=j[B],ct=S($),Et=w%P,N=Et%ct.boundary,Z=Et+N;w+=N,Z!==0&&P-Z<ct.storage&&(w+=P-Z),pt.__data=new Float32Array(ct.storage/Float32Array.BYTES_PER_ELEMENT),pt.__offset=w,w+=ct.storage}}}const b=w%P;return b>0&&(w+=P-b),C.__size=w,C.__cache={},this}function S(C){const I={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(I.boundary=4,I.storage=4):C.isVector2?(I.boundary=8,I.storage=8):C.isVector3||C.isColor?(I.boundary=16,I.storage=12):C.isVector4?(I.boundary=16,I.storage=16):C.isMatrix3?(I.boundary=48,I.storage=48):C.isMatrix4?(I.boundary=64,I.storage=64):C.isTexture?ie("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(C)?(I.boundary=16,I.storage=C.byteLength):ie("WebGLRenderer: Unsupported uniform value type.",C),I}function L(C){const I=C.target;I.removeEventListener("dispose",L);const w=h.indexOf(I.__bindingPointIndex);h.splice(w,1),o.deleteBuffer(l[I.id]),delete l[I.id],delete u[I.id]}function z(){for(const C in l)o.deleteBuffer(l[C]);h=[],l={},u={}}return{bind:m,update:p,dispose:z}}const UA=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Xi=null;function NA(){return Xi===null&&(Xi=new Sy(UA,16,16,Fs,pi),Xi.name="DFG_LUT",Xi.minFilter=vn,Xi.magFilter=vn,Xi.wrapS=Ma,Xi.wrapT=Ma,Xi.generateMipmaps=!1,Xi.needsUpdate=!0),Xi}class LA{constructor(t={}){const{canvas:i=KM(),context:s=null,depth:l=!0,stencil:u=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:x=!1,reversedDepthBuffer:g=!1,outputBufferType:E=di}=t;this.isWebGLRenderer=!0;let T;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");T=s.getContextAttributes().alpha}else T=h;const D=E,y=new Set([dp,hp,fp]),S=new Set([di,Qi,tl,el,up,cp]),L=new Uint32Array(4),z=new Int32Array(4),C=new K;let I=null,w=null;const P=[],b=[];let U=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ki,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const V=this;let G=!1,W=null,lt=null,pt=null,j=null;this._outputColorSpace=Qn;let B=0,F=0,$=null,ct=-1,Et=null;const N=new an,Z=new an;let St=null;const bt=new he(0);let Nt=0,tt=i.width,xt=i.height,Mt=1,zt=null,te=null;const Kt=new an(0,0,tt,xt),He=new an(0,0,tt,xt);let re=!1;const de=new Sp;let pe=!1,ue=!1;const Ye=new sn,Ze=new K,Ce=new an,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Le=!1;function Ke(){return $===null?Mt:1}let q=s;function De(A,Y){return i.getContext(A,Y)}try{const A={alpha:!0,depth:l,stencil:u,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:v,failIfMajorPerformanceCaveat:x};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${ep}`),i.addEventListener("webglcontextlost",$e,!1),i.addEventListener("webglcontextrestored",Oe,!1),i.addEventListener("webglcontextcreationerror",$n,!1),q===null){const Y="webgl2";if(q=De(Y,A),q===null)throw De(Y)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw be("WebGLRenderer: "+A.message),A}let Ee,O,M,J,st,ft,Tt,wt,ht,dt,Rt,Bt,Lt,Dt,Qt,Jt,ne,k,At,gt,Ct,It,yt;function Wt(){Ee=new NT(q),Ee.init(),Ct=new EA(q,Ee),O=new bT(q,Ee,t,Ct),M=new MA(q,Ee),O.reversedDepthBuffer&&g&&M.buffers.depth.setReversed(!0),lt=q.createFramebuffer(),pt=q.createFramebuffer(),j=q.createFramebuffer(),J=new PT(q),st=new oA,ft=new yA(q,Ee,M,st,O,Ct,J),Tt=new UT(V),wt=new Fy(q),It=new yT(q,wt),ht=new LT(q,wt,J,It),dt=new zT(q,ht,wt,It,J),k=new IT(q,O,ft),Qt=new TT(st),Rt=new rA(V,Tt,Ee,O,It,Qt),Bt=new wA(V,st),Lt=new uA,Dt=new mA(Ee),ne=new MT(V,Tt,M,dt,T,m),Jt=new SA(V,dt,O),yt=new DA(q,J,O,M),At=new ET(q,Ee,J),gt=new OT(q,Ee,J),J.programs=Rt.programs,V.capabilities=O,V.extensions=Ee,V.properties=st,V.renderLists=Lt,V.shadowMap=Jt,V.state=M,V.info=J}Wt(),D!==di&&(U=new FT(D,i.width,i.height,d,l,u));const Gt=new RA(V,q);this.xr=Gt,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const A=Ee.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Ee.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Mt},this.setPixelRatio=function(A){A!==void 0&&(Mt=A,this.setSize(tt,xt,!1))},this.getSize=function(A){return A.set(tt,xt)},this.setSize=function(A,Y,rt=!0){if(Gt.isPresenting){ie("WebGLRenderer: Can't change size while VR device is presenting.");return}tt=A,xt=Y,i.width=Math.floor(A*Mt),i.height=Math.floor(Y*Mt),rt===!0&&(i.style.width=A+"px",i.style.height=Y+"px"),U!==null&&U.setSize(i.width,i.height),this.setViewport(0,0,A,Y)},this.getDrawingBufferSize=function(A){return A.set(tt*Mt,xt*Mt).floor()},this.setDrawingBufferSize=function(A,Y,rt){tt=A,xt=Y,Mt=rt,i.width=Math.floor(A*rt),i.height=Math.floor(Y*rt),this.setViewport(0,0,A,Y)},this.setEffects=function(A){if(D===di){be("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let Y=0;Y<A.length;Y++)if(A[Y].isOutputPass===!0){ie("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}U.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(N)},this.getViewport=function(A){return A.copy(Kt)},this.setViewport=function(A,Y,rt,it){A.isVector4?Kt.set(A.x,A.y,A.z,A.w):Kt.set(A,Y,rt,it),M.viewport(N.copy(Kt).multiplyScalar(Mt).round())},this.getScissor=function(A){return A.copy(He)},this.setScissor=function(A,Y,rt,it){A.isVector4?He.set(A.x,A.y,A.z,A.w):He.set(A,Y,rt,it),M.scissor(Z.copy(He).multiplyScalar(Mt).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(A){M.setScissorTest(re=A)},this.setOpaqueSort=function(A){zt=A},this.setTransparentSort=function(A){te=A},this.getClearColor=function(A){return A.copy(ne.getClearColor())},this.setClearColor=function(){ne.setClearColor(...arguments)},this.getClearAlpha=function(){return ne.getClearAlpha()},this.setClearAlpha=function(){ne.setClearAlpha(...arguments)},this.clear=function(A=!0,Y=!0,rt=!0){let it=0;if(A){let at=!1;if($!==null){const Ot=$.texture.format;at=y.has(Ot)}if(at){const Ot=$.texture.type,Ht=S.has(Ot),Ut=ne.getClearColor(),Xt=ne.getClearAlpha(),Vt=Ut.r,jt=Ut.g,oe=Ut.b;Ht?(L[0]=Vt,L[1]=jt,L[2]=oe,L[3]=Xt,q.clearBufferuiv(q.COLOR,0,L)):(z[0]=Vt,z[1]=jt,z[2]=oe,z[3]=Xt,q.clearBufferiv(q.COLOR,0,z))}else it|=q.COLOR_BUFFER_BIT}Y&&(it|=q.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),rt&&(it|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),it!==0&&q.clear(it)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),W=A},this.dispose=function(){i.removeEventListener("webglcontextlost",$e,!1),i.removeEventListener("webglcontextrestored",Oe,!1),i.removeEventListener("webglcontextcreationerror",$n,!1),ne.dispose(),Lt.dispose(),Dt.dispose(),st.dispose(),Tt.dispose(),dt.dispose(),It.dispose(),yt.dispose(),Rt.dispose(),Gt.dispose(),Gt.removeEventListener("sessionstart",fn),Gt.removeEventListener("sessionend",Tn),Xn.stop()};function $e(A){A.preventDefault(),rc("WebGLRenderer: Context Lost."),G=!0}function Oe(){rc("WebGLRenderer: Context Restored."),G=!1;const A=J.autoReset,Y=Jt.enabled,rt=Jt.autoUpdate,it=Jt.needsUpdate,at=Jt.type;Wt(),J.autoReset=A,Jt.enabled=Y,Jt.autoUpdate=rt,Jt.needsUpdate=it,Jt.type=at}function $n(A){be("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ti(A){const Y=A.target;Y.removeEventListener("dispose",ti),Kr(Y)}function Kr(A){Qr(A),st.remove(A)}function Qr(A){const Y=st.get(A).programs;Y!==void 0&&(Y.forEach(function(rt){Rt.releaseProgram(rt)}),A.isShaderMaterial&&Rt.releaseShaderCache(A))}this.renderBufferDirect=function(A,Y,rt,it,at,Ot){Y===null&&(Y=je);const Ht=at.isMesh&&at.matrixWorld.determinantAffine()<0,Ut=Aa(A,Y,rt,it,at);M.setMaterial(it,Ht);let Xt=rt.index,Vt=1;if(it.wireframe===!0){if(Xt=ht.getWireframeAttribute(rt),Xt===void 0)return;Vt=2}const jt=rt.drawRange,oe=rt.attributes.position;let Yt=jt.start*Vt,Te=(jt.start+jt.count)*Vt;Ot!==null&&(Yt=Math.max(Yt,Ot.start*Vt),Te=Math.min(Te,(Ot.start+Ot.count)*Vt)),Xt!==null?(Yt=Math.max(Yt,0),Te=Math.min(Te,Xt.count)):oe!=null&&(Yt=Math.max(Yt,0),Te=Math.min(Te,oe.count));const tn=Te-Yt;if(tn<0||tn===1/0)return;It.setup(at,it,Ut,rt,Xt);let We,Pe=At;if(Xt!==null&&(We=wt.get(Xt),Pe=gt,Pe.setIndex(We)),at.isMesh)it.wireframe===!0?(M.setLineWidth(it.wireframeLinewidth*Ke()),Pe.setMode(q.LINES)):Pe.setMode(q.TRIANGLES);else if(at.isLine){let Ie=it.linewidth;Ie===void 0&&(Ie=1),M.setLineWidth(Ie*Ke()),at.isLineSegments?Pe.setMode(q.LINES):at.isLineLoop?Pe.setMode(q.LINE_LOOP):Pe.setMode(q.LINE_STRIP)}else at.isPoints?Pe.setMode(q.POINTS):at.isSprite&&Pe.setMode(q.TRIANGLES);if(at.isBatchedMesh)if(Ee.get("WEBGL_multi_draw"))Pe.renderMultiDraw(at._multiDrawStarts,at._multiDrawCounts,at._multiDrawCount);else{const Ie=at._multiDrawStarts,Ft=at._multiDrawCounts,Nn=at._multiDrawCount,me=Xt?wt.get(Xt).bytesPerElement:1,xn=st.get(it).currentProgram.getUniforms();for(let ei=0;ei<Nn;ei++)xn.setValue(q,"_gl_DrawID",ei),Pe.render(Ie[ei]/me,Ft[ei])}else if(at.isInstancedMesh)Pe.renderInstances(Yt,tn,at.count);else if(rt.isInstancedBufferGeometry){const Ie=rt._maxInstanceCount!==void 0?rt._maxInstanceCount:1/0,Ft=Math.min(rt.instanceCount,Ie);Pe.renderInstances(Yt,tn,Ft)}else Pe.render(Yt,tn)};function Jr(A,Y,rt){A.transparent===!0&&A.side===Li&&A.forceSinglePass===!1?(A.side=Jn,A.needsUpdate=!0,Ta(A,Y,rt),A.side=rs,A.needsUpdate=!0,Ta(A,Y,rt),A.side=Li):Ta(A,Y,rt)}this.compile=function(A,Y,rt=null){rt===null&&(rt=A),w=Dt.get(rt),w.init(Y),b.push(w),rt.traverseVisible(function(at){at.isLight&&at.layers.test(Y.layers)&&(w.pushLight(at),at.castShadow&&w.pushShadow(at))}),A!==rt&&A.traverseVisible(function(at){at.isLight&&at.layers.test(Y.layers)&&(w.pushLight(at),at.castShadow&&w.pushShadow(at))}),w.setupLights();const it=new Set;return A.traverse(function(at){if(!(at.isMesh||at.isPoints||at.isLine||at.isSprite))return;const Ot=at.material;if(Ot)if(Array.isArray(Ot))for(let Ht=0;Ht<Ot.length;Ht++){const Ut=Ot[Ht];Jr(Ut,rt,at),it.add(Ut)}else Jr(Ot,rt,at),it.add(Ot)}),w=b.pop(),it},this.compileAsync=function(A,Y,rt=null){const it=this.compile(A,Y,rt);return new Promise(at=>{function Ot(){if(it.forEach(function(Ht){st.get(Ht).currentProgram.isReady()&&it.delete(Ht)}),it.size===0){at(A);return}setTimeout(Ot,10)}Ee.get("KHR_parallel_shader_compile")!==null?Ot():setTimeout(Ot,10)})};let Gs=null;function Ii(A){Gs&&Gs(A)}function fn(){Xn.stop()}function Tn(){Xn.start()}const Xn=new Kv;Xn.setAnimationLoop(Ii),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(A){Gs=A,Gt.setAnimationLoop(A),A===null?Xn.stop():Xn.start()},Gt.addEventListener("sessionstart",fn),Gt.addEventListener("sessionend",Tn),this.render=function(A,Y){if(Y!==void 0&&Y.isCamera!==!0){be("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;W!==null&&W.renderStart(A,Y);const rt=Gt.enabled===!0&&Gt.isPresenting===!0,it=U!==null&&($===null||rt)&&U.begin(V,$);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),Gt.enabled===!0&&Gt.isPresenting===!0&&(U===null||U.isCompositing()===!1)&&(Gt.cameraAutoUpdate===!0&&Gt.updateCamera(Y),Y=Gt.getCamera()),A.isScene===!0&&A.onBeforeRender(V,A,Y,$),w=Dt.get(A,b.length),w.init(Y),w.state.textureUnits=ft.getTextureUnits(),b.push(w),Ye.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),de.setFromProjectionMatrix(Ye,Yi,Y.reversedDepth),ue=this.localClippingEnabled,pe=Qt.init(this.clippingPlanes,ue),I=Lt.get(A,P.length),I.init(),P.push(I),Gt.enabled===!0&&Gt.isPresenting===!0){const Ht=V.xr.getDepthSensingMesh();Ht!==null&&ls(Ht,Y,-1/0,V.sortObjects)}ls(A,Y,0,V.sortObjects),I.finish(),V.sortObjects===!0&&I.sort(zt,te,Y.reversedDepth),Le=Gt.enabled===!1||Gt.isPresenting===!1||Gt.hasDepthSensing()===!1,Le&&ne.addToRenderList(I,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),pe===!0&&Qt.beginShadows();const at=w.state.shadowsArray;if(Jt.render(at,A,Y),pe===!0&&Qt.endShadows(),(it&&U.hasRenderPass())===!1){const Ht=I.opaque,Ut=I.transmissive;if(w.setupLights(),Y.isArrayCamera){const Xt=Y.cameras;if(Ut.length>0)for(let Vt=0,jt=Xt.length;Vt<jt;Vt++){const oe=Xt[Vt];ol(Ht,Ut,A,oe)}Le&&ne.render(A);for(let Vt=0,jt=Xt.length;Vt<jt;Vt++){const oe=Xt[Vt];rl(I,A,oe,oe.viewport)}}else Ut.length>0&&ol(Ht,Ut,A,Y),Le&&ne.render(A),rl(I,A,Y)}$!==null&&F===0&&(ft.updateMultisampleRenderTarget($),ft.updateRenderTargetMipmap($)),it&&U.end(V),A.isScene===!0&&A.onAfterRender(V,A,Y),It.resetDefaultState(),ct=-1,Et=null,b.pop(),b.length>0?(w=b[b.length-1],ft.setTextureUnits(w.state.textureUnits),pe===!0&&Qt.setGlobalState(V.clippingPlanes,w.state.camera)):w=null,P.pop(),P.length>0?I=P[P.length-1]:I=null,W!==null&&W.renderEnd()};function ls(A,Y,rt,it){if(A.visible===!1)return;if(A.layers.test(Y.layers)){if(A.isGroup)rt=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(Y);else if(A.isLightProbeGrid)w.pushLightProbeGrid(A);else if(A.isLight)w.pushLight(A),A.castShadow&&w.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||de.intersectsSprite(A)){it&&Ce.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ye);const Ht=dt.update(A),Ut=A.material;Ut.visible&&I.push(A,Ht,Ut,rt,Ce.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||de.intersectsObject(A))){const Ht=dt.update(A),Ut=A.material;if(it&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ce.copy(A.boundingSphere.center)):(Ht.boundingSphere===null&&Ht.computeBoundingSphere(),Ce.copy(Ht.boundingSphere.center)),Ce.applyMatrix4(A.matrixWorld).applyMatrix4(Ye)),Array.isArray(Ut)){const Xt=Ht.groups;for(let Vt=0,jt=Xt.length;Vt<jt;Vt++){const oe=Xt[Vt],Yt=Ut[oe.materialIndex];Yt&&Yt.visible&&I.push(A,Ht,Yt,rt,Ce.z,oe)}}else Ut.visible&&I.push(A,Ht,Ut,rt,Ce.z,null)}}const Ot=A.children;for(let Ht=0,Ut=Ot.length;Ht<Ut;Ht++)ls(Ot[Ht],Y,rt,it)}function rl(A,Y,rt,it){const{opaque:at,transmissive:Ot,transparent:Ht}=A;w.setupLightsView(rt),pe===!0&&Qt.setGlobalState(V.clippingPlanes,rt),it&&M.viewport(N.copy(it)),at.length>0&&us(at,Y,rt),Ot.length>0&&us(Ot,Y,rt),Ht.length>0&&us(Ht,Y,rt),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function ol(A,Y,rt,it){if((rt.isScene===!0?rt.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[it.id]===void 0){const Yt=Ee.has("EXT_color_buffer_half_float")||Ee.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[it.id]=new jn(1,1,{generateMipmaps:!0,type:Yt?pi:di,minFilter:Ps,samples:Math.max(4,O.samples),stencilBuffer:u,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Se.workingColorSpace})}const Ot=w.state.transmissionRenderTarget[it.id],Ht=it.viewport||N;Ot.setSize(Ht.z*V.transmissionResolutionScale,Ht.w*V.transmissionResolutionScale);const Ut=V.getRenderTarget(),Xt=V.getActiveCubeFace(),Vt=V.getActiveMipmapLevel();V.setRenderTarget(Ot),V.getClearColor(bt),Nt=V.getClearAlpha(),Nt<1&&V.setClearColor(16777215,.5),V.clear(),Le&&ne.render(rt);const jt=V.toneMapping;V.toneMapping=Ki;const oe=it.viewport;if(it.viewport!==void 0&&(it.viewport=void 0),w.setupLightsView(it),pe===!0&&Qt.setGlobalState(V.clippingPlanes,it),us(A,rt,it),ft.updateMultisampleRenderTarget(Ot),ft.updateRenderTargetMipmap(Ot),Ee.has("WEBGL_multisampled_render_to_texture")===!1){let Yt=!1;for(let Te=0,tn=Y.length;Te<tn;Te++){const We=Y[Te],{object:Pe,geometry:Ie,material:Ft,group:Nn}=We;if(Ft.side===Li&&Pe.layers.test(it.layers)){const me=Ft.side;Ft.side=Jn,Ft.needsUpdate=!0,ba(Pe,rt,it,Ie,Ft,Nn),Ft.side=me,Ft.needsUpdate=!0,Yt=!0}}Yt===!0&&(ft.updateMultisampleRenderTarget(Ot),ft.updateRenderTargetMipmap(Ot))}V.setRenderTarget(Ut,Xt,Vt),V.setClearColor(bt,Nt),oe!==void 0&&(it.viewport=oe),V.toneMapping=jt}function us(A,Y,rt){const it=Y.isScene===!0?Y.overrideMaterial:null;for(let at=0,Ot=A.length;at<Ot;at++){const Ht=A[at],{object:Ut,geometry:Xt,group:Vt}=Ht;let jt=Ht.material;jt.allowOverride===!0&&it!==null&&(jt=it),Ut.layers.test(rt.layers)&&ba(Ut,Y,rt,Xt,jt,Vt)}}function ba(A,Y,rt,it,at,Ot){A.onBeforeRender(V,Y,rt,it,at,Ot),A.modelViewMatrix.multiplyMatrices(rt.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),at.onBeforeRender(V,Y,rt,it,A,Ot),at.transparent===!0&&at.side===Li&&at.forceSinglePass===!1?(at.side=Jn,at.needsUpdate=!0,V.renderBufferDirect(rt,Y,it,at,A,Ot),at.side=rs,at.needsUpdate=!0,V.renderBufferDirect(rt,Y,it,at,A,Ot),at.side=Li):V.renderBufferDirect(rt,Y,it,at,A,Ot),A.onAfterRender(V,Y,rt,it,at,Ot)}function Ta(A,Y,rt){Y.isScene!==!0&&(Y=je);const it=st.get(A),at=w.state.lights,Ot=w.state.shadowsArray,Ht=at.state.version,Ut=Rt.getParameters(A,at.state,Ot,Y,rt,w.state.lightProbeGridArray),Xt=Rt.getProgramCacheKey(Ut);let Vt=it.programs;it.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?Y.environment:null,it.fog=Y.fog;const jt=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;it.envMap=Tt.get(A.envMap||it.environment,jt),it.envMapRotation=it.environment!==null&&A.envMap===null?Y.environmentRotation:A.envMapRotation,Vt===void 0&&(A.addEventListener("dispose",ti),Vt=new Map,it.programs=Vt);let oe=Vt.get(Xt);if(oe!==void 0){if(it.currentProgram===oe&&it.lightsStateVersion===Ht)return ji(A,Ut),oe}else Ut.uniforms=Rt.getUniforms(A),W!==null&&A.isNodeMaterial&&W.build(A,rt,Ut),A.onBeforeCompile(Ut,V),oe=Rt.acquireProgram(Ut,Xt),Vt.set(Xt,oe),it.uniforms=Ut.uniforms;const Yt=it.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Yt.clippingPlanes=Qt.uniform),ji(A,Ut),it.needsLights=ll(A),it.lightsStateVersion=Ht,it.needsLights&&(Yt.ambientLightColor.value=at.state.ambient,Yt.lightProbe.value=at.state.probe,Yt.directionalLights.value=at.state.directional,Yt.directionalLightShadows.value=at.state.directionalShadow,Yt.spotLights.value=at.state.spot,Yt.spotLightShadows.value=at.state.spotShadow,Yt.rectAreaLights.value=at.state.rectArea,Yt.ltc_1.value=at.state.rectAreaLTC1,Yt.ltc_2.value=at.state.rectAreaLTC2,Yt.pointLights.value=at.state.point,Yt.pointLightShadows.value=at.state.pointShadow,Yt.hemisphereLights.value=at.state.hemi,Yt.directionalShadowMatrix.value=at.state.directionalShadowMatrix,Yt.spotLightMatrix.value=at.state.spotLightMatrix,Yt.spotLightMap.value=at.state.spotLightMap,Yt.pointShadowMatrix.value=at.state.pointShadowMatrix),it.lightProbeGrid=w.state.lightProbeGridArray.length>0,it.currentProgram=oe,it.uniformsList=null,oe}function Ji(A){if(A.uniformsList===null){const Y=A.currentProgram.getUniforms();A.uniformsList=ju.seqWithValue(Y.seq,A.uniforms)}return A.uniformsList}function ji(A,Y){const rt=st.get(A);rt.outputColorSpace=Y.outputColorSpace,rt.batching=Y.batching,rt.batchingColor=Y.batchingColor,rt.instancing=Y.instancing,rt.instancingColor=Y.instancingColor,rt.instancingMorph=Y.instancingMorph,rt.skinning=Y.skinning,rt.morphTargets=Y.morphTargets,rt.morphNormals=Y.morphNormals,rt.morphColors=Y.morphColors,rt.morphTargetsCount=Y.morphTargetsCount,rt.numClippingPlanes=Y.numClippingPlanes,rt.numIntersection=Y.numClipIntersection,rt.vertexAlphas=Y.vertexAlphas,rt.vertexTangents=Y.vertexTangents,rt.toneMapping=Y.toneMapping}function cs(A,Y){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;C.setFromMatrixPosition(Y.matrixWorld);for(let rt=0,it=A.length;rt<it;rt++){const at=A[rt];if(at.texture!==null&&at.boundingBox.containsPoint(C))return at}return null}function Aa(A,Y,rt,it,at){Y.isScene!==!0&&(Y=je),ft.resetTextureUnits();const Ot=Y.fog,Ht=it.isMeshStandardMaterial||it.isMeshLambertMaterial||it.isMeshPhongMaterial?Y.environment:null,Ut=$===null?V.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Se.workingColorSpace,Xt=it.isMeshStandardMaterial||it.isMeshLambertMaterial&&!it.envMap||it.isMeshPhongMaterial&&!it.envMap,Vt=Tt.get(it.envMap||Ht,Xt),jt=it.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,oe=!!rt.attributes.tangent&&(!!it.normalMap||it.anisotropy>0),Yt=!!rt.morphAttributes.position,Te=!!rt.morphAttributes.normal,tn=!!rt.morphAttributes.color;let We=Ki;it.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(We=V.toneMapping);const Pe=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,Ie=Pe!==void 0?Pe.length:0,Ft=st.get(it),Nn=w.state.lights;if(pe===!0&&(ue===!0||A!==Et)){const Ue=A===Et&&it.id===ct;Qt.setState(it,A,Ue)}let me=!1;it.version===Ft.__version?(Ft.needsLights&&Ft.lightsStateVersion!==Nn.state.version||Ft.outputColorSpace!==Ut||at.isBatchedMesh&&Ft.batching===!1||!at.isBatchedMesh&&Ft.batching===!0||at.isBatchedMesh&&Ft.batchingColor===!0&&at.colorTexture===null||at.isBatchedMesh&&Ft.batchingColor===!1&&at.colorTexture!==null||at.isInstancedMesh&&Ft.instancing===!1||!at.isInstancedMesh&&Ft.instancing===!0||at.isSkinnedMesh&&Ft.skinning===!1||!at.isSkinnedMesh&&Ft.skinning===!0||at.isInstancedMesh&&Ft.instancingColor===!0&&at.instanceColor===null||at.isInstancedMesh&&Ft.instancingColor===!1&&at.instanceColor!==null||at.isInstancedMesh&&Ft.instancingMorph===!0&&at.morphTexture===null||at.isInstancedMesh&&Ft.instancingMorph===!1&&at.morphTexture!==null||Ft.envMap!==Vt||it.fog===!0&&Ft.fog!==Ot||Ft.numClippingPlanes!==void 0&&(Ft.numClippingPlanes!==Qt.numPlanes||Ft.numIntersection!==Qt.numIntersection)||Ft.vertexAlphas!==jt||Ft.vertexTangents!==oe||Ft.morphTargets!==Yt||Ft.morphNormals!==Te||Ft.morphColors!==tn||Ft.toneMapping!==We||Ft.morphTargetsCount!==Ie||!!Ft.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(me=!0):(me=!0,Ft.__version=it.version);let xn=Ft.currentProgram;me===!0&&(xn=Ta(it,Y,at),W&&it.isNodeMaterial&&W.onUpdateProgram(it,xn,Ft));let ei=!1,Ti=!1,ni=!1;const ze=xn.getUniforms(),en=Ft.uniforms;if(M.useProgram(xn.program)&&(ei=!0,Ti=!0,ni=!0),it.id!==ct&&(ct=it.id,Ti=!0),Ft.needsLights){const Ue=cs(w.state.lightProbeGridArray,at);Ft.lightProbeGrid!==Ue&&(Ft.lightProbeGrid=Ue,Ti=!0)}if(ei||Et!==A){M.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),ze.setValue(q,"projectionMatrix",A.projectionMatrix),ze.setValue(q,"viewMatrix",A.matrixWorldInverse);const zi=ze.map.cameraPosition;zi!==void 0&&zi.setValue(q,Ze.setFromMatrixPosition(A.matrixWorld)),O.logarithmicDepthBuffer&&ze.setValue(q,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(it.isMeshPhongMaterial||it.isMeshToonMaterial||it.isMeshLambertMaterial||it.isMeshBasicMaterial||it.isMeshStandardMaterial||it.isShaderMaterial)&&ze.setValue(q,"isOrthographic",A.isOrthographicCamera===!0),Et!==A&&(Et=A,Ti=!0,ni=!0)}if(Ft.needsLights&&(Nn.state.directionalShadowMap.length>0&&ze.setValue(q,"directionalShadowMap",Nn.state.directionalShadowMap,ft),Nn.state.spotShadowMap.length>0&&ze.setValue(q,"spotShadowMap",Nn.state.spotShadowMap,ft),Nn.state.pointShadowMap.length>0&&ze.setValue(q,"pointShadowMap",Nn.state.pointShadowMap,ft)),at.isSkinnedMesh){ze.setOptional(q,at,"bindMatrix"),ze.setOptional(q,at,"bindMatrixInverse");const Ue=at.skeleton;Ue&&(Ue.boneTexture===null&&Ue.computeBoneTexture(),ze.setValue(q,"boneTexture",Ue.boneTexture,ft))}at.isBatchedMesh&&(ze.setOptional(q,at,"batchingTexture"),ze.setValue(q,"batchingTexture",at._matricesTexture,ft),ze.setOptional(q,at,"batchingIdTexture"),ze.setValue(q,"batchingIdTexture",at._indirectTexture,ft),ze.setOptional(q,at,"batchingColorTexture"),at._colorsTexture!==null&&ze.setValue(q,"batchingColorTexture",at._colorsTexture,ft));const Ai=rt.morphAttributes;if((Ai.position!==void 0||Ai.normal!==void 0||Ai.color!==void 0)&&k.update(at,rt,xn),(Ti||Ft.receiveShadow!==at.receiveShadow)&&(Ft.receiveShadow=at.receiveShadow,ze.setValue(q,"receiveShadow",at.receiveShadow)),(it.isMeshStandardMaterial||it.isMeshLambertMaterial||it.isMeshPhongMaterial)&&it.envMap===null&&Y.environment!==null&&(en.envMapIntensity.value=Y.environmentIntensity),en.dfgLUT!==void 0&&(en.dfgLUT.value=NA()),Ti){if(ze.setValue(q,"toneMappingExposure",V.toneMappingExposure),Ft.needsLights&&hn(en,ni),Ot&&it.fog===!0&&Bt.refreshFogUniforms(en,Ot),Bt.refreshMaterialUniforms(en,it,Mt,xt,w.state.transmissionRenderTarget[A.id]),Ft.needsLights&&Ft.lightProbeGrid){const Ue=Ft.lightProbeGrid;en.probesSH.value=Ue.texture,en.probesMin.value.copy(Ue.boundingBox.min),en.probesMax.value.copy(Ue.boundingBox.max),en.probesResolution.value.copy(Ue.resolution)}ju.upload(q,Ji(Ft),en,ft)}if(it.isShaderMaterial&&it.uniformsNeedUpdate===!0&&(ju.upload(q,Ji(Ft),en,ft),it.uniformsNeedUpdate=!1),it.isSpriteMaterial&&ze.setValue(q,"center",at.center),ze.setValue(q,"modelViewMatrix",at.modelViewMatrix),ze.setValue(q,"normalMatrix",at.normalMatrix),ze.setValue(q,"modelMatrix",at.matrixWorld),it.uniformsGroups!==void 0){const Ue=it.uniformsGroups;for(let zi=0,Ra=Ue.length;zi<Ra;zi++){const fs=Ue[zi];yt.update(fs,xn),yt.bind(fs,xn)}}return xn}function hn(A,Y){A.ambientLightColor.needsUpdate=Y,A.lightProbe.needsUpdate=Y,A.directionalLights.needsUpdate=Y,A.directionalLightShadows.needsUpdate=Y,A.pointLights.needsUpdate=Y,A.pointLightShadows.needsUpdate=Y,A.spotLights.needsUpdate=Y,A.spotLightShadows.needsUpdate=Y,A.rectAreaLights.needsUpdate=Y,A.hemisphereLights.needsUpdate=Y}function ll(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(A,Y,rt){const it=st.get(A);it.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,it.__autoAllocateDepthBuffer===!1&&(it.__useRenderToTexture=!1),st.get(A.texture).__webglTexture=Y,st.get(A.depthTexture).__webglTexture=it.__autoAllocateDepthBuffer?void 0:rt,it.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,Y){const rt=st.get(A);rt.__webglFramebuffer=Y,rt.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(A,Y=0,rt=0){$=A,B=Y,F=rt;let it=null,at=!1,Ot=!1;if(A){const Ut=st.get(A);if(Ut.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(q.FRAMEBUFFER,Ut.__webglFramebuffer),N.copy(A.viewport),Z.copy(A.scissor),St=A.scissorTest,M.viewport(N),M.scissor(Z),M.setScissorTest(St),ct=-1;return}else if(Ut.__webglFramebuffer===void 0)ft.setupRenderTarget(A);else if(Ut.__hasExternalTextures)ft.rebindTextures(A,st.get(A.texture).__webglTexture,st.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const jt=A.depthTexture;if(Ut.__boundDepthTexture!==jt){if(jt!==null&&st.has(jt)&&(A.width!==jt.image.width||A.height!==jt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ft.setupDepthRenderbuffer(A)}}const Xt=A.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(Ot=!0);const Vt=st.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Vt[Y])?it=Vt[Y][rt]:it=Vt[Y],at=!0):A.samples>0&&ft.useMultisampledRTT(A)===!1?it=st.get(A).__webglMultisampledFramebuffer:Array.isArray(Vt)?it=Vt[rt]:it=Vt,N.copy(A.viewport),Z.copy(A.scissor),St=A.scissorTest}else N.copy(Kt).multiplyScalar(Mt).floor(),Z.copy(He).multiplyScalar(Mt).floor(),St=re;if(rt!==0&&(it=lt),M.bindFramebuffer(q.FRAMEBUFFER,it)&&M.drawBuffers(A,it),M.viewport(N),M.scissor(Z),M.setScissorTest(St),at){const Ut=st.get(A.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Ut.__webglTexture,rt)}else if(Ot){const Ut=Y;for(let Xt=0;Xt<A.textures.length;Xt++){const Vt=st.get(A.textures[Xt]);q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0+Xt,Vt.__webglTexture,rt,Ut)}}else if(A!==null&&rt!==0){const Ut=st.get(A.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,Ut.__webglTexture,rt)}ct=-1},this.readRenderTargetPixels=function(A,Y,rt,it,at,Ot,Ht,Ut=0){if(!(A&&A.isWebGLRenderTarget)){be("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Xt=st.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ht!==void 0&&(Xt=Xt[Ht]),Xt){M.bindFramebuffer(q.FRAMEBUFFER,Xt);try{const Vt=A.textures[Ut],jt=Vt.format,oe=Vt.type;if(A.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Ut),!O.textureFormatReadable(jt)){be("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!O.textureTypeReadable(oe)){be("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=A.width-it&&rt>=0&&rt<=A.height-at&&q.readPixels(Y,rt,it,at,Ct.convert(jt),Ct.convert(oe),Ot)}finally{const Vt=$!==null?st.get($).__webglFramebuffer:null;M.bindFramebuffer(q.FRAMEBUFFER,Vt)}}},this.readRenderTargetPixelsAsync=async function(A,Y,rt,it,at,Ot,Ht,Ut=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Xt=st.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ht!==void 0&&(Xt=Xt[Ht]),Xt)if(Y>=0&&Y<=A.width-it&&rt>=0&&rt<=A.height-at){M.bindFramebuffer(q.FRAMEBUFFER,Xt);const Vt=A.textures[Ut],jt=Vt.format,oe=Vt.type;if(A.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Ut),!O.textureFormatReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!O.textureTypeReadable(oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Yt=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,Yt),q.bufferData(q.PIXEL_PACK_BUFFER,Ot.byteLength,q.STREAM_READ),q.readPixels(Y,rt,it,at,Ct.convert(jt),Ct.convert(oe),0);const Te=$!==null?st.get($).__webglFramebuffer:null;M.bindFramebuffer(q.FRAMEBUFFER,Te);const tn=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await QM(q,tn,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,Yt),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,Ot),q.deleteBuffer(Yt),q.deleteSync(tn),Ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,Y=null,rt=0){const it=Math.pow(2,-rt),at=Math.floor(A.image.width*it),Ot=Math.floor(A.image.height*it),Ht=Y!==null?Y.x:0,Ut=Y!==null?Y.y:0;ft.setTexture2D(A,0),q.copyTexSubImage2D(q.TEXTURE_2D,rt,0,0,Ht,Ut,at,Ot),M.unbindTexture()},this.copyTextureToTexture=function(A,Y,rt=null,it=null,at=0,Ot=0){let Ht,Ut,Xt,Vt,jt,oe,Yt,Te,tn;const We=A.isCompressedTexture?A.mipmaps[Ot]:A.image;if(rt!==null)Ht=rt.max.x-rt.min.x,Ut=rt.max.y-rt.min.y,Xt=rt.isBox3?rt.max.z-rt.min.z:1,Vt=rt.min.x,jt=rt.min.y,oe=rt.isBox3?rt.min.z:0;else{const en=Math.pow(2,-at);Ht=Math.floor(We.width*en),Ut=Math.floor(We.height*en),A.isDataArrayTexture?Xt=We.depth:A.isData3DTexture?Xt=Math.floor(We.depth*en):Xt=1,Vt=0,jt=0,oe=0}it!==null?(Yt=it.x,Te=it.y,tn=it.z):(Yt=0,Te=0,tn=0);const Pe=Ct.convert(Y.format),Ie=Ct.convert(Y.type);let Ft;Y.isData3DTexture?(ft.setTexture3D(Y,0),Ft=q.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(ft.setTexture2DArray(Y,0),Ft=q.TEXTURE_2D_ARRAY):(ft.setTexture2D(Y,0),Ft=q.TEXTURE_2D),M.activeTexture(q.TEXTURE0),M.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,Y.flipY),M.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),M.pixelStorei(q.UNPACK_ALIGNMENT,Y.unpackAlignment);const Nn=M.getParameter(q.UNPACK_ROW_LENGTH),me=M.getParameter(q.UNPACK_IMAGE_HEIGHT),xn=M.getParameter(q.UNPACK_SKIP_PIXELS),ei=M.getParameter(q.UNPACK_SKIP_ROWS),Ti=M.getParameter(q.UNPACK_SKIP_IMAGES);M.pixelStorei(q.UNPACK_ROW_LENGTH,We.width),M.pixelStorei(q.UNPACK_IMAGE_HEIGHT,We.height),M.pixelStorei(q.UNPACK_SKIP_PIXELS,Vt),M.pixelStorei(q.UNPACK_SKIP_ROWS,jt),M.pixelStorei(q.UNPACK_SKIP_IMAGES,oe);const ni=A.isDataArrayTexture||A.isData3DTexture,ze=Y.isDataArrayTexture||Y.isData3DTexture;if(A.isDepthTexture){const en=st.get(A),Ai=st.get(Y),Ue=st.get(en.__renderTarget),zi=st.get(Ai.__renderTarget);M.bindFramebuffer(q.READ_FRAMEBUFFER,Ue.__webglFramebuffer),M.bindFramebuffer(q.DRAW_FRAMEBUFFER,zi.__webglFramebuffer);for(let Ra=0;Ra<Xt;Ra++)ni&&(q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,st.get(A).__webglTexture,at,oe+Ra),q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,st.get(Y).__webglTexture,Ot,tn+Ra)),q.blitFramebuffer(Vt,jt,Ht,Ut,Yt,Te,Ht,Ut,q.DEPTH_BUFFER_BIT,q.NEAREST);M.bindFramebuffer(q.READ_FRAMEBUFFER,null),M.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else if(at!==0||A.isRenderTargetTexture||st.has(A)){const en=st.get(A),Ai=st.get(Y);M.bindFramebuffer(q.READ_FRAMEBUFFER,pt),M.bindFramebuffer(q.DRAW_FRAMEBUFFER,j);for(let Ue=0;Ue<Xt;Ue++)ni?q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,en.__webglTexture,at,oe+Ue):q.framebufferTexture2D(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,en.__webglTexture,at),ze?q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Ai.__webglTexture,Ot,tn+Ue):q.framebufferTexture2D(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,Ai.__webglTexture,Ot),at!==0?q.blitFramebuffer(Vt,jt,Ht,Ut,Yt,Te,Ht,Ut,q.COLOR_BUFFER_BIT,q.NEAREST):ze?q.copyTexSubImage3D(Ft,Ot,Yt,Te,tn+Ue,Vt,jt,Ht,Ut):q.copyTexSubImage2D(Ft,Ot,Yt,Te,Vt,jt,Ht,Ut);M.bindFramebuffer(q.READ_FRAMEBUFFER,null),M.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else ze?A.isDataTexture||A.isData3DTexture?q.texSubImage3D(Ft,Ot,Yt,Te,tn,Ht,Ut,Xt,Pe,Ie,We.data):Y.isCompressedArrayTexture?q.compressedTexSubImage3D(Ft,Ot,Yt,Te,tn,Ht,Ut,Xt,Pe,We.data):q.texSubImage3D(Ft,Ot,Yt,Te,tn,Ht,Ut,Xt,Pe,Ie,We):A.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,Ot,Yt,Te,Ht,Ut,Pe,Ie,We.data):A.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,Ot,Yt,Te,We.width,We.height,Pe,We.data):q.texSubImage2D(q.TEXTURE_2D,Ot,Yt,Te,Ht,Ut,Pe,Ie,We);M.pixelStorei(q.UNPACK_ROW_LENGTH,Nn),M.pixelStorei(q.UNPACK_IMAGE_HEIGHT,me),M.pixelStorei(q.UNPACK_SKIP_PIXELS,xn),M.pixelStorei(q.UNPACK_SKIP_ROWS,ei),M.pixelStorei(q.UNPACK_SKIP_IMAGES,Ti),Ot===0&&Y.generateMipmaps&&q.generateMipmap(Ft),M.unbindTexture()},this.initRenderTarget=function(A){st.get(A).__webglFramebuffer===void 0&&ft.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?ft.setTextureCube(A,0):A.isData3DTexture?ft.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?ft.setTexture2DArray(A,0):ft.setTexture2D(A,0),M.unbindTexture()},this.resetState=function(){B=0,F=0,$=null,M.reset(),It.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorSpace=Se._getDrawingBufferColorSpace(t),i.unpackColorSpace=Se._getUnpackColorSpace()}}const $u={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Zr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const OA=new pc(-1,1,1,-1,0,1);class PA extends Vn{constructor(){super(),this.setAttribute("position",new rn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new rn([0,2,0,0,2,0],2))}}const IA=new PA;class Rp{constructor(t){this._mesh=new Gn(IA,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,OA)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class ix extends Zr{constructor(t,i="tDiffuse"){super(),this.textureID=i,this.uniforms=null,this.material=null,t instanceof In?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=il.clone(t.uniforms),this.material=new In({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Rp(this.material)}render(t,i,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Sv extends Zr{constructor(t,i){super(),this.scene=t,this.camera=i,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,i,s){const l=t.getContext(),u=t.state;u.buffers.color.setMask(!1),u.buffers.depth.setMask(!1),u.buffers.color.setLocked(!0),u.buffers.depth.setLocked(!0);let h,d;this.inverse?(h=0,d=1):(h=1,d=0),u.buffers.stencil.setTest(!0),u.buffers.stencil.setOp(l.REPLACE,l.REPLACE,l.REPLACE),u.buffers.stencil.setFunc(l.ALWAYS,h,4294967295),u.buffers.stencil.setClear(d),u.buffers.stencil.setLocked(!0),t.setRenderTarget(s),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),u.buffers.color.setLocked(!1),u.buffers.depth.setLocked(!1),u.buffers.color.setMask(!0),u.buffers.depth.setMask(!0),u.buffers.stencil.setLocked(!1),u.buffers.stencil.setFunc(l.EQUAL,1,4294967295),u.buffers.stencil.setOp(l.KEEP,l.KEEP,l.KEEP),u.buffers.stencil.setLocked(!0)}}class zA extends Zr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Mv{constructor(t,i){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),i===void 0){const s=t.getSize(new Zt);this._width=s.width,this._height=s.height,i=new jn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:pi}),i.texture.name="EffectComposer.rt1"}else this._width=i.width,this._height=i.height;this.renderTarget1=i,this.renderTarget2=i.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ix($u),this.copyPass.material.blending=Zi,this.timer=new Iy}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,i){this.passes.splice(i,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const i=this.passes.indexOf(t);i!==-1&&this.passes.splice(i,1)}isLastEnabledPass(t){for(let i=t+1;i<this.passes.length;i++)if(this.passes[i].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const i=this.renderer.getRenderTarget();let s=!1;for(let l=0,u=this.passes.length;l<u;l++){const h=this.passes[l];if(h.enabled!==!1){if(h.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(l),h.render(this.renderer,this.writeBuffer,this.readBuffer,t,s),h.needsSwap){if(s){const d=this.renderer.getContext(),m=this.renderer.state.buffers.stencil;m.setFunc(d.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),m.setFunc(d.EQUAL,1,4294967295)}this.swapBuffers()}Sv!==void 0&&(h instanceof Sv?s=!0:h instanceof zA&&(s=!1))}}this.renderer.setRenderTarget(i)}reset(t){if(t===void 0){const i=this.renderer.getSize(new Zt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=i.width,this._height=i.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,i){this._width=t,this._height=i;const s=this._width*this._pixelRatio,l=this._height*this._pixelRatio;this.renderTarget1.setSize(s,l),this.renderTarget2.setSize(s,l);for(let u=0;u<this.passes.length;u++)this.passes[u].setSize(s,l)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class yv extends Zr{constructor(t,i,s=null,l=null,u=null){super(),this.scene=t,this.camera=i,this.overrideMaterial=s,this.clearColor=l,this.clearAlpha=u,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new he}render(t,i,s){const l=t.autoClear;t.autoClear=!1;let u,h;this.overrideMaterial!==null&&(h=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(u=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(u),this.overrideMaterial!==null&&(this.scene.overrideMaterial=h),t.autoClear=l}}const BA={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new he(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class kr extends Zr{constructor(t,i=1,s,l){super(),this.strength=i,this.radius=s,this.threshold=l,this.resolution=t!==void 0?new Zt(t.x,t.y):new Zt(256,256),this.clearColor=new he(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let u=Math.round(this.resolution.x/2),h=Math.round(this.resolution.y/2);this.renderTargetBright=new jn(u,h,{type:pi}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let v=0;v<this.nMips;v++){const x=new jn(u,h,{type:pi});x.texture.name="UnrealBloomPass.h"+v,x.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(x);const g=new jn(u,h,{type:pi});g.texture.name="UnrealBloomPass.v"+v,g.texture.generateMipmaps=!1,this.renderTargetsVertical.push(g),u=Math.round(u/2),h=Math.round(h/2)}const d=BA;this.highPassUniforms=il.clone(d.uniforms),this.highPassUniforms.luminosityThreshold.value=l,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new In({uniforms:this.highPassUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader}),this.separableBlurMaterials=[];const m=[6,10,14,18,22];u=Math.round(this.resolution.x/2),h=Math.round(this.resolution.y/2);for(let v=0;v<this.nMips;v++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(m[v])),this.separableBlurMaterials[v].uniforms.invSize.value=new Zt(1/u,1/h),u=Math.round(u/2),h=Math.round(h/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=i,this.compositeMaterial.uniforms.bloomRadius.value=.1;const p=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=p,this.bloomTintColors=[new K(1,1,1),new K(1,1,1),new K(1,1,1),new K(1,1,1),new K(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=il.clone($u.uniforms),this.blendMaterial=new In({uniforms:this.copyUniforms,vertexShader:$u.vertexShader,fragmentShader:$u.fragmentShader,premultipliedAlpha:!0,blending:tc,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new he,this._oldClearAlpha=1,this._basic=new xp,this._fsQuad=new Rp(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,i){let s=Math.round(t/2),l=Math.round(i/2);this.renderTargetBright.setSize(s,l);for(let u=0;u<this.nMips;u++)this.renderTargetsHorizontal[u].setSize(s,l),this.renderTargetsVertical[u].setSize(s,l),this.separableBlurMaterials[u].uniforms.invSize.value=new Zt(1/s,1/l),s=Math.round(s/2),l=Math.round(l/2)}render(t,i,s,l,u){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const h=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),u&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=s.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let d=this.renderTargetBright;for(let m=0;m<this.nMips;m++)this._fsQuad.material=this.separableBlurMaterials[m],this.separableBlurMaterials[m].uniforms.colorTexture.value=d.texture,this.separableBlurMaterials[m].uniforms.direction.value=kr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[m]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[m].uniforms.colorTexture.value=this.renderTargetsHorizontal[m].texture,this.separableBlurMaterials[m].uniforms.direction.value=kr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[m]),t.clear(),this._fsQuad.render(t),d=this.renderTargetsVertical[m];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,u&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(s),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=h}_getSeparableBlurMaterial(t){const i=[],s=t/3;for(let l=0;l<t;l++)i.push(.39894*Math.exp(-.5*l*l/(s*s))/s);return new In({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Zt(.5,.5)},direction:{value:new Zt(.5,.5)},gaussianCoefficients:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new In({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}kr.BlurDirectionX=new Zt(1,0);kr.BlurDirectionY=new Zt(0,1);const Xu={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class FA extends Zr{constructor(){super(),this.isOutputPass=!0,this.uniforms=il.clone(Xu.uniforms),this.material=new qv({name:Xu.name,uniforms:this.uniforms,vertexShader:Xu.vertexShader,fragmentShader:Xu.fragmentShader}),this._fsQuad=new Rp(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,i,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Se.getTransfer(this._outputColorSpace)===Ne&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===np?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ip?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ap?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===cc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===rp?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===op?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===sp&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const ku={strong:"#3da977",watch:"#d9a441",exposed:"#b3413a",unassessed:"#6b675e"},HA={digital:"/g_digital-e.webp",financial:"/g_financial-e.webp",household:"/g_household-e.webp",business:"/g_business-e.webp",legacy:"/g_legacy-e.webp"};function GA(o,t,i){const s=new Image;s.onload=()=>{const u=document.createElement("canvas");u.width=256,u.height=256;const h=u.getContext("2d");h.save(),h.beginPath(),h.arc(256/2,256/2,256/2-2,0,Math.PI*2),h.clip(),h.drawImage(s,0,0,256,256),h.restore(),h.beginPath(),h.arc(256/2,256/2,256/2-2,0,Math.PI*2),h.strokeStyle="rgba(232, 200, 105, 0.55)",h.lineWidth=4,h.stroke();const d=new Mp(u);d.minFilter=vn,d.magFilter=vn;const m=new hc({map:d,transparent:!0,depthWrite:!1,depthTest:!1}),p=new vp(m);p.scale.set(t,t,1),p.renderOrder=9,i(p)},s.src=o}function VA(o){return o.assessed===0?ku.unassessed:o.riskPct>=60?ku.exposed:o.riskPct>=30?ku.watch:ku.strong}function Ev(o){return o.assessed===0?"Not assessed":o.riskPct>=60?"Exposed":o.riskPct>=30?"Watch":"Strong"}function XA(o){if(o.length<=14)return[o];const t=o.indexOf(" & ");return t>0?[o.slice(0,t+2),o.slice(t+3)]:[o]}function Wu(o,t){const s=t.weight??400,l=t.letterSpacing??0,u=t.outline??!1,h=document.createElement("canvas"),d=h.getContext("2d"),m=`${s} 72px 'Crimson Pro', Georgia, serif`;d.font=m;const p=S=>{if(!l)return d.measureText(S).width;let L=0;for(const z of S)L+=d.measureText(z).width+l;return L-l},v=Math.max(...o.map(p)),x=72*1.32;h.width=Math.max(4,Math.ceil(v+72*.9)),h.height=Math.max(4,Math.ceil(x*o.length+72*.3)),d.font=m,d.textBaseline="middle",d.lineJoin="round",d.miterLimit=2;const g=72*.16;o.forEach((S,L)=>{const z=x*(L+.5)+10.799999999999999;if(!l){d.textAlign="center",u&&(d.strokeStyle="rgba(10,8,5,0.92)",d.lineWidth=g,d.strokeText(S,h.width/2,z)),d.fillStyle=t.color,d.fillText(S,h.width/2,z);return}const C=p(S);let I=(h.width-C)/2;d.textAlign="left";for(const w of S)u&&(d.strokeStyle="rgba(10,8,5,0.92)",d.lineWidth=g,d.strokeText(w,I,z)),d.fillStyle=t.color,d.fillText(w,I,z),I+=d.measureText(w).width+l});const E=new Mp(h);E.minFilter=vn,E.magFilter=vn,E.anisotropy=8,E.colorSpace=Qn;const T=new hc({map:E,transparent:!0,depthWrite:!1,depthTest:!1}),D=new vp(T),y=t.size/72;return D.scale.set(h.width*y,h.height*y,1),D.renderOrder=10,D}function kA(o,t){const s=document.createElement("canvas");s.width=128,s.height=128;const l=s.getContext("2d"),u=l.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);u.addColorStop(0,o),u.addColorStop(.15,o),u.addColorStop(1,"rgba(0,0,0,0)"),l.fillStyle=u,l.fillRect(0,0,128,128);const h=new Mp(s),d=new hc({map:h,transparent:!0,depthWrite:!1,blending:tc,opacity:.32}),m=new vp(d);return m.scale.set(t,t,1),m.renderOrder=1,m}const bv="#f2ede2",qu="#d9a441",Tv=3.05,WA=_u.forwardRef(function({scores:t,readiness:i},s){const l=_u.useRef(null);return _u.useImperativeHandle(s,()=>l.current),_u.useEffect(()=>{const u=l.current;if(!u)return;let h=!1;const d=[],m=920,p=920,v=new hy,x=new hi(56,m/p,.1,100);x.position.set(0,12.5,8),x.lookAt(0,-.35,0);const g=new LA({canvas:u,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});g.setSize(m,p,!1),g.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),g.setClearColor(0,0),g.outputColorSpace=Qn,g.toneMapping=cc,g.toneMappingExposure=1.15,v.add(new Ly(16774368,.42));const E=new Ny(16773855,1.35);E.position.set(3.5,6,4),v.add(E);const T=new Z_(7314134,.6,20);T.position.set(-4,2,-5),v.add(T);const D=new Z_(qu,1.1,8);D.position.set(0,.6,0),v.add(D);const y=new zs;y.rotation.x=-Math.PI/2,v.add(y);const S=new lc(1.02,1.16,96,1,0,Math.PI*2),L=new Ko({color:1841428,emissive:0,metalness:.2,roughness:.9,side:Li});y.add(new Gn(S,L));const z=Math.max(.002,Math.min(1,i/100)),C=new lc(1.02,1.16,Math.max(2,Math.round(96*z)),1,Math.PI/2,-z*Math.PI*2),I=new Ko({color:qu,emissive:qu,emissiveIntensity:1.4,metalness:.55,roughness:.25,side:Li});y.add(new Gn(C,I));const w=new Gn(new yp(.94,64),new Ko({color:1183498,emissive:657414,emissiveIntensity:.6,metalness:.3,roughness:.85}));w.position.y=-.001,y.add(w);const P=Wu([`${Math.round(i)}%`],{size:.62,color:qu,weight:700,outline:!1});P.position.set(0,.08,.18),v.add(P),d.push(P);const b=Wu(["READINESS"],{size:.16,color:bv,weight:500,letterSpacing:6,outline:!1});b.position.set(0,-.38,.18),b.material.opacity=.75,v.add(b),d.push(b);const U=new zs;v.add(U);const V=[],G=x.position.distanceTo(new K(0,-.1,0));t.forEach((ct,Et)=>{const N=-Math.PI/2+Et*(Math.PI*2/t.length),Z=Math.cos(N)*Tv,St=Math.sin(N)*Tv,bt=VA(ct),Nt=new he(bt),tt=new zs;tt.position.set(Z,0,St),U.add(tt);const xt=kA(bt,1.05);xt.position.y=.02,tt.add(xt);const Mt=new Tp(.33,2),zt=new Ko({color:Nt,emissive:Nt,emissiveIntensity:.55,metalness:.65,roughness:.18}),te=new Gn(Mt,zt);te.rotation.set(.4,.6,.1),tt.add(te),V.push(Mt,zt);const Kt=1.05,He=new Ep(.24,.3,Kt,24),re=new Ko({color:9077624,emissive:Nt,emissiveIntensity:.16,metalness:.12,roughness:.82}),de=new Gn(He,re);de.position.y=-.715,tt.add(de),V.push(He,re);const pe=1.7,ue=Math.cos(N)*pe,Ye=Math.sin(N)*pe,Ze=XA(ct.title).map(Ee=>Ee.toUpperCase()),Ce=Wu(Ze,{size:.25,color:bv,weight:600,letterSpacing:1});Ce.position.set(Z+ue,.62,St+Ye),Ce.material.opacity=.92;const je=x.position.distanceTo(Ce.position)/G;Ce.scale.multiplyScalar(je),v.add(Ce),d.push(Ce);const Le=HA[ct.pillarId];if(Le){const O=(Ze.length>=2?.78:.52)+.31,M=Z+ue,J=St+Ye,st=Ce.position.y+O*je;GA(Le,.62,ft=>{h||(ft.position.set(M,st,J),ft.scale.multiplyScalar(x.position.distanceTo(ft.position)/G),v.add(ft),$())})}const Ke=ct.assessed>0?`${ct.riskPct}%`:"",q=Wu([Ke?`${Ev(ct).toUpperCase()}  ${Ke}`:Ev(ct).toUpperCase()],{size:.19,color:bt,weight:600,letterSpacing:1.2}),De=Ze.length>=2?1.05:.44;q.position.set(Z+ue,Ce.position.y-De,St+Ye),q.scale.multiplyScalar(x.position.distanceTo(q.position)/G),q.renderOrder=11,v.add(q),d.push(q)});const W=Math.min(window.devicePixelRatio||1,2),lt=new Mv(g);lt.renderToScreen=!1,lt.setSize(m,p),lt.setPixelRatio(W),lt.addPass(new yv(v,x));const pt=new kr(new Zt(m,p),.35,.28,.5);lt.addPass(pt);const j={uniforms:{baseTexture:{value:null},bloomTexture:{value:lt.renderTarget2.texture}},vertexShader:`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          uniform sampler2D baseTexture;
          uniform sampler2D bloomTexture;
          varying vec2 vUv;
          void main() {
            gl_FragColor = texture2D(baseTexture, vUv) + texture2D(bloomTexture, vUv);
          }
        `},B=new ix(j,"baseTexture");B.needsSwap=!0;const F=new Mv(g);F.setSize(m,p),F.setPixelRatio(W),F.addPass(new yv(v,x)),F.addPass(B),F.addPass(new FA);const $=()=>{d.forEach(ct=>ct.visible=!1),lt.render(),d.forEach(ct=>ct.visible=!0),F.render()};return $(),()=>{h=!0,F.dispose(),lt.dispose(),g.dispose(),v.traverse(ct=>{const Et=ct;Et.geometry&&Et.geometry.dispose();const N=ct.material;Array.isArray(N)?N.forEach(Z=>Z.dispose()):N&&N.dispose()}),V.forEach(ct=>ct.dispose())}},[t,i]),Av.jsx("canvas",{ref:l,style:{width:"100%",maxWidth:560,aspectRatio:"1 / 1",display:"block",margin:"0 auto"}})}),qA=[{pillarId:"digital",title:"Digital Life",number:"01",color:"#d9a441",handled:4,partial:1,exposed:1,assessed:6,riskPct:25,exposedItems:[],partialItems:[]},{pillarId:"financial",title:"Financial & Assets",number:"02",color:"#d9a441",handled:2,partial:3,exposed:0,assessed:5,riskPct:30,exposedItems:[],partialItems:[]},{pillarId:"household",title:"Household & Property",number:"03",color:"#6b675e",handled:0,partial:0,exposed:0,assessed:0,riskPct:0,exposedItems:[],partialItems:[]},{pillarId:"health",title:"Health & Medical",number:"04",color:"#d9a441",handled:2,partial:1,exposed:1,assessed:4,riskPct:38,exposedItems:[],partialItems:[]},{pillarId:"legal",title:"Legal & Estate",number:"05",color:"#b3413a",handled:1,partial:1,exposed:2,assessed:4,riskPct:63,exposedItems:[],partialItems:[]},{pillarId:"business",title:"Business Continuity",number:"06",color:"#b3413a",handled:0,partial:2,exposed:2,assessed:4,riskPct:75,exposedItems:[],partialItems:[]},{pillarId:"legacy",title:"Legacy & Wishes",number:"07",color:"#d9a441",handled:1,partial:1,exposed:1,assessed:3,riskPct:50,exposedItems:[],partialItems:[]}],YA=56,ZA=document.getElementById("root");mM.createRoot(ZA).render(Av.jsx(WA,{scores:qA,readiness:YA}));window.__GAPMAP_READY=!0;
