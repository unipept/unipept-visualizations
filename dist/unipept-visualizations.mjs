class ds {
  constructor(t, e, n = [], a, i, o = {}) {
    this.id = t, this.name = e, this.children = n, this.count = a, this.selfCount = i, this.extra = o;
  }
}
function Jw(r, t) {
  return r < t ? -1 : r > t ? 1 : r >= t ? 0 : NaN;
}
function Zw(r) {
  let t = r, e = r;
  r.length === 1 && (t = (o, s) => r(o) - s, e = ER(r));
  function n(o, s, u, l) {
    for (u == null && (u = 0), l == null && (l = o.length); u < l; ) {
      const c = u + l >>> 1;
      e(o[c], s) < 0 ? u = c + 1 : l = c;
    }
    return u;
  }
  function a(o, s, u, l) {
    for (u == null && (u = 0), l == null && (l = o.length); u < l; ) {
      const c = u + l >>> 1;
      e(o[c], s) > 0 ? l = c : u = c + 1;
    }
    return u;
  }
  function i(o, s, u, l) {
    u == null && (u = 0), l == null && (l = o.length);
    const c = n(o, s, u, l - 1);
    return c > u && t(o[c - 1], s) > -t(o[c], s) ? c - 1 : c;
  }
  return { left: n, center: i, right: a };
}
function ER(r) {
  return (t, e) => Jw(r(t), e);
}
function TR(r) {
  return r === null ? NaN : +r;
}
const xR = Zw(Jw), IR = xR.right;
Zw(TR).center;
const Qw = IR;
var Df = Math.sqrt(50), Lf = Math.sqrt(10), Ff = Math.sqrt(2);
function OR(r, t, e) {
  var n, a = -1, i, o, s;
  if (t = +t, r = +r, e = +e, r === t && e > 0)
    return [r];
  if ((n = t < r) && (i = r, r = t, t = i), (s = rS(r, t, e)) === 0 || !isFinite(s))
    return [];
  if (s > 0) {
    let u = Math.round(r / s), l = Math.round(t / s);
    for (u * s < r && ++u, l * s > t && --l, o = new Array(i = l - u + 1); ++a < i; )
      o[a] = (u + a) * s;
  } else {
    s = -s;
    let u = Math.round(r * s), l = Math.round(t * s);
    for (u / s < r && ++u, l / s > t && --l, o = new Array(i = l - u + 1); ++a < i; )
      o[a] = (u + a) / s;
  }
  return n && o.reverse(), o;
}
function rS(r, t, e) {
  var n = (t - r) / Math.max(0, e), a = Math.floor(Math.log(n) / Math.LN10), i = n / Math.pow(10, a);
  return a >= 0 ? (i >= Df ? 10 : i >= Lf ? 5 : i >= Ff ? 2 : 1) * Math.pow(10, a) : -Math.pow(10, -a) / (i >= Df ? 10 : i >= Lf ? 5 : i >= Ff ? 2 : 1);
}
function AR(r, t, e) {
  var n = Math.abs(t - r) / Math.max(0, e), a = Math.pow(10, Math.floor(Math.log(n) / Math.LN10)), i = n / a;
  return i >= Df ? a *= 10 : i >= Lf ? a *= 5 : i >= Ff && (a *= 2), t < r ? -a : a;
}
var RR = { value: () => {
} };
function mh() {
  for (var r = 0, t = arguments.length, e = {}, n; r < t; ++r) {
    if (!(n = arguments[r] + "") || n in e || /[\s.]/.test(n))
      throw new Error("illegal type: " + n);
    e[n] = [];
  }
  return new qo(e);
}
function qo(r) {
  this._ = r;
}
function _R(r, t) {
  return r.trim().split(/^|\s+/).map(function(e) {
    var n = "", a = e.indexOf(".");
    if (a >= 0 && (n = e.slice(a + 1), e = e.slice(0, a)), e && !t.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    return { type: e, name: n };
  });
}
qo.prototype = mh.prototype = {
  constructor: qo,
  on: function(r, t) {
    var e = this._, n = _R(r + "", e), a, i = -1, o = n.length;
    if (arguments.length < 2) {
      for (; ++i < o; )
        if ((a = (r = n[i]).type) && (a = CR(e[a], r.name)))
          return a;
      return;
    }
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++i < o; )
      if (a = (r = n[i]).type)
        e[a] = Vg(e[a], r.name, t);
      else if (t == null)
        for (a in e)
          e[a] = Vg(e[a], r.name, null);
    return this;
  },
  copy: function() {
    var r = {}, t = this._;
    for (var e in t)
      r[e] = t[e].slice();
    return new qo(r);
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
function CR(r, t) {
  for (var e = 0, n = r.length, a; e < n; ++e)
    if ((a = r[e]).name === t)
      return a.value;
}
function Vg(r, t, e) {
  for (var n = 0, a = r.length; n < a; ++n)
    if (r[n].name === t) {
      r[n] = RR, r = r.slice(0, n).concat(r.slice(n + 1));
      break;
    }
  return e != null && r.push({ name: t, value: e }), r;
}
var kf = "http://www.w3.org/1999/xhtml";
const Gg = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: kf,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function nu(r) {
  var t = r += "", e = t.indexOf(":");
  return e >= 0 && (t = r.slice(0, e)) !== "xmlns" && (r = r.slice(e + 1)), Gg.hasOwnProperty(t) ? { space: Gg[t], local: r } : r;
}
function PR(r) {
  return function() {
    var t = this.ownerDocument, e = this.namespaceURI;
    return e === kf && t.documentElement.namespaceURI === kf ? t.createElement(r) : t.createElementNS(e, r);
  };
}
function MR(r) {
  return function() {
    return this.ownerDocument.createElementNS(r.space, r.local);
  };
}
function tS(r) {
  var t = nu(r);
  return (t.local ? MR : PR)(t);
}
function NR() {
}
function bh(r) {
  return r == null ? NR : function() {
    return this.querySelector(r);
  };
}
function DR(r) {
  typeof r != "function" && (r = bh(r));
  for (var t = this._groups, e = t.length, n = new Array(e), a = 0; a < e; ++a)
    for (var i = t[a], o = i.length, s = n[a] = new Array(o), u, l, c = 0; c < o; ++c)
      (u = i[c]) && (l = r.call(u, u.__data__, c, i)) && ("__data__" in u && (l.__data__ = u.__data__), s[c] = l);
  return new Mr(n, this._parents);
}
function eS(r) {
  return typeof r == "object" && "length" in r ? r : Array.from(r);
}
function LR() {
  return [];
}
function nS(r) {
  return r == null ? LR : function() {
    return this.querySelectorAll(r);
  };
}
function FR(r) {
  return function() {
    var t = r.apply(this, arguments);
    return t == null ? [] : eS(t);
  };
}
function kR(r) {
  typeof r == "function" ? r = FR(r) : r = nS(r);
  for (var t = this._groups, e = t.length, n = [], a = [], i = 0; i < e; ++i)
    for (var o = t[i], s = o.length, u, l = 0; l < s; ++l)
      (u = o[l]) && (n.push(r.call(u, u.__data__, l, o)), a.push(u));
  return new Mr(n, a);
}
function aS(r) {
  return function() {
    return this.matches(r);
  };
}
function iS(r) {
  return function(t) {
    return t.matches(r);
  };
}
var BR = Array.prototype.find;
function jR(r) {
  return function() {
    return BR.call(this.children, r);
  };
}
function UR() {
  return this.firstElementChild;
}
function zR(r) {
  return this.select(r == null ? UR : jR(typeof r == "function" ? r : iS(r)));
}
var VR = Array.prototype.filter;
function GR() {
  return this.children;
}
function HR(r) {
  return function() {
    return VR.call(this.children, r);
  };
}
function WR(r) {
  return this.selectAll(r == null ? GR : HR(typeof r == "function" ? r : iS(r)));
}
function qR(r) {
  typeof r != "function" && (r = aS(r));
  for (var t = this._groups, e = t.length, n = new Array(e), a = 0; a < e; ++a)
    for (var i = t[a], o = i.length, s = n[a] = [], u, l = 0; l < o; ++l)
      (u = i[l]) && r.call(u, u.__data__, l, i) && s.push(u);
  return new Mr(n, this._parents);
}
function oS(r) {
  return new Array(r.length);
}
function YR() {
  return new Mr(this._enter || this._groups.map(oS), this._parents);
}
function gs(r, t) {
  this.ownerDocument = r.ownerDocument, this.namespaceURI = r.namespaceURI, this._next = null, this._parent = r, this.__data__ = t;
}
gs.prototype = {
  constructor: gs,
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
function KR(r) {
  return function() {
    return r;
  };
}
function XR(r, t, e, n, a, i) {
  for (var o = 0, s, u = t.length, l = i.length; o < l; ++o)
    (s = t[o]) ? (s.__data__ = i[o], n[o] = s) : e[o] = new gs(r, i[o]);
  for (; o < u; ++o)
    (s = t[o]) && (a[o] = s);
}
function JR(r, t, e, n, a, i, o) {
  var s, u, l = /* @__PURE__ */ new Map(), c = t.length, f = i.length, v = new Array(c), h;
  for (s = 0; s < c; ++s)
    (u = t[s]) && (v[s] = h = o.call(u, u.__data__, s, t) + "", l.has(h) ? a[s] = u : l.set(h, u));
  for (s = 0; s < f; ++s)
    h = o.call(r, i[s], s, i) + "", (u = l.get(h)) ? (n[s] = u, u.__data__ = i[s], l.delete(h)) : e[s] = new gs(r, i[s]);
  for (s = 0; s < c; ++s)
    (u = t[s]) && l.get(v[s]) === u && (a[s] = u);
}
function ZR(r) {
  return r.__data__;
}
function QR(r, t) {
  if (!arguments.length)
    return Array.from(this, ZR);
  var e = t ? JR : XR, n = this._parents, a = this._groups;
  typeof r != "function" && (r = KR(r));
  for (var i = a.length, o = new Array(i), s = new Array(i), u = new Array(i), l = 0; l < i; ++l) {
    var c = n[l], f = a[l], v = f.length, h = eS(r.call(c, c && c.__data__, l, n)), g = h.length, $ = s[l] = new Array(g), p = o[l] = new Array(g), y = u[l] = new Array(v);
    e(c, f, $, p, y, h, t);
    for (var S = 0, x = 0, A, N; S < g; ++S)
      if (A = $[S]) {
        for (S >= x && (x = S + 1); !(N = p[x]) && ++x < g; )
          ;
        A._next = N || null;
      }
  }
  return o = new Mr(o, n), o._enter = s, o._exit = u, o;
}
function r_() {
  return new Mr(this._exit || this._groups.map(oS), this._parents);
}
function t_(r, t, e) {
  var n = this.enter(), a = this, i = this.exit();
  return n = typeof r == "function" ? r(n) : n.append(r + ""), t != null && (a = t(a)), e == null ? i.remove() : e(i), n && a ? n.merge(a).order() : a;
}
function e_(r) {
  if (!(r instanceof Mr))
    throw new Error("invalid merge");
  for (var t = this._groups, e = r._groups, n = t.length, a = e.length, i = Math.min(n, a), o = new Array(n), s = 0; s < i; ++s)
    for (var u = t[s], l = e[s], c = u.length, f = o[s] = new Array(c), v, h = 0; h < c; ++h)
      (v = u[h] || l[h]) && (f[h] = v);
  for (; s < n; ++s)
    o[s] = t[s];
  return new Mr(o, this._parents);
}
function n_() {
  for (var r = this._groups, t = -1, e = r.length; ++t < e; )
    for (var n = r[t], a = n.length - 1, i = n[a], o; --a >= 0; )
      (o = n[a]) && (i && o.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(o, i), i = o);
  return this;
}
function a_(r) {
  r || (r = i_);
  function t(f, v) {
    return f && v ? r(f.__data__, v.__data__) : !f - !v;
  }
  for (var e = this._groups, n = e.length, a = new Array(n), i = 0; i < n; ++i) {
    for (var o = e[i], s = o.length, u = a[i] = new Array(s), l, c = 0; c < s; ++c)
      (l = o[c]) && (u[c] = l);
    u.sort(t);
  }
  return new Mr(a, this._parents).order();
}
function i_(r, t) {
  return r < t ? -1 : r > t ? 1 : r >= t ? 0 : NaN;
}
function o_() {
  var r = arguments[0];
  return arguments[0] = this, r.apply(null, arguments), this;
}
function s_() {
  return Array.from(this);
}
function u_() {
  for (var r = this._groups, t = 0, e = r.length; t < e; ++t)
    for (var n = r[t], a = 0, i = n.length; a < i; ++a) {
      var o = n[a];
      if (o)
        return o;
    }
  return null;
}
function l_() {
  let r = 0;
  for (const t of this)
    ++r;
  return r;
}
function c_() {
  return !this.node();
}
function f_(r) {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var a = t[e], i = 0, o = a.length, s; i < o; ++i)
      (s = a[i]) && r.call(s, s.__data__, i, a);
  return this;
}
function v_(r) {
  return function() {
    this.removeAttribute(r);
  };
}
function h_(r) {
  return function() {
    this.removeAttributeNS(r.space, r.local);
  };
}
function d_(r, t) {
  return function() {
    this.setAttribute(r, t);
  };
}
function g_(r, t) {
  return function() {
    this.setAttributeNS(r.space, r.local, t);
  };
}
function p_(r, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? this.removeAttribute(r) : this.setAttribute(r, e);
  };
}
function $_(r, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? this.removeAttributeNS(r.space, r.local) : this.setAttributeNS(r.space, r.local, e);
  };
}
function y_(r, t) {
  var e = nu(r);
  if (arguments.length < 2) {
    var n = this.node();
    return e.local ? n.getAttributeNS(e.space, e.local) : n.getAttribute(e);
  }
  return this.each((t == null ? e.local ? h_ : v_ : typeof t == "function" ? e.local ? $_ : p_ : e.local ? g_ : d_)(e, t));
}
function sS(r) {
  return r.ownerDocument && r.ownerDocument.defaultView || r.document && r || r.defaultView;
}
function m_(r) {
  return function() {
    this.style.removeProperty(r);
  };
}
function b_(r, t, e) {
  return function() {
    this.style.setProperty(r, t, e);
  };
}
function w_(r, t, e) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(r) : this.style.setProperty(r, n, e);
  };
}
function S_(r, t, e) {
  return arguments.length > 1 ? this.each((t == null ? m_ : typeof t == "function" ? w_ : b_)(r, t, e ?? "")) : Ln(this.node(), r);
}
function Ln(r, t) {
  return r.style.getPropertyValue(t) || sS(r).getComputedStyle(r, null).getPropertyValue(t);
}
function E_(r) {
  return function() {
    delete this[r];
  };
}
function T_(r, t) {
  return function() {
    this[r] = t;
  };
}
function x_(r, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? delete this[r] : this[r] = e;
  };
}
function I_(r, t) {
  return arguments.length > 1 ? this.each((t == null ? E_ : typeof t == "function" ? x_ : T_)(r, t)) : this.node()[r];
}
function uS(r) {
  return r.trim().split(/^|\s+/);
}
function wh(r) {
  return r.classList || new lS(r);
}
function lS(r) {
  this._node = r, this._names = uS(r.getAttribute("class") || "");
}
lS.prototype = {
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
function cS(r, t) {
  for (var e = wh(r), n = -1, a = t.length; ++n < a; )
    e.add(t[n]);
}
function fS(r, t) {
  for (var e = wh(r), n = -1, a = t.length; ++n < a; )
    e.remove(t[n]);
}
function O_(r) {
  return function() {
    cS(this, r);
  };
}
function A_(r) {
  return function() {
    fS(this, r);
  };
}
function R_(r, t) {
  return function() {
    (t.apply(this, arguments) ? cS : fS)(this, r);
  };
}
function __(r, t) {
  var e = uS(r + "");
  if (arguments.length < 2) {
    for (var n = wh(this.node()), a = -1, i = e.length; ++a < i; )
      if (!n.contains(e[a]))
        return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? R_ : t ? O_ : A_)(e, t));
}
function C_() {
  this.textContent = "";
}
function P_(r) {
  return function() {
    this.textContent = r;
  };
}
function M_(r) {
  return function() {
    var t = r.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function N_(r) {
  return arguments.length ? this.each(r == null ? C_ : (typeof r == "function" ? M_ : P_)(r)) : this.node().textContent;
}
function D_() {
  this.innerHTML = "";
}
function L_(r) {
  return function() {
    this.innerHTML = r;
  };
}
function F_(r) {
  return function() {
    var t = r.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function k_(r) {
  return arguments.length ? this.each(r == null ? D_ : (typeof r == "function" ? F_ : L_)(r)) : this.node().innerHTML;
}
function B_() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function j_() {
  return this.each(B_);
}
function U_() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function z_() {
  return this.each(U_);
}
function V_(r) {
  var t = typeof r == "function" ? r : tS(r);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function G_() {
  return null;
}
function H_(r, t) {
  var e = typeof r == "function" ? r : tS(r), n = t == null ? G_ : typeof t == "function" ? t : bh(t);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function W_() {
  var r = this.parentNode;
  r && r.removeChild(this);
}
function q_() {
  return this.each(W_);
}
function Y_() {
  var r = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(r, this.nextSibling) : r;
}
function K_() {
  var r = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(r, this.nextSibling) : r;
}
function X_(r) {
  return this.select(r ? K_ : Y_);
}
function J_(r) {
  return arguments.length ? this.property("__data__", r) : this.node().__data__;
}
function Z_(r) {
  return function(t) {
    r.call(this, t, this.__data__);
  };
}
function Q_(r) {
  return r.trim().split(/^|\s+/).map(function(t) {
    var e = "", n = t.indexOf(".");
    return n >= 0 && (e = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: e };
  });
}
function rC(r) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var e = 0, n = -1, a = t.length, i; e < a; ++e)
        i = t[e], (!r.type || i.type === r.type) && i.name === r.name ? this.removeEventListener(i.type, i.listener, i.options) : t[++n] = i;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function tC(r, t, e) {
  return function() {
    var n = this.__on, a, i = Z_(t);
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
function eC(r, t, e) {
  var n = Q_(r + ""), a, i = n.length, o;
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
  for (s = t ? tC : rC, a = 0; a < i; ++a)
    this.each(s(n[a], t, e));
  return this;
}
function vS(r, t, e) {
  var n = sS(r), a = n.CustomEvent;
  typeof a == "function" ? a = new a(t, e) : (a = n.document.createEvent("Event"), e ? (a.initEvent(t, e.bubbles, e.cancelable), a.detail = e.detail) : a.initEvent(t, !1, !1)), r.dispatchEvent(a);
}
function nC(r, t) {
  return function() {
    return vS(this, r, t);
  };
}
function aC(r, t) {
  return function() {
    return vS(this, r, t.apply(this, arguments));
  };
}
function iC(r, t) {
  return this.each((typeof t == "function" ? aC : nC)(r, t));
}
function* oC() {
  for (var r = this._groups, t = 0, e = r.length; t < e; ++t)
    for (var n = r[t], a = 0, i = n.length, o; a < i; ++a)
      (o = n[a]) && (yield o);
}
var hS = [null];
function Mr(r, t) {
  this._groups = r, this._parents = t;
}
function $i() {
  return new Mr([[document.documentElement]], hS);
}
function sC() {
  return this;
}
Mr.prototype = $i.prototype = {
  constructor: Mr,
  select: DR,
  selectAll: kR,
  selectChild: zR,
  selectChildren: WR,
  filter: qR,
  data: QR,
  enter: YR,
  exit: r_,
  join: t_,
  merge: e_,
  selection: sC,
  order: n_,
  sort: a_,
  call: o_,
  nodes: s_,
  node: u_,
  size: l_,
  empty: c_,
  each: f_,
  attr: y_,
  style: S_,
  property: I_,
  classed: __,
  text: N_,
  html: k_,
  raise: j_,
  lower: z_,
  append: V_,
  insert: H_,
  remove: q_,
  clone: X_,
  datum: J_,
  on: eC,
  dispatch: iC,
  [Symbol.iterator]: oC
};
function yr(r) {
  return typeof r == "string" ? new Mr([[document.querySelector(r)]], [document.documentElement]) : new Mr([[r]], hS);
}
function uC(r) {
  let t;
  for (; t = r.sourceEvent; )
    r = t;
  return r;
}
function me(r, t) {
  if (r = uC(r), t === void 0 && (t = r.currentTarget), t) {
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
function Bf(r) {
  r.preventDefault(), r.stopImmediatePropagation();
}
function lC(r) {
  var t = r.document.documentElement, e = yr(r).on("dragstart.drag", Bf, !0);
  "onselectstart" in t ? e.on("selectstart.drag", Bf, !0) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function cC(r, t) {
  var e = r.document.documentElement, n = yr(r).on("dragstart.drag", null);
  t && (n.on("click.drag", Bf, !0), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in e ? n.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect);
}
function yi(r, t, e) {
  r.prototype = t.prototype = e, e.constructor = r;
}
function au(r, t) {
  var e = Object.create(r.prototype);
  for (var n in t)
    e[n] = t[n];
  return e;
}
function ze() {
}
var ni = 0.7, ps = 1 / ni, xn = "\\s*([+-]?\\d+)\\s*", ai = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", xt = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", fC = /^#([0-9a-f]{3,8})$/, vC = new RegExp("^rgb\\(" + [xn, xn, xn] + "\\)$"), hC = new RegExp("^rgb\\(" + [xt, xt, xt] + "\\)$"), dC = new RegExp("^rgba\\(" + [xn, xn, xn, ai] + "\\)$"), gC = new RegExp("^rgba\\(" + [xt, xt, xt, ai] + "\\)$"), pC = new RegExp("^hsl\\(" + [ai, xt, xt] + "\\)$"), $C = new RegExp("^hsla\\(" + [ai, xt, xt, ai] + "\\)$"), Hg = {
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
yi(ze, De, {
  copy: function(r) {
    return Object.assign(new this.constructor(), this, r);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: Wg,
  // Deprecated! Use color.formatHex.
  formatHex: Wg,
  formatHsl: yC,
  formatRgb: qg,
  toString: qg
});
function Wg() {
  return this.rgb().formatHex();
}
function yC() {
  return gS(this).formatHsl();
}
function qg() {
  return this.rgb().formatRgb();
}
function De(r) {
  var t, e;
  return r = (r + "").trim().toLowerCase(), (t = fC.exec(r)) ? (e = t[1].length, t = parseInt(t[1], 16), e === 6 ? Yg(t) : e === 3 ? new Or(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : e === 8 ? Xi(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : e === 4 ? Xi(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = vC.exec(r)) ? new Or(t[1], t[2], t[3], 1) : (t = hC.exec(r)) ? new Or(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = dC.exec(r)) ? Xi(t[1], t[2], t[3], t[4]) : (t = gC.exec(r)) ? Xi(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = pC.exec(r)) ? Jg(t[1], t[2] / 100, t[3] / 100, 1) : (t = $C.exec(r)) ? Jg(t[1], t[2] / 100, t[3] / 100, t[4]) : Hg.hasOwnProperty(r) ? Yg(Hg[r]) : r === "transparent" ? new Or(NaN, NaN, NaN, 0) : null;
}
function Yg(r) {
  return new Or(r >> 16 & 255, r >> 8 & 255, r & 255, 1);
}
function Xi(r, t, e, n) {
  return n <= 0 && (r = t = e = NaN), new Or(r, t, e, n);
}
function dS(r) {
  return r instanceof ze || (r = De(r)), r ? (r = r.rgb(), new Or(r.r, r.g, r.b, r.opacity)) : new Or();
}
function $s(r, t, e, n) {
  return arguments.length === 1 ? dS(r) : new Or(r, t, e, n ?? 1);
}
function Or(r, t, e, n) {
  this.r = +r, this.g = +t, this.b = +e, this.opacity = +n;
}
yi(Or, $s, au(ze, {
  brighter: function(r) {
    return r = r == null ? ps : Math.pow(ps, r), new Or(this.r * r, this.g * r, this.b * r, this.opacity);
  },
  darker: function(r) {
    return r = r == null ? ni : Math.pow(ni, r), new Or(this.r * r, this.g * r, this.b * r, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Kg,
  // Deprecated! Use color.formatHex.
  formatHex: Kg,
  formatRgb: Xg,
  toString: Xg
}));
function Kg() {
  return "#" + vl(this.r) + vl(this.g) + vl(this.b);
}
function Xg() {
  var r = this.opacity;
  return r = isNaN(r) ? 1 : Math.max(0, Math.min(1, r)), (r === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (r === 1 ? ")" : ", " + r + ")");
}
function vl(r) {
  return r = Math.max(0, Math.min(255, Math.round(r) || 0)), (r < 16 ? "0" : "") + r.toString(16);
}
function Jg(r, t, e, n) {
  return n <= 0 ? r = t = e = NaN : e <= 0 || e >= 1 ? r = t = NaN : t <= 0 && (r = NaN), new St(r, t, e, n);
}
function gS(r) {
  if (r instanceof St)
    return new St(r.h, r.s, r.l, r.opacity);
  if (r instanceof ze || (r = De(r)), !r)
    return new St();
  if (r instanceof St)
    return r;
  r = r.rgb();
  var t = r.r / 255, e = r.g / 255, n = r.b / 255, a = Math.min(t, e, n), i = Math.max(t, e, n), o = NaN, s = i - a, u = (i + a) / 2;
  return s ? (t === i ? o = (e - n) / s + (e < n) * 6 : e === i ? o = (n - t) / s + 2 : o = (t - e) / s + 4, s /= u < 0.5 ? i + a : 2 - i - a, o *= 60) : s = u > 0 && u < 1 ? 0 : o, new St(o, s, u, r.opacity);
}
function Fa(r, t, e, n) {
  return arguments.length === 1 ? gS(r) : new St(r, t, e, n ?? 1);
}
function St(r, t, e, n) {
  this.h = +r, this.s = +t, this.l = +e, this.opacity = +n;
}
yi(St, Fa, au(ze, {
  brighter: function(r) {
    return r = r == null ? ps : Math.pow(ps, r), new St(this.h, this.s, this.l * r, this.opacity);
  },
  darker: function(r) {
    return r = r == null ? ni : Math.pow(ni, r), new St(this.h, this.s, this.l * r, this.opacity);
  },
  rgb: function() {
    var r = this.h % 360 + (this.h < 0) * 360, t = isNaN(r) || isNaN(this.s) ? 0 : this.s, e = this.l, n = e + (e < 0.5 ? e : 1 - e) * t, a = 2 * e - n;
    return new Or(
      hl(r >= 240 ? r - 240 : r + 120, a, n),
      hl(r, a, n),
      hl(r < 120 ? r + 240 : r - 120, a, n),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function() {
    var r = this.opacity;
    return r = isNaN(r) ? 1 : Math.max(0, Math.min(1, r)), (r === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (r === 1 ? ")" : ", " + r + ")");
  }
}));
function hl(r, t, e) {
  return (r < 60 ? t + (e - t) * r / 60 : r < 180 ? e : r < 240 ? t + (e - t) * (240 - r) / 60 : t) * 255;
}
const mC = Math.PI / 180, bC = 180 / Math.PI, ys = 18, pS = 0.96422, $S = 1, yS = 0.82521, mS = 4 / 29, In = 6 / 29, bS = 3 * In * In, wC = In * In * In;
function wS(r) {
  if (r instanceof It)
    return new It(r.l, r.a, r.b, r.opacity);
  if (r instanceof kt)
    return SS(r);
  r instanceof Or || (r = dS(r));
  var t = $l(r.r), e = $l(r.g), n = $l(r.b), a = dl((0.2225045 * t + 0.7168786 * e + 0.0606169 * n) / $S), i, o;
  return t === e && e === n ? i = o = a : (i = dl((0.4360747 * t + 0.3850649 * e + 0.1430804 * n) / pS), o = dl((0.0139322 * t + 0.0971045 * e + 0.7141733 * n) / yS)), new It(116 * a - 16, 500 * (i - a), 200 * (a - o), r.opacity);
}
function Le(r, t, e, n) {
  return arguments.length === 1 ? wS(r) : new It(r, t, e, n ?? 1);
}
function It(r, t, e, n) {
  this.l = +r, this.a = +t, this.b = +e, this.opacity = +n;
}
yi(It, Le, au(ze, {
  brighter: function(r) {
    return new It(this.l + ys * (r ?? 1), this.a, this.b, this.opacity);
  },
  darker: function(r) {
    return new It(this.l - ys * (r ?? 1), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var r = (this.l + 16) / 116, t = isNaN(this.a) ? r : r + this.a / 500, e = isNaN(this.b) ? r : r - this.b / 200;
    return t = pS * gl(t), r = $S * gl(r), e = yS * gl(e), new Or(
      pl(3.1338561 * t - 1.6168667 * r - 0.4906146 * e),
      pl(-0.9787684 * t + 1.9161415 * r + 0.033454 * e),
      pl(0.0719453 * t - 0.2289914 * r + 1.4052427 * e),
      this.opacity
    );
  }
}));
function dl(r) {
  return r > wC ? Math.pow(r, 1 / 3) : r / bS + mS;
}
function gl(r) {
  return r > In ? r * r * r : bS * (r - mS);
}
function pl(r) {
  return 255 * (r <= 31308e-7 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055);
}
function $l(r) {
  return (r /= 255) <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
}
function SC(r) {
  if (r instanceof kt)
    return new kt(r.h, r.c, r.l, r.opacity);
  if (r instanceof It || (r = wS(r)), r.a === 0 && r.b === 0)
    return new kt(NaN, 0 < r.l && r.l < 100 ? 0 : NaN, r.l, r.opacity);
  var t = Math.atan2(r.b, r.a) * bC;
  return new kt(t < 0 ? t + 360 : t, Math.sqrt(r.a * r.a + r.b * r.b), r.l, r.opacity);
}
function EC(r, t, e, n) {
  return arguments.length === 1 ? SC(r) : new kt(r, t, e, n ?? 1);
}
function kt(r, t, e, n) {
  this.h = +r, this.c = +t, this.l = +e, this.opacity = +n;
}
function SS(r) {
  if (isNaN(r.h))
    return new It(r.l, 0, 0, r.opacity);
  var t = r.h * mC;
  return new It(r.l, Math.cos(t) * r.c, Math.sin(t) * r.c, r.opacity);
}
yi(kt, EC, au(ze, {
  brighter: function(r) {
    return new kt(this.h, this.c, this.l + ys * (r ?? 1), this.opacity);
  },
  darker: function(r) {
    return new kt(this.h, this.c, this.l - ys * (r ?? 1), this.opacity);
  },
  rgb: function() {
    return SS(this).rgb();
  }
}));
const Sh = (r) => () => r;
function TC(r, t) {
  return function(e) {
    return r + e * t;
  };
}
function xC(r, t, e) {
  return r = Math.pow(r, e), t = Math.pow(t, e) - r, e = 1 / e, function(n) {
    return Math.pow(r + n * t, e);
  };
}
function IC(r) {
  return (r = +r) == 1 ? $n : function(t, e) {
    return e - t ? xC(t, e, r) : Sh(isNaN(t) ? e : t);
  };
}
function $n(r, t) {
  var e = t - r;
  return e ? TC(r, e) : Sh(isNaN(r) ? t : r);
}
const ms = function r(t) {
  var e = IC(t);
  function n(a, i) {
    var o = e((a = $s(a)).r, (i = $s(i)).r), s = e(a.g, i.g), u = e(a.b, i.b), l = $n(a.opacity, i.opacity);
    return function(c) {
      return a.r = o(c), a.g = s(c), a.b = u(c), a.opacity = l(c), a + "";
    };
  }
  return n.gamma = r, n;
}(1);
function OC(r, t) {
  t || (t = []);
  var e = r ? Math.min(t.length, r.length) : 0, n = t.slice(), a;
  return function(i) {
    for (a = 0; a < e; ++a)
      n[a] = r[a] * (1 - i) + t[a] * i;
    return n;
  };
}
function AC(r) {
  return ArrayBuffer.isView(r) && !(r instanceof DataView);
}
function RC(r, t) {
  var e = t ? t.length : 0, n = r ? Math.min(e, r.length) : 0, a = new Array(n), i = new Array(e), o;
  for (o = 0; o < n; ++o)
    a[o] = On(r[o], t[o]);
  for (; o < e; ++o)
    i[o] = t[o];
  return function(s) {
    for (o = 0; o < n; ++o)
      i[o] = a[o](s);
    return i;
  };
}
function _C(r, t) {
  var e = /* @__PURE__ */ new Date();
  return r = +r, t = +t, function(n) {
    return e.setTime(r * (1 - n) + t * n), e;
  };
}
function ot(r, t) {
  return r = +r, t = +t, function(e) {
    return r * (1 - e) + t * e;
  };
}
function CC(r, t) {
  var e = {}, n = {}, a;
  (r === null || typeof r != "object") && (r = {}), (t === null || typeof t != "object") && (t = {});
  for (a in t)
    a in r ? e[a] = On(r[a], t[a]) : n[a] = t[a];
  return function(i) {
    for (a in e)
      n[a] = e[a](i);
    return n;
  };
}
var jf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, yl = new RegExp(jf.source, "g");
function PC(r) {
  return function() {
    return r;
  };
}
function MC(r) {
  return function(t) {
    return r(t) + "";
  };
}
function ES(r, t) {
  var e = jf.lastIndex = yl.lastIndex = 0, n, a, i, o = -1, s = [], u = [];
  for (r = r + "", t = t + ""; (n = jf.exec(r)) && (a = yl.exec(t)); )
    (i = a.index) > e && (i = t.slice(e, i), s[o] ? s[o] += i : s[++o] = i), (n = n[0]) === (a = a[0]) ? s[o] ? s[o] += a : s[++o] = a : (s[++o] = null, u.push({ i: o, x: ot(n, a) })), e = yl.lastIndex;
  return e < t.length && (i = t.slice(e), s[o] ? s[o] += i : s[++o] = i), s.length < 2 ? u[0] ? MC(u[0].x) : PC(t) : (t = u.length, function(l) {
    for (var c = 0, f; c < t; ++c)
      s[(f = u[c]).i] = f.x(l);
    return s.join("");
  });
}
function On(r, t) {
  var e = typeof t, n;
  return t == null || e === "boolean" ? Sh(t) : (e === "number" ? ot : e === "string" ? (n = De(t)) ? (t = n, ms) : ES : t instanceof De ? ms : t instanceof Date ? _C : AC(t) ? OC : Array.isArray(t) ? RC : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? CC : ot)(r, t);
}
function NC(r, t) {
  return r = +r, t = +t, function(e) {
    return Math.round(r * (1 - e) + t * e);
  };
}
var Zg = 180 / Math.PI, Uf = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function TS(r, t, e, n, a, i) {
  var o, s, u;
  return (o = Math.sqrt(r * r + t * t)) && (r /= o, t /= o), (u = r * e + t * n) && (e -= r * u, n -= t * u), (s = Math.sqrt(e * e + n * n)) && (e /= s, n /= s, u /= s), r * n < t * e && (r = -r, t = -t, u = -u, o = -o), {
    translateX: a,
    translateY: i,
    rotate: Math.atan2(t, r) * Zg,
    skewX: Math.atan(u) * Zg,
    scaleX: o,
    scaleY: s
  };
}
var Ji;
function DC(r) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(r + "");
  return t.isIdentity ? Uf : TS(t.a, t.b, t.c, t.d, t.e, t.f);
}
function LC(r) {
  return r == null || (Ji || (Ji = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ji.setAttribute("transform", r), !(r = Ji.transform.baseVal.consolidate())) ? Uf : (r = r.matrix, TS(r.a, r.b, r.c, r.d, r.e, r.f));
}
function xS(r, t, e, n) {
  function a(l) {
    return l.length ? l.pop() + " " : "";
  }
  function i(l, c, f, v, h, g) {
    if (l !== f || c !== v) {
      var $ = h.push("translate(", null, t, null, e);
      g.push({ i: $ - 4, x: ot(l, f) }, { i: $ - 2, x: ot(c, v) });
    } else
      (f || v) && h.push("translate(" + f + t + v + e);
  }
  function o(l, c, f, v) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), v.push({ i: f.push(a(f) + "rotate(", null, n) - 2, x: ot(l, c) })) : c && f.push(a(f) + "rotate(" + c + n);
  }
  function s(l, c, f, v) {
    l !== c ? v.push({ i: f.push(a(f) + "skewX(", null, n) - 2, x: ot(l, c) }) : c && f.push(a(f) + "skewX(" + c + n);
  }
  function u(l, c, f, v, h, g) {
    if (l !== f || c !== v) {
      var $ = h.push(a(h) + "scale(", null, ",", null, ")");
      g.push({ i: $ - 4, x: ot(l, f) }, { i: $ - 2, x: ot(c, v) });
    } else
      (f !== 1 || v !== 1) && h.push(a(h) + "scale(" + f + "," + v + ")");
  }
  return function(l, c) {
    var f = [], v = [];
    return l = r(l), c = r(c), i(l.translateX, l.translateY, c.translateX, c.translateY, f, v), o(l.rotate, c.rotate, f, v), s(l.skewX, c.skewX, f, v), u(l.scaleX, l.scaleY, c.scaleX, c.scaleY, f, v), l = c = null, function(h) {
      for (var g = -1, $ = v.length, p; ++g < $; )
        f[(p = v[g]).i] = p.x(h);
      return f.join("");
    };
  };
}
var FC = xS(DC, "px, ", "px)", "deg)"), kC = xS(LC, ", ", ")", ")"), BC = 1e-12;
function Qg(r) {
  return ((r = Math.exp(r)) + 1 / r) / 2;
}
function jC(r) {
  return ((r = Math.exp(r)) - 1 / r) / 2;
}
function UC(r) {
  return ((r = Math.exp(2 * r)) - 1) / (r + 1);
}
const zC = function r(t, e, n) {
  function a(i, o) {
    var s = i[0], u = i[1], l = i[2], c = o[0], f = o[1], v = o[2], h = c - s, g = f - u, $ = h * h + g * g, p, y;
    if ($ < BC)
      y = Math.log(v / l) / t, p = function(X) {
        return [
          s + X * h,
          u + X * g,
          l * Math.exp(t * X * y)
        ];
      };
    else {
      var S = Math.sqrt($), x = (v * v - l * l + n * $) / (2 * l * e * S), A = (v * v - l * l - n * $) / (2 * v * e * S), N = Math.log(Math.sqrt(x * x + 1) - x), z = Math.log(Math.sqrt(A * A + 1) - A);
      y = (z - N) / t, p = function(X) {
        var rr = X * y, or = Qg(N), cr = l / (e * S) * (or * UC(t * rr + N) - jC(N));
        return [
          s + cr * h,
          u + cr * g,
          l * or / Qg(t * rr + N)
        ];
      };
    }
    return p.duration = y * 1e3 * t / Math.SQRT2, p;
  }
  return a.rho = function(i) {
    var o = Math.max(1e-3, +i), s = o * o, u = s * s;
    return r(o, s, u);
  }, a;
}(Math.SQRT2, 2, 4);
function Eh(r, t) {
  var e = $n((r = Le(r)).l, (t = Le(t)).l), n = $n(r.a, t.a), a = $n(r.b, t.b), i = $n(r.opacity, t.opacity);
  return function(o) {
    return r.l = e(o), r.a = n(o), r.b = a(o), r.opacity = i(o), r + "";
  };
}
var Fn = 0, ka = 0, $a = 0, IS = 1e3, bs, Ba, ws = 0, Fe = 0, iu = 0, ii = typeof performance == "object" && performance.now ? performance : Date, OS = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(r) {
  setTimeout(r, 17);
};
function Th() {
  return Fe || (OS(VC), Fe = ii.now() + iu);
}
function VC() {
  Fe = 0;
}
function Ss() {
  this._call = this._time = this._next = null;
}
Ss.prototype = AS.prototype = {
  constructor: Ss,
  restart: function(r, t, e) {
    if (typeof r != "function")
      throw new TypeError("callback is not a function");
    e = (e == null ? Th() : +e) + (t == null ? 0 : +t), !this._next && Ba !== this && (Ba ? Ba._next = this : bs = this, Ba = this), this._call = r, this._time = e, zf();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, zf());
  }
};
function AS(r, t, e) {
  var n = new Ss();
  return n.restart(r, t, e), n;
}
function GC() {
  Th(), ++Fn;
  for (var r = bs, t; r; )
    (t = Fe - r._time) >= 0 && r._call.call(null, t), r = r._next;
  --Fn;
}
function rp() {
  Fe = (ws = ii.now()) + iu, Fn = ka = 0;
  try {
    GC();
  } finally {
    Fn = 0, WC(), Fe = 0;
  }
}
function HC() {
  var r = ii.now(), t = r - ws;
  t > IS && (iu -= t, ws = r);
}
function WC() {
  for (var r, t = bs, e, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), r = t, t = t._next) : (e = t._next, t._next = null, t = r ? r._next = e : bs = e);
  Ba = r, zf(n);
}
function zf(r) {
  if (!Fn) {
    ka && (ka = clearTimeout(ka));
    var t = r - Fe;
    t > 24 ? (r < 1 / 0 && (ka = setTimeout(rp, r - ii.now() - iu)), $a && ($a = clearInterval($a))) : ($a || (ws = ii.now(), $a = setInterval(HC, IS)), Fn = 1, OS(rp));
  }
}
function tp(r, t, e) {
  var n = new Ss();
  return t = t == null ? 0 : +t, n.restart((a) => {
    n.stop(), r(a + t);
  }, t, e), n;
}
var qC = mh("start", "end", "cancel", "interrupt"), YC = [], RS = 0, ep = 1, Vf = 2, Yo = 3, np = 4, Gf = 5, Ko = 6;
function ou(r, t, e, n, a, i) {
  var o = r.__transition;
  if (!o)
    r.__transition = {};
  else if (e in o)
    return;
  KC(r, e, {
    name: t,
    index: n,
    // For context during callback.
    group: a,
    // For context during callback.
    on: qC,
    tween: YC,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: RS
  });
}
function xh(r, t) {
  var e = ft(r, t);
  if (e.state > RS)
    throw new Error("too late; already scheduled");
  return e;
}
function At(r, t) {
  var e = ft(r, t);
  if (e.state > Yo)
    throw new Error("too late; already running");
  return e;
}
function ft(r, t) {
  var e = r.__transition;
  if (!e || !(e = e[t]))
    throw new Error("transition not found");
  return e;
}
function KC(r, t, e) {
  var n = r.__transition, a;
  n[t] = e, e.timer = AS(i, 0, e.time);
  function i(l) {
    e.state = ep, e.timer.restart(o, e.delay, e.time), e.delay <= l && o(l - e.delay);
  }
  function o(l) {
    var c, f, v, h;
    if (e.state !== ep)
      return u();
    for (c in n)
      if (h = n[c], h.name === e.name) {
        if (h.state === Yo)
          return tp(o);
        h.state === np ? (h.state = Ko, h.timer.stop(), h.on.call("interrupt", r, r.__data__, h.index, h.group), delete n[c]) : +c < t && (h.state = Ko, h.timer.stop(), h.on.call("cancel", r, r.__data__, h.index, h.group), delete n[c]);
      }
    if (tp(function() {
      e.state === Yo && (e.state = np, e.timer.restart(s, e.delay, e.time), s(l));
    }), e.state = Vf, e.on.call("start", r, r.__data__, e.index, e.group), e.state === Vf) {
      for (e.state = Yo, a = new Array(v = e.tween.length), c = 0, f = -1; c < v; ++c)
        (h = e.tween[c].value.call(r, r.__data__, e.index, e.group)) && (a[++f] = h);
      a.length = f + 1;
    }
  }
  function s(l) {
    for (var c = l < e.duration ? e.ease.call(null, l / e.duration) : (e.timer.restart(u), e.state = Gf, 1), f = -1, v = a.length; ++f < v; )
      a[f].call(r, c);
    e.state === Gf && (e.on.call("end", r, r.__data__, e.index, e.group), u());
  }
  function u() {
    e.state = Ko, e.timer.stop(), delete n[t];
    for (var l in n)
      return;
    delete r.__transition;
  }
}
function Xo(r, t) {
  var e = r.__transition, n, a, i = !0, o;
  if (e) {
    t = t == null ? null : t + "";
    for (o in e) {
      if ((n = e[o]).name !== t) {
        i = !1;
        continue;
      }
      a = n.state > Vf && n.state < Gf, n.state = Ko, n.timer.stop(), n.on.call(a ? "interrupt" : "cancel", r, r.__data__, n.index, n.group), delete e[o];
    }
    i && delete r.__transition;
  }
}
function XC(r) {
  return this.each(function() {
    Xo(this, r);
  });
}
function JC(r, t) {
  var e, n;
  return function() {
    var a = At(this, r), i = a.tween;
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
function ZC(r, t, e) {
  var n, a;
  if (typeof e != "function")
    throw new Error();
  return function() {
    var i = At(this, r), o = i.tween;
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
function QC(r, t) {
  var e = this._id;
  if (r += "", arguments.length < 2) {
    for (var n = ft(this.node(), e).tween, a = 0, i = n.length, o; a < i; ++a)
      if ((o = n[a]).name === r)
        return o.value;
    return null;
  }
  return this.each((t == null ? JC : ZC)(e, r, t));
}
function Ih(r, t, e) {
  var n = r._id;
  return r.each(function() {
    var a = At(this, n);
    (a.value || (a.value = {}))[t] = e.apply(this, arguments);
  }), function(a) {
    return ft(a, n).value[t];
  };
}
function _S(r, t) {
  var e;
  return (typeof t == "number" ? ot : t instanceof De ? ms : (e = De(t)) ? (t = e, ms) : ES)(r, t);
}
function r2(r) {
  return function() {
    this.removeAttribute(r);
  };
}
function t2(r) {
  return function() {
    this.removeAttributeNS(r.space, r.local);
  };
}
function e2(r, t, e) {
  var n, a = e + "", i;
  return function() {
    var o = this.getAttribute(r);
    return o === a ? null : o === n ? i : i = t(n = o, e);
  };
}
function n2(r, t, e) {
  var n, a = e + "", i;
  return function() {
    var o = this.getAttributeNS(r.space, r.local);
    return o === a ? null : o === n ? i : i = t(n = o, e);
  };
}
function a2(r, t, e) {
  var n, a, i;
  return function() {
    var o, s = e(this), u;
    return s == null ? void this.removeAttribute(r) : (o = this.getAttribute(r), u = s + "", o === u ? null : o === n && u === a ? i : (a = u, i = t(n = o, s)));
  };
}
function i2(r, t, e) {
  var n, a, i;
  return function() {
    var o, s = e(this), u;
    return s == null ? void this.removeAttributeNS(r.space, r.local) : (o = this.getAttributeNS(r.space, r.local), u = s + "", o === u ? null : o === n && u === a ? i : (a = u, i = t(n = o, s)));
  };
}
function o2(r, t) {
  var e = nu(r), n = e === "transform" ? kC : _S;
  return this.attrTween(r, typeof t == "function" ? (e.local ? i2 : a2)(e, n, Ih(this, "attr." + r, t)) : t == null ? (e.local ? t2 : r2)(e) : (e.local ? n2 : e2)(e, n, t));
}
function s2(r, t) {
  return function(e) {
    this.setAttribute(r, t.call(this, e));
  };
}
function u2(r, t) {
  return function(e) {
    this.setAttributeNS(r.space, r.local, t.call(this, e));
  };
}
function l2(r, t) {
  var e, n;
  function a() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && u2(r, i)), e;
  }
  return a._value = t, a;
}
function c2(r, t) {
  var e, n;
  function a() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && s2(r, i)), e;
  }
  return a._value = t, a;
}
function f2(r, t) {
  var e = "attr." + r;
  if (arguments.length < 2)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  var n = nu(r);
  return this.tween(e, (n.local ? l2 : c2)(n, t));
}
function v2(r, t) {
  return function() {
    xh(this, r).delay = +t.apply(this, arguments);
  };
}
function h2(r, t) {
  return t = +t, function() {
    xh(this, r).delay = t;
  };
}
function d2(r) {
  var t = this._id;
  return arguments.length ? this.each((typeof r == "function" ? v2 : h2)(t, r)) : ft(this.node(), t).delay;
}
function g2(r, t) {
  return function() {
    At(this, r).duration = +t.apply(this, arguments);
  };
}
function p2(r, t) {
  return t = +t, function() {
    At(this, r).duration = t;
  };
}
function $2(r) {
  var t = this._id;
  return arguments.length ? this.each((typeof r == "function" ? g2 : p2)(t, r)) : ft(this.node(), t).duration;
}
function y2(r, t) {
  if (typeof t != "function")
    throw new Error();
  return function() {
    At(this, r).ease = t;
  };
}
function m2(r) {
  var t = this._id;
  return arguments.length ? this.each(y2(t, r)) : ft(this.node(), t).ease;
}
function b2(r, t) {
  return function() {
    var e = t.apply(this, arguments);
    if (typeof e != "function")
      throw new Error();
    At(this, r).ease = e;
  };
}
function w2(r) {
  if (typeof r != "function")
    throw new Error();
  return this.each(b2(this._id, r));
}
function S2(r) {
  typeof r != "function" && (r = aS(r));
  for (var t = this._groups, e = t.length, n = new Array(e), a = 0; a < e; ++a)
    for (var i = t[a], o = i.length, s = n[a] = [], u, l = 0; l < o; ++l)
      (u = i[l]) && r.call(u, u.__data__, l, i) && s.push(u);
  return new Ut(n, this._parents, this._name, this._id);
}
function E2(r) {
  if (r._id !== this._id)
    throw new Error();
  for (var t = this._groups, e = r._groups, n = t.length, a = e.length, i = Math.min(n, a), o = new Array(n), s = 0; s < i; ++s)
    for (var u = t[s], l = e[s], c = u.length, f = o[s] = new Array(c), v, h = 0; h < c; ++h)
      (v = u[h] || l[h]) && (f[h] = v);
  for (; s < n; ++s)
    o[s] = t[s];
  return new Ut(o, this._parents, this._name, this._id);
}
function T2(r) {
  return (r + "").trim().split(/^|\s+/).every(function(t) {
    var e = t.indexOf(".");
    return e >= 0 && (t = t.slice(0, e)), !t || t === "start";
  });
}
function x2(r, t, e) {
  var n, a, i = T2(t) ? xh : At;
  return function() {
    var o = i(this, r), s = o.on;
    s !== n && (a = (n = s).copy()).on(t, e), o.on = a;
  };
}
function I2(r, t) {
  var e = this._id;
  return arguments.length < 2 ? ft(this.node(), e).on.on(r) : this.each(x2(e, r, t));
}
function O2(r) {
  return function() {
    var t = this.parentNode;
    for (var e in this.__transition)
      if (+e !== r)
        return;
    t && t.removeChild(this);
  };
}
function A2() {
  return this.on("end.remove", O2(this._id));
}
function R2(r) {
  var t = this._name, e = this._id;
  typeof r != "function" && (r = bh(r));
  for (var n = this._groups, a = n.length, i = new Array(a), o = 0; o < a; ++o)
    for (var s = n[o], u = s.length, l = i[o] = new Array(u), c, f, v = 0; v < u; ++v)
      (c = s[v]) && (f = r.call(c, c.__data__, v, s)) && ("__data__" in c && (f.__data__ = c.__data__), l[v] = f, ou(l[v], t, e, v, l, ft(c, e)));
  return new Ut(i, this._parents, t, e);
}
function _2(r) {
  var t = this._name, e = this._id;
  typeof r != "function" && (r = nS(r));
  for (var n = this._groups, a = n.length, i = [], o = [], s = 0; s < a; ++s)
    for (var u = n[s], l = u.length, c, f = 0; f < l; ++f)
      if (c = u[f]) {
        for (var v = r.call(c, c.__data__, f, u), h, g = ft(c, e), $ = 0, p = v.length; $ < p; ++$)
          (h = v[$]) && ou(h, t, e, $, v, g);
        i.push(v), o.push(c);
      }
  return new Ut(i, o, t, e);
}
var C2 = $i.prototype.constructor;
function P2() {
  return new C2(this._groups, this._parents);
}
function M2(r, t) {
  var e, n, a;
  return function() {
    var i = Ln(this, r), o = (this.style.removeProperty(r), Ln(this, r));
    return i === o ? null : i === e && o === n ? a : a = t(e = i, n = o);
  };
}
function CS(r) {
  return function() {
    this.style.removeProperty(r);
  };
}
function N2(r, t, e) {
  var n, a = e + "", i;
  return function() {
    var o = Ln(this, r);
    return o === a ? null : o === n ? i : i = t(n = o, e);
  };
}
function D2(r, t, e) {
  var n, a, i;
  return function() {
    var o = Ln(this, r), s = e(this), u = s + "";
    return s == null && (u = s = (this.style.removeProperty(r), Ln(this, r))), o === u ? null : o === n && u === a ? i : (a = u, i = t(n = o, s));
  };
}
function L2(r, t) {
  var e, n, a, i = "style." + t, o = "end." + i, s;
  return function() {
    var u = At(this, r), l = u.on, c = u.value[i] == null ? s || (s = CS(t)) : void 0;
    (l !== e || a !== c) && (n = (e = l).copy()).on(o, a = c), u.on = n;
  };
}
function F2(r, t, e) {
  var n = (r += "") == "transform" ? FC : _S;
  return t == null ? this.styleTween(r, M2(r, n)).on("end.style." + r, CS(r)) : typeof t == "function" ? this.styleTween(r, D2(r, n, Ih(this, "style." + r, t))).each(L2(this._id, r)) : this.styleTween(r, N2(r, n, t), e).on("end.style." + r, null);
}
function k2(r, t, e) {
  return function(n) {
    this.style.setProperty(r, t.call(this, n), e);
  };
}
function B2(r, t, e) {
  var n, a;
  function i() {
    var o = t.apply(this, arguments);
    return o !== a && (n = (a = o) && k2(r, o, e)), n;
  }
  return i._value = t, i;
}
function j2(r, t, e) {
  var n = "style." + (r += "");
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(n, B2(r, t, e ?? ""));
}
function U2(r) {
  return function() {
    this.textContent = r;
  };
}
function z2(r) {
  return function() {
    var t = r(this);
    this.textContent = t ?? "";
  };
}
function V2(r) {
  return this.tween("text", typeof r == "function" ? z2(Ih(this, "text", r)) : U2(r == null ? "" : r + ""));
}
function G2(r) {
  return function(t) {
    this.textContent = r.call(this, t);
  };
}
function H2(r) {
  var t, e;
  function n() {
    var a = r.apply(this, arguments);
    return a !== e && (t = (e = a) && G2(a)), t;
  }
  return n._value = r, n;
}
function W2(r) {
  var t = "text";
  if (arguments.length < 1)
    return (t = this.tween(t)) && t._value;
  if (r == null)
    return this.tween(t, null);
  if (typeof r != "function")
    throw new Error();
  return this.tween(t, H2(r));
}
function q2() {
  for (var r = this._name, t = this._id, e = PS(), n = this._groups, a = n.length, i = 0; i < a; ++i)
    for (var o = n[i], s = o.length, u, l = 0; l < s; ++l)
      if (u = o[l]) {
        var c = ft(u, t);
        ou(u, r, e, l, o, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Ut(n, this._parents, r, e);
}
function Y2() {
  var r, t, e = this, n = e._id, a = e.size();
  return new Promise(function(i, o) {
    var s = { value: o }, u = { value: function() {
      --a === 0 && i();
    } };
    e.each(function() {
      var l = At(this, n), c = l.on;
      c !== r && (t = (r = c).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(u)), l.on = t;
    }), a === 0 && i();
  });
}
var K2 = 0;
function Ut(r, t, e, n) {
  this._groups = r, this._parents = t, this._name = e, this._id = n;
}
function PS() {
  return ++K2;
}
var be = $i.prototype;
Ut.prototype = {
  constructor: Ut,
  select: R2,
  selectAll: _2,
  filter: S2,
  merge: E2,
  selection: P2,
  transition: q2,
  call: be.call,
  nodes: be.nodes,
  node: be.node,
  size: be.size,
  empty: be.empty,
  each: be.each,
  on: I2,
  attr: o2,
  attrTween: f2,
  style: F2,
  styleTween: j2,
  text: V2,
  textTween: W2,
  remove: A2,
  tween: QC,
  delay: d2,
  duration: $2,
  ease: m2,
  easeVarying: w2,
  end: Y2,
  [Symbol.iterator]: be[Symbol.iterator]
};
function X2(r) {
  return ((r *= 2) <= 1 ? r * r * r : (r -= 2) * r * r + 2) / 2;
}
var J2 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: X2
};
function Z2(r, t) {
  for (var e; !(e = r.__transition) || !(e = e[t]); )
    if (!(r = r.parentNode))
      throw new Error(`transition ${t} not found`);
  return e;
}
function Q2(r) {
  var t, e;
  r instanceof Ut ? (t = r._id, r = r._name) : (t = PS(), (e = J2).time = Th(), r = r == null ? null : r + "");
  for (var n = this._groups, a = n.length, i = 0; i < a; ++i)
    for (var o = n[i], s = o.length, u, l = 0; l < s; ++l)
      (u = o[l]) && ou(u, r, t, l, o, e || Z2(u, t));
  return new Ut(n, this._parents, r, t);
}
$i.prototype.interrupt = XC;
$i.prototype.transition = Q2;
const Hf = Math.PI, Wf = 2 * Hf, _e = 1e-6, rP = Wf - _e;
function qf() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null, this._ = "";
}
function Oh() {
  return new qf();
}
qf.prototype = Oh.prototype = {
  constructor: qf,
  moveTo: function(r, t) {
    this._ += "M" + (this._x0 = this._x1 = +r) + "," + (this._y0 = this._y1 = +t);
  },
  closePath: function() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
  },
  lineTo: function(r, t) {
    this._ += "L" + (this._x1 = +r) + "," + (this._y1 = +t);
  },
  quadraticCurveTo: function(r, t, e, n) {
    this._ += "Q" + +r + "," + +t + "," + (this._x1 = +e) + "," + (this._y1 = +n);
  },
  bezierCurveTo: function(r, t, e, n, a, i) {
    this._ += "C" + +r + "," + +t + "," + +e + "," + +n + "," + (this._x1 = +a) + "," + (this._y1 = +i);
  },
  arcTo: function(r, t, e, n, a) {
    r = +r, t = +t, e = +e, n = +n, a = +a;
    var i = this._x1, o = this._y1, s = e - r, u = n - t, l = i - r, c = o - t, f = l * l + c * c;
    if (a < 0)
      throw new Error("negative radius: " + a);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = r) + "," + (this._y1 = t);
    else if (f > _e)
      if (!(Math.abs(c * s - u * l) > _e) || !a)
        this._ += "L" + (this._x1 = r) + "," + (this._y1 = t);
      else {
        var v = e - i, h = n - o, g = s * s + u * u, $ = v * v + h * h, p = Math.sqrt(g), y = Math.sqrt(f), S = a * Math.tan((Hf - Math.acos((g + f - $) / (2 * p * y))) / 2), x = S / y, A = S / p;
        Math.abs(x - 1) > _e && (this._ += "L" + (r + x * l) + "," + (t + x * c)), this._ += "A" + a + "," + a + ",0,0," + +(c * v > l * h) + "," + (this._x1 = r + A * s) + "," + (this._y1 = t + A * u);
      }
  },
  arc: function(r, t, e, n, a, i) {
    r = +r, t = +t, e = +e, i = !!i;
    var o = e * Math.cos(n), s = e * Math.sin(n), u = r + o, l = t + s, c = 1 ^ i, f = i ? n - a : a - n;
    if (e < 0)
      throw new Error("negative radius: " + e);
    this._x1 === null ? this._ += "M" + u + "," + l : (Math.abs(this._x1 - u) > _e || Math.abs(this._y1 - l) > _e) && (this._ += "L" + u + "," + l), e && (f < 0 && (f = f % Wf + Wf), f > rP ? this._ += "A" + e + "," + e + ",0,1," + c + "," + (r - o) + "," + (t - s) + "A" + e + "," + e + ",0,1," + c + "," + (this._x1 = u) + "," + (this._y1 = l) : f > _e && (this._ += "A" + e + "," + e + ",0," + +(f >= Hf) + "," + c + "," + (this._x1 = r + e * Math.cos(a)) + "," + (this._y1 = t + e * Math.sin(a))));
  },
  rect: function(r, t, e, n) {
    this._ += "M" + (this._x0 = this._x1 = +r) + "," + (this._y0 = this._y1 = +t) + "h" + +e + "v" + +n + "h" + -e + "Z";
  },
  toString: function() {
    return this._;
  }
};
function tP(r) {
  return Math.abs(r = Math.round(r)) >= 1e21 ? r.toLocaleString("en").replace(/,/g, "") : r.toString(10);
}
function Es(r, t) {
  if ((e = (r = t ? r.toExponential(t - 1) : r.toExponential()).indexOf("e")) < 0)
    return null;
  var e, n = r.slice(0, e);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +r.slice(e + 1)
  ];
}
function kn(r) {
  return r = Es(Math.abs(r)), r ? r[1] : NaN;
}
function eP(r, t) {
  return function(e, n) {
    for (var a = e.length, i = [], o = 0, s = r[0], u = 0; a > 0 && s > 0 && (u + s + 1 > n && (s = Math.max(1, n - u)), i.push(e.substring(a -= s, a + s)), !((u += s + 1) > n)); )
      s = r[o = (o + 1) % r.length];
    return i.reverse().join(t);
  };
}
function nP(r) {
  return function(t) {
    return t.replace(/[0-9]/g, function(e) {
      return r[+e];
    });
  };
}
var aP = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Ts(r) {
  if (!(t = aP.exec(r)))
    throw new Error("invalid format: " + r);
  var t;
  return new Ah({
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
Ts.prototype = Ah.prototype;
function Ah(r) {
  this.fill = r.fill === void 0 ? " " : r.fill + "", this.align = r.align === void 0 ? ">" : r.align + "", this.sign = r.sign === void 0 ? "-" : r.sign + "", this.symbol = r.symbol === void 0 ? "" : r.symbol + "", this.zero = !!r.zero, this.width = r.width === void 0 ? void 0 : +r.width, this.comma = !!r.comma, this.precision = r.precision === void 0 ? void 0 : +r.precision, this.trim = !!r.trim, this.type = r.type === void 0 ? "" : r.type + "";
}
Ah.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function iP(r) {
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
var MS;
function oP(r, t) {
  var e = Es(r, t);
  if (!e)
    return r + "";
  var n = e[0], a = e[1], i = a - (MS = Math.max(-8, Math.min(8, Math.floor(a / 3))) * 3) + 1, o = n.length;
  return i === o ? n : i > o ? n + new Array(i - o + 1).join("0") : i > 0 ? n.slice(0, i) + "." + n.slice(i) : "0." + new Array(1 - i).join("0") + Es(r, Math.max(0, t + i - 1))[0];
}
function ap(r, t) {
  var e = Es(r, t);
  if (!e)
    return r + "";
  var n = e[0], a = e[1];
  return a < 0 ? "0." + new Array(-a).join("0") + n : n.length > a + 1 ? n.slice(0, a + 1) + "." + n.slice(a + 1) : n + new Array(a - n.length + 2).join("0");
}
const ip = {
  "%": (r, t) => (r * 100).toFixed(t),
  b: (r) => Math.round(r).toString(2),
  c: (r) => r + "",
  d: tP,
  e: (r, t) => r.toExponential(t),
  f: (r, t) => r.toFixed(t),
  g: (r, t) => r.toPrecision(t),
  o: (r) => Math.round(r).toString(8),
  p: (r, t) => ap(r * 100, t),
  r: ap,
  s: oP,
  X: (r) => Math.round(r).toString(16).toUpperCase(),
  x: (r) => Math.round(r).toString(16)
};
function op(r) {
  return r;
}
var sp = Array.prototype.map, up = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function sP(r) {
  var t = r.grouping === void 0 || r.thousands === void 0 ? op : eP(sp.call(r.grouping, Number), r.thousands + ""), e = r.currency === void 0 ? "" : r.currency[0] + "", n = r.currency === void 0 ? "" : r.currency[1] + "", a = r.decimal === void 0 ? "." : r.decimal + "", i = r.numerals === void 0 ? op : nP(sp.call(r.numerals, String)), o = r.percent === void 0 ? "%" : r.percent + "", s = r.minus === void 0 ? "−" : r.minus + "", u = r.nan === void 0 ? "NaN" : r.nan + "";
  function l(f) {
    f = Ts(f);
    var v = f.fill, h = f.align, g = f.sign, $ = f.symbol, p = f.zero, y = f.width, S = f.comma, x = f.precision, A = f.trim, N = f.type;
    N === "n" ? (S = !0, N = "g") : ip[N] || (x === void 0 && (x = 12), A = !0, N = "g"), (p || v === "0" && h === "=") && (p = !0, v = "0", h = "=");
    var z = $ === "$" ? e : $ === "#" && /[boxX]/.test(N) ? "0" + N.toLowerCase() : "", X = $ === "$" ? n : /[%p]/.test(N) ? o : "", rr = ip[N], or = /[defgprs%]/.test(N);
    x = x === void 0 ? 6 : /[gprs]/.test(N) ? Math.max(1, Math.min(21, x)) : Math.max(0, Math.min(20, x));
    function cr(B) {
      var F = z, V = X, m, R, E;
      if (N === "c")
        V = rr(B) + V, B = "";
      else {
        B = +B;
        var M = B < 0 || 1 / B < 0;
        if (B = isNaN(B) ? u : rr(Math.abs(B), x), A && (B = iP(B)), M && +B == 0 && g !== "+" && (M = !1), F = (M ? g === "(" ? g : s : g === "-" || g === "(" ? "" : g) + F, V = (N === "s" ? up[8 + MS / 3] : "") + V + (M && g === "(" ? ")" : ""), or) {
          for (m = -1, R = B.length; ++m < R; )
            if (E = B.charCodeAt(m), 48 > E || E > 57) {
              V = (E === 46 ? a + B.slice(m + 1) : B.slice(m)) + V, B = B.slice(0, m);
              break;
            }
        }
      }
      S && !p && (B = t(B, 1 / 0));
      var L = F.length + B.length + V.length, b = L < y ? new Array(y - L + 1).join(v) : "";
      switch (S && p && (B = t(b + B, b.length ? y - V.length : 1 / 0), b = ""), h) {
        case "<":
          B = F + B + V + b;
          break;
        case "=":
          B = F + b + B + V;
          break;
        case "^":
          B = b.slice(0, L = b.length >> 1) + F + B + V + b.slice(L);
          break;
        default:
          B = b + F + B + V;
          break;
      }
      return i(B);
    }
    return cr.toString = function() {
      return f + "";
    }, cr;
  }
  function c(f, v) {
    var h = l((f = Ts(f), f.type = "f", f)), g = Math.max(-8, Math.min(8, Math.floor(kn(v) / 3))) * 3, $ = Math.pow(10, -g), p = up[8 + g / 3];
    return function(y) {
      return h($ * y) + p;
    };
  }
  return {
    format: l,
    formatPrefix: c
  };
}
var Zi, NS, DS;
uP({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function uP(r) {
  return Zi = sP(r), NS = Zi.format, DS = Zi.formatPrefix, Zi;
}
function lP(r) {
  return Math.max(0, -kn(Math.abs(r)));
}
function cP(r, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(kn(t) / 3))) * 3 - kn(Math.abs(r)));
}
function fP(r, t) {
  return r = Math.abs(r), t = Math.abs(t) - r, Math.max(0, kn(t) - kn(r)) + 1;
}
function vP(r) {
  var t = 0, e = r.children, n = e && e.length;
  if (!n)
    t = 1;
  else
    for (; --n >= 0; )
      t += e[n].value;
  r.value = t;
}
function hP() {
  return this.eachAfter(vP);
}
function dP(r, t) {
  let e = -1;
  for (const n of this)
    r.call(t, n, ++e, this);
  return this;
}
function gP(r, t) {
  for (var e = this, n = [e], a, i, o = -1; e = n.pop(); )
    if (r.call(t, e, ++o, this), a = e.children)
      for (i = a.length - 1; i >= 0; --i)
        n.push(a[i]);
  return this;
}
function pP(r, t) {
  for (var e = this, n = [e], a = [], i, o, s, u = -1; e = n.pop(); )
    if (a.push(e), i = e.children)
      for (o = 0, s = i.length; o < s; ++o)
        n.push(i[o]);
  for (; e = a.pop(); )
    r.call(t, e, ++u, this);
  return this;
}
function $P(r, t) {
  let e = -1;
  for (const n of this)
    if (r.call(t, n, ++e, this))
      return n;
}
function yP(r) {
  return this.eachAfter(function(t) {
    for (var e = +r(t.data) || 0, n = t.children, a = n && n.length; --a >= 0; )
      e += n[a].value;
    t.value = e;
  });
}
function mP(r) {
  return this.eachBefore(function(t) {
    t.children && t.children.sort(r);
  });
}
function bP(r) {
  for (var t = this, e = wP(t, r), n = [t]; t !== e; )
    t = t.parent, n.push(t);
  for (var a = n.length; r !== e; )
    n.splice(a, 0, r), r = r.parent;
  return n;
}
function wP(r, t) {
  if (r === t)
    return r;
  var e = r.ancestors(), n = t.ancestors(), a = null;
  for (r = e.pop(), t = n.pop(); r === t; )
    a = r, r = e.pop(), t = n.pop();
  return a;
}
function SP() {
  for (var r = this, t = [r]; r = r.parent; )
    t.push(r);
  return t;
}
function EP() {
  return Array.from(this);
}
function TP() {
  var r = [];
  return this.eachBefore(function(t) {
    t.children || r.push(t);
  }), r;
}
function xP() {
  var r = this, t = [];
  return r.each(function(e) {
    e !== r && t.push({ source: e.parent, target: e });
  }), t;
}
function* IP() {
  var r = this, t, e = [r], n, a, i;
  do
    for (t = e.reverse(), e = []; r = t.pop(); )
      if (yield r, n = r.children)
        for (a = 0, i = n.length; a < i; ++a)
          e.push(n[a]);
  while (e.length);
}
function Bn(r, t) {
  r instanceof Map ? (r = [void 0, r], t === void 0 && (t = RP)) : t === void 0 && (t = AP);
  for (var e = new oi(r), n, a = [e], i, o, s, u; n = a.pop(); )
    if ((o = t(n.data)) && (u = (o = Array.from(o)).length))
      for (n.children = o, s = u - 1; s >= 0; --s)
        a.push(i = o[s] = new oi(o[s])), i.parent = n, i.depth = n.depth + 1;
  return e.eachBefore(CP);
}
function OP() {
  return Bn(this).eachBefore(_P);
}
function AP(r) {
  return r.children;
}
function RP(r) {
  return Array.isArray(r) ? r[1] : null;
}
function _P(r) {
  r.data.value !== void 0 && (r.value = r.data.value), r.data = r.data.data;
}
function CP(r) {
  var t = 0;
  do
    r.height = t;
  while ((r = r.parent) && r.height < ++t);
}
function oi(r) {
  this.data = r, this.depth = this.height = 0, this.parent = null;
}
oi.prototype = Bn.prototype = {
  constructor: oi,
  count: hP,
  each: dP,
  eachAfter: pP,
  eachBefore: gP,
  find: $P,
  sum: yP,
  sort: mP,
  path: bP,
  ancestors: SP,
  descendants: EP,
  leaves: TP,
  links: xP,
  copy: OP,
  [Symbol.iterator]: IP
};
function PP(r) {
  if (typeof r != "function")
    throw new Error();
  return r;
}
function ya() {
  return 0;
}
function ma(r) {
  return function() {
    return r;
  };
}
function LS(r) {
  r.x0 = Math.round(r.x0), r.y0 = Math.round(r.y0), r.x1 = Math.round(r.x1), r.y1 = Math.round(r.y1);
}
function FS(r, t, e, n, a) {
  for (var i = r.children, o, s = -1, u = i.length, l = r.value && (n - t) / r.value; ++s < u; )
    o = i[s], o.y0 = e, o.y1 = a, o.x0 = t, o.x1 = t += o.value * l;
}
function MP() {
  var r = 1, t = 1, e = 0, n = !1;
  function a(o) {
    var s = o.height + 1;
    return o.x0 = o.y0 = e, o.x1 = r, o.y1 = t / s, o.eachBefore(i(t, s)), n && o.eachBefore(LS), o;
  }
  function i(o, s) {
    return function(u) {
      u.children && FS(u, u.x0, o * (u.depth + 1) / s, u.x1, o * (u.depth + 2) / s);
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
function NP(r, t) {
  return r.parent === t.parent ? 1 : 2;
}
function ml(r) {
  var t = r.children;
  return t ? t[0] : r.t;
}
function bl(r) {
  var t = r.children;
  return t ? t[t.length - 1] : r.t;
}
function DP(r, t, e) {
  var n = e / (t.i - r.i);
  t.c -= n, t.s += e, r.c += n, t.z += e, t.m += e;
}
function LP(r) {
  for (var t = 0, e = 0, n = r.children, a = n.length, i; --a >= 0; )
    i = n[a], i.z += t, i.m += t, t += i.s + (e += i.c);
}
function FP(r, t, e) {
  return r.a.parent === t.parent ? r.a : e;
}
function Jo(r, t) {
  this._ = r, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = t;
}
Jo.prototype = Object.create(oi.prototype);
function kP(r) {
  for (var t = new Jo(r, 0), e, n = [t], a, i, o, s; e = n.pop(); )
    if (i = e._.children)
      for (e.children = new Array(s = i.length), o = s - 1; o >= 0; --o)
        n.push(a = e.children[o] = new Jo(i[o], o)), a.parent = e;
  return (t.parent = new Jo(null, 0)).children = [t], t;
}
function BP() {
  var r = NP, t = 1, e = 1, n = null;
  function a(l) {
    var c = kP(l);
    if (c.eachAfter(i), c.parent.m = -c.z, c.eachBefore(o), n)
      l.eachBefore(u);
    else {
      var f = l, v = l, h = l;
      l.eachBefore(function(S) {
        S.x < f.x && (f = S), S.x > v.x && (v = S), S.depth > h.depth && (h = S);
      });
      var g = f === v ? 1 : r(f, v) / 2, $ = g - f.x, p = t / (v.x + g + $), y = e / (h.depth || 1);
      l.eachBefore(function(S) {
        S.x = (S.x + $) * p, S.y = S.depth * y;
      });
    }
    return l;
  }
  function i(l) {
    var c = l.children, f = l.parent.children, v = l.i ? f[l.i - 1] : null;
    if (c) {
      LP(l);
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
      for (var v = l, h = l, g = c, $ = v.parent.children[0], p = v.m, y = h.m, S = g.m, x = $.m, A; g = bl(g), v = ml(v), g && v; )
        $ = ml($), h = bl(h), h.a = l, A = g.z + S - v.z - p + r(g._, v._), A > 0 && (DP(FP(g, l, f), l, A), p += A, y += A), S += g.m, p += v.m, x += $.m, y += h.m;
      g && !bl(h) && (h.t = g, h.m += S - y), v && !ml($) && ($.t = v, $.m += p - x, f = l);
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
function jP(r, t, e, n, a) {
  for (var i = r.children, o, s = -1, u = i.length, l = r.value && (a - e) / r.value; ++s < u; )
    o = i[s], o.x0 = t, o.x1 = n, o.y0 = e, o.y1 = e += o.value * l;
}
var UP = (1 + Math.sqrt(5)) / 2;
function zP(r, t, e, n, a, i) {
  for (var o = [], s = t.children, u, l, c = 0, f = 0, v = s.length, h, g, $ = t.value, p, y, S, x, A, N, z; c < v; ) {
    h = a - e, g = i - n;
    do
      p = s[f++].value;
    while (!p && f < v);
    for (y = S = p, N = Math.max(g / h, h / g) / ($ * r), z = p * p * N, A = Math.max(S / z, z / y); f < v; ++f) {
      if (p += l = s[f].value, l < y && (y = l), l > S && (S = l), z = p * p * N, x = Math.max(S / z, z / y), x > A) {
        p -= l;
        break;
      }
      A = x;
    }
    o.push(u = { value: p, dice: h < g, children: s.slice(c, f) }), u.dice ? FS(u, e, n, a, $ ? n += g * p / $ : i) : jP(u, e, n, $ ? e += h * p / $ : a, i), $ -= p, c = f;
  }
  return o;
}
const VP = function r(t) {
  function e(n, a, i, o, s) {
    zP(t, n, a, i, o, s);
  }
  return e.ratio = function(n) {
    return r((n = +n) > 1 ? n : 1);
  }, e;
}(UP);
function GP() {
  var r = VP, t = !1, e = 1, n = 1, a = [0], i = ya, o = ya, s = ya, u = ya, l = ya;
  function c(v) {
    return v.x0 = v.y0 = 0, v.x1 = e, v.y1 = n, v.eachBefore(f), a = [0], t && v.eachBefore(LS), v;
  }
  function f(v) {
    var h = a[v.depth], g = v.x0 + h, $ = v.y0 + h, p = v.x1 - h, y = v.y1 - h;
    p < g && (g = p = (g + p) / 2), y < $ && ($ = y = ($ + y) / 2), v.x0 = g, v.y0 = $, v.x1 = p, v.y1 = y, v.children && (h = a[v.depth + 1] = i(v) / 2, g += l(v) - h, $ += o(v) - h, p -= s(v) - h, y -= u(v) - h, p < g && (g = p = (g + p) / 2), y < $ && ($ = y = ($ + y) / 2), r(v, g, $, p, y));
  }
  return c.round = function(v) {
    return arguments.length ? (t = !!v, c) : t;
  }, c.size = function(v) {
    return arguments.length ? (e = +v[0], n = +v[1], c) : [e, n];
  }, c.tile = function(v) {
    return arguments.length ? (r = PP(v), c) : r;
  }, c.padding = function(v) {
    return arguments.length ? c.paddingInner(v).paddingOuter(v) : c.paddingInner();
  }, c.paddingInner = function(v) {
    return arguments.length ? (i = typeof v == "function" ? v : ma(+v), c) : i;
  }, c.paddingOuter = function(v) {
    return arguments.length ? c.paddingTop(v).paddingRight(v).paddingBottom(v).paddingLeft(v) : c.paddingTop();
  }, c.paddingTop = function(v) {
    return arguments.length ? (o = typeof v == "function" ? v : ma(+v), c) : o;
  }, c.paddingRight = function(v) {
    return arguments.length ? (s = typeof v == "function" ? v : ma(+v), c) : s;
  }, c.paddingBottom = function(v) {
    return arguments.length ? (u = typeof v == "function" ? v : ma(+v), c) : u;
  }, c.paddingLeft = function(v) {
    return arguments.length ? (l = typeof v == "function" ? v : ma(+v), c) : l;
  }, c;
}
function Rh(r, t) {
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
const lp = Symbol("implicit");
function kS() {
  var r = /* @__PURE__ */ new Map(), t = [], e = [], n = lp;
  function a(i) {
    var o = i + "", s = r.get(o);
    if (!s) {
      if (n !== lp)
        return n;
      r.set(o, s = t.push(i));
    }
    return e[(s - 1) % e.length];
  }
  return a.domain = function(i) {
    if (!arguments.length)
      return t.slice();
    t = [], r = /* @__PURE__ */ new Map();
    for (const o of i) {
      const s = o + "";
      r.has(s) || r.set(s, t.push(o));
    }
    return a;
  }, a.range = function(i) {
    return arguments.length ? (e = Array.from(i), a) : e.slice();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.copy = function() {
    return kS(t, e).unknown(n);
  }, Rh.apply(a, arguments), a;
}
function HP(r) {
  return function() {
    return r;
  };
}
function WP(r) {
  return +r;
}
var cp = [0, 1];
function yn(r) {
  return r;
}
function Yf(r, t) {
  return (t -= r = +r) ? function(e) {
    return (e - r) / t;
  } : HP(isNaN(t) ? NaN : 0.5);
}
function qP(r, t) {
  var e;
  return r > t && (e = r, r = t, t = e), function(n) {
    return Math.max(r, Math.min(t, n));
  };
}
function YP(r, t, e) {
  var n = r[0], a = r[1], i = t[0], o = t[1];
  return a < n ? (n = Yf(a, n), i = e(o, i)) : (n = Yf(n, a), i = e(i, o)), function(s) {
    return i(n(s));
  };
}
function KP(r, t, e) {
  var n = Math.min(r.length, t.length) - 1, a = new Array(n), i = new Array(n), o = -1;
  for (r[n] < r[0] && (r = r.slice().reverse(), t = t.slice().reverse()); ++o < n; )
    a[o] = Yf(r[o], r[o + 1]), i[o] = e(t[o], t[o + 1]);
  return function(s) {
    var u = Qw(r, s, 1, n) - 1;
    return i[u](a[u](s));
  };
}
function XP(r, t) {
  return t.domain(r.domain()).range(r.range()).interpolate(r.interpolate()).clamp(r.clamp()).unknown(r.unknown());
}
function JP() {
  var r = cp, t = cp, e = On, n, a, i, o = yn, s, u, l;
  function c() {
    var v = Math.min(r.length, t.length);
    return o !== yn && (o = qP(r[0], r[v - 1])), s = v > 2 ? KP : YP, u = l = null, f;
  }
  function f(v) {
    return v == null || isNaN(v = +v) ? i : (u || (u = s(r.map(n), t, e)))(n(o(v)));
  }
  return f.invert = function(v) {
    return o(a((l || (l = s(t, r.map(n), ot)))(v)));
  }, f.domain = function(v) {
    return arguments.length ? (r = Array.from(v, WP), c()) : r.slice();
  }, f.range = function(v) {
    return arguments.length ? (t = Array.from(v), c()) : t.slice();
  }, f.rangeRound = function(v) {
    return t = Array.from(v), e = NC, c();
  }, f.clamp = function(v) {
    return arguments.length ? (o = v ? !0 : yn, c()) : o !== yn;
  }, f.interpolate = function(v) {
    return arguments.length ? (e = v, c()) : e;
  }, f.unknown = function(v) {
    return arguments.length ? (i = v, f) : i;
  }, function(v, h) {
    return n = v, a = h, c();
  };
}
function ZP() {
  return JP()(yn, yn);
}
function QP(r, t, e, n) {
  var a = AR(r, t, e), i;
  switch (n = Ts(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(r), Math.abs(t));
      return n.precision == null && !isNaN(i = cP(a, o)) && (n.precision = i), DS(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(i = fP(a, Math.max(Math.abs(r), Math.abs(t)))) && (n.precision = i - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(i = lP(a)) && (n.precision = i - (n.type === "%") * 2);
      break;
    }
  }
  return NS(n);
}
function BS(r) {
  var t = r.domain;
  return r.ticks = function(e) {
    var n = t();
    return OR(n[0], n[n.length - 1], e ?? 10);
  }, r.tickFormat = function(e, n) {
    var a = t();
    return QP(a[0], a[a.length - 1], e ?? 10, n);
  }, r.nice = function(e) {
    e == null && (e = 10);
    var n = t(), a = 0, i = n.length - 1, o = n[a], s = n[i], u, l, c = 10;
    for (s < o && (l = o, o = s, s = l, l = a, a = i, i = l); c-- > 0; ) {
      if (l = rS(o, s, e), l === u)
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
function ke() {
  var r = ZP();
  return r.copy = function() {
    return XP(r, ke());
  }, Rh.apply(r, arguments), BS(r);
}
function jS() {
  var r = 0, t = 1, e = 1, n = [0.5], a = [0, 1], i;
  function o(u) {
    return u != null && u <= u ? a[Qw(n, u, 0, e)] : i;
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
    return jS().domain([r, t]).range(a).unknown(i);
  }, Rh.apply(BS(o), arguments);
}
function rM(r) {
  for (var t = r.length / 6 | 0, e = new Array(t), n = 0; n < t; )
    e[n] = "#" + r.slice(n * 6, ++n * 6);
  return e;
}
const tM = rM("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
function bt(r) {
  return function() {
    return r;
  };
}
var fp = Math.abs, wr = Math.atan2, we = Math.cos, eM = Math.max, wl = Math.min, $t = Math.sin, mn = Math.sqrt, Rr = 1e-12, si = Math.PI, xs = si / 2, nM = 2 * si;
function aM(r) {
  return r > 1 ? 0 : r < -1 ? si : Math.acos(r);
}
function vp(r) {
  return r >= 1 ? xs : r <= -1 ? -xs : Math.asin(r);
}
function iM(r) {
  return r.innerRadius;
}
function oM(r) {
  return r.outerRadius;
}
function sM(r) {
  return r.startAngle;
}
function uM(r) {
  return r.endAngle;
}
function lM(r) {
  return r && r.padAngle;
}
function cM(r, t, e, n, a, i, o, s) {
  var u = e - r, l = n - t, c = o - a, f = s - i, v = f * u - c * l;
  if (!(v * v < Rr))
    return v = (c * (t - i) - f * (r - a)) / v, [r + v * u, t + v * l];
}
function Qi(r, t, e, n, a, i, o) {
  var s = r - e, u = t - n, l = (o ? i : -i) / mn(s * s + u * u), c = l * u, f = -l * s, v = r + c, h = t + f, g = e + c, $ = n + f, p = (v + g) / 2, y = (h + $) / 2, S = g - v, x = $ - h, A = S * S + x * x, N = a - i, z = v * $ - g * h, X = (x < 0 ? -1 : 1) * mn(eM(0, N * N * A - z * z)), rr = (z * x - S * X) / A, or = (-z * S - x * X) / A, cr = (z * x + S * X) / A, B = (-z * S + x * X) / A, F = rr - p, V = or - y, m = cr - p, R = B - y;
  return F * F + V * V > m * m + R * R && (rr = cr, or = B), {
    cx: rr,
    cy: or,
    x01: -c,
    y01: -f,
    x11: rr * (a / N - 1),
    y11: or * (a / N - 1)
  };
}
function Kf() {
  var r = iM, t = oM, e = bt(0), n = null, a = sM, i = uM, o = lM, s = null;
  function u() {
    var l, c, f = +r.apply(this, arguments), v = +t.apply(this, arguments), h = a.apply(this, arguments) - xs, g = i.apply(this, arguments) - xs, $ = fp(g - h), p = g > h;
    if (s || (s = l = Oh()), v < f && (c = v, v = f, f = c), !(v > Rr))
      s.moveTo(0, 0);
    else if ($ > nM - Rr)
      s.moveTo(v * we(h), v * $t(h)), s.arc(0, 0, v, h, g, !p), f > Rr && (s.moveTo(f * we(g), f * $t(g)), s.arc(0, 0, f, g, h, p));
    else {
      var y = h, S = g, x = h, A = g, N = $, z = $, X = o.apply(this, arguments) / 2, rr = X > Rr && (n ? +n.apply(this, arguments) : mn(f * f + v * v)), or = wl(fp(v - f) / 2, +e.apply(this, arguments)), cr = or, B = or, F, V;
      if (rr > Rr) {
        var m = vp(rr / f * $t(X)), R = vp(rr / v * $t(X));
        (N -= m * 2) > Rr ? (m *= p ? 1 : -1, x += m, A -= m) : (N = 0, x = A = (h + g) / 2), (z -= R * 2) > Rr ? (R *= p ? 1 : -1, y += R, S -= R) : (z = 0, y = S = (h + g) / 2);
      }
      var E = v * we(y), M = v * $t(y), L = f * we(A), b = f * $t(A);
      if (or > Rr) {
        var w = v * we(S), T = v * $t(S), C = f * we(x), P = f * $t(x), D;
        if ($ < si && (D = cM(E, M, C, P, w, T, L, b))) {
          var Q = E - D[0], tr = M - D[1], er = w - D[0], nr = T - D[1], pt = 1 / $t(aM((Q * er + tr * nr) / (mn(Q * Q + tr * tr) * mn(er * er + nr * nr))) / 2), re = mn(D[0] * D[0] + D[1] * D[1]);
          cr = wl(or, (f - re) / (pt - 1)), B = wl(or, (v - re) / (pt + 1));
        }
      }
      z > Rr ? B > Rr ? (F = Qi(C, P, E, M, v, B, p), V = Qi(w, T, L, b, v, B, p), s.moveTo(F.cx + F.x01, F.cy + F.y01), B < or ? s.arc(F.cx, F.cy, B, wr(F.y01, F.x01), wr(V.y01, V.x01), !p) : (s.arc(F.cx, F.cy, B, wr(F.y01, F.x01), wr(F.y11, F.x11), !p), s.arc(0, 0, v, wr(F.cy + F.y11, F.cx + F.x11), wr(V.cy + V.y11, V.cx + V.x11), !p), s.arc(V.cx, V.cy, B, wr(V.y11, V.x11), wr(V.y01, V.x01), !p))) : (s.moveTo(E, M), s.arc(0, 0, v, y, S, !p)) : s.moveTo(E, M), !(f > Rr) || !(N > Rr) ? s.lineTo(L, b) : cr > Rr ? (F = Qi(L, b, w, T, f, -cr, p), V = Qi(E, M, C, P, f, -cr, p), s.lineTo(F.cx + F.x01, F.cy + F.y01), cr < or ? s.arc(F.cx, F.cy, cr, wr(F.y01, F.x01), wr(V.y01, V.x01), !p) : (s.arc(F.cx, F.cy, cr, wr(F.y01, F.x01), wr(F.y11, F.x11), !p), s.arc(0, 0, f, wr(F.cy + F.y11, F.cx + F.x11), wr(V.cy + V.y11, V.cx + V.x11), p), s.arc(V.cx, V.cy, cr, wr(V.y11, V.x11), wr(V.y01, V.x01), !p))) : s.arc(0, 0, f, A, x, p);
    }
    if (s.closePath(), l)
      return s = null, l + "" || null;
  }
  return u.centroid = function() {
    var l = (+r.apply(this, arguments) + +t.apply(this, arguments)) / 2, c = (+a.apply(this, arguments) + +i.apply(this, arguments)) / 2 - si / 2;
    return [we(c) * l, $t(c) * l];
  }, u.innerRadius = function(l) {
    return arguments.length ? (r = typeof l == "function" ? l : bt(+l), u) : r;
  }, u.outerRadius = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : bt(+l), u) : t;
  }, u.cornerRadius = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : bt(+l), u) : e;
  }, u.padRadius = function(l) {
    return arguments.length ? (n = l == null ? null : typeof l == "function" ? l : bt(+l), u) : n;
  }, u.startAngle = function(l) {
    return arguments.length ? (a = typeof l == "function" ? l : bt(+l), u) : a;
  }, u.endAngle = function(l) {
    return arguments.length ? (i = typeof l == "function" ? l : bt(+l), u) : i;
  }, u.padAngle = function(l) {
    return arguments.length ? (o = typeof l == "function" ? l : bt(+l), u) : o;
  }, u.context = function(l) {
    return arguments.length ? (s = l ?? null, u) : s;
  }, u;
}
var fM = Array.prototype.slice;
function vM(r) {
  return r[0];
}
function hM(r) {
  return r[1];
}
function dM(r) {
  return r.source;
}
function gM(r) {
  return r.target;
}
function pM(r) {
  var t = dM, e = gM, n = vM, a = hM, i = null;
  function o() {
    var s, u = fM.call(arguments), l = t.apply(this, u), c = e.apply(this, u);
    if (i || (i = s = Oh()), r(i, +n.apply(this, (u[0] = l, u)), +a.apply(this, u), +n.apply(this, (u[0] = c, u)), +a.apply(this, u)), s)
      return i = null, s + "" || null;
  }
  return o.source = function(s) {
    return arguments.length ? (t = s, o) : t;
  }, o.target = function(s) {
    return arguments.length ? (e = s, o) : e;
  }, o.x = function(s) {
    return arguments.length ? (n = typeof s == "function" ? s : bt(+s), o) : n;
  }, o.y = function(s) {
    return arguments.length ? (a = typeof s == "function" ? s : bt(+s), o) : a;
  }, o.context = function(s) {
    return arguments.length ? (i = s ?? null, o) : i;
  }, o;
}
function $M(r, t, e, n, a) {
  r.moveTo(t, e), r.bezierCurveTo(t = (t + n) / 2, e, t, a, n, a);
}
function yM() {
  return pM($M);
}
const ro = (r) => () => r;
function mM(r, {
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
function Bt(r, t, e) {
  this.k = r, this.x = t, this.y = e;
}
Bt.prototype = {
  constructor: Bt,
  scale: function(r) {
    return r === 1 ? this : new Bt(this.k * r, this.x, this.y);
  },
  translate: function(r, t) {
    return r === 0 & t === 0 ? this : new Bt(this.k, this.x + this.k * r, this.y + this.k * t);
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
var _h = new Bt(1, 0, 0);
Bt.prototype;
function Sl(r) {
  r.stopImmediatePropagation();
}
function ba(r) {
  r.preventDefault(), r.stopImmediatePropagation();
}
function bM(r) {
  return (!r.ctrlKey || r.type === "wheel") && !r.button;
}
function wM() {
  var r = this;
  return r instanceof SVGElement ? (r = r.ownerSVGElement || r, r.hasAttribute("viewBox") ? (r = r.viewBox.baseVal, [[r.x, r.y], [r.x + r.width, r.y + r.height]]) : [[0, 0], [r.width.baseVal.value, r.height.baseVal.value]]) : [[0, 0], [r.clientWidth, r.clientHeight]];
}
function hp() {
  return this.__zoom || _h;
}
function SM(r) {
  return -r.deltaY * (r.deltaMode === 1 ? 0.05 : r.deltaMode ? 1 : 2e-3) * (r.ctrlKey ? 10 : 1);
}
function EM() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function TM(r, t, e) {
  var n = r.invertX(t[0][0]) - e[0][0], a = r.invertX(t[1][0]) - e[1][0], i = r.invertY(t[0][1]) - e[0][1], o = r.invertY(t[1][1]) - e[1][1];
  return r.translate(
    a > n ? (n + a) / 2 : Math.min(0, n) || Math.max(0, a),
    o > i ? (i + o) / 2 : Math.min(0, i) || Math.max(0, o)
  );
}
function US() {
  var r = bM, t = wM, e = TM, n = SM, a = EM, i = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, u = zC, l = mh("start", "zoom", "end"), c, f, v, h = 500, g = 150, $ = 0, p = 10;
  function y(m) {
    m.property("__zoom", hp).on("wheel.zoom", rr).on("mousedown.zoom", or).on("dblclick.zoom", cr).filter(a).on("touchstart.zoom", B).on("touchmove.zoom", F).on("touchend.zoom touchcancel.zoom", V).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(m, R, E, M) {
    var L = m.selection ? m.selection() : m;
    L.property("__zoom", hp), m !== L ? N(m, R, E, M) : L.interrupt().each(function() {
      z(this, arguments).event(M).start().zoom(null, typeof R == "function" ? R.apply(this, arguments) : R).end();
    });
  }, y.scaleBy = function(m, R, E, M) {
    y.scaleTo(m, function() {
      var L = this.__zoom.k, b = typeof R == "function" ? R.apply(this, arguments) : R;
      return L * b;
    }, E, M);
  }, y.scaleTo = function(m, R, E, M) {
    y.transform(m, function() {
      var L = t.apply(this, arguments), b = this.__zoom, w = E == null ? A(L) : typeof E == "function" ? E.apply(this, arguments) : E, T = b.invert(w), C = typeof R == "function" ? R.apply(this, arguments) : R;
      return e(x(S(b, C), w, T), L, o);
    }, E, M);
  }, y.translateBy = function(m, R, E, M) {
    y.transform(m, function() {
      return e(this.__zoom.translate(
        typeof R == "function" ? R.apply(this, arguments) : R,
        typeof E == "function" ? E.apply(this, arguments) : E
      ), t.apply(this, arguments), o);
    }, null, M);
  }, y.translateTo = function(m, R, E, M, L) {
    y.transform(m, function() {
      var b = t.apply(this, arguments), w = this.__zoom, T = M == null ? A(b) : typeof M == "function" ? M.apply(this, arguments) : M;
      return e(_h.translate(T[0], T[1]).scale(w.k).translate(
        typeof R == "function" ? -R.apply(this, arguments) : -R,
        typeof E == "function" ? -E.apply(this, arguments) : -E
      ), b, o);
    }, M, L);
  };
  function S(m, R) {
    return R = Math.max(i[0], Math.min(i[1], R)), R === m.k ? m : new Bt(R, m.x, m.y);
  }
  function x(m, R, E) {
    var M = R[0] - E[0] * m.k, L = R[1] - E[1] * m.k;
    return M === m.x && L === m.y ? m : new Bt(m.k, M, L);
  }
  function A(m) {
    return [(+m[0][0] + +m[1][0]) / 2, (+m[0][1] + +m[1][1]) / 2];
  }
  function N(m, R, E, M) {
    m.on("start.zoom", function() {
      z(this, arguments).event(M).start();
    }).on("interrupt.zoom end.zoom", function() {
      z(this, arguments).event(M).end();
    }).tween("zoom", function() {
      var L = this, b = arguments, w = z(L, b).event(M), T = t.apply(L, b), C = E == null ? A(T) : typeof E == "function" ? E.apply(L, b) : E, P = Math.max(T[1][0] - T[0][0], T[1][1] - T[0][1]), D = L.__zoom, Q = typeof R == "function" ? R.apply(L, b) : R, tr = u(D.invert(C).concat(P / D.k), Q.invert(C).concat(P / Q.k));
      return function(er) {
        if (er === 1)
          er = Q;
        else {
          var nr = tr(er), pt = P / nr[2];
          er = new Bt(pt, C[0] - nr[0] * pt, C[1] - nr[1] * pt);
        }
        w.zoom(null, er);
      };
    });
  }
  function z(m, R, E) {
    return !E && m.__zooming || new X(m, R);
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
        new mM(m, {
          sourceEvent: this.sourceEvent,
          target: y,
          type: m,
          transform: this.that.__zoom,
          dispatch: l
        }),
        R
      );
    }
  };
  function rr(m, ...R) {
    if (!r.apply(this, arguments))
      return;
    var E = z(this, R).event(m), M = this.__zoom, L = Math.max(i[0], Math.min(i[1], M.k * Math.pow(2, n.apply(this, arguments)))), b = me(m);
    if (E.wheel)
      (E.mouse[0][0] !== b[0] || E.mouse[0][1] !== b[1]) && (E.mouse[1] = M.invert(E.mouse[0] = b)), clearTimeout(E.wheel);
    else {
      if (M.k === L)
        return;
      E.mouse = [b, M.invert(b)], Xo(this), E.start();
    }
    ba(m), E.wheel = setTimeout(w, g), E.zoom("mouse", e(x(S(M, L), E.mouse[0], E.mouse[1]), E.extent, o));
    function w() {
      E.wheel = null, E.end();
    }
  }
  function or(m, ...R) {
    if (v || !r.apply(this, arguments))
      return;
    var E = z(this, R, !0).event(m), M = yr(m.view).on("mousemove.zoom", C, !0).on("mouseup.zoom", P, !0), L = me(m, b), b = m.currentTarget, w = m.clientX, T = m.clientY;
    lC(m.view), Sl(m), E.mouse = [L, this.__zoom.invert(L)], Xo(this), E.start();
    function C(D) {
      if (ba(D), !E.moved) {
        var Q = D.clientX - w, tr = D.clientY - T;
        E.moved = Q * Q + tr * tr > $;
      }
      E.event(D).zoom("mouse", e(x(E.that.__zoom, E.mouse[0] = me(D, b), E.mouse[1]), E.extent, o));
    }
    function P(D) {
      M.on("mousemove.zoom mouseup.zoom", null), cC(D.view, E.moved), ba(D), E.event(D).end();
    }
  }
  function cr(m, ...R) {
    if (r.apply(this, arguments)) {
      var E = this.__zoom, M = me(m.changedTouches ? m.changedTouches[0] : m, this), L = E.invert(M), b = E.k * (m.shiftKey ? 0.5 : 2), w = e(x(S(E, b), M, L), t.apply(this, R), o);
      ba(m), s > 0 ? yr(this).transition().duration(s).call(N, w, M, m) : yr(this).call(y.transform, w, M, m);
    }
  }
  function B(m, ...R) {
    if (r.apply(this, arguments)) {
      var E = m.touches, M = E.length, L = z(this, R, m.changedTouches.length === M).event(m), b, w, T, C;
      for (Sl(m), w = 0; w < M; ++w)
        T = E[w], C = me(T, this), C = [C, this.__zoom.invert(C), T.identifier], L.touch0 ? !L.touch1 && L.touch0[2] !== C[2] && (L.touch1 = C, L.taps = 0) : (L.touch0 = C, b = !0, L.taps = 1 + !!c);
      c && (c = clearTimeout(c)), b && (L.taps < 2 && (f = C[0], c = setTimeout(function() {
        c = null;
      }, h)), Xo(this), L.start());
    }
  }
  function F(m, ...R) {
    if (this.__zooming) {
      var E = z(this, R).event(m), M = m.changedTouches, L = M.length, b, w, T, C;
      for (ba(m), b = 0; b < L; ++b)
        w = M[b], T = me(w, this), E.touch0 && E.touch0[2] === w.identifier ? E.touch0[0] = T : E.touch1 && E.touch1[2] === w.identifier && (E.touch1[0] = T);
      if (w = E.that.__zoom, E.touch1) {
        var P = E.touch0[0], D = E.touch0[1], Q = E.touch1[0], tr = E.touch1[1], er = (er = Q[0] - P[0]) * er + (er = Q[1] - P[1]) * er, nr = (nr = tr[0] - D[0]) * nr + (nr = tr[1] - D[1]) * nr;
        w = S(w, Math.sqrt(er / nr)), T = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2], C = [(D[0] + tr[0]) / 2, (D[1] + tr[1]) / 2];
      } else if (E.touch0)
        T = E.touch0[0], C = E.touch0[1];
      else
        return;
      E.zoom("touch", e(x(w, T, C), E.extent, o));
    }
  }
  function V(m, ...R) {
    if (this.__zooming) {
      var E = z(this, R).event(m), M = m.changedTouches, L = M.length, b, w;
      for (Sl(m), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, h), b = 0; b < L; ++b)
        w = M[b], E.touch0 && E.touch0[2] === w.identifier ? delete E.touch0 : E.touch1 && E.touch1[2] === w.identifier && delete E.touch1;
      if (E.touch1 && !E.touch0 && (E.touch0 = E.touch1, delete E.touch1), E.touch0)
        E.touch0[1] = this.__zoom.invert(E.touch0[0]);
      else if (E.end(), E.taps === 2 && (w = me(w, this), Math.hypot(f[0] - w[0], f[1] - w[1]) < p)) {
        var T = yr(this).on("dblclick.zoom");
        T && T.apply(this, arguments);
      }
    }
  }
  return y.wheelDelta = function(m) {
    return arguments.length ? (n = typeof m == "function" ? m : ro(+m), y) : n;
  }, y.filter = function(m) {
    return arguments.length ? (r = typeof m == "function" ? m : ro(!!m), y) : r;
  }, y.touchable = function(m) {
    return arguments.length ? (a = typeof m == "function" ? m : ro(!!m), y) : a;
  }, y.extent = function(m) {
    return arguments.length ? (t = typeof m == "function" ? m : ro([[+m[0][0], +m[0][1]], [+m[1][0], +m[1][1]]]), y) : t;
  }, y.scaleExtent = function(m) {
    return arguments.length ? (i[0] = +m[0], i[1] = +m[1], y) : [i[0], i[1]];
  }, y.translateExtent = function(m) {
    return arguments.length ? (o[0][0] = +m[0][0], o[1][0] = +m[1][0], o[0][1] = +m[0][1], o[1][1] = +m[1][1], y) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, y.constrain = function(m) {
    return arguments.length ? (e = m, y) : e;
  }, y.duration = function(m) {
    return arguments.length ? (s = +m, y) : s;
  }, y.interpolate = function(m) {
    return arguments.length ? (u = m, y) : u;
  }, y.on = function() {
    var m = l.on.apply(l, arguments);
    return m === l ? y : m;
  }, y.clickDistance = function(m) {
    return arguments.length ? ($ = (m = +m) * m, y) : Math.sqrt($);
  }, y.tapDistance = function(m) {
    return arguments.length ? (p = +m, y) : p;
  }, y;
}
class su {
  constructor() {
    this.width = 800, this.height = 800, this.enableTooltips = !0;
  }
}
var Xf;
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
})(Xf || (Xf = {}));
const zS = class Jf {
  constructor(t, e, n, a, i) {
    this._parent = t, this._leftChild = e, this._rightChild = n, this.values = a, this.height = i, this.id = Jf.currentID, Jf.currentID++;
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
zS.currentID = 0;
let Zo = zS;
class xM {
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
    const n = new Zo(null, this.treeNode, t.treeNode, this.elements.slice(), e);
    this.treeNode.parent = n, t.treeNode.parent = n, this.treeNode = n;
  }
}
class IM {
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
    if (Zo.currentID = 0, t.length < 1)
      return new Zo(null, null, null, [], 0);
    let e = /* @__PURE__ */ new Map(), n = [];
    for (let o = 0; o < t.length; o++) {
      let s = t[o].values;
      e.set(o, new xM([t[o]], o, new Zo(null, null, null, [t[o]], 0))), n.push(s);
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
          let p = (l.elements.length * g + c.elements.length * $) / (l.elements.length + c.elements.length);
          h > s ? v[h][s] = p : v[s][h] = p;
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
class OM {
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
class AM {
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
class dp extends su {
  constructor() {
    super(...arguments), this.initialTextWidth = 100, this.initialTextHeight = 100, this.squarePadding = 2, this.visualizationTextPadding = 4, this.fontSize = 14, this.labelColor = "#404040", this.highlightSelection = !0, this.highlightFontSize = 16, this.highlightFontColor = "black", this.className = "heatmap", this.animationsEnabled = !0, this.animationDuration = 2e3, this.transition = Xf.easeInEaseOutCubic, this.minColor = "#EEEEEE", this.maxColor = "#1565C0", this.colorBuckets = 50, this.dendrogramEnabled = !1, this.dendrogramWidth = 100, this.dendrogramLineWidth = 1, this.dendrogramColor = "#404040", this.clusteringAlgorithm = new IM(new OM()), this.reorderer = new AM(), this.getTooltip = (t, e, n) => `
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
class gp {
  constructor(t, e) {
    this.values = t, this.id = e;
  }
}
class pp {
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
    const i = Eh(Le(e), Le(n)), s = ke().domain([0, 1]).range([0, 1]).ticks(a), u = jS().domain([0, 1]).range(s);
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
var to = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, wa = function(r) {
  return r && r.Math === Math && r;
}, _ = (
  // eslint-disable-next-line es/no-global-this -- safe
  wa(typeof globalThis == "object" && globalThis) || wa(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
  wa(typeof self == "object" && self) || wa(typeof to == "object" && to) || wa(typeof to == "object" && to) || // eslint-disable-next-line no-new-func -- fallback
  function() {
    return this;
  }() || Function("return this")()
), Sr = {}, I = function(r) {
  try {
    return !!r();
  } catch {
    return !0;
  }
}, RM = I, j = !RM(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] !== 7;
}), _M = I, mi = !_M(function() {
  var r = (function() {
  }).bind();
  return typeof r != "function" || r.hasOwnProperty("prototype");
}), CM = mi, eo = Function.prototype.call, U = CM ? eo.bind(eo) : function() {
  return eo.apply(eo, arguments);
}, bi = {}, VS = {}.propertyIsEnumerable, GS = Object.getOwnPropertyDescriptor, PM = GS && !VS.call({ 1: 2 }, 1);
bi.f = PM ? function(t) {
  var e = GS(this, t);
  return !!e && e.enumerable;
} : VS;
var Qr = function(r, t) {
  return {
    enumerable: !(r & 1),
    configurable: !(r & 2),
    writable: !(r & 4),
    value: t
  };
}, HS = mi, WS = Function.prototype, Zf = WS.call, MM = HS && WS.bind.bind(Zf, Zf), O = HS ? MM : function(r) {
  return function() {
    return Zf.apply(r, arguments);
  };
}, qS = O, NM = qS({}.toString), DM = qS("".slice), Er = function(r) {
  return DM(NM(r), 8, -1);
}, LM = O, FM = I, kM = Er, El = Object, BM = LM("".split), Jn = FM(function() {
  return !El("z").propertyIsEnumerable(0);
}) ? function(r) {
  return kM(r) === "String" ? BM(r, "") : El(r);
} : El, Nr = function(r) {
  return r == null;
}, jM = Nr, UM = TypeError, sr = function(r) {
  if (jM(r))
    throw new UM("Can't call method on " + r);
  return r;
}, zM = Jn, VM = sr, gr = function(r) {
  return zM(VM(r));
}, Tl = typeof document == "object" && document.all, Y = typeof Tl > "u" && Tl !== void 0 ? function(r) {
  return typeof r == "function" || r === Tl;
} : function(r) {
  return typeof r == "function";
}, GM = Y, H = function(r) {
  return typeof r == "object" ? r !== null : GM(r);
}, xl = _, HM = Y, WM = function(r) {
  return HM(r) ? r : void 0;
}, ar = function(r, t) {
  return arguments.length < 2 ? WM(xl[r]) : xl[r] && xl[r][t];
}, qM = O, Dr = qM({}.isPrototypeOf), YM = _, $p = YM.navigator, yp = $p && $p.userAgent, Rt = yp ? String(yp) : "", YS = _, Il = Rt, mp = YS.process, bp = YS.Deno, wp = mp && mp.versions || bp && bp.version, Sp = wp && wp.v8, st, Is;
Sp && (st = Sp.split("."), Is = st[0] > 0 && st[0] < 4 ? 1 : +(st[0] + st[1]));
!Is && Il && (st = Il.match(/Edge\/(\d+)/), (!st || st[1] >= 74) && (st = Il.match(/Chrome\/(\d+)/), st && (Is = +st[1])));
var qt = Is, Ep = qt, KM = I, XM = _, JM = XM.String, Zn = !!Object.getOwnPropertySymbols && !KM(function() {
  var r = Symbol("symbol detection");
  return !JM(r) || !(Object(r) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && Ep && Ep < 41;
}), ZM = Zn, KS = ZM && !Symbol.sham && typeof Symbol.iterator == "symbol", QM = ar, rN = Y, tN = Dr, eN = KS, nN = Object, Ve = eN ? function(r) {
  return typeof r == "symbol";
} : function(r) {
  var t = QM("Symbol");
  return rN(t) && tN(t.prototype, nN(r));
}, aN = String, Ge = function(r) {
  try {
    return aN(r);
  } catch {
    return "Object";
  }
}, iN = Y, oN = Ge, sN = TypeError, J = function(r) {
  if (iN(r))
    return r;
  throw new sN(oN(r) + " is not a function");
}, uN = J, lN = Nr, _t = function(r, t) {
  var e = r[t];
  return lN(e) ? void 0 : uN(e);
}, Ol = U, Al = Y, Rl = H, cN = TypeError, XS = function(r, t) {
  var e, n;
  if (t === "string" && Al(e = r.toString) && !Rl(n = Ol(e, r)) || Al(e = r.valueOf) && !Rl(n = Ol(e, r)) || t !== "string" && Al(e = r.toString) && !Rl(n = Ol(e, r)))
    return n;
  throw new cN("Can't convert object to primitive value");
}, JS = { exports: {} }, Yt = !1, Tp = _, fN = Object.defineProperty, Ch = function(r, t) {
  try {
    fN(Tp, r, { value: t, configurable: !0, writable: !0 });
  } catch {
    Tp[r] = t;
  }
  return t;
}, vN = _, hN = Ch, xp = "__core-js_shared__", Ip = JS.exports = vN[xp] || hN(xp, {});
(Ip.versions || (Ip.versions = [])).push({
  version: "3.41.0",
  mode: "global",
  copyright: "© 2014-2025 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.41.0/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var Ph = JS.exports, Op = Ph, Qn = function(r, t) {
  return Op[r] || (Op[r] = t || {});
}, dN = sr, gN = Object, Z = function(r) {
  return gN(dN(r));
}, pN = O, $N = Z, yN = pN({}.hasOwnProperty), K = Object.hasOwn || function(t, e) {
  return yN($N(t), e);
}, mN = O, bN = 0, wN = Math.random(), SN = mN(1 .toString), ra = function(r) {
  return "Symbol(" + (r === void 0 ? "" : r) + ")_" + SN(++bN + wN, 36);
}, EN = _, TN = Qn, Ap = K, xN = ra, IN = Zn, ON = KS, bn = EN.Symbol, _l = TN("wks"), AN = ON ? bn.for || bn : bn && bn.withoutSetter || xN, W = function(r) {
  return Ap(_l, r) || (_l[r] = IN && Ap(bn, r) ? bn[r] : AN("Symbol." + r)), _l[r];
}, RN = U, Rp = H, _p = Ve, _N = _t, CN = XS, PN = W, MN = TypeError, NN = PN("toPrimitive"), uu = function(r, t) {
  if (!Rp(r) || _p(r))
    return r;
  var e = _N(r, NN), n;
  if (e) {
    if (t === void 0 && (t = "default"), n = RN(e, r, t), !Rp(n) || _p(n))
      return n;
    throw new MN("Can't convert object to primitive value");
  }
  return t === void 0 && (t = "number"), CN(r, t);
}, DN = uu, LN = Ve, de = function(r) {
  var t = DN(r, "string");
  return LN(t) ? t : t + "";
}, FN = _, Cp = H, Qf = FN.document, kN = Cp(Qf) && Cp(Qf.createElement), lu = function(r) {
  return kN ? Qf.createElement(r) : {};
}, BN = j, jN = I, UN = lu, ZS = !BN && !jN(function() {
  return Object.defineProperty(UN("div"), "a", {
    get: function() {
      return 7;
    }
  }).a !== 7;
}), zN = j, VN = U, GN = bi, HN = Qr, WN = gr, qN = de, YN = K, KN = ZS, Pp = Object.getOwnPropertyDescriptor;
Sr.f = zN ? Pp : function(t, e) {
  if (t = WN(t), e = qN(e), KN)
    try {
      return Pp(t, e);
    } catch {
    }
  if (YN(t, e))
    return HN(!VN(GN.f, t, e), t[e]);
};
var ur = {}, XN = j, JN = I, QS = XN && JN(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: !1
  }).prototype !== 42;
}), ZN = H, QN = String, rD = TypeError, k = function(r) {
  if (ZN(r))
    return r;
  throw new rD(QN(r) + " is not an object");
}, tD = j, eD = ZS, nD = QS, no = k, Mp = de, aD = TypeError, Cl = Object.defineProperty, iD = Object.getOwnPropertyDescriptor, Pl = "enumerable", Ml = "configurable", Nl = "writable";
ur.f = tD ? nD ? function(t, e, n) {
  if (no(t), e = Mp(e), no(n), typeof t == "function" && e === "prototype" && "value" in n && Nl in n && !n[Nl]) {
    var a = iD(t, e);
    a && a[Nl] && (t[e] = n.value, n = {
      configurable: Ml in n ? n[Ml] : a[Ml],
      enumerable: Pl in n ? n[Pl] : a[Pl],
      writable: !1
    });
  }
  return Cl(t, e, n);
} : Cl : function(t, e, n) {
  if (no(t), e = Mp(e), no(n), eD)
    try {
      return Cl(t, e, n);
    } catch {
    }
  if ("get" in n || "set" in n)
    throw new aD("Accessors not supported");
  return "value" in n && (t[e] = n.value), t;
};
var oD = j, sD = ur, uD = Qr, Tr = oD ? function(r, t, e) {
  return sD.f(r, t, uD(1, e));
} : function(r, t, e) {
  return r[t] = e, r;
}, rE = { exports: {} }, rv = j, lD = K, tE = Function.prototype, cD = rv && Object.getOwnPropertyDescriptor, Mh = lD(tE, "name"), fD = Mh && (function() {
}).name === "something", vD = Mh && (!rv || rv && cD(tE, "name").configurable), ta = {
  EXISTS: Mh,
  PROPER: fD,
  CONFIGURABLE: vD
}, hD = O, dD = Y, tv = Ph, gD = hD(Function.toString);
dD(tv.inspectSource) || (tv.inspectSource = function(r) {
  return gD(r);
});
var Nh = tv.inspectSource, pD = _, $D = Y, Np = pD.WeakMap, eE = $D(Np) && /native code/.test(String(Np)), yD = Qn, mD = ra, Dp = yD("keys"), cu = function(r) {
  return Dp[r] || (Dp[r] = mD(r));
}, wi = {}, bD = eE, nE = _, wD = H, SD = Tr, Dl = K, Ll = Ph, ED = cu, TD = wi, Lp = "Object already initialized", ev = nE.TypeError, xD = nE.WeakMap, Os, ui, As, ID = function(r) {
  return As(r) ? ui(r) : Os(r, {});
}, OD = function(r) {
  return function(t) {
    var e;
    if (!wD(t) || (e = ui(t)).type !== r)
      throw new ev("Incompatible receiver, " + r + " required");
    return e;
  };
};
if (bD || Ll.state) {
  var yt = Ll.state || (Ll.state = new xD());
  yt.get = yt.get, yt.has = yt.has, yt.set = yt.set, Os = function(r, t) {
    if (yt.has(r))
      throw new ev(Lp);
    return t.facade = r, yt.set(r, t), t;
  }, ui = function(r) {
    return yt.get(r) || {};
  }, As = function(r) {
    return yt.has(r);
  };
} else {
  var tn = ED("state");
  TD[tn] = !0, Os = function(r, t) {
    if (Dl(r, tn))
      throw new ev(Lp);
    return t.facade = r, SD(r, tn, t), t;
  }, ui = function(r) {
    return Dl(r, tn) ? r[tn] : {};
  }, As = function(r) {
    return Dl(r, tn);
  };
}
var vr = {
  set: Os,
  get: ui,
  has: As,
  enforce: ID,
  getterFor: OD
}, Dh = O, AD = I, RD = Y, ao = K, nv = j, _D = ta.CONFIGURABLE, CD = Nh, aE = vr, PD = aE.enforce, MD = aE.get, Fp = String, Qo = Object.defineProperty, ND = Dh("".slice), DD = Dh("".replace), LD = Dh([].join), FD = nv && !AD(function() {
  return Qo(function() {
  }, "length", { value: 8 }).length !== 8;
}), kD = String(String).split("String"), BD = rE.exports = function(r, t, e) {
  ND(Fp(t), 0, 7) === "Symbol(" && (t = "[" + DD(Fp(t), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), e && e.getter && (t = "get " + t), e && e.setter && (t = "set " + t), (!ao(r, "name") || _D && r.name !== t) && (nv ? Qo(r, "name", { value: t, configurable: !0 }) : r.name = t), FD && e && ao(e, "arity") && r.length !== e.arity && Qo(r, "length", { value: e.arity });
  try {
    e && ao(e, "constructor") && e.constructor ? nv && Qo(r, "prototype", { writable: !1 }) : r.prototype && (r.prototype = void 0);
  } catch {
  }
  var n = PD(r);
  return ao(n, "source") || (n.source = LD(kD, typeof t == "string" ? t : "")), r;
};
Function.prototype.toString = BD(function() {
  return RD(this) && MD(this).source || CD(this);
}, "toString");
var Lh = rE.exports, jD = Y, UD = ur, zD = Lh, VD = Ch, lr = function(r, t, e, n) {
  n || (n = {});
  var a = n.enumerable, i = n.name !== void 0 ? n.name : t;
  if (jD(e) && zD(e, i, n), n.global)
    a ? r[t] = e : VD(t, e);
  else {
    try {
      n.unsafe ? r[t] && (a = !0) : delete r[t];
    } catch {
    }
    a ? r[t] = e : UD.f(r, t, {
      value: e,
      enumerable: !1,
      configurable: !n.nonConfigurable,
      writable: !n.nonWritable
    });
  }
  return r;
}, ge = {}, GD = Math.ceil, HD = Math.floor, iE = Math.trunc || function(t) {
  var e = +t;
  return (e > 0 ? HD : GD)(e);
}, WD = iE, fr = function(r) {
  var t = +r;
  return t !== t || t === 0 ? 0 : WD(t);
}, qD = fr, YD = Math.max, KD = Math.min, Kt = function(r, t) {
  var e = qD(r);
  return e < 0 ? YD(e + t, 0) : KD(e, t);
}, XD = fr, JD = Math.min, Ur = function(r) {
  var t = XD(r);
  return t > 0 ? JD(t, 9007199254740991) : 0;
}, ZD = Ur, ir = function(r) {
  return ZD(r.length);
}, QD = gr, rL = Kt, tL = ir, kp = function(r) {
  return function(t, e, n) {
    var a = QD(t), i = tL(a);
    if (i === 0)
      return !r && -1;
    var o = rL(n, i), s;
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
}, Si = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: kp(!0),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: kp(!1)
}, eL = O, Fl = K, nL = gr, aL = Si.indexOf, iL = wi, Bp = eL([].push), oE = function(r, t) {
  var e = nL(r), n = 0, a = [], i;
  for (i in e)
    !Fl(iL, i) && Fl(e, i) && Bp(a, i);
  for (; t.length > n; )
    Fl(e, i = t[n++]) && (~aL(a, i) || Bp(a, i));
  return a;
}, Fh = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
], oL = oE, sL = Fh, uL = sL.concat("length", "prototype");
ge.f = Object.getOwnPropertyNames || function(t) {
  return oL(t, uL);
};
var Ei = {};
Ei.f = Object.getOwnPropertySymbols;
var lL = ar, cL = O, fL = ge, vL = Ei, hL = k, dL = cL([].concat), kh = lL("Reflect", "ownKeys") || function(t) {
  var e = fL.f(hL(t)), n = vL.f;
  return n ? dL(e, n(t)) : e;
}, jp = K, gL = kh, pL = Sr, $L = ur, Ti = function(r, t, e) {
  for (var n = gL(t), a = $L.f, i = pL.f, o = 0; o < n.length; o++) {
    var s = n[o];
    !jp(r, s) && !(e && jp(e, s)) && a(r, s, i(t, s));
  }
}, yL = I, mL = Y, bL = /#|\.prototype\./, xi = function(r, t) {
  var e = SL[wL(r)];
  return e === TL ? !0 : e === EL ? !1 : mL(t) ? yL(t) : !!t;
}, wL = xi.normalize = function(r) {
  return String(r).replace(bL, ".").toLowerCase();
}, SL = xi.data = {}, EL = xi.NATIVE = "N", TL = xi.POLYFILL = "P", Ii = xi, io = _, xL = Sr.f, IL = Tr, OL = lr, AL = Ch, RL = Ti, _L = Ii, d = function(r, t) {
  var e = r.target, n = r.global, a = r.stat, i, o, s, u, l, c;
  if (n ? o = io : a ? o = io[e] || AL(e, {}) : o = io[e] && io[e].prototype, o)
    for (s in t) {
      if (l = t[s], r.dontCallGetSet ? (c = xL(o, s), u = c && c.value) : u = o[s], i = _L(n ? s : e + (a ? "." : "#") + s, r.forced), !i && u !== void 0) {
        if (typeof l == typeof u)
          continue;
        RL(l, u);
      }
      (r.sham || u && u.sham) && IL(l, "sham", !0), OL(o, s, l, r);
    }
}, CL = W, PL = CL("toStringTag"), sE = {};
sE[PL] = "z";
var Bh = String(sE) === "[object z]", ML = Bh, NL = Y, rs = Er, DL = W, LL = DL("toStringTag"), FL = Object, kL = rs(function() {
  return arguments;
}()) === "Arguments", BL = function(r, t) {
  try {
    return r[t];
  } catch {
  }
}, vt = ML ? rs : function(r) {
  var t, e, n;
  return r === void 0 ? "Undefined" : r === null ? "Null" : typeof (e = BL(t = FL(r), LL)) == "string" ? e : kL ? rs(t) : (n = rs(t)) === "Object" && NL(t.callee) ? "Arguments" : n;
}, jL = vt, UL = String, G = function(r) {
  if (jL(r) === "Symbol")
    throw new TypeError("Cannot convert a Symbol value to a string");
  return UL(r);
}, fu = {}, zL = oE, VL = Fh, Oi = Object.keys || function(t) {
  return zL(t, VL);
}, GL = j, HL = QS, WL = ur, qL = k, YL = gr, KL = Oi;
fu.f = GL && !HL ? Object.defineProperties : function(t, e) {
  qL(t);
  for (var n = YL(e), a = KL(e), i = a.length, o = 0, s; i > o; )
    WL.f(t, s = a[o++], n[s]);
  return t;
};
var XL = ar, uE = XL("document", "documentElement"), JL = k, ZL = fu, Up = Fh, QL = wi, rF = uE, tF = lu, eF = cu, zp = ">", Vp = "<", av = "prototype", iv = "script", lE = eF("IE_PROTO"), kl = function() {
}, cE = function(r) {
  return Vp + iv + zp + r + Vp + "/" + iv + zp;
}, Gp = function(r) {
  r.write(cE("")), r.close();
  var t = r.parentWindow.Object;
  return r = null, t;
}, nF = function() {
  var r = tF("iframe"), t = "java" + iv + ":", e;
  return r.style.display = "none", rF.appendChild(r), r.src = String(t), e = r.contentWindow.document, e.open(), e.write(cE("document.F=Object")), e.close(), e.F;
}, oo, ts = function() {
  try {
    oo = new ActiveXObject("htmlfile");
  } catch {
  }
  ts = typeof document < "u" ? document.domain && oo ? Gp(oo) : nF() : Gp(oo);
  for (var r = Up.length; r--; )
    delete ts[av][Up[r]];
  return ts();
};
QL[lE] = !0;
var zr = Object.create || function(t, e) {
  var n;
  return t !== null ? (kl[av] = JL(t), n = new kl(), kl[av] = null, n[lE] = t) : n = ts(), e === void 0 ? n : ZL.f(n, e);
}, vu = {}, aF = O, rt = aF([].slice), iF = Er, oF = gr, fE = ge.f, sF = rt, vE = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], uF = function(r) {
  try {
    return fE(r);
  } catch {
    return sF(vE);
  }
};
vu.f = function(t) {
  return vE && iF(t) === "Window" ? uF(t) : fE(oF(t));
};
var Hp = Lh, lF = ur, hr = function(r, t, e) {
  return e.get && Hp(e.get, t, { getter: !0 }), e.set && Hp(e.set, t, { setter: !0 }), lF.f(r, t, e);
}, jh = {}, cF = W;
jh.f = cF;
var fF = _, hE = fF, Wp = hE, vF = K, hF = jh, dF = ur.f, Lr = function(r) {
  var t = Wp.Symbol || (Wp.Symbol = {});
  vF(t, r) || dF(t, r, {
    value: hF.f(r)
  });
}, gF = U, pF = ar, $F = W, yF = lr, dE = function() {
  var r = pF("Symbol"), t = r && r.prototype, e = t && t.valueOf, n = $F("toPrimitive");
  t && !t[n] && yF(t, n, function(a) {
    return gF(e, this);
  }, { arity: 1 });
}, mF = ur.f, bF = K, wF = W, qp = wF("toStringTag"), Fr = function(r, t, e) {
  r && !e && (r = r.prototype), r && !bF(r, qp) && mF(r, qp, { configurable: !0, value: t });
}, SF = Er, EF = O, He = function(r) {
  if (SF(r) === "Function")
    return EF(r);
}, Yp = He, TF = J, xF = mi, IF = Yp(Yp.bind), ht = function(r, t) {
  return TF(r), t === void 0 ? r : xF ? IF(r, t) : function() {
    return r.apply(t, arguments);
  };
}, OF = Er, pe = Array.isArray || function(t) {
  return OF(t) === "Array";
}, AF = O, RF = I, gE = Y, _F = vt, CF = ar, PF = Nh, pE = function() {
}, $E = CF("Reflect", "construct"), Uh = /^\s*(?:class|function)\b/, MF = AF(Uh.exec), NF = !Uh.test(pE), Sa = function(t) {
  if (!gE(t))
    return !1;
  try {
    return $E(pE, [], t), !0;
  } catch {
    return !1;
  }
}, yE = function(t) {
  if (!gE(t))
    return !1;
  switch (_F(t)) {
    case "AsyncFunction":
    case "GeneratorFunction":
    case "AsyncGeneratorFunction":
      return !1;
  }
  try {
    return NF || !!MF(Uh, PF(t));
  } catch {
    return !0;
  }
};
yE.sham = !0;
var ea = !$E || RF(function() {
  var r;
  return Sa(Sa.call) || !Sa(Object) || !Sa(function() {
    r = !0;
  }) || r;
}) ? yE : Sa, Kp = pe, DF = ea, LF = H, FF = W, kF = FF("species"), Xp = Array, BF = function(r) {
  var t;
  return Kp(r) && (t = r.constructor, DF(t) && (t === Xp || Kp(t.prototype)) ? t = void 0 : LF(t) && (t = t[kF], t === null && (t = void 0))), t === void 0 ? Xp : t;
}, jF = BF, Ai = function(r, t) {
  return new (jF(r))(t === 0 ? 0 : t);
}, UF = ht, zF = O, VF = Jn, GF = Z, HF = ir, WF = Ai, Jp = zF([].push), te = function(r) {
  var t = r === 1, e = r === 2, n = r === 3, a = r === 4, i = r === 6, o = r === 7, s = r === 5 || i;
  return function(u, l, c, f) {
    for (var v = GF(u), h = VF(v), g = HF(h), $ = UF(l, c), p = 0, y = f || WF, S = t ? y(u, g) : e || o ? y(u, 0) : void 0, x, A; g > p; p++)
      if ((s || p in h) && (x = h[p], A = $(x, p, v), r))
        if (t)
          S[p] = A;
        else if (A)
          switch (r) {
            case 3:
              return !0;
            case 5:
              return x;
            case 6:
              return p;
            case 2:
              Jp(S, x);
          }
        else
          switch (r) {
            case 4:
              return !1;
            case 7:
              Jp(S, x);
          }
    return i ? -1 : n || a ? a : S;
  };
}, br = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: te(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: te(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: te(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: te(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: te(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: te(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: te(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: te(7)
}, hu = d, Ri = _, zh = U, qF = O, jn = j, Un = Zn, YF = I, dr = K, KF = Dr, ov = k, du = gr, Vh = de, XF = G, sv = Qr, zn = zr, mE = Oi, JF = ge, bE = vu, ZF = Ei, wE = Sr, SE = ur, QF = fu, EE = bi, Bl = lr, rk = hr, Gh = Qn, tk = cu, TE = wi, Zp = ra, ek = W, nk = jh, ak = Lr, ik = dE, ok = Fr, xE = vr, gu = br.forEach, Cr = tk("hidden"), pu = "Symbol", li = "prototype", sk = xE.set, Qp = xE.getterFor(pu), Zr = Object[li], Pe = Ri.Symbol, ja = Pe && Pe[li], uk = Ri.RangeError, lk = Ri.TypeError, jl = Ri.QObject, IE = wE.f, Me = SE.f, OE = bE.f, ck = EE.f, AE = qF([].push), zt = Gh("symbols"), _i = Gh("op-symbols"), fk = Gh("wks"), uv = !jl || !jl[li] || !jl[li].findChild, RE = function(r, t, e) {
  var n = IE(Zr, t);
  n && delete Zr[t], Me(r, t, e), n && r !== Zr && Me(Zr, t, n);
}, lv = jn && YF(function() {
  return zn(Me({}, "a", {
    get: function() {
      return Me(this, "a", { value: 7 }).a;
    }
  })).a !== 7;
}) ? RE : Me, Ul = function(r, t) {
  var e = zt[r] = zn(ja);
  return sk(e, {
    type: pu,
    tag: r,
    description: t
  }), jn || (e.description = t), e;
}, $u = function(t, e, n) {
  t === Zr && $u(_i, e, n), ov(t);
  var a = Vh(e);
  return ov(n), dr(zt, a) ? (n.enumerable ? (dr(t, Cr) && t[Cr][a] && (t[Cr][a] = !1), n = zn(n, { enumerable: sv(0, !1) })) : (dr(t, Cr) || Me(t, Cr, sv(1, zn(null))), t[Cr][a] = !0), lv(t, a, n)) : Me(t, a, n);
}, Hh = function(t, e) {
  ov(t);
  var n = du(e), a = mE(n).concat(PE(n));
  return gu(a, function(i) {
    (!jn || zh(cv, n, i)) && $u(t, i, n[i]);
  }), t;
}, vk = function(t, e) {
  return e === void 0 ? zn(t) : Hh(zn(t), e);
}, cv = function(t) {
  var e = Vh(t), n = zh(ck, this, e);
  return this === Zr && dr(zt, e) && !dr(_i, e) ? !1 : n || !dr(this, e) || !dr(zt, e) || dr(this, Cr) && this[Cr][e] ? n : !0;
}, _E = function(t, e) {
  var n = du(t), a = Vh(e);
  if (!(n === Zr && dr(zt, a) && !dr(_i, a))) {
    var i = IE(n, a);
    return i && dr(zt, a) && !(dr(n, Cr) && n[Cr][a]) && (i.enumerable = !0), i;
  }
}, CE = function(t) {
  var e = OE(du(t)), n = [];
  return gu(e, function(a) {
    !dr(zt, a) && !dr(TE, a) && AE(n, a);
  }), n;
}, PE = function(r) {
  var t = r === Zr, e = OE(t ? _i : du(r)), n = [];
  return gu(e, function(a) {
    dr(zt, a) && (!t || dr(Zr, a)) && AE(n, zt[a]);
  }), n;
};
Un || (Pe = function() {
  if (KF(ja, this))
    throw new lk("Symbol is not a constructor");
  var t = !arguments.length || arguments[0] === void 0 ? void 0 : XF(arguments[0]), e = Zp(t), n = function(a) {
    var i = this === void 0 ? Ri : this;
    i === Zr && zh(n, _i, a), dr(i, Cr) && dr(i[Cr], e) && (i[Cr][e] = !1);
    var o = sv(1, a);
    try {
      lv(i, e, o);
    } catch (s) {
      if (!(s instanceof uk))
        throw s;
      RE(i, e, o);
    }
  };
  return jn && uv && lv(Zr, e, { configurable: !0, set: n }), Ul(e, t);
}, ja = Pe[li], Bl(ja, "toString", function() {
  return Qp(this).tag;
}), Bl(Pe, "withoutSetter", function(r) {
  return Ul(Zp(r), r);
}), EE.f = cv, SE.f = $u, QF.f = Hh, wE.f = _E, JF.f = bE.f = CE, ZF.f = PE, nk.f = function(r) {
  return Ul(ek(r), r);
}, jn && (rk(ja, "description", {
  configurable: !0,
  get: function() {
    return Qp(this).description;
  }
}), Bl(Zr, "propertyIsEnumerable", cv, { unsafe: !0 })));
hu({ global: !0, constructor: !0, wrap: !0, forced: !Un, sham: !Un }, {
  Symbol: Pe
});
gu(mE(fk), function(r) {
  ak(r);
});
hu({ target: pu, stat: !0, forced: !Un }, {
  useSetter: function() {
    uv = !0;
  },
  useSimple: function() {
    uv = !1;
  }
});
hu({ target: "Object", stat: !0, forced: !Un, sham: !jn }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: vk,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $u,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: Hh,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: _E
});
hu({ target: "Object", stat: !0, forced: !Un }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: CE
});
ik();
ok(Pe, pu);
TE[Cr] = !0;
var hk = Zn, ME = hk && !!Symbol.for && !!Symbol.keyFor, dk = d, gk = ar, pk = K, $k = G, NE = Qn, yk = ME, zl = NE("string-to-symbol-registry"), mk = NE("symbol-to-string-registry");
dk({ target: "Symbol", stat: !0, forced: !yk }, {
  for: function(r) {
    var t = $k(r);
    if (pk(zl, t))
      return zl[t];
    var e = gk("Symbol")(t);
    return zl[t] = e, mk[e] = t, e;
  }
});
var bk = d, wk = K, Sk = Ve, Ek = Ge, Tk = Qn, xk = ME, r$ = Tk("symbol-to-string-registry");
bk({ target: "Symbol", stat: !0, forced: !xk }, {
  keyFor: function(t) {
    if (!Sk(t))
      throw new TypeError(Ek(t) + " is not a symbol");
    if (wk(r$, t))
      return r$[t];
  }
});
var Ik = mi, DE = Function.prototype, t$ = DE.apply, e$ = DE.call, tt = typeof Reflect == "object" && Reflect.apply || (Ik ? e$.bind(t$) : function() {
  return e$.apply(t$, arguments);
}), Ok = O, n$ = pe, Ak = Y, a$ = Er, Rk = G, i$ = Ok([].push), _k = function(r) {
  if (Ak(r))
    return r;
  if (n$(r)) {
    for (var t = r.length, e = [], n = 0; n < t; n++) {
      var a = r[n];
      typeof a == "string" ? i$(e, a) : (typeof a == "number" || a$(a) === "Number" || a$(a) === "String") && i$(e, Rk(a));
    }
    var i = e.length, o = !0;
    return function(s, u) {
      if (o)
        return o = !1, u;
      if (n$(this))
        return u;
      for (var l = 0; l < i; l++)
        if (e[l] === s)
          return u;
    };
  }
}, Ck = d, LE = ar, FE = tt, Pk = U, Ci = O, kE = I, o$ = Y, s$ = Ve, BE = rt, Mk = _k, Nk = Zn, Dk = String, ce = LE("JSON", "stringify"), so = Ci(/./.exec), u$ = Ci("".charAt), Lk = Ci("".charCodeAt), Fk = Ci("".replace), kk = Ci(1 .toString), Bk = /[\uD800-\uDFFF]/g, l$ = /^[\uD800-\uDBFF]$/, c$ = /^[\uDC00-\uDFFF]$/, f$ = !Nk || kE(function() {
  var r = LE("Symbol")("stringify detection");
  return ce([r]) !== "[null]" || ce({ a: r }) !== "{}" || ce(Object(r)) !== "{}";
}), v$ = kE(function() {
  return ce("\uDF06\uD834") !== '"\\udf06\\ud834"' || ce("\uDEAD") !== '"\\udead"';
}), jk = function(r, t) {
  var e = BE(arguments), n = Mk(t);
  if (!(!o$(n) && (r === void 0 || s$(r))))
    return e[1] = function(a, i) {
      if (o$(n) && (i = Pk(n, this, Dk(a), i)), !s$(i))
        return i;
    }, FE(ce, null, e);
}, Uk = function(r, t, e) {
  var n = u$(e, t - 1), a = u$(e, t + 1);
  return so(l$, r) && !so(c$, a) || so(c$, r) && !so(l$, n) ? "\\u" + kk(Lk(r, 0), 16) : r;
};
ce && Ck({ target: "JSON", stat: !0, arity: 3, forced: f$ || v$ }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  stringify: function(t, e, n) {
    var a = BE(arguments), i = FE(f$ ? jk : ce, null, a);
    return v$ && typeof i == "string" ? Fk(i, Bk, Uk) : i;
  }
});
var zk = d, Vk = Zn, Gk = I, jE = Ei, Hk = Z, Wk = !Vk || Gk(function() {
  jE.f(1);
});
zk({ target: "Object", stat: !0, forced: Wk }, {
  getOwnPropertySymbols: function(t) {
    var e = jE.f;
    return e ? e(Hk(t)) : [];
  }
});
var qk = d, Yk = j, Kk = _, uo = O, Xk = K, Jk = Y, Zk = Dr, Qk = G, r3 = hr, t3 = Ti, Lt = Kk.Symbol, Se = Lt && Lt.prototype;
if (Yk && Jk(Lt) && (!("description" in Se) || // Safari 12 bug
Lt().description !== void 0)) {
  var h$ = {}, lo = function() {
    var t = arguments.length < 1 || arguments[0] === void 0 ? void 0 : Qk(arguments[0]), e = Zk(Se, this) ? new Lt(t) : t === void 0 ? Lt() : Lt(t);
    return t === "" && (h$[e] = !0), e;
  };
  t3(lo, Lt), lo.prototype = Se, Se.constructor = lo;
  var e3 = String(Lt("description detection")) === "Symbol(description detection)", n3 = uo(Se.valueOf), a3 = uo(Se.toString), i3 = /^Symbol\((.*)\)[^)]+$/, o3 = uo("".replace), s3 = uo("".slice);
  r3(Se, "description", {
    configurable: !0,
    get: function() {
      var t = n3(this);
      if (Xk(h$, t))
        return "";
      var e = a3(t), n = e3 ? s3(e, 7, -1) : o3(e, i3, "$1");
      return n === "" ? void 0 : n;
    }
  }), qk({ global: !0, constructor: !0, forced: !0 }, {
    Symbol: lo
  });
}
var u3 = Lr;
u3("asyncIterator");
var l3 = Lr;
l3("hasInstance");
var c3 = Lr;
c3("isConcatSpreadable");
var f3 = Lr;
f3("iterator");
var v3 = Lr;
v3("match");
var h3 = Lr;
h3("matchAll");
var d3 = Lr;
d3("replace");
var g3 = Lr;
g3("search");
var p3 = Lr;
p3("species");
var $3 = Lr;
$3("split");
var y3 = Lr, m3 = dE;
y3("toPrimitive");
m3();
var b3 = ar, w3 = Lr, S3 = Fr;
w3("toStringTag");
S3(b3("Symbol"), "Symbol");
var E3 = Lr;
E3("unscopables");
var T3 = O, x3 = J, yu = function(r, t, e) {
  try {
    return T3(x3(Object.getOwnPropertyDescriptor(r, t)[e]));
  } catch {
  }
}, I3 = H, UE = function(r) {
  return I3(r) || r === null;
}, O3 = UE, A3 = String, R3 = TypeError, zE = function(r) {
  if (O3(r))
    return r;
  throw new R3("Can't set " + A3(r) + " as a prototype");
}, _3 = yu, C3 = H, P3 = sr, M3 = zE, Ct = Object.setPrototypeOf || ("__proto__" in {} ? function() {
  var r = !1, t = {}, e;
  try {
    e = _3(Object.prototype, "__proto__", "set"), e(t, []), r = t instanceof Array;
  } catch {
  }
  return function(a, i) {
    return P3(a), M3(i), C3(a) && (r ? e(a, i) : a.__proto__ = i), a;
  };
}() : void 0), N3 = ur.f, VE = function(r, t, e) {
  e in r || N3(r, e, {
    configurable: !0,
    get: function() {
      return t[e];
    },
    set: function(n) {
      t[e] = n;
    }
  });
}, D3 = Y, L3 = H, d$ = Ct, We = function(r, t, e) {
  var n, a;
  return (
    // it can work only with native `setPrototypeOf`
    d$ && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    D3(n = t.constructor) && n !== e && L3(a = n.prototype) && a !== e.prototype && d$(r, a), r
  );
}, F3 = G, Pi = function(r, t) {
  return r === void 0 ? arguments.length < 2 ? "" : t : F3(r);
}, k3 = H, B3 = Tr, GE = function(r, t) {
  k3(t) && "cause" in t && B3(r, "cause", t.cause);
}, j3 = O, HE = Error, U3 = j3("".replace), z3 = function(r) {
  return String(new HE(r).stack);
}("zxcasd"), WE = /\n\s*at [^:]*:[^\n]*/, V3 = WE.test(z3), Wh = function(r, t) {
  if (V3 && typeof r == "string" && !HE.prepareStackTrace)
    for (; t--; )
      r = U3(r, WE, "");
  return r;
}, G3 = I, H3 = Qr, qE = !G3(function() {
  var r = new Error("a");
  return "stack" in r ? (Object.defineProperty(r, "stack", H3(1, 7)), r.stack !== 7) : !0;
}), W3 = Tr, q3 = Wh, Y3 = qE, g$ = Error.captureStackTrace, YE = function(r, t, e, n) {
  Y3 && (g$ ? g$(r, t) : W3(r, "stack", q3(e, n)));
}, p$ = ar, K3 = K, $$ = Tr, X3 = Dr, y$ = Ct, m$ = Ti, b$ = VE, J3 = We, Z3 = Pi, Q3 = GE, rB = YE, tB = j, KE = function(r, t, e, n) {
  var a = "stackTraceLimit", i = n ? 2 : 1, o = r.split("."), s = o[o.length - 1], u = p$.apply(null, o);
  if (u) {
    var l = u.prototype;
    if (K3(l, "cause") && delete l.cause, !e)
      return u;
    var c = p$("Error"), f = t(function(v, h) {
      var g = Z3(n ? h : v, void 0), $ = n ? new u(v) : new u();
      return g !== void 0 && $$($, "message", g), rB($, f, $.stack, 2), this && X3(l, this) && J3($, this, f), arguments.length > i && Q3($, arguments[i]), $;
    });
    f.prototype = l, s !== "Error" ? y$ ? y$(f, c) : m$(f, c, { name: !0 }) : tB && a in u && (b$(f, u, a), b$(f, u, "prepareStackTrace")), m$(f, u);
    try {
      l.name !== s && $$(l, "name", s), l.constructor = f;
    } catch {
    }
    return f;
  }
}, XE = d, eB = _, Pt = tt, JE = KE, fv = "WebAssembly", w$ = eB[fv], Rs = new Error("e", { cause: 7 }).cause !== 7, qe = function(r, t) {
  var e = {};
  e[r] = JE(r, t, Rs), XE({ global: !0, constructor: !0, arity: 1, forced: Rs }, e);
}, qh = function(r, t) {
  if (w$ && w$[r]) {
    var e = {};
    e[r] = JE(fv + "." + r, t, Rs), XE({ target: fv, stat: !0, constructor: !0, arity: 1, forced: Rs }, e);
  }
};
qe("Error", function(r) {
  return function(e) {
    return Pt(r, this, arguments);
  };
});
qe("EvalError", function(r) {
  return function(e) {
    return Pt(r, this, arguments);
  };
});
qe("RangeError", function(r) {
  return function(e) {
    return Pt(r, this, arguments);
  };
});
qe("ReferenceError", function(r) {
  return function(e) {
    return Pt(r, this, arguments);
  };
});
qe("SyntaxError", function(r) {
  return function(e) {
    return Pt(r, this, arguments);
  };
});
qe("TypeError", function(r) {
  return function(e) {
    return Pt(r, this, arguments);
  };
});
qe("URIError", function(r) {
  return function(e) {
    return Pt(r, this, arguments);
  };
});
qh("CompileError", function(r) {
  return function(e) {
    return Pt(r, this, arguments);
  };
});
qh("LinkError", function(r) {
  return function(e) {
    return Pt(r, this, arguments);
  };
});
qh("RuntimeError", function(r) {
  return function(e) {
    return Pt(r, this, arguments);
  };
});
var nB = j, aB = I, iB = k, S$ = Pi, es = Error.prototype.toString, oB = aB(function() {
  if (nB) {
    var r = Object.create(Object.defineProperty({}, "name", { get: function() {
      return this === r;
    } }));
    if (es.call(r) !== "true")
      return !0;
  }
  return es.call({ message: 1, name: 2 }) !== "2: 1" || es.call({}) !== "Error";
}), ZE = oB ? function() {
  var t = iB(this), e = S$(t.name, "Error"), n = S$(t.message);
  return e ? n ? e + ": " + n : e : n;
} : es, sB = lr, E$ = ZE, T$ = Error.prototype;
T$.toString !== E$ && sB(T$, "toString", E$);
var uB = I, Yh = !uB(function() {
  function r() {
  }
  return r.prototype.constructor = null, Object.getPrototypeOf(new r()) !== r.prototype;
}), lB = K, cB = Y, fB = Z, vB = cu, hB = Yh, x$ = vB("IE_PROTO"), vv = Object, dB = vv.prototype, Vr = hB ? vv.getPrototypeOf : function(r) {
  var t = fB(r);
  if (lB(t, x$))
    return t[x$];
  var e = t.constructor;
  return cB(e) && t instanceof e ? e.prototype : t instanceof vv ? dB : null;
}, Mi = {}, gB = W, pB = Mi, $B = gB("iterator"), yB = Array.prototype, Kh = function(r) {
  return r !== void 0 && (pB.Array === r || yB[$B] === r);
}, mB = vt, I$ = _t, bB = Nr, wB = Mi, SB = W, EB = SB("iterator"), na = function(r) {
  if (!bB(r))
    return I$(r, EB) || I$(r, "@@iterator") || wB[mB(r)];
}, TB = U, xB = J, IB = k, OB = Ge, AB = na, RB = TypeError, mu = function(r, t) {
  var e = arguments.length < 2 ? AB(r) : t;
  if (xB(e))
    return IB(TB(e, r));
  throw new RB(OB(r) + " is not iterable");
}, _B = U, O$ = k, CB = _t, Ye = function(r, t, e) {
  var n, a;
  O$(r);
  try {
    if (n = CB(r, "return"), !n) {
      if (t === "throw")
        throw e;
      return e;
    }
    n = _B(n, r);
  } catch (i) {
    a = !0, n = i;
  }
  if (t === "throw")
    throw e;
  if (a)
    throw n;
  return O$(n), e;
}, PB = ht, MB = U, NB = k, DB = Ge, LB = Kh, FB = ir, A$ = Dr, kB = mu, BB = na, R$ = Ye, jB = TypeError, ns = function(r, t) {
  this.stopped = r, this.result = t;
}, _$ = ns.prototype, pr = function(r, t, e) {
  var n = e && e.that, a = !!(e && e.AS_ENTRIES), i = !!(e && e.IS_RECORD), o = !!(e && e.IS_ITERATOR), s = !!(e && e.INTERRUPTED), u = PB(t, n), l, c, f, v, h, g, $, p = function(S) {
    return l && R$(l, "normal", S), new ns(!0, S);
  }, y = function(S) {
    return a ? (NB(S), s ? u(S[0], S[1], p) : u(S[0], S[1])) : s ? u(S, p) : u(S);
  };
  if (i)
    l = r.iterator;
  else if (o)
    l = r;
  else {
    if (c = BB(r), !c)
      throw new jB(DB(r) + " is not iterable");
    if (LB(c)) {
      for (f = 0, v = FB(r); v > f; f++)
        if (h = y(r[f]), h && A$(_$, h))
          return h;
      return new ns(!1);
    }
    l = kB(r, c);
  }
  for (g = i ? r.next : l.next; !($ = MB(g, l)).done; ) {
    try {
      h = y($.value);
    } catch (S) {
      R$(l, "throw", S);
    }
    if (typeof h == "object" && h && A$(_$, h))
      return h;
  }
  return new ns(!1);
}, UB = d, zB = Dr, VB = Vr, _s = Ct, GB = Ti, QE = zr, Vl = Tr, Gl = Qr, HB = GE, WB = YE, qB = pr, YB = Pi, KB = W, XB = KB("toStringTag"), Cs = Error, JB = [].push, Vn = function(t, e) {
  var n = zB(Hl, this), a;
  _s ? a = _s(new Cs(), n ? VB(this) : Hl) : (a = n ? this : QE(Hl), Vl(a, XB, "Error")), e !== void 0 && Vl(a, "message", YB(e)), WB(a, Vn, a.stack, 1), arguments.length > 2 && HB(a, arguments[2]);
  var i = [];
  return qB(t, JB, { that: i }), Vl(a, "errors", i), a;
};
_s ? _s(Vn, Cs) : GB(Vn, Cs, { name: !0 });
var Hl = Vn.prototype = QE(Cs.prototype, {
  constructor: Gl(1, Vn),
  message: Gl(1, ""),
  name: Gl(1, "AggregateError")
});
UB({ global: !0, constructor: !0, arity: 2 }, {
  AggregateError: Vn
});
var ZB = d, QB = ar, r6 = tt, C$ = I, t6 = KE, Xh = "AggregateError", P$ = QB(Xh), M$ = !C$(function() {
  return P$([1]).errors[0] !== 1;
}) && C$(function() {
  return P$([1], Xh, { cause: 7 }).cause !== 7;
});
ZB({ global: !0, constructor: !0, arity: 2, forced: M$ }, {
  AggregateError: t6(Xh, function(r) {
    return function(e, n) {
      return r6(r, this, arguments);
    };
  }, M$, !0)
});
var e6 = W, n6 = zr, a6 = ur.f, hv = e6("unscopables"), dv = Array.prototype;
dv[hv] === void 0 && a6(dv, hv, {
  configurable: !0,
  value: n6(null)
});
var kr = function(r) {
  dv[hv][r] = !0;
}, i6 = d, o6 = Z, s6 = ir, u6 = fr, l6 = kr;
i6({ target: "Array", proto: !0 }, {
  at: function(t) {
    var e = o6(this), n = s6(e), a = u6(t), i = a >= 0 ? a : n + a;
    return i < 0 || i >= n ? void 0 : e[i];
  }
});
l6("at");
var c6 = TypeError, f6 = 9007199254740991, aa = function(r) {
  if (r > f6)
    throw c6("Maximum allowed index exceeded");
  return r;
}, v6 = j, h6 = ur, d6 = Qr, Xt = function(r, t, e) {
  v6 ? h6.f(r, t, d6(0, e)) : r[t] = e;
}, g6 = I, p6 = W, $6 = qt, y6 = p6("species"), Ni = function(r) {
  return $6 >= 51 || !g6(function() {
    var t = [], e = t.constructor = {};
    return e[y6] = function() {
      return { foo: 1 };
    }, t[r](Boolean).foo !== 1;
  });
}, m6 = d, b6 = I, w6 = pe, S6 = H, E6 = Z, T6 = ir, N$ = aa, D$ = Xt, x6 = Ai, I6 = Ni, O6 = W, A6 = qt, rT = O6("isConcatSpreadable"), R6 = A6 >= 51 || !b6(function() {
  var r = [];
  return r[rT] = !1, r.concat()[0] !== r;
}), _6 = function(r) {
  if (!S6(r))
    return !1;
  var t = r[rT];
  return t !== void 0 ? !!t : w6(r);
}, C6 = !R6 || !I6("concat");
m6({ target: "Array", proto: !0, arity: 1, forced: C6 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function(t) {
    var e = E6(this), n = x6(e, 0), a = 0, i, o, s, u, l;
    for (i = -1, s = arguments.length; i < s; i++)
      if (l = i === -1 ? e : arguments[i], _6(l))
        for (u = T6(l), N$(a + u), o = 0; o < u; o++, a++)
          o in l && D$(n, a, l[o]);
      else
        N$(a + 1), D$(n, a++, l);
    return n.length = a, n;
  }
});
var L$ = Ge, P6 = TypeError, bu = function(r, t) {
  if (!delete r[t])
    throw new P6("Cannot delete property " + L$(t) + " of " + L$(r));
}, M6 = Z, Wl = Kt, N6 = ir, D6 = bu, L6 = Math.min, tT = [].copyWithin || function(t, e) {
  var n = M6(this), a = N6(n), i = Wl(t, a), o = Wl(e, a), s = arguments.length > 2 ? arguments[2] : void 0, u = L6((s === void 0 ? a : Wl(s, a)) - o, a - i), l = 1;
  for (o < i && i < o + u && (l = -1, o += u - 1, i += u - 1); u-- > 0; )
    o in n ? n[i] = n[o] : D6(n, i), i += l, o += l;
  return n;
}, F6 = d, k6 = tT, B6 = kr;
F6({ target: "Array", proto: !0 }, {
  copyWithin: k6
});
B6("copyWithin");
var j6 = I, Jt = function(r, t) {
  var e = [][r];
  return !!e && j6(function() {
    e.call(null, t || function() {
      return 1;
    }, 1);
  });
}, U6 = d, z6 = br.every, V6 = Jt, G6 = V6("every");
U6({ target: "Array", proto: !0, forced: !G6 }, {
  every: function(t) {
    return z6(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var H6 = Z, F$ = Kt, W6 = ir, Jh = function(t) {
  for (var e = H6(this), n = W6(e), a = arguments.length, i = F$(a > 1 ? arguments[1] : void 0, n), o = a > 2 ? arguments[2] : void 0, s = o === void 0 ? n : F$(o, n); s > i; )
    e[i++] = t;
  return e;
}, q6 = d, Y6 = Jh, K6 = kr;
q6({ target: "Array", proto: !0 }, {
  fill: Y6
});
K6("fill");
var X6 = d, J6 = br.filter, Z6 = Ni, Q6 = Z6("filter");
X6({ target: "Array", proto: !0, forced: !Q6 }, {
  filter: function(t) {
    return J6(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var rj = d, tj = br.find, ej = kr, gv = "find", eT = !0;
gv in [] && Array(1)[gv](function() {
  eT = !1;
});
rj({ target: "Array", proto: !0, forced: eT }, {
  find: function(t) {
    return tj(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
ej(gv);
var nj = d, aj = br.findIndex, ij = kr, pv = "findIndex", nT = !0;
pv in [] && Array(1)[pv](function() {
  nT = !1;
});
nj({ target: "Array", proto: !0, forced: nT }, {
  findIndex: function(t) {
    return aj(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
ij(pv);
var oj = ht, sj = Jn, uj = Z, lj = ir, k$ = function(r) {
  var t = r === 1;
  return function(e, n, a) {
    for (var i = uj(e), o = sj(i), s = lj(o), u = oj(n, a), l, c; s-- > 0; )
      if (l = o[s], c = u(l, s, i), c)
        switch (r) {
          case 0:
            return l;
          case 1:
            return s;
        }
    return t ? -1 : void 0;
  };
}, wu = {
  // `Array.prototype.findLast` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLast: k$(0),
  // `Array.prototype.findLastIndex` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLastIndex: k$(1)
}, cj = d, fj = wu.findLast, vj = kr;
cj({ target: "Array", proto: !0 }, {
  findLast: function(t) {
    return fj(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
vj("findLast");
var hj = d, dj = wu.findLastIndex, gj = kr;
hj({ target: "Array", proto: !0 }, {
  findLastIndex: function(t) {
    return dj(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
gj("findLastIndex");
var pj = pe, $j = ir, yj = aa, mj = ht, aT = function(r, t, e, n, a, i, o, s) {
  for (var u = a, l = 0, c = o ? mj(o, s) : !1, f, v; l < n; )
    l in e && (f = c ? c(e[l], l, t) : e[l], i > 0 && pj(f) ? (v = $j(f), u = aT(r, t, f, v, u, i - 1) - 1) : (yj(u + 1), r[u] = f), u++), l++;
  return u;
}, iT = aT, bj = d, wj = iT, Sj = Z, Ej = ir, Tj = fr, xj = Ai;
bj({ target: "Array", proto: !0 }, {
  flat: function() {
    var t = arguments.length ? arguments[0] : void 0, e = Sj(this), n = Ej(e), a = xj(e, 0);
    return a.length = wj(a, e, e, n, 0, t === void 0 ? 1 : Tj(t)), a;
  }
});
var Ij = d, Oj = iT, Aj = J, Rj = Z, _j = ir, Cj = Ai;
Ij({ target: "Array", proto: !0 }, {
  flatMap: function(t) {
    var e = Rj(this), n = _j(e), a;
    return Aj(t), a = Cj(e, 0), a.length = Oj(a, e, e, n, 0, 1, t, arguments.length > 1 ? arguments[1] : void 0), a;
  }
});
var Pj = br.forEach, Mj = Jt, Nj = Mj("forEach"), oT = Nj ? [].forEach : function(t) {
  return Pj(this, t, arguments.length > 1 ? arguments[1] : void 0);
}, Dj = d, B$ = oT;
Dj({ target: "Array", proto: !0, forced: [].forEach !== B$ }, {
  forEach: B$
});
var Lj = k, Fj = Ye, Zh = function(r, t, e, n) {
  try {
    return n ? t(Lj(e)[0], e[1]) : t(e);
  } catch (a) {
    Fj(r, "throw", a);
  }
}, kj = ht, Bj = U, jj = Z, Uj = Zh, zj = Kh, Vj = ea, Gj = ir, j$ = Xt, Hj = mu, Wj = na, U$ = Array, sT = function(t) {
  var e = jj(t), n = Vj(this), a = arguments.length, i = a > 1 ? arguments[1] : void 0, o = i !== void 0;
  o && (i = kj(i, a > 2 ? arguments[2] : void 0));
  var s = Wj(e), u = 0, l, c, f, v, h, g;
  if (s && !(this === U$ && zj(s)))
    for (c = n ? new this() : [], v = Hj(e, s), h = v.next; !(f = Bj(h, v)).done; u++)
      g = o ? Uj(v, i, [f.value, u], !0) : f.value, j$(c, u, g);
  else
    for (l = Gj(e), c = n ? new this(l) : U$(l); l > u; u++)
      g = o ? i(e[u], u) : e[u], j$(c, u, g);
  return c.length = u, c;
}, qj = W, uT = qj("iterator"), lT = !1;
try {
  var Yj = 0, z$ = {
    next: function() {
      return { done: !!Yj++ };
    },
    return: function() {
      lT = !0;
    }
  };
  z$[uT] = function() {
    return this;
  }, Array.from(z$, function() {
    throw 2;
  });
} catch {
}
var Su = function(r, t) {
  try {
    if (!t && !lT)
      return !1;
  } catch {
    return !1;
  }
  var e = !1;
  try {
    var n = {};
    n[uT] = function() {
      return {
        next: function() {
          return { done: e = !0 };
        }
      };
    }, r(n);
  } catch {
  }
  return e;
}, Kj = d, Xj = sT, Jj = Su, Zj = !Jj(function(r) {
  Array.from(r);
});
Kj({ target: "Array", stat: !0, forced: Zj }, {
  from: Xj
});
var Qj = d, rU = Si.includes, tU = I, eU = kr, nU = tU(function() {
  return !Array(1).includes();
});
Qj({ target: "Array", proto: !0, forced: nU }, {
  includes: function(t) {
    return rU(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
eU("includes");
var aU = d, iU = He, oU = Si.indexOf, sU = Jt, $v = iU([].indexOf), cT = !!$v && 1 / $v([1], 1, -0) < 0, uU = cT || !sU("indexOf");
aU({ target: "Array", proto: !0, forced: uU }, {
  indexOf: function(t) {
    var e = arguments.length > 1 ? arguments[1] : void 0;
    return cT ? $v(this, t, e) || 0 : oU(this, t, e);
  }
});
var lU = d, cU = pe;
lU({ target: "Array", stat: !0 }, {
  isArray: cU
});
var fU = I, vU = Y, hU = H, V$ = Vr, dU = lr, gU = W, yv = gU("iterator"), fT = !1, Be, ql, Yl;
[].keys && (Yl = [].keys(), "next" in Yl ? (ql = V$(V$(Yl)), ql !== Object.prototype && (Be = ql)) : fT = !0);
var pU = !hU(Be) || fU(function() {
  var r = {};
  return Be[yv].call(r) !== r;
});
pU && (Be = {});
vU(Be[yv]) || dU(Be, yv, function() {
  return this;
});
var Di = {
  IteratorPrototype: Be,
  BUGGY_SAFARI_ITERATORS: fT
}, $U = Di.IteratorPrototype, yU = zr, mU = Qr, bU = Fr, wU = Mi, SU = function() {
  return this;
}, Qh = function(r, t, e, n) {
  var a = t + " Iterator";
  return r.prototype = yU($U, { next: mU(+!n, e) }), bU(r, a, !1), wU[a] = SU, r;
}, EU = d, TU = U, vT = ta, xU = Y, IU = Qh, G$ = Vr, H$ = Ct, OU = Fr, AU = Tr, Kl = lr, RU = W, _U = Mi, hT = Di, CU = vT.PROPER, PU = vT.CONFIGURABLE, W$ = hT.IteratorPrototype, co = hT.BUGGY_SAFARI_ITERATORS, Ea = RU("iterator"), q$ = "keys", Ta = "values", Y$ = "entries", MU = function() {
  return this;
}, rd = function(r, t, e, n, a, i, o) {
  IU(e, t, n);
  var s = function(y) {
    if (y === a && v)
      return v;
    if (!co && y && y in c)
      return c[y];
    switch (y) {
      case q$:
        return function() {
          return new e(this, y);
        };
      case Ta:
        return function() {
          return new e(this, y);
        };
      case Y$:
        return function() {
          return new e(this, y);
        };
    }
    return function() {
      return new e(this);
    };
  }, u = t + " Iterator", l = !1, c = r.prototype, f = c[Ea] || c["@@iterator"] || a && c[a], v = !co && f || s(a), h = t === "Array" && c.entries || f, g, $, p;
  if (h && (g = G$(h.call(new r())), g !== Object.prototype && g.next && (G$(g) !== W$ && (H$ ? H$(g, W$) : xU(g[Ea]) || Kl(g, Ea, MU)), OU(g, u, !0))), CU && a === Ta && f && f.name !== Ta && (PU ? AU(c, "name", Ta) : (l = !0, v = function() {
    return TU(f, this);
  })), a)
    if ($ = {
      values: s(Ta),
      keys: i ? v : s(q$),
      entries: s(Y$)
    }, o)
      for (p in $)
        (co || l || !(p in c)) && Kl(c, p, $[p]);
    else
      EU({ target: t, proto: !0, forced: co || l }, $);
  return c[Ea] !== v && Kl(c, Ea, v, { name: a }), _U[t] = v, $;
}, ia = function(r, t) {
  return { value: r, done: t };
}, NU = gr, td = kr, K$ = Mi, dT = vr, DU = ur.f, LU = rd, fo = ia, FU = j, gT = "Array Iterator", kU = dT.set, BU = dT.getterFor(gT), pT = LU(Array, "Array", function(r, t) {
  kU(this, {
    type: gT,
    target: NU(r),
    // target
    index: 0,
    // next index
    kind: t
    // kind
  });
}, function() {
  var r = BU(this), t = r.target, e = r.index++;
  if (!t || e >= t.length)
    return r.target = null, fo(void 0, !0);
  switch (r.kind) {
    case "keys":
      return fo(e, !1);
    case "values":
      return fo(t[e], !1);
  }
  return fo([e, t[e]], !1);
}, "values"), X$ = K$.Arguments = K$.Array;
td("keys");
td("values");
td("entries");
if (FU && X$.name !== "values")
  try {
    DU(X$, "name", { value: "values" });
  } catch {
  }
var jU = d, UU = O, zU = Jn, VU = gr, GU = Jt, HU = UU([].join), WU = zU !== Object, qU = WU || !GU("join", ",");
jU({ target: "Array", proto: !0, forced: qU }, {
  join: function(t) {
    return HU(VU(this), t === void 0 ? "," : t);
  }
});
var YU = tt, KU = gr, XU = fr, JU = ir, ZU = Jt, QU = Math.min, mv = [].lastIndexOf, $T = !!mv && 1 / [1].lastIndexOf(1, -0) < 0, r5 = ZU("lastIndexOf"), t5 = $T || !r5, yT = t5 ? function(t) {
  if ($T)
    return YU(mv, this, arguments) || 0;
  var e = KU(this), n = JU(e);
  if (n === 0)
    return -1;
  var a = n - 1;
  for (arguments.length > 1 && (a = QU(a, XU(arguments[1]))), a < 0 && (a = n + a); a >= 0; a--)
    if (a in e && e[a] === t)
      return a || 0;
  return -1;
} : mv, e5 = d, J$ = yT;
e5({ target: "Array", proto: !0, forced: J$ !== [].lastIndexOf }, {
  lastIndexOf: J$
});
var n5 = d, a5 = br.map, i5 = Ni, o5 = i5("map");
n5({ target: "Array", proto: !0, forced: !o5 }, {
  map: function(t) {
    return a5(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var s5 = d, u5 = I, l5 = ea, c5 = Xt, mT = Array, f5 = u5(function() {
  function r() {
  }
  return !(mT.of.call(r) instanceof r);
});
s5({ target: "Array", stat: !0, forced: f5 }, {
  of: function() {
    for (var t = 0, e = arguments.length, n = new (l5(this) ? this : mT)(e); e > t; )
      c5(n, t, arguments[t++]);
    return n.length = e, n;
  }
});
var v5 = j, h5 = pe, d5 = TypeError, g5 = Object.getOwnPropertyDescriptor, p5 = v5 && !function() {
  if (this !== void 0)
    return !0;
  try {
    Object.defineProperty([], "length", { writable: !1 }).length = 1;
  } catch (r) {
    return r instanceof TypeError;
  }
}(), ed = p5 ? function(r, t) {
  if (h5(r) && !g5(r, "length").writable)
    throw new d5("Cannot set read only .length");
  return r.length = t;
} : function(r, t) {
  return r.length = t;
}, $5 = d, y5 = Z, m5 = ir, b5 = ed, w5 = aa, S5 = I, E5 = S5(function() {
  return [].push.call({ length: 4294967296 }, 1) !== 4294967297;
}), T5 = function() {
  try {
    Object.defineProperty([], "length", { writable: !1 }).push();
  } catch (r) {
    return r instanceof TypeError;
  }
}, x5 = E5 || !T5();
$5({ target: "Array", proto: !0, arity: 1, forced: x5 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function(t) {
    var e = y5(this), n = m5(e), a = arguments.length;
    w5(n + a);
    for (var i = 0; i < a; i++)
      e[n] = arguments[i], n++;
    return b5(e, n), n;
  }
});
var I5 = J, O5 = Z, A5 = Jn, R5 = ir, Z$ = TypeError, Q$ = "Reduce of empty array with no initial value", ry = function(r) {
  return function(t, e, n, a) {
    var i = O5(t), o = A5(i), s = R5(i);
    if (I5(e), s === 0 && n < 2)
      throw new Z$(Q$);
    var u = r ? s - 1 : 0, l = r ? -1 : 1;
    if (n < 2)
      for (; ; ) {
        if (u in o) {
          a = o[u], u += l;
          break;
        }
        if (u += l, r ? u < 0 : s <= u)
          throw new Z$(Q$);
      }
    for (; r ? u >= 0 : s > u; u += l)
      u in o && (a = e(a, o[u], u, i));
    return a;
  };
}, Eu = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: ry(!1),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: ry(!0)
}, xa = _, _5 = Rt, C5 = Er, vo = function(r) {
  return _5.slice(0, r.length) === r;
}, Tu = function() {
  return vo("Bun/") ? "BUN" : vo("Cloudflare-Workers") ? "CLOUDFLARE" : vo("Deno/") ? "DENO" : vo("Node.js/") ? "NODE" : xa.Bun && typeof Bun.version == "string" ? "BUN" : xa.Deno && typeof Deno.version == "object" ? "DENO" : C5(xa.process) === "process" ? "NODE" : xa.window && xa.document ? "BROWSER" : "REST";
}(), P5 = Tu, oa = P5 === "NODE", M5 = d, N5 = Eu.left, D5 = Jt, ty = qt, L5 = oa, F5 = !L5 && ty > 79 && ty < 83, k5 = F5 || !D5("reduce");
M5({ target: "Array", proto: !0, forced: k5 }, {
  reduce: function(t) {
    var e = arguments.length;
    return N5(this, t, e, e > 1 ? arguments[1] : void 0);
  }
});
var B5 = d, j5 = Eu.right, U5 = Jt, ey = qt, z5 = oa, V5 = !z5 && ey > 79 && ey < 83, G5 = V5 || !U5("reduceRight");
B5({ target: "Array", proto: !0, forced: G5 }, {
  reduceRight: function(t) {
    return j5(this, t, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var H5 = d, W5 = O, q5 = pe, Y5 = W5([].reverse), ny = [1, 2];
H5({ target: "Array", proto: !0, forced: String(ny) === String(ny.reverse()) }, {
  reverse: function() {
    return q5(this) && (this.length = this.length), Y5(this);
  }
});
var K5 = d, ay = pe, X5 = ea, J5 = H, iy = Kt, Z5 = ir, Q5 = gr, r4 = Xt, t4 = W, e4 = Ni, n4 = rt, a4 = e4("slice"), i4 = t4("species"), Xl = Array, o4 = Math.max;
K5({ target: "Array", proto: !0, forced: !a4 }, {
  slice: function(t, e) {
    var n = Q5(this), a = Z5(n), i = iy(t, a), o = iy(e === void 0 ? a : e, a), s, u, l;
    if (ay(n) && (s = n.constructor, X5(s) && (s === Xl || ay(s.prototype)) ? s = void 0 : J5(s) && (s = s[i4], s === null && (s = void 0)), s === Xl || s === void 0))
      return n4(n, i, o);
    for (u = new (s === void 0 ? Xl : s)(o4(o - i, 0)), l = 0; i < o; i++, l++)
      i in n && r4(u, l, n[i]);
    return u.length = l, u;
  }
});
var s4 = d, u4 = br.some, l4 = Jt, c4 = l4("some");
s4({ target: "Array", proto: !0, forced: !c4 }, {
  some: function(t) {
    return u4(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var oy = rt, f4 = Math.floor, bv = function(r, t) {
  var e = r.length;
  if (e < 8)
    for (var n = 1, a, i; n < e; ) {
      for (i = n, a = r[n]; i && t(r[i - 1], a) > 0; )
        r[i] = r[--i];
      i !== n++ && (r[i] = a);
    }
  else
    for (var o = f4(e / 2), s = bv(oy(r, 0, o), t), u = bv(oy(r, o), t), l = s.length, c = u.length, f = 0, v = 0; f < l || v < c; )
      r[f + v] = f < l && v < c ? t(s[f], u[v]) <= 0 ? s[f++] : u[v++] : f < l ? s[f++] : u[v++];
  return r;
}, nd = bv, v4 = Rt, sy = v4.match(/firefox\/(\d+)/i), bT = !!sy && +sy[1], h4 = Rt, wT = /MSIE|Trident/.test(h4), d4 = Rt, uy = d4.match(/AppleWebKit\/(\d+)\./), ad = !!uy && +uy[1], g4 = d, ST = O, p4 = J, $4 = Z, ly = ir, y4 = bu, cy = G, id = I, m4 = nd, b4 = Jt, fy = bT, w4 = wT, vy = qt, hy = ad, oe = [], dy = ST(oe.sort), S4 = ST(oe.push), E4 = id(function() {
  oe.sort(void 0);
}), T4 = id(function() {
  oe.sort(null);
}), x4 = b4("sort"), ET = !id(function() {
  if (vy)
    return vy < 70;
  if (!(fy && fy > 3)) {
    if (w4)
      return !0;
    if (hy)
      return hy < 603;
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
        oe.push({ k: e + a, v: n });
    }
    for (oe.sort(function(i, o) {
      return o.v - i.v;
    }), a = 0; a < oe.length; a++)
      e = oe[a].k.charAt(0), r.charAt(r.length - 1) !== e && (r += e);
    return r !== "DGBEFHACIJK";
  }
}), I4 = E4 || !T4 || !x4 || !ET, O4 = function(r) {
  return function(t, e) {
    return e === void 0 ? -1 : t === void 0 ? 1 : r !== void 0 ? +r(t, e) || 0 : cy(t) > cy(e) ? 1 : -1;
  };
};
g4({ target: "Array", proto: !0, forced: I4 }, {
  sort: function(t) {
    t !== void 0 && p4(t);
    var e = $4(this);
    if (ET)
      return t === void 0 ? dy(e) : dy(e, t);
    var n = [], a = ly(e), i, o;
    for (o = 0; o < a; o++)
      o in e && S4(n, e[o]);
    for (m4(n, O4(t)), i = ly(n), o = 0; o < i; )
      e[o] = n[o++];
    for (; o < a; )
      y4(e, o++);
    return e;
  }
});
var A4 = ar, R4 = hr, _4 = W, C4 = j, gy = _4("species"), sa = function(r) {
  var t = A4(r);
  C4 && t && !t[gy] && R4(t, gy, {
    configurable: !0,
    get: function() {
      return this;
    }
  });
}, P4 = sa;
P4("Array");
var M4 = d, N4 = Z, D4 = Kt, L4 = fr, F4 = ir, k4 = ed, B4 = aa, j4 = Ai, U4 = Xt, Jl = bu, z4 = Ni, V4 = z4("splice"), G4 = Math.max, H4 = Math.min;
M4({ target: "Array", proto: !0, forced: !V4 }, {
  splice: function(t, e) {
    var n = N4(this), a = F4(n), i = D4(t, a), o = arguments.length, s, u, l, c, f, v;
    for (o === 0 ? s = u = 0 : o === 1 ? (s = 0, u = a - i) : (s = o - 2, u = H4(G4(L4(e), 0), a - i)), B4(a + s - u), l = j4(n, u), c = 0; c < u; c++)
      f = i + c, f in n && U4(l, c, n[f]);
    if (l.length = u, s < u) {
      for (c = i; c < a - u; c++)
        f = c + u, v = c + s, f in n ? n[v] = n[f] : Jl(n, v);
      for (c = a; c > a - u + s; c--)
        Jl(n, c - 1);
    } else if (s > u)
      for (c = a - u; c > i; c--)
        f = c + u - 1, v = c + s - 1, f in n ? n[v] = n[f] : Jl(n, v);
    for (c = 0; c < s; c++)
      n[c + i] = arguments[c + 2];
    return k4(n, a - u + s), l;
  }
});
var W4 = ir, TT = function(r, t) {
  for (var e = W4(r), n = new t(e), a = 0; a < e; a++)
    n[a] = r[e - a - 1];
  return n;
}, q4 = d, Y4 = TT, K4 = gr, X4 = kr, J4 = Array;
q4({ target: "Array", proto: !0 }, {
  toReversed: function() {
    return Y4(K4(this), J4);
  }
});
X4("toReversed");
var Z4 = ir, xu = function(r, t, e) {
  for (var n = 0, a = arguments.length > 2 ? e : Z4(t), i = new r(a); a > n; )
    i[n] = t[n++];
  return i;
}, Q4 = _, r8 = function(r, t) {
  var e = Q4[r], n = e && e.prototype;
  return n && n[t];
}, t8 = d, e8 = O, n8 = J, a8 = gr, i8 = xu, o8 = r8, s8 = kr, u8 = Array, l8 = e8(o8("Array", "sort"));
t8({ target: "Array", proto: !0 }, {
  toSorted: function(t) {
    t !== void 0 && n8(t);
    var e = a8(this), n = i8(u8, e);
    return l8(n, t);
  }
});
s8("toSorted");
var c8 = d, f8 = kr, v8 = aa, h8 = ir, d8 = Kt, g8 = gr, p8 = fr, $8 = Array, y8 = Math.max, m8 = Math.min;
c8({ target: "Array", proto: !0 }, {
  toSpliced: function(t, e) {
    var n = g8(this), a = h8(n), i = d8(t, a), o = arguments.length, s = 0, u, l, c, f;
    for (o === 0 ? u = l = 0 : o === 1 ? (u = 0, l = a - i) : (u = o - 2, l = m8(y8(p8(e), 0), a - i)), c = v8(a + u - l), f = $8(c); s < i; s++)
      f[s] = n[s];
    for (; s < i + u; s++)
      f[s] = arguments[s - i + 2];
    for (; s < c; s++)
      f[s] = n[s + l - u];
    return f;
  }
});
f8("toSpliced");
var b8 = kr;
b8("flat");
var w8 = kr;
w8("flatMap");
var S8 = d, E8 = Z, T8 = ir, x8 = ed, I8 = bu, O8 = aa, A8 = [].unshift(0) !== 1, R8 = function() {
  try {
    Object.defineProperty([], "length", { writable: !1 }).unshift();
  } catch (r) {
    return r instanceof TypeError;
  }
}, _8 = A8 || !R8();
S8({ target: "Array", proto: !0, arity: 1, forced: _8 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  unshift: function(t) {
    var e = E8(this), n = T8(e), a = arguments.length;
    if (a) {
      O8(n + a);
      for (var i = n; i--; ) {
        var o = i + a;
        i in e ? e[o] = e[i] : I8(e, o);
      }
      for (var s = 0; s < a; s++)
        e[s] = arguments[s];
    }
    return x8(e, n + a);
  }
});
var C8 = ir, P8 = fr, M8 = RangeError, xT = function(r, t, e, n) {
  var a = C8(r), i = P8(e), o = i < 0 ? a + i : i;
  if (o >= a || o < 0)
    throw new M8("Incorrect index");
  for (var s = new t(a), u = 0; u < a; u++)
    s[u] = u === o ? n : r[u];
  return s;
}, N8 = d, D8 = xT, L8 = gr, F8 = Array;
N8({ target: "Array", proto: !0 }, {
  with: function(r, t) {
    return D8(L8(this), F8, r, t);
  }
});
var Iu = typeof ArrayBuffer < "u" && typeof DataView < "u", k8 = lr, ua = function(r, t, e) {
  for (var n in t)
    k8(r, n, t[n], e);
  return r;
}, B8 = Dr, j8 = TypeError, dt = function(r, t) {
  if (B8(t, r))
    return r;
  throw new j8("Incorrect invocation");
}, U8 = fr, z8 = Ur, V8 = RangeError, Ou = function(r) {
  if (r === void 0)
    return 0;
  var t = U8(r), e = z8(t);
  if (t !== e)
    throw new V8("Wrong length or index");
  return e;
}, od = Math.sign || function(t) {
  var e = +t;
  return e === 0 || e !== e ? e : e < 0 ? -1 : 1;
}, G8 = 2220446049250313e-31, py = 1 / G8, IT = function(r) {
  return r + py - py;
}, H8 = od, W8 = IT, q8 = Math.abs, Y8 = 2220446049250313e-31, OT = function(r, t, e, n) {
  var a = +r, i = q8(a), o = H8(a);
  if (i < n)
    return o * W8(i / n / t) * n * t;
  var s = (1 + t / Y8) * i, u = s - (s - i);
  return u > e || u !== u ? o * (1 / 0) : o * u;
}, K8 = OT, X8 = 11920928955078125e-23, J8 = 34028234663852886e22, Z8 = 11754943508222875e-54, AT = Math.fround || function(t) {
  return K8(t, X8, J8, Z8);
}, Q8 = Array, rz = Math.abs, Ft = Math.pow, tz = Math.floor, ez = Math.log, nz = Math.LN2, az = function(r, t, e) {
  var n = Q8(e), a = e * 8 - t - 1, i = (1 << a) - 1, o = i >> 1, s = t === 23 ? Ft(2, -24) - Ft(2, -77) : 0, u = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0, l = 0, c, f, v;
  for (r = rz(r), r !== r || r === 1 / 0 ? (f = r !== r ? 1 : 0, c = i) : (c = tz(ez(r) / nz), v = Ft(2, -c), r * v < 1 && (c--, v *= 2), c + o >= 1 ? r += s / v : r += s * Ft(2, 1 - o), r * v >= 2 && (c++, v /= 2), c + o >= i ? (f = 0, c = i) : c + o >= 1 ? (f = (r * v - 1) * Ft(2, t), c += o) : (f = r * Ft(2, o - 1) * Ft(2, t), c = 0)); t >= 8; )
    n[l++] = f & 255, f /= 256, t -= 8;
  for (c = c << t | f, a += t; a > 0; )
    n[l++] = c & 255, c /= 256, a -= 8;
  return n[l - 1] |= u * 128, n;
}, iz = function(r, t) {
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
    c += Ft(2, t), l -= i;
  }
  return (u ? -1 : 1) * c * Ft(2, l - t);
}, oz = {
  pack: az,
  unpack: iz
}, Au = _, sd = O, Zl = j, sz = Iu, RT = ta, uz = Tr, lz = hr, $y = ua, Ql = I, ho = dt, cz = fr, fz = Ur, Ps = Ou, vz = AT, _T = oz, hz = Vr, yy = Ct, dz = Jh, gz = rt, pz = We, $z = Ti, CT = Fr, ud = vr, yz = RT.PROPER, my = RT.CONFIGURABLE, An = "ArrayBuffer", Ru = "DataView", Rn = "prototype", mz = "Wrong length", PT = "Wrong index", by = ud.getterFor(An), Wa = ud.getterFor(Ru), wy = ud.set, it = Au[An], Br = it, en = Br && Br[Rn], wt = Au[Ru], Ee = wt && wt[Rn], Sy = Object.prototype, bz = Au.Array, Ms = Au.RangeError, wz = sd(dz), Sz = sd([].reverse), MT = _T.pack, Ey = _T.unpack, Ty = function(r) {
  return [r & 255];
}, xy = function(r) {
  return [r & 255, r >> 8 & 255];
}, Iy = function(r) {
  return [r & 255, r >> 8 & 255, r >> 16 & 255, r >> 24 & 255];
}, Oy = function(r) {
  return r[3] << 24 | r[2] << 16 | r[1] << 8 | r[0];
}, Ez = function(r) {
  return MT(vz(r), 23, 4);
}, Tz = function(r) {
  return MT(r, 52, 8);
}, go = function(r, t, e) {
  lz(r[Rn], t, {
    configurable: !0,
    get: function() {
      return e(this)[t];
    }
  });
}, ee = function(r, t, e, n) {
  var a = Wa(r), i = Ps(e), o = !!n;
  if (i + t > a.byteLength)
    throw new Ms(PT);
  var s = a.bytes, u = i + a.byteOffset, l = gz(s, u, u + t);
  return o ? l : Sz(l);
}, ne = function(r, t, e, n, a, i) {
  var o = Wa(r), s = Ps(e), u = n(+a), l = !!i;
  if (s + t > o.byteLength)
    throw new Ms(PT);
  for (var c = o.bytes, f = s + o.byteOffset, v = 0; v < t; v++)
    c[f + v] = u[l ? v : t - v - 1];
};
if (!sz)
  Br = function(t) {
    ho(this, en);
    var e = Ps(t);
    wy(this, {
      type: An,
      bytes: wz(bz(e), 0),
      byteLength: e
    }), Zl || (this.byteLength = e, this.detached = !1);
  }, en = Br[Rn], wt = function(t, e, n) {
    ho(this, Ee), ho(t, en);
    var a = by(t), i = a.byteLength, o = cz(e);
    if (o < 0 || o > i)
      throw new Ms("Wrong offset");
    if (n = n === void 0 ? i - o : fz(n), o + n > i)
      throw new Ms(mz);
    wy(this, {
      type: Ru,
      buffer: t,
      byteLength: n,
      byteOffset: o,
      bytes: a.bytes
    }), Zl || (this.buffer = t, this.byteLength = n, this.byteOffset = o);
  }, Ee = wt[Rn], Zl && (go(Br, "byteLength", by), go(wt, "buffer", Wa), go(wt, "byteLength", Wa), go(wt, "byteOffset", Wa)), $y(Ee, {
    getInt8: function(t) {
      return ee(this, 1, t)[0] << 24 >> 24;
    },
    getUint8: function(t) {
      return ee(this, 1, t)[0];
    },
    getInt16: function(t) {
      var e = ee(this, 2, t, arguments.length > 1 ? arguments[1] : !1);
      return (e[1] << 8 | e[0]) << 16 >> 16;
    },
    getUint16: function(t) {
      var e = ee(this, 2, t, arguments.length > 1 ? arguments[1] : !1);
      return e[1] << 8 | e[0];
    },
    getInt32: function(t) {
      return Oy(ee(this, 4, t, arguments.length > 1 ? arguments[1] : !1));
    },
    getUint32: function(t) {
      return Oy(ee(this, 4, t, arguments.length > 1 ? arguments[1] : !1)) >>> 0;
    },
    getFloat32: function(t) {
      return Ey(ee(this, 4, t, arguments.length > 1 ? arguments[1] : !1), 23);
    },
    getFloat64: function(t) {
      return Ey(ee(this, 8, t, arguments.length > 1 ? arguments[1] : !1), 52);
    },
    setInt8: function(t, e) {
      ne(this, 1, t, Ty, e);
    },
    setUint8: function(t, e) {
      ne(this, 1, t, Ty, e);
    },
    setInt16: function(t, e) {
      ne(this, 2, t, xy, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setUint16: function(t, e) {
      ne(this, 2, t, xy, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setInt32: function(t, e) {
      ne(this, 4, t, Iy, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setUint32: function(t, e) {
      ne(this, 4, t, Iy, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setFloat32: function(t, e) {
      ne(this, 4, t, Ez, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setFloat64: function(t, e) {
      ne(this, 8, t, Tz, e, arguments.length > 2 ? arguments[2] : !1);
    }
  });
else {
  var Ay = yz && it.name !== An;
  !Ql(function() {
    it(1);
  }) || !Ql(function() {
    new it(-1);
  }) || Ql(function() {
    return new it(), new it(1.5), new it(NaN), it.length !== 1 || Ay && !my;
  }) ? (Br = function(t) {
    return ho(this, en), pz(new it(Ps(t)), this, Br);
  }, Br[Rn] = en, en.constructor = Br, $z(Br, it)) : Ay && my && uz(it, "name", An), yy && hz(Ee) !== Sy && yy(Ee, Sy);
  var po = new wt(new Br(2)), Ry = sd(Ee.setInt8);
  po.setInt8(0, 2147483648), po.setInt8(1, 2147483649), (po.getInt8(0) || !po.getInt8(1)) && $y(Ee, {
    setInt8: function(t, e) {
      Ry(this, t, e << 24 >> 24);
    },
    setUint8: function(t, e) {
      Ry(this, t, e << 24 >> 24);
    }
  }, { unsafe: !0 });
}
CT(Br, An);
CT(wt, Ru);
var _u = {
  ArrayBuffer: Br,
  DataView: wt
}, xz = d, Iz = _, Oz = _u, Az = sa, ld = "ArrayBuffer", _y = Oz[ld], Rz = Iz[ld];
xz({ global: !0, constructor: !0, forced: Rz !== _y }, {
  ArrayBuffer: _y
});
Az(ld);
var _z = Iu, cd = j, Ar = _, NT = Y, Cu = H, ve = K, fd = vt, Cz = Ge, Pz = Tr, wv = lr, Mz = hr, Nz = Dr, Pu = Vr, la = Ct, Dz = W, Lz = ra, DT = vr, LT = DT.enforce, Fz = DT.get, Ns = Ar.Int8Array, Sv = Ns && Ns.prototype, Cy = Ar.Uint8ClampedArray, Py = Cy && Cy.prototype, Et = Ns && Pu(Ns), lt = Sv && Pu(Sv), kz = Object.prototype, vd = Ar.TypeError, My = Dz("toStringTag"), Ev = Lz("TYPED_ARRAY_TAG"), Ds = "TypedArrayConstructor", Vt = _z && !!la && fd(Ar.opera) !== "Opera", FT = !1, Pr, se, _n, Gt = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
}, hd = {
  BigInt64Array: 8,
  BigUint64Array: 8
}, Bz = function(t) {
  if (!Cu(t))
    return !1;
  var e = fd(t);
  return e === "DataView" || ve(Gt, e) || ve(hd, e);
}, kT = function(r) {
  var t = Pu(r);
  if (Cu(t)) {
    var e = Fz(t);
    return e && ve(e, Ds) ? e[Ds] : kT(t);
  }
}, BT = function(r) {
  if (!Cu(r))
    return !1;
  var t = fd(r);
  return ve(Gt, t) || ve(hd, t);
}, jz = function(r) {
  if (BT(r))
    return r;
  throw new vd("Target is not a typed array");
}, Uz = function(r) {
  if (NT(r) && (!la || Nz(Et, r)))
    return r;
  throw new vd(Cz(r) + " is not a typed array constructor");
}, zz = function(r, t, e, n) {
  if (cd) {
    if (e)
      for (var a in Gt) {
        var i = Ar[a];
        if (i && ve(i.prototype, r))
          try {
            delete i.prototype[r];
          } catch {
            try {
              i.prototype[r] = t;
            } catch {
            }
          }
      }
    (!lt[r] || e) && wv(lt, r, e ? t : Vt && Sv[r] || t, n);
  }
}, Vz = function(r, t, e) {
  var n, a;
  if (cd) {
    if (la) {
      if (e) {
        for (n in Gt)
          if (a = Ar[n], a && ve(a, r))
            try {
              delete a[r];
            } catch {
            }
      }
      if (!Et[r] || e)
        try {
          return wv(Et, r, e ? t : Vt && Et[r] || t);
        } catch {
        }
      else
        return;
    }
    for (n in Gt)
      a = Ar[n], a && (!a[r] || e) && wv(a, r, t);
  }
};
for (Pr in Gt)
  se = Ar[Pr], _n = se && se.prototype, _n ? LT(_n)[Ds] = se : Vt = !1;
for (Pr in hd)
  se = Ar[Pr], _n = se && se.prototype, _n && (LT(_n)[Ds] = se);
if ((!Vt || !NT(Et) || Et === Function.prototype) && (Et = function() {
  throw new vd("Incorrect invocation");
}, Vt))
  for (Pr in Gt)
    Ar[Pr] && la(Ar[Pr], Et);
if ((!Vt || !lt || lt === kz) && (lt = Et.prototype, Vt))
  for (Pr in Gt)
    Ar[Pr] && la(Ar[Pr].prototype, lt);
Vt && Pu(Py) !== lt && la(Py, lt);
if (cd && !ve(lt, My)) {
  FT = !0, Mz(lt, My, {
    configurable: !0,
    get: function() {
      return Cu(this) ? this[Ev] : void 0;
    }
  });
  for (Pr in Gt)
    Ar[Pr] && Pz(Ar[Pr], Ev, Pr);
}
var q = {
  NATIVE_ARRAY_BUFFER_VIEWS: Vt,
  TYPED_ARRAY_TAG: FT && Ev,
  aTypedArray: jz,
  aTypedArrayConstructor: Uz,
  exportTypedArrayMethod: zz,
  exportTypedArrayStaticMethod: Vz,
  getTypedArrayConstructor: kT,
  isView: Bz,
  isTypedArray: BT,
  TypedArray: Et,
  TypedArrayPrototype: lt
}, Gz = d, jT = q, Hz = jT.NATIVE_ARRAY_BUFFER_VIEWS;
Gz({ target: "ArrayBuffer", stat: !0, forced: !Hz }, {
  isView: jT.isView
});
var Wz = d, dd = He, qz = I, UT = _u, Ny = k, Dy = Kt, Yz = Ur, gd = UT.ArrayBuffer, Tv = UT.DataView, zT = Tv.prototype, Ly = dd(gd.prototype.slice), Kz = dd(zT.getUint8), Xz = dd(zT.setUint8), Jz = qz(function() {
  return !new gd(2).slice(1, void 0).byteLength;
});
Wz({ target: "ArrayBuffer", proto: !0, unsafe: !0, forced: Jz }, {
  slice: function(t, e) {
    if (Ly && e === void 0)
      return Ly(Ny(this), t);
    for (var n = Ny(this).byteLength, a = Dy(t, n), i = Dy(e === void 0 ? n : e, n), o = new gd(Yz(i - a)), s = new Tv(this), u = new Tv(o), l = 0; a < i; )
      Xz(u, l++, Kz(s, a++));
    return o;
  }
});
var Zz = d, Qz = _u, r7 = Iu;
Zz({ global: !0, constructor: !0, forced: !r7 }, {
  DataView: Qz.DataView
});
var t7 = d, e7 = O, VT = Math.pow, Fy = 31, n7 = 1023, ky = VT(2, -24), By = 9765625e-10, a7 = function(r) {
  var t = r >>> 15, e = r >>> 10 & Fy, n = r & n7;
  return e === Fy ? n === 0 ? t === 0 ? 1 / 0 : -1 / 0 : NaN : e === 0 ? n * (t === 0 ? ky : -ky) : VT(2, e - 15) * (t === 0 ? 1 + n * By : -1 - n * By);
}, i7 = e7(DataView.prototype.getUint16);
t7({ target: "DataView", proto: !0 }, {
  getFloat16: function(t) {
    var e = i7(this, t, arguments.length > 1 ? arguments[1] : !1);
    return a7(e);
  }
});
var o7 = vt, s7 = TypeError, u7 = function(r) {
  if (o7(r) === "DataView")
    return r;
  throw new s7("Argument is not a DataView");
}, l7 = Math.log, c7 = Math.LN2, GT = Math.log2 || function(t) {
  return l7(t) / c7;
}, f7 = d, v7 = O, h7 = u7, d7 = Ou, g7 = GT, jy = IT, p7 = Math.pow, $7 = 65520, y7 = 61005353927612305e-21, m7 = 16777216, rc = 1024, b7 = function(r) {
  if (r !== r)
    return 32256;
  if (r === 0)
    return (1 / r === -1 / 0) << 15;
  var t = r < 0;
  if (t && (r = -r), r >= $7)
    return t << 15 | 31744;
  if (r < y7)
    return t << 15 | jy(r * m7);
  var e = g7(r) | 0;
  if (e === -15)
    return t << 15 | rc;
  var n = jy((r * p7(2, -e) - 1) * rc);
  return n === rc ? t << 15 | e + 16 << 10 : t << 15 | e + 15 << 10 | n;
}, w7 = v7(DataView.prototype.setUint16);
f7({ target: "DataView", proto: !0 }, {
  setFloat16: function(t, e) {
    h7(this);
    var n = d7(t), a = b7(+e);
    return w7(this, n, a, arguments.length > 2 ? arguments[2] : !1);
  }
});
var HT = _, S7 = yu, E7 = Er, Uy = HT.ArrayBuffer, T7 = HT.TypeError, WT = Uy && S7(Uy.prototype, "byteLength", "get") || function(r) {
  if (E7(r) !== "ArrayBuffer")
    throw new T7("ArrayBuffer expected");
  return r.byteLength;
}, x7 = _, I7 = Iu, O7 = WT, A7 = x7.DataView, qT = function(r) {
  if (!I7 || O7(r) !== 0)
    return !1;
  try {
    return new A7(r), !1;
  } catch {
    return !0;
  }
}, R7 = j, _7 = hr, C7 = qT, zy = ArrayBuffer.prototype;
R7 && !("detached" in zy) && _7(zy, "detached", {
  configurable: !0,
  get: function() {
    return C7(this);
  }
});
var P7 = qT, M7 = TypeError, N7 = function(r) {
  if (P7(r))
    throw new M7("ArrayBuffer is detached");
  return r;
}, D7 = _, L7 = oa, YT = function(r) {
  if (L7) {
    try {
      return D7.process.getBuiltinModule(r);
    } catch {
    }
    try {
      return Function('return require("' + r + '")')();
    } catch {
    }
  }
}, F7 = _, k7 = I, tc = qt, ec = Tu, Vy = F7.structuredClone, pd = !!Vy && !k7(function() {
  if (ec === "DENO" && tc > 92 || ec === "NODE" && tc > 94 || ec === "BROWSER" && tc > 97)
    return !1;
  var r = new ArrayBuffer(8), t = Vy(r, { transfer: [r] });
  return r.byteLength !== 0 || t.byteLength !== 8;
}), $d = _, B7 = YT, j7 = pd, U7 = $d.structuredClone, Gy = $d.ArrayBuffer, $o = $d.MessageChannel, xv = !1, nc, Hy, yo, ac;
if (j7)
  xv = function(r) {
    U7(r, { transfer: [r] });
  };
else if (Gy)
  try {
    $o || (nc = B7("worker_threads"), nc && ($o = nc.MessageChannel)), $o && (Hy = new $o(), yo = new Gy(2), ac = function(r) {
      Hy.port1.postMessage(null, [r]);
    }, yo.byteLength === 2 && (ac(yo), yo.byteLength === 0 && (xv = ac)));
  } catch {
  }
var KT = xv, yd = _, md = O, XT = yu, z7 = Ou, V7 = N7, G7 = WT, Wy = KT, ic = pd, H7 = yd.structuredClone, JT = yd.ArrayBuffer, Iv = yd.DataView, W7 = Math.min, bd = JT.prototype, ZT = Iv.prototype, q7 = md(bd.slice), qy = XT(bd, "resizable", "get"), Yy = XT(bd, "maxByteLength", "get"), Y7 = md(ZT.getInt8), K7 = md(ZT.setInt8), QT = (ic || Wy) && function(r, t, e) {
  var n = G7(r), a = t === void 0 ? n : z7(t), i = !qy || !qy(r), o;
  if (V7(r), ic && (r = H7(r, { transfer: [r] }), n === a && (e || i)))
    return r;
  if (n >= a && (!e || i))
    o = q7(r, 0, a);
  else {
    var s = e && !i && Yy ? { maxByteLength: Yy(r) } : void 0;
    o = new JT(a, s);
    for (var u = new Iv(r), l = new Iv(o), c = W7(a, n), f = 0; f < c; f++)
      K7(l, f, Y7(u, f));
  }
  return ic || Wy(r), o;
}, X7 = d, Ky = QT;
Ky && X7({ target: "ArrayBuffer", proto: !0 }, {
  transfer: function() {
    return Ky(this, arguments.length ? arguments[0] : void 0, !0);
  }
});
var J7 = d, Xy = QT;
Xy && J7({ target: "ArrayBuffer", proto: !0 }, {
  transferToFixedLength: function() {
    return Xy(this, arguments.length ? arguments[0] : void 0, !1);
  }
});
var Z7 = d, Q7 = O, rV = I, tV = rV(function() {
  return (/* @__PURE__ */ new Date(16e11)).getYear() !== 120;
}), eV = Q7(Date.prototype.getFullYear);
Z7({ target: "Date", proto: !0, forced: tV }, {
  getYear: function() {
    return eV(this) - 1900;
  }
});
var nV = d, aV = O, rx = Date, iV = aV(rx.prototype.getTime);
nV({ target: "Date", stat: !0 }, {
  now: function() {
    return iV(new rx());
  }
});
var oV = d, tx = O, sV = fr, ex = Date.prototype, uV = tx(ex.getTime), lV = tx(ex.setFullYear);
oV({ target: "Date", proto: !0 }, {
  setYear: function(t) {
    uV(this);
    var e = sV(t), n = e >= 0 && e <= 99 ? e + 1900 : e;
    return lV(this, n);
  }
});
var cV = d;
cV({ target: "Date", proto: !0 }, {
  toGMTString: Date.prototype.toUTCString
});
var fV = fr, vV = G, hV = sr, dV = RangeError, Mu = function(t) {
  var e = vV(hV(this)), n = "", a = fV(t);
  if (a < 0 || a === 1 / 0)
    throw new dV("Wrong number of repetitions");
  for (; a > 0; (a >>>= 1) && (e += e))
    a & 1 && (n += e);
  return n;
}, nx = O, gV = Ur, Jy = G, pV = Mu, $V = sr, yV = nx(pV), mV = nx("".slice), bV = Math.ceil, Zy = function(r) {
  return function(t, e, n) {
    var a = Jy($V(t)), i = gV(e), o = a.length, s = n === void 0 ? " " : Jy(n), u, l;
    return i <= o || s === "" ? a : (u = i - o, l = yV(s, bV(u / s.length)), l.length > u && (l = mV(l, 0, u)), r ? a + l : l + a);
  };
}, Nu = {
  // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart
  start: Zy(!1),
  // `String.prototype.padEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.padend
  end: Zy(!0)
}, $e = O, Qy = I, Te = Nu.start, wV = RangeError, SV = isFinite, EV = Math.abs, Zt = Date.prototype, oc = Zt.toISOString, TV = $e(Zt.getTime), xV = $e(Zt.getUTCDate), IV = $e(Zt.getUTCFullYear), OV = $e(Zt.getUTCHours), AV = $e(Zt.getUTCMilliseconds), RV = $e(Zt.getUTCMinutes), _V = $e(Zt.getUTCMonth), CV = $e(Zt.getUTCSeconds), PV = Qy(function() {
  return oc.call(new Date(-5e13 - 1)) !== "0385-07-25T07:06:39.999Z";
}) || !Qy(function() {
  oc.call(/* @__PURE__ */ new Date(NaN));
}) ? function() {
  if (!SV(TV(this)))
    throw new wV("Invalid time value");
  var t = this, e = IV(t), n = AV(t), a = e < 0 ? "-" : e > 9999 ? "+" : "";
  return a + Te(EV(e), a ? 6 : 4, 0) + "-" + Te(_V(t) + 1, 2, 0) + "-" + Te(xV(t), 2, 0) + "T" + Te(OV(t), 2, 0) + ":" + Te(RV(t), 2, 0) + ":" + Te(CV(t), 2, 0) + "." + Te(n, 3, 0) + "Z";
} : oc, MV = d, rm = PV;
MV({ target: "Date", proto: !0, forced: Date.prototype.toISOString !== rm }, {
  toISOString: rm
});
var NV = d, DV = I, LV = Z, FV = uu, kV = DV(function() {
  return (/* @__PURE__ */ new Date(NaN)).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function() {
    return 1;
  } }) !== 1;
});
NV({ target: "Date", proto: !0, arity: 1, forced: kV }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  toJSON: function(t) {
    var e = LV(this), n = FV(e, "number");
    return typeof n == "number" && !isFinite(n) ? null : e.toISOString();
  }
});
var BV = k, jV = XS, UV = TypeError, zV = function(r) {
  if (BV(this), r === "string" || r === "default")
    r = "string";
  else if (r !== "number")
    throw new UV("Incorrect hint");
  return jV(this, r);
}, VV = K, GV = lr, HV = zV, WV = W, tm = WV("toPrimitive"), em = Date.prototype;
VV(em, tm) || GV(em, tm, HV);
var ax = O, qV = lr, wd = Date.prototype, nm = "Invalid Date", ix = "toString", YV = ax(wd[ix]), KV = ax(wd.getTime);
String(/* @__PURE__ */ new Date(NaN)) !== nm && qV(wd, ix, function() {
  var t = KV(this);
  return t === t ? YV(this) : nm;
});
var XV = d, Li = O, JV = G, ZV = Li("".charAt), QV = Li("".charCodeAt), rG = Li(/./.exec), tG = Li(1 .toString), eG = Li("".toUpperCase), nG = /[\w*+\-./@]/, am = function(r, t) {
  for (var e = tG(r, 16); e.length < t; )
    e = "0" + e;
  return e;
};
XV({ global: !0 }, {
  escape: function(t) {
    for (var e = JV(t), n = "", a = e.length, i = 0, o, s; i < a; )
      o = ZV(e, i++), rG(nG, o) ? n += o : (s = QV(o, 0), s < 256 ? n += "%" + am(s, 2) : n += "%u" + eG(am(s, 4)));
    return n;
  }
});
var ox = O, aG = J, iG = H, oG = K, im = rt, sG = mi, sx = Function, uG = ox([].concat), lG = ox([].join), sc = {}, cG = function(r, t, e) {
  if (!oG(sc, t)) {
    for (var n = [], a = 0; a < t; a++)
      n[a] = "a[" + a + "]";
    sc[t] = sx("C,a", "return new C(" + lG(n, ",") + ")");
  }
  return sc[t](r, e);
}, ux = sG ? sx.bind : function(t) {
  var e = aG(this), n = e.prototype, a = im(arguments, 1), i = function() {
    var s = uG(a, im(arguments));
    return this instanceof i ? cG(e, s.length, s) : e.apply(t, s);
  };
  return iG(n) && (i.prototype = n), i;
}, fG = d, om = ux;
fG({ target: "Function", proto: !0, forced: Function.bind !== om }, {
  bind: om
});
var vG = Y, sm = H, hG = ur, dG = Dr, gG = W, pG = Lh, uc = gG("hasInstance"), um = Function.prototype;
uc in um || hG.f(um, uc, { value: pG(function(r) {
  if (!vG(this) || !sm(r))
    return !1;
  var t = this.prototype;
  return sm(t) ? dG(t, r) : r instanceof this;
}, uc) });
var $G = j, yG = ta.EXISTS, lx = O, mG = hr, cx = Function.prototype, bG = lx(cx.toString), fx = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/, wG = lx(fx.exec), SG = "name";
$G && !yG && mG(cx, SG, {
  configurable: !0,
  get: function() {
    try {
      return wG(fx, bG(this))[1];
    } catch {
      return "";
    }
  }
});
var EG = d, lc = _;
EG({ global: !0, forced: lc.globalThis !== lc }, {
  globalThis: lc
});
var TG = d, xG = _, IG = dt, OG = k, AG = Y, RG = Vr, _G = hr, CG = Xt, PG = I, Sd = K, MG = W, Ot = Di.IteratorPrototype, NG = j, cc = "constructor", vx = "Iterator", lm = MG("toStringTag"), hx = TypeError, fc = xG[vx], dx = !AG(fc) || fc.prototype !== Ot || !PG(function() {
  fc({});
}), Ed = function() {
  if (IG(this, Ot), RG(this) === Ot)
    throw new hx("Abstract class Iterator not directly constructable");
}, gx = function(r, t) {
  NG ? _G(Ot, r, {
    configurable: !0,
    get: function() {
      return t;
    },
    set: function(e) {
      if (OG(this), this === Ot)
        throw new hx("You can't redefine this property");
      Sd(this, r) ? this[r] = e : CG(this, r, e);
    }
  }) : Ot[r] = t;
};
Sd(Ot, lm) || gx(lm, vx);
(dx || !Sd(Ot, cc) || Ot[cc] === Object) && gx(cc, Ed);
Ed.prototype = Ot;
TG({ global: !0, constructor: !0, forced: dx }, {
  Iterator: Ed
});
var Gr = function(r) {
  return {
    iterator: r,
    next: r.next,
    done: !1
  };
}, DG = RangeError, px = function(r) {
  if (r === r)
    return r;
  throw new DG("NaN is not allowed");
}, LG = fr, FG = RangeError, Td = function(r) {
  var t = LG(r);
  if (t < 0)
    throw new FG("The argument can't be less than 0");
  return t;
}, kG = U, BG = zr, jG = Tr, UG = ua, zG = W, $x = vr, VG = _t, GG = Di.IteratorPrototype, mo = ia, vc = Ye, HG = zG("toStringTag"), yx = "IteratorHelper", mx = "WrapForValidIterator", WG = $x.set, bx = function(r) {
  var t = $x.getterFor(r ? mx : yx);
  return UG(BG(GG), {
    next: function() {
      var n = t(this);
      if (r)
        return n.nextHandler();
      if (n.done)
        return mo(void 0, !0);
      try {
        var a = n.nextHandler();
        return n.returnHandlerResult ? a : mo(a, n.done);
      } catch (i) {
        throw n.done = !0, i;
      }
    },
    return: function() {
      var e = t(this), n = e.iterator;
      if (e.done = !0, r) {
        var a = VG(n, "return");
        return a ? kG(a, n) : mo(void 0, !0);
      }
      if (e.inner)
        try {
          vc(e.inner.iterator, "normal");
        } catch (i) {
          return vc(n, "throw", i);
        }
      return n && vc(n, "normal"), mo(void 0, !0);
    }
  });
}, qG = bx(!0), wx = bx(!1);
jG(wx, HG, "Iterator Helper");
var ca = function(r, t, e) {
  var n = function(i, o) {
    o ? (o.iterator = i.iterator, o.next = i.next) : o = i, o.type = t ? mx : yx, o.returnHandlerResult = !!e, o.nextHandler = r, o.counter = 0, o.done = !1, WG(this, o);
  };
  return n.prototype = t ? qG : wx, n;
}, YG = d, cm = U, Ov = k, KG = Gr, XG = px, JG = Td, ZG = ca, QG = Yt, rH = ZG(function() {
  for (var r = this.iterator, t = this.next, e, n; this.remaining; )
    if (this.remaining--, e = Ov(cm(t, r)), n = this.done = !!e.done, n)
      return;
  if (e = Ov(cm(t, r)), n = this.done = !!e.done, !n)
    return e.value;
});
YG({ target: "Iterator", proto: !0, real: !0, forced: QG }, {
  drop: function(t) {
    Ov(this);
    var e = JG(XG(+t));
    return new rH(KG(this), {
      remaining: e
    });
  }
});
var tH = d, eH = pr, nH = J, aH = k, iH = Gr;
tH({ target: "Iterator", proto: !0, real: !0 }, {
  every: function(t) {
    aH(this), nH(t);
    var e = iH(this), n = 0;
    return !eH(e, function(a, i) {
      if (!t(a, n++))
        return i();
    }, { IS_RECORD: !0, INTERRUPTED: !0 }).stopped;
  }
});
var oH = d, sH = U, uH = J, Sx = k, lH = Gr, cH = ca, fH = Zh, vH = Yt, hH = cH(function() {
  for (var r = this.iterator, t = this.predicate, e = this.next, n, a, i; ; ) {
    if (n = Sx(sH(e, r)), a = this.done = !!n.done, a)
      return;
    if (i = n.value, fH(r, t, [i, this.counter++], !0))
      return i;
  }
});
oH({ target: "Iterator", proto: !0, real: !0, forced: vH }, {
  filter: function(t) {
    return Sx(this), uH(t), new hH(lH(this), {
      predicate: t
    });
  }
});
var dH = d, gH = pr, pH = J, $H = k, yH = Gr;
dH({ target: "Iterator", proto: !0, real: !0 }, {
  find: function(t) {
    $H(this), pH(t);
    var e = yH(this), n = 0;
    return gH(e, function(a, i) {
      if (t(a, n++))
        return i(a);
    }, { IS_RECORD: !0, INTERRUPTED: !0 }).result;
  }
});
var mH = U, fm = k, bH = Gr, wH = na, Ex = function(r, t) {
  (!t || typeof r != "string") && fm(r);
  var e = wH(r);
  return bH(fm(e !== void 0 ? mH(e, r) : r));
}, SH = d, vm = U, EH = J, Av = k, TH = Gr, xH = Ex, IH = ca, hm = Ye, OH = Yt, AH = IH(function() {
  for (var r = this.iterator, t = this.mapper, e, n; ; ) {
    if (n = this.inner)
      try {
        if (e = Av(vm(n.next, n.iterator)), !e.done)
          return e.value;
        this.inner = null;
      } catch (a) {
        hm(r, "throw", a);
      }
    if (e = Av(vm(this.next, r)), this.done = !!e.done)
      return;
    try {
      this.inner = xH(t(e.value, this.counter++), !1);
    } catch (a) {
      hm(r, "throw", a);
    }
  }
});
SH({ target: "Iterator", proto: !0, real: !0, forced: OH }, {
  flatMap: function(t) {
    return Av(this), EH(t), new AH(TH(this), {
      mapper: t,
      inner: null
    });
  }
});
var RH = d, _H = pr, CH = J, PH = k, MH = Gr;
RH({ target: "Iterator", proto: !0, real: !0 }, {
  forEach: function(t) {
    PH(this), CH(t);
    var e = MH(this), n = 0;
    _H(e, function(a) {
      t(a, n++);
    }, { IS_RECORD: !0 });
  }
});
var NH = d, DH = U, LH = Z, FH = Dr, kH = Di.IteratorPrototype, BH = ca, jH = Ex, UH = Yt, zH = BH(function() {
  return DH(this.next, this.iterator);
}, !0);
NH({ target: "Iterator", stat: !0, forced: UH }, {
  from: function(t) {
    var e = jH(typeof t == "string" ? LH(t) : t, !0);
    return FH(kH, e.iterator) ? e.iterator : new zH(e);
  }
});
var VH = U, GH = J, Tx = k, HH = Gr, WH = ca, qH = Zh, YH = WH(function() {
  var r = this.iterator, t = Tx(VH(this.next, r)), e = this.done = !!t.done;
  if (!e)
    return qH(r, this.mapper, [t.value, this.counter++], !0);
}), KH = function(t) {
  return Tx(this), GH(t), new YH(HH(this), {
    mapper: t
  });
}, XH = d, JH = KH, ZH = Yt;
XH({ target: "Iterator", proto: !0, real: !0, forced: ZH }, {
  map: JH
});
var QH = d, r9 = pr, t9 = J, e9 = k, n9 = Gr, a9 = TypeError;
QH({ target: "Iterator", proto: !0, real: !0 }, {
  reduce: function(t) {
    e9(this), t9(t);
    var e = n9(this), n = arguments.length < 2, a = n ? void 0 : arguments[1], i = 0;
    if (r9(e, function(o) {
      n ? (n = !1, a = o) : a = t(a, o, i), i++;
    }, { IS_RECORD: !0 }), n)
      throw new a9("Reduce of empty iterator with no initial value");
    return a;
  }
});
var i9 = d, o9 = pr, s9 = J, u9 = k, l9 = Gr;
i9({ target: "Iterator", proto: !0, real: !0 }, {
  some: function(t) {
    u9(this), s9(t);
    var e = l9(this), n = 0;
    return o9(e, function(a, i) {
      if (t(a, n++))
        return i();
    }, { IS_RECORD: !0, INTERRUPTED: !0 }).stopped;
  }
});
var c9 = d, f9 = U, xx = k, v9 = Gr, h9 = px, d9 = Td, g9 = ca, p9 = Ye, $9 = Yt, y9 = g9(function() {
  var r = this.iterator;
  if (!this.remaining--)
    return this.done = !0, p9(r, "normal", void 0);
  var t = xx(f9(this.next, r)), e = this.done = !!t.done;
  if (!e)
    return t.value;
});
c9({ target: "Iterator", proto: !0, real: !0, forced: $9 }, {
  take: function(t) {
    xx(this);
    var e = d9(h9(+t));
    return new y9(v9(this), {
      remaining: e
    });
  }
});
var m9 = d, b9 = k, w9 = pr, S9 = Gr, E9 = [].push;
m9({ target: "Iterator", proto: !0, real: !0 }, {
  toArray: function() {
    var t = [];
    return w9(S9(b9(this)), E9, { that: t, IS_RECORD: !0 }), t;
  }
});
var T9 = _, x9 = Fr;
x9(T9.JSON, "JSON", !0);
var Ix = { exports: {} }, I9 = I, xd = I9(function() {
  if (typeof ArrayBuffer == "function") {
    var r = new ArrayBuffer(8);
    Object.isExtensible(r) && Object.defineProperty(r, "a", { value: 8 });
  }
}), O9 = I, A9 = H, R9 = Er, dm = xd, as = Object.isExtensible, _9 = O9(function() {
  as(1);
}), Id = _9 || dm ? function(t) {
  return !A9(t) || dm && R9(t) === "ArrayBuffer" ? !1 : as ? as(t) : !0;
} : as, C9 = I, fa = !C9(function() {
  return Object.isExtensible(Object.preventExtensions({}));
}), P9 = d, M9 = O, N9 = wi, D9 = H, Od = K, L9 = ur.f, gm = ge, F9 = vu, Ad = Id, k9 = ra, B9 = fa, Ox = !1, Ht = k9("meta"), j9 = 0, Rd = function(r) {
  L9(r, Ht, { value: {
    objectID: "O" + j9++,
    // object ID
    weakData: {}
    // weak collections IDs
  } });
}, U9 = function(r, t) {
  if (!D9(r))
    return typeof r == "symbol" ? r : (typeof r == "string" ? "S" : "P") + r;
  if (!Od(r, Ht)) {
    if (!Ad(r))
      return "F";
    if (!t)
      return "E";
    Rd(r);
  }
  return r[Ht].objectID;
}, z9 = function(r, t) {
  if (!Od(r, Ht)) {
    if (!Ad(r))
      return !0;
    if (!t)
      return !1;
    Rd(r);
  }
  return r[Ht].weakData;
}, V9 = function(r) {
  return B9 && Ox && Ad(r) && !Od(r, Ht) && Rd(r), r;
}, G9 = function() {
  H9.enable = function() {
  }, Ox = !0;
  var r = gm.f, t = M9([].splice), e = {};
  e[Ht] = 1, r(e).length && (gm.f = function(n) {
    for (var a = r(n), i = 0, o = a.length; i < o; i++)
      if (a[i] === Ht) {
        t(a, i, 1);
        break;
      }
    return a;
  }, P9({ target: "Object", stat: !0, forced: !0 }, {
    getOwnPropertyNames: F9.f
  }));
}, H9 = Ix.exports = {
  enable: G9,
  fastKey: U9,
  getWeakData: z9,
  onFreeze: V9
};
N9[Ht] = !0;
var Ke = Ix.exports, W9 = d, q9 = _, Y9 = O, pm = Ii, K9 = lr, X9 = Ke, J9 = pr, Z9 = dt, Q9 = Y, rW = Nr, hc = H, dc = I, tW = Su, eW = Fr, nW = We, Du = function(r, t, e) {
  var n = r.indexOf("Map") !== -1, a = r.indexOf("Weak") !== -1, i = n ? "set" : "add", o = q9[r], s = o && o.prototype, u = o, l = {}, c = function(y) {
    var S = Y9(s[y]);
    K9(
      s,
      y,
      y === "add" ? function(A) {
        return S(this, A === 0 ? 0 : A), this;
      } : y === "delete" ? function(x) {
        return a && !hc(x) ? !1 : S(this, x === 0 ? 0 : x);
      } : y === "get" ? function(A) {
        return a && !hc(A) ? void 0 : S(this, A === 0 ? 0 : A);
      } : y === "has" ? function(A) {
        return a && !hc(A) ? !1 : S(this, A === 0 ? 0 : A);
      } : function(A, N) {
        return S(this, A === 0 ? 0 : A, N), this;
      }
    );
  }, f = pm(
    r,
    !Q9(o) || !(a || s.forEach && !dc(function() {
      new o().entries().next();
    }))
  );
  if (f)
    u = e.getConstructor(t, r, n, i), X9.enable();
  else if (pm(r, !0)) {
    var v = new u(), h = v[i](a ? {} : -0, 1) !== v, g = dc(function() {
      v.has(1);
    }), $ = tW(function(y) {
      new o(y);
    }), p = !a && dc(function() {
      for (var y = new o(), S = 5; S--; )
        y[i](S, S);
      return !y.has(-0);
    });
    $ || (u = t(function(y, S) {
      Z9(y, s);
      var x = nW(new o(), y, u);
      return rW(S) || J9(S, x[i], { that: x, AS_ENTRIES: n }), x;
    }), u.prototype = s, s.constructor = u), (g || p) && (c("delete"), c("has"), n && c("get")), (p || h) && c(i), a && s.clear && delete s.clear;
  }
  return l[r] = u, W9({ global: !0, constructor: !0, forced: u !== o }, l), eW(u, r), a || e.setStrong(u, r, n), u;
}, $m = zr, aW = hr, ym = ua, iW = ht, oW = dt, sW = Nr, uW = pr, lW = rd, bo = ia, cW = sa, Ia = j, mm = Ke.fastKey, Ax = vr, bm = Ax.set, gc = Ax.getterFor, Rx = {
  getConstructor: function(r, t, e, n) {
    var a = r(function(l, c) {
      oW(l, i), bm(l, {
        type: t,
        index: $m(null),
        first: null,
        last: null,
        size: 0
      }), Ia || (l.size = 0), sW(c) || uW(c, l[n], { that: l, AS_ENTRIES: e });
    }), i = a.prototype, o = gc(t), s = function(l, c, f) {
      var v = o(l), h = u(l, c), g, $;
      return h ? h.value = f : (v.last = h = {
        index: $ = mm(c, !0),
        key: c,
        value: f,
        previous: g = v.last,
        next: null,
        removed: !1
      }, v.first || (v.first = h), g && (g.next = h), Ia ? v.size++ : l.size++, $ !== "F" && (v.index[$] = h)), l;
    }, u = function(l, c) {
      var f = o(l), v = mm(c), h;
      if (v !== "F")
        return f.index[v];
      for (h = f.first; h; h = h.next)
        if (h.key === c)
          return h;
    };
    return ym(i, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function() {
        for (var c = this, f = o(c), v = f.first; v; )
          v.removed = !0, v.previous && (v.previous = v.previous.next = null), v = v.next;
        f.first = f.last = null, f.index = $m(null), Ia ? f.size = 0 : c.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      delete: function(l) {
        var c = this, f = o(c), v = u(c, l);
        if (v) {
          var h = v.next, g = v.previous;
          delete f.index[v.index], v.removed = !0, g && (g.next = h), h && (h.previous = g), f.first === v && (f.first = h), f.last === v && (f.last = g), Ia ? f.size-- : c.size--;
        }
        return !!v;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function(c) {
        for (var f = o(this), v = iW(c, arguments.length > 1 ? arguments[1] : void 0), h; h = h ? h.next : f.first; )
          for (v(h.value, h.key, this); h && h.removed; )
            h = h.previous;
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function(c) {
        return !!u(this, c);
      }
    }), ym(i, e ? {
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
    }), Ia && aW(i, "size", {
      configurable: !0,
      get: function() {
        return o(this).size;
      }
    }), a;
  },
  setStrong: function(r, t, e) {
    var n = t + " Iterator", a = gc(t), i = gc(n);
    lW(r, t, function(o, s) {
      bm(this, {
        type: n,
        target: o,
        state: a(o),
        kind: s,
        last: null
      });
    }, function() {
      for (var o = i(this), s = o.kind, u = o.last; u && u.removed; )
        u = u.previous;
      return !o.target || !(o.last = u = u ? u.next : o.state.first) ? (o.target = null, bo(void 0, !0)) : bo(s === "keys" ? u.key : s === "values" ? u.value : [u.key, u.value], !1);
    }, e ? "entries" : "values", !e, !0), cW(t);
  }
}, fW = Du, vW = Rx;
fW("Map", function(r) {
  return function() {
    return r(this, arguments.length ? arguments[0] : void 0);
  };
}, vW);
var wo = O, Oa = Map.prototype, _x = {
  // eslint-disable-next-line es/no-map -- safe
  Map,
  set: wo(Oa.set),
  get: wo(Oa.get),
  has: wo(Oa.has),
  remove: wo(Oa.delete),
  proto: Oa
}, hW = d, dW = O, gW = J, pW = sr, $W = pr, Lu = _x, yW = I, Cx = Lu.Map, mW = Lu.has, bW = Lu.get, wW = Lu.set, SW = dW([].push), EW = yW(function() {
  return Cx.groupBy("ab", function(r) {
    return r;
  }).get("a").length !== 1;
});
hW({ target: "Map", stat: !0, forced: EW }, {
  groupBy: function(t, e) {
    pW(t), gW(e);
    var n = new Cx(), a = 0;
    return $W(t, function(i) {
      var o = e(i, a++);
      mW(n, o) ? SW(bW(n, o), i) : wW(n, o, [i]);
    }), n;
  }
});
var TW = Math.log, Px = Math.log1p || function(t) {
  var e = +t;
  return e > -1e-8 && e < 1e-8 ? e - e * e / 2 : TW(1 + e);
}, xW = d, IW = Px, pc = Math.acosh, OW = Math.log, wm = Math.sqrt, AW = Math.LN2, RW = !pc || Math.floor(pc(Number.MAX_VALUE)) !== 710 || pc(1 / 0) !== 1 / 0;
xW({ target: "Math", stat: !0, forced: RW }, {
  acosh: function(t) {
    var e = +t;
    return e < 1 ? NaN : e > 9490626562425156e-8 ? OW(e) + AW : IW(e - 1 + wm(e - 1) * wm(e + 1));
  }
});
var _W = d, Sm = Math.asinh, CW = Math.log, PW = Math.sqrt;
function Mx(r) {
  var t = +r;
  return !isFinite(t) || t === 0 ? t : t < 0 ? -Mx(-t) : CW(t + PW(t * t + 1));
}
var MW = !(Sm && 1 / Sm(0) > 0);
_W({ target: "Math", stat: !0, forced: MW }, {
  asinh: Mx
});
var NW = d, Em = Math.atanh, DW = Math.log, LW = !(Em && 1 / Em(-0) < 0);
NW({ target: "Math", stat: !0, forced: LW }, {
  atanh: function(t) {
    var e = +t;
    return e === 0 ? e : DW((1 + e) / (1 - e)) / 2;
  }
});
var FW = d, kW = od, BW = Math.abs, jW = Math.pow;
FW({ target: "Math", stat: !0 }, {
  cbrt: function(t) {
    var e = +t;
    return kW(e) * jW(BW(e), 1 / 3);
  }
});
var UW = d, zW = Math.floor, VW = Math.log, GW = Math.LOG2E;
UW({ target: "Math", stat: !0 }, {
  clz32: function(t) {
    var e = t >>> 0;
    return e ? 31 - zW(VW(e + 0.5) * GW) : 32;
  }
});
var Aa = Math.expm1, HW = Math.exp, Fu = !Aa || Aa(10) > 22025.465794806718 || Aa(10) < 22025.465794806718 || Aa(-2e-17) !== -2e-17 ? function(t) {
  var e = +t;
  return e === 0 ? e : e > -1e-6 && e < 1e-6 ? e + e * e / 2 : HW(e) - 1;
} : Aa, WW = d, qW = Fu, Tm = Math.cosh, YW = Math.abs, $c = Math.E, KW = !Tm || Tm(710) === 1 / 0;
WW({ target: "Math", stat: !0, forced: KW }, {
  cosh: function(t) {
    var e = qW(YW(t) - 1) + 1;
    return (e + 1 / (e * $c * $c)) * ($c / 2);
  }
});
var XW = d, xm = Fu;
XW({ target: "Math", stat: !0, forced: xm !== Math.expm1 }, { expm1: xm });
var JW = d, ZW = AT;
JW({ target: "Math", stat: !0 }, { fround: ZW });
var QW = d, rq = OT, tq = 9765625e-10, eq = 65504, nq = 6103515625e-14;
QW({ target: "Math", stat: !0 }, {
  f16round: function(t) {
    return rq(t, tq, eq, nq);
  }
});
var aq = d, Im = Math.hypot, iq = Math.abs, oq = Math.sqrt, sq = !!Im && Im(1 / 0, NaN) !== 1 / 0;
aq({ target: "Math", stat: !0, arity: 2, forced: sq }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  hypot: function(t, e) {
    for (var n = 0, a = 0, i = arguments.length, o = 0, s, u; a < i; )
      s = iq(arguments[a++]), o < s ? (u = o / s, n = n * u * u + 1, o = s) : s > 0 ? (u = s / o, n += u * u) : n += s;
    return o === 1 / 0 ? 1 / 0 : o * oq(n);
  }
});
var uq = d, lq = I, Om = Math.imul, cq = lq(function() {
  return Om(4294967295, 5) !== -5 || Om.length !== 2;
});
uq({ target: "Math", stat: !0, forced: cq }, {
  imul: function(t, e) {
    var n = 65535, a = +t, i = +e, o = n & a, s = n & i;
    return 0 | o * s + ((n & a >>> 16) * s + o * (n & i >>> 16) << 16 >>> 0);
  }
});
var fq = Math.log, vq = Math.LOG10E, Nx = Math.log10 || function(t) {
  return fq(t) * vq;
}, hq = d, dq = Nx;
hq({ target: "Math", stat: !0 }, {
  log10: dq
});
var gq = d, pq = Px;
gq({ target: "Math", stat: !0 }, { log1p: pq });
var $q = d, yq = GT;
$q({ target: "Math", stat: !0 }, {
  log2: yq
});
var mq = d, bq = od;
mq({ target: "Math", stat: !0 }, {
  sign: bq
});
var wq = d, Sq = I, Am = Fu, Eq = Math.abs, Rm = Math.exp, Tq = Math.E, xq = Sq(function() {
  return Math.sinh(-2e-17) !== -2e-17;
});
wq({ target: "Math", stat: !0, forced: xq }, {
  sinh: function(t) {
    var e = +t;
    return Eq(e) < 1 ? (Am(e) - Am(-e)) / 2 : (Rm(e - 1) - Rm(-e - 1)) * (Tq / 2);
  }
});
var Iq = d, _m = Fu, Cm = Math.exp;
Iq({ target: "Math", stat: !0 }, {
  tanh: function(t) {
    var e = +t, n = _m(e), a = _m(-e);
    return n === 1 / 0 ? 1 : a === 1 / 0 ? -1 : (n - a) / (Cm(e) + Cm(-e));
  }
});
var Oq = Fr;
Oq(Math, "Math", !0);
var Aq = d, Rq = iE;
Aq({ target: "Math", stat: !0 }, {
  trunc: Rq
});
var _q = O, ku = _q(1 .valueOf), Fi = `	
\v\f\r                　\u2028\u2029\uFEFF`, Cq = O, Pq = sr, Mq = G, Rv = Fi, Pm = Cq("".replace), Nq = RegExp("^[" + Rv + "]+"), Dq = RegExp("(^|[^" + Rv + "])[" + Rv + "]+$"), yc = function(r) {
  return function(t) {
    var e = Mq(Pq(t));
    return r & 1 && (e = Pm(e, Nq, "")), r & 2 && (e = Pm(e, Dq, "$1")), e;
  };
}, va = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: yc(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: yc(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: yc(3)
}, Lq = d, Dx = Yt, Fq = j, Lx = _, Fx = hE, kx = O, kq = Ii, Mm = K, Bq = We, jq = Dr, Uq = Ve, Bx = uu, zq = I, Vq = ge.f, Gq = Sr.f, Hq = ur.f, Wq = ku, qq = va.trim, Bu = "Number", Cn = Lx[Bu];
Fx[Bu];
var _d = Cn.prototype, Yq = Lx.TypeError, Kq = kx("".slice), So = kx("".charCodeAt), Xq = function(r) {
  var t = Bx(r, "number");
  return typeof t == "bigint" ? t : Jq(t);
}, Jq = function(r) {
  var t = Bx(r, "number"), e, n, a, i, o, s, u, l;
  if (Uq(t))
    throw new Yq("Cannot convert a Symbol value to a number");
  if (typeof t == "string" && t.length > 2) {
    if (t = qq(t), e = So(t, 0), e === 43 || e === 45) {
      if (n = So(t, 2), n === 88 || n === 120)
        return NaN;
    } else if (e === 48) {
      switch (So(t, 1)) {
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
      for (o = Kq(t, 2), s = o.length, u = 0; u < s; u++)
        if (l = So(o, u), l < 48 || l > i)
          return NaN;
      return parseInt(o, a);
    }
  }
  return +t;
}, Cd = kq(Bu, !Cn(" 0o1") || !Cn("0b1") || Cn("+0x1")), Zq = function(r) {
  return jq(_d, r) && zq(function() {
    Wq(r);
  });
}, ju = function(t) {
  var e = arguments.length < 1 ? 0 : Cn(Xq(t));
  return Zq(this) ? Bq(Object(e), this, ju) : e;
};
ju.prototype = _d;
Cd && !Dx && (_d.constructor = ju);
Lq({ global: !0, constructor: !0, wrap: !0, forced: Cd }, {
  Number: ju
});
var Qq = function(r, t) {
  for (var e = Fq ? Vq(t) : (
    // ES3:
    "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(",")
  ), n = 0, a; e.length > n; n++)
    Mm(t, a = e[n]) && !Mm(r, a) && Hq(r, a, Gq(t, a));
};
(Cd || Dx) && Qq(Fx[Bu], Cn);
var rY = d;
rY({ target: "Number", stat: !0, nonConfigurable: !0, nonWritable: !0 }, {
  EPSILON: Math.pow(2, -52)
});
var tY = _, eY = tY.isFinite, nY = Number.isFinite || function(t) {
  return typeof t == "number" && eY(t);
}, aY = d, iY = nY;
aY({ target: "Number", stat: !0 }, { isFinite: iY });
var oY = H, sY = Math.floor, Pd = Number.isInteger || function(t) {
  return !oY(t) && isFinite(t) && sY(t) === t;
}, uY = d, lY = Pd;
uY({ target: "Number", stat: !0 }, {
  isInteger: lY
});
var cY = d;
cY({ target: "Number", stat: !0 }, {
  isNaN: function(t) {
    return t !== t;
  }
});
var fY = d, vY = Pd, hY = Math.abs;
fY({ target: "Number", stat: !0 }, {
  isSafeInteger: function(t) {
    return vY(t) && hY(t) <= 9007199254740991;
  }
});
var dY = d;
dY({ target: "Number", stat: !0, nonConfigurable: !0, nonWritable: !0 }, {
  MAX_SAFE_INTEGER: 9007199254740991
});
var gY = d;
gY({ target: "Number", stat: !0, nonConfigurable: !0, nonWritable: !0 }, {
  MIN_SAFE_INTEGER: -9007199254740991
});
var jx = _, pY = I, $Y = O, yY = G, mY = va.trim, bY = Fi, wY = $Y("".charAt), Ls = jx.parseFloat, Nm = jx.Symbol, Dm = Nm && Nm.iterator, SY = 1 / Ls(bY + "-0") !== -1 / 0 || Dm && !pY(function() {
  Ls(Object(Dm));
}), Ux = SY ? function(t) {
  var e = mY(yY(t)), n = Ls(e);
  return n === 0 && wY(e, 0) === "-" ? -0 : n;
} : Ls, EY = d, Lm = Ux;
EY({ target: "Number", stat: !0, forced: Number.parseFloat !== Lm }, {
  parseFloat: Lm
});
var zx = _, TY = I, xY = O, IY = G, OY = va.trim, Fm = Fi, qa = zx.parseInt, km = zx.Symbol, Bm = km && km.iterator, Vx = /^[+-]?0x/i, AY = xY(Vx.exec), RY = qa(Fm + "08") !== 8 || qa(Fm + "0x16") !== 22 || Bm && !TY(function() {
  qa(Object(Bm));
}), Gx = RY ? function(t, e) {
  var n = OY(IY(t));
  return qa(n, e >>> 0 || (AY(Vx, n) ? 16 : 10));
} : qa, _Y = d, jm = Gx;
_Y({ target: "Number", stat: !0, forced: Number.parseInt !== jm }, {
  parseInt: jm
});
var CY = d, Md = O, PY = fr, MY = ku, NY = Mu, DY = Nx, _v = I, LY = RangeError, Um = String, FY = isFinite, kY = Math.abs, BY = Math.floor, zm = Math.pow, jY = Math.round, Tt = Md(1 .toExponential), UY = Md(NY), Vm = Md("".slice), Hx = Tt(-69e-12, 4) === "-6.9000e-11" && Tt(1.255, 2) === "1.25e+0" && Tt(12345, 3) === "1.235e+4" && Tt(25, 0) === "3e+1", zY = function() {
  return _v(function() {
    Tt(1, 1 / 0);
  }) && _v(function() {
    Tt(1, -1 / 0);
  });
}, VY = function() {
  return !_v(function() {
    Tt(1 / 0, 1 / 0), Tt(NaN, 1 / 0);
  });
}, GY = !Hx || !zY() || !VY();
CY({ target: "Number", proto: !0, forced: GY }, {
  toExponential: function(t) {
    var e = MY(this);
    if (t === void 0)
      return Tt(e);
    var n = PY(t);
    if (!FY(e))
      return String(e);
    if (n < 0 || n > 20)
      throw new LY("Incorrect fraction digits");
    if (Hx)
      return Tt(e, n);
    var a = "", i, o, s, u;
    if (e < 0 && (a = "-", e = -e), e === 0)
      o = 0, i = UY("0", n + 1);
    else {
      var l = DY(e);
      o = BY(l);
      var c = zm(10, o - n), f = jY(e / c);
      2 * e >= (2 * f + 1) * c && (f += 1), f >= zm(10, n + 1) && (f /= 10, o += 1), i = Um(f);
    }
    return n !== 0 && (i = Vm(i, 0, 1) + "." + Vm(i, 1)), o === 0 ? (s = "+", u = "0") : (s = o > 0 ? "+" : "-", u = Um(kY(o))), i += "e" + s + u, a + i;
  }
});
var HY = d, Nd = O, WY = fr, qY = ku, YY = Mu, Gm = I, KY = RangeError, Wx = String, qx = Math.floor, Cv = Nd(YY), Hm = Nd("".slice), Ra = Nd(1 .toFixed), wn = function(r, t, e) {
  return t === 0 ? e : t % 2 === 1 ? wn(r, t - 1, e * r) : wn(r * r, t / 2, e);
}, XY = function(r) {
  for (var t = 0, e = r; e >= 4096; )
    t += 12, e /= 4096;
  for (; e >= 2; )
    t += 1, e /= 2;
  return t;
}, nn = function(r, t, e) {
  for (var n = -1, a = e; ++n < 6; )
    a += t * r[n], r[n] = a % 1e7, a = qx(a / 1e7);
}, mc = function(r, t) {
  for (var e = 6, n = 0; --e >= 0; )
    n += r[e], r[e] = qx(n / t), n = n % t * 1e7;
}, Wm = function(r) {
  for (var t = 6, e = ""; --t >= 0; )
    if (e !== "" || t === 0 || r[t] !== 0) {
      var n = Wx(r[t]);
      e = e === "" ? n : e + Cv("0", 7 - n.length) + n;
    }
  return e;
}, JY = Gm(function() {
  return Ra(8e-5, 3) !== "0.000" || Ra(0.9, 0) !== "1" || Ra(1.255, 2) !== "1.25" || Ra(1000000000000000100, 0) !== "1000000000000000128";
}) || !Gm(function() {
  Ra({});
});
HY({ target: "Number", proto: !0, forced: JY }, {
  toFixed: function(t) {
    var e = qY(this), n = WY(t), a = [0, 0, 0, 0, 0, 0], i = "", o = "0", s, u, l, c;
    if (n < 0 || n > 20)
      throw new KY("Incorrect fraction digits");
    if (e !== e)
      return "NaN";
    if (e <= -1e21 || e >= 1e21)
      return Wx(e);
    if (e < 0 && (i = "-", e = -e), e > 1e-21)
      if (s = XY(e * wn(2, 69, 1)) - 69, u = s < 0 ? e * wn(2, -s, 1) : e / wn(2, s, 1), u *= 4503599627370496, s = 52 - s, s > 0) {
        for (nn(a, 0, u), l = n; l >= 7; )
          nn(a, 1e7, 0), l -= 7;
        for (nn(a, wn(10, l, 1), 0), l = s - 1; l >= 23; )
          mc(a, 1 << 23), l -= 23;
        mc(a, 1 << l), nn(a, 1, 1), mc(a, 2), o = Wm(a);
      } else
        nn(a, 0, u), nn(a, 1 << -s, 0), o = Wm(a) + Cv("0", n);
    return n > 0 ? (c = o.length, o = i + (c <= n ? "0." + Cv("0", n - c) + o : Hm(o, 0, c - n) + "." + Hm(o, c - n))) : o = i + o, o;
  }
});
var ZY = d, QY = O, qm = I, Ym = ku, Fs = QY(1 .toPrecision), rK = qm(function() {
  return Fs(1, void 0) !== "1";
}) || !qm(function() {
  Fs({});
});
ZY({ target: "Number", proto: !0, forced: rK }, {
  toPrecision: function(t) {
    return t === void 0 ? Fs(Ym(this)) : Fs(Ym(this), t);
  }
});
var Km = j, tK = O, eK = U, nK = I, bc = Oi, aK = Ei, iK = bi, oK = Z, sK = Jn, an = Object.assign, Xm = Object.defineProperty, uK = tK([].concat), Yx = !an || nK(function() {
  if (Km && an({ b: 1 }, an(Xm({}, "a", {
    enumerable: !0,
    get: function() {
      Xm(this, "b", {
        value: 3,
        enumerable: !1
      });
    }
  }), { b: 2 })).b !== 1)
    return !0;
  var r = {}, t = {}, e = Symbol("assign detection"), n = "abcdefghijklmnopqrst";
  return r[e] = 7, n.split("").forEach(function(a) {
    t[a] = a;
  }), an({}, r)[e] !== 7 || bc(an({}, t)).join("") !== n;
}) ? function(t, e) {
  for (var n = oK(t), a = arguments.length, i = 1, o = aK.f, s = iK.f; a > i; )
    for (var u = sK(arguments[i++]), l = o ? uK(bc(u), o(u)) : bc(u), c = l.length, f = 0, v; c > f; )
      v = l[f++], (!Km || eK(s, u, v)) && (n[v] = u[v]);
  return n;
} : an, lK = d, Jm = Yx;
lK({ target: "Object", stat: !0, arity: 2, forced: Object.assign !== Jm }, {
  assign: Jm
});
var cK = d, fK = j, vK = zr;
cK({ target: "Object", stat: !0, sham: !fK }, {
  create: vK
});
var hK = _, dK = I, Zm = ad, Uu = !dK(function() {
  if (!(Zm && Zm < 535)) {
    var r = Math.random();
    __defineSetter__.call(null, r, function() {
    }), delete hK[r];
  }
}), gK = d, pK = j, $K = Uu, yK = J, mK = Z, bK = ur;
pK && gK({ target: "Object", proto: !0, forced: $K }, {
  __defineGetter__: function(t, e) {
    bK.f(mK(this), t, { get: yK(e), enumerable: !0, configurable: !0 });
  }
});
var wK = d, SK = j, Qm = fu.f;
wK({ target: "Object", stat: !0, forced: Object.defineProperties !== Qm, sham: !SK }, {
  defineProperties: Qm
});
var EK = d, TK = j, r0 = ur.f;
EK({ target: "Object", stat: !0, forced: Object.defineProperty !== r0, sham: !TK }, {
  defineProperty: r0
});
var xK = d, IK = j, OK = Uu, AK = J, RK = Z, _K = ur;
IK && xK({ target: "Object", proto: !0, forced: OK }, {
  __defineSetter__: function(t, e) {
    _K.f(RK(this), t, { set: AK(e), enumerable: !0, configurable: !0 });
  }
});
var Kx = j, CK = I, Xx = O, PK = Vr, MK = Oi, NK = gr, DK = bi.f, Jx = Xx(DK), LK = Xx([].push), FK = Kx && CK(function() {
  var r = /* @__PURE__ */ Object.create(null);
  return r[2] = 2, !Jx(r, 2);
}), t0 = function(r) {
  return function(t) {
    for (var e = NK(t), n = MK(e), a = FK && PK(e) === null, i = n.length, o = 0, s = [], u; i > o; )
      u = n[o++], (!Kx || (a ? u in e : Jx(e, u))) && LK(s, r ? [u, e[u]] : e[u]);
    return s;
  };
}, Zx = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: t0(!0),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: t0(!1)
}, kK = d, BK = Zx.entries;
kK({ target: "Object", stat: !0 }, {
  entries: function(t) {
    return BK(t);
  }
});
var jK = d, UK = fa, zK = I, VK = H, GK = Ke.onFreeze, Pv = Object.freeze, HK = zK(function() {
  Pv(1);
});
jK({ target: "Object", stat: !0, forced: HK, sham: !UK }, {
  freeze: function(t) {
    return Pv && VK(t) ? Pv(GK(t)) : t;
  }
});
var WK = d, qK = pr, YK = Xt;
WK({ target: "Object", stat: !0 }, {
  fromEntries: function(t) {
    var e = {};
    return qK(t, function(n, a) {
      YK(e, n, a);
    }, { AS_ENTRIES: !0 }), e;
  }
});
var KK = d, XK = I, JK = gr, Qx = Sr.f, rI = j, ZK = !rI || XK(function() {
  Qx(1);
});
KK({ target: "Object", stat: !0, forced: ZK, sham: !rI }, {
  getOwnPropertyDescriptor: function(t, e) {
    return Qx(JK(t), e);
  }
});
var QK = d, rX = j, tX = kh, eX = gr, nX = Sr, aX = Xt;
QK({ target: "Object", stat: !0, sham: !rX }, {
  getOwnPropertyDescriptors: function(t) {
    for (var e = eX(t), n = nX.f, a = tX(e), i = {}, o = 0, s, u; a.length > o; )
      u = n(e, s = a[o++]), u !== void 0 && aX(i, s, u);
    return i;
  }
});
var iX = d, oX = I, sX = vu.f, uX = oX(function() {
  return !Object.getOwnPropertyNames(1);
});
iX({ target: "Object", stat: !0, forced: uX }, {
  getOwnPropertyNames: sX
});
var lX = d, cX = I, fX = Z, tI = Vr, vX = Yh, hX = cX(function() {
  tI(1);
});
lX({ target: "Object", stat: !0, forced: hX, sham: !vX }, {
  getPrototypeOf: function(t) {
    return tI(fX(t));
  }
});
var dX = d, gX = ar, pX = O, $X = J, yX = sr, mX = de, bX = pr, wX = I, e0 = Object.groupBy, SX = gX("Object", "create"), EX = pX([].push), TX = !e0 || wX(function() {
  return e0("ab", function(r) {
    return r;
  }).a.length !== 1;
});
dX({ target: "Object", stat: !0, forced: TX }, {
  groupBy: function(t, e) {
    yX(t), $X(e);
    var n = SX(null), a = 0;
    return bX(t, function(i) {
      var o = mX(e(i, a++));
      o in n ? EX(n[o], i) : n[o] = [i];
    }), n;
  }
});
var xX = d, IX = K;
xX({ target: "Object", stat: !0 }, {
  hasOwn: IX
});
var eI = Object.is || function(t, e) {
  return t === e ? t !== 0 || 1 / t === 1 / e : t !== t && e !== e;
}, OX = d, AX = eI;
OX({ target: "Object", stat: !0 }, {
  is: AX
});
var RX = d, n0 = Id;
RX({ target: "Object", stat: !0, forced: Object.isExtensible !== n0 }, {
  isExtensible: n0
});
var _X = d, CX = I, PX = H, MX = Er, nI = xd, Mv = Object.isFrozen, NX = nI || CX(function() {
  Mv(1);
});
_X({ target: "Object", stat: !0, forced: NX }, {
  isFrozen: function(t) {
    return !PX(t) || nI && MX(t) === "ArrayBuffer" ? !0 : Mv ? Mv(t) : !1;
  }
});
var DX = d, LX = I, FX = H, kX = Er, aI = xd, Nv = Object.isSealed, BX = aI || LX(function() {
  Nv(1);
});
DX({ target: "Object", stat: !0, forced: BX }, {
  isSealed: function(t) {
    return !FX(t) || aI && kX(t) === "ArrayBuffer" ? !0 : Nv ? Nv(t) : !1;
  }
});
var jX = d, UX = Z, iI = Oi, zX = I, VX = zX(function() {
  iI(1);
});
jX({ target: "Object", stat: !0, forced: VX }, {
  keys: function(t) {
    return iI(UX(t));
  }
});
var GX = d, HX = j, WX = Uu, qX = Z, YX = de, KX = Vr, XX = Sr.f;
HX && GX({ target: "Object", proto: !0, forced: WX }, {
  __lookupGetter__: function(t) {
    var e = qX(this), n = YX(t), a;
    do
      if (a = XX(e, n))
        return a.get;
    while (e = KX(e));
  }
});
var JX = d, ZX = j, QX = Uu, rJ = Z, tJ = de, eJ = Vr, nJ = Sr.f;
ZX && JX({ target: "Object", proto: !0, forced: QX }, {
  __lookupSetter__: function(t) {
    var e = rJ(this), n = tJ(t), a;
    do
      if (a = nJ(e, n))
        return a.set;
    while (e = eJ(e));
  }
});
var aJ = d, iJ = H, oJ = Ke.onFreeze, sJ = fa, uJ = I, Dv = Object.preventExtensions, lJ = uJ(function() {
  Dv(1);
});
aJ({ target: "Object", stat: !0, forced: lJ, sham: !sJ }, {
  preventExtensions: function(t) {
    return Dv && iJ(t) ? Dv(oJ(t)) : t;
  }
});
var cJ = j, fJ = hr, vJ = H, hJ = UE, dJ = Z, gJ = sr, a0 = Object.getPrototypeOf, i0 = Object.setPrototypeOf, o0 = Object.prototype, s0 = "__proto__";
if (cJ && a0 && i0 && !(s0 in o0))
  try {
    fJ(o0, s0, {
      configurable: !0,
      get: function() {
        return a0(dJ(this));
      },
      set: function(t) {
        var e = gJ(this);
        hJ(t) && vJ(e) && i0(e, t);
      }
    });
  } catch {
  }
var pJ = d, $J = H, yJ = Ke.onFreeze, mJ = fa, bJ = I, Lv = Object.seal, wJ = bJ(function() {
  Lv(1);
});
pJ({ target: "Object", stat: !0, forced: wJ, sham: !mJ }, {
  seal: function(t) {
    return Lv && $J(t) ? Lv(yJ(t)) : t;
  }
});
var SJ = d, EJ = Ct;
SJ({ target: "Object", stat: !0 }, {
  setPrototypeOf: EJ
});
var TJ = Bh, xJ = vt, IJ = TJ ? {}.toString : function() {
  return "[object " + xJ(this) + "]";
}, OJ = Bh, AJ = lr, RJ = IJ;
OJ || AJ(Object.prototype, "toString", RJ, { unsafe: !0 });
var _J = d, CJ = Zx.values;
_J({ target: "Object", stat: !0 }, {
  values: function(t) {
    return CJ(t);
  }
});
var PJ = d, u0 = Ux;
PJ({ global: !0, forced: parseFloat !== u0 }, {
  parseFloat: u0
});
var MJ = d, l0 = Gx;
MJ({ global: !0, forced: parseInt !== l0 }, {
  parseInt: l0
});
var NJ = ea, DJ = Ge, LJ = TypeError, Dd = function(r) {
  if (NJ(r))
    return r;
  throw new LJ(DJ(r) + " is not a constructor");
}, c0 = k, FJ = Dd, kJ = Nr, BJ = W, jJ = BJ("species"), zu = function(r, t) {
  var e = c0(r).constructor, n;
  return e === void 0 || kJ(n = c0(e)[jJ]) ? t : FJ(n);
}, UJ = TypeError, et = function(r, t) {
  if (r < t)
    throw new UJ("Not enough arguments");
  return r;
}, zJ = Rt, oI = /(?:ipad|iphone|ipod).*applewebkit/i.test(zJ), jr = _, VJ = tt, GJ = ht, f0 = Y, HJ = K, sI = I, v0 = uE, WJ = rt, h0 = lu, qJ = et, YJ = oI, KJ = oa, Fv = jr.setImmediate, kv = jr.clearImmediate, XJ = jr.process, wc = jr.Dispatch, JJ = jr.Function, d0 = jr.MessageChannel, ZJ = jr.String, Sc = 0, Ya = {}, g0 = "onreadystatechange", ci, xe, Ec, Tc;
sI(function() {
  ci = jr.location;
});
var Ld = function(r) {
  if (HJ(Ya, r)) {
    var t = Ya[r];
    delete Ya[r], t();
  }
}, xc = function(r) {
  return function() {
    Ld(r);
  };
}, p0 = function(r) {
  Ld(r.data);
}, $0 = function(r) {
  jr.postMessage(ZJ(r), ci.protocol + "//" + ci.host);
};
(!Fv || !kv) && (Fv = function(t) {
  qJ(arguments.length, 1);
  var e = f0(t) ? t : JJ(t), n = WJ(arguments, 1);
  return Ya[++Sc] = function() {
    VJ(e, void 0, n);
  }, xe(Sc), Sc;
}, kv = function(t) {
  delete Ya[t];
}, KJ ? xe = function(r) {
  XJ.nextTick(xc(r));
} : wc && wc.now ? xe = function(r) {
  wc.now(xc(r));
} : d0 && !YJ ? (Ec = new d0(), Tc = Ec.port2, Ec.port1.onmessage = p0, xe = GJ(Tc.postMessage, Tc)) : jr.addEventListener && f0(jr.postMessage) && !jr.importScripts && ci && ci.protocol !== "file:" && !sI($0) ? (xe = $0, jr.addEventListener("message", p0, !1)) : g0 in h0("script") ? xe = function(r) {
  v0.appendChild(h0("script"))[g0] = function() {
    v0.removeChild(this), Ld(r);
  };
} : xe = function(r) {
  setTimeout(xc(r), 0);
});
var Vu = {
  set: Fv,
  clear: kv
}, y0 = _, QJ = j, rZ = Object.getOwnPropertyDescriptor, uI = function(r) {
  if (!QJ)
    return y0[r];
  var t = rZ(y0, r);
  return t && t.value;
}, lI = function() {
  this.head = null, this.tail = null;
};
lI.prototype = {
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
var cI = lI, tZ = Rt, eZ = /ipad|iphone|ipod/i.test(tZ) && typeof Pebble < "u", nZ = Rt, aZ = /web0s(?!.*chrome)/i.test(nZ), Gn = _, iZ = uI, m0 = ht, Ic = Vu.set, oZ = cI, sZ = oI, uZ = eZ, lZ = aZ, Oc = oa, b0 = Gn.MutationObserver || Gn.WebKitMutationObserver, w0 = Gn.document, S0 = Gn.process, Eo = Gn.Promise, Bv = iZ("queueMicrotask"), on, Ac, Rc, To, E0;
if (!Bv) {
  var xo = new oZ(), Io = function() {
    var r, t;
    for (Oc && (r = S0.domain) && r.exit(); t = xo.get(); )
      try {
        t();
      } catch (e) {
        throw xo.head && on(), e;
      }
    r && r.enter();
  };
  !sZ && !Oc && !lZ && b0 && w0 ? (Ac = !0, Rc = w0.createTextNode(""), new b0(Io).observe(Rc, { characterData: !0 }), on = function() {
    Rc.data = Ac = !Ac;
  }) : !uZ && Eo && Eo.resolve ? (To = Eo.resolve(void 0), To.constructor = Eo, E0 = m0(To.then, To), on = function() {
    E0(Io);
  }) : Oc ? on = function() {
    S0.nextTick(Io);
  } : (Ic = m0(Ic, Gn), on = function() {
    Ic(Io);
  }), Bv = function(r) {
    xo.head || on(), xo.add(r);
  };
}
var fI = Bv, cZ = function(r, t) {
  try {
    arguments.length === 1 ? console.error(r) : console.error(r, t);
  } catch {
  }
}, ha = function(r) {
  try {
    return { error: !1, value: r() };
  } catch (t) {
    return { error: !0, value: t };
  }
}, fZ = _, ki = fZ.Promise, vZ = _, Ka = ki, hZ = Y, dZ = Ii, gZ = Nh, pZ = W, T0 = Tu, _c = qt;
Ka && Ka.prototype;
var $Z = pZ("species"), jv = !1, vI = hZ(vZ.PromiseRejectionEvent), yZ = dZ("Promise", function() {
  var r = gZ(Ka), t = r !== String(Ka);
  if (!t && _c === 66)
    return !0;
  if (!_c || _c < 51 || !/native code/.test(r)) {
    var e = new Ka(function(i) {
      i(1);
    }), n = function(i) {
      i(function() {
      }, function() {
      });
    }, a = e.constructor = {};
    if (a[$Z] = n, jv = e.then(function() {
    }) instanceof n, !jv)
      return !0;
  }
  return !t && (T0 === "BROWSER" || T0 === "DENO") && !vI;
}), Bi = {
  CONSTRUCTOR: yZ,
  REJECTION_EVENT: vI,
  SUBCLASSING: jv
}, Mt = {}, x0 = J, mZ = TypeError, bZ = function(r) {
  var t, e;
  this.promise = new r(function(n, a) {
    if (t !== void 0 || e !== void 0)
      throw new mZ("Bad Promise constructor");
    t = n, e = a;
  }), this.resolve = x0(t), this.reject = x0(e);
};
Mt.f = function(r) {
  return new bZ(r);
};
var wZ = d, ks = oa, he = _, Hn = U, I0 = lr, O0 = Ct, SZ = Fr, EZ = sa, TZ = J, is = Y, xZ = H, IZ = dt, OZ = zu, hI = Vu.set, Fd = fI, AZ = cZ, RZ = ha, _Z = cI, dI = vr, Bs = ki, kd = Bi, gI = Mt, Gu = "Promise", pI = kd.CONSTRUCTOR, CZ = kd.REJECTION_EVENT, PZ = kd.SUBCLASSING, Cc = dI.getterFor(Gu), MZ = dI.set, vn = Bs && Bs.prototype, Ce = Bs, Oo = vn, $I = he.TypeError, Uv = he.document, Bd = he.process, zv = gI.f, NZ = zv, DZ = !!(Uv && Uv.createEvent && he.dispatchEvent), yI = "unhandledrejection", LZ = "rejectionhandled", A0 = 0, mI = 1, FZ = 2, jd = 1, bI = 2, Ao, R0, kZ, _0, wI = function(r) {
  var t;
  return xZ(r) && is(t = r.then) ? t : !1;
}, SI = function(r, t) {
  var e = t.value, n = t.state === mI, a = n ? r.ok : r.fail, i = r.resolve, o = r.reject, s = r.domain, u, l, c;
  try {
    a ? (n || (t.rejection === bI && jZ(t), t.rejection = jd), a === !0 ? u = e : (s && s.enter(), u = a(e), s && (s.exit(), c = !0)), u === r.promise ? o(new $I("Promise-chain cycle")) : (l = wI(u)) ? Hn(l, u, i, o) : i(u)) : o(e);
  } catch (f) {
    s && !c && s.exit(), o(f);
  }
}, EI = function(r, t) {
  r.notified || (r.notified = !0, Fd(function() {
    for (var e = r.reactions, n; n = e.get(); )
      SI(n, r);
    r.notified = !1, t && !r.rejection && BZ(r);
  }));
}, TI = function(r, t, e) {
  var n, a;
  DZ ? (n = Uv.createEvent("Event"), n.promise = t, n.reason = e, n.initEvent(r, !1, !0), he.dispatchEvent(n)) : n = { promise: t, reason: e }, !CZ && (a = he["on" + r]) ? a(n) : r === yI && AZ("Unhandled promise rejection", e);
}, BZ = function(r) {
  Hn(hI, he, function() {
    var t = r.facade, e = r.value, n = C0(r), a;
    if (n && (a = RZ(function() {
      ks ? Bd.emit("unhandledRejection", e, t) : TI(yI, t, e);
    }), r.rejection = ks || C0(r) ? bI : jd, a.error))
      throw a.value;
  });
}, C0 = function(r) {
  return r.rejection !== jd && !r.parent;
}, jZ = function(r) {
  Hn(hI, he, function() {
    var t = r.facade;
    ks ? Bd.emit("rejectionHandled", t) : TI(LZ, t, r.value);
  });
}, Sn = function(r, t, e) {
  return function(n) {
    r(t, n, e);
  };
}, Pn = function(r, t, e) {
  r.done || (r.done = !0, e && (r = e), r.value = t, r.state = FZ, EI(r, !0));
}, Vv = function(r, t, e) {
  if (!r.done) {
    r.done = !0, e && (r = e);
    try {
      if (r.facade === t)
        throw new $I("Promise can't be resolved itself");
      var n = wI(t);
      n ? Fd(function() {
        var a = { done: !1 };
        try {
          Hn(
            n,
            t,
            Sn(Vv, a, r),
            Sn(Pn, a, r)
          );
        } catch (i) {
          Pn(a, i, r);
        }
      }) : (r.value = t, r.state = mI, EI(r, !1));
    } catch (a) {
      Pn({ done: !1 }, a, r);
    }
  }
};
if (pI && (Ce = function(t) {
  IZ(this, Oo), TZ(t), Hn(Ao, this);
  var e = Cc(this);
  try {
    t(Sn(Vv, e), Sn(Pn, e));
  } catch (n) {
    Pn(e, n);
  }
}, Oo = Ce.prototype, Ao = function(t) {
  MZ(this, {
    type: Gu,
    done: !1,
    notified: !1,
    parent: !1,
    reactions: new _Z(),
    rejection: !1,
    state: A0,
    value: null
  });
}, Ao.prototype = I0(Oo, "then", function(t, e) {
  var n = Cc(this), a = zv(OZ(this, Ce));
  return n.parent = !0, a.ok = is(t) ? t : !0, a.fail = is(e) && e, a.domain = ks ? Bd.domain : void 0, n.state === A0 ? n.reactions.add(a) : Fd(function() {
    SI(a, n);
  }), a.promise;
}), R0 = function() {
  var r = new Ao(), t = Cc(r);
  this.promise = r, this.resolve = Sn(Vv, t), this.reject = Sn(Pn, t);
}, gI.f = zv = function(r) {
  return r === Ce || r === kZ ? new R0(r) : NZ(r);
}, is(Bs) && vn !== Object.prototype)) {
  _0 = vn.then, PZ || I0(vn, "then", function(t, e) {
    var n = this;
    return new Ce(function(a, i) {
      Hn(_0, n, a, i);
    }).then(t, e);
  }, { unsafe: !0 });
  try {
    delete vn.constructor;
  } catch {
  }
  O0 && O0(vn, Oo);
}
wZ({ global: !0, constructor: !0, wrap: !0, forced: pI }, {
  Promise: Ce
});
SZ(Ce, Gu, !1);
EZ(Gu);
var UZ = ki, zZ = Su, VZ = Bi.CONSTRUCTOR, Hu = VZ || !zZ(function(r) {
  UZ.all(r).then(void 0, function() {
  });
}), GZ = d, HZ = U, WZ = J, qZ = Mt, YZ = ha, KZ = pr, XZ = Hu;
GZ({ target: "Promise", stat: !0, forced: XZ }, {
  all: function(t) {
    var e = this, n = qZ.f(e), a = n.resolve, i = n.reject, o = YZ(function() {
      var s = WZ(e.resolve), u = [], l = 0, c = 1;
      KZ(t, function(f) {
        var v = l++, h = !1;
        c++, HZ(s, e, f).then(function(g) {
          h || (h = !0, u[v] = g, --c || a(u));
        }, i);
      }), --c || a(u);
    });
    return o.error && i(o.value), n.promise;
  }
});
var JZ = d, ZZ = Bi.CONSTRUCTOR, Gv = ki, QZ = ar, rQ = Y, tQ = lr, P0 = Gv && Gv.prototype;
JZ({ target: "Promise", proto: !0, forced: ZZ, real: !0 }, {
  catch: function(r) {
    return this.then(void 0, r);
  }
});
if (rQ(Gv)) {
  var M0 = QZ("Promise").prototype.catch;
  P0.catch !== M0 && tQ(P0, "catch", M0, { unsafe: !0 });
}
var eQ = d, nQ = U, aQ = J, iQ = Mt, oQ = ha, sQ = pr, uQ = Hu;
eQ({ target: "Promise", stat: !0, forced: uQ }, {
  race: function(t) {
    var e = this, n = iQ.f(e), a = n.reject, i = oQ(function() {
      var o = aQ(e.resolve);
      sQ(t, function(s) {
        nQ(o, e, s).then(n.resolve, a);
      });
    });
    return i.error && a(i.value), n.promise;
  }
});
var lQ = d, cQ = Mt, fQ = Bi.CONSTRUCTOR;
lQ({ target: "Promise", stat: !0, forced: fQ }, {
  reject: function(t) {
    var e = cQ.f(this), n = e.reject;
    return n(t), e.promise;
  }
});
var vQ = k, hQ = H, dQ = Mt, xI = function(r, t) {
  if (vQ(r), hQ(t) && t.constructor === r)
    return t;
  var e = dQ.f(r), n = e.resolve;
  return n(t), e.promise;
}, gQ = d, pQ = ar, $Q = Bi.CONSTRUCTOR, yQ = xI;
pQ("Promise");
gQ({ target: "Promise", stat: !0, forced: $Q }, {
  resolve: function(t) {
    return yQ(this, t);
  }
});
var mQ = d, bQ = U, wQ = J, SQ = Mt, EQ = ha, TQ = pr, xQ = Hu;
mQ({ target: "Promise", stat: !0, forced: xQ }, {
  allSettled: function(t) {
    var e = this, n = SQ.f(e), a = n.resolve, i = n.reject, o = EQ(function() {
      var s = wQ(e.resolve), u = [], l = 0, c = 1;
      TQ(t, function(f) {
        var v = l++, h = !1;
        c++, bQ(s, e, f).then(function(g) {
          h || (h = !0, u[v] = { status: "fulfilled", value: g }, --c || a(u));
        }, function(g) {
          h || (h = !0, u[v] = { status: "rejected", reason: g }, --c || a(u));
        });
      }), --c || a(u);
    });
    return o.error && i(o.value), n.promise;
  }
});
var IQ = d, OQ = U, AQ = J, RQ = ar, _Q = Mt, CQ = ha, PQ = pr, MQ = Hu, N0 = "No one promise resolved";
IQ({ target: "Promise", stat: !0, forced: MQ }, {
  any: function(t) {
    var e = this, n = RQ("AggregateError"), a = _Q.f(e), i = a.resolve, o = a.reject, s = CQ(function() {
      var u = AQ(e.resolve), l = [], c = 0, f = 1, v = !1;
      PQ(t, function(h) {
        var g = c++, $ = !1;
        f++, OQ(u, e, h).then(function(p) {
          $ || v || (v = !0, i(p));
        }, function(p) {
          $ || v || ($ = !0, l[g] = p, --f || o(new n(l, N0)));
        });
      }), --f || o(new n(l, N0));
    });
    return s.error && o(s.value), a.promise;
  }
});
var NQ = d, js = ki, DQ = I, II = ar, OI = Y, LQ = zu, D0 = xI, FQ = lr, Hv = js && js.prototype, kQ = !!js && DQ(function() {
  Hv.finally.call({ then: function() {
  } }, function() {
  });
});
NQ({ target: "Promise", proto: !0, real: !0, forced: kQ }, {
  finally: function(r) {
    var t = LQ(this, II("Promise")), e = OI(r);
    return this.then(
      e ? function(n) {
        return D0(t, r()).then(function() {
          return n;
        });
      } : r,
      e ? function(n) {
        return D0(t, r()).then(function() {
          throw n;
        });
      } : r
    );
  }
});
if (OI(js)) {
  var L0 = II("Promise").prototype.finally;
  Hv.finally !== L0 && FQ(Hv, "finally", L0, { unsafe: !0 });
}
var BQ = d, jQ = _, UQ = tt, zQ = rt, VQ = Mt, GQ = J, AI = ha, Pc = jQ.Promise, F0 = !1, HQ = !Pc || !Pc.try || AI(function() {
  Pc.try(function(r) {
    F0 = r === 8;
  }, 8);
}).error || !F0;
BQ({ target: "Promise", stat: !0, forced: HQ }, {
  try: function(r) {
    var t = arguments.length > 1 ? zQ(arguments, 1) : [], e = VQ.f(this), n = AI(function() {
      return UQ(GQ(r), void 0, t);
    });
    return (n.error ? e.reject : e.resolve)(n.value), e.promise;
  }
});
var WQ = d, qQ = Mt;
WQ({ target: "Promise", stat: !0 }, {
  withResolvers: function() {
    var t = qQ.f(this);
    return {
      promise: t.promise,
      resolve: t.resolve,
      reject: t.reject
    };
  }
});
var YQ = d, KQ = tt, XQ = J, JQ = k, ZQ = I, QQ = !ZQ(function() {
  Reflect.apply(function() {
  });
});
YQ({ target: "Reflect", stat: !0, forced: QQ }, {
  apply: function(t, e, n) {
    return KQ(XQ(t), e, JQ(n));
  }
});
var rrr = d, trr = ar, Mc = tt, err = ux, k0 = Dd, nrr = k, B0 = H, arr = zr, RI = I, Ud = trr("Reflect", "construct"), irr = Object.prototype, orr = [].push, _I = RI(function() {
  function r() {
  }
  return !(Ud(function() {
  }, [], r) instanceof r);
}), CI = !RI(function() {
  Ud(function() {
  });
}), j0 = _I || CI;
rrr({ target: "Reflect", stat: !0, forced: j0, sham: j0 }, {
  construct: function(t, e) {
    k0(t), nrr(e);
    var n = arguments.length < 3 ? t : k0(arguments[2]);
    if (CI && !_I)
      return Ud(t, e, n);
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
      return Mc(orr, a, e), new (Mc(err, t, a))();
    }
    var i = n.prototype, o = arr(B0(i) ? i : irr), s = Mc(t, o, e);
    return B0(s) ? s : o;
  }
});
var srr = d, urr = j, U0 = k, lrr = de, PI = ur, crr = I, frr = crr(function() {
  Reflect.defineProperty(PI.f({}, 1, { value: 1 }), 1, { value: 2 });
});
srr({ target: "Reflect", stat: !0, forced: frr, sham: !urr }, {
  defineProperty: function(t, e, n) {
    U0(t);
    var a = lrr(e);
    U0(n);
    try {
      return PI.f(t, a, n), !0;
    } catch {
      return !1;
    }
  }
});
var vrr = d, hrr = k, drr = Sr.f;
vrr({ target: "Reflect", stat: !0 }, {
  deleteProperty: function(t, e) {
    var n = drr(hrr(t), e);
    return n && !n.configurable ? !1 : delete t[e];
  }
});
var z0 = K, MI = function(r) {
  return r !== void 0 && (z0(r, "value") || z0(r, "writable"));
}, grr = d, prr = U, $rr = H, yrr = k, mrr = MI, brr = Sr, wrr = Vr;
function NI(r, t) {
  var e = arguments.length < 3 ? r : arguments[2], n, a;
  if (yrr(r) === e)
    return r[t];
  if (n = brr.f(r, t), n)
    return mrr(n) ? n.value : n.get === void 0 ? void 0 : prr(n.get, e);
  if ($rr(a = wrr(r)))
    return NI(a, t, e);
}
grr({ target: "Reflect", stat: !0 }, {
  get: NI
});
var Srr = d, Err = j, Trr = k, xrr = Sr;
Srr({ target: "Reflect", stat: !0, sham: !Err }, {
  getOwnPropertyDescriptor: function(t, e) {
    return xrr.f(Trr(t), e);
  }
});
var Irr = d, Orr = k, Arr = Vr, Rrr = Yh;
Irr({ target: "Reflect", stat: !0, sham: !Rrr }, {
  getPrototypeOf: function(t) {
    return Arr(Orr(t));
  }
});
var _rr = d;
_rr({ target: "Reflect", stat: !0 }, {
  has: function(t, e) {
    return e in t;
  }
});
var Crr = d, Prr = k, Mrr = Id;
Crr({ target: "Reflect", stat: !0 }, {
  isExtensible: function(t) {
    return Prr(t), Mrr(t);
  }
});
var Nrr = d, Drr = kh;
Nrr({ target: "Reflect", stat: !0 }, {
  ownKeys: Drr
});
var Lrr = d, Frr = ar, krr = k, Brr = fa;
Lrr({ target: "Reflect", stat: !0, sham: !Brr }, {
  preventExtensions: function(t) {
    krr(t);
    try {
      var e = Frr("Object", "preventExtensions");
      return e && e(t), !0;
    } catch {
      return !1;
    }
  }
});
var jrr = d, Urr = U, zrr = k, V0 = H, Vrr = MI, Grr = I, Wv = ur, G0 = Sr, Hrr = Vr, H0 = Qr;
function DI(r, t, e) {
  var n = arguments.length < 4 ? r : arguments[3], a = G0.f(zrr(r), t), i, o, s;
  if (!a) {
    if (V0(o = Hrr(r)))
      return DI(o, t, e, n);
    a = H0(0);
  }
  if (Vrr(a)) {
    if (a.writable === !1 || !V0(n))
      return !1;
    if (i = G0.f(n, t)) {
      if (i.get || i.set || i.writable === !1)
        return !1;
      i.value = e, Wv.f(n, t, i);
    } else
      Wv.f(n, t, H0(0, e));
  } else {
    if (s = a.set, s === void 0)
      return !1;
    Urr(s, n, e);
  }
  return !0;
}
var Wrr = Grr(function() {
  var r = function() {
  }, t = Wv.f(new r(), "a", { configurable: !0 });
  return Reflect.set(r.prototype, "a", 1, t) !== !1;
});
jrr({ target: "Reflect", stat: !0, forced: Wrr }, {
  set: DI
});
var qrr = d, Yrr = k, Krr = zE, W0 = Ct;
W0 && qrr({ target: "Reflect", stat: !0 }, {
  setPrototypeOf: function(t, e) {
    Yrr(t), Krr(e);
    try {
      return W0(t, e), !0;
    } catch {
      return !1;
    }
  }
});
var Xrr = d, Jrr = _, Zrr = Fr;
Xrr({ global: !0 }, { Reflect: {} });
Zrr(Jrr.Reflect, "Reflect", !0);
var Qrr = H, rtr = Er, ttr = W, etr = ttr("match"), Wu = function(r) {
  var t;
  return Qrr(r) && ((t = r[etr]) !== void 0 ? !!t : rtr(r) === "RegExp");
}, ntr = k, zd = function() {
  var r = ntr(this), t = "";
  return r.hasIndices && (t += "d"), r.global && (t += "g"), r.ignoreCase && (t += "i"), r.multiline && (t += "m"), r.dotAll && (t += "s"), r.unicode && (t += "u"), r.unicodeSets && (t += "v"), r.sticky && (t += "y"), t;
}, atr = U, itr = K, otr = Dr, str = zd, q0 = RegExp.prototype, ji = function(r) {
  var t = r.flags;
  return t === void 0 && !("flags" in q0) && !itr(r, "flags") && otr(q0, r) ? atr(str, r) : t;
}, Vd = I, utr = _, Gd = utr.RegExp, Hd = Vd(function() {
  var r = Gd("a", "y");
  return r.lastIndex = 2, r.exec("abcd") !== null;
}), ltr = Hd || Vd(function() {
  return !Gd("a", "y").sticky;
}), ctr = Hd || Vd(function() {
  var r = Gd("^r", "gy");
  return r.lastIndex = 2, r.exec("str") !== null;
}), qu = {
  BROKEN_CARET: ctr,
  MISSED_STICKY: ltr,
  UNSUPPORTED_Y: Hd
}, ftr = I, vtr = _, htr = vtr.RegExp, Wd = ftr(function() {
  var r = htr(".", "s");
  return !(r.dotAll && r.test(`
`) && r.flags === "s");
}), dtr = I, gtr = _, ptr = gtr.RegExp, LI = dtr(function() {
  var r = ptr("(?<a>b)", "g");
  return r.exec("b").groups.a !== "b" || "b".replace(r, "$<a>c") !== "bc";
}), $tr = j, qd = _, Ui = O, ytr = Ii, mtr = We, btr = Tr, wtr = zr, Str = ge.f, Y0 = Dr, Etr = Wu, K0 = G, Ttr = ji, FI = qu, xtr = VE, Itr = lr, Otr = I, Atr = K, Rtr = vr.enforce, _tr = sa, Ctr = W, kI = Wd, BI = LI, Ptr = Ctr("match"), fe = qd.RegExp, hn = fe.prototype, Mtr = qd.SyntaxError, Ntr = Ui(hn.exec), Us = Ui("".charAt), X0 = Ui("".replace), J0 = Ui("".indexOf), Z0 = Ui("".slice), Dtr = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/, Ne = /a/g, Nc = /a/g, Ltr = new fe(Ne) !== Ne, jI = FI.MISSED_STICKY, Ftr = FI.UNSUPPORTED_Y, ktr = $tr && (!Ltr || jI || kI || BI || Otr(function() {
  return Nc[Ptr] = !1, fe(Ne) !== Ne || fe(Nc) === Nc || String(fe(Ne, "i")) !== "/a/i";
})), Btr = function(r) {
  for (var t = r.length, e = 0, n = "", a = !1, i; e <= t; e++) {
    if (i = Us(r, e), i === "\\") {
      n += i + Us(r, ++e);
      continue;
    }
    !a && i === "." ? n += "[\\s\\S]" : (i === "[" ? a = !0 : i === "]" && (a = !1), n += i);
  }
  return n;
}, jtr = function(r) {
  for (var t = r.length, e = 0, n = "", a = [], i = wtr(null), o = !1, s = !1, u = 0, l = "", c; e <= t; e++) {
    if (c = Us(r, e), c === "\\")
      c += Us(r, ++e);
    else if (c === "]")
      o = !1;
    else if (!o)
      switch (!0) {
        case c === "[":
          o = !0;
          break;
        case c === "(":
          if (n += c, Z0(r, e + 1, e + 3) === "?:")
            continue;
          Ntr(Dtr, Z0(r, e + 1)) && (e += 2, s = !0), u++;
          continue;
        case (c === ">" && s):
          if (l === "" || Atr(i, l))
            throw new Mtr("Invalid capture group name");
          i[l] = !0, a[a.length] = [l, u], s = !1, l = "";
          continue;
      }
    s ? l += c : n += c;
  }
  return [n, a];
};
if (ytr("RegExp", ktr)) {
  for (var Ie = function(t, e) {
    var n = Y0(hn, this), a = Etr(t), i = e === void 0, o = [], s = t, u, l, c, f, v, h;
    if (!n && a && i && t.constructor === Ie)
      return t;
    if ((a || Y0(hn, t)) && (t = t.source, i && (e = Ttr(s))), t = t === void 0 ? "" : K0(t), e = e === void 0 ? "" : K0(e), s = t, kI && "dotAll" in Ne && (l = !!e && J0(e, "s") > -1, l && (e = X0(e, /s/g, ""))), u = e, jI && "sticky" in Ne && (c = !!e && J0(e, "y") > -1, c && Ftr && (e = X0(e, /y/g, ""))), BI && (f = jtr(t), t = f[0], o = f[1]), v = mtr(fe(t, e), n ? this : hn, Ie), (l || c || o.length) && (h = Rtr(v), l && (h.dotAll = !0, h.raw = Ie(Btr(t), u)), c && (h.sticky = !0), o.length && (h.groups = o)), t !== s)
      try {
        btr(v, "source", s === "" ? "(?:)" : s);
      } catch {
      }
    return v;
  }, Q0 = Str(fe), r1 = 0; Q0.length > r1; )
    xtr(Ie, fe, Q0[r1++]);
  hn.constructor = Ie, Ie.prototype = hn, Itr(qd, "RegExp", Ie, { constructor: !0 });
}
_tr("RegExp");
var Utr = TypeError, ztr = function(r) {
  if (typeof r == "string")
    return r;
  throw new Utr("Argument is not a string");
}, Vtr = d, zi = O, Gtr = ztr, Htr = K, t1 = Nu.start, Wtr = Fi, qtr = Array, e1 = RegExp.escape, n1 = zi("".charAt), qv = zi("".charCodeAt), Ytr = zi(1.1.toString), Ktr = zi([].join), UI = /^[0-9a-z]/i, Xtr = /^[$()*+./?[\\\]^{|}]/, Jtr = RegExp("^[!\"#%&',\\-:;<=>@`~" + Wtr + "]"), Dc = zi(UI.exec), a1 = {
  "	": "t",
  "\n": "n",
  "\v": "v",
  "\f": "f",
  "\r": "r"
}, Lc = function(r) {
  var t = Ytr(qv(r, 0), 16);
  return t.length < 3 ? "\\x" + t1(t, 2, "0") : "\\u" + t1(t, 4, "0");
}, Ztr = !e1 || e1("ab") !== "\\x61b";
Vtr({ target: "RegExp", stat: !0, forced: Ztr }, {
  escape: function(t) {
    Gtr(t);
    for (var e = t.length, n = qtr(e), a = 0; a < e; a++) {
      var i = n1(t, a);
      if (a === 0 && Dc(UI, i))
        n[a] = Lc(i);
      else if (Htr(a1, i))
        n[a] = "\\" + a1[i];
      else if (Dc(Xtr, i))
        n[a] = "\\" + i;
      else if (Dc(Jtr, i))
        n[a] = Lc(i);
      else {
        var o = qv(i, 0);
        (o & 63488) !== 55296 ? n[a] = i : o >= 56320 || a + 1 >= e || (qv(t, a + 1) & 64512) !== 56320 ? n[a] = Lc(i) : (n[a] = i, n[++a] = n1(t, a));
      }
    }
    return Ktr(n, "");
  }
});
var Qtr = j, rer = Wd, ter = Er, eer = hr, ner = vr.get, i1 = RegExp.prototype, aer = TypeError;
Qtr && rer && eer(i1, "dotAll", {
  configurable: !0,
  get: function() {
    if (this !== i1) {
      if (ter(this) === "RegExp")
        return !!ner(this).dotAll;
      throw new aer("Incompatible receiver, RegExp required");
    }
  }
});
var En = U, Yu = O, ier = G, oer = zd, ser = qu, uer = Qn, ler = zr, cer = vr.get, fer = Wd, ver = LI, her = uer("native-string-replace", String.prototype.replace), zs = RegExp.prototype.exec, Yv = zs, der = Yu("".charAt), ger = Yu("".indexOf), per = Yu("".replace), Fc = Yu("".slice), Kv = function() {
  var r = /a/, t = /b*/g;
  return En(zs, r, "a"), En(zs, t, "a"), r.lastIndex !== 0 || t.lastIndex !== 0;
}(), zI = ser.BROKEN_CARET, Xv = /()??/.exec("")[1] !== void 0, $er = Kv || Xv || zI || fer || ver;
$er && (Yv = function(t) {
  var e = this, n = cer(e), a = ier(t), i = n.raw, o, s, u, l, c, f, v;
  if (i)
    return i.lastIndex = e.lastIndex, o = En(Yv, i, a), e.lastIndex = i.lastIndex, o;
  var h = n.groups, g = zI && e.sticky, $ = En(oer, e), p = e.source, y = 0, S = a;
  if (g && ($ = per($, "y", ""), ger($, "g") === -1 && ($ += "g"), S = Fc(a, e.lastIndex), e.lastIndex > 0 && (!e.multiline || e.multiline && der(a, e.lastIndex - 1) !== `
`) && (p = "(?: " + p + ")", S = " " + S, y++), s = new RegExp("^(?:" + p + ")", $)), Xv && (s = new RegExp("^" + p + "$(?!\\s)", $)), Kv && (u = e.lastIndex), l = En(zs, g ? s : e, S), g ? l ? (l.input = Fc(l.input, y), l[0] = Fc(l[0], y), l.index = e.lastIndex, e.lastIndex += l[0].length) : e.lastIndex = 0 : Kv && l && (e.lastIndex = e.global ? l.index + l[0].length : u), Xv && l && l.length > 1 && En(her, l[0], s, function() {
    for (c = 1; c < arguments.length - 2; c++)
      arguments[c] === void 0 && (l[c] = void 0);
  }), l && h)
    for (l.groups = f = ler(null), c = 0; c < h.length; c++)
      v = h[c], f[v[0]] = l[v[1]];
  return l;
});
var Yd = Yv, yer = d, o1 = Yd;
yer({ target: "RegExp", proto: !0, forced: /./.exec !== o1 }, {
  exec: o1
});
var mer = _, ber = j, wer = hr, Ser = zd, Eer = I, VI = mer.RegExp, GI = VI.prototype, Ter = ber && Eer(function() {
  var r = !0;
  try {
    VI(".", "d");
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
  var s = Object.getOwnPropertyDescriptor(GI, "flags").get.call(t);
  return s !== n || e !== n;
});
Ter && wer(GI, "flags", {
  configurable: !0,
  get: Ser
});
var xer = j, Ier = qu.MISSED_STICKY, Oer = Er, Aer = hr, Rer = vr.get, s1 = RegExp.prototype, _er = TypeError;
xer && Ier && Aer(s1, "sticky", {
  configurable: !0,
  get: function() {
    if (this !== s1) {
      if (Oer(this) === "RegExp")
        return !!Rer(this).sticky;
      throw new _er("Incompatible receiver, RegExp required");
    }
  }
});
var Cer = d, u1 = U, Per = Y, l1 = k, Mer = G, Ner = function() {
  var r = !1, t = /[ac]/;
  return t.exec = function() {
    return r = !0, /./.exec.apply(this, arguments);
  }, t.test("abc") === !0 && r;
}(), Der = /./.test;
Cer({ target: "RegExp", proto: !0, forced: !Ner }, {
  test: function(r) {
    var t = l1(this), e = Mer(r), n = t.exec;
    if (!Per(n))
      return u1(Der, t, e);
    var a = u1(n, t, e);
    return a === null ? !1 : (l1(a), !0);
  }
});
var Ler = ta.PROPER, Fer = lr, ker = k, c1 = G, Ber = I, jer = ji, Kd = "toString", HI = RegExp.prototype, WI = HI[Kd], Uer = Ber(function() {
  return WI.call({ source: "a", flags: "b" }) !== "/a/b";
}), zer = Ler && WI.name !== Kd;
(Uer || zer) && Fer(HI, Kd, function() {
  var t = ker(this), e = c1(t.source), n = c1(jer(t));
  return "/" + e + "/" + n;
}, { unsafe: !0 });
var Ver = Du, Ger = Rx;
Ver("Set", function(r) {
  return function() {
    return r(this, arguments.length ? arguments[0] : void 0);
  };
}, Ger);
var kc = O, Ro = Set.prototype, gt = {
  // eslint-disable-next-line es/no-set -- safe
  Set,
  add: kc(Ro.add),
  has: kc(Ro.has),
  remove: kc(Ro.delete),
  proto: Ro
}, Her = gt.has, Xe = function(r) {
  return Her(r), r;
}, Wer = U, Je = function(r, t, e) {
  for (var n = e ? r : r.iterator, a = r.next, i, o; !(i = Wer(a, n)).done; )
    if (o = t(i.value), o !== void 0)
      return o;
}, qI = O, qer = Je, YI = gt, Yer = YI.Set, KI = YI.proto, Ker = qI(KI.forEach), XI = qI(KI.keys), Xer = XI(new Yer()).next, da = function(r, t, e) {
  return e ? qer({ iterator: XI(r), next: Xer }, t) : Ker(r, t);
}, JI = gt, Jer = da, Zer = JI.Set, Qer = JI.add, Xd = function(r) {
  var t = new Zer();
  return Jer(r, function(e) {
    Qer(t, e);
  }), t;
}, rnr = yu, tnr = gt, Vi = rnr(tnr.proto, "size", "get") || function(r) {
  return r.size;
}, f1 = J, ZI = k, v1 = U, enr = fr, nnr = Gr, h1 = "Invalid size", anr = RangeError, inr = TypeError, onr = Math.max, QI = function(r, t) {
  this.set = r, this.size = onr(t, 0), this.has = f1(r.has), this.keys = f1(r.keys);
};
QI.prototype = {
  getIterator: function() {
    return nnr(ZI(v1(this.keys, this.set)));
  },
  includes: function(r) {
    return v1(this.has, this.set, r);
  }
};
var Ze = function(r) {
  ZI(r);
  var t = +r.size;
  if (t !== t)
    throw new inr(h1);
  var e = enr(t);
  if (e < 0)
    throw new anr(h1);
  return new QI(r, e);
}, snr = Xe, rO = gt, unr = Xd, lnr = Vi, cnr = Ze, fnr = da, vnr = Je, hnr = rO.has, d1 = rO.remove, dnr = function(t) {
  var e = snr(this), n = cnr(t), a = unr(e);
  return lnr(e) <= n.size ? fnr(e, function(i) {
    n.includes(i) && d1(a, i);
  }) : vnr(n.getIterator(), function(i) {
    hnr(e, i) && d1(a, i);
  }), a;
}, gnr = ar, g1 = function(r) {
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
}, p1 = function(r) {
  return {
    size: r,
    has: function() {
      return !0;
    },
    keys: function() {
      throw new Error("e");
    }
  };
}, Qe = function(r, t) {
  var e = gnr("Set");
  try {
    new e()[r](g1(0));
    try {
      return new e()[r](g1(-1)), !1;
    } catch {
      if (!t)
        return !0;
      try {
        return new e()[r](p1(-1 / 0)), !1;
      } catch {
        var n = new e();
        return n.add(1), n.add(2), t(n[r](p1(1 / 0)));
      }
    }
  } catch {
    return !1;
  }
}, pnr = d, $nr = dnr, ynr = Qe, mnr = !ynr("difference", function(r) {
  return r.size === 0;
});
pnr({ target: "Set", proto: !0, real: !0, forced: mnr }, {
  difference: $nr
});
var bnr = Xe, Jd = gt, wnr = Vi, Snr = Ze, Enr = da, Tnr = Je, xnr = Jd.Set, $1 = Jd.add, Inr = Jd.has, Onr = function(t) {
  var e = bnr(this), n = Snr(t), a = new xnr();
  return wnr(e) > n.size ? Tnr(n.getIterator(), function(i) {
    Inr(e, i) && $1(a, i);
  }) : Enr(e, function(i) {
    n.includes(i) && $1(a, i);
  }), a;
}, Anr = d, Rnr = I, _nr = Onr, Cnr = Qe, Pnr = !Cnr("intersection", function(r) {
  return r.size === 2 && r.has(1) && r.has(2);
}) || Rnr(function() {
  return String(Array.from((/* @__PURE__ */ new Set([1, 2, 3])).intersection(/* @__PURE__ */ new Set([3, 2])))) !== "3,2";
});
Anr({ target: "Set", proto: !0, real: !0, forced: Pnr }, {
  intersection: _nr
});
var Mnr = Xe, Nnr = gt.has, Dnr = Vi, Lnr = Ze, Fnr = da, knr = Je, Bnr = Ye, jnr = function(t) {
  var e = Mnr(this), n = Lnr(t);
  if (Dnr(e) <= n.size)
    return Fnr(e, function(i) {
      if (n.includes(i))
        return !1;
    }, !0) !== !1;
  var a = n.getIterator();
  return knr(a, function(i) {
    if (Nnr(e, i))
      return Bnr(a, "normal", !1);
  }) !== !1;
}, Unr = d, znr = jnr, Vnr = Qe, Gnr = !Vnr("isDisjointFrom", function(r) {
  return !r;
});
Unr({ target: "Set", proto: !0, real: !0, forced: Gnr }, {
  isDisjointFrom: znr
});
var Hnr = Xe, Wnr = Vi, qnr = da, Ynr = Ze, Knr = function(t) {
  var e = Hnr(this), n = Ynr(t);
  return Wnr(e) > n.size ? !1 : qnr(e, function(a) {
    if (!n.includes(a))
      return !1;
  }, !0) !== !1;
}, Xnr = d, Jnr = Knr, Znr = Qe, Qnr = !Znr("isSubsetOf", function(r) {
  return r;
});
Xnr({ target: "Set", proto: !0, real: !0, forced: Qnr }, {
  isSubsetOf: Jnr
});
var rar = Xe, tar = gt.has, ear = Vi, nar = Ze, aar = Je, iar = Ye, oar = function(t) {
  var e = rar(this), n = nar(t);
  if (ear(e) < n.size)
    return !1;
  var a = n.getIterator();
  return aar(a, function(i) {
    if (!tar(e, i))
      return iar(a, "normal", !1);
  }) !== !1;
}, sar = d, uar = oar, lar = Qe, car = !lar("isSupersetOf", function(r) {
  return !r;
});
sar({ target: "Set", proto: !0, real: !0, forced: car }, {
  isSupersetOf: uar
});
var far = Xe, Zd = gt, har = Xd, dar = Ze, gar = Je, par = Zd.add, $ar = Zd.has, yar = Zd.remove, mar = function(t) {
  var e = far(this), n = dar(t).getIterator(), a = har(e);
  return gar(n, function(i) {
    $ar(e, i) ? yar(a, i) : par(a, i);
  }), a;
}, bar = d, war = mar, Sar = Qe;
bar({ target: "Set", proto: !0, real: !0, forced: !Sar("symmetricDifference") }, {
  symmetricDifference: war
});
var Ear = Xe, Tar = gt.add, xar = Xd, Iar = Ze, Oar = Je, Aar = function(t) {
  var e = Ear(this), n = Iar(t).getIterator(), a = xar(e);
  return Oar(n, function(i) {
    Tar(a, i);
  }), a;
}, Rar = d, _ar = Aar, Car = Qe;
Rar({ target: "Set", proto: !0, real: !0, forced: !Car("union") }, {
  union: _ar
});
var Par = d, Mar = O, Nar = sr, Dar = fr, Lar = G, Far = I, kar = Mar("".charAt), Bar = Far(function() {
  return "𠮷".at(-2) !== "\uD842";
});
Par({ target: "String", proto: !0, forced: Bar }, {
  at: function(t) {
    var e = Lar(Nar(this)), n = e.length, a = Dar(t), i = a >= 0 ? a : n + a;
    return i < 0 || i >= n ? void 0 : kar(e, i);
  }
});
var Qd = O, jar = fr, Uar = G, zar = sr, Var = Qd("".charAt), y1 = Qd("".charCodeAt), Gar = Qd("".slice), m1 = function(r) {
  return function(t, e) {
    var n = Uar(zar(t)), a = jar(e), i = n.length, o, s;
    return a < 0 || a >= i ? r ? "" : void 0 : (o = y1(n, a), o < 55296 || o > 56319 || a + 1 === i || (s = y1(n, a + 1)) < 56320 || s > 57343 ? r ? Var(n, a) : o : r ? Gar(n, a, a + 2) : (o - 55296 << 10) + (s - 56320) + 65536);
  };
}, Ku = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: m1(!1),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: m1(!0)
}, Har = d, War = Ku.codeAt;
Har({ target: "String", proto: !0 }, {
  codePointAt: function(t) {
    return War(this, t);
  }
});
var qar = Wu, Yar = TypeError, rg = function(r) {
  if (qar(r))
    throw new Yar("The method doesn't accept regular expressions");
  return r;
}, Kar = W, Xar = Kar("match"), tg = function(r) {
  var t = /./;
  try {
    "/./"[r](t);
  } catch {
    try {
      return t[Xar] = !1, "/./"[r](t);
    } catch {
    }
  }
  return !1;
}, Jar = d, Zar = He, Qar = Sr.f, rir = Ur, b1 = G, tir = rg, eir = sr, nir = tg, air = Zar("".slice), iir = Math.min, tO = nir("endsWith"), oir = !tO && !!function() {
  var r = Qar(String.prototype, "endsWith");
  return r && !r.writable;
}();
Jar({ target: "String", proto: !0, forced: !oir && !tO }, {
  endsWith: function(t) {
    var e = b1(eir(this));
    tir(t);
    var n = arguments.length > 1 ? arguments[1] : void 0, a = e.length, i = n === void 0 ? a : iir(rir(n), a), o = b1(t);
    return air(e, i - o.length, i) === o;
  }
});
var sir = d, uir = O, lir = Kt, cir = RangeError, w1 = String.fromCharCode, S1 = String.fromCodePoint, fir = uir([].join), vir = !!S1 && S1.length !== 1;
sir({ target: "String", stat: !0, arity: 1, forced: vir }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  fromCodePoint: function(t) {
    for (var e = [], n = arguments.length, a = 0, i; n > a; ) {
      if (i = +arguments[a++], lir(i, 1114111) !== i)
        throw new cir(i + " is not a valid code point");
      e[a] = i < 65536 ? w1(i) : w1(((i -= 65536) >> 10) + 55296, i % 1024 + 56320);
    }
    return fir(e, "");
  }
});
var hir = d, dir = O, gir = rg, pir = sr, E1 = G, $ir = tg, yir = dir("".indexOf);
hir({ target: "String", proto: !0, forced: !$ir("includes") }, {
  includes: function(t) {
    return !!~yir(
      E1(pir(this)),
      E1(gir(t)),
      arguments.length > 1 ? arguments[1] : void 0
    );
  }
});
var mir = d, bir = O, wir = sr, Sir = G, T1 = bir("".charCodeAt);
mir({ target: "String", proto: !0 }, {
  isWellFormed: function() {
    for (var t = Sir(wir(this)), e = t.length, n = 0; n < e; n++) {
      var a = T1(t, n);
      if ((a & 63488) === 55296 && (a >= 56320 || ++n >= e || (T1(t, n) & 64512) !== 56320))
        return !1;
    }
    return !0;
  }
});
var Eir = Ku.charAt, Tir = G, eO = vr, xir = rd, x1 = ia, nO = "String Iterator", Iir = eO.set, Oir = eO.getterFor(nO);
xir(String, "String", function(r) {
  Iir(this, {
    type: nO,
    string: Tir(r),
    index: 0
  });
}, function() {
  var t = Oir(this), e = t.string, n = t.index, a;
  return n >= e.length ? x1(void 0, !0) : (a = Eir(e, n), t.index += a.length, x1(a, !1));
});
var I1 = U, O1 = lr, Air = Yd, A1 = I, aO = W, Rir = Tr, _ir = aO("species"), Bc = RegExp.prototype, Xu = function(r, t, e, n) {
  var a = aO(r), i = !A1(function() {
    var l = {};
    return l[a] = function() {
      return 7;
    }, ""[r](l) !== 7;
  }), o = i && !A1(function() {
    var l = !1, c = /a/;
    return r === "split" && (c = {}, c.constructor = {}, c.constructor[_ir] = function() {
      return c;
    }, c.flags = "", c[a] = /./[a]), c.exec = function() {
      return l = !0, null;
    }, c[a](""), !l;
  });
  if (!i || !o || e) {
    var s = /./[a], u = t(a, ""[r], function(l, c, f, v, h) {
      var g = c.exec;
      return g === Air || g === Bc.exec ? i && !h ? { done: !0, value: I1(s, c, f, v) } : { done: !0, value: I1(l, f, c, v) } : { done: !1 };
    });
    O1(String.prototype, r, u[0]), O1(Bc, a, u[1]);
  }
  n && Rir(Bc[a], "sham", !0);
}, Cir = Ku.charAt, Ju = function(r, t, e) {
  return t + (e ? Cir(r, t).length : 1);
}, R1 = U, Pir = k, Mir = Y, Nir = Er, Dir = Yd, Lir = TypeError, Gi = function(r, t) {
  var e = r.exec;
  if (Mir(e)) {
    var n = R1(e, r, t);
    return n !== null && Pir(n), n;
  }
  if (Nir(r) === "RegExp")
    return R1(Dir, r, t);
  throw new Lir("RegExp#exec called on incompatible receiver");
}, Fir = U, kir = Xu, Bir = k, jir = Nr, Uir = Ur, jc = G, zir = sr, Vir = _t, Gir = Ju, _1 = Gi;
kir("match", function(r, t, e) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function(a) {
      var i = zir(this), o = jir(a) ? void 0 : Vir(a, r);
      return o ? Fir(o, a, i) : new RegExp(a)[r](jc(i));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function(n) {
      var a = Bir(this), i = jc(n), o = e(t, a, i);
      if (o.done)
        return o.value;
      if (!a.global)
        return _1(a, i);
      var s = a.unicode;
      a.lastIndex = 0;
      for (var u = [], l = 0, c; (c = _1(a, i)) !== null; ) {
        var f = jc(c[0]);
        u[l] = f, f === "" && (a.lastIndex = Gir(i, Uir(a.lastIndex), s)), l++;
      }
      return l === 0 ? null : u;
    }
  ];
});
var Hir = d, Wir = U, iO = He, qir = Qh, _o = ia, C1 = sr, oO = Ur, fi = G, Yir = k, Kir = Nr, Xir = Er, Jir = Wu, sO = ji, Zir = _t, Qir = lr, ror = I, tor = W, eor = zu, nor = Ju, aor = Gi, uO = vr, ior = Yt, Vs = tor("matchAll"), lO = "RegExp String", cO = lO + " Iterator", oor = uO.set, sor = uO.getterFor(cO), P1 = RegExp.prototype, uor = TypeError, Jv = iO("".indexOf), Gs = iO("".matchAll), Uc = !!Gs && !ror(function() {
  Gs("a", /./);
}), lor = qir(function(t, e, n, a) {
  oor(this, {
    type: cO,
    regexp: t,
    string: e,
    global: n,
    unicode: a,
    done: !1
  });
}, lO, function() {
  var t = sor(this);
  if (t.done)
    return _o(void 0, !0);
  var e = t.regexp, n = t.string, a = aor(e, n);
  return a === null ? (t.done = !0, _o(void 0, !0)) : t.global ? (fi(a[0]) === "" && (e.lastIndex = nor(n, oO(e.lastIndex), t.unicode)), _o(a, !1)) : (t.done = !0, _o(a, !1));
}), fO = function(r) {
  var t = Yir(this), e = fi(r), n = eor(t, RegExp), a = fi(sO(t)), i, o, s;
  return i = new n(n === RegExp ? t.source : t, a), o = !!~Jv(a, "g"), s = !!~Jv(a, "u"), i.lastIndex = oO(t.lastIndex), new lor(i, e, o, s);
};
Hir({ target: "String", proto: !0, forced: Uc }, {
  matchAll: function(t) {
    var e = C1(this), n, a, i, o;
    if (Kir(t)) {
      if (Uc)
        return Gs(e, t);
    } else {
      if (Jir(t) && (n = fi(C1(sO(t))), !~Jv(n, "g")))
        throw new uor("`.matchAll` does not allow non-global regexes");
      if (Uc)
        return Gs(e, t);
      if (i = Zir(t, Vs), i === void 0 && ior && Xir(t) === "RegExp" && (i = fO), i)
        return Wir(i, t, e);
    }
    return a = fi(e), o = new RegExp(t, "g"), o[Vs](a);
  }
});
Vs in P1 || Qir(P1, Vs, fO);
var cor = Rt, vO = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(cor), vor = d, hor = Nu.end, dor = vO;
vor({ target: "String", proto: !0, forced: dor }, {
  padEnd: function(t) {
    return hor(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var gor = d, por = Nu.start, $or = vO;
gor({ target: "String", proto: !0, forced: $or }, {
  padStart: function(t) {
    return por(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var yor = d, hO = O, mor = gr, bor = Z, M1 = G, wor = ir, N1 = hO([].push), Sor = hO([].join);
yor({ target: "String", stat: !0 }, {
  raw: function(t) {
    var e = mor(bor(t).raw), n = wor(e);
    if (!n)
      return "";
    for (var a = arguments.length, i = [], o = 0; ; ) {
      if (N1(i, M1(e[o++])), o === n)
        return Sor(i, "");
      o < a && N1(i, M1(arguments[o]));
    }
  }
});
var Eor = d, Tor = Mu;
Eor({ target: "String", proto: !0 }, {
  repeat: Tor
});
var eg = O, xor = Z, Ior = Math.floor, zc = eg("".charAt), Oor = eg("".replace), Vc = eg("".slice), Aor = /\$([$&'`]|\d{1,2}|<[^>]*>)/g, Ror = /\$([$&'`]|\d{1,2})/g, dO = function(r, t, e, n, a, i) {
  var o = e + r.length, s = n.length, u = Ror;
  return a !== void 0 && (a = xor(a), u = Aor), Oor(i, u, function(l, c) {
    var f;
    switch (zc(c, 0)) {
      case "$":
        return "$";
      case "&":
        return r;
      case "`":
        return Vc(t, 0, e);
      case "'":
        return Vc(t, o);
      case "<":
        f = a[Vc(c, 1, -1)];
        break;
      default:
        var v = +c;
        if (v === 0)
          return l;
        if (v > s) {
          var h = Ior(v / 10);
          return h === 0 ? l : h <= s ? n[h - 1] === void 0 ? zc(c, 1) : n[h - 1] + zc(c, 1) : l;
        }
        f = n[v - 1];
    }
    return f === void 0 ? "" : f;
  });
}, _or = tt, D1 = U, Zu = O, Cor = Xu, Por = I, Mor = k, Nor = Y, Dor = Nr, Lor = fr, For = Ur, sn = G, kor = sr, Bor = Ju, jor = _t, Uor = dO, zor = Gi, Vor = W, Zv = Vor("replace"), Gor = Math.max, Hor = Math.min, Wor = Zu([].concat), Gc = Zu([].push), L1 = Zu("".indexOf), F1 = Zu("".slice), qor = function(r) {
  return r === void 0 ? r : String(r);
}, Yor = function() {
  return "a".replace(/./, "$0") === "$0";
}(), k1 = function() {
  return /./[Zv] ? /./[Zv]("a", "$0") === "" : !1;
}(), Kor = !Por(function() {
  var r = /./;
  return r.exec = function() {
    var t = [];
    return t.groups = { a: "7" }, t;
  }, "".replace(r, "$<a>") !== "7";
});
Cor("replace", function(r, t, e) {
  var n = k1 ? "$" : "$0";
  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function(i, o) {
      var s = kor(this), u = Dor(i) ? void 0 : jor(i, Zv);
      return u ? D1(u, i, s, o) : D1(t, sn(s), i, o);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function(a, i) {
      var o = Mor(this), s = sn(a);
      if (typeof i == "string" && L1(i, n) === -1 && L1(i, "$<") === -1) {
        var u = e(t, o, s, i);
        if (u.done)
          return u.value;
      }
      var l = Nor(i);
      l || (i = sn(i));
      var c = o.global, f;
      c && (f = o.unicode, o.lastIndex = 0);
      for (var v = [], h; h = zor(o, s), !(h === null || (Gc(v, h), !c)); ) {
        var g = sn(h[0]);
        g === "" && (o.lastIndex = Bor(s, For(o.lastIndex), f));
      }
      for (var $ = "", p = 0, y = 0; y < v.length; y++) {
        h = v[y];
        for (var S = sn(h[0]), x = Gor(Hor(Lor(h.index), s.length), 0), A = [], N, z = 1; z < h.length; z++)
          Gc(A, qor(h[z]));
        var X = h.groups;
        if (l) {
          var rr = Wor([S], A, x, s);
          X !== void 0 && Gc(rr, X), N = sn(_or(i, void 0, rr));
        } else
          N = Uor(S, s, x, A, X, i);
        x >= p && ($ += F1(s, p, x) + N, p = x + S.length);
      }
      return $ + F1(s, p);
    }
  ];
}, !Kor || !Yor || k1);
var Xor = d, Jor = U, ng = O, B1 = sr, Zor = Y, Qor = Nr, rsr = Wu, _a = G, tsr = _t, esr = ji, nsr = dO, asr = W, isr = asr("replace"), osr = TypeError, Hc = ng("".indexOf);
ng("".replace);
var j1 = ng("".slice), ssr = Math.max;
Xor({ target: "String", proto: !0 }, {
  replaceAll: function(t, e) {
    var n = B1(this), a, i, o, s, u, l, c, f, v, h, g = 0, $ = "";
    if (!Qor(t)) {
      if (a = rsr(t), a && (i = _a(B1(esr(t))), !~Hc(i, "g")))
        throw new osr("`.replaceAll` does not allow non-global regexes");
      if (o = tsr(t, isr), o)
        return Jor(o, t, n, e);
    }
    for (s = _a(n), u = _a(t), l = Zor(e), l || (e = _a(e)), c = u.length, f = ssr(1, c), v = Hc(s, u); v !== -1; )
      h = l ? _a(e(u, v, s)) : nsr(u, s, v, [], void 0, e), $ += j1(s, g, v) + h, g = v + c, v = v + f > s.length ? -1 : Hc(s, u, v + f);
    return g < s.length && ($ += j1(s, g)), $;
  }
});
var usr = U, lsr = Xu, csr = k, fsr = Nr, vsr = sr, U1 = eI, z1 = G, hsr = _t, dsr = Gi;
lsr("search", function(r, t, e) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function(a) {
      var i = vsr(this), o = fsr(a) ? void 0 : hsr(a, r);
      return o ? usr(o, a, i) : new RegExp(a)[r](z1(i));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function(n) {
      var a = csr(this), i = z1(n), o = e(t, a, i);
      if (o.done)
        return o.value;
      var s = a.lastIndex;
      U1(s, 0) || (a.lastIndex = 0);
      var u = dsr(a, i);
      return U1(a.lastIndex, s) || (a.lastIndex = s), u === null ? -1 : u.index;
    }
  ];
});
var Wc = U, gO = O, gsr = Xu, psr = k, $sr = Nr, ysr = sr, msr = zu, bsr = Ju, wsr = Ur, V1 = G, Ssr = _t, G1 = Gi, Esr = qu, Tsr = I, un = Esr.UNSUPPORTED_Y, xsr = 4294967295, Isr = Math.min, qc = gO([].push), Yc = gO("".slice), Osr = !Tsr(function() {
  var r = /(?:)/, t = r.exec;
  r.exec = function() {
    return t.apply(this, arguments);
  };
  var e = "ab".split(r);
  return e.length !== 2 || e[0] !== "a" || e[1] !== "b";
}), H1 = "abbc".split(/(b)*/)[1] === "c" || // eslint-disable-next-line regexp/no-empty-group -- required for testing
"test".split(/(?:)/, -1).length !== 4 || "ab".split(/(?:ab)*/).length !== 2 || ".".split(/(.?)(.?)/).length !== 4 || // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
".".split(/()()/).length > 1 || "".split(/.?/).length;
gsr("split", function(r, t, e) {
  var n = "0".split(void 0, 0).length ? function(a, i) {
    return a === void 0 && i === 0 ? [] : Wc(t, this, a, i);
  } : t;
  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function(i, o) {
      var s = ysr(this), u = $sr(i) ? void 0 : Ssr(i, r);
      return u ? Wc(u, i, s, o) : Wc(n, V1(s), i, o);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function(a, i) {
      var o = psr(this), s = V1(a);
      if (!H1) {
        var u = e(n, o, s, i, n !== t);
        if (u.done)
          return u.value;
      }
      var l = msr(o, RegExp), c = o.unicode, f = (o.ignoreCase ? "i" : "") + (o.multiline ? "m" : "") + (o.unicode ? "u" : "") + (un ? "g" : "y"), v = new l(un ? "^(?:" + o.source + ")" : o, f), h = i === void 0 ? xsr : i >>> 0;
      if (h === 0)
        return [];
      if (s.length === 0)
        return G1(v, s) === null ? [s] : [];
      for (var g = 0, $ = 0, p = []; $ < s.length; ) {
        v.lastIndex = un ? 0 : $;
        var y = G1(v, un ? Yc(s, $) : s), S;
        if (y === null || (S = Isr(wsr(v.lastIndex + (un ? $ : 0)), s.length)) === g)
          $ = bsr(s, $, c);
        else {
          if (qc(p, Yc(s, g, $)), p.length === h)
            return p;
          for (var x = 1; x <= y.length - 1; x++)
            if (qc(p, y[x]), p.length === h)
              return p;
          $ = g = S;
        }
      }
      return qc(p, Yc(s, g)), p;
    }
  ];
}, H1 || !Osr, un);
var Asr = d, Rsr = He, _sr = Sr.f, Csr = Ur, W1 = G, Psr = rg, Msr = sr, Nsr = tg, Dsr = Rsr("".slice), Lsr = Math.min, pO = Nsr("startsWith"), Fsr = !pO && !!function() {
  var r = _sr(String.prototype, "startsWith");
  return r && !r.writable;
}();
Asr({ target: "String", proto: !0, forced: !Fsr && !pO }, {
  startsWith: function(t) {
    var e = W1(Msr(this));
    Psr(t);
    var n = Csr(Lsr(arguments.length > 1 ? arguments[1] : void 0, e.length)), a = W1(t);
    return Dsr(e, n, n + a.length) === a;
  }
});
var ksr = d, Bsr = O, jsr = sr, q1 = fr, Usr = G, zsr = Bsr("".slice), Vsr = Math.max, Gsr = Math.min, Hsr = !"".substr || "ab".substr(-1) !== "b";
ksr({ target: "String", proto: !0, forced: Hsr }, {
  substr: function(t, e) {
    var n = Usr(jsr(this)), a = n.length, i = q1(t), o, s;
    return i === 1 / 0 && (i = 0), i < 0 && (i = Vsr(a + i, 0)), o = e === void 0 ? a : q1(e), o <= 0 || o === 1 / 0 ? "" : (s = Gsr(i + o, a), i >= s ? "" : zsr(n, i, s));
  }
});
var Wsr = d, $O = U, ag = O, qsr = sr, Ysr = G, Ksr = I, Xsr = Array, Kc = ag("".charAt), Y1 = ag("".charCodeAt), Jsr = ag([].join), Qv = "".toWellFormed, Zsr = "�", K1 = Qv && Ksr(function() {
  return $O(Qv, 1) !== "1";
});
Wsr({ target: "String", proto: !0, forced: K1 }, {
  toWellFormed: function() {
    var t = Ysr(qsr(this));
    if (K1)
      return $O(Qv, t);
    for (var e = t.length, n = Xsr(e), a = 0; a < e; a++) {
      var i = Y1(t, a);
      (i & 63488) !== 55296 ? n[a] = Kc(t, a) : i >= 56320 || a + 1 >= e || (Y1(t, a + 1) & 64512) !== 56320 ? n[a] = Zsr : (n[a] = Kc(t, a), n[++a] = Kc(t, a));
    }
    return Jsr(n, "");
  }
});
var Qsr = ta.PROPER, rur = I, X1 = Fi, J1 = "​᠎", ig = function(r) {
  return rur(function() {
    return !!X1[r]() || J1[r]() !== J1 || Qsr && X1[r].name !== r;
  });
}, tur = d, eur = va.trim, nur = ig;
tur({ target: "String", proto: !0, forced: nur("trim") }, {
  trim: function() {
    return eur(this);
  }
});
var aur = va.end, iur = ig, yO = iur("trimEnd") ? function() {
  return aur(this);
} : "".trimEnd, our = d, Z1 = yO;
our({ target: "String", proto: !0, name: "trimEnd", forced: "".trimRight !== Z1 }, {
  trimRight: Z1
});
var sur = d, Q1 = yO;
sur({ target: "String", proto: !0, name: "trimEnd", forced: "".trimEnd !== Q1 }, {
  trimEnd: Q1
});
var uur = va.start, lur = ig, mO = lur("trimStart") ? function() {
  return uur(this);
} : "".trimStart, cur = d, rb = mO;
cur({ target: "String", proto: !0, name: "trimStart", forced: "".trimLeft !== rb }, {
  trimLeft: rb
});
var fur = d, tb = mO;
fur({ target: "String", proto: !0, name: "trimStart", forced: "".trimStart !== tb }, {
  trimStart: tb
});
var vur = O, hur = sr, eb = G, dur = /"/g, gur = vur("".replace), Hr = function(r, t, e, n) {
  var a = eb(hur(r)), i = "<" + t;
  return e !== "" && (i += " " + e + '="' + gur(eb(n), dur, "&quot;") + '"'), i + ">" + a + "</" + t + ">";
}, pur = I, Wr = function(r) {
  return pur(function() {
    var t = ""[r]('"');
    return t !== t.toLowerCase() || t.split('"').length > 3;
  });
}, $ur = d, yur = Hr, mur = Wr;
$ur({ target: "String", proto: !0, forced: mur("anchor") }, {
  anchor: function(t) {
    return yur(this, "a", "name", t);
  }
});
var bur = d, wur = Hr, Sur = Wr;
bur({ target: "String", proto: !0, forced: Sur("big") }, {
  big: function() {
    return wur(this, "big", "", "");
  }
});
var Eur = d, Tur = Hr, xur = Wr;
Eur({ target: "String", proto: !0, forced: xur("blink") }, {
  blink: function() {
    return Tur(this, "blink", "", "");
  }
});
var Iur = d, Our = Hr, Aur = Wr;
Iur({ target: "String", proto: !0, forced: Aur("bold") }, {
  bold: function() {
    return Our(this, "b", "", "");
  }
});
var Rur = d, _ur = Hr, Cur = Wr;
Rur({ target: "String", proto: !0, forced: Cur("fixed") }, {
  fixed: function() {
    return _ur(this, "tt", "", "");
  }
});
var Pur = d, Mur = Hr, Nur = Wr;
Pur({ target: "String", proto: !0, forced: Nur("fontcolor") }, {
  fontcolor: function(t) {
    return Mur(this, "font", "color", t);
  }
});
var Dur = d, Lur = Hr, Fur = Wr;
Dur({ target: "String", proto: !0, forced: Fur("fontsize") }, {
  fontsize: function(t) {
    return Lur(this, "font", "size", t);
  }
});
var kur = d, Bur = Hr, jur = Wr;
kur({ target: "String", proto: !0, forced: jur("italics") }, {
  italics: function() {
    return Bur(this, "i", "", "");
  }
});
var Uur = d, zur = Hr, Vur = Wr;
Uur({ target: "String", proto: !0, forced: Vur("link") }, {
  link: function(t) {
    return zur(this, "a", "href", t);
  }
});
var Gur = d, Hur = Hr, Wur = Wr;
Gur({ target: "String", proto: !0, forced: Wur("small") }, {
  small: function() {
    return Hur(this, "small", "", "");
  }
});
var qur = d, Yur = Hr, Kur = Wr;
qur({ target: "String", proto: !0, forced: Kur("strike") }, {
  strike: function() {
    return Yur(this, "strike", "", "");
  }
});
var Xur = d, Jur = Hr, Zur = Wr;
Xur({ target: "String", proto: !0, forced: Zur("sub") }, {
  sub: function() {
    return Jur(this, "sub", "", "");
  }
});
var Qur = d, rlr = Hr, tlr = Wr;
Qur({ target: "String", proto: !0, forced: tlr("sup") }, {
  sup: function() {
    return rlr(this, "sup", "", "");
  }
});
var rh = { exports: {} }, bO = _, Xc = I, elr = Su, nlr = q.NATIVE_ARRAY_BUFFER_VIEWS, alr = bO.ArrayBuffer, Oe = bO.Int8Array, og = !nlr || !Xc(function() {
  Oe(1);
}) || !Xc(function() {
  new Oe(-1);
}) || !elr(function(r) {
  new Oe(), new Oe(null), new Oe(1.5), new Oe(r);
}, !0) || Xc(function() {
  return new Oe(new alr(2), 1, void 0).length !== 1;
}), ilr = Td, olr = RangeError, wO = function(r, t) {
  var e = ilr(r);
  if (e % t)
    throw new olr("Wrong offset");
  return e;
}, slr = Math.round, ulr = function(r) {
  var t = slr(r);
  return t < 0 ? 0 : t > 255 ? 255 : t & 255;
}, llr = vt, SO = function(r) {
  var t = llr(r);
  return t === "BigInt64Array" || t === "BigUint64Array";
}, clr = uu, flr = TypeError, sg = function(r) {
  var t = clr(r, "number");
  if (typeof t == "number")
    throw new flr("Can't convert number to bigint");
  return BigInt(t);
}, vlr = ht, hlr = U, dlr = Dd, glr = Z, plr = ir, $lr = mu, ylr = na, mlr = Kh, blr = SO, wlr = q.aTypedArrayConstructor, Slr = sg, EO = function(t) {
  var e = dlr(this), n = glr(t), a = arguments.length, i = a > 1 ? arguments[1] : void 0, o = i !== void 0, s = ylr(n), u, l, c, f, v, h, g, $;
  if (s && !mlr(s))
    for (g = $lr(n, s), $ = g.next, n = []; !(h = hlr($, g)).done; )
      n.push(h.value);
  for (o && a > 2 && (i = vlr(i, arguments[2])), l = plr(n), c = new (wlr(e))(l), f = blr(c), u = 0; l > u; u++)
    v = o ? i(n[u], u) : n[u], c[u] = f ? Slr(v) : +v;
  return c;
}, nb = d, TO = _, ab = U, Elr = j, Tlr = og, Hi = q, xO = _u, ib = dt, xlr = Qr, Ca = Tr, Ilr = Pd, Olr = Ur, ob = Ou, Jc = wO, Alr = ulr, IO = de, Pa = K, Rlr = vt, th = H, _lr = Ve, Clr = zr, Plr = Dr, Co = Ct, Mlr = ge.f, sb = EO, Nlr = br.forEach, Dlr = sa, Llr = hr, OO = ur, AO = Sr, ub = xu, ug = vr, Flr = We, eh = ug.get, klr = ug.set, Blr = ug.enforce, RO = OO.f, jlr = AO.f, Zc = TO.RangeError, _O = xO.ArrayBuffer, Ulr = _O.prototype, zlr = xO.DataView, Po = Hi.NATIVE_ARRAY_BUFFER_VIEWS, lb = Hi.TYPED_ARRAY_TAG, cb = Hi.TypedArray, Ma = Hi.TypedArrayPrototype, nh = Hi.isTypedArray, Mo = "BYTES_PER_ELEMENT", Qc = "Wrong length", No = function(r, t) {
  Llr(r, t, {
    configurable: !0,
    get: function() {
      return eh(this)[t];
    }
  });
}, fb = function(r) {
  var t;
  return Plr(Ulr, r) || (t = Rlr(r)) === "ArrayBuffer" || t === "SharedArrayBuffer";
}, CO = function(r, t) {
  return nh(r) && !_lr(t) && t in r && Ilr(+t) && t >= 0;
}, vb = function(t, e) {
  return e = IO(e), CO(t, e) ? xlr(2, t[e]) : jlr(t, e);
}, hb = function(t, e, n) {
  return e = IO(e), CO(t, e) && th(n) && Pa(n, "value") && !Pa(n, "get") && !Pa(n, "set") && !n.configurable && (!Pa(n, "writable") || n.writable) && (!Pa(n, "enumerable") || n.enumerable) ? (t[e] = n.value, t) : RO(t, e, n);
};
Elr ? (Po || (AO.f = vb, OO.f = hb, No(Ma, "buffer"), No(Ma, "byteOffset"), No(Ma, "byteLength"), No(Ma, "length")), nb({ target: "Object", stat: !0, forced: !Po }, {
  getOwnPropertyDescriptor: vb,
  defineProperty: hb
}), rh.exports = function(r, t, e) {
  var n = r.match(/\d+/)[0] / 8, a = r + (e ? "Clamped" : "") + "Array", i = "get" + r, o = "set" + r, s = TO[a], u = s, l = u && u.prototype, c = {}, f = function($, p) {
    var y = eh($);
    return y.view[i](p * n + y.byteOffset, !0);
  }, v = function($, p, y) {
    var S = eh($);
    S.view[o](p * n + S.byteOffset, e ? Alr(y) : y, !0);
  }, h = function($, p) {
    RO($, p, {
      get: function() {
        return f(this, p);
      },
      set: function(y) {
        return v(this, p, y);
      },
      enumerable: !0
    });
  };
  Po ? Tlr && (u = t(function($, p, y, S) {
    return ib($, l), Flr(function() {
      return th(p) ? fb(p) ? S !== void 0 ? new s(p, Jc(y, n), S) : y !== void 0 ? new s(p, Jc(y, n)) : new s(p) : nh(p) ? ub(u, p) : ab(sb, u, p) : new s(ob(p));
    }(), $, u);
  }), Co && Co(u, cb), Nlr(Mlr(s), function($) {
    $ in u || Ca(u, $, s[$]);
  }), u.prototype = l) : (u = t(function($, p, y, S) {
    ib($, l);
    var x = 0, A = 0, N, z, X;
    if (!th(p))
      X = ob(p), z = X * n, N = new _O(z);
    else if (fb(p)) {
      N = p, A = Jc(y, n);
      var rr = p.byteLength;
      if (S === void 0) {
        if (rr % n)
          throw new Zc(Qc);
        if (z = rr - A, z < 0)
          throw new Zc(Qc);
      } else if (z = Olr(S) * n, z + A > rr)
        throw new Zc(Qc);
      X = z / n;
    } else
      return nh(p) ? ub(u, p) : ab(sb, u, p);
    for (klr($, {
      buffer: N,
      byteOffset: A,
      byteLength: z,
      length: X,
      view: new zlr(N)
    }); x < X; )
      h($, x++);
  }), Co && Co(u, cb), l = u.prototype = Clr(Ma)), l.constructor !== u && Ca(l, "constructor", u), Blr(l).TypedArrayConstructor = u, lb && Ca(l, lb, a);
  var g = u !== s;
  c[a] = u, nb({ global: !0, constructor: !0, forced: g, sham: !Po }, c), Mo in u || Ca(u, Mo, n), Mo in l || Ca(l, Mo, n), Dlr(a);
}) : rh.exports = function() {
};
var Qt = rh.exports, Vlr = Qt;
Vlr("Float32", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
});
var Glr = Qt;
Glr("Float64", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
});
var Hlr = Qt;
Hlr("Int8", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
});
var Wlr = Qt;
Wlr("Int16", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
});
var qlr = Qt;
qlr("Int32", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
});
var Ylr = Qt;
Ylr("Uint8", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
});
var Klr = Qt;
Klr("Uint8", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
}, !0);
var Xlr = Qt;
Xlr("Uint16", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
});
var Jlr = Qt;
Jlr("Uint32", function(r) {
  return function(e, n, a) {
    return r(this, e, n, a);
  };
});
var PO = q, Zlr = ir, Qlr = fr, rcr = PO.aTypedArray, tcr = PO.exportTypedArrayMethod;
tcr("at", function(t) {
  var e = rcr(this), n = Zlr(e), a = Qlr(t), i = a >= 0 ? a : n + a;
  return i < 0 || i >= n ? void 0 : e[i];
});
var ecr = O, MO = q, ncr = tT, acr = ecr(ncr), icr = MO.aTypedArray, ocr = MO.exportTypedArrayMethod;
ocr("copyWithin", function(t, e) {
  return acr(icr(this), t, e, arguments.length > 2 ? arguments[2] : void 0);
});
var NO = q, scr = br.every, ucr = NO.aTypedArray, lcr = NO.exportTypedArrayMethod;
lcr("every", function(t) {
  return scr(ucr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var DO = q, ccr = Jh, fcr = sg, vcr = vt, hcr = U, dcr = O, gcr = I, pcr = DO.aTypedArray, $cr = DO.exportTypedArrayMethod, ycr = dcr("".slice), mcr = gcr(function() {
  var r = 0;
  return new Int8Array(2).fill({ valueOf: function() {
    return r++;
  } }), r !== 1;
});
$cr("fill", function(t) {
  var e = arguments.length;
  pcr(this);
  var n = ycr(vcr(this), 0, 3) === "Big" ? fcr(t) : +t;
  return hcr(ccr, this, n, e > 1 ? arguments[1] : void 0, e > 2 ? arguments[2] : void 0);
}, mcr);
var bcr = xu, wcr = q.getTypedArrayConstructor, Scr = function(r, t) {
  return bcr(wcr(r), t);
}, LO = q, Ecr = br.filter, Tcr = Scr, xcr = LO.aTypedArray, Icr = LO.exportTypedArrayMethod;
Icr("filter", function(t) {
  var e = Ecr(xcr(this), t, arguments.length > 1 ? arguments[1] : void 0);
  return Tcr(this, e);
});
var FO = q, Ocr = br.find, Acr = FO.aTypedArray, Rcr = FO.exportTypedArrayMethod;
Rcr("find", function(t) {
  return Ocr(Acr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var kO = q, _cr = br.findIndex, Ccr = kO.aTypedArray, Pcr = kO.exportTypedArrayMethod;
Pcr("findIndex", function(t) {
  return _cr(Ccr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var BO = q, Mcr = wu.findLast, Ncr = BO.aTypedArray, Dcr = BO.exportTypedArrayMethod;
Dcr("findLast", function(t) {
  return Mcr(Ncr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var jO = q, Lcr = wu.findLastIndex, Fcr = jO.aTypedArray, kcr = jO.exportTypedArrayMethod;
kcr("findLastIndex", function(t) {
  return Lcr(Fcr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var UO = q, Bcr = br.forEach, jcr = UO.aTypedArray, Ucr = UO.exportTypedArrayMethod;
Ucr("forEach", function(t) {
  Bcr(jcr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var zcr = og, Vcr = q.exportTypedArrayStaticMethod, Gcr = EO;
Vcr("from", Gcr, zcr);
var zO = q, Hcr = Si.includes, Wcr = zO.aTypedArray, qcr = zO.exportTypedArrayMethod;
qcr("includes", function(t) {
  return Hcr(Wcr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var VO = q, Ycr = Si.indexOf, Kcr = VO.aTypedArray, Xcr = VO.exportTypedArrayMethod;
Xcr("indexOf", function(t) {
  return Ycr(Kcr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var Jcr = _, Zcr = I, lg = O, GO = q, cg = pT, Qcr = W, fg = Qcr("iterator"), db = Jcr.Uint8Array, rfr = lg(cg.values), tfr = lg(cg.keys), efr = lg(cg.entries), vg = GO.aTypedArray, Qu = GO.exportTypedArrayMethod, dn = db && db.prototype, rl = !Zcr(function() {
  dn[fg].call([1]);
}), HO = !!dn && dn.values && dn[fg] === dn.values && dn.values.name === "values", WO = function() {
  return rfr(vg(this));
};
Qu("entries", function() {
  return efr(vg(this));
}, rl);
Qu("keys", function() {
  return tfr(vg(this));
}, rl);
Qu("values", WO, rl || !HO, { name: "values" });
Qu(fg, WO, rl || !HO, { name: "values" });
var qO = q, nfr = O, afr = qO.aTypedArray, ifr = qO.exportTypedArrayMethod, ofr = nfr([].join);
ifr("join", function(t) {
  return ofr(afr(this), t);
});
var YO = q, sfr = tt, ufr = yT, lfr = YO.aTypedArray, cfr = YO.exportTypedArrayMethod;
cfr("lastIndexOf", function(t) {
  var e = arguments.length;
  return sfr(ufr, lfr(this), e > 1 ? [t, arguments[1]] : [t]);
});
var hg = q, ffr = br.map, vfr = hg.aTypedArray, hfr = hg.getTypedArrayConstructor, dfr = hg.exportTypedArrayMethod;
dfr("map", function(t) {
  return ffr(vfr(this), t, arguments.length > 1 ? arguments[1] : void 0, function(e, n) {
    return new (hfr(e))(n);
  });
});
var KO = q, gfr = og, pfr = KO.aTypedArrayConstructor, $fr = KO.exportTypedArrayStaticMethod;
$fr("of", function() {
  for (var t = 0, e = arguments.length, n = new (pfr(this))(e); e > t; )
    n[t] = arguments[t++];
  return n;
}, gfr);
var XO = q, yfr = Eu.left, mfr = XO.aTypedArray, bfr = XO.exportTypedArrayMethod;
bfr("reduce", function(t) {
  var e = arguments.length;
  return yfr(mfr(this), t, e, e > 1 ? arguments[1] : void 0);
});
var JO = q, wfr = Eu.right, Sfr = JO.aTypedArray, Efr = JO.exportTypedArrayMethod;
Efr("reduceRight", function(t) {
  var e = arguments.length;
  return wfr(Sfr(this), t, e, e > 1 ? arguments[1] : void 0);
});
var ZO = q, Tfr = ZO.aTypedArray, xfr = ZO.exportTypedArrayMethod, Ifr = Math.floor;
xfr("reverse", function() {
  for (var t = this, e = Tfr(t).length, n = Ifr(e / 2), a = 0, i; a < n; )
    i = t[a], t[a++] = t[--e], t[e] = i;
  return t;
});
var QO = _, rA = U, dg = q, Ofr = ir, Afr = wO, Rfr = Z, tA = I, _fr = QO.RangeError, ah = QO.Int8Array, gb = ah && ah.prototype, eA = gb && gb.set, Cfr = dg.aTypedArray, Pfr = dg.exportTypedArrayMethod, ih = !tA(function() {
  var r = new Uint8ClampedArray(2);
  return rA(eA, r, { length: 1, 0: 3 }, 1), r[1] !== 3;
}), Mfr = ih && dg.NATIVE_ARRAY_BUFFER_VIEWS && tA(function() {
  var r = new ah(2);
  return r.set(1), r.set("2", 1), r[0] !== 0 || r[1] !== 2;
});
Pfr("set", function(t) {
  Cfr(this);
  var e = Afr(arguments.length > 1 ? arguments[1] : void 0, 1), n = Rfr(t);
  if (ih)
    return rA(eA, this, n, e);
  var a = this.length, i = Ofr(n), o = 0;
  if (i + e > a)
    throw new _fr("Wrong length");
  for (; o < i; )
    this[e + o] = n[o++];
}, !ih || Mfr);
var gg = q, Nfr = I, Dfr = rt, Lfr = gg.aTypedArray, Ffr = gg.getTypedArrayConstructor, kfr = gg.exportTypedArrayMethod, Bfr = Nfr(function() {
  new Int8Array(1).slice();
});
kfr("slice", function(t, e) {
  for (var n = Dfr(Lfr(this), t, e), a = Ffr(this), i = 0, o = n.length, s = new a(o); o > i; )
    s[i] = n[i++];
  return s;
}, Bfr);
var nA = q, jfr = br.some, Ufr = nA.aTypedArray, zfr = nA.exportTypedArrayMethod;
zfr("some", function(t) {
  return jfr(Ufr(this), t, arguments.length > 1 ? arguments[1] : void 0);
});
var Vfr = _, Gfr = He, oh = I, Hfr = J, Wfr = nd, aA = q, pb = bT, qfr = wT, $b = qt, yb = ad, Yfr = aA.aTypedArray, Kfr = aA.exportTypedArrayMethod, vi = Vfr.Uint16Array, Mn = vi && Gfr(vi.prototype.sort), Xfr = !!Mn && !(oh(function() {
  Mn(new vi(2), null);
}) && oh(function() {
  Mn(new vi(2), {});
})), mb = !!Mn && !oh(function() {
  if ($b)
    return $b < 74;
  if (pb)
    return pb < 67;
  if (qfr)
    return !0;
  if (yb)
    return yb < 602;
  var r = new vi(516), t = Array(516), e, n;
  for (e = 0; e < 516; e++)
    n = e % 4, r[e] = 515 - e, t[e] = e - 2 * n + 3;
  for (Mn(r, function(a, i) {
    return (a / 4 | 0) - (i / 4 | 0);
  }), e = 0; e < 516; e++)
    if (r[e] !== t[e])
      return !0;
}), Jfr = function(r) {
  return function(t, e) {
    return r !== void 0 ? +r(t, e) || 0 : e !== e ? -1 : t !== t ? 1 : t === 0 && e === 0 ? 1 / t > 0 && 1 / e < 0 ? 1 : -1 : t > e;
  };
};
Kfr("sort", function(t) {
  return t !== void 0 && Hfr(t), mb ? Mn(this, t) : Wfr(Yfr(this), Jfr(t));
}, !mb || Xfr);
var pg = q, Zfr = Ur, bb = Kt, Qfr = pg.aTypedArray, rvr = pg.getTypedArrayConstructor, tvr = pg.exportTypedArrayMethod;
tvr("subarray", function(t, e) {
  var n = Qfr(this), a = n.length, i = bb(t, a), o = rvr(n);
  return new o(
    n.buffer,
    n.byteOffset + i * n.BYTES_PER_ELEMENT,
    Zfr((e === void 0 ? a : bb(e, a)) - i)
  );
});
var evr = _, nvr = tt, iA = q, sh = I, wb = rt, Hs = evr.Int8Array, Sb = iA.aTypedArray, avr = iA.exportTypedArrayMethod, oA = [].toLocaleString, ivr = !!Hs && sh(function() {
  oA.call(new Hs(1));
}), ovr = sh(function() {
  return [1, 2].toLocaleString() !== new Hs([1, 2]).toLocaleString();
}) || !sh(function() {
  Hs.prototype.toLocaleString.call([1, 2]);
});
avr("toLocaleString", function() {
  return nvr(
    oA,
    ivr ? wb(Sb(this)) : Sb(this),
    wb(arguments)
  );
}, ovr);
var svr = TT, $g = q, uvr = $g.aTypedArray, lvr = $g.exportTypedArrayMethod, cvr = $g.getTypedArrayConstructor;
lvr("toReversed", function() {
  return svr(uvr(this), cvr(this));
});
var tl = q, fvr = O, vvr = J, hvr = xu, dvr = tl.aTypedArray, gvr = tl.getTypedArrayConstructor, pvr = tl.exportTypedArrayMethod, $vr = fvr(tl.TypedArrayPrototype.sort);
pvr("toSorted", function(t) {
  t !== void 0 && vvr(t);
  var e = dvr(this), n = hvr(gvr(e), e);
  return $vr(n, t);
});
var yvr = q.exportTypedArrayMethod, mvr = I, bvr = _, wvr = O, Eb = bvr.Uint8Array, Svr = Eb && Eb.prototype || {}, Ws = [].toString, Evr = wvr([].join);
mvr(function() {
  Ws.call({});
}) && (Ws = function() {
  return Evr(this);
});
var Tvr = Svr.toString !== Ws;
yvr("toString", Ws, Tvr);
var xvr = xT, yg = q, Ivr = SO, Ovr = fr, Avr = sg, Rvr = yg.aTypedArray, _vr = yg.getTypedArrayConstructor, Cvr = yg.exportTypedArrayMethod, Pvr = !!function() {
  try {
    new Int8Array(1).with(2, { valueOf: function() {
      throw 8;
    } });
  } catch (r) {
    return r === 8;
  }
}();
Cvr("with", function(r, t) {
  var e = Rvr(this), n = Ovr(r), a = Ivr(e) ? Avr(t) : +t;
  return xvr(e, _vr(e), n, a);
}, !Pvr);
var Mvr = d, mg = O, Nvr = G, Tb = String.fromCharCode, xb = mg("".charAt), Ib = mg(/./.exec), Ob = mg("".slice), Dvr = /^[\da-f]{2}$/i, Lvr = /^[\da-f]{4}$/i;
Mvr({ global: !0 }, {
  unescape: function(t) {
    for (var e = Nvr(t), n = "", a = e.length, i = 0, o, s; i < a; ) {
      if (o = xb(e, i++), o === "%") {
        if (xb(e, i) === "u") {
          if (s = Ob(e, i + 1, i + 5), Ib(Lvr, s)) {
            n += Tb(parseInt(s, 16)), i += 5;
            continue;
          }
        } else if (s = Ob(e, i, i + 2), Ib(Dvr, s)) {
          n += Tb(parseInt(s, 16)), i += 2;
          continue;
        }
      }
      n += o;
    }
    return n;
  }
});
var Fvr = O, Ab = ua, Do = Ke.getWeakData, kvr = dt, Bvr = k, jvr = Nr, rf = H, Uvr = pr, sA = br, Rb = K, uA = vr, zvr = uA.set, Vvr = uA.getterFor, Gvr = sA.find, Hvr = sA.findIndex, Wvr = Fvr([].splice), qvr = 0, Lo = function(r) {
  return r.frozen || (r.frozen = new lA());
}, lA = function() {
  this.entries = [];
}, tf = function(r, t) {
  return Gvr(r.entries, function(e) {
    return e[0] === t;
  });
};
lA.prototype = {
  get: function(r) {
    var t = tf(this, r);
    if (t)
      return t[1];
  },
  has: function(r) {
    return !!tf(this, r);
  },
  set: function(r, t) {
    var e = tf(this, r);
    e ? e[1] = t : this.entries.push([r, t]);
  },
  delete: function(r) {
    var t = Hvr(this.entries, function(e) {
      return e[0] === r;
    });
    return ~t && Wvr(this.entries, t, 1), !!~t;
  }
};
var cA = {
  getConstructor: function(r, t, e, n) {
    var a = r(function(u, l) {
      kvr(u, i), zvr(u, {
        type: t,
        id: qvr++,
        frozen: null
      }), jvr(l) || Uvr(l, u[n], { that: u, AS_ENTRIES: e });
    }), i = a.prototype, o = Vvr(t), s = function(u, l, c) {
      var f = o(u), v = Do(Bvr(l), !0);
      return v === !0 ? Lo(f).set(l, c) : v[f.id] = c, u;
    };
    return Ab(i, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      delete: function(u) {
        var l = o(this);
        if (!rf(u))
          return !1;
        var c = Do(u);
        return c === !0 ? Lo(l).delete(u) : c && Rb(c, l.id) && delete c[l.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function(l) {
        var c = o(this);
        if (!rf(l))
          return !1;
        var f = Do(l);
        return f === !0 ? Lo(c).has(l) : f && Rb(f, c.id);
      }
    }), Ab(i, e ? {
      // `WeakMap.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
      get: function(l) {
        var c = o(this);
        if (rf(l)) {
          var f = Do(l);
          if (f === !0)
            return Lo(c).get(l);
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
}, Yvr = fa, _b = _, os = O, Cb = ua, Kvr = Ke, Xvr = Du, fA = cA, Fo = H, ko = vr.enforce, Jvr = I, Zvr = eE, Wi = Object, Qvr = Array.isArray, Bo = Wi.isExtensible, vA = Wi.isFrozen, rhr = Wi.isSealed, hA = Wi.freeze, thr = Wi.seal, ehr = !_b.ActiveXObject && "ActiveXObject" in _b, Na, dA = function(r) {
  return function() {
    return r(this, arguments.length ? arguments[0] : void 0);
  };
}, gA = Xvr("WeakMap", dA, fA), gn = gA.prototype, ss = os(gn.set), nhr = function() {
  return Yvr && Jvr(function() {
    var r = hA([]);
    return ss(new gA(), r, 1), !vA(r);
  });
};
if (Zvr)
  if (ehr) {
    Na = fA.getConstructor(dA, "WeakMap", !0), Kvr.enable();
    var Pb = os(gn.delete), jo = os(gn.has), Mb = os(gn.get);
    Cb(gn, {
      delete: function(r) {
        if (Fo(r) && !Bo(r)) {
          var t = ko(this);
          return t.frozen || (t.frozen = new Na()), Pb(this, r) || t.frozen.delete(r);
        }
        return Pb(this, r);
      },
      has: function(t) {
        if (Fo(t) && !Bo(t)) {
          var e = ko(this);
          return e.frozen || (e.frozen = new Na()), jo(this, t) || e.frozen.has(t);
        }
        return jo(this, t);
      },
      get: function(t) {
        if (Fo(t) && !Bo(t)) {
          var e = ko(this);
          return e.frozen || (e.frozen = new Na()), jo(this, t) ? Mb(this, t) : e.frozen.get(t);
        }
        return Mb(this, t);
      },
      set: function(t, e) {
        if (Fo(t) && !Bo(t)) {
          var n = ko(this);
          n.frozen || (n.frozen = new Na()), jo(this, t) ? ss(this, t, e) : n.frozen.set(t, e);
        } else
          ss(this, t, e);
        return this;
      }
    });
  } else
    nhr() && Cb(gn, {
      set: function(t, e) {
        var n;
        return Qvr(t) && (vA(t) ? n = hA : rhr(t) && (n = thr)), ss(this, t, e), n && n(t), this;
      }
    });
var ahr = Du, ihr = cA;
ahr("WeakSet", function(r) {
  return function() {
    return r(this, arguments.length ? arguments[0] : void 0);
  };
}, ihr);
var pA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", Nb = pA + "+/", Db = pA + "-_", Lb = function(r) {
  for (var t = {}, e = 0; e < 64; e++)
    t[r.charAt(e)] = e;
  return t;
}, $A = {
  i2c: Nb,
  c2i: Lb(Nb),
  i2cUrl: Db,
  c2iUrl: Lb(Db)
}, ohr = d, shr = _, yA = ar, bg = O, uhr = U, el = I, lhr = G, chr = et, Fb = $A.c2i, mA = /[^\d+/a-z]/i, fhr = /[\t\n\f\r ]+/g, vhr = /[=]{1,2}$/, je = yA("atob"), hhr = String.fromCharCode, dhr = bg("".charAt), kb = bg("".replace), ghr = bg(mA.exec), ga = !!je && !el(function() {
  return je("aGk=") !== "hi";
}), bA = ga && el(function() {
  return je(" ") !== "";
}), wA = ga && !el(function() {
  je("a");
}), phr = ga && !el(function() {
  je();
}), $hr = ga && je.length !== 1, yhr = !ga || bA || wA || phr || $hr;
ohr({ global: !0, bind: !0, enumerable: !0, forced: yhr }, {
  atob: function(t) {
    if (chr(arguments.length, 1), ga && !bA && !wA)
      return uhr(je, shr, t);
    var e = kb(lhr(t), fhr, ""), n = "", a = 0, i = 0, o, s, u;
    if (e.length % 4 === 0 && (e = kb(e, vhr, "")), o = e.length, o % 4 === 1 || ghr(mA, e))
      throw new (yA("DOMException"))("The string is not correctly encoded", "InvalidCharacterError");
    for (; a < o; )
      s = dhr(e, a++), u = i % 4 ? u * 64 + Fb[s] : Fb[s], i++ % 4 && (n += hhr(255 & u >> (-2 * i & 6)));
    return n;
  }
});
var mhr = d, bhr = _, SA = ar, EA = O, whr = U, wg = I, Bb = G, Shr = et, Ehr = $A.i2c, Wn = SA("btoa"), jb = EA("".charAt), Thr = EA("".charCodeAt), hi = !!Wn && !wg(function() {
  return Wn("hi") !== "aGk=";
}), xhr = hi && !wg(function() {
  Wn();
}), Ihr = hi && wg(function() {
  return Wn(null) !== "bnVsbA==";
}), Ohr = hi && Wn.length !== 1;
mhr({ global: !0, bind: !0, enumerable: !0, forced: !hi || xhr || Ihr || Ohr }, {
  btoa: function(t) {
    if (Shr(arguments.length, 1), hi)
      return whr(Wn, bhr, Bb(t));
    for (var e = Bb(t), n = "", a = 0, i = Ehr, o, s; jb(e, a) || (i = "=", a % 1); ) {
      if (s = Thr(e, a += 3 / 4), s > 255)
        throw new (SA("DOMException"))("The string contains characters outside of the Latin1 range", "InvalidCharacterError");
      o = o << 8 | s, n += jb(i, 63 & o >> 8 - a % 1 * 8);
    }
    return n;
  }
});
var TA = {
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
}, Ahr = lu, ef = Ahr("span").classList, Ub = ef && ef.constructor && ef.constructor.prototype, xA = Ub === Object.prototype ? void 0 : Ub, zb = _, Vb = TA, Rhr = xA, nf = oT, _hr = Tr, IA = function(r) {
  if (r && r.forEach !== nf)
    try {
      _hr(r, "forEach", nf);
    } catch {
      r.forEach = nf;
    }
};
for (var af in Vb)
  Vb[af] && IA(zb[af] && zb[af].prototype);
IA(Rhr);
var Gb = _, OA = TA, Chr = xA, Ua = pT, Hb = Tr, Phr = Fr, Mhr = W, of = Mhr("iterator"), sf = Ua.values, AA = function(r, t) {
  if (r) {
    if (r[of] !== sf)
      try {
        Hb(r, of, sf);
      } catch {
        r[of] = sf;
      }
    if (Phr(r, t, !0), OA[t]) {
      for (var e in Ua)
        if (r[e] !== Ua[e])
          try {
            Hb(r, e, Ua[e]);
          } catch {
            r[e] = Ua[e];
          }
    }
  }
};
for (var uf in OA)
  AA(Gb[uf] && Gb[uf].prototype, uf);
AA(Chr, "DOMTokenList");
var RA = {
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
}, Nhr = d, qs = ar, Dhr = YT, Sg = I, Lhr = zr, Eg = Qr, Ys = ur.f, Fhr = lr, us = hr, ls = K, khr = dt, Bhr = k, _A = ZE, Wb = Pi, Nn = RA, jhr = Wh, CA = vr, Tg = j, qn = "DOMException", uh = "DATA_CLONE_ERR", nl = qs("Error"), Wt = qs(qn) || function() {
  try {
    var r = qs("MessageChannel") || Dhr("worker_threads").MessageChannel;
    new r().port1.postMessage(/* @__PURE__ */ new WeakMap());
  } catch (t) {
    if (t.name === uh && t.code === 25)
      return t.constructor;
  }
}(), Uhr = Wt && Wt.prototype, PA = nl.prototype, zhr = CA.set, Vhr = CA.getterFor(qn), Ghr = "stack" in new nl(qn), MA = function(r) {
  return ls(Nn, r) && Nn[r].m ? Nn[r].c : 0;
}, xg = function() {
  khr(this, Xa);
  var t = arguments.length, e = Wb(t < 1 ? void 0 : arguments[0]), n = Wb(t < 2 ? void 0 : arguments[1], "Error"), a = MA(n);
  if (zhr(this, {
    type: qn,
    name: n,
    message: e,
    code: a
  }), Tg || (this.name = n, this.message = e, this.code = a), Ghr) {
    var i = new nl(e);
    i.name = qn, Ys(this, "stack", Eg(1, jhr(i.stack, 1)));
  }
}, Xa = xg.prototype = Lhr(PA), NA = function(r) {
  return { enumerable: !0, configurable: !0, get: r };
}, lf = function(r) {
  return NA(function() {
    return Vhr(this)[r];
  });
};
Tg && (us(Xa, "code", lf("code")), us(Xa, "message", lf("message")), us(Xa, "name", lf("name")));
Ys(Xa, "constructor", Eg(1, xg));
var al = Sg(function() {
  return !(new Wt() instanceof nl);
}), Hhr = al || Sg(function() {
  return PA.toString !== _A || String(new Wt(1, 2)) !== "2: 1";
}), Whr = al || Sg(function() {
  return new Wt(1, "DataCloneError").code !== 25;
});
al || Wt[uh] !== 25 || Uhr[uh];
var qb = al;
Nhr({ global: !0, constructor: !0, forced: qb }, {
  DOMException: qb ? xg : Wt
});
var di = qs(qn), Ks = di.prototype;
Hhr && Wt === di && Fhr(Ks, "toString", _A);
Whr && Tg && Wt === di && us(Ks, "code", NA(function() {
  return MA(Bhr(this).name);
}));
for (var Yb in Nn)
  if (ls(Nn, Yb)) {
    var Kb = Nn[Yb], Uo = Kb.s, Xb = Eg(6, Kb.c);
    ls(di, Uo) || Ys(di, Uo, Xb), ls(Ks, Uo) || Ys(Ks, Uo, Xb);
  }
var qhr = d, Yhr = _, Ig = ar, lh = Qr, ch = ur.f, Jb = K, Khr = dt, Xhr = We, Zb = Pi, cf = RA, Jhr = Wh, Zhr = j, qi = "DOMException", DA = Ig("Error"), Yi = Ig(qi), Og = function() {
  Khr(this, Qhr);
  var t = arguments.length, e = Zb(t < 1 ? void 0 : arguments[0]), n = Zb(t < 2 ? void 0 : arguments[1], "Error"), a = new Yi(e, n), i = new DA(e);
  return i.name = qi, ch(a, "stack", lh(1, Jhr(i.stack, 1))), Xhr(a, this, Og), a;
}, Qhr = Og.prototype = Yi.prototype, rdr = "stack" in new DA(qi), tdr = "stack" in new Yi(1, 2), ff = Yi && Zhr && Object.getOwnPropertyDescriptor(Yhr, qi), edr = !!ff && !(ff.writable && ff.configurable), Qb = rdr && !edr && !tdr;
qhr({ global: !0, constructor: !0, forced: Qb }, {
  // TODO: fix export logic
  DOMException: Qb ? Og : Yi
});
var za = Ig(qi), rw = za.prototype;
if (rw.constructor !== za) {
  ch(rw, "constructor", lh(1, za));
  for (var tw in cf)
    if (Jb(cf, tw)) {
      var ew = cf[tw], nw = ew.s;
      Jb(za, nw) || ch(za, nw, lh(6, ew.c));
    }
}
var ndr = ar, adr = Fr, aw = "DOMException";
adr(ndr(aw), aw);
var idr = d, odr = _, iw = Vu.clear;
idr({ global: !0, bind: !0, enumerable: !0, forced: odr.clearImmediate !== iw }, {
  clearImmediate: iw
});
var LA = _, sdr = tt, udr = Y, ldr = Tu, cdr = Rt, fdr = rt, vdr = et, hdr = LA.Function, ddr = /MSIE .\./.test(cdr) || ldr === "BUN" && function() {
  var r = LA.Bun.version.split(".");
  return r.length < 3 || r[0] === "0" && (r[1] < 3 || r[1] === "3" && r[2] === "0");
}(), Ag = function(r, t) {
  var e = t ? 2 : 1;
  return ddr ? function(n, a) {
    var i = vdr(arguments.length, 1) > e, o = udr(n) ? n : hdr(n), s = i ? fdr(arguments, e) : [], u = i ? function() {
      sdr(o, this, s);
    } : o;
    return t ? r(u, a) : r(u);
  } : r;
}, gdr = d, FA = _, ow = Vu.set, pdr = Ag, sw = FA.setImmediate ? pdr(ow, !1) : ow;
gdr({ global: !0, bind: !0, enumerable: !0, forced: FA.setImmediate !== sw }, {
  setImmediate: sw
});
var $dr = d, ydr = _, mdr = fI, bdr = J, wdr = et, Sdr = I, Edr = j, Tdr = Sdr(function() {
  return Edr && Object.getOwnPropertyDescriptor(ydr, "queueMicrotask").value.length !== 1;
});
$dr({ global: !0, enumerable: !0, dontCallGetSet: !0, forced: Tdr }, {
  queueMicrotask: function(t) {
    wdr(arguments.length, 1), mdr(bdr(t));
  }
});
var xdr = d, ie = _, Idr = hr, Odr = j, Adr = TypeError, Rdr = Object.defineProperty, uw = ie.self !== ie;
try {
  if (Odr) {
    var vf = Object.getOwnPropertyDescriptor(ie, "self");
    (uw || !vf || !vf.get || !vf.enumerable) && Idr(ie, "self", {
      get: function() {
        return ie;
      },
      set: function(t) {
        if (this !== ie)
          throw new Adr("Illegal invocation");
        Rdr(ie, "self", {
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
    xdr({ global: !0, simple: !0, forced: uw }, {
      self: ie
    });
} catch {
}
var _dr = d, mr = _, Ja = ar, Ki = O, Rg = I, Cdr = ra, Yn = Y, Pdr = ea, Mdr = Nr, il = H, Ndr = Ve, Ddr = pr, kA = k, Xs = vt, Ldr = K, Fdr = Xt, hf = Tr, cs = ir, kdr = et, Bdr = ji, ol = _x, _g = gt, jdr = da, lw = KT, Udr = qE, Cg = pd, Va = mr.Object, zdr = mr.Array, BA = mr.Date, jA = mr.Error, Vdr = mr.TypeError, Gdr = mr.PerformanceMark, Ue = Ja("DOMException"), fh = ol.Map, Pg = ol.has, UA = ol.get, Js = ol.set, zA = _g.Set, VA = _g.add, Hdr = _g.has, Wdr = Ja("Object", "keys"), qdr = Ki([].push), Ydr = Ki((!0).valueOf), Kdr = Ki(1 .valueOf), Xdr = Ki("".valueOf), Jdr = Ki(BA.prototype.getTime), vh = Cdr("structuredClone"), gi = "DataCloneError", fs = "Transferring", GA = function(r) {
  return !Rg(function() {
    var t = new mr.Set([7]), e = r(t), n = r(Va(7));
    return e === t || !e.has(7) || !il(n) || +n != 7;
  }) && r;
}, cw = function(r, t) {
  return !Rg(function() {
    var e = new t(), n = r({ a: e, b: e });
    return !(n && n.a === n.b && n.a instanceof t && n.a.stack === e.stack);
  });
}, Zdr = function(r) {
  return !Rg(function() {
    var t = r(new mr.AggregateError([1], vh, { cause: 3 }));
    return t.name !== "AggregateError" || t.errors[0] !== 1 || t.message !== vh || t.cause !== 3;
  });
}, Dn = mr.structuredClone, Qdr = !cw(Dn, jA) || !cw(Dn, Ue) || !Zdr(Dn), rgr = !Dn && GA(function(r) {
  return new Gdr(vh, { detail: r }).detail;
}), jt = GA(Dn) || rgr, df = function(r) {
  throw new Ue("Uncloneable type: " + r, gi);
}, _r = function(r, t) {
  throw new Ue((t || "Cloning") + " of " + r + " cannot be properly polyfilled in this engine", gi);
}, gf = function(r, t) {
  return jt || _r(t), jt(r);
}, tgr = function() {
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
}, HA = function(r, t, e) {
  if (Pg(t, r))
    return UA(t, r);
  var n = e || Xs(r), a, i, o, s, u, l;
  if (n === "SharedArrayBuffer")
    jt ? a = jt(r) : a = r;
  else {
    var c = mr.DataView;
    !c && !Yn(r.slice) && _r("ArrayBuffer");
    try {
      if (Yn(r.slice) && !r.resizable)
        a = r.slice(0);
      else
        for (i = r.byteLength, o = ("maxByteLength" in r) ? { maxByteLength: r.maxByteLength } : void 0, a = new ArrayBuffer(i, o), s = new c(r), u = new c(a), l = 0; l < i; l++)
          u.setUint8(l, s.getUint8(l));
    } catch {
      throw new Ue("ArrayBuffer is detached", gi);
    }
  }
  return Js(t, r, a), a;
}, egr = function(r, t, e, n, a) {
  var i = mr[t];
  return il(i) || _r(t), new i(HA(r.buffer, a), e, n);
}, $r = function(r, t) {
  if (Ndr(r) && df("Symbol"), !il(r))
    return r;
  if (t) {
    if (Pg(t, r))
      return UA(t, r);
  } else
    t = new fh();
  var e = Xs(r), n, a, i, o, s, u, l, c;
  switch (e) {
    case "Array":
      i = zdr(cs(r));
      break;
    case "Object":
      i = {};
      break;
    case "Map":
      i = new fh();
      break;
    case "Set":
      i = new zA();
      break;
    case "RegExp":
      i = new RegExp(r.source, Bdr(r));
      break;
    case "Error":
      switch (a = r.name, a) {
        case "AggregateError":
          i = new (Ja(a))([]);
          break;
        case "EvalError":
        case "RangeError":
        case "ReferenceError":
        case "SuppressedError":
        case "SyntaxError":
        case "TypeError":
        case "URIError":
          i = new (Ja(a))();
          break;
        case "CompileError":
        case "LinkError":
        case "RuntimeError":
          i = new (Ja("WebAssembly", a))();
          break;
        default:
          i = new jA();
      }
      break;
    case "DOMException":
      i = new Ue(r.message, r.name);
      break;
    case "ArrayBuffer":
    case "SharedArrayBuffer":
      i = HA(r, t, e);
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
      u = e === "DataView" ? r.byteLength : r.length, i = egr(r, e, r.byteOffset, u, t);
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
        i = gf(r, e);
      }
      break;
    case "File":
      if (jt)
        try {
          i = jt(r), Xs(i) !== e && (i = void 0);
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
      if (o = tgr(), o) {
        for (s = 0, u = cs(r); s < u; s++)
          o.items.add($r(r[s], t));
        i = o.files;
      } else
        i = gf(r, e);
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
        i = gf(r, e);
      }
      break;
    default:
      if (jt)
        i = jt(r);
      else
        switch (e) {
          case "BigInt":
            i = Va(r.valueOf());
            break;
          case "Boolean":
            i = Va(Ydr(r));
            break;
          case "Number":
            i = Va(Kdr(r));
            break;
          case "String":
            i = Va(Xdr(r));
            break;
          case "Date":
            i = new BA(Jdr(r));
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
            Yn(r.clone) || _r(e);
            try {
              i = r.clone();
            } catch {
              df(e);
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
            df(e);
        }
  }
  switch (Js(t, r, i), e) {
    case "Array":
    case "Object":
      for (l = Wdr(r), s = 0, u = cs(l); s < u; s++)
        c = l[s], Fdr(i, c, $r(r[c], t));
      break;
    case "Map":
      r.forEach(function(f, v) {
        Js(i, $r(v, t), $r(f, t));
      });
      break;
    case "Set":
      r.forEach(function(f) {
        VA(i, $r(f, t));
      });
      break;
    case "Error":
      hf(i, "message", $r(r.message, t)), Ldr(r, "cause") && hf(i, "cause", $r(r.cause, t)), a === "AggregateError" ? i.errors = $r(r.errors, t) : a === "SuppressedError" && (i.error = $r(r.error, t), i.suppressed = $r(r.suppressed, t));
    case "DOMException":
      Udr && hf(i, "stack", $r(r.stack, t));
  }
  return i;
}, ngr = function(r, t) {
  if (!il(r))
    throw new Vdr("Transfer option cannot be converted to a sequence");
  var e = [];
  Ddr(r, function(v) {
    qdr(e, kA(v));
  });
  for (var n = 0, a = cs(e), i = new zA(), o, s, u, l, c, f; n < a; ) {
    if (o = e[n++], s = Xs(o), s === "ArrayBuffer" ? Hdr(i, o) : Pg(t, o))
      throw new Ue("Duplicate transferable", gi);
    if (s === "ArrayBuffer") {
      VA(i, o);
      continue;
    }
    if (Cg)
      l = Dn(o, { transfer: [o] });
    else
      switch (s) {
        case "ImageBitmap":
          u = mr.OffscreenCanvas, Pdr(u) || _r(s, fs);
          try {
            c = new u(o.width, o.height), f = c.getContext("bitmaprenderer"), f.transferFromImageBitmap(o), l = c.transferToImageBitmap();
          } catch {
          }
          break;
        case "AudioData":
        case "VideoFrame":
          (!Yn(o.clone) || !Yn(o.close)) && _r(s, fs);
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
          _r(s, fs);
      }
    if (l === void 0)
      throw new Ue("This object cannot be transferred: " + s, gi);
    Js(t, o, l);
  }
  return i;
}, agr = function(r) {
  jdr(r, function(t) {
    Cg ? jt(t, { transfer: [t] }) : Yn(t.transfer) ? t.transfer() : lw ? lw(t) : _r("ArrayBuffer", fs);
  });
};
_dr({ global: !0, enumerable: !0, sham: !Cg, forced: Qdr }, {
  structuredClone: function(t) {
    var e = kdr(arguments.length, 1) > 1 && !Mdr(arguments[1]) ? kA(arguments[1]) : void 0, n = e ? e.transfer : void 0, a, i;
    n !== void 0 && (a = new fh(), i = ngr(n, a));
    var o = $r(t, a);
    return i && agr(i), o;
  }
});
var igr = d, WA = _, ogr = Ag, fw = ogr(WA.setInterval, !0);
igr({ global: !0, bind: !0, forced: WA.setInterval !== fw }, {
  setInterval: fw
});
var sgr = d, qA = _, ugr = Ag, vw = ugr(qA.setTimeout, !0);
sgr({ global: !0, bind: !0, forced: qA.setTimeout !== vw }, {
  setTimeout: vw
});
var lgr = I, cgr = W, fgr = j, hw = Yt, vgr = cgr("iterator"), sl = !lgr(function() {
  var r = new URL("b?a=1&b=2&c=3", "https://a"), t = r.searchParams, e = new URLSearchParams("a=1&a=2&b=3"), n = "";
  return r.pathname = "c%20d", t.forEach(function(a, i) {
    t.delete("b"), n += i + a;
  }), e.delete("a", 2), e.delete("b", void 0), hw && (!r.toJSON || !e.has("a", 1) || e.has("a", 2) || !e.has("a", void 0) || e.has("b")) || !t.size && (hw || !fgr) || !t.sort || r.href !== "https://a/c%20d?a=1&c=3" || t.get("c") !== "3" || String(new URLSearchParams("?a=1")) !== "a=1" || !t[vgr] || new URL("https://a@b").username !== "a" || new URLSearchParams(new URLSearchParams("a=b")).get("a") !== "b" || new URL("https://тест").host !== "xn--e1aybc" || new URL("https://a#б").hash !== "#%D0%B1" || n !== "a1c3" || new URL("https://x", void 0).host !== "x";
}), rn = O, pf = 2147483647, Za = 36, YA = 1, hh = 26, hgr = 38, dgr = 700, ggr = 72, pgr = 128, $gr = "-", ygr = /[^\0-\u007E]/, KA = /[.\u3002\uFF0E\uFF61]/g, dw = "Overflow: input needs wider integers to process", $f = Za - YA, gw = RangeError, mgr = rn(KA.exec), Tn = Math.floor, yf = String.fromCharCode, pw = rn("".charCodeAt), XA = rn([].join), ue = rn([].push), bgr = rn("".replace), wgr = rn("".split), Sgr = rn("".toLowerCase), Egr = function(r) {
  for (var t = [], e = 0, n = r.length; e < n; ) {
    var a = pw(r, e++);
    if (a >= 55296 && a <= 56319 && e < n) {
      var i = pw(r, e++);
      (i & 64512) === 56320 ? ue(t, ((a & 1023) << 10) + (i & 1023) + 65536) : (ue(t, a), e--);
    } else
      ue(t, a);
  }
  return t;
}, $w = function(r) {
  return r + 22 + 75 * (r < 26);
}, Tgr = function(r, t, e) {
  var n = 0;
  for (r = e ? Tn(r / dgr) : r >> 1, r += Tn(r / t); r > $f * hh >> 1; )
    r = Tn(r / $f), n += Za;
  return Tn(n + ($f + 1) * r / (r + hgr));
}, xgr = function(r) {
  var t = [];
  r = Egr(r);
  var e = r.length, n = pgr, a = 0, i = ggr, o, s;
  for (o = 0; o < r.length; o++)
    s = r[o], s < 128 && ue(t, yf(s));
  var u = t.length, l = u;
  for (u && ue(t, $gr); l < e; ) {
    var c = pf;
    for (o = 0; o < r.length; o++)
      s = r[o], s >= n && s < c && (c = s);
    var f = l + 1;
    if (c - n > Tn((pf - a) / f))
      throw new gw(dw);
    for (a += (c - n) * f, n = c, o = 0; o < r.length; o++) {
      if (s = r[o], s < n && ++a > pf)
        throw new gw(dw);
      if (s === n) {
        for (var v = a, h = Za; ; ) {
          var g = h <= i ? YA : h >= i + hh ? hh : h - i;
          if (v < g)
            break;
          var $ = v - g, p = Za - g;
          ue(t, yf($w(g + $ % p))), v = Tn($ / p), h += Za;
        }
        ue(t, yf($w(v))), i = Tgr(a, f, l === u), a = 0, l++;
      }
    }
    a++, n++;
  }
  return XA(t, "");
}, Igr = function(r) {
  var t = [], e = wgr(bgr(Sgr(r), KA, "."), "."), n, a;
  for (n = 0; n < e.length; n++)
    a = e[n], ue(t, mgr(ygr, a) ? "xn--" + xgr(a) : a);
  return XA(t, ".");
}, dh = d, JA = _, Mg = uI, Ogr = ar, zo = U, ct = O, Qa = j, ZA = sl, QA = lr, Agr = hr, Rgr = ua, _gr = Fr, Cgr = Qh, Ng = vr, rR = dt, mf = Y, Pgr = K, Mgr = ht, Ngr = vt, Dgr = k, tR = H, Ir = G, Lgr = zr, yw = Qr, mw = mu, Fgr = na, Vo = ia, ln = et, kgr = W, Bgr = nd, jgr = kgr("iterator"), pa = "URLSearchParams", eR = pa + "Iterator", nR = Ng.set, Xr = Ng.getterFor(pa), Ugr = Ng.getterFor(eR), bw = Mg("fetch"), Zs = Mg("Request"), ri = Mg("Headers"), bf = Zs && Zs.prototype, ww = ri && ri.prototype, zgr = JA.TypeError, Vgr = JA.encodeURIComponent, Ggr = String.fromCharCode, Hgr = Ogr("String", "fromCodePoint"), Wgr = parseInt, vs = ct("".charAt), Sw = ct([].join), le = ct([].push), aR = ct("".replace), qgr = ct([].shift), Ew = ct([].splice), Tw = ct("".split), iR = ct("".slice), Ygr = ct(/./.exec), Kgr = /\+/g, wf = "�", Xgr = /^[0-9a-f]+$/i, xw = function(r, t) {
  var e = iR(r, t, t + 2);
  return Ygr(Xgr, e) ? Wgr(e, 16) : NaN;
}, Jgr = function(r) {
  for (var t = 0, e = 128; e > 0 && r & e; e >>= 1)
    t++;
  return t;
}, Zgr = function(r) {
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
}, Iw = function(r) {
  r = aR(r, Kgr, " ");
  for (var t = r.length, e = "", n = 0; n < t; ) {
    var a = vs(r, n);
    if (a === "%") {
      if (vs(r, n + 1) === "%" || n + 3 > t) {
        e += "%", n++;
        continue;
      }
      var i = xw(r, n + 1);
      if (i !== i) {
        e += a, n++;
        continue;
      }
      n += 2;
      var o = Jgr(i);
      if (o === 0)
        a = Ggr(i);
      else {
        if (o === 1 || o > 4) {
          e += wf, n++;
          continue;
        }
        for (var s = [i], u = 1; u < o && (n++, !(n + 3 > t || vs(r, n) !== "%")); ) {
          var l = xw(r, n + 1);
          if (l !== l) {
            n += 3;
            break;
          }
          if (l > 191 || l < 128)
            break;
          le(s, l), n += 2, u++;
        }
        if (s.length !== o) {
          e += wf;
          continue;
        }
        var c = Zgr(s);
        c === null ? e += wf : a = Hgr(c);
      }
    }
    e += a, n++;
  }
  return e;
}, Qgr = /[!'()~]|%20/g, rpr = {
  "!": "%21",
  "'": "%27",
  "(": "%28",
  ")": "%29",
  "~": "%7E",
  "%20": "+"
}, tpr = function(r) {
  return rpr[r];
}, Ow = function(r) {
  return aR(Vgr(r), Qgr, tpr);
}, Sf = Cgr(function(t, e) {
  nR(this, {
    type: eR,
    target: Xr(t).entries,
    index: 0,
    kind: e
  });
}, pa, function() {
  var t = Ugr(this), e = t.target, n = t.index++;
  if (!e || n >= e.length)
    return t.target = null, Vo(void 0, !0);
  var a = e[n];
  switch (t.kind) {
    case "keys":
      return Vo(a.key, !1);
    case "values":
      return Vo(a.value, !1);
  }
  return Vo([a.key, a.value], !1);
}, !0), oR = function(r) {
  this.entries = [], this.url = null, r !== void 0 && (tR(r) ? this.parseObject(r) : this.parseQuery(typeof r == "string" ? vs(r, 0) === "?" ? iR(r, 1) : r : Ir(r)));
};
oR.prototype = {
  type: pa,
  bindURL: function(r) {
    this.url = r, this.update();
  },
  parseObject: function(r) {
    var t = this.entries, e = Fgr(r), n, a, i, o, s, u, l;
    if (e)
      for (n = mw(r, e), a = n.next; !(i = zo(a, n)).done; ) {
        if (o = mw(Dgr(i.value)), s = o.next, (u = zo(s, o)).done || (l = zo(s, o)).done || !zo(s, o).done)
          throw new zgr("Expected sequence with length 2");
        le(t, { key: Ir(u.value), value: Ir(l.value) });
      }
    else
      for (var c in r)
        Pgr(r, c) && le(t, { key: c, value: Ir(r[c]) });
  },
  parseQuery: function(r) {
    if (r)
      for (var t = this.entries, e = Tw(r, "&"), n = 0, a, i; n < e.length; )
        a = e[n++], a.length && (i = Tw(a, "="), le(t, {
          key: Iw(qgr(i)),
          value: Iw(Sw(i, "="))
        }));
  },
  serialize: function() {
    for (var r = this.entries, t = [], e = 0, n; e < r.length; )
      n = r[e++], le(t, Ow(n.key) + "=" + Ow(n.value));
    return Sw(t, "&");
  },
  update: function() {
    this.entries.length = 0, this.parseQuery(this.url.query);
  },
  updateURL: function() {
    this.url && this.url.update();
  }
};
var ul = function() {
  rR(this, Kn);
  var t = arguments.length > 0 ? arguments[0] : void 0, e = nR(this, new oR(t));
  Qa || (this.size = e.entries.length);
}, Kn = ul.prototype;
Rgr(Kn, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function(t, e) {
    var n = Xr(this);
    ln(arguments.length, 2), le(n.entries, { key: Ir(t), value: Ir(e) }), Qa || this.length++, n.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  delete: function(r) {
    for (var t = Xr(this), e = ln(arguments.length, 1), n = t.entries, a = Ir(r), i = e < 2 ? void 0 : arguments[1], o = i === void 0 ? i : Ir(i), s = 0; s < n.length; ) {
      var u = n[s];
      if (u.key === a && (o === void 0 || u.value === o)) {
        if (Ew(n, s, 1), o !== void 0)
          break;
      } else
        s++;
    }
    Qa || (this.size = n.length), t.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function(t) {
    var e = Xr(this).entries;
    ln(arguments.length, 1);
    for (var n = Ir(t), a = 0; a < e.length; a++)
      if (e[a].key === n)
        return e[a].value;
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function(t) {
    var e = Xr(this).entries;
    ln(arguments.length, 1);
    for (var n = Ir(t), a = [], i = 0; i < e.length; i++)
      e[i].key === n && le(a, e[i].value);
    return a;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function(t) {
    for (var e = Xr(this).entries, n = ln(arguments.length, 1), a = Ir(t), i = n < 2 ? void 0 : arguments[1], o = i === void 0 ? i : Ir(i), s = 0; s < e.length; ) {
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
    ln(arguments.length, 1);
    for (var a = n.entries, i = !1, o = Ir(t), s = Ir(e), u = 0, l; u < a.length; u++)
      l = a[u], l.key === o && (i ? Ew(a, u--, 1) : (i = !0, l.value = s));
    i || le(a, { key: o, value: s }), Qa || (this.size = a.length), n.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function() {
    var t = Xr(this);
    Bgr(t.entries, function(e, n) {
      return e.key > n.key ? 1 : -1;
    }), t.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function(t) {
    for (var e = Xr(this).entries, n = Mgr(t, arguments.length > 1 ? arguments[1] : void 0), a = 0, i; a < e.length; )
      i = e[a++], n(i.value, i.key, this);
  },
  // `URLSearchParams.prototype.keys` method
  keys: function() {
    return new Sf(this, "keys");
  },
  // `URLSearchParams.prototype.values` method
  values: function() {
    return new Sf(this, "values");
  },
  // `URLSearchParams.prototype.entries` method
  entries: function() {
    return new Sf(this, "entries");
  }
}, { enumerable: !0 });
QA(Kn, jgr, Kn.entries, { name: "entries" });
QA(Kn, "toString", function() {
  return Xr(this).serialize();
}, { enumerable: !0 });
Qa && Agr(Kn, "size", {
  get: function() {
    return Xr(this).entries.length;
  },
  configurable: !0,
  enumerable: !0
});
_gr(ul, pa);
dh({ global: !0, constructor: !0, forced: !ZA }, {
  URLSearchParams: ul
});
if (!ZA && mf(ri)) {
  var epr = ct(ww.has), npr = ct(ww.set), Aw = function(r) {
    if (tR(r)) {
      var t = r.body, e;
      if (Ngr(t) === pa)
        return e = r.headers ? new ri(r.headers) : new ri(), epr(e, "content-type") || npr(e, "content-type", "application/x-www-form-urlencoded;charset=UTF-8"), Lgr(r, {
          body: yw(0, Ir(t)),
          headers: yw(0, e)
        });
    }
    return r;
  };
  if (mf(bw) && dh({ global: !0, enumerable: !0, dontCallGetSet: !0, forced: !0 }, {
    fetch: function(t) {
      return bw(t, arguments.length > 1 ? Aw(arguments[1]) : {});
    }
  }), mf(Zs)) {
    var Ef = function(t) {
      return rR(this, bf), new Zs(t, arguments.length > 1 ? Aw(arguments[1]) : {});
    };
    bf.constructor = Ef, Ef.prototype = bf, dh({ global: !0, constructor: !0, dontCallGetSet: !0, forced: !0 }, {
      Request: Ef
    });
  }
}
var apr = {
  URLSearchParams: ul,
  getState: Xr
}, ipr = d, Dg = j, opr = sl, Lg = _, Rw = ht, nt = O, Qs = lr, qr = hr, spr = dt, gh = K, Fg = Yx, cn = sT, at = rt, upr = Ku.codeAt, lpr = Igr, Dt = G, cpr = Fr, fpr = et, sR = apr, uR = vr, vpr = uR.set, ru = uR.getterFor("URL"), hpr = sR.URLSearchParams, dpr = sR.getState, Da = Lg.URL, ph = Lg.TypeError, tu = Lg.parseInt, gpr = Math.floor, _w = Math.pow, Jr = nt("".charAt), ut = nt(/./.exec), Ga = nt([].join), ppr = nt(1 .toString), $pr = nt([].pop), pn = nt([].push), Tf = nt("".replace), ypr = nt([].shift), mpr = nt("".split), ti = nt("".slice), eu = nt("".toLowerCase), bpr = nt([].unshift), wpr = "Invalid authority", xf = "Invalid scheme", Ae = "Invalid host", Cw = "Invalid port", lR = /[a-z]/i, Spr = /[\d+-.a-z]/i, $h = /\d/, Epr = /^0x/i, Tpr = /^[0-7]+$/, xpr = /^\d+$/, cR = /^[\da-f]+$/i, Ipr = /[\0\t\n\r #%/:<>?@[\\\]^|]/, Opr = /[\0\t\n\r #/:<>?@[\\\]^|]/, Apr = /^[\u0000-\u0020]+/, Rpr = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/, _pr = /[\t\n\r]/g, Yr, Cpr = function(r) {
  var t = mpr(r, "."), e, n, a, i, o, s, u;
  if (t.length && t[t.length - 1] === "" && t.length--, e = t.length, e > 4)
    return r;
  for (n = [], a = 0; a < e; a++) {
    if (i = t[a], i === "")
      return r;
    if (o = 10, i.length > 1 && Jr(i, 0) === "0" && (o = ut(Epr, i) ? 16 : 8, i = ti(i, o === 8 ? 1 : 2)), i === "")
      s = 0;
    else {
      if (!ut(o === 10 ? xpr : o === 8 ? Tpr : cR, i))
        return r;
      s = tu(i, o);
    }
    pn(n, s);
  }
  for (a = 0; a < e; a++)
    if (s = n[a], a === e - 1) {
      if (s >= _w(256, 5 - e))
        return null;
    } else if (s > 255)
      return null;
  for (u = $pr(n), a = 0; a < n.length; a++)
    u += n[a] * _w(256, 3 - a);
  return u;
}, Ppr = function(r) {
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
    for (i = o = 0; o < 4 && ut(cR, v()); )
      i = i * 16 + tu(v(), 16), a++, o++;
    if (v() === ".") {
      if (o === 0 || (a -= o, e > 6))
        return;
      for (s = 0; v(); ) {
        if (u = null, s > 0)
          if (v() === "." && s < 4)
            a++;
          else
            return;
        if (!ut($h, v()))
          return;
        for (; ut($h, v()); ) {
          if (l = tu(v(), 10), u === null)
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
}, Mpr = function(r) {
  for (var t = null, e = 1, n = null, a = 0, i = 0; i < 8; i++)
    r[i] !== 0 ? (a > e && (t = n, e = a), n = null, a = 0) : (n === null && (n = i), ++a);
  return a > e ? n : t;
}, La = function(r) {
  var t, e, n, a;
  if (typeof r == "number") {
    for (t = [], e = 0; e < 4; e++)
      bpr(t, r % 256), r = gpr(r / 256);
    return Ga(t, ".");
  }
  if (typeof r == "object") {
    for (t = "", n = Mpr(r), e = 0; e < 8; e++)
      a && r[e] === 0 || (a && (a = !1), n === e ? (t += e ? ":" : "::", a = !0) : (t += ppr(r[e], 16), e < 7 && (t += ":")));
    return "[" + t + "]";
  }
  return r;
}, hs = {}, fR = Fg({}, hs, {
  " ": 1,
  '"': 1,
  "<": 1,
  ">": 1,
  "`": 1
}), vR = Fg({}, fR, {
  "#": 1,
  "?": 1,
  "{": 1,
  "}": 1
}), If = Fg({}, vR, {
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
}), ae = function(r, t) {
  var e = upr(r, 0);
  return e > 32 && e < 127 && !gh(t, r) ? r : encodeURIComponent(r);
}, Go = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
}, Ha = function(r, t) {
  var e;
  return r.length === 2 && ut(lR, Jr(r, 0)) && ((e = Jr(r, 1)) === ":" || !t && e === "|");
}, Pw = function(r) {
  var t;
  return r.length > 1 && Ha(ti(r, 0, 2)) && (r.length === 2 || (t = Jr(r, 2)) === "/" || t === "\\" || t === "?" || t === "#");
}, Npr = function(r) {
  return r === "." || eu(r) === "%2e";
}, Dpr = function(r) {
  return r = eu(r), r === ".." || r === "%2e." || r === ".%2e" || r === "%2e%2e";
}, Of = {}, Mw = {}, Af = {}, Nw = {}, Dw = {}, Rf = {}, Lw = {}, Fw = {}, Ho = {}, Wo = {}, _f = {}, Cf = {}, Pf = {}, Mf = {}, kw = {}, Nf = {}, fn = {}, mt = {}, Bw = {}, Re = {}, Nt = {}, kg = function(r, t, e) {
  var n = Dt(r), a, i, o;
  if (t) {
    if (i = this.parse(n), i)
      throw new ph(i);
    this.searchParams = null;
  } else {
    if (e !== void 0 && (a = new kg(e, !0)), i = this.parse(n, null, a), i)
      throw new ph(i);
    o = dpr(new hpr()), o.bindURL(this), this.searchParams = o;
  }
};
kg.prototype = {
  type: "URL",
  // https://url.spec.whatwg.org/#url-parsing
  // eslint-disable-next-line max-statements -- TODO
  parse: function(r, t, e) {
    var n = this, a = t || Of, i = 0, o = "", s = !1, u = !1, l = !1, c, f, v, h;
    for (r = Dt(r), t || (n.scheme = "", n.username = "", n.password = "", n.host = null, n.port = null, n.path = [], n.query = null, n.fragment = null, n.cannotBeABaseURL = !1, r = Tf(r, Apr, ""), r = Tf(r, Rpr, "$1")), r = Tf(r, _pr, ""), c = cn(r); i <= c.length; ) {
      switch (f = c[i], a) {
        case Of:
          if (f && ut(lR, f))
            o += eu(f), a = Mw;
          else {
            if (t)
              return xf;
            a = Af;
            continue;
          }
          break;
        case Mw:
          if (f && (ut(Spr, f) || f === "+" || f === "-" || f === "."))
            o += eu(f);
          else if (f === ":") {
            if (t && (n.isSpecial() !== gh(Go, o) || o === "file" && (n.includesCredentials() || n.port !== null) || n.scheme === "file" && !n.host))
              return;
            if (n.scheme = o, t) {
              n.isSpecial() && Go[n.scheme] === n.port && (n.port = null);
              return;
            }
            o = "", n.scheme === "file" ? a = Mf : n.isSpecial() && e && e.scheme === n.scheme ? a = Nw : n.isSpecial() ? a = Fw : c[i + 1] === "/" ? (a = Dw, i++) : (n.cannotBeABaseURL = !0, pn(n.path, ""), a = Bw);
          } else {
            if (t)
              return xf;
            o = "", a = Af, i = 0;
            continue;
          }
          break;
        case Af:
          if (!e || e.cannotBeABaseURL && f !== "#")
            return xf;
          if (e.cannotBeABaseURL && f === "#") {
            n.scheme = e.scheme, n.path = at(e.path), n.query = e.query, n.fragment = "", n.cannotBeABaseURL = !0, a = Nt;
            break;
          }
          a = e.scheme === "file" ? Mf : Rf;
          continue;
        case Nw:
          if (f === "/" && c[i + 1] === "/")
            a = Ho, i++;
          else {
            a = Rf;
            continue;
          }
          break;
        case Dw:
          if (f === "/") {
            a = Wo;
            break;
          } else {
            a = mt;
            continue;
          }
        case Rf:
          if (n.scheme = e.scheme, f === Yr)
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, n.path = at(e.path), n.query = e.query;
          else if (f === "/" || f === "\\" && n.isSpecial())
            a = Lw;
          else if (f === "?")
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, n.path = at(e.path), n.query = "", a = Re;
          else if (f === "#")
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, n.path = at(e.path), n.query = e.query, n.fragment = "", a = Nt;
          else {
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, n.path = at(e.path), n.path.length--, a = mt;
            continue;
          }
          break;
        case Lw:
          if (n.isSpecial() && (f === "/" || f === "\\"))
            a = Ho;
          else if (f === "/")
            a = Wo;
          else {
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, a = mt;
            continue;
          }
          break;
        case Fw:
          if (a = Ho, f !== "/" || Jr(o, i + 1) !== "/")
            continue;
          i++;
          break;
        case Ho:
          if (f !== "/" && f !== "\\") {
            a = Wo;
            continue;
          }
          break;
        case Wo:
          if (f === "@") {
            s && (o = "%40" + o), s = !0, v = cn(o);
            for (var g = 0; g < v.length; g++) {
              var $ = v[g];
              if ($ === ":" && !l) {
                l = !0;
                continue;
              }
              var p = ae($, If);
              l ? n.password += p : n.username += p;
            }
            o = "";
          } else if (f === Yr || f === "/" || f === "?" || f === "#" || f === "\\" && n.isSpecial()) {
            if (s && o === "")
              return wpr;
            i -= cn(o).length + 1, o = "", a = _f;
          } else
            o += f;
          break;
        case _f:
        case Cf:
          if (t && n.scheme === "file") {
            a = Nf;
            continue;
          } else if (f === ":" && !u) {
            if (o === "")
              return Ae;
            if (h = n.parseHost(o), h)
              return h;
            if (o = "", a = Pf, t === Cf)
              return;
          } else if (f === Yr || f === "/" || f === "?" || f === "#" || f === "\\" && n.isSpecial()) {
            if (n.isSpecial() && o === "")
              return Ae;
            if (t && o === "" && (n.includesCredentials() || n.port !== null))
              return;
            if (h = n.parseHost(o), h)
              return h;
            if (o = "", a = fn, t)
              return;
            continue;
          } else
            f === "[" ? u = !0 : f === "]" && (u = !1), o += f;
          break;
        case Pf:
          if (ut($h, f))
            o += f;
          else if (f === Yr || f === "/" || f === "?" || f === "#" || f === "\\" && n.isSpecial() || t) {
            if (o !== "") {
              var y = tu(o, 10);
              if (y > 65535)
                return Cw;
              n.port = n.isSpecial() && y === Go[n.scheme] ? null : y, o = "";
            }
            if (t)
              return;
            a = fn;
            continue;
          } else
            return Cw;
          break;
        case Mf:
          if (n.scheme = "file", f === "/" || f === "\\")
            a = kw;
          else if (e && e.scheme === "file")
            switch (f) {
              case Yr:
                n.host = e.host, n.path = at(e.path), n.query = e.query;
                break;
              case "?":
                n.host = e.host, n.path = at(e.path), n.query = "", a = Re;
                break;
              case "#":
                n.host = e.host, n.path = at(e.path), n.query = e.query, n.fragment = "", a = Nt;
                break;
              default:
                Pw(Ga(at(c, i), "")) || (n.host = e.host, n.path = at(e.path), n.shortenPath()), a = mt;
                continue;
            }
          else {
            a = mt;
            continue;
          }
          break;
        case kw:
          if (f === "/" || f === "\\") {
            a = Nf;
            break;
          }
          e && e.scheme === "file" && !Pw(Ga(at(c, i), "")) && (Ha(e.path[0], !0) ? pn(n.path, e.path[0]) : n.host = e.host), a = mt;
          continue;
        case Nf:
          if (f === Yr || f === "/" || f === "\\" || f === "?" || f === "#") {
            if (!t && Ha(o))
              a = mt;
            else if (o === "") {
              if (n.host = "", t)
                return;
              a = fn;
            } else {
              if (h = n.parseHost(o), h)
                return h;
              if (n.host === "localhost" && (n.host = ""), t)
                return;
              o = "", a = fn;
            }
            continue;
          } else
            o += f;
          break;
        case fn:
          if (n.isSpecial()) {
            if (a = mt, f !== "/" && f !== "\\")
              continue;
          } else if (!t && f === "?")
            n.query = "", a = Re;
          else if (!t && f === "#")
            n.fragment = "", a = Nt;
          else if (f !== Yr && (a = mt, f !== "/"))
            continue;
          break;
        case mt:
          if (f === Yr || f === "/" || f === "\\" && n.isSpecial() || !t && (f === "?" || f === "#")) {
            if (Dpr(o) ? (n.shortenPath(), f !== "/" && !(f === "\\" && n.isSpecial()) && pn(n.path, "")) : Npr(o) ? f !== "/" && !(f === "\\" && n.isSpecial()) && pn(n.path, "") : (n.scheme === "file" && !n.path.length && Ha(o) && (n.host && (n.host = ""), o = Jr(o, 0) + ":"), pn(n.path, o)), o = "", n.scheme === "file" && (f === Yr || f === "?" || f === "#"))
              for (; n.path.length > 1 && n.path[0] === ""; )
                ypr(n.path);
            f === "?" ? (n.query = "", a = Re) : f === "#" && (n.fragment = "", a = Nt);
          } else
            o += ae(f, vR);
          break;
        case Bw:
          f === "?" ? (n.query = "", a = Re) : f === "#" ? (n.fragment = "", a = Nt) : f !== Yr && (n.path[0] += ae(f, hs));
          break;
        case Re:
          !t && f === "#" ? (n.fragment = "", a = Nt) : f !== Yr && (f === "'" && n.isSpecial() ? n.query += "%27" : f === "#" ? n.query += "%23" : n.query += ae(f, hs));
          break;
        case Nt:
          f !== Yr && (n.fragment += ae(f, fR));
          break;
      }
      i++;
    }
  },
  // https://url.spec.whatwg.org/#host-parsing
  parseHost: function(r) {
    var t, e, n;
    if (Jr(r, 0) === "[") {
      if (Jr(r, r.length - 1) !== "]" || (t = Ppr(ti(r, 1, -1)), !t))
        return Ae;
      this.host = t;
    } else if (this.isSpecial()) {
      if (r = lpr(r), ut(Ipr, r) || (t = Cpr(r), t === null))
        return Ae;
      this.host = t;
    } else {
      if (ut(Opr, r))
        return Ae;
      for (t = "", e = cn(r), n = 0; n < e.length; n++)
        t += ae(e[n], hs);
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
    return gh(Go, this.scheme);
  },
  // https://url.spec.whatwg.org/#shorten-a-urls-path
  shortenPath: function() {
    var r = this.path, t = r.length;
    t && (this.scheme !== "file" || t !== 1 || !Ha(r[0], !0)) && r.length--;
  },
  // https://url.spec.whatwg.org/#concept-url-serializer
  serialize: function() {
    var r = this, t = r.scheme, e = r.username, n = r.password, a = r.host, i = r.port, o = r.path, s = r.query, u = r.fragment, l = t + ":";
    return a !== null ? (l += "//", r.includesCredentials() && (l += e + (n ? ":" + n : "") + "@"), l += La(a), i !== null && (l += ":" + i)) : t === "file" && (l += "//"), l += r.cannotBeABaseURL ? o[0] : o.length ? "/" + Ga(o, "/") : "", s !== null && (l += "?" + s), u !== null && (l += "#" + u), l;
  },
  // https://url.spec.whatwg.org/#dom-url-href
  setHref: function(r) {
    var t = this.parse(r);
    if (t)
      throw new ph(t);
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-origin
  getOrigin: function() {
    var r = this.scheme, t = this.port;
    if (r === "blob")
      try {
        return new Xn(r.path[0]).origin;
      } catch {
        return "null";
      }
    return r === "file" || !this.isSpecial() ? "null" : r + "://" + La(this.host) + (t !== null ? ":" + t : "");
  },
  // https://url.spec.whatwg.org/#dom-url-protocol
  getProtocol: function() {
    return this.scheme + ":";
  },
  setProtocol: function(r) {
    this.parse(Dt(r) + ":", Of);
  },
  // https://url.spec.whatwg.org/#dom-url-username
  getUsername: function() {
    return this.username;
  },
  setUsername: function(r) {
    var t = cn(Dt(r));
    if (!this.cannotHaveUsernamePasswordPort()) {
      this.username = "";
      for (var e = 0; e < t.length; e++)
        this.username += ae(t[e], If);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-password
  getPassword: function() {
    return this.password;
  },
  setPassword: function(r) {
    var t = cn(Dt(r));
    if (!this.cannotHaveUsernamePasswordPort()) {
      this.password = "";
      for (var e = 0; e < t.length; e++)
        this.password += ae(t[e], If);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-host
  getHost: function() {
    var r = this.host, t = this.port;
    return r === null ? "" : t === null ? La(r) : La(r) + ":" + t;
  },
  setHost: function(r) {
    this.cannotBeABaseURL || this.parse(r, _f);
  },
  // https://url.spec.whatwg.org/#dom-url-hostname
  getHostname: function() {
    var r = this.host;
    return r === null ? "" : La(r);
  },
  setHostname: function(r) {
    this.cannotBeABaseURL || this.parse(r, Cf);
  },
  // https://url.spec.whatwg.org/#dom-url-port
  getPort: function() {
    var r = this.port;
    return r === null ? "" : Dt(r);
  },
  setPort: function(r) {
    this.cannotHaveUsernamePasswordPort() || (r = Dt(r), r === "" ? this.port = null : this.parse(r, Pf));
  },
  // https://url.spec.whatwg.org/#dom-url-pathname
  getPathname: function() {
    var r = this.path;
    return this.cannotBeABaseURL ? r[0] : r.length ? "/" + Ga(r, "/") : "";
  },
  setPathname: function(r) {
    this.cannotBeABaseURL || (this.path = [], this.parse(r, fn));
  },
  // https://url.spec.whatwg.org/#dom-url-search
  getSearch: function() {
    var r = this.query;
    return r ? "?" + r : "";
  },
  setSearch: function(r) {
    r = Dt(r), r === "" ? this.query = null : (Jr(r, 0) === "?" && (r = ti(r, 1)), this.query = "", this.parse(r, Re)), this.searchParams.update();
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
    if (r = Dt(r), r === "") {
      this.fragment = null;
      return;
    }
    Jr(r, 0) === "#" && (r = ti(r, 1)), this.fragment = "", this.parse(r, Nt);
  },
  update: function() {
    this.query = this.searchParams.serialize() || null;
  }
};
var Xn = function(t) {
  var e = spr(this, xr), n = fpr(arguments.length, 1) > 1 ? arguments[1] : void 0, a = vpr(e, new kg(t, !1, n));
  Dg || (e.href = a.serialize(), e.origin = a.getOrigin(), e.protocol = a.getProtocol(), e.username = a.getUsername(), e.password = a.getPassword(), e.host = a.getHost(), e.hostname = a.getHostname(), e.port = a.getPort(), e.pathname = a.getPathname(), e.search = a.getSearch(), e.searchParams = a.getSearchParams(), e.hash = a.getHash());
}, xr = Xn.prototype, Kr = function(r, t) {
  return {
    get: function() {
      return ru(this)[r]();
    },
    set: t && function(e) {
      return ru(this)[t](e);
    },
    configurable: !0,
    enumerable: !0
  };
};
Dg && (qr(xr, "href", Kr("serialize", "setHref")), qr(xr, "origin", Kr("getOrigin")), qr(xr, "protocol", Kr("getProtocol", "setProtocol")), qr(xr, "username", Kr("getUsername", "setUsername")), qr(xr, "password", Kr("getPassword", "setPassword")), qr(xr, "host", Kr("getHost", "setHost")), qr(xr, "hostname", Kr("getHostname", "setHostname")), qr(xr, "port", Kr("getPort", "setPort")), qr(xr, "pathname", Kr("getPathname", "setPathname")), qr(xr, "search", Kr("getSearch", "setSearch")), qr(xr, "searchParams", Kr("getSearchParams")), qr(xr, "hash", Kr("getHash", "setHash")));
Qs(xr, "toJSON", function() {
  return ru(this).serialize();
}, { enumerable: !0 });
Qs(xr, "toString", function() {
  return ru(this).serialize();
}, { enumerable: !0 });
if (Da) {
  var jw = Da.createObjectURL, Uw = Da.revokeObjectURL;
  jw && Qs(Xn, "createObjectURL", Rw(jw, Da)), Uw && Qs(Xn, "revokeObjectURL", Rw(Uw, Da));
}
cpr(Xn, "URL");
ipr({ global: !0, constructor: !0, forced: !opr, sham: !Dg }, {
  URL: Xn
});
var Lpr = d, Fpr = ar, hR = I, kpr = et, zw = G, Bpr = sl, Bg = Fpr("URL"), jpr = Bpr && hR(function() {
  Bg.canParse();
}), Upr = hR(function() {
  return Bg.canParse.length !== 1;
});
Lpr({ target: "URL", stat: !0, forced: !jpr || Upr }, {
  canParse: function(t) {
    var e = kpr(arguments.length, 1), n = zw(t), a = e < 2 || arguments[1] === void 0 ? void 0 : zw(arguments[1]);
    try {
      return !!new Bg(n, a);
    } catch {
      return !1;
    }
  }
});
var zpr = d, Vpr = ar, Gpr = et, Vw = G, Hpr = sl, Wpr = Vpr("URL");
zpr({ target: "URL", stat: !0, forced: !Hpr }, {
  parse: function(t) {
    var e = Gpr(arguments.length, 1), n = Vw(t), a = e < 2 || arguments[1] === void 0 ? void 0 : Vw(arguments[1]);
    try {
      return new Wpr(n, a);
    } catch {
      return null;
    }
  }
});
var qpr = d, Ypr = U;
qpr({ target: "URL", proto: !0, enumerable: !0 }, {
  toJSON: function() {
    return Ypr(URL.prototype.toString, this);
  }
});
var Kpr = lr, ll = O, Gw = G, Xpr = et, dR = URLSearchParams, cl = dR.prototype, Jpr = ll(cl.append), Hw = ll(cl.delete), Zpr = ll(cl.forEach), Qpr = ll([].push), jg = new dR("a=1&a=2&b=3");
jg.delete("a", 1);
jg.delete("b", void 0);
jg + "" != "a=2" && Kpr(cl, "delete", function(r) {
  var t = arguments.length, e = t < 2 ? void 0 : arguments[1];
  if (t && e === void 0)
    return Hw(this, r);
  var n = [];
  Zpr(this, function(f, v) {
    Qpr(n, { key: v, value: f });
  }), Xpr(t, 1);
  for (var a = Gw(r), i = Gw(e), o = 0, s = 0, u = !1, l = n.length, c; o < l; )
    c = n[o++], u || c.key === a ? (u = !0, Hw(this, c.key)) : s++;
  for (; s < l; )
    c = n[s++], c.key === a && c.value === i || Jpr(this, c.key, c.value);
}, { enumerable: !0, unsafe: !0 });
var r$r = lr, gR = O, t$r = G, e$r = et, pR = URLSearchParams, Ug = pR.prototype, n$r = gR(Ug.getAll), a$r = gR(Ug.has), Ww = new pR("a=1");
(Ww.has("a", 2) || !Ww.has("a", void 0)) && r$r(Ug, "has", function(t) {
  var e = arguments.length, n = e < 2 ? void 0 : arguments[1];
  if (e && n === void 0)
    return a$r(this, t);
  var a = n$r(this, t);
  e$r(e, 1);
  for (var i = t$r(n), o = 0; o < a.length; )
    if (a[o++] === i)
      return !0;
  return !1;
}, { enumerable: !0, unsafe: !0 });
var i$r = j, o$r = O, s$r = hr, yh = URLSearchParams.prototype, u$r = o$r(yh.forEach);
i$r && !("size" in yh) && s$r(yh, "size", {
  get: function() {
    var t = 0;
    return u$r(this, function() {
      t++;
    }), t;
  },
  configurable: !0,
  enumerable: !0
});
var l$r = { exports: {} };
(function(r) {
  var t = function(e) {
    var n = Object.prototype, a = n.hasOwnProperty, i = Object.defineProperty || function(b, w, T) {
      b[w] = T.value;
    }, o, s = typeof Symbol == "function" ? Symbol : {}, u = s.iterator || "@@iterator", l = s.asyncIterator || "@@asyncIterator", c = s.toStringTag || "@@toStringTag";
    function f(b, w, T) {
      return Object.defineProperty(b, w, {
        value: T,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), b[w];
    }
    try {
      f({}, "");
    } catch {
      f = function(w, T, C) {
        return w[T] = C;
      };
    }
    function v(b, w, T, C) {
      var P = w && w.prototype instanceof x ? w : x, D = Object.create(P.prototype), Q = new E(C || []);
      return i(D, "_invoke", { value: F(b, T, Q) }), D;
    }
    e.wrap = v;
    function h(b, w, T) {
      try {
        return { type: "normal", arg: b.call(w, T) };
      } catch (C) {
        return { type: "throw", arg: C };
      }
    }
    var g = "suspendedStart", $ = "suspendedYield", p = "executing", y = "completed", S = {};
    function x() {
    }
    function A() {
    }
    function N() {
    }
    var z = {};
    f(z, u, function() {
      return this;
    });
    var X = Object.getPrototypeOf, rr = X && X(X(M([])));
    rr && rr !== n && a.call(rr, u) && (z = rr);
    var or = N.prototype = x.prototype = Object.create(z);
    A.prototype = N, i(or, "constructor", { value: N, configurable: !0 }), i(
      N,
      "constructor",
      { value: A, configurable: !0 }
    ), A.displayName = f(
      N,
      c,
      "GeneratorFunction"
    );
    function cr(b) {
      ["next", "throw", "return"].forEach(function(w) {
        f(b, w, function(T) {
          return this._invoke(w, T);
        });
      });
    }
    e.isGeneratorFunction = function(b) {
      var w = typeof b == "function" && b.constructor;
      return w ? w === A || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (w.displayName || w.name) === "GeneratorFunction" : !1;
    }, e.mark = function(b) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(b, N) : (b.__proto__ = N, f(b, c, "GeneratorFunction")), b.prototype = Object.create(or), b;
    }, e.awrap = function(b) {
      return { __await: b };
    };
    function B(b, w) {
      function T(D, Q, tr, er) {
        var nr = h(b[D], b, Q);
        if (nr.type === "throw")
          er(nr.arg);
        else {
          var pt = nr.arg, re = pt.value;
          return re && typeof re == "object" && a.call(re, "__await") ? w.resolve(re.__await).then(function(ye) {
            T("next", ye, tr, er);
          }, function(ye) {
            T("throw", ye, tr, er);
          }) : w.resolve(re).then(function(ye) {
            pt.value = ye, tr(pt);
          }, function(ye) {
            return T("throw", ye, tr, er);
          });
        }
      }
      var C;
      function P(D, Q) {
        function tr() {
          return new w(function(er, nr) {
            T(D, Q, er, nr);
          });
        }
        return C = // If enqueue has been called before, then we want to wait until
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
        C ? C.then(
          tr,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          tr
        ) : tr();
      }
      i(this, "_invoke", { value: P });
    }
    cr(B.prototype), f(B.prototype, l, function() {
      return this;
    }), e.AsyncIterator = B, e.async = function(b, w, T, C, P) {
      P === void 0 && (P = Promise);
      var D = new B(
        v(b, w, T, C),
        P
      );
      return e.isGeneratorFunction(w) ? D : D.next().then(function(Q) {
        return Q.done ? Q.value : D.next();
      });
    };
    function F(b, w, T) {
      var C = g;
      return function(D, Q) {
        if (C === p)
          throw new Error("Generator is already running");
        if (C === y) {
          if (D === "throw")
            throw Q;
          return L();
        }
        for (T.method = D, T.arg = Q; ; ) {
          var tr = T.delegate;
          if (tr) {
            var er = V(tr, T);
            if (er) {
              if (er === S)
                continue;
              return er;
            }
          }
          if (T.method === "next")
            T.sent = T._sent = T.arg;
          else if (T.method === "throw") {
            if (C === g)
              throw C = y, T.arg;
            T.dispatchException(T.arg);
          } else
            T.method === "return" && T.abrupt("return", T.arg);
          C = p;
          var nr = h(b, w, T);
          if (nr.type === "normal") {
            if (C = T.done ? y : $, nr.arg === S)
              continue;
            return {
              value: nr.arg,
              done: T.done
            };
          } else
            nr.type === "throw" && (C = y, T.method = "throw", T.arg = nr.arg);
        }
      };
    }
    function V(b, w) {
      var T = w.method, C = b.iterator[T];
      if (C === o)
        return w.delegate = null, T === "throw" && b.iterator.return && (w.method = "return", w.arg = o, V(b, w), w.method === "throw") || T !== "return" && (w.method = "throw", w.arg = new TypeError(
          "The iterator does not provide a '" + T + "' method"
        )), S;
      var P = h(C, b.iterator, w.arg);
      if (P.type === "throw")
        return w.method = "throw", w.arg = P.arg, w.delegate = null, S;
      var D = P.arg;
      if (!D)
        return w.method = "throw", w.arg = new TypeError("iterator result is not an object"), w.delegate = null, S;
      if (D.done)
        w[b.resultName] = D.value, w.next = b.nextLoc, w.method !== "return" && (w.method = "next", w.arg = o);
      else
        return D;
      return w.delegate = null, S;
    }
    cr(or), f(or, c, "Generator"), f(or, u, function() {
      return this;
    }), f(or, "toString", function() {
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
    function E(b) {
      this.tryEntries = [{ tryLoc: "root" }], b.forEach(m, this), this.reset(!0);
    }
    e.keys = function(b) {
      var w = Object(b), T = [];
      for (var C in w)
        T.push(C);
      return T.reverse(), function P() {
        for (; T.length; ) {
          var D = T.pop();
          if (D in w)
            return P.value = D, P.done = !1, P;
        }
        return P.done = !0, P;
      };
    };
    function M(b) {
      if (b) {
        var w = b[u];
        if (w)
          return w.call(b);
        if (typeof b.next == "function")
          return b;
        if (!isNaN(b.length)) {
          var T = -1, C = function P() {
            for (; ++T < b.length; )
              if (a.call(b, T))
                return P.value = b[T], P.done = !1, P;
            return P.value = o, P.done = !0, P;
          };
          return C.next = C;
        }
      }
      return { next: L };
    }
    e.values = M;
    function L() {
      return { value: o, done: !0 };
    }
    return E.prototype = {
      constructor: E,
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
        function T(er, nr) {
          return D.type = "throw", D.arg = b, w.next = er, nr && (w.method = "next", w.arg = o), !!nr;
        }
        for (var C = this.tryEntries.length - 1; C >= 0; --C) {
          var P = this.tryEntries[C], D = P.completion;
          if (P.tryLoc === "root")
            return T("end");
          if (P.tryLoc <= this.prev) {
            var Q = a.call(P, "catchLoc"), tr = a.call(P, "finallyLoc");
            if (Q && tr) {
              if (this.prev < P.catchLoc)
                return T(P.catchLoc, !0);
              if (this.prev < P.finallyLoc)
                return T(P.finallyLoc);
            } else if (Q) {
              if (this.prev < P.catchLoc)
                return T(P.catchLoc, !0);
            } else if (tr) {
              if (this.prev < P.finallyLoc)
                return T(P.finallyLoc);
            } else
              throw new Error("try statement without catch or finally");
          }
        }
      },
      abrupt: function(b, w) {
        for (var T = this.tryEntries.length - 1; T >= 0; --T) {
          var C = this.tryEntries[T];
          if (C.tryLoc <= this.prev && a.call(C, "finallyLoc") && this.prev < C.finallyLoc) {
            var P = C;
            break;
          }
        }
        P && (b === "break" || b === "continue") && P.tryLoc <= w && w <= P.finallyLoc && (P = null);
        var D = P ? P.completion : {};
        return D.type = b, D.arg = w, P ? (this.method = "next", this.next = P.finallyLoc, S) : this.complete(D);
      },
      complete: function(b, w) {
        if (b.type === "throw")
          throw b.arg;
        return b.type === "break" || b.type === "continue" ? this.next = b.arg : b.type === "return" ? (this.rval = this.arg = b.arg, this.method = "return", this.next = "end") : b.type === "normal" && w && (this.next = w), S;
      },
      finish: function(b) {
        for (var w = this.tryEntries.length - 1; w >= 0; --w) {
          var T = this.tryEntries[w];
          if (T.finallyLoc === b)
            return this.complete(T.completion, T.afterLoc), R(T), S;
        }
      },
      catch: function(b) {
        for (var w = this.tryEntries.length - 1; w >= 0; --w) {
          var T = this.tryEntries[w];
          if (T.tryLoc === b) {
            var C = T.completion;
            if (C.type === "throw") {
              var P = C.arg;
              R(T);
            }
            return P;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(b, w, T) {
        return this.delegate = {
          iterator: M(b),
          resultName: w,
          nextLoc: T
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
})(l$r);
class qw {
  constructor(t) {
    this.context = t;
  }
  renderLine(t, e, n, a, i, o) {
    this.context.lineWidth = i, this.context.moveTo(t, e), this.context.lineTo(n, a), this.context.strokeStyle = o, this.context.stroke();
  }
}
class $$r {
  constructor(t, e, n, a, i = new dp()) {
    this.tooltip = null, this.highlightedRow = -1, this.highlightedColumn = -1, this.animatingRows = !1, this.animatingCols = !1, this.clusteredHorizontal = !1, this.clusteredVertical = !1, this.lastZoomStatus = {
      k: 1,
      x: 0,
      y: 0
    }, this.settings = this.fillOptions(i), this.element = t;
    const o = new pp();
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
    const s = US().extent([[0, 0], [this.settings.width, this.settings.height]]).scaleExtent([0.25, 12]).on("zoom", (u) => {
      this.zoomed(u.transform);
    });
    this.visElement.call(s), this.computeClusterRoots(), this.redraw();
  }
  fillOptions(t = void 0) {
    let e = new dp();
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
        const $ = g - v, p = this.settings.transition($ / e);
        this.redraw(l, c, p), $ < e ? requestAnimationFrame(h) : f();
      };
      requestAnimationFrame(h);
    }), a = new pp();
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
      (i, o) => new gp(
        this.values[o].filter((s) => s.rowId == i.idx).map((s) => s.value),
        i.idx
      )
    );
    this.rowClusterRoot = e.reorder(t.cluster(n)), this.verticalNodesPerDepth = this.bfsNodesPerDepth(this.rowClusterRoot);
    let a = this.columns.map(
      (i, o) => new gp(
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
      for (const [p, y] of $) {
        const S = y * (i + n), x = p * (i + n);
        o += `
                    <rect width="${i}" height="${i}" fill="${g}" x="${S}" y="${x}"></rect>
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
      const p = u.measureText(this.rows[g].name).width + l;
      p > f && (f = p);
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
      const p = u.measureText(this.columns[g].name).width + v;
      p > h && (h = p);
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
        let p = c + g * n, y = f + $ * n, S = p + (a + this.settings.squarePadding), x = y + (a + this.settings.squarePadding);
        S < 0 || p > this.settings.width || x < 0 || y > this.settings.height || (this.settings.highlightSelection && u == this.highlightedRow && l == this.highlightedColumn && (this.context.save(), this.context.fillStyle = this.settings.maxColor, this.context.fillRect(
          p - this.settings.squarePadding,
          y - this.settings.squarePadding,
          a + 2 * this.settings.squarePadding,
          a + 2 * this.settings.squarePadding
        ), this.context.restore()), this.context.fillRect(
          p,
          y,
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
    return n === -1 || !e ? t ? this.settings.dendrogramColor : "#d3d3d3" : Eh(Le("#d3d3d3"), Le(this.settings.dendrogramColor))(n);
  }
  redrawVerticalDendrogram(t) {
    this.context.save();
    const e = this.computeDendrogramColor(this.clusteredVertical, this.animatingRows, t), n = this.determineSquareWidth(), a = this.settings.dendrogramWidth * this.lastZoomStatus.k, i = new qw(this.context), o = this.currentViewPort.yTop + a + n / 2, s = /* @__PURE__ */ new Map(), u = this.determineOrder(this.rowClusterRoot);
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
        const h = this.verticalNodesPerDepth[f][v], g = this.verticalNodesPerDepth[f][v + 1], $ = h.parent, [p, y] = s.get(h.id), [S, x] = s.get(g.id);
        if (this.context.beginPath(), i.renderLine(p, y, c, y, this.settings.dendrogramLineWidth, e), i.renderLine(S, x, c, x, this.settings.dendrogramLineWidth, e), i.renderLine(c, y, c, x, this.settings.dendrogramLineWidth, e), this.context.closePath(), $) {
          const A = Math.min(y, x) + Math.abs(y - x) / 2;
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
    const e = this.computeDendrogramColor(this.clusteredHorizontal, this.animatingCols, t), n = this.determineSquareWidth(), a = this.settings.dendrogramWidth * this.lastZoomStatus.k, i = new qw(this.context), o = this.currentViewPort.xTop + n / 2 + a, s = /* @__PURE__ */ new Map(), u = this.determineOrder(this.colClusterRoot);
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
        const h = this.horizontalNodesPerDepth[f][v], g = this.horizontalNodesPerDepth[f][v + 1], $ = h.parent, [p, y] = s.get(h.id), [S, x] = s.get(g.id);
        if (this.context.beginPath(), i.renderLine(p, y, p, c, this.settings.dendrogramLineWidth, e), i.renderLine(S, x, S, c, this.settings.dendrogramLineWidth, e), i.renderLine(p, c, S, c, this.settings.dendrogramLineWidth, e), this.context.closePath(), $) {
          const A = Math.min(p, S) + Math.abs(p - S) / 2;
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
class y$r {
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
class pi {
}
pi.DEFAULT_COLORS = [
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
pi.FIXED_COLORS = [
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
pi.MATERIAL_DESIGN_COLORS = [
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
class c$r {
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
class Yw extends su {
  constructor() {
    super(...arguments), this.radius = 300, this.breadcrumbWidth = 200, this.className = "sunburst", this.useFixedColors = !1, this.colorPalette = pi.DEFAULT_COLORS, this.fixedColorPalette = pi.FIXED_COLORS, this.enableBreadcrumbs = !0, this.levels = 4, this.animationDuration = 1e3, this.rerootCallback = () => {
    }, this.fixedColorHash = (t) => c$r.stringHash(t.name), this.getTooltip = (t) => `
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
const $R = class yR {
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
    return e.length > 0 && t.count !== 0 && e.push(new ds(-1, "empty", [], t.count, t.selfCount)), new ds(
      t.id || ++yR.idCounter,
      t.name || "",
      e,
      t.count,
      t.selfCount,
      t.extra
    );
  }
};
$R.idCounter = 0;
let f$r = $R;
class zg {
  static initTooltip() {
    return yr("body").append("div").attr("class", "tip").style("position", "absolute").style("z-index", "10").style("visibility", "hidden");
  }
}
class ei {
  /**
   * Checks if p is a parent of c. If the child is situated deeper in the hierarchy than maxLevels, false is returned.
   *
   * @param p Possible parent node.
   * @param c Possible child node.
   * @param maxLevels Maximum depth for the child node in the hierarchy.
   */
  static isParentOf(t, e, n) {
    return e.depth >= n ? !1 : t === e ? !0 : t.children ? t.children.some((a) => ei.isParentOf(a, e, n)) : !1;
  }
}
class fl {
  /*
   * Returns the readable text color based on the brightness of a given background color.
   */
  static getReadableColorFor(t) {
    let e = "#000";
    try {
      e = fl.brightness($s(t)) < 125 ? "#eee" : "#000";
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
class m$r {
  constructor(t, e, n = new Yw()) {
    this.element = t, this.colorCounter = -1, this.currentMaxLevel = 4, this.arcData = [], this.textData = [], this.previousRoot = null, this.previousMaxLevel = this.currentMaxLevel, this.settings = this.fillOptions(n);
    const i = new f$r().preprocessData(e);
    this.settings.enableTooltips && (this.tooltip = zg.initTooltip()), this.currentMaxLevel = this.settings.levels, this.xScale = ke().range([0, 2 * Math.PI]), this.yScale = ke().domain([0, 1]).range([0, this.settings.radius]);
    const o = Bn(i);
    o.sum((l) => l.children.length > 0 ? 0 : l.selfCount);
    const s = MP();
    this.data = s(o).descendants(), this.arc = Kf().startAngle((l) => Math.max(0, Math.min(Math.PI * 2, this.xScale(l.x0)))).endAngle((l) => Math.max(0, Math.min(Math.PI * 2, this.xScale(l.x1)))).innerRadius((l) => Math.max(0, l.y0 ? this.yScale(l.y0) : l.y0)).outerRadius((l) => Math.max(0, this.yScale(l.y1) + 1)), this.initCss(), this.element.innerHTML = "", this.breadCrumbs = yr(this.element).append("div").attr("id", Math.floor(Math.random() * 2 ** 16) + "-breadcrumbs").attr("class", "sunburst-breadcrumbs").append("ul");
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
    const e = new Yw();
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
      const e = t.children.map((o) => this.color(o)), n = Fa(e[0]), a = Fa(e[1]);
      return t.children.length === 1 || t.children[1].name === "empty" ? Fa(n.h, n.s, n.l * 0.98) : Fa((n.h + a.h) / 2, (n.s + a.s) / 2, (n.l + a.l) / 2);
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
    let n = Math.min(this.maxY(t), t.y0 + e.settings.levels * (t.y1 - t.y0)), a = On(e.xScale.domain(), [t.x0, t.x1]), i = On(e.yScale.domain(), [t.y0, n]), o = On(e.yScale.range(), [t.y0 ? 20 : 0, e.settings.radius]);
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
    const e = this.data.filter((i) => ei.isParentOf(t, i, this.currentMaxLevel + 2));
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
    const e = this.data.filter((u) => ei.isParentOf(t, u, this.currentMaxLevel)), n = e.filter((u) => !this.textData.includes(u)), a = this.textData.concat(...n);
    t.parent && a.splice(a.indexOf(t.parent), 1);
    const i = this, o = typeof OffscreenCanvas < "u";
    let s;
    o && (s = new OffscreenCanvas(1, 1).getContext("2d"), s.font = s.font = "16px 'Helvetica Neue', Helvetica, Arial, sans-serif"), this.visGElement.selectAll("text").data([]).exit().remove(), this.text = this.visGElement.selectAll("text").data(a).enter().append("text").style("fill", (u) => fl.getReadableColorFor(this.color(u.data))).style("fill-opacity", 0).style("font-family", "font-family: Helvetica, 'Super Sans', sans-serif").style("pointer-events", "none").attr("dy", ".2em").text((u) => this.settings.getLabel(u.data)).style("font-size", function(u) {
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
          c > Number.parseInt(f.style("font-size").replace("px", "")) && ei.isParentOf(t, l, i.currentMaxLevel) ? "visible" : "hidden"
        ), u();
      });
    }), this.textData = e;
  }
  setBreadcrumbs(t) {
    let e = [], n = t;
    for (; n; )
      e.push(n), n = n.parent;
    e.reverse().shift();
    const a = Kf().innerRadius(0).outerRadius(15).startAngle(0).endAngle((i) => 2 * Math.PI * i.data.count / i.parent.data.count);
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
class Kw extends su {
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
const mR = class bR {
  preprocessData(t) {
    const e = [];
    if (t.children)
      for (const n of t.children)
        e.push(this.preprocessData(n));
    return new ds(
      t.id || ++bR.idCounter,
      t.name || "",
      e,
      t.count,
      t.selfCount,
      t.extra
    );
  }
};
mR.idCounter = 0;
let v$r = mR;
class b$r {
  constructor(t, e, n = new Kw()) {
    var o;
    this.element = t, this.childParentRelations = /* @__PURE__ */ new Map(), this.nodeId = 0, this.settings = this.fillOptions(n), this.settings.enableTooltips && (this.tooltip = zg.initTooltip()), this.initCss();
    const a = new v$r(), i = Bn(a.preprocessData(e));
    i.sum((s) => s.children.length > 0 ? 0 : s.count), i.sort((s, u) => u.value - s.value), this.partition = GP(), this.partition.size([this.settings.width + 1, this.settings.height + 1]).paddingTop(this.settings.labelHeight), this.data = this.partition(i).descendants(), this.settings.levels || (this.settings.levels = this.data[0].height);
    for (const s of this.data)
      this.childParentRelations.set(s.data, (o = s.parent) == null ? void 0 : o.data);
    this.currentRoot = this.data[0], this.colorScale = ke().domain([0, this.settings.levels]).range([this.settings.colorRoot, this.settings.colorLeaf]).interpolate(Eh), this.breadCrumbs = yr(this.element).append("div").attr("class", "breadcrumbs").style("position", "relative").style("width", this.settings.width + "px").style("height", "20px").style("background-color", this.settings.colorBreadcrumbs), this.treemap = yr(this.element).append("div").style("position", "relative").style("width", this.settings.width + "px").style("height", this.settings.height + "px"), this.render(this.currentRoot);
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
    const e = new Kw();
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
    const n = Bn(t.data);
    n.sum((o) => o.children.length > 0 ? 0 : o.count), n.sort((o, s) => s.value - o.value);
    let a = this.treemap.selectAll(".node").data(
      this.partition(n).descendants(),
      (o) => o.data.id || (o.data.id = ++this.nodeId)
    );
    a.enter().append("div").attr("class", "node").style("background", (o) => this.colorScale(this.settings.getLevel(o))).style("color", (o) => fl.getReadableColorFor(this.colorScale(this.settings.getLevel(o)).toString())).style("left", "0px").style("top", "0px").style("width", "0px").style("height", "0px").text((o) => this.settings.getLabel(o.data)).on("click", (o, s) => this.render(s)).on("contextmenu", (o, s) => {
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
const h$r = kS(tM);
class Xw extends su {
  constructor() {
    super(...arguments), this.minNodeSize = 2, this.maxNodeSize = 105, this.enableExpandOnClick = !0, this.enableAutoExpand = !1, this.autoExpandValue = 0.8, this.levelsToExpand = 2, this.enableRightClick = !0, this.enableInnerArcs = !0, this.enableLabels = !0, this.nodeDistance = 180, this.animationDuration = 500, this.colorProviderLevels = 1, this.nodeFillColor = (t) => t.isSelected() ? t.children.length > 0 ? t.getColor() || "#aaa" : "#fff" : "#aaa", this.nodeStrokeColor = (t) => t.isSelected() && t.getColor() || "#aaa", this.linkStrokeColor = (t) => t.source.data.isSelected() ? t.target.data.getColor() : "#aaa", this.colorProvider = (t) => h$r(t.name), this.getLabel = (t) => t.name, this.getTooltip = (t) => `
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
class d$r {
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
class g$r extends ds {
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
const wR = class SR {
  preprocessData(t) {
    const e = [];
    if (t.children)
      for (const n of t.children)
        e.push(this.preprocessData(n));
    return new g$r(
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
let p$r = wR;
class w$r {
  constructor(t, e, n = new Xw()) {
    this.element = t, this.nodeId = 0, this.zoomScale = 1, this.settings = this.fillOptions(n), this.settings.enableTooltips && (this.tooltip = zg.initTooltip());
    const i = new p$r().preprocessData(e), o = Bn(i);
    o.sum((s) => s.children.length > 0 ? 0 : s.count), this.widthScale = ke().range([this.settings.minNodeSize, this.settings.maxNodeSize]), this.treeLayout = BP().nodeSize([2, 10]).separation((s, u) => {
      if (s.data.isCollapsed() || u.data.isCollapsed())
        return 0;
      const c = (this.computeNodeSize(s) + this.computeNodeSize(u)) / 2 + 4;
      return s.parent === u.parent ? c : c + 4;
    }), this.data = this.treeLayout(o).descendants(), this.root = this.data[0], this.element.innerHTML = "", this.svg = yr(this.element).append("svg").attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`).attr("width", this.settings.width).attr("height", this.settings.height).style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif"), this.zoomListener = US().extent([[0, 0], [this.settings.width, this.settings.height]]).scaleExtent([0.1, 3]).on("zoom", (s) => {
      this.zoomScale = s.transform.k, this.visElement.attr("transform", s.transform.toString());
    }), this.visElement = this.svg.call(this.zoomListener).append("g"), this.render(this.root);
  }
  reset() {
    this.render(this.data[0]);
  }
  fillOptions(t = void 0) {
    const e = new Xw();
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
    e = e * this.zoomScale + this.settings.width / 4, n = n * this.zoomScale + this.settings.height / 2, this.visElement.transition().duration(this.settings.animationDuration).attr("transform", `translate(${e},${n})scale(${this.zoomScale})`).on("end", () => this.zoomListener.transform(this.svg, _h.translate(e, n).scale(this.zoomScale)));
  }
  initialExpand(t) {
    var a;
    if (!this.settings.enableAutoExpand) {
      t.data.expand(this.settings.levelsToExpand);
      return;
    }
    t.data.expand(1);
    let e = t.data.count * (this.settings.enableAutoExpand ? this.settings.autoExpandValue : 0.8);
    const n = new d$r([...t.children || []], (i, o) => o.data.count - i.data.count);
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
    const s = ke().range([0, 2 * Math.PI]), u = Kf().innerRadius(0).outerRadius((h) => this.computeNodeSize(h)).startAngle(0).endAngle((h) => s(h.data.selfCount / h.data.count) || 0);
    this.settings.enableInnerArcs && o.append("path").attr("class", "innerArc").attr("d", u).style("fill", (h) => this.settings.nodeStrokeColor(h.data)).style("fill-opacity", 0), this.settings.enableLabels && o.append("text").attr("x", (h) => h.children ? -10 : 10).attr("dy", ".35em").attr("text-anchor", (h) => h.children ? "end" : "start").text((h) => this.settings.getLabel(h.data)).style("font", "10px sans-serif").style("fill-opacity", 1e-6);
    const l = o.transition().duration(this.settings.animationDuration).attr("transform", (h) => `translate(${h.y}, ${h.x})`);
    l.select("circle").attr("r", (h) => this.computeNodeSize(h)).style("fill-opacity", (h) => h.children && h.children[0].data.isCollapsed() ? 1 : 0).style("stroke", (h) => this.settings.nodeStrokeColor(h.data)).style("fill", (h) => this.settings.nodeFillColor(h.data)), this.settings.enableInnerArcs && l.select(".innerArc").style("fill-opacity", 1), this.settings.enableLabels && l.select("text").style("fill-opacity", 1);
    const c = i.exit().transition().duration(this.settings.animationDuration).attr("transform", (h) => `translate(${t.y},${t.x})`).remove();
    c.select("circle").attr("r", 1e-6), c.select("path").style("fill-opacity", 1e-6), c.select("text").style("fill-opacity", 1e-6);
    let f = this.visElement.selectAll("path.link").data(a, (h) => h.target.data.id);
    const v = yM().x((h) => h.y).y((h) => h.x);
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
  pi as ColorPalette,
  fl as ColorUtils,
  ds as DataNode,
  OM as EuclidianDistanceMetric,
  $$r as Heatmap,
  dp as HeatmapSettings,
  AM as MoloReorderer,
  y$r as PearsonCorrelationMetric,
  c$r as StringUtils,
  m$r as Sunburst,
  Yw as SunburstSettings,
  Xf as Transition,
  Zo as TreeNode,
  b$r as Treemap,
  Kw as TreemapSettings,
  w$r as Treeview,
  Xw as TreeviewSettings,
  IM as UPGMAClusterer
};
//# sourceMappingURL=unipept-visualizations.mjs.map
