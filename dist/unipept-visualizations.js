class bs {
  constructor(r, e, n = [], a, i, o = {}) {
    this.id = r, this.name = e, this.children = n, this.count = a, this.selfCount = i, this.extra = o;
  }
}
function Zo(t, r) {
  return t == null || r == null ? NaN : t < r ? -1 : t > r ? 1 : t >= r ? 0 : NaN;
}
function LR(t, r) {
  return t == null || r == null ? NaN : r < t ? -1 : r > t ? 1 : r >= t ? 0 : NaN;
}
function vS(t) {
  let r, e, n;
  t.length !== 2 ? (r = Zo, e = (s, u) => Zo(t(s), u), n = (s, u) => t(s) - u) : (r = t === Zo || t === LR ? t : kR, e = t, n = t);
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
function kR() {
  return 0;
}
function BR(t) {
  return t === null ? NaN : +t;
}
const jR = vS(Zo), UR = jR.right;
vS(BR).center;
const hS = UR;
class Xg extends Map {
  constructor(r, e = HR) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: e } }), r != null)
      for (const [n, a] of r)
        this.set(n, a);
  }
  get(r) {
    return super.get(Jg(this, r));
  }
  has(r) {
    return super.has(Jg(this, r));
  }
  set(r, e) {
    return super.set(zR(this, r), e);
  }
  delete(r) {
    return super.delete(VR(this, r));
  }
}
function Jg({ _intern: t, _key: r }, e) {
  const n = r(e);
  return t.has(n) ? t.get(n) : e;
}
function zR({ _intern: t, _key: r }, e) {
  const n = r(e);
  return t.has(n) ? t.get(n) : (t.set(n, e), e);
}
function VR({ _intern: t, _key: r }, e) {
  const n = r(e);
  return t.has(n) && (e = t.get(n), t.delete(n)), e;
}
function HR(t) {
  return t !== null && typeof t == "object" ? t.valueOf() : t;
}
const GR = Math.sqrt(50), WR = Math.sqrt(10), qR = Math.sqrt(2);
function ws(t, r, e) {
  const n = (r - t) / Math.max(0, e), a = Math.floor(Math.log10(n)), i = n / Math.pow(10, a), o = i >= GR ? 10 : i >= WR ? 5 : i >= qR ? 2 : 1;
  let s, u, l;
  return a < 0 ? (l = Math.pow(10, -a) / o, s = Math.round(t * l), u = Math.round(r * l), s / l < t && ++s, u / l > r && --u, l = -l) : (l = Math.pow(10, a) * o, s = Math.round(t / l), u = Math.round(r / l), s * l < t && ++s, u * l > r && --u), u < s && 0.5 <= e && e < 2 ? ws(t, r, e * 2) : [s, u, l];
}
function YR(t, r, e) {
  if (r = +r, t = +t, e = +e, !(e > 0))
    return [];
  if (t === r)
    return [t];
  const n = r < t, [a, i, o] = n ? ws(r, t, e) : ws(t, r, e);
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
function Wf(t, r, e) {
  return r = +r, t = +t, e = +e, ws(t, r, e)[2];
}
function KR(t, r, e) {
  r = +r, t = +t, e = +e;
  const n = r < t, a = n ? Wf(r, t, e) : Wf(t, r, e);
  return (n ? -1 : 1) * (a < 0 ? 1 / -a : a);
}
function Zg(t, r) {
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
function XR(t, r, e) {
  t = +t, r = +r, e = (a = arguments.length) < 2 ? (r = t, t = 0, 1) : a < 3 ? 1 : +e;
  for (var n = -1, a = Math.max(0, Math.ceil((r - t) / e)) | 0, i = new Array(a); ++n < a; )
    i[n] = t + n * e;
  return i;
}
function JR(t) {
  return t;
}
var Sl = 1, xl = 2, qf = 3, Qi = 4, Qg = 1e-6;
function ZR(t) {
  return "translate(" + t + ",0)";
}
function QR(t) {
  return "translate(0," + t + ")";
}
function t_(t) {
  return (r) => +t(r);
}
function r_(t, r) {
  return r = Math.max(0, t.bandwidth() - r * 2) / 2, t.round() && (r = Math.round(r)), (e) => +t(e) + r;
}
function e_() {
  return !this.__axis;
}
function n_(t, r) {
  var e = [], n = null, a = null, i = 6, o = 6, s = 3, u = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, l = t === Sl || t === Qi ? -1 : 1, c = t === Qi || t === xl ? "x" : "y", f = t === Sl || t === qf ? ZR : QR;
  function v(h) {
    var d = n ?? (r.ticks ? r.ticks.apply(r, e) : r.domain()), $ = a ?? (r.tickFormat ? r.tickFormat.apply(r, e) : JR), y = Math.max(i, 0) + s, p = r.range(), w = +p[0] + u, T = +p[p.length - 1] + u, R = (r.bandwidth ? r_ : t_)(r.copy(), u), M = h.selection ? h.selection() : h, L = M.selectAll(".domain").data([null]), V = M.selectAll(".tick").data(d, r).order(), W = V.exit(), J = V.enter().append("g").attr("class", "tick"), rt = V.select("line"), F = V.select("text");
    L = L.merge(L.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), V = V.merge(J), rt = rt.merge(J.append("line").attr("stroke", "currentColor").attr(c + "2", l * i)), F = F.merge(J.append("text").attr("fill", "currentColor").attr(c, l * y).attr("dy", t === Sl ? "0em" : t === qf ? "0.71em" : "0.32em")), h !== M && (L = L.transition(h), V = V.transition(h), rt = rt.transition(h), F = F.transition(h), W = W.transition(h).attr("opacity", Qg).attr("transform", function(q) {
      return isFinite(q = R(q)) ? f(q + u) : this.getAttribute("transform");
    }), J.attr("opacity", Qg).attr("transform", function(q) {
      var N = this.parentNode.__axis;
      return f((N && isFinite(N = N(q)) ? N : R(q)) + u);
    })), W.remove(), L.attr("d", t === Qi || t === xl ? o ? "M" + l * o + "," + w + "H" + u + "V" + T + "H" + l * o : "M" + u + "," + w + "V" + T : o ? "M" + w + "," + l * o + "V" + u + "H" + T + "V" + l * o : "M" + w + "," + u + "H" + T), V.attr("opacity", 1).attr("transform", function(q) {
      return f(R(q) + u);
    }), rt.attr(c + "2", l * i), F.attr(c, l * y).text($), M.filter(e_).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === xl ? "start" : t === Qi ? "end" : "middle"), M.each(function() {
      this.__axis = R;
    });
  }
  return v.scale = function(h) {
    return arguments.length ? (r = h, v) : r;
  }, v.ticks = function() {
    return e = Array.from(arguments), v;
  }, v.tickArguments = function(h) {
    return arguments.length ? (e = h == null ? [] : Array.from(h), v) : e.slice();
  }, v.tickValues = function(h) {
    return arguments.length ? (n = h == null ? null : Array.from(h), v) : n && n.slice();
  }, v.tickFormat = function(h) {
    return arguments.length ? (a = h, v) : a;
  }, v.tickSize = function(h) {
    return arguments.length ? (i = o = +h, v) : i;
  }, v.tickSizeInner = function(h) {
    return arguments.length ? (i = +h, v) : i;
  }, v.tickSizeOuter = function(h) {
    return arguments.length ? (o = +h, v) : o;
  }, v.tickPadding = function(h) {
    return arguments.length ? (s = +h, v) : s;
  }, v.offset = function(h) {
    return arguments.length ? (u = +h, v) : u;
  }, v;
}
function a_(t) {
  return n_(qf, t);
}
var i_ = { value: () => {
} };
function Rh() {
  for (var t = 0, r = arguments.length, e = {}, n; t < r; ++t) {
    if (!(n = arguments[t] + "") || n in e || /[\s.]/.test(n))
      throw new Error("illegal type: " + n);
    e[n] = [];
  }
  return new Qo(e);
}
function Qo(t) {
  this._ = t;
}
function o_(t, r) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", a = e.indexOf(".");
    if (a >= 0 && (n = e.slice(a + 1), e = e.slice(0, a)), e && !r.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    return { type: e, name: n };
  });
}
Qo.prototype = Rh.prototype = {
  constructor: Qo,
  on: function(t, r) {
    var e = this._, n = o_(t + "", e), a, i = -1, o = n.length;
    if (arguments.length < 2) {
      for (; ++i < o; )
        if ((a = (t = n[i]).type) && (a = s_(e[a], t.name)))
          return a;
      return;
    }
    if (r != null && typeof r != "function")
      throw new Error("invalid callback: " + r);
    for (; ++i < o; )
      if (a = (t = n[i]).type)
        e[a] = tp(e[a], t.name, r);
      else if (r == null)
        for (a in e)
          e[a] = tp(e[a], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, r = this._;
    for (var e in r)
      t[e] = r[e].slice();
    return new Qo(t);
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
function s_(t, r) {
  for (var e = 0, n = t.length, a; e < n; ++e)
    if ((a = t[e]).name === r)
      return a.value;
}
function tp(t, r, e) {
  for (var n = 0, a = t.length; n < a; ++n)
    if (t[n].name === r) {
      t[n] = i_, t = t.slice(0, n).concat(t.slice(n + 1));
      break;
    }
  return e != null && t.push({ name: r, value: e }), t;
}
var Yf = "http://www.w3.org/1999/xhtml";
const rp = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Yf,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function fu(t) {
  var r = t += "", e = r.indexOf(":");
  return e >= 0 && (r = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)), rp.hasOwnProperty(r) ? { space: rp[r], local: t } : t;
}
function u_(t) {
  return function() {
    var r = this.ownerDocument, e = this.namespaceURI;
    return e === Yf && r.documentElement.namespaceURI === Yf ? r.createElement(t) : r.createElementNS(e, t);
  };
}
function l_(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function dS(t) {
  var r = fu(t);
  return (r.local ? l_ : u_)(r);
}
function c_() {
}
function _h(t) {
  return t == null ? c_ : function() {
    return this.querySelector(t);
  };
}
function f_(t) {
  typeof t != "function" && (t = _h(t));
  for (var r = this._groups, e = r.length, n = new Array(e), a = 0; a < e; ++a)
    for (var i = r[a], o = i.length, s = n[a] = new Array(o), u, l, c = 0; c < o; ++c)
      (u = i[c]) && (l = t.call(u, u.__data__, c, i)) && ("__data__" in u && (l.__data__ = u.__data__), s[c] = l);
  return new Ut(n, this._parents);
}
function v_(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function h_() {
  return [];
}
function gS(t) {
  return t == null ? h_ : function() {
    return this.querySelectorAll(t);
  };
}
function d_(t) {
  return function() {
    return v_(t.apply(this, arguments));
  };
}
function g_(t) {
  typeof t == "function" ? t = d_(t) : t = gS(t);
  for (var r = this._groups, e = r.length, n = [], a = [], i = 0; i < e; ++i)
    for (var o = r[i], s = o.length, u, l = 0; l < s; ++l)
      (u = o[l]) && (n.push(t.call(u, u.__data__, l, o)), a.push(u));
  return new Ut(n, a);
}
function pS(t) {
  return function() {
    return this.matches(t);
  };
}
function $S(t) {
  return function(r) {
    return r.matches(t);
  };
}
var p_ = Array.prototype.find;
function $_(t) {
  return function() {
    return p_.call(this.children, t);
  };
}
function y_() {
  return this.firstElementChild;
}
function m_(t) {
  return this.select(t == null ? y_ : $_(typeof t == "function" ? t : $S(t)));
}
var b_ = Array.prototype.filter;
function w_() {
  return Array.from(this.children);
}
function S_(t) {
  return function() {
    return b_.call(this.children, t);
  };
}
function x_(t) {
  return this.selectAll(t == null ? w_ : S_(typeof t == "function" ? t : $S(t)));
}
function E_(t) {
  typeof t != "function" && (t = pS(t));
  for (var r = this._groups, e = r.length, n = new Array(e), a = 0; a < e; ++a)
    for (var i = r[a], o = i.length, s = n[a] = [], u, l = 0; l < o; ++l)
      (u = i[l]) && t.call(u, u.__data__, l, i) && s.push(u);
  return new Ut(n, this._parents);
}
function yS(t) {
  return new Array(t.length);
}
function T_() {
  return new Ut(this._enter || this._groups.map(yS), this._parents);
}
function Ss(t, r) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = r;
}
Ss.prototype = {
  constructor: Ss,
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
function I_(t) {
  return function() {
    return t;
  };
}
function O_(t, r, e, n, a, i) {
  for (var o = 0, s, u = r.length, l = i.length; o < l; ++o)
    (s = r[o]) ? (s.__data__ = i[o], n[o] = s) : e[o] = new Ss(t, i[o]);
  for (; o < u; ++o)
    (s = r[o]) && (a[o] = s);
}
function A_(t, r, e, n, a, i, o) {
  var s, u, l = /* @__PURE__ */ new Map(), c = r.length, f = i.length, v = new Array(c), h;
  for (s = 0; s < c; ++s)
    (u = r[s]) && (v[s] = h = o.call(u, u.__data__, s, r) + "", l.has(h) ? a[s] = u : l.set(h, u));
  for (s = 0; s < f; ++s)
    h = o.call(t, i[s], s, i) + "", (u = l.get(h)) ? (n[s] = u, u.__data__ = i[s], l.delete(h)) : e[s] = new Ss(t, i[s]);
  for (s = 0; s < c; ++s)
    (u = r[s]) && l.get(v[s]) === u && (a[s] = u);
}
function R_(t) {
  return t.__data__;
}
function __(t, r) {
  if (!arguments.length)
    return Array.from(this, R_);
  var e = r ? A_ : O_, n = this._parents, a = this._groups;
  typeof t != "function" && (t = I_(t));
  for (var i = a.length, o = new Array(i), s = new Array(i), u = new Array(i), l = 0; l < i; ++l) {
    var c = n[l], f = a[l], v = f.length, h = C_(t.call(c, c && c.__data__, l, n)), d = h.length, $ = s[l] = new Array(d), y = o[l] = new Array(d), p = u[l] = new Array(v);
    e(c, f, $, y, p, h, r);
    for (var w = 0, T = 0, R, M; w < d; ++w)
      if (R = $[w]) {
        for (w >= T && (T = w + 1); !(M = y[T]) && ++T < d; )
          ;
        R._next = M || null;
      }
  }
  return o = new Ut(o, n), o._enter = s, o._exit = u, o;
}
function C_(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function P_() {
  return new Ut(this._exit || this._groups.map(yS), this._parents);
}
function M_(t, r, e) {
  var n = this.enter(), a = this, i = this.exit();
  return typeof t == "function" ? (n = t(n), n && (n = n.selection())) : n = n.append(t + ""), r != null && (a = r(a), a && (a = a.selection())), e == null ? i.remove() : e(i), n && a ? n.merge(a).order() : a;
}
function N_(t) {
  for (var r = t.selection ? t.selection() : t, e = this._groups, n = r._groups, a = e.length, i = n.length, o = Math.min(a, i), s = new Array(a), u = 0; u < o; ++u)
    for (var l = e[u], c = n[u], f = l.length, v = s[u] = new Array(f), h, d = 0; d < f; ++d)
      (h = l[d] || c[d]) && (v[d] = h);
  for (; u < a; ++u)
    s[u] = e[u];
  return new Ut(s, this._parents);
}
function D_() {
  for (var t = this._groups, r = -1, e = t.length; ++r < e; )
    for (var n = t[r], a = n.length - 1, i = n[a], o; --a >= 0; )
      (o = n[a]) && (i && o.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(o, i), i = o);
  return this;
}
function F_(t) {
  t || (t = L_);
  function r(f, v) {
    return f && v ? t(f.__data__, v.__data__) : !f - !v;
  }
  for (var e = this._groups, n = e.length, a = new Array(n), i = 0; i < n; ++i) {
    for (var o = e[i], s = o.length, u = a[i] = new Array(s), l, c = 0; c < s; ++c)
      (l = o[c]) && (u[c] = l);
    u.sort(r);
  }
  return new Ut(a, this._parents).order();
}
function L_(t, r) {
  return t < r ? -1 : t > r ? 1 : t >= r ? 0 : NaN;
}
function k_() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function B_() {
  return Array.from(this);
}
function j_() {
  for (var t = this._groups, r = 0, e = t.length; r < e; ++r)
    for (var n = t[r], a = 0, i = n.length; a < i; ++a) {
      var o = n[a];
      if (o)
        return o;
    }
  return null;
}
function U_() {
  let t = 0;
  for (const r of this)
    ++t;
  return t;
}
function z_() {
  return !this.node();
}
function V_(t) {
  for (var r = this._groups, e = 0, n = r.length; e < n; ++e)
    for (var a = r[e], i = 0, o = a.length, s; i < o; ++i)
      (s = a[i]) && t.call(s, s.__data__, i, a);
  return this;
}
function H_(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function G_(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function W_(t, r) {
  return function() {
    this.setAttribute(t, r);
  };
}
function q_(t, r) {
  return function() {
    this.setAttributeNS(t.space, t.local, r);
  };
}
function Y_(t, r) {
  return function() {
    var e = r.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function K_(t, r) {
  return function() {
    var e = r.apply(this, arguments);
    e == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
  };
}
function X_(t, r) {
  var e = fu(t);
  if (arguments.length < 2) {
    var n = this.node();
    return e.local ? n.getAttributeNS(e.space, e.local) : n.getAttribute(e);
  }
  return this.each((r == null ? e.local ? G_ : H_ : typeof r == "function" ? e.local ? K_ : Y_ : e.local ? q_ : W_)(e, r));
}
function mS(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function J_(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Z_(t, r, e) {
  return function() {
    this.style.setProperty(t, r, e);
  };
}
function Q_(t, r, e) {
  return function() {
    var n = r.apply(this, arguments);
    n == null ? this.style.removeProperty(t) : this.style.setProperty(t, n, e);
  };
}
function tC(t, r, e) {
  return arguments.length > 1 ? this.each((r == null ? J_ : typeof r == "function" ? Q_ : Z_)(t, r, e ?? "")) : kn(this.node(), t);
}
function kn(t, r) {
  return t.style.getPropertyValue(r) || mS(t).getComputedStyle(t, null).getPropertyValue(r);
}
function rC(t) {
  return function() {
    delete this[t];
  };
}
function eC(t, r) {
  return function() {
    this[t] = r;
  };
}
function nC(t, r) {
  return function() {
    var e = r.apply(this, arguments);
    e == null ? delete this[t] : this[t] = e;
  };
}
function aC(t, r) {
  return arguments.length > 1 ? this.each((r == null ? rC : typeof r == "function" ? nC : eC)(t, r)) : this.node()[t];
}
function bS(t) {
  return t.trim().split(/^|\s+/);
}
function Ch(t) {
  return t.classList || new wS(t);
}
function wS(t) {
  this._node = t, this._names = bS(t.getAttribute("class") || "");
}
wS.prototype = {
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
function SS(t, r) {
  for (var e = Ch(t), n = -1, a = r.length; ++n < a; )
    e.add(r[n]);
}
function xS(t, r) {
  for (var e = Ch(t), n = -1, a = r.length; ++n < a; )
    e.remove(r[n]);
}
function iC(t) {
  return function() {
    SS(this, t);
  };
}
function oC(t) {
  return function() {
    xS(this, t);
  };
}
function sC(t, r) {
  return function() {
    (r.apply(this, arguments) ? SS : xS)(this, t);
  };
}
function uC(t, r) {
  var e = bS(t + "");
  if (arguments.length < 2) {
    for (var n = Ch(this.node()), a = -1, i = e.length; ++a < i; )
      if (!n.contains(e[a]))
        return !1;
    return !0;
  }
  return this.each((typeof r == "function" ? sC : r ? iC : oC)(e, r));
}
function lC() {
  this.textContent = "";
}
function cC(t) {
  return function() {
    this.textContent = t;
  };
}
function fC(t) {
  return function() {
    var r = t.apply(this, arguments);
    this.textContent = r ?? "";
  };
}
function vC(t) {
  return arguments.length ? this.each(t == null ? lC : (typeof t == "function" ? fC : cC)(t)) : this.node().textContent;
}
function hC() {
  this.innerHTML = "";
}
function dC(t) {
  return function() {
    this.innerHTML = t;
  };
}
function gC(t) {
  return function() {
    var r = t.apply(this, arguments);
    this.innerHTML = r ?? "";
  };
}
function pC(t) {
  return arguments.length ? this.each(t == null ? hC : (typeof t == "function" ? gC : dC)(t)) : this.node().innerHTML;
}
function $C() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function yC() {
  return this.each($C);
}
function mC() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function bC() {
  return this.each(mC);
}
function wC(t) {
  var r = typeof t == "function" ? t : dS(t);
  return this.select(function() {
    return this.appendChild(r.apply(this, arguments));
  });
}
function SC() {
  return null;
}
function xC(t, r) {
  var e = typeof t == "function" ? t : dS(t), n = r == null ? SC : typeof r == "function" ? r : _h(r);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function EC() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function TC() {
  return this.each(EC);
}
function IC() {
  var t = this.cloneNode(!1), r = this.parentNode;
  return r ? r.insertBefore(t, this.nextSibling) : t;
}
function OC() {
  var t = this.cloneNode(!0), r = this.parentNode;
  return r ? r.insertBefore(t, this.nextSibling) : t;
}
function AC(t) {
  return this.select(t ? OC : IC);
}
function RC(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function _C(t) {
  return function(r) {
    t.call(this, r, this.__data__);
  };
}
function CC(t) {
  return t.trim().split(/^|\s+/).map(function(r) {
    var e = "", n = r.indexOf(".");
    return n >= 0 && (e = r.slice(n + 1), r = r.slice(0, n)), { type: r, name: e };
  });
}
function PC(t) {
  return function() {
    var r = this.__on;
    if (r) {
      for (var e = 0, n = -1, a = r.length, i; e < a; ++e)
        i = r[e], (!t.type || i.type === t.type) && i.name === t.name ? this.removeEventListener(i.type, i.listener, i.options) : r[++n] = i;
      ++n ? r.length = n : delete this.__on;
    }
  };
}
function MC(t, r, e) {
  return function() {
    var n = this.__on, a, i = _C(r);
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
function NC(t, r, e) {
  var n = CC(t + ""), a, i = n.length, o;
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
  for (s = r ? MC : PC, a = 0; a < i; ++a)
    this.each(s(n[a], r, e));
  return this;
}
function ES(t, r, e) {
  var n = mS(t), a = n.CustomEvent;
  typeof a == "function" ? a = new a(r, e) : (a = n.document.createEvent("Event"), e ? (a.initEvent(r, e.bubbles, e.cancelable), a.detail = e.detail) : a.initEvent(r, !1, !1)), t.dispatchEvent(a);
}
function DC(t, r) {
  return function() {
    return ES(this, t, r);
  };
}
function FC(t, r) {
  return function() {
    return ES(this, t, r.apply(this, arguments));
  };
}
function LC(t, r) {
  return this.each((typeof r == "function" ? FC : DC)(t, r));
}
function* kC() {
  for (var t = this._groups, r = 0, e = t.length; r < e; ++r)
    for (var n = t[r], a = 0, i = n.length, o; a < i; ++a)
      (o = n[a]) && (yield o);
}
var TS = [null];
function Ut(t, r) {
  this._groups = t, this._parents = r;
}
function mi() {
  return new Ut([[document.documentElement]], TS);
}
function BC() {
  return this;
}
Ut.prototype = mi.prototype = {
  constructor: Ut,
  select: f_,
  selectAll: g_,
  selectChild: m_,
  selectChildren: x_,
  filter: E_,
  data: __,
  enter: T_,
  exit: P_,
  join: M_,
  merge: N_,
  selection: BC,
  order: D_,
  sort: F_,
  call: k_,
  nodes: B_,
  node: j_,
  size: U_,
  empty: z_,
  each: V_,
  attr: X_,
  style: tC,
  property: aC,
  classed: uC,
  text: vC,
  html: pC,
  raise: yC,
  lower: bC,
  append: wC,
  insert: xC,
  remove: TC,
  clone: AC,
  datum: RC,
  on: NC,
  dispatch: LC,
  [Symbol.iterator]: kC
};
function vt(t) {
  return typeof t == "string" ? new Ut([[document.querySelector(t)]], [document.documentElement]) : new Ut([[t]], TS);
}
function jC(t) {
  let r;
  for (; r = t.sourceEvent; )
    t = r;
  return t;
}
function we(t, r) {
  if (t = jC(t), r === void 0 && (r = t.currentTarget), r) {
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
const Kf = { capture: !0, passive: !1 };
function Xf(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function UC(t) {
  var r = t.document.documentElement, e = vt(t).on("dragstart.drag", Xf, Kf);
  "onselectstart" in r ? e.on("selectstart.drag", Xf, Kf) : (r.__noselect = r.style.MozUserSelect, r.style.MozUserSelect = "none");
}
function zC(t, r) {
  var e = t.document.documentElement, n = vt(t).on("dragstart.drag", null);
  r && (n.on("click.drag", Xf, Kf), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in e ? n.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect);
}
function bi(t, r, e) {
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
var ii = 0.7, xs = 1 / ii, On = "\\s*([+-]?\\d+)\\s*", oi = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ir = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", VC = /^#([0-9a-f]{3,8})$/, HC = new RegExp(`^rgb\\(${On},${On},${On}\\)$`), GC = new RegExp(`^rgb\\(${Ir},${Ir},${Ir}\\)$`), WC = new RegExp(`^rgba\\(${On},${On},${On},${oi}\\)$`), qC = new RegExp(`^rgba\\(${Ir},${Ir},${Ir},${oi}\\)$`), YC = new RegExp(`^hsl\\(${oi},${Ir},${Ir}\\)$`), KC = new RegExp(`^hsla\\(${oi},${Ir},${Ir},${oi}\\)$`), ep = {
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
bi(He, ke, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: np,
  // Deprecated! Use color.formatHex.
  formatHex: np,
  formatHex8: XC,
  formatHsl: JC,
  formatRgb: ap,
  toString: ap
});
function np() {
  return this.rgb().formatHex();
}
function XC() {
  return this.rgb().formatHex8();
}
function JC() {
  return OS(this).formatHsl();
}
function ap() {
  return this.rgb().formatRgb();
}
function ke(t) {
  var r, e;
  return t = (t + "").trim().toLowerCase(), (r = VC.exec(t)) ? (e = r[1].length, r = parseInt(r[1], 16), e === 6 ? ip(r) : e === 3 ? new St(r >> 8 & 15 | r >> 4 & 240, r >> 4 & 15 | r & 240, (r & 15) << 4 | r & 15, 1) : e === 8 ? to(r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, (r & 255) / 255) : e === 4 ? to(r >> 12 & 15 | r >> 8 & 240, r >> 8 & 15 | r >> 4 & 240, r >> 4 & 15 | r & 240, ((r & 15) << 4 | r & 15) / 255) : null) : (r = HC.exec(t)) ? new St(r[1], r[2], r[3], 1) : (r = GC.exec(t)) ? new St(r[1] * 255 / 100, r[2] * 255 / 100, r[3] * 255 / 100, 1) : (r = WC.exec(t)) ? to(r[1], r[2], r[3], r[4]) : (r = qC.exec(t)) ? to(r[1] * 255 / 100, r[2] * 255 / 100, r[3] * 255 / 100, r[4]) : (r = YC.exec(t)) ? up(r[1], r[2] / 100, r[3] / 100, 1) : (r = KC.exec(t)) ? up(r[1], r[2] / 100, r[3] / 100, r[4]) : ep.hasOwnProperty(t) ? ip(ep[t]) : t === "transparent" ? new St(NaN, NaN, NaN, 0) : null;
}
function ip(t) {
  return new St(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function to(t, r, e, n) {
  return n <= 0 && (t = r = e = NaN), new St(t, r, e, n);
}
function IS(t) {
  return t instanceof He || (t = ke(t)), t ? (t = t.rgb(), new St(t.r, t.g, t.b, t.opacity)) : new St();
}
function Es(t, r, e, n) {
  return arguments.length === 1 ? IS(t) : new St(t, r, e, n ?? 1);
}
function St(t, r, e, n) {
  this.r = +t, this.g = +r, this.b = +e, this.opacity = +n;
}
bi(St, Es, vu(He, {
  brighter(t) {
    return t = t == null ? xs : Math.pow(xs, t), new St(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? ii : Math.pow(ii, t), new St(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new St(Ne(this.r), Ne(this.g), Ne(this.b), Ts(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: op,
  // Deprecated! Use color.formatHex.
  formatHex: op,
  formatHex8: ZC,
  formatRgb: sp,
  toString: sp
}));
function op() {
  return `#${Me(this.r)}${Me(this.g)}${Me(this.b)}`;
}
function ZC() {
  return `#${Me(this.r)}${Me(this.g)}${Me(this.b)}${Me((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function sp() {
  const t = Ts(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Ne(this.r)}, ${Ne(this.g)}, ${Ne(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Ts(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Ne(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Me(t) {
  return t = Ne(t), (t < 16 ? "0" : "") + t.toString(16);
}
function up(t, r, e, n) {
  return n <= 0 ? t = r = e = NaN : e <= 0 || e >= 1 ? t = r = NaN : r <= 0 && (t = NaN), new cr(t, r, e, n);
}
function OS(t) {
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
function Ba(t, r, e, n) {
  return arguments.length === 1 ? OS(t) : new cr(t, r, e, n ?? 1);
}
function cr(t, r, e, n) {
  this.h = +t, this.s = +r, this.l = +e, this.opacity = +n;
}
bi(cr, Ba, vu(He, {
  brighter(t) {
    return t = t == null ? xs : Math.pow(xs, t), new cr(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? ii : Math.pow(ii, t), new cr(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, r = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l, n = e + (e < 0.5 ? e : 1 - e) * r, a = 2 * e - n;
    return new St(
      El(t >= 240 ? t - 240 : t + 120, a, n),
      El(t, a, n),
      El(t < 120 ? t + 240 : t - 120, a, n),
      this.opacity
    );
  },
  clamp() {
    return new cr(lp(this.h), ro(this.s), ro(this.l), Ts(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Ts(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${lp(this.h)}, ${ro(this.s) * 100}%, ${ro(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function lp(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function ro(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function El(t, r, e) {
  return (t < 60 ? r + (e - r) * t / 60 : t < 180 ? e : t < 240 ? r + (e - r) * (240 - t) / 60 : r) * 255;
}
const QC = Math.PI / 180, t2 = 180 / Math.PI, Is = 18, AS = 0.96422, RS = 1, _S = 0.82521, CS = 4 / 29, An = 6 / 29, PS = 3 * An * An, r2 = An * An * An;
function MS(t) {
  if (t instanceof Or)
    return new Or(t.l, t.a, t.b, t.opacity);
  if (t instanceof jr)
    return NS(t);
  t instanceof St || (t = IS(t));
  var r = Al(t.r), e = Al(t.g), n = Al(t.b), a = Tl((0.2225045 * r + 0.7168786 * e + 0.0606169 * n) / RS), i, o;
  return r === e && e === n ? i = o = a : (i = Tl((0.4360747 * r + 0.3850649 * e + 0.1430804 * n) / AS), o = Tl((0.0139322 * r + 0.0971045 * e + 0.7141733 * n) / _S)), new Or(116 * a - 16, 500 * (i - a), 200 * (a - o), t.opacity);
}
function Be(t, r, e, n) {
  return arguments.length === 1 ? MS(t) : new Or(t, r, e, n ?? 1);
}
function Or(t, r, e, n) {
  this.l = +t, this.a = +r, this.b = +e, this.opacity = +n;
}
bi(Or, Be, vu(He, {
  brighter(t) {
    return new Or(this.l + Is * (t ?? 1), this.a, this.b, this.opacity);
  },
  darker(t) {
    return new Or(this.l - Is * (t ?? 1), this.a, this.b, this.opacity);
  },
  rgb() {
    var t = (this.l + 16) / 116, r = isNaN(this.a) ? t : t + this.a / 500, e = isNaN(this.b) ? t : t - this.b / 200;
    return r = AS * Il(r), t = RS * Il(t), e = _S * Il(e), new St(
      Ol(3.1338561 * r - 1.6168667 * t - 0.4906146 * e),
      Ol(-0.9787684 * r + 1.9161415 * t + 0.033454 * e),
      Ol(0.0719453 * r - 0.2289914 * t + 1.4052427 * e),
      this.opacity
    );
  }
}));
function Tl(t) {
  return t > r2 ? Math.pow(t, 1 / 3) : t / PS + CS;
}
function Il(t) {
  return t > An ? t * t * t : PS * (t - CS);
}
function Ol(t) {
  return 255 * (t <= 31308e-7 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055);
}
function Al(t) {
  return (t /= 255) <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
}
function e2(t) {
  if (t instanceof jr)
    return new jr(t.h, t.c, t.l, t.opacity);
  if (t instanceof Or || (t = MS(t)), t.a === 0 && t.b === 0)
    return new jr(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
  var r = Math.atan2(t.b, t.a) * t2;
  return new jr(r < 0 ? r + 360 : r, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity);
}
function n2(t, r, e, n) {
  return arguments.length === 1 ? e2(t) : new jr(t, r, e, n ?? 1);
}
function jr(t, r, e, n) {
  this.h = +t, this.c = +r, this.l = +e, this.opacity = +n;
}
function NS(t) {
  if (isNaN(t.h))
    return new Or(t.l, 0, 0, t.opacity);
  var r = t.h * QC;
  return new Or(t.l, Math.cos(r) * t.c, Math.sin(r) * t.c, t.opacity);
}
bi(jr, n2, vu(He, {
  brighter(t) {
    return new jr(this.h, this.c, this.l + Is * (t ?? 1), this.opacity);
  },
  darker(t) {
    return new jr(this.h, this.c, this.l - Is * (t ?? 1), this.opacity);
  },
  rgb() {
    return NS(this).rgb();
  }
}));
const Ph = (t) => () => t;
function a2(t, r) {
  return function(e) {
    return t + e * r;
  };
}
function i2(t, r, e) {
  return t = Math.pow(t, e), r = Math.pow(r, e) - t, e = 1 / e, function(n) {
    return Math.pow(t + n * r, e);
  };
}
function o2(t) {
  return (t = +t) == 1 ? mn : function(r, e) {
    return e - r ? i2(r, e, t) : Ph(isNaN(r) ? e : r);
  };
}
function mn(t, r) {
  var e = r - t;
  return e ? a2(t, e) : Ph(isNaN(t) ? r : t);
}
const Os = function t(r) {
  var e = o2(r);
  function n(a, i) {
    var o = e((a = Es(a)).r, (i = Es(i)).r), s = e(a.g, i.g), u = e(a.b, i.b), l = mn(a.opacity, i.opacity);
    return function(c) {
      return a.r = o(c), a.g = s(c), a.b = u(c), a.opacity = l(c), a + "";
    };
  }
  return n.gamma = t, n;
}(1);
function s2(t, r) {
  r || (r = []);
  var e = t ? Math.min(r.length, t.length) : 0, n = r.slice(), a;
  return function(i) {
    for (a = 0; a < e; ++a)
      n[a] = t[a] * (1 - i) + r[a] * i;
    return n;
  };
}
function u2(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function l2(t, r) {
  var e = r ? r.length : 0, n = t ? Math.min(e, t.length) : 0, a = new Array(n), i = new Array(e), o;
  for (o = 0; o < n; ++o)
    a[o] = Rn(t[o], r[o]);
  for (; o < e; ++o)
    i[o] = r[o];
  return function(s) {
    for (o = 0; o < n; ++o)
      i[o] = a[o](s);
    return i;
  };
}
function c2(t, r) {
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
function f2(t, r) {
  var e = {}, n = {}, a;
  (t === null || typeof t != "object") && (t = {}), (r === null || typeof r != "object") && (r = {});
  for (a in r)
    a in t ? e[a] = Rn(t[a], r[a]) : n[a] = r[a];
  return function(i) {
    for (a in e)
      n[a] = e[a](i);
    return n;
  };
}
var Jf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Rl = new RegExp(Jf.source, "g");
function v2(t) {
  return function() {
    return t;
  };
}
function h2(t) {
  return function(r) {
    return t(r) + "";
  };
}
function DS(t, r) {
  var e = Jf.lastIndex = Rl.lastIndex = 0, n, a, i, o = -1, s = [], u = [];
  for (t = t + "", r = r + ""; (n = Jf.exec(t)) && (a = Rl.exec(r)); )
    (i = a.index) > e && (i = r.slice(e, i), s[o] ? s[o] += i : s[++o] = i), (n = n[0]) === (a = a[0]) ? s[o] ? s[o] += a : s[++o] = a : (s[++o] = null, u.push({ i: o, x: ur(n, a) })), e = Rl.lastIndex;
  return e < r.length && (i = r.slice(e), s[o] ? s[o] += i : s[++o] = i), s.length < 2 ? u[0] ? h2(u[0].x) : v2(r) : (r = u.length, function(l) {
    for (var c = 0, f; c < r; ++c)
      s[(f = u[c]).i] = f.x(l);
    return s.join("");
  });
}
function Rn(t, r) {
  var e = typeof r, n;
  return r == null || e === "boolean" ? Ph(r) : (e === "number" ? ur : e === "string" ? (n = ke(r)) ? (r = n, Os) : DS : r instanceof ke ? Os : r instanceof Date ? c2 : u2(r) ? s2 : Array.isArray(r) ? l2 : typeof r.valueOf != "function" && typeof r.toString != "function" || isNaN(r) ? f2 : ur)(t, r);
}
function d2(t, r) {
  return t = +t, r = +r, function(e) {
    return Math.round(t * (1 - e) + r * e);
  };
}
var cp = 180 / Math.PI, Zf = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function FS(t, r, e, n, a, i) {
  var o, s, u;
  return (o = Math.sqrt(t * t + r * r)) && (t /= o, r /= o), (u = t * e + r * n) && (e -= t * u, n -= r * u), (s = Math.sqrt(e * e + n * n)) && (e /= s, n /= s, u /= s), t * n < r * e && (t = -t, r = -r, u = -u, o = -o), {
    translateX: a,
    translateY: i,
    rotate: Math.atan2(r, t) * cp,
    skewX: Math.atan(u) * cp,
    scaleX: o,
    scaleY: s
  };
}
var eo;
function g2(t) {
  const r = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return r.isIdentity ? Zf : FS(r.a, r.b, r.c, r.d, r.e, r.f);
}
function p2(t) {
  return t == null || (eo || (eo = document.createElementNS("http://www.w3.org/2000/svg", "g")), eo.setAttribute("transform", t), !(t = eo.transform.baseVal.consolidate())) ? Zf : (t = t.matrix, FS(t.a, t.b, t.c, t.d, t.e, t.f));
}
function LS(t, r, e, n) {
  function a(l) {
    return l.length ? l.pop() + " " : "";
  }
  function i(l, c, f, v, h, d) {
    if (l !== f || c !== v) {
      var $ = h.push("translate(", null, r, null, e);
      d.push({ i: $ - 4, x: ur(l, f) }, { i: $ - 2, x: ur(c, v) });
    } else
      (f || v) && h.push("translate(" + f + r + v + e);
  }
  function o(l, c, f, v) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), v.push({ i: f.push(a(f) + "rotate(", null, n) - 2, x: ur(l, c) })) : c && f.push(a(f) + "rotate(" + c + n);
  }
  function s(l, c, f, v) {
    l !== c ? v.push({ i: f.push(a(f) + "skewX(", null, n) - 2, x: ur(l, c) }) : c && f.push(a(f) + "skewX(" + c + n);
  }
  function u(l, c, f, v, h, d) {
    if (l !== f || c !== v) {
      var $ = h.push(a(h) + "scale(", null, ",", null, ")");
      d.push({ i: $ - 4, x: ur(l, f) }, { i: $ - 2, x: ur(c, v) });
    } else
      (f !== 1 || v !== 1) && h.push(a(h) + "scale(" + f + "," + v + ")");
  }
  return function(l, c) {
    var f = [], v = [];
    return l = t(l), c = t(c), i(l.translateX, l.translateY, c.translateX, c.translateY, f, v), o(l.rotate, c.rotate, f, v), s(l.skewX, c.skewX, f, v), u(l.scaleX, l.scaleY, c.scaleX, c.scaleY, f, v), l = c = null, function(h) {
      for (var d = -1, $ = v.length, y; ++d < $; )
        f[(y = v[d]).i] = y.x(h);
      return f.join("");
    };
  };
}
var $2 = LS(g2, "px, ", "px)", "deg)"), y2 = LS(p2, ", ", ")", ")"), m2 = 1e-12;
function fp(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function b2(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function w2(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const S2 = function t(r, e, n) {
  function a(i, o) {
    var s = i[0], u = i[1], l = i[2], c = o[0], f = o[1], v = o[2], h = c - s, d = f - u, $ = h * h + d * d, y, p;
    if ($ < m2)
      p = Math.log(v / l) / r, y = function(V) {
        return [
          s + V * h,
          u + V * d,
          l * Math.exp(r * V * p)
        ];
      };
    else {
      var w = Math.sqrt($), T = (v * v - l * l + n * $) / (2 * l * e * w), R = (v * v - l * l - n * $) / (2 * v * e * w), M = Math.log(Math.sqrt(T * T + 1) - T), L = Math.log(Math.sqrt(R * R + 1) - R);
      p = (L - M) / r, y = function(V) {
        var W = V * p, J = fp(M), rt = l / (e * w) * (J * w2(r * W + M) - b2(M));
        return [
          s + rt * h,
          u + rt * d,
          l * J / fp(r * W + M)
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
function Mh(t, r) {
  var e = mn((t = Be(t)).l, (r = Be(r)).l), n = mn(t.a, r.a), a = mn(t.b, r.b), i = mn(t.opacity, r.opacity);
  return function(o) {
    return t.l = e(o), t.a = n(o), t.b = a(o), t.opacity = i(o), t + "";
  };
}
var Bn = 0, ja = 0, ma = 0, kS = 1e3, As, Ua, Rs = 0, je = 0, hu = 0, si = typeof performance == "object" && performance.now ? performance : Date, BS = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Nh() {
  return je || (BS(x2), je = si.now() + hu);
}
function x2() {
  je = 0;
}
function _s() {
  this._call = this._time = this._next = null;
}
_s.prototype = jS.prototype = {
  constructor: _s,
  restart: function(t, r, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    e = (e == null ? Nh() : +e) + (r == null ? 0 : +r), !this._next && Ua !== this && (Ua ? Ua._next = this : As = this, Ua = this), this._call = t, this._time = e, Qf();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Qf());
  }
};
function jS(t, r, e) {
  var n = new _s();
  return n.restart(t, r, e), n;
}
function E2() {
  Nh(), ++Bn;
  for (var t = As, r; t; )
    (r = je - t._time) >= 0 && t._call.call(void 0, r), t = t._next;
  --Bn;
}
function vp() {
  je = (Rs = si.now()) + hu, Bn = ja = 0;
  try {
    E2();
  } finally {
    Bn = 0, I2(), je = 0;
  }
}
function T2() {
  var t = si.now(), r = t - Rs;
  r > kS && (hu -= r, Rs = t);
}
function I2() {
  for (var t, r = As, e, n = 1 / 0; r; )
    r._call ? (n > r._time && (n = r._time), t = r, r = r._next) : (e = r._next, r._next = null, r = t ? t._next = e : As = e);
  Ua = t, Qf(n);
}
function Qf(t) {
  if (!Bn) {
    ja && (ja = clearTimeout(ja));
    var r = t - je;
    r > 24 ? (t < 1 / 0 && (ja = setTimeout(vp, t - si.now() - hu)), ma && (ma = clearInterval(ma))) : (ma || (Rs = si.now(), ma = setInterval(T2, kS)), Bn = 1, BS(vp));
  }
}
function hp(t, r, e) {
  var n = new _s();
  return r = r == null ? 0 : +r, n.restart((a) => {
    n.stop(), t(a + r);
  }, r, e), n;
}
var O2 = Rh("start", "end", "cancel", "interrupt"), A2 = [], US = 0, dp = 1, tv = 2, ts = 3, gp = 4, rv = 5, rs = 6;
function du(t, r, e, n, a, i) {
  var o = t.__transition;
  if (!o)
    t.__transition = {};
  else if (e in o)
    return;
  R2(t, e, {
    name: r,
    index: n,
    // For context during callback.
    group: a,
    // For context during callback.
    on: O2,
    tween: A2,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: US
  });
}
function Dh(t, r) {
  var e = dr(t, r);
  if (e.state > US)
    throw new Error("too late; already scheduled");
  return e;
}
function Rr(t, r) {
  var e = dr(t, r);
  if (e.state > ts)
    throw new Error("too late; already running");
  return e;
}
function dr(t, r) {
  var e = t.__transition;
  if (!e || !(e = e[r]))
    throw new Error("transition not found");
  return e;
}
function R2(t, r, e) {
  var n = t.__transition, a;
  n[r] = e, e.timer = jS(i, 0, e.time);
  function i(l) {
    e.state = dp, e.timer.restart(o, e.delay, e.time), e.delay <= l && o(l - e.delay);
  }
  function o(l) {
    var c, f, v, h;
    if (e.state !== dp)
      return u();
    for (c in n)
      if (h = n[c], h.name === e.name) {
        if (h.state === ts)
          return hp(o);
        h.state === gp ? (h.state = rs, h.timer.stop(), h.on.call("interrupt", t, t.__data__, h.index, h.group), delete n[c]) : +c < r && (h.state = rs, h.timer.stop(), h.on.call("cancel", t, t.__data__, h.index, h.group), delete n[c]);
      }
    if (hp(function() {
      e.state === ts && (e.state = gp, e.timer.restart(s, e.delay, e.time), s(l));
    }), e.state = tv, e.on.call("start", t, t.__data__, e.index, e.group), e.state === tv) {
      for (e.state = ts, a = new Array(v = e.tween.length), c = 0, f = -1; c < v; ++c)
        (h = e.tween[c].value.call(t, t.__data__, e.index, e.group)) && (a[++f] = h);
      a.length = f + 1;
    }
  }
  function s(l) {
    for (var c = l < e.duration ? e.ease.call(null, l / e.duration) : (e.timer.restart(u), e.state = rv, 1), f = -1, v = a.length; ++f < v; )
      a[f].call(t, c);
    e.state === rv && (e.on.call("end", t, t.__data__, e.index, e.group), u());
  }
  function u() {
    e.state = rs, e.timer.stop(), delete n[r];
    for (var l in n)
      return;
    delete t.__transition;
  }
}
function es(t, r) {
  var e = t.__transition, n, a, i = !0, o;
  if (e) {
    r = r == null ? null : r + "";
    for (o in e) {
      if ((n = e[o]).name !== r) {
        i = !1;
        continue;
      }
      a = n.state > tv && n.state < rv, n.state = rs, n.timer.stop(), n.on.call(a ? "interrupt" : "cancel", t, t.__data__, n.index, n.group), delete e[o];
    }
    i && delete t.__transition;
  }
}
function _2(t) {
  return this.each(function() {
    es(this, t);
  });
}
function C2(t, r) {
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
function P2(t, r, e) {
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
function M2(t, r) {
  var e = this._id;
  if (t += "", arguments.length < 2) {
    for (var n = dr(this.node(), e).tween, a = 0, i = n.length, o; a < i; ++a)
      if ((o = n[a]).name === t)
        return o.value;
    return null;
  }
  return this.each((r == null ? C2 : P2)(e, t, r));
}
function Fh(t, r, e) {
  var n = t._id;
  return t.each(function() {
    var a = Rr(this, n);
    (a.value || (a.value = {}))[r] = e.apply(this, arguments);
  }), function(a) {
    return dr(a, n).value[r];
  };
}
function zS(t, r) {
  var e;
  return (typeof r == "number" ? ur : r instanceof ke ? Os : (e = ke(r)) ? (r = e, Os) : DS)(t, r);
}
function N2(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function D2(t) {
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
function L2(t, r, e) {
  var n, a = e + "", i;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === a ? null : o === n ? i : i = r(n = o, e);
  };
}
function k2(t, r, e) {
  var n, a, i;
  return function() {
    var o, s = e(this), u;
    return s == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), u = s + "", o === u ? null : o === n && u === a ? i : (a = u, i = r(n = o, s)));
  };
}
function B2(t, r, e) {
  var n, a, i;
  return function() {
    var o, s = e(this), u;
    return s == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), u = s + "", o === u ? null : o === n && u === a ? i : (a = u, i = r(n = o, s)));
  };
}
function j2(t, r) {
  var e = fu(t), n = e === "transform" ? y2 : zS;
  return this.attrTween(t, typeof r == "function" ? (e.local ? B2 : k2)(e, n, Fh(this, "attr." + t, r)) : r == null ? (e.local ? D2 : N2)(e) : (e.local ? L2 : F2)(e, n, r));
}
function U2(t, r) {
  return function(e) {
    this.setAttribute(t, r.call(this, e));
  };
}
function z2(t, r) {
  return function(e) {
    this.setAttributeNS(t.space, t.local, r.call(this, e));
  };
}
function V2(t, r) {
  var e, n;
  function a() {
    var i = r.apply(this, arguments);
    return i !== n && (e = (n = i) && z2(t, i)), e;
  }
  return a._value = r, a;
}
function H2(t, r) {
  var e, n;
  function a() {
    var i = r.apply(this, arguments);
    return i !== n && (e = (n = i) && U2(t, i)), e;
  }
  return a._value = r, a;
}
function G2(t, r) {
  var e = "attr." + t;
  if (arguments.length < 2)
    return (e = this.tween(e)) && e._value;
  if (r == null)
    return this.tween(e, null);
  if (typeof r != "function")
    throw new Error();
  var n = fu(t);
  return this.tween(e, (n.local ? V2 : H2)(n, r));
}
function W2(t, r) {
  return function() {
    Dh(this, t).delay = +r.apply(this, arguments);
  };
}
function q2(t, r) {
  return r = +r, function() {
    Dh(this, t).delay = r;
  };
}
function Y2(t) {
  var r = this._id;
  return arguments.length ? this.each((typeof t == "function" ? W2 : q2)(r, t)) : dr(this.node(), r).delay;
}
function K2(t, r) {
  return function() {
    Rr(this, t).duration = +r.apply(this, arguments);
  };
}
function X2(t, r) {
  return r = +r, function() {
    Rr(this, t).duration = r;
  };
}
function J2(t) {
  var r = this._id;
  return arguments.length ? this.each((typeof t == "function" ? K2 : X2)(r, t)) : dr(this.node(), r).duration;
}
function Z2(t, r) {
  if (typeof r != "function")
    throw new Error();
  return function() {
    Rr(this, t).ease = r;
  };
}
function Q2(t) {
  var r = this._id;
  return arguments.length ? this.each(Z2(r, t)) : dr(this.node(), r).ease;
}
function tP(t, r) {
  return function() {
    var e = r.apply(this, arguments);
    if (typeof e != "function")
      throw new Error();
    Rr(this, t).ease = e;
  };
}
function rP(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(tP(this._id, t));
}
function eP(t) {
  typeof t != "function" && (t = pS(t));
  for (var r = this._groups, e = r.length, n = new Array(e), a = 0; a < e; ++a)
    for (var i = r[a], o = i.length, s = n[a] = [], u, l = 0; l < o; ++l)
      (u = i[l]) && t.call(u, u.__data__, l, i) && s.push(u);
  return new Vr(n, this._parents, this._name, this._id);
}
function nP(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var r = this._groups, e = t._groups, n = r.length, a = e.length, i = Math.min(n, a), o = new Array(n), s = 0; s < i; ++s)
    for (var u = r[s], l = e[s], c = u.length, f = o[s] = new Array(c), v, h = 0; h < c; ++h)
      (v = u[h] || l[h]) && (f[h] = v);
  for (; s < n; ++s)
    o[s] = r[s];
  return new Vr(o, this._parents, this._name, this._id);
}
function aP(t) {
  return (t + "").trim().split(/^|\s+/).every(function(r) {
    var e = r.indexOf(".");
    return e >= 0 && (r = r.slice(0, e)), !r || r === "start";
  });
}
function iP(t, r, e) {
  var n, a, i = aP(r) ? Dh : Rr;
  return function() {
    var o = i(this, t), s = o.on;
    s !== n && (a = (n = s).copy()).on(r, e), o.on = a;
  };
}
function oP(t, r) {
  var e = this._id;
  return arguments.length < 2 ? dr(this.node(), e).on.on(t) : this.each(iP(e, t, r));
}
function sP(t) {
  return function() {
    var r = this.parentNode;
    for (var e in this.__transition)
      if (+e !== t)
        return;
    r && r.removeChild(this);
  };
}
function uP() {
  return this.on("end.remove", sP(this._id));
}
function lP(t) {
  var r = this._name, e = this._id;
  typeof t != "function" && (t = _h(t));
  for (var n = this._groups, a = n.length, i = new Array(a), o = 0; o < a; ++o)
    for (var s = n[o], u = s.length, l = i[o] = new Array(u), c, f, v = 0; v < u; ++v)
      (c = s[v]) && (f = t.call(c, c.__data__, v, s)) && ("__data__" in c && (f.__data__ = c.__data__), l[v] = f, du(l[v], r, e, v, l, dr(c, e)));
  return new Vr(i, this._parents, r, e);
}
function cP(t) {
  var r = this._name, e = this._id;
  typeof t != "function" && (t = gS(t));
  for (var n = this._groups, a = n.length, i = [], o = [], s = 0; s < a; ++s)
    for (var u = n[s], l = u.length, c, f = 0; f < l; ++f)
      if (c = u[f]) {
        for (var v = t.call(c, c.__data__, f, u), h, d = dr(c, e), $ = 0, y = v.length; $ < y; ++$)
          (h = v[$]) && du(h, r, e, $, v, d);
        i.push(v), o.push(c);
      }
  return new Vr(i, o, r, e);
}
var fP = mi.prototype.constructor;
function vP() {
  return new fP(this._groups, this._parents);
}
function hP(t, r) {
  var e, n, a;
  return function() {
    var i = kn(this, t), o = (this.style.removeProperty(t), kn(this, t));
    return i === o ? null : i === e && o === n ? a : a = r(e = i, n = o);
  };
}
function VS(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function dP(t, r, e) {
  var n, a = e + "", i;
  return function() {
    var o = kn(this, t);
    return o === a ? null : o === n ? i : i = r(n = o, e);
  };
}
function gP(t, r, e) {
  var n, a, i;
  return function() {
    var o = kn(this, t), s = e(this), u = s + "";
    return s == null && (u = s = (this.style.removeProperty(t), kn(this, t))), o === u ? null : o === n && u === a ? i : (a = u, i = r(n = o, s));
  };
}
function pP(t, r) {
  var e, n, a, i = "style." + r, o = "end." + i, s;
  return function() {
    var u = Rr(this, t), l = u.on, c = u.value[i] == null ? s || (s = VS(r)) : void 0;
    (l !== e || a !== c) && (n = (e = l).copy()).on(o, a = c), u.on = n;
  };
}
function $P(t, r, e) {
  var n = (t += "") == "transform" ? $2 : zS;
  return r == null ? this.styleTween(t, hP(t, n)).on("end.style." + t, VS(t)) : typeof r == "function" ? this.styleTween(t, gP(t, n, Fh(this, "style." + t, r))).each(pP(this._id, t)) : this.styleTween(t, dP(t, n, r), e).on("end.style." + t, null);
}
function yP(t, r, e) {
  return function(n) {
    this.style.setProperty(t, r.call(this, n), e);
  };
}
function mP(t, r, e) {
  var n, a;
  function i() {
    var o = r.apply(this, arguments);
    return o !== a && (n = (a = o) && yP(t, o, e)), n;
  }
  return i._value = r, i;
}
function bP(t, r, e) {
  var n = "style." + (t += "");
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (r == null)
    return this.tween(n, null);
  if (typeof r != "function")
    throw new Error();
  return this.tween(n, mP(t, r, e ?? ""));
}
function wP(t) {
  return function() {
    this.textContent = t;
  };
}
function SP(t) {
  return function() {
    var r = t(this);
    this.textContent = r ?? "";
  };
}
function xP(t) {
  return this.tween("text", typeof t == "function" ? SP(Fh(this, "text", t)) : wP(t == null ? "" : t + ""));
}
function EP(t) {
  return function(r) {
    this.textContent = t.call(this, r);
  };
}
function TP(t) {
  var r, e;
  function n() {
    var a = t.apply(this, arguments);
    return a !== e && (r = (e = a) && EP(a)), r;
  }
  return n._value = t, n;
}
function IP(t) {
  var r = "text";
  if (arguments.length < 1)
    return (r = this.tween(r)) && r._value;
  if (t == null)
    return this.tween(r, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(r, TP(t));
}
function OP() {
  for (var t = this._name, r = this._id, e = HS(), n = this._groups, a = n.length, i = 0; i < a; ++i)
    for (var o = n[i], s = o.length, u, l = 0; l < s; ++l)
      if (u = o[l]) {
        var c = dr(u, r);
        du(u, t, e, l, o, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Vr(n, this._parents, t, e);
}
function AP() {
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
var RP = 0;
function Vr(t, r, e, n) {
  this._groups = t, this._parents = r, this._name = e, this._id = n;
}
function HS() {
  return ++RP;
}
var Dr = mi.prototype;
Vr.prototype = {
  constructor: Vr,
  select: lP,
  selectAll: cP,
  selectChild: Dr.selectChild,
  selectChildren: Dr.selectChildren,
  filter: eP,
  merge: nP,
  selection: vP,
  transition: OP,
  call: Dr.call,
  nodes: Dr.nodes,
  node: Dr.node,
  size: Dr.size,
  empty: Dr.empty,
  each: Dr.each,
  on: oP,
  attr: j2,
  attrTween: G2,
  style: $P,
  styleTween: bP,
  text: xP,
  textTween: IP,
  remove: uP,
  tween: M2,
  delay: Y2,
  duration: J2,
  ease: Q2,
  easeVarying: rP,
  end: AP,
  [Symbol.iterator]: Dr[Symbol.iterator]
};
function _P(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var CP = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: _P
};
function PP(t, r) {
  for (var e; !(e = t.__transition) || !(e = e[r]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${r} not found`);
  return e;
}
function MP(t) {
  var r, e;
  t instanceof Vr ? (r = t._id, t = t._name) : (r = HS(), (e = CP).time = Nh(), t = t == null ? null : t + "");
  for (var n = this._groups, a = n.length, i = 0; i < a; ++i)
    for (var o = n[i], s = o.length, u, l = 0; l < s; ++l)
      (u = o[l]) && du(u, t, r, l, o, e || PP(u, r));
  return new Vr(n, this._parents, t, r);
}
mi.prototype.interrupt = _2;
mi.prototype.transition = MP;
const ev = Math.PI, nv = 2 * ev, Ce = 1e-6, NP = nv - Ce;
function GS(t) {
  this._ += t[0];
  for (let r = 1, e = t.length; r < e; ++r)
    this._ += arguments[r] + t[r];
}
function DP(t) {
  let r = Math.floor(t);
  if (!(r >= 0))
    throw new Error(`invalid digits: ${t}`);
  if (r > 15)
    return GS;
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
    this._x1 = this._y1 = null, this._ = "", this._append = r == null ? GS : DP(r);
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
    let o = this._x1, s = this._y1, u = n - r, l = a - e, c = o - r, f = s - e, v = c * c + f * f;
    if (this._x1 === null)
      this._append`M${this._x1 = r},${this._y1 = e}`;
    else if (v > Ce)
      if (!(Math.abs(f * u - l * c) > Ce) || !i)
        this._append`L${this._x1 = r},${this._y1 = e}`;
      else {
        let h = n - o, d = a - s, $ = u * u + l * l, y = h * h + d * d, p = Math.sqrt($), w = Math.sqrt(v), T = i * Math.tan((ev - Math.acos(($ + v - y) / (2 * p * w))) / 2), R = T / w, M = T / p;
        Math.abs(R - 1) > Ce && this._append`L${r + R * c},${e + R * f}`, this._append`A${i},${i},0,0,${+(f * h > c * d)},${this._x1 = r + M * u},${this._y1 = e + M * l}`;
      }
  }
  arc(r, e, n, a, i, o) {
    if (r = +r, e = +e, n = +n, o = !!o, n < 0)
      throw new Error(`negative radius: ${n}`);
    let s = n * Math.cos(a), u = n * Math.sin(a), l = r + s, c = e + u, f = 1 ^ o, v = o ? a - i : i - a;
    this._x1 === null ? this._append`M${l},${c}` : (Math.abs(this._x1 - l) > Ce || Math.abs(this._y1 - c) > Ce) && this._append`L${l},${c}`, n && (v < 0 && (v = v % nv + nv), v > NP ? this._append`A${n},${n},0,1,${f},${r - s},${e - u}A${n},${n},0,1,${f},${this._x1 = l},${this._y1 = c}` : v > Ce && this._append`A${n},${n},0,${+(v >= ev)},${f},${this._x1 = r + n * Math.cos(i)},${this._y1 = e + n * Math.sin(i)}`);
  }
  rect(r, e, n, a) {
    this._append`M${this._x0 = this._x1 = +r},${this._y0 = this._y1 = +e}h${n = +n}v${+a}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function LP(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function Cs(t, r) {
  if ((e = (t = r ? t.toExponential(r - 1) : t.toExponential()).indexOf("e")) < 0)
    return null;
  var e, n = t.slice(0, e);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +t.slice(e + 1)
  ];
}
function jn(t) {
  return t = Cs(Math.abs(t)), t ? t[1] : NaN;
}
function kP(t, r) {
  return function(e, n) {
    for (var a = e.length, i = [], o = 0, s = t[0], u = 0; a > 0 && s > 0 && (u + s + 1 > n && (s = Math.max(1, n - u)), i.push(e.substring(a -= s, a + s)), !((u += s + 1) > n)); )
      s = t[o = (o + 1) % t.length];
    return i.reverse().join(r);
  };
}
function BP(t) {
  return function(r) {
    return r.replace(/[0-9]/g, function(e) {
      return t[+e];
    });
  };
}
var jP = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Ps(t) {
  if (!(r = jP.exec(t)))
    throw new Error("invalid format: " + t);
  var r;
  return new Lh({
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
Ps.prototype = Lh.prototype;
function Lh(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Lh.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function UP(t) {
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
var WS;
function zP(t, r) {
  var e = Cs(t, r);
  if (!e)
    return t + "";
  var n = e[0], a = e[1], i = a - (WS = Math.max(-8, Math.min(8, Math.floor(a / 3))) * 3) + 1, o = n.length;
  return i === o ? n : i > o ? n + new Array(i - o + 1).join("0") : i > 0 ? n.slice(0, i) + "." + n.slice(i) : "0." + new Array(1 - i).join("0") + Cs(t, Math.max(0, r + i - 1))[0];
}
function pp(t, r) {
  var e = Cs(t, r);
  if (!e)
    return t + "";
  var n = e[0], a = e[1];
  return a < 0 ? "0." + new Array(-a).join("0") + n : n.length > a + 1 ? n.slice(0, a + 1) + "." + n.slice(a + 1) : n + new Array(a - n.length + 2).join("0");
}
const $p = {
  "%": (t, r) => (t * 100).toFixed(r),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: LP,
  e: (t, r) => t.toExponential(r),
  f: (t, r) => t.toFixed(r),
  g: (t, r) => t.toPrecision(r),
  o: (t) => Math.round(t).toString(8),
  p: (t, r) => pp(t * 100, r),
  r: pp,
  s: zP,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function yp(t) {
  return t;
}
var mp = Array.prototype.map, bp = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function VP(t) {
  var r = t.grouping === void 0 || t.thousands === void 0 ? yp : kP(mp.call(t.grouping, Number), t.thousands + ""), e = t.currency === void 0 ? "" : t.currency[0] + "", n = t.currency === void 0 ? "" : t.currency[1] + "", a = t.decimal === void 0 ? "." : t.decimal + "", i = t.numerals === void 0 ? yp : BP(mp.call(t.numerals, String)), o = t.percent === void 0 ? "%" : t.percent + "", s = t.minus === void 0 ? "−" : t.minus + "", u = t.nan === void 0 ? "NaN" : t.nan + "";
  function l(f) {
    f = Ps(f);
    var v = f.fill, h = f.align, d = f.sign, $ = f.symbol, y = f.zero, p = f.width, w = f.comma, T = f.precision, R = f.trim, M = f.type;
    M === "n" ? (w = !0, M = "g") : $p[M] || (T === void 0 && (T = 12), R = !0, M = "g"), (y || v === "0" && h === "=") && (y = !0, v = "0", h = "=");
    var L = $ === "$" ? e : $ === "#" && /[boxX]/.test(M) ? "0" + M.toLowerCase() : "", V = $ === "$" ? n : /[%p]/.test(M) ? o : "", W = $p[M], J = /[defgprs%]/.test(M);
    T = T === void 0 ? 6 : /[gprs]/.test(M) ? Math.max(1, Math.min(21, T)) : Math.max(0, Math.min(20, T));
    function rt(F) {
      var q = L, N = V, m, _, E;
      if (M === "c")
        N = W(F) + N, F = "";
      else {
        F = +F;
        var P = F < 0 || 1 / F < 0;
        if (F = isNaN(F) ? u : W(Math.abs(F), T), R && (F = UP(F)), P && +F == 0 && d !== "+" && (P = !1), q = (P ? d === "(" ? d : s : d === "-" || d === "(" ? "" : d) + q, N = (M === "s" ? bp[8 + WS / 3] : "") + N + (P && d === "(" ? ")" : ""), J) {
          for (m = -1, _ = F.length; ++m < _; )
            if (E = F.charCodeAt(m), 48 > E || E > 57) {
              N = (E === 46 ? a + F.slice(m + 1) : F.slice(m)) + N, F = F.slice(0, m);
              break;
            }
        }
      }
      w && !y && (F = r(F, 1 / 0));
      var B = q.length + F.length + N.length, S = B < p ? new Array(p - B + 1).join(v) : "";
      switch (w && y && (F = r(S + F, S.length ? p - N.length : 1 / 0), S = ""), h) {
        case "<":
          F = q + F + N + S;
          break;
        case "=":
          F = q + S + F + N;
          break;
        case "^":
          F = S.slice(0, B = S.length >> 1) + q + F + N + S.slice(B);
          break;
        default:
          F = S + q + F + N;
          break;
      }
      return i(F);
    }
    return rt.toString = function() {
      return f + "";
    }, rt;
  }
  function c(f, v) {
    var h = l((f = Ps(f), f.type = "f", f)), d = Math.max(-8, Math.min(8, Math.floor(jn(v) / 3))) * 3, $ = Math.pow(10, -d), y = bp[8 + d / 3];
    return function(p) {
      return h($ * p) + y;
    };
  }
  return {
    format: l,
    formatPrefix: c
  };
}
var no, qS, YS;
HP({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function HP(t) {
  return no = VP(t), qS = no.format, YS = no.formatPrefix, no;
}
function GP(t) {
  return Math.max(0, -jn(Math.abs(t)));
}
function WP(t, r) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(jn(r) / 3))) * 3 - jn(Math.abs(t)));
}
function qP(t, r) {
  return t = Math.abs(t), r = Math.abs(r) - t, Math.max(0, jn(r) - jn(t)) + 1;
}
function YP(t) {
  var r = 0, e = t.children, n = e && e.length;
  if (!n)
    r = 1;
  else
    for (; --n >= 0; )
      r += e[n].value;
  t.value = r;
}
function KP() {
  return this.eachAfter(YP);
}
function XP(t, r) {
  let e = -1;
  for (const n of this)
    t.call(r, n, ++e, this);
  return this;
}
function JP(t, r) {
  for (var e = this, n = [e], a, i, o = -1; e = n.pop(); )
    if (t.call(r, e, ++o, this), a = e.children)
      for (i = a.length - 1; i >= 0; --i)
        n.push(a[i]);
  return this;
}
function ZP(t, r) {
  for (var e = this, n = [e], a = [], i, o, s, u = -1; e = n.pop(); )
    if (a.push(e), i = e.children)
      for (o = 0, s = i.length; o < s; ++o)
        n.push(i[o]);
  for (; e = a.pop(); )
    t.call(r, e, ++u, this);
  return this;
}
function QP(t, r) {
  let e = -1;
  for (const n of this)
    if (t.call(r, n, ++e, this))
      return n;
}
function tM(t) {
  return this.eachAfter(function(r) {
    for (var e = +t(r.data) || 0, n = r.children, a = n && n.length; --a >= 0; )
      e += n[a].value;
    r.value = e;
  });
}
function rM(t) {
  return this.eachBefore(function(r) {
    r.children && r.children.sort(t);
  });
}
function eM(t) {
  for (var r = this, e = nM(r, t), n = [r]; r !== e; )
    r = r.parent, n.push(r);
  for (var a = n.length; t !== e; )
    n.splice(a, 0, t), t = t.parent;
  return n;
}
function nM(t, r) {
  if (t === r)
    return t;
  var e = t.ancestors(), n = r.ancestors(), a = null;
  for (t = e.pop(), r = n.pop(); t === r; )
    a = t, t = e.pop(), r = n.pop();
  return a;
}
function aM() {
  for (var t = this, r = [t]; t = t.parent; )
    r.push(t);
  return r;
}
function iM() {
  return Array.from(this);
}
function oM() {
  var t = [];
  return this.eachBefore(function(r) {
    r.children || t.push(r);
  }), t;
}
function sM() {
  var t = this, r = [];
  return t.each(function(e) {
    e !== t && r.push({ source: e.parent, target: e });
  }), r;
}
function* uM() {
  var t = this, r, e = [t], n, a, i;
  do
    for (r = e.reverse(), e = []; t = r.pop(); )
      if (yield t, n = t.children)
        for (a = 0, i = n.length; a < i; ++a)
          e.push(n[a]);
  while (e.length);
}
function Un(t, r) {
  t instanceof Map ? (t = [void 0, t], r === void 0 && (r = fM)) : r === void 0 && (r = cM);
  for (var e = new ui(t), n, a = [e], i, o, s, u; n = a.pop(); )
    if ((o = r(n.data)) && (u = (o = Array.from(o)).length))
      for (n.children = o, s = u - 1; s >= 0; --s)
        a.push(i = o[s] = new ui(o[s])), i.parent = n, i.depth = n.depth + 1;
  return e.eachBefore(hM);
}
function lM() {
  return Un(this).eachBefore(vM);
}
function cM(t) {
  return t.children;
}
function fM(t) {
  return Array.isArray(t) ? t[1] : null;
}
function vM(t) {
  t.data.value !== void 0 && (t.value = t.data.value), t.data = t.data.data;
}
function hM(t) {
  var r = 0;
  do
    t.height = r;
  while ((t = t.parent) && t.height < ++r);
}
function ui(t) {
  this.data = t, this.depth = this.height = 0, this.parent = null;
}
ui.prototype = Un.prototype = {
  constructor: ui,
  count: KP,
  each: XP,
  eachAfter: ZP,
  eachBefore: JP,
  find: QP,
  sum: tM,
  sort: rM,
  path: eM,
  ancestors: aM,
  descendants: iM,
  leaves: oM,
  links: sM,
  copy: lM,
  [Symbol.iterator]: uM
};
function dM(t) {
  if (typeof t != "function")
    throw new Error();
  return t;
}
function ba() {
  return 0;
}
function wa(t) {
  return function() {
    return t;
  };
}
function KS(t) {
  t.x0 = Math.round(t.x0), t.y0 = Math.round(t.y0), t.x1 = Math.round(t.x1), t.y1 = Math.round(t.y1);
}
function XS(t, r, e, n, a) {
  for (var i = t.children, o, s = -1, u = i.length, l = t.value && (n - r) / t.value; ++s < u; )
    o = i[s], o.y0 = e, o.y1 = a, o.x0 = r, o.x1 = r += o.value * l;
}
function gM() {
  var t = 1, r = 1, e = 0, n = !1;
  function a(o) {
    var s = o.height + 1;
    return o.x0 = o.y0 = e, o.x1 = t, o.y1 = r / s, o.eachBefore(i(r, s)), n && o.eachBefore(KS), o;
  }
  function i(o, s) {
    return function(u) {
      u.children && XS(u, u.x0, o * (u.depth + 1) / s, u.x1, o * (u.depth + 2) / s);
      var l = u.x0, c = u.y0, f = u.x1 - e, v = u.y1 - e;
      f < l && (l = f = (l + f) / 2), v < c && (c = v = (c + v) / 2), u.x0 = l, u.y0 = c, u.x1 = f, u.y1 = v;
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
function pM(t, r) {
  return t.parent === r.parent ? 1 : 2;
}
function _l(t) {
  var r = t.children;
  return r ? r[0] : t.t;
}
function Cl(t) {
  var r = t.children;
  return r ? r[r.length - 1] : t.t;
}
function $M(t, r, e) {
  var n = e / (r.i - t.i);
  r.c -= n, r.s += e, t.c += n, r.z += e, r.m += e;
}
function yM(t) {
  for (var r = 0, e = 0, n = t.children, a = n.length, i; --a >= 0; )
    i = n[a], i.z += r, i.m += r, r += i.s + (e += i.c);
}
function mM(t, r, e) {
  return t.a.parent === r.parent ? t.a : e;
}
function ns(t, r) {
  this._ = t, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = r;
}
ns.prototype = Object.create(ui.prototype);
function bM(t) {
  for (var r = new ns(t, 0), e, n = [r], a, i, o, s; e = n.pop(); )
    if (i = e._.children)
      for (e.children = new Array(s = i.length), o = s - 1; o >= 0; --o)
        n.push(a = e.children[o] = new ns(i[o], o)), a.parent = e;
  return (r.parent = new ns(null, 0)).children = [r], r;
}
function wM() {
  var t = pM, r = 1, e = 1, n = null;
  function a(l) {
    var c = bM(l);
    if (c.eachAfter(i), c.parent.m = -c.z, c.eachBefore(o), n)
      l.eachBefore(u);
    else {
      var f = l, v = l, h = l;
      l.eachBefore(function(w) {
        w.x < f.x && (f = w), w.x > v.x && (v = w), w.depth > h.depth && (h = w);
      });
      var d = f === v ? 1 : t(f, v) / 2, $ = d - f.x, y = r / (v.x + d + $), p = e / (h.depth || 1);
      l.eachBefore(function(w) {
        w.x = (w.x + $) * y, w.y = w.depth * p;
      });
    }
    return l;
  }
  function i(l) {
    var c = l.children, f = l.parent.children, v = l.i ? f[l.i - 1] : null;
    if (c) {
      yM(l);
      var h = (c[0].z + c[c.length - 1].z) / 2;
      v ? (l.z = v.z + t(l._, v._), l.m = l.z - h) : l.z = h;
    } else
      v && (l.z = v.z + t(l._, v._));
    l.parent.A = s(l, v, l.parent.A || f[0]);
  }
  function o(l) {
    l._.x = l.z + l.parent.m, l.m += l.parent.m;
  }
  function s(l, c, f) {
    if (c) {
      for (var v = l, h = l, d = c, $ = v.parent.children[0], y = v.m, p = h.m, w = d.m, T = $.m, R; d = Cl(d), v = _l(v), d && v; )
        $ = _l($), h = Cl(h), h.a = l, R = d.z + w - v.z - y + t(d._, v._), R > 0 && ($M(mM(d, l, f), l, R), y += R, p += R), w += d.m, y += v.m, T += $.m, p += h.m;
      d && !Cl(h) && (h.t = d, h.m += w - p), v && !_l($) && ($.t = v, $.m += y - T, f = l);
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
function SM(t, r, e, n, a) {
  for (var i = t.children, o, s = -1, u = i.length, l = t.value && (a - e) / t.value; ++s < u; )
    o = i[s], o.x0 = r, o.x1 = n, o.y0 = e, o.y1 = e += o.value * l;
}
var xM = (1 + Math.sqrt(5)) / 2;
function EM(t, r, e, n, a, i) {
  for (var o = [], s = r.children, u, l, c = 0, f = 0, v = s.length, h, d, $ = r.value, y, p, w, T, R, M, L; c < v; ) {
    h = a - e, d = i - n;
    do
      y = s[f++].value;
    while (!y && f < v);
    for (p = w = y, M = Math.max(d / h, h / d) / ($ * t), L = y * y * M, R = Math.max(w / L, L / p); f < v; ++f) {
      if (y += l = s[f].value, l < p && (p = l), l > w && (w = l), L = y * y * M, T = Math.max(w / L, L / p), T > R) {
        y -= l;
        break;
      }
      R = T;
    }
    o.push(u = { value: y, dice: h < d, children: s.slice(c, f) }), u.dice ? XS(u, e, n, a, $ ? n += d * y / $ : i) : SM(u, e, n, $ ? e += h * y / $ : a, i), $ -= y, c = f;
  }
  return o;
}
const TM = function t(r) {
  function e(n, a, i, o, s) {
    EM(r, n, a, i, o, s);
  }
  return e.ratio = function(n) {
    return t((n = +n) > 1 ? n : 1);
  }, e;
}(xM);
function IM() {
  var t = TM, r = !1, e = 1, n = 1, a = [0], i = ba, o = ba, s = ba, u = ba, l = ba;
  function c(v) {
    return v.x0 = v.y0 = 0, v.x1 = e, v.y1 = n, v.eachBefore(f), a = [0], r && v.eachBefore(KS), v;
  }
  function f(v) {
    var h = a[v.depth], d = v.x0 + h, $ = v.y0 + h, y = v.x1 - h, p = v.y1 - h;
    y < d && (d = y = (d + y) / 2), p < $ && ($ = p = ($ + p) / 2), v.x0 = d, v.y0 = $, v.x1 = y, v.y1 = p, v.children && (h = a[v.depth + 1] = i(v) / 2, d += l(v) - h, $ += o(v) - h, y -= s(v) - h, p -= u(v) - h, y < d && (d = y = (d + y) / 2), p < $ && ($ = p = ($ + p) / 2), t(v, d, $, y, p));
  }
  return c.round = function(v) {
    return arguments.length ? (r = !!v, c) : r;
  }, c.size = function(v) {
    return arguments.length ? (e = +v[0], n = +v[1], c) : [e, n];
  }, c.tile = function(v) {
    return arguments.length ? (t = dM(v), c) : t;
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
function gu(t, r) {
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
const wp = Symbol("implicit");
function pu() {
  var t = new Xg(), r = [], e = [], n = wp;
  function a(i) {
    let o = t.get(i);
    if (o === void 0) {
      if (n !== wp)
        return n;
      t.set(i, o = r.push(i) - 1);
    }
    return e[o % e.length];
  }
  return a.domain = function(i) {
    if (!arguments.length)
      return r.slice();
    r = [], t = new Xg();
    for (const o of i)
      t.has(o) || t.set(o, r.push(o) - 1);
    return a;
  }, a.range = function(i) {
    return arguments.length ? (e = Array.from(i), a) : e.slice();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.copy = function() {
    return pu(r, e).unknown(n);
  }, gu.apply(a, arguments), a;
}
function JS() {
  var t = pu().unknown(void 0), r = t.domain, e = t.range, n = 0, a = 1, i, o, s = !1, u = 0, l = 0, c = 0.5;
  delete t.unknown;
  function f() {
    var v = r().length, h = a < n, d = h ? a : n, $ = h ? n : a;
    i = ($ - d) / Math.max(1, v - u + l * 2), s && (i = Math.floor(i)), d += ($ - d - i * (v - u)) * c, o = i * (1 - u), s && (d = Math.round(d), o = Math.round(o));
    var y = XR(v).map(function(p) {
      return d + i * p;
    });
    return e(h ? y.reverse() : y);
  }
  return t.domain = function(v) {
    return arguments.length ? (r(v), f()) : r();
  }, t.range = function(v) {
    return arguments.length ? ([n, a] = v, n = +n, a = +a, f()) : [n, a];
  }, t.rangeRound = function(v) {
    return [n, a] = v, n = +n, a = +a, s = !0, f();
  }, t.bandwidth = function() {
    return o;
  }, t.step = function() {
    return i;
  }, t.round = function(v) {
    return arguments.length ? (s = !!v, f()) : s;
  }, t.padding = function(v) {
    return arguments.length ? (u = Math.min(1, l = +v), f()) : u;
  }, t.paddingInner = function(v) {
    return arguments.length ? (u = Math.min(1, v), f()) : u;
  }, t.paddingOuter = function(v) {
    return arguments.length ? (l = +v, f()) : l;
  }, t.align = function(v) {
    return arguments.length ? (c = Math.max(0, Math.min(1, v)), f()) : c;
  }, t.copy = function() {
    return JS(r(), [n, a]).round(s).paddingInner(u).paddingOuter(l).align(c);
  }, gu.apply(f(), arguments);
}
function OM(t) {
  return function() {
    return t;
  };
}
function AM(t) {
  return +t;
}
var Sp = [0, 1];
function bn(t) {
  return t;
}
function av(t, r) {
  return (r -= t = +t) ? function(e) {
    return (e - t) / r;
  } : OM(isNaN(r) ? NaN : 0.5);
}
function RM(t, r) {
  var e;
  return t > r && (e = t, t = r, r = e), function(n) {
    return Math.max(t, Math.min(r, n));
  };
}
function _M(t, r, e) {
  var n = t[0], a = t[1], i = r[0], o = r[1];
  return a < n ? (n = av(a, n), i = e(o, i)) : (n = av(n, a), i = e(i, o)), function(s) {
    return i(n(s));
  };
}
function CM(t, r, e) {
  var n = Math.min(t.length, r.length) - 1, a = new Array(n), i = new Array(n), o = -1;
  for (t[n] < t[0] && (t = t.slice().reverse(), r = r.slice().reverse()); ++o < n; )
    a[o] = av(t[o], t[o + 1]), i[o] = e(r[o], r[o + 1]);
  return function(s) {
    var u = hS(t, s, 1, n) - 1;
    return i[u](a[u](s));
  };
}
function PM(t, r) {
  return r.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function MM() {
  var t = Sp, r = Sp, e = Rn, n, a, i, o = bn, s, u, l;
  function c() {
    var v = Math.min(t.length, r.length);
    return o !== bn && (o = RM(t[0], t[v - 1])), s = v > 2 ? CM : _M, u = l = null, f;
  }
  function f(v) {
    return v == null || isNaN(v = +v) ? i : (u || (u = s(t.map(n), r, e)))(n(o(v)));
  }
  return f.invert = function(v) {
    return o(a((l || (l = s(r, t.map(n), ur)))(v)));
  }, f.domain = function(v) {
    return arguments.length ? (t = Array.from(v, AM), c()) : t.slice();
  }, f.range = function(v) {
    return arguments.length ? (r = Array.from(v), c()) : r.slice();
  }, f.rangeRound = function(v) {
    return r = Array.from(v), e = d2, c();
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
function NM() {
  return MM()(bn, bn);
}
function DM(t, r, e, n) {
  var a = KR(t, r, e), i;
  switch (n = Ps(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(t), Math.abs(r));
      return n.precision == null && !isNaN(i = WP(a, o)) && (n.precision = i), YS(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(i = qP(a, Math.max(Math.abs(t), Math.abs(r)))) && (n.precision = i - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(i = GP(a)) && (n.precision = i - (n.type === "%") * 2);
      break;
    }
  }
  return qS(n);
}
function ZS(t) {
  var r = t.domain;
  return t.ticks = function(e) {
    var n = r();
    return YR(n[0], n[n.length - 1], e ?? 10);
  }, t.tickFormat = function(e, n) {
    var a = r();
    return DM(a[0], a[a.length - 1], e ?? 10, n);
  }, t.nice = function(e) {
    e == null && (e = 10);
    var n = r(), a = 0, i = n.length - 1, o = n[a], s = n[i], u, l, c = 10;
    for (s < o && (l = o, o = s, s = l, l = a, a = i, i = l); c-- > 0; ) {
      if (l = Wf(o, s, e), l === u)
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
  var t = NM();
  return t.copy = function() {
    return PM(t, de());
  }, gu.apply(t, arguments), ZS(t);
}
function QS() {
  var t = 0, r = 1, e = 1, n = [0.5], a = [0, 1], i;
  function o(u) {
    return u != null && u <= u ? a[hS(n, u, 0, e)] : i;
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
    return QS().domain([t, r]).range(a).unknown(i);
  }, gu.apply(ZS(o), arguments);
}
function FM(t) {
  for (var r = t.length / 6 | 0, e = new Array(r), n = 0; n < r; )
    e[n] = "#" + t.slice(n * 6, ++n * 6);
  return e;
}
const LM = FM("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
function _t(t) {
  return function() {
    return t;
  };
}
const xp = Math.abs, wt = Math.atan2, Se = Math.cos, kM = Math.max, Pl = Math.min, br = Math.sin, wn = Math.sqrt, Rt = 1e-12, li = Math.PI, Ms = li / 2, BM = 2 * li;
function jM(t) {
  return t > 1 ? 0 : t < -1 ? li : Math.acos(t);
}
function Ep(t) {
  return t >= 1 ? Ms : t <= -1 ? -Ms : Math.asin(t);
}
function tx(t) {
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
function UM(t) {
  return t.innerRadius;
}
function zM(t) {
  return t.outerRadius;
}
function VM(t) {
  return t.startAngle;
}
function HM(t) {
  return t.endAngle;
}
function GM(t) {
  return t && t.padAngle;
}
function WM(t, r, e, n, a, i, o, s) {
  var u = e - t, l = n - r, c = o - a, f = s - i, v = f * u - c * l;
  if (!(v * v < Rt))
    return v = (c * (r - i) - f * (t - a)) / v, [t + v * u, r + v * l];
}
function ao(t, r, e, n, a, i, o) {
  var s = t - e, u = r - n, l = (o ? i : -i) / wn(s * s + u * u), c = l * u, f = -l * s, v = t + c, h = r + f, d = e + c, $ = n + f, y = (v + d) / 2, p = (h + $) / 2, w = d - v, T = $ - h, R = w * w + T * T, M = a - i, L = v * $ - d * h, V = (T < 0 ? -1 : 1) * wn(kM(0, M * M * R - L * L)), W = (L * T - w * V) / R, J = (-L * w - T * V) / R, rt = (L * T + w * V) / R, F = (-L * w + T * V) / R, q = W - y, N = J - p, m = rt - y, _ = F - p;
  return q * q + N * N > m * m + _ * _ && (W = rt, J = F), {
    cx: W,
    cy: J,
    x01: -c,
    y01: -f,
    x11: W * (a / M - 1),
    y11: J * (a / M - 1)
  };
}
function iv() {
  var t = UM, r = zM, e = _t(0), n = null, a = VM, i = HM, o = GM, s = null, u = tx(l);
  function l() {
    var c, f, v = +t.apply(this, arguments), h = +r.apply(this, arguments), d = a.apply(this, arguments) - Ms, $ = i.apply(this, arguments) - Ms, y = xp($ - d), p = $ > d;
    if (s || (s = c = u()), h < v && (f = h, h = v, v = f), !(h > Rt))
      s.moveTo(0, 0);
    else if (y > BM - Rt)
      s.moveTo(h * Se(d), h * br(d)), s.arc(0, 0, h, d, $, !p), v > Rt && (s.moveTo(v * Se($), v * br($)), s.arc(0, 0, v, $, d, p));
    else {
      var w = d, T = $, R = d, M = $, L = y, V = y, W = o.apply(this, arguments) / 2, J = W > Rt && (n ? +n.apply(this, arguments) : wn(v * v + h * h)), rt = Pl(xp(h - v) / 2, +e.apply(this, arguments)), F = rt, q = rt, N, m;
      if (J > Rt) {
        var _ = Ep(J / v * br(W)), E = Ep(J / h * br(W));
        (L -= _ * 2) > Rt ? (_ *= p ? 1 : -1, R += _, M -= _) : (L = 0, R = M = (d + $) / 2), (V -= E * 2) > Rt ? (E *= p ? 1 : -1, w += E, T -= E) : (V = 0, w = T = (d + $) / 2);
      }
      var P = h * Se(w), B = h * br(w), S = v * Se(M), x = v * br(M);
      if (rt > Rt) {
        var b = h * Se(T), I = h * br(T), C = v * Se(R), k = v * br(R), H;
        if (y < li)
          if (H = WM(P, B, C, k, b, I, S, x)) {
            var nt = P - H[0], at = B - H[1], it = b - H[0], ir = I - H[1], ee = 1 / br(jM((nt * it + at * ir) / (wn(nt * nt + at * at) * wn(it * it + ir * ir))) / 2), mr = wn(H[0] * H[0] + H[1] * H[1]);
            F = Pl(rt, (v - mr) / (ee - 1)), q = Pl(rt, (h - mr) / (ee + 1));
          } else
            F = q = 0;
      }
      V > Rt ? q > Rt ? (N = ao(C, k, P, B, h, q, p), m = ao(b, I, S, x, h, q, p), s.moveTo(N.cx + N.x01, N.cy + N.y01), q < rt ? s.arc(N.cx, N.cy, q, wt(N.y01, N.x01), wt(m.y01, m.x01), !p) : (s.arc(N.cx, N.cy, q, wt(N.y01, N.x01), wt(N.y11, N.x11), !p), s.arc(0, 0, h, wt(N.cy + N.y11, N.cx + N.x11), wt(m.cy + m.y11, m.cx + m.x11), !p), s.arc(m.cx, m.cy, q, wt(m.y11, m.x11), wt(m.y01, m.x01), !p))) : (s.moveTo(P, B), s.arc(0, 0, h, w, T, !p)) : s.moveTo(P, B), !(v > Rt) || !(L > Rt) ? s.lineTo(S, x) : F > Rt ? (N = ao(S, x, b, I, v, -F, p), m = ao(P, B, C, k, v, -F, p), s.lineTo(N.cx + N.x01, N.cy + N.y01), F < rt ? s.arc(N.cx, N.cy, F, wt(N.y01, N.x01), wt(m.y01, m.x01), !p) : (s.arc(N.cx, N.cy, F, wt(N.y01, N.x01), wt(N.y11, N.x11), !p), s.arc(0, 0, v, wt(N.cy + N.y11, N.cx + N.x11), wt(m.cy + m.y11, m.cx + m.x11), p), s.arc(m.cx, m.cy, F, wt(m.y11, m.x11), wt(m.y01, m.x01), !p))) : s.arc(0, 0, v, M, R, p);
    }
    if (s.closePath(), c)
      return s = null, c + "" || null;
  }
  return l.centroid = function() {
    var c = (+t.apply(this, arguments) + +r.apply(this, arguments)) / 2, f = (+a.apply(this, arguments) + +i.apply(this, arguments)) / 2 - li / 2;
    return [Se(f) * c, br(f) * c];
  }, l.innerRadius = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : _t(+c), l) : t;
  }, l.outerRadius = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : _t(+c), l) : r;
  }, l.cornerRadius = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : _t(+c), l) : e;
  }, l.padRadius = function(c) {
    return arguments.length ? (n = c == null ? null : typeof c == "function" ? c : _t(+c), l) : n;
  }, l.startAngle = function(c) {
    return arguments.length ? (a = typeof c == "function" ? c : _t(+c), l) : a;
  }, l.endAngle = function(c) {
    return arguments.length ? (i = typeof c == "function" ? c : _t(+c), l) : i;
  }, l.padAngle = function(c) {
    return arguments.length ? (o = typeof c == "function" ? c : _t(+c), l) : o;
  }, l.context = function(c) {
    return arguments.length ? (s = c ?? null, l) : s;
  }, l;
}
var qM = Array.prototype.slice;
function YM(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function KM(t) {
  return t[0];
}
function XM(t) {
  return t[1];
}
class JM {
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
function ZM(t) {
  return new JM(t, !0);
}
function QM(t) {
  return t.source;
}
function tN(t) {
  return t.target;
}
function rN(t) {
  let r = QM, e = tN, n = KM, a = XM, i = null, o = null, s = tx(u);
  function u() {
    let l;
    const c = qM.call(arguments), f = r.apply(this, c), v = e.apply(this, c);
    if (i == null && (o = t(l = s())), o.lineStart(), c[0] = f, o.point(+n.apply(this, c), +a.apply(this, c)), c[0] = v, o.point(+n.apply(this, c), +a.apply(this, c)), o.lineEnd(), l)
      return o = null, l + "" || null;
  }
  return u.source = function(l) {
    return arguments.length ? (r = l, u) : r;
  }, u.target = function(l) {
    return arguments.length ? (e = l, u) : e;
  }, u.x = function(l) {
    return arguments.length ? (n = typeof l == "function" ? l : _t(+l), u) : n;
  }, u.y = function(l) {
    return arguments.length ? (a = typeof l == "function" ? l : _t(+l), u) : a;
  }, u.context = function(l) {
    return arguments.length ? (l == null ? i = o = null : o = t(i = l), u) : i;
  }, u;
}
function eN() {
  return rN(ZM);
}
function Tp(t, r) {
  if ((o = t.length) > 1)
    for (var e = 1, n, a, i = t[r[0]], o, s = i.length; e < o; ++e)
      for (a = i, i = t[r[e]], n = 0; n < s; ++n)
        i[n][1] += i[n][0] = isNaN(a[n][1]) ? a[n][0] : a[n][1];
}
function Ip(t) {
  for (var r = t.length, e = new Array(r); --r >= 0; )
    e[r] = r;
  return e;
}
function nN(t, r) {
  return t[r];
}
function aN(t) {
  const r = [];
  return r.key = t, r;
}
function iN() {
  var t = _t([]), r = Ip, e = Tp, n = nN;
  function a(i) {
    var o = Array.from(t.apply(this, arguments), aN), s, u = o.length, l = -1, c;
    for (const f of i)
      for (s = 0, ++l; s < u; ++s)
        (o[s][l] = [0, +n(f, o[s].key, l, i)]).data = f;
    for (s = 0, c = YM(r(o)); s < u; ++s)
      o[c[s]].index = s;
    return e(o, c), o;
  }
  return a.keys = function(i) {
    return arguments.length ? (t = typeof i == "function" ? i : _t(Array.from(i)), a) : t;
  }, a.value = function(i) {
    return arguments.length ? (n = typeof i == "function" ? i : _t(+i), a) : n;
  }, a.order = function(i) {
    return arguments.length ? (r = i == null ? Ip : typeof i == "function" ? i : _t(Array.from(i)), a) : r;
  }, a.offset = function(i) {
    return arguments.length ? (e = i ?? Tp, a) : e;
  }, a;
}
const io = (t) => () => t;
function oN(t, {
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
var kh = new Ur(1, 0, 0);
Ur.prototype;
function Ml(t) {
  t.stopImmediatePropagation();
}
function Sa(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function sN(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function uN() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Op() {
  return this.__zoom || kh;
}
function lN(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function cN() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function fN(t, r, e) {
  var n = t.invertX(r[0][0]) - e[0][0], a = t.invertX(r[1][0]) - e[1][0], i = t.invertY(r[0][1]) - e[0][1], o = t.invertY(r[1][1]) - e[1][1];
  return t.translate(
    a > n ? (n + a) / 2 : Math.min(0, n) || Math.max(0, a),
    o > i ? (i + o) / 2 : Math.min(0, i) || Math.max(0, o)
  );
}
function rx() {
  var t = sN, r = uN, e = fN, n = lN, a = cN, i = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, u = S2, l = Rh("start", "zoom", "end"), c, f, v, h = 500, d = 150, $ = 0, y = 10;
  function p(m) {
    m.property("__zoom", Op).on("wheel.zoom", W, { passive: !1 }).on("mousedown.zoom", J).on("dblclick.zoom", rt).filter(a).on("touchstart.zoom", F).on("touchmove.zoom", q).on("touchend.zoom touchcancel.zoom", N).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  p.transform = function(m, _, E, P) {
    var B = m.selection ? m.selection() : m;
    B.property("__zoom", Op), m !== B ? M(m, _, E, P) : B.interrupt().each(function() {
      L(this, arguments).event(P).start().zoom(null, typeof _ == "function" ? _.apply(this, arguments) : _).end();
    });
  }, p.scaleBy = function(m, _, E, P) {
    p.scaleTo(m, function() {
      var B = this.__zoom.k, S = typeof _ == "function" ? _.apply(this, arguments) : _;
      return B * S;
    }, E, P);
  }, p.scaleTo = function(m, _, E, P) {
    p.transform(m, function() {
      var B = r.apply(this, arguments), S = this.__zoom, x = E == null ? R(B) : typeof E == "function" ? E.apply(this, arguments) : E, b = S.invert(x), I = typeof _ == "function" ? _.apply(this, arguments) : _;
      return e(T(w(S, I), x, b), B, o);
    }, E, P);
  }, p.translateBy = function(m, _, E, P) {
    p.transform(m, function() {
      return e(this.__zoom.translate(
        typeof _ == "function" ? _.apply(this, arguments) : _,
        typeof E == "function" ? E.apply(this, arguments) : E
      ), r.apply(this, arguments), o);
    }, null, P);
  }, p.translateTo = function(m, _, E, P, B) {
    p.transform(m, function() {
      var S = r.apply(this, arguments), x = this.__zoom, b = P == null ? R(S) : typeof P == "function" ? P.apply(this, arguments) : P;
      return e(kh.translate(b[0], b[1]).scale(x.k).translate(
        typeof _ == "function" ? -_.apply(this, arguments) : -_,
        typeof E == "function" ? -E.apply(this, arguments) : -E
      ), S, o);
    }, P, B);
  };
  function w(m, _) {
    return _ = Math.max(i[0], Math.min(i[1], _)), _ === m.k ? m : new Ur(_, m.x, m.y);
  }
  function T(m, _, E) {
    var P = _[0] - E[0] * m.k, B = _[1] - E[1] * m.k;
    return P === m.x && B === m.y ? m : new Ur(m.k, P, B);
  }
  function R(m) {
    return [(+m[0][0] + +m[1][0]) / 2, (+m[0][1] + +m[1][1]) / 2];
  }
  function M(m, _, E, P) {
    m.on("start.zoom", function() {
      L(this, arguments).event(P).start();
    }).on("interrupt.zoom end.zoom", function() {
      L(this, arguments).event(P).end();
    }).tween("zoom", function() {
      var B = this, S = arguments, x = L(B, S).event(P), b = r.apply(B, S), I = E == null ? R(b) : typeof E == "function" ? E.apply(B, S) : E, C = Math.max(b[1][0] - b[0][0], b[1][1] - b[0][1]), k = B.__zoom, H = typeof _ == "function" ? _.apply(B, S) : _, nt = u(k.invert(I).concat(C / k.k), H.invert(I).concat(C / H.k));
      return function(at) {
        if (at === 1)
          at = H;
        else {
          var it = nt(at), ir = C / it[2];
          at = new Ur(ir, I[0] - it[0] * ir, I[1] - it[1] * ir);
        }
        x.zoom(null, at);
      };
    });
  }
  function L(m, _, E) {
    return !E && m.__zooming || new V(m, _);
  }
  function V(m, _) {
    this.that = m, this.args = _, this.active = 0, this.sourceEvent = null, this.extent = r.apply(m, _), this.taps = 0;
  }
  V.prototype = {
    event: function(m) {
      return m && (this.sourceEvent = m), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(m, _) {
      return this.mouse && m !== "mouse" && (this.mouse[1] = _.invert(this.mouse[0])), this.touch0 && m !== "touch" && (this.touch0[1] = _.invert(this.touch0[0])), this.touch1 && m !== "touch" && (this.touch1[1] = _.invert(this.touch1[0])), this.that.__zoom = _, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(m) {
      var _ = vt(this.that).datum();
      l.call(
        m,
        this.that,
        new oN(m, {
          sourceEvent: this.sourceEvent,
          target: p,
          type: m,
          transform: this.that.__zoom,
          dispatch: l
        }),
        _
      );
    }
  };
  function W(m, ..._) {
    if (!t.apply(this, arguments))
      return;
    var E = L(this, _).event(m), P = this.__zoom, B = Math.max(i[0], Math.min(i[1], P.k * Math.pow(2, n.apply(this, arguments)))), S = we(m);
    if (E.wheel)
      (E.mouse[0][0] !== S[0] || E.mouse[0][1] !== S[1]) && (E.mouse[1] = P.invert(E.mouse[0] = S)), clearTimeout(E.wheel);
    else {
      if (P.k === B)
        return;
      E.mouse = [S, P.invert(S)], es(this), E.start();
    }
    Sa(m), E.wheel = setTimeout(x, d), E.zoom("mouse", e(T(w(P, B), E.mouse[0], E.mouse[1]), E.extent, o));
    function x() {
      E.wheel = null, E.end();
    }
  }
  function J(m, ..._) {
    if (v || !t.apply(this, arguments))
      return;
    var E = m.currentTarget, P = L(this, _, !0).event(m), B = vt(m.view).on("mousemove.zoom", I, !0).on("mouseup.zoom", C, !0), S = we(m, E), x = m.clientX, b = m.clientY;
    UC(m.view), Ml(m), P.mouse = [S, this.__zoom.invert(S)], es(this), P.start();
    function I(k) {
      if (Sa(k), !P.moved) {
        var H = k.clientX - x, nt = k.clientY - b;
        P.moved = H * H + nt * nt > $;
      }
      P.event(k).zoom("mouse", e(T(P.that.__zoom, P.mouse[0] = we(k, E), P.mouse[1]), P.extent, o));
    }
    function C(k) {
      B.on("mousemove.zoom mouseup.zoom", null), zC(k.view, P.moved), Sa(k), P.event(k).end();
    }
  }
  function rt(m, ..._) {
    if (t.apply(this, arguments)) {
      var E = this.__zoom, P = we(m.changedTouches ? m.changedTouches[0] : m, this), B = E.invert(P), S = E.k * (m.shiftKey ? 0.5 : 2), x = e(T(w(E, S), P, B), r.apply(this, _), o);
      Sa(m), s > 0 ? vt(this).transition().duration(s).call(M, x, P, m) : vt(this).call(p.transform, x, P, m);
    }
  }
  function F(m, ..._) {
    if (t.apply(this, arguments)) {
      var E = m.touches, P = E.length, B = L(this, _, m.changedTouches.length === P).event(m), S, x, b, I;
      for (Ml(m), x = 0; x < P; ++x)
        b = E[x], I = we(b, this), I = [I, this.__zoom.invert(I), b.identifier], B.touch0 ? !B.touch1 && B.touch0[2] !== I[2] && (B.touch1 = I, B.taps = 0) : (B.touch0 = I, S = !0, B.taps = 1 + !!c);
      c && (c = clearTimeout(c)), S && (B.taps < 2 && (f = I[0], c = setTimeout(function() {
        c = null;
      }, h)), es(this), B.start());
    }
  }
  function q(m, ..._) {
    if (this.__zooming) {
      var E = L(this, _).event(m), P = m.changedTouches, B = P.length, S, x, b, I;
      for (Sa(m), S = 0; S < B; ++S)
        x = P[S], b = we(x, this), E.touch0 && E.touch0[2] === x.identifier ? E.touch0[0] = b : E.touch1 && E.touch1[2] === x.identifier && (E.touch1[0] = b);
      if (x = E.that.__zoom, E.touch1) {
        var C = E.touch0[0], k = E.touch0[1], H = E.touch1[0], nt = E.touch1[1], at = (at = H[0] - C[0]) * at + (at = H[1] - C[1]) * at, it = (it = nt[0] - k[0]) * it + (it = nt[1] - k[1]) * it;
        x = w(x, Math.sqrt(at / it)), b = [(C[0] + H[0]) / 2, (C[1] + H[1]) / 2], I = [(k[0] + nt[0]) / 2, (k[1] + nt[1]) / 2];
      } else if (E.touch0)
        b = E.touch0[0], I = E.touch0[1];
      else
        return;
      E.zoom("touch", e(T(x, b, I), E.extent, o));
    }
  }
  function N(m, ..._) {
    if (this.__zooming) {
      var E = L(this, _).event(m), P = m.changedTouches, B = P.length, S, x;
      for (Ml(m), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, h), S = 0; S < B; ++S)
        x = P[S], E.touch0 && E.touch0[2] === x.identifier ? delete E.touch0 : E.touch1 && E.touch1[2] === x.identifier && delete E.touch1;
      if (E.touch1 && !E.touch0 && (E.touch0 = E.touch1, delete E.touch1), E.touch0)
        E.touch0[1] = this.__zoom.invert(E.touch0[0]);
      else if (E.end(), E.taps === 2 && (x = we(x, this), Math.hypot(f[0] - x[0], f[1] - x[1]) < y)) {
        var b = vt(this).on("dblclick.zoom");
        b && b.apply(this, arguments);
      }
    }
  }
  return p.wheelDelta = function(m) {
    return arguments.length ? (n = typeof m == "function" ? m : io(+m), p) : n;
  }, p.filter = function(m) {
    return arguments.length ? (t = typeof m == "function" ? m : io(!!m), p) : t;
  }, p.touchable = function(m) {
    return arguments.length ? (a = typeof m == "function" ? m : io(!!m), p) : a;
  }, p.extent = function(m) {
    return arguments.length ? (r = typeof m == "function" ? m : io([[+m[0][0], +m[0][1]], [+m[1][0], +m[1][1]]]), p) : r;
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
class wi {
  constructor() {
    this.width = 800, this.height = 800, this.enableTooltips = !0;
  }
}
var ov;
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
})(ov || (ov = {}));
const ex = class sv {
  constructor(r, e, n, a, i) {
    this._parent = r, this._leftChild = e, this._rightChild = n, this.values = a, this.height = i, this.id = sv.currentID, sv.currentID++;
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
ex.currentID = 0;
let as = ex;
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
    const n = new as(null, this.treeNode, r.treeNode, this.elements.slice(), e);
    this.treeNode.parent = n, r.treeNode.parent = n, this.treeNode = n;
  }
}
class hN {
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
    if (as.currentID = 0, r.length < 1)
      return new as(null, null, null, [], 0);
    let e = /* @__PURE__ */ new Map(), n = [];
    for (let o = 0; o < r.length; o++) {
      let s = r[o].values;
      e.set(o, new vN([r[o]], o, new as(null, null, null, [r[o]], 0))), n.push(s);
    }
    let a = this.metric.getDistance(n), i = 0;
    for (; i != a.length - 1; ) {
      let o = 1 / 0, s = -1, u = -1;
      for (let h of e.keys())
        for (let d of e.keys())
          h > d && a[h][d] < o && (o = a[h][d], s = h, u = d);
      let l = e.get(s), c = e.get(u), f = o / 2;
      if (!l || !c)
        throw "At least one cluster is invalid!";
      let v = this.copyDistanceMatrix(a);
      for (let h of e.keys())
        if (h != s && h != u) {
          let d;
          h > s ? d = a[h][s] : d = a[s][h];
          let $;
          h > u ? $ = a[h][u] : $ = a[u][h];
          let y = (l.elements.length * d + c.elements.length * $) / (l.elements.length + c.elements.length);
          h > s ? v[h][s] = y : v[s][h] = y;
        }
      a = v, l.merge(c, f), e.delete(u), ++i;
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
class dN {
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
class gN {
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
class Ap extends wi {
  constructor() {
    super(...arguments), this.initialTextWidth = 100, this.initialTextHeight = 100, this.squarePadding = 2, this.visualizationTextPadding = 4, this.fontSize = 14, this.labelColor = "#404040", this.highlightSelection = !0, this.highlightFontSize = 16, this.highlightFontColor = "black", this.className = "heatmap", this.animationsEnabled = !0, this.animationDuration = 2e3, this.transition = ov.easeInEaseOutCubic, this.minColor = "#EEEEEE", this.maxColor = "#1565C0", this.colorBuckets = 50, this.dendrogramEnabled = !1, this.dendrogramWidth = 100, this.dendrogramLineWidth = 1, this.dendrogramColor = "#404040", this.clusteringAlgorithm = new hN(new dN()), this.reorderer = new gN(), this.getTooltip = (r, e, n) => `
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
class Rp {
  constructor(r, e) {
    this.values = r, this.id = e;
  }
}
class _p {
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
    const i = Mh(Be(e), Be(n)), s = de().domain([0, 1]).range([0, 1]).ticks(a), u = QS().domain([0, 1]).range(s);
    return Object.entries(r).map(([l, c]) => Object.entries(c).map(([f, v]) => {
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
var oo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, xa = function(t) {
  return t && t.Math === Math && t;
}, D = (
  // eslint-disable-next-line es/no-global-this -- safe
  xa(typeof globalThis == "object" && globalThis) || xa(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
  xa(typeof self == "object" && self) || xa(typeof oo == "object" && oo) || xa(typeof oo == "object" && oo) || // eslint-disable-next-line no-new-func -- fallback
  function() {
    return this;
  }() || Function("return this")()
), xt = {}, O = function(t) {
  try {
    return !!t();
  } catch {
    return !0;
  }
}, pN = O, U = !pN(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] !== 7;
}), $N = O, Si = !$N(function() {
  var t = (function() {
  }).bind();
  return typeof t != "function" || t.hasOwnProperty("prototype");
}), yN = Si, so = Function.prototype.call, z = yN ? so.bind(so) : function() {
  return so.apply(so, arguments);
}, xi = {}, nx = {}.propertyIsEnumerable, ax = Object.getOwnPropertyDescriptor, mN = ax && !nx.call({ 1: 2 }, 1);
xi.f = mN ? function(r) {
  var e = ax(this, r);
  return !!e && e.enumerable;
} : nx;
var tr = function(t, r) {
  return {
    enumerable: !(t & 1),
    configurable: !(t & 2),
    writable: !(t & 4),
    value: r
  };
}, ix = Si, ox = Function.prototype, uv = ox.call, bN = ix && ox.bind.bind(uv, uv), A = ix ? bN : function(t) {
  return function() {
    return uv.apply(t, arguments);
  };
}, sx = A, wN = sx({}.toString), SN = sx("".slice), Et = function(t) {
  return SN(wN(t), 8, -1);
}, xN = A, EN = O, TN = Et, Nl = Object, IN = xN("".split), Qn = EN(function() {
  return !Nl("z").propertyIsEnumerable(0);
}) ? function(t) {
  return TN(t) === "String" ? IN(t, "") : Nl(t);
} : Nl, Nt = function(t) {
  return t == null;
}, ON = Nt, AN = TypeError, ut = function(t) {
  if (ON(t))
    throw new AN("Can't call method on " + t);
  return t;
}, RN = Qn, _N = ut, pt = function(t) {
  return RN(_N(t));
}, Dl = typeof document == "object" && document.all, Z = typeof Dl > "u" && Dl !== void 0 ? function(t) {
  return typeof t == "function" || t === Dl;
} : function(t) {
  return typeof t == "function";
}, CN = Z, Y = function(t) {
  return typeof t == "object" ? t !== null : CN(t);
}, Fl = D, PN = Z, MN = function(t) {
  return PN(t) ? t : void 0;
}, ot = function(t, r) {
  return arguments.length < 2 ? MN(Fl[t]) : Fl[t] && Fl[t][r];
}, NN = A, Dt = NN({}.isPrototypeOf), DN = D, Cp = DN.navigator, Pp = Cp && Cp.userAgent, _r = Pp ? String(Pp) : "", ux = D, Ll = _r, Mp = ux.process, Np = ux.Deno, Dp = Mp && Mp.versions || Np && Np.version, Fp = Dp && Dp.v8, lr, Ns;
Fp && (lr = Fp.split("."), Ns = lr[0] > 0 && lr[0] < 4 ? 1 : +(lr[0] + lr[1]));
!Ns && Ll && (lr = Ll.match(/Edge\/(\d+)/), (!lr || lr[1] >= 74) && (lr = Ll.match(/Chrome\/(\d+)/), lr && (Ns = +lr[1])));
var Kr = Ns, Lp = Kr, FN = O, LN = D, kN = LN.String, ta = !!Object.getOwnPropertySymbols && !FN(function() {
  var t = Symbol("symbol detection");
  return !kN(t) || !(Object(t) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && Lp && Lp < 41;
}), BN = ta, lx = BN && !Symbol.sham && typeof Symbol.iterator == "symbol", jN = ot, UN = Z, zN = Dt, VN = lx, HN = Object, Ge = VN ? function(t) {
  return typeof t == "symbol";
} : function(t) {
  var r = jN("Symbol");
  return UN(r) && zN(r.prototype, HN(t));
}, GN = String, We = function(t) {
  try {
    return GN(t);
  } catch {
    return "Object";
  }
}, WN = Z, qN = We, YN = TypeError, tt = function(t) {
  if (WN(t))
    return t;
  throw new YN(qN(t) + " is not a function");
}, KN = tt, XN = Nt, Cr = function(t, r) {
  var e = t[r];
  return XN(e) ? void 0 : KN(e);
}, kl = z, Bl = Z, jl = Y, JN = TypeError, cx = function(t, r) {
  var e, n;
  if (r === "string" && Bl(e = t.toString) && !jl(n = kl(e, t)) || Bl(e = t.valueOf) && !jl(n = kl(e, t)) || r !== "string" && Bl(e = t.toString) && !jl(n = kl(e, t)))
    return n;
  throw new JN("Can't convert object to primitive value");
}, fx = { exports: {} }, Xr = !1, kp = D, ZN = Object.defineProperty, Bh = function(t, r) {
  try {
    ZN(kp, t, { value: r, configurable: !0, writable: !0 });
  } catch {
    kp[t] = r;
  }
  return r;
}, QN = D, tD = Bh, Bp = "__core-js_shared__", jp = fx.exports = QN[Bp] || tD(Bp, {});
(jp.versions || (jp.versions = [])).push({
  version: "3.41.0",
  mode: "global",
  copyright: "© 2014-2025 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.41.0/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var jh = fx.exports, Up = jh, ra = function(t, r) {
  return Up[t] || (Up[t] = r || {});
}, rD = ut, eD = Object, et = function(t) {
  return eD(rD(t));
}, nD = A, aD = et, iD = nD({}.hasOwnProperty), Q = Object.hasOwn || function(r, e) {
  return iD(aD(r), e);
}, oD = A, sD = 0, uD = Math.random(), lD = oD(1 .toString), ea = function(t) {
  return "Symbol(" + (t === void 0 ? "" : t) + ")_" + lD(++sD + uD, 36);
}, cD = D, fD = ra, zp = Q, vD = ea, hD = ta, dD = lx, Sn = cD.Symbol, Ul = fD("wks"), gD = dD ? Sn.for || Sn : Sn && Sn.withoutSetter || vD, K = function(t) {
  return zp(Ul, t) || (Ul[t] = hD && zp(Sn, t) ? Sn[t] : gD("Symbol." + t)), Ul[t];
}, pD = z, Vp = Y, Hp = Ge, $D = Cr, yD = cx, mD = K, bD = TypeError, wD = mD("toPrimitive"), $u = function(t, r) {
  if (!Vp(t) || Hp(t))
    return t;
  var e = $D(t, wD), n;
  if (e) {
    if (r === void 0 && (r = "default"), n = pD(e, t, r), !Vp(n) || Hp(n))
      return n;
    throw new bD("Can't convert object to primitive value");
  }
  return r === void 0 && (r = "number"), yD(t, r);
}, SD = $u, xD = Ge, $e = function(t) {
  var r = SD(t, "string");
  return xD(r) ? r : r + "";
}, ED = D, Gp = Y, lv = ED.document, TD = Gp(lv) && Gp(lv.createElement), yu = function(t) {
  return TD ? lv.createElement(t) : {};
}, ID = U, OD = O, AD = yu, vx = !ID && !OD(function() {
  return Object.defineProperty(AD("div"), "a", {
    get: function() {
      return 7;
    }
  }).a !== 7;
}), RD = U, _D = z, CD = xi, PD = tr, MD = pt, ND = $e, DD = Q, FD = vx, Wp = Object.getOwnPropertyDescriptor;
xt.f = RD ? Wp : function(r, e) {
  if (r = MD(r), e = ND(e), FD)
    try {
      return Wp(r, e);
    } catch {
    }
  if (DD(r, e))
    return PD(!_D(CD.f, r, e), r[e]);
};
var lt = {}, LD = U, kD = O, hx = LD && kD(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: !1
  }).prototype !== 42;
}), BD = Y, jD = String, UD = TypeError, j = function(t) {
  if (BD(t))
    return t;
  throw new UD(jD(t) + " is not an object");
}, zD = U, VD = vx, HD = hx, uo = j, qp = $e, GD = TypeError, zl = Object.defineProperty, WD = Object.getOwnPropertyDescriptor, Vl = "enumerable", Hl = "configurable", Gl = "writable";
lt.f = zD ? HD ? function(r, e, n) {
  if (uo(r), e = qp(e), uo(n), typeof r == "function" && e === "prototype" && "value" in n && Gl in n && !n[Gl]) {
    var a = WD(r, e);
    a && a[Gl] && (r[e] = n.value, n = {
      configurable: Hl in n ? n[Hl] : a[Hl],
      enumerable: Vl in n ? n[Vl] : a[Vl],
      writable: !1
    });
  }
  return zl(r, e, n);
} : zl : function(r, e, n) {
  if (uo(r), e = qp(e), uo(n), VD)
    try {
      return zl(r, e, n);
    } catch {
    }
  if ("get" in n || "set" in n)
    throw new GD("Accessors not supported");
  return "value" in n && (r[e] = n.value), r;
};
var qD = U, YD = lt, KD = tr, Tt = qD ? function(t, r, e) {
  return YD.f(t, r, KD(1, e));
} : function(t, r, e) {
  return t[r] = e, t;
}, dx = { exports: {} }, cv = U, XD = Q, gx = Function.prototype, JD = cv && Object.getOwnPropertyDescriptor, Uh = XD(gx, "name"), ZD = Uh && (function() {
}).name === "something", QD = Uh && (!cv || cv && JD(gx, "name").configurable), na = {
  EXISTS: Uh,
  PROPER: ZD,
  CONFIGURABLE: QD
}, tF = A, rF = Z, fv = jh, eF = tF(Function.toString);
rF(fv.inspectSource) || (fv.inspectSource = function(t) {
  return eF(t);
});
var zh = fv.inspectSource, nF = D, aF = Z, Yp = nF.WeakMap, px = aF(Yp) && /native code/.test(String(Yp)), iF = ra, oF = ea, Kp = iF("keys"), mu = function(t) {
  return Kp[t] || (Kp[t] = oF(t));
}, Ei = {}, sF = px, $x = D, uF = Y, lF = Tt, Wl = Q, ql = jh, cF = mu, fF = Ei, Xp = "Object already initialized", vv = $x.TypeError, vF = $x.WeakMap, Ds, ci, Fs, hF = function(t) {
  return Fs(t) ? ci(t) : Ds(t, {});
}, dF = function(t) {
  return function(r) {
    var e;
    if (!uF(r) || (e = ci(r)).type !== t)
      throw new vv("Incompatible receiver, " + t + " required");
    return e;
  };
};
if (sF || ql.state) {
  var wr = ql.state || (ql.state = new vF());
  wr.get = wr.get, wr.has = wr.has, wr.set = wr.set, Ds = function(t, r) {
    if (wr.has(t))
      throw new vv(Xp);
    return r.facade = t, wr.set(t, r), r;
  }, ci = function(t) {
    return wr.get(t) || {};
  }, Fs = function(t) {
    return wr.has(t);
  };
} else {
  var nn = cF("state");
  fF[nn] = !0, Ds = function(t, r) {
    if (Wl(t, nn))
      throw new vv(Xp);
    return r.facade = t, lF(t, nn, r), r;
  }, ci = function(t) {
    return Wl(t, nn) ? t[nn] : {};
  }, Fs = function(t) {
    return Wl(t, nn);
  };
}
var ht = {
  set: Ds,
  get: ci,
  has: Fs,
  enforce: hF,
  getterFor: dF
}, Vh = A, gF = O, pF = Z, lo = Q, hv = U, $F = na.CONFIGURABLE, yF = zh, yx = ht, mF = yx.enforce, bF = yx.get, Jp = String, is = Object.defineProperty, wF = Vh("".slice), SF = Vh("".replace), xF = Vh([].join), EF = hv && !gF(function() {
  return is(function() {
  }, "length", { value: 8 }).length !== 8;
}), TF = String(String).split("String"), IF = dx.exports = function(t, r, e) {
  wF(Jp(r), 0, 7) === "Symbol(" && (r = "[" + SF(Jp(r), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), e && e.getter && (r = "get " + r), e && e.setter && (r = "set " + r), (!lo(t, "name") || $F && t.name !== r) && (hv ? is(t, "name", { value: r, configurable: !0 }) : t.name = r), EF && e && lo(e, "arity") && t.length !== e.arity && is(t, "length", { value: e.arity });
  try {
    e && lo(e, "constructor") && e.constructor ? hv && is(t, "prototype", { writable: !1 }) : t.prototype && (t.prototype = void 0);
  } catch {
  }
  var n = mF(t);
  return lo(n, "source") || (n.source = xF(TF, typeof r == "string" ? r : "")), t;
};
Function.prototype.toString = IF(function() {
  return pF(this) && bF(this).source || yF(this);
}, "toString");
var Hh = dx.exports, OF = Z, AF = lt, RF = Hh, _F = Bh, ct = function(t, r, e, n) {
  n || (n = {});
  var a = n.enumerable, i = n.name !== void 0 ? n.name : r;
  if (OF(e) && RF(e, i, n), n.global)
    a ? t[r] = e : _F(r, e);
  else {
    try {
      n.unsafe ? t[r] && (a = !0) : delete t[r];
    } catch {
    }
    a ? t[r] = e : AF.f(t, r, {
      value: e,
      enumerable: !1,
      configurable: !n.nonConfigurable,
      writable: !n.nonWritable
    });
  }
  return t;
}, ye = {}, CF = Math.ceil, PF = Math.floor, mx = Math.trunc || function(r) {
  var e = +r;
  return (e > 0 ? PF : CF)(e);
}, MF = mx, ft = function(t) {
  var r = +t;
  return r !== r || r === 0 ? 0 : MF(r);
}, NF = ft, DF = Math.max, FF = Math.min, Jr = function(t, r) {
  var e = NF(t);
  return e < 0 ? DF(e + r, 0) : FF(e, r);
}, LF = ft, kF = Math.min, zt = function(t) {
  var r = LF(t);
  return r > 0 ? kF(r, 9007199254740991) : 0;
}, BF = zt, st = function(t) {
  return BF(t.length);
}, jF = pt, UF = Jr, zF = st, Zp = function(t) {
  return function(r, e, n) {
    var a = jF(r), i = zF(a);
    if (i === 0)
      return !t && -1;
    var o = UF(n, i), s;
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
}, Ti = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: Zp(!0),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: Zp(!1)
}, VF = A, Yl = Q, HF = pt, GF = Ti.indexOf, WF = Ei, Qp = VF([].push), bx = function(t, r) {
  var e = HF(t), n = 0, a = [], i;
  for (i in e)
    !Yl(WF, i) && Yl(e, i) && Qp(a, i);
  for (; r.length > n; )
    Yl(e, i = r[n++]) && (~GF(a, i) || Qp(a, i));
  return a;
}, Gh = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
], qF = bx, YF = Gh, KF = YF.concat("length", "prototype");
ye.f = Object.getOwnPropertyNames || function(r) {
  return qF(r, KF);
};
var Ii = {};
Ii.f = Object.getOwnPropertySymbols;
var XF = ot, JF = A, ZF = ye, QF = Ii, tL = j, rL = JF([].concat), Wh = XF("Reflect", "ownKeys") || function(r) {
  var e = ZF.f(tL(r)), n = QF.f;
  return n ? rL(e, n(r)) : e;
}, t$ = Q, eL = Wh, nL = xt, aL = lt, Oi = function(t, r, e) {
  for (var n = eL(r), a = aL.f, i = nL.f, o = 0; o < n.length; o++) {
    var s = n[o];
    !t$(t, s) && !(e && t$(e, s)) && a(t, s, i(r, s));
  }
}, iL = O, oL = Z, sL = /#|\.prototype\./, Ai = function(t, r) {
  var e = lL[uL(t)];
  return e === fL ? !0 : e === cL ? !1 : oL(r) ? iL(r) : !!r;
}, uL = Ai.normalize = function(t) {
  return String(t).replace(sL, ".").toLowerCase();
}, lL = Ai.data = {}, cL = Ai.NATIVE = "N", fL = Ai.POLYFILL = "P", Ri = Ai, co = D, vL = xt.f, hL = Tt, dL = ct, gL = Bh, pL = Oi, $L = Ri, g = function(t, r) {
  var e = t.target, n = t.global, a = t.stat, i, o, s, u, l, c;
  if (n ? o = co : a ? o = co[e] || gL(e, {}) : o = co[e] && co[e].prototype, o)
    for (s in r) {
      if (l = r[s], t.dontCallGetSet ? (c = vL(o, s), u = c && c.value) : u = o[s], i = $L(n ? s : e + (a ? "." : "#") + s, t.forced), !i && u !== void 0) {
        if (typeof l == typeof u)
          continue;
        pL(l, u);
      }
      (t.sham || u && u.sham) && hL(l, "sham", !0), dL(o, s, l, t);
    }
}, yL = K, mL = yL("toStringTag"), wx = {};
wx[mL] = "z";
var qh = String(wx) === "[object z]", bL = qh, wL = Z, os = Et, SL = K, xL = SL("toStringTag"), EL = Object, TL = os(function() {
  return arguments;
}()) === "Arguments", IL = function(t, r) {
  try {
    return t[r];
  } catch {
  }
}, gr = bL ? os : function(t) {
  var r, e, n;
  return t === void 0 ? "Undefined" : t === null ? "Null" : typeof (e = IL(r = EL(t), xL)) == "string" ? e : TL ? os(r) : (n = os(r)) === "Object" && wL(r.callee) ? "Arguments" : n;
}, OL = gr, AL = String, G = function(t) {
  if (OL(t) === "Symbol")
    throw new TypeError("Cannot convert a Symbol value to a string");
  return AL(t);
}, bu = {}, RL = bx, _L = Gh, _i = Object.keys || function(r) {
  return RL(r, _L);
}, CL = U, PL = hx, ML = lt, NL = j, DL = pt, FL = _i;
bu.f = CL && !PL ? Object.defineProperties : function(r, e) {
  NL(r);
  for (var n = DL(e), a = FL(e), i = a.length, o = 0, s; i > o; )
    ML.f(r, s = a[o++], n[s]);
  return r;
};
var LL = ot, Sx = LL("document", "documentElement"), kL = j, BL = bu, r$ = Gh, jL = Ei, UL = Sx, zL = yu, VL = mu, e$ = ">", n$ = "<", dv = "prototype", gv = "script", xx = VL("IE_PROTO"), Kl = function() {
}, Ex = function(t) {
  return n$ + gv + e$ + t + n$ + "/" + gv + e$;
}, a$ = function(t) {
  t.write(Ex("")), t.close();
  var r = t.parentWindow.Object;
  return t = null, r;
}, HL = function() {
  var t = zL("iframe"), r = "java" + gv + ":", e;
  return t.style.display = "none", UL.appendChild(t), t.src = String(r), e = t.contentWindow.document, e.open(), e.write(Ex("document.F=Object")), e.close(), e.F;
}, fo, ss = function() {
  try {
    fo = new ActiveXObject("htmlfile");
  } catch {
  }
  ss = typeof document < "u" ? document.domain && fo ? a$(fo) : HL() : a$(fo);
  for (var t = r$.length; t--; )
    delete ss[dv][r$[t]];
  return ss();
};
jL[xx] = !0;
var Vt = Object.create || function(r, e) {
  var n;
  return r !== null ? (Kl[dv] = kL(r), n = new Kl(), Kl[dv] = null, n[xx] = r) : n = ss(), e === void 0 ? n : BL.f(n, e);
}, wu = {}, GL = A, rr = GL([].slice), WL = Et, qL = pt, Tx = ye.f, YL = rr, Ix = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], KL = function(t) {
  try {
    return Tx(t);
  } catch {
    return YL(Ix);
  }
};
wu.f = function(r) {
  return Ix && WL(r) === "Window" ? KL(r) : Tx(qL(r));
};
var i$ = Hh, XL = lt, dt = function(t, r, e) {
  return e.get && i$(e.get, r, { getter: !0 }), e.set && i$(e.set, r, { setter: !0 }), XL.f(t, r, e);
}, Yh = {}, JL = K;
Yh.f = JL;
var ZL = D, Ox = ZL, o$ = Ox, QL = Q, tk = Yh, rk = lt.f, Ft = function(t) {
  var r = o$.Symbol || (o$.Symbol = {});
  QL(r, t) || rk(r, t, {
    value: tk.f(t)
  });
}, ek = z, nk = ot, ak = K, ik = ct, Ax = function() {
  var t = nk("Symbol"), r = t && t.prototype, e = r && r.valueOf, n = ak("toPrimitive");
  r && !r[n] && ik(r, n, function(a) {
    return ek(e, this);
  }, { arity: 1 });
}, ok = lt.f, sk = Q, uk = K, s$ = uk("toStringTag"), Lt = function(t, r, e) {
  t && !e && (t = t.prototype), t && !sk(t, s$) && ok(t, s$, { configurable: !0, value: r });
}, lk = Et, ck = A, qe = function(t) {
  if (lk(t) === "Function")
    return ck(t);
}, u$ = qe, fk = tt, vk = Si, hk = u$(u$.bind), pr = function(t, r) {
  return fk(t), r === void 0 ? t : vk ? hk(t, r) : function() {
    return t.apply(r, arguments);
  };
}, dk = Et, me = Array.isArray || function(r) {
  return dk(r) === "Array";
}, gk = A, pk = O, Rx = Z, $k = gr, yk = ot, mk = zh, _x = function() {
}, Cx = yk("Reflect", "construct"), Kh = /^\s*(?:class|function)\b/, bk = gk(Kh.exec), wk = !Kh.test(_x), Ea = function(r) {
  if (!Rx(r))
    return !1;
  try {
    return Cx(_x, [], r), !0;
  } catch {
    return !1;
  }
}, Px = function(r) {
  if (!Rx(r))
    return !1;
  switch ($k(r)) {
    case "AsyncFunction":
    case "GeneratorFunction":
    case "AsyncGeneratorFunction":
      return !1;
  }
  try {
    return wk || !!bk(Kh, mk(r));
  } catch {
    return !0;
  }
};
Px.sham = !0;
var aa = !Cx || pk(function() {
  var t;
  return Ea(Ea.call) || !Ea(Object) || !Ea(function() {
    t = !0;
  }) || t;
}) ? Px : Ea, l$ = me, Sk = aa, xk = Y, Ek = K, Tk = Ek("species"), c$ = Array, Ik = function(t) {
  var r;
  return l$(t) && (r = t.constructor, Sk(r) && (r === c$ || l$(r.prototype)) ? r = void 0 : xk(r) && (r = r[Tk], r === null && (r = void 0))), r === void 0 ? c$ : r;
}, Ok = Ik, Ci = function(t, r) {
  return new (Ok(t))(r === 0 ? 0 : r);
}, Ak = pr, Rk = A, _k = Qn, Ck = et, Pk = st, Mk = Ci, f$ = Rk([].push), ne = function(t) {
  var r = t === 1, e = t === 2, n = t === 3, a = t === 4, i = t === 6, o = t === 7, s = t === 5 || i;
  return function(u, l, c, f) {
    for (var v = Ck(u), h = _k(v), d = Pk(h), $ = Ak(l, c), y = 0, p = f || Mk, w = r ? p(u, d) : e || o ? p(u, 0) : void 0, T, R; d > y; y++)
      if ((s || y in h) && (T = h[y], R = $(T, y, v), t))
        if (r)
          w[y] = R;
        else if (R)
          switch (t) {
            case 3:
              return !0;
            case 5:
              return T;
            case 6:
              return y;
            case 2:
              f$(w, T);
          }
        else
          switch (t) {
            case 4:
              return !1;
            case 7:
              f$(w, T);
          }
    return i ? -1 : n || a ? a : w;
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
}, Su = g, Pi = D, Xh = z, Nk = A, zn = U, Vn = ta, Dk = O, gt = Q, Fk = Dt, pv = j, xu = pt, Jh = $e, Lk = G, $v = tr, Hn = Vt, Mx = _i, kk = ye, Nx = wu, Bk = Ii, Dx = xt, Fx = lt, jk = bu, Lx = xi, Xl = ct, Uk = dt, Zh = ra, zk = mu, kx = Ei, v$ = ea, Vk = K, Hk = Yh, Gk = Ft, Wk = Ax, qk = Lt, Bx = ht, Eu = bt.forEach, Pt = zk("hidden"), Tu = "Symbol", fi = "prototype", Yk = Bx.set, h$ = Bx.getterFor(Tu), Qt = Object[fi], De = Pi.Symbol, za = De && De[fi], Kk = Pi.RangeError, Xk = Pi.TypeError, Jl = Pi.QObject, jx = Dx.f, Fe = Fx.f, Ux = Nx.f, Jk = Lx.f, zx = Nk([].push), Hr = Zh("symbols"), Mi = Zh("op-symbols"), Zk = Zh("wks"), yv = !Jl || !Jl[fi] || !Jl[fi].findChild, Vx = function(t, r, e) {
  var n = jx(Qt, r);
  n && delete Qt[r], Fe(t, r, e), n && t !== Qt && Fe(Qt, r, n);
}, mv = zn && Dk(function() {
  return Hn(Fe({}, "a", {
    get: function() {
      return Fe(this, "a", { value: 7 }).a;
    }
  })).a !== 7;
}) ? Vx : Fe, Zl = function(t, r) {
  var e = Hr[t] = Hn(za);
  return Yk(e, {
    type: Tu,
    tag: t,
    description: r
  }), zn || (e.description = r), e;
}, Iu = function(r, e, n) {
  r === Qt && Iu(Mi, e, n), pv(r);
  var a = Jh(e);
  return pv(n), gt(Hr, a) ? (n.enumerable ? (gt(r, Pt) && r[Pt][a] && (r[Pt][a] = !1), n = Hn(n, { enumerable: $v(0, !1) })) : (gt(r, Pt) || Fe(r, Pt, $v(1, Hn(null))), r[Pt][a] = !0), mv(r, a, n)) : Fe(r, a, n);
}, Qh = function(r, e) {
  pv(r);
  var n = xu(e), a = Mx(n).concat(Wx(n));
  return Eu(a, function(i) {
    (!zn || Xh(bv, n, i)) && Iu(r, i, n[i]);
  }), r;
}, Qk = function(r, e) {
  return e === void 0 ? Hn(r) : Qh(Hn(r), e);
}, bv = function(r) {
  var e = Jh(r), n = Xh(Jk, this, e);
  return this === Qt && gt(Hr, e) && !gt(Mi, e) ? !1 : n || !gt(this, e) || !gt(Hr, e) || gt(this, Pt) && this[Pt][e] ? n : !0;
}, Hx = function(r, e) {
  var n = xu(r), a = Jh(e);
  if (!(n === Qt && gt(Hr, a) && !gt(Mi, a))) {
    var i = jx(n, a);
    return i && gt(Hr, a) && !(gt(n, Pt) && n[Pt][a]) && (i.enumerable = !0), i;
  }
}, Gx = function(r) {
  var e = Ux(xu(r)), n = [];
  return Eu(e, function(a) {
    !gt(Hr, a) && !gt(kx, a) && zx(n, a);
  }), n;
}, Wx = function(t) {
  var r = t === Qt, e = Ux(r ? Mi : xu(t)), n = [];
  return Eu(e, function(a) {
    gt(Hr, a) && (!r || gt(Qt, a)) && zx(n, Hr[a]);
  }), n;
};
Vn || (De = function() {
  if (Fk(za, this))
    throw new Xk("Symbol is not a constructor");
  var r = !arguments.length || arguments[0] === void 0 ? void 0 : Lk(arguments[0]), e = v$(r), n = function(a) {
    var i = this === void 0 ? Pi : this;
    i === Qt && Xh(n, Mi, a), gt(i, Pt) && gt(i[Pt], e) && (i[Pt][e] = !1);
    var o = $v(1, a);
    try {
      mv(i, e, o);
    } catch (s) {
      if (!(s instanceof Kk))
        throw s;
      Vx(i, e, o);
    }
  };
  return zn && yv && mv(Qt, e, { configurable: !0, set: n }), Zl(e, r);
}, za = De[fi], Xl(za, "toString", function() {
  return h$(this).tag;
}), Xl(De, "withoutSetter", function(t) {
  return Zl(v$(t), t);
}), Lx.f = bv, Fx.f = Iu, jk.f = Qh, Dx.f = Hx, kk.f = Nx.f = Gx, Bk.f = Wx, Hk.f = function(t) {
  return Zl(Vk(t), t);
}, zn && (Uk(za, "description", {
  configurable: !0,
  get: function() {
    return h$(this).description;
  }
}), Xl(Qt, "propertyIsEnumerable", bv, { unsafe: !0 })));
Su({ global: !0, constructor: !0, wrap: !0, forced: !Vn, sham: !Vn }, {
  Symbol: De
});
Eu(Mx(Zk), function(t) {
  Gk(t);
});
Su({ target: Tu, stat: !0, forced: !Vn }, {
  useSetter: function() {
    yv = !0;
  },
  useSimple: function() {
    yv = !1;
  }
});
Su({ target: "Object", stat: !0, forced: !Vn, sham: !zn }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: Qk,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: Iu,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: Qh,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: Hx
});
Su({ target: "Object", stat: !0, forced: !Vn }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: Gx
});
Wk();
qk(De, Tu);
kx[Pt] = !0;
var t3 = ta, qx = t3 && !!Symbol.for && !!Symbol.keyFor, r3 = g, e3 = ot, n3 = Q, a3 = G, Yx = ra, i3 = qx, Ql = Yx("string-to-symbol-registry"), o3 = Yx("symbol-to-string-registry");
r3({ target: "Symbol", stat: !0, forced: !i3 }, {
  for: function(t) {
    var r = a3(t);
    if (n3(Ql, r))
      return Ql[r];
    var e = e3("Symbol")(r);
    return Ql[r] = e, o3[e] = r, e;
  }
});
var s3 = g, u3 = Q, l3 = Ge, c3 = We, f3 = ra, v3 = qx, d$ = f3("symbol-to-string-registry");
s3({ target: "Symbol", stat: !0, forced: !v3 }, {
  keyFor: function(r) {
    if (!l3(r))
      throw new TypeError(c3(r) + " is not a symbol");
    if (u3(d$, r))
      return d$[r];
  }
});
var h3 = Si, Kx = Function.prototype, g$ = Kx.apply, p$ = Kx.call, er = typeof Reflect == "object" && Reflect.apply || (h3 ? p$.bind(g$) : function() {
  return p$.apply(g$, arguments);
}), d3 = A, $$ = me, g3 = Z, y$ = Et, p3 = G, m$ = d3([].push), $3 = function(t) {
  if (g3(t))
    return t;
  if ($$(t)) {
    for (var r = t.length, e = [], n = 0; n < r; n++) {
      var a = t[n];
      typeof a == "string" ? m$(e, a) : (typeof a == "number" || y$(a) === "Number" || y$(a) === "String") && m$(e, p3(a));
    }
    var i = e.length, o = !0;
    return function(s, u) {
      if (o)
        return o = !1, u;
      if ($$(this))
        return u;
      for (var l = 0; l < i; l++)
        if (e[l] === s)
          return u;
    };
  }
}, y3 = g, Xx = ot, Jx = er, m3 = z, Ni = A, Zx = O, b$ = Z, w$ = Ge, Qx = rr, b3 = $3, w3 = ta, S3 = String, ve = Xx("JSON", "stringify"), vo = Ni(/./.exec), S$ = Ni("".charAt), x3 = Ni("".charCodeAt), E3 = Ni("".replace), T3 = Ni(1 .toString), I3 = /[\uD800-\uDFFF]/g, x$ = /^[\uD800-\uDBFF]$/, E$ = /^[\uDC00-\uDFFF]$/, T$ = !w3 || Zx(function() {
  var t = Xx("Symbol")("stringify detection");
  return ve([t]) !== "[null]" || ve({ a: t }) !== "{}" || ve(Object(t)) !== "{}";
}), I$ = Zx(function() {
  return ve("\uDF06\uD834") !== '"\\udf06\\ud834"' || ve("\uDEAD") !== '"\\udead"';
}), O3 = function(t, r) {
  var e = Qx(arguments), n = b3(r);
  if (!(!b$(n) && (t === void 0 || w$(t))))
    return e[1] = function(a, i) {
      if (b$(n) && (i = m3(n, this, S3(a), i)), !w$(i))
        return i;
    }, Jx(ve, null, e);
}, A3 = function(t, r, e) {
  var n = S$(e, r - 1), a = S$(e, r + 1);
  return vo(x$, t) && !vo(E$, a) || vo(E$, t) && !vo(x$, n) ? "\\u" + T3(x3(t, 0), 16) : t;
};
ve && y3({ target: "JSON", stat: !0, arity: 3, forced: T$ || I$ }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  stringify: function(r, e, n) {
    var a = Qx(arguments), i = Jx(T$ ? O3 : ve, null, a);
    return I$ && typeof i == "string" ? E3(i, I3, A3) : i;
  }
});
var R3 = g, _3 = ta, C3 = O, tE = Ii, P3 = et, M3 = !_3 || C3(function() {
  tE.f(1);
});
R3({ target: "Object", stat: !0, forced: M3 }, {
  getOwnPropertySymbols: function(r) {
    var e = tE.f;
    return e ? e(P3(r)) : [];
  }
});
var N3 = g, D3 = U, F3 = D, ho = A, L3 = Q, k3 = Z, B3 = Dt, j3 = G, U3 = dt, z3 = Oi, kr = F3.Symbol, xe = kr && kr.prototype;
if (D3 && k3(kr) && (!("description" in xe) || // Safari 12 bug
kr().description !== void 0)) {
  var O$ = {}, go = function() {
    var r = arguments.length < 1 || arguments[0] === void 0 ? void 0 : j3(arguments[0]), e = B3(xe, this) ? new kr(r) : r === void 0 ? kr() : kr(r);
    return r === "" && (O$[e] = !0), e;
  };
  z3(go, kr), go.prototype = xe, xe.constructor = go;
  var V3 = String(kr("description detection")) === "Symbol(description detection)", H3 = ho(xe.valueOf), G3 = ho(xe.toString), W3 = /^Symbol\((.*)\)[^)]+$/, q3 = ho("".replace), Y3 = ho("".slice);
  U3(xe, "description", {
    configurable: !0,
    get: function() {
      var r = H3(this);
      if (L3(O$, r))
        return "";
      var e = G3(r), n = V3 ? Y3(e, 7, -1) : q3(e, W3, "$1");
      return n === "" ? void 0 : n;
    }
  }), N3({ global: !0, constructor: !0, forced: !0 }, {
    Symbol: go
  });
}
var K3 = Ft;
K3("asyncIterator");
var X3 = Ft;
X3("hasInstance");
var J3 = Ft;
J3("isConcatSpreadable");
var Z3 = Ft;
Z3("iterator");
var Q3 = Ft;
Q3("match");
var tB = Ft;
tB("matchAll");
var rB = Ft;
rB("replace");
var eB = Ft;
eB("search");
var nB = Ft;
nB("species");
var aB = Ft;
aB("split");
var iB = Ft, oB = Ax;
iB("toPrimitive");
oB();
var sB = ot, uB = Ft, lB = Lt;
uB("toStringTag");
lB(sB("Symbol"), "Symbol");
var cB = Ft;
cB("unscopables");
var fB = A, vB = tt, Ou = function(t, r, e) {
  try {
    return fB(vB(Object.getOwnPropertyDescriptor(t, r)[e]));
  } catch {
  }
}, hB = Y, rE = function(t) {
  return hB(t) || t === null;
}, dB = rE, gB = String, pB = TypeError, eE = function(t) {
  if (dB(t))
    return t;
  throw new pB("Can't set " + gB(t) + " as a prototype");
}, $B = Ou, yB = Y, mB = ut, bB = eE, Pr = Object.setPrototypeOf || ("__proto__" in {} ? function() {
  var t = !1, r = {}, e;
  try {
    e = $B(Object.prototype, "__proto__", "set"), e(r, []), t = r instanceof Array;
  } catch {
  }
  return function(a, i) {
    return mB(a), bB(i), yB(a) && (t ? e(a, i) : a.__proto__ = i), a;
  };
}() : void 0), wB = lt.f, nE = function(t, r, e) {
  e in t || wB(t, e, {
    configurable: !0,
    get: function() {
      return r[e];
    },
    set: function(n) {
      r[e] = n;
    }
  });
}, SB = Z, xB = Y, A$ = Pr, Ye = function(t, r, e) {
  var n, a;
  return (
    // it can work only with native `setPrototypeOf`
    A$ && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    SB(n = r.constructor) && n !== e && xB(a = n.prototype) && a !== e.prototype && A$(t, a), t
  );
}, EB = G, Di = function(t, r) {
  return t === void 0 ? arguments.length < 2 ? "" : r : EB(t);
}, TB = Y, IB = Tt, aE = function(t, r) {
  TB(r) && "cause" in r && IB(t, "cause", r.cause);
}, OB = A, iE = Error, AB = OB("".replace), RB = function(t) {
  return String(new iE(t).stack);
}("zxcasd"), oE = /\n\s*at [^:]*:[^\n]*/, _B = oE.test(RB), td = function(t, r) {
  if (_B && typeof t == "string" && !iE.prepareStackTrace)
    for (; r--; )
      t = AB(t, oE, "");
  return t;
}, CB = O, PB = tr, sE = !CB(function() {
  var t = new Error("a");
  return "stack" in t ? (Object.defineProperty(t, "stack", PB(1, 7)), t.stack !== 7) : !0;
}), MB = Tt, NB = td, DB = sE, R$ = Error.captureStackTrace, uE = function(t, r, e, n) {
  DB && (R$ ? R$(t, r) : MB(t, "stack", NB(e, n)));
}, _$ = ot, FB = Q, C$ = Tt, LB = Dt, P$ = Pr, M$ = Oi, N$ = nE, kB = Ye, BB = Di, jB = aE, UB = uE, zB = U, lE = function(t, r, e, n) {
  var a = "stackTraceLimit", i = n ? 2 : 1, o = t.split("."), s = o[o.length - 1], u = _$.apply(null, o);
  if (u) {
    var l = u.prototype;
    if (FB(l, "cause") && delete l.cause, !e)
      return u;
    var c = _$("Error"), f = r(function(v, h) {
      var d = BB(n ? h : v, void 0), $ = n ? new u(v) : new u();
      return d !== void 0 && C$($, "message", d), UB($, f, $.stack, 2), this && LB(l, this) && kB($, this, f), arguments.length > i && jB($, arguments[i]), $;
    });
    f.prototype = l, s !== "Error" ? P$ ? P$(f, c) : M$(f, c, { name: !0 }) : zB && a in u && (N$(f, u, a), N$(f, u, "prepareStackTrace")), M$(f, u);
    try {
      l.name !== s && C$(l, "name", s), l.constructor = f;
    } catch {
    }
    return f;
  }
}, cE = g, VB = D, Mr = er, fE = lE, wv = "WebAssembly", D$ = VB[wv], Ls = new Error("e", { cause: 7 }).cause !== 7, Ke = function(t, r) {
  var e = {};
  e[t] = fE(t, r, Ls), cE({ global: !0, constructor: !0, arity: 1, forced: Ls }, e);
}, rd = function(t, r) {
  if (D$ && D$[t]) {
    var e = {};
    e[t] = fE(wv + "." + t, r, Ls), cE({ target: wv, stat: !0, constructor: !0, arity: 1, forced: Ls }, e);
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
rd("CompileError", function(t) {
  return function(e) {
    return Mr(t, this, arguments);
  };
});
rd("LinkError", function(t) {
  return function(e) {
    return Mr(t, this, arguments);
  };
});
rd("RuntimeError", function(t) {
  return function(e) {
    return Mr(t, this, arguments);
  };
});
var HB = U, GB = O, WB = j, F$ = Di, us = Error.prototype.toString, qB = GB(function() {
  if (HB) {
    var t = Object.create(Object.defineProperty({}, "name", { get: function() {
      return this === t;
    } }));
    if (us.call(t) !== "true")
      return !0;
  }
  return us.call({ message: 1, name: 2 }) !== "2: 1" || us.call({}) !== "Error";
}), vE = qB ? function() {
  var r = WB(this), e = F$(r.name, "Error"), n = F$(r.message);
  return e ? n ? e + ": " + n : e : n;
} : us, YB = ct, L$ = vE, k$ = Error.prototype;
k$.toString !== L$ && YB(k$, "toString", L$);
var KB = O, ed = !KB(function() {
  function t() {
  }
  return t.prototype.constructor = null, Object.getPrototypeOf(new t()) !== t.prototype;
}), XB = Q, JB = Z, ZB = et, QB = mu, t6 = ed, B$ = QB("IE_PROTO"), Sv = Object, r6 = Sv.prototype, Ht = t6 ? Sv.getPrototypeOf : function(t) {
  var r = ZB(t);
  if (XB(r, B$))
    return r[B$];
  var e = r.constructor;
  return JB(e) && r instanceof e ? e.prototype : r instanceof Sv ? r6 : null;
}, Fi = {}, e6 = K, n6 = Fi, a6 = e6("iterator"), i6 = Array.prototype, nd = function(t) {
  return t !== void 0 && (n6.Array === t || i6[a6] === t);
}, o6 = gr, j$ = Cr, s6 = Nt, u6 = Fi, l6 = K, c6 = l6("iterator"), ia = function(t) {
  if (!s6(t))
    return j$(t, c6) || j$(t, "@@iterator") || u6[o6(t)];
}, f6 = z, v6 = tt, h6 = j, d6 = We, g6 = ia, p6 = TypeError, Au = function(t, r) {
  var e = arguments.length < 2 ? g6(t) : r;
  if (v6(e))
    return h6(f6(e, t));
  throw new p6(d6(t) + " is not iterable");
}, $6 = z, U$ = j, y6 = Cr, Xe = function(t, r, e) {
  var n, a;
  U$(t);
  try {
    if (n = y6(t, "return"), !n) {
      if (r === "throw")
        throw e;
      return e;
    }
    n = $6(n, t);
  } catch (i) {
    a = !0, n = i;
  }
  if (r === "throw")
    throw e;
  if (a)
    throw n;
  return U$(n), e;
}, m6 = pr, b6 = z, w6 = j, S6 = We, x6 = nd, E6 = st, z$ = Dt, T6 = Au, I6 = ia, V$ = Xe, O6 = TypeError, ls = function(t, r) {
  this.stopped = t, this.result = r;
}, H$ = ls.prototype, $t = function(t, r, e) {
  var n = e && e.that, a = !!(e && e.AS_ENTRIES), i = !!(e && e.IS_RECORD), o = !!(e && e.IS_ITERATOR), s = !!(e && e.INTERRUPTED), u = m6(r, n), l, c, f, v, h, d, $, y = function(w) {
    return l && V$(l, "normal", w), new ls(!0, w);
  }, p = function(w) {
    return a ? (w6(w), s ? u(w[0], w[1], y) : u(w[0], w[1])) : s ? u(w, y) : u(w);
  };
  if (i)
    l = t.iterator;
  else if (o)
    l = t;
  else {
    if (c = I6(t), !c)
      throw new O6(S6(t) + " is not iterable");
    if (x6(c)) {
      for (f = 0, v = E6(t); v > f; f++)
        if (h = p(t[f]), h && z$(H$, h))
          return h;
      return new ls(!1);
    }
    l = T6(t, c);
  }
  for (d = i ? t.next : l.next; !($ = b6(d, l)).done; ) {
    try {
      h = p($.value);
    } catch (w) {
      V$(l, "throw", w);
    }
    if (typeof h == "object" && h && z$(H$, h))
      return h;
  }
  return new ls(!1);
}, A6 = g, R6 = Dt, _6 = Ht, ks = Pr, C6 = Oi, hE = Vt, tc = Tt, rc = tr, P6 = aE, M6 = uE, N6 = $t, D6 = Di, F6 = K, L6 = F6("toStringTag"), Bs = Error, k6 = [].push, Gn = function(r, e) {
  var n = R6(ec, this), a;
  ks ? a = ks(new Bs(), n ? _6(this) : ec) : (a = n ? this : hE(ec), tc(a, L6, "Error")), e !== void 0 && tc(a, "message", D6(e)), M6(a, Gn, a.stack, 1), arguments.length > 2 && P6(a, arguments[2]);
  var i = [];
  return N6(r, k6, { that: i }), tc(a, "errors", i), a;
};
ks ? ks(Gn, Bs) : C6(Gn, Bs, { name: !0 });
var ec = Gn.prototype = hE(Bs.prototype, {
  constructor: rc(1, Gn),
  message: rc(1, ""),
  name: rc(1, "AggregateError")
});
A6({ global: !0, constructor: !0, arity: 2 }, {
  AggregateError: Gn
});
var B6 = g, j6 = ot, U6 = er, G$ = O, z6 = lE, ad = "AggregateError", W$ = j6(ad), q$ = !G$(function() {
  return W$([1]).errors[0] !== 1;
}) && G$(function() {
  return W$([1], ad, { cause: 7 }).cause !== 7;
});
B6({ global: !0, constructor: !0, arity: 2, forced: q$ }, {
  AggregateError: z6(ad, function(t) {
    return function(e, n) {
      return U6(t, this, arguments);
    };
  }, q$, !0)
});
var V6 = K, H6 = Vt, G6 = lt.f, xv = V6("unscopables"), Ev = Array.prototype;
Ev[xv] === void 0 && G6(Ev, xv, {
  configurable: !0,
  value: H6(null)
});
var kt = function(t) {
  Ev[xv][t] = !0;
}, W6 = g, q6 = et, Y6 = st, K6 = ft, X6 = kt;
W6({ target: "Array", proto: !0 }, {
  at: function(r) {
    var e = q6(this), n = Y6(e), a = K6(r), i = a >= 0 ? a : n + a;
    return i < 0 || i >= n ? void 0 : e[i];
  }
});
X6("at");
var J6 = TypeError, Z6 = 9007199254740991, oa = function(t) {
  if (t > Z6)
    throw J6("Maximum allowed index exceeded");
  return t;
}, Q6 = U, t5 = lt, r5 = tr, Zr = function(t, r, e) {
  Q6 ? t5.f(t, r, r5(0, e)) : t[r] = e;
}, e5 = O, n5 = K, a5 = Kr, i5 = n5("species"), Li = function(t) {
  return a5 >= 51 || !e5(function() {
    var r = [], e = r.constructor = {};
    return e[i5] = function() {
      return { foo: 1 };
    }, r[t](Boolean).foo !== 1;
  });
}, o5 = g, s5 = O, u5 = me, l5 = Y, c5 = et, f5 = st, Y$ = oa, K$ = Zr, v5 = Ci, h5 = Li, d5 = K, g5 = Kr, dE = d5("isConcatSpreadable"), p5 = g5 >= 51 || !s5(function() {
  var t = [];
  return t[dE] = !1, t.concat()[0] !== t;
}), $5 = function(t) {
  if (!l5(t))
    return !1;
  var r = t[dE];
  return r !== void 0 ? !!r : u5(t);
}, y5 = !p5 || !h5("concat");
o5({ target: "Array", proto: !0, arity: 1, forced: y5 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function(r) {
    var e = c5(this), n = v5(e, 0), a = 0, i, o, s, u, l;
    for (i = -1, s = arguments.length; i < s; i++)
      if (l = i === -1 ? e : arguments[i], $5(l))
        for (u = f5(l), Y$(a + u), o = 0; o < u; o++, a++)
          o in l && K$(n, a, l[o]);
      else
        Y$(a + 1), K$(n, a++, l);
    return n.length = a, n;
  }
});
var X$ = We, m5 = TypeError, Ru = function(t, r) {
  if (!delete t[r])
    throw new m5("Cannot delete property " + X$(r) + " of " + X$(t));
}, b5 = et, nc = Jr, w5 = st, S5 = Ru, x5 = Math.min, gE = [].copyWithin || function(r, e) {
  var n = b5(this), a = w5(n), i = nc(r, a), o = nc(e, a), s = arguments.length > 2 ? arguments[2] : void 0, u = x5((s === void 0 ? a : nc(s, a)) - o, a - i), l = 1;
  for (o < i && i < o + u && (l = -1, o += u - 1, i += u - 1); u-- > 0; )
    o in n ? n[i] = n[o] : S5(n, i), i += l, o += l;
  return n;
}, E5 = g, T5 = gE, I5 = kt;
E5({ target: "Array", proto: !0 }, {
  copyWithin: T5
});
I5("copyWithin");
var O5 = O, Qr = function(t, r) {
  var e = [][t];
  return !!e && O5(function() {
    e.call(null, r || function() {
      return 1;
    }, 1);
  });
}, A5 = g, R5 = bt.every, _5 = Qr, C5 = _5("every");
A5({ target: "Array", proto: !0, forced: !C5 }, {
  every: function(r) {
    return R5(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var P5 = et, J$ = Jr, M5 = st, id = function(r) {
  for (var e = P5(this), n = M5(e), a = arguments.length, i = J$(a > 1 ? arguments[1] : void 0, n), o = a > 2 ? arguments[2] : void 0, s = o === void 0 ? n : J$(o, n); s > i; )
    e[i++] = r;
  return e;
}, N5 = g, D5 = id, F5 = kt;
N5({ target: "Array", proto: !0 }, {
  fill: D5
});
F5("fill");
var L5 = g, k5 = bt.filter, B5 = Li, j5 = B5("filter");
L5({ target: "Array", proto: !0, forced: !j5 }, {
  filter: function(r) {
    return k5(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var U5 = g, z5 = bt.find, V5 = kt, Tv = "find", pE = !0;
Tv in [] && Array(1)[Tv](function() {
  pE = !1;
});
U5({ target: "Array", proto: !0, forced: pE }, {
  find: function(r) {
    return z5(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
V5(Tv);
var H5 = g, G5 = bt.findIndex, W5 = kt, Iv = "findIndex", $E = !0;
Iv in [] && Array(1)[Iv](function() {
  $E = !1;
});
H5({ target: "Array", proto: !0, forced: $E }, {
  findIndex: function(r) {
    return G5(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
W5(Iv);
var q5 = pr, Y5 = Qn, K5 = et, X5 = st, Z$ = function(t) {
  var r = t === 1;
  return function(e, n, a) {
    for (var i = K5(e), o = Y5(i), s = X5(o), u = q5(n, a), l, c; s-- > 0; )
      if (l = o[s], c = u(l, s, i), c)
        switch (t) {
          case 0:
            return l;
          case 1:
            return s;
        }
    return r ? -1 : void 0;
  };
}, _u = {
  // `Array.prototype.findLast` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLast: Z$(0),
  // `Array.prototype.findLastIndex` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLastIndex: Z$(1)
}, J5 = g, Z5 = _u.findLast, Q5 = kt;
J5({ target: "Array", proto: !0 }, {
  findLast: function(r) {
    return Z5(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
Q5("findLast");
var t4 = g, r4 = _u.findLastIndex, e4 = kt;
t4({ target: "Array", proto: !0 }, {
  findLastIndex: function(r) {
    return r4(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
e4("findLastIndex");
var n4 = me, a4 = st, i4 = oa, o4 = pr, yE = function(t, r, e, n, a, i, o, s) {
  for (var u = a, l = 0, c = o ? o4(o, s) : !1, f, v; l < n; )
    l in e && (f = c ? c(e[l], l, r) : e[l], i > 0 && n4(f) ? (v = a4(f), u = yE(t, r, f, v, u, i - 1) - 1) : (i4(u + 1), t[u] = f), u++), l++;
  return u;
}, mE = yE, s4 = g, u4 = mE, l4 = et, c4 = st, f4 = ft, v4 = Ci;
s4({ target: "Array", proto: !0 }, {
  flat: function() {
    var r = arguments.length ? arguments[0] : void 0, e = l4(this), n = c4(e), a = v4(e, 0);
    return a.length = u4(a, e, e, n, 0, r === void 0 ? 1 : f4(r)), a;
  }
});
var h4 = g, d4 = mE, g4 = tt, p4 = et, $4 = st, y4 = Ci;
h4({ target: "Array", proto: !0 }, {
  flatMap: function(r) {
    var e = p4(this), n = $4(e), a;
    return g4(r), a = y4(e, 0), a.length = d4(a, e, e, n, 0, 1, r, arguments.length > 1 ? arguments[1] : void 0), a;
  }
});
var m4 = bt.forEach, b4 = Qr, w4 = b4("forEach"), bE = w4 ? [].forEach : function(r) {
  return m4(this, r, arguments.length > 1 ? arguments[1] : void 0);
}, S4 = g, Q$ = bE;
S4({ target: "Array", proto: !0, forced: [].forEach !== Q$ }, {
  forEach: Q$
});
var x4 = j, E4 = Xe, od = function(t, r, e, n) {
  try {
    return n ? r(x4(e)[0], e[1]) : r(e);
  } catch (a) {
    E4(t, "throw", a);
  }
}, T4 = pr, I4 = z, O4 = et, A4 = od, R4 = nd, _4 = aa, C4 = st, ty = Zr, P4 = Au, M4 = ia, ry = Array, wE = function(r) {
  var e = O4(r), n = _4(this), a = arguments.length, i = a > 1 ? arguments[1] : void 0, o = i !== void 0;
  o && (i = T4(i, a > 2 ? arguments[2] : void 0));
  var s = M4(e), u = 0, l, c, f, v, h, d;
  if (s && !(this === ry && R4(s)))
    for (c = n ? new this() : [], v = P4(e, s), h = v.next; !(f = I4(h, v)).done; u++)
      d = o ? A4(v, i, [f.value, u], !0) : f.value, ty(c, u, d);
  else
    for (l = C4(e), c = n ? new this(l) : ry(l); l > u; u++)
      d = o ? i(e[u], u) : e[u], ty(c, u, d);
  return c.length = u, c;
}, N4 = K, SE = N4("iterator"), xE = !1;
try {
  var D4 = 0, ey = {
    next: function() {
      return { done: !!D4++ };
    },
    return: function() {
      xE = !0;
    }
  };
  ey[SE] = function() {
    return this;
  }, Array.from(ey, function() {
    throw 2;
  });
} catch {
}
var Cu = function(t, r) {
  try {
    if (!r && !xE)
      return !1;
  } catch {
    return !1;
  }
  var e = !1;
  try {
    var n = {};
    n[SE] = function() {
      return {
        next: function() {
          return { done: e = !0 };
        }
      };
    }, t(n);
  } catch {
  }
  return e;
}, F4 = g, L4 = wE, k4 = Cu, B4 = !k4(function(t) {
  Array.from(t);
});
F4({ target: "Array", stat: !0, forced: B4 }, {
  from: L4
});
var j4 = g, U4 = Ti.includes, z4 = O, V4 = kt, H4 = z4(function() {
  return !Array(1).includes();
});
j4({ target: "Array", proto: !0, forced: H4 }, {
  includes: function(r) {
    return U4(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
V4("includes");
var G4 = g, W4 = qe, q4 = Ti.indexOf, Y4 = Qr, Ov = W4([].indexOf), EE = !!Ov && 1 / Ov([1], 1, -0) < 0, K4 = EE || !Y4("indexOf");
G4({ target: "Array", proto: !0, forced: K4 }, {
  indexOf: function(r) {
    var e = arguments.length > 1 ? arguments[1] : void 0;
    return EE ? Ov(this, r, e) || 0 : q4(this, r, e);
  }
});
var X4 = g, J4 = me;
X4({ target: "Array", stat: !0 }, {
  isArray: J4
});
var Z4 = O, Q4 = Z, tj = Y, ny = Ht, rj = ct, ej = K, Av = ej("iterator"), TE = !1, Ue, ac, ic;
[].keys && (ic = [].keys(), "next" in ic ? (ac = ny(ny(ic)), ac !== Object.prototype && (Ue = ac)) : TE = !0);
var nj = !tj(Ue) || Z4(function() {
  var t = {};
  return Ue[Av].call(t) !== t;
});
nj && (Ue = {});
Q4(Ue[Av]) || rj(Ue, Av, function() {
  return this;
});
var ki = {
  IteratorPrototype: Ue,
  BUGGY_SAFARI_ITERATORS: TE
}, aj = ki.IteratorPrototype, ij = Vt, oj = tr, sj = Lt, uj = Fi, lj = function() {
  return this;
}, sd = function(t, r, e, n) {
  var a = r + " Iterator";
  return t.prototype = ij(aj, { next: oj(+!n, e) }), sj(t, a, !1), uj[a] = lj, t;
}, cj = g, fj = z, IE = na, vj = Z, hj = sd, ay = Ht, iy = Pr, dj = Lt, gj = Tt, oc = ct, pj = K, $j = Fi, OE = ki, yj = IE.PROPER, mj = IE.CONFIGURABLE, oy = OE.IteratorPrototype, po = OE.BUGGY_SAFARI_ITERATORS, Ta = pj("iterator"), sy = "keys", Ia = "values", uy = "entries", bj = function() {
  return this;
}, ud = function(t, r, e, n, a, i, o) {
  hj(e, r, n);
  var s = function(p) {
    if (p === a && v)
      return v;
    if (!po && p && p in c)
      return c[p];
    switch (p) {
      case sy:
        return function() {
          return new e(this, p);
        };
      case Ia:
        return function() {
          return new e(this, p);
        };
      case uy:
        return function() {
          return new e(this, p);
        };
    }
    return function() {
      return new e(this);
    };
  }, u = r + " Iterator", l = !1, c = t.prototype, f = c[Ta] || c["@@iterator"] || a && c[a], v = !po && f || s(a), h = r === "Array" && c.entries || f, d, $, y;
  if (h && (d = ay(h.call(new t())), d !== Object.prototype && d.next && (ay(d) !== oy && (iy ? iy(d, oy) : vj(d[Ta]) || oc(d, Ta, bj)), dj(d, u, !0))), yj && a === Ia && f && f.name !== Ia && (mj ? gj(c, "name", Ia) : (l = !0, v = function() {
    return fj(f, this);
  })), a)
    if ($ = {
      values: s(Ia),
      keys: i ? v : s(sy),
      entries: s(uy)
    }, o)
      for (y in $)
        (po || l || !(y in c)) && oc(c, y, $[y]);
    else
      cj({ target: r, proto: !0, forced: po || l }, $);
  return c[Ta] !== v && oc(c, Ta, v, { name: a }), $j[r] = v, $;
}, sa = function(t, r) {
  return { value: t, done: r };
}, wj = pt, ld = kt, ly = Fi, AE = ht, Sj = lt.f, xj = ud, $o = sa, Ej = U, RE = "Array Iterator", Tj = AE.set, Ij = AE.getterFor(RE), _E = xj(Array, "Array", function(t, r) {
  Tj(this, {
    type: RE,
    target: wj(t),
    // target
    index: 0,
    // next index
    kind: r
    // kind
  });
}, function() {
  var t = Ij(this), r = t.target, e = t.index++;
  if (!r || e >= r.length)
    return t.target = null, $o(void 0, !0);
  switch (t.kind) {
    case "keys":
      return $o(e, !1);
    case "values":
      return $o(r[e], !1);
  }
  return $o([e, r[e]], !1);
}, "values"), cy = ly.Arguments = ly.Array;
ld("keys");
ld("values");
ld("entries");
if (Ej && cy.name !== "values")
  try {
    Sj(cy, "name", { value: "values" });
  } catch {
  }
var Oj = g, Aj = A, Rj = Qn, _j = pt, Cj = Qr, Pj = Aj([].join), Mj = Rj !== Object, Nj = Mj || !Cj("join", ",");
Oj({ target: "Array", proto: !0, forced: Nj }, {
  join: function(r) {
    return Pj(_j(this), r === void 0 ? "," : r);
  }
});
var Dj = er, Fj = pt, Lj = ft, kj = st, Bj = Qr, jj = Math.min, Rv = [].lastIndexOf, CE = !!Rv && 1 / [1].lastIndexOf(1, -0) < 0, Uj = Bj("lastIndexOf"), zj = CE || !Uj, PE = zj ? function(r) {
  if (CE)
    return Dj(Rv, this, arguments) || 0;
  var e = Fj(this), n = kj(e);
  if (n === 0)
    return -1;
  var a = n - 1;
  for (arguments.length > 1 && (a = jj(a, Lj(arguments[1]))), a < 0 && (a = n + a); a >= 0; a--)
    if (a in e && e[a] === r)
      return a || 0;
  return -1;
} : Rv, Vj = g, fy = PE;
Vj({ target: "Array", proto: !0, forced: fy !== [].lastIndexOf }, {
  lastIndexOf: fy
});
var Hj = g, Gj = bt.map, Wj = Li, qj = Wj("map");
Hj({ target: "Array", proto: !0, forced: !qj }, {
  map: function(r) {
    return Gj(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var Yj = g, Kj = O, Xj = aa, Jj = Zr, ME = Array, Zj = Kj(function() {
  function t() {
  }
  return !(ME.of.call(t) instanceof t);
});
Yj({ target: "Array", stat: !0, forced: Zj }, {
  of: function() {
    for (var r = 0, e = arguments.length, n = new (Xj(this) ? this : ME)(e); e > r; )
      Jj(n, r, arguments[r++]);
    return n.length = e, n;
  }
});
var Qj = U, t8 = me, r8 = TypeError, e8 = Object.getOwnPropertyDescriptor, n8 = Qj && !function() {
  if (this !== void 0)
    return !0;
  try {
    Object.defineProperty([], "length", { writable: !1 }).length = 1;
  } catch (t) {
    return t instanceof TypeError;
  }
}(), cd = n8 ? function(t, r) {
  if (t8(t) && !e8(t, "length").writable)
    throw new r8("Cannot set read only .length");
  return t.length = r;
} : function(t, r) {
  return t.length = r;
}, a8 = g, i8 = et, o8 = st, s8 = cd, u8 = oa, l8 = O, c8 = l8(function() {
  return [].push.call({ length: 4294967296 }, 1) !== 4294967297;
}), f8 = function() {
  try {
    Object.defineProperty([], "length", { writable: !1 }).push();
  } catch (t) {
    return t instanceof TypeError;
  }
}, v8 = c8 || !f8();
a8({ target: "Array", proto: !0, arity: 1, forced: v8 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function(r) {
    var e = i8(this), n = o8(e), a = arguments.length;
    u8(n + a);
    for (var i = 0; i < a; i++)
      e[n] = arguments[i], n++;
    return s8(e, n), n;
  }
});
var h8 = tt, d8 = et, g8 = Qn, p8 = st, vy = TypeError, hy = "Reduce of empty array with no initial value", dy = function(t) {
  return function(r, e, n, a) {
    var i = d8(r), o = g8(i), s = p8(i);
    if (h8(e), s === 0 && n < 2)
      throw new vy(hy);
    var u = t ? s - 1 : 0, l = t ? -1 : 1;
    if (n < 2)
      for (; ; ) {
        if (u in o) {
          a = o[u], u += l;
          break;
        }
        if (u += l, t ? u < 0 : s <= u)
          throw new vy(hy);
      }
    for (; t ? u >= 0 : s > u; u += l)
      u in o && (a = e(a, o[u], u, i));
    return a;
  };
}, Pu = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: dy(!1),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: dy(!0)
}, Oa = D, $8 = _r, y8 = Et, yo = function(t) {
  return $8.slice(0, t.length) === t;
}, Mu = function() {
  return yo("Bun/") ? "BUN" : yo("Cloudflare-Workers") ? "CLOUDFLARE" : yo("Deno/") ? "DENO" : yo("Node.js/") ? "NODE" : Oa.Bun && typeof Bun.version == "string" ? "BUN" : Oa.Deno && typeof Deno.version == "object" ? "DENO" : y8(Oa.process) === "process" ? "NODE" : Oa.window && Oa.document ? "BROWSER" : "REST";
}(), m8 = Mu, ua = m8 === "NODE", b8 = g, w8 = Pu.left, S8 = Qr, gy = Kr, x8 = ua, E8 = !x8 && gy > 79 && gy < 83, T8 = E8 || !S8("reduce");
b8({ target: "Array", proto: !0, forced: T8 }, {
  reduce: function(r) {
    var e = arguments.length;
    return w8(this, r, e, e > 1 ? arguments[1] : void 0);
  }
});
var I8 = g, O8 = Pu.right, A8 = Qr, py = Kr, R8 = ua, _8 = !R8 && py > 79 && py < 83, C8 = _8 || !A8("reduceRight");
I8({ target: "Array", proto: !0, forced: C8 }, {
  reduceRight: function(r) {
    return O8(this, r, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var P8 = g, M8 = A, N8 = me, D8 = M8([].reverse), $y = [1, 2];
P8({ target: "Array", proto: !0, forced: String($y) === String($y.reverse()) }, {
  reverse: function() {
    return N8(this) && (this.length = this.length), D8(this);
  }
});
var F8 = g, yy = me, L8 = aa, k8 = Y, my = Jr, B8 = st, j8 = pt, U8 = Zr, z8 = K, V8 = Li, H8 = rr, G8 = V8("slice"), W8 = z8("species"), sc = Array, q8 = Math.max;
F8({ target: "Array", proto: !0, forced: !G8 }, {
  slice: function(r, e) {
    var n = j8(this), a = B8(n), i = my(r, a), o = my(e === void 0 ? a : e, a), s, u, l;
    if (yy(n) && (s = n.constructor, L8(s) && (s === sc || yy(s.prototype)) ? s = void 0 : k8(s) && (s = s[W8], s === null && (s = void 0)), s === sc || s === void 0))
      return H8(n, i, o);
    for (u = new (s === void 0 ? sc : s)(q8(o - i, 0)), l = 0; i < o; i++, l++)
      i in n && U8(u, l, n[i]);
    return u.length = l, u;
  }
});
var Y8 = g, K8 = bt.some, X8 = Qr, J8 = X8("some");
Y8({ target: "Array", proto: !0, forced: !J8 }, {
  some: function(r) {
    return K8(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var by = rr, Z8 = Math.floor, _v = function(t, r) {
  var e = t.length;
  if (e < 8)
    for (var n = 1, a, i; n < e; ) {
      for (i = n, a = t[n]; i && r(t[i - 1], a) > 0; )
        t[i] = t[--i];
      i !== n++ && (t[i] = a);
    }
  else
    for (var o = Z8(e / 2), s = _v(by(t, 0, o), r), u = _v(by(t, o), r), l = s.length, c = u.length, f = 0, v = 0; f < l || v < c; )
      t[f + v] = f < l && v < c ? r(s[f], u[v]) <= 0 ? s[f++] : u[v++] : f < l ? s[f++] : u[v++];
  return t;
}, fd = _v, Q8 = _r, wy = Q8.match(/firefox\/(\d+)/i), NE = !!wy && +wy[1], tU = _r, DE = /MSIE|Trident/.test(tU), rU = _r, Sy = rU.match(/AppleWebKit\/(\d+)\./), vd = !!Sy && +Sy[1], eU = g, FE = A, nU = tt, aU = et, xy = st, iU = Ru, Ey = G, hd = O, oU = fd, sU = Qr, Ty = NE, uU = DE, Iy = Kr, Oy = vd, ue = [], Ay = FE(ue.sort), lU = FE(ue.push), cU = hd(function() {
  ue.sort(void 0);
}), fU = hd(function() {
  ue.sort(null);
}), vU = sU("sort"), LE = !hd(function() {
  if (Iy)
    return Iy < 70;
  if (!(Ty && Ty > 3)) {
    if (uU)
      return !0;
    if (Oy)
      return Oy < 603;
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
}), hU = cU || !fU || !vU || !LE, dU = function(t) {
  return function(r, e) {
    return e === void 0 ? -1 : r === void 0 ? 1 : t !== void 0 ? +t(r, e) || 0 : Ey(r) > Ey(e) ? 1 : -1;
  };
};
eU({ target: "Array", proto: !0, forced: hU }, {
  sort: function(r) {
    r !== void 0 && nU(r);
    var e = aU(this);
    if (LE)
      return r === void 0 ? Ay(e) : Ay(e, r);
    var n = [], a = xy(e), i, o;
    for (o = 0; o < a; o++)
      o in e && lU(n, e[o]);
    for (oU(n, dU(r)), i = xy(n), o = 0; o < i; )
      e[o] = n[o++];
    for (; o < a; )
      iU(e, o++);
    return e;
  }
});
var gU = ot, pU = dt, $U = K, yU = U, Ry = $U("species"), la = function(t) {
  var r = gU(t);
  yU && r && !r[Ry] && pU(r, Ry, {
    configurable: !0,
    get: function() {
      return this;
    }
  });
}, mU = la;
mU("Array");
var bU = g, wU = et, SU = Jr, xU = ft, EU = st, TU = cd, IU = oa, OU = Ci, AU = Zr, uc = Ru, RU = Li, _U = RU("splice"), CU = Math.max, PU = Math.min;
bU({ target: "Array", proto: !0, forced: !_U }, {
  splice: function(r, e) {
    var n = wU(this), a = EU(n), i = SU(r, a), o = arguments.length, s, u, l, c, f, v;
    for (o === 0 ? s = u = 0 : o === 1 ? (s = 0, u = a - i) : (s = o - 2, u = PU(CU(xU(e), 0), a - i)), IU(a + s - u), l = OU(n, u), c = 0; c < u; c++)
      f = i + c, f in n && AU(l, c, n[f]);
    if (l.length = u, s < u) {
      for (c = i; c < a - u; c++)
        f = c + u, v = c + s, f in n ? n[v] = n[f] : uc(n, v);
      for (c = a; c > a - u + s; c--)
        uc(n, c - 1);
    } else if (s > u)
      for (c = a - u; c > i; c--)
        f = c + u - 1, v = c + s - 1, f in n ? n[v] = n[f] : uc(n, v);
    for (c = 0; c < s; c++)
      n[c + i] = arguments[c + 2];
    return TU(n, a - u + s), l;
  }
});
var MU = st, kE = function(t, r) {
  for (var e = MU(t), n = new r(e), a = 0; a < e; a++)
    n[a] = t[e - a - 1];
  return n;
}, NU = g, DU = kE, FU = pt, LU = kt, kU = Array;
NU({ target: "Array", proto: !0 }, {
  toReversed: function() {
    return DU(FU(this), kU);
  }
});
LU("toReversed");
var BU = st, Nu = function(t, r, e) {
  for (var n = 0, a = arguments.length > 2 ? e : BU(r), i = new t(a); a > n; )
    i[n] = r[n++];
  return i;
}, jU = D, UU = function(t, r) {
  var e = jU[t], n = e && e.prototype;
  return n && n[r];
}, zU = g, VU = A, HU = tt, GU = pt, WU = Nu, qU = UU, YU = kt, KU = Array, XU = VU(qU("Array", "sort"));
zU({ target: "Array", proto: !0 }, {
  toSorted: function(r) {
    r !== void 0 && HU(r);
    var e = GU(this), n = WU(KU, e);
    return XU(n, r);
  }
});
YU("toSorted");
var JU = g, ZU = kt, QU = oa, tz = st, rz = Jr, ez = pt, nz = ft, az = Array, iz = Math.max, oz = Math.min;
JU({ target: "Array", proto: !0 }, {
  toSpliced: function(r, e) {
    var n = ez(this), a = tz(n), i = rz(r, a), o = arguments.length, s = 0, u, l, c, f;
    for (o === 0 ? u = l = 0 : o === 1 ? (u = 0, l = a - i) : (u = o - 2, l = oz(iz(nz(e), 0), a - i)), c = QU(a + u - l), f = az(c); s < i; s++)
      f[s] = n[s];
    for (; s < i + u; s++)
      f[s] = arguments[s - i + 2];
    for (; s < c; s++)
      f[s] = n[s + l - u];
    return f;
  }
});
ZU("toSpliced");
var sz = kt;
sz("flat");
var uz = kt;
uz("flatMap");
var lz = g, cz = et, fz = st, vz = cd, hz = Ru, dz = oa, gz = [].unshift(0) !== 1, pz = function() {
  try {
    Object.defineProperty([], "length", { writable: !1 }).unshift();
  } catch (t) {
    return t instanceof TypeError;
  }
}, $z = gz || !pz();
lz({ target: "Array", proto: !0, arity: 1, forced: $z }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  unshift: function(r) {
    var e = cz(this), n = fz(e), a = arguments.length;
    if (a) {
      dz(n + a);
      for (var i = n; i--; ) {
        var o = i + a;
        i in e ? e[o] = e[i] : hz(e, o);
      }
      for (var s = 0; s < a; s++)
        e[s] = arguments[s];
    }
    return vz(e, n + a);
  }
});
var yz = st, mz = ft, bz = RangeError, BE = function(t, r, e, n) {
  var a = yz(t), i = mz(e), o = i < 0 ? a + i : i;
  if (o >= a || o < 0)
    throw new bz("Incorrect index");
  for (var s = new r(a), u = 0; u < a; u++)
    s[u] = u === o ? n : t[u];
  return s;
}, wz = g, Sz = BE, xz = pt, Ez = Array;
wz({ target: "Array", proto: !0 }, {
  with: function(t, r) {
    return Sz(xz(this), Ez, t, r);
  }
});
var Du = typeof ArrayBuffer < "u" && typeof DataView < "u", Tz = ct, ca = function(t, r, e) {
  for (var n in r)
    Tz(t, n, r[n], e);
  return t;
}, Iz = Dt, Oz = TypeError, $r = function(t, r) {
  if (Iz(r, t))
    return t;
  throw new Oz("Incorrect invocation");
}, Az = ft, Rz = zt, _z = RangeError, Fu = function(t) {
  if (t === void 0)
    return 0;
  var r = Az(t), e = Rz(r);
  if (r !== e)
    throw new _z("Wrong length or index");
  return e;
}, dd = Math.sign || function(r) {
  var e = +r;
  return e === 0 || e !== e ? e : e < 0 ? -1 : 1;
}, Cz = 2220446049250313e-31, _y = 1 / Cz, jE = function(t) {
  return t + _y - _y;
}, Pz = dd, Mz = jE, Nz = Math.abs, Dz = 2220446049250313e-31, UE = function(t, r, e, n) {
  var a = +t, i = Nz(a), o = Pz(a);
  if (i < n)
    return o * Mz(i / n / r) * n * r;
  var s = (1 + r / Dz) * i, u = s - (s - i);
  return u > e || u !== u ? o * (1 / 0) : o * u;
}, Fz = UE, Lz = 11920928955078125e-23, kz = 34028234663852886e22, Bz = 11754943508222875e-54, zE = Math.fround || function(r) {
  return Fz(r, Lz, kz, Bz);
}, jz = Array, Uz = Math.abs, Br = Math.pow, zz = Math.floor, Vz = Math.log, Hz = Math.LN2, Gz = function(t, r, e) {
  var n = jz(e), a = e * 8 - r - 1, i = (1 << a) - 1, o = i >> 1, s = r === 23 ? Br(2, -24) - Br(2, -77) : 0, u = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0, l = 0, c, f, v;
  for (t = Uz(t), t !== t || t === 1 / 0 ? (f = t !== t ? 1 : 0, c = i) : (c = zz(Vz(t) / Hz), v = Br(2, -c), t * v < 1 && (c--, v *= 2), c + o >= 1 ? t += s / v : t += s * Br(2, 1 - o), t * v >= 2 && (c++, v /= 2), c + o >= i ? (f = 0, c = i) : c + o >= 1 ? (f = (t * v - 1) * Br(2, r), c += o) : (f = t * Br(2, o - 1) * Br(2, r), c = 0)); r >= 8; )
    n[l++] = f & 255, f /= 256, r -= 8;
  for (c = c << r | f, a += r; a > 0; )
    n[l++] = c & 255, c /= 256, a -= 8;
  return n[l - 1] |= u * 128, n;
}, Wz = function(t, r) {
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
}, qz = {
  pack: Gz,
  unpack: Wz
}, Lu = D, gd = A, lc = U, Yz = Du, VE = na, Kz = Tt, Xz = dt, Cy = ca, cc = O, mo = $r, Jz = ft, Zz = zt, js = Fu, Qz = zE, HE = qz, t7 = Ht, Py = Pr, r7 = id, e7 = rr, n7 = Ye, a7 = Oi, GE = Lt, pd = ht, i7 = VE.PROPER, My = VE.CONFIGURABLE, _n = "ArrayBuffer", ku = "DataView", Cn = "prototype", o7 = "Wrong length", WE = "Wrong index", Ny = pd.getterFor(_n), Ya = pd.getterFor(ku), Dy = pd.set, sr = Lu[_n], Bt = sr, an = Bt && Bt[Cn], xr = Lu[ku], Ee = xr && xr[Cn], Fy = Object.prototype, s7 = Lu.Array, Us = Lu.RangeError, u7 = gd(r7), l7 = gd([].reverse), qE = HE.pack, Ly = HE.unpack, ky = function(t) {
  return [t & 255];
}, By = function(t) {
  return [t & 255, t >> 8 & 255];
}, jy = function(t) {
  return [t & 255, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255];
}, Uy = function(t) {
  return t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0];
}, c7 = function(t) {
  return qE(Qz(t), 23, 4);
}, f7 = function(t) {
  return qE(t, 52, 8);
}, bo = function(t, r, e) {
  Xz(t[Cn], r, {
    configurable: !0,
    get: function() {
      return e(this)[r];
    }
  });
}, ae = function(t, r, e, n) {
  var a = Ya(t), i = js(e), o = !!n;
  if (i + r > a.byteLength)
    throw new Us(WE);
  var s = a.bytes, u = i + a.byteOffset, l = e7(s, u, u + r);
  return o ? l : l7(l);
}, ie = function(t, r, e, n, a, i) {
  var o = Ya(t), s = js(e), u = n(+a), l = !!i;
  if (s + r > o.byteLength)
    throw new Us(WE);
  for (var c = o.bytes, f = s + o.byteOffset, v = 0; v < r; v++)
    c[f + v] = u[l ? v : r - v - 1];
};
if (!Yz)
  Bt = function(r) {
    mo(this, an);
    var e = js(r);
    Dy(this, {
      type: _n,
      bytes: u7(s7(e), 0),
      byteLength: e
    }), lc || (this.byteLength = e, this.detached = !1);
  }, an = Bt[Cn], xr = function(r, e, n) {
    mo(this, Ee), mo(r, an);
    var a = Ny(r), i = a.byteLength, o = Jz(e);
    if (o < 0 || o > i)
      throw new Us("Wrong offset");
    if (n = n === void 0 ? i - o : Zz(n), o + n > i)
      throw new Us(o7);
    Dy(this, {
      type: ku,
      buffer: r,
      byteLength: n,
      byteOffset: o,
      bytes: a.bytes
    }), lc || (this.buffer = r, this.byteLength = n, this.byteOffset = o);
  }, Ee = xr[Cn], lc && (bo(Bt, "byteLength", Ny), bo(xr, "buffer", Ya), bo(xr, "byteLength", Ya), bo(xr, "byteOffset", Ya)), Cy(Ee, {
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
      return Uy(ae(this, 4, r, arguments.length > 1 ? arguments[1] : !1));
    },
    getUint32: function(r) {
      return Uy(ae(this, 4, r, arguments.length > 1 ? arguments[1] : !1)) >>> 0;
    },
    getFloat32: function(r) {
      return Ly(ae(this, 4, r, arguments.length > 1 ? arguments[1] : !1), 23);
    },
    getFloat64: function(r) {
      return Ly(ae(this, 8, r, arguments.length > 1 ? arguments[1] : !1), 52);
    },
    setInt8: function(r, e) {
      ie(this, 1, r, ky, e);
    },
    setUint8: function(r, e) {
      ie(this, 1, r, ky, e);
    },
    setInt16: function(r, e) {
      ie(this, 2, r, By, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setUint16: function(r, e) {
      ie(this, 2, r, By, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setInt32: function(r, e) {
      ie(this, 4, r, jy, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setUint32: function(r, e) {
      ie(this, 4, r, jy, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setFloat32: function(r, e) {
      ie(this, 4, r, c7, e, arguments.length > 2 ? arguments[2] : !1);
    },
    setFloat64: function(r, e) {
      ie(this, 8, r, f7, e, arguments.length > 2 ? arguments[2] : !1);
    }
  });
else {
  var zy = i7 && sr.name !== _n;
  !cc(function() {
    sr(1);
  }) || !cc(function() {
    new sr(-1);
  }) || cc(function() {
    return new sr(), new sr(1.5), new sr(NaN), sr.length !== 1 || zy && !My;
  }) ? (Bt = function(r) {
    return mo(this, an), n7(new sr(js(r)), this, Bt);
  }, Bt[Cn] = an, an.constructor = Bt, a7(Bt, sr)) : zy && My && Kz(sr, "name", _n), Py && t7(Ee) !== Fy && Py(Ee, Fy);
  var wo = new xr(new Bt(2)), Vy = gd(Ee.setInt8);
  wo.setInt8(0, 2147483648), wo.setInt8(1, 2147483649), (wo.getInt8(0) || !wo.getInt8(1)) && Cy(Ee, {
    setInt8: function(r, e) {
      Vy(this, r, e << 24 >> 24);
    },
    setUint8: function(r, e) {
      Vy(this, r, e << 24 >> 24);
    }
  }, { unsafe: !0 });
}
GE(Bt, _n);
GE(xr, ku);
var Bu = {
  ArrayBuffer: Bt,
  DataView: xr
}, v7 = g, h7 = D, d7 = Bu, g7 = la, $d = "ArrayBuffer", Hy = d7[$d], p7 = h7[$d];
v7({ global: !0, constructor: !0, forced: p7 !== Hy }, {
  ArrayBuffer: Hy
});
g7($d);
var $7 = Du, yd = U, At = D, YE = Z, ju = Y, ge = Q, md = gr, y7 = We, m7 = Tt, Cv = ct, b7 = dt, w7 = Dt, Uu = Ht, fa = Pr, S7 = K, x7 = ea, KE = ht, XE = KE.enforce, E7 = KE.get, zs = At.Int8Array, Pv = zs && zs.prototype, Gy = At.Uint8ClampedArray, Wy = Gy && Gy.prototype, Er = zs && Uu(zs), vr = Pv && Uu(Pv), T7 = Object.prototype, bd = At.TypeError, qy = S7("toStringTag"), Mv = x7("TYPED_ARRAY_TAG"), Vs = "TypedArrayConstructor", Gr = $7 && !!fa && md(At.opera) !== "Opera", JE = !1, Mt, le, Pn, Wr = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
}, wd = {
  BigInt64Array: 8,
  BigUint64Array: 8
}, I7 = function(r) {
  if (!ju(r))
    return !1;
  var e = md(r);
  return e === "DataView" || ge(Wr, e) || ge(wd, e);
}, ZE = function(t) {
  var r = Uu(t);
  if (ju(r)) {
    var e = E7(r);
    return e && ge(e, Vs) ? e[Vs] : ZE(r);
  }
}, QE = function(t) {
  if (!ju(t))
    return !1;
  var r = md(t);
  return ge(Wr, r) || ge(wd, r);
}, O7 = function(t) {
  if (QE(t))
    return t;
  throw new bd("Target is not a typed array");
}, A7 = function(t) {
  if (YE(t) && (!fa || w7(Er, t)))
    return t;
  throw new bd(y7(t) + " is not a typed array constructor");
}, R7 = function(t, r, e, n) {
  if (yd) {
    if (e)
      for (var a in Wr) {
        var i = At[a];
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
    (!vr[t] || e) && Cv(vr, t, e ? r : Gr && Pv[t] || r, n);
  }
}, _7 = function(t, r, e) {
  var n, a;
  if (yd) {
    if (fa) {
      if (e) {
        for (n in Wr)
          if (a = At[n], a && ge(a, t))
            try {
              delete a[t];
            } catch {
            }
      }
      if (!Er[t] || e)
        try {
          return Cv(Er, t, e ? r : Gr && Er[t] || r);
        } catch {
        }
      else
        return;
    }
    for (n in Wr)
      a = At[n], a && (!a[t] || e) && Cv(a, t, r);
  }
};
for (Mt in Wr)
  le = At[Mt], Pn = le && le.prototype, Pn ? XE(Pn)[Vs] = le : Gr = !1;
for (Mt in wd)
  le = At[Mt], Pn = le && le.prototype, Pn && (XE(Pn)[Vs] = le);
if ((!Gr || !YE(Er) || Er === Function.prototype) && (Er = function() {
  throw new bd("Incorrect invocation");
}, Gr))
  for (Mt in Wr)
    At[Mt] && fa(At[Mt], Er);
if ((!Gr || !vr || vr === T7) && (vr = Er.prototype, Gr))
  for (Mt in Wr)
    At[Mt] && fa(At[Mt].prototype, vr);
Gr && Uu(Wy) !== vr && fa(Wy, vr);
if (yd && !ge(vr, qy)) {
  JE = !0, b7(vr, qy, {
    configurable: !0,
    get: function() {
      return ju(this) ? this[Mv] : void 0;
    }
  });
  for (Mt in Wr)
    At[Mt] && m7(At[Mt], Mv, Mt);
}
var X = {
  NATIVE_ARRAY_BUFFER_VIEWS: Gr,
  TYPED_ARRAY_TAG: JE && Mv,
  aTypedArray: O7,
  aTypedArrayConstructor: A7,
  exportTypedArrayMethod: R7,
  exportTypedArrayStaticMethod: _7,
  getTypedArrayConstructor: ZE,
  isView: I7,
  isTypedArray: QE,
  TypedArray: Er,
  TypedArrayPrototype: vr
}, C7 = g, tT = X, P7 = tT.NATIVE_ARRAY_BUFFER_VIEWS;
C7({ target: "ArrayBuffer", stat: !0, forced: !P7 }, {
  isView: tT.isView
});
var M7 = g, Sd = qe, N7 = O, rT = Bu, Yy = j, Ky = Jr, D7 = zt, xd = rT.ArrayBuffer, Nv = rT.DataView, eT = Nv.prototype, Xy = Sd(xd.prototype.slice), F7 = Sd(eT.getUint8), L7 = Sd(eT.setUint8), k7 = N7(function() {
  return !new xd(2).slice(1, void 0).byteLength;
});
M7({ target: "ArrayBuffer", proto: !0, unsafe: !0, forced: k7 }, {
  slice: function(r, e) {
    if (Xy && e === void 0)
      return Xy(Yy(this), r);
    for (var n = Yy(this).byteLength, a = Ky(r, n), i = Ky(e === void 0 ? n : e, n), o = new xd(D7(i - a)), s = new Nv(this), u = new Nv(o), l = 0; a < i; )
      L7(u, l++, F7(s, a++));
    return o;
  }
});
var B7 = g, j7 = Bu, U7 = Du;
B7({ global: !0, constructor: !0, forced: !U7 }, {
  DataView: j7.DataView
});
var z7 = g, V7 = A, nT = Math.pow, Jy = 31, H7 = 1023, Zy = nT(2, -24), Qy = 9765625e-10, G7 = function(t) {
  var r = t >>> 15, e = t >>> 10 & Jy, n = t & H7;
  return e === Jy ? n === 0 ? r === 0 ? 1 / 0 : -1 / 0 : NaN : e === 0 ? n * (r === 0 ? Zy : -Zy) : nT(2, e - 15) * (r === 0 ? 1 + n * Qy : -1 - n * Qy);
}, W7 = V7(DataView.prototype.getUint16);
z7({ target: "DataView", proto: !0 }, {
  getFloat16: function(r) {
    var e = W7(this, r, arguments.length > 1 ? arguments[1] : !1);
    return G7(e);
  }
});
var q7 = gr, Y7 = TypeError, K7 = function(t) {
  if (q7(t) === "DataView")
    return t;
  throw new Y7("Argument is not a DataView");
}, X7 = Math.log, J7 = Math.LN2, aT = Math.log2 || function(r) {
  return X7(r) / J7;
}, Z7 = g, Q7 = A, tV = K7, rV = Fu, eV = aT, tm = jE, nV = Math.pow, aV = 65520, iV = 61005353927612305e-21, oV = 16777216, fc = 1024, sV = function(t) {
  if (t !== t)
    return 32256;
  if (t === 0)
    return (1 / t === -1 / 0) << 15;
  var r = t < 0;
  if (r && (t = -t), t >= aV)
    return r << 15 | 31744;
  if (t < iV)
    return r << 15 | tm(t * oV);
  var e = eV(t) | 0;
  if (e === -15)
    return r << 15 | fc;
  var n = tm((t * nV(2, -e) - 1) * fc);
  return n === fc ? r << 15 | e + 16 << 10 : r << 15 | e + 15 << 10 | n;
}, uV = Q7(DataView.prototype.setUint16);
Z7({ target: "DataView", proto: !0 }, {
  setFloat16: function(r, e) {
    tV(this);
    var n = rV(r), a = sV(+e);
    return uV(this, n, a, arguments.length > 2 ? arguments[2] : !1);
  }
});
var iT = D, lV = Ou, cV = Et, rm = iT.ArrayBuffer, fV = iT.TypeError, oT = rm && lV(rm.prototype, "byteLength", "get") || function(t) {
  if (cV(t) !== "ArrayBuffer")
    throw new fV("ArrayBuffer expected");
  return t.byteLength;
}, vV = D, hV = Du, dV = oT, gV = vV.DataView, sT = function(t) {
  if (!hV || dV(t) !== 0)
    return !1;
  try {
    return new gV(t), !1;
  } catch {
    return !0;
  }
}, pV = U, $V = dt, yV = sT, em = ArrayBuffer.prototype;
pV && !("detached" in em) && $V(em, "detached", {
  configurable: !0,
  get: function() {
    return yV(this);
  }
});
var mV = sT, bV = TypeError, wV = function(t) {
  if (mV(t))
    throw new bV("ArrayBuffer is detached");
  return t;
}, SV = D, xV = ua, uT = function(t) {
  if (xV) {
    try {
      return SV.process.getBuiltinModule(t);
    } catch {
    }
    try {
      return Function('return require("' + t + '")')();
    } catch {
    }
  }
}, EV = D, TV = O, vc = Kr, hc = Mu, nm = EV.structuredClone, Ed = !!nm && !TV(function() {
  if (hc === "DENO" && vc > 92 || hc === "NODE" && vc > 94 || hc === "BROWSER" && vc > 97)
    return !1;
  var t = new ArrayBuffer(8), r = nm(t, { transfer: [t] });
  return t.byteLength !== 0 || r.byteLength !== 8;
}), Td = D, IV = uT, OV = Ed, AV = Td.structuredClone, am = Td.ArrayBuffer, So = Td.MessageChannel, Dv = !1, dc, im, xo, gc;
if (OV)
  Dv = function(t) {
    AV(t, { transfer: [t] });
  };
else if (am)
  try {
    So || (dc = IV("worker_threads"), dc && (So = dc.MessageChannel)), So && (im = new So(), xo = new am(2), gc = function(t) {
      im.port1.postMessage(null, [t]);
    }, xo.byteLength === 2 && (gc(xo), xo.byteLength === 0 && (Dv = gc)));
  } catch {
  }
var lT = Dv, Id = D, Od = A, cT = Ou, RV = Fu, _V = wV, CV = oT, om = lT, pc = Ed, PV = Id.structuredClone, fT = Id.ArrayBuffer, Fv = Id.DataView, MV = Math.min, Ad = fT.prototype, vT = Fv.prototype, NV = Od(Ad.slice), sm = cT(Ad, "resizable", "get"), um = cT(Ad, "maxByteLength", "get"), DV = Od(vT.getInt8), FV = Od(vT.setInt8), hT = (pc || om) && function(t, r, e) {
  var n = CV(t), a = r === void 0 ? n : RV(r), i = !sm || !sm(t), o;
  if (_V(t), pc && (t = PV(t, { transfer: [t] }), n === a && (e || i)))
    return t;
  if (n >= a && (!e || i))
    o = NV(t, 0, a);
  else {
    var s = e && !i && um ? { maxByteLength: um(t) } : void 0;
    o = new fT(a, s);
    for (var u = new Fv(t), l = new Fv(o), c = MV(a, n), f = 0; f < c; f++)
      FV(l, f, DV(u, f));
  }
  return pc || om(t), o;
}, LV = g, lm = hT;
lm && LV({ target: "ArrayBuffer", proto: !0 }, {
  transfer: function() {
    return lm(this, arguments.length ? arguments[0] : void 0, !0);
  }
});
var kV = g, cm = hT;
cm && kV({ target: "ArrayBuffer", proto: !0 }, {
  transferToFixedLength: function() {
    return cm(this, arguments.length ? arguments[0] : void 0, !1);
  }
});
var BV = g, jV = A, UV = O, zV = UV(function() {
  return (/* @__PURE__ */ new Date(16e11)).getYear() !== 120;
}), VV = jV(Date.prototype.getFullYear);
BV({ target: "Date", proto: !0, forced: zV }, {
  getYear: function() {
    return VV(this) - 1900;
  }
});
var HV = g, GV = A, dT = Date, WV = GV(dT.prototype.getTime);
HV({ target: "Date", stat: !0 }, {
  now: function() {
    return WV(new dT());
  }
});
var qV = g, gT = A, YV = ft, pT = Date.prototype, KV = gT(pT.getTime), XV = gT(pT.setFullYear);
qV({ target: "Date", proto: !0 }, {
  setYear: function(r) {
    KV(this);
    var e = YV(r), n = e >= 0 && e <= 99 ? e + 1900 : e;
    return XV(this, n);
  }
});
var JV = g;
JV({ target: "Date", proto: !0 }, {
  toGMTString: Date.prototype.toUTCString
});
var ZV = ft, QV = G, tH = ut, rH = RangeError, zu = function(r) {
  var e = QV(tH(this)), n = "", a = ZV(r);
  if (a < 0 || a === 1 / 0)
    throw new rH("Wrong number of repetitions");
  for (; a > 0; (a >>>= 1) && (e += e))
    a & 1 && (n += e);
  return n;
}, $T = A, eH = zt, fm = G, nH = zu, aH = ut, iH = $T(nH), oH = $T("".slice), sH = Math.ceil, vm = function(t) {
  return function(r, e, n) {
    var a = fm(aH(r)), i = eH(e), o = a.length, s = n === void 0 ? " " : fm(n), u, l;
    return i <= o || s === "" ? a : (u = i - o, l = iH(s, sH(u / s.length)), l.length > u && (l = oH(l, 0, u)), t ? a + l : l + a);
  };
}, Vu = {
  // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart
  start: vm(!1),
  // `String.prototype.padEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.padend
  end: vm(!0)
}, be = A, hm = O, Te = Vu.start, uH = RangeError, lH = isFinite, cH = Math.abs, te = Date.prototype, $c = te.toISOString, fH = be(te.getTime), vH = be(te.getUTCDate), hH = be(te.getUTCFullYear), dH = be(te.getUTCHours), gH = be(te.getUTCMilliseconds), pH = be(te.getUTCMinutes), $H = be(te.getUTCMonth), yH = be(te.getUTCSeconds), mH = hm(function() {
  return $c.call(new Date(-5e13 - 1)) !== "0385-07-25T07:06:39.999Z";
}) || !hm(function() {
  $c.call(/* @__PURE__ */ new Date(NaN));
}) ? function() {
  if (!lH(fH(this)))
    throw new uH("Invalid time value");
  var r = this, e = hH(r), n = gH(r), a = e < 0 ? "-" : e > 9999 ? "+" : "";
  return a + Te(cH(e), a ? 6 : 4, 0) + "-" + Te($H(r) + 1, 2, 0) + "-" + Te(vH(r), 2, 0) + "T" + Te(dH(r), 2, 0) + ":" + Te(pH(r), 2, 0) + ":" + Te(yH(r), 2, 0) + "." + Te(n, 3, 0) + "Z";
} : $c, bH = g, dm = mH;
bH({ target: "Date", proto: !0, forced: Date.prototype.toISOString !== dm }, {
  toISOString: dm
});
var wH = g, SH = O, xH = et, EH = $u, TH = SH(function() {
  return (/* @__PURE__ */ new Date(NaN)).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function() {
    return 1;
  } }) !== 1;
});
wH({ target: "Date", proto: !0, arity: 1, forced: TH }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  toJSON: function(r) {
    var e = xH(this), n = EH(e, "number");
    return typeof n == "number" && !isFinite(n) ? null : e.toISOString();
  }
});
var IH = j, OH = cx, AH = TypeError, RH = function(t) {
  if (IH(this), t === "string" || t === "default")
    t = "string";
  else if (t !== "number")
    throw new AH("Incorrect hint");
  return OH(this, t);
}, _H = Q, CH = ct, PH = RH, MH = K, gm = MH("toPrimitive"), pm = Date.prototype;
_H(pm, gm) || CH(pm, gm, PH);
var yT = A, NH = ct, Rd = Date.prototype, $m = "Invalid Date", mT = "toString", DH = yT(Rd[mT]), FH = yT(Rd.getTime);
String(/* @__PURE__ */ new Date(NaN)) !== $m && NH(Rd, mT, function() {
  var r = FH(this);
  return r === r ? DH(this) : $m;
});
var LH = g, Bi = A, kH = G, BH = Bi("".charAt), jH = Bi("".charCodeAt), UH = Bi(/./.exec), zH = Bi(1 .toString), VH = Bi("".toUpperCase), HH = /[\w*+\-./@]/, ym = function(t, r) {
  for (var e = zH(t, 16); e.length < r; )
    e = "0" + e;
  return e;
};
LH({ global: !0 }, {
  escape: function(r) {
    for (var e = kH(r), n = "", a = e.length, i = 0, o, s; i < a; )
      o = BH(e, i++), UH(HH, o) ? n += o : (s = jH(o, 0), s < 256 ? n += "%" + ym(s, 2) : n += "%u" + VH(ym(s, 4)));
    return n;
  }
});
var bT = A, GH = tt, WH = Y, qH = Q, mm = rr, YH = Si, wT = Function, KH = bT([].concat), XH = bT([].join), yc = {}, JH = function(t, r, e) {
  if (!qH(yc, r)) {
    for (var n = [], a = 0; a < r; a++)
      n[a] = "a[" + a + "]";
    yc[r] = wT("C,a", "return new C(" + XH(n, ",") + ")");
  }
  return yc[r](t, e);
}, ST = YH ? wT.bind : function(r) {
  var e = GH(this), n = e.prototype, a = mm(arguments, 1), i = function() {
    var s = KH(a, mm(arguments));
    return this instanceof i ? JH(e, s.length, s) : e.apply(r, s);
  };
  return WH(n) && (i.prototype = n), i;
}, ZH = g, bm = ST;
ZH({ target: "Function", proto: !0, forced: Function.bind !== bm }, {
  bind: bm
});
var QH = Z, wm = Y, t9 = lt, r9 = Dt, e9 = K, n9 = Hh, mc = e9("hasInstance"), Sm = Function.prototype;
mc in Sm || t9.f(Sm, mc, { value: n9(function(t) {
  if (!QH(this) || !wm(t))
    return !1;
  var r = this.prototype;
  return wm(r) ? r9(r, t) : t instanceof this;
}, mc) });
var a9 = U, i9 = na.EXISTS, xT = A, o9 = dt, ET = Function.prototype, s9 = xT(ET.toString), TT = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/, u9 = xT(TT.exec), l9 = "name";
a9 && !i9 && o9(ET, l9, {
  configurable: !0,
  get: function() {
    try {
      return u9(TT, s9(this))[1];
    } catch {
      return "";
    }
  }
});
var c9 = g, bc = D;
c9({ global: !0, forced: bc.globalThis !== bc }, {
  globalThis: bc
});
var f9 = g, v9 = D, h9 = $r, d9 = j, g9 = Z, p9 = Ht, $9 = dt, y9 = Zr, m9 = O, _d = Q, b9 = K, Ar = ki.IteratorPrototype, w9 = U, wc = "constructor", IT = "Iterator", xm = b9("toStringTag"), OT = TypeError, Sc = v9[IT], AT = !g9(Sc) || Sc.prototype !== Ar || !m9(function() {
  Sc({});
}), Cd = function() {
  if (h9(this, Ar), p9(this) === Ar)
    throw new OT("Abstract class Iterator not directly constructable");
}, RT = function(t, r) {
  w9 ? $9(Ar, t, {
    configurable: !0,
    get: function() {
      return r;
    },
    set: function(e) {
      if (d9(this), this === Ar)
        throw new OT("You can't redefine this property");
      _d(this, t) ? this[t] = e : y9(this, t, e);
    }
  }) : Ar[t] = r;
};
_d(Ar, xm) || RT(xm, IT);
(AT || !_d(Ar, wc) || Ar[wc] === Object) && RT(wc, Cd);
Cd.prototype = Ar;
f9({ global: !0, constructor: !0, forced: AT }, {
  Iterator: Cd
});
var Gt = function(t) {
  return {
    iterator: t,
    next: t.next,
    done: !1
  };
}, S9 = RangeError, _T = function(t) {
  if (t === t)
    return t;
  throw new S9("NaN is not allowed");
}, x9 = ft, E9 = RangeError, Pd = function(t) {
  var r = x9(t);
  if (r < 0)
    throw new E9("The argument can't be less than 0");
  return r;
}, T9 = z, I9 = Vt, O9 = Tt, A9 = ca, R9 = K, CT = ht, _9 = Cr, C9 = ki.IteratorPrototype, Eo = sa, xc = Xe, P9 = R9("toStringTag"), PT = "IteratorHelper", MT = "WrapForValidIterator", M9 = CT.set, NT = function(t) {
  var r = CT.getterFor(t ? MT : PT);
  return A9(I9(C9), {
    next: function() {
      var n = r(this);
      if (t)
        return n.nextHandler();
      if (n.done)
        return Eo(void 0, !0);
      try {
        var a = n.nextHandler();
        return n.returnHandlerResult ? a : Eo(a, n.done);
      } catch (i) {
        throw n.done = !0, i;
      }
    },
    return: function() {
      var e = r(this), n = e.iterator;
      if (e.done = !0, t) {
        var a = _9(n, "return");
        return a ? T9(a, n) : Eo(void 0, !0);
      }
      if (e.inner)
        try {
          xc(e.inner.iterator, "normal");
        } catch (i) {
          return xc(n, "throw", i);
        }
      return n && xc(n, "normal"), Eo(void 0, !0);
    }
  });
}, N9 = NT(!0), DT = NT(!1);
O9(DT, P9, "Iterator Helper");
var va = function(t, r, e) {
  var n = function(i, o) {
    o ? (o.iterator = i.iterator, o.next = i.next) : o = i, o.type = r ? MT : PT, o.returnHandlerResult = !!e, o.nextHandler = t, o.counter = 0, o.done = !1, M9(this, o);
  };
  return n.prototype = r ? N9 : DT, n;
}, D9 = g, Em = z, Lv = j, F9 = Gt, L9 = _T, k9 = Pd, B9 = va, j9 = Xr, U9 = B9(function() {
  for (var t = this.iterator, r = this.next, e, n; this.remaining; )
    if (this.remaining--, e = Lv(Em(r, t)), n = this.done = !!e.done, n)
      return;
  if (e = Lv(Em(r, t)), n = this.done = !!e.done, !n)
    return e.value;
});
D9({ target: "Iterator", proto: !0, real: !0, forced: j9 }, {
  drop: function(r) {
    Lv(this);
    var e = k9(L9(+r));
    return new U9(F9(this), {
      remaining: e
    });
  }
});
var z9 = g, V9 = $t, H9 = tt, G9 = j, W9 = Gt;
z9({ target: "Iterator", proto: !0, real: !0 }, {
  every: function(r) {
    G9(this), H9(r);
    var e = W9(this), n = 0;
    return !V9(e, function(a, i) {
      if (!r(a, n++))
        return i();
    }, { IS_RECORD: !0, INTERRUPTED: !0 }).stopped;
  }
});
var q9 = g, Y9 = z, K9 = tt, FT = j, X9 = Gt, J9 = va, Z9 = od, Q9 = Xr, tG = J9(function() {
  for (var t = this.iterator, r = this.predicate, e = this.next, n, a, i; ; ) {
    if (n = FT(Y9(e, t)), a = this.done = !!n.done, a)
      return;
    if (i = n.value, Z9(t, r, [i, this.counter++], !0))
      return i;
  }
});
q9({ target: "Iterator", proto: !0, real: !0, forced: Q9 }, {
  filter: function(r) {
    return FT(this), K9(r), new tG(X9(this), {
      predicate: r
    });
  }
});
var rG = g, eG = $t, nG = tt, aG = j, iG = Gt;
rG({ target: "Iterator", proto: !0, real: !0 }, {
  find: function(r) {
    aG(this), nG(r);
    var e = iG(this), n = 0;
    return eG(e, function(a, i) {
      if (r(a, n++))
        return i(a);
    }, { IS_RECORD: !0, INTERRUPTED: !0 }).result;
  }
});
var oG = z, Tm = j, sG = Gt, uG = ia, LT = function(t, r) {
  (!r || typeof t != "string") && Tm(t);
  var e = uG(t);
  return sG(Tm(e !== void 0 ? oG(e, t) : t));
}, lG = g, Im = z, cG = tt, kv = j, fG = Gt, vG = LT, hG = va, Om = Xe, dG = Xr, gG = hG(function() {
  for (var t = this.iterator, r = this.mapper, e, n; ; ) {
    if (n = this.inner)
      try {
        if (e = kv(Im(n.next, n.iterator)), !e.done)
          return e.value;
        this.inner = null;
      } catch (a) {
        Om(t, "throw", a);
      }
    if (e = kv(Im(this.next, t)), this.done = !!e.done)
      return;
    try {
      this.inner = vG(r(e.value, this.counter++), !1);
    } catch (a) {
      Om(t, "throw", a);
    }
  }
});
lG({ target: "Iterator", proto: !0, real: !0, forced: dG }, {
  flatMap: function(r) {
    return kv(this), cG(r), new gG(fG(this), {
      mapper: r,
      inner: null
    });
  }
});
var pG = g, $G = $t, yG = tt, mG = j, bG = Gt;
pG({ target: "Iterator", proto: !0, real: !0 }, {
  forEach: function(r) {
    mG(this), yG(r);
    var e = bG(this), n = 0;
    $G(e, function(a) {
      r(a, n++);
    }, { IS_RECORD: !0 });
  }
});
var wG = g, SG = z, xG = et, EG = Dt, TG = ki.IteratorPrototype, IG = va, OG = LT, AG = Xr, RG = IG(function() {
  return SG(this.next, this.iterator);
}, !0);
wG({ target: "Iterator", stat: !0, forced: AG }, {
  from: function(r) {
    var e = OG(typeof r == "string" ? xG(r) : r, !0);
    return EG(TG, e.iterator) ? e.iterator : new RG(e);
  }
});
var _G = z, CG = tt, kT = j, PG = Gt, MG = va, NG = od, DG = MG(function() {
  var t = this.iterator, r = kT(_G(this.next, t)), e = this.done = !!r.done;
  if (!e)
    return NG(t, this.mapper, [r.value, this.counter++], !0);
}), FG = function(r) {
  return kT(this), CG(r), new DG(PG(this), {
    mapper: r
  });
}, LG = g, kG = FG, BG = Xr;
LG({ target: "Iterator", proto: !0, real: !0, forced: BG }, {
  map: kG
});
var jG = g, UG = $t, zG = tt, VG = j, HG = Gt, GG = TypeError;
jG({ target: "Iterator", proto: !0, real: !0 }, {
  reduce: function(r) {
    VG(this), zG(r);
    var e = HG(this), n = arguments.length < 2, a = n ? void 0 : arguments[1], i = 0;
    if (UG(e, function(o) {
      n ? (n = !1, a = o) : a = r(a, o, i), i++;
    }, { IS_RECORD: !0 }), n)
      throw new GG("Reduce of empty iterator with no initial value");
    return a;
  }
});
var WG = g, qG = $t, YG = tt, KG = j, XG = Gt;
WG({ target: "Iterator", proto: !0, real: !0 }, {
  some: function(r) {
    KG(this), YG(r);
    var e = XG(this), n = 0;
    return qG(e, function(a, i) {
      if (r(a, n++))
        return i();
    }, { IS_RECORD: !0, INTERRUPTED: !0 }).stopped;
  }
});
var JG = g, ZG = z, BT = j, QG = Gt, tW = _T, rW = Pd, eW = va, nW = Xe, aW = Xr, iW = eW(function() {
  var t = this.iterator;
  if (!this.remaining--)
    return this.done = !0, nW(t, "normal", void 0);
  var r = BT(ZG(this.next, t)), e = this.done = !!r.done;
  if (!e)
    return r.value;
});
JG({ target: "Iterator", proto: !0, real: !0, forced: aW }, {
  take: function(r) {
    BT(this);
    var e = rW(tW(+r));
    return new iW(QG(this), {
      remaining: e
    });
  }
});
var oW = g, sW = j, uW = $t, lW = Gt, cW = [].push;
oW({ target: "Iterator", proto: !0, real: !0 }, {
  toArray: function() {
    var r = [];
    return uW(lW(sW(this)), cW, { that: r, IS_RECORD: !0 }), r;
  }
});
var fW = D, vW = Lt;
vW(fW.JSON, "JSON", !0);
var jT = { exports: {} }, hW = O, Md = hW(function() {
  if (typeof ArrayBuffer == "function") {
    var t = new ArrayBuffer(8);
    Object.isExtensible(t) && Object.defineProperty(t, "a", { value: 8 });
  }
}), dW = O, gW = Y, pW = Et, Am = Md, cs = Object.isExtensible, $W = dW(function() {
  cs(1);
}), Nd = $W || Am ? function(r) {
  return !gW(r) || Am && pW(r) === "ArrayBuffer" ? !1 : cs ? cs(r) : !0;
} : cs, yW = O, ha = !yW(function() {
  return Object.isExtensible(Object.preventExtensions({}));
}), mW = g, bW = A, wW = Ei, SW = Y, Dd = Q, xW = lt.f, Rm = ye, EW = wu, Fd = Nd, TW = ea, IW = ha, UT = !1, qr = TW("meta"), OW = 0, Ld = function(t) {
  xW(t, qr, { value: {
    objectID: "O" + OW++,
    // object ID
    weakData: {}
    // weak collections IDs
  } });
}, AW = function(t, r) {
  if (!SW(t))
    return typeof t == "symbol" ? t : (typeof t == "string" ? "S" : "P") + t;
  if (!Dd(t, qr)) {
    if (!Fd(t))
      return "F";
    if (!r)
      return "E";
    Ld(t);
  }
  return t[qr].objectID;
}, RW = function(t, r) {
  if (!Dd(t, qr)) {
    if (!Fd(t))
      return !0;
    if (!r)
      return !1;
    Ld(t);
  }
  return t[qr].weakData;
}, _W = function(t) {
  return IW && UT && Fd(t) && !Dd(t, qr) && Ld(t), t;
}, CW = function() {
  PW.enable = function() {
  }, UT = !0;
  var t = Rm.f, r = bW([].splice), e = {};
  e[qr] = 1, t(e).length && (Rm.f = function(n) {
    for (var a = t(n), i = 0, o = a.length; i < o; i++)
      if (a[i] === qr) {
        r(a, i, 1);
        break;
      }
    return a;
  }, mW({ target: "Object", stat: !0, forced: !0 }, {
    getOwnPropertyNames: EW.f
  }));
}, PW = jT.exports = {
  enable: CW,
  fastKey: AW,
  getWeakData: RW,
  onFreeze: _W
};
wW[qr] = !0;
var Je = jT.exports, MW = g, NW = D, DW = A, _m = Ri, FW = ct, LW = Je, kW = $t, BW = $r, jW = Z, UW = Nt, Ec = Y, Tc = O, zW = Cu, VW = Lt, HW = Ye, Hu = function(t, r, e) {
  var n = t.indexOf("Map") !== -1, a = t.indexOf("Weak") !== -1, i = n ? "set" : "add", o = NW[t], s = o && o.prototype, u = o, l = {}, c = function(p) {
    var w = DW(s[p]);
    FW(
      s,
      p,
      p === "add" ? function(R) {
        return w(this, R === 0 ? 0 : R), this;
      } : p === "delete" ? function(T) {
        return a && !Ec(T) ? !1 : w(this, T === 0 ? 0 : T);
      } : p === "get" ? function(R) {
        return a && !Ec(R) ? void 0 : w(this, R === 0 ? 0 : R);
      } : p === "has" ? function(R) {
        return a && !Ec(R) ? !1 : w(this, R === 0 ? 0 : R);
      } : function(R, M) {
        return w(this, R === 0 ? 0 : R, M), this;
      }
    );
  }, f = _m(
    t,
    !jW(o) || !(a || s.forEach && !Tc(function() {
      new o().entries().next();
    }))
  );
  if (f)
    u = e.getConstructor(r, t, n, i), LW.enable();
  else if (_m(t, !0)) {
    var v = new u(), h = v[i](a ? {} : -0, 1) !== v, d = Tc(function() {
      v.has(1);
    }), $ = zW(function(p) {
      new o(p);
    }), y = !a && Tc(function() {
      for (var p = new o(), w = 5; w--; )
        p[i](w, w);
      return !p.has(-0);
    });
    $ || (u = r(function(p, w) {
      BW(p, s);
      var T = HW(new o(), p, u);
      return UW(w) || kW(w, T[i], { that: T, AS_ENTRIES: n }), T;
    }), u.prototype = s, s.constructor = u), (d || y) && (c("delete"), c("has"), n && c("get")), (y || h) && c(i), a && s.clear && delete s.clear;
  }
  return l[t] = u, MW({ global: !0, constructor: !0, forced: u !== o }, l), VW(u, t), a || e.setStrong(u, t, n), u;
}, Cm = Vt, GW = dt, Pm = ca, WW = pr, qW = $r, YW = Nt, KW = $t, XW = ud, To = sa, JW = la, Aa = U, Mm = Je.fastKey, zT = ht, Nm = zT.set, Ic = zT.getterFor, VT = {
  getConstructor: function(t, r, e, n) {
    var a = t(function(l, c) {
      qW(l, i), Nm(l, {
        type: r,
        index: Cm(null),
        first: null,
        last: null,
        size: 0
      }), Aa || (l.size = 0), YW(c) || KW(c, l[n], { that: l, AS_ENTRIES: e });
    }), i = a.prototype, o = Ic(r), s = function(l, c, f) {
      var v = o(l), h = u(l, c), d, $;
      return h ? h.value = f : (v.last = h = {
        index: $ = Mm(c, !0),
        key: c,
        value: f,
        previous: d = v.last,
        next: null,
        removed: !1
      }, v.first || (v.first = h), d && (d.next = h), Aa ? v.size++ : l.size++, $ !== "F" && (v.index[$] = h)), l;
    }, u = function(l, c) {
      var f = o(l), v = Mm(c), h;
      if (v !== "F")
        return f.index[v];
      for (h = f.first; h; h = h.next)
        if (h.key === c)
          return h;
    };
    return Pm(i, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function() {
        for (var c = this, f = o(c), v = f.first; v; )
          v.removed = !0, v.previous && (v.previous = v.previous.next = null), v = v.next;
        f.first = f.last = null, f.index = Cm(null), Aa ? f.size = 0 : c.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      delete: function(l) {
        var c = this, f = o(c), v = u(c, l);
        if (v) {
          var h = v.next, d = v.previous;
          delete f.index[v.index], v.removed = !0, d && (d.next = h), h && (h.previous = d), f.first === v && (f.first = h), f.last === v && (f.last = d), Aa ? f.size-- : c.size--;
        }
        return !!v;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function(c) {
        for (var f = o(this), v = WW(c, arguments.length > 1 ? arguments[1] : void 0), h; h = h ? h.next : f.first; )
          for (v(h.value, h.key, this); h && h.removed; )
            h = h.previous;
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function(c) {
        return !!u(this, c);
      }
    }), Pm(i, e ? {
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
    }), Aa && GW(i, "size", {
      configurable: !0,
      get: function() {
        return o(this).size;
      }
    }), a;
  },
  setStrong: function(t, r, e) {
    var n = r + " Iterator", a = Ic(r), i = Ic(n);
    XW(t, r, function(o, s) {
      Nm(this, {
        type: n,
        target: o,
        state: a(o),
        kind: s,
        last: null
      });
    }, function() {
      for (var o = i(this), s = o.kind, u = o.last; u && u.removed; )
        u = u.previous;
      return !o.target || !(o.last = u = u ? u.next : o.state.first) ? (o.target = null, To(void 0, !0)) : To(s === "keys" ? u.key : s === "values" ? u.value : [u.key, u.value], !1);
    }, e ? "entries" : "values", !e, !0), JW(r);
  }
}, ZW = Hu, QW = VT;
ZW("Map", function(t) {
  return function() {
    return t(this, arguments.length ? arguments[0] : void 0);
  };
}, QW);
var Io = A, Ra = Map.prototype, HT = {
  // eslint-disable-next-line es/no-map -- safe
  Map,
  set: Io(Ra.set),
  get: Io(Ra.get),
  has: Io(Ra.has),
  remove: Io(Ra.delete),
  proto: Ra
}, tq = g, rq = A, eq = tt, nq = ut, aq = $t, Gu = HT, iq = O, GT = Gu.Map, oq = Gu.has, sq = Gu.get, uq = Gu.set, lq = rq([].push), cq = iq(function() {
  return GT.groupBy("ab", function(t) {
    return t;
  }).get("a").length !== 1;
});
tq({ target: "Map", stat: !0, forced: cq }, {
  groupBy: function(r, e) {
    nq(r), eq(e);
    var n = new GT(), a = 0;
    return aq(r, function(i) {
      var o = e(i, a++);
      oq(n, o) ? lq(sq(n, o), i) : uq(n, o, [i]);
    }), n;
  }
});
var fq = Math.log, WT = Math.log1p || function(r) {
  var e = +r;
  return e > -1e-8 && e < 1e-8 ? e - e * e / 2 : fq(1 + e);
}, vq = g, hq = WT, Oc = Math.acosh, dq = Math.log, Dm = Math.sqrt, gq = Math.LN2, pq = !Oc || Math.floor(Oc(Number.MAX_VALUE)) !== 710 || Oc(1 / 0) !== 1 / 0;
vq({ target: "Math", stat: !0, forced: pq }, {
  acosh: function(r) {
    var e = +r;
    return e < 1 ? NaN : e > 9490626562425156e-8 ? dq(e) + gq : hq(e - 1 + Dm(e - 1) * Dm(e + 1));
  }
});
var $q = g, Fm = Math.asinh, yq = Math.log, mq = Math.sqrt;
function qT(t) {
  var r = +t;
  return !isFinite(r) || r === 0 ? r : r < 0 ? -qT(-r) : yq(r + mq(r * r + 1));
}
var bq = !(Fm && 1 / Fm(0) > 0);
$q({ target: "Math", stat: !0, forced: bq }, {
  asinh: qT
});
var wq = g, Lm = Math.atanh, Sq = Math.log, xq = !(Lm && 1 / Lm(-0) < 0);
wq({ target: "Math", stat: !0, forced: xq }, {
  atanh: function(r) {
    var e = +r;
    return e === 0 ? e : Sq((1 + e) / (1 - e)) / 2;
  }
});
var Eq = g, Tq = dd, Iq = Math.abs, Oq = Math.pow;
Eq({ target: "Math", stat: !0 }, {
  cbrt: function(r) {
    var e = +r;
    return Tq(e) * Oq(Iq(e), 1 / 3);
  }
});
var Aq = g, Rq = Math.floor, _q = Math.log, Cq = Math.LOG2E;
Aq({ target: "Math", stat: !0 }, {
  clz32: function(r) {
    var e = r >>> 0;
    return e ? 31 - Rq(_q(e + 0.5) * Cq) : 32;
  }
});
var _a = Math.expm1, Pq = Math.exp, Wu = !_a || _a(10) > 22025.465794806718 || _a(10) < 22025.465794806718 || _a(-2e-17) !== -2e-17 ? function(r) {
  var e = +r;
  return e === 0 ? e : e > -1e-6 && e < 1e-6 ? e + e * e / 2 : Pq(e) - 1;
} : _a, Mq = g, Nq = Wu, km = Math.cosh, Dq = Math.abs, Ac = Math.E, Fq = !km || km(710) === 1 / 0;
Mq({ target: "Math", stat: !0, forced: Fq }, {
  cosh: function(r) {
    var e = Nq(Dq(r) - 1) + 1;
    return (e + 1 / (e * Ac * Ac)) * (Ac / 2);
  }
});
var Lq = g, Bm = Wu;
Lq({ target: "Math", stat: !0, forced: Bm !== Math.expm1 }, { expm1: Bm });
var kq = g, Bq = zE;
kq({ target: "Math", stat: !0 }, { fround: Bq });
var jq = g, Uq = UE, zq = 9765625e-10, Vq = 65504, Hq = 6103515625e-14;
jq({ target: "Math", stat: !0 }, {
  f16round: function(r) {
    return Uq(r, zq, Vq, Hq);
  }
});
var Gq = g, jm = Math.hypot, Wq = Math.abs, qq = Math.sqrt, Yq = !!jm && jm(1 / 0, NaN) !== 1 / 0;
Gq({ target: "Math", stat: !0, arity: 2, forced: Yq }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  hypot: function(r, e) {
    for (var n = 0, a = 0, i = arguments.length, o = 0, s, u; a < i; )
      s = Wq(arguments[a++]), o < s ? (u = o / s, n = n * u * u + 1, o = s) : s > 0 ? (u = s / o, n += u * u) : n += s;
    return o === 1 / 0 ? 1 / 0 : o * qq(n);
  }
});
var Kq = g, Xq = O, Um = Math.imul, Jq = Xq(function() {
  return Um(4294967295, 5) !== -5 || Um.length !== 2;
});
Kq({ target: "Math", stat: !0, forced: Jq }, {
  imul: function(r, e) {
    var n = 65535, a = +r, i = +e, o = n & a, s = n & i;
    return 0 | o * s + ((n & a >>> 16) * s + o * (n & i >>> 16) << 16 >>> 0);
  }
});
var Zq = Math.log, Qq = Math.LOG10E, YT = Math.log10 || function(r) {
  return Zq(r) * Qq;
}, tY = g, rY = YT;
tY({ target: "Math", stat: !0 }, {
  log10: rY
});
var eY = g, nY = WT;
eY({ target: "Math", stat: !0 }, { log1p: nY });
var aY = g, iY = aT;
aY({ target: "Math", stat: !0 }, {
  log2: iY
});
var oY = g, sY = dd;
oY({ target: "Math", stat: !0 }, {
  sign: sY
});
var uY = g, lY = O, zm = Wu, cY = Math.abs, Vm = Math.exp, fY = Math.E, vY = lY(function() {
  return Math.sinh(-2e-17) !== -2e-17;
});
uY({ target: "Math", stat: !0, forced: vY }, {
  sinh: function(r) {
    var e = +r;
    return cY(e) < 1 ? (zm(e) - zm(-e)) / 2 : (Vm(e - 1) - Vm(-e - 1)) * (fY / 2);
  }
});
var hY = g, Hm = Wu, Gm = Math.exp;
hY({ target: "Math", stat: !0 }, {
  tanh: function(r) {
    var e = +r, n = Hm(e), a = Hm(-e);
    return n === 1 / 0 ? 1 : a === 1 / 0 ? -1 : (n - a) / (Gm(e) + Gm(-e));
  }
});
var dY = Lt;
dY(Math, "Math", !0);
var gY = g, pY = mx;
gY({ target: "Math", stat: !0 }, {
  trunc: pY
});
var $Y = A, qu = $Y(1 .valueOf), ji = `	
\v\f\r                　\u2028\u2029\uFEFF`, yY = A, mY = ut, bY = G, Bv = ji, Wm = yY("".replace), wY = RegExp("^[" + Bv + "]+"), SY = RegExp("(^|[^" + Bv + "])[" + Bv + "]+$"), Rc = function(t) {
  return function(r) {
    var e = bY(mY(r));
    return t & 1 && (e = Wm(e, wY, "")), t & 2 && (e = Wm(e, SY, "$1")), e;
  };
}, da = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: Rc(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: Rc(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: Rc(3)
}, xY = g, KT = Xr, EY = U, XT = D, JT = Ox, ZT = A, TY = Ri, qm = Q, IY = Ye, OY = Dt, AY = Ge, QT = $u, RY = O, _Y = ye.f, CY = xt.f, PY = lt.f, MY = qu, NY = da.trim, Yu = "Number", Mn = XT[Yu];
JT[Yu];
var kd = Mn.prototype, DY = XT.TypeError, FY = ZT("".slice), Oo = ZT("".charCodeAt), LY = function(t) {
  var r = QT(t, "number");
  return typeof r == "bigint" ? r : kY(r);
}, kY = function(t) {
  var r = QT(t, "number"), e, n, a, i, o, s, u, l;
  if (AY(r))
    throw new DY("Cannot convert a Symbol value to a number");
  if (typeof r == "string" && r.length > 2) {
    if (r = NY(r), e = Oo(r, 0), e === 43 || e === 45) {
      if (n = Oo(r, 2), n === 88 || n === 120)
        return NaN;
    } else if (e === 48) {
      switch (Oo(r, 1)) {
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
        if (l = Oo(o, u), l < 48 || l > i)
          return NaN;
      return parseInt(o, a);
    }
  }
  return +r;
}, Bd = TY(Yu, !Mn(" 0o1") || !Mn("0b1") || Mn("+0x1")), BY = function(t) {
  return OY(kd, t) && RY(function() {
    MY(t);
  });
}, Ku = function(r) {
  var e = arguments.length < 1 ? 0 : Mn(LY(r));
  return BY(this) ? IY(Object(e), this, Ku) : e;
};
Ku.prototype = kd;
Bd && !KT && (kd.constructor = Ku);
xY({ global: !0, constructor: !0, wrap: !0, forced: Bd }, {
  Number: Ku
});
var jY = function(t, r) {
  for (var e = EY ? _Y(r) : (
    // ES3:
    "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(",")
  ), n = 0, a; e.length > n; n++)
    qm(r, a = e[n]) && !qm(t, a) && PY(t, a, CY(r, a));
};
(Bd || KT) && jY(JT[Yu], Mn);
var UY = g;
UY({ target: "Number", stat: !0, nonConfigurable: !0, nonWritable: !0 }, {
  EPSILON: Math.pow(2, -52)
});
var zY = D, VY = zY.isFinite, HY = Number.isFinite || function(r) {
  return typeof r == "number" && VY(r);
}, GY = g, WY = HY;
GY({ target: "Number", stat: !0 }, { isFinite: WY });
var qY = Y, YY = Math.floor, jd = Number.isInteger || function(r) {
  return !qY(r) && isFinite(r) && YY(r) === r;
}, KY = g, XY = jd;
KY({ target: "Number", stat: !0 }, {
  isInteger: XY
});
var JY = g;
JY({ target: "Number", stat: !0 }, {
  isNaN: function(r) {
    return r !== r;
  }
});
var ZY = g, QY = jd, tK = Math.abs;
ZY({ target: "Number", stat: !0 }, {
  isSafeInteger: function(r) {
    return QY(r) && tK(r) <= 9007199254740991;
  }
});
var rK = g;
rK({ target: "Number", stat: !0, nonConfigurable: !0, nonWritable: !0 }, {
  MAX_SAFE_INTEGER: 9007199254740991
});
var eK = g;
eK({ target: "Number", stat: !0, nonConfigurable: !0, nonWritable: !0 }, {
  MIN_SAFE_INTEGER: -9007199254740991
});
var tI = D, nK = O, aK = A, iK = G, oK = da.trim, sK = ji, uK = aK("".charAt), Hs = tI.parseFloat, Ym = tI.Symbol, Km = Ym && Ym.iterator, lK = 1 / Hs(sK + "-0") !== -1 / 0 || Km && !nK(function() {
  Hs(Object(Km));
}), rI = lK ? function(r) {
  var e = oK(iK(r)), n = Hs(e);
  return n === 0 && uK(e, 0) === "-" ? -0 : n;
} : Hs, cK = g, Xm = rI;
cK({ target: "Number", stat: !0, forced: Number.parseFloat !== Xm }, {
  parseFloat: Xm
});
var eI = D, fK = O, vK = A, hK = G, dK = da.trim, Jm = ji, Ka = eI.parseInt, Zm = eI.Symbol, Qm = Zm && Zm.iterator, nI = /^[+-]?0x/i, gK = vK(nI.exec), pK = Ka(Jm + "08") !== 8 || Ka(Jm + "0x16") !== 22 || Qm && !fK(function() {
  Ka(Object(Qm));
}), aI = pK ? function(r, e) {
  var n = dK(hK(r));
  return Ka(n, e >>> 0 || (gK(nI, n) ? 16 : 10));
} : Ka, $K = g, t0 = aI;
$K({ target: "Number", stat: !0, forced: Number.parseInt !== t0 }, {
  parseInt: t0
});
var yK = g, Ud = A, mK = ft, bK = qu, wK = zu, SK = YT, jv = O, xK = RangeError, r0 = String, EK = isFinite, TK = Math.abs, IK = Math.floor, e0 = Math.pow, OK = Math.round, Tr = Ud(1 .toExponential), AK = Ud(wK), n0 = Ud("".slice), iI = Tr(-69e-12, 4) === "-6.9000e-11" && Tr(1.255, 2) === "1.25e+0" && Tr(12345, 3) === "1.235e+4" && Tr(25, 0) === "3e+1", RK = function() {
  return jv(function() {
    Tr(1, 1 / 0);
  }) && jv(function() {
    Tr(1, -1 / 0);
  });
}, _K = function() {
  return !jv(function() {
    Tr(1 / 0, 1 / 0), Tr(NaN, 1 / 0);
  });
}, CK = !iI || !RK() || !_K();
yK({ target: "Number", proto: !0, forced: CK }, {
  toExponential: function(r) {
    var e = bK(this);
    if (r === void 0)
      return Tr(e);
    var n = mK(r);
    if (!EK(e))
      return String(e);
    if (n < 0 || n > 20)
      throw new xK("Incorrect fraction digits");
    if (iI)
      return Tr(e, n);
    var a = "", i, o, s, u;
    if (e < 0 && (a = "-", e = -e), e === 0)
      o = 0, i = AK("0", n + 1);
    else {
      var l = SK(e);
      o = IK(l);
      var c = e0(10, o - n), f = OK(e / c);
      2 * e >= (2 * f + 1) * c && (f += 1), f >= e0(10, n + 1) && (f /= 10, o += 1), i = r0(f);
    }
    return n !== 0 && (i = n0(i, 0, 1) + "." + n0(i, 1)), o === 0 ? (s = "+", u = "0") : (s = o > 0 ? "+" : "-", u = r0(TK(o))), i += "e" + s + u, a + i;
  }
});
var PK = g, zd = A, MK = ft, NK = qu, DK = zu, a0 = O, FK = RangeError, oI = String, sI = Math.floor, Uv = zd(DK), i0 = zd("".slice), Ca = zd(1 .toFixed), xn = function(t, r, e) {
  return r === 0 ? e : r % 2 === 1 ? xn(t, r - 1, e * t) : xn(t * t, r / 2, e);
}, LK = function(t) {
  for (var r = 0, e = t; e >= 4096; )
    r += 12, e /= 4096;
  for (; e >= 2; )
    r += 1, e /= 2;
  return r;
}, on = function(t, r, e) {
  for (var n = -1, a = e; ++n < 6; )
    a += r * t[n], t[n] = a % 1e7, a = sI(a / 1e7);
}, _c = function(t, r) {
  for (var e = 6, n = 0; --e >= 0; )
    n += t[e], t[e] = sI(n / r), n = n % r * 1e7;
}, o0 = function(t) {
  for (var r = 6, e = ""; --r >= 0; )
    if (e !== "" || r === 0 || t[r] !== 0) {
      var n = oI(t[r]);
      e = e === "" ? n : e + Uv("0", 7 - n.length) + n;
    }
  return e;
}, kK = a0(function() {
  return Ca(8e-5, 3) !== "0.000" || Ca(0.9, 0) !== "1" || Ca(1.255, 2) !== "1.25" || Ca(1000000000000000100, 0) !== "1000000000000000128";
}) || !a0(function() {
  Ca({});
});
PK({ target: "Number", proto: !0, forced: kK }, {
  toFixed: function(r) {
    var e = NK(this), n = MK(r), a = [0, 0, 0, 0, 0, 0], i = "", o = "0", s, u, l, c;
    if (n < 0 || n > 20)
      throw new FK("Incorrect fraction digits");
    if (e !== e)
      return "NaN";
    if (e <= -1e21 || e >= 1e21)
      return oI(e);
    if (e < 0 && (i = "-", e = -e), e > 1e-21)
      if (s = LK(e * xn(2, 69, 1)) - 69, u = s < 0 ? e * xn(2, -s, 1) : e / xn(2, s, 1), u *= 4503599627370496, s = 52 - s, s > 0) {
        for (on(a, 0, u), l = n; l >= 7; )
          on(a, 1e7, 0), l -= 7;
        for (on(a, xn(10, l, 1), 0), l = s - 1; l >= 23; )
          _c(a, 1 << 23), l -= 23;
        _c(a, 1 << l), on(a, 1, 1), _c(a, 2), o = o0(a);
      } else
        on(a, 0, u), on(a, 1 << -s, 0), o = o0(a) + Uv("0", n);
    return n > 0 ? (c = o.length, o = i + (c <= n ? "0." + Uv("0", n - c) + o : i0(o, 0, c - n) + "." + i0(o, c - n))) : o = i + o, o;
  }
});
var BK = g, jK = A, s0 = O, u0 = qu, Gs = jK(1 .toPrecision), UK = s0(function() {
  return Gs(1, void 0) !== "1";
}) || !s0(function() {
  Gs({});
});
BK({ target: "Number", proto: !0, forced: UK }, {
  toPrecision: function(r) {
    return r === void 0 ? Gs(u0(this)) : Gs(u0(this), r);
  }
});
var l0 = U, zK = A, VK = z, HK = O, Cc = _i, GK = Ii, WK = xi, qK = et, YK = Qn, sn = Object.assign, c0 = Object.defineProperty, KK = zK([].concat), uI = !sn || HK(function() {
  if (l0 && sn({ b: 1 }, sn(c0({}, "a", {
    enumerable: !0,
    get: function() {
      c0(this, "b", {
        value: 3,
        enumerable: !1
      });
    }
  }), { b: 2 })).b !== 1)
    return !0;
  var t = {}, r = {}, e = Symbol("assign detection"), n = "abcdefghijklmnopqrst";
  return t[e] = 7, n.split("").forEach(function(a) {
    r[a] = a;
  }), sn({}, t)[e] !== 7 || Cc(sn({}, r)).join("") !== n;
}) ? function(r, e) {
  for (var n = qK(r), a = arguments.length, i = 1, o = GK.f, s = WK.f; a > i; )
    for (var u = YK(arguments[i++]), l = o ? KK(Cc(u), o(u)) : Cc(u), c = l.length, f = 0, v; c > f; )
      v = l[f++], (!l0 || VK(s, u, v)) && (n[v] = u[v]);
  return n;
} : sn, XK = g, f0 = uI;
XK({ target: "Object", stat: !0, arity: 2, forced: Object.assign !== f0 }, {
  assign: f0
});
var JK = g, ZK = U, QK = Vt;
JK({ target: "Object", stat: !0, sham: !ZK }, {
  create: QK
});
var tX = D, rX = O, v0 = vd, Xu = !rX(function() {
  if (!(v0 && v0 < 535)) {
    var t = Math.random();
    __defineSetter__.call(null, t, function() {
    }), delete tX[t];
  }
}), eX = g, nX = U, aX = Xu, iX = tt, oX = et, sX = lt;
nX && eX({ target: "Object", proto: !0, forced: aX }, {
  __defineGetter__: function(r, e) {
    sX.f(oX(this), r, { get: iX(e), enumerable: !0, configurable: !0 });
  }
});
var uX = g, lX = U, h0 = bu.f;
uX({ target: "Object", stat: !0, forced: Object.defineProperties !== h0, sham: !lX }, {
  defineProperties: h0
});
var cX = g, fX = U, d0 = lt.f;
cX({ target: "Object", stat: !0, forced: Object.defineProperty !== d0, sham: !fX }, {
  defineProperty: d0
});
var vX = g, hX = U, dX = Xu, gX = tt, pX = et, $X = lt;
hX && vX({ target: "Object", proto: !0, forced: dX }, {
  __defineSetter__: function(r, e) {
    $X.f(pX(this), r, { set: gX(e), enumerable: !0, configurable: !0 });
  }
});
var lI = U, yX = O, cI = A, mX = Ht, bX = _i, wX = pt, SX = xi.f, fI = cI(SX), xX = cI([].push), EX = lI && yX(function() {
  var t = /* @__PURE__ */ Object.create(null);
  return t[2] = 2, !fI(t, 2);
}), g0 = function(t) {
  return function(r) {
    for (var e = wX(r), n = bX(e), a = EX && mX(e) === null, i = n.length, o = 0, s = [], u; i > o; )
      u = n[o++], (!lI || (a ? u in e : fI(e, u))) && xX(s, t ? [u, e[u]] : e[u]);
    return s;
  };
}, vI = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: g0(!0),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: g0(!1)
}, TX = g, IX = vI.entries;
TX({ target: "Object", stat: !0 }, {
  entries: function(r) {
    return IX(r);
  }
});
var OX = g, AX = ha, RX = O, _X = Y, CX = Je.onFreeze, zv = Object.freeze, PX = RX(function() {
  zv(1);
});
OX({ target: "Object", stat: !0, forced: PX, sham: !AX }, {
  freeze: function(r) {
    return zv && _X(r) ? zv(CX(r)) : r;
  }
});
var MX = g, NX = $t, DX = Zr;
MX({ target: "Object", stat: !0 }, {
  fromEntries: function(r) {
    var e = {};
    return NX(r, function(n, a) {
      DX(e, n, a);
    }, { AS_ENTRIES: !0 }), e;
  }
});
var FX = g, LX = O, kX = pt, hI = xt.f, dI = U, BX = !dI || LX(function() {
  hI(1);
});
FX({ target: "Object", stat: !0, forced: BX, sham: !dI }, {
  getOwnPropertyDescriptor: function(r, e) {
    return hI(kX(r), e);
  }
});
var jX = g, UX = U, zX = Wh, VX = pt, HX = xt, GX = Zr;
jX({ target: "Object", stat: !0, sham: !UX }, {
  getOwnPropertyDescriptors: function(r) {
    for (var e = VX(r), n = HX.f, a = zX(e), i = {}, o = 0, s, u; a.length > o; )
      u = n(e, s = a[o++]), u !== void 0 && GX(i, s, u);
    return i;
  }
});
var WX = g, qX = O, YX = wu.f, KX = qX(function() {
  return !Object.getOwnPropertyNames(1);
});
WX({ target: "Object", stat: !0, forced: KX }, {
  getOwnPropertyNames: YX
});
var XX = g, JX = O, ZX = et, gI = Ht, QX = ed, tJ = JX(function() {
  gI(1);
});
XX({ target: "Object", stat: !0, forced: tJ, sham: !QX }, {
  getPrototypeOf: function(r) {
    return gI(ZX(r));
  }
});
var rJ = g, eJ = ot, nJ = A, aJ = tt, iJ = ut, oJ = $e, sJ = $t, uJ = O, p0 = Object.groupBy, lJ = eJ("Object", "create"), cJ = nJ([].push), fJ = !p0 || uJ(function() {
  return p0("ab", function(t) {
    return t;
  }).a.length !== 1;
});
rJ({ target: "Object", stat: !0, forced: fJ }, {
  groupBy: function(r, e) {
    iJ(r), aJ(e);
    var n = lJ(null), a = 0;
    return sJ(r, function(i) {
      var o = oJ(e(i, a++));
      o in n ? cJ(n[o], i) : n[o] = [i];
    }), n;
  }
});
var vJ = g, hJ = Q;
vJ({ target: "Object", stat: !0 }, {
  hasOwn: hJ
});
var pI = Object.is || function(r, e) {
  return r === e ? r !== 0 || 1 / r === 1 / e : r !== r && e !== e;
}, dJ = g, gJ = pI;
dJ({ target: "Object", stat: !0 }, {
  is: gJ
});
var pJ = g, $0 = Nd;
pJ({ target: "Object", stat: !0, forced: Object.isExtensible !== $0 }, {
  isExtensible: $0
});
var $J = g, yJ = O, mJ = Y, bJ = Et, $I = Md, Vv = Object.isFrozen, wJ = $I || yJ(function() {
  Vv(1);
});
$J({ target: "Object", stat: !0, forced: wJ }, {
  isFrozen: function(r) {
    return !mJ(r) || $I && bJ(r) === "ArrayBuffer" ? !0 : Vv ? Vv(r) : !1;
  }
});
var SJ = g, xJ = O, EJ = Y, TJ = Et, yI = Md, Hv = Object.isSealed, IJ = yI || xJ(function() {
  Hv(1);
});
SJ({ target: "Object", stat: !0, forced: IJ }, {
  isSealed: function(r) {
    return !EJ(r) || yI && TJ(r) === "ArrayBuffer" ? !0 : Hv ? Hv(r) : !1;
  }
});
var OJ = g, AJ = et, mI = _i, RJ = O, _J = RJ(function() {
  mI(1);
});
OJ({ target: "Object", stat: !0, forced: _J }, {
  keys: function(r) {
    return mI(AJ(r));
  }
});
var CJ = g, PJ = U, MJ = Xu, NJ = et, DJ = $e, FJ = Ht, LJ = xt.f;
PJ && CJ({ target: "Object", proto: !0, forced: MJ }, {
  __lookupGetter__: function(r) {
    var e = NJ(this), n = DJ(r), a;
    do
      if (a = LJ(e, n))
        return a.get;
    while (e = FJ(e));
  }
});
var kJ = g, BJ = U, jJ = Xu, UJ = et, zJ = $e, VJ = Ht, HJ = xt.f;
BJ && kJ({ target: "Object", proto: !0, forced: jJ }, {
  __lookupSetter__: function(r) {
    var e = UJ(this), n = zJ(r), a;
    do
      if (a = HJ(e, n))
        return a.set;
    while (e = VJ(e));
  }
});
var GJ = g, WJ = Y, qJ = Je.onFreeze, YJ = ha, KJ = O, Gv = Object.preventExtensions, XJ = KJ(function() {
  Gv(1);
});
GJ({ target: "Object", stat: !0, forced: XJ, sham: !YJ }, {
  preventExtensions: function(r) {
    return Gv && WJ(r) ? Gv(qJ(r)) : r;
  }
});
var JJ = U, ZJ = dt, QJ = Y, tZ = rE, rZ = et, eZ = ut, y0 = Object.getPrototypeOf, m0 = Object.setPrototypeOf, b0 = Object.prototype, w0 = "__proto__";
if (JJ && y0 && m0 && !(w0 in b0))
  try {
    ZJ(b0, w0, {
      configurable: !0,
      get: function() {
        return y0(rZ(this));
      },
      set: function(r) {
        var e = eZ(this);
        tZ(r) && QJ(e) && m0(e, r);
      }
    });
  } catch {
  }
var nZ = g, aZ = Y, iZ = Je.onFreeze, oZ = ha, sZ = O, Wv = Object.seal, uZ = sZ(function() {
  Wv(1);
});
nZ({ target: "Object", stat: !0, forced: uZ, sham: !oZ }, {
  seal: function(r) {
    return Wv && aZ(r) ? Wv(iZ(r)) : r;
  }
});
var lZ = g, cZ = Pr;
lZ({ target: "Object", stat: !0 }, {
  setPrototypeOf: cZ
});
var fZ = qh, vZ = gr, hZ = fZ ? {}.toString : function() {
  return "[object " + vZ(this) + "]";
}, dZ = qh, gZ = ct, pZ = hZ;
dZ || gZ(Object.prototype, "toString", pZ, { unsafe: !0 });
var $Z = g, yZ = vI.values;
$Z({ target: "Object", stat: !0 }, {
  values: function(r) {
    return yZ(r);
  }
});
var mZ = g, S0 = rI;
mZ({ global: !0, forced: parseFloat !== S0 }, {
  parseFloat: S0
});
var bZ = g, x0 = aI;
bZ({ global: !0, forced: parseInt !== x0 }, {
  parseInt: x0
});
var wZ = aa, SZ = We, xZ = TypeError, Vd = function(t) {
  if (wZ(t))
    return t;
  throw new xZ(SZ(t) + " is not a constructor");
}, E0 = j, EZ = Vd, TZ = Nt, IZ = K, OZ = IZ("species"), Ju = function(t, r) {
  var e = E0(t).constructor, n;
  return e === void 0 || TZ(n = E0(e)[OZ]) ? r : EZ(n);
}, AZ = TypeError, nr = function(t, r) {
  if (t < r)
    throw new AZ("Not enough arguments");
  return t;
}, RZ = _r, bI = /(?:ipad|iphone|ipod).*applewebkit/i.test(RZ), jt = D, _Z = er, CZ = pr, T0 = Z, PZ = Q, wI = O, I0 = Sx, MZ = rr, O0 = yu, NZ = nr, DZ = bI, FZ = ua, qv = jt.setImmediate, Yv = jt.clearImmediate, LZ = jt.process, Pc = jt.Dispatch, kZ = jt.Function, A0 = jt.MessageChannel, BZ = jt.String, Mc = 0, Xa = {}, R0 = "onreadystatechange", vi, Ie, Nc, Dc;
wI(function() {
  vi = jt.location;
});
var Hd = function(t) {
  if (PZ(Xa, t)) {
    var r = Xa[t];
    delete Xa[t], r();
  }
}, Fc = function(t) {
  return function() {
    Hd(t);
  };
}, _0 = function(t) {
  Hd(t.data);
}, C0 = function(t) {
  jt.postMessage(BZ(t), vi.protocol + "//" + vi.host);
};
(!qv || !Yv) && (qv = function(r) {
  NZ(arguments.length, 1);
  var e = T0(r) ? r : kZ(r), n = MZ(arguments, 1);
  return Xa[++Mc] = function() {
    _Z(e, void 0, n);
  }, Ie(Mc), Mc;
}, Yv = function(r) {
  delete Xa[r];
}, FZ ? Ie = function(t) {
  LZ.nextTick(Fc(t));
} : Pc && Pc.now ? Ie = function(t) {
  Pc.now(Fc(t));
} : A0 && !DZ ? (Nc = new A0(), Dc = Nc.port2, Nc.port1.onmessage = _0, Ie = CZ(Dc.postMessage, Dc)) : jt.addEventListener && T0(jt.postMessage) && !jt.importScripts && vi && vi.protocol !== "file:" && !wI(C0) ? (Ie = C0, jt.addEventListener("message", _0, !1)) : R0 in O0("script") ? Ie = function(t) {
  I0.appendChild(O0("script"))[R0] = function() {
    I0.removeChild(this), Hd(t);
  };
} : Ie = function(t) {
  setTimeout(Fc(t), 0);
});
var Zu = {
  set: qv,
  clear: Yv
}, P0 = D, jZ = U, UZ = Object.getOwnPropertyDescriptor, SI = function(t) {
  if (!jZ)
    return P0[t];
  var r = UZ(P0, t);
  return r && r.value;
}, xI = function() {
  this.head = null, this.tail = null;
};
xI.prototype = {
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
var EI = xI, zZ = _r, VZ = /ipad|iphone|ipod/i.test(zZ) && typeof Pebble < "u", HZ = _r, GZ = /web0s(?!.*chrome)/i.test(HZ), Wn = D, WZ = SI, M0 = pr, Lc = Zu.set, qZ = EI, YZ = bI, KZ = VZ, XZ = GZ, kc = ua, N0 = Wn.MutationObserver || Wn.WebKitMutationObserver, D0 = Wn.document, F0 = Wn.process, Ao = Wn.Promise, Kv = WZ("queueMicrotask"), un, Bc, jc, Ro, L0;
if (!Kv) {
  var _o = new qZ(), Co = function() {
    var t, r;
    for (kc && (t = F0.domain) && t.exit(); r = _o.get(); )
      try {
        r();
      } catch (e) {
        throw _o.head && un(), e;
      }
    t && t.enter();
  };
  !YZ && !kc && !XZ && N0 && D0 ? (Bc = !0, jc = D0.createTextNode(""), new N0(Co).observe(jc, { characterData: !0 }), un = function() {
    jc.data = Bc = !Bc;
  }) : !KZ && Ao && Ao.resolve ? (Ro = Ao.resolve(void 0), Ro.constructor = Ao, L0 = M0(Ro.then, Ro), un = function() {
    L0(Co);
  }) : kc ? un = function() {
    F0.nextTick(Co);
  } : (Lc = M0(Lc, Wn), un = function() {
    Lc(Co);
  }), Kv = function(t) {
    _o.head || un(), _o.add(t);
  };
}
var TI = Kv, JZ = function(t, r) {
  try {
    arguments.length === 1 ? console.error(t) : console.error(t, r);
  } catch {
  }
}, ga = function(t) {
  try {
    return { error: !1, value: t() };
  } catch (r) {
    return { error: !0, value: r };
  }
}, ZZ = D, Ui = ZZ.Promise, QZ = D, Ja = Ui, tQ = Z, rQ = Ri, eQ = zh, nQ = K, k0 = Mu, Uc = Kr;
Ja && Ja.prototype;
var aQ = nQ("species"), Xv = !1, II = tQ(QZ.PromiseRejectionEvent), iQ = rQ("Promise", function() {
  var t = eQ(Ja), r = t !== String(Ja);
  if (!r && Uc === 66)
    return !0;
  if (!Uc || Uc < 51 || !/native code/.test(t)) {
    var e = new Ja(function(i) {
      i(1);
    }), n = function(i) {
      i(function() {
      }, function() {
      });
    }, a = e.constructor = {};
    if (a[aQ] = n, Xv = e.then(function() {
    }) instanceof n, !Xv)
      return !0;
  }
  return !r && (k0 === "BROWSER" || k0 === "DENO") && !II;
}), zi = {
  CONSTRUCTOR: iQ,
  REJECTION_EVENT: II,
  SUBCLASSING: Xv
}, Nr = {}, B0 = tt, oQ = TypeError, sQ = function(t) {
  var r, e;
  this.promise = new t(function(n, a) {
    if (r !== void 0 || e !== void 0)
      throw new oQ("Bad Promise constructor");
    r = n, e = a;
  }), this.resolve = B0(r), this.reject = B0(e);
};
Nr.f = function(t) {
  return new sQ(t);
};
var uQ = g, Ws = ua, pe = D, qn = z, j0 = ct, U0 = Pr, lQ = Lt, cQ = la, fQ = tt, fs = Z, vQ = Y, hQ = $r, dQ = Ju, OI = Zu.set, Gd = TI, gQ = JZ, pQ = ga, $Q = EI, AI = ht, qs = Ui, Wd = zi, RI = Nr, Qu = "Promise", _I = Wd.CONSTRUCTOR, yQ = Wd.REJECTION_EVENT, mQ = Wd.SUBCLASSING, zc = AI.getterFor(Qu), bQ = AI.set, dn = qs && qs.prototype, Pe = qs, Po = dn, CI = pe.TypeError, Jv = pe.document, qd = pe.process, Zv = RI.f, wQ = Zv, SQ = !!(Jv && Jv.createEvent && pe.dispatchEvent), PI = "unhandledrejection", xQ = "rejectionhandled", z0 = 0, MI = 1, EQ = 2, Yd = 1, NI = 2, Mo, V0, TQ, H0, DI = function(t) {
  var r;
  return vQ(t) && fs(r = t.then) ? r : !1;
}, FI = function(t, r) {
  var e = r.value, n = r.state === MI, a = n ? t.ok : t.fail, i = t.resolve, o = t.reject, s = t.domain, u, l, c;
  try {
    a ? (n || (r.rejection === NI && OQ(r), r.rejection = Yd), a === !0 ? u = e : (s && s.enter(), u = a(e), s && (s.exit(), c = !0)), u === t.promise ? o(new CI("Promise-chain cycle")) : (l = DI(u)) ? qn(l, u, i, o) : i(u)) : o(e);
  } catch (f) {
    s && !c && s.exit(), o(f);
  }
}, LI = function(t, r) {
  t.notified || (t.notified = !0, Gd(function() {
    for (var e = t.reactions, n; n = e.get(); )
      FI(n, t);
    t.notified = !1, r && !t.rejection && IQ(t);
  }));
}, kI = function(t, r, e) {
  var n, a;
  SQ ? (n = Jv.createEvent("Event"), n.promise = r, n.reason = e, n.initEvent(t, !1, !0), pe.dispatchEvent(n)) : n = { promise: r, reason: e }, !yQ && (a = pe["on" + t]) ? a(n) : t === PI && gQ("Unhandled promise rejection", e);
}, IQ = function(t) {
  qn(OI, pe, function() {
    var r = t.facade, e = t.value, n = G0(t), a;
    if (n && (a = pQ(function() {
      Ws ? qd.emit("unhandledRejection", e, r) : kI(PI, r, e);
    }), t.rejection = Ws || G0(t) ? NI : Yd, a.error))
      throw a.value;
  });
}, G0 = function(t) {
  return t.rejection !== Yd && !t.parent;
}, OQ = function(t) {
  qn(OI, pe, function() {
    var r = t.facade;
    Ws ? qd.emit("rejectionHandled", r) : kI(xQ, r, t.value);
  });
}, En = function(t, r, e) {
  return function(n) {
    t(r, n, e);
  };
}, Nn = function(t, r, e) {
  t.done || (t.done = !0, e && (t = e), t.value = r, t.state = EQ, LI(t, !0));
}, Qv = function(t, r, e) {
  if (!t.done) {
    t.done = !0, e && (t = e);
    try {
      if (t.facade === r)
        throw new CI("Promise can't be resolved itself");
      var n = DI(r);
      n ? Gd(function() {
        var a = { done: !1 };
        try {
          qn(
            n,
            r,
            En(Qv, a, t),
            En(Nn, a, t)
          );
        } catch (i) {
          Nn(a, i, t);
        }
      }) : (t.value = r, t.state = MI, LI(t, !1));
    } catch (a) {
      Nn({ done: !1 }, a, t);
    }
  }
};
if (_I && (Pe = function(r) {
  hQ(this, Po), fQ(r), qn(Mo, this);
  var e = zc(this);
  try {
    r(En(Qv, e), En(Nn, e));
  } catch (n) {
    Nn(e, n);
  }
}, Po = Pe.prototype, Mo = function(r) {
  bQ(this, {
    type: Qu,
    done: !1,
    notified: !1,
    parent: !1,
    reactions: new $Q(),
    rejection: !1,
    state: z0,
    value: null
  });
}, Mo.prototype = j0(Po, "then", function(r, e) {
  var n = zc(this), a = Zv(dQ(this, Pe));
  return n.parent = !0, a.ok = fs(r) ? r : !0, a.fail = fs(e) && e, a.domain = Ws ? qd.domain : void 0, n.state === z0 ? n.reactions.add(a) : Gd(function() {
    FI(a, n);
  }), a.promise;
}), V0 = function() {
  var t = new Mo(), r = zc(t);
  this.promise = t, this.resolve = En(Qv, r), this.reject = En(Nn, r);
}, RI.f = Zv = function(t) {
  return t === Pe || t === TQ ? new V0(t) : wQ(t);
}, fs(qs) && dn !== Object.prototype)) {
  H0 = dn.then, mQ || j0(dn, "then", function(r, e) {
    var n = this;
    return new Pe(function(a, i) {
      qn(H0, n, a, i);
    }).then(r, e);
  }, { unsafe: !0 });
  try {
    delete dn.constructor;
  } catch {
  }
  U0 && U0(dn, Po);
}
uQ({ global: !0, constructor: !0, wrap: !0, forced: _I }, {
  Promise: Pe
});
lQ(Pe, Qu, !1);
cQ(Qu);
var AQ = Ui, RQ = Cu, _Q = zi.CONSTRUCTOR, tl = _Q || !RQ(function(t) {
  AQ.all(t).then(void 0, function() {
  });
}), CQ = g, PQ = z, MQ = tt, NQ = Nr, DQ = ga, FQ = $t, LQ = tl;
CQ({ target: "Promise", stat: !0, forced: LQ }, {
  all: function(r) {
    var e = this, n = NQ.f(e), a = n.resolve, i = n.reject, o = DQ(function() {
      var s = MQ(e.resolve), u = [], l = 0, c = 1;
      FQ(r, function(f) {
        var v = l++, h = !1;
        c++, PQ(s, e, f).then(function(d) {
          h || (h = !0, u[v] = d, --c || a(u));
        }, i);
      }), --c || a(u);
    });
    return o.error && i(o.value), n.promise;
  }
});
var kQ = g, BQ = zi.CONSTRUCTOR, th = Ui, jQ = ot, UQ = Z, zQ = ct, W0 = th && th.prototype;
kQ({ target: "Promise", proto: !0, forced: BQ, real: !0 }, {
  catch: function(t) {
    return this.then(void 0, t);
  }
});
if (UQ(th)) {
  var q0 = jQ("Promise").prototype.catch;
  W0.catch !== q0 && zQ(W0, "catch", q0, { unsafe: !0 });
}
var VQ = g, HQ = z, GQ = tt, WQ = Nr, qQ = ga, YQ = $t, KQ = tl;
VQ({ target: "Promise", stat: !0, forced: KQ }, {
  race: function(r) {
    var e = this, n = WQ.f(e), a = n.reject, i = qQ(function() {
      var o = GQ(e.resolve);
      YQ(r, function(s) {
        HQ(o, e, s).then(n.resolve, a);
      });
    });
    return i.error && a(i.value), n.promise;
  }
});
var XQ = g, JQ = Nr, ZQ = zi.CONSTRUCTOR;
XQ({ target: "Promise", stat: !0, forced: ZQ }, {
  reject: function(r) {
    var e = JQ.f(this), n = e.reject;
    return n(r), e.promise;
  }
});
var QQ = j, ttt = Y, rtt = Nr, BI = function(t, r) {
  if (QQ(t), ttt(r) && r.constructor === t)
    return r;
  var e = rtt.f(t), n = e.resolve;
  return n(r), e.promise;
}, ett = g, ntt = ot, att = zi.CONSTRUCTOR, itt = BI;
ntt("Promise");
ett({ target: "Promise", stat: !0, forced: att }, {
  resolve: function(r) {
    return itt(this, r);
  }
});
var ott = g, stt = z, utt = tt, ltt = Nr, ctt = ga, ftt = $t, vtt = tl;
ott({ target: "Promise", stat: !0, forced: vtt }, {
  allSettled: function(r) {
    var e = this, n = ltt.f(e), a = n.resolve, i = n.reject, o = ctt(function() {
      var s = utt(e.resolve), u = [], l = 0, c = 1;
      ftt(r, function(f) {
        var v = l++, h = !1;
        c++, stt(s, e, f).then(function(d) {
          h || (h = !0, u[v] = { status: "fulfilled", value: d }, --c || a(u));
        }, function(d) {
          h || (h = !0, u[v] = { status: "rejected", reason: d }, --c || a(u));
        });
      }), --c || a(u);
    });
    return o.error && i(o.value), n.promise;
  }
});
var htt = g, dtt = z, gtt = tt, ptt = ot, $tt = Nr, ytt = ga, mtt = $t, btt = tl, Y0 = "No one promise resolved";
htt({ target: "Promise", stat: !0, forced: btt }, {
  any: function(r) {
    var e = this, n = ptt("AggregateError"), a = $tt.f(e), i = a.resolve, o = a.reject, s = ytt(function() {
      var u = gtt(e.resolve), l = [], c = 0, f = 1, v = !1;
      mtt(r, function(h) {
        var d = c++, $ = !1;
        f++, dtt(u, e, h).then(function(y) {
          $ || v || (v = !0, i(y));
        }, function(y) {
          $ || v || ($ = !0, l[d] = y, --f || o(new n(l, Y0)));
        });
      }), --f || o(new n(l, Y0));
    });
    return s.error && o(s.value), a.promise;
  }
});
var wtt = g, Ys = Ui, Stt = O, jI = ot, UI = Z, xtt = Ju, K0 = BI, Ett = ct, rh = Ys && Ys.prototype, Ttt = !!Ys && Stt(function() {
  rh.finally.call({ then: function() {
  } }, function() {
  });
});
wtt({ target: "Promise", proto: !0, real: !0, forced: Ttt }, {
  finally: function(t) {
    var r = xtt(this, jI("Promise")), e = UI(t);
    return this.then(
      e ? function(n) {
        return K0(r, t()).then(function() {
          return n;
        });
      } : t,
      e ? function(n) {
        return K0(r, t()).then(function() {
          throw n;
        });
      } : t
    );
  }
});
if (UI(Ys)) {
  var X0 = jI("Promise").prototype.finally;
  rh.finally !== X0 && Ett(rh, "finally", X0, { unsafe: !0 });
}
var Itt = g, Ott = D, Att = er, Rtt = rr, _tt = Nr, Ctt = tt, zI = ga, Vc = Ott.Promise, J0 = !1, Ptt = !Vc || !Vc.try || zI(function() {
  Vc.try(function(t) {
    J0 = t === 8;
  }, 8);
}).error || !J0;
Itt({ target: "Promise", stat: !0, forced: Ptt }, {
  try: function(t) {
    var r = arguments.length > 1 ? Rtt(arguments, 1) : [], e = _tt.f(this), n = zI(function() {
      return Att(Ctt(t), void 0, r);
    });
    return (n.error ? e.reject : e.resolve)(n.value), e.promise;
  }
});
var Mtt = g, Ntt = Nr;
Mtt({ target: "Promise", stat: !0 }, {
  withResolvers: function() {
    var r = Ntt.f(this);
    return {
      promise: r.promise,
      resolve: r.resolve,
      reject: r.reject
    };
  }
});
var Dtt = g, Ftt = er, Ltt = tt, ktt = j, Btt = O, jtt = !Btt(function() {
  Reflect.apply(function() {
  });
});
Dtt({ target: "Reflect", stat: !0, forced: jtt }, {
  apply: function(r, e, n) {
    return Ftt(Ltt(r), e, ktt(n));
  }
});
var Utt = g, ztt = ot, Hc = er, Vtt = ST, Z0 = Vd, Htt = j, Q0 = Y, Gtt = Vt, VI = O, Kd = ztt("Reflect", "construct"), Wtt = Object.prototype, qtt = [].push, HI = VI(function() {
  function t() {
  }
  return !(Kd(function() {
  }, [], t) instanceof t);
}), GI = !VI(function() {
  Kd(function() {
  });
}), t1 = HI || GI;
Utt({ target: "Reflect", stat: !0, forced: t1, sham: t1 }, {
  construct: function(r, e) {
    Z0(r), Htt(e);
    var n = arguments.length < 3 ? r : Z0(arguments[2]);
    if (GI && !HI)
      return Kd(r, e, n);
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
      return Hc(qtt, a, e), new (Hc(Vtt, r, a))();
    }
    var i = n.prototype, o = Gtt(Q0(i) ? i : Wtt), s = Hc(r, o, e);
    return Q0(s) ? s : o;
  }
});
var Ytt = g, Ktt = U, r1 = j, Xtt = $e, WI = lt, Jtt = O, Ztt = Jtt(function() {
  Reflect.defineProperty(WI.f({}, 1, { value: 1 }), 1, { value: 2 });
});
Ytt({ target: "Reflect", stat: !0, forced: Ztt, sham: !Ktt }, {
  defineProperty: function(r, e, n) {
    r1(r);
    var a = Xtt(e);
    r1(n);
    try {
      return WI.f(r, a, n), !0;
    } catch {
      return !1;
    }
  }
});
var Qtt = g, trt = j, rrt = xt.f;
Qtt({ target: "Reflect", stat: !0 }, {
  deleteProperty: function(r, e) {
    var n = rrt(trt(r), e);
    return n && !n.configurable ? !1 : delete r[e];
  }
});
var e1 = Q, qI = function(t) {
  return t !== void 0 && (e1(t, "value") || e1(t, "writable"));
}, ert = g, nrt = z, art = Y, irt = j, ort = qI, srt = xt, urt = Ht;
function YI(t, r) {
  var e = arguments.length < 3 ? t : arguments[2], n, a;
  if (irt(t) === e)
    return t[r];
  if (n = srt.f(t, r), n)
    return ort(n) ? n.value : n.get === void 0 ? void 0 : nrt(n.get, e);
  if (art(a = urt(t)))
    return YI(a, r, e);
}
ert({ target: "Reflect", stat: !0 }, {
  get: YI
});
var lrt = g, crt = U, frt = j, vrt = xt;
lrt({ target: "Reflect", stat: !0, sham: !crt }, {
  getOwnPropertyDescriptor: function(r, e) {
    return vrt.f(frt(r), e);
  }
});
var hrt = g, drt = j, grt = Ht, prt = ed;
hrt({ target: "Reflect", stat: !0, sham: !prt }, {
  getPrototypeOf: function(r) {
    return grt(drt(r));
  }
});
var $rt = g;
$rt({ target: "Reflect", stat: !0 }, {
  has: function(r, e) {
    return e in r;
  }
});
var yrt = g, mrt = j, brt = Nd;
yrt({ target: "Reflect", stat: !0 }, {
  isExtensible: function(r) {
    return mrt(r), brt(r);
  }
});
var wrt = g, Srt = Wh;
wrt({ target: "Reflect", stat: !0 }, {
  ownKeys: Srt
});
var xrt = g, Ert = ot, Trt = j, Irt = ha;
xrt({ target: "Reflect", stat: !0, sham: !Irt }, {
  preventExtensions: function(r) {
    Trt(r);
    try {
      var e = Ert("Object", "preventExtensions");
      return e && e(r), !0;
    } catch {
      return !1;
    }
  }
});
var Ort = g, Art = z, Rrt = j, n1 = Y, _rt = qI, Crt = O, eh = lt, a1 = xt, Prt = Ht, i1 = tr;
function KI(t, r, e) {
  var n = arguments.length < 4 ? t : arguments[3], a = a1.f(Rrt(t), r), i, o, s;
  if (!a) {
    if (n1(o = Prt(t)))
      return KI(o, r, e, n);
    a = i1(0);
  }
  if (_rt(a)) {
    if (a.writable === !1 || !n1(n))
      return !1;
    if (i = a1.f(n, r)) {
      if (i.get || i.set || i.writable === !1)
        return !1;
      i.value = e, eh.f(n, r, i);
    } else
      eh.f(n, r, i1(0, e));
  } else {
    if (s = a.set, s === void 0)
      return !1;
    Art(s, n, e);
  }
  return !0;
}
var Mrt = Crt(function() {
  var t = function() {
  }, r = eh.f(new t(), "a", { configurable: !0 });
  return Reflect.set(t.prototype, "a", 1, r) !== !1;
});
Ort({ target: "Reflect", stat: !0, forced: Mrt }, {
  set: KI
});
var Nrt = g, Drt = j, Frt = eE, o1 = Pr;
o1 && Nrt({ target: "Reflect", stat: !0 }, {
  setPrototypeOf: function(r, e) {
    Drt(r), Frt(e);
    try {
      return o1(r, e), !0;
    } catch {
      return !1;
    }
  }
});
var Lrt = g, krt = D, Brt = Lt;
Lrt({ global: !0 }, { Reflect: {} });
Brt(krt.Reflect, "Reflect", !0);
var jrt = Y, Urt = Et, zrt = K, Vrt = zrt("match"), rl = function(t) {
  var r;
  return jrt(t) && ((r = t[Vrt]) !== void 0 ? !!r : Urt(t) === "RegExp");
}, Hrt = j, Xd = function() {
  var t = Hrt(this), r = "";
  return t.hasIndices && (r += "d"), t.global && (r += "g"), t.ignoreCase && (r += "i"), t.multiline && (r += "m"), t.dotAll && (r += "s"), t.unicode && (r += "u"), t.unicodeSets && (r += "v"), t.sticky && (r += "y"), r;
}, Grt = z, Wrt = Q, qrt = Dt, Yrt = Xd, s1 = RegExp.prototype, Vi = function(t) {
  var r = t.flags;
  return r === void 0 && !("flags" in s1) && !Wrt(t, "flags") && qrt(s1, t) ? Grt(Yrt, t) : r;
}, Jd = O, Krt = D, Zd = Krt.RegExp, Qd = Jd(function() {
  var t = Zd("a", "y");
  return t.lastIndex = 2, t.exec("abcd") !== null;
}), Xrt = Qd || Jd(function() {
  return !Zd("a", "y").sticky;
}), Jrt = Qd || Jd(function() {
  var t = Zd("^r", "gy");
  return t.lastIndex = 2, t.exec("str") !== null;
}), el = {
  BROKEN_CARET: Jrt,
  MISSED_STICKY: Xrt,
  UNSUPPORTED_Y: Qd
}, Zrt = O, Qrt = D, tet = Qrt.RegExp, tg = Zrt(function() {
  var t = tet(".", "s");
  return !(t.dotAll && t.test(`
`) && t.flags === "s");
}), ret = O, eet = D, net = eet.RegExp, XI = ret(function() {
  var t = net("(?<a>b)", "g");
  return t.exec("b").groups.a !== "b" || "b".replace(t, "$<a>c") !== "bc";
}), aet = U, rg = D, Hi = A, iet = Ri, oet = Ye, set = Tt, uet = Vt, cet = ye.f, u1 = Dt, fet = rl, l1 = G, vet = Vi, JI = el, het = nE, det = ct, get = O, pet = Q, $et = ht.enforce, yet = la, met = K, ZI = tg, QI = XI, bet = met("match"), he = rg.RegExp, gn = he.prototype, wet = rg.SyntaxError, xet = Hi(gn.exec), Ks = Hi("".charAt), c1 = Hi("".replace), f1 = Hi("".indexOf), v1 = Hi("".slice), Eet = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/, Le = /a/g, Gc = /a/g, Tet = new he(Le) !== Le, tO = JI.MISSED_STICKY, Iet = JI.UNSUPPORTED_Y, Oet = aet && (!Tet || tO || ZI || QI || get(function() {
  return Gc[bet] = !1, he(Le) !== Le || he(Gc) === Gc || String(he(Le, "i")) !== "/a/i";
})), Aet = function(t) {
  for (var r = t.length, e = 0, n = "", a = !1, i; e <= r; e++) {
    if (i = Ks(t, e), i === "\\") {
      n += i + Ks(t, ++e);
      continue;
    }
    !a && i === "." ? n += "[\\s\\S]" : (i === "[" ? a = !0 : i === "]" && (a = !1), n += i);
  }
  return n;
}, Ret = function(t) {
  for (var r = t.length, e = 0, n = "", a = [], i = uet(null), o = !1, s = !1, u = 0, l = "", c; e <= r; e++) {
    if (c = Ks(t, e), c === "\\")
      c += Ks(t, ++e);
    else if (c === "]")
      o = !1;
    else if (!o)
      switch (!0) {
        case c === "[":
          o = !0;
          break;
        case c === "(":
          if (n += c, v1(t, e + 1, e + 3) === "?:")
            continue;
          xet(Eet, v1(t, e + 1)) && (e += 2, s = !0), u++;
          continue;
        case (c === ">" && s):
          if (l === "" || pet(i, l))
            throw new wet("Invalid capture group name");
          i[l] = !0, a[a.length] = [l, u], s = !1, l = "";
          continue;
      }
    s ? l += c : n += c;
  }
  return [n, a];
};
if (iet("RegExp", Oet)) {
  for (var Oe = function(r, e) {
    var n = u1(gn, this), a = fet(r), i = e === void 0, o = [], s = r, u, l, c, f, v, h;
    if (!n && a && i && r.constructor === Oe)
      return r;
    if ((a || u1(gn, r)) && (r = r.source, i && (e = vet(s))), r = r === void 0 ? "" : l1(r), e = e === void 0 ? "" : l1(e), s = r, ZI && "dotAll" in Le && (l = !!e && f1(e, "s") > -1, l && (e = c1(e, /s/g, ""))), u = e, tO && "sticky" in Le && (c = !!e && f1(e, "y") > -1, c && Iet && (e = c1(e, /y/g, ""))), QI && (f = Ret(r), r = f[0], o = f[1]), v = oet(he(r, e), n ? this : gn, Oe), (l || c || o.length) && (h = $et(v), l && (h.dotAll = !0, h.raw = Oe(Aet(r), u)), c && (h.sticky = !0), o.length && (h.groups = o)), r !== s)
      try {
        set(v, "source", s === "" ? "(?:)" : s);
      } catch {
      }
    return v;
  }, h1 = cet(he), d1 = 0; h1.length > d1; )
    het(Oe, he, h1[d1++]);
  gn.constructor = Oe, Oe.prototype = gn, det(rg, "RegExp", Oe, { constructor: !0 });
}
yet("RegExp");
var _et = TypeError, Cet = function(t) {
  if (typeof t == "string")
    return t;
  throw new _et("Argument is not a string");
}, Pet = g, Gi = A, Met = Cet, Net = Q, g1 = Vu.start, Det = ji, Fet = Array, p1 = RegExp.escape, $1 = Gi("".charAt), nh = Gi("".charCodeAt), Let = Gi(1.1.toString), ket = Gi([].join), rO = /^[0-9a-z]/i, Bet = /^[$()*+./?[\\\]^{|}]/, jet = RegExp("^[!\"#%&',\\-:;<=>@`~" + Det + "]"), Wc = Gi(rO.exec), y1 = {
  "	": "t",
  "\n": "n",
  "\v": "v",
  "\f": "f",
  "\r": "r"
}, qc = function(t) {
  var r = Let(nh(t, 0), 16);
  return r.length < 3 ? "\\x" + g1(r, 2, "0") : "\\u" + g1(r, 4, "0");
}, Uet = !p1 || p1("ab") !== "\\x61b";
Pet({ target: "RegExp", stat: !0, forced: Uet }, {
  escape: function(r) {
    Met(r);
    for (var e = r.length, n = Fet(e), a = 0; a < e; a++) {
      var i = $1(r, a);
      if (a === 0 && Wc(rO, i))
        n[a] = qc(i);
      else if (Net(y1, i))
        n[a] = "\\" + y1[i];
      else if (Wc(Bet, i))
        n[a] = "\\" + i;
      else if (Wc(jet, i))
        n[a] = qc(i);
      else {
        var o = nh(i, 0);
        (o & 63488) !== 55296 ? n[a] = i : o >= 56320 || a + 1 >= e || (nh(r, a + 1) & 64512) !== 56320 ? n[a] = qc(i) : (n[a] = i, n[++a] = $1(r, a));
      }
    }
    return ket(n, "");
  }
});
var zet = U, Vet = tg, Het = Et, Get = dt, Wet = ht.get, m1 = RegExp.prototype, qet = TypeError;
zet && Vet && Get(m1, "dotAll", {
  configurable: !0,
  get: function() {
    if (this !== m1) {
      if (Het(this) === "RegExp")
        return !!Wet(this).dotAll;
      throw new qet("Incompatible receiver, RegExp required");
    }
  }
});
var Tn = z, nl = A, Yet = G, Ket = Xd, Xet = el, Jet = ra, Zet = Vt, Qet = ht.get, tnt = tg, rnt = XI, ent = Jet("native-string-replace", String.prototype.replace), Xs = RegExp.prototype.exec, ah = Xs, nnt = nl("".charAt), ant = nl("".indexOf), int = nl("".replace), Yc = nl("".slice), ih = function() {
  var t = /a/, r = /b*/g;
  return Tn(Xs, t, "a"), Tn(Xs, r, "a"), t.lastIndex !== 0 || r.lastIndex !== 0;
}(), eO = Xet.BROKEN_CARET, oh = /()??/.exec("")[1] !== void 0, ont = ih || oh || eO || tnt || rnt;
ont && (ah = function(r) {
  var e = this, n = Qet(e), a = Yet(r), i = n.raw, o, s, u, l, c, f, v;
  if (i)
    return i.lastIndex = e.lastIndex, o = Tn(ah, i, a), e.lastIndex = i.lastIndex, o;
  var h = n.groups, d = eO && e.sticky, $ = Tn(Ket, e), y = e.source, p = 0, w = a;
  if (d && ($ = int($, "y", ""), ant($, "g") === -1 && ($ += "g"), w = Yc(a, e.lastIndex), e.lastIndex > 0 && (!e.multiline || e.multiline && nnt(a, e.lastIndex - 1) !== `
`) && (y = "(?: " + y + ")", w = " " + w, p++), s = new RegExp("^(?:" + y + ")", $)), oh && (s = new RegExp("^" + y + "$(?!\\s)", $)), ih && (u = e.lastIndex), l = Tn(Xs, d ? s : e, w), d ? l ? (l.input = Yc(l.input, p), l[0] = Yc(l[0], p), l.index = e.lastIndex, e.lastIndex += l[0].length) : e.lastIndex = 0 : ih && l && (e.lastIndex = e.global ? l.index + l[0].length : u), oh && l && l.length > 1 && Tn(ent, l[0], s, function() {
    for (c = 1; c < arguments.length - 2; c++)
      arguments[c] === void 0 && (l[c] = void 0);
  }), l && h)
    for (l.groups = f = Zet(null), c = 0; c < h.length; c++)
      v = h[c], f[v[0]] = l[v[1]];
  return l;
});
var eg = ah, snt = g, b1 = eg;
snt({ target: "RegExp", proto: !0, forced: /./.exec !== b1 }, {
  exec: b1
});
var unt = D, lnt = U, cnt = dt, fnt = Xd, vnt = O, nO = unt.RegExp, aO = nO.prototype, hnt = lnt && vnt(function() {
  var t = !0;
  try {
    nO(".", "d");
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
  var s = Object.getOwnPropertyDescriptor(aO, "flags").get.call(r);
  return s !== n || e !== n;
});
hnt && cnt(aO, "flags", {
  configurable: !0,
  get: fnt
});
var dnt = U, gnt = el.MISSED_STICKY, pnt = Et, $nt = dt, ynt = ht.get, w1 = RegExp.prototype, mnt = TypeError;
dnt && gnt && $nt(w1, "sticky", {
  configurable: !0,
  get: function() {
    if (this !== w1) {
      if (pnt(this) === "RegExp")
        return !!ynt(this).sticky;
      throw new mnt("Incompatible receiver, RegExp required");
    }
  }
});
var bnt = g, S1 = z, wnt = Z, x1 = j, Snt = G, xnt = function() {
  var t = !1, r = /[ac]/;
  return r.exec = function() {
    return t = !0, /./.exec.apply(this, arguments);
  }, r.test("abc") === !0 && t;
}(), Ent = /./.test;
bnt({ target: "RegExp", proto: !0, forced: !xnt }, {
  test: function(t) {
    var r = x1(this), e = Snt(t), n = r.exec;
    if (!wnt(n))
      return S1(Ent, r, e);
    var a = S1(n, r, e);
    return a === null ? !1 : (x1(a), !0);
  }
});
var Tnt = na.PROPER, Int = ct, Ont = j, E1 = G, Ant = O, Rnt = Vi, ng = "toString", iO = RegExp.prototype, oO = iO[ng], _nt = Ant(function() {
  return oO.call({ source: "a", flags: "b" }) !== "/a/b";
}), Cnt = Tnt && oO.name !== ng;
(_nt || Cnt) && Int(iO, ng, function() {
  var r = Ont(this), e = E1(r.source), n = E1(Rnt(r));
  return "/" + e + "/" + n;
}, { unsafe: !0 });
var Pnt = Hu, Mnt = VT;
Pnt("Set", function(t) {
  return function() {
    return t(this, arguments.length ? arguments[0] : void 0);
  };
}, Mnt);
var Kc = A, No = Set.prototype, yr = {
  // eslint-disable-next-line es/no-set -- safe
  Set,
  add: Kc(No.add),
  has: Kc(No.has),
  remove: Kc(No.delete),
  proto: No
}, Nnt = yr.has, Ze = function(t) {
  return Nnt(t), t;
}, Dnt = z, Qe = function(t, r, e) {
  for (var n = e ? t : t.iterator, a = t.next, i, o; !(i = Dnt(a, n)).done; )
    if (o = r(i.value), o !== void 0)
      return o;
}, sO = A, Fnt = Qe, uO = yr, Lnt = uO.Set, lO = uO.proto, knt = sO(lO.forEach), cO = sO(lO.keys), Bnt = cO(new Lnt()).next, pa = function(t, r, e) {
  return e ? Fnt({ iterator: cO(t), next: Bnt }, r) : knt(t, r);
}, fO = yr, jnt = pa, Unt = fO.Set, znt = fO.add, ag = function(t) {
  var r = new Unt();
  return jnt(t, function(e) {
    znt(r, e);
  }), r;
}, Vnt = Ou, Hnt = yr, Wi = Vnt(Hnt.proto, "size", "get") || function(t) {
  return t.size;
}, T1 = tt, vO = j, I1 = z, Gnt = ft, Wnt = Gt, O1 = "Invalid size", qnt = RangeError, Ynt = TypeError, Knt = Math.max, hO = function(t, r) {
  this.set = t, this.size = Knt(r, 0), this.has = T1(t.has), this.keys = T1(t.keys);
};
hO.prototype = {
  getIterator: function() {
    return Wnt(vO(I1(this.keys, this.set)));
  },
  includes: function(t) {
    return I1(this.has, this.set, t);
  }
};
var tn = function(t) {
  vO(t);
  var r = +t.size;
  if (r !== r)
    throw new Ynt(O1);
  var e = Gnt(r);
  if (e < 0)
    throw new qnt(O1);
  return new hO(t, e);
}, Xnt = Ze, dO = yr, Jnt = ag, Znt = Wi, Qnt = tn, tat = pa, rat = Qe, eat = dO.has, A1 = dO.remove, nat = function(r) {
  var e = Xnt(this), n = Qnt(r), a = Jnt(e);
  return Znt(e) <= n.size ? tat(e, function(i) {
    n.includes(i) && A1(a, i);
  }) : rat(n.getIterator(), function(i) {
    eat(e, i) && A1(a, i);
  }), a;
}, aat = ot, R1 = function(t) {
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
}, _1 = function(t) {
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
  var e = aat("Set");
  try {
    new e()[t](R1(0));
    try {
      return new e()[t](R1(-1)), !1;
    } catch {
      if (!r)
        return !0;
      try {
        return new e()[t](_1(-1 / 0)), !1;
      } catch {
        var n = new e();
        return n.add(1), n.add(2), r(n[t](_1(1 / 0)));
      }
    }
  } catch {
    return !1;
  }
}, iat = g, oat = nat, sat = rn, uat = !sat("difference", function(t) {
  return t.size === 0;
});
iat({ target: "Set", proto: !0, real: !0, forced: uat }, {
  difference: oat
});
var lat = Ze, ig = yr, cat = Wi, fat = tn, vat = pa, hat = Qe, dat = ig.Set, C1 = ig.add, gat = ig.has, pat = function(r) {
  var e = lat(this), n = fat(r), a = new dat();
  return cat(e) > n.size ? hat(n.getIterator(), function(i) {
    gat(e, i) && C1(a, i);
  }) : vat(e, function(i) {
    n.includes(i) && C1(a, i);
  }), a;
}, $at = g, yat = O, mat = pat, bat = rn, wat = !bat("intersection", function(t) {
  return t.size === 2 && t.has(1) && t.has(2);
}) || yat(function() {
  return String(Array.from((/* @__PURE__ */ new Set([1, 2, 3])).intersection(/* @__PURE__ */ new Set([3, 2])))) !== "3,2";
});
$at({ target: "Set", proto: !0, real: !0, forced: wat }, {
  intersection: mat
});
var Sat = Ze, xat = yr.has, Eat = Wi, Tat = tn, Iat = pa, Oat = Qe, Aat = Xe, Rat = function(r) {
  var e = Sat(this), n = Tat(r);
  if (Eat(e) <= n.size)
    return Iat(e, function(i) {
      if (n.includes(i))
        return !1;
    }, !0) !== !1;
  var a = n.getIterator();
  return Oat(a, function(i) {
    if (xat(e, i))
      return Aat(a, "normal", !1);
  }) !== !1;
}, _at = g, Cat = Rat, Pat = rn, Mat = !Pat("isDisjointFrom", function(t) {
  return !t;
});
_at({ target: "Set", proto: !0, real: !0, forced: Mat }, {
  isDisjointFrom: Cat
});
var Nat = Ze, Dat = Wi, Fat = pa, Lat = tn, kat = function(r) {
  var e = Nat(this), n = Lat(r);
  return Dat(e) > n.size ? !1 : Fat(e, function(a) {
    if (!n.includes(a))
      return !1;
  }, !0) !== !1;
}, Bat = g, jat = kat, Uat = rn, zat = !Uat("isSubsetOf", function(t) {
  return t;
});
Bat({ target: "Set", proto: !0, real: !0, forced: zat }, {
  isSubsetOf: jat
});
var Vat = Ze, Hat = yr.has, Gat = Wi, Wat = tn, qat = Qe, Yat = Xe, Kat = function(r) {
  var e = Vat(this), n = Wat(r);
  if (Gat(e) < n.size)
    return !1;
  var a = n.getIterator();
  return qat(a, function(i) {
    if (!Hat(e, i))
      return Yat(a, "normal", !1);
  }) !== !1;
}, Xat = g, Jat = Kat, Zat = rn, Qat = !Zat("isSupersetOf", function(t) {
  return !t;
});
Xat({ target: "Set", proto: !0, real: !0, forced: Qat }, {
  isSupersetOf: Jat
});
var tit = Ze, og = yr, rit = ag, eit = tn, nit = Qe, ait = og.add, iit = og.has, oit = og.remove, sit = function(r) {
  var e = tit(this), n = eit(r).getIterator(), a = rit(e);
  return nit(n, function(i) {
    iit(e, i) ? oit(a, i) : ait(a, i);
  }), a;
}, uit = g, lit = sit, cit = rn;
uit({ target: "Set", proto: !0, real: !0, forced: !cit("symmetricDifference") }, {
  symmetricDifference: lit
});
var fit = Ze, vit = yr.add, hit = ag, dit = tn, git = Qe, pit = function(r) {
  var e = fit(this), n = dit(r).getIterator(), a = hit(e);
  return git(n, function(i) {
    vit(a, i);
  }), a;
}, $it = g, yit = pit, mit = rn;
$it({ target: "Set", proto: !0, real: !0, forced: !mit("union") }, {
  union: yit
});
var bit = g, wit = A, Sit = ut, xit = ft, Eit = G, Tit = O, Iit = wit("".charAt), Oit = Tit(function() {
  return "𠮷".at(-2) !== "\uD842";
});
bit({ target: "String", proto: !0, forced: Oit }, {
  at: function(r) {
    var e = Eit(Sit(this)), n = e.length, a = xit(r), i = a >= 0 ? a : n + a;
    return i < 0 || i >= n ? void 0 : Iit(e, i);
  }
});
var sg = A, Ait = ft, Rit = G, _it = ut, Cit = sg("".charAt), P1 = sg("".charCodeAt), Pit = sg("".slice), M1 = function(t) {
  return function(r, e) {
    var n = Rit(_it(r)), a = Ait(e), i = n.length, o, s;
    return a < 0 || a >= i ? t ? "" : void 0 : (o = P1(n, a), o < 55296 || o > 56319 || a + 1 === i || (s = P1(n, a + 1)) < 56320 || s > 57343 ? t ? Cit(n, a) : o : t ? Pit(n, a, a + 2) : (o - 55296 << 10) + (s - 56320) + 65536);
  };
}, al = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: M1(!1),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: M1(!0)
}, Mit = g, Nit = al.codeAt;
Mit({ target: "String", proto: !0 }, {
  codePointAt: function(r) {
    return Nit(this, r);
  }
});
var Dit = rl, Fit = TypeError, ug = function(t) {
  if (Dit(t))
    throw new Fit("The method doesn't accept regular expressions");
  return t;
}, Lit = K, kit = Lit("match"), lg = function(t) {
  var r = /./;
  try {
    "/./"[t](r);
  } catch {
    try {
      return r[kit] = !1, "/./"[t](r);
    } catch {
    }
  }
  return !1;
}, Bit = g, jit = qe, Uit = xt.f, zit = zt, N1 = G, Vit = ug, Hit = ut, Git = lg, Wit = jit("".slice), qit = Math.min, gO = Git("endsWith"), Yit = !gO && !!function() {
  var t = Uit(String.prototype, "endsWith");
  return t && !t.writable;
}();
Bit({ target: "String", proto: !0, forced: !Yit && !gO }, {
  endsWith: function(r) {
    var e = N1(Hit(this));
    Vit(r);
    var n = arguments.length > 1 ? arguments[1] : void 0, a = e.length, i = n === void 0 ? a : qit(zit(n), a), o = N1(r);
    return Wit(e, i - o.length, i) === o;
  }
});
var Kit = g, Xit = A, Jit = Jr, Zit = RangeError, D1 = String.fromCharCode, F1 = String.fromCodePoint, Qit = Xit([].join), tot = !!F1 && F1.length !== 1;
Kit({ target: "String", stat: !0, arity: 1, forced: tot }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  fromCodePoint: function(r) {
    for (var e = [], n = arguments.length, a = 0, i; n > a; ) {
      if (i = +arguments[a++], Jit(i, 1114111) !== i)
        throw new Zit(i + " is not a valid code point");
      e[a] = i < 65536 ? D1(i) : D1(((i -= 65536) >> 10) + 55296, i % 1024 + 56320);
    }
    return Qit(e, "");
  }
});
var rot = g, eot = A, not = ug, aot = ut, L1 = G, iot = lg, oot = eot("".indexOf);
rot({ target: "String", proto: !0, forced: !iot("includes") }, {
  includes: function(r) {
    return !!~oot(
      L1(aot(this)),
      L1(not(r)),
      arguments.length > 1 ? arguments[1] : void 0
    );
  }
});
var sot = g, uot = A, lot = ut, cot = G, k1 = uot("".charCodeAt);
sot({ target: "String", proto: !0 }, {
  isWellFormed: function() {
    for (var r = cot(lot(this)), e = r.length, n = 0; n < e; n++) {
      var a = k1(r, n);
      if ((a & 63488) === 55296 && (a >= 56320 || ++n >= e || (k1(r, n) & 64512) !== 56320))
        return !1;
    }
    return !0;
  }
});
var fot = al.charAt, vot = G, pO = ht, hot = ud, B1 = sa, $O = "String Iterator", dot = pO.set, got = pO.getterFor($O);
hot(String, "String", function(t) {
  dot(this, {
    type: $O,
    string: vot(t),
    index: 0
  });
}, function() {
  var r = got(this), e = r.string, n = r.index, a;
  return n >= e.length ? B1(void 0, !0) : (a = fot(e, n), r.index += a.length, B1(a, !1));
});
var j1 = z, U1 = ct, pot = eg, z1 = O, yO = K, $ot = Tt, yot = yO("species"), Xc = RegExp.prototype, il = function(t, r, e, n) {
  var a = yO(t), i = !z1(function() {
    var l = {};
    return l[a] = function() {
      return 7;
    }, ""[t](l) !== 7;
  }), o = i && !z1(function() {
    var l = !1, c = /a/;
    return t === "split" && (c = {}, c.constructor = {}, c.constructor[yot] = function() {
      return c;
    }, c.flags = "", c[a] = /./[a]), c.exec = function() {
      return l = !0, null;
    }, c[a](""), !l;
  });
  if (!i || !o || e) {
    var s = /./[a], u = r(a, ""[t], function(l, c, f, v, h) {
      var d = c.exec;
      return d === pot || d === Xc.exec ? i && !h ? { done: !0, value: j1(s, c, f, v) } : { done: !0, value: j1(l, f, c, v) } : { done: !1 };
    });
    U1(String.prototype, t, u[0]), U1(Xc, a, u[1]);
  }
  n && $ot(Xc[a], "sham", !0);
}, mot = al.charAt, ol = function(t, r, e) {
  return r + (e ? mot(t, r).length : 1);
}, V1 = z, bot = j, wot = Z, Sot = Et, xot = eg, Eot = TypeError, qi = function(t, r) {
  var e = t.exec;
  if (wot(e)) {
    var n = V1(e, t, r);
    return n !== null && bot(n), n;
  }
  if (Sot(t) === "RegExp")
    return V1(xot, t, r);
  throw new Eot("RegExp#exec called on incompatible receiver");
}, Tot = z, Iot = il, Oot = j, Aot = Nt, Rot = zt, Jc = G, _ot = ut, Cot = Cr, Pot = ol, H1 = qi;
Iot("match", function(t, r, e) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function(a) {
      var i = _ot(this), o = Aot(a) ? void 0 : Cot(a, t);
      return o ? Tot(o, a, i) : new RegExp(a)[t](Jc(i));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function(n) {
      var a = Oot(this), i = Jc(n), o = e(r, a, i);
      if (o.done)
        return o.value;
      if (!a.global)
        return H1(a, i);
      var s = a.unicode;
      a.lastIndex = 0;
      for (var u = [], l = 0, c; (c = H1(a, i)) !== null; ) {
        var f = Jc(c[0]);
        u[l] = f, f === "" && (a.lastIndex = Pot(i, Rot(a.lastIndex), s)), l++;
      }
      return l === 0 ? null : u;
    }
  ];
});
var Mot = g, Not = z, mO = qe, Dot = sd, Do = sa, G1 = ut, bO = zt, hi = G, Fot = j, Lot = Nt, kot = Et, Bot = rl, wO = Vi, jot = Cr, Uot = ct, zot = O, Vot = K, Hot = Ju, Got = ol, Wot = qi, SO = ht, qot = Xr, Js = Vot("matchAll"), xO = "RegExp String", EO = xO + " Iterator", Yot = SO.set, Kot = SO.getterFor(EO), W1 = RegExp.prototype, Xot = TypeError, sh = mO("".indexOf), Zs = mO("".matchAll), Zc = !!Zs && !zot(function() {
  Zs("a", /./);
}), Jot = Dot(function(r, e, n, a) {
  Yot(this, {
    type: EO,
    regexp: r,
    string: e,
    global: n,
    unicode: a,
    done: !1
  });
}, xO, function() {
  var r = Kot(this);
  if (r.done)
    return Do(void 0, !0);
  var e = r.regexp, n = r.string, a = Wot(e, n);
  return a === null ? (r.done = !0, Do(void 0, !0)) : r.global ? (hi(a[0]) === "" && (e.lastIndex = Got(n, bO(e.lastIndex), r.unicode)), Do(a, !1)) : (r.done = !0, Do(a, !1));
}), TO = function(t) {
  var r = Fot(this), e = hi(t), n = Hot(r, RegExp), a = hi(wO(r)), i, o, s;
  return i = new n(n === RegExp ? r.source : r, a), o = !!~sh(a, "g"), s = !!~sh(a, "u"), i.lastIndex = bO(r.lastIndex), new Jot(i, e, o, s);
};
Mot({ target: "String", proto: !0, forced: Zc }, {
  matchAll: function(r) {
    var e = G1(this), n, a, i, o;
    if (Lot(r)) {
      if (Zc)
        return Zs(e, r);
    } else {
      if (Bot(r) && (n = hi(G1(wO(r))), !~sh(n, "g")))
        throw new Xot("`.matchAll` does not allow non-global regexes");
      if (Zc)
        return Zs(e, r);
      if (i = jot(r, Js), i === void 0 && qot && kot(r) === "RegExp" && (i = TO), i)
        return Not(i, r, e);
    }
    return a = hi(e), o = new RegExp(r, "g"), o[Js](a);
  }
});
Js in W1 || Uot(W1, Js, TO);
var Zot = _r, IO = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(Zot), Qot = g, tst = Vu.end, rst = IO;
Qot({ target: "String", proto: !0, forced: rst }, {
  padEnd: function(r) {
    return tst(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var est = g, nst = Vu.start, ast = IO;
est({ target: "String", proto: !0, forced: ast }, {
  padStart: function(r) {
    return nst(this, r, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var ist = g, OO = A, ost = pt, sst = et, q1 = G, ust = st, Y1 = OO([].push), lst = OO([].join);
ist({ target: "String", stat: !0 }, {
  raw: function(r) {
    var e = ost(sst(r).raw), n = ust(e);
    if (!n)
      return "";
    for (var a = arguments.length, i = [], o = 0; ; ) {
      if (Y1(i, q1(e[o++])), o === n)
        return lst(i, "");
      o < a && Y1(i, q1(arguments[o]));
    }
  }
});
var cst = g, fst = zu;
cst({ target: "String", proto: !0 }, {
  repeat: fst
});
var cg = A, vst = et, hst = Math.floor, Qc = cg("".charAt), dst = cg("".replace), tf = cg("".slice), gst = /\$([$&'`]|\d{1,2}|<[^>]*>)/g, pst = /\$([$&'`]|\d{1,2})/g, AO = function(t, r, e, n, a, i) {
  var o = e + t.length, s = n.length, u = pst;
  return a !== void 0 && (a = vst(a), u = gst), dst(i, u, function(l, c) {
    var f;
    switch (Qc(c, 0)) {
      case "$":
        return "$";
      case "&":
        return t;
      case "`":
        return tf(r, 0, e);
      case "'":
        return tf(r, o);
      case "<":
        f = a[tf(c, 1, -1)];
        break;
      default:
        var v = +c;
        if (v === 0)
          return l;
        if (v > s) {
          var h = hst(v / 10);
          return h === 0 ? l : h <= s ? n[h - 1] === void 0 ? Qc(c, 1) : n[h - 1] + Qc(c, 1) : l;
        }
        f = n[v - 1];
    }
    return f === void 0 ? "" : f;
  });
}, $st = er, K1 = z, sl = A, yst = il, mst = O, bst = j, wst = Z, Sst = Nt, xst = ft, Est = zt, ln = G, Tst = ut, Ist = ol, Ost = Cr, Ast = AO, Rst = qi, _st = K, uh = _st("replace"), Cst = Math.max, Pst = Math.min, Mst = sl([].concat), rf = sl([].push), X1 = sl("".indexOf), J1 = sl("".slice), Nst = function(t) {
  return t === void 0 ? t : String(t);
}, Dst = function() {
  return "a".replace(/./, "$0") === "$0";
}(), Z1 = function() {
  return /./[uh] ? /./[uh]("a", "$0") === "" : !1;
}(), Fst = !mst(function() {
  var t = /./;
  return t.exec = function() {
    var r = [];
    return r.groups = { a: "7" }, r;
  }, "".replace(t, "$<a>") !== "7";
});
yst("replace", function(t, r, e) {
  var n = Z1 ? "$" : "$0";
  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function(i, o) {
      var s = Tst(this), u = Sst(i) ? void 0 : Ost(i, uh);
      return u ? K1(u, i, s, o) : K1(r, ln(s), i, o);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function(a, i) {
      var o = bst(this), s = ln(a);
      if (typeof i == "string" && X1(i, n) === -1 && X1(i, "$<") === -1) {
        var u = e(r, o, s, i);
        if (u.done)
          return u.value;
      }
      var l = wst(i);
      l || (i = ln(i));
      var c = o.global, f;
      c && (f = o.unicode, o.lastIndex = 0);
      for (var v = [], h; h = Rst(o, s), !(h === null || (rf(v, h), !c)); ) {
        var d = ln(h[0]);
        d === "" && (o.lastIndex = Ist(s, Est(o.lastIndex), f));
      }
      for (var $ = "", y = 0, p = 0; p < v.length; p++) {
        h = v[p];
        for (var w = ln(h[0]), T = Cst(Pst(xst(h.index), s.length), 0), R = [], M, L = 1; L < h.length; L++)
          rf(R, Nst(h[L]));
        var V = h.groups;
        if (l) {
          var W = Mst([w], R, T, s);
          V !== void 0 && rf(W, V), M = ln($st(i, void 0, W));
        } else
          M = Ast(w, s, T, R, V, i);
        T >= y && ($ += J1(s, y, T) + M, y = T + w.length);
      }
      return $ + J1(s, y);
    }
  ];
}, !Fst || !Dst || Z1);
var Lst = g, kst = z, fg = A, Q1 = ut, Bst = Z, jst = Nt, Ust = rl, Pa = G, zst = Cr, Vst = Vi, Hst = AO, Gst = K, Wst = Gst("replace"), qst = TypeError, ef = fg("".indexOf);
fg("".replace);
var tb = fg("".slice), Yst = Math.max;
Lst({ target: "String", proto: !0 }, {
  replaceAll: function(r, e) {
    var n = Q1(this), a, i, o, s, u, l, c, f, v, h, d = 0, $ = "";
    if (!jst(r)) {
      if (a = Ust(r), a && (i = Pa(Q1(Vst(r))), !~ef(i, "g")))
        throw new qst("`.replaceAll` does not allow non-global regexes");
      if (o = zst(r, Wst), o)
        return kst(o, r, n, e);
    }
    for (s = Pa(n), u = Pa(r), l = Bst(e), l || (e = Pa(e)), c = u.length, f = Yst(1, c), v = ef(s, u); v !== -1; )
      h = l ? Pa(e(u, v, s)) : Hst(u, s, v, [], void 0, e), $ += tb(s, d, v) + h, d = v + c, v = v + f > s.length ? -1 : ef(s, u, v + f);
    return d < s.length && ($ += tb(s, d)), $;
  }
});
var Kst = z, Xst = il, Jst = j, Zst = Nt, Qst = ut, rb = pI, eb = G, tut = Cr, rut = qi;
Xst("search", function(t, r, e) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function(a) {
      var i = Qst(this), o = Zst(a) ? void 0 : tut(a, t);
      return o ? Kst(o, a, i) : new RegExp(a)[t](eb(i));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function(n) {
      var a = Jst(this), i = eb(n), o = e(r, a, i);
      if (o.done)
        return o.value;
      var s = a.lastIndex;
      rb(s, 0) || (a.lastIndex = 0);
      var u = rut(a, i);
      return rb(a.lastIndex, s) || (a.lastIndex = s), u === null ? -1 : u.index;
    }
  ];
});
var nf = z, RO = A, eut = il, nut = j, aut = Nt, iut = ut, out = Ju, sut = ol, uut = zt, nb = G, lut = Cr, ab = qi, cut = el, fut = O, cn = cut.UNSUPPORTED_Y, vut = 4294967295, hut = Math.min, af = RO([].push), of = RO("".slice), dut = !fut(function() {
  var t = /(?:)/, r = t.exec;
  t.exec = function() {
    return r.apply(this, arguments);
  };
  var e = "ab".split(t);
  return e.length !== 2 || e[0] !== "a" || e[1] !== "b";
}), ib = "abbc".split(/(b)*/)[1] === "c" || // eslint-disable-next-line regexp/no-empty-group -- required for testing
"test".split(/(?:)/, -1).length !== 4 || "ab".split(/(?:ab)*/).length !== 2 || ".".split(/(.?)(.?)/).length !== 4 || // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
".".split(/()()/).length > 1 || "".split(/.?/).length;
eut("split", function(t, r, e) {
  var n = "0".split(void 0, 0).length ? function(a, i) {
    return a === void 0 && i === 0 ? [] : nf(r, this, a, i);
  } : r;
  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function(i, o) {
      var s = iut(this), u = aut(i) ? void 0 : lut(i, t);
      return u ? nf(u, i, s, o) : nf(n, nb(s), i, o);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function(a, i) {
      var o = nut(this), s = nb(a);
      if (!ib) {
        var u = e(n, o, s, i, n !== r);
        if (u.done)
          return u.value;
      }
      var l = out(o, RegExp), c = o.unicode, f = (o.ignoreCase ? "i" : "") + (o.multiline ? "m" : "") + (o.unicode ? "u" : "") + (cn ? "g" : "y"), v = new l(cn ? "^(?:" + o.source + ")" : o, f), h = i === void 0 ? vut : i >>> 0;
      if (h === 0)
        return [];
      if (s.length === 0)
        return ab(v, s) === null ? [s] : [];
      for (var d = 0, $ = 0, y = []; $ < s.length; ) {
        v.lastIndex = cn ? 0 : $;
        var p = ab(v, cn ? of(s, $) : s), w;
        if (p === null || (w = hut(uut(v.lastIndex + (cn ? $ : 0)), s.length)) === d)
          $ = sut(s, $, c);
        else {
          if (af(y, of(s, d, $)), y.length === h)
            return y;
          for (var T = 1; T <= p.length - 1; T++)
            if (af(y, p[T]), y.length === h)
              return y;
          $ = d = w;
        }
      }
      return af(y, of(s, d)), y;
    }
  ];
}, ib || !dut, cn);
var gut = g, put = qe, $ut = xt.f, yut = zt, ob = G, mut = ug, but = ut, wut = lg, Sut = put("".slice), xut = Math.min, _O = wut("startsWith"), Eut = !_O && !!function() {
  var t = $ut(String.prototype, "startsWith");
  return t && !t.writable;
}();
gut({ target: "String", proto: !0, forced: !Eut && !_O }, {
  startsWith: function(r) {
    var e = ob(but(this));
    mut(r);
    var n = yut(xut(arguments.length > 1 ? arguments[1] : void 0, e.length)), a = ob(r);
    return Sut(e, n, n + a.length) === a;
  }
});
var Tut = g, Iut = A, Out = ut, sb = ft, Aut = G, Rut = Iut("".slice), _ut = Math.max, Cut = Math.min, Put = !"".substr || "ab".substr(-1) !== "b";
Tut({ target: "String", proto: !0, forced: Put }, {
  substr: function(r, e) {
    var n = Aut(Out(this)), a = n.length, i = sb(r), o, s;
    return i === 1 / 0 && (i = 0), i < 0 && (i = _ut(a + i, 0)), o = e === void 0 ? a : sb(e), o <= 0 || o === 1 / 0 ? "" : (s = Cut(i + o, a), i >= s ? "" : Rut(n, i, s));
  }
});
var Mut = g, CO = z, vg = A, Nut = ut, Dut = G, Fut = O, Lut = Array, sf = vg("".charAt), ub = vg("".charCodeAt), kut = vg([].join), lh = "".toWellFormed, But = "�", lb = lh && Fut(function() {
  return CO(lh, 1) !== "1";
});
Mut({ target: "String", proto: !0, forced: lb }, {
  toWellFormed: function() {
    var r = Dut(Nut(this));
    if (lb)
      return CO(lh, r);
    for (var e = r.length, n = Lut(e), a = 0; a < e; a++) {
      var i = ub(r, a);
      (i & 63488) !== 55296 ? n[a] = sf(r, a) : i >= 56320 || a + 1 >= e || (ub(r, a + 1) & 64512) !== 56320 ? n[a] = But : (n[a] = sf(r, a), n[++a] = sf(r, a));
    }
    return kut(n, "");
  }
});
var jut = na.PROPER, Uut = O, cb = ji, fb = "​᠎", hg = function(t) {
  return Uut(function() {
    return !!cb[t]() || fb[t]() !== fb || jut && cb[t].name !== t;
  });
}, zut = g, Vut = da.trim, Hut = hg;
zut({ target: "String", proto: !0, forced: Hut("trim") }, {
  trim: function() {
    return Vut(this);
  }
});
var Gut = da.end, Wut = hg, PO = Wut("trimEnd") ? function() {
  return Gut(this);
} : "".trimEnd, qut = g, vb = PO;
qut({ target: "String", proto: !0, name: "trimEnd", forced: "".trimRight !== vb }, {
  trimRight: vb
});
var Yut = g, hb = PO;
Yut({ target: "String", proto: !0, name: "trimEnd", forced: "".trimEnd !== hb }, {
  trimEnd: hb
});
var Kut = da.start, Xut = hg, MO = Xut("trimStart") ? function() {
  return Kut(this);
} : "".trimStart, Jut = g, db = MO;
Jut({ target: "String", proto: !0, name: "trimStart", forced: "".trimLeft !== db }, {
  trimLeft: db
});
var Zut = g, gb = MO;
Zut({ target: "String", proto: !0, name: "trimStart", forced: "".trimStart !== gb }, {
  trimStart: gb
});
var Qut = A, tlt = ut, pb = G, rlt = /"/g, elt = Qut("".replace), Wt = function(t, r, e, n) {
  var a = pb(tlt(t)), i = "<" + r;
  return e !== "" && (i += " " + e + '="' + elt(pb(n), rlt, "&quot;") + '"'), i + ">" + a + "</" + r + ">";
}, nlt = O, qt = function(t) {
  return nlt(function() {
    var r = ""[t]('"');
    return r !== r.toLowerCase() || r.split('"').length > 3;
  });
}, alt = g, ilt = Wt, olt = qt;
alt({ target: "String", proto: !0, forced: olt("anchor") }, {
  anchor: function(r) {
    return ilt(this, "a", "name", r);
  }
});
var slt = g, ult = Wt, llt = qt;
slt({ target: "String", proto: !0, forced: llt("big") }, {
  big: function() {
    return ult(this, "big", "", "");
  }
});
var clt = g, flt = Wt, vlt = qt;
clt({ target: "String", proto: !0, forced: vlt("blink") }, {
  blink: function() {
    return flt(this, "blink", "", "");
  }
});
var hlt = g, dlt = Wt, glt = qt;
hlt({ target: "String", proto: !0, forced: glt("bold") }, {
  bold: function() {
    return dlt(this, "b", "", "");
  }
});
var plt = g, $lt = Wt, ylt = qt;
plt({ target: "String", proto: !0, forced: ylt("fixed") }, {
  fixed: function() {
    return $lt(this, "tt", "", "");
  }
});
var mlt = g, blt = Wt, wlt = qt;
mlt({ target: "String", proto: !0, forced: wlt("fontcolor") }, {
  fontcolor: function(r) {
    return blt(this, "font", "color", r);
  }
});
var Slt = g, xlt = Wt, Elt = qt;
Slt({ target: "String", proto: !0, forced: Elt("fontsize") }, {
  fontsize: function(r) {
    return xlt(this, "font", "size", r);
  }
});
var Tlt = g, Ilt = Wt, Olt = qt;
Tlt({ target: "String", proto: !0, forced: Olt("italics") }, {
  italics: function() {
    return Ilt(this, "i", "", "");
  }
});
var Alt = g, Rlt = Wt, _lt = qt;
Alt({ target: "String", proto: !0, forced: _lt("link") }, {
  link: function(r) {
    return Rlt(this, "a", "href", r);
  }
});
var Clt = g, Plt = Wt, Mlt = qt;
Clt({ target: "String", proto: !0, forced: Mlt("small") }, {
  small: function() {
    return Plt(this, "small", "", "");
  }
});
var Nlt = g, Dlt = Wt, Flt = qt;
Nlt({ target: "String", proto: !0, forced: Flt("strike") }, {
  strike: function() {
    return Dlt(this, "strike", "", "");
  }
});
var Llt = g, klt = Wt, Blt = qt;
Llt({ target: "String", proto: !0, forced: Blt("sub") }, {
  sub: function() {
    return klt(this, "sub", "", "");
  }
});
var jlt = g, Ult = Wt, zlt = qt;
jlt({ target: "String", proto: !0, forced: zlt("sup") }, {
  sup: function() {
    return Ult(this, "sup", "", "");
  }
});
var ch = { exports: {} }, NO = D, uf = O, Vlt = Cu, Hlt = X.NATIVE_ARRAY_BUFFER_VIEWS, Glt = NO.ArrayBuffer, Ae = NO.Int8Array, dg = !Hlt || !uf(function() {
  Ae(1);
}) || !uf(function() {
  new Ae(-1);
}) || !Vlt(function(t) {
  new Ae(), new Ae(null), new Ae(1.5), new Ae(t);
}, !0) || uf(function() {
  return new Ae(new Glt(2), 1, void 0).length !== 1;
}), Wlt = Pd, qlt = RangeError, DO = function(t, r) {
  var e = Wlt(t);
  if (e % r)
    throw new qlt("Wrong offset");
  return e;
}, Ylt = Math.round, Klt = function(t) {
  var r = Ylt(t);
  return r < 0 ? 0 : r > 255 ? 255 : r & 255;
}, Xlt = gr, FO = function(t) {
  var r = Xlt(t);
  return r === "BigInt64Array" || r === "BigUint64Array";
}, Jlt = $u, Zlt = TypeError, gg = function(t) {
  var r = Jlt(t, "number");
  if (typeof r == "number")
    throw new Zlt("Can't convert number to bigint");
  return BigInt(r);
}, Qlt = pr, tct = z, rct = Vd, ect = et, nct = st, act = Au, ict = ia, oct = nd, sct = FO, uct = X.aTypedArrayConstructor, lct = gg, LO = function(r) {
  var e = rct(this), n = ect(r), a = arguments.length, i = a > 1 ? arguments[1] : void 0, o = i !== void 0, s = ict(n), u, l, c, f, v, h, d, $;
  if (s && !oct(s))
    for (d = act(n, s), $ = d.next, n = []; !(h = tct($, d)).done; )
      n.push(h.value);
  for (o && a > 2 && (i = Qlt(i, arguments[2])), l = nct(n), c = new (uct(e))(l), f = sct(c), u = 0; l > u; u++)
    v = o ? i(n[u], u) : n[u], c[u] = f ? lct(v) : +v;
  return c;
}, $b = g, kO = D, yb = z, cct = U, fct = dg, Yi = X, BO = Bu, mb = $r, vct = tr, Ma = Tt, hct = jd, dct = zt, bb = Fu, lf = DO, gct = Klt, jO = $e, Na = Q, pct = gr, fh = Y, $ct = Ge, yct = Vt, mct = Dt, Fo = Pr, bct = ye.f, wb = LO, wct = bt.forEach, Sct = la, xct = dt, UO = lt, zO = xt, Sb = Nu, pg = ht, Ect = Ye, vh = pg.get, Tct = pg.set, Ict = pg.enforce, VO = UO.f, Oct = zO.f, cf = kO.RangeError, HO = BO.ArrayBuffer, Act = HO.prototype, Rct = BO.DataView, Lo = Yi.NATIVE_ARRAY_BUFFER_VIEWS, xb = Yi.TYPED_ARRAY_TAG, Eb = Yi.TypedArray, Da = Yi.TypedArrayPrototype, hh = Yi.isTypedArray, ko = "BYTES_PER_ELEMENT", ff = "Wrong length", Bo = function(t, r) {
  xct(t, r, {
    configurable: !0,
    get: function() {
      return vh(this)[r];
    }
  });
}, Tb = function(t) {
  var r;
  return mct(Act, t) || (r = pct(t)) === "ArrayBuffer" || r === "SharedArrayBuffer";
}, GO = function(t, r) {
  return hh(t) && !$ct(r) && r in t && hct(+r) && r >= 0;
}, Ib = function(r, e) {
  return e = jO(e), GO(r, e) ? vct(2, r[e]) : Oct(r, e);
}, Ob = function(r, e, n) {
  return e = jO(e), GO(r, e) && fh(n) && Na(n, "value") && !Na(n, "get") && !Na(n, "set") && !n.configurable && (!Na(n, "writable") || n.writable) && (!Na(n, "enumerable") || n.enumerable) ? (r[e] = n.value, r) : VO(r, e, n);
};
cct ? (Lo || (zO.f = Ib, UO.f = Ob, Bo(Da, "buffer"), Bo(Da, "byteOffset"), Bo(Da, "byteLength"), Bo(Da, "length")), $b({ target: "Object", stat: !0, forced: !Lo }, {
  getOwnPropertyDescriptor: Ib,
  defineProperty: Ob
}), ch.exports = function(t, r, e) {
  var n = t.match(/\d+/)[0] / 8, a = t + (e ? "Clamped" : "") + "Array", i = "get" + t, o = "set" + t, s = kO[a], u = s, l = u && u.prototype, c = {}, f = function($, y) {
    var p = vh($);
    return p.view[i](y * n + p.byteOffset, !0);
  }, v = function($, y, p) {
    var w = vh($);
    w.view[o](y * n + w.byteOffset, e ? gct(p) : p, !0);
  }, h = function($, y) {
    VO($, y, {
      get: function() {
        return f(this, y);
      },
      set: function(p) {
        return v(this, y, p);
      },
      enumerable: !0
    });
  };
  Lo ? fct && (u = r(function($, y, p, w) {
    return mb($, l), Ect(function() {
      return fh(y) ? Tb(y) ? w !== void 0 ? new s(y, lf(p, n), w) : p !== void 0 ? new s(y, lf(p, n)) : new s(y) : hh(y) ? Sb(u, y) : yb(wb, u, y) : new s(bb(y));
    }(), $, u);
  }), Fo && Fo(u, Eb), wct(bct(s), function($) {
    $ in u || Ma(u, $, s[$]);
  }), u.prototype = l) : (u = r(function($, y, p, w) {
    mb($, l);
    var T = 0, R = 0, M, L, V;
    if (!fh(y))
      V = bb(y), L = V * n, M = new HO(L);
    else if (Tb(y)) {
      M = y, R = lf(p, n);
      var W = y.byteLength;
      if (w === void 0) {
        if (W % n)
          throw new cf(ff);
        if (L = W - R, L < 0)
          throw new cf(ff);
      } else if (L = dct(w) * n, L + R > W)
        throw new cf(ff);
      V = L / n;
    } else
      return hh(y) ? Sb(u, y) : yb(wb, u, y);
    for (Tct($, {
      buffer: M,
      byteOffset: R,
      byteLength: L,
      length: V,
      view: new Rct(M)
    }); T < V; )
      h($, T++);
  }), Fo && Fo(u, Eb), l = u.prototype = yct(Da)), l.constructor !== u && Ma(l, "constructor", u), Ict(l).TypedArrayConstructor = u, xb && Ma(l, xb, a);
  var d = u !== s;
  c[a] = u, $b({ global: !0, constructor: !0, forced: d, sham: !Lo }, c), ko in u || Ma(u, ko, n), ko in l || Ma(l, ko, n), Sct(a);
}) : ch.exports = function() {
};
var re = ch.exports, _ct = re;
_ct("Float32", function(t) {
  return function(e, n, a) {
    return t(this, e, n, a);
  };
});
var Cct = re;
Cct("Float64", function(t) {
  return function(e, n, a) {
    return t(this, e, n, a);
  };
});
var Pct = re;
Pct("Int8", function(t) {
  return function(e, n, a) {
    return t(this, e, n, a);
  };
});
var Mct = re;
Mct("Int16", function(t) {
  return function(e, n, a) {
    return t(this, e, n, a);
  };
});
var Nct = re;
Nct("Int32", function(t) {
  return function(e, n, a) {
    return t(this, e, n, a);
  };
});
var Dct = re;
Dct("Uint8", function(t) {
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
var Lct = re;
Lct("Uint16", function(t) {
  return function(e, n, a) {
    return t(this, e, n, a);
  };
});
var kct = re;
kct("Uint32", function(t) {
  return function(e, n, a) {
    return t(this, e, n, a);
  };
});
var WO = X, Bct = st, jct = ft, Uct = WO.aTypedArray, zct = WO.exportTypedArrayMethod;
zct("at", function(r) {
  var e = Uct(this), n = Bct(e), a = jct(r), i = a >= 0 ? a : n + a;
  return i < 0 || i >= n ? void 0 : e[i];
});
var Vct = A, qO = X, Hct = gE, Gct = Vct(Hct), Wct = qO.aTypedArray, qct = qO.exportTypedArrayMethod;
qct("copyWithin", function(r, e) {
  return Gct(Wct(this), r, e, arguments.length > 2 ? arguments[2] : void 0);
});
var YO = X, Yct = bt.every, Kct = YO.aTypedArray, Xct = YO.exportTypedArrayMethod;
Xct("every", function(r) {
  return Yct(Kct(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var KO = X, Jct = id, Zct = gg, Qct = gr, tft = z, rft = A, eft = O, nft = KO.aTypedArray, aft = KO.exportTypedArrayMethod, ift = rft("".slice), oft = eft(function() {
  var t = 0;
  return new Int8Array(2).fill({ valueOf: function() {
    return t++;
  } }), t !== 1;
});
aft("fill", function(r) {
  var e = arguments.length;
  nft(this);
  var n = ift(Qct(this), 0, 3) === "Big" ? Zct(r) : +r;
  return tft(Jct, this, n, e > 1 ? arguments[1] : void 0, e > 2 ? arguments[2] : void 0);
}, oft);
var sft = Nu, uft = X.getTypedArrayConstructor, lft = function(t, r) {
  return sft(uft(t), r);
}, XO = X, cft = bt.filter, fft = lft, vft = XO.aTypedArray, hft = XO.exportTypedArrayMethod;
hft("filter", function(r) {
  var e = cft(vft(this), r, arguments.length > 1 ? arguments[1] : void 0);
  return fft(this, e);
});
var JO = X, dft = bt.find, gft = JO.aTypedArray, pft = JO.exportTypedArrayMethod;
pft("find", function(r) {
  return dft(gft(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var ZO = X, $ft = bt.findIndex, yft = ZO.aTypedArray, mft = ZO.exportTypedArrayMethod;
mft("findIndex", function(r) {
  return $ft(yft(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var QO = X, bft = _u.findLast, wft = QO.aTypedArray, Sft = QO.exportTypedArrayMethod;
Sft("findLast", function(r) {
  return bft(wft(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var tA = X, xft = _u.findLastIndex, Eft = tA.aTypedArray, Tft = tA.exportTypedArrayMethod;
Tft("findLastIndex", function(r) {
  return xft(Eft(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var rA = X, Ift = bt.forEach, Oft = rA.aTypedArray, Aft = rA.exportTypedArrayMethod;
Aft("forEach", function(r) {
  Ift(Oft(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var Rft = dg, _ft = X.exportTypedArrayStaticMethod, Cft = LO;
_ft("from", Cft, Rft);
var eA = X, Pft = Ti.includes, Mft = eA.aTypedArray, Nft = eA.exportTypedArrayMethod;
Nft("includes", function(r) {
  return Pft(Mft(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var nA = X, Dft = Ti.indexOf, Fft = nA.aTypedArray, Lft = nA.exportTypedArrayMethod;
Lft("indexOf", function(r) {
  return Dft(Fft(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var kft = D, Bft = O, $g = A, aA = X, yg = _E, jft = K, mg = jft("iterator"), Ab = kft.Uint8Array, Uft = $g(yg.values), zft = $g(yg.keys), Vft = $g(yg.entries), bg = aA.aTypedArray, ul = aA.exportTypedArrayMethod, pn = Ab && Ab.prototype, ll = !Bft(function() {
  pn[mg].call([1]);
}), iA = !!pn && pn.values && pn[mg] === pn.values && pn.values.name === "values", oA = function() {
  return Uft(bg(this));
};
ul("entries", function() {
  return Vft(bg(this));
}, ll);
ul("keys", function() {
  return zft(bg(this));
}, ll);
ul("values", oA, ll || !iA, { name: "values" });
ul(mg, oA, ll || !iA, { name: "values" });
var sA = X, Hft = A, Gft = sA.aTypedArray, Wft = sA.exportTypedArrayMethod, qft = Hft([].join);
Wft("join", function(r) {
  return qft(Gft(this), r);
});
var uA = X, Yft = er, Kft = PE, Xft = uA.aTypedArray, Jft = uA.exportTypedArrayMethod;
Jft("lastIndexOf", function(r) {
  var e = arguments.length;
  return Yft(Kft, Xft(this), e > 1 ? [r, arguments[1]] : [r]);
});
var wg = X, Zft = bt.map, Qft = wg.aTypedArray, tvt = wg.getTypedArrayConstructor, rvt = wg.exportTypedArrayMethod;
rvt("map", function(r) {
  return Zft(Qft(this), r, arguments.length > 1 ? arguments[1] : void 0, function(e, n) {
    return new (tvt(e))(n);
  });
});
var lA = X, evt = dg, nvt = lA.aTypedArrayConstructor, avt = lA.exportTypedArrayStaticMethod;
avt("of", function() {
  for (var r = 0, e = arguments.length, n = new (nvt(this))(e); e > r; )
    n[r] = arguments[r++];
  return n;
}, evt);
var cA = X, ivt = Pu.left, ovt = cA.aTypedArray, svt = cA.exportTypedArrayMethod;
svt("reduce", function(r) {
  var e = arguments.length;
  return ivt(ovt(this), r, e, e > 1 ? arguments[1] : void 0);
});
var fA = X, uvt = Pu.right, lvt = fA.aTypedArray, cvt = fA.exportTypedArrayMethod;
cvt("reduceRight", function(r) {
  var e = arguments.length;
  return uvt(lvt(this), r, e, e > 1 ? arguments[1] : void 0);
});
var vA = X, fvt = vA.aTypedArray, vvt = vA.exportTypedArrayMethod, hvt = Math.floor;
vvt("reverse", function() {
  for (var r = this, e = fvt(r).length, n = hvt(e / 2), a = 0, i; a < n; )
    i = r[a], r[a++] = r[--e], r[e] = i;
  return r;
});
var hA = D, dA = z, Sg = X, dvt = st, gvt = DO, pvt = et, gA = O, $vt = hA.RangeError, dh = hA.Int8Array, Rb = dh && dh.prototype, pA = Rb && Rb.set, yvt = Sg.aTypedArray, mvt = Sg.exportTypedArrayMethod, gh = !gA(function() {
  var t = new Uint8ClampedArray(2);
  return dA(pA, t, { length: 1, 0: 3 }, 1), t[1] !== 3;
}), bvt = gh && Sg.NATIVE_ARRAY_BUFFER_VIEWS && gA(function() {
  var t = new dh(2);
  return t.set(1), t.set("2", 1), t[0] !== 0 || t[1] !== 2;
});
mvt("set", function(r) {
  yvt(this);
  var e = gvt(arguments.length > 1 ? arguments[1] : void 0, 1), n = pvt(r);
  if (gh)
    return dA(pA, this, n, e);
  var a = this.length, i = dvt(n), o = 0;
  if (i + e > a)
    throw new $vt("Wrong length");
  for (; o < i; )
    this[e + o] = n[o++];
}, !gh || bvt);
var xg = X, wvt = O, Svt = rr, xvt = xg.aTypedArray, Evt = xg.getTypedArrayConstructor, Tvt = xg.exportTypedArrayMethod, Ivt = wvt(function() {
  new Int8Array(1).slice();
});
Tvt("slice", function(r, e) {
  for (var n = Svt(xvt(this), r, e), a = Evt(this), i = 0, o = n.length, s = new a(o); o > i; )
    s[i] = n[i++];
  return s;
}, Ivt);
var $A = X, Ovt = bt.some, Avt = $A.aTypedArray, Rvt = $A.exportTypedArrayMethod;
Rvt("some", function(r) {
  return Ovt(Avt(this), r, arguments.length > 1 ? arguments[1] : void 0);
});
var _vt = D, Cvt = qe, ph = O, Pvt = tt, Mvt = fd, yA = X, _b = NE, Nvt = DE, Cb = Kr, Pb = vd, Dvt = yA.aTypedArray, Fvt = yA.exportTypedArrayMethod, di = _vt.Uint16Array, Dn = di && Cvt(di.prototype.sort), Lvt = !!Dn && !(ph(function() {
  Dn(new di(2), null);
}) && ph(function() {
  Dn(new di(2), {});
})), Mb = !!Dn && !ph(function() {
  if (Cb)
    return Cb < 74;
  if (_b)
    return _b < 67;
  if (Nvt)
    return !0;
  if (Pb)
    return Pb < 602;
  var t = new di(516), r = Array(516), e, n;
  for (e = 0; e < 516; e++)
    n = e % 4, t[e] = 515 - e, r[e] = e - 2 * n + 3;
  for (Dn(t, function(a, i) {
    return (a / 4 | 0) - (i / 4 | 0);
  }), e = 0; e < 516; e++)
    if (t[e] !== r[e])
      return !0;
}), kvt = function(t) {
  return function(r, e) {
    return t !== void 0 ? +t(r, e) || 0 : e !== e ? -1 : r !== r ? 1 : r === 0 && e === 0 ? 1 / r > 0 && 1 / e < 0 ? 1 : -1 : r > e;
  };
};
Fvt("sort", function(r) {
  return r !== void 0 && Pvt(r), Mb ? Dn(this, r) : Mvt(Dvt(this), kvt(r));
}, !Mb || Lvt);
var Eg = X, Bvt = zt, Nb = Jr, jvt = Eg.aTypedArray, Uvt = Eg.getTypedArrayConstructor, zvt = Eg.exportTypedArrayMethod;
zvt("subarray", function(r, e) {
  var n = jvt(this), a = n.length, i = Nb(r, a), o = Uvt(n);
  return new o(
    n.buffer,
    n.byteOffset + i * n.BYTES_PER_ELEMENT,
    Bvt((e === void 0 ? a : Nb(e, a)) - i)
  );
});
var Vvt = D, Hvt = er, mA = X, $h = O, Db = rr, Qs = Vvt.Int8Array, Fb = mA.aTypedArray, Gvt = mA.exportTypedArrayMethod, bA = [].toLocaleString, Wvt = !!Qs && $h(function() {
  bA.call(new Qs(1));
}), qvt = $h(function() {
  return [1, 2].toLocaleString() !== new Qs([1, 2]).toLocaleString();
}) || !$h(function() {
  Qs.prototype.toLocaleString.call([1, 2]);
});
Gvt("toLocaleString", function() {
  return Hvt(
    bA,
    Wvt ? Db(Fb(this)) : Fb(this),
    Db(arguments)
  );
}, qvt);
var Yvt = kE, Tg = X, Kvt = Tg.aTypedArray, Xvt = Tg.exportTypedArrayMethod, Jvt = Tg.getTypedArrayConstructor;
Xvt("toReversed", function() {
  return Yvt(Kvt(this), Jvt(this));
});
var cl = X, Zvt = A, Qvt = tt, tht = Nu, rht = cl.aTypedArray, eht = cl.getTypedArrayConstructor, nht = cl.exportTypedArrayMethod, aht = Zvt(cl.TypedArrayPrototype.sort);
nht("toSorted", function(r) {
  r !== void 0 && Qvt(r);
  var e = rht(this), n = tht(eht(e), e);
  return aht(n, r);
});
var iht = X.exportTypedArrayMethod, oht = O, sht = D, uht = A, Lb = sht.Uint8Array, lht = Lb && Lb.prototype || {}, tu = [].toString, cht = uht([].join);
oht(function() {
  tu.call({});
}) && (tu = function() {
  return cht(this);
});
var fht = lht.toString !== tu;
iht("toString", tu, fht);
var vht = BE, Ig = X, hht = FO, dht = ft, ght = gg, pht = Ig.aTypedArray, $ht = Ig.getTypedArrayConstructor, yht = Ig.exportTypedArrayMethod, mht = !!function() {
  try {
    new Int8Array(1).with(2, { valueOf: function() {
      throw 8;
    } });
  } catch (t) {
    return t === 8;
  }
}();
yht("with", function(t, r) {
  var e = pht(this), n = dht(t), a = hht(e) ? ght(r) : +r;
  return vht(e, $ht(e), n, a);
}, !mht);
var bht = g, Og = A, wht = G, kb = String.fromCharCode, Bb = Og("".charAt), jb = Og(/./.exec), Ub = Og("".slice), Sht = /^[\da-f]{2}$/i, xht = /^[\da-f]{4}$/i;
bht({ global: !0 }, {
  unescape: function(r) {
    for (var e = wht(r), n = "", a = e.length, i = 0, o, s; i < a; ) {
      if (o = Bb(e, i++), o === "%") {
        if (Bb(e, i) === "u") {
          if (s = Ub(e, i + 1, i + 5), jb(xht, s)) {
            n += kb(parseInt(s, 16)), i += 5;
            continue;
          }
        } else if (s = Ub(e, i, i + 2), jb(Sht, s)) {
          n += kb(parseInt(s, 16)), i += 2;
          continue;
        }
      }
      n += o;
    }
    return n;
  }
});
var Eht = A, zb = ca, jo = Je.getWeakData, Tht = $r, Iht = j, Oht = Nt, vf = Y, Aht = $t, wA = bt, Vb = Q, SA = ht, Rht = SA.set, _ht = SA.getterFor, Cht = wA.find, Pht = wA.findIndex, Mht = Eht([].splice), Nht = 0, Uo = function(t) {
  return t.frozen || (t.frozen = new xA());
}, xA = function() {
  this.entries = [];
}, hf = function(t, r) {
  return Cht(t.entries, function(e) {
    return e[0] === r;
  });
};
xA.prototype = {
  get: function(t) {
    var r = hf(this, t);
    if (r)
      return r[1];
  },
  has: function(t) {
    return !!hf(this, t);
  },
  set: function(t, r) {
    var e = hf(this, t);
    e ? e[1] = r : this.entries.push([t, r]);
  },
  delete: function(t) {
    var r = Pht(this.entries, function(e) {
      return e[0] === t;
    });
    return ~r && Mht(this.entries, r, 1), !!~r;
  }
};
var EA = {
  getConstructor: function(t, r, e, n) {
    var a = t(function(u, l) {
      Tht(u, i), Rht(u, {
        type: r,
        id: Nht++,
        frozen: null
      }), Oht(l) || Aht(l, u[n], { that: u, AS_ENTRIES: e });
    }), i = a.prototype, o = _ht(r), s = function(u, l, c) {
      var f = o(u), v = jo(Iht(l), !0);
      return v === !0 ? Uo(f).set(l, c) : v[f.id] = c, u;
    };
    return zb(i, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      delete: function(u) {
        var l = o(this);
        if (!vf(u))
          return !1;
        var c = jo(u);
        return c === !0 ? Uo(l).delete(u) : c && Vb(c, l.id) && delete c[l.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function(l) {
        var c = o(this);
        if (!vf(l))
          return !1;
        var f = jo(l);
        return f === !0 ? Uo(c).has(l) : f && Vb(f, c.id);
      }
    }), zb(i, e ? {
      // `WeakMap.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
      get: function(l) {
        var c = o(this);
        if (vf(l)) {
          var f = jo(l);
          if (f === !0)
            return Uo(c).get(l);
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
}, Dht = ha, Hb = D, vs = A, Gb = ca, Fht = Je, Lht = Hu, TA = EA, zo = Y, Vo = ht.enforce, kht = O, Bht = px, Ki = Object, jht = Array.isArray, Ho = Ki.isExtensible, IA = Ki.isFrozen, Uht = Ki.isSealed, OA = Ki.freeze, zht = Ki.seal, Vht = !Hb.ActiveXObject && "ActiveXObject" in Hb, Fa, AA = function(t) {
  return function() {
    return t(this, arguments.length ? arguments[0] : void 0);
  };
}, RA = Lht("WeakMap", AA, TA), $n = RA.prototype, hs = vs($n.set), Hht = function() {
  return Dht && kht(function() {
    var t = OA([]);
    return hs(new RA(), t, 1), !IA(t);
  });
};
if (Bht)
  if (Vht) {
    Fa = TA.getConstructor(AA, "WeakMap", !0), Fht.enable();
    var Wb = vs($n.delete), Go = vs($n.has), qb = vs($n.get);
    Gb($n, {
      delete: function(t) {
        if (zo(t) && !Ho(t)) {
          var r = Vo(this);
          return r.frozen || (r.frozen = new Fa()), Wb(this, t) || r.frozen.delete(t);
        }
        return Wb(this, t);
      },
      has: function(r) {
        if (zo(r) && !Ho(r)) {
          var e = Vo(this);
          return e.frozen || (e.frozen = new Fa()), Go(this, r) || e.frozen.has(r);
        }
        return Go(this, r);
      },
      get: function(r) {
        if (zo(r) && !Ho(r)) {
          var e = Vo(this);
          return e.frozen || (e.frozen = new Fa()), Go(this, r) ? qb(this, r) : e.frozen.get(r);
        }
        return qb(this, r);
      },
      set: function(r, e) {
        if (zo(r) && !Ho(r)) {
          var n = Vo(this);
          n.frozen || (n.frozen = new Fa()), Go(this, r) ? hs(this, r, e) : n.frozen.set(r, e);
        } else
          hs(this, r, e);
        return this;
      }
    });
  } else
    Hht() && Gb($n, {
      set: function(r, e) {
        var n;
        return jht(r) && (IA(r) ? n = OA : Uht(r) && (n = zht)), hs(this, r, e), n && n(r), this;
      }
    });
var Ght = Hu, Wht = EA;
Ght("WeakSet", function(t) {
  return function() {
    return t(this, arguments.length ? arguments[0] : void 0);
  };
}, Wht);
var _A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", Yb = _A + "+/", Kb = _A + "-_", Xb = function(t) {
  for (var r = {}, e = 0; e < 64; e++)
    r[t.charAt(e)] = e;
  return r;
}, CA = {
  i2c: Yb,
  c2i: Xb(Yb),
  i2cUrl: Kb,
  c2iUrl: Xb(Kb)
}, qht = g, Yht = D, PA = ot, Ag = A, Kht = z, fl = O, Xht = G, Jht = nr, Jb = CA.c2i, MA = /[^\d+/a-z]/i, Zht = /[\t\n\f\r ]+/g, Qht = /[=]{1,2}$/, ze = PA("atob"), tdt = String.fromCharCode, rdt = Ag("".charAt), Zb = Ag("".replace), edt = Ag(MA.exec), $a = !!ze && !fl(function() {
  return ze("aGk=") !== "hi";
}), NA = $a && fl(function() {
  return ze(" ") !== "";
}), DA = $a && !fl(function() {
  ze("a");
}), ndt = $a && !fl(function() {
  ze();
}), adt = $a && ze.length !== 1, idt = !$a || NA || DA || ndt || adt;
qht({ global: !0, bind: !0, enumerable: !0, forced: idt }, {
  atob: function(r) {
    if (Jht(arguments.length, 1), $a && !NA && !DA)
      return Kht(ze, Yht, r);
    var e = Zb(Xht(r), Zht, ""), n = "", a = 0, i = 0, o, s, u;
    if (e.length % 4 === 0 && (e = Zb(e, Qht, "")), o = e.length, o % 4 === 1 || edt(MA, e))
      throw new (PA("DOMException"))("The string is not correctly encoded", "InvalidCharacterError");
    for (; a < o; )
      s = rdt(e, a++), u = i % 4 ? u * 64 + Jb[s] : Jb[s], i++ % 4 && (n += tdt(255 & u >> (-2 * i & 6)));
    return n;
  }
});
var odt = g, sdt = D, FA = ot, LA = A, udt = z, Rg = O, Qb = G, ldt = nr, cdt = CA.i2c, Yn = FA("btoa"), tw = LA("".charAt), fdt = LA("".charCodeAt), gi = !!Yn && !Rg(function() {
  return Yn("hi") !== "aGk=";
}), vdt = gi && !Rg(function() {
  Yn();
}), hdt = gi && Rg(function() {
  return Yn(null) !== "bnVsbA==";
}), ddt = gi && Yn.length !== 1;
odt({ global: !0, bind: !0, enumerable: !0, forced: !gi || vdt || hdt || ddt }, {
  btoa: function(r) {
    if (ldt(arguments.length, 1), gi)
      return udt(Yn, sdt, Qb(r));
    for (var e = Qb(r), n = "", a = 0, i = cdt, o, s; tw(e, a) || (i = "=", a % 1); ) {
      if (s = fdt(e, a += 3 / 4), s > 255)
        throw new (FA("DOMException"))("The string contains characters outside of the Latin1 range", "InvalidCharacterError");
      o = o << 8 | s, n += tw(i, 63 & o >> 8 - a % 1 * 8);
    }
    return n;
  }
});
var kA = {
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
}, gdt = yu, df = gdt("span").classList, rw = df && df.constructor && df.constructor.prototype, BA = rw === Object.prototype ? void 0 : rw, ew = D, nw = kA, pdt = BA, gf = bE, $dt = Tt, jA = function(t) {
  if (t && t.forEach !== gf)
    try {
      $dt(t, "forEach", gf);
    } catch {
      t.forEach = gf;
    }
};
for (var pf in nw)
  nw[pf] && jA(ew[pf] && ew[pf].prototype);
jA(pdt);
var aw = D, UA = kA, ydt = BA, Va = _E, iw = Tt, mdt = Lt, bdt = K, $f = bdt("iterator"), yf = Va.values, zA = function(t, r) {
  if (t) {
    if (t[$f] !== yf)
      try {
        iw(t, $f, yf);
      } catch {
        t[$f] = yf;
      }
    if (mdt(t, r, !0), UA[r]) {
      for (var e in Va)
        if (t[e] !== Va[e])
          try {
            iw(t, e, Va[e]);
          } catch {
            t[e] = Va[e];
          }
    }
  }
};
for (var mf in UA)
  zA(aw[mf] && aw[mf].prototype, mf);
zA(ydt, "DOMTokenList");
var VA = {
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
}, wdt = g, ru = ot, Sdt = uT, _g = O, xdt = Vt, Cg = tr, eu = lt.f, Edt = ct, ds = dt, gs = Q, Tdt = $r, Idt = j, HA = vE, ow = Di, Fn = VA, Odt = td, GA = ht, Pg = U, Kn = "DOMException", yh = "DATA_CLONE_ERR", vl = ru("Error"), Yr = ru(Kn) || function() {
  try {
    var t = ru("MessageChannel") || Sdt("worker_threads").MessageChannel;
    new t().port1.postMessage(/* @__PURE__ */ new WeakMap());
  } catch (r) {
    if (r.name === yh && r.code === 25)
      return r.constructor;
  }
}(), Adt = Yr && Yr.prototype, WA = vl.prototype, Rdt = GA.set, _dt = GA.getterFor(Kn), Cdt = "stack" in new vl(Kn), qA = function(t) {
  return gs(Fn, t) && Fn[t].m ? Fn[t].c : 0;
}, Mg = function() {
  Tdt(this, Za);
  var r = arguments.length, e = ow(r < 1 ? void 0 : arguments[0]), n = ow(r < 2 ? void 0 : arguments[1], "Error"), a = qA(n);
  if (Rdt(this, {
    type: Kn,
    name: n,
    message: e,
    code: a
  }), Pg || (this.name = n, this.message = e, this.code = a), Cdt) {
    var i = new vl(e);
    i.name = Kn, eu(this, "stack", Cg(1, Odt(i.stack, 1)));
  }
}, Za = Mg.prototype = xdt(WA), YA = function(t) {
  return { enumerable: !0, configurable: !0, get: t };
}, bf = function(t) {
  return YA(function() {
    return _dt(this)[t];
  });
};
Pg && (ds(Za, "code", bf("code")), ds(Za, "message", bf("message")), ds(Za, "name", bf("name")));
eu(Za, "constructor", Cg(1, Mg));
var hl = _g(function() {
  return !(new Yr() instanceof vl);
}), Pdt = hl || _g(function() {
  return WA.toString !== HA || String(new Yr(1, 2)) !== "2: 1";
}), Mdt = hl || _g(function() {
  return new Yr(1, "DataCloneError").code !== 25;
});
hl || Yr[yh] !== 25 || Adt[yh];
var sw = hl;
wdt({ global: !0, constructor: !0, forced: sw }, {
  DOMException: sw ? Mg : Yr
});
var pi = ru(Kn), nu = pi.prototype;
Pdt && Yr === pi && Edt(nu, "toString", HA);
Mdt && Pg && Yr === pi && ds(nu, "code", YA(function() {
  return qA(Idt(this).name);
}));
for (var uw in Fn)
  if (gs(Fn, uw)) {
    var lw = Fn[uw], Wo = lw.s, cw = Cg(6, lw.c);
    gs(pi, Wo) || eu(pi, Wo, cw), gs(nu, Wo) || eu(nu, Wo, cw);
  }
var Ndt = g, Ddt = D, Ng = ot, mh = tr, bh = lt.f, fw = Q, Fdt = $r, Ldt = Ye, vw = Di, wf = VA, kdt = td, Bdt = U, Xi = "DOMException", KA = Ng("Error"), Ji = Ng(Xi), Dg = function() {
  Fdt(this, jdt);
  var r = arguments.length, e = vw(r < 1 ? void 0 : arguments[0]), n = vw(r < 2 ? void 0 : arguments[1], "Error"), a = new Ji(e, n), i = new KA(e);
  return i.name = Xi, bh(a, "stack", mh(1, kdt(i.stack, 1))), Ldt(a, this, Dg), a;
}, jdt = Dg.prototype = Ji.prototype, Udt = "stack" in new KA(Xi), zdt = "stack" in new Ji(1, 2), Sf = Ji && Bdt && Object.getOwnPropertyDescriptor(Ddt, Xi), Vdt = !!Sf && !(Sf.writable && Sf.configurable), hw = Udt && !Vdt && !zdt;
Ndt({ global: !0, constructor: !0, forced: hw }, {
  // TODO: fix export logic
  DOMException: hw ? Dg : Ji
});
var Ha = Ng(Xi), dw = Ha.prototype;
if (dw.constructor !== Ha) {
  bh(dw, "constructor", mh(1, Ha));
  for (var gw in wf)
    if (fw(wf, gw)) {
      var pw = wf[gw], $w = pw.s;
      fw(Ha, $w) || bh(Ha, $w, mh(6, pw.c));
    }
}
var Hdt = ot, Gdt = Lt, yw = "DOMException";
Gdt(Hdt(yw), yw);
var Wdt = g, qdt = D, mw = Zu.clear;
Wdt({ global: !0, bind: !0, enumerable: !0, forced: qdt.clearImmediate !== mw }, {
  clearImmediate: mw
});
var XA = D, Ydt = er, Kdt = Z, Xdt = Mu, Jdt = _r, Zdt = rr, Qdt = nr, tgt = XA.Function, rgt = /MSIE .\./.test(Jdt) || Xdt === "BUN" && function() {
  var t = XA.Bun.version.split(".");
  return t.length < 3 || t[0] === "0" && (t[1] < 3 || t[1] === "3" && t[2] === "0");
}(), Fg = function(t, r) {
  var e = r ? 2 : 1;
  return rgt ? function(n, a) {
    var i = Qdt(arguments.length, 1) > e, o = Kdt(n) ? n : tgt(n), s = i ? Zdt(arguments, e) : [], u = i ? function() {
      Ydt(o, this, s);
    } : o;
    return r ? t(u, a) : t(u);
  } : t;
}, egt = g, JA = D, bw = Zu.set, ngt = Fg, ww = JA.setImmediate ? ngt(bw, !1) : bw;
egt({ global: !0, bind: !0, enumerable: !0, forced: JA.setImmediate !== ww }, {
  setImmediate: ww
});
var agt = g, igt = D, ogt = TI, sgt = tt, ugt = nr, lgt = O, cgt = U, fgt = lgt(function() {
  return cgt && Object.getOwnPropertyDescriptor(igt, "queueMicrotask").value.length !== 1;
});
agt({ global: !0, enumerable: !0, dontCallGetSet: !0, forced: fgt }, {
  queueMicrotask: function(r) {
    ugt(arguments.length, 1), ogt(sgt(r));
  }
});
var vgt = g, se = D, hgt = dt, dgt = U, ggt = TypeError, pgt = Object.defineProperty, Sw = se.self !== se;
try {
  if (dgt) {
    var xf = Object.getOwnPropertyDescriptor(se, "self");
    (Sw || !xf || !xf.get || !xf.enumerable) && hgt(se, "self", {
      get: function() {
        return se;
      },
      set: function(r) {
        if (this !== se)
          throw new ggt("Illegal invocation");
        pgt(se, "self", {
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
    vgt({ global: !0, simple: !0, forced: Sw }, {
      self: se
    });
} catch {
}
var $gt = g, mt = D, Qa = ot, Zi = A, Lg = O, ygt = ea, Xn = Z, mgt = aa, bgt = Nt, dl = Y, wgt = Ge, Sgt = $t, ZA = j, au = gr, xgt = Q, Egt = Zr, Ef = Tt, ps = st, Tgt = nr, Igt = Vi, gl = HT, kg = yr, Ogt = pa, xw = lT, Agt = sE, Bg = Ed, Ga = mt.Object, Rgt = mt.Array, QA = mt.Date, tR = mt.Error, _gt = mt.TypeError, Cgt = mt.PerformanceMark, Ve = Qa("DOMException"), wh = gl.Map, jg = gl.has, rR = gl.get, iu = gl.set, eR = kg.Set, nR = kg.add, Pgt = kg.has, Mgt = Qa("Object", "keys"), Ngt = Zi([].push), Dgt = Zi((!0).valueOf), Fgt = Zi(1 .valueOf), Lgt = Zi("".valueOf), kgt = Zi(QA.prototype.getTime), Sh = ygt("structuredClone"), $i = "DataCloneError", $s = "Transferring", aR = function(t) {
  return !Lg(function() {
    var r = new mt.Set([7]), e = t(r), n = t(Ga(7));
    return e === r || !e.has(7) || !dl(n) || +n != 7;
  }) && t;
}, Ew = function(t, r) {
  return !Lg(function() {
    var e = new r(), n = t({ a: e, b: e });
    return !(n && n.a === n.b && n.a instanceof r && n.a.stack === e.stack);
  });
}, Bgt = function(t) {
  return !Lg(function() {
    var r = t(new mt.AggregateError([1], Sh, { cause: 3 }));
    return r.name !== "AggregateError" || r.errors[0] !== 1 || r.message !== Sh || r.cause !== 3;
  });
}, Ln = mt.structuredClone, jgt = !Ew(Ln, tR) || !Ew(Ln, Ve) || !Bgt(Ln), Ugt = !Ln && aR(function(t) {
  return new Cgt(Sh, { detail: t }).detail;
}), zr = aR(Ln) || Ugt, Tf = function(t) {
  throw new Ve("Uncloneable type: " + t, $i);
}, Ct = function(t, r) {
  throw new Ve((r || "Cloning") + " of " + t + " cannot be properly polyfilled in this engine", $i);
}, If = function(t, r) {
  return zr || Ct(r), zr(t);
}, zgt = function() {
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
}, iR = function(t, r, e) {
  if (jg(r, t))
    return rR(r, t);
  var n = e || au(t), a, i, o, s, u, l;
  if (n === "SharedArrayBuffer")
    zr ? a = zr(t) : a = t;
  else {
    var c = mt.DataView;
    !c && !Xn(t.slice) && Ct("ArrayBuffer");
    try {
      if (Xn(t.slice) && !t.resizable)
        a = t.slice(0);
      else
        for (i = t.byteLength, o = ("maxByteLength" in t) ? { maxByteLength: t.maxByteLength } : void 0, a = new ArrayBuffer(i, o), s = new c(t), u = new c(a), l = 0; l < i; l++)
          u.setUint8(l, s.getUint8(l));
    } catch {
      throw new Ve("ArrayBuffer is detached", $i);
    }
  }
  return iu(r, t, a), a;
}, Vgt = function(t, r, e, n, a) {
  var i = mt[r];
  return dl(i) || Ct(r), new i(iR(t.buffer, a), e, n);
}, yt = function(t, r) {
  if (wgt(t) && Tf("Symbol"), !dl(t))
    return t;
  if (r) {
    if (jg(r, t))
      return rR(r, t);
  } else
    r = new wh();
  var e = au(t), n, a, i, o, s, u, l, c;
  switch (e) {
    case "Array":
      i = Rgt(ps(t));
      break;
    case "Object":
      i = {};
      break;
    case "Map":
      i = new wh();
      break;
    case "Set":
      i = new eR();
      break;
    case "RegExp":
      i = new RegExp(t.source, Igt(t));
      break;
    case "Error":
      switch (a = t.name, a) {
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
          i = new tR();
      }
      break;
    case "DOMException":
      i = new Ve(t.message, t.name);
      break;
    case "ArrayBuffer":
    case "SharedArrayBuffer":
      i = iR(t, r, e);
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
      u = e === "DataView" ? t.byteLength : t.length, i = Vgt(t, e, t.byteOffset, u, r);
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
        i = If(t, e);
      }
      break;
    case "File":
      if (zr)
        try {
          i = zr(t), au(i) !== e && (i = void 0);
        } catch {
        }
      if (!i)
        try {
          i = new File([t], t.name, t);
        } catch {
        }
      i || Ct(e);
      break;
    case "FileList":
      if (o = zgt(), o) {
        for (s = 0, u = ps(t); s < u; s++)
          o.items.add(yt(t[s], r));
        i = o.files;
      } else
        i = If(t, e);
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
        i = If(t, e);
      }
      break;
    default:
      if (zr)
        i = zr(t);
      else
        switch (e) {
          case "BigInt":
            i = Ga(t.valueOf());
            break;
          case "Boolean":
            i = Ga(Dgt(t));
            break;
          case "Number":
            i = Ga(Fgt(t));
            break;
          case "String":
            i = Ga(Lgt(t));
            break;
          case "Date":
            i = new QA(kgt(t));
            break;
          case "Blob":
            try {
              i = t.slice(0, t.size, t.type);
            } catch {
              Ct(e);
            }
            break;
          case "DOMPoint":
          case "DOMPointReadOnly":
            n = mt[e];
            try {
              i = n.fromPoint ? n.fromPoint(t) : new n(t.x, t.y, t.z, t.w);
            } catch {
              Ct(e);
            }
            break;
          case "DOMRect":
          case "DOMRectReadOnly":
            n = mt[e];
            try {
              i = n.fromRect ? n.fromRect(t) : new n(t.x, t.y, t.width, t.height);
            } catch {
              Ct(e);
            }
            break;
          case "DOMMatrix":
          case "DOMMatrixReadOnly":
            n = mt[e];
            try {
              i = n.fromMatrix ? n.fromMatrix(t) : new n(t);
            } catch {
              Ct(e);
            }
            break;
          case "AudioData":
          case "VideoFrame":
            Xn(t.clone) || Ct(e);
            try {
              i = t.clone();
            } catch {
              Tf(e);
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
            Ct(e);
          default:
            Tf(e);
        }
  }
  switch (iu(r, t, i), e) {
    case "Array":
    case "Object":
      for (l = Mgt(t), s = 0, u = ps(l); s < u; s++)
        c = l[s], Egt(i, c, yt(t[c], r));
      break;
    case "Map":
      t.forEach(function(f, v) {
        iu(i, yt(v, r), yt(f, r));
      });
      break;
    case "Set":
      t.forEach(function(f) {
        nR(i, yt(f, r));
      });
      break;
    case "Error":
      Ef(i, "message", yt(t.message, r)), xgt(t, "cause") && Ef(i, "cause", yt(t.cause, r)), a === "AggregateError" ? i.errors = yt(t.errors, r) : a === "SuppressedError" && (i.error = yt(t.error, r), i.suppressed = yt(t.suppressed, r));
    case "DOMException":
      Agt && Ef(i, "stack", yt(t.stack, r));
  }
  return i;
}, Hgt = function(t, r) {
  if (!dl(t))
    throw new _gt("Transfer option cannot be converted to a sequence");
  var e = [];
  Sgt(t, function(v) {
    Ngt(e, ZA(v));
  });
  for (var n = 0, a = ps(e), i = new eR(), o, s, u, l, c, f; n < a; ) {
    if (o = e[n++], s = au(o), s === "ArrayBuffer" ? Pgt(i, o) : jg(r, o))
      throw new Ve("Duplicate transferable", $i);
    if (s === "ArrayBuffer") {
      nR(i, o);
      continue;
    }
    if (Bg)
      l = Ln(o, { transfer: [o] });
    else
      switch (s) {
        case "ImageBitmap":
          u = mt.OffscreenCanvas, mgt(u) || Ct(s, $s);
          try {
            c = new u(o.width, o.height), f = c.getContext("bitmaprenderer"), f.transferFromImageBitmap(o), l = c.transferToImageBitmap();
          } catch {
          }
          break;
        case "AudioData":
        case "VideoFrame":
          (!Xn(o.clone) || !Xn(o.close)) && Ct(s, $s);
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
          Ct(s, $s);
      }
    if (l === void 0)
      throw new Ve("This object cannot be transferred: " + s, $i);
    iu(r, o, l);
  }
  return i;
}, Ggt = function(t) {
  Ogt(t, function(r) {
    Bg ? zr(r, { transfer: [r] }) : Xn(r.transfer) ? r.transfer() : xw ? xw(r) : Ct("ArrayBuffer", $s);
  });
};
$gt({ global: !0, enumerable: !0, sham: !Bg, forced: jgt }, {
  structuredClone: function(r) {
    var e = Tgt(arguments.length, 1) > 1 && !bgt(arguments[1]) ? ZA(arguments[1]) : void 0, n = e ? e.transfer : void 0, a, i;
    n !== void 0 && (a = new wh(), i = Hgt(n, a));
    var o = yt(r, a);
    return i && Ggt(i), o;
  }
});
var Wgt = g, oR = D, qgt = Fg, Tw = qgt(oR.setInterval, !0);
Wgt({ global: !0, bind: !0, forced: oR.setInterval !== Tw }, {
  setInterval: Tw
});
var Ygt = g, sR = D, Kgt = Fg, Iw = Kgt(sR.setTimeout, !0);
Ygt({ global: !0, bind: !0, forced: sR.setTimeout !== Iw }, {
  setTimeout: Iw
});
var Xgt = O, Jgt = K, Zgt = U, Ow = Xr, Qgt = Jgt("iterator"), pl = !Xgt(function() {
  var t = new URL("b?a=1&b=2&c=3", "https://a"), r = t.searchParams, e = new URLSearchParams("a=1&a=2&b=3"), n = "";
  return t.pathname = "c%20d", r.forEach(function(a, i) {
    r.delete("b"), n += i + a;
  }), e.delete("a", 2), e.delete("b", void 0), Ow && (!t.toJSON || !e.has("a", 1) || e.has("a", 2) || !e.has("a", void 0) || e.has("b")) || !r.size && (Ow || !Zgt) || !r.sort || t.href !== "https://a/c%20d?a=1&c=3" || r.get("c") !== "3" || String(new URLSearchParams("?a=1")) !== "a=1" || !r[Qgt] || new URL("https://a@b").username !== "a" || new URLSearchParams(new URLSearchParams("a=b")).get("a") !== "b" || new URL("https://тест").host !== "xn--e1aybc" || new URL("https://a#б").hash !== "#%D0%B1" || n !== "a1c3" || new URL("https://x", void 0).host !== "x";
}), en = A, Of = 2147483647, ti = 36, uR = 1, xh = 26, tpt = 38, rpt = 700, ept = 72, npt = 128, apt = "-", ipt = /[^\0-\u007E]/, lR = /[.\u3002\uFF0E\uFF61]/g, Aw = "Overflow: input needs wider integers to process", Af = ti - uR, Rw = RangeError, opt = en(lR.exec), In = Math.floor, Rf = String.fromCharCode, _w = en("".charCodeAt), cR = en([].join), ce = en([].push), spt = en("".replace), upt = en("".split), lpt = en("".toLowerCase), cpt = function(t) {
  for (var r = [], e = 0, n = t.length; e < n; ) {
    var a = _w(t, e++);
    if (a >= 55296 && a <= 56319 && e < n) {
      var i = _w(t, e++);
      (i & 64512) === 56320 ? ce(r, ((a & 1023) << 10) + (i & 1023) + 65536) : (ce(r, a), e--);
    } else
      ce(r, a);
  }
  return r;
}, Cw = function(t) {
  return t + 22 + 75 * (t < 26);
}, fpt = function(t, r, e) {
  var n = 0;
  for (t = e ? In(t / rpt) : t >> 1, t += In(t / r); t > Af * xh >> 1; )
    t = In(t / Af), n += ti;
  return In(n + (Af + 1) * t / (t + tpt));
}, vpt = function(t) {
  var r = [];
  t = cpt(t);
  var e = t.length, n = npt, a = 0, i = ept, o, s;
  for (o = 0; o < t.length; o++)
    s = t[o], s < 128 && ce(r, Rf(s));
  var u = r.length, l = u;
  for (u && ce(r, apt); l < e; ) {
    var c = Of;
    for (o = 0; o < t.length; o++)
      s = t[o], s >= n && s < c && (c = s);
    var f = l + 1;
    if (c - n > In((Of - a) / f))
      throw new Rw(Aw);
    for (a += (c - n) * f, n = c, o = 0; o < t.length; o++) {
      if (s = t[o], s < n && ++a > Of)
        throw new Rw(Aw);
      if (s === n) {
        for (var v = a, h = ti; ; ) {
          var d = h <= i ? uR : h >= i + xh ? xh : h - i;
          if (v < d)
            break;
          var $ = v - d, y = ti - d;
          ce(r, Rf(Cw(d + $ % y))), v = In($ / y), h += ti;
        }
        ce(r, Rf(Cw(v))), i = fpt(a, f, l === u), a = 0, l++;
      }
    }
    a++, n++;
  }
  return cR(r, "");
}, hpt = function(t) {
  var r = [], e = upt(spt(lpt(t), lR, "."), "."), n, a;
  for (n = 0; n < e.length; n++)
    a = e[n], ce(r, opt(ipt, a) ? "xn--" + vpt(a) : a);
  return cR(r, ".");
}, Eh = g, fR = D, Ug = SI, dpt = ot, qo = z, hr = A, ri = U, vR = pl, hR = ct, gpt = dt, ppt = ca, $pt = Lt, ypt = sd, zg = ht, dR = $r, _f = Z, mpt = Q, bpt = pr, wpt = gr, Spt = j, gR = Y, Ot = G, xpt = Vt, Pw = tr, Mw = Au, Ept = ia, Yo = sa, fn = nr, Tpt = K, Ipt = fd, Opt = Tpt("iterator"), ya = "URLSearchParams", pR = ya + "Iterator", $R = zg.set, Jt = zg.getterFor(ya), Apt = zg.getterFor(pR), Nw = Ug("fetch"), ou = Ug("Request"), ei = Ug("Headers"), Cf = ou && ou.prototype, Dw = ei && ei.prototype, Rpt = fR.TypeError, _pt = fR.encodeURIComponent, Cpt = String.fromCharCode, Ppt = dpt("String", "fromCodePoint"), Mpt = parseInt, ys = hr("".charAt), Fw = hr([].join), fe = hr([].push), yR = hr("".replace), Npt = hr([].shift), Lw = hr([].splice), kw = hr("".split), mR = hr("".slice), Dpt = hr(/./.exec), Fpt = /\+/g, Pf = "�", Lpt = /^[0-9a-f]+$/i, Bw = function(t, r) {
  var e = mR(t, r, r + 2);
  return Dpt(Lpt, e) ? Mpt(e, 16) : NaN;
}, kpt = function(t) {
  for (var r = 0, e = 128; e > 0 && t & e; e >>= 1)
    r++;
  return r;
}, Bpt = function(t) {
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
}, jw = function(t) {
  t = yR(t, Fpt, " ");
  for (var r = t.length, e = "", n = 0; n < r; ) {
    var a = ys(t, n);
    if (a === "%") {
      if (ys(t, n + 1) === "%" || n + 3 > r) {
        e += "%", n++;
        continue;
      }
      var i = Bw(t, n + 1);
      if (i !== i) {
        e += a, n++;
        continue;
      }
      n += 2;
      var o = kpt(i);
      if (o === 0)
        a = Cpt(i);
      else {
        if (o === 1 || o > 4) {
          e += Pf, n++;
          continue;
        }
        for (var s = [i], u = 1; u < o && (n++, !(n + 3 > r || ys(t, n) !== "%")); ) {
          var l = Bw(t, n + 1);
          if (l !== l) {
            n += 3;
            break;
          }
          if (l > 191 || l < 128)
            break;
          fe(s, l), n += 2, u++;
        }
        if (s.length !== o) {
          e += Pf;
          continue;
        }
        var c = Bpt(s);
        c === null ? e += Pf : a = Ppt(c);
      }
    }
    e += a, n++;
  }
  return e;
}, jpt = /[!'()~]|%20/g, Upt = {
  "!": "%21",
  "'": "%27",
  "(": "%28",
  ")": "%29",
  "~": "%7E",
  "%20": "+"
}, zpt = function(t) {
  return Upt[t];
}, Uw = function(t) {
  return yR(_pt(t), jpt, zpt);
}, Mf = ypt(function(r, e) {
  $R(this, {
    type: pR,
    target: Jt(r).entries,
    index: 0,
    kind: e
  });
}, ya, function() {
  var r = Apt(this), e = r.target, n = r.index++;
  if (!e || n >= e.length)
    return r.target = null, Yo(void 0, !0);
  var a = e[n];
  switch (r.kind) {
    case "keys":
      return Yo(a.key, !1);
    case "values":
      return Yo(a.value, !1);
  }
  return Yo([a.key, a.value], !1);
}, !0), bR = function(t) {
  this.entries = [], this.url = null, t !== void 0 && (gR(t) ? this.parseObject(t) : this.parseQuery(typeof t == "string" ? ys(t, 0) === "?" ? mR(t, 1) : t : Ot(t)));
};
bR.prototype = {
  type: ya,
  bindURL: function(t) {
    this.url = t, this.update();
  },
  parseObject: function(t) {
    var r = this.entries, e = Ept(t), n, a, i, o, s, u, l;
    if (e)
      for (n = Mw(t, e), a = n.next; !(i = qo(a, n)).done; ) {
        if (o = Mw(Spt(i.value)), s = o.next, (u = qo(s, o)).done || (l = qo(s, o)).done || !qo(s, o).done)
          throw new Rpt("Expected sequence with length 2");
        fe(r, { key: Ot(u.value), value: Ot(l.value) });
      }
    else
      for (var c in t)
        mpt(t, c) && fe(r, { key: c, value: Ot(t[c]) });
  },
  parseQuery: function(t) {
    if (t)
      for (var r = this.entries, e = kw(t, "&"), n = 0, a, i; n < e.length; )
        a = e[n++], a.length && (i = kw(a, "="), fe(r, {
          key: jw(Npt(i)),
          value: jw(Fw(i, "="))
        }));
  },
  serialize: function() {
    for (var t = this.entries, r = [], e = 0, n; e < t.length; )
      n = t[e++], fe(r, Uw(n.key) + "=" + Uw(n.value));
    return Fw(r, "&");
  },
  update: function() {
    this.entries.length = 0, this.parseQuery(this.url.query);
  },
  updateURL: function() {
    this.url && this.url.update();
  }
};
var $l = function() {
  dR(this, Jn);
  var r = arguments.length > 0 ? arguments[0] : void 0, e = $R(this, new bR(r));
  ri || (this.size = e.entries.length);
}, Jn = $l.prototype;
ppt(Jn, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function(r, e) {
    var n = Jt(this);
    fn(arguments.length, 2), fe(n.entries, { key: Ot(r), value: Ot(e) }), ri || this.length++, n.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  delete: function(t) {
    for (var r = Jt(this), e = fn(arguments.length, 1), n = r.entries, a = Ot(t), i = e < 2 ? void 0 : arguments[1], o = i === void 0 ? i : Ot(i), s = 0; s < n.length; ) {
      var u = n[s];
      if (u.key === a && (o === void 0 || u.value === o)) {
        if (Lw(n, s, 1), o !== void 0)
          break;
      } else
        s++;
    }
    ri || (this.size = n.length), r.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function(r) {
    var e = Jt(this).entries;
    fn(arguments.length, 1);
    for (var n = Ot(r), a = 0; a < e.length; a++)
      if (e[a].key === n)
        return e[a].value;
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function(r) {
    var e = Jt(this).entries;
    fn(arguments.length, 1);
    for (var n = Ot(r), a = [], i = 0; i < e.length; i++)
      e[i].key === n && fe(a, e[i].value);
    return a;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function(r) {
    for (var e = Jt(this).entries, n = fn(arguments.length, 1), a = Ot(r), i = n < 2 ? void 0 : arguments[1], o = i === void 0 ? i : Ot(i), s = 0; s < e.length; ) {
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
    fn(arguments.length, 1);
    for (var a = n.entries, i = !1, o = Ot(r), s = Ot(e), u = 0, l; u < a.length; u++)
      l = a[u], l.key === o && (i ? Lw(a, u--, 1) : (i = !0, l.value = s));
    i || fe(a, { key: o, value: s }), ri || (this.size = a.length), n.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function() {
    var r = Jt(this);
    Ipt(r.entries, function(e, n) {
      return e.key > n.key ? 1 : -1;
    }), r.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function(r) {
    for (var e = Jt(this).entries, n = bpt(r, arguments.length > 1 ? arguments[1] : void 0), a = 0, i; a < e.length; )
      i = e[a++], n(i.value, i.key, this);
  },
  // `URLSearchParams.prototype.keys` method
  keys: function() {
    return new Mf(this, "keys");
  },
  // `URLSearchParams.prototype.values` method
  values: function() {
    return new Mf(this, "values");
  },
  // `URLSearchParams.prototype.entries` method
  entries: function() {
    return new Mf(this, "entries");
  }
}, { enumerable: !0 });
hR(Jn, Opt, Jn.entries, { name: "entries" });
hR(Jn, "toString", function() {
  return Jt(this).serialize();
}, { enumerable: !0 });
ri && gpt(Jn, "size", {
  get: function() {
    return Jt(this).entries.length;
  },
  configurable: !0,
  enumerable: !0
});
$pt($l, ya);
Eh({ global: !0, constructor: !0, forced: !vR }, {
  URLSearchParams: $l
});
if (!vR && _f(ei)) {
  var Vpt = hr(Dw.has), Hpt = hr(Dw.set), zw = function(t) {
    if (gR(t)) {
      var r = t.body, e;
      if (wpt(r) === ya)
        return e = t.headers ? new ei(t.headers) : new ei(), Vpt(e, "content-type") || Hpt(e, "content-type", "application/x-www-form-urlencoded;charset=UTF-8"), xpt(t, {
          body: Pw(0, Ot(r)),
          headers: Pw(0, e)
        });
    }
    return t;
  };
  if (_f(Nw) && Eh({ global: !0, enumerable: !0, dontCallGetSet: !0, forced: !0 }, {
    fetch: function(r) {
      return Nw(r, arguments.length > 1 ? zw(arguments[1]) : {});
    }
  }), _f(ou)) {
    var Nf = function(r) {
      return dR(this, Cf), new ou(r, arguments.length > 1 ? zw(arguments[1]) : {});
    };
    Cf.constructor = Nf, Nf.prototype = Cf, Eh({ global: !0, constructor: !0, dontCallGetSet: !0, forced: !0 }, {
      Request: Nf
    });
  }
}
var Gpt = {
  URLSearchParams: $l,
  getState: Jt
}, Wpt = g, Vg = U, qpt = pl, Hg = D, Vw = pr, ar = A, su = ct, Yt = dt, Ypt = $r, Th = Q, Gg = uI, vn = wE, or = rr, Kpt = al.codeAt, Xpt = hpt, Lr = G, Jpt = Lt, Zpt = nr, wR = Gpt, SR = ht, Qpt = SR.set, uu = SR.getterFor("URL"), t$t = wR.URLSearchParams, r$t = wR.getState, La = Hg.URL, Ih = Hg.TypeError, lu = Hg.parseInt, e$t = Math.floor, Hw = Math.pow, Zt = ar("".charAt), fr = ar(/./.exec), Wa = ar([].join), n$t = ar(1 .toString), a$t = ar([].pop), yn = ar([].push), Df = ar("".replace), i$t = ar([].shift), o$t = ar("".split), ni = ar("".slice), cu = ar("".toLowerCase), s$t = ar([].unshift), u$t = "Invalid authority", Ff = "Invalid scheme", Re = "Invalid host", Gw = "Invalid port", xR = /[a-z]/i, l$t = /[\d+-.a-z]/i, Oh = /\d/, c$t = /^0x/i, f$t = /^[0-7]+$/, v$t = /^\d+$/, ER = /^[\da-f]+$/i, h$t = /[\0\t\n\r #%/:<>?@[\\\]^|]/, d$t = /[\0\t\n\r #/:<>?@[\\\]^|]/, g$t = /^[\u0000-\u0020]+/, p$t = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/, $$t = /[\t\n\r]/g, Kt, y$t = function(t) {
  var r = o$t(t, "."), e, n, a, i, o, s, u;
  if (r.length && r[r.length - 1] === "" && r.length--, e = r.length, e > 4)
    return t;
  for (n = [], a = 0; a < e; a++) {
    if (i = r[a], i === "")
      return t;
    if (o = 10, i.length > 1 && Zt(i, 0) === "0" && (o = fr(c$t, i) ? 16 : 8, i = ni(i, o === 8 ? 1 : 2)), i === "")
      s = 0;
    else {
      if (!fr(o === 10 ? v$t : o === 8 ? f$t : ER, i))
        return t;
      s = lu(i, o);
    }
    yn(n, s);
  }
  for (a = 0; a < e; a++)
    if (s = n[a], a === e - 1) {
      if (s >= Hw(256, 5 - e))
        return null;
    } else if (s > 255)
      return null;
  for (u = a$t(n), a = 0; a < n.length; a++)
    u += n[a] * Hw(256, 3 - a);
  return u;
}, m$t = function(t) {
  var r = [0, 0, 0, 0, 0, 0, 0, 0], e = 0, n = null, a = 0, i, o, s, u, l, c, f, v = function() {
    return Zt(t, a);
  };
  if (v() === ":") {
    if (Zt(t, 1) !== ":")
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
    for (i = o = 0; o < 4 && fr(ER, v()); )
      i = i * 16 + lu(v(), 16), a++, o++;
    if (v() === ".") {
      if (o === 0 || (a -= o, e > 6))
        return;
      for (s = 0; v(); ) {
        if (u = null, s > 0)
          if (v() === "." && s < 4)
            a++;
          else
            return;
        if (!fr(Oh, v()))
          return;
        for (; fr(Oh, v()); ) {
          if (l = lu(v(), 10), u === null)
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
    } else if (v() === ":") {
      if (a++, !v())
        return;
    } else if (v())
      return;
    r[e++] = i;
  }
  if (n !== null)
    for (c = e - n, e = 7; e !== 0 && c > 0; )
      f = r[e], r[e--] = r[n + c - 1], r[n + --c] = f;
  else if (e !== 8)
    return;
  return r;
}, b$t = function(t) {
  for (var r = null, e = 1, n = null, a = 0, i = 0; i < 8; i++)
    t[i] !== 0 ? (a > e && (r = n, e = a), n = null, a = 0) : (n === null && (n = i), ++a);
  return a > e ? n : r;
}, ka = function(t) {
  var r, e, n, a;
  if (typeof t == "number") {
    for (r = [], e = 0; e < 4; e++)
      s$t(r, t % 256), t = e$t(t / 256);
    return Wa(r, ".");
  }
  if (typeof t == "object") {
    for (r = "", n = b$t(t), e = 0; e < 8; e++)
      a && t[e] === 0 || (a && (a = !1), n === e ? (r += e ? ":" : "::", a = !0) : (r += n$t(t[e], 16), e < 7 && (r += ":")));
    return "[" + r + "]";
  }
  return t;
}, ms = {}, TR = Gg({}, ms, {
  " ": 1,
  '"': 1,
  "<": 1,
  ">": 1,
  "`": 1
}), IR = Gg({}, TR, {
  "#": 1,
  "?": 1,
  "{": 1,
  "}": 1
}), Lf = Gg({}, IR, {
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
  var e = Kpt(t, 0);
  return e > 32 && e < 127 && !Th(r, t) ? t : encodeURIComponent(t);
}, Ko = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
}, qa = function(t, r) {
  var e;
  return t.length === 2 && fr(xR, Zt(t, 0)) && ((e = Zt(t, 1)) === ":" || !r && e === "|");
}, Ww = function(t) {
  var r;
  return t.length > 1 && qa(ni(t, 0, 2)) && (t.length === 2 || (r = Zt(t, 2)) === "/" || r === "\\" || r === "?" || r === "#");
}, w$t = function(t) {
  return t === "." || cu(t) === "%2e";
}, S$t = function(t) {
  return t = cu(t), t === ".." || t === "%2e." || t === ".%2e" || t === "%2e%2e";
}, kf = {}, qw = {}, Bf = {}, Yw = {}, Kw = {}, jf = {}, Xw = {}, Jw = {}, Xo = {}, Jo = {}, Uf = {}, zf = {}, Vf = {}, Hf = {}, Zw = {}, Gf = {}, hn = {}, Sr = {}, Qw = {}, _e = {}, Fr = {}, Wg = function(t, r, e) {
  var n = Lr(t), a, i, o;
  if (r) {
    if (i = this.parse(n), i)
      throw new Ih(i);
    this.searchParams = null;
  } else {
    if (e !== void 0 && (a = new Wg(e, !0)), i = this.parse(n, null, a), i)
      throw new Ih(i);
    o = r$t(new t$t()), o.bindURL(this), this.searchParams = o;
  }
};
Wg.prototype = {
  type: "URL",
  // https://url.spec.whatwg.org/#url-parsing
  // eslint-disable-next-line max-statements -- TODO
  parse: function(t, r, e) {
    var n = this, a = r || kf, i = 0, o = "", s = !1, u = !1, l = !1, c, f, v, h;
    for (t = Lr(t), r || (n.scheme = "", n.username = "", n.password = "", n.host = null, n.port = null, n.path = [], n.query = null, n.fragment = null, n.cannotBeABaseURL = !1, t = Df(t, g$t, ""), t = Df(t, p$t, "$1")), t = Df(t, $$t, ""), c = vn(t); i <= c.length; ) {
      switch (f = c[i], a) {
        case kf:
          if (f && fr(xR, f))
            o += cu(f), a = qw;
          else {
            if (r)
              return Ff;
            a = Bf;
            continue;
          }
          break;
        case qw:
          if (f && (fr(l$t, f) || f === "+" || f === "-" || f === "."))
            o += cu(f);
          else if (f === ":") {
            if (r && (n.isSpecial() !== Th(Ko, o) || o === "file" && (n.includesCredentials() || n.port !== null) || n.scheme === "file" && !n.host))
              return;
            if (n.scheme = o, r) {
              n.isSpecial() && Ko[n.scheme] === n.port && (n.port = null);
              return;
            }
            o = "", n.scheme === "file" ? a = Hf : n.isSpecial() && e && e.scheme === n.scheme ? a = Yw : n.isSpecial() ? a = Jw : c[i + 1] === "/" ? (a = Kw, i++) : (n.cannotBeABaseURL = !0, yn(n.path, ""), a = Qw);
          } else {
            if (r)
              return Ff;
            o = "", a = Bf, i = 0;
            continue;
          }
          break;
        case Bf:
          if (!e || e.cannotBeABaseURL && f !== "#")
            return Ff;
          if (e.cannotBeABaseURL && f === "#") {
            n.scheme = e.scheme, n.path = or(e.path), n.query = e.query, n.fragment = "", n.cannotBeABaseURL = !0, a = Fr;
            break;
          }
          a = e.scheme === "file" ? Hf : jf;
          continue;
        case Yw:
          if (f === "/" && c[i + 1] === "/")
            a = Xo, i++;
          else {
            a = jf;
            continue;
          }
          break;
        case Kw:
          if (f === "/") {
            a = Jo;
            break;
          } else {
            a = Sr;
            continue;
          }
        case jf:
          if (n.scheme = e.scheme, f === Kt)
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, n.path = or(e.path), n.query = e.query;
          else if (f === "/" || f === "\\" && n.isSpecial())
            a = Xw;
          else if (f === "?")
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, n.path = or(e.path), n.query = "", a = _e;
          else if (f === "#")
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, n.path = or(e.path), n.query = e.query, n.fragment = "", a = Fr;
          else {
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, n.path = or(e.path), n.path.length--, a = Sr;
            continue;
          }
          break;
        case Xw:
          if (n.isSpecial() && (f === "/" || f === "\\"))
            a = Xo;
          else if (f === "/")
            a = Jo;
          else {
            n.username = e.username, n.password = e.password, n.host = e.host, n.port = e.port, a = Sr;
            continue;
          }
          break;
        case Jw:
          if (a = Xo, f !== "/" || Zt(o, i + 1) !== "/")
            continue;
          i++;
          break;
        case Xo:
          if (f !== "/" && f !== "\\") {
            a = Jo;
            continue;
          }
          break;
        case Jo:
          if (f === "@") {
            s && (o = "%40" + o), s = !0, v = vn(o);
            for (var d = 0; d < v.length; d++) {
              var $ = v[d];
              if ($ === ":" && !l) {
                l = !0;
                continue;
              }
              var y = oe($, Lf);
              l ? n.password += y : n.username += y;
            }
            o = "";
          } else if (f === Kt || f === "/" || f === "?" || f === "#" || f === "\\" && n.isSpecial()) {
            if (s && o === "")
              return u$t;
            i -= vn(o).length + 1, o = "", a = Uf;
          } else
            o += f;
          break;
        case Uf:
        case zf:
          if (r && n.scheme === "file") {
            a = Gf;
            continue;
          } else if (f === ":" && !u) {
            if (o === "")
              return Re;
            if (h = n.parseHost(o), h)
              return h;
            if (o = "", a = Vf, r === zf)
              return;
          } else if (f === Kt || f === "/" || f === "?" || f === "#" || f === "\\" && n.isSpecial()) {
            if (n.isSpecial() && o === "")
              return Re;
            if (r && o === "" && (n.includesCredentials() || n.port !== null))
              return;
            if (h = n.parseHost(o), h)
              return h;
            if (o = "", a = hn, r)
              return;
            continue;
          } else
            f === "[" ? u = !0 : f === "]" && (u = !1), o += f;
          break;
        case Vf:
          if (fr(Oh, f))
            o += f;
          else if (f === Kt || f === "/" || f === "?" || f === "#" || f === "\\" && n.isSpecial() || r) {
            if (o !== "") {
              var p = lu(o, 10);
              if (p > 65535)
                return Gw;
              n.port = n.isSpecial() && p === Ko[n.scheme] ? null : p, o = "";
            }
            if (r)
              return;
            a = hn;
            continue;
          } else
            return Gw;
          break;
        case Hf:
          if (n.scheme = "file", f === "/" || f === "\\")
            a = Zw;
          else if (e && e.scheme === "file")
            switch (f) {
              case Kt:
                n.host = e.host, n.path = or(e.path), n.query = e.query;
                break;
              case "?":
                n.host = e.host, n.path = or(e.path), n.query = "", a = _e;
                break;
              case "#":
                n.host = e.host, n.path = or(e.path), n.query = e.query, n.fragment = "", a = Fr;
                break;
              default:
                Ww(Wa(or(c, i), "")) || (n.host = e.host, n.path = or(e.path), n.shortenPath()), a = Sr;
                continue;
            }
          else {
            a = Sr;
            continue;
          }
          break;
        case Zw:
          if (f === "/" || f === "\\") {
            a = Gf;
            break;
          }
          e && e.scheme === "file" && !Ww(Wa(or(c, i), "")) && (qa(e.path[0], !0) ? yn(n.path, e.path[0]) : n.host = e.host), a = Sr;
          continue;
        case Gf:
          if (f === Kt || f === "/" || f === "\\" || f === "?" || f === "#") {
            if (!r && qa(o))
              a = Sr;
            else if (o === "") {
              if (n.host = "", r)
                return;
              a = hn;
            } else {
              if (h = n.parseHost(o), h)
                return h;
              if (n.host === "localhost" && (n.host = ""), r)
                return;
              o = "", a = hn;
            }
            continue;
          } else
            o += f;
          break;
        case hn:
          if (n.isSpecial()) {
            if (a = Sr, f !== "/" && f !== "\\")
              continue;
          } else if (!r && f === "?")
            n.query = "", a = _e;
          else if (!r && f === "#")
            n.fragment = "", a = Fr;
          else if (f !== Kt && (a = Sr, f !== "/"))
            continue;
          break;
        case Sr:
          if (f === Kt || f === "/" || f === "\\" && n.isSpecial() || !r && (f === "?" || f === "#")) {
            if (S$t(o) ? (n.shortenPath(), f !== "/" && !(f === "\\" && n.isSpecial()) && yn(n.path, "")) : w$t(o) ? f !== "/" && !(f === "\\" && n.isSpecial()) && yn(n.path, "") : (n.scheme === "file" && !n.path.length && qa(o) && (n.host && (n.host = ""), o = Zt(o, 0) + ":"), yn(n.path, o)), o = "", n.scheme === "file" && (f === Kt || f === "?" || f === "#"))
              for (; n.path.length > 1 && n.path[0] === ""; )
                i$t(n.path);
            f === "?" ? (n.query = "", a = _e) : f === "#" && (n.fragment = "", a = Fr);
          } else
            o += oe(f, IR);
          break;
        case Qw:
          f === "?" ? (n.query = "", a = _e) : f === "#" ? (n.fragment = "", a = Fr) : f !== Kt && (n.path[0] += oe(f, ms));
          break;
        case _e:
          !r && f === "#" ? (n.fragment = "", a = Fr) : f !== Kt && (f === "'" && n.isSpecial() ? n.query += "%27" : f === "#" ? n.query += "%23" : n.query += oe(f, ms));
          break;
        case Fr:
          f !== Kt && (n.fragment += oe(f, TR));
          break;
      }
      i++;
    }
  },
  // https://url.spec.whatwg.org/#host-parsing
  parseHost: function(t) {
    var r, e, n;
    if (Zt(t, 0) === "[") {
      if (Zt(t, t.length - 1) !== "]" || (r = m$t(ni(t, 1, -1)), !r))
        return Re;
      this.host = r;
    } else if (this.isSpecial()) {
      if (t = Xpt(t), fr(h$t, t) || (r = y$t(t), r === null))
        return Re;
      this.host = r;
    } else {
      if (fr(d$t, t))
        return Re;
      for (r = "", e = vn(t), n = 0; n < e.length; n++)
        r += oe(e[n], ms);
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
    return Th(Ko, this.scheme);
  },
  // https://url.spec.whatwg.org/#shorten-a-urls-path
  shortenPath: function() {
    var t = this.path, r = t.length;
    r && (this.scheme !== "file" || r !== 1 || !qa(t[0], !0)) && t.length--;
  },
  // https://url.spec.whatwg.org/#concept-url-serializer
  serialize: function() {
    var t = this, r = t.scheme, e = t.username, n = t.password, a = t.host, i = t.port, o = t.path, s = t.query, u = t.fragment, l = r + ":";
    return a !== null ? (l += "//", t.includesCredentials() && (l += e + (n ? ":" + n : "") + "@"), l += ka(a), i !== null && (l += ":" + i)) : r === "file" && (l += "//"), l += t.cannotBeABaseURL ? o[0] : o.length ? "/" + Wa(o, "/") : "", s !== null && (l += "?" + s), u !== null && (l += "#" + u), l;
  },
  // https://url.spec.whatwg.org/#dom-url-href
  setHref: function(t) {
    var r = this.parse(t);
    if (r)
      throw new Ih(r);
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-origin
  getOrigin: function() {
    var t = this.scheme, r = this.port;
    if (t === "blob")
      try {
        return new Zn(t.path[0]).origin;
      } catch {
        return "null";
      }
    return t === "file" || !this.isSpecial() ? "null" : t + "://" + ka(this.host) + (r !== null ? ":" + r : "");
  },
  // https://url.spec.whatwg.org/#dom-url-protocol
  getProtocol: function() {
    return this.scheme + ":";
  },
  setProtocol: function(t) {
    this.parse(Lr(t) + ":", kf);
  },
  // https://url.spec.whatwg.org/#dom-url-username
  getUsername: function() {
    return this.username;
  },
  setUsername: function(t) {
    var r = vn(Lr(t));
    if (!this.cannotHaveUsernamePasswordPort()) {
      this.username = "";
      for (var e = 0; e < r.length; e++)
        this.username += oe(r[e], Lf);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-password
  getPassword: function() {
    return this.password;
  },
  setPassword: function(t) {
    var r = vn(Lr(t));
    if (!this.cannotHaveUsernamePasswordPort()) {
      this.password = "";
      for (var e = 0; e < r.length; e++)
        this.password += oe(r[e], Lf);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-host
  getHost: function() {
    var t = this.host, r = this.port;
    return t === null ? "" : r === null ? ka(t) : ka(t) + ":" + r;
  },
  setHost: function(t) {
    this.cannotBeABaseURL || this.parse(t, Uf);
  },
  // https://url.spec.whatwg.org/#dom-url-hostname
  getHostname: function() {
    var t = this.host;
    return t === null ? "" : ka(t);
  },
  setHostname: function(t) {
    this.cannotBeABaseURL || this.parse(t, zf);
  },
  // https://url.spec.whatwg.org/#dom-url-port
  getPort: function() {
    var t = this.port;
    return t === null ? "" : Lr(t);
  },
  setPort: function(t) {
    this.cannotHaveUsernamePasswordPort() || (t = Lr(t), t === "" ? this.port = null : this.parse(t, Vf));
  },
  // https://url.spec.whatwg.org/#dom-url-pathname
  getPathname: function() {
    var t = this.path;
    return this.cannotBeABaseURL ? t[0] : t.length ? "/" + Wa(t, "/") : "";
  },
  setPathname: function(t) {
    this.cannotBeABaseURL || (this.path = [], this.parse(t, hn));
  },
  // https://url.spec.whatwg.org/#dom-url-search
  getSearch: function() {
    var t = this.query;
    return t ? "?" + t : "";
  },
  setSearch: function(t) {
    t = Lr(t), t === "" ? this.query = null : (Zt(t, 0) === "?" && (t = ni(t, 1)), this.query = "", this.parse(t, _e)), this.searchParams.update();
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
    if (t = Lr(t), t === "") {
      this.fragment = null;
      return;
    }
    Zt(t, 0) === "#" && (t = ni(t, 1)), this.fragment = "", this.parse(t, Fr);
  },
  update: function() {
    this.query = this.searchParams.serialize() || null;
  }
};
var Zn = function(r) {
  var e = Ypt(this, It), n = Zpt(arguments.length, 1) > 1 ? arguments[1] : void 0, a = Qpt(e, new Wg(r, !1, n));
  Vg || (e.href = a.serialize(), e.origin = a.getOrigin(), e.protocol = a.getProtocol(), e.username = a.getUsername(), e.password = a.getPassword(), e.host = a.getHost(), e.hostname = a.getHostname(), e.port = a.getPort(), e.pathname = a.getPathname(), e.search = a.getSearch(), e.searchParams = a.getSearchParams(), e.hash = a.getHash());
}, It = Zn.prototype, Xt = function(t, r) {
  return {
    get: function() {
      return uu(this)[t]();
    },
    set: r && function(e) {
      return uu(this)[r](e);
    },
    configurable: !0,
    enumerable: !0
  };
};
Vg && (Yt(It, "href", Xt("serialize", "setHref")), Yt(It, "origin", Xt("getOrigin")), Yt(It, "protocol", Xt("getProtocol", "setProtocol")), Yt(It, "username", Xt("getUsername", "setUsername")), Yt(It, "password", Xt("getPassword", "setPassword")), Yt(It, "host", Xt("getHost", "setHost")), Yt(It, "hostname", Xt("getHostname", "setHostname")), Yt(It, "port", Xt("getPort", "setPort")), Yt(It, "pathname", Xt("getPathname", "setPathname")), Yt(It, "search", Xt("getSearch", "setSearch")), Yt(It, "searchParams", Xt("getSearchParams")), Yt(It, "hash", Xt("getHash", "setHash")));
su(It, "toJSON", function() {
  return uu(this).serialize();
}, { enumerable: !0 });
su(It, "toString", function() {
  return uu(this).serialize();
}, { enumerable: !0 });
if (La) {
  var tS = La.createObjectURL, rS = La.revokeObjectURL;
  tS && su(Zn, "createObjectURL", Vw(tS, La)), rS && su(Zn, "revokeObjectURL", Vw(rS, La));
}
Jpt(Zn, "URL");
Wpt({ global: !0, constructor: !0, forced: !qpt, sham: !Vg }, {
  URL: Zn
});
var x$t = g, E$t = ot, OR = O, T$t = nr, eS = G, I$t = pl, qg = E$t("URL"), O$t = I$t && OR(function() {
  qg.canParse();
}), A$t = OR(function() {
  return qg.canParse.length !== 1;
});
x$t({ target: "URL", stat: !0, forced: !O$t || A$t }, {
  canParse: function(r) {
    var e = T$t(arguments.length, 1), n = eS(r), a = e < 2 || arguments[1] === void 0 ? void 0 : eS(arguments[1]);
    try {
      return !!new qg(n, a);
    } catch {
      return !1;
    }
  }
});
var R$t = g, _$t = ot, C$t = nr, nS = G, P$t = pl, M$t = _$t("URL");
R$t({ target: "URL", stat: !0, forced: !P$t }, {
  parse: function(r) {
    var e = C$t(arguments.length, 1), n = nS(r), a = e < 2 || arguments[1] === void 0 ? void 0 : nS(arguments[1]);
    try {
      return new M$t(n, a);
    } catch {
      return null;
    }
  }
});
var N$t = g, D$t = z;
N$t({ target: "URL", proto: !0, enumerable: !0 }, {
  toJSON: function() {
    return D$t(URL.prototype.toString, this);
  }
});
var F$t = ct, yl = A, aS = G, L$t = nr, AR = URLSearchParams, ml = AR.prototype, k$t = yl(ml.append), iS = yl(ml.delete), B$t = yl(ml.forEach), j$t = yl([].push), Yg = new AR("a=1&a=2&b=3");
Yg.delete("a", 1);
Yg.delete("b", void 0);
Yg + "" != "a=2" && F$t(ml, "delete", function(t) {
  var r = arguments.length, e = r < 2 ? void 0 : arguments[1];
  if (r && e === void 0)
    return iS(this, t);
  var n = [];
  B$t(this, function(f, v) {
    j$t(n, { key: v, value: f });
  }), L$t(r, 1);
  for (var a = aS(t), i = aS(e), o = 0, s = 0, u = !1, l = n.length, c; o < l; )
    c = n[o++], u || c.key === a ? (u = !0, iS(this, c.key)) : s++;
  for (; s < l; )
    c = n[s++], c.key === a && c.value === i || k$t(this, c.key, c.value);
}, { enumerable: !0, unsafe: !0 });
var U$t = ct, RR = A, z$t = G, V$t = nr, _R = URLSearchParams, Kg = _R.prototype, H$t = RR(Kg.getAll), G$t = RR(Kg.has), oS = new _R("a=1");
(oS.has("a", 2) || !oS.has("a", void 0)) && U$t(Kg, "has", function(r) {
  var e = arguments.length, n = e < 2 ? void 0 : arguments[1];
  if (e && n === void 0)
    return G$t(this, r);
  var a = H$t(this, r);
  V$t(e, 1);
  for (var i = z$t(n), o = 0; o < a.length; )
    if (a[o++] === i)
      return !0;
  return !1;
}, { enumerable: !0, unsafe: !0 });
var W$t = U, q$t = A, Y$t = dt, Ah = URLSearchParams.prototype, K$t = q$t(Ah.forEach);
W$t && !("size" in Ah) && Y$t(Ah, "size", {
  get: function() {
    var r = 0;
    return K$t(this, function() {
      r++;
    }), r;
  },
  configurable: !0,
  enumerable: !0
});
var X$t = { exports: {} };
(function(t) {
  var r = function(e) {
    var n = Object.prototype, a = n.hasOwnProperty, i = Object.defineProperty || function(S, x, b) {
      S[x] = b.value;
    }, o, s = typeof Symbol == "function" ? Symbol : {}, u = s.iterator || "@@iterator", l = s.asyncIterator || "@@asyncIterator", c = s.toStringTag || "@@toStringTag";
    function f(S, x, b) {
      return Object.defineProperty(S, x, {
        value: b,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), S[x];
    }
    try {
      f({}, "");
    } catch {
      f = function(x, b, I) {
        return x[b] = I;
      };
    }
    function v(S, x, b, I) {
      var C = x && x.prototype instanceof T ? x : T, k = Object.create(C.prototype), H = new E(I || []);
      return i(k, "_invoke", { value: q(S, b, H) }), k;
    }
    e.wrap = v;
    function h(S, x, b) {
      try {
        return { type: "normal", arg: S.call(x, b) };
      } catch (I) {
        return { type: "throw", arg: I };
      }
    }
    var d = "suspendedStart", $ = "suspendedYield", y = "executing", p = "completed", w = {};
    function T() {
    }
    function R() {
    }
    function M() {
    }
    var L = {};
    f(L, u, function() {
      return this;
    });
    var V = Object.getPrototypeOf, W = V && V(V(P([])));
    W && W !== n && a.call(W, u) && (L = W);
    var J = M.prototype = T.prototype = Object.create(L);
    R.prototype = M, i(J, "constructor", { value: M, configurable: !0 }), i(
      M,
      "constructor",
      { value: R, configurable: !0 }
    ), R.displayName = f(
      M,
      c,
      "GeneratorFunction"
    );
    function rt(S) {
      ["next", "throw", "return"].forEach(function(x) {
        f(S, x, function(b) {
          return this._invoke(x, b);
        });
      });
    }
    e.isGeneratorFunction = function(S) {
      var x = typeof S == "function" && S.constructor;
      return x ? x === R || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (x.displayName || x.name) === "GeneratorFunction" : !1;
    }, e.mark = function(S) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(S, M) : (S.__proto__ = M, f(S, c, "GeneratorFunction")), S.prototype = Object.create(J), S;
    }, e.awrap = function(S) {
      return { __await: S };
    };
    function F(S, x) {
      function b(k, H, nt, at) {
        var it = h(S[k], S, H);
        if (it.type === "throw")
          at(it.arg);
        else {
          var ir = it.arg, ee = ir.value;
          return ee && typeof ee == "object" && a.call(ee, "__await") ? x.resolve(ee.__await).then(function(mr) {
            b("next", mr, nt, at);
          }, function(mr) {
            b("throw", mr, nt, at);
          }) : x.resolve(ee).then(function(mr) {
            ir.value = mr, nt(ir);
          }, function(mr) {
            return b("throw", mr, nt, at);
          });
        }
      }
      var I;
      function C(k, H) {
        function nt() {
          return new x(function(at, it) {
            b(k, H, at, it);
          });
        }
        return I = // If enqueue has been called before, then we want to wait until
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
        I ? I.then(
          nt,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          nt
        ) : nt();
      }
      i(this, "_invoke", { value: C });
    }
    rt(F.prototype), f(F.prototype, l, function() {
      return this;
    }), e.AsyncIterator = F, e.async = function(S, x, b, I, C) {
      C === void 0 && (C = Promise);
      var k = new F(
        v(S, x, b, I),
        C
      );
      return e.isGeneratorFunction(x) ? k : k.next().then(function(H) {
        return H.done ? H.value : k.next();
      });
    };
    function q(S, x, b) {
      var I = d;
      return function(k, H) {
        if (I === y)
          throw new Error("Generator is already running");
        if (I === p) {
          if (k === "throw")
            throw H;
          return B();
        }
        for (b.method = k, b.arg = H; ; ) {
          var nt = b.delegate;
          if (nt) {
            var at = N(nt, b);
            if (at) {
              if (at === w)
                continue;
              return at;
            }
          }
          if (b.method === "next")
            b.sent = b._sent = b.arg;
          else if (b.method === "throw") {
            if (I === d)
              throw I = p, b.arg;
            b.dispatchException(b.arg);
          } else
            b.method === "return" && b.abrupt("return", b.arg);
          I = y;
          var it = h(S, x, b);
          if (it.type === "normal") {
            if (I = b.done ? p : $, it.arg === w)
              continue;
            return {
              value: it.arg,
              done: b.done
            };
          } else
            it.type === "throw" && (I = p, b.method = "throw", b.arg = it.arg);
        }
      };
    }
    function N(S, x) {
      var b = x.method, I = S.iterator[b];
      if (I === o)
        return x.delegate = null, b === "throw" && S.iterator.return && (x.method = "return", x.arg = o, N(S, x), x.method === "throw") || b !== "return" && (x.method = "throw", x.arg = new TypeError(
          "The iterator does not provide a '" + b + "' method"
        )), w;
      var C = h(I, S.iterator, x.arg);
      if (C.type === "throw")
        return x.method = "throw", x.arg = C.arg, x.delegate = null, w;
      var k = C.arg;
      if (!k)
        return x.method = "throw", x.arg = new TypeError("iterator result is not an object"), x.delegate = null, w;
      if (k.done)
        x[S.resultName] = k.value, x.next = S.nextLoc, x.method !== "return" && (x.method = "next", x.arg = o);
      else
        return k;
      return x.delegate = null, w;
    }
    rt(J), f(J, c, "Generator"), f(J, u, function() {
      return this;
    }), f(J, "toString", function() {
      return "[object Generator]";
    });
    function m(S) {
      var x = { tryLoc: S[0] };
      1 in S && (x.catchLoc = S[1]), 2 in S && (x.finallyLoc = S[2], x.afterLoc = S[3]), this.tryEntries.push(x);
    }
    function _(S) {
      var x = S.completion || {};
      x.type = "normal", delete x.arg, S.completion = x;
    }
    function E(S) {
      this.tryEntries = [{ tryLoc: "root" }], S.forEach(m, this), this.reset(!0);
    }
    e.keys = function(S) {
      var x = Object(S), b = [];
      for (var I in x)
        b.push(I);
      return b.reverse(), function C() {
        for (; b.length; ) {
          var k = b.pop();
          if (k in x)
            return C.value = k, C.done = !1, C;
        }
        return C.done = !0, C;
      };
    };
    function P(S) {
      if (S) {
        var x = S[u];
        if (x)
          return x.call(S);
        if (typeof S.next == "function")
          return S;
        if (!isNaN(S.length)) {
          var b = -1, I = function C() {
            for (; ++b < S.length; )
              if (a.call(S, b))
                return C.value = S[b], C.done = !1, C;
            return C.value = o, C.done = !0, C;
          };
          return I.next = I;
        }
      }
      return { next: B };
    }
    e.values = P;
    function B() {
      return { value: o, done: !0 };
    }
    return E.prototype = {
      constructor: E,
      reset: function(S) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = o, this.done = !1, this.delegate = null, this.method = "next", this.arg = o, this.tryEntries.forEach(_), !S)
          for (var x in this)
            x.charAt(0) === "t" && a.call(this, x) && !isNaN(+x.slice(1)) && (this[x] = o);
      },
      stop: function() {
        this.done = !0;
        var S = this.tryEntries[0], x = S.completion;
        if (x.type === "throw")
          throw x.arg;
        return this.rval;
      },
      dispatchException: function(S) {
        if (this.done)
          throw S;
        var x = this;
        function b(at, it) {
          return k.type = "throw", k.arg = S, x.next = at, it && (x.method = "next", x.arg = o), !!it;
        }
        for (var I = this.tryEntries.length - 1; I >= 0; --I) {
          var C = this.tryEntries[I], k = C.completion;
          if (C.tryLoc === "root")
            return b("end");
          if (C.tryLoc <= this.prev) {
            var H = a.call(C, "catchLoc"), nt = a.call(C, "finallyLoc");
            if (H && nt) {
              if (this.prev < C.catchLoc)
                return b(C.catchLoc, !0);
              if (this.prev < C.finallyLoc)
                return b(C.finallyLoc);
            } else if (H) {
              if (this.prev < C.catchLoc)
                return b(C.catchLoc, !0);
            } else if (nt) {
              if (this.prev < C.finallyLoc)
                return b(C.finallyLoc);
            } else
              throw new Error("try statement without catch or finally");
          }
        }
      },
      abrupt: function(S, x) {
        for (var b = this.tryEntries.length - 1; b >= 0; --b) {
          var I = this.tryEntries[b];
          if (I.tryLoc <= this.prev && a.call(I, "finallyLoc") && this.prev < I.finallyLoc) {
            var C = I;
            break;
          }
        }
        C && (S === "break" || S === "continue") && C.tryLoc <= x && x <= C.finallyLoc && (C = null);
        var k = C ? C.completion : {};
        return k.type = S, k.arg = x, C ? (this.method = "next", this.next = C.finallyLoc, w) : this.complete(k);
      },
      complete: function(S, x) {
        if (S.type === "throw")
          throw S.arg;
        return S.type === "break" || S.type === "continue" ? this.next = S.arg : S.type === "return" ? (this.rval = this.arg = S.arg, this.method = "return", this.next = "end") : S.type === "normal" && x && (this.next = x), w;
      },
      finish: function(S) {
        for (var x = this.tryEntries.length - 1; x >= 0; --x) {
          var b = this.tryEntries[x];
          if (b.finallyLoc === S)
            return this.complete(b.completion, b.afterLoc), _(b), w;
        }
      },
      catch: function(S) {
        for (var x = this.tryEntries.length - 1; x >= 0; --x) {
          var b = this.tryEntries[x];
          if (b.tryLoc === S) {
            var I = b.completion;
            if (I.type === "throw") {
              var C = I.arg;
              _(b);
            }
            return C;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(S, x, b) {
        return this.delegate = {
          iterator: P(S),
          resultName: x,
          nextLoc: b
        }, this.method === "next" && (this.arg = o), w;
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
})(X$t);
class sS {
  constructor(r) {
    this.context = r;
  }
  renderLine(r, e, n, a, i, o) {
    this.context.lineWidth = i, this.context.moveTo(r, e), this.context.lineTo(n, a), this.context.strokeStyle = o, this.context.stroke();
  }
}
class syt {
  constructor(r, e, n, a, i = new Ap()) {
    this.tooltip = null, this.highlightedRow = -1, this.highlightedColumn = -1, this.animatingRows = !1, this.animatingCols = !1, this.clusteredHorizontal = !1, this.clusteredVertical = !1, this.lastZoomStatus = {
      k: 1,
      x: 0,
      y: 0
    }, this.settings = this.fillOptions(i), this.element = r;
    const o = new _p();
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
    }, this.currentViewPort = this.originalViewPort, this.textWidth = this.settings.initialTextWidth, this.textHeight = this.settings.initialTextHeight, this.element.innerHTML = "", this.visElement = vt(this.element).append("canvas").attr("width", this.pixelRatio * this.settings.width).attr("height", this.pixelRatio * this.settings.height).attr("style", `width: ${this.settings.width}px; height: ${this.settings.height}px`).on("mouseover", (u) => this.tooltipMove(u)).on("mousemove", (u) => this.tooltipMove(u)).on("mouseout", (u) => this.tooltipMove(u)).on("click", (u) => this.click(u)), this.context = this.visElement.node().getContext("2d"), this.context.scale(this.pixelRatio, this.pixelRatio);
    const s = rx().extent([[0, 0], [this.settings.width, this.settings.height]]).scaleExtent([0.25, 12]).on("zoom", (u) => {
      this.zoomed(u.transform);
    });
    this.visElement.call(s), this.computeClusterRoots(), this.redraw();
  }
  fillOptions(r = void 0) {
    let e = new Ap();
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
      let v;
      const h = (d) => {
        v === void 0 && (v = d);
        const $ = d - v, y = this.settings.transition($ / e);
        this.redraw(l, c, y), $ < e ? requestAnimationFrame(h) : f();
      };
      requestAnimationFrame(h);
    }), a = new _p();
    let i = Array.from(Array(this.rows.length).keys()), o = new Array(i.length);
    if ((r === "all" || r === "rows") && !this.clusteredVertical) {
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
    if ((r === "all" || r === "columns") && !this.clusteredHorizontal) {
      this.clusteredHorizontal = !0, s = this.determineOrder(this.colClusterRoot);
      for (const [v, h] of Object.entries(s))
        u[h] = Number.parseInt(v);
      const l = Array.from(Array(this.rows.length).keys());
      this.animatingCols = !0, await n(l, u), this.animatingCols = !1;
      let c = [];
      for (const v of l) {
        let h = [];
        for (const d of s)
          h.push(this.values[v][d]);
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
    let r = this.settings.clusteringAlgorithm, e = this.settings.reorderer, n = this.rows.map(
      (i, o) => new Rp(
        this.values[o].filter((s) => s.rowId == i.idx).map((s) => s.value),
        i.idx
      )
    );
    this.rowClusterRoot = e.reorder(r.cluster(n)), this.verticalNodesPerDepth = this.bfsNodesPerDepth(this.rowClusterRoot);
    let a = this.columns.map(
      (i, o) => new Rp(
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
        const w = p * (i + n), T = y * (i + n);
        o += `
                    <rect width="${i}" height="${i}" fill="${d}" x="${w}" y="${T}"></rect>
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
    const v = i * this.rows.length + n * (this.rows.length - 1) + a;
    let h = v;
    for (let d = 0; d < this.columns.length; d++) {
      const $ = (i + n) * d + c;
      o += `
                <text 
                    x="${$}" 
                    y="${v}" 
                    font-size="${r}" 
                    text-anchor="start" 
                    fill="black"
                    transform="rotate(90, ${$}, ${v})"
                    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
                >
                    ${this.columns[d].name}
                </text>
            `;
      const y = u.measureText(this.columns[d].name).width + v;
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
        const c = this.currentViewPort.xTop + i + l * (a + this.settings.squarePadding), f = this.currentViewPort.yTop + i + u * (a + this.settings.squarePadding), v = this.currentViewPort.xTop + i + e[l] * (a + this.settings.squarePadding), h = this.currentViewPort.yTop + i + r[u] * (a + this.settings.squarePadding), d = v - c, $ = h - f;
        let y = c + d * n, p = f + $ * n, w = y + (a + this.settings.squarePadding), T = p + (a + this.settings.squarePadding);
        w < 0 || y > this.settings.width || T < 0 || p > this.settings.height || (this.settings.highlightSelection && u == this.highlightedRow && l == this.highlightedColumn && (this.context.save(), this.context.fillStyle = this.settings.maxColor, this.context.fillRect(
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
      const c = this.currentViewPort.yTop + a + (n + this.settings.squarePadding) * u + s, v = this.currentViewPort.yTop + a + (n + this.settings.squarePadding) * r[u] + s - c, h = c + v * e;
      this.context.fillText(
        this.ellipsizeString(l.name, this.textWidth),
        o,
        h
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
      const c = -(this.currentViewPort.xTop + a + (n + this.settings.squarePadding) * u + s), v = -(this.currentViewPort.xTop + a + (n + this.settings.squarePadding) * r[u] + s) - c, h = c + v * e;
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
    return n === -1 || !e ? r ? this.settings.dendrogramColor : "#d3d3d3" : Mh(Be("#d3d3d3"), Be(this.settings.dendrogramColor))(n);
  }
  redrawVerticalDendrogram(r) {
    this.context.save();
    const e = this.computeDendrogramColor(this.clusteredVertical, this.animatingRows, r), n = this.determineSquareWidth(), a = this.settings.dendrogramWidth * this.lastZoomStatus.k, i = new sS(this.context), o = this.currentViewPort.yTop + a + n / 2, s = /* @__PURE__ */ new Map(), u = this.determineOrder(this.rowClusterRoot);
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
        const h = this.verticalNodesPerDepth[f][v], d = this.verticalNodesPerDepth[f][v + 1], $ = h.parent, [y, p] = s.get(h.id), [w, T] = s.get(d.id);
        if (this.context.beginPath(), i.renderLine(y, p, c, p, this.settings.dendrogramLineWidth, e), i.renderLine(w, T, c, T, this.settings.dendrogramLineWidth, e), i.renderLine(c, p, c, T, this.settings.dendrogramLineWidth, e), this.context.closePath(), $) {
          const R = Math.min(p, T) + Math.abs(p - T) / 2;
          s.set($.id, [c, R]);
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
  redrawHorizontalDendrogram(r) {
    this.context.save();
    const e = this.computeDendrogramColor(this.clusteredHorizontal, this.animatingCols, r), n = this.determineSquareWidth(), a = this.settings.dendrogramWidth * this.lastZoomStatus.k, i = new sS(this.context), o = this.currentViewPort.xTop + n / 2 + a, s = /* @__PURE__ */ new Map(), u = this.determineOrder(this.colClusterRoot);
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
        const h = this.horizontalNodesPerDepth[f][v], d = this.horizontalNodesPerDepth[f][v + 1], $ = h.parent, [y, p] = s.get(h.id), [w, T] = s.get(d.id);
        if (this.context.beginPath(), i.renderLine(y, p, y, c, this.settings.dendrogramLineWidth, e), i.renderLine(w, T, w, c, this.settings.dendrogramLineWidth, e), i.renderLine(y, c, w, c, this.settings.dendrogramLineWidth, e), this.context.closePath(), $) {
          const R = Math.min(y, w) + Math.abs(y - w) / 2;
          s.set($.id, [R, c]);
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
    return vt("body").append("div").attr("class", "tip").style("position", "absolute").style("z-index", "10").style("visibility", "hidden");
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
class uyt {
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
class J$t {
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
class uS extends wi {
  constructor() {
    super(...arguments), this.radius = 300, this.breadcrumbWidth = 200, this.className = "sunburst", this.useFixedColors = !1, this.colorPalette = yi.DEFAULT_COLORS, this.fixedColorPalette = yi.FIXED_COLORS, this.enableBreadcrumbs = !0, this.levels = 4, this.animationDuration = 1e3, this.rerootCallback = () => {
    }, this.fixedColorHash = (r) => J$t.stringHash(r.name), this.getTooltip = (r) => `
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
const CR = class PR {
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
    return e.length > 0 && r.count !== 0 && e.push(new bs(-1, "empty", [], r.count, r.selfCount)), new bs(
      r.id || ++PR.idCounter,
      r.name || "",
      e,
      r.count,
      r.selfCount,
      r.extra
    );
  }
};
CR.idCounter = 0;
let Z$t = CR;
class bl {
  static initTooltip() {
    return vt("body").append("div").attr("class", "tip").style("position", "absolute").style("z-index", "10").style("visibility", "hidden");
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
  static isParentOf(r, e, n) {
    return e.depth >= n ? !1 : r === e ? !0 : r.children ? r.children.some((a) => ai.isParentOf(a, e, n)) : !1;
  }
}
class wl {
  /*
   * Returns the readable text color based on the brightness of a given background color.
   */
  static getReadableColorFor(r) {
    let e = "#000";
    try {
      e = wl.brightness(Es(r)) < 125 ? "#eee" : "#000";
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
class lyt {
  constructor(r, e, n = new uS()) {
    this.element = r, this.colorCounter = -1, this.currentMaxLevel = 4, this.arcData = [], this.textData = [], this.previousRoot = null, this.previousMaxLevel = this.currentMaxLevel, this.settings = this.fillOptions(n);
    const i = new Z$t().preprocessData(e);
    this.settings.enableTooltips && (this.tooltip = bl.initTooltip()), this.currentMaxLevel = this.settings.levels, this.xScale = de().range([0, 2 * Math.PI]), this.yScale = de().domain([0, 1]).range([0, this.settings.radius]);
    const o = Un(i);
    o.sum((l) => l.children.length > 0 ? 0 : l.selfCount);
    const s = gM();
    this.data = s(o).descendants(), this.arc = iv().startAngle((l) => Math.max(0, Math.min(Math.PI * 2, this.xScale(l.x0)))).endAngle((l) => Math.max(0, Math.min(Math.PI * 2, this.xScale(l.x1)))).innerRadius((l) => Math.max(0, l.y0 ? this.yScale(l.y0) : l.y0)).outerRadius((l) => Math.max(0, this.yScale(l.y1) + 1)), this.initCss(), this.element.innerHTML = "", this.breadCrumbs = vt(this.element).append("div").attr("id", Math.floor(Math.random() * 2 ** 16) + "-breadcrumbs").attr("class", "sunburst-breadcrumbs").append("ul");
    const u = vt(this.element).append("svg").attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`).attr("width", this.settings.width).attr("height", this.settings.height).attr("overflow", "hidden").style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");
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
    const e = new uS();
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
      const e = r.children.map((o) => this.color(o)), n = Ba(e[0]), a = Ba(e[1]);
      return r.children.length === 1 || r.children[1].name === "empty" ? Ba(n.h, n.s, n.l * 0.98) : Ba((n.h + a.h) / 2, (n.s + a.s) / 2, (n.l + a.l) / 2);
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
    let n = Math.min(this.maxY(r), r.y0 + e.settings.levels * (r.y1 - r.y0)), a = Rn(e.xScale.domain(), [r.x0, r.x1]), i = Rn(e.yScale.domain(), [r.y0, n]), o = Rn(e.yScale.range(), [r.y0 ? 20 : 0, e.settings.radius]);
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
    const e = this.data.filter((i) => ai.isParentOf(r, i, this.currentMaxLevel + 2));
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
    const e = this.data.filter((u) => ai.isParentOf(r, u, this.currentMaxLevel)), n = e.filter((u) => !this.textData.includes(u)), a = this.textData.concat(...n);
    r.parent && a.splice(a.indexOf(r.parent), 1);
    const i = this, o = typeof OffscreenCanvas < "u";
    let s;
    o && (s = new OffscreenCanvas(1, 1).getContext("2d"), s.font = s.font = "16px 'Helvetica Neue', Helvetica, Arial, sans-serif"), this.visGElement.selectAll("text").data([]).exit().remove(), this.text = this.visGElement.selectAll("text").data(a).enter().append("text").style("fill", (u) => wl.getReadableColorFor(this.color(u.data))).style("fill-opacity", 0).style("font-family", "font-family: Helvetica, 'Super Sans', sans-serif").style("pointer-events", "none").attr("dy", ".2em").text((u) => this.settings.getLabel(u.data)).style("font-size", function(u) {
      const l = o ? s.measureText(this.textContent).width : this.getComputedTextLength();
      return Math.floor(Math.min(i.settings.radius / i.settings.levels / l * 10 + 1, 12)) + "px";
    }), await new Promise((u) => {
      this.text.transition().duration(this.settings.animationDuration).attrTween("text-anchor", (l) => (c) => this.xScale(l.x0 + (l.x1 - l.x0) / 2) > Math.PI ? "end" : "start").attrTween("dx", (l) => (c) => this.xScale(l.x0 + (l.x1 - l.x0) / 2) > Math.PI ? "-4px" : "4px").attrTween("transform", (l) => (c) => {
        let f = this.xScale(l.x0 + (l.x1 - l.x0) / 2) * 180 / Math.PI - 90;
        return `rotate(${f})translate(${this.yScale(l.y0)})rotate(${f > 90 ? -180 : 0})`;
      }).styleTween("fill-opacity", function(l) {
        const c = Number.parseInt(vt(this).style("font-size").replace("px", ""));
        return (f) => i.computeAvailableSpace(l) > c ? f.toString() : "0";
      }).on("end", function(l) {
        const c = i.computeAvailableSpace(l), f = vt(this);
        f.style(
          "visibility",
          c > Number.parseInt(f.style("font-size").replace("px", "")) && ai.isParentOf(r, l, i.currentMaxLevel) ? "visible" : "hidden"
        ), u();
      });
    }), this.textData = e;
  }
  setBreadcrumbs(r) {
    let e = [], n = r;
    for (; n; )
      e.push(n), n = n.parent;
    e.reverse().shift();
    const a = iv().innerRadius(0).outerRadius(15).startAngle(0).endAngle((i) => 2 * Math.PI * i.data.count / i.parent.data.count);
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
class lS extends wi {
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
const MR = class NR {
  preprocessData(r) {
    const e = [];
    if (r.children)
      for (const n of r.children)
        e.push(this.preprocessData(n));
    return new bs(
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
class cyt {
  constructor(r, e, n = new lS()) {
    var o;
    this.element = r, this.childParentRelations = /* @__PURE__ */ new Map(), this.nodeId = 0, this.settings = this.fillOptions(n), this.settings.enableTooltips && (this.tooltip = bl.initTooltip()), this.initCss();
    const a = new Q$t(), i = Un(a.preprocessData(e));
    i.sum((s) => s.children.length > 0 ? 0 : s.count), i.sort((s, u) => u.value - s.value), this.partition = IM(), this.partition.size([this.settings.width + 1, this.settings.height + 1]).paddingTop(this.settings.labelHeight), this.data = this.partition(i).descendants(), this.settings.levels || (this.settings.levels = this.data[0].height);
    for (const s of this.data)
      this.childParentRelations.set(s.data, (o = s.parent) == null ? void 0 : o.data);
    this.currentRoot = this.data[0], this.colorScale = de().domain([0, this.settings.levels]).range([this.settings.colorRoot, this.settings.colorLeaf]).interpolate(Mh), this.breadCrumbs = vt(this.element).append("div").attr("class", "breadcrumbs").style("position", "relative").style("width", this.settings.width + "px").style("height", "20px").style("background-color", this.settings.colorBreadcrumbs), this.treemap = vt(this.element).append("div").style("position", "relative").style("width", this.settings.width + "px").style("height", this.settings.height + "px"), this.render(this.currentRoot);
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
    const e = new lS();
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
    const n = Un(r.data);
    n.sum((o) => o.children.length > 0 ? 0 : o.count), n.sort((o, s) => s.value - o.value);
    let a = this.treemap.selectAll(".node").data(
      this.partition(n).descendants(),
      (o) => o.data.id || (o.data.id = ++this.nodeId)
    );
    a.enter().append("div").attr("class", "node").style("background", (o) => this.colorScale(this.settings.getLevel(o))).style("color", (o) => wl.getReadableColorFor(this.colorScale(this.settings.getLevel(o)).toString())).style("left", "0px").style("top", "0px").style("width", "0px").style("height", "0px").text((o) => this.settings.getLabel(o.data)).on("click", (o, s) => this.render(s)).on("contextmenu", (o, s) => {
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
const tyt = pu(LM);
class cS extends wi {
  constructor() {
    super(...arguments), this.minNodeSize = 2, this.maxNodeSize = 105, this.enableExpandOnClick = !0, this.enableAutoExpand = !1, this.autoExpandValue = 0.8, this.levelsToExpand = 2, this.enableRightClick = !0, this.enableInnerArcs = !0, this.enableLabels = !0, this.nodeDistance = 180, this.animationDuration = 500, this.colorProviderLevels = 1, this.nodeFillColor = (r) => r.isSelected() ? r.children.length > 0 ? r.getColor() || "#aaa" : "#fff" : "#aaa", this.nodeStrokeColor = (r) => r.isSelected() && r.getColor() || "#aaa", this.linkStrokeColor = (r) => r.source.data.isSelected() ? r.target.data.getColor() : "#aaa", this.colorProvider = (r) => tyt(r.name), this.getLabel = (r) => r.name, this.getTooltip = (r) => `
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
class ryt {
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
class eyt extends bs {
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
const DR = class FR {
  preprocessData(r) {
    const e = [];
    if (r.children)
      for (const n of r.children)
        e.push(this.preprocessData(n));
    return new eyt(
      r.id || ++FR.idCounter,
      r.name || "",
      e,
      r.count,
      r.selfCount,
      r.extra
    );
  }
};
DR.idCounter = 0;
let nyt = DR;
class fyt {
  constructor(r, e, n = new cS()) {
    this.element = r, this.nodeId = 0, this.zoomScale = 1, this.settings = this.fillOptions(n), this.settings.enableTooltips && (this.tooltip = bl.initTooltip());
    const i = new nyt().preprocessData(e), o = Un(i);
    o.sum((s) => s.children.length > 0 ? 0 : s.count), this.widthScale = de().range([this.settings.minNodeSize, this.settings.maxNodeSize]), this.treeLayout = wM().nodeSize([2, 10]).separation((s, u) => {
      if (s.data.isCollapsed() || u.data.isCollapsed())
        return 0;
      const c = (this.computeNodeSize(s) + this.computeNodeSize(u)) / 2 + 4;
      return s.parent === u.parent ? c : c + 4;
    }), this.data = this.treeLayout(o).descendants(), this.root = this.data[0], this.element.innerHTML = "", this.svg = vt(this.element).append("svg").attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`).attr("width", this.settings.width).attr("height", this.settings.height).style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif"), this.zoomListener = rx().extent([[0, 0], [this.settings.width, this.settings.height]]).scaleExtent([0.1, 3]).on("zoom", (s) => {
      this.zoomScale = s.transform.k, this.visElement.attr("transform", s.transform.toString());
    }), this.visElement = this.svg.call(this.zoomListener).append("g"), this.render(this.root);
  }
  reset() {
    this.render(this.data[0]);
  }
  fillOptions(r = void 0) {
    const e = new cS();
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
    e = e * this.zoomScale + this.settings.width / 4, n = n * this.zoomScale + this.settings.height / 2, this.visElement.transition().duration(this.settings.animationDuration).attr("transform", `translate(${e},${n})scale(${this.zoomScale})`).on("end", () => this.zoomListener.transform(this.svg, kh.translate(e, n).scale(this.zoomScale)));
  }
  initialExpand(r) {
    var a;
    if (!this.settings.enableAutoExpand) {
      r.data.expand(this.settings.levelsToExpand);
      return;
    }
    r.data.expand(1);
    let e = r.data.count * (this.settings.enableAutoExpand ? this.settings.autoExpandValue : 0.8);
    const n = new ryt([...r.children || []], (i, o) => o.data.count - i.data.count);
    for (; e > 0 && n.size() > 0; ) {
      const i = n.remove();
      e -= i.data.count, i.data.expand(1), (a = i.children) == null || a.forEach((o, s) => {
        n.add(o);
      });
    }
  }
  update(r) {
    const e = this.treeLayout(this.root), n = e.descendants().reverse().filter((h) => !h.data.isCollapsed()), a = e.links().filter((h) => !h.target.data.isCollapsed() && !h.source.data.isCollapsed());
    n.forEach((h) => h.y = h.depth * this.settings.nodeDistance);
    const i = this.visElement.selectAll("g.node").data(n, (h) => h.data.id || (h.data.id = ++this.nodeId));
    let o = i.enter().append("g").attr("class", "node").style("cursor", "pointer").attr("transform", `translate(${r.y || 0},${r.data.previousPosition.x || 0})`).on("click", (h, d) => this.click(h, d)).on("mouseover", (h, d) => this.tooltipIn(h, d)).on("mouseout", (h, d) => this.tooltipOut(h, d)).on("contextmenu", (h, d) => this.rightClick(h, d)).merge(i);
    o.append("circle").attr("r", 1e-6).style("stroke-width", "1.5px").style("stroke", (h) => this.settings.nodeStrokeColor(h.data)).style("fill", (h) => this.settings.nodeFillColor(h.data));
    const s = de().range([0, 2 * Math.PI]), u = iv().innerRadius(0).outerRadius((h) => this.computeNodeSize(h)).startAngle(0).endAngle((h) => s(h.data.selfCount / h.data.count) || 0);
    this.settings.enableInnerArcs && o.append("path").attr("class", "innerArc").attr("d", u).style("fill", (h) => this.settings.nodeStrokeColor(h.data)).style("fill-opacity", 0), this.settings.enableLabels && o.append("text").attr("x", (h) => h.children ? -10 : 10).attr("dy", ".35em").attr("text-anchor", (h) => h.children ? "end" : "start").text((h) => this.settings.getLabel(h.data)).style("font", "10px sans-serif").style("fill-opacity", 1e-6);
    const l = o.transition().duration(this.settings.animationDuration).attr("transform", (h) => `translate(${h.y}, ${h.x})`);
    l.select("circle").attr("r", (h) => this.computeNodeSize(h)).style("fill-opacity", (h) => h.children && h.children[0].data.isCollapsed() ? 1 : 0).style("stroke", (h) => this.settings.nodeStrokeColor(h.data)).style("fill", (h) => this.settings.nodeFillColor(h.data)), this.settings.enableInnerArcs && l.select(".innerArc").style("fill-opacity", 1), this.settings.enableLabels && l.select("text").style("fill-opacity", 1);
    const c = i.exit().transition().duration(this.settings.animationDuration).attr("transform", (h) => `translate(${r.y},${r.x})`).remove();
    c.select("circle").attr("r", 1e-6), c.select("path").style("fill-opacity", 1e-6), c.select("text").style("fill-opacity", 1e-6);
    let f = this.visElement.selectAll("path.link").data(a, (h) => h.target.data.id);
    const v = eN().x((h) => h.y).y((h) => h.x);
    f.enter().insert("path", "g").attr("class", "link").style("fill", "none").style("stroke-opacity", "0.5").style("stroke-linecap", "round").style("stroke", (h) => this.settings.linkStrokeColor(h)).style("stroke-width", 1e-6).attr("d", (h) => {
      const d = {
        x: r.data.previousPosition.x,
        y: r.data.previousPosition.y
      };
      return v({
        source: d,
        target: d
      });
    }).merge(f).transition().duration(this.settings.animationDuration).attr("d", v).style("stroke", this.settings.linkStrokeColor).style("stroke-width", (h) => h.source.data.isSelected() ? this.widthScale(h.target.data.count) + "px" : "4px"), f.exit().transition().duration(this.settings.animationDuration).style("stroke-width", 1e-6).attr("d", (h) => {
      const d = {
        x: r.x,
        y: r.y
      };
      return v({
        source: d,
        target: d
      });
    }).remove(), n.forEach((h) => {
      h.data.previousPosition = {
        x: h.x,
        y: h.y
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
class ayt {
  constructor() {
    this.padding = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    };
  }
}
class iyt {
  constructor() {
    this.padding = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    }, this.titleFontSize = 24, this.labelFontSize = 16, this.symbolSize = 16, this.columns = 3, this.width = 300, this.rowSpacing = 5, this.columnSpacing = 20;
  }
}
class fS extends wi {
  constructor() {
    super(...arguments), this.orientation = "vertical", this.barHeight = 75, this.className = "barplot", this.maxItems = 15, this.font = "Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;", this.displayMode = "relative", this.showBarLabel = !0, this.showValuesInBars = !0, this.valuesInBarsFontSize = 12, this.chart = new ayt(), this.legend = new iyt(), this.enableTooltips = !0, this.getTooltip = (r) => `
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
        `, this.getTooltipTitle = (r) => r.label, this.getTooltipText = (r) => this.displayMode === "absolute" ? `${r.counts.toFixed(1)} hits` : `${r.counts.toFixed(1)} %`;
  }
}
class oyt {
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
        const f = a.findIndex((h) => h.label === l.label), v = a.findIndex((h) => h.label === c.label);
        return f - v;
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
  constructor(r, e, n = new fS()) {
    this.element = r, this.settings = this.fillOptions(n);
    const a = new oyt();
    this.data = a.computeMaxItemsInBars(e, this.settings.maxItems), this.settings.displayMode === "relative" && (this.data = a.convertAbsoluteToRelative(this.data)), this.settings.enableTooltips && (this.tooltip = bl.initTooltip()), this.renderBarplot();
  }
  fillOptions(r = void 0) {
    const e = new fS();
    return Object.assign(e, r);
  }
  renderBarplot() {
    const r = vt(this.element).append("svg").attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`).attr("width", this.settings.width).attr("height", this.settings.height).attr("overflow", "hidden").style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif"), e = this.settings.font, n = this.settings.chart.padding, a = this.settings.barHeight, i = this.settings.orientation == "horizontal", o = this.settings.legend.padding, s = this.settings.legend.width, u = this.settings.legend.titleFontSize, l = this.settings.legend.labelFontSize, c = this.settings.legend.symbolSize, f = this.settings.legend.rowSpacing, v = this.settings.legend.columnSpacing, h = this.settings.legend.columns, d = 10, $ = 10, y = 40;
    let p, w, T, R, M, L, V, W;
    i ? (p = this.settings.width - n.left - n.right - s, w = a * this.data.length, R = o.top, T = n.left + p + n.right + o.left, M = Math.max(c, l), L = s - o.left - o.right - c - $, W = s - o.left - o.right) : (p = this.settings.width - n.left - n.right, w = a * this.data.length, R = w + o.top + y, T = o.left, M = Math.max(c, l), V = this.settings.width - o.left - o.right, W = Math.floor((V - Math.max(h - 1, 0) * v) / h), L = W - c - $);
    let J = 150;
    const rt = 15, F = 10;
    let q = p;
    this.settings.showBarLabel ? q = p - J - F : J = 0, r.selectAll("*").remove();
    const N = r.append("g"), m = iN().keys(Array.from(new Set(this.data.flatMap((b) => b.items.map((I) => I.label))))).value((b, I) => {
      var C;
      return ((C = b.items.find((k) => k.label === I)) == null ? void 0 : C.counts) ?? 0;
    })(this.data), _ = de().domain([0, Zg(m, (b) => Zg(b, (I) => I[1])) || 0]).range([0, q]), E = JS().domain(this.data.map((b, I) => I.toString())).range([0, a * this.data.length]).paddingInner(0.1).paddingOuter(0), P = [
      "#F44336",
      // red
      "#B71C1C",
      // red-darken-4
      "#E91E63",
      // pink
      "#880E4F",
      // pink-darken-4
      "#9C27B0",
      // purple
      "#4A148C",
      // purple-darken-4
      "#673AB7",
      // deep-purple
      "#311B92",
      // deep-purple-darken-4
      "#3F51B5",
      // indigo
      "#1A237E",
      // indigo-darken-4
      "#2196F3",
      // blue
      "#006064",
      // cyan-darken-4
      "#009688",
      // teal
      "#004D40",
      // teal-darken-4
      "#4CAF50",
      // green
      "#1B5E20",
      // green-darken-4
      "#C0CA33",
      // lime-darken-1
      "#827717",
      // lime-darken-4
      "#FFC107",
      // amber
      "#FF6F00",
      // amber-darken-4
      "#FF9800",
      // orange
      "#E65100",
      // orange-darken-4
      "#FF5722",
      // deep-orange
      "#BF360C"
      // deep-orange-darken-4
    ], B = "#9E9E9E";
    this.settings.maxItems && (P[this.settings.maxItems % (this.data[0].items.length + 1)] = B);
    const S = pu().domain(Array.from(new Set(this.data.flatMap((b) => b.items.map((I) => I.label))))).range(P);
    this.settings.showBarLabel && N.append("g").attr("class", "barLabels").selectAll("text").data(this.data).join("text").attr("x", n.left).attr("y", (b, I) => n.top + (E(I.toString()) || 0) + E.bandwidth() / 2).attr("dy", ".35em").attr("font-family", e).attr("font-size", rt).text((b) => {
      if (b.label.length * (rt * 0.6) > J) {
        const I = Math.floor(J / (rt * 0.6));
        return b.label.substring(0, I - 3) + "...";
      }
      return b.label;
    }), N.append("g").selectAll("g").data(m).join("g").attr("fill", (b) => S(b.key)).attr("data-key", (b) => b.key).selectAll("rect").data((b) => b).join("rect").attr("x", (b) => n.left + J + F + Math.floor(_(b[0]))).attr("y", (b, I) => n.top + (E(I.toString()) || 0)).attr("width", (b) => Math.floor(_(b[1])) - Math.floor(_(b[0]))).attr("height", E.bandwidth()).on("mouseover", (b, I) => {
      const C = vt(b.target.parentNode).attr("data-key"), k = I.data.items.find((H) => H.label === C);
      this.tooltipIn(b, k);
    }).on("mousemove", (b, I) => {
      const C = vt(b.target.parentNode).attr("data-key"), k = I.data.items.find((H) => H.label === C);
      this.tooltipMove(b, k);
    }).on("mouseout", (b, I) => {
      const C = vt(b.target.parentNode).attr("data-key"), k = I.data.items.find((H) => H.label === C);
      this.tooltipOut(b, k);
    }), this.settings.showValuesInBars && N.append("g").selectAll("g").data(m).join("g").selectAll("text").data((b) => b).join("text").attr("x", (b) => {
      const I = Math.floor(_(b[0])), C = Math.floor(_(b[1]));
      return n.left + J + F + I + (C - I) / 2;
    }).attr("y", (b, I) => n.top + (E(I.toString()) || 0) + E.bandwidth() / 2).attr("dy", ".35em").attr("text-anchor", "middle").attr("fill", "white").attr("font-family", e).attr("font-size", this.settings.valuesInBarsFontSize).text((b) => {
      const I = b[1] - b[0];
      return Math.floor(_(b[1])) - Math.floor(_(b[0])) < 30 ? "" : this.settings.displayMode === "relative" ? `${I.toFixed(1)}%` : I;
    }), N.append("g").attr("transform", `translate(${n.left + J + F}, ${n.top + a * this.data.length})`).call(a_(_)).attr("font-size", "12px").append("text").attr("font-family", e).attr("fill", "black").attr("x", q / 2).attr("y", y).attr("text-anchor", "middle").attr("font-size", 14).text(this.settings.displayMode === "relative" ? "Percentage" : "Count");
    const x = N.append("g").attr("font-family", e).attr("font-size", l).selectAll("g").data(S.domain()).join("g").attr("transform", (b, I) => `translate(${I % h * W + Math.max(I % h - 1, 0) * v}, ${Math.floor(I / h) * (M + f) + u + d + R})`);
    N.append("text").attr("font-family", e).attr("font-size", u).attr("dominant-baseline", "hanging").attr("x", T).attr("y", R).text("Legend"), x.append("rect").attr("x", T).attr("width", c).attr("height", c).attr("rx", 5).attr("fill", S), x.append("text").attr("x", T + c + $).attr("y", l / 2).attr("dy", "0.35em").text((b) => {
      if (b.length * (l * 0.6) > L) {
        const I = Math.floor(L / (l * 0.6));
        return b.substring(0, I - 3) + "...";
      }
      return b;
    });
  }
  tooltipIn(r, e) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.html(this.settings.getTooltip(e)).style("top", r.pageY + 10 + "px").style("left", r.pageX + 10 + "px").style("visibility", "visible");
  }
  tooltipMove(r, e) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("top", r.pageY + 10 + "px").style("left", r.pageX + 10 + "px");
  }
  tooltipOut(r, e) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("visibility", "hidden");
  }
}
export {
  vyt as Barplot,
  ayt as BarplotChartSettings,
  iyt as BarplotLegendSettings,
  fS as BarplotSettings,
  yi as ColorPalette,
  wl as ColorUtils,
  bs as DataNode,
  dN as EuclidianDistanceMetric,
  syt as Heatmap,
  Ap as HeatmapSettings,
  gN as MoloReorderer,
  uyt as PearsonCorrelationMetric,
  J$t as StringUtils,
  lyt as Sunburst,
  uS as SunburstSettings,
  ov as Transition,
  as as TreeNode,
  cyt as Treemap,
  lS as TreemapSettings,
  fyt as Treeview,
  cS as TreeviewSettings,
  hN as UPGMAClusterer
};
//# sourceMappingURL=unipept-visualizations.js.map
