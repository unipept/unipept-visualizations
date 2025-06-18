class Ss {
  constructor(r, e, n = [], a, i, o = {}) {
    this.id = r, this.name = e, this.children = n, this.count = a, this.selfCount = i, this.extra = o;
  }
}
function ts(t, r) {
  return t == null || r == null ? NaN : t < r ? -1 : t > r ? 1 : t >= r ? 0 : NaN;
}
function BR(t, r) {
  return t == null || r == null ? NaN : r < t ? -1 : r > t ? 1 : r >= t ? 0 : NaN;
}
function dS(t) {
  let r, e, n;
  t.length !== 2 ? (r = ts, e = (s, u) => ts(t(s), u), n = (s, u) => t(s) - u) : (r = t === ts || t === BR ? t : jR, e = t, n = t);
  function a(s, u, l = 0, c = s.length) {
    if (l < c) {
      if (r(u, u) !== 0)
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
      if (r(u, u) !== 0)
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
function jR() {
  return 0;
}
function UR(t) {
  return t === null ? NaN : +t;
}
const zR = dS(ts), VR = zR.right;
dS(UR).center;
const gS = VR;
class Zg extends Map {
  constructor(r, e = WR) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: e } }), r != null)
      for (const [n, a] of r)
        this.set(n, a);
  }
  get(r) {
    return super.get(Qg(this, r));
  }
  has(r) {
    return super.has(Qg(this, r));
  }
  set(r, e) {
    return super.set(HR(this, r), e);
  }
  delete(r) {
    return super.delete(GR(this, r));
  }
}
function Qg({ _intern: t, _key: r }, e) {
  const n = r(e);
  return t.has(n) ? t.get(n) : e;
}
function HR({ _intern: t, _key: r }, e) {
  const n = r(e);
  return t.has(n) ? t.get(n) : (t.set(n, e), e);
}
function GR({ _intern: t, _key: r }, e) {
  const n = r(e);
  return t.has(n) && (e = t.get(n), t.delete(n)), e;
}
function WR(t) {
  return t !== null && typeof t == "object" ? t.valueOf() : t;
}
const qR = Math.sqrt(50), YR = Math.sqrt(10), KR = Math.sqrt(2);
function xs(t, r, e) {
  const n = (r - t) / Math.max(0, e), a = Math.floor(Math.log10(n)), i = n / Math.pow(10, a), o = i >= qR ? 10 : i >= YR ? 5 : i >= KR ? 2 : 1;
  let s, u, l;
  return a < 0 ? (l = Math.pow(10, -a) / o, s = Math.round(t * l), u = Math.round(r * l), s / l < t && ++s, u / l > r && --u, l = -l) : (l = Math.pow(10, a) * o, s = Math.round(t / l), u = Math.round(r / l), s * l < t && ++s, u * l > r && --u), u < s && 0.5 <= e && e < 2 ? xs(t, r, e * 2) : [s, u, l];
}
function XR(t, r, e) {
  if (r = +r, t = +t, e = +e, !(e > 0))
    return [];
  if (t === r)
    return [t];
  const n = r < t, [a, i, o] = n ? xs(r, t, e) : xs(t, r, e);
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
function qf(t, r, e) {
  return r = +r, t = +t, e = +e, xs(t, r, e)[2];
}
function JR(t, r, e) {
  r = +r, t = +t, e = +e;
  const n = r < t, a = n ? qf(r, t, e) : qf(t, r, e);
  return (n ? -1 : 1) * (a < 0 ? 1 / -a : a);
}
function tp(t, r) {
  let e;
  if (r === void 0)
    for (const n of t)
      n != null && (e < n || e === void 0 && n >= n) && (e = n);
  else {
    let n = -1;
    for (let a of t)
      (a = r(a, ++n, t)) != null && (e < a || e === void 0 && a >= a) && (e = a);
  }
  return e;
}
function ZR(t, r, e) {
  t = +t, r = +r, e = (a = arguments.length) < 2 ? (r = t, t = 0, 1) : a < 3 ? 1 : +e;
  for (var n = -1, a = Math.max(0, Math.ceil((r - t) / e)) | 0, i = new Array(a); ++n < a; )
    i[n] = t + n * e;
  return i;
}
function QR(t) {
  return t;
}
var xl = 1, El = 2, Yf = 3, ro = 4, rp = 1e-6;
function t_(t) {
  return "translate(" + t + ",0)";
}
function r_(t) {
  return "translate(0," + t + ")";
}
function e_(t) {
  return (r) => +t(r);
}
function n_(t, r) {
  return r = Math.max(0, t.bandwidth() - r * 2) / 2, t.round() && (r = Math.round(r)), (e) => +t(e) + r;
}
function a_() {
  return !this.__axis;
}
function i_(t, r) {
  var e = [], n = null, a = null, i = 6, o = 6, s = 3, u = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, l = t === xl || t === ro ? -1 : 1, c = t === ro || t === El ? "x" : "y", f = t === xl || t === Yf ? t_ : r_;
  function h(v) {
    var d = n ?? (r.ticks ? r.ticks.apply(r, e) : r.domain()), $ = a ?? (r.tickFormat ? r.tickFormat.apply(r, e) : QR), y = Math.max(i, 0) + s, p = r.range(), b = +p[0] + u, I = +p[p.length - 1] + u, _ = (r.bandwidth ? n_ : e_)(r.copy(), u), M = v.selection ? v.selection() : v, B = M.selectAll(".domain").data([null]), H = M.selectAll(".tick").data(d, r).order(), q = H.exit(), Z = H.enter().append("g").attr("class", "tick"), nt = H.select("line"), k = H.select("text");
    B = B.merge(B.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), H = H.merge(Z), nt = nt.merge(Z.append("line").attr("stroke", "currentColor").attr(c + "2", l * i)), k = k.merge(Z.append("text").attr("fill", "currentColor").attr(c, l * y).attr("dy", t === xl ? "0em" : t === Yf ? "0.71em" : "0.32em")), v !== M && (B = B.transition(v), H = H.transition(v), nt = nt.transition(v), k = k.transition(v), q = q.transition(v).attr("opacity", rp).attr("transform", function(Y) {
      return isFinite(Y = _(Y)) ? f(Y + u) : this.getAttribute("transform");
    }), Z.attr("opacity", rp).attr("transform", function(Y) {
      var L = this.parentNode.__axis;
      return f((L && isFinite(L = L(Y)) ? L : _(Y)) + u);
    })), q.remove(), B.attr("d", t === ro || t === El ? o ? "M" + l * o + "," + b + "H" + u + "V" + I + "H" + l * o : "M" + u + "," + b + "V" + I : o ? "M" + b + "," + l * o + "V" + u + "H" + I + "V" + l * o : "M" + b + "," + u + "H" + I), H.attr("opacity", 1).attr("transform", function(Y) {
      return f(_(Y) + u);
    }), nt.attr(c + "2", l * i), k.attr(c, l * y).text($), M.filter(a_).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === El ? "start" : t === ro ? "end" : "middle"), M.each(function() {
      this.__axis = _;
    });
  }
  return h.scale = function(v) {
    return arguments.length ? (r = v, h) : r;
  }, h.ticks = function() {
    return e = Array.from(arguments), h;
  }, h.tickArguments = function(v) {
    return arguments.length ? (e = v == null ? [] : Array.from(v), h) : e.slice();
  }, h.tickValues = function(v) {
    return arguments.length ? (n = v == null ? null : Array.from(v), h) : n && n.slice();
  }, h.tickFormat = function(v) {
    return arguments.length ? (a = v, h) : a;
  }, h.tickSize = function(v) {
    return arguments.length ? (i = o = +v, h) : i;
  }, h.tickSizeInner = function(v) {
    return arguments.length ? (i = +v, h) : i;
  }, h.tickSizeOuter = function(v) {
    return arguments.length ? (o = +v, h) : o;
  }, h.tickPadding = function(v) {
    return arguments.length ? (s = +v, h) : s;
  }, h.offset = function(v) {
    return arguments.length ? (u = +v, h) : u;
  }, h;
}
function o_(t) {
  return i_(Yf, t);
}
var s_ = { value: () => {
} };
function _v() {
  for (var t = 0, r = arguments.length, e = {}, n; t < r; ++t) {
    if (!(n = arguments[t] + "") || n in e || /[\s.]/.test(n))
      throw new Error("illegal type: " + n);
    e[n] = [];
  }
  return new rs(e);
}
function rs(t) {
  this._ = t;
}
function u_(t, r) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", a = e.indexOf(".");
    if (a >= 0 && (n = e.slice(a + 1), e = e.slice(0, a)), e && !r.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    return { type: e, name: n };
  });
}
rs.prototype = _v.prototype = {
  constructor: rs,
  on: function(t, r) {
    var e = this._, n = u_(t + "", e), a, i = -1, o = n.length;
    if (arguments.length < 2) {
      for (; ++i < o; )
        if ((a = (t = n[i]).type) && (a = l_(e[a], t.name)))
          return a;
      return;
    }
    if (r != null && typeof r != "function")
      throw new Error("invalid callback: " + r);
    for (; ++i < o; )
      if (a = (t = n[i]).type)
        e[a] = ep(e[a], t.name, r);
      else if (r == null)
        for (a in e)
          e[a] = ep(e[a], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, r = this._;
    for (var e in r)
      t[e] = r[e].slice();
    return new rs(t);
  },
  call: function(t, r) {
    if ((a = arguments.length - 2) > 0)
      for (var e = new Array(a), n = 0, a, i; n < a; ++n)
        e[n] = arguments[n + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (i = this._[t], n = 0, a = i.length; n < a; ++n)
      i[n].value.apply(r, e);
  },
  apply: function(t, r, e) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var n = this._[t], a = 0, i = n.length; a < i; ++a)
      n[a].value.apply(r, e);
  }
};
function l_(t, r) {
  for (var e = 0, n = t.length, a; e < n; ++e)
    if ((a = t[e]).name === r)
      return a.value;
}
function ep(t, r, e) {
  for (var n = 0, a = t.length; n < a; ++n)
    if (t[n].name === r) {
      t[n] = s_, t = t.slice(0, n).concat(t.slice(n + 1));
      break;
    }
  return e != null && t.push({ name: r, value: e }), t;
}
var Kf = "http://www.w3.org/1999/xhtml";
const np = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Kf,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function hu(t) {
  var r = t += "", e = r.indexOf(":");
  return e >= 0 && (r = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)), np.hasOwnProperty(r) ? { space: np[r], local: t } : t;
}
function c_(t) {
  return function() {
    var r = this.ownerDocument, e = this.namespaceURI;
    return e === Kf && r.documentElement.namespaceURI === Kf ? r.createElement(t) : r.createElementNS(e, t);
  };
}
function f_(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function pS(t) {
  var r = hu(t);
  return (r.local ? f_ : c_)(r);
}
function h_() {
}
function Cv(t) {
  return t == null ? h_ : function() {
    return this.querySelector(t);
  };
}
function v_(t) {
  typeof t != "function" && (t = Cv(t));
  for (var r = this._groups, e = r.length, n = new Array(e), a = 0; a < e; ++a)
    for (var i = r[a], o = i.length, s = n[a] = new Array(o), u, l, c = 0; c < o; ++c)
      (u = i[c]) && (l = t.call(u, u.__data__, c, i)) && ("__data__" in u && (l.__data__ = u.__data__), s[c] = l);
  return new At(n, this._parents);
}
function $S(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function d_() {
  return [];
}
function yS(t) {
  return t == null ? d_ : function() {
    return this.querySelectorAll(t);
  };
}
function g_(t) {
  return function() {
    return $S(t.apply(this, arguments));
  };
}
function p_(t) {
  typeof t == "function" ? t = g_(t) : t = yS(t);
  for (var r = this._groups, e = r.length, n = [], a = [], i = 0; i < e; ++i)
    for (var o = r[i], s = o.length, u, l = 0; l < s; ++l)
      (u = o[l]) && (n.push(t.call(u, u.__data__, l, o)), a.push(u));
  return new At(n, a);
}
function mS(t) {
  return function() {
    return this.matches(t);
  };
}
function bS(t) {
  return function(r) {
    return r.matches(t);
  };
}
var $_ = Array.prototype.find;
function y_(t) {
  return function() {
    return $_.call(this.children, t);
  };
}
function m_() {
  return this.firstElementChild;
}
function b_(t) {
  return this.select(t == null ? m_ : y_(typeof t == "function" ? t : bS(t)));
}
var w_ = Array.prototype.filter;
function S_() {
  return Array.from(this.children);
}
function x_(t) {
  return function() {
    return w_.call(this.children, t);
  };
}
function E_(t) {
  return this.selectAll(t == null ? S_ : x_(typeof t == "function" ? t : bS(t)));
}
function T_(t) {
  typeof t != "function" && (t = mS(t));
  for (var r = this._groups, e = r.length, n = new Array(e), a = 0; a < e; ++a)
    for (var i = r[a], o = i.length, s = n[a] = [], u, l = 0; l < o; ++l)
      (u = i[l]) && t.call(u, u.__data__, l, i) && s.push(u);
  return new At(n, this._parents);
}
function wS(t) {
  return new Array(t.length);
}
function I_() {
  return new At(this._enter || this._groups.map(wS), this._parents);
}
function Es(t, r) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = r;
}
Es.prototype = {
  constructor: Es,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, r) {
    return this._parent.insertBefore(t, r);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function O_(t) {
  return function() {
    return t;
  };
}
function A_(t, r, e, n, a, i) {
  for (var o = 0, s, u = r.length, l = i.length; o < l; ++o)
    (s = r[o]) ? (s.__data__ = i[o], n[o] = s) : e[o] = new Es(t, i[o]);
  for (; o < u; ++o)
    (s = r[o]) && (a[o] = s);
}
function R_(t, r, e, n, a, i, o) {
  var s, u, l = /* @__PURE__ */ new Map(), c = r.length, f = i.length, h = new Array(c), v;
  for (s = 0; s < c; ++s)
    (u = r[s]) && (h[s] = v = o.call(u, u.__data__, s, r) + "", l.has(v) ? a[s] = u : l.set(v, u));
  for (s = 0; s < f; ++s)
    v = o.call(t, i[s], s, i) + "", (u = l.get(v)) ? (n[s] = u, u.__data__ = i[s], l.delete(v)) : e[s] = new Es(t, i[s]);
  for (s = 0; s < c; ++s)
    (u = r[s]) && l.get(h[s]) === u && (a[s] = u);
}
function __(t) {
  return t.__data__;
}
function C_(t, r) {
  if (!arguments.length)
    return Array.from(this, __);
  var e = r ? R_ : A_, n = this._parents, a = this._groups;
  typeof t != "function" && (t = O_(t));
  for (var i = a.length, o = new Array(i), s = new Array(i), u = new Array(i), l = 0; l < i; ++l) {
    var c = n[l], f = a[l], h = f.length, v = P_(t.call(c, c && c.__data__, l, n)), d = v.length, $ = s[l] = new Array(d), y = o[l] = new Array(d), p = u[l] = new Array(h);
    e(c, f, $, y, p, v, r);
    for (var b = 0, I = 0, _, M; b < d; ++b)
      if (_ = $[b]) {
        for (b >= I && (I = b + 1); !(M = y[I]) && ++I < d; )
          ;
        _._next = M || null;
      }
  }
  return o = new At(o, n), o._enter = s, o._exit = u, o;
}
function P_(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function M_() {
  return new At(this._exit || this._groups.map(wS), this._parents);
}
function N_(t, r, e) {
  var n = this.enter(), a = this, i = this.exit();
  return typeof t == "function" ? (n = t(n), n && (n = n.selection())) : n = n.append(t + ""), r != null && (a = r(a), a && (a = a.selection())), e == null ? i.remove() : e(i), n && a ? n.merge(a).order() : a;
}
function D_(t) {
  for (var r = t.selection ? t.selection() : t, e = this._groups, n = r._groups, a = e.length, i = n.length, o = Math.min(a, i), s = new Array(a), u = 0; u < o; ++u)
    for (var l = e[u], c = n[u], f = l.length, h = s[u] = new Array(f), v, d = 0; d < f; ++d)
      (v = l[d] || c[d]) && (h[d] = v);
  for (; u < a; ++u)
    s[u] = e[u];
  return new At(s, this._parents);
}
function L_() {
  for (var t = this._groups, r = -1, e = t.length; ++r < e; )
    for (var n = t[r], a = n.length - 1, i = n[a], o; --a >= 0; )
      (o = n[a]) && (i && o.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(o, i), i = o);
  return this;
}
function F_(t) {
  t || (t = k_);
  function r(f, h) {
    return f && h ? t(f.__data__, h.__data__) : !f - !h;
  }
  for (var e = this._groups, n = e.length, a = new Array(n), i = 0; i < n; ++i) {
    for (var o = e[i], s = o.length, u = a[i] = new Array(s), l, c = 0; c < s; ++c)
      (l = o[c]) && (u[c] = l);
    u.sort(r);
  }
  return new At(a, this._parents).order();
}
function k_(t, r) {
  return t < r ? -1 : t > r ? 1 : t >= r ? 0 : NaN;
}
function B_() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function j_() {
  return Array.from(this);
}
function U_() {
  for (var t = this._groups, r = 0, e = t.length; r < e; ++r)
    for (var n = t[r], a = 0, i = n.length; a < i; ++a) {
      var o = n[a];
      if (o)
        return o;
    }
  return null;
}
function z_() {
  let t = 0;
  for (const r of this)
    ++t;
  return t;
}
function V_() {
  return !this.node();
}
function H_(t) {
  for (var r = this._groups, e = 0, n = r.length; e < n; ++e)
    for (var a = r[e], i = 0, o = a.length, s; i < o; ++i)
      (s = a[i]) && t.call(s, s.__data__, i, a);
  return this;
}
function G_(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function W_(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function q_(t, r) {
  return function() {
    this.setAttribute(t, r);
  };
}
function Y_(t, r) {
  return function() {
    this.setAttributeNS(t.space, t.local, r);
  };
}
function K_(t, r) {
  return function() {
    var e = r.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function X_(t, r) {
  return function() {
    var e = r.apply(this, arguments);
    e == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
  };
}
function J_(t, r) {
  var e = hu(t);
  if (arguments.length < 2) {
    var n = this.node();
    return e.local ? n.getAttributeNS(e.space, e.local) : n.getAttribute(e);
  }
  return this.each((r == null ? e.local ? W_ : G_ : typeof r == "function" ? e.local ? X_ : K_ : e.local ? Y_ : q_)(e, r));
}
function SS(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Z_(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Q_(t, r, e) {
  return function() {
    this.style.setProperty(t, r, e);
  };
}
function tC(t, r, e) {
  return function() {
    var n = r.apply(this, arguments);
    n == null ? this.style.removeProperty(t) : this.style.setProperty(t, n, e);
  };
}
function rC(t, r, e) {
  return arguments.length > 1 ? this.each((r == null ? Z_ : typeof r == "function" ? tC : Q_)(t, r, e ?? "")) : Bn(this.node(), t);
}
function Bn(t, r) {
  return t.style.getPropertyValue(r) || SS(t).getComputedStyle(t, null).getPropertyValue(r);
}
function eC(t) {
  return function() {
    delete this[t];
  };
}
function nC(t, r) {
  return function() {
    this[t] = r;
  };
}
function aC(t, r) {
  return function() {
    var e = r.apply(this, arguments);
    e == null ? delete this[t] : this[t] = e;
  };
}
function iC(t, r) {
  return arguments.length > 1 ? this.each((r == null ? eC : typeof r == "function" ? aC : nC)(t, r)) : this.node()[t];
}
function xS(t) {
  return t.trim().split(/^|\s+/);
}
function Pv(t) {
  return t.classList || new ES(t);
}
function ES(t) {
  this._node = t, this._names = xS(t.getAttribute("class") || "");
}
ES.prototype = {
  add: function(t) {
    var r = this._names.indexOf(t);
    r < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var r = this._names.indexOf(t);
    r >= 0 && (this._names.splice(r, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function TS(t, r) {
  for (var e = Pv(t), n = -1, a = r.length; ++n < a; )
    e.add(r[n]);
}
function IS(t, r) {
  for (var e = Pv(t), n = -1, a = r.length; ++n < a; )
    e.remove(r[n]);
}
function oC(t) {
  return function() {
    TS(this, t);
  };
}
function sC(t) {
  return function() {
    IS(this, t);
  };
}
function uC(t, r) {
  return function() {
    (r.apply(this, arguments) ? TS : IS)(this, t);
  };
}
function lC(t, r) {
  var e = xS(t + "");
  if (arguments.length < 2) {
    for (var n = Pv(this.node()), a = -1, i = e.length; ++a < i; )
      if (!n.contains(e[a]))
        return !1;
    return !0;
  }
  return this.each((typeof r == "function" ? uC : r ? oC : sC)(e, r));
}
function cC() {
  this.textContent = "";
}
function fC(t) {
  return function() {
    this.textContent = t;
  };
}
function hC(t) {
  return function() {
    var r = t.apply(this, arguments);
    this.textContent = r ?? "";
  };
}
function vC(t) {
  return arguments.length ? this.each(t == null ? cC : (typeof t == "function" ? hC : fC)(t)) : this.node().textContent;
}
function dC() {
  this.innerHTML = "";
}
function gC(t) {
  return function() {
    this.innerHTML = t;
  };
}
function pC(t) {
  return function() {
    var r = t.apply(this, arguments);
    this.innerHTML = r ?? "";
  };
}
function $C(t) {
  return arguments.length ? this.each(t == null ? dC : (typeof t == "function" ? pC : gC)(t)) : this.node().innerHTML;
}
function yC() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function mC() {
  return this.each(yC);
}
function bC() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function wC() {
  return this.each(bC);
}
function SC(t) {
  var r = typeof t == "function" ? t : pS(t);
  return this.select(function() {
    return this.appendChild(r.apply(this, arguments));
  });
}
function xC() {
  return null;
}
function EC(t, r) {
  var e = typeof t == "function" ? t : pS(t), n = r == null ? xC : typeof r == "function" ? r : Cv(r);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function TC() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function IC() {
  return this.each(TC);
}
function OC() {
  var t = this.cloneNode(!1), r = this.parentNode;
  return r ? r.insertBefore(t, this.nextSibling) : t;
}
function AC() {
  var t = this.cloneNode(!0), r = this.parentNode;
  return r ? r.insertBefore(t, this.nextSibling) : t;
}
function RC(t) {
  return this.select(t ? AC : OC);
}
function _C(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function CC(t) {
  return function(r) {
    t.call(this, r, this.__data__);
  };
}
function PC(t) {
  return t.trim().split(/^|\s+/).map(function(r) {
    var e = "", n = r.indexOf(".");
    return n >= 0 && (e = r.slice(n + 1), r = r.slice(0, n)), { type: r, name: e };
  });
}
function MC(t) {
  return function() {
    var r = this.__on;
    if (r) {
      for (var e = 0, n = -1, a = r.length, i; e < a; ++e)
        i = r[e], (!t.type || i.type === t.type) && i.name === t.name ? this.removeEventListener(i.type, i.listener, i.options) : r[++n] = i;
      ++n ? r.length = n : delete this.__on;
    }
  };
}
function NC(t, r, e) {
  return function() {
    var n = this.__on, a, i = CC(r);
    if (n) {
      for (var o = 0, s = n.length; o < s; ++o)
        if ((a = n[o]).type === t.type && a.name === t.name) {
          this.removeEventListener(a.type, a.listener, a.options), this.addEventListener(a.type, a.listener = i, a.options = e), a.value = r;
          return;
        }
    }
    this.addEventListener(t.type, i, e), a = { type: t.type, name: t.name, value: r, listener: i, options: e }, n ? n.push(a) : this.__on = [a];
  };
}
function DC(t, r, e) {
  var n = PC(t + ""), a, i = n.length, o;
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
  for (s = r ? NC : MC, a = 0; a < i; ++a)
    this.each(s(n[a], r, e));
  return this;
}
function OS(t, r, e) {
  var n = SS(t), a = n.CustomEvent;
  typeof a == "function" ? a = new a(r, e) : (a = n.document.createEvent("Event"), e ? (a.initEvent(r, e.bubbles, e.cancelable), a.detail = e.detail) : a.initEvent(r, !1, !1)), t.dispatchEvent(a);
}
function LC(t, r) {
  return function() {
    return OS(this, t, r);
  };
}
function FC(t, r) {
  return function() {
    return OS(this, t, r.apply(this, arguments));
  };
}
function kC(t, r) {
  return this.each((typeof r == "function" ? FC : LC)(t, r));
}
function* BC() {
  for (var t = this._groups, r = 0, e = t.length; r < e; ++r)
    for (var n = t[r], a = 0, i = n.length, o; a < i; ++a)
      (o = n[a]) && (yield o);
}
var Mv = [null];
function At(t, r) {
  this._groups = t, this._parents = r;
}
function wi() {
  return new At([[document.documentElement]], Mv);
}
function jC() {
  return this;
}
At.prototype = wi.prototype = {
  constructor: At,
  select: v_,
  selectAll: p_,
  selectChild: b_,
  selectChildren: E_,
  filter: T_,
  data: C_,
  enter: I_,
  exit: M_,
  join: N_,
  merge: D_,
  selection: jC,
  order: L_,
  sort: F_,
  call: B_,
  nodes: j_,
  node: U_,
  size: z_,
  empty: V_,
  each: H_,
  attr: J_,
  style: rC,
  property: iC,
  classed: lC,
  text: vC,
  html: $C,
  raise: mC,
  lower: wC,
  append: SC,
  insert: EC,
  remove: IC,
  clone: RC,
  datum: _C,
  on: DC,
  dispatch: kC,
  [Symbol.iterator]: BC
};
function dt(t) {
  return typeof t == "string" ? new At([[document.querySelector(t)]], [document.documentElement]) : new At([[t]], Mv);
}
function UC(t) {
  let r;
  for (; r = t.sourceEvent; )
    t = r;
  return t;
}
function we(t, r) {
  if (t = UC(t), r === void 0 && (r = t.currentTarget), r) {
    var e = r.ownerSVGElement || r;
    if (e.createSVGPoint) {
      var n = e.createSVGPoint();
      return n.x = t.clientX, n.y = t.clientY, n = n.matrixTransform(r.getScreenCTM().inverse()), [n.x, n.y];
    }
    if (r.getBoundingClientRect) {
      var a = r.getBoundingClientRect();
      return [t.clientX - a.left - r.clientLeft, t.clientY - a.top - r.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
function nn(t) {
  return typeof t == "string" ? new At([document.querySelectorAll(t)], [document.documentElement]) : new At([$S(t)], Mv);
}
const Xf = { capture: !0, passive: !1 };
function Jf(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function zC(t) {
  var r = t.document.documentElement, e = dt(t).on("dragstart.drag", Jf, Xf);
  "onselectstart" in r ? e.on("selectstart.drag", Jf, Xf) : (r.__noselect = r.style.MozUserSelect, r.style.MozUserSelect = "none");
}
function VC(t, r) {
  var e = t.document.documentElement, n = dt(t).on("dragstart.drag", null);
  r && (n.on("click.drag", Jf, Xf), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in e ? n.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect);
}
function Si(t, r, e) {
  t.prototype = r.prototype = e, e.constructor = t;
}
function vu(t, r) {
  var e = Object.create(t.prototype);
  for (var n in r)
    e[n] = r[n];
  return e;
}
function He() {
}
var oi = 0.7, Ts = 1 / oi, An = "\\s*([+-]?\\d+)\\s*", si = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ir = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", HC = /^#([0-9a-f]{3,8})$/, GC = new RegExp(`^rgb\\(${An},${An},${An}\\)$`), WC = new RegExp(`^rgb\\(${Ir},${Ir},${Ir}\\)$`), qC = new RegExp(`^rgba\\(${An},${An},${An},${si}\\)$`), YC = new RegExp(`^rgba\\(${Ir},${Ir},${Ir},${si}\\)$`), KC = new RegExp(`^hsl\\(${si},${Ir},${Ir}\\)$`), XC = new RegExp(`^hsla\\(${si},${Ir},${Ir},${si}\\)$`), ap = {
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
Si(He, ke, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ip,
  // Deprecated! Use color.formatHex.
  formatHex: ip,
  formatHex8: JC,
  formatHsl: ZC,
  formatRgb: op,
  toString: op
});
function ip() {
  return this.rgb().formatHex();
}
function JC() {
  return this.rgb().formatHex8();
}
function ZC() {
  return RS(this).formatHsl();
}
function op() {
  return this.rgb().formatRgb();
}
function ke(t) {
  var r, e;
  return t = (t + "").trim().toLowerCase(), (r = HC.exec(t)) ? (e = r[1].length, r = parseInt(r[1], 16), e === 6 ? sp(r) : e === 3 ? new St(r >> 8 & 15 | r >> 4 & 240, r >> 4 & 15 | r & 240, (r & 15) << 4 | r & 15, 1) : e === 8 ? eo(r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, (r & 255) / 255) : e === 4 ? eo(r >> 12 & 15 | r >> 8 & 240, r >> 8 & 15 | r >> 4 & 240, r >> 4 & 15 | r & 240, ((r & 15) << 4 | r & 15) / 255) : null) : (r = GC.exec(t)) ? new St(r[1], r[2], r[3], 1) : (r = WC.exec(t)) ? new St(r[1] * 255 / 100, r[2] * 255 / 100, r[3] * 255 / 100, 1) : (r = qC.exec(t)) ? eo(r[1], r[2], r[3], r[4]) : (r = YC.exec(t)) ? eo(r[1] * 255 / 100, r[2] * 255 / 100, r[3] * 255 / 100, r[4]) : (r = KC.exec(t)) ? cp(r[1], r[2] / 100, r[3] / 100, 1) : (r = XC.exec(t)) ? cp(r[1], r[2] / 100, r[3] / 100, r[4]) : ap.hasOwnProperty(t) ? sp(ap[t]) : t === "transparent" ? new St(NaN, NaN, NaN, 0) : null;
}
function sp(t) {
  return new St(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function eo(t, r, e, n) {
  return n <= 0 && (t = r = e = NaN), new St(t, r, e, n);
}
function AS(t) {
  return t instanceof He || (t = ke(t)), t ? (t = t.rgb(), new St(t.r, t.g, t.b, t.opacity)) : new St();
}
function ui(t, r, e, n) {
  return arguments.length === 1 ? AS(t) : new St(t, r, e, n ?? 1);
}
function St(t, r, e, n) {
  this.r = +t, this.g = +r, this.b = +e, this.opacity = +n;
}
Si(St, ui, vu(He, {
  brighter(t) {
    return t = t == null ? Ts : Math.pow(Ts, t), new St(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? oi : Math.pow(oi, t), new St(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new St(Ne(this.r), Ne(this.g), Ne(this.b), Is(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: up,
  // Deprecated! Use color.formatHex.
  formatHex: up,
  formatHex8: QC,
  formatRgb: lp,
  toString: lp
}));
function up() {
  return `#${Me(this.r)}${Me(this.g)}${Me(this.b)}`;
}
function QC() {
  return `#${Me(this.r)}${Me(this.g)}${Me(this.b)}${Me((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function lp() {
  const t = Is(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Ne(this.r)}, ${Ne(this.g)}, ${Ne(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Is(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Ne(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Me(t) {
  return t = Ne(t), (t < 16 ? "0" : "") + t.toString(16);
}
function cp(t, r, e, n) {
  return n <= 0 ? t = r = e = NaN : e <= 0 || e >= 1 ? t = r = NaN : r <= 0 && (t = NaN), new cr(t, r, e, n);
}
function RS(t) {
  if (t instanceof cr)
    return new cr(t.h, t.s, t.l, t.opacity);
  if (t instanceof He || (t = ke(t)), !t)
    return new cr();
  if (t instanceof cr)
    return t;
  t = t.rgb();
  var r = t.r / 255, e = t.g / 255, n = t.b / 255, a = Math.min(r, e, n), i = Math.max(r, e, n), o = NaN, s = i - a, u = (i + a) / 2;
  return s ? (r === i ? o = (e - n) / s + (e < n) * 6 : e === i ? o = (n - r) / s + 2 : o = (r - e) / s + 4, s /= u < 0.5 ? i + a : 2 - i - a, o *= 60) : s = u > 0 && u < 1 ? 0 : o, new cr(o, s, u, t.opacity);
}
function ja(t, r, e, n) {
  return arguments.length === 1 ? RS(t) : new cr(t, r, e, n ?? 1);
}
function cr(t, r, e, n) {
  this.h = +t, this.s = +r, this.l = +e, this.opacity = +n;
}
Si(cr, ja, vu(He, {
  brighter(t) {
    return t = t == null ? Ts : Math.pow(Ts, t), new cr(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? oi : Math.pow(oi, t), new cr(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, r = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l, n = e + (e < 0.5 ? e : 1 - e) * r, a = 2 * e - n;
    return new St(
      Tl(t >= 240 ? t - 240 : t + 120, a, n),
      Tl(t, a, n),
      Tl(t < 120 ? t + 240 : t - 120, a, n),
      this.opacity
    );
  },
  clamp() {
    return new cr(fp(this.h), no(this.s), no(this.l), Is(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Is(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${fp(this.h)}, ${no(this.s) * 100}%, ${no(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function fp(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function no(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Tl(t, r, e) {
  return (t < 60 ? r + (e - r) * t / 60 : t < 180 ? e : t < 240 ? r + (e - r) * (240 - t) / 60 : r) * 255;
}
const t2 = Math.PI / 180, r2 = 180 / Math.PI, Os = 18, _S = 0.96422, CS = 1, PS = 0.82521, MS = 4 / 29, Rn = 6 / 29, NS = 3 * Rn * Rn, e2 = Rn * Rn * Rn;
function DS(t) {
  if (t instanceof Or)
    return new Or(t.l, t.a, t.b, t.opacity);
  if (t instanceof jr)
    return LS(t);
  t instanceof St || (t = AS(t));
  var r = Rl(t.r), e = Rl(t.g), n = Rl(t.b), a = Il((0.2225045 * r + 0.7168786 * e + 0.0606169 * n) / CS), i, o;
  return r === e && e === n ? i = o = a : (i = Il((0.4360747 * r + 0.3850649 * e + 0.1430804 * n) / _S), o = Il((0.0139322 * r + 0.0971045 * e + 0.7141733 * n) / PS)), new Or(116 * a - 16, 500 * (i - a), 200 * (a - o), t.opacity);
}
function Be(t, r, e, n) {
  return arguments.length === 1 ? DS(t) : new Or(t, r, e, n ?? 1);
}
function Or(t, r, e, n) {
  this.l = +t, this.a = +r, this.b = +e, this.opacity = +n;
}
Si(Or, Be, vu(He, {
  brighter(t) {
    return new Or(this.l + Os * (t ?? 1), this.a, this.b, this.opacity);
  },
  darker(t) {
    return new Or(this.l - Os * (t ?? 1), this.a, this.b, this.opacity);
  },
  rgb() {
    var t = (this.l + 16) / 116, r = isNaN(this.a) ? t : t + this.a / 500, e = isNaN(this.b) ? t : t - this.b / 200;
    return r = _S * Ol(r), t = CS * Ol(t), e = PS * Ol(e), new St(
      Al(3.1338561 * r - 1.6168667 * t - 0.4906146 * e),
      Al(-0.9787684 * r + 1.9161415 * t + 0.033454 * e),
      Al(0.0719453 * r - 0.2289914 * t + 1.4052427 * e),
      this.opacity
    );
  }
}));
function Il(t) {
  return t > e2 ? Math.pow(t, 1 / 3) : t / NS + MS;
}
function Ol(t) {
  return t > Rn ? t * t * t : NS * (t - MS);
}
function Al(t) {
  return 255 * (t <= 31308e-7 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055);
}
function Rl(t) {
  return (t /= 255) <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
}
function n2(t) {
  if (t instanceof jr)
    return new jr(t.h, t.c, t.l, t.opacity);
  if (t instanceof Or || (t = DS(t)), t.a === 0 && t.b === 0)
    return new jr(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
  var r = Math.atan2(t.b, t.a) * r2;
  return new jr(r < 0 ? r + 360 : r, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity);
}
function a2(t, r, e, n) {
  return arguments.length === 1 ? n2(t) : new jr(t, r, e, n ?? 1);
}
function jr(t, r, e, n) {
  this.h = +t, this.c = +r, this.l = +e, this.opacity = +n;
}
function LS(t) {
  if (isNaN(t.h))
    return new Or(t.l, 0, 0, t.opacity);
  var r = t.h * t2;
  return new Or(t.l, Math.cos(r) * t.c, Math.sin(r) * t.c, t.opacity);
}
Si(jr, a2, vu(He, {
  brighter(t) {
    return new jr(this.h, this.c, this.l + Os * (t ?? 1), this.opacity);
  },
  darker(t) {
    return new jr(this.h, this.c, this.l - Os * (t ?? 1), this.opacity);
  },
  rgb() {
    return LS(this).rgb();
  }
}));
const Nv = (t) => () => t;
function i2(t, r) {
  return function(e) {
    return t + e * r;
  };
}
function o2(t, r, e) {
  return t = Math.pow(t, e), r = Math.pow(r, e) - t, e = 1 / e, function(n) {
    return Math.pow(t + n * r, e);
  };
}
function s2(t) {
  return (t = +t) == 1 ? bn : function(r, e) {
    return e - r ? o2(r, e, t) : Nv(isNaN(r) ? e : r);
  };
}
function bn(t, r) {
  var e = r - t;
  return e ? i2(t, e) : Nv(isNaN(t) ? r : t);
}
const As = function t(r) {
  var e = s2(r);
  function n(a, i) {
    var o = e((a = ui(a)).r, (i = ui(i)).r), s = e(a.g, i.g), u = e(a.b, i.b), l = bn(a.opacity, i.opacity);
    return function(c) {
      return a.r = o(c), a.g = s(c), a.b = u(c), a.opacity = l(c), a + "";
    };
  }
  return n.gamma = t, n;
}(1);
function u2(t, r) {
  r || (r = []);
  var e = t ? Math.min(r.length, t.length) : 0, n = r.slice(), a;
  return function(i) {
    for (a = 0; a < e; ++a)
      n[a] = t[a] * (1 - i) + r[a] * i;
    return n;
  };
}
function l2(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function c2(t, r) {
  var e = r ? r.length : 0, n = t ? Math.min(e, t.length) : 0, a = new Array(n), i = new Array(e), o;
  for (o = 0; o < n; ++o)
    a[o] = _n(t[o], r[o]);
  for (; o < e; ++o)
    i[o] = r[o];
  return function(s) {
    for (o = 0; o < n; ++o)
      i[o] = a[o](s);
    return i;
  };
}
function f2(t, r) {
  var e = /* @__PURE__ */ new Date();
  return t = +t, r = +r, function(n) {
    return e.setTime(t * (1 - n) + r * n), e;
  };
}
function ur(t, r) {
  return t = +t, r = +r, function(e) {
    return t * (1 - e) + r * e;
  };
}
function h2(t, r) {
  var e = {}, n = {}, a;
  (t === null || typeof t != "object") && (t = {}), (r === null || typeof r != "object") && (r = {});
  for (a in r)
    a in t ? e[a] = _n(t[a], r[a]) : n[a] = r[a];
  return function(i) {
    for (a in e)
      n[a] = e[a](i);
    return n;
  };
}
var Zf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, _l = new RegExp(Zf.source, "g");
function v2(t) {
  return function() {
    return t;
  };
}
function d2(t) {
  return function(r) {
    return t(r) + "";
  };
}
function FS(t, r) {
  var e = Zf.lastIndex = _l.lastIndex = 0, n, a, i, o = -1, s = [], u = [];
  for (t = t + "", r = r + ""; (n = Zf.exec(t)) && (a = _l.exec(r)); )
    (i = a.index) > e && (i = r.slice(e, i), s[o] ? s[o] += i : s[++o] = i), (n = n[0]) === (a = a[0]) ? s[o] ? s[o] += a : s[++o] = a : (s[++o] = null, u.push({ i: o, x: ur(n, a) })), e = _l.lastIndex;
  return e < r.length && (i = r.slice(e), s[o] ? s[o] += i : s[++o] = i), s.length < 2 ? u[0] ? d2(u[0].x) : v2(r) : (r = u.length, function(l) {
    for (var c = 0, f; c < r; ++c)
      s[(f = u[c]).i] = f.x(l);
    return s.join("");
  });
}
function _n(t, r) {
  var e = typeof r, n;
  return r == null || e === "boolean" ? Nv(r) : (e === "number" ? ur : e === "string" ? (n = ke(r)) ? (r = n, As) : FS : r instanceof ke ? As : r instanceof Date ? f2 : l2(r) ? u2 : Array.isArray(r) ? c2 : typeof r.valueOf != "function" && typeof r.toString != "function" || isNaN(r) ? h2 : ur)(t, r);
}
function g2(t, r) {
  return t = +t, r = +r, function(e) {
    return Math.round(t * (1 - e) + r * e);
  };
}
var hp = 180 / Math.PI, Qf = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function kS(t, r, e, n, a, i) {
  var o, s, u;
  return (o = Math.sqrt(t * t + r * r)) && (t /= o, r /= o), (u = t * e + r * n) && (e -= t * u, n -= r * u), (s = Math.sqrt(e * e + n * n)) && (e /= s, n /= s, u /= s), t * n < r * e && (t = -t, r = -r, u = -u, o = -o), {
    translateX: a,
    translateY: i,
    rotate: Math.atan2(r, t) * hp,
    skewX: Math.atan(u) * hp,
    scaleX: o,
    scaleY: s
  };
}
var ao;
function p2(t) {
  const r = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return r.isIdentity ? Qf : kS(r.a, r.b, r.c, r.d, r.e, r.f);
}
function $2(t) {
  return t == null || (ao || (ao = document.createElementNS("http://www.w3.org/2000/svg", "g")), ao.setAttribute("transform", t), !(t = ao.transform.baseVal.consolidate())) ? Qf : (t = t.matrix, kS(t.a, t.b, t.c, t.d, t.e, t.f));
}
function BS(t, r, e, n) {
  function a(l) {
    return l.length ? l.pop() + " " : "";
  }
  function i(l, c, f, h, v, d) {
    if (l !== f || c !== h) {
      var $ = v.push("translate(", null, r, null, e);
      d.push({ i: $ - 4, x: ur(l, f) }, { i: $ - 2, x: ur(c, h) });
    } else
      (f || h) && v.push("translate(" + f + r + h + e);
  }
  function o(l, c, f, h) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), h.push({ i: f.push(a(f) + "rotate(", null, n) - 2, x: ur(l, c) })) : c && f.push(a(f) + "rotate(" + c + n);
  }
  function s(l, c, f, h) {
    l !== c ? h.push({ i: f.push(a(f) + "skewX(", null, n) - 2, x: ur(l, c) }) : c && f.push(a(f) + "skewX(" + c + n);
  }
  function u(l, c, f, h, v, d) {
    if (l !== f || c !== h) {
      var $ = v.push(a(v) + "scale(", null, ",", null, ")");
      d.push({ i: $ - 4, x: ur(l, f) }, { i: $ - 2, x: ur(c, h) });
    } else
      (f !== 1 || h !== 1) && v.push(a(v) + "scale(" + f + "," + h + ")");
  }
  return function(l, c) {
    var f = [], h = [];
    return l = t(l), c = t(c), i(l.translateX, l.translateY, c.translateX, c.translateY, f, h), o(l.rotate, c.rotate, f, h), s(l.skewX, c.skewX, f, h), u(l.scaleX, l.scaleY, c.scaleX, c.scaleY, f, h), l = c = null, function(v) {
      for (var d = -1, $ = h.length, y; ++d < $; )
        f[(y = h[d]).i] = y.x(v);
      return f.join("");
    };
  };
}
var y2 = BS(p2, "px, ", "px)", "deg)"), m2 = BS($2, ", ", ")", ")"), b2 = 1e-12;
function vp(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function w2(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function S2(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const x2 = function t(r, e, n) {
  function a(i, o) {
    var s = i[0], u = i[1], l = i[2], c = o[0], f = o[1], h = o[2], v = c - s, d = f - u, $ = v * v + d * d, y, p;
    if ($ < b2)
      p = Math.log(h / l) / r, y = function(H) {
        return [
          s + H * v,
          u + H * d,
          l * Math.exp(r * H * p)
        ];
      };
    else {
      var b = Math.sqrt($), I = (h * h - l * l + n * $) / (2 * l * e * b), _ = (h * h - l * l - n * $) / (2 * h * e * b), M = Math.log(Math.sqrt(I * I + 1) - I), B = Math.log(Math.sqrt(_ * _ + 1) - _);
      p = (B - M) / r, y = function(H) {
        var q = H * p, Z = vp(M), nt = l / (e * b) * (Z * S2(r * q + M) - w2(M));
        return [
          s + nt * v,
          u + nt * d,
          l * Z / vp(r * q + M)
        ];
      };
    }
    return y.duration = p * 1e3 * r / Math.SQRT2, y;
  }
  return a.rho = function(i) {
    var o = Math.max(1e-3, +i), s = o * o, u = s * s;
    return t(o, s, u);
  }, a;
}(Math.SQRT2, 2, 4);
function Dv(t, r) {
  var e = bn((t = Be(t)).l, (r = Be(r)).l), n = bn(t.a, r.a), a = bn(t.b, r.b), i = bn(t.opacity, r.opacity);
  return function(o) {
    return t.l = e(o), t.a = n(o), t.b = a(o), t.opacity = i(o), t + "";
  };
}
var jn = 0, Ua = 0, ba = 0, jS = 1e3, Rs, za, _s = 0, je = 0, du = 0, li = typeof performance == "object" && performance.now ? performance : Date, US = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Lv() {
  return je || (US(E2), je = li.now() + du);
}
function E2() {
  je = 0;
}
function Cs() {
  this._call = this._time = this._next = null;
}
Cs.prototype = zS.prototype = {
  constructor: Cs,
  restart: function(t, r, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    e = (e == null ? Lv() : +e) + (r == null ? 0 : +r), !this._next && za !== this && (za ? za._next = this : Rs = this, za = this), this._call = t, this._time = e, th();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, th());
  }
};
function zS(t, r, e) {
  var n = new Cs();
  return n.restart(t, r, e), n;
}
function T2() {
  Lv(), ++jn;
  for (var t = Rs, r; t; )
    (r = je - t._time) >= 0 && t._call.call(void 0, r), t = t._next;
  --jn;
}
function dp() {
  je = (_s = li.now()) + du, jn = Ua = 0;
  try {
    T2();
  } finally {
    jn = 0, O2(), je = 0;
  }
}
function I2() {
  var t = li.now(), r = t - _s;
  r > jS && (du -= r, _s = t);
}
function O2() {
  for (var t, r = Rs, e, n = 1 / 0; r; )
    r._call ? (n > r._time && (n = r._time), t = r, r = r._next) : (e = r._next, r._next = null, r = t ? t._next = e : Rs = e);
  za = t, th(n);
}
function th(t) {
  if (!jn) {
    Ua && (Ua = clearTimeout(Ua));
    var r = t - je;
    r > 24 ? (t < 1 / 0 && (Ua = setTimeout(dp, t - li.now() - du)), ba && (ba = clearInterval(ba))) : (ba || (_s = li.now(), ba = setInterval(I2, jS)), jn = 1, US(dp));
  }
}
function gp(t, r, e) {
  var n = new Cs();
  return r = r == null ? 0 : +r, n.restart((a) => {
    n.stop(), t(a + r);
  }, r, e), n;
}
var A2 = _v("start", "end", "cancel", "interrupt"), R2 = [], VS = 0, pp = 1, rh = 2, es = 3, $p = 4, eh = 5, ns = 6;
function gu(t, r, e, n, a, i) {
  var o = t.__transition;
  if (!o)
    t.__transition = {};
  else if (e in o)
    return;
  _2(t, e, {
    name: r,
    index: n,
    // For context during callback.
    group: a,
    // For context during callback.
    on: A2,
    tween: R2,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: VS
  });
}
function Fv(t, r) {
  var e = dr(t, r);
  if (e.state > VS)
    throw new Error("too late; already scheduled");
  return e;
}
function Rr(t, r) {
  var e = dr(t, r);
  if (e.state > es)
    throw new Error("too late; already running");
  return e;
}
function dr(t, r) {
  var e = t.__transition;
  if (!e || !(e = e[r]))
    throw new Error("transition not found");
  return e;
}
function _2(t, r, e) {
  var n = t.__transition, a;
  n[r] = e, e.timer = zS(i, 0, e.time);
  function i(l) {
    e.state = pp, e.timer.restart(o, e.delay, e.time), e.delay <= l && o(l - e.delay);
  }
  function o(l) {
    var c, f, h, v;
    if (e.state !== pp)
      return u();
    for (c in n)
      if (v = n[c], v.name === e.name) {
        if (v.state === es)
          return gp(o);
        v.state === $p ? (v.state = ns, v.timer.stop(), v.on.call("interrupt", t, t.__data__, v.index, v.group), delete n[c]) : +c < r && (v.state = ns, v.timer.stop(), v.on.call("cancel", t, t.__data__, v.index, v.group), delete n[c]);
      }
    if (gp(function() {
      e.state === es && (e.state = $p, e.timer.restart(s, e.delay, e.time), s(l));
    }), e.state = rh, e.on.call("start", t, t.__data__, e.index, e.group), e.state === rh) {
      for (e.state = es, a = new Array(h = e.tween.length), c = 0, f = -1; c < h; ++c)
        (v = e.tween[c].value.call(t, t.__data__, e.index, e.group)) && (a[++f] = v);
      a.length = f + 1;
    }
  }
  function s(l) {
    for (var c = l < e.duration ? e.ease.call(null, l / e.duration) : (e.timer.restart(u), e.state = eh, 1), f = -1, h = a.length; ++f < h; )
      a[f].call(t, c);
    e.state === eh && (e.on.call("end", t, t.__data__, e.index, e.group), u());
  }
  function u() {
    e.state = ns, e.timer.stop(), delete n[r];
    for (var l in n)
      return;
    delete t.__transition;
  }
}
function as(t, r) {
  var e = t.__transition, n, a, i = !0, o;
  if (e) {
    r = r == null ? null : r + "";
    for (o in e) {
      if ((n = e[o]).name !== r) {
        i = !1;
        continue;
      }
      a = n.state > rh && n.state < eh, n.state = ns, n.timer.stop(), n.on.call(a ? "interrupt" : "cancel", t, t.__data__, n.index, n.group), delete e[o];
    }
    i && delete t.__transition;
  }
}
function C2(t) {
  return this.each(function() {
    as(this, t);
  });
}
function P2(t, r) {
  var e, n;
  return function() {
    var a = Rr(this, t), i = a.tween;
    if (i !== e) {
      n = e = i;
      for (var o = 0, s = n.length; o < s; ++o)
        if (n[o].name === r) {
          n = n.slice(), n.splice(o, 1);
          break;
        }
    }
    a.tween = n;
  };
}
function M2(t, r, e) {
  var n, a;
  if (typeof e != "function")
    throw new Error();
  return function() {
    var i = Rr(this, t), o = i.tween;
    if (o !== n) {
      a = (n = o).slice();
      for (var s = { name: r, value: e }, u = 0, l = a.length; u < l; ++u)
        if (a[u].name === r) {
          a[u] = s;
          break;
        }
      u === l && a.push(s);
    }
    i.tween = a;
  };
}
function N2(t, r) {
  var e = this._id;
  if (t += "", arguments.length < 2) {
    for (var n = dr(this.node(), e).tween, a = 0, i = n.length, o; a < i; ++a)
      if ((o = n[a]).name === t)
        return o.value;
    return null;
  }
  return this.each((r == null ? P2 : M2)(e, t, r));
}
function kv(t, r, e) {
  var n = t._id;
  return t.each(function() {
    var a = Rr(this, n);
    (a.value || (a.value = {}))[r] = e.apply(this, arguments);
  }), function(a) {
    return dr(a, n).value[r];
  };
}
function HS(t, r) {
  var e;
  return (typeof r == "number" ? ur : r instanceof ke ? As : (e = ke(r)) ? (r = e, As) : FS)(t, r);
}
function D2(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function L2(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function F2(t, r, e) {
  var n, a = e + "", i;
  return function() {
    var o = this.getAttribute(t);
    return o === a ? null : o === n ? i : i = r(n = o, e);
  };
}
function k2(t, r, e) {
  var n, a = e + "", i;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === a ? null : o === n ? i : i = r(n = o, e);
  };
}
function B2(t, r, e) {
  var n, a, i;
  return function() {
    var o, s = e(this), u;
    return s == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), u = s + "", o === u ? null : o === n && u === a ? i : (a = u, i = r(n = o, s)));
  };
}
function j2(t, r, e) {
  var n, a, i;
  return function() {
    var o, s = e(this), u;
    return s == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), u = s + "", o === u ? null : o === n && u === a ? i : (a = u, i = r(n = o, s)));
  };
}
function U2(t, r) {
  var e = hu(t), n = e === "transform" ? m2 : HS;
  return this.attrTween(t, typeof r == "function" ? (e.local ? j2 : B2)(e, n, kv(this, "attr." + t, r)) : r == null ? (e.local ? L2 : D2)(e) : (e.local ? k2 : F2)(e, n, r));
}
function z2(t, r) {
  return function(e) {
    this.setAttribute(t, r.call(this, e));
  };
}
function V2(t, r) {
  return function(e) {
    this.setAttributeNS(t.space, t.local, r.call(this, e));
  };
}
function H2(t, r) {
  var e, n;
  function a() {
    var i = r.apply(this, arguments);
    return i !== n && (e = (n = i) && V2(t, i)), e;
  }
  return a._value = r, a;
}
function G2(t, r) {
  var e, n;
  function a() {
    var i = r.apply(this, arguments);
    return i !== n && (e = (n = i) && z2(t, i)), e;
  }
  return a._value = r, a;
}
function W2(t, r) {
  var e = "attr." + t;
  if (arguments.length < 2)
    return (e = this.tween(e)) && e._value;
  if (r == null)
    return this.tween(e, null);
  if (typeof r != "function")
    throw new Error();
  var n = hu(t);
  return this.tween(e, (n.local ? H2 : G2)(n, r));
}
function q2(t, r) {
  return function() {
    Fv(this, t).delay = +r.apply(this, arguments);
  };
}
function Y2(t, r) {
  return r = +r, function() {
    Fv(this, t).delay = r;
  };
}
function K2(t) {
  var r = this._id;
  return arguments.length ? this.each((typeof t == "function" ? q2 : Y2)(r, t)) : dr(this.node(), r).delay;
}
function X2(t, r) {
  return function() {
    Rr(this, t).duration = +r.apply(this, arguments);
  };
}
function J2(t, r) {
  return r = +r, function() {
    Rr(this, t).duration = r;
  };
}
function Z2(t) {
  var r = this._id;
  return arguments.length ? this.each((typeof t == "function" ? X2 : J2)(r, t)) : dr(this.node(), r).duration;
}
function Q2(t, r) {
  if (typeof r != "function")
    throw new Error();
  return function() {
    Rr(this, t).ease = r;
  };
}
function tP(t) {
  var r = this._id;
  return arguments.length ? this.each(Q2(r, t)) : dr(this.node(), r).ease;
}
function rP(t, r) {
  return function() {
    var e = r.apply(this, arguments);
    if (typeof e != "function")
      throw new Error();
    Rr(this, t).ease = e;
  };
}
function eP(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(rP(this._id, t));
}
function nP(t) {
  typeof t != "function" && (t = mS(t));
  for (var r = this._groups, e = r.length, n = new Array(e), a = 0; a < e; ++a)
    for (var i = r[a], o = i.length, s = n[a] = [], u, l = 0; l < o; ++l)
      (u = i[l]) && t.call(u, u.__data__, l, i) && s.push(u);
  return new Vr(n, this._parents, this._name, this._id);
}
function aP(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var r = this._groups, e = t._groups, n = r.length, a = e.length, i = Math.min(n, a), o = new Array(n), s = 0; s < i; ++s)
    for (var u = r[s], l = e[s], c = u.length, f = o[s] = new Array(c), h, v = 0; v < c; ++v)
      (h = u[v] || l[v]) && (f[v] = h);
  for (; s < n; ++s)
    o[s] = r[s];
  return new Vr(o, this._parents, this._name, this._id);
}
function iP(t) {
  return (t + "").trim().split(/^|\s+/).every(function(r) {
    var e = r.indexOf(".");
    return e >= 0 && (r = r.slice(0, e)), !r || r === "start";
  });
}
function oP(t, r, e) {
  var n, a, i = iP(r) ? Fv : Rr;
  return function() {
    var o = i(this, t), s = o.on;
    s !== n && (a = (n = s).copy()).on(r, e), o.on = a;
  };
}
function sP(t, r) {
  var e = this._id;
  return arguments.length < 2 ? dr(this.node(), e).on.on(t) : this.each(oP(e, t, r));
}
function uP(t) {
  return function() {
    var r = this.parentNode;
    for (var e in this.__transition)
      if (+e !== t)
        return;
    r && r.removeChild(this);
  };
}
function lP() {
  return this.on("end.remove", uP(this._id));
}
function cP(t) {
  var r = this._name, e = this._id;
  typeof t != "function" && (t = Cv(t));
  for (var n = this._groups, a = n.length, i = new Array(a), o = 0; o < a; ++o)
    for (var s = n[o], u = s.length, l = i[o] = new Array(u), c, f, h = 0; h < u; ++h)
      (c = s[h]) && (f = t.call(c, c.__data__, h, s)) && ("__data__" in c && (f.__data__ = c.__data__), l[h] = f, gu(l[h], r, e, h, l, dr(c, e)));
  return new Vr(i, this._parents, r, e);
}
function fP(t) {
  var r = this._name, e = this._id;
  typeof t != "function" && (t = yS(t));
  for (var n = this._groups, a = n.length, i = [], o = [], s = 0; s < a; ++s)
    for (var u = n[s], l = u.length, c, f = 0; f < l; ++f)
      if (c = u[f]) {
        for (var h = t.call(c, c.__data__, f, u), v, d = dr(c, e), $ = 0, y = h.length; $ < y; ++$)
          (v = h[$]) && gu(v, r, e, $, h, d);
        i.push(h), o.push(c);
      }
  return new Vr(i, o, r, e);
}
var hP = wi.prototype.constructor;
function vP() {
  return new hP(this._groups, this._parents);
}
function dP(t, r) {
  var e, n, a;
  return function() {
    var i = Bn(this, t), o = (this.style.removeProperty(t), Bn(this, t));
    return i === o ? null : i === e && o === n ? a : a = r(e = i, n = o);
  };
}
function GS(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function gP(t, r, e) {
  var n, a = e + "", i;
  return function() {
    var o = Bn(this, t);
    return o === a ? null : o === n ? i : i = r(n = o, e);
  };
}
function pP(t, r, e) {
  var n, a, i;
  return function() {
    var o = Bn(this, t), s = e(this), u = s + "";
    return s == null && (u = s = (this.style.removeProperty(t), Bn(this, t))), o === u ? null : o === n && u === a ? i : (a = u, i = r(n = o, s));
  };
}
function $P(t, r) {
  var e, n, a, i = "style." + r, o = "end." + i, s;
  return function() {
    var u = Rr(this, t), l = u.on, c = u.value[i] == null ? s || (s = GS(r)) : void 0;
    (l !== e || a !== c) && (n = (e = l).copy()).on(o, a = c), u.on = n;
  };
}
function yP(t, r, e) {
  var n = (t += "") == "transform" ? y2 : HS;
  return r == null ? this.styleTween(t, dP(t, n)).on("end.style." + t, GS(t)) : typeof r == "function" ? this.styleTween(t, pP(t, n, kv(this, "style." + t, r))).each($P(this._id, t)) : this.styleTween(t, gP(t, n, r), e).on("end.style." + t, null);
}
function mP(t, r, e) {
  return function(n) {
    this.style.setProperty(t, r.call(this, n), e);
  };
}
function bP(t, r, e) {
  var n, a;
  function i() {
    var o = r.apply(this, arguments);
    return o !== a && (n = (a = o) && mP(t, o, e)), n;
  }
  return i._value = r, i;
}
function wP(t, r, e) {
  var n = "style." + (t += "");
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (r == null)
    return this.tween(n, null);
  if (typeof r != "function")
    throw new Error();
  return this.tween(n, bP(t, r, e ?? ""));
}
function SP(t) {
  return function() {
    this.textContent = t;
  };
}
function xP(t) {
  return function() {
    var r = t(this);
    this.textContent = r ?? "";
  };
}
function EP(t) {
  return this.tween("text", typeof t == "function" ? xP(kv(this, "text", t)) : SP(t == null ? "" : t + ""));
}
function TP(t) {
  return function(r) {
    this.textContent = t.call(this, r);
  };
}
function IP(t) {
  var r, e;
  function n() {
    var a = t.apply(this, arguments);
    return a !== e && (r = (e = a) && TP(a)), r;
  }
  return n._value = t, n;
}
function OP(t) {
  var r = "text";
  if (arguments.length < 1)
    return (r = this.tween(r)) && r._value;
  if (t == null)
    return this.tween(r, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(r, IP(t));
}
function AP() {
  for (var t = this._name, r = this._id, e = WS(), n = this._groups, a = n.length, i = 0; i < a; ++i)
    for (var o = n[i], s = o.length, u, l = 0; l < s; ++l)
      if (u = o[l]) {
        var c = dr(u, r);
        gu(u, t, e, l, o, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Vr(n, this._parents, t, e);
}
function RP() {
  var t, r, e = this, n = e._id, a = e.size();
  return new Promise(function(i, o) {
    var s = { value: o }, u = { value: function() {
      --a === 0 && i();
    } };
    e.each(function() {
      var l = Rr(this, n), c = l.on;
      c !== t && (r = (t = c).copy(), r._.cancel.push(s), r._.interrupt.push(s), r._.end.push(u)), l.on = r;
    }), a === 0 && i();
  });
}
var _P = 0;
function Vr(t, r, e, n) {
  this._groups = t, this._parents = r, this._name = e, this._id = n;
}
function WS() {
  return ++_P;
}
var Dr = wi.prototype;
Vr.prototype = {
  constructor: Vr,
  select: cP,
  selectAll: fP,
  selectChild: Dr.selectChild,
  selectChildren: Dr.selectChildren,
  filter: nP,
  merge: aP,
  selection: vP,
  transition: AP,
  call: Dr.call,
  nodes: Dr.nodes,
  node: Dr.node,
  size: Dr.size,
  empty: Dr.empty,
  each: Dr.each,
  on: sP,
  attr: U2,
  attrTween: W2,
  style: yP,
  styleTween: wP,
  text: EP,
  textTween: OP,
  remove: lP,
  tween: N2,
  delay: K2,
  duration: Z2,
  ease: tP,
  easeVarying: eP,
  end: RP,
  [Symbol.iterator]: Dr[Symbol.iterator]
};
function CP(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var PP = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: CP
};
function MP(t, r) {
  for (var e; !(e = t.__transition) || !(e = e[r]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${r} not found`);
  return e;
}
function NP(t) {
  var r, e;
  t instanceof Vr ? (r = t._id, t = t._name) : (r = WS(), (e = PP).time = Lv(), t = t == null ? null : t + "");
  for (var n = this._groups, a = n.length, i = 0; i < a; ++i)
    for (var o = n[i], s = o.length, u, l = 0; l < s; ++l)
      (u = o[l]) && gu(u, t, r, l, o, e || MP(u, r));
  return new Vr(n, this._parents, t, r);
}
wi.prototype.interrupt = C2;
wi.prototype.transition = NP;
const nh = Math.PI, ah = 2 * nh, Ce = 1e-6, DP = ah - Ce;
function qS(t) {
  this._ += t[0];
  for (let r = 1, e = t.length; r < e; ++r)
    this._ += arguments[r] + t[r];
}
function LP(t) {
  let r = Math.floor(t);
  if (!(r >= 0))
    throw new Error(`invalid digits: ${t}`);
  if (r > 15)
    return qS;
  const e = 10 ** r;
  return function(n) {
    this._ += n[0];
    for (let a = 1, i = n.length; a < i; ++a)
      this._ += Math.round(arguments[a] * e) / e + n[a];
  };
}
class FP {
  constructor(r) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = r == null ? qS : LP(r);
  }
  moveTo(r, e) {
    this._append`M${this._x0 = this._x1 = +r},${this._y0 = this._y1 = +e}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(r, e) {
    this._append`L${this._x1 = +r},${this._y1 = +e}`;
  }
  quadraticCurveTo(r, e, n, a) {
    this._append`Q${+r},${+e},${this._x1 = +n},${this._y1 = +a}`;
  }
  bezierCurveTo(r, e, n, a, i, o) {
    this._append`C${+r},${+e},${+n},${+a},${this._x1 = +i},${this._y1 = +o}`;
  }
  arcTo(r, e, n, a, i) {
    if (r = +r, e = +e, n = +n, a = +a, i = +i, i < 0)
      throw new Error(`negative radius: ${i}`);
    let o = this._x1, s = this._y1, u = n - r, l = a - e, c = o - r, f = s - e, h = c * c + f * f;
    if (this._x1 === null)
      this._append`M${this._x1 = r},${this._y1 = e}`;
    else if (h > Ce)
      if (!(Math.abs(f * u - l * c) > Ce) || !i)
        this._append`L${this._x1 = r},${this._y1 = e}`;
      else {
        let v = n - o, d = a - s, $ = u * u + l * l, y = v * v + d * d, p = Math.sqrt($), b = Math.sqrt(h), I = i * Math.tan((nh - Math.acos(($ + h - y) / (2 * p * b))) / 2), _ = I / b, M = I / p;
        Math.abs(_ - 1) > Ce && this._append`L${r + _ * c},${e + _ * f}`, this._append`A${i},${i},0,0,${+(f * v > c * d)},${this._x1 = r + M * u},${this._y1 = e + M * l}`;
      }
  }
  arc(r, e, n, a, i, o) {
    if (r = +r, e = +e, n = +n, o = !!o, n < 0)
      throw new Error(`negative radius: ${n}`);
    let s = n * Math.cos(a), u = n * Math.sin(a), l = r + s, c = e + u, f = 1 ^ o, h = o ? a - i : i - a;
    this._x1 === null ? this._append`M${l},${c}` : (Math.abs(this._x1 - l) > Ce || Math.abs(this._y1 - c) > Ce) && this._append`L${l},${c}`, n && (h < 0 && (h = h % ah + ah), h > DP ? this._append`A${n},${n},0,1,${f},${r - s},${e - u}A${n},${n},0,1,${f},${this._x1 = l},${this._y1 = c}` : h > Ce && this._append`A${n},${n},0,${+(h >= nh)},${f},${this._x1 = r + n * Math.cos(i)},${this._y1 = e + n * Math.sin(i)}`);
  }
  rect(r, e, n, a) {
    this._append`M${this._x0 = this._x1 = +r},${this._y0 = this._y1 = +e}h${n = +n}v${+a}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function kP(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function Ps(t, r) {
  if ((e = (t = r ? t.toExponential(r - 1) : t.toExponential()).indexOf("e")) < 0)
    return null;
  var e, n = t.slice(0, e);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +t.slice(e + 1)
  ];
}
function Un(t) {
  return t = Ps(Math.abs(t)), t ? t[1] : NaN;
}
function BP(t, r) {
  return function(e, n) {
    for (var a = e.length, i = [], o = 0, s = t[0], u = 0; a > 0 && s > 0 && (u + s + 1 > n && (s = Math.max(1, n - u)), i.push(e.substring(a -= s, a + s)), !((u += s + 1) > n)); )
      s = t[o = (o + 1) % t.length];
    return i.reverse().join(r);
  };
}
function jP(t) {
  return function(r) {
    return r.replace(/[0-9]/g, function(e) {
      return t[+e];
    });
  };
}
var UP = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Ms(t) {
  if (!(r = UP.exec(t)))
    throw new Error("invalid format: " + t);
  var r;
  return new Bv({
    fill: r[1],
    align: r[2],
    sign: r[3],
    symbol: r[4],
    zero: r[5],
    width: r[6],
    comma: r[7],
    precision: r[8] && r[8].slice(1),
    trim: r[9],
    type: r[10]
  });
}
Ms.prototype = Bv.prototype;
function Bv(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Bv.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function zP(t) {
  t:
    for (var r = t.length, e = 1, n = -1, a; e < r; ++e)
      switch (t[e]) {
        case ".":
          n = a = e;
          break;
        case "0":
          n === 0 && (n = e), a = e;
          break;
        default:
          if (!+t[e])
            break t;
          n > 0 && (n = 0);
          break;
      }
  return n > 0 ? t.slice(0, n) + t.slice(a + 1) : t;
}
var YS;
function VP(t, r) {
  var e = Ps(t, r);
  if (!e)
    return t + "";
  var n = e[0], a = e[1], i = a - (YS = Math.max(-8, Math.min(8, Math.floor(a / 3))) * 3) + 1, o = n.length;
  return i === o ? n : i > o ? n + new Array(i - o + 1).join("0") : i > 0 ? n.slice(0, i) + "." + n.slice(i) : "0." + new Array(1 - i).join("0") + Ps(t, Math.max(0, r + i - 1))[0];
}
function yp(t, r) {
  var e = Ps(t, r);
  if (!e)
    return t + "";
  var n = e[0], a = e[1];
  return a < 0 ? "0." + new Array(-a).join("0") + n : n.length > a + 1 ? n.slice(0, a + 1) + "." + n.slice(a + 1) : n + new Array(a - n.length + 2).join("0");
}
const mp = {
  "%": (t, r) => (t * 100).toFixed(r),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: kP,
  e: (t, r) => t.toExponential(r),
  f: (t, r) => t.toFixed(r),
  g: (t, r) => t.toPrecision(r),
  o: (t) => Math.round(t).toString(8),
  p: (t, r) => yp(t * 100, r),
  r: yp,
  s: VP,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function bp(t) {
  return t;
}
var wp = Array.prototype.map, Sp = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function HP(t) {
  var r = t.grouping === void 0 || t.thousands === void 0 ? bp : BP(wp.call(t.grouping, Number), t.thousands + ""), e = t.currency === void 0 ? "" : t.currency[0] + "", n = t.currency === void 0 ? "" : t.currency[1] + "", a = t.decimal === void 0 ? "." : t.decimal + "", i = t.numerals === void 0 ? bp : jP(wp.call(t.numerals, String)), o = t.percent === void 0 ? "%" : t.percent + "", s = t.minus === void 0 ? "−" : t.minus + "", u = t.nan === void 0 ? "NaN" : t.nan + "";
  function l(f) {
    f = Ms(f);
    var h = f.fill, v = f.align, d = f.sign, $ = f.symbol, y = f.zero, p = f.width, b = f.comma, I = f.precision, _ = f.trim, M = f.type;
    M === "n" ? (b = !0, M = "g") : mp[M] || (I === void 0 && (I = 12), _ = !0, M = "g"), (y || h === "0" && v === "=") && (y = !0, h = "0", v = "=");
    var B = $ === "$" ? e : $ === "#" && /[boxX]/.test(M) ? "0" + M.toLowerCase() : "", H = $ === "$" ? n : /[%p]/.test(M) ? o : "", q = mp[M], Z = /[defgprs%]/.test(M);
    I = I === void 0 ? 6 : /[gprs]/.test(M) ? Math.max(1, Math.min(21, I)) : Math.max(0, Math.min(20, I));
    function nt(k) {
      var Y = B, L = H, m, C, x;
      if (M === "c")
        L = q(k) + L, k = "";
      else {
        k = +k;
        var N = k < 0 || 1 / k < 0;
        if (k = isNaN(k) ? u : q(Math.abs(k), I), _ && (k = zP(k)), N && +k == 0 && d !== "+" && (N = !1), Y = (N ? d === "(" ? d : s : d === "-" || d === "(" ? "" : d) + Y, L = (M === "s" ? Sp[8 + YS / 3] : "") + L + (N && d === "(" ? ")" : ""), Z) {
          for (m = -1, C = k.length; ++m < C; )
            if (x = k.charCodeAt(m), 48 > x || x > 57) {
              L = (x === 46 ? a + k.slice(m + 1) : k.slice(m)) + L, k = k.slice(0, m);
              break;
            }
        }
      }
      b && !y && (k = r(k, 1 / 0));
      var j = Y.length + k.length + L.length, w = j < p ? new Array(p - j + 1).join(h) : "";
      switch (b && y && (k = r(w + k, w.length ? p - L.length : 1 / 0), w = ""), v) {
        case "<":
          k = Y + k + L + w;
          break;
        case "=":
          k = Y + w + k + L;
          break;
        case "^":
          k = w.slice(0, j = w.length >> 1) + Y + k + L + w.slice(j);
          break;
        default:
          k = w + Y + k + L;
          break;
      }
      return i(k);
    }
    return nt.toString = function() {
      return f + "";
    }, nt;
  }
  function c(f, h) {
    var v = l((f = Ms(f), f.type = "f", f)), d = Math.max(-8, Math.min(8, Math.floor(Un(h) / 3))) * 3, $ = Math.pow(10, -d), y = Sp[8 + d / 3];
    return function(p) {
      return v($ * p) + y;
    };
  }
  return {
    format: l,
    formatPrefix: c
  };
}
var io, KS, XS;
GP({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function GP(t) {
  return io = HP(t), KS = io.format, XS = io.formatPrefix, io;
}
function WP(t) {
  return Math.max(0, -Un(Math.abs(t)));
}
function qP(t, r) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Un(r) / 3))) * 3 - Un(Math.abs(t)));
}
function YP(t, r) {
  return t = Math.abs(t), r = Math.abs(r) - t, Math.max(0, Un(r) - Un(t)) + 1;
}
function KP(t) {
  var r = 0, e = t.children, n = e && e.length;
  if (!n)
    r = 1;
  else
    for (; --n >= 0; )
      r += e[n].value;
  t.value = r;
}
function XP() {
  return this.eachAfter(KP);
}
function JP(t, r) {
  let e = -1;
  for (const n of this)
    t.call(r, n, ++e, this);
  return this;
}
function ZP(t, r) {
  for (var e = this, n = [e], a, i, o = -1; e = n.pop(); )
    if (t.call(r, e, ++o, this), a = e.children)
      for (i = a.length - 1; i >= 0; --i)
        n.push(a[i]);
  return this;
}
function QP(t, r) {
  for (var e = this, n = [e], a = [], i, o, s, u = -1; e = n.pop(); )
    if (a.push(e), i = e.children)
      for (o = 0, s = i.length; o < s; ++o)
        n.push(i[o]);
  for (; e = a.pop(); )
    t.call(r, e, ++u, this);
  return this;
}
function tM(t, r) {
  let e = -1;
  for (const n of this)
    if (t.call(r, n, ++e, this))
      return n;
}
function rM(t) {
  return this.eachAfter(function(r) {
    for (var e = +t(r.data) || 0, n = r.children, a = n && n.length; --a >= 0; )
      e += n[a].value;
    r.value = e;
  });
}
function eM(t) {
  return this.eachBefore(function(r) {
    r.children && r.children.sort(t);
  });
}
function nM(t) {
  for (var r = this, e = aM(r, t), n = [r]; r !== e; )
    r = r.parent, n.push(r);
  for (var a = n.length; t !== e; )
    n.splice(a, 0, t), t = t.parent;
  return n;
}
function aM(t, r) {
  if (t === r)
    return t;
  var e = t.ancestors(), n = r.ancestors(), a = null;
  for (t = e.pop(), r = n.pop(); t === r; )
    a = t, t = e.pop(), r = n.pop();
  return a;
}
function iM() {
  for (var t = this, r = [t]; t = t.parent; )
    r.push(t);
  return r;
}
function oM() {
  return Array.from(this);
}
function sM() {
  var t = [];
  return this.eachBefore(function(r) {
    r.children || t.push(r);
  }), t;
}
function uM() {
  var t = this, r = [];
  return t.each(function(e) {
    e !== t && r.push({ source: e.parent, target: e });
  }), r;
}
function* lM() {
  var t = this, r, e = [t], n, a, i;
  do
    for (r = e.reverse(), e = []; t = r.pop(); )
      if (yield t, n = t.children)
        for (a = 0, i = n.length; a < i; ++a)
          e.push(n[a]);
  while (e.length);
}
function zn(t, r) {
  t instanceof Map ? (t = [void 0, t], r === void 0 && (r = hM)) : r === void 0 && (r = fM);
  for (var e = new ci(t), n, a = [e], i, o, s, u; n = a.pop(); )
    if ((o = r(n.data)) && (u = (o = Array.from(o)).length))
      for (n.children = o, s = u - 1; s >= 0; --s)
        a.push(i = o[s] = new ci(o[s])), i.parent = n, i.depth = n.depth + 1;
  return e.eachBefore(dM);
}
function cM() {
  return zn(this).eachBefore(vM);
}
function fM(t) {
  return t.children;
}
function hM(t) {
  return Array.isArray(t) ? t[1] : null;
}
function vM(t) {
  t.data.value !== void 0 && (t.value = t.data.value), t.data = t.data.data;
}
function dM(t) {
  var r = 0;
  do
    t.height = r;
  while ((t = t.parent) && t.height < ++r);
}
function ci(t) {
  this.data = t, this.depth = this.height = 0, this.parent = null;
}
ci.prototype = zn.prototype = {
  constructor: ci,
  count: XP,
  each: JP,
  eachAfter: QP,
  eachBefore: ZP,
  find: tM,
  sum: rM,
  sort: eM,
  path: nM,
  ancestors: iM,
  descendants: oM,
  leaves: sM,
  links: uM,
  copy: cM,
  [Symbol.iterator]: lM
};
function gM(t) {
  if (typeof t != "function")
    throw new Error();
  return t;
}
function wa() {
  return 0;
}
function Sa(t) {
  return function() {
    return t;
  };
}
function JS(t) {
  t.x0 = Math.round(t.x0), t.y0 = Math.round(t.y0), t.x1 = Math.round(t.x1), t.y1 = Math.round(t.y1);
}
function ZS(t, r, e, n, a) {
  for (var i = t.children, o, s = -1, u = i.length, l = t.value && (n - r) / t.value; ++s < u; )
    o = i[s], o.y0 = e, o.y1 = a, o.x0 = r, o.x1 = r += o.value * l;
}
function pM() {
  var t = 1, r = 1, e = 0, n = !1;
  function a(o) {
    var s = o.height + 1;
    return o.x0 = o.y0 = e, o.x1 = t, o.y1 = r / s, o.eachBefore(i(r, s)), n && o.eachBefore(JS), o;
  }
  function i(o, s) {
    return function(u) {
      u.children && ZS(u, u.x0, o * (u.depth + 1) / s, u.x1, o * (u.depth + 2) / s);
      var l = u.x0, c = u.y0, f = u.x1 - e, h = u.y1 - e;
      f < l && (l = f = (l + f) / 2), h < c && (c = h = (c + h) / 2), u.x0 = l, u.y0 = c, u.x1 = f, u.y1 = h;
    };
  }
  return a.round = function(o) {
    return arguments.length ? (n = !!o, a) : n;
  }, a.size = function(o) {
    return arguments.length ? (t = +o[0], r = +o[1], a) : [t, r];
  }, a.padding = function(o) {
    return arguments.length ? (e = +o, a) : e;
  }, a;
}
function $M(t, r) {
  return t.parent === r.parent ? 1 : 2;
}
function Cl(t) {
  var r = t.children;
  return r ? r[0] : t.t;
}
function Pl(t) {
  var r = t.children;
  return r ? r[r.length - 1] : t.t;
}
function yM(t, r, e) {
  var n = e / (r.i - t.i);
  r.c -= n, r.s += e, t.c += n, r.z += e, r.m += e;
}
function mM(t) {
  for (var r = 0, e = 0, n = t.children, a = n.length, i; --a >= 0; )
    i = n[a], i.z += r, i.m += r, r += i.s + (e += i.c);
}
function bM(t, r, e) {
  return t.a.parent === r.parent ? t.a : e;
}
function is(t, r) {
  this._ = t, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = r;
}
is.prototype = Object.create(ci.prototype);
function wM(t) {
  for (var r = new is(t, 0), e, n = [r], a, i, o, s; e = n.pop(); )
    if (i = e._.children)
      for (e.children = new Array(s = i.length), o = s - 1; o >= 0; --o)
        n.push(a = e.children[o] = new is(i[o], o)), a.parent = e;
  return (r.parent = new is(null, 0)).children = [r], r;
}
function SM() {
  var t = $M, r = 1, e = 1, n = null;
  function a(l) {
    var c = wM(l);
    if (c.eachAfter(i), c.parent.m = -c.z, c.eachBefore(o), n)
      l.eachBefore(u);
    else {
      var f = l, h = l, v = l;
      l.eachBefore(function(b) {
        b.x < f.x && (f = b), b.x > h.x && (h = b), b.depth > v.depth && (v = b);
      });
      var d = f === h ? 1 : t(f, h) / 2, $ = d - f.x, y = r / (h.x + d + $), p = e / (v.depth || 1);
      l.eachBefore(function(b) {
        b.x = (b.x + $) * y, b.y = b.depth * p;
      });
    }
    return l;
  }
  function i(l) {
    var c = l.children, f = l.parent.children, h = l.i ? f[l.i - 1] : null;
    if (c) {
      mM(l);
      var v = (c[0].z + c[c.length - 1].z) / 2;
      h ? (l.z = h.z + t(l._, h._), l.m = l.z - v) : l.z = v;
    } else
      h && (l.z = h.z + t(l._, h._));
    l.parent.A = s(l, h, l.parent.A || f[0]);
  }
  function o(l) {
    l._.x = l.z + l.parent.m, l.m += l.parent.m;
  }
  function s(l, c, f) {
    if (c) {
      for (var h = l, v = l, d = c, $ = h.parent.children[0], y = h.m, p = v.m, b = d.m, I = $.m, _; d = Pl(d), h = Cl(h), d && h; )
        $ = Cl($), v = Pl(v), v.a = l, _ = d.z + b - h.z - y + t(d._, h._), _ > 0 && (yM(bM(d, l, f), l, _), y += _, p += _), b += d.m, y += h.m, I += $.m, p += v.m;
      d && !Pl(v) && (v.t = d, v.m += b - p), h && !Cl($) && ($.t = h, $.m += y - I, f = l);
    }
    return f;
  }
  function u(l) {
    l.x *= r, l.y = l.depth * e;
  }
  return a.separation = function(l) {
    return arguments.length ? (t = l, a) : t;
  }, a.size = function(l) {
    return arguments.length ? (n = !1, r = +l[0], e = +l[1], a) : n ? null : [r, e];
  }, a.nodeSize = function(l) {
    return arguments.length ? (n = !0, r = +l[0], e = +l[1], a) : n ? [r, e] : null;
  }, a;
}
function xM(t, r, e, n, a) {
  for (var i = t.children, o, s = -1, u = i.length, l = t.value && (a - e) / t.value; ++s < u; )
    o = i[s], o.x0 = r, o.x1 = n, o.y0 = e, o.y1 = e += o.value * l;
}
var EM = (1 + Math.sqrt(5)) / 2;
function TM(t, r, e, n, a, i) {
  for (var o = [], s = r.children, u, l, c = 0, f = 0, h = s.length, v, d, $ = r.value, y, p, b, I, _, M, B; c < h; ) {
    v = a - e, d = i - n;
    do
      y = s[f++].value;
    while (!y && f < h);
    for (p = b = y, M = Math.max(d / v, v / d) / ($ * t), B = y * y * M, _ = Math.max(b / B, B / p); f < h; ++f) {
      if (y += l = s[f].value, l < p && (p = l), l > b && (b = l), B = y * y * M, I = Math.max(b / B, B / p), I > _) {
        y -= l;
        break;
      }
      _ = I;
    }
    o.push(u = { value: y, dice: v < d, children: s.slice(c, f) }), u.dice ? ZS(u, e, n, a, $ ? n += d * y / $ : i) : xM(u, e, n, $ ? e += v * y / $ : a, i), $ -= y, c = f;
  }
  return o;
}
const IM = function t(r) {
  function e(n, a, i, o, s) {
    TM(r, n, a, i, o, s);
  }
  return e.ratio = function(n) {
    return t((n = +n) > 1 ? n : 1);
  }, e;
}(EM);
function OM() {
  var t = IM, r = !1, e = 1, n = 1, a = [0], i = wa, o = wa, s = wa, u = wa, l = wa;
  function c(h) {
    return h.x0 = h.y0 = 0, h.x1 = e, h.y1 = n, h.eachBefore(f), a = [0], r && h.eachBefore(JS), h;
  }
  function f(h) {
    var v = a[h.depth], d = h.x0 + v, $ = h.y0 + v, y = h.x1 - v, p = h.y1 - v;
    y < d && (d = y = (d + y) / 2), p < $ && ($ = p = ($ + p) / 2), h.x0 = d, h.y0 = $, h.x1 = y, h.y1 = p, h.children && (v = a[h.depth + 1] = i(h) / 2, d += l(h) - v, $ += o(h) - v, y -= s(h) - v, p -= u(h) - v, y < d && (d = y = (d + y) / 2), p < $ && ($ = p = ($ + p) / 2), t(h, d, $, y, p));
  }
  return c.round = function(h) {
    return arguments.length ? (r = !!h, c) : r;
  }, c.size = function(h) {
    return arguments.length ? (e = +h[0], n = +h[1], c) : [e, n];
  }, c.tile = function(h) {
    return arguments.length ? (t = gM(h), c) : t;
  }, c.padding = function(h) {
    return arguments.length ? c.paddingInner(h).paddingOuter(h) : c.paddingInner();
  }, c.paddingInner = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : Sa(+h), c) : i;
  }, c.paddingOuter = function(h) {
    return arguments.length ? c.paddingTop(h).paddingRight(h).paddingBottom(h).paddingLeft(h) : c.paddingTop();
  }, c.paddingTop = function(h) {
    return arguments.length ? (o = typeof h == "function" ? h : Sa(+h), c) : o;
  }, c.paddingRight = function(h) {
    return arguments.length ? (s = typeof h == "function" ? h : Sa(+h), c) : s;
  }, c.paddingBottom = function(h) {
    return arguments.length ? (u = typeof h == "function" ? h : Sa(+h), c) : u;
  }, c.paddingLeft = function(h) {
    return arguments.length ? (l = typeof h == "function" ? h : Sa(+h), c) : l;
  }, c;
}
function pu(t, r) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(r).domain(t);
      break;
  }
  return this;
}
const xp = Symbol("implicit");
function $u() {
  var t = new Zg(), r = [], e = [], n = xp;
  function a(i) {
    let o = t.get(i);
    if (o === void 0) {
      if (n !== xp)
        return n;
      t.set(i, o = r.push(i) - 1);
    }
    return e[o % e.length];
  }
  return a.domain = function(i) {
    if (!arguments.length)
      return r.slice();
    r = [], t = new Zg();
    for (const o of i)
      t.has(o) || t.set(o, r.push(o) - 1);
    return a;
  }, a.range = function(i) {
    return arguments.length ? (e = Array.from(i), a) : e.slice();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.copy = function() {
    return $u(r, e).unknown(n);
  }, pu.apply(a, arguments), a;
}
function QS() {
  var t = $u().unknown(void 0), r = t.domain, e = t.range, n = 0, a = 1, i, o, s = !1, u = 0, l = 0, c = 0.5;
  delete t.unknown;
  function f() {
    var h = r().length, v = a < n, d = v ? a : n, $ = v ? n : a;
    i = ($ - d) / Math.max(1, h - u + l * 2), s && (i = Math.floor(i)), d += ($ - d - i * (h - u)) * c, o = i * (1 - u), s && (d = Math.round(d), o = Math.round(o));
    var y = ZR(h).map(function(p) {
      return d + i * p;
    });
    return e(v ? y.reverse() : y);
  }
  return t.domain = function(h) {
    return arguments.length ? (r(h), f()) : r();
  }, t.range = function(h) {
    return arguments.length ? ([n, a] = h, n = +n, a = +a, f()) : [n, a];
  }, t.rangeRound = function(h) {
    return [n, a] = h, n = +n, a = +a, s = !0, f();
  }, t.bandwidth = function() {
    return o;
  }, t.step = function() {
    return i;
  }, t.round = function(h) {
    return arguments.length ? (s = !!h, f()) : s;
  }, t.padding = function(h) {
    return arguments.length ? (u = Math.min(1, l = +h), f()) : u;
  }, t.paddingInner = function(h) {
    return arguments.length ? (u = Math.min(1, h), f()) : u;
  }, t.paddingOuter = function(h) {
    return arguments.length ? (l = +h, f()) : l;
  }, t.align = function(h) {
    return arguments.length ? (c = Math.max(0, Math.min(1, h)), f()) : c;
  }, t.copy = function() {
    return QS(r(), [n, a]).round(s).paddingInner(u).paddingOuter(l).align(c);
  }, pu.apply(f(), arguments);
}
function AM(t) {
  return function() {
    return t;
  };
}
function RM(t) {
  return +t;
}
var Ep = [0, 1];
function wn(t) {
  return t;
}
function ih(t, r) {
  return (r -= t = +t) ? function(e) {
    return (e - t) / r;
  } : AM(isNaN(r) ? NaN : 0.5);
}
function _M(t, r) {
  var e;
  return t > r && (e = t, t = r, r = e), function(n) {
    return Math.max(t, Math.min(r, n));
  };
}
function CM(t, r, e) {
  var n = t[0], a = t[1], i = r[0], o = r[1];
  return a < n ? (n = ih(a, n), i = e(o, i)) : (n = ih(n, a), i = e(i, o)), function(s) {
    return i(n(s));
  };
}
function PM(t, r, e) {
  var n = Math.min(t.length, r.length) - 1, a = new Array(n), i = new Array(n), o = -1;
  for (t[n] < t[0] && (t = t.slice().reverse(), r = r.slice().reverse()); ++o < n; )
    a[o] = ih(t[o], t[o + 1]), i[o] = e(r[o], r[o + 1]);
  return function(s) {
    var u = gS(t, s, 1, n) - 1;
    return i[u](a[u](s));
  };
}
function MM(t, r) {
  return r.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function NM() {
  var t = Ep, r = Ep, e = _n, n, a, i, o = wn, s, u, l;
  function c() {
    var h = Math.min(t.length, r.length);
    return o !== wn && (o = _M(t[0], t[h - 1])), s = h > 2 ? PM : CM, u = l = null, f;
  }
  function f(h) {
    return h == null || isNaN(h = +h) ? i : (u || (u = s(t.map(n), r, e)))(n(o(h)));
  }
  return f.invert = function(h) {
    return o(a((l || (l = s(r, t.map(n), ur)))(h)));
  }, f.domain = function(h) {
    return arguments.length ? (t = Array.from(h, RM), c()) : t.slice();
  }, f.range = function(h) {
    return arguments.length ? (r = Array.from(h), c()) : r.slice();
  }, f.rangeRound = function(h) {
    return r = Array.from(h), e = g2, c();
  }, f.clamp = function(h) {
    return arguments.length ? (o = h ? !0 : wn, c()) : o !== wn;
  }, f.interpolate = function(h) {
    return arguments.length ? (e = h, c()) : e;
  }, f.unknown = function(h) {
    return arguments.length ? (i = h, f) : i;
  }, function(h, v) {
    return n = h, a = v, c();
  };
}
function DM() {
  return NM()(wn, wn);
}
function LM(t, r, e, n) {
  var a = JR(t, r, e), i;
  switch (n = Ms(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(t), Math.abs(r));
      return n.precision == null && !isNaN(i = qP(a, o)) && (n.precision = i), XS(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(i = YP(a, Math.max(Math.abs(t), Math.abs(r)))) && (n.precision = i - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(i = WP(a)) && (n.precision = i - (n.type === "%") * 2);
      break;
    }
  }
  return KS(n);
}
function tx(t) {
  var r = t.domain;
  return t.ticks = function(e) {
    var n = r();
    return XR(n[0], n[n.length - 1], e ?? 10);
  }, t.tickFormat = function(e, n) {
    var a = r();
    return LM(a[0], a[a.length - 1], e ?? 10, n);
  }, t.nice = function(e) {
    e == null && (e = 10);
    var n = r(), a = 0, i = n.length - 1, o = n[a], s = n[i], u, l, c = 10;
    for (s < o && (l = o, o = s, s = l, l = a, a = i, i = l); c-- > 0; ) {
      if (l = qf(o, s, e), l === u)
        return n[a] = o, n[i] = s, r(n);
      if (l > 0)
        o = Math.floor(o / l) * l, s = Math.ceil(s / l) * l;
      else if (l < 0)
        o = Math.ceil(o * l) / l, s = Math.floor(s * l) / l;
      else
        break;
      u = l;
    }
    return t;
  }, t;
}
function de() {
  var t = DM();
  return t.copy = function() {
    return MM(t, de());
  }, pu.apply(t, arguments), tx(t);
}
function rx() {
  var t = 0, r = 1, e = 1, n = [0.5], a = [0, 1], i;
  function o(u) {
    return u != null && u <= u ? a[gS(n, u, 0, e)] : i;
  }
  function s() {
    var u = -1;
    for (n = new Array(e); ++u < e; )
      n[u] = ((u + 1) * r - (u - e) * t) / (e + 1);
    return o;
  }
  return o.domain = function(u) {
    return arguments.length ? ([t, r] = u, t = +t, r = +r, s()) : [t, r];
  }, o.range = function(u) {
    return arguments.length ? (e = (a = Array.from(u)).length - 1, s()) : a.slice();
  }, o.invertExtent = function(u) {
    var l = a.indexOf(u);
    return l < 0 ? [NaN, NaN] : l < 1 ? [t, n[0]] : l >= e ? [n[e - 1], r] : [n[l - 1], n[l]];
  }, o.unknown = function(u) {
    return arguments.length && (i = u), o;
  }, o.thresholds = function() {
    return n.slice();
  }, o.copy = function() {
    return rx().domain([t, r]).range(a).unknown(i);
  }, pu.apply(tx(o), arguments);
}
function FM(t) {
  for (var r = t.length / 6 | 0, e = new Array(r), n = 0; n < r; )
    e[n] = "#" + t.slice(n * 6, ++n * 6);
  return e;
}
const kM = FM("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
function Ct(t) {
  return function() {
    return t;
  };
}
const Tp = Math.abs, wt = Math.atan2, Se = Math.cos, BM = Math.max, Ml = Math.min, br = Math.sin, Sn = Math.sqrt, _t = 1e-12, fi = Math.PI, Ns = fi / 2, jM = 2 * fi;
function UM(t) {
  return t > 1 ? 0 : t < -1 ? fi : Math.acos(t);
}
function Ip(t) {
  return t >= 1 ? Ns : t <= -1 ? -Ns : Math.asin(t);
}
function ex(t) {
  let r = 3;
  return t.digits = function(e) {
    if (!arguments.length)
      return r;
    if (e == null)
      r = null;
    else {
      const n = Math.floor(e);
      if (!(n >= 0))
        throw new RangeError(`invalid digits: ${e}`);
      r = n;
    }
    return t;
  }, () => new FP(r);
}
function zM(t) {
  return t.innerRadius;
}
function VM(t) {
  return t.outerRadius;
}
function HM(t) {
  return t.startAngle;
}
function GM(t) {
  return t.endAngle;
}
function WM(t) {
  return t && t.padAngle;
}
function qM(t, r, e, n, a, i, o, s) {
  var u = e - t, l = n - r, c = o - a, f = s - i, h = f * u - c * l;
  if (!(h * h < _t))
    return h = (c * (r - i) - f * (t - a)) / h, [t + h * u, r + h * l];
}
function oo(t, r, e, n, a, i, o) {
  var s = t - e, u = r - n, l = (o ? i : -i) / Sn(s * s + u * u), c = l * u, f = -l * s, h = t + c, v = r + f, d = e + c, $ = n + f, y = (h + d) / 2, p = (v + $) / 2, b = d - h, I = $ - v, _ = b * b + I * I, M = a - i, B = h * $ - d * v, H = (I < 0 ? -1 : 1) * Sn(BM(0, M * M * _ - B * B)), q = (B * I - b * H) / _, Z = (-B * b - I * H) / _, nt = (B * I + b * H) / _, k = (-B * b + I * H) / _, Y = q - y, L = Z - p, m = nt - y, C = k - p;
  return Y * Y + L * L > m * m + C * C && (q = nt, Z = k), {
    cx: q,
    cy: Z,
    x01: -c,
    y01: -f,
    x11: q * (a / M - 1),
    y11: Z * (a / M - 1)
  };
}
function oh() {
  var t = zM, r = VM, e = Ct(0), n = null, a = HM, i = GM, o = WM, s = null, u = ex(l);
  function l() {
    var c, f, h = +t.apply(this, arguments), v = +r.apply(this, arguments), d = a.apply(this, arguments) - Ns, $ = i.apply(this, arguments) - Ns, y = Tp($ - d), p = $ > d;
    if (s || (s = c = u()), v < h && (f = v, v = h, h = f), !(v > _t))
      s.moveTo(0, 0);
    else if (y > jM - _t)
      s.moveTo(v * Se(d), v * br(d)), s.arc(0, 0, v, d, $, !p), h > _t && (s.moveTo(h * Se($), h * br($)), s.arc(0, 0, h, $, d, p));
    else {
      var b = d, I = $, _ = d, M = $, B = y, H = y, q = o.apply(this, arguments) / 2, Z = q > _t && (n ? +n.apply(this, arguments) : Sn(h * h + v * v)), nt = Ml(Tp(v - h) / 2, +e.apply(this, arguments)), k = nt, Y = nt, L, m;
      if (Z > _t) {
        var C = Ip(Z / h * br(q)), x = Ip(Z / v * br(q));
        (B -= C * 2) > _t ? (C *= p ? 1 : -1, _ += C, M -= C) : (B = 0, _ = M = (d + $) / 2), (H -= x * 2) > _t ? (x *= p ? 1 : -1, b += x, I -= x) : (H = 0, b = I = (d + $) / 2);
      }
      var N = v * Se(b), j = v * br(b), w = h * Se(M), S = h * br(M);
      if (nt > _t) {
        var E = v * Se(I), F = v * br(I), T = h * Se(_), R = h * br(_), P;
        if (y < fi)
          if (P = qM(N, j, T, R, E, F, w, S)) {
            var G = N - P[0], Q = j - P[1], it = E - P[0], ir = F - P[1], ee = 1 / br(UM((G * it + Q * ir) / (Sn(G * G + Q * Q) * Sn(it * it + ir * ir))) / 2), mr = Sn(P[0] * P[0] + P[1] * P[1]);
            k = Ml(nt, (h - mr) / (ee - 1)), Y = Ml(nt, (v - mr) / (ee + 1));
          } else
            k = Y = 0;
      }
      H > _t ? Y > _t ? (L = oo(T, R, N, j, v, Y, p), m = oo(E, F, w, S, v, Y, p), s.moveTo(L.cx + L.x01, L.cy + L.y01), Y < nt ? s.arc(L.cx, L.cy, Y, wt(L.y01, L.x01), wt(m.y01, m.x01), !p) : (s.arc(L.cx, L.cy, Y, wt(L.y01, L.x01), wt(L.y11, L.x11), !p), s.arc(0, 0, v, wt(L.cy + L.y11, L.cx + L.x11), wt(m.cy + m.y11, m.cx + m.x11), !p), s.arc(m.cx, m.cy, Y, wt(m.y11, m.x11), wt(m.y01, m.x01), !p))) : (s.moveTo(N, j), s.arc(0, 0, v, b, I, !p)) : s.moveTo(N, j), !(h > _t) || !(B > _t) ? s.lineTo(w, S) : k > _t ? (L = oo(w, S, E, F, h, -k, p), m = oo(N, j, T, R, h, -k, p), s.lineTo(L.cx + L.x01, L.cy + L.y01), k < nt ? s.arc(L.cx, L.cy, k, wt(L.y01, L.x01), wt(m.y01, m.x01), !p) : (s.arc(L.cx, L.cy, k, wt(L.y01, L.x01), wt(L.y11, L.x11), !p), s.arc(0, 0, h, wt(L.cy + L.y11, L.cx + L.x11), wt(m.cy + m.y11, m.cx + m.x11), p), s.arc(m.cx, m.cy, k, wt(m.y11, m.x11), wt(m.y01, m.x01), !p))) : s.arc(0, 0, h, M, _, p);
    }
    if (s.closePath(), c)
      return s = null, c + "" || null;
  }
  return l.centroid = function() {
    var c = (+t.apply(this, arguments) + +r.apply(this, arguments)) / 2, f = (+a.apply(this, arguments) + +i.apply(this, arguments)) / 2 - fi / 2;
    return [Se(f) * c, br(f) * c];
  }, l.innerRadius = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : Ct(+c), l) : t;
  }, l.outerRadius = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : Ct(+c), l) : r;
  }, l.cornerRadius = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : Ct(+c), l) : e;
  }, l.padRadius = function(c) {
    return arguments.length ? (n = c == null ? null : typeof c == "function" ? c : Ct(+c), l) : n;
  }, l.startAngle = function(c) {
    return arguments.length ? (a = typeof c == "function" ? c : Ct(+c), l) : a;
  }, l.endAngle = function(c) {
    return arguments.length ? (i = typeof c == "function" ? c : Ct(+c), l) : i;
  }, l.padAngle = function(c) {
    return arguments.length ? (o = typeof c == "function" ? c : Ct(+c), l) : o;
  }, l.context = function(c) {
    return arguments.length ? (s = c ?? null, l) : s;
  }, l;
}
var YM = Array.prototype.slice;
function KM(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function XM(t) {
  return t[0];
}
function JM(t) {
  return t[1];
}
class ZM {
  constructor(r, e) {
    this._context = r, this._x = e;
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
  point(r, e) {
    switch (r = +r, e = +e, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(r, e) : this._context.moveTo(r, e);
        break;
      }
      case 1:
        this._point = 2;
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + r) / 2, this._y0, this._x0, e, r, e) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + e) / 2, r, this._y0, r, e);
        break;
      }
    }
    this._x0 = r, this._y0 = e;
  }
}
function QM(t) {
  return new ZM(t, !0);
}
function tN(t) {
  return t.source;
}
function rN(t) {
  return t.target;
}
function eN(t) {
  let r = tN, e = rN, n = XM, a = JM, i = null, o = null, s = ex(u);
  function u() {
    let l;
    const c = YM.call(arguments), f = r.apply(this, c), h = e.apply(this, c);
    if (i == null && (o = t(l = s())), o.lineStart(), c[0] = f, o.point(+n.apply(this, c), +a.apply(this, c)), c[0] = h, o.point(+n.apply(this, c), +a.apply(this, c)), o.lineEnd(), l)
      return o = null, l + "" || null;
  }
  return u.source = function(l) {
    return arguments.length ? (r = l, u) : r;
  }, u.target = function(l) {
    return arguments.length ? (e = l, u) : e;
  }, u.x = function(l) {
    return arguments.length ? (n = typeof l == "function" ? l : Ct(+l), u) : n;
  }, u.y = function(l) {
    return arguments.length ? (a = typeof l == "function" ? l : Ct(+l), u) : a;
  }, u.context = function(l) {
    return arguments.length ? (l == null ? i = o = null : o = t(i = l), u) : i;
  }, u;
}
function nN() {
  return eN(QM);
}
function Op(t, r) {
  if ((o = t.length) > 1)
    for (var e = 1, n, a, i = t[r[0]], o, s = i.length; e < o; ++e)
      for (a = i, i = t[r[e]], n = 0; n < s; ++n)
        i[n][1] += i[n][0] = isNaN(a[n][1]) ? a[n][0] : a[n][1];
}
function Ap(t) {
  for (var r = t.length, e = new Array(r); --r >= 0; )
    e[r] = r;
  return e;
}
function aN(t, r) {
  return t[r];
}
function iN(t) {
  const r = [];
  return r.key = t, r;
}
function oN() {
  var t = Ct([]), r = Ap, e = Op, n = aN;
  function a(i) {
    var o = Array.from(t.apply(this, arguments), iN), s, u = o.length, l = -1, c;
    for (const f of i)
      for (s = 0, ++l; s < u; ++s)
        (o[s][l] = [0, +n(f, o[s].key, l, i)]).data = f;
    for (s = 0, c = KM(r(o)); s < u; ++s)
      o[c[s]].index = s;
    return e(o, c), o;
  }
  return a.keys = function(i) {
    return arguments.length ? (t = typeof i == "function" ? i : Ct(Array.from(i)), a) : t;
  }, a.value = function(i) {
    return arguments.length ? (n = typeof i == "function" ? i : Ct(+i), a) : n;
  }, a.order = function(i) {
    return arguments.length ? (r = i == null ? Ap : typeof i == "function" ? i : Ct(Array.from(i)), a) : r;
  }, a.offset = function(i) {
    return arguments.length ? (e = i ?? Op, a) : e;
  }, a;
}
const so = (t) => () => t;
function sN(t, {
  sourceEvent: r,
  target: e,
  transform: n,
  dispatch: a
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: r, enumerable: !0, configurable: !0 },
    target: { value: e, enumerable: !0, configurable: !0 },
    transform: { value: n, enumerable: !0, configurable: !0 },
    _: { value: a }
  });
}
function Ur(t, r, e) {
  this.k = t, this.x = r, this.y = e;
}
Ur.prototype = {
  constructor: Ur,
  scale: function(t) {
    return t === 1 ? this : new Ur(this.k * t, this.x, this.y);
  },
  translate: function(t, r) {
    return t === 0 & r === 0 ? this : new Ur(this.k, this.x + this.k * t, this.y + this.k * r);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var jv = new Ur(1, 0, 0);
Ur.prototype;
function Nl(t) {
  t.stopImmediatePropagation();
}
function xa(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function uN(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function lN() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Rp() {
  return this.__zoom || jv;
}
function cN(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function fN() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function hN(t, r, e) {
  var n = t.invertX(r[0][0]) - e[0][0], a = t.invertX(r[1][0]) - e[1][0], i = t.invertY(r[0][1]) - e[0][1], o = t.invertY(r[1][1]) - e[1][1];
  return t.translate(
    a > n ? (n + a) / 2 : Math.min(0, n) || Math.max(0, a),
    o > i ? (i + o) / 2 : Math.min(0, i) || Math.max(0, o)
  );
}
function nx() {
  var t = uN, r = lN, e = hN, n = cN, a = fN, i = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, u = x2, l = _v("start", "zoom", "end"), c, f, h, v = 500, d = 150, $ = 0, y = 10;
  function p(m) {
    m.property("__zoom", Rp).on("wheel.zoom", q, { passive: !1 }).on("mousedown.zoom", Z).on("dblclick.zoom", nt).filter(a).on("touchstart.zoom", k).on("touchmove.zoom", Y).on("touchend.zoom touchcancel.zoom", L).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  p.transform = function(m, C, x, N) {
    var j = m.selection ? m.selection() : m;
    j.property("__zoom", Rp), m !== j ? M(m, C, x, N) : j.interrupt().each(function() {
      B(this, arguments).event(N).start().zoom(null, typeof C == "function" ? C.apply(this, arguments) : C).end();
    });
  }, p.scaleBy = function(m, C, x, N) {
    p.scaleTo(m, function() {
      var j = this.__zoom.k, w = typeof C == "function" ? C.apply(this, arguments) : C;
      return j * w;
    }, x, N);
  }, p.scaleTo = function(m, C, x, N) {
    p.transform(m, function() {
      var j = r.apply(this, arguments), w = this.__zoom, S = x == null ? _(j) : typeof x == "function" ? x.apply(this, arguments) : x, E = w.invert(S), F = typeof C == "function" ? C.apply(this, arguments) : C;
      return e(I(b(w, F), S, E), j, o);
    }, x, N);
  }, p.translateBy = function(m, C, x, N) {
    p.transform(m, function() {
      return e(this.__zoom.translate(
        typeof C == "function" ? C.apply(this, arguments) : C,
        typeof x == "function" ? x.apply(this, arguments) : x
      ), r.apply(this, arguments), o);
    }, null, N);
  }, p.translateTo = function(m, C, x, N, j) {
    p.transform(m, function() {
      var w = r.apply(this, arguments), S = this.__zoom, E = N == null ? _(w) : typeof N == "function" ? N.apply(this, arguments) : N;
      return e(jv.translate(E[0], E[1]).scale(S.k).translate(
        typeof C == "function" ? -C.apply(this, arguments) : -C,
        typeof x == "function" ? -x.apply(this, arguments) : -x
      ), w, o);
    }, N, j);
  };
  function b(m, C) {
    return C = Math.max(i[0], Math.min(i[1], C)), C === m.k ? m : new Ur(C, m.x, m.y);
  }
  function I(m, C, x) {
    var N = C[0] - x[0] * m.k, j = C[1] - x[1] * m.k;
    return N === m.x && j === m.y ? m : new Ur(m.k, N, j);
  }
  function _(m) {
    return [(+m[0][0] + +m[1][0]) / 2, (+m[0][1] + +m[1][1]) / 2];
  }
  function M(m, C, x, N) {
    m.on("start.zoom", function() {
      B(this, arguments).event(N).start();
    }).on("interrupt.zoom end.zoom", function() {
      B(this, arguments).event(N).end();
    }).tween("zoom", function() {
      var j = this, w = arguments, S = B(j, w).event(N), E = r.apply(j, w), F = x == null ? _(E) : typeof x == "function" ? x.apply(j, w) : x, T = Math.max(E[1][0] - E[0][0], E[1][1] - E[0][1]), R = j.__zoom, P = typeof C == "function" ? C.apply(j, w) : C, G = u(R.invert(F).concat(T / R.k), P.invert(F).concat(T / P.k));
      return function(Q) {
        if (Q === 1)
          Q = P;
        else {
          var it = G(Q), ir = T / it[2];
          Q = new Ur(ir, F[0] - it[0] * ir, F[1] - it[1] * ir);
        }
        S.zoom(null, Q);
      };
    });
  }
  function B(m, C, x) {
    return !x && m.__zooming || new H(m, C);
  }
  function H(m, C) {
    this.that = m, this.args = C, this.active = 0, this.sourceEvent = null, this.extent = r.apply(m, C), this.taps = 0;
  }
  H.prototype = {
    event: function(m) {
      return m && (this.sourceEvent = m), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(m, C) {
      return this.mouse && m !== "mouse" && (this.mouse[1] = C.invert(this.mouse[0])), this.touch0 && m !== "touch" && (this.touch0[1] = C.invert(this.touch0[0])), this.touch1 && m !== "touch" && (this.touch1[1] = C.invert(this.touch1[0])), this.that.__zoom = C, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(m) {
      var C = dt(this.that).datum();
      l.call(
        m,
        this.that,
        new sN(m, {
          sourceEvent: this.sourceEvent,
          target: p,
          type: m,
          transform: this.that.__zoom,
          dispatch: l
        }),
        C
      );
    }
  };
  function q(m, ...C) {
    if (!t.apply(this, arguments))
      return;
    var x = B(this, C).event(m), N = this.__zoom, j = Math.max(i[0], Math.min(i[1], N.k * Math.pow(2, n.apply(this, arguments)))), w = we(m);
    if (x.wheel)
      (x.mouse[0][0] !== w[0] || x.mouse[0][1] !== w[1]) && (x.mouse[1] = N.invert(x.mouse[0] = w)), clearTimeout(x.wheel);
    else {
      if (N.k === j)
        return;
      x.mouse = [w, N.invert(w)], as(this), x.start();
    }
    xa(m), x.wheel = setTimeout(S, d), x.zoom("mouse", e(I(b(N, j), x.mouse[0], x.mouse[1]), x.extent, o));
    function S() {
      x.wheel = null, x.end();
    }
  }
  function Z(m, ...C) {
    if (h || !t.apply(this, arguments))
      return;
    var x = m.currentTarget, N = B(this, C, !0).event(m), j = dt(m.view).on("mousemove.zoom", F, !0).on("mouseup.zoom", T, !0), w = we(m, x), S = m.clientX, E = m.clientY;
    zC(m.view), Nl(m), N.mouse = [w, this.__zoom.invert(w)], as(this), N.start();
    function F(R) {
      if (xa(R), !N.moved) {
        var P = R.clientX - S, G = R.clientY - E;
        N.moved = P * P + G * G > $;
      }
      N.event(R).zoom("mouse", e(I(N.that.__zoom, N.mouse[0] = we(R, x), N.mouse[1]), N.extent, o));
    }
    function T(R) {
      j.on("mousemove.zoom mouseup.zoom", null), VC(R.view, N.moved), xa(R), N.event(R).end();
    }
  }
  function nt(m, ...C) {
    if (t.apply(this, arguments)) {
      var x = this.__zoom, N = we(m.changedTouches ? m.changedTouches[0] : m, this), j = x.invert(N), w = x.k * (m.shiftKey ? 0.5 : 2), S = e(I(b(x, w), N, j), r.apply(this, C), o);
      xa(m), s > 0 ? dt(this).transition().duration(s).call(M, S, N, m) : dt(this).call(p.transform, S, N, m);
    }
  }
  function k(m, ...C) {
    if (t.apply(this, arguments)) {
      var x = m.touches, N = x.length, j = B(this, C, m.changedTouches.length === N).event(m), w, S, E, F;
      for (Nl(m), S = 0; S < N; ++S)
        E = x[S], F = we(E, this), F = [F, this.__zoom.invert(F), E.identifier], j.touch0 ? !j.touch1 && j.touch0[2] !== F[2] && (j.touch1 = F, j.taps = 0) : (j.touch0 = F, w = !0, j.taps = 1 + !!c);
      c && (c = clearTimeout(c)), w && (j.taps < 2 && (f = F[0], c = setTimeout(function() {
        c = null;
      }, v)), as(this), j.start());
    }
  }
  function Y(m, ...C) {
    if (this.__zooming) {
      var x = B(this, C).event(m), N = m.changedTouches, j = N.length, w, S, E, F;
      for (xa(m), w = 0; w < j; ++w)
        S = N[w], E = we(S, this), x.touch0 && x.touch0[2] === S.identifier ? x.touch0[0] = E : x.touch1 && x.touch1[2] === S.identifier && (x.touch1[0] = E);
      if (S = x.that.__zoom, x.touch1) {
        var T = x.touch0[0], R = x.touch0[1], P = x.touch1[0], G = x.touch1[1], Q = (Q = P[0] - T[0]) * Q + (Q = P[1] - T[1]) * Q, it = (it = G[0] - R[0]) * it + (it = G[1] - R[1]) * it;
        S = b(S, Math.sqrt(Q / it)), E = [(T[0] + P[0]) / 2, (T[1] + P[1]) / 2], F = [(R[0] + G[0]) / 2, (R[1] + G[1]) / 2];
      } else if (x.touch0)
        E = x.touch0[0], F = x.touch0[1];
      else
        return;
      x.zoom("touch", e(I(S, E, F), x.extent, o));
    }
  }
  function L(m, ...C) {
    if (this.__zooming) {
      var x = B(this, C).event(m), N = m.changedTouches, j = N.length, w, S;
      for (Nl(m), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, v), w = 0; w < j; ++w)
        S = N[w], x.touch0 && x.touch0[2] === S.identifier ? delete x.touch0 : x.touch1 && x.touch1[2] === S.identifier && delete x.touch1;
      if (x.touch1 && !x.touch0 && (x.touch0 = x.touch1, delete x.touch1), x.touch0)
        x.touch0[1] = this.__zoom.invert(x.touch0[0]);
      else if (x.end(), x.taps === 2 && (S = we(S, this), Math.hypot(f[0] - S[0], f[1] - S[1]) < y)) {
        var E = dt(this).on("dblclick.zoom");
        E && E.apply(this, arguments);
      }
    }
  }
  return p.wheelDelta = function(m) {
    return arguments.length ? (n = typeof m == "function" ? m : so(+m), p) : n;
  }, p.filter = function(m) {
    return arguments.length ? (t = typeof m == "function" ? m : so(!!m), p) : t;
  }, p.touchable = function(m) {
    return arguments.length ? (a = typeof m == "function" ? m : so(!!m), p) : a;
  }, p.extent = function(m) {
    return arguments.length ? (r = typeof m == "function" ? m : so([[+m[0][0], +m[0][1]], [+m[1][0], +m[1][1]]]), p) : r;
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
class xi {
  constructor() {
    this.width = 800, this.height = 800, this.enableTooltips = !0;
  }
}
var sh;
((t) => {
  function r(s) {
    return s < 0.5 ? 4 * s * s * s : 1 - Math.pow(-2 * s + 2, 3) / 2;
  }
  t.easeInEaseOutCubic = r;
  function e(s) {
    return s * s * s;
  }
  t.easeInCubic = e;
  function n(s) {
    return 1 - Math.pow(1 - s, 3);
  }
  t.easeOutCubic = n;
  function a(s) {
    const u = 2 * Math.PI / 4.5;
    return s === 0 ? 0 : s === 1 ? 1 : s < 0.5 ? -(Math.pow(2, 20 * s - 10) * Math.sin((20 * s - 11.125) * u)) / 2 : Math.pow(2, -20 * s + 10) * Math.sin((20 * s - 11.125) * u) / 2 + 1;
  }
  t.easeInEaseOutElastic = a;
  function i(s) {
    const u = 2 * Math.PI / 3;
    return s === 0 ? 0 : s === 1 ? 1 : -Math.pow(2, 10 * s - 10) * Math.sin((s * 10 - 10.75) * u);
  }
  t.easeInElastic = i;
  function o(s) {
    const u = 2 * Math.PI / 3;
    return s === 0 ? 0 : s === 1 ? 1 : Math.pow(2, -10 * s) * Math.sin((s * 10 - 0.75) * u) + 1;
  }
  t.easeOutElastic = o;
})(sh || (sh = {}));
const ax = class uh {
  constructor(r, e, n, a, i) {
    this._parent = r, this._leftChild = e, this._rightChild = n, this.values = a, this.height = i, this.id = uh.currentID, uh.currentID++;
  }
  get parent() {
    return this._parent;
  }
  set parent(r) {
    this._parent = r;
  }
  get leftChild() {
    return this._leftChild;
  }
  set leftChild(r) {
    this._leftChild = r;
  }
  get rightChild() {
    return this._rightChild;
  }
  set rightChild(r) {
    this._rightChild = r;
  }
  /**
   * Convert this tree and all of it's children to the Newic-format.
   *
   * @param: idExtractor Function that extract's the name from a given node's id.
   */
  toNewick(r) {
    let e = "";
    return !this.leftChild && !this.rightChild ? r(this.values[0].id) + ":" + this.height : (e += "(", this.leftChild && (e += this.leftChild.toNewick(r) + ","), this.rightChild && (e += this.rightChild.toNewick(r)), e += ")" + this.id + ":" + this.height, e);
  }
  /**
   * Convert this tree and all of it's children to the dot GraphViz-format.
   */
  toGraphViz(r) {
    let e = this, n = `digraph dendrogram {
`, a = "", i = "", o = [e];
    for (; o.length > 0 && (e = o.shift(), !!e); )
      !e.leftChild && !e.rightChild ? a += `    ${e.id} [label="${r(e.values[0].id)}"];
` : a += `    ${e.id} [label="${e.id}"];
`, e.leftChild && (i += `    ${e.id} -> ${e.leftChild.id};
`, o.push(e.leftChild)), e.rightChild && (i += `    ${e.id} -> ${e.rightChild.id};
`, o.push(e.rightChild));
    return n += a + i + "}", n;
  }
};
ax.currentID = 0;
let os = ax;
class vN {
  constructor(r, e, n) {
    this.elements = r, this.index = e, this.treeNode = n;
  }
  /**
   * Merge 2 clusters with each other and create the associated nodes of the dendrogram.
   *
   * @param other The other cluster with whom this one needs to be merged.
   * @param height The height of the dendrogram at which the clustering occurs.
   */
  merge(r, e) {
    this.elements.push(...r.elements);
    const n = new os(null, this.treeNode, r.treeNode, this.elements.slice(), e);
    this.treeNode.parent = n, r.treeNode.parent = n, this.treeNode = n;
  }
}
class dN {
  /**
   * @param metric A distance metric that's used for the clustering performed by this class.
   */
  constructor(r) {
    this.metric = r;
  }
  /**
   * This function returns the root of a dendrogram, based upon the given dataset. The clustering is performed on
   * a distance matrix, which is calculated using the metric, defined in the constructor of this class.
   *
   * @param data A matrix containing data elements that should be clustered. The elements are either clustered on row
   *        or column similarity.
   */
  cluster(r) {
    if (os.currentID = 0, r.length < 1)
      return new os(null, null, null, [], 0);
    let e = /* @__PURE__ */ new Map(), n = [];
    for (let o = 0; o < r.length; o++) {
      let s = r[o].values;
      e.set(o, new vN([r[o]], o, new os(null, null, null, [r[o]], 0))), n.push(s);
    }
    let a = this.metric.getDistance(n), i = 0;
    for (; i != a.length - 1; ) {
      let o = 1 / 0, s = -1, u = -1;
      for (let v of e.keys())
        for (let d of e.keys())
          v > d && a[v][d] < o && (o = a[v][d], s = v, u = d);
      let l = e.get(s), c = e.get(u), f = o / 2;
      if (!l || !c)
        throw "At least one cluster is invalid!";
      let h = this.copyDistanceMatrix(a);
      for (let v of e.keys())
        if (v != s && v != u) {
          let d;
          v > s ? d = a[v][s] : d = a[s][v];
          let $;
          v > u ? $ = a[v][u] : $ = a[u][v];
          let y = (l.elements.length * d + c.elements.length * $) / (l.elements.length + c.elements.length);
          v > s ? h[v][s] = y : h[s][v] = y;
        }
      a = h, l.merge(c, f), e.delete(u), ++i;
    }
    return e.values().next().value.treeNode;
  }
  copyDistanceMatrix(r) {
    let e = [];
    for (let n = 0; n < r.length; n++) {
      let a = [], i = r[n];
      for (let o = 0; o < i.length; o++)
        a.push(i[o]);
      e.push(a);
    }
    return e;
  }
}
class gN {
  getDistance(r) {
    let e = [];
    for (let n = 0; n < r.length; n++) {
      let a = [];
      for (let i = 0; i <= n; i++)
        a.push(this.calculateEuclideanDistance(r[n], r[i]));
      e.push(a);
    }
    return e;
  }
  calculateEuclideanDistance(r, e) {
    if (r.length != e.length)
      throw "Euclidean distance can only be calculated for 2 equally sized input arrays!";
    let n = 0;
    for (let a = 0; a < r.length; a++)
      n += Math.pow(e[a] - r[a], 2);
    return Math.sqrt(n);
  }
}
class pN {
  constructor() {
    this.nodeMinMap = /* @__PURE__ */ new Map();
  }
  reorder(r) {
    return this.nodeMinMap.clear(), this.sortMinimum(r);
  }
  sortMinimum(r) {
    if (!r.leftChild || !r.rightChild)
      return r;
    let e = r.leftChild, n = r.rightChild, a = !e.leftChild && !e.rightChild, i = !n.leftChild && !n.rightChild;
    if (a && i)
      this.nodeMinMap.set(r, r.height);
    else if (!a && i) {
      let o = this.sortMinimum(e);
      r.leftChild = o;
      let s = this.nodeMinMap.get(o);
      if (s === void 0)
        throw "The recursive call to sort the left subtree did not yield a minimum value.";
      this.nodeMinMap.set(r, Math.min(r.height, s));
    } else if (a && !i) {
      let o = this.sortMinimum(n);
      r.leftChild = o, r.rightChild = e;
      let s = this.nodeMinMap.get(o);
      if (s === void 0)
        throw "The recursive call to sort the right subtree did not yield a minimum value.";
      this.nodeMinMap.set(r, Math.min(r.height, s));
    } else {
      let o = this.sortMinimum(e), s = this.sortMinimum(n), u = this.nodeMinMap.get(o), l = this.nodeMinMap.get(s);
      if (u === void 0 || l === void 0)
        throw "One of the recursive calls to sort a subtree did not yield a minimum value.";
      u <= l ? (r.leftChild = o, r.rightChild = s) : (r.leftChild = s, r.rightChild = o), this.nodeMinMap.set(r, Math.min(r.height, u, l));
    }
    return r;
  }
}
class _p extends xi {
  constructor() {
    super(...arguments), this.initialTextWidth = 100, this.initialTextHeight = 100, this.squarePadding = 2, this.visualizationTextPadding = 4, this.fontSize = 14, this.labelColor = "#404040", this.highlightSelection = !0, this.highlightFontSize = 16, this.highlightFontColor = "black", this.className = "heatmap", this.animationsEnabled = !0, this.animationDuration = 2e3, this.transition = sh.easeInEaseOutCubic, this.minColor = "#EEEEEE", this.maxColor = "#1565C0", this.colorBuckets = 50, this.dendrogramEnabled = !1, this.dendrogramWidth = 100, this.dendrogramLineWidth = 1, this.dendrogramColor = "#404040", this.clusteringAlgorithm = new dN(new gN()), this.reorderer = new pN(), this.getTooltip = (r, e, n) => `
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
                    ${this.getTooltipTitle(r, e, n)}
                </div>
                <a>
                    ${this.getTooltipText(r)}
                </a>
            </div>
        `, this.getTooltipTitle = (r, e, n) => `${n.name ? n.name : ""}${n.name ? " and " : ""}${e.name ? e.name : ""}`, this.getTooltipText = (r) => `Similarity: ${(r.value * 100).toFixed(2)}%`;
  }
}
class Cp {
  constructor(r, e) {
    this.values = r, this.id = e;
  }
}
class Pp {
  /**
   * Converts an array of feature labels into correct HeatmapFeature objects. These objects keep track of a name
   * and index for a feature.
   *
   * @param featureLabels All labels that should be converted to true HeatmapFeature objects.
   * @return An array with HeatmapFeature objects.
   */
  preprocessFeatures(r) {
    return Object.entries(r).map(([e, n]) => ({
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
  preprocessValues(r, e, n, a) {
    const i = Dv(Be(e), Be(n)), s = de().domain([0, 1]).range([0, 1]).ticks(a), u = rx().domain([0, 1]).range(s);
    return Object.entries(r).map(([l, c]) => Object.entries(c).map(([f, h]) => {
      if (typeof h == "number") {
        const v = u(h);
        if (v === void 0)
          throw new Error("Invalid heatmap value given: " + h);
        return {
          value: h,
          rowId: Number.parseInt(l),
          columnId: Number.parseInt(f),
          color: i(v)
        };
      } else
        return h;
    }));
  }
  /**
   * Order all values in a map, per color.
   *
   * @param values All grid values for which we should determine a color.
   * @return A mapping between an HTML-color value and a list of [row, col] positions.
   */
  orderPerColor(r) {
    var n;
    const e = /* @__PURE__ */ new Map();
    for (let a = 0; a < r.length; a++)
      for (let i = 0; i < r[a].length; i++) {
        const o = r[a][i].color;
        e.has(o) || e.set(o, []), (n = e.get(o)) == null || n.push([a, i]);
      }
    return e;
  }
}
var uo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ea = function(t) {
  return t && t.Math === Math && t;
}, D = (
  // eslint-disable-next-line es/no-global-this -- safe
  Ea(typeof globalThis == "object" && globalThis) || Ea(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
  Ea(typeof self == "object" && self) || Ea(typeof uo == "object" && uo) || Ea(typeof uo == "object" && uo) || // eslint-disable-next-line no-new-func -- fallback
  function() {
    return this;
  }() || Function("return this")()
), xt = {}, O = function(t) {
  try {
    return !!t();
  } catch {
    return !0;
  }
}, $N = O, z = !$N(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] !== 7;
}), yN = O, Ei = !yN(function() {
  var t = (function() {
  }).bind();
  return typeof t != "function" || t.hasOwnProperty("prototype");
}), mN = Ei, lo = Function.prototype.call, V = mN ? lo.bind(lo) : function() {
  return lo.apply(lo, arguments);
}, Ti = {}, ix = {}.propertyIsEnumerable, ox = Object.getOwnPropertyDescriptor, bN = ox && !ix.call({ 1: 2 }, 1);
Ti.f = bN ? function(r) {
  var e = ox(this, r);
  return !!e && e.enumerable;
} : ix;
var tr = function(t, r) {
  return {
    enumerable: !(t & 1),
    configurable: !(t & 2),
    writable: !(t & 4),
    value: r
  };
}, sx = Ei, ux = Function.prototype, lh = ux.call, wN = sx && ux.bind.bind(lh, lh), A = sx ? wN : function(t) {
  return function() {
    return lh.apply(t, arguments);
  };
}, lx = A, SN = lx({}.toString), xN = lx("".slice), Et = function(t) {
  return xN(SN(t), 8, -1);
}, EN = A, TN = O, IN = Et, Dl = Object, ON = EN("".split), ta = TN(function() {
  return !Dl("z").propertyIsEnumerable(0);
}) ? function(t) {
  return IN(t) === "String" ? ON(t, "") : Dl(t);
} : Dl, Dt = function(t) {
  return t == null;
}, AN = Dt, RN = TypeError, ut = function(t) {
  if (AN(t))
    throw new RN("Can't call method on " + t);
  return t;
}, _N = ta, CN = ut, pt = function(t) {
  return _N(CN(t));
}, Ll = typeof document == "object" && document.all, tt = typeof Ll > "u" && Ll !== void 0 ? function(t) {
  return typeof t == "function" || t === Ll;
} : function(t) {
  return typeof t == "function";
}, PN = tt, K = function(t) {
  return typeof t == "object" ? t !== null : PN(t);
}, Fl = D, MN = tt, NN = function(t) {
  return MN(t) ? t : void 0;
}, ot = function(t, r) {
  return arguments.length < 2 ? NN(Fl[t]) : Fl[t] && Fl[t][r];
}, DN = A, Lt = DN({}.isPrototypeOf), LN = D, Mp = LN.navigator, Np = Mp && Mp.userAgent, _r = Np ? String(Np) : "", cx = D, kl = _r, Dp = cx.process, Lp = cx.Deno, Fp = Dp && Dp.versions || Lp && Lp.version, kp = Fp && Fp.v8, lr, Ds;
kp && (lr = kp.split("."), Ds = lr[0] > 0 && lr[0] < 4 ? 1 : +(lr[0] + lr[1]));
!Ds && kl && (lr = kl.match(/Edge\/(\d+)/), (!lr || lr[1] >= 74) && (lr = kl.match(/Chrome\/(\d+)/), lr && (Ds = +lr[1])));
var Kr = Ds, Bp = Kr, FN = O, kN = D, BN = kN.String, ra = !!Object.getOwnPropertySymbols && !FN(function() {
  var t = Symbol("symbol detection");
  return !BN(t) || !(Object(t) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && Bp && Bp < 41;
}), jN = ra, fx = jN && !Symbol.sham && typeof Symbol.iterator == "symbol", UN = ot, zN = tt, VN = Lt, HN = fx, GN = Object, Ge = HN ? function(t) {
  return typeof t == "symbol";
} : function(t) {
  var r = UN("Symbol");
  return zN(r) && VN(r.prototype, GN(t));
}, WN = String, We = function(t) {
  try {
    return WN(t);
  } catch {
    return "Object";
  }
}, qN = tt, YN = We, KN = TypeError, et = function(t) {
  if (qN(t))
    return t;
  throw new KN(YN(t) + " is not a function");
}, XN = et, JN = Dt, Cr = function(t, r) {
  var e = t[r];
  return JN(e) ? void 0 : XN(e);
}, Bl = V, jl = tt, Ul = K, ZN = TypeError, hx = function(t, r) {
  var e, n;
  if (r === "string" && jl(e = t.toString) && !Ul(n = Bl(e, t)) || jl(e = t.valueOf) && !Ul(n = Bl(e, t)) || r !== "string" && jl(e = t.toString) && !Ul(n = Bl(e, t)))
    return n;
  throw new ZN("Can't convert object to primitive value");
}, vx = { exports: {} }, Xr = !1, jp = D, QN = Object.defineProperty, Uv = function(t, r) {
  try {
    QN(jp, t, { value: r, configurable: !0, writable: !0 });
  } catch {
    jp[t] = r;
  }
  return r;
}, tD = D, rD = Uv, Up = "__core-js_shared__", zp = vx.exports = tD[Up] || rD(Up, {});
(zp.versions || (zp.versions = [])).push({
  version: "3.41.0",
  mode: "global",
  copyright: "© 2014-2025 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.41.0/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var zv = vx.exports, Vp = zv, ea = function(t, r) {
  return Vp[t] || (Vp[t] = r || {});
}, eD = ut, nD = Object, at = function(t) {
  return nD(eD(t));
}, aD = A, iD = at, oD = aD({}.hasOwnProperty), rt = Object.hasOwn || function(r, e) {
  return oD(iD(r), e);
}, sD = A, uD = 0, lD = Math.random(), cD = sD(1 .toString), na = function(t) {
  return "Symbol(" + (t === void 0 ? "" : t) + ")_" + cD(++uD + lD, 36);
}, fD = D, hD = ea, Hp = rt, vD = na, dD = ra, gD = fx, xn = fD.Symbol, zl = hD("wks"), pD = gD ? xn.for || xn : xn && xn.withoutSetter || vD, X = function(t) {
  return Hp(zl, t) || (zl[t] = dD && Hp(xn, t) ? xn[t] : pD("Symbol." + t)), zl[t];
}, $D = V, Gp = K, Wp = Ge, yD = Cr, mD = hx, bD = X, wD = TypeError, SD = bD("toPrimitive"), yu = function(t, r) {
  if (!Gp(t) || Wp(t))
    return t;
  var e = yD(t, SD), n;
  if (e) {
    if (r === void 0 && (r = "default"), n = $D(e, t, r), !Gp(n) || Wp(n))
      return n;
    throw new wD("Can't convert object to primitive value");
  }
  return r === void 0 && (r = "number"), mD(t, r);
}, xD = yu, ED = Ge, $e = function(t) {
  var r = xD(t, "string");
  return ED(r) ? r : r + "";
}, TD = D, qp = K, ch = TD.document, ID = qp(ch) && qp(ch.createElement), mu = function(t) {
  return ID ? ch.createElement(t) : {};
}, OD = z, AD = O, RD = mu, dx = !OD && !AD(function() {
  return Object.defineProperty(RD("div"), "a", {
    get: function() {
      return 7;
    }
  }).a !== 7;
}), _D = z, CD = V, PD = Ti, MD = tr, ND = pt, DD = $e, LD = rt, FD = dx, Yp = Object.getOwnPropertyDescriptor;
xt.f = _D ? Yp : function(r, e) {
  if (r = ND(r), e = DD(e), FD)
    try {
      return Yp(r, e);
    } catch {
    }
  if (LD(r, e))
    return MD(!CD(PD.f, r, e), r[e]);
};
var lt = {}, kD = z, BD = O, gx = kD && BD(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: !1
  }).prototype !== 42;
}), jD = K, UD = String, zD = TypeError, U = function(t) {
  if (jD(t))
    return t;
  throw new zD(UD(t) + " is not an object");
}, VD = z, HD = dx, GD = gx, co = U, Kp = $e, WD = TypeError, Vl = Object.defineProperty, qD = Object.getOwnPropertyDescriptor, Hl = "enumerable", Gl = "configurable", Wl = "writable";
lt.f = VD ? GD ? function(r, e, n) {
  if (co(r), e = Kp(e), co(n), typeof r == "function" && e === "prototype" && "value" in n && Wl in n && !n[Wl]) {
    var a = qD(r, e);
    a && a[Wl] && (r[e] = n.value, n = {
      configurable: Gl in n ? n[Gl] : a[Gl],
      enumerable: Hl in n ? n[Hl] : a[Hl],
      writable: !1
    });
  }
  return Vl(r, e, n);
} : Vl : function(r, e, n) {
  if (co(r), e = Kp(e), co(n), HD)
    try {
      return Vl(r, e, n);
    } catch {
    }
  if ("get" in n || "set" in n)
    throw new WD("Accessors not supported");
  return "value" in n && (r[e] = n.value), r;
};
var YD = z, KD = lt, XD = tr, Tt = YD ? function(t, r, e) {
  return KD.f(t, r, XD(1, e));
} : function(t, r, e) {
  return t[r] = e, t;
}, px = { exports: {} }, fh = z, JD = rt, $x = Function.prototype, ZD = fh && Object.getOwnPropertyDescriptor, Vv = JD($x, "name"), QD = Vv && (function() {
}).name === "something", tL = Vv && (!fh || fh && ZD($x, "name").configurable), aa = {
  EXISTS: Vv,
  PROPER: QD,
  CONFIGURABLE: tL
}, rL = A, eL = tt, hh = zv, nL = rL(Function.toString);
eL(hh.inspectSource) || (hh.inspectSource = function(t) {
  return nL(t);
});
var Hv = hh.inspectSource, aL = D, iL = tt, Xp = aL.WeakMap, yx = iL(Xp) && /native code/.test(String(Xp)), oL = ea, sL = na, Jp = oL("keys"), bu = function(t) {
  return Jp[t] || (Jp[t] = sL(t));
}, Ii = {}, uL = yx, mx = D, lL = K, cL = Tt, ql = rt, Yl = zv, fL = bu, hL = Ii, Zp = "Object already initialized", vh = mx.TypeError, vL = mx.WeakMap, Ls, hi, Fs, dL = function(t) {
  return Fs(t) ? hi(t) : Ls(t, {});
}, gL = function(t) {
  return function(r) {
    var e;
    if (!lL(r) || (e = hi(r)).type !== t)
      throw new vh("Incompatible receiver, " + t + " required");
    return e;
  };
};
if (uL || Yl.state) {
  var wr = Yl.state || (Yl.state = new vL());
  wr.get = wr.get, wr.has = wr.has, wr.set = wr.set, Ls = function(t, r) {
    if (wr.has(t))
      throw new vh(Zp);
    return r.facade = t, wr.set(t, r), r;
  }, hi = function(t) {
    return wr.get(t) || {};
  }, Fs = function(t) {
    return wr.has(t);
  };
} else {
  var an = fL("state");
  hL[an] = !0, Ls = function(t, r) {
    if (ql(t, an))
      throw new vh(Zp);
    return r.facade = t, cL(t, an, r), r;
  }, hi = function(t) {
    return ql(t, an) ? t[an] : {};
  }, Fs = function(t) {
    return ql(t, an);
  };
}
var ht = {
  set: Ls,
  get: hi,
  has: Fs,
  enforce: dL,
  getterFor: gL
}, Gv = A, pL = O, $L = tt, fo = rt, dh = z, yL = aa.CONFIGURABLE, mL = Hv, bx = ht, bL = bx.enforce, wL = bx.get, Qp = String, ss = Object.defineProperty, SL = Gv("".slice), xL = Gv("".replace), EL = Gv([].join), TL = dh && !pL(function() {
  return ss(function() {
  }, "length", { value: 8 }).length !== 8;
}), IL = String(String).split("String"), OL = px.exports = function(t, r, e) {
  SL(Qp(r), 0, 7) === "Symbol(" && (r = "[" + xL(Qp(r), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), e && e.getter && (r = "get " + r), e && e.setter && (r = "set " + r), (!fo(t, "name") || yL && t.name !== r) && (dh ? ss(t, "name", { value: r, configurable: !0 }) : t.name = r), TL && e && fo(e, "arity") && t.length !== e.arity && ss(t, "length", { value: e.arity });
  try {
    e && fo(e, "constructor") && e.constructor ? dh && ss(t, "prototype", { writable: !1 }) : t.prototype && (t.prototype = void 0);
  } catch {
  }
  var n = bL(t);
  return fo(n, "source") || (n.source = EL(IL, typeof r == "string" ? r : "")), t;
};
Function.prototype.toString = OL(function() {
  return $L(this) && wL(this).source || mL(this);
}, "toString");
var Wv = px.exports, AL = tt, RL = lt, _L = Wv, CL = Uv, ct = function(t, r, e, n) {
  n || (n = {});
  var a = n.enumerable, i = n.name !== void 0 ? n.name : r;
  if (AL(e) && _L(e, i, n), n.global)
    a ? t[r] = e : CL(r, e);
  else {
    try {
      n.unsafe ? t[r] && (a = !0) : delete t[r];
    } catch {
    }
    a ? t[r] = e : RL.f(t, r, {
      value: e,
      enumerable: !1,
      configurable: !n.nonConfigurable,
      writable: !n.nonWritable
    });
  }
  return t;
}, ye = {}, PL = Math.ceil, ML = Math.floor, wx = Math.trunc || function(r) {
  var e = +r;
  return (e > 0 ? ML : PL)(e);
}, NL = wx, ft = function(t) {
  var r = +t;
  return r !== r || r === 0 ? 0 : NL(r);
}, DL = ft, LL = Math.max, FL = Math.min, Jr = function(t, r) {
  var e = DL(t);
  return e < 0 ? LL(e + r, 0) : FL(e, r);
}, kL = ft, BL = Math.min, zt = function(t) {
  var r = kL(t);
  return r > 0 ? BL(r, 9007199254740991) : 0;
}, jL = zt, st = function(t) {
  return jL(t.length);
}, UL = pt, zL = Jr, VL = st, t$ = function(t) {
  return function(r, e, n) {
    var a = UL(r), i = VL(a);
    if (i === 0)
      return !t && -1;
    var o = zL(n, i), s;
    if (t && e !== e) {
      for (; i > o; )
        if (s = a[o++], s !== s)
          return !0;
    } else
      for (; i > o; o++)
        if ((t || o in a) && a[o] === e)
          return t || o || 0;
    return !t && -1;
  };
}, Oi = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: t$(!0),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: t$(!1)
}, HL = A, Kl = rt, GL = pt, WL = Oi.indexOf, qL = Ii, r$ = HL([].push), Sx = function(t, r) {
  var e = GL(t), n = 0, a = [], i;
  for (i in e)
    !Kl(qL, i) && Kl(e, i) && r$(a, i);
  for (; r.length > n; )
    Kl(e, i = r[n++]) && (~WL(a, i) || r$(a, i));
  return a;
}, qv = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
], YL = Sx, KL = qv, XL = KL.concat("length", "prototype");
ye.f = Object.getOwnPropertyNames || function(r) {
  return YL(r, XL);
};
var Ai = {};
Ai.f = Object.getOwnPropertySymbols;
var JL = ot, ZL = A, QL = ye, tF = Ai, rF = U, eF = ZL([].concat), Yv = JL("Reflect", "ownKeys") || function(r) {
  var e = QL.f(rF(r)), n = tF.f;
  return n ? eF(e, n(r)) : e;
}, e$ = rt, nF = Yv, aF = xt, iF = lt, Ri = function(t, r, e) {
  for (var n = nF(r), a = iF.f, i = aF.f, o = 0; o < n.length; o++) {
    var s = n[o];
    !e$(t, s) && !(e && e$(e, s)) && a(t, s, i(r, s));
  }
}, oF = O, sF = tt, uF = /#|\.prototype\./, _i = function(t, r) {
  var e = cF[lF(t)];
  return e === hF ? !0 : e === fF ? !1 : sF(r) ? oF(r) : !!r;
}, lF = _i.normalize = function(t) {
  return String(t).replace(uF, ".").toLowerCase();
}, cF = _i.data = {}, fF = _i.NATIVE = "N", hF = _i.POLYFILL = "P", Ci = _i, ho = D, vF = xt.f, dF = Tt, gF = ct, pF = Uv, $F = Ri, yF = Ci, g = function(t, r) {
  var e = t.target, n = t.global, a = t.stat, i, o, s, u, l, c;
  if (n ? o = ho : a ? o = ho[e] || pF(e, {}) : o = ho[e] && ho[e].prototype, o)
    for (s in r) {
      if (l = r[s], t.dontCallGetSet ? (c = vF(o, s), u = c && c.value) : u = o[s], i = yF(n ? s : e + (a ? "." : "#") + s, t.forced), !i && u !== void 0) {
        if (typeof l == typeof u)
          continue;
        $F(l, u);
      }
      (t.sham || u && u.sham) && dF(l, "sham", !0), gF(o, s, l, t);
    }
}, mF = X, bF = mF("toStringTag"), xx = {};
xx[bF] = "z";
var Kv = String(xx) === "[object z]", wF = Kv, SF = tt, us = Et, xF = X, EF = xF("toStringTag"), TF = Object, IF = us(function() {
  return arguments;
}()) === "Arguments", OF = function(t, r) {
  try {
    return t[r];
  } catch {
  }
}, gr = wF ? us : function(t) {
  var r, e, n;
  return t === void 0 ? "Undefined" : t === null ? "Null" : typeof (e = OF(r = TF(t), EF)) == "string" ? e : IF ? us(r) : (n = us(r)) === "Object" && SF(r.callee) ? "Arguments" : n;
}, AF = gr, RF = String, W = function(t) {
  if (AF(t) === "Symbol")
    throw new TypeError("Cannot convert a Symbol value to a string");
  return RF(t);
}, wu = {}, _F = Sx, CF = qv, Pi = Object.keys || function(r) {
  return _F(r, CF);
}, PF = z, MF = gx, NF = lt, DF = U, LF = pt, FF = Pi;
wu.f = PF && !MF ? Object.defineProperties : function(r, e) {
  DF(r);
  for (var n = LF(e), a = FF(e), i = a.length, o = 0, s; i > o; )
    NF.f(r, s = a[o++], n[s]);
  return r;
};
var kF = ot, Ex = kF("document", "documentElement"), BF = U, jF = wu, n$ = qv, UF = Ii, zF = Ex, VF = mu, HF = bu, a$ = ">", i$ = "<", gh = "prototype", ph = "script", Tx = HF("IE_PROTO"), Xl = function() {
}, Ix = function(t) {
  return i$ + ph + a$ + t + i$ + "/" + ph + a$;
}, o$ = function(t) {
  t.write(Ix("")), t.close();
  var r = t.parentWindow.Object;
  return t = null, r;
}, GF = function() {
  var t = VF("iframe"), r = "java" + ph + ":", e;
  return t.style.display = "none", zF.appendChild(t), t.src = String(r), e = t.contentWindow.document, e.open(), e.write(Ix("document.F=Object")), e.close(), e.F;
}, vo, ls = function() {
  try {
    vo = new ActiveXObject("htmlfile");
  } catch {
  }
  ls = typeof document < "u" ? document.domain && vo ? o$(vo) : GF() : o$(vo);
  for (var t = n$.length; t--; )
    delete ls[gh][n$[t]];
  return ls();
};
UF[Tx] = !0;
var Vt = Object.create || function(r, e) {
  var n;
  return r !== null ? (Xl[gh] = BF(r), n = new Xl(), Xl[gh] = null, n[Tx] = r) : n = ls(), e === void 0 ? n : jF.f(n, e);
}, Su = {}, WF = A, rr = WF([].slice), qF = Et, YF = pt, Ox = ye.f, KF = rr, Ax = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], XF = function(t) {
  try {
    return Ox(t);
  } catch {
    return KF(Ax);
  }
};
Su.f = function(r) {
  return Ax && qF(r) === "Window" ? XF(r) : Ox(YF(r));
};
var s$ = Wv, JF = lt, vt = function(t, r, e) {
  return e.get && s$(e.get, r, { getter: !0 }), e.set && s$(e.set, r, { setter: !0 }), JF.f(t, r, e);
}, Xv = {}, ZF = X;
Xv.f = ZF;
var QF = D, Rx = QF, u$ = Rx, tk = rt, rk = Xv, ek = lt.f, Ft = function(t) {
  var r = u$.Symbol || (u$.Symbol = {});
  tk(r, t) || ek(r, t, {
    value: rk.f(t)
  });
}, nk = V, ak = ot, ik = X, ok = ct, _x = function() {
  var t = ak("Symbol"), r = t && t.prototype, e = r && r.valueOf, n = ik("toPrimitive");
  r && !r[n] && ok(r, n, function(a) {
    return nk(e, this);
  }, { arity: 1 });
}, sk = lt.f, uk = rt, lk = X, l$ = lk("toStringTag"), kt = function(t, r, e) {
  t && !e && (t = t.prototype), t && !uk(t, l$) && sk(t, l$, { configurable: !0, value: r });
}, ck = Et, fk = A, qe = function(t) {
  if (ck(t) === "Function")
    return fk(t);
}, c$ = qe, hk = et, vk = Ei, dk = c$(c$.bind), pr = function(t, r) {
  return hk(t), r === void 0 ? t : vk ? dk(t, r) : function() {
    return t.apply(r, arguments);
  };
}, gk = Et, me = Array.isArray || function(r) {
  return gk(r) === "Array";
}, pk = A, $k = O, Cx = tt, yk = gr, mk = ot, bk = Hv, Px = function() {
}, Mx = mk("Reflect", "construct"), Jv = /^\s*(?:class|function)\b/, wk = pk(Jv.exec), Sk = !Jv.test(Px), Ta = function(r) {
  if (!Cx(r))
    return !1;
  try {
    return Mx(Px, [], r), !0;
  } catch {
    return !1;
  }
}, Nx = function(r) {
  if (!Cx(r))
    return !1;
  switch (yk(r)) {
    case "AsyncFunction":
    case "GeneratorFunction":
    case "AsyncGeneratorFunction":
      return !1;
  }
  try {
    return Sk || !!wk(Jv, bk(r));
  } catch {
    return !0;
  }
};
Nx.sham = !0;
var ia = !Mx || $k(function() {
  var t;
  return Ta(Ta.call) || !Ta(Object) || !Ta(function() {
    t = !0;
  }) || t;
}) ? Nx : Ta, f$ = me, xk = ia, Ek = K, Tk = X, Ik = Tk("species"), h$ = Array, Ok = function(t) {
  var r;
  return f$(t) && (r = t.constructor, xk(r) && (r === h$ || f$(r.prototype)) ? r = void 0 : Ek(r) && (r = r[Ik], r === null && (r = void 0))), r === void 0 ? h$ : r;
}, Ak = Ok, Mi = function(t, r) {
  return new (Ak(t))(r === 0 ? 0 : r);
}, Rk = pr, _k = A, Ck = ta, Pk = at, Mk = st, Nk = Mi, v$ = _k([].push), ne = function(t) {
  var r = t === 1, e = t === 2, n = t === 3, a = t === 4, i = t === 6, o = t === 7, s = t === 5 || i;
  return function(u, l, c, f) {
    for (var h = Pk(u), v = Ck(h), d = Mk(v), $ = Rk(l, c), y = 0, p = f || Nk, b = r ? p(u, d) : e || o ? p(u, 0) : void 0, I, _; d > y; y++)
      if ((s || y in v) && (I = v[y], _ = $(I, y, h), t))
        if (r)
          b[y] = _;
        else if (_)
          switch (t) {
            case 3:
              return !0;
            case 5:
              return I;
            case 6:
              return y;
            case 2:
              v$(b, I);
          }
        else
          switch (t) {
            case 4:
              return !1;
            case 7:
              v$(b, I);
          }
    return i ? -1 : n || a ? a : b;
  };
}, bt = {
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
}, xu = g, Ni = D, Zv = V, Dk = A, Vn = z, Hn = ra, Lk = O, gt = rt, Fk = Lt, $h = U, Eu = pt, Qv = $e, kk = W, yh = tr, Gn = Vt, Dx = Pi, Bk = ye, Lx = Su, jk = Ai, Fx = xt, kx = lt, Uk = wu, Bx = Ti, Jl = ct, zk = vt, td = ea, Vk = bu, jx = Ii, d$ = na, Hk = X, Gk = Xv, Wk = Ft, qk = _x, Yk = kt, Ux = ht, Tu = bt.forEach, Mt = Vk("hidden"), Iu = "Symbol", vi = "prototype", Kk = Ux.set, g$ = Ux.getterFor(Iu), Qt = Object[vi], De = Ni.Symbol, Va = De && De[vi], Xk = Ni.RangeError, Jk = Ni.TypeError, Zl = Ni.QObject, zx = Fx.f, Le = kx.f, Vx = Lx.f, Zk = Bx.f, Hx = Dk([].push), Hr = td("symbols"), Di = td("op-symbols"), Qk = td("wks"), mh = !Zl || !Zl[vi] || !Zl[vi].findChild, Gx = function(t, r, e) {
  var n = zx(Qt, r);
  n && delete Qt[r], Le(t, r, e), n && t !== Qt && Le(Qt, r, n);
}, bh = Vn && Lk(function() {
  return Gn(Le({}, "a", {
    get: function() {
      return Le(this, "a", { value: 7 }).a;
    }
  })).a !== 7;
}) ? Gx : Le, Ql = function(t, r) {
  var e = Hr[t] = Gn(Va);
  return Kk(e, {
    type: Iu,
    tag: t,
    description: r
  }), Vn || (e.description = r), e;
}, Ou = function(r, e, n) {
  r === Qt && Ou(Di, e, n), $h(r);
  var a = Qv(e);
  return $h(n), gt(Hr, a) ? (n.enumerable ? (gt(r, Mt) && r[Mt][a] && (r[Mt][a] = !1), n = Gn(n, { enumerable: yh(0, !1) })) : (gt(r, Mt) || Le(r, Mt, yh(1, Gn(null))), r[Mt][a] = !0), bh(r, a, n)) : Le(r, a, n);
}, rd = function(r, e) {
  $h(r);
  var n = Eu(e), a = Dx(n).concat(Yx(n));
  return Tu(a, function(i) {
    (!Vn || Zv(wh, n, i)) && Ou(r, i, n[i]);
  }), r;
}, t3 = function(r, e) {
  return e === void 0 ? Gn(r) : rd(Gn(r), e);
}, wh = function(r) {
  var e = Qv(r), n = Zv(Zk, this, e);
  return this === Qt && gt(Hr, e) && !gt(Di, e) ? !1 : n || !gt(this, e) || !gt(Hr, e) || gt(this, Mt) && this[Mt][e] ? n : !0;
}, Wx = function(r, e) {
  var n = Eu(r), a = Qv(e);
  if (!(n === Qt && gt(Hr, a) && !gt(Di, a))) {
    var i = zx(n, a);
    return i && gt(Hr, a) && !(gt(n, Mt) && n[Mt][a]) && (i.enumerable = !0), i;
  }
}, qx = function(r) {
  var e = Vx(Eu(r)), n = [];
  return Tu(e, function(a) {
    !gt(Hr, a) && !gt(jx, a) && Hx(n, a);
  }), n;
}, Yx = function(t) {
  var r = t === Qt, e = Vx(r ? Di : Eu(t)), n = [];
  return Tu(e, function(a) {
    gt(Hr, a) && (!r || gt(Qt, a)) && Hx(n, Hr[a]);
  }), n;
};
Hn || (De = function() {
  if (Fk(Va, this))
    throw new Jk("Symbol is not a constructor");
  var r = !arguments.length || arguments[0] === void 0 ? void 0 : kk(arguments[0]), e = d$(r), n = function(a) {
    var i = this === void 0 ? Ni : this;
    i === Qt && Zv(n, Di, a), gt(i, Mt) && gt(i[Mt], e) && (i[Mt][e] = !1);
    var o = yh(1, a);
    try {
      bh(i, e, o);
    } catch (s) {
      if (!(s instanceof Xk))
        throw s;
      Gx(i, e, o);
    }
  };
  return Vn && mh && bh(Qt, e, { configurable: !0, set: n }), Ql(e, r);
}, Va = De[vi], Jl(Va, "toString", function() {
  return g$(this).tag;
}), Jl(De, "withoutSetter", function(t) {
  return Ql(d$(t), t);
}), Bx.f = wh, kx.f = Ou, Uk.f = rd, Fx.f = Wx, Bk.f = Lx.f = qx, jk.f = Yx, Gk.f = function(t) {
  return Ql(Hk(t), t);
}, Vn && (zk(Va, "description", {
  configurable: !0,
  get: function() {
    return g$(this).description;
  }
}), Jl(Qt, "propertyIsEnumerable", wh, { unsafe: !0 })));
xu({ global: !0, constructor: !0, wrap: !0, forced: !Hn, sham: !Hn }, {
  Symbol: De
});
Tu(Dx(Qk), function(t) {
  Wk(t);
});
xu({ target: Iu, stat: !0, forced: !Hn }, {
  useSetter: function() {
    mh = !0;
  },
  useSimple: function() {
    mh = !1;
  }
});
xu({ target: "Object", stat: !0, forced: !Hn, sham: !Vn }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: t3,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: Ou,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: rd,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: Wx
});
xu({ target: "Object", stat: !0, forced: !Hn }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: qx
});
qk();
Yk(De, Iu);
jx[Mt] = !0;
var r3 = ra, Kx = r3 && !!Symbol.for && !!Symbol.keyFor, e3 = g, n3 = ot, a3 = rt, i3 = W, Xx = ea, o3 = Kx, tc = Xx("string-to-symbol-registry"), s3 = Xx("symbol-to-string-registry");
e3({ target: "Symbol", stat: !0, forced: !o3 }, {
  for: function(t) {
    var r = i3(t);
    if (a3(tc, r))
      return tc[r];
    var e = n3("Symbol")(r);
    return tc[r] = e, s3[e] = r, e;
  }
});
var u3 = g, l3 = rt, c3 = Ge, f3 = We, h3 = ea, v3 = Kx, p$ = h3("symbol-to-string-registry");
u3({ target: "Symbol", stat: !0, forced: !v3 }, {
  keyFor: function(r) {
    if (!c3(r))
      throw new TypeError(f3(r) + " is not a symbol");
    if (l3(p$, r))
      return p$[r];
  }
});
var d3 = Ei, Jx = Function.prototype, $$ = Jx.apply, y$ = Jx.call, er = typeof Reflect == "object" && Reflect.apply || (d3 ? y$.bind($$) : function() {
  return y$.apply($$, arguments);
}), g3 = A, m$ = me, p3 = tt, b$ = Et, $3 = W, w$ = g3([].push), y3 = function(t) {
  if (p3(t))
    return t;
  if (m$(t)) {
    for (var r = t.length, e = [], n = 0; n < r; n++) {
      var a = t[n];
      typeof a == "string" ? w$(e, a) : (typeof a == "number" || b$(a) === "Number" || b$(a) === "String") && w$(e, $3(a));
    }
    var i = e.length, o = !0;
    return function(s, u) {
      if (o)
        return o = !1, u;
      if (m$(this))
        return u;
      for (var l = 0; l < i; l++)
        if (e[l] === s)
          return u;
    };
  }
}, m3 = g, Zx = ot, Qx = er, b3 = V, Li = A, tE = O, S$ = tt, x$ = Ge, rE = rr, w3 = y3, S3 = ra, x3 = String, he = Zx("JSON", "stringify"), go = Li(/./.exec), E$ = Li("".charAt), E3 = Li("".charCodeAt), T3 = Li("".replace), I3 = Li(1 .toString), O3 = /[\uD800-\uDFFF]/g, T$ = /^[\uD800-\uDBFF]$/, I$ = /^[\uDC00-\uDFFF]$/, O$ = !S3 || tE(function() {
  var t = Zx("Symbol")("stringify detection");
  return he([t]) !== "[null]" || he({ a: t }) !== "{}" || he(Object(t)) !== "{}";
}), A$ = tE(function() {
  return he("\uDF06\uD834") !== '"\\udf06\\ud834"' || he("\uDEAD") !== '"\\udead"';
}), A3 = function(t, r) {
  var e = rE(arguments), n = w3(r);
  if (!(!S$(n) && (t === void 0 || x$(t))))
    return e[1] = function(a, i) {
      if (S$(n) && (i = b3(n, this, x3(a), i)), !x$(i))
        return i;
    }, Qx(he, null, e);
}, R3 = function(t, r, e) {
  var n = E$(e, r - 1), a = E$(e, r + 1);
  return go(T$, t) && !go(I$, a) || go(I$, t) && !go(T$, n) ? "\\u" + I3(E3(t, 0), 16) : t;
};
he && m3({ target: "JSON", stat: !0, arity: 3, forced: O$ || A$ }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  stringify: function(r, e, n) {
    var a = rE(arguments), i = Qx(O$ ? A3 : he, null, a);
    return A$ && typeof i == "string" ? T3(i, O3, R3) : i;
  }
});
var _3 = g, C3 = ra, P3 = O, eE = Ai, M3 = at, N3 = !C3 || P3(function() {
  eE.f(1);
});
_3({ target: "Object", stat: !0, forced: N3 }, {
  getOwnPropertySymbols: function(r) {
    var e = eE.f;
    return e ? e(M3(r)) : [];
  }
});
var D3 = g, L3 = z, F3 = D, po = A, k3 = rt, B3 = tt, j3 = Lt, U3 = W, z3 = vt, V3 = Ri, kr = F3.Symbol, xe = kr && kr.prototype;
if (L3 && B3(kr) && (!("description" in xe) || // Safari 12 bug
kr().description !== void 0)) {
  var R$ = {}, $o = function() {
    var r = arguments.length < 1 || arguments[0] === void 0 ? void 0 : U3(arguments[0]), e = j3(xe, this) ? new kr(r) : r === void 0 ? kr() : kr(r);
    return r === "" && (R$[e] = !0), e;
  };
  V3($o, kr), $o.prototype = xe, xe.constructor = $o;
  var H3 = String(kr("description detection")) === "Symbol(description detection)", G3 = po(xe.valueOf), W3 = po(xe.toString), q3 = /^Symbol\((.*)\)[^)]+$/, Y3 = po("".replace), K3 = po("".slice);
  z3(xe, "description", {
    configurable: !0,
    get: function() {
      var r = G3(this);
      if (k3(R$, r))
        return "";
      var e = W3(r), n = H3 ? K3(e, 7, -1) : Y3(e, q3, "$1");
      return n === "" ? void 0 : n;
    }
  }), D3({ global: !0, constructor: !0, forced: !0 }, {
    Symbol: $o
  });
}
var X3 = Ft;
X3("asyncIterator");
var J3 = Ft;
J3("hasInstance");
var Z3 = Ft;
Z3("isConcatSpreadable");
var Q3 = Ft;
Q3("iterator");
var tB = Ft;
tB("match");
var rB = Ft;
rB("matchAll");
var eB = Ft;
eB("replace");
var nB = Ft;
nB("search");
var aB = Ft;
aB("species");
var iB = Ft;
iB("split");
var oB = Ft, sB = _x;
oB("toPrimitive");
sB();
var uB = ot, lB = Ft, cB = kt;
lB("toStringTag");
cB(uB("Symbol"), "Symbol");
var fB = Ft;
fB("unscopables");
var hB = A, vB = et, Au = function(t, r, e) {
  try {
    return hB(vB(Object.getOwnPropertyDescriptor(t, r)[e]));
  } catch {
  }
}, dB = K, nE = function(t) {
  return dB(t) || t === null;
}, gB = nE, pB = String, $B = TypeError, aE = function(t) {
  if (gB(t))
    return t;
  throw new $B("Can't set " + pB(t) + " as a prototype");
}, yB = Au, mB = K, bB = ut, wB = aE, Pr = Object.setPrototypeOf || ("__proto__" in {} ? function() {
  var t = !1, r = {}, e;
  try {
    e = yB(Object.prototype, "__proto__", "set"), e(r, []), t = r instanceof Array;
  } catch {
  }
  return function(a, i) {
    return bB(a), wB(i), mB(a) && (t ? e(a, i) : a.__proto__ = i), a;
  };
}() : void 0), SB = lt.f, iE = function(t, r, e) {
  e in t || SB(t, e, {
    configurable: !0,
    get: function() {
      return r[e];
    },
    set: function(n) {
      r[e] = n;
    }
  });
}, xB = tt, EB = K, _$ = Pr, Ye = function(t, r, e) {
  var n, a;
  return (
    // it can work only with native `setPrototypeOf`
    _$ && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    xB(n = r.constructor) && n !== e && EB(a = n.prototype) && a !== e.prototype && _$(t, a), t
  );
}, TB = W, Fi = function(t, r) {
  return t === void 0 ? arguments.length < 2 ? "" : r : TB(t);
}, IB = K, OB = Tt, oE = function(t, r) {
  IB(r) && "cause" in r && OB(t, "cause", r.cause);
}, AB = A, sE = Error, RB = AB("".replace), _B = function(t) {
  return String(new sE(t).stack);
}("zxcasd"), uE = /\n\s*at [^:]*:[^\n]*/, CB = uE.test(_B), ed = function(t, r) {
  if (CB && typeof t == "string" && !sE.prepareStackTrace)
    for (; r--; )
      t = RB(t, uE, "");
  return t;
}, PB = O, MB = tr, lE = !PB(function() {
  var t = new Error("a");
  return "stack" in t ? (Object.defineProperty(t, "stack", MB(1, 7)), t.stack !== 7) : !0;
}), NB = Tt, DB = ed, LB = lE, C$ = Error.captureStackTrace, cE = function(t, r, e, n) {
  LB && (C$ ? C$(t, r) : NB(t, "stack", DB(e, n)));
}, P$ = ot, FB = rt, M$ = Tt, kB = Lt, N$ = Pr, D$ = Ri, L$ = iE, BB = Ye, jB = Fi, UB = oE, zB = cE, VB = z, fE = function(t, r, e, n) {
  var a = "stackTraceLimit", i = n ? 2 : 1, o = t.split("."), s = o[o.length - 1], u = P$.apply(null, o);
  if (u) {
    var l = u.prototype;
    if (FB(l, "cause") && delete l.cause, !e)
      return u;
    var c = P$("Error"), f = r(function(h, v) {
      var d = jB(n ? v : h, void 0), $ = n ? new u(h) : new u();
      return d !== void 0 && M$($, "message", d), zB($, f, $.stack, 2), this && kB(l, this) && BB($, this, f), arguments.length > i && UB($, arguments[i]), $;
    });
    f.prototype = l, s !== "Error" ? N$ ? N$(f, c) : D$(f, c, { name: !0 }) : VB && a in u && (L$(f, u, a), L$(f, u, "prepareStackTrace")), D$(f, u);
    try {
      l.name !== s && M$(l, "name", s), l.constructor = f;
    } catch {
    }
    return f;
  }
}, hE = g, HB = D, Mr = er, vE = fE, Sh = "WebAssembly", F$ = HB[Sh], ks = new Error("e", { cause: 7 }).cause !== 7, Ke = function(t, r) {
  var e = {};
  e[t] = vE(t, r, ks), hE({ global: !0, constructor: !0, arity: 1, forced: ks }, e);
}, nd = function(t, r) {
  if (F$ && F$[t]) {
    var e = {};
    e[t] = vE(Sh + "." + t, r, ks), hE({ target: Sh, stat: !0, constructor: !0, arity: 1, forced: ks }, e);
  }
};
Ke("Error", function(t) {
  return function(e) {
    return Mr(t, this, arguments);
  };
});
Ke("EvalError", function(t) {
  return function(e) {
    return Mr(t, this, arguments);
  };
});
Ke("RangeError", function(t) {
  return function(e) {
    return Mr(t, this, arguments);
  };
});
Ke("ReferenceError", function(t) {
  return function(e) {
    return Mr(t, this, arguments);
  };
});
Ke("SyntaxError", function(t) {
  return function(e) {
    return Mr(t, this, arguments);
  };
});
Ke("TypeError", function(t) {
  return function(e) {
    return Mr(t, this, arguments);
  };
});
Ke("URIError", function(t) {
  return function(e) {
    return Mr(t, this, arguments);
  };
});
nd("CompileError", function(t) {
  return function(e) {
    return Mr(t, this, arguments);
  };
});
nd("LinkError", function(t) {
  return function(e) {
    return Mr(t, this, arguments);
  };
});
nd("RuntimeError", function(t) {
  return function(e) {
    return Mr(t, this, arguments);
  };
});
var GB = z, WB = O, qB = U, k$ = Fi, cs = Error.prototype.toString, YB = WB(function() {
  if (GB) {
    var t = Object.create(Object.defineProperty({}, "name", { get: function() {
      return this === t;
    } }));
    if (cs.call(t) !== "true")
      return !0;
  }
  return cs.call({ message: 1, name: 2 }) !== "2: 1" || cs.call({}) !== "Error";
}), dE = YB ? function() {
  var r = qB(this), e = k$(r.name, "Error"), n = k$(r.message);
  return e ? n ? e + ": " + n : e : n;
} : cs, KB = ct, B$ = dE, j$ = Error.prototype;
j$.toString !== B$ && KB(j$, "toString", B$);
var XB = O, ad = !XB(function() {
  function t() {
  }
  return t.prototype.constructor = null, Object.getPrototypeOf(new t()) !== t.prototype;
}), JB = rt, ZB = tt, QB = at, t6 = bu, r6 = ad, U$ = t6("IE_PROTO"), xh = Object, e6 = xh.prototype, Ht = r6 ? xh.getPrototypeOf : function(t) {
  var r = QB(t);
  if (JB(r, U$))
    return r[U$];
  var e = r.constructor;
  return ZB(e) && r instanceof e ? e.prototype : r instanceof xh ? e6 : null;
}, ki = {}, n6 = X, a6 = ki, i6 = n6("iterator"), o6 = Array.prototype, id = function(t) {
  return t !== void 0 && (a6.Array === t || o6[i6] === t);
}, s6 = gr, z$ = Cr, u6 = Dt, l6 = ki, c6 = X, f6 = c6("iterator"), oa = function(t) {
  if (!u6(t))
    return z$(t, f6) || z$(t, "@@iterator") || l6[s6(t)];
}, h6 = V, v6 = et, d6 = U, g6 = We, p6 = oa, $6 = TypeError, Ru = function(t, r) {
  var e = arguments.length < 2 ? p6(t) : r;
  if (v6(e))
    return d6(h6(e, t));
  throw new $6(g6(t) + " is not iterable");
}, y6 = V, V$ = U, m6 = Cr, Xe = function(t, r, e) {
  var n, a;
  V$(t);
  try {
    if (n = m6(t, "return"), !n) {
      if (r === "throw")
        throw e;
      return e;
    }
    n = y6(n, t);
  } catch (i) {
    a = !0, n = i;
  }
  if (r === "throw")
    throw e;
  if (a)
    throw n;
  return V$(n), e;
}, b6 = pr, w6 = V, S6 = U, x6 = We, E6 = id, T6 = st, H$ = Lt, I6 = Ru, O6 = oa, G$ = Xe, A6 = TypeError, fs = function(t, r) {
  this.stopped = t, this.result = r;
}, W$ = fs.prototype, $t = function(t, r, e) {
  var n = e && e.that, a = !!(e && e.AS_ENTRIES), i = !!(e && e.IS_RECORD), o = !!(e && e.IS_ITERATOR), s = !!(e && e.INTERRUPTED), u = b6(r, n), l, c, f, h, v, d, $, y = function(b) {
    return l && G$(l, "normal", b), new fs(!0, b);
  }, p = function(b) {
    return a ? (S6(b), s ? u(b[0], b[1], y) : u(b[0], b[1])) : s ? u(b, y) : u(b);
  };
  if (i)
    l = t.iterator;
  else if (o)
    l = t;
  else {
    if (c = O6(t), !c)
      throw new A6(x6(t) + " is not iterable");
    if (E6(c)) {
      for (f = 0, h = T6(t); h > f; f++)
        if (v = p(t[f]), v && H$(W$, v))
          return v;
      return new fs(!1);
    }
    l = I6(t, c);
  }
  for (d = i ? t.next : l.next; !($ = w6(d, l)).done; ) {
    try {
      v = p($.value);
    } catch (b) {
      G$(l, "throw", b);
    }
    if (typeof v == "object" && v && H$(W$, v))
      return v;
  }
  return new fs(!1);
}, R6 = g, _6 = Lt, C6 = Ht, Bs = Pr, P6 = Ri, gE = Vt, rc = Tt, ec = tr, M6 = oE, N6 = cE, D6 = $t, L6 = Fi, F6 = X, k6 = F6("toStringTag"), js = Error, B6 = [].push, Wn = function(r, e) {
  var n = _6(nc, this), a;
  Bs ? a = Bs(new js(), n ? C6(this) : nc) : (a = n ? this : gE(nc), rc(a, k6, "Error")), e !== void 0 && rc(a, "message", L6(e)), N6(a, Wn, a.stack, 1), arguments.length > 2 && M6(a, arguments[2]);
  var i = [];
  return D6(r, B6, { that: i }), rc(a, "errors", i), a;
};
Bs ? Bs(Wn, js) : P6(Wn, js, { name: !0 });
var nc = Wn.prototype = gE(js.prototype, {
  constructor: ec(1, Wn),
  message: ec(1, ""),
  name: ec(1, "AggregateError")
});
R6({ global: !0, constructor: !0, arity: 2 }, {
  AggregateError: Wn
});
var j6 = g, U6 = ot, z6 = er, q$ = O, V6 = fE, od = "AggregateError", Y$ = U6(od), K$ = !q$(function() {
  return Y$([1]).errors[0] !== 1;
}) && q$(function() {
  return Y$([1], od, { cause: 7 }).cause !== 7;
});
j6({ global: !0, constructor: !0, arity: 2, forced: K$ }, {
  AggregateError: V6(od, function(t) {
    return function(e, n) {
      return z6(t, this, arguments);
    };
  }, K$, !0)
});
var H6 = X, G6 = Vt, W6 = lt.f, Eh = H6("unscopables"), Th = Array.prototype;
Th[Eh] === void 0 && W6(Th, Eh, {
  configurable: !0,
  value: G6(null)
});
var Bt = function(t) {
  Th[Eh][t] = !0;
}, q6 = g, Y6 = at, K6 = st, X6 = ft, J6 = Bt;
q6({ target: "Array", proto: !0 }, {
  at: function(r) {
    var e = Y6(this), n = K6(e), a = X6(r), i = a >= 0 ? a : n + a;
    return i < 0 || i >= n ? void 0 : e[i];
  }
});
J6("at");
var Z6 = TypeError, Q6 = 9007199254740991, sa = function(t) {
  if (t > Q6)
    throw Z6("Maximum allowed index exceeded");
  return t;
}, t5 = z, r5 = lt, e5 = tr, Zr = function(t, r, e) {
  t5 ? r5.f(t, r, e5(0, e)) : t[r] = e;
}, n5 = O, a5 = X, i5 = Kr, o5 = a5("species"), Bi = function(t) {
  return i5 >= 51 || !n5(function() {
    var r = [], e = r.constructor = {};
    return e[o5] = function() {
      return { foo: 1 };
    }, r[t](Boolean).foo !== 1;
  });
}, s5 = g, u5 = O, l5 = me, c5 = K, f5 = at, h5 = st, X$ = sa, J$ = Zr, v5 = Mi, d5 = Bi, g5 = X, p5 = Kr, pE = g5("isConcatSpreadable"), $5 = p5 >= 51 || !u5(function() {
  var t = [];
  return t[pE] = !1, t.concat()[0] !== t;
}), y5 = function(t) {
  if (!c5(t))
    return !1;
  var r = t[pE];
  return r !== void 0 ? !!r : l5(t);
}, m5 = !$5 || !d5("concat");
s5({ target: "Array", proto: !0, arity: 1, forced: m5 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function(r) {
    var e = f5(this), n = v5(e, 0), a = 0, i, o, s, u, l;
    for (i = -1, s = arguments.length; i < s; i++)
      if (l = i === -1 ? e : arguments[i], y5(l))
        for (u = h5(l), X$(a + u), o = 0; o < u; o++, a++)
          o in l && J$(n, a, l[o]);
      else
        X$(a + 1), J$(n, a++, l);
    return n.length = a, n;
  }
});
var Z$ = We, b5 = TypeError, _u = function(t, r) {
  if (!delete t[r])
    throw new b5("Cannot delete property " + Z$(r) + " of " + Z$(t));
}, w5 = at, ac = Jr, S5 = st, x5 = _u, E5 = Math.min, $E = [].copyWithin || function(r, e) {
  var n = w5(this), a = S5(n), i = ac(r, a), o = ac(e, a), s = arguments.length > 2 ? arguments[2] : void 0, u = E5((s === void 0 ? a : ac(s, a)) - o, a - i), l = 1;
  for (o < i && i < o + u && (l = -1, o += u - 1, i += u - 1); u-- > 0; )
    o in n ? n[i] = n[o] : x5(n, i), i += l, o += l;
  return n;
}, T5 = g, I5 = $E, O5 = Bt;
T5({ target: "Array", proto: !0 }, {
  copyWithin: I5
});
O5("copyWithin");
var A5 = O, Qr = function(t, r) {
  var e = [][t];
  return !!e && A5(function() {
    e.call(null, r || function() {
      return 1;
    }, 1);
  });
}, R5 = g, _5 = bt.every, C5 = Qr, P5 = C5("every");
R5({ target: "Array", proto: !0, forced: !P5 }, {
  every: function(r) {
    return _5(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var M5 = at, Q$ = Jr, N5 = st, sd = function(r) {
  for (var e = M5(this), n = N5(e), a = arguments.length, i = Q$(a > 1 ? arguments[1] : void 0, n), o = a > 2 ? arguments[2] : void 0, s = o === void 0 ? n : Q$(o, n); s > i; )
    e[i++] = r;
  return e;
}, D5 = g, L5 = sd, F5 = Bt;
D5({ target: "Array", proto: !0 }, {
  fill: L5
});
F5("fill");
var k5 = g, B5 = bt.filter, j5 = Bi, U5 = j5("filter");
k5({ target: "Array", proto: !0, forced: !U5 }, {
  filter: function(r) {
    return B5(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var z5 = g, V5 = bt.find, H5 = Bt, Ih = "find", yE = !0;
Ih in [] && Array(1)[Ih](function() {
  yE = !1;
});
z5({ target: "Array", proto: !0, forced: yE }, {
  find: function(r) {
    return V5(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
H5(Ih);
var G5 = g, W5 = bt.findIndex, q5 = Bt, Oh = "findIndex", mE = !0;
Oh in [] && Array(1)[Oh](function() {
  mE = !1;
});
G5({ target: "Array", proto: !0, forced: mE }, {
  findIndex: function(r) {
    return W5(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
q5(Oh);
var Y5 = pr, K5 = ta, X5 = at, J5 = st, ty = function(t) {
  var r = t === 1;
  return function(e, n, a) {
    for (var i = X5(e), o = K5(i), s = J5(o), u = Y5(n, a), l, c; s-- > 0; )
      if (l = o[s], c = u(l, s, i), c)
        switch (t) {
          case 0:
            return l;
          case 1:
            return s;
        }
    return r ? -1 : void 0;
  };
}, Cu = {
  // `Array.prototype.findLast` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLast: ty(0),
  // `Array.prototype.findLastIndex` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLastIndex: ty(1)
}, Z5 = g, Q5 = Cu.findLast, t4 = Bt;
Z5({ target: "Array", proto: !0 }, {
  findLast: function(r) {
    return Q5(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
t4("findLast");
var r4 = g, e4 = Cu.findLastIndex, n4 = Bt;
r4({ target: "Array", proto: !0 }, {
  findLastIndex: function(r) {
    return e4(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
n4("findLastIndex");
var a4 = me, i4 = st, o4 = sa, s4 = pr, bE = function(t, r, e, n, a, i, o, s) {
  for (var u = a, l = 0, c = o ? s4(o, s) : !1, f, h; l < n; )
    l in e && (f = c ? c(e[l], l, r) : e[l], i > 0 && a4(f) ? (h = i4(f), u = bE(t, r, f, h, u, i - 1) - 1) : (o4(u + 1), t[u] = f), u++), l++;
  return u;
}, wE = bE, u4 = g, l4 = wE, c4 = at, f4 = st, h4 = ft, v4 = Mi;
u4({ target: "Array", proto: !0 }, {
  flat: function() {
    var r = arguments.length ? arguments[0] : void 0, e = c4(this), n = f4(e), a = v4(e, 0);
    return a.length = l4(a, e, e, n, 0, r === void 0 ? 1 : h4(r)), a;
  }
});
var d4 = g, g4 = wE, p4 = et, $4 = at, y4 = st, m4 = Mi;
d4({ target: "Array", proto: !0 }, {
  flatMap: function(r) {
    var e = $4(this), n = y4(e), a;
    return p4(r), a = m4(e, 0), a.length = g4(a, e, e, n, 0, 1, r, arguments.length > 1 ? arguments[1] : void 0), a;
  }
});
var b4 = bt.forEach, w4 = Qr, S4 = w4("forEach"), SE = S4 ? [].forEach : function(r) {
  return b4(this, r, arguments.length > 1 ? arguments[1] : void 0);
}, x4 = g, ry = SE;
x4({ target: "Array", proto: !0, forced: [].forEach !== ry }, {
  forEach: ry
});
var E4 = U, T4 = Xe, ud = function(t, r, e, n) {
  try {
    return n ? r(E4(e)[0], e[1]) : r(e);
  } catch (a) {
    T4(t, "throw", a);
  }
}, I4 = pr, O4 = V, A4 = at, R4 = ud, _4 = id, C4 = ia, P4 = st, ey = Zr, M4 = Ru, N4 = oa, ny = Array, xE = function(r) {
  var e = A4(r), n = C4(this), a = arguments.length, i = a > 1 ? arguments[1] : void 0, o = i !== void 0;
  o && (i = I4(i, a > 2 ? arguments[2] : void 0));
  var s = N4(e), u = 0, l, c, f, h, v, d;
  if (s && !(this === ny && _4(s)))
    for (c = n ? new this() : [], h = M4(e, s), v = h.next; !(f = O4(v, h)).done; u++)
      d = o ? R4(h, i, [f.value, u], !0) : f.value, ey(c, u, d);
  else
    for (l = P4(e), c = n ? new this(l) : ny(l); l > u; u++)
      d = o ? i(e[u], u) : e[u], ey(c, u, d);
  return c.length = u, c;
}, D4 = X, EE = D4("iterator"), TE = !1;
try {
  var L4 = 0, ay = {
    next: function() {
      return { done: !!L4++ };
    },
    return: function() {
      TE = !0;
    }
  };
  ay[EE] = function() {
    return this;
  }, Array.from(ay, function() {
    throw 2;
  });
} catch {
}
var Pu = function(t, r) {
  try {
    if (!r && !TE)
      return !1;
  } catch {
    return !1;
  }
  var e = !1;
  try {
    var n = {};
    n[EE] = function() {
      return {
        next: function() {
          return { done: e = !0 };
        }
      };
    }, t(n);
  } catch {
  }
  return e;
}, F4 = g, k4 = xE, B4 = Pu, j4 = !B4(function(t) {
  Array.from(t);
});
F4({ target: "Array", stat: !0, forced: j4 }, {
  from: k4
});
var U4 = g, z4 = Oi.includes, V4 = O, H4 = Bt, G4 = V4(function() {
  return !Array(1).includes();
});
U4({ target: "Array", proto: !0, forced: G4 }, {
  includes: function(r) {
    return z4(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
H4("includes");
var W4 = g, q4 = qe, Y4 = Oi.indexOf, K4 = Qr, Ah = q4([].indexOf), IE = !!Ah && 1 / Ah([1], 1, -0) < 0, X4 = IE || !K4("indexOf");
W4({ target: "Array", proto: !0, forced: X4 }, {
  indexOf: function(r) {
    var e = arguments.length > 1 ? arguments[1] : void 0;
    return IE ? Ah(this, r, e) || 0 : Y4(this, r, e);
  }
});
var J4 = g, Z4 = me;
J4({ target: "Array", stat: !0 }, {
  isArray: Z4
});
var Q4 = O, tj = tt, rj = K, iy = Ht, ej = ct, nj = X, Rh = nj("iterator"), OE = !1, Ue, ic, oc;
[].keys && (oc = [].keys(), "next" in oc ? (ic = iy(iy(oc)), ic !== Object.prototype && (Ue = ic)) : OE = !0);
var aj = !rj(Ue) || Q4(function() {
  var t = {};
  return Ue[Rh].call(t) !== t;
});
aj && (Ue = {});
tj(Ue[Rh]) || ej(Ue, Rh, function() {
  return this;
});
var ji = {
  IteratorPrototype: Ue,
  BUGGY_SAFARI_ITERATORS: OE
}, ij = ji.IteratorPrototype, oj = Vt, sj = tr, uj = kt, lj = ki, cj = function() {
  return this;
}, ld = function(t, r, e, n) {
  var a = r + " Iterator";
  return t.prototype = oj(ij, { next: sj(+!n, e) }), uj(t, a, !1), lj[a] = cj, t;
}, fj = g, hj = V, AE = aa, vj = tt, dj = ld, oy = Ht, sy = Pr, gj = kt, pj = Tt, sc = ct, $j = X, yj = ki, RE = ji, mj = AE.PROPER, bj = AE.CONFIGURABLE, uy = RE.IteratorPrototype, yo = RE.BUGGY_SAFARI_ITERATORS, Ia = $j("iterator"), ly = "keys", Oa = "values", cy = "entries", wj = function() {
  return this;
}, cd = function(t, r, e, n, a, i, o) {
  dj(e, r, n);
  var s = function(p) {
    if (p === a && h)
      return h;
    if (!yo && p && p in c)
      return c[p];
    switch (p) {
      case ly:
        return function() {
          return new e(this, p);
        };
      case Oa:
        return function() {
          return new e(this, p);
        };
      case cy:
        return function() {
          return new e(this, p);
        };
    }
    return function() {
      return new e(this);
    };
  }, u = r + " Iterator", l = !1, c = t.prototype, f = c[Ia] || c["@@iterator"] || a && c[a], h = !yo && f || s(a), v = r === "Array" && c.entries || f, d, $, y;
  if (v && (d = oy(v.call(new t())), d !== Object.prototype && d.next && (oy(d) !== uy && (sy ? sy(d, uy) : vj(d[Ia]) || sc(d, Ia, wj)), gj(d, u, !0))), mj && a === Oa && f && f.name !== Oa && (bj ? pj(c, "name", Oa) : (l = !0, h = function() {
    return hj(f, this);
  })), a)
    if ($ = {
      values: s(Oa),
      keys: i ? h : s(ly),
      entries: s(cy)
    }, o)
      for (y in $)
        (yo || l || !(y in c)) && sc(c, y, $[y]);
    else
      fj({ target: r, proto: !0, forced: yo || l }, $);
  return c[Ia] !== h && sc(c, Ia, h, { name: a }), yj[r] = h, $;
}, ua = function(t, r) {
  return { value: t, done: r };
}, Sj = pt, fd = Bt, fy = ki, _E = ht, xj = lt.f, Ej = cd, mo = ua, Tj = z, CE = "Array Iterator", Ij = _E.set, Oj = _E.getterFor(CE), PE = Ej(Array, "Array", function(t, r) {
  Ij(this, {
    type: CE,
    target: Sj(t),
    // target
    index: 0,
    // next index
    kind: r
    // kind
  });
}, function() {
  var t = Oj(this), r = t.target, e = t.index++;
  if (!r || e >= r.length)
    return t.target = null, mo(void 0, !0);
  switch (t.kind) {
    case "keys":
      return mo(e, !1);
    case "values":
      return mo(r[e], !1);
  }
  return mo([e, r[e]], !1);
}, "values"), hy = fy.Arguments = fy.Array;
fd("keys");
fd("values");
fd("entries");
if (Tj && hy.name !== "values")
  try {
    xj(hy, "name", { value: "values" });
  } catch {
  }
var Aj = g, Rj = A, _j = ta, Cj = pt, Pj = Qr, Mj = Rj([].join), Nj = _j !== Object, Dj = Nj || !Pj("join", ",");
Aj({ target: "Array", proto: !0, forced: Dj }, {
  join: function(r) {
    return Mj(Cj(this), r === void 0 ? "," : r);
  }
});
var Lj = er, Fj = pt, kj = ft, Bj = st, jj = Qr, Uj = Math.min, _h = [].lastIndexOf, ME = !!_h && 1 / [1].lastIndexOf(1, -0) < 0, zj = jj("lastIndexOf"), Vj = ME || !zj, NE = Vj ? function(r) {
  if (ME)
    return Lj(_h, this, arguments) || 0;
  var e = Fj(this), n = Bj(e);
  if (n === 0)
    return -1;
  var a = n - 1;
  for (arguments.length > 1 && (a = Uj(a, kj(arguments[1]))), a < 0 && (a = n + a); a >= 0; a--)
    if (a in e && e[a] === r)
      return a || 0;
  return -1;
} : _h, Hj = g, vy = NE;
Hj({ target: "Array", proto: !0, forced: vy !== [].lastIndexOf }, {
  lastIndexOf: vy
});
var Gj = g, Wj = bt.map, qj = Bi, Yj = qj("map");
Gj({ target: "Array", proto: !0, forced: !Yj }, {
  map: function(r) {
    return Wj(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var Kj = g, Xj = O, Jj = ia, Zj = Zr, DE = Array, Qj = Xj(function() {
  function t() {
  }
  return !(DE.of.call(t) instanceof t);
});
Kj({ target: "Array", stat: !0, forced: Qj }, {
  of: function() {
    for (var r = 0, e = arguments.length, n = new (Jj(this) ? this : DE)(e); e > r; )
      Zj(n, r, arguments[r++]);
    return n.length = e, n;
  }
});
var t8 = z, r8 = me, e8 = TypeError, n8 = Object.getOwnPropertyDescriptor, a8 = t8 && !function() {
  if (this !== void 0)
    return !0;
  try {
    Object.defineProperty([], "length", { writable: !1 }).length = 1;
  } catch (t) {
    return t instanceof TypeError;
  }
}(), hd = a8 ? function(t, r) {
  if (r8(t) && !n8(t, "length").writable)
    throw new e8("Cannot set read only .length");
  return t.length = r;
} : function(t, r) {
  return t.length = r;
}, i8 = g, o8 = at, s8 = st, u8 = hd, l8 = sa, c8 = O, f8 = c8(function() {
  return [].push.call({ length: 4294967296 }, 1) !== 4294967297;
}), h8 = function() {
  try {
    Object.defineProperty([], "length", { writable: !1 }).push();
  } catch (t) {
    return t instanceof TypeError;
  }
}, v8 = f8 || !h8();
i8({ target: "Array", proto: !0, arity: 1, forced: v8 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function(r) {
    var e = o8(this), n = s8(e), a = arguments.length;
    l8(n + a);
    for (var i = 0; i < a; i++)
      e[n] = arguments[i], n++;
    return u8(e, n), n;
  }
});
var d8 = et, g8 = at, p8 = ta, $8 = st, dy = TypeError, gy = "Reduce of empty array with no initial value", py = function(t) {
  return function(r, e, n, a) {
    var i = g8(r), o = p8(i), s = $8(i);
    if (d8(e), s === 0 && n < 2)
      throw new dy(gy);
    var u = t ? s - 1 : 0, l = t ? -1 : 1;
    if (n < 2)
      for (; ; ) {
        if (u in o) {
          a = o[u], u += l;
          break;
        }
        if (u += l, t ? u < 0 : s <= u)
          throw new dy(gy);
      }
    for (; t ? u >= 0 : s > u; u += l)
      u in o && (a = e(a, o[u], u, i));
    return a;
  };
}, Mu = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: py(!1),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: py(!0)
}, Aa = D, y8 = _r, m8 = Et, bo = function(t) {
  return y8.slice(0, t.length) === t;
}, Nu = function() {
  return bo("Bun/") ? "BUN" : bo("Cloudflare-Workers") ? "CLOUDFLARE" : bo("Deno/") ? "DENO" : bo("Node.js/") ? "NODE" : Aa.Bun && typeof Bun.version == "string" ? "BUN" : Aa.Deno && typeof Deno.version == "object" ? "DENO" : m8(Aa.process) === "process" ? "NODE" : Aa.window && Aa.document ? "BROWSER" : "REST";
}(), b8 = Nu, la = b8 === "NODE", w8 = g, S8 = Mu.left, x8 = Qr, $y = Kr, E8 = la, T8 = !E8 && $y > 79 && $y < 83, I8 = T8 || !x8("reduce");
w8({ target: "Array", proto: !0, forced: I8 }, {
  reduce: function(r) {
    var e = arguments.length;
    return S8(this, r, e, e > 1 ? arguments[1] : void 0);
  }
});
var O8 = g, A8 = Mu.right, R8 = Qr, yy = Kr, _8 = la, C8 = !_8 && yy > 79 && yy < 83, P8 = C8 || !R8("reduceRight");
O8({ target: "Array", proto: !0, forced: P8 }, {
  reduceRight: function(r) {
    return A8(this, r, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var M8 = g, N8 = A, D8 = me, L8 = N8([].reverse), my = [1, 2];
M8({ target: "Array", proto: !0, forced: String(my) === String(my.reverse()) }, {
  reverse: function() {
    return D8(this) && (this.length = this.length), L8(this);
  }
});
var F8 = g, by = me, k8 = ia, B8 = K, wy = Jr, j8 = st, U8 = pt, z8 = Zr, V8 = X, H8 = Bi, G8 = rr, W8 = H8("slice"), q8 = V8("species"), uc = Array, Y8 = Math.max;
F8({ target: "Array", proto: !0, forced: !W8 }, {
  slice: function(r, e) {
    var n = U8(this), a = j8(n), i = wy(r, a), o = wy(e === void 0 ? a : e, a), s, u, l;
    if (by(n) && (s = n.constructor, k8(s) && (s === uc || by(s.prototype)) ? s = void 0 : B8(s) && (s = s[q8], s === null && (s = void 0)), s === uc || s === void 0))
      return G8(n, i, o);
    for (u = new (s === void 0 ? uc : s)(Y8(o - i, 0)), l = 0; i < o; i++, l++)
      i in n && z8(u, l, n[i]);
    return u.length = l, u;
  }
});
var K8 = g, X8 = bt.some, J8 = Qr, Z8 = J8("some");
K8({ target: "Array", proto: !0, forced: !Z8 }, {
  some: function(r) {
    return X8(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var Sy = rr, Q8 = Math.floor, Ch = function(t, r) {
  var e = t.length;
  if (e < 8)
    for (var n = 1, a, i; n < e; ) {
      for (i = n, a = t[n]; i && r(t[i - 1], a) > 0; )
        t[i] = t[--i];
      i !== n++ && (t[i] = a);
    }
  else
    for (var o = Q8(e / 2), s = Ch(Sy(t, 0, o), r), u = Ch(Sy(t, o), r), l = s.length, c = u.length, f = 0, h = 0; f < l || h < c; )
      t[f + h] = f < l && h < c ? r(s[f], u[h]) <= 0 ? s[f++] : u[h++] : f < l ? s[f++] : u[h++];
  return t;
}, vd = Ch, tU = _r, xy = tU.match(/firefox\/(\d+)/i), LE = !!xy && +xy[1], rU = _r, FE = /MSIE|Trident/.test(rU), eU = _r, Ey = eU.match(/AppleWebKit\/(\d+)\./), dd = !!Ey && +Ey[1], nU = g, kE = A, aU = et, iU = at, Ty = st, oU = _u, Iy = W, gd = O, sU = vd, uU = Qr, Oy = LE, lU = FE, Ay = Kr, Ry = dd, ue = [], _y = kE(ue.sort), cU = kE(ue.push), fU = gd(function() {
  ue.sort(void 0);
}), hU = gd(function() {
  ue.sort(null);
}), vU = uU("sort"), BE = !gd(function() {
  if (Ay)
    return Ay < 70;
  if (!(Oy && Oy > 3)) {
    if (lU)
      return !0;
    if (Ry)
      return Ry < 603;
    var t = "", r, e, n, a;
    for (r = 65; r < 76; r++) {
      switch (e = String.fromCharCode(r), r) {
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
      e = ue[a].k.charAt(0), t.charAt(t.length - 1) !== e && (t += e);
    return t !== "DGBEFHACIJK";
  }
}), dU = fU || !hU || !vU || !BE, gU = function(t) {
  return function(r, e) {
    return e === void 0 ? -1 : r === void 0 ? 1 : t !== void 0 ? +t(r, e) || 0 : Iy(r) > Iy(e) ? 1 : -1;
  };
};
nU({ target: "Array", proto: !0, forced: dU }, {
  sort: function(r) {
    r !== void 0 && aU(r);
    var e = iU(this);
    if (BE)
      return r === void 0 ? _y(e) : _y(e, r);
    var n = [], a = Ty(e), i, o;
    for (o = 0; o < a; o++)
      o in e && cU(n, e[o]);
    for (sU(n, gU(r)), i = Ty(n), o = 0; o < i; )
      e[o] = n[o++];
    for (; o < a; )
      oU(e, o++);
    return e;
  }
});
var pU = ot, $U = vt, yU = X, mU = z, Cy = yU("species"), ca = function(t) {
  var r = pU(t);
  mU && r && !r[Cy] && $U(r, Cy, {
    configurable: !0,
    get: function() {
      return this;
    }
  });
}, bU = ca;
bU("Array");
var wU = g, SU = at, xU = Jr, EU = ft, TU = st, IU = hd, OU = sa, AU = Mi, RU = Zr, lc = _u, _U = Bi, CU = _U("splice"), PU = Math.max, MU = Math.min;
wU({ target: "Array", proto: !0, forced: !CU }, {
  splice: function(r, e) {
    var n = SU(this), a = TU(n), i = xU(r, a), o = arguments.length, s, u, l, c, f, h;
    for (o === 0 ? s = u = 0 : o === 1 ? (s = 0, u = a - i) : (s = o - 2, u = MU(PU(EU(e), 0), a - i)), OU(a + s - u), l = AU(n, u), c = 0; c < u; c++)
      f = i + c, f in n && RU(l, c, n[f]);
    if (l.length = u, s < u) {
      for (c = i; c < a - u; c++)
        f = c + u, h = c + s, f in n ? n[h] = n[f] : lc(n, h);
      for (c = a; c > a - u + s; c--)
        lc(n, c - 1);
    } else if (s > u)
      for (c = a - u; c > i; c--)
        f = c + u - 1, h = c + s - 1, f in n ? n[h] = n[f] : lc(n, h);
    for (c = 0; c < s; c++)
      n[c + i] = arguments[c + 2];
    return IU(n, a - u + s), l;
  }
});
var NU = st, jE = function(t, r) {
  for (var e = NU(t), n = new r(e), a = 0; a < e; a++)
    n[a] = t[e - a - 1];
  return n;
}, DU = g, LU = jE, FU = pt, kU = Bt, BU = Array;
DU({ target: "Array", proto: !0 }, {
  toReversed: function() {
    return LU(FU(this), BU);
  }
});
kU("toReversed");
var jU = st, Du = function(t, r, e) {
  for (var n = 0, a = arguments.length > 2 ? e : jU(r), i = new t(a); a > n; )
    i[n] = r[n++];
  return i;
}, UU = D, zU = function(t, r) {
  var e = UU[t], n = e && e.prototype;
  return n && n[r];
}, VU = g, HU = A, GU = et, WU = pt, qU = Du, YU = zU, KU = Bt, XU = Array, JU = HU(YU("Array", "sort"));
VU({ target: "Array", proto: !0 }, {
  toSorted: function(r) {
    r !== void 0 && GU(r);
    var e = WU(this), n = qU(XU, e);
    return JU(n, r);
  }
});
KU("toSorted");
var ZU = g, QU = Bt, tz = sa, rz = st, ez = Jr, nz = pt, az = ft, iz = Array, oz = Math.max, sz = Math.min;
ZU({ target: "Array", proto: !0 }, {
  toSpliced: function(r, e) {
    var n = nz(this), a = rz(n), i = ez(r, a), o = arguments.length, s = 0, u, l, c, f;
    for (o === 0 ? u = l = 0 : o === 1 ? (u = 0, l = a - i) : (u = o - 2, l = sz(oz(az(e), 0), a - i)), c = tz(a + u - l), f = iz(c); s < i; s++)
      f[s] = n[s];
    for (; s < i + u; s++)
      f[s] = arguments[s - i + 2];
    for (; s < c; s++)
      f[s] = n[s + l - u];
    return f;
  }
});
QU("toSpliced");
var uz = Bt;
uz("flat");
var lz = Bt;
lz("flatMap");
var cz = g, fz = at, hz = st, vz = hd, dz = _u, gz = sa, pz = [].unshift(0) !== 1, $z = function() {
  try {
    Object.defineProperty([], "length", { writable: !1 }).unshift();
  } catch (t) {
    return t instanceof TypeError;
  }
}, yz = pz || !$z();
cz({ target: "Array", proto: !0, arity: 1, forced: yz }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  unshift: function(r) {
    var e = fz(this), n = hz(e), a = arguments.length;
    if (a) {
      gz(n + a);
      for (var i = n; i--; ) {
        var o = i + a;
        i in e ? e[o] = e[i] : dz(e, o);
      }
      for (var s = 0; s < a; s++)
        e[s] = arguments[s];
    }
    return vz(e, n + a);
  }
});
var mz = st, bz = ft, wz = RangeError, UE = function(t, r, e, n) {
  var a = mz(t), i = bz(e), o = i < 0 ? a + i : i;
  if (o >= a || o < 0)
    throw new wz("Incorrect index");
  for (var s = new r(a), u = 0; u < a; u++)
    s[u] = u === o ? n : t[u];
  return s;
}, Sz = g, xz = UE, Ez = pt, Tz = Array;
Sz({ target: "Array", proto: !0 }, {
  with: function(t, r) {
    return xz(Ez(this), Tz, t, r);
  }
});
var Lu = typeof ArrayBuffer < "u" && typeof DataView < "u", Iz = ct, fa = function(t, r, e) {
  for (var n in r)
    Iz(t, n, r[n], e);
  return t;
}, Oz = Lt, Az = TypeError, $r = function(t, r) {
  if (Oz(r, t))
    return t;
  throw new Az("Incorrect invocation");
}, Rz = ft, _z = zt, Cz = RangeError, Fu = function(t) {
  if (t === void 0)
    return 0;
  var r = Rz(t), e = _z(r);
  if (r !== e)
    throw new Cz("Wrong length or index");
  return e;
}, pd = Math.sign || function(r) {
  var e = +r;
  return e === 0 || e !== e ? e : e < 0 ? -1 : 1;
}, Pz = 2220446049250313e-31, Py = 1 / Pz, zE = function(t) {
  return t + Py - Py;
}, Mz = pd, Nz = zE, Dz = Math.abs, Lz = 2220446049250313e-31, VE = function(t, r, e, n) {
  var a = +t, i = Dz(a), o = Mz(a);
  if (i < n)
    return o * Nz(i / n / r) * n * r;
  var s = (1 + r / Lz) * i, u = s - (s - i);
  return u > e || u !== u ? o * (1 / 0) : o * u;
}, Fz = VE, kz = 11920928955078125e-23, Bz = 34028234663852886e22, jz = 11754943508222875e-54, HE = Math.fround || function(r) {
  return Fz(r, kz, Bz, jz);
}, Uz = Array, zz = Math.abs, Br = Math.pow, Vz = Math.floor, Hz = Math.log, Gz = Math.LN2, Wz = function(t, r, e) {
  var n = Uz(e), a = e * 8 - r - 1, i = (1 << a) - 1, o = i >> 1, s = r === 23 ? Br(2, -24) - Br(2, -77) : 0, u = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0, l = 0, c, f, h;
  for (t = zz(t), t !== t || t === 1 / 0 ? (f = t !== t ? 1 : 0, c = i) : (c = Vz(Hz(t) / Gz), h = Br(2, -c), t * h < 1 && (c--, h *= 2), c + o >= 1 ? t += s / h : t += s * Br(2, 1 - o), t * h >= 2 && (c++, h /= 2), c + o >= i ? (f = 0, c = i) : c + o >= 1 ? (f = (t * h - 1) * Br(2, r), c += o) : (f = t * Br(2, o - 1) * Br(2, r), c = 0)); r >= 8; )
    n[l++] = f & 255, f /= 256, r -= 8;
  for (c = c << r | f, a += r; a > 0; )
    n[l++] = c & 255, c /= 256, a -= 8;
  return n[l - 1] |= u * 128, n;
}, qz = function(t, r) {
  var e = t.length, n = e * 8 - r - 1, a = (1 << n) - 1, i = a >> 1, o = n - 7, s = e - 1, u = t[s--], l = u & 127, c;
  for (u >>= 7; o > 0; )
    l = l * 256 + t[s--], o -= 8;
  for (c = l & (1 << -o) - 1, l >>= -o, o += r; o > 0; )
    c = c * 256 + t[s--], o -= 8;
  if (l === 0)
    l = 1 - i;
  else {
    if (l === a)
      return c ? NaN : u ? -1 / 0 : 1 / 0;
    c += Br(2, r), l -= i;
  }
  return (u ? -1 : 1) * c * Br(2, l - r);
}, Yz = {
  pack: Wz,
  unpack: qz
}, ku = D, $d = A, cc = z, Kz = Lu, GE = aa, Xz = Tt, Jz = vt, My = fa, fc = O, wo = $r, Zz = ft, Qz = zt, Us = Fu, t7 = HE, WE = Yz, r7 = Ht, Ny = Pr, e7 = sd, n7 = rr, a7 = Ye, i7 = Ri, qE = kt, yd = ht, o7 = GE.PROPER, Dy = GE.CONFIGURABLE, Cn = "ArrayBuffer", Bu = "DataView", Pn = "prototype", s7 = "Wrong length", YE = "Wrong index", Ly = yd.getterFor(Cn), Ka = yd.getterFor(Bu), Fy = yd.set, sr = ku[Cn], jt = sr, on = jt && jt[Pn], xr = ku[Bu], Ee = xr && xr[Pn], ky = Object.prototype, u7 = ku.Array, zs = ku.RangeError, l7 = $d(e7), c7 = $d([].reverse), KE = WE.pack, By = WE.unpack, jy = function(t) {
  return [t & 255];
}, Uy = function(t) {
  return [t & 255, t >> 8 & 255];
}, zy = function(t) {
  return [t & 255, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255];
}, Vy = function(t) {
  return t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0];
}, f7 = function(t) {
  return KE(t7(t), 23, 4);
}, h7 = function(t) {
  return KE(t, 52, 8);
}, So = function(t, r, e) {
  Jz(t[Pn], r, {
    configurable: !0,
    get: function() {
      return e(this)[r];
    }
  });
}, ae = function(t, r, e, n) {
  var a = Ka(t), i = Us(e), o = !!n;
  if (i + r > a.byteLength)
    throw new zs(YE);
  var s = a.bytes, u = i + a.byteOffset, l = n7(s, u, u + r);
  return o ? l : c7(l);
}, ie = function(t, r, e, n, a, i) {
  var o = Ka(t), s = Us(e), u = n(+a), l = !!i;
  if (s + r > o.byteLength)
    throw new zs(YE);
  for (var c = o.bytes, f = s + o.byteOffset, h = 0; h < r; h++)
    c[f + h] = u[l ? h : r - h - 1];
};
if (!Kz)
  jt = function(r) {
    wo(this, on);
    var e = Us(r);
    Fy(this, {
      type: Cn,
      bytes: l7(u7(e), 0),
      byteLength: e
    }), cc || (this.byteLength = e, this.detached = !1);
  }, on = jt[Pn], xr = function(r, e, n) {
    wo(this, Ee), wo(r, on);
    var a = Ly(r), i = a.byteLength, o = Zz(e);
    if (o < 0 || o > i)
      throw new zs("Wrong offset");
    if (n = n === void 0 ? i - o : Qz(n), o + n > i)
      throw new zs(s7);
    Fy(this, {
      type: Bu,
      buffer: r,
      byteLength: n,
      byteOffset: o,
      bytes: a.bytes
    }), cc || (this.buffer = r, this.byteLength = n, this.byteOffset = o);
  }, Ee = xr[Pn], cc && (So(jt, "byteLength", Ly), So(xr, "buffer", Ka), So(xr, "byteLength", Ka), So(xr, "byteOffset", Ka)), My(Ee, {
    getInt8: function(r) {
      return ae(this, 1, r)[0] << 24 >> 24;
    },
    getUint8: function(r) {
      return ae(this, 1, r)[0];
    },
    getInt16: function(r) {
      var e = ae(this, 2, r, arguments.length > 1 ? arguments[1] : !1);
      return (e[1] << 8 | e[0]) << 16 >> 16;
    },
    getUint16: function(r) {
      var e = ae(this, 2, r, arguments.length > 1 ? arguments[1] : !1);
      return e[1] << 8 | e[0];
    },
    getInt32: function(r) {
      return Vy(ae(this, 4, r, arguments.length > 1 ? arguments[1] : !1));
    },
    getUint32: function(r) {
      return Vy(ae(this, 4, r, arguments.length > 1 ? arguments[1] : !1)) >>> 0;
    },
    getFloat32: function(r) {
      return By(ae(this, 4, r, arguments.length > 1 ? arguments[1] : !1), 23);
    },
    getFloat64: function(r) {
      return By(ae(this, 8, r, arguments.length > 1 ? arguments[1] : !1), 52);
    },
    setInt8: function(r, e) {
      ie(this, 1, r, jy, e);
    },
    setUint8: function(r, e) {
      ie(this, 1, r, jy, e);
    },
    setInt16: function(r, e) {
      ie(this, 2, r, Uy, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setUint16: function(r, e) {
      ie(this, 2, r, Uy, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setInt32: function(r, e) {
      ie(this, 4, r, zy, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setUint32: function(r, e) {
      ie(this, 4, r, zy, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setFloat32: function(r, e) {
      ie(this, 4, r, f7, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setFloat64: function(r, e) {
      ie(this, 8, r, h7, e, arguments.length > 2 ? arguments[2] : !1);
    }
  });
else {
  var Hy = o7 && sr.name !== Cn;
  !fc(function() {
    sr(1);
  }) || !fc(function() {
    new sr(-1);
  }) || fc(function() {
    return new sr(), new sr(1.5), new sr(NaN), sr.length !== 1 || Hy && !Dy;
  }) ? (jt = function(r) {
    return wo(this, on), a7(new sr(Us(r)), this, jt);
  }, jt[Pn] = on, on.constructor = jt, i7(jt, sr)) : Hy && Dy && Xz(sr, "name", Cn), Ny && r7(Ee) !== ky && Ny(Ee, ky);
  var xo = new xr(new jt(2)), Gy = $d(Ee.setInt8);
  xo.setInt8(0, 2147483648), xo.setInt8(1, 2147483649), (xo.getInt8(0) || !xo.getInt8(1)) && My(Ee, {
    setInt8: function(r, e) {
      Gy(this, r, e << 24 >> 24);
    },
    setUint8: function(r, e) {
      Gy(this, r, e << 24 >> 24);
    }
  }, { unsafe: !0 });
}
qE(jt, Cn);
qE(xr, Bu);
var ju = {
  ArrayBuffer: jt,
  DataView: xr
}, v7 = g, d7 = D, g7 = ju, p7 = ca, md = "ArrayBuffer", Wy = g7[md], $7 = d7[md];
v7({ global: !0, constructor: !0, forced: $7 !== Wy }, {
  ArrayBuffer: Wy
});
p7(md);
var y7 = Lu, bd = z, Rt = D, XE = tt, Uu = K, ge = rt, wd = gr, m7 = We, b7 = Tt, Ph = ct, w7 = vt, S7 = Lt, zu = Ht, ha = Pr, x7 = X, E7 = na, JE = ht, ZE = JE.enforce, T7 = JE.get, Vs = Rt.Int8Array, Mh = Vs && Vs.prototype, qy = Rt.Uint8ClampedArray, Yy = qy && qy.prototype, Er = Vs && zu(Vs), hr = Mh && zu(Mh), I7 = Object.prototype, Sd = Rt.TypeError, Ky = x7("toStringTag"), Nh = E7("TYPED_ARRAY_TAG"), Hs = "TypedArrayConstructor", Gr = y7 && !!ha && wd(Rt.opera) !== "Opera", QE = !1, Nt, le, Mn, Wr = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
}, xd = {
  BigInt64Array: 8,
  BigUint64Array: 8
}, O7 = function(r) {
  if (!Uu(r))
    return !1;
  var e = wd(r);
  return e === "DataView" || ge(Wr, e) || ge(xd, e);
}, tT = function(t) {
  var r = zu(t);
  if (Uu(r)) {
    var e = T7(r);
    return e && ge(e, Hs) ? e[Hs] : tT(r);
  }
}, rT = function(t) {
  if (!Uu(t))
    return !1;
  var r = wd(t);
  return ge(Wr, r) || ge(xd, r);
}, A7 = function(t) {
  if (rT(t))
    return t;
  throw new Sd("Target is not a typed array");
}, R7 = function(t) {
  if (XE(t) && (!ha || S7(Er, t)))
    return t;
  throw new Sd(m7(t) + " is not a typed array constructor");
}, _7 = function(t, r, e, n) {
  if (bd) {
    if (e)
      for (var a in Wr) {
        var i = Rt[a];
        if (i && ge(i.prototype, t))
          try {
            delete i.prototype[t];
          } catch {
            try {
              i.prototype[t] = r;
            } catch {
            }
          }
      }
    (!hr[t] || e) && Ph(hr, t, e ? r : Gr && Mh[t] || r, n);
  }
}, C7 = function(t, r, e) {
  var n, a;
  if (bd) {
    if (ha) {
      if (e) {
        for (n in Wr)
          if (a = Rt[n], a && ge(a, t))
            try {
              delete a[t];
            } catch {
            }
      }
      if (!Er[t] || e)
        try {
          return Ph(Er, t, e ? r : Gr && Er[t] || r);
        } catch {
        }
      else
        return;
    }
    for (n in Wr)
      a = Rt[n], a && (!a[t] || e) && Ph(a, t, r);
  }
};
for (Nt in Wr)
  le = Rt[Nt], Mn = le && le.prototype, Mn ? ZE(Mn)[Hs] = le : Gr = !1;
for (Nt in xd)
  le = Rt[Nt], Mn = le && le.prototype, Mn && (ZE(Mn)[Hs] = le);
if ((!Gr || !XE(Er) || Er === Function.prototype) && (Er = function() {
  throw new Sd("Incorrect invocation");
}, Gr))
  for (Nt in Wr)
    Rt[Nt] && ha(Rt[Nt], Er);
if ((!Gr || !hr || hr === I7) && (hr = Er.prototype, Gr))
  for (Nt in Wr)
    Rt[Nt] && ha(Rt[Nt].prototype, hr);
Gr && zu(Yy) !== hr && ha(Yy, hr);
if (bd && !ge(hr, Ky)) {
  QE = !0, w7(hr, Ky, {
    configurable: !0,
    get: function() {
      return Uu(this) ? this[Nh] : void 0;
    }
  });
  for (Nt in Wr)
    Rt[Nt] && b7(Rt[Nt], Nh, Nt);
}
var J = {
  NATIVE_ARRAY_BUFFER_VIEWS: Gr,
  TYPED_ARRAY_TAG: QE && Nh,
  aTypedArray: A7,
  aTypedArrayConstructor: R7,
  exportTypedArrayMethod: _7,
  exportTypedArrayStaticMethod: C7,
  getTypedArrayConstructor: tT,
  isView: O7,
  isTypedArray: rT,
  TypedArray: Er,
  TypedArrayPrototype: hr
}, P7 = g, eT = J, M7 = eT.NATIVE_ARRAY_BUFFER_VIEWS;
P7({ target: "ArrayBuffer", stat: !0, forced: !M7 }, {
  isView: eT.isView
});
var N7 = g, Ed = qe, D7 = O, nT = ju, Xy = U, Jy = Jr, L7 = zt, Td = nT.ArrayBuffer, Dh = nT.DataView, aT = Dh.prototype, Zy = Ed(Td.prototype.slice), F7 = Ed(aT.getUint8), k7 = Ed(aT.setUint8), B7 = D7(function() {
  return !new Td(2).slice(1, void 0).byteLength;
});
N7({ target: "ArrayBuffer", proto: !0, unsafe: !0, forced: B7 }, {
  slice: function(r, e) {
    if (Zy && e === void 0)
      return Zy(Xy(this), r);
    for (var n = Xy(this).byteLength, a = Jy(r, n), i = Jy(e === void 0 ? n : e, n), o = new Td(L7(i - a)), s = new Dh(this), u = new Dh(o), l = 0; a < i; )
      k7(u, l++, F7(s, a++));
    return o;
  }
});
var j7 = g, U7 = ju, z7 = Lu;
j7({ global: !0, constructor: !0, forced: !z7 }, {
  DataView: U7.DataView
});
var V7 = g, H7 = A, iT = Math.pow, Qy = 31, G7 = 1023, tm = iT(2, -24), rm = 9765625e-10, W7 = function(t) {
  var r = t >>> 15, e = t >>> 10 & Qy, n = t & G7;
  return e === Qy ? n === 0 ? r === 0 ? 1 / 0 : -1 / 0 : NaN : e === 0 ? n * (r === 0 ? tm : -tm) : iT(2, e - 15) * (r === 0 ? 1 + n * rm : -1 - n * rm);
}, q7 = H7(DataView.prototype.getUint16);
V7({ target: "DataView", proto: !0 }, {
  getFloat16: function(r) {
    var e = q7(this, r, arguments.length > 1 ? arguments[1] : !1);
    return W7(e);
  }
});
var Y7 = gr, K7 = TypeError, X7 = function(t) {
  if (Y7(t) === "DataView")
    return t;
  throw new K7("Argument is not a DataView");
}, J7 = Math.log, Z7 = Math.LN2, oT = Math.log2 || function(r) {
  return J7(r) / Z7;
}, Q7 = g, tV = A, rV = X7, eV = Fu, nV = oT, em = zE, aV = Math.pow, iV = 65520, oV = 61005353927612305e-21, sV = 16777216, hc = 1024, uV = function(t) {
  if (t !== t)
    return 32256;
  if (t === 0)
    return (1 / t === -1 / 0) << 15;
  var r = t < 0;
  if (r && (t = -t), t >= iV)
    return r << 15 | 31744;
  if (t < oV)
    return r << 15 | em(t * sV);
  var e = nV(t) | 0;
  if (e === -15)
    return r << 15 | hc;
  var n = em((t * aV(2, -e) - 1) * hc);
  return n === hc ? r << 15 | e + 16 << 10 : r << 15 | e + 15 << 10 | n;
}, lV = tV(DataView.prototype.setUint16);
Q7({ target: "DataView", proto: !0 }, {
  setFloat16: function(r, e) {
    rV(this);
    var n = eV(r), a = uV(+e);
    return lV(this, n, a, arguments.length > 2 ? arguments[2] : !1);
  }
});
var sT = D, cV = Au, fV = Et, nm = sT.ArrayBuffer, hV = sT.TypeError, uT = nm && cV(nm.prototype, "byteLength", "get") || function(t) {
  if (fV(t) !== "ArrayBuffer")
    throw new hV("ArrayBuffer expected");
  return t.byteLength;
}, vV = D, dV = Lu, gV = uT, pV = vV.DataView, lT = function(t) {
  if (!dV || gV(t) !== 0)
    return !1;
  try {
    return new pV(t), !1;
  } catch {
    return !0;
  }
}, $V = z, yV = vt, mV = lT, am = ArrayBuffer.prototype;
$V && !("detached" in am) && yV(am, "detached", {
  configurable: !0,
  get: function() {
    return mV(this);
  }
});
var bV = lT, wV = TypeError, SV = function(t) {
  if (bV(t))
    throw new wV("ArrayBuffer is detached");
  return t;
}, xV = D, EV = la, cT = function(t) {
  if (EV) {
    try {
      return xV.process.getBuiltinModule(t);
    } catch {
    }
    try {
      return Function('return require("' + t + '")')();
    } catch {
    }
  }
}, TV = D, IV = O, vc = Kr, dc = Nu, im = TV.structuredClone, Id = !!im && !IV(function() {
  if (dc === "DENO" && vc > 92 || dc === "NODE" && vc > 94 || dc === "BROWSER" && vc > 97)
    return !1;
  var t = new ArrayBuffer(8), r = im(t, { transfer: [t] });
  return t.byteLength !== 0 || r.byteLength !== 8;
}), Od = D, OV = cT, AV = Id, RV = Od.structuredClone, om = Od.ArrayBuffer, Eo = Od.MessageChannel, Lh = !1, gc, sm, To, pc;
if (AV)
  Lh = function(t) {
    RV(t, { transfer: [t] });
  };
else if (om)
  try {
    Eo || (gc = OV("worker_threads"), gc && (Eo = gc.MessageChannel)), Eo && (sm = new Eo(), To = new om(2), pc = function(t) {
      sm.port1.postMessage(null, [t]);
    }, To.byteLength === 2 && (pc(To), To.byteLength === 0 && (Lh = pc)));
  } catch {
  }
var fT = Lh, Ad = D, Rd = A, hT = Au, _V = Fu, CV = SV, PV = uT, um = fT, $c = Id, MV = Ad.structuredClone, vT = Ad.ArrayBuffer, Fh = Ad.DataView, NV = Math.min, _d = vT.prototype, dT = Fh.prototype, DV = Rd(_d.slice), lm = hT(_d, "resizable", "get"), cm = hT(_d, "maxByteLength", "get"), LV = Rd(dT.getInt8), FV = Rd(dT.setInt8), gT = ($c || um) && function(t, r, e) {
  var n = PV(t), a = r === void 0 ? n : _V(r), i = !lm || !lm(t), o;
  if (CV(t), $c && (t = MV(t, { transfer: [t] }), n === a && (e || i)))
    return t;
  if (n >= a && (!e || i))
    o = DV(t, 0, a);
  else {
    var s = e && !i && cm ? { maxByteLength: cm(t) } : void 0;
    o = new vT(a, s);
    for (var u = new Fh(t), l = new Fh(o), c = NV(a, n), f = 0; f < c; f++)
      FV(l, f, LV(u, f));
  }
  return $c || um(t), o;
}, kV = g, fm = gT;
fm && kV({ target: "ArrayBuffer", proto: !0 }, {
  transfer: function() {
    return fm(this, arguments.length ? arguments[0] : void 0, !0);
  }
});
var BV = g, hm = gT;
hm && BV({ target: "ArrayBuffer", proto: !0 }, {
  transferToFixedLength: function() {
    return hm(this, arguments.length ? arguments[0] : void 0, !1);
  }
});
var jV = g, UV = A, zV = O, VV = zV(function() {
  return (/* @__PURE__ */ new Date(16e11)).getYear() !== 120;
}), HV = UV(Date.prototype.getFullYear);
jV({ target: "Date", proto: !0, forced: VV }, {
  getYear: function() {
    return HV(this) - 1900;
  }
});
var GV = g, WV = A, pT = Date, qV = WV(pT.prototype.getTime);
GV({ target: "Date", stat: !0 }, {
  now: function() {
    return qV(new pT());
  }
});
var YV = g, $T = A, KV = ft, yT = Date.prototype, XV = $T(yT.getTime), JV = $T(yT.setFullYear);
YV({ target: "Date", proto: !0 }, {
  setYear: function(r) {
    XV(this);
    var e = KV(r), n = e >= 0 && e <= 99 ? e + 1900 : e;
    return JV(this, n);
  }
});
var ZV = g;
ZV({ target: "Date", proto: !0 }, {
  toGMTString: Date.prototype.toUTCString
});
var QV = ft, tH = W, rH = ut, eH = RangeError, Vu = function(r) {
  var e = tH(rH(this)), n = "", a = QV(r);
  if (a < 0 || a === 1 / 0)
    throw new eH("Wrong number of repetitions");
  for (; a > 0; (a >>>= 1) && (e += e))
    a & 1 && (n += e);
  return n;
}, mT = A, nH = zt, vm = W, aH = Vu, iH = ut, oH = mT(aH), sH = mT("".slice), uH = Math.ceil, dm = function(t) {
  return function(r, e, n) {
    var a = vm(iH(r)), i = nH(e), o = a.length, s = n === void 0 ? " " : vm(n), u, l;
    return i <= o || s === "" ? a : (u = i - o, l = oH(s, uH(u / s.length)), l.length > u && (l = sH(l, 0, u)), t ? a + l : l + a);
  };
}, Hu = {
  // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart
  start: dm(!1),
  // `String.prototype.padEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.padend
  end: dm(!0)
}, be = A, gm = O, Te = Hu.start, lH = RangeError, cH = isFinite, fH = Math.abs, te = Date.prototype, yc = te.toISOString, hH = be(te.getTime), vH = be(te.getUTCDate), dH = be(te.getUTCFullYear), gH = be(te.getUTCHours), pH = be(te.getUTCMilliseconds), $H = be(te.getUTCMinutes), yH = be(te.getUTCMonth), mH = be(te.getUTCSeconds), bH = gm(function() {
  return yc.call(new Date(-5e13 - 1)) !== "0385-07-25T07:06:39.999Z";
}) || !gm(function() {
  yc.call(/* @__PURE__ */ new Date(NaN));
}) ? function() {
  if (!cH(hH(this)))
    throw new lH("Invalid time value");
  var r = this, e = dH(r), n = pH(r), a = e < 0 ? "-" : e > 9999 ? "+" : "";
  return a + Te(fH(e), a ? 6 : 4, 0) + "-" + Te(yH(r) + 1, 2, 0) + "-" + Te(vH(r), 2, 0) + "T" + Te(gH(r), 2, 0) + ":" + Te($H(r), 2, 0) + ":" + Te(mH(r), 2, 0) + "." + Te(n, 3, 0) + "Z";
} : yc, wH = g, pm = bH;
wH({ target: "Date", proto: !0, forced: Date.prototype.toISOString !== pm }, {
  toISOString: pm
});
var SH = g, xH = O, EH = at, TH = yu, IH = xH(function() {
  return (/* @__PURE__ */ new Date(NaN)).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function() {
    return 1;
  } }) !== 1;
});
SH({ target: "Date", proto: !0, arity: 1, forced: IH }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  toJSON: function(r) {
    var e = EH(this), n = TH(e, "number");
    return typeof n == "number" && !isFinite(n) ? null : e.toISOString();
  }
});
var OH = U, AH = hx, RH = TypeError, _H = function(t) {
  if (OH(this), t === "string" || t === "default")
    t = "string";
  else if (t !== "number")
    throw new RH("Incorrect hint");
  return AH(this, t);
}, CH = rt, PH = ct, MH = _H, NH = X, $m = NH("toPrimitive"), ym = Date.prototype;
CH(ym, $m) || PH(ym, $m, MH);
var bT = A, DH = ct, Cd = Date.prototype, mm = "Invalid Date", wT = "toString", LH = bT(Cd[wT]), FH = bT(Cd.getTime);
String(/* @__PURE__ */ new Date(NaN)) !== mm && DH(Cd, wT, function() {
  var r = FH(this);
  return r === r ? LH(this) : mm;
});
var kH = g, Ui = A, BH = W, jH = Ui("".charAt), UH = Ui("".charCodeAt), zH = Ui(/./.exec), VH = Ui(1 .toString), HH = Ui("".toUpperCase), GH = /[\w*+\-./@]/, bm = function(t, r) {
  for (var e = VH(t, 16); e.length < r; )
    e = "0" + e;
  return e;
};
kH({ global: !0 }, {
  escape: function(r) {
    for (var e = BH(r), n = "", a = e.length, i = 0, o, s; i < a; )
      o = jH(e, i++), zH(GH, o) ? n += o : (s = UH(o, 0), s < 256 ? n += "%" + bm(s, 2) : n += "%u" + HH(bm(s, 4)));
    return n;
  }
});
var ST = A, WH = et, qH = K, YH = rt, wm = rr, KH = Ei, xT = Function, XH = ST([].concat), JH = ST([].join), mc = {}, ZH = function(t, r, e) {
  if (!YH(mc, r)) {
    for (var n = [], a = 0; a < r; a++)
      n[a] = "a[" + a + "]";
    mc[r] = xT("C,a", "return new C(" + JH(n, ",") + ")");
  }
  return mc[r](t, e);
}, ET = KH ? xT.bind : function(r) {
  var e = WH(this), n = e.prototype, a = wm(arguments, 1), i = function() {
    var s = XH(a, wm(arguments));
    return this instanceof i ? ZH(e, s.length, s) : e.apply(r, s);
  };
  return qH(n) && (i.prototype = n), i;
}, QH = g, Sm = ET;
QH({ target: "Function", proto: !0, forced: Function.bind !== Sm }, {
  bind: Sm
});
var t9 = tt, xm = K, r9 = lt, e9 = Lt, n9 = X, a9 = Wv, bc = n9("hasInstance"), Em = Function.prototype;
bc in Em || r9.f(Em, bc, { value: a9(function(t) {
  if (!t9(this) || !xm(t))
    return !1;
  var r = this.prototype;
  return xm(r) ? e9(r, t) : t instanceof this;
}, bc) });
var i9 = z, o9 = aa.EXISTS, TT = A, s9 = vt, IT = Function.prototype, u9 = TT(IT.toString), OT = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/, l9 = TT(OT.exec), c9 = "name";
i9 && !o9 && s9(IT, c9, {
  configurable: !0,
  get: function() {
    try {
      return l9(OT, u9(this))[1];
    } catch {
      return "";
    }
  }
});
var f9 = g, wc = D;
f9({ global: !0, forced: wc.globalThis !== wc }, {
  globalThis: wc
});
var h9 = g, v9 = D, d9 = $r, g9 = U, p9 = tt, $9 = Ht, y9 = vt, m9 = Zr, b9 = O, Pd = rt, w9 = X, Ar = ji.IteratorPrototype, S9 = z, Sc = "constructor", AT = "Iterator", Tm = w9("toStringTag"), RT = TypeError, xc = v9[AT], _T = !p9(xc) || xc.prototype !== Ar || !b9(function() {
  xc({});
}), Md = function() {
  if (d9(this, Ar), $9(this) === Ar)
    throw new RT("Abstract class Iterator not directly constructable");
}, CT = function(t, r) {
  S9 ? y9(Ar, t, {
    configurable: !0,
    get: function() {
      return r;
    },
    set: function(e) {
      if (g9(this), this === Ar)
        throw new RT("You can't redefine this property");
      Pd(this, t) ? this[t] = e : m9(this, t, e);
    }
  }) : Ar[t] = r;
};
Pd(Ar, Tm) || CT(Tm, AT);
(_T || !Pd(Ar, Sc) || Ar[Sc] === Object) && CT(Sc, Md);
Md.prototype = Ar;
h9({ global: !0, constructor: !0, forced: _T }, {
  Iterator: Md
});
var Gt = function(t) {
  return {
    iterator: t,
    next: t.next,
    done: !1
  };
}, x9 = RangeError, PT = function(t) {
  if (t === t)
    return t;
  throw new x9("NaN is not allowed");
}, E9 = ft, T9 = RangeError, Nd = function(t) {
  var r = E9(t);
  if (r < 0)
    throw new T9("The argument can't be less than 0");
  return r;
}, I9 = V, O9 = Vt, A9 = Tt, R9 = fa, _9 = X, MT = ht, C9 = Cr, P9 = ji.IteratorPrototype, Io = ua, Ec = Xe, M9 = _9("toStringTag"), NT = "IteratorHelper", DT = "WrapForValidIterator", N9 = MT.set, LT = function(t) {
  var r = MT.getterFor(t ? DT : NT);
  return R9(O9(P9), {
    next: function() {
      var n = r(this);
      if (t)
        return n.nextHandler();
      if (n.done)
        return Io(void 0, !0);
      try {
        var a = n.nextHandler();
        return n.returnHandlerResult ? a : Io(a, n.done);
      } catch (i) {
        throw n.done = !0, i;
      }
    },
    return: function() {
      var e = r(this), n = e.iterator;
      if (e.done = !0, t) {
        var a = C9(n, "return");
        return a ? I9(a, n) : Io(void 0, !0);
      }
      if (e.inner)
        try {
          Ec(e.inner.iterator, "normal");
        } catch (i) {
          return Ec(n, "throw", i);
        }
      return n && Ec(n, "normal"), Io(void 0, !0);
    }
  });
}, D9 = LT(!0), FT = LT(!1);
A9(FT, M9, "Iterator Helper");
var va = function(t, r, e) {
  var n = function(i, o) {
    o ? (o.iterator = i.iterator, o.next = i.next) : o = i, o.type = r ? DT : NT, o.returnHandlerResult = !!e, o.nextHandler = t, o.counter = 0, o.done = !1, N9(this, o);
  };
  return n.prototype = r ? D9 : FT, n;
}, L9 = g, Im = V, kh = U, F9 = Gt, k9 = PT, B9 = Nd, j9 = va, U9 = Xr, z9 = j9(function() {
  for (var t = this.iterator, r = this.next, e, n; this.remaining; )
    if (this.remaining--, e = kh(Im(r, t)), n = this.done = !!e.done, n)
      return;
  if (e = kh(Im(r, t)), n = this.done = !!e.done, !n)
    return e.value;
});
L9({ target: "Iterator", proto: !0, real: !0, forced: U9 }, {
  drop: function(r) {
    kh(this);
    var e = B9(k9(+r));
    return new z9(F9(this), {
      remaining: e
    });
  }
});
var V9 = g, H9 = $t, G9 = et, W9 = U, q9 = Gt;
V9({ target: "Iterator", proto: !0, real: !0 }, {
  every: function(r) {
    W9(this), G9(r);
    var e = q9(this), n = 0;
    return !H9(e, function(a, i) {
      if (!r(a, n++))
        return i();
    }, { IS_RECORD: !0, INTERRUPTED: !0 }).stopped;
  }
});
var Y9 = g, K9 = V, X9 = et, kT = U, J9 = Gt, Z9 = va, Q9 = ud, tG = Xr, rG = Z9(function() {
  for (var t = this.iterator, r = this.predicate, e = this.next, n, a, i; ; ) {
    if (n = kT(K9(e, t)), a = this.done = !!n.done, a)
      return;
    if (i = n.value, Q9(t, r, [i, this.counter++], !0))
      return i;
  }
});
Y9({ target: "Iterator", proto: !0, real: !0, forced: tG }, {
  filter: function(r) {
    return kT(this), X9(r), new rG(J9(this), {
      predicate: r
    });
  }
});
var eG = g, nG = $t, aG = et, iG = U, oG = Gt;
eG({ target: "Iterator", proto: !0, real: !0 }, {
  find: function(r) {
    iG(this), aG(r);
    var e = oG(this), n = 0;
    return nG(e, function(a, i) {
      if (r(a, n++))
        return i(a);
    }, { IS_RECORD: !0, INTERRUPTED: !0 }).result;
  }
});
var sG = V, Om = U, uG = Gt, lG = oa, BT = function(t, r) {
  (!r || typeof t != "string") && Om(t);
  var e = lG(t);
  return uG(Om(e !== void 0 ? sG(e, t) : t));
}, cG = g, Am = V, fG = et, Bh = U, hG = Gt, vG = BT, dG = va, Rm = Xe, gG = Xr, pG = dG(function() {
  for (var t = this.iterator, r = this.mapper, e, n; ; ) {
    if (n = this.inner)
      try {
        if (e = Bh(Am(n.next, n.iterator)), !e.done)
          return e.value;
        this.inner = null;
      } catch (a) {
        Rm(t, "throw", a);
      }
    if (e = Bh(Am(this.next, t)), this.done = !!e.done)
      return;
    try {
      this.inner = vG(r(e.value, this.counter++), !1);
    } catch (a) {
      Rm(t, "throw", a);
    }
  }
});
cG({ target: "Iterator", proto: !0, real: !0, forced: gG }, {
  flatMap: function(r) {
    return Bh(this), fG(r), new pG(hG(this), {
      mapper: r,
      inner: null
    });
  }
});
var $G = g, yG = $t, mG = et, bG = U, wG = Gt;
$G({ target: "Iterator", proto: !0, real: !0 }, {
  forEach: function(r) {
    bG(this), mG(r);
    var e = wG(this), n = 0;
    yG(e, function(a) {
      r(a, n++);
    }, { IS_RECORD: !0 });
  }
});
var SG = g, xG = V, EG = at, TG = Lt, IG = ji.IteratorPrototype, OG = va, AG = BT, RG = Xr, _G = OG(function() {
  return xG(this.next, this.iterator);
}, !0);
SG({ target: "Iterator", stat: !0, forced: RG }, {
  from: function(r) {
    var e = AG(typeof r == "string" ? EG(r) : r, !0);
    return TG(IG, e.iterator) ? e.iterator : new _G(e);
  }
});
var CG = V, PG = et, jT = U, MG = Gt, NG = va, DG = ud, LG = NG(function() {
  var t = this.iterator, r = jT(CG(this.next, t)), e = this.done = !!r.done;
  if (!e)
    return DG(t, this.mapper, [r.value, this.counter++], !0);
}), FG = function(r) {
  return jT(this), PG(r), new LG(MG(this), {
    mapper: r
  });
}, kG = g, BG = FG, jG = Xr;
kG({ target: "Iterator", proto: !0, real: !0, forced: jG }, {
  map: BG
});
var UG = g, zG = $t, VG = et, HG = U, GG = Gt, WG = TypeError;
UG({ target: "Iterator", proto: !0, real: !0 }, {
  reduce: function(r) {
    HG(this), VG(r);
    var e = GG(this), n = arguments.length < 2, a = n ? void 0 : arguments[1], i = 0;
    if (zG(e, function(o) {
      n ? (n = !1, a = o) : a = r(a, o, i), i++;
    }, { IS_RECORD: !0 }), n)
      throw new WG("Reduce of empty iterator with no initial value");
    return a;
  }
});
var qG = g, YG = $t, KG = et, XG = U, JG = Gt;
qG({ target: "Iterator", proto: !0, real: !0 }, {
  some: function(r) {
    XG(this), KG(r);
    var e = JG(this), n = 0;
    return YG(e, function(a, i) {
      if (r(a, n++))
        return i();
    }, { IS_RECORD: !0, INTERRUPTED: !0 }).stopped;
  }
});
var ZG = g, QG = V, UT = U, tW = Gt, rW = PT, eW = Nd, nW = va, aW = Xe, iW = Xr, oW = nW(function() {
  var t = this.iterator;
  if (!this.remaining--)
    return this.done = !0, aW(t, "normal", void 0);
  var r = UT(QG(this.next, t)), e = this.done = !!r.done;
  if (!e)
    return r.value;
});
ZG({ target: "Iterator", proto: !0, real: !0, forced: iW }, {
  take: function(r) {
    UT(this);
    var e = eW(rW(+r));
    return new oW(tW(this), {
      remaining: e
    });
  }
});
var sW = g, uW = U, lW = $t, cW = Gt, fW = [].push;
sW({ target: "Iterator", proto: !0, real: !0 }, {
  toArray: function() {
    var r = [];
    return lW(cW(uW(this)), fW, { that: r, IS_RECORD: !0 }), r;
  }
});
var hW = D, vW = kt;
vW(hW.JSON, "JSON", !0);
var zT = { exports: {} }, dW = O, Dd = dW(function() {
  if (typeof ArrayBuffer == "function") {
    var t = new ArrayBuffer(8);
    Object.isExtensible(t) && Object.defineProperty(t, "a", { value: 8 });
  }
}), gW = O, pW = K, $W = Et, _m = Dd, hs = Object.isExtensible, yW = gW(function() {
  hs(1);
}), Ld = yW || _m ? function(r) {
  return !pW(r) || _m && $W(r) === "ArrayBuffer" ? !1 : hs ? hs(r) : !0;
} : hs, mW = O, da = !mW(function() {
  return Object.isExtensible(Object.preventExtensions({}));
}), bW = g, wW = A, SW = Ii, xW = K, Fd = rt, EW = lt.f, Cm = ye, TW = Su, kd = Ld, IW = na, OW = da, VT = !1, qr = IW("meta"), AW = 0, Bd = function(t) {
  EW(t, qr, { value: {
    objectID: "O" + AW++,
    // object ID
    weakData: {}
    // weak collections IDs
  } });
}, RW = function(t, r) {
  if (!xW(t))
    return typeof t == "symbol" ? t : (typeof t == "string" ? "S" : "P") + t;
  if (!Fd(t, qr)) {
    if (!kd(t))
      return "F";
    if (!r)
      return "E";
    Bd(t);
  }
  return t[qr].objectID;
}, _W = function(t, r) {
  if (!Fd(t, qr)) {
    if (!kd(t))
      return !0;
    if (!r)
      return !1;
    Bd(t);
  }
  return t[qr].weakData;
}, CW = function(t) {
  return OW && VT && kd(t) && !Fd(t, qr) && Bd(t), t;
}, PW = function() {
  MW.enable = function() {
  }, VT = !0;
  var t = Cm.f, r = wW([].splice), e = {};
  e[qr] = 1, t(e).length && (Cm.f = function(n) {
    for (var a = t(n), i = 0, o = a.length; i < o; i++)
      if (a[i] === qr) {
        r(a, i, 1);
        break;
      }
    return a;
  }, bW({ target: "Object", stat: !0, forced: !0 }, {
    getOwnPropertyNames: TW.f
  }));
}, MW = zT.exports = {
  enable: PW,
  fastKey: RW,
  getWeakData: _W,
  onFreeze: CW
};
SW[qr] = !0;
var Je = zT.exports, NW = g, DW = D, LW = A, Pm = Ci, FW = ct, kW = Je, BW = $t, jW = $r, UW = tt, zW = Dt, Tc = K, Ic = O, VW = Pu, HW = kt, GW = Ye, Gu = function(t, r, e) {
  var n = t.indexOf("Map") !== -1, a = t.indexOf("Weak") !== -1, i = n ? "set" : "add", o = DW[t], s = o && o.prototype, u = o, l = {}, c = function(p) {
    var b = LW(s[p]);
    FW(
      s,
      p,
      p === "add" ? function(_) {
        return b(this, _ === 0 ? 0 : _), this;
      } : p === "delete" ? function(I) {
        return a && !Tc(I) ? !1 : b(this, I === 0 ? 0 : I);
      } : p === "get" ? function(_) {
        return a && !Tc(_) ? void 0 : b(this, _ === 0 ? 0 : _);
      } : p === "has" ? function(_) {
        return a && !Tc(_) ? !1 : b(this, _ === 0 ? 0 : _);
      } : function(_, M) {
        return b(this, _ === 0 ? 0 : _, M), this;
      }
    );
  }, f = Pm(
    t,
    !UW(o) || !(a || s.forEach && !Ic(function() {
      new o().entries().next();
    }))
  );
  if (f)
    u = e.getConstructor(r, t, n, i), kW.enable();
  else if (Pm(t, !0)) {
    var h = new u(), v = h[i](a ? {} : -0, 1) !== h, d = Ic(function() {
      h.has(1);
    }), $ = VW(function(p) {
      new o(p);
    }), y = !a && Ic(function() {
      for (var p = new o(), b = 5; b--; )
        p[i](b, b);
      return !p.has(-0);
    });
    $ || (u = r(function(p, b) {
      jW(p, s);
      var I = GW(new o(), p, u);
      return zW(b) || BW(b, I[i], { that: I, AS_ENTRIES: n }), I;
    }), u.prototype = s, s.constructor = u), (d || y) && (c("delete"), c("has"), n && c("get")), (y || v) && c(i), a && s.clear && delete s.clear;
  }
  return l[t] = u, NW({ global: !0, constructor: !0, forced: u !== o }, l), HW(u, t), a || e.setStrong(u, t, n), u;
}, Mm = Vt, WW = vt, Nm = fa, qW = pr, YW = $r, KW = Dt, XW = $t, JW = cd, Oo = ua, ZW = ca, Ra = z, Dm = Je.fastKey, HT = ht, Lm = HT.set, Oc = HT.getterFor, GT = {
  getConstructor: function(t, r, e, n) {
    var a = t(function(l, c) {
      YW(l, i), Lm(l, {
        type: r,
        index: Mm(null),
        first: null,
        last: null,
        size: 0
      }), Ra || (l.size = 0), KW(c) || XW(c, l[n], { that: l, AS_ENTRIES: e });
    }), i = a.prototype, o = Oc(r), s = function(l, c, f) {
      var h = o(l), v = u(l, c), d, $;
      return v ? v.value = f : (h.last = v = {
        index: $ = Dm(c, !0),
        key: c,
        value: f,
        previous: d = h.last,
        next: null,
        removed: !1
      }, h.first || (h.first = v), d && (d.next = v), Ra ? h.size++ : l.size++, $ !== "F" && (h.index[$] = v)), l;
    }, u = function(l, c) {
      var f = o(l), h = Dm(c), v;
      if (h !== "F")
        return f.index[h];
      for (v = f.first; v; v = v.next)
        if (v.key === c)
          return v;
    };
    return Nm(i, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function() {
        for (var c = this, f = o(c), h = f.first; h; )
          h.removed = !0, h.previous && (h.previous = h.previous.next = null), h = h.next;
        f.first = f.last = null, f.index = Mm(null), Ra ? f.size = 0 : c.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      delete: function(l) {
        var c = this, f = o(c), h = u(c, l);
        if (h) {
          var v = h.next, d = h.previous;
          delete f.index[h.index], h.removed = !0, d && (d.next = v), v && (v.previous = d), f.first === h && (f.first = v), f.last === h && (f.last = d), Ra ? f.size-- : c.size--;
        }
        return !!h;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function(c) {
        for (var f = o(this), h = qW(c, arguments.length > 1 ? arguments[1] : void 0), v; v = v ? v.next : f.first; )
          for (h(v.value, v.key, this); v && v.removed; )
            v = v.previous;
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function(c) {
        return !!u(this, c);
      }
    }), Nm(i, e ? {
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
    }), Ra && WW(i, "size", {
      configurable: !0,
      get: function() {
        return o(this).size;
      }
    }), a;
  },
  setStrong: function(t, r, e) {
    var n = r + " Iterator", a = Oc(r), i = Oc(n);
    JW(t, r, function(o, s) {
      Lm(this, {
        type: n,
        target: o,
        state: a(o),
        kind: s,
        last: null
      });
    }, function() {
      for (var o = i(this), s = o.kind, u = o.last; u && u.removed; )
        u = u.previous;
      return !o.target || !(o.last = u = u ? u.next : o.state.first) ? (o.target = null, Oo(void 0, !0)) : Oo(s === "keys" ? u.key : s === "values" ? u.value : [u.key, u.value], !1);
    }, e ? "entries" : "values", !e, !0), ZW(r);
  }
}, QW = Gu, tq = GT;
QW("Map", function(t) {
  return function() {
    return t(this, arguments.length ? arguments[0] : void 0);
  };
}, tq);
var Ao = A, _a = Map.prototype, WT = {
  // eslint-disable-next-line es/no-map -- safe
  Map,
  set: Ao(_a.set),
  get: Ao(_a.get),
  has: Ao(_a.has),
  remove: Ao(_a.delete),
  proto: _a
}, rq = g, eq = A, nq = et, aq = ut, iq = $t, Wu = WT, oq = O, qT = Wu.Map, sq = Wu.has, uq = Wu.get, lq = Wu.set, cq = eq([].push), fq = oq(function() {
  return qT.groupBy("ab", function(t) {
    return t;
  }).get("a").length !== 1;
});
rq({ target: "Map", stat: !0, forced: fq }, {
  groupBy: function(r, e) {
    aq(r), nq(e);
    var n = new qT(), a = 0;
    return iq(r, function(i) {
      var o = e(i, a++);
      sq(n, o) ? cq(uq(n, o), i) : lq(n, o, [i]);
    }), n;
  }
});
var hq = Math.log, YT = Math.log1p || function(r) {
  var e = +r;
  return e > -1e-8 && e < 1e-8 ? e - e * e / 2 : hq(1 + e);
}, vq = g, dq = YT, Ac = Math.acosh, gq = Math.log, Fm = Math.sqrt, pq = Math.LN2, $q = !Ac || Math.floor(Ac(Number.MAX_VALUE)) !== 710 || Ac(1 / 0) !== 1 / 0;
vq({ target: "Math", stat: !0, forced: $q }, {
  acosh: function(r) {
    var e = +r;
    return e < 1 ? NaN : e > 9490626562425156e-8 ? gq(e) + pq : dq(e - 1 + Fm(e - 1) * Fm(e + 1));
  }
});
var yq = g, km = Math.asinh, mq = Math.log, bq = Math.sqrt;
function KT(t) {
  var r = +t;
  return !isFinite(r) || r === 0 ? r : r < 0 ? -KT(-r) : mq(r + bq(r * r + 1));
}
var wq = !(km && 1 / km(0) > 0);
yq({ target: "Math", stat: !0, forced: wq }, {
  asinh: KT
});
var Sq = g, Bm = Math.atanh, xq = Math.log, Eq = !(Bm && 1 / Bm(-0) < 0);
Sq({ target: "Math", stat: !0, forced: Eq }, {
  atanh: function(r) {
    var e = +r;
    return e === 0 ? e : xq((1 + e) / (1 - e)) / 2;
  }
});
var Tq = g, Iq = pd, Oq = Math.abs, Aq = Math.pow;
Tq({ target: "Math", stat: !0 }, {
  cbrt: function(r) {
    var e = +r;
    return Iq(e) * Aq(Oq(e), 1 / 3);
  }
});
var Rq = g, _q = Math.floor, Cq = Math.log, Pq = Math.LOG2E;
Rq({ target: "Math", stat: !0 }, {
  clz32: function(r) {
    var e = r >>> 0;
    return e ? 31 - _q(Cq(e + 0.5) * Pq) : 32;
  }
});
var Ca = Math.expm1, Mq = Math.exp, qu = !Ca || Ca(10) > 22025.465794806718 || Ca(10) < 22025.465794806718 || Ca(-2e-17) !== -2e-17 ? function(r) {
  var e = +r;
  return e === 0 ? e : e > -1e-6 && e < 1e-6 ? e + e * e / 2 : Mq(e) - 1;
} : Ca, Nq = g, Dq = qu, jm = Math.cosh, Lq = Math.abs, Rc = Math.E, Fq = !jm || jm(710) === 1 / 0;
Nq({ target: "Math", stat: !0, forced: Fq }, {
  cosh: function(r) {
    var e = Dq(Lq(r) - 1) + 1;
    return (e + 1 / (e * Rc * Rc)) * (Rc / 2);
  }
});
var kq = g, Um = qu;
kq({ target: "Math", stat: !0, forced: Um !== Math.expm1 }, { expm1: Um });
var Bq = g, jq = HE;
Bq({ target: "Math", stat: !0 }, { fround: jq });
var Uq = g, zq = VE, Vq = 9765625e-10, Hq = 65504, Gq = 6103515625e-14;
Uq({ target: "Math", stat: !0 }, {
  f16round: function(r) {
    return zq(r, Vq, Hq, Gq);
  }
});
var Wq = g, zm = Math.hypot, qq = Math.abs, Yq = Math.sqrt, Kq = !!zm && zm(1 / 0, NaN) !== 1 / 0;
Wq({ target: "Math", stat: !0, arity: 2, forced: Kq }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  hypot: function(r, e) {
    for (var n = 0, a = 0, i = arguments.length, o = 0, s, u; a < i; )
      s = qq(arguments[a++]), o < s ? (u = o / s, n = n * u * u + 1, o = s) : s > 0 ? (u = s / o, n += u * u) : n += s;
    return o === 1 / 0 ? 1 / 0 : o * Yq(n);
  }
});
var Xq = g, Jq = O, Vm = Math.imul, Zq = Jq(function() {
  return Vm(4294967295, 5) !== -5 || Vm.length !== 2;
});
Xq({ target: "Math", stat: !0, forced: Zq }, {
  imul: function(r, e) {
    var n = 65535, a = +r, i = +e, o = n & a, s = n & i;
    return 0 | o * s + ((n & a >>> 16) * s + o * (n & i >>> 16) << 16 >>> 0);
  }
});
var Qq = Math.log, tY = Math.LOG10E, XT = Math.log10 || function(r) {
  return Qq(r) * tY;
}, rY = g, eY = XT;
rY({ target: "Math", stat: !0 }, {
  log10: eY
});
var nY = g, aY = YT;
nY({ target: "Math", stat: !0 }, { log1p: aY });
var iY = g, oY = oT;
iY({ target: "Math", stat: !0 }, {
  log2: oY
});
var sY = g, uY = pd;
sY({ target: "Math", stat: !0 }, {
  sign: uY
});
var lY = g, cY = O, Hm = qu, fY = Math.abs, Gm = Math.exp, hY = Math.E, vY = cY(function() {
  return Math.sinh(-2e-17) !== -2e-17;
});
lY({ target: "Math", stat: !0, forced: vY }, {
  sinh: function(r) {
    var e = +r;
    return fY(e) < 1 ? (Hm(e) - Hm(-e)) / 2 : (Gm(e - 1) - Gm(-e - 1)) * (hY / 2);
  }
});
var dY = g, Wm = qu, qm = Math.exp;
dY({ target: "Math", stat: !0 }, {
  tanh: function(r) {
    var e = +r, n = Wm(e), a = Wm(-e);
    return n === 1 / 0 ? 1 : a === 1 / 0 ? -1 : (n - a) / (qm(e) + qm(-e));
  }
});
var gY = kt;
gY(Math, "Math", !0);
var pY = g, $Y = wx;
pY({ target: "Math", stat: !0 }, {
  trunc: $Y
});
var yY = A, Yu = yY(1 .valueOf), zi = `	
\v\f\r                　\u2028\u2029\uFEFF`, mY = A, bY = ut, wY = W, jh = zi, Ym = mY("".replace), SY = RegExp("^[" + jh + "]+"), xY = RegExp("(^|[^" + jh + "])[" + jh + "]+$"), _c = function(t) {
  return function(r) {
    var e = wY(bY(r));
    return t & 1 && (e = Ym(e, SY, "")), t & 2 && (e = Ym(e, xY, "$1")), e;
  };
}, ga = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: _c(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: _c(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: _c(3)
}, EY = g, JT = Xr, TY = z, ZT = D, QT = Rx, tI = A, IY = Ci, Km = rt, OY = Ye, AY = Lt, RY = Ge, rI = yu, _Y = O, CY = ye.f, PY = xt.f, MY = lt.f, NY = Yu, DY = ga.trim, Ku = "Number", Nn = ZT[Ku];
QT[Ku];
var jd = Nn.prototype, LY = ZT.TypeError, FY = tI("".slice), Ro = tI("".charCodeAt), kY = function(t) {
  var r = rI(t, "number");
  return typeof r == "bigint" ? r : BY(r);
}, BY = function(t) {
  var r = rI(t, "number"), e, n, a, i, o, s, u, l;
  if (RY(r))
    throw new LY("Cannot convert a Symbol value to a number");
  if (typeof r == "string" && r.length > 2) {
    if (r = DY(r), e = Ro(r, 0), e === 43 || e === 45) {
      if (n = Ro(r, 2), n === 88 || n === 120)
        return NaN;
    } else if (e === 48) {
      switch (Ro(r, 1)) {
        case 66:
        case 98:
          a = 2, i = 49;
          break;
        case 79:
        case 111:
          a = 8, i = 55;
          break;
        default:
          return +r;
      }
      for (o = FY(r, 2), s = o.length, u = 0; u < s; u++)
        if (l = Ro(o, u), l < 48 || l > i)
          return NaN;
      return parseInt(o, a);
    }
  }
  return +r;
}, Ud = IY(Ku, !Nn(" 0o1") || !Nn("0b1") || Nn("+0x1")), jY = function(t) {
  return AY(jd, t) && _Y(function() {
    NY(t);
  });
}, Xu = function(r) {
  var e = arguments.length < 1 ? 0 : Nn(kY(r));
  return jY(this) ? OY(Object(e), this, Xu) : e;
};
Xu.prototype = jd;
Ud && !JT && (jd.constructor = Xu);
EY({ global: !0, constructor: !0, wrap: !0, forced: Ud }, {
  Number: Xu
});
var UY = function(t, r) {
  for (var e = TY ? CY(r) : (
    // ES3:
    "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(",")
  ), n = 0, a; e.length > n; n++)
    Km(r, a = e[n]) && !Km(t, a) && MY(t, a, PY(r, a));
};
(Ud || JT) && UY(QT[Ku], Nn);
var zY = g;
zY({ target: "Number", stat: !0, nonConfigurable: !0, nonWritable: !0 }, {
  EPSILON: Math.pow(2, -52)
});
var VY = D, HY = VY.isFinite, GY = Number.isFinite || function(r) {
  return typeof r == "number" && HY(r);
}, WY = g, qY = GY;
WY({ target: "Number", stat: !0 }, { isFinite: qY });
var YY = K, KY = Math.floor, zd = Number.isInteger || function(r) {
  return !YY(r) && isFinite(r) && KY(r) === r;
}, XY = g, JY = zd;
XY({ target: "Number", stat: !0 }, {
  isInteger: JY
});
var ZY = g;
ZY({ target: "Number", stat: !0 }, {
  isNaN: function(r) {
    return r !== r;
  }
});
var QY = g, tK = zd, rK = Math.abs;
QY({ target: "Number", stat: !0 }, {
  isSafeInteger: function(r) {
    return tK(r) && rK(r) <= 9007199254740991;
  }
});
var eK = g;
eK({ target: "Number", stat: !0, nonConfigurable: !0, nonWritable: !0 }, {
  MAX_SAFE_INTEGER: 9007199254740991
});
var nK = g;
nK({ target: "Number", stat: !0, nonConfigurable: !0, nonWritable: !0 }, {
  MIN_SAFE_INTEGER: -9007199254740991
});
var eI = D, aK = O, iK = A, oK = W, sK = ga.trim, uK = zi, lK = iK("".charAt), Gs = eI.parseFloat, Xm = eI.Symbol, Jm = Xm && Xm.iterator, cK = 1 / Gs(uK + "-0") !== -1 / 0 || Jm && !aK(function() {
  Gs(Object(Jm));
}), nI = cK ? function(r) {
  var e = sK(oK(r)), n = Gs(e);
  return n === 0 && lK(e, 0) === "-" ? -0 : n;
} : Gs, fK = g, Zm = nI;
fK({ target: "Number", stat: !0, forced: Number.parseFloat !== Zm }, {
  parseFloat: Zm
});
var aI = D, hK = O, vK = A, dK = W, gK = ga.trim, Qm = zi, Xa = aI.parseInt, t0 = aI.Symbol, r0 = t0 && t0.iterator, iI = /^[+-]?0x/i, pK = vK(iI.exec), $K = Xa(Qm + "08") !== 8 || Xa(Qm + "0x16") !== 22 || r0 && !hK(function() {
  Xa(Object(r0));
}), oI = $K ? function(r, e) {
  var n = gK(dK(r));
  return Xa(n, e >>> 0 || (pK(iI, n) ? 16 : 10));
} : Xa, yK = g, e0 = oI;
yK({ target: "Number", stat: !0, forced: Number.parseInt !== e0 }, {
  parseInt: e0
});
var mK = g, Vd = A, bK = ft, wK = Yu, SK = Vu, xK = XT, Uh = O, EK = RangeError, n0 = String, TK = isFinite, IK = Math.abs, OK = Math.floor, a0 = Math.pow, AK = Math.round, Tr = Vd(1 .toExponential), RK = Vd(SK), i0 = Vd("".slice), sI = Tr(-69e-12, 4) === "-6.9000e-11" && Tr(1.255, 2) === "1.25e+0" && Tr(12345, 3) === "1.235e+4" && Tr(25, 0) === "3e+1", _K = function() {
  return Uh(function() {
    Tr(1, 1 / 0);
  }) && Uh(function() {
    Tr(1, -1 / 0);
  });
}, CK = function() {
  return !Uh(function() {
    Tr(1 / 0, 1 / 0), Tr(NaN, 1 / 0);
  });
}, PK = !sI || !_K() || !CK();
mK({ target: "Number", proto: !0, forced: PK }, {
  toExponential: function(r) {
    var e = wK(this);
    if (r === void 0)
      return Tr(e);
    var n = bK(r);
    if (!TK(e))
      return String(e);
    if (n < 0 || n > 20)
      throw new EK("Incorrect fraction digits");
    if (sI)
      return Tr(e, n);
    var a = "", i, o, s, u;
    if (e < 0 && (a = "-", e = -e), e === 0)
      o = 0, i = RK("0", n + 1);
    else {
      var l = xK(e);
      o = OK(l);
      var c = a0(10, o - n), f = AK(e / c);
      2 * e >= (2 * f + 1) * c && (f += 1), f >= a0(10, n + 1) && (f /= 10, o += 1), i = n0(f);
    }
    return n !== 0 && (i = i0(i, 0, 1) + "." + i0(i, 1)), o === 0 ? (s = "+", u = "0") : (s = o > 0 ? "+" : "-", u = n0(IK(o))), i += "e" + s + u, a + i;
  }
});
var MK = g, Hd = A, NK = ft, DK = Yu, LK = Vu, o0 = O, FK = RangeError, uI = String, lI = Math.floor, zh = Hd(LK), s0 = Hd("".slice), Pa = Hd(1 .toFixed), En = function(t, r, e) {
  return r === 0 ? e : r % 2 === 1 ? En(t, r - 1, e * t) : En(t * t, r / 2, e);
}, kK = function(t) {
  for (var r = 0, e = t; e >= 4096; )
    r += 12, e /= 4096;
  for (; e >= 2; )
    r += 1, e /= 2;
  return r;
}, sn = function(t, r, e) {
  for (var n = -1, a = e; ++n < 6; )
    a += r * t[n], t[n] = a % 1e7, a = lI(a / 1e7);
}, Cc = function(t, r) {
  for (var e = 6, n = 0; --e >= 0; )
    n += t[e], t[e] = lI(n / r), n = n % r * 1e7;
}, u0 = function(t) {
  for (var r = 6, e = ""; --r >= 0; )
    if (e !== "" || r === 0 || t[r] !== 0) {
      var n = uI(t[r]);
      e = e === "" ? n : e + zh("0", 7 - n.length) + n;
    }
  return e;
}, BK = o0(function() {
  return Pa(8e-5, 3) !== "0.000" || Pa(0.9, 0) !== "1" || Pa(1.255, 2) !== "1.25" || Pa(1000000000000000100, 0) !== "1000000000000000128";
}) || !o0(function() {
  Pa({});
});
MK({ target: "Number", proto: !0, forced: BK }, {
  toFixed: function(r) {
    var e = DK(this), n = NK(r), a = [0, 0, 0, 0, 0, 0], i = "", o = "0", s, u, l, c;
    if (n < 0 || n > 20)
      throw new FK("Incorrect fraction digits");
    if (e !== e)
      return "NaN";
    if (e <= -1e21 || e >= 1e21)
      return uI(e);
    if (e < 0 && (i = "-", e = -e), e > 1e-21)
      if (s = kK(e * En(2, 69, 1)) - 69, u = s < 0 ? e * En(2, -s, 1) : e / En(2, s, 1), u *= 4503599627370496, s = 52 - s, s > 0) {
        for (sn(a, 0, u), l = n; l >= 7; )
          sn(a, 1e7, 0), l -= 7;
        for (sn(a, En(10, l, 1), 0), l = s - 1; l >= 23; )
          Cc(a, 1 << 23), l -= 23;
        Cc(a, 1 << l), sn(a, 1, 1), Cc(a, 2), o = u0(a);
      } else
        sn(a, 0, u), sn(a, 1 << -s, 0), o = u0(a) + zh("0", n);
    return n > 0 ? (c = o.length, o = i + (c <= n ? "0." + zh("0", n - c) + o : s0(o, 0, c - n) + "." + s0(o, c - n))) : o = i + o, o;
  }
});
var jK = g, UK = A, l0 = O, c0 = Yu, Ws = UK(1 .toPrecision), zK = l0(function() {
  return Ws(1, void 0) !== "1";
}) || !l0(function() {
  Ws({});
});
jK({ target: "Number", proto: !0, forced: zK }, {
  toPrecision: function(r) {
    return r === void 0 ? Ws(c0(this)) : Ws(c0(this), r);
  }
});
var f0 = z, VK = A, HK = V, GK = O, Pc = Pi, WK = Ai, qK = Ti, YK = at, KK = ta, un = Object.assign, h0 = Object.defineProperty, XK = VK([].concat), cI = !un || GK(function() {
  if (f0 && un({ b: 1 }, un(h0({}, "a", {
    enumerable: !0,
    get: function() {
      h0(this, "b", {
        value: 3,
        enumerable: !1
      });
    }
  }), { b: 2 })).b !== 1)
    return !0;
  var t = {}, r = {}, e = Symbol("assign detection"), n = "abcdefghijklmnopqrst";
  return t[e] = 7, n.split("").forEach(function(a) {
    r[a] = a;
  }), un({}, t)[e] !== 7 || Pc(un({}, r)).join("") !== n;
}) ? function(r, e) {
  for (var n = YK(r), a = arguments.length, i = 1, o = WK.f, s = qK.f; a > i; )
    for (var u = KK(arguments[i++]), l = o ? XK(Pc(u), o(u)) : Pc(u), c = l.length, f = 0, h; c > f; )
      h = l[f++], (!f0 || HK(s, u, h)) && (n[h] = u[h]);
  return n;
} : un, JK = g, v0 = cI;
JK({ target: "Object", stat: !0, arity: 2, forced: Object.assign !== v0 }, {
  assign: v0
});
var ZK = g, QK = z, tX = Vt;
ZK({ target: "Object", stat: !0, sham: !QK }, {
  create: tX
});
var rX = D, eX = O, d0 = dd, Ju = !eX(function() {
  if (!(d0 && d0 < 535)) {
    var t = Math.random();
    __defineSetter__.call(null, t, function() {
    }), delete rX[t];
  }
}), nX = g, aX = z, iX = Ju, oX = et, sX = at, uX = lt;
aX && nX({ target: "Object", proto: !0, forced: iX }, {
  __defineGetter__: function(r, e) {
    uX.f(sX(this), r, { get: oX(e), enumerable: !0, configurable: !0 });
  }
});
var lX = g, cX = z, g0 = wu.f;
lX({ target: "Object", stat: !0, forced: Object.defineProperties !== g0, sham: !cX }, {
  defineProperties: g0
});
var fX = g, hX = z, p0 = lt.f;
fX({ target: "Object", stat: !0, forced: Object.defineProperty !== p0, sham: !hX }, {
  defineProperty: p0
});
var vX = g, dX = z, gX = Ju, pX = et, $X = at, yX = lt;
dX && vX({ target: "Object", proto: !0, forced: gX }, {
  __defineSetter__: function(r, e) {
    yX.f($X(this), r, { set: pX(e), enumerable: !0, configurable: !0 });
  }
});
var fI = z, mX = O, hI = A, bX = Ht, wX = Pi, SX = pt, xX = Ti.f, vI = hI(xX), EX = hI([].push), TX = fI && mX(function() {
  var t = /* @__PURE__ */ Object.create(null);
  return t[2] = 2, !vI(t, 2);
}), $0 = function(t) {
  return function(r) {
    for (var e = SX(r), n = wX(e), a = TX && bX(e) === null, i = n.length, o = 0, s = [], u; i > o; )
      u = n[o++], (!fI || (a ? u in e : vI(e, u))) && EX(s, t ? [u, e[u]] : e[u]);
    return s;
  };
}, dI = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: $0(!0),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: $0(!1)
}, IX = g, OX = dI.entries;
IX({ target: "Object", stat: !0 }, {
  entries: function(r) {
    return OX(r);
  }
});
var AX = g, RX = da, _X = O, CX = K, PX = Je.onFreeze, Vh = Object.freeze, MX = _X(function() {
  Vh(1);
});
AX({ target: "Object", stat: !0, forced: MX, sham: !RX }, {
  freeze: function(r) {
    return Vh && CX(r) ? Vh(PX(r)) : r;
  }
});
var NX = g, DX = $t, LX = Zr;
NX({ target: "Object", stat: !0 }, {
  fromEntries: function(r) {
    var e = {};
    return DX(r, function(n, a) {
      LX(e, n, a);
    }, { AS_ENTRIES: !0 }), e;
  }
});
var FX = g, kX = O, BX = pt, gI = xt.f, pI = z, jX = !pI || kX(function() {
  gI(1);
});
FX({ target: "Object", stat: !0, forced: jX, sham: !pI }, {
  getOwnPropertyDescriptor: function(r, e) {
    return gI(BX(r), e);
  }
});
var UX = g, zX = z, VX = Yv, HX = pt, GX = xt, WX = Zr;
UX({ target: "Object", stat: !0, sham: !zX }, {
  getOwnPropertyDescriptors: function(r) {
    for (var e = HX(r), n = GX.f, a = VX(e), i = {}, o = 0, s, u; a.length > o; )
      u = n(e, s = a[o++]), u !== void 0 && WX(i, s, u);
    return i;
  }
});
var qX = g, YX = O, KX = Su.f, XX = YX(function() {
  return !Object.getOwnPropertyNames(1);
});
qX({ target: "Object", stat: !0, forced: XX }, {
  getOwnPropertyNames: KX
});
var JX = g, ZX = O, QX = at, $I = Ht, tJ = ad, rJ = ZX(function() {
  $I(1);
});
JX({ target: "Object", stat: !0, forced: rJ, sham: !tJ }, {
  getPrototypeOf: function(r) {
    return $I(QX(r));
  }
});
var eJ = g, nJ = ot, aJ = A, iJ = et, oJ = ut, sJ = $e, uJ = $t, lJ = O, y0 = Object.groupBy, cJ = nJ("Object", "create"), fJ = aJ([].push), hJ = !y0 || lJ(function() {
  return y0("ab", function(t) {
    return t;
  }).a.length !== 1;
});
eJ({ target: "Object", stat: !0, forced: hJ }, {
  groupBy: function(r, e) {
    oJ(r), iJ(e);
    var n = cJ(null), a = 0;
    return uJ(r, function(i) {
      var o = sJ(e(i, a++));
      o in n ? fJ(n[o], i) : n[o] = [i];
    }), n;
  }
});
var vJ = g, dJ = rt;
vJ({ target: "Object", stat: !0 }, {
  hasOwn: dJ
});
var yI = Object.is || function(r, e) {
  return r === e ? r !== 0 || 1 / r === 1 / e : r !== r && e !== e;
}, gJ = g, pJ = yI;
gJ({ target: "Object", stat: !0 }, {
  is: pJ
});
var $J = g, m0 = Ld;
$J({ target: "Object", stat: !0, forced: Object.isExtensible !== m0 }, {
  isExtensible: m0
});
var yJ = g, mJ = O, bJ = K, wJ = Et, mI = Dd, Hh = Object.isFrozen, SJ = mI || mJ(function() {
  Hh(1);
});
yJ({ target: "Object", stat: !0, forced: SJ }, {
  isFrozen: function(r) {
    return !bJ(r) || mI && wJ(r) === "ArrayBuffer" ? !0 : Hh ? Hh(r) : !1;
  }
});
var xJ = g, EJ = O, TJ = K, IJ = Et, bI = Dd, Gh = Object.isSealed, OJ = bI || EJ(function() {
  Gh(1);
});
xJ({ target: "Object", stat: !0, forced: OJ }, {
  isSealed: function(r) {
    return !TJ(r) || bI && IJ(r) === "ArrayBuffer" ? !0 : Gh ? Gh(r) : !1;
  }
});
var AJ = g, RJ = at, wI = Pi, _J = O, CJ = _J(function() {
  wI(1);
});
AJ({ target: "Object", stat: !0, forced: CJ }, {
  keys: function(r) {
    return wI(RJ(r));
  }
});
var PJ = g, MJ = z, NJ = Ju, DJ = at, LJ = $e, FJ = Ht, kJ = xt.f;
MJ && PJ({ target: "Object", proto: !0, forced: NJ }, {
  __lookupGetter__: function(r) {
    var e = DJ(this), n = LJ(r), a;
    do
      if (a = kJ(e, n))
        return a.get;
    while (e = FJ(e));
  }
});
var BJ = g, jJ = z, UJ = Ju, zJ = at, VJ = $e, HJ = Ht, GJ = xt.f;
jJ && BJ({ target: "Object", proto: !0, forced: UJ }, {
  __lookupSetter__: function(r) {
    var e = zJ(this), n = VJ(r), a;
    do
      if (a = GJ(e, n))
        return a.set;
    while (e = HJ(e));
  }
});
var WJ = g, qJ = K, YJ = Je.onFreeze, KJ = da, XJ = O, Wh = Object.preventExtensions, JJ = XJ(function() {
  Wh(1);
});
WJ({ target: "Object", stat: !0, forced: JJ, sham: !KJ }, {
  preventExtensions: function(r) {
    return Wh && qJ(r) ? Wh(YJ(r)) : r;
  }
});
var ZJ = z, QJ = vt, tZ = K, rZ = nE, eZ = at, nZ = ut, b0 = Object.getPrototypeOf, w0 = Object.setPrototypeOf, S0 = Object.prototype, x0 = "__proto__";
if (ZJ && b0 && w0 && !(x0 in S0))
  try {
    QJ(S0, x0, {
      configurable: !0,
      get: function() {
        return b0(eZ(this));
      },
      set: function(r) {
        var e = nZ(this);
        rZ(r) && tZ(e) && w0(e, r);
      }
    });
  } catch {
  }
var aZ = g, iZ = K, oZ = Je.onFreeze, sZ = da, uZ = O, qh = Object.seal, lZ = uZ(function() {
  qh(1);
});
aZ({ target: "Object", stat: !0, forced: lZ, sham: !sZ }, {
  seal: function(r) {
    return qh && iZ(r) ? qh(oZ(r)) : r;
  }
});
var cZ = g, fZ = Pr;
cZ({ target: "Object", stat: !0 }, {
  setPrototypeOf: fZ
});
var hZ = Kv, vZ = gr, dZ = hZ ? {}.toString : function() {
  return "[object " + vZ(this) + "]";
}, gZ = Kv, pZ = ct, $Z = dZ;
gZ || pZ(Object.prototype, "toString", $Z, { unsafe: !0 });
var yZ = g, mZ = dI.values;
yZ({ target: "Object", stat: !0 }, {
  values: function(r) {
    return mZ(r);
  }
});
var bZ = g, E0 = nI;
bZ({ global: !0, forced: parseFloat !== E0 }, {
  parseFloat: E0
});
var wZ = g, T0 = oI;
wZ({ global: !0, forced: parseInt !== T0 }, {
  parseInt: T0
});
var SZ = ia, xZ = We, EZ = TypeError, Gd = function(t) {
  if (SZ(t))
    return t;
  throw new EZ(xZ(t) + " is not a constructor");
}, I0 = U, TZ = Gd, IZ = Dt, OZ = X, AZ = OZ("species"), Zu = function(t, r) {
  var e = I0(t).constructor, n;
  return e === void 0 || IZ(n = I0(e)[AZ]) ? r : TZ(n);
}, RZ = TypeError, nr = function(t, r) {
  if (t < r)
    throw new RZ("Not enough arguments");
  return t;
}, _Z = _r, SI = /(?:ipad|iphone|ipod).*applewebkit/i.test(_Z), Ut = D, CZ = er, PZ = pr, O0 = tt, MZ = rt, xI = O, A0 = Ex, NZ = rr, R0 = mu, DZ = nr, LZ = SI, FZ = la, Yh = Ut.setImmediate, Kh = Ut.clearImmediate, kZ = Ut.process, Mc = Ut.Dispatch, BZ = Ut.Function, _0 = Ut.MessageChannel, jZ = Ut.String, Nc = 0, Ja = {}, C0 = "onreadystatechange", di, Ie, Dc, Lc;
xI(function() {
  di = Ut.location;
});
var Wd = function(t) {
  if (MZ(Ja, t)) {
    var r = Ja[t];
    delete Ja[t], r();
  }
}, Fc = function(t) {
  return function() {
    Wd(t);
  };
}, P0 = function(t) {
  Wd(t.data);
}, M0 = function(t) {
  Ut.postMessage(jZ(t), di.protocol + "//" + di.host);
};
(!Yh || !Kh) && (Yh = function(r) {
  DZ(arguments.length, 1);
  var e = O0(r) ? r : BZ(r), n = NZ(arguments, 1);
  return Ja[++Nc] = function() {
    CZ(e, void 0, n);
  }, Ie(Nc), Nc;
}, Kh = function(r) {
  delete Ja[r];
}, FZ ? Ie = function(t) {
  kZ.nextTick(Fc(t));
} : Mc && Mc.now ? Ie = function(t) {
  Mc.now(Fc(t));
} : _0 && !LZ ? (Dc = new _0(), Lc = Dc.port2, Dc.port1.onmessage = P0, Ie = PZ(Lc.postMessage, Lc)) : Ut.addEventListener && O0(Ut.postMessage) && !Ut.importScripts && di && di.protocol !== "file:" && !xI(M0) ? (Ie = M0, Ut.addEventListener("message", P0, !1)) : C0 in R0("script") ? Ie = function(t) {
  A0.appendChild(R0("script"))[C0] = function() {
    A0.removeChild(this), Wd(t);
  };
} : Ie = function(t) {
  setTimeout(Fc(t), 0);
});
var Qu = {
  set: Yh,
  clear: Kh
}, N0 = D, UZ = z, zZ = Object.getOwnPropertyDescriptor, EI = function(t) {
  if (!UZ)
    return N0[t];
  var r = zZ(N0, t);
  return r && r.value;
}, TI = function() {
  this.head = null, this.tail = null;
};
TI.prototype = {
  add: function(t) {
    var r = { item: t, next: null }, e = this.tail;
    e ? e.next = r : this.head = r, this.tail = r;
  },
  get: function() {
    var t = this.head;
    if (t) {
      var r = this.head = t.next;
      return r === null && (this.tail = null), t.item;
    }
  }
};
var II = TI, VZ = _r, HZ = /ipad|iphone|ipod/i.test(VZ) && typeof Pebble < "u", GZ = _r, WZ = /web0s(?!.*chrome)/i.test(GZ), qn = D, qZ = EI, D0 = pr, kc = Qu.set, YZ = II, KZ = SI, XZ = HZ, JZ = WZ, Bc = la, L0 = qn.MutationObserver || qn.WebKitMutationObserver, F0 = qn.document, k0 = qn.process, _o = qn.Promise, Xh = qZ("queueMicrotask"), ln, jc, Uc, Co, B0;
if (!Xh) {
  var Po = new YZ(), Mo = function() {
    var t, r;
    for (Bc && (t = k0.domain) && t.exit(); r = Po.get(); )
      try {
        r();
      } catch (e) {
        throw Po.head && ln(), e;
      }
    t && t.enter();
  };
  !KZ && !Bc && !JZ && L0 && F0 ? (jc = !0, Uc = F0.createTextNode(""), new L0(Mo).observe(Uc, { characterData: !0 }), ln = function() {
    Uc.data = jc = !jc;
  }) : !XZ && _o && _o.resolve ? (Co = _o.resolve(void 0), Co.constructor = _o, B0 = D0(Co.then, Co), ln = function() {
    B0(Mo);
  }) : Bc ? ln = function() {
    k0.nextTick(Mo);
  } : (kc = D0(kc, qn), ln = function() {
    kc(Mo);
  }), Xh = function(t) {
    Po.head || ln(), Po.add(t);
  };
}
var OI = Xh, ZZ = function(t, r) {
  try {
    arguments.length === 1 ? console.error(t) : console.error(t, r);
  } catch {
  }
}, pa = function(t) {
  try {
    return { error: !1, value: t() };
  } catch (r) {
    return { error: !0, value: r };
  }
}, QZ = D, Vi = QZ.Promise, tQ = D, Za = Vi, rQ = tt, eQ = Ci, nQ = Hv, aQ = X, j0 = Nu, zc = Kr;
Za && Za.prototype;
var iQ = aQ("species"), Jh = !1, AI = rQ(tQ.PromiseRejectionEvent), oQ = eQ("Promise", function() {
  var t = nQ(Za), r = t !== String(Za);
  if (!r && zc === 66)
    return !0;
  if (!zc || zc < 51 || !/native code/.test(t)) {
    var e = new Za(function(i) {
      i(1);
    }), n = function(i) {
      i(function() {
      }, function() {
      });
    }, a = e.constructor = {};
    if (a[iQ] = n, Jh = e.then(function() {
    }) instanceof n, !Jh)
      return !0;
  }
  return !r && (j0 === "BROWSER" || j0 === "DENO") && !AI;
}), Hi = {
  CONSTRUCTOR: oQ,
  REJECTION_EVENT: AI,
  SUBCLASSING: Jh
}, Nr = {}, U0 = et, sQ = TypeError, uQ = function(t) {
  var r, e;
  this.promise = new t(function(n, a) {
    if (r !== void 0 || e !== void 0)
      throw new sQ("Bad Promise constructor");
    r = n, e = a;
  }), this.resolve = U0(r), this.reject = U0(e);
};
Nr.f = function(t) {
  return new uQ(t);
};
var lQ = g, qs = la, pe = D, Yn = V, z0 = ct, V0 = Pr, cQ = kt, fQ = ca, hQ = et, vs = tt, vQ = K, dQ = $r, gQ = Zu, RI = Qu.set, qd = OI, pQ = ZZ, $Q = pa, yQ = II, _I = ht, Ys = Vi, Yd = Hi, CI = Nr, tl = "Promise", PI = Yd.CONSTRUCTOR, mQ = Yd.REJECTION_EVENT, bQ = Yd.SUBCLASSING, Vc = _I.getterFor(tl), wQ = _I.set, gn = Ys && Ys.prototype, Pe = Ys, No = gn, MI = pe.TypeError, Zh = pe.document, Kd = pe.process, Qh = CI.f, SQ = Qh, xQ = !!(Zh && Zh.createEvent && pe.dispatchEvent), NI = "unhandledrejection", EQ = "rejectionhandled", H0 = 0, DI = 1, TQ = 2, Xd = 1, LI = 2, Do, G0, IQ, W0, FI = function(t) {
  var r;
  return vQ(t) && vs(r = t.then) ? r : !1;
}, kI = function(t, r) {
  var e = r.value, n = r.state === DI, a = n ? t.ok : t.fail, i = t.resolve, o = t.reject, s = t.domain, u, l, c;
  try {
    a ? (n || (r.rejection === LI && AQ(r), r.rejection = Xd), a === !0 ? u = e : (s && s.enter(), u = a(e), s && (s.exit(), c = !0)), u === t.promise ? o(new MI("Promise-chain cycle")) : (l = FI(u)) ? Yn(l, u, i, o) : i(u)) : o(e);
  } catch (f) {
    s && !c && s.exit(), o(f);
  }
}, BI = function(t, r) {
  t.notified || (t.notified = !0, qd(function() {
    for (var e = t.reactions, n; n = e.get(); )
      kI(n, t);
    t.notified = !1, r && !t.rejection && OQ(t);
  }));
}, jI = function(t, r, e) {
  var n, a;
  xQ ? (n = Zh.createEvent("Event"), n.promise = r, n.reason = e, n.initEvent(t, !1, !0), pe.dispatchEvent(n)) : n = { promise: r, reason: e }, !mQ && (a = pe["on" + t]) ? a(n) : t === NI && pQ("Unhandled promise rejection", e);
}, OQ = function(t) {
  Yn(RI, pe, function() {
    var r = t.facade, e = t.value, n = q0(t), a;
    if (n && (a = $Q(function() {
      qs ? Kd.emit("unhandledRejection", e, r) : jI(NI, r, e);
    }), t.rejection = qs || q0(t) ? LI : Xd, a.error))
      throw a.value;
  });
}, q0 = function(t) {
  return t.rejection !== Xd && !t.parent;
}, AQ = function(t) {
  Yn(RI, pe, function() {
    var r = t.facade;
    qs ? Kd.emit("rejectionHandled", r) : jI(EQ, r, t.value);
  });
}, Tn = function(t, r, e) {
  return function(n) {
    t(r, n, e);
  };
}, Dn = function(t, r, e) {
  t.done || (t.done = !0, e && (t = e), t.value = r, t.state = TQ, BI(t, !0));
}, tv = function(t, r, e) {
  if (!t.done) {
    t.done = !0, e && (t = e);
    try {
      if (t.facade === r)
        throw new MI("Promise can't be resolved itself");
      var n = FI(r);
      n ? qd(function() {
        var a = { done: !1 };
        try {
          Yn(
            n,
            r,
            Tn(tv, a, t),
            Tn(Dn, a, t)
          );
        } catch (i) {
          Dn(a, i, t);
        }
      }) : (t.value = r, t.state = DI, BI(t, !1));
    } catch (a) {
      Dn({ done: !1 }, a, t);
    }
  }
};
if (PI && (Pe = function(r) {
  dQ(this, No), hQ(r), Yn(Do, this);
  var e = Vc(this);
  try {
    r(Tn(tv, e), Tn(Dn, e));
  } catch (n) {
    Dn(e, n);
  }
}, No = Pe.prototype, Do = function(r) {
  wQ(this, {
    type: tl,
    done: !1,
    notified: !1,
    parent: !1,
    reactions: new yQ(),
    rejection: !1,
    state: H0,
    value: null
  });
}, Do.prototype = z0(No, "then", function(r, e) {
  var n = Vc(this), a = Qh(gQ(this, Pe));
  return n.parent = !0, a.ok = vs(r) ? r : !0, a.fail = vs(e) && e, a.domain = qs ? Kd.domain : void 0, n.state === H0 ? n.reactions.add(a) : qd(function() {
    kI(a, n);
  }), a.promise;
}), G0 = function() {
  var t = new Do(), r = Vc(t);
  this.promise = t, this.resolve = Tn(tv, r), this.reject = Tn(Dn, r);
}, CI.f = Qh = function(t) {
  return t === Pe || t === IQ ? new G0(t) : SQ(t);
}, vs(Ys) && gn !== Object.prototype)) {
  W0 = gn.then, bQ || z0(gn, "then", function(r, e) {
    var n = this;
    return new Pe(function(a, i) {
      Yn(W0, n, a, i);
    }).then(r, e);
  }, { unsafe: !0 });
  try {
    delete gn.constructor;
  } catch {
  }
  V0 && V0(gn, No);
}
lQ({ global: !0, constructor: !0, wrap: !0, forced: PI }, {
  Promise: Pe
});
cQ(Pe, tl, !1);
fQ(tl);
var RQ = Vi, _Q = Pu, CQ = Hi.CONSTRUCTOR, rl = CQ || !_Q(function(t) {
  RQ.all(t).then(void 0, function() {
  });
}), PQ = g, MQ = V, NQ = et, DQ = Nr, LQ = pa, FQ = $t, kQ = rl;
PQ({ target: "Promise", stat: !0, forced: kQ }, {
  all: function(r) {
    var e = this, n = DQ.f(e), a = n.resolve, i = n.reject, o = LQ(function() {
      var s = NQ(e.resolve), u = [], l = 0, c = 1;
      FQ(r, function(f) {
        var h = l++, v = !1;
        c++, MQ(s, e, f).then(function(d) {
          v || (v = !0, u[h] = d, --c || a(u));
        }, i);
      }), --c || a(u);
    });
    return o.error && i(o.value), n.promise;
  }
});
var BQ = g, jQ = Hi.CONSTRUCTOR, rv = Vi, UQ = ot, zQ = tt, VQ = ct, Y0 = rv && rv.prototype;
BQ({ target: "Promise", proto: !0, forced: jQ, real: !0 }, {
  catch: function(t) {
    return this.then(void 0, t);
  }
});
if (zQ(rv)) {
  var K0 = UQ("Promise").prototype.catch;
  Y0.catch !== K0 && VQ(Y0, "catch", K0, { unsafe: !0 });
}
var HQ = g, GQ = V, WQ = et, qQ = Nr, YQ = pa, KQ = $t, XQ = rl;
HQ({ target: "Promise", stat: !0, forced: XQ }, {
  race: function(r) {
    var e = this, n = qQ.f(e), a = n.reject, i = YQ(function() {
      var o = WQ(e.resolve);
      KQ(r, function(s) {
        GQ(o, e, s).then(n.resolve, a);
      });
    });
    return i.error && a(i.value), n.promise;
  }
});
var JQ = g, ZQ = Nr, QQ = Hi.CONSTRUCTOR;
JQ({ target: "Promise", stat: !0, forced: QQ }, {
  reject: function(r) {
    var e = ZQ.f(this), n = e.reject;
    return n(r), e.promise;
  }
});
var ttt = U, rtt = K, ett = Nr, UI = function(t, r) {
  if (ttt(t), rtt(r) && r.constructor === t)
    return r;
  var e = ett.f(t), n = e.resolve;
  return n(r), e.promise;
}, ntt = g, att = ot, itt = Hi.CONSTRUCTOR, ott = UI;
att("Promise");
ntt({ target: "Promise", stat: !0, forced: itt }, {
  resolve: function(r) {
    return ott(this, r);
  }
});
var stt = g, utt = V, ltt = et, ctt = Nr, ftt = pa, htt = $t, vtt = rl;
stt({ target: "Promise", stat: !0, forced: vtt }, {
  allSettled: function(r) {
    var e = this, n = ctt.f(e), a = n.resolve, i = n.reject, o = ftt(function() {
      var s = ltt(e.resolve), u = [], l = 0, c = 1;
      htt(r, function(f) {
        var h = l++, v = !1;
        c++, utt(s, e, f).then(function(d) {
          v || (v = !0, u[h] = { status: "fulfilled", value: d }, --c || a(u));
        }, function(d) {
          v || (v = !0, u[h] = { status: "rejected", reason: d }, --c || a(u));
        });
      }), --c || a(u);
    });
    return o.error && i(o.value), n.promise;
  }
});
var dtt = g, gtt = V, ptt = et, $tt = ot, ytt = Nr, mtt = pa, btt = $t, wtt = rl, X0 = "No one promise resolved";
dtt({ target: "Promise", stat: !0, forced: wtt }, {
  any: function(r) {
    var e = this, n = $tt("AggregateError"), a = ytt.f(e), i = a.resolve, o = a.reject, s = mtt(function() {
      var u = ptt(e.resolve), l = [], c = 0, f = 1, h = !1;
      btt(r, function(v) {
        var d = c++, $ = !1;
        f++, gtt(u, e, v).then(function(y) {
          $ || h || (h = !0, i(y));
        }, function(y) {
          $ || h || ($ = !0, l[d] = y, --f || o(new n(l, X0)));
        });
      }), --f || o(new n(l, X0));
    });
    return s.error && o(s.value), a.promise;
  }
});
var Stt = g, Ks = Vi, xtt = O, zI = ot, VI = tt, Ett = Zu, J0 = UI, Ttt = ct, ev = Ks && Ks.prototype, Itt = !!Ks && xtt(function() {
  ev.finally.call({ then: function() {
  } }, function() {
  });
});
Stt({ target: "Promise", proto: !0, real: !0, forced: Itt }, {
  finally: function(t) {
    var r = Ett(this, zI("Promise")), e = VI(t);
    return this.then(
      e ? function(n) {
        return J0(r, t()).then(function() {
          return n;
        });
      } : t,
      e ? function(n) {
        return J0(r, t()).then(function() {
          throw n;
        });
      } : t
    );
  }
});
if (VI(Ks)) {
  var Z0 = zI("Promise").prototype.finally;
  ev.finally !== Z0 && Ttt(ev, "finally", Z0, { unsafe: !0 });
}
var Ott = g, Att = D, Rtt = er, _tt = rr, Ctt = Nr, Ptt = et, HI = pa, Hc = Att.Promise, Q0 = !1, Mtt = !Hc || !Hc.try || HI(function() {
  Hc.try(function(t) {
    Q0 = t === 8;
  }, 8);
}).error || !Q0;
Ott({ target: "Promise", stat: !0, forced: Mtt }, {
  try: function(t) {
    var r = arguments.length > 1 ? _tt(arguments, 1) : [], e = Ctt.f(this), n = HI(function() {
      return Rtt(Ptt(t), void 0, r);
    });
    return (n.error ? e.reject : e.resolve)(n.value), e.promise;
  }
});
var Ntt = g, Dtt = Nr;
Ntt({ target: "Promise", stat: !0 }, {
  withResolvers: function() {
    var r = Dtt.f(this);
    return {
      promise: r.promise,
      resolve: r.resolve,
      reject: r.reject
    };
  }
});
var Ltt = g, Ftt = er, ktt = et, Btt = U, jtt = O, Utt = !jtt(function() {
  Reflect.apply(function() {
  });
});
Ltt({ target: "Reflect", stat: !0, forced: Utt }, {
  apply: function(r, e, n) {
    return Ftt(ktt(r), e, Btt(n));
  }
});
var ztt = g, Vtt = ot, Gc = er, Htt = ET, t1 = Gd, Gtt = U, r1 = K, Wtt = Vt, GI = O, Jd = Vtt("Reflect", "construct"), qtt = Object.prototype, Ytt = [].push, WI = GI(function() {
  function t() {
  }
  return !(Jd(function() {
  }, [], t) instanceof t);
}), qI = !GI(function() {
  Jd(function() {
  });
}), e1 = WI || qI;
ztt({ target: "Reflect", stat: !0, forced: e1, sham: e1 }, {
  construct: function(r, e) {
    t1(r), Gtt(e);
    var n = arguments.length < 3 ? r : t1(arguments[2]);
    if (qI && !WI)
      return Jd(r, e, n);
    if (r === n) {
      switch (e.length) {
        case 0:
          return new r();
        case 1:
          return new r(e[0]);
        case 2:
          return new r(e[0], e[1]);
        case 3:
          return new r(e[0], e[1], e[2]);
        case 4:
          return new r(e[0], e[1], e[2], e[3]);
      }
      var a = [null];
      return Gc(Ytt, a, e), new (Gc(Htt, r, a))();
    }
    var i = n.prototype, o = Wtt(r1(i) ? i : qtt), s = Gc(r, o, e);
    return r1(s) ? s : o;
  }
});
var Ktt = g, Xtt = z, n1 = U, Jtt = $e, YI = lt, Ztt = O, Qtt = Ztt(function() {
  Reflect.defineProperty(YI.f({}, 1, { value: 1 }), 1, { value: 2 });
});
Ktt({ target: "Reflect", stat: !0, forced: Qtt, sham: !Xtt }, {
  defineProperty: function(r, e, n) {
    n1(r);
    var a = Jtt(e);
    n1(n);
    try {
      return YI.f(r, a, n), !0;
    } catch {
      return !1;
    }
  }
});
var trt = g, rrt = U, ert = xt.f;
trt({ target: "Reflect", stat: !0 }, {
  deleteProperty: function(r, e) {
    var n = ert(rrt(r), e);
    return n && !n.configurable ? !1 : delete r[e];
  }
});
var a1 = rt, KI = function(t) {
  return t !== void 0 && (a1(t, "value") || a1(t, "writable"));
}, nrt = g, art = V, irt = K, ort = U, srt = KI, urt = xt, lrt = Ht;
function XI(t, r) {
  var e = arguments.length < 3 ? t : arguments[2], n, a;
  if (ort(t) === e)
    return t[r];
  if (n = urt.f(t, r), n)
    return srt(n) ? n.value : n.get === void 0 ? void 0 : art(n.get, e);
  if (irt(a = lrt(t)))
    return XI(a, r, e);
}
nrt({ target: "Reflect", stat: !0 }, {
  get: XI
});
var crt = g, frt = z, hrt = U, vrt = xt;
crt({ target: "Reflect", stat: !0, sham: !frt }, {
  getOwnPropertyDescriptor: function(r, e) {
    return vrt.f(hrt(r), e);
  }
});
var drt = g, grt = U, prt = Ht, $rt = ad;
drt({ target: "Reflect", stat: !0, sham: !$rt }, {
  getPrototypeOf: function(r) {
    return prt(grt(r));
  }
});
var yrt = g;
yrt({ target: "Reflect", stat: !0 }, {
  has: function(r, e) {
    return e in r;
  }
});
var mrt = g, brt = U, wrt = Ld;
mrt({ target: "Reflect", stat: !0 }, {
  isExtensible: function(r) {
    return brt(r), wrt(r);
  }
});
var Srt = g, xrt = Yv;
Srt({ target: "Reflect", stat: !0 }, {
  ownKeys: xrt
});
var Ert = g, Trt = ot, Irt = U, Ort = da;
Ert({ target: "Reflect", stat: !0, sham: !Ort }, {
  preventExtensions: function(r) {
    Irt(r);
    try {
      var e = Trt("Object", "preventExtensions");
      return e && e(r), !0;
    } catch {
      return !1;
    }
  }
});
var Art = g, Rrt = V, _rt = U, i1 = K, Crt = KI, Prt = O, nv = lt, o1 = xt, Mrt = Ht, s1 = tr;
function JI(t, r, e) {
  var n = arguments.length < 4 ? t : arguments[3], a = o1.f(_rt(t), r), i, o, s;
  if (!a) {
    if (i1(o = Mrt(t)))
      return JI(o, r, e, n);
    a = s1(0);
  }
  if (Crt(a)) {
    if (a.writable === !1 || !i1(n))
      return !1;
    if (i = o1.f(n, r)) {
      if (i.get || i.set || i.writable === !1)
        return !1;
      i.value = e, nv.f(n, r, i);
    } else
      nv.f(n, r, s1(0, e));
  } else {
    if (s = a.set, s === void 0)
      return !1;
    Rrt(s, n, e);
  }
  return !0;
}
var Nrt = Prt(function() {
  var t = function() {
  }, r = nv.f(new t(), "a", { configurable: !0 });
  return Reflect.set(t.prototype, "a", 1, r) !== !1;
});
Art({ target: "Reflect", stat: !0, forced: Nrt }, {
  set: JI
});
var Drt = g, Lrt = U, Frt = aE, u1 = Pr;
u1 && Drt({ target: "Reflect", stat: !0 }, {
  setPrototypeOf: function(r, e) {
    Lrt(r), Frt(e);
    try {
      return u1(r, e), !0;
    } catch {
      return !1;
    }
  }
});
var krt = g, Brt = D, jrt = kt;
krt({ global: !0 }, { Reflect: {} });
jrt(Brt.Reflect, "Reflect", !0);
var Urt = K, zrt = Et, Vrt = X, Hrt = Vrt("match"), el = function(t) {
  var r;
  return Urt(t) && ((r = t[Hrt]) !== void 0 ? !!r : zrt(t) === "RegExp");
}, Grt = U, Zd = function() {
  var t = Grt(this), r = "";
  return t.hasIndices && (r += "d"), t.global && (r += "g"), t.ignoreCase && (r += "i"), t.multiline && (r += "m"), t.dotAll && (r += "s"), t.unicode && (r += "u"), t.unicodeSets && (r += "v"), t.sticky && (r += "y"), r;
}, Wrt = V, qrt = rt, Yrt = Lt, Krt = Zd, l1 = RegExp.prototype, Gi = function(t) {
  var r = t.flags;
  return r === void 0 && !("flags" in l1) && !qrt(t, "flags") && Yrt(l1, t) ? Wrt(Krt, t) : r;
}, Qd = O, Xrt = D, tg = Xrt.RegExp, rg = Qd(function() {
  var t = tg("a", "y");
  return t.lastIndex = 2, t.exec("abcd") !== null;
}), Jrt = rg || Qd(function() {
  return !tg("a", "y").sticky;
}), Zrt = rg || Qd(function() {
  var t = tg("^r", "gy");
  return t.lastIndex = 2, t.exec("str") !== null;
}), nl = {
  BROKEN_CARET: Zrt,
  MISSED_STICKY: Jrt,
  UNSUPPORTED_Y: rg
}, Qrt = O, tet = D, ret = tet.RegExp, eg = Qrt(function() {
  var t = ret(".", "s");
  return !(t.dotAll && t.test(`
`) && t.flags === "s");
}), eet = O, net = D, aet = net.RegExp, ZI = eet(function() {
  var t = aet("(?<a>b)", "g");
  return t.exec("b").groups.a !== "b" || "b".replace(t, "$<a>c") !== "bc";
}), iet = z, ng = D, Wi = A, oet = Ci, set = Ye, uet = Tt, cet = Vt, fet = ye.f, c1 = Lt, het = el, f1 = W, vet = Gi, QI = nl, det = iE, get = ct, pet = O, $et = rt, yet = ht.enforce, met = ca, bet = X, tO = eg, rO = ZI, wet = bet("match"), ve = ng.RegExp, pn = ve.prototype, xet = ng.SyntaxError, Eet = Wi(pn.exec), Xs = Wi("".charAt), h1 = Wi("".replace), v1 = Wi("".indexOf), d1 = Wi("".slice), Tet = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/, Fe = /a/g, Wc = /a/g, Iet = new ve(Fe) !== Fe, eO = QI.MISSED_STICKY, Oet = QI.UNSUPPORTED_Y, Aet = iet && (!Iet || eO || tO || rO || pet(function() {
  return Wc[wet] = !1, ve(Fe) !== Fe || ve(Wc) === Wc || String(ve(Fe, "i")) !== "/a/i";
})), Ret = function(t) {
  for (var r = t.length, e = 0, n = "", a = !1, i; e <= r; e++) {
    if (i = Xs(t, e), i === "\\") {
      n += i + Xs(t, ++e);
      continue;
    }
    !a && i === "." ? n += "[\\s\\S]" : (i === "[" ? a = !0 : i === "]" && (a = !1), n += i);
  }
  return n;
}, _et = function(t) {
  for (var r = t.length, e = 0, n = "", a = [], i = cet(null), o = !1, s = !1, u = 0, l = "", c; e <= r; e++) {
    if (c = Xs(t, e), c === "\\")
      c += Xs(t, ++e);
    else if (c === "]")
      o = !1;
    else if (!o)
      switch (!0) {
        case c === "[":
          o = !0;
          break;
        case c === "(":
          if (n += c, d1(t, e + 1, e + 3) === "?:")
            continue;
          Eet(Tet, d1(t, e + 1)) && (e += 2, s = !0), u++;
          continue;
        case (c === ">" && s):
          if (l === "" || $et(i, l))
            throw new xet("Invalid capture group name");
          i[l] = !0, a[a.length] = [l, u], s = !1, l = "";
          continue;
      }
    s ? l += c : n += c;
  }
  return [n, a];
};
if (oet("RegExp", Aet)) {
  for (var Oe = function(r, e) {
    var n = c1(pn, this), a = het(r), i = e === void 0, o = [], s = r, u, l, c, f, h, v;
    if (!n && a && i && r.constructor === Oe)
      return r;
    if ((a || c1(pn, r)) && (r = r.source, i && (e = vet(s))), r = r === void 0 ? "" : f1(r), e = e === void 0 ? "" : f1(e), s = r, tO && "dotAll" in Fe && (l = !!e && v1(e, "s") > -1, l && (e = h1(e, /s/g, ""))), u = e, eO && "sticky" in Fe && (c = !!e && v1(e, "y") > -1, c && Oet && (e = h1(e, /y/g, ""))), rO && (f = _et(r), r = f[0], o = f[1]), h = set(ve(r, e), n ? this : pn, Oe), (l || c || o.length) && (v = yet(h), l && (v.dotAll = !0, v.raw = Oe(Ret(r), u)), c && (v.sticky = !0), o.length && (v.groups = o)), r !== s)
      try {
        uet(h, "source", s === "" ? "(?:)" : s);
      } catch {
      }
    return h;
  }, g1 = fet(ve), p1 = 0; g1.length > p1; )
    det(Oe, ve, g1[p1++]);
  pn.constructor = Oe, Oe.prototype = pn, get(ng, "RegExp", Oe, { constructor: !0 });
}
met("RegExp");
var Cet = TypeError, Pet = function(t) {
  if (typeof t == "string")
    return t;
  throw new Cet("Argument is not a string");
}, Met = g, qi = A, Net = Pet, Det = rt, $1 = Hu.start, Let = zi, Fet = Array, y1 = RegExp.escape, m1 = qi("".charAt), av = qi("".charCodeAt), ket = qi(1.1.toString), Bet = qi([].join), nO = /^[0-9a-z]/i, jet = /^[$()*+./?[\\\]^{|}]/, Uet = RegExp("^[!\"#%&',\\-:;<=>@`~" + Let + "]"), qc = qi(nO.exec), b1 = {
  "	": "t",
  "\n": "n",
  "\v": "v",
  "\f": "f",
  "\r": "r"
}, Yc = function(t) {
  var r = ket(av(t, 0), 16);
  return r.length < 3 ? "\\x" + $1(r, 2, "0") : "\\u" + $1(r, 4, "0");
}, zet = !y1 || y1("ab") !== "\\x61b";
Met({ target: "RegExp", stat: !0, forced: zet }, {
  escape: function(r) {
    Net(r);
    for (var e = r.length, n = Fet(e), a = 0; a < e; a++) {
      var i = m1(r, a);
      if (a === 0 && qc(nO, i))
        n[a] = Yc(i);
      else if (Det(b1, i))
        n[a] = "\\" + b1[i];
      else if (qc(jet, i))
        n[a] = "\\" + i;
      else if (qc(Uet, i))
        n[a] = Yc(i);
      else {
        var o = av(i, 0);
        (o & 63488) !== 55296 ? n[a] = i : o >= 56320 || a + 1 >= e || (av(r, a + 1) & 64512) !== 56320 ? n[a] = Yc(i) : (n[a] = i, n[++a] = m1(r, a));
      }
    }
    return Bet(n, "");
  }
});
var Vet = z, Het = eg, Get = Et, Wet = vt, qet = ht.get, w1 = RegExp.prototype, Yet = TypeError;
Vet && Het && Wet(w1, "dotAll", {
  configurable: !0,
  get: function() {
    if (this !== w1) {
      if (Get(this) === "RegExp")
        return !!qet(this).dotAll;
      throw new Yet("Incompatible receiver, RegExp required");
    }
  }
});
var In = V, al = A, Ket = W, Xet = Zd, Jet = nl, Zet = ea, Qet = Vt, tnt = ht.get, rnt = eg, ent = ZI, nnt = Zet("native-string-replace", String.prototype.replace), Js = RegExp.prototype.exec, iv = Js, ant = al("".charAt), int = al("".indexOf), ont = al("".replace), Kc = al("".slice), ov = function() {
  var t = /a/, r = /b*/g;
  return In(Js, t, "a"), In(Js, r, "a"), t.lastIndex !== 0 || r.lastIndex !== 0;
}(), aO = Jet.BROKEN_CARET, sv = /()??/.exec("")[1] !== void 0, snt = ov || sv || aO || rnt || ent;
snt && (iv = function(r) {
  var e = this, n = tnt(e), a = Ket(r), i = n.raw, o, s, u, l, c, f, h;
  if (i)
    return i.lastIndex = e.lastIndex, o = In(iv, i, a), e.lastIndex = i.lastIndex, o;
  var v = n.groups, d = aO && e.sticky, $ = In(Xet, e), y = e.source, p = 0, b = a;
  if (d && ($ = ont($, "y", ""), int($, "g") === -1 && ($ += "g"), b = Kc(a, e.lastIndex), e.lastIndex > 0 && (!e.multiline || e.multiline && ant(a, e.lastIndex - 1) !== `
`) && (y = "(?: " + y + ")", b = " " + b, p++), s = new RegExp("^(?:" + y + ")", $)), sv && (s = new RegExp("^" + y + "$(?!\\s)", $)), ov && (u = e.lastIndex), l = In(Js, d ? s : e, b), d ? l ? (l.input = Kc(l.input, p), l[0] = Kc(l[0], p), l.index = e.lastIndex, e.lastIndex += l[0].length) : e.lastIndex = 0 : ov && l && (e.lastIndex = e.global ? l.index + l[0].length : u), sv && l && l.length > 1 && In(nnt, l[0], s, function() {
    for (c = 1; c < arguments.length - 2; c++)
      arguments[c] === void 0 && (l[c] = void 0);
  }), l && v)
    for (l.groups = f = Qet(null), c = 0; c < v.length; c++)
      h = v[c], f[h[0]] = l[h[1]];
  return l;
});
var ag = iv, unt = g, S1 = ag;
unt({ target: "RegExp", proto: !0, forced: /./.exec !== S1 }, {
  exec: S1
});
var lnt = D, cnt = z, fnt = vt, hnt = Zd, vnt = O, iO = lnt.RegExp, oO = iO.prototype, dnt = cnt && vnt(function() {
  var t = !0;
  try {
    iO(".", "d");
  } catch {
    t = !1;
  }
  var r = {}, e = "", n = t ? "dgimsy" : "gimsy", a = function(u, l) {
    Object.defineProperty(r, u, { get: function() {
      return e += l, !0;
    } });
  }, i = {
    dotAll: "s",
    global: "g",
    ignoreCase: "i",
    multiline: "m",
    sticky: "y"
  };
  t && (i.hasIndices = "d");
  for (var o in i)
    a(o, i[o]);
  var s = Object.getOwnPropertyDescriptor(oO, "flags").get.call(r);
  return s !== n || e !== n;
});
dnt && fnt(oO, "flags", {
  configurable: !0,
  get: hnt
});
var gnt = z, pnt = nl.MISSED_STICKY, $nt = Et, ynt = vt, mnt = ht.get, x1 = RegExp.prototype, bnt = TypeError;
gnt && pnt && ynt(x1, "sticky", {
  configurable: !0,
  get: function() {
    if (this !== x1) {
      if ($nt(this) === "RegExp")
        return !!mnt(this).sticky;
      throw new bnt("Incompatible receiver, RegExp required");
    }
  }
});
var wnt = g, E1 = V, Snt = tt, T1 = U, xnt = W, Ent = function() {
  var t = !1, r = /[ac]/;
  return r.exec = function() {
    return t = !0, /./.exec.apply(this, arguments);
  }, r.test("abc") === !0 && t;
}(), Tnt = /./.test;
wnt({ target: "RegExp", proto: !0, forced: !Ent }, {
  test: function(t) {
    var r = T1(this), e = xnt(t), n = r.exec;
    if (!Snt(n))
      return E1(Tnt, r, e);
    var a = E1(n, r, e);
    return a === null ? !1 : (T1(a), !0);
  }
});
var Int = aa.PROPER, Ont = ct, Ant = U, I1 = W, Rnt = O, _nt = Gi, ig = "toString", sO = RegExp.prototype, uO = sO[ig], Cnt = Rnt(function() {
  return uO.call({ source: "a", flags: "b" }) !== "/a/b";
}), Pnt = Int && uO.name !== ig;
(Cnt || Pnt) && Ont(sO, ig, function() {
  var r = Ant(this), e = I1(r.source), n = I1(_nt(r));
  return "/" + e + "/" + n;
}, { unsafe: !0 });
var Mnt = Gu, Nnt = GT;
Mnt("Set", function(t) {
  return function() {
    return t(this, arguments.length ? arguments[0] : void 0);
  };
}, Nnt);
var Xc = A, Lo = Set.prototype, yr = {
  // eslint-disable-next-line es/no-set -- safe
  Set,
  add: Xc(Lo.add),
  has: Xc(Lo.has),
  remove: Xc(Lo.delete),
  proto: Lo
}, Dnt = yr.has, Ze = function(t) {
  return Dnt(t), t;
}, Lnt = V, Qe = function(t, r, e) {
  for (var n = e ? t : t.iterator, a = t.next, i, o; !(i = Lnt(a, n)).done; )
    if (o = r(i.value), o !== void 0)
      return o;
}, lO = A, Fnt = Qe, cO = yr, knt = cO.Set, fO = cO.proto, Bnt = lO(fO.forEach), hO = lO(fO.keys), jnt = hO(new knt()).next, $a = function(t, r, e) {
  return e ? Fnt({ iterator: hO(t), next: jnt }, r) : Bnt(t, r);
}, vO = yr, Unt = $a, znt = vO.Set, Vnt = vO.add, og = function(t) {
  var r = new znt();
  return Unt(t, function(e) {
    Vnt(r, e);
  }), r;
}, Hnt = Au, Gnt = yr, Yi = Hnt(Gnt.proto, "size", "get") || function(t) {
  return t.size;
}, O1 = et, dO = U, A1 = V, Wnt = ft, qnt = Gt, R1 = "Invalid size", Ynt = RangeError, Knt = TypeError, Xnt = Math.max, gO = function(t, r) {
  this.set = t, this.size = Xnt(r, 0), this.has = O1(t.has), this.keys = O1(t.keys);
};
gO.prototype = {
  getIterator: function() {
    return qnt(dO(A1(this.keys, this.set)));
  },
  includes: function(t) {
    return A1(this.has, this.set, t);
  }
};
var tn = function(t) {
  dO(t);
  var r = +t.size;
  if (r !== r)
    throw new Knt(R1);
  var e = Wnt(r);
  if (e < 0)
    throw new Ynt(R1);
  return new gO(t, e);
}, Jnt = Ze, pO = yr, Znt = og, Qnt = Yi, tat = tn, rat = $a, eat = Qe, nat = pO.has, _1 = pO.remove, aat = function(r) {
  var e = Jnt(this), n = tat(r), a = Znt(e);
  return Qnt(e) <= n.size ? rat(e, function(i) {
    n.includes(i) && _1(a, i);
  }) : eat(n.getIterator(), function(i) {
    nat(e, i) && _1(a, i);
  }), a;
}, iat = ot, C1 = function(t) {
  return {
    size: t,
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
}, P1 = function(t) {
  return {
    size: t,
    has: function() {
      return !0;
    },
    keys: function() {
      throw new Error("e");
    }
  };
}, rn = function(t, r) {
  var e = iat("Set");
  try {
    new e()[t](C1(0));
    try {
      return new e()[t](C1(-1)), !1;
    } catch {
      if (!r)
        return !0;
      try {
        return new e()[t](P1(-1 / 0)), !1;
      } catch {
        var n = new e();
        return n.add(1), n.add(2), r(n[t](P1(1 / 0)));
      }
    }
  } catch {
    return !1;
  }
}, oat = g, sat = aat, uat = rn, lat = !uat("difference", function(t) {
  return t.size === 0;
});
oat({ target: "Set", proto: !0, real: !0, forced: lat }, {
  difference: sat
});
var cat = Ze, sg = yr, fat = Yi, hat = tn, vat = $a, dat = Qe, gat = sg.Set, M1 = sg.add, pat = sg.has, $at = function(r) {
  var e = cat(this), n = hat(r), a = new gat();
  return fat(e) > n.size ? dat(n.getIterator(), function(i) {
    pat(e, i) && M1(a, i);
  }) : vat(e, function(i) {
    n.includes(i) && M1(a, i);
  }), a;
}, yat = g, mat = O, bat = $at, wat = rn, Sat = !wat("intersection", function(t) {
  return t.size === 2 && t.has(1) && t.has(2);
}) || mat(function() {
  return String(Array.from((/* @__PURE__ */ new Set([1, 2, 3])).intersection(/* @__PURE__ */ new Set([3, 2])))) !== "3,2";
});
yat({ target: "Set", proto: !0, real: !0, forced: Sat }, {
  intersection: bat
});
var xat = Ze, Eat = yr.has, Tat = Yi, Iat = tn, Oat = $a, Aat = Qe, Rat = Xe, _at = function(r) {
  var e = xat(this), n = Iat(r);
  if (Tat(e) <= n.size)
    return Oat(e, function(i) {
      if (n.includes(i))
        return !1;
    }, !0) !== !1;
  var a = n.getIterator();
  return Aat(a, function(i) {
    if (Eat(e, i))
      return Rat(a, "normal", !1);
  }) !== !1;
}, Cat = g, Pat = _at, Mat = rn, Nat = !Mat("isDisjointFrom", function(t) {
  return !t;
});
Cat({ target: "Set", proto: !0, real: !0, forced: Nat }, {
  isDisjointFrom: Pat
});
var Dat = Ze, Lat = Yi, Fat = $a, kat = tn, Bat = function(r) {
  var e = Dat(this), n = kat(r);
  return Lat(e) > n.size ? !1 : Fat(e, function(a) {
    if (!n.includes(a))
      return !1;
  }, !0) !== !1;
}, jat = g, Uat = Bat, zat = rn, Vat = !zat("isSubsetOf", function(t) {
  return t;
});
jat({ target: "Set", proto: !0, real: !0, forced: Vat }, {
  isSubsetOf: Uat
});
var Hat = Ze, Gat = yr.has, Wat = Yi, qat = tn, Yat = Qe, Kat = Xe, Xat = function(r) {
  var e = Hat(this), n = qat(r);
  if (Wat(e) < n.size)
    return !1;
  var a = n.getIterator();
  return Yat(a, function(i) {
    if (!Gat(e, i))
      return Kat(a, "normal", !1);
  }) !== !1;
}, Jat = g, Zat = Xat, Qat = rn, tit = !Qat("isSupersetOf", function(t) {
  return !t;
});
Jat({ target: "Set", proto: !0, real: !0, forced: tit }, {
  isSupersetOf: Zat
});
var rit = Ze, ug = yr, eit = og, nit = tn, ait = Qe, iit = ug.add, oit = ug.has, sit = ug.remove, uit = function(r) {
  var e = rit(this), n = nit(r).getIterator(), a = eit(e);
  return ait(n, function(i) {
    oit(e, i) ? sit(a, i) : iit(a, i);
  }), a;
}, lit = g, cit = uit, fit = rn;
lit({ target: "Set", proto: !0, real: !0, forced: !fit("symmetricDifference") }, {
  symmetricDifference: cit
});
var hit = Ze, vit = yr.add, dit = og, git = tn, pit = Qe, $it = function(r) {
  var e = hit(this), n = git(r).getIterator(), a = dit(e);
  return pit(n, function(i) {
    vit(a, i);
  }), a;
}, yit = g, mit = $it, bit = rn;
yit({ target: "Set", proto: !0, real: !0, forced: !bit("union") }, {
  union: mit
});
var wit = g, Sit = A, xit = ut, Eit = ft, Tit = W, Iit = O, Oit = Sit("".charAt), Ait = Iit(function() {
  return "𠮷".at(-2) !== "\uD842";
});
wit({ target: "String", proto: !0, forced: Ait }, {
  at: function(r) {
    var e = Tit(xit(this)), n = e.length, a = Eit(r), i = a >= 0 ? a : n + a;
    return i < 0 || i >= n ? void 0 : Oit(e, i);
  }
});
var lg = A, Rit = ft, _it = W, Cit = ut, Pit = lg("".charAt), N1 = lg("".charCodeAt), Mit = lg("".slice), D1 = function(t) {
  return function(r, e) {
    var n = _it(Cit(r)), a = Rit(e), i = n.length, o, s;
    return a < 0 || a >= i ? t ? "" : void 0 : (o = N1(n, a), o < 55296 || o > 56319 || a + 1 === i || (s = N1(n, a + 1)) < 56320 || s > 57343 ? t ? Pit(n, a) : o : t ? Mit(n, a, a + 2) : (o - 55296 << 10) + (s - 56320) + 65536);
  };
}, il = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: D1(!1),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: D1(!0)
}, Nit = g, Dit = il.codeAt;
Nit({ target: "String", proto: !0 }, {
  codePointAt: function(r) {
    return Dit(this, r);
  }
});
var Lit = el, Fit = TypeError, cg = function(t) {
  if (Lit(t))
    throw new Fit("The method doesn't accept regular expressions");
  return t;
}, kit = X, Bit = kit("match"), fg = function(t) {
  var r = /./;
  try {
    "/./"[t](r);
  } catch {
    try {
      return r[Bit] = !1, "/./"[t](r);
    } catch {
    }
  }
  return !1;
}, jit = g, Uit = qe, zit = xt.f, Vit = zt, L1 = W, Hit = cg, Git = ut, Wit = fg, qit = Uit("".slice), Yit = Math.min, $O = Wit("endsWith"), Kit = !$O && !!function() {
  var t = zit(String.prototype, "endsWith");
  return t && !t.writable;
}();
jit({ target: "String", proto: !0, forced: !Kit && !$O }, {
  endsWith: function(r) {
    var e = L1(Git(this));
    Hit(r);
    var n = arguments.length > 1 ? arguments[1] : void 0, a = e.length, i = n === void 0 ? a : Yit(Vit(n), a), o = L1(r);
    return qit(e, i - o.length, i) === o;
  }
});
var Xit = g, Jit = A, Zit = Jr, Qit = RangeError, F1 = String.fromCharCode, k1 = String.fromCodePoint, tot = Jit([].join), rot = !!k1 && k1.length !== 1;
Xit({ target: "String", stat: !0, arity: 1, forced: rot }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  fromCodePoint: function(r) {
    for (var e = [], n = arguments.length, a = 0, i; n > a; ) {
      if (i = +arguments[a++], Zit(i, 1114111) !== i)
        throw new Qit(i + " is not a valid code point");
      e[a] = i < 65536 ? F1(i) : F1(((i -= 65536) >> 10) + 55296, i % 1024 + 56320);
    }
    return tot(e, "");
  }
});
var eot = g, not = A, aot = cg, iot = ut, B1 = W, oot = fg, sot = not("".indexOf);
eot({ target: "String", proto: !0, forced: !oot("includes") }, {
  includes: function(r) {
    return !!~sot(
      B1(iot(this)),
      B1(aot(r)),
      arguments.length > 1 ? arguments[1] : void 0
    );
  }
});
var uot = g, lot = A, cot = ut, fot = W, j1 = lot("".charCodeAt);
uot({ target: "String", proto: !0 }, {
  isWellFormed: function() {
    for (var r = fot(cot(this)), e = r.length, n = 0; n < e; n++) {
      var a = j1(r, n);
      if ((a & 63488) === 55296 && (a >= 56320 || ++n >= e || (j1(r, n) & 64512) !== 56320))
        return !1;
    }
    return !0;
  }
});
var hot = il.charAt, vot = W, yO = ht, dot = cd, U1 = ua, mO = "String Iterator", got = yO.set, pot = yO.getterFor(mO);
dot(String, "String", function(t) {
  got(this, {
    type: mO,
    string: vot(t),
    index: 0
  });
}, function() {
  var r = pot(this), e = r.string, n = r.index, a;
  return n >= e.length ? U1(void 0, !0) : (a = hot(e, n), r.index += a.length, U1(a, !1));
});
var z1 = V, V1 = ct, $ot = ag, H1 = O, bO = X, yot = Tt, mot = bO("species"), Jc = RegExp.prototype, ol = function(t, r, e, n) {
  var a = bO(t), i = !H1(function() {
    var l = {};
    return l[a] = function() {
      return 7;
    }, ""[t](l) !== 7;
  }), o = i && !H1(function() {
    var l = !1, c = /a/;
    return t === "split" && (c = {}, c.constructor = {}, c.constructor[mot] = function() {
      return c;
    }, c.flags = "", c[a] = /./[a]), c.exec = function() {
      return l = !0, null;
    }, c[a](""), !l;
  });
  if (!i || !o || e) {
    var s = /./[a], u = r(a, ""[t], function(l, c, f, h, v) {
      var d = c.exec;
      return d === $ot || d === Jc.exec ? i && !v ? { done: !0, value: z1(s, c, f, h) } : { done: !0, value: z1(l, f, c, h) } : { done: !1 };
    });
    V1(String.prototype, t, u[0]), V1(Jc, a, u[1]);
  }
  n && yot(Jc[a], "sham", !0);
}, bot = il.charAt, sl = function(t, r, e) {
  return r + (e ? bot(t, r).length : 1);
}, G1 = V, wot = U, Sot = tt, xot = Et, Eot = ag, Tot = TypeError, Ki = function(t, r) {
  var e = t.exec;
  if (Sot(e)) {
    var n = G1(e, t, r);
    return n !== null && wot(n), n;
  }
  if (xot(t) === "RegExp")
    return G1(Eot, t, r);
  throw new Tot("RegExp#exec called on incompatible receiver");
}, Iot = V, Oot = ol, Aot = U, Rot = Dt, _ot = zt, Zc = W, Cot = ut, Pot = Cr, Mot = sl, W1 = Ki;
Oot("match", function(t, r, e) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function(a) {
      var i = Cot(this), o = Rot(a) ? void 0 : Pot(a, t);
      return o ? Iot(o, a, i) : new RegExp(a)[t](Zc(i));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function(n) {
      var a = Aot(this), i = Zc(n), o = e(r, a, i);
      if (o.done)
        return o.value;
      if (!a.global)
        return W1(a, i);
      var s = a.unicode;
      a.lastIndex = 0;
      for (var u = [], l = 0, c; (c = W1(a, i)) !== null; ) {
        var f = Zc(c[0]);
        u[l] = f, f === "" && (a.lastIndex = Mot(i, _ot(a.lastIndex), s)), l++;
      }
      return l === 0 ? null : u;
    }
  ];
});
var Not = g, Dot = V, wO = qe, Lot = ld, Fo = ua, q1 = ut, SO = zt, gi = W, Fot = U, kot = Dt, Bot = Et, jot = el, xO = Gi, Uot = Cr, zot = ct, Vot = O, Hot = X, Got = Zu, Wot = sl, qot = Ki, EO = ht, Yot = Xr, Zs = Hot("matchAll"), TO = "RegExp String", IO = TO + " Iterator", Kot = EO.set, Xot = EO.getterFor(IO), Y1 = RegExp.prototype, Jot = TypeError, uv = wO("".indexOf), Qs = wO("".matchAll), Qc = !!Qs && !Vot(function() {
  Qs("a", /./);
}), Zot = Lot(function(r, e, n, a) {
  Kot(this, {
    type: IO,
    regexp: r,
    string: e,
    global: n,
    unicode: a,
    done: !1
  });
}, TO, function() {
  var r = Xot(this);
  if (r.done)
    return Fo(void 0, !0);
  var e = r.regexp, n = r.string, a = qot(e, n);
  return a === null ? (r.done = !0, Fo(void 0, !0)) : r.global ? (gi(a[0]) === "" && (e.lastIndex = Wot(n, SO(e.lastIndex), r.unicode)), Fo(a, !1)) : (r.done = !0, Fo(a, !1));
}), OO = function(t) {
  var r = Fot(this), e = gi(t), n = Got(r, RegExp), a = gi(xO(r)), i, o, s;
  return i = new n(n === RegExp ? r.source : r, a), o = !!~uv(a, "g"), s = !!~uv(a, "u"), i.lastIndex = SO(r.lastIndex), new Zot(i, e, o, s);
};
Not({ target: "String", proto: !0, forced: Qc }, {
  matchAll: function(r) {
    var e = q1(this), n, a, i, o;
    if (kot(r)) {
      if (Qc)
        return Qs(e, r);
    } else {
      if (jot(r) && (n = gi(q1(xO(r))), !~uv(n, "g")))
        throw new Jot("`.matchAll` does not allow non-global regexes");
      if (Qc)
        return Qs(e, r);
      if (i = Uot(r, Zs), i === void 0 && Yot && Bot(r) === "RegExp" && (i = OO), i)
        return Dot(i, r, e);
    }
    return a = gi(e), o = new RegExp(r, "g"), o[Zs](a);
  }
});
Zs in Y1 || zot(Y1, Zs, OO);
var Qot = _r, AO = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(Qot), tst = g, rst = Hu.end, est = AO;
tst({ target: "String", proto: !0, forced: est }, {
  padEnd: function(r) {
    return rst(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var nst = g, ast = Hu.start, ist = AO;
nst({ target: "String", proto: !0, forced: ist }, {
  padStart: function(r) {
    return ast(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var ost = g, RO = A, sst = pt, ust = at, K1 = W, lst = st, X1 = RO([].push), cst = RO([].join);
ost({ target: "String", stat: !0 }, {
  raw: function(r) {
    var e = sst(ust(r).raw), n = lst(e);
    if (!n)
      return "";
    for (var a = arguments.length, i = [], o = 0; ; ) {
      if (X1(i, K1(e[o++])), o === n)
        return cst(i, "");
      o < a && X1(i, K1(arguments[o]));
    }
  }
});
var fst = g, hst = Vu;
fst({ target: "String", proto: !0 }, {
  repeat: hst
});
var hg = A, vst = at, dst = Math.floor, tf = hg("".charAt), gst = hg("".replace), rf = hg("".slice), pst = /\$([$&'`]|\d{1,2}|<[^>]*>)/g, $st = /\$([$&'`]|\d{1,2})/g, _O = function(t, r, e, n, a, i) {
  var o = e + t.length, s = n.length, u = $st;
  return a !== void 0 && (a = vst(a), u = pst), gst(i, u, function(l, c) {
    var f;
    switch (tf(c, 0)) {
      case "$":
        return "$";
      case "&":
        return t;
      case "`":
        return rf(r, 0, e);
      case "'":
        return rf(r, o);
      case "<":
        f = a[rf(c, 1, -1)];
        break;
      default:
        var h = +c;
        if (h === 0)
          return l;
        if (h > s) {
          var v = dst(h / 10);
          return v === 0 ? l : v <= s ? n[v - 1] === void 0 ? tf(c, 1) : n[v - 1] + tf(c, 1) : l;
        }
        f = n[h - 1];
    }
    return f === void 0 ? "" : f;
  });
}, yst = er, J1 = V, ul = A, mst = ol, bst = O, wst = U, Sst = tt, xst = Dt, Est = ft, Tst = zt, cn = W, Ist = ut, Ost = sl, Ast = Cr, Rst = _O, _st = Ki, Cst = X, lv = Cst("replace"), Pst = Math.max, Mst = Math.min, Nst = ul([].concat), ef = ul([].push), Z1 = ul("".indexOf), Q1 = ul("".slice), Dst = function(t) {
  return t === void 0 ? t : String(t);
}, Lst = function() {
  return "a".replace(/./, "$0") === "$0";
}(), tb = function() {
  return /./[lv] ? /./[lv]("a", "$0") === "" : !1;
}(), Fst = !bst(function() {
  var t = /./;
  return t.exec = function() {
    var r = [];
    return r.groups = { a: "7" }, r;
  }, "".replace(t, "$<a>") !== "7";
});
mst("replace", function(t, r, e) {
  var n = tb ? "$" : "$0";
  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function(i, o) {
      var s = Ist(this), u = xst(i) ? void 0 : Ast(i, lv);
      return u ? J1(u, i, s, o) : J1(r, cn(s), i, o);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function(a, i) {
      var o = wst(this), s = cn(a);
      if (typeof i == "string" && Z1(i, n) === -1 && Z1(i, "$<") === -1) {
        var u = e(r, o, s, i);
        if (u.done)
          return u.value;
      }
      var l = Sst(i);
      l || (i = cn(i));
      var c = o.global, f;
      c && (f = o.unicode, o.lastIndex = 0);
      for (var h = [], v; v = _st(o, s), !(v === null || (ef(h, v), !c)); ) {
        var d = cn(v[0]);
        d === "" && (o.lastIndex = Ost(s, Tst(o.lastIndex), f));
      }
      for (var $ = "", y = 0, p = 0; p < h.length; p++) {
        v = h[p];
        for (var b = cn(v[0]), I = Pst(Mst(Est(v.index), s.length), 0), _ = [], M, B = 1; B < v.length; B++)
          ef(_, Dst(v[B]));
        var H = v.groups;
        if (l) {
          var q = Nst([b], _, I, s);
          H !== void 0 && ef(q, H), M = cn(yst(i, void 0, q));
        } else
          M = Rst(b, s, I, _, H, i);
        I >= y && ($ += Q1(s, y, I) + M, y = I + b.length);
      }
      return $ + Q1(s, y);
    }
  ];
}, !Fst || !Lst || tb);
var kst = g, Bst = V, vg = A, rb = ut, jst = tt, Ust = Dt, zst = el, Ma = W, Vst = Cr, Hst = Gi, Gst = _O, Wst = X, qst = Wst("replace"), Yst = TypeError, nf = vg("".indexOf);
vg("".replace);
var eb = vg("".slice), Kst = Math.max;
kst({ target: "String", proto: !0 }, {
  replaceAll: function(r, e) {
    var n = rb(this), a, i, o, s, u, l, c, f, h, v, d = 0, $ = "";
    if (!Ust(r)) {
      if (a = zst(r), a && (i = Ma(rb(Hst(r))), !~nf(i, "g")))
        throw new Yst("`.replaceAll` does not allow non-global regexes");
      if (o = Vst(r, qst), o)
        return Bst(o, r, n, e);
    }
    for (s = Ma(n), u = Ma(r), l = jst(e), l || (e = Ma(e)), c = u.length, f = Kst(1, c), h = nf(s, u); h !== -1; )
      v = l ? Ma(e(u, h, s)) : Gst(u, s, h, [], void 0, e), $ += eb(s, d, h) + v, d = h + c, h = h + f > s.length ? -1 : nf(s, u, h + f);
    return d < s.length && ($ += eb(s, d)), $;
  }
});
var Xst = V, Jst = ol, Zst = U, Qst = Dt, tut = ut, nb = yI, ab = W, rut = Cr, eut = Ki;
Jst("search", function(t, r, e) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function(a) {
      var i = tut(this), o = Qst(a) ? void 0 : rut(a, t);
      return o ? Xst(o, a, i) : new RegExp(a)[t](ab(i));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function(n) {
      var a = Zst(this), i = ab(n), o = e(r, a, i);
      if (o.done)
        return o.value;
      var s = a.lastIndex;
      nb(s, 0) || (a.lastIndex = 0);
      var u = eut(a, i);
      return nb(a.lastIndex, s) || (a.lastIndex = s), u === null ? -1 : u.index;
    }
  ];
});
var af = V, CO = A, nut = ol, aut = U, iut = Dt, out = ut, sut = Zu, uut = sl, lut = zt, ib = W, cut = Cr, ob = Ki, fut = nl, hut = O, fn = fut.UNSUPPORTED_Y, vut = 4294967295, dut = Math.min, of = CO([].push), sf = CO("".slice), gut = !hut(function() {
  var t = /(?:)/, r = t.exec;
  t.exec = function() {
    return r.apply(this, arguments);
  };
  var e = "ab".split(t);
  return e.length !== 2 || e[0] !== "a" || e[1] !== "b";
}), sb = "abbc".split(/(b)*/)[1] === "c" || // eslint-disable-next-line regexp/no-empty-group -- required for testing
"test".split(/(?:)/, -1).length !== 4 || "ab".split(/(?:ab)*/).length !== 2 || ".".split(/(.?)(.?)/).length !== 4 || // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
".".split(/()()/).length > 1 || "".split(/.?/).length;
nut("split", function(t, r, e) {
  var n = "0".split(void 0, 0).length ? function(a, i) {
    return a === void 0 && i === 0 ? [] : af(r, this, a, i);
  } : r;
  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function(i, o) {
      var s = out(this), u = iut(i) ? void 0 : cut(i, t);
      return u ? af(u, i, s, o) : af(n, ib(s), i, o);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function(a, i) {
      var o = aut(this), s = ib(a);
      if (!sb) {
        var u = e(n, o, s, i, n !== r);
        if (u.done)
          return u.value;
      }
      var l = sut(o, RegExp), c = o.unicode, f = (o.ignoreCase ? "i" : "") + (o.multiline ? "m" : "") + (o.unicode ? "u" : "") + (fn ? "g" : "y"), h = new l(fn ? "^(?:" + o.source + ")" : o, f), v = i === void 0 ? vut : i >>> 0;
      if (v === 0)
        return [];
      if (s.length === 0)
        return ob(h, s) === null ? [s] : [];
      for (var d = 0, $ = 0, y = []; $ < s.length; ) {
        h.lastIndex = fn ? 0 : $;
        var p = ob(h, fn ? sf(s, $) : s), b;
        if (p === null || (b = dut(lut(h.lastIndex + (fn ? $ : 0)), s.length)) === d)
          $ = uut(s, $, c);
        else {
          if (of(y, sf(s, d, $)), y.length === v)
            return y;
          for (var I = 1; I <= p.length - 1; I++)
            if (of(y, p[I]), y.length === v)
              return y;
          $ = d = b;
        }
      }
      return of(y, sf(s, d)), y;
    }
  ];
}, sb || !gut, fn);
var put = g, $ut = qe, yut = xt.f, mut = zt, ub = W, but = cg, wut = ut, Sut = fg, xut = $ut("".slice), Eut = Math.min, PO = Sut("startsWith"), Tut = !PO && !!function() {
  var t = yut(String.prototype, "startsWith");
  return t && !t.writable;
}();
put({ target: "String", proto: !0, forced: !Tut && !PO }, {
  startsWith: function(r) {
    var e = ub(wut(this));
    but(r);
    var n = mut(Eut(arguments.length > 1 ? arguments[1] : void 0, e.length)), a = ub(r);
    return xut(e, n, n + a.length) === a;
  }
});
var Iut = g, Out = A, Aut = ut, lb = ft, Rut = W, _ut = Out("".slice), Cut = Math.max, Put = Math.min, Mut = !"".substr || "ab".substr(-1) !== "b";
Iut({ target: "String", proto: !0, forced: Mut }, {
  substr: function(r, e) {
    var n = Rut(Aut(this)), a = n.length, i = lb(r), o, s;
    return i === 1 / 0 && (i = 0), i < 0 && (i = Cut(a + i, 0)), o = e === void 0 ? a : lb(e), o <= 0 || o === 1 / 0 ? "" : (s = Put(i + o, a), i >= s ? "" : _ut(n, i, s));
  }
});
var Nut = g, MO = V, dg = A, Dut = ut, Lut = W, Fut = O, kut = Array, uf = dg("".charAt), cb = dg("".charCodeAt), But = dg([].join), cv = "".toWellFormed, jut = "�", fb = cv && Fut(function() {
  return MO(cv, 1) !== "1";
});
Nut({ target: "String", proto: !0, forced: fb }, {
  toWellFormed: function() {
    var r = Lut(Dut(this));
    if (fb)
      return MO(cv, r);
    for (var e = r.length, n = kut(e), a = 0; a < e; a++) {
      var i = cb(r, a);
      (i & 63488) !== 55296 ? n[a] = uf(r, a) : i >= 56320 || a + 1 >= e || (cb(r, a + 1) & 64512) !== 56320 ? n[a] = jut : (n[a] = uf(r, a), n[++a] = uf(r, a));
    }
    return But(n, "");
  }
});
var Uut = aa.PROPER, zut = O, hb = zi, vb = "​᠎", gg = function(t) {
  return zut(function() {
    return !!hb[t]() || vb[t]() !== vb || Uut && hb[t].name !== t;
  });
}, Vut = g, Hut = ga.trim, Gut = gg;
Vut({ target: "String", proto: !0, forced: Gut("trim") }, {
  trim: function() {
    return Hut(this);
  }
});
var Wut = ga.end, qut = gg, NO = qut("trimEnd") ? function() {
  return Wut(this);
} : "".trimEnd, Yut = g, db = NO;
Yut({ target: "String", proto: !0, name: "trimEnd", forced: "".trimRight !== db }, {
  trimRight: db
});
var Kut = g, gb = NO;
Kut({ target: "String", proto: !0, name: "trimEnd", forced: "".trimEnd !== gb }, {
  trimEnd: gb
});
var Xut = ga.start, Jut = gg, DO = Jut("trimStart") ? function() {
  return Xut(this);
} : "".trimStart, Zut = g, pb = DO;
Zut({ target: "String", proto: !0, name: "trimStart", forced: "".trimLeft !== pb }, {
  trimLeft: pb
});
var Qut = g, $b = DO;
Qut({ target: "String", proto: !0, name: "trimStart", forced: "".trimStart !== $b }, {
  trimStart: $b
});
var tlt = A, rlt = ut, yb = W, elt = /"/g, nlt = tlt("".replace), Wt = function(t, r, e, n) {
  var a = yb(rlt(t)), i = "<" + r;
  return e !== "" && (i += " " + e + '="' + nlt(yb(n), elt, "&quot;") + '"'), i + ">" + a + "</" + r + ">";
}, alt = O, qt = function(t) {
  return alt(function() {
    var r = ""[t]('"');
    return r !== r.toLowerCase() || r.split('"').length > 3;
  });
}, ilt = g, olt = Wt, slt = qt;
ilt({ target: "String", proto: !0, forced: slt("anchor") }, {
  anchor: function(r) {
    return olt(this, "a", "name", r);
  }
});
var ult = g, llt = Wt, clt = qt;
ult({ target: "String", proto: !0, forced: clt("big") }, {
  big: function() {
    return llt(this, "big", "", "");
  }
});
var flt = g, hlt = Wt, vlt = qt;
flt({ target: "String", proto: !0, forced: vlt("blink") }, {
  blink: function() {
    return hlt(this, "blink", "", "");
  }
});
var dlt = g, glt = Wt, plt = qt;
dlt({ target: "String", proto: !0, forced: plt("bold") }, {
  bold: function() {
    return glt(this, "b", "", "");
  }
});
var $lt = g, ylt = Wt, mlt = qt;
$lt({ target: "String", proto: !0, forced: mlt("fixed") }, {
  fixed: function() {
    return ylt(this, "tt", "", "");
  }
});
var blt = g, wlt = Wt, Slt = qt;
blt({ target: "String", proto: !0, forced: Slt("fontcolor") }, {
  fontcolor: function(r) {
    return wlt(this, "font", "color", r);
  }
});
var xlt = g, Elt = Wt, Tlt = qt;
xlt({ target: "String", proto: !0, forced: Tlt("fontsize") }, {
  fontsize: function(r) {
    return Elt(this, "font", "size", r);
  }
});
var Ilt = g, Olt = Wt, Alt = qt;
Ilt({ target: "String", proto: !0, forced: Alt("italics") }, {
  italics: function() {
    return Olt(this, "i", "", "");
  }
});
var Rlt = g, _lt = Wt, Clt = qt;
Rlt({ target: "String", proto: !0, forced: Clt("link") }, {
  link: function(r) {
    return _lt(this, "a", "href", r);
  }
});
var Plt = g, Mlt = Wt, Nlt = qt;
Plt({ target: "String", proto: !0, forced: Nlt("small") }, {
  small: function() {
    return Mlt(this, "small", "", "");
  }
});
var Dlt = g, Llt = Wt, Flt = qt;
Dlt({ target: "String", proto: !0, forced: Flt("strike") }, {
  strike: function() {
    return Llt(this, "strike", "", "");
  }
});
var klt = g, Blt = Wt, jlt = qt;
klt({ target: "String", proto: !0, forced: jlt("sub") }, {
  sub: function() {
    return Blt(this, "sub", "", "");
  }
});
var Ult = g, zlt = Wt, Vlt = qt;
Ult({ target: "String", proto: !0, forced: Vlt("sup") }, {
  sup: function() {
    return zlt(this, "sup", "", "");
  }
});
var fv = { exports: {} }, LO = D, lf = O, Hlt = Pu, Glt = J.NATIVE_ARRAY_BUFFER_VIEWS, Wlt = LO.ArrayBuffer, Ae = LO.Int8Array, pg = !Glt || !lf(function() {
  Ae(1);
}) || !lf(function() {
  new Ae(-1);
}) || !Hlt(function(t) {
  new Ae(), new Ae(null), new Ae(1.5), new Ae(t);
}, !0) || lf(function() {
  return new Ae(new Wlt(2), 1, void 0).length !== 1;
}), qlt = Nd, Ylt = RangeError, FO = function(t, r) {
  var e = qlt(t);
  if (e % r)
    throw new Ylt("Wrong offset");
  return e;
}, Klt = Math.round, Xlt = function(t) {
  var r = Klt(t);
  return r < 0 ? 0 : r > 255 ? 255 : r & 255;
}, Jlt = gr, kO = function(t) {
  var r = Jlt(t);
  return r === "BigInt64Array" || r === "BigUint64Array";
}, Zlt = yu, Qlt = TypeError, $g = function(t) {
  var r = Zlt(t, "number");
  if (typeof r == "number")
    throw new Qlt("Can't convert number to bigint");
  return BigInt(r);
}, tct = pr, rct = V, ect = Gd, nct = at, act = st, ict = Ru, oct = oa, sct = id, uct = kO, lct = J.aTypedArrayConstructor, cct = $g, BO = function(r) {
  var e = ect(this), n = nct(r), a = arguments.length, i = a > 1 ? arguments[1] : void 0, o = i !== void 0, s = oct(n), u, l, c, f, h, v, d, $;
  if (s && !sct(s))
    for (d = ict(n, s), $ = d.next, n = []; !(v = rct($, d)).done; )
      n.push(v.value);
  for (o && a > 2 && (i = tct(i, arguments[2])), l = act(n), c = new (lct(e))(l), f = uct(c), u = 0; l > u; u++)
    h = o ? i(n[u], u) : n[u], c[u] = f ? cct(h) : +h;
  return c;
}, mb = g, jO = D, bb = V, fct = z, hct = pg, Xi = J, UO = ju, wb = $r, vct = tr, Na = Tt, dct = zd, gct = zt, Sb = Fu, cf = FO, pct = Xlt, zO = $e, Da = rt, $ct = gr, hv = K, yct = Ge, mct = Vt, bct = Lt, ko = Pr, wct = ye.f, xb = BO, Sct = bt.forEach, xct = ca, Ect = vt, VO = lt, HO = xt, Eb = Du, yg = ht, Tct = Ye, vv = yg.get, Ict = yg.set, Oct = yg.enforce, GO = VO.f, Act = HO.f, ff = jO.RangeError, WO = UO.ArrayBuffer, Rct = WO.prototype, _ct = UO.DataView, Bo = Xi.NATIVE_ARRAY_BUFFER_VIEWS, Tb = Xi.TYPED_ARRAY_TAG, Ib = Xi.TypedArray, La = Xi.TypedArrayPrototype, dv = Xi.isTypedArray, jo = "BYTES_PER_ELEMENT", hf = "Wrong length", Uo = function(t, r) {
  Ect(t, r, {
    configurable: !0,
    get: function() {
      return vv(this)[r];
    }
  });
}, Ob = function(t) {
  var r;
  return bct(Rct, t) || (r = $ct(t)) === "ArrayBuffer" || r === "SharedArrayBuffer";
}, qO = function(t, r) {
  return dv(t) && !yct(r) && r in t && dct(+r) && r >= 0;
}, Ab = function(r, e) {
  return e = zO(e), qO(r, e) ? vct(2, r[e]) : Act(r, e);
}, Rb = function(r, e, n) {
  return e = zO(e), qO(r, e) && hv(n) && Da(n, "value") && !Da(n, "get") && !Da(n, "set") && !n.configurable && (!Da(n, "writable") || n.writable) && (!Da(n, "enumerable") || n.enumerable) ? (r[e] = n.value, r) : GO(r, e, n);
};
fct ? (Bo || (HO.f = Ab, VO.f = Rb, Uo(La, "buffer"), Uo(La, "byteOffset"), Uo(La, "byteLength"), Uo(La, "length")), mb({ target: "Object", stat: !0, forced: !Bo }, {
  getOwnPropertyDescriptor: Ab,
  defineProperty: Rb
}), fv.exports = function(t, r, e) {
  var n = t.match(/\d+/)[0] / 8, a = t + (e ? "Clamped" : "") + "Array", i = "get" + t, o = "set" + t, s = jO[a], u = s, l = u && u.prototype, c = {}, f = function($, y) {
    var p = vv($);
    return p.view[i](y * n + p.byteOffset, !0);
  }, h = function($, y, p) {
    var b = vv($);
    b.view[o](y * n + b.byteOffset, e ? pct(p) : p, !0);
  }, v = function($, y) {
    GO($, y, {
      get: function() {
        return f(this, y);
      },
      set: function(p) {
        return h(this, y, p);
      },
      enumerable: !0
    });
  };
  Bo ? hct && (u = r(function($, y, p, b) {
    return wb($, l), Tct(function() {
      return hv(y) ? Ob(y) ? b !== void 0 ? new s(y, cf(p, n), b) : p !== void 0 ? new s(y, cf(p, n)) : new s(y) : dv(y) ? Eb(u, y) : bb(xb, u, y) : new s(Sb(y));
    }(), $, u);
  }), ko && ko(u, Ib), Sct(wct(s), function($) {
    $ in u || Na(u, $, s[$]);
  }), u.prototype = l) : (u = r(function($, y, p, b) {
    wb($, l);
    var I = 0, _ = 0, M, B, H;
    if (!hv(y))
      H = Sb(y), B = H * n, M = new WO(B);
    else if (Ob(y)) {
      M = y, _ = cf(p, n);
      var q = y.byteLength;
      if (b === void 0) {
        if (q % n)
          throw new ff(hf);
        if (B = q - _, B < 0)
          throw new ff(hf);
      } else if (B = gct(b) * n, B + _ > q)
        throw new ff(hf);
      H = B / n;
    } else
      return dv(y) ? Eb(u, y) : bb(xb, u, y);
    for (Ict($, {
      buffer: M,
      byteOffset: _,
      byteLength: B,
      length: H,
      view: new _ct(M)
    }); I < H; )
      v($, I++);
  }), ko && ko(u, Ib), l = u.prototype = mct(La)), l.constructor !== u && Na(l, "constructor", u), Oct(l).TypedArrayConstructor = u, Tb && Na(l, Tb, a);
  var d = u !== s;
  c[a] = u, mb({ global: !0, constructor: !0, forced: d, sham: !Bo }, c), jo in u || Na(u, jo, n), jo in l || Na(l, jo, n), xct(a);
}) : fv.exports = function() {
};
var re = fv.exports, Cct = re;
Cct("Float32", function(t) {
  return function(e, n, a) {
    return t(this, e, n, a);
  };
});
var Pct = re;
Pct("Float64", function(t) {
  return function(e, n, a) {
    return t(this, e, n, a);
  };
});
var Mct = re;
Mct("Int8", function(t) {
  return function(e, n, a) {
    return t(this, e, n, a);
  };
});
var Nct = re;
Nct("Int16", function(t) {
  return function(e, n, a) {
    return t(this, e, n, a);
  };
});
var Dct = re;
Dct("Int32", function(t) {
  return function(e, n, a) {
    return t(this, e, n, a);
  };
});
var Lct = re;
Lct("Uint8", function(t) {
  return function(e, n, a) {
    return t(this, e, n, a);
  };
});
var Fct = re;
Fct("Uint8", function(t) {
  return function(e, n, a) {
    return t(this, e, n, a);
  };
}, !0);
var kct = re;
kct("Uint16", function(t) {
  return function(e, n, a) {
    return t(this, e, n, a);
  };
});
var Bct = re;
Bct("Uint32", function(t) {
  return function(e, n, a) {
    return t(this, e, n, a);
  };
});
var YO = J, jct = st, Uct = ft, zct = YO.aTypedArray, Vct = YO.exportTypedArrayMethod;
Vct("at", function(r) {
  var e = zct(this), n = jct(e), a = Uct(r), i = a >= 0 ? a : n + a;
  return i < 0 || i >= n ? void 0 : e[i];
});
var Hct = A, KO = J, Gct = $E, Wct = Hct(Gct), qct = KO.aTypedArray, Yct = KO.exportTypedArrayMethod;
Yct("copyWithin", function(r, e) {
  return Wct(qct(this), r, e, arguments.length > 2 ? arguments[2] : void 0);
});
var XO = J, Kct = bt.every, Xct = XO.aTypedArray, Jct = XO.exportTypedArrayMethod;
Jct("every", function(r) {
  return Kct(Xct(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var JO = J, Zct = sd, Qct = $g, tft = gr, rft = V, eft = A, nft = O, aft = JO.aTypedArray, ift = JO.exportTypedArrayMethod, oft = eft("".slice), sft = nft(function() {
  var t = 0;
  return new Int8Array(2).fill({ valueOf: function() {
    return t++;
  } }), t !== 1;
});
ift("fill", function(r) {
  var e = arguments.length;
  aft(this);
  var n = oft(tft(this), 0, 3) === "Big" ? Qct(r) : +r;
  return rft(Zct, this, n, e > 1 ? arguments[1] : void 0, e > 2 ? arguments[2] : void 0);
}, sft);
var uft = Du, lft = J.getTypedArrayConstructor, cft = function(t, r) {
  return uft(lft(t), r);
}, ZO = J, fft = bt.filter, hft = cft, vft = ZO.aTypedArray, dft = ZO.exportTypedArrayMethod;
dft("filter", function(r) {
  var e = fft(vft(this), r, arguments.length > 1 ? arguments[1] : void 0);
  return hft(this, e);
});
var QO = J, gft = bt.find, pft = QO.aTypedArray, $ft = QO.exportTypedArrayMethod;
$ft("find", function(r) {
  return gft(pft(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var tA = J, yft = bt.findIndex, mft = tA.aTypedArray, bft = tA.exportTypedArrayMethod;
bft("findIndex", function(r) {
  return yft(mft(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var rA = J, wft = Cu.findLast, Sft = rA.aTypedArray, xft = rA.exportTypedArrayMethod;
xft("findLast", function(r) {
  return wft(Sft(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var eA = J, Eft = Cu.findLastIndex, Tft = eA.aTypedArray, Ift = eA.exportTypedArrayMethod;
Ift("findLastIndex", function(r) {
  return Eft(Tft(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var nA = J, Oft = bt.forEach, Aft = nA.aTypedArray, Rft = nA.exportTypedArrayMethod;
Rft("forEach", function(r) {
  Oft(Aft(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var _ft = pg, Cft = J.exportTypedArrayStaticMethod, Pft = BO;
Cft("from", Pft, _ft);
var aA = J, Mft = Oi.includes, Nft = aA.aTypedArray, Dft = aA.exportTypedArrayMethod;
Dft("includes", function(r) {
  return Mft(Nft(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var iA = J, Lft = Oi.indexOf, Fft = iA.aTypedArray, kft = iA.exportTypedArrayMethod;
kft("indexOf", function(r) {
  return Lft(Fft(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var Bft = D, jft = O, mg = A, oA = J, bg = PE, Uft = X, wg = Uft("iterator"), _b = Bft.Uint8Array, zft = mg(bg.values), Vft = mg(bg.keys), Hft = mg(bg.entries), Sg = oA.aTypedArray, ll = oA.exportTypedArrayMethod, $n = _b && _b.prototype, cl = !jft(function() {
  $n[wg].call([1]);
}), sA = !!$n && $n.values && $n[wg] === $n.values && $n.values.name === "values", uA = function() {
  return zft(Sg(this));
};
ll("entries", function() {
  return Hft(Sg(this));
}, cl);
ll("keys", function() {
  return Vft(Sg(this));
}, cl);
ll("values", uA, cl || !sA, { name: "values" });
ll(wg, uA, cl || !sA, { name: "values" });
var lA = J, Gft = A, Wft = lA.aTypedArray, qft = lA.exportTypedArrayMethod, Yft = Gft([].join);
qft("join", function(r) {
  return Yft(Wft(this), r);
});
var cA = J, Kft = er, Xft = NE, Jft = cA.aTypedArray, Zft = cA.exportTypedArrayMethod;
Zft("lastIndexOf", function(r) {
  var e = arguments.length;
  return Kft(Xft, Jft(this), e > 1 ? [r, arguments[1]] : [r]);
});
var xg = J, Qft = bt.map, tht = xg.aTypedArray, rht = xg.getTypedArrayConstructor, eht = xg.exportTypedArrayMethod;
eht("map", function(r) {
  return Qft(tht(this), r, arguments.length > 1 ? arguments[1] : void 0, function(e, n) {
    return new (rht(e))(n);
  });
});
var fA = J, nht = pg, aht = fA.aTypedArrayConstructor, iht = fA.exportTypedArrayStaticMethod;
iht("of", function() {
  for (var r = 0, e = arguments.length, n = new (aht(this))(e); e > r; )
    n[r] = arguments[r++];
  return n;
}, nht);
var hA = J, oht = Mu.left, sht = hA.aTypedArray, uht = hA.exportTypedArrayMethod;
uht("reduce", function(r) {
  var e = arguments.length;
  return oht(sht(this), r, e, e > 1 ? arguments[1] : void 0);
});
var vA = J, lht = Mu.right, cht = vA.aTypedArray, fht = vA.exportTypedArrayMethod;
fht("reduceRight", function(r) {
  var e = arguments.length;
  return lht(cht(this), r, e, e > 1 ? arguments[1] : void 0);
});
var dA = J, hht = dA.aTypedArray, vht = dA.exportTypedArrayMethod, dht = Math.floor;
vht("reverse", function() {
  for (var r = this, e = hht(r).length, n = dht(e / 2), a = 0, i; a < n; )
    i = r[a], r[a++] = r[--e], r[e] = i;
  return r;
});
var gA = D, pA = V, Eg = J, ght = st, pht = FO, $ht = at, $A = O, yht = gA.RangeError, gv = gA.Int8Array, Cb = gv && gv.prototype, yA = Cb && Cb.set, mht = Eg.aTypedArray, bht = Eg.exportTypedArrayMethod, pv = !$A(function() {
  var t = new Uint8ClampedArray(2);
  return pA(yA, t, { length: 1, 0: 3 }, 1), t[1] !== 3;
}), wht = pv && Eg.NATIVE_ARRAY_BUFFER_VIEWS && $A(function() {
  var t = new gv(2);
  return t.set(1), t.set("2", 1), t[0] !== 0 || t[1] !== 2;
});
bht("set", function(r) {
  mht(this);
  var e = pht(arguments.length > 1 ? arguments[1] : void 0, 1), n = $ht(r);
  if (pv)
    return pA(yA, this, n, e);
  var a = this.length, i = ght(n), o = 0;
  if (i + e > a)
    throw new yht("Wrong length");
  for (; o < i; )
    this[e + o] = n[o++];
}, !pv || wht);
var Tg = J, Sht = O, xht = rr, Eht = Tg.aTypedArray, Tht = Tg.getTypedArrayConstructor, Iht = Tg.exportTypedArrayMethod, Oht = Sht(function() {
  new Int8Array(1).slice();
});
Iht("slice", function(r, e) {
  for (var n = xht(Eht(this), r, e), a = Tht(this), i = 0, o = n.length, s = new a(o); o > i; )
    s[i] = n[i++];
  return s;
}, Oht);
var mA = J, Aht = bt.some, Rht = mA.aTypedArray, _ht = mA.exportTypedArrayMethod;
_ht("some", function(r) {
  return Aht(Rht(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var Cht = D, Pht = qe, $v = O, Mht = et, Nht = vd, bA = J, Pb = LE, Dht = FE, Mb = Kr, Nb = dd, Lht = bA.aTypedArray, Fht = bA.exportTypedArrayMethod, pi = Cht.Uint16Array, Ln = pi && Pht(pi.prototype.sort), kht = !!Ln && !($v(function() {
  Ln(new pi(2), null);
}) && $v(function() {
  Ln(new pi(2), {});
})), Db = !!Ln && !$v(function() {
  if (Mb)
    return Mb < 74;
  if (Pb)
    return Pb < 67;
  if (Dht)
    return !0;
  if (Nb)
    return Nb < 602;
  var t = new pi(516), r = Array(516), e, n;
  for (e = 0; e < 516; e++)
    n = e % 4, t[e] = 515 - e, r[e] = e - 2 * n + 3;
  for (Ln(t, function(a, i) {
    return (a / 4 | 0) - (i / 4 | 0);
  }), e = 0; e < 516; e++)
    if (t[e] !== r[e])
      return !0;
}), Bht = function(t) {
  return function(r, e) {
    return t !== void 0 ? +t(r, e) || 0 : e !== e ? -1 : r !== r ? 1 : r === 0 && e === 0 ? 1 / r > 0 && 1 / e < 0 ? 1 : -1 : r > e;
  };
};
Fht("sort", function(r) {
  return r !== void 0 && Mht(r), Db ? Ln(this, r) : Nht(Lht(this), Bht(r));
}, !Db || kht);
var Ig = J, jht = zt, Lb = Jr, Uht = Ig.aTypedArray, zht = Ig.getTypedArrayConstructor, Vht = Ig.exportTypedArrayMethod;
Vht("subarray", function(r, e) {
  var n = Uht(this), a = n.length, i = Lb(r, a), o = zht(n);
  return new o(
    n.buffer,
    n.byteOffset + i * n.BYTES_PER_ELEMENT,
    jht((e === void 0 ? a : Lb(e, a)) - i)
  );
});
var Hht = D, Ght = er, wA = J, yv = O, Fb = rr, tu = Hht.Int8Array, kb = wA.aTypedArray, Wht = wA.exportTypedArrayMethod, SA = [].toLocaleString, qht = !!tu && yv(function() {
  SA.call(new tu(1));
}), Yht = yv(function() {
  return [1, 2].toLocaleString() !== new tu([1, 2]).toLocaleString();
}) || !yv(function() {
  tu.prototype.toLocaleString.call([1, 2]);
});
Wht("toLocaleString", function() {
  return Ght(
    SA,
    qht ? Fb(kb(this)) : kb(this),
    Fb(arguments)
  );
}, Yht);
var Kht = jE, Og = J, Xht = Og.aTypedArray, Jht = Og.exportTypedArrayMethod, Zht = Og.getTypedArrayConstructor;
Jht("toReversed", function() {
  return Kht(Xht(this), Zht(this));
});
var fl = J, Qht = A, tvt = et, rvt = Du, evt = fl.aTypedArray, nvt = fl.getTypedArrayConstructor, avt = fl.exportTypedArrayMethod, ivt = Qht(fl.TypedArrayPrototype.sort);
avt("toSorted", function(r) {
  r !== void 0 && tvt(r);
  var e = evt(this), n = rvt(nvt(e), e);
  return ivt(n, r);
});
var ovt = J.exportTypedArrayMethod, svt = O, uvt = D, lvt = A, Bb = uvt.Uint8Array, cvt = Bb && Bb.prototype || {}, ru = [].toString, fvt = lvt([].join);
svt(function() {
  ru.call({});
}) && (ru = function() {
  return fvt(this);
});
var hvt = cvt.toString !== ru;
ovt("toString", ru, hvt);
var vvt = UE, Ag = J, dvt = kO, gvt = ft, pvt = $g, $vt = Ag.aTypedArray, yvt = Ag.getTypedArrayConstructor, mvt = Ag.exportTypedArrayMethod, bvt = !!function() {
  try {
    new Int8Array(1).with(2, { valueOf: function() {
      throw 8;
    } });
  } catch (t) {
    return t === 8;
  }
}();
mvt("with", function(t, r) {
  var e = $vt(this), n = gvt(t), a = dvt(e) ? pvt(r) : +r;
  return vvt(e, yvt(e), n, a);
}, !bvt);
var wvt = g, Rg = A, Svt = W, jb = String.fromCharCode, Ub = Rg("".charAt), zb = Rg(/./.exec), Vb = Rg("".slice), xvt = /^[\da-f]{2}$/i, Evt = /^[\da-f]{4}$/i;
wvt({ global: !0 }, {
  unescape: function(r) {
    for (var e = Svt(r), n = "", a = e.length, i = 0, o, s; i < a; ) {
      if (o = Ub(e, i++), o === "%") {
        if (Ub(e, i) === "u") {
          if (s = Vb(e, i + 1, i + 5), zb(Evt, s)) {
            n += jb(parseInt(s, 16)), i += 5;
            continue;
          }
        } else if (s = Vb(e, i, i + 2), zb(xvt, s)) {
          n += jb(parseInt(s, 16)), i += 2;
          continue;
        }
      }
      n += o;
    }
    return n;
  }
});
var Tvt = A, Hb = fa, zo = Je.getWeakData, Ivt = $r, Ovt = U, Avt = Dt, vf = K, Rvt = $t, xA = bt, Gb = rt, EA = ht, _vt = EA.set, Cvt = EA.getterFor, Pvt = xA.find, Mvt = xA.findIndex, Nvt = Tvt([].splice), Dvt = 0, Vo = function(t) {
  return t.frozen || (t.frozen = new TA());
}, TA = function() {
  this.entries = [];
}, df = function(t, r) {
  return Pvt(t.entries, function(e) {
    return e[0] === r;
  });
};
TA.prototype = {
  get: function(t) {
    var r = df(this, t);
    if (r)
      return r[1];
  },
  has: function(t) {
    return !!df(this, t);
  },
  set: function(t, r) {
    var e = df(this, t);
    e ? e[1] = r : this.entries.push([t, r]);
  },
  delete: function(t) {
    var r = Mvt(this.entries, function(e) {
      return e[0] === t;
    });
    return ~r && Nvt(this.entries, r, 1), !!~r;
  }
};
var IA = {
  getConstructor: function(t, r, e, n) {
    var a = t(function(u, l) {
      Ivt(u, i), _vt(u, {
        type: r,
        id: Dvt++,
        frozen: null
      }), Avt(l) || Rvt(l, u[n], { that: u, AS_ENTRIES: e });
    }), i = a.prototype, o = Cvt(r), s = function(u, l, c) {
      var f = o(u), h = zo(Ovt(l), !0);
      return h === !0 ? Vo(f).set(l, c) : h[f.id] = c, u;
    };
    return Hb(i, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      delete: function(u) {
        var l = o(this);
        if (!vf(u))
          return !1;
        var c = zo(u);
        return c === !0 ? Vo(l).delete(u) : c && Gb(c, l.id) && delete c[l.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function(l) {
        var c = o(this);
        if (!vf(l))
          return !1;
        var f = zo(l);
        return f === !0 ? Vo(c).has(l) : f && Gb(f, c.id);
      }
    }), Hb(i, e ? {
      // `WeakMap.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
      get: function(l) {
        var c = o(this);
        if (vf(l)) {
          var f = zo(l);
          if (f === !0)
            return Vo(c).get(l);
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
}, Lvt = da, Wb = D, ds = A, qb = fa, Fvt = Je, kvt = Gu, OA = IA, Ho = K, Go = ht.enforce, Bvt = O, jvt = yx, Ji = Object, Uvt = Array.isArray, Wo = Ji.isExtensible, AA = Ji.isFrozen, zvt = Ji.isSealed, RA = Ji.freeze, Vvt = Ji.seal, Hvt = !Wb.ActiveXObject && "ActiveXObject" in Wb, Fa, _A = function(t) {
  return function() {
    return t(this, arguments.length ? arguments[0] : void 0);
  };
}, CA = kvt("WeakMap", _A, OA), yn = CA.prototype, gs = ds(yn.set), Gvt = function() {
  return Lvt && Bvt(function() {
    var t = RA([]);
    return gs(new CA(), t, 1), !AA(t);
  });
};
if (jvt)
  if (Hvt) {
    Fa = OA.getConstructor(_A, "WeakMap", !0), Fvt.enable();
    var Yb = ds(yn.delete), qo = ds(yn.has), Kb = ds(yn.get);
    qb(yn, {
      delete: function(t) {
        if (Ho(t) && !Wo(t)) {
          var r = Go(this);
          return r.frozen || (r.frozen = new Fa()), Yb(this, t) || r.frozen.delete(t);
        }
        return Yb(this, t);
      },
      has: function(r) {
        if (Ho(r) && !Wo(r)) {
          var e = Go(this);
          return e.frozen || (e.frozen = new Fa()), qo(this, r) || e.frozen.has(r);
        }
        return qo(this, r);
      },
      get: function(r) {
        if (Ho(r) && !Wo(r)) {
          var e = Go(this);
          return e.frozen || (e.frozen = new Fa()), qo(this, r) ? Kb(this, r) : e.frozen.get(r);
        }
        return Kb(this, r);
      },
      set: function(r, e) {
        if (Ho(r) && !Wo(r)) {
          var n = Go(this);
          n.frozen || (n.frozen = new Fa()), qo(this, r) ? gs(this, r, e) : n.frozen.set(r, e);
        } else
          gs(this, r, e);
        return this;
      }
    });
  } else
    Gvt() && qb(yn, {
      set: function(r, e) {
        var n;
        return Uvt(r) && (AA(r) ? n = RA : zvt(r) && (n = Vvt)), gs(this, r, e), n && n(r), this;
      }
    });
var Wvt = Gu, qvt = IA;
Wvt("WeakSet", function(t) {
  return function() {
    return t(this, arguments.length ? arguments[0] : void 0);
  };
}, qvt);
var PA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", Xb = PA + "+/", Jb = PA + "-_", Zb = function(t) {
  for (var r = {}, e = 0; e < 64; e++)
    r[t.charAt(e)] = e;
  return r;
}, MA = {
  i2c: Xb,
  c2i: Zb(Xb),
  i2cUrl: Jb,
  c2iUrl: Zb(Jb)
}, Yvt = g, Kvt = D, NA = ot, _g = A, Xvt = V, hl = O, Jvt = W, Zvt = nr, Qb = MA.c2i, DA = /[^\d+/a-z]/i, Qvt = /[\t\n\f\r ]+/g, tdt = /[=]{1,2}$/, ze = NA("atob"), rdt = String.fromCharCode, edt = _g("".charAt), tw = _g("".replace), ndt = _g(DA.exec), ya = !!ze && !hl(function() {
  return ze("aGk=") !== "hi";
}), LA = ya && hl(function() {
  return ze(" ") !== "";
}), FA = ya && !hl(function() {
  ze("a");
}), adt = ya && !hl(function() {
  ze();
}), idt = ya && ze.length !== 1, odt = !ya || LA || FA || adt || idt;
Yvt({ global: !0, bind: !0, enumerable: !0, forced: odt }, {
  atob: function(r) {
    if (Zvt(arguments.length, 1), ya && !LA && !FA)
      return Xvt(ze, Kvt, r);
    var e = tw(Jvt(r), Qvt, ""), n = "", a = 0, i = 0, o, s, u;
    if (e.length % 4 === 0 && (e = tw(e, tdt, "")), o = e.length, o % 4 === 1 || ndt(DA, e))
      throw new (NA("DOMException"))("The string is not correctly encoded", "InvalidCharacterError");
    for (; a < o; )
      s = edt(e, a++), u = i % 4 ? u * 64 + Qb[s] : Qb[s], i++ % 4 && (n += rdt(255 & u >> (-2 * i & 6)));
    return n;
  }
});
var sdt = g, udt = D, kA = ot, BA = A, ldt = V, Cg = O, rw = W, cdt = nr, fdt = MA.i2c, Kn = kA("btoa"), ew = BA("".charAt), hdt = BA("".charCodeAt), $i = !!Kn && !Cg(function() {
  return Kn("hi") !== "aGk=";
}), vdt = $i && !Cg(function() {
  Kn();
}), ddt = $i && Cg(function() {
  return Kn(null) !== "bnVsbA==";
}), gdt = $i && Kn.length !== 1;
sdt({ global: !0, bind: !0, enumerable: !0, forced: !$i || vdt || ddt || gdt }, {
  btoa: function(r) {
    if (cdt(arguments.length, 1), $i)
      return ldt(Kn, udt, rw(r));
    for (var e = rw(r), n = "", a = 0, i = fdt, o, s; ew(e, a) || (i = "=", a % 1); ) {
      if (s = hdt(e, a += 3 / 4), s > 255)
        throw new (kA("DOMException"))("The string contains characters outside of the Latin1 range", "InvalidCharacterError");
      o = o << 8 | s, n += ew(i, 63 & o >> 8 - a % 1 * 8);
    }
    return n;
  }
});
var jA = {
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
}, pdt = mu, gf = pdt("span").classList, nw = gf && gf.constructor && gf.constructor.prototype, UA = nw === Object.prototype ? void 0 : nw, aw = D, iw = jA, $dt = UA, pf = SE, ydt = Tt, zA = function(t) {
  if (t && t.forEach !== pf)
    try {
      ydt(t, "forEach", pf);
    } catch {
      t.forEach = pf;
    }
};
for (var $f in iw)
  iw[$f] && zA(aw[$f] && aw[$f].prototype);
zA($dt);
var ow = D, VA = jA, mdt = UA, Ha = PE, sw = Tt, bdt = kt, wdt = X, yf = wdt("iterator"), mf = Ha.values, HA = function(t, r) {
  if (t) {
    if (t[yf] !== mf)
      try {
        sw(t, yf, mf);
      } catch {
        t[yf] = mf;
      }
    if (bdt(t, r, !0), VA[r]) {
      for (var e in Ha)
        if (t[e] !== Ha[e])
          try {
            sw(t, e, Ha[e]);
          } catch {
            t[e] = Ha[e];
          }
    }
  }
};
for (var bf in VA)
  HA(ow[bf] && ow[bf].prototype, bf);
HA(mdt, "DOMTokenList");
var GA = {
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
}, Sdt = g, eu = ot, xdt = cT, Pg = O, Edt = Vt, Mg = tr, nu = lt.f, Tdt = ct, ps = vt, $s = rt, Idt = $r, Odt = U, WA = dE, uw = Fi, Fn = GA, Adt = ed, qA = ht, Ng = z, Xn = "DOMException", mv = "DATA_CLONE_ERR", vl = eu("Error"), Yr = eu(Xn) || function() {
  try {
    var t = eu("MessageChannel") || xdt("worker_threads").MessageChannel;
    new t().port1.postMessage(/* @__PURE__ */ new WeakMap());
  } catch (r) {
    if (r.name === mv && r.code === 25)
      return r.constructor;
  }
}(), Rdt = Yr && Yr.prototype, YA = vl.prototype, _dt = qA.set, Cdt = qA.getterFor(Xn), Pdt = "stack" in new vl(Xn), KA = function(t) {
  return $s(Fn, t) && Fn[t].m ? Fn[t].c : 0;
}, Dg = function() {
  Idt(this, Qa);
  var r = arguments.length, e = uw(r < 1 ? void 0 : arguments[0]), n = uw(r < 2 ? void 0 : arguments[1], "Error"), a = KA(n);
  if (_dt(this, {
    type: Xn,
    name: n,
    message: e,
    code: a
  }), Ng || (this.name = n, this.message = e, this.code = a), Pdt) {
    var i = new vl(e);
    i.name = Xn, nu(this, "stack", Mg(1, Adt(i.stack, 1)));
  }
}, Qa = Dg.prototype = Edt(YA), XA = function(t) {
  return { enumerable: !0, configurable: !0, get: t };
}, wf = function(t) {
  return XA(function() {
    return Cdt(this)[t];
  });
};
Ng && (ps(Qa, "code", wf("code")), ps(Qa, "message", wf("message")), ps(Qa, "name", wf("name")));
nu(Qa, "constructor", Mg(1, Dg));
var dl = Pg(function() {
  return !(new Yr() instanceof vl);
}), Mdt = dl || Pg(function() {
  return YA.toString !== WA || String(new Yr(1, 2)) !== "2: 1";
}), Ndt = dl || Pg(function() {
  return new Yr(1, "DataCloneError").code !== 25;
});
dl || Yr[mv] !== 25 || Rdt[mv];
var lw = dl;
Sdt({ global: !0, constructor: !0, forced: lw }, {
  DOMException: lw ? Dg : Yr
});
var yi = eu(Xn), au = yi.prototype;
Mdt && Yr === yi && Tdt(au, "toString", WA);
Ndt && Ng && Yr === yi && ps(au, "code", XA(function() {
  return KA(Odt(this).name);
}));
for (var cw in Fn)
  if ($s(Fn, cw)) {
    var fw = Fn[cw], Yo = fw.s, hw = Mg(6, fw.c);
    $s(yi, Yo) || nu(yi, Yo, hw), $s(au, Yo) || nu(au, Yo, hw);
  }
var Ddt = g, Ldt = D, Lg = ot, bv = tr, wv = lt.f, vw = rt, Fdt = $r, kdt = Ye, dw = Fi, Sf = GA, Bdt = ed, jdt = z, Zi = "DOMException", JA = Lg("Error"), Qi = Lg(Zi), Fg = function() {
  Fdt(this, Udt);
  var r = arguments.length, e = dw(r < 1 ? void 0 : arguments[0]), n = dw(r < 2 ? void 0 : arguments[1], "Error"), a = new Qi(e, n), i = new JA(e);
  return i.name = Zi, wv(a, "stack", bv(1, Bdt(i.stack, 1))), kdt(a, this, Fg), a;
}, Udt = Fg.prototype = Qi.prototype, zdt = "stack" in new JA(Zi), Vdt = "stack" in new Qi(1, 2), xf = Qi && jdt && Object.getOwnPropertyDescriptor(Ldt, Zi), Hdt = !!xf && !(xf.writable && xf.configurable), gw = zdt && !Hdt && !Vdt;
Ddt({ global: !0, constructor: !0, forced: gw }, {
  // TODO: fix export logic
  DOMException: gw ? Fg : Qi
});
var Ga = Lg(Zi), pw = Ga.prototype;
if (pw.constructor !== Ga) {
  wv(pw, "constructor", bv(1, Ga));
  for (var $w in Sf)
    if (vw(Sf, $w)) {
      var yw = Sf[$w], mw = yw.s;
      vw(Ga, mw) || wv(Ga, mw, bv(6, yw.c));
    }
}
var Gdt = ot, Wdt = kt, bw = "DOMException";
Wdt(Gdt(bw), bw);
var qdt = g, Ydt = D, ww = Qu.clear;
qdt({ global: !0, bind: !0, enumerable: !0, forced: Ydt.clearImmediate !== ww }, {
  clearImmediate: ww
});
var ZA = D, Kdt = er, Xdt = tt, Jdt = Nu, Zdt = _r, Qdt = rr, tgt = nr, rgt = ZA.Function, egt = /MSIE .\./.test(Zdt) || Jdt === "BUN" && function() {
  var t = ZA.Bun.version.split(".");
  return t.length < 3 || t[0] === "0" && (t[1] < 3 || t[1] === "3" && t[2] === "0");
}(), kg = function(t, r) {
  var e = r ? 2 : 1;
  return egt ? function(n, a) {
    var i = tgt(arguments.length, 1) > e, o = Xdt(n) ? n : rgt(n), s = i ? Qdt(arguments, e) : [], u = i ? function() {
      Kdt(o, this, s);
    } : o;
    return r ? t(u, a) : t(u);
  } : t;
}, ngt = g, QA = D, Sw = Qu.set, agt = kg, xw = QA.setImmediate ? agt(Sw, !1) : Sw;
ngt({ global: !0, bind: !0, enumerable: !0, forced: QA.setImmediate !== xw }, {
  setImmediate: xw
});
var igt = g, ogt = D, sgt = OI, ugt = et, lgt = nr, cgt = O, fgt = z, hgt = cgt(function() {
  return fgt && Object.getOwnPropertyDescriptor(ogt, "queueMicrotask").value.length !== 1;
});
igt({ global: !0, enumerable: !0, dontCallGetSet: !0, forced: hgt }, {
  queueMicrotask: function(r) {
    lgt(arguments.length, 1), sgt(ugt(r));
  }
});
var vgt = g, se = D, dgt = vt, ggt = z, pgt = TypeError, $gt = Object.defineProperty, Ew = se.self !== se;
try {
  if (ggt) {
    var Ef = Object.getOwnPropertyDescriptor(se, "self");
    (Ew || !Ef || !Ef.get || !Ef.enumerable) && dgt(se, "self", {
      get: function() {
        return se;
      },
      set: function(r) {
        if (this !== se)
          throw new pgt("Illegal invocation");
        $gt(se, "self", {
          value: r,
          writable: !0,
          configurable: !0,
          enumerable: !0
        });
      },
      configurable: !0,
      enumerable: !0
    });
  } else
    vgt({ global: !0, simple: !0, forced: Ew }, {
      self: se
    });
} catch {
}
var ygt = g, mt = D, ti = ot, to = A, Bg = O, mgt = na, Jn = tt, bgt = ia, wgt = Dt, gl = K, Sgt = Ge, xgt = $t, tR = U, iu = gr, Egt = rt, Tgt = Zr, Tf = Tt, ys = st, Igt = nr, Ogt = Gi, pl = WT, jg = yr, Agt = $a, Tw = fT, Rgt = lE, Ug = Id, Wa = mt.Object, _gt = mt.Array, rR = mt.Date, eR = mt.Error, Cgt = mt.TypeError, Pgt = mt.PerformanceMark, Ve = ti("DOMException"), Sv = pl.Map, zg = pl.has, nR = pl.get, ou = pl.set, aR = jg.Set, iR = jg.add, Mgt = jg.has, Ngt = ti("Object", "keys"), Dgt = to([].push), Lgt = to((!0).valueOf), Fgt = to(1 .valueOf), kgt = to("".valueOf), Bgt = to(rR.prototype.getTime), xv = mgt("structuredClone"), mi = "DataCloneError", ms = "Transferring", oR = function(t) {
  return !Bg(function() {
    var r = new mt.Set([7]), e = t(r), n = t(Wa(7));
    return e === r || !e.has(7) || !gl(n) || +n != 7;
  }) && t;
}, Iw = function(t, r) {
  return !Bg(function() {
    var e = new r(), n = t({ a: e, b: e });
    return !(n && n.a === n.b && n.a instanceof r && n.a.stack === e.stack);
  });
}, jgt = function(t) {
  return !Bg(function() {
    var r = t(new mt.AggregateError([1], xv, { cause: 3 }));
    return r.name !== "AggregateError" || r.errors[0] !== 1 || r.message !== xv || r.cause !== 3;
  });
}, kn = mt.structuredClone, Ugt = !Iw(kn, eR) || !Iw(kn, Ve) || !jgt(kn), zgt = !kn && oR(function(t) {
  return new Pgt(xv, { detail: t }).detail;
}), zr = oR(kn) || zgt, If = function(t) {
  throw new Ve("Uncloneable type: " + t, mi);
}, Pt = function(t, r) {
  throw new Ve((r || "Cloning") + " of " + t + " cannot be properly polyfilled in this engine", mi);
}, Of = function(t, r) {
  return zr || Pt(r), zr(t);
}, Vgt = function() {
  var t;
  try {
    t = new mt.DataTransfer();
  } catch {
    try {
      t = new mt.ClipboardEvent("").clipboardData;
    } catch {
    }
  }
  return t && t.items && t.files ? t : null;
}, sR = function(t, r, e) {
  if (zg(r, t))
    return nR(r, t);
  var n = e || iu(t), a, i, o, s, u, l;
  if (n === "SharedArrayBuffer")
    zr ? a = zr(t) : a = t;
  else {
    var c = mt.DataView;
    !c && !Jn(t.slice) && Pt("ArrayBuffer");
    try {
      if (Jn(t.slice) && !t.resizable)
        a = t.slice(0);
      else
        for (i = t.byteLength, o = ("maxByteLength" in t) ? { maxByteLength: t.maxByteLength } : void 0, a = new ArrayBuffer(i, o), s = new c(t), u = new c(a), l = 0; l < i; l++)
          u.setUint8(l, s.getUint8(l));
    } catch {
      throw new Ve("ArrayBuffer is detached", mi);
    }
  }
  return ou(r, t, a), a;
}, Hgt = function(t, r, e, n, a) {
  var i = mt[r];
  return gl(i) || Pt(r), new i(sR(t.buffer, a), e, n);
}, yt = function(t, r) {
  if (Sgt(t) && If("Symbol"), !gl(t))
    return t;
  if (r) {
    if (zg(r, t))
      return nR(r, t);
  } else
    r = new Sv();
  var e = iu(t), n, a, i, o, s, u, l, c;
  switch (e) {
    case "Array":
      i = _gt(ys(t));
      break;
    case "Object":
      i = {};
      break;
    case "Map":
      i = new Sv();
      break;
    case "Set":
      i = new aR();
      break;
    case "RegExp":
      i = new RegExp(t.source, Ogt(t));
      break;
    case "Error":
      switch (a = t.name, a) {
        case "AggregateError":
          i = new (ti(a))([]);
          break;
        case "EvalError":
        case "RangeError":
        case "ReferenceError":
        case "SuppressedError":
        case "SyntaxError":
        case "TypeError":
        case "URIError":
          i = new (ti(a))();
          break;
        case "CompileError":
        case "LinkError":
        case "RuntimeError":
          i = new (ti("WebAssembly", a))();
          break;
        default:
          i = new eR();
      }
      break;
    case "DOMException":
      i = new Ve(t.message, t.name);
      break;
    case "ArrayBuffer":
    case "SharedArrayBuffer":
      i = sR(t, r, e);
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
      u = e === "DataView" ? t.byteLength : t.length, i = Hgt(t, e, t.byteOffset, u, r);
      break;
    case "DOMQuad":
      try {
        i = new DOMQuad(
          yt(t.p1, r),
          yt(t.p2, r),
          yt(t.p3, r),
          yt(t.p4, r)
        );
      } catch {
        i = Of(t, e);
      }
      break;
    case "File":
      if (zr)
        try {
          i = zr(t), iu(i) !== e && (i = void 0);
        } catch {
        }
      if (!i)
        try {
          i = new File([t], t.name, t);
        } catch {
        }
      i || Pt(e);
      break;
    case "FileList":
      if (o = Vgt(), o) {
        for (s = 0, u = ys(t); s < u; s++)
          o.items.add(yt(t[s], r));
        i = o.files;
      } else
        i = Of(t, e);
      break;
    case "ImageData":
      try {
        i = new ImageData(
          yt(t.data, r),
          t.width,
          t.height,
          { colorSpace: t.colorSpace }
        );
      } catch {
        i = Of(t, e);
      }
      break;
    default:
      if (zr)
        i = zr(t);
      else
        switch (e) {
          case "BigInt":
            i = Wa(t.valueOf());
            break;
          case "Boolean":
            i = Wa(Lgt(t));
            break;
          case "Number":
            i = Wa(Fgt(t));
            break;
          case "String":
            i = Wa(kgt(t));
            break;
          case "Date":
            i = new rR(Bgt(t));
            break;
          case "Blob":
            try {
              i = t.slice(0, t.size, t.type);
            } catch {
              Pt(e);
            }
            break;
          case "DOMPoint":
          case "DOMPointReadOnly":
            n = mt[e];
            try {
              i = n.fromPoint ? n.fromPoint(t) : new n(t.x, t.y, t.z, t.w);
            } catch {
              Pt(e);
            }
            break;
          case "DOMRect":
          case "DOMRectReadOnly":
            n = mt[e];
            try {
              i = n.fromRect ? n.fromRect(t) : new n(t.x, t.y, t.width, t.height);
            } catch {
              Pt(e);
            }
            break;
          case "DOMMatrix":
          case "DOMMatrixReadOnly":
            n = mt[e];
            try {
              i = n.fromMatrix ? n.fromMatrix(t) : new n(t);
            } catch {
              Pt(e);
            }
            break;
          case "AudioData":
          case "VideoFrame":
            Jn(t.clone) || Pt(e);
            try {
              i = t.clone();
            } catch {
              If(e);
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
            Pt(e);
          default:
            If(e);
        }
  }
  switch (ou(r, t, i), e) {
    case "Array":
    case "Object":
      for (l = Ngt(t), s = 0, u = ys(l); s < u; s++)
        c = l[s], Tgt(i, c, yt(t[c], r));
      break;
    case "Map":
      t.forEach(function(f, h) {
        ou(i, yt(h, r), yt(f, r));
      });
      break;
    case "Set":
      t.forEach(function(f) {
        iR(i, yt(f, r));
      });
      break;
    case "Error":
      Tf(i, "message", yt(t.message, r)), Egt(t, "cause") && Tf(i, "cause", yt(t.cause, r)), a === "AggregateError" ? i.errors = yt(t.errors, r) : a === "SuppressedError" && (i.error = yt(t.error, r), i.suppressed = yt(t.suppressed, r));
    case "DOMException":
      Rgt && Tf(i, "stack", yt(t.stack, r));
  }
  return i;
}, Ggt = function(t, r) {
  if (!gl(t))
    throw new Cgt("Transfer option cannot be converted to a sequence");
  var e = [];
  xgt(t, function(h) {
    Dgt(e, tR(h));
  });
  for (var n = 0, a = ys(e), i = new aR(), o, s, u, l, c, f; n < a; ) {
    if (o = e[n++], s = iu(o), s === "ArrayBuffer" ? Mgt(i, o) : zg(r, o))
      throw new Ve("Duplicate transferable", mi);
    if (s === "ArrayBuffer") {
      iR(i, o);
      continue;
    }
    if (Ug)
      l = kn(o, { transfer: [o] });
    else
      switch (s) {
        case "ImageBitmap":
          u = mt.OffscreenCanvas, bgt(u) || Pt(s, ms);
          try {
            c = new u(o.width, o.height), f = c.getContext("bitmaprenderer"), f.transferFromImageBitmap(o), l = c.transferToImageBitmap();
          } catch {
          }
          break;
        case "AudioData":
        case "VideoFrame":
          (!Jn(o.clone) || !Jn(o.close)) && Pt(s, ms);
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
          Pt(s, ms);
      }
    if (l === void 0)
      throw new Ve("This object cannot be transferred: " + s, mi);
    ou(r, o, l);
  }
  return i;
}, Wgt = function(t) {
  Agt(t, function(r) {
    Ug ? zr(r, { transfer: [r] }) : Jn(r.transfer) ? r.transfer() : Tw ? Tw(r) : Pt("ArrayBuffer", ms);
  });
};
ygt({ global: !0, enumerable: !0, sham: !Ug, forced: Ugt }, {
  structuredClone: function(r) {
    var e = Igt(arguments.length, 1) > 1 && !wgt(arguments[1]) ? tR(arguments[1]) : void 0, n = e ? e.transfer : void 0, a, i;
    n !== void 0 && (a = new Sv(), i = Ggt(n, a));
    var o = yt(r, a);
    return i && Wgt(i), o;
  }
});
var qgt = g, uR = D, Ygt = kg, Ow = Ygt(uR.setInterval, !0);
qgt({ global: !0, bind: !0, forced: uR.setInterval !== Ow }, {
  setInterval: Ow
});
var Kgt = g, lR = D, Xgt = kg, Aw = Xgt(lR.setTimeout, !0);
Kgt({ global: !0, bind: !0, forced: lR.setTimeout !== Aw }, {
  setTimeout: Aw
});
var Jgt = O, Zgt = X, Qgt = z, Rw = Xr, tpt = Zgt("iterator"), $l = !Jgt(function() {
  var t = new URL("b?a=1&b=2&c=3", "https://a"), r = t.searchParams, e = new URLSearchParams("a=1&a=2&b=3"), n = "";
  return t.pathname = "c%20d", r.forEach(function(a, i) {
    r.delete("b"), n += i + a;
  }), e.delete("a", 2), e.delete("b", void 0), Rw && (!t.toJSON || !e.has("a", 1) || e.has("a", 2) || !e.has("a", void 0) || e.has("b")) || !r.size && (Rw || !Qgt) || !r.sort || t.href !== "https://a/c%20d?a=1&c=3" || r.get("c") !== "3" || String(new URLSearchParams("?a=1")) !== "a=1" || !r[tpt] || new URL("https://a@b").username !== "a" || new URLSearchParams(new URLSearchParams("a=b")).get("a") !== "b" || new URL("https://тест").host !== "xn--e1aybc" || new URL("https://a#б").hash !== "#%D0%B1" || n !== "a1c3" || new URL("https://x", void 0).host !== "x";
}), en = A, Af = 2147483647, ri = 36, cR = 1, Ev = 26, rpt = 38, ept = 700, npt = 72, apt = 128, ipt = "-", opt = /[^\0-\u007E]/, fR = /[.\u3002\uFF0E\uFF61]/g, _w = "Overflow: input needs wider integers to process", Rf = ri - cR, Cw = RangeError, spt = en(fR.exec), On = Math.floor, _f = String.fromCharCode, Pw = en("".charCodeAt), hR = en([].join), ce = en([].push), upt = en("".replace), lpt = en("".split), cpt = en("".toLowerCase), fpt = function(t) {
  for (var r = [], e = 0, n = t.length; e < n; ) {
    var a = Pw(t, e++);
    if (a >= 55296 && a <= 56319 && e < n) {
      var i = Pw(t, e++);
      (i & 64512) === 56320 ? ce(r, ((a & 1023) << 10) + (i & 1023) + 65536) : (ce(r, a), e--);
    } else
      ce(r, a);
  }
  return r;
}, Mw = function(t) {
  return t + 22 + 75 * (t < 26);
}, hpt = function(t, r, e) {
  var n = 0;
  for (t = e ? On(t / ept) : t >> 1, t += On(t / r); t > Rf * Ev >> 1; )
    t = On(t / Rf), n += ri;
  return On(n + (Rf + 1) * t / (t + rpt));
}, vpt = function(t) {
  var r = [];
  t = fpt(t);
  var e = t.length, n = apt, a = 0, i = npt, o, s;
  for (o = 0; o < t.length; o++)
    s = t[o], s < 128 && ce(r, _f(s));
  var u = r.length, l = u;
  for (u && ce(r, ipt); l < e; ) {
    var c = Af;
    for (o = 0; o < t.length; o++)
      s = t[o], s >= n && s < c && (c = s);
    var f = l + 1;
    if (c - n > On((Af - a) / f))
      throw new Cw(_w);
    for (a += (c - n) * f, n = c, o = 0; o < t.length; o++) {
      if (s = t[o], s < n && ++a > Af)
        throw new Cw(_w);
      if (s === n) {
        for (var h = a, v = ri; ; ) {
          var d = v <= i ? cR : v >= i + Ev ? Ev : v - i;
          if (h < d)
            break;
          var $ = h - d, y = ri - d;
          ce(r, _f(Mw(d + $ % y))), h = On($ / y), v += ri;
        }
        ce(r, _f(Mw(h))), i = hpt(a, f, l === u), a = 0, l++;
      }
    }
    a++, n++;
  }
  return hR(r, "");
}, dpt = function(t) {
  var r = [], e = lpt(upt(cpt(t), fR, "."), "."), n, a;
  for (n = 0; n < e.length; n++)
    a = e[n], ce(r, spt(opt, a) ? "xn--" + vpt(a) : a);
  return hR(r, ".");
}, Tv = g, vR = D, Vg = EI, gpt = ot, Ko = V, vr = A, ei = z, dR = $l, gR = ct, ppt = vt, $pt = fa, ypt = kt, mpt = ld, Hg = ht, pR = $r, Cf = tt, bpt = rt, wpt = pr, Spt = gr, xpt = U, $R = K, Ot = W, Ept = Vt, Nw = tr, Dw = Ru, Tpt = oa, Xo = ua, hn = nr, Ipt = X, Opt = vd, Apt = Ipt("iterator"), ma = "URLSearchParams", yR = ma + "Iterator", mR = Hg.set, Jt = Hg.getterFor(ma), Rpt = Hg.getterFor(yR), Lw = Vg("fetch"), su = Vg("Request"), ni = Vg("Headers"), Pf = su && su.prototype, Fw = ni && ni.prototype, _pt = vR.TypeError, Cpt = vR.encodeURIComponent, Ppt = String.fromCharCode, Mpt = gpt("String", "fromCodePoint"), Npt = parseInt, bs = vr("".charAt), kw = vr([].join), fe = vr([].push), bR = vr("".replace), Dpt = vr([].shift), Bw = vr([].splice), jw = vr("".split), wR = vr("".slice), Lpt = vr(/./.exec), Fpt = /\+/g, Mf = "�", kpt = /^[0-9a-f]+$/i, Uw = function(t, r) {
  var e = wR(t, r, r + 2);
  return Lpt(kpt, e) ? Npt(e, 16) : NaN;
}, Bpt = function(t) {
  for (var r = 0, e = 128; e > 0 && t & e; e >>= 1)
    r++;
  return r;
}, jpt = function(t) {
  var r = null;
  switch (t.length) {
    case 1:
      r = t[0];
      break;
    case 2:
      r = (t[0] & 31) << 6 | t[1] & 63;
      break;
    case 3:
      r = (t[0] & 15) << 12 | (t[1] & 63) << 6 | t[2] & 63;
      break;
    case 4:
      r = (t[0] & 7) << 18 | (t[1] & 63) << 12 | (t[2] & 63) << 6 | t[3] & 63;
      break;
  }
  return r > 1114111 ? null : r;
}, zw = function(t) {
  t = bR(t, Fpt, " ");
  for (var r = t.length, e = "", n = 0; n < r; ) {
    var a = bs(t, n);
    if (a === "%") {
      if (bs(t, n + 1) === "%" || n + 3 > r) {
        e += "%", n++;
        continue;
      }
      var i = Uw(t, n + 1);
      if (i !== i) {
        e += a, n++;
        continue;
      }
      n += 2;
      var o = Bpt(i);
      if (o === 0)
        a = Ppt(i);
      else {
        if (o === 1 || o > 4) {
          e += Mf, n++;
          continue;
        }
        for (var s = [i], u = 1; u < o && (n++, !(n + 3 > r || bs(t, n) !== "%")); ) {
          var l = Uw(t, n + 1);
          if (l !== l) {
            n += 3;
            break;
          }
          if (l > 191 || l < 128)
            break;
          fe(s, l), n += 2, u++;
        }
        if (s.length !== o) {
          e += Mf;
          continue;
        }
        var c = jpt(s);
        c === null ? e += Mf : a = Mpt(c);
      }
    }
    e += a, n++;
  }
  return e;
}, Upt = /[!'()~]|%20/g, zpt = {
  "!": "%21",
  "'": "%27",
  "(": "%28",
  ")": "%29",
  "~": "%7E",
  "%20": "+"
}, Vpt = function(t) {
  return zpt[t];
}, Vw = function(t) {
  return bR(Cpt(t), Upt, Vpt);
}, Nf = mpt(function(r, e) {
  mR(this, {
    type: yR,
    target: Jt(r).entries,
    index: 0,
    kind: e
  });
}, ma, function() {
  var r = Rpt(this), e = r.target, n = r.index++;
  if (!e || n >= e.length)
    return r.target = null, Xo(void 0, !0);
  var a = e[n];
  switch (r.kind) {
    case "keys":
      return Xo(a.key, !1);
    case "values":
      return Xo(a.value, !1);
  }
  return Xo([a.key, a.value], !1);
}, !0), SR = function(t) {
  this.entries = [], this.url = null, t !== void 0 && ($R(t) ? this.parseObject(t) : this.parseQuery(typeof t == "string" ? bs(t, 0) === "?" ? wR(t, 1) : t : Ot(t)));
};
SR.prototype = {
  type: ma,
  bindURL: function(t) {
    this.url = t, this.update();
  },
  parseObject: function(t) {
    var r = this.entries, e = Tpt(t), n, a, i, o, s, u, l;
    if (e)
      for (n = Dw(t, e), a = n.next; !(i = Ko(a, n)).done; ) {
        if (o = Dw(xpt(i.value)), s = o.next, (u = Ko(s, o)).done || (l = Ko(s, o)).done || !Ko(s, o).done)
          throw new _pt("Expected sequence with length 2");
        fe(r, { key: Ot(u.value), value: Ot(l.value) });
      }
    else
      for (var c in t)
        bpt(t, c) && fe(r, { key: c, value: Ot(t[c]) });
  },
  parseQuery: function(t) {
    if (t)
      for (var r = this.entries, e = jw(t, "&"), n = 0, a, i; n < e.length; )
        a = e[n++], a.length && (i = jw(a, "="), fe(r, {
          key: zw(Dpt(i)),
          value: zw(kw(i, "="))
        }));
  },
  serialize: function() {
    for (var t = this.entries, r = [], e = 0, n; e < t.length; )
      n = t[e++], fe(r, Vw(n.key) + "=" + Vw(n.value));
    return kw(r, "&");
  },
  update: function() {
    this.entries.length = 0, this.parseQuery(this.url.query);
  },
  updateURL: function() {
    this.url && this.url.update();
  }
};
var yl = function() {
  pR(this, Zn);
  var r = arguments.length > 0 ? arguments[0] : void 0, e = mR(this, new SR(r));
  ei || (this.size = e.entries.length);
}, Zn = yl.prototype;
$pt(Zn, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function(r, e) {
    var n = Jt(this);
    hn(arguments.length, 2), fe(n.entries, { key: Ot(r), value: Ot(e) }), ei || this.length++, n.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  delete: function(t) {
    for (var r = Jt(this), e = hn(arguments.length, 1), n = r.entries, a = Ot(t), i = e < 2 ? void 0 : arguments[1], o = i === void 0 ? i : Ot(i), s = 0; s < n.length; ) {
      var u = n[s];
      if (u.key === a && (o === void 0 || u.value === o)) {
        if (Bw(n, s, 1), o !== void 0)
          break;
      } else
        s++;
    }
    ei || (this.size = n.length), r.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function(r) {
    var e = Jt(this).entries;
    hn(arguments.length, 1);
    for (var n = Ot(r), a = 0; a < e.length; a++)
      if (e[a].key === n)
        return e[a].value;
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function(r) {
    var e = Jt(this).entries;
    hn(arguments.length, 1);
    for (var n = Ot(r), a = [], i = 0; i < e.length; i++)
      e[i].key === n && fe(a, e[i].value);
    return a;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function(r) {
    for (var e = Jt(this).entries, n = hn(arguments.length, 1), a = Ot(r), i = n < 2 ? void 0 : arguments[1], o = i === void 0 ? i : Ot(i), s = 0; s < e.length; ) {
      var u = e[s++];
      if (u.key === a && (o === void 0 || u.value === o))
        return !0;
    }
    return !1;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function(r, e) {
    var n = Jt(this);
    hn(arguments.length, 1);
    for (var a = n.entries, i = !1, o = Ot(r), s = Ot(e), u = 0, l; u < a.length; u++)
      l = a[u], l.key === o && (i ? Bw(a, u--, 1) : (i = !0, l.value = s));
    i || fe(a, { key: o, value: s }), ei || (this.size = a.length), n.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function() {
    var r = Jt(this);
    Opt(r.entries, function(e, n) {
      return e.key > n.key ? 1 : -1;
    }), r.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function(r) {
    for (var e = Jt(this).entries, n = wpt(r, arguments.length > 1 ? arguments[1] : void 0), a = 0, i; a < e.length; )
      i = e[a++], n(i.value, i.key, this);
  },
  // `URLSearchParams.prototype.keys` method
  keys: function() {
    return new Nf(this, "keys");
  },
  // `URLSearchParams.prototype.values` method
  values: function() {
    return new Nf(this, "values");
  },
  // `URLSearchParams.prototype.entries` method
  entries: function() {
    return new Nf(this, "entries");
  }
}, { enumerable: !0 });
gR(Zn, Apt, Zn.entries, { name: "entries" });
gR(Zn, "toString", function() {
  return Jt(this).serialize();
}, { enumerable: !0 });
ei && ppt(Zn, "size", {
  get: function() {
    return Jt(this).entries.length;
  },
  configurable: !0,
  enumerable: !0
});
ypt(yl, ma);
Tv({ global: !0, constructor: !0, forced: !dR }, {
  URLSearchParams: yl
});
if (!dR && Cf(ni)) {
  var Hpt = vr(Fw.has), Gpt = vr(Fw.set), Hw = function(t) {
    if ($R(t)) {
      var r = t.body, e;
      if (Spt(r) === ma)
        return e = t.headers ? new ni(t.headers) : new ni(), Hpt(e, "content-type") || Gpt(e, "content-type", "application/x-www-form-urlencoded;charset=UTF-8"), Ept(t, {
          body: Nw(0, Ot(r)),
          headers: Nw(0, e)
        });
    }
    return t;
  };
  if (Cf(Lw) && Tv({ global: !0, enumerable: !0, dontCallGetSet: !0, forced: !0 }, {
    fetch: function(r) {
      return Lw(r, arguments.length > 1 ? Hw(arguments[1]) : {});
    }
  }), Cf(su)) {
    var Df = function(r) {
      return pR(this, Pf), new su(r, arguments.length > 1 ? Hw(arguments[1]) : {});
    };
    Pf.constructor = Df, Df.prototype = Pf, Tv({ global: !0, constructor: !0, dontCallGetSet: !0, forced: !0 }, {
      Request: Df
    });
  }
}
var Wpt = {
  URLSearchParams: yl,
  getState: Jt
}, qpt = g, Gg = z, Ypt = $l, Wg = D, Gw = pr, ar = A, uu = ct, Yt = vt, Kpt = $r, Iv = rt, qg = cI, vn = xE, or = rr, Xpt = il.codeAt, Jpt = dpt, Fr = W, Zpt = kt, Qpt = nr, xR = Wpt, ER = ht, t$t = ER.set, lu = ER.getterFor("URL"), r$t = xR.URLSearchParams, e$t = xR.getState, ka = Wg.URL, Ov = Wg.TypeError, cu = Wg.parseInt, n$t = Math.floor, Ww = Math.pow, Zt = ar("".charAt), fr = ar(/./.exec), qa = ar([].join), a$t = ar(1 .toString), i$t = ar([].pop), mn = ar([].push), Lf = ar("".replace), o$t = ar([].shift), s$t = ar("".split), ai = ar("".slice), fu = ar("".toLowerCase), u$t = ar([].unshift), l$t = "Invalid authority", Ff = "Invalid scheme", Re = "Invalid host", qw = "Invalid port", TR = /[a-z]/i, c$t = /[\d+-.a-z]/i, Av = /\d/, f$t = /^0x/i, h$t = /^[0-7]+$/, v$t = /^\d+$/, IR = /^[\da-f]+$/i, d$t = /[\0\t\n\r #%/:<>?@[\\\]^|]/, g$t = /[\0\t\n\r #/:<>?@[\\\]^|]/, p$t = /^[\u0000-\u0020]+/, $$t = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/, y$t = /[\t\n\r]/g, Kt, m$t = function(t) {
  var r = s$t(t, "."), e, n, a, i, o, s, u;
  if (r.length && r[r.length - 1] === "" && r.length--, e = r.length, e > 4)
    return t;
  for (n = [], a = 0; a < e; a++) {
    if (i = r[a], i === "")
      return t;
    if (o = 10, i.length > 1 && Zt(i, 0) === "0" && (o = fr(f$t, i) ? 16 : 8, i = ai(i, o === 8 ? 1 : 2)), i === "")
      s = 0;
    else {
      if (!fr(o === 10 ? v$t : o === 8 ? h$t : IR, i))
        return t;
      s = cu(i, o);
    }
    mn(n, s);
  }
  for (a = 0; a < e; a++)
    if (s = n[a], a === e - 1) {
      if (s >= Ww(256, 5 - e))
        return null;
    } else if (s > 255)
      return null;
  for (u = i$t(n), a = 0; a < n.length; a++)
    u += n[a] * Ww(256, 3 - a);
  return u;
}, b$t = function(t) {
  var r = [0, 0, 0, 0, 0, 0, 0, 0], e = 0, n = null, a = 0, i, o, s, u, l, c, f, h = function() {
    return Zt(t, a);
  };
  if (h() === ":") {
    if (Zt(t, 1) !== ":")
      return;
    a += 2, e++, n = e;
  }
  for (; h(); ) {
    if (e === 8)
      return;
    if (h() === ":") {
      if (n !== null)
        return;
      a++, e++, n = e;
      continue;
    }
    for (i = o = 0; o < 4 && fr(IR, h()); )
      i = i * 16 + cu(h(), 16), a++, o++;
    if (h() === ".") {
      if (o === 0 || (a -= o, e > 6))
        return;
      for (s = 0; h(); ) {
        if (u = null, s > 0)
          if (h() === "." && s < 4)
            a++;
          else
            return;
        if (!fr(Av, h()))
          return;
        for (; fr(Av, h()); ) {
          if (l = cu(h(), 10), u === null)
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
        r[e] = r[e] * 256 + u, s++, (s === 2 || s === 4) && e++;
      }
      if (s !== 4)
        return;
      break;
    } else if (h() === ":") {
      if (a++, !h())
        return;
    } else if (h())
      return;
    r[e++] = i;
  }
  if (n !== null)
    for (c = e - n, e = 7; e !== 0 && c > 0; )
      f = r[e], r[e--] = r[n + c - 1], r[n + --c] = f;
  else if (e !== 8)
    return;
  return r;
}, w$t = function(t) {
  for (var r = null, e = 1, n = null, a = 0, i = 0; i < 8; i++)
    t[i] !== 0 ? (a > e && (r = n, e = a), n = null, a = 0) : (n === null && (n = i), ++a);
  return a > e ? n : r;
}, Ba = function(t) {
  var r, e, n, a;
  if (typeof t == "number") {
    for (r = [], e = 0; e < 4; e++)
      u$t(r, t % 256), t = n$t(t / 256);
    return qa(r, ".");
  }
  if (typeof t == "object") {
    for (r = "", n = w$t(t), e = 0; e < 8; e++)
      a && t[e] === 0 || (a && (a = !1), n === e ? (r += e ? ":" : "::", a = !0) : (r += a$t(t[e], 16), e < 7 && (r += ":")));
    return "[" + r + "]";
  }
  return t;
}, ws = {}, OR = qg({}, ws, {
  " ": 1,
  '"': 1,
  "<": 1,
  ">": 1,
  "`": 1
}), AR = qg({}, OR, {
  "#": 1,
  "?": 1,
  "{": 1,
  "}": 1
}), kf = qg({}, AR, {
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
}), oe = function(t, r) {
  var e = Xpt(t, 0);
  return e > 32 && e < 127 && !Iv(r, t) ? t : encodeURIComponent(t);
}, Jo = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
}, Ya = function(t, r) {
  var e;
  return t.length === 2 && fr(TR, Zt(t, 0)) && ((e = Zt(t, 1)) === ":" || !r && e === "|");
}, Yw = function(t) {
  var r;
  return t.length > 1 && Ya(ai(t, 0, 2)) && (t.length === 2 || (r = Zt(t, 2)) === "/" || r === "\\" || r === "?" || r === "#");
}, S$t = function(t) {
  return t === "." || fu(t) === "%2e";
}, x$t = function(t) {
  return t = fu(t), t === ".." || t === "%2e." || t === ".%2e" || t === "%2e%2e";
}, Bf = {}, Kw = {}, jf = {}, Xw = {}, Jw = {}, Uf = {}, Zw = {}, Qw = {}, Zo = {}, Qo = {}, zf = {}, Vf = {}, Hf = {}, Gf = {}, tS = {}, Wf = {}, dn = {}, Sr = {}, rS = {}, _e = {}, Lr = {}, Yg = function(t, r, e) {
  var n = Fr(t), a, i, o;
  if (r) {
    if (i = this.parse(n), i)
      throw new Ov(i);
    this.searchParams = null;
  } else {
    if (e !== void 0 && (a = new Yg(e, !0)), i = this.parse(n, null, a), i)
      throw new Ov(i);
    o = e$t(new r$t()), o.bindURL(this), this.searchParams = o;
  }
};
Yg.prototype = {
  type: "URL",
  // https://url.spec.whatwg.org/#url-parsing
  // eslint-disable-next-line max-statements -- TODO
  parse: function(t, r, e) {
    var n = this, a = r || Bf, i = 0, o = "", s = !1, u = !1, l = !1, c, f, h, v;
    for (t = Fr(t), r || (n.scheme = "", n.username = "", n.password = "", n.host = null, n.port = null, n.path = [], n.query = null, n.fragment = null, n.cannotBeABaseURL = !1, t = Lf(t, p$t, ""), t = Lf(t, $$t, "$1")), t = Lf(t, y$t, ""), c = vn(t); i <= c.length; ) {
      switch (f = c[i], a) {
        case Bf:
          if (f && fr(TR, f))
            o += fu(f), a = Kw;
          else {
            if (r)
              return Ff;
            a = jf;
            continue;
          }
          break;
        case Kw:
          if (f && (fr(c$t, f) || f === "+" || f === "-" || f === "."))
            o += fu(f);
          else if (f === ":") {
            if (r && (n.isSpecial() !== Iv(Jo, o) || o === "file" && (n.includesCredentials() || n.port !== null) || n.scheme === "file" && !n.host))
              return;
            if (n.scheme = o, r) {
              n.isSpecial() && Jo[n.scheme] === n.port && (n.port = null);
              return;
            }
            o = "", n.scheme === "file" ? a = Gf : n.isSpecial() && e && e.scheme === n.scheme ? a = Xw : n.isSpecial() ? a = Qw : c[i + 1] === "/" ? (a = Jw, i++) : (n.cannotBeABaseURL = !0, mn(n.path, ""), a = rS);
          } else {
            if (r)
              return Ff;
            o = "", a = jf, i = 0;
            continue;
          }
          break;
        case jf:
          if (!e || e.cannotBeABaseURL && f !== "#")
            return Ff;
          if (e.cannotBeABaseURL && f === "#") {
            n.scheme = e.scheme, n.path = or(e.path), n.query = e.query, n.fragment = "", n.cannotBeABaseURL = !0, a = Lr;
            break;
          }
          a = e.scheme === "file" ? Gf : Uf;
          continue;
        case Xw:
          if (f === "/" && c[i + 1] === "/")
            a = Zo, i++;
          else {
            a = Uf;
            continue;
          }
          break;
        case Jw:
          if (f === "/") {
            a = Qo;
            break;
          } else {
            a = Sr;
            continue;
          }
        case Uf:
          if (n.scheme = e.scheme, f === Kt)
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, n.path = or(e.path), n.query = e.query;
          else if (f === "/" || f === "\\" && n.isSpecial())
            a = Zw;
          else if (f === "?")
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, n.path = or(e.path), n.query = "", a = _e;
          else if (f === "#")
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, n.path = or(e.path), n.query = e.query, n.fragment = "", a = Lr;
          else {
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, n.path = or(e.path), n.path.length--, a = Sr;
            continue;
          }
          break;
        case Zw:
          if (n.isSpecial() && (f === "/" || f === "\\"))
            a = Zo;
          else if (f === "/")
            a = Qo;
          else {
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, a = Sr;
            continue;
          }
          break;
        case Qw:
          if (a = Zo, f !== "/" || Zt(o, i + 1) !== "/")
            continue;
          i++;
          break;
        case Zo:
          if (f !== "/" && f !== "\\") {
            a = Qo;
            continue;
          }
          break;
        case Qo:
          if (f === "@") {
            s && (o = "%40" + o), s = !0, h = vn(o);
            for (var d = 0; d < h.length; d++) {
              var $ = h[d];
              if ($ === ":" && !l) {
                l = !0;
                continue;
              }
              var y = oe($, kf);
              l ? n.password += y : n.username += y;
            }
            o = "";
          } else if (f === Kt || f === "/" || f === "?" || f === "#" || f === "\\" && n.isSpecial()) {
            if (s && o === "")
              return l$t;
            i -= vn(o).length + 1, o = "", a = zf;
          } else
            o += f;
          break;
        case zf:
        case Vf:
          if (r && n.scheme === "file") {
            a = Wf;
            continue;
          } else if (f === ":" && !u) {
            if (o === "")
              return Re;
            if (v = n.parseHost(o), v)
              return v;
            if (o = "", a = Hf, r === Vf)
              return;
          } else if (f === Kt || f === "/" || f === "?" || f === "#" || f === "\\" && n.isSpecial()) {
            if (n.isSpecial() && o === "")
              return Re;
            if (r && o === "" && (n.includesCredentials() || n.port !== null))
              return;
            if (v = n.parseHost(o), v)
              return v;
            if (o = "", a = dn, r)
              return;
            continue;
          } else
            f === "[" ? u = !0 : f === "]" && (u = !1), o += f;
          break;
        case Hf:
          if (fr(Av, f))
            o += f;
          else if (f === Kt || f === "/" || f === "?" || f === "#" || f === "\\" && n.isSpecial() || r) {
            if (o !== "") {
              var p = cu(o, 10);
              if (p > 65535)
                return qw;
              n.port = n.isSpecial() && p === Jo[n.scheme] ? null : p, o = "";
            }
            if (r)
              return;
            a = dn;
            continue;
          } else
            return qw;
          break;
        case Gf:
          if (n.scheme = "file", f === "/" || f === "\\")
            a = tS;
          else if (e && e.scheme === "file")
            switch (f) {
              case Kt:
                n.host = e.host, n.path = or(e.path), n.query = e.query;
                break;
              case "?":
                n.host = e.host, n.path = or(e.path), n.query = "", a = _e;
                break;
              case "#":
                n.host = e.host, n.path = or(e.path), n.query = e.query, n.fragment = "", a = Lr;
                break;
              default:
                Yw(qa(or(c, i), "")) || (n.host = e.host, n.path = or(e.path), n.shortenPath()), a = Sr;
                continue;
            }
          else {
            a = Sr;
            continue;
          }
          break;
        case tS:
          if (f === "/" || f === "\\") {
            a = Wf;
            break;
          }
          e && e.scheme === "file" && !Yw(qa(or(c, i), "")) && (Ya(e.path[0], !0) ? mn(n.path, e.path[0]) : n.host = e.host), a = Sr;
          continue;
        case Wf:
          if (f === Kt || f === "/" || f === "\\" || f === "?" || f === "#") {
            if (!r && Ya(o))
              a = Sr;
            else if (o === "") {
              if (n.host = "", r)
                return;
              a = dn;
            } else {
              if (v = n.parseHost(o), v)
                return v;
              if (n.host === "localhost" && (n.host = ""), r)
                return;
              o = "", a = dn;
            }
            continue;
          } else
            o += f;
          break;
        case dn:
          if (n.isSpecial()) {
            if (a = Sr, f !== "/" && f !== "\\")
              continue;
          } else if (!r && f === "?")
            n.query = "", a = _e;
          else if (!r && f === "#")
            n.fragment = "", a = Lr;
          else if (f !== Kt && (a = Sr, f !== "/"))
            continue;
          break;
        case Sr:
          if (f === Kt || f === "/" || f === "\\" && n.isSpecial() || !r && (f === "?" || f === "#")) {
            if (x$t(o) ? (n.shortenPath(), f !== "/" && !(f === "\\" && n.isSpecial()) && mn(n.path, "")) : S$t(o) ? f !== "/" && !(f === "\\" && n.isSpecial()) && mn(n.path, "") : (n.scheme === "file" && !n.path.length && Ya(o) && (n.host && (n.host = ""), o = Zt(o, 0) + ":"), mn(n.path, o)), o = "", n.scheme === "file" && (f === Kt || f === "?" || f === "#"))
              for (; n.path.length > 1 && n.path[0] === ""; )
                o$t(n.path);
            f === "?" ? (n.query = "", a = _e) : f === "#" && (n.fragment = "", a = Lr);
          } else
            o += oe(f, AR);
          break;
        case rS:
          f === "?" ? (n.query = "", a = _e) : f === "#" ? (n.fragment = "", a = Lr) : f !== Kt && (n.path[0] += oe(f, ws));
          break;
        case _e:
          !r && f === "#" ? (n.fragment = "", a = Lr) : f !== Kt && (f === "'" && n.isSpecial() ? n.query += "%27" : f === "#" ? n.query += "%23" : n.query += oe(f, ws));
          break;
        case Lr:
          f !== Kt && (n.fragment += oe(f, OR));
          break;
      }
      i++;
    }
  },
  // https://url.spec.whatwg.org/#host-parsing
  parseHost: function(t) {
    var r, e, n;
    if (Zt(t, 0) === "[") {
      if (Zt(t, t.length - 1) !== "]" || (r = b$t(ai(t, 1, -1)), !r))
        return Re;
      this.host = r;
    } else if (this.isSpecial()) {
      if (t = Jpt(t), fr(d$t, t) || (r = m$t(t), r === null))
        return Re;
      this.host = r;
    } else {
      if (fr(g$t, t))
        return Re;
      for (r = "", e = vn(t), n = 0; n < e.length; n++)
        r += oe(e[n], ws);
      this.host = r;
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
    return Iv(Jo, this.scheme);
  },
  // https://url.spec.whatwg.org/#shorten-a-urls-path
  shortenPath: function() {
    var t = this.path, r = t.length;
    r && (this.scheme !== "file" || r !== 1 || !Ya(t[0], !0)) && t.length--;
  },
  // https://url.spec.whatwg.org/#concept-url-serializer
  serialize: function() {
    var t = this, r = t.scheme, e = t.username, n = t.password, a = t.host, i = t.port, o = t.path, s = t.query, u = t.fragment, l = r + ":";
    return a !== null ? (l += "//", t.includesCredentials() && (l += e + (n ? ":" + n : "") + "@"), l += Ba(a), i !== null && (l += ":" + i)) : r === "file" && (l += "//"), l += t.cannotBeABaseURL ? o[0] : o.length ? "/" + qa(o, "/") : "", s !== null && (l += "?" + s), u !== null && (l += "#" + u), l;
  },
  // https://url.spec.whatwg.org/#dom-url-href
  setHref: function(t) {
    var r = this.parse(t);
    if (r)
      throw new Ov(r);
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-origin
  getOrigin: function() {
    var t = this.scheme, r = this.port;
    if (t === "blob")
      try {
        return new Qn(t.path[0]).origin;
      } catch {
        return "null";
      }
    return t === "file" || !this.isSpecial() ? "null" : t + "://" + Ba(this.host) + (r !== null ? ":" + r : "");
  },
  // https://url.spec.whatwg.org/#dom-url-protocol
  getProtocol: function() {
    return this.scheme + ":";
  },
  setProtocol: function(t) {
    this.parse(Fr(t) + ":", Bf);
  },
  // https://url.spec.whatwg.org/#dom-url-username
  getUsername: function() {
    return this.username;
  },
  setUsername: function(t) {
    var r = vn(Fr(t));
    if (!this.cannotHaveUsernamePasswordPort()) {
      this.username = "";
      for (var e = 0; e < r.length; e++)
        this.username += oe(r[e], kf);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-password
  getPassword: function() {
    return this.password;
  },
  setPassword: function(t) {
    var r = vn(Fr(t));
    if (!this.cannotHaveUsernamePasswordPort()) {
      this.password = "";
      for (var e = 0; e < r.length; e++)
        this.password += oe(r[e], kf);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-host
  getHost: function() {
    var t = this.host, r = this.port;
    return t === null ? "" : r === null ? Ba(t) : Ba(t) + ":" + r;
  },
  setHost: function(t) {
    this.cannotBeABaseURL || this.parse(t, zf);
  },
  // https://url.spec.whatwg.org/#dom-url-hostname
  getHostname: function() {
    var t = this.host;
    return t === null ? "" : Ba(t);
  },
  setHostname: function(t) {
    this.cannotBeABaseURL || this.parse(t, Vf);
  },
  // https://url.spec.whatwg.org/#dom-url-port
  getPort: function() {
    var t = this.port;
    return t === null ? "" : Fr(t);
  },
  setPort: function(t) {
    this.cannotHaveUsernamePasswordPort() || (t = Fr(t), t === "" ? this.port = null : this.parse(t, Hf));
  },
  // https://url.spec.whatwg.org/#dom-url-pathname
  getPathname: function() {
    var t = this.path;
    return this.cannotBeABaseURL ? t[0] : t.length ? "/" + qa(t, "/") : "";
  },
  setPathname: function(t) {
    this.cannotBeABaseURL || (this.path = [], this.parse(t, dn));
  },
  // https://url.spec.whatwg.org/#dom-url-search
  getSearch: function() {
    var t = this.query;
    return t ? "?" + t : "";
  },
  setSearch: function(t) {
    t = Fr(t), t === "" ? this.query = null : (Zt(t, 0) === "?" && (t = ai(t, 1)), this.query = "", this.parse(t, _e)), this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-searchparams
  getSearchParams: function() {
    return this.searchParams.facade;
  },
  // https://url.spec.whatwg.org/#dom-url-hash
  getHash: function() {
    var t = this.fragment;
    return t ? "#" + t : "";
  },
  setHash: function(t) {
    if (t = Fr(t), t === "") {
      this.fragment = null;
      return;
    }
    Zt(t, 0) === "#" && (t = ai(t, 1)), this.fragment = "", this.parse(t, Lr);
  },
  update: function() {
    this.query = this.searchParams.serialize() || null;
  }
};
var Qn = function(r) {
  var e = Kpt(this, It), n = Qpt(arguments.length, 1) > 1 ? arguments[1] : void 0, a = t$t(e, new Yg(r, !1, n));
  Gg || (e.href = a.serialize(), e.origin = a.getOrigin(), e.protocol = a.getProtocol(), e.username = a.getUsername(), e.password = a.getPassword(), e.host = a.getHost(), e.hostname = a.getHostname(), e.port = a.getPort(), e.pathname = a.getPathname(), e.search = a.getSearch(), e.searchParams = a.getSearchParams(), e.hash = a.getHash());
}, It = Qn.prototype, Xt = function(t, r) {
  return {
    get: function() {
      return lu(this)[t]();
    },
    set: r && function(e) {
      return lu(this)[r](e);
    },
    configurable: !0,
    enumerable: !0
  };
};
Gg && (Yt(It, "href", Xt("serialize", "setHref")), Yt(It, "origin", Xt("getOrigin")), Yt(It, "protocol", Xt("getProtocol", "setProtocol")), Yt(It, "username", Xt("getUsername", "setUsername")), Yt(It, "password", Xt("getPassword", "setPassword")), Yt(It, "host", Xt("getHost", "setHost")), Yt(It, "hostname", Xt("getHostname", "setHostname")), Yt(It, "port", Xt("getPort", "setPort")), Yt(It, "pathname", Xt("getPathname", "setPathname")), Yt(It, "search", Xt("getSearch", "setSearch")), Yt(It, "searchParams", Xt("getSearchParams")), Yt(It, "hash", Xt("getHash", "setHash")));
uu(It, "toJSON", function() {
  return lu(this).serialize();
}, { enumerable: !0 });
uu(It, "toString", function() {
  return lu(this).serialize();
}, { enumerable: !0 });
if (ka) {
  var eS = ka.createObjectURL, nS = ka.revokeObjectURL;
  eS && uu(Qn, "createObjectURL", Gw(eS, ka)), nS && uu(Qn, "revokeObjectURL", Gw(nS, ka));
}
Zpt(Qn, "URL");
qpt({ global: !0, constructor: !0, forced: !Ypt, sham: !Gg }, {
  URL: Qn
});
var E$t = g, T$t = ot, RR = O, I$t = nr, aS = W, O$t = $l, Kg = T$t("URL"), A$t = O$t && RR(function() {
  Kg.canParse();
}), R$t = RR(function() {
  return Kg.canParse.length !== 1;
});
E$t({ target: "URL", stat: !0, forced: !A$t || R$t }, {
  canParse: function(r) {
    var e = I$t(arguments.length, 1), n = aS(r), a = e < 2 || arguments[1] === void 0 ? void 0 : aS(arguments[1]);
    try {
      return !!new Kg(n, a);
    } catch {
      return !1;
    }
  }
});
var _$t = g, C$t = ot, P$t = nr, iS = W, M$t = $l, N$t = C$t("URL");
_$t({ target: "URL", stat: !0, forced: !M$t }, {
  parse: function(r) {
    var e = P$t(arguments.length, 1), n = iS(r), a = e < 2 || arguments[1] === void 0 ? void 0 : iS(arguments[1]);
    try {
      return new N$t(n, a);
    } catch {
      return null;
    }
  }
});
var D$t = g, L$t = V;
D$t({ target: "URL", proto: !0, enumerable: !0 }, {
  toJSON: function() {
    return L$t(URL.prototype.toString, this);
  }
});
var F$t = ct, ml = A, oS = W, k$t = nr, _R = URLSearchParams, bl = _R.prototype, B$t = ml(bl.append), sS = ml(bl.delete), j$t = ml(bl.forEach), U$t = ml([].push), Xg = new _R("a=1&a=2&b=3");
Xg.delete("a", 1);
Xg.delete("b", void 0);
Xg + "" != "a=2" && F$t(bl, "delete", function(t) {
  var r = arguments.length, e = r < 2 ? void 0 : arguments[1];
  if (r && e === void 0)
    return sS(this, t);
  var n = [];
  j$t(this, function(f, h) {
    U$t(n, { key: h, value: f });
  }), k$t(r, 1);
  for (var a = oS(t), i = oS(e), o = 0, s = 0, u = !1, l = n.length, c; o < l; )
    c = n[o++], u || c.key === a ? (u = !0, sS(this, c.key)) : s++;
  for (; s < l; )
    c = n[s++], c.key === a && c.value === i || B$t(this, c.key, c.value);
}, { enumerable: !0, unsafe: !0 });
var z$t = ct, CR = A, V$t = W, H$t = nr, PR = URLSearchParams, Jg = PR.prototype, G$t = CR(Jg.getAll), W$t = CR(Jg.has), uS = new PR("a=1");
(uS.has("a", 2) || !uS.has("a", void 0)) && z$t(Jg, "has", function(r) {
  var e = arguments.length, n = e < 2 ? void 0 : arguments[1];
  if (e && n === void 0)
    return W$t(this, r);
  var a = G$t(this, r);
  H$t(e, 1);
  for (var i = V$t(n), o = 0; o < a.length; )
    if (a[o++] === i)
      return !0;
  return !1;
}, { enumerable: !0, unsafe: !0 });
var q$t = z, Y$t = A, K$t = vt, Rv = URLSearchParams.prototype, X$t = Y$t(Rv.forEach);
q$t && !("size" in Rv) && K$t(Rv, "size", {
  get: function() {
    var r = 0;
    return X$t(this, function() {
      r++;
    }), r;
  },
  configurable: !0,
  enumerable: !0
});
var J$t = { exports: {} };
(function(t) {
  var r = function(e) {
    var n = Object.prototype, a = n.hasOwnProperty, i = Object.defineProperty || function(w, S, E) {
      w[S] = E.value;
    }, o, s = typeof Symbol == "function" ? Symbol : {}, u = s.iterator || "@@iterator", l = s.asyncIterator || "@@asyncIterator", c = s.toStringTag || "@@toStringTag";
    function f(w, S, E) {
      return Object.defineProperty(w, S, {
        value: E,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), w[S];
    }
    try {
      f({}, "");
    } catch {
      f = function(S, E, F) {
        return S[E] = F;
      };
    }
    function h(w, S, E, F) {
      var T = S && S.prototype instanceof I ? S : I, R = Object.create(T.prototype), P = new x(F || []);
      return i(R, "_invoke", { value: Y(w, E, P) }), R;
    }
    e.wrap = h;
    function v(w, S, E) {
      try {
        return { type: "normal", arg: w.call(S, E) };
      } catch (F) {
        return { type: "throw", arg: F };
      }
    }
    var d = "suspendedStart", $ = "suspendedYield", y = "executing", p = "completed", b = {};
    function I() {
    }
    function _() {
    }
    function M() {
    }
    var B = {};
    f(B, u, function() {
      return this;
    });
    var H = Object.getPrototypeOf, q = H && H(H(N([])));
    q && q !== n && a.call(q, u) && (B = q);
    var Z = M.prototype = I.prototype = Object.create(B);
    _.prototype = M, i(Z, "constructor", { value: M, configurable: !0 }), i(
      M,
      "constructor",
      { value: _, configurable: !0 }
    ), _.displayName = f(
      M,
      c,
      "GeneratorFunction"
    );
    function nt(w) {
      ["next", "throw", "return"].forEach(function(S) {
        f(w, S, function(E) {
          return this._invoke(S, E);
        });
      });
    }
    e.isGeneratorFunction = function(w) {
      var S = typeof w == "function" && w.constructor;
      return S ? S === _ || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (S.displayName || S.name) === "GeneratorFunction" : !1;
    }, e.mark = function(w) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(w, M) : (w.__proto__ = M, f(w, c, "GeneratorFunction")), w.prototype = Object.create(Z), w;
    }, e.awrap = function(w) {
      return { __await: w };
    };
    function k(w, S) {
      function E(R, P, G, Q) {
        var it = v(w[R], w, P);
        if (it.type === "throw")
          Q(it.arg);
        else {
          var ir = it.arg, ee = ir.value;
          return ee && typeof ee == "object" && a.call(ee, "__await") ? S.resolve(ee.__await).then(function(mr) {
            E("next", mr, G, Q);
          }, function(mr) {
            E("throw", mr, G, Q);
          }) : S.resolve(ee).then(function(mr) {
            ir.value = mr, G(ir);
          }, function(mr) {
            return E("throw", mr, G, Q);
          });
        }
      }
      var F;
      function T(R, P) {
        function G() {
          return new S(function(Q, it) {
            E(R, P, Q, it);
          });
        }
        return F = // If enqueue has been called before, then we want to wait until
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
        F ? F.then(
          G,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          G
        ) : G();
      }
      i(this, "_invoke", { value: T });
    }
    nt(k.prototype), f(k.prototype, l, function() {
      return this;
    }), e.AsyncIterator = k, e.async = function(w, S, E, F, T) {
      T === void 0 && (T = Promise);
      var R = new k(
        h(w, S, E, F),
        T
      );
      return e.isGeneratorFunction(S) ? R : R.next().then(function(P) {
        return P.done ? P.value : R.next();
      });
    };
    function Y(w, S, E) {
      var F = d;
      return function(R, P) {
        if (F === y)
          throw new Error("Generator is already running");
        if (F === p) {
          if (R === "throw")
            throw P;
          return j();
        }
        for (E.method = R, E.arg = P; ; ) {
          var G = E.delegate;
          if (G) {
            var Q = L(G, E);
            if (Q) {
              if (Q === b)
                continue;
              return Q;
            }
          }
          if (E.method === "next")
            E.sent = E._sent = E.arg;
          else if (E.method === "throw") {
            if (F === d)
              throw F = p, E.arg;
            E.dispatchException(E.arg);
          } else
            E.method === "return" && E.abrupt("return", E.arg);
          F = y;
          var it = v(w, S, E);
          if (it.type === "normal") {
            if (F = E.done ? p : $, it.arg === b)
              continue;
            return {
              value: it.arg,
              done: E.done
            };
          } else
            it.type === "throw" && (F = p, E.method = "throw", E.arg = it.arg);
        }
      };
    }
    function L(w, S) {
      var E = S.method, F = w.iterator[E];
      if (F === o)
        return S.delegate = null, E === "throw" && w.iterator.return && (S.method = "return", S.arg = o, L(w, S), S.method === "throw") || E !== "return" && (S.method = "throw", S.arg = new TypeError(
          "The iterator does not provide a '" + E + "' method"
        )), b;
      var T = v(F, w.iterator, S.arg);
      if (T.type === "throw")
        return S.method = "throw", S.arg = T.arg, S.delegate = null, b;
      var R = T.arg;
      if (!R)
        return S.method = "throw", S.arg = new TypeError("iterator result is not an object"), S.delegate = null, b;
      if (R.done)
        S[w.resultName] = R.value, S.next = w.nextLoc, S.method !== "return" && (S.method = "next", S.arg = o);
      else
        return R;
      return S.delegate = null, b;
    }
    nt(Z), f(Z, c, "Generator"), f(Z, u, function() {
      return this;
    }), f(Z, "toString", function() {
      return "[object Generator]";
    });
    function m(w) {
      var S = { tryLoc: w[0] };
      1 in w && (S.catchLoc = w[1]), 2 in w && (S.finallyLoc = w[2], S.afterLoc = w[3]), this.tryEntries.push(S);
    }
    function C(w) {
      var S = w.completion || {};
      S.type = "normal", delete S.arg, w.completion = S;
    }
    function x(w) {
      this.tryEntries = [{ tryLoc: "root" }], w.forEach(m, this), this.reset(!0);
    }
    e.keys = function(w) {
      var S = Object(w), E = [];
      for (var F in S)
        E.push(F);
      return E.reverse(), function T() {
        for (; E.length; ) {
          var R = E.pop();
          if (R in S)
            return T.value = R, T.done = !1, T;
        }
        return T.done = !0, T;
      };
    };
    function N(w) {
      if (w) {
        var S = w[u];
        if (S)
          return S.call(w);
        if (typeof w.next == "function")
          return w;
        if (!isNaN(w.length)) {
          var E = -1, F = function T() {
            for (; ++E < w.length; )
              if (a.call(w, E))
                return T.value = w[E], T.done = !1, T;
            return T.value = o, T.done = !0, T;
          };
          return F.next = F;
        }
      }
      return { next: j };
    }
    e.values = N;
    function j() {
      return { value: o, done: !0 };
    }
    return x.prototype = {
      constructor: x,
      reset: function(w) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = o, this.done = !1, this.delegate = null, this.method = "next", this.arg = o, this.tryEntries.forEach(C), !w)
          for (var S in this)
            S.charAt(0) === "t" && a.call(this, S) && !isNaN(+S.slice(1)) && (this[S] = o);
      },
      stop: function() {
        this.done = !0;
        var w = this.tryEntries[0], S = w.completion;
        if (S.type === "throw")
          throw S.arg;
        return this.rval;
      },
      dispatchException: function(w) {
        if (this.done)
          throw w;
        var S = this;
        function E(Q, it) {
          return R.type = "throw", R.arg = w, S.next = Q, it && (S.method = "next", S.arg = o), !!it;
        }
        for (var F = this.tryEntries.length - 1; F >= 0; --F) {
          var T = this.tryEntries[F], R = T.completion;
          if (T.tryLoc === "root")
            return E("end");
          if (T.tryLoc <= this.prev) {
            var P = a.call(T, "catchLoc"), G = a.call(T, "finallyLoc");
            if (P && G) {
              if (this.prev < T.catchLoc)
                return E(T.catchLoc, !0);
              if (this.prev < T.finallyLoc)
                return E(T.finallyLoc);
            } else if (P) {
              if (this.prev < T.catchLoc)
                return E(T.catchLoc, !0);
            } else if (G) {
              if (this.prev < T.finallyLoc)
                return E(T.finallyLoc);
            } else
              throw new Error("try statement without catch or finally");
          }
        }
      },
      abrupt: function(w, S) {
        for (var E = this.tryEntries.length - 1; E >= 0; --E) {
          var F = this.tryEntries[E];
          if (F.tryLoc <= this.prev && a.call(F, "finallyLoc") && this.prev < F.finallyLoc) {
            var T = F;
            break;
          }
        }
        T && (w === "break" || w === "continue") && T.tryLoc <= S && S <= T.finallyLoc && (T = null);
        var R = T ? T.completion : {};
        return R.type = w, R.arg = S, T ? (this.method = "next", this.next = T.finallyLoc, b) : this.complete(R);
      },
      complete: function(w, S) {
        if (w.type === "throw")
          throw w.arg;
        return w.type === "break" || w.type === "continue" ? this.next = w.arg : w.type === "return" ? (this.rval = this.arg = w.arg, this.method = "return", this.next = "end") : w.type === "normal" && S && (this.next = S), b;
      },
      finish: function(w) {
        for (var S = this.tryEntries.length - 1; S >= 0; --S) {
          var E = this.tryEntries[S];
          if (E.finallyLoc === w)
            return this.complete(E.completion, E.afterLoc), C(E), b;
        }
      },
      catch: function(w) {
        for (var S = this.tryEntries.length - 1; S >= 0; --S) {
          var E = this.tryEntries[S];
          if (E.tryLoc === w) {
            var F = E.completion;
            if (F.type === "throw") {
              var T = F.arg;
              C(E);
            }
            return T;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(w, S, E) {
        return this.delegate = {
          iterator: N(w),
          resultName: S,
          nextLoc: E
        }, this.method === "next" && (this.arg = o), b;
      }
    }, e;
  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    t.exports
  );
  try {
    regeneratorRuntime = r;
  } catch {
    typeof globalThis == "object" ? globalThis.regeneratorRuntime = r : Function("r", "regeneratorRuntime = r")(r);
  }
})(J$t);
class lS {
  constructor(r) {
    this.context = r;
  }
  renderLine(r, e, n, a, i, o) {
    this.context.lineWidth = i, this.context.moveTo(r, e), this.context.lineTo(n, a), this.context.strokeStyle = o, this.context.stroke();
  }
}
class uyt {
  constructor(r, e, n, a, i = new _p()) {
    this.tooltip = null, this.highlightedRow = -1, this.highlightedColumn = -1, this.animatingRows = !1, this.animatingCols = !1, this.clusteredHorizontal = !1, this.clusteredVertical = !1, this.lastZoomStatus = {
      k: 1,
      x: 0,
      y: 0
    }, this.settings = this.fillOptions(i), this.element = r;
    const o = new Pp();
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
    }, this.currentViewPort = this.originalViewPort, this.textWidth = this.settings.initialTextWidth, this.textHeight = this.settings.initialTextHeight, this.element.innerHTML = "", this.visElement = dt(this.element).append("canvas").attr("width", this.pixelRatio * this.settings.width).attr("height", this.pixelRatio * this.settings.height).attr("style", `width: ${this.settings.width}px; height: ${this.settings.height}px`).on("mouseover", (u) => this.tooltipMove(u)).on("mousemove", (u) => this.tooltipMove(u)).on("mouseout", (u) => this.tooltipMove(u)).on("click", (u) => this.click(u)), this.context = this.visElement.node().getContext("2d"), this.context.scale(this.pixelRatio, this.pixelRatio);
    const s = nx().extent([[0, 0], [this.settings.width, this.settings.height]]).scaleExtent([0.25, 12]).on("zoom", (u) => {
      this.zoomed(u.transform);
    });
    this.visElement.call(s), this.computeClusterRoots(), this.redraw();
  }
  fillOptions(r = void 0) {
    let e = new _p();
    return Object.assign(e, r);
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
  async cluster(r = "all") {
    const e = this.settings.animationsEnabled ? this.settings.animationDuration / 2 : 0, n = (l, c) => new Promise((f) => {
      let h;
      const v = (d) => {
        h === void 0 && (h = d);
        const $ = d - h, y = this.settings.transition($ / e);
        this.redraw(l, c, y), $ < e ? requestAnimationFrame(v) : f();
      };
      requestAnimationFrame(v);
    }), a = new Pp();
    let i = Array.from(Array(this.rows.length).keys()), o = new Array(i.length);
    if ((r === "all" || r === "rows") && !this.clusteredVertical) {
      this.clusteredVertical = !0, i = this.determineOrder(this.rowClusterRoot);
      for (const [h, v] of Object.entries(i))
        o[v] = Number.parseInt(h);
      const l = Array.from(Array(this.columns.length).keys());
      this.animatingRows = !0, await n(o, l), this.animatingRows = !1;
      let c = [];
      for (const h of i)
        c.push(this.values[h]);
      const f = [];
      for (const h of i)
        f.push(this.rows[h]);
      this.rows = f, this.values = c, this.valuesPerColor = a.orderPerColor(this.values);
    }
    let s = Array.from(Array(this.columns.length).keys()), u = new Array(s.length);
    if ((r === "all" || r === "columns") && !this.clusteredHorizontal) {
      this.clusteredHorizontal = !0, s = this.determineOrder(this.colClusterRoot);
      for (const [h, v] of Object.entries(s))
        u[v] = Number.parseInt(h);
      const l = Array.from(Array(this.rows.length).keys());
      this.animatingCols = !0, await n(l, u), this.animatingCols = !1;
      let c = [];
      for (const h of l) {
        let v = [];
        for (const d of s)
          v.push(this.values[h][d]);
        c.push(v);
      }
      const f = [];
      for (const h of s)
        f.push(this.columns[h]);
      this.columns = f, this.values = c, this.valuesPerColor = a.orderPerColor(this.values);
    }
    this.redraw();
  }
  computeClusterRoots() {
    let r = this.settings.clusteringAlgorithm, e = this.settings.reorderer, n = this.rows.map(
      (i, o) => new Cp(
        this.values[o].filter((s) => s.rowId == i.idx).map((s) => s.value),
        i.idx
      )
    );
    this.rowClusterRoot = e.reorder(r.cluster(n)), this.verticalNodesPerDepth = this.bfsNodesPerDepth(this.rowClusterRoot);
    let a = this.columns.map(
      (i, o) => new Cp(
        this.values.map((s) => s[o].value),
        i.idx
      )
    );
    this.colClusterRoot = e.reorder(r.cluster(a)), this.horizontalNodesPerDepth = this.bfsNodesPerDepth(this.colClusterRoot);
  }
  resize(r, e) {
    this.settings.width = r, this.settings.height = e, this.visElement.attr("height", this.pixelRatio * e), this.visElement.attr("width", this.pixelRatio * r), this.visElement.attr("style", `width: ${this.settings.width}px; height: ${this.settings.height}px`), this.context.scale(this.pixelRatio, this.pixelRatio), this.originalViewPort = {
      xTop: 0,
      yTop: 0,
      xBottom: r,
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
  toSVG(r = 14, e = 20, n = 2, a = 4) {
    const i = e;
    let o = "";
    for (const [d, $] of this.valuesPerColor)
      for (const [y, p] of $) {
        const b = p * (i + n), I = y * (i + n);
        o += `
                    <rect width="${i}" height="${i}" fill="${d}" x="${b}" y="${I}"></rect>
                `;
      }
    const u = new OffscreenCanvas(1, 1).getContext("2d");
    u.font = `${r}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
    const l = i * this.columns.length + n * (this.columns.length - 1) + a, c = Math.max((i - r) / 2, 0);
    let f = l;
    for (let d = 0; d < this.rows.length; d++) {
      const $ = (i + n) * d + c;
      o += `
                <text 
                    x="${l}" 
                    y="${$}" 
                    font-size="${r}" 
                    dominant-baseline="hanging" 
                    fill="black"
                    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
                >
                    ${this.rows[d].name}
                </text>
            `;
      const y = u.measureText(this.rows[d].name).width + l;
      y > f && (f = y);
    }
    const h = i * this.rows.length + n * (this.rows.length - 1) + a;
    let v = h;
    for (let d = 0; d < this.columns.length; d++) {
      const $ = (i + n) * d + c;
      o += `
                <text 
                    x="${$}" 
                    y="${h}" 
                    font-size="${r}" 
                    text-anchor="start" 
                    fill="black"
                    transform="rotate(90, ${$}, ${h})"
                    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
                >
                    ${this.columns[d].name}
                </text>
            `;
      const y = u.measureText(this.columns[d].name).width + h;
      y > v && (v = y);
    }
    return `
            <svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(f)}" height="${Math.ceil(v)}">
                ${o}
            </svg>
        `;
  }
  /**
   * Extracts a linear order from a dendrogram by following all branches up to leaves in a depth-first ordering.
   *
   * @param treeNode Root of a dendrogram for which a linear leaf ordering needs to be extracted.
   */
  determineOrder(r) {
    return r.values.map((e) => e.id);
  }
  /**
   * Determines the dimensions of one square based upon the current width and height-settings and the amount of rows
   * and columns currently set to be visualized.
   */
  determineSquareWidth(r = this.currentViewPort, e = this.textWidth, n = this.textHeight) {
    const a = this.determineDendrogramWidth(), i = r.xBottom - r.xTop - a - this.columns.length * this.settings.squarePadding - e, o = r.yBottom - r.yTop - a - this.rows.length * this.settings.squarePadding - n;
    let s = Math.max(1, i / this.columns.length), u = Math.max(1, o / this.rows.length);
    return Math.min(s, u);
  }
  determineDendrogramWidth() {
    return this.settings.dendrogramEnabled ? this.settings.dendrogramWidth * this.lastZoomStatus.k : 0;
  }
  computeTextStartX(r = this.currentViewPort, e = this.textWidth, n = this.textHeight) {
    return r.xTop + this.determineDendrogramWidth() + this.determineSquareWidth(r, e, n) * this.columns.length + this.settings.squarePadding * (this.columns.length - 1) + this.settings.visualizationTextPadding;
  }
  computeTextStartY(r = this.currentViewPort, e = this.textWidth, n = this.textHeight) {
    return r.yTop + this.determineDendrogramWidth() + this.determineSquareWidth(r, e, n) * this.rows.length + this.settings.squarePadding * (this.rows.length - 1) + this.settings.visualizationTextPadding;
  }
  zoomed({ k: r, x: e, y: n }) {
    this.lastZoomStatus = { k: r, x: e, y: n };
    const a = e + this.computeTextStartX(
      this.originalViewPort,
      this.settings.initialTextWidth,
      this.settings.initialTextHeight
    ) * r, i = n + this.computeTextStartY(
      this.originalViewPort,
      this.settings.initialTextWidth,
      this.settings.initialTextHeight
    ) * r, o = (s, u) => s > u ? u : r >= 1 ? Math.min(s, u) : Math.max(s, u);
    this.currentViewPort = {
      xTop: e + this.originalViewPort.xTop * r,
      yTop: n + this.originalViewPort.yTop * r,
      xBottom: o(e + this.originalViewPort.xBottom * r, this.originalViewPort.xBottom),
      yBottom: o(n + this.originalViewPort.yBottom * r, this.originalViewPort.yBottom)
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
  redraw(r = Array.from(Array(this.rows.length).keys()), e = Array.from(Array(this.columns.length).keys()), n = -1) {
    this.redrawGrid(r, e, n), this.redrawRowTitles(r, n), this.redrawColumnTitles(e, n), this.redrawDendrogram(n);
  }
  redrawGrid(r, e, n) {
    n === -1 && (n = 0);
    let a = this.determineSquareWidth();
    const i = this.determineDendrogramWidth();
    this.context.clearRect(0, 0, this.settings.width, this.settings.height);
    for (const [o, s] of this.valuesPerColor) {
      this.context.beginPath(), this.context.fillStyle = o;
      for (const [u, l] of s) {
        const c = this.currentViewPort.xTop + i + l * (a + this.settings.squarePadding), f = this.currentViewPort.yTop + i + u * (a + this.settings.squarePadding), h = this.currentViewPort.xTop + i + e[l] * (a + this.settings.squarePadding), v = this.currentViewPort.yTop + i + r[u] * (a + this.settings.squarePadding), d = h - c, $ = v - f;
        let y = c + d * n, p = f + $ * n, b = y + (a + this.settings.squarePadding), I = p + (a + this.settings.squarePadding);
        b < 0 || y > this.settings.width || I < 0 || p > this.settings.height || (this.settings.highlightSelection && u == this.highlightedRow && l == this.highlightedColumn && (this.context.save(), this.context.fillStyle = this.settings.maxColor, this.context.fillRect(
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
  ellipsizeString(r, e) {
    if (this.context.measureText(r).width > e) {
      let a = r.length, i = r.substr(0, a) + "...";
      for (; this.context.measureText(i).width > e && a > 0; )
        a--, i = r.substr(0, a) + "...";
      return a === 0 ? "" : i;
    } else
      return r;
  }
  redrawRowTitles(r, e) {
    e === -1 && (e = 0);
    const n = this.determineSquareWidth(), a = this.determineDendrogramWidth(), i = Math.max(Math.floor((this.settings.fontSize + 12) / (n + this.settings.squarePadding)), 1), o = this.computeTextStartX();
    let s = Math.max((n - this.settings.fontSize) / 2, 0);
    this.context.save(), this.context.fillStyle = this.settings.labelColor, this.context.textBaseline = "top", this.context.textAlign = "start", this.context.font = `${this.settings.fontSize}px Arial, sans-serif`;
    for (let u = 0; u < this.rows.length; u += i) {
      const l = this.rows[u];
      this.settings.highlightSelection && u == this.highlightedRow && (this.context.save(), this.context.fillStyle = this.settings.highlightFontColor, this.context.font = `${this.settings.highlightFontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`, s = Math.max((n - this.settings.highlightFontSize) / 2, 0));
      const c = this.currentViewPort.yTop + a + (n + this.settings.squarePadding) * u + s, h = this.currentViewPort.yTop + a + (n + this.settings.squarePadding) * r[u] + s - c, v = c + h * e;
      this.context.fillText(
        this.ellipsizeString(l.name, this.textWidth),
        o,
        v
      ), this.settings.highlightSelection && u == this.highlightedRow && this.context.restore();
    }
    this.context.restore();
  }
  redrawColumnTitles(r, e) {
    e === -1 && (e = 0);
    let n = this.determineSquareWidth();
    const a = this.determineDendrogramWidth();
    let i = Math.max(Math.floor((this.settings.fontSize + 12) / (n + this.settings.squarePadding)), 1), o = this.computeTextStartY(), s = Math.max((n - this.settings.fontSize) / 2, 0);
    this.context.save(), this.context.rotate(90 * Math.PI / 180), this.context.fillStyle = this.settings.labelColor, this.context.textBaseline = "bottom", this.context.textAlign = "start", this.context.font = `${this.settings.fontSize}px Arial, sans-serif`;
    for (let u = 0; u < this.columns.length; u += i) {
      const l = this.columns[u];
      this.settings.highlightSelection && u == this.highlightedColumn && (this.context.save(), this.context.fillStyle = this.settings.highlightFontColor, this.context.font = `${this.settings.highlightFontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`, s = Math.max((n - this.settings.highlightFontSize) / 2, 0));
      const c = -(this.currentViewPort.xTop + a + (n + this.settings.squarePadding) * u + s), h = -(this.currentViewPort.xTop + a + (n + this.settings.squarePadding) * r[u] + s) - c, v = c + h * e;
      this.context.fillText(
        this.ellipsizeString(l.name, this.textHeight),
        o,
        v
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
  bfsNodesPerDepth(r) {
    const e = [], n = [];
    for (n.push([r, 0]); n.length > 0; ) {
      const [a, i] = n.shift();
      e.length <= i && e.push([]), e[i].push(a), a.leftChild && n.push([a.leftChild, i + 1]), a.rightChild && n.push([a.rightChild, i + 1]);
    }
    return e;
  }
  redrawDendrogram(r) {
    this.settings.dendrogramEnabled && (this.redrawHorizontalDendrogram(r), this.redrawVerticalDendrogram(r));
  }
  computeDendrogramColor(r, e, n) {
    return n === -1 || !e ? r ? this.settings.dendrogramColor : "#d3d3d3" : Dv(Be("#d3d3d3"), Be(this.settings.dendrogramColor))(n);
  }
  redrawVerticalDendrogram(r) {
    this.context.save();
    const e = this.computeDendrogramColor(this.clusteredVertical, this.animatingRows, r), n = this.determineSquareWidth(), a = this.settings.dendrogramWidth * this.lastZoomStatus.k, i = new lS(this.context), o = this.currentViewPort.yTop + a + n / 2, s = /* @__PURE__ */ new Map(), u = this.determineOrder(this.rowClusterRoot);
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
      for (let h = 0; h < this.verticalNodesPerDepth[f].length; h += 2) {
        const v = this.verticalNodesPerDepth[f][h], d = this.verticalNodesPerDepth[f][h + 1], $ = v.parent, [y, p] = s.get(v.id), [b, I] = s.get(d.id);
        if (this.context.beginPath(), i.renderLine(y, p, c, p, this.settings.dendrogramLineWidth, e), i.renderLine(b, I, c, I, this.settings.dendrogramLineWidth, e), i.renderLine(c, p, c, I, this.settings.dendrogramLineWidth, e), this.context.closePath(), $) {
          const _ = Math.min(p, I) + Math.abs(p - I) / 2;
          s.set($.id, [c, _]);
        }
        c -= l;
      }
    if (!this.clusteredVertical) {
      this.context.rotate(-(90 * Math.PI) / 180), this.context.fillStyle = this.settings.labelColor;
      const f = 24 * this.lastZoomStatus.k;
      this.context.font = `${f}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
      const h = this.context.measureText("Click to cluster").width;
      this.context.fillText(
        "Click to cluster",
        -(this.currentViewPort.yTop + a + this.rows.length * (n + this.settings.squarePadding) / 2) - h / 2,
        this.currentViewPort.xTop + a / 2 + f / 2
      );
    }
    this.context.restore();
  }
  redrawHorizontalDendrogram(r) {
    this.context.save();
    const e = this.computeDendrogramColor(this.clusteredHorizontal, this.animatingCols, r), n = this.determineSquareWidth(), a = this.settings.dendrogramWidth * this.lastZoomStatus.k, i = new lS(this.context), o = this.currentViewPort.xTop + n / 2 + a, s = /* @__PURE__ */ new Map(), u = this.determineOrder(this.colClusterRoot);
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
      for (let h = 0; h < this.horizontalNodesPerDepth[f].length; h += 2) {
        const v = this.horizontalNodesPerDepth[f][h], d = this.horizontalNodesPerDepth[f][h + 1], $ = v.parent, [y, p] = s.get(v.id), [b, I] = s.get(d.id);
        if (this.context.beginPath(), i.renderLine(y, p, y, c, this.settings.dendrogramLineWidth, e), i.renderLine(b, I, b, c, this.settings.dendrogramLineWidth, e), i.renderLine(y, c, b, c, this.settings.dendrogramLineWidth, e), this.context.closePath(), $) {
          const _ = Math.min(y, b) + Math.abs(y - b) / 2;
          s.set($.id, [_, c]);
        }
        c -= l;
      }
    if (!this.clusteredHorizontal) {
      this.context.fillStyle = this.settings.labelColor;
      const f = 24 * this.lastZoomStatus.k;
      this.context.font = `${f}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
      const h = this.context.measureText("Click to cluster").width;
      this.context.fillText(
        "Click to cluster",
        this.currentViewPort.xTop + a + this.columns.length * (n + this.settings.squarePadding) / 2 - h / 2,
        this.currentViewPort.yTop + a / 2 + f / 2
      );
    }
    this.context.restore();
  }
  initTooltip() {
    return dt("body").append("div").attr("class", "tip").style("position", "absolute").style("z-index", "10").style("visibility", "hidden");
  }
  findRowAndColForPosition(r, e) {
    const n = this.determineDendrogramWidth(), a = r - this.currentViewPort.xTop - n, i = e - this.currentViewPort.yTop - n, o = this.determineSquareWidth(), s = Math.floor(i / (o + this.settings.squarePadding)), u = Math.floor(a / (o + this.settings.squarePadding));
    return [s, u];
  }
  tooltipMove(r) {
    const e = r.target.getBoundingClientRect(), [n, a] = this.findRowAndColForPosition(r.clientX - e.left, r.clientY - e.top);
    if (n < 0 || n >= this.rows.length || a < 0 || a >= this.columns.length) {
      this.settings.enableTooltips && this.tooltip && this.tooltip.style("visibility", "hidden"), this.highlightedRow = -1, this.highlightedColumn = -1, this.settings.highlightSelection && this.redraw();
      return;
    }
    this.highlightedRow = n, this.highlightedColumn = a, this.settings.highlightSelection && this.redraw(), this.settings.enableTooltips && this.tooltip && this.tooltip.html(this.settings.getTooltip(this.values[n][a], this.rows[n], this.columns[a])).style("top", r.pageY + 10 + "px").style("left", r.pageX + 10 + "px").style("visibility", "visible");
  }
  /**
   * Determines if a click occurred on one of the dendrograms and if clustering should be applied to the heatmap.
   *
   * @param event
   * @private
   */
  click(r) {
    if (!this.settings.dendrogramEnabled)
      return;
    const e = this.determineDendrogramWidth(), n = this.determineSquareWidth(), a = r.target.getBoundingClientRect(), i = r.clientX - a.left, o = r.clientY - a.top;
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
class lyt {
  getDistance(r) {
    let e = [];
    for (let n = 0; n < r.length; n++) {
      let a = [];
      for (let i = 0; i <= n; i++)
        a.push(this.getPearsonCorrelationBetween2Samples(r[n], r[i]));
      e.push(a);
    }
    return e;
  }
  getPearsonCorrelationBetween2Samples(r, e) {
    const n = (u, l) => u + l, a = r.reduce(n, 0) / r.length, i = e.reduce(n, 0) / e.length;
    let o = 0, s = 0;
    for (let u = 0; u < r.length; u++)
      o += (r[u] - a) * (e[u] - i), s += Math.sqrt(Math.pow(r[u] - a, 2)) * Math.sqrt(Math.pow(e[u] - i, 2));
    return 1 - o / s;
  }
}
class bi {
}
bi.DEFAULT_COLORS = [
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
bi.FIXED_COLORS = [
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
bi.MATERIAL_DESIGN_COLORS = [
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
class Z$t {
  /**
   * Hash function for strings from http://stackoverflow.com/a/15710692/865696
   */
  static stringHash(r) {
    return r.split("").reduce(function(e, n) {
      let a = (e << 5) - e + n.charCodeAt(0);
      return a & a;
    }, 0);
  }
}
class cS extends xi {
  constructor() {
    super(...arguments), this.radius = 300, this.breadcrumbWidth = 200, this.className = "sunburst", this.useFixedColors = !1, this.colorPalette = bi.DEFAULT_COLORS, this.fixedColorPalette = bi.FIXED_COLORS, this.enableBreadcrumbs = !0, this.levels = 4, this.animationDuration = 1e3, this.rerootCallback = () => {
    }, this.fixedColorHash = (r) => Z$t.stringHash(r.name), this.getTooltip = (r) => `
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
                    ${this.getTooltipTitle(r)}
                </div>
                <a>
                    ${this.getTooltipText(r)}
                </a>
            </div>
        `, this.getTooltipTitle = (r) => r.name, this.getTooltipText = (r) => `${r.count} hits`, this.getLabel = (r) => r.name === "empty" ? "" : r.name, this.getTitleText = this.getLabel;
  }
}
const MR = class NR {
  /**
   * Preprocesses the given Node data structure.
   *
   * @param data A node-like structure that should be converted to proper DataNode-objects and that should be prepared
   * for use in the Sunburst visualization.
   */
  preprocessData(r) {
    const e = [];
    if (r.children)
      for (const n of r.children)
        e.push(this.preprocessData(n));
    return e.length > 0 && r.count !== 0 && e.push(new Ss(-1, "empty", [], r.count, r.selfCount)), new Ss(
      r.id || ++NR.idCounter,
      r.name || "",
      e,
      r.count,
      r.selfCount,
      r.extra
    );
  }
};
MR.idCounter = 0;
let Q$t = MR;
class wl {
  static initTooltip() {
    return dt("body").append("div").attr("class", "tip").style("position", "absolute").style("z-index", "10").style("visibility", "hidden");
  }
}
class ii {
  /**
   * Checks if p is a parent of c. If the child is situated deeper in the hierarchy than maxLevels, false is returned.
   *
   * @param p Possible parent node.
   * @param c Possible child node.
   * @param maxLevels Maximum depth for the child node in the hierarchy.
   */
  static isParentOf(r, e, n) {
    return e.depth >= n ? !1 : r === e ? !0 : r.children ? r.children.some((a) => ii.isParentOf(a, e, n)) : !1;
  }
}
class Sl {
  /*
   * Returns the readable text color based on the brightness of a given background color.
   */
  static getReadableColorFor(r) {
    let e = "#000";
    try {
      e = Sl.brightness(ui(r)) < 125 ? "#eee" : "#000";
    } catch {
    }
    return e;
  }
  /*
   * Returns the brightness of an rgb-color.
   * from: http:// www.w3.org/WAI/ER/WD-AERT/#color-contrast
   */
  static brightness({ r, g: e, b: n }) {
    return r * 0.299 + e * 0.587 + n * 0.114;
  }
}
class cyt {
  constructor(r, e, n = new cS()) {
    this.element = r, this.colorCounter = -1, this.currentMaxLevel = 4, this.arcData = [], this.textData = [], this.previousRoot = null, this.previousMaxLevel = this.currentMaxLevel, this.settings = this.fillOptions(n);
    const i = new Q$t().preprocessData(e);
    this.settings.enableTooltips && (this.tooltip = wl.initTooltip()), this.currentMaxLevel = this.settings.levels, this.xScale = de().range([0, 2 * Math.PI]), this.yScale = de().domain([0, 1]).range([0, this.settings.radius]);
    const o = zn(i);
    o.sum((l) => l.children.length > 0 ? 0 : l.selfCount);
    const s = pM();
    this.data = s(o).descendants(), this.arc = oh().startAngle((l) => Math.max(0, Math.min(Math.PI * 2, this.xScale(l.x0)))).endAngle((l) => Math.max(0, Math.min(Math.PI * 2, this.xScale(l.x1)))).innerRadius((l) => Math.max(0, l.y0 ? this.yScale(l.y0) : l.y0)).outerRadius((l) => Math.max(0, this.yScale(l.y1) + 1)), this.initCss(), this.element.innerHTML = "", this.breadCrumbs = dt(this.element).append("div").attr("id", Math.floor(Math.random() * 2 ** 16) + "-breadcrumbs").attr("class", "sunburst-breadcrumbs").append("ul");
    const u = dt(this.element).append("svg").attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`).attr("width", this.settings.width).attr("height", this.settings.height).attr("overflow", "hidden").style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");
    u.append("style").attr("type", "text/css").html(".hidden{ visibility: hidden;}"), this.visGElement = u.append("g").attr("transform", "translate(" + this.settings.radius + "," + this.settings.radius + ")"), this.reset();
  }
  /**
   * Reset the current view of the visualization. The visualization will completely be reset to its initial state.
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
  reroot(r, e = !0) {
    const n = this.data.find((a) => a.data.id === r);
    n && this.click(n, e);
  }
  fillOptions(r = void 0) {
    const e = new cS();
    return Object.assign(e, r);
  }
  maxY(r) {
    return r.children ? Math.max(...r.children.map((e) => this.maxY(e))) : r.y1;
  }
  /**
   * Calculates the color of an arc based on the color of his children.
   *
   * @param d The node for which we want the color.
   * @return string The calculated color in HTML color representation.
   */
  color(r) {
    if (r.name === "empty")
      return "white";
    if (this.settings.useFixedColors)
      return this.settings.fixedColorPalette[Math.abs(this.settings.fixedColorHash(r)) % this.settings.fixedColorPalette.length];
    if (r.children.length > 0) {
      const e = r.children.map((o) => this.color(o)), n = ja(e[0]), a = ja(e[1]);
      return r.children.length === 1 || r.children[1].name === "empty" ? ja(n.h, n.s, n.l * 0.98) : ja((n.h + a.h) / 2, (n.s + a.s) / 2, (n.l + a.l) / 2);
    }
    return r.extra.color || (r.extra.color = this.getColor()), r.extra.color;
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
    let r = this.settings.className;
    this.element.className += " " + r;
    const e = this.element.ownerDocument.createElement("style");
    e.appendChild(this.element.ownerDocument.createTextNode(`
.${r} {
    font-family: Roboto,'Helvetica Neue',Helvetica,Arial,sans-serif;
    width: ${this.settings.width + this.settings.breadcrumbWidth}px;
}
.${r} .sunburst-breadcrumbs {
    width: 176px;
    float: right;
    margin-right: 15px;
    margin-top: 10px;
    padding-left: 5px;
}
.${r} .sunburst-breadcrumbs ul {
    padding-left: 0;
    list-style: none;
}
.${r} .sunburst-breadcrumbs .crumb {
    margin-bottom: 5px;
    cursor: pointer;
}
.${r} .sunburst-breadcrumbs .crumb svg {
    float: left;
    margin-right: 3px;
}
.${r} .sunburst-breadcrumbs .crumb p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0;
    font-size: 14px;
}
.${r} .sunburst-breadcrumbs .crumb .percentage {
    font-size: 11px;
}`)), this.element.ownerDocument.head.appendChild(e);
  }
  /**
   * Interpolate the scales! Defines new scales based on the clicked item.
   *
   * @param d The clicked item
   * @return new scales
   */
  arcTween(r, e) {
    let n = Math.min(this.maxY(r), r.y0 + e.settings.levels * (r.y1 - r.y0)), a = _n(e.xScale.domain(), [r.x0, r.x1]), i = _n(e.yScale.domain(), [r.y0, n]), o = _n(e.yScale.range(), [r.y0 ? 20 : 0, e.settings.radius]);
    return (s) => (u) => (e.xScale.domain(a(u)), e.yScale.domain(i(u)).range(o(u)), e.arc(s));
  }
  tooltipIn(r, e) {
    this.settings.enableTooltips && this.tooltip && e.depth < this.currentMaxLevel && e.data.name !== "empty" && this.tooltip.html(this.settings.getTooltip(e.data)).style("top", r.pageY + 10 + "px").style("left", r.pageX + 10 + "px").style("visibility", "visible");
  }
  tooltipMove(r, e) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("top", r.pageY + 10 + "px").style("left", r.pageX + 10 + "px");
  }
  tooltipOut(r, e) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("visibility", "hidden");
  }
  /**
   * Compute the amount of vertical space that's available for text (i.e. the maximum text height) for a specific node
   * in the sunburst visualization.
   *
   * @param d The node in the sunburst visualization for which the vertical space should be computed.
   * @return The available vertical space in pixels.
   */
  computeAvailableSpace(r) {
    const e = 2 * Math.max(0, this.yScale(r.y1) + 1) * Math.PI, n = Math.max(
      0,
      Math.min(Math.PI * 2, this.xScale(r.x1)) - Math.max(0, Math.min(Math.PI * 2, this.xScale(r.x0)))
    );
    return e * (n / (2 * Math.PI));
  }
  /**
   * Defines what happens after a node is clicked.
   *
   * @param d The data object of the clicked arc
   * @param triggerCallback Should the rerootCallback function be triggered for this click?
   */
  click(r, e = !0) {
    r.data.name === "empty" || this.previousRoot && this.previousRoot.data.id === r.data.id || (this.previousRoot = r, this.settings.enableBreadcrumbs && this.setBreadcrumbs(r), this.settings.rerootCallback && e && this.settings.rerootCallback(r.data), this.currentMaxLevel = r.depth + this.settings.levels, this.renderArcs(r), this.renderText(r));
  }
  async renderArcs(r) {
    const e = this.data.filter((i) => ii.isParentOf(r, i, this.currentMaxLevel + 2));
    r.parent && e.push(r.parent);
    const n = e.filter((i) => !this.arcData.includes(i)), a = this.arcData.concat(...n);
    this.visGElement.selectAll("path").data([]).exit().remove(), this.path = this.visGElement.selectAll("path").data(a).enter().insert("path").attr("class", "arc").attr("id", (i, o) => "path-" + o).attr("d", this.arc).attr("fill-rule", "evenodd").style("fill", (i) => this.color(i.data)).attr("fill-opacity", (i) => i.depth >= this.previousMaxLevel ? 0.2 : 1).on("click", (i, o) => {
      o.depth < this.currentMaxLevel && this.click(o);
    }).on("mouseover", (i, o) => this.tooltipIn(i, o)).on("mousemove", (i, o) => this.tooltipMove(i, o)).on("mouseout", (i, o) => this.tooltipOut(i, o)), await new Promise((i) => {
      this.path.transition().duration(this.settings.animationDuration).attrTween("d", this.arcTween(r, this)).attr("class", (o) => o.depth >= this.currentMaxLevel ? "arc toHide" : "arc").attr("fill-opacity", (o) => o.depth >= this.currentMaxLevel ? 0.2 : 1).on("end", () => {
        i();
      });
    }), this.previousMaxLevel = this.currentMaxLevel, this.arcData = e;
  }
  async renderText(r) {
    const e = this.data.filter((u) => ii.isParentOf(r, u, this.currentMaxLevel)), n = e.filter((u) => !this.textData.includes(u)), a = this.textData.concat(...n);
    r.parent && a.splice(a.indexOf(r.parent), 1);
    const i = this, o = typeof OffscreenCanvas < "u";
    let s;
    o && (s = new OffscreenCanvas(1, 1).getContext("2d"), s.font = s.font = "16px 'Helvetica Neue', Helvetica, Arial, sans-serif"), this.visGElement.selectAll("text").data([]).exit().remove(), this.text = this.visGElement.selectAll("text").data(a).enter().append("text").style("fill", (u) => Sl.getReadableColorFor(this.color(u.data))).style("fill-opacity", 0).style("font-family", "font-family: Helvetica, 'Super Sans', sans-serif").style("pointer-events", "none").attr("dy", ".2em").text((u) => this.settings.getLabel(u.data)).style("font-size", function(u) {
      const l = o ? s.measureText(this.textContent).width : this.getComputedTextLength();
      return Math.floor(Math.min(i.settings.radius / i.settings.levels / l * 10 + 1, 12)) + "px";
    }), await new Promise((u) => {
      this.text.transition().duration(this.settings.animationDuration).attrTween("text-anchor", (l) => (c) => this.xScale(l.x0 + (l.x1 - l.x0) / 2) > Math.PI ? "end" : "start").attrTween("dx", (l) => (c) => this.xScale(l.x0 + (l.x1 - l.x0) / 2) > Math.PI ? "-4px" : "4px").attrTween("transform", (l) => (c) => {
        let f = this.xScale(l.x0 + (l.x1 - l.x0) / 2) * 180 / Math.PI - 90;
        return `rotate(${f})translate(${this.yScale(l.y0)})rotate(${f > 90 ? -180 : 0})`;
      }).styleTween("fill-opacity", function(l) {
        const c = Number.parseInt(dt(this).style("font-size").replace("px", ""));
        return (f) => i.computeAvailableSpace(l) > c ? f.toString() : "0";
      }).on("end", function(l) {
        const c = i.computeAvailableSpace(l), f = dt(this);
        f.style(
          "visibility",
          c > Number.parseInt(f.style("font-size").replace("px", "")) && ii.isParentOf(r, l, i.currentMaxLevel) ? "visible" : "hidden"
        ), u();
      });
    }), this.textData = e;
  }
  setBreadcrumbs(r) {
    let e = [], n = r;
    for (; n; )
      e.push(n), n = n.parent;
    e.reverse().shift();
    const a = oh().innerRadius(0).outerRadius(15).startAngle(0).endAngle((i) => 2 * Math.PI * i.data.count / i.parent.data.count);
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
class fS extends xi {
  constructor() {
    super(...arguments), this.className = "treemap", this.levels = void 0, this.labelHeight = 10, this.colorRoot = "#104B7D", this.colorLeaf = "#fdffcc", this.colorBreadcrumbs = "#FF8F00", this.rerootCallback = () => {
    }, this.getBreadcrumbTooltip = (r) => r.name, this.getTooltip = (r) => `
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
                    ${this.getTooltipTitle(r)}
                </div>
                <a>
                    ${this.getTooltipText(r)}
                </a>
            </div>
        `, this.getTooltipTitle = (r) => r.name, this.getTooltipText = (r) => `${r.count} hits`, this.getLabel = (r) => r.name, this.getLevel = (r) => r.depth;
  }
}
const DR = class LR {
  preprocessData(r) {
    const e = [];
    if (r.children)
      for (const n of r.children)
        e.push(this.preprocessData(n));
    return new Ss(
      r.id || ++LR.idCounter,
      r.name || "",
      e,
      r.count,
      r.selfCount,
      r.extra
    );
  }
};
DR.idCounter = 0;
let tyt = DR;
class fyt {
  constructor(r, e, n = new fS()) {
    var o;
    this.element = r, this.childParentRelations = /* @__PURE__ */ new Map(), this.nodeId = 0, this.settings = this.fillOptions(n), this.settings.enableTooltips && (this.tooltip = wl.initTooltip()), this.initCss();
    const a = new tyt(), i = zn(a.preprocessData(e));
    i.sum((s) => s.children.length > 0 ? 0 : s.count), i.sort((s, u) => u.value - s.value), this.partition = OM(), this.partition.size([this.settings.width + 1, this.settings.height + 1]).paddingTop(this.settings.labelHeight), this.data = this.partition(i).descendants(), this.settings.levels || (this.settings.levels = this.data[0].height);
    for (const s of this.data)
      this.childParentRelations.set(s.data, (o = s.parent) == null ? void 0 : o.data);
    this.currentRoot = this.data[0], this.colorScale = de().domain([0, this.settings.levels]).range([this.settings.colorRoot, this.settings.colorLeaf]).interpolate(Dv), this.breadCrumbs = dt(this.element).append("div").attr("class", "breadcrumbs").style("position", "relative").style("width", this.settings.width + "px").style("height", "20px").style("background-color", this.settings.colorBreadcrumbs), this.treemap = dt(this.element).append("div").style("position", "relative").style("width", this.settings.width + "px").style("height", this.settings.height + "px"), this.render(this.currentRoot);
  }
  resize(r, e) {
    this.settings.width = r, this.settings.height = e, this.partition.size([r + 1, e + 1]), this.breadCrumbs.style("width", this.settings.width + "px"), this.treemap.style("width", this.settings.width + "px"), this.treemap.style("height", this.settings.height + "px"), this.render(this.currentRoot, !1);
  }
  /**
   * Change the root of the visualization to the node with a given ID. Note that the reroot will only be executed if
   * a node with the given ID exists. If no node was found, nothing happens.
   *
   * @param nodeId ID of the node that should now become the new root of the tree.
   * @param triggerCallback Should the `rerootCallback` be triggered for this node?
   */
  reroot(r, e = !0) {
    const n = this.data.find((a) => a.data.id === r);
    n && this.render(n, e);
  }
  reset() {
    this.render(this.data[0], !1);
  }
  fillOptions(r = void 0) {
    const e = new fS();
    return Object.assign(e, r);
  }
  initCss() {
    let r = this.settings.className;
    this.element.className += " " + r;
    const e = this.element.ownerDocument.createElement("style");
    e.appendChild(this.element.ownerDocument.createTextNode(`
            .${r} {
                font-family: Arial,sans-serif;
            }
            .${r} .node {
                font-size: 9px;
                line-height: 10px;
                overflow: hidden;
                position: absolute;
                text-indent: 2px;
                text-align: center;
                text-overflow: ellipsis;
                cursor: pointer;
            }
            .${r} .node:hover {
                outline: 1px solid white;
            }
            .${r} .breadcrumbs {
                font-size: 11px;
                line-height: 20px;
                padding-left: 5px;
                font-weight: bold;
                color: white;
                box-sizing: border-box;
            }
            .full-screen .${r} .breadcrumbs {
                width: 100% !important;
            }
            .${r} .crumb {
                cursor: pointer;
            }
            .${r} .crumb .link:hover {
                text-decoration: underline;
            }
            .${r} .breadcrumbs .crumb + .crumb::before {
                content: " > ";
                cursor: default;
            }
        `)), this.element.ownerDocument.head.append(e);
  }
  render(r, e = !0) {
    this.currentRoot = r, this.setBreadcrumbs();
    const n = zn(r.data);
    n.sum((o) => o.children.length > 0 ? 0 : o.count), n.sort((o, s) => s.value - o.value);
    let a = this.treemap.selectAll(".node").data(
      this.partition(n).descendants(),
      (o) => o.data.id || (o.data.id = ++this.nodeId)
    );
    a.enter().append("div").attr("class", "node").style("background", (o) => this.colorScale(this.settings.getLevel(o))).style("color", (o) => Sl.getReadableColorFor(this.colorScale(this.settings.getLevel(o)).toString())).style("left", "0px").style("top", "0px").style("width", "0px").style("height", "0px").text((o) => this.settings.getLabel(o.data)).on("click", (o, s) => this.render(s)).on("contextmenu", (o, s) => {
      o.preventDefault(), this.currentRoot.parent && this.render(this.currentRoot.parent);
    }).on("mouseover", (o, s) => this.tooltipIn(o, s)).on("mousemove", (o, s) => this.tooltipMove(o, s)).on("mouseout", (o, s) => this.tooltipOut(o, s)).merge(a).order().transition().call((o) => {
      o.style("left", (s) => s.x0 + "px"), o.style("top", (s) => s.y0 + "px"), o.style("width", (s) => Math.max(0, s.x1 - s.x0 - 1) + "px"), o.style("height", (s) => Math.max(0, s.y1 - s.y0 - 1) + "px");
    }), a.exit().remove(), e && this.settings.rerootCallback(this.currentRoot.data);
  }
  setBreadcrumbs() {
    let r = [], e = this.currentRoot.data;
    for (; e; )
      r.push(e), e = this.childParentRelations.get(e);
    r.reverse(), this.breadCrumbs.html(""), this.breadCrumbs.selectAll(".crumb").data(r).enter().append("span").attr("class", "crumb").attr("title", (n) => this.settings.getBreadcrumbTooltip(n)).html((n) => `<span class='link'>${n.name}</span>`).on("click", (n, a) => {
      this.render(this.data.filter((i) => i.data.id === a.id)[0]);
    });
  }
  tooltipIn(r, e) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.html(this.settings.getTooltip(e.data)).style("top", r.pageY + 10 + "px").style("left", r.pageX + 10 + "px").style("visibility", "visible");
  }
  tooltipMove(r, e) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("top", r.pageY + 10 + "px").style("left", r.pageX + 10 + "px");
  }
  tooltipOut(r, e) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("visibility", "hidden");
  }
}
const ryt = $u(kM);
class hS extends xi {
  constructor() {
    super(...arguments), this.minNodeSize = 2, this.maxNodeSize = 105, this.enableExpandOnClick = !0, this.enableAutoExpand = !1, this.autoExpandValue = 0.8, this.levelsToExpand = 2, this.enableRightClick = !0, this.enableInnerArcs = !0, this.enableLabels = !0, this.nodeDistance = 180, this.animationDuration = 500, this.colorProviderLevels = 1, this.nodeFillColor = (r) => r.isSelected() ? r.children.length > 0 ? r.getColor() || "#aaa" : "#fff" : "#aaa", this.nodeStrokeColor = (r) => r.isSelected() && r.getColor() || "#aaa", this.linkStrokeColor = (r) => r.source.data.isSelected() ? r.target.data.getColor() : "#aaa", this.colorProvider = (r) => ryt(r.name), this.getLabel = (r) => r.name, this.getTooltip = (r) => `
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
                    ${this.getTooltipTitle(r)}
                </div>
                <a>
                    ${this.getTooltipText(r)}
                </a>
            </div>
        `, this.getTooltipTitle = (r) => r.name, this.getTooltipText = (r) => `${r.count} hits`;
  }
}
class eyt {
  constructor(r = [], e) {
    this.data = r, this.comparator = e, this.heapify();
  }
  add(r) {
    this.data.push(r), this.bubbleUp(this.data.length - 1);
  }
  peek() {
    return this.data[0];
  }
  remove() {
    const r = this.data[0];
    return this.data.length > 1 ? (this.data[0] = this.data.pop(), this.sink(0)) : this.data.pop(), r;
  }
  clear() {
    this.data.splice(0, this.data.length);
  }
  size() {
    return this.data.length;
  }
  heapify() {
    for (let r = Math.floor((this.data.length - 2) / 2); r >= 0; r--)
      this.sink(r);
  }
  bubbleUp(r) {
    const e = this.data[r];
    for (; r > 0; ) {
      const n = Math.floor((r - 1) / 2), a = this.data[n];
      if (this.comparator(e, a) < 0)
        this.data[r] = a;
      else
        break;
      r = n;
    }
    return this.data[r] = e, r;
  }
  sink(r) {
    const e = this.data[r], n = this.data.length;
    for (; 2 * r + 1 < n; ) {
      let a = 2 * r + 1;
      if (a < n - 1 && this.comparator(this.data[a + 1], this.data[a]) < 0 && a++, this.comparator(e, this.data[a]) <= 0)
        break;
      this.data[r] = this.data[a], r = a;
    }
    return this.data[r] = e, r;
  }
}
class nyt extends Ss {
  constructor() {
    super(...arguments), this.previousPosition = { x: 0, y: 0 }, this.selected = !1, this.collapsed = !1, this.color = "";
  }
  isCollapsed() {
    return this.collapsed;
  }
  setCollapsed(r) {
    this.collapsed = r;
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
  setSelected(r) {
    this.selected = r;
    for (const e of this.children)
      e.setSelected(r);
  }
  /**
   * Recursively collapse all children of this node.
   */
  collapseAll() {
    for (const r of this.children)
      r.setCollapsed(!0), r.collapseAll();
  }
  /**
   * Collapse this node.
   */
  collapse() {
    for (const r of this.children)
      r.setCollapsed(!0);
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
  expand(r) {
    if (r > 0 && this.children.length > 0)
      for (const e of this.children)
        e.setCollapsed(!1), e.expand(r - 1);
  }
  /**
   * Recursively sets the color of this node and all of it's children to the provided value.
   *
   * @param color HTML hex string that represents a valid color.
   */
  setColor(r) {
    this.color = r;
    for (const e of this.children)
      e.setColor(r);
  }
}
const FR = class kR {
  preprocessData(r) {
    const e = [];
    if (r.children)
      for (const n of r.children)
        e.push(this.preprocessData(n));
    return new nyt(
      r.id || ++kR.idCounter,
      r.name || "",
      e,
      r.count,
      r.selfCount,
      r.extra
    );
  }
};
FR.idCounter = 0;
let ayt = FR;
class hyt {
  constructor(r, e, n = new hS()) {
    this.element = r, this.nodeId = 0, this.zoomScale = 1, this.settings = this.fillOptions(n), this.settings.enableTooltips && (this.tooltip = wl.initTooltip());
    const i = new ayt().preprocessData(e), o = zn(i);
    o.sum((s) => s.children.length > 0 ? 0 : s.count), this.widthScale = de().range([this.settings.minNodeSize, this.settings.maxNodeSize]), this.treeLayout = SM().nodeSize([2, 10]).separation((s, u) => {
      if (s.data.isCollapsed() || u.data.isCollapsed())
        return 0;
      const c = (this.computeNodeSize(s) + this.computeNodeSize(u)) / 2 + 4;
      return s.parent === u.parent ? c : c + 4;
    }), this.data = this.treeLayout(o).descendants(), this.root = this.data[0], this.element.innerHTML = "", this.svg = dt(this.element).append("svg").attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`).attr("width", this.settings.width).attr("height", this.settings.height).style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif"), this.zoomListener = nx().extent([[0, 0], [this.settings.width, this.settings.height]]).scaleExtent([0.1, 3]).on("zoom", (s) => {
      this.zoomScale = s.transform.k, this.visElement.attr("transform", s.transform.toString());
    }), this.visElement = this.svg.call(this.zoomListener).append("g"), this.render(this.root);
  }
  reset() {
    this.render(this.data[0]);
  }
  fillOptions(r = void 0) {
    const e = new hS();
    return Object.assign(e, r);
  }
  render(r) {
    var n;
    this.widthScale.domain([0, r.data.count]), this.root = r, this.root.x = this.settings.height / 2, this.root.y = 0, this.root.data.setSelected(!0);
    const e = (a, i) => {
      if (a.data.setColor(this.settings.colorProvider(a.data, i)), i < this.settings.colorProviderLevels && a.children)
        for (const o of a.children)
          e(o, i + 1);
    };
    (n = this.root.children) == null || n.forEach((a, i) => {
      e(a, 1);
    }), this.settings.enableExpandOnClick ? (this.root.data.collapseAll(), this.initialExpand(this.root)) : this.root.data.expandAll(), this.update(r), this.centerRoot(r);
  }
  centerRoot(r) {
    let [e, n] = [-r.y, -r.x];
    e = e * this.zoomScale + this.settings.width / 4, n = n * this.zoomScale + this.settings.height / 2, this.visElement.transition().duration(this.settings.animationDuration).attr("transform", `translate(${e},${n})scale(${this.zoomScale})`).on("end", () => this.zoomListener.transform(this.svg, jv.translate(e, n).scale(this.zoomScale)));
  }
  initialExpand(r) {
    var a;
    if (!this.settings.enableAutoExpand) {
      r.data.expand(this.settings.levelsToExpand);
      return;
    }
    r.data.expand(1);
    let e = r.data.count * (this.settings.enableAutoExpand ? this.settings.autoExpandValue : 0.8);
    const n = new eyt([...r.children || []], (i, o) => o.data.count - i.data.count);
    for (; e > 0 && n.size() > 0; ) {
      const i = n.remove();
      e -= i.data.count, i.data.expand(1), (a = i.children) == null || a.forEach((o, s) => {
        n.add(o);
      });
    }
  }
  update(r) {
    const e = this.treeLayout(this.root), n = e.descendants().reverse().filter((v) => !v.data.isCollapsed()), a = e.links().filter((v) => !v.target.data.isCollapsed() && !v.source.data.isCollapsed());
    n.forEach((v) => v.y = v.depth * this.settings.nodeDistance);
    const i = this.visElement.selectAll("g.node").data(n, (v) => v.data.id || (v.data.id = ++this.nodeId));
    let o = i.enter().append("g").attr("class", "node").style("cursor", "pointer").attr("transform", `translate(${r.y || 0},${r.data.previousPosition.x || 0})`).on("click", (v, d) => this.click(v, d)).on("mouseover", (v, d) => this.tooltipIn(v, d)).on("mouseout", (v, d) => this.tooltipOut(v, d)).on("contextmenu", (v, d) => this.rightClick(v, d)).merge(i);
    o.append("circle").attr("r", 1e-6).style("stroke-width", "1.5px").style("stroke", (v) => this.settings.nodeStrokeColor(v.data)).style("fill", (v) => this.settings.nodeFillColor(v.data));
    const s = de().range([0, 2 * Math.PI]), u = oh().innerRadius(0).outerRadius((v) => this.computeNodeSize(v)).startAngle(0).endAngle((v) => s(v.data.selfCount / v.data.count) || 0);
    this.settings.enableInnerArcs && o.append("path").attr("class", "innerArc").attr("d", u).style("fill", (v) => this.settings.nodeStrokeColor(v.data)).style("fill-opacity", 0), this.settings.enableLabels && o.append("text").attr("x", (v) => v.children ? -10 : 10).attr("dy", ".35em").attr("text-anchor", (v) => v.children ? "end" : "start").text((v) => this.settings.getLabel(v.data)).style("font", "10px sans-serif").style("fill-opacity", 1e-6);
    const l = o.transition().duration(this.settings.animationDuration).attr("transform", (v) => `translate(${v.y}, ${v.x})`);
    l.select("circle").attr("r", (v) => this.computeNodeSize(v)).style("fill-opacity", (v) => v.children && v.children[0].data.isCollapsed() ? 1 : 0).style("stroke", (v) => this.settings.nodeStrokeColor(v.data)).style("fill", (v) => this.settings.nodeFillColor(v.data)), this.settings.enableInnerArcs && l.select(".innerArc").style("fill-opacity", 1), this.settings.enableLabels && l.select("text").style("fill-opacity", 1);
    const c = i.exit().transition().duration(this.settings.animationDuration).attr("transform", (v) => `translate(${r.y},${r.x})`).remove();
    c.select("circle").attr("r", 1e-6), c.select("path").style("fill-opacity", 1e-6), c.select("text").style("fill-opacity", 1e-6);
    let f = this.visElement.selectAll("path.link").data(a, (v) => v.target.data.id);
    const h = nN().x((v) => v.y).y((v) => v.x);
    f.enter().insert("path", "g").attr("class", "link").style("fill", "none").style("stroke-opacity", "0.5").style("stroke-linecap", "round").style("stroke", (v) => this.settings.linkStrokeColor(v)).style("stroke-width", 1e-6).attr("d", (v) => {
      const d = {
        x: r.data.previousPosition.x,
        y: r.data.previousPosition.y
      };
      return h({
        source: d,
        target: d
      });
    }).merge(f).transition().duration(this.settings.animationDuration).attr("d", h).style("stroke", this.settings.linkStrokeColor).style("stroke-width", (v) => v.source.data.isSelected() ? this.widthScale(v.target.data.count) + "px" : "4px"), f.exit().transition().duration(this.settings.animationDuration).style("stroke-width", 1e-6).attr("d", (v) => {
      const d = {
        x: r.x,
        y: r.y
      };
      return h({
        source: d,
        target: d
      });
    }).remove(), n.forEach((v) => {
      v.data.previousPosition = {
        x: v.x,
        y: v.y
      };
    });
  }
  computeNodeSize(r) {
    return r.data.isSelected() ? this.widthScale(r.data.count) / 2 : 2;
  }
  click(r, e) {
    this.settings.enableExpandOnClick && (r.defaultPrevented || (r.shiftKey ? e.data.expandAll() : e.children && e.children.some((n) => !n.data.isCollapsed()) ? e.data.collapseAll() : e.data.expand(this.settings.levelsToExpand), this.update(e), this.centerRoot(e)));
  }
  tooltipIn(r, e) {
    this.settings.enableTooltips && this.tooltip && (this.tooltip.html(this.settings.getTooltip(e.data)).style("top", r.pageY + 10 + "px").style("left", r.pageX + 10 + "px"), this.tooltipTimer = window.setTimeout(() => this.tooltip.style("visibility", "visible"), 1e3));
  }
  tooltipOut(r, e) {
    this.settings.enableTooltips && this.tooltip && (clearTimeout(this.tooltipTimer), this.tooltip.style("visibility", "hidden"));
  }
  rightClick(r, e) {
    this.settings.enableRightClick && this.render(e);
  }
}
class iyt {
  constructor() {
    this.padding = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    };
  }
}
class oyt {
  constructor() {
    this.padding = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    }, this.titleFontSize = 24, this.labelFontSize = 16, this.symbolSize = 16, this.columns = 3, this.width = 300, this.rowSpacing = 5, this.columnSpacing = 20;
  }
}
class vS extends xi {
  constructor() {
    super(...arguments), this.orientation = "vertical", this.barHeight = 75, this.className = "barplot", this.maxItems = 20, this.font = '"Roboto", sans-serif', this.displayMode = "relative", this.showBarLabel = !0, this.showValuesInBars = !0, this.valuesInBarsFontSize = 12, this.chart = new iyt(), this.legend = new oyt(), this.enableTooltips = !0, this.highlightOnHover = !0, this.getTooltip = (r, e, n) => `
            <style>
                .unipept-tooltip {
                    padding: 10px;
                    border-radius: 5px; 
                    background: rgba(0, 0, 0, 0.8); 
                    color: #fff;
                }
                
                .unipept-tooltip div {
                    font-family: "Roboto", sans-serif;
                }
            </style>
            <div class="unipept-tooltip">
                <div style="font-size: 20px; margin-bottom: 8px;">
                    ${this.getTooltipTitle(r, e, n)}
                </div>
                <div>
                    ${this.getTooltipText(r, e, n)}
                </div>
            </div>
        `, this.getTooltipTitle = (r, e, n) => r[e].items[n].label, this.getTooltipText = (r, e, n) => {
      const a = [], i = r[e].items[n].label;
      for (const o of r) {
        const s = o.items.find((l) => l.label === i);
        let u;
        s ? u = this.displayMode === "absolute" ? `${s.counts} hits` : `${s.counts.toFixed(2)}%` : u = "Not present", a.push(
          `<span style="font-weight: 600;">${o.label}: </span><span>${u}</span>`
        );
      }
      return a.map((o) => `<div style="margin-bottom: 4px;">${o}</div>`).join(`
`);
    };
  }
}
class syt {
  /**
   * Returns a new set of bars that can be rendered by the barplot that only contain the first maxItems bars
   * (if maxItems is set, if it is undefined, no transformation will be applied). The overflowing categories
   * will be grouped into one "other" category. The returned array of bars will thus have a max length of
   * maxItems + 1.
   *
   * Secondly, the categories in the bars will also be sorted according to their size in the first bar. All other
   * bars will respect the order of the categories in the first bar.
   *
   * @param bars
   * @param maxItems
   */
  computeMaxItemsInBars(r, e) {
    let n = r.map((i) => ({ ...i })), a = [...r[0].items].sort((i, o) => o.counts - i.counts);
    return e !== void 0 && (a = a.splice(0, e)), n = r.map((i) => {
      let o = 0;
      const s = [];
      for (const l of i.items)
        a.findIndex((c) => c.label === l.label) >= 0 ? s.push(l) : o += l.counts;
      const u = s.sort((l, c) => {
        const f = a.findIndex((v) => v.label === l.label), h = a.findIndex((v) => v.label === c.label);
        return f - h;
      });
      return {
        label: i.label,
        items: [
          ...u,
          { label: "Other", counts: o }
        ]
      };
    }), n;
  }
  /**
   * Convert the count values for each chunk of a bar from an absolute to a relative value.
   *
   * @param bars
   */
  convertAbsoluteToRelative(r) {
    return r.map((e) => {
      const n = e.items.reduce((a, i) => a + i.counts, 0);
      return {
        label: e.label,
        items: e.items.map((a) => ({
          label: a.label,
          counts: a.counts / n * 100
        }))
      };
    });
  }
}
class vyt {
  constructor(r, e, n = new vS()) {
    this.element = r, this.settings = this.fillOptions(n);
    const a = new syt();
    this.data = a.computeMaxItemsInBars(e, this.settings.maxItems), this.settings.displayMode === "relative" && (this.data = a.convertAbsoluteToRelative(this.data)), this.settings.enableTooltips && (this.tooltip = wl.initTooltip()), this.renderBarplot();
  }
  fillOptions(r = void 0) {
    const e = new vS();
    return Object.assign(e, r);
  }
  renderBarplot() {
    const r = dt(this.element).append("svg").attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`).attr("width", this.settings.width).attr("height", this.settings.height).attr("overflow", "hidden").style("font-family", this.settings.font);
    this.initCss();
    const e = this.settings.font, n = this.settings.chart.padding, a = this.settings.barHeight, i = this.settings.orientation == "horizontal", o = this.settings.legend.padding, s = this.settings.legend.width, u = this.settings.legend.titleFontSize, l = this.settings.legend.labelFontSize, c = this.settings.legend.symbolSize, f = this.settings.legend.rowSpacing, h = this.settings.legend.columnSpacing, v = this.settings.legend.columns, d = 10, $ = 10, y = 40;
    let p, b, I, _, M, B, H, q;
    i ? (p = this.settings.width - n.left - n.right - s, b = a * this.data.length, _ = o.top, I = n.left + p + n.right + o.left, M = Math.max(c, l), B = s - o.left - o.right - c - $, q = s - o.left - o.right) : (p = this.settings.width - n.left - n.right, b = a * this.data.length, _ = b + o.top + y, I = o.left, M = Math.max(c, l), H = this.settings.width - o.left - o.right, q = Math.floor((H - Math.max(v - 1, 0) * h) / v), B = q - c - $);
    let Z = 150;
    const nt = 18, k = 10;
    let Y = p;
    this.settings.showBarLabel ? Y = p - Z - k : Z = 0, r.selectAll("*").remove();
    const L = r.append("g"), m = oN().keys(Array.from(new Set(this.data.flatMap((T) => T.items.map((R) => R.label))))).value((T, R) => {
      var P;
      return ((P = T.items.find((G) => G.label === R)) == null ? void 0 : P.counts) ?? 0;
    })(this.data), C = de().domain([0, tp(m, (T) => tp(T, (R) => R[1])) || 0]).range([0, Y]), x = QS().domain(this.data.map((T, R) => R.toString())).range([0, a * this.data.length]).paddingInner(0.1).paddingOuter(0), N = [
      "#9e0142",
      // deep red
      "#c72e4c",
      "#d53e4f",
      "#eb5c48",
      "#f46d43",
      "#fba35b",
      "#fdae61",
      "#fee08b",
      "#ffffbf",
      "#e6f598",
      "#b5e3a5",
      "#8dd380",
      "#66c2a5",
      // soft teal-green
      "#4dacb1",
      // teal-cyan
      "#3288bd",
      // medium blue
      "#1f78b4",
      // classic blue
      "#5e4fa2",
      // deep blue-violet
      "#6a3d9a",
      // purple
      "#984ea3",
      // medium purple-magenta
      "#df7ab4"
      // strong magenta
    ], j = "#acaaaa", w = new Array(...N);
    console.log(w), this.settings.maxItems && (w[this.settings.maxItems % (this.data[0].items.length + 1)] = j);
    const S = $u().domain(Array.from(new Set(this.data.flatMap((T) => T.items.map((R) => R.label))))).range(w);
    this.settings.showBarLabel && L.append("g").attr("class", "barLabels").selectAll("text").data(this.data).join("text").attr("x", n.left).attr("y", (T, R) => n.top + (x(R.toString()) || 0) + x.bandwidth() / 2).attr("dy", ".35em").attr("font-family", e).attr("font-size", nt).text((T) => {
      if (T.label.length * (nt * 0.6) > Z) {
        const R = Math.floor(Z / (nt * 0.6));
        return T.label.substring(0, R - 3) + "...";
      }
      return T.label;
    });
    const E = Array(this.data.length).fill(null).map((T) => new Array());
    for (const T of m) {
      const R = T.key;
      for (let P = 0; P < T.length; P++)
        E[P].push({
          barIndex: P,
          title: R,
          shape: T[P]
        });
    }
    L.append("g").selectAll("g").data(E).join("g").selectAll("g").data((T) => T).join((T) => {
      const R = T.append("g");
      return R.append("rect").attr("fill", (P) => S(P.title)).attr("x", (P) => n.left + Z + k + Math.floor(C(P.shape[0]))).attr("y", (P) => n.top + (x(P.barIndex.toString()) || 0)).attr("width", (P) => Math.floor(C(P.shape[1])) - Math.floor(C(P.shape[0]))).attr("height", Math.floor(x.bandwidth())), this.settings.showValuesInBars && R.append("text").attr("data-key", (P) => P.title).attr("x", (P) => {
        const G = Math.floor(C(P.shape[0])), Q = Math.floor(C(P.shape[1]));
        return n.left + Z + k + G + (Q - G) / 2;
      }).attr("y", (P) => n.top + (x(P.barIndex.toString()) || 0) + x.bandwidth() / 2).attr("dy", ".35em").attr("text-anchor", "middle").attr("fill", (P) => {
        const G = S(P.title), Q = ui(G);
        return (0.299 * Q.r + 0.587 * Q.g + 0.114 * Q.b) / 255 < 0.5 ? "white" : "#171717";
      }).attr("font-family", e).attr("font-size", this.settings.valuesInBarsFontSize).attr("font-weight", 600).text((P) => {
        const G = P.shape[1] - P.shape[0];
        return Math.floor(C(P.shape[1])) - Math.floor(C(P.shape[0])) < 30 ? "" : this.settings.displayMode === "relative" ? `${G.toFixed(1)}%` : G;
      }), R;
    }).classed("barplot-item", !0).attr("data-bar-item", (T) => T.title).on("mouseover", (T, R) => {
      const P = this.data[R.barIndex].items.findIndex((G) => G.label === R.title);
      this.mouseIn(T, R.barIndex, P, T.target.parentElement);
    }).on("mousemove", (T, R) => {
      const P = this.data[R.barIndex].items.find((G) => G.label === R.title);
      this.mouseMove(T, P, T.target.parentElement);
    }).on("mouseout", (T, R) => {
      const P = this.data[R.barIndex].items.find((G) => G.label === R.title);
      this.mouseOut(T, P, T.target.parentElement);
    }), L.append("g").attr("transform", `translate(${n.left + Z + k}, ${n.top + a * this.data.length + 5})`).call(o_(C)).attr("font-size", "12px").append("text").attr("font-family", e).attr("fill", "black").attr("x", Y / 2).attr("y", y).attr("text-anchor", "middle").attr("font-size", 14).text(this.settings.displayMode === "relative" ? "Percentage" : "Count");
    const F = L.append("g").attr("font-family", e).attr("font-size", l).selectAll("g").data(S.domain()).join("g").classed("legend-item", !0).attr("data-legend-entry", (T) => T).attr("transform", (T, R) => `translate(${R % v * q + Math.max(R % v - 1, 0) * h}, ${Math.floor(R / v) * (M + f) + u + d + _})`);
    L.append("text").attr("font-family", e).attr("font-size", u).attr("dominant-baseline", "hanging").attr("x", I).attr("y", _).text("Legend"), F.append("rect").attr("x", I).attr("width", c).attr("height", c).attr("rx", 5).attr("fill", S), F.append("text").attr("x", I + c + $).attr("y", l / 2).attr("dy", "0.35em").text((T) => {
      if (T.length * (l * 0.6) > B) {
        const R = Math.floor(B / (l * 0.6));
        return T.substring(0, R - 3) + "...";
      }
      return T;
    });
  }
  initCss() {
    let r = this.settings.className;
    this.element.className += " " + r;
    const e = this.element.ownerDocument.createElement("style");
    e.appendChild(this.element.ownerDocument.createTextNode(`
.${r} .barplot-item-highlighted {
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
    font-size: 20px;
}

.${r} .legend-item-highlighted {
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
}
`)), this.element.ownerDocument.head.appendChild(e);
  }
  mouseIn(r, e, n, a) {
    const i = this.data[e].items[n];
    this.settings.enableTooltips && this.tooltip && this.tooltip.html(this.settings.getTooltip(this.data, e, n)).style("top", r.pageY + 10 + "px").style("left", r.pageX + 10 + "px").style("visibility", "visible"), this.settings.highlightOnHover && (nn(".barplot-item").classed("barplot-item-highlighted", !0), nn(`g[data-bar-item="${i.label}"]`).classed("barplot-item-highlighted", !1), nn(".legend-item").classed("legend-item-highlighted", !0), nn(`g[data-legend-entry="${i.label}"]`).classed("legend-item-highlighted", !1));
  }
  mouseMove(r, e, n) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("top", r.pageY + 10 + "px").style("left", r.pageX + 10 + "px");
  }
  mouseOut(r, e, n) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("visibility", "hidden"), this.settings.highlightOnHover && (nn(".barplot-item").classed("barplot-item-highlighted", !1), nn(".legend-item").classed("legend-item-highlighted", !1));
  }
}
export {
  vyt as Barplot,
  iyt as BarplotChartSettings,
  oyt as BarplotLegendSettings,
  vS as BarplotSettings,
  bi as ColorPalette,
  Sl as ColorUtils,
  Ss as DataNode,
  gN as EuclidianDistanceMetric,
  uyt as Heatmap,
  _p as HeatmapSettings,
  pN as MoloReorderer,
  lyt as PearsonCorrelationMetric,
  Z$t as StringUtils,
  cyt as Sunburst,
  cS as SunburstSettings,
  sh as Transition,
  os as TreeNode,
  fyt as Treemap,
  fS as TreemapSettings,
  hyt as Treeview,
  hS as TreeviewSettings,
  dN as UPGMAClusterer
};
//# sourceMappingURL=unipept-visualizations.js.map
