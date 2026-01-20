class oe {
  constructor(e, n, i = [], r, o, s = {}) {
    this.id = e, this.name = n, this.children = i, this.count = r, this.selfCount = o, this.extra = s;
  }
}
function jt(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Ji(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function ei(t) {
  let e, n, i;
  t.length !== 2 ? (e = jt, n = (a, h) => jt(t(a), h), i = (a, h) => t(a) - h) : (e = t === jt || t === Ji ? t : ji, n = t, i = t);
  function r(a, h, l = 0, c = a.length) {
    if (l < c) {
      if (e(h, h) !== 0)
        return c;
      do {
        const d = l + c >>> 1;
        n(a[d], h) < 0 ? l = d + 1 : c = d;
      } while (l < c);
    }
    return l;
  }
  function o(a, h, l = 0, c = a.length) {
    if (l < c) {
      if (e(h, h) !== 0)
        return c;
      do {
        const d = l + c >>> 1;
        n(a[d], h) <= 0 ? l = d + 1 : c = d;
      } while (l < c);
    }
    return l;
  }
  function s(a, h, l = 0, c = a.length) {
    const d = r(a, h, l, c - 1);
    return d > l && i(a[d - 1], h) > -i(a[d], h) ? d - 1 : d;
  }
  return { left: r, center: s, right: o };
}
function ji() {
  return 0;
}
function tr(t) {
  return t === null ? NaN : +t;
}
const er = ei(jt), nr = er.right;
ei(tr).center;
const ni = nr;
class pn extends Map {
  constructor(e, n = sr) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: n } }), e != null)
      for (const [i, r] of e)
        this.set(i, r);
  }
  get(e) {
    return super.get(mn(this, e));
  }
  has(e) {
    return super.has(mn(this, e));
  }
  set(e, n) {
    return super.set(ir(this, e), n);
  }
  delete(e) {
    return super.delete(rr(this, e));
  }
}
function mn({ _intern: t, _key: e }, n) {
  const i = e(n);
  return t.has(i) ? t.get(i) : n;
}
function ir({ _intern: t, _key: e }, n) {
  const i = e(n);
  return t.has(i) ? t.get(i) : (t.set(i, n), n);
}
function rr({ _intern: t, _key: e }, n) {
  const i = e(n);
  return t.has(i) && (n = t.get(i), t.delete(i)), n;
}
function sr(t) {
  return t !== null && typeof t == "object" ? t.valueOf() : t;
}
const or = Math.sqrt(50), ar = Math.sqrt(10), lr = Math.sqrt(2);
function ae(t, e, n) {
  const i = (e - t) / Math.max(0, n), r = Math.floor(Math.log10(i)), o = i / Math.pow(10, r), s = o >= or ? 10 : o >= ar ? 5 : o >= lr ? 2 : 1;
  let a, h, l;
  return r < 0 ? (l = Math.pow(10, -r) / s, a = Math.round(t * l), h = Math.round(e * l), a / l < t && ++a, h / l > e && --h, l = -l) : (l = Math.pow(10, r) * s, a = Math.round(t / l), h = Math.round(e / l), a * l < t && ++a, h * l > e && --h), h < a && 0.5 <= n && n < 2 ? ae(t, e, n * 2) : [a, h, l];
}
function hr(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0))
    return [];
  if (t === e)
    return [t];
  const i = e < t, [r, o, s] = i ? ae(e, t, n) : ae(t, e, n);
  if (!(o >= r))
    return [];
  const a = o - r + 1, h = new Array(a);
  if (i)
    if (s < 0)
      for (let l = 0; l < a; ++l)
        h[l] = (o - l) / -s;
    else
      for (let l = 0; l < a; ++l)
        h[l] = (o - l) * s;
  else if (s < 0)
    for (let l = 0; l < a; ++l)
      h[l] = (r + l) / -s;
  else
    for (let l = 0; l < a; ++l)
      h[l] = (r + l) * s;
  return h;
}
function Be(t, e, n) {
  return e = +e, t = +t, n = +n, ae(t, e, n)[2];
}
function ur(t, e, n) {
  e = +e, t = +t, n = +n;
  const i = e < t, r = i ? Be(e, t, n) : Be(t, e, n);
  return (i ? -1 : 1) * (r < 0 ? 1 / -r : r);
}
function yn(t, e) {
  let n;
  if (e === void 0)
    for (const i of t)
      i != null && (n < i || n === void 0 && i >= i) && (n = i);
  else {
    let i = -1;
    for (let r of t)
      (r = e(r, ++i, t)) != null && (n < r || n === void 0 && r >= r) && (n = r);
  }
  return n;
}
function cr(t, e, n) {
  t = +t, e = +e, n = (r = arguments.length) < 2 ? (e = t, t = 0, 1) : r < 3 ? 1 : +n;
  for (var i = -1, r = Math.max(0, Math.ceil((e - t) / n)) | 0, o = new Array(r); ++i < r; )
    o[i] = t + i * n;
  return o;
}
function fr(t) {
  return t;
}
var Ae = 1, $e = 2, Fe = 3, Yt = 4, xn = 1e-6;
function dr(t) {
  return "translate(" + t + ",0)";
}
function gr(t) {
  return "translate(0," + t + ")";
}
function pr(t) {
  return (e) => +t(e);
}
function mr(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function yr() {
  return !this.__axis;
}
function xr(t, e) {
  var n = [], i = null, r = null, o = 6, s = 6, a = 3, h = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, l = t === Ae || t === Yt ? -1 : 1, c = t === Yt || t === $e ? "x" : "y", d = t === Ae || t === Fe ? dr : gr;
  function u(f) {
    var p = i ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), y = r ?? (e.tickFormat ? e.tickFormat.apply(e, n) : fr), w = Math.max(o, 0) + a, m = e.range(), b = +m[0] + h, M = +m[m.length - 1] + h, P = (e.bandwidth ? mr : pr)(e.copy(), h), N = f.selection ? f.selection() : f, z = N.selectAll(".domain").data([null]), D = N.selectAll(".tick").data(p, e).order(), F = D.exit(), H = D.enter().append("g").attr("class", "tick"), L = D.select("line"), k = D.select("text");
    z = z.merge(z.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), D = D.merge(H), L = L.merge(H.append("line").attr("stroke", "currentColor").attr(c + "2", l * o)), k = k.merge(H.append("text").attr("fill", "currentColor").attr(c, l * w).attr("dy", t === Ae ? "0em" : t === Fe ? "0.71em" : "0.32em")), f !== N && (z = z.transition(f), D = D.transition(f), L = L.transition(f), k = k.transition(f), F = F.transition(f).attr("opacity", xn).attr("transform", function(R) {
      return isFinite(R = P(R)) ? d(R + h) : this.getAttribute("transform");
    }), H.attr("opacity", xn).attr("transform", function(R) {
      var C = this.parentNode.__axis;
      return d((C && isFinite(C = C(R)) ? C : P(R)) + h);
    })), F.remove(), z.attr("d", t === Yt || t === $e ? s ? "M" + l * s + "," + b + "H" + h + "V" + M + "H" + l * s : "M" + h + "," + b + "V" + M : s ? "M" + b + "," + l * s + "V" + h + "H" + M + "V" + l * s : "M" + b + "," + h + "H" + M), D.attr("opacity", 1).attr("transform", function(R) {
      return d(P(R) + h);
    }), L.attr(c + "2", l * o), k.attr(c, l * w).text(y), N.filter(yr).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === $e ? "start" : t === Yt ? "end" : "middle"), N.each(function() {
      this.__axis = P;
    });
  }
  return u.scale = function(f) {
    return arguments.length ? (e = f, u) : e;
  }, u.ticks = function() {
    return n = Array.from(arguments), u;
  }, u.tickArguments = function(f) {
    return arguments.length ? (n = f == null ? [] : Array.from(f), u) : n.slice();
  }, u.tickValues = function(f) {
    return arguments.length ? (i = f == null ? null : Array.from(f), u) : i && i.slice();
  }, u.tickFormat = function(f) {
    return arguments.length ? (r = f, u) : r;
  }, u.tickSize = function(f) {
    return arguments.length ? (o = s = +f, u) : o;
  }, u.tickSizeInner = function(f) {
    return arguments.length ? (o = +f, u) : o;
  }, u.tickSizeOuter = function(f) {
    return arguments.length ? (s = +f, u) : s;
  }, u.tickPadding = function(f) {
    return arguments.length ? (a = +f, u) : a;
  }, u.offset = function(f) {
    return arguments.length ? (h = +f, u) : h;
  }, u;
}
function wr(t) {
  return xr(Fe, t);
}
var vr = { value: () => {
} };
function nn() {
  for (var t = 0, e = arguments.length, n = {}, i; t < e; ++t) {
    if (!(i = arguments[t] + "") || i in n || /[\s.]/.test(i))
      throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new te(n);
}
function te(t) {
  this._ = t;
}
function br(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !e.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
te.prototype = nn.prototype = {
  constructor: te,
  on: function(t, e) {
    var n = this._, i = br(t + "", n), r, o = -1, s = i.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((r = (t = i[o]).type) && (r = _r(n[r], t.name)))
          return r;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (r = (t = i[o]).type)
        n[r] = wn(n[r], t.name, e);
      else if (e == null)
        for (r in n)
          n[r] = wn(n[r], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e)
      t[n] = e[n].slice();
    return new te(t);
  },
  call: function(t, e) {
    if ((r = arguments.length - 2) > 0)
      for (var n = new Array(r), i = 0, r, o; i < r; ++i)
        n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (o = this._[t], i = 0, r = o.length; i < r; ++i)
      o[i].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var i = this._[t], r = 0, o = i.length; r < o; ++r)
      i[r].value.apply(e, n);
  }
};
function _r(t, e) {
  for (var n = 0, i = t.length, r; n < i; ++n)
    if ((r = t[n]).name === e)
      return r.value;
}
function wn(t, e, n) {
  for (var i = 0, r = t.length; i < r; ++i)
    if (t[i].name === e) {
      t[i] = vr, t = t.slice(0, i).concat(t.slice(i + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Ve = "http://www.w3.org/1999/xhtml";
const vn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ve,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ve(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), vn.hasOwnProperty(e) ? { space: vn[e], local: t } : t;
}
function Mr(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Ve && e.documentElement.namespaceURI === Ve ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Cr(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function ii(t) {
  var e = ve(t);
  return (e.local ? Cr : Mr)(e);
}
function Tr() {
}
function rn(t) {
  return t == null ? Tr : function() {
    return this.querySelector(t);
  };
}
function Sr(t) {
  typeof t != "function" && (t = rn(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = e[r], s = o.length, a = i[r] = new Array(s), h, l, c = 0; c < s; ++c)
      (h = o[c]) && (l = t.call(h, h.__data__, c, o)) && ("__data__" in h && (l.__data__ = h.__data__), a[c] = l);
  return new K(i, this._parents);
}
function kr(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Ar() {
  return [];
}
function ri(t) {
  return t == null ? Ar : function() {
    return this.querySelectorAll(t);
  };
}
function $r(t) {
  return function() {
    return kr(t.apply(this, arguments));
  };
}
function Pr(t) {
  typeof t == "function" ? t = $r(t) : t = ri(t);
  for (var e = this._groups, n = e.length, i = [], r = [], o = 0; o < n; ++o)
    for (var s = e[o], a = s.length, h, l = 0; l < a; ++l)
      (h = s[l]) && (i.push(t.call(h, h.__data__, l, s)), r.push(h));
  return new K(i, r);
}
function si(t) {
  return function() {
    return this.matches(t);
  };
}
function oi(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Nr = Array.prototype.find;
function zr(t) {
  return function() {
    return Nr.call(this.children, t);
  };
}
function Er() {
  return this.firstElementChild;
}
function Rr(t) {
  return this.select(t == null ? Er : zr(typeof t == "function" ? t : oi(t)));
}
var Dr = Array.prototype.filter;
function Ir() {
  return Array.from(this.children);
}
function Hr(t) {
  return function() {
    return Dr.call(this.children, t);
  };
}
function Lr(t) {
  return this.selectAll(t == null ? Ir : Hr(typeof t == "function" ? t : oi(t)));
}
function Or(t) {
  typeof t != "function" && (t = si(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = e[r], s = o.length, a = i[r] = [], h, l = 0; l < s; ++l)
      (h = o[l]) && t.call(h, h.__data__, l, o) && a.push(h);
  return new K(i, this._parents);
}
function ai(t) {
  return new Array(t.length);
}
function Br() {
  return new K(this._enter || this._groups.map(ai), this._parents);
}
function le(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
le.prototype = {
  constructor: le,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function Fr(t) {
  return function() {
    return t;
  };
}
function Vr(t, e, n, i, r, o) {
  for (var s = 0, a, h = e.length, l = o.length; s < l; ++s)
    (a = e[s]) ? (a.__data__ = o[s], i[s] = a) : n[s] = new le(t, o[s]);
  for (; s < h; ++s)
    (a = e[s]) && (r[s] = a);
}
function qr(t, e, n, i, r, o, s) {
  var a, h, l = /* @__PURE__ */ new Map(), c = e.length, d = o.length, u = new Array(c), f;
  for (a = 0; a < c; ++a)
    (h = e[a]) && (u[a] = f = s.call(h, h.__data__, a, e) + "", l.has(f) ? r[a] = h : l.set(f, h));
  for (a = 0; a < d; ++a)
    f = s.call(t, o[a], a, o) + "", (h = l.get(f)) ? (i[a] = h, h.__data__ = o[a], l.delete(f)) : n[a] = new le(t, o[a]);
  for (a = 0; a < c; ++a)
    (h = e[a]) && l.get(u[a]) === h && (r[a] = h);
}
function Wr(t) {
  return t.__data__;
}
function Xr(t, e) {
  if (!arguments.length)
    return Array.from(this, Wr);
  var n = e ? qr : Vr, i = this._parents, r = this._groups;
  typeof t != "function" && (t = Fr(t));
  for (var o = r.length, s = new Array(o), a = new Array(o), h = new Array(o), l = 0; l < o; ++l) {
    var c = i[l], d = r[l], u = d.length, f = Yr(t.call(c, c && c.__data__, l, i)), p = f.length, y = a[l] = new Array(p), w = s[l] = new Array(p), m = h[l] = new Array(u);
    n(c, d, y, w, m, f, e);
    for (var b = 0, M = 0, P, N; b < p; ++b)
      if (P = y[b]) {
        for (b >= M && (M = b + 1); !(N = w[M]) && ++M < p; )
          ;
        P._next = N || null;
      }
  }
  return s = new K(s, i), s._enter = a, s._exit = h, s;
}
function Yr(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Gr() {
  return new K(this._exit || this._groups.map(ai), this._parents);
}
function Ur(t, e, n) {
  var i = this.enter(), r = this, o = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), e != null && (r = e(r), r && (r = r.selection())), n == null ? o.remove() : n(o), i && r ? i.merge(r).order() : r;
}
function Zr(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, i = e._groups, r = n.length, o = i.length, s = Math.min(r, o), a = new Array(r), h = 0; h < s; ++h)
    for (var l = n[h], c = i[h], d = l.length, u = a[h] = new Array(d), f, p = 0; p < d; ++p)
      (f = l[p] || c[p]) && (u[p] = f);
  for (; h < r; ++h)
    a[h] = n[h];
  return new K(a, this._parents);
}
function Kr() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, o = i[r], s; --r >= 0; )
      (s = i[r]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function Qr(t) {
  t || (t = Jr);
  function e(d, u) {
    return d && u ? t(d.__data__, u.__data__) : !d - !u;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), o = 0; o < i; ++o) {
    for (var s = n[o], a = s.length, h = r[o] = new Array(a), l, c = 0; c < a; ++c)
      (l = s[c]) && (h[c] = l);
    h.sort(e);
  }
  return new K(r, this._parents).order();
}
function Jr(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function jr() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function ts() {
  return Array.from(this);
}
function es() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, o = i.length; r < o; ++r) {
      var s = i[r];
      if (s)
        return s;
    }
  return null;
}
function ns() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function is() {
  return !this.node();
}
function rs(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var r = e[n], o = 0, s = r.length, a; o < s; ++o)
      (a = r[o]) && t.call(a, a.__data__, o, r);
  return this;
}
function ss(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function os(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function as(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function ls(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function hs(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function us(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function cs(t, e) {
  var n = ve(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? os : ss : typeof e == "function" ? n.local ? us : hs : n.local ? ls : as)(n, e));
}
function li(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function fs(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ds(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function gs(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function ps(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? fs : typeof e == "function" ? gs : ds)(t, e, n ?? "")) : Tt(this.node(), t);
}
function Tt(t, e) {
  return t.style.getPropertyValue(e) || li(t).getComputedStyle(t, null).getPropertyValue(e);
}
function ms(t) {
  return function() {
    delete this[t];
  };
}
function ys(t, e) {
  return function() {
    this[t] = e;
  };
}
function xs(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function ws(t, e) {
  return arguments.length > 1 ? this.each((e == null ? ms : typeof e == "function" ? xs : ys)(t, e)) : this.node()[t];
}
function hi(t) {
  return t.trim().split(/^|\s+/);
}
function sn(t) {
  return t.classList || new ui(t);
}
function ui(t) {
  this._node = t, this._names = hi(t.getAttribute("class") || "");
}
ui.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function ci(t, e) {
  for (var n = sn(t), i = -1, r = e.length; ++i < r; )
    n.add(e[i]);
}
function fi(t, e) {
  for (var n = sn(t), i = -1, r = e.length; ++i < r; )
    n.remove(e[i]);
}
function vs(t) {
  return function() {
    ci(this, t);
  };
}
function bs(t) {
  return function() {
    fi(this, t);
  };
}
function _s(t, e) {
  return function() {
    (e.apply(this, arguments) ? ci : fi)(this, t);
  };
}
function Ms(t, e) {
  var n = hi(t + "");
  if (arguments.length < 2) {
    for (var i = sn(this.node()), r = -1, o = n.length; ++r < o; )
      if (!i.contains(n[r]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? _s : e ? vs : bs)(n, e));
}
function Cs() {
  this.textContent = "";
}
function Ts(t) {
  return function() {
    this.textContent = t;
  };
}
function Ss(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function ks(t) {
  return arguments.length ? this.each(t == null ? Cs : (typeof t == "function" ? Ss : Ts)(t)) : this.node().textContent;
}
function As() {
  this.innerHTML = "";
}
function $s(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Ps(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Ns(t) {
  return arguments.length ? this.each(t == null ? As : (typeof t == "function" ? Ps : $s)(t)) : this.node().innerHTML;
}
function zs() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Es() {
  return this.each(zs);
}
function Rs() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ds() {
  return this.each(Rs);
}
function Is(t) {
  var e = typeof t == "function" ? t : ii(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Hs() {
  return null;
}
function Ls(t, e) {
  var n = typeof t == "function" ? t : ii(t), i = e == null ? Hs : typeof e == "function" ? e : rn(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Os() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Bs() {
  return this.each(Os);
}
function Fs() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Vs() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function qs(t) {
  return this.select(t ? Vs : Fs);
}
function Ws(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Xs(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Ys(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function Gs(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, r = e.length, o; n < r; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++i] = o;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function Us(t, e, n) {
  return function() {
    var i = this.__on, r, o = Xs(e);
    if (i) {
      for (var s = 0, a = i.length; s < a; ++s)
        if ((r = i[s]).type === t.type && r.name === t.name) {
          this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = o, r.options = n), r.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), r = { type: t.type, name: t.name, value: e, listener: o, options: n }, i ? i.push(r) : this.__on = [r];
  };
}
function Zs(t, e, n) {
  var i = Ys(t + ""), r, o = i.length, s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var h = 0, l = a.length, c; h < l; ++h)
        for (r = 0, c = a[h]; r < o; ++r)
          if ((s = i[r]).type === c.type && s.name === c.name)
            return c.value;
    }
    return;
  }
  for (a = e ? Us : Gs, r = 0; r < o; ++r)
    this.each(a(i[r], e, n));
  return this;
}
function di(t, e, n) {
  var i = li(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function Ks(t, e) {
  return function() {
    return di(this, t, e);
  };
}
function Qs(t, e) {
  return function() {
    return di(this, t, e.apply(this, arguments));
  };
}
function Js(t, e) {
  return this.each((typeof e == "function" ? Qs : Ks)(t, e));
}
function* js() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, o = i.length, s; r < o; ++r)
      (s = i[r]) && (yield s);
}
var gi = [null];
function K(t, e) {
  this._groups = t, this._parents = e;
}
function qt() {
  return new K([[document.documentElement]], gi);
}
function to() {
  return this;
}
K.prototype = qt.prototype = {
  constructor: K,
  select: Sr,
  selectAll: Pr,
  selectChild: Rr,
  selectChildren: Lr,
  filter: Or,
  data: Xr,
  enter: Br,
  exit: Gr,
  join: Ur,
  merge: Zr,
  selection: to,
  order: Kr,
  sort: Qr,
  call: jr,
  nodes: ts,
  node: es,
  size: ns,
  empty: is,
  each: rs,
  attr: cs,
  style: ps,
  property: ws,
  classed: Ms,
  text: ks,
  html: Ns,
  raise: Es,
  lower: Ds,
  append: Is,
  insert: Ls,
  remove: Bs,
  clone: qs,
  datum: Ws,
  on: Zs,
  dispatch: Js,
  [Symbol.iterator]: js
};
function V(t) {
  return typeof t == "string" ? new K([[document.querySelector(t)]], [document.documentElement]) : new K([[t]], gi);
}
function eo(t) {
  let e;
  for (; e = t.sourceEvent; )
    t = e;
  return t;
}
function ut(t, e) {
  if (t = eo(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var i = n.createSVGPoint();
      return i.x = t.clientX, i.y = t.clientY, i = i.matrixTransform(e.getScreenCTM().inverse()), [i.x, i.y];
    }
    if (e.getBoundingClientRect) {
      var r = e.getBoundingClientRect();
      return [t.clientX - r.left - e.clientLeft, t.clientY - r.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
const qe = { capture: !0, passive: !1 };
function We(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function no(t) {
  var e = t.document.documentElement, n = V(t).on("dragstart.drag", We, qe);
  "onselectstart" in e ? n.on("selectstart.drag", We, qe) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function io(t, e) {
  var n = t.document.documentElement, i = V(t).on("dragstart.drag", null);
  e && (i.on("click.drag", We, qe), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function Wt(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function be(t, e) {
  var n = Object.create(t.prototype);
  for (var i in e)
    n[i] = e[i];
  return n;
}
function xt() {
}
var Ht = 0.7, he = 1 / Ht, _t = "\\s*([+-]?\\d+)\\s*", Lt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", et = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ro = /^#([0-9a-f]{3,8})$/, so = new RegExp(`^rgb\\(${_t},${_t},${_t}\\)$`), oo = new RegExp(`^rgb\\(${et},${et},${et}\\)$`), ao = new RegExp(`^rgba\\(${_t},${_t},${_t},${Lt}\\)$`), lo = new RegExp(`^rgba\\(${et},${et},${et},${Lt}\\)$`), ho = new RegExp(`^hsl\\(${Lt},${et},${et}\\)$`), uo = new RegExp(`^hsla\\(${Lt},${et},${et},${Lt}\\)$`), bn = {
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
Wt(xt, pt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: _n,
  // Deprecated! Use color.formatHex.
  formatHex: _n,
  formatHex8: co,
  formatHsl: fo,
  formatRgb: Mn,
  toString: Mn
});
function _n() {
  return this.rgb().formatHex();
}
function co() {
  return this.rgb().formatHex8();
}
function fo() {
  return mi(this).formatHsl();
}
function Mn() {
  return this.rgb().formatRgb();
}
function pt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = ro.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Cn(e) : n === 3 ? new W(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Gt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Gt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = so.exec(t)) ? new W(e[1], e[2], e[3], 1) : (e = oo.exec(t)) ? new W(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ao.exec(t)) ? Gt(e[1], e[2], e[3], e[4]) : (e = lo.exec(t)) ? Gt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = ho.exec(t)) ? kn(e[1], e[2] / 100, e[3] / 100, 1) : (e = uo.exec(t)) ? kn(e[1], e[2] / 100, e[3] / 100, e[4]) : bn.hasOwnProperty(t) ? Cn(bn[t]) : t === "transparent" ? new W(NaN, NaN, NaN, 0) : null;
}
function Cn(t) {
  return new W(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Gt(t, e, n, i) {
  return i <= 0 && (t = e = n = NaN), new W(t, e, n, i);
}
function pi(t) {
  return t instanceof xt || (t = pt(t)), t ? (t = t.rgb(), new W(t.r, t.g, t.b, t.opacity)) : new W();
}
function ue(t, e, n, i) {
  return arguments.length === 1 ? pi(t) : new W(t, e, n, i ?? 1);
}
function W(t, e, n, i) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +i;
}
Wt(W, ue, be(xt, {
  brighter(t) {
    return t = t == null ? he : Math.pow(he, t), new W(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ht : Math.pow(Ht, t), new W(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new W(gt(this.r), gt(this.g), gt(this.b), ce(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Tn,
  // Deprecated! Use color.formatHex.
  formatHex: Tn,
  formatHex8: go,
  formatRgb: Sn,
  toString: Sn
}));
function Tn() {
  return `#${dt(this.r)}${dt(this.g)}${dt(this.b)}`;
}
function go() {
  return `#${dt(this.r)}${dt(this.g)}${dt(this.b)}${dt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Sn() {
  const t = ce(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${gt(this.r)}, ${gt(this.g)}, ${gt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function ce(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function gt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function dt(t) {
  return t = gt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function kn(t, e, n, i) {
  return i <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new J(t, e, n, i);
}
function mi(t) {
  if (t instanceof J)
    return new J(t.h, t.s, t.l, t.opacity);
  if (t instanceof xt || (t = pt(t)), !t)
    return new J();
  if (t instanceof J)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, i = t.b / 255, r = Math.min(e, n, i), o = Math.max(e, n, i), s = NaN, a = o - r, h = (o + r) / 2;
  return a ? (e === o ? s = (n - i) / a + (n < i) * 6 : n === o ? s = (i - e) / a + 2 : s = (e - n) / a + 4, a /= h < 0.5 ? o + r : 2 - o - r, s *= 60) : a = h > 0 && h < 1 ? 0 : s, new J(s, a, h, t.opacity);
}
function Et(t, e, n, i) {
  return arguments.length === 1 ? mi(t) : new J(t, e, n, i ?? 1);
}
function J(t, e, n, i) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +i;
}
Wt(J, Et, be(xt, {
  brighter(t) {
    return t = t == null ? he : Math.pow(he, t), new J(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ht : Math.pow(Ht, t), new J(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * e, r = 2 * n - i;
    return new W(
      Pe(t >= 240 ? t - 240 : t + 120, r, i),
      Pe(t, r, i),
      Pe(t < 120 ? t + 240 : t - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new J(An(this.h), Ut(this.s), Ut(this.l), ce(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = ce(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${An(this.h)}, ${Ut(this.s) * 100}%, ${Ut(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function An(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Ut(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Pe(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const po = Math.PI / 180, mo = 180 / Math.PI, fe = 18, yi = 0.96422, xi = 1, wi = 0.82521, vi = 4 / 29, Mt = 6 / 29, bi = 3 * Mt * Mt, yo = Mt * Mt * Mt;
function _i(t) {
  if (t instanceof nt)
    return new nt(t.l, t.a, t.b, t.opacity);
  if (t instanceof st)
    return Mi(t);
  t instanceof W || (t = pi(t));
  var e = Re(t.r), n = Re(t.g), i = Re(t.b), r = Ne((0.2225045 * e + 0.7168786 * n + 0.0606169 * i) / xi), o, s;
  return e === n && n === i ? o = s = r : (o = Ne((0.4360747 * e + 0.3850649 * n + 0.1430804 * i) / yi), s = Ne((0.0139322 * e + 0.0971045 * n + 0.7141733 * i) / wi)), new nt(116 * r - 16, 500 * (o - r), 200 * (r - s), t.opacity);
}
function mt(t, e, n, i) {
  return arguments.length === 1 ? _i(t) : new nt(t, e, n, i ?? 1);
}
function nt(t, e, n, i) {
  this.l = +t, this.a = +e, this.b = +n, this.opacity = +i;
}
Wt(nt, mt, be(xt, {
  brighter(t) {
    return new nt(this.l + fe * (t ?? 1), this.a, this.b, this.opacity);
  },
  darker(t) {
    return new nt(this.l - fe * (t ?? 1), this.a, this.b, this.opacity);
  },
  rgb() {
    var t = (this.l + 16) / 116, e = isNaN(this.a) ? t : t + this.a / 500, n = isNaN(this.b) ? t : t - this.b / 200;
    return e = yi * ze(e), t = xi * ze(t), n = wi * ze(n), new W(
      Ee(3.1338561 * e - 1.6168667 * t - 0.4906146 * n),
      Ee(-0.9787684 * e + 1.9161415 * t + 0.033454 * n),
      Ee(0.0719453 * e - 0.2289914 * t + 1.4052427 * n),
      this.opacity
    );
  }
}));
function Ne(t) {
  return t > yo ? Math.pow(t, 1 / 3) : t / bi + vi;
}
function ze(t) {
  return t > Mt ? t * t * t : bi * (t - vi);
}
function Ee(t) {
  return 255 * (t <= 31308e-7 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055);
}
function Re(t) {
  return (t /= 255) <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
}
function xo(t) {
  if (t instanceof st)
    return new st(t.h, t.c, t.l, t.opacity);
  if (t instanceof nt || (t = _i(t)), t.a === 0 && t.b === 0)
    return new st(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
  var e = Math.atan2(t.b, t.a) * mo;
  return new st(e < 0 ? e + 360 : e, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity);
}
function wo(t, e, n, i) {
  return arguments.length === 1 ? xo(t) : new st(t, e, n, i ?? 1);
}
function st(t, e, n, i) {
  this.h = +t, this.c = +e, this.l = +n, this.opacity = +i;
}
function Mi(t) {
  if (isNaN(t.h))
    return new nt(t.l, 0, 0, t.opacity);
  var e = t.h * po;
  return new nt(t.l, Math.cos(e) * t.c, Math.sin(e) * t.c, t.opacity);
}
Wt(st, wo, be(xt, {
  brighter(t) {
    return new st(this.h, this.c, this.l + fe * (t ?? 1), this.opacity);
  },
  darker(t) {
    return new st(this.h, this.c, this.l - fe * (t ?? 1), this.opacity);
  },
  rgb() {
    return Mi(this).rgb();
  }
}));
const on = (t) => () => t;
function vo(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function bo(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(i) {
    return Math.pow(t + i * e, n);
  };
}
function _o(t) {
  return (t = +t) == 1 ? wt : function(e, n) {
    return n - e ? bo(e, n, t) : on(isNaN(e) ? n : e);
  };
}
function wt(t, e) {
  var n = e - t;
  return n ? vo(t, n) : on(isNaN(t) ? e : t);
}
const de = function t(e) {
  var n = _o(e);
  function i(r, o) {
    var s = n((r = ue(r)).r, (o = ue(o)).r), a = n(r.g, o.g), h = n(r.b, o.b), l = wt(r.opacity, o.opacity);
    return function(c) {
      return r.r = s(c), r.g = a(c), r.b = h(c), r.opacity = l(c), r + "";
    };
  }
  return i.gamma = t, i;
}(1);
function Mo(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, i = e.slice(), r;
  return function(o) {
    for (r = 0; r < n; ++r)
      i[r] = t[r] * (1 - o) + e[r] * o;
    return i;
  };
}
function Co(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function To(t, e) {
  var n = e ? e.length : 0, i = t ? Math.min(n, t.length) : 0, r = new Array(i), o = new Array(n), s;
  for (s = 0; s < i; ++s)
    r[s] = Ct(t[s], e[s]);
  for (; s < n; ++s)
    o[s] = e[s];
  return function(a) {
    for (s = 0; s < i; ++s)
      o[s] = r[s](a);
    return o;
  };
}
function So(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(i) {
    return n.setTime(t * (1 - i) + e * i), n;
  };
}
function Q(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function ko(t, e) {
  var n = {}, i = {}, r;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (r in e)
    r in t ? n[r] = Ct(t[r], e[r]) : i[r] = e[r];
  return function(o) {
    for (r in n)
      i[r] = n[r](o);
    return i;
  };
}
var Xe = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, De = new RegExp(Xe.source, "g");
function Ao(t) {
  return function() {
    return t;
  };
}
function $o(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Ci(t, e) {
  var n = Xe.lastIndex = De.lastIndex = 0, i, r, o, s = -1, a = [], h = [];
  for (t = t + "", e = e + ""; (i = Xe.exec(t)) && (r = De.exec(e)); )
    (o = r.index) > n && (o = e.slice(n, o), a[s] ? a[s] += o : a[++s] = o), (i = i[0]) === (r = r[0]) ? a[s] ? a[s] += r : a[++s] = r : (a[++s] = null, h.push({ i: s, x: Q(i, r) })), n = De.lastIndex;
  return n < e.length && (o = e.slice(n), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? h[0] ? $o(h[0].x) : Ao(e) : (e = h.length, function(l) {
    for (var c = 0, d; c < e; ++c)
      a[(d = h[c]).i] = d.x(l);
    return a.join("");
  });
}
function Ct(t, e) {
  var n = typeof e, i;
  return e == null || n === "boolean" ? on(e) : (n === "number" ? Q : n === "string" ? (i = pt(e)) ? (e = i, de) : Ci : e instanceof pt ? de : e instanceof Date ? So : Co(e) ? Mo : Array.isArray(e) ? To : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? ko : Q)(t, e);
}
function Po(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var $n = 180 / Math.PI, Ye = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Ti(t, e, n, i, r, o) {
  var s, a, h;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (h = t * n + e * i) && (n -= t * h, i -= e * h), (a = Math.sqrt(n * n + i * i)) && (n /= a, i /= a, h /= a), t * i < e * n && (t = -t, e = -e, h = -h, s = -s), {
    translateX: r,
    translateY: o,
    rotate: Math.atan2(e, t) * $n,
    skewX: Math.atan(h) * $n,
    scaleX: s,
    scaleY: a
  };
}
var Zt;
function No(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Ye : Ti(e.a, e.b, e.c, e.d, e.e, e.f);
}
function zo(t) {
  return t == null || (Zt || (Zt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Zt.setAttribute("transform", t), !(t = Zt.transform.baseVal.consolidate())) ? Ye : (t = t.matrix, Ti(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Si(t, e, n, i) {
  function r(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, c, d, u, f, p) {
    if (l !== d || c !== u) {
      var y = f.push("translate(", null, e, null, n);
      p.push({ i: y - 4, x: Q(l, d) }, { i: y - 2, x: Q(c, u) });
    } else
      (d || u) && f.push("translate(" + d + e + u + n);
  }
  function s(l, c, d, u) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), u.push({ i: d.push(r(d) + "rotate(", null, i) - 2, x: Q(l, c) })) : c && d.push(r(d) + "rotate(" + c + i);
  }
  function a(l, c, d, u) {
    l !== c ? u.push({ i: d.push(r(d) + "skewX(", null, i) - 2, x: Q(l, c) }) : c && d.push(r(d) + "skewX(" + c + i);
  }
  function h(l, c, d, u, f, p) {
    if (l !== d || c !== u) {
      var y = f.push(r(f) + "scale(", null, ",", null, ")");
      p.push({ i: y - 4, x: Q(l, d) }, { i: y - 2, x: Q(c, u) });
    } else
      (d !== 1 || u !== 1) && f.push(r(f) + "scale(" + d + "," + u + ")");
  }
  return function(l, c) {
    var d = [], u = [];
    return l = t(l), c = t(c), o(l.translateX, l.translateY, c.translateX, c.translateY, d, u), s(l.rotate, c.rotate, d, u), a(l.skewX, c.skewX, d, u), h(l.scaleX, l.scaleY, c.scaleX, c.scaleY, d, u), l = c = null, function(f) {
      for (var p = -1, y = u.length, w; ++p < y; )
        d[(w = u[p]).i] = w.x(f);
      return d.join("");
    };
  };
}
var Eo = Si(No, "px, ", "px)", "deg)"), Ro = Si(zo, ", ", ")", ")"), Do = 1e-12;
function Pn(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Io(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Ho(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Lo = function t(e, n, i) {
  function r(o, s) {
    var a = o[0], h = o[1], l = o[2], c = s[0], d = s[1], u = s[2], f = c - a, p = d - h, y = f * f + p * p, w, m;
    if (y < Do)
      m = Math.log(u / l) / e, w = function(D) {
        return [
          a + D * f,
          h + D * p,
          l * Math.exp(e * D * m)
        ];
      };
    else {
      var b = Math.sqrt(y), M = (u * u - l * l + i * y) / (2 * l * n * b), P = (u * u - l * l - i * y) / (2 * u * n * b), N = Math.log(Math.sqrt(M * M + 1) - M), z = Math.log(Math.sqrt(P * P + 1) - P);
      m = (z - N) / e, w = function(D) {
        var F = D * m, H = Pn(N), L = l / (n * b) * (H * Ho(e * F + N) - Io(N));
        return [
          a + L * f,
          h + L * p,
          l * H / Pn(e * F + N)
        ];
      };
    }
    return w.duration = m * 1e3 * e / Math.SQRT2, w;
  }
  return r.rho = function(o) {
    var s = Math.max(1e-3, +o), a = s * s, h = a * a;
    return t(s, a, h);
  }, r;
}(Math.SQRT2, 2, 4);
function an(t, e) {
  var n = wt((t = mt(t)).l, (e = mt(e)).l), i = wt(t.a, e.a), r = wt(t.b, e.b), o = wt(t.opacity, e.opacity);
  return function(s) {
    return t.l = n(s), t.a = i(s), t.b = r(s), t.opacity = o(s), t + "";
  };
}
var St = 0, Rt = 0, $t = 0, ki = 1e3, ge, Dt, pe = 0, yt = 0, _e = 0, Ot = typeof performance == "object" && performance.now ? performance : Date, Ai = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function ln() {
  return yt || (Ai(Oo), yt = Ot.now() + _e);
}
function Oo() {
  yt = 0;
}
function me() {
  this._call = this._time = this._next = null;
}
me.prototype = $i.prototype = {
  constructor: me,
  restart: function(t, e, n) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? ln() : +n) + (e == null ? 0 : +e), !this._next && Dt !== this && (Dt ? Dt._next = this : ge = this, Dt = this), this._call = t, this._time = n, Ge();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ge());
  }
};
function $i(t, e, n) {
  var i = new me();
  return i.restart(t, e, n), i;
}
function Bo() {
  ln(), ++St;
  for (var t = ge, e; t; )
    (e = yt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --St;
}
function Nn() {
  yt = (pe = Ot.now()) + _e, St = Rt = 0;
  try {
    Bo();
  } finally {
    St = 0, Vo(), yt = 0;
  }
}
function Fo() {
  var t = Ot.now(), e = t - pe;
  e > ki && (_e -= e, pe = t);
}
function Vo() {
  for (var t, e = ge, n, i = 1 / 0; e; )
    e._call ? (i > e._time && (i = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : ge = n);
  Dt = t, Ge(i);
}
function Ge(t) {
  if (!St) {
    Rt && (Rt = clearTimeout(Rt));
    var e = t - yt;
    e > 24 ? (t < 1 / 0 && (Rt = setTimeout(Nn, t - Ot.now() - _e)), $t && ($t = clearInterval($t))) : ($t || (pe = Ot.now(), $t = setInterval(Fo, ki)), St = 1, Ai(Nn));
  }
}
function zn(t, e, n) {
  var i = new me();
  return e = e == null ? 0 : +e, i.restart((r) => {
    i.stop(), t(r + e);
  }, e, n), i;
}
var qo = nn("start", "end", "cancel", "interrupt"), Wo = [], Pi = 0, En = 1, Ue = 2, ee = 3, Rn = 4, Ze = 5, ne = 6;
function Me(t, e, n, i, r, o) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (n in s)
    return;
  Xo(t, n, {
    name: e,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: qo,
    tween: Wo,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Pi
  });
}
function hn(t, e) {
  var n = j(t, e);
  if (n.state > Pi)
    throw new Error("too late; already scheduled");
  return n;
}
function it(t, e) {
  var n = j(t, e);
  if (n.state > ee)
    throw new Error("too late; already running");
  return n;
}
function j(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e]))
    throw new Error("transition not found");
  return n;
}
function Xo(t, e, n) {
  var i = t.__transition, r;
  i[e] = n, n.timer = $i(o, 0, n.time);
  function o(l) {
    n.state = En, n.timer.restart(s, n.delay, n.time), n.delay <= l && s(l - n.delay);
  }
  function s(l) {
    var c, d, u, f;
    if (n.state !== En)
      return h();
    for (c in i)
      if (f = i[c], f.name === n.name) {
        if (f.state === ee)
          return zn(s);
        f.state === Rn ? (f.state = ne, f.timer.stop(), f.on.call("interrupt", t, t.__data__, f.index, f.group), delete i[c]) : +c < e && (f.state = ne, f.timer.stop(), f.on.call("cancel", t, t.__data__, f.index, f.group), delete i[c]);
      }
    if (zn(function() {
      n.state === ee && (n.state = Rn, n.timer.restart(a, n.delay, n.time), a(l));
    }), n.state = Ue, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Ue) {
      for (n.state = ee, r = new Array(u = n.tween.length), c = 0, d = -1; c < u; ++c)
        (f = n.tween[c].value.call(t, t.__data__, n.index, n.group)) && (r[++d] = f);
      r.length = d + 1;
    }
  }
  function a(l) {
    for (var c = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(h), n.state = Ze, 1), d = -1, u = r.length; ++d < u; )
      r[d].call(t, c);
    n.state === Ze && (n.on.call("end", t, t.__data__, n.index, n.group), h());
  }
  function h() {
    n.state = ne, n.timer.stop(), delete i[e];
    for (var l in i)
      return;
    delete t.__transition;
  }
}
function ie(t, e) {
  var n = t.__transition, i, r, o = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((i = n[s]).name !== e) {
        o = !1;
        continue;
      }
      r = i.state > Ue && i.state < Ze, i.state = ne, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", t, t.__data__, i.index, i.group), delete n[s];
    }
    o && delete t.__transition;
  }
}
function Yo(t) {
  return this.each(function() {
    ie(this, t);
  });
}
function Go(t, e) {
  var n, i;
  return function() {
    var r = it(this, t), o = r.tween;
    if (o !== n) {
      i = n = o;
      for (var s = 0, a = i.length; s < a; ++s)
        if (i[s].name === e) {
          i = i.slice(), i.splice(s, 1);
          break;
        }
    }
    r.tween = i;
  };
}
function Uo(t, e, n) {
  var i, r;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var o = it(this, t), s = o.tween;
    if (s !== i) {
      r = (i = s).slice();
      for (var a = { name: e, value: n }, h = 0, l = r.length; h < l; ++h)
        if (r[h].name === e) {
          r[h] = a;
          break;
        }
      h === l && r.push(a);
    }
    o.tween = r;
  };
}
function Zo(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = j(this.node(), n).tween, r = 0, o = i.length, s; r < o; ++r)
      if ((s = i[r]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Go : Uo)(n, t, e));
}
function un(t, e, n) {
  var i = t._id;
  return t.each(function() {
    var r = it(this, i);
    (r.value || (r.value = {}))[e] = n.apply(this, arguments);
  }), function(r) {
    return j(r, i).value[e];
  };
}
function Ni(t, e) {
  var n;
  return (typeof e == "number" ? Q : e instanceof pt ? de : (n = pt(e)) ? (e = n, de) : Ci)(t, e);
}
function Ko(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Qo(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Jo(t, e, n) {
  var i, r = n + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === r ? null : s === i ? o : o = e(i = s, n);
  };
}
function jo(t, e, n) {
  var i, r = n + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === r ? null : s === i ? o : o = e(i = s, n);
  };
}
function ta(t, e, n) {
  var i, r, o;
  return function() {
    var s, a = n(this), h;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), h = a + "", s === h ? null : s === i && h === r ? o : (r = h, o = e(i = s, a)));
  };
}
function ea(t, e, n) {
  var i, r, o;
  return function() {
    var s, a = n(this), h;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), h = a + "", s === h ? null : s === i && h === r ? o : (r = h, o = e(i = s, a)));
  };
}
function na(t, e) {
  var n = ve(t), i = n === "transform" ? Ro : Ni;
  return this.attrTween(t, typeof e == "function" ? (n.local ? ea : ta)(n, i, un(this, "attr." + t, e)) : e == null ? (n.local ? Qo : Ko)(n) : (n.local ? jo : Jo)(n, i, e));
}
function ia(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function ra(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function sa(t, e) {
  var n, i;
  function r() {
    var o = e.apply(this, arguments);
    return o !== i && (n = (i = o) && ra(t, o)), n;
  }
  return r._value = e, r;
}
function oa(t, e) {
  var n, i;
  function r() {
    var o = e.apply(this, arguments);
    return o !== i && (n = (i = o) && ia(t, o)), n;
  }
  return r._value = e, r;
}
function aa(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (e == null)
    return this.tween(n, null);
  if (typeof e != "function")
    throw new Error();
  var i = ve(t);
  return this.tween(n, (i.local ? sa : oa)(i, e));
}
function la(t, e) {
  return function() {
    hn(this, t).delay = +e.apply(this, arguments);
  };
}
function ha(t, e) {
  return e = +e, function() {
    hn(this, t).delay = e;
  };
}
function ua(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? la : ha)(e, t)) : j(this.node(), e).delay;
}
function ca(t, e) {
  return function() {
    it(this, t).duration = +e.apply(this, arguments);
  };
}
function fa(t, e) {
  return e = +e, function() {
    it(this, t).duration = e;
  };
}
function da(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ca : fa)(e, t)) : j(this.node(), e).duration;
}
function ga(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    it(this, t).ease = e;
  };
}
function pa(t) {
  var e = this._id;
  return arguments.length ? this.each(ga(e, t)) : j(this.node(), e).ease;
}
function ma(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    it(this, t).ease = n;
  };
}
function ya(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(ma(this._id, t));
}
function xa(t) {
  typeof t != "function" && (t = si(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = e[r], s = o.length, a = i[r] = [], h, l = 0; l < s; ++l)
      (h = o[l]) && t.call(h, h.__data__, l, o) && a.push(h);
  return new at(i, this._parents, this._name, this._id);
}
function wa(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, o = Math.min(i, r), s = new Array(i), a = 0; a < o; ++a)
    for (var h = e[a], l = n[a], c = h.length, d = s[a] = new Array(c), u, f = 0; f < c; ++f)
      (u = h[f] || l[f]) && (d[f] = u);
  for (; a < i; ++a)
    s[a] = e[a];
  return new at(s, this._parents, this._name, this._id);
}
function va(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function ba(t, e, n) {
  var i, r, o = va(e) ? hn : it;
  return function() {
    var s = o(this, t), a = s.on;
    a !== i && (r = (i = a).copy()).on(e, n), s.on = r;
  };
}
function _a(t, e) {
  var n = this._id;
  return arguments.length < 2 ? j(this.node(), n).on.on(t) : this.each(ba(n, t, e));
}
function Ma(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition)
      if (+n !== t)
        return;
    e && e.removeChild(this);
  };
}
function Ca() {
  return this.on("end.remove", Ma(this._id));
}
function Ta(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = rn(t));
  for (var i = this._groups, r = i.length, o = new Array(r), s = 0; s < r; ++s)
    for (var a = i[s], h = a.length, l = o[s] = new Array(h), c, d, u = 0; u < h; ++u)
      (c = a[u]) && (d = t.call(c, c.__data__, u, a)) && ("__data__" in c && (d.__data__ = c.__data__), l[u] = d, Me(l[u], e, n, u, l, j(c, n)));
  return new at(o, this._parents, e, n);
}
function Sa(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = ri(t));
  for (var i = this._groups, r = i.length, o = [], s = [], a = 0; a < r; ++a)
    for (var h = i[a], l = h.length, c, d = 0; d < l; ++d)
      if (c = h[d]) {
        for (var u = t.call(c, c.__data__, d, h), f, p = j(c, n), y = 0, w = u.length; y < w; ++y)
          (f = u[y]) && Me(f, e, n, y, u, p);
        o.push(u), s.push(c);
      }
  return new at(o, s, e, n);
}
var ka = qt.prototype.constructor;
function Aa() {
  return new ka(this._groups, this._parents);
}
function $a(t, e) {
  var n, i, r;
  return function() {
    var o = Tt(this, t), s = (this.style.removeProperty(t), Tt(this, t));
    return o === s ? null : o === n && s === i ? r : r = e(n = o, i = s);
  };
}
function zi(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Pa(t, e, n) {
  var i, r = n + "", o;
  return function() {
    var s = Tt(this, t);
    return s === r ? null : s === i ? o : o = e(i = s, n);
  };
}
function Na(t, e, n) {
  var i, r, o;
  return function() {
    var s = Tt(this, t), a = n(this), h = a + "";
    return a == null && (h = a = (this.style.removeProperty(t), Tt(this, t))), s === h ? null : s === i && h === r ? o : (r = h, o = e(i = s, a));
  };
}
function za(t, e) {
  var n, i, r, o = "style." + e, s = "end." + o, a;
  return function() {
    var h = it(this, t), l = h.on, c = h.value[o] == null ? a || (a = zi(e)) : void 0;
    (l !== n || r !== c) && (i = (n = l).copy()).on(s, r = c), h.on = i;
  };
}
function Ea(t, e, n) {
  var i = (t += "") == "transform" ? Eo : Ni;
  return e == null ? this.styleTween(t, $a(t, i)).on("end.style." + t, zi(t)) : typeof e == "function" ? this.styleTween(t, Na(t, i, un(this, "style." + t, e))).each(za(this._id, t)) : this.styleTween(t, Pa(t, i, e), n).on("end.style." + t, null);
}
function Ra(t, e, n) {
  return function(i) {
    this.style.setProperty(t, e.call(this, i), n);
  };
}
function Da(t, e, n) {
  var i, r;
  function o() {
    var s = e.apply(this, arguments);
    return s !== r && (i = (r = s) && Ra(t, s, n)), i;
  }
  return o._value = e, o;
}
function Ia(t, e, n) {
  var i = "style." + (t += "");
  if (arguments.length < 2)
    return (i = this.tween(i)) && i._value;
  if (e == null)
    return this.tween(i, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(i, Da(t, e, n ?? ""));
}
function Ha(t) {
  return function() {
    this.textContent = t;
  };
}
function La(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Oa(t) {
  return this.tween("text", typeof t == "function" ? La(un(this, "text", t)) : Ha(t == null ? "" : t + ""));
}
function Ba(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Fa(t) {
  var e, n;
  function i() {
    var r = t.apply(this, arguments);
    return r !== n && (e = (n = r) && Ba(r)), e;
  }
  return i._value = t, i;
}
function Va(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, Fa(t));
}
function qa() {
  for (var t = this._name, e = this._id, n = Ei(), i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var s = i[o], a = s.length, h, l = 0; l < a; ++l)
      if (h = s[l]) {
        var c = j(h, e);
        Me(h, t, n, l, s, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new at(i, this._parents, t, n);
}
function Wa() {
  var t, e, n = this, i = n._id, r = n.size();
  return new Promise(function(o, s) {
    var a = { value: s }, h = { value: function() {
      --r === 0 && o();
    } };
    n.each(function() {
      var l = it(this, i), c = l.on;
      c !== t && (e = (t = c).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(h)), l.on = e;
    }), r === 0 && o();
  });
}
var Xa = 0;
function at(t, e, n, i) {
  this._groups = t, this._parents = e, this._name = n, this._id = i;
}
function Ei() {
  return ++Xa;
}
var rt = qt.prototype;
at.prototype = {
  constructor: at,
  select: Ta,
  selectAll: Sa,
  selectChild: rt.selectChild,
  selectChildren: rt.selectChildren,
  filter: xa,
  merge: wa,
  selection: Aa,
  transition: qa,
  call: rt.call,
  nodes: rt.nodes,
  node: rt.node,
  size: rt.size,
  empty: rt.empty,
  each: rt.each,
  on: _a,
  attr: na,
  attrTween: aa,
  style: Ea,
  styleTween: Ia,
  text: Oa,
  textTween: Va,
  remove: Ca,
  tween: Zo,
  delay: ua,
  duration: da,
  ease: pa,
  easeVarying: ya,
  end: Wa,
  [Symbol.iterator]: rt[Symbol.iterator]
};
function Ya(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ga = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Ya
};
function Ua(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Za(t) {
  var e, n;
  t instanceof at ? (e = t._id, t = t._name) : (e = Ei(), (n = Ga).time = ln(), t = t == null ? null : t + "");
  for (var i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var s = i[o], a = s.length, h, l = 0; l < a; ++l)
      (h = s[l]) && Me(h, t, e, l, s, n || Ua(h, e));
  return new at(i, this._parents, t, e);
}
qt.prototype.interrupt = Yo;
qt.prototype.transition = Za;
const Ke = Math.PI, Qe = 2 * Ke, ft = 1e-6, Ka = Qe - ft;
function Ri(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function Qa(t) {
  let e = Math.floor(t);
  if (!(e >= 0))
    throw new Error(`invalid digits: ${t}`);
  if (e > 15)
    return Ri;
  const n = 10 ** e;
  return function(i) {
    this._ += i[0];
    for (let r = 1, o = i.length; r < o; ++r)
      this._ += Math.round(arguments[r] * n) / n + i[r];
  };
}
class Ja {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Ri : Qa(e);
  }
  moveTo(e, n) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(e, n) {
    this._append`L${this._x1 = +e},${this._y1 = +n}`;
  }
  quadraticCurveTo(e, n, i, r) {
    this._append`Q${+e},${+n},${this._x1 = +i},${this._y1 = +r}`;
  }
  bezierCurveTo(e, n, i, r, o, s) {
    this._append`C${+e},${+n},${+i},${+r},${this._x1 = +o},${this._y1 = +s}`;
  }
  arcTo(e, n, i, r, o) {
    if (e = +e, n = +n, i = +i, r = +r, o = +o, o < 0)
      throw new Error(`negative radius: ${o}`);
    let s = this._x1, a = this._y1, h = i - e, l = r - n, c = s - e, d = a - n, u = c * c + d * d;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (u > ft)
      if (!(Math.abs(d * h - l * c) > ft) || !o)
        this._append`L${this._x1 = e},${this._y1 = n}`;
      else {
        let f = i - s, p = r - a, y = h * h + l * l, w = f * f + p * p, m = Math.sqrt(y), b = Math.sqrt(u), M = o * Math.tan((Ke - Math.acos((y + u - w) / (2 * m * b))) / 2), P = M / b, N = M / m;
        Math.abs(P - 1) > ft && this._append`L${e + P * c},${n + P * d}`, this._append`A${o},${o},0,0,${+(d * f > c * p)},${this._x1 = e + N * h},${this._y1 = n + N * l}`;
      }
  }
  arc(e, n, i, r, o, s) {
    if (e = +e, n = +n, i = +i, s = !!s, i < 0)
      throw new Error(`negative radius: ${i}`);
    let a = i * Math.cos(r), h = i * Math.sin(r), l = e + a, c = n + h, d = 1 ^ s, u = s ? r - o : o - r;
    this._x1 === null ? this._append`M${l},${c}` : (Math.abs(this._x1 - l) > ft || Math.abs(this._y1 - c) > ft) && this._append`L${l},${c}`, i && (u < 0 && (u = u % Qe + Qe), u > Ka ? this._append`A${i},${i},0,1,${d},${e - a},${n - h}A${i},${i},0,1,${d},${this._x1 = l},${this._y1 = c}` : u > ft && this._append`A${i},${i},0,${+(u >= Ke)},${d},${this._x1 = e + i * Math.cos(o)},${this._y1 = n + i * Math.sin(o)}`);
  }
  rect(e, n, i, r) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${i = +i}v${+r}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function ja(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function ye(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0)
    return null;
  var n, i = t.slice(0, n);
  return [
    i.length > 1 ? i[0] + i.slice(2) : i,
    +t.slice(n + 1)
  ];
}
function kt(t) {
  return t = ye(Math.abs(t)), t ? t[1] : NaN;
}
function tl(t, e) {
  return function(n, i) {
    for (var r = n.length, o = [], s = 0, a = t[0], h = 0; r > 0 && a > 0 && (h + a + 1 > i && (a = Math.max(1, i - h)), o.push(n.substring(r -= a, r + a)), !((h += a + 1) > i)); )
      a = t[s = (s + 1) % t.length];
    return o.reverse().join(e);
  };
}
function el(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var nl = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function xe(t) {
  if (!(e = nl.exec(t)))
    throw new Error("invalid format: " + t);
  var e;
  return new cn({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
xe.prototype = cn.prototype;
function cn(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
cn.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function il(t) {
  t:
    for (var e = t.length, n = 1, i = -1, r; n < e; ++n)
      switch (t[n]) {
        case ".":
          i = r = n;
          break;
        case "0":
          i === 0 && (i = n), r = n;
          break;
        default:
          if (!+t[n])
            break t;
          i > 0 && (i = 0);
          break;
      }
  return i > 0 ? t.slice(0, i) + t.slice(r + 1) : t;
}
var Di;
function rl(t, e) {
  var n = ye(t, e);
  if (!n)
    return t + "";
  var i = n[0], r = n[1], o = r - (Di = Math.max(-8, Math.min(8, Math.floor(r / 3))) * 3) + 1, s = i.length;
  return o === s ? i : o > s ? i + new Array(o - s + 1).join("0") : o > 0 ? i.slice(0, o) + "." + i.slice(o) : "0." + new Array(1 - o).join("0") + ye(t, Math.max(0, e + o - 1))[0];
}
function Dn(t, e) {
  var n = ye(t, e);
  if (!n)
    return t + "";
  var i = n[0], r = n[1];
  return r < 0 ? "0." + new Array(-r).join("0") + i : i.length > r + 1 ? i.slice(0, r + 1) + "." + i.slice(r + 1) : i + new Array(r - i.length + 2).join("0");
}
const In = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: ja,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Dn(t * 100, e),
  r: Dn,
  s: rl,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Hn(t) {
  return t;
}
var Ln = Array.prototype.map, On = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function sl(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Hn : tl(Ln.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", i = t.currency === void 0 ? "" : t.currency[1] + "", r = t.decimal === void 0 ? "." : t.decimal + "", o = t.numerals === void 0 ? Hn : el(Ln.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", a = t.minus === void 0 ? "−" : t.minus + "", h = t.nan === void 0 ? "NaN" : t.nan + "";
  function l(d) {
    d = xe(d);
    var u = d.fill, f = d.align, p = d.sign, y = d.symbol, w = d.zero, m = d.width, b = d.comma, M = d.precision, P = d.trim, N = d.type;
    N === "n" ? (b = !0, N = "g") : In[N] || (M === void 0 && (M = 12), P = !0, N = "g"), (w || u === "0" && f === "=") && (w = !0, u = "0", f = "=");
    var z = y === "$" ? n : y === "#" && /[boxX]/.test(N) ? "0" + N.toLowerCase() : "", D = y === "$" ? i : /[%p]/.test(N) ? s : "", F = In[N], H = /[defgprs%]/.test(N);
    M = M === void 0 ? 6 : /[gprs]/.test(N) ? Math.max(1, Math.min(21, M)) : Math.max(0, Math.min(20, M));
    function L(k) {
      var R = z, C = D, g, _, x;
      if (N === "c")
        C = F(k) + C, k = "";
      else {
        k = +k;
        var T = k < 0 || 1 / k < 0;
        if (k = isNaN(k) ? h : F(Math.abs(k), M), P && (k = il(k)), T && +k == 0 && p !== "+" && (T = !1), R = (T ? p === "(" ? p : a : p === "-" || p === "(" ? "" : p) + R, C = (N === "s" ? On[8 + Di / 3] : "") + C + (T && p === "(" ? ")" : ""), H) {
          for (g = -1, _ = k.length; ++g < _; )
            if (x = k.charCodeAt(g), 48 > x || x > 57) {
              C = (x === 46 ? r + k.slice(g + 1) : k.slice(g)) + C, k = k.slice(0, g);
              break;
            }
        }
      }
      b && !w && (k = e(k, 1 / 0));
      var $ = R.length + k.length + C.length, A = $ < m ? new Array(m - $ + 1).join(u) : "";
      switch (b && w && (k = e(A + k, A.length ? m - C.length : 1 / 0), A = ""), f) {
        case "<":
          k = R + k + C + A;
          break;
        case "=":
          k = R + A + k + C;
          break;
        case "^":
          k = A.slice(0, $ = A.length >> 1) + R + k + C + A.slice($);
          break;
        default:
          k = A + R + k + C;
          break;
      }
      return o(k);
    }
    return L.toString = function() {
      return d + "";
    }, L;
  }
  function c(d, u) {
    var f = l((d = xe(d), d.type = "f", d)), p = Math.max(-8, Math.min(8, Math.floor(kt(u) / 3))) * 3, y = Math.pow(10, -p), w = On[8 + p / 3];
    return function(m) {
      return f(y * m) + w;
    };
  }
  return {
    format: l,
    formatPrefix: c
  };
}
var Kt, Ii, Hi;
ol({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function ol(t) {
  return Kt = sl(t), Ii = Kt.format, Hi = Kt.formatPrefix, Kt;
}
function al(t) {
  return Math.max(0, -kt(Math.abs(t)));
}
function ll(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(kt(e) / 3))) * 3 - kt(Math.abs(t)));
}
function hl(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, kt(e) - kt(t)) + 1;
}
function ul(t) {
  var e = 0, n = t.children, i = n && n.length;
  if (!i)
    e = 1;
  else
    for (; --i >= 0; )
      e += n[i].value;
  t.value = e;
}
function cl() {
  return this.eachAfter(ul);
}
function fl(t, e) {
  let n = -1;
  for (const i of this)
    t.call(e, i, ++n, this);
  return this;
}
function dl(t, e) {
  for (var n = this, i = [n], r, o, s = -1; n = i.pop(); )
    if (t.call(e, n, ++s, this), r = n.children)
      for (o = r.length - 1; o >= 0; --o)
        i.push(r[o]);
  return this;
}
function gl(t, e) {
  for (var n = this, i = [n], r = [], o, s, a, h = -1; n = i.pop(); )
    if (r.push(n), o = n.children)
      for (s = 0, a = o.length; s < a; ++s)
        i.push(o[s]);
  for (; n = r.pop(); )
    t.call(e, n, ++h, this);
  return this;
}
function pl(t, e) {
  let n = -1;
  for (const i of this)
    if (t.call(e, i, ++n, this))
      return i;
}
function ml(t) {
  return this.eachAfter(function(e) {
    for (var n = +t(e.data) || 0, i = e.children, r = i && i.length; --r >= 0; )
      n += i[r].value;
    e.value = n;
  });
}
function yl(t) {
  return this.eachBefore(function(e) {
    e.children && e.children.sort(t);
  });
}
function xl(t) {
  for (var e = this, n = wl(e, t), i = [e]; e !== n; )
    e = e.parent, i.push(e);
  for (var r = i.length; t !== n; )
    i.splice(r, 0, t), t = t.parent;
  return i;
}
function wl(t, e) {
  if (t === e)
    return t;
  var n = t.ancestors(), i = e.ancestors(), r = null;
  for (t = n.pop(), e = i.pop(); t === e; )
    r = t, t = n.pop(), e = i.pop();
  return r;
}
function vl() {
  for (var t = this, e = [t]; t = t.parent; )
    e.push(t);
  return e;
}
function bl() {
  return Array.from(this);
}
function _l() {
  var t = [];
  return this.eachBefore(function(e) {
    e.children || t.push(e);
  }), t;
}
function Ml() {
  var t = this, e = [];
  return t.each(function(n) {
    n !== t && e.push({ source: n.parent, target: n });
  }), e;
}
function* Cl() {
  var t = this, e, n = [t], i, r, o;
  do
    for (e = n.reverse(), n = []; t = e.pop(); )
      if (yield t, i = t.children)
        for (r = 0, o = i.length; r < o; ++r)
          n.push(i[r]);
  while (n.length);
}
function At(t, e) {
  t instanceof Map ? (t = [void 0, t], e === void 0 && (e = kl)) : e === void 0 && (e = Sl);
  for (var n = new Bt(t), i, r = [n], o, s, a, h; i = r.pop(); )
    if ((s = e(i.data)) && (h = (s = Array.from(s)).length))
      for (i.children = s, a = h - 1; a >= 0; --a)
        r.push(o = s[a] = new Bt(s[a])), o.parent = i, o.depth = i.depth + 1;
  return n.eachBefore($l);
}
function Tl() {
  return At(this).eachBefore(Al);
}
function Sl(t) {
  return t.children;
}
function kl(t) {
  return Array.isArray(t) ? t[1] : null;
}
function Al(t) {
  t.data.value !== void 0 && (t.value = t.data.value), t.data = t.data.data;
}
function $l(t) {
  var e = 0;
  do
    t.height = e;
  while ((t = t.parent) && t.height < ++e);
}
function Bt(t) {
  this.data = t, this.depth = this.height = 0, this.parent = null;
}
Bt.prototype = At.prototype = {
  constructor: Bt,
  count: cl,
  each: fl,
  eachAfter: gl,
  eachBefore: dl,
  find: pl,
  sum: ml,
  sort: yl,
  path: xl,
  ancestors: vl,
  descendants: bl,
  leaves: _l,
  links: Ml,
  copy: Tl,
  [Symbol.iterator]: Cl
};
function Pl(t) {
  if (typeof t != "function")
    throw new Error();
  return t;
}
function Pt() {
  return 0;
}
function Nt(t) {
  return function() {
    return t;
  };
}
function Li(t) {
  t.x0 = Math.round(t.x0), t.y0 = Math.round(t.y0), t.x1 = Math.round(t.x1), t.y1 = Math.round(t.y1);
}
function Oi(t, e, n, i, r) {
  for (var o = t.children, s, a = -1, h = o.length, l = t.value && (i - e) / t.value; ++a < h; )
    s = o[a], s.y0 = n, s.y1 = r, s.x0 = e, s.x1 = e += s.value * l;
}
function Nl() {
  var t = 1, e = 1, n = 0, i = !1;
  function r(s) {
    var a = s.height + 1;
    return s.x0 = s.y0 = n, s.x1 = t, s.y1 = e / a, s.eachBefore(o(e, a)), i && s.eachBefore(Li), s;
  }
  function o(s, a) {
    return function(h) {
      h.children && Oi(h, h.x0, s * (h.depth + 1) / a, h.x1, s * (h.depth + 2) / a);
      var l = h.x0, c = h.y0, d = h.x1 - n, u = h.y1 - n;
      d < l && (l = d = (l + d) / 2), u < c && (c = u = (c + u) / 2), h.x0 = l, h.y0 = c, h.x1 = d, h.y1 = u;
    };
  }
  return r.round = function(s) {
    return arguments.length ? (i = !!s, r) : i;
  }, r.size = function(s) {
    return arguments.length ? (t = +s[0], e = +s[1], r) : [t, e];
  }, r.padding = function(s) {
    return arguments.length ? (n = +s, r) : n;
  }, r;
}
function zl(t, e) {
  return t.parent === e.parent ? 1 : 2;
}
function Ie(t) {
  var e = t.children;
  return e ? e[0] : t.t;
}
function He(t) {
  var e = t.children;
  return e ? e[e.length - 1] : t.t;
}
function El(t, e, n) {
  var i = n / (e.i - t.i);
  e.c -= i, e.s += n, t.c += i, e.z += n, e.m += n;
}
function Rl(t) {
  for (var e = 0, n = 0, i = t.children, r = i.length, o; --r >= 0; )
    o = i[r], o.z += e, o.m += e, e += o.s + (n += o.c);
}
function Dl(t, e, n) {
  return t.a.parent === e.parent ? t.a : n;
}
function re(t, e) {
  this._ = t, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = e;
}
re.prototype = Object.create(Bt.prototype);
function Il(t) {
  for (var e = new re(t, 0), n, i = [e], r, o, s, a; n = i.pop(); )
    if (o = n._.children)
      for (n.children = new Array(a = o.length), s = a - 1; s >= 0; --s)
        i.push(r = n.children[s] = new re(o[s], s)), r.parent = n;
  return (e.parent = new re(null, 0)).children = [e], e;
}
function Hl() {
  var t = zl, e = 1, n = 1, i = null;
  function r(l) {
    var c = Il(l);
    if (c.eachAfter(o), c.parent.m = -c.z, c.eachBefore(s), i)
      l.eachBefore(h);
    else {
      var d = l, u = l, f = l;
      l.eachBefore(function(b) {
        b.x < d.x && (d = b), b.x > u.x && (u = b), b.depth > f.depth && (f = b);
      });
      var p = d === u ? 1 : t(d, u) / 2, y = p - d.x, w = e / (u.x + p + y), m = n / (f.depth || 1);
      l.eachBefore(function(b) {
        b.x = (b.x + y) * w, b.y = b.depth * m;
      });
    }
    return l;
  }
  function o(l) {
    var c = l.children, d = l.parent.children, u = l.i ? d[l.i - 1] : null;
    if (c) {
      Rl(l);
      var f = (c[0].z + c[c.length - 1].z) / 2;
      u ? (l.z = u.z + t(l._, u._), l.m = l.z - f) : l.z = f;
    } else
      u && (l.z = u.z + t(l._, u._));
    l.parent.A = a(l, u, l.parent.A || d[0]);
  }
  function s(l) {
    l._.x = l.z + l.parent.m, l.m += l.parent.m;
  }
  function a(l, c, d) {
    if (c) {
      for (var u = l, f = l, p = c, y = u.parent.children[0], w = u.m, m = f.m, b = p.m, M = y.m, P; p = He(p), u = Ie(u), p && u; )
        y = Ie(y), f = He(f), f.a = l, P = p.z + b - u.z - w + t(p._, u._), P > 0 && (El(Dl(p, l, d), l, P), w += P, m += P), b += p.m, w += u.m, M += y.m, m += f.m;
      p && !He(f) && (f.t = p, f.m += b - m), u && !Ie(y) && (y.t = u, y.m += w - M, d = l);
    }
    return d;
  }
  function h(l) {
    l.x *= e, l.y = l.depth * n;
  }
  return r.separation = function(l) {
    return arguments.length ? (t = l, r) : t;
  }, r.size = function(l) {
    return arguments.length ? (i = !1, e = +l[0], n = +l[1], r) : i ? null : [e, n];
  }, r.nodeSize = function(l) {
    return arguments.length ? (i = !0, e = +l[0], n = +l[1], r) : i ? [e, n] : null;
  }, r;
}
function Ll(t, e, n, i, r) {
  for (var o = t.children, s, a = -1, h = o.length, l = t.value && (r - n) / t.value; ++a < h; )
    s = o[a], s.x0 = e, s.x1 = i, s.y0 = n, s.y1 = n += s.value * l;
}
var Ol = (1 + Math.sqrt(5)) / 2;
function Bl(t, e, n, i, r, o) {
  for (var s = [], a = e.children, h, l, c = 0, d = 0, u = a.length, f, p, y = e.value, w, m, b, M, P, N, z; c < u; ) {
    f = r - n, p = o - i;
    do
      w = a[d++].value;
    while (!w && d < u);
    for (m = b = w, N = Math.max(p / f, f / p) / (y * t), z = w * w * N, P = Math.max(b / z, z / m); d < u; ++d) {
      if (w += l = a[d].value, l < m && (m = l), l > b && (b = l), z = w * w * N, M = Math.max(b / z, z / m), M > P) {
        w -= l;
        break;
      }
      P = M;
    }
    s.push(h = { value: w, dice: f < p, children: a.slice(c, d) }), h.dice ? Oi(h, n, i, r, y ? i += p * w / y : o) : Ll(h, n, i, y ? n += f * w / y : r, o), y -= w, c = d;
  }
  return s;
}
const Fl = function t(e) {
  function n(i, r, o, s, a) {
    Bl(e, i, r, o, s, a);
  }
  return n.ratio = function(i) {
    return t((i = +i) > 1 ? i : 1);
  }, n;
}(Ol);
function Vl() {
  var t = Fl, e = !1, n = 1, i = 1, r = [0], o = Pt, s = Pt, a = Pt, h = Pt, l = Pt;
  function c(u) {
    return u.x0 = u.y0 = 0, u.x1 = n, u.y1 = i, u.eachBefore(d), r = [0], e && u.eachBefore(Li), u;
  }
  function d(u) {
    var f = r[u.depth], p = u.x0 + f, y = u.y0 + f, w = u.x1 - f, m = u.y1 - f;
    w < p && (p = w = (p + w) / 2), m < y && (y = m = (y + m) / 2), u.x0 = p, u.y0 = y, u.x1 = w, u.y1 = m, u.children && (f = r[u.depth + 1] = o(u) / 2, p += l(u) - f, y += s(u) - f, w -= a(u) - f, m -= h(u) - f, w < p && (p = w = (p + w) / 2), m < y && (y = m = (y + m) / 2), t(u, p, y, w, m));
  }
  return c.round = function(u) {
    return arguments.length ? (e = !!u, c) : e;
  }, c.size = function(u) {
    return arguments.length ? (n = +u[0], i = +u[1], c) : [n, i];
  }, c.tile = function(u) {
    return arguments.length ? (t = Pl(u), c) : t;
  }, c.padding = function(u) {
    return arguments.length ? c.paddingInner(u).paddingOuter(u) : c.paddingInner();
  }, c.paddingInner = function(u) {
    return arguments.length ? (o = typeof u == "function" ? u : Nt(+u), c) : o;
  }, c.paddingOuter = function(u) {
    return arguments.length ? c.paddingTop(u).paddingRight(u).paddingBottom(u).paddingLeft(u) : c.paddingTop();
  }, c.paddingTop = function(u) {
    return arguments.length ? (s = typeof u == "function" ? u : Nt(+u), c) : s;
  }, c.paddingRight = function(u) {
    return arguments.length ? (a = typeof u == "function" ? u : Nt(+u), c) : a;
  }, c.paddingBottom = function(u) {
    return arguments.length ? (h = typeof u == "function" ? u : Nt(+u), c) : h;
  }, c.paddingLeft = function(u) {
    return arguments.length ? (l = typeof u == "function" ? u : Nt(+u), c) : l;
  }, c;
}
function Ce(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(e).domain(t);
      break;
  }
  return this;
}
const Bn = Symbol("implicit");
function Te() {
  var t = new pn(), e = [], n = [], i = Bn;
  function r(o) {
    let s = t.get(o);
    if (s === void 0) {
      if (i !== Bn)
        return i;
      t.set(o, s = e.push(o) - 1);
    }
    return n[s % n.length];
  }
  return r.domain = function(o) {
    if (!arguments.length)
      return e.slice();
    e = [], t = new pn();
    for (const s of o)
      t.has(s) || t.set(s, e.push(s) - 1);
    return r;
  }, r.range = function(o) {
    return arguments.length ? (n = Array.from(o), r) : n.slice();
  }, r.unknown = function(o) {
    return arguments.length ? (i = o, r) : i;
  }, r.copy = function() {
    return Te(e, n).unknown(i);
  }, Ce.apply(r, arguments), r;
}
function Bi() {
  var t = Te().unknown(void 0), e = t.domain, n = t.range, i = 0, r = 1, o, s, a = !1, h = 0, l = 0, c = 0.5;
  delete t.unknown;
  function d() {
    var u = e().length, f = r < i, p = f ? r : i, y = f ? i : r;
    o = (y - p) / Math.max(1, u - h + l * 2), a && (o = Math.floor(o)), p += (y - p - o * (u - h)) * c, s = o * (1 - h), a && (p = Math.round(p), s = Math.round(s));
    var w = cr(u).map(function(m) {
      return p + o * m;
    });
    return n(f ? w.reverse() : w);
  }
  return t.domain = function(u) {
    return arguments.length ? (e(u), d()) : e();
  }, t.range = function(u) {
    return arguments.length ? ([i, r] = u, i = +i, r = +r, d()) : [i, r];
  }, t.rangeRound = function(u) {
    return [i, r] = u, i = +i, r = +r, a = !0, d();
  }, t.bandwidth = function() {
    return s;
  }, t.step = function() {
    return o;
  }, t.round = function(u) {
    return arguments.length ? (a = !!u, d()) : a;
  }, t.padding = function(u) {
    return arguments.length ? (h = Math.min(1, l = +u), d()) : h;
  }, t.paddingInner = function(u) {
    return arguments.length ? (h = Math.min(1, u), d()) : h;
  }, t.paddingOuter = function(u) {
    return arguments.length ? (l = +u, d()) : l;
  }, t.align = function(u) {
    return arguments.length ? (c = Math.max(0, Math.min(1, u)), d()) : c;
  }, t.copy = function() {
    return Bi(e(), [i, r]).round(a).paddingInner(h).paddingOuter(l).align(c);
  }, Ce.apply(d(), arguments);
}
function ql(t) {
  return function() {
    return t;
  };
}
function Wl(t) {
  return +t;
}
var Fn = [0, 1];
function vt(t) {
  return t;
}
function Je(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : ql(isNaN(e) ? NaN : 0.5);
}
function Xl(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(i) {
    return Math.max(t, Math.min(e, i));
  };
}
function Yl(t, e, n) {
  var i = t[0], r = t[1], o = e[0], s = e[1];
  return r < i ? (i = Je(r, i), o = n(s, o)) : (i = Je(i, r), o = n(o, s)), function(a) {
    return o(i(a));
  };
}
function Gl(t, e, n) {
  var i = Math.min(t.length, e.length) - 1, r = new Array(i), o = new Array(i), s = -1;
  for (t[i] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < i; )
    r[s] = Je(t[s], t[s + 1]), o[s] = n(e[s], e[s + 1]);
  return function(a) {
    var h = ni(t, a, 1, i) - 1;
    return o[h](r[h](a));
  };
}
function Ul(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function Zl() {
  var t = Fn, e = Fn, n = Ct, i, r, o, s = vt, a, h, l;
  function c() {
    var u = Math.min(t.length, e.length);
    return s !== vt && (s = Xl(t[0], t[u - 1])), a = u > 2 ? Gl : Yl, h = l = null, d;
  }
  function d(u) {
    return u == null || isNaN(u = +u) ? o : (h || (h = a(t.map(i), e, n)))(i(s(u)));
  }
  return d.invert = function(u) {
    return s(r((l || (l = a(e, t.map(i), Q)))(u)));
  }, d.domain = function(u) {
    return arguments.length ? (t = Array.from(u, Wl), c()) : t.slice();
  }, d.range = function(u) {
    return arguments.length ? (e = Array.from(u), c()) : e.slice();
  }, d.rangeRound = function(u) {
    return e = Array.from(u), n = Po, c();
  }, d.clamp = function(u) {
    return arguments.length ? (s = u ? !0 : vt, c()) : s !== vt;
  }, d.interpolate = function(u) {
    return arguments.length ? (n = u, c()) : n;
  }, d.unknown = function(u) {
    return arguments.length ? (o = u, d) : o;
  }, function(u, f) {
    return i = u, r = f, c();
  };
}
function Kl() {
  return Zl()(vt, vt);
}
function Ql(t, e, n, i) {
  var r = ur(t, e, n), o;
  switch (i = xe(i ?? ",f"), i.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return i.precision == null && !isNaN(o = ll(r, s)) && (i.precision = o), Hi(i, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      i.precision == null && !isNaN(o = hl(r, Math.max(Math.abs(t), Math.abs(e)))) && (i.precision = o - (i.type === "e"));
      break;
    }
    case "f":
    case "%": {
      i.precision == null && !isNaN(o = al(r)) && (i.precision = o - (i.type === "%") * 2);
      break;
    }
  }
  return Ii(i);
}
function Fi(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var i = e();
    return hr(i[0], i[i.length - 1], n ?? 10);
  }, t.tickFormat = function(n, i) {
    var r = e();
    return Ql(r[0], r[r.length - 1], n ?? 10, i);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var i = e(), r = 0, o = i.length - 1, s = i[r], a = i[o], h, l, c = 10;
    for (a < s && (l = s, s = a, a = l, l = r, r = o, o = l); c-- > 0; ) {
      if (l = Be(s, a, n), l === h)
        return i[r] = s, i[o] = a, e(i);
      if (l > 0)
        s = Math.floor(s / l) * l, a = Math.ceil(a / l) * l;
      else if (l < 0)
        s = Math.ceil(s * l) / l, a = Math.floor(a * l) / l;
      else
        break;
      h = l;
    }
    return t;
  }, t;
}
function lt() {
  var t = Kl();
  return t.copy = function() {
    return Ul(t, lt());
  }, Ce.apply(t, arguments), Fi(t);
}
function Vi() {
  var t = 0, e = 1, n = 1, i = [0.5], r = [0, 1], o;
  function s(h) {
    return h != null && h <= h ? r[ni(i, h, 0, n)] : o;
  }
  function a() {
    var h = -1;
    for (i = new Array(n); ++h < n; )
      i[h] = ((h + 1) * e - (h - n) * t) / (n + 1);
    return s;
  }
  return s.domain = function(h) {
    return arguments.length ? ([t, e] = h, t = +t, e = +e, a()) : [t, e];
  }, s.range = function(h) {
    return arguments.length ? (n = (r = Array.from(h)).length - 1, a()) : r.slice();
  }, s.invertExtent = function(h) {
    var l = r.indexOf(h);
    return l < 0 ? [NaN, NaN] : l < 1 ? [t, i[0]] : l >= n ? [i[n - 1], e] : [i[l - 1], i[l]];
  }, s.unknown = function(h) {
    return arguments.length && (o = h), s;
  }, s.thresholds = function() {
    return i.slice();
  }, s.copy = function() {
    return Vi().domain([t, e]).range(r).unknown(o);
  }, Ce.apply(Fi(s), arguments);
}
function Jl(t) {
  for (var e = t.length / 6 | 0, n = new Array(e), i = 0; i < e; )
    n[i] = "#" + t.slice(i * 6, ++i * 6);
  return n;
}
const jl = Jl("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
function G(t) {
  return function() {
    return t;
  };
}
const Vn = Math.abs, q = Math.atan2, ct = Math.cos, th = Math.max, Le = Math.min, tt = Math.sin, bt = Math.sqrt, Y = 1e-12, Ft = Math.PI, we = Ft / 2, eh = 2 * Ft;
function nh(t) {
  return t > 1 ? 0 : t < -1 ? Ft : Math.acos(t);
}
function qn(t) {
  return t >= 1 ? we : t <= -1 ? -we : Math.asin(t);
}
function qi(t) {
  let e = 3;
  return t.digits = function(n) {
    if (!arguments.length)
      return e;
    if (n == null)
      e = null;
    else {
      const i = Math.floor(n);
      if (!(i >= 0))
        throw new RangeError(`invalid digits: ${n}`);
      e = i;
    }
    return t;
  }, () => new Ja(e);
}
function ih(t) {
  return t.innerRadius;
}
function rh(t) {
  return t.outerRadius;
}
function sh(t) {
  return t.startAngle;
}
function oh(t) {
  return t.endAngle;
}
function ah(t) {
  return t && t.padAngle;
}
function lh(t, e, n, i, r, o, s, a) {
  var h = n - t, l = i - e, c = s - r, d = a - o, u = d * h - c * l;
  if (!(u * u < Y))
    return u = (c * (e - o) - d * (t - r)) / u, [t + u * h, e + u * l];
}
function Qt(t, e, n, i, r, o, s) {
  var a = t - n, h = e - i, l = (s ? o : -o) / bt(a * a + h * h), c = l * h, d = -l * a, u = t + c, f = e + d, p = n + c, y = i + d, w = (u + p) / 2, m = (f + y) / 2, b = p - u, M = y - f, P = b * b + M * M, N = r - o, z = u * y - p * f, D = (M < 0 ? -1 : 1) * bt(th(0, N * N * P - z * z)), F = (z * M - b * D) / P, H = (-z * b - M * D) / P, L = (z * M + b * D) / P, k = (-z * b + M * D) / P, R = F - w, C = H - m, g = L - w, _ = k - m;
  return R * R + C * C > g * g + _ * _ && (F = L, H = k), {
    cx: F,
    cy: H,
    x01: -c,
    y01: -d,
    x11: F * (r / N - 1),
    y11: H * (r / N - 1)
  };
}
function je() {
  var t = ih, e = rh, n = G(0), i = null, r = sh, o = oh, s = ah, a = null, h = qi(l);
  function l() {
    var c, d, u = +t.apply(this, arguments), f = +e.apply(this, arguments), p = r.apply(this, arguments) - we, y = o.apply(this, arguments) - we, w = Vn(y - p), m = y > p;
    if (a || (a = c = h()), f < u && (d = f, f = u, u = d), !(f > Y))
      a.moveTo(0, 0);
    else if (w > eh - Y)
      a.moveTo(f * ct(p), f * tt(p)), a.arc(0, 0, f, p, y, !m), u > Y && (a.moveTo(u * ct(y), u * tt(y)), a.arc(0, 0, u, y, p, m));
    else {
      var b = p, M = y, P = p, N = y, z = w, D = w, F = s.apply(this, arguments) / 2, H = F > Y && (i ? +i.apply(this, arguments) : bt(u * u + f * f)), L = Le(Vn(f - u) / 2, +n.apply(this, arguments)), k = L, R = L, C, g;
      if (H > Y) {
        var _ = qn(H / u * tt(F)), x = qn(H / f * tt(F));
        (z -= _ * 2) > Y ? (_ *= m ? 1 : -1, P += _, N -= _) : (z = 0, P = N = (p + y) / 2), (D -= x * 2) > Y ? (x *= m ? 1 : -1, b += x, M -= x) : (D = 0, b = M = (p + y) / 2);
      }
      var T = f * ct(b), $ = f * tt(b), A = u * ct(N), E = u * tt(N);
      if (L > Y) {
        var v = f * ct(M), S = f * tt(M), B = u * ct(P), I = u * tt(P), O;
        if (w < Ft)
          if (O = lh(T, $, B, I, v, S, A, E)) {
            var U = T - O[0], X = $ - O[1], Z = v - O[0], ht = S - O[1], dn = 1 / tt(nh((U * Z + X * ht) / (bt(U * U + X * X) * bt(Z * Z + ht * ht))) / 2), gn = bt(O[0] * O[0] + O[1] * O[1]);
            k = Le(L, (u - gn) / (dn - 1)), R = Le(L, (f - gn) / (dn + 1));
          } else
            k = R = 0;
      }
      D > Y ? R > Y ? (C = Qt(B, I, T, $, f, R, m), g = Qt(v, S, A, E, f, R, m), a.moveTo(C.cx + C.x01, C.cy + C.y01), R < L ? a.arc(C.cx, C.cy, R, q(C.y01, C.x01), q(g.y01, g.x01), !m) : (a.arc(C.cx, C.cy, R, q(C.y01, C.x01), q(C.y11, C.x11), !m), a.arc(0, 0, f, q(C.cy + C.y11, C.cx + C.x11), q(g.cy + g.y11, g.cx + g.x11), !m), a.arc(g.cx, g.cy, R, q(g.y11, g.x11), q(g.y01, g.x01), !m))) : (a.moveTo(T, $), a.arc(0, 0, f, b, M, !m)) : a.moveTo(T, $), !(u > Y) || !(z > Y) ? a.lineTo(A, E) : k > Y ? (C = Qt(A, E, v, S, u, -k, m), g = Qt(T, $, B, I, u, -k, m), a.lineTo(C.cx + C.x01, C.cy + C.y01), k < L ? a.arc(C.cx, C.cy, k, q(C.y01, C.x01), q(g.y01, g.x01), !m) : (a.arc(C.cx, C.cy, k, q(C.y01, C.x01), q(C.y11, C.x11), !m), a.arc(0, 0, u, q(C.cy + C.y11, C.cx + C.x11), q(g.cy + g.y11, g.cx + g.x11), m), a.arc(g.cx, g.cy, k, q(g.y11, g.x11), q(g.y01, g.x01), !m))) : a.arc(0, 0, u, N, P, m);
    }
    if (a.closePath(), c)
      return a = null, c + "" || null;
  }
  return l.centroid = function() {
    var c = (+t.apply(this, arguments) + +e.apply(this, arguments)) / 2, d = (+r.apply(this, arguments) + +o.apply(this, arguments)) / 2 - Ft / 2;
    return [ct(d) * c, tt(d) * c];
  }, l.innerRadius = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : G(+c), l) : t;
  }, l.outerRadius = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : G(+c), l) : e;
  }, l.cornerRadius = function(c) {
    return arguments.length ? (n = typeof c == "function" ? c : G(+c), l) : n;
  }, l.padRadius = function(c) {
    return arguments.length ? (i = c == null ? null : typeof c == "function" ? c : G(+c), l) : i;
  }, l.startAngle = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : G(+c), l) : r;
  }, l.endAngle = function(c) {
    return arguments.length ? (o = typeof c == "function" ? c : G(+c), l) : o;
  }, l.padAngle = function(c) {
    return arguments.length ? (s = typeof c == "function" ? c : G(+c), l) : s;
  }, l.context = function(c) {
    return arguments.length ? (a = c ?? null, l) : a;
  }, l;
}
var hh = Array.prototype.slice;
function uh(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ch(t) {
  return t[0];
}
function fh(t) {
  return t[1];
}
class dh {
  constructor(e, n) {
    this._context = e, this._x = n;
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
  point(e, n) {
    switch (e = +e, n = +n, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(e, n) : this._context.moveTo(e, n);
        break;
      }
      case 1:
        this._point = 2;
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + e) / 2, this._y0, this._x0, n, e, n) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + n) / 2, e, this._y0, e, n);
        break;
      }
    }
    this._x0 = e, this._y0 = n;
  }
}
function gh(t) {
  return new dh(t, !0);
}
function ph(t) {
  return t.source;
}
function mh(t) {
  return t.target;
}
function yh(t) {
  let e = ph, n = mh, i = ch, r = fh, o = null, s = null, a = qi(h);
  function h() {
    let l;
    const c = hh.call(arguments), d = e.apply(this, c), u = n.apply(this, c);
    if (o == null && (s = t(l = a())), s.lineStart(), c[0] = d, s.point(+i.apply(this, c), +r.apply(this, c)), c[0] = u, s.point(+i.apply(this, c), +r.apply(this, c)), s.lineEnd(), l)
      return s = null, l + "" || null;
  }
  return h.source = function(l) {
    return arguments.length ? (e = l, h) : e;
  }, h.target = function(l) {
    return arguments.length ? (n = l, h) : n;
  }, h.x = function(l) {
    return arguments.length ? (i = typeof l == "function" ? l : G(+l), h) : i;
  }, h.y = function(l) {
    return arguments.length ? (r = typeof l == "function" ? l : G(+l), h) : r;
  }, h.context = function(l) {
    return arguments.length ? (l == null ? o = s = null : s = t(o = l), h) : o;
  }, h;
}
function xh() {
  return yh(gh);
}
function Wn(t, e) {
  if ((s = t.length) > 1)
    for (var n = 1, i, r, o = t[e[0]], s, a = o.length; n < s; ++n)
      for (r = o, o = t[e[n]], i = 0; i < a; ++i)
        o[i][1] += o[i][0] = isNaN(r[i][1]) ? r[i][0] : r[i][1];
}
function Xn(t) {
  for (var e = t.length, n = new Array(e); --e >= 0; )
    n[e] = e;
  return n;
}
function wh(t, e) {
  return t[e];
}
function vh(t) {
  const e = [];
  return e.key = t, e;
}
function bh() {
  var t = G([]), e = Xn, n = Wn, i = wh;
  function r(o) {
    var s = Array.from(t.apply(this, arguments), vh), a, h = s.length, l = -1, c;
    for (const d of o)
      for (a = 0, ++l; a < h; ++a)
        (s[a][l] = [0, +i(d, s[a].key, l, o)]).data = d;
    for (a = 0, c = uh(e(s)); a < h; ++a)
      s[c[a]].index = a;
    return n(s, c), s;
  }
  return r.keys = function(o) {
    return arguments.length ? (t = typeof o == "function" ? o : G(Array.from(o)), r) : t;
  }, r.value = function(o) {
    return arguments.length ? (i = typeof o == "function" ? o : G(+o), r) : i;
  }, r.order = function(o) {
    return arguments.length ? (e = o == null ? Xn : typeof o == "function" ? o : G(Array.from(o)), r) : e;
  }, r.offset = function(o) {
    return arguments.length ? (n = o ?? Wn, r) : n;
  }, r;
}
const Jt = (t) => () => t;
function _h(t, {
  sourceEvent: e,
  target: n,
  transform: i,
  dispatch: r
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: i, enumerable: !0, configurable: !0 },
    _: { value: r }
  });
}
function ot(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
ot.prototype = {
  constructor: ot,
  scale: function(t) {
    return t === 1 ? this : new ot(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new ot(this.k, this.x + this.k * t, this.y + this.k * e);
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
var fn = new ot(1, 0, 0);
ot.prototype;
function Oe(t) {
  t.stopImmediatePropagation();
}
function zt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Mh(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Ch() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Yn() {
  return this.__zoom || fn;
}
function Th(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Sh() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function kh(t, e, n) {
  var i = t.invertX(e[0][0]) - n[0][0], r = t.invertX(e[1][0]) - n[1][0], o = t.invertY(e[0][1]) - n[0][1], s = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    r > i ? (i + r) / 2 : Math.min(0, i) || Math.max(0, r),
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s)
  );
}
function Wi() {
  var t = Mh, e = Ch, n = kh, i = Th, r = Sh, o = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, h = Lo, l = nn("start", "zoom", "end"), c, d, u, f = 500, p = 150, y = 0, w = 10;
  function m(g) {
    g.property("__zoom", Yn).on("wheel.zoom", F, { passive: !1 }).on("mousedown.zoom", H).on("dblclick.zoom", L).filter(r).on("touchstart.zoom", k).on("touchmove.zoom", R).on("touchend.zoom touchcancel.zoom", C).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  m.transform = function(g, _, x, T) {
    var $ = g.selection ? g.selection() : g;
    $.property("__zoom", Yn), g !== $ ? N(g, _, x, T) : $.interrupt().each(function() {
      z(this, arguments).event(T).start().zoom(null, typeof _ == "function" ? _.apply(this, arguments) : _).end();
    });
  }, m.scaleBy = function(g, _, x, T) {
    m.scaleTo(g, function() {
      var $ = this.__zoom.k, A = typeof _ == "function" ? _.apply(this, arguments) : _;
      return $ * A;
    }, x, T);
  }, m.scaleTo = function(g, _, x, T) {
    m.transform(g, function() {
      var $ = e.apply(this, arguments), A = this.__zoom, E = x == null ? P($) : typeof x == "function" ? x.apply(this, arguments) : x, v = A.invert(E), S = typeof _ == "function" ? _.apply(this, arguments) : _;
      return n(M(b(A, S), E, v), $, s);
    }, x, T);
  }, m.translateBy = function(g, _, x, T) {
    m.transform(g, function() {
      return n(this.__zoom.translate(
        typeof _ == "function" ? _.apply(this, arguments) : _,
        typeof x == "function" ? x.apply(this, arguments) : x
      ), e.apply(this, arguments), s);
    }, null, T);
  }, m.translateTo = function(g, _, x, T, $) {
    m.transform(g, function() {
      var A = e.apply(this, arguments), E = this.__zoom, v = T == null ? P(A) : typeof T == "function" ? T.apply(this, arguments) : T;
      return n(fn.translate(v[0], v[1]).scale(E.k).translate(
        typeof _ == "function" ? -_.apply(this, arguments) : -_,
        typeof x == "function" ? -x.apply(this, arguments) : -x
      ), A, s);
    }, T, $);
  };
  function b(g, _) {
    return _ = Math.max(o[0], Math.min(o[1], _)), _ === g.k ? g : new ot(_, g.x, g.y);
  }
  function M(g, _, x) {
    var T = _[0] - x[0] * g.k, $ = _[1] - x[1] * g.k;
    return T === g.x && $ === g.y ? g : new ot(g.k, T, $);
  }
  function P(g) {
    return [(+g[0][0] + +g[1][0]) / 2, (+g[0][1] + +g[1][1]) / 2];
  }
  function N(g, _, x, T) {
    g.on("start.zoom", function() {
      z(this, arguments).event(T).start();
    }).on("interrupt.zoom end.zoom", function() {
      z(this, arguments).event(T).end();
    }).tween("zoom", function() {
      var $ = this, A = arguments, E = z($, A).event(T), v = e.apply($, A), S = x == null ? P(v) : typeof x == "function" ? x.apply($, A) : x, B = Math.max(v[1][0] - v[0][0], v[1][1] - v[0][1]), I = $.__zoom, O = typeof _ == "function" ? _.apply($, A) : _, U = h(I.invert(S).concat(B / I.k), O.invert(S).concat(B / O.k));
      return function(X) {
        if (X === 1)
          X = O;
        else {
          var Z = U(X), ht = B / Z[2];
          X = new ot(ht, S[0] - Z[0] * ht, S[1] - Z[1] * ht);
        }
        E.zoom(null, X);
      };
    });
  }
  function z(g, _, x) {
    return !x && g.__zooming || new D(g, _);
  }
  function D(g, _) {
    this.that = g, this.args = _, this.active = 0, this.sourceEvent = null, this.extent = e.apply(g, _), this.taps = 0;
  }
  D.prototype = {
    event: function(g) {
      return g && (this.sourceEvent = g), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(g, _) {
      return this.mouse && g !== "mouse" && (this.mouse[1] = _.invert(this.mouse[0])), this.touch0 && g !== "touch" && (this.touch0[1] = _.invert(this.touch0[0])), this.touch1 && g !== "touch" && (this.touch1[1] = _.invert(this.touch1[0])), this.that.__zoom = _, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(g) {
      var _ = V(this.that).datum();
      l.call(
        g,
        this.that,
        new _h(g, {
          sourceEvent: this.sourceEvent,
          target: m,
          type: g,
          transform: this.that.__zoom,
          dispatch: l
        }),
        _
      );
    }
  };
  function F(g, ..._) {
    if (!t.apply(this, arguments))
      return;
    var x = z(this, _).event(g), T = this.__zoom, $ = Math.max(o[0], Math.min(o[1], T.k * Math.pow(2, i.apply(this, arguments)))), A = ut(g);
    if (x.wheel)
      (x.mouse[0][0] !== A[0] || x.mouse[0][1] !== A[1]) && (x.mouse[1] = T.invert(x.mouse[0] = A)), clearTimeout(x.wheel);
    else {
      if (T.k === $)
        return;
      x.mouse = [A, T.invert(A)], ie(this), x.start();
    }
    zt(g), x.wheel = setTimeout(E, p), x.zoom("mouse", n(M(b(T, $), x.mouse[0], x.mouse[1]), x.extent, s));
    function E() {
      x.wheel = null, x.end();
    }
  }
  function H(g, ..._) {
    if (u || !t.apply(this, arguments))
      return;
    var x = g.currentTarget, T = z(this, _, !0).event(g), $ = V(g.view).on("mousemove.zoom", S, !0).on("mouseup.zoom", B, !0), A = ut(g, x), E = g.clientX, v = g.clientY;
    no(g.view), Oe(g), T.mouse = [A, this.__zoom.invert(A)], ie(this), T.start();
    function S(I) {
      if (zt(I), !T.moved) {
        var O = I.clientX - E, U = I.clientY - v;
        T.moved = O * O + U * U > y;
      }
      T.event(I).zoom("mouse", n(M(T.that.__zoom, T.mouse[0] = ut(I, x), T.mouse[1]), T.extent, s));
    }
    function B(I) {
      $.on("mousemove.zoom mouseup.zoom", null), io(I.view, T.moved), zt(I), T.event(I).end();
    }
  }
  function L(g, ..._) {
    if (t.apply(this, arguments)) {
      var x = this.__zoom, T = ut(g.changedTouches ? g.changedTouches[0] : g, this), $ = x.invert(T), A = x.k * (g.shiftKey ? 0.5 : 2), E = n(M(b(x, A), T, $), e.apply(this, _), s);
      zt(g), a > 0 ? V(this).transition().duration(a).call(N, E, T, g) : V(this).call(m.transform, E, T, g);
    }
  }
  function k(g, ..._) {
    if (t.apply(this, arguments)) {
      var x = g.touches, T = x.length, $ = z(this, _, g.changedTouches.length === T).event(g), A, E, v, S;
      for (Oe(g), E = 0; E < T; ++E)
        v = x[E], S = ut(v, this), S = [S, this.__zoom.invert(S), v.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== S[2] && ($.touch1 = S, $.taps = 0) : ($.touch0 = S, A = !0, $.taps = 1 + !!c);
      c && (c = clearTimeout(c)), A && ($.taps < 2 && (d = S[0], c = setTimeout(function() {
        c = null;
      }, f)), ie(this), $.start());
    }
  }
  function R(g, ..._) {
    if (this.__zooming) {
      var x = z(this, _).event(g), T = g.changedTouches, $ = T.length, A, E, v, S;
      for (zt(g), A = 0; A < $; ++A)
        E = T[A], v = ut(E, this), x.touch0 && x.touch0[2] === E.identifier ? x.touch0[0] = v : x.touch1 && x.touch1[2] === E.identifier && (x.touch1[0] = v);
      if (E = x.that.__zoom, x.touch1) {
        var B = x.touch0[0], I = x.touch0[1], O = x.touch1[0], U = x.touch1[1], X = (X = O[0] - B[0]) * X + (X = O[1] - B[1]) * X, Z = (Z = U[0] - I[0]) * Z + (Z = U[1] - I[1]) * Z;
        E = b(E, Math.sqrt(X / Z)), v = [(B[0] + O[0]) / 2, (B[1] + O[1]) / 2], S = [(I[0] + U[0]) / 2, (I[1] + U[1]) / 2];
      } else if (x.touch0)
        v = x.touch0[0], S = x.touch0[1];
      else
        return;
      x.zoom("touch", n(M(E, v, S), x.extent, s));
    }
  }
  function C(g, ..._) {
    if (this.__zooming) {
      var x = z(this, _).event(g), T = g.changedTouches, $ = T.length, A, E;
      for (Oe(g), u && clearTimeout(u), u = setTimeout(function() {
        u = null;
      }, f), A = 0; A < $; ++A)
        E = T[A], x.touch0 && x.touch0[2] === E.identifier ? delete x.touch0 : x.touch1 && x.touch1[2] === E.identifier && delete x.touch1;
      if (x.touch1 && !x.touch0 && (x.touch0 = x.touch1, delete x.touch1), x.touch0)
        x.touch0[1] = this.__zoom.invert(x.touch0[0]);
      else if (x.end(), x.taps === 2 && (E = ut(E, this), Math.hypot(d[0] - E[0], d[1] - E[1]) < w)) {
        var v = V(this).on("dblclick.zoom");
        v && v.apply(this, arguments);
      }
    }
  }
  return m.wheelDelta = function(g) {
    return arguments.length ? (i = typeof g == "function" ? g : Jt(+g), m) : i;
  }, m.filter = function(g) {
    return arguments.length ? (t = typeof g == "function" ? g : Jt(!!g), m) : t;
  }, m.touchable = function(g) {
    return arguments.length ? (r = typeof g == "function" ? g : Jt(!!g), m) : r;
  }, m.extent = function(g) {
    return arguments.length ? (e = typeof g == "function" ? g : Jt([[+g[0][0], +g[0][1]], [+g[1][0], +g[1][1]]]), m) : e;
  }, m.scaleExtent = function(g) {
    return arguments.length ? (o[0] = +g[0], o[1] = +g[1], m) : [o[0], o[1]];
  }, m.translateExtent = function(g) {
    return arguments.length ? (s[0][0] = +g[0][0], s[1][0] = +g[1][0], s[0][1] = +g[0][1], s[1][1] = +g[1][1], m) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, m.constrain = function(g) {
    return arguments.length ? (n = g, m) : n;
  }, m.duration = function(g) {
    return arguments.length ? (a = +g, m) : a;
  }, m.interpolate = function(g) {
    return arguments.length ? (h = g, m) : h;
  }, m.on = function() {
    var g = l.on.apply(l, arguments);
    return g === l ? m : g;
  }, m.clickDistance = function(g) {
    return arguments.length ? (y = (g = +g) * g, m) : Math.sqrt(y);
  }, m.tapDistance = function(g) {
    return arguments.length ? (w = +g, m) : w;
  }, m;
}
class Xt {
  constructor() {
    this.width = 800, this.height = 800, this.enableTooltips = !0;
  }
}
var tn;
((t) => {
  function e(a) {
    return a < 0.5 ? 4 * a * a * a : 1 - Math.pow(-2 * a + 2, 3) / 2;
  }
  t.easeInEaseOutCubic = e;
  function n(a) {
    return a * a * a;
  }
  t.easeInCubic = n;
  function i(a) {
    return 1 - Math.pow(1 - a, 3);
  }
  t.easeOutCubic = i;
  function r(a) {
    const h = 2 * Math.PI / 4.5;
    return a === 0 ? 0 : a === 1 ? 1 : a < 0.5 ? -(Math.pow(2, 20 * a - 10) * Math.sin((20 * a - 11.125) * h)) / 2 : Math.pow(2, -20 * a + 10) * Math.sin((20 * a - 11.125) * h) / 2 + 1;
  }
  t.easeInEaseOutElastic = r;
  function o(a) {
    const h = 2 * Math.PI / 3;
    return a === 0 ? 0 : a === 1 ? 1 : -Math.pow(2, 10 * a - 10) * Math.sin((a * 10 - 10.75) * h);
  }
  t.easeInElastic = o;
  function s(a) {
    const h = 2 * Math.PI / 3;
    return a === 0 ? 0 : a === 1 ? 1 : Math.pow(2, -10 * a) * Math.sin((a * 10 - 0.75) * h) + 1;
  }
  t.easeOutElastic = s;
})(tn || (tn = {}));
const Xi = class en {
  constructor(e, n, i, r, o) {
    this._parent = e, this._leftChild = n, this._rightChild = i, this.values = r, this.height = o, this.id = en.currentID, en.currentID++;
  }
  get parent() {
    return this._parent;
  }
  set parent(e) {
    this._parent = e;
  }
  get leftChild() {
    return this._leftChild;
  }
  set leftChild(e) {
    this._leftChild = e;
  }
  get rightChild() {
    return this._rightChild;
  }
  set rightChild(e) {
    this._rightChild = e;
  }
  /**
   * Convert this tree and all of it's children to the Newic-format.
   *
   * @param: idExtractor Function that extract's the name from a given node's id.
   */
  toNewick(e) {
    let n = "";
    return !this.leftChild && !this.rightChild ? e(this.values[0].id) + ":" + this.height : (n += "(", this.leftChild && (n += this.leftChild.toNewick(e) + ","), this.rightChild && (n += this.rightChild.toNewick(e)), n += ")" + this.id + ":" + this.height, n);
  }
  /**
   * Convert this tree and all of it's children to the dot GraphViz-format.
   */
  toGraphViz(e) {
    let n = this, i = `digraph dendrogram {
`, r = "", o = "", s = [n];
    for (; s.length > 0 && (n = s.shift(), !!n); )
      !n.leftChild && !n.rightChild ? r += `    ${n.id} [label="${e(n.values[0].id)}"];
` : r += `    ${n.id} [label="${n.id}"];
`, n.leftChild && (o += `    ${n.id} -> ${n.leftChild.id};
`, s.push(n.leftChild)), n.rightChild && (o += `    ${n.id} -> ${n.rightChild.id};
`, s.push(n.rightChild));
    return i += r + o + "}", i;
  }
};
Xi.currentID = 0;
let se = Xi;
class Ah {
  constructor(e, n, i) {
    this.elements = e, this.index = n, this.treeNode = i;
  }
  /**
   * Merge 2 clusters with each other and create the associated nodes of the dendrogram.
   *
   * @param other The other cluster with whom this one needs to be merged.
   * @param height The height of the dendrogram at which the clustering occurs.
   */
  merge(e, n) {
    this.elements.push(...e.elements);
    const i = new se(null, this.treeNode, e.treeNode, this.elements.slice(), n);
    this.treeNode.parent = i, e.treeNode.parent = i, this.treeNode = i;
  }
}
class $h {
  /**
   * @param metric A distance metric that's used for the clustering performed by this class.
   */
  constructor(e) {
    this.metric = e;
  }
  /**
   * This function returns the root of a dendrogram, based upon the given dataset. The clustering is performed on
   * a distance matrix, which is calculated using the metric, defined in the constructor of this class.
   *
   * @param data A matrix containing data elements that should be clustered. The elements are either clustered on row
   *        or column similarity.
   */
  cluster(e) {
    if (se.currentID = 0, e.length < 1)
      return new se(null, null, null, [], 0);
    let n = /* @__PURE__ */ new Map(), i = [];
    for (let s = 0; s < e.length; s++) {
      let a = e[s].values;
      n.set(s, new Ah([e[s]], s, new se(null, null, null, [e[s]], 0))), i.push(a);
    }
    let r = this.metric.getDistance(i), o = 0;
    for (; o != r.length - 1; ) {
      let s = 1 / 0, a = -1, h = -1;
      for (let f of n.keys())
        for (let p of n.keys())
          f > p && r[f][p] < s && (s = r[f][p], a = f, h = p);
      let l = n.get(a), c = n.get(h), d = s / 2;
      if (!l || !c)
        throw "At least one cluster is invalid!";
      let u = this.copyDistanceMatrix(r);
      for (let f of n.keys())
        if (f != a && f != h) {
          let p;
          f > a ? p = r[f][a] : p = r[a][f];
          let y;
          f > h ? y = r[f][h] : y = r[h][f];
          let w = (l.elements.length * p + c.elements.length * y) / (l.elements.length + c.elements.length);
          f > a ? u[f][a] = w : u[a][f] = w;
        }
      r = u, l.merge(c, d), n.delete(h), ++o;
    }
    return n.values().next().value.treeNode;
  }
  copyDistanceMatrix(e) {
    let n = [];
    for (let i = 0; i < e.length; i++) {
      let r = [], o = e[i];
      for (let s = 0; s < o.length; s++)
        r.push(o[s]);
      n.push(r);
    }
    return n;
  }
}
class Ph {
  getDistance(e) {
    let n = [];
    for (let i = 0; i < e.length; i++) {
      let r = [];
      for (let o = 0; o <= i; o++)
        r.push(this.calculateEuclideanDistance(e[i], e[o]));
      n.push(r);
    }
    return n;
  }
  calculateEuclideanDistance(e, n) {
    if (e.length != n.length)
      throw "Euclidean distance can only be calculated for 2 equally sized input arrays!";
    let i = 0;
    for (let r = 0; r < e.length; r++)
      i += Math.pow(n[r] - e[r], 2);
    return Math.sqrt(i);
  }
}
class Nh {
  constructor() {
    this.nodeMinMap = /* @__PURE__ */ new Map();
  }
  reorder(e) {
    return this.nodeMinMap.clear(), this.sortMinimum(e);
  }
  sortMinimum(e) {
    if (!e.leftChild || !e.rightChild)
      return e;
    let n = e.leftChild, i = e.rightChild, r = !n.leftChild && !n.rightChild, o = !i.leftChild && !i.rightChild;
    if (r && o)
      this.nodeMinMap.set(e, e.height);
    else if (!r && o) {
      let s = this.sortMinimum(n);
      e.leftChild = s;
      let a = this.nodeMinMap.get(s);
      if (a === void 0)
        throw "The recursive call to sort the left subtree did not yield a minimum value.";
      this.nodeMinMap.set(e, Math.min(e.height, a));
    } else if (r && !o) {
      let s = this.sortMinimum(i);
      e.leftChild = s, e.rightChild = n;
      let a = this.nodeMinMap.get(s);
      if (a === void 0)
        throw "The recursive call to sort the right subtree did not yield a minimum value.";
      this.nodeMinMap.set(e, Math.min(e.height, a));
    } else {
      let s = this.sortMinimum(n), a = this.sortMinimum(i), h = this.nodeMinMap.get(s), l = this.nodeMinMap.get(a);
      if (h === void 0 || l === void 0)
        throw "One of the recursive calls to sort a subtree did not yield a minimum value.";
      h <= l ? (e.leftChild = s, e.rightChild = a) : (e.leftChild = a, e.rightChild = s), this.nodeMinMap.set(e, Math.min(e.height, h, l));
    }
    return e;
  }
}
class Gn extends Xt {
  constructor() {
    super(...arguments), this.initialTextWidth = 100, this.initialTextHeight = 100, this.squarePadding = 2, this.visualizationTextPadding = 4, this.fontSize = 14, this.labelColor = "#404040", this.highlightSelection = !0, this.highlightFontSize = 16, this.highlightFontColor = "black", this.className = "heatmap", this.animationsEnabled = !0, this.animationDuration = 2e3, this.transition = tn.easeInEaseOutCubic, this.minColor = "#EEEEEE", this.maxColor = "#1565C0", this.colorBuckets = 50, this.dendrogramEnabled = !1, this.dendrogramWidth = 100, this.dendrogramLineWidth = 1, this.dendrogramColor = "#404040", this.clusteringAlgorithm = new $h(new Ph()), this.reorderer = new Nh(), this.getTooltip = (e, n, i) => `
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
                    ${this.getTooltipTitle(e, n, i)}
                </div>
                <a>
                    ${this.getTooltipText(e)}
                </a>
            </div>
        `, this.getTooltipTitle = (e, n, i) => `${i.name ? i.name : ""}${i.name ? " and " : ""}${n.name ? n.name : ""}`, this.getTooltipText = (e) => `Similarity: ${(e.value * 100).toFixed(2)}%`;
  }
}
class Un {
  constructor(e, n) {
    this.values = e, this.id = n;
  }
}
class Zn {
  /**
   * Converts an array of feature labels into correct HeatmapFeature objects. These objects keep track of a name
   * and index for a feature.
   *
   * @param featureLabels All labels that should be converted to true HeatmapFeature objects.
   * @return An array with HeatmapFeature objects.
   */
  preprocessFeatures(e) {
    return Object.entries(e).map(([n, i]) => ({
      name: i,
      idx: Number.parseInt(n)
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
  preprocessValues(e, n, i, r) {
    const o = an(mt(n), mt(i)), a = lt().domain([0, 1]).range([0, 1]).ticks(r), h = Vi().domain([0, 1]).range(a);
    return Object.entries(e).map(([l, c]) => Object.entries(c).map(([d, u]) => {
      if (typeof u == "number") {
        const f = h(u);
        if (f === void 0)
          throw new Error("Invalid heatmap value given: " + u);
        return {
          value: u,
          rowId: Number.parseInt(l),
          columnId: Number.parseInt(d),
          color: o(f)
        };
      } else
        return u;
    }));
  }
  /**
   * Order all values in a map, per color.
   *
   * @param values All grid values for which we should determine a color.
   * @return A mapping between an HTML-color value and a list of [row, col] positions.
   */
  orderPerColor(e) {
    var i;
    const n = /* @__PURE__ */ new Map();
    for (let r = 0; r < e.length; r++)
      for (let o = 0; o < e[r].length; o++) {
        const s = e[r][o].color;
        n.has(s) || n.set(s, []), (i = n.get(s)) == null || i.push([r, o]);
      }
    return n;
  }
}
class Kn {
  constructor(e) {
    this.context = e;
  }
  renderLine(e, n, i, r, o, s) {
    this.context.lineWidth = o, this.context.moveTo(e, n), this.context.lineTo(i, r), this.context.strokeStyle = s, this.context.stroke();
  }
}
class Vh {
  constructor(e, n, i, r, o = new Gn()) {
    this.tooltip = null, this.highlightedRow = -1, this.highlightedColumn = -1, this.animatingRows = !1, this.animatingCols = !1, this.clusteredHorizontal = !1, this.clusteredVertical = !1, this.lastZoomStatus = {
      k: 1,
      x: 0,
      y: 0
    }, this.settings = this.fillOptions(o), this.element = e;
    const s = new Zn();
    this.rows = s.preprocessFeatures(i), this.columns = s.preprocessFeatures(r), this.values = s.preprocessValues(
      n,
      this.settings.minColor,
      this.settings.maxColor,
      this.settings.colorBuckets
    ), this.valuesPerColor = s.orderPerColor(this.values), this.settings.enableTooltips && (this.tooltip = this.initTooltip()), this.pixelRatio = window.devicePixelRatio || 1, this.originalViewPort = {
      xTop: 0,
      yTop: 0,
      xBottom: this.settings.width,
      yBottom: this.settings.height
    }, this.currentViewPort = this.originalViewPort, this.textWidth = this.settings.initialTextWidth, this.textHeight = this.settings.initialTextHeight, this.element.innerHTML = "", this.visElement = V(this.element).append("canvas").attr("width", this.pixelRatio * this.settings.width).attr("height", this.pixelRatio * this.settings.height).attr("style", `width: ${this.settings.width}px; height: ${this.settings.height}px`).on("mouseover", (h) => this.tooltipMove(h)).on("mousemove", (h) => this.tooltipMove(h)).on("mouseout", (h) => this.tooltipMove(h)).on("click", (h) => this.click(h)), this.context = this.visElement.node().getContext("2d"), this.context.scale(this.pixelRatio, this.pixelRatio);
    const a = Wi().extent([[0, 0], [this.settings.width, this.settings.height]]).scaleExtent([0.25, 12]).on("zoom", (h) => {
      this.zoomed(h.transform);
    });
    this.visElement.call(a), this.computeClusterRoots(), this.redraw();
  }
  fillOptions(e = void 0) {
    let n = new Gn();
    return Object.assign(n, e);
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
  async cluster(e = "all") {
    const n = this.settings.animationsEnabled ? this.settings.animationDuration / 2 : 0, i = (l, c) => new Promise((d) => {
      let u;
      const f = (p) => {
        u === void 0 && (u = p);
        const y = p - u, w = this.settings.transition(y / n);
        this.redraw(l, c, w), y < n ? requestAnimationFrame(f) : d();
      };
      requestAnimationFrame(f);
    }), r = new Zn();
    let o = Array.from(Array(this.rows.length).keys()), s = new Array(o.length);
    if ((e === "all" || e === "rows") && !this.clusteredVertical) {
      this.clusteredVertical = !0, o = this.determineOrder(this.rowClusterRoot);
      for (const [u, f] of Object.entries(o))
        s[f] = Number.parseInt(u);
      const l = Array.from(Array(this.columns.length).keys());
      this.animatingRows = !0, await i(s, l), this.animatingRows = !1;
      let c = [];
      for (const u of o)
        c.push(this.values[u]);
      const d = [];
      for (const u of o)
        d.push(this.rows[u]);
      this.rows = d, this.values = c, this.valuesPerColor = r.orderPerColor(this.values);
    }
    let a = Array.from(Array(this.columns.length).keys()), h = new Array(a.length);
    if ((e === "all" || e === "columns") && !this.clusteredHorizontal) {
      this.clusteredHorizontal = !0, a = this.determineOrder(this.colClusterRoot);
      for (const [u, f] of Object.entries(a))
        h[f] = Number.parseInt(u);
      const l = Array.from(Array(this.rows.length).keys());
      this.animatingCols = !0, await i(l, h), this.animatingCols = !1;
      let c = [];
      for (const u of l) {
        let f = [];
        for (const p of a)
          f.push(this.values[u][p]);
        c.push(f);
      }
      const d = [];
      for (const u of a)
        d.push(this.columns[u]);
      this.columns = d, this.values = c, this.valuesPerColor = r.orderPerColor(this.values);
    }
    this.redraw();
  }
  computeClusterRoots() {
    let e = this.settings.clusteringAlgorithm, n = this.settings.reorderer, i = this.rows.map(
      (o, s) => new Un(
        this.values[s].filter((a) => a.rowId == o.idx).map((a) => a.value),
        o.idx
      )
    );
    this.rowClusterRoot = n.reorder(e.cluster(i)), this.verticalNodesPerDepth = this.bfsNodesPerDepth(this.rowClusterRoot);
    let r = this.columns.map(
      (o, s) => new Un(
        this.values.map((a) => a[s].value),
        o.idx
      )
    );
    this.colClusterRoot = n.reorder(e.cluster(r)), this.horizontalNodesPerDepth = this.bfsNodesPerDepth(this.colClusterRoot);
  }
  resize(e, n) {
    this.settings.width = e, this.settings.height = n, this.visElement.attr("height", this.pixelRatio * n), this.visElement.attr("width", this.pixelRatio * e), this.visElement.attr("style", `width: ${this.settings.width}px; height: ${this.settings.height}px`), this.context.scale(this.pixelRatio, this.pixelRatio), this.originalViewPort = {
      xTop: 0,
      yTop: 0,
      xBottom: e,
      yBottom: n
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
  toSVG(e = 14, n = 20, i = 2, r = 4) {
    const o = n;
    let s = "";
    for (const [p, y] of this.valuesPerColor)
      for (const [w, m] of y) {
        const b = m * (o + i), M = w * (o + i);
        s += `
                    <rect width="${o}" height="${o}" fill="${p}" x="${b}" y="${M}"></rect>
                `;
      }
    const h = new OffscreenCanvas(1, 1).getContext("2d");
    h.font = `${e}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
    const l = o * this.columns.length + i * (this.columns.length - 1) + r, c = Math.max((o - e) / 2, 0);
    let d = l;
    for (let p = 0; p < this.rows.length; p++) {
      const y = (o + i) * p + c;
      s += `
                <text 
                    x="${l}" 
                    y="${y}"
                    font-size="${e}"
                    dominant-baseline="hanging" 
                    fill="black"
                    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
                >
                    ${this.rows[p].name}
                </text>
            `;
      const w = h.measureText(this.rows[p].name).width + l;
      w > d && (d = w);
    }
    const u = o * this.rows.length + i * (this.rows.length - 1) + r;
    let f = u;
    for (let p = 0; p < this.columns.length; p++) {
      const y = (o + i) * p + c;
      s += `
                <text 
                    x="${y}"
                    y="${u}"
                    font-size="${e}"
                    text-anchor="start" 
                    fill="black"
                    transform="rotate(90, ${y}, ${u})"
                    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
                >
                    ${this.columns[p].name}
                </text>
            `;
      const w = h.measureText(this.columns[p].name).width + u;
      w > f && (f = w);
    }
    return `
            <svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(d)}" height="${Math.ceil(f)}">
                ${s}
            </svg>
        `;
  }
  /**
   * Extracts a linear order from a dendrogram by following all branches up to leaves in a depth-first ordering.
   *
   * @param treeNode Root of a dendrogram for which a linear leaf ordering needs to be extracted.
   */
  determineOrder(e) {
    return e.values.map((n) => n.id);
  }
  /**
   * Determines the dimensions of one square based upon the current width and height-settings and the amount of rows
   * and columns currently set to be visualized.
   */
  determineSquareWidth(e = this.currentViewPort, n = this.textWidth, i = this.textHeight) {
    const r = this.determineDendrogramWidth(), o = e.xBottom - e.xTop - r - this.columns.length * this.settings.squarePadding - n, s = e.yBottom - e.yTop - r - this.rows.length * this.settings.squarePadding - i;
    let a = Math.max(1, o / this.columns.length), h = Math.max(1, s / this.rows.length);
    return Math.min(a, h);
  }
  determineDendrogramWidth() {
    return this.settings.dendrogramEnabled ? this.settings.dendrogramWidth * this.lastZoomStatus.k : 0;
  }
  computeTextStartX(e = this.currentViewPort, n = this.textWidth, i = this.textHeight) {
    return e.xTop + this.determineDendrogramWidth() + this.determineSquareWidth(e, n, i) * this.columns.length + this.settings.squarePadding * (this.columns.length - 1) + this.settings.visualizationTextPadding;
  }
  computeTextStartY(e = this.currentViewPort, n = this.textWidth, i = this.textHeight) {
    return e.yTop + this.determineDendrogramWidth() + this.determineSquareWidth(e, n, i) * this.rows.length + this.settings.squarePadding * (this.rows.length - 1) + this.settings.visualizationTextPadding;
  }
  zoomed({ k: e, x: n, y: i }) {
    this.lastZoomStatus = { k: e, x: n, y: i };
    const r = n + this.computeTextStartX(
      this.originalViewPort,
      this.settings.initialTextWidth,
      this.settings.initialTextHeight
    ) * e, o = i + this.computeTextStartY(
      this.originalViewPort,
      this.settings.initialTextWidth,
      this.settings.initialTextHeight
    ) * e, s = (a, h) => a > h ? h : e >= 1 ? Math.min(a, h) : Math.max(a, h);
    this.currentViewPort = {
      xTop: n + this.originalViewPort.xTop * e,
      yTop: i + this.originalViewPort.yTop * e,
      xBottom: s(n + this.originalViewPort.xBottom * e, this.originalViewPort.xBottom),
      yBottom: s(i + this.originalViewPort.yBottom * e, this.originalViewPort.yBottom)
    }, this.textWidth = this.currentViewPort.xBottom - r, this.textHeight = this.currentViewPort.yBottom - o, this.redraw();
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
  redraw(e = Array.from(Array(this.rows.length).keys()), n = Array.from(Array(this.columns.length).keys()), i = -1) {
    this.redrawGrid(e, n, i), this.redrawRowTitles(e, i), this.redrawColumnTitles(n, i), this.redrawDendrogram(i);
  }
  redrawGrid(e, n, i) {
    i === -1 && (i = 0);
    let r = this.determineSquareWidth();
    const o = this.determineDendrogramWidth();
    this.context.clearRect(0, 0, this.settings.width, this.settings.height);
    for (const [s, a] of this.valuesPerColor) {
      this.context.beginPath(), this.context.fillStyle = s;
      for (const [h, l] of a) {
        const c = this.currentViewPort.xTop + o + l * (r + this.settings.squarePadding), d = this.currentViewPort.yTop + o + h * (r + this.settings.squarePadding), u = this.currentViewPort.xTop + o + n[l] * (r + this.settings.squarePadding), f = this.currentViewPort.yTop + o + e[h] * (r + this.settings.squarePadding), p = u - c, y = f - d;
        let w = c + p * i, m = d + y * i, b = w + (r + this.settings.squarePadding), M = m + (r + this.settings.squarePadding);
        b < 0 || w > this.settings.width || M < 0 || m > this.settings.height || (this.settings.highlightSelection && h == this.highlightedRow && l == this.highlightedColumn && (this.context.save(), this.context.fillStyle = this.settings.maxColor, this.context.fillRect(
          w - this.settings.squarePadding,
          m - this.settings.squarePadding,
          r + 2 * this.settings.squarePadding,
          r + 2 * this.settings.squarePadding
        ), this.context.restore()), this.context.fillRect(
          w,
          m,
          r,
          r
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
  ellipsizeString(e, n) {
    if (this.context.measureText(e).width > n) {
      let r = e.length, o = e.substr(0, r) + "...";
      for (; this.context.measureText(o).width > n && r > 0; )
        r--, o = e.substr(0, r) + "...";
      return r === 0 ? "" : o;
    } else
      return e;
  }
  redrawRowTitles(e, n) {
    n === -1 && (n = 0);
    const i = this.determineSquareWidth(), r = this.determineDendrogramWidth(), o = Math.max(Math.floor((this.settings.fontSize + 12) / (i + this.settings.squarePadding)), 1), s = this.computeTextStartX();
    let a = Math.max((i - this.settings.fontSize) / 2, 0);
    this.context.save(), this.context.fillStyle = this.settings.labelColor, this.context.textBaseline = "top", this.context.textAlign = "start", this.context.font = `${this.settings.fontSize}px Arial, sans-serif`;
    for (let h = 0; h < this.rows.length; h += o) {
      const l = this.rows[h];
      this.settings.highlightSelection && h == this.highlightedRow && (this.context.save(), this.context.fillStyle = this.settings.highlightFontColor, this.context.font = `${this.settings.highlightFontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`, a = Math.max((i - this.settings.highlightFontSize) / 2, 0));
      const c = this.currentViewPort.yTop + r + (i + this.settings.squarePadding) * h + a, u = this.currentViewPort.yTop + r + (i + this.settings.squarePadding) * e[h] + a - c, f = c + u * n;
      this.context.fillText(
        this.ellipsizeString(l.name, this.textWidth),
        s,
        f
      ), this.settings.highlightSelection && h == this.highlightedRow && this.context.restore();
    }
    this.context.restore();
  }
  redrawColumnTitles(e, n) {
    n === -1 && (n = 0);
    let i = this.determineSquareWidth();
    const r = this.determineDendrogramWidth();
    let o = Math.max(Math.floor((this.settings.fontSize + 12) / (i + this.settings.squarePadding)), 1), s = this.computeTextStartY(), a = Math.max((i - this.settings.fontSize) / 2, 0);
    this.context.save(), this.context.rotate(90 * Math.PI / 180), this.context.fillStyle = this.settings.labelColor, this.context.textBaseline = "bottom", this.context.textAlign = "start", this.context.font = `${this.settings.fontSize}px Arial, sans-serif`;
    for (let h = 0; h < this.columns.length; h += o) {
      const l = this.columns[h];
      this.settings.highlightSelection && h == this.highlightedColumn && (this.context.save(), this.context.fillStyle = this.settings.highlightFontColor, this.context.font = `${this.settings.highlightFontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`, a = Math.max((i - this.settings.highlightFontSize) / 2, 0));
      const c = -(this.currentViewPort.xTop + r + (i + this.settings.squarePadding) * h + a), u = -(this.currentViewPort.xTop + r + (i + this.settings.squarePadding) * e[h] + a) - c, f = c + u * n;
      this.context.fillText(
        this.ellipsizeString(l.name, this.textHeight),
        s,
        f
      ), this.settings.highlightSelection && h == this.highlightedColumn && this.context.restore();
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
  bfsNodesPerDepth(e) {
    const n = [], i = [];
    for (i.push([e, 0]); i.length > 0; ) {
      const [r, o] = i.shift();
      n.length <= o && n.push([]), n[o].push(r), r.leftChild && i.push([r.leftChild, o + 1]), r.rightChild && i.push([r.rightChild, o + 1]);
    }
    return n;
  }
  redrawDendrogram(e) {
    this.settings.dendrogramEnabled && (this.redrawHorizontalDendrogram(e), this.redrawVerticalDendrogram(e));
  }
  computeDendrogramColor(e, n, i) {
    return i === -1 || !n ? e ? this.settings.dendrogramColor : "#d3d3d3" : an(mt("#d3d3d3"), mt(this.settings.dendrogramColor))(i);
  }
  redrawVerticalDendrogram(e) {
    this.context.save();
    const n = this.computeDendrogramColor(this.clusteredVertical, this.animatingRows, e), i = this.determineSquareWidth(), r = this.settings.dendrogramWidth * this.lastZoomStatus.k, o = new Kn(this.context), s = this.currentViewPort.yTop + r + i / 2, a = /* @__PURE__ */ new Map(), h = this.determineOrder(this.rowClusterRoot);
    for (let d = 0; d < h.length; d++)
      a.set(
        h[d],
        [
          this.currentViewPort.xTop + r,
          d * (i + this.settings.squarePadding) + s
        ]
      );
    const l = r / this.rows.length;
    let c = this.currentViewPort.xTop + r - l;
    for (let d = this.verticalNodesPerDepth.length - 1; d > 0; d--)
      for (let u = 0; u < this.verticalNodesPerDepth[d].length; u += 2) {
        const f = this.verticalNodesPerDepth[d][u], p = this.verticalNodesPerDepth[d][u + 1], y = f.parent, [w, m] = a.get(f.id), [b, M] = a.get(p.id);
        if (this.context.beginPath(), o.renderLine(w, m, c, m, this.settings.dendrogramLineWidth, n), o.renderLine(b, M, c, M, this.settings.dendrogramLineWidth, n), o.renderLine(c, m, c, M, this.settings.dendrogramLineWidth, n), this.context.closePath(), y) {
          const P = Math.min(m, M) + Math.abs(m - M) / 2;
          a.set(y.id, [c, P]);
        }
        c -= l;
      }
    if (!this.clusteredVertical) {
      this.context.rotate(-(90 * Math.PI) / 180), this.context.fillStyle = this.settings.labelColor;
      const d = 24 * this.lastZoomStatus.k;
      this.context.font = `${d}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
      const u = this.context.measureText("Click to cluster").width;
      this.context.fillText(
        "Click to cluster",
        -(this.currentViewPort.yTop + r + this.rows.length * (i + this.settings.squarePadding) / 2) - u / 2,
        this.currentViewPort.xTop + r / 2 + d / 2
      );
    }
    this.context.restore();
  }
  redrawHorizontalDendrogram(e) {
    this.context.save();
    const n = this.computeDendrogramColor(this.clusteredHorizontal, this.animatingCols, e), i = this.determineSquareWidth(), r = this.settings.dendrogramWidth * this.lastZoomStatus.k, o = new Kn(this.context), s = this.currentViewPort.xTop + i / 2 + r, a = /* @__PURE__ */ new Map(), h = this.determineOrder(this.colClusterRoot);
    for (let d = 0; d < h.length; d++)
      a.set(
        h[d],
        [
          d * (i + this.settings.squarePadding) + s,
          this.currentViewPort.yTop + r
        ]
      );
    const l = r / this.columns.length;
    let c = this.currentViewPort.yTop + r - l;
    for (let d = this.horizontalNodesPerDepth.length - 1; d > 0; d--)
      for (let u = 0; u < this.horizontalNodesPerDepth[d].length; u += 2) {
        const f = this.horizontalNodesPerDepth[d][u], p = this.horizontalNodesPerDepth[d][u + 1], y = f.parent, [w, m] = a.get(f.id), [b, M] = a.get(p.id);
        if (this.context.beginPath(), o.renderLine(w, m, w, c, this.settings.dendrogramLineWidth, n), o.renderLine(b, M, b, c, this.settings.dendrogramLineWidth, n), o.renderLine(w, c, b, c, this.settings.dendrogramLineWidth, n), this.context.closePath(), y) {
          const P = Math.min(w, b) + Math.abs(w - b) / 2;
          a.set(y.id, [P, c]);
        }
        c -= l;
      }
    if (!this.clusteredHorizontal) {
      this.context.fillStyle = this.settings.labelColor;
      const d = 24 * this.lastZoomStatus.k;
      this.context.font = `${d}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
      const u = this.context.measureText("Click to cluster").width;
      this.context.fillText(
        "Click to cluster",
        this.currentViewPort.xTop + r + this.columns.length * (i + this.settings.squarePadding) / 2 - u / 2,
        this.currentViewPort.yTop + r / 2 + d / 2
      );
    }
    this.context.restore();
  }
  initTooltip() {
    return V("body").append("div").attr("class", "tip").style("position", "absolute").style("z-index", "10").style("visibility", "hidden");
  }
  findRowAndColForPosition(e, n) {
    const i = this.determineDendrogramWidth(), r = e - this.currentViewPort.xTop - i, o = n - this.currentViewPort.yTop - i, s = this.determineSquareWidth(), a = Math.floor(o / (s + this.settings.squarePadding)), h = Math.floor(r / (s + this.settings.squarePadding));
    return [a, h];
  }
  tooltipMove(e) {
    const n = e.target.getBoundingClientRect(), [i, r] = this.findRowAndColForPosition(e.clientX - n.left, e.clientY - n.top);
    if (i < 0 || i >= this.rows.length || r < 0 || r >= this.columns.length) {
      this.settings.enableTooltips && this.tooltip && this.tooltip.style("visibility", "hidden"), this.highlightedRow = -1, this.highlightedColumn = -1, this.settings.highlightSelection && this.redraw();
      return;
    }
    this.highlightedRow = i, this.highlightedColumn = r, this.settings.highlightSelection && this.redraw(), this.settings.enableTooltips && this.tooltip && this.tooltip.html(this.settings.getTooltip(this.values[i][r], this.rows[i], this.columns[r])).style("top", e.pageY + 10 + "px").style("left", e.pageX + 10 + "px").style("visibility", "visible");
  }
  /**
   * Determines if a click occurred on one of the dendrograms and if clustering should be applied to the heatmap.
   *
   * @param event
   * @private
   */
  click(e) {
    if (!this.settings.dendrogramEnabled)
      return;
    const n = this.determineDendrogramWidth(), i = this.determineSquareWidth(), r = e.target.getBoundingClientRect(), o = e.clientX - r.left, s = e.clientY - r.top;
    if (o >= this.currentViewPort.xTop && o <= this.currentViewPort.xTop + n && s >= this.currentViewPort.yTop + n && s <= this.currentViewPort.yTop + n + this.rows.length * (i + this.settings.squarePadding)) {
      this.cluster("rows");
      return;
    }
    if (o >= this.currentViewPort.xTop + n && o <= this.currentViewPort.xTop + n + this.columns.length * (i + this.settings.squarePadding) && s >= this.currentViewPort.yTop && s <= this.currentViewPort.yTop + n) {
      this.cluster("columns");
      return;
    }
  }
}
class qh {
  getDistance(e) {
    let n = [];
    for (let i = 0; i < e.length; i++) {
      let r = [];
      for (let o = 0; o <= i; o++)
        r.push(this.getPearsonCorrelationBetween2Samples(e[i], e[o]));
      n.push(r);
    }
    return n;
  }
  getPearsonCorrelationBetween2Samples(e, n) {
    const i = (h, l) => h + l, r = e.reduce(i, 0) / e.length, o = n.reduce(i, 0) / n.length;
    let s = 0, a = 0;
    for (let h = 0; h < e.length; h++)
      s += (e[h] - r) * (n[h] - o), a += Math.sqrt(Math.pow(e[h] - r, 2)) * Math.sqrt(Math.pow(n[h] - o, 2));
    return 1 - s / a;
  }
}
class Vt {
}
Vt.DEFAULT_COLORS = [
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
Vt.FIXED_COLORS = [
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
Vt.MATERIAL_DESIGN_COLORS = [
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
class zh {
  /**
   * Hash function for strings from http://stackoverflow.com/a/15710692/865696
   */
  static stringHash(e) {
    return e.split("").reduce(function(n, i) {
      let r = (n << 5) - n + i.charCodeAt(0);
      return r & r;
    }, 0);
  }
}
class Qn extends Xt {
  constructor() {
    super(...arguments), this.radius = 300, this.breadcrumbWidth = 200, this.className = "sunburst", this.useFixedColors = !1, this.colorPalette = Vt.DEFAULT_COLORS, this.fixedColorPalette = Vt.FIXED_COLORS, this.enableBreadcrumbs = !0, this.levels = 4, this.animationDuration = 1e3, this.rerootCallback = () => {
    }, this.fixedColorHash = (e) => zh.stringHash(e.name), this.getTooltip = (e) => `
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
                    ${this.getTooltipTitle(e)}
                </div>
                <a>
                    ${this.getTooltipText(e)}
                </a>
            </div>
        `, this.getTooltipTitle = (e) => e.name, this.getTooltipText = (e) => `${e.count} hits`, this.getLabel = (e) => e.name === "empty" ? "" : e.name, this.getTitleText = this.getLabel;
  }
}
const Yi = class Gi {
  /**
   * Preprocesses the given Node data structure.
   *
   * @param data A node-like structure that should be converted to proper DataNode-objects and that should be prepared
   * for use in the Sunburst visualization.
   */
  preprocessData(e) {
    const n = [];
    if (e.children)
      for (const i of e.children)
        n.push(this.preprocessData(i));
    return n.length > 0 && e.count !== 0 && n.push(new oe(-1, "empty", [], e.count, e.selfCount)), new oe(
      e.id || ++Gi.idCounter,
      e.name || "",
      n,
      e.count,
      e.selfCount,
      e.extra
    );
  }
};
Yi.idCounter = 0;
let Eh = Yi;
class Se {
  static initTooltip() {
    return V("body").append("div").attr("class", "tip").style("position", "absolute").style("z-index", "10").style("visibility", "hidden");
  }
}
class It {
  /**
   * Checks if p is a parent of c. If the child is situated deeper in the hierarchy than maxLevels, false is returned.
   *
   * @param p Possible parent node.
   * @param c Possible child node.
   * @param maxLevels Maximum depth for the child node in the hierarchy.
   */
  static isParentOf(e, n, i) {
    return n.depth >= i ? !1 : e === n ? !0 : e.children ? e.children.some((r) => It.isParentOf(r, n, i)) : !1;
  }
}
class ke {
  /*
   * Returns the readable text color based on the brightness of a given background color.
   */
  static getReadableColorFor(e) {
    let n = "#000";
    try {
      n = ke.brightness(ue(e)) < 125 ? "#eee" : "#000";
    } catch {
    }
    return n;
  }
  /*
   * Returns the brightness of an rgb-color.
   * from: http:// www.w3.org/WAI/ER/WD-AERT/#color-contrast
   */
  static brightness({ r: e, g: n, b: i }) {
    return e * 0.299 + n * 0.587 + i * 0.114;
  }
}
class Wh {
  constructor(e, n, i = new Qn()) {
    this.element = e, this.colorCounter = -1, this.currentMaxLevel = 4, this.arcData = [], this.textData = [], this.previousRoot = null, this.previousMaxLevel = this.currentMaxLevel, this.settings = this.fillOptions(i);
    const o = new Eh().preprocessData(n);
    this.settings.enableTooltips && (this.tooltip = Se.initTooltip()), this.currentMaxLevel = this.settings.levels, this.xScale = lt().range([0, 2 * Math.PI]), this.yScale = lt().domain([0, 1]).range([0, this.settings.radius]);
    const s = At(o);
    s.sum((l) => l.children.length > 0 ? 0 : l.selfCount);
    const a = Nl();
    this.data = a(s).descendants(), this.arc = je().startAngle((l) => Math.max(0, Math.min(Math.PI * 2, this.xScale(l.x0)))).endAngle((l) => Math.max(0, Math.min(Math.PI * 2, this.xScale(l.x1)))).innerRadius((l) => Math.max(0, l.y0 ? this.yScale(l.y0) : l.y0)).outerRadius((l) => Math.max(0, this.yScale(l.y1) + 1)), this.initCss(), this.element.innerHTML = "", this.breadCrumbs = V(this.element).append("div").attr("id", Math.floor(Math.random() * 2 ** 16) + "-breadcrumbs").attr("class", "sunburst-breadcrumbs").append("ul");
    const h = V(this.element).append("svg").attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`).attr("width", this.settings.width).attr("height", this.settings.height).attr("overflow", "hidden").style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");
    h.append("style").attr("type", "text/css").html(".hidden{ visibility: hidden;}"), this.visGElement = h.append("g").attr("transform", "translate(" + this.settings.radius + "," + this.settings.radius + ")"), this.reset();
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
  reroot(e, n = !0) {
    const i = this.data.find((r) => r.data.id === e);
    i && this.click(i, n);
  }
  fillOptions(e = void 0) {
    const n = new Qn();
    return Object.assign(n, e);
  }
  maxY(e) {
    return e.children ? Math.max(...e.children.map((n) => this.maxY(n))) : e.y1;
  }
  /**
   * Calculates the color of an arc based on the color of his children.
   *
   * @param d The node for which we want the color.
   * @return string The calculated color in HTML color representation.
   */
  color(e) {
    if (e.name === "empty")
      return "white";
    if (this.settings.useFixedColors)
      return this.settings.fixedColorPalette[Math.abs(this.settings.fixedColorHash(e)) % this.settings.fixedColorPalette.length];
    if (e.children.length > 0) {
      const n = e.children.map((s) => this.color(s)), i = Et(n[0]), r = Et(n[1]);
      return e.children.length === 1 || e.children[1].name === "empty" ? Et(i.h, i.s, i.l * 0.98) : Et((i.h + r.h) / 2, (i.s + r.s) / 2, (i.l + r.l) / 2);
    }
    return e.extra.color || (e.extra.color = this.getColor()), e.extra.color;
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
    let e = this.settings.className;
    this.element.className += " " + e;
    const n = this.element.ownerDocument.createElement("style");
    n.appendChild(this.element.ownerDocument.createTextNode(`
.${e} {
    font-family: Roboto,'Helvetica Neue',Helvetica,Arial,sans-serif;
    width: ${this.settings.width + this.settings.breadcrumbWidth}px;
}
.${e} .sunburst-breadcrumbs {
    width: 176px;
    float: right;
    margin-right: 15px;
    margin-top: 10px;
    padding-left: 5px;
}
.${e} .sunburst-breadcrumbs ul {
    padding-left: 0;
    list-style: none;
}
.${e} .sunburst-breadcrumbs .crumb {
    margin-bottom: 5px;
    cursor: pointer;
}
.${e} .sunburst-breadcrumbs .crumb svg {
    float: left;
    margin-right: 3px;
}
.${e} .sunburst-breadcrumbs .crumb p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0;
    font-size: 14px;
}
.${e} .sunburst-breadcrumbs .crumb .percentage {
    font-size: 11px;
}`)), this.element.ownerDocument.head.appendChild(n);
  }
  /**
   * Interpolate the scales! Defines new scales based on the clicked item.
   *
   * @param d The clicked item
   * @return new scales
   */
  arcTween(e, n) {
    let i = Math.min(this.maxY(e), e.y0 + n.settings.levels * (e.y1 - e.y0)), r = Ct(n.xScale.domain(), [e.x0, e.x1]), o = Ct(n.yScale.domain(), [e.y0, i]), s = Ct(n.yScale.range(), [e.y0 ? 20 : 0, n.settings.radius]);
    return (a) => (h) => (n.xScale.domain(r(h)), n.yScale.domain(o(h)).range(s(h)), n.arc(a));
  }
  tooltipIn(e, n) {
    this.settings.enableTooltips && this.tooltip && n.depth < this.currentMaxLevel && n.data.name !== "empty" && this.tooltip.html(this.settings.getTooltip(n.data)).style("top", e.pageY + 10 + "px").style("left", e.pageX + 10 + "px").style("visibility", "visible");
  }
  tooltipMove(e, n) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("top", e.pageY + 10 + "px").style("left", e.pageX + 10 + "px");
  }
  tooltipOut(e, n) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("visibility", "hidden");
  }
  /**
   * Compute the amount of vertical space that's available for text (i.e. the maximum text height) for a specific node
   * in the sunburst visualization.
   *
   * @param d The node in the sunburst visualization for which the vertical space should be computed.
   * @return The available vertical space in pixels.
   */
  computeAvailableSpace(e) {
    const n = 2 * Math.max(0, this.yScale(e.y1) + 1) * Math.PI, i = Math.max(
      0,
      Math.min(Math.PI * 2, this.xScale(e.x1)) - Math.max(0, Math.min(Math.PI * 2, this.xScale(e.x0)))
    );
    return n * (i / (2 * Math.PI));
  }
  /**
   * Defines what happens after a node is clicked.
   *
   * @param d The data object of the clicked arc
   * @param triggerCallback Should the rerootCallback function be triggered for this click?
   */
  click(e, n = !0) {
    e.data.name === "empty" || this.previousRoot && this.previousRoot.data.id === e.data.id || (this.previousRoot = e, this.settings.enableBreadcrumbs && this.setBreadcrumbs(e), this.settings.rerootCallback && n && this.settings.rerootCallback(e.data), this.currentMaxLevel = e.depth + this.settings.levels, this.renderArcs(e), this.renderText(e));
  }
  async renderArcs(e) {
    const n = this.data.filter((o) => It.isParentOf(e, o, this.currentMaxLevel + 2));
    e.parent && n.push(e.parent);
    const i = n.filter((o) => !this.arcData.includes(o)), r = this.arcData.concat(...i);
    this.visGElement.selectAll("path").data([]).exit().remove(), this.path = this.visGElement.selectAll("path").data(r).enter().insert("path").attr("class", "arc").attr("id", (o, s) => "path-" + s).attr("d", this.arc).attr("fill-rule", "evenodd").style("fill", (o) => this.color(o.data)).attr("fill-opacity", (o) => o.depth >= this.previousMaxLevel ? 0.2 : 1).on("click", (o, s) => {
      s.depth < this.currentMaxLevel && this.click(s);
    }).on("mouseover", (o, s) => this.tooltipIn(o, s)).on("mousemove", (o, s) => this.tooltipMove(o, s)).on("mouseout", (o, s) => this.tooltipOut(o, s)), await new Promise((o) => {
      this.path.transition().duration(this.settings.animationDuration).attrTween("d", this.arcTween(e, this)).attr("class", (s) => s.depth >= this.currentMaxLevel ? "arc toHide" : "arc").attr("fill-opacity", (s) => s.depth >= this.currentMaxLevel ? 0.2 : 1).on("end", () => {
        o();
      });
    }), this.previousMaxLevel = this.currentMaxLevel, this.arcData = n;
  }
  async renderText(e) {
    const n = this.data.filter((h) => It.isParentOf(e, h, this.currentMaxLevel)), i = n.filter((h) => !this.textData.includes(h)), r = this.textData.concat(...i);
    e.parent && r.splice(r.indexOf(e.parent), 1);
    const o = this, s = typeof OffscreenCanvas < "u";
    let a;
    s && (a = new OffscreenCanvas(1, 1).getContext("2d"), a.font = a.font = "16px 'Helvetica Neue', Helvetica, Arial, sans-serif"), this.visGElement.selectAll("text").data([]).exit().remove(), this.text = this.visGElement.selectAll("text").data(r).enter().append("text").style("fill", (h) => ke.getReadableColorFor(this.color(h.data))).style("fill-opacity", 0).style("font-family", "font-family: Helvetica, 'Super Sans', sans-serif").style("pointer-events", "none").attr("dy", ".2em").text((h) => this.settings.getLabel(h.data)).style("font-size", function(h) {
      const l = s ? a.measureText(this.textContent).width : this.getComputedTextLength();
      return Math.floor(Math.min(o.settings.radius / o.settings.levels / l * 10 + 1, 12)) + "px";
    }), await new Promise((h) => {
      this.text.transition().duration(this.settings.animationDuration).attrTween("text-anchor", (l) => (c) => this.xScale(l.x0 + (l.x1 - l.x0) / 2) > Math.PI ? "end" : "start").attrTween("dx", (l) => (c) => this.xScale(l.x0 + (l.x1 - l.x0) / 2) > Math.PI ? "-4px" : "4px").attrTween("transform", (l) => (c) => {
        let d = this.xScale(l.x0 + (l.x1 - l.x0) / 2) * 180 / Math.PI - 90;
        return `rotate(${d})translate(${this.yScale(l.y0)})rotate(${d > 90 ? -180 : 0})`;
      }).styleTween("fill-opacity", function(l) {
        const c = Number.parseInt(V(this).style("font-size").replace("px", ""));
        return (d) => o.computeAvailableSpace(l) > c ? d.toString() : "0";
      }).on("end", function(l) {
        const c = o.computeAvailableSpace(l), d = V(this);
        d.style(
          "visibility",
          c > Number.parseInt(d.style("font-size").replace("px", "")) && It.isParentOf(e, l, o.currentMaxLevel) ? "visible" : "hidden"
        ), h();
      });
    }), this.textData = n;
  }
  setBreadcrumbs(e) {
    let n = [], i = e;
    for (; i; )
      n.push(i), i = i.parent;
    n.reverse().shift();
    const r = je().innerRadius(0).outerRadius(15).startAngle(0).endAngle((o) => 2 * Math.PI * o.data.count / o.parent.data.count);
    this.breadCrumbs.selectAll(".crumb").data(n).enter().append("li").on("click", (o, s) => {
      this.click(s.parent);
    }).attr("class", "crumb").style("opacity", "0").attr("title", (o) => this.settings.getTitleText(o.data)).html((o) => {
      var s;
      return `
<p class='name'>${o.data.name}</p>
<p class='percentage'>${Math.round(100 * o.data.count / o.parent.data.count)}% of ${(s = o.parent) == null ? void 0 : s.data.name}</p>`;
    }).insert("svg", ":first-child").attr("width", 30).attr("height", 30).append("path").attr("d", r).attr("transform", "translate(15, 15)").attr("fill", (o) => this.color(o.data)), this.breadCrumbs.selectAll(".crumb").transition().duration(this.settings.animationDuration).style("opacity", "1"), this.breadCrumbs.selectAll(".crumb").data(n).exit().transition().duration(this.settings.animationDuration).style("opacity", "0").remove();
  }
}
class Jn extends Xt {
  constructor() {
    super(...arguments), this.className = "treemap", this.levels = void 0, this.labelHeight = 10, this.colorRoot = "#104B7D", this.colorLeaf = "#fdffcc", this.colorBreadcrumbs = "#FF8F00", this.rerootCallback = () => {
    }, this.getBreadcrumbTooltip = (e) => e.name, this.getTooltip = (e) => `
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
                    ${this.getTooltipTitle(e)}
                </div>
                <a>
                    ${this.getTooltipText(e)}
                </a>
            </div>
        `, this.getTooltipTitle = (e) => e.name, this.getTooltipText = (e) => `${e.count} hits`, this.getLabel = (e) => e.name, this.getLevel = (e) => e.depth;
  }
}
const Ui = class Zi {
  preprocessData(e) {
    const n = [];
    if (e.children)
      for (const i of e.children)
        n.push(this.preprocessData(i));
    return new oe(
      e.id || ++Zi.idCounter,
      e.name || "",
      n,
      e.count,
      e.selfCount,
      e.extra
    );
  }
};
Ui.idCounter = 0;
let Rh = Ui;
class Xh {
  constructor(e, n, i = new Jn()) {
    var s;
    this.element = e, this.childParentRelations = /* @__PURE__ */ new Map(), this.nodeId = 0, this.settings = this.fillOptions(i), this.settings.enableTooltips && (this.tooltip = Se.initTooltip()), this.initCss();
    const r = new Rh(), o = At(r.preprocessData(n));
    o.sum((a) => a.children.length > 0 ? 0 : a.count), o.sort((a, h) => h.value - a.value), this.partition = Vl(), this.partition.size([this.settings.width + 1, this.settings.height + 1]).paddingTop(this.settings.labelHeight), this.data = this.partition(o).descendants(), this.settings.levels || (this.settings.levels = this.data[0].height);
    for (const a of this.data)
      this.childParentRelations.set(a.data, (s = a.parent) == null ? void 0 : s.data);
    this.currentRoot = this.data[0], this.colorScale = lt().domain([0, this.settings.levels]).range([this.settings.colorRoot, this.settings.colorLeaf]).interpolate(an), this.breadCrumbs = V(this.element).append("div").attr("class", "breadcrumbs").style("position", "relative").style("width", this.settings.width + "px").style("height", "20px").style("background-color", this.settings.colorBreadcrumbs), this.treemap = V(this.element).append("div").style("position", "relative").style("width", this.settings.width + "px").style("height", this.settings.height + "px"), this.render(this.currentRoot);
  }
  resize(e, n) {
    this.settings.width = e, this.settings.height = n, this.partition.size([e + 1, n + 1]), this.breadCrumbs.style("width", this.settings.width + "px"), this.treemap.style("width", this.settings.width + "px"), this.treemap.style("height", this.settings.height + "px"), this.render(this.currentRoot, !1);
  }
  /**
   * Change the root of the visualization to the node with a given ID. Note that the reroot will only be executed if
   * a node with the given ID exists. If no node was found, nothing happens.
   *
   * @param nodeId ID of the node that should now become the new root of the tree.
   * @param triggerCallback Should the `rerootCallback` be triggered for this node?
   */
  reroot(e, n = !0) {
    const i = this.data.find((r) => r.data.id === e);
    i && this.render(i, n);
  }
  reset() {
    this.render(this.data[0], !1);
  }
  fillOptions(e = void 0) {
    const n = new Jn();
    return Object.assign(n, e);
  }
  initCss() {
    let e = this.settings.className;
    this.element.className += " " + e;
    const n = this.element.ownerDocument.createElement("style");
    n.appendChild(this.element.ownerDocument.createTextNode(`
            .${e} {
                font-family: Arial,sans-serif;
            }
            .${e} .node {
                font-size: 9px;
                line-height: 10px;
                overflow: hidden;
                position: absolute;
                text-indent: 2px;
                text-align: center;
                text-overflow: ellipsis;
                cursor: pointer;
            }
            .${e} .node:hover {
                outline: 1px solid white;
            }
            .${e} .breadcrumbs {
                font-size: 11px;
                line-height: 20px;
                padding-left: 5px;
                font-weight: bold;
                color: white;
                box-sizing: border-box;
            }
            .full-screen .${e} .breadcrumbs {
                width: 100% !important;
            }
            .${e} .crumb {
                cursor: pointer;
            }
            .${e} .crumb .link:hover {
                text-decoration: underline;
            }
            .${e} .breadcrumbs .crumb + .crumb::before {
                content: " > ";
                cursor: default;
            }
        `)), this.element.ownerDocument.head.append(n);
  }
  render(e, n = !0) {
    this.currentRoot = e, this.setBreadcrumbs();
    const i = At(e.data);
    i.sum((s) => s.children.length > 0 ? 0 : s.count), i.sort((s, a) => a.value - s.value);
    let r = this.treemap.selectAll(".node").data(
      this.partition(i).descendants(),
      (s) => s.data.id || (s.data.id = ++this.nodeId)
    );
    r.enter().append("div").attr("class", "node").style("background", (s) => this.colorScale(this.settings.getLevel(s))).style("color", (s) => ke.getReadableColorFor(this.colorScale(this.settings.getLevel(s)).toString())).style("left", "0px").style("top", "0px").style("width", "0px").style("height", "0px").text((s) => this.settings.getLabel(s.data)).on("click", (s, a) => this.render(a)).on("contextmenu", (s, a) => {
      s.preventDefault(), this.currentRoot.parent && this.render(this.currentRoot.parent);
    }).on("mouseover", (s, a) => this.tooltipIn(s, a)).on("mousemove", (s, a) => this.tooltipMove(s, a)).on("mouseout", (s, a) => this.tooltipOut(s, a)).merge(r).order().transition().call((s) => {
      s.style("left", (a) => a.x0 + "px"), s.style("top", (a) => a.y0 + "px"), s.style("width", (a) => Math.max(0, a.x1 - a.x0 - 1) + "px"), s.style("height", (a) => Math.max(0, a.y1 - a.y0 - 1) + "px");
    }), r.exit().remove(), n && this.settings.rerootCallback(this.currentRoot.data);
  }
  setBreadcrumbs() {
    let e = [], n = this.currentRoot.data;
    for (; n; )
      e.push(n), n = this.childParentRelations.get(n);
    e.reverse(), this.breadCrumbs.html(""), this.breadCrumbs.selectAll(".crumb").data(e).enter().append("span").attr("class", "crumb").attr("title", (i) => this.settings.getBreadcrumbTooltip(i)).html((i) => `<span class='link'>${i.name}</span>`).on("click", (i, r) => {
      this.render(this.data.filter((o) => o.data.id === r.id)[0]);
    });
  }
  tooltipIn(e, n) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.html(this.settings.getTooltip(n.data)).style("top", e.pageY + 10 + "px").style("left", e.pageX + 10 + "px").style("visibility", "visible");
  }
  tooltipMove(e, n) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("top", e.pageY + 10 + "px").style("left", e.pageX + 10 + "px");
  }
  tooltipOut(e, n) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("visibility", "hidden");
  }
}
const Dh = Te(jl);
class jn extends Xt {
  constructor() {
    super(...arguments), this.minNodeSize = 2, this.maxNodeSize = 105, this.enableExpandOnClick = !0, this.enableAutoExpand = !1, this.autoExpandValue = 0.8, this.levelsToExpand = 2, this.enableRightClick = !0, this.enableInnerArcs = !0, this.enableLabels = !0, this.nodeDistance = 180, this.animationDuration = 500, this.colorProviderLevels = 1, this.nodeFillColor = (e) => e.isSelected() ? e.children.length > 0 ? e.getColor() || "#aaa" : "#fff" : "#aaa", this.nodeStrokeColor = (e) => e.isSelected() && e.getColor() || "#aaa", this.linkStrokeColor = (e) => e.source.data.isSelected() ? e.target.data.getColor() : "#aaa", this.colorProvider = (e) => Dh(e.name), this.getLabel = (e) => e.name, this.getTooltip = (e) => `
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
                    ${this.getTooltipTitle(e)}
                </div>
                <a>
                    ${this.getTooltipText(e)}
                </a>
            </div>
        `, this.getTooltipTitle = (e) => e.name, this.getTooltipText = (e) => `${e.count} hits`;
  }
}
class Ih {
  constructor(e = [], n) {
    this.data = e, this.comparator = n, this.heapify();
  }
  add(e) {
    this.data.push(e), this.bubbleUp(this.data.length - 1);
  }
  peek() {
    return this.data[0];
  }
  remove() {
    const e = this.data[0];
    return this.data.length > 1 ? (this.data[0] = this.data.pop(), this.sink(0)) : this.data.pop(), e;
  }
  clear() {
    this.data.splice(0, this.data.length);
  }
  size() {
    return this.data.length;
  }
  heapify() {
    for (let e = Math.floor((this.data.length - 2) / 2); e >= 0; e--)
      this.sink(e);
  }
  bubbleUp(e) {
    const n = this.data[e];
    for (; e > 0; ) {
      const i = Math.floor((e - 1) / 2), r = this.data[i];
      if (this.comparator(n, r) < 0)
        this.data[e] = r;
      else
        break;
      e = i;
    }
    return this.data[e] = n, e;
  }
  sink(e) {
    const n = this.data[e], i = this.data.length;
    for (; 2 * e + 1 < i; ) {
      let r = 2 * e + 1;
      if (r < i - 1 && this.comparator(this.data[r + 1], this.data[r]) < 0 && r++, this.comparator(n, this.data[r]) <= 0)
        break;
      this.data[e] = this.data[r], e = r;
    }
    return this.data[e] = n, e;
  }
}
class Hh extends oe {
  constructor() {
    super(...arguments), this.previousPosition = { x: 0, y: 0 }, this.selected = !1, this.collapsed = !1, this.color = "";
  }
  isCollapsed() {
    return this.collapsed;
  }
  setCollapsed(e) {
    this.collapsed = e;
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
  setSelected(e) {
    this.selected = e;
    for (const n of this.children)
      n.setSelected(e);
  }
  /**
   * Recursively collapse all children of this node.
   */
  collapseAll() {
    for (const e of this.children)
      e.setCollapsed(!0), e.collapseAll();
  }
  /**
   * Collapse this node.
   */
  collapse() {
    for (const e of this.children)
      e.setCollapsed(!0);
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
  expand(e) {
    if (e > 0 && this.children.length > 0)
      for (const n of this.children)
        n.setCollapsed(!1), n.expand(e - 1);
  }
  /**
   * Recursively sets the color of this node and all of it's children to the provided value.
   *
   * @param color HTML hex string that represents a valid color.
   */
  setColor(e) {
    this.color = e;
    for (const n of this.children)
      n.setColor(e);
  }
}
const Ki = class Qi {
  preprocessData(e) {
    const n = [];
    if (e.children)
      for (const i of e.children)
        n.push(this.preprocessData(i));
    return new Hh(
      e.id || ++Qi.idCounter,
      e.name || "",
      n,
      e.count,
      e.selfCount,
      e.extra
    );
  }
};
Ki.idCounter = 0;
let Lh = Ki;
class Yh {
  constructor(e, n, i = new jn()) {
    this.element = e, this.nodeId = 0, this.zoomScale = 1, this.settings = this.fillOptions(i), this.settings.enableTooltips && (this.tooltip = Se.initTooltip());
    const o = new Lh().preprocessData(n), s = At(o);
    s.sum((a) => a.children.length > 0 ? 0 : a.count), this.widthScale = lt().range([this.settings.minNodeSize, this.settings.maxNodeSize]), this.treeLayout = Hl().nodeSize([2, 10]).separation((a, h) => {
      if (a.data.isCollapsed() || h.data.isCollapsed())
        return 0;
      const c = (this.computeNodeSize(a) + this.computeNodeSize(h)) / 2 + 4;
      return a.parent === h.parent ? c : c + 4;
    }), this.data = this.treeLayout(s).descendants(), this.root = this.data[0], this.element.innerHTML = "", this.svg = V(this.element).append("svg").attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`).attr("width", this.settings.width).attr("height", this.settings.height).style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif"), this.zoomListener = Wi().extent([[0, 0], [this.settings.width, this.settings.height]]).scaleExtent([0.1, 3]).on("zoom", (a) => {
      this.zoomScale = a.transform.k, this.visElement.attr("transform", a.transform.toString());
    }), this.visElement = this.svg.call(this.zoomListener).append("g"), this.render(this.root);
  }
  reset() {
    this.render(this.data[0]);
  }
  fillOptions(e = void 0) {
    const n = new jn();
    return Object.assign(n, e);
  }
  render(e) {
    var i;
    this.widthScale.domain([0, e.data.count]), this.root = e, this.root.x = this.settings.height / 2, this.root.y = 0, this.root.data.setSelected(!0);
    const n = (r, o) => {
      if (r.data.setColor(this.settings.colorProvider(r.data, o)), o < this.settings.colorProviderLevels && r.children)
        for (const s of r.children)
          n(s, o + 1);
    };
    (i = this.root.children) == null || i.forEach((r, o) => {
      n(r, 1);
    }), this.settings.enableExpandOnClick ? (this.root.data.collapseAll(), this.initialExpand(this.root)) : this.root.data.expandAll(), this.update(e), this.centerRoot(e);
  }
  centerRoot(e) {
    let [n, i] = [-e.y, -e.x];
    n = n * this.zoomScale + this.settings.width / 4, i = i * this.zoomScale + this.settings.height / 2, this.visElement.transition().duration(this.settings.animationDuration).attr("transform", `translate(${n},${i})scale(${this.zoomScale})`).on("end", () => this.zoomListener.transform(this.svg, fn.translate(n, i).scale(this.zoomScale)));
  }
  initialExpand(e) {
    var r;
    if (!this.settings.enableAutoExpand) {
      e.data.expand(this.settings.levelsToExpand);
      return;
    }
    e.data.expand(1);
    let n = e.data.count * (this.settings.enableAutoExpand ? this.settings.autoExpandValue : 0.8);
    const i = new Ih([...e.children || []], (o, s) => s.data.count - o.data.count);
    for (; n > 0 && i.size() > 0; ) {
      const o = i.remove();
      n -= o.data.count, o.data.expand(1), (r = o.children) == null || r.forEach((s, a) => {
        i.add(s);
      });
    }
  }
  update(e) {
    const n = this.treeLayout(this.root), i = n.descendants().reverse().filter((f) => !f.data.isCollapsed()), r = n.links().filter((f) => !f.target.data.isCollapsed() && !f.source.data.isCollapsed());
    i.forEach((f) => f.y = f.depth * this.settings.nodeDistance);
    const o = this.visElement.selectAll("g.node").data(i, (f) => f.data.id || (f.data.id = ++this.nodeId));
    let s = o.enter().append("g").attr("class", "node").style("cursor", "pointer").attr("transform", `translate(${e.y || 0},${e.data.previousPosition.x || 0})`).on("click", (f, p) => this.click(f, p)).on("mouseover", (f, p) => this.tooltipIn(f, p)).on("mouseout", (f, p) => this.tooltipOut(f, p)).on("contextmenu", (f, p) => this.rightClick(f, p)).merge(o);
    s.append("circle").attr("r", 1e-6).style("stroke-width", "1.5px").style("stroke", (f) => this.settings.nodeStrokeColor(f.data)).style("fill", (f) => this.settings.nodeFillColor(f.data));
    const a = lt().range([0, 2 * Math.PI]), h = je().innerRadius(0).outerRadius((f) => this.computeNodeSize(f)).startAngle(0).endAngle((f) => a(f.data.selfCount / f.data.count) || 0);
    this.settings.enableInnerArcs && s.append("path").attr("class", "innerArc").attr("d", h).style("fill", (f) => this.settings.nodeStrokeColor(f.data)).style("fill-opacity", 0), this.settings.enableLabels && s.append("text").attr("x", (f) => f.children ? -10 : 10).attr("dy", ".35em").attr("text-anchor", (f) => f.children ? "end" : "start").text((f) => this.settings.getLabel(f.data)).style("font", "10px sans-serif").style("fill-opacity", 1e-6);
    const l = s.transition().duration(this.settings.animationDuration).attr("transform", (f) => `translate(${f.y}, ${f.x})`);
    l.select("circle").attr("r", (f) => this.computeNodeSize(f)).style("fill-opacity", (f) => f.children && f.children[0].data.isCollapsed() ? 1 : 0).style("stroke", (f) => this.settings.nodeStrokeColor(f.data)).style("fill", (f) => this.settings.nodeFillColor(f.data)), this.settings.enableInnerArcs && l.select(".innerArc").style("fill-opacity", 1), this.settings.enableLabels && l.select("text").style("fill-opacity", 1);
    const c = o.exit().transition().duration(this.settings.animationDuration).attr("transform", (f) => `translate(${e.y},${e.x})`).remove();
    c.select("circle").attr("r", 1e-6), c.select("path").style("fill-opacity", 1e-6), c.select("text").style("fill-opacity", 1e-6);
    let d = this.visElement.selectAll("path.link").data(r, (f) => f.target.data.id);
    const u = xh().x((f) => f.y).y((f) => f.x);
    d.enter().insert("path", "g").attr("class", "link").style("fill", "none").style("stroke-opacity", "0.5").style("stroke-linecap", "round").style("stroke", (f) => this.settings.linkStrokeColor(f)).style("stroke-width", 1e-6).attr("d", (f) => {
      const p = {
        x: e.data.previousPosition.x,
        y: e.data.previousPosition.y
      };
      return u({
        source: p,
        target: p
      });
    }).merge(d).transition().duration(this.settings.animationDuration).attr("d", u).style("stroke", this.settings.linkStrokeColor).style("stroke-width", (f) => f.source.data.isSelected() ? this.widthScale(f.target.data.count) + "px" : "4px"), d.exit().transition().duration(this.settings.animationDuration).style("stroke-width", 1e-6).attr("d", (f) => {
      const p = {
        x: e.x,
        y: e.y
      };
      return u({
        source: p,
        target: p
      });
    }).remove(), i.forEach((f) => {
      f.data.previousPosition = {
        x: f.x,
        y: f.y
      };
    });
  }
  computeNodeSize(e) {
    return e.data.isSelected() ? this.widthScale(e.data.count) / 2 : 2;
  }
  click(e, n) {
    this.settings.enableExpandOnClick && (e.defaultPrevented || (e.shiftKey ? n.data.expandAll() : n.children && n.children.some((i) => !i.data.isCollapsed()) ? n.data.collapseAll() : n.data.expand(this.settings.levelsToExpand), this.update(n), this.centerRoot(n)));
  }
  tooltipIn(e, n) {
    this.settings.enableTooltips && this.tooltip && (this.tooltip.html(this.settings.getTooltip(n.data)).style("top", e.pageY + 10 + "px").style("left", e.pageX + 10 + "px"), this.tooltipTimer = window.setTimeout(() => this.tooltip.style("visibility", "visible"), 1e3));
  }
  tooltipOut(e, n) {
    this.settings.enableTooltips && this.tooltip && (clearTimeout(this.tooltipTimer), this.tooltip.style("visibility", "hidden"));
  }
  rightClick(e, n) {
    this.settings.enableRightClick && this.render(n);
  }
}
class Oh {
  constructor() {
    this.padding = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    };
  }
}
class Bh {
  constructor() {
    this.padding = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    }, this.titleFontSize = 24, this.labelFontSize = 16, this.symbolSize = 16, this.columns = 3, this.width = 300, this.rowSpacing = 5, this.columnSpacing = 20;
  }
}
class ti extends Xt {
  constructor() {
    super(...arguments), this.orientation = "vertical", this.barHeight = 75, this.className = "barplot", this.maxItems = 15, this.font = "Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;", this.displayMode = "relative", this.showBarLabel = !0, this.showValuesInBars = !0, this.valuesInBarsFontSize = 12, this.chart = new Oh(), this.legend = new Bh(), this.enableTooltips = !0, this.getTooltip = (e) => `
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
                    ${this.getTooltipTitle(e)}
                </div>
                <a>
                    ${this.getTooltipText(e)}
                </a>
            </div>
        `, this.getTooltipTitle = (e) => e.label, this.getTooltipText = (e) => this.displayMode === "absolute" ? `${e.counts.toFixed(1)} hits` : `${e.counts.toFixed(1)} %`;
  }
}
class Fh {
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
  computeMaxItemsInBars(e, n) {
    let i = e.map((o) => ({ ...o })), r = [...e[0].items].sort((o, s) => s.counts - o.counts);
    return n !== void 0 && (r = r.splice(0, n)), i = e.map((o) => {
      let s = 0;
      const a = [];
      for (const l of o.items)
        r.findIndex((c) => c.label === l.label) >= 0 ? a.push(l) : s += l.counts;
      const h = a.sort((l, c) => {
        const d = r.findIndex((f) => f.label === l.label), u = r.findIndex((f) => f.label === c.label);
        return d - u;
      });
      return {
        label: o.label,
        items: [
          ...h,
          { label: "Other", counts: s }
        ]
      };
    }), i;
  }
  /**
   * Convert the count values for each chunk of a bar from an absolute to a relative value.
   *
   * @param bars
   */
  convertAbsoluteToRelative(e) {
    return e.map((n) => {
      const i = n.items.reduce((r, o) => r + o.counts, 0);
      return {
        label: n.label,
        items: n.items.map((r) => ({
          label: r.label,
          counts: r.counts / i * 100
        }))
      };
    });
  }
}
class Gh {
  constructor(e, n, i = new ti()) {
    this.element = e, this.settings = this.fillOptions(i);
    const r = new Fh();
    this.data = r.computeMaxItemsInBars(n, this.settings.maxItems), this.settings.displayMode === "relative" && (this.data = r.convertAbsoluteToRelative(this.data)), this.settings.enableTooltips && (this.tooltip = Se.initTooltip()), this.renderBarplot();
  }
  fillOptions(e = void 0) {
    const n = new ti();
    return Object.assign(n, e);
  }
  renderBarplot() {
    const e = V(this.element).append("svg").attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`).attr("width", this.settings.width).attr("height", this.settings.height).attr("overflow", "hidden").style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif"), n = this.settings.font, i = this.settings.chart.padding, r = this.settings.barHeight, o = this.settings.orientation == "horizontal", s = this.settings.legend.padding, a = this.settings.legend.width, h = this.settings.legend.titleFontSize, l = this.settings.legend.labelFontSize, c = this.settings.legend.symbolSize, d = this.settings.legend.rowSpacing, u = this.settings.legend.columnSpacing, f = this.settings.legend.columns, p = 10, y = 10, w = 40;
    let m, b, M, P, N, z, D, F;
    o ? (m = this.settings.width - i.left - i.right - a, b = r * this.data.length, P = s.top, M = i.left + m + i.right + s.left, N = Math.max(c, l), z = a - s.left - s.right - c - y, F = a - s.left - s.right) : (m = this.settings.width - i.left - i.right, b = r * this.data.length, P = b + s.top + w, M = s.left, N = Math.max(c, l), D = this.settings.width - s.left - s.right, F = Math.floor((D - Math.max(f - 1, 0) * u) / f), z = F - c - y);
    let H = 150;
    const L = 15, k = 10;
    let R = m;
    this.settings.showBarLabel ? R = m - H - k : H = 0, e.selectAll("*").remove();
    const C = e.append("g"), g = bh().keys(Array.from(new Set(this.data.flatMap((v) => v.items.map((S) => S.label))))).value((v, S) => {
      var B;
      return ((B = v.items.find((I) => I.label === S)) == null ? void 0 : B.counts) ?? 0;
    })(this.data), _ = lt().domain([0, yn(g, (v) => yn(v, (S) => S[1])) || 0]).range([0, R]), x = Bi().domain(this.data.map((v, S) => S.toString())).range([0, r * this.data.length]).paddingInner(0.1).paddingOuter(0), T = [
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
    ], $ = "#9E9E9E";
    this.settings.maxItems && (T[this.settings.maxItems % (this.data[0].items.length + 1)] = $);
    const A = Te().domain(Array.from(new Set(this.data.flatMap((v) => v.items.map((S) => S.label))))).range(T);
    this.settings.showBarLabel && C.append("g").attr("class", "barLabels").selectAll("text").data(this.data).join("text").attr("x", i.left).attr("y", (v, S) => i.top + (x(S.toString()) || 0) + x.bandwidth() / 2).attr("dy", ".35em").attr("font-family", n).attr("font-size", L).text((v) => {
      if (v.label.length * (L * 0.6) > H) {
        const S = Math.floor(H / (L * 0.6));
        return v.label.substring(0, S - 3) + "...";
      }
      return v.label;
    }), C.append("g").selectAll("g").data(g).join("g").attr("fill", (v) => A(v.key)).attr("data-key", (v) => v.key).selectAll("rect").data((v) => v).join("rect").attr("x", (v) => i.left + H + k + Math.floor(_(v[0]))).attr("y", (v, S) => i.top + (x(S.toString()) || 0)).attr("width", (v) => Math.floor(_(v[1])) - Math.floor(_(v[0]))).attr("height", x.bandwidth()).on("mouseover", (v, S) => {
      const B = V(v.target.parentNode).attr("data-key"), I = S.data.items.find((O) => O.label === B);
      this.tooltipIn(v, I);
    }).on("mousemove", (v, S) => {
      const B = V(v.target.parentNode).attr("data-key"), I = S.data.items.find((O) => O.label === B);
      this.tooltipMove(v, I);
    }).on("mouseout", (v, S) => {
      const B = V(v.target.parentNode).attr("data-key"), I = S.data.items.find((O) => O.label === B);
      this.tooltipOut(v, I);
    }), this.settings.showValuesInBars && C.append("g").selectAll("g").data(g).join("g").selectAll("text").data((v) => v).join("text").attr("x", (v) => {
      const S = Math.floor(_(v[0])), B = Math.floor(_(v[1]));
      return i.left + H + k + S + (B - S) / 2;
    }).attr("y", (v, S) => i.top + (x(S.toString()) || 0) + x.bandwidth() / 2).attr("dy", ".35em").attr("text-anchor", "middle").attr("fill", "white").attr("font-family", n).attr("font-size", this.settings.valuesInBarsFontSize).text((v) => {
      const S = v[1] - v[0];
      return Math.floor(_(v[1])) - Math.floor(_(v[0])) < 30 ? "" : this.settings.displayMode === "relative" ? `${S.toFixed(1)}%` : S;
    }), C.append("g").attr("transform", `translate(${i.left + H + k}, ${i.top + r * this.data.length})`).call(wr(_)).attr("font-size", "12px").append("text").attr("font-family", n).attr("fill", "black").attr("x", R / 2).attr("y", w).attr("text-anchor", "middle").attr("font-size", 14).text(this.settings.displayMode === "relative" ? "Percentage" : "Count");
    const E = C.append("g").attr("font-family", n).attr("font-size", l).selectAll("g").data(A.domain()).join("g").attr("transform", (v, S) => `translate(${S % f * F + Math.max(S % f - 1, 0) * u}, ${Math.floor(S / f) * (N + d) + h + p + P})`);
    C.append("text").attr("font-family", n).attr("font-size", h).attr("dominant-baseline", "hanging").attr("x", M).attr("y", P).text("Legend"), E.append("rect").attr("x", M).attr("width", c).attr("height", c).attr("rx", 5).attr("fill", A), E.append("text").attr("x", M + c + y).attr("y", l / 2).attr("dy", "0.35em").text((v) => {
      if (v.length * (l * 0.6) > z) {
        const S = Math.floor(z / (l * 0.6));
        return v.substring(0, S - 3) + "...";
      }
      return v;
    });
  }
  tooltipIn(e, n) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.html(this.settings.getTooltip(n)).style("top", e.pageY + 10 + "px").style("left", e.pageX + 10 + "px").style("visibility", "visible");
  }
  tooltipMove(e, n) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("top", e.pageY + 10 + "px").style("left", e.pageX + 10 + "px");
  }
  tooltipOut(e, n) {
    this.settings.enableTooltips && this.tooltip && this.tooltip.style("visibility", "hidden");
  }
}
export {
  Gh as Barplot,
  Oh as BarplotChartSettings,
  Bh as BarplotLegendSettings,
  ti as BarplotSettings,
  Vt as ColorPalette,
  ke as ColorUtils,
  oe as DataNode,
  Ph as EuclidianDistanceMetric,
  Vh as Heatmap,
  Gn as HeatmapSettings,
  Nh as MoloReorderer,
  qh as PearsonCorrelationMetric,
  zh as StringUtils,
  Wh as Sunburst,
  Qn as SunburstSettings,
  tn as Transition,
  se as TreeNode,
  Xh as Treemap,
  Jn as TreemapSettings,
  Yh as Treeview,
  jn as TreeviewSettings,
  $h as UPGMAClusterer
};
//# sourceMappingURL=unipept-visualizations.js.map
