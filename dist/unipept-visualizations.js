class ys {
  constructor(t, e, n = [], a, i, o = {}) {
    this.id = t, this.name = e, this.children = n, this.count = a, this.selfCount = i, this.extra = o;
  }
}
function Xo(r, t) {
  return r == null || t == null ? NaN : r < t ? -1 : r > t ? 1 : r >= t ? 0 : NaN;
}
function OR(r, t) {
  return r == null || t == null ? NaN : t < r ? -1 : t > r ? 1 : t >= r ? 0 : NaN;
}
function eS(r) {
  let t, e, n;
  r.length !== 2 ? (t = Xo, e = (s, u) => Xo(r(s), u), n = (s, u) => r(s) - u) : (t = r === Xo || r === OR ? r : AR, e = r, n = r);
  function a(s, u, l = 0, c = s.length) {
    if (l < c) {
      if (t(u, u) !== 0)
        return c;
      do {
        const f = l + c >>> 1;
        e(s[f], u) < 0 ? l = f + 1 : c = f;
      } while (l < c);
    }
    return l;
  }
  function i(s, u, l = 0, c = s.length) {
    if (l < c) {
      if (t(u, u) !== 0)
        return c;
      do {
        const f = l + c >>> 1;
        e(s[f], u) <= 0 ? l = f + 1 : c = f;
      } while (l < c);
    }
    return l;
  }
  function o(s, u, l = 0, c = s.length) {
    const f = a(s, u, l, c - 1);
    return f > l && n(s[f - 1], u) > -n(s[f], u) ? f - 1 : f;
  }
  return { left: a, center: o, right: i };
}
function AR() {
  return 0;
}
function RR(r) {
  return r === null ? NaN : +r;
}
const _R = eS(Xo), CR = _R.right;
eS(RR).center;
const nS = CR;
class Gg extends Map {
  constructor(t, e = NR) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: e } }), t != null)
      for (const [n, a] of t)
        this.set(n, a);
  }
  get(t) {
    return super.get(Wg(this, t));
  }
  has(t) {
    return super.has(Wg(this, t));
  }
  set(t, e) {
    return super.set(PR(this, t), e);
  }
  delete(t) {
    return super.delete(MR(this, t));
  }
}
function Wg({ _intern: r, _key: t }, e) {
  const n = t(e);
  return r.has(n) ? r.get(n) : e;
}
function PR({ _intern: r, _key: t }, e) {
  const n = t(e);
  return r.has(n) ? r.get(n) : (r.set(n, e), e);
}
function MR({ _intern: r, _key: t }, e) {
  const n = t(e);
  return r.has(n) && (e = r.get(n), r.delete(n)), e;
}
function NR(r) {
  return r !== null && typeof r == "object" ? r.valueOf() : r;
}
const DR = Math.sqrt(50), LR = Math.sqrt(10), FR = Math.sqrt(2);
function ms(r, t, e) {
  const n = (t - r) / Math.max(0, e), a = Math.floor(Math.log10(n)), i = n / Math.pow(10, a), o = i >= DR ? 10 : i >= LR ? 5 : i >= FR ? 2 : 1;
  let s, u, l;
  return a < 0 ? (l = Math.pow(10, -a) / o, s = Math.round(r * l), u = Math.round(t * l), s / l < r && ++s, u / l > t && --u, l = -l) : (l = Math.pow(10, a) * o, s = Math.round(r / l), u = Math.round(t / l), s * l < r && ++s, u * l > t && --u), u < s && 0.5 <= e && e < 2 ? ms(r, t, e * 2) : [s, u, l];
}
function kR(r, t, e) {
  if (t = +t, r = +r, e = +e, !(e > 0))
    return [];
  if (r === t)
    return [r];
  const n = t < r, [a, i, o] = n ? ms(t, r, e) : ms(r, t, e);
  if (!(i >= a))
    return [];
  const s = i - a + 1, u = new Array(s);
  if (n)
    if (o < 0)
      for (let l = 0; l < s; ++l)
        u[l] = (i - l) / -o;
    else
      for (let l = 0; l < s; ++l)
        u[l] = (i - l) * o;
  else if (o < 0)
    for (let l = 0; l < s; ++l)
      u[l] = (a + l) / -o;
  else
    for (let l = 0; l < s; ++l)
      u[l] = (a + l) * o;
  return u;
}
function jf(r, t, e) {
  return t = +t, r = +r, e = +e, ms(r, t, e)[2];
}
function BR(r, t, e) {
  t = +t, r = +r, e = +e;
  const n = t < r, a = n ? jf(t, r, e) : jf(r, t, e);
  return (n ? -1 : 1) * (a < 0 ? 1 / -a : a);
}
var jR = { value: () => {
} };
function Sh() {
  for (var r = 0, t = arguments.length, e = {}, n; r < t; ++r) {
    if (!(n = arguments[r] + "") || n in e || /[\s.]/.test(n))
      throw new Error("illegal type: " + n);
    e[n] = [];
  }
  return new Jo(e);
}
function Jo(r) {
  this._ = r;
}
function UR(r, t) {
  return r.trim().split(/^|\s+/).map(function(e) {
    var n = "", a = e.indexOf(".");
    if (a >= 0 && (n = e.slice(a + 1), e = e.slice(0, a)), e && !t.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    return { type: e, name: n };
  });
}
Jo.prototype = Sh.prototype = {
  constructor: Jo,
  on: function(r, t) {
    var e = this._, n = UR(r + "", e), a, i = -1, o = n.length;
    if (arguments.length < 2) {
      for (; ++i < o; )
        if ((a = (r = n[i]).type) && (a = zR(e[a], r.name)))
          return a;
      return;
    }
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++i < o; )
      if (a = (r = n[i]).type)
        e[a] = qg(e[a], r.name, t);
      else if (t == null)
        for (a in e)
          e[a] = qg(e[a], r.name, null);
    return this;
  },
  copy: function() {
    var r = {}, t = this._;
    for (var e in t)
      r[e] = t[e].slice();
    return new Jo(r);
  },
  call: function(r, t) {
    if ((a = arguments.length - 2) > 0)
      for (var e = new Array(a), n = 0, a, i; n < a; ++n)
        e[n] = arguments[n + 2];
    if (!this._.hasOwnProperty(r))
      throw new Error("unknown type: " + r);
    for (i = this._[r], n = 0, a = i.length; n < a; ++n)
      i[n].value.apply(t, e);
  },
  apply: function(r, t, e) {
    if (!this._.hasOwnProperty(r))
      throw new Error("unknown type: " + r);
    for (var n = this._[r], a = 0, i = n.length; a < i; ++a)
      n[a].value.apply(t, e);
  }
};
function zR(r, t) {
  for (var e = 0, n = r.length, a; e < n; ++e)
    if ((a = r[e]).name === t)
      return a.value;
}
function qg(r, t, e) {
  for (var n = 0, a = r.length; n < a; ++n)
    if (r[n].name === t) {
      r[n] = jR, r = r.slice(0, n).concat(r.slice(n + 1));
      break;
    }
  return e != null && r.push({ name: t, value: e }), r;
}
var Uf = "http://www.w3.org/1999/xhtml";
const Yg = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Uf,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function lu(r) {
  var t = r += "", e = t.indexOf(":");
  return e >= 0 && (t = r.slice(0, e)) !== "xmlns" && (r = r.slice(e + 1)), Yg.hasOwnProperty(t) ? { space: Yg[t], local: r } : r;
}
function VR(r) {
  return function() {
    var t = this.ownerDocument, e = this.namespaceURI;
    return e === Uf && t.documentElement.namespaceURI === Uf ? t.createElement(r) : t.createElementNS(e, r);
  };
}
function HR(r) {
  return function() {
    return this.ownerDocument.createElementNS(r.space, r.local);
  };
}
function aS(r) {
  var t = lu(r);
  return (t.local ? HR : VR)(t);
}
function GR() {
}
function Eh(r) {
  return r == null ? GR : function() {
    return this.querySelector(r);
  };
}
function WR(r) {
  typeof r != "function" && (r = Eh(r));
  for (var t = this._groups, e = t.length, n = new Array(e), a = 0; a < e; ++a)
    for (var i = t[a], o = i.length, s = n[a] = new Array(o), u, l, c = 0; c < o; ++c)
      (u = i[c]) && (l = r.call(u, u.__data__, c, i)) && ("__data__" in u && (l.__data__ = u.__data__), s[c] = l);
  return new jr(n, this._parents);
}
function qR(r) {
  return r == null ? [] : Array.isArray(r) ? r : Array.from(r);
}
function YR() {
  return [];
}
function iS(r) {
  return r == null ? YR : function() {
    return this.querySelectorAll(r);
  };
}
function KR(r) {
  return function() {
    return qR(r.apply(this, arguments));
  };
}
function XR(r) {
  typeof r == "function" ? r = KR(r) : r = iS(r);
  for (var t = this._groups, e = t.length, n = [], a = [], i = 0; i < e; ++i)
    for (var o = t[i], s = o.length, u, l = 0; l < s; ++l)
      (u = o[l]) && (n.push(r.call(u, u.__data__, l, o)), a.push(u));
  return new jr(n, a);
}
function oS(r) {
  return function() {
    return this.matches(r);
  };
}
function sS(r) {
  return function(t) {
    return t.matches(r);
  };
}
var JR = Array.prototype.find;
function ZR(r) {
  return function() {
    return JR.call(this.children, r);
  };
}
function QR() {
  return this.firstElementChild;
}
function r_(r) {
  return this.select(r == null ? QR : ZR(typeof r == "function" ? r : sS(r)));
}
var t_ = Array.prototype.filter;
function e_() {
  return Array.from(this.children);
}
function n_(r) {
  return function() {
    return t_.call(this.children, r);
  };
}
function a_(r) {
  return this.selectAll(r == null ? e_ : n_(typeof r == "function" ? r : sS(r)));
}
function i_(r) {
  typeof r != "function" && (r = oS(r));
  for (var t = this._groups, e = t.length, n = new Array(e), a = 0; a < e; ++a)
    for (var i = t[a], o = i.length, s = n[a] = [], u, l = 0; l < o; ++l)
      (u = i[l]) && r.call(u, u.__data__, l, i) && s.push(u);
  return new jr(n, this._parents);
}
function uS(r) {
  return new Array(r.length);
}
function o_() {
  return new jr(this._enter || this._groups.map(uS), this._parents);
}
function bs(r, t) {
  this.ownerDocument = r.ownerDocument, this.namespaceURI = r.namespaceURI, this._next = null, this._parent = r, this.__data__ = t;
}
bs.prototype = {
  constructor: bs,
  appendChild: function(r) {
    return this._parent.insertBefore(r, this._next);
  },
  insertBefore: function(r, t) {
    return this._parent.insertBefore(r, t);
  },
  querySelector: function(r) {
    return this._parent.querySelector(r);
  },
  querySelectorAll: function(r) {
    return this._parent.querySelectorAll(r);
  }
};
function s_(r) {
  return function() {
    return r;
  };
}
function u_(r, t, e, n, a, i) {
  for (var o = 0, s, u = t.length, l = i.length; o < l; ++o)
    (s = t[o]) ? (s.__data__ = i[o], n[o] = s) : e[o] = new bs(r, i[o]);
  for (; o < u; ++o)
    (s = t[o]) && (a[o] = s);
}
function l_(r, t, e, n, a, i, o) {
  var s, u, l = /* @__PURE__ */ new Map(), c = t.length, f = i.length, v = new Array(c), h;
  for (s = 0; s < c; ++s)
    (u = t[s]) && (v[s] = h = o.call(u, u.__data__, s, t) + "", l.has(h) ? a[s] = u : l.set(h, u));
  for (s = 0; s < f; ++s)
    h = o.call(r, i[s], s, i) + "", (u = l.get(h)) ? (n[s] = u, u.__data__ = i[s], l.delete(h)) : e[s] = new bs(r, i[s]);
  for (s = 0; s < c; ++s)
    (u = t[s]) && l.get(v[s]) === u && (a[s] = u);
}
function c_(r) {
  return r.__data__;
}
function f_(r, t) {
  if (!arguments.length)
    return Array.from(this, c_);
  var e = t ? l_ : u_, n = this._parents, a = this._groups;
  typeof r != "function" && (r = s_(r));
  for (var i = a.length, o = new Array(i), s = new Array(i), u = new Array(i), l = 0; l < i; ++l) {
    var c = n[l], f = a[l], v = f.length, h = v_(r.call(c, c && c.__data__, l, n)), g = h.length, $ = s[l] = new Array(g), y = o[l] = new Array(g), p = u[l] = new Array(v);
    e(c, f, $, y, p, h, t);
    for (var S = 0, I = 0, A, N; S < g; ++S)
      if (A = $[S]) {
        for (S >= I && (I = S + 1); !(N = y[I]) && ++I < g; )
          ;
        A._next = N || null;
      }
  }
  return o = new jr(o, n), o._enter = s, o._exit = u, o;
}
function v_(r) {
  return typeof r == "object" && "length" in r ? r : Array.from(r);
}
function h_() {
  return new jr(this._exit || this._groups.map(uS), this._parents);
}
function d_(r, t, e) {
  var n = this.enter(), a = this, i = this.exit();
  return typeof r == "function" ? (n = r(n), n && (n = n.selection())) : n = n.append(r + ""), t != null && (a = t(a), a && (a = a.selection())), e == null ? i.remove() : e(i), n && a ? n.merge(a).order() : a;
}
function g_(r) {
  for (var t = r.selection ? r.selection() : r, e = this._groups, n = t._groups, a = e.length, i = n.length, o = Math.min(a, i), s = new Array(a), u = 0; u < o; ++u)
    for (var l = e[u], c = n[u], f = l.length, v = s[u] = new Array(f), h, g = 0; g < f; ++g)
      (h = l[g] || c[g]) && (v[g] = h);
  for (; u < a; ++u)
    s[u] = e[u];
  return new jr(s, this._parents);
}
function p_() {
  for (var r = this._groups, t = -1, e = r.length; ++t < e; )
    for (var n = r[t], a = n.length - 1, i = n[a], o; --a >= 0; )
      (o = n[a]) && (i && o.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(o, i), i = o);
  return this;
}
function $_(r) {
  r || (r = y_);
  function t(f, v) {
    return f && v ? r(f.__data__, v.__data__) : !f - !v;
  }
  for (var e = this._groups, n = e.length, a = new Array(n), i = 0; i < n; ++i) {
    for (var o = e[i], s = o.length, u = a[i] = new Array(s), l, c = 0; c < s; ++c)
      (l = o[c]) && (u[c] = l);
    u.sort(t);
  }
  return new jr(a, this._parents).order();
}
function y_(r, t) {
  return r < t ? -1 : r > t ? 1 : r >= t ? 0 : NaN;
}
function m_() {
  var r = arguments[0];
  return arguments[0] = this, r.apply(null, arguments), this;
}
function b_() {
  return Array.from(this);
}
function w_() {
  for (var r = this._groups, t = 0, e = r.length; t < e; ++t)
    for (var n = r[t], a = 0, i = n.length; a < i; ++a) {
      var o = n[a];
      if (o)
        return o;
    }
  return null;
}
function S_() {
  let r = 0;
  for (const t of this)
    ++r;
  return r;
}
function E_() {
  return !this.node();
}
function T_(r) {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var a = t[e], i = 0, o = a.length, s; i < o; ++i)
      (s = a[i]) && r.call(s, s.__data__, i, a);
  return this;
}
function x_(r) {
  return function() {
    this.removeAttribute(r);
  };
}
function I_(r) {
  return function() {
    this.removeAttributeNS(r.space, r.local);
  };
}
function O_(r, t) {
  return function() {
    this.setAttribute(r, t);
  };
}
function A_(r, t) {
  return function() {
    this.setAttributeNS(r.space, r.local, t);
  };
}
function R_(r, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? this.removeAttribute(r) : this.setAttribute(r, e);
  };
}
function __(r, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? this.removeAttributeNS(r.space, r.local) : this.setAttributeNS(r.space, r.local, e);
  };
}
function C_(r, t) {
  var e = lu(r);
  if (arguments.length < 2) {
    var n = this.node();
    return e.local ? n.getAttributeNS(e.space, e.local) : n.getAttribute(e);
  }
  return this.each((t == null ? e.local ? I_ : x_ : typeof t == "function" ? e.local ? __ : R_ : e.local ? A_ : O_)(e, t));
}
function lS(r) {
  return r.ownerDocument && r.ownerDocument.defaultView || r.document && r || r.defaultView;
}
function P_(r) {
  return function() {
    this.style.removeProperty(r);
  };
}
function M_(r, t, e) {
  return function() {
    this.style.setProperty(r, t, e);
  };
}
function N_(r, t, e) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(r) : this.style.setProperty(r, n, e);
  };
}
function D_(r, t, e) {
  return arguments.length > 1 ? this.each((t == null ? P_ : typeof t == "function" ? N_ : M_)(r, t, e ?? "")) : kn(this.node(), r);
}
function kn(r, t) {
  return r.style.getPropertyValue(t) || lS(r).getComputedStyle(r, null).getPropertyValue(t);
}
function L_(r) {
  return function() {
    delete this[r];
  };
}
function F_(r, t) {
  return function() {
    this[r] = t;
  };
}
function k_(r, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? delete this[r] : this[r] = e;
  };
}
function B_(r, t) {
  return arguments.length > 1 ? this.each((t == null ? L_ : typeof t == "function" ? k_ : F_)(r, t)) : this.node()[r];
}
function cS(r) {
  return r.trim().split(/^|\s+/);
}
function Th(r) {
  return r.classList || new fS(r);
}
function fS(r) {
  this._node = r, this._names = cS(r.getAttribute("class") || "");
}
fS.prototype = {
  add: function(r) {
    var t = this._names.indexOf(r);
    t < 0 && (this._names.push(r), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(r) {
    var t = this._names.indexOf(r);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(r) {
    return this._names.indexOf(r) >= 0;
  }
};
function vS(r, t) {
  for (var e = Th(r), n = -1, a = t.length; ++n < a; )
    e.add(t[n]);
}
function hS(r, t) {
  for (var e = Th(r), n = -1, a = t.length; ++n < a; )
    e.remove(t[n]);
}
function j_(r) {
  return function() {
    vS(this, r);
  };
}
function U_(r) {
  return function() {
    hS(this, r);
  };
}
function z_(r, t) {
  return function() {
    (t.apply(this, arguments) ? vS : hS)(this, r);
  };
}
function V_(r, t) {
  var e = cS(r + "");
  if (arguments.length < 2) {
    for (var n = Th(this.node()), a = -1, i = e.length; ++a < i; )
      if (!n.contains(e[a]))
        return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? z_ : t ? j_ : U_)(e, t));
}
function H_() {
  this.textContent = "";
}
function G_(r) {
  return function() {
    this.textContent = r;
  };
}
function W_(r) {
  return function() {
    var t = r.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function q_(r) {
  return arguments.length ? this.each(r == null ? H_ : (typeof r == "function" ? W_ : G_)(r)) : this.node().textContent;
}
function Y_() {
  this.innerHTML = "";
}
function K_(r) {
  return function() {
    this.innerHTML = r;
  };
}
function X_(r) {
  return function() {
    var t = r.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function J_(r) {
  return arguments.length ? this.each(r == null ? Y_ : (typeof r == "function" ? X_ : K_)(r)) : this.node().innerHTML;
}
function Z_() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Q_() {
  return this.each(Z_);
}
function rC() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function tC() {
  return this.each(rC);
}
function eC(r) {
  var t = typeof r == "function" ? r : aS(r);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function nC() {
  return null;
}
function aC(r, t) {
  var e = typeof r == "function" ? r : aS(r), n = t == null ? nC : typeof t == "function" ? t : Eh(t);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function iC() {
  var r = this.parentNode;
  r && r.removeChild(this);
}
function oC() {
  return this.each(iC);
}
function sC() {
  var r = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(r, this.nextSibling) : r;
}
function uC() {
  var r = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(r, this.nextSibling) : r;
}
function lC(r) {
  return this.select(r ? uC : sC);
}
function cC(r) {
  return arguments.length ? this.property("__data__", r) : this.node().__data__;
}
function fC(r) {
  return function(t) {
    r.call(this, t, this.__data__);
  };
}
function vC(r) {
  return r.trim().split(/^|\s+/).map(function(t) {
    var e = "", n = t.indexOf(".");
    return n >= 0 && (e = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: e };
  });
}
function hC(r) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var e = 0, n = -1, a = t.length, i; e < a; ++e)
        i = t[e], (!r.type || i.type === r.type) && i.name === r.name ? this.removeEventListener(i.type, i.listener, i.options) : t[++n] = i;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function dC(r, t, e) {
  return function() {
    var n = this.__on, a, i = fC(t);
    if (n) {
      for (var o = 0, s = n.length; o < s; ++o)
        if ((a = n[o]).type === r.type && a.name === r.name) {
          this.removeEventListener(a.type, a.listener, a.options), this.addEventListener(a.type, a.listener = i, a.options = e), a.value = t;
          return;
        }
    }
    this.addEventListener(r.type, i, e), a = { type: r.type, name: r.name, value: t, listener: i, options: e }, n ? n.push(a) : this.__on = [a];
  };
}
function gC(r, t, e) {
  var n = vC(r + ""), a, i = n.length, o;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var u = 0, l = s.length, c; u < l; ++u)
        for (a = 0, c = s[u]; a < i; ++a)
          if ((o = n[a]).type === c.type && o.name === c.name)
            return c.value;
    }
    return;
  }
  for (s = t ? dC : hC, a = 0; a < i; ++a)
    this.each(s(n[a], t, e));
  return this;
}
function dS(r, t, e) {
  var n = lS(r), a = n.CustomEvent;
  typeof a == "function" ? a = new a(t, e) : (a = n.document.createEvent("Event"), e ? (a.initEvent(t, e.bubbles, e.cancelable), a.detail = e.detail) : a.initEvent(t, !1, !1)), r.dispatchEvent(a);
}
function pC(r, t) {
  return function() {
    return dS(this, r, t);
  };
}
function $C(r, t) {
  return function() {
    return dS(this, r, t.apply(this, arguments));
  };
}
function yC(r, t) {
  return this.each((typeof t == "function" ? $C : pC)(r, t));
}
function* mC() {
  for (var r = this._groups, t = 0, e = r.length; t < e; ++t)
    for (var n = r[t], a = 0, i = n.length, o; a < i; ++a)
      (o = n[a]) && (yield o);
}
var gS = [null];
function jr(r, t) {
  this._groups = r, this._parents = t;
}
function mi() {
  return new jr([[document.documentElement]], gS);
}
function bC() {
  return this;
}
jr.prototype = mi.prototype = {
  constructor: jr,
  select: WR,
  selectAll: XR,
  selectChild: r_,
  selectChildren: a_,
  filter: i_,
  data: f_,
  enter: o_,
  exit: h_,
  join: d_,
  merge: g_,
  selection: bC,
  order: p_,
  sort: $_,
  call: m_,
  nodes: b_,
  node: w_,
  size: S_,
  empty: E_,
  each: T_,
  attr: C_,
  style: D_,
  property: B_,
  classed: V_,
  text: q_,
  html: J_,
  raise: Q_,
  lower: tC,
  append: eC,
  insert: aC,
  remove: oC,
  clone: lC,
  datum: cC,
  on: gC,
  dispatch: yC,
  [Symbol.iterator]: mC
};
function yr(r) {
  return typeof r == "string" ? new jr([[document.querySelector(r)]], [document.documentElement]) : new jr([[r]], gS);
}
function wC(r) {
  let t;
  for (; t = r.sourceEvent; )
    r = t;
  return r;
}
function be(r, t) {
  if (r = wC(r), t === void 0 && (t = r.currentTarget), t) {
    var e = t.ownerSVGElement || t;
    if (e.createSVGPoint) {
      var n = e.createSVGPoint();
      return n.x = r.clientX, n.y = r.clientY, n = n.matrixTransform(t.getScreenCTM().inverse()), [n.x, n.y];
    }
    if (t.getBoundingClientRect) {
      var a = t.getBoundingClientRect();
      return [r.clientX - a.left - t.clientLeft, r.clientY - a.top - t.clientTop];
    }
  }
  return [r.pageX, r.pageY];
}
const zf = { capture: !0, passive: !1 };
function Vf(r) {
  r.preventDefault(), r.stopImmediatePropagation();
}
function SC(r) {
  var t = r.document.documentElement, e = yr(r).on("dragstart.drag", Vf, zf);
  "onselectstart" in t ? e.on("selectstart.drag", Vf, zf) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function EC(r, t) {
  var e = r.document.documentElement, n = yr(r).on("dragstart.drag", null);
  t && (n.on("click.drag", Vf, zf), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in e ? n.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect);
}
function bi(r, t, e) {
  r.prototype = t.prototype = e, e.constructor = r;
}
function cu(r, t) {
  var e = Object.create(r.prototype);
  for (var n in t)
    e[n] = t[n];
  return e;
}
function He() {
}
var ii = 0.7, ws = 1 / ii, On = "\\s*([+-]?\\d+)\\s*", oi = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", It = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", TC = /^#([0-9a-f]{3,8})$/, xC = new RegExp(`^rgb\\(${On},${On},${On}\\)$`), IC = new RegExp(`^rgb\\(${It},${It},${It}\\)$`), OC = new RegExp(`^rgba\\(${On},${On},${On},${oi}\\)$`), AC = new RegExp(`^rgba\\(${It},${It},${It},${oi}\\)$`), RC = new RegExp(`^hsl\\(${oi},${It},${It}\\)$`), _C = new RegExp(`^hsla\\(${oi},${It},${It},${oi}\\)$`), Kg = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
bi(He, Fe, {
  copy(r) {
    return Object.assign(new this.constructor(), this, r);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Xg,
  // Deprecated! Use color.formatHex.
  formatHex: Xg,
  formatHex8: CC,
  formatHsl: PC,
  formatRgb: Jg,
  toString: Jg
});
function Xg() {
  return this.rgb().formatHex();
}
function CC() {
  return this.rgb().formatHex8();
}
function PC() {
  return $S(this).formatHsl();
}
function Jg() {
  return this.rgb().formatRgb();
}
function Fe(r) {
  var t, e;
  return r = (r + "").trim().toLowerCase(), (t = TC.exec(r)) ? (e = t[1].length, t = parseInt(t[1], 16), e === 6 ? Zg(t) : e === 3 ? new Sr(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : e === 8 ? Zi(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : e === 4 ? Zi(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = xC.exec(r)) ? new Sr(t[1], t[2], t[3], 1) : (t = IC.exec(r)) ? new Sr(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = OC.exec(r)) ? Zi(t[1], t[2], t[3], t[4]) : (t = AC.exec(r)) ? Zi(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = RC.exec(r)) ? tp(t[1], t[2] / 100, t[3] / 100, 1) : (t = _C.exec(r)) ? tp(t[1], t[2] / 100, t[3] / 100, t[4]) : Kg.hasOwnProperty(r) ? Zg(Kg[r]) : r === "transparent" ? new Sr(NaN, NaN, NaN, 0) : null;
}
function Zg(r) {
  return new Sr(r >> 16 & 255, r >> 8 & 255, r & 255, 1);
}
function Zi(r, t, e, n) {
  return n <= 0 && (r = t = e = NaN), new Sr(r, t, e, n);
}
function pS(r) {
  return r instanceof He || (r = Fe(r)), r ? (r = r.rgb(), new Sr(r.r, r.g, r.b, r.opacity)) : new Sr();
}
function Ss(r, t, e, n) {
  return arguments.length === 1 ? pS(r) : new Sr(r, t, e, n ?? 1);
}
function Sr(r, t, e, n) {
  this.r = +r, this.g = +t, this.b = +e, this.opacity = +n;
}
bi(Sr, Ss, cu(He, {
  brighter(r) {
    return r = r == null ? ws : Math.pow(ws, r), new Sr(this.r * r, this.g * r, this.b * r, this.opacity);
  },
  darker(r) {
    return r = r == null ? ii : Math.pow(ii, r), new Sr(this.r * r, this.g * r, this.b * r, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Sr(Me(this.r), Me(this.g), Me(this.b), Es(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Qg,
  // Deprecated! Use color.formatHex.
  formatHex: Qg,
  formatHex8: MC,
  formatRgb: rp,
  toString: rp
}));
function Qg() {
  return `#${Pe(this.r)}${Pe(this.g)}${Pe(this.b)}`;
}
function MC() {
  return `#${Pe(this.r)}${Pe(this.g)}${Pe(this.b)}${Pe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rp() {
  const r = Es(this.opacity);
  return `${r === 1 ? "rgb(" : "rgba("}${Me(this.r)}, ${Me(this.g)}, ${Me(this.b)}${r === 1 ? ")" : `, ${r})`}`;
}
function Es(r) {
  return isNaN(r) ? 1 : Math.max(0, Math.min(1, r));
}
function Me(r) {
  return Math.max(0, Math.min(255, Math.round(r) || 0));
}
function Pe(r) {
  return r = Me(r), (r < 16 ? "0" : "") + r.toString(16);
}
function tp(r, t, e, n) {
  return n <= 0 ? r = t = e = NaN : e <= 0 || e >= 1 ? r = t = NaN : t <= 0 && (r = NaN), new lt(r, t, e, n);
}
function $S(r) {
  if (r instanceof lt)
    return new lt(r.h, r.s, r.l, r.opacity);
  if (r instanceof He || (r = Fe(r)), !r)
    return new lt();
  if (r instanceof lt)
    return r;
  r = r.rgb();
  var t = r.r / 255, e = r.g / 255, n = r.b / 255, a = Math.min(t, e, n), i = Math.max(t, e, n), o = NaN, s = i - a, u = (i + a) / 2;
  return s ? (t === i ? o = (e - n) / s + (e < n) * 6 : e === i ? o = (n - t) / s + 2 : o = (t - e) / s + 4, s /= u < 0.5 ? i + a : 2 - i - a, o *= 60) : s = u > 0 && u < 1 ? 0 : o, new lt(o, s, u, r.opacity);
}
function Ba(r, t, e, n) {
  return arguments.length === 1 ? $S(r) : new lt(r, t, e, n ?? 1);
}
function lt(r, t, e, n) {
  this.h = +r, this.s = +t, this.l = +e, this.opacity = +n;
}
bi(lt, Ba, cu(He, {
  brighter(r) {
    return r = r == null ? ws : Math.pow(ws, r), new lt(this.h, this.s, this.l * r, this.opacity);
  },
  darker(r) {
    return r = r == null ? ii : Math.pow(ii, r), new lt(this.h, this.s, this.l * r, this.opacity);
  },
  rgb() {
    var r = this.h % 360 + (this.h < 0) * 360, t = isNaN(r) || isNaN(this.s) ? 0 : this.s, e = this.l, n = e + (e < 0.5 ? e : 1 - e) * t, a = 2 * e - n;
    return new Sr(
      yl(r >= 240 ? r - 240 : r + 120, a, n),
      yl(r, a, n),
      yl(r < 120 ? r + 240 : r - 120, a, n),
      this.opacity
    );
  },
  clamp() {
    return new lt(ep(this.h), Qi(this.s), Qi(this.l), Es(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const r = Es(this.opacity);
    return `${r === 1 ? "hsl(" : "hsla("}${ep(this.h)}, ${Qi(this.s) * 100}%, ${Qi(this.l) * 100}%${r === 1 ? ")" : `, ${r})`}`;
  }
}));
function ep(r) {
  return r = (r || 0) % 360, r < 0 ? r + 360 : r;
}
function Qi(r) {
  return Math.max(0, Math.min(1, r || 0));
}
function yl(r, t, e) {
  return (r < 60 ? t + (e - t) * r / 60 : r < 180 ? e : r < 240 ? t + (e - t) * (240 - r) / 60 : t) * 255;
}
const NC = Math.PI / 180, DC = 180 / Math.PI, Ts = 18, yS = 0.96422, mS = 1, bS = 0.82521, wS = 4 / 29, An = 6 / 29, SS = 3 * An * An, LC = An * An * An;
function ES(r) {
  if (r instanceof Ot)
    return new Ot(r.l, r.a, r.b, r.opacity);
  if (r instanceof jt)
    return TS(r);
  r instanceof Sr || (r = pS(r));
  var t = Sl(r.r), e = Sl(r.g), n = Sl(r.b), a = ml((0.2225045 * t + 0.7168786 * e + 0.0606169 * n) / mS), i, o;
  return t === e && e === n ? i = o = a : (i = ml((0.4360747 * t + 0.3850649 * e + 0.1430804 * n) / yS), o = ml((0.0139322 * t + 0.0971045 * e + 0.7141733 * n) / bS)), new Ot(116 * a - 16, 500 * (i - a), 200 * (a - o), r.opacity);
}
function ke(r, t, e, n) {
  return arguments.length === 1 ? ES(r) : new Ot(r, t, e, n ?? 1);
}
function Ot(r, t, e, n) {
  this.l = +r, this.a = +t, this.b = +e, this.opacity = +n;
}
bi(Ot, ke, cu(He, {
  brighter(r) {
    return new Ot(this.l + Ts * (r ?? 1), this.a, this.b, this.opacity);
  },
  darker(r) {
    return new Ot(this.l - Ts * (r ?? 1), this.a, this.b, this.opacity);
  },
  rgb() {
    var r = (this.l + 16) / 116, t = isNaN(this.a) ? r : r + this.a / 500, e = isNaN(this.b) ? r : r - this.b / 200;
    return t = yS * bl(t), r = mS * bl(r), e = bS * bl(e), new Sr(
      wl(3.1338561 * t - 1.6168667 * r - 0.4906146 * e),
      wl(-0.9787684 * t + 1.9161415 * r + 0.033454 * e),
      wl(0.0719453 * t - 0.2289914 * r + 1.4052427 * e),
      this.opacity
    );
  }
}));
function ml(r) {
  return r > LC ? Math.pow(r, 1 / 3) : r / SS + wS;
}
function bl(r) {
  return r > An ? r * r * r : SS * (r - wS);
}
function wl(r) {
  return 255 * (r <= 31308e-7 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055);
}
function Sl(r) {
  return (r /= 255) <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
}
function FC(r) {
  if (r instanceof jt)
    return new jt(r.h, r.c, r.l, r.opacity);
  if (r instanceof Ot || (r = ES(r)), r.a === 0 && r.b === 0)
    return new jt(NaN, 0 < r.l && r.l < 100 ? 0 : NaN, r.l, r.opacity);
  var t = Math.atan2(r.b, r.a) * DC;
  return new jt(t < 0 ? t + 360 : t, Math.sqrt(r.a * r.a + r.b * r.b), r.l, r.opacity);
}
function kC(r, t, e, n) {
  return arguments.length === 1 ? FC(r) : new jt(r, t, e, n ?? 1);
}
function jt(r, t, e, n) {
  this.h = +r, this.c = +t, this.l = +e, this.opacity = +n;
}
function TS(r) {
  if (isNaN(r.h))
    return new Ot(r.l, 0, 0, r.opacity);
  var t = r.h * NC;
  return new Ot(r.l, Math.cos(t) * r.c, Math.sin(t) * r.c, r.opacity);
}
bi(jt, kC, cu(He, {
  brighter(r) {
    return new jt(this.h, this.c, this.l + Ts * (r ?? 1), this.opacity);
  },
  darker(r) {
    return new jt(this.h, this.c, this.l - Ts * (r ?? 1), this.opacity);
  },
  rgb() {
    return TS(this).rgb();
  }
}));
const xh = (r) => () => r;
function BC(r, t) {
  return function(e) {
    return r + e * t;
  };
}
function jC(r, t, e) {
  return r = Math.pow(r, e), t = Math.pow(t, e) - r, e = 1 / e, function(n) {
    return Math.pow(r + n * t, e);
  };
}
function UC(r) {
  return (r = +r) == 1 ? mn : function(t, e) {
    return e - t ? jC(t, e, r) : xh(isNaN(t) ? e : t);
  };
}
function mn(r, t) {
  var e = t - r;
  return e ? BC(r, e) : xh(isNaN(r) ? t : r);
}
const xs = function r(t) {
  var e = UC(t);
  function n(a, i) {
    var o = e((a = Ss(a)).r, (i = Ss(i)).r), s = e(a.g, i.g), u = e(a.b, i.b), l = mn(a.opacity, i.opacity);
    return function(c) {
      return a.r = o(c), a.g = s(c), a.b = u(c), a.opacity = l(c), a + "";
    };
  }
  return n.gamma = r, n;
}(1);
function zC(r, t) {
  t || (t = []);
  var e = r ? Math.min(t.length, r.length) : 0, n = t.slice(), a;
  return function(i) {
    for (a = 0; a < e; ++a)
      n[a] = r[a] * (1 - i) + t[a] * i;
    return n;
  };
}
function VC(r) {
  return ArrayBuffer.isView(r) && !(r instanceof DataView);
}
function HC(r, t) {
  var e = t ? t.length : 0, n = r ? Math.min(e, r.length) : 0, a = new Array(n), i = new Array(e), o;
  for (o = 0; o < n; ++o)
    a[o] = Rn(r[o], t[o]);
  for (; o < e; ++o)
    i[o] = t[o];
  return function(s) {
    for (o = 0; o < n; ++o)
      i[o] = a[o](s);
    return i;
  };
}
function GC(r, t) {
  var e = /* @__PURE__ */ new Date();
  return r = +r, t = +t, function(n) {
    return e.setTime(r * (1 - n) + t * n), e;
  };
}
function st(r, t) {
  return r = +r, t = +t, function(e) {
    return r * (1 - e) + t * e;
  };
}
function WC(r, t) {
  var e = {}, n = {}, a;
  (r === null || typeof r != "object") && (r = {}), (t === null || typeof t != "object") && (t = {});
  for (a in t)
    a in r ? e[a] = Rn(r[a], t[a]) : n[a] = t[a];
  return function(i) {
    for (a in e)
      n[a] = e[a](i);
    return n;
  };
}
var Hf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, El = new RegExp(Hf.source, "g");
function qC(r) {
  return function() {
    return r;
  };
}
function YC(r) {
  return function(t) {
    return r(t) + "";
  };
}
function xS(r, t) {
  var e = Hf.lastIndex = El.lastIndex = 0, n, a, i, o = -1, s = [], u = [];
  for (r = r + "", t = t + ""; (n = Hf.exec(r)) && (a = El.exec(t)); )
    (i = a.index) > e && (i = t.slice(e, i), s[o] ? s[o] += i : s[++o] = i), (n = n[0]) === (a = a[0]) ? s[o] ? s[o] += a : s[++o] = a : (s[++o] = null, u.push({ i: o, x: st(n, a) })), e = El.lastIndex;
  return e < t.length && (i = t.slice(e), s[o] ? s[o] += i : s[++o] = i), s.length < 2 ? u[0] ? YC(u[0].x) : qC(t) : (t = u.length, function(l) {
    for (var c = 0, f; c < t; ++c)
      s[(f = u[c]).i] = f.x(l);
    return s.join("");
  });
}
function Rn(r, t) {
  var e = typeof t, n;
  return t == null || e === "boolean" ? xh(t) : (e === "number" ? st : e === "string" ? (n = Fe(t)) ? (t = n, xs) : xS : t instanceof Fe ? xs : t instanceof Date ? GC : VC(t) ? zC : Array.isArray(t) ? HC : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? WC : st)(r, t);
}
function KC(r, t) {
  return r = +r, t = +t, function(e) {
    return Math.round(r * (1 - e) + t * e);
  };
}
var np = 180 / Math.PI, Gf = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function IS(r, t, e, n, a, i) {
  var o, s, u;
  return (o = Math.sqrt(r * r + t * t)) && (r /= o, t /= o), (u = r * e + t * n) && (e -= r * u, n -= t * u), (s = Math.sqrt(e * e + n * n)) && (e /= s, n /= s, u /= s), r * n < t * e && (r = -r, t = -t, u = -u, o = -o), {
    translateX: a,
    translateY: i,
    rotate: Math.atan2(t, r) * np,
    skewX: Math.atan(u) * np,
    scaleX: o,
    scaleY: s
  };
}
var ro;
function XC(r) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(r + "");
  return t.isIdentity ? Gf : IS(t.a, t.b, t.c, t.d, t.e, t.f);
}
function JC(r) {
  return r == null || (ro || (ro = document.createElementNS("http://www.w3.org/2000/svg", "g")), ro.setAttribute("transform", r), !(r = ro.transform.baseVal.consolidate())) ? Gf : (r = r.matrix, IS(r.a, r.b, r.c, r.d, r.e, r.f));
}
function OS(r, t, e, n) {
  function a(l) {
    return l.length ? l.pop() + " " : "";
  }
  function i(l, c, f, v, h, g) {
    if (l !== f || c !== v) {
      var $ = h.push("translate(", null, t, null, e);
      g.push({ i: $ - 4, x: st(l, f) }, { i: $ - 2, x: st(c, v) });
    } else
      (f || v) && h.push("translate(" + f + t + v + e);
  }
  function o(l, c, f, v) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), v.push({ i: f.push(a(f) + "rotate(", null, n) - 2, x: st(l, c) })) : c && f.push(a(f) + "rotate(" + c + n);
  }
  function s(l, c, f, v) {
    l !== c ? v.push({ i: f.push(a(f) + "skewX(", null, n) - 2, x: st(l, c) }) : c && f.push(a(f) + "skewX(" + c + n);
  }
  function u(l, c, f, v, h, g) {
    if (l !== f || c !== v) {
      var $ = h.push(a(h) + "scale(", null, ",", null, ")");
      g.push({ i: $ - 4, x: st(l, f) }, { i: $ - 2, x: st(c, v) });
    } else
      (f !== 1 || v !== 1) && h.push(a(h) + "scale(" + f + "," + v + ")");
  }
  return function(l, c) {
    var f = [], v = [];
    return l = r(l), c = r(c), i(l.translateX, l.translateY, c.translateX, c.translateY, f, v), o(l.rotate, c.rotate, f, v), s(l.skewX, c.skewX, f, v), u(l.scaleX, l.scaleY, c.scaleX, c.scaleY, f, v), l = c = null, function(h) {
      for (var g = -1, $ = v.length, y; ++g < $; )
        f[(y = v[g]).i] = y.x(h);
      return f.join("");
    };
  };
}
var ZC = OS(XC, "px, ", "px)", "deg)"), QC = OS(JC, ", ", ")", ")"), r2 = 1e-12;
function ap(r) {
  return ((r = Math.exp(r)) + 1 / r) / 2;
}
function t2(r) {
  return ((r = Math.exp(r)) - 1 / r) / 2;
}
function e2(r) {
  return ((r = Math.exp(2 * r)) - 1) / (r + 1);
}
const n2 = function r(t, e, n) {
  function a(i, o) {
    var s = i[0], u = i[1], l = i[2], c = o[0], f = o[1], v = o[2], h = c - s, g = f - u, $ = h * h + g * g, y, p;
    if ($ < r2)
      p = Math.log(v / l) / t, y = function(X) {
        return [
          s + X * h,
          u + X * g,
          l * Math.exp(t * X * p)
        ];
      };
    else {
      var S = Math.sqrt($), I = (v * v - l * l + n * $) / (2 * l * e * S), A = (v * v - l * l - n * $) / (2 * v * e * S), N = Math.log(Math.sqrt(I * I + 1) - I), z = Math.log(Math.sqrt(A * A + 1) - A);
      p = (z - N) / t, y = function(X) {
        var Q = X * p, lr = ap(N), fr = l / (e * S) * (lr * e2(t * Q + N) - t2(N));
        return [
          s + fr * h,
          u + fr * g,
          l * lr / ap(t * Q + N)
        ];
      };
    }
    return y.duration = p * 1e3 * t / Math.SQRT2, y;
  }
  return a.rho = function(i) {
    var o = Math.max(1e-3, +i), s = o * o, u = s * s;
    return r(o, s, u);
  }, a;
}(Math.SQRT2, 2, 4);
function Ih(r, t) {
  var e = mn((r = ke(r)).l, (t = ke(t)).l), n = mn(r.a, t.a), a = mn(r.b, t.b), i = mn(r.opacity, t.opacity);
  return function(o) {
    return r.l = e(o), r.a = n(o), r.b = a(o), r.opacity = i(o), r + "";
  };
}
var Bn = 0, ja = 0, ma = 0, AS = 1e3, Is, Ua, Os = 0, Be = 0, fu = 0, si = typeof performance == "object" && performance.now ? performance : Date, RS = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(r) {
  setTimeout(r, 17);
};
function Oh() {
  return Be || (RS(a2), Be = si.now() + fu);
}
function a2() {
  Be = 0;
}
function As() {
  this._call = this._time = this._next = null;
}
As.prototype = _S.prototype = {
  constructor: As,
  restart: function(r, t, e) {
    if (typeof r != "function")
      throw new TypeError("callback is not a function");
    e = (e == null ? Oh() : +e) + (t == null ? 0 : +t), !this._next && Ua !== this && (Ua ? Ua._next = this : Is = this, Ua = this), this._call = r, this._time = e, Wf();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Wf());
  }
};
function _S(r, t, e) {
  var n = new As();
  return n.restart(r, t, e), n;
}
function i2() {
  Oh(), ++Bn;
  for (var r = Is, t; r; )
    (t = Be - r._time) >= 0 && r._call.call(void 0, t), r = r._next;
  --Bn;
}
function ip() {
  Be = (Os = si.now()) + fu, Bn = ja = 0;
  try {
    i2();
  } finally {
    Bn = 0, s2(), Be = 0;
  }
}
function o2() {
  var r = si.now(), t = r - Os;
  t > AS && (fu -= t, Os = r);
}
function s2() {
  for (var r, t = Is, e, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), r = t, t = t._next) : (e = t._next, t._next = null, t = r ? r._next = e : Is = e);
  Ua = r, Wf(n);
}
function Wf(r) {
  if (!Bn) {
    ja && (ja = clearTimeout(ja));
    var t = r - Be;
    t > 24 ? (r < 1 / 0 && (ja = setTimeout(ip, r - si.now() - fu)), ma && (ma = clearInterval(ma))) : (ma || (Os = si.now(), ma = setInterval(o2, AS)), Bn = 1, RS(ip));
  }
}
function op(r, t, e) {
  var n = new As();
  return t = t == null ? 0 : +t, n.restart((a) => {
    n.stop(), r(a + t);
  }, t, e), n;
}
var u2 = Sh("start", "end", "cancel", "interrupt"), l2 = [], CS = 0, sp = 1, qf = 2, Zo = 3, up = 4, Yf = 5, Qo = 6;
function vu(r, t, e, n, a, i) {
  var o = r.__transition;
  if (!o)
    r.__transition = {};
  else if (e in o)
    return;
  c2(r, e, {
    name: t,
    index: n,
    // For context during callback.
    group: a,
    // For context during callback.
    on: u2,
    tween: l2,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: CS
  });
}
function Ah(r, t) {
  var e = ht(r, t);
  if (e.state > CS)
    throw new Error("too late; already scheduled");
  return e;
}
function Rt(r, t) {
  var e = ht(r, t);
  if (e.state > Zo)
    throw new Error("too late; already running");
  return e;
}
function ht(r, t) {
  var e = r.__transition;
  if (!e || !(e = e[t]))
    throw new Error("transition not found");
  return e;
}
function c2(r, t, e) {
  var n = r.__transition, a;
  n[t] = e, e.timer = _S(i, 0, e.time);
  function i(l) {
    e.state = sp, e.timer.restart(o, e.delay, e.time), e.delay <= l && o(l - e.delay);
  }
  function o(l) {
    var c, f, v, h;
    if (e.state !== sp)
      return u();
    for (c in n)
      if (h = n[c], h.name === e.name) {
        if (h.state === Zo)
          return op(o);
        h.state === up ? (h.state = Qo, h.timer.stop(), h.on.call("interrupt", r, r.__data__, h.index, h.group), delete n[c]) : +c < t && (h.state = Qo, h.timer.stop(), h.on.call("cancel", r, r.__data__, h.index, h.group), delete n[c]);
      }
    if (op(function() {
      e.state === Zo && (e.state = up, e.timer.restart(s, e.delay, e.time), s(l));
    }), e.state = qf, e.on.call("start", r, r.__data__, e.index, e.group), e.state === qf) {
      for (e.state = Zo, a = new Array(v = e.tween.length), c = 0, f = -1; c < v; ++c)
        (h = e.tween[c].value.call(r, r.__data__, e.index, e.group)) && (a[++f] = h);
      a.length = f + 1;
    }
  }
  function s(l) {
    for (var c = l < e.duration ? e.ease.call(null, l / e.duration) : (e.timer.restart(u), e.state = Yf, 1), f = -1, v = a.length; ++f < v; )
      a[f].call(r, c);
    e.state === Yf && (e.on.call("end", r, r.__data__, e.index, e.group), u());
  }
  function u() {
    e.state = Qo, e.timer.stop(), delete n[t];
    for (var l in n)
      return;
    delete r.__transition;
  }
}
function rs(r, t) {
  var e = r.__transition, n, a, i = !0, o;
  if (e) {
    t = t == null ? null : t + "";
    for (o in e) {
      if ((n = e[o]).name !== t) {
        i = !1;
        continue;
      }
      a = n.state > qf && n.state < Yf, n.state = Qo, n.timer.stop(), n.on.call(a ? "interrupt" : "cancel", r, r.__data__, n.index, n.group), delete e[o];
    }
    i && delete r.__transition;
  }
}
function f2(r) {
  return this.each(function() {
    rs(this, r);
  });
}
function v2(r, t) {
  var e, n;
  return function() {
    var a = Rt(this, r), i = a.tween;
    if (i !== e) {
      n = e = i;
      for (var o = 0, s = n.length; o < s; ++o)
        if (n[o].name === t) {
          n = n.slice(), n.splice(o, 1);
          break;
        }
    }
    a.tween = n;
  };
}
function h2(r, t, e) {
  var n, a;
  if (typeof e != "function")
    throw new Error();
  return function() {
    var i = Rt(this, r), o = i.tween;
    if (o !== n) {
      a = (n = o).slice();
      for (var s = { name: t, value: e }, u = 0, l = a.length; u < l; ++u)
        if (a[u].name === t) {
          a[u] = s;
          break;
        }
      u === l && a.push(s);
    }
    i.tween = a;
  };
}
function d2(r, t) {
  var e = this._id;
  if (r += "", arguments.length < 2) {
    for (var n = ht(this.node(), e).tween, a = 0, i = n.length, o; a < i; ++a)
      if ((o = n[a]).name === r)
        return o.value;
    return null;
  }
  return this.each((t == null ? v2 : h2)(e, r, t));
}
function Rh(r, t, e) {
  var n = r._id;
  return r.each(function() {
    var a = Rt(this, n);
    (a.value || (a.value = {}))[t] = e.apply(this, arguments);
  }), function(a) {
    return ht(a, n).value[t];
  };
}
function PS(r, t) {
  var e;
  return (typeof t == "number" ? st : t instanceof Fe ? xs : (e = Fe(t)) ? (t = e, xs) : xS)(r, t);
}
function g2(r) {
  return function() {
    this.removeAttribute(r);
  };
}
function p2(r) {
  return function() {
    this.removeAttributeNS(r.space, r.local);
  };
}
function $2(r, t, e) {
  var n, a = e + "", i;
  return function() {
    var o = this.getAttribute(r);
    return o === a ? null : o === n ? i : i = t(n = o, e);
  };
}
function y2(r, t, e) {
  var n, a = e + "", i;
  return function() {
    var o = this.getAttributeNS(r.space, r.local);
    return o === a ? null : o === n ? i : i = t(n = o, e);
  };
}
function m2(r, t, e) {
  var n, a, i;
  return function() {
    var o, s = e(this), u;
    return s == null ? void this.removeAttribute(r) : (o = this.getAttribute(r), u = s + "", o === u ? null : o === n && u === a ? i : (a = u, i = t(n = o, s)));
  };
}
function b2(r, t, e) {
  var n, a, i;
  return function() {
    var o, s = e(this), u;
    return s == null ? void this.removeAttributeNS(r.space, r.local) : (o = this.getAttributeNS(r.space, r.local), u = s + "", o === u ? null : o === n && u === a ? i : (a = u, i = t(n = o, s)));
  };
}
function w2(r, t) {
  var e = lu(r), n = e === "transform" ? QC : PS;
  return this.attrTween(r, typeof t == "function" ? (e.local ? b2 : m2)(e, n, Rh(this, "attr." + r, t)) : t == null ? (e.local ? p2 : g2)(e) : (e.local ? y2 : $2)(e, n, t));
}
function S2(r, t) {
  return function(e) {
    this.setAttribute(r, t.call(this, e));
  };
}
function E2(r, t) {
  return function(e) {
    this.setAttributeNS(r.space, r.local, t.call(this, e));
  };
}
function T2(r, t) {
  var e, n;
  function a() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && E2(r, i)), e;
  }
  return a._value = t, a;
}
function x2(r, t) {
  var e, n;
  function a() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && S2(r, i)), e;
  }
  return a._value = t, a;
}
function I2(r, t) {
  var e = "attr." + r;
  if (arguments.length < 2)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  var n = lu(r);
  return this.tween(e, (n.local ? T2 : x2)(n, t));
}
function O2(r, t) {
  return function() {
    Ah(this, r).delay = +t.apply(this, arguments);
  };
}
function A2(r, t) {
  return t = +t, function() {
    Ah(this, r).delay = t;
  };
}
function R2(r) {
  var t = this._id;
  return arguments.length ? this.each((typeof r == "function" ? O2 : A2)(t, r)) : ht(this.node(), t).delay;
}
function _2(r, t) {
  return function() {
    Rt(this, r).duration = +t.apply(this, arguments);
  };
}
function C2(r, t) {
  return t = +t, function() {
    Rt(this, r).duration = t;
  };
}
function P2(r) {
  var t = this._id;
  return arguments.length ? this.each((typeof r == "function" ? _2 : C2)(t, r)) : ht(this.node(), t).duration;
}
function M2(r, t) {
  if (typeof t != "function")
    throw new Error();
  return function() {
    Rt(this, r).ease = t;
  };
}
function N2(r) {
  var t = this._id;
  return arguments.length ? this.each(M2(t, r)) : ht(this.node(), t).ease;
}
function D2(r, t) {
  return function() {
    var e = t.apply(this, arguments);
    if (typeof e != "function")
      throw new Error();
    Rt(this, r).ease = e;
  };
}
function L2(r) {
  if (typeof r != "function")
    throw new Error();
  return this.each(D2(this._id, r));
}
function F2(r) {
  typeof r != "function" && (r = oS(r));
  for (var t = this._groups, e = t.length, n = new Array(e), a = 0; a < e; ++a)
    for (var i = t[a], o = i.length, s = n[a] = [], u, l = 0; l < o; ++l)
      (u = i[l]) && r.call(u, u.__data__, l, i) && s.push(u);
  return new Vt(n, this._parents, this._name, this._id);
}
function k2(r) {
  if (r._id !== this._id)
    throw new Error();
  for (var t = this._groups, e = r._groups, n = t.length, a = e.length, i = Math.min(n, a), o = new Array(n), s = 0; s < i; ++s)
    for (var u = t[s], l = e[s], c = u.length, f = o[s] = new Array(c), v, h = 0; h < c; ++h)
      (v = u[h] || l[h]) && (f[h] = v);
  for (; s < n; ++s)
    o[s] = t[s];
  return new Vt(o, this._parents, this._name, this._id);
}
function B2(r) {
  return (r + "").trim().split(/^|\s+/).every(function(t) {
    var e = t.indexOf(".");
    return e >= 0 && (t = t.slice(0, e)), !t || t === "start";
  });
}
function j2(r, t, e) {
  var n, a, i = B2(t) ? Ah : Rt;
  return function() {
    var o = i(this, r), s = o.on;
    s !== n && (a = (n = s).copy()).on(t, e), o.on = a;
  };
}
function U2(r, t) {
  var e = this._id;
  return arguments.length < 2 ? ht(this.node(), e).on.on(r) : this.each(j2(e, r, t));
}
function z2(r) {
  return function() {
    var t = this.parentNode;
    for (var e in this.__transition)
      if (+e !== r)
        return;
    t && t.removeChild(this);
  };
}
function V2() {
  return this.on("end.remove", z2(this._id));
}
function H2(r) {
  var t = this._name, e = this._id;
  typeof r != "function" && (r = Eh(r));
  for (var n = this._groups, a = n.length, i = new Array(a), o = 0; o < a; ++o)
    for (var s = n[o], u = s.length, l = i[o] = new Array(u), c, f, v = 0; v < u; ++v)
      (c = s[v]) && (f = r.call(c, c.__data__, v, s)) && ("__data__" in c && (f.__data__ = c.__data__), l[v] = f, vu(l[v], t, e, v, l, ht(c, e)));
  return new Vt(i, this._parents, t, e);
}
function G2(r) {
  var t = this._name, e = this._id;
  typeof r != "function" && (r = iS(r));
  for (var n = this._groups, a = n.length, i = [], o = [], s = 0; s < a; ++s)
    for (var u = n[s], l = u.length, c, f = 0; f < l; ++f)
      if (c = u[f]) {
        for (var v = r.call(c, c.__data__, f, u), h, g = ht(c, e), $ = 0, y = v.length; $ < y; ++$)
          (h = v[$]) && vu(h, t, e, $, v, g);
        i.push(v), o.push(c);
      }
  return new Vt(i, o, t, e);
}
var W2 = mi.prototype.constructor;
function q2() {
  return new W2(this._groups, this._parents);
}
function Y2(r, t) {
  var e, n, a;
  return function() {
    var i = kn(this, r), o = (this.style.removeProperty(r), kn(this, r));
    return i === o ? null : i === e && o === n ? a : a = t(e = i, n = o);
  };
}
function MS(r) {
  return function() {
    this.style.removeProperty(r);
  };
}
function K2(r, t, e) {
  var n, a = e + "", i;
  return function() {
    var o = kn(this, r);
    return o === a ? null : o === n ? i : i = t(n = o, e);
  };
}
function X2(r, t, e) {
  var n, a, i;
  return function() {
    var o = kn(this, r), s = e(this), u = s + "";
    return s == null && (u = s = (this.style.removeProperty(r), kn(this, r))), o === u ? null : o === n && u === a ? i : (a = u, i = t(n = o, s));
  };
}
function J2(r, t) {
  var e, n, a, i = "style." + t, o = "end." + i, s;
  return function() {
    var u = Rt(this, r), l = u.on, c = u.value[i] == null ? s || (s = MS(t)) : void 0;
    (l !== e || a !== c) && (n = (e = l).copy()).on(o, a = c), u.on = n;
  };
}
function Z2(r, t, e) {
  var n = (r += "") == "transform" ? ZC : PS;
  return t == null ? this.styleTween(r, Y2(r, n)).on("end.style." + r, MS(r)) : typeof t == "function" ? this.styleTween(r, X2(r, n, Rh(this, "style." + r, t))).each(J2(this._id, r)) : this.styleTween(r, K2(r, n, t), e).on("end.style." + r, null);
}
function Q2(r, t, e) {
  return function(n) {
    this.style.setProperty(r, t.call(this, n), e);
  };
}
function rP(r, t, e) {
  var n, a;
  function i() {
    var o = t.apply(this, arguments);
    return o !== a && (n = (a = o) && Q2(r, o, e)), n;
  }
  return i._value = t, i;
}
function tP(r, t, e) {
  var n = "style." + (r += "");
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(n, rP(r, t, e ?? ""));
}
function eP(r) {
  return function() {
    this.textContent = r;
  };
}
function nP(r) {
  return function() {
    var t = r(this);
    this.textContent = t ?? "";
  };
}
function aP(r) {
  return this.tween("text", typeof r == "function" ? nP(Rh(this, "text", r)) : eP(r == null ? "" : r + ""));
}
function iP(r) {
  return function(t) {
    this.textContent = r.call(this, t);
  };
}
function oP(r) {
  var t, e;
  function n() {
    var a = r.apply(this, arguments);
    return a !== e && (t = (e = a) && iP(a)), t;
  }
  return n._value = r, n;
}
function sP(r) {
  var t = "text";
  if (arguments.length < 1)
    return (t = this.tween(t)) && t._value;
  if (r == null)
    return this.tween(t, null);
  if (typeof r != "function")
    throw new Error();
  return this.tween(t, oP(r));
}
function uP() {
  for (var r = this._name, t = this._id, e = NS(), n = this._groups, a = n.length, i = 0; i < a; ++i)
    for (var o = n[i], s = o.length, u, l = 0; l < s; ++l)
      if (u = o[l]) {
        var c = ht(u, t);
        vu(u, r, e, l, o, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Vt(n, this._parents, r, e);
}
function lP() {
  var r, t, e = this, n = e._id, a = e.size();
  return new Promise(function(i, o) {
    var s = { value: o }, u = { value: function() {
      --a === 0 && i();
    } };
    e.each(function() {
      var l = Rt(this, n), c = l.on;
      c !== r && (t = (r = c).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(u)), l.on = t;
    }), a === 0 && i();
  });
}
var cP = 0;
function Vt(r, t, e, n) {
  this._groups = r, this._parents = t, this._name = e, this._id = n;
}
function NS() {
  return ++cP;
}
var Dt = mi.prototype;
Vt.prototype = {
  constructor: Vt,
  select: H2,
  selectAll: G2,
  selectChild: Dt.selectChild,
  selectChildren: Dt.selectChildren,
  filter: F2,
  merge: k2,
  selection: q2,
  transition: uP,
  call: Dt.call,
  nodes: Dt.nodes,
  node: Dt.node,
  size: Dt.size,
  empty: Dt.empty,
  each: Dt.each,
  on: U2,
  attr: w2,
  attrTween: I2,
  style: Z2,
  styleTween: tP,
  text: aP,
  textTween: sP,
  remove: V2,
  tween: d2,
  delay: R2,
  duration: P2,
  ease: N2,
  easeVarying: L2,
  end: lP,
  [Symbol.iterator]: Dt[Symbol.iterator]
};
function fP(r) {
  return ((r *= 2) <= 1 ? r * r * r : (r -= 2) * r * r + 2) / 2;
}
var vP = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: fP
};
function hP(r, t) {
  for (var e; !(e = r.__transition) || !(e = e[t]); )
    if (!(r = r.parentNode))
      throw new Error(`transition ${t} not found`);
  return e;
}
function dP(r) {
  var t, e;
  r instanceof Vt ? (t = r._id, r = r._name) : (t = NS(), (e = vP).time = Oh(), r = r == null ? null : r + "");
  for (var n = this._groups, a = n.length, i = 0; i < a; ++i)
    for (var o = n[i], s = o.length, u, l = 0; l < s; ++l)
      (u = o[l]) && vu(u, r, t, l, o, e || hP(u, t));
  return new Vt(n, this._parents, r, t);
}
mi.prototype.interrupt = f2;
mi.prototype.transition = dP;
const Kf = Math.PI, Xf = 2 * Kf, _e = 1e-6, gP = Xf - _e;
function DS(r) {
  this._ += r[0];
  for (let t = 1, e = r.length; t < e; ++t)
    this._ += arguments[t] + r[t];
}
function pP(r) {
  let t = Math.floor(r);
  if (!(t >= 0))
    throw new Error(`invalid digits: ${r}`);
  if (t > 15)
    return DS;
  const e = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let a = 1, i = n.length; a < i; ++a)
      this._ += Math.round(arguments[a] * e) / e + n[a];
  };
}
class $P {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? DS : pP(t);
  }
  moveTo(t, e) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +e}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, e) {
    this._append`L${this._x1 = +t},${this._y1 = +e}`;
  }
  quadraticCurveTo(t, e, n, a) {
    this._append`Q${+t},${+e},${this._x1 = +n},${this._y1 = +a}`;
  }
  bezierCurveTo(t, e, n, a, i, o) {
    this._append`C${+t},${+e},${+n},${+a},${this._x1 = +i},${this._y1 = +o}`;
  }
  arcTo(t, e, n, a, i) {
    if (t = +t, e = +e, n = +n, a = +a, i = +i, i < 0)
      throw new Error(`negative radius: ${i}`);
    let o = this._x1, s = this._y1, u = n - t, l = a - e, c = o - t, f = s - e, v = c * c + f * f;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = e}`;
    else if (v > _e)
      if (!(Math.abs(f * u - l * c) > _e) || !i)
        this._append`L${this._x1 = t},${this._y1 = e}`;
      else {
        let h = n - o, g = a - s, $ = u * u + l * l, y = h * h + g * g, p = Math.sqrt($), S = Math.sqrt(v), I = i * Math.tan((Kf - Math.acos(($ + v - y) / (2 * p * S))) / 2), A = I / S, N = I / p;
        Math.abs(A - 1) > _e && this._append`L${t + A * c},${e + A * f}`, this._append`A${i},${i},0,0,${+(f * h > c * g)},${this._x1 = t + N * u},${this._y1 = e + N * l}`;
      }
  }
  arc(t, e, n, a, i, o) {
    if (t = +t, e = +e, n = +n, o = !!o, n < 0)
      throw new Error(`negative radius: ${n}`);
    let s = n * Math.cos(a), u = n * Math.sin(a), l = t + s, c = e + u, f = 1 ^ o, v = o ? a - i : i - a;
    this._x1 === null ? this._append`M${l},${c}` : (Math.abs(this._x1 - l) > _e || Math.abs(this._y1 - c) > _e) && this._append`L${l},${c}`, n && (v < 0 && (v = v % Xf + Xf), v > gP ? this._append`A${n},${n},0,1,${f},${t - s},${e - u}A${n},${n},0,1,${f},${this._x1 = l},${this._y1 = c}` : v > _e && this._append`A${n},${n},0,${+(v >= Kf)},${f},${this._x1 = t + n * Math.cos(i)},${this._y1 = e + n * Math.sin(i)}`);
  }
  rect(t, e, n, a) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +e}h${n = +n}v${+a}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function yP(r) {
  return Math.abs(r = Math.round(r)) >= 1e21 ? r.toLocaleString("en").replace(/,/g, "") : r.toString(10);
}
function Rs(r, t) {
  if ((e = (r = t ? r.toExponential(t - 1) : r.toExponential()).indexOf("e")) < 0)
    return null;
  var e, n = r.slice(0, e);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +r.slice(e + 1)
  ];
}
function jn(r) {
  return r = Rs(Math.abs(r)), r ? r[1] : NaN;
}
function mP(r, t) {
  return function(e, n) {
    for (var a = e.length, i = [], o = 0, s = r[0], u = 0; a > 0 && s > 0 && (u + s + 1 > n && (s = Math.max(1, n - u)), i.push(e.substring(a -= s, a + s)), !((u += s + 1) > n)); )
      s = r[o = (o + 1) % r.length];
    return i.reverse().join(t);
  };
}
function bP(r) {
  return function(t) {
    return t.replace(/[0-9]/g, function(e) {
      return r[+e];
    });
  };
}
var wP = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function _s(r) {
  if (!(t = wP.exec(r)))
    throw new Error("invalid format: " + r);
  var t;
  return new _h({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  });
}
_s.prototype = _h.prototype;
function _h(r) {
  this.fill = r.fill === void 0 ? " " : r.fill + "", this.align = r.align === void 0 ? ">" : r.align + "", this.sign = r.sign === void 0 ? "-" : r.sign + "", this.symbol = r.symbol === void 0 ? "" : r.symbol + "", this.zero = !!r.zero, this.width = r.width === void 0 ? void 0 : +r.width, this.comma = !!r.comma, this.precision = r.precision === void 0 ? void 0 : +r.precision, this.trim = !!r.trim, this.type = r.type === void 0 ? "" : r.type + "";
}
_h.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function SP(r) {
  r:
    for (var t = r.length, e = 1, n = -1, a; e < t; ++e)
      switch (r[e]) {
        case ".":
          n = a = e;
          break;
        case "0":
          n === 0 && (n = e), a = e;
          break;
        default:
          if (!+r[e])
            break r;
          n > 0 && (n = 0);
          break;
      }
  return n > 0 ? r.slice(0, n) + r.slice(a + 1) : r;
}
var LS;
function EP(r, t) {
  var e = Rs(r, t);
  if (!e)
    return r + "";
  var n = e[0], a = e[1], i = a - (LS = Math.max(-8, Math.min(8, Math.floor(a / 3))) * 3) + 1, o = n.length;
  return i === o ? n : i > o ? n + new Array(i - o + 1).join("0") : i > 0 ? n.slice(0, i) + "." + n.slice(i) : "0." + new Array(1 - i).join("0") + Rs(r, Math.max(0, t + i - 1))[0];
}
function lp(r, t) {
  var e = Rs(r, t);
  if (!e)
    return r + "";
  var n = e[0], a = e[1];
  return a < 0 ? "0." + new Array(-a).join("0") + n : n.length > a + 1 ? n.slice(0, a + 1) + "." + n.slice(a + 1) : n + new Array(a - n.length + 2).join("0");
}
const cp = {
  "%": (r, t) => (r * 100).toFixed(t),
  b: (r) => Math.round(r).toString(2),
  c: (r) => r + "",
  d: yP,
  e: (r, t) => r.toExponential(t),
  f: (r, t) => r.toFixed(t),
  g: (r, t) => r.toPrecision(t),
  o: (r) => Math.round(r).toString(8),
  p: (r, t) => lp(r * 100, t),
  r: lp,
  s: EP,
  X: (r) => Math.round(r).toString(16).toUpperCase(),
  x: (r) => Math.round(r).toString(16)
};
function fp(r) {
  return r;
}
var vp = Array.prototype.map, hp = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function TP(r) {
  var t = r.grouping === void 0 || r.thousands === void 0 ? fp : mP(vp.call(r.grouping, Number), r.thousands + ""), e = r.currency === void 0 ? "" : r.currency[0] + "", n = r.currency === void 0 ? "" : r.currency[1] + "", a = r.decimal === void 0 ? "." : r.decimal + "", i = r.numerals === void 0 ? fp : bP(vp.call(r.numerals, String)), o = r.percent === void 0 ? "%" : r.percent + "", s = r.minus === void 0 ? "−" : r.minus + "", u = r.nan === void 0 ? "NaN" : r.nan + "";
  function l(f) {
    f = _s(f);
    var v = f.fill, h = f.align, g = f.sign, $ = f.symbol, y = f.zero, p = f.width, S = f.comma, I = f.precision, A = f.trim, N = f.type;
    N === "n" ? (S = !0, N = "g") : cp[N] || (I === void 0 && (I = 12), A = !0, N = "g"), (y || v === "0" && h === "=") && (y = !0, v = "0", h = "=");
    var z = $ === "$" ? e : $ === "#" && /[boxX]/.test(N) ? "0" + N.toLowerCase() : "", X = $ === "$" ? n : /[%p]/.test(N) ? o : "", Q = cp[N], lr = /[defgprs%]/.test(N);
    I = I === void 0 ? 6 : /[gprs]/.test(N) ? Math.max(1, Math.min(21, I)) : Math.max(0, Math.min(20, I));
    function fr(F) {
      var ir = z, D = X, m, R, T;
      if (N === "c")
        D = Q(F) + D, F = "";
      else {
        F = +F;
        var C = F < 0 || 1 / F < 0;
        if (F = isNaN(F) ? u : Q(Math.abs(F), I), A && (F = SP(F)), C && +F == 0 && g !== "+" && (C = !1), ir = (C ? g === "(" ? g : s : g === "-" || g === "(" ? "" : g) + ir, D = (N === "s" ? hp[8 + LS / 3] : "") + D + (C && g === "(" ? ")" : ""), lr) {
          for (m = -1, R = F.length; ++m < R; )
            if (T = F.charCodeAt(m), 48 > T || T > 57) {
              D = (T === 46 ? a + F.slice(m + 1) : F.slice(m)) + D, F = F.slice(0, m);
              break;
            }
        }
      }
      S && !y && (F = t(F, 1 / 0));
      var L = ir.length + F.length + D.length, b = L < p ? new Array(p - L + 1).join(v) : "";
      switch (S && y && (F = t(b + F, b.length ? p - D.length : 1 / 0), b = ""), h) {
        case "<":
          F = ir + F + D + b;
          break;
        case "=":
          F = ir + b + F + D;
          break;
        case "^":
          F = b.slice(0, L = b.length >> 1) + ir + F + D + b.slice(L);
          break;
        default:
          F = b + ir + F + D;
          break;
      }
      return i(F);
    }
    return fr.toString = function() {
      return f + "";
    }, fr;
  }
  function c(f, v) {
    var h = l((f = _s(f), f.type = "f", f)), g = Math.max(-8, Math.min(8, Math.floor(jn(v) / 3))) * 3, $ = Math.pow(10, -g), y = hp[8 + g / 3];
    return function(p) {
      return h($ * p) + y;
    };
  }
  return {
    format: l,
    formatPrefix: c
  };
}
var to, FS, kS;
xP({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function xP(r) {
  return to = TP(r), FS = to.format, kS = to.formatPrefix, to;
}
function IP(r) {
  return Math.max(0, -jn(Math.abs(r)));
}
function OP(r, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(jn(t) / 3))) * 3 - jn(Math.abs(r)));
}
function AP(r, t) {
  return r = Math.abs(r), t = Math.abs(t) - r, Math.max(0, jn(t) - jn(r)) + 1;
}
function RP(r) {
  var t = 0, e = r.children, n = e && e.length;
  if (!n)
    t = 1;
  else
    for (; --n >= 0; )
      t += e[n].value;
  r.value = t;
}
function _P() {
  return this.eachAfter(RP);
}
function CP(r, t) {
  let e = -1;
  for (const n of this)
    r.call(t, n, ++e, this);
  return this;
}
function PP(r, t) {
  for (var e = this, n = [e], a, i, o = -1; e = n.pop(); )
    if (r.call(t, e, ++o, this), a = e.children)
      for (i = a.length - 1; i >= 0; --i)
        n.push(a[i]);
  return this;
}
function MP(r, t) {
  for (var e = this, n = [e], a = [], i, o, s, u = -1; e = n.pop(); )
    if (a.push(e), i = e.children)
      for (o = 0, s = i.length; o < s; ++o)
        n.push(i[o]);
  for (; e = a.pop(); )
    r.call(t, e, ++u, this);
  return this;
}
function NP(r, t) {
  let e = -1;
  for (const n of this)
    if (r.call(t, n, ++e, this))
      return n;
}
function DP(r) {
  return this.eachAfter(function(t) {
    for (var e = +r(t.data) || 0, n = t.children, a = n && n.length; --a >= 0; )
      e += n[a].value;
    t.value = e;
  });
}
function LP(r) {
  return this.eachBefore(function(t) {
    t.children && t.children.sort(r);
  });
}
function FP(r) {
  for (var t = this, e = kP(t, r), n = [t]; t !== e; )
    t = t.parent, n.push(t);
  for (var a = n.length; r !== e; )
    n.splice(a, 0, r), r = r.parent;
  return n;
}
function kP(r, t) {
  if (r === t)
    return r;
  var e = r.ancestors(), n = t.ancestors(), a = null;
  for (r = e.pop(), t = n.pop(); r === t; )
    a = r, r = e.pop(), t = n.pop();
  return a;
}
function BP() {
  for (var r = this, t = [r]; r = r.parent; )
    t.push(r);
  return t;
}
function jP() {
  return Array.from(this);
}
function UP() {
  var r = [];
  return this.eachBefore(function(t) {
    t.children || r.push(t);
  }), r;
}
function zP() {
  var r = this, t = [];
  return r.each(function(e) {
    e !== r && t.push({ source: e.parent, target: e });
  }), t;
}
function* VP() {
  var r = this, t, e = [r], n, a, i;
  do
    for (t = e.reverse(), e = []; r = t.pop(); )
      if (yield r, n = r.children)
        for (a = 0, i = n.length; a < i; ++a)
          e.push(n[a]);
  while (e.length);
}
function Un(r, t) {
  r instanceof Map ? (r = [void 0, r], t === void 0 && (t = WP)) : t === void 0 && (t = GP);
  for (var e = new ui(r), n, a = [e], i, o, s, u; n = a.pop(); )
    if ((o = t(n.data)) && (u = (o = Array.from(o)).length))
      for (n.children = o, s = u - 1; s >= 0; --s)
        a.push(i = o[s] = new ui(o[s])), i.parent = n, i.depth = n.depth + 1;
  return e.eachBefore(YP);
}
function HP() {
  return Un(this).eachBefore(qP);
}
function GP(r) {
  return r.children;
}
function WP(r) {
  return Array.isArray(r) ? r[1] : null;
}
function qP(r) {
  r.data.value !== void 0 && (r.value = r.data.value), r.data = r.data.data;
}
function YP(r) {
  var t = 0;
  do
    r.height = t;
  while ((r = r.parent) && r.height < ++t);
}
function ui(r) {
  this.data = r, this.depth = this.height = 0, this.parent = null;
}
ui.prototype = Un.prototype = {
  constructor: ui,
  count: _P,
  each: CP,
  eachAfter: MP,
  eachBefore: PP,
  find: NP,
  sum: DP,
  sort: LP,
  path: FP,
  ancestors: BP,
  descendants: jP,
  leaves: UP,
  links: zP,
  copy: HP,
  [Symbol.iterator]: VP
};
function KP(r) {
  if (typeof r != "function")
    throw new Error();
  return r;
}
function ba() {
  return 0;
}
function wa(r) {
  return function() {
    return r;
  };
}
function BS(r) {
  r.x0 = Math.round(r.x0), r.y0 = Math.round(r.y0), r.x1 = Math.round(r.x1), r.y1 = Math.round(r.y1);
}
function jS(r, t, e, n, a) {
  for (var i = r.children, o, s = -1, u = i.length, l = r.value && (n - t) / r.value; ++s < u; )
    o = i[s], o.y0 = e, o.y1 = a, o.x0 = t, o.x1 = t += o.value * l;
}
function XP() {
  var r = 1, t = 1, e = 0, n = !1;
  function a(o) {
    var s = o.height + 1;
    return o.x0 = o.y0 = e, o.x1 = r, o.y1 = t / s, o.eachBefore(i(t, s)), n && o.eachBefore(BS), o;
  }
  function i(o, s) {
    return function(u) {
      u.children && jS(u, u.x0, o * (u.depth + 1) / s, u.x1, o * (u.depth + 2) / s);
      var l = u.x0, c = u.y0, f = u.x1 - e, v = u.y1 - e;
      f < l && (l = f = (l + f) / 2), v < c && (c = v = (c + v) / 2), u.x0 = l, u.y0 = c, u.x1 = f, u.y1 = v;
    };
  }
  return a.round = function(o) {
    return arguments.length ? (n = !!o, a) : n;
  }, a.size = function(o) {
    return arguments.length ? (r = +o[0], t = +o[1], a) : [r, t];
  }, a.padding = function(o) {
    return arguments.length ? (e = +o, a) : e;
  }, a;
}
function JP(r, t) {
  return r.parent === t.parent ? 1 : 2;
}
function Tl(r) {
  var t = r.children;
  return t ? t[0] : r.t;
}
function xl(r) {
  var t = r.children;
  return t ? t[t.length - 1] : r.t;
}
function ZP(r, t, e) {
  var n = e / (t.i - r.i);
  t.c -= n, t.s += e, r.c += n, t.z += e, t.m += e;
}
function QP(r) {
  for (var t = 0, e = 0, n = r.children, a = n.length, i; --a >= 0; )
    i = n[a], i.z += t, i.m += t, t += i.s + (e += i.c);
}
function rM(r, t, e) {
  return r.a.parent === t.parent ? r.a : e;
}
function ts(r, t) {
  this._ = r, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = t;
}
ts.prototype = Object.create(ui.prototype);
function tM(r) {
  for (var t = new ts(r, 0), e, n = [t], a, i, o, s; e = n.pop(); )
    if (i = e._.children)
      for (e.children = new Array(s = i.length), o = s - 1; o >= 0; --o)
        n.push(a = e.children[o] = new ts(i[o], o)), a.parent = e;
  return (t.parent = new ts(null, 0)).children = [t], t;
}
function eM() {
  var r = JP, t = 1, e = 1, n = null;
  function a(l) {
    var c = tM(l);
    if (c.eachAfter(i), c.parent.m = -c.z, c.eachBefore(o), n)
      l.eachBefore(u);
    else {
      var f = l, v = l, h = l;
      l.eachBefore(function(S) {
        S.x < f.x && (f = S), S.x > v.x && (v = S), S.depth > h.depth && (h = S);
      });
      var g = f === v ? 1 : r(f, v) / 2, $ = g - f.x, y = t / (v.x + g + $), p = e / (h.depth || 1);
      l.eachBefore(function(S) {
        S.x = (S.x + $) * y, S.y = S.depth * p;
      });
    }
    return l;
  }
  function i(l) {
    var c = l.children, f = l.parent.children, v = l.i ? f[l.i - 1] : null;
    if (c) {
      QP(l);
      var h = (c[0].z + c[c.length - 1].z) / 2;
      v ? (l.z = v.z + r(l._, v._), l.m = l.z - h) : l.z = h;
    } else
      v && (l.z = v.z + r(l._, v._));
    l.parent.A = s(l, v, l.parent.A || f[0]);
  }
  function o(l) {
    l._.x = l.z + l.parent.m, l.m += l.parent.m;
  }
  function s(l, c, f) {
    if (c) {
      for (var v = l, h = l, g = c, $ = v.parent.children[0], y = v.m, p = h.m, S = g.m, I = $.m, A; g = xl(g), v = Tl(v), g && v; )
        $ = Tl($), h = xl(h), h.a = l, A = g.z + S - v.z - y + r(g._, v._), A > 0 && (ZP(rM(g, l, f), l, A), y += A, p += A), S += g.m, y += v.m, I += $.m, p += h.m;
      g && !xl(h) && (h.t = g, h.m += S - p), v && !Tl($) && ($.t = v, $.m += y - I, f = l);
    }
    return f;
  }
  function u(l) {
    l.x *= t, l.y = l.depth * e;
  }
  return a.separation = function(l) {
    return arguments.length ? (r = l, a) : r;
  }, a.size = function(l) {
    return arguments.length ? (n = !1, t = +l[0], e = +l[1], a) : n ? null : [t, e];
  }, a.nodeSize = function(l) {
    return arguments.length ? (n = !0, t = +l[0], e = +l[1], a) : n ? [t, e] : null;
  }, a;
}
function nM(r, t, e, n, a) {
  for (var i = r.children, o, s = -1, u = i.length, l = r.value && (a - e) / r.value; ++s < u; )
    o = i[s], o.x0 = t, o.x1 = n, o.y0 = e, o.y1 = e += o.value * l;
}
var aM = (1 + Math.sqrt(5)) / 2;
function iM(r, t, e, n, a, i) {
  for (var o = [], s = t.children, u, l, c = 0, f = 0, v = s.length, h, g, $ = t.value, y, p, S, I, A, N, z; c < v; ) {
    h = a - e, g = i - n;
    do
      y = s[f++].value;
    while (!y && f < v);
    for (p = S = y, N = Math.max(g / h, h / g) / ($ * r), z = y * y * N, A = Math.max(S / z, z / p); f < v; ++f) {
      if (y += l = s[f].value, l < p && (p = l), l > S && (S = l), z = y * y * N, I = Math.max(S / z, z / p), I > A) {
        y -= l;
        break;
      }
      A = I;
    }
    o.push(u = { value: y, dice: h < g, children: s.slice(c, f) }), u.dice ? jS(u, e, n, a, $ ? n += g * y / $ : i) : nM(u, e, n, $ ? e += h * y / $ : a, i), $ -= y, c = f;
  }
  return o;
}
const oM = function r(t) {
  function e(n, a, i, o, s) {
    iM(t, n, a, i, o, s);
  }
  return e.ratio = function(n) {
    return r((n = +n) > 1 ? n : 1);
  }, e;
}(aM);
function sM() {
  var r = oM, t = !1, e = 1, n = 1, a = [0], i = ba, o = ba, s = ba, u = ba, l = ba;
  function c(v) {
    return v.x0 = v.y0 = 0, v.x1 = e, v.y1 = n, v.eachBefore(f), a = [0], t && v.eachBefore(BS), v;
  }
  function f(v) {
    var h = a[v.depth], g = v.x0 + h, $ = v.y0 + h, y = v.x1 - h, p = v.y1 - h;
    y < g && (g = y = (g + y) / 2), p < $ && ($ = p = ($ + p) / 2), v.x0 = g, v.y0 = $, v.x1 = y, v.y1 = p, v.children && (h = a[v.depth + 1] = i(v) / 2, g += l(v) - h, $ += o(v) - h, y -= s(v) - h, p -= u(v) - h, y < g && (g = y = (g + y) / 2), p < $ && ($ = p = ($ + p) / 2), r(v, g, $, y, p));
  }
  return c.round = function(v) {
    return arguments.length ? (t = !!v, c) : t;
  }, c.size = function(v) {
    return arguments.length ? (e = +v[0], n = +v[1], c) : [e, n];
  }, c.tile = function(v) {
    return arguments.length ? (r = KP(v), c) : r;
  }, c.padding = function(v) {
    return arguments.length ? c.paddingInner(v).paddingOuter(v) : c.paddingInner();
  }, c.paddingInner = function(v) {
    return arguments.length ? (i = typeof v == "function" ? v : wa(+v), c) : i;
  }, c.paddingOuter = function(v) {
    return arguments.length ? c.paddingTop(v).paddingRight(v).paddingBottom(v).paddingLeft(v) : c.paddingTop();
  }, c.paddingTop = function(v) {
    return arguments.length ? (o = typeof v == "function" ? v : wa(+v), c) : o;
  }, c.paddingRight = function(v) {
    return arguments.length ? (s = typeof v == "function" ? v : wa(+v), c) : s;
  }, c.paddingBottom = function(v) {
    return arguments.length ? (u = typeof v == "function" ? v : wa(+v), c) : u;
  }, c.paddingLeft = function(v) {
    return arguments.length ? (l = typeof v == "function" ? v : wa(+v), c) : l;
  }, c;
}
function Ch(r, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(r);
      break;
    default:
      this.range(t).domain(r);
      break;
  }
  return this;
}
const dp = Symbol("implicit");
function US() {
  var r = new Gg(), t = [], e = [], n = dp;
  function a(i) {
    let o = r.get(i);
    if (o === void 0) {
      if (n !== dp)
        return n;
      r.set(i, o = t.push(i) - 1);
    }
    return e[o % e.length];
  }
  return a.domain = function(i) {
    if (!arguments.length)
      return t.slice();
    t = [], r = new Gg();
    for (const o of i)
      r.has(o) || r.set(o, t.push(o) - 1);
    return a;
  }, a.range = function(i) {
    return arguments.length ? (e = Array.from(i), a) : e.slice();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.copy = function() {
    return US(t, e).unknown(n);
  }, Ch.apply(a, arguments), a;
}
function uM(r) {
  return function() {
    return r;
  };
}
function lM(r) {
  return +r;
}
var gp = [0, 1];
function bn(r) {
  return r;
}
function Jf(r, t) {
  return (t -= r = +r) ? function(e) {
    return (e - r) / t;
  } : uM(isNaN(t) ? NaN : 0.5);
}
function cM(r, t) {
  var e;
  return r > t && (e = r, r = t, t = e), function(n) {
    return Math.max(r, Math.min(t, n));
  };
}
function fM(r, t, e) {
  var n = r[0], a = r[1], i = t[0], o = t[1];
  return a < n ? (n = Jf(a, n), i = e(o, i)) : (n = Jf(n, a), i = e(i, o)), function(s) {
    return i(n(s));
  };
}
function vM(r, t, e) {
  var n = Math.min(r.length, t.length) - 1, a = new Array(n), i = new Array(n), o = -1;
  for (r[n] < r[0] && (r = r.slice().reverse(), t = t.slice().reverse()); ++o < n; )
    a[o] = Jf(r[o], r[o + 1]), i[o] = e(t[o], t[o + 1]);
  return function(s) {
    var u = nS(r, s, 1, n) - 1;
    return i[u](a[u](s));
  };
}
function hM(r, t) {
  return t.domain(r.domain()).range(r.range()).interpolate(r.interpolate()).clamp(r.clamp()).unknown(r.unknown());
}
function dM() {
  var r = gp, t = gp, e = Rn, n, a, i, o = bn, s, u, l;
  function c() {
    var v = Math.min(r.length, t.length);
    return o !== bn && (o = cM(r[0], r[v - 1])), s = v > 2 ? vM : fM, u = l = null, f;
  }
  function f(v) {
    return v == null || isNaN(v = +v) ? i : (u || (u = s(r.map(n), t, e)))(n(o(v)));
  }
  return f.invert = function(v) {
    return o(a((l || (l = s(t, r.map(n), st)))(v)));
  }, f.domain = function(v) {
    return arguments.length ? (r = Array.from(v, lM), c()) : r.slice();
  }, f.range = function(v) {
    return arguments.length ? (t = Array.from(v), c()) : t.slice();
  }, f.rangeRound = function(v) {
    return t = Array.from(v), e = KC, c();
  }, f.clamp = function(v) {
    return arguments.length ? (o = v ? !0 : bn, c()) : o !== bn;
  }, f.interpolate = function(v) {
    return arguments.length ? (e = v, c()) : e;
  }, f.unknown = function(v) {
    return arguments.length ? (i = v, f) : i;
  }, function(v, h) {
    return n = v, a = h, c();
  };
}
function gM() {
  return dM()(bn, bn);
}
function pM(r, t, e, n) {
  var a = BR(r, t, e), i;
  switch (n = _s(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(r), Math.abs(t));
      return n.precision == null && !isNaN(i = OP(a, o)) && (n.precision = i), kS(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(i = AP(a, Math.max(Math.abs(r), Math.abs(t)))) && (n.precision = i - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(i = IP(a)) && (n.precision = i - (n.type === "%") * 2);
      break;
    }
  }
  return FS(n);
}
function zS(r) {
  var t = r.domain;
  return r.ticks = function(e) {
    var n = t();
    return kR(n[0], n[n.length - 1], e ?? 10);
  }, r.tickFormat = function(e, n) {
    var a = t();
    return pM(a[0], a[a.length - 1], e ?? 10, n);
  }, r.nice = function(e) {
    e == null && (e = 10);
    var n = t(), a = 0, i = n.length - 1, o = n[a], s = n[i], u, l, c = 10;
    for (s < o && (l = o, o = s, s = l, l = a, a = i, i = l); c-- > 0; ) {
      if (l = jf(o, s, e), l === u)
        return n[a] = o, n[i] = s, t(n);
      if (l > 0)
        o = Math.floor(o / l) * l, s = Math.ceil(s / l) * l;
      else if (l < 0)
        o = Math.ceil(o * l) / l, s = Math.floor(s * l) / l;
      else
        break;
      u = l;
    }
    return r;
  }, r;
}
function je() {
  var r = gM();
  return r.copy = function() {
    return hM(r, je());
  }, Ch.apply(r, arguments), zS(r);
}
function VS() {
  var r = 0, t = 1, e = 1, n = [0.5], a = [0, 1], i;
  function o(u) {
    return u != null && u <= u ? a[nS(n, u, 0, e)] : i;
  }
  function s() {
    var u = -1;
    for (n = new Array(e); ++u < e; )
      n[u] = ((u + 1) * t - (u - e) * r) / (e + 1);
    return o;
  }
  return o.domain = function(u) {
    return arguments.length ? ([r, t] = u, r = +r, t = +t, s()) : [r, t];
  }, o.range = function(u) {
    return arguments.length ? (e = (a = Array.from(u)).length - 1, s()) : a.slice();
  }, o.invertExtent = function(u) {
    var l = a.indexOf(u);
    return l < 0 ? [NaN, NaN] : l < 1 ? [r, n[0]] : l >= e ? [n[e - 1], t] : [n[l - 1], n[l]];
  }, o.unknown = function(u) {
    return arguments.length && (i = u), o;
  }, o.thresholds = function() {
    return n.slice();
  }, o.copy = function() {
    return VS().domain([r, t]).range(a).unknown(i);
  }, Ch.apply(zS(o), arguments);
}
function $M(r) {
  for (var t = r.length / 6 | 0, e = new Array(t), n = 0; n < t; )
    e[n] = "#" + r.slice(n * 6, ++n * 6);
  return e;
}
const yM = $M("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
function St(r) {
  return function() {
    return r;
  };
}
const pp = Math.abs, wr = Math.atan2, we = Math.cos, mM = Math.max, Il = Math.min, mt = Math.sin, wn = Math.sqrt, Rr = 1e-12, li = Math.PI, Cs = li / 2, bM = 2 * li;
function wM(r) {
  return r > 1 ? 0 : r < -1 ? li : Math.acos(r);
}
function $p(r) {
  return r >= 1 ? Cs : r <= -1 ? -Cs : Math.asin(r);
}
function HS(r) {
  let t = 3;
  return r.digits = function(e) {
    if (!arguments.length)
      return t;
    if (e == null)
      t = null;
    else {
      const n = Math.floor(e);
      if (!(n >= 0))
        throw new RangeError(`invalid digits: ${e}`);
      t = n;
    }
    return r;
  }, () => new $P(t);
}
function SM(r) {
  return r.innerRadius;
}
function EM(r) {
  return r.outerRadius;
}
function TM(r) {
  return r.startAngle;
}
function xM(r) {
  return r.endAngle;
}
function IM(r) {
  return r && r.padAngle;
}
function OM(r, t, e, n, a, i, o, s) {
  var u = e - r, l = n - t, c = o - a, f = s - i, v = f * u - c * l;
  if (!(v * v < Rr))
    return v = (c * (t - i) - f * (r - a)) / v, [r + v * u, t + v * l];
}
function eo(r, t, e, n, a, i, o) {
  var s = r - e, u = t - n, l = (o ? i : -i) / wn(s * s + u * u), c = l * u, f = -l * s, v = r + c, h = t + f, g = e + c, $ = n + f, y = (v + g) / 2, p = (h + $) / 2, S = g - v, I = $ - h, A = S * S + I * I, N = a - i, z = v * $ - g * h, X = (I < 0 ? -1 : 1) * wn(mM(0, N * N * A - z * z)), Q = (z * I - S * X) / A, lr = (-z * S - I * X) / A, fr = (z * I + S * X) / A, F = (-z * S + I * X) / A, ir = Q - y, D = lr - p, m = fr - y, R = F - p;
  return ir * ir + D * D > m * m + R * R && (Q = fr, lr = F), {
    cx: Q,
    cy: lr,
    x01: -c,
    y01: -f,
    x11: Q * (a / N - 1),
    y11: lr * (a / N - 1)
  };
}
function Zf() {
  var r = SM, t = EM, e = St(0), n = null, a = TM, i = xM, o = IM, s = null, u = HS(l);
  function l() {
    var c, f, v = +r.apply(this, arguments), h = +t.apply(this, arguments), g = a.apply(this, arguments) - Cs, $ = i.apply(this, arguments) - Cs, y = pp($ - g), p = $ > g;
    if (s || (s = c = u()), h < v && (f = h, h = v, v = f), !(h > Rr))
      s.moveTo(0, 0);
    else if (y > bM - Rr)
      s.moveTo(h * we(g), h * mt(g)), s.arc(0, 0, h, g, $, !p), v > Rr && (s.moveTo(v * we($), v * mt($)), s.arc(0, 0, v, $, g, p));
    else {
      var S = g, I = $, A = g, N = $, z = y, X = y, Q = o.apply(this, arguments) / 2, lr = Q > Rr && (n ? +n.apply(this, arguments) : wn(v * v + h * h)), fr = Il(pp(h - v) / 2, +e.apply(this, arguments)), F = fr, ir = fr, D, m;
      if (lr > Rr) {
        var R = $p(lr / v * mt(Q)), T = $p(lr / h * mt(Q));
        (z -= R * 2) > Rr ? (R *= p ? 1 : -1, A += R, N -= R) : (z = 0, A = N = (g + $) / 2), (X -= T * 2) > Rr ? (T *= p ? 1 : -1, S += T, I -= T) : (X = 0, S = I = (g + $) / 2);
      }
      var C = h * we(S), L = h * mt(S), b = v * we(N), w = v * mt(N);
      if (fr > Rr) {
        var E = h * we(I), P = h * mt(I), M = v * we(A), j = v * mt(A), W;
        if (y < li)
          if (W = OM(C, L, M, j, E, P, b, w)) {
            var rr = C - W[0], tr = L - W[1], er = E - W[0], at = P - W[1], ee = 1 / mt(wM((rr * er + tr * at) / (wn(rr * rr + tr * tr) * wn(er * er + at * at))) / 2), yt = wn(W[0] * W[0] + W[1] * W[1]);
            F = Il(fr, (v - yt) / (ee - 1)), ir = Il(fr, (h - yt) / (ee + 1));
          } else
            F = ir = 0;
      }
      X > Rr ? ir > Rr ? (D = eo(M, j, C, L, h, ir, p), m = eo(E, P, b, w, h, ir, p), s.moveTo(D.cx + D.x01, D.cy + D.y01), ir < fr ? s.arc(D.cx, D.cy, ir, wr(D.y01, D.x01), wr(m.y01, m.x01), !p) : (s.arc(D.cx, D.cy, ir, wr(D.y01, D.x01), wr(D.y11, D.x11), !p), s.arc(0, 0, h, wr(D.cy + D.y11, D.cx + D.x11), wr(m.cy + m.y11, m.cx + m.x11), !p), s.arc(m.cx, m.cy, ir, wr(m.y11, m.x11), wr(m.y01, m.x01), !p))) : (s.moveTo(C, L), s.arc(0, 0, h, S, I, !p)) : s.moveTo(C, L), !(v > Rr) || !(z > Rr) ? s.lineTo(b, w) : F > Rr ? (D = eo(b, w, E, P, v, -F, p), m = eo(C, L, M, j, v, -F, p), s.lineTo(D.cx + D.x01, D.cy + D.y01), F < fr ? s.arc(D.cx, D.cy, F, wr(D.y01, D.x01), wr(m.y01, m.x01), !p) : (s.arc(D.cx, D.cy, F, wr(D.y01, D.x01), wr(D.y11, D.x11), !p), s.arc(0, 0, v, wr(D.cy + D.y11, D.cx + D.x11), wr(m.cy + m.y11, m.cx + m.x11), p), s.arc(m.cx, m.cy, F, wr(m.y11, m.x11), wr(m.y01, m.x01), !p))) : s.arc(0, 0, v, N, A, p);
    }
    if (s.closePath(), c)
      return s = null, c + "" || null;
  }
  return l.centroid = function() {
    var c = (+r.apply(this, arguments) + +t.apply(this, arguments)) / 2, f = (+a.apply(this, arguments) + +i.apply(this, arguments)) / 2 - li / 2;
    return [we(f) * c, mt(f) * c];
  }, l.innerRadius = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : St(+c), l) : r;
  }, l.outerRadius = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : St(+c), l) : t;
  }, l.cornerRadius = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : St(+c), l) : e;
  }, l.padRadius = function(c) {
    return arguments.length ? (n = c == null ? null : typeof c == "function" ? c : St(+c), l) : n;
  }, l.startAngle = function(c) {
    return arguments.length ? (a = typeof c == "function" ? c : St(+c), l) : a;
  }, l.endAngle = function(c) {
    return arguments.length ? (i = typeof c == "function" ? c : St(+c), l) : i;
  }, l.padAngle = function(c) {
    return arguments.length ? (o = typeof c == "function" ? c : St(+c), l) : o;
  }, l.context = function(c) {
    return arguments.length ? (s = c ?? null, l) : s;
  }, l;
}
var AM = Array.prototype.slice;
function RM(r) {
  return r[0];
}
function _M(r) {
  return r[1];
}
class CM {
  constructor(t, e) {
    this._context = t, this._x = e;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      }
      case 1:
        this._point = 2;
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, e, t, e) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + e) / 2, t, this._y0, t, e);
        break;
      }
    }
    this._x0 = t, this._y0 = e;
  }
}
function PM(r) {
  return new CM(r, !0);
}
function MM(r) {
  return r.source;
}
function NM(r) {
  return r.target;
}
function DM(r) {
  let t = MM, e = NM, n = RM, a = _M, i = null, o = null, s = HS(u);
  function u() {
    let l;
    const c = AM.call(arguments), f = t.apply(this, c), v = e.apply(this, c);
    if (i == null && (o = r(l = s())), o.lineStart(), c[0] = f, o.point(+n.apply(this, c), +a.apply(this, c)), c[0] = v, o.point(+n.apply(this, c), +a.apply(this, c)), o.lineEnd(), l)
      return o = null, l + "" || null;
  }
  return u.source = function(l) {
    return arguments.length ? (t = l, u) : t;
  }, u.target = function(l) {
    return arguments.length ? (e = l, u) : e;
  }, u.x = function(l) {
    return arguments.length ? (n = typeof l == "function" ? l : St(+l), u) : n;
  }, u.y = function(l) {
    return arguments.length ? (a = typeof l == "function" ? l : St(+l), u) : a;
  }, u.context = function(l) {
    return arguments.length ? (l == null ? i = o = null : o = r(i = l), u) : i;
  }, u;
}
function LM() {
  return DM(PM);
}
const no = (r) => () => r;
function FM(r, {
  sourceEvent: t,
  target: e,
  transform: n,
  dispatch: a
}) {
  Object.defineProperties(this, {
    type: { value: r, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: e, enumerable: !0, configurable: !0 },
    transform: { value: n, enumerable: !0, configurable: !0 },
    _: { value: a }
  });
}
function Ut(r, t, e) {
  this.k = r, this.x = t, this.y = e;
}
Ut.prototype = {
  constructor: Ut,
  scale: function(r) {
    return r === 1 ? this : new Ut(this.k * r, this.x, this.y);
  },
  translate: function(r, t) {
    return r === 0 & t === 0 ? this : new Ut(this.k, this.x + this.k * r, this.y + this.k * t);
  },
  apply: function(r) {
    return [r[0] * this.k + this.x, r[1] * this.k + this.y];
  },
  applyX: function(r) {
    return r * this.k + this.x;
  },
  applyY: function(r) {
    return r * this.k + this.y;
  },
  invert: function(r) {
    return [(r[0] - this.x) / this.k, (r[1] - this.y) / this.k];
  },
  invertX: function(r) {
    return (r - this.x) / this.k;
  },
  invertY: function(r) {
    return (r - this.y) / this.k;
  },
  rescaleX: function(r) {
    return r.copy().domain(r.range().map(this.invertX, this).map(r.invert, r));
  },
  rescaleY: function(r) {
    return r.copy().domain(r.range().map(this.invertY, this).map(r.invert, r));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Ph = new Ut(1, 0, 0);
Ut.prototype;
function Ol(r) {
  r.stopImmediatePropagation();
}
function Sa(r) {
  r.preventDefault(), r.stopImmediatePropagation();
}
function kM(r) {
  return (!r.ctrlKey || r.type === "wheel") && !r.button;
}
function BM() {
  var r = this;
  return r instanceof SVGElement ? (r = r.ownerSVGElement || r, r.hasAttribute("viewBox") ? (r = r.viewBox.baseVal, [[r.x, r.y], [r.x + r.width, r.y + r.height]]) : [[0, 0], [r.width.baseVal.value, r.height.baseVal.value]]) : [[0, 0], [r.clientWidth, r.clientHeight]];
}
function yp() {
  return this.__zoom || Ph;
}
function jM(r) {
  return -r.deltaY * (r.deltaMode === 1 ? 0.05 : r.deltaMode ? 1 : 2e-3) * (r.ctrlKey ? 10 : 1);
}
function UM() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function zM(r, t, e) {
  var n = r.invertX(t[0][0]) - e[0][0], a = r.invertX(t[1][0]) - e[1][0], i = r.invertY(t[0][1]) - e[0][1], o = r.invertY(t[1][1]) - e[1][1];
  return r.translate(
    a > n ? (n + a) / 2 : Math.min(0, n) || Math.max(0, a),
    o > i ? (i + o) / 2 : Math.min(0, i) || Math.max(0, o)
  );
}
function GS() {
  var r = kM, t = BM, e = zM, n = jM, a = UM, i = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, u = n2, l = Sh("start", "zoom", "end"), c, f, v, h = 500, g = 150, $ = 0, y = 10;
  function p(m) {
    m.property("__zoom", yp).on("wheel.zoom", Q, { passive: !1 }).on("mousedown.zoom", lr).on("dblclick.zoom", fr).filter(a).on("touchstart.zoom", F).on("touchmove.zoom", ir).on("touchend.zoom touchcancel.zoom", D).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  p.transform = function(m, R, T, C) {
    var L = m.selection ? m.selection() : m;
    L.property("__zoom", yp), m !== L ? N(m, R, T, C) : L.interrupt().each(function() {
      z(this, arguments).event(C).start().zoom(null, typeof R == "function" ? R.apply(this, arguments) : R).end();
    });
  }, p.scaleBy = function(m, R, T, C) {
    p.scaleTo(m, function() {
      var L = this.__zoom.k, b = typeof R == "function" ? R.apply(this, arguments) : R;
      return L * b;
    }, T, C);
  }, p.scaleTo = function(m, R, T, C) {
    p.transform(m, function() {
      var L = t.apply(this, arguments), b = this.__zoom, w = T == null ? A(L) : typeof T == "function" ? T.apply(this, arguments) : T, E = b.invert(w), P = typeof R == "function" ? R.apply(this, arguments) : R;
      return e(I(S(b, P), w, E), L, o);
    }, T, C);
  }, p.translateBy = function(m, R, T, C) {
    p.transform(m, function() {
      return e(this.__zoom.translate(
        typeof R == "function" ? R.apply(this, arguments) : R,
        typeof T == "function" ? T.apply(this, arguments) : T
      ), t.apply(this, arguments), o);
    }, null, C);
  }, p.translateTo = function(m, R, T, C, L) {
    p.transform(m, function() {
      var b = t.apply(this, arguments), w = this.__zoom, E = C == null ? A(b) : typeof C == "function" ? C.apply(this, arguments) : C;
      return e(Ph.translate(E[0], E[1]).scale(w.k).translate(
        typeof R == "function" ? -R.apply(this, arguments) : -R,
        typeof T == "function" ? -T.apply(this, arguments) : -T
      ), b, o);
    }, C, L);
  };
  function S(m, R) {
    return R = Math.max(i[0], Math.min(i[1], R)), R === m.k ? m : new Ut(R, m.x, m.y);
  }
  function I(m, R, T) {
    var C = R[0] - T[0] * m.k, L = R[1] - T[1] * m.k;
    return C === m.x && L === m.y ? m : new Ut(m.k, C, L);
  }
  function A(m) {
    return [(+m[0][0] + +m[1][0]) / 2, (+m[0][1] + +m[1][1]) / 2];
  }
  function N(m, R, T, C) {
    m.on("start.zoom", function() {
      z(this, arguments).event(C).start();
    }).on("interrupt.zoom end.zoom", function() {
      z(this, arguments).event(C).end();
    }).tween("zoom", function() {
      var L = this, b = arguments, w = z(L, b).event(C), E = t.apply(L, b), P = T == null ? A(E) : typeof T == "function" ? T.apply(L, b) : T, M = Math.max(E[1][0] - E[0][0], E[1][1] - E[0][1]), j = L.__zoom, W = typeof R == "function" ? R.apply(L, b) : R, rr = u(j.invert(P).concat(M / j.k), W.invert(P).concat(M / W.k));
      return function(tr) {
        if (tr === 1)
          tr = W;
        else {
          var er = rr(tr), at = M / er[2];
          tr = new Ut(at, P[0] - er[0] * at, P[1] - er[1] * at);
        }
        w.zoom(null, tr);
      };
    });
  }
  function z(m, R, T) {
    return !T && m.__zooming || new X(m, R);
  }
  function X(m, R) {
    this.that = m, this.args = R, this.active = 0, this.sourceEvent = null, this.extent = t.apply(m, R), this.taps = 0;
  }
  X.prototype = {
    event: function(m) {
      return m && (this.sourceEvent = m), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(m, R) {
      return this.mouse && m !== "mouse" && (this.mouse[1] = R.invert(this.mouse[0])), this.touch0 && m !== "touch" && (this.touch0[1] = R.invert(this.touch0[0])), this.touch1 && m !== "touch" && (this.touch1[1] = R.invert(this.touch1[0])), this.that.__zoom = R, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(m) {
      var R = yr(this.that).datum();
      l.call(
        m,
        this.that,
        new FM(m, {
          sourceEvent: this.sourceEvent,
          target: p,
          type: m,
          transform: this.that.__zoom,
          dispatch: l
        }),
        R
      );
    }
  };
  function Q(m, ...R) {
    if (!r.apply(this, arguments))
      return;
    var T = z(this, R).event(m), C = this.__zoom, L = Math.max(i[0], Math.min(i[1], C.k * Math.pow(2, n.apply(this, arguments)))), b = be(m);
    if (T.wheel)
      (T.mouse[0][0] !== b[0] || T.mouse[0][1] !== b[1]) && (T.mouse[1] = C.invert(T.mouse[0] = b)), clearTimeout(T.wheel);
    else {
      if (C.k === L)
        return;
      T.mouse = [b, C.invert(b)], rs(this), T.start();
    }
    Sa(m), T.wheel = setTimeout(w, g), T.zoom("mouse", e(I(S(C, L), T.mouse[0], T.mouse[1]), T.extent, o));
    function w() {
      T.wheel = null, T.end();
    }
  }
  function lr(m, ...R) {
    if (v || !r.apply(this, arguments))
      return;
    var T = m.currentTarget, C = z(this, R, !0).event(m), L = yr(m.view).on("mousemove.zoom", P, !0).on("mouseup.zoom", M, !0), b = be(m, T), w = m.clientX, E = m.clientY;
    SC(m.view), Ol(m), C.mouse = [b, this.__zoom.invert(b)], rs(this), C.start();
    function P(j) {
      if (Sa(j), !C.moved) {
        var W = j.clientX - w, rr = j.clientY - E;
        C.moved = W * W + rr * rr > $;
      }
      C.event(j).zoom("mouse", e(I(C.that.__zoom, C.mouse[0] = be(j, T), C.mouse[1]), C.extent, o));
    }
    function M(j) {
      L.on("mousemove.zoom mouseup.zoom", null), EC(j.view, C.moved), Sa(j), C.event(j).end();
    }
  }
  function fr(m, ...R) {
    if (r.apply(this, arguments)) {
      var T = this.__zoom, C = be(m.changedTouches ? m.changedTouches[0] : m, this), L = T.invert(C), b = T.k * (m.shiftKey ? 0.5 : 2), w = e(I(S(T, b), C, L), t.apply(this, R), o);
      Sa(m), s > 0 ? yr(this).transition().duration(s).call(N, w, C, m) : yr(this).call(p.transform, w, C, m);
    }
  }
  function F(m, ...R) {
    if (r.apply(this, arguments)) {
      var T = m.touches, C = T.length, L = z(this, R, m.changedTouches.length === C).event(m), b, w, E, P;
      for (Ol(m), w = 0; w < C; ++w)
        E = T[w], P = be(E, this), P = [P, this.__zoom.invert(P), E.identifier], L.touch0 ? !L.touch1 && L.touch0[2] !== P[2] && (L.touch1 = P, L.taps = 0) : (L.touch0 = P, b = !0, L.taps = 1 + !!c);
      c && (c = clearTimeout(c)), b && (L.taps < 2 && (f = P[0], c = setTimeout(function() {
        c = null;
      }, h)), rs(this), L.start());
    }
  }
  function ir(m, ...R) {
    if (this.__zooming) {
      var T = z(this, R).event(m), C = m.changedTouches, L = C.length, b, w, E, P;
      for (Sa(m), b = 0; b < L; ++b)
        w = C[b], E = be(w, this), T.touch0 && T.touch0[2] === w.identifier ? T.touch0[0] = E : T.touch1 && T.touch1[2] === w.identifier && (T.touch1[0] = E);
      if (w = T.that.__zoom, T.touch1) {
        var M = T.touch0[0], j = T.touch0[1], W = T.touch1[0], rr = T.touch1[1], tr = (tr = W[0] - M[0]) * tr + (tr = W[1] - M[1]) * tr, er = (er = rr[0] - j[0]) * er + (er = rr[1] - j[1]) * er;
        w = S(w, Math.sqrt(tr / er)), E = [(M[0] + W[0]) / 2, (M[1] + W[1]) / 2], P = [(j[0] + rr[0]) / 2, (j[1] + rr[1]) / 2];
      } else if (T.touch0)
        E = T.touch0[0], P = T.touch0[1];
      else
        return;
      T.zoom("touch", e(I(w, E, P), T.extent, o));
    }
  }
  function D(m, ...R) {
    if (this.__zooming) {
      var T = z(this, R).event(m), C = m.changedTouches, L = C.length, b, w;
      for (Ol(m), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, h), b = 0; b < L; ++b)
        w = C[b], T.touch0 && T.touch0[2] === w.identifier ? delete T.touch0 : T.touch1 && T.touch1[2] === w.identifier && delete T.touch1;
      if (T.touch1 && !T.touch0 && (T.touch0 = T.touch1, delete T.touch1), T.touch0)
        T.touch0[1] = this.__zoom.invert(T.touch0[0]);
      else if (T.end(), T.taps === 2 && (w = be(w, this), Math.hypot(f[0] - w[0], f[1] - w[1]) < y)) {
        var E = yr(this).on("dblclick.zoom");
        E && E.apply(this, arguments);
      }
    }
  }
  return p.wheelDelta = function(m) {
    return arguments.length ? (n = typeof m == "function" ? m : no(+m), p) : n;
  }, p.filter = function(m) {
    return arguments.length ? (r = typeof m == "function" ? m : no(!!m), p) : r;
  }, p.touchable = function(m) {
    return arguments.length ? (a = typeof m == "function" ? m : no(!!m), p) : a;
  }, p.extent = function(m) {
    return arguments.length ? (t = typeof m == "function" ? m : no([[+m[0][0], +m[0][1]], [+m[1][0], +m[1][1]]]), p) : t;
  }, p.scaleExtent = function(m) {
    return arguments.length ? (i[0] = +m[0], i[1] = +m[1], p) : [i[0], i[1]];
  }, p.translateExtent = function(m) {
    return arguments.length ? (o[0][0] = +m[0][0], o[1][0] = +m[1][0], o[0][1] = +m[0][1], o[1][1] = +m[1][1], p) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, p.constrain = function(m) {
    return arguments.length ? (e = m, p) : e;
  }, p.duration = function(m) {
    return arguments.length ? (s = +m, p) : s;
  }, p.interpolate = function(m) {
    return arguments.length ? (u = m, p) : u;
  }, p.on = function() {
    var m = l.on.apply(l, arguments);
    return m === l ? p : m;
  }, p.clickDistance = function(m) {
    return arguments.length ? ($ = (m = +m) * m, p) : Math.sqrt($);
  }, p.tapDistance = function(m) {
    return arguments.length ? (y = +m, p) : y;
  }, p;
}
class hu {
  constructor() {
    this.width = 800, this.height = 800, this.enableTooltips = !0;
  }
}
var Qf;
((r) => {
  function t(s) {
    return s < 0.5 ? 4 * s * s * s : 1 - Math.pow(-2 * s + 2, 3) / 2;
  }
  r.easeInEaseOutCubic = t;
  function e(s) {
    return s * s * s;
  }
  r.easeInCubic = e;
  function n(s) {
    return 1 - Math.pow(1 - s, 3);
  }
  r.easeOutCubic = n;
  function a(s) {
    const u = 2 * Math.PI / 4.5;
    return s === 0 ? 0 : s === 1 ? 1 : s < 0.5 ? -(Math.pow(2, 20 * s - 10) * Math.sin((20 * s - 11.125) * u)) / 2 : Math.pow(2, -20 * s + 10) * Math.sin((20 * s - 11.125) * u) / 2 + 1;
  }
  r.easeInEaseOutElastic = a;
  function i(s) {
    const u = 2 * Math.PI / 3;
    return s === 0 ? 0 : s === 1 ? 1 : -Math.pow(2, 10 * s - 10) * Math.sin((s * 10 - 10.75) * u);
  }
  r.easeInElastic = i;
  function o(s) {
    const u = 2 * Math.PI / 3;
    return s === 0 ? 0 : s === 1 ? 1 : Math.pow(2, -10 * s) * Math.sin((s * 10 - 0.75) * u) + 1;
  }
  r.easeOutElastic = o;
})(Qf || (Qf = {}));
const WS = class rv {
  constructor(t, e, n, a, i) {
    this._parent = t, this._leftChild = e, this._rightChild = n, this.values = a, this.height = i, this.id = rv.currentID, rv.currentID++;
  }
  get parent() {
    return this._parent;
  }
  set parent(t) {
    this._parent = t;
  }
  get leftChild() {
    return this._leftChild;
  }
  set leftChild(t) {
    this._leftChild = t;
  }
  get rightChild() {
    return this._rightChild;
  }
  set rightChild(t) {
    this._rightChild = t;
  }
  /**
   * Convert this tree and all of it's children to the Newic-format.
   *
   * @param: idExtractor Function that extract's the name from a given node's id.
   */
  toNewick(t) {
    let e = "";
    return !this.leftChild && !this.rightChild ? t(this.values[0].id) + ":" + this.height : (e += "(", this.leftChild && (e += this.leftChild.toNewick(t) + ","), this.rightChild && (e += this.rightChild.toNewick(t)), e += ")" + this.id + ":" + this.height, e);
  }
  /**
   * Convert this tree and all of it's children to the dot GraphViz-format.
   */
  toGraphViz(t) {
    let e = this, n = `digraph dendrogram {
`, a = "", i = "", o = [e];
    for (; o.length > 0 && (e = o.shift(), !!e); )
      !e.leftChild && !e.rightChild ? a += `    ${e.id} [label="${t(e.values[0].id)}"];
` : a += `    ${e.id} [label="${e.id}"];
`, e.leftChild && (i += `    ${e.id} -> ${e.leftChild.id};
`, o.push(e.leftChild)), e.rightChild && (i += `    ${e.id} -> ${e.rightChild.id};
`, o.push(e.rightChild));
    return n += a + i + "}", n;
  }
};
WS.currentID = 0;
let es = WS;
class VM {
  constructor(t, e, n) {
    this.elements = t, this.index = e, this.treeNode = n;
  }
  /**
   * Merge 2 clusters with each other and create the associated nodes of the dendrogram.
   *
   * @param other The other cluster with whom this one needs to be merged.
   * @param height The height of the dendrogram at which the clustering occurs.
   */
  merge(t, e) {
    this.elements.push(...t.elements);
    const n = new es(null, this.treeNode, t.treeNode, this.elements.slice(), e);
    this.treeNode.parent = n, t.treeNode.parent = n, this.treeNode = n;
  }
}
class HM {
  /**
   * @param metric A distance metric that's used for the clustering performed by this class.
   */
  constructor(t) {
    this.metric = t;
  }
  /**
   * This function returns the root of a dendrogram, based upon the given dataset. The clustering is performed on
   * a distance matrix, which is calculated using the metric, defined in the constructor of this class.
   *
   * @param data A matrix containing data elements that should be clustered. The elements are either clustered on row
   *        or column similarity.
   */
  cluster(t) {
    if (es.currentID = 0, t.length < 1)
      return new es(null, null, null, [], 0);
    let e = /* @__PURE__ */ new Map(), n = [];
    for (let o = 0; o < t.length; o++) {
      let s = t[o].values;
      e.set(o, new VM([t[o]], o, new es(null, null, null, [t[o]], 0))), n.push(s);
    }
    let a = this.metric.getDistance(n), i = 0;
    for (; i != a.length - 1; ) {
      let o = 1 / 0, s = -1, u = -1;
      for (let h of e.keys())
        for (let g of e.keys())
          h > g && a[h][g] < o && (o = a[h][g], s = h, u = g);
      let l = e.get(s), c = e.get(u), f = o / 2;
      if (!l || !c)
        throw "At least one cluster is invalid!";
      let v = this.copyDistanceMatrix(a);
      for (let h of e.keys())
        if (h != s && h != u) {
          let g;
          h > s ? g = a[h][s] : g = a[s][h];
          let $;
          h > u ? $ = a[h][u] : $ = a[u][h];
          let y = (l.elements.length * g + c.elements.length * $) / (l.elements.length + c.elements.length);
          h > s ? v[h][s] = y : v[s][h] = y;
        }
      a = v, l.merge(c, f), e.delete(u), ++i;
    }
    return e.values().next().value.treeNode;
  }
  copyDistanceMatrix(t) {
    let e = [];
    for (let n = 0; n < t.length; n++) {
      let a = [], i = t[n];
      for (let o = 0; o < i.length; o++)
        a.push(i[o]);
      e.push(a);
    }
    return e;
  }
}
class GM {
  getDistance(t) {
    let e = [];
    for (let n = 0; n < t.length; n++) {
      let a = [];
      for (let i = 0; i <= n; i++)
        a.push(this.calculateEuclideanDistance(t[n], t[i]));
      e.push(a);
    }
    return e;
  }
  calculateEuclideanDistance(t, e) {
    if (t.length != e.length)
      throw "Euclidean distance can only be calculated for 2 equally sized input arrays!";
    let n = 0;
    for (let a = 0; a < t.length; a++)
      n += Math.pow(e[a] - t[a], 2);
    return Math.sqrt(n);
  }
}
class WM {
  constructor() {
    this.nodeMinMap = /* @__PURE__ */ new Map();
  }
  reorder(t) {
    return this.nodeMinMap.clear(), this.sortMinimum(t);
  }
  sortMinimum(t) {
    if (!t.leftChild || !t.rightChild)
      return t;
    let e = t.leftChild, n = t.rightChild, a = !e.leftChild && !e.rightChild, i = !n.leftChild && !n.rightChild;
    if (a && i)
      this.nodeMinMap.set(t, t.height);
    else if (!a && i) {
      let o = this.sortMinimum(e);
      t.leftChild = o;
      let s = this.nodeMinMap.get(o);
      if (s === void 0)
        throw "The recursive call to sort the left subtree did not yield a minimum value.";
      this.nodeMinMap.set(t, Math.min(t.height, s));
    } else if (a && !i) {
      let o = this.sortMinimum(n);
      t.leftChild = o, t.rightChild = e;
      let s = this.nodeMinMap.get(o);
      if (s === void 0)
        throw "The recursive call to sort the right subtree did not yield a minimum value.";
      this.nodeMinMap.set(t, Math.min(t.height, s));
    } else {
      let o = this.sortMinimum(e), s = this.sortMinimum(n), u = this.nodeMinMap.get(o), l = this.nodeMinMap.get(s);
      if (u === void 0 || l === void 0)
        throw "One of the recursive calls to sort a subtree did not yield a minimum value.";
      u <= l ? (t.leftChild = o, t.rightChild = s) : (t.leftChild = s, t.rightChild = o), this.nodeMinMap.set(t, Math.min(t.height, u, l));
    }
    return t;
  }
}
class mp extends hu {
  constructor() {
    super(...arguments), this.initialTextWidth = 100, this.initialTextHeight = 100, this.squarePadding = 2, this.visualizationTextPadding = 4, this.fontSize = 14, this.labelColor = "#404040", this.highlightSelection = !0, this.highlightFontSize = 16, this.highlightFontColor = "black", this.className = "heatmap", this.animationsEnabled = !0, this.animationDuration = 2e3, this.transition = Qf.easeInEaseOutCubic, this.minColor = "#EEEEEE", this.maxColor = "#1565C0", this.colorBuckets = 50, this.dendrogramEnabled = !1, this.dendrogramWidth = 100, this.dendrogramLineWidth = 1, this.dendrogramColor = "#404040", this.clusteringAlgorithm = new HM(new GM()), this.reorderer = new WM(), this.getTooltip = (t, e, n) => `
            <style>
                .unipept-tooltip {
                    padding: 10px;
                    border-radius: 5px; 
                    background: rgba(0, 0, 0, 0.8); 
                    color: #fff;
                }
                
                .unipept-tooltip div, .unipept-tooltip a {
                    font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
                }
                
                .unipept-tooltip div {
                    font-weight: bold;
                }
            </style>
            <div class="unipept-tooltip">
                <div>
                    ${this.getTooltipTitle(t, e, n)}
                </div>
                <a>
                    ${this.getTooltipText(t)}
                </a>
            </div>
        `, this.getTooltipTitle = (t, e, n) => `${n.name ? n.name : ""}${n.name ? " and " : ""}${e.name ? e.name : ""}`, this.getTooltipText = (t) => `Similarity: ${(t.value * 100).toFixed(2)}%`;
  }
}
class bp {
  constructor(t, e) {
    this.values = t, this.id = e;
  }
}
class wp {
  /**
   * Converts an array of feature labels into correct HeatmapFeature objects. These objects keep track of a name
   * and index for a feature.
   *
   * @param featureLabels All labels that should be converted to true HeatmapFeature objects.
   * @return An array with HeatmapFeature objects.
   */
  preprocessFeatures(t) {
    return Object.entries(t).map(([e, n]) => ({
      name: n,
      idx: Number.parseInt(e)
    }));
  }
  /**
   * Convert the data grid consisting of numbers into valid HeatmapValue-objects. The order from the input grid is
   * retained in the output grid. A color will be computed for each distinct value. Only a specific amount of colors
   * will be generated, as determined by the colorValues parameter.
   *
   * @param data A grid of numbers that needs to be converted to proper HeatmapValue-objects.
   * @param lowColor Color value that should be used for low values
   * @param highColor Color value that should be used for high values
   * @param colorValues How many discrete color values should be generated?
   * @return A two-dimensional grid of HeatmapValue objects.
   */
  preprocessValues(t, e, n, a) {
    const i = Ih(ke(e), ke(n)), s = je().domain([0, 1]).range([0, 1]).ticks(a), u = VS().domain([0, 1]).range(s);
    return Object.entries(t).map(([l, c]) => Object.entries(c).map(([f, v]) => {
      if (typeof v == "number") {
        const h = u(v);
        if (h === void 0)
          throw new Error("Invalid heatmap value given: " + v);
        return {
          value: v,
          rowId: Number.parseInt(l),
          columnId: Number.parseInt(f),
          color: i(h)
        };
      } else
        return v;
    }));
  }
  /**
   * Order all values in a map, per color.
   *
   * @param values All grid values for which we should determine a color.
   * @return A mapping between an HTML-color value and a list of [row, col] positions.
   */
  orderPerColor(t) {
    var n;
    const e = /* @__PURE__ */ new Map();
    for (let a = 0; a < t.length; a++)
      for (let i = 0; i < t[a].length; i++) {
        const o = t[a][i].color;
        e.has(o) || e.set(o, []), (n = e.get(o)) == null || n.push([a, i]);
      }
    return e;
  }
}
var ao = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ea = function(r) {
  return r && r.Math === Math && r;
}, _ = (
  // eslint-disable-next-line es/no-global-this -- safe
  Ea(typeof globalThis == "object" && globalThis) || Ea(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
  Ea(typeof self == "object" && self) || Ea(typeof ao == "object" && ao) || Ea(typeof ao == "object" && ao) || // eslint-disable-next-line no-new-func -- fallback
  function() {
    return this;
  }() || Function("return this")()
), Er = {}, x = function(r) {
  try {
    return !!r();
  } catch {
    return !0;
  }
}, qM = x, B = !qM(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] !== 7;
}), YM = x, wi = !YM(function() {
  var r = (function() {
  }).bind();
  return typeof r != "function" || r.hasOwnProperty("prototype");
}), KM = wi, io = Function.prototype.call, U = KM ? io.bind(io) : function() {
  return io.apply(io, arguments);
}, Si = {}, qS = {}.propertyIsEnumerable, YS = Object.getOwnPropertyDescriptor, XM = YS && !qS.call({ 1: 2 }, 1);
Si.f = XM ? function(t) {
  var e = YS(this, t);
  return !!e && e.enumerable;
} : qS;
var Qr = function(r, t) {
  return {
    enumerable: !(r & 1),
    configurable: !(r & 2),
    writable: !(r & 4),
    value: t
  };
}, KS = wi, XS = Function.prototype, tv = XS.call, JM = KS && XS.bind.bind(tv, tv), O = KS ? JM : function(r) {
  return function() {
    return tv.apply(r, arguments);
  };
}, JS = O, ZM = JS({}.toString), QM = JS("".slice), Tr = function(r) {
  return QM(ZM(r), 8, -1);
}, rN = O, tN = x, eN = Tr, Al = Object, nN = rN("".split), Qn = tN(function() {
  return !Al("z").propertyIsEnumerable(0);
}) ? function(r) {
  return eN(r) === "String" ? nN(r, "") : Al(r);
} : Al, Mr = function(r) {
  return r == null;
}, aN = Mr, iN = TypeError, or = function(r) {
  if (aN(r))
    throw new iN("Can't call method on " + r);
  return r;
}, oN = Qn, sN = or, gr = function(r) {
  return oN(sN(r));
}, Rl = typeof document == "object" && document.all, Y = typeof Rl > "u" && Rl !== void 0 ? function(r) {
  return typeof r == "function" || r === Rl;
} : function(r) {
  return typeof r == "function";
}, uN = Y, H = function(r) {
  return typeof r == "object" ? r !== null : uN(r);
}, _l = _, lN = Y, cN = function(r) {
  return lN(r) ? r : void 0;
}, nr = function(r, t) {
  return arguments.length < 2 ? cN(_l[r]) : _l[r] && _l[r][t];
}, fN = O, Nr = fN({}.isPrototypeOf), vN = _, Sp = vN.navigator, Ep = Sp && Sp.userAgent, _t = Ep ? String(Ep) : "", ZS = _, Cl = _t, Tp = ZS.process, xp = ZS.Deno, Ip = Tp && Tp.versions || xp && xp.version, Op = Ip && Ip.v8, ut, Ps;
Op && (ut = Op.split("."), Ps = ut[0] > 0 && ut[0] < 4 ? 1 : +(ut[0] + ut[1]));
!Ps && Cl && (ut = Cl.match(/Edge\/(\d+)/), (!ut || ut[1] >= 74) && (ut = Cl.match(/Chrome\/(\d+)/), ut && (Ps = +ut[1])));
var Kt = Ps, Ap = Kt, hN = x, dN = _, gN = dN.String, ra = !!Object.getOwnPropertySymbols && !hN(function() {
  var r = Symbol("symbol detection");
  return !gN(r) || !(Object(r) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && Ap && Ap < 41;
}), pN = ra, QS = pN && !Symbol.sham && typeof Symbol.iterator == "symbol", $N = nr, yN = Y, mN = Nr, bN = QS, wN = Object, Ge = bN ? function(r) {
  return typeof r == "symbol";
} : function(r) {
  var t = $N("Symbol");
  return yN(t) && mN(t.prototype, wN(r));
}, SN = String, We = function(r) {
  try {
    return SN(r);
  } catch {
    return "Object";
  }
}, EN = Y, TN = We, xN = TypeError, J = function(r) {
  if (EN(r))
    return r;
  throw new xN(TN(r) + " is not a function");
}, IN = J, ON = Mr, Ct = function(r, t) {
  var e = r[t];
  return ON(e) ? void 0 : IN(e);
}, Pl = U, Ml = Y, Nl = H, AN = TypeError, rE = function(r, t) {
  var e, n;
  if (t === "string" && Ml(e = r.toString) && !Nl(n = Pl(e, r)) || Ml(e = r.valueOf) && !Nl(n = Pl(e, r)) || t !== "string" && Ml(e = r.toString) && !Nl(n = Pl(e, r)))
    return n;
  throw new AN("Can't convert object to primitive value");
}, tE = { exports: {} }, Xt = !1, Rp = _, RN = Object.defineProperty, Mh = function(r, t) {
  try {
    RN(Rp, r, { value: t, configurable: !0, writable: !0 });
  } catch {
    Rp[r] = t;
  }
  return t;
}, _N = _, CN = Mh, _p = "__core-js_shared__", Cp = tE.exports = _N[_p] || CN(_p, {});
(Cp.versions || (Cp.versions = [])).push({
  version: "3.41.0",
  mode: "global",
  copyright: "© 2014-2025 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.41.0/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var Nh = tE.exports, Pp = Nh, ta = function(r, t) {
  return Pp[r] || (Pp[r] = t || {});
}, PN = or, MN = Object, Z = function(r) {
  return MN(PN(r));
}, NN = O, DN = Z, LN = NN({}.hasOwnProperty), K = Object.hasOwn || function(t, e) {
  return LN(DN(t), e);
}, FN = O, kN = 0, BN = Math.random(), jN = FN(1 .toString), ea = function(r) {
  return "Symbol(" + (r === void 0 ? "" : r) + ")_" + jN(++kN + BN, 36);
}, UN = _, zN = ta, Mp = K, VN = ea, HN = ra, GN = QS, Sn = UN.Symbol, Dl = zN("wks"), WN = GN ? Sn.for || Sn : Sn && Sn.withoutSetter || VN, G = function(r) {
  return Mp(Dl, r) || (Dl[r] = HN && Mp(Sn, r) ? Sn[r] : WN("Symbol." + r)), Dl[r];
}, qN = U, Np = H, Dp = Ge, YN = Ct, KN = rE, XN = G, JN = TypeError, ZN = XN("toPrimitive"), du = function(r, t) {
  if (!Np(r) || Dp(r))
    return r;
  var e = YN(r, ZN), n;
  if (e) {
    if (t === void 0 && (t = "default"), n = qN(e, r, t), !Np(n) || Dp(n))
      return n;
    throw new JN("Can't convert object to primitive value");
  }
  return t === void 0 && (t = "number"), KN(r, t);
}, QN = du, rD = Ge, pe = function(r) {
  var t = QN(r, "string");
  return rD(t) ? t : t + "";
}, tD = _, Lp = H, ev = tD.document, eD = Lp(ev) && Lp(ev.createElement), gu = function(r) {
  return eD ? ev.createElement(r) : {};
}, nD = B, aD = x, iD = gu, eE = !nD && !aD(function() {
  return Object.defineProperty(iD("div"), "a", {
    get: function() {
      return 7;
    }
  }).a !== 7;
}), oD = B, sD = U, uD = Si, lD = Qr, cD = gr, fD = pe, vD = K, hD = eE, Fp = Object.getOwnPropertyDescriptor;
Er.f = oD ? Fp : function(t, e) {
  if (t = cD(t), e = fD(e), hD)
    try {
      return Fp(t, e);
    } catch {
    }
  if (vD(t, e))
    return lD(!sD(uD.f, t, e), t[e]);
};
var sr = {}, dD = B, gD = x, nE = dD && gD(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: !1
  }).prototype !== 42;
}), pD = H, $D = String, yD = TypeError, k = function(r) {
  if (pD(r))
    return r;
  throw new yD($D(r) + " is not an object");
}, mD = B, bD = eE, wD = nE, oo = k, kp = pe, SD = TypeError, Ll = Object.defineProperty, ED = Object.getOwnPropertyDescriptor, Fl = "enumerable", kl = "configurable", Bl = "writable";
sr.f = mD ? wD ? function(t, e, n) {
  if (oo(t), e = kp(e), oo(n), typeof t == "function" && e === "prototype" && "value" in n && Bl in n && !n[Bl]) {
    var a = ED(t, e);
    a && a[Bl] && (t[e] = n.value, n = {
      configurable: kl in n ? n[kl] : a[kl],
      enumerable: Fl in n ? n[Fl] : a[Fl],
      writable: !1
    });
  }
  return Ll(t, e, n);
} : Ll : function(t, e, n) {
  if (oo(t), e = kp(e), oo(n), bD)
    try {
      return Ll(t, e, n);
    } catch {
    }
  if ("get" in n || "set" in n)
    throw new SD("Accessors not supported");
  return "value" in n && (t[e] = n.value), t;
};
var TD = B, xD = sr, ID = Qr, xr = TD ? function(r, t, e) {
  return xD.f(r, t, ID(1, e));
} : function(r, t, e) {
  return r[t] = e, r;
}, aE = { exports: {} }, nv = B, OD = K, iE = Function.prototype, AD = nv && Object.getOwnPropertyDescriptor, Dh = OD(iE, "name"), RD = Dh && (function() {
}).name === "something", _D = Dh && (!nv || nv && AD(iE, "name").configurable), na = {
  EXISTS: Dh,
  PROPER: RD,
  CONFIGURABLE: _D
}, CD = O, PD = Y, av = Nh, MD = CD(Function.toString);
PD(av.inspectSource) || (av.inspectSource = function(r) {
  return MD(r);
});
var Lh = av.inspectSource, ND = _, DD = Y, Bp = ND.WeakMap, oE = DD(Bp) && /native code/.test(String(Bp)), LD = ta, FD = ea, jp = LD("keys"), pu = function(r) {
  return jp[r] || (jp[r] = FD(r));
}, Ei = {}, kD = oE, sE = _, BD = H, jD = xr, jl = K, Ul = Nh, UD = pu, zD = Ei, Up = "Object already initialized", iv = sE.TypeError, VD = sE.WeakMap, Ms, ci, Ns, HD = function(r) {
  return Ns(r) ? ci(r) : Ms(r, {});
}, GD = function(r) {
  return function(t) {
    var e;
    if (!BD(t) || (e = ci(t)).type !== r)
      throw new iv("Incompatible receiver, " + r + " required");
    return e;
  };
};
if (kD || Ul.state) {
  var bt = Ul.state || (Ul.state = new VD());
  bt.get = bt.get, bt.has = bt.has, bt.set = bt.set, Ms = function(r, t) {
    if (bt.has(r))
      throw new iv(Up);
    return t.facade = r, bt.set(r, t), t;
  }, ci = function(r) {
    return bt.get(r) || {};
  }, Ns = function(r) {
    return bt.has(r);
  };
} else {
  var nn = UD("state");
  zD[nn] = !0, Ms = function(r, t) {
    if (jl(r, nn))
      throw new iv(Up);
    return t.facade = r, jD(r, nn, t), t;
  }, ci = function(r) {
    return jl(r, nn) ? r[nn] : {};
  }, Ns = function(r) {
    return jl(r, nn);
  };
}
var vr = {
  set: Ms,
  get: ci,
  has: Ns,
  enforce: HD,
  getterFor: GD
}, Fh = O, WD = x, qD = Y, so = K, ov = B, YD = na.CONFIGURABLE, KD = Lh, uE = vr, XD = uE.enforce, JD = uE.get, zp = String, ns = Object.defineProperty, ZD = Fh("".slice), QD = Fh("".replace), rL = Fh([].join), tL = ov && !WD(function() {
  return ns(function() {
  }, "length", { value: 8 }).length !== 8;
}), eL = String(String).split("String"), nL = aE.exports = function(r, t, e) {
  ZD(zp(t), 0, 7) === "Symbol(" && (t = "[" + QD(zp(t), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), e && e.getter && (t = "get " + t), e && e.setter && (t = "set " + t), (!so(r, "name") || YD && r.name !== t) && (ov ? ns(r, "name", { value: t, configurable: !0 }) : r.name = t), tL && e && so(e, "arity") && r.length !== e.arity && ns(r, "length", { value: e.arity });
  try {
    e && so(e, "constructor") && e.constructor ? ov && ns(r, "prototype", { writable: !1 }) : r.prototype && (r.prototype = void 0);
  } catch {
  }
  var n = XD(r);
  return so(n, "source") || (n.source = rL(eL, typeof t == "string" ? t : "")), r;
};
Function.prototype.toString = nL(function() {
  return qD(this) && JD(this).source || KD(this);
}, "toString");
var kh = aE.exports, aL = Y, iL = sr, oL = kh, sL = Mh, ur = function(r, t, e, n) {
  n || (n = {});
  var a = n.enumerable, i = n.name !== void 0 ? n.name : t;
  if (aL(e) && oL(e, i, n), n.global)
    a ? r[t] = e : sL(t, e);
  else {
    try {
      n.unsafe ? r[t] && (a = !0) : delete r[t];
    } catch {
    }
    a ? r[t] = e : iL.f(r, t, {
      value: e,
      enumerable: !1,
      configurable: !n.nonConfigurable,
      writable: !n.nonWritable
    });
  }
  return r;
}, $e = {}, uL = Math.ceil, lL = Math.floor, lE = Math.trunc || function(t) {
  var e = +t;
  return (e > 0 ? lL : uL)(e);
}, cL = lE, cr = function(r) {
  var t = +r;
  return t !== t || t === 0 ? 0 : cL(t);
}, fL = cr, vL = Math.max, hL = Math.min, Jt = function(r, t) {
  var e = fL(r);
  return e < 0 ? vL(e + t, 0) : hL(e, t);
}, dL = cr, gL = Math.min, Ur = function(r) {
  var t = dL(r);
  return t > 0 ? gL(t, 9007199254740991) : 0;
}, pL = Ur, ar = function(r) {
  return pL(r.length);
}, $L = gr, yL = Jt, mL = ar, Vp = function(r) {
  return function(t, e, n) {
    var a = $L(t), i = mL(a);
    if (i === 0)
      return !r && -1;
    var o = yL(n, i), s;
    if (r && e !== e) {
      for (; i > o; )
        if (s = a[o++], s !== s)
          return !0;
    } else
      for (; i > o; o++)
        if ((r || o in a) && a[o] === e)
          return r || o || 0;
    return !r && -1;
  };
}, Ti = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: Vp(!0),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: Vp(!1)
}, bL = O, zl = K, wL = gr, SL = Ti.indexOf, EL = Ei, Hp = bL([].push), cE = function(r, t) {
  var e = wL(r), n = 0, a = [], i;
  for (i in e)
    !zl(EL, i) && zl(e, i) && Hp(a, i);
  for (; t.length > n; )
    zl(e, i = t[n++]) && (~SL(a, i) || Hp(a, i));
  return a;
}, Bh = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
], TL = cE, xL = Bh, IL = xL.concat("length", "prototype");
$e.f = Object.getOwnPropertyNames || function(t) {
  return TL(t, IL);
};
var xi = {};
xi.f = Object.getOwnPropertySymbols;
var OL = nr, AL = O, RL = $e, _L = xi, CL = k, PL = AL([].concat), jh = OL("Reflect", "ownKeys") || function(t) {
  var e = RL.f(CL(t)), n = _L.f;
  return n ? PL(e, n(t)) : e;
}, Gp = K, ML = jh, NL = Er, DL = sr, Ii = function(r, t, e) {
  for (var n = ML(t), a = DL.f, i = NL.f, o = 0; o < n.length; o++) {
    var s = n[o];
    !Gp(r, s) && !(e && Gp(e, s)) && a(r, s, i(t, s));
  }
}, LL = x, FL = Y, kL = /#|\.prototype\./, Oi = function(r, t) {
  var e = jL[BL(r)];
  return e === zL ? !0 : e === UL ? !1 : FL(t) ? LL(t) : !!t;
}, BL = Oi.normalize = function(r) {
  return String(r).replace(kL, ".").toLowerCase();
}, jL = Oi.data = {}, UL = Oi.NATIVE = "N", zL = Oi.POLYFILL = "P", Ai = Oi, uo = _, VL = Er.f, HL = xr, GL = ur, WL = Mh, qL = Ii, YL = Ai, d = function(r, t) {
  var e = r.target, n = r.global, a = r.stat, i, o, s, u, l, c;
  if (n ? o = uo : a ? o = uo[e] || WL(e, {}) : o = uo[e] && uo[e].prototype, o)
    for (s in t) {
      if (l = t[s], r.dontCallGetSet ? (c = VL(o, s), u = c && c.value) : u = o[s], i = YL(n ? s : e + (a ? "." : "#") + s, r.forced), !i && u !== void 0) {
        if (typeof l == typeof u)
          continue;
        qL(l, u);
      }
      (r.sham || u && u.sham) && HL(l, "sham", !0), GL(o, s, l, r);
    }
}, KL = G, XL = KL("toStringTag"), fE = {};
fE[XL] = "z";
var Uh = String(fE) === "[object z]", JL = Uh, ZL = Y, as = Tr, QL = G, rF = QL("toStringTag"), tF = Object, eF = as(function() {
  return arguments;
}()) === "Arguments", nF = function(r, t) {
  try {
    return r[t];
  } catch {
  }
}, dt = JL ? as : function(r) {
  var t, e, n;
  return r === void 0 ? "Undefined" : r === null ? "Null" : typeof (e = nF(t = tF(r), rF)) == "string" ? e : eF ? as(t) : (n = as(t)) === "Object" && ZL(t.callee) ? "Arguments" : n;
}, aF = dt, iF = String, V = function(r) {
  if (aF(r) === "Symbol")
    throw new TypeError("Cannot convert a Symbol value to a string");
  return iF(r);
}, $u = {}, oF = cE, sF = Bh, Ri = Object.keys || function(t) {
  return oF(t, sF);
}, uF = B, lF = nE, cF = sr, fF = k, vF = gr, hF = Ri;
$u.f = uF && !lF ? Object.defineProperties : function(t, e) {
  fF(t);
  for (var n = vF(e), a = hF(e), i = a.length, o = 0, s; i > o; )
    cF.f(t, s = a[o++], n[s]);
  return t;
};
var dF = nr, vE = dF("document", "documentElement"), gF = k, pF = $u, Wp = Bh, $F = Ei, yF = vE, mF = gu, bF = pu, qp = ">", Yp = "<", sv = "prototype", uv = "script", hE = bF("IE_PROTO"), Vl = function() {
}, dE = function(r) {
  return Yp + uv + qp + r + Yp + "/" + uv + qp;
}, Kp = function(r) {
  r.write(dE("")), r.close();
  var t = r.parentWindow.Object;
  return r = null, t;
}, wF = function() {
  var r = mF("iframe"), t = "java" + uv + ":", e;
  return r.style.display = "none", yF.appendChild(r), r.src = String(t), e = r.contentWindow.document, e.open(), e.write(dE("document.F=Object")), e.close(), e.F;
}, lo, is = function() {
  try {
    lo = new ActiveXObject("htmlfile");
  } catch {
  }
  is = typeof document < "u" ? document.domain && lo ? Kp(lo) : wF() : Kp(lo);
  for (var r = Wp.length; r--; )
    delete is[sv][Wp[r]];
  return is();
};
$F[hE] = !0;
var zr = Object.create || function(t, e) {
  var n;
  return t !== null ? (Vl[sv] = gF(t), n = new Vl(), Vl[sv] = null, n[hE] = t) : n = is(), e === void 0 ? n : pF.f(n, e);
}, yu = {}, SF = O, rt = SF([].slice), EF = Tr, TF = gr, gE = $e.f, xF = rt, pE = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], IF = function(r) {
  try {
    return gE(r);
  } catch {
    return xF(pE);
  }
};
yu.f = function(t) {
  return pE && EF(t) === "Window" ? IF(t) : gE(TF(t));
};
var Xp = kh, OF = sr, hr = function(r, t, e) {
  return e.get && Xp(e.get, t, { getter: !0 }), e.set && Xp(e.set, t, { setter: !0 }), OF.f(r, t, e);
}, zh = {}, AF = G;
zh.f = AF;
var RF = _, $E = RF, Jp = $E, _F = K, CF = zh, PF = sr.f, Dr = function(r) {
  var t = Jp.Symbol || (Jp.Symbol = {});
  _F(t, r) || PF(t, r, {
    value: CF.f(r)
  });
}, MF = U, NF = nr, DF = G, LF = ur, yE = function() {
  var r = NF("Symbol"), t = r && r.prototype, e = t && t.valueOf, n = DF("toPrimitive");
  t && !t[n] && LF(t, n, function(a) {
    return MF(e, this);
  }, { arity: 1 });
}, FF = sr.f, kF = K, BF = G, Zp = BF("toStringTag"), Lr = function(r, t, e) {
  r && !e && (r = r.prototype), r && !kF(r, Zp) && FF(r, Zp, { configurable: !0, value: t });
}, jF = Tr, UF = O, qe = function(r) {
  if (jF(r) === "Function")
    return UF(r);
}, Qp = qe, zF = J, VF = wi, HF = Qp(Qp.bind), gt = function(r, t) {
  return zF(r), t === void 0 ? r : VF ? HF(r, t) : function() {
    return r.apply(t, arguments);
  };
}, GF = Tr, ye = Array.isArray || function(t) {
  return GF(t) === "Array";
}, WF = O, qF = x, mE = Y, YF = dt, KF = nr, XF = Lh, bE = function() {
}, wE = KF("Reflect", "construct"), Vh = /^\s*(?:class|function)\b/, JF = WF(Vh.exec), ZF = !Vh.test(bE), Ta = function(t) {
  if (!mE(t))
    return !1;
  try {
    return wE(bE, [], t), !0;
  } catch {
    return !1;
  }
}, SE = function(t) {
  if (!mE(t))
    return !1;
  switch (YF(t)) {
    case "AsyncFunction":
    case "GeneratorFunction":
    case "AsyncGeneratorFunction":
      return !1;
  }
  try {
    return ZF || !!JF(Vh, XF(t));
  } catch {
    return !0;
  }
};
SE.sham = !0;
var aa = !wE || qF(function() {
  var r;
  return Ta(Ta.call) || !Ta(Object) || !Ta(function() {
    r = !0;
  }) || r;
}) ? SE : Ta, r$ = ye, QF = aa, rk = H, tk = G, ek = tk("species"), t$ = Array, nk = function(r) {
  var t;
  return r$(r) && (t = r.constructor, QF(t) && (t === t$ || r$(t.prototype)) ? t = void 0 : rk(t) && (t = t[ek], t === null && (t = void 0))), t === void 0 ? t$ : t;
}, ak = nk, _i = function(r, t) {
  return new (ak(r))(t === 0 ? 0 : t);
}, ik = gt, ok = O, sk = Qn, uk = Z, lk = ar, ck = _i, e$ = ok([].push), ne = function(r) {
  var t = r === 1, e = r === 2, n = r === 3, a = r === 4, i = r === 6, o = r === 7, s = r === 5 || i;
  return function(u, l, c, f) {
    for (var v = uk(u), h = sk(v), g = lk(h), $ = ik(l, c), y = 0, p = f || ck, S = t ? p(u, g) : e || o ? p(u, 0) : void 0, I, A; g > y; y++)
      if ((s || y in h) && (I = h[y], A = $(I, y, v), r))
        if (t)
          S[y] = A;
        else if (A)
          switch (r) {
            case 3:
              return !0;
            case 5:
              return I;
            case 6:
              return y;
            case 2:
              e$(S, I);
          }
        else
          switch (r) {
            case 4:
              return !1;
            case 7:
              e$(S, I);
          }
    return i ? -1 : n || a ? a : S;
  };
}, br = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: ne(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: ne(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: ne(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: ne(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: ne(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: ne(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: ne(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: ne(7)
}, mu = d, Ci = _, Hh = U, fk = O, zn = B, Vn = ra, vk = x, dr = K, hk = Nr, lv = k, bu = gr, Gh = pe, dk = V, cv = Qr, Hn = zr, EE = Ri, gk = $e, TE = yu, pk = xi, xE = Er, IE = sr, $k = $u, OE = Si, Hl = ur, yk = hr, Wh = ta, mk = pu, AE = Ei, n$ = ea, bk = G, wk = zh, Sk = Dr, Ek = yE, Tk = Lr, RE = vr, wu = br.forEach, Cr = mk("hidden"), Su = "Symbol", fi = "prototype", xk = RE.set, a$ = RE.getterFor(Su), Zr = Object[fi], Ne = Ci.Symbol, za = Ne && Ne[fi], Ik = Ci.RangeError, Ok = Ci.TypeError, Gl = Ci.QObject, _E = xE.f, De = IE.f, CE = TE.f, Ak = OE.f, PE = fk([].push), Ht = Wh("symbols"), Pi = Wh("op-symbols"), Rk = Wh("wks"), fv = !Gl || !Gl[fi] || !Gl[fi].findChild, ME = function(r, t, e) {
  var n = _E(Zr, t);
  n && delete Zr[t], De(r, t, e), n && r !== Zr && De(Zr, t, n);
}, vv = zn && vk(function() {
  return Hn(De({}, "a", {
    get: function() {
      return De(this, "a", { value: 7 }).a;
    }
  })).a !== 7;
}) ? ME : De, Wl = function(r, t) {
  var e = Ht[r] = Hn(za);
  return xk(e, {
    type: Su,
    tag: r,
    description: t
  }), zn || (e.description = t), e;
}, Eu = function(t, e, n) {
  t === Zr && Eu(Pi, e, n), lv(t);
  var a = Gh(e);
  return lv(n), dr(Ht, a) ? (n.enumerable ? (dr(t, Cr) && t[Cr][a] && (t[Cr][a] = !1), n = Hn(n, { enumerable: cv(0, !1) })) : (dr(t, Cr) || De(t, Cr, cv(1, Hn(null))), t[Cr][a] = !0), vv(t, a, n)) : De(t, a, n);
}, qh = function(t, e) {
  lv(t);
  var n = bu(e), a = EE(n).concat(LE(n));
  return wu(a, function(i) {
    (!zn || Hh(hv, n, i)) && Eu(t, i, n[i]);
  }), t;
}, _k = function(t, e) {
  return e === void 0 ? Hn(t) : qh(Hn(t), e);
}, hv = function(t) {
  var e = Gh(t), n = Hh(Ak, this, e);
  return this === Zr && dr(Ht, e) && !dr(Pi, e) ? !1 : n || !dr(this, e) || !dr(Ht, e) || dr(this, Cr) && this[Cr][e] ? n : !0;
}, NE = function(t, e) {
  var n = bu(t), a = Gh(e);
  if (!(n === Zr && dr(Ht, a) && !dr(Pi, a))) {
    var i = _E(n, a);
    return i && dr(Ht, a) && !(dr(n, Cr) && n[Cr][a]) && (i.enumerable = !0), i;
  }
}, DE = function(t) {
  var e = CE(bu(t)), n = [];
  return wu(e, function(a) {
    !dr(Ht, a) && !dr(AE, a) && PE(n, a);
  }), n;
}, LE = function(r) {
  var t = r === Zr, e = CE(t ? Pi : bu(r)), n = [];
  return wu(e, function(a) {
    dr(Ht, a) && (!t || dr(Zr, a)) && PE(n, Ht[a]);
  }), n;
};
Vn || (Ne = function() {
  if (hk(za, this))
    throw new Ok("Symbol is not a constructor");
  var t = !arguments.length || arguments[0] === void 0 ? void 0 : dk(arguments[0]), e = n$(t), n = function(a) {
    var i = this === void 0 ? Ci : this;
    i === Zr && Hh(n, Pi, a), dr(i, Cr) && dr(i[Cr], e) && (i[Cr][e] = !1);
    var o = cv(1, a);
    try {
      vv(i, e, o);
    } catch (s) {
      if (!(s instanceof Ik))
        throw s;
      ME(i, e, o);
    }
  };
  return zn && fv && vv(Zr, e, { configurable: !0, set: n }), Wl(e, t);
}, za = Ne[fi], Hl(za, "toString", function() {
  return a$(this).tag;
}), Hl(Ne, "withoutSetter", function(r) {
  return Wl(n$(r), r);
}), OE.f = hv, IE.f = Eu, $k.f = qh, xE.f = NE, gk.f = TE.f = DE, pk.f = LE, wk.f = function(r) {
  return Wl(bk(r), r);
}, zn && (yk(za, "description", {
  configurable: !0,
  get: function() {
    return a$(this).description;
  }
}), Hl(Zr, "propertyIsEnumerable", hv, { unsafe: !0 })));
mu({ global: !0, constructor: !0, wrap: !0, forced: !Vn, sham: !Vn }, {
  Symbol: Ne
});
wu(EE(Rk), function(r) {
  Sk(r);
});
mu({ target: Su, stat: !0, forced: !Vn }, {
  useSetter: function() {
    fv = !0;
  },
  useSimple: function() {
    fv = !1;
  }
});
mu({ target: "Object", stat: !0, forced: !Vn, sham: !zn }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: _k,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: Eu,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: qh,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: NE
});
mu({ target: "Object", stat: !0, forced: !Vn }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: DE
});
Ek();
Tk(Ne, Su);
AE[Cr] = !0;
var Ck = ra, FE = Ck && !!Symbol.for && !!Symbol.keyFor, Pk = d, Mk = nr, Nk = K, Dk = V, kE = ta, Lk = FE, ql = kE("string-to-symbol-registry"), Fk = kE("symbol-to-string-registry");
Pk({ target: "Symbol", stat: !0, forced: !Lk }, {
  for: function(r) {
    var t = Dk(r);
    if (Nk(ql, t))
      return ql[t];
    var e = Mk("Symbol")(t);
    return ql[t] = e, Fk[e] = t, e;
  }
});
var kk = d, Bk = K, jk = Ge, Uk = We, zk = ta, Vk = FE, i$ = zk("symbol-to-string-registry");
kk({ target: "Symbol", stat: !0, forced: !Vk }, {
  keyFor: function(t) {
    if (!jk(t))
      throw new TypeError(Uk(t) + " is not a symbol");
    if (Bk(i$, t))
      return i$[t];
  }
});
var Hk = wi, BE = Function.prototype, o$ = BE.apply, s$ = BE.call, tt = typeof Reflect == "object" && Reflect.apply || (Hk ? s$.bind(o$) : function() {
  return s$.apply(o$, arguments);
}), Gk = O, u$ = ye, Wk = Y, l$ = Tr, qk = V, c$ = Gk([].push), Yk = function(r) {
  if (Wk(r))
    return r;
  if (u$(r)) {
    for (var t = r.length, e = [], n = 0; n < t; n++) {
      var a = r[n];
      typeof a == "string" ? c$(e, a) : (typeof a == "number" || l$(a) === "Number" || l$(a) === "String") && c$(e, qk(a));
    }
    var i = e.length, o = !0;
    return function(s, u) {
      if (o)
        return o = !1, u;
      if (u$(this))
        return u;
      for (var l = 0; l < i; l++)
        if (e[l] === s)
          return u;
    };
  }
}, Kk = d, jE = nr, UE = tt, Xk = U, Mi = O, zE = x, f$ = Y, v$ = Ge, VE = rt, Jk = Yk, Zk = ra, Qk = String, ve = jE("JSON", "stringify"), co = Mi(/./.exec), h$ = Mi("".charAt), r3 = Mi("".charCodeAt), t3 = Mi("".replace), e3 = Mi(1 .toString), n3 = /[\uD800-\uDFFF]/g, d$ = /^[\uD800-\uDBFF]$/, g$ = /^[\uDC00-\uDFFF]$/, p$ = !Zk || zE(function() {
  var r = jE("Symbol")("stringify detection");
  return ve([r]) !== "[null]" || ve({ a: r }) !== "{}" || ve(Object(r)) !== "{}";
}), $$ = zE(function() {
  return ve("\uDF06\uD834") !== '"\\udf06\\ud834"' || ve("\uDEAD") !== '"\\udead"';
}), a3 = function(r, t) {
  var e = VE(arguments), n = Jk(t);
  if (!(!f$(n) && (r === void 0 || v$(r))))
    return e[1] = function(a, i) {
      if (f$(n) && (i = Xk(n, this, Qk(a), i)), !v$(i))
        return i;
    }, UE(ve, null, e);
}, i3 = function(r, t, e) {
  var n = h$(e, t - 1), a = h$(e, t + 1);
  return co(d$, r) && !co(g$, a) || co(g$, r) && !co(d$, n) ? "\\u" + e3(r3(r, 0), 16) : r;
};
ve && Kk({ target: "JSON", stat: !0, arity: 3, forced: p$ || $$ }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  stringify: function(t, e, n) {
    var a = VE(arguments), i = UE(p$ ? a3 : ve, null, a);
    return $$ && typeof i == "string" ? t3(i, n3, i3) : i;
  }
});
var o3 = d, s3 = ra, u3 = x, HE = xi, l3 = Z, c3 = !s3 || u3(function() {
  HE.f(1);
});
o3({ target: "Object", stat: !0, forced: c3 }, {
  getOwnPropertySymbols: function(t) {
    var e = HE.f;
    return e ? e(l3(t)) : [];
  }
});
var f3 = d, v3 = B, h3 = _, fo = O, d3 = K, g3 = Y, p3 = Nr, $3 = V, y3 = hr, m3 = Ii, kt = h3.Symbol, Se = kt && kt.prototype;
if (v3 && g3(kt) && (!("description" in Se) || // Safari 12 bug
kt().description !== void 0)) {
  var y$ = {}, vo = function() {
    var t = arguments.length < 1 || arguments[0] === void 0 ? void 0 : $3(arguments[0]), e = p3(Se, this) ? new kt(t) : t === void 0 ? kt() : kt(t);
    return t === "" && (y$[e] = !0), e;
  };
  m3(vo, kt), vo.prototype = Se, Se.constructor = vo;
  var b3 = String(kt("description detection")) === "Symbol(description detection)", w3 = fo(Se.valueOf), S3 = fo(Se.toString), E3 = /^Symbol\((.*)\)[^)]+$/, T3 = fo("".replace), x3 = fo("".slice);
  y3(Se, "description", {
    configurable: !0,
    get: function() {
      var t = w3(this);
      if (d3(y$, t))
        return "";
      var e = S3(t), n = b3 ? x3(e, 7, -1) : T3(e, E3, "$1");
      return n === "" ? void 0 : n;
    }
  }), f3({ global: !0, constructor: !0, forced: !0 }, {
    Symbol: vo
  });
}
var I3 = Dr;
I3("asyncIterator");
var O3 = Dr;
O3("hasInstance");
var A3 = Dr;
A3("isConcatSpreadable");
var R3 = Dr;
R3("iterator");
var _3 = Dr;
_3("match");
var C3 = Dr;
C3("matchAll");
var P3 = Dr;
P3("replace");
var M3 = Dr;
M3("search");
var N3 = Dr;
N3("species");
var D3 = Dr;
D3("split");
var L3 = Dr, F3 = yE;
L3("toPrimitive");
F3();
var k3 = nr, B3 = Dr, j3 = Lr;
B3("toStringTag");
j3(k3("Symbol"), "Symbol");
var U3 = Dr;
U3("unscopables");
var z3 = O, V3 = J, Tu = function(r, t, e) {
  try {
    return z3(V3(Object.getOwnPropertyDescriptor(r, t)[e]));
  } catch {
  }
}, H3 = H, GE = function(r) {
  return H3(r) || r === null;
}, G3 = GE, W3 = String, q3 = TypeError, WE = function(r) {
  if (G3(r))
    return r;
  throw new q3("Can't set " + W3(r) + " as a prototype");
}, Y3 = Tu, K3 = H, X3 = or, J3 = WE, Pt = Object.setPrototypeOf || ("__proto__" in {} ? function() {
  var r = !1, t = {}, e;
  try {
    e = Y3(Object.prototype, "__proto__", "set"), e(t, []), r = t instanceof Array;
  } catch {
  }
  return function(a, i) {
    return X3(a), J3(i), K3(a) && (r ? e(a, i) : a.__proto__ = i), a;
  };
}() : void 0), Z3 = sr.f, qE = function(r, t, e) {
  e in r || Z3(r, e, {
    configurable: !0,
    get: function() {
      return t[e];
    },
    set: function(n) {
      t[e] = n;
    }
  });
}, Q3 = Y, rB = H, m$ = Pt, Ye = function(r, t, e) {
  var n, a;
  return (
    // it can work only with native `setPrototypeOf`
    m$ && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    Q3(n = t.constructor) && n !== e && rB(a = n.prototype) && a !== e.prototype && m$(r, a), r
  );
}, tB = V, Ni = function(r, t) {
  return r === void 0 ? arguments.length < 2 ? "" : t : tB(r);
}, eB = H, nB = xr, YE = function(r, t) {
  eB(t) && "cause" in t && nB(r, "cause", t.cause);
}, aB = O, KE = Error, iB = aB("".replace), oB = function(r) {
  return String(new KE(r).stack);
}("zxcasd"), XE = /\n\s*at [^:]*:[^\n]*/, sB = XE.test(oB), Yh = function(r, t) {
  if (sB && typeof r == "string" && !KE.prepareStackTrace)
    for (; t--; )
      r = iB(r, XE, "");
  return r;
}, uB = x, lB = Qr, JE = !uB(function() {
  var r = new Error("a");
  return "stack" in r ? (Object.defineProperty(r, "stack", lB(1, 7)), r.stack !== 7) : !0;
}), cB = xr, fB = Yh, vB = JE, b$ = Error.captureStackTrace, ZE = function(r, t, e, n) {
  vB && (b$ ? b$(r, t) : cB(r, "stack", fB(e, n)));
}, w$ = nr, hB = K, S$ = xr, dB = Nr, E$ = Pt, T$ = Ii, x$ = qE, gB = Ye, pB = Ni, $B = YE, yB = ZE, mB = B, QE = function(r, t, e, n) {
  var a = "stackTraceLimit", i = n ? 2 : 1, o = r.split("."), s = o[o.length - 1], u = w$.apply(null, o);
  if (u) {
    var l = u.prototype;
    if (hB(l, "cause") && delete l.cause, !e)
      return u;
    var c = w$("Error"), f = t(function(v, h) {
      var g = pB(n ? h : v, void 0), $ = n ? new u(v) : new u();
      return g !== void 0 && S$($, "message", g), yB($, f, $.stack, 2), this && dB(l, this) && gB($, this, f), arguments.length > i && $B($, arguments[i]), $;
    });
    f.prototype = l, s !== "Error" ? E$ ? E$(f, c) : T$(f, c, { name: !0 }) : mB && a in u && (x$(f, u, a), x$(f, u, "prepareStackTrace")), T$(f, u);
    try {
      l.name !== s && S$(l, "name", s), l.constructor = f;
    } catch {
    }
    return f;
  }
}, rT = d, bB = _, Mt = tt, tT = QE, dv = "WebAssembly", I$ = bB[dv], Ds = new Error("e", { cause: 7 }).cause !== 7, Ke = function(r, t) {
  var e = {};
  e[r] = tT(r, t, Ds), rT({ global: !0, constructor: !0, arity: 1, forced: Ds }, e);
}, Kh = function(r, t) {
  if (I$ && I$[r]) {
    var e = {};
    e[r] = tT(dv + "." + r, t, Ds), rT({ target: dv, stat: !0, constructor: !0, arity: 1, forced: Ds }, e);
  }
};
Ke("Error", function(r) {
  return function(e) {
    return Mt(r, this, arguments);
  };
});
Ke("EvalError", function(r) {
  return function(e) {
    return Mt(r, this, arguments);
  };
});
Ke("RangeError", function(r) {
  return function(e) {
    return Mt(r, this, arguments);
  };
});
Ke("ReferenceError", function(r) {
  return function(e) {
    return Mt(r, this, arguments);
  };
});
Ke("SyntaxError", function(r) {
  return function(e) {
    return Mt(r, this, arguments);
  };
});
Ke("TypeError", function(r) {
  return function(e) {
    return Mt(r, this, arguments);
  };
});
Ke("URIError", function(r) {
  return function(e) {
    return Mt(r, this, arguments);
  };
});
Kh("CompileError", function(r) {
  return function(e) {
    return Mt(r, this, arguments);
  };
});
Kh("LinkError", function(r) {
  return function(e) {
    return Mt(r, this, arguments);
  };
});
Kh("RuntimeError", function(r) {
  return function(e) {
    return Mt(r, this, arguments);
  };
});
var wB = B, SB = x, EB = k, O$ = Ni, os = Error.prototype.toString, TB = SB(function() {
  if (wB) {
    var r = Object.create(Object.defineProperty({}, "name", { get: function() {
      return this === r;
    } }));
    if (os.call(r) !== "true")
      return !0;
  }
  return os.call({ message: 1, name: 2 }) !== "2: 1" || os.call({}) !== "Error";
}), eT = TB ? function() {
  var t = EB(this), e = O$(t.name, "Error"), n = O$(t.message);
  return e ? n ? e + ": " + n : e : n;
} : os, xB = ur, A$ = eT, R$ = Error.prototype;
R$.toString !== A$ && xB(R$, "toString", A$);
var IB = x, Xh = !IB(function() {
  function r() {
  }
  return r.prototype.constructor = null, Object.getPrototypeOf(new r()) !== r.prototype;
}), OB = K, AB = Y, RB = Z, _B = pu, CB = Xh, _$ = _B("IE_PROTO"), gv = Object, PB = gv.prototype, Vr = CB ? gv.getPrototypeOf : function(r) {
  var t = RB(r);
  if (OB(t, _$))
    return t[_$];
  var e = t.constructor;
  return AB(e) && t instanceof e ? e.prototype : t instanceof gv ? PB : null;
}, Di = {}, MB = G, NB = Di, DB = MB("iterator"), LB = Array.prototype, Jh = function(r) {
  return r !== void 0 && (NB.Array === r || LB[DB] === r);
}, FB = dt, C$ = Ct, kB = Mr, BB = Di, jB = G, UB = jB("iterator"), ia = function(r) {
  if (!kB(r))
    return C$(r, UB) || C$(r, "@@iterator") || BB[FB(r)];
}, zB = U, VB = J, HB = k, GB = We, WB = ia, qB = TypeError, xu = function(r, t) {
  var e = arguments.length < 2 ? WB(r) : t;
  if (VB(e))
    return HB(zB(e, r));
  throw new qB(GB(r) + " is not iterable");
}, YB = U, P$ = k, KB = Ct, Xe = function(r, t, e) {
  var n, a;
  P$(r);
  try {
    if (n = KB(r, "return"), !n) {
      if (t === "throw")
        throw e;
      return e;
    }
    n = YB(n, r);
  } catch (i) {
    a = !0, n = i;
  }
  if (t === "throw")
    throw e;
  if (a)
    throw n;
  return P$(n), e;
}, XB = gt, JB = U, ZB = k, QB = We, r6 = Jh, t6 = ar, M$ = Nr, e6 = xu, n6 = ia, N$ = Xe, a6 = TypeError, ss = function(r, t) {
  this.stopped = r, this.result = t;
}, D$ = ss.prototype, pr = function(r, t, e) {
  var n = e && e.that, a = !!(e && e.AS_ENTRIES), i = !!(e && e.IS_RECORD), o = !!(e && e.IS_ITERATOR), s = !!(e && e.INTERRUPTED), u = XB(t, n), l, c, f, v, h, g, $, y = function(S) {
    return l && N$(l, "normal", S), new ss(!0, S);
  }, p = function(S) {
    return a ? (ZB(S), s ? u(S[0], S[1], y) : u(S[0], S[1])) : s ? u(S, y) : u(S);
  };
  if (i)
    l = r.iterator;
  else if (o)
    l = r;
  else {
    if (c = n6(r), !c)
      throw new a6(QB(r) + " is not iterable");
    if (r6(c)) {
      for (f = 0, v = t6(r); v > f; f++)
        if (h = p(r[f]), h && M$(D$, h))
          return h;
      return new ss(!1);
    }
    l = e6(r, c);
  }
  for (g = i ? r.next : l.next; !($ = JB(g, l)).done; ) {
    try {
      h = p($.value);
    } catch (S) {
      N$(l, "throw", S);
    }
    if (typeof h == "object" && h && M$(D$, h))
      return h;
  }
  return new ss(!1);
}, i6 = d, o6 = Nr, s6 = Vr, Ls = Pt, u6 = Ii, nT = zr, Yl = xr, Kl = Qr, l6 = YE, c6 = ZE, f6 = pr, v6 = Ni, h6 = G, d6 = h6("toStringTag"), Fs = Error, g6 = [].push, Gn = function(t, e) {
  var n = o6(Xl, this), a;
  Ls ? a = Ls(new Fs(), n ? s6(this) : Xl) : (a = n ? this : nT(Xl), Yl(a, d6, "Error")), e !== void 0 && Yl(a, "message", v6(e)), c6(a, Gn, a.stack, 1), arguments.length > 2 && l6(a, arguments[2]);
  var i = [];
  return f6(t, g6, { that: i }), Yl(a, "errors", i), a;
};
Ls ? Ls(Gn, Fs) : u6(Gn, Fs, { name: !0 });
var Xl = Gn.prototype = nT(Fs.prototype, {
  constructor: Kl(1, Gn),
  message: Kl(1, ""),
  name: Kl(1, "AggregateError")
});
i6({ global: !0, constructor: !0, arity: 2 }, {
  AggregateError: Gn
});
var p6 = d, $6 = nr, y6 = tt, L$ = x, m6 = QE, Zh = "AggregateError", F$ = $6(Zh), k$ = !L$(function() {
  return F$([1]).errors[0] !== 1;
}) && L$(function() {
  return F$([1], Zh, { cause: 7 }).cause !== 7;
});
p6({ global: !0, constructor: !0, arity: 2, forced: k$ }, {
  AggregateError: m6(Zh, function(r) {
    return function(e, n) {
      return y6(r, this, arguments);
    };
  }, k$, !0)
});
var b6 = G, w6 = zr, S6 = sr.f, pv = b6("unscopables"), $v = Array.prototype;
$v[pv] === void 0 && S6($v, pv, {
  configurable: !0,
  value: w6(null)
});
var Fr = function(r) {
  $v[pv][r] = !0;
}, E6 = d, T6 = Z, x6 = ar, I6 = cr, O6 = Fr;
E6({ target: "Array", proto: !0 }, {
  at: function(t) {
    var e = T6(this), n = x6(e), a = I6(t), i = a >= 0 ? a : n + a;
    return i < 0 || i >= n ? void 0 : e[i];
  }
});
O6("at");
var A6 = TypeError, R6 = 9007199254740991, oa = function(r) {
  if (r > R6)
    throw A6("Maximum allowed index exceeded");
  return r;
}, _6 = B, C6 = sr, P6 = Qr, Zt = function(r, t, e) {
  _6 ? C6.f(r, t, P6(0, e)) : r[t] = e;
}, M6 = x, N6 = G, D6 = Kt, L6 = N6("species"), Li = function(r) {
  return D6 >= 51 || !M6(function() {
    var t = [], e = t.constructor = {};
    return e[L6] = function() {
      return { foo: 1 };
    }, t[r](Boolean).foo !== 1;
  });
}, F6 = d, k6 = x, B6 = ye, j6 = H, U6 = Z, z6 = ar, B$ = oa, j$ = Zt, V6 = _i, H6 = Li, G6 = G, W6 = Kt, aT = G6("isConcatSpreadable"), q6 = W6 >= 51 || !k6(function() {
  var r = [];
  return r[aT] = !1, r.concat()[0] !== r;
}), Y6 = function(r) {
  if (!j6(r))
    return !1;
  var t = r[aT];
  return t !== void 0 ? !!t : B6(r);
}, K6 = !q6 || !H6("concat");
F6({ target: "Array", proto: !0, arity: 1, forced: K6 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function(t) {
    var e = U6(this), n = V6(e, 0), a = 0, i, o, s, u, l;
    for (i = -1, s = arguments.length; i < s; i++)
      if (l = i === -1 ? e : arguments[i], Y6(l))
        for (u = z6(l), B$(a + u), o = 0; o < u; o++, a++)
          o in l && j$(n, a, l[o]);
      else
        B$(a + 1), j$(n, a++, l);
    return n.length = a, n;
  }
});
var U$ = We, X6 = TypeError, Iu = function(r, t) {
  if (!delete r[t])
    throw new X6("Cannot delete property " + U$(t) + " of " + U$(r));
}, J6 = Z, Jl = Jt, Z6 = ar, Q6 = Iu, rj = Math.min, iT = [].copyWithin || function(t, e) {
  var n = J6(this), a = Z6(n), i = Jl(t, a), o = Jl(e, a), s = arguments.length > 2 ? arguments[2] : void 0, u = rj((s === void 0 ? a : Jl(s, a)) - o, a - i), l = 1;
  for (o < i && i < o + u && (l = -1, o += u - 1, i += u - 1); u-- > 0; )
    o in n ? n[i] = n[o] : Q6(n, i), i += l, o += l;
  return n;
}, tj = d, ej = iT, nj = Fr;
tj({ target: "Array", proto: !0 }, {
  copyWithin: ej
});
nj("copyWithin");
var aj = x, Qt = function(r, t) {
  var e = [][r];
  return !!e && aj(function() {
    e.call(null, t || function() {
      return 1;
    }, 1);
  });
}, ij = d, oj = br.every, sj = Qt, uj = sj("every");
ij({ target: "Array", proto: !0, forced: !uj }, {
  every: function(t) {
    return oj(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var lj = Z, z$ = Jt, cj = ar, Qh = function(t) {
  for (var e = lj(this), n = cj(e), a = arguments.length, i = z$(a > 1 ? arguments[1] : void 0, n), o = a > 2 ? arguments[2] : void 0, s = o === void 0 ? n : z$(o, n); s > i; )
    e[i++] = t;
  return e;
}, fj = d, vj = Qh, hj = Fr;
fj({ target: "Array", proto: !0 }, {
  fill: vj
});
hj("fill");
var dj = d, gj = br.filter, pj = Li, $j = pj("filter");
dj({ target: "Array", proto: !0, forced: !$j }, {
  filter: function(t) {
    return gj(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var yj = d, mj = br.find, bj = Fr, yv = "find", oT = !0;
yv in [] && Array(1)[yv](function() {
  oT = !1;
});
yj({ target: "Array", proto: !0, forced: oT }, {
  find: function(t) {
    return mj(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
bj(yv);
var wj = d, Sj = br.findIndex, Ej = Fr, mv = "findIndex", sT = !0;
mv in [] && Array(1)[mv](function() {
  sT = !1;
});
wj({ target: "Array", proto: !0, forced: sT }, {
  findIndex: function(t) {
    return Sj(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
Ej(mv);
var Tj = gt, xj = Qn, Ij = Z, Oj = ar, V$ = function(r) {
  var t = r === 1;
  return function(e, n, a) {
    for (var i = Ij(e), o = xj(i), s = Oj(o), u = Tj(n, a), l, c; s-- > 0; )
      if (l = o[s], c = u(l, s, i), c)
        switch (r) {
          case 0:
            return l;
          case 1:
            return s;
        }
    return t ? -1 : void 0;
  };
}, Ou = {
  // `Array.prototype.findLast` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLast: V$(0),
  // `Array.prototype.findLastIndex` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLastIndex: V$(1)
}, Aj = d, Rj = Ou.findLast, _j = Fr;
Aj({ target: "Array", proto: !0 }, {
  findLast: function(t) {
    return Rj(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
_j("findLast");
var Cj = d, Pj = Ou.findLastIndex, Mj = Fr;
Cj({ target: "Array", proto: !0 }, {
  findLastIndex: function(t) {
    return Pj(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
Mj("findLastIndex");
var Nj = ye, Dj = ar, Lj = oa, Fj = gt, uT = function(r, t, e, n, a, i, o, s) {
  for (var u = a, l = 0, c = o ? Fj(o, s) : !1, f, v; l < n; )
    l in e && (f = c ? c(e[l], l, t) : e[l], i > 0 && Nj(f) ? (v = Dj(f), u = uT(r, t, f, v, u, i - 1) - 1) : (Lj(u + 1), r[u] = f), u++), l++;
  return u;
}, lT = uT, kj = d, Bj = lT, jj = Z, Uj = ar, zj = cr, Vj = _i;
kj({ target: "Array", proto: !0 }, {
  flat: function() {
    var t = arguments.length ? arguments[0] : void 0, e = jj(this), n = Uj(e), a = Vj(e, 0);
    return a.length = Bj(a, e, e, n, 0, t === void 0 ? 1 : zj(t)), a;
  }
});
var Hj = d, Gj = lT, Wj = J, qj = Z, Yj = ar, Kj = _i;
Hj({ target: "Array", proto: !0 }, {
  flatMap: function(t) {
    var e = qj(this), n = Yj(e), a;
    return Wj(t), a = Kj(e, 0), a.length = Gj(a, e, e, n, 0, 1, t, arguments.length > 1 ? arguments[1] : void 0), a;
  }
});
var Xj = br.forEach, Jj = Qt, Zj = Jj("forEach"), cT = Zj ? [].forEach : function(t) {
  return Xj(this, t, arguments.length > 1 ? arguments[1] : void 0);
}, Qj = d, H$ = cT;
Qj({ target: "Array", proto: !0, forced: [].forEach !== H$ }, {
  forEach: H$
});
var rU = k, tU = Xe, rd = function(r, t, e, n) {
  try {
    return n ? t(rU(e)[0], e[1]) : t(e);
  } catch (a) {
    tU(r, "throw", a);
  }
}, eU = gt, nU = U, aU = Z, iU = rd, oU = Jh, sU = aa, uU = ar, G$ = Zt, lU = xu, cU = ia, W$ = Array, fT = function(t) {
  var e = aU(t), n = sU(this), a = arguments.length, i = a > 1 ? arguments[1] : void 0, o = i !== void 0;
  o && (i = eU(i, a > 2 ? arguments[2] : void 0));
  var s = cU(e), u = 0, l, c, f, v, h, g;
  if (s && !(this === W$ && oU(s)))
    for (c = n ? new this() : [], v = lU(e, s), h = v.next; !(f = nU(h, v)).done; u++)
      g = o ? iU(v, i, [f.value, u], !0) : f.value, G$(c, u, g);
  else
    for (l = uU(e), c = n ? new this(l) : W$(l); l > u; u++)
      g = o ? i(e[u], u) : e[u], G$(c, u, g);
  return c.length = u, c;
}, fU = G, vT = fU("iterator"), hT = !1;
try {
  var vU = 0, q$ = {
    next: function() {
      return { done: !!vU++ };
    },
    return: function() {
      hT = !0;
    }
  };
  q$[vT] = function() {
    return this;
  }, Array.from(q$, function() {
    throw 2;
  });
} catch {
}
var Au = function(r, t) {
  try {
    if (!t && !hT)
      return !1;
  } catch {
    return !1;
  }
  var e = !1;
  try {
    var n = {};
    n[vT] = function() {
      return {
        next: function() {
          return { done: e = !0 };
        }
      };
    }, r(n);
  } catch {
  }
  return e;
}, hU = d, dU = fT, gU = Au, pU = !gU(function(r) {
  Array.from(r);
});
hU({ target: "Array", stat: !0, forced: pU }, {
  from: dU
});
var $U = d, yU = Ti.includes, mU = x, bU = Fr, wU = mU(function() {
  return !Array(1).includes();
});
$U({ target: "Array", proto: !0, forced: wU }, {
  includes: function(t) {
    return yU(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
bU("includes");
var SU = d, EU = qe, TU = Ti.indexOf, xU = Qt, bv = EU([].indexOf), dT = !!bv && 1 / bv([1], 1, -0) < 0, IU = dT || !xU("indexOf");
SU({ target: "Array", proto: !0, forced: IU }, {
  indexOf: function(t) {
    var e = arguments.length > 1 ? arguments[1] : void 0;
    return dT ? bv(this, t, e) || 0 : TU(this, t, e);
  }
});
var OU = d, AU = ye;
OU({ target: "Array", stat: !0 }, {
  isArray: AU
});
var RU = x, _U = Y, CU = H, Y$ = Vr, PU = ur, MU = G, wv = MU("iterator"), gT = !1, Ue, Zl, Ql;
[].keys && (Ql = [].keys(), "next" in Ql ? (Zl = Y$(Y$(Ql)), Zl !== Object.prototype && (Ue = Zl)) : gT = !0);
var NU = !CU(Ue) || RU(function() {
  var r = {};
  return Ue[wv].call(r) !== r;
});
NU && (Ue = {});
_U(Ue[wv]) || PU(Ue, wv, function() {
  return this;
});
var Fi = {
  IteratorPrototype: Ue,
  BUGGY_SAFARI_ITERATORS: gT
}, DU = Fi.IteratorPrototype, LU = zr, FU = Qr, kU = Lr, BU = Di, jU = function() {
  return this;
}, td = function(r, t, e, n) {
  var a = t + " Iterator";
  return r.prototype = LU(DU, { next: FU(+!n, e) }), kU(r, a, !1), BU[a] = jU, r;
}, UU = d, zU = U, pT = na, VU = Y, HU = td, K$ = Vr, X$ = Pt, GU = Lr, WU = xr, rc = ur, qU = G, YU = Di, $T = Fi, KU = pT.PROPER, XU = pT.CONFIGURABLE, J$ = $T.IteratorPrototype, ho = $T.BUGGY_SAFARI_ITERATORS, xa = qU("iterator"), Z$ = "keys", Ia = "values", Q$ = "entries", JU = function() {
  return this;
}, ed = function(r, t, e, n, a, i, o) {
  HU(e, t, n);
  var s = function(p) {
    if (p === a && v)
      return v;
    if (!ho && p && p in c)
      return c[p];
    switch (p) {
      case Z$:
        return function() {
          return new e(this, p);
        };
      case Ia:
        return function() {
          return new e(this, p);
        };
      case Q$:
        return function() {
          return new e(this, p);
        };
    }
    return function() {
      return new e(this);
    };
  }, u = t + " Iterator", l = !1, c = r.prototype, f = c[xa] || c["@@iterator"] || a && c[a], v = !ho && f || s(a), h = t === "Array" && c.entries || f, g, $, y;
  if (h && (g = K$(h.call(new r())), g !== Object.prototype && g.next && (K$(g) !== J$ && (X$ ? X$(g, J$) : VU(g[xa]) || rc(g, xa, JU)), GU(g, u, !0))), KU && a === Ia && f && f.name !== Ia && (XU ? WU(c, "name", Ia) : (l = !0, v = function() {
    return zU(f, this);
  })), a)
    if ($ = {
      values: s(Ia),
      keys: i ? v : s(Z$),
      entries: s(Q$)
    }, o)
      for (y in $)
        (ho || l || !(y in c)) && rc(c, y, $[y]);
    else
      UU({ target: t, proto: !0, forced: ho || l }, $);
  return c[xa] !== v && rc(c, xa, v, { name: a }), YU[t] = v, $;
}, sa = function(r, t) {
  return { value: r, done: t };
}, ZU = gr, nd = Fr, ry = Di, yT = vr, QU = sr.f, r4 = ed, go = sa, t4 = B, mT = "Array Iterator", e4 = yT.set, n4 = yT.getterFor(mT), bT = r4(Array, "Array", function(r, t) {
  e4(this, {
    type: mT,
    target: ZU(r),
    // target
    index: 0,
    // next index
    kind: t
    // kind
  });
}, function() {
  var r = n4(this), t = r.target, e = r.index++;
  if (!t || e >= t.length)
    return r.target = null, go(void 0, !0);
  switch (r.kind) {
    case "keys":
      return go(e, !1);
    case "values":
      return go(t[e], !1);
  }
  return go([e, t[e]], !1);
}, "values"), ty = ry.Arguments = ry.Array;
nd("keys");
nd("values");
nd("entries");
if (t4 && ty.name !== "values")
  try {
    QU(ty, "name", { value: "values" });
  } catch {
  }
var a4 = d, i4 = O, o4 = Qn, s4 = gr, u4 = Qt, l4 = i4([].join), c4 = o4 !== Object, f4 = c4 || !u4("join", ",");
a4({ target: "Array", proto: !0, forced: f4 }, {
  join: function(t) {
    return l4(s4(this), t === void 0 ? "," : t);
  }
});
var v4 = tt, h4 = gr, d4 = cr, g4 = ar, p4 = Qt, $4 = Math.min, Sv = [].lastIndexOf, wT = !!Sv && 1 / [1].lastIndexOf(1, -0) < 0, y4 = p4("lastIndexOf"), m4 = wT || !y4, ST = m4 ? function(t) {
  if (wT)
    return v4(Sv, this, arguments) || 0;
  var e = h4(this), n = g4(e);
  if (n === 0)
    return -1;
  var a = n - 1;
  for (arguments.length > 1 && (a = $4(a, d4(arguments[1]))), a < 0 && (a = n + a); a >= 0; a--)
    if (a in e && e[a] === t)
      return a || 0;
  return -1;
} : Sv, b4 = d, ey = ST;
b4({ target: "Array", proto: !0, forced: ey !== [].lastIndexOf }, {
  lastIndexOf: ey
});
var w4 = d, S4 = br.map, E4 = Li, T4 = E4("map");
w4({ target: "Array", proto: !0, forced: !T4 }, {
  map: function(t) {
    return S4(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var x4 = d, I4 = x, O4 = aa, A4 = Zt, ET = Array, R4 = I4(function() {
  function r() {
  }
  return !(ET.of.call(r) instanceof r);
});
x4({ target: "Array", stat: !0, forced: R4 }, {
  of: function() {
    for (var t = 0, e = arguments.length, n = new (O4(this) ? this : ET)(e); e > t; )
      A4(n, t, arguments[t++]);
    return n.length = e, n;
  }
});
var _4 = B, C4 = ye, P4 = TypeError, M4 = Object.getOwnPropertyDescriptor, N4 = _4 && !function() {
  if (this !== void 0)
    return !0;
  try {
    Object.defineProperty([], "length", { writable: !1 }).length = 1;
  } catch (r) {
    return r instanceof TypeError;
  }
}(), ad = N4 ? function(r, t) {
  if (C4(r) && !M4(r, "length").writable)
    throw new P4("Cannot set read only .length");
  return r.length = t;
} : function(r, t) {
  return r.length = t;
}, D4 = d, L4 = Z, F4 = ar, k4 = ad, B4 = oa, j4 = x, U4 = j4(function() {
  return [].push.call({ length: 4294967296 }, 1) !== 4294967297;
}), z4 = function() {
  try {
    Object.defineProperty([], "length", { writable: !1 }).push();
  } catch (r) {
    return r instanceof TypeError;
  }
}, V4 = U4 || !z4();
D4({ target: "Array", proto: !0, arity: 1, forced: V4 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function(t) {
    var e = L4(this), n = F4(e), a = arguments.length;
    B4(n + a);
    for (var i = 0; i < a; i++)
      e[n] = arguments[i], n++;
    return k4(e, n), n;
  }
});
var H4 = J, G4 = Z, W4 = Qn, q4 = ar, ny = TypeError, ay = "Reduce of empty array with no initial value", iy = function(r) {
  return function(t, e, n, a) {
    var i = G4(t), o = W4(i), s = q4(i);
    if (H4(e), s === 0 && n < 2)
      throw new ny(ay);
    var u = r ? s - 1 : 0, l = r ? -1 : 1;
    if (n < 2)
      for (; ; ) {
        if (u in o) {
          a = o[u], u += l;
          break;
        }
        if (u += l, r ? u < 0 : s <= u)
          throw new ny(ay);
      }
    for (; r ? u >= 0 : s > u; u += l)
      u in o && (a = e(a, o[u], u, i));
    return a;
  };
}, Ru = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: iy(!1),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: iy(!0)
}, Oa = _, Y4 = _t, K4 = Tr, po = function(r) {
  return Y4.slice(0, r.length) === r;
}, _u = function() {
  return po("Bun/") ? "BUN" : po("Cloudflare-Workers") ? "CLOUDFLARE" : po("Deno/") ? "DENO" : po("Node.js/") ? "NODE" : Oa.Bun && typeof Bun.version == "string" ? "BUN" : Oa.Deno && typeof Deno.version == "object" ? "DENO" : K4(Oa.process) === "process" ? "NODE" : Oa.window && Oa.document ? "BROWSER" : "REST";
}(), X4 = _u, ua = X4 === "NODE", J4 = d, Z4 = Ru.left, Q4 = Qt, oy = Kt, r5 = ua, t5 = !r5 && oy > 79 && oy < 83, e5 = t5 || !Q4("reduce");
J4({ target: "Array", proto: !0, forced: e5 }, {
  reduce: function(t) {
    var e = arguments.length;
    return Z4(this, t, e, e > 1 ? arguments[1] : void 0);
  }
});
var n5 = d, a5 = Ru.right, i5 = Qt, sy = Kt, o5 = ua, s5 = !o5 && sy > 79 && sy < 83, u5 = s5 || !i5("reduceRight");
n5({ target: "Array", proto: !0, forced: u5 }, {
  reduceRight: function(t) {
    return a5(this, t, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var l5 = d, c5 = O, f5 = ye, v5 = c5([].reverse), uy = [1, 2];
l5({ target: "Array", proto: !0, forced: String(uy) === String(uy.reverse()) }, {
  reverse: function() {
    return f5(this) && (this.length = this.length), v5(this);
  }
});
var h5 = d, ly = ye, d5 = aa, g5 = H, cy = Jt, p5 = ar, $5 = gr, y5 = Zt, m5 = G, b5 = Li, w5 = rt, S5 = b5("slice"), E5 = m5("species"), tc = Array, T5 = Math.max;
h5({ target: "Array", proto: !0, forced: !S5 }, {
  slice: function(t, e) {
    var n = $5(this), a = p5(n), i = cy(t, a), o = cy(e === void 0 ? a : e, a), s, u, l;
    if (ly(n) && (s = n.constructor, d5(s) && (s === tc || ly(s.prototype)) ? s = void 0 : g5(s) && (s = s[E5], s === null && (s = void 0)), s === tc || s === void 0))
      return w5(n, i, o);
    for (u = new (s === void 0 ? tc : s)(T5(o - i, 0)), l = 0; i < o; i++, l++)
      i in n && y5(u, l, n[i]);
    return u.length = l, u;
  }
});
var x5 = d, I5 = br.some, O5 = Qt, A5 = O5("some");
x5({ target: "Array", proto: !0, forced: !A5 }, {
  some: function(t) {
    return I5(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var fy = rt, R5 = Math.floor, Ev = function(r, t) {
  var e = r.length;
  if (e < 8)
    for (var n = 1, a, i; n < e; ) {
      for (i = n, a = r[n]; i && t(r[i - 1], a) > 0; )
        r[i] = r[--i];
      i !== n++ && (r[i] = a);
    }
  else
    for (var o = R5(e / 2), s = Ev(fy(r, 0, o), t), u = Ev(fy(r, o), t), l = s.length, c = u.length, f = 0, v = 0; f < l || v < c; )
      r[f + v] = f < l && v < c ? t(s[f], u[v]) <= 0 ? s[f++] : u[v++] : f < l ? s[f++] : u[v++];
  return r;
}, id = Ev, _5 = _t, vy = _5.match(/firefox\/(\d+)/i), TT = !!vy && +vy[1], C5 = _t, xT = /MSIE|Trident/.test(C5), P5 = _t, hy = P5.match(/AppleWebKit\/(\d+)\./), od = !!hy && +hy[1], M5 = d, IT = O, N5 = J, D5 = Z, dy = ar, L5 = Iu, gy = V, sd = x, F5 = id, k5 = Qt, py = TT, B5 = xT, $y = Kt, yy = od, ue = [], my = IT(ue.sort), j5 = IT(ue.push), U5 = sd(function() {
  ue.sort(void 0);
}), z5 = sd(function() {
  ue.sort(null);
}), V5 = k5("sort"), OT = !sd(function() {
  if ($y)
    return $y < 70;
  if (!(py && py > 3)) {
    if (B5)
      return !0;
    if (yy)
      return yy < 603;
    var r = "", t, e, n, a;
    for (t = 65; t < 76; t++) {
      switch (e = String.fromCharCode(t), t) {
        case 66:
        case 69:
        case 70:
        case 72:
          n = 3;
          break;
        case 68:
        case 71:
          n = 4;
          break;
        default:
          n = 2;
      }
      for (a = 0; a < 47; a++)
        ue.push({ k: e + a, v: n });
    }
    for (ue.sort(function(i, o) {
      return o.v - i.v;
    }), a = 0; a < ue.length; a++)
      e = ue[a].k.charAt(0), r.charAt(r.length - 1) !== e && (r += e);
    return r !== "DGBEFHACIJK";
  }
}), H5 = U5 || !z5 || !V5 || !OT, G5 = function(r) {
  return function(t, e) {
    return e === void 0 ? -1 : t === void 0 ? 1 : r !== void 0 ? +r(t, e) || 0 : gy(t) > gy(e) ? 1 : -1;
  };
};
M5({ target: "Array", proto: !0, forced: H5 }, {
  sort: function(t) {
    t !== void 0 && N5(t);
    var e = D5(this);
    if (OT)
      return t === void 0 ? my(e) : my(e, t);
    var n = [], a = dy(e), i, o;
    for (o = 0; o < a; o++)
      o in e && j5(n, e[o]);
    for (F5(n, G5(t)), i = dy(n), o = 0; o < i; )
      e[o] = n[o++];
    for (; o < a; )
      L5(e, o++);
    return e;
  }
});
var W5 = nr, q5 = hr, Y5 = G, K5 = B, by = Y5("species"), la = function(r) {
  var t = W5(r);
  K5 && t && !t[by] && q5(t, by, {
    configurable: !0,
    get: function() {
      return this;
    }
  });
}, X5 = la;
X5("Array");
var J5 = d, Z5 = Z, Q5 = Jt, r8 = cr, t8 = ar, e8 = ad, n8 = oa, a8 = _i, i8 = Zt, ec = Iu, o8 = Li, s8 = o8("splice"), u8 = Math.max, l8 = Math.min;
J5({ target: "Array", proto: !0, forced: !s8 }, {
  splice: function(t, e) {
    var n = Z5(this), a = t8(n), i = Q5(t, a), o = arguments.length, s, u, l, c, f, v;
    for (o === 0 ? s = u = 0 : o === 1 ? (s = 0, u = a - i) : (s = o - 2, u = l8(u8(r8(e), 0), a - i)), n8(a + s - u), l = a8(n, u), c = 0; c < u; c++)
      f = i + c, f in n && i8(l, c, n[f]);
    if (l.length = u, s < u) {
      for (c = i; c < a - u; c++)
        f = c + u, v = c + s, f in n ? n[v] = n[f] : ec(n, v);
      for (c = a; c > a - u + s; c--)
        ec(n, c - 1);
    } else if (s > u)
      for (c = a - u; c > i; c--)
        f = c + u - 1, v = c + s - 1, f in n ? n[v] = n[f] : ec(n, v);
    for (c = 0; c < s; c++)
      n[c + i] = arguments[c + 2];
    return e8(n, a - u + s), l;
  }
});
var c8 = ar, AT = function(r, t) {
  for (var e = c8(r), n = new t(e), a = 0; a < e; a++)
    n[a] = r[e - a - 1];
  return n;
}, f8 = d, v8 = AT, h8 = gr, d8 = Fr, g8 = Array;
f8({ target: "Array", proto: !0 }, {
  toReversed: function() {
    return v8(h8(this), g8);
  }
});
d8("toReversed");
var p8 = ar, Cu = function(r, t, e) {
  for (var n = 0, a = arguments.length > 2 ? e : p8(t), i = new r(a); a > n; )
    i[n] = t[n++];
  return i;
}, $8 = _, y8 = function(r, t) {
  var e = $8[r], n = e && e.prototype;
  return n && n[t];
}, m8 = d, b8 = O, w8 = J, S8 = gr, E8 = Cu, T8 = y8, x8 = Fr, I8 = Array, O8 = b8(T8("Array", "sort"));
m8({ target: "Array", proto: !0 }, {
  toSorted: function(t) {
    t !== void 0 && w8(t);
    var e = S8(this), n = E8(I8, e);
    return O8(n, t);
  }
});
x8("toSorted");
var A8 = d, R8 = Fr, _8 = oa, C8 = ar, P8 = Jt, M8 = gr, N8 = cr, D8 = Array, L8 = Math.max, F8 = Math.min;
A8({ target: "Array", proto: !0 }, {
  toSpliced: function(t, e) {
    var n = M8(this), a = C8(n), i = P8(t, a), o = arguments.length, s = 0, u, l, c, f;
    for (o === 0 ? u = l = 0 : o === 1 ? (u = 0, l = a - i) : (u = o - 2, l = F8(L8(N8(e), 0), a - i)), c = _8(a + u - l), f = D8(c); s < i; s++)
      f[s] = n[s];
    for (; s < i + u; s++)
      f[s] = arguments[s - i + 2];
    for (; s < c; s++)
      f[s] = n[s + l - u];
    return f;
  }
});
R8("toSpliced");
var k8 = Fr;
k8("flat");
var B8 = Fr;
B8("flatMap");
var j8 = d, U8 = Z, z8 = ar, V8 = ad, H8 = Iu, G8 = oa, W8 = [].unshift(0) !== 1, q8 = function() {
  try {
    Object.defineProperty([], "length", { writable: !1 }).unshift();
  } catch (r) {
    return r instanceof TypeError;
  }
}, Y8 = W8 || !q8();
j8({ target: "Array", proto: !0, arity: 1, forced: Y8 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  unshift: function(t) {
    var e = U8(this), n = z8(e), a = arguments.length;
    if (a) {
      G8(n + a);
      for (var i = n; i--; ) {
        var o = i + a;
        i in e ? e[o] = e[i] : H8(e, o);
      }
      for (var s = 0; s < a; s++)
        e[s] = arguments[s];
    }
    return V8(e, n + a);
  }
});
var K8 = ar, X8 = cr, J8 = RangeError, RT = function(r, t, e, n) {
  var a = K8(r), i = X8(e), o = i < 0 ? a + i : i;
  if (o >= a || o < 0)
    throw new J8("Incorrect index");
  for (var s = new t(a), u = 0; u < a; u++)
    s[u] = u === o ? n : r[u];
  return s;
}, Z8 = d, Q8 = RT, rz = gr, tz = Array;
Z8({ target: "Array", proto: !0 }, {
  with: function(r, t) {
    return Q8(rz(this), tz, r, t);
  }
});
var Pu = typeof ArrayBuffer < "u" && typeof DataView < "u", ez = ur, ca = function(r, t, e) {
  for (var n in t)
    ez(r, n, t[n], e);
  return r;
}, nz = Nr, az = TypeError, pt = function(r, t) {
  if (nz(t, r))
    return r;
  throw new az("Incorrect invocation");
}, iz = cr, oz = Ur, sz = RangeError, Mu = function(r) {
  if (r === void 0)
    return 0;
  var t = iz(r), e = oz(t);
  if (t !== e)
    throw new sz("Wrong length or index");
  return e;
}, ud = Math.sign || function(t) {
  var e = +t;
  return e === 0 || e !== e ? e : e < 0 ? -1 : 1;
}, uz = 2220446049250313e-31, wy = 1 / uz, _T = function(r) {
  return r + wy - wy;
}, lz = ud, cz = _T, fz = Math.abs, vz = 2220446049250313e-31, CT = function(r, t, e, n) {
  var a = +r, i = fz(a), o = lz(a);
  if (i < n)
    return o * cz(i / n / t) * n * t;
  var s = (1 + t / vz) * i, u = s - (s - i);
  return u > e || u !== u ? o * (1 / 0) : o * u;
}, hz = CT, dz = 11920928955078125e-23, gz = 34028234663852886e22, pz = 11754943508222875e-54, PT = Math.fround || function(t) {
  return hz(t, dz, gz, pz);
}, $z = Array, yz = Math.abs, Bt = Math.pow, mz = Math.floor, bz = Math.log, wz = Math.LN2, Sz = function(r, t, e) {
  var n = $z(e), a = e * 8 - t - 1, i = (1 << a) - 1, o = i >> 1, s = t === 23 ? Bt(2, -24) - Bt(2, -77) : 0, u = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0, l = 0, c, f, v;
  for (r = yz(r), r !== r || r === 1 / 0 ? (f = r !== r ? 1 : 0, c = i) : (c = mz(bz(r) / wz), v = Bt(2, -c), r * v < 1 && (c--, v *= 2), c + o >= 1 ? r += s / v : r += s * Bt(2, 1 - o), r * v >= 2 && (c++, v /= 2), c + o >= i ? (f = 0, c = i) : c + o >= 1 ? (f = (r * v - 1) * Bt(2, t), c += o) : (f = r * Bt(2, o - 1) * Bt(2, t), c = 0)); t >= 8; )
    n[l++] = f & 255, f /= 256, t -= 8;
  for (c = c << t | f, a += t; a > 0; )
    n[l++] = c & 255, c /= 256, a -= 8;
  return n[l - 1] |= u * 128, n;
}, Ez = function(r, t) {
  var e = r.length, n = e * 8 - t - 1, a = (1 << n) - 1, i = a >> 1, o = n - 7, s = e - 1, u = r[s--], l = u & 127, c;
  for (u >>= 7; o > 0; )
    l = l * 256 + r[s--], o -= 8;
  for (c = l & (1 << -o) - 1, l >>= -o, o += t; o > 0; )
    c = c * 256 + r[s--], o -= 8;
  if (l === 0)
    l = 1 - i;
  else {
    if (l === a)
      return c ? NaN : u ? -1 / 0 : 1 / 0;
    c += Bt(2, t), l -= i;
  }
  return (u ? -1 : 1) * c * Bt(2, l - t);
}, Tz = {
  pack: Sz,
  unpack: Ez
}, Nu = _, ld = O, nc = B, xz = Pu, MT = na, Iz = xr, Oz = hr, Sy = ca, ac = x, $o = pt, Az = cr, Rz = Ur, ks = Mu, _z = PT, NT = Tz, Cz = Vr, Ey = Pt, Pz = Qh, Mz = rt, Nz = Ye, Dz = Ii, DT = Lr, cd = vr, Lz = MT.PROPER, Ty = MT.CONFIGURABLE, _n = "ArrayBuffer", Du = "DataView", Cn = "prototype", Fz = "Wrong length", LT = "Wrong index", xy = cd.getterFor(_n), Ya = cd.getterFor(Du), Iy = cd.set, ot = Nu[_n], kr = ot, an = kr && kr[Cn], Et = Nu[Du], Ee = Et && Et[Cn], Oy = Object.prototype, kz = Nu.Array, Bs = Nu.RangeError, Bz = ld(Pz), jz = ld([].reverse), FT = NT.pack, Ay = NT.unpack, Ry = function(r) {
  return [r & 255];
}, _y = function(r) {
  return [r & 255, r >> 8 & 255];
}, Cy = function(r) {
  return [r & 255, r >> 8 & 255, r >> 16 & 255, r >> 24 & 255];
}, Py = function(r) {
  return r[3] << 24 | r[2] << 16 | r[1] << 8 | r[0];
}, Uz = function(r) {
  return FT(_z(r), 23, 4);
}, zz = function(r) {
  return FT(r, 52, 8);
}, yo = function(r, t, e) {
  Oz(r[Cn], t, {
    configurable: !0,
    get: function() {
      return e(this)[t];
    }
  });
}, ae = function(r, t, e, n) {
  var a = Ya(r), i = ks(e), o = !!n;
  if (i + t > a.byteLength)
    throw new Bs(LT);
  var s = a.bytes, u = i + a.byteOffset, l = Mz(s, u, u + t);
  return o ? l : jz(l);
}, ie = function(r, t, e, n, a, i) {
  var o = Ya(r), s = ks(e), u = n(+a), l = !!i;
  if (s + t > o.byteLength)
    throw new Bs(LT);
  for (var c = o.bytes, f = s + o.byteOffset, v = 0; v < t; v++)
    c[f + v] = u[l ? v : t - v - 1];
};
if (!xz)
  kr = function(t) {
    $o(this, an);
    var e = ks(t);
    Iy(this, {
      type: _n,
      bytes: Bz(kz(e), 0),
      byteLength: e
    }), nc || (this.byteLength = e, this.detached = !1);
  }, an = kr[Cn], Et = function(t, e, n) {
    $o(this, Ee), $o(t, an);
    var a = xy(t), i = a.byteLength, o = Az(e);
    if (o < 0 || o > i)
      throw new Bs("Wrong offset");
    if (n = n === void 0 ? i - o : Rz(n), o + n > i)
      throw new Bs(Fz);
    Iy(this, {
      type: Du,
      buffer: t,
      byteLength: n,
      byteOffset: o,
      bytes: a.bytes
    }), nc || (this.buffer = t, this.byteLength = n, this.byteOffset = o);
  }, Ee = Et[Cn], nc && (yo(kr, "byteLength", xy), yo(Et, "buffer", Ya), yo(Et, "byteLength", Ya), yo(Et, "byteOffset", Ya)), Sy(Ee, {
    getInt8: function(t) {
      return ae(this, 1, t)[0] << 24 >> 24;
    },
    getUint8: function(t) {
      return ae(this, 1, t)[0];
    },
    getInt16: function(t) {
      var e = ae(this, 2, t, arguments.length > 1 ? arguments[1] : !1);
      return (e[1] << 8 | e[0]) << 16 >> 16;
    },
    getUint16: function(t) {
      var e = ae(this, 2, t, arguments.length > 1 ? arguments[1] : !1);
      return e[1] << 8 | e[0];
    },
    getInt32: function(t) {
      return Py(ae(this, 4, t, arguments.length > 1 ? arguments[1] : !1));
    },
    getUint32: function(t) {
      return Py(ae(this, 4, t, arguments.length > 1 ? arguments[1] : !1)) >>> 0;
    },
    getFloat32: function(t) {
      return Ay(ae(this, 4, t, arguments.length > 1 ? arguments[1] : !1), 23);
    },
    getFloat64: function(t) {
      return Ay(ae(this, 8, t, arguments.length > 1 ? arguments[1] : !1), 52);
    },
    setInt8: function(t, e) {
      ie(this, 1, t, Ry, e);
    },
    setUint8: function(t, e) {
      ie(this, 1, t, Ry, e);
    },
    setInt16: function(t, e) {
      ie(this, 2, t, _y, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setUint16: function(t, e) {
      ie(this, 2, t, _y, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setInt32: function(t, e) {
      ie(this, 4, t, Cy, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setUint32: function(t, e) {
      ie(this, 4, t, Cy, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setFloat32: function(t, e) {
      ie(this, 4, t, Uz, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setFloat64: function(t, e) {
      ie(this, 8, t, zz, e, arguments.length > 2 ? arguments[2] : !1);
    }
  });
else {
  var My = Lz && ot.name !== _n;
  !ac(function() {
    ot(1);
  }) || !ac(function() {
    new ot(-1);
  }) || ac(function() {
    return new ot(), new ot(1.5), new ot(NaN), ot.length !== 1 || My && !Ty;
  }) ? (kr = function(t) {
    return $o(this, an), Nz(new ot(ks(t)), this, kr);
  }, kr[Cn] = an, an.constructor = kr, Dz(kr, ot)) : My && Ty && Iz(ot, "name", _n), Ey && Cz(Ee) !== Oy && Ey(Ee, Oy);
  var mo = new Et(new kr(2)), Ny = ld(Ee.setInt8);
  mo.setInt8(0, 2147483648), mo.setInt8(1, 2147483649), (mo.getInt8(0) || !mo.getInt8(1)) && Sy(Ee, {
    setInt8: function(t, e) {
      Ny(this, t, e << 24 >> 24);
    },
    setUint8: function(t, e) {
      Ny(this, t, e << 24 >> 24);
    }
  }, { unsafe: !0 });
}
DT(kr, _n);
DT(Et, Du);
var Lu = {
  ArrayBuffer: kr,
  DataView: Et
}, Vz = d, Hz = _, Gz = Lu, Wz = la, fd = "ArrayBuffer", Dy = Gz[fd], qz = Hz[fd];
Vz({ global: !0, constructor: !0, forced: qz !== Dy }, {
  ArrayBuffer: Dy
});
Wz(fd);
var Yz = Pu, vd = B, Ar = _, kT = Y, Fu = H, de = K, hd = dt, Kz = We, Xz = xr, Tv = ur, Jz = hr, Zz = Nr, ku = Vr, fa = Pt, Qz = G, r7 = ea, BT = vr, jT = BT.enforce, t7 = BT.get, js = Ar.Int8Array, xv = js && js.prototype, Ly = Ar.Uint8ClampedArray, Fy = Ly && Ly.prototype, Tt = js && ku(js), ft = xv && ku(xv), e7 = Object.prototype, dd = Ar.TypeError, ky = Qz("toStringTag"), Iv = r7("TYPED_ARRAY_TAG"), Us = "TypedArrayConstructor", Gt = Yz && !!fa && hd(Ar.opera) !== "Opera", UT = !1, Pr, le, Pn, Wt = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
}, gd = {
  BigInt64Array: 8,
  BigUint64Array: 8
}, n7 = function(t) {
  if (!Fu(t))
    return !1;
  var e = hd(t);
  return e === "DataView" || de(Wt, e) || de(gd, e);
}, zT = function(r) {
  var t = ku(r);
  if (Fu(t)) {
    var e = t7(t);
    return e && de(e, Us) ? e[Us] : zT(t);
  }
}, VT = function(r) {
  if (!Fu(r))
    return !1;
  var t = hd(r);
  return de(Wt, t) || de(gd, t);
}, a7 = function(r) {
  if (VT(r))
    return r;
  throw new dd("Target is not a typed array");
}, i7 = function(r) {
  if (kT(r) && (!fa || Zz(Tt, r)))
    return r;
  throw new dd(Kz(r) + " is not a typed array constructor");
}, o7 = function(r, t, e, n) {
  if (vd) {
    if (e)
      for (var a in Wt) {
        var i = Ar[a];
        if (i && de(i.prototype, r))
          try {
            delete i.prototype[r];
          } catch {
            try {
              i.prototype[r] = t;
            } catch {
            }
          }
      }
    (!ft[r] || e) && Tv(ft, r, e ? t : Gt && xv[r] || t, n);
  }
}, s7 = function(r, t, e) {
  var n, a;
  if (vd) {
    if (fa) {
      if (e) {
        for (n in Wt)
          if (a = Ar[n], a && de(a, r))
            try {
              delete a[r];
            } catch {
            }
      }
      if (!Tt[r] || e)
        try {
          return Tv(Tt, r, e ? t : Gt && Tt[r] || t);
        } catch {
        }
      else
        return;
    }
    for (n in Wt)
      a = Ar[n], a && (!a[r] || e) && Tv(a, r, t);
  }
};
for (Pr in Wt)
  le = Ar[Pr], Pn = le && le.prototype, Pn ? jT(Pn)[Us] = le : Gt = !1;
for (Pr in gd)
  le = Ar[Pr], Pn = le && le.prototype, Pn && (jT(Pn)[Us] = le);
if ((!Gt || !kT(Tt) || Tt === Function.prototype) && (Tt = function() {
  throw new dd("Incorrect invocation");
}, Gt))
  for (Pr in Wt)
    Ar[Pr] && fa(Ar[Pr], Tt);
if ((!Gt || !ft || ft === e7) && (ft = Tt.prototype, Gt))
  for (Pr in Wt)
    Ar[Pr] && fa(Ar[Pr].prototype, ft);
Gt && ku(Fy) !== ft && fa(Fy, ft);
if (vd && !de(ft, ky)) {
  UT = !0, Jz(ft, ky, {
    configurable: !0,
    get: function() {
      return Fu(this) ? this[Iv] : void 0;
    }
  });
  for (Pr in Wt)
    Ar[Pr] && Xz(Ar[Pr], Iv, Pr);
}
var q = {
  NATIVE_ARRAY_BUFFER_VIEWS: Gt,
  TYPED_ARRAY_TAG: UT && Iv,
  aTypedArray: a7,
  aTypedArrayConstructor: i7,
  exportTypedArrayMethod: o7,
  exportTypedArrayStaticMethod: s7,
  getTypedArrayConstructor: zT,
  isView: n7,
  isTypedArray: VT,
  TypedArray: Tt,
  TypedArrayPrototype: ft
}, u7 = d, HT = q, l7 = HT.NATIVE_ARRAY_BUFFER_VIEWS;
u7({ target: "ArrayBuffer", stat: !0, forced: !l7 }, {
  isView: HT.isView
});
var c7 = d, pd = qe, f7 = x, GT = Lu, By = k, jy = Jt, v7 = Ur, $d = GT.ArrayBuffer, Ov = GT.DataView, WT = Ov.prototype, Uy = pd($d.prototype.slice), h7 = pd(WT.getUint8), d7 = pd(WT.setUint8), g7 = f7(function() {
  return !new $d(2).slice(1, void 0).byteLength;
});
c7({ target: "ArrayBuffer", proto: !0, unsafe: !0, forced: g7 }, {
  slice: function(t, e) {
    if (Uy && e === void 0)
      return Uy(By(this), t);
    for (var n = By(this).byteLength, a = jy(t, n), i = jy(e === void 0 ? n : e, n), o = new $d(v7(i - a)), s = new Ov(this), u = new Ov(o), l = 0; a < i; )
      d7(u, l++, h7(s, a++));
    return o;
  }
});
var p7 = d, $7 = Lu, y7 = Pu;
p7({ global: !0, constructor: !0, forced: !y7 }, {
  DataView: $7.DataView
});
var m7 = d, b7 = O, qT = Math.pow, zy = 31, w7 = 1023, Vy = qT(2, -24), Hy = 9765625e-10, S7 = function(r) {
  var t = r >>> 15, e = r >>> 10 & zy, n = r & w7;
  return e === zy ? n === 0 ? t === 0 ? 1 / 0 : -1 / 0 : NaN : e === 0 ? n * (t === 0 ? Vy : -Vy) : qT(2, e - 15) * (t === 0 ? 1 + n * Hy : -1 - n * Hy);
}, E7 = b7(DataView.prototype.getUint16);
m7({ target: "DataView", proto: !0 }, {
  getFloat16: function(t) {
    var e = E7(this, t, arguments.length > 1 ? arguments[1] : !1);
    return S7(e);
  }
});
var T7 = dt, x7 = TypeError, I7 = function(r) {
  if (T7(r) === "DataView")
    return r;
  throw new x7("Argument is not a DataView");
}, O7 = Math.log, A7 = Math.LN2, YT = Math.log2 || function(t) {
  return O7(t) / A7;
}, R7 = d, _7 = O, C7 = I7, P7 = Mu, M7 = YT, Gy = _T, N7 = Math.pow, D7 = 65520, L7 = 61005353927612305e-21, F7 = 16777216, ic = 1024, k7 = function(r) {
  if (r !== r)
    return 32256;
  if (r === 0)
    return (1 / r === -1 / 0) << 15;
  var t = r < 0;
  if (t && (r = -r), r >= D7)
    return t << 15 | 31744;
  if (r < L7)
    return t << 15 | Gy(r * F7);
  var e = M7(r) | 0;
  if (e === -15)
    return t << 15 | ic;
  var n = Gy((r * N7(2, -e) - 1) * ic);
  return n === ic ? t << 15 | e + 16 << 10 : t << 15 | e + 15 << 10 | n;
}, B7 = _7(DataView.prototype.setUint16);
R7({ target: "DataView", proto: !0 }, {
  setFloat16: function(t, e) {
    C7(this);
    var n = P7(t), a = k7(+e);
    return B7(this, n, a, arguments.length > 2 ? arguments[2] : !1);
  }
});
var KT = _, j7 = Tu, U7 = Tr, Wy = KT.ArrayBuffer, z7 = KT.TypeError, XT = Wy && j7(Wy.prototype, "byteLength", "get") || function(r) {
  if (U7(r) !== "ArrayBuffer")
    throw new z7("ArrayBuffer expected");
  return r.byteLength;
}, V7 = _, H7 = Pu, G7 = XT, W7 = V7.DataView, JT = function(r) {
  if (!H7 || G7(r) !== 0)
    return !1;
  try {
    return new W7(r), !1;
  } catch {
    return !0;
  }
}, q7 = B, Y7 = hr, K7 = JT, qy = ArrayBuffer.prototype;
q7 && !("detached" in qy) && Y7(qy, "detached", {
  configurable: !0,
  get: function() {
    return K7(this);
  }
});
var X7 = JT, J7 = TypeError, Z7 = function(r) {
  if (X7(r))
    throw new J7("ArrayBuffer is detached");
  return r;
}, Q7 = _, rV = ua, ZT = function(r) {
  if (rV) {
    try {
      return Q7.process.getBuiltinModule(r);
    } catch {
    }
    try {
      return Function('return require("' + r + '")')();
    } catch {
    }
  }
}, tV = _, eV = x, oc = Kt, sc = _u, Yy = tV.structuredClone, yd = !!Yy && !eV(function() {
  if (sc === "DENO" && oc > 92 || sc === "NODE" && oc > 94 || sc === "BROWSER" && oc > 97)
    return !1;
  var r = new ArrayBuffer(8), t = Yy(r, { transfer: [r] });
  return r.byteLength !== 0 || t.byteLength !== 8;
}), md = _, nV = ZT, aV = yd, iV = md.structuredClone, Ky = md.ArrayBuffer, bo = md.MessageChannel, Av = !1, uc, Xy, wo, lc;
if (aV)
  Av = function(r) {
    iV(r, { transfer: [r] });
  };
else if (Ky)
  try {
    bo || (uc = nV("worker_threads"), uc && (bo = uc.MessageChannel)), bo && (Xy = new bo(), wo = new Ky(2), lc = function(r) {
      Xy.port1.postMessage(null, [r]);
    }, wo.byteLength === 2 && (lc(wo), wo.byteLength === 0 && (Av = lc)));
  } catch {
  }
var QT = Av, bd = _, wd = O, rx = Tu, oV = Mu, sV = Z7, uV = XT, Jy = QT, cc = yd, lV = bd.structuredClone, tx = bd.ArrayBuffer, Rv = bd.DataView, cV = Math.min, Sd = tx.prototype, ex = Rv.prototype, fV = wd(Sd.slice), Zy = rx(Sd, "resizable", "get"), Qy = rx(Sd, "maxByteLength", "get"), vV = wd(ex.getInt8), hV = wd(ex.setInt8), nx = (cc || Jy) && function(r, t, e) {
  var n = uV(r), a = t === void 0 ? n : oV(t), i = !Zy || !Zy(r), o;
  if (sV(r), cc && (r = lV(r, { transfer: [r] }), n === a && (e || i)))
    return r;
  if (n >= a && (!e || i))
    o = fV(r, 0, a);
  else {
    var s = e && !i && Qy ? { maxByteLength: Qy(r) } : void 0;
    o = new tx(a, s);
    for (var u = new Rv(r), l = new Rv(o), c = cV(a, n), f = 0; f < c; f++)
      hV(l, f, vV(u, f));
  }
  return cc || Jy(r), o;
}, dV = d, rm = nx;
rm && dV({ target: "ArrayBuffer", proto: !0 }, {
  transfer: function() {
    return rm(this, arguments.length ? arguments[0] : void 0, !0);
  }
});
var gV = d, tm = nx;
tm && gV({ target: "ArrayBuffer", proto: !0 }, {
  transferToFixedLength: function() {
    return tm(this, arguments.length ? arguments[0] : void 0, !1);
  }
});
var pV = d, $V = O, yV = x, mV = yV(function() {
  return (/* @__PURE__ */ new Date(16e11)).getYear() !== 120;
}), bV = $V(Date.prototype.getFullYear);
pV({ target: "Date", proto: !0, forced: mV }, {
  getYear: function() {
    return bV(this) - 1900;
  }
});
var wV = d, SV = O, ax = Date, EV = SV(ax.prototype.getTime);
wV({ target: "Date", stat: !0 }, {
  now: function() {
    return EV(new ax());
  }
});
var TV = d, ix = O, xV = cr, ox = Date.prototype, IV = ix(ox.getTime), OV = ix(ox.setFullYear);
TV({ target: "Date", proto: !0 }, {
  setYear: function(t) {
    IV(this);
    var e = xV(t), n = e >= 0 && e <= 99 ? e + 1900 : e;
    return OV(this, n);
  }
});
var AV = d;
AV({ target: "Date", proto: !0 }, {
  toGMTString: Date.prototype.toUTCString
});
var RV = cr, _V = V, CV = or, PV = RangeError, Bu = function(t) {
  var e = _V(CV(this)), n = "", a = RV(t);
  if (a < 0 || a === 1 / 0)
    throw new PV("Wrong number of repetitions");
  for (; a > 0; (a >>>= 1) && (e += e))
    a & 1 && (n += e);
  return n;
}, sx = O, MV = Ur, em = V, NV = Bu, DV = or, LV = sx(NV), FV = sx("".slice), kV = Math.ceil, nm = function(r) {
  return function(t, e, n) {
    var a = em(DV(t)), i = MV(e), o = a.length, s = n === void 0 ? " " : em(n), u, l;
    return i <= o || s === "" ? a : (u = i - o, l = LV(s, kV(u / s.length)), l.length > u && (l = FV(l, 0, u)), r ? a + l : l + a);
  };
}, ju = {
  // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart
  start: nm(!1),
  // `String.prototype.padEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.padend
  end: nm(!0)
}, me = O, am = x, Te = ju.start, BV = RangeError, jV = isFinite, UV = Math.abs, re = Date.prototype, fc = re.toISOString, zV = me(re.getTime), VV = me(re.getUTCDate), HV = me(re.getUTCFullYear), GV = me(re.getUTCHours), WV = me(re.getUTCMilliseconds), qV = me(re.getUTCMinutes), YV = me(re.getUTCMonth), KV = me(re.getUTCSeconds), XV = am(function() {
  return fc.call(new Date(-5e13 - 1)) !== "0385-07-25T07:06:39.999Z";
}) || !am(function() {
  fc.call(/* @__PURE__ */ new Date(NaN));
}) ? function() {
  if (!jV(zV(this)))
    throw new BV("Invalid time value");
  var t = this, e = HV(t), n = WV(t), a = e < 0 ? "-" : e > 9999 ? "+" : "";
  return a + Te(UV(e), a ? 6 : 4, 0) + "-" + Te(YV(t) + 1, 2, 0) + "-" + Te(VV(t), 2, 0) + "T" + Te(GV(t), 2, 0) + ":" + Te(qV(t), 2, 0) + ":" + Te(KV(t), 2, 0) + "." + Te(n, 3, 0) + "Z";
} : fc, JV = d, im = XV;
JV({ target: "Date", proto: !0, forced: Date.prototype.toISOString !== im }, {
  toISOString: im
});
var ZV = d, QV = x, rH = Z, tH = du, eH = QV(function() {
  return (/* @__PURE__ */ new Date(NaN)).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function() {
    return 1;
  } }) !== 1;
});
ZV({ target: "Date", proto: !0, arity: 1, forced: eH }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  toJSON: function(t) {
    var e = rH(this), n = tH(e, "number");
    return typeof n == "number" && !isFinite(n) ? null : e.toISOString();
  }
});
var nH = k, aH = rE, iH = TypeError, oH = function(r) {
  if (nH(this), r === "string" || r === "default")
    r = "string";
  else if (r !== "number")
    throw new iH("Incorrect hint");
  return aH(this, r);
}, sH = K, uH = ur, lH = oH, cH = G, om = cH("toPrimitive"), sm = Date.prototype;
sH(sm, om) || uH(sm, om, lH);
var ux = O, fH = ur, Ed = Date.prototype, um = "Invalid Date", lx = "toString", vH = ux(Ed[lx]), hH = ux(Ed.getTime);
String(/* @__PURE__ */ new Date(NaN)) !== um && fH(Ed, lx, function() {
  var t = hH(this);
  return t === t ? vH(this) : um;
});
var dH = d, ki = O, gH = V, pH = ki("".charAt), $H = ki("".charCodeAt), yH = ki(/./.exec), mH = ki(1 .toString), bH = ki("".toUpperCase), wH = /[\w*+\-./@]/, lm = function(r, t) {
  for (var e = mH(r, 16); e.length < t; )
    e = "0" + e;
  return e;
};
dH({ global: !0 }, {
  escape: function(t) {
    for (var e = gH(t), n = "", a = e.length, i = 0, o, s; i < a; )
      o = pH(e, i++), yH(wH, o) ? n += o : (s = $H(o, 0), s < 256 ? n += "%" + lm(s, 2) : n += "%u" + bH(lm(s, 4)));
    return n;
  }
});
var cx = O, SH = J, EH = H, TH = K, cm = rt, xH = wi, fx = Function, IH = cx([].concat), OH = cx([].join), vc = {}, AH = function(r, t, e) {
  if (!TH(vc, t)) {
    for (var n = [], a = 0; a < t; a++)
      n[a] = "a[" + a + "]";
    vc[t] = fx("C,a", "return new C(" + OH(n, ",") + ")");
  }
  return vc[t](r, e);
}, vx = xH ? fx.bind : function(t) {
  var e = SH(this), n = e.prototype, a = cm(arguments, 1), i = function() {
    var s = IH(a, cm(arguments));
    return this instanceof i ? AH(e, s.length, s) : e.apply(t, s);
  };
  return EH(n) && (i.prototype = n), i;
}, RH = d, fm = vx;
RH({ target: "Function", proto: !0, forced: Function.bind !== fm }, {
  bind: fm
});
var _H = Y, vm = H, CH = sr, PH = Nr, MH = G, NH = kh, hc = MH("hasInstance"), hm = Function.prototype;
hc in hm || CH.f(hm, hc, { value: NH(function(r) {
  if (!_H(this) || !vm(r))
    return !1;
  var t = this.prototype;
  return vm(t) ? PH(t, r) : r instanceof this;
}, hc) });
var DH = B, LH = na.EXISTS, hx = O, FH = hr, dx = Function.prototype, kH = hx(dx.toString), gx = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/, BH = hx(gx.exec), jH = "name";
DH && !LH && FH(dx, jH, {
  configurable: !0,
  get: function() {
    try {
      return BH(gx, kH(this))[1];
    } catch {
      return "";
    }
  }
});
var UH = d, dc = _;
UH({ global: !0, forced: dc.globalThis !== dc }, {
  globalThis: dc
});
var zH = d, VH = _, HH = pt, GH = k, WH = Y, qH = Vr, YH = hr, KH = Zt, XH = x, Td = K, JH = G, At = Fi.IteratorPrototype, ZH = B, gc = "constructor", px = "Iterator", dm = JH("toStringTag"), $x = TypeError, pc = VH[px], yx = !WH(pc) || pc.prototype !== At || !XH(function() {
  pc({});
}), xd = function() {
  if (HH(this, At), qH(this) === At)
    throw new $x("Abstract class Iterator not directly constructable");
}, mx = function(r, t) {
  ZH ? YH(At, r, {
    configurable: !0,
    get: function() {
      return t;
    },
    set: function(e) {
      if (GH(this), this === At)
        throw new $x("You can't redefine this property");
      Td(this, r) ? this[r] = e : KH(this, r, e);
    }
  }) : At[r] = t;
};
Td(At, dm) || mx(dm, px);
(yx || !Td(At, gc) || At[gc] === Object) && mx(gc, xd);
xd.prototype = At;
zH({ global: !0, constructor: !0, forced: yx }, {
  Iterator: xd
});
var Hr = function(r) {
  return {
    iterator: r,
    next: r.next,
    done: !1
  };
}, QH = RangeError, bx = function(r) {
  if (r === r)
    return r;
  throw new QH("NaN is not allowed");
}, rG = cr, tG = RangeError, Id = function(r) {
  var t = rG(r);
  if (t < 0)
    throw new tG("The argument can't be less than 0");
  return t;
}, eG = U, nG = zr, aG = xr, iG = ca, oG = G, wx = vr, sG = Ct, uG = Fi.IteratorPrototype, So = sa, $c = Xe, lG = oG("toStringTag"), Sx = "IteratorHelper", Ex = "WrapForValidIterator", cG = wx.set, Tx = function(r) {
  var t = wx.getterFor(r ? Ex : Sx);
  return iG(nG(uG), {
    next: function() {
      var n = t(this);
      if (r)
        return n.nextHandler();
      if (n.done)
        return So(void 0, !0);
      try {
        var a = n.nextHandler();
        return n.returnHandlerResult ? a : So(a, n.done);
      } catch (i) {
        throw n.done = !0, i;
      }
    },
    return: function() {
      var e = t(this), n = e.iterator;
      if (e.done = !0, r) {
        var a = sG(n, "return");
        return a ? eG(a, n) : So(void 0, !0);
      }
      if (e.inner)
        try {
          $c(e.inner.iterator, "normal");
        } catch (i) {
          return $c(n, "throw", i);
        }
      return n && $c(n, "normal"), So(void 0, !0);
    }
  });
}, fG = Tx(!0), xx = Tx(!1);
aG(xx, lG, "Iterator Helper");
var va = function(r, t, e) {
  var n = function(i, o) {
    o ? (o.iterator = i.iterator, o.next = i.next) : o = i, o.type = t ? Ex : Sx, o.returnHandlerResult = !!e, o.nextHandler = r, o.counter = 0, o.done = !1, cG(this, o);
  };
  return n.prototype = t ? fG : xx, n;
}, vG = d, gm = U, _v = k, hG = Hr, dG = bx, gG = Id, pG = va, $G = Xt, yG = pG(function() {
  for (var r = this.iterator, t = this.next, e, n; this.remaining; )
    if (this.remaining--, e = _v(gm(t, r)), n = this.done = !!e.done, n)
      return;
  if (e = _v(gm(t, r)), n = this.done = !!e.done, !n)
    return e.value;
});
vG({ target: "Iterator", proto: !0, real: !0, forced: $G }, {
  drop: function(t) {
    _v(this);
    var e = gG(dG(+t));
    return new yG(hG(this), {
      remaining: e
    });
  }
});
var mG = d, bG = pr, wG = J, SG = k, EG = Hr;
mG({ target: "Iterator", proto: !0, real: !0 }, {
  every: function(t) {
    SG(this), wG(t);
    var e = EG(this), n = 0;
    return !bG(e, function(a, i) {
      if (!t(a, n++))
        return i();
    }, { IS_RECORD: !0, INTERRUPTED: !0 }).stopped;
  }
});
var TG = d, xG = U, IG = J, Ix = k, OG = Hr, AG = va, RG = rd, _G = Xt, CG = AG(function() {
  for (var r = this.iterator, t = this.predicate, e = this.next, n, a, i; ; ) {
    if (n = Ix(xG(e, r)), a = this.done = !!n.done, a)
      return;
    if (i = n.value, RG(r, t, [i, this.counter++], !0))
      return i;
  }
});
TG({ target: "Iterator", proto: !0, real: !0, forced: _G }, {
  filter: function(t) {
    return Ix(this), IG(t), new CG(OG(this), {
      predicate: t
    });
  }
});
var PG = d, MG = pr, NG = J, DG = k, LG = Hr;
PG({ target: "Iterator", proto: !0, real: !0 }, {
  find: function(t) {
    DG(this), NG(t);
    var e = LG(this), n = 0;
    return MG(e, function(a, i) {
      if (t(a, n++))
        return i(a);
    }, { IS_RECORD: !0, INTERRUPTED: !0 }).result;
  }
});
var FG = U, pm = k, kG = Hr, BG = ia, Ox = function(r, t) {
  (!t || typeof r != "string") && pm(r);
  var e = BG(r);
  return kG(pm(e !== void 0 ? FG(e, r) : r));
}, jG = d, $m = U, UG = J, Cv = k, zG = Hr, VG = Ox, HG = va, ym = Xe, GG = Xt, WG = HG(function() {
  for (var r = this.iterator, t = this.mapper, e, n; ; ) {
    if (n = this.inner)
      try {
        if (e = Cv($m(n.next, n.iterator)), !e.done)
          return e.value;
        this.inner = null;
      } catch (a) {
        ym(r, "throw", a);
      }
    if (e = Cv($m(this.next, r)), this.done = !!e.done)
      return;
    try {
      this.inner = VG(t(e.value, this.counter++), !1);
    } catch (a) {
      ym(r, "throw", a);
    }
  }
});
jG({ target: "Iterator", proto: !0, real: !0, forced: GG }, {
  flatMap: function(t) {
    return Cv(this), UG(t), new WG(zG(this), {
      mapper: t,
      inner: null
    });
  }
});
var qG = d, YG = pr, KG = J, XG = k, JG = Hr;
qG({ target: "Iterator", proto: !0, real: !0 }, {
  forEach: function(t) {
    XG(this), KG(t);
    var e = JG(this), n = 0;
    YG(e, function(a) {
      t(a, n++);
    }, { IS_RECORD: !0 });
  }
});
var ZG = d, QG = U, r9 = Z, t9 = Nr, e9 = Fi.IteratorPrototype, n9 = va, a9 = Ox, i9 = Xt, o9 = n9(function() {
  return QG(this.next, this.iterator);
}, !0);
ZG({ target: "Iterator", stat: !0, forced: i9 }, {
  from: function(t) {
    var e = a9(typeof t == "string" ? r9(t) : t, !0);
    return t9(e9, e.iterator) ? e.iterator : new o9(e);
  }
});
var s9 = U, u9 = J, Ax = k, l9 = Hr, c9 = va, f9 = rd, v9 = c9(function() {
  var r = this.iterator, t = Ax(s9(this.next, r)), e = this.done = !!t.done;
  if (!e)
    return f9(r, this.mapper, [t.value, this.counter++], !0);
}), h9 = function(t) {
  return Ax(this), u9(t), new v9(l9(this), {
    mapper: t
  });
}, d9 = d, g9 = h9, p9 = Xt;
d9({ target: "Iterator", proto: !0, real: !0, forced: p9 }, {
  map: g9
});
var $9 = d, y9 = pr, m9 = J, b9 = k, w9 = Hr, S9 = TypeError;
$9({ target: "Iterator", proto: !0, real: !0 }, {
  reduce: function(t) {
    b9(this), m9(t);
    var e = w9(this), n = arguments.length < 2, a = n ? void 0 : arguments[1], i = 0;
    if (y9(e, function(o) {
      n ? (n = !1, a = o) : a = t(a, o, i), i++;
    }, { IS_RECORD: !0 }), n)
      throw new S9("Reduce of empty iterator with no initial value");
    return a;
  }
});
var E9 = d, T9 = pr, x9 = J, I9 = k, O9 = Hr;
E9({ target: "Iterator", proto: !0, real: !0 }, {
  some: function(t) {
    I9(this), x9(t);
    var e = O9(this), n = 0;
    return T9(e, function(a, i) {
      if (t(a, n++))
        return i();
    }, { IS_RECORD: !0, INTERRUPTED: !0 }).stopped;
  }
});
var A9 = d, R9 = U, Rx = k, _9 = Hr, C9 = bx, P9 = Id, M9 = va, N9 = Xe, D9 = Xt, L9 = M9(function() {
  var r = this.iterator;
  if (!this.remaining--)
    return this.done = !0, N9(r, "normal", void 0);
  var t = Rx(R9(this.next, r)), e = this.done = !!t.done;
  if (!e)
    return t.value;
});
A9({ target: "Iterator", proto: !0, real: !0, forced: D9 }, {
  take: function(t) {
    Rx(this);
    var e = P9(C9(+t));
    return new L9(_9(this), {
      remaining: e
    });
  }
});
var F9 = d, k9 = k, B9 = pr, j9 = Hr, U9 = [].push;
F9({ target: "Iterator", proto: !0, real: !0 }, {
  toArray: function() {
    var t = [];
    return B9(j9(k9(this)), U9, { that: t, IS_RECORD: !0 }), t;
  }
});
var z9 = _, V9 = Lr;
V9(z9.JSON, "JSON", !0);
var _x = { exports: {} }, H9 = x, Od = H9(function() {
  if (typeof ArrayBuffer == "function") {
    var r = new ArrayBuffer(8);
    Object.isExtensible(r) && Object.defineProperty(r, "a", { value: 8 });
  }
}), G9 = x, W9 = H, q9 = Tr, mm = Od, us = Object.isExtensible, Y9 = G9(function() {
  us(1);
}), Ad = Y9 || mm ? function(t) {
  return !W9(t) || mm && q9(t) === "ArrayBuffer" ? !1 : us ? us(t) : !0;
} : us, K9 = x, ha = !K9(function() {
  return Object.isExtensible(Object.preventExtensions({}));
}), X9 = d, J9 = O, Z9 = Ei, Q9 = H, Rd = K, rW = sr.f, bm = $e, tW = yu, _d = Ad, eW = ea, nW = ha, Cx = !1, qt = eW("meta"), aW = 0, Cd = function(r) {
  rW(r, qt, { value: {
    objectID: "O" + aW++,
    // object ID
    weakData: {}
    // weak collections IDs
  } });
}, iW = function(r, t) {
  if (!Q9(r))
    return typeof r == "symbol" ? r : (typeof r == "string" ? "S" : "P") + r;
  if (!Rd(r, qt)) {
    if (!_d(r))
      return "F";
    if (!t)
      return "E";
    Cd(r);
  }
  return r[qt].objectID;
}, oW = function(r, t) {
  if (!Rd(r, qt)) {
    if (!_d(r))
      return !0;
    if (!t)
      return !1;
    Cd(r);
  }
  return r[qt].weakData;
}, sW = function(r) {
  return nW && Cx && _d(r) && !Rd(r, qt) && Cd(r), r;
}, uW = function() {
  lW.enable = function() {
  }, Cx = !0;
  var r = bm.f, t = J9([].splice), e = {};
  e[qt] = 1, r(e).length && (bm.f = function(n) {
    for (var a = r(n), i = 0, o = a.length; i < o; i++)
      if (a[i] === qt) {
        t(a, i, 1);
        break;
      }
    return a;
  }, X9({ target: "Object", stat: !0, forced: !0 }, {
    getOwnPropertyNames: tW.f
  }));
}, lW = _x.exports = {
  enable: uW,
  fastKey: iW,
  getWeakData: oW,
  onFreeze: sW
};
Z9[qt] = !0;
var Je = _x.exports, cW = d, fW = _, vW = O, wm = Ai, hW = ur, dW = Je, gW = pr, pW = pt, $W = Y, yW = Mr, yc = H, mc = x, mW = Au, bW = Lr, wW = Ye, Uu = function(r, t, e) {
  var n = r.indexOf("Map") !== -1, a = r.indexOf("Weak") !== -1, i = n ? "set" : "add", o = fW[r], s = o && o.prototype, u = o, l = {}, c = function(p) {
    var S = vW(s[p]);
    hW(
      s,
      p,
      p === "add" ? function(A) {
        return S(this, A === 0 ? 0 : A), this;
      } : p === "delete" ? function(I) {
        return a && !yc(I) ? !1 : S(this, I === 0 ? 0 : I);
      } : p === "get" ? function(A) {
        return a && !yc(A) ? void 0 : S(this, A === 0 ? 0 : A);
      } : p === "has" ? function(A) {
        return a && !yc(A) ? !1 : S(this, A === 0 ? 0 : A);
      } : function(A, N) {
        return S(this, A === 0 ? 0 : A, N), this;
      }
    );
  }, f = wm(
    r,
    !$W(o) || !(a || s.forEach && !mc(function() {
      new o().entries().next();
    }))
  );
  if (f)
    u = e.getConstructor(t, r, n, i), dW.enable();
  else if (wm(r, !0)) {
    var v = new u(), h = v[i](a ? {} : -0, 1) !== v, g = mc(function() {
      v.has(1);
    }), $ = mW(function(p) {
      new o(p);
    }), y = !a && mc(function() {
      for (var p = new o(), S = 5; S--; )
        p[i](S, S);
      return !p.has(-0);
    });
    $ || (u = t(function(p, S) {
      pW(p, s);
      var I = wW(new o(), p, u);
      return yW(S) || gW(S, I[i], { that: I, AS_ENTRIES: n }), I;
    }), u.prototype = s, s.constructor = u), (g || y) && (c("delete"), c("has"), n && c("get")), (y || h) && c(i), a && s.clear && delete s.clear;
  }
  return l[r] = u, cW({ global: !0, constructor: !0, forced: u !== o }, l), bW(u, r), a || e.setStrong(u, r, n), u;
}, Sm = zr, SW = hr, Em = ca, EW = gt, TW = pt, xW = Mr, IW = pr, OW = ed, Eo = sa, AW = la, Aa = B, Tm = Je.fastKey, Px = vr, xm = Px.set, bc = Px.getterFor, Mx = {
  getConstructor: function(r, t, e, n) {
    var a = r(function(l, c) {
      TW(l, i), xm(l, {
        type: t,
        index: Sm(null),
        first: null,
        last: null,
        size: 0
      }), Aa || (l.size = 0), xW(c) || IW(c, l[n], { that: l, AS_ENTRIES: e });
    }), i = a.prototype, o = bc(t), s = function(l, c, f) {
      var v = o(l), h = u(l, c), g, $;
      return h ? h.value = f : (v.last = h = {
        index: $ = Tm(c, !0),
        key: c,
        value: f,
        previous: g = v.last,
        next: null,
        removed: !1
      }, v.first || (v.first = h), g && (g.next = h), Aa ? v.size++ : l.size++, $ !== "F" && (v.index[$] = h)), l;
    }, u = function(l, c) {
      var f = o(l), v = Tm(c), h;
      if (v !== "F")
        return f.index[v];
      for (h = f.first; h; h = h.next)
        if (h.key === c)
          return h;
    };
    return Em(i, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function() {
        for (var c = this, f = o(c), v = f.first; v; )
          v.removed = !0, v.previous && (v.previous = v.previous.next = null), v = v.next;
        f.first = f.last = null, f.index = Sm(null), Aa ? f.size = 0 : c.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      delete: function(l) {
        var c = this, f = o(c), v = u(c, l);
        if (v) {
          var h = v.next, g = v.previous;
          delete f.index[v.index], v.removed = !0, g && (g.next = h), h && (h.previous = g), f.first === v && (f.first = h), f.last === v && (f.last = g), Aa ? f.size-- : c.size--;
        }
        return !!v;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function(c) {
        for (var f = o(this), v = EW(c, arguments.length > 1 ? arguments[1] : void 0), h; h = h ? h.next : f.first; )
          for (v(h.value, h.key, this); h && h.removed; )
            h = h.previous;
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function(c) {
        return !!u(this, c);
      }
    }), Em(i, e ? {
      // `Map.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-map.prototype.get
      get: function(c) {
        var f = u(this, c);
        return f && f.value;
      },
      // `Map.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-map.prototype.set
      set: function(c, f) {
        return s(this, c === 0 ? 0 : c, f);
      }
    } : {
      // `Set.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-set.prototype.add
      add: function(c) {
        return s(this, c = c === 0 ? 0 : c, c);
      }
    }), Aa && SW(i, "size", {
      configurable: !0,
      get: function() {
        return o(this).size;
      }
    }), a;
  },
  setStrong: function(r, t, e) {
    var n = t + " Iterator", a = bc(t), i = bc(n);
    OW(r, t, function(o, s) {
      xm(this, {
        type: n,
        target: o,
        state: a(o),
        kind: s,
        last: null
      });
    }, function() {
      for (var o = i(this), s = o.kind, u = o.last; u && u.removed; )
        u = u.previous;
      return !o.target || !(o.last = u = u ? u.next : o.state.first) ? (o.target = null, Eo(void 0, !0)) : Eo(s === "keys" ? u.key : s === "values" ? u.value : [u.key, u.value], !1);
    }, e ? "entries" : "values", !e, !0), AW(t);
  }
}, RW = Uu, _W = Mx;
RW("Map", function(r) {
  return function() {
    return r(this, arguments.length ? arguments[0] : void 0);
  };
}, _W);
var To = O, Ra = Map.prototype, Nx = {
  // eslint-disable-next-line es/no-map -- safe
  Map,
  set: To(Ra.set),
  get: To(Ra.get),
  has: To(Ra.has),
  remove: To(Ra.delete),
  proto: Ra
}, CW = d, PW = O, MW = J, NW = or, DW = pr, zu = Nx, LW = x, Dx = zu.Map, FW = zu.has, kW = zu.get, BW = zu.set, jW = PW([].push), UW = LW(function() {
  return Dx.groupBy("ab", function(r) {
    return r;
  }).get("a").length !== 1;
});
CW({ target: "Map", stat: !0, forced: UW }, {
  groupBy: function(t, e) {
    NW(t), MW(e);
    var n = new Dx(), a = 0;
    return DW(t, function(i) {
      var o = e(i, a++);
      FW(n, o) ? jW(kW(n, o), i) : BW(n, o, [i]);
    }), n;
  }
});
var zW = Math.log, Lx = Math.log1p || function(t) {
  var e = +t;
  return e > -1e-8 && e < 1e-8 ? e - e * e / 2 : zW(1 + e);
}, VW = d, HW = Lx, wc = Math.acosh, GW = Math.log, Im = Math.sqrt, WW = Math.LN2, qW = !wc || Math.floor(wc(Number.MAX_VALUE)) !== 710 || wc(1 / 0) !== 1 / 0;
VW({ target: "Math", stat: !0, forced: qW }, {
  acosh: function(t) {
    var e = +t;
    return e < 1 ? NaN : e > 9490626562425156e-8 ? GW(e) + WW : HW(e - 1 + Im(e - 1) * Im(e + 1));
  }
});
var YW = d, Om = Math.asinh, KW = Math.log, XW = Math.sqrt;
function Fx(r) {
  var t = +r;
  return !isFinite(t) || t === 0 ? t : t < 0 ? -Fx(-t) : KW(t + XW(t * t + 1));
}
var JW = !(Om && 1 / Om(0) > 0);
YW({ target: "Math", stat: !0, forced: JW }, {
  asinh: Fx
});
var ZW = d, Am = Math.atanh, QW = Math.log, rq = !(Am && 1 / Am(-0) < 0);
ZW({ target: "Math", stat: !0, forced: rq }, {
  atanh: function(t) {
    var e = +t;
    return e === 0 ? e : QW((1 + e) / (1 - e)) / 2;
  }
});
var tq = d, eq = ud, nq = Math.abs, aq = Math.pow;
tq({ target: "Math", stat: !0 }, {
  cbrt: function(t) {
    var e = +t;
    return eq(e) * aq(nq(e), 1 / 3);
  }
});
var iq = d, oq = Math.floor, sq = Math.log, uq = Math.LOG2E;
iq({ target: "Math", stat: !0 }, {
  clz32: function(t) {
    var e = t >>> 0;
    return e ? 31 - oq(sq(e + 0.5) * uq) : 32;
  }
});
var _a = Math.expm1, lq = Math.exp, Vu = !_a || _a(10) > 22025.465794806718 || _a(10) < 22025.465794806718 || _a(-2e-17) !== -2e-17 ? function(t) {
  var e = +t;
  return e === 0 ? e : e > -1e-6 && e < 1e-6 ? e + e * e / 2 : lq(e) - 1;
} : _a, cq = d, fq = Vu, Rm = Math.cosh, vq = Math.abs, Sc = Math.E, hq = !Rm || Rm(710) === 1 / 0;
cq({ target: "Math", stat: !0, forced: hq }, {
  cosh: function(t) {
    var e = fq(vq(t) - 1) + 1;
    return (e + 1 / (e * Sc * Sc)) * (Sc / 2);
  }
});
var dq = d, _m = Vu;
dq({ target: "Math", stat: !0, forced: _m !== Math.expm1 }, { expm1: _m });
var gq = d, pq = PT;
gq({ target: "Math", stat: !0 }, { fround: pq });
var $q = d, yq = CT, mq = 9765625e-10, bq = 65504, wq = 6103515625e-14;
$q({ target: "Math", stat: !0 }, {
  f16round: function(t) {
    return yq(t, mq, bq, wq);
  }
});
var Sq = d, Cm = Math.hypot, Eq = Math.abs, Tq = Math.sqrt, xq = !!Cm && Cm(1 / 0, NaN) !== 1 / 0;
Sq({ target: "Math", stat: !0, arity: 2, forced: xq }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  hypot: function(t, e) {
    for (var n = 0, a = 0, i = arguments.length, o = 0, s, u; a < i; )
      s = Eq(arguments[a++]), o < s ? (u = o / s, n = n * u * u + 1, o = s) : s > 0 ? (u = s / o, n += u * u) : n += s;
    return o === 1 / 0 ? 1 / 0 : o * Tq(n);
  }
});
var Iq = d, Oq = x, Pm = Math.imul, Aq = Oq(function() {
  return Pm(4294967295, 5) !== -5 || Pm.length !== 2;
});
Iq({ target: "Math", stat: !0, forced: Aq }, {
  imul: function(t, e) {
    var n = 65535, a = +t, i = +e, o = n & a, s = n & i;
    return 0 | o * s + ((n & a >>> 16) * s + o * (n & i >>> 16) << 16 >>> 0);
  }
});
var Rq = Math.log, _q = Math.LOG10E, kx = Math.log10 || function(t) {
  return Rq(t) * _q;
}, Cq = d, Pq = kx;
Cq({ target: "Math", stat: !0 }, {
  log10: Pq
});
var Mq = d, Nq = Lx;
Mq({ target: "Math", stat: !0 }, { log1p: Nq });
var Dq = d, Lq = YT;
Dq({ target: "Math", stat: !0 }, {
  log2: Lq
});
var Fq = d, kq = ud;
Fq({ target: "Math", stat: !0 }, {
  sign: kq
});
var Bq = d, jq = x, Mm = Vu, Uq = Math.abs, Nm = Math.exp, zq = Math.E, Vq = jq(function() {
  return Math.sinh(-2e-17) !== -2e-17;
});
Bq({ target: "Math", stat: !0, forced: Vq }, {
  sinh: function(t) {
    var e = +t;
    return Uq(e) < 1 ? (Mm(e) - Mm(-e)) / 2 : (Nm(e - 1) - Nm(-e - 1)) * (zq / 2);
  }
});
var Hq = d, Dm = Vu, Lm = Math.exp;
Hq({ target: "Math", stat: !0 }, {
  tanh: function(t) {
    var e = +t, n = Dm(e), a = Dm(-e);
    return n === 1 / 0 ? 1 : a === 1 / 0 ? -1 : (n - a) / (Lm(e) + Lm(-e));
  }
});
var Gq = Lr;
Gq(Math, "Math", !0);
var Wq = d, qq = lE;
Wq({ target: "Math", stat: !0 }, {
  trunc: qq
});
var Yq = O, Hu = Yq(1 .valueOf), Bi = `	
\v\f\r                　\u2028\u2029\uFEFF`, Kq = O, Xq = or, Jq = V, Pv = Bi, Fm = Kq("".replace), Zq = RegExp("^[" + Pv + "]+"), Qq = RegExp("(^|[^" + Pv + "])[" + Pv + "]+$"), Ec = function(r) {
  return function(t) {
    var e = Jq(Xq(t));
    return r & 1 && (e = Fm(e, Zq, "")), r & 2 && (e = Fm(e, Qq, "$1")), e;
  };
}, da = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: Ec(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: Ec(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: Ec(3)
}, rY = d, Bx = Xt, tY = B, jx = _, Ux = $E, zx = O, eY = Ai, km = K, nY = Ye, aY = Nr, iY = Ge, Vx = du, oY = x, sY = $e.f, uY = Er.f, lY = sr.f, cY = Hu, fY = da.trim, Gu = "Number", Mn = jx[Gu];
Ux[Gu];
var Pd = Mn.prototype, vY = jx.TypeError, hY = zx("".slice), xo = zx("".charCodeAt), dY = function(r) {
  var t = Vx(r, "number");
  return typeof t == "bigint" ? t : gY(t);
}, gY = function(r) {
  var t = Vx(r, "number"), e, n, a, i, o, s, u, l;
  if (iY(t))
    throw new vY("Cannot convert a Symbol value to a number");
  if (typeof t == "string" && t.length > 2) {
    if (t = fY(t), e = xo(t, 0), e === 43 || e === 45) {
      if (n = xo(t, 2), n === 88 || n === 120)
        return NaN;
    } else if (e === 48) {
      switch (xo(t, 1)) {
        case 66:
        case 98:
          a = 2, i = 49;
          break;
        case 79:
        case 111:
          a = 8, i = 55;
          break;
        default:
          return +t;
      }
      for (o = hY(t, 2), s = o.length, u = 0; u < s; u++)
        if (l = xo(o, u), l < 48 || l > i)
          return NaN;
      return parseInt(o, a);
    }
  }
  return +t;
}, Md = eY(Gu, !Mn(" 0o1") || !Mn("0b1") || Mn("+0x1")), pY = function(r) {
  return aY(Pd, r) && oY(function() {
    cY(r);
  });
}, Wu = function(t) {
  var e = arguments.length < 1 ? 0 : Mn(dY(t));
  return pY(this) ? nY(Object(e), this, Wu) : e;
};
Wu.prototype = Pd;
Md && !Bx && (Pd.constructor = Wu);
rY({ global: !0, constructor: !0, wrap: !0, forced: Md }, {
  Number: Wu
});
var $Y = function(r, t) {
  for (var e = tY ? sY(t) : (
    // ES3:
    "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(",")
  ), n = 0, a; e.length > n; n++)
    km(t, a = e[n]) && !km(r, a) && lY(r, a, uY(t, a));
};
(Md || Bx) && $Y(Ux[Gu], Mn);
var yY = d;
yY({ target: "Number", stat: !0, nonConfigurable: !0, nonWritable: !0 }, {
  EPSILON: Math.pow(2, -52)
});
var mY = _, bY = mY.isFinite, wY = Number.isFinite || function(t) {
  return typeof t == "number" && bY(t);
}, SY = d, EY = wY;
SY({ target: "Number", stat: !0 }, { isFinite: EY });
var TY = H, xY = Math.floor, Nd = Number.isInteger || function(t) {
  return !TY(t) && isFinite(t) && xY(t) === t;
}, IY = d, OY = Nd;
IY({ target: "Number", stat: !0 }, {
  isInteger: OY
});
var AY = d;
AY({ target: "Number", stat: !0 }, {
  isNaN: function(t) {
    return t !== t;
  }
});
var RY = d, _Y = Nd, CY = Math.abs;
RY({ target: "Number", stat: !0 }, {
  isSafeInteger: function(t) {
    return _Y(t) && CY(t) <= 9007199254740991;
  }
});
var PY = d;
PY({ target: "Number", stat: !0, nonConfigurable: !0, nonWritable: !0 }, {
  MAX_SAFE_INTEGER: 9007199254740991
});
var MY = d;
MY({ target: "Number", stat: !0, nonConfigurable: !0, nonWritable: !0 }, {
  MIN_SAFE_INTEGER: -9007199254740991
});
var Hx = _, NY = x, DY = O, LY = V, FY = da.trim, kY = Bi, BY = DY("".charAt), zs = Hx.parseFloat, Bm = Hx.Symbol, jm = Bm && Bm.iterator, jY = 1 / zs(kY + "-0") !== -1 / 0 || jm && !NY(function() {
  zs(Object(jm));
}), Gx = jY ? function(t) {
  var e = FY(LY(t)), n = zs(e);
  return n === 0 && BY(e, 0) === "-" ? -0 : n;
} : zs, UY = d, Um = Gx;
UY({ target: "Number", stat: !0, forced: Number.parseFloat !== Um }, {
  parseFloat: Um
});
var Wx = _, zY = x, VY = O, HY = V, GY = da.trim, zm = Bi, Ka = Wx.parseInt, Vm = Wx.Symbol, Hm = Vm && Vm.iterator, qx = /^[+-]?0x/i, WY = VY(qx.exec), qY = Ka(zm + "08") !== 8 || Ka(zm + "0x16") !== 22 || Hm && !zY(function() {
  Ka(Object(Hm));
}), Yx = qY ? function(t, e) {
  var n = GY(HY(t));
  return Ka(n, e >>> 0 || (WY(qx, n) ? 16 : 10));
} : Ka, YY = d, Gm = Yx;
YY({ target: "Number", stat: !0, forced: Number.parseInt !== Gm }, {
  parseInt: Gm
});
var KY = d, Dd = O, XY = cr, JY = Hu, ZY = Bu, QY = kx, Mv = x, rK = RangeError, Wm = String, tK = isFinite, eK = Math.abs, nK = Math.floor, qm = Math.pow, aK = Math.round, xt = Dd(1 .toExponential), iK = Dd(ZY), Ym = Dd("".slice), Kx = xt(-69e-12, 4) === "-6.9000e-11" && xt(1.255, 2) === "1.25e+0" && xt(12345, 3) === "1.235e+4" && xt(25, 0) === "3e+1", oK = function() {
  return Mv(function() {
    xt(1, 1 / 0);
  }) && Mv(function() {
    xt(1, -1 / 0);
  });
}, sK = function() {
  return !Mv(function() {
    xt(1 / 0, 1 / 0), xt(NaN, 1 / 0);
  });
}, uK = !Kx || !oK() || !sK();
KY({ target: "Number", proto: !0, forced: uK }, {
  toExponential: function(t) {
    var e = JY(this);
    if (t === void 0)
      return xt(e);
    var n = XY(t);
    if (!tK(e))
      return String(e);
    if (n < 0 || n > 20)
      throw new rK("Incorrect fraction digits");
    if (Kx)
      return xt(e, n);
    var a = "", i, o, s, u;
    if (e < 0 && (a = "-", e = -e), e === 0)
      o = 0, i = iK("0", n + 1);
    else {
      var l = QY(e);
      o = nK(l);
      var c = qm(10, o - n), f = aK(e / c);
      2 * e >= (2 * f + 1) * c && (f += 1), f >= qm(10, n + 1) && (f /= 10, o += 1), i = Wm(f);
    }
    return n !== 0 && (i = Ym(i, 0, 1) + "." + Ym(i, 1)), o === 0 ? (s = "+", u = "0") : (s = o > 0 ? "+" : "-", u = Wm(eK(o))), i += "e" + s + u, a + i;
  }
});
var lK = d, Ld = O, cK = cr, fK = Hu, vK = Bu, Km = x, hK = RangeError, Xx = String, Jx = Math.floor, Nv = Ld(vK), Xm = Ld("".slice), Ca = Ld(1 .toFixed), En = function(r, t, e) {
  return t === 0 ? e : t % 2 === 1 ? En(r, t - 1, e * r) : En(r * r, t / 2, e);
}, dK = function(r) {
  for (var t = 0, e = r; e >= 4096; )
    t += 12, e /= 4096;
  for (; e >= 2; )
    t += 1, e /= 2;
  return t;
}, on = function(r, t, e) {
  for (var n = -1, a = e; ++n < 6; )
    a += t * r[n], r[n] = a % 1e7, a = Jx(a / 1e7);
}, Tc = function(r, t) {
  for (var e = 6, n = 0; --e >= 0; )
    n += r[e], r[e] = Jx(n / t), n = n % t * 1e7;
}, Jm = function(r) {
  for (var t = 6, e = ""; --t >= 0; )
    if (e !== "" || t === 0 || r[t] !== 0) {
      var n = Xx(r[t]);
      e = e === "" ? n : e + Nv("0", 7 - n.length) + n;
    }
  return e;
}, gK = Km(function() {
  return Ca(8e-5, 3) !== "0.000" || Ca(0.9, 0) !== "1" || Ca(1.255, 2) !== "1.25" || Ca(1000000000000000100, 0) !== "1000000000000000128";
}) || !Km(function() {
  Ca({});
});
lK({ target: "Number", proto: !0, forced: gK }, {
  toFixed: function(t) {
    var e = fK(this), n = cK(t), a = [0, 0, 0, 0, 0, 0], i = "", o = "0", s, u, l, c;
    if (n < 0 || n > 20)
      throw new hK("Incorrect fraction digits");
    if (e !== e)
      return "NaN";
    if (e <= -1e21 || e >= 1e21)
      return Xx(e);
    if (e < 0 && (i = "-", e = -e), e > 1e-21)
      if (s = dK(e * En(2, 69, 1)) - 69, u = s < 0 ? e * En(2, -s, 1) : e / En(2, s, 1), u *= 4503599627370496, s = 52 - s, s > 0) {
        for (on(a, 0, u), l = n; l >= 7; )
          on(a, 1e7, 0), l -= 7;
        for (on(a, En(10, l, 1), 0), l = s - 1; l >= 23; )
          Tc(a, 1 << 23), l -= 23;
        Tc(a, 1 << l), on(a, 1, 1), Tc(a, 2), o = Jm(a);
      } else
        on(a, 0, u), on(a, 1 << -s, 0), o = Jm(a) + Nv("0", n);
    return n > 0 ? (c = o.length, o = i + (c <= n ? "0." + Nv("0", n - c) + o : Xm(o, 0, c - n) + "." + Xm(o, c - n))) : o = i + o, o;
  }
});
var pK = d, $K = O, Zm = x, Qm = Hu, Vs = $K(1 .toPrecision), yK = Zm(function() {
  return Vs(1, void 0) !== "1";
}) || !Zm(function() {
  Vs({});
});
pK({ target: "Number", proto: !0, forced: yK }, {
  toPrecision: function(t) {
    return t === void 0 ? Vs(Qm(this)) : Vs(Qm(this), t);
  }
});
var r0 = B, mK = O, bK = U, wK = x, xc = Ri, SK = xi, EK = Si, TK = Z, xK = Qn, sn = Object.assign, t0 = Object.defineProperty, IK = mK([].concat), Zx = !sn || wK(function() {
  if (r0 && sn({ b: 1 }, sn(t0({}, "a", {
    enumerable: !0,
    get: function() {
      t0(this, "b", {
        value: 3,
        enumerable: !1
      });
    }
  }), { b: 2 })).b !== 1)
    return !0;
  var r = {}, t = {}, e = Symbol("assign detection"), n = "abcdefghijklmnopqrst";
  return r[e] = 7, n.split("").forEach(function(a) {
    t[a] = a;
  }), sn({}, r)[e] !== 7 || xc(sn({}, t)).join("") !== n;
}) ? function(t, e) {
  for (var n = TK(t), a = arguments.length, i = 1, o = SK.f, s = EK.f; a > i; )
    for (var u = xK(arguments[i++]), l = o ? IK(xc(u), o(u)) : xc(u), c = l.length, f = 0, v; c > f; )
      v = l[f++], (!r0 || bK(s, u, v)) && (n[v] = u[v]);
  return n;
} : sn, OK = d, e0 = Zx;
OK({ target: "Object", stat: !0, arity: 2, forced: Object.assign !== e0 }, {
  assign: e0
});
var AK = d, RK = B, _K = zr;
AK({ target: "Object", stat: !0, sham: !RK }, {
  create: _K
});
var CK = _, PK = x, n0 = od, qu = !PK(function() {
  if (!(n0 && n0 < 535)) {
    var r = Math.random();
    __defineSetter__.call(null, r, function() {
    }), delete CK[r];
  }
}), MK = d, NK = B, DK = qu, LK = J, FK = Z, kK = sr;
NK && MK({ target: "Object", proto: !0, forced: DK }, {
  __defineGetter__: function(t, e) {
    kK.f(FK(this), t, { get: LK(e), enumerable: !0, configurable: !0 });
  }
});
var BK = d, jK = B, a0 = $u.f;
BK({ target: "Object", stat: !0, forced: Object.defineProperties !== a0, sham: !jK }, {
  defineProperties: a0
});
var UK = d, zK = B, i0 = sr.f;
UK({ target: "Object", stat: !0, forced: Object.defineProperty !== i0, sham: !zK }, {
  defineProperty: i0
});
var VK = d, HK = B, GK = qu, WK = J, qK = Z, YK = sr;
HK && VK({ target: "Object", proto: !0, forced: GK }, {
  __defineSetter__: function(t, e) {
    YK.f(qK(this), t, { set: WK(e), enumerable: !0, configurable: !0 });
  }
});
var Qx = B, KK = x, rI = O, XK = Vr, JK = Ri, ZK = gr, QK = Si.f, tI = rI(QK), rX = rI([].push), tX = Qx && KK(function() {
  var r = /* @__PURE__ */ Object.create(null);
  return r[2] = 2, !tI(r, 2);
}), o0 = function(r) {
  return function(t) {
    for (var e = ZK(t), n = JK(e), a = tX && XK(e) === null, i = n.length, o = 0, s = [], u; i > o; )
      u = n[o++], (!Qx || (a ? u in e : tI(e, u))) && rX(s, r ? [u, e[u]] : e[u]);
    return s;
  };
}, eI = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: o0(!0),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: o0(!1)
}, eX = d, nX = eI.entries;
eX({ target: "Object", stat: !0 }, {
  entries: function(t) {
    return nX(t);
  }
});
var aX = d, iX = ha, oX = x, sX = H, uX = Je.onFreeze, Dv = Object.freeze, lX = oX(function() {
  Dv(1);
});
aX({ target: "Object", stat: !0, forced: lX, sham: !iX }, {
  freeze: function(t) {
    return Dv && sX(t) ? Dv(uX(t)) : t;
  }
});
var cX = d, fX = pr, vX = Zt;
cX({ target: "Object", stat: !0 }, {
  fromEntries: function(t) {
    var e = {};
    return fX(t, function(n, a) {
      vX(e, n, a);
    }, { AS_ENTRIES: !0 }), e;
  }
});
var hX = d, dX = x, gX = gr, nI = Er.f, aI = B, pX = !aI || dX(function() {
  nI(1);
});
hX({ target: "Object", stat: !0, forced: pX, sham: !aI }, {
  getOwnPropertyDescriptor: function(t, e) {
    return nI(gX(t), e);
  }
});
var $X = d, yX = B, mX = jh, bX = gr, wX = Er, SX = Zt;
$X({ target: "Object", stat: !0, sham: !yX }, {
  getOwnPropertyDescriptors: function(t) {
    for (var e = bX(t), n = wX.f, a = mX(e), i = {}, o = 0, s, u; a.length > o; )
      u = n(e, s = a[o++]), u !== void 0 && SX(i, s, u);
    return i;
  }
});
var EX = d, TX = x, xX = yu.f, IX = TX(function() {
  return !Object.getOwnPropertyNames(1);
});
EX({ target: "Object", stat: !0, forced: IX }, {
  getOwnPropertyNames: xX
});
var OX = d, AX = x, RX = Z, iI = Vr, _X = Xh, CX = AX(function() {
  iI(1);
});
OX({ target: "Object", stat: !0, forced: CX, sham: !_X }, {
  getPrototypeOf: function(t) {
    return iI(RX(t));
  }
});
var PX = d, MX = nr, NX = O, DX = J, LX = or, FX = pe, kX = pr, BX = x, s0 = Object.groupBy, jX = MX("Object", "create"), UX = NX([].push), zX = !s0 || BX(function() {
  return s0("ab", function(r) {
    return r;
  }).a.length !== 1;
});
PX({ target: "Object", stat: !0, forced: zX }, {
  groupBy: function(t, e) {
    LX(t), DX(e);
    var n = jX(null), a = 0;
    return kX(t, function(i) {
      var o = FX(e(i, a++));
      o in n ? UX(n[o], i) : n[o] = [i];
    }), n;
  }
});
var VX = d, HX = K;
VX({ target: "Object", stat: !0 }, {
  hasOwn: HX
});
var oI = Object.is || function(t, e) {
  return t === e ? t !== 0 || 1 / t === 1 / e : t !== t && e !== e;
}, GX = d, WX = oI;
GX({ target: "Object", stat: !0 }, {
  is: WX
});
var qX = d, u0 = Ad;
qX({ target: "Object", stat: !0, forced: Object.isExtensible !== u0 }, {
  isExtensible: u0
});
var YX = d, KX = x, XX = H, JX = Tr, sI = Od, Lv = Object.isFrozen, ZX = sI || KX(function() {
  Lv(1);
});
YX({ target: "Object", stat: !0, forced: ZX }, {
  isFrozen: function(t) {
    return !XX(t) || sI && JX(t) === "ArrayBuffer" ? !0 : Lv ? Lv(t) : !1;
  }
});
var QX = d, rJ = x, tJ = H, eJ = Tr, uI = Od, Fv = Object.isSealed, nJ = uI || rJ(function() {
  Fv(1);
});
QX({ target: "Object", stat: !0, forced: nJ }, {
  isSealed: function(t) {
    return !tJ(t) || uI && eJ(t) === "ArrayBuffer" ? !0 : Fv ? Fv(t) : !1;
  }
});
var aJ = d, iJ = Z, lI = Ri, oJ = x, sJ = oJ(function() {
  lI(1);
});
aJ({ target: "Object", stat: !0, forced: sJ }, {
  keys: function(t) {
    return lI(iJ(t));
  }
});
var uJ = d, lJ = B, cJ = qu, fJ = Z, vJ = pe, hJ = Vr, dJ = Er.f;
lJ && uJ({ target: "Object", proto: !0, forced: cJ }, {
  __lookupGetter__: function(t) {
    var e = fJ(this), n = vJ(t), a;
    do
      if (a = dJ(e, n))
        return a.get;
    while (e = hJ(e));
  }
});
var gJ = d, pJ = B, $J = qu, yJ = Z, mJ = pe, bJ = Vr, wJ = Er.f;
pJ && gJ({ target: "Object", proto: !0, forced: $J }, {
  __lookupSetter__: function(t) {
    var e = yJ(this), n = mJ(t), a;
    do
      if (a = wJ(e, n))
        return a.set;
    while (e = bJ(e));
  }
});
var SJ = d, EJ = H, TJ = Je.onFreeze, xJ = ha, IJ = x, kv = Object.preventExtensions, OJ = IJ(function() {
  kv(1);
});
SJ({ target: "Object", stat: !0, forced: OJ, sham: !xJ }, {
  preventExtensions: function(t) {
    return kv && EJ(t) ? kv(TJ(t)) : t;
  }
});
var AJ = B, RJ = hr, _J = H, CJ = GE, PJ = Z, MJ = or, l0 = Object.getPrototypeOf, c0 = Object.setPrototypeOf, f0 = Object.prototype, v0 = "__proto__";
if (AJ && l0 && c0 && !(v0 in f0))
  try {
    RJ(f0, v0, {
      configurable: !0,
      get: function() {
        return l0(PJ(this));
      },
      set: function(t) {
        var e = MJ(this);
        CJ(t) && _J(e) && c0(e, t);
      }
    });
  } catch {
  }
var NJ = d, DJ = H, LJ = Je.onFreeze, FJ = ha, kJ = x, Bv = Object.seal, BJ = kJ(function() {
  Bv(1);
});
NJ({ target: "Object", stat: !0, forced: BJ, sham: !FJ }, {
  seal: function(t) {
    return Bv && DJ(t) ? Bv(LJ(t)) : t;
  }
});
var jJ = d, UJ = Pt;
jJ({ target: "Object", stat: !0 }, {
  setPrototypeOf: UJ
});
var zJ = Uh, VJ = dt, HJ = zJ ? {}.toString : function() {
  return "[object " + VJ(this) + "]";
}, GJ = Uh, WJ = ur, qJ = HJ;
GJ || WJ(Object.prototype, "toString", qJ, { unsafe: !0 });
var YJ = d, KJ = eI.values;
YJ({ target: "Object", stat: !0 }, {
  values: function(t) {
    return KJ(t);
  }
});
var XJ = d, h0 = Gx;
XJ({ global: !0, forced: parseFloat !== h0 }, {
  parseFloat: h0
});
var JJ = d, d0 = Yx;
JJ({ global: !0, forced: parseInt !== d0 }, {
  parseInt: d0
});
var ZJ = aa, QJ = We, rZ = TypeError, Fd = function(r) {
  if (ZJ(r))
    return r;
  throw new rZ(QJ(r) + " is not a constructor");
}, g0 = k, tZ = Fd, eZ = Mr, nZ = G, aZ = nZ("species"), Yu = function(r, t) {
  var e = g0(r).constructor, n;
  return e === void 0 || eZ(n = g0(e)[aZ]) ? t : tZ(n);
}, iZ = TypeError, et = function(r, t) {
  if (r < t)
    throw new iZ("Not enough arguments");
  return r;
}, oZ = _t, cI = /(?:ipad|iphone|ipod).*applewebkit/i.test(oZ), Br = _, sZ = tt, uZ = gt, p0 = Y, lZ = K, fI = x, $0 = vE, cZ = rt, y0 = gu, fZ = et, vZ = cI, hZ = ua, jv = Br.setImmediate, Uv = Br.clearImmediate, dZ = Br.process, Ic = Br.Dispatch, gZ = Br.Function, m0 = Br.MessageChannel, pZ = Br.String, Oc = 0, Xa = {}, b0 = "onreadystatechange", vi, xe, Ac, Rc;
fI(function() {
  vi = Br.location;
});
var kd = function(r) {
  if (lZ(Xa, r)) {
    var t = Xa[r];
    delete Xa[r], t();
  }
}, _c = function(r) {
  return function() {
    kd(r);
  };
}, w0 = function(r) {
  kd(r.data);
}, S0 = function(r) {
  Br.postMessage(pZ(r), vi.protocol + "//" + vi.host);
};
(!jv || !Uv) && (jv = function(t) {
  fZ(arguments.length, 1);
  var e = p0(t) ? t : gZ(t), n = cZ(arguments, 1);
  return Xa[++Oc] = function() {
    sZ(e, void 0, n);
  }, xe(Oc), Oc;
}, Uv = function(t) {
  delete Xa[t];
}, hZ ? xe = function(r) {
  dZ.nextTick(_c(r));
} : Ic && Ic.now ? xe = function(r) {
  Ic.now(_c(r));
} : m0 && !vZ ? (Ac = new m0(), Rc = Ac.port2, Ac.port1.onmessage = w0, xe = uZ(Rc.postMessage, Rc)) : Br.addEventListener && p0(Br.postMessage) && !Br.importScripts && vi && vi.protocol !== "file:" && !fI(S0) ? (xe = S0, Br.addEventListener("message", w0, !1)) : b0 in y0("script") ? xe = function(r) {
  $0.appendChild(y0("script"))[b0] = function() {
    $0.removeChild(this), kd(r);
  };
} : xe = function(r) {
  setTimeout(_c(r), 0);
});
var Ku = {
  set: jv,
  clear: Uv
}, E0 = _, $Z = B, yZ = Object.getOwnPropertyDescriptor, vI = function(r) {
  if (!$Z)
    return E0[r];
  var t = yZ(E0, r);
  return t && t.value;
}, hI = function() {
  this.head = null, this.tail = null;
};
hI.prototype = {
  add: function(r) {
    var t = { item: r, next: null }, e = this.tail;
    e ? e.next = t : this.head = t, this.tail = t;
  },
  get: function() {
    var r = this.head;
    if (r) {
      var t = this.head = r.next;
      return t === null && (this.tail = null), r.item;
    }
  }
};
var dI = hI, mZ = _t, bZ = /ipad|iphone|ipod/i.test(mZ) && typeof Pebble < "u", wZ = _t, SZ = /web0s(?!.*chrome)/i.test(wZ), Wn = _, EZ = vI, T0 = gt, Cc = Ku.set, TZ = dI, xZ = cI, IZ = bZ, OZ = SZ, Pc = ua, x0 = Wn.MutationObserver || Wn.WebKitMutationObserver, I0 = Wn.document, O0 = Wn.process, Io = Wn.Promise, zv = EZ("queueMicrotask"), un, Mc, Nc, Oo, A0;
if (!zv) {
  var Ao = new TZ(), Ro = function() {
    var r, t;
    for (Pc && (r = O0.domain) && r.exit(); t = Ao.get(); )
      try {
        t();
      } catch (e) {
        throw Ao.head && un(), e;
      }
    r && r.enter();
  };
  !xZ && !Pc && !OZ && x0 && I0 ? (Mc = !0, Nc = I0.createTextNode(""), new x0(Ro).observe(Nc, { characterData: !0 }), un = function() {
    Nc.data = Mc = !Mc;
  }) : !IZ && Io && Io.resolve ? (Oo = Io.resolve(void 0), Oo.constructor = Io, A0 = T0(Oo.then, Oo), un = function() {
    A0(Ro);
  }) : Pc ? un = function() {
    O0.nextTick(Ro);
  } : (Cc = T0(Cc, Wn), un = function() {
    Cc(Ro);
  }), zv = function(r) {
    Ao.head || un(), Ao.add(r);
  };
}
var gI = zv, AZ = function(r, t) {
  try {
    arguments.length === 1 ? console.error(r) : console.error(r, t);
  } catch {
  }
}, ga = function(r) {
  try {
    return { error: !1, value: r() };
  } catch (t) {
    return { error: !0, value: t };
  }
}, RZ = _, ji = RZ.Promise, _Z = _, Ja = ji, CZ = Y, PZ = Ai, MZ = Lh, NZ = G, R0 = _u, Dc = Kt;
Ja && Ja.prototype;
var DZ = NZ("species"), Vv = !1, pI = CZ(_Z.PromiseRejectionEvent), LZ = PZ("Promise", function() {
  var r = MZ(Ja), t = r !== String(Ja);
  if (!t && Dc === 66)
    return !0;
  if (!Dc || Dc < 51 || !/native code/.test(r)) {
    var e = new Ja(function(i) {
      i(1);
    }), n = function(i) {
      i(function() {
      }, function() {
      });
    }, a = e.constructor = {};
    if (a[DZ] = n, Vv = e.then(function() {
    }) instanceof n, !Vv)
      return !0;
  }
  return !t && (R0 === "BROWSER" || R0 === "DENO") && !pI;
}), Ui = {
  CONSTRUCTOR: LZ,
  REJECTION_EVENT: pI,
  SUBCLASSING: Vv
}, Nt = {}, _0 = J, FZ = TypeError, kZ = function(r) {
  var t, e;
  this.promise = new r(function(n, a) {
    if (t !== void 0 || e !== void 0)
      throw new FZ("Bad Promise constructor");
    t = n, e = a;
  }), this.resolve = _0(t), this.reject = _0(e);
};
Nt.f = function(r) {
  return new kZ(r);
};
var BZ = d, Hs = ua, ge = _, qn = U, C0 = ur, P0 = Pt, jZ = Lr, UZ = la, zZ = J, ls = Y, VZ = H, HZ = pt, GZ = Yu, $I = Ku.set, Bd = gI, WZ = AZ, qZ = ga, YZ = dI, yI = vr, Gs = ji, jd = Ui, mI = Nt, Xu = "Promise", bI = jd.CONSTRUCTOR, KZ = jd.REJECTION_EVENT, XZ = jd.SUBCLASSING, Lc = yI.getterFor(Xu), JZ = yI.set, dn = Gs && Gs.prototype, Ce = Gs, _o = dn, wI = ge.TypeError, Hv = ge.document, Ud = ge.process, Gv = mI.f, ZZ = Gv, QZ = !!(Hv && Hv.createEvent && ge.dispatchEvent), SI = "unhandledrejection", rQ = "rejectionhandled", M0 = 0, EI = 1, tQ = 2, zd = 1, TI = 2, Co, N0, eQ, D0, xI = function(r) {
  var t;
  return VZ(r) && ls(t = r.then) ? t : !1;
}, II = function(r, t) {
  var e = t.value, n = t.state === EI, a = n ? r.ok : r.fail, i = r.resolve, o = r.reject, s = r.domain, u, l, c;
  try {
    a ? (n || (t.rejection === TI && aQ(t), t.rejection = zd), a === !0 ? u = e : (s && s.enter(), u = a(e), s && (s.exit(), c = !0)), u === r.promise ? o(new wI("Promise-chain cycle")) : (l = xI(u)) ? qn(l, u, i, o) : i(u)) : o(e);
  } catch (f) {
    s && !c && s.exit(), o(f);
  }
}, OI = function(r, t) {
  r.notified || (r.notified = !0, Bd(function() {
    for (var e = r.reactions, n; n = e.get(); )
      II(n, r);
    r.notified = !1, t && !r.rejection && nQ(r);
  }));
}, AI = function(r, t, e) {
  var n, a;
  QZ ? (n = Hv.createEvent("Event"), n.promise = t, n.reason = e, n.initEvent(r, !1, !0), ge.dispatchEvent(n)) : n = { promise: t, reason: e }, !KZ && (a = ge["on" + r]) ? a(n) : r === SI && WZ("Unhandled promise rejection", e);
}, nQ = function(r) {
  qn($I, ge, function() {
    var t = r.facade, e = r.value, n = L0(r), a;
    if (n && (a = qZ(function() {
      Hs ? Ud.emit("unhandledRejection", e, t) : AI(SI, t, e);
    }), r.rejection = Hs || L0(r) ? TI : zd, a.error))
      throw a.value;
  });
}, L0 = function(r) {
  return r.rejection !== zd && !r.parent;
}, aQ = function(r) {
  qn($I, ge, function() {
    var t = r.facade;
    Hs ? Ud.emit("rejectionHandled", t) : AI(rQ, t, r.value);
  });
}, Tn = function(r, t, e) {
  return function(n) {
    r(t, n, e);
  };
}, Nn = function(r, t, e) {
  r.done || (r.done = !0, e && (r = e), r.value = t, r.state = tQ, OI(r, !0));
}, Wv = function(r, t, e) {
  if (!r.done) {
    r.done = !0, e && (r = e);
    try {
      if (r.facade === t)
        throw new wI("Promise can't be resolved itself");
      var n = xI(t);
      n ? Bd(function() {
        var a = { done: !1 };
        try {
          qn(
            n,
            t,
            Tn(Wv, a, r),
            Tn(Nn, a, r)
          );
        } catch (i) {
          Nn(a, i, r);
        }
      }) : (r.value = t, r.state = EI, OI(r, !1));
    } catch (a) {
      Nn({ done: !1 }, a, r);
    }
  }
};
if (bI && (Ce = function(t) {
  HZ(this, _o), zZ(t), qn(Co, this);
  var e = Lc(this);
  try {
    t(Tn(Wv, e), Tn(Nn, e));
  } catch (n) {
    Nn(e, n);
  }
}, _o = Ce.prototype, Co = function(t) {
  JZ(this, {
    type: Xu,
    done: !1,
    notified: !1,
    parent: !1,
    reactions: new YZ(),
    rejection: !1,
    state: M0,
    value: null
  });
}, Co.prototype = C0(_o, "then", function(t, e) {
  var n = Lc(this), a = Gv(GZ(this, Ce));
  return n.parent = !0, a.ok = ls(t) ? t : !0, a.fail = ls(e) && e, a.domain = Hs ? Ud.domain : void 0, n.state === M0 ? n.reactions.add(a) : Bd(function() {
    II(a, n);
  }), a.promise;
}), N0 = function() {
  var r = new Co(), t = Lc(r);
  this.promise = r, this.resolve = Tn(Wv, t), this.reject = Tn(Nn, t);
}, mI.f = Gv = function(r) {
  return r === Ce || r === eQ ? new N0(r) : ZZ(r);
}, ls(Gs) && dn !== Object.prototype)) {
  D0 = dn.then, XZ || C0(dn, "then", function(t, e) {
    var n = this;
    return new Ce(function(a, i) {
      qn(D0, n, a, i);
    }).then(t, e);
  }, { unsafe: !0 });
  try {
    delete dn.constructor;
  } catch {
  }
  P0 && P0(dn, _o);
}
BZ({ global: !0, constructor: !0, wrap: !0, forced: bI }, {
  Promise: Ce
});
jZ(Ce, Xu, !1);
UZ(Xu);
var iQ = ji, oQ = Au, sQ = Ui.CONSTRUCTOR, Ju = sQ || !oQ(function(r) {
  iQ.all(r).then(void 0, function() {
  });
}), uQ = d, lQ = U, cQ = J, fQ = Nt, vQ = ga, hQ = pr, dQ = Ju;
uQ({ target: "Promise", stat: !0, forced: dQ }, {
  all: function(t) {
    var e = this, n = fQ.f(e), a = n.resolve, i = n.reject, o = vQ(function() {
      var s = cQ(e.resolve), u = [], l = 0, c = 1;
      hQ(t, function(f) {
        var v = l++, h = !1;
        c++, lQ(s, e, f).then(function(g) {
          h || (h = !0, u[v] = g, --c || a(u));
        }, i);
      }), --c || a(u);
    });
    return o.error && i(o.value), n.promise;
  }
});
var gQ = d, pQ = Ui.CONSTRUCTOR, qv = ji, $Q = nr, yQ = Y, mQ = ur, F0 = qv && qv.prototype;
gQ({ target: "Promise", proto: !0, forced: pQ, real: !0 }, {
  catch: function(r) {
    return this.then(void 0, r);
  }
});
if (yQ(qv)) {
  var k0 = $Q("Promise").prototype.catch;
  F0.catch !== k0 && mQ(F0, "catch", k0, { unsafe: !0 });
}
var bQ = d, wQ = U, SQ = J, EQ = Nt, TQ = ga, xQ = pr, IQ = Ju;
bQ({ target: "Promise", stat: !0, forced: IQ }, {
  race: function(t) {
    var e = this, n = EQ.f(e), a = n.reject, i = TQ(function() {
      var o = SQ(e.resolve);
      xQ(t, function(s) {
        wQ(o, e, s).then(n.resolve, a);
      });
    });
    return i.error && a(i.value), n.promise;
  }
});
var OQ = d, AQ = Nt, RQ = Ui.CONSTRUCTOR;
OQ({ target: "Promise", stat: !0, forced: RQ }, {
  reject: function(t) {
    var e = AQ.f(this), n = e.reject;
    return n(t), e.promise;
  }
});
var _Q = k, CQ = H, PQ = Nt, RI = function(r, t) {
  if (_Q(r), CQ(t) && t.constructor === r)
    return t;
  var e = PQ.f(r), n = e.resolve;
  return n(t), e.promise;
}, MQ = d, NQ = nr, DQ = Ui.CONSTRUCTOR, LQ = RI;
NQ("Promise");
MQ({ target: "Promise", stat: !0, forced: DQ }, {
  resolve: function(t) {
    return LQ(this, t);
  }
});
var FQ = d, kQ = U, BQ = J, jQ = Nt, UQ = ga, zQ = pr, VQ = Ju;
FQ({ target: "Promise", stat: !0, forced: VQ }, {
  allSettled: function(t) {
    var e = this, n = jQ.f(e), a = n.resolve, i = n.reject, o = UQ(function() {
      var s = BQ(e.resolve), u = [], l = 0, c = 1;
      zQ(t, function(f) {
        var v = l++, h = !1;
        c++, kQ(s, e, f).then(function(g) {
          h || (h = !0, u[v] = { status: "fulfilled", value: g }, --c || a(u));
        }, function(g) {
          h || (h = !0, u[v] = { status: "rejected", reason: g }, --c || a(u));
        });
      }), --c || a(u);
    });
    return o.error && i(o.value), n.promise;
  }
});
var HQ = d, GQ = U, WQ = J, qQ = nr, YQ = Nt, KQ = ga, XQ = pr, JQ = Ju, B0 = "No one promise resolved";
HQ({ target: "Promise", stat: !0, forced: JQ }, {
  any: function(t) {
    var e = this, n = qQ("AggregateError"), a = YQ.f(e), i = a.resolve, o = a.reject, s = KQ(function() {
      var u = WQ(e.resolve), l = [], c = 0, f = 1, v = !1;
      XQ(t, function(h) {
        var g = c++, $ = !1;
        f++, GQ(u, e, h).then(function(y) {
          $ || v || (v = !0, i(y));
        }, function(y) {
          $ || v || ($ = !0, l[g] = y, --f || o(new n(l, B0)));
        });
      }), --f || o(new n(l, B0));
    });
    return s.error && o(s.value), a.promise;
  }
});
var ZQ = d, Ws = ji, QQ = x, _I = nr, CI = Y, rrr = Yu, j0 = RI, trr = ur, Yv = Ws && Ws.prototype, err = !!Ws && QQ(function() {
  Yv.finally.call({ then: function() {
  } }, function() {
  });
});
ZQ({ target: "Promise", proto: !0, real: !0, forced: err }, {
  finally: function(r) {
    var t = rrr(this, _I("Promise")), e = CI(r);
    return this.then(
      e ? function(n) {
        return j0(t, r()).then(function() {
          return n;
        });
      } : r,
      e ? function(n) {
        return j0(t, r()).then(function() {
          throw n;
        });
      } : r
    );
  }
});
if (CI(Ws)) {
  var U0 = _I("Promise").prototype.finally;
  Yv.finally !== U0 && trr(Yv, "finally", U0, { unsafe: !0 });
}
var nrr = d, arr = _, irr = tt, orr = rt, srr = Nt, urr = J, PI = ga, Fc = arr.Promise, z0 = !1, lrr = !Fc || !Fc.try || PI(function() {
  Fc.try(function(r) {
    z0 = r === 8;
  }, 8);
}).error || !z0;
nrr({ target: "Promise", stat: !0, forced: lrr }, {
  try: function(r) {
    var t = arguments.length > 1 ? orr(arguments, 1) : [], e = srr.f(this), n = PI(function() {
      return irr(urr(r), void 0, t);
    });
    return (n.error ? e.reject : e.resolve)(n.value), e.promise;
  }
});
var crr = d, frr = Nt;
crr({ target: "Promise", stat: !0 }, {
  withResolvers: function() {
    var t = frr.f(this);
    return {
      promise: t.promise,
      resolve: t.resolve,
      reject: t.reject
    };
  }
});
var vrr = d, hrr = tt, drr = J, grr = k, prr = x, $rr = !prr(function() {
  Reflect.apply(function() {
  });
});
vrr({ target: "Reflect", stat: !0, forced: $rr }, {
  apply: function(t, e, n) {
    return hrr(drr(t), e, grr(n));
  }
});
var yrr = d, mrr = nr, kc = tt, brr = vx, V0 = Fd, wrr = k, H0 = H, Srr = zr, MI = x, Vd = mrr("Reflect", "construct"), Err = Object.prototype, Trr = [].push, NI = MI(function() {
  function r() {
  }
  return !(Vd(function() {
  }, [], r) instanceof r);
}), DI = !MI(function() {
  Vd(function() {
  });
}), G0 = NI || DI;
yrr({ target: "Reflect", stat: !0, forced: G0, sham: G0 }, {
  construct: function(t, e) {
    V0(t), wrr(e);
    var n = arguments.length < 3 ? t : V0(arguments[2]);
    if (DI && !NI)
      return Vd(t, e, n);
    if (t === n) {
      switch (e.length) {
        case 0:
          return new t();
        case 1:
          return new t(e[0]);
        case 2:
          return new t(e[0], e[1]);
        case 3:
          return new t(e[0], e[1], e[2]);
        case 4:
          return new t(e[0], e[1], e[2], e[3]);
      }
      var a = [null];
      return kc(Trr, a, e), new (kc(brr, t, a))();
    }
    var i = n.prototype, o = Srr(H0(i) ? i : Err), s = kc(t, o, e);
    return H0(s) ? s : o;
  }
});
var xrr = d, Irr = B, W0 = k, Orr = pe, LI = sr, Arr = x, Rrr = Arr(function() {
  Reflect.defineProperty(LI.f({}, 1, { value: 1 }), 1, { value: 2 });
});
xrr({ target: "Reflect", stat: !0, forced: Rrr, sham: !Irr }, {
  defineProperty: function(t, e, n) {
    W0(t);
    var a = Orr(e);
    W0(n);
    try {
      return LI.f(t, a, n), !0;
    } catch {
      return !1;
    }
  }
});
var _rr = d, Crr = k, Prr = Er.f;
_rr({ target: "Reflect", stat: !0 }, {
  deleteProperty: function(t, e) {
    var n = Prr(Crr(t), e);
    return n && !n.configurable ? !1 : delete t[e];
  }
});
var q0 = K, FI = function(r) {
  return r !== void 0 && (q0(r, "value") || q0(r, "writable"));
}, Mrr = d, Nrr = U, Drr = H, Lrr = k, Frr = FI, krr = Er, Brr = Vr;
function kI(r, t) {
  var e = arguments.length < 3 ? r : arguments[2], n, a;
  if (Lrr(r) === e)
    return r[t];
  if (n = krr.f(r, t), n)
    return Frr(n) ? n.value : n.get === void 0 ? void 0 : Nrr(n.get, e);
  if (Drr(a = Brr(r)))
    return kI(a, t, e);
}
Mrr({ target: "Reflect", stat: !0 }, {
  get: kI
});
var jrr = d, Urr = B, zrr = k, Vrr = Er;
jrr({ target: "Reflect", stat: !0, sham: !Urr }, {
  getOwnPropertyDescriptor: function(t, e) {
    return Vrr.f(zrr(t), e);
  }
});
var Hrr = d, Grr = k, Wrr = Vr, qrr = Xh;
Hrr({ target: "Reflect", stat: !0, sham: !qrr }, {
  getPrototypeOf: function(t) {
    return Wrr(Grr(t));
  }
});
var Yrr = d;
Yrr({ target: "Reflect", stat: !0 }, {
  has: function(t, e) {
    return e in t;
  }
});
var Krr = d, Xrr = k, Jrr = Ad;
Krr({ target: "Reflect", stat: !0 }, {
  isExtensible: function(t) {
    return Xrr(t), Jrr(t);
  }
});
var Zrr = d, Qrr = jh;
Zrr({ target: "Reflect", stat: !0 }, {
  ownKeys: Qrr
});
var rtr = d, ttr = nr, etr = k, ntr = ha;
rtr({ target: "Reflect", stat: !0, sham: !ntr }, {
  preventExtensions: function(t) {
    etr(t);
    try {
      var e = ttr("Object", "preventExtensions");
      return e && e(t), !0;
    } catch {
      return !1;
    }
  }
});
var atr = d, itr = U, otr = k, Y0 = H, str = FI, utr = x, Kv = sr, K0 = Er, ltr = Vr, X0 = Qr;
function BI(r, t, e) {
  var n = arguments.length < 4 ? r : arguments[3], a = K0.f(otr(r), t), i, o, s;
  if (!a) {
    if (Y0(o = ltr(r)))
      return BI(o, t, e, n);
    a = X0(0);
  }
  if (str(a)) {
    if (a.writable === !1 || !Y0(n))
      return !1;
    if (i = K0.f(n, t)) {
      if (i.get || i.set || i.writable === !1)
        return !1;
      i.value = e, Kv.f(n, t, i);
    } else
      Kv.f(n, t, X0(0, e));
  } else {
    if (s = a.set, s === void 0)
      return !1;
    itr(s, n, e);
  }
  return !0;
}
var ctr = utr(function() {
  var r = function() {
  }, t = Kv.f(new r(), "a", { configurable: !0 });
  return Reflect.set(r.prototype, "a", 1, t) !== !1;
});
atr({ target: "Reflect", stat: !0, forced: ctr }, {
  set: BI
});
var ftr = d, vtr = k, htr = WE, J0 = Pt;
J0 && ftr({ target: "Reflect", stat: !0 }, {
  setPrototypeOf: function(t, e) {
    vtr(t), htr(e);
    try {
      return J0(t, e), !0;
    } catch {
      return !1;
    }
  }
});
var dtr = d, gtr = _, ptr = Lr;
dtr({ global: !0 }, { Reflect: {} });
ptr(gtr.Reflect, "Reflect", !0);
var $tr = H, ytr = Tr, mtr = G, btr = mtr("match"), Zu = function(r) {
  var t;
  return $tr(r) && ((t = r[btr]) !== void 0 ? !!t : ytr(r) === "RegExp");
}, wtr = k, Hd = function() {
  var r = wtr(this), t = "";
  return r.hasIndices && (t += "d"), r.global && (t += "g"), r.ignoreCase && (t += "i"), r.multiline && (t += "m"), r.dotAll && (t += "s"), r.unicode && (t += "u"), r.unicodeSets && (t += "v"), r.sticky && (t += "y"), t;
}, Str = U, Etr = K, Ttr = Nr, xtr = Hd, Z0 = RegExp.prototype, zi = function(r) {
  var t = r.flags;
  return t === void 0 && !("flags" in Z0) && !Etr(r, "flags") && Ttr(Z0, r) ? Str(xtr, r) : t;
}, Gd = x, Itr = _, Wd = Itr.RegExp, qd = Gd(function() {
  var r = Wd("a", "y");
  return r.lastIndex = 2, r.exec("abcd") !== null;
}), Otr = qd || Gd(function() {
  return !Wd("a", "y").sticky;
}), Atr = qd || Gd(function() {
  var r = Wd("^r", "gy");
  return r.lastIndex = 2, r.exec("str") !== null;
}), Qu = {
  BROKEN_CARET: Atr,
  MISSED_STICKY: Otr,
  UNSUPPORTED_Y: qd
}, Rtr = x, _tr = _, Ctr = _tr.RegExp, Yd = Rtr(function() {
  var r = Ctr(".", "s");
  return !(r.dotAll && r.test(`
`) && r.flags === "s");
}), Ptr = x, Mtr = _, Ntr = Mtr.RegExp, jI = Ptr(function() {
  var r = Ntr("(?<a>b)", "g");
  return r.exec("b").groups.a !== "b" || "b".replace(r, "$<a>c") !== "bc";
}), Dtr = B, Kd = _, Vi = O, Ltr = Ai, Ftr = Ye, ktr = xr, Btr = zr, jtr = $e.f, Q0 = Nr, Utr = Zu, r1 = V, ztr = zi, UI = Qu, Vtr = qE, Htr = ur, Gtr = x, Wtr = K, qtr = vr.enforce, Ytr = la, Ktr = G, zI = Yd, VI = jI, Xtr = Ktr("match"), he = Kd.RegExp, gn = he.prototype, Jtr = Kd.SyntaxError, Ztr = Vi(gn.exec), qs = Vi("".charAt), t1 = Vi("".replace), e1 = Vi("".indexOf), n1 = Vi("".slice), Qtr = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/, Le = /a/g, Bc = /a/g, rer = new he(Le) !== Le, HI = UI.MISSED_STICKY, ter = UI.UNSUPPORTED_Y, eer = Dtr && (!rer || HI || zI || VI || Gtr(function() {
  return Bc[Xtr] = !1, he(Le) !== Le || he(Bc) === Bc || String(he(Le, "i")) !== "/a/i";
})), ner = function(r) {
  for (var t = r.length, e = 0, n = "", a = !1, i; e <= t; e++) {
    if (i = qs(r, e), i === "\\") {
      n += i + qs(r, ++e);
      continue;
    }
    !a && i === "." ? n += "[\\s\\S]" : (i === "[" ? a = !0 : i === "]" && (a = !1), n += i);
  }
  return n;
}, aer = function(r) {
  for (var t = r.length, e = 0, n = "", a = [], i = Btr(null), o = !1, s = !1, u = 0, l = "", c; e <= t; e++) {
    if (c = qs(r, e), c === "\\")
      c += qs(r, ++e);
    else if (c === "]")
      o = !1;
    else if (!o)
      switch (!0) {
        case c === "[":
          o = !0;
          break;
        case c === "(":
          if (n += c, n1(r, e + 1, e + 3) === "?:")
            continue;
          Ztr(Qtr, n1(r, e + 1)) && (e += 2, s = !0), u++;
          continue;
        case (c === ">" && s):
          if (l === "" || Wtr(i, l))
            throw new Jtr("Invalid capture group name");
          i[l] = !0, a[a.length] = [l, u], s = !1, l = "";
          continue;
      }
    s ? l += c : n += c;
  }
  return [n, a];
};
if (Ltr("RegExp", eer)) {
  for (var Ie = function(t, e) {
    var n = Q0(gn, this), a = Utr(t), i = e === void 0, o = [], s = t, u, l, c, f, v, h;
    if (!n && a && i && t.constructor === Ie)
      return t;
    if ((a || Q0(gn, t)) && (t = t.source, i && (e = ztr(s))), t = t === void 0 ? "" : r1(t), e = e === void 0 ? "" : r1(e), s = t, zI && "dotAll" in Le && (l = !!e && e1(e, "s") > -1, l && (e = t1(e, /s/g, ""))), u = e, HI && "sticky" in Le && (c = !!e && e1(e, "y") > -1, c && ter && (e = t1(e, /y/g, ""))), VI && (f = aer(t), t = f[0], o = f[1]), v = Ftr(he(t, e), n ? this : gn, Ie), (l || c || o.length) && (h = qtr(v), l && (h.dotAll = !0, h.raw = Ie(ner(t), u)), c && (h.sticky = !0), o.length && (h.groups = o)), t !== s)
      try {
        ktr(v, "source", s === "" ? "(?:)" : s);
      } catch {
      }
    return v;
  }, a1 = jtr(he), i1 = 0; a1.length > i1; )
    Vtr(Ie, he, a1[i1++]);
  gn.constructor = Ie, Ie.prototype = gn, Htr(Kd, "RegExp", Ie, { constructor: !0 });
}
Ytr("RegExp");
var ier = TypeError, oer = function(r) {
  if (typeof r == "string")
    return r;
  throw new ier("Argument is not a string");
}, ser = d, Hi = O, uer = oer, ler = K, o1 = ju.start, cer = Bi, fer = Array, s1 = RegExp.escape, u1 = Hi("".charAt), Xv = Hi("".charCodeAt), ver = Hi(1.1.toString), her = Hi([].join), GI = /^[0-9a-z]/i, der = /^[$()*+./?[\\\]^{|}]/, ger = RegExp("^[!\"#%&',\\-:;<=>@`~" + cer + "]"), jc = Hi(GI.exec), l1 = {
  "	": "t",
  "\n": "n",
  "\v": "v",
  "\f": "f",
  "\r": "r"
}, Uc = function(r) {
  var t = ver(Xv(r, 0), 16);
  return t.length < 3 ? "\\x" + o1(t, 2, "0") : "\\u" + o1(t, 4, "0");
}, per = !s1 || s1("ab") !== "\\x61b";
ser({ target: "RegExp", stat: !0, forced: per }, {
  escape: function(t) {
    uer(t);
    for (var e = t.length, n = fer(e), a = 0; a < e; a++) {
      var i = u1(t, a);
      if (a === 0 && jc(GI, i))
        n[a] = Uc(i);
      else if (ler(l1, i))
        n[a] = "\\" + l1[i];
      else if (jc(der, i))
        n[a] = "\\" + i;
      else if (jc(ger, i))
        n[a] = Uc(i);
      else {
        var o = Xv(i, 0);
        (o & 63488) !== 55296 ? n[a] = i : o >= 56320 || a + 1 >= e || (Xv(t, a + 1) & 64512) !== 56320 ? n[a] = Uc(i) : (n[a] = i, n[++a] = u1(t, a));
      }
    }
    return her(n, "");
  }
});
var $er = B, yer = Yd, mer = Tr, ber = hr, wer = vr.get, c1 = RegExp.prototype, Ser = TypeError;
$er && yer && ber(c1, "dotAll", {
  configurable: !0,
  get: function() {
    if (this !== c1) {
      if (mer(this) === "RegExp")
        return !!wer(this).dotAll;
      throw new Ser("Incompatible receiver, RegExp required");
    }
  }
});
var xn = U, rl = O, Eer = V, Ter = Hd, xer = Qu, Ier = ta, Oer = zr, Aer = vr.get, Rer = Yd, _er = jI, Cer = Ier("native-string-replace", String.prototype.replace), Ys = RegExp.prototype.exec, Jv = Ys, Per = rl("".charAt), Mer = rl("".indexOf), Ner = rl("".replace), zc = rl("".slice), Zv = function() {
  var r = /a/, t = /b*/g;
  return xn(Ys, r, "a"), xn(Ys, t, "a"), r.lastIndex !== 0 || t.lastIndex !== 0;
}(), WI = xer.BROKEN_CARET, Qv = /()??/.exec("")[1] !== void 0, Der = Zv || Qv || WI || Rer || _er;
Der && (Jv = function(t) {
  var e = this, n = Aer(e), a = Eer(t), i = n.raw, o, s, u, l, c, f, v;
  if (i)
    return i.lastIndex = e.lastIndex, o = xn(Jv, i, a), e.lastIndex = i.lastIndex, o;
  var h = n.groups, g = WI && e.sticky, $ = xn(Ter, e), y = e.source, p = 0, S = a;
  if (g && ($ = Ner($, "y", ""), Mer($, "g") === -1 && ($ += "g"), S = zc(a, e.lastIndex), e.lastIndex > 0 && (!e.multiline || e.multiline && Per(a, e.lastIndex - 1) !== `
`) && (y = "(?: " + y + ")", S = " " + S, p++), s = new RegExp("^(?:" + y + ")", $)), Qv && (s = new RegExp("^" + y + "$(?!\\s)", $)), Zv && (u = e.lastIndex), l = xn(Ys, g ? s : e, S), g ? l ? (l.input = zc(l.input, p), l[0] = zc(l[0], p), l.index = e.lastIndex, e.lastIndex += l[0].length) : e.lastIndex = 0 : Zv && l && (e.lastIndex = e.global ? l.index + l[0].length : u), Qv && l && l.length > 1 && xn(Cer, l[0], s, function() {
    for (c = 1; c < arguments.length - 2; c++)
      arguments[c] === void 0 && (l[c] = void 0);
  }), l && h)
    for (l.groups = f = Oer(null), c = 0; c < h.length; c++)
      v = h[c], f[v[0]] = l[v[1]];
  return l;
});
var Xd = Jv, Ler = d, f1 = Xd;
Ler({ target: "RegExp", proto: !0, forced: /./.exec !== f1 }, {
  exec: f1
});
var Fer = _, ker = B, Ber = hr, jer = Hd, Uer = x, qI = Fer.RegExp, YI = qI.prototype, zer = ker && Uer(function() {
  var r = !0;
  try {
    qI(".", "d");
  } catch {
    r = !1;
  }
  var t = {}, e = "", n = r ? "dgimsy" : "gimsy", a = function(u, l) {
    Object.defineProperty(t, u, { get: function() {
      return e += l, !0;
    } });
  }, i = {
    dotAll: "s",
    global: "g",
    ignoreCase: "i",
    multiline: "m",
    sticky: "y"
  };
  r && (i.hasIndices = "d");
  for (var o in i)
    a(o, i[o]);
  var s = Object.getOwnPropertyDescriptor(YI, "flags").get.call(t);
  return s !== n || e !== n;
});
zer && Ber(YI, "flags", {
  configurable: !0,
  get: jer
});
var Ver = B, Her = Qu.MISSED_STICKY, Ger = Tr, Wer = hr, qer = vr.get, v1 = RegExp.prototype, Yer = TypeError;
Ver && Her && Wer(v1, "sticky", {
  configurable: !0,
  get: function() {
    if (this !== v1) {
      if (Ger(this) === "RegExp")
        return !!qer(this).sticky;
      throw new Yer("Incompatible receiver, RegExp required");
    }
  }
});
var Ker = d, h1 = U, Xer = Y, d1 = k, Jer = V, Zer = function() {
  var r = !1, t = /[ac]/;
  return t.exec = function() {
    return r = !0, /./.exec.apply(this, arguments);
  }, t.test("abc") === !0 && r;
}(), Qer = /./.test;
Ker({ target: "RegExp", proto: !0, forced: !Zer }, {
  test: function(r) {
    var t = d1(this), e = Jer(r), n = t.exec;
    if (!Xer(n))
      return h1(Qer, t, e);
    var a = h1(n, t, e);
    return a === null ? !1 : (d1(a), !0);
  }
});
var rnr = na.PROPER, tnr = ur, enr = k, g1 = V, nnr = x, anr = zi, Jd = "toString", KI = RegExp.prototype, XI = KI[Jd], inr = nnr(function() {
  return XI.call({ source: "a", flags: "b" }) !== "/a/b";
}), onr = rnr && XI.name !== Jd;
(inr || onr) && tnr(KI, Jd, function() {
  var t = enr(this), e = g1(t.source), n = g1(anr(t));
  return "/" + e + "/" + n;
}, { unsafe: !0 });
var snr = Uu, unr = Mx;
snr("Set", function(r) {
  return function() {
    return r(this, arguments.length ? arguments[0] : void 0);
  };
}, unr);
var Vc = O, Po = Set.prototype, $t = {
  // eslint-disable-next-line es/no-set -- safe
  Set,
  add: Vc(Po.add),
  has: Vc(Po.has),
  remove: Vc(Po.delete),
  proto: Po
}, lnr = $t.has, Ze = function(r) {
  return lnr(r), r;
}, cnr = U, Qe = function(r, t, e) {
  for (var n = e ? r : r.iterator, a = r.next, i, o; !(i = cnr(a, n)).done; )
    if (o = t(i.value), o !== void 0)
      return o;
}, JI = O, fnr = Qe, ZI = $t, vnr = ZI.Set, QI = ZI.proto, hnr = JI(QI.forEach), rO = JI(QI.keys), dnr = rO(new vnr()).next, pa = function(r, t, e) {
  return e ? fnr({ iterator: rO(r), next: dnr }, t) : hnr(r, t);
}, tO = $t, gnr = pa, pnr = tO.Set, $nr = tO.add, Zd = function(r) {
  var t = new pnr();
  return gnr(r, function(e) {
    $nr(t, e);
  }), t;
}, ynr = Tu, mnr = $t, Gi = ynr(mnr.proto, "size", "get") || function(r) {
  return r.size;
}, p1 = J, eO = k, $1 = U, bnr = cr, wnr = Hr, y1 = "Invalid size", Snr = RangeError, Enr = TypeError, Tnr = Math.max, nO = function(r, t) {
  this.set = r, this.size = Tnr(t, 0), this.has = p1(r.has), this.keys = p1(r.keys);
};
nO.prototype = {
  getIterator: function() {
    return wnr(eO($1(this.keys, this.set)));
  },
  includes: function(r) {
    return $1(this.has, this.set, r);
  }
};
var rn = function(r) {
  eO(r);
  var t = +r.size;
  if (t !== t)
    throw new Enr(y1);
  var e = bnr(t);
  if (e < 0)
    throw new Snr(y1);
  return new nO(r, e);
}, xnr = Ze, aO = $t, Inr = Zd, Onr = Gi, Anr = rn, Rnr = pa, _nr = Qe, Cnr = aO.has, m1 = aO.remove, Pnr = function(t) {
  var e = xnr(this), n = Anr(t), a = Inr(e);
  return Onr(e) <= n.size ? Rnr(e, function(i) {
    n.includes(i) && m1(a, i);
  }) : _nr(n.getIterator(), function(i) {
    Cnr(e, i) && m1(a, i);
  }), a;
}, Mnr = nr, b1 = function(r) {
  return {
    size: r,
    has: function() {
      return !1;
    },
    keys: function() {
      return {
        next: function() {
          return { done: !0 };
        }
      };
    }
  };
}, w1 = function(r) {
  return {
    size: r,
    has: function() {
      return !0;
    },
    keys: function() {
      throw new Error("e");
    }
  };
}, tn = function(r, t) {
  var e = Mnr("Set");
  try {
    new e()[r](b1(0));
    try {
      return new e()[r](b1(-1)), !1;
    } catch {
      if (!t)
        return !0;
      try {
        return new e()[r](w1(-1 / 0)), !1;
      } catch {
        var n = new e();
        return n.add(1), n.add(2), t(n[r](w1(1 / 0)));
      }
    }
  } catch {
    return !1;
  }
}, Nnr = d, Dnr = Pnr, Lnr = tn, Fnr = !Lnr("difference", function(r) {
  return r.size === 0;
});
Nnr({ target: "Set", proto: !0, real: !0, forced: Fnr }, {
  difference: Dnr
});
var knr = Ze, Qd = $t, Bnr = Gi, jnr = rn, Unr = pa, znr = Qe, Vnr = Qd.Set, S1 = Qd.add, Hnr = Qd.has, Gnr = function(t) {
  var e = knr(this), n = jnr(t), a = new Vnr();
  return Bnr(e) > n.size ? znr(n.getIterator(), function(i) {
    Hnr(e, i) && S1(a, i);
  }) : Unr(e, function(i) {
    n.includes(i) && S1(a, i);
  }), a;
}, Wnr = d, qnr = x, Ynr = Gnr, Knr = tn, Xnr = !Knr("intersection", function(r) {
  return r.size === 2 && r.has(1) && r.has(2);
}) || qnr(function() {
  return String(Array.from((/* @__PURE__ */ new Set([1, 2, 3])).intersection(/* @__PURE__ */ new Set([3, 2])))) !== "3,2";
});
Wnr({ target: "Set", proto: !0, real: !0, forced: Xnr }, {
  intersection: Ynr
});
var Jnr = Ze, Znr = $t.has, Qnr = Gi, rar = rn, tar = pa, ear = Qe, nar = Xe, aar = function(t) {
  var e = Jnr(this), n = rar(t);
  if (Qnr(e) <= n.size)
    return tar(e, function(i) {
      if (n.includes(i))
        return !1;
    }, !0) !== !1;
  var a = n.getIterator();
  return ear(a, function(i) {
    if (Znr(e, i))
      return nar(a, "normal", !1);
  }) !== !1;
}, iar = d, oar = aar, sar = tn, uar = !sar("isDisjointFrom", function(r) {
  return !r;
});
iar({ target: "Set", proto: !0, real: !0, forced: uar }, {
  isDisjointFrom: oar
});
var lar = Ze, car = Gi, far = pa, har = rn, dar = function(t) {
  var e = lar(this), n = har(t);
  return car(e) > n.size ? !1 : far(e, function(a) {
    if (!n.includes(a))
      return !1;
  }, !0) !== !1;
}, gar = d, par = dar, $ar = tn, yar = !$ar("isSubsetOf", function(r) {
  return r;
});
gar({ target: "Set", proto: !0, real: !0, forced: yar }, {
  isSubsetOf: par
});
var mar = Ze, bar = $t.has, war = Gi, Sar = rn, Ear = Qe, Tar = Xe, xar = function(t) {
  var e = mar(this), n = Sar(t);
  if (war(e) < n.size)
    return !1;
  var a = n.getIterator();
  return Ear(a, function(i) {
    if (!bar(e, i))
      return Tar(a, "normal", !1);
  }) !== !1;
}, Iar = d, Oar = xar, Aar = tn, Rar = !Aar("isSupersetOf", function(r) {
  return !r;
});
Iar({ target: "Set", proto: !0, real: !0, forced: Rar }, {
  isSupersetOf: Oar
});
var _ar = Ze, rg = $t, Car = Zd, Par = rn, Mar = Qe, Nar = rg.add, Dar = rg.has, Lar = rg.remove, Far = function(t) {
  var e = _ar(this), n = Par(t).getIterator(), a = Car(e);
  return Mar(n, function(i) {
    Dar(e, i) ? Lar(a, i) : Nar(a, i);
  }), a;
}, kar = d, Bar = Far, jar = tn;
kar({ target: "Set", proto: !0, real: !0, forced: !jar("symmetricDifference") }, {
  symmetricDifference: Bar
});
var Uar = Ze, zar = $t.add, Var = Zd, Har = rn, Gar = Qe, War = function(t) {
  var e = Uar(this), n = Har(t).getIterator(), a = Var(e);
  return Gar(n, function(i) {
    zar(a, i);
  }), a;
}, qar = d, Yar = War, Kar = tn;
qar({ target: "Set", proto: !0, real: !0, forced: !Kar("union") }, {
  union: Yar
});
var Xar = d, Jar = O, Zar = or, Qar = cr, rir = V, tir = x, eir = Jar("".charAt), nir = tir(function() {
  return "𠮷".at(-2) !== "\uD842";
});
Xar({ target: "String", proto: !0, forced: nir }, {
  at: function(t) {
    var e = rir(Zar(this)), n = e.length, a = Qar(t), i = a >= 0 ? a : n + a;
    return i < 0 || i >= n ? void 0 : eir(e, i);
  }
});
var tg = O, air = cr, iir = V, oir = or, sir = tg("".charAt), E1 = tg("".charCodeAt), uir = tg("".slice), T1 = function(r) {
  return function(t, e) {
    var n = iir(oir(t)), a = air(e), i = n.length, o, s;
    return a < 0 || a >= i ? r ? "" : void 0 : (o = E1(n, a), o < 55296 || o > 56319 || a + 1 === i || (s = E1(n, a + 1)) < 56320 || s > 57343 ? r ? sir(n, a) : o : r ? uir(n, a, a + 2) : (o - 55296 << 10) + (s - 56320) + 65536);
  };
}, tl = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: T1(!1),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: T1(!0)
}, lir = d, cir = tl.codeAt;
lir({ target: "String", proto: !0 }, {
  codePointAt: function(t) {
    return cir(this, t);
  }
});
var fir = Zu, vir = TypeError, eg = function(r) {
  if (fir(r))
    throw new vir("The method doesn't accept regular expressions");
  return r;
}, hir = G, dir = hir("match"), ng = function(r) {
  var t = /./;
  try {
    "/./"[r](t);
  } catch {
    try {
      return t[dir] = !1, "/./"[r](t);
    } catch {
    }
  }
  return !1;
}, gir = d, pir = qe, $ir = Er.f, yir = Ur, x1 = V, mir = eg, bir = or, wir = ng, Sir = pir("".slice), Eir = Math.min, iO = wir("endsWith"), Tir = !iO && !!function() {
  var r = $ir(String.prototype, "endsWith");
  return r && !r.writable;
}();
gir({ target: "String", proto: !0, forced: !Tir && !iO }, {
  endsWith: function(t) {
    var e = x1(bir(this));
    mir(t);
    var n = arguments.length > 1 ? arguments[1] : void 0, a = e.length, i = n === void 0 ? a : Eir(yir(n), a), o = x1(t);
    return Sir(e, i - o.length, i) === o;
  }
});
var xir = d, Iir = O, Oir = Jt, Air = RangeError, I1 = String.fromCharCode, O1 = String.fromCodePoint, Rir = Iir([].join), _ir = !!O1 && O1.length !== 1;
xir({ target: "String", stat: !0, arity: 1, forced: _ir }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  fromCodePoint: function(t) {
    for (var e = [], n = arguments.length, a = 0, i; n > a; ) {
      if (i = +arguments[a++], Oir(i, 1114111) !== i)
        throw new Air(i + " is not a valid code point");
      e[a] = i < 65536 ? I1(i) : I1(((i -= 65536) >> 10) + 55296, i % 1024 + 56320);
    }
    return Rir(e, "");
  }
});
var Cir = d, Pir = O, Mir = eg, Nir = or, A1 = V, Dir = ng, Lir = Pir("".indexOf);
Cir({ target: "String", proto: !0, forced: !Dir("includes") }, {
  includes: function(t) {
    return !!~Lir(
      A1(Nir(this)),
      A1(Mir(t)),
      arguments.length > 1 ? arguments[1] : void 0
    );
  }
});
var Fir = d, kir = O, Bir = or, jir = V, R1 = kir("".charCodeAt);
Fir({ target: "String", proto: !0 }, {
  isWellFormed: function() {
    for (var t = jir(Bir(this)), e = t.length, n = 0; n < e; n++) {
      var a = R1(t, n);
      if ((a & 63488) === 55296 && (a >= 56320 || ++n >= e || (R1(t, n) & 64512) !== 56320))
        return !1;
    }
    return !0;
  }
});
var Uir = tl.charAt, zir = V, oO = vr, Vir = ed, _1 = sa, sO = "String Iterator", Hir = oO.set, Gir = oO.getterFor(sO);
Vir(String, "String", function(r) {
  Hir(this, {
    type: sO,
    string: zir(r),
    index: 0
  });
}, function() {
  var t = Gir(this), e = t.string, n = t.index, a;
  return n >= e.length ? _1(void 0, !0) : (a = Uir(e, n), t.index += a.length, _1(a, !1));
});
var C1 = U, P1 = ur, Wir = Xd, M1 = x, uO = G, qir = xr, Yir = uO("species"), Hc = RegExp.prototype, el = function(r, t, e, n) {
  var a = uO(r), i = !M1(function() {
    var l = {};
    return l[a] = function() {
      return 7;
    }, ""[r](l) !== 7;
  }), o = i && !M1(function() {
    var l = !1, c = /a/;
    return r === "split" && (c = {}, c.constructor = {}, c.constructor[Yir] = function() {
      return c;
    }, c.flags = "", c[a] = /./[a]), c.exec = function() {
      return l = !0, null;
    }, c[a](""), !l;
  });
  if (!i || !o || e) {
    var s = /./[a], u = t(a, ""[r], function(l, c, f, v, h) {
      var g = c.exec;
      return g === Wir || g === Hc.exec ? i && !h ? { done: !0, value: C1(s, c, f, v) } : { done: !0, value: C1(l, f, c, v) } : { done: !1 };
    });
    P1(String.prototype, r, u[0]), P1(Hc, a, u[1]);
  }
  n && qir(Hc[a], "sham", !0);
}, Kir = tl.charAt, nl = function(r, t, e) {
  return t + (e ? Kir(r, t).length : 1);
}, N1 = U, Xir = k, Jir = Y, Zir = Tr, Qir = Xd, ror = TypeError, Wi = function(r, t) {
  var e = r.exec;
  if (Jir(e)) {
    var n = N1(e, r, t);
    return n !== null && Xir(n), n;
  }
  if (Zir(r) === "RegExp")
    return N1(Qir, r, t);
  throw new ror("RegExp#exec called on incompatible receiver");
}, tor = U, eor = el, nor = k, aor = Mr, ior = Ur, Gc = V, oor = or, sor = Ct, uor = nl, D1 = Wi;
eor("match", function(r, t, e) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function(a) {
      var i = oor(this), o = aor(a) ? void 0 : sor(a, r);
      return o ? tor(o, a, i) : new RegExp(a)[r](Gc(i));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function(n) {
      var a = nor(this), i = Gc(n), o = e(t, a, i);
      if (o.done)
        return o.value;
      if (!a.global)
        return D1(a, i);
      var s = a.unicode;
      a.lastIndex = 0;
      for (var u = [], l = 0, c; (c = D1(a, i)) !== null; ) {
        var f = Gc(c[0]);
        u[l] = f, f === "" && (a.lastIndex = uor(i, ior(a.lastIndex), s)), l++;
      }
      return l === 0 ? null : u;
    }
  ];
});
var lor = d, cor = U, lO = qe, vor = td, Mo = sa, L1 = or, cO = Ur, hi = V, hor = k, dor = Mr, gor = Tr, por = Zu, fO = zi, $or = Ct, yor = ur, mor = x, bor = G, wor = Yu, Sor = nl, Eor = Wi, vO = vr, Tor = Xt, Ks = bor("matchAll"), hO = "RegExp String", dO = hO + " Iterator", xor = vO.set, Ior = vO.getterFor(dO), F1 = RegExp.prototype, Oor = TypeError, rh = lO("".indexOf), Xs = lO("".matchAll), Wc = !!Xs && !mor(function() {
  Xs("a", /./);
}), Aor = vor(function(t, e, n, a) {
  xor(this, {
    type: dO,
    regexp: t,
    string: e,
    global: n,
    unicode: a,
    done: !1
  });
}, hO, function() {
  var t = Ior(this);
  if (t.done)
    return Mo(void 0, !0);
  var e = t.regexp, n = t.string, a = Eor(e, n);
  return a === null ? (t.done = !0, Mo(void 0, !0)) : t.global ? (hi(a[0]) === "" && (e.lastIndex = Sor(n, cO(e.lastIndex), t.unicode)), Mo(a, !1)) : (t.done = !0, Mo(a, !1));
}), gO = function(r) {
  var t = hor(this), e = hi(r), n = wor(t, RegExp), a = hi(fO(t)), i, o, s;
  return i = new n(n === RegExp ? t.source : t, a), o = !!~rh(a, "g"), s = !!~rh(a, "u"), i.lastIndex = cO(t.lastIndex), new Aor(i, e, o, s);
};
lor({ target: "String", proto: !0, forced: Wc }, {
  matchAll: function(t) {
    var e = L1(this), n, a, i, o;
    if (dor(t)) {
      if (Wc)
        return Xs(e, t);
    } else {
      if (por(t) && (n = hi(L1(fO(t))), !~rh(n, "g")))
        throw new Oor("`.matchAll` does not allow non-global regexes");
      if (Wc)
        return Xs(e, t);
      if (i = $or(t, Ks), i === void 0 && Tor && gor(t) === "RegExp" && (i = gO), i)
        return cor(i, t, e);
    }
    return a = hi(e), o = new RegExp(t, "g"), o[Ks](a);
  }
});
Ks in F1 || yor(F1, Ks, gO);
var Ror = _t, pO = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(Ror), _or = d, Cor = ju.end, Por = pO;
_or({ target: "String", proto: !0, forced: Por }, {
  padEnd: function(t) {
    return Cor(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var Mor = d, Nor = ju.start, Dor = pO;
Mor({ target: "String", proto: !0, forced: Dor }, {
  padStart: function(t) {
    return Nor(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var Lor = d, $O = O, For = gr, kor = Z, k1 = V, Bor = ar, B1 = $O([].push), jor = $O([].join);
Lor({ target: "String", stat: !0 }, {
  raw: function(t) {
    var e = For(kor(t).raw), n = Bor(e);
    if (!n)
      return "";
    for (var a = arguments.length, i = [], o = 0; ; ) {
      if (B1(i, k1(e[o++])), o === n)
        return jor(i, "");
      o < a && B1(i, k1(arguments[o]));
    }
  }
});
var Uor = d, zor = Bu;
Uor({ target: "String", proto: !0 }, {
  repeat: zor
});
var ag = O, Vor = Z, Hor = Math.floor, qc = ag("".charAt), Gor = ag("".replace), Yc = ag("".slice), Wor = /\$([$&'`]|\d{1,2}|<[^>]*>)/g, qor = /\$([$&'`]|\d{1,2})/g, yO = function(r, t, e, n, a, i) {
  var o = e + r.length, s = n.length, u = qor;
  return a !== void 0 && (a = Vor(a), u = Wor), Gor(i, u, function(l, c) {
    var f;
    switch (qc(c, 0)) {
      case "$":
        return "$";
      case "&":
        return r;
      case "`":
        return Yc(t, 0, e);
      case "'":
        return Yc(t, o);
      case "<":
        f = a[Yc(c, 1, -1)];
        break;
      default:
        var v = +c;
        if (v === 0)
          return l;
        if (v > s) {
          var h = Hor(v / 10);
          return h === 0 ? l : h <= s ? n[h - 1] === void 0 ? qc(c, 1) : n[h - 1] + qc(c, 1) : l;
        }
        f = n[v - 1];
    }
    return f === void 0 ? "" : f;
  });
}, Yor = tt, j1 = U, al = O, Kor = el, Xor = x, Jor = k, Zor = Y, Qor = Mr, rsr = cr, tsr = Ur, ln = V, esr = or, nsr = nl, asr = Ct, isr = yO, osr = Wi, ssr = G, th = ssr("replace"), usr = Math.max, lsr = Math.min, csr = al([].concat), Kc = al([].push), U1 = al("".indexOf), z1 = al("".slice), fsr = function(r) {
  return r === void 0 ? r : String(r);
}, vsr = function() {
  return "a".replace(/./, "$0") === "$0";
}(), V1 = function() {
  return /./[th] ? /./[th]("a", "$0") === "" : !1;
}(), hsr = !Xor(function() {
  var r = /./;
  return r.exec = function() {
    var t = [];
    return t.groups = { a: "7" }, t;
  }, "".replace(r, "$<a>") !== "7";
});
Kor("replace", function(r, t, e) {
  var n = V1 ? "$" : "$0";
  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function(i, o) {
      var s = esr(this), u = Qor(i) ? void 0 : asr(i, th);
      return u ? j1(u, i, s, o) : j1(t, ln(s), i, o);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function(a, i) {
      var o = Jor(this), s = ln(a);
      if (typeof i == "string" && U1(i, n) === -1 && U1(i, "$<") === -1) {
        var u = e(t, o, s, i);
        if (u.done)
          return u.value;
      }
      var l = Zor(i);
      l || (i = ln(i));
      var c = o.global, f;
      c && (f = o.unicode, o.lastIndex = 0);
      for (var v = [], h; h = osr(o, s), !(h === null || (Kc(v, h), !c)); ) {
        var g = ln(h[0]);
        g === "" && (o.lastIndex = nsr(s, tsr(o.lastIndex), f));
      }
      for (var $ = "", y = 0, p = 0; p < v.length; p++) {
        h = v[p];
        for (var S = ln(h[0]), I = usr(lsr(rsr(h.index), s.length), 0), A = [], N, z = 1; z < h.length; z++)
          Kc(A, fsr(h[z]));
        var X = h.groups;
        if (l) {
          var Q = csr([S], A, I, s);
          X !== void 0 && Kc(Q, X), N = ln(Yor(i, void 0, Q));
        } else
          N = isr(S, s, I, A, X, i);
        I >= y && ($ += z1(s, y, I) + N, y = I + S.length);
      }
      return $ + z1(s, y);
    }
  ];
}, !hsr || !vsr || V1);
var dsr = d, gsr = U, ig = O, H1 = or, psr = Y, $sr = Mr, ysr = Zu, Pa = V, msr = Ct, bsr = zi, wsr = yO, Ssr = G, Esr = Ssr("replace"), Tsr = TypeError, Xc = ig("".indexOf);
ig("".replace);
var G1 = ig("".slice), xsr = Math.max;
dsr({ target: "String", proto: !0 }, {
  replaceAll: function(t, e) {
    var n = H1(this), a, i, o, s, u, l, c, f, v, h, g = 0, $ = "";
    if (!$sr(t)) {
      if (a = ysr(t), a && (i = Pa(H1(bsr(t))), !~Xc(i, "g")))
        throw new Tsr("`.replaceAll` does not allow non-global regexes");
      if (o = msr(t, Esr), o)
        return gsr(o, t, n, e);
    }
    for (s = Pa(n), u = Pa(t), l = psr(e), l || (e = Pa(e)), c = u.length, f = xsr(1, c), v = Xc(s, u); v !== -1; )
      h = l ? Pa(e(u, v, s)) : wsr(u, s, v, [], void 0, e), $ += G1(s, g, v) + h, g = v + c, v = v + f > s.length ? -1 : Xc(s, u, v + f);
    return g < s.length && ($ += G1(s, g)), $;
  }
});
var Isr = U, Osr = el, Asr = k, Rsr = Mr, _sr = or, W1 = oI, q1 = V, Csr = Ct, Psr = Wi;
Osr("search", function(r, t, e) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function(a) {
      var i = _sr(this), o = Rsr(a) ? void 0 : Csr(a, r);
      return o ? Isr(o, a, i) : new RegExp(a)[r](q1(i));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function(n) {
      var a = Asr(this), i = q1(n), o = e(t, a, i);
      if (o.done)
        return o.value;
      var s = a.lastIndex;
      W1(s, 0) || (a.lastIndex = 0);
      var u = Psr(a, i);
      return W1(a.lastIndex, s) || (a.lastIndex = s), u === null ? -1 : u.index;
    }
  ];
});
var Jc = U, mO = O, Msr = el, Nsr = k, Dsr = Mr, Lsr = or, Fsr = Yu, ksr = nl, Bsr = Ur, Y1 = V, jsr = Ct, K1 = Wi, Usr = Qu, zsr = x, cn = Usr.UNSUPPORTED_Y, Vsr = 4294967295, Hsr = Math.min, Zc = mO([].push), Qc = mO("".slice), Gsr = !zsr(function() {
  var r = /(?:)/, t = r.exec;
  r.exec = function() {
    return t.apply(this, arguments);
  };
  var e = "ab".split(r);
  return e.length !== 2 || e[0] !== "a" || e[1] !== "b";
}), X1 = "abbc".split(/(b)*/)[1] === "c" || // eslint-disable-next-line regexp/no-empty-group -- required for testing
"test".split(/(?:)/, -1).length !== 4 || "ab".split(/(?:ab)*/).length !== 2 || ".".split(/(.?)(.?)/).length !== 4 || // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
".".split(/()()/).length > 1 || "".split(/.?/).length;
Msr("split", function(r, t, e) {
  var n = "0".split(void 0, 0).length ? function(a, i) {
    return a === void 0 && i === 0 ? [] : Jc(t, this, a, i);
  } : t;
  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function(i, o) {
      var s = Lsr(this), u = Dsr(i) ? void 0 : jsr(i, r);
      return u ? Jc(u, i, s, o) : Jc(n, Y1(s), i, o);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function(a, i) {
      var o = Nsr(this), s = Y1(a);
      if (!X1) {
        var u = e(n, o, s, i, n !== t);
        if (u.done)
          return u.value;
      }
      var l = Fsr(o, RegExp), c = o.unicode, f = (o.ignoreCase ? "i" : "") + (o.multiline ? "m" : "") + (o.unicode ? "u" : "") + (cn ? "g" : "y"), v = new l(cn ? "^(?:" + o.source + ")" : o, f), h = i === void 0 ? Vsr : i >>> 0;
      if (h === 0)
        return [];
      if (s.length === 0)
        return K1(v, s) === null ? [s] : [];
      for (var g = 0, $ = 0, y = []; $ < s.length; ) {
        v.lastIndex = cn ? 0 : $;
        var p = K1(v, cn ? Qc(s, $) : s), S;
        if (p === null || (S = Hsr(Bsr(v.lastIndex + (cn ? $ : 0)), s.length)) === g)
          $ = ksr(s, $, c);
        else {
          if (Zc(y, Qc(s, g, $)), y.length === h)
            return y;
          for (var I = 1; I <= p.length - 1; I++)
            if (Zc(y, p[I]), y.length === h)
              return y;
          $ = g = S;
        }
      }
      return Zc(y, Qc(s, g)), y;
    }
  ];
}, X1 || !Gsr, cn);
var Wsr = d, qsr = qe, Ysr = Er.f, Ksr = Ur, J1 = V, Xsr = eg, Jsr = or, Zsr = ng, Qsr = qsr("".slice), rur = Math.min, bO = Zsr("startsWith"), tur = !bO && !!function() {
  var r = Ysr(String.prototype, "startsWith");
  return r && !r.writable;
}();
Wsr({ target: "String", proto: !0, forced: !tur && !bO }, {
  startsWith: function(t) {
    var e = J1(Jsr(this));
    Xsr(t);
    var n = Ksr(rur(arguments.length > 1 ? arguments[1] : void 0, e.length)), a = J1(t);
    return Qsr(e, n, n + a.length) === a;
  }
});
var eur = d, nur = O, aur = or, Z1 = cr, iur = V, our = nur("".slice), sur = Math.max, uur = Math.min, lur = !"".substr || "ab".substr(-1) !== "b";
eur({ target: "String", proto: !0, forced: lur }, {
  substr: function(t, e) {
    var n = iur(aur(this)), a = n.length, i = Z1(t), o, s;
    return i === 1 / 0 && (i = 0), i < 0 && (i = sur(a + i, 0)), o = e === void 0 ? a : Z1(e), o <= 0 || o === 1 / 0 ? "" : (s = uur(i + o, a), i >= s ? "" : our(n, i, s));
  }
});
var cur = d, wO = U, og = O, fur = or, vur = V, hur = x, dur = Array, rf = og("".charAt), Q1 = og("".charCodeAt), gur = og([].join), eh = "".toWellFormed, pur = "�", rb = eh && hur(function() {
  return wO(eh, 1) !== "1";
});
cur({ target: "String", proto: !0, forced: rb }, {
  toWellFormed: function() {
    var t = vur(fur(this));
    if (rb)
      return wO(eh, t);
    for (var e = t.length, n = dur(e), a = 0; a < e; a++) {
      var i = Q1(t, a);
      (i & 63488) !== 55296 ? n[a] = rf(t, a) : i >= 56320 || a + 1 >= e || (Q1(t, a + 1) & 64512) !== 56320 ? n[a] = pur : (n[a] = rf(t, a), n[++a] = rf(t, a));
    }
    return gur(n, "");
  }
});
var $ur = na.PROPER, yur = x, tb = Bi, eb = "​᠎", sg = function(r) {
  return yur(function() {
    return !!tb[r]() || eb[r]() !== eb || $ur && tb[r].name !== r;
  });
}, mur = d, bur = da.trim, wur = sg;
mur({ target: "String", proto: !0, forced: wur("trim") }, {
  trim: function() {
    return bur(this);
  }
});
var Sur = da.end, Eur = sg, SO = Eur("trimEnd") ? function() {
  return Sur(this);
} : "".trimEnd, Tur = d, nb = SO;
Tur({ target: "String", proto: !0, name: "trimEnd", forced: "".trimRight !== nb }, {
  trimRight: nb
});
var xur = d, ab = SO;
xur({ target: "String", proto: !0, name: "trimEnd", forced: "".trimEnd !== ab }, {
  trimEnd: ab
});
var Iur = da.start, Our = sg, EO = Our("trimStart") ? function() {
  return Iur(this);
} : "".trimStart, Aur = d, ib = EO;
Aur({ target: "String", proto: !0, name: "trimStart", forced: "".trimLeft !== ib }, {
  trimLeft: ib
});
var Rur = d, ob = EO;
Rur({ target: "String", proto: !0, name: "trimStart", forced: "".trimStart !== ob }, {
  trimStart: ob
});
var _ur = O, Cur = or, sb = V, Pur = /"/g, Mur = _ur("".replace), Gr = function(r, t, e, n) {
  var a = sb(Cur(r)), i = "<" + t;
  return e !== "" && (i += " " + e + '="' + Mur(sb(n), Pur, "&quot;") + '"'), i + ">" + a + "</" + t + ">";
}, Nur = x, Wr = function(r) {
  return Nur(function() {
    var t = ""[r]('"');
    return t !== t.toLowerCase() || t.split('"').length > 3;
  });
}, Dur = d, Lur = Gr, Fur = Wr;
Dur({ target: "String", proto: !0, forced: Fur("anchor") }, {
  anchor: function(t) {
    return Lur(this, "a", "name", t);
  }
});
var kur = d, Bur = Gr, jur = Wr;
kur({ target: "String", proto: !0, forced: jur("big") }, {
  big: function() {
    return Bur(this, "big", "", "");
  }
});
var Uur = d, zur = Gr, Vur = Wr;
Uur({ target: "String", proto: !0, forced: Vur("blink") }, {
  blink: function() {
    return zur(this, "blink", "", "");
  }
});
var Hur = d, Gur = Gr, Wur = Wr;
Hur({ target: "String", proto: !0, forced: Wur("bold") }, {
  bold: function() {
    return Gur(this, "b", "", "");
  }
});
var qur = d, Yur = Gr, Kur = Wr;
qur({ target: "String", proto: !0, forced: Kur("fixed") }, {
  fixed: function() {
    return Yur(this, "tt", "", "");
  }
});
var Xur = d, Jur = Gr, Zur = Wr;
Xur({ target: "String", proto: !0, forced: Zur("fontcolor") }, {
  fontcolor: function(t) {
    return Jur(this, "font", "color", t);
  }
});
var Qur = d, rlr = Gr, tlr = Wr;
Qur({ target: "String", proto: !0, forced: tlr("fontsize") }, {
  fontsize: function(t) {
    return rlr(this, "font", "size", t);
  }
});
var elr = d, nlr = Gr, alr = Wr;
elr({ target: "String", proto: !0, forced: alr("italics") }, {
  italics: function() {
    return nlr(this, "i", "", "");
  }
});
var ilr = d, olr = Gr, slr = Wr;
ilr({ target: "String", proto: !0, forced: slr("link") }, {
  link: function(t) {
    return olr(this, "a", "href", t);
  }
});
var ulr = d, llr = Gr, clr = Wr;
ulr({ target: "String", proto: !0, forced: clr("small") }, {
  small: function() {
    return llr(this, "small", "", "");
  }
});
var flr = d, vlr = Gr, hlr = Wr;
flr({ target: "String", proto: !0, forced: hlr("strike") }, {
  strike: function() {
    return vlr(this, "strike", "", "");
  }
});
var dlr = d, glr = Gr, plr = Wr;
dlr({ target: "String", proto: !0, forced: plr("sub") }, {
  sub: function() {
    return glr(this, "sub", "", "");
  }
});
var $lr = d, ylr = Gr, mlr = Wr;
$lr({ target: "String", proto: !0, forced: mlr("sup") }, {
  sup: function() {
    return ylr(this, "sup", "", "");
  }
});
var nh = { exports: {} }, TO = _, tf = x, blr = Au, wlr = q.NATIVE_ARRAY_BUFFER_VIEWS, Slr = TO.ArrayBuffer, Oe = TO.Int8Array, ug = !wlr || !tf(function() {
  Oe(1);
}) || !tf(function() {
  new Oe(-1);
}) || !blr(function(r) {
  new Oe(), new Oe(null), new Oe(1.5), new Oe(r);
}, !0) || tf(function() {
  return new Oe(new Slr(2), 1, void 0).length !== 1;
}), Elr = Id, Tlr = RangeError, xO = function(r, t) {
  var e = Elr(r);
  if (e % t)
    throw new Tlr("Wrong offset");
  return e;
}, xlr = Math.round, Ilr = function(r) {
  var t = xlr(r);
  return t < 0 ? 0 : t > 255 ? 255 : t & 255;
}, Olr = dt, IO = function(r) {
  var t = Olr(r);
  return t === "BigInt64Array" || t === "BigUint64Array";
}, Alr = du, Rlr = TypeError, lg = function(r) {
  var t = Alr(r, "number");
  if (typeof t == "number")
    throw new Rlr("Can't convert number to bigint");
  return BigInt(t);
}, _lr = gt, Clr = U, Plr = Fd, Mlr = Z, Nlr = ar, Dlr = xu, Llr = ia, Flr = Jh, klr = IO, Blr = q.aTypedArrayConstructor, jlr = lg, OO = function(t) {
  var e = Plr(this), n = Mlr(t), a = arguments.length, i = a > 1 ? arguments[1] : void 0, o = i !== void 0, s = Llr(n), u, l, c, f, v, h, g, $;
  if (s && !Flr(s))
    for (g = Dlr(n, s), $ = g.next, n = []; !(h = Clr($, g)).done; )
      n.push(h.value);
  for (o && a > 2 && (i = _lr(i, arguments[2])), l = Nlr(n), c = new (Blr(e))(l), f = klr(c), u = 0; l > u; u++)
    v = o ? i(n[u], u) : n[u], c[u] = f ? jlr(v) : +v;
  return c;
}, ub = d, AO = _, lb = U, Ulr = B, zlr = ug, qi = q, RO = Lu, cb = pt, Vlr = Qr, Ma = xr, Hlr = Nd, Glr = Ur, fb = Mu, ef = xO, Wlr = Ilr, _O = pe, Na = K, qlr = dt, ah = H, Ylr = Ge, Klr = zr, Xlr = Nr, No = Pt, Jlr = $e.f, vb = OO, Zlr = br.forEach, Qlr = la, rcr = hr, CO = sr, PO = Er, hb = Cu, cg = vr, tcr = Ye, ih = cg.get, ecr = cg.set, ncr = cg.enforce, MO = CO.f, acr = PO.f, nf = AO.RangeError, NO = RO.ArrayBuffer, icr = NO.prototype, ocr = RO.DataView, Do = qi.NATIVE_ARRAY_BUFFER_VIEWS, db = qi.TYPED_ARRAY_TAG, gb = qi.TypedArray, Da = qi.TypedArrayPrototype, oh = qi.isTypedArray, Lo = "BYTES_PER_ELEMENT", af = "Wrong length", Fo = function(r, t) {
  rcr(r, t, {
    configurable: !0,
    get: function() {
      return ih(this)[t];
    }
  });
}, pb = function(r) {
  var t;
  return Xlr(icr, r) || (t = qlr(r)) === "ArrayBuffer" || t === "SharedArrayBuffer";
}, DO = function(r, t) {
  return oh(r) && !Ylr(t) && t in r && Hlr(+t) && t >= 0;
}, $b = function(t, e) {
  return e = _O(e), DO(t, e) ? Vlr(2, t[e]) : acr(t, e);
}, yb = function(t, e, n) {
  return e = _O(e), DO(t, e) && ah(n) && Na(n, "value") && !Na(n, "get") && !Na(n, "set") && !n.configurable && (!Na(n, "writable") || n.writable) && (!Na(n, "enumerable") || n.enumerable) ? (t[e] = n.value, t) : MO(t, e, n);
};
Ulr ? (Do || (PO.f = $b, CO.f = yb, Fo(Da, "buffer"), Fo(Da, "byteOffset"), Fo(Da, "byteLength"), Fo(Da, "length")), ub({ target: "Object", stat: !0, forced: !Do }, {
  getOwnPropertyDescriptor: $b,
  defineProperty: yb
}), nh.exports = function(r, t, e) {
  var n = r.match(/\d+/)[0] / 8, a = r + (e ? "Clamped" : "") + "Array", i = "get" + r, o = "set" + r, s = AO[a], u = s, l = u && u.prototype, c = {}, f = function($, y) {
    var p = ih($);
    return p.view[i](y * n + p.byteOffset, !0);
  }, v = function($, y, p) {
    var S = ih($);
    S.view[o](y * n + S.byteOffset, e ? Wlr(p) : p, !0);
  }, h = function($, y) {
    MO($, y, {
      get: function() {
        return f(this, y);
      },
      set: function(p) {
        return v(this, y, p);
      },
      enumerable: !0
    });
  };
  Do ? zlr && (u = t(function($, y, p, S) {
    return cb($, l), tcr(function() {
      return ah(y) ? pb(y) ? S !== void 0 ? new s(y, ef(p, n), S) : p !== void 0 ? new s(y, ef(p, n)) : new s(y) : oh(y) ? hb(u, y) : lb(vb, u, y) : new s(fb(y));
    }(), $, u);
  }), No && No(u, gb), Zlr(Jlr(s), function($) {
    $ in u || Ma(u, $, s[$]);
  }), u.prototype = l) : (u = t(function($, y, p, S) {
    cb($, l);
    var I = 0, A = 0, N, z, X;
    if (!ah(y))
      X = fb(y), z = X * n, N = new NO(z);
    else if (pb(y)) {
      N = y, A = ef(p, n);
      var Q = y.byteLength;
      if (S === void 0) {
        if (Q % n)
          throw new nf(af);
        if (z = Q - A, z < 0)
          throw new nf(af);
      } else if (z = Glr(S) * n, z + A > Q)
        throw new nf(af);
      X = z / n;
    } else
      return oh(y) ? hb(u, y) : lb(vb, u, y);
    for (ecr($, {
      buffer: N,
      byteOffset: A,
      byteLength: z,
      length: X,
      view: new ocr(N)
    }); I < X; )
      h($, I++);
  }), No && No(u, gb), l = u.prototype = Klr(Da)), l.constructor !== u && Ma(l, "constructor", u), ncr(l).TypedArrayConstructor = u, db && Ma(l, db, a);
  var g = u !== s;
  c[a] = u, ub({ global: !0, constructor: !0, forced: g, sham: !Do }, c), Lo in u || Ma(u, Lo, n), Lo in l || Ma(l, Lo, n), Qlr(a);
}) : nh.exports = function() {
};
var te = nh.exports, scr = te;
scr("Float32", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
});
var ucr = te;
ucr("Float64", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
});
var lcr = te;
lcr("Int8", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
});
var ccr = te;
ccr("Int16", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
});
var fcr = te;
fcr("Int32", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
});
var vcr = te;
vcr("Uint8", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
});
var hcr = te;
hcr("Uint8", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
}, !0);
var dcr = te;
dcr("Uint16", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
});
var gcr = te;
gcr("Uint32", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
});
var LO = q, pcr = ar, $cr = cr, ycr = LO.aTypedArray, mcr = LO.exportTypedArrayMethod;
mcr("at", function(t) {
  var e = ycr(this), n = pcr(e), a = $cr(t), i = a >= 0 ? a : n + a;
  return i < 0 || i >= n ? void 0 : e[i];
});
var bcr = O, FO = q, wcr = iT, Scr = bcr(wcr), Ecr = FO.aTypedArray, Tcr = FO.exportTypedArrayMethod;
Tcr("copyWithin", function(t, e) {
  return Scr(Ecr(this), t, e, arguments.length > 2 ? arguments[2] : void 0);
});
var kO = q, xcr = br.every, Icr = kO.aTypedArray, Ocr = kO.exportTypedArrayMethod;
Ocr("every", function(t) {
  return xcr(Icr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var BO = q, Acr = Qh, Rcr = lg, _cr = dt, Ccr = U, Pcr = O, Mcr = x, Ncr = BO.aTypedArray, Dcr = BO.exportTypedArrayMethod, Lcr = Pcr("".slice), Fcr = Mcr(function() {
  var r = 0;
  return new Int8Array(2).fill({ valueOf: function() {
    return r++;
  } }), r !== 1;
});
Dcr("fill", function(t) {
  var e = arguments.length;
  Ncr(this);
  var n = Lcr(_cr(this), 0, 3) === "Big" ? Rcr(t) : +t;
  return Ccr(Acr, this, n, e > 1 ? arguments[1] : void 0, e > 2 ? arguments[2] : void 0);
}, Fcr);
var kcr = Cu, Bcr = q.getTypedArrayConstructor, jcr = function(r, t) {
  return kcr(Bcr(r), t);
}, jO = q, Ucr = br.filter, zcr = jcr, Vcr = jO.aTypedArray, Hcr = jO.exportTypedArrayMethod;
Hcr("filter", function(t) {
  var e = Ucr(Vcr(this), t, arguments.length > 1 ? arguments[1] : void 0);
  return zcr(this, e);
});
var UO = q, Gcr = br.find, Wcr = UO.aTypedArray, qcr = UO.exportTypedArrayMethod;
qcr("find", function(t) {
  return Gcr(Wcr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var zO = q, Ycr = br.findIndex, Kcr = zO.aTypedArray, Xcr = zO.exportTypedArrayMethod;
Xcr("findIndex", function(t) {
  return Ycr(Kcr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var VO = q, Jcr = Ou.findLast, Zcr = VO.aTypedArray, Qcr = VO.exportTypedArrayMethod;
Qcr("findLast", function(t) {
  return Jcr(Zcr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var HO = q, rfr = Ou.findLastIndex, tfr = HO.aTypedArray, efr = HO.exportTypedArrayMethod;
efr("findLastIndex", function(t) {
  return rfr(tfr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var GO = q, nfr = br.forEach, afr = GO.aTypedArray, ifr = GO.exportTypedArrayMethod;
ifr("forEach", function(t) {
  nfr(afr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var ofr = ug, sfr = q.exportTypedArrayStaticMethod, ufr = OO;
sfr("from", ufr, ofr);
var WO = q, lfr = Ti.includes, cfr = WO.aTypedArray, ffr = WO.exportTypedArrayMethod;
ffr("includes", function(t) {
  return lfr(cfr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var qO = q, vfr = Ti.indexOf, hfr = qO.aTypedArray, dfr = qO.exportTypedArrayMethod;
dfr("indexOf", function(t) {
  return vfr(hfr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var gfr = _, pfr = x, fg = O, YO = q, vg = bT, $fr = G, hg = $fr("iterator"), mb = gfr.Uint8Array, yfr = fg(vg.values), mfr = fg(vg.keys), bfr = fg(vg.entries), dg = YO.aTypedArray, il = YO.exportTypedArrayMethod, pn = mb && mb.prototype, ol = !pfr(function() {
  pn[hg].call([1]);
}), KO = !!pn && pn.values && pn[hg] === pn.values && pn.values.name === "values", XO = function() {
  return yfr(dg(this));
};
il("entries", function() {
  return bfr(dg(this));
}, ol);
il("keys", function() {
  return mfr(dg(this));
}, ol);
il("values", XO, ol || !KO, { name: "values" });
il(hg, XO, ol || !KO, { name: "values" });
var JO = q, wfr = O, Sfr = JO.aTypedArray, Efr = JO.exportTypedArrayMethod, Tfr = wfr([].join);
Efr("join", function(t) {
  return Tfr(Sfr(this), t);
});
var ZO = q, xfr = tt, Ifr = ST, Ofr = ZO.aTypedArray, Afr = ZO.exportTypedArrayMethod;
Afr("lastIndexOf", function(t) {
  var e = arguments.length;
  return xfr(Ifr, Ofr(this), e > 1 ? [t, arguments[1]] : [t]);
});
var gg = q, Rfr = br.map, _fr = gg.aTypedArray, Cfr = gg.getTypedArrayConstructor, Pfr = gg.exportTypedArrayMethod;
Pfr("map", function(t) {
  return Rfr(_fr(this), t, arguments.length > 1 ? arguments[1] : void 0, function(e, n) {
    return new (Cfr(e))(n);
  });
});
var QO = q, Mfr = ug, Nfr = QO.aTypedArrayConstructor, Dfr = QO.exportTypedArrayStaticMethod;
Dfr("of", function() {
  for (var t = 0, e = arguments.length, n = new (Nfr(this))(e); e > t; )
    n[t] = arguments[t++];
  return n;
}, Mfr);
var rA = q, Lfr = Ru.left, Ffr = rA.aTypedArray, kfr = rA.exportTypedArrayMethod;
kfr("reduce", function(t) {
  var e = arguments.length;
  return Lfr(Ffr(this), t, e, e > 1 ? arguments[1] : void 0);
});
var tA = q, Bfr = Ru.right, jfr = tA.aTypedArray, Ufr = tA.exportTypedArrayMethod;
Ufr("reduceRight", function(t) {
  var e = arguments.length;
  return Bfr(jfr(this), t, e, e > 1 ? arguments[1] : void 0);
});
var eA = q, zfr = eA.aTypedArray, Vfr = eA.exportTypedArrayMethod, Hfr = Math.floor;
Vfr("reverse", function() {
  for (var t = this, e = zfr(t).length, n = Hfr(e / 2), a = 0, i; a < n; )
    i = t[a], t[a++] = t[--e], t[e] = i;
  return t;
});
var nA = _, aA = U, pg = q, Gfr = ar, Wfr = xO, qfr = Z, iA = x, Yfr = nA.RangeError, sh = nA.Int8Array, bb = sh && sh.prototype, oA = bb && bb.set, Kfr = pg.aTypedArray, Xfr = pg.exportTypedArrayMethod, uh = !iA(function() {
  var r = new Uint8ClampedArray(2);
  return aA(oA, r, { length: 1, 0: 3 }, 1), r[1] !== 3;
}), Jfr = uh && pg.NATIVE_ARRAY_BUFFER_VIEWS && iA(function() {
  var r = new sh(2);
  return r.set(1), r.set("2", 1), r[0] !== 0 || r[1] !== 2;
});
Xfr("set", function(t) {
  Kfr(this);
  var e = Wfr(arguments.length > 1 ? arguments[1] : void 0, 1), n = qfr(t);
  if (uh)
    return aA(oA, this, n, e);
  var a = this.length, i = Gfr(n), o = 0;
  if (i + e > a)
    throw new Yfr("Wrong length");
  for (; o < i; )
    this[e + o] = n[o++];
}, !uh || Jfr);
var $g = q, Zfr = x, Qfr = rt, rvr = $g.aTypedArray, tvr = $g.getTypedArrayConstructor, evr = $g.exportTypedArrayMethod, nvr = Zfr(function() {
  new Int8Array(1).slice();
});
evr("slice", function(t, e) {
  for (var n = Qfr(rvr(this), t, e), a = tvr(this), i = 0, o = n.length, s = new a(o); o > i; )
    s[i] = n[i++];
  return s;
}, nvr);
var sA = q, avr = br.some, ivr = sA.aTypedArray, ovr = sA.exportTypedArrayMethod;
ovr("some", function(t) {
  return avr(ivr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var svr = _, uvr = qe, lh = x, lvr = J, cvr = id, uA = q, wb = TT, fvr = xT, Sb = Kt, Eb = od, vvr = uA.aTypedArray, hvr = uA.exportTypedArrayMethod, di = svr.Uint16Array, Dn = di && uvr(di.prototype.sort), dvr = !!Dn && !(lh(function() {
  Dn(new di(2), null);
}) && lh(function() {
  Dn(new di(2), {});
})), Tb = !!Dn && !lh(function() {
  if (Sb)
    return Sb < 74;
  if (wb)
    return wb < 67;
  if (fvr)
    return !0;
  if (Eb)
    return Eb < 602;
  var r = new di(516), t = Array(516), e, n;
  for (e = 0; e < 516; e++)
    n = e % 4, r[e] = 515 - e, t[e] = e - 2 * n + 3;
  for (Dn(r, function(a, i) {
    return (a / 4 | 0) - (i / 4 | 0);
  }), e = 0; e < 516; e++)
    if (r[e] !== t[e])
      return !0;
}), gvr = function(r) {
  return function(t, e) {
    return r !== void 0 ? +r(t, e) || 0 : e !== e ? -1 : t !== t ? 1 : t === 0 && e === 0 ? 1 / t > 0 && 1 / e < 0 ? 1 : -1 : t > e;
  };
};
hvr("sort", function(t) {
  return t !== void 0 && lvr(t), Tb ? Dn(this, t) : cvr(vvr(this), gvr(t));
}, !Tb || dvr);
var yg = q, pvr = Ur, xb = Jt, $vr = yg.aTypedArray, yvr = yg.getTypedArrayConstructor, mvr = yg.exportTypedArrayMethod;
mvr("subarray", function(t, e) {
  var n = $vr(this), a = n.length, i = xb(t, a), o = yvr(n);
  return new o(
    n.buffer,
    n.byteOffset + i * n.BYTES_PER_ELEMENT,
    pvr((e === void 0 ? a : xb(e, a)) - i)
  );
});
var bvr = _, wvr = tt, lA = q, ch = x, Ib = rt, Js = bvr.Int8Array, Ob = lA.aTypedArray, Svr = lA.exportTypedArrayMethod, cA = [].toLocaleString, Evr = !!Js && ch(function() {
  cA.call(new Js(1));
}), Tvr = ch(function() {
  return [1, 2].toLocaleString() !== new Js([1, 2]).toLocaleString();
}) || !ch(function() {
  Js.prototype.toLocaleString.call([1, 2]);
});
Svr("toLocaleString", function() {
  return wvr(
    cA,
    Evr ? Ib(Ob(this)) : Ob(this),
    Ib(arguments)
  );
}, Tvr);
var xvr = AT, mg = q, Ivr = mg.aTypedArray, Ovr = mg.exportTypedArrayMethod, Avr = mg.getTypedArrayConstructor;
Ovr("toReversed", function() {
  return xvr(Ivr(this), Avr(this));
});
var sl = q, Rvr = O, _vr = J, Cvr = Cu, Pvr = sl.aTypedArray, Mvr = sl.getTypedArrayConstructor, Nvr = sl.exportTypedArrayMethod, Dvr = Rvr(sl.TypedArrayPrototype.sort);
Nvr("toSorted", function(t) {
  t !== void 0 && _vr(t);
  var e = Pvr(this), n = Cvr(Mvr(e), e);
  return Dvr(n, t);
});
var Lvr = q.exportTypedArrayMethod, Fvr = x, kvr = _, Bvr = O, Ab = kvr.Uint8Array, jvr = Ab && Ab.prototype || {}, Zs = [].toString, Uvr = Bvr([].join);
Fvr(function() {
  Zs.call({});
}) && (Zs = function() {
  return Uvr(this);
});
var zvr = jvr.toString !== Zs;
Lvr("toString", Zs, zvr);
var Vvr = RT, bg = q, Hvr = IO, Gvr = cr, Wvr = lg, qvr = bg.aTypedArray, Yvr = bg.getTypedArrayConstructor, Kvr = bg.exportTypedArrayMethod, Xvr = !!function() {
  try {
    new Int8Array(1).with(2, { valueOf: function() {
      throw 8;
    } });
  } catch (r) {
    return r === 8;
  }
}();
Kvr("with", function(r, t) {
  var e = qvr(this), n = Gvr(r), a = Hvr(e) ? Wvr(t) : +t;
  return Vvr(e, Yvr(e), n, a);
}, !Xvr);
var Jvr = d, wg = O, Zvr = V, Rb = String.fromCharCode, _b = wg("".charAt), Cb = wg(/./.exec), Pb = wg("".slice), Qvr = /^[\da-f]{2}$/i, rhr = /^[\da-f]{4}$/i;
Jvr({ global: !0 }, {
  unescape: function(t) {
    for (var e = Zvr(t), n = "", a = e.length, i = 0, o, s; i < a; ) {
      if (o = _b(e, i++), o === "%") {
        if (_b(e, i) === "u") {
          if (s = Pb(e, i + 1, i + 5), Cb(rhr, s)) {
            n += Rb(parseInt(s, 16)), i += 5;
            continue;
          }
        } else if (s = Pb(e, i, i + 2), Cb(Qvr, s)) {
          n += Rb(parseInt(s, 16)), i += 2;
          continue;
        }
      }
      n += o;
    }
    return n;
  }
});
var thr = O, Mb = ca, ko = Je.getWeakData, ehr = pt, nhr = k, ahr = Mr, of = H, ihr = pr, fA = br, Nb = K, vA = vr, ohr = vA.set, shr = vA.getterFor, uhr = fA.find, lhr = fA.findIndex, chr = thr([].splice), fhr = 0, Bo = function(r) {
  return r.frozen || (r.frozen = new hA());
}, hA = function() {
  this.entries = [];
}, sf = function(r, t) {
  return uhr(r.entries, function(e) {
    return e[0] === t;
  });
};
hA.prototype = {
  get: function(r) {
    var t = sf(this, r);
    if (t)
      return t[1];
  },
  has: function(r) {
    return !!sf(this, r);
  },
  set: function(r, t) {
    var e = sf(this, r);
    e ? e[1] = t : this.entries.push([r, t]);
  },
  delete: function(r) {
    var t = lhr(this.entries, function(e) {
      return e[0] === r;
    });
    return ~t && chr(this.entries, t, 1), !!~t;
  }
};
var dA = {
  getConstructor: function(r, t, e, n) {
    var a = r(function(u, l) {
      ehr(u, i), ohr(u, {
        type: t,
        id: fhr++,
        frozen: null
      }), ahr(l) || ihr(l, u[n], { that: u, AS_ENTRIES: e });
    }), i = a.prototype, o = shr(t), s = function(u, l, c) {
      var f = o(u), v = ko(nhr(l), !0);
      return v === !0 ? Bo(f).set(l, c) : v[f.id] = c, u;
    };
    return Mb(i, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      delete: function(u) {
        var l = o(this);
        if (!of(u))
          return !1;
        var c = ko(u);
        return c === !0 ? Bo(l).delete(u) : c && Nb(c, l.id) && delete c[l.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function(l) {
        var c = o(this);
        if (!of(l))
          return !1;
        var f = ko(l);
        return f === !0 ? Bo(c).has(l) : f && Nb(f, c.id);
      }
    }), Mb(i, e ? {
      // `WeakMap.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
      get: function(l) {
        var c = o(this);
        if (of(l)) {
          var f = ko(l);
          if (f === !0)
            return Bo(c).get(l);
          if (f)
            return f[c.id];
        }
      },
      // `WeakMap.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.set
      set: function(l, c) {
        return s(this, l, c);
      }
    } : {
      // `WeakSet.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-weakset.prototype.add
      add: function(l) {
        return s(this, l, !0);
      }
    }), a;
  }
}, vhr = ha, Db = _, cs = O, Lb = ca, hhr = Je, dhr = Uu, gA = dA, jo = H, Uo = vr.enforce, ghr = x, phr = oE, Yi = Object, $hr = Array.isArray, zo = Yi.isExtensible, pA = Yi.isFrozen, yhr = Yi.isSealed, $A = Yi.freeze, mhr = Yi.seal, bhr = !Db.ActiveXObject && "ActiveXObject" in Db, La, yA = function(r) {
  return function() {
    return r(this, arguments.length ? arguments[0] : void 0);
  };
}, mA = dhr("WeakMap", yA, gA), $n = mA.prototype, fs = cs($n.set), whr = function() {
  return vhr && ghr(function() {
    var r = $A([]);
    return fs(new mA(), r, 1), !pA(r);
  });
};
if (phr)
  if (bhr) {
    La = gA.getConstructor(yA, "WeakMap", !0), hhr.enable();
    var Fb = cs($n.delete), Vo = cs($n.has), kb = cs($n.get);
    Lb($n, {
      delete: function(r) {
        if (jo(r) && !zo(r)) {
          var t = Uo(this);
          return t.frozen || (t.frozen = new La()), Fb(this, r) || t.frozen.delete(r);
        }
        return Fb(this, r);
      },
      has: function(t) {
        if (jo(t) && !zo(t)) {
          var e = Uo(this);
          return e.frozen || (e.frozen = new La()), Vo(this, t) || e.frozen.has(t);
        }
        return Vo(this, t);
      },
      get: function(t) {
        if (jo(t) && !zo(t)) {
          var e = Uo(this);
          return e.frozen || (e.frozen = new La()), Vo(this, t) ? kb(this, t) : e.frozen.get(t);
        }
        return kb(this, t);
      },
      set: function(t, e) {
        if (jo(t) && !zo(t)) {
          var n = Uo(this);
          n.frozen || (n.frozen = new La()), Vo(this, t) ? fs(this, t, e) : n.frozen.set(t, e);
        } else
          fs(this, t, e);
        return this;
      }
    });
  } else
    whr() && Lb($n, {
      set: function(t, e) {
        var n;
        return $hr(t) && (pA(t) ? n = $A : yhr(t) && (n = mhr)), fs(this, t, e), n && n(t), this;
      }
    });
var Shr = Uu, Ehr = dA;
Shr("WeakSet", function(r) {
  return function() {
    return r(this, arguments.length ? arguments[0] : void 0);
  };
}, Ehr);
var bA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", Bb = bA + "+/", jb = bA + "-_", Ub = function(r) {
  for (var t = {}, e = 0; e < 64; e++)
    t[r.charAt(e)] = e;
  return t;
}, wA = {
  i2c: Bb,
  c2i: Ub(Bb),
  i2cUrl: jb,
  c2iUrl: Ub(jb)
}, Thr = d, xhr = _, SA = nr, Sg = O, Ihr = U, ul = x, Ohr = V, Ahr = et, zb = wA.c2i, EA = /[^\d+/a-z]/i, Rhr = /[\t\n\f\r ]+/g, _hr = /[=]{1,2}$/, ze = SA("atob"), Chr = String.fromCharCode, Phr = Sg("".charAt), Vb = Sg("".replace), Mhr = Sg(EA.exec), $a = !!ze && !ul(function() {
  return ze("aGk=") !== "hi";
}), TA = $a && ul(function() {
  return ze(" ") !== "";
}), xA = $a && !ul(function() {
  ze("a");
}), Nhr = $a && !ul(function() {
  ze();
}), Dhr = $a && ze.length !== 1, Lhr = !$a || TA || xA || Nhr || Dhr;
Thr({ global: !0, bind: !0, enumerable: !0, forced: Lhr }, {
  atob: function(t) {
    if (Ahr(arguments.length, 1), $a && !TA && !xA)
      return Ihr(ze, xhr, t);
    var e = Vb(Ohr(t), Rhr, ""), n = "", a = 0, i = 0, o, s, u;
    if (e.length % 4 === 0 && (e = Vb(e, _hr, "")), o = e.length, o % 4 === 1 || Mhr(EA, e))
      throw new (SA("DOMException"))("The string is not correctly encoded", "InvalidCharacterError");
    for (; a < o; )
      s = Phr(e, a++), u = i % 4 ? u * 64 + zb[s] : zb[s], i++ % 4 && (n += Chr(255 & u >> (-2 * i & 6)));
    return n;
  }
});
var Fhr = d, khr = _, IA = nr, OA = O, Bhr = U, Eg = x, Hb = V, jhr = et, Uhr = wA.i2c, Yn = IA("btoa"), Gb = OA("".charAt), zhr = OA("".charCodeAt), gi = !!Yn && !Eg(function() {
  return Yn("hi") !== "aGk=";
}), Vhr = gi && !Eg(function() {
  Yn();
}), Hhr = gi && Eg(function() {
  return Yn(null) !== "bnVsbA==";
}), Ghr = gi && Yn.length !== 1;
Fhr({ global: !0, bind: !0, enumerable: !0, forced: !gi || Vhr || Hhr || Ghr }, {
  btoa: function(t) {
    if (jhr(arguments.length, 1), gi)
      return Bhr(Yn, khr, Hb(t));
    for (var e = Hb(t), n = "", a = 0, i = Uhr, o, s; Gb(e, a) || (i = "=", a % 1); ) {
      if (s = zhr(e, a += 3 / 4), s > 255)
        throw new (IA("DOMException"))("The string contains characters outside of the Latin1 range", "InvalidCharacterError");
      o = o << 8 | s, n += Gb(i, 63 & o >> 8 - a % 1 * 8);
    }
    return n;
  }
});
var AA = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
}, Whr = gu, uf = Whr("span").classList, Wb = uf && uf.constructor && uf.constructor.prototype, RA = Wb === Object.prototype ? void 0 : Wb, qb = _, Yb = AA, qhr = RA, lf = cT, Yhr = xr, _A = function(r) {
  if (r && r.forEach !== lf)
    try {
      Yhr(r, "forEach", lf);
    } catch {
      r.forEach = lf;
    }
};
for (var cf in Yb)
  Yb[cf] && _A(qb[cf] && qb[cf].prototype);
_A(qhr);
var Kb = _, CA = AA, Khr = RA, Va = bT, Xb = xr, Xhr = Lr, Jhr = G, ff = Jhr("iterator"), vf = Va.values, PA = function(r, t) {
  if (r) {
    if (r[ff] !== vf)
      try {
        Xb(r, ff, vf);
      } catch {
        r[ff] = vf;
      }
    if (Xhr(r, t, !0), CA[t]) {
      for (var e in Va)
        if (r[e] !== Va[e])
          try {
            Xb(r, e, Va[e]);
          } catch {
            r[e] = Va[e];
          }
    }
  }
};
for (var hf in CA)
  PA(Kb[hf] && Kb[hf].prototype, hf);
PA(Khr, "DOMTokenList");
var MA = {
  IndexSizeError: { s: "INDEX_SIZE_ERR", c: 1, m: 1 },
  DOMStringSizeError: { s: "DOMSTRING_SIZE_ERR", c: 2, m: 0 },
  HierarchyRequestError: { s: "HIERARCHY_REQUEST_ERR", c: 3, m: 1 },
  WrongDocumentError: { s: "WRONG_DOCUMENT_ERR", c: 4, m: 1 },
  InvalidCharacterError: { s: "INVALID_CHARACTER_ERR", c: 5, m: 1 },
  NoDataAllowedError: { s: "NO_DATA_ALLOWED_ERR", c: 6, m: 0 },
  NoModificationAllowedError: { s: "NO_MODIFICATION_ALLOWED_ERR", c: 7, m: 1 },
  NotFoundError: { s: "NOT_FOUND_ERR", c: 8, m: 1 },
  NotSupportedError: { s: "NOT_SUPPORTED_ERR", c: 9, m: 1 },
  InUseAttributeError: { s: "INUSE_ATTRIBUTE_ERR", c: 10, m: 1 },
  InvalidStateError: { s: "INVALID_STATE_ERR", c: 11, m: 1 },
  SyntaxError: { s: "SYNTAX_ERR", c: 12, m: 1 },
  InvalidModificationError: { s: "INVALID_MODIFICATION_ERR", c: 13, m: 1 },
  NamespaceError: { s: "NAMESPACE_ERR", c: 14, m: 1 },
  InvalidAccessError: { s: "INVALID_ACCESS_ERR", c: 15, m: 1 },
  ValidationError: { s: "VALIDATION_ERR", c: 16, m: 0 },
  TypeMismatchError: { s: "TYPE_MISMATCH_ERR", c: 17, m: 1 },
  SecurityError: { s: "SECURITY_ERR", c: 18, m: 1 },
  NetworkError: { s: "NETWORK_ERR", c: 19, m: 1 },
  AbortError: { s: "ABORT_ERR", c: 20, m: 1 },
  URLMismatchError: { s: "URL_MISMATCH_ERR", c: 21, m: 1 },
  QuotaExceededError: { s: "QUOTA_EXCEEDED_ERR", c: 22, m: 1 },
  TimeoutError: { s: "TIMEOUT_ERR", c: 23, m: 1 },
  InvalidNodeTypeError: { s: "INVALID_NODE_TYPE_ERR", c: 24, m: 1 },
  DataCloneError: { s: "DATA_CLONE_ERR", c: 25, m: 1 }
}, Zhr = d, Qs = nr, Qhr = ZT, Tg = x, rdr = zr, xg = Qr, ru = sr.f, tdr = ur, vs = hr, hs = K, edr = pt, ndr = k, NA = eT, Jb = Ni, Ln = MA, adr = Yh, DA = vr, Ig = B, Kn = "DOMException", fh = "DATA_CLONE_ERR", ll = Qs("Error"), Yt = Qs(Kn) || function() {
  try {
    var r = Qs("MessageChannel") || Qhr("worker_threads").MessageChannel;
    new r().port1.postMessage(/* @__PURE__ */ new WeakMap());
  } catch (t) {
    if (t.name === fh && t.code === 25)
      return t.constructor;
  }
}(), idr = Yt && Yt.prototype, LA = ll.prototype, odr = DA.set, sdr = DA.getterFor(Kn), udr = "stack" in new ll(Kn), FA = function(r) {
  return hs(Ln, r) && Ln[r].m ? Ln[r].c : 0;
}, Og = function() {
  edr(this, Za);
  var t = arguments.length, e = Jb(t < 1 ? void 0 : arguments[0]), n = Jb(t < 2 ? void 0 : arguments[1], "Error"), a = FA(n);
  if (odr(this, {
    type: Kn,
    name: n,
    message: e,
    code: a
  }), Ig || (this.name = n, this.message = e, this.code = a), udr) {
    var i = new ll(e);
    i.name = Kn, ru(this, "stack", xg(1, adr(i.stack, 1)));
  }
}, Za = Og.prototype = rdr(LA), kA = function(r) {
  return { enumerable: !0, configurable: !0, get: r };
}, df = function(r) {
  return kA(function() {
    return sdr(this)[r];
  });
};
Ig && (vs(Za, "code", df("code")), vs(Za, "message", df("message")), vs(Za, "name", df("name")));
ru(Za, "constructor", xg(1, Og));
var cl = Tg(function() {
  return !(new Yt() instanceof ll);
}), ldr = cl || Tg(function() {
  return LA.toString !== NA || String(new Yt(1, 2)) !== "2: 1";
}), cdr = cl || Tg(function() {
  return new Yt(1, "DataCloneError").code !== 25;
});
cl || Yt[fh] !== 25 || idr[fh];
var Zb = cl;
Zhr({ global: !0, constructor: !0, forced: Zb }, {
  DOMException: Zb ? Og : Yt
});
var pi = Qs(Kn), tu = pi.prototype;
ldr && Yt === pi && tdr(tu, "toString", NA);
cdr && Ig && Yt === pi && vs(tu, "code", kA(function() {
  return FA(ndr(this).name);
}));
for (var Qb in Ln)
  if (hs(Ln, Qb)) {
    var rw = Ln[Qb], Ho = rw.s, tw = xg(6, rw.c);
    hs(pi, Ho) || ru(pi, Ho, tw), hs(tu, Ho) || ru(tu, Ho, tw);
  }
var fdr = d, vdr = _, Ag = nr, vh = Qr, hh = sr.f, ew = K, hdr = pt, ddr = Ye, nw = Ni, gf = MA, gdr = Yh, pdr = B, Ki = "DOMException", BA = Ag("Error"), Xi = Ag(Ki), Rg = function() {
  hdr(this, $dr);
  var t = arguments.length, e = nw(t < 1 ? void 0 : arguments[0]), n = nw(t < 2 ? void 0 : arguments[1], "Error"), a = new Xi(e, n), i = new BA(e);
  return i.name = Ki, hh(a, "stack", vh(1, gdr(i.stack, 1))), ddr(a, this, Rg), a;
}, $dr = Rg.prototype = Xi.prototype, ydr = "stack" in new BA(Ki), mdr = "stack" in new Xi(1, 2), pf = Xi && pdr && Object.getOwnPropertyDescriptor(vdr, Ki), bdr = !!pf && !(pf.writable && pf.configurable), aw = ydr && !bdr && !mdr;
fdr({ global: !0, constructor: !0, forced: aw }, {
  // TODO: fix export logic
  DOMException: aw ? Rg : Xi
});
var Ha = Ag(Ki), iw = Ha.prototype;
if (iw.constructor !== Ha) {
  hh(iw, "constructor", vh(1, Ha));
  for (var ow in gf)
    if (ew(gf, ow)) {
      var sw = gf[ow], uw = sw.s;
      ew(Ha, uw) || hh(Ha, uw, vh(6, sw.c));
    }
}
var wdr = nr, Sdr = Lr, lw = "DOMException";
Sdr(wdr(lw), lw);
var Edr = d, Tdr = _, cw = Ku.clear;
Edr({ global: !0, bind: !0, enumerable: !0, forced: Tdr.clearImmediate !== cw }, {
  clearImmediate: cw
});
var jA = _, xdr = tt, Idr = Y, Odr = _u, Adr = _t, Rdr = rt, _dr = et, Cdr = jA.Function, Pdr = /MSIE .\./.test(Adr) || Odr === "BUN" && function() {
  var r = jA.Bun.version.split(".");
  return r.length < 3 || r[0] === "0" && (r[1] < 3 || r[1] === "3" && r[2] === "0");
}(), _g = function(r, t) {
  var e = t ? 2 : 1;
  return Pdr ? function(n, a) {
    var i = _dr(arguments.length, 1) > e, o = Idr(n) ? n : Cdr(n), s = i ? Rdr(arguments, e) : [], u = i ? function() {
      xdr(o, this, s);
    } : o;
    return t ? r(u, a) : r(u);
  } : r;
}, Mdr = d, UA = _, fw = Ku.set, Ndr = _g, vw = UA.setImmediate ? Ndr(fw, !1) : fw;
Mdr({ global: !0, bind: !0, enumerable: !0, forced: UA.setImmediate !== vw }, {
  setImmediate: vw
});
var Ddr = d, Ldr = _, Fdr = gI, kdr = J, Bdr = et, jdr = x, Udr = B, zdr = jdr(function() {
  return Udr && Object.getOwnPropertyDescriptor(Ldr, "queueMicrotask").value.length !== 1;
});
Ddr({ global: !0, enumerable: !0, dontCallGetSet: !0, forced: zdr }, {
  queueMicrotask: function(t) {
    Bdr(arguments.length, 1), Fdr(kdr(t));
  }
});
var Vdr = d, se = _, Hdr = hr, Gdr = B, Wdr = TypeError, qdr = Object.defineProperty, hw = se.self !== se;
try {
  if (Gdr) {
    var $f = Object.getOwnPropertyDescriptor(se, "self");
    (hw || !$f || !$f.get || !$f.enumerable) && Hdr(se, "self", {
      get: function() {
        return se;
      },
      set: function(t) {
        if (this !== se)
          throw new Wdr("Illegal invocation");
        qdr(se, "self", {
          value: t,
          writable: !0,
          configurable: !0,
          enumerable: !0
        });
      },
      configurable: !0,
      enumerable: !0
    });
  } else
    Vdr({ global: !0, simple: !0, forced: hw }, {
      self: se
    });
} catch {
}
var Ydr = d, mr = _, Qa = nr, Ji = O, Cg = x, Kdr = ea, Xn = Y, Xdr = aa, Jdr = Mr, fl = H, Zdr = Ge, Qdr = pr, zA = k, eu = dt, rgr = K, tgr = Zt, yf = xr, ds = ar, egr = et, ngr = zi, vl = Nx, Pg = $t, agr = pa, dw = QT, igr = JE, Mg = yd, Ga = mr.Object, ogr = mr.Array, VA = mr.Date, HA = mr.Error, sgr = mr.TypeError, ugr = mr.PerformanceMark, Ve = Qa("DOMException"), dh = vl.Map, Ng = vl.has, GA = vl.get, nu = vl.set, WA = Pg.Set, qA = Pg.add, lgr = Pg.has, cgr = Qa("Object", "keys"), fgr = Ji([].push), vgr = Ji((!0).valueOf), hgr = Ji(1 .valueOf), dgr = Ji("".valueOf), ggr = Ji(VA.prototype.getTime), gh = Kdr("structuredClone"), $i = "DataCloneError", gs = "Transferring", YA = function(r) {
  return !Cg(function() {
    var t = new mr.Set([7]), e = r(t), n = r(Ga(7));
    return e === t || !e.has(7) || !fl(n) || +n != 7;
  }) && r;
}, gw = function(r, t) {
  return !Cg(function() {
    var e = new t(), n = r({ a: e, b: e });
    return !(n && n.a === n.b && n.a instanceof t && n.a.stack === e.stack);
  });
}, pgr = function(r) {
  return !Cg(function() {
    var t = r(new mr.AggregateError([1], gh, { cause: 3 }));
    return t.name !== "AggregateError" || t.errors[0] !== 1 || t.message !== gh || t.cause !== 3;
  });
}, Fn = mr.structuredClone, $gr = !gw(Fn, HA) || !gw(Fn, Ve) || !pgr(Fn), ygr = !Fn && YA(function(r) {
  return new ugr(gh, { detail: r }).detail;
}), zt = YA(Fn) || ygr, mf = function(r) {
  throw new Ve("Uncloneable type: " + r, $i);
}, _r = function(r, t) {
  throw new Ve((t || "Cloning") + " of " + r + " cannot be properly polyfilled in this engine", $i);
}, bf = function(r, t) {
  return zt || _r(t), zt(r);
}, mgr = function() {
  var r;
  try {
    r = new mr.DataTransfer();
  } catch {
    try {
      r = new mr.ClipboardEvent("").clipboardData;
    } catch {
    }
  }
  return r && r.items && r.files ? r : null;
}, KA = function(r, t, e) {
  if (Ng(t, r))
    return GA(t, r);
  var n = e || eu(r), a, i, o, s, u, l;
  if (n === "SharedArrayBuffer")
    zt ? a = zt(r) : a = r;
  else {
    var c = mr.DataView;
    !c && !Xn(r.slice) && _r("ArrayBuffer");
    try {
      if (Xn(r.slice) && !r.resizable)
        a = r.slice(0);
      else
        for (i = r.byteLength, o = ("maxByteLength" in r) ? { maxByteLength: r.maxByteLength } : void 0, a = new ArrayBuffer(i, o), s = new c(r), u = new c(a), l = 0; l < i; l++)
          u.setUint8(l, s.getUint8(l));
    } catch {
      throw new Ve("ArrayBuffer is detached", $i);
    }
  }
  return nu(t, r, a), a;
}, bgr = function(r, t, e, n, a) {
  var i = mr[t];
  return fl(i) || _r(t), new i(KA(r.buffer, a), e, n);
}, $r = function(r, t) {
  if (Zdr(r) && mf("Symbol"), !fl(r))
    return r;
  if (t) {
    if (Ng(t, r))
      return GA(t, r);
  } else
    t = new dh();
  var e = eu(r), n, a, i, o, s, u, l, c;
  switch (e) {
    case "Array":
      i = ogr(ds(r));
      break;
    case "Object":
      i = {};
      break;
    case "Map":
      i = new dh();
      break;
    case "Set":
      i = new WA();
      break;
    case "RegExp":
      i = new RegExp(r.source, ngr(r));
      break;
    case "Error":
      switch (a = r.name, a) {
        case "AggregateError":
          i = new (Qa(a))([]);
          break;
        case "EvalError":
        case "RangeError":
        case "ReferenceError":
        case "SuppressedError":
        case "SyntaxError":
        case "TypeError":
        case "URIError":
          i = new (Qa(a))();
          break;
        case "CompileError":
        case "LinkError":
        case "RuntimeError":
          i = new (Qa("WebAssembly", a))();
          break;
        default:
          i = new HA();
      }
      break;
    case "DOMException":
      i = new Ve(r.message, r.name);
      break;
    case "ArrayBuffer":
    case "SharedArrayBuffer":
      i = KA(r, t, e);
      break;
    case "DataView":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float16Array":
    case "Float32Array":
    case "Float64Array":
    case "BigInt64Array":
    case "BigUint64Array":
      u = e === "DataView" ? r.byteLength : r.length, i = bgr(r, e, r.byteOffset, u, t);
      break;
    case "DOMQuad":
      try {
        i = new DOMQuad(
          $r(r.p1, t),
          $r(r.p2, t),
          $r(r.p3, t),
          $r(r.p4, t)
        );
      } catch {
        i = bf(r, e);
      }
      break;
    case "File":
      if (zt)
        try {
          i = zt(r), eu(i) !== e && (i = void 0);
        } catch {
        }
      if (!i)
        try {
          i = new File([r], r.name, r);
        } catch {
        }
      i || _r(e);
      break;
    case "FileList":
      if (o = mgr(), o) {
        for (s = 0, u = ds(r); s < u; s++)
          o.items.add($r(r[s], t));
        i = o.files;
      } else
        i = bf(r, e);
      break;
    case "ImageData":
      try {
        i = new ImageData(
          $r(r.data, t),
          r.width,
          r.height,
          { colorSpace: r.colorSpace }
        );
      } catch {
        i = bf(r, e);
      }
      break;
    default:
      if (zt)
        i = zt(r);
      else
        switch (e) {
          case "BigInt":
            i = Ga(r.valueOf());
            break;
          case "Boolean":
            i = Ga(vgr(r));
            break;
          case "Number":
            i = Ga(hgr(r));
            break;
          case "String":
            i = Ga(dgr(r));
            break;
          case "Date":
            i = new VA(ggr(r));
            break;
          case "Blob":
            try {
              i = r.slice(0, r.size, r.type);
            } catch {
              _r(e);
            }
            break;
          case "DOMPoint":
          case "DOMPointReadOnly":
            n = mr[e];
            try {
              i = n.fromPoint ? n.fromPoint(r) : new n(r.x, r.y, r.z, r.w);
            } catch {
              _r(e);
            }
            break;
          case "DOMRect":
          case "DOMRectReadOnly":
            n = mr[e];
            try {
              i = n.fromRect ? n.fromRect(r) : new n(r.x, r.y, r.width, r.height);
            } catch {
              _r(e);
            }
            break;
          case "DOMMatrix":
          case "DOMMatrixReadOnly":
            n = mr[e];
            try {
              i = n.fromMatrix ? n.fromMatrix(r) : new n(r);
            } catch {
              _r(e);
            }
            break;
          case "AudioData":
          case "VideoFrame":
            Xn(r.clone) || _r(e);
            try {
              i = r.clone();
            } catch {
              mf(e);
            }
            break;
          case "CropTarget":
          case "CryptoKey":
          case "FileSystemDirectoryHandle":
          case "FileSystemFileHandle":
          case "FileSystemHandle":
          case "GPUCompilationInfo":
          case "GPUCompilationMessage":
          case "ImageBitmap":
          case "RTCCertificate":
          case "WebAssembly.Module":
            _r(e);
          default:
            mf(e);
        }
  }
  switch (nu(t, r, i), e) {
    case "Array":
    case "Object":
      for (l = cgr(r), s = 0, u = ds(l); s < u; s++)
        c = l[s], tgr(i, c, $r(r[c], t));
      break;
    case "Map":
      r.forEach(function(f, v) {
        nu(i, $r(v, t), $r(f, t));
      });
      break;
    case "Set":
      r.forEach(function(f) {
        qA(i, $r(f, t));
      });
      break;
    case "Error":
      yf(i, "message", $r(r.message, t)), rgr(r, "cause") && yf(i, "cause", $r(r.cause, t)), a === "AggregateError" ? i.errors = $r(r.errors, t) : a === "SuppressedError" && (i.error = $r(r.error, t), i.suppressed = $r(r.suppressed, t));
    case "DOMException":
      igr && yf(i, "stack", $r(r.stack, t));
  }
  return i;
}, wgr = function(r, t) {
  if (!fl(r))
    throw new sgr("Transfer option cannot be converted to a sequence");
  var e = [];
  Qdr(r, function(v) {
    fgr(e, zA(v));
  });
  for (var n = 0, a = ds(e), i = new WA(), o, s, u, l, c, f; n < a; ) {
    if (o = e[n++], s = eu(o), s === "ArrayBuffer" ? lgr(i, o) : Ng(t, o))
      throw new Ve("Duplicate transferable", $i);
    if (s === "ArrayBuffer") {
      qA(i, o);
      continue;
    }
    if (Mg)
      l = Fn(o, { transfer: [o] });
    else
      switch (s) {
        case "ImageBitmap":
          u = mr.OffscreenCanvas, Xdr(u) || _r(s, gs);
          try {
            c = new u(o.width, o.height), f = c.getContext("bitmaprenderer"), f.transferFromImageBitmap(o), l = c.transferToImageBitmap();
          } catch {
          }
          break;
        case "AudioData":
        case "VideoFrame":
          (!Xn(o.clone) || !Xn(o.close)) && _r(s, gs);
          try {
            l = o.clone(), o.close();
          } catch {
          }
          break;
        case "MediaSourceHandle":
        case "MessagePort":
        case "MIDIAccess":
        case "OffscreenCanvas":
        case "ReadableStream":
        case "RTCDataChannel":
        case "TransformStream":
        case "WebTransportReceiveStream":
        case "WebTransportSendStream":
        case "WritableStream":
          _r(s, gs);
      }
    if (l === void 0)
      throw new Ve("This object cannot be transferred: " + s, $i);
    nu(t, o, l);
  }
  return i;
}, Sgr = function(r) {
  agr(r, function(t) {
    Mg ? zt(t, { transfer: [t] }) : Xn(t.transfer) ? t.transfer() : dw ? dw(t) : _r("ArrayBuffer", gs);
  });
};
Ydr({ global: !0, enumerable: !0, sham: !Mg, forced: $gr }, {
  structuredClone: function(t) {
    var e = egr(arguments.length, 1) > 1 && !Jdr(arguments[1]) ? zA(arguments[1]) : void 0, n = e ? e.transfer : void 0, a, i;
    n !== void 0 && (a = new dh(), i = wgr(n, a));
    var o = $r(t, a);
    return i && Sgr(i), o;
  }
});
var Egr = d, XA = _, Tgr = _g, pw = Tgr(XA.setInterval, !0);
Egr({ global: !0, bind: !0, forced: XA.setInterval !== pw }, {
  setInterval: pw
});
var xgr = d, JA = _, Igr = _g, $w = Igr(JA.setTimeout, !0);
xgr({ global: !0, bind: !0, forced: JA.setTimeout !== $w }, {
  setTimeout: $w
});
var Ogr = x, Agr = G, Rgr = B, yw = Xt, _gr = Agr("iterator"), hl = !Ogr(function() {
  var r = new URL("b?a=1&b=2&c=3", "https://a"), t = r.searchParams, e = new URLSearchParams("a=1&a=2&b=3"), n = "";
  return r.pathname = "c%20d", t.forEach(function(a, i) {
    t.delete("b"), n += i + a;
  }), e.delete("a", 2), e.delete("b", void 0), yw && (!r.toJSON || !e.has("a", 1) || e.has("a", 2) || !e.has("a", void 0) || e.has("b")) || !t.size && (yw || !Rgr) || !t.sort || r.href !== "https://a/c%20d?a=1&c=3" || t.get("c") !== "3" || String(new URLSearchParams("?a=1")) !== "a=1" || !t[_gr] || new URL("https://a@b").username !== "a" || new URLSearchParams(new URLSearchParams("a=b")).get("a") !== "b" || new URL("https://тест").host !== "xn--e1aybc" || new URL("https://a#б").hash !== "#%D0%B1" || n !== "a1c3" || new URL("https://x", void 0).host !== "x";
}), en = O, wf = 2147483647, ri = 36, ZA = 1, ph = 26, Cgr = 38, Pgr = 700, Mgr = 72, Ngr = 128, Dgr = "-", Lgr = /[^\0-\u007E]/, QA = /[.\u3002\uFF0E\uFF61]/g, mw = "Overflow: input needs wider integers to process", Sf = ri - ZA, bw = RangeError, Fgr = en(QA.exec), In = Math.floor, Ef = String.fromCharCode, ww = en("".charCodeAt), rR = en([].join), ce = en([].push), kgr = en("".replace), Bgr = en("".split), jgr = en("".toLowerCase), Ugr = function(r) {
  for (var t = [], e = 0, n = r.length; e < n; ) {
    var a = ww(r, e++);
    if (a >= 55296 && a <= 56319 && e < n) {
      var i = ww(r, e++);
      (i & 64512) === 56320 ? ce(t, ((a & 1023) << 10) + (i & 1023) + 65536) : (ce(t, a), e--);
    } else
      ce(t, a);
  }
  return t;
}, Sw = function(r) {
  return r + 22 + 75 * (r < 26);
}, zgr = function(r, t, e) {
  var n = 0;
  for (r = e ? In(r / Pgr) : r >> 1, r += In(r / t); r > Sf * ph >> 1; )
    r = In(r / Sf), n += ri;
  return In(n + (Sf + 1) * r / (r + Cgr));
}, Vgr = function(r) {
  var t = [];
  r = Ugr(r);
  var e = r.length, n = Ngr, a = 0, i = Mgr, o, s;
  for (o = 0; o < r.length; o++)
    s = r[o], s < 128 && ce(t, Ef(s));
  var u = t.length, l = u;
  for (u && ce(t, Dgr); l < e; ) {
    var c = wf;
    for (o = 0; o < r.length; o++)
      s = r[o], s >= n && s < c && (c = s);
    var f = l + 1;
    if (c - n > In((wf - a) / f))
      throw new bw(mw);
    for (a += (c - n) * f, n = c, o = 0; o < r.length; o++) {
      if (s = r[o], s < n && ++a > wf)
        throw new bw(mw);
      if (s === n) {
        for (var v = a, h = ri; ; ) {
          var g = h <= i ? ZA : h >= i + ph ? ph : h - i;
          if (v < g)
            break;
          var $ = v - g, y = ri - g;
          ce(t, Ef(Sw(g + $ % y))), v = In($ / y), h += ri;
        }
        ce(t, Ef(Sw(v))), i = zgr(a, f, l === u), a = 0, l++;
      }
    }
    a++, n++;
  }
  return rR(t, "");
}, Hgr = function(r) {
  var t = [], e = Bgr(kgr(jgr(r), QA, "."), "."), n, a;
  for (n = 0; n < e.length; n++)
    a = e[n], ce(t, Fgr(Lgr, a) ? "xn--" + Vgr(a) : a);
  return rR(t, ".");
}, $h = d, tR = _, Dg = vI, Ggr = nr, Go = U, vt = O, ti = B, eR = hl, nR = ur, Wgr = hr, qgr = ca, Ygr = Lr, Kgr = td, Lg = vr, aR = pt, Tf = Y, Xgr = K, Jgr = gt, Zgr = dt, Qgr = k, iR = H, Or = V, rpr = zr, Ew = Qr, Tw = xu, tpr = ia, Wo = sa, fn = et, epr = G, npr = id, apr = epr("iterator"), ya = "URLSearchParams", oR = ya + "Iterator", sR = Lg.set, Xr = Lg.getterFor(ya), ipr = Lg.getterFor(oR), xw = Dg("fetch"), au = Dg("Request"), ei = Dg("Headers"), xf = au && au.prototype, Iw = ei && ei.prototype, opr = tR.TypeError, spr = tR.encodeURIComponent, upr = String.fromCharCode, lpr = Ggr("String", "fromCodePoint"), cpr = parseInt, ps = vt("".charAt), Ow = vt([].join), fe = vt([].push), uR = vt("".replace), fpr = vt([].shift), Aw = vt([].splice), Rw = vt("".split), lR = vt("".slice), vpr = vt(/./.exec), hpr = /\+/g, If = "�", dpr = /^[0-9a-f]+$/i, _w = function(r, t) {
  var e = lR(r, t, t + 2);
  return vpr(dpr, e) ? cpr(e, 16) : NaN;
}, gpr = function(r) {
  for (var t = 0, e = 128; e > 0 && r & e; e >>= 1)
    t++;
  return t;
}, ppr = function(r) {
  var t = null;
  switch (r.length) {
    case 1:
      t = r[0];
      break;
    case 2:
      t = (r[0] & 31) << 6 | r[1] & 63;
      break;
    case 3:
      t = (r[0] & 15) << 12 | (r[1] & 63) << 6 | r[2] & 63;
      break;
    case 4:
      t = (r[0] & 7) << 18 | (r[1] & 63) << 12 | (r[2] & 63) << 6 | r[3] & 63;
      break;
  }
  return t > 1114111 ? null : t;
}, Cw = function(r) {
  r = uR(r, hpr, " ");
  for (var t = r.length, e = "", n = 0; n < t; ) {
    var a = ps(r, n);
    if (a === "%") {
      if (ps(r, n + 1) === "%" || n + 3 > t) {
        e += "%", n++;
        continue;
      }
      var i = _w(r, n + 1);
      if (i !== i) {
        e += a, n++;
        continue;
      }
      n += 2;
      var o = gpr(i);
      if (o === 0)
        a = upr(i);
      else {
        if (o === 1 || o > 4) {
          e += If, n++;
          continue;
        }
        for (var s = [i], u = 1; u < o && (n++, !(n + 3 > t || ps(r, n) !== "%")); ) {
          var l = _w(r, n + 1);
          if (l !== l) {
            n += 3;
            break;
          }
          if (l > 191 || l < 128)
            break;
          fe(s, l), n += 2, u++;
        }
        if (s.length !== o) {
          e += If;
          continue;
        }
        var c = ppr(s);
        c === null ? e += If : a = lpr(c);
      }
    }
    e += a, n++;
  }
  return e;
}, $pr = /[!'()~]|%20/g, ypr = {
  "!": "%21",
  "'": "%27",
  "(": "%28",
  ")": "%29",
  "~": "%7E",
  "%20": "+"
}, mpr = function(r) {
  return ypr[r];
}, Pw = function(r) {
  return uR(spr(r), $pr, mpr);
}, Of = Kgr(function(t, e) {
  sR(this, {
    type: oR,
    target: Xr(t).entries,
    index: 0,
    kind: e
  });
}, ya, function() {
  var t = ipr(this), e = t.target, n = t.index++;
  if (!e || n >= e.length)
    return t.target = null, Wo(void 0, !0);
  var a = e[n];
  switch (t.kind) {
    case "keys":
      return Wo(a.key, !1);
    case "values":
      return Wo(a.value, !1);
  }
  return Wo([a.key, a.value], !1);
}, !0), cR = function(r) {
  this.entries = [], this.url = null, r !== void 0 && (iR(r) ? this.parseObject(r) : this.parseQuery(typeof r == "string" ? ps(r, 0) === "?" ? lR(r, 1) : r : Or(r)));
};
cR.prototype = {
  type: ya,
  bindURL: function(r) {
    this.url = r, this.update();
  },
  parseObject: function(r) {
    var t = this.entries, e = tpr(r), n, a, i, o, s, u, l;
    if (e)
      for (n = Tw(r, e), a = n.next; !(i = Go(a, n)).done; ) {
        if (o = Tw(Qgr(i.value)), s = o.next, (u = Go(s, o)).done || (l = Go(s, o)).done || !Go(s, o).done)
          throw new opr("Expected sequence with length 2");
        fe(t, { key: Or(u.value), value: Or(l.value) });
      }
    else
      for (var c in r)
        Xgr(r, c) && fe(t, { key: c, value: Or(r[c]) });
  },
  parseQuery: function(r) {
    if (r)
      for (var t = this.entries, e = Rw(r, "&"), n = 0, a, i; n < e.length; )
        a = e[n++], a.length && (i = Rw(a, "="), fe(t, {
          key: Cw(fpr(i)),
          value: Cw(Ow(i, "="))
        }));
  },
  serialize: function() {
    for (var r = this.entries, t = [], e = 0, n; e < r.length; )
      n = r[e++], fe(t, Pw(n.key) + "=" + Pw(n.value));
    return Ow(t, "&");
  },
  update: function() {
    this.entries.length = 0, this.parseQuery(this.url.query);
  },
  updateURL: function() {
    this.url && this.url.update();
  }
};
var dl = function() {
  aR(this, Jn);
  var t = arguments.length > 0 ? arguments[0] : void 0, e = sR(this, new cR(t));
  ti || (this.size = e.entries.length);
}, Jn = dl.prototype;
qgr(Jn, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function(t, e) {
    var n = Xr(this);
    fn(arguments.length, 2), fe(n.entries, { key: Or(t), value: Or(e) }), ti || this.length++, n.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  delete: function(r) {
    for (var t = Xr(this), e = fn(arguments.length, 1), n = t.entries, a = Or(r), i = e < 2 ? void 0 : arguments[1], o = i === void 0 ? i : Or(i), s = 0; s < n.length; ) {
      var u = n[s];
      if (u.key === a && (o === void 0 || u.value === o)) {
        if (Aw(n, s, 1), o !== void 0)
          break;
      } else
        s++;
    }
    ti || (this.size = n.length), t.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function(t) {
    var e = Xr(this).entries;
    fn(arguments.length, 1);
    for (var n = Or(t), a = 0; a < e.length; a++)
      if (e[a].key === n)
        return e[a].value;
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function(t) {
    var e = Xr(this).entries;
    fn(arguments.length, 1);
    for (var n = Or(t), a = [], i = 0; i < e.length; i++)
      e[i].key === n && fe(a, e[i].value);
    return a;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function(t) {
    for (var e = Xr(this).entries, n = fn(arguments.length, 1), a = Or(t), i = n < 2 ? void 0 : arguments[1], o = i === void 0 ? i : Or(i), s = 0; s < e.length; ) {
      var u = e[s++];
      if (u.key === a && (o === void 0 || u.value === o))
        return !0;
    }
    return !1;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function(t, e) {
    var n = Xr(this);
    fn(arguments.length, 1);
    for (var a = n.entries, i = !1, o = Or(t), s = Or(e), u = 0, l; u < a.length; u++)
      l = a[u], l.key === o && (i ? Aw(a, u--, 1) : (i = !0, l.value = s));
    i || fe(a, { key: o, value: s }), ti || (this.size = a.length), n.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function() {
    var t = Xr(this);
    npr(t.entries, function(e, n) {
      return e.key > n.key ? 1 : -1;
    }), t.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function(t) {
    for (var e = Xr(this).entries, n = Jgr(t, arguments.length > 1 ? arguments[1] : void 0), a = 0, i; a < e.length; )
      i = e[a++], n(i.value, i.key, this);
  },
  // `URLSearchParams.prototype.keys` method
  keys: function() {
    return new Of(this, "keys");
  },
  // `URLSearchParams.prototype.values` method
  values: function() {
    return new Of(this, "values");
  },
  // `URLSearchParams.prototype.entries` method
  entries: function() {
    return new Of(this, "entries");
  }
}, { enumerable: !0 });
nR(Jn, apr, Jn.entries, { name: "entries" });
nR(Jn, "toString", function() {
  return Xr(this).serialize();
}, { enumerable: !0 });
ti && Wgr(Jn, "size", {
  get: function() {
    return Xr(this).entries.length;
  },
  configurable: !0,
  enumerable: !0
});
Ygr(dl, ya);
$h({ global: !0, constructor: !0, forced: !eR }, {
  URLSearchParams: dl
});
if (!eR && Tf(ei)) {
  var bpr = vt(Iw.has), wpr = vt(Iw.set), Mw = function(r) {
    if (iR(r)) {
      var t = r.body, e;
      if (Zgr(t) === ya)
        return e = r.headers ? new ei(r.headers) : new ei(), bpr(e, "content-type") || wpr(e, "content-type", "application/x-www-form-urlencoded;charset=UTF-8"), rpr(r, {
          body: Ew(0, Or(t)),
          headers: Ew(0, e)
        });
    }
    return r;
  };
  if (Tf(xw) && $h({ global: !0, enumerable: !0, dontCallGetSet: !0, forced: !0 }, {
    fetch: function(t) {
      return xw(t, arguments.length > 1 ? Mw(arguments[1]) : {});
    }
  }), Tf(au)) {
    var Af = function(t) {
      return aR(this, xf), new au(t, arguments.length > 1 ? Mw(arguments[1]) : {});
    };
    xf.constructor = Af, Af.prototype = xf, $h({ global: !0, constructor: !0, dontCallGetSet: !0, forced: !0 }, {
      Request: Af
    });
  }
}
var Spr = {
  URLSearchParams: dl,
  getState: Xr
}, Epr = d, Fg = B, Tpr = hl, kg = _, Nw = gt, nt = O, iu = ur, qr = hr, xpr = pt, yh = K, Bg = Zx, vn = fT, it = rt, Ipr = tl.codeAt, Opr = Hgr, Ft = V, Apr = Lr, Rpr = et, fR = Spr, vR = vr, _pr = vR.set, ou = vR.getterFor("URL"), Cpr = fR.URLSearchParams, Ppr = fR.getState, Fa = kg.URL, mh = kg.TypeError, su = kg.parseInt, Mpr = Math.floor, Dw = Math.pow, Jr = nt("".charAt), ct = nt(/./.exec), Wa = nt([].join), Npr = nt(1 .toString), Dpr = nt([].pop), yn = nt([].push), Rf = nt("".replace), Lpr = nt([].shift), Fpr = nt("".split), ni = nt("".slice), uu = nt("".toLowerCase), kpr = nt([].unshift), Bpr = "Invalid authority", _f = "Invalid scheme", Ae = "Invalid host", Lw = "Invalid port", hR = /[a-z]/i, jpr = /[\d+-.a-z]/i, bh = /\d/, Upr = /^0x/i, zpr = /^[0-7]+$/, Vpr = /^\d+$/, dR = /^[\da-f]+$/i, Hpr = /[\0\t\n\r #%/:<>?@[\\\]^|]/, Gpr = /[\0\t\n\r #/:<>?@[\\\]^|]/, Wpr = /^[\u0000-\u0020]+/, qpr = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/, Ypr = /[\t\n\r]/g, Yr, Kpr = function(r) {
  var t = Fpr(r, "."), e, n, a, i, o, s, u;
  if (t.length && t[t.length - 1] === "" && t.length--, e = t.length, e > 4)
    return r;
  for (n = [], a = 0; a < e; a++) {
    if (i = t[a], i === "")
      return r;
    if (o = 10, i.length > 1 && Jr(i, 0) === "0" && (o = ct(Upr, i) ? 16 : 8, i = ni(i, o === 8 ? 1 : 2)), i === "")
      s = 0;
    else {
      if (!ct(o === 10 ? Vpr : o === 8 ? zpr : dR, i))
        return r;
      s = su(i, o);
    }
    yn(n, s);
  }
  for (a = 0; a < e; a++)
    if (s = n[a], a === e - 1) {
      if (s >= Dw(256, 5 - e))
        return null;
    } else if (s > 255)
      return null;
  for (u = Dpr(n), a = 0; a < n.length; a++)
    u += n[a] * Dw(256, 3 - a);
  return u;
}, Xpr = function(r) {
  var t = [0, 0, 0, 0, 0, 0, 0, 0], e = 0, n = null, a = 0, i, o, s, u, l, c, f, v = function() {
    return Jr(r, a);
  };
  if (v() === ":") {
    if (Jr(r, 1) !== ":")
      return;
    a += 2, e++, n = e;
  }
  for (; v(); ) {
    if (e === 8)
      return;
    if (v() === ":") {
      if (n !== null)
        return;
      a++, e++, n = e;
      continue;
    }
    for (i = o = 0; o < 4 && ct(dR, v()); )
      i = i * 16 + su(v(), 16), a++, o++;
    if (v() === ".") {
      if (o === 0 || (a -= o, e > 6))
        return;
      for (s = 0; v(); ) {
        if (u = null, s > 0)
          if (v() === "." && s < 4)
            a++;
          else
            return;
        if (!ct(bh, v()))
          return;
        for (; ct(bh, v()); ) {
          if (l = su(v(), 10), u === null)
            u = l;
          else {
            if (u === 0)
              return;
            u = u * 10 + l;
          }
          if (u > 255)
            return;
          a++;
        }
        t[e] = t[e] * 256 + u, s++, (s === 2 || s === 4) && e++;
      }
      if (s !== 4)
        return;
      break;
    } else if (v() === ":") {
      if (a++, !v())
        return;
    } else if (v())
      return;
    t[e++] = i;
  }
  if (n !== null)
    for (c = e - n, e = 7; e !== 0 && c > 0; )
      f = t[e], t[e--] = t[n + c - 1], t[n + --c] = f;
  else if (e !== 8)
    return;
  return t;
}, Jpr = function(r) {
  for (var t = null, e = 1, n = null, a = 0, i = 0; i < 8; i++)
    r[i] !== 0 ? (a > e && (t = n, e = a), n = null, a = 0) : (n === null && (n = i), ++a);
  return a > e ? n : t;
}, ka = function(r) {
  var t, e, n, a;
  if (typeof r == "number") {
    for (t = [], e = 0; e < 4; e++)
      kpr(t, r % 256), r = Mpr(r / 256);
    return Wa(t, ".");
  }
  if (typeof r == "object") {
    for (t = "", n = Jpr(r), e = 0; e < 8; e++)
      a && r[e] === 0 || (a && (a = !1), n === e ? (t += e ? ":" : "::", a = !0) : (t += Npr(r[e], 16), e < 7 && (t += ":")));
    return "[" + t + "]";
  }
  return r;
}, $s = {}, gR = Bg({}, $s, {
  " ": 1,
  '"': 1,
  "<": 1,
  ">": 1,
  "`": 1
}), pR = Bg({}, gR, {
  "#": 1,
  "?": 1,
  "{": 1,
  "}": 1
}), Cf = Bg({}, pR, {
  "/": 1,
  ":": 1,
  ";": 1,
  "=": 1,
  "@": 1,
  "[": 1,
  "\\": 1,
  "]": 1,
  "^": 1,
  "|": 1
}), oe = function(r, t) {
  var e = Ipr(r, 0);
  return e > 32 && e < 127 && !yh(t, r) ? r : encodeURIComponent(r);
}, qo = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
}, qa = function(r, t) {
  var e;
  return r.length === 2 && ct(hR, Jr(r, 0)) && ((e = Jr(r, 1)) === ":" || !t && e === "|");
}, Fw = function(r) {
  var t;
  return r.length > 1 && qa(ni(r, 0, 2)) && (r.length === 2 || (t = Jr(r, 2)) === "/" || t === "\\" || t === "?" || t === "#");
}, Zpr = function(r) {
  return r === "." || uu(r) === "%2e";
}, Qpr = function(r) {
  return r = uu(r), r === ".." || r === "%2e." || r === ".%2e" || r === "%2e%2e";
}, Pf = {}, kw = {}, Mf = {}, Bw = {}, jw = {}, Nf = {}, Uw = {}, zw = {}, Yo = {}, Ko = {}, Df = {}, Lf = {}, Ff = {}, kf = {}, Vw = {}, Bf = {}, hn = {}, wt = {}, Hw = {}, Re = {}, Lt = {}, jg = function(r, t, e) {
  var n = Ft(r), a, i, o;
  if (t) {
    if (i = this.parse(n), i)
      throw new mh(i);
    this.searchParams = null;
  } else {
    if (e !== void 0 && (a = new jg(e, !0)), i = this.parse(n, null, a), i)
      throw new mh(i);
    o = Ppr(new Cpr()), o.bindURL(this), this.searchParams = o;
  }
};
jg.prototype = {
  type: "URL",
  // https://url.spec.whatwg.org/#url-parsing
  // eslint-disable-next-line max-statements -- TODO
  parse: function(r, t, e) {
    var n = this, a = t || Pf, i = 0, o = "", s = !1, u = !1, l = !1, c, f, v, h;
    for (r = Ft(r), t || (n.scheme = "", n.username = "", n.password = "", n.host = null, n.port = null, n.path = [], n.query = null, n.fragment = null, n.cannotBeABaseURL = !1, r = Rf(r, Wpr, ""), r = Rf(r, qpr, "$1")), r = Rf(r, Ypr, ""), c = vn(r); i <= c.length; ) {
      switch (f = c[i], a) {
        case Pf:
          if (f && ct(hR, f))
            o += uu(f), a = kw;
          else {
            if (t)
              return _f;
            a = Mf;
            continue;
          }
          break;
        case kw:
          if (f && (ct(jpr, f) || f === "+" || f === "-" || f === "."))
            o += uu(f);
          else if (f === ":") {
            if (t && (n.isSpecial() !== yh(qo, o) || o === "file" && (n.includesCredentials() || n.port !== null) || n.scheme === "file" && !n.host))
              return;
            if (n.scheme = o, t) {
              n.isSpecial() && qo[n.scheme] === n.port && (n.port = null);
              return;
            }
            o = "", n.scheme === "file" ? a = kf : n.isSpecial() && e && e.scheme === n.scheme ? a = Bw : n.isSpecial() ? a = zw : c[i + 1] === "/" ? (a = jw, i++) : (n.cannotBeABaseURL = !0, yn(n.path, ""), a = Hw);
          } else {
            if (t)
              return _f;
            o = "", a = Mf, i = 0;
            continue;
          }
          break;
        case Mf:
          if (!e || e.cannotBeABaseURL && f !== "#")
            return _f;
          if (e.cannotBeABaseURL && f === "#") {
            n.scheme = e.scheme, n.path = it(e.path), n.query = e.query, n.fragment = "", n.cannotBeABaseURL = !0, a = Lt;
            break;
          }
          a = e.scheme === "file" ? kf : Nf;
          continue;
        case Bw:
          if (f === "/" && c[i + 1] === "/")
            a = Yo, i++;
          else {
            a = Nf;
            continue;
          }
          break;
        case jw:
          if (f === "/") {
            a = Ko;
            break;
          } else {
            a = wt;
            continue;
          }
        case Nf:
          if (n.scheme = e.scheme, f === Yr)
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, n.path = it(e.path), n.query = e.query;
          else if (f === "/" || f === "\\" && n.isSpecial())
            a = Uw;
          else if (f === "?")
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, n.path = it(e.path), n.query = "", a = Re;
          else if (f === "#")
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, n.path = it(e.path), n.query = e.query, n.fragment = "", a = Lt;
          else {
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, n.path = it(e.path), n.path.length--, a = wt;
            continue;
          }
          break;
        case Uw:
          if (n.isSpecial() && (f === "/" || f === "\\"))
            a = Yo;
          else if (f === "/")
            a = Ko;
          else {
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, a = wt;
            continue;
          }
          break;
        case zw:
          if (a = Yo, f !== "/" || Jr(o, i + 1) !== "/")
            continue;
          i++;
          break;
        case Yo:
          if (f !== "/" && f !== "\\") {
            a = Ko;
            continue;
          }
          break;
        case Ko:
          if (f === "@") {
            s && (o = "%40" + o), s = !0, v = vn(o);
            for (var g = 0; g < v.length; g++) {
              var $ = v[g];
              if ($ === ":" && !l) {
                l = !0;
                continue;
              }
              var y = oe($, Cf);
              l ? n.password += y : n.username += y;
            }
            o = "";
          } else if (f === Yr || f === "/" || f === "?" || f === "#" || f === "\\" && n.isSpecial()) {
            if (s && o === "")
              return Bpr;
            i -= vn(o).length + 1, o = "", a = Df;
          } else
            o += f;
          break;
        case Df:
        case Lf:
          if (t && n.scheme === "file") {
            a = Bf;
            continue;
          } else if (f === ":" && !u) {
            if (o === "")
              return Ae;
            if (h = n.parseHost(o), h)
              return h;
            if (o = "", a = Ff, t === Lf)
              return;
          } else if (f === Yr || f === "/" || f === "?" || f === "#" || f === "\\" && n.isSpecial()) {
            if (n.isSpecial() && o === "")
              return Ae;
            if (t && o === "" && (n.includesCredentials() || n.port !== null))
              return;
            if (h = n.parseHost(o), h)
              return h;
            if (o = "", a = hn, t)
              return;
            continue;
          } else
            f === "[" ? u = !0 : f === "]" && (u = !1), o += f;
          break;
        case Ff:
          if (ct(bh, f))
            o += f;
          else if (f === Yr || f === "/" || f === "?" || f === "#" || f === "\\" && n.isSpecial() || t) {
            if (o !== "") {
              var p = su(o, 10);
              if (p > 65535)
                return Lw;
              n.port = n.isSpecial() && p === qo[n.scheme] ? null : p, o = "";
            }
            if (t)
              return;
            a = hn;
            continue;
          } else
            return Lw;
          break;
        case kf:
          if (n.scheme = "file", f === "/" || f === "\\")
            a = Vw;
          else if (e && e.scheme === "file")
            switch (f) {
              case Yr:
                n.host = e.host, n.path = it(e.path), n.query = e.query;
                break;
              case "?":
                n.host = e.host, n.path = it(e.path), n.query = "", a = Re;
                break;
              case "#":
                n.host = e.host, n.path = it(e.path), n.query = e.query, n.fragment = "", a = Lt;
                break;
              default:
                Fw(Wa(it(c, i), "")) || (n.host = e.host, n.path = it(e.path), n.shortenPath()), a = wt;
                continue;
            }
          else {
            a = wt;
            continue;
          }
          break;
        case Vw:
          if (f === "/" || f === "\\") {
            a = Bf;
            break;
          }
          e && e.scheme === "file" && !Fw(Wa(it(c, i), "")) && (qa(e.path[0], !0) ? yn(n.path, e.path[0]) : n.host = e.host), a = wt;
          continue;
        case Bf:
          if (f === Yr || f === "/" || f === "\\" || f === "?" || f === "#") {
            if (!t && qa(o))
              a = wt;
            else if (o === "") {
              if (n.host = "", t)
                return;
              a = hn;
            } else {
              if (h = n.parseHost(o), h)
                return h;
              if (n.host === "localhost" && (n.host = ""), t)
                return;
              o = "", a = hn;
            }
            continue;
          } else
            o += f;
          break;
        case hn:
          if (n.isSpecial()) {
            if (a = wt, f !== "/" && f !== "\\")
              continue;
          } else if (!t && f === "?")
            n.query = "", a = Re;
          else if (!t && f === "#")
            n.fragment = "", a = Lt;
          else if (f !== Yr && (a = wt, f !== "/"))
            continue;
          break;
        case wt:
          if (f === Yr || f === "/" || f === "\\" && n.isSpecial() || !t && (f === "?" || f === "#")) {
            if (Qpr(o) ? (n.shortenPath(), f !== "/" && !(f === "\\" && n.isSpecial()) && yn(n.path, "")) : Zpr(o) ? f !== "/" && !(f === "\\" && n.isSpecial()) && yn(n.path, "") : (n.scheme === "file" && !n.path.length && qa(o) && (n.host && (n.host = ""), o = Jr(o, 0) + ":"), yn(n.path, o)), o = "", n.scheme === "file" && (f === Yr || f === "?" || f === "#"))
              for (; n.path.length > 1 && n.path[0] === ""; )
                Lpr(n.path);
            f === "?" ? (n.query = "", a = Re) : f === "#" && (n.fragment = "", a = Lt);
          } else
            o += oe(f, pR);
          break;
        case Hw:
          f === "?" ? (n.query = "", a = Re) : f === "#" ? (n.fragment = "", a = Lt) : f !== Yr && (n.path[0] += oe(f, $s));
          break;
        case Re:
          !t && f === "#" ? (n.fragment = "", a = Lt) : f !== Yr && (f === "'" && n.isSpecial() ? n.query += "%27" : f === "#" ? n.query += "%23" : n.query += oe(f, $s));
          break;
        case Lt:
          f !== Yr && (n.fragment += oe(f, gR));
          break;
      }
      i++;
    }
  },
  // https://url.spec.whatwg.org/#host-parsing
  parseHost: function(r) {
    var t, e, n;
    if (Jr(r, 0) === "[") {
      if (Jr(r, r.length - 1) !== "]" || (t = Xpr(ni(r, 1, -1)), !t))
        return Ae;
      this.host = t;
    } else if (this.isSpecial()) {
      if (r = Opr(r), ct(Hpr, r) || (t = Kpr(r), t === null))
        return Ae;
      this.host = t;
    } else {
      if (ct(Gpr, r))
        return Ae;
      for (t = "", e = vn(r), n = 0; n < e.length; n++)
        t += oe(e[n], $s);
      this.host = t;
    }
  },
  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
  cannotHaveUsernamePasswordPort: function() {
    return !this.host || this.cannotBeABaseURL || this.scheme === "file";
  },
  // https://url.spec.whatwg.org/#include-credentials
  includesCredentials: function() {
    return this.username !== "" || this.password !== "";
  },
  // https://url.spec.whatwg.org/#is-special
  isSpecial: function() {
    return yh(qo, this.scheme);
  },
  // https://url.spec.whatwg.org/#shorten-a-urls-path
  shortenPath: function() {
    var r = this.path, t = r.length;
    t && (this.scheme !== "file" || t !== 1 || !qa(r[0], !0)) && r.length--;
  },
  // https://url.spec.whatwg.org/#concept-url-serializer
  serialize: function() {
    var r = this, t = r.scheme, e = r.username, n = r.password, a = r.host, i = r.port, o = r.path, s = r.query, u = r.fragment, l = t + ":";
    return a !== null ? (l += "//", r.includesCredentials() && (l += e + (n ? ":" + n : "") + "@"), l += ka(a), i !== null && (l += ":" + i)) : t === "file" && (l += "//"), l += r.cannotBeABaseURL ? o[0] : o.length ? "/" + Wa(o, "/") : "", s !== null && (l += "?" + s), u !== null && (l += "#" + u), l;
  },
  // https://url.spec.whatwg.org/#dom-url-href
  setHref: function(r) {
    var t = this.parse(r);
    if (t)
      throw new mh(t);
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-origin
  getOrigin: function() {
    var r = this.scheme, t = this.port;
    if (r === "blob")
      try {
        return new Zn(r.path[0]).origin;
      } catch {
        return "null";
      }
    return r === "file" || !this.isSpecial() ? "null" : r + "://" + ka(this.host) + (t !== null ? ":" + t : "");
  },
  // https://url.spec.whatwg.org/#dom-url-protocol
  getProtocol: function() {
    return this.scheme + ":";
  },
  setProtocol: function(r) {
    this.parse(Ft(r) + ":", Pf);
  },
  // https://url.spec.whatwg.org/#dom-url-username
  getUsername: function() {
    return this.username;
  },
  setUsername: function(r) {
    var t = vn(Ft(r));
    if (!this.cannotHaveUsernamePasswordPort()) {
      this.username = "";
      for (var e = 0; e < t.length; e++)
        this.username += oe(t[e], Cf);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-password
  getPassword: function() {
    return this.password;
  },
  setPassword: function(r) {
    var t = vn(Ft(r));
    if (!this.cannotHaveUsernamePasswordPort()) {
      this.password = "";
      for (var e = 0; e < t.length; e++)
        this.password += oe(t[e], Cf);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-host
  getHost: function() {
    var r = this.host, t = this.port;
    return r === null ? "" : t === null ? ka(r) : ka(r) + ":" + t;
  },
  setHost: function(r) {
    this.cannotBeABaseURL || this.parse(r, Df);
  },
  // https://url.spec.whatwg.org/#dom-url-hostname
  getHostname: function() {
    var r = this.host;
    return r === null ? "" : ka(r);
  },
  setHostname: function(r) {
    this.cannotBeABaseURL || this.parse(r, Lf);
  },
  // https://url.spec.whatwg.org/#dom-url-port
  getPort: function() {
    var r = this.port;
    return r === null ? "" : Ft(r);
  },
  setPort: function(r) {
    this.cannotHaveUsernamePasswordPort() || (r = Ft(r), r === "" ? this.port = null : this.parse(r, Ff));
  },
  // https://url.spec.whatwg.org/#dom-url-pathname
  getPathname: function() {
    var r = this.path;
    return this.cannotBeABaseURL ? r[0] : r.length ? "/" + Wa(r, "/") : "";
  },
  setPathname: function(r) {
    this.cannotBeABaseURL || (this.path = [], this.parse(r, hn));
  },
  // https://url.spec.whatwg.org/#dom-url-search
  getSearch: function() {
    var r = this.query;
    return r ? "?" + r : "";
  },
  setSearch: function(r) {
    r = Ft(r), r === "" ? this.query = null : (Jr(r, 0) === "?" && (r = ni(r, 1)), this.query = "", this.parse(r, Re)), this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-searchparams
  getSearchParams: function() {
    return this.searchParams.facade;
  },
  // https://url.spec.whatwg.org/#dom-url-hash
  getHash: function() {
    var r = this.fragment;
    return r ? "#" + r : "";
  },
  setHash: function(r) {
    if (r = Ft(r), r === "") {
      this.fragment = null;
      return;
    }
    Jr(r, 0) === "#" && (r = ni(r, 1)), this.fragment = "", this.parse(r, Lt);
  },
  update: function() {
    this.query = this.searchParams.serialize() || null;
  }
};
var Zn = function(t) {
  var e = xpr(this, Ir), n = Rpr(arguments.length, 1) > 1 ? arguments[1] : void 0, a = _pr(e, new jg(t, !1, n));
  Fg || (e.href = a.serialize(), e.origin = a.getOrigin(), e.protocol = a.getProtocol(), e.username = a.getUsername(), e.password = a.getPassword(), e.host = a.getHost(), e.hostname = a.getHostname(), e.port = a.getPort(), e.pathname = a.getPathname(), e.search = a.getSearch(), e.searchParams = a.getSearchParams(), e.hash = a.getHash());
}, Ir = Zn.prototype, Kr = function(r, t) {
  return {
    get: function() {
      return ou(this)[r]();
    },
    set: t && function(e) {
      return ou(this)[t](e);
    },
    configurable: !0,
    enumerable: !0
  };
};
Fg && (qr(Ir, "href", Kr("serialize", "setHref")), qr(Ir, "origin", Kr("getOrigin")), qr(Ir, "protocol", Kr("getProtocol", "setProtocol")), qr(Ir, "username", Kr("getUsername", "setUsername")), qr(Ir, "password", Kr("getPassword", "setPassword")), qr(Ir, "host", Kr("getHost", "setHost")), qr(Ir, "hostname", Kr("getHostname", "setHostname")), qr(Ir, "port", Kr("getPort", "setPort")), qr(Ir, "pathname", Kr("getPathname", "setPathname")), qr(Ir, "search", Kr("getSearch", "setSearch")), qr(Ir, "searchParams", Kr("getSearchParams")), qr(Ir, "hash", Kr("getHash", "setHash")));
iu(Ir, "toJSON", function() {
  return ou(this).serialize();
}, { enumerable: !0 });
iu(Ir, "toString", function() {
  return ou(this).serialize();
}, { enumerable: !0 });
if (Fa) {
  var Gw = Fa.createObjectURL, Ww = Fa.revokeObjectURL;
  Gw && iu(Zn, "createObjectURL", Nw(Gw, Fa)), Ww && iu(Zn, "revokeObjectURL", Nw(Ww, Fa));
}
Apr(Zn, "URL");
Epr({ global: !0, constructor: !0, forced: !Tpr, sham: !Fg }, {
  URL: Zn
});
var r$r = d, t$r = nr, $R = x, e$r = et, qw = V, n$r = hl, Ug = t$r("URL"), a$r = n$r && $R(function() {
  Ug.canParse();
}), i$r = $R(function() {
  return Ug.canParse.length !== 1;
});
r$r({ target: "URL", stat: !0, forced: !a$r || i$r }, {
  canParse: function(t) {
    var e = e$r(arguments.length, 1), n = qw(t), a = e < 2 || arguments[1] === void 0 ? void 0 : qw(arguments[1]);
    try {
      return !!new Ug(n, a);
    } catch {
      return !1;
    }
  }
});
var o$r = d, s$r = nr, u$r = et, Yw = V, l$r = hl, c$r = s$r("URL");
o$r({ target: "URL", stat: !0, forced: !l$r }, {
  parse: function(t) {
    var e = u$r(arguments.length, 1), n = Yw(t), a = e < 2 || arguments[1] === void 0 ? void 0 : Yw(arguments[1]);
    try {
      return new c$r(n, a);
    } catch {
      return null;
    }
  }
});
var f$r = d, v$r = U;
f$r({ target: "URL", proto: !0, enumerable: !0 }, {
  toJSON: function() {
    return v$r(URL.prototype.toString, this);
  }
});
var h$r = ur, gl = O, Kw = V, d$r = et, yR = URLSearchParams, pl = yR.prototype, g$r = gl(pl.append), Xw = gl(pl.delete), p$r = gl(pl.forEach), $$r = gl([].push), zg = new yR("a=1&a=2&b=3");
zg.delete("a", 1);
zg.delete("b", void 0);
zg + "" != "a=2" && h$r(pl, "delete", function(r) {
  var t = arguments.length, e = t < 2 ? void 0 : arguments[1];
  if (t && e === void 0)
    return Xw(this, r);
  var n = [];
  p$r(this, function(f, v) {
    $$r(n, { key: v, value: f });
  }), d$r(t, 1);
  for (var a = Kw(r), i = Kw(e), o = 0, s = 0, u = !1, l = n.length, c; o < l; )
    c = n[o++], u || c.key === a ? (u = !0, Xw(this, c.key)) : s++;
  for (; s < l; )
    c = n[s++], c.key === a && c.value === i || g$r(this, c.key, c.value);
}, { enumerable: !0, unsafe: !0 });
var y$r = ur, mR = O, m$r = V, b$r = et, bR = URLSearchParams, Vg = bR.prototype, w$r = mR(Vg.getAll), S$r = mR(Vg.has), Jw = new bR("a=1");
(Jw.has("a", 2) || !Jw.has("a", void 0)) && y$r(Vg, "has", function(t) {
  var e = arguments.length, n = e < 2 ? void 0 : arguments[1];
  if (e && n === void 0)
    return S$r(this, t);
  var a = w$r(this, t);
  b$r(e, 1);
  for (var i = m$r(n), o = 0; o < a.length; )
    if (a[o++] === i)
      return !0;
  return !1;
}, { enumerable: !0, unsafe: !0 });
var E$r = B, T$r = O, x$r = hr, wh = URLSearchParams.prototype, I$r = T$r(wh.forEach);
E$r && !("size" in wh) && x$r(wh, "size", {
  get: function() {
    var t = 0;
    return I$r(this, function() {
      t++;
    }), t;
  },
  configurable: !0,
  enumerable: !0
});
var O$r = { exports: {} };
(function(r) {
  var t = function(e) {
    var n = Object.prototype, a = n.hasOwnProperty, i = Object.defineProperty || function(b, w, E) {
      b[w] = E.value;
    }, o, s = typeof Symbol == "function" ? Symbol : {}, u = s.iterator || "@@iterator", l = s.asyncIterator || "@@asyncIterator", c = s.toStringTag || "@@toStringTag";
    function f(b, w, E) {
      return Object.defineProperty(b, w, {
        value: E,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), b[w];
    }
    try {
      f({}, "");
    } catch {
      f = function(w, E, P) {
        return w[E] = P;
      };
    }
    function v(b, w, E, P) {
      var M = w && w.prototype instanceof I ? w : I, j = Object.create(M.prototype), W = new T(P || []);
      return i(j, "_invoke", { value: ir(b, E, W) }), j;
    }
    e.wrap = v;
    function h(b, w, E) {
      try {
        return { type: "normal", arg: b.call(w, E) };
      } catch (P) {
        return { type: "throw", arg: P };
      }
    }
    var g = "suspendedStart", $ = "suspendedYield", y = "executing", p = "completed", S = {};
    function I() {
    }
    function A() {
    }
    function N() {
    }
    var z = {};
    f(z, u, function() {
      return this;
    });
    var X = Object.getPrototypeOf, Q = X && X(X(C([])));
    Q && Q !== n && a.call(Q, u) && (z = Q);
    var lr = N.prototype = I.prototype = Object.create(z);
    A.prototype = N, i(lr, "constructor", { value: N, configurable: !0 }), i(
      N,
      "constructor",
      { value: A, configurable: !0 }
    ), A.displayName = f(
      N,
      c,
      "GeneratorFunction"
    );
    function fr(b) {
      ["next", "throw", "return"].forEach(function(w) {
        f(b, w, function(E) {
          return this._invoke(w, E);
        });
      });
    }
    e.isGeneratorFunction = function(b) {
      var w = typeof b == "function" && b.constructor;
      return w ? w === A || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (w.displayName || w.name) === "GeneratorFunction" : !1;
    }, e.mark = function(b) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(b, N) : (b.__proto__ = N, f(b, c, "GeneratorFunction")), b.prototype = Object.create(lr), b;
    }, e.awrap = function(b) {
      return { __await: b };
    };
    function F(b, w) {
      function E(j, W, rr, tr) {
        var er = h(b[j], b, W);
        if (er.type === "throw")
          tr(er.arg);
        else {
          var at = er.arg, ee = at.value;
          return ee && typeof ee == "object" && a.call(ee, "__await") ? w.resolve(ee.__await).then(function(yt) {
            E("next", yt, rr, tr);
          }, function(yt) {
            E("throw", yt, rr, tr);
          }) : w.resolve(ee).then(function(yt) {
            at.value = yt, rr(at);
          }, function(yt) {
            return E("throw", yt, rr, tr);
          });
        }
      }
      var P;
      function M(j, W) {
        function rr() {
          return new w(function(tr, er) {
            E(j, W, tr, er);
          });
        }
        return P = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        P ? P.then(
          rr,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          rr
        ) : rr();
      }
      i(this, "_invoke", { value: M });
    }
    fr(F.prototype), f(F.prototype, l, function() {
      return this;
    }), e.AsyncIterator = F, e.async = function(b, w, E, P, M) {
      M === void 0 && (M = Promise);
      var j = new F(
        v(b, w, E, P),
        M
      );
      return e.isGeneratorFunction(w) ? j : j.next().then(function(W) {
        return W.done ? W.value : j.next();
      });
    };
    function ir(b, w, E) {
      var P = g;
      return function(j, W) {
        if (P === y)
          throw new Error("Generator is already running");
        if (P === p) {
          if (j === "throw")
            throw W;
          return L();
        }
        for (E.method = j, E.arg = W; ; ) {
          var rr = E.delegate;
          if (rr) {
            var tr = D(rr, E);
            if (tr) {
              if (tr === S)
                continue;
              return tr;
            }
          }
          if (E.method === "next")
            E.sent = E._sent = E.arg;
          else if (E.method === "throw") {
            if (P === g)
              throw P = p, E.arg;
            E.dispatchException(E.arg);
          } else
            E.method === "return" && E.abrupt("return", E.arg);
          P = y;
          var er = h(b, w, E);
          if (er.type === "normal") {
            if (P = E.done ? p : $, er.arg === S)
              continue;
            return {
              value: er.arg,
              done: E.done
            };
          } else
            er.type === "throw" && (P = p, E.method = "throw", E.arg = er.arg);
        }
      };
    }
    function D(b, w) {
      var E = w.method, P = b.iterator[E];
      if (P === o)
        return w.delegate = null, E === "throw" && b.iterator.return && (w.method = "return", w.arg = o, D(b, w), w.method === "throw") || E !== "return" && (w.method = "throw", w.arg = new TypeError(
          "The iterator does not provide a '" + E + "' method"
        )), S;
      var M = h(P, b.iterator, w.arg);
      if (M.type === "throw")
        return w.method = "throw", w.arg = M.arg, w.delegate = null, S;
      var j = M.arg;
      if (!j)
        return w.method = "throw", w.arg = new TypeError("iterator result is not an object"), w.delegate = null, S;
      if (j.done)
        w[b.resultName] = j.value, w.next = b.nextLoc, w.method !== "return" && (w.method = "next", w.arg = o);
      else
        return j;
      return w.delegate = null, S;
    }
    fr(lr), f(lr, c, "Generator"), f(lr, u, function() {
      return this;
    }), f(lr, "toString", function() {
      return "[object Generator]";
    });
    function m(b) {
      var w = { tryLoc: b[0] };
      1 in b && (w.catchLoc = b[1]), 2 in b && (w.finallyLoc = b[2], w.afterLoc = b[3]), this.tryEntries.push(w);
    }
    function R(b) {
      var w = b.completion || {};
      w.type = "normal", delete w.arg, b.completion = w;
    }
    function T(b) {
      this.tryEntries = [{ tryLoc: "root" }], b.forEach(m, this), this.reset(!0);
    }
    e.keys = function(b) {
      var w = Object(b), E = [];
      for (var P in w)
        E.push(P);
      return E.reverse(), function M() {
        for (; E.length; ) {
          var j = E.pop();
          if (j in w)
            return M.value = j, M.done = !1, M;
        }
        return M.done = !0, M;
      };
    };
    function C(b) {
      if (b) {
        var w = b[u];
        if (w)
          return w.call(b);
        if (typeof b.next == "function")
          return b;
        if (!isNaN(b.length)) {
          var E = -1, P = function M() {
            for (; ++E < b.length; )
              if (a.call(b, E))
                return M.value = b[E], M.done = !1, M;
            return M.value = o, M.done = !0, M;
          };
          return P.next = P;
        }
      }
      return { next: L };
    }
    e.values = C;
    function L() {
      return { value: o, done: !0 };
    }
    return T.prototype = {
      constructor: T,
      reset: function(b) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = o, this.done = !1, this.delegate = null, this.method = "next", this.arg = o, this.tryEntries.forEach(R), !b)
          for (var w in this)
            w.charAt(0) === "t" && a.call(this, w) && !isNaN(+w.slice(1)) && (this[w] = o);
      },
      stop: function() {
        this.done = !0;
        var b = this.tryEntries[0], w = b.completion;
        if (w.type === "throw")
          throw w.arg;
        return this.rval;
      },
      dispatchException: function(b) {
        if (this.done)
          throw b;
        var w = this;
        function E(tr, er) {
          return j.type = "throw", j.arg = b, w.next = tr, er && (w.method = "next", w.arg = o), !!er;
        }
        for (var P = this.tryEntries.length - 1; P >= 0; --P) {
          var M = this.tryEntries[P], j = M.completion;
          if (M.tryLoc === "root")
            return E("end");
          if (M.tryLoc <= this.prev) {
            var W = a.call(M, "catchLoc"), rr = a.call(M, "finallyLoc");
            if (W && rr) {
              if (this.prev < M.catchLoc)
                return E(M.catchLoc, !0);
              if (this.prev < M.finallyLoc)
                return E(M.finallyLoc);
            } else if (W) {
              if (this.prev < M.catchLoc)
                return E(M.catchLoc, !0);
            } else if (rr) {
              if (this.prev < M.finallyLoc)
                return E(M.finallyLoc);
            } else
              throw new Error("try statement without catch or finally");
          }
        }
      },
      abrupt: function(b, w) {
        for (var E = this.tryEntries.length - 1; E >= 0; --E) {
          var P = this.tryEntries[E];
          if (P.tryLoc <= this.prev && a.call(P, "finallyLoc") && this.prev < P.finallyLoc) {
            var M = P;
            break;
          }
        }
        M && (b === "break" || b === "continue") && M.tryLoc <= w && w <= M.finallyLoc && (M = null);
        var j = M ? M.completion : {};
        return j.type = b, j.arg = w, M ? (this.method = "next", this.next = M.finallyLoc, S) : this.complete(j);
      },
      complete: function(b, w) {
        if (b.type === "throw")
          throw b.arg;
        return b.type === "break" || b.type === "continue" ? this.next = b.arg : b.type === "return" ? (this.rval = this.arg = b.arg, this.method = "return", this.next = "end") : b.type === "normal" && w && (this.next = w), S;
      },
      finish: function(b) {
        for (var w = this.tryEntries.length - 1; w >= 0; --w) {
          var E = this.tryEntries[w];
          if (E.finallyLoc === b)
            return this.complete(E.completion, E.afterLoc), R(E), S;
        }
      },
      catch: function(b) {
        for (var w = this.tryEntries.length - 1; w >= 0; --w) {
          var E = this.tryEntries[w];
          if (E.tryLoc === b) {
            var P = E.completion;
            if (P.type === "throw") {
              var M = P.arg;
              R(E);
            }
            return M;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(b, w, E) {
        return this.delegate = {
          iterator: C(b),
          resultName: w,
          nextLoc: E
        }, this.method === "next" && (this.arg = o), S;
      }
    }, e;
  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    r.exports
  );
  try {
    regeneratorRuntime = t;
  } catch {
    typeof globalThis == "object" ? globalThis.regeneratorRuntime = t : Function("r", "regeneratorRuntime = r")(t);
  }
})(O$r);
class Zw {
  constructor(t) {
    this.context = t;
  }
  renderLine(t, e, n, a, i, o) {
    this.context.lineWidth = i, this.context.moveTo(t, e), this.context.lineTo(n, a), this.context.strokeStyle = o, this.context.stroke();
  }
}
class D$r {
  constructor(t, e, n, a, i = new mp()) {
    this.tooltip = null, this.highlightedRow = -1, this.highlightedColumn = -1, this.animatingRows = !1, this.animatingCols = !1, this.clusteredHorizontal = !1, this.clusteredVertical = !1, this.lastZoomStatus = {
      k: 1,
      x: 0,
      y: 0
    }, this.settings = this.fillOptions(i), this.element = t;
    const o = new wp();
    this.rows = o.preprocessFeatures(n), this.columns = o.preprocessFeatures(a), this.values = o.preprocessValues(
      e,
      this.settings.minColor,
      this.settings.maxColor,
      this.settings.colorBuckets
    ), this.valuesPerColor = o.orderPerColor(this.values), this.settings.enableTooltips && (this.tooltip = this.initTooltip()), this.pixelRatio = window.devicePixelRatio || 1, this.originalViewPort = {
      xTop: 0,
      yTop: 0,
      xBottom: this.settings.width,
      yBottom: this.settings.height
    }, this.currentViewPort = this.originalViewPort, this.textWidth = this.settings.initialTextWidth, this.textHeight = this.settings.initialTextHeight, this.element.innerHTML = "", this.visElement = yr(this.element).append("canvas").attr("width", this.pixelRatio * this.settings.width).attr("height", this.pixelRatio * this.settings.height).attr("style", `width: ${this.settings.width}px; height: ${this.settings.height}px`).on("mouseover", (u) => this.tooltipMove(u)).on("mousemove", (u) => this.tooltipMove(u)).on("mouseout", (u) => this.tooltipMove(u)).on("click", (u) => this.click(u)), this.context = this.visElement.node().getContext("2d"), this.context.scale(this.pixelRatio, this.pixelRatio);
    const s = GS().extent([[0, 0], [this.settings.width, this.settings.height]]).scaleExtent([0.25, 12]).on("zoom", (u) => {
      this.zoomed(u.transform);
    });
    this.visElement.call(s), this.computeClusterRoots(), this.redraw();
  }
  fillOptions(t = void 0) {
    let e = new mp();
    return Object.assign(e, t);
  }
  /**
   * Reset the complete view to it's initial state with the options and data passed in the constructor.
   */
  reset() {
    this.redraw();
  }
  /**
   * Cluster the data found in the Heatmap according to the default clustering algorithm.
   * @param toCluster One of "all", "columns" or "rows". "All" denotes that clustering on both the rows and columns
   * should be performed. "Columns" denotes that clustering should only be clustered on the columns only. "Rows"
   * denotes that the clustering is performed on the rows only.
   */
  async cluster(t = "all") {
    const e = this.settings.animationsEnabled ? this.settings.animationDuration / 2 : 0, n = (l, c) => new Promise((f) => {
      let v;
      const h = (g) => {
        v === void 0 && (v = g);
        const $ = g - v, y = this.settings.transition($ / e);
        this.redraw(l, c, y), $ < e ? requestAnimationFrame(h) : f();
      };
      requestAnimationFrame(h);
    }), a = new wp();
    let i = Array.from(Array(this.rows.length).keys()), o = new Array(i.length);
    if ((t === "all" || t === "rows") && !this.clusteredVertical) {
      this.clusteredVertical = !0, i = this.determineOrder(this.rowClusterRoot);
      for (const [v, h] of Object.entries(i))
        o[h] = Number.parseInt(v);
      const l = Array.from(Array(this.columns.length).keys());
      this.animatingRows = !0, await n(o, l), this.animatingRows = !1;
      let c = [];
      for (const v of i)
        c.push(this.values[v]);
      const f = [];
      for (const v of i)
        f.push(this.rows[v]);
      this.rows = f, this.values = c, this.valuesPerColor = a.orderPerColor(this.values);
    }
    let s = Array.from(Array(this.columns.length).keys()), u = new Array(s.length);
    if ((t === "all" || t === "columns") && !this.clusteredHorizontal) {
      this.clusteredHorizontal = !0, s = this.determineOrder(this.colClusterRoot);
      for (const [v, h] of Object.entries(s))
        u[h] = Number.parseInt(v);
      const l = Array.from(Array(this.rows.length).keys());
      this.animatingCols = !0, await n(l, u), this.animatingCols = !1;
      let c = [];
      for (const v of l) {
        let h = [];
        for (const g of s)
          h.push(this.values[v][g]);
        c.push(h);
      }
      const f = [];
      for (const v of s)
        f.push(this.columns[v]);
      this.columns = f, this.values = c, this.valuesPerColor = a.orderPerColor(this.values);
    }
    this.redraw();
  }
  computeClusterRoots() {
    let t = this.settings.clusteringAlgorithm, e = this.settings.reorderer, n = this.rows.map(
      (i, o) => new bp(
        this.values[o].filter((s) => s.rowId == i.idx).map((s) => s.value),
        i.idx
      )
    );
    this.rowClusterRoot = e.reorder(t.cluster(n)), this.verticalNodesPerDepth = this.bfsNodesPerDepth(this.rowClusterRoot);
    let a = this.columns.map(
      (i, o) => new bp(
        this.values.map((s) => s[o].value),
        i.idx
      )
    );
    this.colClusterRoot = e.reorder(t.cluster(a)), this.horizontalNodesPerDepth = this.bfsNodesPerDepth(this.colClusterRoot);
  }
  resize(t, e) {
    this.settings.width = t, this.settings.height = e, this.visElement.attr("height", this.pixelRatio * e), this.visElement.attr("width", this.pixelRatio * t), this.visElement.attr("style", `width: ${this.settings.width}px; height: ${this.settings.height}px`), this.context.scale(this.pixelRatio, this.pixelRatio), this.originalViewPort = {
      xTop: 0,
      yTop: 0,
      xBottom: t,
      yBottom: e
    }, this.zoomed(this.lastZoomStatus);
  }
  /**
   * Convert the heatmap to an SVG-string that can easily be downloaded as a valid SVG-file. Note that the current
   * positioning and zooming level of the heatmap will not be taken into account (but clustering will!).
   *
   * Note that this function can take a while to compute for larger heatmaps. It is recommended to start this
   * function in a dedicated worker in order not to block the main JS thread.
   *
   * @param fontSize Font size that should be used for the labels in the produced SVG file.
   * @param squareDimension width and height (in pixels) of one square in the produced heatmap.
   * @param squarePadding Amount of space between squares in both the horizontal and vertical direction (in pixels).
   * @param visualizationTextPadding Amount of space between the heatmap itself and the labels on both axes.
   * @return A string that represents the content of a valid SVG file.
   */
  toSVG(t = 14, e = 20, n = 2, a = 4) {
    const i = e;
    let o = "";
    for (const [g, $] of this.valuesPerColor)
      for (const [y, p] of $) {
        const S = p * (i + n), I = y * (i + n);
        o += `
                    <rect width="${i}" height="${i}" fill="${g}" x="${S}" y="${I}"></rect>
                `;
      }
    const u = new OffscreenCanvas(1, 1).getContext("2d");
    u.font = `${t}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
    const l = i * this.columns.length + n * (this.columns.length - 1) + a, c = Math.max((i - t) / 2, 0);
    let f = l;
    for (let g = 0; g < this.rows.length; g++) {
      const $ = (i + n) * g + c;
      o += `
                <text 
                    x="${l}" 
                    y="${$}" 
                    font-size="${t}" 
                    dominant-baseline="hanging" 
                    fill="black"
                    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
                >
                    ${this.rows[g].name}
                </text>
            `;
      const y = u.measureText(this.rows[g].name).width + l;
      y > f && (f = y);
    }
    const v = i * this.rows.length + n * (this.rows.length - 1) + a;
    let h = v;
    for (let g = 0; g < this.columns.length; g++) {
      const $ = (i + n) * g + c;
      o += `
                <text 
                    x="${$}" 
                    y="${v}" 
                    font-size="${t}" 
                    text-anchor="start" 
                    fill="black"
                    transform="rotate(90, ${$}, ${v})"
                    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
                >
                    ${this.columns[g].name}
                </text>
            `;
      const y = u.measureText(this.columns[g].name).width + v;
      y > h && (h = y);
    }
    return `
            <svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(f)}" height="${Math.ceil(h)}">
                ${o}
            </svg>
        `;
  }
  /**
   * Extracts a linear order from a dendrogram by following all branches up to leaves in a depth-first ordering.
   *
   * @param treeNode Root of a dendrogram for which a linear leaf ordering needs to be extracted.
   */
  determineOrder(t) {
    return t.values.map((e) => e.id);
  }
  /**
   * Determines the dimensions of one square based upon the current width and height-settings and the amount of rows
   * and columns currently set to be visualized.
   */
  determineSquareWidth(t = this.currentViewPort, e = this.textWidth, n = this.textHeight) {
    const a = this.determineDendrogramWidth(), i = t.xBottom - t.xTop - a - this.columns.length * this.settings.squarePadding - e, o = t.yBottom - t.yTop - a - this.rows.length * this.settings.squarePadding - n;
    let s = Math.max(1, i / this.columns.length), u = Math.max(1, o / this.rows.length);
    return Math.min(s, u);
  }
  determineDendrogramWidth() {
    return this.settings.dendrogramEnabled ? this.settings.dendrogramWidth * this.lastZoomStatus.k : 0;
  }
  computeTextStartX(t = this.currentViewPort, e = this.textWidth, n = this.textHeight) {
    return t.xTop + this.determineDendrogramWidth() + this.determineSquareWidth(t, e, n) * this.columns.length + this.settings.squarePadding * (this.columns.length - 1) + this.settings.visualizationTextPadding;
  }
  computeTextStartY(t = this.currentViewPort, e = this.textWidth, n = this.textHeight) {
    return t.yTop + this.determineDendrogramWidth() + this.determineSquareWidth(t, e, n) * this.rows.length + this.settings.squarePadding * (this.rows.length - 1) + this.settings.visualizationTextPadding;
  }
  zoomed({ k: t, x: e, y: n }) {
    this.lastZoomStatus = { k: t, x: e, y: n };
    const a = e + this.computeTextStartX(
      this.originalViewPort,
      this.settings.initialTextWidth,
      this.settings.initialTextHeight
    ) * t, i = n + this.computeTextStartY(
      this.originalViewPort,
      this.settings.initialTextWidth,
      this.settings.initialTextHeight
    ) * t, o = (s, u) => s > u ? u : t >= 1 ? Math.min(s, u) : Math.max(s, u);
    this.currentViewPort = {
      xTop: e + this.originalViewPort.xTop * t,
      yTop: n + this.originalViewPort.yTop * t,
      xBottom: o(e + this.originalViewPort.xBottom * t, this.originalViewPort.xBottom),
      yBottom: o(n + this.originalViewPort.yBottom * t, this.originalViewPort.yBottom)
    }, this.textWidth = this.currentViewPort.xBottom - a, this.textHeight = this.currentViewPort.yBottom - i, this.redraw();
  }
  /**
   * Redraw the complete Heatmap and clear the view first. This function accepts three optional arguments that
   * determine the current animation state (if requested).
   *
   * @param newRowPositions Current position of the rows. Row[i] = j denotes that the i'th row in the original grid
   * should move to position j.
   * @param newColumnPositions New positions of the columns. Column[i] = j denotes that i'th column in the original
   * grid should move to position j.
   * @param animationStep A decimal number (in [0, 1]) that denotes the current animation progress. If 0.7 is passed
   * as a value, 70% of the animation has already passed.
   */
  redraw(t = Array.from(Array(this.rows.length).keys()), e = Array.from(Array(this.columns.length).keys()), n = -1) {
    this.redrawGrid(t, e, n), this.redrawRowTitles(t, n), this.redrawColumnTitles(e, n), this.redrawDendrogram(n);
  }
  redrawGrid(t, e, n) {
    n === -1 && (n = 0);
    let a = this.determineSquareWidth();
    const i = this.determineDendrogramWidth();
    this.context.clearRect(0, 0, this.settings.width, this.settings.height);
    for (const [o, s] of this.valuesPerColor) {
      this.context.beginPath(), this.context.fillStyle = o;
      for (const [u, l] of s) {
        const c = this.currentViewPort.xTop + i + l * (a + this.settings.squarePadding), f = this.currentViewPort.yTop + i + u * (a + this.settings.squarePadding), v = this.currentViewPort.xTop + i + e[l] * (a + this.settings.squarePadding), h = this.currentViewPort.yTop + i + t[u] * (a + this.settings.squarePadding), g = v - c, $ = h - f;
        let y = c + g * n, p = f + $ * n, S = y + (a + this.settings.squarePadding), I = p + (a + this.settings.squarePadding);
        S < 0 || y > this.settings.width || I < 0 || p > this.settings.height || (this.settings.highlightSelection && u == this.highlightedRow && l == this.highlightedColumn && (this.context.save(), this.context.fillStyle = this.settings.maxColor, this.context.fillRect(
          y - this.settings.squarePadding,
          p - this.settings.squarePadding,
          a + 2 * this.settings.squarePadding,
          a + 2 * this.settings.squarePadding
        ), this.context.restore()), this.context.fillRect(
          y,
          p,
          a,
          a
        ));
      }
      this.context.closePath();
    }
  }
  /**
   * Add ellipsis characters to the string, if it does not fit onto the screen.
   *
   * @param input The string to which an ellipsis should be added, if required.
   * @param width The maximum width that the string should occupy.
   * @return A string to which an ellipsis has been added, if it was required.
   */
  ellipsizeString(t, e) {
    if (this.context.measureText(t).width > e) {
      let a = t.length, i = t.substr(0, a) + "...";
      for (; this.context.measureText(i).width > e && a > 0; )
        a--, i = t.substr(0, a) + "...";
      return a === 0 ? "" : i;
    } else
      return t;
  }
  redrawRowTitles(t, e) {
    e === -1 && (e = 0);
    const n = this.determineSquareWidth(), a = this.determineDendrogramWidth(), i = Math.max(Math.floor((this.settings.fontSize + 12) / (n + this.settings.squarePadding)), 1), o = this.computeTextStartX();
    let s = Math.max((n - this.settings.fontSize) / 2, 0);
    this.context.save(), this.context.fillStyle = this.settings.labelColor, this.context.textBaseline = "top", this.context.textAlign = "start", this.context.font = `${this.settings.fontSize}px Arial, sans-serif`;
    for (let u = 0; u < this.rows.length; u += i) {
      const l = this.rows[u];
      this.settings.highlightSelection && u == this.highlightedRow && (this.context.save(), this.context.fillStyle = this.settings.highlightFontColor, this.context.font = `${this.settings.highlightFontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`, s = Math.max((n - this.settings.highlightFontSize) / 2, 0));
      const c = this.currentViewPort.yTop + a + (n + this.settings.squarePadding) * u + s, v = this.currentViewPort.yTop + a + (n + this.settings.squarePadding) * t[u] + s - c, h = c + v * e;
      this.context.fillText(
        this.ellipsizeString(l.name, this.textWidth),
        o,
        h
      ), this.settings.highlightSelection && u == this.highlightedRow && this.context.restore();
    }
    this.context.restore();
  }
  redrawColumnTitles(t, e) {
    e === -1 && (e = 0);
    let n = this.determineSquareWidth();
    const a = this.determineDendrogramWidth();
    let i = Math.max(Math.floor((this.settings.fontSize + 12) / (n + this.settings.squarePadding)), 1), o = this.computeTextStartY(), s = Math.max((n - this.settings.fontSize) / 2, 0);
    this.context.save(), this.context.rotate(90 * Math.PI / 180), this.context.fillStyle = this.settings.labelColor, this.context.textBaseline = "bottom", this.context.textAlign = "start", this.context.font = `${this.settings.fontSize}px Arial, sans-serif`;
    for (let u = 0; u < this.columns.length; u += i) {
      const l = this.columns[u];
      this.settings.highlightSelection && u == this.highlightedColumn && (this.context.save(), this.context.fillStyle = this.settings.highlightFontColor, this.context.font = `${this.settings.highlightFontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`, s = Math.max((n - this.settings.highlightFontSize) / 2, 0));
      const c = -(this.currentViewPort.xTop + a + (n + this.settings.squarePadding) * u + s), v = -(this.currentViewPort.xTop + a + (n + this.settings.squarePadding) * t[u] + s) - c, h = c + v * e;
      this.context.fillText(
        this.ellipsizeString(l.name, this.textHeight),
        o,
        h
      ), this.settings.highlightSelection && u == this.highlightedColumn && this.context.restore();
    }
    this.context.restore();
  }
  /**
   * Perform a BFS search on the given tree and order all encountered nodes per depth level. The resulting output
   * of this function is a 2D array of the format depth => TreeNode[] (thus it keeps track of all nodes that are
   * situated at a specific level). Note that the ordering of these nodes per level is not arbitrary, but that nodes
   * in pairs share the parent (that is, node at index 0 and index 1 share the same parent, etc).
   *
   * @param root The root of the tree for which we should order all the children per depth level.
   * @return A 2D array containing one array per depth level of the given tree.
   */
  bfsNodesPerDepth(t) {
    const e = [], n = [];
    for (n.push([t, 0]); n.length > 0; ) {
      const [a, i] = n.shift();
      e.length <= i && e.push([]), e[i].push(a), a.leftChild && n.push([a.leftChild, i + 1]), a.rightChild && n.push([a.rightChild, i + 1]);
    }
    return e;
  }
  redrawDendrogram(t) {
    this.settings.dendrogramEnabled && (this.redrawHorizontalDendrogram(t), this.redrawVerticalDendrogram(t));
  }
  computeDendrogramColor(t, e, n) {
    return n === -1 || !e ? t ? this.settings.dendrogramColor : "#d3d3d3" : Ih(ke("#d3d3d3"), ke(this.settings.dendrogramColor))(n);
  }
  redrawVerticalDendrogram(t) {
    this.context.save();
    const e = this.computeDendrogramColor(this.clusteredVertical, this.animatingRows, t), n = this.determineSquareWidth(), a = this.settings.dendrogramWidth * this.lastZoomStatus.k, i = new Zw(this.context), o = this.currentViewPort.yTop + a + n / 2, s = /* @__PURE__ */ new Map(), u = this.determineOrder(this.rowClusterRoot);
    for (let f = 0; f < u.length; f++)
      s.set(
        u[f],
        [
          this.currentViewPort.xTop + a,
          f * (n + this.settings.squarePadding) + o
        ]
      );
    const l = a / this.rows.length;
    let c = this.currentViewPort.xTop + a - l;
    for (let f = this.verticalNodesPerDepth.length - 1; f > 0; f--)
      for (let v = 0; v < this.verticalNodesPerDepth[f].length; v += 2) {
        const h = this.verticalNodesPerDepth[f][v], g = this.verticalNodesPerDepth[f][v + 1], $ = h.parent, [y, p] = s.get(h.id), [S, I] = s.get(g.id);
        if (this.context.beginPath(), i.renderLine(y, p, c, p, this.settings.dendrogramLineWidth, e), i.renderLine(S, I, c, I, this.settings.dendrogramLineWidth, e), i.renderLine(c, p, c, I, this.settings.dendrogramLineWidth, e), this.context.closePath(), $) {
          const A = Math.min(p, I) + Math.abs(p - I) / 2;
          s.set($.id, [c, A]);
        }
        c -= l;
      }
    if (!this.clusteredVertical) {
      this.context.rotate(-(90 * Math.PI) / 180), this.context.fillStyle = this.settings.labelColor;
      const f = 24 * this.lastZoomStatus.k;
      this.context.font = `${f}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
      const v = this.context.measureText("Click to cluster").width;
      this.context.fillText(
        "Click to cluster",
        -(this.currentViewPort.yTop + a + this.rows.length * (n + this.settings.squarePadding) / 2) - v / 2,
        this.currentViewPort.xTop + a / 2 + f / 2
      );
    }
    this.context.restore();
  }
  redrawHorizontalDendrogram(t) {
    this.context.save();
    const e = this.computeDendrogramColor(this.clusteredHorizontal, this.animatingCols, t), n = this.determineSquareWidth(), a = this.settings.dendrogramWidth * this.lastZoomStatus.k, i = new Zw(this.context), o = this.currentViewPort.xTop + n / 2 + a, s = /* @__PURE__ */ new Map(), u = this.determineOrder(this.colClusterRoot);
    for (let f = 0; f < u.length; f++)
      s.set(
        u[f],
        [
          f * (n + this.settings.squarePadding) + o,
          this.currentViewPort.yTop + a
        ]
      );
    const l = a / this.columns.length;
    let c = this.currentViewPort.yTop + a - l;
    for (let f = this.horizontalNodesPerDepth.length - 1; f > 0; f--)
      for (let v = 0; v < this.horizontalNodesPerDepth[f].length; v += 2) {
        const h = this.horizontalNodesPerDepth[f][v], g = this.horizontalNodesPerDepth[f][v + 1], $ = h.parent, [y, p] = s.get(h.id), [S, I] = s.get(g.id);
        if (this.context.beginPath(), i.renderLine(y, p, y, c, this.settings.dendrogramLineWidth, e), i.renderLine(S, I, S, c, this.settings.dendrogramLineWidth, e), i.renderLine(y, c, S, c, this.settings.dendrogramLineWidth, e), this.context.closePath(), $) {
          const A = Math.min(y, S) + Math.abs(y - S) / 2;
          s.set($.id, [A, c]);
        }
        c -= l;
      }
    if (!this.clusteredHorizontal) {
      this.context.fillStyle = this.settings.labelColor;
      const f = 24 * this.lastZoomStatus.k;
      this.context.font = `${f}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
      const v = this.context.measureText("Click to cluster").width;
      this.context.fillText(
        "Click to cluster",
        this.currentViewPort.xTop + a + this.columns.length * (n + this.settings.squarePadding) / 2 - v / 2,
        this.currentViewPort.yTop + a / 2 + f / 2
      );
    }
    this.context.restore();
  }
  initTooltip() {
    return yr("body").append("div").attr("class", "tip").style("position", "absolute").style("z-index", "10").style("visibility", "hidden");
  }
  findRowAndColForPosition(t, e) {
    const n = this.determineDendrogramWidth(), a = t - this.currentViewPort.xTop - n, i = e - this.currentViewPort.yTop - n, o = this.determineSquareWidth(), s = Math.floor(i / (o + this.settings.squarePadding)), u = Math.floor(a / (o + this.settings.squarePadding));
    return [s, u];
  }
  tooltipMove(t) {
    const e = t.target.getBoundingClientRect(), [n, a] = this.findRowAndColForPosition(t.clientX - e.left, t.clientY - e.top);
    if (n < 0 || n >= this.rows.length || a < 0 || a >= this.columns.length) {
      this.settings.enableTooltips && this.tooltip && this.tooltip.style("visibility", "hidden"), this.highlightedRow = -1, this.highlightedColumn = -1, this.settings.highlightSelection && this.redraw();
      return;
    }
    this.highlightedRow = n, this.highlightedColumn = a, this.settings.highlightSelection && this.redraw(), this.settings.enableTooltips && this.tooltip && this.tooltip.html(this.settings.getTooltip(this.values[n][a], this.rows[n], this.columns[a])).style("top", t.pageY + 10 + "px").style("left", t.pageX + 10 + "px").style("visibility", "visible");
  }
  /**
   * Determines if a click occurred on one of the dendrograms and if clustering should be applied to the heatmap.
   *
   * @param event
   * @private
   */
  click(t) {
    if (!this.settings.dendrogramEnabled)
      return;
    const e = this.determineDendrogramWidth(), n = this.determineSquareWidth(), a = t.target.getBoundingClientRect(), i = t.clientX - a.left, o = t.clientY - a.top;
    if (i >= this.currentViewPort.xTop && i <= this.currentViewPort.xTop + e && o >= this.currentViewPort.yTop + e && o <= this.currentViewPort.yTop + e + this.rows.length * (n + this.settings.squarePadding)) {
      this.cluster("rows");
      return;
    }
    if (i >= this.currentViewPort.xTop + e && i <= this.currentViewPort.xTop + e + this.columns.length * (n + this.settings.squarePadding) && o >= this.currentViewPort.yTop && o <= this.currentViewPort.yTop + e) {
      this.cluster("columns");
      return;
    }
  }
}
class L$r {
  getDistance(t) {
    let e = [];
    for (let n = 0; n < t.length; n++) {
      let a = [];
      for (let i = 0; i <= n; i++)
        a.push(this.getPearsonCorrelationBetween2Samples(t[n], t[i]));
      e.push(a);
    }
    return e;
  }
  getPearsonCorrelationBetween2Samples(t, e) {
    const n = (u, l) => u + l, a = t.reduce(n, 0) / t.length, i = e.reduce(n, 0) / e.length;
    let o = 0, s = 0;
    for (let u = 0; u < t.length; u++)
      o += (t[u] - a) * (e[u] - i), s += Math.sqrt(Math.pow(t[u] - a, 2)) * Math.sqrt(Math.pow(e[u] - i, 2));
    return 1 - o / s;
  }
}
class yi {
}
yi.DEFAULT_COLORS = [
  "#f9f0ab",
  "#e8e596",
  "#f0e2a3",
  "#ede487",
  "#efd580",
  "#f1cb82",
  "#f1c298",
  "#e8b598",
  "#d5dda1",
  "#c9d2b5",
  "#aec1ad",
  "#a7b8a8",
  "#b49a3d",
  "#b28647",
  "#a97d32",
  "#b68334",
  "#d6a680",
  "#dfad70",
  "#a2765d",
  "#9f6652",
  "#b9763f",
  "#bf6e5d",
  "#af643c",
  "#9b4c3f",
  "#72659d",
  "#8a6e9e",
  "#8f5c85",
  "#934b8b",
  "#9d4e87",
  "#92538c",
  "#8b6397",
  "#716084",
  "#2e6093",
  "#3a5988",
  "#4a5072",
  "#393e64",
  "#aaa1cc",
  "#e0b5c9",
  "#e098b0",
  "#ee82a2",
  "#ef91ac",
  "#eda994",
  "#eeb798",
  "#ecc099",
  "#f6d5aa",
  "#f0d48a",
  "#efd95f",
  "#eee469",
  "#dbdc7f",
  "#dfd961",
  "#ebe378",
  "#f5e351"
];
yi.FIXED_COLORS = [
  "#1f77b4",
  "#aec7e8",
  "#ff7f0e",
  "#ffbb78",
  "#2ca02c",
  "#98df8a",
  "#d62728",
  "#ff9896",
  "#9467bd",
  "#c5b0d5",
  "#8c564b",
  "#c49c94",
  "#e377c2",
  "#f7b6d2",
  "#7f7f7f",
  "#c7c7c7",
  "#bcbd22",
  "#dbdb8d",
  "#17becf",
  "#9edae5",
  "#393b79",
  "#5254a3",
  "#6b6ecf",
  "#9c9ede",
  "#637939",
  "#8ca252",
  "#b5cf6b",
  "#cedb9c",
  "#8c6d31",
  "#bd9e39",
  "#e7ba52",
  "#e7cb94",
  "#843c39",
  "#ad494a",
  "#d6616b",
  "#e7969c",
  "#7b4173",
  "#a55194",
  "#ce6dbd",
  "#de9ed6",
  "#3182bd",
  "#6baed6",
  "#9ecae1",
  "#c6dbef",
  "#e6550d",
  "#fd8d3c",
  "#fdae6b",
  "#fdd0a2",
  "#31a354",
  "#74c476",
  "#a1d99b",
  "#c7e9c0",
  "#756bb1",
  "#9e9ac8",
  "#bcbddc",
  "#dadaeb",
  "#636363",
  "#969696",
  "#bdbdbd",
  "#d9d9d9"
];
yi.MATERIAL_DESIGN_COLORS = [
  "#ef5350",
  "#ec407a",
  "#ab47bc",
  "#7e57c2",
  "#5c6bc0",
  "#42a5f5",
  "#29b6f6",
  "#26c6da",
  "#26a69a",
  "#66bb6a",
  "#9ccc65",
  "#d4e157",
  "#ffee58",
  "#ffca28",
  "#ffa726",
  "#ff7043",
  "#8d6e63"
];
class A$r {
  /**
   * Hash function for strings from http://stackoverflow.com/a/15710692/865696
   */
  static stringHash(t) {
    return t.split("").reduce(function(e, n) {
      let a = (e << 5) - e + n.charCodeAt(0);
      return a & a;
    }, 0);
  }
}
class Qw extends hu {
  constructor() {
    super(...arguments), this.radius = 300, this.breadcrumbWidth = 200, this.className = "sunburst", this.useFixedColors = !1, this.colorPalette = yi.DEFAULT_COLORS, this.fixedColorPalette = yi.FIXED_COLORS, this.enableBreadcrumbs = !0, this.levels = 4, this.animationDuration = 1e3, this.rerootCallback = () => {
    }, this.fixedColorHash = (t) => A$r.stringHash(t.name), this.getTooltip = (t) => `
            <style>
                .unipept-tooltip {
                    padding: 10px;
                    border-radius: 5px; 
                    background: rgba(0, 0, 0, 0.8); 
                    color: #fff;
                }
                
                .unipept-tooltip div, .unipept-tooltip a {
                    font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
                }
                
                .unipept-tooltip div {
                    font-weight: bold;
                }
            </style>
            <div class="unipept-tooltip">
                <div>
                    ${this.getTooltipTitle(t)}
                </div>
                <a>
                    ${this.getTooltipText(t)}
                </a>
            </div>
        `, this.getTooltipTitle = (t) => t.name, this.getTooltipText = (t) => `${t.count} hits`, this.getLabel = (t) => t.name === "empty" ? "" : t.name, this.getTitleText = this.getLabel;
  }
}
const wR = class SR {
  /**
   * Preprocesses the given Node data structure.
   *
   * @param data A node-like structure that should be converted to proper DataNode-objects and that should be prepared
   * for use in the Sunburst visualization.
   */
  preprocessData(t) {
    const e = [];
    if (t.children)
      for (const n of t.children)
        e.push(this.preprocessData(n));
    return e.length > 0 && t.count !== 0 && e.push(new ys(-1, "empty", [], t.count, t.selfCount)), new ys(
      t.id || ++SR.idCounter,
      t.name || "",
      e,
      t.count,
      t.selfCount,
      t.extra
    );
  }
};
wR.idCounter = 0;
let R$r = wR;
class Hg {
  static initTooltip() {
    return yr("body").append("div").attr("class", "tip").style("position", "absolute").style("z-index", "10").style("visibility", "hidden");
  }
}
class ai {
  /**
   * Checks if p is a parent of c. If the child is situated deeper in the hierarchy than maxLevels, false is returned.
   *
   * @param p Possible parent node.
   * @param c Possible child node.
   * @param maxLevels Maximum depth for the child node in the hierarchy.
   */
  static isParentOf(t, e, n) {
    return e.depth >= n ? !1 : t === e ? !0 : t.children ? t.children.some((a) => ai.isParentOf(a, e, n)) : !1;
  }
}
class $l {
  /*
   * Returns the readable text color based on the brightness of a given background color.
   */
  static getReadableColorFor(t) {
    let e = "#000";
    try {
      e = $l.brightness(Ss(t)) < 125 ? "#eee" : "#000";
    } catch {
    }
    return e;
  }
  /*
   * Returns the brightness of an rgb-color.
   * from: http:// www.w3.org/WAI/ER/WD-AERT/#color-contrast
   */
  static brightness({ r: t, g: e, b: n }) {
    return t * 0.299 + e * 0.587 + n * 0.114;
  }
}
class F$r {
  constructor(t, e, n = new Qw()) {
    this.element = t, this.colorCounter = -1, this.currentMaxLevel = 4, this.arcData = [], this.textData = [], this.previousRoot = null, this.previousMaxLevel = this.currentMaxLevel, this.settings = this.fillOptions(n);
    const i = new R$r().preprocessData(e);
    this.settings.enableTooltips && (this.tooltip = Hg.initTooltip()), this.currentMaxLevel = this.settings.levels, this.xScale = je().range([0, 2 * Math.PI]), this.yScale = je().domain([0, 1]).range([0, this.settings.radius]);
    const o = Un(i);
    o.sum((l) => l.children.length > 0 ? 0 : l.selfCount);
    const s = XP();
    this.data = s(o).descendants(), this.arc = Zf().startAngle((l) => Math.max(0, Math.min(Math.PI * 2, this.xScale(l.x0)))).endAngle((l) => Math.max(0, Math.min(Math.PI * 2, this.xScale(l.x1)))).innerRadius((l) => Math.max(0, l.y0 ? this.yScale(l.y0) : l.y0)).outerRadius((l) => Math.max(0, this.yScale(l.y1) + 1)), this.initCss(), this.element.innerHTML = "", this.breadCrumbs = yr(this.element).append("div").attr("id", Math.floor(Math.random() * 2 ** 16) + "-breadcrumbs").attr("class", "sunburst-breadcrumbs").append("ul");
    const u = yr(this.element).append("svg").attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`).attr("width", this.settings.width).attr("height", this.settings.height).attr("overflow", "hidden").style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");
    u.append("style").attr("type", "text/css").html(".hidden{ visibility: hidden;}"), this.visGElement = u.append("g").attr("transform", "translate(" + this.settings.radius + "," + this.settings.radius + ")"), this.reset();
  }
  /**
   * Reset the current view of the visualization. The visualization will completely be reset to it's initial state.
   */
  reset() {
    this.click(this.data[0]);
  }
  /**
   * Change the root of the visualization to the node with a given ID. Note that the reroot will only be executed if
   * a node with the given ID exists. If no node was found, nothing happens.
   *
   * @param nodeId ID of the node that should now become the new root of the tree.
   * @param triggerCallback Should the `rerootCallback` be triggered for this node?
   */
  reroot(t, e = !0) {
    const n = this.data.find((a) => a.data.id === t);
    n && this.click(n, e);
  }
  fillOptions(t = void 0) {
    const e = new Qw();
    return Object.assign(e, t);
  }
  maxY(t) {
    return t.children ? Math.max(...t.children.map((e) => this.maxY(e))) : t.y1;
  }
  /**
   * Calculates the color of an arc based on the color of his children.
   *
   * @param d The node for which we want the color.
   * @return string The calculated color in HTML color representation.
   */
  color(t) {
    if (t.name === "empty")
      return "white";
    if (this.settings.useFixedColors)
      return this.settings.fixedColorPalette[Math.abs(this.settings.fixedColorHash(t)) % this.settings.fixedColorPalette.length];
    if (t.children.length > 0) {
      const e = t.children.map((o) => this.color(o)), n = Ba(e[0]), a = Ba(e[1]);
      return t.children.length === 1 || t.children[1].name === "empty" ? Ba(n.h, n.s, n.l * 0.98) : Ba((n.h + a.h) / 2, (n.s + a.s) / 2, (n.l + a.l) / 2);
    }
    return t.extra.color || (t.extra.color = this.getColor()), t.extra.color;
  }
  /**
   * Color generation function that iterates over a fixed list of colors.
   *
   * @return string HTML-representation of the generated color
   */
  getColor() {
    return this.colorCounter = (this.colorCounter + 1) % this.settings.colorPalette.length, this.settings.colorPalette[this.colorCounter];
  }
  initCss() {
    let t = this.settings.className;
    this.element.className += " " + t;
    const e = this.element.ownerDocument.createElement("style");
    e.appendChild(this.element.ownerDocument.createTextNode(`
.${t} {
    font-family: Roboto,'Helvetica Neue',Helvetica,Arial,sans-serif;
    width: ${this.settings.width + this.settings.breadcrumbWidth}px;
}
.${t} .sunburst-breadcrumbs {
    width: 176px;
    float: right;
    margin-right: 15px;
    margin-top: 10px;
    padding-left: 5px;
}
.${t} .sunburst-breadcrumbs ul {
    padding-left: 0;
    list-style: none;
}
.${t} .sunburst-breadcrumbs .crumb {
    margin-bottom: 5px;
    cursor: pointer;
}
.${t} .sunburst-breadcrumbs .crumb svg {
    float: left;
    margin-right: 3px;
}
.${t} .sunburst-breadcrumbs .crumb p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0;
    font-size: 14px;
}
.${t} .sunburst-breadcrumbs .crumb .percentage {
    font-size: 11px;
}`)), this.element.ownerDocument.head.appendChild(e);
  }
  /**
   * Interpolate the scales! Defines new scales based on the clicked item.
   *
   * @param d The clicked item
   * @return new scales
   */
  arcTween(t, e) {
    let n = Math.min(this.maxY(t), t.y0 + e.settings.levels * (t.y1 - t.y0)), a = Rn(e.xScale.domain(), [t.x0, t.x1]), i = Rn(e.yScale.domain(), [t.y0, n]), o = Rn(e.yScale.range(), [t.y0 ? 20 : 0, e.settings.radius]);
    return (s) => (u) => (e.xScale.domain(a(u)), e.yScale.domain(i(u)).range(o(u)), e.arc(s));
  }
  tooltipIn(t, e) {
    this.settings.enableTooltips && this.tooltip && e.depth < this.currentMaxLevel && e.data.name !== "empty" && this.tooltip.html(this.settings.getTooltip(e.data)).style("top", t.pageY + 10 + "px").style("left", t.pageX + 10 + "px").style("visibility", "visible");
  }
  tooltipMove(t, e) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("top", t.pageY + 10 + "px").style("left", t.pageX + 10 + "px");
  }
  tooltipOut(t, e) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("visibility", "hidden");
  }
  /**
   * Compute the amount of vertical space that's available for text (i.e. the maximum text height) for a specific node
   * in the sunburst visualization.
   *
   * @param d The node in the sunburst visualization for which the vertical space should be computed.
   * @return The available vertical space in pixels.
   */
  computeAvailableSpace(t) {
    const e = 2 * Math.max(0, this.yScale(t.y1) + 1) * Math.PI, n = Math.max(
      0,
      Math.min(Math.PI * 2, this.xScale(t.x1)) - Math.max(0, Math.min(Math.PI * 2, this.xScale(t.x0)))
    );
    return e * (n / (2 * Math.PI));
  }
  /**
   * Defines what happens after a node is clicked.
   *
   * @param d The data object of the clicked arc
   * @param triggerCallback Should the rerootCallback function be triggered for this click?
   */
  click(t, e = !0) {
    t.data.name === "empty" || this.previousRoot && this.previousRoot.data.id === t.data.id || (this.previousRoot = t, this.settings.enableBreadcrumbs && this.setBreadcrumbs(t), this.settings.rerootCallback && e && this.settings.rerootCallback(t.data), this.currentMaxLevel = t.depth + this.settings.levels, this.renderArcs(t), this.renderText(t));
  }
  async renderArcs(t) {
    const e = this.data.filter((i) => ai.isParentOf(t, i, this.currentMaxLevel + 2));
    t.parent && e.push(t.parent);
    const n = e.filter((i) => !this.arcData.includes(i)), a = this.arcData.concat(...n);
    this.visGElement.selectAll("path").data([]).exit().remove(), this.path = this.visGElement.selectAll("path").data(a).enter().insert("path").attr("class", "arc").attr("id", (i, o) => "path-" + o).attr("d", this.arc).attr("fill-rule", "evenodd").style("fill", (i) => this.color(i.data)).attr("fill-opacity", (i) => i.depth >= this.previousMaxLevel ? 0.2 : 1).on("click", (i, o) => {
      o.depth < this.currentMaxLevel && this.click(o);
    }).on("mouseover", (i, o) => this.tooltipIn(i, o)).on("mousemove", (i, o) => this.tooltipMove(i, o)).on("mouseout", (i, o) => this.tooltipOut(i, o)), await new Promise((i) => {
      this.path.transition().duration(this.settings.animationDuration).attrTween("d", this.arcTween(t, this)).attr("class", (o) => o.depth >= this.currentMaxLevel ? "arc toHide" : "arc").attr("fill-opacity", (o) => o.depth >= this.currentMaxLevel ? 0.2 : 1).on("end", () => {
        i();
      });
    }), this.previousMaxLevel = this.currentMaxLevel, this.arcData = e;
  }
  async renderText(t) {
    const e = this.data.filter((u) => ai.isParentOf(t, u, this.currentMaxLevel)), n = e.filter((u) => !this.textData.includes(u)), a = this.textData.concat(...n);
    t.parent && a.splice(a.indexOf(t.parent), 1);
    const i = this, o = typeof OffscreenCanvas < "u";
    let s;
    o && (s = new OffscreenCanvas(1, 1).getContext("2d"), s.font = s.font = "16px 'Helvetica Neue', Helvetica, Arial, sans-serif"), this.visGElement.selectAll("text").data([]).exit().remove(), this.text = this.visGElement.selectAll("text").data(a).enter().append("text").style("fill", (u) => $l.getReadableColorFor(this.color(u.data))).style("fill-opacity", 0).style("font-family", "font-family: Helvetica, 'Super Sans', sans-serif").style("pointer-events", "none").attr("dy", ".2em").text((u) => this.settings.getLabel(u.data)).style("font-size", function(u) {
      const l = o ? s.measureText(this.textContent).width : this.getComputedTextLength();
      return Math.floor(Math.min(i.settings.radius / i.settings.levels / l * 10 + 1, 12)) + "px";
    }), await new Promise((u) => {
      this.text.transition().duration(this.settings.animationDuration).attrTween("text-anchor", (l) => (c) => this.xScale(l.x0 + (l.x1 - l.x0) / 2) > Math.PI ? "end" : "start").attrTween("dx", (l) => (c) => this.xScale(l.x0 + (l.x1 - l.x0) / 2) > Math.PI ? "-4px" : "4px").attrTween("transform", (l) => (c) => {
        let f = this.xScale(l.x0 + (l.x1 - l.x0) / 2) * 180 / Math.PI - 90;
        return `rotate(${f})translate(${this.yScale(l.y0)})rotate(${f > 90 ? -180 : 0})`;
      }).styleTween("fill-opacity", function(l) {
        const c = Number.parseInt(yr(this).style("font-size").replace("px", ""));
        return (f) => i.computeAvailableSpace(l) > c ? f.toString() : "0";
      }).on("end", function(l) {
        const c = i.computeAvailableSpace(l), f = yr(this);
        f.style(
          "visibility",
          c > Number.parseInt(f.style("font-size").replace("px", "")) && ai.isParentOf(t, l, i.currentMaxLevel) ? "visible" : "hidden"
        ), u();
      });
    }), this.textData = e;
  }
  setBreadcrumbs(t) {
    let e = [], n = t;
    for (; n; )
      e.push(n), n = n.parent;
    e.reverse().shift();
    const a = Zf().innerRadius(0).outerRadius(15).startAngle(0).endAngle((i) => 2 * Math.PI * i.data.count / i.parent.data.count);
    this.breadCrumbs.selectAll(".crumb").data(e).enter().append("li").on("click", (i, o) => {
      this.click(o.parent);
    }).attr("class", "crumb").style("opacity", "0").attr("title", (i) => this.settings.getTitleText(i.data)).html((i) => {
      var o;
      return `
<p class='name'>${i.data.name}</p>
<p class='percentage'>${Math.round(100 * i.data.count / i.parent.data.count)}% of ${(o = i.parent) == null ? void 0 : o.data.name}</p>`;
    }).insert("svg", ":first-child").attr("width", 30).attr("height", 30).append("path").attr("d", a).attr("transform", "translate(15, 15)").attr("fill", (i) => this.color(i.data)), this.breadCrumbs.selectAll(".crumb").transition().duration(this.settings.animationDuration).style("opacity", "1"), this.breadCrumbs.selectAll(".crumb").data(e).exit().transition().duration(this.settings.animationDuration).style("opacity", "0").remove();
  }
}
class rS extends hu {
  constructor() {
    super(...arguments), this.className = "treemap", this.levels = void 0, this.labelHeight = 10, this.colorRoot = "#104B7D", this.colorLeaf = "#fdffcc", this.colorBreadcrumbs = "#FF8F00", this.rerootCallback = () => {
    }, this.getBreadcrumbTooltip = (t) => t.name, this.getTooltip = (t) => `
            <style>
                .unipept-tooltip {
                    padding: 10px;
                    border-radius: 5px; 
                    background: rgba(0, 0, 0, 0.8); 
                    color: #fff;
                }
                
                .unipept-tooltip div, .unipept-tooltip a {
                    font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
                }
                
                .unipept-tooltip div {
                    font-weight: bold;
                }
            </style>
            <div class="unipept-tooltip">
                <div>
                    ${this.getTooltipTitle(t)}
                </div>
                <a>
                    ${this.getTooltipText(t)}
                </a>
            </div>
        `, this.getTooltipTitle = (t) => t.name, this.getTooltipText = (t) => `${t.count} hits`, this.getLabel = (t) => t.name, this.getLevel = (t) => t.depth;
  }
}
const ER = class TR {
  preprocessData(t) {
    const e = [];
    if (t.children)
      for (const n of t.children)
        e.push(this.preprocessData(n));
    return new ys(
      t.id || ++TR.idCounter,
      t.name || "",
      e,
      t.count,
      t.selfCount,
      t.extra
    );
  }
};
ER.idCounter = 0;
let _$r = ER;
class k$r {
  constructor(t, e, n = new rS()) {
    var o;
    this.element = t, this.childParentRelations = /* @__PURE__ */ new Map(), this.nodeId = 0, this.settings = this.fillOptions(n), this.settings.enableTooltips && (this.tooltip = Hg.initTooltip()), this.initCss();
    const a = new _$r(), i = Un(a.preprocessData(e));
    i.sum((s) => s.children.length > 0 ? 0 : s.count), i.sort((s, u) => u.value - s.value), this.partition = sM(), this.partition.size([this.settings.width + 1, this.settings.height + 1]).paddingTop(this.settings.labelHeight), this.data = this.partition(i).descendants(), this.settings.levels || (this.settings.levels = this.data[0].height);
    for (const s of this.data)
      this.childParentRelations.set(s.data, (o = s.parent) == null ? void 0 : o.data);
    this.currentRoot = this.data[0], this.colorScale = je().domain([0, this.settings.levels]).range([this.settings.colorRoot, this.settings.colorLeaf]).interpolate(Ih), this.breadCrumbs = yr(this.element).append("div").attr("class", "breadcrumbs").style("position", "relative").style("width", this.settings.width + "px").style("height", "20px").style("background-color", this.settings.colorBreadcrumbs), this.treemap = yr(this.element).append("div").style("position", "relative").style("width", this.settings.width + "px").style("height", this.settings.height + "px"), this.render(this.currentRoot);
  }
  resize(t, e) {
    this.settings.width = t, this.settings.height = e, this.partition.size([t + 1, e + 1]), this.breadCrumbs.style("width", this.settings.width + "px"), this.treemap.style("width", this.settings.width + "px"), this.treemap.style("height", this.settings.height + "px"), this.render(this.currentRoot, !1);
  }
  /**
   * Change the root of the visualization to the node with a given ID. Note that the reroot will only be executed if
   * a node with the given ID exists. If no node was found, nothing happens.
   *
   * @param nodeId ID of the node that should now become the new root of the tree.
   * @param triggerCallback Should the `rerootCallback` be triggered for this node?
   */
  reroot(t, e = !0) {
    const n = this.data.find((a) => a.data.id === t);
    n && this.render(n, e);
  }
  reset() {
    this.render(this.data[0], !1);
  }
  fillOptions(t = void 0) {
    const e = new rS();
    return Object.assign(e, t);
  }
  initCss() {
    let t = this.settings.className;
    this.element.className += " " + t;
    const e = this.element.ownerDocument.createElement("style");
    e.appendChild(this.element.ownerDocument.createTextNode(`
            .${t} {
                font-family: Arial,sans-serif;
            }
            .${t} .node {
                font-size: 9px;
                line-height: 10px;
                overflow: hidden;
                position: absolute;
                text-indent: 2px;
                text-align: center;
                text-overflow: ellipsis;
                cursor: pointer;
            }
            .${t} .node:hover {
                outline: 1px solid white;
            }
            .${t} .breadcrumbs {
                font-size: 11px;
                line-height: 20px;
                padding-left: 5px;
                font-weight: bold;
                color: white;
                box-sizing: border-box;
            }
            .full-screen .${t} .breadcrumbs {
                width: 100% !important;
            }
            .${t} .crumb {
                cursor: pointer;
            }
            .${t} .crumb .link:hover {
                text-decoration: underline;
            }
            .${t} .breadcrumbs .crumb + .crumb::before {
                content: " > ";
                cursor: default;
            }
        `)), this.element.ownerDocument.head.append(e);
  }
  render(t, e = !0) {
    this.currentRoot = t, this.setBreadcrumbs();
    const n = Un(t.data);
    n.sum((o) => o.children.length > 0 ? 0 : o.count), n.sort((o, s) => s.value - o.value);
    let a = this.treemap.selectAll(".node").data(
      this.partition(n).descendants(),
      (o) => o.data.id || (o.data.id = ++this.nodeId)
    );
    a.enter().append("div").attr("class", "node").style("background", (o) => this.colorScale(this.settings.getLevel(o))).style("color", (o) => $l.getReadableColorFor(this.colorScale(this.settings.getLevel(o)).toString())).style("left", "0px").style("top", "0px").style("width", "0px").style("height", "0px").text((o) => this.settings.getLabel(o.data)).on("click", (o, s) => this.render(s)).on("contextmenu", (o, s) => {
      o.preventDefault(), this.currentRoot.parent && this.render(this.currentRoot.parent);
    }).on("mouseover", (o, s) => this.tooltipIn(o, s)).on("mousemove", (o, s) => this.tooltipMove(o, s)).on("mouseout", (o, s) => this.tooltipOut(o, s)).merge(a).order().transition().call((o) => {
      o.style("left", (s) => s.x0 + "px"), o.style("top", (s) => s.y0 + "px"), o.style("width", (s) => Math.max(0, s.x1 - s.x0 - 1) + "px"), o.style("height", (s) => Math.max(0, s.y1 - s.y0 - 1) + "px");
    }), a.exit().remove(), e && this.settings.rerootCallback(this.currentRoot.data);
  }
  setBreadcrumbs() {
    let t = [], e = this.currentRoot.data;
    for (; e; )
      t.push(e), e = this.childParentRelations.get(e);
    t.reverse(), this.breadCrumbs.html(""), this.breadCrumbs.selectAll(".crumb").data(t).enter().append("span").attr("class", "crumb").attr("title", (n) => this.settings.getBreadcrumbTooltip(n)).html((n) => `<span class='link'>${n.name}</span>`).on("click", (n, a) => {
      this.render(this.data.filter((i) => i.data.id === a.id)[0]);
    });
  }
  tooltipIn(t, e) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.html(this.settings.getTooltip(e.data)).style("top", t.pageY + 10 + "px").style("left", t.pageX + 10 + "px").style("visibility", "visible");
  }
  tooltipMove(t, e) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("top", t.pageY + 10 + "px").style("left", t.pageX + 10 + "px");
  }
  tooltipOut(t, e) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("visibility", "hidden");
  }
}
const C$r = US(yM);
class tS extends hu {
  constructor() {
    super(...arguments), this.minNodeSize = 2, this.maxNodeSize = 105, this.enableExpandOnClick = !0, this.enableAutoExpand = !1, this.autoExpandValue = 0.8, this.levelsToExpand = 2, this.enableRightClick = !0, this.enableInnerArcs = !0, this.enableLabels = !0, this.nodeDistance = 180, this.animationDuration = 500, this.colorProviderLevels = 1, this.nodeFillColor = (t) => t.isSelected() ? t.children.length > 0 ? t.getColor() || "#aaa" : "#fff" : "#aaa", this.nodeStrokeColor = (t) => t.isSelected() && t.getColor() || "#aaa", this.linkStrokeColor = (t) => t.source.data.isSelected() ? t.target.data.getColor() : "#aaa", this.colorProvider = (t) => C$r(t.name), this.getLabel = (t) => t.name, this.getTooltip = (t) => `
            <style>
                .unipept-tooltip {
                    padding: 10px;
                    border-radius: 5px; 
                    background: rgba(0, 0, 0, 0.8); 
                    color: #fff;
                }
                
                .unipept-tooltip div, .unipept-tooltip a {
                    font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
                }
                
                .unipept-tooltip div {
                    font-weight: bold;
                }
            </style>
            <div class="unipept-tooltip">
                <div>
                    ${this.getTooltipTitle(t)}
                </div>
                <a>
                    ${this.getTooltipText(t)}
                </a>
            </div>
        `, this.getTooltipTitle = (t) => t.name, this.getTooltipText = (t) => `${t.count} hits`;
  }
}
class P$r {
  constructor(t = [], e) {
    this.data = t, this.comparator = e, this.heapify();
  }
  add(t) {
    this.data.push(t), this.bubbleUp(this.data.length - 1);
  }
  peek() {
    return this.data[0];
  }
  remove() {
    const t = this.data[0];
    return this.data.length > 1 ? (this.data[0] = this.data.pop(), this.sink(0)) : this.data.pop(), t;
  }
  clear() {
    this.data.splice(0, this.data.length);
  }
  size() {
    return this.data.length;
  }
  heapify() {
    for (let t = Math.floor((this.data.length - 2) / 2); t >= 0; t--)
      this.sink(t);
  }
  bubbleUp(t) {
    const e = this.data[t];
    for (; t > 0; ) {
      const n = Math.floor((t - 1) / 2), a = this.data[n];
      if (this.comparator(e, a) < 0)
        this.data[t] = a;
      else
        break;
      t = n;
    }
    return this.data[t] = e, t;
  }
  sink(t) {
    const e = this.data[t], n = this.data.length;
    for (; 2 * t + 1 < n; ) {
      let a = 2 * t + 1;
      if (a < n - 1 && this.comparator(this.data[a + 1], this.data[a]) < 0 && a++, this.comparator(e, this.data[a]) <= 0)
        break;
      this.data[t] = this.data[a], t = a;
    }
    return this.data[t] = e, t;
  }
}
class M$r extends ys {
  constructor() {
    super(...arguments), this.previousPosition = { x: 0, y: 0 }, this.selected = !1, this.collapsed = !1, this.color = "";
  }
  isCollapsed() {
    return this.collapsed;
  }
  setCollapsed(t) {
    this.collapsed = t;
  }
  isSelected() {
    return this.selected;
  }
  getColor() {
    return this.color;
  }
  /**
   * Mark this node and all of its children as (de)selected.
   *
   * @param value True if the node should be marked as selected, false otherwise.
   */
  setSelected(t) {
    this.selected = t;
    for (const e of this.children)
      e.setSelected(t);
  }
  /**
   * Recursively collapse all children of this node.
   */
  collapseAll() {
    for (const t of this.children)
      t.setCollapsed(!0), t.collapseAll();
  }
  /**
   * Collapse this node.
   */
  collapse() {
    for (const t of this.children)
      t.setCollapsed(!0);
  }
  /**
   * Expand this node and all of its children recursively.
   */
  expandAll() {
    this.expand(100);
  }
  /**
   * Expand this node and all children that are maximum i levels deeper than the current node.
   *
   * @param i Maximum amount of levels deeper at which nodes will be expanded.
   */
  expand(t) {
    if (t > 0 && this.children.length > 0)
      for (const e of this.children)
        e.setCollapsed(!1), e.expand(t - 1);
  }
  /**
   * Recursively sets the color of this node and all of it's children to the provided value.
   *
   * @param color HTML hex string that represents a valid color.
   */
  setColor(t) {
    this.color = t;
    for (const e of this.children)
      e.setColor(t);
  }
}
const xR = class IR {
  preprocessData(t) {
    const e = [];
    if (t.children)
      for (const n of t.children)
        e.push(this.preprocessData(n));
    return new M$r(
      t.id || ++IR.idCounter,
      t.name || "",
      e,
      t.count,
      t.selfCount,
      t.extra
    );
  }
};
xR.idCounter = 0;
let N$r = xR;
class B$r {
  constructor(t, e, n = new tS()) {
    this.element = t, this.nodeId = 0, this.zoomScale = 1, this.settings = this.fillOptions(n), this.settings.enableTooltips && (this.tooltip = Hg.initTooltip());
    const i = new N$r().preprocessData(e), o = Un(i);
    o.sum((s) => s.children.length > 0 ? 0 : s.count), this.widthScale = je().range([this.settings.minNodeSize, this.settings.maxNodeSize]), this.treeLayout = eM().nodeSize([2, 10]).separation((s, u) => {
      if (s.data.isCollapsed() || u.data.isCollapsed())
        return 0;
      const c = (this.computeNodeSize(s) + this.computeNodeSize(u)) / 2 + 4;
      return s.parent === u.parent ? c : c + 4;
    }), this.data = this.treeLayout(o).descendants(), this.root = this.data[0], this.element.innerHTML = "", this.svg = yr(this.element).append("svg").attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`).attr("width", this.settings.width).attr("height", this.settings.height).style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif"), this.zoomListener = GS().extent([[0, 0], [this.settings.width, this.settings.height]]).scaleExtent([0.1, 3]).on("zoom", (s) => {
      this.zoomScale = s.transform.k, this.visElement.attr("transform", s.transform.toString());
    }), this.visElement = this.svg.call(this.zoomListener).append("g"), this.render(this.root);
  }
  reset() {
    this.render(this.data[0]);
  }
  fillOptions(t = void 0) {
    const e = new tS();
    return Object.assign(e, t);
  }
  render(t) {
    var n;
    this.widthScale.domain([0, t.data.count]), this.root = t, this.root.x = this.settings.height / 2, this.root.y = 0, this.root.data.setSelected(!0);
    const e = (a, i) => {
      if (a.data.setColor(this.settings.colorProvider(a.data, i)), i < this.settings.colorProviderLevels && a.children)
        for (const o of a.children)
          e(o, i + 1);
    };
    (n = this.root.children) == null || n.forEach((a, i) => {
      e(a, 1);
    }), this.settings.enableExpandOnClick ? (this.root.data.collapseAll(), this.initialExpand(this.root)) : this.root.data.expandAll(), this.update(t), this.centerRoot(t);
  }
  centerRoot(t) {
    let [e, n] = [-t.y, -t.x];
    e = e * this.zoomScale + this.settings.width / 4, n = n * this.zoomScale + this.settings.height / 2, this.visElement.transition().duration(this.settings.animationDuration).attr("transform", `translate(${e},${n})scale(${this.zoomScale})`).on("end", () => this.zoomListener.transform(this.svg, Ph.translate(e, n).scale(this.zoomScale)));
  }
  initialExpand(t) {
    var a;
    if (!this.settings.enableAutoExpand) {
      t.data.expand(this.settings.levelsToExpand);
      return;
    }
    t.data.expand(1);
    let e = t.data.count * (this.settings.enableAutoExpand ? this.settings.autoExpandValue : 0.8);
    const n = new P$r([...t.children || []], (i, o) => o.data.count - i.data.count);
    for (; e > 0 && n.size() > 0; ) {
      const i = n.remove();
      e -= i.data.count, i.data.expand(1), (a = i.children) == null || a.forEach((o, s) => {
        n.add(o);
      });
    }
  }
  update(t) {
    const e = this.treeLayout(this.root), n = e.descendants().reverse().filter((h) => !h.data.isCollapsed()), a = e.links().filter((h) => !h.target.data.isCollapsed() && !h.source.data.isCollapsed());
    n.forEach((h) => h.y = h.depth * this.settings.nodeDistance);
    const i = this.visElement.selectAll("g.node").data(n, (h) => h.data.id || (h.data.id = ++this.nodeId));
    let o = i.enter().append("g").attr("class", "node").style("cursor", "pointer").attr("transform", `translate(${t.y || 0},${t.data.previousPosition.x || 0})`).on("click", (h, g) => this.click(h, g)).on("mouseover", (h, g) => this.tooltipIn(h, g)).on("mouseout", (h, g) => this.tooltipOut(h, g)).on("contextmenu", (h, g) => this.rightClick(h, g)).merge(i);
    o.append("circle").attr("r", 1e-6).style("stroke-width", "1.5px").style("stroke", (h) => this.settings.nodeStrokeColor(h.data)).style("fill", (h) => this.settings.nodeFillColor(h.data));
    const s = je().range([0, 2 * Math.PI]), u = Zf().innerRadius(0).outerRadius((h) => this.computeNodeSize(h)).startAngle(0).endAngle((h) => s(h.data.selfCount / h.data.count) || 0);
    this.settings.enableInnerArcs && o.append("path").attr("class", "innerArc").attr("d", u).style("fill", (h) => this.settings.nodeStrokeColor(h.data)).style("fill-opacity", 0), this.settings.enableLabels && o.append("text").attr("x", (h) => h.children ? -10 : 10).attr("dy", ".35em").attr("text-anchor", (h) => h.children ? "end" : "start").text((h) => this.settings.getLabel(h.data)).style("font", "10px sans-serif").style("fill-opacity", 1e-6);
    const l = o.transition().duration(this.settings.animationDuration).attr("transform", (h) => `translate(${h.y}, ${h.x})`);
    l.select("circle").attr("r", (h) => this.computeNodeSize(h)).style("fill-opacity", (h) => h.children && h.children[0].data.isCollapsed() ? 1 : 0).style("stroke", (h) => this.settings.nodeStrokeColor(h.data)).style("fill", (h) => this.settings.nodeFillColor(h.data)), this.settings.enableInnerArcs && l.select(".innerArc").style("fill-opacity", 1), this.settings.enableLabels && l.select("text").style("fill-opacity", 1);
    const c = i.exit().transition().duration(this.settings.animationDuration).attr("transform", (h) => `translate(${t.y},${t.x})`).remove();
    c.select("circle").attr("r", 1e-6), c.select("path").style("fill-opacity", 1e-6), c.select("text").style("fill-opacity", 1e-6);
    let f = this.visElement.selectAll("path.link").data(a, (h) => h.target.data.id);
    const v = LM().x((h) => h.y).y((h) => h.x);
    f.enter().insert("path", "g").attr("class", "link").style("fill", "none").style("stroke-opacity", "0.5").style("stroke-linecap", "round").style("stroke", (h) => this.settings.linkStrokeColor(h)).style("stroke-width", 1e-6).attr("d", (h) => {
      const g = {
        x: t.data.previousPosition.x,
        y: t.data.previousPosition.y
      };
      return v({
        source: g,
        target: g
      });
    }).merge(f).transition().duration(this.settings.animationDuration).attr("d", v).style("stroke", this.settings.linkStrokeColor).style("stroke-width", (h) => h.source.data.isSelected() ? this.widthScale(h.target.data.count) + "px" : "4px"), f.exit().transition().duration(this.settings.animationDuration).style("stroke-width", 1e-6).attr("d", (h) => {
      const g = {
        x: t.x,
        y: t.y
      };
      return v({
        source: g,
        target: g
      });
    }).remove(), n.forEach((h) => {
      h.data.previousPosition = {
        x: h.x,
        y: h.y
      };
    });
  }
  computeNodeSize(t) {
    return t.data.isSelected() ? this.widthScale(t.data.count) / 2 : 2;
  }
  click(t, e) {
    this.settings.enableExpandOnClick && (t.defaultPrevented || (t.shiftKey ? e.data.expandAll() : e.children && e.children.some((n) => !n.data.isCollapsed()) ? e.data.collapseAll() : e.data.expand(this.settings.levelsToExpand), this.update(e), this.centerRoot(e)));
  }
  tooltipIn(t, e) {
    this.settings.enableTooltips && this.tooltip && (this.tooltip.html(this.settings.getTooltip(e.data)).style("top", t.pageY + 10 + "px").style("left", t.pageX + 10 + "px"), this.tooltipTimer = window.setTimeout(() => this.tooltip.style("visibility", "visible"), 1e3));
  }
  tooltipOut(t, e) {
    this.settings.enableTooltips && this.tooltip && (clearTimeout(this.tooltipTimer), this.tooltip.style("visibility", "hidden"));
  }
  rightClick(t, e) {
    this.settings.enableRightClick && this.render(e);
  }
}
export {
  yi as ColorPalette,
  $l as ColorUtils,
  ys as DataNode,
  GM as EuclidianDistanceMetric,
  D$r as Heatmap,
  mp as HeatmapSettings,
  WM as MoloReorderer,
  L$r as PearsonCorrelationMetric,
  A$r as StringUtils,
  F$r as Sunburst,
  Qw as SunburstSettings,
  Qf as Transition,
  es as TreeNode,
  k$r as Treemap,
  rS as TreemapSettings,
  B$r as Treeview,
  tS as TreeviewSettings,
  HM as UPGMAClusterer
};
//# sourceMappingURL=unipept-visualizations.js.map
