function encryptJS(e, t, d) {
  if (128 != d && 192 != d && 256 != d) return "";
  (e = Utf8.encode(e)), (t = Utf8.encode(t));
  for (var n = d / 8, r = new Array(n), o = 0; o < n; o++)
    r[o] = isNaN(t.charCodeAt(o)) ? 0 : t.charCodeAt(o);
  var i = Aes.cipher(r, Aes.keyExpansion(r));
  i = i.concat(i.slice(0, n - 16));
  var a = new Array(16),
    s = new Date().getTime(),
    l = Math.floor(s / 1e3),
    u = s % 1e3;
  for (o = 0; o < 4; o++) a[o] = (l >>> (8 * o)) & 255;
  for (o = 0; o < 4; o++) a[o + 4] = 255 & u;
  var c = "";
  for (o = 0; o < 8; o++) c += String.fromCharCode(a[o]);
  for (
    var f = Aes.keyExpansion(i),
      h = Math.ceil(e.length / 16),
      $ = new Array(h),
      p = 0;
    p < h;
    p++
  ) {
    for (var m = 0; m < 4; m++) a[15 - m] = (p >>> (8 * m)) & 255;
    for (m = 0; m < 4; m++) a[15 - m - 4] = (p / 4294967296) >>> (8 * m);
    var g = Aes.cipher(a, f),
      v = p < h - 1 ? 16 : ((e.length - 1) % 16) + 1,
      y = new Array(v);
    for (o = 0; o < v; o++)
      (y[o] = g[o] ^ e.charCodeAt(16 * p + o)),
        (y[o] = String.fromCharCode(y[o]));
    $[p] = y.join("");
  }
  var C = c + $.join("");
  return Base64.encode(C);
}
!(function (e, t) {
  "use strict";
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = e.document
        ? t(e, !0)
        : function (e) {
            if (!e.document)
              throw new Error("jQuery requires a window with a document");
            return t(e);
          })
    : t(e);
})("undefined" != typeof window ? window : this, function (e, t) {
  "use strict";
  var d = [],
    n = e.document,
    r = Object.getPrototypeOf,
    o = d.slice,
    i = d.concat,
    a = d.push,
    s = d.indexOf,
    l = {},
    u = l.toString,
    c = l.hasOwnProperty,
    f = c.toString,
    h = f.call(Object),
    $ = {},
    p = function (e) {
      return "function" == typeof e && "number" != typeof e.nodeType;
    },
    m = function (e) {
      return null != e && e === e.window;
    },
    g = { type: !0, src: !0, nonce: !0, noModule: !0 };
  function v(e, t, d) {
    var r,
      o,
      i = (d = d || n).createElement("script");
    if (((i.text = e), t))
      for (r in g)
        (o = t[r] || (t.getAttribute && t.getAttribute(r))) &&
          i.setAttribute(r, o);
    d.head.appendChild(i).parentNode.removeChild(i);
  }
  function y(e) {
    return null == e
      ? e + ""
      : "object" == typeof e || "function" == typeof e
      ? l[u.call(e)] || "object"
      : typeof e;
  }
  var C = function (e, t) {
      return new C.fn.init(e, t);
    },
    b = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  function w(e) {
    var t = !!e && "length" in e && e.length,
      d = y(e);
    return (
      !p(e) &&
      !m(e) &&
      ("array" === d ||
        0 === t ||
        ("number" == typeof t && t > 0 && t - 1 in e))
    );
  }
  (C.fn = C.prototype =
    {
      jquery: "3.4.0",
      constructor: C,
      length: 0,
      toArray: function () {
        return o.call(this);
      },
      get: function (e) {
        return null == e
          ? o.call(this)
          : e < 0
          ? this[e + this.length]
          : this[e];
      },
      pushStack: function (e) {
        var t = C.merge(this.constructor(), e);
        return (t.prevObject = this), t;
      },
      each: function (e) {
        return C.each(this, e);
      },
      map: function (e) {
        return this.pushStack(
          C.map(this, function (t, d) {
            return e.call(t, d, t);
          })
        );
      },
      slice: function () {
        return this.pushStack(o.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      eq: function (e) {
        var t = this.length,
          d = +e + (e < 0 ? t : 0);
        return this.pushStack(d >= 0 && d < t ? [this[d]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor();
      },
      push: a,
      sort: d.sort,
      splice: d.splice,
    }),
    (C.extend = C.fn.extend =
      function () {
        var e,
          t,
          d,
          n,
          r,
          o,
          i = arguments[0] || {},
          a = 1,
          s = arguments.length,
          l = !1;
        for (
          "boolean" == typeof i && ((l = i), (i = arguments[a] || {}), a++),
            "object" == typeof i || p(i) || (i = {}),
            a === s && ((i = this), a--);
          a < s;
          a++
        )
          if (null != (e = arguments[a]))
            for (t in e)
              (n = e[t]),
                "__proto__" !== t &&
                  i !== n &&
                  (l && n && (C.isPlainObject(n) || (r = Array.isArray(n)))
                    ? ((d = i[t]),
                      (o =
                        r && !Array.isArray(d)
                          ? []
                          : r || C.isPlainObject(d)
                          ? d
                          : {}),
                      (r = !1),
                      (i[t] = C.extend(l, o, n)))
                    : void 0 !== n && (i[t] = n));
        return i;
      }),
    C.extend({
      expando: "jQuery" + ("3.4.0" + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (e) {
        throw new Error(e);
      },
      noop: function () {},
      isPlainObject: function (e) {
        var t, d;
        return !(
          !e ||
          "[object Object]" !== u.call(e) ||
          ((t = r(e)) &&
            ("function" !=
              typeof (d = c.call(t, "constructor") && t.constructor) ||
              f.call(d) !== h))
        );
      },
      isEmptyObject: function (e) {
        var t;
        for (t in e) return !1;
        return !0;
      },
      globalEval: function (e, t) {
        v(e, { nonce: t && t.nonce });
      },
      each: function (e, t) {
        var d,
          n = 0;
        if (w(e))
          for (d = e.length; n < d && !1 !== t.call(e[n], n, e[n]); n++);
        else for (n in e) if (!1 === t.call(e[n], n, e[n])) break;
        return e;
      },
      trim: function (e) {
        return null == e ? "" : (e + "").replace(b, "");
      },
      makeArray: function (e, t) {
        var d = t || [];
        return (
          null != e &&
            (w(Object(e))
              ? C.merge(d, "string" == typeof e ? [e] : e)
              : a.call(d, e)),
          d
        );
      },
      inArray: function (e, t, d) {
        return null == t ? -1 : s.call(t, e, d);
      },
      merge: function (e, t) {
        for (var d = +t.length, n = 0, r = e.length; n < d; n++) e[r++] = t[n];
        return (e.length = r), e;
      },
      grep: function (e, t, d) {
        for (var n = [], r = 0, o = e.length, i = !d; r < o; r++)
          !t(e[r], r) !== i && n.push(e[r]);
        return n;
      },
      map: function (e, t, d) {
        var n,
          r,
          o = 0,
          a = [];
        if (w(e))
          for (n = e.length; o < n; o++)
            null != (r = t(e[o], o, d)) && a.push(r);
        else for (o in e) null != (r = t(e[o], o, d)) && a.push(r);
        return i.apply([], a);
      },
      guid: 1,
      support: $,
    }),
    "function" == typeof Symbol && (C.fn[Symbol.iterator] = d[Symbol.iterator]),
    C.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
        " "
      ),
      function (e, t) {
        l["[object " + t + "]"] = t.toLowerCase();
      }
    );
  var k = (function (e) {
    var t,
      d,
      n,
      r,
      o,
      i,
      a,
      s,
      l,
      u,
      c,
      f,
      h,
      $,
      p,
      m,
      g,
      v,
      y,
      C = "sizzle" + 1 * new Date(),
      b = e.document,
      w = 0,
      k = 0,
      B = se(),
      x = se(),
      P = se(),
      S = se(),
      A = function (e, t) {
        return e === t && (c = !0), 0;
      },
      L = {}.hasOwnProperty,
      T = [],
      M = T.pop,
      I = T.push,
      E = T.push,
      N = T.slice,
      _ = function (e, t) {
        for (var d = 0, n = e.length; d < n; d++) if (e[d] === t) return d;
        return -1;
      },
      D =
        "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      O = "[\\x20\\t\\r\\n\\f]",
      R = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
      F =
        "\\[" +
        O +
        "*(" +
        R +
        ")(?:" +
        O +
        "*([*^$|!~]?=)" +
        O +
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
        R +
        "))|)" +
        O +
        "*\\]",
      j =
        ":(" +
        R +
        ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
        F +
        ")*)|.*)\\)|)",
      G = new RegExp(O + "+", "g"),
      U = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"),
      H = new RegExp("^" + O + "*," + O + "*"),
      z = new RegExp("^" + O + "*([>+~]|" + O + ")" + O + "*"),
      W = new RegExp(O + "|>"),
      K = new RegExp(j),
      q = new RegExp("^" + R + "$"),
      V = {
        ID: new RegExp("^#(" + R + ")"),
        CLASS: new RegExp("^\\.(" + R + ")"),
        TAG: new RegExp("^(" + R + "|[*])"),
        ATTR: new RegExp("^" + F),
        PSEUDO: new RegExp("^" + j),
        CHILD: new RegExp(
          "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
            O +
            "*(even|odd|(([+-]|)(\\d*)n|)" +
            O +
            "*(?:([+-]|)" +
            O +
            "*(\\d+)|))" +
            O +
            "*\\)|)",
          "i"
        ),
        bool: new RegExp("^(?:" + D + ")$", "i"),
        needsContext: new RegExp(
          "^" +
            O +
            "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
            O +
            "*((?:-\\d)?\\d*)" +
            O +
            "*\\)|)(?=[^-]|$)",
          "i"
        ),
      },
      X = /HTML$/i,
      Z = /^(?:input|select|textarea|button)$/i,
      J = /^h\d$/i,
      Y = /^[^{]+\{\s*\[native \w/,
      Q = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      ee = /[+~]/,
      te = new RegExp("\\\\([\\da-f]{1,6}" + O + "?|(" + O + ")|.)", "ig"),
      de = function (e, t, d) {
        var n = "0x" + t - 65536;
        return n != n || d
          ? t
          : n < 0
          ? String.fromCharCode(n + 65536)
          : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320);
      },
      ne = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
      re = function (e, t) {
        return t
          ? "\0" === e
            ? "\ufffd"
            : e.slice(0, -1) +
              "\\" +
              e.charCodeAt(e.length - 1).toString(16) +
              " "
          : "\\" + e;
      },
      oe = function () {
        f();
      },
      ie = Ce(
        function (e) {
          return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
        },
        { dir: "parentNode", next: "legend" }
      );
    try {
      E.apply((T = N.call(b.childNodes)), b.childNodes);
    } catch (e) {
      E = {
        apply: T.length
          ? function (e, t) {
              I.apply(e, N.call(t));
            }
          : function (e, t) {
              for (var d = e.length, n = 0; (e[d++] = t[n++]); );
              e.length = d - 1;
            },
      };
    }
    function ae(e, t, n, r) {
      var o,
        a,
        l,
        u,
        c,
        $,
        g,
        v = t && t.ownerDocument,
        w = t ? t.nodeType : 9;
      if (
        ((n = n || []),
        "string" != typeof e || !e || (1 !== w && 9 !== w && 11 !== w))
      )
        return n;
      if (
        !r &&
        ((t ? t.ownerDocument || t : b) !== h && f(t), (t = t || h), p)
      ) {
        if (11 !== w && (c = Q.exec(e)))
          if ((o = c[1])) {
            if (9 === w) {
              if (!(l = t.getElementById(o))) return n;
              if (l.id === o) return n.push(l), n;
            } else if (v && (l = v.getElementById(o)) && y(t, l) && l.id === o)
              return n.push(l), n;
          } else {
            if (c[2]) return E.apply(n, t.getElementsByTagName(e)), n;
            if (
              (o = c[3]) &&
              d.getElementsByClassName &&
              t.getElementsByClassName
            )
              return E.apply(n, t.getElementsByClassName(o)), n;
          }
        if (
          d.qsa &&
          !S[e + " "] &&
          (!m || !m.test(e)) &&
          (1 !== w || "object" !== t.nodeName.toLowerCase())
        ) {
          if (((g = e), (v = t), 1 === w && W.test(e))) {
            for (
              (u = t.getAttribute("id"))
                ? (u = u.replace(ne, re))
                : t.setAttribute("id", (u = C)),
                a = ($ = i(e)).length;
              a--;

            )
              $[a] = "#" + u + " " + ye($[a]);
            (g = $.join(",")), (v = (ee.test(e) && ge(t.parentNode)) || t);
          }
          try {
            return E.apply(n, v.querySelectorAll(g)), n;
          } catch (t) {
            S(e, !0);
          } finally {
            u === C && t.removeAttribute("id");
          }
        }
      }
      return s(e.replace(U, "$1"), t, n, r);
    }
    function se() {
      var e = [];
      return function t(d, r) {
        return (
          e.push(d + " ") > n.cacheLength && delete t[e.shift()],
          (t[d + " "] = r)
        );
      };
    }
    function le(e) {
      return (e[C] = !0), e;
    }
    function ue(e) {
      var t = h.createElement("fieldset");
      try {
        return !!e(t);
      } catch (e) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), (t = null);
      }
    }
    function ce(e, t) {
      for (var d = e.split("|"), r = d.length; r--; ) n.attrHandle[d[r]] = t;
    }
    function fe(e, t) {
      var d = t && e,
        n =
          d &&
          1 === e.nodeType &&
          1 === t.nodeType &&
          e.sourceIndex - t.sourceIndex;
      if (n) return n;
      if (d) for (; (d = d.nextSibling); ) if (d === t) return -1;
      return e ? 1 : -1;
    }
    function he(e) {
      return function (t) {
        return "input" === t.nodeName.toLowerCase() && t.type === e;
      };
    }
    function $e(e) {
      return function (t) {
        var d = t.nodeName.toLowerCase();
        return ("input" === d || "button" === d) && t.type === e;
      };
    }
    function pe(e) {
      return function (t) {
        return "form" in t
          ? t.parentNode && !1 === t.disabled
            ? "label" in t
              ? "label" in t.parentNode
                ? t.parentNode.disabled === e
                : t.disabled === e
              : t.isDisabled === e || (t.isDisabled !== !e && ie(t) === e)
            : t.disabled === e
          : "label" in t && t.disabled === e;
      };
    }
    function me(e) {
      return le(function (t) {
        return (
          (t = +t),
          le(function (d, n) {
            for (var r, o = e([], d.length, t), i = o.length; i--; )
              d[(r = o[i])] && (d[r] = !(n[r] = d[r]));
          })
        );
      });
    }
    function ge(e) {
      return e && void 0 !== e.getElementsByTagName && e;
    }
    for (t in ((d = ae.support = {}),
    (o = ae.isXML =
      function (e) {
        var t = (e.ownerDocument || e).documentElement;
        return !X.test(e.namespaceURI || (t && t.nodeName) || "HTML");
      }),
    (f = ae.setDocument =
      function (e) {
        var t,
          r,
          i = e ? e.ownerDocument || e : b;
        return i !== h && 9 === i.nodeType && i.documentElement
          ? (($ = (h = i).documentElement),
            (p = !o(h)),
            b !== h &&
              (r = h.defaultView) &&
              r.top !== r &&
              (r.addEventListener
                ? r.addEventListener("unload", oe, !1)
                : r.attachEvent && r.attachEvent("onunload", oe)),
            (d.attributes = ue(function (e) {
              return (e.className = "i"), !e.getAttribute("className");
            })),
            (d.getElementsByTagName = ue(function (e) {
              return (
                e.appendChild(h.createComment("")),
                !e.getElementsByTagName("*").length
              );
            })),
            (d.getElementsByClassName = Y.test(h.getElementsByClassName)),
            (d.getById = ue(function (e) {
              return (
                ($.appendChild(e).id = C),
                !h.getElementsByName || !h.getElementsByName(C).length
              );
            })),
            d.getById
              ? ((n.filter.ID = function (e) {
                  var t = e.replace(te, de);
                  return function (e) {
                    return e.getAttribute("id") === t;
                  };
                }),
                (n.find.ID = function (e, t) {
                  if (void 0 !== t.getElementById && p) {
                    var d = t.getElementById(e);
                    return d ? [d] : [];
                  }
                }))
              : ((n.filter.ID = function (e) {
                  var t = e.replace(te, de);
                  return function (e) {
                    var d =
                      void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                    return d && d.value === t;
                  };
                }),
                (n.find.ID = function (e, t) {
                  if (void 0 !== t.getElementById && p) {
                    var d,
                      n,
                      r,
                      o = t.getElementById(e);
                    if (o) {
                      if ((d = o.getAttributeNode("id")) && d.value === e)
                        return [o];
                      for (r = t.getElementsByName(e), n = 0; (o = r[n++]); )
                        if ((d = o.getAttributeNode("id")) && d.value === e)
                          return [o];
                    }
                    return [];
                  }
                })),
            (n.find.TAG = d.getElementsByTagName
              ? function (e, t) {
                  return void 0 !== t.getElementsByTagName
                    ? t.getElementsByTagName(e)
                    : d.qsa
                    ? t.querySelectorAll(e)
                    : void 0;
                }
              : function (e, t) {
                  var d,
                    n = [],
                    r = 0,
                    o = t.getElementsByTagName(e);
                  if ("*" === e) {
                    for (; (d = o[r++]); ) 1 === d.nodeType && n.push(d);
                    return n;
                  }
                  return o;
                }),
            (n.find.CLASS =
              d.getElementsByClassName &&
              function (e, t) {
                if (void 0 !== t.getElementsByClassName && p)
                  return t.getElementsByClassName(e);
              }),
            (g = []),
            (m = []),
            (d.qsa = Y.test(h.querySelectorAll)) &&
              (ue(function (e) {
                ($.appendChild(e).innerHTML =
                  "<a id='" +
                  C +
                  "'></a><select id='" +
                  C +
                  "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                  e.querySelectorAll("[msallowcapture^='']").length &&
                    m.push("[*^$]=" + O + "*(?:''|\"\")"),
                  e.querySelectorAll("[selected]").length ||
                    m.push("\\[" + O + "*(?:value|" + D + ")"),
                  e.querySelectorAll("[id~=" + C + "-]").length || m.push("~="),
                  e.querySelectorAll(":checked").length || m.push(":checked"),
                  e.querySelectorAll("a#" + C + "+*").length ||
                    m.push(".#.+[+~]");
              }),
              ue(function (e) {
                e.innerHTML =
                  "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = h.createElement("input");
                t.setAttribute("type", "hidden"),
                  e.appendChild(t).setAttribute("name", "D"),
                  e.querySelectorAll("[name=d]").length &&
                    m.push("name" + O + "*[*^$|!~]?="),
                  2 !== e.querySelectorAll(":enabled").length &&
                    m.push(":enabled", ":disabled"),
                  ($.appendChild(e).disabled = !0),
                  2 !== e.querySelectorAll(":disabled").length &&
                    m.push(":enabled", ":disabled"),
                  e.querySelectorAll("*,:x"),
                  m.push(",.*:");
              })),
            (d.matchesSelector = Y.test(
              (v =
                $.matches ||
                $.webkitMatchesSelector ||
                $.mozMatchesSelector ||
                $.oMatchesSelector ||
                $.msMatchesSelector)
            )) &&
              ue(function (e) {
                (d.disconnectedMatch = v.call(e, "*")),
                  v.call(e, "[s!='']:x"),
                  g.push("!=", j);
              }),
            (m = m.length && new RegExp(m.join("|"))),
            (g = g.length && new RegExp(g.join("|"))),
            (t = Y.test($.compareDocumentPosition)),
            (y =
              t || Y.test($.contains)
                ? function (e, t) {
                    var d = 9 === e.nodeType ? e.documentElement : e,
                      n = t && t.parentNode;
                    return (
                      e === n ||
                      !(
                        !n ||
                        1 !== n.nodeType ||
                        !(d.contains
                          ? d.contains(n)
                          : e.compareDocumentPosition &&
                            16 & e.compareDocumentPosition(n))
                      )
                    );
                  }
                : function (e, t) {
                    if (t) for (; (t = t.parentNode); ) if (t === e) return !0;
                    return !1;
                  }),
            (A = t
              ? function (e, t) {
                  if (e === t) return (c = !0), 0;
                  var n =
                    !e.compareDocumentPosition - !t.compareDocumentPosition;
                  return (
                    n ||
                    (1 &
                      (n =
                        (e.ownerDocument || e) === (t.ownerDocument || t)
                          ? e.compareDocumentPosition(t)
                          : 1) ||
                    (!d.sortDetached && t.compareDocumentPosition(e) === n)
                      ? e === h || (e.ownerDocument === b && y(b, e))
                        ? -1
                        : t === h || (t.ownerDocument === b && y(b, t))
                        ? 1
                        : u
                        ? _(u, e) - _(u, t)
                        : 0
                      : 4 & n
                      ? -1
                      : 1)
                  );
                }
              : function (e, t) {
                  if (e === t) return (c = !0), 0;
                  var d,
                    n = 0,
                    r = e.parentNode,
                    o = t.parentNode,
                    i = [e],
                    a = [t];
                  if (!r || !o)
                    return e === h
                      ? -1
                      : t === h
                      ? 1
                      : r
                      ? -1
                      : o
                      ? 1
                      : u
                      ? _(u, e) - _(u, t)
                      : 0;
                  if (r === o) return fe(e, t);
                  for (d = e; (d = d.parentNode); ) i.unshift(d);
                  for (d = t; (d = d.parentNode); ) a.unshift(d);
                  for (; i[n] === a[n]; ) n++;
                  return n
                    ? fe(i[n], a[n])
                    : i[n] === b
                    ? -1
                    : a[n] === b
                    ? 1
                    : 0;
                }),
            h)
          : h;
      }),
    (ae.matches = function (e, t) {
      return ae(e, null, null, t);
    }),
    (ae.matchesSelector = function (e, t) {
      if (
        ((e.ownerDocument || e) !== h && f(e),
        d.matchesSelector &&
          p &&
          !S[t + " "] &&
          (!g || !g.test(t)) &&
          (!m || !m.test(t)))
      )
        try {
          var n = v.call(e, t);
          if (
            n ||
            d.disconnectedMatch ||
            (e.document && 11 !== e.document.nodeType)
          )
            return n;
        } catch (e) {
          S(t, !0);
        }
      return ae(t, h, null, [e]).length > 0;
    }),
    (ae.contains = function (e, t) {
      return (e.ownerDocument || e) !== h && f(e), y(e, t);
    }),
    (ae.attr = function (e, t) {
      (e.ownerDocument || e) !== h && f(e);
      var r = n.attrHandle[t.toLowerCase()],
        o = r && L.call(n.attrHandle, t.toLowerCase()) ? r(e, t, !p) : void 0;
      return void 0 !== o
        ? o
        : d.attributes || !p
        ? e.getAttribute(t)
        : (o = e.getAttributeNode(t)) && o.specified
        ? o.value
        : null;
    }),
    (ae.escape = function (e) {
      return (e + "").replace(ne, re);
    }),
    (ae.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e);
    }),
    (ae.uniqueSort = function (e) {
      var t,
        n = [],
        r = 0,
        o = 0;
      if (
        ((c = !d.detectDuplicates),
        (u = !d.sortStable && e.slice(0)),
        e.sort(A),
        c)
      ) {
        for (; (t = e[o++]); ) t === e[o] && (r = n.push(o));
        for (; r--; ) e.splice(n[r], 1);
      }
      return (u = null), e;
    }),
    (r = ae.getText =
      function (e) {
        var t,
          d = "",
          n = 0,
          o = e.nodeType;
        if (o) {
          if (1 === o || 9 === o || 11 === o) {
            if ("string" == typeof e.textContent) return e.textContent;
            for (e = e.firstChild; e; e = e.nextSibling) d += r(e);
          } else if (3 === o || 4 === o) return e.nodeValue;
        } else for (; (t = e[n++]); ) d += r(t);
        return d;
      }),
    ((n = ae.selectors =
      {
        cacheLength: 50,
        createPseudo: le,
        match: V,
        attrHandle: {},
        find: {},
        relative: {
          ">": { dir: "parentNode", first: !0 },
          " ": { dir: "parentNode" },
          "+": { dir: "previousSibling", first: !0 },
          "~": { dir: "previousSibling" },
        },
        preFilter: {
          ATTR: function (e) {
            return (
              (e[1] = e[1].replace(te, de)),
              (e[3] = (e[3] || e[4] || e[5] || "").replace(te, de)),
              "~=" === e[2] && (e[3] = " " + e[3] + " "),
              e.slice(0, 4)
            );
          },
          CHILD: function (e) {
            return (
              (e[1] = e[1].toLowerCase()),
              "nth" === e[1].slice(0, 3)
                ? (e[3] || ae.error(e[0]),
                  (e[4] = +(e[4]
                    ? e[5] + (e[6] || 1)
                    : 2 * ("even" === e[3] || "odd" === e[3]))),
                  (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                : e[3] && ae.error(e[0]),
              e
            );
          },
          PSEUDO: function (e) {
            var t,
              d = !e[6] && e[2];
            return V.CHILD.test(e[0])
              ? null
              : (e[3]
                  ? (e[2] = e[4] || e[5] || "")
                  : d &&
                    K.test(d) &&
                    (t = i(d, !0)) &&
                    (t = d.indexOf(")", d.length - t) - d.length) &&
                    ((e[0] = e[0].slice(0, t)), (e[2] = d.slice(0, t))),
                e.slice(0, 3));
          },
        },
        filter: {
          TAG: function (e) {
            var t = e.replace(te, de).toLowerCase();
            return "*" === e
              ? function () {
                  return !0;
                }
              : function (e) {
                  return e.nodeName && e.nodeName.toLowerCase() === t;
                };
          },
          CLASS: function (e) {
            var t = B[e + " "];
            return (
              t ||
              ((t = new RegExp("(^|" + O + ")" + e + "(" + O + "|$)")) &&
                B(e, function (e) {
                  return t.test(
                    ("string" == typeof e.className && e.className) ||
                      (void 0 !== e.getAttribute && e.getAttribute("class")) ||
                      ""
                  );
                }))
            );
          },
          ATTR: function (e, t, d) {
            return function (n) {
              var r = ae.attr(n, e);
              return null == r
                ? "!=" === t
                : !t ||
                    ((r += ""),
                    "=" === t
                      ? r === d
                      : "!=" === t
                      ? r !== d
                      : "^=" === t
                      ? d && 0 === r.indexOf(d)
                      : "*=" === t
                      ? d && r.indexOf(d) > -1
                      : "$=" === t
                      ? d && r.slice(-d.length) === d
                      : "~=" === t
                      ? (" " + r.replace(G, " ") + " ").indexOf(d) > -1
                      : "|=" === t &&
                        (r === d || r.slice(0, d.length + 1) === d + "-"));
            };
          },
          CHILD: function (e, t, d, n, r) {
            var o = "nth" !== e.slice(0, 3),
              i = "last" !== e.slice(-4),
              a = "of-type" === t;
            return 1 === n && 0 === r
              ? function (e) {
                  return !!e.parentNode;
                }
              : function (t, d, s) {
                  var l,
                    u,
                    c,
                    f,
                    h,
                    $,
                    p = o !== i ? "nextSibling" : "previousSibling",
                    m = t.parentNode,
                    g = a && t.nodeName.toLowerCase(),
                    v = !s && !a,
                    y = !1;
                  if (m) {
                    if (o) {
                      for (; p; ) {
                        for (f = t; (f = f[p]); )
                          if (
                            a
                              ? f.nodeName.toLowerCase() === g
                              : 1 === f.nodeType
                          )
                            return !1;
                        $ = p = "only" === e && !$ && "nextSibling";
                      }
                      return !0;
                    }
                    if ((($ = [i ? m.firstChild : m.lastChild]), i && v)) {
                      for (
                        y =
                          (h =
                            (l =
                              (u =
                                (c = (f = m)[C] || (f[C] = {}))[f.uniqueID] ||
                                (c[f.uniqueID] = {}))[e] || [])[0] === w &&
                            l[1]) && l[2],
                          f = h && m.childNodes[h];
                        (f = (++h && f && f[p]) || (y = h = 0) || $.pop());

                      )
                        if (1 === f.nodeType && ++y && f === t) {
                          u[e] = [w, h, y];
                          break;
                        }
                    } else if (
                      (v &&
                        (y = h =
                          (l =
                            (u =
                              (c = (f = t)[C] || (f[C] = {}))[f.uniqueID] ||
                              (c[f.uniqueID] = {}))[e] || [])[0] === w && l[1]),
                      !1 === y)
                    )
                      for (
                        ;
                        (f = (++h && f && f[p]) || (y = h = 0) || $.pop()) &&
                        ((a
                          ? f.nodeName.toLowerCase() !== g
                          : 1 !== f.nodeType) ||
                          !++y ||
                          (v &&
                            ((u =
                              (c = f[C] || (f[C] = {}))[f.uniqueID] ||
                              (c[f.uniqueID] = {}))[e] = [w, y]),
                          f !== t));

                      );
                    return (y -= r) === n || (y % n == 0 && y / n >= 0);
                  }
                };
          },
          PSEUDO: function (e, t) {
            var d,
              r =
                n.pseudos[e] ||
                n.setFilters[e.toLowerCase()] ||
                ae.error("unsupported pseudo: " + e);
            return r[C]
              ? r(t)
              : r.length > 1
              ? ((d = [e, e, "", t]),
                n.setFilters.hasOwnProperty(e.toLowerCase())
                  ? le(function (e, d) {
                      for (var n, o = r(e, t), i = o.length; i--; )
                        e[(n = _(e, o[i]))] = !(d[n] = o[i]);
                    })
                  : function (e) {
                      return r(e, 0, d);
                    })
              : r;
          },
        },
        pseudos: {
          not: le(function (e) {
            var t = [],
              d = [],
              n = a(e.replace(U, "$1"));
            return n[C]
              ? le(function (e, t, d, r) {
                  for (var o, i = n(e, null, r, []), a = e.length; a--; )
                    (o = i[a]) && (e[a] = !(t[a] = o));
                })
              : function (e, r, o) {
                  return (t[0] = e), n(t, null, o, d), (t[0] = null), !d.pop();
                };
          }),
          has: le(function (e) {
            return function (t) {
              return ae(e, t).length > 0;
            };
          }),
          contains: le(function (e) {
            return (
              (e = e.replace(te, de)),
              function (t) {
                return (t.textContent || r(t)).indexOf(e) > -1;
              }
            );
          }),
          lang: le(function (e) {
            return (
              q.test(e || "") || ae.error("unsupported lang: " + e),
              (e = e.replace(te, de).toLowerCase()),
              function (t) {
                var d;
                do {
                  if (
                    (d = p
                      ? t.lang
                      : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                  )
                    return (
                      (d = d.toLowerCase()) === e || 0 === d.indexOf(e + "-")
                    );
                } while ((t = t.parentNode) && 1 === t.nodeType);
                return !1;
              }
            );
          }),
          target: function (t) {
            var d = e.location && e.location.hash;
            return d && d.slice(1) === t.id;
          },
          root: function (e) {
            return e === $;
          },
          focus: function (e) {
            return (
              e === h.activeElement &&
              (!h.hasFocus || h.hasFocus()) &&
              !!(e.type || e.href || ~e.tabIndex)
            );
          },
          enabled: pe(!1),
          disabled: pe(!0),
          checked: function (e) {
            var t = e.nodeName.toLowerCase();
            return (
              ("input" === t && !!e.checked) || ("option" === t && !!e.selected)
            );
          },
          selected: function (e) {
            return !0 === e.selected;
          },
          empty: function (e) {
            for (e = e.firstChild; e; e = e.nextSibling)
              if (e.nodeType < 6) return !1;
            return !0;
          },
          parent: function (e) {
            return !n.pseudos.empty(e);
          },
          header: function (e) {
            return J.test(e.nodeName);
          },
          input: function (e) {
            return Z.test(e.nodeName);
          },
          button: function (e) {
            var t = e.nodeName.toLowerCase();
            return ("input" === t && "button" === e.type) || "button" === t;
          },
          text: function (e) {
            var t;
            return (
              "input" === e.nodeName.toLowerCase() &&
              "text" === e.type &&
              (null == (t = e.getAttribute("type")) ||
                "text" === t.toLowerCase())
            );
          },
          first: me(function () {
            return [0];
          }),
          last: me(function (e, t) {
            return [t - 1];
          }),
          eq: me(function (e, t, d) {
            return [d < 0 ? d + t : d];
          }),
          even: me(function (e, t) {
            for (var d = 0; d < t; d += 2) e.push(d);
            return e;
          }),
          odd: me(function (e, t) {
            for (var d = 1; d < t; d += 2) e.push(d);
            return e;
          }),
          lt: me(function (e, t, d) {
            for (var n = d < 0 ? d + t : d > t ? t : d; --n >= 0; ) e.push(n);
            return e;
          }),
          gt: me(function (e, t, d) {
            for (var n = d < 0 ? d + t : d; ++n < t; ) e.push(n);
            return e;
          }),
        },
      }).pseudos.nth = n.pseudos.eq),
    { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
      n.pseudos[t] = he(t);
    for (t in { submit: !0, reset: !0 }) n.pseudos[t] = $e(t);
    function ve() {}
    function ye(e) {
      for (var t = 0, d = e.length, n = ""; t < d; t++) n += e[t].value;
      return n;
    }
    function Ce(e, t, d) {
      var n = t.dir,
        r = t.next,
        o = r || n,
        i = d && "parentNode" === o,
        a = k++;
      return t.first
        ? function (t, d, r) {
            for (; (t = t[n]); ) if (1 === t.nodeType || i) return e(t, d, r);
            return !1;
          }
        : function (t, d, s) {
            var l,
              u,
              c,
              f = [w, a];
            if (s) {
              for (; (t = t[n]); )
                if ((1 === t.nodeType || i) && e(t, d, s)) return !0;
            } else
              for (; (t = t[n]); )
                if (1 === t.nodeType || i)
                  if (
                    ((u =
                      (c = t[C] || (t[C] = {}))[t.uniqueID] ||
                      (c[t.uniqueID] = {})),
                    r && r === t.nodeName.toLowerCase())
                  )
                    t = t[n] || t;
                  else {
                    if ((l = u[o]) && l[0] === w && l[1] === a)
                      return (f[2] = l[2]);
                    if (((u[o] = f), (f[2] = e(t, d, s)))) return !0;
                  }
            return !1;
          };
    }
    function be(e) {
      return e.length > 1
        ? function (t, d, n) {
            for (var r = e.length; r--; ) if (!e[r](t, d, n)) return !1;
            return !0;
          }
        : e[0];
    }
    function we(e, t, d, n, r) {
      for (var o, i = [], a = 0, s = e.length, l = null != t; a < s; a++)
        (o = e[a]) && ((d && !d(o, n, r)) || (i.push(o), l && t.push(a)));
      return i;
    }
    function ke(e, t, d, n, r, o) {
      return (
        n && !n[C] && (n = ke(n)),
        r && !r[C] && (r = ke(r, o)),
        le(function (o, i, a, s) {
          var l,
            u,
            c,
            f = [],
            h = [],
            $ = i.length,
            p =
              o ||
              (function (e, t, d) {
                for (var n = 0, r = t.length; n < r; n++) ae(e, t[n], d);
                return d;
              })(t || "*", a.nodeType ? [a] : a, []),
            m = !e || (!o && t) ? p : we(p, f, e, a, s),
            g = d ? (r || (o ? e : $ || n) ? [] : i) : m;
          if ((d && d(m, g, a, s), n))
            for (l = we(g, h), n(l, [], a, s), u = l.length; u--; )
              (c = l[u]) && (g[h[u]] = !(m[h[u]] = c));
          if (o) {
            if (r || e) {
              if (r) {
                for (l = [], u = g.length; u--; )
                  (c = g[u]) && l.push((m[u] = c));
                r(null, (g = []), l, s);
              }
              for (u = g.length; u--; )
                (c = g[u]) &&
                  (l = r ? _(o, c) : f[u]) > -1 &&
                  (o[l] = !(i[l] = c));
            }
          } else (g = we(g === i ? g.splice($, g.length) : g)), r ? r(null, i, g, s) : E.apply(i, g);
        })
      );
    }
    function Be(e) {
      for (
        var t,
          d,
          r,
          o = e.length,
          i = n.relative[e[0].type],
          a = i || n.relative[" "],
          s = i ? 1 : 0,
          u = Ce(
            function (e) {
              return e === t;
            },
            a,
            !0
          ),
          c = Ce(
            function (e) {
              return _(t, e) > -1;
            },
            a,
            !0
          ),
          f = [
            function (e, d, n) {
              var r =
                (!i && (n || d !== l)) ||
                ((t = d).nodeType ? u(e, d, n) : c(e, d, n));
              return (t = null), r;
            },
          ];
        s < o;
        s++
      )
        if ((d = n.relative[e[s].type])) f = [Ce(be(f), d)];
        else {
          if ((d = n.filter[e[s].type].apply(null, e[s].matches))[C]) {
            for (r = ++s; r < o && !n.relative[e[r].type]; r++);
            return ke(
              s > 1 && be(f),
              s > 1 &&
                ye(
                  e
                    .slice(0, s - 1)
                    .concat({ value: " " === e[s - 2].type ? "*" : "" })
                ).replace(U, "$1"),
              d,
              s < r && Be(e.slice(s, r)),
              r < o && Be((e = e.slice(r))),
              r < o && ye(e)
            );
          }
          f.push(d);
        }
      return be(f);
    }
    return (
      (ve.prototype = n.filters = n.pseudos),
      (n.setFilters = new ve()),
      (i = ae.tokenize =
        function (e, t) {
          var d,
            r,
            o,
            i,
            a,
            s,
            l,
            u = x[e + " "];
          if (u) return t ? 0 : u.slice(0);
          for (a = e, s = [], l = n.preFilter; a; ) {
            for (i in ((d && !(r = H.exec(a))) ||
              (r && (a = a.slice(r[0].length) || a), s.push((o = []))),
            (d = !1),
            (r = z.exec(a)) &&
              ((d = r.shift()),
              o.push({ value: d, type: r[0].replace(U, " ") }),
              (a = a.slice(d.length))),
            n.filter))
              !(r = V[i].exec(a)) ||
                (l[i] && !(r = l[i](r))) ||
                ((d = r.shift()),
                o.push({ value: d, type: i, matches: r }),
                (a = a.slice(d.length)));
            if (!d) break;
          }
          return t ? a.length : a ? ae.error(e) : x(e, s).slice(0);
        }),
      (a = ae.compile =
        function (e, t) {
          var d,
            r = [],
            o = [],
            a = P[e + " "];
          if (!a) {
            for (t || (t = i(e)), d = t.length; d--; )
              (a = Be(t[d]))[C] ? r.push(a) : o.push(a);
            (a = P(
              e,
              (function (e, t) {
                var d = t.length > 0,
                  r = e.length > 0,
                  o = function (o, i, a, s, u) {
                    var c,
                      $,
                      m,
                      g = 0,
                      v = "0",
                      y = o && [],
                      C = [],
                      b = l,
                      k = o || (r && n.find.TAG("*", u)),
                      B = (w += null == b ? 1 : Math.random() || 0.1),
                      x = k.length;
                    for (
                      u && (l = i === h || i || u);
                      v !== x && null != (c = k[v]);
                      v++
                    ) {
                      if (r && c) {
                        for (
                          $ = 0, i || c.ownerDocument === h || (f(c), (a = !p));
                          (m = e[$++]);

                        )
                          if (m(c, i || h, a)) {
                            s.push(c);
                            break;
                          }
                        u && (w = B);
                      }
                      d && ((c = !m && c) && g--, o && y.push(c));
                    }
                    if (((g += v), d && v !== g)) {
                      for ($ = 0; (m = t[$++]); ) m(y, C, i, a);
                      if (o) {
                        if (g > 0)
                          for (; v--; ) y[v] || C[v] || (C[v] = M.call(s));
                        C = we(C);
                      }
                      E.apply(s, C),
                        u &&
                          !o &&
                          C.length > 0 &&
                          g + t.length > 1 &&
                          ae.uniqueSort(s);
                    }
                    return u && ((w = B), (l = b)), y;
                  };
                return d ? le(o) : o;
              })(o, r)
            )).selector = e;
          }
          return a;
        }),
      (s = ae.select =
        function (e, t, d, r) {
          var o,
            s,
            l,
            u,
            c,
            f = "function" == typeof e && e,
            h = !r && i((e = f.selector || e));
          if (((d = d || []), 1 === h.length)) {
            if (
              (s = h[0] = h[0].slice(0)).length > 2 &&
              "ID" === (l = s[0]).type &&
              9 === t.nodeType &&
              p &&
              n.relative[s[1].type]
            ) {
              if (!(t = (n.find.ID(l.matches[0].replace(te, de), t) || [])[0]))
                return d;
              f && (t = t.parentNode), (e = e.slice(s.shift().value.length));
            }
            for (
              o = V.needsContext.test(e) ? 0 : s.length;
              o-- && !n.relative[(u = (l = s[o]).type)];

            )
              if (
                (c = n.find[u]) &&
                (r = c(
                  l.matches[0].replace(te, de),
                  (ee.test(s[0].type) && ge(t.parentNode)) || t
                ))
              ) {
                if ((s.splice(o, 1), !(e = r.length && ye(s))))
                  return E.apply(d, r), d;
                break;
              }
          }
          return (
            (f || a(e, h))(
              r,
              t,
              !p,
              d,
              !t || (ee.test(e) && ge(t.parentNode)) || t
            ),
            d
          );
        }),
      (d.sortStable = C.split("").sort(A).join("") === C),
      (d.detectDuplicates = !!c),
      f(),
      (d.sortDetached = ue(function (e) {
        return 1 & e.compareDocumentPosition(h.createElement("fieldset"));
      })),
      ue(function (e) {
        return (
          (e.innerHTML = "<a href='#'></a>"),
          "#" === e.firstChild.getAttribute("href")
        );
      }) ||
        ce("type|href|height|width", function (e, t, d) {
          if (!d) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
        }),
      (d.attributes &&
        ue(function (e) {
          return (
            (e.innerHTML = "<input/>"),
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
          );
        })) ||
        ce("value", function (e, t, d) {
          if (!d && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
        }),
      ue(function (e) {
        return null == e.getAttribute("disabled");
      }) ||
        ce(D, function (e, t, d) {
          var n;
          if (!d)
            return !0 === e[t]
              ? t.toLowerCase()
              : (n = e.getAttributeNode(t)) && n.specified
              ? n.value
              : null;
        }),
      ae
    );
  })(e);
  (C.find = k),
    (C.expr = k.selectors),
    (C.expr[":"] = C.expr.pseudos),
    (C.uniqueSort = C.unique = k.uniqueSort),
    (C.text = k.getText),
    (C.isXMLDoc = k.isXML),
    (C.contains = k.contains),
    (C.escapeSelector = k.escape);
  var B = function (e, t, d) {
      for (var n = [], r = void 0 !== d; (e = e[t]) && 9 !== e.nodeType; )
        if (1 === e.nodeType) {
          if (r && C(e).is(d)) break;
          n.push(e);
        }
      return n;
    },
    x = function (e, t) {
      for (var d = []; e; e = e.nextSibling)
        1 === e.nodeType && e !== t && d.push(e);
      return d;
    },
    P = C.expr.match.needsContext;
  function S(e, t) {
    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  }
  var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  function L(e, t, d) {
    return p(t)
      ? C.grep(e, function (e, n) {
          return !!t.call(e, n, e) !== d;
        })
      : t.nodeType
      ? C.grep(e, function (e) {
          return (e === t) !== d;
        })
      : "string" != typeof t
      ? C.grep(e, function (e) {
          return s.call(t, e) > -1 !== d;
        })
      : C.filter(t, e, d);
  }
  (C.filter = function (e, t, d) {
    var n = t[0];
    return (
      d && (e = ":not(" + e + ")"),
      1 === t.length && 1 === n.nodeType
        ? C.find.matchesSelector(n, e)
          ? [n]
          : []
        : C.find.matches(
            e,
            C.grep(t, function (e) {
              return 1 === e.nodeType;
            })
          )
    );
  }),
    C.fn.extend({
      find: function (e) {
        var t,
          d,
          n = this.length,
          r = this;
        if ("string" != typeof e)
          return this.pushStack(
            C(e).filter(function () {
              for (t = 0; t < n; t++) if (C.contains(r[t], this)) return !0;
            })
          );
        for (d = this.pushStack([]), t = 0; t < n; t++) C.find(e, r[t], d);
        return n > 1 ? C.uniqueSort(d) : d;
      },
      filter: function (e) {
        return this.pushStack(L(this, e || [], !1));
      },
      not: function (e) {
        return this.pushStack(L(this, e || [], !0));
      },
      is: function (e) {
        return !!L(this, "string" == typeof e && P.test(e) ? C(e) : e || [], !1)
          .length;
      },
    });
  var T,
    M = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  ((C.fn.init = function (e, t, d) {
    var r, o;
    if (!e) return this;
    if (((d = d || T), "string" == typeof e)) {
      if (
        !(r =
          "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3
            ? [null, e, null]
            : M.exec(e)) ||
        (!r[1] && t)
      )
        return !t || t.jquery ? (t || d).find(e) : this.constructor(t).find(e);
      if (r[1]) {
        if (
          (C.merge(
            this,
            C.parseHTML(
              r[1],
              (t = t instanceof C ? t[0] : t) && t.nodeType
                ? t.ownerDocument || t
                : n,
              !0
            )
          ),
          A.test(r[1]) && C.isPlainObject(t))
        )
          for (r in t) p(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
        return this;
      }
      return (
        (o = n.getElementById(r[2])) && ((this[0] = o), (this.length = 1)), this
      );
    }
    return e.nodeType
      ? ((this[0] = e), (this.length = 1), this)
      : p(e)
      ? void 0 !== d.ready
        ? d.ready(e)
        : e(C)
      : C.makeArray(e, this);
  }).prototype = C.fn),
    (T = C(n));
  var I = /^(?:parents|prev(?:Until|All))/,
    E = { children: !0, contents: !0, next: !0, prev: !0 };
  function N(e, t) {
    for (; (e = e[t]) && 1 !== e.nodeType; );
    return e;
  }
  C.fn.extend({
    has: function (e) {
      var t = C(e, this),
        d = t.length;
      return this.filter(function () {
        for (var e = 0; e < d; e++) if (C.contains(this, t[e])) return !0;
      });
    },
    closest: function (e, t) {
      var d,
        n = 0,
        r = this.length,
        o = [],
        i = "string" != typeof e && C(e);
      if (!P.test(e))
        for (; n < r; n++)
          for (d = this[n]; d && d !== t; d = d.parentNode)
            if (
              d.nodeType < 11 &&
              (i
                ? i.index(d) > -1
                : 1 === d.nodeType && C.find.matchesSelector(d, e))
            ) {
              o.push(d);
              break;
            }
      return this.pushStack(o.length > 1 ? C.uniqueSort(o) : o);
    },
    index: function (e) {
      return e
        ? "string" == typeof e
          ? s.call(C(e), this[0])
          : s.call(this, e.jquery ? e[0] : e)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (e, t) {
      return this.pushStack(C.uniqueSort(C.merge(this.get(), C(e, t))));
    },
    addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    },
  }),
    C.each(
      {
        parent: function (e) {
          var t = e.parentNode;
          return t && 11 !== t.nodeType ? t : null;
        },
        parents: function (e) {
          return B(e, "parentNode");
        },
        parentsUntil: function (e, t, d) {
          return B(e, "parentNode", d);
        },
        next: function (e) {
          return N(e, "nextSibling");
        },
        prev: function (e) {
          return N(e, "previousSibling");
        },
        nextAll: function (e) {
          return B(e, "nextSibling");
        },
        prevAll: function (e) {
          return B(e, "previousSibling");
        },
        nextUntil: function (e, t, d) {
          return B(e, "nextSibling", d);
        },
        prevUntil: function (e, t, d) {
          return B(e, "previousSibling", d);
        },
        siblings: function (e) {
          return x((e.parentNode || {}).firstChild, e);
        },
        children: function (e) {
          return x(e.firstChild);
        },
        contents: function (e) {
          return void 0 !== e.contentDocument
            ? e.contentDocument
            : (S(e, "template") && (e = e.content || e),
              C.merge([], e.childNodes));
        },
      },
      function (e, t) {
        C.fn[e] = function (d, n) {
          var r = C.map(this, t, d);
          return (
            "Until" !== e.slice(-5) && (n = d),
            n && "string" == typeof n && (r = C.filter(n, r)),
            this.length > 1 &&
              (E[e] || C.uniqueSort(r), I.test(e) && r.reverse()),
            this.pushStack(r)
          );
        };
      }
    );
  var _ = /[^\x20\t\r\n\f]+/g;
  function D(e) {
    return e;
  }
  function O(e) {
    throw e;
  }
  function R(e, t, d, n) {
    var r;
    try {
      e && p((r = e.promise))
        ? r.call(e).done(t).fail(d)
        : e && p((r = e.then))
        ? r.call(e, t, d)
        : t.apply(void 0, [e].slice(n));
    } catch (e) {
      d.apply(void 0, [e]);
    }
  }
  (C.Callbacks = function (e) {
    e =
      "string" == typeof e
        ? (function (e) {
            var t = {};
            return (
              C.each(e.match(_) || [], function (e, d) {
                t[d] = !0;
              }),
              t
            );
          })(e)
        : C.extend({}, e);
    var t,
      d,
      n,
      r,
      o = [],
      i = [],
      a = -1,
      s = function () {
        for (r = r || e.once, n = t = !0; i.length; a = -1)
          for (d = i.shift(); ++a < o.length; )
            !1 === o[a].apply(d[0], d[1]) &&
              e.stopOnFalse &&
              ((a = o.length), (d = !1));
        e.memory || (d = !1), (t = !1), r && (o = d ? [] : "");
      },
      l = {
        add: function () {
          return (
            o &&
              (d && !t && ((a = o.length - 1), i.push(d)),
              (function t(d) {
                C.each(d, function (d, n) {
                  p(n)
                    ? (e.unique && l.has(n)) || o.push(n)
                    : n && n.length && "string" !== y(n) && t(n);
                });
              })(arguments),
              d && !t && s()),
            this
          );
        },
        remove: function () {
          return (
            C.each(arguments, function (e, t) {
              for (var d; (d = C.inArray(t, o, d)) > -1; )
                o.splice(d, 1), d <= a && a--;
            }),
            this
          );
        },
        has: function (e) {
          return e ? C.inArray(e, o) > -1 : o.length > 0;
        },
        empty: function () {
          return o && (o = []), this;
        },
        disable: function () {
          return (r = i = []), (o = d = ""), this;
        },
        disabled: function () {
          return !o;
        },
        lock: function () {
          return (r = i = []), d || t || (o = d = ""), this;
        },
        locked: function () {
          return !!r;
        },
        fireWith: function (e, d) {
          return (
            r ||
              ((d = [e, (d = d || []).slice ? d.slice() : d]),
              i.push(d),
              t || s()),
            this
          );
        },
        fire: function () {
          return l.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!n;
        },
      };
    return l;
  }),
    C.extend({
      Deferred: function (t) {
        var d = [
            [
              "notify",
              "progress",
              C.Callbacks("memory"),
              C.Callbacks("memory"),
              2,
            ],
            [
              "resolve",
              "done",
              C.Callbacks("once memory"),
              C.Callbacks("once memory"),
              0,
              "resolved",
            ],
            [
              "reject",
              "fail",
              C.Callbacks("once memory"),
              C.Callbacks("once memory"),
              1,
              "rejected",
            ],
          ],
          n = "pending",
          r = {
            state: function () {
              return n;
            },
            always: function () {
              return o.done(arguments).fail(arguments), this;
            },
            catch: function (e) {
              return r.then(null, e);
            },
            pipe: function () {
              var e = arguments;
              return C.Deferred(function (t) {
                C.each(d, function (d, n) {
                  var r = p(e[n[4]]) && e[n[4]];
                  o[n[1]](function () {
                    var e = r && r.apply(this, arguments);
                    e && p(e.promise)
                      ? e
                          .promise()
                          .progress(t.notify)
                          .done(t.resolve)
                          .fail(t.reject)
                      : t[n[0] + "With"](this, r ? [e] : arguments);
                  });
                }),
                  (e = null);
              }).promise();
            },
            then: function (t, n, r) {
              var o = 0;
              function i(t, d, n, r) {
                return function () {
                  var a = this,
                    s = arguments,
                    l = function () {
                      var e, l;
                      if (!(t < o)) {
                        if ((e = n.apply(a, s)) === d.promise())
                          throw new TypeError("Thenable self-resolution");
                        p(
                          (l =
                            e &&
                            ("object" == typeof e || "function" == typeof e) &&
                            e.then)
                        )
                          ? r
                            ? l.call(e, i(o, d, D, r), i(o, d, O, r))
                            : l.call(
                                e,
                                i(++o, d, D, r),
                                i(o, d, O, r),
                                i(o, d, D, d.notifyWith)
                              )
                          : (n !== D && ((a = void 0), (s = [e])),
                            (r || d.resolveWith)(a, s));
                      }
                    },
                    u = r
                      ? l
                      : function () {
                          try {
                            l();
                          } catch (e) {
                            C.Deferred.exceptionHook &&
                              C.Deferred.exceptionHook(e, u.stackTrace),
                              t + 1 >= o &&
                                (n !== O && ((a = void 0), (s = [e])),
                                d.rejectWith(a, s));
                          }
                        };
                  t
                    ? u()
                    : (C.Deferred.getStackHook &&
                        (u.stackTrace = C.Deferred.getStackHook()),
                      e.setTimeout(u));
                };
              }
              return C.Deferred(function (e) {
                d[0][3].add(i(0, e, p(r) ? r : D, e.notifyWith)),
                  d[1][3].add(i(0, e, p(t) ? t : D)),
                  d[2][3].add(i(0, e, p(n) ? n : O));
              }).promise();
            },
            promise: function (e) {
              return null != e ? C.extend(e, r) : r;
            },
          },
          o = {};
        return (
          C.each(d, function (e, t) {
            var i = t[2],
              a = t[5];
            (r[t[1]] = i.add),
              a &&
                i.add(
                  function () {
                    n = a;
                  },
                  d[3 - e][2].disable,
                  d[3 - e][3].disable,
                  d[0][2].lock,
                  d[0][3].lock
                ),
              i.add(t[3].fire),
              (o[t[0]] = function () {
                return (
                  o[t[0] + "With"](this === o ? void 0 : this, arguments), this
                );
              }),
              (o[t[0] + "With"] = i.fireWith);
          }),
          r.promise(o),
          t && t.call(o, o),
          o
        );
      },
      when: function (e) {
        var t = arguments.length,
          d = t,
          n = Array(d),
          r = o.call(arguments),
          i = C.Deferred(),
          a = function (e) {
            return function (d) {
              (n[e] = this),
                (r[e] = arguments.length > 1 ? o.call(arguments) : d),
                --t || i.resolveWith(n, r);
            };
          };
        if (
          t <= 1 &&
          (R(e, i.done(a(d)).resolve, i.reject, !t),
          "pending" === i.state() || p(r[d] && r[d].then))
        )
          return i.then();
        for (; d--; ) R(r[d], a(d), i.reject);
        return i.promise();
      },
    });
  var F = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  (C.Deferred.exceptionHook = function (t, d) {
    e.console &&
      e.console.warn &&
      t &&
      F.test(t.name) &&
      e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, d);
  }),
    (C.readyException = function (t) {
      e.setTimeout(function () {
        throw t;
      });
    });
  var j = C.Deferred();
  function G() {
    n.removeEventListener("DOMContentLoaded", G),
      e.removeEventListener("load", G),
      C.ready();
  }
  (C.fn.ready = function (e) {
    return (
      j.then(e).catch(function (e) {
        C.readyException(e);
      }),
      this
    );
  }),
    C.extend({
      isReady: !1,
      readyWait: 1,
      ready: function (e) {
        (!0 === e ? --C.readyWait : C.isReady) ||
          ((C.isReady = !0),
          (!0 !== e && --C.readyWait > 0) || j.resolveWith(n, [C]));
      },
    }),
    (C.ready.then = j.then),
    "complete" === n.readyState ||
    ("loading" !== n.readyState && !n.documentElement.doScroll)
      ? e.setTimeout(C.ready)
      : (n.addEventListener("DOMContentLoaded", G),
        e.addEventListener("load", G));
  var U = function (e, t, d, n, r, o, i) {
      var a = 0,
        s = e.length,
        l = null == d;
      if ("object" === y(d))
        for (a in ((r = !0), d)) U(e, t, a, d[a], !0, o, i);
      else if (
        void 0 !== n &&
        ((r = !0),
        p(n) || (i = !0),
        l &&
          (i
            ? (t.call(e, n), (t = null))
            : ((l = t),
              (t = function (e, t, d) {
                return l.call(C(e), d);
              }))),
        t)
      )
        for (; a < s; a++) t(e[a], d, i ? n : n.call(e[a], a, t(e[a], d)));
      return r ? e : l ? t.call(e) : s ? t(e[0], d) : o;
    },
    H = /^-ms-/,
    z = /-([a-z])/g;
  function W(e, t) {
    return t.toUpperCase();
  }
  function K(e) {
    return e.replace(H, "ms-").replace(z, W);
  }
  var q = function (e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
  };
  function V() {
    this.expando = C.expando + V.uid++;
  }
  (V.uid = 1),
    (V.prototype = {
      cache: function (e) {
        var t = e[this.expando];
        return (
          t ||
            ((t = {}),
            q(e) &&
              (e.nodeType
                ? (e[this.expando] = t)
                : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0,
                  }))),
          t
        );
      },
      set: function (e, t, d) {
        var n,
          r = this.cache(e);
        if ("string" == typeof t) r[K(t)] = d;
        else for (n in t) r[K(n)] = t[n];
        return r;
      },
      get: function (e, t) {
        return void 0 === t
          ? this.cache(e)
          : e[this.expando] && e[this.expando][K(t)];
      },
      access: function (e, t, d) {
        return void 0 === t || (t && "string" == typeof t && void 0 === d)
          ? this.get(e, t)
          : (this.set(e, t, d), void 0 !== d ? d : t);
      },
      remove: function (e, t) {
        var d,
          n = e[this.expando];
        if (void 0 !== n) {
          if (void 0 !== t) {
            d = (t = Array.isArray(t)
              ? t.map(K)
              : (t = K(t)) in n
              ? [t]
              : t.match(_) || []).length;
            for (; d--; ) delete n[t[d]];
          }
          (void 0 === t || C.isEmptyObject(n)) &&
            (e.nodeType ? (e[this.expando] = void 0) : delete e[this.expando]);
        }
      },
      hasData: function (e) {
        var t = e[this.expando];
        return void 0 !== t && !C.isEmptyObject(t);
      },
    });
  var X = new V(),
    Z = new V(),
    J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    Y = /[A-Z]/g;
  function Q(e, t, d) {
    var n;
    if (void 0 === d && 1 === e.nodeType)
      if (
        ((n = "data-" + t.replace(Y, "-$&").toLowerCase()),
        "string" == typeof (d = e.getAttribute(n)))
      ) {
        try {
          d = (function (e) {
            return (
              "true" === e ||
              ("false" !== e &&
                ("null" === e
                  ? null
                  : e === +e + ""
                  ? +e
                  : J.test(e)
                  ? JSON.parse(e)
                  : e))
            );
          })(d);
        } catch (e) {}
        Z.set(e, t, d);
      } else d = void 0;
    return d;
  }
  C.extend({
    hasData: function (e) {
      return Z.hasData(e) || X.hasData(e);
    },
    data: function (e, t, d) {
      return Z.access(e, t, d);
    },
    removeData: function (e, t) {
      Z.remove(e, t);
    },
    _data: function (e, t, d) {
      return X.access(e, t, d);
    },
    _removeData: function (e, t) {
      X.remove(e, t);
    },
  }),
    C.fn.extend({
      data: function (e, t) {
        var d,
          n,
          r,
          o = this[0],
          i = o && o.attributes;
        if (void 0 === e) {
          if (
            this.length &&
            ((r = Z.get(o)), 1 === o.nodeType && !X.get(o, "hasDataAttrs"))
          ) {
            for (d = i.length; d--; )
              i[d] &&
                0 === (n = i[d].name).indexOf("data-") &&
                ((n = K(n.slice(5))), Q(o, n, r[n]));
            X.set(o, "hasDataAttrs", !0);
          }
          return r;
        }
        return "object" == typeof e
          ? this.each(function () {
              Z.set(this, e);
            })
          : U(
              this,
              function (t) {
                var d;
                if (o && void 0 === t)
                  return void 0 !== (d = Z.get(o, e))
                    ? d
                    : void 0 !== (d = Q(o, e))
                    ? d
                    : void 0;
                this.each(function () {
                  Z.set(this, e, t);
                });
              },
              null,
              t,
              arguments.length > 1,
              null,
              !0
            );
      },
      removeData: function (e) {
        return this.each(function () {
          Z.remove(this, e);
        });
      },
    }),
    C.extend({
      queue: function (e, t, d) {
        var n;
        if (e)
          return (
            (n = X.get(e, (t = (t || "fx") + "queue"))),
            d &&
              (!n || Array.isArray(d)
                ? (n = X.access(e, t, C.makeArray(d)))
                : n.push(d)),
            n || []
          );
      },
      dequeue: function (e, t) {
        var d = C.queue(e, (t = t || "fx")),
          n = d.length,
          r = d.shift(),
          o = C._queueHooks(e, t);
        "inprogress" === r && ((r = d.shift()), n--),
          r &&
            ("fx" === t && d.unshift("inprogress"),
            delete o.stop,
            r.call(
              e,
              function () {
                C.dequeue(e, t);
              },
              o
            )),
          !n && o && o.empty.fire();
      },
      _queueHooks: function (e, t) {
        var d = t + "queueHooks";
        return (
          X.get(e, d) ||
          X.access(e, d, {
            empty: C.Callbacks("once memory").add(function () {
              X.remove(e, [t + "queue", d]);
            }),
          })
        );
      },
    }),
    C.fn.extend({
      queue: function (e, t) {
        var d = 2;
        return (
          "string" != typeof e && ((t = e), (e = "fx"), d--),
          arguments.length < d
            ? C.queue(this[0], e)
            : void 0 === t
            ? this
            : this.each(function () {
                var d = C.queue(this, e, t);
                C._queueHooks(this, e),
                  "fx" === e && "inprogress" !== d[0] && C.dequeue(this, e);
              })
        );
      },
      dequeue: function (e) {
        return this.each(function () {
          C.dequeue(this, e);
        });
      },
      clearQueue: function (e) {
        return this.queue(e || "fx", []);
      },
      promise: function (e, t) {
        var d,
          n = 1,
          r = C.Deferred(),
          o = this,
          i = this.length,
          a = function () {
            --n || r.resolveWith(o, [o]);
          };
        for (
          "string" != typeof e && ((t = e), (e = void 0)), e = e || "fx";
          i--;

        )
          (d = X.get(o[i], e + "queueHooks")) &&
            d.empty &&
            (n++, d.empty.add(a));
        return a(), r.promise(t);
      },
    });
  var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
    de = ["Top", "Right", "Bottom", "Left"],
    ne = n.documentElement,
    re = function (e) {
      return C.contains(e.ownerDocument, e);
    },
    oe = { composed: !0 };
  ne.attachShadow &&
    (re = function (e) {
      return (
        C.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument
      );
    });
  var ie = function (e, t) {
      return (
        "none" === (e = t || e).style.display ||
        ("" === e.style.display && re(e) && "none" === C.css(e, "display"))
      );
    },
    ae = function (e, t, d, n) {
      var r,
        o,
        i = {};
      for (o in t) (i[o] = e.style[o]), (e.style[o] = t[o]);
      for (o in ((r = d.apply(e, n || [])), t)) e.style[o] = i[o];
      return r;
    };
  function se(e, t, d, n) {
    var r,
      o,
      i = 20,
      a = n
        ? function () {
            return n.cur();
          }
        : function () {
            return C.css(e, t, "");
          },
      s = a(),
      l = (d && d[3]) || (C.cssNumber[t] ? "" : "px"),
      u =
        e.nodeType &&
        (C.cssNumber[t] || ("px" !== l && +s)) &&
        te.exec(C.css(e, t));
    if (u && u[3] !== l) {
      for (s /= 2, l = l || u[3], u = +s || 1; i--; )
        C.style(e, t, u + l),
          (1 - o) * (1 - (o = a() / s || 0.5)) <= 0 && (i = 0),
          (u /= o);
      C.style(e, t, (u *= 2) + l), (d = d || []);
    }
    return (
      d &&
        ((u = +u || +s || 0),
        (r = d[1] ? u + (d[1] + 1) * d[2] : +d[2]),
        n && ((n.unit = l), (n.start = u), (n.end = r))),
      r
    );
  }
  var le = {};
  function ue(e) {
    var t,
      d = e.ownerDocument,
      n = e.nodeName,
      r = le[n];
    return (
      r ||
      ((t = d.body.appendChild(d.createElement(n))),
      (r = C.css(t, "display")),
      t.parentNode.removeChild(t),
      "none" === r && (r = "block"),
      (le[n] = r),
      r)
    );
  }
  function ce(e, t) {
    for (var d, n, r = [], o = 0, i = e.length; o < i; o++)
      (n = e[o]).style &&
        ((d = n.style.display),
        t
          ? ("none" === d &&
              ((r[o] = X.get(n, "display") || null),
              r[o] || (n.style.display = "")),
            "" === n.style.display && ie(n) && (r[o] = ue(n)))
          : "none" !== d && ((r[o] = "none"), X.set(n, "display", d)));
    for (o = 0; o < i; o++) null != r[o] && (e[o].style.display = r[o]);
    return e;
  }
  C.fn.extend({
    show: function () {
      return ce(this, !0);
    },
    hide: function () {
      return ce(this);
    },
    toggle: function (e) {
      return "boolean" == typeof e
        ? e
          ? this.show()
          : this.hide()
        : this.each(function () {
            ie(this) ? C(this).show() : C(this).hide();
          });
    },
  });
  var fe = /^(?:checkbox|radio)$/i,
    he = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
    $e = /^$|^module$|\/(?:java|ecma)script/i,
    pe = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""],
    };
  function me(e, t) {
    var d;
    return (
      (d =
        void 0 !== e.getElementsByTagName
          ? e.getElementsByTagName(t || "*")
          : void 0 !== e.querySelectorAll
          ? e.querySelectorAll(t || "*")
          : []),
      void 0 === t || (t && S(e, t)) ? C.merge([e], d) : d
    );
  }
  function ge(e, t) {
    for (var d = 0, n = e.length; d < n; d++)
      X.set(e[d], "globalEval", !t || X.get(t[d], "globalEval"));
  }
  (pe.optgroup = pe.option),
    (pe.tbody = pe.tfoot = pe.colgroup = pe.caption = pe.thead),
    (pe.th = pe.td);
  var ve,
    ye,
    Ce = /<|&#?\w+;/;
  function be(e, t, d, n, r) {
    for (
      var o,
        i,
        a,
        s,
        l,
        u,
        c = t.createDocumentFragment(),
        f = [],
        h = 0,
        $ = e.length;
      h < $;
      h++
    )
      if ((o = e[h]) || 0 === o)
        if ("object" === y(o)) C.merge(f, o.nodeType ? [o] : o);
        else if (Ce.test(o)) {
          for (
            i = i || c.appendChild(t.createElement("div")),
              a = (he.exec(o) || ["", ""])[1].toLowerCase(),
              i.innerHTML =
                (s = pe[a] || pe._default)[1] + C.htmlPrefilter(o) + s[2],
              u = s[0];
            u--;

          )
            i = i.lastChild;
          C.merge(f, i.childNodes), ((i = c.firstChild).textContent = "");
        } else f.push(t.createTextNode(o));
    for (c.textContent = "", h = 0; (o = f[h++]); )
      if (n && C.inArray(o, n) > -1) r && r.push(o);
      else if (
        ((l = re(o)), (i = me(c.appendChild(o), "script")), l && ge(i), d)
      )
        for (u = 0; (o = i[u++]); ) $e.test(o.type || "") && d.push(o);
    return c;
  }
  (ve = n.createDocumentFragment().appendChild(n.createElement("div"))),
    (ye = n.createElement("input")).setAttribute("type", "radio"),
    ye.setAttribute("checked", "checked"),
    ye.setAttribute("name", "t"),
    ve.appendChild(ye),
    ($.checkClone = ve.cloneNode(!0).cloneNode(!0).lastChild.checked),
    (ve.innerHTML = "<textarea>x</textarea>"),
    ($.noCloneChecked = !!ve.cloneNode(!0).lastChild.defaultValue);
  var we = /^key/,
    ke = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    Be = /^([^.]*)(?:\.(.+)|)/;
  function xe() {
    return !0;
  }
  function Pe() {
    return !1;
  }
  function Se(e, t) {
    return (
      (e ===
        (function () {
          try {
            return n.activeElement;
          } catch (e) {}
        })()) ==
      ("focus" === t)
    );
  }
  function Ae(e, t, d, n, r, o) {
    var i, a;
    if ("object" == typeof t) {
      for (a in ("string" != typeof d && ((n = n || d), (d = void 0)), t))
        Ae(e, a, d, n, t[a], o);
      return e;
    }
    if (
      (null == n && null == r
        ? ((r = d), (n = d = void 0))
        : null == r &&
          ("string" == typeof d
            ? ((r = n), (n = void 0))
            : ((r = n), (n = d), (d = void 0))),
      !1 === r)
    )
      r = Pe;
    else if (!r) return e;
    return (
      1 === o &&
        ((i = r),
        ((r = function (e) {
          return C().off(e), i.apply(this, arguments);
        }).guid = i.guid || (i.guid = C.guid++))),
      e.each(function () {
        C.event.add(this, t, r, n, d);
      })
    );
  }
  function Le(e, t, d) {
    d
      ? (X.set(e, t, !1),
        C.event.add(e, t, {
          namespace: !1,
          handler: function (e) {
            var n,
              r,
              i = X.get(this, t);
            if (1 & e.isTrigger && this[t]) {
              if (i)
                (C.event.special[t] || {}).delegateType && e.stopPropagation();
              else if (
                ((i = o.call(arguments)),
                X.set(this, t, i),
                (n = d(this, t)),
                this[t](),
                i !== (r = X.get(this, t)) || n
                  ? X.set(this, t, !1)
                  : (r = void 0),
                i !== r)
              )
                return e.stopImmediatePropagation(), e.preventDefault(), r;
            } else
              i &&
                (X.set(
                  this,
                  t,
                  C.event.trigger(
                    C.extend(i.shift(), C.Event.prototype),
                    i,
                    this
                  )
                ),
                e.stopImmediatePropagation());
          },
        }))
      : C.event.add(e, t, xe);
  }
  (C.event = {
    global: {},
    add: function (e, t, d, n, r) {
      var o,
        i,
        a,
        s,
        l,
        u,
        c,
        f,
        h,
        $,
        p,
        m = X.get(e);
      if (m)
        for (
          d.handler && ((d = (o = d).handler), (r = o.selector)),
            r && C.find.matchesSelector(ne, r),
            d.guid || (d.guid = C.guid++),
            (s = m.events) || (s = m.events = {}),
            (i = m.handle) ||
              (i = m.handle =
                function (t) {
                  return void 0 !== C && C.event.triggered !== t.type
                    ? C.event.dispatch.apply(e, arguments)
                    : void 0;
                }),
            l = (t = (t || "").match(_) || [""]).length;
          l--;

        )
          (h = p = (a = Be.exec(t[l]) || [])[1]),
            ($ = (a[2] || "").split(".").sort()),
            h &&
              ((c = C.event.special[h] || {}),
              (c =
                C.event.special[(h = (r ? c.delegateType : c.bindType) || h)] ||
                {}),
              (u = C.extend(
                {
                  type: h,
                  origType: p,
                  data: n,
                  handler: d,
                  guid: d.guid,
                  selector: r,
                  needsContext: r && C.expr.match.needsContext.test(r),
                  namespace: $.join("."),
                },
                o
              )),
              (f = s[h]) ||
                (((f = s[h] = []).delegateCount = 0),
                (c.setup && !1 !== c.setup.call(e, n, $, i)) ||
                  (e.addEventListener && e.addEventListener(h, i))),
              c.add &&
                (c.add.call(e, u), u.handler.guid || (u.handler.guid = d.guid)),
              r ? f.splice(f.delegateCount++, 0, u) : f.push(u),
              (C.event.global[h] = !0));
    },
    remove: function (e, t, d, n, r) {
      var o,
        i,
        a,
        s,
        l,
        u,
        c,
        f,
        h,
        $,
        p,
        m = X.hasData(e) && X.get(e);
      if (m && (s = m.events)) {
        for (l = (t = (t || "").match(_) || [""]).length; l--; )
          if (
            ((h = p = (a = Be.exec(t[l]) || [])[1]),
            ($ = (a[2] || "").split(".").sort()),
            h)
          ) {
            for (
              c = C.event.special[h] || {},
                f = s[(h = (n ? c.delegateType : c.bindType) || h)] || [],
                a =
                  a[2] &&
                  new RegExp("(^|\\.)" + $.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                i = o = f.length;
              o--;

            )
              (u = f[o]),
                (!r && p !== u.origType) ||
                  (d && d.guid !== u.guid) ||
                  (a && !a.test(u.namespace)) ||
                  (n && n !== u.selector && ("**" !== n || !u.selector)) ||
                  (f.splice(o, 1),
                  u.selector && f.delegateCount--,
                  c.remove && c.remove.call(e, u));
            i &&
              !f.length &&
              ((c.teardown && !1 !== c.teardown.call(e, $, m.handle)) ||
                C.removeEvent(e, h, m.handle),
              delete s[h]);
          } else for (h in s) C.event.remove(e, h + t[l], d, n, !0);
        C.isEmptyObject(s) && X.remove(e, "handle events");
      }
    },
    dispatch: function (e) {
      var t,
        d,
        n,
        r,
        o,
        i,
        a = C.event.fix(e),
        s = new Array(arguments.length),
        l = (X.get(this, "events") || {})[a.type] || [],
        u = C.event.special[a.type] || {};
      for (s[0] = a, t = 1; t < arguments.length; t++) s[t] = arguments[t];
      if (
        ((a.delegateTarget = this),
        !u.preDispatch || !1 !== u.preDispatch.call(this, a))
      ) {
        for (
          i = C.event.handlers.call(this, a, l), t = 0;
          (r = i[t++]) && !a.isPropagationStopped();

        )
          for (
            a.currentTarget = r.elem, d = 0;
            (o = r.handlers[d++]) && !a.isImmediatePropagationStopped();

          )
            (a.rnamespace &&
              !1 !== o.namespace &&
              !a.rnamespace.test(o.namespace)) ||
              ((a.handleObj = o),
              (a.data = o.data),
              void 0 !==
                (n = (
                  (C.event.special[o.origType] || {}).handle || o.handler
                ).apply(r.elem, s)) &&
                !1 === (a.result = n) &&
                (a.preventDefault(), a.stopPropagation()));
        return u.postDispatch && u.postDispatch.call(this, a), a.result;
      }
    },
    handlers: function (e, t) {
      var d,
        n,
        r,
        o,
        i,
        a = [],
        s = t.delegateCount,
        l = e.target;
      if (s && l.nodeType && !("click" === e.type && e.button >= 1))
        for (; l !== this; l = l.parentNode || this)
          if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
            for (o = [], i = {}, d = 0; d < s; d++)
              void 0 === i[(r = (n = t[d]).selector + " ")] &&
                (i[r] = n.needsContext
                  ? C(r, this).index(l) > -1
                  : C.find(r, this, null, [l]).length),
                i[r] && o.push(n);
            o.length && a.push({ elem: l, handlers: o });
          }
      return (
        (l = this), s < t.length && a.push({ elem: l, handlers: t.slice(s) }), a
      );
    },
    addProp: function (e, t) {
      Object.defineProperty(C.Event.prototype, e, {
        enumerable: !0,
        configurable: !0,
        get: p(t)
          ? function () {
              if (this.originalEvent) return t(this.originalEvent);
            }
          : function () {
              if (this.originalEvent) return this.originalEvent[e];
            },
        set: function (t) {
          Object.defineProperty(this, e, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: t,
          });
        },
      });
    },
    fix: function (e) {
      return e[C.expando] ? e : new C.Event(e);
    },
    special: {
      load: { noBubble: !0 },
      click: {
        setup: function (e) {
          var t = this || e;
          return (
            fe.test(t.type) &&
              t.click &&
              S(t, "input") &&
              void 0 === X.get(t, "click") &&
              Le(t, "click", xe),
            !1
          );
        },
        trigger: function (e) {
          var t = this || e;
          return (
            fe.test(t.type) &&
              t.click &&
              S(t, "input") &&
              void 0 === X.get(t, "click") &&
              Le(t, "click"),
            !0
          );
        },
        _default: function (e) {
          var t = e.target;
          return (
            (fe.test(t.type) &&
              t.click &&
              S(t, "input") &&
              X.get(t, "click")) ||
            S(t, "a")
          );
        },
      },
      beforeunload: {
        postDispatch: function (e) {
          void 0 !== e.result &&
            e.originalEvent &&
            (e.originalEvent.returnValue = e.result);
        },
      },
    },
  }),
    (C.removeEvent = function (e, t, d) {
      e.removeEventListener && e.removeEventListener(t, d);
    }),
    (C.Event = function (e, t) {
      if (!(this instanceof C.Event)) return new C.Event(e, t);
      e && e.type
        ? ((this.originalEvent = e),
          (this.type = e.type),
          (this.isDefaultPrevented =
            e.defaultPrevented ||
            (void 0 === e.defaultPrevented && !1 === e.returnValue)
              ? xe
              : Pe),
          (this.target =
            e.target && 3 === e.target.nodeType
              ? e.target.parentNode
              : e.target),
          (this.currentTarget = e.currentTarget),
          (this.relatedTarget = e.relatedTarget))
        : (this.type = e),
        t && C.extend(this, t),
        (this.timeStamp = (e && e.timeStamp) || Date.now()),
        (this[C.expando] = !0);
    }),
    (C.Event.prototype = {
      constructor: C.Event,
      isDefaultPrevented: Pe,
      isPropagationStopped: Pe,
      isImmediatePropagationStopped: Pe,
      isSimulated: !1,
      preventDefault: function () {
        var e = this.originalEvent;
        (this.isDefaultPrevented = xe),
          e && !this.isSimulated && e.preventDefault();
      },
      stopPropagation: function () {
        var e = this.originalEvent;
        (this.isPropagationStopped = xe),
          e && !this.isSimulated && e.stopPropagation();
      },
      stopImmediatePropagation: function () {
        var e = this.originalEvent;
        (this.isImmediatePropagationStopped = xe),
          e && !this.isSimulated && e.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    C.each(
      {
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function (e) {
          var t = e.button;
          return null == e.which && we.test(e.type)
            ? null != e.charCode
              ? e.charCode
              : e.keyCode
            : !e.which && void 0 !== t && ke.test(e.type)
            ? 1 & t
              ? 1
              : 2 & t
              ? 3
              : 4 & t
              ? 2
              : 0
            : e.which;
        },
      },
      C.event.addProp
    ),
    C.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
      C.event.special[e] = {
        setup: function () {
          return Le(this, e, Se), !1;
        },
        trigger: function () {
          return Le(this, e), !0;
        },
        delegateType: t,
      };
    }),
    C.each(
      {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout",
      },
      function (e, t) {
        C.event.special[e] = {
          delegateType: t,
          bindType: t,
          handle: function (e) {
            var d,
              n = e.relatedTarget,
              r = e.handleObj;
            return (
              (n && (n === this || C.contains(this, n))) ||
                ((e.type = r.origType),
                (d = r.handler.apply(this, arguments)),
                (e.type = t)),
              d
            );
          },
        };
      }
    ),
    C.fn.extend({
      on: function (e, t, d, n) {
        return Ae(this, e, t, d, n);
      },
      one: function (e, t, d, n) {
        return Ae(this, e, t, d, n, 1);
      },
      off: function (e, t, d) {
        var n, r;
        if (e && e.preventDefault && e.handleObj)
          return (
            (n = e.handleObj),
            C(e.delegateTarget).off(
              n.namespace ? n.origType + "." + n.namespace : n.origType,
              n.selector,
              n.handler
            ),
            this
          );
        if ("object" == typeof e) {
          for (r in e) this.off(r, t, e[r]);
          return this;
        }
        return (
          (!1 !== t && "function" != typeof t) || ((d = t), (t = void 0)),
          !1 === d && (d = Pe),
          this.each(function () {
            C.event.remove(this, e, d, t);
          })
        );
      },
    });
  var Te =
      /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
    Me = /<script|<style|<link/i,
    Ie = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Ee = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function Ne(e, t) {
    return (
      (S(e, "table") &&
        S(11 !== t.nodeType ? t : t.firstChild, "tr") &&
        C(e).children("tbody")[0]) ||
      e
    );
  }
  function _e(e) {
    return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
  }
  function De(e) {
    return (
      "true/" === (e.type || "").slice(0, 5)
        ? (e.type = e.type.slice(5))
        : e.removeAttribute("type"),
      e
    );
  }
  function Oe(e, t) {
    var d, n, r, o, i, a, s, l;
    if (1 === t.nodeType) {
      if (
        X.hasData(e) &&
        ((o = X.access(e)), (i = X.set(t, o)), (l = o.events))
      )
        for (r in (delete i.handle, (i.events = {}), l))
          for (d = 0, n = l[r].length; d < n; d++) C.event.add(t, r, l[r][d]);
      Z.hasData(e) && ((a = Z.access(e)), (s = C.extend({}, a)), Z.set(t, s));
    }
  }
  function Re(e, t, d, n) {
    t = i.apply([], t);
    var r,
      o,
      a,
      s,
      l,
      u,
      c = 0,
      f = e.length,
      h = f - 1,
      m = t[0],
      g = p(m);
    if (g || (f > 1 && "string" == typeof m && !$.checkClone && Ie.test(m)))
      return e.each(function (r) {
        var o = e.eq(r);
        g && (t[0] = m.call(this, r, o.html())), Re(o, t, d, n);
      });
    if (
      f &&
      ((o = (r = be(t, e[0].ownerDocument, !1, e, n)).firstChild),
      1 === r.childNodes.length && (r = o),
      o || n)
    ) {
      for (s = (a = C.map(me(r, "script"), _e)).length; c < f; c++)
        (l = r),
          c !== h &&
            ((l = C.clone(l, !0, !0)), s && C.merge(a, me(l, "script"))),
          d.call(e[c], l, c);
      if (s)
        for (u = a[a.length - 1].ownerDocument, C.map(a, De), c = 0; c < s; c++)
          $e.test((l = a[c]).type || "") &&
            !X.access(l, "globalEval") &&
            C.contains(u, l) &&
            (l.src && "module" !== (l.type || "").toLowerCase()
              ? C._evalUrl &&
                !l.noModule &&
                C._evalUrl(l.src, { nonce: l.nonce || l.getAttribute("nonce") })
              : v(l.textContent.replace(Ee, ""), l, u));
    }
    return e;
  }
  function Fe(e, t, d) {
    for (var n, r = t ? C.filter(t, e) : e, o = 0; null != (n = r[o]); o++)
      d || 1 !== n.nodeType || C.cleanData(me(n)),
        n.parentNode &&
          (d && re(n) && ge(me(n, "script")), n.parentNode.removeChild(n));
    return e;
  }
  C.extend({
    htmlPrefilter: function (e) {
      return e.replace(Te, "<$1></$2>");
    },
    clone: function (e, t, d) {
      var n,
        r,
        o,
        i,
        a,
        s,
        l,
        u = e.cloneNode(!0),
        c = re(e);
      if (
        !(
          $.noCloneChecked ||
          (1 !== e.nodeType && 11 !== e.nodeType) ||
          C.isXMLDoc(e)
        )
      )
        for (i = me(u), n = 0, r = (o = me(e)).length; n < r; n++)
          (a = o[n]),
            "input" === (l = (s = i[n]).nodeName.toLowerCase()) &&
            fe.test(a.type)
              ? (s.checked = a.checked)
              : ("input" !== l && "textarea" !== l) ||
                (s.defaultValue = a.defaultValue);
      if (t)
        if (d)
          for (o = o || me(e), i = i || me(u), n = 0, r = o.length; n < r; n++)
            Oe(o[n], i[n]);
        else Oe(e, u);
      return (
        (i = me(u, "script")).length > 0 && ge(i, !c && me(e, "script")), u
      );
    },
    cleanData: function (e) {
      for (var t, d, n, r = C.event.special, o = 0; void 0 !== (d = e[o]); o++)
        if (q(d)) {
          if ((t = d[X.expando])) {
            if (t.events)
              for (n in t.events)
                r[n] ? C.event.remove(d, n) : C.removeEvent(d, n, t.handle);
            d[X.expando] = void 0;
          }
          d[Z.expando] && (d[Z.expando] = void 0);
        }
    },
  }),
    C.fn.extend({
      detach: function (e) {
        return Fe(this, e, !0);
      },
      remove: function (e) {
        return Fe(this, e);
      },
      text: function (e) {
        return U(
          this,
          function (e) {
            return void 0 === e
              ? C.text(this)
              : this.empty().each(function () {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    (this.textContent = e);
                });
          },
          null,
          e,
          arguments.length
        );
      },
      append: function () {
        return Re(this, arguments, function (e) {
          (1 !== this.nodeType &&
            11 !== this.nodeType &&
            9 !== this.nodeType) ||
            Ne(this, e).appendChild(e);
        });
      },
      prepend: function () {
        return Re(this, arguments, function (e) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var t = Ne(this, e);
            t.insertBefore(e, t.firstChild);
          }
        });
      },
      before: function () {
        return Re(this, arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this);
        });
      },
      after: function () {
        return Re(this, arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
        });
      },
      empty: function () {
        for (var e, t = 0; null != (e = this[t]); t++)
          1 === e.nodeType && (C.cleanData(me(e, !1)), (e.textContent = ""));
        return this;
      },
      clone: function (e, t) {
        return (
          (e = null != e && e),
          (t = null == t ? e : t),
          this.map(function () {
            return C.clone(this, e, t);
          })
        );
      },
      html: function (e) {
        return U(
          this,
          function (e) {
            var t = this[0] || {},
              d = 0,
              n = this.length;
            if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
            if (
              "string" == typeof e &&
              !Me.test(e) &&
              !pe[(he.exec(e) || ["", ""])[1].toLowerCase()]
            ) {
              e = C.htmlPrefilter(e);
              try {
                for (; d < n; d++)
                  1 === (t = this[d] || {}).nodeType &&
                    (C.cleanData(me(t, !1)), (t.innerHTML = e));
                t = 0;
              } catch (e) {}
            }
            t && this.empty().append(e);
          },
          null,
          e,
          arguments.length
        );
      },
      replaceWith: function () {
        var e = [];
        return Re(
          this,
          arguments,
          function (t) {
            var d = this.parentNode;
            C.inArray(this, e) < 0 &&
              (C.cleanData(me(this)), d && d.replaceChild(t, this));
          },
          e
        );
      },
    }),
    C.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (e, t) {
        C.fn[e] = function (e) {
          for (var d, n = [], r = C(e), o = r.length - 1, i = 0; i <= o; i++)
            (d = i === o ? this : this.clone(!0)),
              C(r[i])[t](d),
              a.apply(n, d.get());
          return this.pushStack(n);
        };
      }
    );
  var je = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
    Ge = function (t) {
      var d = t.ownerDocument.defaultView;
      return (d && d.opener) || (d = e), d.getComputedStyle(t);
    },
    Ue = new RegExp(de.join("|"), "i");
  function He(e, t, d) {
    var n,
      r,
      o,
      i,
      a = e.style;
    return (
      (d = d || Ge(e)) &&
        ("" !== (i = d.getPropertyValue(t) || d[t]) ||
          re(e) ||
          (i = C.style(e, t)),
        !$.pixelBoxStyles() &&
          je.test(i) &&
          Ue.test(t) &&
          ((n = a.width),
          (r = a.minWidth),
          (o = a.maxWidth),
          (a.minWidth = a.maxWidth = a.width = i),
          (i = d.width),
          (a.width = n),
          (a.minWidth = r),
          (a.maxWidth = o))),
      void 0 !== i ? i + "" : i
    );
  }
  function ze(e, t) {
    return {
      get: function () {
        if (!e()) return (this.get = t).apply(this, arguments);
        delete this.get;
      },
    };
  }
  !(function () {
    function t() {
      if (u) {
        (l.style.cssText =
          "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
          (u.style.cssText =
            "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
          ne.appendChild(l).appendChild(u);
        var t = e.getComputedStyle(u);
        (r = "1%" !== t.top),
          (s = 12 === d(t.marginLeft)),
          (u.style.right = "60%"),
          (a = 36 === d(t.right)),
          (o = 36 === d(t.width)),
          (u.style.position = "absolute"),
          (i = 12 === d(u.offsetWidth / 3)),
          ne.removeChild(l),
          (u = null);
      }
    }
    function d(e) {
      return Math.round(parseFloat(e));
    }
    var r,
      o,
      i,
      a,
      s,
      l = n.createElement("div"),
      u = n.createElement("div");
    u.style &&
      ((u.style.backgroundClip = "content-box"),
      (u.cloneNode(!0).style.backgroundClip = ""),
      ($.clearCloneStyle = "content-box" === u.style.backgroundClip),
      C.extend($, {
        boxSizingReliable: function () {
          return t(), o;
        },
        pixelBoxStyles: function () {
          return t(), a;
        },
        pixelPosition: function () {
          return t(), r;
        },
        reliableMarginLeft: function () {
          return t(), s;
        },
        scrollboxSize: function () {
          return t(), i;
        },
      }));
  })();
  var We = ["Webkit", "Moz", "ms"],
    Ke = n.createElement("div").style,
    qe = {};
  function Ve(e) {
    return (
      C.cssProps[e] ||
      qe[e] ||
      (e in Ke
        ? e
        : (qe[e] =
            (function (e) {
              for (
                var t = e[0].toUpperCase() + e.slice(1), d = We.length;
                d--;

              )
                if ((e = We[d] + t) in Ke) return e;
            })(e) || e))
    );
  }
  var Xe = /^(none|table(?!-c[ea]).+)/,
    Ze = /^--/,
    Je = { position: "absolute", visibility: "hidden", display: "block" },
    Ye = { letterSpacing: "0", fontWeight: "400" };
  function Qe(e, t, d) {
    var n = te.exec(t);
    return n ? Math.max(0, n[2] - (d || 0)) + (n[3] || "px") : t;
  }
  function et(e, t, d, n, r, o) {
    var i = "width" === t ? 1 : 0,
      a = 0,
      s = 0;
    if (d === (n ? "border" : "content")) return 0;
    for (; i < 4; i += 2)
      "margin" === d && (s += C.css(e, d + de[i], !0, r)),
        n
          ? ("content" === d && (s -= C.css(e, "padding" + de[i], !0, r)),
            "margin" !== d &&
              (s -= C.css(e, "border" + de[i] + "Width", !0, r)))
          : ((s += C.css(e, "padding" + de[i], !0, r)),
            "padding" !== d
              ? (s += C.css(e, "border" + de[i] + "Width", !0, r))
              : (a += C.css(e, "border" + de[i] + "Width", !0, r)));
    return (
      !n &&
        o >= 0 &&
        (s +=
          Math.max(
            0,
            Math.ceil(
              e["offset" + t[0].toUpperCase() + t.slice(1)] - o - s - a - 0.5
            )
          ) || 0),
      s
    );
  }
  function tt(e, t, d) {
    var n = Ge(e),
      r =
        (!$.boxSizingReliable() || d) &&
        "border-box" === C.css(e, "boxSizing", !1, n),
      o = r,
      i = He(e, t, n),
      a = "offset" + t[0].toUpperCase() + t.slice(1);
    if (je.test(i)) {
      if (!d) return i;
      i = "auto";
    }
    return (
      ((!$.boxSizingReliable() && r) ||
        "auto" === i ||
        (!parseFloat(i) && "inline" === C.css(e, "display", !1, n))) &&
        e.getClientRects().length &&
        ((r = "border-box" === C.css(e, "boxSizing", !1, n)),
        (o = a in e) && (i = e[a])),
      (i = parseFloat(i) || 0) +
        et(e, t, d || (r ? "border" : "content"), o, n, i) +
        "px"
    );
  }
  function dt(e, t, d, n, r) {
    return new dt.prototype.init(e, t, d, n, r);
  }
  C.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) {
            var d = He(e, "opacity");
            return "" === d ? "1" : d;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: {},
    style: function (e, t, d, n) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var r,
          o,
          i,
          a = K(t),
          s = Ze.test(t),
          l = e.style;
        if (
          (s || (t = Ve(a)), (i = C.cssHooks[t] || C.cssHooks[a]), void 0 === d)
        )
          return i && "get" in i && void 0 !== (r = i.get(e, !1, n)) ? r : l[t];
        "string" == (o = typeof d) &&
          (r = te.exec(d)) &&
          r[1] &&
          ((d = se(e, t, r)), (o = "number")),
          null != d &&
            d == d &&
            ("number" !== o ||
              s ||
              (d += (r && r[3]) || (C.cssNumber[a] ? "" : "px")),
            $.clearCloneStyle ||
              "" !== d ||
              0 !== t.indexOf("background") ||
              (l[t] = "inherit"),
            (i && "set" in i && void 0 === (d = i.set(e, d, n))) ||
              (s ? l.setProperty(t, d) : (l[t] = d)));
      }
    },
    css: function (e, t, d, n) {
      var r,
        o,
        i,
        a = K(t);
      return (
        Ze.test(t) || (t = Ve(a)),
        (i = C.cssHooks[t] || C.cssHooks[a]) &&
          "get" in i &&
          (r = i.get(e, !0, d)),
        void 0 === r && (r = He(e, t, n)),
        "normal" === r && t in Ye && (r = Ye[t]),
        "" === d || d
          ? ((o = parseFloat(r)), !0 === d || isFinite(o) ? o || 0 : r)
          : r
      );
    },
  }),
    C.each(["height", "width"], function (e, t) {
      C.cssHooks[t] = {
        get: function (e, d, n) {
          if (d)
            return !Xe.test(C.css(e, "display")) ||
              (e.getClientRects().length && e.getBoundingClientRect().width)
              ? tt(e, t, n)
              : ae(e, Je, function () {
                  return tt(e, t, n);
                });
        },
        set: function (e, d, n) {
          var r,
            o = Ge(e),
            i = !$.scrollboxSize() && "absolute" === o.position,
            a = (i || n) && "border-box" === C.css(e, "boxSizing", !1, o),
            s = n ? et(e, t, n, a, o) : 0;
          return (
            a &&
              i &&
              (s -= Math.ceil(
                e["offset" + t[0].toUpperCase() + t.slice(1)] -
                  parseFloat(o[t]) -
                  et(e, t, "border", !1, o) -
                  0.5
              )),
            s &&
              (r = te.exec(d)) &&
              "px" !== (r[3] || "px") &&
              ((e.style[t] = d), (d = C.css(e, t))),
            Qe(0, d, s)
          );
        },
      };
    }),
    (C.cssHooks.marginLeft = ze($.reliableMarginLeft, function (e, t) {
      if (t)
        return (
          (parseFloat(He(e, "marginLeft")) ||
            e.getBoundingClientRect().left -
              ae(e, { marginLeft: 0 }, function () {
                return e.getBoundingClientRect().left;
              })) + "px"
        );
    })),
    C.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
      (C.cssHooks[e + t] = {
        expand: function (d) {
          for (
            var n = 0, r = {}, o = "string" == typeof d ? d.split(" ") : [d];
            n < 4;
            n++
          )
            r[e + de[n] + t] = o[n] || o[n - 2] || o[0];
          return r;
        },
      }),
        "margin" !== e && (C.cssHooks[e + t].set = Qe);
    }),
    C.fn.extend({
      css: function (e, t) {
        return U(
          this,
          function (e, t, d) {
            var n,
              r,
              o = {},
              i = 0;
            if (Array.isArray(t)) {
              for (n = Ge(e), r = t.length; i < r; i++)
                o[t[i]] = C.css(e, t[i], !1, n);
              return o;
            }
            return void 0 !== d ? C.style(e, t, d) : C.css(e, t);
          },
          e,
          t,
          arguments.length > 1
        );
      },
    }),
    (C.Tween = dt),
    ((dt.prototype = {
      constructor: dt,
      init: function (e, t, d, n, r, o) {
        (this.elem = e),
          (this.prop = d),
          (this.easing = r || C.easing._default),
          (this.options = t),
          (this.start = this.now = this.cur()),
          (this.end = n),
          (this.unit = o || (C.cssNumber[d] ? "" : "px"));
      },
      cur: function () {
        var e = dt.propHooks[this.prop];
        return e && e.get ? e.get(this) : dt.propHooks._default.get(this);
      },
      run: function (e) {
        var t,
          d = dt.propHooks[this.prop];
        return (
          (this.pos = t =
            this.options.duration
              ? C.easing[this.easing](
                  e,
                  this.options.duration * e,
                  0,
                  1,
                  this.options.duration
                )
              : e),
          (this.now = (this.end - this.start) * t + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          d && d.set ? d.set(this) : dt.propHooks._default.set(this),
          this
        );
      },
    }).init.prototype = dt.prototype),
    ((dt.propHooks = {
      _default: {
        get: function (e) {
          var t;
          return 1 !== e.elem.nodeType ||
            (null != e.elem[e.prop] && null == e.elem.style[e.prop])
            ? e.elem[e.prop]
            : (t = C.css(e.elem, e.prop, "")) && "auto" !== t
            ? t
            : 0;
        },
        set: function (e) {
          C.fx.step[e.prop]
            ? C.fx.step[e.prop](e)
            : 1 !== e.elem.nodeType ||
              (!C.cssHooks[e.prop] && null == e.elem.style[Ve(e.prop)])
            ? (e.elem[e.prop] = e.now)
            : C.style(e.elem, e.prop, e.now + e.unit);
        },
      },
    }).scrollTop = dt.propHooks.scrollLeft =
      {
        set: function (e) {
          e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        },
      }),
    (C.easing = {
      linear: function (e) {
        return e;
      },
      swing: function (e) {
        return 0.5 - Math.cos(e * Math.PI) / 2;
      },
      _default: "swing",
    }),
    (C.fx = dt.prototype.init),
    (C.fx.step = {});
  var nt,
    rt,
    ot = /^(?:toggle|show|hide)$/,
    it = /queueHooks$/;
  function at() {
    rt &&
      (!1 === n.hidden && e.requestAnimationFrame
        ? e.requestAnimationFrame(at)
        : e.setTimeout(at, C.fx.interval),
      C.fx.tick());
  }
  function st() {
    return (
      e.setTimeout(function () {
        nt = void 0;
      }),
      (nt = Date.now())
    );
  }
  function lt(e, t) {
    var d,
      n = 0,
      r = { height: e };
    for (t = t ? 1 : 0; n < 4; n += 2 - t)
      r["margin" + (d = de[n])] = r["padding" + d] = e;
    return t && (r.opacity = r.width = e), r;
  }
  function ut(e, t, d) {
    for (
      var n,
        r = (ct.tweeners[t] || []).concat(ct.tweeners["*"]),
        o = 0,
        i = r.length;
      o < i;
      o++
    )
      if ((n = r[o].call(d, t, e))) return n;
  }
  function ct(e, t, d) {
    var n,
      r,
      o = 0,
      i = ct.prefilters.length,
      a = C.Deferred().always(function () {
        delete s.elem;
      }),
      s = function () {
        if (r) return !1;
        for (
          var t = nt || st(),
            d = Math.max(0, l.startTime + l.duration - t),
            n = 1 - (d / l.duration || 0),
            o = 0,
            i = l.tweens.length;
          o < i;
          o++
        )
          l.tweens[o].run(n);
        return (
          a.notifyWith(e, [l, n, d]),
          n < 1 && i
            ? d
            : (i || a.notifyWith(e, [l, 1, 0]), a.resolveWith(e, [l]), !1)
        );
      },
      l = a.promise({
        elem: e,
        props: C.extend({}, t),
        opts: C.extend(!0, { specialEasing: {}, easing: C.easing._default }, d),
        originalProperties: t,
        originalOptions: d,
        startTime: nt || st(),
        duration: d.duration,
        tweens: [],
        createTween: function (t, d) {
          var n = C.Tween(
            e,
            l.opts,
            t,
            d,
            l.opts.specialEasing[t] || l.opts.easing
          );
          return l.tweens.push(n), n;
        },
        stop: function (t) {
          var d = 0,
            n = t ? l.tweens.length : 0;
          if (r) return this;
          for (r = !0; d < n; d++) l.tweens[d].run(1);
          return (
            t
              ? (a.notifyWith(e, [l, 1, 0]), a.resolveWith(e, [l, t]))
              : a.rejectWith(e, [l, t]),
            this
          );
        },
      }),
      u = l.props;
    for (
      (function (e, t) {
        var d, n, r, o, i;
        for (d in e)
          if (
            ((r = t[(n = K(d))]),
            (o = e[d]),
            Array.isArray(o) && ((r = o[1]), (o = e[d] = o[0])),
            d !== n && ((e[n] = o), delete e[d]),
            (i = C.cssHooks[n]) && ("expand" in i))
          )
            for (d in ((o = i.expand(o)), delete e[n], o))
              (d in e) || ((e[d] = o[d]), (t[d] = r));
          else t[n] = r;
      })(u, l.opts.specialEasing);
      o < i;
      o++
    )
      if ((n = ct.prefilters[o].call(l, e, u, l.opts)))
        return (
          p(n.stop) &&
            (C._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)),
          n
        );
    return (
      C.map(u, ut, l),
      p(l.opts.start) && l.opts.start.call(e, l),
      l
        .progress(l.opts.progress)
        .done(l.opts.done, l.opts.complete)
        .fail(l.opts.fail)
        .always(l.opts.always),
      C.fx.timer(C.extend(s, { elem: e, anim: l, queue: l.opts.queue })),
      l
    );
  }
  (C.Animation = C.extend(ct, {
    tweeners: {
      "*": [
        function (e, t) {
          var d = this.createTween(e, t);
          return se(d.elem, e, te.exec(t), d), d;
        },
      ],
    },
    tweener: function (e, t) {
      p(e) ? ((t = e), (e = ["*"])) : (e = e.match(_));
      for (var d, n = 0, r = e.length; n < r; n++)
        (ct.tweeners[(d = e[n])] = ct.tweeners[d] || []).unshift(t);
    },
    prefilters: [
      function (e, t, d) {
        var n,
          r,
          o,
          i,
          a,
          s,
          l,
          u,
          c = "width" in t || "height" in t,
          f = this,
          h = {},
          $ = e.style,
          p = e.nodeType && ie(e),
          m = X.get(e, "fxshow");
        for (n in (d.queue ||
          (null == (i = C._queueHooks(e, "fx")).unqueued &&
            ((i.unqueued = 0),
            (a = i.empty.fire),
            (i.empty.fire = function () {
              i.unqueued || a();
            })),
          i.unqueued++,
          f.always(function () {
            f.always(function () {
              i.unqueued--, C.queue(e, "fx").length || i.empty.fire();
            });
          })),
        t))
          if (ot.test((r = t[n]))) {
            if (
              (delete t[n],
              (o = o || "toggle" === r),
              r === (p ? "hide" : "show"))
            ) {
              if ("show" !== r || !m || void 0 === m[n]) continue;
              p = !0;
            }
            h[n] = (m && m[n]) || C.style(e, n);
          }
        if ((s = !C.isEmptyObject(t)) || !C.isEmptyObject(h))
          for (n in (c &&
            1 === e.nodeType &&
            ((d.overflow = [$.overflow, $.overflowX, $.overflowY]),
            null == (l = m && m.display) && (l = X.get(e, "display")),
            "none" === (u = C.css(e, "display")) &&
              (l
                ? (u = l)
                : (ce([e], !0),
                  (l = e.style.display || l),
                  (u = C.css(e, "display")),
                  ce([e]))),
            ("inline" === u || ("inline-block" === u && null != l)) &&
              "none" === C.css(e, "float") &&
              (s ||
                (f.done(function () {
                  $.display = l;
                }),
                null == l && (l = "none" === (u = $.display) ? "" : u)),
              ($.display = "inline-block"))),
          d.overflow &&
            (($.overflow = "hidden"),
            f.always(function () {
              ($.overflow = d.overflow[0]),
                ($.overflowX = d.overflow[1]),
                ($.overflowY = d.overflow[2]);
            })),
          (s = !1),
          h))
            s ||
              (m
                ? "hidden" in m && (p = m.hidden)
                : (m = X.access(e, "fxshow", { display: l })),
              o && (m.hidden = !p),
              p && ce([e], !0),
              f.done(function () {
                for (n in (p || ce([e]), X.remove(e, "fxshow"), h))
                  C.style(e, n, h[n]);
              })),
              (s = ut(p ? m[n] : 0, n, f)),
              n in m ||
                ((m[n] = s.start), p && ((s.end = s.start), (s.start = 0)));
      },
    ],
    prefilter: function (e, t) {
      t ? ct.prefilters.unshift(e) : ct.prefilters.push(e);
    },
  })),
    (C.speed = function (e, t, d) {
      var n =
        e && "object" == typeof e
          ? C.extend({}, e)
          : {
              complete: d || (!d && t) || (p(e) && e),
              duration: e,
              easing: (d && t) || (t && !p(t) && t),
            };
      return (
        C.fx.off
          ? (n.duration = 0)
          : "number" != typeof n.duration &&
            (n.duration =
              n.duration in C.fx.speeds
                ? C.fx.speeds[n.duration]
                : C.fx.speeds._default),
        (null != n.queue && !0 !== n.queue) || (n.queue = "fx"),
        (n.old = n.complete),
        (n.complete = function () {
          p(n.old) && n.old.call(this), n.queue && C.dequeue(this, n.queue);
        }),
        n
      );
    }),
    C.fn.extend({
      fadeTo: function (e, t, d, n) {
        return this.filter(ie)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: t }, e, d, n);
      },
      animate: function (e, t, d, n) {
        var r = C.isEmptyObject(e),
          o = C.speed(t, d, n),
          i = function () {
            var t = ct(this, C.extend({}, e), o);
            (r || X.get(this, "finish")) && t.stop(!0);
          };
        return (
          (i.finish = i),
          r || !1 === o.queue ? this.each(i) : this.queue(o.queue, i)
        );
      },
      stop: function (e, t, d) {
        var n = function (e) {
          var t = e.stop;
          delete e.stop, t(d);
        };
        return (
          "string" != typeof e && ((d = t), (t = e), (e = void 0)),
          t && !1 !== e && this.queue(e || "fx", []),
          this.each(function () {
            var t = !0,
              r = null != e && e + "queueHooks",
              o = C.timers,
              i = X.get(this);
            if (r) i[r] && i[r].stop && n(i[r]);
            else for (r in i) i[r] && i[r].stop && it.test(r) && n(i[r]);
            for (r = o.length; r--; )
              o[r].elem !== this ||
                (null != e && o[r].queue !== e) ||
                (o[r].anim.stop(d), (t = !1), o.splice(r, 1));
            (!t && d) || C.dequeue(this, e);
          })
        );
      },
      finish: function (e) {
        return (
          !1 !== e && (e = e || "fx"),
          this.each(function () {
            var t,
              d = X.get(this),
              n = d[e + "queue"],
              r = d[e + "queueHooks"],
              o = C.timers,
              i = n ? n.length : 0;
            for (
              d.finish = !0,
                C.queue(this, e, []),
                r && r.stop && r.stop.call(this, !0),
                t = o.length;
              t--;

            )
              o[t].elem === this &&
                o[t].queue === e &&
                (o[t].anim.stop(!0), o.splice(t, 1));
            for (t = 0; t < i; t++)
              n[t] && n[t].finish && n[t].finish.call(this);
            delete d.finish;
          })
        );
      },
    }),
    C.each(["toggle", "show", "hide"], function (e, t) {
      var d = C.fn[t];
      C.fn[t] = function (e, n, r) {
        return null == e || "boolean" == typeof e
          ? d.apply(this, arguments)
          : this.animate(lt(t, !0), e, n, r);
      };
    }),
    C.each(
      {
        slideDown: lt("show"),
        slideUp: lt("hide"),
        slideToggle: lt("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" },
      },
      function (e, t) {
        C.fn[e] = function (e, d, n) {
          return this.animate(t, e, d, n);
        };
      }
    ),
    (C.timers = []),
    (C.fx.tick = function () {
      var e,
        t = 0,
        d = C.timers;
      for (nt = Date.now(); t < d.length; t++)
        (e = d[t])() || d[t] !== e || d.splice(t--, 1);
      d.length || C.fx.stop(), (nt = void 0);
    }),
    (C.fx.timer = function (e) {
      C.timers.push(e), C.fx.start();
    }),
    (C.fx.interval = 13),
    (C.fx.start = function () {
      rt || ((rt = !0), at());
    }),
    (C.fx.stop = function () {
      rt = null;
    }),
    (C.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (C.fn.delay = function (t, d) {
      return (
        (t = (C.fx && C.fx.speeds[t]) || t),
        this.queue((d = d || "fx"), function (d, n) {
          var r = e.setTimeout(d, t);
          n.stop = function () {
            e.clearTimeout(r);
          };
        })
      );
    }),
    (function () {
      var e = n.createElement("input"),
        t = n.createElement("select").appendChild(n.createElement("option"));
      (e.type = "checkbox"),
        ($.checkOn = "" !== e.value),
        ($.optSelected = t.selected),
        ((e = n.createElement("input")).value = "t"),
        (e.type = "radio"),
        ($.radioValue = "t" === e.value);
    })();
  var ft,
    ht = C.expr.attrHandle;
  C.fn.extend({
    attr: function (e, t) {
      return U(this, C.attr, e, t, arguments.length > 1);
    },
    removeAttr: function (e) {
      return this.each(function () {
        C.removeAttr(this, e);
      });
    },
  }),
    C.extend({
      attr: function (e, t, d) {
        var n,
          r,
          o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return void 0 === e.getAttribute
            ? C.prop(e, t, d)
            : ((1 === o && C.isXMLDoc(e)) ||
                (r =
                  C.attrHooks[t.toLowerCase()] ||
                  (C.expr.match.bool.test(t) ? ft : void 0)),
              void 0 !== d
                ? null === d
                  ? void C.removeAttr(e, t)
                  : r && "set" in r && void 0 !== (n = r.set(e, d, t))
                  ? n
                  : (e.setAttribute(t, d + ""), d)
                : r && "get" in r && null !== (n = r.get(e, t))
                ? n
                : null == (n = C.find.attr(e, t))
                ? void 0
                : n);
      },
      attrHooks: {
        type: {
          set: function (e, t) {
            if (!$.radioValue && "radio" === t && S(e, "input")) {
              var d = e.value;
              return e.setAttribute("type", t), d && (e.value = d), t;
            }
          },
        },
      },
      removeAttr: function (e, t) {
        var d,
          n = 0,
          r = t && t.match(_);
        if (r && 1 === e.nodeType) for (; (d = r[n++]); ) e.removeAttribute(d);
      },
    }),
    (ft = {
      set: function (e, t, d) {
        return !1 === t ? C.removeAttr(e, d) : e.setAttribute(d, d), d;
      },
    }),
    C.each(C.expr.match.bool.source.match(/\w+/g), function (e, t) {
      var d = ht[t] || C.find.attr;
      ht[t] = function (e, t, n) {
        var r,
          o,
          i = t.toLowerCase();
        return (
          n ||
            ((o = ht[i]),
            (ht[i] = r),
            (r = null != d(e, t, n) ? i : null),
            (ht[i] = o)),
          r
        );
      };
    });
  var $t = /^(?:input|select|textarea|button)$/i,
    pt = /^(?:a|area)$/i;
  function mt(e) {
    return (e.match(_) || []).join(" ");
  }
  function gt(e) {
    return (e.getAttribute && e.getAttribute("class")) || "";
  }
  function vt(e) {
    return Array.isArray(e) ? e : ("string" == typeof e && e.match(_)) || [];
  }
  C.fn.extend({
    prop: function (e, t) {
      return U(this, C.prop, e, t, arguments.length > 1);
    },
    removeProp: function (e) {
      return this.each(function () {
        delete this[C.propFix[e] || e];
      });
    },
  }),
    C.extend({
      prop: function (e, t, d) {
        var n,
          r,
          o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return (
            (1 === o && C.isXMLDoc(e)) ||
              (r = C.propHooks[(t = C.propFix[t] || t)]),
            void 0 !== d
              ? r && "set" in r && void 0 !== (n = r.set(e, d, t))
                ? n
                : (e[t] = d)
              : r && "get" in r && null !== (n = r.get(e, t))
              ? n
              : e[t]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (e) {
            var t = C.find.attr(e, "tabindex");
            return t
              ? parseInt(t, 10)
              : $t.test(e.nodeName) || (pt.test(e.nodeName) && e.href)
              ? 0
              : -1;
          },
        },
      },
      propFix: { for: "htmlFor", class: "className" },
    }),
    $.optSelected ||
      (C.propHooks.selected = {
        get: function (e) {
          return null;
        },
        set: function (e) {},
      }),
    C.each(
      [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable",
      ],
      function () {
        C.propFix[this.toLowerCase()] = this;
      }
    ),
    C.fn.extend({
      addClass: function (e) {
        var t,
          d,
          n,
          r,
          o,
          i,
          a,
          s = 0;
        if (p(e))
          return this.each(function (t) {
            C(this).addClass(e.call(this, t, gt(this)));
          });
        if ((t = vt(e)).length)
          for (; (d = this[s++]); )
            if (((r = gt(d)), (n = 1 === d.nodeType && " " + mt(r) + " "))) {
              for (i = 0; (o = t[i++]); )
                n.indexOf(" " + o + " ") < 0 && (n += o + " ");
              r !== (a = mt(n)) && d.setAttribute("class", a);
            }
        return this;
      },
      removeClass: function (e) {
        var t,
          d,
          n,
          r,
          o,
          i,
          a,
          s = 0;
        if (p(e))
          return this.each(function (t) {
            C(this).removeClass(e.call(this, t, gt(this)));
          });
        if (!arguments.length) return this.attr("class", "");
        if ((t = vt(e)).length)
          for (; (d = this[s++]); )
            if (((r = gt(d)), (n = 1 === d.nodeType && " " + mt(r) + " "))) {
              for (i = 0; (o = t[i++]); )
                for (; n.indexOf(" " + o + " ") > -1; )
                  n = n.replace(" " + o + " ", " ");
              r !== (a = mt(n)) && d.setAttribute("class", a);
            }
        return this;
      },
      toggleClass: function (e, t) {
        var d = typeof e,
          n = "string" === d || Array.isArray(e);
        return "boolean" == typeof t && n
          ? t
            ? this.addClass(e)
            : this.removeClass(e)
          : p(e)
          ? this.each(function (d) {
              C(this).toggleClass(e.call(this, d, gt(this), t), t);
            })
          : this.each(function () {
              var t, r, o, i;
              if (n)
                for (r = 0, o = C(this), i = vt(e); (t = i[r++]); )
                  o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
              else
                (void 0 !== e && "boolean" !== d) ||
                  ((t = gt(this)) && X.set(this, "__className__", t),
                  this.setAttribute &&
                    this.setAttribute(
                      "class",
                      t || !1 === e ? "" : X.get(this, "__className__") || ""
                    ));
            });
      },
      hasClass: function (e) {
        var t,
          d,
          n = 0;
        for (t = " " + e + " "; (d = this[n++]); )
          if (1 === d.nodeType && (" " + mt(gt(d)) + " ").indexOf(t) > -1)
            return !0;
        return !1;
      },
    });
  var yt = /\r/g;
  C.fn.extend({
    val: function (e) {
      var t,
        d,
        n,
        r = this[0];
      return arguments.length
        ? ((n = p(e)),
          this.each(function (d) {
            var r;
            1 === this.nodeType &&
              (null == (r = n ? e.call(this, d, C(this).val()) : e)
                ? (r = "")
                : "number" == typeof r
                ? (r += "")
                : Array.isArray(r) &&
                  (r = C.map(r, function (e) {
                    return null == e ? "" : e + "";
                  })),
              ((t =
                C.valHooks[this.type] ||
                C.valHooks[this.nodeName.toLowerCase()]) &&
                "set" in t &&
                void 0 !== t.set(this, r, "value")) ||
                (this.value = r));
          }))
        : r
        ? (t = C.valHooks[r.type] || C.valHooks[r.nodeName.toLowerCase()]) &&
          "get" in t &&
          void 0 !== (d = t.get(r, "value"))
          ? d
          : "string" == typeof (d = r.value)
          ? d.replace(yt, "")
          : null == d
          ? ""
          : d
        : void 0;
    },
  }),
    C.extend({
      valHooks: {
        option: {
          get: function (e) {
            var t = C.find.attr(e, "value");
            return null != t ? t : mt(C.text(e));
          },
        },
        select: {
          get: function (e) {
            var t,
              d,
              n,
              r = e.options,
              o = e.selectedIndex,
              i = "select-one" === e.type,
              a = i ? null : [],
              s = i ? o + 1 : r.length;
            for (n = o < 0 ? s : i ? o : 0; n < s; n++)
              if (
                ((d = r[n]).selected || n === o) &&
                !d.disabled &&
                (!d.parentNode.disabled || !S(d.parentNode, "optgroup"))
              ) {
                if (((t = C(d).val()), i)) return t;
                a.push(t);
              }
            return a;
          },
          set: function (e, t) {
            for (
              var d, n, r = e.options, o = C.makeArray(t), i = r.length;
              i--;

            )
              ((n = r[i]).selected =
                C.inArray(C.valHooks.option.get(n), o) > -1) && (d = !0);
            return d || (e.selectedIndex = -1), o;
          },
        },
      },
    }),
    C.each(["radio", "checkbox"], function () {
      (C.valHooks[this] = {
        set: function (e, t) {
          if (Array.isArray(t))
            return (e.checked = C.inArray(C(e).val(), t) > -1);
        },
      }),
        $.checkOn ||
          (C.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value;
          });
    }),
    ($.focusin = "onfocusin" in e);
  var Ct = /^(?:focusinfocus|focusoutblur)$/,
    bt = function (e) {
      e.stopPropagation();
    };
  C.extend(C.event, {
    trigger: function (t, d, r, o) {
      var i,
        a,
        s,
        l,
        u,
        f,
        h,
        $,
        g = [r || n],
        v = c.call(t, "type") ? t.type : t,
        y = c.call(t, "namespace") ? t.namespace.split(".") : [];
      if (
        ((a = $ = s = r = r || n),
        3 !== r.nodeType &&
          8 !== r.nodeType &&
          !Ct.test(v + C.event.triggered) &&
          (v.indexOf(".") > -1 && ((v = (y = v.split(".")).shift()), y.sort()),
          (u = v.indexOf(":") < 0 && "on" + v),
          ((t = t[C.expando]
            ? t
            : new C.Event(v, "object" == typeof t && t)).isTrigger = o ? 2 : 3),
          (t.namespace = y.join(".")),
          (t.rnamespace = t.namespace
            ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (t.result = void 0),
          t.target || (t.target = r),
          (d = null == d ? [t] : C.makeArray(d, [t])),
          (h = C.event.special[v] || {}),
          o || !h.trigger || !1 !== h.trigger.apply(r, d)))
      ) {
        if (!o && !h.noBubble && !m(r)) {
          for (
            Ct.test((l = h.delegateType || v) + v) || (a = a.parentNode);
            a;
            a = a.parentNode
          )
            g.push(a), (s = a);
          s === (r.ownerDocument || n) &&
            g.push(s.defaultView || s.parentWindow || e);
        }
        for (i = 0; (a = g[i++]) && !t.isPropagationStopped(); )
          ($ = a),
            (t.type = i > 1 ? l : h.bindType || v),
            (f = (X.get(a, "events") || {})[t.type] && X.get(a, "handle")) &&
              f.apply(a, d),
            (f = u && a[u]) &&
              f.apply &&
              q(a) &&
              ((t.result = f.apply(a, d)),
              !1 === t.result && t.preventDefault());
        return (
          (t.type = v),
          o ||
            t.isDefaultPrevented() ||
            (h._default && !1 !== h._default.apply(g.pop(), d)) ||
            !q(r) ||
            (u &&
              p(r[v]) &&
              !m(r) &&
              ((s = r[u]) && (r[u] = null),
              (C.event.triggered = v),
              t.isPropagationStopped() && $.addEventListener(v, bt),
              r[v](),
              t.isPropagationStopped() && $.removeEventListener(v, bt),
              (C.event.triggered = void 0),
              s && (r[u] = s))),
          t.result
        );
      }
    },
    simulate: function (e, t, d) {
      var n = C.extend(new C.Event(), d, { type: e, isSimulated: !0 });
      C.event.trigger(n, null, t);
    },
  }),
    C.fn.extend({
      trigger: function (e, t) {
        return this.each(function () {
          C.event.trigger(e, t, this);
        });
      },
      triggerHandler: function (e, t) {
        var d = this[0];
        if (d) return C.event.trigger(e, t, d, !0);
      },
    }),
    $.focusin ||
      C.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
        var d = function (e) {
          C.event.simulate(t, e.target, C.event.fix(e));
        };
        C.event.special[t] = {
          setup: function () {
            var n = this.ownerDocument || this,
              r = X.access(n, t);
            r || n.addEventListener(e, d, !0), X.access(n, t, (r || 0) + 1);
          },
          teardown: function () {
            var n = this.ownerDocument || this,
              r = X.access(n, t) - 1;
            r
              ? X.access(n, t, r)
              : (n.removeEventListener(e, d, !0), X.remove(n, t));
          },
        };
      });
  var wt = e.location,
    kt = Date.now(),
    Bt = /\?/;
  C.parseXML = function (t) {
    var d;
    if (!t || "string" != typeof t) return null;
    try {
      d = new e.DOMParser().parseFromString(t, "text/xml");
    } catch (e) {
      d = void 0;
    }
    return (
      (d && !d.getElementsByTagName("parsererror").length) ||
        C.error("Invalid XML: " + t),
      d
    );
  };
  var xt = /\[\]$/,
    Pt = /\r?\n/g,
    St = /^(?:submit|button|image|reset|file)$/i,
    At = /^(?:input|select|textarea|keygen)/i;
  function Lt(e, t, d, n) {
    var r;
    if (Array.isArray(t))
      C.each(t, function (t, r) {
        d || xt.test(e)
          ? n(e, r)
          : Lt(
              e + "[" + ("object" == typeof r && null != r ? t : "") + "]",
              r,
              d,
              n
            );
      });
    else if (d || "object" !== y(t)) n(e, t);
    else for (r in t) Lt(e + "[" + r + "]", t[r], d, n);
  }
  (C.param = function (e, t) {
    var d,
      n = [],
      r = function (e, t) {
        var d = p(t) ? t() : t;
        n[n.length] =
          encodeURIComponent(e) + "=" + encodeURIComponent(null == d ? "" : d);
      };
    if (null == e) return "";
    if (Array.isArray(e) || (e.jquery && !C.isPlainObject(e)))
      C.each(e, function () {
        r(this.name, this.value);
      });
    else for (d in e) Lt(d, e[d], t, r);
    return n.join("&");
  }),
    C.fn.extend({
      serialize: function () {
        return C.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var e = C.prop(this, "elements");
          return e ? C.makeArray(e) : this;
        })
          .filter(function () {
            var e = this.type;
            return (
              this.name &&
              !C(this).is(":disabled") &&
              At.test(this.nodeName) &&
              !St.test(e) &&
              (this.checked || !fe.test(e))
            );
          })
          .map(function (e, t) {
            var d = C(this).val();
            return null == d
              ? null
              : Array.isArray(d)
              ? C.map(d, function (e) {
                  return { name: t.name, value: e.replace(Pt, "\r\n") };
                })
              : { name: t.name, value: d.replace(Pt, "\r\n") };
          })
          .get();
      },
    });
  var Tt = /%20/g,
    Mt = /#.*$/,
    It = /([?&])_=[^&]*/,
    Et = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    Nt = /^(?:GET|HEAD)$/,
    _t = /^\/\//,
    Dt = {},
    Ot = {},
    Rt = "*/".concat("*"),
    Ft = n.createElement("a");
  function jt(e) {
    return function (t, d) {
      "string" != typeof t && ((d = t), (t = "*"));
      var n,
        r = 0,
        o = t.toLowerCase().match(_) || [];
      if (p(d))
        for (; (n = o[r++]); )
          "+" === n[0]
            ? ((n = n.slice(1) || "*"), (e[n] = e[n] || []).unshift(d))
            : (e[n] = e[n] || []).push(d);
    };
  }
  function Gt(e, t, d, n) {
    var r = {},
      o = e === Ot;
    function i(a) {
      var s;
      return (
        (r[a] = !0),
        C.each(e[a] || [], function (e, a) {
          var l = a(t, d, n);
          return "string" != typeof l || o || r[l]
            ? o
              ? !(s = l)
              : void 0
            : (t.dataTypes.unshift(l), i(l), !1);
        }),
        s
      );
    }
    return i(t.dataTypes[0]) || (!r["*"] && i("*"));
  }
  function Ut(e, t) {
    var d,
      n,
      r = C.ajaxSettings.flatOptions || {};
    for (d in t) void 0 !== t[d] && ((r[d] ? e : n || (n = {}))[d] = t[d]);
    return n && C.extend(!0, e, n), e;
  }
  (Ft.href = wt.href),
    C.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: wt.href,
        type: "GET",
        isLocal:
          /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
            wt.protocol
          ),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": Rt,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON",
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": JSON.parse,
          "text xml": C.parseXML,
        },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (e, t) {
        return t ? Ut(Ut(e, C.ajaxSettings), t) : Ut(C.ajaxSettings, e);
      },
      ajaxPrefilter: jt(Dt),
      ajaxTransport: jt(Ot),
      ajax: function (t, d) {
        "object" == typeof t && ((d = t), (t = void 0));
        var r,
          o,
          i,
          a,
          s,
          l,
          u,
          c,
          f,
          h,
          $ = C.ajaxSetup({}, (d = d || {})),
          p = $.context || $,
          m = $.context && (p.nodeType || p.jquery) ? C(p) : C.event,
          g = C.Deferred(),
          v = C.Callbacks("once memory"),
          y = $.statusCode || {},
          b = {},
          w = {},
          k = "canceled",
          B = {
            readyState: 0,
            getResponseHeader: function (e) {
              var t;
              if (u) {
                if (!a)
                  for (a = {}; (t = Et.exec(i)); )
                    a[t[1].toLowerCase() + " "] = (
                      a[t[1].toLowerCase() + " "] || []
                    ).concat(t[2]);
                t = a[e.toLowerCase() + " "];
              }
              return null == t ? null : t.join(", ");
            },
            getAllResponseHeaders: function () {
              return u ? i : null;
            },
            setRequestHeader: function (e, t) {
              return (
                null == u &&
                  ((e = w[e.toLowerCase()] = w[e.toLowerCase()] || e),
                  (b[e] = t)),
                this
              );
            },
            overrideMimeType: function (e) {
              return null == u && ($.mimeType = e), this;
            },
            statusCode: function (e) {
              var t;
              if (e)
                if (u) B.always(e[B.status]);
                else for (t in e) y[t] = [y[t], e[t]];
              return this;
            },
            abort: function (e) {
              var t = e || k;
              return r && r.abort(t), x(0, t), this;
            },
          };
        if (
          (g.promise(B),
          ($.url = ((t || $.url || wt.href) + "").replace(
            _t,
            wt.protocol + "//"
          )),
          ($.type = d.method || d.type || $.method || $.type),
          ($.dataTypes = ($.dataType || "*").toLowerCase().match(_) || [""]),
          null == $.crossDomain)
        ) {
          l = n.createElement("a");
          try {
            (l.href = $.url),
              (l.href = l.href),
              ($.crossDomain =
                Ft.protocol + "//" + Ft.host != l.protocol + "//" + l.host);
          } catch (e) {
            $.crossDomain = !0;
          }
        }
        if (
          ($.data &&
            $.processData &&
            "string" != typeof $.data &&
            ($.data = C.param($.data, $.traditional)),
          Gt(Dt, $, d, B),
          u)
        )
          return B;
        for (f in ((c = C.event && $.global) &&
          0 == C.active++ &&
          C.event.trigger("ajaxStart"),
        ($.type = $.type.toUpperCase()),
        ($.hasContent = !Nt.test($.type)),
        (o = $.url.replace(Mt, "")),
        $.hasContent
          ? $.data &&
            $.processData &&
            0 ===
              ($.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) &&
            ($.data = $.data.replace(Tt, "+"))
          : ((h = $.url.slice(o.length)),
            $.data &&
              ($.processData || "string" == typeof $.data) &&
              ((o += (Bt.test(o) ? "&" : "?") + $.data), delete $.data),
            !1 === $.cache &&
              ((o = o.replace(It, "$1")),
              (h = (Bt.test(o) ? "&" : "?") + "_=" + kt++ + h)),
            ($.url = o + h)),
        $.ifModified &&
          (C.lastModified[o] &&
            B.setRequestHeader("If-Modified-Since", C.lastModified[o]),
          C.etag[o] && B.setRequestHeader("If-None-Match", C.etag[o])),
        (($.data && $.hasContent && !1 !== $.contentType) || d.contentType) &&
          B.setRequestHeader("Content-Type", $.contentType),
        B.setRequestHeader(
          "Accept",
          $.dataTypes[0] && $.accepts[$.dataTypes[0]]
            ? $.accepts[$.dataTypes[0]] +
                ("*" !== $.dataTypes[0] ? ", " + Rt + "; q=0.01" : "")
            : $.accepts["*"]
        ),
        $.headers))
          B.setRequestHeader(f, $.headers[f]);
        if ($.beforeSend && (!1 === $.beforeSend.call(p, B, $) || u))
          return B.abort();
        if (
          ((k = "abort"),
          v.add($.complete),
          B.done($.success),
          B.fail($.error),
          (r = Gt(Ot, $, d, B)))
        ) {
          if (((B.readyState = 1), c && m.trigger("ajaxSend", [B, $]), u))
            return B;
          $.async &&
            $.timeout > 0 &&
            (s = e.setTimeout(function () {
              B.abort("timeout");
            }, $.timeout));
          try {
            (u = !1), r.send(b, x);
          } catch (e) {
            if (u) throw e;
            x(-1, e);
          }
        } else x(-1, "No Transport");
        function x(t, d, n, a) {
          var l,
            f,
            h,
            b,
            w,
            k = d;
          u ||
            ((u = !0),
            s && e.clearTimeout(s),
            (r = void 0),
            (i = a || ""),
            (B.readyState = t > 0 ? 4 : 0),
            (l = (t >= 200 && t < 300) || 304 === t),
            n &&
              (b = (function (e, t, d) {
                for (
                  var n, r, o, i, a = e.contents, s = e.dataTypes;
                  "*" === s[0];

                )
                  s.shift(),
                    void 0 === n &&
                      (n = e.mimeType || t.getResponseHeader("Content-Type"));
                if (n)
                  for (r in a)
                    if (a[r] && a[r].test(n)) {
                      s.unshift(r);
                      break;
                    }
                if (s[0] in d) o = s[0];
                else {
                  for (r in d) {
                    if (!s[0] || e.converters[r + " " + s[0]]) {
                      o = r;
                      break;
                    }
                    i || (i = r);
                  }
                  o = o || i;
                }
                if (o) return o !== s[0] && s.unshift(o), d[o];
              })($, B, n)),
            (b = (function (e, t, d, n) {
              var r,
                o,
                i,
                a,
                s,
                l = {},
                u = e.dataTypes.slice();
              if (u[1])
                for (i in e.converters) l[i.toLowerCase()] = e.converters[i];
              for (o = u.shift(); o; )
                if (
                  (e.responseFields[o] && (d[e.responseFields[o]] = t),
                  !s && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                  (s = o),
                  (o = u.shift()))
                )
                  if ("*" === o) o = s;
                  else if ("*" !== s && s !== o) {
                    if (!(i = l[s + " " + o] || l["* " + o]))
                      for (r in l)
                        if (
                          (a = r.split(" "))[1] === o &&
                          (i = l[s + " " + a[0]] || l["* " + a[0]])
                        ) {
                          !0 === i
                            ? (i = l[r])
                            : !0 !== l[r] && ((o = a[0]), u.unshift(a[1]));
                          break;
                        }
                    if (!0 !== i)
                      if (i && e.throws) t = i(t);
                      else
                        try {
                          t = i(t);
                        } catch (e) {
                          return {
                            state: "parsererror",
                            error: i
                              ? e
                              : "No conversion from " + s + " to " + o,
                          };
                        }
                  }
              return { state: "success", data: t };
            })($, b, B, l)),
            l
              ? ($.ifModified &&
                  ((w = B.getResponseHeader("Last-Modified")) &&
                    (C.lastModified[o] = w),
                  (w = B.getResponseHeader("etag")) && (C.etag[o] = w)),
                204 === t || "HEAD" === $.type
                  ? (k = "nocontent")
                  : 304 === t
                  ? (k = "notmodified")
                  : ((k = b.state), (f = b.data), (l = !(h = b.error))))
              : ((h = k), (!t && k) || ((k = "error"), t < 0 && (t = 0))),
            (B.status = t),
            (B.statusText = (d || k) + ""),
            l ? g.resolveWith(p, [f, k, B]) : g.rejectWith(p, [B, k, h]),
            B.statusCode(y),
            (y = void 0),
            c && m.trigger(l ? "ajaxSuccess" : "ajaxError", [B, $, l ? f : h]),
            v.fireWith(p, [B, k]),
            c &&
              (m.trigger("ajaxComplete", [B, $]),
              --C.active || C.event.trigger("ajaxStop")));
        }
        return B;
      },
      getJSON: function (e, t, d) {
        return C.get(e, t, d, "json");
      },
      getScript: function (e, t) {
        return C.get(e, void 0, t, "script");
      },
    }),
    C.each(["get", "post"], function (e, t) {
      C[t] = function (e, d, n, r) {
        return (
          p(d) && ((r = r || n), (n = d), (d = void 0)),
          C.ajax(
            C.extend(
              { url: e, type: t, dataType: r, data: d, success: n },
              C.isPlainObject(e) && e
            )
          )
        );
      };
    }),
    (C._evalUrl = function (e, t) {
      return C.ajax({
        url: e,
        type: "GET",
        dataType: "script",
        cache: !0,
        async: !1,
        global: !1,
        converters: { "text script": function () {} },
        dataFilter: function (e) {
          C.globalEval(e, t);
        },
      });
    }),
    C.fn.extend({
      wrapAll: function (e) {
        var t;
        return (
          this[0] &&
            (p(e) && (e = e.call(this[0])),
            (t = C(e, this[0].ownerDocument).eq(0).clone(!0)),
            this[0].parentNode && t.insertBefore(this[0]),
            t
              .map(function () {
                for (var e = this; e.firstElementChild; )
                  e = e.firstElementChild;
                return e;
              })
              .append(this)),
          this
        );
      },
      wrapInner: function (e) {
        return p(e)
          ? this.each(function (t) {
              C(this).wrapInner(e.call(this, t));
            })
          : this.each(function () {
              var t = C(this),
                d = t.contents();
              d.length ? d.wrapAll(e) : t.append(e);
            });
      },
      wrap: function (e) {
        var t = p(e);
        return this.each(function (d) {
          C(this).wrapAll(t ? e.call(this, d) : e);
        });
      },
      unwrap: function (e) {
        return (
          this.parent(e)
            .not("body")
            .each(function () {
              C(this).replaceWith(this.childNodes);
            }),
          this
        );
      },
    }),
    (C.expr.pseudos.hidden = function (e) {
      return !C.expr.pseudos.visible(e);
    }),
    (C.expr.pseudos.visible = function (e) {
      return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }),
    (C.ajaxSettings.xhr = function () {
      try {
        return new e.XMLHttpRequest();
      } catch (e) {}
    });
  var Ht = { 0: 200, 1223: 204 },
    zt = C.ajaxSettings.xhr();
  ($.cors = !!zt && "withCredentials" in zt),
    ($.ajax = zt = !!zt),
    C.ajaxTransport(function (t) {
      var d, n;
      if ($.cors || (zt && !t.crossDomain))
        return {
          send: function (r, o) {
            var i,
              a = t.xhr();
            if (
              (a.open(t.type, t.url, t.async, t.username, t.password),
              t.xhrFields)
            )
              for (i in t.xhrFields) a[i] = t.xhrFields[i];
            for (i in (t.mimeType &&
              a.overrideMimeType &&
              a.overrideMimeType(t.mimeType),
            t.crossDomain ||
              r["X-Requested-With"] ||
              (r["X-Requested-With"] = "XMLHttpRequest"),
            r))
              a.setRequestHeader(i, r[i]);
            (d = function (e) {
              return function () {
                d &&
                  ((d =
                    n =
                    a.onload =
                    a.onerror =
                    a.onabort =
                    a.ontimeout =
                    a.onreadystatechange =
                      null),
                  "abort" === e
                    ? a.abort()
                    : "error" === e
                    ? "number" != typeof a.status
                      ? o(0, "error")
                      : o(a.status, a.statusText)
                    : o(
                        Ht[a.status] || a.status,
                        a.statusText,
                        "text" !== (a.responseType || "text") ||
                          "string" != typeof a.responseText
                          ? { binary: a.response }
                          : { text: a.responseText },
                        a.getAllResponseHeaders()
                      ));
              };
            }),
              (a.onload = d()),
              (n = a.onerror = a.ontimeout = d("error")),
              void 0 !== a.onabort
                ? (a.onabort = n)
                : (a.onreadystatechange = function () {
                    4 === a.readyState &&
                      e.setTimeout(function () {
                        d && n();
                      });
                  }),
              (d = d("abort"));
            try {
              a.send((t.hasContent && t.data) || null);
            } catch (e) {
              if (d) throw e;
            }
          },
          abort: function () {
            d && d();
          },
        };
    }),
    C.ajaxPrefilter(function (e) {
      e.crossDomain && (e.contents.script = !1);
    }),
    C.ajaxSetup({
      accepts: {
        script:
          "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
      },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        "text script": function (e) {
          return C.globalEval(e), e;
        },
      },
    }),
    C.ajaxPrefilter("script", function (e) {
      void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
    }),
    C.ajaxTransport("script", function (e) {
      var t, d;
      if (e.crossDomain || e.scriptAttrs)
        return {
          send: function (r, o) {
            (t = C("<script>")
              .attr(e.scriptAttrs || {})
              .prop({ charset: e.scriptCharset, src: e.url })
              .on(
                "load error",
                (d = function (e) {
                  t.remove(),
                    (d = null),
                    e && o("error" === e.type ? 404 : 200, e.type);
                })
              )),
              n.head.appendChild(t[0]);
          },
          abort: function () {
            d && d();
          },
        };
    });
  var Wt,
    Kt = [],
    qt = /(=)\?(?=&|$)|\?\?/;
  C.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var e = Kt.pop() || C.expando + "_" + kt++;
      return (this[e] = !0), e;
    },
  }),
    C.ajaxPrefilter("json jsonp", function (t, d, n) {
      var r,
        o,
        i,
        a =
          !1 !== t.jsonp &&
          (qt.test(t.url)
            ? "url"
            : "string" == typeof t.data &&
              0 ===
                (t.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              qt.test(t.data) &&
              "data");
      if (a || "jsonp" === t.dataTypes[0])
        return (
          (r = t.jsonpCallback =
            p(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
          a
            ? (t[a] = t[a].replace(qt, "$1" + r))
            : !1 !== t.jsonp &&
              (t.url += (Bt.test(t.url) ? "&" : "?") + t.jsonp + "=" + r),
          (t.converters["script json"] = function () {
            return i || C.error(r + " was not called"), i[0];
          }),
          (t.dataTypes[0] = "json"),
          (o = e[r]),
          (e[r] = function () {
            i = arguments;
          }),
          n.always(function () {
            void 0 === o ? C(e).removeProp(r) : (e[r] = o),
              t[r] && ((t.jsonpCallback = d.jsonpCallback), Kt.push(r)),
              i && p(o) && o(i[0]),
              (i = o = void 0);
          }),
          "script"
        );
    }),
    ($.createHTMLDocument =
      (((Wt = n.implementation.createHTMLDocument("").body).innerHTML =
        "<form></form><form></form>"),
      2 === Wt.childNodes.length)),
    (C.parseHTML = function (e, t, d) {
      return "string" != typeof e
        ? []
        : ("boolean" == typeof t && ((d = t), (t = !1)),
          t ||
            ($.createHTMLDocument
              ? (((r = (t =
                  n.implementation.createHTMLDocument("")).createElement(
                  "base"
                )).href = n.location.href),
                t.head.appendChild(r))
              : (t = n)),
          (o = A.exec(e)),
          (i = !d && []),
          o
            ? [t.createElement(o[1])]
            : ((o = be([e], t, i)),
              i && i.length && C(i).remove(),
              C.merge([], o.childNodes)));
      var r, o, i;
    }),
    (C.fn.load = function (e, t, d) {
      var n,
        r,
        o,
        i = this,
        a = e.indexOf(" ");
      return (
        a > -1 && ((n = mt(e.slice(a))), (e = e.slice(0, a))),
        p(t)
          ? ((d = t), (t = void 0))
          : t && "object" == typeof t && (r = "POST"),
        i.length > 0 &&
          C.ajax({ url: e, type: r || "GET", dataType: "html", data: t })
            .done(function (e) {
              (o = arguments),
                i.html(n ? C("<div>").append(C.parseHTML(e)).find(n) : e);
            })
            .always(
              d &&
                function (e, t) {
                  i.each(function () {
                    d.apply(this, o || [e.responseText, t, e]);
                  });
                }
            ),
        this
      );
    }),
    C.each(
      [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend",
      ],
      function (e, t) {
        C.fn[t] = function (e) {
          return this.on(t, e);
        };
      }
    ),
    (C.expr.pseudos.animated = function (e) {
      return C.grep(C.timers, function (t) {
        return e === t.elem;
      }).length;
    }),
    (C.offset = {
      setOffset: function (e, t, d) {
        var n,
          r,
          o,
          i,
          a,
          s,
          l = C.css(e, "position"),
          u = C(e),
          c = {};
        "static" === l && (e.style.position = "relative"),
          (a = u.offset()),
          (o = C.css(e, "top")),
          (s = C.css(e, "left")),
          ("absolute" === l || "fixed" === l) && (o + s).indexOf("auto") > -1
            ? ((i = (n = u.position()).top), (r = n.left))
            : ((i = parseFloat(o) || 0), (r = parseFloat(s) || 0)),
          p(t) && (t = t.call(e, d, C.extend({}, a))),
          null != t.top && (c.top = t.top - a.top + i),
          null != t.left && (c.left = t.left - a.left + r),
          "using" in t ? t.using.call(e, c) : u.css(c);
      },
    }),
    C.fn.extend({
      offset: function (e) {
        if (arguments.length)
          return void 0 === e
            ? this
            : this.each(function (t) {
                C.offset.setOffset(this, e, t);
              });
        var t,
          d,
          n = this[0];
        return n
          ? n.getClientRects().length
            ? {
                top:
                  (t = n.getBoundingClientRect()).top +
                  (d = n.ownerDocument.defaultView).pageYOffset,
                left: t.left + d.pageXOffset,
              }
            : { top: 0, left: 0 }
          : void 0;
      },
      position: function () {
        if (this[0]) {
          var e,
            t,
            d,
            n = this[0],
            r = { top: 0, left: 0 };
          if ("fixed" === C.css(n, "position")) t = n.getBoundingClientRect();
          else {
            for (
              t = this.offset(),
                d = n.ownerDocument,
                e = n.offsetParent || d.documentElement;
              e &&
              (e === d.body || e === d.documentElement) &&
              "static" === C.css(e, "position");

            )
              e = e.parentNode;
            e &&
              e !== n &&
              1 === e.nodeType &&
              (((r = C(e).offset()).top += C.css(e, "borderTopWidth", !0)),
              (r.left += C.css(e, "borderLeftWidth", !0)));
          }
          return {
            top: t.top - r.top - C.css(n, "marginTop", !0),
            left: t.left - r.left - C.css(n, "marginLeft", !0),
          };
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (
            var e = this.offsetParent;
            e && "static" === C.css(e, "position");

          )
            e = e.offsetParent;
          return e || ne;
        });
      },
    }),
    C.each(
      { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
      function (e, t) {
        var d = "pageYOffset" === t;
        C.fn[e] = function (n) {
          return U(
            this,
            function (e, n, r) {
              var o;
              if (
                (m(e) ? (o = e) : 9 === e.nodeType && (o = e.defaultView),
                void 0 === r)
              )
                return o ? o[t] : e[n];
              o
                ? o.scrollTo(d ? o.pageXOffset : r, d ? r : o.pageYOffset)
                : (e[n] = r);
            },
            e,
            n,
            arguments.length
          );
        };
      }
    ),
    C.each(["top", "left"], function (e, t) {
      C.cssHooks[t] = ze($.pixelPosition, function (e, d) {
        if (d)
          return (d = He(e, t)), je.test(d) ? C(e).position()[t] + "px" : d;
      });
    }),
    C.each({ Height: "height", Width: "width" }, function (e, t) {
      C.each(
        { padding: "inner" + e, content: t, "": "outer" + e },
        function (d, n) {
          C.fn[n] = function (r, o) {
            var i = arguments.length && (d || "boolean" != typeof r),
              a = d || (!0 === r || !0 === o ? "margin" : "border");
            return U(
              this,
              function (t, d, r) {
                var o;
                return m(t)
                  ? 0 === n.indexOf("outer")
                    ? t["inner" + e]
                    : t.document.documentElement["client" + e]
                  : 9 === t.nodeType
                  ? ((o = t.documentElement),
                    Math.max(
                      t.body["scroll" + e],
                      o["scroll" + e],
                      t.body["offset" + e],
                      o["offset" + e],
                      o["client" + e]
                    ))
                  : void 0 === r
                  ? C.css(t, d, a)
                  : C.style(t, d, r, a);
              },
              t,
              i ? r : void 0,
              i
            );
          };
        }
      );
    }),
    C.each(
      "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
        " "
      ),
      function (e, t) {
        C.fn[t] = function (e, d) {
          return arguments.length > 0
            ? this.on(t, null, e, d)
            : this.trigger(t);
        };
      }
    ),
    C.fn.extend({
      hover: function (e, t) {
        return this.mouseenter(e).mouseleave(t || e);
      },
    }),
    C.fn.extend({
      bind: function (e, t, d) {
        return this.on(e, null, t, d);
      },
      unbind: function (e, t) {
        return this.off(e, null, t);
      },
      delegate: function (e, t, d, n) {
        return this.on(t, e, d, n);
      },
      undelegate: function (e, t, d) {
        return 1 === arguments.length
          ? this.off(e, "**")
          : this.off(t, e || "**", d);
      },
    }),
    (C.proxy = function (e, t) {
      var d, n, r;
      if (("string" == typeof t && ((d = e[t]), (t = e), (e = d)), p(e)))
        return (
          (n = o.call(arguments, 2)),
          ((r = function () {
            return e.apply(t || this, n.concat(o.call(arguments)));
          }).guid = e.guid =
            e.guid || C.guid++),
          r
        );
    }),
    (C.holdReady = function (e) {
      e ? C.readyWait++ : C.ready(!0);
    }),
    (C.isArray = Array.isArray),
    (C.parseJSON = JSON.parse),
    (C.nodeName = S),
    (C.isFunction = p),
    (C.isWindow = m),
    (C.camelCase = K),
    (C.type = y),
    (C.now = Date.now),
    (C.isNumeric = function (e) {
      var t = C.type(e);
      return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
    }),
    "function" == typeof define &&
      define.amd &&
      define("jquery", [], function () {
        return C;
      });
  var Vt = e.jQuery,
    Xt = e.$;
  return (
    (C.noConflict = function (t) {
      return e.$ === C && (e.$ = Xt), t && e.jQuery === C && (e.jQuery = Vt), C;
    }),
    t || (e.jQuery = e.$ = C),
    C
  );
}),
  (function (e) {
    var t = (function (e, t, d) {
      "use strict";
      return (function () {
        for (
          var d = [
              [
                "Afghanistan (\u202b\u0627\u0641\u063a\u0627\u0646\u0633\u062a\u0627\u0646\u202c\u200e)",
                "af",
                "93",
              ],
              ["Albania (Shqip\xebri)", "al", "355"],
              [
                "Algeria (\u202b\u0627\u0644\u062c\u0632\u0627\u0626\u0631\u202c\u200e)",
                "dz",
                "213",
              ],
              ["American Samoa", "as", "1684"],
              ["Andorra", "ad", "376"],
              ["Angola", "ao", "244"],
              ["Anguilla", "ai", "1264"],
              ["Antigua and Barbuda", "ag", "1268"],
              ["Argentina", "ar", "54"],
              [
                "Armenia (\u0540\u0561\u0575\u0561\u057d\u057f\u0561\u0576)",
                "am",
                "374",
              ],
              ["Aruba", "aw", "297"],
              ["Australia", "au", "61", 0],
              ["Austria (\xd6sterreich)", "at", "43"],
              ["Azerbaijan (Az\u0259rbaycan)", "az", "994"],
              ["Bahamas", "bs", "1242"],
              [
                "Bahrain (\u202b\u0627\u0644\u0628\u062d\u0631\u064a\u0646\u202c\u200e)",
                "bh",
                "973",
              ],
              [
                "Bangladesh (\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6)",
                "bd",
                "880",
              ],
              ["Barbados", "bb", "1246"],
              [
                "Belarus (\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u044c)",
                "by",
                "375",
              ],
              ["Belgium (Belgi\xeb)", "be", "32"],
              ["Belize", "bz", "501"],
              ["Benin (B\xe9nin)", "bj", "229"],
              ["Bermuda", "bm", "1441"],
              ["Bhutan (\u0f60\u0f56\u0fb2\u0f74\u0f42)", "bt", "975"],
              ["Bolivia", "bo", "591"],
              [
                "Bosnia and Herzegovina (\u0411\u043e\u0441\u043d\u0430 \u0438 \u0425\u0435\u0440\u0446\u0435\u0433\u043e\u0432\u0438\u043d\u0430)",
                "ba",
                "387",
              ],
              ["Botswana", "bw", "267"],
              ["Brazil (Brasil)", "br", "55"],
              ["British Indian Ocean Territory", "io", "246"],
              ["British Virgin Islands", "vg", "1284"],
              ["Brunei", "bn", "673"],
              [
                "Bulgaria (\u0411\u044a\u043b\u0433\u0430\u0440\u0438\u044f)",
                "bg",
                "359",
              ],
              ["Burkina Faso", "bf", "226"],
              ["Burundi (Uburundi)", "bi", "257"],
              [
                "Cambodia (\u1780\u1798\u17d2\u1796\u17bb\u1787\u17b6)",
                "kh",
                "855",
              ],
              ["Cameroon (Cameroun)", "cm", "237"],
              [
                "Canada",
                "ca",
                "1",
                1,
                [
                  "204",
                  "226",
                  "236",
                  "249",
                  "250",
                  "289",
                  "306",
                  "343",
                  "365",
                  "387",
                  "403",
                  "416",
                  "418",
                  "431",
                  "437",
                  "438",
                  "450",
                  "506",
                  "514",
                  "519",
                  "548",
                  "579",
                  "581",
                  "587",
                  "604",
                  "613",
                  "639",
                  "647",
                  "672",
                  "705",
                  "709",
                  "742",
                  "778",
                  "780",
                  "782",
                  "807",
                  "819",
                  "825",
                  "867",
                  "873",
                  "902",
                  "905",
                ],
              ],
              ["Cape Verde (Kabu Verdi)", "cv", "238"],
              ["Caribbean Netherlands", "bq", "599", 1],
              ["Cayman Islands", "ky", "1345"],
              [
                "Central African Republic (R\xe9publique centrafricaine)",
                "cf",
                "236",
              ],
              ["Chad (Tchad)", "td", "235"],
              ["Chile", "cl", "56"],
              ["China (\u4e2d\u56fd)", "cn", "86"],
              ["Christmas Island", "cx", "61", 2],
              ["Cocos (Keeling) Islands", "cc", "61", 1],
              ["Colombia", "co", "57"],
              [
                "Comoros (\u202b\u062c\u0632\u0631 \u0627\u0644\u0642\u0645\u0631\u202c\u200e)",
                "km",
                "269",
              ],
              ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243"],
              ["Congo (Republic) (Congo-Brazzaville)", "cg", "242"],
              ["Cook Islands", "ck", "682"],
              ["Costa Rica", "cr", "506"],
              ["C\xf4te d\u2019Ivoire", "ci", "225"],
              ["Croatia (Hrvatska)", "hr", "385"],
              ["Cuba", "cu", "53"],
              ["Cura\xe7ao", "cw", "599", 0],
              ["Cyprus (\u039a\u03cd\u03c0\u03c1\u03bf\u03c2)", "cy", "357"],
              ["Czech Republic (\u010cesk\xe1 republika)", "cz", "420"],
              ["Denmark (Danmark)", "dk", "45"],
              ["Djibouti", "dj", "253"],
              ["Dominica", "dm", "1767"],
              [
                "Dominican Republic (Rep\xfablica Dominicana)",
                "do",
                "1",
                2,
                ["809", "829", "849"],
              ],
              ["Ecuador", "ec", "593"],
              ["Egypt (\u202b\u0645\u0635\u0631\u202c\u200e)", "eg", "20"],
              ["El Salvador", "sv", "503"],
              ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240"],
              ["Eritrea", "er", "291"],
              ["Estonia (Eesti)", "ee", "372"],
              ["Ethiopia", "et", "251"],
              ["Falkland Islands (Islas Malvinas)", "fk", "500"],
              ["Faroe Islands (F\xf8royar)", "fo", "298"],
              ["Fiji", "fj", "679"],
              ["Finland (Suomi)", "fi", "358", 0],
              ["France", "fr", "33"],
              ["French Guiana (Guyane fran\xe7aise)", "gf", "594"],
              ["French Polynesia (Polyn\xe9sie fran\xe7aise)", "pf", "689"],
              ["Gabon", "ga", "241"],
              ["Gambia", "gm", "220"],
              [
                "Georgia (\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd)",
                "ge",
                "995",
              ],
              ["Germany (Deutschland)", "de", "49"],
              ["Ghana (Gaana)", "gh", "233"],
              ["Gibraltar", "gi", "350"],
              ["Greece (\u0395\u03bb\u03bb\u03ac\u03b4\u03b1)", "gr", "30"],
              ["Greenland (Kalaallit Nunaat)", "gl", "299"],
              ["Grenada", "gd", "1473"],
              ["Guadeloupe", "gp", "590", 0],
              ["Guam", "gu", "1671"],
              ["Guatemala", "gt", "502"],
              ["Guernsey", "gg", "44", 1],
              ["Guinea (Guin\xe9e)", "gn", "224"],
              ["Guinea-Bissau (Guin\xe9 Bissau)", "gw", "245"],
              ["Guyana", "gy", "592"],
              ["Haiti", "ht", "509"],
              ["Honduras", "hn", "504"],
              ["Hong Kong (\u9999\u6e2f)", "hk", "852"],
              ["Hungary (Magyarorsz\xe1g)", "hu", "36"],
              ["Iceland (\xcdsland)", "is", "354"],
              ["India (\u092d\u093e\u0930\u0924)", "in", "91"],
              ["Indonesia", "id", "62"],
              [
                "Iran (\u202b\u0627\u06cc\u0631\u0627\u0646\u202c\u200e)",
                "ir",
                "98",
              ],
              [
                "Iraq (\u202b\u0627\u0644\u0639\u0631\u0627\u0642\u202c\u200e)",
                "iq",
                "964",
              ],
              ["Ireland", "ie", "353"],
              ["Isle of Man", "im", "44", 2],
              [
                "Israel (\u202b\u05d9\u05e9\u05e8\u05d0\u05dc\u202c\u200e)",
                "il",
                "972",
              ],
              ["Italy (Italia)", "it", "39", 0],
              ["Jamaica", "jm", "1", 4, ["876", "658"]],
              ["Japan (\u65e5\u672c)", "jp", "81"],
              ["Jersey", "je", "44", 3],
              [
                "Jordan (\u202b\u0627\u0644\u0623\u0631\u062f\u0646\u202c\u200e)",
                "jo",
                "962",
              ],
              [
                "Kazakhstan (\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d)",
                "kz",
                "7",
                1,
              ],
              ["Kenya", "ke", "254"],
              ["Kiribati", "ki", "686"],
              ["Kosovo", "xk", "383"],
              [
                "Kuwait (\u202b\u0627\u0644\u0643\u0648\u064a\u062a\u202c\u200e)",
                "kw",
                "965",
              ],
              [
                "Kyrgyzstan (\u041a\u044b\u0440\u0433\u044b\u0437\u0441\u0442\u0430\u043d)",
                "kg",
                "996",
              ],
              ["Laos (\u0ea5\u0eb2\u0ea7)", "la", "856"],
              ["Latvia (Latvija)", "lv", "371"],
              [
                "Lebanon (\u202b\u0644\u0628\u0646\u0627\u0646\u202c\u200e)",
                "lb",
                "961",
              ],
              ["Lesotho", "ls", "266"],
              ["Liberia", "lr", "231"],
              [
                "Libya (\u202b\u0644\u064a\u0628\u064a\u0627\u202c\u200e)",
                "ly",
                "218",
              ],
              ["Liechtenstein", "li", "423"],
              ["Lithuania (Lietuva)", "lt", "370"],
              ["Luxembourg", "lu", "352"],
              ["Macau (\u6fb3\u9580)", "mo", "853"],
              [
                "Macedonia (FYROM) (\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0438\u0458\u0430)",
                "mk",
                "389",
              ],
              ["Madagascar (Madagasikara)", "mg", "261"],
              ["Malawi", "mw", "265"],
              ["Malaysia", "my", "60"],
              ["Maldives", "mv", "960"],
              ["Mali", "ml", "223"],
              ["Malta", "mt", "356"],
              ["Marshall Islands", "mh", "692"],
              ["Martinique", "mq", "596"],
              [
                "Mauritania (\u202b\u0645\u0648\u0631\u064a\u062a\u0627\u0646\u064a\u0627\u202c\u200e)",
                "mr",
                "222",
              ],
              ["Mauritius (Moris)", "mu", "230"],
              ["Mayotte", "yt", "262", 1],
              ["Mexico (M\xe9xico)", "mx", "52"],
              ["Micronesia", "fm", "691"],
              ["Moldova (Republica Moldova)", "md", "373"],
              ["Monaco", "mc", "377"],
              ["Mongolia (\u041c\u043e\u043d\u0433\u043e\u043b)", "mn", "976"],
              ["Montenegro (Crna Gora)", "me", "382"],
              ["Montserrat", "ms", "1664"],
              [
                "Morocco (\u202b\u0627\u0644\u0645\u063a\u0631\u0628\u202c\u200e)",
                "ma",
                "212",
                0,
              ],
              ["Mozambique (Mo\xe7ambique)", "mz", "258"],
              [
                "Myanmar (Burma) (\u1019\u103c\u1014\u103a\u1019\u102c)",
                "mm",
                "95",
              ],
              ["Namibia (Namibi\xeb)", "na", "264"],
              ["Nauru", "nr", "674"],
              ["Nepal (\u0928\u0947\u092a\u093e\u0932)", "np", "977"],
              ["Netherlands (Nederland)", "nl", "31"],
              ["New Caledonia (Nouvelle-Cal\xe9donie)", "nc", "687"],
              ["New Zealand", "nz", "64"],
              ["Nicaragua", "ni", "505"],
              ["Niger (Nijar)", "ne", "227"],
              ["Nigeria", "ng", "234"],
              ["Niue", "nu", "683"],
              ["Norfolk Island", "nf", "672"],
              [
                "North Korea (\uc870\uc120 \ubbfc\uc8fc\uc8fc\uc758 \uc778\ubbfc \uacf5\ud654\uad6d)",
                "kp",
                "850",
              ],
              ["Northern Mariana Islands", "mp", "1670"],
              ["Norway (Norge)", "no", "47", 0],
              [
                "Oman (\u202b\u0639\u064f\u0645\u0627\u0646\u202c\u200e)",
                "om",
                "968",
              ],
              [
                "Pakistan (\u202b\u067e\u0627\u06a9\u0633\u062a\u0627\u0646\u202c\u200e)",
                "pk",
                "92",
              ],
              ["Palau", "pw", "680"],
              [
                "Palestine (\u202b\u0641\u0644\u0633\u0637\u064a\u0646\u202c\u200e)",
                "ps",
                "970",
              ],
              ["Panama (Panam\xe1)", "pa", "507"],
              ["Papua New Guinea", "pg", "675"],
              ["Paraguay", "py", "595"],
              ["Peru (Per\xfa)", "pe", "51"],
              ["Philippines", "ph", "63"],
              ["Poland (Polska)", "pl", "48"],
              ["Portugal", "pt", "351"],
              ["Puerto Rico", "pr", "1", 3, ["787", "939"]],
              ["Qatar (\u202b\u0642\u0637\u0631\u202c\u200e)", "qa", "974"],
              ["R\xe9union (La R\xe9union)", "re", "262", 0],
              ["Romania (Rom\xe2nia)", "ro", "40"],
              ["Russia (\u0420\u043e\u0441\u0441\u0438\u044f)", "ru", "7", 0],
              ["Rwanda", "rw", "250"],
              ["Saint Barth\xe9lemy", "bl", "590", 1],
              ["Saint Helena", "sh", "290"],
              ["Saint Kitts and Nevis", "kn", "1869"],
              ["Saint Lucia", "lc", "1758"],
              [
                "Saint Martin (Saint-Martin (partie fran\xe7aise))",
                "mf",
                "590",
                2,
              ],
              [
                "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)",
                "pm",
                "508",
              ],
              ["Saint Vincent and the Grenadines", "vc", "1784"],
              ["Samoa", "ws", "685"],
              ["San Marino", "sm", "378"],
              [
                "S\xe3o Tom\xe9 and Pr\xedncipe (S\xe3o Tom\xe9 e Pr\xedncipe)",
                "st",
                "239",
              ],
              [
                "Saudi Arabia (\u202b\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629\u202c\u200e)",
                "sa",
                "966",
              ],
              ["Senegal (S\xe9n\xe9gal)", "sn", "221"],
              ["Serbia (\u0421\u0440\u0431\u0438\u0458\u0430)", "rs", "381"],
              ["Seychelles", "sc", "248"],
              ["Sierra Leone", "sl", "232"],
              ["Singapore", "sg", "65"],
              ["Sint Maarten", "sx", "1721"],
              ["Slovakia (Slovensko)", "sk", "421"],
              ["Slovenia (Slovenija)", "si", "386"],
              ["Solomon Islands", "sb", "677"],
              ["Somalia (Soomaaliya)", "so", "252"],
              ["South Africa", "za", "27"],
              ["South Korea (\ub300\ud55c\ubbfc\uad6d)", "kr", "82"],
              [
                "South Sudan (\u202b\u062c\u0646\u0648\u0628 \u0627\u0644\u0633\u0648\u062f\u0627\u0646\u202c\u200e)",
                "ss",
                "211",
              ],
              ["Spain (Espa\xf1a)", "es", "34"],
              [
                "Sri Lanka (\u0dc1\u0dca\u200d\u0dbb\u0dd3 \u0dbd\u0d82\u0d9a\u0dcf\u0dc0)",
                "lk",
                "94",
              ],
              [
                "Sudan (\u202b\u0627\u0644\u0633\u0648\u062f\u0627\u0646\u202c\u200e)",
                "sd",
                "249",
              ],
              ["Suriname", "sr", "597"],
              ["Svalbard and Jan Mayen", "sj", "47", 1],
              ["Swaziland", "sz", "268"],
              ["Sweden (Sverige)", "se", "46"],
              ["Switzerland (Schweiz)", "ch", "41"],
              [
                "Syria (\u202b\u0633\u0648\u0631\u064a\u0627\u202c\u200e)",
                "sy",
                "963",
              ],
              ["Taiwan (\u53f0\u7063)", "tw", "886"],
              ["Tajikistan", "tj", "992"],
              ["Tanzania", "tz", "255"],
              ["Thailand (\u0e44\u0e17\u0e22)", "th", "66"],
              ["Timor-Leste", "tl", "670"],
              ["Togo", "tg", "228"],
              ["Tokelau", "tk", "690"],
              ["Tonga", "to", "676"],
              ["Trinidad and Tobago", "tt", "1868"],
              [
                "Tunisia (\u202b\u062a\u0648\u0646\u0633\u202c\u200e)",
                "tn",
                "216",
              ],
              ["Turkey (T\xfcrkiye)", "tr", "90"],
              ["Turkmenistan", "tm", "993"],
              ["Turks and Caicos Islands", "tc", "1649"],
              ["Tuvalu", "tv", "688"],
              ["U.S. Virgin Islands", "vi", "1340"],
              ["Uganda", "ug", "256"],
              [
                "Ukraine (\u0423\u043a\u0440\u0430\u0457\u043d\u0430)",
                "ua",
                "380",
              ],
              [
                "United Arab Emirates (\u202b\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0645\u062a\u062d\u062f\u0629\u202c\u200e)",
                "ae",
                "971",
              ],
              ["United Kingdom", "gb", "44", 0],
              ["United States", "us", "1", 0],
              ["Uruguay", "uy", "598"],
              ["Uzbekistan (O\u02bbzbekiston)", "uz", "998"],
              ["Vanuatu", "vu", "678"],
              ["Vatican City (Citt\xe0 del Vaticano)", "va", "39", 1],
              ["Venezuela", "ve", "58"],
              ["Vietnam (Vi\u1ec7t Nam)", "vn", "84"],
              ["Wallis and Futuna (Wallis-et-Futuna)", "wf", "681"],
              [
                "Western Sahara (\u202b\u0627\u0644\u0635\u062d\u0631\u0627\u0621 \u0627\u0644\u063a\u0631\u0628\u064a\u0629\u202c\u200e)",
                "eh",
                "212",
                1,
              ],
              [
                "Yemen (\u202b\u0627\u0644\u064a\u0645\u0646\u202c\u200e)",
                "ye",
                "967",
              ],
              ["Zambia", "zm", "260"],
              ["Zimbabwe", "zw", "263"],
              ["\xc5land Islands", "ax", "358", 1],
            ],
            n = 0;
          n < d.length;
          n++
        ) {
          var r = d[n];
          d[n] = {
            name: r[0],
            iso2: r[1],
            dialCode: r[2],
            priority: r[3] || 0,
            areaCodes: r[4] || null,
          };
        }
        e.intlTelInputGlobals = {
          getInstance: function (t) {
            var d = t.getAttribute("data-intl-tel-input-id");
            return e.intlTelInputGlobals.instances[d];
          },
          instances: {},
        };
        var o = 0,
          i = {
            allowDropdown: !0,
            autoHideDialCode: !0,
            autoPlaceholder: "polite",
            customContainer: "",
            customPlaceholder: null,
            dropdownContainer: null,
            excludeCountries: [],
            formatOnDisplay: !0,
            geoIpLookup: null,
            hiddenInput: "",
            initialCountry: "",
            localizedCountries: null,
            nationalMode: !0,
            onlyCountries: [],
            placeholderNumberType: "MOBILE",
            preferredCountries: ["us", "gb"],
            separateDialCode: !1,
            utilsScript: "",
          },
          a = [
            "800",
            "822",
            "833",
            "844",
            "855",
            "866",
            "877",
            "880",
            "881",
            "882",
            "883",
            "884",
            "885",
            "886",
            "887",
            "888",
            "889",
          ];
        e.addEventListener("load", function () {
          e.intlTelInputGlobals.windowLoaded = !0;
        });
        var s = function (e, t) {
            for (var d = Object.keys(e), n = 0; n < d.length; n++)
              t(d[n], e[d[n]]);
          },
          l = function (t) {
            s(e.intlTelInputGlobals.instances, function (d) {
              e.intlTelInputGlobals.instances[d][t]();
            });
          },
          u = (function () {
            function n(e, t) {
              var d = this;
              !(function (e, t) {
                if (!(e instanceof n))
                  throw new TypeError("Cannot call a class as a function");
              })(this),
                (this.id = o++),
                (this.telInput = e),
                (this.activeItem = null),
                (this.highlightedItem = null);
              var r = t || {};
              (this.options = {}),
                s(i, function (e, t) {
                  d.options[e] = r.hasOwnProperty(e) ? r[e] : t;
                }),
                (this.hadInitialPlaceholder = Boolean(
                  e.getAttribute("placeholder")
                ));
            }
            return (
              (r = [
                {
                  key: "_init",
                  value: function () {
                    var e = this;
                    if (
                      (this.options.nationalMode &&
                        (this.options.autoHideDialCode = !1),
                      this.options.separateDialCode &&
                        (this.options.autoHideDialCode =
                          this.options.nationalMode =
                            !1),
                      (this.isMobile =
                        /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                          navigator.userAgent
                        )),
                      this.isMobile &&
                        (t.body.classList.add("iti-mobile"),
                        this.options.dropdownContainer ||
                          (this.options.dropdownContainer = t.body)),
                      "undefined" != typeof Promise)
                    ) {
                      var d = new Promise(function (t, d) {
                          (e.resolveAutoCountryPromise = t),
                            (e.rejectAutoCountryPromise = d);
                        }),
                        n = new Promise(function (t, d) {
                          (e.resolveUtilsScriptPromise = t),
                            (e.rejectUtilsScriptPromise = d);
                        });
                      this.promise = Promise.all([d, n]);
                    } else
                      (this.resolveAutoCountryPromise =
                        this.rejectAutoCountryPromise =
                          function () {}),
                        (this.resolveUtilsScriptPromise =
                          this.rejectUtilsScriptPromise =
                            function () {});
                    (this.selectedCountryData = {}),
                      this._processCountryData(),
                      this._generateMarkup(),
                      this._setInitialState(),
                      this._initListeners(),
                      this._initRequests();
                  },
                },
                {
                  key: "_processCountryData",
                  value: function () {
                    this._processAllCountries(),
                      this._processCountryCodes(),
                      this._processPreferredCountries(),
                      this.options.localizedCountries &&
                        this._translateCountriesByLocale(),
                      (this.options.onlyCountries.length ||
                        this.options.localizedCountries) &&
                        this.countries.sort(this._countryNameSort);
                  },
                },
                {
                  key: "_addCountryCode",
                  value: function (e, t, d) {
                    this.countryCodes.hasOwnProperty(t) ||
                      (this.countryCodes[t] = []),
                      (this.countryCodes[t][d || 0] = e);
                  },
                },
                {
                  key: "_processAllCountries",
                  value: function () {
                    if (this.options.onlyCountries.length) {
                      var e = this.options.onlyCountries.map(function (e) {
                        return e.toLowerCase();
                      });
                      this.countries = d.filter(function (t) {
                        return e.indexOf(t.iso2) > -1;
                      });
                    } else if (this.options.excludeCountries.length) {
                      var t = this.options.excludeCountries.map(function (e) {
                        return e.toLowerCase();
                      });
                      this.countries = d.filter(function (e) {
                        return -1 === t.indexOf(e.iso2);
                      });
                    } else this.countries = d;
                  },
                },
                {
                  key: "_translateCountriesByLocale",
                  value: function () {
                    for (var e = 0; e < this.countries.length; e++) {
                      var t = this.countries[e].iso2.toLowerCase();
                      this.options.localizedCountries.hasOwnProperty(t) &&
                        (this.countries[e].name =
                          this.options.localizedCountries[t]);
                    }
                  },
                },
                {
                  key: "_countryNameSort",
                  value: function (e, t) {
                    return e.name.localeCompare(t.name);
                  },
                },
                {
                  key: "_processCountryCodes",
                  value: function () {
                    this.countryCodes = {};
                    for (var e = 0; e < this.countries.length; e++) {
                      var t = this.countries[e];
                      if (
                        (this._addCountryCode(t.iso2, t.dialCode, t.priority),
                        t.areaCodes)
                      )
                        for (var d = 0; d < t.areaCodes.length; d++)
                          this._addCountryCode(
                            t.iso2,
                            t.dialCode + t.areaCodes[d]
                          );
                    }
                  },
                },
                {
                  key: "_processPreferredCountries",
                  value: function () {
                    this.preferredCountries = [];
                    for (
                      var e = 0;
                      e < this.options.preferredCountries.length;
                      e++
                    ) {
                      var t = this.options.preferredCountries[e].toLowerCase(),
                        d = this._getCountryData(t, !1, !0);
                      d && this.preferredCountries.push(d);
                    }
                  },
                },
                {
                  key: "_createEl",
                  value: function (e, d, n) {
                    var r = t.createElement(e);
                    return (
                      d &&
                        s(d, function (e, t) {
                          return r.setAttribute(e, t);
                        }),
                      n && n.appendChild(r),
                      r
                    );
                  },
                },
                {
                  key: "_generateMarkup",
                  value: function () {
                    this.telInput.setAttribute("autocomplete", "off");
                    var e = "intl-tel-input";
                    this.options.allowDropdown && (e += " allow-dropdown"),
                      this.options.separateDialCode &&
                        (e += " separate-dial-code"),
                      this.options.customContainer &&
                        ((e += " "), (e += this.options.customContainer));
                    var t = this._createEl("div", { class: e });
                    if (
                      (this.telInput.parentNode.insertBefore(t, this.telInput),
                      (this.flagsContainer = this._createEl(
                        "div",
                        { class: "flag-container" },
                        t
                      )),
                      t.appendChild(this.telInput),
                      (this.selectedFlag = this._createEl(
                        "div",
                        {
                          class: "selected-flag",
                          role: "combobox",
                          "aria-owns": "country-listbox",
                        },
                        this.flagsContainer
                      )),
                      (this.selectedFlagInner = this._createEl(
                        "div",
                        { class: "iti-flag" },
                        this.selectedFlag
                      )),
                      this.options.separateDialCode &&
                        (this.selectedDialCode = this._createEl(
                          "div",
                          { class: "selected-dial-code" },
                          this.selectedFlag
                        )),
                      this.options.allowDropdown &&
                        (this.selectedFlag.setAttribute("tabindex", "0"),
                        (this.dropdownArrow = this._createEl(
                          "div",
                          { class: "iti-arrow" },
                          this.selectedFlag
                        )),
                        (this.countryList = this._createEl("ul", {
                          class: "country-list hide",
                          id: "country-listbox",
                          "aria-expanded": "false",
                          role: "listbox",
                        })),
                        this.preferredCountries.length &&
                          (this._appendListItems(
                            this.preferredCountries,
                            "preferred"
                          ),
                          this._createEl(
                            "li",
                            {
                              class: "divider",
                              role: "separator",
                              "aria-disabled": "true",
                            },
                            this.countryList
                          )),
                        this._appendListItems(this.countries, "standard"),
                        this.options.dropdownContainer
                          ? ((this.dropdown = this._createEl("div", {
                              class: "intl-tel-input iti-container",
                            })),
                            this.dropdown.appendChild(this.countryList))
                          : this.flagsContainer.appendChild(this.countryList)),
                      this.options.hiddenInput)
                    ) {
                      var d = this.options.hiddenInput,
                        n = this.telInput.getAttribute("name");
                      if (n) {
                        var r = n.lastIndexOf("[");
                        -1 !== r &&
                          (d = "".concat(n.substr(0, r), "[").concat(d, "]"));
                      }
                      (this.hiddenInput = this._createEl("input", {
                        type: "hidden",
                        name: d,
                      })),
                        t.appendChild(this.hiddenInput);
                    }
                  },
                },
                {
                  key: "_appendListItems",
                  value: function (e, t) {
                    for (var d = "", n = 0; n < e.length; n++) {
                      var r = e[n];
                      (d += "<li class='country "
                        .concat(t, "' id='iti-item-")
                        .concat(r.iso2, "' role='option' data-dial-code='")
                        .concat(r.dialCode, "' data-country-code='")
                        .concat(r.iso2, "'>")),
                        (d +=
                          "<div class='flag-box'><div class='iti-flag ".concat(
                            r.iso2,
                            "'></div></div>"
                          )),
                        (d += "<span class='country-name'>".concat(
                          r.name,
                          "</span>"
                        )),
                        (d += "<span class='dial-code'>+".concat(
                          r.dialCode,
                          "</span>"
                        )),
                        (d += "</li>");
                    }
                    this.countryList.insertAdjacentHTML("beforeend", d);
                  },
                },
                {
                  key: "_setInitialState",
                  value: function () {
                    var e = this.telInput.value,
                      t = this._getDialCode(e),
                      d = this._isRegionlessNanp(e),
                      n = this.options,
                      r = n.initialCountry,
                      o = n.nationalMode,
                      i = n.autoHideDialCode,
                      a = n.separateDialCode;
                    t && !d
                      ? this._updateFlagFromNumber(e)
                      : "auto" !== r &&
                        (r
                          ? this._setFlag(r.toLowerCase())
                          : t && d
                          ? this._setFlag("us")
                          : ((this.defaultCountry = this.preferredCountries
                              .length
                              ? this.preferredCountries[0].iso2
                              : this.countries[0].iso2),
                            e || this._setFlag(this.defaultCountry)),
                        e ||
                          o ||
                          i ||
                          a ||
                          (this.telInput.value = "+".concat(
                            this.selectedCountryData.dialCode
                          ))),
                      e && this._updateValFromNumber(e);
                  },
                },
                {
                  key: "_initListeners",
                  value: function () {
                    this._initKeyListeners(),
                      this.options.autoHideDialCode &&
                        this._initBlurListeners(),
                      this.options.allowDropdown &&
                        this._initDropdownListeners(),
                      this.hiddenInput && this._initHiddenInputListener();
                  },
                },
                {
                  key: "_initHiddenInputListener",
                  value: function () {
                    var e = this;
                    (this._handleHiddenInputSubmit = function () {
                      e.hiddenInput.value = e.getNumber();
                    }),
                      this.telInput.form &&
                        this.telInput.form.addEventListener(
                          "submit",
                          this._handleHiddenInputSubmit
                        );
                  },
                },
                {
                  key: "_getClosestLabel",
                  value: function () {
                    for (var e = this.telInput; e && "LABEL" !== e.tagName; )
                      e = e.parentNode;
                    return e;
                  },
                },
                {
                  key: "_initDropdownListeners",
                  value: function () {
                    var e = this;
                    this._handleLabelClick = function (t) {
                      e.countryList.classList.contains("hide")
                        ? e.telInput.focus()
                        : t.preventDefault();
                    };
                    var t = this._getClosestLabel();
                    t && t.addEventListener("click", this._handleLabelClick),
                      (this._handleClickSelectedFlag = function () {
                        !e.countryList.classList.contains("hide") ||
                          e.telInput.disabled ||
                          e.telInput.readOnly ||
                          e._showDropdown();
                      }),
                      this.selectedFlag.addEventListener(
                        "click",
                        this._handleClickSelectedFlag
                      ),
                      (this._handleFlagsContainerKeydown = function (t) {
                        e.countryList.classList.contains("hide") &&
                          -1 !==
                            ["ArrowUp", "ArrowDown", " ", "Enter"].indexOf(
                              t.key
                            ) &&
                          (t.preventDefault(),
                          t.stopPropagation(),
                          e._showDropdown()),
                          "Tab" === t.key && e._closeDropdown();
                      }),
                      this.flagsContainer.addEventListener(
                        "keydown",
                        this._handleFlagsContainerKeydown
                      );
                  },
                },
                {
                  key: "_initRequests",
                  value: function () {
                    var t = this;
                    this.options.utilsScript && !e.intlTelInputUtils
                      ? e.intlTelInputGlobals.windowLoaded
                        ? e.intlTelInputGlobals.loadUtils(
                            this.options.utilsScript
                          )
                        : e.addEventListener("load", function () {
                            e.intlTelInputGlobals.loadUtils(
                              t.options.utilsScript
                            );
                          })
                      : this.resolveUtilsScriptPromise(),
                      "auto" === this.options.initialCountry
                        ? this._loadAutoCountry()
                        : this.resolveAutoCountryPromise();
                  },
                },
                {
                  key: "_loadAutoCountry",
                  value: function () {
                    e.intlTelInputGlobals.autoCountry
                      ? this.handleAutoCountry()
                      : e.intlTelInputGlobals.startedLoadingAutoCountry ||
                        ((e.intlTelInputGlobals.startedLoadingAutoCountry = !0),
                        "function" == typeof this.options.geoIpLookup &&
                          this.options.geoIpLookup(
                            function (t) {
                              (e.intlTelInputGlobals.autoCountry =
                                t.toLowerCase()),
                                setTimeout(function () {
                                  return l("handleAutoCountry");
                                });
                            },
                            function () {
                              return l("rejectAutoCountryPromise");
                            }
                          ));
                  },
                },
                {
                  key: "_initKeyListeners",
                  value: function () {
                    var e = this;
                    (this._handleKeyupEvent = function () {
                      e._updateFlagFromNumber(e.telInput.value) &&
                        e._triggerCountryChange();
                    }),
                      this.telInput.addEventListener(
                        "keyup",
                        this._handleKeyupEvent
                      ),
                      (this._handleClipboardEvent = function () {
                        setTimeout(e._handleKeyupEvent);
                      }),
                      this.telInput.addEventListener(
                        "cut",
                        this._handleClipboardEvent
                      ),
                      this.telInput.addEventListener(
                        "paste",
                        this._handleClipboardEvent
                      );
                  },
                },
                {
                  key: "_cap",
                  value: function (e) {
                    var t = this.telInput.getAttribute("maxlength");
                    return t && e.length > t ? e.substr(0, t) : e;
                  },
                },
                {
                  key: "_initBlurListeners",
                  value: function () {
                    var e = this;
                    (this._handleSubmitOrBlurEvent = function () {
                      e._removeEmptyDialCode();
                    }),
                      this.telInput.form &&
                        this.telInput.form.addEventListener(
                          "submit",
                          this._handleSubmitOrBlurEvent
                        ),
                      this.telInput.addEventListener(
                        "blur",
                        this._handleSubmitOrBlurEvent
                      );
                  },
                },
                {
                  key: "_removeEmptyDialCode",
                  value: function () {
                    if ("+" === this.telInput.value.charAt(0)) {
                      var e = this._getNumeric(this.telInput.value);
                      (e && this.selectedCountryData.dialCode !== e) ||
                        (this.telInput.value = "");
                    }
                  },
                },
                {
                  key: "_getNumeric",
                  value: function (e) {
                    return e.replace(/\D/g, "");
                  },
                },
                {
                  key: "_trigger",
                  value: function (e) {
                    var d = t.createEvent("Event");
                    d.initEvent(e, !0, !0), this.telInput.dispatchEvent(d);
                  },
                },
                {
                  key: "_showDropdown",
                  value: function () {
                    this.countryList.classList.remove("hide"),
                      this.countryList.setAttribute("aria-expanded", "true"),
                      this._setDropdownPosition(),
                      this.activeItem &&
                        (this._highlightListItem(this.activeItem),
                        this._scrollTo(this.activeItem)),
                      this._bindDropdownListeners(),
                      this.dropdownArrow.classList.add("up"),
                      this._trigger("open:countrydropdown");
                  },
                },
                {
                  key: "_toggleClass",
                  value: function (e, t, d) {
                    d && !e.classList.contains(t)
                      ? e.classList.add(t)
                      : !d && e.classList.contains(t) && e.classList.remove(t);
                  },
                },
                {
                  key: "_setDropdownPosition",
                  value: function () {
                    var d = this;
                    if (
                      (this.options.dropdownContainer &&
                        this.options.dropdownContainer.appendChild(
                          this.dropdown
                        ),
                      !this.isMobile)
                    ) {
                      var n = this.telInput.getBoundingClientRect(),
                        r = e.pageYOffset || t.documentElement.scrollTop,
                        o = n.top + r,
                        i = this.countryList.offsetHeight,
                        a =
                          o + this.telInput.offsetHeight + i <
                          r + e.innerHeight,
                        s = o - i > r;
                      this._toggleClass(this.countryList, "dropup", !a && s),
                        this.options.dropdownContainer &&
                          ((this.dropdown.style.top = "".concat(
                            o + (!a && s ? 0 : this.telInput.offsetHeight),
                            "px"
                          )),
                          (this.dropdown.style.left = "".concat(
                            n.left + t.body.scrollLeft,
                            "px"
                          )),
                          (this._handleWindowScroll = function () {
                            return d._closeDropdown();
                          }),
                          e.addEventListener(
                            "scroll",
                            this._handleWindowScroll
                          ));
                    }
                  },
                },
                {
                  key: "_getClosestListItem",
                  value: function (e) {
                    for (
                      var t = e;
                      t &&
                      t !== this.countryList &&
                      !t.classList.contains("country");

                    )
                      t = t.parentNode;
                    return t === this.countryList ? null : t;
                  },
                },
                {
                  key: "_bindDropdownListeners",
                  value: function () {
                    var e = this;
                    (this._handleMouseoverCountryList = function (t) {
                      var d = e._getClosestListItem(t.target);
                      d && e._highlightListItem(d);
                    }),
                      this.countryList.addEventListener(
                        "mouseover",
                        this._handleMouseoverCountryList
                      ),
                      (this._handleClickCountryList = function (t) {
                        var d = e._getClosestListItem(t.target);
                        d && e._selectListItem(d);
                      }),
                      this.countryList.addEventListener(
                        "click",
                        this._handleClickCountryList
                      );
                    var d = !0;
                    (this._handleClickOffToClose = function () {
                      d || e._closeDropdown(), (d = !1);
                    }),
                      t.documentElement.addEventListener(
                        "click",
                        this._handleClickOffToClose
                      );
                    var n = "",
                      r = null;
                    (this._handleKeydownOnDropdown = function (t) {
                      t.preventDefault(),
                        "ArrowUp" === t.key || "ArrowDown" === t.key
                          ? e._handleUpDownKey(t.key)
                          : "Enter" === t.key
                          ? e._handleEnterKey()
                          : "Escape" === t.key
                          ? e._closeDropdown()
                          : /^[a-zA-Z\xc0-\xff ]$/.test(t.key) &&
                            (r && clearTimeout(r),
                            (n += t.key.toLowerCase()),
                            e._searchForCountry(n),
                            (r = setTimeout(function () {
                              n = "";
                            }, 1e3)));
                    }),
                      t.addEventListener(
                        "keydown",
                        this._handleKeydownOnDropdown
                      );
                  },
                },
                {
                  key: "_handleUpDownKey",
                  value: function (e) {
                    var t =
                      "ArrowUp" === e
                        ? this.highlightedItem.previousElementSibling
                        : this.highlightedItem.nextElementSibling;
                    t &&
                      (t.classList.contains("divider") &&
                        (t =
                          "ArrowUp" === e
                            ? t.previousElementSibling
                            : t.nextElementSibling),
                      this._highlightListItem(t),
                      this._scrollTo(t));
                  },
                },
                {
                  key: "_handleEnterKey",
                  value: function () {
                    this.highlightedItem &&
                      this._selectListItem(this.highlightedItem);
                  },
                },
                {
                  key: "_searchForCountry",
                  value: function (e) {
                    for (var t = 0; t < this.countries.length; t++)
                      if (this._startsWith(this.countries[t].name, e)) {
                        var d = this.countryList.querySelector(
                          "#iti-item-".concat(this.countries[t].iso2)
                        );
                        this._highlightListItem(d), this._scrollTo(d, !0);
                        break;
                      }
                  },
                },
                {
                  key: "_startsWith",
                  value: function (e, t) {
                    return e.substr(0, t.length).toLowerCase() === t;
                  },
                },
                {
                  key: "_updateValFromNumber",
                  value: function (t) {
                    var d = t;
                    if (
                      this.options.formatOnDisplay &&
                      e.intlTelInputUtils &&
                      this.selectedCountryData
                    ) {
                      var n =
                          !this.options.separateDialCode &&
                          (this.options.nationalMode || "+" !== d.charAt(0)),
                        r = intlTelInputUtils.numberFormat;
                      d = intlTelInputUtils.formatNumber(
                        d,
                        this.selectedCountryData.iso2,
                        n ? r.NATIONAL : r.INTERNATIONAL
                      );
                    }
                    (d = this._beforeSetNumber(d)), (this.telInput.value = d);
                  },
                },
                {
                  key: "_updateFlagFromNumber",
                  value: function (e) {
                    var t = e;
                    t &&
                      this.options.nationalMode &&
                      "1" === this.selectedCountryData.dialCode &&
                      "+" !== t.charAt(0) &&
                      ("1" !== t.charAt(0) && (t = "1".concat(t)),
                      (t = "+".concat(t)));
                    var d = this._getDialCode(t),
                      n = this._getNumeric(t),
                      r = null;
                    if (d) {
                      var o = this.countryCodes[this._getNumeric(d)],
                        i = -1 !== o.indexOf(this.selectedCountryData.iso2),
                        a = "+1" === d && n.length >= 4;
                      if (
                        ("1" !== this.selectedCountryData.dialCode ||
                          !this._isRegionlessNanp(n)) &&
                        (!i || a)
                      )
                        for (var s = 0; s < o.length; s++)
                          if (o[s]) {
                            r = o[s];
                            break;
                          }
                    } else
                      "+" === t.charAt(0) && n.length
                        ? (r = "")
                        : (t && "+" !== t) || (r = this.defaultCountry);
                    return null !== r && this._setFlag(r);
                  },
                },
                {
                  key: "_isRegionlessNanp",
                  value: function (e) {
                    var t = this._getNumeric(e);
                    if ("1" === t.charAt(0)) {
                      var d = t.substr(1, 3);
                      return -1 !== a.indexOf(d);
                    }
                    return !1;
                  },
                },
                {
                  key: "_highlightListItem",
                  value: function (e) {
                    var t = this.highlightedItem;
                    t && t.classList.remove("highlight"),
                      (this.highlightedItem = e),
                      this.highlightedItem.classList.add("highlight");
                  },
                },
                {
                  key: "_getCountryData",
                  value: function (e, t, n) {
                    for (
                      var r = t ? d : this.countries, o = 0;
                      o < r.length;
                      o++
                    )
                      if (r[o].iso2 === e) return r[o];
                    if (n) return null;
                    throw new Error("No country data for '".concat(e, "'"));
                  },
                },
                {
                  key: "_setFlag",
                  value: function (e) {
                    var t = this.selectedCountryData.iso2
                      ? this.selectedCountryData
                      : {};
                    (this.selectedCountryData = e
                      ? this._getCountryData(e, !1, !1)
                      : {}),
                      this.selectedCountryData.iso2 &&
                        (this.defaultCountry = this.selectedCountryData.iso2),
                      this.selectedFlagInner.setAttribute(
                        "class",
                        "iti-flag ".concat(e)
                      );
                    var d = e
                      ? ""
                          .concat(this.selectedCountryData.name, ": +")
                          .concat(this.selectedCountryData.dialCode)
                      : "Unknown";
                    if (
                      (this.selectedFlag.setAttribute("title", d),
                      this.options.separateDialCode)
                    ) {
                      var n = this.selectedCountryData.dialCode
                        ? "+".concat(this.selectedCountryData.dialCode)
                        : "";
                      (this.selectedDialCode.innerHTML = n),
                        (this.telInput.style.paddingLeft = "".concat(
                          this.selectedFlag.offsetWidth + 6,
                          "px"
                        ));
                    }
                    if (
                      (this._updatePlaceholder(), this.options.allowDropdown)
                    ) {
                      var r = this.activeItem;
                      if (
                        (r &&
                          (r.classList.remove("active"),
                          r.setAttribute("aria-selected", "false")),
                        e)
                      ) {
                        var o = this.countryList.querySelector(
                          "#iti-item-".concat(e)
                        );
                        o.setAttribute("aria-selected", "true"),
                          o.classList.add("active"),
                          (this.activeItem = o),
                          this.countryList.setAttribute(
                            "aria-activedescendant",
                            o.getAttribute("id")
                          );
                      }
                    }
                    return t.iso2 !== e;
                  },
                },
                {
                  key: "_updatePlaceholder",
                  value: function () {
                    if (
                      e.intlTelInputUtils &&
                      ("aggressive" === this.options.autoPlaceholder ||
                        (!this.hadInitialPlaceholder &&
                          "polite" === this.options.autoPlaceholder))
                    ) {
                      var t =
                          intlTelInputUtils.numberType[
                            this.options.placeholderNumberType
                          ],
                        d = this.selectedCountryData.iso2
                          ? intlTelInputUtils.getExampleNumber(
                              this.selectedCountryData.iso2,
                              this.options.nationalMode,
                              t
                            )
                          : "";
                      (d = this._beforeSetNumber(d)),
                        "function" == typeof this.options.customPlaceholder &&
                          (d = this.options.customPlaceholder(
                            d,
                            this.selectedCountryData
                          )),
                        this.telInput.setAttribute("placeholder", d);
                    }
                  },
                },
                {
                  key: "_selectListItem",
                  value: function (e) {
                    var t = this._setFlag(e.getAttribute("data-country-code"));
                    this._closeDropdown(),
                      this._updateDialCode(
                        e.getAttribute("data-dial-code"),
                        !0
                      ),
                      this.telInput.focus();
                    var d = this.telInput.value.length;
                    this.telInput.setSelectionRange(d, d),
                      t && this._triggerCountryChange();
                  },
                },
                {
                  key: "_closeDropdown",
                  value: function () {
                    this.countryList.classList.add("hide"),
                      this.countryList.setAttribute("aria-expanded", "false"),
                      this.dropdownArrow.classList.remove("up"),
                      t.removeEventListener(
                        "keydown",
                        this._handleKeydownOnDropdown
                      ),
                      t.documentElement.removeEventListener(
                        "click",
                        this._handleClickOffToClose
                      ),
                      this.countryList.removeEventListener(
                        "mouseover",
                        this._handleMouseoverCountryList
                      ),
                      this.countryList.removeEventListener(
                        "click",
                        this._handleClickCountryList
                      ),
                      this.options.dropdownContainer &&
                        (this.isMobile ||
                          e.removeEventListener(
                            "scroll",
                            this._handleWindowScroll
                          ),
                        this.dropdown.parentNode &&
                          this.dropdown.parentNode.removeChild(this.dropdown)),
                      this._trigger("close:countrydropdown");
                  },
                },
                {
                  key: "_scrollTo",
                  value: function (d, n) {
                    var r = this.countryList,
                      o = e.pageYOffset || t.documentElement.scrollTop,
                      i = r.offsetHeight,
                      a = r.getBoundingClientRect().top + o,
                      s = a + i,
                      l = d.offsetHeight,
                      u = d.getBoundingClientRect().top + o,
                      c = u + l,
                      f = u - a + r.scrollTop,
                      h = i / 2 - l / 2;
                    u < a
                      ? (n && (f -= h), (r.scrollTop = f))
                      : c > s && (n && (f += h), (r.scrollTop = f - (i - l)));
                  },
                },
                {
                  key: "_updateDialCode",
                  value: function (e, t) {
                    var d,
                      n = this.telInput.value,
                      r = "+".concat(e);
                    if ("+" === n.charAt(0)) {
                      var o = this._getDialCode(n);
                      d = o ? n.replace(o, r) : r;
                    } else {
                      if (
                        this.options.nationalMode ||
                        this.options.separateDialCode
                      )
                        return;
                      if (n) d = r + n;
                      else {
                        if (!t && this.options.autoHideDialCode) return;
                        d = r;
                      }
                    }
                    this.telInput.value = d;
                  },
                },
                {
                  key: "_getDialCode",
                  value: function (e) {
                    var t = "";
                    if ("+" === e.charAt(0))
                      for (var d = "", n = 0; n < e.length; n++) {
                        var r = e.charAt(n);
                        if (
                          !isNaN(parseInt(r, 10)) &&
                          (this.countryCodes[(d += r)] &&
                            (t = e.substr(0, n + 1)),
                          4 === d.length)
                        )
                          break;
                      }
                    return t;
                  },
                },
                {
                  key: "_getFullNumber",
                  value: function () {
                    var e = this.telInput.value.trim(),
                      t = this.selectedCountryData.dialCode,
                      d = this._getNumeric(e),
                      n = "1" === d.charAt(0) ? d : "1".concat(d);
                    return (
                      (this.options.separateDialCode && "+" !== e.charAt(0)
                        ? "+".concat(t)
                        : e &&
                          "+" !== e.charAt(0) &&
                          "1" !== e.charAt(0) &&
                          t &&
                          "1" === t.charAt(0) &&
                          4 === t.length &&
                          t !== n.substr(0, 4)
                        ? t.substr(1)
                        : "") + e
                    );
                  },
                },
                {
                  key: "_beforeSetNumber",
                  value: function (e) {
                    var t = e;
                    if (this.options.separateDialCode) {
                      var d = this._getDialCode(t);
                      d &&
                        (null !== this.selectedCountryData.areaCodes &&
                          (d = "+".concat(this.selectedCountryData.dialCode)),
                        (t = t.substr(
                          " " === t[d.length] || "-" === t[d.length]
                            ? d.length + 1
                            : d.length
                        )));
                    }
                    return this._cap(t);
                  },
                },
                {
                  key: "_triggerCountryChange",
                  value: function () {
                    this._trigger("countrychange");
                  },
                },
                {
                  key: "handleAutoCountry",
                  value: function () {
                    "auto" === this.options.initialCountry &&
                      ((this.defaultCountry =
                        e.intlTelInputGlobals.autoCountry),
                      this.telInput.value ||
                        this.setCountry(this.defaultCountry),
                      this.resolveAutoCountryPromise());
                  },
                },
                {
                  key: "handleUtils",
                  value: function () {
                    e.intlTelInputUtils &&
                      (this.telInput.value &&
                        this._updateValFromNumber(this.telInput.value),
                      this._updatePlaceholder()),
                      this.resolveUtilsScriptPromise();
                  },
                },
                {
                  key: "destroy",
                  value: function () {
                    var t = this.telInput.form;
                    if (this.options.allowDropdown) {
                      this._closeDropdown(),
                        this.selectedFlag.removeEventListener(
                          "click",
                          this._handleClickSelectedFlag
                        ),
                        this.flagsContainer.removeEventListener(
                          "keydown",
                          this._handleFlagsContainerKeydown
                        );
                      var d = this._getClosestLabel();
                      d &&
                        d.removeEventListener("click", this._handleLabelClick);
                    }
                    this.hiddenInput &&
                      t &&
                      t.removeEventListener(
                        "submit",
                        this._handleHiddenInputSubmit
                      ),
                      this.options.autoHideDialCode &&
                        (t &&
                          t.removeEventListener(
                            "submit",
                            this._handleSubmitOrBlurEvent
                          ),
                        this.telInput.removeEventListener(
                          "blur",
                          this._handleSubmitOrBlurEvent
                        )),
                      this.telInput.removeEventListener(
                        "keyup",
                        this._handleKeyupEvent
                      ),
                      this.telInput.removeEventListener(
                        "cut",
                        this._handleClipboardEvent
                      ),
                      this.telInput.removeEventListener(
                        "paste",
                        this._handleClipboardEvent
                      ),
                      this.telInput.removeAttribute("data-intl-tel-input-id");
                    var n = this.telInput.parentNode;
                    n.parentNode.insertBefore(this.telInput, n),
                      n.parentNode.removeChild(n),
                      delete e.intlTelInputGlobals.instances[this.id];
                  },
                },
                {
                  key: "getExtension",
                  value: function () {
                    return e.intlTelInputUtils
                      ? intlTelInputUtils.getExtension(
                          this._getFullNumber(),
                          this.selectedCountryData.iso2
                        )
                      : "";
                  },
                },
                {
                  key: "getNumber",
                  value: function (t) {
                    if (e.intlTelInputUtils) {
                      var d = this.selectedCountryData.iso2;
                      return intlTelInputUtils.formatNumber(
                        this._getFullNumber(),
                        d,
                        t
                      );
                    }
                    return "";
                  },
                },
                {
                  key: "getNumberType",
                  value: function () {
                    return e.intlTelInputUtils
                      ? intlTelInputUtils.getNumberType(
                          this._getFullNumber(),
                          this.selectedCountryData.iso2
                        )
                      : -99;
                  },
                },
                {
                  key: "getSelectedCountryData",
                  value: function () {
                    return this.selectedCountryData;
                  },
                },
                {
                  key: "getValidationError",
                  value: function () {
                    if (e.intlTelInputUtils) {
                      var t = this.selectedCountryData.iso2;
                      return intlTelInputUtils.getValidationError(
                        this._getFullNumber(),
                        t
                      );
                    }
                    return -99;
                  },
                },
                {
                  key: "isValidNumber",
                  value: function () {
                    var t = this._getFullNumber().trim();
                    return e.intlTelInputUtils
                      ? intlTelInputUtils.isValidNumber(
                          t,
                          this.options.nationalMode
                            ? this.selectedCountryData.iso2
                            : ""
                        )
                      : null;
                  },
                },
                {
                  key: "setCountry",
                  value: function (e) {
                    var t = e.toLowerCase();
                    this.selectedFlagInner.classList.contains(t) ||
                      (this._setFlag(t),
                      this._updateDialCode(
                        this.selectedCountryData.dialCode,
                        !1
                      ),
                      this._triggerCountryChange());
                  },
                },
                {
                  key: "setNumber",
                  value: function (e) {
                    var t = this._updateFlagFromNumber(e);
                    this._updateValFromNumber(e),
                      t && this._triggerCountryChange();
                  },
                },
                {
                  key: "setPlaceholderNumberType",
                  value: function (e) {
                    (this.options.placeholderNumberType = e),
                      this._updatePlaceholder();
                  },
                },
              ]) &&
                (function (e, t) {
                  for (var d = 0; d < t.length; d++) {
                    var n = t[d];
                    (n.enumerable = n.enumerable || !1),
                      (n.configurable = !0),
                      "value" in n && (n.writable = !0),
                      Object.defineProperty(e, n.key, n);
                  }
                })(n.prototype, r),
              n
            );
            var r;
          })();
        e.intlTelInputGlobals.getCountryData = function () {
          return d;
        };
        var c = function (e, d, n) {
          var r = t.createElement("script");
          (r.onload = function () {
            l("handleUtils"), d && d();
          }),
            (r.onerror = function () {
              l("rejectUtilsScriptPromise"), n && n();
            }),
            (r.className = "iti-load-utils"),
            (r.async = !0),
            (r.src = e),
            t.body.appendChild(r);
        };
        return (
          (e.intlTelInputGlobals.loadUtils = function (t) {
            if (
              !e.intlTelInputUtils &&
              !e.intlTelInputGlobals.startedLoadingUtilsScript
            ) {
              if (
                ((e.intlTelInputGlobals.startedLoadingUtilsScript = !0),
                "undefined" != typeof Promise)
              )
                return new Promise(function (e, d) {
                  return c(t, e, d);
                });
              c(t);
            }
            return null;
          }),
          (e.intlTelInputGlobals.defaults = i),
          (e.intlTelInputGlobals.version = "15.0.2"),
          function (t, d) {
            var n = new u(t, d);
            return (
              n._init(),
              t.setAttribute("data-intl-tel-input-id", n.id),
              (e.intlTelInputGlobals.instances[n.id] = n),
              n
            );
          }
        );
      })();
    })(window, document);
    "object" == typeof module && module.exports
      ? (module.exports = t)
      : (window.intlTelInput = t);
  })(),
  (function () {
    var e = this;
    function t(e) {
      return "string" == typeof e;
    }
    function d(t, d) {
      t = t.split(".");
      var n,
        r = e;
      t[0] in r || void 0 === r.execScript || r.execScript("var " + t[0]);
      for (; t.length && (n = t.shift()); )
        t.length || void 0 === d
          ? (r = r[n] && r[n] !== Object.prototype[n] ? r[n] : (r[n] = {}))
          : (r[n] = d);
    }
    function n(e, t) {
      function d() {}
      (d.prototype = t.prototype),
        (e.o = t.prototype),
        (e.prototype = new d()),
        (e.prototype.constructor = e),
        (e.aa = function (e, d, n) {
          for (
            var r = Array(arguments.length - 2), o = 2;
            o < arguments.length;
            o++
          )
            r[o - 2] = arguments[o];
          return t.prototype[d].apply(e, r);
        });
    }
    var r = Array.prototype.indexOf
      ? function (e, t, d) {
          return Array.prototype.indexOf.call(e, t, d);
        }
      : function (e, d, n) {
          if (
            ((n = null == n ? 0 : 0 > n ? Math.max(0, e.length + n) : n), t(e))
          )
            return t(d) && 1 == d.length ? e.indexOf(d, n) : -1;
          for (; n < e.length; n++) if (n in e && e[n] === d) return n;
          return -1;
        };
    function o(e, t) {
      e.sort(t || i);
    }
    function i(e, t) {
      return e > t ? 1 : e < t ? -1 : 0;
    }
    function a(e, t) {
      switch (
        ((this.a = e),
        (this.h = !!t.i),
        (this.c = t.b),
        (this.m = t.type),
        (this.l = !1),
        this.c)
      ) {
        case u:
        case c:
        case f:
        case h:
        case $:
        case l:
        case s:
          this.l = !0;
      }
      this.g = t.defaultValue;
    }
    var s = 1,
      l = 2,
      u = 3,
      c = 4,
      f = 6,
      h = 16,
      $ = 18;
    function p() {
      (this.a = {}), (this.g = this.f().a), (this.c = this.h = null);
    }
    function m(e, t) {
      var d = e.a[t];
      if (null == d) return null;
      if (e.h) {
        if (!(t in e.c)) {
          var n = e.h,
            r = e.g[t];
          if (null != d)
            if (r.h) {
              for (var o = [], i = 0; i < d.length; i++) o[i] = n.c(r, d[i]);
              d = o;
            } else d = n.c(r, d);
          return (e.c[t] = d);
        }
        return e.c[t];
      }
      return d;
    }
    function g(e, t, d) {
      var n = m(e, t);
      return e.g[t].h ? n[d || 0] : n;
    }
    function v(e, t) {
      if (null != e.a[t]) e = g(e, t, void 0);
      else
        e: {
          if (void 0 === (e = e.g[t]).g)
            if ((t = e.m) === Boolean) e.g = !1;
            else if (t === Number) e.g = 0;
            else {
              if (t !== String) {
                e = new t();
                break e;
              }
              e.g = e.l ? "0" : "";
            }
          e = e.g;
        }
      return e;
    }
    function y(e, t) {
      return m(e, t) || [];
    }
    function C(e, t) {
      return e.g[t].h
        ? null != e.a[t]
          ? e.a[t].length
          : 0
        : null != e.a[t]
        ? 1
        : 0;
    }
    function b(e, t, d) {
      (e.a[t] = d), e.c && (e.c[t] = d);
    }
    function w(e, t, d) {
      e.a[t] || (e.a[t] = []), e.a[t].push(d), e.c && delete e.c[t];
    }
    function k(e, t) {
      var d,
        n = [];
      for (d in t) 0 != d && n.push(new a(d, t[d]));
      return new (function (e, t) {
        for (this.c = e, this.a = {}, e = 0; e < t.length; e++) {
          var d = t[e];
          this.a[d.a] = d;
        }
      })(e, n);
    }
    function B() {}
    (p.prototype.has = function (e) {
      return null != this.a[e.a];
    }),
      (p.prototype.get = function (e, t) {
        return g(this, e.a, t);
      }),
      (p.prototype.set = function (e, t) {
        b(this, e.a, t);
      }),
      (p.prototype.add = function (e, t) {
        w(this, e.a, t);
      }),
      (p.prototype.clone = function () {
        var e = new this.constructor();
        return (
          e != this &&
            ((e.a = {}),
            e.c && (e.c = {}),
            (function e(t, d) {
              for (
                var n = (function (e) {
                    return (
                      o(
                        (e = (function (e) {
                          var t,
                            d = [],
                            n = 0;
                          for (t in e) d[n++] = e[t];
                          return d;
                        })(e.a)),
                        function (e, t) {
                          return e.a - t.a;
                        }
                      ),
                      e
                    );
                  })(t.f()),
                  r = 0;
                r < n.length;
                r++
              ) {
                var i = n[r],
                  a = i.a;
                if (null != d.a[a]) {
                  t.c && delete t.c[i.a];
                  var s = 11 == i.c || 10 == i.c;
                  if (i.h) {
                    i = y(d, a);
                    for (var l = 0; l < i.length; l++)
                      w(t, a, s ? i[l].clone() : i[l]);
                  } else
                    (i = m(d, a)),
                      s
                        ? (s = m(t, a))
                          ? e(s, i)
                          : b(t, a, i.clone())
                        : b(t, a, i);
                }
              }
            })(e, this)),
          e
        );
      }),
      (B.prototype.a = function (e) {
        throw (new e.c(), Error("Unimplemented"));
      }),
      (B.prototype.c = function (e, d) {
        if (11 == e.c || 10 == e.c)
          return d instanceof p ? d : this.a(e.m.prototype.f(), d);
        if (14 == e.c) return t(d) && x.test(d) && 0 < (e = Number(d)) ? e : d;
        if (!e.l) return d;
        if ((e = e.m) === String) {
          if ("number" == typeof d) return String(d);
        } else if (
          e === Number &&
          t(d) &&
          ("Infinity" === d || "-Infinity" === d || "NaN" === d || x.test(d))
        )
          return Number(d);
        return d;
      });
    var x = /^-?[0-9]+$/;
    function P() {}
    function S() {}
    function A(e, t) {
      null != e && this.a.apply(this, arguments);
    }
    function L() {
      p.call(this);
    }
    n(P, B),
      (P.prototype.a = function (e, t) {
        return ((e = new e.c()).h = this), (e.a = t), (e.c = {}), e;
      }),
      n(S, P),
      (S.prototype.c = function (e, t) {
        return 8 == e.c ? !!t : B.prototype.c.apply(this, arguments);
      }),
      (S.prototype.a = function (e, t) {
        return S.o.a.call(this, e, t);
      }),
      (A.prototype.c = ""),
      (A.prototype.set = function (e) {
        this.c = "" + e;
      }),
      (A.prototype.a = function (e, t, d) {
        if (((this.c += String(e)), null != t))
          for (var n = 1; n < arguments.length; n++) this.c += arguments[n];
        return this;
      }),
      (A.prototype.toString = function () {
        return this.c;
      }),
      n(L, p);
    var T = null;
    function M() {
      p.call(this);
    }
    n(M, p);
    var I = null;
    function E() {
      p.call(this);
    }
    n(E, p);
    var N = null;
    function _() {
      p.call(this);
    }
    (L.f = L.prototype.f =
      function () {
        var e = T;
        return (
          e ||
            (T = e =
              k(L, {
                0: {
                  name: "NumberFormat",
                  j: "i18n.phonenumbers.NumberFormat",
                },
                1: { name: "pattern", required: !0, b: 9, type: String },
                2: { name: "format", required: !0, b: 9, type: String },
                3: {
                  name: "leading_digits_pattern",
                  i: !0,
                  b: 9,
                  type: String,
                },
                4: {
                  name: "national_prefix_formatting_rule",
                  b: 9,
                  type: String,
                },
                6: {
                  name: "national_prefix_optional_when_formatting",
                  b: 8,
                  defaultValue: !1,
                  type: Boolean,
                },
                5: {
                  name: "domestic_carrier_code_formatting_rule",
                  b: 9,
                  type: String,
                },
              })),
          e
        );
      }),
      (M.f = M.prototype.f =
        function () {
          var e = I;
          return (
            e ||
              (I = e =
                k(M, {
                  0: {
                    name: "PhoneNumberDesc",
                    j: "i18n.phonenumbers.PhoneNumberDesc",
                  },
                  2: { name: "national_number_pattern", b: 9, type: String },
                  9: { name: "possible_length", i: !0, b: 5, type: Number },
                  10: {
                    name: "possible_length_local_only",
                    i: !0,
                    b: 5,
                    type: Number,
                  },
                  6: { name: "example_number", b: 9, type: String },
                })),
            e
          );
        }),
      (E.f = E.prototype.f =
        function () {
          var e = N;
          return (
            e ||
              (N = e =
                k(E, {
                  0: {
                    name: "PhoneMetadata",
                    j: "i18n.phonenumbers.PhoneMetadata",
                  },
                  1: { name: "general_desc", b: 11, type: M },
                  2: { name: "fixed_line", b: 11, type: M },
                  3: { name: "mobile", b: 11, type: M },
                  4: { name: "toll_free", b: 11, type: M },
                  5: { name: "premium_rate", b: 11, type: M },
                  6: { name: "shared_cost", b: 11, type: M },
                  7: { name: "personal_number", b: 11, type: M },
                  8: { name: "voip", b: 11, type: M },
                  21: { name: "pager", b: 11, type: M },
                  25: { name: "uan", b: 11, type: M },
                  27: { name: "emergency", b: 11, type: M },
                  28: { name: "voicemail", b: 11, type: M },
                  29: { name: "short_code", b: 11, type: M },
                  30: { name: "standard_rate", b: 11, type: M },
                  31: { name: "carrier_specific", b: 11, type: M },
                  33: { name: "sms_services", b: 11, type: M },
                  24: { name: "no_international_dialling", b: 11, type: M },
                  9: { name: "id", required: !0, b: 9, type: String },
                  10: { name: "country_code", b: 5, type: Number },
                  11: { name: "international_prefix", b: 9, type: String },
                  17: {
                    name: "preferred_international_prefix",
                    b: 9,
                    type: String,
                  },
                  12: { name: "national_prefix", b: 9, type: String },
                  13: { name: "preferred_extn_prefix", b: 9, type: String },
                  15: {
                    name: "national_prefix_for_parsing",
                    b: 9,
                    type: String,
                  },
                  16: {
                    name: "national_prefix_transform_rule",
                    b: 9,
                    type: String,
                  },
                  18: {
                    name: "same_mobile_and_fixed_line_pattern",
                    b: 8,
                    defaultValue: !1,
                    type: Boolean,
                  },
                  19: { name: "number_format", i: !0, b: 11, type: L },
                  20: { name: "intl_number_format", i: !0, b: 11, type: L },
                  22: {
                    name: "main_country_for_code",
                    b: 8,
                    defaultValue: !1,
                    type: Boolean,
                  },
                  23: { name: "leading_digits", b: 9, type: String },
                  26: {
                    name: "leading_zero_possible",
                    b: 8,
                    defaultValue: !1,
                    type: Boolean,
                  },
                })),
            e
          );
        }),
      n(_, p);
    var D = null,
      O = { $: 0, w: 1, v: 5, u: 10, s: 20 };
    (_.prototype.f = function () {
      var e = D;
      return (
        e ||
          (D = e =
            k(_, {
              0: { name: "PhoneNumber", j: "i18n.phonenumbers.PhoneNumber" },
              1: { name: "country_code", required: !0, b: 5, type: Number },
              2: { name: "national_number", required: !0, b: 4, type: Number },
              3: { name: "extension", b: 9, type: String },
              4: { name: "italian_leading_zero", b: 8, type: Boolean },
              8: {
                name: "number_of_leading_zeros",
                b: 5,
                defaultValue: 1,
                type: Number,
              },
              5: { name: "raw_input", b: 9, type: String },
              6: {
                name: "country_code_source",
                b: 14,
                defaultValue: 0,
                type: O,
              },
              7: {
                name: "preferred_domestic_carrier_code",
                b: 9,
                type: String,
              },
            })),
        e
      );
    }),
      ((_.ctor = _).f = _.prototype.f);
    var R = {
        1: "US AG AI AS BB BM BS CA DM DO GD GU JM KN KY LC MP MS PR SX TC TT VC VG VI".split(
          " "
        ),
        7: ["RU", "KZ"],
        20: ["EG"],
        27: ["ZA"],
        30: ["GR"],
        31: ["NL"],
        32: ["BE"],
        33: ["FR"],
        34: ["ES"],
        36: ["HU"],
        39: ["IT", "VA"],
        40: ["RO"],
        41: ["CH"],
        43: ["AT"],
        44: ["GB", "GG", "IM", "JE"],
        45: ["DK"],
        46: ["SE"],
        47: ["NO", "SJ"],
        48: ["PL"],
        49: ["DE"],
        51: ["PE"],
        52: ["MX"],
        53: ["CU"],
        54: ["AR"],
        55: ["BR"],
        56: ["CL"],
        57: ["CO"],
        58: ["VE"],
        60: ["MY"],
        61: ["AU", "CC", "CX"],
        62: ["ID"],
        63: ["PH"],
        64: ["NZ"],
        65: ["SG"],
        66: ["TH"],
        81: ["JP"],
        82: ["KR"],
        84: ["VN"],
        86: ["CN"],
        90: ["TR"],
        91: ["IN"],
        92: ["PK"],
        93: ["AF"],
        94: ["LK"],
        95: ["MM"],
        98: ["IR"],
        211: ["SS"],
        212: ["MA", "EH"],
        213: ["DZ"],
        216: ["TN"],
        218: ["LY"],
        220: ["GM"],
        221: ["SN"],
        222: ["MR"],
        223: ["ML"],
        224: ["GN"],
        225: ["CI"],
        226: ["BF"],
        227: ["NE"],
        228: ["TG"],
        229: ["BJ"],
        230: ["MU"],
        231: ["LR"],
        232: ["SL"],
        233: ["GH"],
        234: ["NG"],
        235: ["TD"],
        236: ["CF"],
        237: ["CM"],
        238: ["CV"],
        239: ["ST"],
        240: ["GQ"],
        241: ["GA"],
        242: ["CG"],
        243: ["CD"],
        244: ["AO"],
        245: ["GW"],
        246: ["IO"],
        247: ["AC"],
        248: ["SC"],
        249: ["SD"],
        250: ["RW"],
        251: ["ET"],
        252: ["SO"],
        253: ["DJ"],
        254: ["KE"],
        255: ["TZ"],
        256: ["UG"],
        257: ["BI"],
        258: ["MZ"],
        260: ["ZM"],
        261: ["MG"],
        262: ["RE", "YT"],
        263: ["ZW"],
        264: ["NA"],
        265: ["MW"],
        266: ["LS"],
        267: ["BW"],
        268: ["SZ"],
        269: ["KM"],
        290: ["SH", "TA"],
        291: ["ER"],
        297: ["AW"],
        298: ["FO"],
        299: ["GL"],
        350: ["GI"],
        351: ["PT"],
        352: ["LU"],
        353: ["IE"],
        354: ["IS"],
        355: ["AL"],
        356: ["MT"],
        357: ["CY"],
        358: ["FI", "AX"],
        359: ["BG"],
        370: ["LT"],
        371: ["LV"],
        372: ["EE"],
        373: ["MD"],
        374: ["AM"],
        375: ["BY"],
        376: ["AD"],
        377: ["MC"],
        378: ["SM"],
        380: ["UA"],
        381: ["RS"],
        382: ["ME"],
        383: ["XK"],
        385: ["HR"],
        386: ["SI"],
        387: ["BA"],
        389: ["MK"],
        420: ["CZ"],
        421: ["SK"],
        423: ["LI"],
        500: ["FK"],
        501: ["BZ"],
        502: ["GT"],
        503: ["SV"],
        504: ["HN"],
        505: ["NI"],
        506: ["CR"],
        507: ["PA"],
        508: ["PM"],
        509: ["HT"],
        590: ["GP", "BL", "MF"],
        591: ["BO"],
        592: ["GY"],
        593: ["EC"],
        594: ["GF"],
        595: ["PY"],
        596: ["MQ"],
        597: ["SR"],
        598: ["UY"],
        599: ["CW", "BQ"],
        670: ["TL"],
        672: ["NF"],
        673: ["BN"],
        674: ["NR"],
        675: ["PG"],
        676: ["TO"],
        677: ["SB"],
        678: ["VU"],
        679: ["FJ"],
        680: ["PW"],
        681: ["WF"],
        682: ["CK"],
        683: ["NU"],
        685: ["WS"],
        686: ["KI"],
        687: ["NC"],
        688: ["TV"],
        689: ["PF"],
        690: ["TK"],
        691: ["FM"],
        692: ["MH"],
        800: ["001"],
        808: ["001"],
        850: ["KP"],
        852: ["HK"],
        853: ["MO"],
        855: ["KH"],
        856: ["LA"],
        870: ["001"],
        878: ["001"],
        880: ["BD"],
        881: ["001"],
        882: ["001"],
        883: ["001"],
        886: ["TW"],
        888: ["001"],
        960: ["MV"],
        961: ["LB"],
        962: ["JO"],
        963: ["SY"],
        964: ["IQ"],
        965: ["KW"],
        966: ["SA"],
        967: ["YE"],
        968: ["OM"],
        970: ["PS"],
        971: ["AE"],
        972: ["IL"],
        973: ["BH"],
        974: ["QA"],
        975: ["BT"],
        976: ["MN"],
        977: ["NP"],
        979: ["001"],
        992: ["TJ"],
        993: ["TM"],
        994: ["AZ"],
        995: ["GE"],
        996: ["KG"],
        998: ["UZ"],
      },
      F = {
        AC: [
          ,
          [, , "(?:[01589]\\d|[46])\\d{4}", , , , , , , [5, 6]],
          [, , "6[2-467]\\d{3}", , , , "62889", , , [5]],
          [, , "4\\d{4}", , , , "40123", , , [5]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "AC",
          247,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "[01589]\\d{5}", , , , "542011", , , [6]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        AD: [
          ,
          [, , "(?:1|6\\d)\\d{7}|[136-9]\\d{5}", , , , , , , [6, 8, 9]],
          [, , "[78]\\d{5}", , , , "712345", , , [6]],
          [, , "690\\d{6}|[36]\\d{5}", , , , "312345", , , [6, 9]],
          [, , "180[02]\\d{4}", , , , "18001234", , , [8]],
          [, , "[19]\\d{5}", , , , "912345", , , [6]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "AD",
          376,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{3})", "$1 $2", ["[136-9]"]],
            [, "(\\d{4})(\\d{4})", "$1 $2", ["1"]],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "1800\\d{4}", , , , , , , [8]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        AE: [
          ,
          [
            ,
            ,
            "(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [5, 6, 7, 8, 9, 10, 11, 12],
          ],
          [, , "[2-4679][2-8]\\d{6}", , , , "22345678", , , [8], [7]],
          [, , "5[024-68]\\d{7}", , , , "501234567", , , [9]],
          [, , "400\\d{6}|800\\d{2,9}", , , , "800123456"],
          [, , "900[02]\\d{5}", , , , "900234567", , , [9]],
          [, , "700[05]\\d{5}", , , , "700012345", , , [9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "AE",
          971,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{2,9})", "$1 $2", ["60|8"]],
            [
              ,
              "(\\d)(\\d{3})(\\d{4})",
              "$1 $2 $3",
              ["[236]|[479][2-8]"],
              "0$1",
            ],
            [, "(\\d{3})(\\d)(\\d{5})", "$1 $2 $3", ["[479]"]],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "600[25]\\d{5}", , , , "600212345", , , [9]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        AF: [
          ,
          [, , "[2-7]\\d{8}", , , , , , , [9], [7]],
          [
            ,
            ,
            "(?:[25][0-8]|[34][0-4]|6[0-5])[2-9]\\d{6}",
            ,
            ,
            ,
            "234567890",
            ,
            ,
            ,
            [7],
          ],
          [, , "7(?:[014-9]\\d|2[89]|3[01])\\d{6}", , , , "701234567"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "AF",
          93,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"],
          ],
          [[, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        AG: [
          ,
          [, , "(?:268|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "268(?:4(?:6[0-38]|84)|56[0-2])\\d{4}",
            ,
            ,
            ,
            "2684601234",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "268(?:464|7(?:1[3-9]|2\\d|3[246]|64|[78][0-689]))\\d{4}",
            ,
            ,
            ,
            "2684641234",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
          [, , "900[2-9]\\d{6}", , , , "9002123456"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , "26848[01]\\d{4}", , , , "2684801234", , , , [7]],
          "AG",
          1,
          "011",
          "1",
          ,
          ,
          "1|([457]\\d{6})$",
          "268$1",
          ,
          ,
          ,
          ,
          [, , "26840[69]\\d{4}", , , , "2684061234", , , , [7]],
          ,
          "268",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        AI: [
          ,
          [, , "(?:264|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]],
          [, , "2644(?:6[12]|9[78])\\d{4}", , , , "2644612345", , , , [7]],
          [
            ,
            ,
            "264(?:235|476|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}",
            ,
            ,
            ,
            "2642351234",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
          [, , "900[2-9]\\d{6}", , , , "9002123456"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "AI",
          1,
          "011",
          "1",
          ,
          ,
          "1|([2457]\\d{6})$",
          "264$1",
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "264",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        AL: [
          ,
          [
            ,
            ,
            "(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 7, 8, 9],
            [5],
          ],
          [
            ,
            ,
            "(?:[2358](?:[16-9]\\d[2-9]|[2-5][2-9]\\d)|4(?:[2-57-9][2-9]|6\\d)\\d)\\d{4}",
            ,
            ,
            ,
            "22345678",
            ,
            ,
            [8],
            [5, 6, 7],
          ],
          [, , "6(?:[689][2-9]|7[2-6])\\d{6}", , , , "662123456", , , [9]],
          [, , "800\\d{4}", , , , "8001234", , , [7]],
          [, , "900[1-9]\\d\\d", , , , "900123", , , [6]],
          [, , "808[1-9]\\d\\d", , , , "808123", , , [6]],
          [, , "700[2-9]\\d{4}", , , , "70021234", , , [8]],
          [, , , , , , , , , [-1]],
          "AL",
          355,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{3,4})", "$1 $2", ["80|9"], "0$1"],
            [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[2-6]"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{3})",
              "$1 $2 $3",
              ["[2358][2-5]|4"],
              "0$1",
            ],
            [, "(\\d{3})(\\d{5})", "$1 $2", ["[23578]"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["6"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        AM: [
          ,
          [, , "(?:[1-489]\\d|55|60|77)\\d{6}", , , , , , , [8], [5, 6]],
          [
            ,
            ,
            "(?:(?:1[0-2]|47)\\d|2(?:2[2-46]|3[1-8]|4[2-69]|5[2-7]|6[1-9]|8[1-7])|3[12]2)\\d{5}",
            ,
            ,
            ,
            "10123456",
            ,
            ,
            ,
            [5, 6],
          ],
          [, , "(?:4[1349]|55|77|88|9[13-9])\\d{6}", , , , "77123456"],
          [, , "800\\d{5}", , , , "80012345"],
          [, , "90[016]\\d{5}", , , , "90012345"],
          [, , "80[1-4]\\d{5}", , , , "80112345"],
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "60(?:2[78]|3[5-9]|4[02-9]|5[0-46-9]|[6-8]\\d|90)\\d{4}",
            ,
            ,
            ,
            "60271234",
          ],
          "AM",
          374,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[89]0"], "0 $1"],
            [, "(\\d{2})(\\d{6})", "$1 $2", ["1|47"], "(0$1)"],
            [, "(\\d{3})(\\d{5})", "$1 $2", ["[23]"], "(0$1)"],
            [, "(\\d{2})(\\d{6})", "$1 $2", ["[4-9]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        AO: [
          ,
          [, , "[29]\\d{8}", , , , , , , [9]],
          [, , "2\\d(?:[0134][25-9]|[25-9]\\d)\\d{5}", , , , "222123456"],
          [, , "9[1-49]\\d{7}", , , , "923123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "AO",
          244,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[29]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        AR: [
          ,
          [
            ,
            ,
            "11\\d{8}|(?:[2368]|9\\d)\\d{9}",
            ,
            ,
            ,
            ,
            ,
            ,
            [10, 11],
            [6, 7, 8],
          ],
          [
            ,
            ,
            "(?:2(?:646[0-46-9]|9(?:45[02-69]|54[2-8]))|3(?:4(?:3(?:5[0-7]|6[1-69])|5(?:4[0-4679]|[56][024-6]))|585[013-7]|7(?:(?:1[15]|81)[46]|77[2-8])|8(?:(?:21|4[16]|9[12])[46]|35[124-6]|5(?:5[0-46-9]|6[0-246-9])|6(?:5[2-8]|9[46])|86[0-68])))\\d{5}|(?:2(?:284|657|9(?:20|66))|3(?:4(?:8[27]|92)|755|878))[2-7]\\d{5}|(?:2(?:2(?:2[59]|44|52)|3(?:26|4[24])|473|9(?:[07]2|2[26]|34|46))|3327)[45]\\d{5}|(?:2(?:(?:26|62)2|3(?:02|2[03])|477|9(?:42|83))|3(?:4(?:[47]6|62|89)|5(?:41|64)|873))[2-6]\\d{5}|(?:(?:11[2-7]|670)\\d|2(?:2(?:0[45]|1[2-6]|3[3-6])|3(?:[06]4|7[45])|494|6(?:04|1[2-7]|[346][45])|80[45]|9(?:[17][4-6]|44|8[45]|9[3-6]))|3(?:364|4(?:1[2-7]|2[4-6]|[38]4)|5(?:1[2-8]|3[4-6]|8[46])|6(?:2[45]|44)|7[069][45]|8(?:0[45]|1[2-6]|34|5[34]|7[24-6]|8[3-5])))\\d{6}|2(?:2(?:21|4[23]|6[145]|7[1-4]|8[356]|9[267])|3(?:16|3[13-8]|43|5[346-8]|9[3-5])|475|6(?:2[46]|4[78]|5[1568])|9(?:03|2[1457-9]|3[1356]|4[08]|[56][23]|82))4\\d{5}|(?:2(?:2(?:57|81)|3(?:24|46|92)|9(?:01|23|64))|3(?:329|4(?:42|71)|5(?:25|37|4[347]|71)|7(?:18|5[17])|888))[3-6]\\d{5}|(?:2(?:2(?:02|2[3467]|4[156]|5[45]|6[6-8]|91)|3(?:1[47]|[24]5|5[25]|96)|47[48]|625|932)|3(?:38[2578]|4(?:0[0-24-9]|3[78]|4[457]|58|6[03-9]|72|83|9[136-8])|5(?:2[124]|[368][23]|4[2689]|7[2-6])|7(?:16|2[15]|3[145]|4[13]|5[468]|7[2-5]|8[26])|8(?:2[5-7]|3[278]|4[3-5]|5[78]|6[1-378]|[78]7|94)))[4-6]\\d{5}",
            ,
            ,
            ,
            "1123456789",
            ,
            ,
            [10],
            [6, 7, 8],
          ],
          [
            ,
            ,
            "9(?:2(?:646[0-46-9]|9(?:45[02-69]|54[2-8]))|3(?:4(?:3(?:5[0-7]|6[1-69])|5(?:4[0-4679]|[56][024-6]))|585[013-7]|7(?:(?:1[15]|81)[46]|77[2-8])|8(?:(?:21|4[16]|9[12])[46]|35[124-6]|5(?:5[0-46-9]|6[0-246-9])|6(?:5[2-8]|9[46])|86[0-68])))\\d{5}|9(?:2(?:284|657|9(?:20|66))|3(?:4(?:8[27]|92)|755|878))[2-7]\\d{5}|9(?:2(?:2(?:2[59]|44|52)|3(?:26|4[24])|473|9(?:[07]2|2[26]|34|46))|3327)[45]\\d{5}|9(?:2(?:(?:26|62)2|3(?:02|2[03])|477|9(?:42|83))|3(?:4(?:[47]6|62|89)|5(?:41|64)|873))[2-6]\\d{5}|(?:675\\d|9(?:11[2-7]\\d|2(?:2(?:0[45]|1[2-6]|3[3-6])|3(?:[06]4|7[45])|494|6(?:04|1[2-7]|[346][45])|80[45]|9(?:[17][4-6]|44|8[45]|9[3-6]))|3(?:364|4(?:1[2-7]|2[4-6]|[38]4)|5(?:1[2-8]|3[4-6]|8[46])|6(?:2[45]|44)|7[069][45]|8(?:0[45]|1[2-6]|34|5[34]|7[24-6]|8[3-5]))))\\d{6}|92(?:2(?:21|4[23]|6[145]|7[1-4]|8[356]|9[267])|3(?:16|3[13-8]|43|5[346-8]|9[3-5])|475|6(?:2[46]|4[78]|5[1568])|9(?:03|2[1457-9]|3[1356]|4[08]|[56][23]|82))4\\d{5}|9(?:2(?:2(?:57|81)|3(?:24|46|92)|9(?:01|23|64))|3(?:329|4(?:42|71)|5(?:25|37|4[347]|71)|7(?:18|5[17])|888))[3-6]\\d{5}|9(?:2(?:2(?:02|2[3467]|4[156]|5[45]|6[6-8]|91)|3(?:1[47]|[24]5|5[25]|96)|47[48]|625|932)|3(?:38[2578]|4(?:0[0-24-9]|3[78]|4[457]|58|6[03-9]|72|83|9[136-8])|5(?:2[124]|[368][23]|4[2689]|7[2-6])|7(?:16|2[15]|3[145]|4[13]|5[468]|7[2-5]|8[26])|8(?:2[5-7]|3[278]|4[3-5]|5[78]|6[1-378]|[78]7|94)))[4-6]\\d{5}",
            ,
            ,
            ,
            "91123456789",
            ,
            ,
            ,
            [6, 7, 8],
          ],
          [, , "800\\d{7}", , , , "8001234567", , , [10]],
          [, , "60[04579]\\d{7}", , , , "6001234567", , , [10]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "AR",
          54,
          "00",
          "0",
          ,
          ,
          "0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?",
          "9$1",
          ,
          ,
          [
            [, "(\\d{3})", "$1", ["[09]|1(?:[02]|1[02-5])"]],
            [, "(\\d{2})(\\d{4})", "$1-$2", ["[2-7]|8[0-7]"]],
            [, "(\\d{3})(\\d{4})", "$1-$2", ["[2-7]|8[013-8]"]],
            [, "(\\d{4})(\\d{4})", "$1-$2", ["2[0-8]|[3-7]"]],
            [
              ,
              "(\\d{4})(\\d{2})(\\d{4})",
              "$1 $2-$3",
              [
                "2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])",
                "2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)",
                "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]",
                "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5(?:[24-6]|3[2-5]))|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]",
              ],
              "0$1",
              ,
              1,
            ],
            [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", , 1],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", , 1],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"],
            [
              ,
              "(\\d)(\\d{4})(\\d{2})(\\d{4})",
              "$2 15-$3-$4",
              [
                "9(?:2[2-469]|3[3-578])",
                "9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))",
                "9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)",
                "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]",
                "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5(?:[24-6]|3[2-5]))|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]",
              ],
              "0$1",
            ],
            [, "(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 15-$3-$4", ["91"], "0$1"],
            [, "(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 15-$3-$4", ["9"], "0$1"],
          ],
          [
            [
              ,
              "(\\d{4})(\\d{2})(\\d{4})",
              "$1 $2-$3",
              [
                "2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])",
                "2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)",
                "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]",
                "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5(?:[24-6]|3[2-5]))|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]",
              ],
              "0$1",
              ,
              1,
            ],
            [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", , 1],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", , 1],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"],
            [
              ,
              "(\\d)(\\d{4})(\\d{2})(\\d{4})",
              "$1 $2 $3-$4",
              [
                "9(?:2[2-469]|3[3-578])",
                "9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))",
                "9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)",
                "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]",
                "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5(?:[24-6]|3[2-5]))|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]",
              ],
            ],
            [, "(\\d)(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3-$4", ["91"]],
            [, "(\\d)(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3-$4", ["9"]],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "810\\d{7}", , , , , , , [10]],
          [, , "810\\d{7}", , , , "8101234567", , , [10]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        AS: [
          ,
          [, , "(?:[58]\\d\\d|684|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "6846(?:22|33|44|55|77|88|9[19])\\d{4}",
            ,
            ,
            ,
            "6846221234",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "684(?:2(?:5[2468]|72)|7(?:3[13]|70))\\d{4}",
            ,
            ,
            ,
            "6847331234",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
          [, , "900[2-9]\\d{6}", , , , "9002123456"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "AS",
          1,
          "011",
          "1",
          ,
          ,
          "1|([267]\\d{6})$",
          "684$1",
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "684",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        AT: [
          ,
          [
            ,
            ,
            "1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}",
            ,
            ,
            ,
            ,
            ,
            ,
            [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            [3],
          ],
          [
            ,
            ,
            "1(?:11\\d|[2-9]\\d{3,11})|(?:316|463|(?:51|66|73)2)\\d{3,10}|(?:2(?:1[467]|2[13-8]|5[2357]|6[1-46-8]|7[1-8]|8[124-7]|9[1458])|3(?:1[1-578]|3[23568]|4[5-7]|5[1378]|6[1-38]|8[3-68])|4(?:2[1-8]|35|7[1368]|8[2457])|5(?:2[1-8]|3[357]|4[147]|5[12578]|6[37])|6(?:13|2[1-47]|4[135-8]|5[468])|7(?:2[1-8]|35|4[13478]|5[68]|6[16-8]|7[1-6]|9[45]))\\d{4,10}",
            ,
            ,
            ,
            "1234567890",
            ,
            ,
            ,
            [3],
          ],
          [
            ,
            ,
            "6(?:5[0-3579]|6[013-9]|[7-9]\\d)\\d{4,10}",
            ,
            ,
            ,
            "664123456",
            ,
            ,
            [7, 8, 9, 10, 11, 12, 13],
          ],
          [, , "800\\d{6,10}", , , , "800123456", , , [9, 10, 11, 12, 13]],
          [
            ,
            ,
            "9(?:0[01]|3[019])\\d{6,10}",
            ,
            ,
            ,
            "900123456",
            ,
            ,
            [9, 10, 11, 12, 13],
          ],
          [
            ,
            ,
            "8(?:10|2[018])\\d{6,10}|828\\d{5}",
            ,
            ,
            ,
            "810123456",
            ,
            ,
            [8, 9, 10, 11, 12, 13],
          ],
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "5(?:0[1-9]|17|[79]\\d)\\d{2,10}|7[28]0\\d{6,10}",
            ,
            ,
            ,
            "780123456",
            ,
            ,
            [5, 6, 7, 8, 9, 10, 11, 12, 13],
          ],
          "AT",
          43,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{3,12})", "$1 $2", ["1(?:11|[2-9])"], "0$1"],
            [, "(\\d{3})(\\d{2})", "$1 $2", ["517"], "0$1"],
            [, "(\\d{2})(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"],
            [, "(\\d{6})", "$1", ["1"]],
            [
              ,
              "(\\d{3})(\\d{3,10})",
              "$1 $2",
              ["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"],
              "0$1",
            ],
            [, "(\\d{4})(\\d{3,9})", "$1 $2", ["[2-467]|5[2-6]"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5"], "0$1"],
            [, "(\\d{2})(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5"], "0$1"],
          ],
          [
            [, "(\\d)(\\d{3,12})", "$1 $2", ["1(?:11|[2-9])"], "0$1"],
            [, "(\\d{3})(\\d{2})", "$1 $2", ["517"], "0$1"],
            [, "(\\d{2})(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"],
            [
              ,
              "(\\d{3})(\\d{3,10})",
              "$1 $2",
              ["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"],
              "0$1",
            ],
            [, "(\\d{4})(\\d{3,9})", "$1 $2", ["[2-467]|5[2-6]"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5"], "0$1"],
            [, "(\\d{2})(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5"], "0$1"],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        AU: [
          ,
          [
            ,
            ,
            "1\\d{4,9}|(?:[2-478]\\d\\d|550)\\d{6}",
            ,
            ,
            ,
            ,
            ,
            ,
            [5, 6, 7, 8, 9, 10],
          ],
          [
            ,
            ,
            "(?:[237]\\d{5}|8(?:51(?:0(?:0[03-9]|[1247]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-6])|1(?:1[69]|[23]\\d|4[0-4]))|(?:[6-8]\\d{3}|9(?:[02-9]\\d\\d|1(?:[0-57-9]\\d|6[0135-9])))\\d))\\d{3}",
            ,
            ,
            ,
            "212345678",
            ,
            ,
            [9],
            [8],
          ],
          [
            ,
            ,
            "4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[0-2457-9]|9[017-9])\\d{6}",
            ,
            ,
            ,
            "412345678",
            ,
            ,
            [9],
          ],
          [, , "180(?:0\\d{3}|2)\\d{3}", , , , "1800123456", , , [7, 10]],
          [, , "190[0-26]\\d{6}", , , , "1900123456", , , [10]],
          [
            ,
            ,
            "13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",
            ,
            ,
            ,
            "1300123456",
            ,
            ,
            [6, 8, 10],
          ],
          [, , , , , , , , , [-1]],
          [, , "1471\\d{5}|(?:145|550)\\d{6}", , , , "550123456", , , [9]],
          "AU",
          61,
          "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011",
          "0",
          ,
          ,
          "0",
          ,
          "0011",
          ,
          [
            [, "(\\d{2})(\\d{3,4})", "$1 $2", ["16"], "0$1"],
            [, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["13"]],
            [, "(\\d{3})(\\d{3})", "$1 $2", ["19"]],
            [, "(\\d{3})(\\d{4})", "$1 $2", ["180", "1802"]],
            [, "(\\d{4})(\\d{3,4})", "$1 $2", ["19"]],
            [, "(\\d{2})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["14|[45]"], "0$1"],
            [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)"],
            [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:30|[89])"]],
          ],
          [
            [, "(\\d{2})(\\d{3,4})", "$1 $2", ["16"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["14|[45]"], "0$1"],
            [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)"],
            [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:30|[89])"]],
          ],
          [, , "16\\d{3,7}", , , , "1612345", , , [5, 6, 7, 8, 9]],
          1,
          ,
          [
            ,
            ,
            "1[38]00\\d{6}|1(?:345[0-4]|802)\\d{3}|13\\d{4}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 7, 8, 10],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        AW: [
          ,
          [, , "(?:[25-79]\\d\\d|800)\\d{4}", , , , , , , [7]],
          [, , "5(?:2\\d|8[1-9])\\d{4}", , , , "5212345"],
          [
            ,
            ,
            "(?:290|5[69]\\d|6(?:[03]0|22|4[0-2]|[69]\\d)|7(?:[34]\\d|7[07])|9(?:6[45]|9[4-8]))\\d{4}",
            ,
            ,
            ,
            "5601234",
          ],
          [, , "800\\d{4}", , , , "8001234"],
          [, , "900\\d{4}", , , , "9001234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "(?:28\\d|501)\\d{4}", , , , "5011234"],
          "AW",
          297,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{4})", "$1 $2", ["[25-9]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        AX: [
          ,
          [
            ,
            ,
            "2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|(?:[147]\\d|3[0-46-9]|50)\\d{4,8}",
            ,
            ,
            ,
            ,
            ,
            ,
            [5, 6, 7, 8, 9, 10],
          ],
          [, , "18[1-8]\\d{3,6}", , , , "181234567", , , [6, 7, 8, 9]],
          [
            ,
            ,
            "(?:4[0-8]|50)\\d{4,8}",
            ,
            ,
            ,
            "412345678",
            ,
            ,
            [6, 7, 8, 9, 10],
          ],
          [, , "800\\d{4,6}", , , , "800123456", , , [7, 8, 9]],
          [, , "[67]00\\d{5,6}", , , , "600123456", , , [8, 9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "AX",
          358,
          "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))",
          "0",
          ,
          ,
          "0",
          ,
          "00",
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "18",
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "(?:10|[23][09])\\d{4,8}|60(?:[12]\\d{5,6}|6\\d{7})|7(?:(?:1|3\\d)\\d{7}|5[03-9]\\d{3,7})|20[2-59]\\d\\d",
            ,
            ,
            ,
            "10112345",
          ],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        AZ: [
          ,
          [
            ,
            ,
            "(?:365\\d{3}|900200)\\d{3}|(?:[12457]\\d|60|88)\\d{7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [9],
            [7],
          ],
          [
            ,
            ,
            "365(?:[0-46-9]\\d|5[0-35-9])\\d{4}|(?:1[28]\\d|2(?:[045]2|1[24]|2[2-4]|33|6[23]))\\d{6}",
            ,
            ,
            ,
            "123123456",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "36554\\d{4}|(?:4[04]|5[015]|60|7[07])\\d{7}",
            ,
            ,
            ,
            "401234567",
          ],
          [, , "88\\d{7}", , , , "881234567"],
          [, , "900200\\d{3}", , , , "900200123"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "AZ",
          994,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[1-9]"]],
            [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[12]|365", "[12]|365", "[12]|365(?:[0-46-9]|5[0-35-9])"],
              "(0$1)",
            ],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[3-8]"],
              "0$1",
            ],
          ],
          [
            [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[12]|365", "[12]|365", "[12]|365(?:[0-46-9]|5[0-35-9])"],
              "(0$1)",
            ],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[3-8]"],
              "0$1",
            ],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BA: [
          ,
          [, , "6\\d{8}|(?:[35689]\\d|49|70)\\d{6}", , , , , , , [8, 9], [6]],
          [
            ,
            ,
            "(?:3(?:[05-79][2-9]|1[4579]|[23][24-9]|4[2-4689]|8[2457-9])|49[2-579]|5(?:0[2-49]|[13][2-9]|[268][2-4679]|4[4689]|5[2-79]|7[2-69]|9[2-4689]))\\d{5}",
            ,
            ,
            ,
            "30212345",
            ,
            ,
            [8],
            [6],
          ],
          [
            ,
            ,
            "6(?:0(?:3\\d|40)|[1-356]\\d|44[0-6]|71[137])\\d{5}",
            ,
            ,
            ,
            "61123456",
          ],
          [, , "8[08]\\d{6}", , , , "80123456", , , [8]],
          [, , "9[0246]\\d{6}", , , , "90123456", , , [8]],
          [, , "8[12]\\d{6}", , , , "82123456", , , [8]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "BA",
          387,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{3})", "$1-$2", ["[2-9]"]],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{3})",
              "$1 $2 $3",
              ["6[1-356]|[7-9]"],
              "0$1",
            ],
            [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]"], "0$1"],
            [, "(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6"], "0$1"],
          ],
          [
            [
              ,
              "(\\d{2})(\\d{3})(\\d{3})",
              "$1 $2 $3",
              ["6[1-356]|[7-9]"],
              "0$1",
            ],
            [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]"], "0$1"],
            [, "(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6"], "0$1"],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "70(?:3[0146]|[56]0)\\d{4}", , , , "70341234", , , [8]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BB: [
          ,
          [, , "(?:246|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "246(?:2(?:2[78]|7[0-4])|4(?:1[024-6]|2\\d|3[2-9])|5(?:20|[34]\\d|54|7[1-3])|6(?:2\\d|38)|7[35]7|9(?:1[89]|63))\\d{4}",
            ,
            ,
            ,
            "2464123456",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "246(?:2(?:[356]\\d|4[0-57-9]|8[0-79])|45\\d|69[5-7]|8(?:[2-5]\\d|83))\\d{4}",
            ,
            ,
            ,
            "2462501234",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
          [
            ,
            ,
            "(?:246976|900[2-9]\\d\\d)\\d{4}",
            ,
            ,
            ,
            "9002123456",
            ,
            ,
            ,
            [7],
          ],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , "24631\\d{5}", , , , "2463101234", , , , [7]],
          "BB",
          1,
          "011",
          "1",
          ,
          ,
          "1|([2-9]\\d{6})$",
          "246$1",
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "246",
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "246(?:292|367|4(?:1[7-9]|3[01]|44|67)|7(?:36|53))\\d{4}",
            ,
            ,
            ,
            "2464301234",
            ,
            ,
            ,
            [7],
          ],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BD: [
          ,
          [
            ,
            ,
            "[13469]\\d{9}|8[0-79]\\d{7,8}|[2-7]\\d{8}|[2-9]\\d{7}|[3-689]\\d{6}|[57-9]\\d{5}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 7, 8, 9, 10],
          ],
          [
            ,
            ,
            "(?:3(?:03[56]|224)|4(?:22[25]|653))\\d{3,4}|(?:4(?:31\\d\\d|[46]23)|5(?:222|32[37]))\\d{3}(?:\\d{2})?|(?:3(?:42[47]|529|823)|4(?:027|525|658)|(?:56|73)2|6257|9[35]1)\\d{3}|(?:3(?:02[348]|22[35]|324|422)|4(?:22[67]|32[236-9]|6(?:2[46]|5[57])|953)|5526|6(?:024|6655)|81)\\d{4,5}|(?:2(?:7(?:1[0-267]|2[0-289]|3[0-29]|4[01]|5[1-3]|6[013]|7[0178]|91)|8(?:0[125]|[13][1-6]|2[0157-9]|41|6[1-35]|7[1-5]|8[1-8]|9[0-6])|9(?:0[0-2]|1[0-4]|2[568]|3[3-6]|5[5-7]|6[01367]|7[15]|8[0146-9]))|3(?:0(?:2[025-79]|3[2-4])|22[12]|32[2356]|824)|4(?:02[09]|22[348]|32[045]|523|6(?:27|54))|666(?:22|53)|8(?:4[12]|[5-7]2)|9(?:[024]2|81))\\d{4}|(?:2[45]\\d\\d|3(?:1(?:2[5-7]|[5-7])|425|822)|4(?:033|1\\d|[257]1|332|4(?:2[246]|5[25])|6(?:25|56|62)|8(?:23|54)|92[2-5])|5(?:02[03489]|22[457]|32[569]|42[46]|6(?:[18]|53)|724|826)|6(?:023|2(?:2[2-5]|5[3-5]|8)|32[3478]|42[34]|52[47]|6(?:[18]|6(?:2[34]|5[24]))|[78]2[2-5]|92[2-6])|7(?:02|21\\d|[3-589]1|6[12]|72[24])|8(?:0|217|3[12]|[5-7]1)|9[24]1)\\d{5}|(?:(?:3[2-8]|5[2-57-9]|6[03-589])1|4[4689][18])\\d{5}|[59]1\\d{5}",
            ,
            ,
            ,
            "27111234",
          ],
          [
            ,
            ,
            "(?:1[13-9]\\d|644)\\d{7}|(?:3[78]|44|66)[02-9]\\d{7}",
            ,
            ,
            ,
            "1812345678",
            ,
            ,
            [10],
          ],
          [, , "80[03]\\d{7}", , , , "8001234567", , , [10]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "96(?:0[469]|1[0-47]|3[389]|6[69]|7[78])\\d{6}",
            ,
            ,
            ,
            "9604123456",
            ,
            ,
            [10],
          ],
          "BD",
          880,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{4,6})", "$1-$2", ["31[5-7]|[459]1"], "0$1"],
            [
              ,
              "(\\d{3})(\\d{3,7})",
              "$1-$2",
              [
                "3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:28|4[14]|5)|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]",
              ],
              "0$1",
            ],
            [, "(\\d{4})(\\d{3,6})", "$1-$2", ["[13-9]"], "0$1"],
            [, "(\\d)(\\d{7,8})", "$1-$2", ["2"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BE: [
          ,
          [, , "4\\d{8}|[1-9]\\d{7}", , , , , , , [8, 9]],
          [
            ,
            ,
            "80[2-8]\\d{5}|(?:1[0-69]|[23][2-8]|4[23]|5\\d|6[013-57-9]|71|8[1-79]|9[2-4])\\d{6}",
            ,
            ,
            ,
            "12345678",
            ,
            ,
            [8],
          ],
          [
            ,
            ,
            "4(?:5[56]|6[0135-8]|[79]\\d|8[3-9])\\d{6}",
            ,
            ,
            ,
            "470123456",
            ,
            ,
            [9],
          ],
          [, , "800[1-9]\\d{4}", , , , "80012345", , , [8]],
          [
            ,
            ,
            "(?:70(?:2[0-57]|3[0457]|44|69|7[0579])|90(?:0[0-35-8]|1[36]|2[0-3568]|3[0135689]|4[2-68]|5[1-68]|6[0-378]|7[23568]|9[34679]))\\d{4}",
            ,
            ,
            ,
            "90012345",
            ,
            ,
            [8],
          ],
          [, , "7879\\d{4}", , , , "78791234", , , [8]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "BE",
          32,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:80|9)0"], "0$1"],
            [
              ,
              "(\\d)(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[239]|4[23]"],
              "0$1",
            ],
            [
              ,
              "(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[15-8]"],
              "0$1",
            ],
            [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "78(?:0[57]|1[0458]|2[25]|3[5-8]|48|[56]0|7[078])\\d{4}",
            ,
            ,
            ,
            "78102345",
            ,
            ,
            [8],
          ],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BF: [
          ,
          [, , "[25-7]\\d{7}", , , , , , , [8]],
          [
            ,
            ,
            "2(?:0(?:49|5[23]|6[56]|9[016-9])|4(?:4[569]|5[4-6]|6[56]|7[0179])|5(?:[34]\\d|50|6[5-7]))\\d{4}",
            ,
            ,
            ,
            "20491234",
          ],
          [, , "(?:5[124-8]|[67]\\d)\\d{6}", , , , "70123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "BF",
          226,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[25-7]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BG: [
          ,
          [
            ,
            ,
            "[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 7, 8, 9],
            [4, 5],
          ],
          [
            ,
            ,
            "2\\d{5,7}|(?:43[1-6]|70[1-9])\\d{4,5}|(?:[36]\\d|4[124-7]|[57][1-9]|8[1-6]|9[1-7])\\d{5,6}",
            ,
            ,
            ,
            "2123456",
            ,
            ,
            [6, 7, 8],
            [4, 5],
          ],
          [
            ,
            ,
            "43[07-9]\\d{5}|(?:48|8[7-9]\\d|9(?:8\\d|9[69]))\\d{6}",
            ,
            ,
            ,
            "48123456",
            ,
            ,
            [8, 9],
          ],
          [, , "800\\d{5}", , , , "80012345", , , [8]],
          [, , "90\\d{6}", , , , "90123456", , , [8]],
          [, , , , , , , , , [-1]],
          [, , "700\\d{5}", , , , "70012345", , , [8]],
          [, , , , , , , , , [-1]],
          "BG",
          359,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{6})", "$1", ["1"]],
            [, "(\\d)(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["2"], "0$1"],
            [, "(\\d{3})(\\d{4})", "$1 $2", ["43[1-6]|70[1-9]"], "0$1"],
            [, "(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2,3})",
              "$1 $2 $3",
              ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],
              "0$1",
            ],
            [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:70|8)0"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["43[1-7]|7"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[48]|9[08]"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"],
          ],
          [
            [, "(\\d)(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["2"], "0$1"],
            [, "(\\d{3})(\\d{4})", "$1 $2", ["43[1-6]|70[1-9]"], "0$1"],
            [, "(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2,3})",
              "$1 $2 $3",
              ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],
              "0$1",
            ],
            [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:70|8)0"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["43[1-7]|7"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[48]|9[08]"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BH: [
          ,
          [, , "[136-9]\\d{7}", , , , , , , [8]],
          [
            ,
            ,
            "(?:1(?:3[1356]|6[0156]|7\\d)\\d|6(?:1[16]\\d|500|6(?:0\\d|3[12]|44|7[7-9])|9[69][69])|7(?:1(?:11|78)|7\\d\\d))\\d{4}",
            ,
            ,
            ,
            "17001234",
          ],
          [
            ,
            ,
            "(?:3(?:[1-4679]\\d|5[013-69]|8[0-47-9])\\d|6(?:3(?:00|33|6[16])|6(?:3[03-9]|[69]\\d|7[0-6])))\\d{4}",
            ,
            ,
            ,
            "36001234",
          ],
          [, , "80\\d{6}", , , , "80123456"],
          [, , "(?:87|9[014578])\\d{6}", , , , "90123456"],
          [, , "84\\d{6}", , , , "84123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "BH",
          973,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{4})(\\d{4})", "$1 $2", ["[13679]|8[047]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BI: [
          ,
          [, , "(?:[267]\\d|31)\\d{6}", , , , , , , [8]],
          [, , "22\\d{6}", , , , "22201234"],
          [, , "(?:29|31|6[189]|7[125-9])\\d{6}", , , , "79561234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "BI",
          257,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2367]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BJ: [
          ,
          [, , "[2689]\\d{7}", , , , , , , [8]],
          [, , "2(?:02|1[037]|2[45]|3[68])\\d{5}", , , , "20211234"],
          [, , "(?:6\\d|9[03-9])\\d{6}", , , , "90011234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "857[58]\\d{4}", , , , "85751234"],
          "BJ",
          229,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2689]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "81\\d{6}", , , , "81123456"],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BL: [
          ,
          [, , "(?:590|69\\d)\\d{6}", , , , , , , [9]],
          [, , "590(?:2[7-9]|5[12]|87)\\d{4}", , , , "590271234"],
          [, , "69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}", , , , "690001234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "BL",
          590,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BM: [
          ,
          [, , "(?:441|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "441(?:2(?:02|23|[3479]\\d|61)|[46]\\d\\d|5(?:4\\d|60|89)|824)\\d{4}",
            ,
            ,
            ,
            "4412345678",
            ,
            ,
            ,
            [7],
          ],
          [, , "441(?:[37]\\d|5[0-39])\\d{5}", , , , "4413701234", , , , [7]],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
          [, , "900[2-9]\\d{6}", , , , "9002123456"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "BM",
          1,
          "011",
          "1",
          ,
          ,
          "1|([2-8]\\d{6})$",
          "441$1",
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "441",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BN: [
          ,
          [, , "[2-578]\\d{6}", , , , , , , [7]],
          [, , "22[0-7]\\d{4}|(?:2[013-9]|[3-5]\\d)\\d{5}", , , , "2345678"],
          [, , "(?:22[89]|[78]\\d\\d)\\d{4}", , , , "7123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "BN",
          673,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-578]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BO: [
          ,
          [, , "(?:[2-467]\\d{3}|80017)\\d{4}", , , , , , , [8, 9], [7]],
          [
            ,
            ,
            "(?:2(?:2\\d\\d|5(?:11|[258]\\d|9[67])|6(?:12|2\\d|9[34])|8(?:2[34]|39|62))|3(?:3\\d\\d|4(?:6\\d|8[24])|8(?:25|42|5[257]|86|9[25])|9(?:[27]\\d|3[2-4]|4[248]|5[24]|6[2-6]))|4(?:4\\d\\d|6(?:11|[24689]\\d|72)))\\d{4}",
            ,
            ,
            ,
            "22123456",
            ,
            ,
            [8],
            [7],
          ],
          [, , "[67]\\d{7}", , , , "71234567", , , [8]],
          [, , "80017\\d{4}", , , , "800171234", , , [9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "BO",
          591,
          "00(?:1\\d)?",
          "0",
          ,
          ,
          "0(1\\d)?",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{7})", "$1 $2", ["[23]|4[46]"], , "0$CC $1"],
            [, "(\\d{8})", "$1", ["[67]"], , "0$CC $1"],
            [, "(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["8"], , "0$CC $1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BQ: [
          ,
          [, , "(?:[34]1|7\\d)\\d{5}", , , , , , , [7]],
          [
            ,
            ,
            "(?:318[023]|41(?:6[023]|70)|7(?:1[578]|50)\\d)\\d{3}",
            ,
            ,
            ,
            "7151234",
          ],
          [
            ,
            ,
            "(?:31(?:8[14-8]|9[14578])|416[14-9]|7(?:0[01]|7[07]|8\\d|9[056])\\d)\\d{3}",
            ,
            ,
            ,
            "3181234",
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "BQ",
          599,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "[347]",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BR: [
          ,
          [
            ,
            ,
            "(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-24679]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [8, 9, 10, 11],
          ],
          [
            ,
            ,
            "(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-5]\\d{7}",
            ,
            ,
            ,
            "1123456789",
            ,
            ,
            [10],
            [8],
          ],
          [
            ,
            ,
            "(?:[189][1-9]|2[12478])(?:7|9\\d)\\d{7}|(?:3[1-578]|[46][1-9]|5[13-5]|7[13-579])(?:[6-8]\\d{7}|9\\d{7,8})",
            ,
            ,
            ,
            "11961234567",
            ,
            ,
            [10, 11],
            [8, 9],
          ],
          [, , "800\\d{6,7}", , , , "800123456", , , [9, 10]],
          [, , "300\\d{6}|[59]00\\d{6,7}", , , , "300123456", , , [9, 10]],
          [
            ,
            ,
            "300\\d{7}|[34]00\\d{5}|4(?:02|37)0\\d{4}",
            ,
            ,
            ,
            "40041234",
            ,
            ,
            [8, 10],
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "BR",
          55,
          "00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)",
          "0",
          ,
          ,
          "0(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?",
          "$2",
          ,
          ,
          [
            [
              ,
              "(\\d{3,5})",
              "$1",
              [
                "1(?:1[25-8]|2[357-9]|3[02-68]|4[12568]|5|6[0-8]|8[015]|9[0-47-9])",
              ],
            ],
            [
              ,
              "(\\d{4})(\\d{4})",
              "$1-$2",
              ["300|4(?:0[02]|37)", "4(?:02|37)0|[34]00"],
            ],
            [
              ,
              "(\\d{4})(\\d{4})",
              "$1-$2",
              ["[2-9]", "[235-9]|4(?:[0-24-9]|3(?:[0-689]|7[1-9]))"],
            ],
            [
              ,
              "(\\d{3})(\\d{2,3})(\\d{4})",
              "$1 $2 $3",
              ["(?:[358]|90)0"],
              "0$1",
            ],
            [, "(\\d{5})(\\d{4})", "$1-$2", ["9"]],
            [
              ,
              "(\\d{2})(\\d{4})(\\d{4})",
              "$1 $2-$3",
              ["(?:[189][1-9]|2[12478])[2-57]|[3-7]"],
              "($1)",
              "0 $CC ($1)",
            ],
            [
              ,
              "(\\d{2})(\\d{5})(\\d{4})",
              "$1 $2-$3",
              ["1[1-9]|[2-9]"],
              "($1)",
              "0 $CC ($1)",
            ],
          ],
          [
            [
              ,
              "(\\d{4})(\\d{4})",
              "$1-$2",
              ["300|4(?:0[02]|37)", "4(?:02|37)0|[34]00"],
            ],
            [
              ,
              "(\\d{3})(\\d{2,3})(\\d{4})",
              "$1 $2 $3",
              ["(?:[358]|90)0"],
              "0$1",
            ],
            [
              ,
              "(\\d{2})(\\d{4})(\\d{4})",
              "$1 $2-$3",
              ["(?:[189][1-9]|2[12478])[2-57]|[3-7]"],
              "($1)",
              "0 $CC ($1)",
            ],
            [
              ,
              "(\\d{2})(\\d{5})(\\d{4})",
              "$1 $2-$3",
              ["1[1-9]|[2-9]"],
              "($1)",
              "0 $CC ($1)",
            ],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "4020\\d{4}|[34]00\\d{5}", , , , , , , [8]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BS: [
          ,
          [, , "(?:242|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "242(?:3(?:02|[236][1-9]|4[0-24-9]|5[0-68]|7[347]|8[0-4]|9[2-467])|461|502|6(?:0[1-4]|12|2[013]|[45]0|7[67]|8[78]|9[89])|7(?:02|88))\\d{4}",
            ,
            ,
            ,
            "2423456789",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "242(?:3(?:5[79]|7[56]|95)|4(?:[23][1-9]|4[1-35-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-46-9]|65|77)|6[34]6|7(?:27|38)|8(?:0[1-9]|1[02-9]|2\\d|[89]9))\\d{4}",
            ,
            ,
            ,
            "2423591234",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "242300\\d{4}|8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",
            ,
            ,
            ,
            "8002123456",
            ,
            ,
            ,
            [7],
          ],
          [, , "900[2-9]\\d{6}", , , , "9002123456"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "BS",
          1,
          "011",
          "1",
          ,
          ,
          "1|([3-8]\\d{6})$",
          "242$1",
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "242",
          [, , , , , , , , , [-1]],
          [, , "242225[0-46-9]\\d{3}", , , , "2422250123"],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BT: [
          ,
          [, , "[17]\\d{7}|[2-8]\\d{6}", , , , , , , [7, 8], [6]],
          [
            ,
            ,
            "(?:2[3-6]|[34][5-7]|5[236]|6[2-46]|7[246]|8[2-4])\\d{5}",
            ,
            ,
            ,
            "2345678",
            ,
            ,
            [7],
            [6],
          ],
          [, , "(?:1[67]|77)\\d{6}", , , , "17123456", , , [8]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "BT",
          975,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{3})", "$1 $2", ["[2-7]"]],
            [, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-68]|7[246]"]],
            [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[67]|7"]],
          ],
          [
            [, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-68]|7[246]"]],
            [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[67]|7"]],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BW: [
          ,
          [, , "90\\d{5}|(?:[2-6]|7\\d)\\d{6}", , , , , , , [7, 8]],
          [
            ,
            ,
            "(?:2(?:4[0-48]|6[0-24]|9[0578])|3(?:1[0-35-9]|55|[69]\\d|7[01])|4(?:6[03]|7[1267]|9[0-5])|5(?:3[0389]|4[0489]|7[1-47]|88|9[0-49])|6(?:2[1-35]|5[149]|8[067]))\\d{4}",
            ,
            ,
            ,
            "2401234",
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "77200\\d{3}|7(?:[1-6]\\d|7[014-8])\\d{5}",
            ,
            ,
            ,
            "71123456",
            ,
            ,
            [8],
          ],
          [, , , , , , , , , [-1]],
          [, , "90\\d{5}", , , , "9012345", , , [7]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "79(?:1(?:[01]\\d|20)|2[0-2]\\d)\\d{3}",
            ,
            ,
            ,
            "79101234",
            ,
            ,
            [8],
          ],
          "BW",
          267,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{5})", "$1 $2", ["90"]],
            [, "(\\d{3})(\\d{4})", "$1 $2", ["[2-6]"]],
            [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BY: [
          ,
          [
            ,
            ,
            "(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 7, 8, 9, 10, 11],
            [5],
          ],
          [
            ,
            ,
            "(?:1(?:5(?:1[1-5]|[24]\\d|6[2-4]|9[1-7])|6(?:[235]\\d|4[1-7])|7\\d\\d)|2(?:1(?:[246]\\d|3[0-35-9]|5[1-9])|2(?:[235]\\d|4[0-8])|3(?:[26]\\d|3[02-79]|4[024-7]|5[03-7])))\\d{5}",
            ,
            ,
            ,
            "152450911",
            ,
            ,
            [9],
            [5, 6, 7],
          ],
          [
            ,
            ,
            "(?:2(?:5[5-79]|9[1-9])|(?:33|44)\\d)\\d{6}",
            ,
            ,
            ,
            "294911911",
            ,
            ,
            [9],
          ],
          [, , "800\\d{3,7}|8(?:0[13]|20\\d)\\d{7}", , , , "8011234567"],
          [, , "(?:810|902)\\d{7}", , , , "9021234567", , , [10]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "249\\d{6}", , , , "249123456", , , [9]],
          "BY",
          375,
          "810",
          "8",
          ,
          ,
          "0|80?",
          ,
          "8~10",
          ,
          [
            [, "(\\d{3})(\\d{3})", "$1 $2", ["800"], "8 $1"],
            [, "(\\d{3})(\\d{2})(\\d{2,4})", "$1 $2 $3", ["800"], "8 $1"],
            [
              ,
              "(\\d{4})(\\d{2})(\\d{3})",
              "$1 $2-$3",
              [
                "1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])",
                "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])",
              ],
              "8 0$1",
            ],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2-$3-$4",
              ["1(?:[56]|7[467])|2[1-3]"],
              "8 0$1",
            ],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2-$3-$4",
              ["[1-4]"],
              "8 0$1",
            ],
            [, "(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[89]"], "8 $1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "800\\d{3,7}|(?:8(?:0[13]|10|20\\d)|902)\\d{7}"],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        BZ: [
          ,
          [, , "(?:0800\\d|[2-8])\\d{6}", , , , , , , [7, 11]],
          [, , "(?:236|732)\\d{4}|[2-578][02]\\d{5}", , , , "2221234", , , [7]],
          [, , "6[0-35-7]\\d{5}", , , , "6221234", , , [7]],
          [, , "0800\\d{7}", , , , "08001234123", , , [11]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "BZ",
          501,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1-$2", ["[2-8]"]],
            [, "(\\d)(\\d{3})(\\d{4})(\\d{3})", "$1-$2-$3-$4", ["0"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CA: [
          ,
          [, , "(?:[2-8]\\d|90)\\d{8}", , , , , , , [10], [7]],
          [
            ,
            ,
            "(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}",
            ,
            ,
            ,
            "5062345678",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}",
            ,
            ,
            ,
            "5062345678",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
          [, , "900[2-9]\\d{6}", , , , "9002123456"],
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "(?:5(?:00|2[12]|33|44|66|77|88)|622)[2-9]\\d{6}",
            ,
            ,
            ,
            "5002345678",
          ],
          [, , "600[2-9]\\d{6}", , , , "6002012345"],
          "CA",
          1,
          "011",
          "1",
          ,
          ,
          "1",
          ,
          ,
          1,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CC: [
          ,
          [
            ,
            ,
            "1\\d{5,9}|(?:[48]\\d\\d|550)\\d{6}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 7, 8, 9, 10],
          ],
          [
            ,
            ,
            "8(?:51(?:0(?:02|31|60)|118)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}",
            ,
            ,
            ,
            "891621234",
            ,
            ,
            [9],
            [8],
          ],
          [
            ,
            ,
            "4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[0-2457-9]|9[017-9])\\d{6}",
            ,
            ,
            ,
            "412345678",
            ,
            ,
            [9],
          ],
          [, , "180(?:0\\d{3}|2)\\d{3}", , , , "1800123456", , , [7, 10]],
          [, , "190[0-26]\\d{6}", , , , "1900123456", , , [10]],
          [
            ,
            ,
            "13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",
            ,
            ,
            ,
            "1300123456",
            ,
            ,
            [6, 8, 10],
          ],
          [, , , , , , , , , [-1]],
          [, , "1471\\d{5}|(?:145|550)\\d{6}", , , , "550123456", , , [9]],
          "CC",
          61,
          "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011",
          "0",
          ,
          ,
          "0|([59]\\d{7})$",
          "8$1",
          "0011",
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CD: [
          ,
          [, , "[189]\\d{8}|[1-68]\\d{6}", , , , , , , [7, 9]],
          [, , "12\\d{7}|[1-6]\\d{6}", , , , "1234567"],
          [, , "88\\d{5}|(?:8[0-2459]|9[017-9])\\d{7}", , , , "991234567"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "CD",
          243,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["88"], "0$1"],
            [, "(\\d{2})(\\d{5})", "$1 $2", ["[1-6]"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CF: [
          ,
          [, , "(?:[27]\\d{3}|8776)\\d{4}", , , , , , , [8]],
          [, , "2[12]\\d{6}", , , , "21612345"],
          [, , "7[0257]\\d{6}", , , , "70012345"],
          [, , , , , , , , , [-1]],
          [, , "8776\\d{4}", , , , "87761234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "CF",
          236,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[278]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CG: [
          ,
          [, , "222\\d{6}|(?:0\\d|80)\\d{7}", , , , , , , [9]],
          [, , "222[1-589]\\d{5}", , , , "222123456"],
          [, , "0[14-6]\\d{7}", , , , "061234567"],
          [, , , , , , , , , [-1]],
          [, , "80(?:0\\d\\d|11[0-4])\\d{4}", , , , "800123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "CG",
          242,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["801"]],
            [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["8"]],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[02]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CH: [
          ,
          [, , "8\\d{11}|[2-9]\\d{8}", , , , , , , [9, 12]],
          [
            ,
            ,
            "(?:2[12467]|3[1-4]|4[134]|5[256]|6[12]|[7-9]1)\\d{7}",
            ,
            ,
            ,
            "212345678",
            ,
            ,
            [9],
          ],
          [, , "7[35-9]\\d{7}", , , , "781234567", , , [9]],
          [, , "800\\d{6}", , , , "800123456", , , [9]],
          [, , "90[016]\\d{6}", , , , "900123456", , , [9]],
          [, , "84[0248]\\d{6}", , , , "840123456", , , [9]],
          [, , "878\\d{6}", , , , "878123456", , , [9]],
          [, , , , , , , , , [-1]],
          "CH",
          41,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[047]|90"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[2-79]|81"],
              "0$1",
            ],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4 $5",
              ["8"],
              "0$1",
            ],
          ],
          ,
          [, , "74[0248]\\d{6}", , , , "740123456", , , [9]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "5[18]\\d{7}", , , , "581234567", , , [9]],
          ,
          ,
          [, , "860\\d{9}", , , , "860123456789", , , [12]],
        ],
        CI: [
          ,
          [, , "[02-8]\\d{7}", , , , , , , [8]],
          [
            ,
            ,
            "(?:2(?:0[023]|1[02357]|[23][045]|4[03-5])|3(?:0[06]|1[069]|[2-4][07]|5[09]|6[08]))\\d{5}",
            ,
            ,
            ,
            "21234567",
          ],
          [, , "(?:[07][1-9]|[45]\\d|6[014-9]|8[4-9])\\d{6}", , , , "01234567"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "CI",
          225,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[02-8]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CK: [
          ,
          [, , "[2-8]\\d{4}", , , , , , , [5]],
          [, , "(?:2\\d|3[13-7]|4[1-5])\\d{3}", , , , "21234"],
          [, , "[5-8]\\d{4}", , , , "71234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "CK",
          682,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{3})", "$1 $2", ["[2-8]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CL: [
          ,
          [, , "1230\\d{7}|6\\d{9,10}|[2-9]\\d{8}", , , , , , , [9, 10, 11]],
          [
            ,
            ,
            "21962\\d{4}|(?:232[0-46-8]|80[1-9]\\d)\\d{5}|(?:22|3[2-5]|[47][1-35]|5[1-3578]|6[13-57]|8[1-9]|9[2-9])\\d{7}",
            ,
            ,
            ,
            "221234567",
            ,
            ,
            [9],
          ],
          [
            ,
            ,
            "21962\\d{4}|(?:232[0-46-8]|80[1-9]\\d)\\d{5}|(?:22|3[2-5]|[47][1-35]|5[1-3578]|6[13-57]|8[1-9]|9[2-9])\\d{7}",
            ,
            ,
            ,
            "221234567",
            ,
            ,
            [9],
          ],
          [, , "(?:1230\\d|800)\\d{6}", , , , "800123456", , , [9, 11]],
          [, , , , , , , , , [-1]],
          [, , "600\\d{7,8}", , , , "6001234567", , , [10, 11]],
          [, , , , , , , , , [-1]],
          [, , "44\\d{7}", , , , "441234567", , , [9]],
          "CL",
          56,
          "(?:0|1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))0",
          ,
          ,
          ,
          ,
          ,
          ,
          1,
          [
            [, "(\\d{4})", "$1", ["1(?:[03-589]|21)|[29]0|78"]],
            [, "(\\d{5})(\\d{4})", "$1 $2", ["21"], "($1)"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["44"]],
            [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[23]"], "($1)"],
            [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["9[2-9]"]],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{4})",
              "$1 $2 $3",
              ["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"],
              "($1)",
            ],
            [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"]],
            [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]],
            [, "(\\d{3})(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"]],
          ],
          [
            [, "(\\d{5})(\\d{4})", "$1 $2", ["21"], "($1)"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["44"]],
            [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[23]"], "($1)"],
            [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["9[2-9]"]],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{4})",
              "$1 $2 $3",
              ["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"],
              "($1)",
            ],
            [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"]],
            [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]],
            [, "(\\d{3})(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"]],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "600\\d{7,8}", , , , , , , [10, 11]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CM: [
          ,
          [, , "(?:[26]\\d\\d|88)\\d{6}", , , , , , , [8, 9]],
          [, , "2(?:22|33|4[23])\\d{6}", , , , "222123456", , , [9]],
          [, , "6[5-9]\\d{7}", , , , "671234567", , , [9]],
          [, , "88\\d{6}", , , , "88012345", , , [8]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "CM",
          237,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["88"]],
            [
              ,
              "(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4 $5",
              ["[26]"],
            ],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CN: [
          ,
          [
            ,
            ,
            "1[1279]\\d{8,9}|2\\d{9}(?:\\d{2})?|[12]\\d{6,7}|86\\d{6}|(?:1[03-68]\\d|6)\\d{7,9}|(?:[3-579]\\d|8[0-57-9])\\d{6,9}",
            ,
            ,
            ,
            ,
            ,
            ,
            [7, 8, 9, 10, 11, 12],
            [5, 6],
          ],
          [
            ,
            ,
            "(?:10(?:[02-79]\\d\\d|[18](?:0[1-9]|[1-9]\\d))|21(?:[18](?:0[1-9]|[1-9]\\d)|[2-79]\\d\\d))\\d{5}|(?:43[35]|754|851)\\d{7,8}|(?:10|(?:2|85)1|43[35]|754)(?:100\\d\\d|95\\d{3,4})|(?:2[02-57-9]|3(?:11|7[179])|4(?:[15]1|3[12])|5(?:1\\d|2[37]|3[12]|51|7[13-79]|9[15])|7(?:[39]1|5[57]|6[09])|8(?:71|98))(?:[02-8]\\d{7}|1(?:0(?:0\\d\\d(?:\\d{3})?|[1-9]\\d{5})|[1-9]\\d{6})|9(?:[0-46-9]\\d{6}|5\\d{3}(?:\\d(?:\\d{2})?)?))|(?:3(?:1[02-9]|35|49|5\\d|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|3[46-9]|5[2-9]|6[47-9]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[17]\\d|2[248]|3[04-9]|4[3-6]|5[0-3689]|6[2368]|9[02-9])|8(?:078|1[236-8]|2[5-7]|3\\d|5[2-9]|7[02-9]|8[36-8]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:[02-8]\\d{6}|1(?:0(?:0\\d\\d(?:\\d{2})?|[1-9]\\d{4})|[1-9]\\d{5})|9(?:[0-46-9]\\d{5}|5\\d{3,5}))",
            ,
            ,
            ,
            "1012345678",
            ,
            ,
            [7, 8, 9, 10, 11],
            [5, 6],
          ],
          [
            ,
            ,
            "1740[0-5]\\d{6}|1(?:[38]\\d|4[57]|5[0-35-9]|6[25-7]|7[0-35-8]|9[189])\\d{8}",
            ,
            ,
            ,
            "13123456789",
            ,
            ,
            [11],
          ],
          [, , "(?:(?:10|21)8|8)00\\d{7}", , , , "8001234567", , , [10, 12]],
          [, , "16[08]\\d{5}", , , , "16812345", , , [8]],
          [
            ,
            ,
            "400\\d{7}|950\\d{7,8}|(?:10|2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))96\\d{3,4}",
            ,
            ,
            ,
            "4001234567",
            ,
            ,
            [7, 8, 9, 10, 11],
            [5, 6],
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "CN",
          86,
          "00|1(?:[12]\\d|79|9[0-7])\\d\\d00",
          "0",
          ,
          ,
          "0|(1(?:[12]\\d|79|9[0-7])\\d\\d)",
          ,
          "00",
          ,
          [
            [, "(\\d{5,6})", "$1", ["96"]],
            [
              ,
              "(\\d{2})(\\d{5,6})",
              "$1 $2",
              [
                "(?:10|2[0-57-9])[19]",
                "(?:10|2[0-57-9])(?:10|9[56])",
                "(?:10|2[0-57-9])(?:100|9[56])",
              ],
              "0$1",
              "$CC $1",
            ],
            [
              ,
              "(\\d{3})(\\d{4})",
              "$1 $2",
              [
                "[1-9]",
                "1[1-9]|26|[3-9]|(?:10|2[0-57-9])(?:[0-8]|9[0-47-9])",
                "1[1-9]|26|[3-9]|(?:10|2[0-57-9])(?:[02-8]|1(?:0[1-9]|[1-9])|9[0-47-9])",
              ],
            ],
            [, "(\\d{4})(\\d{4})", "$1 $2", ["16[08]"]],
            [
              ,
              "(\\d{3})(\\d{5,6})",
              "$1 $2",
              [
                "3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]",
                "(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]",
                "85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])",
                "85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])",
              ],
              "0$1",
              "$CC $1",
            ],
            [
              ,
              "(\\d{4})(\\d{4})",
              "$1 $2",
              [
                "[1-9]",
                "1[1-9]|26|[3-9]|(?:10|2[0-57-9])(?:[0-8]|9[0-47-9])",
                "26|3(?:[0268]|9[079])|4(?:[049]|2[02-68]|[35]0|6[0-356]|8[014-9])|5(?:0|2[0-24-689]|4[0-2457-9]|6[057-9]|90)|6(?:[0-24578]|6[14-79]|9[03-9])|7(?:0[02-9]|2[0135-79]|3[23]|4[0-27-9]|6[1457]|8)|8(?:[046]|1[01459]|2[0-489]|50|8[0-2459]|9[09])|9(?:0[0457]|1[08]|[268]|4[024-9])|(?:34|85[23])[0-8]|(?:1|58)[1-9]|(?:63|95)[06-9]|(?:33|85[23]9)[0-46-9]|(?:10|2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:[0-8]|9[0-47-9])",
                "26|3(?:[0268]|3[0-46-9]|4[0-8]|9[079])|4(?:[049]|2[02-68]|[35]0|6[0-356]|8[014-9])|5(?:0|2[0-24-689]|4[0-2457-9]|6[057-9]|90)|6(?:[0-24578]|3[06-9]|6[14-79]|9[03-9])|7(?:0[02-9]|2[0135-79]|3[23]|4[0-27-9]|6[1457]|8)|8(?:[046]|1[01459]|2[0-489]|5(?:0|[23](?:[02-8]|1[1-9]|9[0-46-9]))|8[0-2459]|9[09])|9(?:0[0457]|1[08]|[268]|4[024-9]|5[06-9])|(?:1|58|85[23]10)[1-9]|(?:10|2[0-57-9])(?:[0-8]|9[0-47-9])|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:[02-8]|1(?:0[1-9]|[1-9])|9[0-47-9])",
              ],
            ],
            [
              ,
              "(\\d{4})(\\d{5,6})",
              "$1 $2",
              ["807", "8078", "8078[19]", "8078(?:10|95)", "8078(?:100|95)"],
              "0$1",
              "$CC $1",
            ],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["(?:4|80)0"]],
            [
              ,
              "(\\d{2})(\\d{4})(\\d{4})",
              "$1 $2 $3",
              [
                "10|2(?:[02-57-9]|1[1-9])",
                "10|2(?:[02-57-9]|1[1-9])",
                "10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])",
              ],
              "0$1",
              "$CC $1",
              1,
            ],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{4})",
              "$1 $2 $3",
              [
                "3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]",
              ],
              "0$1",
              "$CC $1",
              1,
            ],
            [, "(\\d{3})(\\d{7,8})", "$1 $2", ["9"]],
            [
              ,
              "(\\d{4})(\\d{3})(\\d{4})",
              "$1 $2 $3",
              ["80"],
              "0$1",
              "$CC $1",
              1,
            ],
            [
              ,
              "(\\d{3})(\\d{4})(\\d{4})",
              "$1 $2 $3",
              ["[3-578]"],
              "0$1",
              "$CC $1",
              1,
            ],
            [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-9]"], , "$CC $1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{3})(\\d{4})",
              "$1 $2 $3 $4",
              ["[12]"],
              "0$1",
              ,
              1,
            ],
          ],
          [
            [
              ,
              "(\\d{2})(\\d{5,6})",
              "$1 $2",
              [
                "(?:10|2[0-57-9])[19]",
                "(?:10|2[0-57-9])(?:10|9[56])",
                "(?:10|2[0-57-9])(?:100|9[56])",
              ],
              "0$1",
              "$CC $1",
            ],
            [
              ,
              "(\\d{3})(\\d{5,6})",
              "$1 $2",
              [
                "3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]",
                "(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]",
                "85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])",
                "85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])",
              ],
              "0$1",
              "$CC $1",
            ],
            [
              ,
              "(\\d{4})(\\d{5,6})",
              "$1 $2",
              ["807", "8078", "8078[19]", "8078(?:10|95)", "8078(?:100|95)"],
              "0$1",
              "$CC $1",
            ],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["(?:4|80)0"]],
            [
              ,
              "(\\d{2})(\\d{4})(\\d{4})",
              "$1 $2 $3",
              [
                "10|2(?:[02-57-9]|1[1-9])",
                "10|2(?:[02-57-9]|1[1-9])",
                "10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])",
              ],
              "0$1",
              "$CC $1",
              1,
            ],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{4})",
              "$1 $2 $3",
              [
                "3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]",
              ],
              "0$1",
              "$CC $1",
              1,
            ],
            [, "(\\d{3})(\\d{7,8})", "$1 $2", ["9"]],
            [
              ,
              "(\\d{4})(\\d{3})(\\d{4})",
              "$1 $2 $3",
              ["80"],
              "0$1",
              "$CC $1",
              1,
            ],
            [
              ,
              "(\\d{3})(\\d{4})(\\d{4})",
              "$1 $2 $3",
              ["[3-578]"],
              "0$1",
              "$CC $1",
              1,
            ],
            [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-9]"], , "$CC $1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{3})(\\d{4})",
              "$1 $2 $3 $4",
              ["[12]"],
              "0$1",
              ,
              1,
            ],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [
            ,
            ,
            "(?:(?:10|21)8|[48])00\\d{7}|950\\d{7,8}",
            ,
            ,
            ,
            ,
            ,
            ,
            [10, 11, 12],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CO: [
          ,
          [, , "(?:1\\d|3)\\d{9}|[124-8]\\d{7}", , , , , , , [8, 10, 11], [7]],
          [, , "[124-8][2-9]\\d{6}", , , , "12345678", , , [8], [7]],
          [
            ,
            ,
            "3(?:0[0-5]|1\\d|2[0-3]|5[01])\\d{7}",
            ,
            ,
            ,
            "3211234567",
            ,
            ,
            [10],
          ],
          [, , "1800\\d{7}", , , , "18001234567", , , [11]],
          [, , "19(?:0[01]|4[78])\\d{7}", , , , "19001234567", , , [11]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "CO",
          57,
          "00(?:4(?:[14]4|56)|[579])",
          "0",
          ,
          ,
          "0([3579]|4(?:[14]4|56))?",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d)(\\d{7})",
              "$1 $2",
              ["1[2-79]|[25-8]|(?:18|4)[2-9]"],
              "($1)",
              "0$CC $1",
            ],
            [, "(\\d{3})(\\d{7})", "$1 $2", ["3"], , "0$CC $1"],
            [
              ,
              "(\\d)(\\d{3})(\\d{7})",
              "$1-$2-$3",
              ["1(?:80|9)", "1(?:800|9)"],
              "0$1",
            ],
          ],
          [
            [
              ,
              "(\\d)(\\d{7})",
              "$1 $2",
              ["1[2-79]|[25-8]|(?:18|4)[2-9]"],
              "($1)",
              "0$CC $1",
            ],
            [, "(\\d{3})(\\d{7})", "$1 $2", ["3"], , "0$CC $1"],
            [
              ,
              "(\\d)(\\d{3})(\\d{7})",
              "$1 $2 $3",
              ["1(?:80|9)", "1(?:800|9)"],
            ],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CR: [
          ,
          [, , "(?:8\\d|90)\\d{8}|[24-8]\\d{7}", , , , , , , [8, 10]],
          [
            ,
            ,
            "210[7-9]\\d{4}|2(?:[024-7]\\d|1[1-9])\\d{5}",
            ,
            ,
            ,
            "22123456",
            ,
            ,
            [8],
          ],
          [
            ,
            ,
            "6500[01]\\d{3}|5(?:0[01]|7[0-3])\\d{5}|(?:6[0-4]|7[0-3]|8[3-9])\\d{6}",
            ,
            ,
            ,
            "83123456",
            ,
            ,
            [8],
          ],
          [, , "800\\d{7}", , , , "8001234567", , , [10]],
          [, , "90[059]\\d{7}", , , , "9001234567", , , [10]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "(?:210[0-6]|4\\d{3}|5100)\\d{4}", , , , "40001234", , , [8]],
          "CR",
          506,
          "00",
          ,
          ,
          ,
          "(19(?:0[0-2468]|1[09]|20|66|77|99))",
          ,
          ,
          ,
          [
            [, "(\\d{4})(\\d{4})", "$1 $2", ["[24-7]|8[3-9]"], , "$CC $1"],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[89]"], , "$CC $1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CU: [
          ,
          [
            ,
            ,
            "[27]\\d{6,7}|[34]\\d{5,7}|5\\d{7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 7, 8],
            [4, 5],
          ],
          [
            ,
            ,
            "(?:3[23]|4[78])\\d{4,6}|(?:31|4[36])\\d{6}|(?:2[1-4]|4[125]|7\\d)\\d{5,6}",
            ,
            ,
            ,
            "71234567",
            ,
            ,
            ,
            [4, 5],
          ],
          [, , "5\\d{7}", , , , "51234567", , , [8]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "CU",
          53,
          "119",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{4,6})", "$1 $2", ["[2-4]"], "(0$1)"],
            [, "(\\d)(\\d{6,7})", "$1 $2", ["7"], "(0$1)"],
            [, "(\\d)(\\d{7})", "$1 $2", ["5"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CV: [
          ,
          [, , "[2-59]\\d{6}", , , , , , , [7]],
          [
            ,
            ,
            "2(?:2[1-7]|3[0-8]|4[12]|5[1256]|6\\d|7[1-3]|8[1-5])\\d{4}",
            ,
            ,
            ,
            "2211234",
          ],
          [, , "(?:[34][36]|5[1-389]|9\\d)\\d{5}", , , , "9911234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "CV",
          238,
          "0",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-59]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CW: [
          ,
          [, , "(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}", , , , , , , [7, 8]],
          [
            ,
            ,
            "9(?:4(?:3[0-5]|4[14]|6\\d)|50\\d|7(?:2[014]|3[02-9]|4[4-9]|6[357]|77|8[7-9])|8(?:3[39]|[46]\\d|7[01]|8[57-9]))\\d{4}",
            ,
            ,
            ,
            "94351234",
          ],
          [, , "953[01]\\d{4}|9(?:5[12467]|6[5-9])\\d{5}", , , , "95181234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "60[0-2]\\d{4}", , , , "6001234", , , [7]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "CW",
          599,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1 $2", ["[3467]"]],
            [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["9[4-8]"]],
          ],
          ,
          [, , "955\\d{5}", , , , "95581234", , , [8]],
          1,
          "[69]",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CX: [
          ,
          [
            ,
            ,
            "1\\d{5,9}|(?:[48]\\d\\d|550)\\d{6}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 7, 8, 9, 10],
          ],
          [
            ,
            ,
            "8(?:51(?:0(?:01|30|59)|117)|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}",
            ,
            ,
            ,
            "891641234",
            ,
            ,
            [9],
            [8],
          ],
          [
            ,
            ,
            "4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[0-2457-9]|9[017-9])\\d{6}",
            ,
            ,
            ,
            "412345678",
            ,
            ,
            [9],
          ],
          [, , "180(?:0\\d{3}|2)\\d{3}", , , , "1800123456", , , [7, 10]],
          [, , "190[0-26]\\d{6}", , , , "1900123456", , , [10]],
          [
            ,
            ,
            "13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",
            ,
            ,
            ,
            "1300123456",
            ,
            ,
            [6, 8, 10],
          ],
          [, , , , , , , , , [-1]],
          [, , "1471\\d{5}|(?:145|550)\\d{6}", , , , "550123456", , , [9]],
          "CX",
          61,
          "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011",
          "0",
          ,
          ,
          "0|([59]\\d{7})$",
          "8$1",
          "0011",
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CY: [
          ,
          [, , "(?:[279]\\d|[58]0)\\d{6}", , , , , , , [8]],
          [, , "2[2-6]\\d{6}", , , , "22345678"],
          [, , "9[4-79]\\d{6}", , , , "96123456"],
          [, , "800\\d{5}", , , , "80001234"],
          [, , "90[09]\\d{5}", , , , "90012345"],
          [, , "80[1-9]\\d{5}", , , , "80112345"],
          [, , "700\\d{5}", , , , "70012345"],
          [, , , , , , , , , [-1]],
          "CY",
          357,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{6})", "$1 $2", ["[257-9]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "(?:50|77)\\d{6}", , , , "77123456"],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        CZ: [
          ,
          [
            ,
            ,
            "(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}",
            ,
            ,
            ,
            ,
            ,
            ,
            [9, 10, 11, 12],
          ],
          [
            ,
            ,
            "(?:2\\d|3[1257-9]|4[16-9]|5[13-9])\\d{7}",
            ,
            ,
            ,
            "212345678",
            ,
            ,
            [9],
          ],
          [
            ,
            ,
            "(?:60[1-8]|7(?:0[2-5]|[2379]\\d))\\d{6}",
            ,
            ,
            ,
            "601123456",
            ,
            ,
            [9],
          ],
          [, , "800\\d{6}", , , , "800123456", , , [9]],
          [, , "9(?:0[05689]|76)\\d{6}", , , , "900123456", , , [9]],
          [, , "8[134]\\d{7}", , , , "811234567", , , [9]],
          [, , "70[01]\\d{6}", , , , "700123456", , , [9]],
          [, , "9[17]0\\d{6}", , , , "910123456", , , [9]],
          "CZ",
          420,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]|9[015-7]"]],
            [, "(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]],
            [, "(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "9(?:5\\d|7[2-4])\\d{6}", , , , "972123456", , , [9]],
          ,
          ,
          [, , "9(?:3\\d{9}|6\\d{7,10})", , , , "93123456789"],
        ],
        DE: [
          ,
          [
            ,
            ,
            "[2579]\\d{5,14}|49[67]0\\d{1,4}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|7[89]|9\\d)\\d{1,3}|49(?:[12]\\d|3[1-689]|7[1-7])\\d{1,8}|49(?:[05]\\d|[46][1-8])\\d{1,9}|(?:1|[368]\\d|4[0-8])\\d{3,13}",
            ,
            ,
            ,
            ,
            ,
            ,
            [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            [3],
          ],
          [
            ,
            ,
            "(?:2(?:0[1-689]|[1-3569]\\d|4[0-8]|7[1-7]|8[0-7])|5(?:0[2-8]|[124-6]\\d|[38][0-8]|[79][0-7])|6(?:0[02-9]|[1-3589]\\d|[47][0-8]|6[1-9])|7(?:0[2-8]|1[1-9]|[27][0-7]|3\\d|[4-6][0-8]|8[0-5]|9[013-7])|8(?:0[2-9]|1[0-79]|[29]\\d|3[0-46-9]|4[0-6]|5[013-9]|6[1-8]|7[0-8]|8[0-24-6])|9(?:0[6-9]|[1-4]\\d|[589][0-7]|6[0-8]|7[0-467]))\\d{4,12}|3(?:(?:[03569]\\d|4[0-79]|7[1-7]|8[1-8])\\d{4,12}|2\\d{9})|4(?:(?:[02-48]\\d|1[02-9]|5[0-6]|6[0-8]|7[0-79])\\d{4,12}|9(?:[0-37]\\d{4,9}|[4-6]\\d{4,10}))|(?:2(?:0[1-389]|1[124]|2[18]|3[14]|[4-9]1)|[57][1-9]1|9(?:06|[1-9]1))\\d{3}|3(?:0\\d{3,4}|(?:[35-9][15]|4[015])\\d{3})|4(?:0\\d{3,4}|[2-9]1\\d{3})|[68](?:[1-8]1\\d{3}|9\\d{3,4})",
            ,
            ,
            ,
            "30123456",
            ,
            ,
            [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            [3, 4],
          ],
          [
            ,
            ,
            "15[0-25-9]\\d{8}|1(?:6[023]|7\\d)\\d{7,8}",
            ,
            ,
            ,
            "15123456789",
            ,
            ,
            [10, 11],
          ],
          [
            ,
            ,
            "800\\d{7,12}",
            ,
            ,
            ,
            "8001234567890",
            ,
            ,
            [10, 11, 12, 13, 14, 15],
          ],
          [
            ,
            ,
            "(?:137[7-9]|900(?:[135]|9\\d))\\d{6}",
            ,
            ,
            ,
            "9001234567",
            ,
            ,
            [10, 11],
          ],
          [
            ,
            ,
            "180\\d{5,11}|13(?:7[1-6]\\d\\d|8)\\d{4}",
            ,
            ,
            ,
            "18012345",
            ,
            ,
            [7, 8, 9, 10, 11, 12, 13, 14],
          ],
          [, , "700\\d{8}", , , , "70012345678", , , [11]],
          [, , , , , , , , , [-1]],
          "DE",
          49,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{3,13})", "$1 $2", ["3[02]|40|[68]9"], "0$1"],
            [
              ,
              "(\\d{3})(\\d{3,12})",
              "$1 $2",
              [
                "2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1",
                "2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1",
              ],
              "0$1",
            ],
            [, "(\\d{3})(\\d{4})", "$1 $2", ["138"], "0$1"],
            [
              ,
              "(\\d{4})(\\d{3,11})",
              "$1 $2",
              [
                "[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]",
                "[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]",
              ],
              "0$1",
            ],
            [, "(\\d{3})(\\d{5,11})", "$1 $2", ["181"], "0$1"],
            [, "(\\d{3})(\\d)(\\d{4,10})", "$1 $2 $3", ["1(?:3|80)|9"], "0$1"],
            [, "(\\d{5})(\\d{3,10})", "$1 $2", ["3"], "0$1"],
            [, "(\\d{3})(\\d{7,8})", "$1 $2", ["1[67]"], "0$1"],
            [, "(\\d{3})(\\d{7,12})", "$1 $2", ["8"], "0$1"],
            [, "(\\d{5})(\\d{6})", "$1 $2", ["185", "1850", "18500"], "0$1"],
            [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"],
            [, "(\\d{4})(\\d{7})", "$1 $2", ["18[68]"], "0$1"],
            [, "(\\d{5})(\\d{6})", "$1 $2", ["15[0568]"], "0$1"],
            [, "(\\d{4})(\\d{7})", "$1 $2", ["15[1279]"], "0$1"],
            [, "(\\d{3})(\\d{8})", "$1 $2", ["18"], "0$1"],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{7,8})",
              "$1 $2 $3",
              ["1(?:6[023]|7)"],
              "0$1",
            ],
            [, "(\\d{4})(\\d{2})(\\d{7})", "$1 $2 $3", ["15[279]"], "0$1"],
            [, "(\\d{3})(\\d{2})(\\d{8})", "$1 $2 $3", ["15"], "0$1"],
          ],
          ,
          [
            ,
            ,
            "16(?:4\\d{1,10}|[89]\\d{1,11})",
            ,
            ,
            ,
            "16412345",
            ,
            ,
            [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
          ],
          ,
          ,
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "18(?:1\\d{5,11}|[2-9]\\d{8})",
            ,
            ,
            ,
            "18500123456",
            ,
            ,
            [8, 9, 10, 11, 12, 13, 14],
          ],
          ,
          ,
          [
            ,
            ,
            "1(?:6(?:013|255|399)|7(?:(?:[015]1|[69]3)3|[2-4]55|[78]99))\\d{7,8}|15(?:(?:[03-68]00|113)\\d|2\\d55|7\\d99|9\\d33)\\d{7}",
            ,
            ,
            ,
            "177991234567",
            ,
            ,
            [12, 13],
          ],
        ],
        DJ: [
          ,
          [, , "(?:2\\d|77)\\d{6}", , , , , , , [8]],
          [, , "2(?:1[2-5]|7[45])\\d{5}", , , , "21360003"],
          [, , "77\\d{6}", , , , "77831001"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "DJ",
          253,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[27]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        DK: [
          ,
          [, , "[2-9]\\d{7}", , , , , , , [8]],
          [, , "(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}", , , , "32123456"],
          [, , "(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}", , , , "32123456"],
          [, , "80\\d{6}", , , , "80123456"],
          [, , "90\\d{6}", , , , "90123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "DK",
          45,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          1,
          [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-9]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        DM: [
          ,
          [, , "(?:[58]\\d\\d|767|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "767(?:2(?:55|66)|4(?:2[01]|4[0-25-9])|50[0-4]|70[1-3])\\d{4}",
            ,
            ,
            ,
            "7674201234",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "767(?:2(?:[2-4689]5|7[5-7])|31[5-7]|61[1-7])\\d{4}",
            ,
            ,
            ,
            "7672251234",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
          [, , "900[2-9]\\d{6}", , , , "9002123456"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "DM",
          1,
          "011",
          "1",
          ,
          ,
          "1|([2-7]\\d{6})$",
          "767$1",
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "767",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        DO: [
          ,
          [, , "(?:[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "8(?:[04]9[2-9]\\d\\d|29(?:2(?:[0-59]\\d|6[04-9]|7[0-27]|8[0237-9])|3(?:[0-35-9]\\d|4[7-9])|[45]\\d\\d|6(?:[0-27-9]\\d|[3-5][1-9]|6[0135-8])|7(?:0[013-9]|[1-37]\\d|4[1-35689]|5[1-4689]|6[1-57-9]|8[1-79]|9[1-8])|8(?:0[146-9]|1[0-48]|[248]\\d|3[1-79]|5[01589]|6[013-68]|7[124-8]|9[0-8])|9(?:[0-24]\\d|3[02-46-9]|5[0-79]|60|7[0169]|8[57-9]|9[02-9])))\\d{4}",
            ,
            ,
            ,
            "8092345678",
            ,
            ,
            ,
            [7],
          ],
          [, , "8[024]9[2-9]\\d{6}", , , , "8092345678", , , , [7]],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
          [, , "900[2-9]\\d{6}", , , , "9002123456"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "DO",
          1,
          "011",
          "1",
          ,
          ,
          "1",
          ,
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "8[024]9",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        DZ: [
          ,
          [, , "(?:[1-4]|[5-79]\\d|80)\\d{7}", , , , , , , [8, 9]],
          [
            ,
            ,
            "9619\\d{5}|(?:1\\d|2[013-79]|3[0-8]|4[0135689])\\d{6}",
            ,
            ,
            ,
            "12345678",
          ],
          [
            ,
            ,
            "67[0-6]\\d{6}|(?:5[4-6]|6[569]|7[7-9])\\d{7}",
            ,
            ,
            ,
            "551234567",
            ,
            ,
            [9],
          ],
          [, , "800\\d{6}", , , , "800123456", , , [9]],
          [, , "80[3-689]1\\d{5}", , , , "808123456", , , [9]],
          [, , "80[12]1\\d{5}", , , , "801123456", , , [9]],
          [, , , , , , , , , [-1]],
          [, , "98[23]\\d{6}", , , , "983123456", , , [9]],
          "DZ",
          213,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[1-4]"],
              "0$1",
            ],
            [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[5-8]"],
              "0$1",
            ],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        EC: [
          ,
          [
            ,
            ,
            "1800\\d{6,7}|(?:[2-7]|9\\d)\\d{7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [8, 9, 10, 11],
            [7],
          ],
          [, , "[2-7][2-7]\\d{6}", , , , "22123456", , , [8], [7]],
          [
            ,
            ,
            "9630\\d{5}|9(?:39|[57][89]|6[0-27-9]|[89]\\d)\\d{6}",
            ,
            ,
            ,
            "991234567",
            ,
            ,
            [9],
          ],
          [, , "1800\\d{6,7}", , , , "18001234567", , , [10, 11]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "[2-7]890\\d{4}", , , , "28901234", , , [8]],
          "EC",
          593,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1-$2", ["[2-7]"]],
            [, "(\\d)(\\d{3})(\\d{4})", "$1 $2-$3", ["[2-7]"], "(0$1)"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"],
            [, "(\\d{4})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"]],
          ],
          [
            [, "(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-7]"]],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"],
            [, "(\\d{4})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"]],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        EE: [
          ,
          [
            ,
            ,
            "8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d\\d|900)\\d{4}",
            ,
            ,
            ,
            ,
            ,
            ,
            [7, 8, 10],
          ],
          [
            ,
            ,
            "(?:3[23589]|4[3-8]|6\\d|7[1-9]|88)\\d{5}",
            ,
            ,
            ,
            "3212345",
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "(?:5\\d|8[1-4])\\d{6}|5(?:(?:[02]\\d|5[0-478])\\d|1(?:[0-8]\\d|95)|6(?:4[0-4]|5[1-589]))\\d{3}",
            ,
            ,
            ,
            "51234567",
            ,
            ,
            [7, 8],
          ],
          [, , "800(?:(?:0\\d\\d|1)\\d|[2-9])\\d{3}", , , , "80012345"],
          [, , "(?:40\\d\\d|900)\\d{4}", , , , "9001234", , , [7, 8]],
          [, , , , , , , , , [-1]],
          [, , "70[0-2]\\d{5}", , , , "70012345", , , [8]],
          [, , , , , , , , , [-1]],
          "EE",
          372,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{3})(\\d{4})",
              "$1 $2",
              [
                "[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]",
                "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]",
              ],
            ],
            [
              ,
              "(\\d{4})(\\d{3,4})",
              "$1 $2",
              ["[45]|8(?:00|[1-4])", "[45]|8(?:00[1-9]|[1-4])"],
            ],
            [, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["7"]],
            [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["80"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "800[2-9]\\d{3}", , , , , , , [7]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        EG: [
          ,
          [
            ,
            ,
            "[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [8, 9, 10],
            [6, 7],
          ],
          [
            ,
            ,
            "(?:15\\d|57[23])\\d{5,6}|(?:13[23]|(?:2[2-4]|3)\\d|4(?:0[2-5]|[578][23]|64)|5(?:0[2-7]|5\\d)|6[24-689]3|8(?:2[2-57]|4[26]|6[237]|8[2-4])|9(?:2[27]|3[24]|52|6[2356]|7[2-4]))\\d{6}",
            ,
            ,
            ,
            "234567890",
            ,
            ,
            [8, 9],
            [6, 7],
          ],
          [, , "1[0-25]\\d{8}", , , , "1001234567", , , [10]],
          [, , "800\\d{7}", , , , "8001234567", , , [10]],
          [, , "900\\d{7}", , , , "9001234567", , , [10]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "EG",
          20,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{7,8})", "$1 $2", ["[23]"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{6,7})",
              "$1 $2",
              ["1[35]|[4-6]|8[2468]|9[235-7]"],
              "0$1",
            ],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[189]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        EH: [
          ,
          [, , "[5-8]\\d{8}", , , , , , , [9]],
          [, , "528[89]\\d{5}", , , , "528812345"],
          [
            ,
            ,
            "(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0[067]|6[1267]|7[017]))\\d{6}",
            ,
            ,
            ,
            "650123456",
          ],
          [, , "80\\d{7}", , , , "801234567"],
          [, , "89\\d{7}", , , , "891234567"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "5924[01]\\d{4}", , , , "592401234"],
          "EH",
          212,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "528[89]",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        ER: [
          ,
          [, , "[178]\\d{6}", , , , , , , [7], [6]],
          [
            ,
            ,
            "(?:1(?:1[12568]|[24]0|55|6[146])|8\\d\\d)\\d{4}",
            ,
            ,
            ,
            "8370362",
            ,
            ,
            ,
            [6],
          ],
          [, , "(?:17[1-3]|7\\d\\d)\\d{4}", , , , "7123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "ER",
          291,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[178]"], "0$1"]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        ES: [
          ,
          [, , "(?:51|[6-9]\\d)\\d{7}", , , , , , , [9]],
          [
            ,
            ,
            "96906(?:0[0-8]|1[1-9]|[2-9]\\d)\\d\\d|9(?:69(?:0[0-57-9]|[1-9]\\d)|73(?:[0-8]\\d|9[1-9]))\\d{4}|(?:8(?:[1356]\\d|[28][0-8]|[47][1-9])|9(?:[135]\\d|[268][0-8]|4[1-9]|7[124-9]))\\d{6}",
            ,
            ,
            ,
            "810123456",
          ],
          [
            ,
            ,
            "9(?:6906(?:09|10)|7390\\d\\d)\\d\\d|(?:6\\d|7[1-48])\\d{7}",
            ,
            ,
            ,
            "612345678",
          ],
          [, , "[89]00\\d{6}", , , , "800123456"],
          [, , "80[367]\\d{6}", , , , "803123456"],
          [, , "90[12]\\d{6}", , , , "901123456"],
          [, , "70\\d{7}", , , , "701234567"],
          [, , , , , , , , , [-1]],
          "ES",
          34,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{4})", "$1", ["905"]],
            [, "(\\d{6})", "$1", ["[79]9"]],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]],
            [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-9]"]],
          ],
          [
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]],
            [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-9]"]],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "51\\d{7}", , , , "511234567"],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        ET: [
          ,
          [, , "(?:11|[2-59]\\d)\\d{7}", , , , , , , [9], [7]],
          [
            ,
            ,
            "(?:11(?:1(?:1[124]|2[2-57]|3[1-5]|5[5-8]|8[6-8])|2(?:13|3[6-8]|5[89]|7[05-9]|8[2-6])|3(?:2[01]|3[0-289]|4[1289]|7[1-4]|87)|4(?:1[69]|3[2-49]|4[0-3]|6[5-8])|5(?:1[578]|44|5[0-4])|6(?:18|2[69]|39|4[5-7]|5[1-5]|6[0-59]|8[015-8]))|2(?:2(?:11[1-9]|22[0-7]|33\\d|44[1467]|66[1-68])|5(?:11[124-6]|33[2-8]|44[1467]|55[14]|66[1-3679]|77[124-79]|880))|3(?:3(?:11[0-46-8]|(?:22|55)[0-6]|33[0134689]|44[04]|66[01467])|4(?:44[0-8]|55[0-69]|66[0-3]|77[1-5]))|4(?:6(?:22[0-24-7]|33[1-5]|44[13-69]|55[14-689]|660|88[1-4])|7(?:(?:11|22)[1-9]|33[13-7]|44[13-6]|55[1-689]))|5(?:7(?:227|55[05]|(?:66|77)[14-8])|8(?:11[149]|22[013-79]|33[0-68]|44[013-8]|550|66[1-5]|77\\d)))\\d{4}",
            ,
            ,
            ,
            "111112345",
            ,
            ,
            ,
            [7],
          ],
          [, , "9\\d{8}", , , , "911234567"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "ET",
          251,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-59]"], "0$1"]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        FI: [
          ,
          [
            ,
            ,
            "(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}|[1-35689]\\d{4}",
            ,
            ,
            ,
            ,
            ,
            ,
            [5, 6, 7, 8, 9, 10],
          ],
          [
            ,
            ,
            "(?:1[3-79][1-8]|[235689][1-8]\\d)\\d{2,6}",
            ,
            ,
            ,
            "131234567",
            ,
            ,
            [5, 6, 7, 8, 9],
          ],
          [
            ,
            ,
            "(?:4[0-8]|50)\\d{4,8}",
            ,
            ,
            ,
            "412345678",
            ,
            ,
            [6, 7, 8, 9, 10],
          ],
          [, , "800\\d{4,6}", , , , "800123456", , , [7, 8, 9]],
          [, , "[67]00\\d{5,6}", , , , "600123456", , , [8, 9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "FI",
          358,
          "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))",
          "0",
          ,
          ,
          "0",
          ,
          "00",
          ,
          [
            [, "(\\d{5})", "$1", ["75[12]"], "0$1"],
            [
              ,
              "(\\d)(\\d{4,9})",
              "$1 $2",
              ["[2568][1-8]|3(?:0[1-9]|[1-9])|9"],
              "0$1",
            ],
            [, "(\\d{6})", "$1", ["11"]],
            [, "(\\d{3})(\\d{3,7})", "$1 $2", ["(?:[12]0|7)0|[368]"], "0$1"],
            [, "(\\d{2})(\\d{4,8})", "$1 $2", ["[12457]"], "0$1"],
          ],
          [
            [
              ,
              "(\\d)(\\d{4,9})",
              "$1 $2",
              ["[2568][1-8]|3(?:0[1-9]|[1-9])|9"],
              "0$1",
            ],
            [, "(\\d{3})(\\d{3,7})", "$1 $2", ["(?:[12]0|7)0|[368]"], "0$1"],
            [, "(\\d{2})(\\d{4,8})", "$1 $2", ["[12457]"], "0$1"],
          ],
          [, , , , , , , , , [-1]],
          1,
          "1[03-79]|[2-9]",
          [
            ,
            ,
            "20(?:2[023]|9[89])\\d{1,6}|60[12]\\d{5,6}|(?:606|7(?:1|3\\d))\\d{7}|(?:[1-3]00|75[03-9])\\d{3,7}",
          ],
          [
            ,
            ,
            "(?:10|[23][09])\\d{4,8}|60(?:[12]\\d{5,6}|6\\d{7})|7(?:(?:1|3\\d)\\d{7}|5[03-9]\\d{3,7})|20[2-59]\\d\\d",
            ,
            ,
            ,
            "10112345",
          ],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        FJ: [
          ,
          [, , "45\\d{5}|(?:0800\\d|[235-9])\\d{6}", , , , , , , [7, 11]],
          [
            ,
            ,
            "603\\d{4}|(?:3[0-5]|6[25-7]|8[58])\\d{5}",
            ,
            ,
            ,
            "3212345",
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "(?:[279]\\d|45|5[01568]|8[034679])\\d{5}",
            ,
            ,
            ,
            "7012345",
            ,
            ,
            [7],
          ],
          [, , "0800\\d{7}", , , , "08001234567", , , [11]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "FJ",
          679,
          "0(?:0|52)",
          ,
          ,
          ,
          ,
          ,
          "00",
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1 $2", ["[235-9]|45"]],
            [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        FK: [
          ,
          [, , "[2-7]\\d{4}", , , , , , , [5]],
          [, , "[2-47]\\d{4}", , , , "31234"],
          [, , "[56]\\d{4}", , , , "51234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "FK",
          500,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        FM: [
          ,
          [, , "[39]\\d{6}", , , , , , , [7]],
          [, , "(?:3[2357]0[1-9]|9[2-6]\\d\\d)\\d{3}", , , , "3201234"],
          [, , "(?:3[2357]0[1-9]|9[2-7]\\d\\d)\\d{3}", , , , "3501234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "FM",
          691,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{4})", "$1 $2", ["[39]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        FO: [
          ,
          [, , "(?:[2-8]\\d|90)\\d{4}", , , , , , , [6]],
          [, , "(?:20|[34]\\d|8[19])\\d{4}", , , , "201234"],
          [, , "(?:[27][1-9]|5\\d)\\d{4}", , , , "211234"],
          [, , "80[257-9]\\d{3}", , , , "802123"],
          [, , "90(?:[13-5][15-7]|2[125-7]|99)\\d\\d", , , , "901123"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "(?:6[0-36]|88)\\d{4}", , , , "601234"],
          "FO",
          298,
          "00",
          ,
          ,
          ,
          "(10(?:01|[12]0|88))",
          ,
          ,
          ,
          [[, "(\\d{6})", "$1", ["[2-9]"], , "$CC $1"]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        FR: [
          ,
          [, , "[1-9]\\d{8}", , , , , , , [9]],
          [, , "[1-5]\\d{8}", , , , "123456789"],
          [, , "700\\d{6}|(?:6\\d|7[3-9])\\d{7}", , , , "612345678"],
          [, , "80[0-5]\\d{6}", , , , "801234567"],
          [, , "8[129]\\d{7}", , , , "891123456"],
          [, , "884\\d{6}", , , , "884012345"],
          [, , , , , , , , , [-1]],
          [, , "9\\d{8}", , , , "912345678"],
          "FR",
          33,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{4})", "$1", ["10"]],
            [, "(\\d{3})(\\d{3})", "$1 $2", ["1"]],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["8"],
              "0 $1",
            ],
            [
              ,
              "(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4 $5",
              ["[1-79]"],
              "0$1",
            ],
          ],
          [
            [
              ,
              "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["8"],
              "0 $1",
            ],
            [
              ,
              "(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4 $5",
              ["[1-79]"],
              "0$1",
            ],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "80[6-9]\\d{6}", , , , "806123456"],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GA: [
          ,
          [, , "(?:0\\d|[2-7])\\d{6}", , , , , , , [7, 8]],
          [, , "01\\d{6}", , , , "01441234", , , [8]],
          [, , "(?:0[2-7]|[2-7])\\d{6}", , , , "06031234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "GA",
          241,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [
              ,
              "(\\d)(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[2-7]"],
              "0$1",
            ],
            [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GB: [
          ,
          [
            ,
            ,
            "[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}",
            ,
            ,
            ,
            ,
            ,
            ,
            [7, 9, 10],
            [4, 5, 6, 8],
          ],
          [
            ,
            ,
            "(?:1(?:1(?:3[0-58]|4[0-5]|5[0-26-9]|6[0-4]|[78][0-49])|2(?:0[024-9]|1[0-7]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)|3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))|2(?:0[01378]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d)\\d{6}|1(?:(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d|7(?:(?:26(?:6[13-9]|7[0-7])|442\\d|50(?:2[0-3]|[3-68]2|76))\\d|6888[2-46-8]))\\d\\d",
            ,
            ,
            ,
            "1212345678",
            ,
            ,
            [9, 10],
            [4, 5, 6, 7, 8],
          ],
          [
            ,
            ,
            "7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}",
            ,
            ,
            ,
            "7400123456",
            ,
            ,
            [10],
          ],
          [, , "80[08]\\d{7}|800\\d{6}|8001111", , , , "8001234567"],
          [
            ,
            ,
            "(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d",
            ,
            ,
            ,
            "9012345678",
            ,
            ,
            [7, 10],
          ],
          [, , , , , , , , , [-1]],
          [, , "70\\d{8}", , , , "7012345678", , , [10]],
          [, , "56\\d{8}", , , , "5612345678", , , [10]],
          "GB",
          44,
          "00",
          "0",
          " x",
          ,
          "0",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{3})(\\d{4})",
              "$1 $2",
              ["800", "8001", "80011", "800111", "8001111"],
              "0$1",
            ],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3",
              ["845", "8454", "84546", "845464"],
              "0$1",
            ],
            [, "(\\d{3})(\\d{6})", "$1 $2", ["800"], "0$1"],
            [
              ,
              "(\\d{5})(\\d{4,5})",
              "$1 $2",
              [
                "1(?:38|5[23]|69|76|94)",
                "1(?:(?:38|69)7|5(?:24|39)|768|946)",
                "1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)",
              ],
              "0$1",
            ],
            [
              ,
              "(\\d{4})(\\d{5,6})",
              "$1 $2",
              ["1(?:[2-69][02-9]|[78])"],
              "0$1",
            ],
            [
              ,
              "(\\d{2})(\\d{4})(\\d{4})",
              "$1 $2 $3",
              ["[25]|7(?:0|6[024-9])", "[25]|7(?:0|6(?:[04-9]|2[356]))"],
              "0$1",
            ],
            [, "(\\d{4})(\\d{6})", "$1 $2", ["7"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1389]"], "0$1"],
          ],
          ,
          [
            ,
            ,
            "76(?:0[0-2]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",
            ,
            ,
            ,
            "7640123456",
            ,
            ,
            [10],
          ],
          1,
          ,
          [, , , , , , , , , [-1]],
          [, , "(?:3[0347]|55)\\d{8}", , , , "5512345678", , , [10]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GD: [
          ,
          [, , "(?:473|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "473(?:2(?:3[0-2]|69)|3(?:2[89]|86)|4(?:[06]8|3[5-9]|4[0-49]|5[5-79]|73|90)|63[68]|7(?:58|84)|800|938)\\d{4}",
            ,
            ,
            ,
            "4732691234",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "473(?:4(?:0[2-79]|1[04-9]|2[0-5]|58)|5(?:2[01]|3[3-8])|901)\\d{4}",
            ,
            ,
            ,
            "4734031234",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
          [, , "900[2-9]\\d{6}", , , , "9002123456"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "GD",
          1,
          "011",
          "1",
          ,
          ,
          "1|([2-9]\\d{6})$",
          "473$1",
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "473",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GE: [
          ,
          [, , "(?:[3-57]\\d\\d|800)\\d{6}", , , , , , , [9], [6]],
          [
            ,
            ,
            "(?:3(?:[256]\\d|4[124-9]|7[0-4])|4(?:1\\d|2[2-7]|3[1-79]|4[2-8]|7[239]|9[1-7]))\\d{6}",
            ,
            ,
            ,
            "322123456",
            ,
            ,
            ,
            [6],
          ],
          [
            ,
            ,
            "(?:5(?:[14]4|5[0157-9]|68|7[0147-9]|9[1-35-9])|790)\\d{6}",
            ,
            ,
            ,
            "555123456",
          ],
          [, , "800\\d{6}", , , , "800123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "706\\d{6}", , , , "706123456"],
          "GE",
          995,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"],
            [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[57]"]],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[348]"],
              "0$1",
            ],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "706\\d{6}"],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GF: [
          ,
          [, , "[56]94\\d{6}", , , , , , , [9]],
          [
            ,
            ,
            "594(?:[023]\\d|1[01]|4[03-9]|5[6-9]|6[0-3]|80|9[014])\\d{4}",
            ,
            ,
            ,
            "594101234",
          ],
          [, , "694(?:[0-249]\\d|3[0-48])\\d{4}", , , , "694201234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "GF",
          594,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[56]"],
              "0$1",
            ],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GG: [
          ,
          [
            ,
            ,
            "(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?",
            ,
            ,
            ,
            ,
            ,
            ,
            [7, 9, 10],
            [6],
          ],
          [, , "1481[25-9]\\d{5}", , , , "1481256789", , , [10], [6]],
          [
            ,
            ,
            "7(?:(?:781|839)\\d|911[17])\\d{5}",
            ,
            ,
            ,
            "7781123456",
            ,
            ,
            [10],
          ],
          [, , "80[08]\\d{7}|800\\d{6}|8001111", , , , "8001234567"],
          [
            ,
            ,
            "(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d",
            ,
            ,
            ,
            "9012345678",
            ,
            ,
            [7, 10],
          ],
          [, , , , , , , , , [-1]],
          [, , "70\\d{8}", , , , "7012345678", , , [10]],
          [, , "56\\d{8}", , , , "5612345678", , , [10]],
          "GG",
          44,
          "00",
          "0",
          ,
          ,
          "0|([25-9]\\d{5})$",
          "1481$1",
          ,
          ,
          ,
          ,
          [
            ,
            ,
            "76(?:0[0-2]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",
            ,
            ,
            ,
            "7640123456",
            ,
            ,
            [10],
          ],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "(?:3[0347]|55)\\d{8}", , , , "5512345678", , , [10]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GH: [
          ,
          [, , "(?:[235]\\d{3}|800)\\d{5}", , , , , , , [8, 9], [7]],
          [
            ,
            ,
            "3(?:[167]2[0-6]|22[0-5]|32[0-3]|4(?:2[013-9]|3[01])|52[0-7]|82[0-2])\\d{5}|3(?:[0-8]8|9[28])0\\d{5}|3(?:0[237]|[1-9]7)\\d{6}",
            ,
            ,
            ,
            "302345678",
            ,
            ,
            [9],
            [7],
          ],
          [
            ,
            ,
            "56[01]\\d{6}|(?:2[0346-8]|5[0457])\\d{7}",
            ,
            ,
            ,
            "231234567",
            ,
            ,
            [9],
          ],
          [, , "800\\d{5}", , , , "80012345", , , [8]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "GH",
          233,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1 $2", ["[237]|80"]],
            [, "(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[235]"], "0$1"],
          ],
          [
            [, "(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[235]"], "0$1"],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "800\\d{5}", , , , , , , [8]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GI: [
          ,
          [, , "(?:[25]\\d\\d|629)\\d{5}", , , , , , , [8]],
          [
            ,
            ,
            "2190[0-2]\\d{3}|2(?:00\\d|16[24-7]|2(?:2[2457]|50))\\d{4}",
            ,
            ,
            ,
            "20012345",
          ],
          [, , "(?:5[46-8]\\d|629)\\d{5}", , , , "57123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "GI",
          350,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{5})", "$1 $2", ["2"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GL: [
          ,
          [, , "(?:19|[2-689]\\d)\\d{4}", , , , , , , [6]],
          [, , "(?:19|3[1-7]|6[14689]|8[14-79]|9\\d)\\d{4}", , , , "321000"],
          [, , "(?:[25][1-9]|4[2-9])\\d{4}", , , , "221234"],
          [, , "80\\d{4}", , , , "801234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "3[89]\\d{4}", , , , "381234"],
          "GL",
          299,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["19|[2-689]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GM: [
          ,
          [, , "[2-9]\\d{6}", , , , , , , [7]],
          [
            ,
            ,
            "(?:4(?:[23]\\d\\d|4(?:1[024679]|[6-9]\\d))|5(?:54[0-7]|6[67]\\d|7(?:1[04]|2[035]|3[58]|48))|8\\d{3})\\d{3}",
            ,
            ,
            ,
            "5661234",
          ],
          [, , "(?:[23679]\\d|5[01])\\d{5}", , , , "3012345"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "GM",
          220,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GN: [
          ,
          [, , "(?:30|6\\d\\d|722)\\d{6}", , , , , , , [8, 9]],
          [
            ,
            ,
            "30(?:24|3[12]|4[1-35-7]|5[13]|6[189]|[78]1|9[1478])\\d{4}",
            ,
            ,
            ,
            "30241234",
            ,
            ,
            [8],
          ],
          [, , "6[02356]\\d{7}", , , , "601123456", , , [9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "722\\d{6}", , , , "722123456", , , [9]],
          "GN",
          224,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["3"]],
            [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[67]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GP: [
          ,
          [, , "(?:590|69\\d)\\d{6}", , , , , , , [9]],
          [
            ,
            ,
            "590(?:0[1-68]|1[0-2]|2[0-68]|3[1289]|4[0-24-9]|5[3-579]|6[0189]|7[08]|8[0-689]|9\\d)\\d{4}",
            ,
            ,
            ,
            "590201234",
          ],
          [, , "69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}", , , , "690001234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "GP",
          590,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[56]"],
              "0$1",
            ],
          ],
          ,
          [, , , , , , , , , [-1]],
          1,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GQ: [
          ,
          [, , "222\\d{6}|(?:3\\d|55|[89]0)\\d{7}", , , , , , , [9]],
          [
            ,
            ,
            "33[0-24-9]\\d[46]\\d{4}|3(?:33|5\\d)\\d[7-9]\\d{4}",
            ,
            ,
            ,
            "333091234",
          ],
          [, , "(?:222|55[015])\\d{6}", , , , "222123456"],
          [, , "80\\d[1-9]\\d{5}", , , , "800123456"],
          [, , "90\\d[1-9]\\d{5}", , , , "900123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "GQ",
          240,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235]"]],
            [, "(\\d{3})(\\d{6})", "$1 $2", ["[89]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GR: [
          ,
          [, , "(?:[268]\\d|[79]0)\\d{8}", , , , , , , [10]],
          [
            ,
            ,
            "2(?:1\\d\\d|2(?:2[1-46-9]|[36][1-8]|4[1-7]|5[1-4]|7[1-5]|[89][1-9])|3(?:1\\d|2[1-57]|[35][1-3]|4[13]|7[1-7]|8[124-6]|9[1-79])|4(?:1\\d|2[1-8]|3[1-4]|4[13-5]|6[1-578]|9[1-5])|5(?:1\\d|[29][1-4]|3[1-5]|4[124]|5[1-6])|6(?:1\\d|[269][1-6]|3[1245]|4[1-7]|5[13-9]|7[14]|8[1-5])|7(?:1\\d|2[1-5]|3[1-6]|4[1-7]|5[1-57]|6[135]|9[125-7])|8(?:1\\d|2[1-5]|[34][1-4]|9[1-57]))\\d{6}",
            ,
            ,
            ,
            "2123456789",
          ],
          [, , "6(?:8[57-9]|9\\d)\\d{7}", , , , "6912345678"],
          [, , "800\\d{7}", , , , "8001234567"],
          [, , "90[19]\\d{7}", , , , "9091234567"],
          [, , "8(?:0[16]|12|25)\\d{7}", , , , "8011234567"],
          [, , "70\\d{8}", , , , "7012345678"],
          [, , , , , , , , , [-1]],
          "GR",
          30,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["21|7"]],
            [
              ,
              "(\\d{4})(\\d{6})",
              "$1 $2",
              ["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])"],
            ],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2689]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GT: [
          ,
          [, , "(?:1\\d{3}|[2-7])\\d{7}", , , , , , , [8, 11]],
          [, , "[267][2-9]\\d{6}", , , , "22456789", , , [8]],
          [, , "[3-5]\\d{7}", , , , "51234567", , , [8]],
          [, , "18[01]\\d{8}", , , , "18001112222", , , [11]],
          [, , "19\\d{9}", , , , "19001112222", , , [11]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "GT",
          502,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{4})(\\d{4})", "$1 $2", ["[2-7]"]],
            [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GU: [
          ,
          [, , "(?:[58]\\d\\d|671|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",
            ,
            ,
            ,
            "6713001234",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",
            ,
            ,
            ,
            "6713001234",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
          [, , "900[2-9]\\d{6}", , , , "9002123456"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "GU",
          1,
          "011",
          "1",
          ,
          ,
          "1|([3-9]\\d{6})$",
          "671$1",
          ,
          1,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "671",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GW: [
          ,
          [, , "[49]\\d{8}|4\\d{6}", , , , , , , [7, 9]],
          [, , "443\\d{6}", , , , "443201234", , , [9]],
          [, , "9(?:5\\d|6[569]|77)\\d{6}", , , , "955012345", , , [9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "40\\d{5}", , , , "4012345", , , [7]],
          "GW",
          245,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1 $2", ["40"]],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        GY: [
          ,
          [, , "(?:862\\d|9008)\\d{3}|(?:[2-46]\\d|77)\\d{5}", , , , , , , [7]],
          [
            ,
            ,
            "(?:2(?:1[6-9]|2[0-35-9]|3[1-4]|5[3-9]|6\\d|7[0-24-79])|3(?:2[25-9]|3\\d)|4(?:4[0-24]|5[56])|77[1-57])\\d{4}",
            ,
            ,
            ,
            "2201234",
          ],
          [, , "6\\d{6}", , , , "6091234"],
          [, , "(?:289|862)\\d{4}", , , , "2891234"],
          [, , "9008\\d{3}", , , , "9008123"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "GY",
          592,
          "001",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-46-9]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        HK: [
          ,
          [
            ,
            ,
            "8[0-46-9]\\d{6,7}|9\\d{4}(?:\\d(?:\\d(?:\\d{4})?)?)?|(?:[235-79]\\d|46)\\d{6}",
            ,
            ,
            ,
            ,
            ,
            ,
            [5, 6, 7, 8, 9, 11],
          ],
          [
            ,
            ,
            "(?:384[04]|58(?:0[1-8]|1[2-9]))\\d{4}|(?:2(?:[13-8]\\d|2[013-9]|9[0-24-9])|3(?:[1569][0-24-9]|4[0-246-9]|7[0-24-69]|89))\\d{5}",
            ,
            ,
            ,
            "21234567",
            ,
            ,
            [8],
          ],
          [
            ,
            ,
            "(?:46(?:0[0-6]|1[0-2]|4[0-57-9])|5730|(?:626|848)[01]|707[1-5]|929[03-9])\\d{4}|(?:5(?:[1-59][0-46-9]|6[0-4689]|7[0-2469])|6(?:0[1-9]|[13-59]\\d|[268][0-57-9]|7[0-79])|9(?:0[1-9]|1[02-9]|[2358][0-8]|[467]\\d))\\d{5}",
            ,
            ,
            ,
            "51234567",
            ,
            ,
            [8],
          ],
          [, , "800\\d{6}", , , , "800123456", , , [9]],
          [
            ,
            ,
            "900(?:[0-24-9]\\d{7}|3\\d{1,4})",
            ,
            ,
            ,
            "90012345678",
            ,
            ,
            [5, 6, 7, 8, 11],
          ],
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "8(?:1[0-4679]\\d|2(?:[0-36]\\d|7[0-4])|3(?:[034]\\d|2[09]|70))\\d{4}",
            ,
            ,
            ,
            "81123456",
            ,
            ,
            [8],
          ],
          [, , , , , , , , , [-1]],
          "HK",
          852,
          "00(?:30|5[09]|[126-9]?)",
          ,
          ,
          ,
          ,
          ,
          "00",
          ,
          [
            [, "(\\d{3})(\\d{2,5})", "$1 $2", ["900", "9003"]],
            [, "(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]],
            [, "(\\d{3})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]],
          ],
          ,
          [
            ,
            ,
            "7(?:1(?:0[0-38]|1[0-3679]|3[013]|69|9[136])|2(?:[02389]\\d|1[18]|7[27-9])|3(?:[0-38]\\d|7[0-369]|9[2357-9])|47\\d|5(?:[178]\\d|5[0-5])|6(?:0[0-7]|2[236-9]|[35]\\d)|7(?:[27]\\d|8[7-9])|8(?:[23689]\\d|7[1-9])|9(?:[025]\\d|6[0-246-8]|7[0-36-9]|8[238]))\\d{4}",
            ,
            ,
            ,
            "71123456",
            ,
            ,
            [8],
          ],
          ,
          ,
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "30(?:0[1-9]|[15-7]\\d|2[047]|89)\\d{4}",
            ,
            ,
            ,
            "30161234",
            ,
            ,
            [8],
          ],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        HN: [
          ,
          [, , "[237-9]\\d{7}", , , , , , , [8]],
          [
            ,
            ,
            "2(?:2(?:0[019]|1[1-36]|[23]\\d|4[04-6]|5[57]|6[24]|7[0135689]|8[01346-9]|9[0-2])|4(?:07|2[3-59]|3[13-689]|4[0-68]|5[1-35])|5(?:08|16|4[03-5]|5\\d|6[4-6]|74|80)|6(?:[056]\\d|17|3[04]|4[0-378]|[78][0-8]|9[01])|7(?:6[46-9]|7[02-9]|8[034])|8(?:79|8[0-357-9]|9[1-57-9]))\\d{4}",
            ,
            ,
            ,
            "22123456",
          ],
          [, , "[37-9]\\d{7}", , , , "91234567"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "HN",
          504,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{4})(\\d{4})", "$1-$2", ["[237-9]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        HR: [
          ,
          [
            ,
            ,
            "(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 7, 8, 9],
          ],
          [
            ,
            ,
            "1\\d{7}|(?:2[0-3]|3[1-5]|4[02-47-9]|5[1-3])\\d{6,7}",
            ,
            ,
            ,
            "12345678",
            ,
            ,
            [8, 9],
            [6, 7],
          ],
          [
            ,
            ,
            "9(?:751\\d{5}|8\\d{6,7})|9(?:01|[1259]\\d|7[0679])\\d{6}",
            ,
            ,
            ,
            "921234567",
            ,
            ,
            [8, 9],
          ],
          [, , "80[01]\\d{4,6}", , , , "800123456", , , [7, 8, 9]],
          [, , "6[01459]\\d{6}|6[01]\\d{4,5}", , , , "611234", , , [6, 7, 8]],
          [, , , , , , , , , [-1]],
          [, , "7[45]\\d{6}", , , , "74123456", , , [8]],
          [, , , , , , , , , [-1]],
          "HR",
          385,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["6[01]"], "0$1"],
            [, "(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["8"], "0$1"],
            [, "(\\d)(\\d{4})(\\d{3})", "$1 $2 $3", ["1"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[67]"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-5]"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "62\\d{6,7}|72\\d{6}", , , , "62123456", , , [8, 9]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        HT: [
          ,
          [, , "[2-489]\\d{7}", , , , , , , [8]],
          [, , "2(?:2\\d|5[1-5]|81|9[149])\\d{5}", , , , "22453300"],
          [, , "[34]\\d{7}", , , , "34101234"],
          [, , "8\\d{7}", , , , "80012345"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "9(?:[67][0-4]|8[0-3589]|9\\d)\\d{5}", , , , "98901234"],
          "HT",
          509,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[2-489]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        HU: [
          ,
          [, , "[2357]\\d{8}|[1-9]\\d{7}", , , , , , , [8, 9], [6, 7]],
          [
            ,
            ,
            "(?:1\\d|[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6[23689]|8[2-57-9]|9[2-69])\\d{6}",
            ,
            ,
            ,
            "12345678",
            ,
            ,
            [8],
            [6, 7],
          ],
          [, , "(?:[257]0|3[01])\\d{7}", , , , "201234567", , , [9]],
          [, , "[48]0\\d{6}", , , , "80123456", , , [8]],
          [, , "9[01]\\d{6}", , , , "90123456", , , [8]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "21\\d{7}", , , , "211234567", , , [9]],
          "HU",
          36,
          "00",
          "06",
          ,
          ,
          "06",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "($1)"],
            [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "($1)"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "[48]0\\d{6}", , , , , , , [8]],
          [, , "38\\d{7}", , , , "381234567", , , [9]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        ID: [
          ,
          [
            ,
            ,
            "(?:[1-36]|8\\d{5})\\d{6}|[1-9]\\d{8,10}|[2-9]\\d{7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [7, 8, 9, 10, 11, 12],
            [5, 6],
          ],
          [
            ,
            ,
            "2[124]\\d{7,8}|619\\d{8}|2(?:1(?:14|500)|2\\d{3})\\d{3}|61\\d{5,8}|(?:2(?:[35][1-4]|6[0-8]|7[1-6]|8\\d|9[1-8])|3(?:1|[25][1-8]|3[1-68]|4[1-3]|6[1-3568]|7[0-469]|8\\d)|4(?:0[1-589]|1[01347-9]|2[0-36-8]|3[0-24-68]|43|5[1-378]|6[1-5]|7[134]|8[1245])|5(?:1[1-35-9]|2[25-8]|3[124-9]|4[1-3589]|5[1-46]|6[1-8])|6(?:[25]\\d|3[1-69]|4[1-6])|7(?:02|[125][1-9]|[36]\\d|4[1-8]|7[0-36-9])|9(?:0[12]|1[013-8]|2[0-479]|5[125-8]|6[23679]|7[159]|8[01346]))\\d{5,8}",
            ,
            ,
            ,
            "218350123",
            ,
            ,
            [7, 8, 9, 10, 11],
            [5, 6],
          ],
          [, , "8[1-35-9]\\d{7,10}", , , , "812345678", , , [9, 10, 11, 12]],
          [
            ,
            ,
            "(?:177\\d|800)\\d{5,7}",
            ,
            ,
            ,
            "8001234567",
            ,
            ,
            [8, 9, 10, 11],
          ],
          [, , "809\\d{7}", , , , "8091234567", , , [10]],
          [, , "804\\d{7}", , , , "8041234567", , , [10]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "ID",
          62,
          "0(?:0[17-9]|10(?:00|1[67]))",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["15"]],
            [, "(\\d{2})(\\d{5,9})", "$1 $2", ["2[124]|[36]1"], "(0$1)"],
            [, "(\\d{3})(\\d{5,7})", "$1 $2", ["800"], "0$1"],
            [, "(\\d{3})(\\d{5,8})", "$1 $2", ["[2-79]"], "(0$1)"],
            [, "(\\d{3})(\\d{3,4})(\\d{3})", "$1-$2-$3", ["8[1-35-9]"], "0$1"],
            [, "(\\d{3})(\\d{6,8})", "$1 $2", ["1"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["804"], "0$1"],
            [, "(\\d{3})(\\d)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["80"], "0$1"],
            [, "(\\d{3})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["8"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "8071\\d{6}", , , , , , , [10]],
          [, , "(?:1500|8071\\d{3})\\d{3}", , , , "8071123456", , , [7, 10]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        IE: [
          ,
          [
            ,
            ,
            "(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}",
            ,
            ,
            ,
            ,
            ,
            ,
            [7, 8, 9, 10],
            [5, 6],
          ],
          [
            ,
            ,
            "(?:1\\d|21)\\d{6,7}|(?:2[24-9]|4(?:0[24]|5\\d|7)|5(?:0[45]|1\\d|8)|6(?:1\\d|[237-9])|9(?:1\\d|[35-9]))\\d{5}|(?:23|4(?:[1-469]|8[0-46-9])|5[23679]|6[4-6]|7[14]|9[04])\\d{7}",
            ,
            ,
            ,
            "2212345",
            ,
            ,
            ,
            [5, 6],
          ],
          [, , "8(?:22|[35-9]\\d)\\d{6}", , , , "850123456", , , [9]],
          [, , "1800\\d{6}", , , , "1800123456", , , [10]],
          [
            ,
            ,
            "15(?:1[2-8]|[2-8]0|9[089])\\d{6}",
            ,
            ,
            ,
            "1520123456",
            ,
            ,
            [10],
          ],
          [, , "18[59]0\\d{6}", , , , "1850123456", , , [10]],
          [, , "700\\d{6}", , , , "700123456", , , [9]],
          [, , "76\\d{7}", , , , "761234567", , , [9]],
          "IE",
          353,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{2})(\\d{5})",
              "$1 $2",
              ["2[24-9]|47|58|6[237-9]|9[35-9]"],
              "(0$1)",
            ],
            [, "(\\d{3})(\\d{5})", "$1 $2", ["[45]0"], "(0$1)"],
            [, "(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"], "(0$1)"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{3,4})",
              "$1 $2 $3",
              ["[2569]|4[1-69]|7[14]"],
              "(0$1)",
            ],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["81"], "(0$1)"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[78]"], "0$1"],
            [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]],
            [, "(\\d{2})(\\d)(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["8"], "0$1"],
            [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["4"], "(0$1)"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "18[59]0\\d{6}", , , , , , , [10]],
          [, , "818\\d{6}", , , , "818123456", , , [9]],
          ,
          ,
          [, , "8[35-9]5\\d{7}", , , , "8551234567", , , [10]],
        ],
        IL: [
          ,
          [
            ,
            ,
            "1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [7, 8, 9, 10, 11, 12],
          ],
          [
            ,
            ,
            "153\\d{8,9}|[2-489]\\d{7}",
            ,
            ,
            ,
            "21234567",
            ,
            ,
            [8, 11, 12],
            [7],
          ],
          [
            ,
            ,
            "5(?:(?:[0-489][2-9]|6\\d)\\d|5(?:01|2[2-5]|3[23]|4[45]|5[05689]|6[6-8]|7[0-267]|8[7-9]|9[1-9]))\\d{5}",
            ,
            ,
            ,
            "502345678",
            ,
            ,
            [9],
          ],
          [, , "1(?:255|80[019]\\d{3})\\d{3}", , , , "1800123456", , , [7, 10]],
          [
            ,
            ,
            "1212\\d{4}|1(?:200|9(?:0[01]|19))\\d{6}",
            ,
            ,
            ,
            "1919123456",
            ,
            ,
            [8, 10],
          ],
          [, , "1700\\d{6}", , , , "1700123456", , , [10]],
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "78(?:33|55|77|81)\\d{5}|7(?:18|2[23]|3[237]|47|6[58]|7\\d|82|9[2357-9])\\d{6}",
            ,
            ,
            ,
            "771234567",
            ,
            ,
            [9],
          ],
          "IL",
          972,
          "0(?:0|1[2-9])",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{4})(\\d{3})", "$1-$2", ["125"]],
            [, "(\\d{4})(\\d{2})(\\d{2})", "$1-$2-$3", ["121"]],
            [, "(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-489]"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"],
            [, "(\\d{4})(\\d{3})(\\d{3})", "$1-$2-$3", ["12"]],
            [, "(\\d{4})(\\d{6})", "$1-$2", ["159"]],
            [, "(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3-$4", ["1[7-9]"]],
            [, "(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})", "$1-$2 $3-$4", ["15"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "1700\\d{6}", , , , , , , [10]],
          [, , "1599\\d{6}", , , , "1599123456", , , [10]],
          ,
          ,
          [, , "151\\d{8,9}", , , , "15112340000", , , [11, 12]],
        ],
        IM: [
          ,
          [, , "1624\\d{6}|(?:[3578]\\d|90)\\d{8}", , , , , , , [10], [6]],
          [, , "1624[5-8]\\d{5}", , , , "1624756789", , , , [6]],
          [, , "7(?:4576|[59]24\\d|624[0-4689])\\d{5}", , , , "7924123456"],
          [, , "808162\\d{4}", , , , "8081624567"],
          [
            ,
            ,
            "8(?:440[49]06|72299\\d)\\d{3}|(?:8(?:45|70)|90[0167])624\\d{4}",
            ,
            ,
            ,
            "9016247890",
          ],
          [, , , , , , , , , [-1]],
          [, , "70\\d{8}", , , , "7012345678"],
          [, , "56\\d{8}", , , , "5612345678"],
          "IM",
          44,
          "00",
          "0",
          ,
          ,
          "0|([5-8]\\d{5})$",
          "1624$1",
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "74576|(?:16|7[56])24",
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "3440[49]06\\d{3}|(?:3(?:08162|3\\d{4}|45624|7(?:0624|2299))|55\\d{4})\\d{4}",
            ,
            ,
            ,
            "5512345678",
          ],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        IN: [
          ,
          [
            ,
            ,
            "(?:00800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}",
            ,
            ,
            ,
            ,
            ,
            ,
            [8, 9, 10, 11, 12, 13],
            [6, 7],
          ],
          [
            ,
            ,
            "782[0-6][2-7]\\d{5}|(?:170[24]|2(?:80[13468]|90\\d)|380\\d|4(?:20[24]|72[2-8])|552[1-7])\\d{6}|(?:342|674|788)(?:[0189][2-7]|[2-7]\\d)\\d{5}|(?:11|2[02]|33|4[04]|79|80)[2-7]\\d{7}|(?:1(?:2[0-249]|3[0-25]|4[145]|[59][14]|6[014]|7[1257]|8[01346])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[13]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[014-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91))[2-7]\\d{6}|(?:1(?:2[35-8]|3[346-9]|4[236-9]|[59][0235-9]|6[235-9]|7[34689]|8[257-9])|2(?:1[134689]|3[24-8]|4[2-8]|5[25689]|6[2-4679]|7[13-79]|8[2-479]|9[235-9])|3(?:01|1[79]|2[1-5]|4[5-8]|5[125689]|6[235-7]|7[157-9]|8[2-46-8])|4(?:1[14578]|2[5689]|3[2-467]|5[4-7]|6[35]|73|8[2689]|9[2389])|5(?:[16][146-9]|2[14-8]|3[1346]|4[14-69]|5[46]|7[2-4]|8[2-8]|9[246])|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|2[0235-9]|3[2679]|4[1-35689]|5[2-46-9]|[67][02-9]|8[013-7]|9[0189])|8(?:1[1357-9]|2[235-8]|3[03-57-9]|4[0-24-9]|5\\d|6[2457-9]|7[1-6]|8[1256]|9[2-4]))\\d[2-7]\\d{5}",
            ,
            ,
            ,
            "7410410123",
            ,
            ,
            [10],
            [6, 7, 8],
          ],
          [
            ,
            ,
            "(?:6(?:1279|350[0-6])|7(?:3(?:1(?:11|7[02-8])|411)|4[47](?:11|7[02-8])|5111|700[02-9]|88(?:11|7[02-9])|9(?:313|79[07-9]))|8(?:079[04-9]|(?:16|2[014]|3[126]|6[136]|7[78]|8[34]|91)7[02-8]))\\d{5}|7(?:28[6-8]|3(?:2[0-49]|9[2-5])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7])[089]\\d{5}|(?:6(?:0(?:0[0-3569]|26|33)|2(?:[06]\\d|3[02589]|8[0-479]|9[0-79])|3(?:0[0-79]|5[1-9]|6[0-4679]|7[0-24-9]|[89]\\d)|9(?:0[019]|13))|7(?:0\\d\\d|19[0-5]|2(?:[0235-79]\\d|[14][017-9]|8[0-59])|3(?:[05-8]\\d|1[089]|2[5-8]|3[017-9]|4[07-9]|9[016-9])|4(?:0\\d|1[015-9]|[29][89]|39|[47][089]|8[389])|5(?:[0346-8]\\d|1[07-9]|2[04-9]|5[017-9]|9[7-9])|6(?:0[0-47]|1[0-257-9]|2[0-4]|3[19]|5[4589]|[6-9]\\d)|7(?:0[289]|[1-9]\\d)|8(?:[0-79]\\d|8[089])|9(?:[089]\\d|7[02-8]))|8(?:0(?:[01589]\\d|6[67]|7[02-8])|1(?:[0-57-9]\\d|6[089])|2(?:[014][089]|[235-9]\\d)|3(?:[03-57-9]\\d|[126][089])|[45]\\d\\d|6(?:[02457-9]\\d|[136][089])|7(?:0[07-9]|[1-69]\\d|[78][089])|8(?:[0-25-9]\\d|3[089]|4[0489])|9(?:[02-9]\\d|1[0289]))|9\\d{3})\\d{6}",
            ,
            ,
            ,
            "8123456789",
            ,
            ,
            [10],
          ],
          [
            ,
            ,
            "00800\\d{7}|1(?:600\\d{6}|80(?:0\\d{4,9}|3\\d{9}))",
            ,
            ,
            ,
            "1800123456",
          ],
          [, , "186[12]\\d{9}", , , , "1861123456789", , , [13]],
          [, , "1860\\d{7}", , , , "18603451234", , , [11]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "IN",
          91,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{7})", "$1", ["575"]],
            [
              ,
              "(\\d{8})",
              "$1",
              [
                "5(?:0|2[23]|3[03]|[67]1|88)",
                "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)",
                "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)",
              ],
              ,
              ,
              1,
            ],
            [, "(\\d{4})(\\d{4,5})", "$1 $2", ["180", "1800"], , , 1],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], , , 1],
            [
              ,
              "(\\d{2})(\\d{4})(\\d{4})",
              "$1 $2 $3",
              [
                "11|2[02]|33|4[04]|79[1-7]|80[2-46]",
                "11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])",
                "11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])",
              ],
              "0$1",
              ,
              1,
            ],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{4})",
              "$1 $2 $3",
              [
                "1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]",
                "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:[2-4]1|5[17]|6[13]|7[14]|80)|7(?:12|(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|(?:55|61)2|7(?:31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]",
                "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|[2-4]1|5[17]|6[13]|7[14]|80)|7(?:12|(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:1(?:29|60|8[06])|261|552|788[01])[2-7]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])",
              ],
              "0$1",
              ,
              1,
            ],
            [
              ,
              "(\\d{4})(\\d{3})(\\d{3})",
              "$1 $2 $3",
              [
                "1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|[4-8])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807",
                "1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|[4-8])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]",
                "1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|[4-8])|7(?:1(?:[013-8]|9[6-9])|3179)|807(?:1|9[1-3])|(?:1552|7(?:28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]",
              ],
              "0$1",
              ,
              1,
            ],
            [, "(\\d{5})(\\d{5})", "$1 $2", ["[6-9]"], "0$1", , 1],
            [
              ,
              "(\\d{4})(\\d{2,4})(\\d{4})",
              "$1 $2 $3",
              ["1(?:6|8[06])", "1(?:6|8[06]0)"],
              ,
              ,
              1,
            ],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{4})(\\d{3})",
              "$1 $2 $3 $4",
              ["0"],
              "0$1",
              ,
              1,
            ],
            [
              ,
              "(\\d{4})(\\d{3})(\\d{3})(\\d{3})",
              "$1 $2 $3 $4",
              ["18"],
              ,
              ,
              1,
            ],
          ],
          [
            [
              ,
              "(\\d{8})",
              "$1",
              [
                "5(?:0|2[23]|3[03]|[67]1|88)",
                "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)",
                "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)",
              ],
              ,
              ,
              1,
            ],
            [, "(\\d{4})(\\d{4,5})", "$1 $2", ["180", "1800"], , , 1],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], , , 1],
            [
              ,
              "(\\d{2})(\\d{4})(\\d{4})",
              "$1 $2 $3",
              [
                "11|2[02]|33|4[04]|79[1-7]|80[2-46]",
                "11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])",
                "11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])",
              ],
              "0$1",
              ,
              1,
            ],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{4})",
              "$1 $2 $3",
              [
                "1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]",
                "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:[2-4]1|5[17]|6[13]|7[14]|80)|7(?:12|(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|(?:55|61)2|7(?:31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]",
                "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|[2-4]1|5[17]|6[13]|7[14]|80)|7(?:12|(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:1(?:29|60|8[06])|261|552|788[01])[2-7]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])",
              ],
              "0$1",
              ,
              1,
            ],
            [
              ,
              "(\\d{4})(\\d{3})(\\d{3})",
              "$1 $2 $3",
              [
                "1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|[4-8])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807",
                "1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|[4-8])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]",
                "1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|[4-8])|7(?:1(?:[013-8]|9[6-9])|3179)|807(?:1|9[1-3])|(?:1552|7(?:28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]",
              ],
              "0$1",
              ,
              1,
            ],
            [, "(\\d{5})(\\d{5})", "$1 $2", ["[6-9]"], "0$1", , 1],
            [
              ,
              "(\\d{4})(\\d{2,4})(\\d{4})",
              "$1 $2 $3",
              ["1(?:6|8[06])", "1(?:6|8[06]0)"],
              ,
              ,
              1,
            ],
            [
              ,
              "(\\d{4})(\\d{3})(\\d{3})(\\d{3})",
              "$1 $2 $3 $4",
              ["18"],
              ,
              ,
              1,
            ],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [
            ,
            ,
            "1(?:600\\d{6}|800\\d{4,9})|(?:00800|18(?:03\\d\\d|6(?:0|[12]\\d\\d)))\\d{7}",
          ],
          [, , "140\\d{7}", , , , "1409305260", , , [10]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        IO: [
          ,
          [, , "3\\d{6}", , , , , , , [7]],
          [, , "37\\d{5}", , , , "3709100"],
          [, , "38\\d{5}", , , , "3801234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "IO",
          246,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{4})", "$1 $2", ["3"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        IQ: [
          ,
          [
            ,
            ,
            "(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}",
            ,
            ,
            ,
            ,
            ,
            ,
            [8, 9, 10],
            [6, 7],
          ],
          [
            ,
            ,
            "1\\d{7}|(?:2[13-5]|3[02367]|4[023]|5[03]|6[026])\\d{6,7}",
            ,
            ,
            ,
            "12345678",
            ,
            ,
            [8, 9],
            [6, 7],
          ],
          [, , "7[3-9]\\d{8}", , , , "7912345678", , , [10]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "IQ",
          964,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-6]"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        IR: [
          ,
          [
            ,
            ,
            "[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}",
            ,
            ,
            ,
            ,
            ,
            ,
            [4, 5, 6, 7, 10],
            [8],
          ],
          [
            ,
            ,
            "944111\\d{4}|94(?:(?:00|44)0|(?:11|2\\d)\\d|30[01])\\d{5}|(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])(?:[03-57]\\d{7}|[16]\\d{3}(?:\\d{4})?|[289]\\d{3}(?:\\d(?:\\d{3})?)?)",
            ,
            ,
            ,
            "2123456789",
            ,
            ,
            [6, 7, 10],
            [4, 5, 8],
          ],
          [
            ,
            ,
            "9(?:(?:0(?:[1-35]\\d|44)|(?:[13]\\d|2[0-2])\\d)\\d|9(?:(?:[0-2]\\d|44)\\d|510|8(?:1\\d|88)|9(?:0[013]|1[0134]|21|77|9[6-9])))\\d{5}",
            ,
            ,
            ,
            "9123456789",
            ,
            ,
            [10],
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "993\\d{7}", , , , "9932123456", , , [10]],
          "IR",
          98,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{4,5})", "$1", ["96"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{4,5})",
              "$1 $2",
              [
                "(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]",
              ],
              "0$1",
            ],
            [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"],
            [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[1-8]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [
            ,
            ,
            "96(?:0[12]|2[16-8]|3(?:08|[14]5|[23]|66)|4(?:0|80)|5[01]|6[89]|86|9[19])|94(?:11[1-7]|440)\\d{5}",
            ,
            ,
            ,
            ,
            ,
            ,
            [4, 5, 10],
          ],
          [
            ,
            ,
            "96(?:0[12]|2[16-8]|3(?:08|[14]5|[23]|66)|4(?:0|80)|5[01]|6[89]|86|9[19])",
            ,
            ,
            ,
            "9601",
            ,
            ,
            [4, 5],
          ],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        IS: [
          ,
          [, , "(?:38\\d|[4-9])\\d{6}", , , , , , , [7, 9]],
          [
            ,
            ,
            "(?:4(?:1[0-24-69]|2[0-7]|[37][0-8]|4[0-245]|5[0-68]|6\\d|8[0-36-8])|5(?:05|[156]\\d|2[02578]|3[0-579]|4[03-7]|7[0-2578]|8[0-35-9]|9[013-689])|87[23])\\d{4}",
            ,
            ,
            ,
            "4101234",
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "(?:38[589]\\d\\d|6(?:1[1-8]|2[0-6]|3[027-9]|4[014679]|5[0159]|6[0-69]|70|8[06-8]|9\\d)|7(?:5[057]|[6-8]\\d|9[0-3])|8(?:2[0-59]|[3469]\\d|5[1-9]|8[28]))\\d{4}",
            ,
            ,
            ,
            "6111234",
          ],
          [, , "800\\d{4}", , , , "8001234", , , [7]],
          [, , "90\\d{5}", , , , "9011234", , , [7]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "49\\d{5}", , , , "4921234", , , [7]],
          "IS",
          354,
          "00|1(?:0(?:01|[12]0)|100)",
          ,
          ,
          ,
          ,
          ,
          "00",
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1 $2", ["[4-9]"]],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["3"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "809\\d{4}", , , , "8091234", , , [7]],
          ,
          ,
          [
            ,
            ,
            "(?:689|8(?:7[0189]|80)|95[48])\\d{4}",
            ,
            ,
            ,
            "6891234",
            ,
            ,
            [7],
          ],
        ],
        IT: [
          ,
          [
            ,
            ,
            "0\\d{6,10}|55\\d{8}|[08]\\d{5}|(?:3[0-8]|8)\\d{7,9}|(?:1\\d|39)\\d{7,8}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 7, 8, 9, 10, 11],
          ],
          [
            ,
            ,
            "0669[0-79]\\d{1,6}|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}",
            ,
            ,
            ,
            "0212345678",
          ],
          [
            ,
            ,
            "33\\d{9}|3[1-9]\\d{8}|3[2-9]\\d{7}",
            ,
            ,
            ,
            "3123456789",
            ,
            ,
            [9, 10, 11],
          ],
          [, , "80(?:0\\d{3}|3)\\d{3}", , , , "800123456", , , [6, 9]],
          [
            ,
            ,
            "(?:0878\\d\\d|89(?:2|4[5-9]\\d))\\d{3}|89[45][0-4]\\d\\d|(?:1(?:44|6[346])|89(?:5[5-9]|9))\\d{6}",
            ,
            ,
            ,
            "899123456",
            ,
            ,
            [6, 8, 9, 10],
          ],
          [, , "84(?:[08]\\d{3}|[17])\\d{3}", , , , "848123456", , , [6, 9]],
          [, , "1(?:78\\d|99)\\d{6}", , , , "1781234567", , , [9, 10]],
          [, , "55\\d{8}", , , , "5512345678", , , [10]],
          "IT",
          39,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{4,5})",
              "$1",
              ["1(?:0|9[246])", "1(?:0|9(?:2[2-9]|[46]))"],
            ],
            [, "(\\d{6})", "$1", ["1(?:1|92)"]],
            [, "(\\d{2})(\\d{4,6})", "$1 $2", ["0[26]"]],
            [
              ,
              "(\\d{3})(\\d{3,6})",
              "$1 $2",
              [
                "0[13-57-9][0159]|8(?:03|4[17]|9[245])",
                "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))",
              ],
            ],
            [
              ,
              "(\\d{4})(\\d{2,6})",
              "$1 $2",
              ["0(?:[13-579][2-46-8]|8[236-8])"],
            ],
            [, "(\\d{4})(\\d{4})", "$1 $2", ["894"]],
            [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|5"]],
            [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1[4679]|[38]"]],
            [, "(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]"]],
            [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["3"]],
            [, "(\\d{2})(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]],
            [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]],
          ],
          [
            [, "(\\d{2})(\\d{4,6})", "$1 $2", ["0[26]"]],
            [
              ,
              "(\\d{3})(\\d{3,6})",
              "$1 $2",
              [
                "0[13-57-9][0159]|8(?:03|4[17]|9[245])",
                "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))",
              ],
            ],
            [
              ,
              "(\\d{4})(\\d{2,6})",
              "$1 $2",
              ["0(?:[13-579][2-46-8]|8[236-8])"],
            ],
            [, "(\\d{4})(\\d{4})", "$1 $2", ["894"]],
            [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|5"]],
            [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1[4679]|[38]"]],
            [, "(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]"]],
            [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["3"]],
            [, "(\\d{2})(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]],
            [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]],
          ],
          [, , , , , , , , , [-1]],
          1,
          ,
          [, , "848\\d{6}", , , , , , , [9]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        JE: [
          ,
          [, , "1534\\d{6}|(?:[3578]\\d|90)\\d{8}", , , , , , , [10], [6]],
          [, , "1534[0-24-8]\\d{5}", , , , "1534456789", , , , [6]],
          [
            ,
            ,
            "7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97[7-9]))\\d{5}",
            ,
            ,
            ,
            "7797712345",
          ],
          [, , "80(?:07(?:35|81)|8901)\\d{4}", , , , "8007354567"],
          [
            ,
            ,
            "(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}",
            ,
            ,
            ,
            "9018105678",
          ],
          [, , , , , , , , , [-1]],
          [, , "701511\\d{4}", , , , "7015115678"],
          [, , "56\\d{8}", , , , "5612345678"],
          "JE",
          44,
          "00",
          "0",
          ,
          ,
          "0|([0-24-8]\\d{5})$",
          "1534$1",
          ,
          ,
          ,
          ,
          [
            ,
            ,
            "76(?:0[0-2]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",
            ,
            ,
            ,
            "7640123456",
          ],
          ,
          ,
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}",
            ,
            ,
            ,
            "5512345678",
          ],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        JM: [
          ,
          [, , "(?:[58]\\d\\d|658|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "(?:658[2-9]\\d\\d|876(?:5(?:0[12]|1[0-468]|2[35]|63)|6(?:0[1-3579]|1[0237-9]|[23]\\d|40|5[06]|6[2-589]|7[05]|8[04]|9[4-9])|7(?:0[2-689]|[1-6]\\d|8[056]|9[45])|9(?:0[1-8]|1[02378]|[2-8]\\d|9[2-468])))\\d{4}",
            ,
            ,
            ,
            "8765230123",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "876(?:(?:2[14-9]|[348]\\d)\\d|5(?:0[3-9]|17|[2-57-9]\\d|6[0-24-9])|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579]))\\d{4}",
            ,
            ,
            ,
            "8762101234",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
          [, , "900[2-9]\\d{6}", , , , "9002123456"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "JM",
          1,
          "011",
          "1",
          ,
          ,
          "1",
          ,
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "658|876",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        JO: [
          ,
          [
            ,
            ,
            "900\\d{5}|(?:(?:[268]|7\\d)\\d|32|53)\\d{6}",
            ,
            ,
            ,
            ,
            ,
            ,
            [8, 9],
          ],
          [
            ,
            ,
            "(?:2(?:6(?:2[0-35-9]|3[0-578]|4[24-7]|5[0-24-8]|[6-8][023]|9[0-3])|7(?:0[1-79]|10|2[014-7]|3[0-689]|4[019]|5[0-3578]))|32(?:0[1-69]|1[1-35-7]|2[024-7]|3\\d|4[0-3]|[57][023]|6[03])|53(?:0[0-3]|[13][023]|2[0-59]|49|5[0-35-9]|6[15]|7[45]|8[1-6]|9[0-36-9])|6(?:2(?:[05]0|22)|3(?:00|33)|4(?:0[0-25]|1[2-7]|2[0569]|[38][07-9]|4[025689]|6[0-589]|7\\d|9[0-2])|5(?:[01][056]|2[034]|3[0-57-9]|4[178]|5[0-69]|6[0-35-9]|7[1-379]|8[0-68]|9[0239]))|87(?:[029]0|7[08]))\\d{4}",
            ,
            ,
            ,
            "62001234",
            ,
            ,
            [8],
          ],
          [
            ,
            ,
            "7(?:55[0-49]|(?:7[025-9]|[89][0-25-9])\\d)\\d{5}",
            ,
            ,
            ,
            "790123456",
            ,
            ,
            [9],
          ],
          [, , "80\\d{6}", , , , "80012345", , , [8]],
          [, , "900\\d{5}", , , , "90012345", , , [8]],
          [, , "85\\d{6}", , , , "85012345", , , [8]],
          [, , "70\\d{7}", , , , "700123456", , , [9]],
          [, , , , , , , , , [-1]],
          "JO",
          962,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2356]|87"], "(0$1)"],
            [, "(\\d{3})(\\d{5,6})", "$1 $2", ["[89]"], "0$1"],
            [, "(\\d{2})(\\d{7})", "$1 $2", ["70"], "0$1"],
            [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"],
          ],
          ,
          [, , "74(?:66|77)\\d{5}", , , , "746612345", , , [9]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "8(?:10|8\\d)\\d{5}", , , , "88101234", , , [8]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        JP: [
          ,
          [
            ,
            ,
            "00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}",
            ,
            ,
            ,
            ,
            ,
            ,
            [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          ],
          [
            ,
            ,
            "(?:1(?:1[235-8]|2[3-6]|3[3-9]|4[2-6]|[58][2-8]|6[2-7]|7[2-9]|9[1-9])|(?:2[2-9]|[36][1-9])\\d|4(?:[2-578]\\d|6[02-8]|9[2-59])|5(?:[2-589]\\d|6[1-9]|7[2-8])|7(?:[25-9]\\d|3[4-9]|4[02-9])|8(?:[2679]\\d|3[2-9]|4[5-9]|5[1-9]|8[03-9])|9(?:[2-58]\\d|[679][1-9]))\\d{6}",
            ,
            ,
            ,
            "312345678",
            ,
            ,
            [9],
          ],
          [, , "[7-9]0[1-9]\\d{7}", , , , "9012345678", , , [10]],
          [
            ,
            ,
            "00(?:(?:37|66)\\d{6,13}|(?:777(?:[01]|(?:5|8\\d)\\d)|882[1245]\\d\\d)\\d\\d)|(?:120|800\\d)\\d{6}",
            ,
            ,
            ,
            "120123456",
          ],
          [, , "990\\d{6}", , , , "990123456", , , [9]],
          [, , , , , , , , , [-1]],
          [, , "60\\d{7}", , , , "601234567", , , [9]],
          [, , "50[1-9]\\d{7}", , , , "5012345678", , , [10]],
          "JP",
          81,
          "010",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{4})(\\d{4})",
              "$1-$2",
              ["007", "0077", "00777", "00777[01]"],
            ],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{3})",
              "$1-$2-$3",
              ["(?:12|57|99)0"],
              "0$1",
            ],
            [
              ,
              "(\\d{4})(\\d)(\\d{4})",
              "$1-$2-$3",
              [
                "1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])",
                "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[78]|96)|477|51[24]|636)|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]",
                "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[78]|96[2457-9])|477|51[24]|636[2-57-9])|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]",
              ],
              "0$1",
            ],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{4})",
              "$1-$2-$3",
              [
                "2(?:[34]7|[56]9|74|9[14-79])|82[0367]|993",
                "2(?:[34]7|[56]9|74|9(?:1[02-689]|[4-79]))|82[0367]|993[0-25-9]",
                "2(?:[34]7|59(?:[02-8]|1[0-689]|9[0-8])|69|74|9(?:1[02-689]|[4-79]))|82[0367]|993[0-25-9]",
              ],
              "0$1",
            ],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{4})",
              "$1-$2-$3",
              [
                "2(?:2[12]|3[0-269]|4[59]|5[0-468]|62|7[1-35]|8[16]|9[0238])|4(?:2[1-57]|3[0-57]|[45]|6[28]|7[259]|8[1-9]|9[29])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|9(?:4[15]|9[12489])",
                "2(?:2[12]|3[0-269]|4[59]|5(?:[04][01]|[1-3]|[68]1)|62|7[1-35]|8[16]|9(?:[028]|3[015-9]))|4(?:2(?:[13-57]|21)|3[0-57]|[45]|6[28]|7(?:2|[59][019])|8[1-9]|9[29])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|9(?:4[15]|9(?:[1289]|4[0178]))",
              ],
              "0$1",
            ],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{4})",
              "$1-$2-$3",
              [
                "1(?:1|5[45]|77|88|9[69])|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-389])|60|8(?:2[124589]|3[279]|49|6[0-24-689]|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|5[138]|6[1-3]|7[156]|8[189]|93)",
                "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:3[014-9]|7)|5(?:5[0-69]|[68]0|7[015-9]|9)|78[0189]|8(?:3[0134]|9[0-5])|917)|4(?:2(?:20|6|8[014-6]|9[178])|64|7[347])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|60|8(?:2(?:[1258]|4[0-39]|9[0-2469])|3[29]|49|6(?:[0-24]|5[0-3589]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|5[138]|6[1-3]|7[156]|8[189]|93[34])|(?:264|837)[016-9]|(?:59[89]|8(?:6[68]|9))[019]",
                "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:(?:2|91)7|5(?:5[0-69]|[68]0|7[015-9]|9)|64[016-9]|78[0189]|8(?:3[0134]|9[0-5]))|4(?:2(?:20|6|8[014-6])|64|7[347])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|60|8(?:2(?:[1258]|4[0-39]|9(?:[0169]|2[1-9]|4[1-3]))|3(?:[29]|7(?:[017-9]|6[6-8]))|49|6(?:[0-24]|5(?:[0-389]|5[23])|6[01]|9[0145])|7[0-468]|8[68])|9(?:[23][1-9]|5[138]|6[1-3]|7[156]|8[189]|93(?:31|4[357]))|(?:42|866)9[178]|(?:223|8699)[014-9]|(?:59[89]|8(?:68|9))[019]",
                "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:(?:2|91)7|5(?:5[0-69]|[68]0|7[015-9]|9)|64[016-9]|78[0189]|8(?:3[0134]|9[0-5]))|4(?:2(?:20|6|8[014-6])|64|7[347])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|60|8(?:2(?:[1258]|4[0-39]|9(?:[019]|4[1-3]|6(?:[0-47-9]|5[01346-9])))|3(?:[29]|7(?:[017-9]|6[6-8]))|49|6(?:[0-24]|5(?:[0-389]|5[23])|6[01]|9[0145])|7[0-468]|8[68])|9(?:5[138]|6[1-3]|7[156]|8[189]|93(?:31|4[357]))|(?:42|866)9[178]|(?:223|8699)[014-9]|(?:829(?:2|66)|9[23])[1-9]|(?:59[89]|8(?:68|9))[019]",
              ],
              "0$1",
            ],
            [
              ,
              "(\\d)(\\d{4})(\\d{4})",
              "$1-$2-$3",
              ["[36]|4(?:2[09]|7[01])", "[36]|4(?:2[09]|7(?:0[019]|1))"],
              "0$1",
            ],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{4})",
              "$1-$2-$3",
              [
                "[14]|[29][2-9]|5[3-9]|7[2-4679]|8(?:[246-9]|3[3-8]|5[2-9])",
                "[14]|[29][2-9]|5[3-9]|7[2-4679]|8(?:[246-9]|3(?:[3-6][2-9]|7|8[2-5])|5[2-9])",
              ],
              "0$1",
            ],
            [, "(\\d{4})(\\d{2})(\\d{3,4})", "$1-$2-$3", ["007"]],
            [, "(\\d{4})(\\d{2})(\\d{4})", "$1-$2-$3", ["008"]],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"],
            [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[2579]|80"], "0$1"],
            [, "(\\d{4})(\\d{3})(\\d{3,4})", "$1-$2-$3", ["0"]],
            [, "(\\d{4})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["0"]],
            [, "(\\d{4})(\\d{5})(\\d{5,6})", "$1-$2-$3", ["0"]],
            [, "(\\d{4})(\\d{6})(\\d{6,7})", "$1-$2-$3", ["0"]],
          ],
          [
            [
              ,
              "(\\d{3})(\\d{3})(\\d{3})",
              "$1-$2-$3",
              ["(?:12|57|99)0"],
              "0$1",
            ],
            [
              ,
              "(\\d{4})(\\d)(\\d{4})",
              "$1-$2-$3",
              [
                "1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])",
                "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[78]|96)|477|51[24]|636)|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]",
                "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[78]|96[2457-9])|477|51[24]|636[2-57-9])|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]",
              ],
              "0$1",
            ],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{4})",
              "$1-$2-$3",
              [
                "2(?:[34]7|[56]9|74|9[14-79])|82[0367]|993",
                "2(?:[34]7|[56]9|74|9(?:1[02-689]|[4-79]))|82[0367]|993[0-25-9]",
                "2(?:[34]7|59(?:[02-8]|1[0-689]|9[0-8])|69|74|9(?:1[02-689]|[4-79]))|82[0367]|993[0-25-9]",
              ],
              "0$1",
            ],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{4})",
              "$1-$2-$3",
              [
                "2(?:2[12]|3[0-269]|4[59]|5[0-468]|62|7[1-35]|8[16]|9[0238])|4(?:2[1-57]|3[0-57]|[45]|6[28]|7[259]|8[1-9]|9[29])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|9(?:4[15]|9[12489])",
                "2(?:2[12]|3[0-269]|4[59]|5(?:[04][01]|[1-3]|[68]1)|62|7[1-35]|8[16]|9(?:[028]|3[015-9]))|4(?:2(?:[13-57]|21)|3[0-57]|[45]|6[28]|7(?:2|[59][019])|8[1-9]|9[29])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|9(?:4[15]|9(?:[1289]|4[0178]))",
              ],
              "0$1",
            ],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{4})",
              "$1-$2-$3",
              [
                "1(?:1|5[45]|77|88|9[69])|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-389])|60|8(?:2[124589]|3[279]|49|6[0-24-689]|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|5[138]|6[1-3]|7[156]|8[189]|93)",
                "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:3[014-9]|7)|5(?:5[0-69]|[68]0|7[015-9]|9)|78[0189]|8(?:3[0134]|9[0-5])|917)|4(?:2(?:20|6|8[014-6]|9[178])|64|7[347])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|60|8(?:2(?:[1258]|4[0-39]|9[0-2469])|3[29]|49|6(?:[0-24]|5[0-3589]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|5[138]|6[1-3]|7[156]|8[189]|93[34])|(?:264|837)[016-9]|(?:59[89]|8(?:6[68]|9))[019]",
                "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:(?:2|91)7|5(?:5[0-69]|[68]0|7[015-9]|9)|64[016-9]|78[0189]|8(?:3[0134]|9[0-5]))|4(?:2(?:20|6|8[014-6])|64|7[347])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|60|8(?:2(?:[1258]|4[0-39]|9(?:[0169]|2[1-9]|4[1-3]))|3(?:[29]|7(?:[017-9]|6[6-8]))|49|6(?:[0-24]|5(?:[0-389]|5[23])|6[01]|9[0145])|7[0-468]|8[68])|9(?:[23][1-9]|5[138]|6[1-3]|7[156]|8[189]|93(?:31|4[357]))|(?:42|866)9[178]|(?:223|8699)[014-9]|(?:59[89]|8(?:68|9))[019]",
                "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:(?:2|91)7|5(?:5[0-69]|[68]0|7[015-9]|9)|64[016-9]|78[0189]|8(?:3[0134]|9[0-5]))|4(?:2(?:20|6|8[014-6])|64|7[347])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|60|8(?:2(?:[1258]|4[0-39]|9(?:[019]|4[1-3]|6(?:[0-47-9]|5[01346-9])))|3(?:[29]|7(?:[017-9]|6[6-8]))|49|6(?:[0-24]|5(?:[0-389]|5[23])|6[01]|9[0145])|7[0-468]|8[68])|9(?:5[138]|6[1-3]|7[156]|8[189]|93(?:31|4[357]))|(?:42|866)9[178]|(?:223|8699)[014-9]|(?:829(?:2|66)|9[23])[1-9]|(?:59[89]|8(?:68|9))[019]",
              ],
              "0$1",
            ],
            [
              ,
              "(\\d)(\\d{4})(\\d{4})",
              "$1-$2-$3",
              ["[36]|4(?:2[09]|7[01])", "[36]|4(?:2[09]|7(?:0[019]|1))"],
              "0$1",
            ],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{4})",
              "$1-$2-$3",
              [
                "[14]|[29][2-9]|5[3-9]|7[2-4679]|8(?:[246-9]|3[3-8]|5[2-9])",
                "[14]|[29][2-9]|5[3-9]|7[2-4679]|8(?:[246-9]|3(?:[3-6][2-9]|7|8[2-5])|5[2-9])",
              ],
              "0$1",
            ],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"],
            [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[2579]|80"], "0$1"],
          ],
          [, , "20\\d{8}", , , , "2012345678", , , [10]],
          ,
          ,
          [
            ,
            ,
            "00(?:777(?:[01]|(?:5|8\\d)\\d)|882[1245]\\d\\d)\\d\\d|00(?:37|66)\\d{6,13}",
          ],
          [, , "570\\d{6}", , , , "570123456", , , [9]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        KE: [
          ,
          [
            ,
            ,
            "(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}",
            ,
            ,
            ,
            ,
            ,
            ,
            [7, 8, 9, 10],
          ],
          [
            ,
            ,
            "(?:4[245]|5[1-79]|6[01457-9])\\d{5,7}|(?:4[136]|5[08]|62)\\d{7}|(?:[24]0|66)\\d{6,7}",
            ,
            ,
            ,
            "202012345",
            ,
            ,
            [7, 8, 9],
          ],
          [, , "[17]\\d{8}", , , , "712123456", , , [9]],
          [, , "800[24-8]\\d{5,6}", , , , "800223456", , , [9, 10]],
          [, , "900[02-9]\\d{5}", , , , "900223456", , , [9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "KE",
          254,
          "000",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{5,7})", "$1 $2", ["[24-6]"], "0$1"],
            [, "(\\d{3})(\\d{6})", "$1 $2", ["[17]"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        KG: [
          ,
          [
            ,
            ,
            "(?:[235-7]\\d|99)\\d{7}|800\\d{6,7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [9, 10],
            [5, 6],
          ],
          [
            ,
            ,
            "(?:3(?:1(?:[256]\\d|3[1-9]|47)|2(?:22|3[0-479]|6[0-7])|4(?:22|5[6-9]|6\\d)|5(?:22|3[4-7]|59|6\\d)|6(?:22|5[35-7]|6\\d)|7(?:22|3[468]|4[1-9]|59|[67]\\d)|9(?:22|4[1-8]|6\\d))|6(?:09|12|2[2-4])\\d)\\d{5}",
            ,
            ,
            ,
            "312123456",
            ,
            ,
            [9],
            [5, 6],
          ],
          [
            ,
            ,
            "(?:2(?:0[0-35]|2\\d)|5[0-24-7]\\d|7(?:[07]\\d|55)|99[69])\\d{6}",
            ,
            ,
            ,
            "700123456",
            ,
            ,
            [9],
          ],
          [, , "800\\d{6,7}", , , , "800123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "KG",
          996,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{4})(\\d{5})", "$1 $2", ["3(?:1[346]|[24-79])"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235-79]"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d)(\\d{2,3})", "$1 $2 $3 $4", ["8"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        KH: [
          ,
          [, , "1\\d{9}|[1-9]\\d{7,8}", , , , , , , [8, 9, 10], [6, 7]],
          [
            ,
            ,
            "23(?:4(?:[2-4]|[56]\\d)|[568]\\d\\d)\\d{4}|23[236-9]\\d{5}|(?:2[4-6]|3[2-6]|4[2-4]|[5-7][2-5])(?:(?:[237-9]|4[56]|5\\d)\\d{5}|6\\d{5,6})",
            ,
            ,
            ,
            "23756789",
            ,
            ,
            [8, 9],
            [6, 7],
          ],
          [
            ,
            ,
            "(?:(?:1[28]|3[18]|9[67])\\d|6[016-9]|7(?:[07-9]|[16]\\d)|8(?:[013-79]|8\\d))\\d{6}|(?:1\\d|9[0-57-9])\\d{6}|(?:2[3-6]|3[2-6]|4[2-4]|[5-7][2-5])48\\d{5}",
            ,
            ,
            ,
            "91234567",
            ,
            ,
            [8, 9],
          ],
          [, , "1800(?:1\\d|2[019])\\d{4}", , , , "1800123456", , , [10]],
          [, , "1900(?:1\\d|2[09])\\d{4}", , , , "1900123456", , , [10]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "KH",
          855,
          "00[14-9]",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-9]"], "0$1"],
            [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        KI: [
          ,
          [
            ,
            ,
            "(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}",
            ,
            ,
            ,
            ,
            ,
            ,
            [5, 8],
          ],
          [
            ,
            ,
            "(?:[24]\\d|3[1-9]|50|65(?:02[12]|12[56]|22[89]|[3-5]00)|7(?:27\\d\\d|3100|5(?:02[12]|12[56]|22[89]|[34](?:00|81)|500))|8[0-5])\\d{3}",
            ,
            ,
            ,
            "31234",
          ],
          [
            ,
            ,
            "73140\\d{3}|(?:630[01]|730[0-5])\\d{4}|[67]200[01]\\d{3}",
            ,
            ,
            ,
            "72001234",
            ,
            ,
            [8],
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "30(?:0[01]\\d\\d|12(?:11|20))\\d\\d",
            ,
            ,
            ,
            "30010000",
            ,
            ,
            [8],
          ],
          "KI",
          686,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        KM: [
          ,
          [, , "[3478]\\d{6}", , , , , , , [7]],
          [, , "7[4-7]\\d{5}", , , , "7712345"],
          [, , "[34]\\d{6}", , , , "3212345"],
          [, , , , , , , , , [-1]],
          [, , "8\\d{6}", , , , "8001234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "KM",
          269,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[3478]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        KN: [
          ,
          [, , "(?:[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "869(?:2(?:29|36)|302|4(?:6[015-9]|70))\\d{4}",
            ,
            ,
            ,
            "8692361234",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "869(?:5(?:5[6-8]|6[5-7])|66\\d|76[02-7])\\d{4}",
            ,
            ,
            ,
            "8697652917",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
          [, , "900[2-9]\\d{6}", , , , "9002123456"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "KN",
          1,
          "011",
          "1",
          ,
          ,
          "1|([2-7]\\d{6})$",
          "869$1",
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "869",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        KP: [
          ,
          [, , "85\\d{6}|(?:19\\d|2)\\d{7}", , , , , , , [8, 10], [6, 7]],
          [, , "(?:2\\d|85)\\d{6}", , , , "21234567", , , [8], [6, 7]],
          [, , "19[1-3]\\d{7}", , , , "1921234567", , , [10]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "KP",
          850,
          "00|99",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"],
            [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [
            ,
            ,
            "238[02-9]\\d{4}|2(?:[0-24-9]\\d|3[0-79])\\d{5}",
            ,
            ,
            ,
            ,
            ,
            ,
            [8],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        KR: [
          ,
          [
            ,
            ,
            "00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}",
            ,
            ,
            ,
            ,
            ,
            ,
            [5, 6, 8, 9, 10, 11, 12, 13, 14],
            [3, 4, 7],
          ],
          [
            ,
            ,
            "(?:2|3[1-3]|[46][1-4]|5[1-5])[1-9]\\d{6,7}|(?:3[1-3]|[46][1-4]|5[1-5])1\\d{2,3}",
            ,
            ,
            ,
            "22123456",
            ,
            ,
            [5, 6, 8, 9, 10],
            [3, 4, 7],
          ],
          [, , "1[0-26-9]\\d{7,8}", , , , "1000000000", , , [9, 10]],
          [
            ,
            ,
            "00(?:308\\d{6,7}|798\\d{7,9})|(?:00368|80)\\d{7}",
            ,
            ,
            ,
            "801234567",
            ,
            ,
            [9, 11, 12, 13, 14],
          ],
          [, , "60[2-9]\\d{6}", , , , "602345678", , , [9]],
          [, , , , , , , , , [-1]],
          [, , "50\\d{8,9}", , , , "5012345678", , , [10, 11]],
          [, , "70\\d{8}", , , , "7012345678", , , [10]],
          "KR",
          82,
          "00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))",
          "0",
          ,
          ,
          "0(8(?:[1-46-8]|5\\d\\d))?",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{5})",
              "$1",
              ["1[016-9]1", "1[016-9]11", "1[016-9]114"],
              "0$1",
            ],
            [
              ,
              "(\\d{2})(\\d{3,4})",
              "$1-$2",
              ["(?:3[1-3]|[46][1-4]|5[1-5])1"],
              "0$1",
              "0$CC-$1",
            ],
            [, "(\\d{4})(\\d{4})", "$1-$2", ["1"]],
            [, "(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2"], "0$1", "0$CC-$1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{4})",
              "$1-$2-$3",
              ["60|8"],
              "0$1",
              "0$CC-$1",
            ],
            [
              ,
              "(\\d{2})(\\d{3,4})(\\d{4})",
              "$1-$2-$3",
              ["[1346]|5[1-5]"],
              "0$1",
              "0$CC-$1",
            ],
            [
              ,
              "(\\d{2})(\\d{4})(\\d{4})",
              "$1-$2-$3",
              ["[57]"],
              "0$1",
              "0$CC-$1",
            ],
            [, "(\\d{5})(\\d{3})(\\d{3})", "$1 $2 $3", ["003", "0030"]],
            [, "(\\d{2})(\\d{5})(\\d{4})", "$1-$2-$3", ["5"], "0$1", "0$CC-$1"],
            [, "(\\d{5})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0"]],
            [, "(\\d{5})(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["0"]],
          ],
          [
            [
              ,
              "(\\d{2})(\\d{3,4})",
              "$1-$2",
              ["(?:3[1-3]|[46][1-4]|5[1-5])1"],
              "0$1",
              "0$CC-$1",
            ],
            [, "(\\d{4})(\\d{4})", "$1-$2", ["1"]],
            [, "(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2"], "0$1", "0$CC-$1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{4})",
              "$1-$2-$3",
              ["60|8"],
              "0$1",
              "0$CC-$1",
            ],
            [
              ,
              "(\\d{2})(\\d{3,4})(\\d{4})",
              "$1-$2-$3",
              ["[1346]|5[1-5]"],
              "0$1",
              "0$CC-$1",
            ],
            [
              ,
              "(\\d{2})(\\d{4})(\\d{4})",
              "$1-$2-$3",
              ["[57]"],
              "0$1",
              "0$CC-$1",
            ],
            [, "(\\d{2})(\\d{5})(\\d{4})", "$1-$2-$3", ["5"], "0$1", "0$CC-$1"],
          ],
          [, , "15\\d{7,8}", , , , "1523456789", , , [9, 10]],
          ,
          ,
          [
            ,
            ,
            "00(?:3(?:08\\d{6,7}|68\\d{7})|798\\d{7,9})",
            ,
            ,
            ,
            ,
            ,
            ,
            [11, 12, 13, 14],
          ],
          [
            ,
            ,
            "1(?:5(?:22|44|66|77|88|99)|6(?:[07]0|44|6[16]|88)|8(?:00|33|55|77|99))\\d{4}",
            ,
            ,
            ,
            "15441234",
            ,
            ,
            [8],
          ],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        KW: [
          ,
          [, , "(?:18|[2569]\\d\\d)\\d{5}", , , , , , , [7, 8]],
          [
            ,
            ,
            "2(?:[23]\\d\\d|4(?:[1-35-9]\\d|44)|5(?:0[034]|[2-46]\\d|5[1-3]|7[1-7]))\\d{4}",
            ,
            ,
            ,
            "22345678",
            ,
            ,
            [8],
          ],
          [
            ,
            ,
            "(?:52(?:22|5[25])|6(?:222|70[013-9]|93[039])|9(?:11[01]|702))\\d{4}|(?:5(?:[05]\\d|1[0-7]|6[56])|6(?:0[034679]|5[015-9]|6\\d|7[67]|9[069])|9(?:0[09]|22|4[01479]|55|6[0679]|7[1-9]|8[057-9]|9\\d))\\d{5}",
            ,
            ,
            ,
            "50012345",
            ,
            ,
            [8],
          ],
          [, , "18\\d{5}", , , , "1801234", , , [7]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "KW",
          965,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{4})(\\d{3,4})",
              "$1 $2",
              ["[169]|2(?:[235]|4[1-35-9])|52"],
            ],
            [, "(\\d{3})(\\d{5})", "$1 $2", ["[25]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        KY: [
          ,
          [, , "(?:345|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "345(?:2(?:22|44)|444|6(?:23|38|40)|7(?:4[35-79]|6[6-9]|77)|8(?:00|1[45]|25|[48]8)|9(?:14|4[035-9]))\\d{4}",
            ,
            ,
            ,
            "3452221234",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "345(?:32[1-9]|5(?:1[67]|2[5-79]|4[6-9]|50|76)|649|9(?:1[67]|2[2-9]|3[689]))\\d{4}",
            ,
            ,
            ,
            "3453231234",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"],
          [, , "(?:345976|900[2-9]\\d\\d)\\d{4}", , , , "9002345678"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "KY",
          1,
          "011",
          "1",
          ,
          ,
          "1|([2-9]\\d{6})$",
          "345$1",
          ,
          ,
          ,
          ,
          [, , "345849\\d{4}", , , , "3458491234"],
          ,
          "345",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        KZ: [
          ,
          [, , "33622\\d{5}|(?:7\\d|80)\\d{8}", , , , , , , [10], [5, 6]],
          [
            ,
            ,
            "(?:33622|7(?:1(?:0(?:[23]\\d|4[0-3]|59|63)|1(?:[23]\\d|4[0-79]|59)|2(?:[23]\\d|59)|3(?:2\\d|3[0-79]|4[0-35-9]|59)|4(?:[24]\\d|3[013-9]|5[1-9])|5(?:2\\d|3[1-9]|4[0-7]|59)|6(?:[2-4]\\d|5[19]|61)|72\\d|8(?:[27]\\d|3[1-46-9]|4[0-5]))|2(?:1(?:[23]\\d|4[46-9]|5[3469])|2(?:2\\d|3[0679]|46|5[12679])|3(?:[2-4]\\d|5[139])|4(?:2\\d|3[1-35-9]|59)|5(?:[23]\\d|4[0-246-8]|59|61)|6(?:2\\d|3[1-9]|4[0-4]|59)|7(?:[2379]\\d|40|5[279])|8(?:[23]\\d|4[0-3]|59)|9(?:2\\d|3[124578]|59))))\\d{5}",
            ,
            ,
            ,
            "7123456789",
            ,
            ,
            ,
            [5, 6],
          ],
          [
            ,
            ,
            "7(?:0[0-2578]|47|6[02-4]|7[15-8]|85)\\d{7}",
            ,
            ,
            ,
            "7710009998",
          ],
          [, , "800\\d{7}", , , , "8001234567"],
          [, , "809\\d{7}", , , , "8091234567"],
          [, , , , , , , , , [-1]],
          [, , "808\\d{7}", , , , "8081234567"],
          [, , "751\\d{7}", , , , "7511234567"],
          "KZ",
          7,
          "810",
          "8",
          ,
          ,
          "8",
          ,
          "8~10",
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "33|7",
          [, , "751\\d{7}"],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        LA: [
          ,
          [
            ,
            ,
            "(?:2\\d|3)\\d{8}|(?:[235-8]\\d|41)\\d{6}",
            ,
            ,
            ,
            ,
            ,
            ,
            [8, 9, 10],
            [6],
          ],
          [
            ,
            ,
            "(?:2[13]|[35-7][14]|41|8[1468])\\d{6}",
            ,
            ,
            ,
            "21212862",
            ,
            ,
            [8],
            [6],
          ],
          [
            ,
            ,
            "20(?:[29]\\d|5[24-689]|7[6-8])\\d{6}",
            ,
            ,
            ,
            "2023123456",
            ,
            ,
            [10],
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "LA",
          856,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{2})(\\d{3})(\\d{3})",
              "$1 $2 $3",
              ["2[13]|3[14]|[4-8]"],
              "0$1",
            ],
            [, "(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["3"], "0$1"],
            [, "(\\d{2})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["2"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "30\\d{7}", , , , "301234567", , , [9]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        LB: [
          ,
          [, , "[7-9]\\d{7}|[13-9]\\d{6}", , , , , , , [7, 8]],
          [
            ,
            ,
            "(?:(?:[14-69]\\d|8[02-9])\\d|7(?:[2-57]\\d|62|8[0-7]|9[04-9]))\\d{4}",
            ,
            ,
            ,
            "1123456",
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "(?:(?:3|81)\\d|7(?:[01]\\d|6[013-9]|8[89]|9[1-3]))\\d{5}",
            ,
            ,
            ,
            "71123456",
          ],
          [, , , , , , , , , [-1]],
          [, , "9[01]\\d{6}", , , , "90123456", , , [8]],
          [, , "80\\d{6}", , , , "80123456", , , [8]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "LB",
          961,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d)(\\d{3})(\\d{3})",
              "$1 $2 $3",
              ["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"],
              "0$1",
            ],
            [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[7-9]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        LC: [
          ,
          [, , "(?:[58]\\d\\d|758|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "758(?:4(?:30|5\\d|6[2-9]|8[0-2])|57[0-2]|638)\\d{4}",
            ,
            ,
            ,
            "7584305678",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2\\d|3[01]))\\d{4}",
            ,
            ,
            ,
            "7582845678",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
          [, , "900[2-9]\\d{6}", , , , "9002123456"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "LC",
          1,
          "011",
          "1",
          ,
          ,
          "1|([2-7]\\d{6})$",
          "758$1",
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "758",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        LI: [
          ,
          [, , "90\\d{5}|(?:[2378]|6\\d\\d)\\d{6}", , , , , , , [7, 9]],
          [
            ,
            ,
            "(?:2(?:01|1[27]|22|3\\d|6[02-578]|96)|3(?:33|40|7[0135-7]|8[048]|9[0269]))\\d{4}",
            ,
            ,
            ,
            "2345678",
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "756\\d{4}|(?:6(?:499|5[0-3]\\d|6(?:0[0-7]|10|2[06-9]|39))|7[37-9])\\d{5}",
            ,
            ,
            ,
            "660234567",
          ],
          [, , "80(?:02[28]|9\\d\\d)\\d\\d", , , , "8002222", , , [7]],
          [
            ,
            ,
            "90(?:02[258]|1(?:23|3[14])|66[136])\\d\\d",
            ,
            ,
            ,
            "9002222",
            ,
            ,
            [7],
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "LI",
          423,
          "00",
          "0",
          ,
          ,
          "0|(10(?:01|20|66))",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[237-9]"], , "$CC $1"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["69"], , "$CC $1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"], , "$CC $1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "870(?:28|87)\\d\\d", , , , "8702812", , , [7]],
          ,
          ,
          [, , "697(?:56|[78]\\d)\\d{4}", , , , "697861234", , , [9]],
        ],
        LK: [
          ,
          [, , "(?:[1-7]\\d|[89]1)\\d{7}", , , , , , , [9], [7]],
          [
            ,
            ,
            "(?:[189]1|2[13-7]|3[1-8]|4[157]|5[12457]|6[35-7])[2-57]\\d{6}",
            ,
            ,
            ,
            "112345678",
            ,
            ,
            ,
            [7],
          ],
          [, , "7[0-25-8]\\d{7}", , , , "712345678"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "LK",
          94,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[1-689]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "1973\\d{5}", , , , "197312345"],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        LR: [
          ,
          [, , "(?:2|33|5\\d|77|88)\\d{7}|[45]\\d{6}", , , , , , , [7, 8, 9]],
          [, , "(?:2\\d{3}|33333)\\d{4}", , , , "21234567", , , [8, 9]],
          [
            ,
            ,
            "(?:(?:330|555|(?:77|88)\\d)\\d|4[67])\\d{5}|5\\d{6}",
            ,
            ,
            ,
            "770123456",
            ,
            ,
            [7, 9],
          ],
          [, , , , , , , , , [-1]],
          [, , "332(?:02|[34]\\d)\\d{4}", , , , "332021234", , , [9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "LR",
          231,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[45]"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3578]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        LS: [
          ,
          [, , "(?:[256]\\d\\d|800)\\d{5}", , , , , , , [8]],
          [, , "2\\d{7}", , , , "22123456"],
          [, , "[56]\\d{7}", , , , "50123456"],
          [, , "800[256]\\d{4}", , , , "80021234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "LS",
          266,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{4})(\\d{4})", "$1 $2", ["[2568]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        LT: [
          ,
          [, , "(?:[3469]\\d|52|[78]0)\\d{6}", , , , , , , [8]],
          [, , "(?:3[1478]|4[124-6]|52)\\d{6}", , , , "31234567"],
          [, , "6\\d{7}", , , , "61234567"],
          [, , "800\\d{5}", , , , "80012345"],
          [, , "9(?:0[0239]|10)\\d{5}", , , , "90012345"],
          [, , "808\\d{5}", , , , "80812345"],
          [, , "700\\d{5}", , , , "70012345"],
          [, , , , , , , , , [-1]],
          "LT",
          370,
          "00",
          "8",
          ,
          ,
          "[08]",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d)(\\d{3})(\\d{4})",
              "$1 $2 $3",
              ["52[0-79]"],
              "(8-$1)",
              ,
              1,
            ],
            [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[7-9]"], "8 $1", , 1],
            [
              ,
              "(\\d{2})(\\d{6})",
              "$1 $2",
              ["37|4(?:[15]|6[1-8])"],
              "(8-$1)",
              ,
              1,
            ],
            [, "(\\d{3})(\\d{5})", "$1 $2", ["[3-6]"], "(8-$1)", , 1],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "70[67]\\d{5}", , , , "70712345"],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        LU: [
          ,
          [
            ,
            ,
            "35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}",
            ,
            ,
            ,
            ,
            ,
            ,
            [4, 5, 6, 7, 8, 9, 10, 11],
          ],
          [
            ,
            ,
            "(?:35[013-9]|80[2-9]|90[89])\\d{1,8}|(?:2[2-9]|3[0-46-9]|[457]\\d|8[13-9]|9[2-579])\\d{2,9}",
            ,
            ,
            ,
            "27123456",
          ],
          [
            ,
            ,
            "6(?:[269][18]|5[158]|7[189]|81)\\d{6}",
            ,
            ,
            ,
            "628123456",
            ,
            ,
            [9],
          ],
          [, , "800\\d{5}", , , , "80012345", , , [8]],
          [, , "90[015]\\d{5}", , , , "90012345", , , [8]],
          [, , "801\\d{5}", , , , "80112345", , , [8]],
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "20(?:1\\d{5}|[2-689]\\d{1,7})",
            ,
            ,
            ,
            "20201234",
            ,
            ,
            [4, 5, 6, 7, 8, 9, 10],
          ],
          "LU",
          352,
          "00",
          ,
          ,
          ,
          "(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{2})(\\d{3})",
              "$1 $2",
              [
                "2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])",
              ],
              ,
              "$CC $1",
            ],
            [
              ,
              "(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3",
              [
                "2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])",
              ],
              ,
              "$CC $1",
            ],
            [
              ,
              "(\\d{2})(\\d{2})(\\d{3})",
              "$1 $2 $3",
              ["20[2-689]"],
              ,
              "$CC $1",
            ],
            [
              ,
              "(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})",
              "$1 $2 $3 $4",
              ["2(?:[0367]|4[3-8])"],
              ,
              "$CC $1",
            ],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{3})",
              "$1 $2 $3",
              ["80[01]|90[015]"],
              ,
              "$CC $1",
            ],
            [
              ,
              "(\\d{2})(\\d{2})(\\d{2})(\\d{3})",
              "$1 $2 $3 $4",
              ["20"],
              ,
              "$CC $1",
            ],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"], , "$CC $1"],
            [
              ,
              "(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})",
              "$1 $2 $3 $4 $5",
              ["2(?:[0367]|4[3-8])"],
              ,
              "$CC $1",
            ],
            [
              ,
              "(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})",
              "$1 $2 $3 $4",
              ["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"],
              ,
              "$CC $1",
            ],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        LV: [
          ,
          [, , "(?:[268]\\d|90)\\d{6}", , , , , , , [8]],
          [, , "6\\d{7}", , , , "63123456"],
          [, , "2\\d{7}", , , , "21234567"],
          [, , "80\\d{6}", , , , "80123456"],
          [, , "90\\d{6}", , , , "90123456"],
          [, , "81\\d{6}", , , , "81123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "LV",
          371,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[269]|8[01]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        LY: [
          ,
          [, , "(?:[2569]\\d|71)\\d{7}", , , , , , , [9], [7]],
          [
            ,
            ,
            "(?:2[13-5]|5[1347]|6[1-479]|71)\\d{7}",
            ,
            ,
            ,
            "212345678",
            ,
            ,
            ,
            [7],
          ],
          [, , "9[1-6]\\d{7}", , , , "912345678"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "LY",
          218,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{7})", "$1-$2", ["[25-79]"], "0$1"]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MA: [
          ,
          [, , "[5-8]\\d{8}", , , , , , , [9]],
          [
            ,
            ,
            "5(?:2(?:[015-79]\\d|2[02-9]|3[2-57]|4[2-8]|8[235-7])|3(?:[0-48]\\d|[57][2-9]|6[2-8]|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}",
            ,
            ,
            ,
            "520123456",
          ],
          [
            ,
            ,
            "(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0[067]|6[1267]|7[017]))\\d{6}",
            ,
            ,
            ,
            "650123456",
          ],
          [, , "80\\d{7}", , , , "801234567"],
          [, , "89\\d{7}", , , , "891234567"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "5924[01]\\d{4}", , , , "592401234"],
          "MA",
          212,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{5})(\\d{4})",
              "$1-$2",
              ["5(?:29|38)", "5(?:29|38)[89]"],
              "0$1",
            ],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["5[45]"],
              "0$1",
            ],
            [
              ,
              "(\\d{4})(\\d{5})",
              "$1-$2",
              ["5(?:2[2-489]|3[5-9]|9)|892"],
              "0$1",
            ],
            [, "(\\d{2})(\\d{7})", "$1-$2", ["8"], "0$1"],
            [, "(\\d{3})(\\d{6})", "$1-$2", ["[5-7]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          1,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MC: [
          ,
          [, , "870\\d{5}|(?:[349]|6\\d)\\d{7}", , , , , , , [8, 9]],
          [, , "(?:870|9[2-47-9]\\d)\\d{5}", , , , "99123456", , , [8]],
          [, , "4(?:4\\d|5[1-9])\\d{5}|(?:3|6\\d)\\d{7}", , , , "612345678"],
          [, , "90\\d{6}", , , , "90123456", , , [8]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "MC",
          377,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["8"]],
            [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"],
            [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[39]"]],
            [
              ,
              "(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4 $5",
              ["6"],
              "0$1",
            ],
          ],
          [
            [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"],
            [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[39]"]],
            [
              ,
              "(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4 $5",
              ["6"],
              "0$1",
            ],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "870\\d{5}", , , , , , , [8]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MD: [
          ,
          [, , "(?:[235-7]\\d|[89]0)\\d{6}", , , , , , , [8]],
          [
            ,
            ,
            "(?:(?:2[1-9]|3[1-79])\\d|5(?:33|5[257]))\\d{5}",
            ,
            ,
            ,
            "22212345",
          ],
          [
            ,
            ,
            "(?:562|6\\d\\d|7(?:[189]\\d|6[07]|7[457-9]))\\d{5}",
            ,
            ,
            ,
            "62112345",
          ],
          [, , "800\\d{5}", , , , "80012345"],
          [, , "90[056]\\d{5}", , , , "90012345"],
          [, , "808\\d{5}", , , , "80812345"],
          [, , , , , , , , , [-1]],
          [, , "3[08]\\d{6}", , , , "30123456"],
          "MD",
          373,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["22|3"], "0$1"],
            [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[25-7]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "803\\d{5}", , , , "80312345"],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        ME: [
          ,
          [, , "(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}", , , , , , , [8, 9], [6]],
          [
            ,
            ,
            "(?:20[2-8]|3(?:[0-2][2-7]|3[24-7])|4(?:0[2-467]|1[2467])|5(?:[01][2467]|2[2-467]))\\d{5}",
            ,
            ,
            ,
            "30234567",
            ,
            ,
            [8],
            [6],
          ],
          [
            ,
            ,
            "6(?:00|3[024]|6[0-25]|[7-9]\\d)\\d{5}",
            ,
            ,
            ,
            "67622901",
            ,
            ,
            [8],
          ],
          [, , "80(?:[0-2578]|9\\d)\\d{5}", , , , "80080002"],
          [, , "9(?:4[1568]|5[178])\\d{5}", , , , "94515151", , , [8]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "78[1-49]\\d{5}", , , , "78108780", , , [8]],
          "ME",
          382,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "0$1"]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "77[1-9]\\d{5}", , , , "77273012", , , [8]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MF: [
          ,
          [, , "(?:590|69\\d)\\d{6}", , , , , , , [9]],
          [
            ,
            ,
            "590(?:0[079]|[14]3|[27][79]|30|5[0-268]|87)\\d{4}",
            ,
            ,
            ,
            "590271234",
          ],
          [, , "69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}", , , , "690001234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "MF",
          590,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MG: [
          ,
          [, , "[23]\\d{8}", , , , , , , [9], [7]],
          [
            ,
            ,
            "2072[29]\\d{4}|20(?:2\\d|4[47]|5[3467]|6[279]|7[35]|8[268]|9[245])\\d{5}",
            ,
            ,
            ,
            "202123456",
            ,
            ,
            ,
            [7],
          ],
          [, , "3[2-49]\\d{7}", , , , "321234567"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "22\\d{7}", , , , "221234567"],
          "MG",
          261,
          "00",
          "0",
          ,
          ,
          "0|([24-9]\\d{6})$",
          "20$1",
          ,
          ,
          [
            [
              ,
              "(\\d{2})(\\d{2})(\\d{3})(\\d{2})",
              "$1 $2 $3 $4",
              ["[23]"],
              "0$1",
            ],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MH: [
          ,
          [, , "329\\d{4}|(?:[256]\\d|45)\\d{5}", , , , , , , [7]],
          [, , "(?:247|528|625)\\d{4}", , , , "2471234"],
          [, , "(?:(?:23|54)5|329|45[56])\\d{4}", , , , "2351234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "635\\d{4}", , , , "6351234"],
          "MH",
          692,
          "011",
          "1",
          ,
          ,
          "1",
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{4})", "$1-$2", ["[2-6]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MK: [
          ,
          [, , "[2-578]\\d{7}", , , , , , , [8], [6, 7]],
          [
            ,
            ,
            "(?:2(?:[23]\\d|5[0-24578]|6[01]|82)|3(?:1[3-68]|[23][2-68]|4[23568])|4(?:[23][2-68]|4[3-68]|5[2568]|6[25-8]|7[24-68]|8[4-68]))\\d{5}",
            ,
            ,
            ,
            "22012345",
            ,
            ,
            ,
            [6, 7],
          ],
          [
            ,
            ,
            "7(?:(?:[0-25-8]\\d|3[2-4]|9[23])\\d|421)\\d{4}",
            ,
            ,
            ,
            "72345678",
          ],
          [, , "800\\d{5}", , , , "80012345"],
          [, , "5[02-9]\\d{6}", , , , "50012345"],
          [, , "8(?:0[1-9]|[1-9]\\d)\\d{5}", , , , "80123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "MK",
          389,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[347]"], "0$1"],
            [, "(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[58]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        ML: [
          ,
          [, , "(?:[246-9]\\d|50)\\d{6}", , , , , , , [8]],
          [
            ,
            ,
            "2(?:07[0-8]|12[67])\\d{4}|(?:2(?:02|1[4-689])|4(?:0[0-4]|4[1-39]))\\d{5}",
            ,
            ,
            ,
            "20212345",
          ],
          [
            ,
            ,
            "2(?:079|17\\d)\\d{4}|(?:50|[679]\\d|8[239])\\d{6}",
            ,
            ,
            ,
            "65012345",
          ],
          [, , "80\\d{6}", , , , "80012345"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "ML",
          223,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{4})",
              "$1",
              [
                "67[057-9]|74[045]",
                "67(?:0[09]|[59]9|77|8[89])|74(?:0[02]|44|55)",
              ],
            ],
            [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-9]"]],
          ],
          [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-9]"]]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "80\\d{6}"],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MM: [
          ,
          [
            ,
            ,
            "1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 7, 8, 9, 10],
            [5],
          ],
          [
            ,
            ,
            "(?:1(?:(?:2\\d|3[56]|[89][0-6])\\d|4(?:2[2-469]|39|6[25]|7[01])|6)|2(?:2(?:00|8[34])|4(?:0\\d|2[246]|39|62|7[01])|51\\d\\d)|4(?:2(?:2\\d\\d|480)|[34]20\\d)|6(?:0(?:[23]|88\\d)|(?:124|320|42[04]|[56]2\\d)\\d|7(?:(?:3\\d|8[01459])\\d|4(?:39|[67]0)))|8[1-35]2\\d\\d)\\d{4}|5(?:22\\d{5,6}|(?:3[2-68]|42(?:1|86)|(?:522|[89]20)\\d|6[2-4]|7(?:20\\d|480))\\d{4})|7(?:120\\d{4,5}|(?:425\\d|5(?:202|96\\d))\\d{4})|(?:(?:1[2-6]\\d|4(?:2[24-8]|356|[46][2-6]|5[35])|5(?:2[235-8]|4[25-8]|5[23]|7[2-8]|8[25-7]|9[235-7])|6(?:[19]20|42[03-6]|(?:52|7[45])\\d)|7(?:[04][25-8]|[15][235-7]|22|3[2-4]))\\d|8(?:[135]2\\d\\d|2(?:2\\d\\d|320)))\\d{3}|25\\d{5,6}|(?:2[2-9]|43[235-7]|6(?:1[2356]|[24][2-6]|3[256]|5[2-4]|6[2-8]|7[235-7]|8[245]|9[24])|8(?:1[235689]|2[2-8]|32|4[24-7]|5[245]|6[23]))\\d{4}|(?:4[35]|5[2489]|63|7[0145]|8[13])4(?:[0-689]\\d{3}|7(?:0\\d\\d(?:\\d{2})?|[1-9]\\d\\d))",
            ,
            ,
            ,
            "1234567",
            ,
            ,
            [6, 7, 8, 9],
            [5],
          ],
          [
            ,
            ,
            "(?:17[01]|9(?:2(?:[0-4]|[56]\\d\\d)|(?:3(?:[0-36]|4\\d)|(?:6[89]|89)\\d|7(?:3|5[0-2]|[6-9]\\d))\\d|4(?:(?:[0245]\\d|[1379])\\d|88)|5[0-6]|9(?:[089]|[5-7]\\d\\d))\\d)\\d{4}|9[69]1\\d{6}|9[68]\\d{6}",
            ,
            ,
            ,
            "92123456",
            ,
            ,
            [7, 8, 9, 10],
          ],
          [, , "80080(?:[01][1-9]|2\\d)\\d{3}", , , , "8008001234", , , [10]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "1333\\d{4}|[12]468\\d{4}", , , , "13331234", , , [8]],
          "MM",
          95,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{2})(\\d{3})", "$1 $2 $3", ["16|2"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{2})(\\d{3})",
              "$1 $2 $3",
              ["[45]|6(?:0[23]|[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-6]"],
              "0$1",
            ],
            [, "(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{3,4})",
              "$1 $2 $3",
              ["[4-7]|8[1-35]"],
              "0$1",
            ],
            [
              ,
              "(\\d)(\\d{3})(\\d{4,6})",
              "$1 $2 $3",
              ["9(?:2[0-4]|[35-9]|4[137-9])"],
              "0$1",
            ],
            [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"],
            [, "(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["92"], "0$1"],
            [, "(\\d)(\\d{5})(\\d{4})", "$1 $2 $3", ["9"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MN: [
          ,
          [, , "[12]\\d{7,9}|[57-9]\\d{7}", , , , , , , [8, 9, 10], [4, 5, 6]],
          [
            ,
            ,
            "[12]2[1-3]\\d{5,6}|(?:[12](?:1|27)|5[0568])\\d{6}|[12](?:3[2-8]|4[2-68]|5[1-4689])\\d{6,7}",
            ,
            ,
            ,
            "50123456",
            ,
            ,
            ,
            [4, 5, 6],
          ],
          [
            ,
            ,
            "83[01]\\d{5}|(?:8[05689]|9[013-9])\\d{6}",
            ,
            ,
            ,
            "88123456",
            ,
            ,
            [8],
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "7[05-8]\\d{6}", , , , "75123456", , , [8]],
          "MN",
          976,
          "001",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[12]1"], "0$1"],
            [, "(\\d{4})(\\d{4})", "$1 $2", ["[57-9]"]],
            [, "(\\d{3})(\\d{5,6})", "$1 $2", ["[12]2[1-3]"], "0$1"],
            [
              ,
              "(\\d{4})(\\d{5,6})",
              "$1 $2",
              [
                "[12](?:27|3[2-8]|4[2-68]|5[1-4689])",
                "[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]",
              ],
              "0$1",
            ],
            [, "(\\d{5})(\\d{4,5})", "$1 $2", ["[12]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MO: [
          ,
          [, , "(?:28|[68]\\d)\\d{6}", , , , , , , [8]],
          [, , "(?:28[2-57-9]|8(?:11|[2-57-9]\\d))\\d{5}", , , , "28212345"],
          [
            ,
            ,
            "6(?:[2356]\\d\\d|8(?:[02][5-9]|[1478]\\d|[356][0-4]))\\d{4}",
            ,
            ,
            ,
            "66123456",
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "MO",
          853,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{4})(\\d{4})", "$1 $2", ["[268]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MP: [
          ,
          [, , "[58]\\d{9}|(?:67|90)0\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "670(?:2(?:3[3-7]|56|8[5-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",
            ,
            ,
            ,
            "6702345678",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "670(?:2(?:3[3-7]|56|8[5-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",
            ,
            ,
            ,
            "6702345678",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
          [, , "900[2-9]\\d{6}", , , , "9002123456"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "MP",
          1,
          "011",
          "1",
          ,
          ,
          "1|([2-9]\\d{6})$",
          "670$1",
          ,
          1,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "670",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MQ: [
          ,
          [, , "(?:596|69\\d)\\d{6}", , , , , , , [9]],
          [
            ,
            ,
            "596(?:0[0-7]|10|2[7-9]|3[05-9]|4[0-46-8]|[5-7]\\d|8[09]|9[4-8])\\d{4}",
            ,
            ,
            ,
            "596301234",
          ],
          [
            ,
            ,
            "69(?:6(?:[0-47-9]\\d|5[0-6]|6[0-4])|727)\\d{4}",
            ,
            ,
            ,
            "696201234",
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "MQ",
          596,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[56]"],
              "0$1",
            ],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MR: [
          ,
          [, , "(?:[2-4]\\d\\d|800)\\d{5}", , , , , , , [8]],
          [, , "(?:25[08]|35\\d|45[1-7])\\d{5}", , , , "35123456"],
          [, , "[2-4][0-46-9]\\d{6}", , , , "22123456"],
          [, , "800\\d{5}", , , , "80012345"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "MR",
          222,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-48]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MS: [
          ,
          [, , "66449\\d{5}|(?:[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]],
          [, , "664491\\d{4}", , , , "6644912345", , , , [7]],
          [, , "66449[2-6]\\d{4}", , , , "6644923456", , , , [7]],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
          [, , "900[2-9]\\d{6}", , , , "9002123456"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "MS",
          1,
          "011",
          "1",
          ,
          ,
          "1|(4\\d{6})$",
          "664$1",
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "664",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MT: [
          ,
          [, , "3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}", , , , , , , [8]],
          [, , "203[1-4]\\d{4}|2(?:0[169]|[1-357]\\d)\\d{5}", , , , "21001234"],
          [
            ,
            ,
            "(?:7(?:210|[79]\\d\\d)|9(?:2(?:1[01]|31)|69[67]|8(?:1[1-3]|89|97)|9\\d\\d))\\d{4}",
            ,
            ,
            ,
            "96961234",
          ],
          [, , "800[3467]\\d{4}", , , , "80071234"],
          [
            ,
            ,
            "5(?:0(?:0(?:37|43)|(?:6\\d|70|9[0168])\\d)|[12]\\d0[1-5])\\d{3}",
            ,
            ,
            ,
            "50037123",
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "3550\\d{4}", , , , "35501234"],
          "MT",
          356,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{4})(\\d{4})", "$1 $2", ["[2357-9]"]]],
          ,
          [, , "7117\\d{4}", , , , "71171234"],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "501\\d{5}", , , , "50112345"],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MU: [
          ,
          [, , "(?:[2-468]|5\\d)\\d{6}", , , , , , , [7, 8]],
          [
            ,
            ,
            "(?:2(?:[03478]\\d|1[0-7]|6[0-79])|4(?:[013568]\\d|2[4-7])|54(?:4\\d|71)|6\\d\\d|8(?:14|3[129]))\\d{4}",
            ,
            ,
            ,
            "54480123",
          ],
          [
            ,
            ,
            "5(?:4(?:2[1-389]|7[1-9])|87[15-8])\\d{4}|5(?:2[589]|4[489]|7\\d|8[0-689]|9[0-8])\\d{5}",
            ,
            ,
            ,
            "52512345",
            ,
            ,
            [8],
          ],
          [, , "80[0-2]\\d{4}", , , , "8001234", , , [7]],
          [, , "30\\d{5}", , , , "3012345", , , [7]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "3(?:20|9\\d)\\d{4}", , , , "3201234", , , [7]],
          "MU",
          230,
          "0(?:0|[24-7]0|3[03])",
          ,
          ,
          ,
          ,
          ,
          "020",
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1 $2", ["[2-46]|8[013]"]],
            [, "(\\d{4})(\\d{4})", "$1 $2", ["5"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MV: [
          ,
          [, , "(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}", , , , , , , [7, 10]],
          [
            ,
            ,
            "(?:3(?:0[0-3]|3[0-59])|6(?:[57][02468]|6[024-68]|8[024689]))\\d{4}",
            ,
            ,
            ,
            "6701234",
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "46[46]\\d{4}|(?:7[2-9]|9[14-9])\\d{5}",
            ,
            ,
            ,
            "7712345",
            ,
            ,
            [7],
          ],
          [, , "800\\d{7}", , , , "8001234567", , , [10]],
          [, , "900\\d{7}", , , , "9001234567", , , [10]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "MV",
          960,
          "0(?:0|19)",
          ,
          ,
          ,
          ,
          ,
          "00",
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1-$2", ["[3467]|9[14-9]"]],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "4[05]0\\d{4}", , , , "4001234", , , [7]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MW: [
          ,
          [
            ,
            ,
            "1\\d{6}(?:\\d{2})?|(?:[23]1|77|88|99)\\d{7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [7, 9],
          ],
          [, , "(?:1[2-9]|21\\d\\d)\\d{5}", , , , "1234567"],
          [, , "111\\d{6}|(?:77|88|99)\\d{7}", , , , "991234567", , , [9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "31\\d{7}", , , , "310123456", , , [9]],
          "MW",
          265,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[2-9]"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["3"], "0$1"],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[17-9]"],
              "0$1",
            ],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MX: [
          ,
          [, , "(?:1\\d|[2-9])\\d{9}", , , , , , , [10, 11], [7, 8]],
          [
            ,
            ,
            "(?:2(?:0[01]|2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|3\\d|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-7][1-9]|3[1-8]|8[1-35-9]|9[2-689])|5(?:[56]\\d|88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[1-57-9]|7[1-7]|8[67]|9[4-8])|7(?:[1-467][1-9]|5[13-9]|8[1-69]|9[17])|8(?:1\\d|2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7}",
            ,
            ,
            ,
            "2221234567",
            ,
            ,
            [10],
            [7, 8],
          ],
          [
            ,
            ,
            "1(?:2(?:2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|3\\d|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-7][1-9]|3[1-8]|8[1-35-9]|9[2-689])|5(?:[56]\\d|88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[1-57-9]|7[1-7]|8[67]|9[4-8])|7(?:[1-467][1-9]|5[13-9]|8[1-69]|9[17])|8(?:1\\d|2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7}",
            ,
            ,
            ,
            "12221234567",
            ,
            ,
            [11],
          ],
          [, , "8(?:00|88)\\d{7}", , , , "8001234567", , , [10]],
          [, , "900\\d{7}", , , , "9001234567", , , [10]],
          [, , "300\\d{7}", , , , "3001234567", , , [10]],
          [, , "500\\d{7}", , , , "5001234567", , , [10]],
          [, , , , , , , , , [-1]],
          "MX",
          52,
          "0[09]",
          "01",
          ,
          ,
          "0[12]|04[45]([2-9]\\d{9})$",
          "1$1",
          "00",
          ,
          [
            [, "(\\d{5})", "$1", ["53"]],
            [
              ,
              "(\\d{2})(\\d{4})(\\d{4})",
              "$1 $2 $3",
              ["33|5[56]|81"],
              "01 $1",
              ,
              1,
            ],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-9]"], "01 $1", , 1],
            [
              ,
              "(\\d)(\\d{2})(\\d{4})(\\d{4})",
              "$2 $3 $4",
              ["1(?:33|5[56]|81)"],
              "044 $1",
            ],
            [, "(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 $3 $4", ["1"], "044 $1"],
          ],
          [
            [
              ,
              "(\\d{2})(\\d{4})(\\d{4})",
              "$1 $2 $3",
              ["33|5[56]|81"],
              "01 $1",
              ,
              1,
            ],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-9]"], "01 $1", , 1],
            [
              ,
              "(\\d)(\\d{2})(\\d{4})(\\d{4})",
              "$1 $2 $3 $4",
              ["1(?:33|5[56]|81)"],
            ],
            [, "(\\d)(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1"]],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MY: [
          ,
          [
            ,
            ,
            "1\\d{8,9}|(?:3\\d|[4-9])\\d{7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [8, 9, 10],
            [6, 7],
          ],
          [
            ,
            ,
            "(?:3(?:2[0-36-9]|3[0-368]|4[0-278]|5[0-24-8]|6[0-467]|7[1246-9]|8\\d|9[0-57])\\d|4(?:2[0-689]|[3-79]\\d|8[1-35689])|5(?:2[0-589]|[3468]\\d|5[0-489]|7[1-9]|9[23])|6(?:2[2-9]|3[1357-9]|[46]\\d|5[0-6]|7[0-35-9]|85|9[015-8])|7(?:[2579]\\d|3[03-68]|4[0-8]|6[5-9]|8[0-35-9])|8(?:[24][2-8]|3[2-5]|5[2-7]|6[2-589]|7[2-578]|[89][2-9])|9(?:0[57]|13|[25-7]\\d|[3489][0-8]))\\d{5}",
            ,
            ,
            ,
            "323856789",
            ,
            ,
            [8, 9],
            [6, 7],
          ],
          [
            ,
            ,
            "1(?:4400|8(?:47|8[27])[0-4])\\d{4}|1(?:0(?:[23568]\\d|4[0-6]|7[016-9]|9[0-8])|1(?:[1-5]\\d\\d|6(?:0[5-9]|[1-9]\\d))|(?:[23679][2-9]|4[235-9]|59\\d)\\d|8(?:1[23]|[236]\\d|4[06]|5[7-9]|7[016-9]|8[01]|9[0-8]))\\d{5}",
            ,
            ,
            ,
            "123456789",
            ,
            ,
            [9, 10],
          ],
          [, , "1[378]00\\d{6}", , , , "1300123456", , , [10]],
          [, , "1600\\d{6}", , , , "1600123456", , , [10]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "154(?:6(?:0\\d|1[0-3])|8(?:[25]1|4[0189]|7[0-4679]))\\d{4}",
            ,
            ,
            ,
            "1546012345",
            ,
            ,
            [10],
          ],
          "MY",
          60,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{3})(\\d{4})", "$1-$2 $3", ["[4-79]"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{3,4})",
              "$1-$2 $3",
              ["1(?:[0249]|[367][2-9]|8[1-9])|8"],
              "0$1",
            ],
            [, "(\\d)(\\d{4})(\\d{4})", "$1-$2 $3", ["3"], "0$1"],
            [, "(\\d)(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3-$4", ["1[36-8]"]],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2 $3", ["15"], "0$1"],
            [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2 $3", ["1"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        MZ: [
          ,
          [, , "(?:2|8\\d)\\d{7}", , , , , , , [8, 9]],
          [
            ,
            ,
            "2(?:[1346]\\d|5[0-2]|[78][12]|93)\\d{5}",
            ,
            ,
            ,
            "21123456",
            ,
            ,
            [8],
          ],
          [, , "8[2-7]\\d{7}", , , , "821234567", , , [9]],
          [, , "800\\d{6}", , , , "800123456", , , [9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "MZ",
          258,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2|8[2-7]"]],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        NA: [
          ,
          [, , "[68]\\d{7,8}", , , , , , , [8, 9]],
          [
            ,
            ,
            "6(?:1(?:[02-4]\\d\\d|17)|2(?:17|54\\d|69|70)|3(?:17|2[0237]\\d|34|6[289]|7[01]|81)|4(?:17|(?:27|41|5[25])\\d|69|7[01])|5(?:17|2[236-8]\\d|69|7[01])|6(?:17|26\\d|38|42|69|7[01])|7(?:17|(?:2[2-4]|30)\\d|6[89]|7[01]))\\d{4}|6(?:1(?:2[2-7]|3[01378]|4[0-4]|69|7[014])|25[0-46-8]|32\\d|4(?:2[0-27]|4[016]|5[0-357])|52[02-9]|62[56]|7(?:2[2-69]|3[013]))\\d{4}",
            ,
            ,
            ,
            "61221234",
          ],
          [, , "(?:60|8[1245])\\d{7}", , , , "811234567", , , [9]],
          [, , "80\\d{7}", , , , "800123456", , , [9]],
          [, , "8701\\d{5}", , , , "870123456", , , [9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "8(?:3\\d\\d|86)\\d{5}", , , , "88612345"],
          "NA",
          264,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["88"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["87"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        NC: [
          ,
          [, , "[2-57-9]\\d{5}", , , , , , , [6]],
          [, , "(?:2[03-9]|3[0-5]|4[1-7]|88)\\d{4}", , , , "201234"],
          [, , "(?:5[0-4]|[79]\\d|8[0-79])\\d{4}", , , , "751234"],
          [, , , , , , , , , [-1]],
          [, , "36\\d{4}", , , , "366711"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "NC",
          687,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{3})", "$1", ["5[6-8]"]],
            [, "(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[2-57-9]"]],
          ],
          [[, "(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[2-57-9]"]]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        NE: [
          ,
          [, , "[0289]\\d{7}", , , , , , , [8]],
          [
            ,
            ,
            "2(?:0(?:20|3[1-7]|4[13-5]|5[14]|6[14578]|7[1-578])|1(?:4[145]|5[14]|6[14-68]|7[169]|88))\\d{4}",
            ,
            ,
            ,
            "20201234",
          ],
          [, , "(?:8[04589]|9\\d)\\d{6}", , , , "93123456"],
          [, , "08\\d{6}", , , , "08123456"],
          [, , "09\\d{6}", , , , "09123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "NE",
          227,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["08"]],
            [
              ,
              "(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[089]|2[01]"],
            ],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        NF: [
          ,
          [, , "[13]\\d{5}", , , , , , , [6], [5]],
          [
            ,
            ,
            "(?:1(?:06|17|28|39)|3[0-2]\\d)\\d{3}",
            ,
            ,
            ,
            "106609",
            ,
            ,
            ,
            [5],
          ],
          [, , "3[58]\\d{4}", , , , "381234", , , , [5]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "NF",
          672,
          "00",
          ,
          ,
          ,
          "([0-258]\\d{4})$",
          "3$1",
          ,
          ,
          [
            [, "(\\d{2})(\\d{4})", "$1 $2", ["1"]],
            [, "(\\d)(\\d{5})", "$1 $2", ["3"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        NG: [
          ,
          [
            ,
            ,
            "(?:[124-7]|9\\d{3})\\d{6}|[1-9]\\d{7}|[78]\\d{9,13}",
            ,
            ,
            ,
            ,
            ,
            ,
            [7, 8, 10, 11, 12, 13, 14],
            [5, 6],
          ],
          [
            ,
            ,
            "(?:(?:[1-356]\\d|4[02-8]|7[0-79]|8[2-9])\\d|9(?:0[3-9]|[1-9]\\d))\\d{5}|(?:[12]\\d|4[147]|5[14579]|6[1578]|7[0-3578])\\d{5}",
            ,
            ,
            ,
            "18040123",
            ,
            ,
            [7, 8],
            [5, 6],
          ],
          [
            ,
            ,
            "(?:707[0-3]|8(?:01|19)[01])\\d{6}|(?:70[1-689]|8(?:0[2-9]|1[0-8])|90[235-9])\\d{7}",
            ,
            ,
            ,
            "8021234567",
            ,
            ,
            [10],
          ],
          [, , "800\\d{7,11}", , , , "80017591759", , , [10, 11, 12, 13, 14]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "NG",
          234,
          "009",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["78"], "0$1"],
            [
              ,
              "(\\d)(\\d{3})(\\d{3,4})",
              "$1 $2 $3",
              ["[12]|9(?:0[3-9]|[1-9])"],
              "0$1",
            ],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2,3})",
              "$1 $2 $3",
              ["[3-7]|8[2-9]"],
              "0$1",
            ],
            [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[7-9]"], "0$1"],
            [, "(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["[78]"], "0$1"],
            [, "(\\d{3})(\\d{5})(\\d{5,6})", "$1 $2 $3", ["[78]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "700\\d{7,11}", , , , "7001234567", , , [10, 11, 12, 13, 14]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        NI: [
          ,
          [, , "(?:1800|[25-8]\\d{3})\\d{4}", , , , , , , [8]],
          [, , "2\\d{7}", , , , "21234567"],
          [
            ,
            ,
            "(?:5(?:5[0-7]|[78]\\d)|6(?:20|3[035]|4[045]|5[05]|77|8[1-9]|9[059])|(?:7[5-8]|8\\d)\\d)\\d{5}",
            ,
            ,
            ,
            "81234567",
          ],
          [, , "1800\\d{4}", , , , "18001234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "NI",
          505,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{4})(\\d{4})", "$1 $2", ["[125-8]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        NL: [
          ,
          [
            ,
            ,
            "(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|[89]\\d{6,9}|1\\d{4,5}",
            ,
            ,
            ,
            ,
            ,
            ,
            [5, 6, 7, 8, 9, 10],
          ],
          [
            ,
            ,
            "(?:1(?:[035]\\d|1[13-578]|6[124-8]|7[24]|8[0-467])|2(?:[0346]\\d|2[2-46-9]|5[125]|9[479])|3(?:[03568]\\d|1[3-8]|2[01]|4[1-8])|4(?:[0356]\\d|1[1-368]|7[58]|8[15-8]|9[23579])|5(?:[0358]\\d|[19][1-9]|2[1-57-9]|4[13-8]|6[126]|7[0-3578])|7\\d\\d)\\d{6}",
            ,
            ,
            ,
            "101234567",
            ,
            ,
            [9],
          ],
          [, , "6[1-58]\\d{7}", , , , "612345678", , , [9]],
          [, , "800\\d{4,7}", , , , "8001234", , , [7, 8, 9, 10]],
          [, , "90[069]\\d{4,7}", , , , "9061234", , , [7, 8, 9, 10]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "(?:85|91)\\d{7}", , , , "851234567", , , [9]],
          "NL",
          31,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{4})", "$1", ["1[238]|[34]"]],
            [, "(\\d{2})(\\d{3,4})", "$1 $2", ["14"]],
            [, "(\\d{6})", "$1", ["1"]],
            [, "(\\d{3})(\\d{4,7})", "$1 $2", ["[89]0"], "0$1"],
            [, "(\\d{2})(\\d{7})", "$1 $2", ["66"], "0$1"],
            [, "(\\d)(\\d{8})", "$1 $2", ["6"], "0$1"],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{3})",
              "$1 $2 $3",
              ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],
              "0$1",
            ],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-57-9]"], "0$1"],
          ],
          [
            [, "(\\d{3})(\\d{4,7})", "$1 $2", ["[89]0"], "0$1"],
            [, "(\\d{2})(\\d{7})", "$1 $2", ["66"], "0$1"],
            [, "(\\d)(\\d{8})", "$1 $2", ["6"], "0$1"],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{3})",
              "$1 $2 $3",
              ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],
              "0$1",
            ],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-57-9]"], "0$1"],
          ],
          [, , "66\\d{7}", , , , "662345678", , , [9]],
          ,
          ,
          [
            ,
            ,
            "140(?:1[035]|2[0346]|3[03568]|4[0356]|5[0358]|8[458])|140(?:1[16-8]|2[259]|3[124]|4[17-9]|5[124679]|7)\\d",
            ,
            ,
            ,
            ,
            ,
            ,
            [5, 6],
          ],
          [
            ,
            ,
            "140(?:1[035]|2[0346]|3[03568]|4[0356]|5[0358]|8[458])|(?:140(?:1[16-8]|2[259]|3[124]|4[17-9]|5[124679]|7)|8[478]\\d{6})\\d",
            ,
            ,
            ,
            "14020",
            ,
            ,
            [5, 6, 9],
          ],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        NO: [
          ,
          [, , "(?:0|[2-9]\\d{3})\\d{4}", , , , , , , [5, 8]],
          [
            ,
            ,
            "(?:2[1-4]|3[1-3578]|5[1-35-7]|6[1-4679]|7[0-8])\\d{6}",
            ,
            ,
            ,
            "21234567",
            ,
            ,
            [8],
          ],
          [, , "(?:4[015-8]|5[89]|9\\d)\\d{6}", , , , "40612345", , , [8]],
          [, , "80[01]\\d{5}", , , , "80012345", , , [8]],
          [, , "82[09]\\d{5}", , , , "82012345", , , [8]],
          [, , "810(?:0[0-6]|[2-8]\\d)\\d{3}", , , , "81021234", , , [8]],
          [, , "880\\d{5}", , , , "88012345", , , [8]],
          [, , "85[0-5]\\d{5}", , , , "85012345", , , [8]],
          "NO",
          47,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[489]"]],
            [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[235-7]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          1,
          "[02-689]|7[0-8]",
          [, , , , , , , , , [-1]],
          [, , "8100[7-9]\\d{3}|(?:0|81(?:01|5\\d))\\d{4}", , , , "01234"],
          ,
          ,
          [, , "81[23]\\d{5}", , , , "81212345", , , [8]],
        ],
        NP: [
          ,
          [, , "9\\d{9}|[1-9]\\d{7}", , , , , , , [8, 10], [6, 7]],
          [
            ,
            ,
            "1[0-6]\\d{6}|(?:2[13-79]|3[135-8]|4[146-9]|5[135-7]|6[13-9]|7[15-9]|8[1-46-9]|9[1-79])[2-6]\\d{5}",
            ,
            ,
            ,
            "14567890",
            ,
            ,
            [8],
            [6, 7],
          ],
          [
            ,
            ,
            "9(?:6[0-3]|7[245]|8[0-24-68])\\d{7}",
            ,
            ,
            ,
            "9841234567",
            ,
            ,
            [10],
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "NP",
          977,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{7})", "$1-$2", ["1[2-6]"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{6})",
              "$1-$2",
              ["[1-8]|9(?:[1-579]|6[2-6])"],
              "0$1",
            ],
            [, "(\\d{3})(\\d{7})", "$1-$2", ["9"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        NR: [
          ,
          [, , "(?:444|55\\d|888)\\d{4}", , , , , , , [7]],
          [, , "(?:444|888)\\d{4}", , , , "4441234"],
          [, , "55[4-9]\\d{4}", , , , "5551234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "NR",
          674,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{4})", "$1 $2", ["[458]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        NU: [
          ,
          [, , "(?:[47]|888\\d)\\d{3}", , , , , , , [4, 7]],
          [, , "[47]\\d{3}", , , , "7012", , , [4]],
          [, , "888[4-9]\\d{3}", , , , "8884012", , , [7]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "NU",
          683,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{4})", "$1 $2", ["8"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        NZ: [
          ,
          [
            ,
            ,
            "[28]\\d{7,9}|[346]\\d{7}|(?:508|[79]\\d)\\d{6,7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [8, 9, 10],
            [7],
          ],
          [
            ,
            ,
            "24099\\d{3}|(?:3[2-79]|[49][2-9]|6[235-9]|7[2-57-9])\\d{6}",
            ,
            ,
            ,
            "32345678",
            ,
            ,
            [8],
            [7],
          ],
          [, , "2[0-28]\\d{8}|2[0-27-9]\\d{7}|21\\d{6}", , , , "211234567"],
          [, , "508\\d{6,7}|80\\d{6,8}", , , , "800123456"],
          [, , "90\\d{6,7}", , , , "900123456", , , [8, 9]],
          [, , , , , , , , , [-1]],
          [, , "70\\d{7}", , , , "701234567", , , [9]],
          [, , , , , , , , , [-1]],
          "NZ",
          64,
          "0(?:0|161)",
          "0",
          ,
          ,
          "0",
          ,
          "00",
          ,
          [
            [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[89]0"], "0$1"],
            [
              ,
              "(\\d)(\\d{3})(\\d{4})",
              "$1-$2 $3",
              ["24|[346]|7[2-57-9]|9[2-9]"],
              "0$1",
            ],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{3,4})",
              "$1 $2 $3",
              ["2(?:10|74)|[59]|80"],
              "0$1",
            ],
            [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["2[028]"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{3,5})",
              "$1 $2 $3",
              ["2(?:[169]|7[0-35-9])|7|86"],
              "0$1",
            ],
          ],
          ,
          [, , "[28]6\\d{6,7}", , , , "26123456", , , [8, 9]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        OM: [
          ,
          [, , "(?:[279]\\d{3}|500)\\d{4}|8007\\d{4,5}", , , , , , , [7, 8, 9]],
          [, , "2[2-6]\\d{6}", , , , "23123456", , , [8]],
          [
            ,
            ,
            "90[1-9]\\d{5}|(?:7[129]|9[1-9])\\d{6}",
            ,
            ,
            ,
            "92123456",
            ,
            ,
            [8],
          ],
          [, , "500\\d{4}|8007\\d{4,5}", , , , "80071234"],
          [, , "900\\d{5}", , , , "90012345", , , [8]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "OM",
          968,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{4,6})", "$1 $2", ["[58]"]],
            [, "(\\d{2})(\\d{6})", "$1 $2", ["2"]],
            [, "(\\d{4})(\\d{4})", "$1 $2", ["[79]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        PA: [
          ,
          [, , "(?:[1-57-9]|6\\d)\\d{6}", , , , , , , [7, 8]],
          [
            ,
            ,
            "(?:1(?:0\\d|1[479]|2[37]|3[0137]|4[17]|5[05]|[68][58]|7[0167]|9[39])|2(?:[0235-79]\\d|1[0-7]|4[013-9]|8[026-9])|3(?:[089]\\d|1[014-7]|2[0-35]|33|4[0-579]|55|6[068]|7[06-8])|4(?:00|3[0-579]|4\\d|7[0-57-9])|5(?:[01]\\d|2[0-7]|[56]0|79)|7(?:0[09]|2[0-26-8]|3[03]|4[04]|5[05-9]|6[05]|7[0-24-9]|8[7-9]|90)|8(?:09|2[89]|3\\d|4[0-24-689]|5[014]|8[02])|9(?:0[5-9]|1[0135-8]|2[036-9]|3[35-79]|40|5[0457-9]|6[05-9]|7[04-9]|8[35-8]|9\\d))\\d{4}",
            ,
            ,
            ,
            "2001234",
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "(?:1[16]1|21[89]|6(?:[02-9]\\d|1[0-6])\\d|8(?:1[01]|7[23]))\\d{4}",
            ,
            ,
            ,
            "61234567",
          ],
          [, , "800\\d{4}", , , , "8001234", , , [7]],
          [
            ,
            ,
            "(?:8(?:22|55|60|7[78]|86)|9(?:00|81))\\d{4}",
            ,
            ,
            ,
            "8601234",
            ,
            ,
            [7],
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "PA",
          507,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1-$2", ["[1-57-9]"]],
            [, "(\\d{4})(\\d{4})", "$1-$2", ["6"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        PE: [
          ,
          [, , "(?:[14-8]|9\\d)\\d{7}", , , , , , , [8, 9], [6, 7]],
          [
            ,
            ,
            "(?:1\\d|4[1-4]|5[1-46]|6[1-7]|7[2-46]|8[2-4])\\d{6}",
            ,
            ,
            ,
            "11234567",
            ,
            ,
            [8],
            [6, 7],
          ],
          [, , "9\\d{8}", , , , "912345678", , , [9]],
          [, , "800\\d{5}", , , , "80012345", , , [8]],
          [, , "805\\d{5}", , , , "80512345", , , [8]],
          [, , "801\\d{5}", , , , "80112345", , , [8]],
          [, , "80[24]\\d{5}", , , , "80212345", , , [8]],
          [, , , , , , , , , [-1]],
          "PE",
          51,
          "19(?:1[124]|77|90)00",
          "0",
          " Anexo ",
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{5})", "$1 $2", ["80"], "(0$1)"],
            [, "(\\d)(\\d{7})", "$1 $2", ["1"], "(0$1)"],
            [, "(\\d{2})(\\d{6})", "$1 $2", ["[4-8]"], "(0$1)"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        PF: [
          ,
          [, , "[48]\\d{7}|4\\d{5}", , , , , , , [6, 8]],
          [, , "4(?:[09][4-689]\\d|4)\\d{4}", , , , "40412345"],
          [, , "8[79]\\d{6}", , , , "87123456", , , [8]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "PF",
          689,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["44"]],
            [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[48]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "44\\d{4}", , , , , , , [6]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        PG: [
          ,
          [
            ,
            ,
            "(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}",
            ,
            ,
            ,
            ,
            ,
            ,
            [7, 8],
          ],
          [
            ,
            ,
            "(?:64[1-9]|7730|85[02-46-9])\\d{4}|(?:3[0-2]|4[257]|5[34]|77[0-24]|9[78])\\d{5}",
            ,
            ,
            ,
            "3123456",
          ],
          [, , "775\\d{5}|(?:7[0-689]|81)\\d{6}", , , , "70123456", , , [8]],
          [, , "180\\d{4}", , , , "1801234", , , [7]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "2(?:0[0-47]|7[568])\\d{4}", , , , "2751234", , , [7]],
          "PG",
          675,
          "00|140[1-3]",
          ,
          ,
          ,
          ,
          ,
          "00",
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1 $2", ["18|[2-69]|85"]],
            [, "(\\d{4})(\\d{4})", "$1 $2", ["[78]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        PH: [
          ,
          [
            ,
            ,
            "(?:1800|8)\\d{7,9}|2\\d{5}(?:\\d{2})?|(?:[3-7]|9\\d)\\d{8}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 8, 9, 10, 11, 12, 13],
            [4, 5, 7],
          ],
          [
            ,
            ,
            "2\\d{5}(?:\\d{2})?|88(?:22\\d\\d|42)\\d{4}|88\\d{7}|(?:3[2-68]|4[2-9]|5[2-6]|6[2-58]|7[24578]|8[2-7])\\d{7}",
            ,
            ,
            ,
            "21234567",
            ,
            ,
            [6, 8, 9, 10],
            [4, 5, 7],
          ],
          [
            ,
            ,
            "(?:81[37]|9(?:0[5-9]|1[024-9]|2[0-35-9]|3[02-9]|4[235-9]|5[056]|6[5-7]|7[3-79]|89|9[4-9]))\\d{7}",
            ,
            ,
            ,
            "9051234567",
            ,
            ,
            [10],
          ],
          [, , "1800\\d{7,9}", , , , "180012345678", , , [11, 12, 13]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "PH",
          63,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{5})", "$1 $2", ["2"], "(0$1)"],
            [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "(0$1)"],
            [
              ,
              "(\\d{4})(\\d{4,6})",
              "$1 $2",
              [
                "3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2",
                "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))",
              ],
              "(0$1)",
            ],
            [
              ,
              "(\\d{5})(\\d{4})",
              "$1 $2",
              ["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"],
              "(0$1)",
            ],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{4})",
              "$1 $2 $3",
              ["[3-7]|8[2-8]"],
              "(0$1)",
            ],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"],
            [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]],
            [, "(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        PK: [
          ,
          [
            ,
            ,
            "122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[025-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [8, 9, 10, 11, 12],
            [5, 6, 7],
          ],
          [
            ,
            ,
            "(?:(?:21|42)[2-9]|58[126])\\d{7}|(?:2[25]|4[0146-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]\\d{6}|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8]))[2-9]\\d{5,6}",
            ,
            ,
            ,
            "2123456789",
            ,
            ,
            [9, 10],
            [5, 6, 7, 8],
          ],
          [
            ,
            ,
            "3(?:[014]\\d|2[0-5]|3[0-7]|55|64)\\d{7}",
            ,
            ,
            ,
            "3012345678",
            ,
            ,
            [10],
          ],
          [, , "800\\d{5}", , , , "80012345", , , [8]],
          [, , "900\\d{5}", , , , "90012345", , , [8]],
          [, , , , , , , , , [-1]],
          [, , "122\\d{6}", , , , "122044444", , , [9]],
          [, , , , , , , , , [-1]],
          "PK",
          92,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["[89]0"], "0$1"],
            [, "(\\d{4})(\\d{5})", "$1 $2", ["1"]],
            [
              ,
              "(\\d{2})(\\d{7,8})",
              "$1 $2",
              ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"],
              "(0$1)",
            ],
            [
              ,
              "(\\d{3})(\\d{6,7})",
              "$1 $2",
              [
                "2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])",
                "9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]",
              ],
              "(0$1)",
            ],
            [, "(\\d{5})(\\d{5})", "$1 $2", ["58"], "(0$1)"],
            [, "(\\d{3})(\\d{7})", "$1 $2", ["3"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{3})(\\d{3})",
              "$1 $2 $3 $4",
              ["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"],
              "(0$1)",
            ],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{3})(\\d{3})",
              "$1 $2 $3 $4",
              ["[24-9]"],
              "(0$1)",
            ],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "(?:2(?:[125]|3[2358]|4[2-4]|9[2-8])|4(?:[0-246-9]|5[3479])|5(?:[1-35-7]|4[2-467])|6(?:0[468]|[1-8])|7(?:[14]|2[236])|8(?:[16]|2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|22|3[27-9]|4[2-6]|6[3569]|9[2-7]))111\\d{6}",
            ,
            ,
            ,
            "21111825888",
            ,
            ,
            [11, 12],
          ],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        PL: [
          ,
          [, , "[1-57-9]\\d{6}(?:\\d{2})?|6\\d{5,8}", , , , , , , [6, 7, 8, 9]],
          [
            ,
            ,
            "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])(?:[02-9]\\d{6}|1(?:[0-8]\\d{5}|9\\d{3}(?:\\d{2})?))",
            ,
            ,
            ,
            "123456789",
            ,
            ,
            [7, 9],
          ],
          [
            ,
            ,
            "(?:45|5[0137]|6[069]|7[2389]|88)\\d{7}",
            ,
            ,
            ,
            "512345678",
            ,
            ,
            [9],
          ],
          [, , "800\\d{6}", , , , "800123456", , , [9]],
          [, , "70[01346-8]\\d{6}", , , , "701234567", , , [9]],
          [, , "801\\d{6}", , , , "801234567", , , [9]],
          [, , , , , , , , , [-1]],
          [, , "39\\d{7}", , , , "391234567", , , [9]],
          "PL",
          48,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{5})", "$1", ["19"]],
            [, "(\\d{3})(\\d{3})", "$1 $2", ["11|64"]],
            [
              ,
              "(\\d{2})(\\d{2})(\\d{3})",
              "$1 $2 $3",
              [
                "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1",
                "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19",
              ],
            ],
            [, "(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["64"]],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{3})",
              "$1 $2 $3",
              ["39|45|5[0137]|6[0469]|7[02389]|8[08]"],
            ],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["1[2-8]|[2-8]|9[145]"],
            ],
          ],
          ,
          [, , "64\\d{4,7}", , , , "641234567"],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "804\\d{6}", , , , "804123456", , , [9]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        PM: [
          ,
          [, , "[45]\\d{5}", , , , , , , [6]],
          [, , "(?:4[1-3]|50)\\d{4}", , , , "430123"],
          [, , "(?:4[02-4]|5[05])\\d{4}", , , , "551234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "PM",
          508,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[45]"], "0$1"]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        PR: [
          ,
          [, , "(?:[589]\\d\\d|787)\\d{7}", , , , , , , [10], [7]],
          [, , "(?:787|939)[2-9]\\d{6}", , , , "7872345678", , , , [7]],
          [, , "(?:787|939)[2-9]\\d{6}", , , , "7872345678", , , , [7]],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"],
          [, , "900[2-9]\\d{6}", , , , "9002345678"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "PR",
          1,
          "011",
          "1",
          ,
          ,
          "1",
          ,
          ,
          1,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "787|939",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        PS: [
          ,
          [, , "[2489]2\\d{6}|(?:1\\d|5)\\d{8}", , , , , , , [8, 9, 10], [7]],
          [
            ,
            ,
            "(?:22[2-47-9]|42[45]|82[01458]|92[369])\\d{5}",
            ,
            ,
            ,
            "22234567",
            ,
            ,
            [8],
            [7],
          ],
          [, , "5[69]\\d{7}", , , , "599123456", , , [9]],
          [, , "1800\\d{6}", , , , "1800123456", , , [10]],
          [, , , , , , , , , [-1]],
          [, , "1700\\d{6}", , , , "1700123456", , , [10]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "PS",
          970,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2489]"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["5"], "0$1"],
            [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        PT: [
          ,
          [, , "(?:[26-9]\\d|30)\\d{7}", , , , , , , [9]],
          [
            ,
            ,
            "2(?:[12]\\d|[35][1-689]|4[1-59]|6[1-35689]|7[1-9]|8[1-69]|9[1256])\\d{6}",
            ,
            ,
            ,
            "212345678",
          ],
          [, , "9(?:[1-36]\\d\\d|480)\\d{5}", , , , "912345678"],
          [, , "80[02]\\d{6}", , , , "800123456"],
          [
            ,
            ,
            "(?:6(?:0[178]|4[68])\\d|76(?:0[1-57]|1[2-47]|2[237]))\\d{5}",
            ,
            ,
            ,
            "760123456",
          ],
          [, , "80(?:8\\d|9[1579])\\d{5}", , , , "808123456"],
          [, , "884[0-4689]\\d{5}", , , , "884123456"],
          [, , "30\\d{7}", , , , "301234567"],
          "PT",
          351,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["2[12]"]],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[236-9]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "70(?:7\\d|8[17])\\d{5}", , , , "707123456"],
          ,
          ,
          [, , "600\\d{6}", , , , "600110000"],
        ],
        PW: [
          ,
          [, , "(?:[25-8]\\d\\d|345|488|900)\\d{4}", , , , , , , [7]],
          [
            ,
            ,
            "(?:2(?:55|77)|345|488|5(?:35|44|87)|6(?:22|54|79)|7(?:33|47)|8(?:24|55|76)|900)\\d{4}",
            ,
            ,
            ,
            "2771234",
          ],
          [, , "(?:6[2-4689]0|77\\d|88[0-4])\\d{4}", , , , "6201234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "PW",
          680,
          "01[12]",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        PY: [
          ,
          [
            ,
            ,
            "59\\d{4,6}|(?:[2-46-9]\\d|5[0-8])\\d{4,7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 7, 8, 9],
            [5],
          ],
          [
            ,
            ,
            "(?:[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36])\\d{5,7}|(?:2(?:2[4-68]|7[15]|9[1-5])|3(?:18|3[167]|4[2357]|51)|4(?:3[12]|5[13]|9[1-47])|5(?:[1-4]\\d|5[02-4])|6(?:3[1-3]|44|7[1-46-8])|7(?:4[0-4]|6[1-578]|75|8[0-8])|858)\\d{5,6}",
            ,
            ,
            ,
            "212345678",
            ,
            ,
            [7, 8, 9],
            [5, 6],
          ],
          [
            ,
            ,
            "9(?:51|6[129]|[78][1-6]|9[1-5])\\d{6}",
            ,
            ,
            ,
            "961456789",
            ,
            ,
            [9],
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "8700[0-4]\\d{4}", , , , "870012345", , , [9]],
          "PY",
          595,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{3,6})", "$1 $2", ["[2-9]0"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{5})",
              "$1 $2",
              ["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],
              "(0$1)",
            ],
            [
              ,
              "(\\d{3})(\\d{4,5})",
              "$1 $2",
              ["2[279]|3[13-5]|4[359]|5|6[347]|7[46-8]|85"],
              "(0$1)",
            ],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{3,4})",
              "$1 $2 $3",
              ["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],
              "(0$1)",
            ],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["87"]],
            [, "(\\d{3})(\\d{6})", "$1 $2", ["9"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "[2-9]0\\d{4,7}", , , , "201234567"],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        QA: [
          ,
          [, , "800\\d{4}|(?:2|[3-7]\\d)\\d{6}", , , , , , , [7, 8]],
          [, , "4[04]\\d{6}", , , , "44123456", , , [8]],
          [, , "[35-7]\\d{7}", , , , "33123456", , , [8]],
          [, , "800\\d{4}", , , , "8001234", , , [7]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "QA",
          974,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1 $2", ["2[126]|8"]],
            [, "(\\d{4})(\\d{4})", "$1 $2", ["[3-7]"]],
          ],
          ,
          [, , "2(?:[12]\\d|61)\\d{4}", , , , "2123456", , , [7]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        RE: [
          ,
          [, , "(?:26|[68]\\d)\\d{7}", , , , , , , [9]],
          [, , "262\\d{6}", , , , "262161234"],
          [
            ,
            ,
            "69(?:2\\d\\d|3(?:0[0-46]|1[013]|2[0-2]|3[0-39]|4\\d|5[05]|6[0-26]|7[0-27]|8[0-38]|9[0-479]))\\d{4}",
            ,
            ,
            ,
            "692123456",
          ],
          [, , "80\\d{7}", , , , "801234567"],
          [, , "89[1-37-9]\\d{6}", , , , "891123456"],
          [, , "8(?:1[019]|2[0156]|84|90)\\d{6}", , , , "810123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "RE",
          262,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[268]"],
              "0$1",
            ],
          ],
          ,
          [, , , , , , , , , [-1]],
          1,
          "262|69|8",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        RO: [
          ,
          [, , "(?:[237]\\d|[89]0)\\d{7}|[23]\\d{5}", , , , , , , [6, 9]],
          [
            ,
            ,
            "[23][13-6]\\d{7}|(?:2(?:19\\d|[3-6]\\d9)|31\\d\\d)\\d\\d",
            ,
            ,
            ,
            "211234567",
          ],
          [
            ,
            ,
            "7120\\d{5}|7(?:[02-7]\\d|1[01]|8[03-8]|99)\\d{6}",
            ,
            ,
            ,
            "712034567",
            ,
            ,
            [9],
          ],
          [, , "800\\d{6}", , , , "800123456", , , [9]],
          [, , "90[036]\\d{6}", , , , "900123456", , , [9]],
          [, , "801\\d{6}", , , , "801123456", , , [9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "RO",
          40,
          "00",
          "0",
          " int ",
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{3})", "$1 $2", ["2[3-6]", "2[3-6]\\d9"], "0$1"],
            [, "(\\d{2})(\\d{4})", "$1 $2", ["219|31"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]1"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[237-9]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "37\\d{7}", , , , "372123456", , , [9]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        RS: [
          ,
          [
            ,
            ,
            "38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 7, 8, 9, 10, 11, 12],
            [4, 5],
          ],
          [
            ,
            ,
            "(?:11[1-9]\\d|(?:2[389]|39)(?:0[2-9]|[2-9]\\d))\\d{3,8}|(?:1[02-9]|2[0-24-7]|3[0-8])[2-9]\\d{4,9}",
            ,
            ,
            ,
            "10234567",
            ,
            ,
            [7, 8, 9, 10, 11, 12],
            [4, 5, 6],
          ],
          [, , "6(?:[0-689]|7\\d)\\d{6,7}", , , , "601234567", , , [8, 9, 10]],
          [, , "800\\d{3,9}", , , , "80012345"],
          [
            ,
            ,
            "(?:78\\d|90[0169])\\d{3,7}",
            ,
            ,
            ,
            "90012345",
            ,
            ,
            [6, 7, 8, 9, 10],
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "RS",
          381,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{3,9})", "$1 $2", ["(?:2[389]|39)0|[7-9]"], "0$1"],
            [, "(\\d{2})(\\d{5,10})", "$1 $2", ["[1-36]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "7[06]\\d{4,10}", , , , "700123456"],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        RU: [
          ,
          [, , "[347-9]\\d{9}", , , , , , , [10], [7]],
          [
            ,
            ,
            "(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15]|6[1-35-79]|7[1-37-9]))\\d{7}",
            ,
            ,
            ,
            "3011234567",
            ,
            ,
            ,
            [7],
          ],
          [, , "9\\d{9}", , , , "9123456789"],
          [, , "80[04]\\d{7}", , , , "8001234567"],
          [, , "80[39]\\d{7}", , , , "8091234567"],
          [, , , , , , , , , [-1]],
          [, , "808\\d{7}", , , , "8081234567"],
          [, , , , , , , , , [-1]],
          "RU",
          7,
          "810",
          "8",
          ,
          ,
          "8",
          ,
          "8~10",
          ,
          [
            [, "(\\d{3})(\\d{2})(\\d{2})", "$1-$2-$3", ["[0-79]"]],
            [
              ,
              "(\\d{4})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              [
                "7(?:1[0-8]|2[1-9])",
                "7(?:1(?:[0-6]2|7|8[27])|2(?:1[23]|[2-9]2))",
                "7(?:1(?:[0-6]2|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2",
              ],
              "8 ($1)",
              ,
              1,
            ],
            [
              ,
              "(\\d{5})(\\d)(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              [
                "7(?:1[0-68]|2[1-9])",
                "7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))",
                "7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]",
              ],
              "8 ($1)",
              ,
              1,
            ],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", , 1],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2-$3-$4",
              ["[3489]"],
              "8 ($1)",
              ,
              1,
            ],
          ],
          [
            [
              ,
              "(\\d{4})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              [
                "7(?:1[0-8]|2[1-9])",
                "7(?:1(?:[0-6]2|7|8[27])|2(?:1[23]|[2-9]2))",
                "7(?:1(?:[0-6]2|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2",
              ],
              "8 ($1)",
              ,
              1,
            ],
            [
              ,
              "(\\d{5})(\\d)(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              [
                "7(?:1[0-68]|2[1-9])",
                "7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))",
                "7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]",
              ],
              "8 ($1)",
              ,
              1,
            ],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", , 1],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2-$3-$4",
              ["[3489]"],
              "8 ($1)",
              ,
              1,
            ],
          ],
          [, , , , , , , , , [-1]],
          1,
          "3[04-689]|[489]",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        RW: [
          ,
          [, , "(?:06|[27]\\d\\d|[89]00)\\d{6}", , , , , , , [8, 9]],
          [, , "(?:06|2[258]\\d)\\d{6}", , , , "250123456"],
          [, , "7[238]\\d{7}", , , , "720123456", , , [9]],
          [, , "800\\d{6}", , , , "800123456", , , [9]],
          [, , "900\\d{6}", , , , "900123456", , , [9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "RW",
          250,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"]],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SA: [
          ,
          [, , "92\\d{7}|(?:[15]|8\\d)\\d{8}", , , , , , , [9, 10], [7]],
          [
            ,
            ,
            "1(?:1\\d|2[24-8]|3[35-8]|4[3-68]|6[2-5]|7[235-7])\\d{6}",
            ,
            ,
            ,
            "112345678",
            ,
            ,
            [9],
            [7],
          ],
          [, , "5(?:[013-689]\\d|7[0-36-8])\\d{6}", , , , "512345678", , , [9]],
          [, , "800\\d{7}", , , , "8001234567", , , [10]],
          [, , "925\\d{6}", , , , "925012345", , , [9]],
          [, , "920\\d{6}", , , , "920012345", , , [9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "SA",
          966,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{4})(\\d{5})", "$1 $2", ["9"]],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["81"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "811\\d{7}", , , , "8110123456", , , [10]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SB: [
          ,
          [, , "(?:[1-6]|[7-9]\\d\\d)\\d{4}", , , , , , , [5, 7]],
          [
            ,
            ,
            "(?:1[4-79]|[23]\\d|4[0-2]|5[03]|6[0-37])\\d{3}",
            ,
            ,
            ,
            "40123",
            ,
            ,
            [5],
          ],
          [
            ,
            ,
            "48\\d{3}|(?:(?:7[1-9]|8[4-9])\\d|9(?:1[2-9]|2[013-9]|3[0-2]|[46]\\d|5[0-46-9]|7[0-689]|8[0-79]|9[0-8]))\\d{4}",
            ,
            ,
            ,
            "7421234",
          ],
          [, , "1[38]\\d{3}", , , , "18123", , , [5]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "5[12]\\d{3}", , , , "51123", , , [5]],
          "SB",
          677,
          "0[01]",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{5})", "$1 $2", ["7|8[4-9]|9(?:[1-8]|9[0-8])"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SC: [
          ,
          [, , "8000\\d{3}|(?:[249]\\d|64)\\d{5}", , , , , , , [7]],
          [, , "4[2-46]\\d{5}", , , , "4217123"],
          [, , "2[5-8]\\d{5}", , , , "2510123"],
          [, , "8000\\d{3}", , , , "8000000"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "971\\d{4}|(?:64|95)\\d{5}", , , , "6412345"],
          "SC",
          248,
          "010|0[0-2]",
          ,
          ,
          ,
          ,
          ,
          "00",
          ,
          [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[246]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SD: [
          ,
          [, , "[19]\\d{8}", , , , , , , [9]],
          [, , "1(?:5[3-7]|8[35-7])\\d{6}", , , , "153123456"],
          [, , "(?:1[0-2]|9[0-3569])\\d{7}", , , , "911231234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "SD",
          249,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[19]"], "0$1"]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SE: [
          ,
          [
            ,
            ,
            "(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 7, 8, 9, 10, 12],
          ],
          [
            ,
            ,
            "10[1-8]\\d{6}|90[1-9]\\d{4,6}|(?:[12][136]|3[356]|4[0246]|6[03]|8\\d)\\d{5,7}|(?:1(?:2[0-35]|4[0-4]|5[0-25-9]|7[13-6]|[89]\\d)|2(?:2[0-7]|4[0136-8]|5[0138]|7[018]|8[01]|9[0-57])|3(?:0[0-4]|1\\d|2[0-25]|4[056]|7[0-2]|8[0-3]|9[023])|4(?:1[013-8]|3[0135]|5[14-79]|7[0-246-9]|8[0156]|9[0-689])|5(?:0[0-6]|[15][0-5]|2[0-68]|3[0-4]|4\\d|6[03-5]|7[013]|8[0-79]|9[01])|6(?:1[1-3]|2[0-4]|4[02-57]|5[0-37]|6[0-3]|7[0-2]|8[0247]|9[0-356])|9(?:1[0-68]|2\\d|3[02-5]|4[0-3]|5[0-4]|[68][01]|7[0135-8]))\\d{5,6}",
            ,
            ,
            ,
            "8123456",
            ,
            ,
            [7, 8, 9],
          ],
          [, , "7[02369]\\d{7}", , , , "701234567", , , [9]],
          [, , "20\\d{4,7}", , , , "20123456", , , [6, 7, 8, 9]],
          [
            ,
            ,
            "649\\d{6}|9(?:00|39|44)[1-8]\\d{3,6}",
            ,
            ,
            ,
            "9001234567",
            ,
            ,
            [7, 8, 9, 10],
          ],
          [, , "77[0-7]\\d{6}", , , , "771234567", , , [9]],
          [, , "75[1-8]\\d{6}", , , , "751234567", , , [9]],
          [, , , , , , , , , [-1]],
          "SE",
          46,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["20"], "0$1"],
            [, "(\\d{3})(\\d{4})", "$1-$2", ["9(?:00|39|44)"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2})",
              "$1-$2 $3",
              ["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"],
              "0$1",
            ],
            [, "(\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1"],
            [
              ,
              "(\\d{3})(\\d{2,3})(\\d{2})",
              "$1-$2 $3",
              [
                "1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])",
              ],
              "0$1",
            ],
            [
              ,
              "(\\d{3})(\\d{2,3})(\\d{3})",
              "$1-$2 $3",
              ["9(?:00|39|44)"],
              "0$1",
            ],
            [
              ,
              "(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})",
              "$1-$2 $3 $4",
              ["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"],
              "0$1",
            ],
            [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["7"], "0$1"],
            [, "(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1"],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
              "$1-$2 $3 $4",
              [
                "[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])",
              ],
              "0$1",
            ],
            [, "(\\d{3})(\\d{2})(\\d{2})(\\d{3})", "$1-$2 $3 $4", ["9"], "0$1"],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
              "$1-$2 $3 $4 $5",
              ["[26]"],
              "0$1",
            ],
          ],
          [
            [, "(\\d{2})(\\d{2,3})(\\d{2})", "$1 $2 $3", ["20"]],
            [, "(\\d{3})(\\d{4})", "$1 $2", ["9(?:00|39|44)"]],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2})",
              "$1 $2 $3",
              ["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"],
            ],
            [, "(\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]],
            [
              ,
              "(\\d{3})(\\d{2,3})(\\d{2})",
              "$1 $2 $3",
              [
                "1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])",
              ],
            ],
            [, "(\\d{3})(\\d{2,3})(\\d{3})", "$1 $2 $3", ["9(?:00|39|44)"]],
            [
              ,
              "(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"],
            ],
            [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7"]],
            [, "(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["8"]],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              [
                "[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])",
              ],
            ],
            [, "(\\d{3})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["9"]],
            [
              ,
              "(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4 $5",
              ["[26]"],
            ],
          ],
          [, , "74[02-9]\\d{6}", , , , "740123456", , , [9]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "(?:25[245]|67[3-68])\\d{9}", , , , "254123456789", , , [12]],
        ],
        SG: [
          ,
          [
            ,
            ,
            "(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [8, 10, 11],
          ],
          [, , "6[1-9]\\d{6}", , , , "61234567", , , [8]],
          [, , "(?:8[1-8]|9[0-8])\\d{6}", , , , "81234567", , , [8]],
          [, , "(?:18|8)00\\d{7}", , , , "18001234567", , , [10, 11]],
          [, , "1900\\d{7}", , , , "19001234567", , , [11]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "3[12]\\d{6}", , , , "31234567", , , [8]],
          "SG",
          65,
          "0[0-3]\\d",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{4,5})", "$1", ["1[0135-7]|77"]],
            [, "(\\d{4})(\\d{4})", "$1 $2", ["[369]|8[1-8]"]],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]],
            [, "(\\d{4})(\\d{4})(\\d{3})", "$1 $2 $3", ["7"]],
            [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]],
          ],
          [
            [, "(\\d{4})(\\d{4})", "$1 $2", ["[369]|8[1-8]"]],
            [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]],
            [, "(\\d{4})(\\d{4})(\\d{3})", "$1 $2 $3", ["7"]],
            [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "7000\\d{7}", , , , "70001234567", , , [11]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SH: [
          ,
          [, , "(?:[256]\\d|8)\\d{3}", , , , , , , [4, 5]],
          [, , "2(?:[0-57-9]\\d|6[4-9])\\d\\d", , , , "22158"],
          [, , "[56]\\d{4}", , , , "51234", , , [5]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "262\\d\\d", , , , "26212", , , [5]],
          "SH",
          290,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          1,
          "[256]",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SI: [
          ,
          [, , "[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}", , , , , , , [5, 6, 7, 8]],
          [
            ,
            ,
            "(?:[1-357][2-8]|4[24-8])\\d{6}",
            ,
            ,
            ,
            "12345678",
            ,
            ,
            [8],
            [7],
          ],
          [
            ,
            ,
            "6(?:5(?:1\\d|55|[67]0)|9(?:10|[69]\\d))\\d{4}|(?:[37][01]|4[0139]|51|6[48])\\d{6}",
            ,
            ,
            ,
            "31234567",
            ,
            ,
            [8],
          ],
          [, , "80\\d{4,6}", , , , "80123456", , , [6, 7, 8]],
          [, , "89[1-3]\\d{2,5}|90\\d{4,6}", , , , "90123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "(?:59\\d\\d|8(?:1(?:[67]\\d|8[01389])|2(?:0\\d|2[0378]|8[0-2489])|3[389]\\d))\\d{4}",
            ,
            ,
            ,
            "59012345",
            ,
            ,
            [8],
          ],
          "SI",
          386,
          "00|10(?:22|66|88|99)",
          "0",
          ,
          ,
          "0",
          ,
          "00",
          ,
          [
            [, "(\\d{2})(\\d{3,6})", "$1 $2", ["8[09]|9"], "0$1"],
            [, "(\\d{3})(\\d{5})", "$1 $2", ["59|8"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{3})",
              "$1 $2 $3",
              ["[37][01]|4[0139]|51|6"],
              "0$1",
            ],
            [
              ,
              "(\\d)(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[1-57]"],
              "(0$1)",
            ],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SJ: [
          ,
          [, , "0\\d{4}|(?:[4589]\\d|79)\\d{6}", , , , , , , [5, 8]],
          [, , "79\\d{6}", , , , "79123456", , , [8]],
          [, , "(?:4[015-8]|5[89]|9\\d)\\d{6}", , , , "41234567", , , [8]],
          [, , "80[01]\\d{5}", , , , "80012345", , , [8]],
          [, , "82[09]\\d{5}", , , , "82012345", , , [8]],
          [, , "810(?:0[0-6]|[2-8]\\d)\\d{3}", , , , "81021234", , , [8]],
          [, , "880\\d{5}", , , , "88012345", , , [8]],
          [, , "85[0-5]\\d{5}", , , , "85012345", , , [8]],
          "SJ",
          47,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "79",
          [, , , , , , , , , [-1]],
          [, , "8100[7-9]\\d{3}|(?:0|81(?:01|5\\d))\\d{4}", , , , "01234"],
          ,
          ,
          [, , "81[23]\\d{5}", , , , "81212345", , , [8]],
        ],
        SK: [
          ,
          [, , "[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}", , , , , , , [6, 7, 9]],
          [
            ,
            ,
            "(?:2(?:16|[2-9]\\d{3})|[3-5][1-8]\\d{3})\\d{4}|(?:2|[3-5][1-8])1[67]\\d{3}|[3-5][1-8]16\\d\\d",
            ,
            ,
            ,
            "221234567",
          ],
          [
            ,
            ,
            "909[1-9]\\d{5}|9(?:0[1-8]|1[0-24-9]|[45]\\d)\\d{6}",
            ,
            ,
            ,
            "912123456",
            ,
            ,
            [9],
          ],
          [, , "800\\d{6}", , , , "800123456", , , [9]],
          [, , "9(?:00|[78]\\d)\\d{6}", , , , "900123456", , , [9]],
          [, , "8[5-9]\\d{7}", , , , "850123456", , , [9]],
          [, , , , , , , , , [-1]],
          [, , "6(?:02|5[0-4]|9[0-6])\\d{6}", , , , "690123456", , , [9]],
          "SK",
          421,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{2})(\\d{3,4})", "$1 $2 $3", ["21"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{2})(\\d{2,3})",
              "$1 $2 $3",
              ["[3-5][1-8]1", "[3-5][1-8]1[67]"],
              "0$1",
            ],
            [, "(\\d{4})(\\d{3})", "$1 $2", ["909", "9090"], "0$1"],
            [, "(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1/$2 $3 $4", ["2"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
              "$1/$2 $3 $4",
              ["[3-5]"],
              "0$1",
            ],
          ],
          [
            [, "(\\d)(\\d{2})(\\d{3,4})", "$1 $2 $3", ["21"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{2})(\\d{2,3})",
              "$1 $2 $3",
              ["[3-5][1-8]1", "[3-5][1-8]1[67]"],
              "0$1",
            ],
            [, "(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1/$2 $3 $4", ["2"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
              "$1/$2 $3 $4",
              ["[3-5]"],
              "0$1",
            ],
          ],
          [, , "9090\\d{3}", , , , "9090123", , , [7]],
          ,
          ,
          [
            ,
            ,
            "9090\\d{3}|(?:602|8(?:00|[5-9]\\d)|9(?:00|[78]\\d))\\d{6}",
            ,
            ,
            ,
            ,
            ,
            ,
            [7, 9],
          ],
          [, , "96\\d{7}", , , , "961234567", , , [9]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SL: [
          ,
          [, , "(?:[2-578]\\d|66|99)\\d{6}", , , , , , , [8], [6]],
          [, , "[235]2[2-4][2-9]\\d{4}", , , , "22221234", , , , [6]],
          [
            ,
            ,
            "(?:2[15]|3[013-5]|4[04]|5[05]|66|7[5-9]|8[08]|99)\\d{6}",
            ,
            ,
            ,
            "25123456",
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "SL",
          232,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{6})", "$1 $2", ["[2-9]"], "(0$1)"]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SM: [
          ,
          [, , "(?:0549|[5-7]\\d)\\d{6}", , , , , , , [8, 10], [6]],
          [
            ,
            ,
            "0549(?:8[0157-9]|9\\d)\\d{4}",
            ,
            ,
            ,
            "0549886377",
            ,
            ,
            [10],
            [6],
          ],
          [, , "6[16]\\d{6}", , , , "66661212", , , [8]],
          [, , , , , , , , , [-1]],
          [, , "7[178]\\d{6}", , , , "71123456", , , [8]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "5[158]\\d{6}", , , , "58001110", , , [8]],
          "SM",
          378,
          "00",
          ,
          ,
          ,
          "([89]\\d{5})$",
          "0549$1",
          ,
          ,
          [
            [, "(\\d{6})", "$1", ["[89]"]],
            [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]],
            [, "(\\d{4})(\\d{6})", "$1 $2", ["0"]],
          ],
          [
            [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]],
            [, "(\\d{4})(\\d{6})", "$1 $2", ["0"]],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SN: [
          ,
          [, , "(?:[378]\\d{4}|93330)\\d{4}", , , , , , , [9]],
          [
            ,
            ,
            "3(?:0(?:1[0-2]|80)|282|3(?:8[1-9]|9[3-9])|611)\\d{5}",
            ,
            ,
            ,
            "301012345",
          ],
          [, , "7(?:[06-8]\\d|21|90)\\d{6}", , , , "701234567"],
          [, , "800\\d{6}", , , , "800123456"],
          [, , "88[4689]\\d{6}", , , , "884123456"],
          [, , "81[02468]\\d{6}", , , , "810123456"],
          [, , , , , , , , , [-1]],
          [, , "93330\\d{4}|3(?:392|9[01]\\d)\\d{5}", , , , "933301234"],
          "SN",
          221,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]],
            [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[379]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SO: [
          ,
          [
            ,
            ,
            "[346-9]\\d{8}|[12679]\\d{7}|(?:[1-4]\\d|59)\\d{5}|[1348]\\d{5}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 7, 8, 9],
          ],
          [
            ,
            ,
            "(?:1\\d|2[0-79]|3[0-46-8]|4[0-7]|59)\\d{5}|(?:[134]\\d|8[125])\\d{4}",
            ,
            ,
            ,
            "4012345",
            ,
            ,
            [6, 7],
          ],
          [
            ,
            ,
            "28\\d{5}|(?:6[1-9]|79)\\d{6,7}|(?:15|24|(?:3[59]|4[89]|8[08])\\d|60|7[1-8]|9(?:0[67]|[2-9]))\\d{6}",
            ,
            ,
            ,
            "71123456",
            ,
            ,
            [7, 8, 9],
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "SO",
          252,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{4})", "$1 $2", ["8[125]"]],
            [, "(\\d{6})", "$1", ["[134]"]],
            [, "(\\d)(\\d{6})", "$1 $2", ["1|2[0-79]|3[0-46-8]|4[0-7]|59"]],
            [, "(\\d)(\\d{7})", "$1 $2", ["24|[67]"]],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[348]|64|79[0-8]|90"]],
            [, "(\\d{2})(\\d{5,7})", "$1 $2", ["1|28|6[1-35-9]|799|9[2-9]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SR: [
          ,
          [, , "(?:[2-5]|68|[78]\\d)\\d{5}", , , , , , , [6, 7]],
          [, , "(?:2[1-3]|3[0-7]|(?:4|68)\\d|5[2-58])\\d{4}", , , , "211234"],
          [, , "(?:7[124-7]|8[125-9])\\d{5}", , , , "7412345", , , [7]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "56\\d{4}", , , , "561234", , , [6]],
          "SR",
          597,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3", ["56"]],
            [, "(\\d{3})(\\d{3})", "$1-$2", ["[2-5]"]],
            [, "(\\d{3})(\\d{4})", "$1-$2", ["[6-8]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SS: [
          ,
          [, , "[19]\\d{8}", , , , , , , [9]],
          [, , "18\\d{7}", , , , "181234567"],
          [, , "(?:12|9[1257])\\d{7}", , , , "977123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "SS",
          211,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[19]"], "0$1"]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        ST: [
          ,
          [, , "(?:22|9\\d)\\d{5}", , , , , , , [7]],
          [, , "22\\d{5}", , , , "2221234"],
          [, , "900[5-9]\\d{3}|9(?:0[1-9]|[89]\\d)\\d{4}", , , , "9812345"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "ST",
          239,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{4})", "$1 $2", ["[29]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SV: [
          ,
          [, , "[267]\\d{7}|[89]00\\d{4}(?:\\d{4})?", , , , , , , [7, 8, 11]],
          [, , "2[1-6]\\d{6}", , , , "21234567", , , [8]],
          [, , "[67]\\d{7}", , , , "70123456", , , [8]],
          [, , "800\\d{4}(?:\\d{4})?", , , , "8001234", , , [7, 11]],
          [, , "900\\d{4}(?:\\d{4})?", , , , "9001234", , , [7, 11]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "SV",
          503,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1 $2", ["[89]"]],
            [, "(\\d{4})(\\d{4})", "$1 $2", ["[267]"]],
            [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[89]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SX: [
          ,
          [, , "7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "7215(?:4[2-8]|8[239]|9[056])\\d{4}",
            ,
            ,
            ,
            "7215425678",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}",
            ,
            ,
            ,
            "7215205678",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
          [, , "900[2-9]\\d{6}", , , , "9002123456"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "SX",
          1,
          "011",
          "1",
          ,
          ,
          "1|(5\\d{6})$",
          "721$1",
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "721",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SY: [
          ,
          [, , "[1-39]\\d{8}|[1-5]\\d{7}", , , , , , , [8, 9], [6, 7]],
          [
            ,
            ,
            "[12]1\\d{6,7}|(?:1(?:[2356]|4\\d)|2[235]|3(?:[13]\\d|4)|4[13]|5[1-3])\\d{6}",
            ,
            ,
            ,
            "112345678",
            ,
            ,
            ,
            [6, 7],
          ],
          [, , "9(?:22|[3-589]\\d|6[024-9])\\d{6}", , , , "944567890", , , [9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "SY",
          963,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-5]"], "0$1", , 1],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1", , 1],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        SZ: [
          ,
          [, , "0800\\d{4}|(?:[237]\\d|900)\\d{6}", , , , , , , [8, 9]],
          [, , "[23][2-5]\\d{6}", , , , "22171234", , , [8]],
          [, , "7[6-9]\\d{6}", , , , "76123456", , , [8]],
          [, , "0800\\d{4}", , , , "08001234", , , [8]],
          [, , "900\\d{6}", , , , "900012345", , , [9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "70\\d{6}", , , , "70012345", , , [8]],
          "SZ",
          268,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{4})(\\d{4})", "$1 $2", ["[0237]"]],
            [, "(\\d{5})(\\d{4})", "$1 $2", ["9"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "0800\\d{4}", , , , , , , [8]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        TA: [
          ,
          [, , "8\\d{3}", , , , , , , [4]],
          [, , "8\\d{3}", , , , "8999"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "TA",
          290,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "8",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        TC: [
          ,
          [, , "(?:[58]\\d\\d|649|900)\\d{7}", , , , , , , [10], [7]],
          [, , "649(?:712|9(?:4\\d|50))\\d{4}", , , , "6497121234", , , , [7]],
          [
            ,
            ,
            "649(?:2(?:3[129]|4[1-7])|3(?:3[1-389]|4[1-8])|4[34][1-3])\\d{4}",
            ,
            ,
            ,
            "6492311234",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"],
          [, , "900[2-9]\\d{6}", , , , "9002345678"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , "64971[01]\\d{4}", , , , "6497101234", , , , [7]],
          "TC",
          1,
          "011",
          "1",
          ,
          ,
          "1|([2-479]\\d{6})$",
          "649$1",
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "649",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        TD: [
          ,
          [, , "(?:22|[69]\\d|77)\\d{6}", , , , , , , [8]],
          [, , "22(?:[37-9]0|5[0-5]|6[89])\\d{4}", , , , "22501234"],
          [, , "(?:6[023568]|77|9\\d)\\d{6}", , , , "63012345"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "TD",
          235,
          "00|16",
          ,
          ,
          ,
          ,
          ,
          "00",
          ,
          [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2679]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        TG: [
          ,
          [, , "[279]\\d{7}", , , , , , , [8]],
          [, , "2(?:2[2-7]|3[23]|4[45]|55|6[67]|77)\\d{5}", , , , "22212345"],
          [, , "(?:7[09]|9[0-36-9])\\d{6}", , , , "90112345"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "TG",
          228,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[279]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        TH: [
          ,
          [, , "1\\d{8,9}|(?:[2-57]|[689]\\d)\\d{7}", , , , , , , [8, 9, 10]],
          [
            ,
            ,
            "(?:2\\d|3[2-9]|4[2-5]|5[2-6]|7[3-7])\\d{6}",
            ,
            ,
            ,
            "21234567",
            ,
            ,
            [8],
          ],
          [, , "(?:14|6[1-6]|[89]\\d)\\d{7}", , , , "812345678", , , [9]],
          [, , "1800\\d{6}", , , , "1800123456", , , [10]],
          [, , "1900\\d{6}", , , , "1900123456", , , [10]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "6[08]\\d{7}", , , , "601234567", , , [9]],
          "TH",
          66,
          "00[1-9]",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["14|[3-9]"], "0$1"],
            [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        TJ: [
          ,
          [, , "(?:[3-59]\\d|77|88)\\d{7}", , , , , , , [9], [3, 5, 6, 7]],
          [
            ,
            ,
            "(?:3(?:1[3-5]|2[245]|3[12]|4[24-7]|5[25]|72)|4(?:46|74|87))\\d{6}",
            ,
            ,
            ,
            "372123456",
            ,
            ,
            ,
            [3, 5, 6, 7],
          ],
          [
            ,
            ,
            "41[18]\\d{6}|(?:5[05]|77|88|9[0-35-9])\\d{7}",
            ,
            ,
            ,
            "917123456",
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "TJ",
          992,
          "810",
          "8",
          ,
          ,
          "8",
          ,
          "8~10",
          ,
          [
            [, "(\\d{6})(\\d)(\\d{2})", "$1 $2 $3", ["331", "3317"], , , 1],
            [, "(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[34]7|91[78]"], , , 1],
            [, "(\\d{4})(\\d)(\\d{4})", "$1 $2 $3", ["3"], , , 1],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[457-9]"], , , 1],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        TK: [
          ,
          [, , "[2-47]\\d{3,6}", , , , , , , [4, 5, 6, 7]],
          [, , "(?:2[2-4]|[34]\\d)\\d{2,5}", , , , "3101"],
          [, , "7[2-4]\\d{2,5}", , , , "7290"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "TK",
          690,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        TL: [
          ,
          [, , "7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}", , , , , , , [7, 8]],
          [, , "(?:2[1-5]|3[1-9]|4[1-4])\\d{5}", , , , "2112345", , , [7]],
          [, , "7[3-8]\\d{6}", , , , "77212345", , , [8]],
          [, , "80\\d{5}", , , , "8012345", , , [7]],
          [, , "90\\d{5}", , , , "9012345", , , [7]],
          [, , , , , , , , , [-1]],
          [, , "70\\d{5}", , , , "7012345", , , [7]],
          [, , , , , , , , , [-1]],
          "TL",
          670,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1 $2", ["[2-489]|70"]],
            [, "(\\d{4})(\\d{4})", "$1 $2", ["7"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        TM: [
          ,
          [, , "[1-6]\\d{7}", , , , , , , [8]],
          [
            ,
            ,
            "(?:1(?:2\\d|3[1-9])|2(?:22|4[0-35-8])|3(?:22|4[03-9])|4(?:22|3[128]|4\\d|6[15])|5(?:22|5[7-9]|6[014-689]))\\d{5}",
            ,
            ,
            ,
            "12345678",
          ],
          [, , "6[1-9]\\d{6}", , , , "66123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "TM",
          993,
          "810",
          "8",
          ,
          ,
          "8",
          ,
          "8~10",
          ,
          [
            [
              ,
              "(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
              "$1 $2-$3-$4",
              ["12"],
              "(8 $1)",
            ],
            [
              ,
              "(\\d{3})(\\d)(\\d{2})(\\d{2})",
              "$1 $2-$3-$4",
              ["[1-5]"],
              "(8 $1)",
            ],
            [, "(\\d{2})(\\d{6})", "$1 $2", ["6"], "8 $1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        TN: [
          ,
          [, , "[2-57-9]\\d{7}", , , , , , , [8]],
          [, , "81200\\d{3}|(?:3[0-2]|7\\d)\\d{6}", , , , "30010123"],
          [
            ,
            ,
            "3(?:001|[12]40)\\d{4}|(?:(?:[259]\\d|4[0-6])\\d|3(?:1[1-35]|6[0-4]|91))\\d{5}",
            ,
            ,
            ,
            "20123456",
          ],
          [, , "8010\\d{4}", , , , "80101234"],
          [, , "88\\d{6}", , , , "88123456"],
          [, , "8[12]10\\d{4}", , , , "81101234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "TN",
          216,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-57-9]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        TO: [
          ,
          [
            ,
            ,
            "[78]\\d{6}|[2-478]\\d{4}|(?:080|[56])0\\d{3}",
            ,
            ,
            ,
            ,
            ,
            ,
            [5, 7],
          ],
          [
            ,
            ,
            "(?:2\\d|3[1-8]|4[1-4]|[56]0|7[0149]|8[05])\\d{3}",
            ,
            ,
            ,
            "20123",
            ,
            ,
            [5],
          ],
          [, , "(?:7[578]|8[46-9])\\d{5}", , , , "7715123", , , [7]],
          [, , "0800\\d{3}", , , , "0800222", , , [7]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "TO",
          676,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{3})", "$1-$2", ["[2-6]|7[014]|8[05]"]],
            [, "(\\d{4})(\\d{3})", "$1 $2", ["0"]],
            [, "(\\d{3})(\\d{4})", "$1 $2", ["7[578]|8"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        TR: [
          ,
          [, , "(?:[2-58]\\d\\d|900)\\d{7}|4\\d{6}", , , , , , , [7, 10]],
          [
            ,
            ,
            "(?:2(?:[13][26]|[28][2468]|[45][268]|[67][246])|3(?:[13][28]|[24-6][2468]|[78][02468]|92)|4(?:[16][246]|[23578][2468]|4[26]))\\d{7}",
            ,
            ,
            ,
            "2123456789",
            ,
            ,
            [10],
          ],
          [
            ,
            ,
            "56161\\d{5}|5(?:0[15-7]|1[06]|24|[34]\\d|5[1-59]|9[46])\\d{7}",
            ,
            ,
            ,
            "5012345678",
            ,
            ,
            [10],
          ],
          [, , "800\\d{7}", , , , "8001234567", , , [10]],
          [, , "(?:8[89]8|900)\\d{7}", , , , "9001234567", , , [10]],
          [, , , , , , , , , [-1]],
          [, , "592(?:21[12]|461)\\d{4}", , , , "5922121234", , , [10]],
          [, , , , , , , , , [-1]],
          "TR",
          90,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d)(\\d{3})", "$1 $2 $3", ["444"], , , 1],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{4})",
              "$1 $2 $3",
              ["512|8[0589]|90"],
              "0$1",
              ,
              1,
            ],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["5(?:[0-59]|61)", "5(?:[0-59]|616)", "5(?:[0-59]|6161)"],
              "0$1",
              ,
              1,
            ],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[24][1-8]|3[1-9]"],
              "(0$1)",
              ,
              1,
            ],
          ],
          [
            [
              ,
              "(\\d{3})(\\d{3})(\\d{4})",
              "$1 $2 $3",
              ["512|8[0589]|90"],
              "0$1",
              ,
              1,
            ],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["5(?:[0-59]|61)", "5(?:[0-59]|616)", "5(?:[0-59]|6161)"],
              "0$1",
              ,
              1,
            ],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[24][1-8]|3[1-9]"],
              "(0$1)",
              ,
              1,
            ],
          ],
          [, , "512\\d{7}", , , , "5123456789", , , [10]],
          ,
          ,
          [, , "444\\d{4}", , , , , , , [7]],
          [, , "(?:444|850\\d{3})\\d{4}", , , , "4441444"],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        TT: [
          ,
          [, , "(?:[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "868(?:2(?:01|1[89]|[23]\\d)|6(?:0[7-9]|1[02-8]|2[1-9]|[3-69]\\d|7[0-79])|82[124])\\d{4}",
            ,
            ,
            ,
            "8682211234",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "868(?:2(?:6[6-9]|[7-9]\\d)|[37](?:0[1-9]|1[02-9]|[2-9]\\d)|4[6-9]\\d|6(?:20|78|8\\d))\\d{4}",
            ,
            ,
            ,
            "8682911234",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"],
          [, , "900[2-9]\\d{6}", , , , "9002345678"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "TT",
          1,
          "011",
          "1",
          ,
          ,
          "1|([2-46-8]\\d{6})$",
          "868$1",
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "868",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "868619\\d{4}", , , , "8686191234", , , , [7]],
        ],
        TV: [
          ,
          [, , "(?:2|7\\d\\d|90)\\d{4}", , , , , , , [5, 6, 7]],
          [, , "2[02-9]\\d{3}", , , , "20123", , , [5]],
          [, , "(?:7[01]\\d|90)\\d{4}", , , , "901234", , , [6, 7]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "TV",
          688,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        TW: [
          ,
          [
            ,
            ,
            "(?:[24589]|7\\d)\\d{8}|[2-8]\\d{7}|2\\d{6}",
            ,
            ,
            ,
            ,
            ,
            ,
            [7, 8, 9, 10],
          ],
          [
            ,
            ,
            "24\\d{6,7}|82(?:3\\d|66)\\d{4}|(?:2[235-8]\\d|3[2-9]|4(?:[239]\\d|[78])|5[2-8]|6[235-79]|7[1-9]|8[7-9])\\d{6}",
            ,
            ,
            ,
            "221234567",
            ,
            ,
            [8, 9],
          ],
          [, , "9[0-8]\\d{7}", , , , "912345678", , , [9]],
          [, , "80[0-79]\\d{6}", , , , "800123456", , , [9]],
          [, , "20(?:[013-9]\\d\\d|2)\\d{4}", , , , "203123456", , , [7, 9]],
          [, , , , , , , , , [-1]],
          [, , "99\\d{7}", , , , "990123456", , , [9]],
          [, , "70\\d{8}", , , , "7012345678", , , [10]],
          "TW",
          886,
          "0(?:0[25-79]|19)",
          "0",
          "#",
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d)(\\d{4})", "$1 $2 $3", ["202"], "0$1"],
            [
              ,
              "(\\d)(\\d{3,4})(\\d{4})",
              "$1 $2 $3",
              ["[25][2-8]|[346]|7[1-9]|8[27-9]"],
              "0$1",
            ],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[258]"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"],
            [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "50[0-46-9]\\d{6}", , , , "500123456", , , [9]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        TZ: [
          ,
          [, , "(?:[26-8]\\d|41|90)\\d{7}", , , , , , , [9]],
          [, , "2[2-8]\\d{7}", , , , "222345678"],
          [, , "(?:6[2-9]|7[13-9])\\d{7}", , , , "621234567"],
          [, , "80[08]\\d{6}", , , , "800123456"],
          [, , "90\\d{7}", , , , "900123456"],
          [, , "8(?:40|6[01])\\d{6}", , , , "840123456"],
          [, , , , , , , , , [-1]],
          [, , "41\\d{7}", , , , "412345678"],
          "TZ",
          255,
          "00[056]",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[24]"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[67]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "(?:8(?:[04]0|6[01])|90\\d)\\d{6}"],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        UA: [
          ,
          [, , "[3-9]\\d{8}", , , , , , , [9], [5, 6, 7]],
          [
            ,
            ,
            "(?:3[1-8]|4[13-8]|5[1-7]|6[12459])\\d{7}",
            ,
            ,
            ,
            "311234567",
            ,
            ,
            ,
            [5, 6, 7],
          ],
          [, , "(?:39|50|6[36-8]|7[1-3]|9[1-9])\\d{7}", , , , "391234567"],
          [, , "800\\d{6}", , , , "800123456"],
          [, , "900[2-49]\\d{5}", , , , "900212345"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "89[1-579]\\d{6}", , , , "891234567"],
          "UA",
          380,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          "0~0",
          ,
          [
            [
              ,
              "(\\d{3})(\\d{3})(\\d{3})",
              "$1 $2 $3",
              [
                "6[12][29]|[89]0|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]",
                "6[12][29]|[89]0|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]",
              ],
              "0$1",
            ],
            [
              ,
              "(\\d{4})(\\d{5})",
              "$1 $2",
              [
                "3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6[0135689]|7[4-6])|6(?:[12][3-7]|[459])",
                "3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][3-7]|[459])",
              ],
              "0$1",
            ],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-9]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        UG: [
          ,
          [
            ,
            ,
            "800\\d{6}|(?:[29]0|[347]\\d)\\d{7}",
            ,
            ,
            ,
            ,
            ,
            ,
            [9],
            [5, 6, 7],
          ],
          [
            ,
            ,
            "20(?:(?:240|30[0-4])\\d|6(?:00[0-2]|30[0-4]))\\d{3}|(?:20(?:[0147]\\d|[26][5-9]|3[2367]|5[0-4]|8[0-2])|[34]\\d{3})\\d{5}",
            ,
            ,
            ,
            "312345678",
            ,
            ,
            ,
            [5, 6, 7],
          ],
          [
            ,
            ,
            "7260\\d{5}|7(?:[0157-9]\\d|2[03]|30|4[0-4])\\d{6}",
            ,
            ,
            ,
            "712345678",
          ],
          [, , "800[1-3]\\d{5}", , , , "800123456"],
          [, , "90[1-3]\\d{6}", , , , "901123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "UG",
          256,
          "00[057]",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{4})(\\d{5})", "$1 $2", ["202", "2024"], "0$1"],
            [, "(\\d{3})(\\d{6})", "$1 $2", ["[27-9]|4(?:6[45]|[7-9])"], "0$1"],
            [, "(\\d{2})(\\d{7})", "$1 $2", ["[34]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        US: [
          ,
          [, , "[2-9]\\d{9}", , , , , , , [10], [7]],
          [
            ,
            ,
            "(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[017]|6[0-279]|78|8[0-2])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-28]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[0179]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}",
            ,
            ,
            ,
            "2015550123",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[017]|6[0-279]|78|8[0-2])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-28]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[0179]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}",
            ,
            ,
            ,
            "2015550123",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"],
          [, , "900[2-9]\\d{6}", , , , "9002345678"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "US",
          1,
          "011",
          "1",
          ,
          ,
          "1",
          ,
          ,
          1,
          [
            [, "(\\d{3})(\\d{4})", "$1-$2", ["[2-9]"]],
            [, "(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3", ["[2-9]"], , , 1],
          ],
          [[, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-9]"]]],
          [, , , , , , , , , [-1]],
          1,
          ,
          [, , , , , , , , , [-1]],
          [, , "710[2-9]\\d{6}", , , , "7102123456"],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        UY: [
          ,
          [, , "(?:[249]\\d\\d|80)\\d{5}|9\\d{6}", , , , , , , [7, 8]],
          [, , "(?:2\\d|4[2-7])\\d{6}", , , , "21231234", , , [8], [7]],
          [, , "9[1-9]\\d{6}", , , , "94231234", , , [8]],
          [, , "80[05]\\d{4}", , , , "8001234", , , [7]],
          [, , "90[0-8]\\d{4}", , , , "9001234", , , [7]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "UY",
          598,
          "0(?:0|1[3-9]\\d)",
          "0",
          " int. ",
          ,
          "0",
          ,
          "00",
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1 $2", ["8|90"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"],
            [, "(\\d{4})(\\d{4})", "$1 $2", ["[24]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        UZ: [
          ,
          [, , "[679]\\d{8}", , , , , , , [9]],
          [
            ,
            ,
            "(?:6(?:1(?:22|3[124]|4[1-4]|5[1-3578]|64)|2(?:22|3[0-57-9]|41)|5(?:22|3[3-7]|5[024-8])|6\\d\\d|7(?:[23]\\d|7[69])|9(?:22|4[1-8]|6[135]))|7(?:0(?:5[4-9]|6[0146]|7[124-6]|9[135-8])|1[12]\\d|2(?:22|3[13-57-9]|4[1-3579]|5[14])|3(?:2\\d|3[1578]|4[1-35-7]|5[1-57]|61)|4(?:2\\d|3[1-579]|7[1-79])|5(?:22|5[1-9]|6[1457])|6(?:22|3[12457]|4[13-8])|9(?:22|5[1-9])))\\d{5}",
            ,
            ,
            ,
            "669050123",
          ],
          [
            ,
            ,
            "(?:6(?:1(?:2(?:2[01]|98)|35[0-4]|50\\d|61[23]|7(?:[01][017]|4\\d|55|9[5-9]))|2(?:(?:11|7\\d)\\d|2(?:[12]1|9[01379])|5(?:[126]\\d|3[0-4]))|5(?:19[01]|2(?:27|9[26])|(?:30|59|7\\d)\\d)|6(?:2(?:1[5-9]|2[0367]|38|41|52|60)|(?:3[79]|9[0-3])\\d|4(?:56|83)|7(?:[07]\\d|1[017]|3[07]|4[047]|5[057]|67|8[0178]|9[79]))|7(?:2(?:24|3[237]|4[5-9]|7[15-8])|5(?:7[12]|8[0589])|7(?:0\\d|[39][07])|9(?:0\\d|7[079]))|9(?:2(?:1[1267]|3[01]|5\\d|7[0-4])|(?:5[67]|7\\d)\\d|6(?:2[0-26]|8\\d)))|7(?:0\\d{3}|1(?:13[01]|6(?:0[47]|1[67]|66)|71[3-69]|98\\d)|2(?:2(?:2[79]|95)|3(?:2[5-9]|6[0-6])|57\\d|7(?:0\\d|1[17]|2[27]|3[37]|44|5[057]|66|88))|3(?:2(?:1[0-6]|21|3[469]|7[159])|(?:33|9[4-6])\\d|5(?:0[0-4]|5[579]|9\\d)|7(?:[0-3579]\\d|4[0467]|6[67]|8[078]))|4(?:2(?:29|5[0257]|6[0-7]|7[1-57])|5(?:1[0-4]|8\\d|9[5-9])|7(?:0\\d|1[024589]|2[0-27]|3[0137]|[46][07]|5[01]|7[5-9]|9[079])|9(?:7[015-9]|[89]\\d))|5(?:112|2(?:0\\d|2[29]|[49]4)|3[1568]\\d|52[6-9]|7(?:0[01578]|1[017]|[23]7|4[047]|[5-7]\\d|8[78]|9[079]))|6(?:2(?:2[1245]|4[2-4])|39\\d|41[179]|5(?:[349]\\d|5[0-2])|7(?:0[017]|[13]\\d|22|44|55|67|88))|9(?:22[128]|3(?:2[0-4]|7\\d)|57[02569]|7(?:2[05-9]|3[37]|4\\d|60|7[2579]|87|9[07])))|9[0-57-9]\\d{3})\\d{4}",
            ,
            ,
            ,
            "912345678",
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "UZ",
          998,
          "810",
          "8",
          ,
          ,
          "8",
          ,
          "8~10",
          ,
          [
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[679]"],
              "8 $1",
            ],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        VA: [
          ,
          [
            ,
            ,
            "0\\d{6,10}|55\\d{8}|[08]\\d{5}|(?:3[0-8]|8)\\d{7,9}|(?:1\\d|39)\\d{7,8}",
            ,
            ,
            ,
            ,
            ,
            ,
            [6, 7, 8, 9, 10, 11],
          ],
          [, , "06698\\d{1,6}", , , , "0669812345"],
          [
            ,
            ,
            "33\\d{9}|3[1-9]\\d{8}|3[2-9]\\d{7}",
            ,
            ,
            ,
            "3123456789",
            ,
            ,
            [9, 10, 11],
          ],
          [, , "80(?:0\\d{3}|3)\\d{3}", , , , "800123456", , , [6, 9]],
          [
            ,
            ,
            "(?:0878\\d\\d|89(?:2|4[5-9]\\d))\\d{3}|89[45][0-4]\\d\\d|(?:1(?:44|6[346])|89(?:5[5-9]|9))\\d{6}",
            ,
            ,
            ,
            "899123456",
            ,
            ,
            [6, 8, 9, 10],
          ],
          [, , "84(?:[08]\\d{3}|[17])\\d{3}", , , , "848123456", , , [6, 9]],
          [, , "1(?:78\\d|99)\\d{6}", , , , "1781234567", , , [9, 10]],
          [, , "55\\d{8}", , , , "5512345678", , , [10]],
          "VA",
          39,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "06698",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        VC: [
          ,
          [, , "(?:[58]\\d\\d|784|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "784(?:266|3(?:6[6-9]|7\\d|8[0-24-6])|4(?:38|5[0-36-8]|8[0-8])|5(?:55|7[0-2]|93)|638|784)\\d{4}",
            ,
            ,
            ,
            "7842661234",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "784(?:4(?:3[0-5]|5[45]|89|9[0-8])|5(?:2[6-9]|3[0-4]))\\d{4}",
            ,
            ,
            ,
            "7844301234",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"],
          [, , "900[2-9]\\d{6}", , , , "9002345678"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "VC",
          1,
          "011",
          "1",
          ,
          ,
          "1|([2-7]\\d{6})$",
          "784$1",
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "784",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        VE: [
          ,
          [, , "[89]00\\d{7}|(?:[24]\\d|50)\\d{8}", , , , , , , [10], [7]],
          [
            ,
            ,
            "(?:2(?:12|3[457-9]|[467]\\d|[58][1-9]|9[1-6])|50[01])\\d{7}",
            ,
            ,
            ,
            "2121234567",
            ,
            ,
            ,
            [7],
          ],
          [, , "4(?:1[24-8]|2[46])\\d{7}", , , , "4121234567"],
          [, , "800\\d{7}", , , , "8001234567"],
          [, , "900\\d{7}", , , , "9001234567"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "VE",
          58,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{7})", "$1-$2", ["[24589]"], "0$1", "$CC $1"]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        VG: [
          ,
          [, , "(?:284|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "284496[0-5]\\d{3}|284(?:229|4(?:22|9[45])|774|8(?:52|6[459]))\\d{4}",
            ,
            ,
            ,
            "2842291234",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "284496[6-9]\\d{3}|284(?:3(?:0[0-3]|4[0-7]|68|9[34])|4(?:4[0-6]|68|99)|54[0-57])\\d{4}",
            ,
            ,
            ,
            "2843001234",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"],
          [, , "900[2-9]\\d{6}", , , , "9002345678"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "VG",
          1,
          "011",
          "1",
          ,
          ,
          "1|([2-578]\\d{6})$",
          "284$1",
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "284",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        VI: [
          ,
          [, , "[58]\\d{9}|(?:34|90)0\\d{7}", , , , , , , [10], [7]],
          [
            ,
            ,
            "340(?:2(?:01|2[06-8]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-57-9]|27|7\\d)|884|998)\\d{4}",
            ,
            ,
            ,
            "3406421234",
            ,
            ,
            ,
            [7],
          ],
          [
            ,
            ,
            "340(?:2(?:01|2[06-8]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-57-9]|27|7\\d)|884|998)\\d{4}",
            ,
            ,
            ,
            "3406421234",
            ,
            ,
            ,
            [7],
          ],
          [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"],
          [, , "900[2-9]\\d{6}", , , , "9002345678"],
          [, , , , , , , , , [-1]],
          [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
          [, , , , , , , , , [-1]],
          "VI",
          1,
          "011",
          "1",
          ,
          ,
          "1|([2-9]\\d{6})$",
          "340$1",
          ,
          1,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "340",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        VN: [
          ,
          [
            ,
            ,
            "[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}",
            ,
            ,
            ,
            ,
            ,
            ,
            [7, 8, 9, 10],
          ],
          [
            ,
            ,
            "2(?:0[3-9]|1[0-689]|2[0-25-9]|3[2-9]|4[2-8]|5[124-9]|6[0-39]|7[0-7]|8[2-7]|9[0-4679])\\d{7}",
            ,
            ,
            ,
            "2101234567",
            ,
            ,
            [10],
          ],
          [
            ,
            ,
            "(?:(?:3\\d|7[06-9])\\d|5(?:2[238]|[689]\\d)|8(?:[1-58]\\d|6[5-9]|79|9[689])|9(?:[0-8]\\d|9[013-9]))\\d{6}",
            ,
            ,
            ,
            "912345678",
            ,
            ,
            [9],
          ],
          [, , "1800\\d{4,6}", , , , "1800123456", , , [8, 9, 10]],
          [, , "1900\\d{4,6}", , , , "1900123456", , , [8, 9, 10]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "672\\d{6}", , , , "672012345", , , [9]],
          "VN",
          84,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{4})", "$1 $2", ["[17]99"], "0$1", , 1],
            [, "(\\d{2})(\\d{5})", "$1 $2", ["80"], "0$1", , 1],
            [, "(\\d{3})(\\d{4,5})", "$1 $2", ["69"], "0$1", , 1],
            [, "(\\d{4})(\\d{4,6})", "$1 $2", ["1"], , , 1],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[69]"],
              "0$1",
              ,
              1,
            ],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[3578]"], "0$1", , 1],
            [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2[48]"], "0$1", , 1],
            [, "(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["2"], "0$1", , 1],
          ],
          [
            [, "(\\d{2})(\\d{5})", "$1 $2", ["80"], "0$1", , 1],
            [, "(\\d{4})(\\d{4,6})", "$1 $2", ["1"], , , 1],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
              "$1 $2 $3 $4",
              ["[69]"],
              "0$1",
              ,
              1,
            ],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[3578]"], "0$1", , 1],
            [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2[48]"], "0$1", , 1],
            [, "(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["2"], "0$1", , 1],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "[17]99\\d{4}|69\\d{5,6}", , , , , , , [7, 8]],
          [
            ,
            ,
            "(?:[17]99|80\\d)\\d{4}|69\\d{5,6}",
            ,
            ,
            ,
            "1992000",
            ,
            ,
            [7, 8],
          ],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        VU: [
          ,
          [
            ,
            ,
            "(?:[23]\\d|[48]8)\\d{3}|(?:[57]\\d|90)\\d{5}",
            ,
            ,
            ,
            ,
            ,
            ,
            [5, 7],
          ],
          [
            ,
            ,
            "(?:38[0-8]|48[4-9])\\d\\d|(?:2[02-9]|3[4-7]|88)\\d{3}",
            ,
            ,
            ,
            "22123",
            ,
            ,
            [5],
          ],
          [
            ,
            ,
            "57[2-5]\\d{4}|(?:5[0-689]|7[013-7])\\d{5}",
            ,
            ,
            ,
            "5912345",
            ,
            ,
            [7],
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "90[1-9]\\d{4}", , , , "9010123", , , [7]],
          "VU",
          678,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{4})", "$1 $2", ["[579]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "(?:3[03]|900\\d)\\d{3}", , , , "30123"],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        WF: [
          ,
          [, , "(?:[45]0|68|72|8\\d)\\d{4}", , , , , , , [6]],
          [, , "(?:50|68|72)\\d{4}", , , , "501234"],
          [, , "(?:50|68|72|8[23])\\d{4}", , , , "501234"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "WF",
          681,
          "00",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[4-8]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "[48]0\\d{4}", , , , "401234"],
        ],
        WS: [
          ,
          [
            ,
            ,
            "[2-6]\\d{4}|8\\d{5}(?:\\d{4})?|[78]\\d{6}",
            ,
            ,
            ,
            ,
            ,
            ,
            [5, 6, 7, 10],
          ],
          [, , "(?:[2-5]\\d|6[1-9])\\d{3}", , , , "22123", , , [5]],
          [
            ,
            ,
            "(?:7[25-7]|8(?:[3-7]|9\\d{3}))\\d{5}",
            ,
            ,
            ,
            "7212345",
            ,
            ,
            [7, 10],
          ],
          [, , "800\\d{3}", , , , "800123", , , [6]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "WS",
          685,
          "0",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{5})", "$1", ["[2-6]"]],
            [, "(\\d{3})(\\d{3,7})", "$1 $2", ["8"]],
            [, "(\\d{2})(\\d{5})", "$1 $2", ["7"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        XK: [
          ,
          [, , "[23]\\d{7,8}|(?:4\\d\\d|[89]00)\\d{5}", , , , , , , [8, 9]],
          [, , "(?:2[89]|39)0\\d{6}|[23][89]\\d{6}", , , , "28012345"],
          [, , "4[3-79]\\d{6}", , , , "43201234", , , [8]],
          [, , "800\\d{5}", , , , "80001234", , , [8]],
          [, , "900\\d{5}", , , , "90001234", , , [8]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "XK",
          383,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-4]"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[23]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        YE: [
          ,
          [, , "(?:1|7\\d)\\d{7}|[1-7]\\d{6}", , , , , , , [7, 8, 9], [6]],
          [
            ,
            ,
            "17\\d{6}|(?:[12][2-68]|3[2358]|4[2-58]|5[2-6]|6[3-58]|7[24-68])\\d{5}",
            ,
            ,
            ,
            "1234567",
            ,
            ,
            [7, 8],
            [6],
          ],
          [, , "7[0137]\\d{7}", , , , "712345678", , , [9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "YE",
          967,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d)(\\d{3})(\\d{3,4})",
              "$1 $2 $3",
              ["[1-6]|7[24-68]"],
              "0$1",
            ],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        YT: [
          ,
          [, , "80\\d{7}|(?:26|63)9\\d{6}", , , , , , , [9]],
          [, , "269(?:0[67]|5[01]|6\\d|[78]0)\\d{4}", , , , "269601234"],
          [
            ,
            ,
            "639(?:0[0-79]|1[019]|[267]\\d|3[09]|[45]0|9[04-79])\\d{4}",
            ,
            ,
            ,
            "639012345",
          ],
          [, , "80\\d{7}", , , , "801234567"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "YT",
          262,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          ,
          ,
          [, , , , , , , , , [-1]],
          ,
          "269|63",
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        ZA: [
          ,
          [, , "[1-9]\\d{8}|8\\d{4,7}", , , , , , , [5, 6, 7, 8, 9]],
          [
            ,
            ,
            "(?:1[0-8]|2[1-378]|3[1-69]|4\\d|5[1346-8])\\d{7}",
            ,
            ,
            ,
            "101234567",
            ,
            ,
            [9],
          ],
          [, , "8[1-4]\\d{3,7}|(?:6\\d|7[0-46-9]|85)\\d{7}", , , , "711234567"],
          [, , "80\\d{7}", , , , "801234567", , , [9]],
          [, , "(?:86[2-9]|9[0-2]\\d)\\d{6}", , , , "862345678", , , [9]],
          [, , "860\\d{6}", , , , "860123456", , , [9]],
          [, , , , , , , , , [-1]],
          [, , "87\\d{7}", , , , "871234567", , , [9]],
          "ZA",
          27,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{3,4})", "$1 $2", ["8[1-4]"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["8[1-4]"], "0$1"],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["860"], "0$1"],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-9]"], "0$1"],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "861\\d{6}", , , , "861123456", , , [9]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        ZM: [
          ,
          [, , "800\\d{6}|(?:21|76|9\\d)\\d{7}", , , , , , , [9], [6]],
          [, , "21[1-8]\\d{6}", , , , "211234567", , , , [6]],
          [, , "(?:76|9[5-8])\\d{7}", , , , "955123456"],
          [, , "800\\d{6}", , , , "800123456"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "ZM",
          260,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [, "(\\d{3})(\\d{3})", "$1 $2", ["[1-9]"]],
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[28]"], "0$1"],
            [, "(\\d{2})(\\d{7})", "$1 $2", ["[79]"], "0$1"],
          ],
          [
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[28]"], "0$1"],
            [, "(\\d{2})(\\d{7})", "$1 $2", ["[79]"], "0$1"],
          ],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        ZW: [
          ,
          [
            ,
            ,
            "2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}",
            ,
            ,
            ,
            ,
            ,
            ,
            [5, 6, 7, 8, 9, 10],
            [3, 4],
          ],
          [
            ,
            ,
            "(?:1(?:(?:3\\d|9)\\d|[4-8])|2(?:(?:(?:0(?:2[014]|5)|(?:2[0157]|31|84|9)\\d\\d|[56](?:[14]\\d\\d|20)|7(?:[089]|2[03]|[35]\\d\\d))\\d|4(?:2\\d\\d|8))\\d|1(?:2|[39]\\d{4}))|3(?:(?:123|(?:29\\d|92)\\d)\\d\\d|7(?:[19]|[56]\\d))|5(?:0|1[2-478]|26|[37]2|4(?:2\\d{3}|83)|5(?:25\\d\\d|[78])|[689]\\d)|6(?:(?:[16-8]21|28|52[013])\\d\\d|[39])|8(?:[1349]28|523)\\d\\d)\\d{3}|(?:4\\d\\d|9[2-9])\\d{4,5}|(?:(?:2(?:(?:(?:0|8[146])\\d|7[1-7])\\d|2(?:[278]\\d|92)|58(?:2\\d|3))|3(?:[26]|9\\d{3})|5(?:4\\d|5)\\d\\d)\\d|6(?:(?:(?:[0-246]|[78]\\d)\\d|37)\\d|5[2-8]))\\d\\d|(?:2(?:[569]\\d|8[2-57-9])|3(?:[013-59]\\d|8[37])|6[89]8)\\d{3}",
            ,
            ,
            ,
            "1312345",
            ,
            ,
            ,
            [3, 4],
          ],
          [
            ,
            ,
            "(?:7(?:1\\d|3[2-9]|7[1-9]|8[2-5])|8644)\\d{6}",
            ,
            ,
            ,
            "712345678",
            ,
            ,
            [9, 10],
          ],
          [, , "80(?:[01]\\d|20|8[0-8])\\d{3}", , , , "8001234", , , [7]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "86(?:1[12]|30|55|77|8[368])\\d{6}",
            ,
            ,
            ,
            "8686123456",
            ,
            ,
            [10],
          ],
          "ZW",
          263,
          "00",
          "0",
          ,
          ,
          "0",
          ,
          ,
          ,
          [
            [
              ,
              "(\\d{3})(\\d{3,5})",
              "$1 $2",
              [
                "2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]",
              ],
              "0$1",
            ],
            [, "(\\d)(\\d{3})(\\d{2,4})", "$1 $2 $3", ["[49]"], "0$1"],
            [, "(\\d{3})(\\d{4})", "$1 $2", ["80"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{7})",
              "$1 $2",
              [
                "24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2",
                "2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]",
              ],
              "(0$1)",
            ],
            [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"],
            [
              ,
              "(\\d{3})(\\d{3})(\\d{3,4})",
              "$1 $2 $3",
              [
                "2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)",
                "2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)",
              ],
              "0$1",
            ],
            [, "(\\d{4})(\\d{6})", "$1 $2", ["8"], "0$1"],
            [
              ,
              "(\\d{2})(\\d{3,5})",
              "$1 $2",
              [
                "1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]",
              ],
              "0$1",
            ],
            [
              ,
              "(\\d{2})(\\d{3})(\\d{3,4})",
              "$1 $2 $3",
              ["29[013-9]|39|54"],
              "0$1",
            ],
            [
              ,
              "(\\d{4})(\\d{3,5})",
              "$1 $2",
              ["(?:25|54)8", "258|5483"],
              "0$1",
            ],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        800: [
          ,
          [, , "\\d{8}", , , , , , , [8]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "\\d{8}", , , , "12345678"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "001",
          800,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          1,
          [[, "(\\d{4})(\\d{4})", "$1 $2"]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        808: [
          ,
          [, , "\\d{8}", , , , , , , [8]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "\\d{8}", , , , "12345678"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "001",
          808,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          1,
          [[, "(\\d{4})(\\d{4})", "$1 $2"]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        870: [
          ,
          [, , "[35-7]\\d{8}", , , , , , , [9]],
          [, , , , , , , , , [-1]],
          [, , "(?:[356]\\d|7[6-8])\\d{7}", , , , "301234567"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "001",
          870,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[35-7]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        878: [
          ,
          [, , "10\\d{10}", , , , , , , [12]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "10\\d{10}", , , , "101234567890"],
          "001",
          878,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          1,
          [[, "(\\d{2})(\\d{5})(\\d{5})", "$1 $2 $3", ["1"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        881: [
          ,
          [, , "[67]\\d{8}", , , , , , , [9]],
          [, , , , , , , , , [-1]],
          [, , "[67]\\d{8}", , , , "612345678"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "001",
          881,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [[, "(\\d)(\\d{3})(\\d{5})", "$1 $2 $3", ["[67]"]]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        882: [
          ,
          [
            ,
            ,
            "1\\d{6,11}|3\\d{6}(?:\\d{2,5})?",
            ,
            ,
            ,
            ,
            ,
            ,
            [7, 8, 9, 10, 11, 12],
          ],
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "3(?:37\\d\\d|42)\\d{4}|3(?:2|47|7\\d{3})\\d{7}",
            ,
            ,
            ,
            "3421234",
            ,
            ,
            [7, 9, 10, 12],
          ],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [
            ,
            ,
            "1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|3(?:45|9\\d{3})\\d{7}",
            ,
            ,
            ,
            "390123456789",
          ],
          "001",
          882,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          [
            [, "(\\d{2})(\\d{5})", "$1 $2", ["16|342"]],
            [, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["1"]],
            [, "(\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["3[23]"]],
            [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"]],
            [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["34[57]"]],
            [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["34"]],
            [, "(\\d{2})(\\d{4,5})(\\d{5})", "$1 $2 $3", ["[13]"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , "348[57]\\d{7}", , , , "34851234567", , , [11]],
        ],
        883: [
          ,
          [, , "51\\d{7}(?:\\d{3})?", , , , , , , [9, 12]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "51[013]0\\d{8}|5100\\d{5}", , , , "510012345"],
          "001",
          883,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          1,
          [
            [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["510"]],
            [, "(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["510"]],
            [, "(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3", ["5"]],
          ],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        888: [
          ,
          [, , "\\d{11}", , , , , , , [11]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "001",
          888,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          1,
          [[, "(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , "\\d{11}", , , , "12345678901"],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
        979: [
          ,
          [, , "\\d{9}", , , , , , , [9]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , "\\d{9}", , , , "123456789"],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          "001",
          979,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          1,
          [[, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3"]],
          ,
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
          [, , , , , , , , , [-1]],
          ,
          ,
          [, , , , , , , , , [-1]],
        ],
      };
    function j() {
      this.a = {};
    }
    (j.c = void 0),
      (j.a = function () {
        return j.c ? j.c : (j.c = new j());
      });
    var G = {
        0: "0",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        "\uff10": "0",
        "\uff11": "1",
        "\uff12": "2",
        "\uff13": "3",
        "\uff14": "4",
        "\uff15": "5",
        "\uff16": "6",
        "\uff17": "7",
        "\uff18": "8",
        "\uff19": "9",
        "\u0660": "0",
        "\u0661": "1",
        "\u0662": "2",
        "\u0663": "3",
        "\u0664": "4",
        "\u0665": "5",
        "\u0666": "6",
        "\u0667": "7",
        "\u0668": "8",
        "\u0669": "9",
        "\u06f0": "0",
        "\u06f1": "1",
        "\u06f2": "2",
        "\u06f3": "3",
        "\u06f4": "4",
        "\u06f5": "5",
        "\u06f6": "6",
        "\u06f7": "7",
        "\u06f8": "8",
        "\u06f9": "9",
      },
      U = {
        0: "0",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        "\uff10": "0",
        "\uff11": "1",
        "\uff12": "2",
        "\uff13": "3",
        "\uff14": "4",
        "\uff15": "5",
        "\uff16": "6",
        "\uff17": "7",
        "\uff18": "8",
        "\uff19": "9",
        "\u0660": "0",
        "\u0661": "1",
        "\u0662": "2",
        "\u0663": "3",
        "\u0664": "4",
        "\u0665": "5",
        "\u0666": "6",
        "\u0667": "7",
        "\u0668": "8",
        "\u0669": "9",
        "\u06f0": "0",
        "\u06f1": "1",
        "\u06f2": "2",
        "\u06f3": "3",
        "\u06f4": "4",
        "\u06f5": "5",
        "\u06f6": "6",
        "\u06f7": "7",
        "\u06f8": "8",
        "\u06f9": "9",
        A: "2",
        B: "2",
        C: "2",
        D: "3",
        E: "3",
        F: "3",
        G: "4",
        H: "4",
        I: "4",
        J: "5",
        K: "5",
        L: "5",
        M: "6",
        N: "6",
        O: "6",
        P: "7",
        Q: "7",
        R: "7",
        S: "7",
        T: "8",
        U: "8",
        V: "8",
        W: "9",
        X: "9",
        Y: "9",
        Z: "9",
      },
      H = /^[+\uff0b]+/,
      z = /([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9])/,
      W = /[+\uff0b0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]/,
      K = /[\\\/] *x/,
      q = /[^0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9A-Za-z#]+$/,
      V = /(?:.*?[A-Za-z]){3}.*/,
      X =
        /(?:;ext=([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})|[ \u00a0\t,]*(?:e?xt(?:ensi(?:o\u0301?|\u00f3))?n?|\uff45?\uff58\uff54\uff4e?|\u0434\u043e\u0431|[;,x\uff58#\uff03~\uff5e]|int|anexo|\uff49\uff4e\uff54)[:\.\uff0e]?[ \u00a0\t,-]*([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})#?|[- ]+([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,5})#)$/i,
      Z =
        /^[0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{2}$|^[+\uff0b]*(?:[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\[\]/~\u2053\u223c\uff5e*]*[0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]){3,}[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\[\]/~\u2053\u223c\uff5e*A-Za-z0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]*(?:;ext=([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})|[ \u00a0\t,]*(?:e?xt(?:ensi(?:o\u0301?|\u00f3))?n?|\uff45?\uff58\uff54\uff4e?|\u0434\u043e\u0431|[;,x\uff58#\uff03~\uff5e]|int|anexo|\uff49\uff4e\uff54)[:\.\uff0e]?[ \u00a0\t,-]*([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})#?|[- ]+([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,5})#)?$/i,
      J = /(\$\d)/;
    function Y(e) {
      return !(2 > e.length) && Ce(Z, e);
    }
    function Q(e) {
      return Ce(V, e) ? de(e, U) : de(e, G);
    }
    function ee(e) {
      var t = Q(e.toString());
      (e.c = ""), e.a(t);
    }
    function te(e) {
      return null != e && (1 != C(e, 9) || -1 != y(e, 9)[0]);
    }
    function de(e, t) {
      for (var d, n = new A(), r = e.length, o = 0; o < r; ++o)
        null != (d = t[(d = e.charAt(o)).toUpperCase()]) && n.a(d);
      return n.toString();
    }
    function ne(e) {
      return null != e && isNaN(e) && e.toUpperCase() in F;
    }
    function re(e, t, d) {
      if (0 == g(t, 2) && null != t.a[5]) {
        var n = v(t, 5);
        if (0 < n.length) return n;
      }
      n = v(t, 1);
      var r = ie(t);
      if (0 == d) return ae(n, 0, r, "");
      if (!(n in R)) return r;
      (e = oe(e, n, he(n))),
        (t =
          null != t.a[3] && 0 != g(t, 3).length
            ? 3 == d
              ? ";ext=" + g(t, 3)
              : null != e.a[13]
              ? g(e, 13) + v(t, 3)
              : " ext. " + v(t, 3)
            : "");
      e: {
        for (
          var o,
            i = (e = 0 == y(e, 20).length || 2 == d ? y(e, 19) : y(e, 20))
              .length,
            a = 0;
          a < i;
          ++a
        ) {
          var s = C((o = e[a]), 3);
          if (
            (0 == s || 0 == r.search(g(o, 3, s - 1))) &&
            Ce((s = new RegExp(g(o, 1))), r)
          ) {
            e = o;
            break e;
          }
        }
        e = null;
      }
      return (
        null != e &&
          ((e = v((i = e), 2)),
          (o = new RegExp(g(i, 1))),
          v(i, 5),
          (i = v(i, 4)),
          (r = r.replace(
            o,
            2 == d && null != i && 0 < i.length ? e.replace(J, i) : e
          )),
          3 == d &&
            (r = (r = r.replace(
              /^[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\[\]/~\u2053\u223c\uff5e]+/,
              ""
            )).replace(
              /[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\[\]/~\u2053\u223c\uff5e]+/g,
              "-"
            ))),
        ae(n, d, r, t)
      );
    }
    function oe(e, t, d) {
      return ue(e, "001" == d ? "" + t : d);
    }
    function ie(e) {
      if (null == e.a[2]) return "";
      var t = "" + g(e, 2);
      return null != e.a[4] && g(e, 4) && 0 < v(e, 8)
        ? Array(v(e, 8) + 1).join("0") + t
        : t;
    }
    function ae(e, t, d, n) {
      switch (t) {
        case 0:
          return "+" + e + d + n;
        case 1:
          return "+" + e + " " + d + n;
        case 3:
          return "tel:+" + e + "-" + d + n;
        default:
          return d + n;
      }
    }
    function se(e, t) {
      switch (t) {
        case 4:
          return g(e, 5);
        case 3:
          return g(e, 4);
        case 1:
          return g(e, 3);
        case 0:
        case 2:
          return g(e, 2);
        case 5:
          return g(e, 6);
        case 6:
          return g(e, 8);
        case 7:
          return g(e, 7);
        case 8:
          return g(e, 21);
        case 9:
          return g(e, 25);
        case 10:
          return g(e, 28);
        default:
          return g(e, 1);
      }
    }
    function le(e, t) {
      return ce(e, g(t, 1))
        ? ce(e, g(t, 5))
          ? 4
          : ce(e, g(t, 4))
          ? 3
          : ce(e, g(t, 6))
          ? 5
          : ce(e, g(t, 8))
          ? 6
          : ce(e, g(t, 7))
          ? 7
          : ce(e, g(t, 21))
          ? 8
          : ce(e, g(t, 25))
          ? 9
          : ce(e, g(t, 28))
          ? 10
          : ce(e, g(t, 2))
          ? g(t, 18) || ce(e, g(t, 3))
            ? 2
            : 0
          : !g(t, 18) && ce(e, g(t, 3))
          ? 1
          : -1
        : -1;
    }
    function ue(e, t) {
      if (null == t) return null;
      t = t.toUpperCase();
      var d = e.a[t];
      if (null == d) {
        if (null == (d = F[t])) return null;
        (d = new S().a(E.f(), d)), (e.a[t] = d);
      }
      return d;
    }
    function ce(e, t) {
      var d = e.length;
      return !(0 < C(t, 9) && -1 == r(y(t, 9), d)) && Ce(v(t, 2), e);
    }
    function fe(e, t) {
      if (null == t) return null;
      var d = v(t, 1);
      if (null == (d = R[d])) e = null;
      else if (1 == d.length) e = d[0];
      else
        e: {
          t = ie(t);
          for (var n, r = d.length, o = 0; o < r; o++) {
            var i = ue(e, (n = d[o]));
            if (null != i.a[23]) {
              if (0 == t.search(g(i, 23))) {
                e = n;
                break e;
              }
            } else if (-1 != le(t, i)) {
              e = n;
              break e;
            }
          }
          e = null;
        }
      return e;
    }
    function he(e) {
      return null == (e = R[e]) ? "ZZ" : e[0];
    }
    function $e(e, t, d, n) {
      var i = se(d, n),
        a = 0 == C(i, 9) ? y(g(d, 1), 9) : y(i, 9);
      if (((i = y(i, 10)), 2 == n)) {
        if (!te(se(d, 0))) return $e(e, t, d, 1);
        te((e = se(d, 1))) &&
          (o((a = a.concat(0 == C(e, 9) ? y(g(d, 1), 9) : y(e, 9)))),
          0 == i.length ? (i = y(e, 10)) : o((i = i.concat(y(e, 10)))));
      }
      return -1 == a[0]
        ? 5
        : -1 < r(i, (t = t.length))
        ? 4
        : (d = a[0]) == t
        ? 0
        : d > t
        ? 2
        : a[a.length - 1] < t
        ? 3
        : -1 < r(a, t, 1)
        ? 0
        : 5;
    }
    function pe(e, t) {
      var d = ie(t);
      return (t = v(t, 1)) in R ? $e(e, d, (t = oe(e, t, he(t))), -1) : 1;
    }
    function me(e, t, d, n, r, o) {
      if (0 == t.length) return 0;
      var i;
      (t = new A(t)),
        null != d && (i = g(d, 11)),
        null == i && (i = "NonMatch");
      var a = t.toString();
      if (0 == a.length) i = 20;
      else if (H.test(a))
        (a = a.replace(H, "")), (t.c = ""), t.a(Q(a)), (i = 1);
      else {
        if (((a = new RegExp(i)), ee(t), 0 == (i = t.toString()).search(a))) {
          a = i.match(a)[0].length;
          var s = i.substring(a).match(z);
          s && null != s[1] && 0 < s[1].length && "0" == de(s[1], G)
            ? (i = !1)
            : ((t.c = ""), t.a(i.substring(a)), (i = !0));
        } else i = !1;
        i = i ? 5 : 20;
      }
      if ((r && b(o, 6, i), 20 != i)) {
        if (2 >= t.c.length) throw Error("Phone number too short after IDD");
        e: {
          if (0 != (e = t.toString()).length && "0" != e.charAt(0))
            for (r = e.length, t = 1; 3 >= t && t <= r; ++t)
              if ((d = parseInt(e.substring(0, t), 10)) in R) {
                n.a(e.substring(t)), (n = d);
                break e;
              }
          n = 0;
        }
        if (0 != n) return b(o, 1, n), n;
        throw Error("Invalid country calling code");
      }
      return null != d &&
        ((a = "" + (i = v(d, 10))),
        0 == (s = t.toString()).lastIndexOf(a, 0) &&
          ((a = new A(s.substring(a.length))),
          (s = g(d, 1)),
          (s = new RegExp(v(s, 2))),
          ge(a, d, null),
          (a = a.toString()),
          (!Ce(s, t.toString()) && Ce(s, a)) ||
            3 == $e(e, t.toString(), d, -1)))
        ? (n.a(a), r && b(o, 6, 10), b(o, 1, i), i)
        : (b(o, 1, 0), 0);
    }
    function ge(e, t, d) {
      var n = e.toString(),
        r = n.length,
        o = g(t, 15);
      if (0 != r && null != o && 0 != o.length) {
        var i = new RegExp("^(?:" + o + ")");
        if ((r = i.exec(n))) {
          var a = Ce((o = new RegExp(v(g(t, 1), 2))), n),
            s = r.length - 1;
          null == (t = g(t, 16)) ||
          0 == t.length ||
          null == r[s] ||
          0 == r[s].length
            ? (a && !Ce(o, n.substring(r[0].length))) ||
              (null != d && 0 < s && null != r[s] && d.a(r[1]),
              e.set(n.substring(r[0].length)))
            : ((n = n.replace(i, t)),
              (!a || Ce(o, n)) && (null != d && 0 < s && d.a(r[1]), e.set(n)));
        }
      }
    }
    function ve(e, t, d) {
      if (!ne(d) && 0 < t.length && "+" != t.charAt(0))
        throw Error("Invalid country calling code");
      return ye(e, t, d, !0);
    }
    function ye(e, t, d, n) {
      if (null == t)
        throw Error("The string supplied did not seem to be a phone number");
      if (250 < t.length)
        throw Error("The string supplied is too long to be a phone number");
      var r = new A(),
        o = t.indexOf(";phone-context=");
      if (0 <= o) {
        var i = o + 15;
        if ("+" == t.charAt(i)) {
          var a = t.indexOf(";", i);
          r.a(0 < a ? t.substring(i, a) : t.substring(i));
        }
        (i = t.indexOf("tel:")), r.a(t.substring(0 <= i ? i + 4 : 0, o));
      } else
        r.a(
          (function (e) {
            var t = e.search(W);
            return (
              0 <= t
                ? 0 <=
                    (t = (e = (e = e.substring(t)).replace(q, "")).search(K)) &&
                  (e = e.substring(0, t))
                : (e = ""),
              e
            );
          })(t)
        );
      if (
        (0 < (i = (o = r.toString()).indexOf(";isub=")) &&
          ((r.c = ""), r.a(o.substring(0, i))),
        !Y(r.toString()))
      )
        throw Error("The string supplied did not seem to be a phone number");
      if (
        ((o = r.toString()),
        !(ne(d) || (null != o && 0 < o.length && H.test(o))))
      )
        throw Error("Invalid country calling code");
      (o = new _()), n && b(o, 5, t);
      e: {
        if (0 <= (i = (t = r.toString()).search(X)) && Y(t.substring(0, i)))
          for (var s = (a = t.match(X)).length, l = 1; l < s; ++l)
            if (null != a[l] && 0 < a[l].length) {
              (r.c = ""), r.a(t.substring(0, i)), (t = a[l]);
              break e;
            }
        t = "";
      }
      0 < t.length && b(o, 3, t),
        (i = ue(e, d)),
        (t = new A()),
        (a = 0),
        (s = r.toString());
      try {
        a = me(e, s, i, t, n, o);
      } catch (d) {
        if ("Invalid country calling code" != d.message || !H.test(s)) throw d;
        if (0 == (a = me(e, (s = s.replace(H, "")), i, t, n, o))) throw d;
      }
      if (
        (0 != a
          ? (r = he(a)) != d && (i = oe(e, a, r))
          : (ee(r),
            t.a(r.toString()),
            null != d
              ? b(o, 1, (a = v(i, 10)))
              : n && (delete o.a[6], o.c && delete o.c[6])),
        2 > t.c.length)
      )
        throw Error("The string supplied is too short to be a phone number");
      if (
        (null != i &&
          ((d = new A()),
          ge((r = new A(t.toString())), i, d),
          2 != (e = $e(e, r.toString(), i, -1)) &&
            4 != e &&
            5 != e &&
            ((t = r), n && 0 < d.toString().length && b(o, 7, d.toString()))),
        2 > (e = (n = t.toString()).length))
      )
        throw Error("The string supplied is too short to be a phone number");
      if (17 < e)
        throw Error("The string supplied is too long to be a phone number");
      if (1 < n.length && "0" == n.charAt(0)) {
        for (b(o, 4, !0), e = 1; e < n.length - 1 && "0" == n.charAt(e); ) e++;
        1 != e && b(o, 8, e);
      }
      return b(o, 2, parseInt(n, 10)), o;
    }
    function Ce(e, t) {
      return !(
        !(e = t.match("string" == typeof e ? "^(?:" + e + ")$" : e)) ||
        e[0].length != t.length
      );
    }
    d("intlTelInputUtils", {}),
      d("intlTelInputUtils.formatNumber", function (e, t, d) {
        try {
          var n = j.a(),
            r = ve(n, e, t),
            o = pe(n, r);
          return 0 == o || 4 == o ? re(n, r, void 0 === d ? 0 : d) : e;
        } catch (t) {
          return e;
        }
      }),
      d("intlTelInputUtils.getExampleNumber", function (e, t, d) {
        try {
          var n = j.a();
          e: {
            if (ne(e)) {
              var r = se(ue(n, e), d);
              try {
                if (null != r.a[6]) {
                  var o = ye(n, g(r, 6), e, !1);
                  break e;
                }
              } catch (e) {}
            }
            o = null;
          }
          return re(n, o, t ? 2 : 1);
        } catch (e) {
          return "";
        }
      }),
      d("intlTelInputUtils.getExtension", function (e, t) {
        try {
          return g(ve(j.a(), e, t), 3);
        } catch (e) {
          return "";
        }
      }),
      d("intlTelInputUtils.getNumberType", function (e, t) {
        try {
          var d = j.a(),
            n = ve(d, e, t),
            r = fe(d, n),
            o = oe(d, v(n, 1), r);
          if (null == o) var i = -1;
          else i = le(ie(n), o);
          return i;
        } catch (e) {
          return -99;
        }
      }),
      d("intlTelInputUtils.getValidationError", function (e, t) {
        try {
          var d = j.a();
          return pe(d, ve(d, e, t));
        } catch (e) {
          return "Invalid country calling code" == e.message
            ? 1
            : "The string supplied did not seem to be a phone number" ==
              e.message
            ? 4
            : "Phone number too short after IDD" == e.message ||
              "The string supplied is too short to be a phone number" == e
            ? 2
            : "The string supplied is too long to be a phone number" ==
              e.message
            ? 3
            : -99;
        }
      }),
      d("intlTelInputUtils.isValidNumber", function (e, t) {
        try {
          var d,
            n = j.a(),
            r = ve(n, e, t),
            o = fe(n, r),
            i = v(r, 1),
            a = oe(n, i, o);
          if (!(d = null == a)) {
            var s;
            if ((s = "001" != o)) {
              var l = ue(n, o);
              if (null == l) throw Error("Invalid region code: " + o);
              s = i != v(l, 10);
            }
            d = s;
          }
          if (d) var u = !1;
          else u = -1 != le(ie(r), a);
          return u;
        } catch (e) {
          return !1;
        }
      }),
      d("intlTelInputUtils.numberFormat", {
        E164: 0,
        INTERNATIONAL: 1,
        NATIONAL: 2,
        RFC3966: 3,
      }),
      d("intlTelInputUtils.numberType", {
        FIXED_LINE: 0,
        MOBILE: 1,
        FIXED_LINE_OR_MOBILE: 2,
        TOLL_FREE: 3,
        PREMIUM_RATE: 4,
        SHARED_COST: 5,
        VOIP: 6,
        PERSONAL_NUMBER: 7,
        PAGER: 8,
        UAN: 9,
        VOICEMAIL: 10,
        UNKNOWN: -1,
      }),
      d("intlTelInputUtils.validationError", {
        IS_POSSIBLE: 0,
        INVALID_COUNTRY_CODE: 1,
        TOO_SHORT: 2,
        TOO_LONG: 3,
        NOT_A_NUMBER: 4,
      });
  })(),
  (function (e) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (t) {
          e(t, window, document);
        })
      : e(jQuery, window, document);
  })(function (e, t, d, n) {
    "use strict";
    var r = "countrySelect",
      o = 1,
      i = {
        defaultCountry: "",
        defaultStyling: "inside",
        excludeCountries: [],
        onlyCountries: [],
        preferredCountries: ["us", "gb"],
      };
    function a(t, d) {
      (this.element = t),
        (this.options = e.extend({}, i, d)),
        (this._defaults = i),
        (this.ns = "." + r + o++),
        (this._name = r),
        this.init();
    }
    e(t).on("load", function () {}),
      (a.prototype = {
        init: function () {
          return (
            this._processCountryData(),
            this._generateMarkup(),
            this._setInitialState(),
            this._initListeners(),
            (this.autoCountryDeferred = new e.Deferred()),
            this._initAutoCountry(),
            this.autoCountryDeferred
          );
        },
        _processCountryData: function () {
          this._setInstanceCountryData(), this._setPreferredCountries();
        },
        _setInstanceCountryData: function () {
          var t = this;
          if (this.options.onlyCountries.length) {
            var d = [];
            e.each(this.options.onlyCountries, function (e, n) {
              var r = t._getCountryData(n, !0);
              r && d.push(r);
            }),
              (this.countries = d);
          } else if (this.options.excludeCountries.length) {
            var n = this.options.excludeCountries.map(function (e) {
              return e.toLowerCase();
            });
            this.countries = s.filter(function (e) {
              return -1 === n.indexOf(e.iso2);
            });
          } else this.countries = s;
        },
        _setPreferredCountries: function () {
          var t = this;
          (this.preferredCountries = []),
            e.each(this.options.preferredCountries, function (e, d) {
              var n = t._getCountryData(d, !1);
              n && t.preferredCountries.push(n);
            });
        },
        _generateMarkup: function () {
          this.countryInput = e(this.element);
          var t = "country-select";
          this.options.defaultStyling &&
            (t += " " + this.options.defaultStyling),
            this.countryInput.wrap(e("<div>", { class: t }));
          var d = e("<div>", { class: "flag-dropdown" }).insertAfter(
              this.countryInput
            ),
            n = e("<div>", { class: "selected-flag" }).appendTo(d);
          (this.selectedFlagInner = e("<div>", { class: "flag" }).appendTo(n)),
            e("<div>", { class: "arrow" }).appendTo(n),
            (this.countryList = e("<ul>", {
              class: "country-list v-hide",
            }).appendTo(d)),
            this.preferredCountries.length &&
              (this._appendListItems(this.preferredCountries, "preferred"),
              e("<li>", { class: "divider" }).appendTo(this.countryList)),
            this._appendListItems(this.countries, ""),
            (this.countryCodeInput = e(
              "#" + this.countryInput.attr("id") + "_code"
            )),
            this.countryCodeInput ||
              ((this.countryCodeInput = e(
                '<input type="hidden" id="' +
                  this.countryInput.attr("id") +
                  '_code" name="' +
                  this.countryInput.attr("name") +
                  '_code" value="" />'
              )),
              this.countryCodeInput.insertAfter(this.countryInput)),
            (this.dropdownHeight = this.countryList.outerHeight()),
            this.countryList.removeClass("v-hide").addClass("hide"),
            (this.countryListItems = this.countryList.children(".country"));
        },
        _appendListItems: function (t, d) {
          var n = "";
          e.each(t, function (e, t) {
            (n +=
              '<li class="country ' +
              d +
              '" data-country-code="' +
              t.iso2 +
              '">'),
              (n += '<div class="flag ' + t.iso2 + '"></div>'),
              (n += '<span class="country-name">' + t.name + "</span>"),
              (n += "</li>");
          }),
            this.countryList.append(n);
        },
        _setInitialState: function () {
          var e = !1;
          this.countryInput.val() && (e = this._updateFlagFromInputVal());
          var t,
            d = this.countryCodeInput.val();
          d && this.selectCountry(d),
            e ||
              ((this.options.defaultCountry &&
                (t = this._getCountryData(this.options.defaultCountry, !1))) ||
                (t = this.preferredCountries.length
                  ? this.preferredCountries[0]
                  : this.countries[0]),
              (this.defaultCountry = t.iso2));
        },
        _initListeners: function () {
          var e = this;
          this.countryInput.on("keyup" + this.ns, function () {
            e._updateFlagFromInputVal();
          }),
            this.selectedFlagInner.parent().on("click" + this.ns, function (t) {
              e.countryList.hasClass("hide") &&
                !e.countryInput.prop("disabled") &&
                e._showDropdown();
            }),
            this.countryInput.on("blur" + this.ns, function () {
              e.countryInput.val() != e.getSelectedCountryData().name &&
                e.setCountry(e.countryInput.val()),
                e.countryInput.val(e.getSelectedCountryData().name);
            });
        },
        _initAutoCountry: function () {
          "auto" === this.options.initialCountry
            ? this._loadAutoCountry()
            : (this.selectCountry(this.defaultCountry),
              this.autoCountryDeferred.resolve());
        },
        _loadAutoCountry: function () {
          e.fn[r].autoCountry
            ? this.handleAutoCountry()
            : e.fn[r].startedLoadingAutoCountry ||
              ((e.fn[r].startedLoadingAutoCountry = !0),
              "function" == typeof this.options.geoIpLookup &&
                this.options.geoIpLookup(function (t) {
                  (e.fn[r].autoCountry = t.toLowerCase()),
                    setTimeout(function () {
                      e(".country-select input").countrySelect(
                        "handleAutoCountry"
                      );
                    });
                }));
        },
        _focus: function () {
          this.countryInput.focus();
          var e = this.countryInput[0];
          if (e.setSelectionRange) {
            var t = this.countryInput.val().length;
            e.setSelectionRange(t, t);
          }
        },
        _showDropdown: function () {
          this._setDropdownPosition();
          var e = this.countryList.children(".active");
          this._highlightListItem(e),
            this.countryList.removeClass("hide"),
            this._scrollTo(e),
            this._bindDropdownListeners(),
            this.selectedFlagInner.parent().children(".arrow").addClass("up");
        },
        _setDropdownPosition: function () {
          var d = this.countryInput.offset().top,
            n = e(t).scrollTop(),
            r =
              d + this.countryInput.outerHeight() + this.dropdownHeight <
              n + e(t).height();
          this.countryList.css(
            "top",
            !r && d - this.dropdownHeight > n
              ? "-" + (this.dropdownHeight - 1) + "px"
              : ""
          );
        },
        _bindDropdownListeners: function () {
          var t = this;
          this.countryList.on("mouseover" + this.ns, ".country", function (d) {
            t._highlightListItem(e(this));
          }),
            this.countryList.on("click" + this.ns, ".country", function (d) {
              t._selectListItem(e(this));
            });
          var n = !0;
          e("html").on("click" + this.ns, function (e) {
            n || t._closeDropdown(), (n = !1);
          }),
            e(d).on("keydown" + this.ns, function (e) {
              e.preventDefault(),
                38 == e.which || 40 == e.which
                  ? t._handleUpDownKey(e.which)
                  : 13 == e.which
                  ? t._handleEnterKey()
                  : 27 == e.which
                  ? t._closeDropdown()
                  : e.which >= 65 &&
                    e.which <= 90 &&
                    t._handleLetterKey(e.which);
            });
        },
        _handleUpDownKey: function (e) {
          var t = this.countryList.children(".highlight").first(),
            d = 38 == e ? t.prev() : t.next();
          d.length &&
            (d.hasClass("divider") && (d = 38 == e ? d.prev() : d.next()),
            this._highlightListItem(d),
            this._scrollTo(d));
        },
        _handleEnterKey: function () {
          var e = this.countryList.children(".highlight").first();
          e.length && this._selectListItem(e);
        },
        _handleLetterKey: function (t) {
          var d = String.fromCharCode(t),
            n = this.countryListItems.filter(function () {
              return (
                e(this).text().charAt(0) == d && !e(this).hasClass("preferred")
              );
            });
          if (n.length) {
            var r,
              o = n.filter(".highlight").first();
            (r =
              o && o.next() && o.next().text().charAt(0) == d
                ? o.next()
                : n.first()),
              this._highlightListItem(r),
              this._scrollTo(r);
          }
        },
        _updateFlagFromInputVal: function () {
          var t = this,
            d = this.countryInput.val().replace(/(?=[() ])/g, "\\");
          if (d) {
            for (
              var n = [], r = new RegExp("^" + d, "i"), o = 0;
              o < this.countries.length;
              o++
            )
              this.countries[o].name.match(r) && n.push(this.countries[o].iso2);
            var i = !1;
            return (
              e.each(n, function (e, d) {
                t.selectedFlagInner.hasClass(d) && (i = !0);
              }),
              i ||
                (this._selectFlag(n[0]),
                this.countryCodeInput.val(n[0]).trigger("change")),
              !0
            );
          }
          return !1;
        },
        _highlightListItem: function (e) {
          this.countryListItems.removeClass("highlight"),
            e.addClass("highlight");
        },
        _getCountryData: function (e, t) {
          for (var d = t ? s : this.countries, n = 0; n < d.length; n++)
            if (d[n].iso2 == e) return d[n];
          return null;
        },
        _selectFlag: function (e) {
          if (!e) return !1;
          this.selectedFlagInner.attr("class", "flag " + e);
          var t = this._getCountryData(e);
          this.selectedFlagInner.parent().attr("title", t.name);
          var d = this.countryListItems
            .children(".flag." + e)
            .first()
            .parent();
          this.countryListItems.removeClass("active"), d.addClass("active");
        },
        _selectListItem: function (e) {
          var t = e.attr("data-country-code");
          this._selectFlag(t),
            this._closeDropdown(),
            this._updateName(t),
            this.countryInput.trigger("change"),
            this.countryCodeInput.trigger("change"),
            this._focus();
        },
        _closeDropdown: function () {
          this.countryList.addClass("hide"),
            this.selectedFlagInner
              .parent()
              .children(".arrow")
              .removeClass("up"),
            e(d).off("keydown" + this.ns),
            e("html").off("click" + this.ns),
            this.countryList.off(this.ns);
        },
        _scrollTo: function (e) {
          if (e && e.offset()) {
            var t = this.countryList,
              d = t.height(),
              n = t.offset().top,
              r = n + d,
              o = e.outerHeight(),
              i = e.offset().top,
              a = i + o,
              s = i - n + t.scrollTop();
            i < n ? t.scrollTop(s) : a > r && t.scrollTop(s - (d - o));
          }
        },
        _updateName: function (e) {
          this.countryCodeInput.val(e).trigger("change"),
            this.countryInput.val(this._getCountryData(e).name);
        },
        handleAutoCountry: function () {
          "auto" === this.options.initialCountry &&
            ((this.defaultCountry = e.fn[r].autoCountry),
            this.countryInput.val() || this.selectCountry(this.defaultCountry),
            this.autoCountryDeferred.resolve());
        },
        getSelectedCountryData: function () {
          var e = this.selectedFlagInner.attr("class").split(" ")[1];
          return this._getCountryData(e);
        },
        selectCountry: function (e) {
          (e = e.toLowerCase()),
            this.selectedFlagInner.hasClass(e) ||
              (this._selectFlag(e), this._updateName(e));
        },
        setCountry: function (e) {
          this.countryInput.val(e), this._updateFlagFromInputVal();
        },
        destroy: function () {
          this.countryInput.off(this.ns),
            this.selectedFlagInner.parent().off(this.ns),
            this.countryInput.parent().before(this.countryInput).remove();
        },
      }),
      (e.fn[r] = function (t) {
        var d,
          o = arguments;
        return t === n || "object" == typeof t
          ? this.each(function () {
              e.data(this, "plugin_" + r) ||
                e.data(this, "plugin_" + r, new a(this, t));
            })
          : "string" == typeof t && "_" !== t[0] && "init" !== t
          ? (this.each(function () {
              var n = e.data(this, "plugin_" + r);
              n instanceof a &&
                "function" == typeof n[t] &&
                (d = n[t].apply(n, Array.prototype.slice.call(o, 1))),
                "destroy" === t && e.data(this, "plugin_" + r, null);
            }),
            d !== n ? d : this)
          : void 0;
      }),
      (e.fn[r].getCountryData = function () {
        return s;
      }),
      (e.fn[r].setCountryData = function (e) {
        s = e;
      });
    var s = e.each(
      [
        {
          n: "Afghanistan (\u202b\u0627\u0641\u063a\u0627\u0646\u0633\u062a\u0627\u0646\u202c\u200e)",
          i: "af",
        },
        { n: "\xc5land Islands (\xc5land)", i: "ax" },
        { n: "Albania (Shqip\xebri)", i: "al" },
        {
          n: "Algeria (\u202b\u0627\u0644\u062c\u0632\u0627\u0626\u0631\u202c\u200e)",
          i: "dz",
        },
        { n: "American Samoa", i: "as" },
        { n: "Andorra", i: "ad" },
        { n: "Angola", i: "ao" },
        { n: "Anguilla", i: "ai" },
        { n: "Antigua and Barbuda", i: "ag" },
        { n: "Argentina", i: "ar" },
        {
          n: "Armenia (\u0540\u0561\u0575\u0561\u057d\u057f\u0561\u0576)",
          i: "am",
        },
        { n: "Aruba", i: "aw" },
        { n: "Australia", i: "au" },
        { n: "Austria (\xd6sterreich)", i: "at" },
        { n: "Azerbaijan (Az\u0259rbaycan)", i: "az" },
        { n: "Bahamas", i: "bs" },
        {
          n: "Bahrain (\u202b\u0627\u0644\u0628\u062d\u0631\u064a\u0646\u202c\u200e)",
          i: "bh",
        },
        {
          n: "Bangladesh (\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6)",
          i: "bd",
        },
        { n: "Barbados", i: "bb" },
        {
          n: "Belarus (\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u044c)",
          i: "by",
        },
        { n: "Belgium (Belgi\xeb)", i: "be" },
        { n: "Belize", i: "bz" },
        { n: "Benin (B\xe9nin)", i: "bj" },
        { n: "Bermuda", i: "bm" },
        { n: "Bhutan (\u0f60\u0f56\u0fb2\u0f74\u0f42)", i: "bt" },
        { n: "Bolivia", i: "bo" },
        {
          n: "Bosnia and Herzegovina (\u0411\u043e\u0441\u043d\u0430 \u0438 \u0425\u0435\u0440\u0446\u0435\u0433\u043e\u0432\u0438\u043d\u0430)",
          i: "ba",
        },
        { n: "Botswana", i: "bw" },
        { n: "Brazil (Brasil)", i: "br" },
        { n: "British Indian Ocean Territory", i: "io" },
        { n: "British Virgin Islands", i: "vg" },
        { n: "Brunei", i: "bn" },
        {
          n: "Bulgaria (\u0411\u044a\u043b\u0433\u0430\u0440\u0438\u044f)",
          i: "bg",
        },
        { n: "Burkina Faso", i: "bf" },
        { n: "Burundi (Uburundi)", i: "bi" },
        { n: "Cambodia (\u1780\u1798\u17d2\u1796\u17bb\u1787\u17b6)", i: "kh" },
        { n: "Cameroon (Cameroun)", i: "cm" },
        { n: "Canada", i: "ca" },
        { n: "Cape Verde (Kabu Verdi)", i: "cv" },
        { n: "Caribbean Netherlands", i: "bq" },
        { n: "Cayman Islands", i: "ky" },
        {
          n: "Central African Republic (R\xe9publique Centrafricaine)",
          i: "cf",
        },
        { n: "Chad (Tchad)", i: "td" },
        { n: "Chile", i: "cl" },
        { n: "China (\u4e2d\u56fd)", i: "cn" },
        { n: "Christmas Island", i: "cx" },
        { n: "Cocos (Keeling) Islands (Kepulauan Cocos (Keeling))", i: "cc" },
        { n: "Colombia", i: "co" },
        {
          n: "Comoros (\u202b\u062c\u0632\u0631 \u0627\u0644\u0642\u0645\u0631\u202c\u200e)",
          i: "km",
        },
        { n: "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", i: "cd" },
        { n: "Congo (Republic) (Congo-Brazzaville)", i: "cg" },
        { n: "Cook Islands", i: "ck" },
        { n: "Costa Rica", i: "cr" },
        { n: "C\xf4te d\u2019Ivoire", i: "ci" },
        { n: "Croatia (Hrvatska)", i: "hr" },
        { n: "Cuba", i: "cu" },
        { n: "Cura\xe7ao", i: "cw" },
        { n: "Cyprus (\u039a\u03cd\u03c0\u03c1\u03bf\u03c2)", i: "cy" },
        { n: "Czech Republic (\u010cesk\xe1 republika)", i: "cz" },
        { n: "Denmark (Danmark)", i: "dk" },
        { n: "Djibouti", i: "dj" },
        { n: "Dominica", i: "dm" },
        { n: "Dominican Republic (Rep\xfablica Dominicana)", i: "do" },
        { n: "Ecuador", i: "ec" },
        { n: "Egypt (\u202b\u0645\u0635\u0631\u202c\u200e)", i: "eg" },
        { n: "El Salvador", i: "sv" },
        { n: "Equatorial Guinea (Guinea Ecuatorial)", i: "gq" },
        { n: "Eritrea", i: "er" },
        { n: "Estonia (Eesti)", i: "ee" },
        { n: "Ethiopia", i: "et" },
        { n: "Falkland Islands (Islas Malvinas)", i: "fk" },
        { n: "Faroe Islands (F\xf8royar)", i: "fo" },
        { n: "Fiji", i: "fj" },
        { n: "Finland (Suomi)", i: "fi" },
        { n: "France", i: "fr" },
        { n: "French Guiana (Guyane fran\xe7aise)", i: "gf" },
        { n: "French Polynesia (Polyn\xe9sie fran\xe7aise)", i: "pf" },
        { n: "Gabon", i: "ga" },
        { n: "Gambia", i: "gm" },
        {
          n: "Georgia (\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd)",
          i: "ge",
        },
        { n: "Germany (Deutschland)", i: "de" },
        { n: "Ghana (Gaana)", i: "gh" },
        { n: "Gibraltar", i: "gi" },
        { n: "Greece (\u0395\u03bb\u03bb\u03ac\u03b4\u03b1)", i: "gr" },
        { n: "Greenland (Kalaallit Nunaat)", i: "gl" },
        { n: "Grenada", i: "gd" },
        { n: "Guadeloupe", i: "gp" },
        { n: "Guam", i: "gu" },
        { n: "Guatemala", i: "gt" },
        { n: "Guernsey", i: "gg" },
        { n: "Guinea (Guin\xe9e)", i: "gn" },
        { n: "Guinea-Bissau (Guin\xe9 Bissau)", i: "gw" },
        { n: "Guyana", i: "gy" },
        { n: "Haiti", i: "ht" },
        { n: "Honduras", i: "hn" },
        { n: "Hong Kong (\u9999\u6e2f)", i: "hk" },
        { n: "Hungary (Magyarorsz\xe1g)", i: "hu" },
        { n: "Iceland (\xcdsland)", i: "is" },
        { n: "India (\u092d\u093e\u0930\u0924)", i: "in" },
        { n: "Indonesia", i: "id" },
        {
          n: "Iran (\u202b\u0627\u06cc\u0631\u0627\u0646\u202c\u200e)",
          i: "ir",
        },
        {
          n: "Iraq (\u202b\u0627\u0644\u0639\u0631\u0627\u0642\u202c\u200e)",
          i: "iq",
        },
        { n: "Ireland", i: "ie" },
        { n: "Isle of Man", i: "im" },
        {
          n: "Israel (\u202b\u05d9\u05e9\u05e8\u05d0\u05dc\u202c\u200e)",
          i: "il",
        },
        { n: "Italy (Italia)", i: "it" },
        { n: "Jamaica", i: "jm" },
        { n: "Japan (\u65e5\u672c)", i: "jp" },
        { n: "Jersey", i: "je" },
        {
          n: "Jordan (\u202b\u0627\u0644\u0623\u0631\u062f\u0646\u202c\u200e)",
          i: "jo",
        },
        {
          n: "Kazakhstan (\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d)",
          i: "kz",
        },
        { n: "Kenya", i: "ke" },
        { n: "Kiribati", i: "ki" },
        { n: "Kosovo (Kosov\xeb)", i: "xk" },
        {
          n: "Kuwait (\u202b\u0627\u0644\u0643\u0648\u064a\u062a\u202c\u200e)",
          i: "kw",
        },
        {
          n: "Kyrgyzstan (\u041a\u044b\u0440\u0433\u044b\u0437\u0441\u0442\u0430\u043d)",
          i: "kg",
        },
        { n: "Laos (\u0ea5\u0eb2\u0ea7)", i: "la" },
        { n: "Latvia (Latvija)", i: "lv" },
        {
          n: "Lebanon (\u202b\u0644\u0628\u0646\u0627\u0646\u202c\u200e)",
          i: "lb",
        },
        { n: "Lesotho", i: "ls" },
        { n: "Liberia", i: "lr" },
        {
          n: "Libya (\u202b\u0644\u064a\u0628\u064a\u0627\u202c\u200e)",
          i: "ly",
        },
        { n: "Liechtenstein", i: "li" },
        { n: "Lithuania (Lietuva)", i: "lt" },
        { n: "Luxembourg", i: "lu" },
        { n: "Macau (\u6fb3\u9580)", i: "mo" },
        {
          n: "Macedonia (FYROM) (\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0438\u0458\u0430)",
          i: "mk",
        },
        { n: "Madagascar (Madagasikara)", i: "mg" },
        { n: "Malawi", i: "mw" },
        { n: "Malaysia", i: "my" },
        { n: "Maldives", i: "mv" },
        { n: "Mali", i: "ml" },
        { n: "Malta", i: "mt" },
        { n: "Marshall Islands", i: "mh" },
        { n: "Martinique", i: "mq" },
        {
          n: "Mauritania (\u202b\u0645\u0648\u0631\u064a\u062a\u0627\u0646\u064a\u0627\u202c\u200e)",
          i: "mr",
        },
        { n: "Mauritius (Moris)", i: "mu" },
        { n: "Mayotte", i: "yt" },
        { n: "Mexico (M\xe9xico)", i: "mx" },
        { n: "Micronesia", i: "fm" },
        { n: "Moldova (Republica Moldova)", i: "md" },
        { n: "Monaco", i: "mc" },
        { n: "Mongolia (\u041c\u043e\u043d\u0433\u043e\u043b)", i: "mn" },
        { n: "Montenegro (Crna Gora)", i: "me" },
        { n: "Montserrat", i: "ms" },
        {
          n: "Morocco (\u202b\u0627\u0644\u0645\u063a\u0631\u0628\u202c\u200e)",
          i: "ma",
        },
        { n: "Mozambique (Mo\xe7ambique)", i: "mz" },
        {
          n: "Myanmar (Burma) (\u1019\u103c\u1014\u103a\u1019\u102c)",
          i: "mm",
        },
        { n: "Namibia (Namibi\xeb)", i: "na" },
        { n: "Nauru", i: "nr" },
        { n: "Nepal (\u0928\u0947\u092a\u093e\u0932)", i: "np" },
        { n: "Netherlands (Nederland)", i: "nl" },
        { n: "New Caledonia (Nouvelle-Cal\xe9donie)", i: "nc" },
        { n: "New Zealand", i: "nz" },
        { n: "Nicaragua", i: "ni" },
        { n: "Niger (Nijar)", i: "ne" },
        { n: "Nigeria", i: "ng" },
        { n: "Niue", i: "nu" },
        { n: "Norfolk Island", i: "nf" },
        {
          n: "North Korea (\uc870\uc120 \ubbfc\uc8fc\uc8fc\uc758 \uc778\ubbfc \uacf5\ud654\uad6d)",
          i: "kp",
        },
        { n: "Northern Mariana Islands", i: "mp" },
        { n: "Norway (Norge)", i: "no" },
        {
          n: "Oman (\u202b\u0639\u064f\u0645\u0627\u0646\u202c\u200e)",
          i: "om",
        },
        {
          n: "Pakistan (\u202b\u067e\u0627\u06a9\u0633\u062a\u0627\u0646\u202c\u200e)",
          i: "pk",
        },
        { n: "Palau", i: "pw" },
        {
          n: "Palestine (\u202b\u0641\u0644\u0633\u0637\u064a\u0646\u202c\u200e)",
          i: "ps",
        },
        { n: "Panama (Panam\xe1)", i: "pa" },
        { n: "Papua New Guinea", i: "pg" },
        { n: "Paraguay", i: "py" },
        { n: "Peru (Per\xfa)", i: "pe" },
        { n: "Philippines", i: "ph" },
        { n: "Pitcairn Islands", i: "pn" },
        { n: "Poland (Polska)", i: "pl" },
        { n: "Portugal", i: "pt" },
        { n: "Puerto Rico", i: "pr" },
        { n: "Qatar (\u202b\u0642\u0637\u0631\u202c\u200e)", i: "qa" },
        { n: "R\xe9union (La R\xe9union)", i: "re" },
        { n: "Romania (Rom\xe2nia)", i: "ro" },
        { n: "Russia (\u0420\u043e\u0441\u0441\u0438\u044f)", i: "ru" },
        { n: "Rwanda", i: "rw" },
        { n: "Saint Barth\xe9lemy (Saint-Barth\xe9lemy)", i: "bl" },
        { n: "Saint Helena", i: "sh" },
        { n: "Saint Kitts and Nevis", i: "kn" },
        { n: "Saint Lucia", i: "lc" },
        { n: "Saint Martin (Saint-Martin (partie fran\xe7aise))", i: "mf" },
        { n: "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", i: "pm" },
        { n: "Saint Vincent and the Grenadines", i: "vc" },
        { n: "Samoa", i: "ws" },
        { n: "San Marino", i: "sm" },
        {
          n: "S\xe3o Tom\xe9 and Pr\xedncipe (S\xe3o Tom\xe9 e Pr\xedncipe)",
          i: "st",
        },
        {
          n: "Saudi Arabia (\u202b\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629\u202c\u200e)",
          i: "sa",
        },
        { n: "Senegal (S\xe9n\xe9gal)", i: "sn" },
        { n: "Serbia (\u0421\u0440\u0431\u0438\u0458\u0430)", i: "rs" },
        { n: "Seychelles", i: "sc" },
        { n: "Sierra Leone", i: "sl" },
        { n: "Singapore", i: "sg" },
        { n: "Sint Maarten", i: "sx" },
        { n: "Slovakia (Slovensko)", i: "sk" },
        { n: "Slovenia (Slovenija)", i: "si" },
        { n: "Solomon Islands", i: "sb" },
        { n: "Somalia (Soomaaliya)", i: "so" },
        { n: "South Africa", i: "za" },
        { n: "South Georgia & South Sandwich Islands", i: "gs" },
        { n: "South Korea (\ub300\ud55c\ubbfc\uad6d)", i: "kr" },
        {
          n: "South Sudan (\u202b\u062c\u0646\u0648\u0628 \u0627\u0644\u0633\u0648\u062f\u0627\u0646\u202c\u200e)",
          i: "ss",
        },
        { n: "Spain (Espa\xf1a)", i: "es" },
        {
          n: "Sri Lanka (\u0dc1\u0dca\u200d\u0dbb\u0dd3 \u0dbd\u0d82\u0d9a\u0dcf\u0dc0)",
          i: "lk",
        },
        {
          n: "Sudan (\u202b\u0627\u0644\u0633\u0648\u062f\u0627\u0646\u202c\u200e)",
          i: "sd",
        },
        { n: "Suriname", i: "sr" },
        { n: "Svalbard and Jan Mayen (Svalbard og Jan Mayen)", i: "sj" },
        { n: "Swaziland", i: "sz" },
        { n: "Sweden (Sverige)", i: "se" },
        { n: "Switzerland (Schweiz)", i: "ch" },
        {
          n: "Syria (\u202b\u0633\u0648\u0631\u064a\u0627\u202c\u200e)",
          i: "sy",
        },
        { n: "Taiwan (\u53f0\u7063)", i: "tw" },
        { n: "Tajikistan", i: "tj" },
        { n: "Tanzania", i: "tz" },
        { n: "Thailand (\u0e44\u0e17\u0e22)", i: "th" },
        { n: "Timor-Leste", i: "tl" },
        { n: "Togo", i: "tg" },
        { n: "Tokelau", i: "tk" },
        { n: "Tonga", i: "to" },
        { n: "Trinidad and Tobago", i: "tt" },
        { n: "Tunisia (\u202b\u062a\u0648\u0646\u0633\u202c\u200e)", i: "tn" },
        { n: "Turkey (T\xfcrkiye)", i: "tr" },
        { n: "Turkmenistan", i: "tm" },
        { n: "Turks and Caicos Islands", i: "tc" },
        { n: "Tuvalu", i: "tv" },
        { n: "Uganda", i: "ug" },
        { n: "Ukraine (\u0423\u043a\u0440\u0430\u0457\u043d\u0430)", i: "ua" },
        {
          n: "United Arab Emirates (\u202b\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0645\u062a\u062d\u062f\u0629\u202c\u200e)",
          i: "ae",
        },
        { n: "United Kingdom", i: "gb" },
        { n: "United States", i: "us" },
        { n: "U.S. Minor Outlying Islands", i: "um" },
        { n: "U.S. Virgin Islands", i: "vi" },
        { n: "Uruguay", i: "uy" },
        { n: "Uzbekistan (O\u02bbzbekiston)", i: "uz" },
        { n: "Vanuatu", i: "vu" },
        { n: "Vatican City (Citt\xe0 del Vaticano)", i: "va" },
        { n: "Venezuela", i: "ve" },
        { n: "Vietnam (Vi\u1ec7t Nam)", i: "vn" },
        { n: "Wallis and Futuna", i: "wf" },
        {
          n: "Western Sahara (\u202b\u0627\u0644\u0635\u062d\u0631\u0627\u0621 \u0627\u0644\u063a\u0631\u0628\u064a\u0629\u202c\u200e)",
          i: "eh",
        },
        {
          n: "Yemen (\u202b\u0627\u0644\u064a\u0645\u0646\u202c\u200e)",
          i: "ye",
        },
        { n: "Zambia", i: "zm" },
        { n: "Zimbabwe", i: "zw" },
      ],
      function (e, t) {
        (t.name = t.n), (t.iso2 = t.i), delete t.n, delete t.i;
      }
    );
  }),
  ((Aes = {}).cipher = function (e, t) {
    for (var d = t.length / 4 - 1, n = [[], [], [], []], r = 0; r < 16; r++)
      n[r % 4][Math.floor(r / 4)] = e[r];
    n = Aes.addRoundKey(n, t, 0, 4);
    for (var o = 1; o < d; o++)
      (n = Aes.subBytes(n, 4)),
        (n = Aes.shiftRows(n, 4)),
        (n = Aes.mixColumns(n, 4)),
        (n = Aes.addRoundKey(n, t, o, 4));
    (n = Aes.subBytes(n, 4)),
      (n = Aes.shiftRows(n, 4)),
      (n = Aes.addRoundKey(n, t, d, 4));
    var i = new Array(16);
    for (r = 0; r < 16; r++) i[r] = n[r % 4][Math.floor(r / 4)];
    return i;
  }),
  (Aes.keyExpansion = function (e) {
    for (
      var t = e.length / 4,
        d = t + 6,
        n = new Array(4 * (d + 1)),
        r = new Array(4),
        o = 0;
      o < t;
      o++
    )
      n[o] = [e[4 * o], e[4 * o + 1], e[4 * o + 2], e[4 * o + 3]];
    for (o = t; o < 4 * (d + 1); o++) {
      n[o] = new Array(4);
      for (var i = 0; i < 4; i++) r[i] = n[o - 1][i];
      if (o % t == 0)
        for (r = Aes.subWord(Aes.rotWord(r)), i = 0; i < 4; i++)
          r[i] ^= Aes.rCon[o / t][i];
      else t > 6 && o % t == 4 && (r = Aes.subWord(r));
      for (i = 0; i < 4; i++) n[o][i] = n[o - t][i] ^ r[i];
    }
    return n;
  }),
  (Aes.subBytes = function (e, t) {
    for (var d = 0; d < 4; d++)
      for (var n = 0; n < t; n++) e[d][n] = Aes.sBox[e[d][n]];
    return e;
  }),
  (Aes.shiftRows = function (e, t) {
    for (var d = new Array(4), n = 1; n < 4; n++) {
      for (var r = 0; r < 4; r++) d[r] = e[n][(r + n) % t];
      for (r = 0; r < 4; r++) e[n][r] = d[r];
    }
    return e;
  }),
  (Aes.mixColumns = function (e, t) {
    for (var d = 0; d < 4; d++) {
      for (var n = new Array(4), r = new Array(4), o = 0; o < 4; o++)
        (n[o] = e[o][d]),
          (r[o] = 128 & e[o][d] ? (e[o][d] << 1) ^ 283 : e[o][d] << 1);
      (e[0][d] = r[0] ^ n[1] ^ r[1] ^ n[2] ^ n[3]),
        (e[1][d] = n[0] ^ r[1] ^ n[2] ^ r[2] ^ n[3]),
        (e[2][d] = n[0] ^ n[1] ^ r[2] ^ n[3] ^ r[3]),
        (e[3][d] = n[0] ^ r[0] ^ n[1] ^ n[2] ^ r[3]);
    }
    return e;
  }),
  (Aes.addRoundKey = function (e, t, d, n) {
    for (var r = 0; r < 4; r++)
      for (var o = 0; o < n; o++) e[r][o] ^= t[4 * d + o][r];
    return e;
  }),
  (Aes.subWord = function (e) {
    for (var t = 0; t < 4; t++) e[t] = Aes.sBox[e[t]];
    return e;
  }),
  (Aes.rotWord = function (e) {
    for (var t = e[0], d = 0; d < 3; d++) e[d] = e[d + 1];
    return (e[3] = t), e;
  }),
  (Aes.sBox = [
    99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118,
    202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114,
    192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49,
    21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9,
    131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209,
    0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170,
    251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143,
    146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236,
    95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34,
    42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6,
    36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213,
    78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166,
    180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3,
    246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217,
    142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230,
    66, 104, 65, 153, 45, 15, 176, 84, 187, 22,
  ]),
  (Aes.rCon = [
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [2, 0, 0, 0],
    [4, 0, 0, 0],
    [8, 0, 0, 0],
    [16, 0, 0, 0],
    [32, 0, 0, 0],
    [64, 0, 0, 0],
    [128, 0, 0, 0],
    [27, 0, 0, 0],
    [54, 0, 0, 0],
  ]),
  (Aes.Ctr = {});
var Aes,
  Base64 = {
    code: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e, t) {
      var d,
        n,
        r,
        o,
        i,
        a,
        s,
        l = [],
        u = "",
        c = Base64.code;
      if (
        (i = (a = (t = void 0 !== t && t) ? e.encodeUTF8() : e).length % 3) > 0
      )
        for (; i++ < 3; ) (u += "="), (a += "\0");
      for (i = 0; i < a.length; i += 3)
        (n =
          ((d =
            (a.charCodeAt(i) << 16) |
            (a.charCodeAt(i + 1) << 8) |
            a.charCodeAt(i + 2)) >>
            12) &
          63),
          (r = (d >> 6) & 63),
          (o = 63 & d),
          (l[i / 3] =
            c.charAt((d >> 18) & 63) + c.charAt(n) + c.charAt(r) + c.charAt(o));
      return (s = l.join("")).slice(0, s.length - u.length) + u;
    },
    decode: function (e, t) {
      var d,
        n,
        r,
        o,
        i,
        a,
        s,
        l = [],
        u = Base64.code;
      s = (t = void 0 !== t && t) ? e.decodeUTF8() : e;
      for (var c = 0; c < s.length; c += 4)
        (d =
          ((i =
            (u.indexOf(s.charAt(c)) << 18) |
            (u.indexOf(s.charAt(c + 1)) << 12) |
            ((r = u.indexOf(s.charAt(c + 2))) << 6) |
            (o = u.indexOf(s.charAt(c + 3)))) >>>
            16) &
          255),
          (n = (i >>> 8) & 255),
          (l[c / 4] = String.fromCharCode(d, n, 255 & i)),
          64 == o && (l[c / 4] = String.fromCharCode(d, n)),
          64 == r && (l[c / 4] = String.fromCharCode(d));
      return (a = l.join("")), t ? a.decodeUTF8() : a;
    },
  },
  Utf8 = {
    encode: function (e) {
      return e
        .replace(/[\u0080-\u07ff]/g, function (e) {
          var t = e.charCodeAt(0);
          return String.fromCharCode(192 | (t >> 6), 128 | (63 & t));
        })
        .replace(/[\u0800-\uffff]/g, function (e) {
          var t = e.charCodeAt(0);
          return String.fromCharCode(
            224 | (t >> 12),
            128 | ((t >> 6) & 63),
            128 | (63 & t)
          );
        });
    },
    decode: function (e) {
      return e
        .replace(
          /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,
          function (e) {
            var t =
              ((15 & e.charCodeAt(0)) << 12) |
              ((63 & e.charCodeAt(1)) << 6) |
              (63 & e.charCodeAt(2));
            return String.fromCharCode(t);
          }
        )
        .replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (e) {
          var t = ((31 & e.charCodeAt(0)) << 6) | (63 & e.charCodeAt(1));
          return String.fromCharCode(t);
        });
    },
  };
function encrypt(e, t, d) {
  if (128 != d && 192 != d && 256 != d) return "";
  (e = Utf8.encode(e)), (t = Utf8.encode(t));
  for (var n = d / 8, r = new Array(n), o = 0; o < n; o++)
    r[o] = isNaN(t.charCodeAt(o)) ? 0 : t.charCodeAt(o);
  var i = Aes.cipher(r, Aes.keyExpansion(r));
  i = i.concat(i.slice(0, n - 16));
  var a = new Array(16),
    s = new Date().getTime(),
    l = Math.floor(s / 1e3),
    u = s % 1e3;
  for (o = 0; o < 4; o++) a[o] = (l >>> (8 * o)) & 255;
  for (o = 0; o < 4; o++) a[o + 4] = 255 & u;
  var c = "";
  for (o = 0; o < 8; o++) c += String.fromCharCode(a[o]);
  for (
    var f = Aes.keyExpansion(i),
      h = Math.ceil(e.length / 16),
      $ = new Array(h),
      p = 0;
    p < h;
    p++
  ) {
    for (var m = 0; m < 4; m++) a[15 - m] = (p >>> (8 * m)) & 255;
    for (m = 0; m < 4; m++) a[15 - m - 4] = (p / 4294967296) >>> (8 * m);
    var g = Aes.cipher(a, f),
      v = p < h - 1 ? 16 : ((e.length - 1) % 16) + 1,
      y = new Array(v);
    for (o = 0; o < v; o++)
      (y[o] = g[o] ^ e.charCodeAt(16 * p + o)),
        (y[o] = String.fromCharCode(y[o]));
    $[p] = y.join("");
  }
  var C = c + $.join("");
  return Base64.encode(C);
}
function decrypt(e, t, d) {
  if (128 != d && 192 != d && 256 != d) return "";
  (e = Base64.decode(e)), (t = Utf8.encode(t));
  for (var n = d / 8, r = new Array(n), o = 0; o < n; o++)
    r[o] = isNaN(t.charCodeAt(o)) ? 0 : t.charCodeAt(o);
  var i = Aes.cipher(r, Aes.keyExpansion(r));
  i = i.concat(i.slice(0, n - 16));
  var a = new Array(8);
  for (ctrTxt = e.slice(0, 8), o = 0; o < 8; o++) a[o] = ctrTxt.charCodeAt(o);
  for (
    var s = Aes.keyExpansion(i),
      l = Math.ceil((e.length - 8) / 16),
      u = new Array(l),
      c = 0;
    c < l;
    c++
  )
    u[c] = e.slice(8 + 16 * c, 8 + 16 * c + 16);
  e = u;
  var f = new Array(e.length);
  for (c = 0; c < l; c++) {
    for (var h = 0; h < 4; h++) a[15 - h] = (c >>> (8 * h)) & 255;
    for (h = 0; h < 4; h++)
      a[15 - h - 4] = (((c + 1) / 4294967296 - 1) >>> (8 * h)) & 255;
    var $ = Aes.cipher(a, s),
      p = new Array(e[c].length);
    for (o = 0; o < e[c].length; o++)
      (p[o] = $[o] ^ e[c].charCodeAt(o)), (p[o] = String.fromCharCode(p[o]));
    f[c] = p.join("");
  }
  var m = f.join("");
  return Utf8.decode(m);
}
((Aes = {}).cipher = function (e, t) {
  for (var d = t.length / 4 - 1, n = [[], [], [], []], r = 0; r < 16; r++)
    n[r % 4][Math.floor(r / 4)] = e[r];
  n = Aes.addRoundKey(n, t, 0, 4);
  for (var o = 1; o < d; o++)
    (n = Aes.subBytes(n, 4)),
      (n = Aes.shiftRows(n, 4)),
      (n = Aes.mixColumns(n, 4)),
      (n = Aes.addRoundKey(n, t, o, 4));
  (n = Aes.subBytes(n, 4)),
    (n = Aes.shiftRows(n, 4)),
    (n = Aes.addRoundKey(n, t, d, 4));
  var i = new Array(16);
  for (r = 0; r < 16; r++) i[r] = n[r % 4][Math.floor(r / 4)];
  return i;
}),
  (Aes.keyExpansion = function (e) {
    for (
      var t = e.length / 4,
        d = t + 6,
        n = new Array(4 * (d + 1)),
        r = new Array(4),
        o = 0;
      o < t;
      o++
    )
      n[o] = [e[4 * o], e[4 * o + 1], e[4 * o + 2], e[4 * o + 3]];
    for (o = t; o < 4 * (d + 1); o++) {
      n[o] = new Array(4);
      for (var i = 0; i < 4; i++) r[i] = n[o - 1][i];
      if (o % t == 0)
        for (r = Aes.subWord(Aes.rotWord(r)), i = 0; i < 4; i++)
          r[i] ^= Aes.rCon[o / t][i];
      else t > 6 && o % t == 4 && (r = Aes.subWord(r));
      for (i = 0; i < 4; i++) n[o][i] = n[o - t][i] ^ r[i];
    }
    return n;
  }),
  (Aes.subBytes = function (e, t) {
    for (var d = 0; d < 4; d++)
      for (var n = 0; n < t; n++) e[d][n] = Aes.sBox[e[d][n]];
    return e;
  }),
  (Aes.shiftRows = function (e, t) {
    for (var d = new Array(4), n = 1; n < 4; n++) {
      for (var r = 0; r < 4; r++) d[r] = e[n][(r + n) % t];
      for (r = 0; r < 4; r++) e[n][r] = d[r];
    }
    return e;
  }),
  (Aes.mixColumns = function (e, t) {
    for (var d = 0; d < 4; d++) {
      for (var n = new Array(4), r = new Array(4), o = 0; o < 4; o++)
        (n[o] = e[o][d]),
          (r[o] = 128 & e[o][d] ? (e[o][d] << 1) ^ 283 : e[o][d] << 1);
      (e[0][d] = r[0] ^ n[1] ^ r[1] ^ n[2] ^ n[3]),
        (e[1][d] = n[0] ^ r[1] ^ n[2] ^ r[2] ^ n[3]),
        (e[2][d] = n[0] ^ n[1] ^ r[2] ^ n[3] ^ r[3]),
        (e[3][d] = n[0] ^ r[0] ^ n[1] ^ n[2] ^ r[3]);
    }
    return e;
  }),
  (Aes.addRoundKey = function (e, t, d, n) {
    for (var r = 0; r < 4; r++)
      for (var o = 0; o < n; o++) e[r][o] ^= t[4 * d + o][r];
    return e;
  }),
  (Aes.subWord = function (e) {
    for (var t = 0; t < 4; t++) e[t] = Aes.sBox[e[t]];
    return e;
  }),
  (Aes.rotWord = function (e) {
    for (var t = e[0], d = 0; d < 3; d++) e[d] = e[d + 1];
    return (e[3] = t), e;
  }),
  (Aes.sBox = [
    99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118,
    202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114,
    192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49,
    21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9,
    131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209,
    0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170,
    251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143,
    146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236,
    95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34,
    42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6,
    36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213,
    78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166,
    180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3,
    246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217,
    142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230,
    66, 104, 65, 153, 45, 15, 176, 84, 187, 22,
  ]),
  (Aes.rCon = [
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [2, 0, 0, 0],
    [4, 0, 0, 0],
    [8, 0, 0, 0],
    [16, 0, 0, 0],
    [32, 0, 0, 0],
    [64, 0, 0, 0],
    [128, 0, 0, 0],
    [27, 0, 0, 0],
    [54, 0, 0, 0],
  ]),
  (Aes.Ctr = {}),
  (Base64 = {
    code: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e, t) {
      var d,
        n,
        r,
        o,
        i,
        a,
        s,
        l = [],
        u = "",
        c = Base64.code;
      if (
        (i = (a = (t = void 0 !== t && t) ? e.encodeUTF8() : e).length % 3) > 0
      )
        for (; i++ < 3; ) (u += "="), (a += "\0");
      for (i = 0; i < a.length; i += 3)
        (n =
          ((d =
            (a.charCodeAt(i) << 16) |
            (a.charCodeAt(i + 1) << 8) |
            a.charCodeAt(i + 2)) >>
            12) &
          63),
          (r = (d >> 6) & 63),
          (o = 63 & d),
          (l[i / 3] =
            c.charAt((d >> 18) & 63) + c.charAt(n) + c.charAt(r) + c.charAt(o));
      return (s = l.join("")).slice(0, s.length - u.length) + u;
    },
    decode: function (e, t) {
      var d,
        n,
        r,
        o,
        i,
        a,
        s,
        l = [],
        u = Base64.code;
      s = (t = void 0 !== t && t) ? e.decodeUTF8() : e;
      for (var c = 0; c < s.length; c += 4)
        (d =
          ((i =
            (u.indexOf(s.charAt(c)) << 18) |
            (u.indexOf(s.charAt(c + 1)) << 12) |
            ((r = u.indexOf(s.charAt(c + 2))) << 6) |
            (o = u.indexOf(s.charAt(c + 3)))) >>>
            16) &
          255),
          (n = (i >>> 8) & 255),
          (l[c / 4] = String.fromCharCode(d, n, 255 & i)),
          64 == o && (l[c / 4] = String.fromCharCode(d, n)),
          64 == r && (l[c / 4] = String.fromCharCode(d));
      return (a = l.join("")), t ? a.decodeUTF8() : a;
    },
  }),
  (Utf8 = {
    encode: function (e) {
      return e
        .replace(/[\u0080-\u07ff]/g, function (e) {
          var t = e.charCodeAt(0);
          return String.fromCharCode(192 | (t >> 6), 128 | (63 & t));
        })
        .replace(/[\u0800-\uffff]/g, function (e) {
          var t = e.charCodeAt(0);
          return String.fromCharCode(
            224 | (t >> 12),
            128 | ((t >> 6) & 63),
            128 | (63 & t)
          );
        });
    },
    decode: function (e) {
      return e
        .replace(
          /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,
          function (e) {
            var t =
              ((15 & e.charCodeAt(0)) << 12) |
              ((63 & e.charCodeAt(1)) << 6) |
              (63 & e.charCodeAt(2));
            return String.fromCharCode(t);
          }
        )
        .replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (e) {
          var t = ((31 & e.charCodeAt(0)) << 6) | (63 & e.charCodeAt(1));
          return String.fromCharCode(t);
        });
    },
  }),
  (function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? t(exports)
      : "function" == typeof define && define.amd
      ? define("qrcode", ["exports"], t)
      : t(((e = e || self).QRCode = {}));
  })(this, function (e) {
    "use strict";
    var t;
    ((t = e.Mode || (e.Mode = {}))[(t.Terminator = 0)] = "Terminator"),
      (t[(t.Numeric = 1)] = "Numeric"),
      (t[(t.Alphanumeric = 2)] = "Alphanumeric"),
      (t[(t.StructuredAppend = 3)] = "StructuredAppend"),
      (t[(t.Byte = 4)] = "Byte"),
      (t[(t.Kanji = 8)] = "Kanji"),
      (t[(t.ECI = 7)] = "ECI");
    var d = function (e, t) {
      return (d =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, t) {
            e.__proto__ = t;
          }) ||
        function (e, t) {
          for (var d in t) t.hasOwnProperty(d) && (e[d] = t[d]);
        })(e, t);
    };
    function n(e, t) {
      function n() {
        this.constructor = e;
      }
      d(e, t),
        (e.prototype =
          null === t
            ? Object.create(t)
            : ((n.prototype = t.prototype), new n()));
    }
    var r,
      o = function () {
        return (o =
          Object.assign ||
          function (e) {
            for (var t, d = 1, n = arguments.length; d < n; d++)
              for (var r in (t = arguments[d]))
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e;
          }).apply(this, arguments);
      },
      i = (function () {
        function t(e, t) {
          (this.mode = e), (this.data = t);
        }
        return (
          (t.prototype.getMode = function () {
            return this.mode;
          }),
          (t.prototype.getLengthInBits = function (t) {
            var d = this.mode,
              n = "illegal mode: " + d;
            if (1 <= t && t < 10)
              switch (d) {
                case e.Mode.Numeric:
                  return 10;
                case e.Mode.Alphanumeric:
                  return 9;
                case e.Mode.Byte:
                case e.Mode.Kanji:
                  return 8;
                default:
                  throw n;
              }
            else if (t < 27)
              switch (d) {
                case e.Mode.Numeric:
                  return 12;
                case e.Mode.Alphanumeric:
                  return 11;
                case e.Mode.Byte:
                  return 16;
                case e.Mode.Kanji:
                  return 10;
                default:
                  throw n;
              }
            else {
              if (!(t < 41)) throw "illegal version: " + t;
              switch (d) {
                case e.Mode.Numeric:
                  return 14;
                case e.Mode.Alphanumeric:
                  return 13;
                case e.Mode.Byte:
                  return 16;
                case e.Mode.Kanji:
                  return 12;
                default:
                  throw n;
              }
            }
          }),
          t
        );
      })(),
      a = (function (t) {
        function d(d, n) {
          var r = t.call(this, e.Mode.Byte, d) || this;
          if (((r.encoding = -1), "function" == typeof n)) {
            var o = n(d),
              i = o.encoding;
            (r.bytes = o.bytes), (r.encoding = i);
          } else
            (r.bytes = (function (e) {
              for (var t = [], d = e.length, n = 0, r = 0; r < d; r++) {
                var o = e.charCodeAt(r);
                o < 128
                  ? (t[n++] = o)
                  : o < 2048
                  ? ((t[n++] = (o >> 6) | 192), (t[n++] = (63 & o) | 128))
                  : 55296 == (64512 & o) &&
                    r + 1 < d &&
                    56320 == (64512 & e.charCodeAt(r + 1))
                  ? ((o =
                      65536 + ((1023 & o) << 10) + (1023 & e.charCodeAt(++r))),
                    (t[n++] = (o >> 18) | 240),
                    (t[n++] = ((o >> 12) & 63) | 128),
                    (t[n++] = ((o >> 6) & 63) | 128),
                    (t[n++] = (63 & o) | 128))
                  : ((t[n++] = (o >> 12) | 224),
                    (t[n++] = ((o >> 6) & 63) | 128),
                    (t[n++] = (63 & o) | 128));
              }
              return t;
            })(d)),
              (r.encoding = 26);
          return r;
        }
        return (
          n(d, t),
          (d.prototype.write = function (e) {
            for (var t = this.bytes, d = t.length, n = 0; n < d; n++)
              e.put(t[n], 8);
          }),
          (d.prototype.getLength = function () {
            return this.bytes.length;
          }),
          d
        );
      })(i);
    ((r = e.ErrorCorrectionLevel || (e.ErrorCorrectionLevel = {}))[(r.L = 1)] =
      "L"),
      (r[(r.M = 0)] = "M"),
      (r[(r.Q = 3)] = "Q"),
      (r[(r.H = 2)] = "H");
    for (var s = [], l = [], u = 0; u < 256; u++)
      (l[u] = 0),
        (s[u] = u < 8 ? 1 << u : s[u - 4] ^ s[u - 5] ^ s[u - 6] ^ s[u - 8]);
    for (u = 0; u < 255; u++) l[s[u]] = u;
    function c(e) {
      if (e < 1) throw "illegal log: " + e;
      return l[e];
    }
    function f(e) {
      for (; e < 0; ) e += 255;
      for (; e >= 256; ) e -= 255;
      return s[e];
    }
    var h = (function () {
        function e(e, t) {
          void 0 === t && (t = 0), (this.num = []);
          for (var d = 0, n = e.length; d < n && 0 === e[d]; ) d++;
          n -= d;
          for (var r = 0; r < n; r++) this.num.push(e[d + r]);
          for (r = 0; r < t; r++) this.num.push(0);
        }
        return (
          (e.prototype.getAt = function (e) {
            return this.num[e];
          }),
          (e.prototype.getLength = function () {
            return this.num.length;
          }),
          (e.prototype.multiply = function (t) {
            for (
              var d = [],
                n = t.getLength(),
                r = this.getLength(),
                o = r + n - 1,
                i = 0;
              i < o;
              i++
            )
              d.push(0);
            for (i = 0; i < r; i++)
              for (var a = 0; a < n; a++)
                d[i + a] ^= f(c(this.getAt(i)) + c(t.getAt(a)));
            return new e(d);
          }),
          (e.prototype.mod = function (t) {
            var d = t.getLength(),
              n = this.getLength();
            if (n - d < 0) return this;
            for (
              var r = c(this.getAt(0)) - c(t.getAt(0)), o = [], i = 0;
              i < n;
              i++
            )
              o.push(this.getAt(i));
            for (i = 0; i < d; i++) o[i] ^= f(c(t.getAt(i)) + r);
            return new e(o).mod(t);
          }),
          e
        );
      })(),
      $ = 3,
      p = [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170],
      ];
    function m(e) {
      for (var t = new h([1]), d = 0; d < e; d++)
        t = t.multiply(new h([1, f(d)]));
      return t;
    }
    function g(e) {
      for (var t = 0; 0 !== e; ) t++, (e >>>= 1);
      return t;
    }
    var v = g(7973),
      y = g(1335);
    function C(e, t) {
      for (var d = e.getMatrixSize(), n = 0, r = 0; r < d; r++)
        for (var o = null, i = 0, a = 0; a < d; a++) {
          var s = t ? e.isDark(r, a) : e.isDark(a, r);
          s === o ? (5 == ++i ? (n += $) : i > 5 && n++) : ((o = s), (i = 1));
        }
      return n;
    }
    function b(e, t, d, n, r) {
      (d = Math.max(d, 0)), (n = Math.min(n, e.getMatrixSize()));
      for (var o = d; o < n; o++)
        if (r ? e.isDark(t, o) : e.isDark(o, t)) return !1;
      return !0;
    }
    var w = (function () {
        function t(e, t) {
          (this.dataCount = t), (this.totalCount = e);
        }
        return (
          (t.prototype.getDataCount = function () {
            return this.dataCount;
          }),
          (t.prototype.getTotalCount = function () {
            return this.totalCount;
          }),
          (t.getRSBlocks = function (e, d) {
            for (
              var n = [], r = t.getRSBlockTable(e, d), o = r.length / 3, i = 0;
              i < o;
              i++
            )
              for (
                var a = r[3 * i + 0], s = r[3 * i + 1], l = r[3 * i + 2], u = 0;
                u < a;
                u++
              )
                n.push(new t(s, l));
            return n;
          }),
          (t.getRSBlockTable = function (d, n) {
            switch (n) {
              case e.ErrorCorrectionLevel.L:
                return t.RS_BLOCK_TABLE[4 * (d - 1) + 0];
              case e.ErrorCorrectionLevel.M:
                return t.RS_BLOCK_TABLE[4 * (d - 1) + 1];
              case e.ErrorCorrectionLevel.Q:
                return t.RS_BLOCK_TABLE[4 * (d - 1) + 2];
              case e.ErrorCorrectionLevel.H:
                return t.RS_BLOCK_TABLE[4 * (d - 1) + 3];
              default:
                throw "illegal error correction level: " + n;
            }
          }),
          (t.RS_BLOCK_TABLE = [
            [1, 26, 19],
            [1, 26, 16],
            [1, 26, 13],
            [1, 26, 9],
            [1, 44, 34],
            [1, 44, 28],
            [1, 44, 22],
            [1, 44, 16],
            [1, 70, 55],
            [1, 70, 44],
            [2, 35, 17],
            [2, 35, 13],
            [1, 100, 80],
            [2, 50, 32],
            [2, 50, 24],
            [4, 25, 9],
            [1, 134, 108],
            [2, 67, 43],
            [2, 33, 15, 2, 34, 16],
            [2, 33, 11, 2, 34, 12],
            [2, 86, 68],
            [4, 43, 27],
            [4, 43, 19],
            [4, 43, 15],
            [2, 98, 78],
            [4, 49, 31],
            [2, 32, 14, 4, 33, 15],
            [4, 39, 13, 1, 40, 14],
            [2, 121, 97],
            [2, 60, 38, 2, 61, 39],
            [4, 40, 18, 2, 41, 19],
            [4, 40, 14, 2, 41, 15],
            [2, 146, 116],
            [3, 58, 36, 2, 59, 37],
            [4, 36, 16, 4, 37, 17],
            [4, 36, 12, 4, 37, 13],
            [2, 86, 68, 2, 87, 69],
            [4, 69, 43, 1, 70, 44],
            [6, 43, 19, 2, 44, 20],
            [6, 43, 15, 2, 44, 16],
            [4, 101, 81],
            [1, 80, 50, 4, 81, 51],
            [4, 50, 22, 4, 51, 23],
            [3, 36, 12, 8, 37, 13],
            [2, 116, 92, 2, 117, 93],
            [6, 58, 36, 2, 59, 37],
            [4, 46, 20, 6, 47, 21],
            [7, 42, 14, 4, 43, 15],
            [4, 133, 107],
            [8, 59, 37, 1, 60, 38],
            [8, 44, 20, 4, 45, 21],
            [12, 33, 11, 4, 34, 12],
            [3, 145, 115, 1, 146, 116],
            [4, 64, 40, 5, 65, 41],
            [11, 36, 16, 5, 37, 17],
            [11, 36, 12, 5, 37, 13],
            [5, 109, 87, 1, 110, 88],
            [5, 65, 41, 5, 66, 42],
            [5, 54, 24, 7, 55, 25],
            [11, 36, 12, 7, 37, 13],
            [5, 122, 98, 1, 123, 99],
            [7, 73, 45, 3, 74, 46],
            [15, 43, 19, 2, 44, 20],
            [3, 45, 15, 13, 46, 16],
            [1, 135, 107, 5, 136, 108],
            [10, 74, 46, 1, 75, 47],
            [1, 50, 22, 15, 51, 23],
            [2, 42, 14, 17, 43, 15],
            [5, 150, 120, 1, 151, 121],
            [9, 69, 43, 4, 70, 44],
            [17, 50, 22, 1, 51, 23],
            [2, 42, 14, 19, 43, 15],
            [3, 141, 113, 4, 142, 114],
            [3, 70, 44, 11, 71, 45],
            [17, 47, 21, 4, 48, 22],
            [9, 39, 13, 16, 40, 14],
            [3, 135, 107, 5, 136, 108],
            [3, 67, 41, 13, 68, 42],
            [15, 54, 24, 5, 55, 25],
            [15, 43, 15, 10, 44, 16],
            [4, 144, 116, 4, 145, 117],
            [17, 68, 42],
            [17, 50, 22, 6, 51, 23],
            [19, 46, 16, 6, 47, 17],
            [2, 139, 111, 7, 140, 112],
            [17, 74, 46],
            [7, 54, 24, 16, 55, 25],
            [34, 37, 13],
            [4, 151, 121, 5, 152, 122],
            [4, 75, 47, 14, 76, 48],
            [11, 54, 24, 14, 55, 25],
            [16, 45, 15, 14, 46, 16],
            [6, 147, 117, 4, 148, 118],
            [6, 73, 45, 14, 74, 46],
            [11, 54, 24, 16, 55, 25],
            [30, 46, 16, 2, 47, 17],
            [8, 132, 106, 4, 133, 107],
            [8, 75, 47, 13, 76, 48],
            [7, 54, 24, 22, 55, 25],
            [22, 45, 15, 13, 46, 16],
            [10, 142, 114, 2, 143, 115],
            [19, 74, 46, 4, 75, 47],
            [28, 50, 22, 6, 51, 23],
            [33, 46, 16, 4, 47, 17],
            [8, 152, 122, 4, 153, 123],
            [22, 73, 45, 3, 74, 46],
            [8, 53, 23, 26, 54, 24],
            [12, 45, 15, 28, 46, 16],
            [3, 147, 117, 10, 148, 118],
            [3, 73, 45, 23, 74, 46],
            [4, 54, 24, 31, 55, 25],
            [11, 45, 15, 31, 46, 16],
            [7, 146, 116, 7, 147, 117],
            [21, 73, 45, 7, 74, 46],
            [1, 53, 23, 37, 54, 24],
            [19, 45, 15, 26, 46, 16],
            [5, 145, 115, 10, 146, 116],
            [19, 75, 47, 10, 76, 48],
            [15, 54, 24, 25, 55, 25],
            [23, 45, 15, 25, 46, 16],
            [13, 145, 115, 3, 146, 116],
            [2, 74, 46, 29, 75, 47],
            [42, 54, 24, 1, 55, 25],
            [23, 45, 15, 28, 46, 16],
            [17, 145, 115],
            [10, 74, 46, 23, 75, 47],
            [10, 54, 24, 35, 55, 25],
            [19, 45, 15, 35, 46, 16],
            [17, 145, 115, 1, 146, 116],
            [14, 74, 46, 21, 75, 47],
            [29, 54, 24, 19, 55, 25],
            [11, 45, 15, 46, 46, 16],
            [13, 145, 115, 6, 146, 116],
            [14, 74, 46, 23, 75, 47],
            [44, 54, 24, 7, 55, 25],
            [59, 46, 16, 1, 47, 17],
            [12, 151, 121, 7, 152, 122],
            [12, 75, 47, 26, 76, 48],
            [39, 54, 24, 14, 55, 25],
            [22, 45, 15, 41, 46, 16],
            [6, 151, 121, 14, 152, 122],
            [6, 75, 47, 34, 76, 48],
            [46, 54, 24, 10, 55, 25],
            [2, 45, 15, 64, 46, 16],
            [17, 152, 122, 4, 153, 123],
            [29, 74, 46, 14, 75, 47],
            [49, 54, 24, 10, 55, 25],
            [24, 45, 15, 46, 46, 16],
            [4, 152, 122, 18, 153, 123],
            [13, 74, 46, 32, 75, 47],
            [48, 54, 24, 14, 55, 25],
            [42, 45, 15, 32, 46, 16],
            [20, 147, 117, 4, 148, 118],
            [40, 75, 47, 7, 76, 48],
            [43, 54, 24, 22, 55, 25],
            [10, 45, 15, 67, 46, 16],
            [19, 148, 118, 6, 149, 119],
            [18, 75, 47, 31, 76, 48],
            [34, 54, 24, 34, 55, 25],
            [20, 45, 15, 61, 46, 16],
          ]),
          t
        );
      })(),
      k = (function () {
        function e() {
          (this.length = 0), (this.buffer = []);
        }
        return (
          (e.prototype.getBuffer = function () {
            return this.buffer;
          }),
          (e.prototype.getLengthInBits = function () {
            return this.length;
          }),
          (e.prototype.getBit = function (e) {
            return 1 == ((this.buffer[(e / 8) >> 0] >>> (7 - (e % 8))) & 1);
          }),
          (e.prototype.put = function (e, t) {
            for (var d = 0; d < t; d++)
              this.putBit(1 == ((e >>> (t - d - 1)) & 1));
          }),
          (e.prototype.putBit = function (e) {
            this.length === 8 * this.buffer.length && this.buffer.push(0),
              e &&
                (this.buffer[(this.length / 8) >> 0] |=
                  128 >>> this.length % 8),
              this.length++;
          }),
          e
        );
      })(),
      B = (function () {
        function e() {}
        return (
          (e.prototype.writeBytes = function (e) {
            for (var t = e.length, d = 0; d < t; d++) this.writeByte(e[d]);
          }),
          (e.prototype.flush = function () {}),
          (e.prototype.close = function () {
            this.flush();
          }),
          e
        );
      })(),
      x = (function (e) {
        function t() {
          var t = (null !== e && e.apply(this, arguments)) || this;
          return (t.bytes = []), t;
        }
        return (
          n(t, e),
          (t.prototype.writeByte = function (e) {
            this.bytes.push(e);
          }),
          (t.prototype.toByteArray = function () {
            return this.bytes;
          }),
          t
        );
      })(B),
      P = (function (e) {
        function t(t) {
          var d = e.call(this) || this;
          return (
            (d.buffer = 0), (d.length = 0), (d.bufLength = 0), (d.stream = t), d
          );
        }
        return (
          n(t, e),
          (t.prototype.writeByte = function (e) {
            for (
              this.buffer = (this.buffer << 8) | (255 & e),
                this.bufLength += 8,
                this.length++;
              this.bufLength >= 6;

            )
              this.writeEncoded(this.buffer >>> (this.bufLength - 6)),
                (this.bufLength -= 6);
          }),
          (t.prototype.flush = function () {
            if (
              (this.bufLength > 0 &&
                (this.writeEncoded(this.buffer << (6 - this.bufLength)),
                (this.buffer = 0),
                (this.bufLength = 0)),
              this.length % 3 != 0)
            )
              for (var e = 3 - (this.length % 3), t = 0; t < e; t++)
                this.stream.writeByte(61);
          }),
          (t.prototype.writeEncoded = function (e) {
            this.stream.writeByte(
              (function (e) {
                if (e >= 0) {
                  if (e < 26) return 65 + e;
                  if (e < 52) return e - 26 + 97;
                  if (e < 62) return e - 52 + 48;
                  if (62 === e) return 43;
                  if (63 === e) return 47;
                }
                throw "illegal char: " + String.fromCharCode(e);
              })(63 & e)
            );
          }),
          t
        );
      })(B),
      S = (function () {
        function e() {
          (this.size = 0), (this.map = {});
        }
        return (
          (e.prototype.add = function (e) {
            this.contains(e) || (this.map[e] = this.size++);
          }),
          (e.prototype.getSize = function () {
            return this.size;
          }),
          (e.prototype.indexOf = function (e) {
            return this.map[e];
          }),
          (e.prototype.contains = function (e) {
            return this.map[e] >= 0;
          }),
          e
        );
      })(),
      A = (function () {
        function e(e) {
          (this.output = e), (this.bitLength = 0);
        }
        return (
          (e.prototype.write = function (e, t) {
            if (e >>> t != 0) throw "length overflow";
            for (; this.bitLength + t >= 8; )
              this.output.writeByte(
                255 & ((e << this.bitLength) | this.bitBuffer)
              ),
                (t -= 8 - this.bitLength),
                (e >>>= 8 - this.bitLength),
                (this.bitBuffer = 0),
                (this.bitLength = 0);
            (this.bitBuffer = (e << this.bitLength) | this.bitBuffer),
              (this.bitLength = this.bitLength + t);
          }),
          (e.prototype.flush = function () {
            this.bitLength > 0 && this.output.writeByte(this.bitBuffer),
              this.output.flush();
          }),
          (e.prototype.close = function () {
            this.flush(), this.output.close();
          }),
          e
        );
      })(),
      L = (function () {
        function e(e, t) {
          (this.data = []), (this.width = e), (this.height = t);
          for (var d = e * t, n = 0; n < d; n++) this.data[n] = 0;
        }
        return (
          (e.prototype.getLZWRaster = function (e) {
            for (
              var t = 1 << e, d = 1 + (1 << e), n = new S(), r = 0;
              r < t;
              r++
            )
              n.add(String.fromCharCode(r));
            n.add(String.fromCharCode(t)), n.add(String.fromCharCode(d));
            var o = new x(),
              i = new A(o),
              a = e + 1;
            try {
              i.write(t, a);
              for (
                var s = 0,
                  l = String.fromCharCode(this.data[s++]),
                  u = this.data.length;
                s < u;

              ) {
                var c = String.fromCharCode(this.data[s++]);
                n.contains(l + c)
                  ? (l += c)
                  : (i.write(n.indexOf(l), a),
                    n.getSize() < 4095 &&
                      (n.getSize() === 1 << a && a++, n.add(l + c)),
                    (l = c));
              }
              i.write(n.indexOf(l), a), i.write(d, a);
            } finally {
              i.close();
            }
            return o.toByteArray();
          }),
          (e.prototype.writeWord = function (e, t) {
            e.writeByte(255 & t), e.writeByte((t >>> 8) & 255);
          }),
          (e.prototype.writeBytes = function (e, t, d, n) {
            for (var r = 0; r < n; r++) e.writeByte(t[r + d]);
          }),
          (e.prototype.setPixel = function (e, t, d) {
            if (e < 0 || this.width <= e) throw "illegal x axis: " + e;
            if (t < 0 || this.height <= t) throw "illegal y axis: " + t;
            this.data[t * this.width + e] = d;
          }),
          (e.prototype.getPixel = function (e, t) {
            if (e < 0 || this.width <= e) throw "illegal x axis: " + e;
            if (t < 0 || this.height <= t) throw "illegal x axis: " + t;
            return this.data[t * this.width + e];
          }),
          (e.prototype.write = function (e) {
            e.writeByte(71),
              e.writeByte(73),
              e.writeByte(70),
              e.writeByte(56),
              e.writeByte(55),
              e.writeByte(97),
              this.writeWord(e, this.width),
              this.writeWord(e, this.height),
              e.writeByte(128),
              e.writeByte(0),
              e.writeByte(0),
              e.writeByte(0),
              e.writeByte(0),
              e.writeByte(0),
              e.writeByte(255),
              e.writeByte(255),
              e.writeByte(255),
              e.writeByte(44),
              this.writeWord(e, 0),
              this.writeWord(e, 0),
              this.writeWord(e, this.width),
              this.writeWord(e, this.height),
              e.writeByte(0);
            var t = this.getLZWRaster(2),
              d = t.length;
            e.writeByte(2);
            for (var n = 0; d - n > 255; )
              e.writeByte(255), this.writeBytes(e, t, n, 255), (n += 255);
            var r = d - n;
            e.writeByte(r),
              this.writeBytes(e, t, n, r),
              e.writeByte(0),
              e.writeByte(59);
          }),
          (e.prototype.toDataURL = function () {
            var e = new x();
            this.write(e);
            var t = (function (e) {
              var t = new x(),
                d = new P(t);
              return d.writeBytes(e), d.close(), t.close(), t.toByteArray();
            })(e.toByteArray());
            e.close();
            for (
              var d = "data:image/gif;base64,", n = t.length, r = 0;
              r < n;
              r++
            )
              d += String.fromCharCode(t[r]);
            return d;
          }),
          e
        );
      })();
    function T(e) {
      switch (e) {
        case 0:
          return function (e, t) {
            return 0 == ((e + t) & 1);
          };
        case 1:
          return function (e, t) {
            return 0 == (1 & t);
          };
        case 2:
          return function (e, t) {
            return e % 3 == 0;
          };
        case 3:
          return function (e, t) {
            return (e + t) % 3 == 0;
          };
        case 4:
          return function (e, t) {
            return 0 == ((((e / 3) >> 0) + ((t / 2) >> 0)) & 1);
          };
        case 5:
          return function (e, t) {
            return ((e * t) & 1) + ((e * t) % 3) == 0;
          };
        case 6:
          return function (e, t) {
            return 0 == ((((e * t) & 1) + ((e * t) % 3)) & 1);
          };
        case 7:
          return function (e, t) {
            return 0 == ((((e * t) % 3) + ((e + t) & 1)) & 1);
          };
        default:
          throw "illegal mask: " + e;
      }
    }
    var M = Object.prototype.toString;
    function I(t, d) {
      if (t < 0 || t >= 1e6) throw "byte mode encoding hint out of range";
      d.put(e.Mode.ECI, 4),
        t < 128
          ? d.put(t, 8)
          : t < 16384
          ? (d.put(2, 2), d.put(t, 14))
          : (d.put(6, 3), d.put(t, 21));
    }
    function E(t, d, n, r) {
      for (
        var o = r.length, i = new k(), a = w.getRSBlocks(t, d), s = 0;
        s < o;
        s++
      ) {
        var l = r[s],
          u = l.getMode();
        n && u === e.Mode.Byte && I(l.encoding, i),
          i.put(u, 4),
          i.put(l.getLength(), l.getLengthInBits(t)),
          l.write(i);
      }
      var c = 0,
        f = a.length;
      for (s = 0; s < f; s++) c += a[s].getDataCount();
      return [i, a, (c *= 8)];
    }
    var N = (function () {
        function t() {
          (this.version = 0),
            (this.chunks = []),
            (this.matrixSize = 0),
            (this.matrix = []),
            (this.encodingHint = !1),
            (this.auto = 0 === this.version),
            (this.errorCorrectionLevel = e.ErrorCorrectionLevel.L);
        }
        return (
          (t.prototype.getMatrix = function () {
            return this.matrix;
          }),
          (t.prototype.getMatrixSize = function () {
            return this.matrixSize;
          }),
          (t.prototype.getVersion = function () {
            return this.version;
          }),
          (t.prototype.setVersion = function (e) {
            return (
              (this.version = Math.min(40, Math.max(0, e >> 0))),
              (this.auto = 0 === this.version),
              this
            );
          }),
          (t.prototype.getErrorCorrectionLevel = function () {
            return this.errorCorrectionLevel;
          }),
          (t.prototype.setErrorCorrectionLevel = function (t) {
            switch (t) {
              case e.ErrorCorrectionLevel.L:
              case e.ErrorCorrectionLevel.M:
              case e.ErrorCorrectionLevel.Q:
              case e.ErrorCorrectionLevel.H:
                this.errorCorrectionLevel = t;
            }
            return this;
          }),
          (t.prototype.getEncodingHint = function () {
            return this.encodingHint;
          }),
          (t.prototype.setEncodingHint = function (e) {
            return (this.encodingHint = e), this;
          }),
          (t.prototype.write = function (e) {
            if (e instanceof i) this.chunks.push(e);
            else {
              if ("[object String]" !== M.call(e)) throw "illegal data: " + e;
              this.chunks.push(new a(e));
            }
            return this;
          }),
          (t.prototype.isDark = function (e, t) {
            return null !== this.matrix[e][t] && this.matrix[e][t];
          }),
          (t.prototype.setupFinderPattern = function (e, t) {
            for (var d = this.matrixSize, n = -1; n <= 7; n++)
              for (var r = -1; r <= 7; r++)
                e + n <= -1 ||
                  d <= e + n ||
                  t + r <= -1 ||
                  d <= t + r ||
                  (this.matrix[e + n][t + r] =
                    (0 <= n && n <= 6 && (0 === r || 6 === r)) ||
                    (0 <= r && r <= 6 && (0 === n || 6 === n)) ||
                    (2 <= n && n <= 4 && 2 <= r && r <= 4));
          }),
          (t.prototype.setupAlignmentPattern = function () {
            for (var e = p[this.version - 1], t = e.length, d = 0; d < t; d++)
              for (var n = 0; n < t; n++) {
                var r = e[d],
                  o = e[n];
                if (null === this.matrix[r][o])
                  for (var i = -2; i <= 2; i++)
                    for (var a = -2; a <= 2; a++)
                      this.matrix[r + i][o + a] =
                        -2 === i ||
                        2 === i ||
                        -2 === a ||
                        2 === a ||
                        (0 === i && 0 === a);
              }
          }),
          (t.prototype.setupTimingPattern = function () {
            for (var e = this.matrixSize - 8, t = 8; t < e; t++) {
              var d = t % 2 == 0;
              null === this.matrix[t][6] && (this.matrix[t][6] = d),
                null === this.matrix[6][t] && (this.matrix[6][t] = d);
            }
          }),
          (t.prototype.setupFormatInfo = function (e) {
            for (
              var t = (function (e) {
                  for (var t = e << 10; g(t) - y >= 0; )
                    t ^= 1335 << (g(t) - y);
                  return 21522 ^ ((e << 10) | t);
                })((this.errorCorrectionLevel << 3) | e),
                d = this.matrixSize,
                n = 0;
              n < 15;
              n++
            ) {
              var r = 1 == ((t >> n) & 1);
              n < 6
                ? (this.matrix[n][8] = r)
                : n < 8
                ? (this.matrix[n + 1][8] = r)
                : (this.matrix[d - 15 + n][8] = r),
                n < 8
                  ? (this.matrix[8][d - n - 1] = r)
                  : n < 9
                  ? (this.matrix[8][15 - n - 1 + 1] = r)
                  : (this.matrix[8][15 - n - 1] = r);
            }
            this.matrix[d - 8][8] = !0;
          }),
          (t.prototype.setupVersionInfo = function () {
            if (this.version >= 7)
              for (
                var e = this.matrixSize,
                  t = (function (e) {
                    for (var t = e << 12; g(t) - v >= 0; )
                      t ^= 7973 << (g(t) - v);
                    return (e << 12) | t;
                  })(this.version),
                  d = 0;
                d < 18;
                d++
              ) {
                var n = 1 == ((t >> d) & 1);
                (this.matrix[(d / 3) >> 0][(d % 3) + e - 8 - 3] = n),
                  (this.matrix[(d % 3) + e - 8 - 3][(d / 3) >> 0] = n);
              }
          }),
          (t.prototype.setupCodewords = function (e, t) {
            for (
              var d = this.matrixSize,
                n = e.getLengthInBits(),
                r = 0,
                o = d - 1;
              o >= 1;
              o -= 2
            ) {
              6 === o && (o = 5);
              for (var i = 0; i < d; i++)
                for (var a = 0; a < 2; a++) {
                  var s = o - a,
                    l = 0 == ((o + 1) & 2) ? d - 1 - i : i;
                  if (null === this.matrix[l][s]) {
                    var u = !1;
                    r < n && (u = e.getBit(r++)),
                      T(t)(s, l) && (u = !u),
                      (this.matrix[l][s] = u);
                  }
                }
            }
          }),
          (t.prototype.buildMatrix = function (e, t) {
            this.matrix = [];
            for (var d = this.matrixSize, n = 0; n < d; n++) {
              this.matrix[n] = [];
              for (var r = 0; r < d; r++) this.matrix[n][r] = null;
            }
            this.setupFinderPattern(0, 0),
              this.setupFinderPattern(d - 7, 0),
              this.setupFinderPattern(0, d - 7),
              this.setupAlignmentPattern(),
              this.setupTimingPattern(),
              this.setupFormatInfo(t),
              this.setupVersionInfo(),
              this.setupCodewords(e, t);
          }),
          (t.prototype.make = function () {
            var e,
              t,
              d,
              n,
              r,
              o,
              i = this.chunks,
              a = this.errorCorrectionLevel;
            if (this.auto)
              for (
                this.version = 1;
                this.version <= 40 &&
                ((n = (e = E(this.version, a, this.encodingHint, i))[1]),
                (r = e[2]),
                !((d = e[0]).getLengthInBits() <= r));
                this.version++
              );
            else
              (d = (t = E(this.version, a, this.encodingHint, i))[0]),
                (n = t[1]),
                (r = t[2]);
            this.matrixSize = 4 * this.version + 17;
            for (
              var s = [],
                l = (function (e, t, d) {
                  if (e.getLengthInBits() > d)
                    throw "data overflow: " + e.getLengthInBits() + " > " + d;
                  for (
                    e.getLengthInBits() + 4 <= d && e.put(0, 4);
                    e.getLengthInBits() % 8 != 0;

                  )
                    e.putBit(!1);
                  for (
                    ;
                    !(
                      e.getLengthInBits() >= d ||
                      (e.put(236, 8), e.getLengthInBits() >= d)
                    );

                  )
                    e.put(17, 8);
                  return (function (e, t) {
                    for (
                      var d = 0,
                        n = 0,
                        r = 0,
                        o = [],
                        i = [],
                        a = t.length,
                        s = e.getBuffer(),
                        l = 0;
                      l < a;
                      l++
                    ) {
                      var u = t[l],
                        c = u.getDataCount(),
                        f = u.getTotalCount() - c;
                      (n = Math.max(n, c)), (r = Math.max(r, f)), (o[l] = []);
                      for (var $ = 0; $ < c; $++) o[l][$] = 255 & s[$ + d];
                      d += c;
                      var p = m(f),
                        g = p.getLength() - 1,
                        v = new h(o[l], g).mod(p),
                        y = v.getLength();
                      for (i[l] = [], $ = 0; $ < g; $++) {
                        var C = $ + y - g;
                        i[l][$] = C >= 0 ? v.getAt(C) : 0;
                      }
                    }
                    for (e = new k(), $ = 0; $ < n; $++)
                      for (l = 0; l < a; l++)
                        $ < o[l].length && e.put(o[l][$], 8);
                    for ($ = 0; $ < r; $++)
                      for (l = 0; l < a; l++)
                        $ < i[l].length && e.put(i[l][$], 8);
                    return e;
                  })(e, t);
                })(d, n, r),
                u = -1,
                c = Number.MAX_VALUE,
                f = 0;
              f < 8;
              f++
            ) {
              this.buildMatrix(l, f), s.push(this.matrix);
              var $ =
                (function (e) {
                  return C(e, !0) + C(e, !1);
                })((o = this)) +
                (function (e) {
                  for (var t = e.getMatrixSize(), d = 0, n = 0; n < t - 1; n++)
                    for (var r = 0; r < t - 1; r++) {
                      var o = e.isDark(n, r);
                      o === e.isDark(n, r + 1) &&
                        o === e.isDark(n + 1, r) &&
                        o === e.isDark(n + 1, r + 1) &&
                        (d += 3);
                    }
                  return d;
                })(o) +
                (function (e) {
                  for (var t = e.getMatrixSize(), d = 0, n = 0; n < t; n++)
                    for (var r = 0; r < t; r++)
                      r + 6 < t &&
                        e.isDark(n, r) &&
                        !e.isDark(n, r + 1) &&
                        e.isDark(n, r + 2) &&
                        e.isDark(n, r + 3) &&
                        e.isDark(n, r + 4) &&
                        !e.isDark(n, r + 5) &&
                        e.isDark(n, r + 6) &&
                        (b(e, n, r - 4, r, !0) || b(e, n, r + 7, r + 11, !0)) &&
                        (d += 40),
                        n + 6 < t &&
                          e.isDark(n, r) &&
                          !e.isDark(n + 1, r) &&
                          e.isDark(n + 2, r) &&
                          e.isDark(n + 3, r) &&
                          e.isDark(n + 4, r) &&
                          !e.isDark(n + 5, r) &&
                          e.isDark(n + 6, r) &&
                          (b(e, r, n - 4, n, !1) ||
                            b(e, r, n + 7, n + 11, !1)) &&
                          (d += 40);
                  return d;
                })(o) +
                (function (e) {
                  for (var t = e.getMatrixSize(), d = 0, n = 0; n < t; n++)
                    for (var r = 0; r < t; r++) e.isDark(n, r) && d++;
                  var o = t * t;
                  return 10 * Math.floor(Math.abs(20 * d - 10 * o) / o);
                })(o);
              $ < c && ((c = $), (u = f));
            }
            return (this.matrix = s[u]), this;
          }),
          (t.prototype.toDataURL = function (e, t) {
            void 0 === e && (e = 2),
              void 0 === t && (t = 4 * e),
              (e = Math.max(1, e >> 0)),
              (t = Math.max(0, t >> 0));
            for (
              var d = e * this.matrixSize + 2 * t, n = new L(d, d), r = 0;
              r < d;
              r++
            )
              for (var o = 0; o < d; o++)
                t <= o &&
                o < d - t &&
                t <= r &&
                r < d - t &&
                this.isDark(((r - t) / e) >> 0, ((o - t) / e) >> 0)
                  ? n.setPixel(o, r, 0)
                  : n.setPixel(o, r, 1);
            return n.toDataURL();
          }),
          t
        );
      })(),
      _ = 0.5,
      D = 1.5,
      O = 4;
    function R(e, t) {
      return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
    }
    function F(e) {
      return e.reduce(function (e, t) {
        return e + t;
      });
    }
    function j(e, t, d, n) {
      var r,
        o,
        i,
        a,
        s = [{ x: Math.floor(e.x), y: Math.floor(e.y) }],
        l = Math.abs(t.y - e.y) > Math.abs(t.x - e.x);
      l
        ? ((r = Math.floor(e.y)),
          (o = Math.floor(e.x)),
          (i = Math.floor(t.y)),
          (a = Math.floor(t.x)))
        : ((r = Math.floor(e.x)),
          (o = Math.floor(e.y)),
          (i = Math.floor(t.x)),
          (a = Math.floor(t.y)));
      for (
        var u = Math.abs(i - r),
          c = Math.abs(a - o),
          f = r < i ? 1 : -1,
          h = o < a ? 1 : -1,
          $ = !0,
          p = Math.floor(-u / 2),
          m = r,
          g = o;
        m !== i + f;
        m += f
      ) {
        var v = l ? g : m,
          y = l ? m : g;
        if (
          d.get(v, y) !== $ &&
          (($ = !$), s.push({ x: v, y: y }), s.length === n + 1)
        )
          break;
        if ((p += c) > 0) {
          if (g === a) break;
          (g += h), (p -= u);
        }
      }
      for (var C = [], b = 0; b < n; b++)
        C.push(s[b] && s[b + 1] ? R(s[b], s[b + 1]) : 0);
      return C;
    }
    function G(e, t, d, n) {
      var r,
        o = t.y - e.y,
        i = t.x - e.x,
        a = j(e, t, d, Math.ceil(n / 2)),
        s = j(e, { x: e.x - i, y: e.y - o }, d, Math.ceil(n / 2)),
        l = a.shift() + s.shift() - 1;
      return (r = s.concat(l)).concat.apply(r, a);
    }
    function U(e, t) {
      var d = F(e) / F(t),
        n = 0;
      return (
        t.forEach(function (t, r) {
          n += Math.pow(e[r] - t * d, 2);
        }),
        { averageSize: d, error: n }
      );
    }
    function H(e, t, d) {
      try {
        var n = G(e, { x: -1, y: e.y }, d, t.length),
          r = G(e, { x: e.x, y: -1 }, d, t.length),
          o = G(
            e,
            { x: Math.max(0, e.x - e.y) - 1, y: Math.max(0, e.y - e.x) - 1 },
            d,
            t.length
          ),
          i = G(
            e,
            {
              x: Math.min(d.width, e.x + e.y) + 1,
              y: Math.min(d.height, e.y + e.x) + 1,
            },
            d,
            t.length
          ),
          a = U(n, t),
          s = U(r, t),
          l = U(o, t),
          u = U(i, t),
          c = Math.sqrt(
            a.error * a.error +
              s.error * s.error +
              l.error * l.error +
              u.error * u.error
          ),
          f =
            (a.averageSize + s.averageSize + l.averageSize + u.averageSize) / 4;
        return (
          c +
          (Math.pow(a.averageSize - f, 2) +
            Math.pow(s.averageSize - f, 2) +
            Math.pow(l.averageSize - f, 2) +
            Math.pow(u.averageSize - f, 2)) /
            f
        );
      } catch (e) {
        return 1 / 0;
      }
    }
    function z(e, t) {
      for (var d = Math.round(t.x); e.get(d, Math.round(t.y)); ) d--;
      for (var n = Math.round(t.x); e.get(n, Math.round(t.y)); ) n++;
      for (var r = (d + n) / 2, o = Math.round(t.y); e.get(Math.round(r), o); )
        o--;
      for (var i = Math.round(t.y); e.get(Math.round(r), i); ) i++;
      return { x: r, y: (o + i) / 2 };
    }
    function W(e, t, d, n, r) {
      var o, i, a;
      try {
        (o = (function (e, t, d, n) {
          var r =
            (F(G(e, d, n, 5)) / 7 +
              F(G(e, t, n, 5)) / 7 +
              F(G(d, e, n, 5)) / 7 +
              F(G(t, e, n, 5)) / 7) /
            4;
          if (r < 1) throw "invalid module size";
          var o = Math.round(R(e, t) / r),
            i = Math.round(R(e, d) / r),
            a = Math.floor((o + i) / 2) + 7;
          switch (a % 4) {
            case 0:
              a++;
              break;
            case 2:
              a--;
          }
          return { dimension: a, moduleSize: r };
        })(n, d, r, e)),
          (i = o.dimension),
          (a = o.moduleSize);
      } catch (e) {
        return null;
      }
      var s = d.x - n.x + r.x,
        l = d.y - n.y + r.y,
        u = (R(n, r) + R(n, d)) / 2 / a,
        c = 1 - 3 / u,
        f = { x: n.x + c * (s - n.x), y: n.y + c * (l - n.y) },
        h = t
          .map(function (t) {
            var d =
                (t.top.startX + t.top.endX + t.bottom.startX + t.bottom.endX) /
                4,
              n = (t.top.y + t.bottom.y + 1) / 2;
            if (e.get(Math.floor(d), Math.floor(n)))
              return {
                x: d,
                y: n,
                score:
                  H({ x: Math.floor(d), y: Math.floor(n) }, [1, 1, 1], e) +
                  R({ x: d, y: n }, f),
              };
          })
          .filter(function (e) {
            return !!e;
          })
          .sort(function (e, t) {
            return e.score - t.score;
          });
      return { alignmentPattern: u >= 15 && h.length ? h[0] : f, dimension: i };
    }
    var K = (function () {
      function e(e, t) {
        if (0 === t.length) throw "no coefficients";
        this.field = e;
        var d = t.length;
        if (d > 1 && 0 === t[0]) {
          for (var n = 1; n < d && 0 === t[n]; ) n++;
          if (n === d) this.coefficients = e.zero.coefficients;
          else {
            this.coefficients = new Uint8ClampedArray(d - n);
            for (var r = 0; r < this.coefficients.length; r++)
              this.coefficients[r] = t[n + r];
          }
        } else this.coefficients = t;
      }
      return (
        (e.prototype.degree = function () {
          return this.coefficients.length - 1;
        }),
        (e.prototype.isZero = function () {
          return 0 === this.coefficients[0];
        }),
        (e.prototype.getCoefficient = function (e) {
          return this.coefficients[this.coefficients.length - 1 - e];
        }),
        (e.prototype.addOrSubtract = function (t) {
          var d;
          if (this.isZero()) return t;
          if (t.isZero()) return this;
          var n = this.coefficients,
            r = t.coefficients;
          n.length > r.length && ((n = (d = [r, n])[0]), (r = d[1]));
          for (
            var o = new Uint8ClampedArray(r.length),
              i = r.length - n.length,
              a = 0;
            a < i;
            a++
          )
            o[a] = r[a];
          for (a = i; a < r.length; a++) o[a] = q(n[a - i], r[a]);
          return new e(this.field, o);
        }),
        (e.prototype.multiply = function (t) {
          if (0 === t) return this.field.zero;
          if (1 === t) return this;
          for (
            var d = this.coefficients.length,
              n = new Uint8ClampedArray(d),
              r = 0;
            r < d;
            r++
          )
            n[r] = this.field.multiply(this.coefficients[r], t);
          return new e(this.field, n);
        }),
        (e.prototype.multiplyPoly = function (t) {
          if (this.isZero() || t.isZero()) return this.field.zero;
          for (
            var d = this.coefficients,
              n = d.length,
              r = t.coefficients,
              o = r.length,
              i = new Uint8ClampedArray(n + o - 1),
              a = 0;
            a < n;
            a++
          )
            for (var s = d[a], l = 0; l < o; l++)
              i[a + l] = q(i[a + l], this.field.multiply(s, r[l]));
          return new e(this.field, i);
        }),
        (e.prototype.multiplyByMonomial = function (t, d) {
          if (t < 0) throw "invalid degree less than 0";
          if (0 === d) return this.field.zero;
          for (
            var n = this.coefficients.length,
              r = new Uint8ClampedArray(n + t),
              o = 0;
            o < n;
            o++
          )
            r[o] = this.field.multiply(this.coefficients[o], d);
          return new e(this.field, r);
        }),
        (e.prototype.evaluateAt = function (e) {
          var t = 0;
          if (0 === e) return this.getCoefficient(0);
          var d = this.coefficients.length;
          if (1 === e)
            return (
              this.coefficients.forEach(function (e) {
                t = q(t, e);
              }),
              t
            );
          t = this.coefficients[0];
          for (var n = 1; n < d; n++)
            t = q(this.field.multiply(e, t), this.coefficients[n]);
          return t;
        }),
        e
      );
    })();
    function q(e, t) {
      return e ^ t;
    }
    var V = (function () {
      function e(e, t, d) {
        (this.primitive = e),
          (this.size = t),
          (this.generatorBase = d),
          (this.expTable = []),
          (this.logTable = []);
        for (var n = 1, r = 0; r < this.size; r++)
          (this.logTable[r] = 0),
            (this.expTable[r] = n),
            (n *= 2) >= this.size &&
              (n = (n ^ this.primitive) & (this.size - 1));
        for (r = 0; r < this.size - 1; r++) this.logTable[this.expTable[r]] = r;
        (this.zero = new K(this, Uint8ClampedArray.from([0]))),
          (this.one = new K(this, Uint8ClampedArray.from([1])));
      }
      return (
        (e.prototype.multiply = function (e, t) {
          return 0 === e || 0 === t
            ? 0
            : this.expTable[
                (this.logTable[e] + this.logTable[t]) % (this.size - 1)
              ];
        }),
        (e.prototype.inverse = function (e) {
          if (0 === e) throw "can't invert 0";
          return this.expTable[this.size - this.logTable[e] - 1];
        }),
        (e.prototype.buildMonomial = function (e, t) {
          if (e < 0) throw "invalid monomial degree less than 0";
          if (0 === t) return this.zero;
          var d = new Uint8ClampedArray(e + 1);
          return (d[0] = t), new K(this, d);
        }),
        (e.prototype.log = function (e) {
          if (0 === e) throw "can't take log(0)";
          return this.logTable[e];
        }),
        (e.prototype.exp = function (e) {
          return this.expTable[e];
        }),
        e
      );
    })();
    function X(e, t) {
      var d = new Uint8ClampedArray(e.length);
      d.set(e);
      for (
        var n = new V(285, 256, 0),
          r = new K(n, d),
          o = new Uint8ClampedArray(t),
          i = !1,
          a = 0;
        a < t;
        a++
      ) {
        var s = r.evaluateAt(n.exp(a + n.generatorBase));
        (o[o.length - 1 - a] = s), 0 !== s && (i = !0);
      }
      if (!i) return d;
      var l = new K(n, o),
        u = (function (e, t, d, n) {
          var r;
          t.degree() < d.degree() && ((t = (r = [d, t])[0]), (d = r[1]));
          for (var o = t, i = d, a = e.zero, s = e.one; i.degree() >= n / 2; ) {
            var l = o,
              u = a;
            if (((a = s), (o = i).isZero())) return null;
            i = l;
            for (
              var c = e.zero,
                f = o.getCoefficient(o.degree()),
                h = e.inverse(f);
              i.degree() >= o.degree() && !i.isZero();

            ) {
              var $ = i.degree() - o.degree(),
                p = e.multiply(i.getCoefficient(i.degree()), h);
              (c = c.addOrSubtract(e.buildMonomial($, p))),
                (i = i.addOrSubtract(o.multiplyByMonomial($, p)));
            }
            if (
              ((s = c.multiplyPoly(a).addOrSubtract(u)),
              i.degree() >= o.degree())
            )
              return null;
          }
          var m = s.getCoefficient(0);
          if (0 === m) return null;
          var g = e.inverse(m);
          return [s.multiply(g), i.multiply(g)];
        })(n, n.buildMonomial(t, 1), l, t);
      if (null === u) return null;
      var c = (function (e, t) {
        var d = t.degree();
        if (1 === d) return [t.getCoefficient(1)];
        for (var n = 0, r = new Array(d), o = 1; o < e.size && n < d; o++)
          0 === t.evaluateAt(o) && ((r[n] = e.inverse(o)), n++);
        return n !== d ? null : r;
      })(n, u[0]);
      if (null == c) return null;
      for (
        var f = (function (e, t, d) {
            for (var n = d.length, r = new Array(n), o = 0; o < n; o++) {
              for (var i = 1, a = e.inverse(d[o]), s = 0; s < n; s++)
                o !== s && (i = e.multiply(i, q(1, e.multiply(d[s], a))));
              (r[o] = e.multiply(t.evaluateAt(a), e.inverse(i))),
                0 !== e.generatorBase && (r[o] = e.multiply(r[o], a));
            }
            return r;
          })(n, u[1], c),
          h = 0;
        h < c.length;
        h++
      ) {
        var $ = d.length - 1 - n.log(c[h]);
        if ($ < 0) return null;
        d[$] = q(d[$], f[h]);
      }
      return d;
    }
    var Z,
      J = (function () {
        function e(e, t) {
          (this.data = e), (this.width = t), (this.height = e.length / t);
        }
        return (
          (e.createEmpty = function (t, d) {
            return new e(new Uint8ClampedArray(t * d), t);
          }),
          (e.prototype.get = function (e, t) {
            return !(
              e < 0 ||
              e >= this.width ||
              t < 0 ||
              t >= this.height ||
              !this.data[t * this.width + e]
            );
          }),
          (e.prototype.set = function (e, t, d) {
            this.data[t * this.width + e] = d ? 1 : 0;
          }),
          (e.prototype.setRegion = function (e, t, d, n, r) {
            for (var o = t; o < t + n; o++)
              for (var i = e; i < e + d; i++) this.set(i, o, !!r);
          }),
          e
        );
      })(),
      Y = (function () {
        function e(e) {
          (this.byteOffset = 0), (this.bitOffset = 0), (this.bytes = e);
        }
        return (
          (e.prototype.readBits = function (e) {
            if (e < 1 || e > 32 || e > this.available())
              throw "can't read " + e + " bits";
            var t = 0;
            if (this.bitOffset > 0) {
              var d = 8 - this.bitOffset,
                n = e < d ? e : d;
              (t =
                (this.bytes[this.byteOffset] &
                  ((255 >> (8 - n)) << (r = d - n))) >>
                r),
                (e -= n),
                (this.bitOffset += n),
                8 === this.bitOffset &&
                  ((this.bitOffset = 0), this.byteOffset++);
            }
            if (e > 0) {
              for (; e >= 8; )
                (t = (t << 8) | (255 & this.bytes[this.byteOffset])),
                  this.byteOffset++,
                  (e -= 8);
              var r;
              e > 0 &&
                ((t =
                  (t << e) |
                  ((this.bytes[this.byteOffset] &
                    ((255 >> (r = 8 - e)) << r)) >>
                    r)),
                (this.bitOffset += e));
            }
            return t;
          }),
          (e.prototype.available = function () {
            return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
          }),
          e
        );
      })(),
      Q = [
        [
          33088,
          "\u3000\u3001\u3002\uff0c\uff0e\u30fb\uff1a\uff1b\uff1f\uff01\u309b\u309c\xb4\uff40\xa8\uff3e\uffe3\uff3f\u30fd\u30fe\u309d\u309e\u3003\u4edd\u3005\u3006\u3007\u30fc\u2015\u2010\uff0f\uff3c\uff5e\u2225\uff5c\u2026\u2025\u2018\u2019\u201c\u201d\uff08\uff09\u3014\u3015\uff3b\uff3d\uff5b\uff5d\u3008\u3009\u300a\u300b\u300c\u300d\u300e\u300f\u3010\u3011\uff0b\uff0d\xb1\xd7",
        ],
        [33152, "\xf7\uff1d\u2260\uff1c\uff1e"],
        [
          33167,
          "\uffe5\uff04\uffe0\uffe1\uff05\uff03\uff06\uff0a\uff20\xa7\u2606\u2605",
        ],
        [33190, "\u203b\u3012\u2192\u2190\u2191\u2193\u3013"],
        [33226, "\uffe2"],
        [33359, "\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19"],
        [
          33376,
          "\uff21\uff22\uff23\uff24\uff25\uff26\uff27\uff28\uff29\uff2a\uff2b\uff2c\uff2d\uff2e\uff2f\uff30\uff31\uff32\uff33\uff34\uff35\uff36\uff37\uff38\uff39\uff3a",
        ],
        [
          33409,
          "\uff41\uff42\uff43\uff44\uff45\uff46\uff47\uff48\uff49\uff4a\uff4b\uff4c\uff4d\uff4e\uff4f\uff50\uff51\uff52\uff53\uff54\uff55\uff56\uff57\uff58\uff59\uff5a",
        ],
        [
          33439,
          "\u3041\u3042\u3043\u3044\u3045\u3046\u3047\u3048\u3049\u304a\u304b\u304c\u304d\u304e\u304f\u3050\u3051\u3052\u3053\u3054\u3055\u3056\u3057\u3058\u3059\u305a\u305b\u305c\u305d\u305e\u305f\u3060\u3061\u3062\u3063\u3064\u3065\u3066\u3067\u3068\u3069\u306a\u306b\u306c\u306d\u306e\u306f\u3070\u3071\u3072\u3073\u3074\u3075\u3076\u3077\u3078\u3079\u307a\u307b\u307c\u307d\u307e\u307f\u3080\u3081\u3082\u3083\u3084\u3085\u3086\u3087\u3088\u3089\u308a\u308b\u308c\u308d\u308e\u308f\u3090\u3091\u3092\u3093",
        ],
        [
          33600,
          "\u30a1\u30a2\u30a3\u30a4\u30a5\u30a6\u30a7\u30a8\u30a9\u30aa\u30ab\u30ac\u30ad\u30ae\u30af\u30b0\u30b1\u30b2\u30b3\u30b4\u30b5\u30b6\u30b7\u30b8\u30b9\u30ba\u30bb\u30bc\u30bd\u30be\u30bf\u30c0\u30c1\u30c2\u30c3\u30c4\u30c5\u30c6\u30c7\u30c8\u30c9\u30ca\u30cb\u30cc\u30cd\u30ce\u30cf\u30d0\u30d1\u30d2\u30d3\u30d4\u30d5\u30d6\u30d7\u30d8\u30d9\u30da\u30db\u30dc\u30dd\u30de\u30df",
        ],
        [
          33664,
          "\u30e0\u30e1\u30e2\u30e3\u30e4\u30e5\u30e6\u30e7\u30e8\u30e9\u30ea\u30eb\u30ec\u30ed\u30ee\u30ef\u30f0\u30f1\u30f2\u30f3\u30f4\u30f5\u30f6",
        ],
        [
          33695,
          "\u0391\u0392\u0393\u0394\u0395\u0396\u0397\u0398\u0399\u039a\u039b\u039c\u039d\u039e\u039f\u03a0\u03a1\u03a3\u03a4\u03a5\u03a6\u03a7\u03a8\u03a9",
        ],
        [
          33727,
          "\u03b1\u03b2\u03b3\u03b4\u03b5\u03b6\u03b7\u03b8\u03b9\u03ba\u03bb\u03bc\u03bd\u03be\u03bf\u03c0\u03c1\u03c3\u03c4\u03c5\u03c6\u03c7\u03c8\u03c9",
        ],
        [
          33856,
          "\u0410\u0411\u0412\u0413\u0414\u0415\u0401\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042b\u042c\u042d\u042e\u042f",
        ],
        [
          33904,
          "\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d",
        ],
        [
          33920,
          "\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044b\u044c\u044d\u044e\u044f",
        ],
        [34688, "\u301d\u301f"],
        [
          35136,
          "\u9662\u9670\u96a0\u97fb\u540b\u53f3\u5b87\u70cf\u7fbd\u8fc2\u96e8\u536f\u9d5c\u7aba\u4e11\u7893\u81fc\u6e26\u5618\u5504\u6b1d\u851a\u9c3b\u59e5\u53a9\u6d66\u74dc\u958f\u5642\u4e91\u904b\u96f2\u834f\u990c\u53e1\u55b6\u5b30\u5f71\u6620\u66f3\u6804\u6c38\u6cf3\u6d29\u745b\u76c8\u7a4e\u9834\u82f1\u885b\u8a60\u92ed\u6db2\u75ab\u76ca\u99c5\u60a6\u8b01\u8d8a\u95b2\u698e\u53ad\u5186",
        ],
        [
          35200,
          "\u5712\u5830\u5944\u5bb4\u5ef6\u6028\u63a9\u63f4\u6cbf\u6f14\u708e\u7114\u7159\u71d5\u733f\u7e01\u8276\u82d1\u8597\u9060\u925b\u9d1b\u5869\u65bc\u6c5a\u7525\u51f9\u592e\u5965\u5f80\u5fdc\u62bc\u65fa\u6a2a\u6b27\u6bb4\u738b\u7fc1\u8956\u9d2c\u9d0e\u9ec4\u5ca1\u6c96\u837b\u5104\u5c4b\u61b6\u81c6\u6876\u7261\u4e59\u4ffa\u5378\u6069\u6e29\u7a4f\u97f3\u4e0b\u5316\u4eee\u4f55\u4f3d\u4fa1\u4f73\u52a0\u53ef\u5609\u590f\u5ac1\u5bb6\u5be1\u79d1\u6687\u679c\u67b6\u6b4c\u6cb3\u706b\u73c2\u798d\u79be\u7a3c\u7b87\u82b1\u82db\u8304\u8377\u83ef\u83d3\u8766\u8ab2\u5629\u8ca8\u8fe6\u904e\u971e\u868a\u4fc4\u5ce8\u6211\u7259\u753b\u81e5\u82bd\u86fe\u8cc0\u96c5\u9913\u99d5\u4ecb\u4f1a\u89e3\u56de\u584a\u58ca\u5efb\u5feb\u602a\u6094\u6062\u61d0\u6212\u62d0\u6539",
        ],
        [
          35392,
          "\u9b41\u6666\u68b0\u6d77\u7070\u754c\u7686\u7d75\u82a5\u87f9\u958b\u968e\u8c9d\u51f1\u52be\u5916\u54b3\u5bb3\u5d16\u6168\u6982\u6daf\u788d\u84cb\u8857\u8a72\u93a7\u9ab8\u6d6c\u99a8\u86d9\u57a3\u67ff\u86ce\u920e\u5283\u5687\u5404\u5ed3\u62e1\u64b9\u683c\u6838\u6bbb\u7372\u78ba\u7a6b\u899a\u89d2\u8d6b\u8f03\u90ed\u95a3\u9694\u9769\u5b66\u5cb3\u697d\u984d\u984e\u639b\u7b20\u6a2b",
        ],
        [
          35456,
          "\u6a7f\u68b6\u9c0d\u6f5f\u5272\u559d\u6070\u62ec\u6d3b\u6e07\u6ed1\u845b\u8910\u8f44\u4e14\u9c39\u53f6\u691b\u6a3a\u9784\u682a\u515c\u7ac3\u84b2\u91dc\u938c\u565b\u9d28\u6822\u8305\u8431\u7ca5\u5208\u82c5\u74e6\u4e7e\u4f83\u51a0\u5bd2\u520a\u52d8\u52e7\u5dfb\u559a\u582a\u59e6\u5b8c\u5b98\u5bdb\u5e72\u5e79\u60a3\u611f\u6163\u61be\u63db\u6562\u67d1\u6853\u68fa\u6b3e\u6b53\u6c57\u6f22\u6f97\u6f45\u74b0\u7518\u76e3\u770b\u7aff\u7ba1\u7c21\u7de9\u7f36\u7ff0\u809d\u8266\u839e\u89b3\u8acc\u8cab\u9084\u9451\u9593\u9591\u95a2\u9665\u97d3\u9928\u8218\u4e38\u542b\u5cb8\u5dcc\u73a9\u764c\u773c\u5ca9\u7feb\u8d0b\u96c1\u9811\u9854\u9858\u4f01\u4f0e\u5371\u559c\u5668\u57fa\u5947\u5b09\u5bc4\u5c90\u5e0c\u5e7e\u5fcc\u63ee\u673a\u65d7\u65e2\u671f\u68cb\u68c4",
        ],
        [
          35648,
          "\u6a5f\u5e30\u6bc5\u6c17\u6c7d\u757f\u7948\u5b63\u7a00\u7d00\u5fbd\u898f\u8a18\u8cb4\u8d77\u8ecc\u8f1d\u98e2\u9a0e\u9b3c\u4e80\u507d\u5100\u5993\u5b9c\u622f\u6280\u64ec\u6b3a\u72a0\u7591\u7947\u7fa9\u87fb\u8abc\u8b70\u63ac\u83ca\u97a0\u5409\u5403\u55ab\u6854\u6a58\u8a70\u7827\u6775\u9ecd\u5374\u5ba2\u811a\u8650\u9006\u4e18\u4e45\u4ec7\u4f11\u53ca\u5438\u5bae\u5f13\u6025\u6551",
        ],
        [
          35712,
          "\u673d\u6c42\u6c72\u6ce3\u7078\u7403\u7a76\u7aae\u7b08\u7d1a\u7cfe\u7d66\u65e7\u725b\u53bb\u5c45\u5de8\u62d2\u62e0\u6319\u6e20\u865a\u8a31\u8ddd\u92f8\u6f01\u79a6\u9b5a\u4ea8\u4eab\u4eac\u4f9b\u4fa0\u50d1\u5147\u7af6\u5171\u51f6\u5354\u5321\u537f\u53eb\u55ac\u5883\u5ce1\u5f37\u5f4a\u602f\u6050\u606d\u631f\u6559\u6a4b\u6cc1\u72c2\u72ed\u77ef\u80f8\u8105\u8208\u854e\u90f7\u93e1\u97ff\u9957\u9a5a\u4ef0\u51dd\u5c2d\u6681\u696d\u5c40\u66f2\u6975\u7389\u6850\u7c81\u50c5\u52e4\u5747\u5dfe\u9326\u65a4\u6b23\u6b3d\u7434\u7981\u79bd\u7b4b\u7dca\u82b9\u83cc\u887f\u895f\u8b39\u8fd1\u91d1\u541f\u9280\u4e5d\u5036\u53e5\u533a\u72d7\u7396\u77e9\u82e6\u8eaf\u99c6\u99c8\u99d2\u5177\u611a\u865e\u55b0\u7a7a\u5076\u5bd3\u9047\u9685\u4e32\u6adb\u91e7\u5c51\u5c48",
        ],
        [
          35904,
          "\u6398\u7a9f\u6c93\u9774\u8f61\u7aaa\u718a\u9688\u7c82\u6817\u7e70\u6851\u936c\u52f2\u541b\u85ab\u8a13\u7fa4\u8ecd\u90e1\u5366\u8888\u7941\u4fc2\u50be\u5211\u5144\u5553\u572d\u73ea\u578b\u5951\u5f62\u5f84\u6075\u6176\u6167\u61a9\u63b2\u643a\u656c\u666f\u6842\u6e13\u7566\u7a3d\u7cfb\u7d4c\u7d99\u7e4b\u7f6b\u830e\u834a\u86cd\u8a08\u8a63\u8b66\u8efd\u981a\u9d8f\u82b8\u8fce\u9be8",
        ],
        [
          35968,
          "\u5287\u621f\u6483\u6fc0\u9699\u6841\u5091\u6b20\u6c7a\u6f54\u7a74\u7d50\u8840\u8a23\u6708\u4ef6\u5039\u5026\u5065\u517c\u5238\u5263\u55a7\u570f\u5805\u5acc\u5efa\u61b2\u61f8\u62f3\u6372\u691c\u6a29\u727d\u72ac\u732e\u7814\u786f\u7d79\u770c\u80a9\u898b\u8b19\u8ce2\u8ed2\u9063\u9375\u967a\u9855\u9a13\u9e78\u5143\u539f\u53b3\u5e7b\u5f26\u6e1b\u6e90\u7384\u73fe\u7d43\u8237\u8a00\u8afa\u9650\u4e4e\u500b\u53e4\u547c\u56fa\u59d1\u5b64\u5df1\u5eab\u5f27\u6238\u6545\u67af\u6e56\u72d0\u7cca\u88b4\u80a1\u80e1\u83f0\u864e\u8a87\u8de8\u9237\u96c7\u9867\u9f13\u4e94\u4e92\u4f0d\u5348\u5449\u543e\u5a2f\u5f8c\u5fa1\u609f\u68a7\u6a8e\u745a\u7881\u8a9e\u8aa4\u8b77\u9190\u4e5e\u9bc9\u4ea4\u4f7c\u4faf\u5019\u5016\u5149\u516c\u529f\u52b9\u52fe\u539a\u53e3\u5411",
        ],
        [
          36160,
          "\u540e\u5589\u5751\u57a2\u597d\u5b54\u5b5d\u5b8f\u5de5\u5de7\u5df7\u5e78\u5e83\u5e9a\u5eb7\u5f18\u6052\u614c\u6297\u62d8\u63a7\u653b\u6602\u6643\u66f4\u676d\u6821\u6897\u69cb\u6c5f\u6d2a\u6d69\u6e2f\u6e9d\u7532\u7687\u786c\u7a3f\u7ce0\u7d05\u7d18\u7d5e\u7db1\u8015\u8003\u80af\u80b1\u8154\u818f\u822a\u8352\u884c\u8861\u8b1b\u8ca2\u8cfc\u90ca\u9175\u9271\u783f\u92fc\u95a4\u964d",
        ],
        [
          36224,
          "\u9805\u9999\u9ad8\u9d3b\u525b\u52ab\u53f7\u5408\u58d5\u62f7\u6fe0\u8c6a\u8f5f\u9eb9\u514b\u523b\u544a\u56fd\u7a40\u9177\u9d60\u9ed2\u7344\u6f09\u8170\u7511\u5ffd\u60da\u9aa8\u72db\u8fbc\u6b64\u9803\u4eca\u56f0\u5764\u58be\u5a5a\u6068\u61c7\u660f\u6606\u6839\u68b1\u6df7\u75d5\u7d3a\u826e\u9b42\u4e9b\u4f50\u53c9\u5506\u5d6f\u5de6\u5dee\u67fb\u6c99\u7473\u7802\u8a50\u9396\u88df\u5750\u5ea7\u632b\u50b5\u50ac\u518d\u6700\u54c9\u585e\u59bb\u5bb0\u5f69\u624d\u63a1\u683d\u6b73\u6e08\u707d\u91c7\u7280\u7815\u7826\u796d\u658e\u7d30\u83dc\u88c1\u8f09\u969b\u5264\u5728\u6750\u7f6a\u8ca1\u51b4\u5742\u962a\u583a\u698a\u80b4\u54b2\u5d0e\u57fc\u7895\u9dfa\u4f5c\u524a\u548b\u643e\u6628\u6714\u67f5\u7a84\u7b56\u7d22\u932f\u685c\u9bad\u7b39\u5319\u518a\u5237",
        ],
        [
          36416,
          "\u5bdf\u62f6\u64ae\u64e6\u672d\u6bba\u85a9\u96d1\u7690\u9bd6\u634c\u9306\u9bab\u76bf\u6652\u4e09\u5098\u53c2\u5c71\u60e8\u6492\u6563\u685f\u71e6\u73ca\u7523\u7b97\u7e82\u8695\u8b83\u8cdb\u9178\u9910\u65ac\u66ab\u6b8b\u4ed5\u4ed4\u4f3a\u4f7f\u523a\u53f8\u53f2\u55e3\u56db\u58eb\u59cb\u59c9\u59ff\u5b50\u5c4d\u5e02\u5e2b\u5fd7\u601d\u6307\u652f\u5b5c\u65af\u65bd\u65e8\u679d\u6b62",
        ],
        [
          36480,
          "\u6b7b\u6c0f\u7345\u7949\u79c1\u7cf8\u7d19\u7d2b\u80a2\u8102\u81f3\u8996\u8a5e\u8a69\u8a66\u8a8c\u8aee\u8cc7\u8cdc\u96cc\u98fc\u6b6f\u4e8b\u4f3c\u4f8d\u5150\u5b57\u5bfa\u6148\u6301\u6642\u6b21\u6ecb\u6cbb\u723e\u74bd\u75d4\u78c1\u793a\u800c\u8033\u81ea\u8494\u8f9e\u6c50\u9e7f\u5f0f\u8b58\u9d2b\u7afa\u8ef8\u5b8d\u96eb\u4e03\u53f1\u57f7\u5931\u5ac9\u5ba4\u6089\u6e7f\u6f06\u75be\u8cea\u5b9f\u8500\u7be0\u5072\u67f4\u829d\u5c61\u854a\u7e1e\u820e\u5199\u5c04\u6368\u8d66\u659c\u716e\u793e\u7d17\u8005\u8b1d\u8eca\u906e\u86c7\u90aa\u501f\u52fa\u5c3a\u6753\u707c\u7235\u914c\u91c8\u932b\u82e5\u5bc2\u5f31\u60f9\u4e3b\u53d6\u5b88\u624b\u6731\u6b8a\u72e9\u73e0\u7a2e\u816b\u8da3\u9152\u9996\u5112\u53d7\u546a\u5bff\u6388\u6a39\u7dac\u9700\u56da\u53ce\u5468",
        ],
        [
          36672,
          "\u5b97\u5c31\u5dde\u4fee\u6101\u62fe\u6d32\u79c0\u79cb\u7d42\u7e4d\u7fd2\u81ed\u821f\u8490\u8846\u8972\u8b90\u8e74\u8f2f\u9031\u914b\u916c\u96c6\u919c\u4ec0\u4f4f\u5145\u5341\u5f93\u620e\u67d4\u6c41\u6e0b\u7363\u7e26\u91cd\u9283\u53d4\u5919\u5bbf\u6dd1\u795d\u7e2e\u7c9b\u587e\u719f\u51fa\u8853\u8ff0\u4fca\u5cfb\u6625\u77ac\u7ae3\u821c\u99ff\u51c6\u5faa\u65ec\u696f\u6b89\u6df3",
        ],
        [
          36736,
          "\u6e96\u6f64\u76fe\u7d14\u5de1\u9075\u9187\u9806\u51e6\u521d\u6240\u6691\u66d9\u6e1a\u5eb6\u7dd2\u7f72\u66f8\u85af\u85f7\u8af8\u52a9\u53d9\u5973\u5e8f\u5f90\u6055\u92e4\u9664\u50b7\u511f\u52dd\u5320\u5347\u53ec\u54e8\u5546\u5531\u5617\u5968\u59be\u5a3c\u5bb5\u5c06\u5c0f\u5c11\u5c1a\u5e84\u5e8a\u5ee0\u5f70\u627f\u6284\u62db\u638c\u6377\u6607\u660c\u662d\u6676\u677e\u68a2\u6a1f\u6a35\u6cbc\u6d88\u6e09\u6e58\u713c\u7126\u7167\u75c7\u7701\u785d\u7901\u7965\u79f0\u7ae0\u7b11\u7ca7\u7d39\u8096\u83d6\u848b\u8549\u885d\u88f3\u8a1f\u8a3c\u8a54\u8a73\u8c61\u8cde\u91a4\u9266\u937e\u9418\u969c\u9798\u4e0a\u4e08\u4e1e\u4e57\u5197\u5270\u57ce\u5834\u58cc\u5b22\u5e38\u60c5\u64fe\u6761\u6756\u6d44\u72b6\u7573\u7a63\u84b8\u8b72\u91b8\u9320\u5631\u57f4\u98fe",
        ],
        [
          36928,
          "\u62ed\u690d\u6b96\u71ed\u7e54\u8077\u8272\u89e6\u98df\u8755\u8fb1\u5c3b\u4f38\u4fe1\u4fb5\u5507\u5a20\u5bdd\u5be9\u5fc3\u614e\u632f\u65b0\u664b\u68ee\u699b\u6d78\u6df1\u7533\u75b9\u771f\u795e\u79e6\u7d33\u81e3\u82af\u85aa\u89aa\u8a3a\u8eab\u8f9b\u9032\u91dd\u9707\u4eba\u4ec1\u5203\u5875\u58ec\u5c0b\u751a\u5c3d\u814e\u8a0a\u8fc5\u9663\u976d\u7b25\u8acf\u9808\u9162\u56f3\u53a8",
        ],
        [
          36992,
          "\u9017\u5439\u5782\u5e25\u63a8\u6c34\u708a\u7761\u7c8b\u7fe0\u8870\u9042\u9154\u9310\u9318\u968f\u745e\u9ac4\u5d07\u5d69\u6570\u67a2\u8da8\u96db\u636e\u6749\u6919\u83c5\u9817\u96c0\u88fe\u6f84\u647a\u5bf8\u4e16\u702c\u755d\u662f\u51c4\u5236\u52e2\u59d3\u5f81\u6027\u6210\u653f\u6574\u661f\u6674\u68f2\u6816\u6b63\u6e05\u7272\u751f\u76db\u7cbe\u8056\u58f0\u88fd\u897f\u8aa0\u8a93\u8acb\u901d\u9192\u9752\u9759\u6589\u7a0e\u8106\u96bb\u5e2d\u60dc\u621a\u65a5\u6614\u6790\u77f3\u7a4d\u7c4d\u7e3e\u810a\u8cac\u8d64\u8de1\u8e5f\u78a9\u5207\u62d9\u63a5\u6442\u6298\u8a2d\u7a83\u7bc0\u8aac\u96ea\u7d76\u820c\u8749\u4ed9\u5148\u5343\u5360\u5ba3\u5c02\u5c16\u5ddd\u6226\u6247\u64b0\u6813\u6834\u6cc9\u6d45\u6d17\u67d3\u6f5c\u714e\u717d\u65cb\u7a7f\u7bad\u7dda",
        ],
        [
          37184,
          "\u7e4a\u7fa8\u817a\u821b\u8239\u85a6\u8a6e\u8cce\u8df5\u9078\u9077\u92ad\u9291\u9583\u9bae\u524d\u5584\u6f38\u7136\u5168\u7985\u7e55\u81b3\u7cce\u564c\u5851\u5ca8\u63aa\u66fe\u66fd\u695a\u72d9\u758f\u758e\u790e\u7956\u79df\u7c97\u7d20\u7d44\u8607\u8a34\u963b\u9061\u9f20\u50e7\u5275\u53cc\u53e2\u5009\u55aa\u58ee\u594f\u723d\u5b8b\u5c64\u531d\u60e3\u60f3\u635c\u6383\u633f\u63bb",
        ],
        [
          37248,
          "\u64cd\u65e9\u66f9\u5de3\u69cd\u69fd\u6f15\u71e5\u4e89\u75e9\u76f8\u7a93\u7cdf\u7dcf\u7d9c\u8061\u8349\u8358\u846c\u84bc\u85fb\u88c5\u8d70\u9001\u906d\u9397\u971c\u9a12\u50cf\u5897\u618e\u81d3\u8535\u8d08\u9020\u4fc3\u5074\u5247\u5373\u606f\u6349\u675f\u6e2c\u8db3\u901f\u4fd7\u5c5e\u8cca\u65cf\u7d9a\u5352\u8896\u5176\u63c3\u5b58\u5b6b\u5c0a\u640d\u6751\u905c\u4ed6\u591a\u592a\u6c70\u8a51\u553e\u5815\u59a5\u60f0\u6253\u67c1\u8235\u6955\u9640\u99c4\u9a28\u4f53\u5806\u5bfe\u8010\u5cb1\u5e2f\u5f85\u6020\u614b\u6234\u66ff\u6cf0\u6ede\u80ce\u817f\u82d4\u888b\u8cb8\u9000\u902e\u968a\u9edb\u9bdb\u4ee3\u53f0\u5927\u7b2c\u918d\u984c\u9df9\u6edd\u7027\u5353\u5544\u5b85\u6258\u629e\u62d3\u6ca2\u6fef\u7422\u8a17\u9438\u6fc1\u8afe\u8338\u51e7\u86f8\u53ea",
        ],
        [
          37440,
          "\u53e9\u4f46\u9054\u8fb0\u596a\u8131\u5dfd\u7aea\u8fbf\u68da\u8c37\u72f8\u9c48\u6a3d\u8ab0\u4e39\u5358\u5606\u5766\u62c5\u63a2\u65e6\u6b4e\u6de1\u6e5b\u70ad\u77ed\u7aef\u7baa\u7dbb\u803d\u80c6\u86cb\u8a95\u935b\u56e3\u58c7\u5f3e\u65ad\u6696\u6a80\u6bb5\u7537\u8ac7\u5024\u77e5\u5730\u5f1b\u6065\u667a\u6c60\u75f4\u7a1a\u7f6e\u81f4\u8718\u9045\u99b3\u7bc9\u755c\u7af9\u7b51\u84c4",
        ],
        [
          37504,
          "\u9010\u79e9\u7a92\u8336\u5ae1\u7740\u4e2d\u4ef2\u5b99\u5fe0\u62bd\u663c\u67f1\u6ce8\u866b\u8877\u8a3b\u914e\u92f3\u99d0\u6a17\u7026\u732a\u82e7\u8457\u8caf\u4e01\u5146\u51cb\u558b\u5bf5\u5e16\u5e33\u5e81\u5f14\u5f35\u5f6b\u5fb4\u61f2\u6311\u66a2\u671d\u6f6e\u7252\u753a\u773a\u8074\u8139\u8178\u8776\u8abf\u8adc\u8d85\u8df3\u929a\u9577\u9802\u9ce5\u52c5\u6357\u76f4\u6715\u6c88\u73cd\u8cc3\u93ae\u9673\u6d25\u589c\u690e\u69cc\u8ffd\u939a\u75db\u901a\u585a\u6802\u63b4\u69fb\u4f43\u6f2c\u67d8\u8fbb\u8526\u7db4\u9354\u693f\u6f70\u576a\u58f7\u5b2c\u7d2c\u722a\u540a\u91e3\u9db4\u4ead\u4f4e\u505c\u5075\u5243\u8c9e\u5448\u5824\u5b9a\u5e1d\u5e95\u5ead\u5ef7\u5f1f\u608c\u62b5\u633a\u63d0\u68af\u6c40\u7887\u798e\u7a0b\u7de0\u8247\u8a02\u8ae6\u8e44\u9013",
        ],
        [
          37696,
          "\u90b8\u912d\u91d8\u9f0e\u6ce5\u6458\u64e2\u6575\u6ef4\u7684\u7b1b\u9069\u93d1\u6eba\u54f2\u5fb9\u64a4\u8f4d\u8fed\u9244\u5178\u586b\u5929\u5c55\u5e97\u6dfb\u7e8f\u751c\u8cbc\u8ee2\u985b\u70b9\u4f1d\u6bbf\u6fb1\u7530\u96fb\u514e\u5410\u5835\u5857\u59ac\u5c60\u5f92\u6597\u675c\u6e21\u767b\u83df\u8ced\u9014\u90fd\u934d\u7825\u783a\u52aa\u5ea6\u571f\u5974\u6012\u5012\u515a\u51ac",
        ],
        [
          37760,
          "\u51cd\u5200\u5510\u5854\u5858\u5957\u5b95\u5cf6\u5d8b\u60bc\u6295\u642d\u6771\u6843\u68bc\u68df\u76d7\u6dd8\u6e6f\u6d9b\u706f\u71c8\u5f53\u75d8\u7977\u7b49\u7b54\u7b52\u7cd6\u7d71\u5230\u8463\u8569\u85e4\u8a0e\u8b04\u8c46\u8e0f\u9003\u900f\u9419\u9676\u982d\u9a30\u95d8\u50cd\u52d5\u540c\u5802\u5c0e\u61a7\u649e\u6d1e\u77b3\u7ae5\u80f4\u8404\u9053\u9285\u5ce0\u9d07\u533f\u5f97\u5fb3\u6d9c\u7279\u7763\u79bf\u7be4\u6bd2\u72ec\u8aad\u6803\u6a61\u51f8\u7a81\u6934\u5c4a\u9cf6\u82eb\u5bc5\u9149\u701e\u5678\u5c6f\u60c7\u6566\u6c8c\u8c5a\u9041\u9813\u5451\u66c7\u920d\u5948\u90a3\u5185\u4e4d\u51ea\u8599\u8b0e\u7058\u637a\u934b\u6962\u99b4\u7e04\u7577\u5357\u6960\u8edf\u96e3\u6c5d\u4e8c\u5c3c\u5f10\u8fe9\u5302\u8cd1\u8089\u8679\u5eff\u65e5\u4e73\u5165",
        ],
        [
          37952,
          "\u5982\u5c3f\u97ee\u4efb\u598a\u5fcd\u8a8d\u6fe1\u79b0\u7962\u5be7\u8471\u732b\u71b1\u5e74\u5ff5\u637b\u649a\u71c3\u7c98\u4e43\u5efc\u4e4b\u57dc\u56a2\u60a9\u6fc3\u7d0d\u80fd\u8133\u81bf\u8fb2\u8997\u86a4\u5df4\u628a\u64ad\u8987\u6777\u6ce2\u6d3e\u7436\u7834\u5a46\u7f75\u82ad\u99ac\u4ff3\u5ec3\u62dd\u6392\u6557\u676f\u76c3\u724c\u80cc\u80ba\u8f29\u914d\u500d\u57f9\u5a92\u6885",
        ],
        [
          38016,
          "\u6973\u7164\u72fd\u8cb7\u58f2\u8ce0\u966a\u9019\u877f\u79e4\u77e7\u8429\u4f2f\u5265\u535a\u62cd\u67cf\u6cca\u767d\u7b94\u7c95\u8236\u8584\u8feb\u66dd\u6f20\u7206\u7e1b\u83ab\u99c1\u9ea6\u51fd\u7bb1\u7872\u7bb8\u8087\u7b48\u6ae8\u5e61\u808c\u7551\u7560\u516b\u9262\u6e8c\u767a\u9197\u9aea\u4f10\u7f70\u629c\u7b4f\u95a5\u9ce9\u567a\u5859\u86e4\u96bc\u4f34\u5224\u534a\u53cd\u53db\u5e06\u642c\u6591\u677f\u6c3e\u6c4e\u7248\u72af\u73ed\u7554\u7e41\u822c\u85e9\u8ca9\u7bc4\u91c6\u7169\u9812\u98ef\u633d\u6669\u756a\u76e4\u78d0\u8543\u86ee\u532a\u5351\u5426\u5983\u5e87\u5f7c\u60b2\u6249\u6279\u62ab\u6590\u6bd4\u6ccc\u75b2\u76ae\u7891\u79d8\u7dcb\u7f77\u80a5\u88ab\u8ab9\u8cbb\u907f\u975e\u98db\u6a0b\u7c38\u5099\u5c3e\u5fae\u6787\u6bd8\u7435\u7709\u7f8e",
        ],
        [
          38208,
          "\u9f3b\u67ca\u7a17\u5339\u758b\u9aed\u5f66\u819d\u83f1\u8098\u5f3c\u5fc5\u7562\u7b46\u903c\u6867\u59eb\u5a9b\u7d10\u767e\u8b2c\u4ff5\u5f6a\u6a19\u6c37\u6f02\u74e2\u7968\u8868\u8a55\u8c79\u5edf\u63cf\u75c5\u79d2\u82d7\u9328\u92f2\u849c\u86ed\u9c2d\u54c1\u5f6c\u658c\u6d5c\u7015\u8ca7\u8cd3\u983b\u654f\u74f6\u4e0d\u4ed8\u57e0\u592b\u5a66\u5bcc\u51a8\u5e03\u5e9c\u6016\u6276\u6577",
        ],
        [
          38272,
          "\u65a7\u666e\u6d6e\u7236\u7b26\u8150\u819a\u8299\u8b5c\u8ca0\u8ce6\u8d74\u961c\u9644\u4fae\u64ab\u6b66\u821e\u8461\u856a\u90e8\u5c01\u6953\u98a8\u847a\u8557\u4f0f\u526f\u5fa9\u5e45\u670d\u798f\u8179\u8907\u8986\u6df5\u5f17\u6255\u6cb8\u4ecf\u7269\u9b92\u5206\u543b\u5674\u58b3\u61a4\u626e\u711a\u596e\u7c89\u7cde\u7d1b\u96f0\u6587\u805e\u4e19\u4f75\u5175\u5840\u5e63\u5e73\u5f0a\u67c4\u4e26\u853d\u9589\u965b\u7c73\u9801\u50fb\u58c1\u7656\u78a7\u5225\u77a5\u8511\u7b86\u504f\u5909\u7247\u7bc7\u7de8\u8fba\u8fd4\u904d\u4fbf\u52c9\u5a29\u5f01\u97ad\u4fdd\u8217\u92ea\u5703\u6355\u6b69\u752b\u88dc\u8f14\u7a42\u52df\u5893\u6155\u620a\u66ae\u6bcd\u7c3f\u83e9\u5023\u4ff8\u5305\u5446\u5831\u5949\u5b9d\u5cf0\u5cef\u5d29\u5e96\u62b1\u6367\u653e\u65b9\u670b",
        ],
        [
          38464,
          "\u6cd5\u6ce1\u70f9\u7832\u7e2b\u80de\u82b3\u840c\u84ec\u8702\u8912\u8a2a\u8c4a\u90a6\u92d2\u98fd\u9cf3\u9d6c\u4e4f\u4ea1\u508d\u5256\u574a\u59a8\u5e3d\u5fd8\u5fd9\u623f\u66b4\u671b\u67d0\u68d2\u5192\u7d21\u80aa\u81a8\u8b00\u8c8c\u8cbf\u927e\u9632\u5420\u982c\u5317\u50d5\u535c\u58a8\u64b2\u6734\u7267\u7766\u7a46\u91e6\u52c3\u6ca1\u6b86\u5800\u5e4c\u5954\u672c\u7ffb\u51e1\u76c6",
        ],
        [
          38528,
          "\u6469\u78e8\u9b54\u9ebb\u57cb\u59b9\u6627\u679a\u6bce\u54e9\u69d9\u5e55\u819c\u6795\u9baa\u67fe\u9c52\u685d\u4ea6\u4fe3\u53c8\u62b9\u672b\u6cab\u8fc4\u4fad\u7e6d\u9ebf\u4e07\u6162\u6e80\u6f2b\u8513\u5473\u672a\u9b45\u5df3\u7b95\u5cac\u5bc6\u871c\u6e4a\u84d1\u7a14\u8108\u5999\u7c8d\u6c11\u7720\u52d9\u5922\u7121\u725f\u77db\u9727\u9d61\u690b\u5a7f\u5a18\u51a5\u540d\u547d\u660e\u76df\u8ff7\u9298\u9cf4\u59ea\u725d\u6ec5\u514d\u68c9\u7dbf\u7dec\u9762\u9eba\u6478\u6a21\u8302\u5984\u5b5f\u6bdb\u731b\u76f2\u7db2\u8017\u8499\u5132\u6728\u9ed9\u76ee\u6762\u52ff\u9905\u5c24\u623b\u7c7e\u8cb0\u554f\u60b6\u7d0b\u9580\u5301\u4e5f\u51b6\u591c\u723a\u8036\u91ce\u5f25\u77e2\u5384\u5f79\u7d04\u85ac\u8a33\u8e8d\u9756\u67f3\u85ae\u9453\u6109\u6108\u6cb9\u7652",
        ],
        [
          38720,
          "\u8aed\u8f38\u552f\u4f51\u512a\u52c7\u53cb\u5ba5\u5e7d\u60a0\u6182\u63d6\u6709\u67da\u6e67\u6d8c\u7336\u7337\u7531\u7950\u88d5\u8a98\u904a\u9091\u90f5\u96c4\u878d\u5915\u4e88\u4f59\u4e0e\u8a89\u8f3f\u9810\u50ad\u5e7c\u5996\u5bb9\u5eb8\u63da\u63fa\u64c1\u66dc\u694a\u69d8\u6d0b\u6eb6\u7194\u7528\u7aaf\u7f8a\u8000\u8449\u84c9\u8981\u8b21\u8e0a\u9065\u967d\u990a\u617e\u6291\u6b32",
        ],
        [
          38784,
          "\u6c83\u6d74\u7fcc\u7ffc\u6dc0\u7f85\u87ba\u88f8\u6765\u83b1\u983c\u96f7\u6d1b\u7d61\u843d\u916a\u4e71\u5375\u5d50\u6b04\u6feb\u85cd\u862d\u89a7\u5229\u540f\u5c65\u674e\u68a8\u7406\u7483\u75e2\u88cf\u88e1\u91cc\u96e2\u9678\u5f8b\u7387\u7acb\u844e\u63a0\u7565\u5289\u6d41\u6e9c\u7409\u7559\u786b\u7c92\u9686\u7adc\u9f8d\u4fb6\u616e\u65c5\u865c\u4e86\u4eae\u50da\u4e21\u51cc\u5bee\u6599\u6881\u6dbc\u731f\u7642\u77ad\u7a1c\u7ce7\u826f\u8ad2\u907c\u91cf\u9675\u9818\u529b\u7dd1\u502b\u5398\u6797\u6dcb\u71d0\u7433\u81e8\u8f2a\u96a3\u9c57\u9e9f\u7460\u5841\u6d99\u7d2f\u985e\u4ee4\u4f36\u4f8b\u51b7\u52b1\u5dba\u601c\u73b2\u793c\u82d3\u9234\u96b7\u96f6\u970a\u9e97\u9f62\u66a6\u6b74\u5217\u52a3\u70c8\u88c2\u5ec9\u604b\u6190\u6f23\u7149\u7c3e\u7df4\u806f",
        ],
        [
          38976,
          "\u84ee\u9023\u932c\u5442\u9b6f\u6ad3\u7089\u8cc2\u8def\u9732\u52b4\u5a41\u5eca\u5f04\u6717\u697c\u6994\u6d6a\u6f0f\u7262\u72fc\u7bed\u8001\u807e\u874b\u90ce\u516d\u9e93\u7984\u808b\u9332\u8ad6\u502d\u548c\u8a71\u6b6a\u8cc4\u8107\u60d1\u67a0\u9df2\u4e99\u4e98\u9c10\u8a6b\u85c1\u8568\u6900\u6e7e\u7897\u8155",
        ],
        [
          39071,
          "\u5f0c\u4e10\u4e15\u4e2a\u4e31\u4e36\u4e3c\u4e3f\u4e42\u4e56\u4e58\u4e82\u4e85\u8c6b\u4e8a\u8212\u5f0d\u4e8e\u4e9e\u4e9f\u4ea0\u4ea2\u4eb0\u4eb3\u4eb6\u4ece\u4ecd\u4ec4\u4ec6\u4ec2\u4ed7\u4ede\u4eed\u4edf\u4ef7\u4f09\u4f5a\u4f30\u4f5b\u4f5d\u4f57\u4f47\u4f76\u4f88\u4f8f\u4f98\u4f7b\u4f69\u4f70\u4f91\u4f6f\u4f86\u4f96\u5118\u4fd4\u4fdf\u4fce\u4fd8\u4fdb\u4fd1\u4fda\u4fd0\u4fe4\u4fe5\u501a\u5028\u5014\u502a\u5025\u5005\u4f1c\u4ff6\u5021\u5029\u502c\u4ffe\u4fef\u5011\u5006\u5043\u5047\u6703\u5055\u5050\u5048\u505a\u5056\u506c\u5078\u5080\u509a\u5085\u50b4\u50b2",
        ],
        [
          39232,
          "\u50c9\u50ca\u50b3\u50c2\u50d6\u50de\u50e5\u50ed\u50e3\u50ee\u50f9\u50f5\u5109\u5101\u5102\u5116\u5115\u5114\u511a\u5121\u513a\u5137\u513c\u513b\u513f\u5140\u5152\u514c\u5154\u5162\u7af8\u5169\u516a\u516e\u5180\u5182\u56d8\u518c\u5189\u518f\u5191\u5193\u5195\u5196\u51a4\u51a6\u51a2\u51a9\u51aa\u51ab\u51b3\u51b1\u51b2\u51b0\u51b5\u51bd\u51c5\u51c9\u51db\u51e0\u8655\u51e9\u51ed",
        ],
        [
          39296,
          "\u51f0\u51f5\u51fe\u5204\u520b\u5214\u520e\u5227\u522a\u522e\u5233\u5239\u524f\u5244\u524b\u524c\u525e\u5254\u526a\u5274\u5269\u5273\u527f\u527d\u528d\u5294\u5292\u5271\u5288\u5291\u8fa8\u8fa7\u52ac\u52ad\u52bc\u52b5\u52c1\u52cd\u52d7\u52de\u52e3\u52e6\u98ed\u52e0\u52f3\u52f5\u52f8\u52f9\u5306\u5308\u7538\u530d\u5310\u530f\u5315\u531a\u5323\u532f\u5331\u5333\u5338\u5340\u5346\u5345\u4e17\u5349\u534d\u51d6\u535e\u5369\u536e\u5918\u537b\u5377\u5382\u5396\u53a0\u53a6\u53a5\u53ae\u53b0\u53b6\u53c3\u7c12\u96d9\u53df\u66fc\u71ee\u53ee\u53e8\u53ed\u53fa\u5401\u543d\u5440\u542c\u542d\u543c\u542e\u5436\u5429\u541d\u544e\u548f\u5475\u548e\u545f\u5471\u5477\u5470\u5492\u547b\u5480\u5476\u5484\u5490\u5486\u54c7\u54a2\u54b8\u54a5\u54ac\u54c4\u54c8\u54a8",
        ],
        [
          39488,
          "\u54ab\u54c2\u54a4\u54be\u54bc\u54d8\u54e5\u54e6\u550f\u5514\u54fd\u54ee\u54ed\u54fa\u54e2\u5539\u5540\u5563\u554c\u552e\u555c\u5545\u5556\u5557\u5538\u5533\u555d\u5599\u5580\u54af\u558a\u559f\u557b\u557e\u5598\u559e\u55ae\u557c\u5583\u55a9\u5587\u55a8\u55da\u55c5\u55df\u55c4\u55dc\u55e4\u55d4\u5614\u55f7\u5616\u55fe\u55fd\u561b\u55f9\u564e\u5650\u71df\u5634\u5636\u5632\u5638",
        ],
        [
          39552,
          "\u566b\u5664\u562f\u566c\u566a\u5686\u5680\u568a\u56a0\u5694\u568f\u56a5\u56ae\u56b6\u56b4\u56c2\u56bc\u56c1\u56c3\u56c0\u56c8\u56ce\u56d1\u56d3\u56d7\u56ee\u56f9\u5700\u56ff\u5704\u5709\u5708\u570b\u570d\u5713\u5718\u5716\u55c7\u571c\u5726\u5737\u5738\u574e\u573b\u5740\u574f\u5769\u57c0\u5788\u5761\u577f\u5789\u5793\u57a0\u57b3\u57a4\u57aa\u57b0\u57c3\u57c6\u57d4\u57d2\u57d3\u580a\u57d6\u57e3\u580b\u5819\u581d\u5872\u5821\u5862\u584b\u5870\u6bc0\u5852\u583d\u5879\u5885\u58b9\u589f\u58ab\u58ba\u58de\u58bb\u58b8\u58ae\u58c5\u58d3\u58d1\u58d7\u58d9\u58d8\u58e5\u58dc\u58e4\u58df\u58ef\u58fa\u58f9\u58fb\u58fc\u58fd\u5902\u590a\u5910\u591b\u68a6\u5925\u592c\u592d\u5932\u5938\u593e\u7ad2\u5955\u5950\u594e\u595a\u5958\u5962\u5960\u5967\u596c\u5969",
        ],
        [
          39744,
          "\u5978\u5981\u599d\u4f5e\u4fab\u59a3\u59b2\u59c6\u59e8\u59dc\u598d\u59d9\u59da\u5a25\u5a1f\u5a11\u5a1c\u5a09\u5a1a\u5a40\u5a6c\u5a49\u5a35\u5a36\u5a62\u5a6a\u5a9a\u5abc\u5abe\u5acb\u5ac2\u5abd\u5ae3\u5ad7\u5ae6\u5ae9\u5ad6\u5afa\u5afb\u5b0c\u5b0b\u5b16\u5b32\u5ad0\u5b2a\u5b36\u5b3e\u5b43\u5b45\u5b40\u5b51\u5b55\u5b5a\u5b5b\u5b65\u5b69\u5b70\u5b73\u5b75\u5b78\u6588\u5b7a\u5b80",
        ],
        [
          39808,
          "\u5b83\u5ba6\u5bb8\u5bc3\u5bc7\u5bc9\u5bd4\u5bd0\u5be4\u5be6\u5be2\u5bde\u5be5\u5beb\u5bf0\u5bf6\u5bf3\u5c05\u5c07\u5c08\u5c0d\u5c13\u5c20\u5c22\u5c28\u5c38\u5c39\u5c41\u5c46\u5c4e\u5c53\u5c50\u5c4f\u5b71\u5c6c\u5c6e\u4e62\u5c76\u5c79\u5c8c\u5c91\u5c94\u599b\u5cab\u5cbb\u5cb6\u5cbc\u5cb7\u5cc5\u5cbe\u5cc7\u5cd9\u5ce9\u5cfd\u5cfa\u5ced\u5d8c\u5cea\u5d0b\u5d15\u5d17\u5d5c\u5d1f\u5d1b\u5d11\u5d14\u5d22\u5d1a\u5d19\u5d18\u5d4c\u5d52\u5d4e\u5d4b\u5d6c\u5d73\u5d76\u5d87\u5d84\u5d82\u5da2\u5d9d\u5dac\u5dae\u5dbd\u5d90\u5db7\u5dbc\u5dc9\u5dcd\u5dd3\u5dd2\u5dd6\u5ddb\u5deb\u5df2\u5df5\u5e0b\u5e1a\u5e19\u5e11\u5e1b\u5e36\u5e37\u5e44\u5e43\u5e40\u5e4e\u5e57\u5e54\u5e5f\u5e62\u5e64\u5e47\u5e75\u5e76\u5e7a\u9ebc\u5e7f\u5ea0\u5ec1\u5ec2\u5ec8\u5ed0\u5ecf",
        ],
        [
          4e4,
          "\u5ed6\u5ee3\u5edd\u5eda\u5edb\u5ee2\u5ee1\u5ee8\u5ee9\u5eec\u5ef1\u5ef3\u5ef0\u5ef4\u5ef8\u5efe\u5f03\u5f09\u5f5d\u5f5c\u5f0b\u5f11\u5f16\u5f29\u5f2d\u5f38\u5f41\u5f48\u5f4c\u5f4e\u5f2f\u5f51\u5f56\u5f57\u5f59\u5f61\u5f6d\u5f73\u5f77\u5f83\u5f82\u5f7f\u5f8a\u5f88\u5f91\u5f87\u5f9e\u5f99\u5f98\u5fa0\u5fa8\u5fad\u5fbc\u5fd6\u5ffb\u5fe4\u5ff8\u5ff1\u5fdd\u60b3\u5fff\u6021\u6060",
        ],
        [
          40064,
          "\u6019\u6010\u6029\u600e\u6031\u601b\u6015\u602b\u6026\u600f\u603a\u605a\u6041\u606a\u6077\u605f\u604a\u6046\u604d\u6063\u6043\u6064\u6042\u606c\u606b\u6059\u6081\u608d\u60e7\u6083\u609a\u6084\u609b\u6096\u6097\u6092\u60a7\u608b\u60e1\u60b8\u60e0\u60d3\u60b4\u5ff0\u60bd\u60c6\u60b5\u60d8\u614d\u6115\u6106\u60f6\u60f7\u6100\u60f4\u60fa\u6103\u6121\u60fb\u60f1\u610d\u610e\u6147\u613e\u6128\u6127\u614a\u613f\u613c\u612c\u6134\u613d\u6142\u6144\u6173\u6177\u6158\u6159\u615a\u616b\u6174\u616f\u6165\u6171\u615f\u615d\u6153\u6175\u6199\u6196\u6187\u61ac\u6194\u619a\u618a\u6191\u61ab\u61ae\u61cc\u61ca\u61c9\u61f7\u61c8\u61c3\u61c6\u61ba\u61cb\u7f79\u61cd\u61e6\u61e3\u61f6\u61fa\u61f4\u61ff\u61fd\u61fc\u61fe\u6200\u6208\u6209\u620d\u620c\u6214\u621b",
        ],
        [
          40256,
          "\u621e\u6221\u622a\u622e\u6230\u6232\u6233\u6241\u624e\u625e\u6263\u625b\u6260\u6268\u627c\u6282\u6289\u627e\u6292\u6293\u6296\u62d4\u6283\u6294\u62d7\u62d1\u62bb\u62cf\u62ff\u62c6\u64d4\u62c8\u62dc\u62cc\u62ca\u62c2\u62c7\u629b\u62c9\u630c\u62ee\u62f1\u6327\u6302\u6308\u62ef\u62f5\u6350\u633e\u634d\u641c\u634f\u6396\u638e\u6380\u63ab\u6376\u63a3\u638f\u6389\u639f\u63b5\u636b",
        ],
        [
          40320,
          "\u6369\u63be\u63e9\u63c0\u63c6\u63e3\u63c9\u63d2\u63f6\u63c4\u6416\u6434\u6406\u6413\u6426\u6436\u651d\u6417\u6428\u640f\u6467\u646f\u6476\u644e\u652a\u6495\u6493\u64a5\u64a9\u6488\u64bc\u64da\u64d2\u64c5\u64c7\u64bb\u64d8\u64c2\u64f1\u64e7\u8209\u64e0\u64e1\u62ac\u64e3\u64ef\u652c\u64f6\u64f4\u64f2\u64fa\u6500\u64fd\u6518\u651c\u6505\u6524\u6523\u652b\u6534\u6535\u6537\u6536\u6538\u754b\u6548\u6556\u6555\u654d\u6558\u655e\u655d\u6572\u6578\u6582\u6583\u8b8a\u659b\u659f\u65ab\u65b7\u65c3\u65c6\u65c1\u65c4\u65cc\u65d2\u65db\u65d9\u65e0\u65e1\u65f1\u6772\u660a\u6603\u65fb\u6773\u6635\u6636\u6634\u661c\u664f\u6644\u6649\u6641\u665e\u665d\u6664\u6667\u6668\u665f\u6662\u6670\u6683\u6688\u668e\u6689\u6684\u6698\u669d\u66c1\u66b9\u66c9\u66be\u66bc",
        ],
        [
          40512,
          "\u66c4\u66b8\u66d6\u66da\u66e0\u663f\u66e6\u66e9\u66f0\u66f5\u66f7\u670f\u6716\u671e\u6726\u6727\u9738\u672e\u673f\u6736\u6741\u6738\u6737\u6746\u675e\u6760\u6759\u6763\u6764\u6789\u6770\u67a9\u677c\u676a\u678c\u678b\u67a6\u67a1\u6785\u67b7\u67ef\u67b4\u67ec\u67b3\u67e9\u67b8\u67e4\u67de\u67dd\u67e2\u67ee\u67b9\u67ce\u67c6\u67e7\u6a9c\u681e\u6846\u6829\u6840\u684d\u6832\u684e",
        ],
        [
          40576,
          "\u68b3\u682b\u6859\u6863\u6877\u687f\u689f\u688f\u68ad\u6894\u689d\u689b\u6883\u6aae\u68b9\u6874\u68b5\u68a0\u68ba\u690f\u688d\u687e\u6901\u68ca\u6908\u68d8\u6922\u6926\u68e1\u690c\u68cd\u68d4\u68e7\u68d5\u6936\u6912\u6904\u68d7\u68e3\u6925\u68f9\u68e0\u68ef\u6928\u692a\u691a\u6923\u6921\u68c6\u6979\u6977\u695c\u6978\u696b\u6954\u697e\u696e\u6939\u6974\u693d\u6959\u6930\u6961\u695e\u695d\u6981\u696a\u69b2\u69ae\u69d0\u69bf\u69c1\u69d3\u69be\u69ce\u5be8\u69ca\u69dd\u69bb\u69c3\u69a7\u6a2e\u6991\u69a0\u699c\u6995\u69b4\u69de\u69e8\u6a02\u6a1b\u69ff\u6b0a\u69f9\u69f2\u69e7\u6a05\u69b1\u6a1e\u69ed\u6a14\u69eb\u6a0a\u6a12\u6ac1\u6a23\u6a13\u6a44\u6a0c\u6a72\u6a36\u6a78\u6a47\u6a62\u6a59\u6a66\u6a48\u6a38\u6a22\u6a90\u6a8d\u6aa0\u6a84\u6aa2\u6aa3",
        ],
        [
          40768,
          "\u6a97\u8617\u6abb\u6ac3\u6ac2\u6ab8\u6ab3\u6aac\u6ade\u6ad1\u6adf\u6aaa\u6ada\u6aea\u6afb\u6b05\u8616\u6afa\u6b12\u6b16\u9b31\u6b1f\u6b38\u6b37\u76dc\u6b39\u98ee\u6b47\u6b43\u6b49\u6b50\u6b59\u6b54\u6b5b\u6b5f\u6b61\u6b78\u6b79\u6b7f\u6b80\u6b84\u6b83\u6b8d\u6b98\u6b95\u6b9e\u6ba4\u6baa\u6bab\u6baf\u6bb2\u6bb1\u6bb3\u6bb7\u6bbc\u6bc6\u6bcb\u6bd3\u6bdf\u6bec\u6beb\u6bf3\u6bef",
        ],
        [
          40832,
          "\u9ebe\u6c08\u6c13\u6c14\u6c1b\u6c24\u6c23\u6c5e\u6c55\u6c62\u6c6a\u6c82\u6c8d\u6c9a\u6c81\u6c9b\u6c7e\u6c68\u6c73\u6c92\u6c90\u6cc4\u6cf1\u6cd3\u6cbd\u6cd7\u6cc5\u6cdd\u6cae\u6cb1\u6cbe\u6cba\u6cdb\u6cef\u6cd9\u6cea\u6d1f\u884d\u6d36\u6d2b\u6d3d\u6d38\u6d19\u6d35\u6d33\u6d12\u6d0c\u6d63\u6d93\u6d64\u6d5a\u6d79\u6d59\u6d8e\u6d95\u6fe4\u6d85\u6df9\u6e15\u6e0a\u6db5\u6dc7\u6de6\u6db8\u6dc6\u6dec\u6dde\u6dcc\u6de8\u6dd2\u6dc5\u6dfa\u6dd9\u6de4\u6dd5\u6dea\u6dee\u6e2d\u6e6e\u6e2e\u6e19\u6e72\u6e5f\u6e3e\u6e23\u6e6b\u6e2b\u6e76\u6e4d\u6e1f\u6e43\u6e3a\u6e4e\u6e24\u6eff\u6e1d\u6e38\u6e82\u6eaa\u6e98\u6ec9\u6eb7\u6ed3\u6ebd\u6eaf\u6ec4\u6eb2\u6ed4\u6ed5\u6e8f\u6ea5\u6ec2\u6e9f\u6f41\u6f11\u704c\u6eec\u6ef8\u6efe\u6f3f\u6ef2\u6f31\u6eef\u6f32\u6ecc",
        ],
        [
          57408,
          "\u6f3e\u6f13\u6ef7\u6f86\u6f7a\u6f78\u6f81\u6f80\u6f6f\u6f5b\u6ff3\u6f6d\u6f82\u6f7c\u6f58\u6f8e\u6f91\u6fc2\u6f66\u6fb3\u6fa3\u6fa1\u6fa4\u6fb9\u6fc6\u6faa\u6fdf\u6fd5\u6fec\u6fd4\u6fd8\u6ff1\u6fee\u6fdb\u7009\u700b\u6ffa\u7011\u7001\u700f\u6ffe\u701b\u701a\u6f74\u701d\u7018\u701f\u7030\u703e\u7032\u7051\u7063\u7099\u7092\u70af\u70f1\u70ac\u70b8\u70b3\u70ae\u70df\u70cb\u70dd",
        ],
        [
          57472,
          "\u70d9\u7109\u70fd\u711c\u7119\u7165\u7155\u7188\u7166\u7162\u714c\u7156\u716c\u718f\u71fb\u7184\u7195\u71a8\u71ac\u71d7\u71b9\u71be\u71d2\u71c9\u71d4\u71ce\u71e0\u71ec\u71e7\u71f5\u71fc\u71f9\u71ff\u720d\u7210\u721b\u7228\u722d\u722c\u7230\u7232\u723b\u723c\u723f\u7240\u7246\u724b\u7258\u7274\u727e\u7282\u7281\u7287\u7292\u7296\u72a2\u72a7\u72b9\u72b2\u72c3\u72c6\u72c4\u72ce\u72d2\u72e2\u72e0\u72e1\u72f9\u72f7\u500f\u7317\u730a\u731c\u7316\u731d\u7334\u732f\u7329\u7325\u733e\u734e\u734f\u9ed8\u7357\u736a\u7368\u7370\u7378\u7375\u737b\u737a\u73c8\u73b3\u73ce\u73bb\u73c0\u73e5\u73ee\u73de\u74a2\u7405\u746f\u7425\u73f8\u7432\u743a\u7455\u743f\u745f\u7459\u7441\u745c\u7469\u7470\u7463\u746a\u7476\u747e\u748b\u749e\u74a7\u74ca\u74cf\u74d4\u73f1",
        ],
        [
          57664,
          "\u74e0\u74e3\u74e7\u74e9\u74ee\u74f2\u74f0\u74f1\u74f8\u74f7\u7504\u7503\u7505\u750c\u750e\u750d\u7515\u7513\u751e\u7526\u752c\u753c\u7544\u754d\u754a\u7549\u755b\u7546\u755a\u7569\u7564\u7567\u756b\u756d\u7578\u7576\u7586\u7587\u7574\u758a\u7589\u7582\u7594\u759a\u759d\u75a5\u75a3\u75c2\u75b3\u75c3\u75b5\u75bd\u75b8\u75bc\u75b1\u75cd\u75ca\u75d2\u75d9\u75e3\u75de\u75fe\u75ff",
        ],
        [
          57728,
          "\u75fc\u7601\u75f0\u75fa\u75f2\u75f3\u760b\u760d\u7609\u761f\u7627\u7620\u7621\u7622\u7624\u7634\u7630\u763b\u7647\u7648\u7646\u765c\u7658\u7661\u7662\u7668\u7669\u766a\u7667\u766c\u7670\u7672\u7676\u7678\u767c\u7680\u7683\u7688\u768b\u768e\u7696\u7693\u7699\u769a\u76b0\u76b4\u76b8\u76b9\u76ba\u76c2\u76cd\u76d6\u76d2\u76de\u76e1\u76e5\u76e7\u76ea\u862f\u76fb\u7708\u7707\u7704\u7729\u7724\u771e\u7725\u7726\u771b\u7737\u7738\u7747\u775a\u7768\u776b\u775b\u7765\u777f\u777e\u7779\u778e\u778b\u7791\u77a0\u779e\u77b0\u77b6\u77b9\u77bf\u77bc\u77bd\u77bb\u77c7\u77cd\u77d7\u77da\u77dc\u77e3\u77ee\u77fc\u780c\u7812\u7926\u7820\u792a\u7845\u788e\u7874\u7886\u787c\u789a\u788c\u78a3\u78b5\u78aa\u78af\u78d1\u78c6\u78cb\u78d4\u78be\u78bc\u78c5\u78ca\u78ec",
        ],
        [
          57920,
          "\u78e7\u78da\u78fd\u78f4\u7907\u7912\u7911\u7919\u792c\u792b\u7940\u7960\u7957\u795f\u795a\u7955\u7953\u797a\u797f\u798a\u799d\u79a7\u9f4b\u79aa\u79ae\u79b3\u79b9\u79ba\u79c9\u79d5\u79e7\u79ec\u79e1\u79e3\u7a08\u7a0d\u7a18\u7a19\u7a20\u7a1f\u7980\u7a31\u7a3b\u7a3e\u7a37\u7a43\u7a57\u7a49\u7a61\u7a62\u7a69\u9f9d\u7a70\u7a79\u7a7d\u7a88\u7a97\u7a95\u7a98\u7a96\u7aa9\u7ac8\u7ab0",
        ],
        [
          57984,
          "\u7ab6\u7ac5\u7ac4\u7abf\u9083\u7ac7\u7aca\u7acd\u7acf\u7ad5\u7ad3\u7ad9\u7ada\u7add\u7ae1\u7ae2\u7ae6\u7aed\u7af0\u7b02\u7b0f\u7b0a\u7b06\u7b33\u7b18\u7b19\u7b1e\u7b35\u7b28\u7b36\u7b50\u7b7a\u7b04\u7b4d\u7b0b\u7b4c\u7b45\u7b75\u7b65\u7b74\u7b67\u7b70\u7b71\u7b6c\u7b6e\u7b9d\u7b98\u7b9f\u7b8d\u7b9c\u7b9a\u7b8b\u7b92\u7b8f\u7b5d\u7b99\u7bcb\u7bc1\u7bcc\u7bcf\u7bb4\u7bc6\u7bdd\u7be9\u7c11\u7c14\u7be6\u7be5\u7c60\u7c00\u7c07\u7c13\u7bf3\u7bf7\u7c17\u7c0d\u7bf6\u7c23\u7c27\u7c2a\u7c1f\u7c37\u7c2b\u7c3d\u7c4c\u7c43\u7c54\u7c4f\u7c40\u7c50\u7c58\u7c5f\u7c64\u7c56\u7c65\u7c6c\u7c75\u7c83\u7c90\u7ca4\u7cad\u7ca2\u7cab\u7ca1\u7ca8\u7cb3\u7cb2\u7cb1\u7cae\u7cb9\u7cbd\u7cc0\u7cc5\u7cc2\u7cd8\u7cd2\u7cdc\u7ce2\u9b3b\u7cef\u7cf2\u7cf4\u7cf6\u7cfa\u7d06",
        ],
        [
          58176,
          "\u7d02\u7d1c\u7d15\u7d0a\u7d45\u7d4b\u7d2e\u7d32\u7d3f\u7d35\u7d46\u7d73\u7d56\u7d4e\u7d72\u7d68\u7d6e\u7d4f\u7d63\u7d93\u7d89\u7d5b\u7d8f\u7d7d\u7d9b\u7dba\u7dae\u7da3\u7db5\u7dc7\u7dbd\u7dab\u7e3d\u7da2\u7daf\u7ddc\u7db8\u7d9f\u7db0\u7dd8\u7ddd\u7de4\u7dde\u7dfb\u7df2\u7de1\u7e05\u7e0a\u7e23\u7e21\u7e12\u7e31\u7e1f\u7e09\u7e0b\u7e22\u7e46\u7e66\u7e3b\u7e35\u7e39\u7e43\u7e37",
        ],
        [
          58240,
          "\u7e32\u7e3a\u7e67\u7e5d\u7e56\u7e5e\u7e59\u7e5a\u7e79\u7e6a\u7e69\u7e7c\u7e7b\u7e83\u7dd5\u7e7d\u8fae\u7e7f\u7e88\u7e89\u7e8c\u7e92\u7e90\u7e93\u7e94\u7e96\u7e8e\u7e9b\u7e9c\u7f38\u7f3a\u7f45\u7f4c\u7f4d\u7f4e\u7f50\u7f51\u7f55\u7f54\u7f58\u7f5f\u7f60\u7f68\u7f69\u7f67\u7f78\u7f82\u7f86\u7f83\u7f88\u7f87\u7f8c\u7f94\u7f9e\u7f9d\u7f9a\u7fa3\u7faf\u7fb2\u7fb9\u7fae\u7fb6\u7fb8\u8b71\u7fc5\u7fc6\u7fca\u7fd5\u7fd4\u7fe1\u7fe6\u7fe9\u7ff3\u7ff9\u98dc\u8006\u8004\u800b\u8012\u8018\u8019\u801c\u8021\u8028\u803f\u803b\u804a\u8046\u8052\u8058\u805a\u805f\u8062\u8068\u8073\u8072\u8070\u8076\u8079\u807d\u807f\u8084\u8086\u8085\u809b\u8093\u809a\u80ad\u5190\u80ac\u80db\u80e5\u80d9\u80dd\u80c4\u80da\u80d6\u8109\u80ef\u80f1\u811b\u8129\u8123\u812f\u814b",
        ],
        [
          58432,
          "\u968b\u8146\u813e\u8153\u8151\u80fc\u8171\u816e\u8165\u8166\u8174\u8183\u8188\u818a\u8180\u8182\u81a0\u8195\u81a4\u81a3\u815f\u8193\u81a9\u81b0\u81b5\u81be\u81b8\u81bd\u81c0\u81c2\u81ba\u81c9\u81cd\u81d1\u81d9\u81d8\u81c8\u81da\u81df\u81e0\u81e7\u81fa\u81fb\u81fe\u8201\u8202\u8205\u8207\u820a\u820d\u8210\u8216\u8229\u822b\u8238\u8233\u8240\u8259\u8258\u825d\u825a\u825f\u8264",
        ],
        [
          58496,
          "\u8262\u8268\u826a\u826b\u822e\u8271\u8277\u8278\u827e\u828d\u8292\u82ab\u829f\u82bb\u82ac\u82e1\u82e3\u82df\u82d2\u82f4\u82f3\u82fa\u8393\u8303\u82fb\u82f9\u82de\u8306\u82dc\u8309\u82d9\u8335\u8334\u8316\u8332\u8331\u8340\u8339\u8350\u8345\u832f\u832b\u8317\u8318\u8385\u839a\u83aa\u839f\u83a2\u8396\u8323\u838e\u8387\u838a\u837c\u83b5\u8373\u8375\u83a0\u8389\u83a8\u83f4\u8413\u83eb\u83ce\u83fd\u8403\u83d8\u840b\u83c1\u83f7\u8407\u83e0\u83f2\u840d\u8422\u8420\u83bd\u8438\u8506\u83fb\u846d\u842a\u843c\u855a\u8484\u8477\u846b\u84ad\u846e\u8482\u8469\u8446\u842c\u846f\u8479\u8435\u84ca\u8462\u84b9\u84bf\u849f\u84d9\u84cd\u84bb\u84da\u84d0\u84c1\u84c6\u84d6\u84a1\u8521\u84ff\u84f4\u8517\u8518\u852c\u851f\u8515\u8514\u84fc\u8540\u8563\u8558\u8548",
        ],
        [
          58688,
          "\u8541\u8602\u854b\u8555\u8580\u85a4\u8588\u8591\u858a\u85a8\u856d\u8594\u859b\u85ea\u8587\u859c\u8577\u857e\u8590\u85c9\u85ba\u85cf\u85b9\u85d0\u85d5\u85dd\u85e5\u85dc\u85f9\u860a\u8613\u860b\u85fe\u85fa\u8606\u8622\u861a\u8630\u863f\u864d\u4e55\u8654\u865f\u8667\u8671\u8693\u86a3\u86a9\u86aa\u868b\u868c\u86b6\u86af\u86c4\u86c6\u86b0\u86c9\u8823\u86ab\u86d4\u86de\u86e9\u86ec",
        ],
        [
          58752,
          "\u86df\u86db\u86ef\u8712\u8706\u8708\u8700\u8703\u86fb\u8711\u8709\u870d\u86f9\u870a\u8734\u873f\u8737\u873b\u8725\u8729\u871a\u8760\u875f\u8778\u874c\u874e\u8774\u8757\u8768\u876e\u8759\u8753\u8763\u876a\u8805\u87a2\u879f\u8782\u87af\u87cb\u87bd\u87c0\u87d0\u96d6\u87ab\u87c4\u87b3\u87c7\u87c6\u87bb\u87ef\u87f2\u87e0\u880f\u880d\u87fe\u87f6\u87f7\u880e\u87d2\u8811\u8816\u8815\u8822\u8821\u8831\u8836\u8839\u8827\u883b\u8844\u8842\u8852\u8859\u885e\u8862\u886b\u8881\u887e\u889e\u8875\u887d\u88b5\u8872\u8882\u8897\u8892\u88ae\u8899\u88a2\u888d\u88a4\u88b0\u88bf\u88b1\u88c3\u88c4\u88d4\u88d8\u88d9\u88dd\u88f9\u8902\u88fc\u88f4\u88e8\u88f2\u8904\u890c\u890a\u8913\u8943\u891e\u8925\u892a\u892b\u8941\u8944\u893b\u8936\u8938\u894c\u891d\u8960\u895e",
        ],
        [
          58944,
          "\u8966\u8964\u896d\u896a\u896f\u8974\u8977\u897e\u8983\u8988\u898a\u8993\u8998\u89a1\u89a9\u89a6\u89ac\u89af\u89b2\u89ba\u89bd\u89bf\u89c0\u89da\u89dc\u89dd\u89e7\u89f4\u89f8\u8a03\u8a16\u8a10\u8a0c\u8a1b\u8a1d\u8a25\u8a36\u8a41\u8a5b\u8a52\u8a46\u8a48\u8a7c\u8a6d\u8a6c\u8a62\u8a85\u8a82\u8a84\u8aa8\u8aa1\u8a91\u8aa5\u8aa6\u8a9a\u8aa3\u8ac4\u8acd\u8ac2\u8ada\u8aeb\u8af3\u8ae7",
        ],
        [
          59008,
          "\u8ae4\u8af1\u8b14\u8ae0\u8ae2\u8af7\u8ade\u8adb\u8b0c\u8b07\u8b1a\u8ae1\u8b16\u8b10\u8b17\u8b20\u8b33\u97ab\u8b26\u8b2b\u8b3e\u8b28\u8b41\u8b4c\u8b4f\u8b4e\u8b49\u8b56\u8b5b\u8b5a\u8b6b\u8b5f\u8b6c\u8b6f\u8b74\u8b7d\u8b80\u8b8c\u8b8e\u8b92\u8b93\u8b96\u8b99\u8b9a\u8c3a\u8c41\u8c3f\u8c48\u8c4c\u8c4e\u8c50\u8c55\u8c62\u8c6c\u8c78\u8c7a\u8c82\u8c89\u8c85\u8c8a\u8c8d\u8c8e\u8c94\u8c7c\u8c98\u621d\u8cad\u8caa\u8cbd\u8cb2\u8cb3\u8cae\u8cb6\u8cc8\u8cc1\u8ce4\u8ce3\u8cda\u8cfd\u8cfa\u8cfb\u8d04\u8d05\u8d0a\u8d07\u8d0f\u8d0d\u8d10\u9f4e\u8d13\u8ccd\u8d14\u8d16\u8d67\u8d6d\u8d71\u8d73\u8d81\u8d99\u8dc2\u8dbe\u8dba\u8dcf\u8dda\u8dd6\u8dcc\u8ddb\u8dcb\u8dea\u8deb\u8ddf\u8de3\u8dfc\u8e08\u8e09\u8dff\u8e1d\u8e1e\u8e10\u8e1f\u8e42\u8e35\u8e30\u8e34\u8e4a",
        ],
        [
          59200,
          "\u8e47\u8e49\u8e4c\u8e50\u8e48\u8e59\u8e64\u8e60\u8e2a\u8e63\u8e55\u8e76\u8e72\u8e7c\u8e81\u8e87\u8e85\u8e84\u8e8b\u8e8a\u8e93\u8e91\u8e94\u8e99\u8eaa\u8ea1\u8eac\u8eb0\u8ec6\u8eb1\u8ebe\u8ec5\u8ec8\u8ecb\u8edb\u8ee3\u8efc\u8efb\u8eeb\u8efe\u8f0a\u8f05\u8f15\u8f12\u8f19\u8f13\u8f1c\u8f1f\u8f1b\u8f0c\u8f26\u8f33\u8f3b\u8f39\u8f45\u8f42\u8f3e\u8f4c\u8f49\u8f46\u8f4e\u8f57\u8f5c",
        ],
        [
          59264,
          "\u8f62\u8f63\u8f64\u8f9c\u8f9f\u8fa3\u8fad\u8faf\u8fb7\u8fda\u8fe5\u8fe2\u8fea\u8fef\u9087\u8ff4\u9005\u8ff9\u8ffa\u9011\u9015\u9021\u900d\u901e\u9016\u900b\u9027\u9036\u9035\u9039\u8ff8\u904f\u9050\u9051\u9052\u900e\u9049\u903e\u9056\u9058\u905e\u9068\u906f\u9076\u96a8\u9072\u9082\u907d\u9081\u9080\u908a\u9089\u908f\u90a8\u90af\u90b1\u90b5\u90e2\u90e4\u6248\u90db\u9102\u9112\u9119\u9132\u9130\u914a\u9156\u9158\u9163\u9165\u9169\u9173\u9172\u918b\u9189\u9182\u91a2\u91ab\u91af\u91aa\u91b5\u91b4\u91ba\u91c0\u91c1\u91c9\u91cb\u91d0\u91d6\u91df\u91e1\u91db\u91fc\u91f5\u91f6\u921e\u91ff\u9214\u922c\u9215\u9211\u925e\u9257\u9245\u9249\u9264\u9248\u9295\u923f\u924b\u9250\u929c\u9296\u9293\u929b\u925a\u92cf\u92b9\u92b7\u92e9\u930f\u92fa\u9344\u932e",
        ],
        [
          59456,
          "\u9319\u9322\u931a\u9323\u933a\u9335\u933b\u935c\u9360\u937c\u936e\u9356\u93b0\u93ac\u93ad\u9394\u93b9\u93d6\u93d7\u93e8\u93e5\u93d8\u93c3\u93dd\u93d0\u93c8\u93e4\u941a\u9414\u9413\u9403\u9407\u9410\u9436\u942b\u9435\u9421\u943a\u9441\u9452\u9444\u945b\u9460\u9462\u945e\u946a\u9229\u9470\u9475\u9477\u947d\u945a\u947c\u947e\u9481\u947f\u9582\u9587\u958a\u9594\u9596\u9598\u9599",
        ],
        [
          59520,
          "\u95a0\u95a8\u95a7\u95ad\u95bc\u95bb\u95b9\u95be\u95ca\u6ff6\u95c3\u95cd\u95cc\u95d5\u95d4\u95d6\u95dc\u95e1\u95e5\u95e2\u9621\u9628\u962e\u962f\u9642\u964c\u964f\u964b\u9677\u965c\u965e\u965d\u965f\u9666\u9672\u966c\u968d\u9698\u9695\u9697\u96aa\u96a7\u96b1\u96b2\u96b0\u96b4\u96b6\u96b8\u96b9\u96ce\u96cb\u96c9\u96cd\u894d\u96dc\u970d\u96d5\u96f9\u9704\u9706\u9708\u9713\u970e\u9711\u970f\u9716\u9719\u9724\u972a\u9730\u9739\u973d\u973e\u9744\u9746\u9748\u9742\u9749\u975c\u9760\u9764\u9766\u9768\u52d2\u976b\u9771\u9779\u9785\u977c\u9781\u977a\u9786\u978b\u978f\u9790\u979c\u97a8\u97a6\u97a3\u97b3\u97b4\u97c3\u97c6\u97c8\u97cb\u97dc\u97ed\u9f4f\u97f2\u7adf\u97f6\u97f5\u980f\u980c\u9838\u9824\u9821\u9837\u983d\u9846\u984f\u984b\u986b\u986f\u9870",
        ],
        [
          59712,
          "\u9871\u9874\u9873\u98aa\u98af\u98b1\u98b6\u98c4\u98c3\u98c6\u98e9\u98eb\u9903\u9909\u9912\u9914\u9918\u9921\u991d\u991e\u9924\u9920\u992c\u992e\u993d\u993e\u9942\u9949\u9945\u9950\u994b\u9951\u9952\u994c\u9955\u9997\u9998\u99a5\u99ad\u99ae\u99bc\u99df\u99db\u99dd\u99d8\u99d1\u99ed\u99ee\u99f1\u99f2\u99fb\u99f8\u9a01\u9a0f\u9a05\u99e2\u9a19\u9a2b\u9a37\u9a45\u9a42\u9a40\u9a43",
        ],
        [
          59776,
          "\u9a3e\u9a55\u9a4d\u9a5b\u9a57\u9a5f\u9a62\u9a65\u9a64\u9a69\u9a6b\u9a6a\u9aad\u9ab0\u9abc\u9ac0\u9acf\u9ad1\u9ad3\u9ad4\u9ade\u9adf\u9ae2\u9ae3\u9ae6\u9aef\u9aeb\u9aee\u9af4\u9af1\u9af7\u9afb\u9b06\u9b18\u9b1a\u9b1f\u9b22\u9b23\u9b25\u9b27\u9b28\u9b29\u9b2a\u9b2e\u9b2f\u9b32\u9b44\u9b43\u9b4f\u9b4d\u9b4e\u9b51\u9b58\u9b74\u9b93\u9b83\u9b91\u9b96\u9b97\u9b9f\u9ba0\u9ba8\u9bb4\u9bc0\u9bca\u9bb9\u9bc6\u9bcf\u9bd1\u9bd2\u9be3\u9be2\u9be4\u9bd4\u9be1\u9c3a\u9bf2\u9bf1\u9bf0\u9c15\u9c14\u9c09\u9c13\u9c0c\u9c06\u9c08\u9c12\u9c0a\u9c04\u9c2e\u9c1b\u9c25\u9c24\u9c21\u9c30\u9c47\u9c32\u9c46\u9c3e\u9c5a\u9c60\u9c67\u9c76\u9c78\u9ce7\u9cec\u9cf0\u9d09\u9d08\u9ceb\u9d03\u9d06\u9d2a\u9d26\u9daf\u9d23\u9d1f\u9d44\u9d15\u9d12\u9d41\u9d3f\u9d3e\u9d46\u9d48",
        ],
        [
          59968,
          "\u9d5d\u9d5e\u9d64\u9d51\u9d50\u9d59\u9d72\u9d89\u9d87\u9dab\u9d6f\u9d7a\u9d9a\u9da4\u9da9\u9db2\u9dc4\u9dc1\u9dbb\u9db8\u9dba\u9dc6\u9dcf\u9dc2\u9dd9\u9dd3\u9df8\u9de6\u9ded\u9def\u9dfd\u9e1a\u9e1b\u9e1e\u9e75\u9e79\u9e7d\u9e81\u9e88\u9e8b\u9e8c\u9e92\u9e95\u9e91\u9e9d\u9ea5\u9ea9\u9eb8\u9eaa\u9ead\u9761\u9ecc\u9ece\u9ecf\u9ed0\u9ed4\u9edc\u9ede\u9edd\u9ee0\u9ee5\u9ee8\u9eef",
        ],
        [
          60032,
          "\u9ef4\u9ef6\u9ef7\u9ef9\u9efb\u9efc\u9efd\u9f07\u9f08\u76b7\u9f15\u9f21\u9f2c\u9f3e\u9f4a\u9f52\u9f54\u9f63\u9f5f\u9f60\u9f61\u9f66\u9f67\u9f6c\u9f6a\u9f77\u9f72\u9f76\u9f95\u9f9c\u9fa0\u582f\u69c7\u9059\u7464\u51dc\u7199",
        ],
      ];
    function ee() {
      if (!Z) {
        for (var e = {}, t = {}, d = Q.length, n = 0; n < d; n++)
          for (var r = Q[n], o = r[1], i = o.length, a = 0; a < i; a++) {
            var s = r[0] + a,
              l = o.charAt(a).charCodeAt(0);
            (e[l] = s), (t[s] = l);
          }
        Z = { UTF8_TO_SJIS: e, SJIS_TO_UTF8: t };
      }
      return Z;
    }
    function te(e, t) {
      for (var d = "", n = [], r = e.readBits([10, 12, 14][t]); r >= 3; ) {
        if ((s = e.readBits(10)) >= 1e3)
          throw "invalid numeric value above 999";
        var o = Math.floor(s / 100),
          i = Math.floor(s / 10) % 10,
          a = s % 10;
        n.push(48 + o, 48 + i, 48 + a),
          (d += o.toString() + i.toString() + a.toString()),
          (r -= 3);
      }
      if (2 === r) {
        if ((s = e.readBits(7)) >= 100) throw "invalid numeric value above 99";
        (o = Math.floor(s / 10)),
          n.push(48 + o, 48 + (i = s % 10)),
          (d += o.toString() + i.toString());
      } else if (1 === r) {
        var s;
        if ((s = e.readBits(4)) >= 10) throw "invalid numeric value above 9";
        n.push(48 + s), (d += s.toString());
      }
      return { bytes: n, data: d };
    }
    var de = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":",
    ];
    function ne(e, t) {
      for (var d = "", n = [], r = e.readBits([9, 11, 13][t]); r >= 2; ) {
        var o = e.readBits(11),
          i = Math.floor(o / 45),
          a = o % 45;
        n.push(de[i].charCodeAt(0), de[a].charCodeAt(0)),
          (d += de[i] + de[a]),
          (r -= 2);
      }
      return (
        1 === r &&
          ((i = e.readBits(6)), n.push(de[i].charCodeAt(0)), (d += de[i])),
        { bytes: n, data: d }
      );
    }
    function re(e, t, d) {
      for (var n = [], r = e.readBits([8, 16, 16][t]), o = 0; o < r; o++)
        n.push(e.readBits(8));
      return {
        bytes: n,
        data:
          20 === d
            ? (function (e) {
                for (
                  var t = 0, d = "", n = e.length, r = ee().SJIS_TO_UTF8;
                  t < n;

                ) {
                  var o = e[t++];
                  if (o < 128) d += String.fromCharCode(o);
                  else if (160 <= o && o <= 223)
                    d += String.fromCharCode(o + 65216);
                  else {
                    var i = (o << 8) + e[t++];
                    d += null != (i = r[i]) ? String.fromCharCode(i) : "?";
                  }
                }
                return d;
              })(n)
            : (function (e) {
                for (var t = 0, d = "", n = e.length; t < n; ) {
                  var r = e[t++];
                  if (r < 128) d += String.fromCharCode(r);
                  else if (r > 191 && r < 224) {
                    var o = e[t++];
                    d += String.fromCharCode(((31 & r) << 6) | (63 & o));
                  } else if (r > 239 && r < 365) {
                    var i =
                      (((7 & r) << 18) |
                        ((63 & (o = e[t++])) << 12) |
                        ((63 & (a = e[t++])) << 6) |
                        (63 & e[t++])) -
                      65536;
                    (d += String.fromCharCode(55296 + (i >> 10))),
                      (d += String.fromCharCode(56320 + (1023 & i)));
                  } else {
                    o = e[t++];
                    var a = e[t++];
                    d += String.fromCharCode(
                      ((15 & r) << 12) | ((63 & o) << 6) | (63 & a)
                    );
                  }
                }
                return d;
              })(n),
      };
    }
    function oe(e, t) {
      for (
        var d = "",
          n = [],
          r = ee().SJIS_TO_UTF8,
          o = e.readBits([8, 10, 12][t]),
          i = 0;
        i < o;
        i++
      ) {
        var a = e.readBits(13),
          s = (Math.floor(a / 192) << 8) | a % 192;
        n.push((s += s < 7936 ? 33088 : 49472) >> 8, 255 & s);
        var l = r[s];
        d += String.fromCharCode(null != l ? l : s);
      }
      return { bytes: n, data: d };
    }
    var ie = [
      {
        infoBits: null,
        versionNumber: 1,
        alignmentPatternCenters: [],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 10,
            ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 16 }],
          },
          {
            ecCodewordsPerBlock: 7,
            ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 19 }],
          },
          {
            ecCodewordsPerBlock: 17,
            ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 9 }],
          },
          {
            ecCodewordsPerBlock: 13,
            ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 13 }],
          },
        ],
      },
      {
        infoBits: null,
        versionNumber: 2,
        alignmentPatternCenters: [6, 18],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 16,
            ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 28 }],
          },
          {
            ecCodewordsPerBlock: 10,
            ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 34 }],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 16 }],
          },
          {
            ecCodewordsPerBlock: 22,
            ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 22 }],
          },
        ],
      },
      {
        infoBits: null,
        versionNumber: 3,
        alignmentPatternCenters: [6, 22],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 26,
            ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 44 }],
          },
          {
            ecCodewordsPerBlock: 15,
            ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 55 }],
          },
          {
            ecCodewordsPerBlock: 22,
            ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 13 }],
          },
          {
            ecCodewordsPerBlock: 18,
            ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 17 }],
          },
        ],
      },
      {
        infoBits: null,
        versionNumber: 4,
        alignmentPatternCenters: [6, 26],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 18,
            ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 32 }],
          },
          {
            ecCodewordsPerBlock: 20,
            ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 80 }],
          },
          {
            ecCodewordsPerBlock: 16,
            ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 9 }],
          },
          {
            ecCodewordsPerBlock: 26,
            ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 24 }],
          },
        ],
      },
      {
        infoBits: null,
        versionNumber: 5,
        alignmentPatternCenters: [6, 30],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 24,
            ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 43 }],
          },
          {
            ecCodewordsPerBlock: 26,
            ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 108 }],
          },
          {
            ecCodewordsPerBlock: 22,
            ecBlocks: [
              { numBlocks: 2, dataCodewordsPerBlock: 11 },
              { numBlocks: 2, dataCodewordsPerBlock: 12 },
            ],
          },
          {
            ecCodewordsPerBlock: 18,
            ecBlocks: [
              { numBlocks: 2, dataCodewordsPerBlock: 15 },
              { numBlocks: 2, dataCodewordsPerBlock: 16 },
            ],
          },
        ],
      },
      {
        infoBits: null,
        versionNumber: 6,
        alignmentPatternCenters: [6, 34],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 16,
            ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 27 }],
          },
          {
            ecCodewordsPerBlock: 18,
            ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 68 }],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 15 }],
          },
          {
            ecCodewordsPerBlock: 24,
            ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 19 }],
          },
        ],
      },
      {
        infoBits: 31892,
        versionNumber: 7,
        alignmentPatternCenters: [6, 22, 38],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 18,
            ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 31 }],
          },
          {
            ecCodewordsPerBlock: 20,
            ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 78 }],
          },
          {
            ecCodewordsPerBlock: 26,
            ecBlocks: [
              { numBlocks: 4, dataCodewordsPerBlock: 13 },
              { numBlocks: 1, dataCodewordsPerBlock: 14 },
            ],
          },
          {
            ecCodewordsPerBlock: 18,
            ecBlocks: [
              { numBlocks: 2, dataCodewordsPerBlock: 14 },
              { numBlocks: 4, dataCodewordsPerBlock: 15 },
            ],
          },
        ],
      },
      {
        infoBits: 34236,
        versionNumber: 8,
        alignmentPatternCenters: [6, 24, 42],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 22,
            ecBlocks: [
              { numBlocks: 2, dataCodewordsPerBlock: 38 },
              { numBlocks: 2, dataCodewordsPerBlock: 39 },
            ],
          },
          {
            ecCodewordsPerBlock: 24,
            ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 97 }],
          },
          {
            ecCodewordsPerBlock: 26,
            ecBlocks: [
              { numBlocks: 4, dataCodewordsPerBlock: 14 },
              { numBlocks: 2, dataCodewordsPerBlock: 15 },
            ],
          },
          {
            ecCodewordsPerBlock: 22,
            ecBlocks: [
              { numBlocks: 4, dataCodewordsPerBlock: 18 },
              { numBlocks: 2, dataCodewordsPerBlock: 19 },
            ],
          },
        ],
      },
      {
        infoBits: 39577,
        versionNumber: 9,
        alignmentPatternCenters: [6, 26, 46],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 22,
            ecBlocks: [
              { numBlocks: 3, dataCodewordsPerBlock: 36 },
              { numBlocks: 2, dataCodewordsPerBlock: 37 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 116 }],
          },
          {
            ecCodewordsPerBlock: 24,
            ecBlocks: [
              { numBlocks: 4, dataCodewordsPerBlock: 12 },
              { numBlocks: 4, dataCodewordsPerBlock: 13 },
            ],
          },
          {
            ecCodewordsPerBlock: 20,
            ecBlocks: [
              { numBlocks: 4, dataCodewordsPerBlock: 16 },
              { numBlocks: 4, dataCodewordsPerBlock: 17 },
            ],
          },
        ],
      },
      {
        infoBits: 42195,
        versionNumber: 10,
        alignmentPatternCenters: [6, 28, 50],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 26,
            ecBlocks: [
              { numBlocks: 4, dataCodewordsPerBlock: 43 },
              { numBlocks: 1, dataCodewordsPerBlock: 44 },
            ],
          },
          {
            ecCodewordsPerBlock: 18,
            ecBlocks: [
              { numBlocks: 2, dataCodewordsPerBlock: 68 },
              { numBlocks: 2, dataCodewordsPerBlock: 69 },
            ],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 6, dataCodewordsPerBlock: 15 },
              { numBlocks: 2, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 24,
            ecBlocks: [
              { numBlocks: 6, dataCodewordsPerBlock: 19 },
              { numBlocks: 2, dataCodewordsPerBlock: 20 },
            ],
          },
        ],
      },
      {
        infoBits: 48118,
        versionNumber: 11,
        alignmentPatternCenters: [6, 30, 54],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 1, dataCodewordsPerBlock: 50 },
              { numBlocks: 4, dataCodewordsPerBlock: 51 },
            ],
          },
          {
            ecCodewordsPerBlock: 20,
            ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 81 }],
          },
          {
            ecCodewordsPerBlock: 24,
            ecBlocks: [
              { numBlocks: 3, dataCodewordsPerBlock: 12 },
              { numBlocks: 8, dataCodewordsPerBlock: 13 },
            ],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 4, dataCodewordsPerBlock: 22 },
              { numBlocks: 4, dataCodewordsPerBlock: 23 },
            ],
          },
        ],
      },
      {
        infoBits: 51042,
        versionNumber: 12,
        alignmentPatternCenters: [6, 32, 58],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 22,
            ecBlocks: [
              { numBlocks: 6, dataCodewordsPerBlock: 36 },
              { numBlocks: 2, dataCodewordsPerBlock: 37 },
            ],
          },
          {
            ecCodewordsPerBlock: 24,
            ecBlocks: [
              { numBlocks: 2, dataCodewordsPerBlock: 92 },
              { numBlocks: 2, dataCodewordsPerBlock: 93 },
            ],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 7, dataCodewordsPerBlock: 14 },
              { numBlocks: 4, dataCodewordsPerBlock: 15 },
            ],
          },
          {
            ecCodewordsPerBlock: 26,
            ecBlocks: [
              { numBlocks: 4, dataCodewordsPerBlock: 20 },
              { numBlocks: 6, dataCodewordsPerBlock: 21 },
            ],
          },
        ],
      },
      {
        infoBits: 55367,
        versionNumber: 13,
        alignmentPatternCenters: [6, 34, 62],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 22,
            ecBlocks: [
              { numBlocks: 8, dataCodewordsPerBlock: 37 },
              { numBlocks: 1, dataCodewordsPerBlock: 38 },
            ],
          },
          {
            ecCodewordsPerBlock: 26,
            ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 107 }],
          },
          {
            ecCodewordsPerBlock: 22,
            ecBlocks: [
              { numBlocks: 12, dataCodewordsPerBlock: 11 },
              { numBlocks: 4, dataCodewordsPerBlock: 12 },
            ],
          },
          {
            ecCodewordsPerBlock: 24,
            ecBlocks: [
              { numBlocks: 8, dataCodewordsPerBlock: 20 },
              { numBlocks: 4, dataCodewordsPerBlock: 21 },
            ],
          },
        ],
      },
      {
        infoBits: 58893,
        versionNumber: 14,
        alignmentPatternCenters: [6, 26, 46, 66],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 24,
            ecBlocks: [
              { numBlocks: 4, dataCodewordsPerBlock: 40 },
              { numBlocks: 5, dataCodewordsPerBlock: 41 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 3, dataCodewordsPerBlock: 115 },
              { numBlocks: 1, dataCodewordsPerBlock: 116 },
            ],
          },
          {
            ecCodewordsPerBlock: 24,
            ecBlocks: [
              { numBlocks: 11, dataCodewordsPerBlock: 12 },
              { numBlocks: 5, dataCodewordsPerBlock: 13 },
            ],
          },
          {
            ecCodewordsPerBlock: 20,
            ecBlocks: [
              { numBlocks: 11, dataCodewordsPerBlock: 16 },
              { numBlocks: 5, dataCodewordsPerBlock: 17 },
            ],
          },
        ],
      },
      {
        infoBits: 63784,
        versionNumber: 15,
        alignmentPatternCenters: [6, 26, 48, 70],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 24,
            ecBlocks: [
              { numBlocks: 5, dataCodewordsPerBlock: 41 },
              { numBlocks: 5, dataCodewordsPerBlock: 42 },
            ],
          },
          {
            ecCodewordsPerBlock: 22,
            ecBlocks: [
              { numBlocks: 5, dataCodewordsPerBlock: 87 },
              { numBlocks: 1, dataCodewordsPerBlock: 88 },
            ],
          },
          {
            ecCodewordsPerBlock: 24,
            ecBlocks: [
              { numBlocks: 11, dataCodewordsPerBlock: 12 },
              { numBlocks: 7, dataCodewordsPerBlock: 13 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 5, dataCodewordsPerBlock: 24 },
              { numBlocks: 7, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 68472,
        versionNumber: 16,
        alignmentPatternCenters: [6, 26, 50, 74],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 7, dataCodewordsPerBlock: 45 },
              { numBlocks: 3, dataCodewordsPerBlock: 46 },
            ],
          },
          {
            ecCodewordsPerBlock: 24,
            ecBlocks: [
              { numBlocks: 5, dataCodewordsPerBlock: 98 },
              { numBlocks: 1, dataCodewordsPerBlock: 99 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 3, dataCodewordsPerBlock: 15 },
              { numBlocks: 13, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 24,
            ecBlocks: [
              { numBlocks: 15, dataCodewordsPerBlock: 19 },
              { numBlocks: 2, dataCodewordsPerBlock: 20 },
            ],
          },
        ],
      },
      {
        infoBits: 70749,
        versionNumber: 17,
        alignmentPatternCenters: [6, 30, 54, 78],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 10, dataCodewordsPerBlock: 46 },
              { numBlocks: 1, dataCodewordsPerBlock: 47 },
            ],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 1, dataCodewordsPerBlock: 107 },
              { numBlocks: 5, dataCodewordsPerBlock: 108 },
            ],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 2, dataCodewordsPerBlock: 14 },
              { numBlocks: 17, dataCodewordsPerBlock: 15 },
            ],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 1, dataCodewordsPerBlock: 22 },
              { numBlocks: 15, dataCodewordsPerBlock: 23 },
            ],
          },
        ],
      },
      {
        infoBits: 76311,
        versionNumber: 18,
        alignmentPatternCenters: [6, 30, 56, 82],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 26,
            ecBlocks: [
              { numBlocks: 9, dataCodewordsPerBlock: 43 },
              { numBlocks: 4, dataCodewordsPerBlock: 44 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 5, dataCodewordsPerBlock: 120 },
              { numBlocks: 1, dataCodewordsPerBlock: 121 },
            ],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 2, dataCodewordsPerBlock: 14 },
              { numBlocks: 19, dataCodewordsPerBlock: 15 },
            ],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 17, dataCodewordsPerBlock: 22 },
              { numBlocks: 1, dataCodewordsPerBlock: 23 },
            ],
          },
        ],
      },
      {
        infoBits: 79154,
        versionNumber: 19,
        alignmentPatternCenters: [6, 30, 58, 86],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 26,
            ecBlocks: [
              { numBlocks: 3, dataCodewordsPerBlock: 44 },
              { numBlocks: 11, dataCodewordsPerBlock: 45 },
            ],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 3, dataCodewordsPerBlock: 113 },
              { numBlocks: 4, dataCodewordsPerBlock: 114 },
            ],
          },
          {
            ecCodewordsPerBlock: 26,
            ecBlocks: [
              { numBlocks: 9, dataCodewordsPerBlock: 13 },
              { numBlocks: 16, dataCodewordsPerBlock: 14 },
            ],
          },
          {
            ecCodewordsPerBlock: 26,
            ecBlocks: [
              { numBlocks: 17, dataCodewordsPerBlock: 21 },
              { numBlocks: 4, dataCodewordsPerBlock: 22 },
            ],
          },
        ],
      },
      {
        infoBits: 84390,
        versionNumber: 20,
        alignmentPatternCenters: [6, 34, 62, 90],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 26,
            ecBlocks: [
              { numBlocks: 3, dataCodewordsPerBlock: 41 },
              { numBlocks: 13, dataCodewordsPerBlock: 42 },
            ],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 3, dataCodewordsPerBlock: 107 },
              { numBlocks: 5, dataCodewordsPerBlock: 108 },
            ],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 15, dataCodewordsPerBlock: 15 },
              { numBlocks: 10, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 15, dataCodewordsPerBlock: 24 },
              { numBlocks: 5, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 87683,
        versionNumber: 21,
        alignmentPatternCenters: [6, 28, 50, 72, 94],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 26,
            ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 42 }],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 4, dataCodewordsPerBlock: 116 },
              { numBlocks: 4, dataCodewordsPerBlock: 117 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 19, dataCodewordsPerBlock: 16 },
              { numBlocks: 6, dataCodewordsPerBlock: 17 },
            ],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 17, dataCodewordsPerBlock: 22 },
              { numBlocks: 6, dataCodewordsPerBlock: 23 },
            ],
          },
        ],
      },
      {
        infoBits: 92361,
        versionNumber: 22,
        alignmentPatternCenters: [6, 26, 50, 74, 98],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 46 }],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 2, dataCodewordsPerBlock: 111 },
              { numBlocks: 7, dataCodewordsPerBlock: 112 },
            ],
          },
          {
            ecCodewordsPerBlock: 24,
            ecBlocks: [{ numBlocks: 34, dataCodewordsPerBlock: 13 }],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 7, dataCodewordsPerBlock: 24 },
              { numBlocks: 16, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 96236,
        versionNumber: 23,
        alignmentPatternCenters: [6, 30, 54, 74, 102],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 4, dataCodewordsPerBlock: 47 },
              { numBlocks: 14, dataCodewordsPerBlock: 48 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 4, dataCodewordsPerBlock: 121 },
              { numBlocks: 5, dataCodewordsPerBlock: 122 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 16, dataCodewordsPerBlock: 15 },
              { numBlocks: 14, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 11, dataCodewordsPerBlock: 24 },
              { numBlocks: 14, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 102084,
        versionNumber: 24,
        alignmentPatternCenters: [6, 28, 54, 80, 106],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 6, dataCodewordsPerBlock: 45 },
              { numBlocks: 14, dataCodewordsPerBlock: 46 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 6, dataCodewordsPerBlock: 117 },
              { numBlocks: 4, dataCodewordsPerBlock: 118 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 30, dataCodewordsPerBlock: 16 },
              { numBlocks: 2, dataCodewordsPerBlock: 17 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 11, dataCodewordsPerBlock: 24 },
              { numBlocks: 16, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 102881,
        versionNumber: 25,
        alignmentPatternCenters: [6, 32, 58, 84, 110],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 8, dataCodewordsPerBlock: 47 },
              { numBlocks: 13, dataCodewordsPerBlock: 48 },
            ],
          },
          {
            ecCodewordsPerBlock: 26,
            ecBlocks: [
              { numBlocks: 8, dataCodewordsPerBlock: 106 },
              { numBlocks: 4, dataCodewordsPerBlock: 107 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 22, dataCodewordsPerBlock: 15 },
              { numBlocks: 13, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 7, dataCodewordsPerBlock: 24 },
              { numBlocks: 22, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 110507,
        versionNumber: 26,
        alignmentPatternCenters: [6, 30, 58, 86, 114],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 19, dataCodewordsPerBlock: 46 },
              { numBlocks: 4, dataCodewordsPerBlock: 47 },
            ],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 10, dataCodewordsPerBlock: 114 },
              { numBlocks: 2, dataCodewordsPerBlock: 115 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 33, dataCodewordsPerBlock: 16 },
              { numBlocks: 4, dataCodewordsPerBlock: 17 },
            ],
          },
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 28, dataCodewordsPerBlock: 22 },
              { numBlocks: 6, dataCodewordsPerBlock: 23 },
            ],
          },
        ],
      },
      {
        infoBits: 110734,
        versionNumber: 27,
        alignmentPatternCenters: [6, 34, 62, 90, 118],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 22, dataCodewordsPerBlock: 45 },
              { numBlocks: 3, dataCodewordsPerBlock: 46 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 8, dataCodewordsPerBlock: 122 },
              { numBlocks: 4, dataCodewordsPerBlock: 123 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 12, dataCodewordsPerBlock: 15 },
              { numBlocks: 28, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 8, dataCodewordsPerBlock: 23 },
              { numBlocks: 26, dataCodewordsPerBlock: 24 },
            ],
          },
        ],
      },
      {
        infoBits: 117786,
        versionNumber: 28,
        alignmentPatternCenters: [6, 26, 50, 74, 98, 122],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 3, dataCodewordsPerBlock: 45 },
              { numBlocks: 23, dataCodewordsPerBlock: 46 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 3, dataCodewordsPerBlock: 117 },
              { numBlocks: 10, dataCodewordsPerBlock: 118 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 11, dataCodewordsPerBlock: 15 },
              { numBlocks: 31, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 4, dataCodewordsPerBlock: 24 },
              { numBlocks: 31, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 119615,
        versionNumber: 29,
        alignmentPatternCenters: [6, 30, 54, 78, 102, 126],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 21, dataCodewordsPerBlock: 45 },
              { numBlocks: 7, dataCodewordsPerBlock: 46 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 7, dataCodewordsPerBlock: 116 },
              { numBlocks: 7, dataCodewordsPerBlock: 117 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 19, dataCodewordsPerBlock: 15 },
              { numBlocks: 26, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 1, dataCodewordsPerBlock: 23 },
              { numBlocks: 37, dataCodewordsPerBlock: 24 },
            ],
          },
        ],
      },
      {
        infoBits: 126325,
        versionNumber: 30,
        alignmentPatternCenters: [6, 26, 52, 78, 104, 130],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 19, dataCodewordsPerBlock: 47 },
              { numBlocks: 10, dataCodewordsPerBlock: 48 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 5, dataCodewordsPerBlock: 115 },
              { numBlocks: 10, dataCodewordsPerBlock: 116 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 23, dataCodewordsPerBlock: 15 },
              { numBlocks: 25, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 15, dataCodewordsPerBlock: 24 },
              { numBlocks: 25, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 127568,
        versionNumber: 31,
        alignmentPatternCenters: [6, 30, 56, 82, 108, 134],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 2, dataCodewordsPerBlock: 46 },
              { numBlocks: 29, dataCodewordsPerBlock: 47 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 13, dataCodewordsPerBlock: 115 },
              { numBlocks: 3, dataCodewordsPerBlock: 116 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 23, dataCodewordsPerBlock: 15 },
              { numBlocks: 28, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 42, dataCodewordsPerBlock: 24 },
              { numBlocks: 1, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 133589,
        versionNumber: 32,
        alignmentPatternCenters: [6, 34, 60, 86, 112, 138],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 10, dataCodewordsPerBlock: 46 },
              { numBlocks: 23, dataCodewordsPerBlock: 47 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 115 }],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 19, dataCodewordsPerBlock: 15 },
              { numBlocks: 35, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 10, dataCodewordsPerBlock: 24 },
              { numBlocks: 35, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 136944,
        versionNumber: 33,
        alignmentPatternCenters: [6, 30, 58, 86, 114, 142],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 14, dataCodewordsPerBlock: 46 },
              { numBlocks: 21, dataCodewordsPerBlock: 47 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 17, dataCodewordsPerBlock: 115 },
              { numBlocks: 1, dataCodewordsPerBlock: 116 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 11, dataCodewordsPerBlock: 15 },
              { numBlocks: 46, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 29, dataCodewordsPerBlock: 24 },
              { numBlocks: 19, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 141498,
        versionNumber: 34,
        alignmentPatternCenters: [6, 34, 62, 90, 118, 146],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 14, dataCodewordsPerBlock: 46 },
              { numBlocks: 23, dataCodewordsPerBlock: 47 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 13, dataCodewordsPerBlock: 115 },
              { numBlocks: 6, dataCodewordsPerBlock: 116 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 59, dataCodewordsPerBlock: 16 },
              { numBlocks: 1, dataCodewordsPerBlock: 17 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 44, dataCodewordsPerBlock: 24 },
              { numBlocks: 7, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 145311,
        versionNumber: 35,
        alignmentPatternCenters: [6, 30, 54, 78, 102, 126, 150],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 12, dataCodewordsPerBlock: 47 },
              { numBlocks: 26, dataCodewordsPerBlock: 48 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 12, dataCodewordsPerBlock: 121 },
              { numBlocks: 7, dataCodewordsPerBlock: 122 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 22, dataCodewordsPerBlock: 15 },
              { numBlocks: 41, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 39, dataCodewordsPerBlock: 24 },
              { numBlocks: 14, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 150283,
        versionNumber: 36,
        alignmentPatternCenters: [6, 24, 50, 76, 102, 128, 154],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 6, dataCodewordsPerBlock: 47 },
              { numBlocks: 34, dataCodewordsPerBlock: 48 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 6, dataCodewordsPerBlock: 121 },
              { numBlocks: 14, dataCodewordsPerBlock: 122 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 2, dataCodewordsPerBlock: 15 },
              { numBlocks: 64, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 46, dataCodewordsPerBlock: 24 },
              { numBlocks: 10, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 152622,
        versionNumber: 37,
        alignmentPatternCenters: [6, 28, 54, 80, 106, 132, 158],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 29, dataCodewordsPerBlock: 46 },
              { numBlocks: 14, dataCodewordsPerBlock: 47 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 17, dataCodewordsPerBlock: 122 },
              { numBlocks: 4, dataCodewordsPerBlock: 123 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 24, dataCodewordsPerBlock: 15 },
              { numBlocks: 46, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 49, dataCodewordsPerBlock: 24 },
              { numBlocks: 10, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 158308,
        versionNumber: 38,
        alignmentPatternCenters: [6, 32, 58, 84, 110, 136, 162],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 13, dataCodewordsPerBlock: 46 },
              { numBlocks: 32, dataCodewordsPerBlock: 47 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 4, dataCodewordsPerBlock: 122 },
              { numBlocks: 18, dataCodewordsPerBlock: 123 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 42, dataCodewordsPerBlock: 15 },
              { numBlocks: 32, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 48, dataCodewordsPerBlock: 24 },
              { numBlocks: 14, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 161089,
        versionNumber: 39,
        alignmentPatternCenters: [6, 26, 54, 82, 110, 138, 166],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 40, dataCodewordsPerBlock: 47 },
              { numBlocks: 7, dataCodewordsPerBlock: 48 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 20, dataCodewordsPerBlock: 117 },
              { numBlocks: 4, dataCodewordsPerBlock: 118 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 10, dataCodewordsPerBlock: 15 },
              { numBlocks: 67, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 43, dataCodewordsPerBlock: 24 },
              { numBlocks: 22, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
      {
        infoBits: 167017,
        versionNumber: 40,
        alignmentPatternCenters: [6, 30, 58, 86, 114, 142, 170],
        errorCorrectionLevels: [
          {
            ecCodewordsPerBlock: 28,
            ecBlocks: [
              { numBlocks: 18, dataCodewordsPerBlock: 47 },
              { numBlocks: 31, dataCodewordsPerBlock: 48 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 19, dataCodewordsPerBlock: 118 },
              { numBlocks: 6, dataCodewordsPerBlock: 119 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 20, dataCodewordsPerBlock: 15 },
              { numBlocks: 61, dataCodewordsPerBlock: 16 },
            ],
          },
          {
            ecCodewordsPerBlock: 30,
            ecBlocks: [
              { numBlocks: 34, dataCodewordsPerBlock: 24 },
              { numBlocks: 34, dataCodewordsPerBlock: 25 },
            ],
          },
        ],
      },
    ];
    function ae(e, t) {
      for (var d = e ^ t, n = 0; d; ) n++, (d &= d - 1);
      return n;
    }
    function se(e, t) {
      return (t << 1) | e;
    }
    var le = [
      { bits: 21522, formatInfo: { errorCorrectionLevel: 0, dataMask: 0 } },
      { bits: 20773, formatInfo: { errorCorrectionLevel: 0, dataMask: 1 } },
      { bits: 24188, formatInfo: { errorCorrectionLevel: 0, dataMask: 2 } },
      { bits: 23371, formatInfo: { errorCorrectionLevel: 0, dataMask: 3 } },
      { bits: 17913, formatInfo: { errorCorrectionLevel: 0, dataMask: 4 } },
      { bits: 16590, formatInfo: { errorCorrectionLevel: 0, dataMask: 5 } },
      { bits: 20375, formatInfo: { errorCorrectionLevel: 0, dataMask: 6 } },
      { bits: 19104, formatInfo: { errorCorrectionLevel: 0, dataMask: 7 } },
      { bits: 30660, formatInfo: { errorCorrectionLevel: 1, dataMask: 0 } },
      { bits: 29427, formatInfo: { errorCorrectionLevel: 1, dataMask: 1 } },
      { bits: 32170, formatInfo: { errorCorrectionLevel: 1, dataMask: 2 } },
      { bits: 30877, formatInfo: { errorCorrectionLevel: 1, dataMask: 3 } },
      { bits: 26159, formatInfo: { errorCorrectionLevel: 1, dataMask: 4 } },
      { bits: 25368, formatInfo: { errorCorrectionLevel: 1, dataMask: 5 } },
      { bits: 27713, formatInfo: { errorCorrectionLevel: 1, dataMask: 6 } },
      { bits: 26998, formatInfo: { errorCorrectionLevel: 1, dataMask: 7 } },
      { bits: 5769, formatInfo: { errorCorrectionLevel: 2, dataMask: 0 } },
      { bits: 5054, formatInfo: { errorCorrectionLevel: 2, dataMask: 1 } },
      { bits: 7399, formatInfo: { errorCorrectionLevel: 2, dataMask: 2 } },
      { bits: 6608, formatInfo: { errorCorrectionLevel: 2, dataMask: 3 } },
      { bits: 1890, formatInfo: { errorCorrectionLevel: 2, dataMask: 4 } },
      { bits: 597, formatInfo: { errorCorrectionLevel: 2, dataMask: 5 } },
      { bits: 3340, formatInfo: { errorCorrectionLevel: 2, dataMask: 6 } },
      { bits: 2107, formatInfo: { errorCorrectionLevel: 2, dataMask: 7 } },
      { bits: 13663, formatInfo: { errorCorrectionLevel: 3, dataMask: 0 } },
      { bits: 12392, formatInfo: { errorCorrectionLevel: 3, dataMask: 1 } },
      { bits: 16177, formatInfo: { errorCorrectionLevel: 3, dataMask: 2 } },
      { bits: 14854, formatInfo: { errorCorrectionLevel: 3, dataMask: 3 } },
      { bits: 9396, formatInfo: { errorCorrectionLevel: 3, dataMask: 4 } },
      { bits: 8579, formatInfo: { errorCorrectionLevel: 3, dataMask: 5 } },
      { bits: 11994, formatInfo: { errorCorrectionLevel: 3, dataMask: 6 } },
      { bits: 11245, formatInfo: { errorCorrectionLevel: 3, dataMask: 7 } },
    ];
    function ue(t) {
      var d = (function (e) {
        var t = e.height,
          d = Math.floor((t - 17) / 4);
        if (d <= 6) return ie[d - 1];
        for (var n = 0, r = 5; r >= 0; r--)
          for (var o = t - 9; o >= t - 11; o--) n = se(e.get(o, r), n);
        var i,
          a = 0;
        for (o = 5; o >= 0; o--)
          for (r = t - 9; r >= t - 11; r--) a = se(e.get(o, r), a);
        for (var s = 1 / 0, l = 0, u = ie; l < u.length; l++) {
          var c = u[l];
          if (c.infoBits === n || c.infoBits === a) return c;
          var f = ae(n, c.infoBits);
          f < s && ((i = c), (s = f)),
            (f = ae(a, c.infoBits)) < s && ((i = c), (s = f));
        }
        return s <= 3 ? i : void 0;
      })(t);
      if (!d) return null;
      var n = (function (e) {
        for (var t = 0, d = 0; d <= 8; d++) 6 !== d && (t = se(e.get(d, 8), t));
        for (var n = 7; n >= 0; n--) 6 !== n && (t = se(e.get(8, n), t));
        var r = e.height,
          o = 0;
        for (n = r - 1; n >= r - 7; n--) o = se(e.get(8, n), o);
        for (d = r - 8; d < r; d++) o = se(e.get(d, 8), o);
        for (var i = 1 / 0, a = null, s = 0, l = le; s < l.length; s++) {
          var u = l[s],
            c = u.bits,
            f = u.formatInfo;
          if (c === t || c === o) return f;
          var h = ae(t, c);
          h < i && ((a = f), (i = h)),
            t !== o && (h = ae(o, c)) < i && ((a = f), (i = h));
        }
        return i <= 3 ? a : null;
      })(t);
      if (!n) return null;
      var r = (function (e, t, d) {
        var r = [],
          o = t.errorCorrectionLevels[n.errorCorrectionLevel],
          i = 0;
        if (
          (o.ecBlocks.forEach(function (e) {
            for (var t = 0; t < e.numBlocks; t++)
              r.push({
                numDataCodewords: e.dataCodewordsPerBlock,
                codewords: [],
              }),
                (i += e.dataCodewordsPerBlock + o.ecCodewordsPerBlock);
          }),
          e.length < i)
        )
          return null;
        e = e.slice(0, i);
        for (var a = o.ecBlocks[0].dataCodewordsPerBlock, s = 0; s < a; s++)
          for (var l = 0, u = r; l < u.length; l++)
            u[l].codewords.push(e.shift());
        if (o.ecBlocks.length > 1) {
          var c = o.ecBlocks[0].numBlocks,
            f = o.ecBlocks[1].numBlocks;
          for (s = 0; s < f; s++) r[c + s].codewords.push(e.shift());
        }
        for (; e.length > 0; )
          for (var h = 0, $ = r; h < $.length; h++)
            $[h].codewords.push(e.shift());
        return r;
      })(
        (function (e, t, d) {
          for (
            var n = e.height,
              r = T(d.dataMask),
              o = (function (e) {
                var t = 17 + 4 * e.versionNumber,
                  d = J.createEmpty(t, t);
                d.setRegion(0, 0, 9, 9, !0),
                  d.setRegion(t - 8, 0, 8, 9, !0),
                  d.setRegion(0, t - 8, 9, 8, !0);
                for (
                  var n = 0, r = e.alignmentPatternCenters;
                  n < r.length;
                  n++
                )
                  for (
                    var o = r[n], i = 0, a = e.alignmentPatternCenters;
                    i < a.length;
                    i++
                  ) {
                    var s = a[i];
                    (6 === o && 6 === s) ||
                      (6 === o && s === t - 7) ||
                      (o === t - 7 && 6 === s) ||
                      d.setRegion(o - 2, s - 2, 5, 5, !0);
                  }
                return (
                  d.setRegion(6, 9, 1, t - 17, !0),
                  d.setRegion(9, 6, t - 17, 1, !0),
                  e.versionNumber > 6 &&
                    (d.setRegion(t - 11, 0, 3, 6, !0),
                    d.setRegion(0, t - 11, 6, 3, !0)),
                  d
                );
              })(t),
              i = 0,
              a = 0,
              s = [],
              l = !0,
              u = n - 1;
            u > 0;
            u -= 2
          ) {
            6 === u && u--;
            for (var c = 0; c < n; c++)
              for (var f = l ? n - 1 - c : c, h = 0; h < 2; h++) {
                var $ = u - h;
                if (!o.get($, f)) {
                  i++;
                  var p = e.get($, f);
                  r($, f) && (p = !p),
                    (a = se(p, a)),
                    8 === i && (s.push(a), (i = 0), (a = 0));
                }
              }
            l = !l;
          }
          return s;
        })(t, d, n),
        d
      );
      if (!r) return null;
      for (
        var i = r.reduce(function (e, t) {
            return e + t.numDataCodewords;
          }, 0),
          a = new Uint8ClampedArray(i),
          s = 0,
          l = 0,
          u = r;
        l < u.length;
        l++
      ) {
        var c = u[l],
          f = X(c.codewords, c.codewords.length - c.numDataCodewords);
        if (!f) return null;
        for (var h = 0; h < c.numDataCodewords; h++) a[s++] = f[h];
      }
      try {
        return (function (t, d, n) {
          for (
            var r,
              i,
              s,
              l,
              u = -1,
              c = new Y(a),
              f = d <= 9 ? 0 : d <= 26 ? 1 : 2,
              h = {
                data: "",
                bytes: [],
                chunks: [],
                version: d,
                errorCorrectionLevel: n,
              };
            c.available() >= 4;

          ) {
            var $ = c.readBits(4);
            if ($ === e.Mode.Terminator) return h;
            if ($ === e.Mode.ECI)
              u =
                0 === c.readBits(1)
                  ? c.readBits(7)
                  : 0 === c.readBits(1)
                  ? c.readBits(14)
                  : 0 === c.readBits(1)
                  ? c.readBits(21)
                  : -1;
            else if ($ === e.Mode.Numeric) {
              var p = te(c, f);
              (h.data += p.data),
                h.chunks.push({
                  mode: e.Mode.Numeric,
                  data: p.data,
                  bytes: p.bytes,
                }),
                (r = h.bytes).push.apply(r, p.bytes);
            } else if ($ === e.Mode.Alphanumeric) {
              var m = ne(c, f);
              (h.data += m.data),
                h.chunks.push({
                  mode: e.Mode.Alphanumeric,
                  data: m.data,
                  bytes: m.bytes,
                }),
                (i = h.bytes).push.apply(i, m.bytes);
            } else if ($ === e.Mode.StructuredAppend) {
              var g = {
                symbols: [c.readBits(4), c.readBits(4)],
                parity: c.readBits(8),
              };
              h.chunks.push(o({ mode: e.Mode.StructuredAppend }, g));
            } else if ($ === e.Mode.Byte) {
              var v = re(c, f, u);
              (h.data += v.data),
                h.chunks.push({
                  encoding: u,
                  mode: e.Mode.Byte,
                  data: v.data,
                  bytes: v.bytes,
                }),
                (s = h.bytes).push.apply(s, v.bytes);
            } else if ($ === e.Mode.Kanji) {
              var y = oe(c, f);
              (h.data += y.data),
                h.chunks.push({
                  mode: e.Mode.Kanji,
                  data: y.data,
                  bytes: y.bytes,
                }),
                (l = h.bytes).push.apply(l, y.bytes);
            }
          }
          if (0 === c.available() || 0 === c.readBits(c.available())) return h;
        })(0, d.versionNumber, n.errorCorrectionLevel);
      } catch (e) {
        return null;
      }
    }
    function ce(e) {
      if (null == e) return null;
      var t = ue(e);
      if (t) return t;
      for (var d = 0; d < e.width; d++)
        for (var n = d + 1; n < e.height; n++)
          e.get(d, n) !== e.get(n, d) &&
            (e.set(d, n, !e.get(d, n)), e.set(n, d, !e.get(n, d)));
      return ue(e);
    }
    function fe(e, t, d, n) {
      var r = e.x - t.x + d.x - n.x,
        o = e.y - t.y + d.y - n.y;
      if (0 === r && 0 === o)
        return {
          a11: t.x - e.x,
          a12: t.y - e.y,
          a13: 0,
          a21: d.x - t.x,
          a22: d.y - t.y,
          a23: 0,
          a31: e.x,
          a32: e.y,
          a33: 1,
        };
      var i = t.x - d.x,
        a = n.x - d.x,
        s = t.y - d.y,
        l = n.y - d.y,
        u = i * l - a * s,
        c = (r * l - a * o) / u,
        f = (i * o - r * s) / u;
      return {
        a11: t.x - e.x + c * t.x,
        a12: t.y - e.y + c * t.y,
        a13: c,
        a21: n.x - e.x + f * n.x,
        a22: n.y - e.y + f * n.y,
        a23: f,
        a31: e.x,
        a32: e.y,
        a33: 1,
      };
    }
    function he(e, t) {
      for (
        var d,
          n,
          r = (function (e, d, n, r) {
            var o = fe(
              { x: 3.5, y: 3.5 },
              { x: t.dimension - 3.5, y: 3.5 },
              { x: t.dimension - 6.5, y: t.dimension - 6.5 },
              { x: 3.5, y: t.dimension - 3.5 }
            );
            return {
              a11: o.a22 * o.a33 - o.a23 * o.a32,
              a12: o.a13 * o.a32 - o.a12 * o.a33,
              a13: o.a12 * o.a23 - o.a13 * o.a22,
              a21: o.a23 * o.a31 - o.a21 * o.a33,
              a22: o.a11 * o.a33 - o.a13 * o.a31,
              a23: o.a13 * o.a21 - o.a11 * o.a23,
              a31: o.a21 * o.a32 - o.a22 * o.a31,
              a32: o.a12 * o.a31 - o.a11 * o.a32,
              a33: o.a11 * o.a22 - o.a12 * o.a21,
            };
          })(),
          o = {
            a11:
              (d = fe(t.topLeft, t.topRight, t.alignmentPattern, t.bottomLeft))
                .a11 *
                (n = r).a11 +
              d.a21 * n.a12 +
              d.a31 * n.a13,
            a12: d.a12 * n.a11 + d.a22 * n.a12 + d.a32 * n.a13,
            a13: d.a13 * n.a11 + d.a23 * n.a12 + d.a33 * n.a13,
            a21: d.a11 * n.a21 + d.a21 * n.a22 + d.a31 * n.a23,
            a22: d.a12 * n.a21 + d.a22 * n.a22 + d.a32 * n.a23,
            a23: d.a13 * n.a21 + d.a23 * n.a22 + d.a33 * n.a23,
            a31: d.a11 * n.a31 + d.a21 * n.a32 + d.a31 * n.a33,
            a32: d.a12 * n.a31 + d.a22 * n.a32 + d.a32 * n.a33,
            a33: d.a13 * n.a31 + d.a23 * n.a32 + d.a33 * n.a33,
          },
          i = J.createEmpty(t.dimension, t.dimension),
          a = function (e, t) {
            var d = o.a13 * e + o.a23 * t + o.a33;
            return {
              x: Math.max(0, (o.a11 * e + o.a21 * t + o.a31) / d),
              y: Math.max(0, (o.a12 * e + o.a22 * t + o.a32) / d),
            };
          },
          s = 0;
        s < t.dimension;
        s++
      )
        for (var l = 0; l < t.dimension; l++) {
          var u = a(l + 0.5, s + 0.5);
          i.set(l, s, e.get(Math.floor(u.x), Math.floor(u.y)));
        }
      return { matrix: i, mappingFunction: a };
    }
    function $e(e, t, d) {
      return e < t ? t : e > d ? d : e;
    }
    var pe = (function () {
      function e(e, t, d) {
        this.width = e;
        var n = e * t;
        if (d && d.length !== n) throw "wrong buffer size";
        this.data = d || new Uint8ClampedArray(n);
      }
      return (
        (e.prototype.get = function (e, t) {
          return this.data[t * this.width + e];
        }),
        (e.prototype.set = function (e, t, d) {
          this.data[t * this.width + e] = d;
        }),
        e
      );
    })();
    function me(e) {
      var t = (function (e) {
        for (
          var t = [],
            d = [],
            n = [],
            r = [],
            o = function (o) {
              for (
                var i = 0,
                  a = !1,
                  s = [0, 0, 0, 0, 0],
                  l = function (t) {
                    var d = e.get(t, o);
                    if (d === a) i++;
                    else {
                      (s = [s[1], s[2], s[3], s[4], i]), (i = 1), (a = d);
                      var l = F(s) / 7,
                        u =
                          Math.abs(s[0] - l) < l &&
                          Math.abs(s[1] - l) < l &&
                          Math.abs(s[2] - 3 * l) < 3 * l &&
                          Math.abs(s[3] - l) < l &&
                          Math.abs(s[4] - l) < l &&
                          !d,
                        c = F(s.slice(-3)) / 3,
                        f =
                          Math.abs(s[2] - c) < c &&
                          Math.abs(s[3] - c) < c &&
                          Math.abs(s[4] - c) < c &&
                          d;
                      if (u) {
                        var h = t - s[3] - s[4],
                          $ = h - s[2],
                          p = { startX: $, endX: h, y: o };
                        (m = n.filter(function (e) {
                          return (
                            ($ >= e.bottom.startX && $ <= e.bottom.endX) ||
                            (h >= e.bottom.startX && $ <= e.bottom.endX) ||
                            ($ <= e.bottom.startX &&
                              h >= e.bottom.endX &&
                              s[2] / (e.bottom.endX - e.bottom.startX) < D &&
                              s[2] / (e.bottom.endX - e.bottom.startX) > _)
                          );
                        })).length > 0
                          ? (m[0].bottom = p)
                          : n.push({ top: p, bottom: p });
                      }
                      if (f) {
                        var m,
                          g = t - s[4],
                          v = g - s[3];
                        (p = { startX: v, y: o, endX: g }),
                          (m = r.filter(function (e) {
                            return (
                              (v >= e.bottom.startX && v <= e.bottom.endX) ||
                              (g >= e.bottom.startX && v <= e.bottom.endX) ||
                              (v <= e.bottom.startX &&
                                g >= e.bottom.endX &&
                                s[2] / (e.bottom.endX - e.bottom.startX) < D &&
                                s[2] / (e.bottom.endX - e.bottom.startX) > _)
                            );
                          })).length > 0
                            ? (m[0].bottom = p)
                            : r.push({ top: p, bottom: p });
                      }
                    }
                  },
                  u = -1;
                u <= e.width;
                u++
              )
                l(u);
              t.push.apply(
                t,
                n.filter(function (e) {
                  return e.bottom.y !== o && e.bottom.y - e.top.y >= 2;
                })
              ),
                (n = n.filter(function (e) {
                  return e.bottom.y === o;
                })),
                d.push.apply(
                  d,
                  r.filter(function (e) {
                    return e.bottom.y !== o;
                  })
                ),
                (r = r.filter(function (e) {
                  return e.bottom.y === o;
                }));
            },
            i = 0;
          i <= e.height;
          i++
        )
          o(i);
        t.push.apply(
          t,
          n.filter(function (e) {
            return e.bottom.y - e.top.y >= 2;
          })
        ),
          d.push.apply(d, r);
        var a = t
          .filter(function (e) {
            return e.bottom.y - e.top.y >= 2;
          })
          .map(function (t) {
            var d =
                (t.top.startX + t.top.endX + t.bottom.startX + t.bottom.endX) /
                4,
              n = (t.top.y + t.bottom.y + 1) / 2;
            if (e.get(Math.round(d), Math.round(n))) {
              var r = [
                  t.top.endX - t.top.startX,
                  t.bottom.endX - t.bottom.startX,
                  t.bottom.y - t.top.y + 1,
                ],
                o = F(r) / r.length;
              return {
                score: H(
                  { x: Math.round(d), y: Math.round(n) },
                  [1, 1, 3, 1, 1],
                  e
                ),
                x: d,
                y: n,
                size: o,
              };
            }
          })
          .filter(function (e) {
            return !!e;
          })
          .sort(function (e, t) {
            return e.score - t.score;
          })
          .map(function (e, t, d) {
            if (t > O) return null;
            var n = d
              .filter(function (e, d) {
                return t !== d;
              })
              .map(function (t) {
                return {
                  x: t.x,
                  y: t.y,
                  score: t.score + Math.pow(t.size - e.size, 2) / e.size,
                  size: t.size,
                };
              })
              .sort(function (e, t) {
                return e.score - t.score;
              });
            if (n.length < 2) return null;
            var r = e.score + n[0].score + n[1].score;
            return { points: [e].concat(n.slice(0, 2)), score: r };
          })
          .filter(function (e) {
            return !!e;
          })
          .sort(function (e, t) {
            return e.score - t.score;
          });
        if (0 === a.length) return null;
        var s = (function (e, t, d) {
            var n,
              r,
              o,
              i,
              a,
              s,
              l,
              u = R(e, t),
              c = R(t, d),
              f = R(e, d);
            return (
              c >= u && c >= f
                ? ((l = (n = [t, e, d])[0]), (a = n[1]), (s = n[2]))
                : f >= c && f >= u
                ? ((l = (r = [e, t, d])[0]), (a = r[1]), (s = r[2]))
                : ((l = (o = [e, d, t])[0]), (a = o[1]), (s = o[2])),
              (s.x - a.x) * (l.y - a.y) - (s.y - a.y) * (l.x - a.x) < 0 &&
                ((l = (i = [s, l])[0]), (s = i[1])),
              { bottomLeft: l, topLeft: a, topRight: s }
            );
          })(a[0].points[0], a[0].points[1], a[0].points[2]),
          l = s.topRight,
          u = s.topLeft,
          c = s.bottomLeft,
          f = [],
          h = W(e, d, l, u, c);
        h &&
          f.push({
            alignmentPattern: {
              x: h.alignmentPattern.x,
              y: h.alignmentPattern.y,
            },
            bottomLeft: { x: c.x, y: c.y },
            dimension: h.dimension,
            topLeft: { x: u.x, y: u.y },
            topRight: { x: l.x, y: l.y },
          });
        var $ = z(e, l),
          p = z(e, u),
          m = z(e, c),
          g = W(e, d, $, p, m);
        return (
          g &&
            f.push({
              alignmentPattern: {
                x: g.alignmentPattern.x,
                y: g.alignmentPattern.y,
              },
              bottomLeft: { x: m.x, y: m.y },
              topLeft: { x: p.x, y: p.y },
              topRight: { x: $.x, y: $.y },
              dimension: g.dimension,
            }),
          0 === f.length ? null : f
        );
      })(e);
      if (!t) return null;
      for (var d = 0, n = t; d < n.length; d++) {
        var r = n[d],
          i = he(e, r),
          a = ce(i.matrix);
        if (a) {
          var s = r.dimension;
          return o(o({}, a), {
            location: {
              topLeft: i.mappingFunction(0, 0),
              topRight: i.mappingFunction(s, 0),
              bottomLeft: i.mappingFunction(0, s),
              bottomRight: i.mappingFunction(s, s),
              topLeftFinder: r.topLeft,
              topRightFinder: r.topRight,
              bottomLeftFinder: r.bottomLeft,
              bottomRightAlignment: a.version > 1 ? r.alignmentPattern : null,
            },
          });
        }
      }
    }
    var ge = {
      canOverwriteImage: !0,
      greyScaleWeights: {
        red: 0.2126,
        green: 0.7152,
        blue: 0.0722,
        useIntegerApproximation: !1,
      },
      inversionAttempts: "attemptBoth",
    };
    function ve(e) {
      (e.onload = null), (e.onerror = null);
    }
    var ye = (function () {
        function e() {
          this.options = ge;
        }
        return (
          (e.prototype.setOptions = function (e) {
            return (
              void 0 === e && (e = {}),
              (e = e || {}),
              (this.options = o(o({}, ge), e)),
              this
            );
          }),
          (e.prototype.decode = function (e, t, d) {
            var n = this.options,
              r = n.inversionAttempts,
              o = "onlyInvert" === r || "invertFirst" === r,
              i = (function (e, t, d, n, r, o) {
                var i = t * d;
                if (e.length !== 4 * i)
                  throw "malformed data passed to binarizer";
                var a,
                  s = 0;
                o && ((a = new Uint8ClampedArray(e.buffer, s, i)), (s += i));
                for (var l = new pe(t, d, a), u = 0; u < d; u++)
                  for (var c = 0; c < t; c++) {
                    var f = 4 * (u * t + c),
                      h = r.red * e[f] + r.green * e[f + 1] + r.blue * e[f + 2];
                    l.set(c, u, r.useIntegerApproximation ? (h + 128) >> 8 : h);
                  }
                var $,
                  p = Math.ceil(t / 8),
                  m = Math.ceil(d / 8),
                  g = p * m;
                o && (($ = new Uint8ClampedArray(e.buffer, s, g)), (s += g));
                for (var v, y = new pe(p, m, $), C = 0; C < m; C++)
                  for (var b = 0; b < p; b++) {
                    var w = 0,
                      k = 1 / 0,
                      B = 0;
                    for (u = 0; u < 8; u++)
                      for (c = 0; c < 8; c++) {
                        var x = l.get(8 * b + c, 8 * C + u);
                        (w += x), (k = Math.min(k, x)), (B = Math.max(B, x));
                      }
                    var P = w / Math.pow(8, 2);
                    if (B - k <= 24 && ((P = k / 2), C > 0 && b > 0)) {
                      var S =
                        (y.get(b, C - 1) +
                          2 * y.get(b - 1, C) +
                          y.get(b - 1, C - 1)) /
                        4;
                      k < S && (P = S);
                    }
                    y.set(b, C, P);
                  }
                if (o) {
                  var A = new Uint8ClampedArray(e.buffer, s, i);
                  (s += i), (v = new J(A, t));
                } else v = J.createEmpty(t, d);
                var L = null;
                if (n)
                  if (o) {
                    var T = new Uint8ClampedArray(e.buffer, s, i);
                    L = new J(T, t);
                  } else L = J.createEmpty(t, d);
                for (C = 0; C < m; C++)
                  for (b = 0; b < p; b++) {
                    for (
                      var M = $e(b, 2, p - 3),
                        I = $e(C, 2, m - 3),
                        E = ((w = 0), -2);
                      E <= 2;
                      E++
                    )
                      for (var N = -2; N <= 2; N++) w += y.get(M + E, I + N);
                    var _ = w / 25;
                    for (E = 0; E < 8; E++)
                      for (N = 0; N < 8; N++) {
                        var D = l.get((c = 8 * b + E), (u = 8 * C + N));
                        v.set(c, u, D <= _), n && L.set(c, u, !(D <= _));
                      }
                  }
                return n ? { binarized: v, inverted: L } : { binarized: v };
              })(
                e,
                t,
                d,
                o || "attemptBoth" === r,
                n.greyScaleWeights,
                n.canOverwriteImage
              ),
              a = i.binarized,
              s = i.inverted,
              l = me(o ? s : a);
            return (
              l ||
                ("attemptBoth" !== n.inversionAttempts &&
                  "invertFirst" !== n.inversionAttempts) ||
                (l = me(o ? a : s)),
              l
            );
          }),
          (e.prototype.scan = function (e) {
            var t = this;
            return new Promise(function (d, n) {
              var r = new Image();
              (r.crossOrigin = "anonymous"),
                (r.onload = function () {
                  ve(r);
                  var e = r.width,
                    o = r.height,
                    i = document.createElement("canvas"),
                    a = i.getContext("2d");
                  (i.width = e), (i.height = o), a.drawImage(r, 0, 0);
                  var s = a.getImageData(0, 0, e, o).data,
                    l = t.decode(s, e, o);
                  return l ? d(l) : n("failed to decode image");
                }),
                (r.onerror = function () {
                  ve(r), n("failed to load image: " + e);
                }),
                (r.src = e);
            });
          }),
          e
        );
      })(),
      Ce = (function (t) {
        function d(d) {
          var n = t.call(this, e.Mode.Kanji, d) || this;
          return (
            (n.bytes = (function (e) {
              for (
                var t = [], d = e.length, n = ee().UTF8_TO_SJIS, r = 0;
                r < d;
                r++
              ) {
                var o = e.charCodeAt(r),
                  i = n[o];
                if (null == i) throw "illegal char: " + String.fromCharCode(o);
                t.push(i >> 8), t.push(255 & i);
              }
              return t;
            })(d)),
            n
          );
        }
        return (
          n(d, t),
          (d.prototype.write = function (e) {
            for (var t = 0, d = this.bytes, n = d.length; t + 1 < n; ) {
              var r = ((255 & d[t]) << 8) | (255 & d[t + 1]);
              33088 <= r && r <= 40956
                ? (r -= 33088)
                : 57408 <= r && r <= 60351 && (r -= 49472),
                e.put((r = 192 * ((r >> 8) & 255) + (255 & r)), 13),
                (t += 2);
            }
          }),
          (d.prototype.getLength = function () {
            return Math.floor(this.bytes.length / 2);
          }),
          d
        );
      })(i);
    function be(e) {
      for (var t = [], d = e.length, n = 0; n < d; n++) t.push(e.charCodeAt(n));
      return t;
    }
    function we(e) {
      if (48 <= e && e <= 57) return e - 48;
      throw "illegal char: " + String.fromCharCode(e);
    }
    function ke(e) {
      for (var t = 0, d = e.length, n = 0; n < d; n++) t = 10 * t + we(e[n]);
      return t;
    }
    var Be = (function (t) {
      function d(d) {
        var n = t.call(this, e.Mode.Numeric, d) || this;
        return (n.bytes = be(d)), n;
      }
      return (
        n(d, t),
        (d.prototype.write = function (e) {
          for (var t = 0, d = this.bytes, n = d.length; t + 2 < n; )
            e.put(ke([d[t], d[t + 1], d[t + 2]]), 10), (t += 3);
          t < n &&
            (n - t == 1
              ? e.put(ke([d[t]]), 4)
              : n - t == 2 && e.put(ke([d[t], d[t + 1]]), 7));
        }),
        (d.prototype.getLength = function () {
          return this.bytes.length;
        }),
        d
      );
    })(i);
    function xe(e) {
      if (48 <= e && e <= 57) return e - 48;
      if (65 <= e && e <= 90) return e - 65 + 10;
      switch (e) {
        case 32:
          return 36;
        case 36:
          return 37;
        case 37:
          return 38;
        case 42:
          return 39;
        case 43:
          return 40;
        case 45:
          return 41;
        case 46:
          return 42;
        case 47:
          return 43;
        case 58:
          return 44;
        default:
          throw "illegal char: " + String.fromCharCode(e);
      }
    }
    var Pe = (function (t) {
      function d(d) {
        var n = t.call(this, e.Mode.Alphanumeric, d) || this;
        return (n.bytes = be(d)), n;
      }
      return (
        n(d, t),
        (d.prototype.write = function (e) {
          for (var t = 0, d = this.bytes, n = d.length; t + 1 < n; )
            e.put(45 * xe(d[t]) + xe(d[t + 1]), 11), (t += 2);
          t < n && e.put(xe(d[t]), 6);
        }),
        (d.prototype.getLength = function () {
          return this.bytes.length;
        }),
        d
      );
    })(i);
    (e.Decoder = ye),
      (e.Encoder = N),
      (e.QRAlphanumeric = Pe),
      (e.QRByte = a),
      (e.QRKanji = Ce),
      (e.QRNumeric = Be);
  }),
  (function (e, t) {
    "use strict";
    var d = "model",
      n = "name",
      r = "type",
      o = "vendor",
      i = "version",
      a = "mobile",
      s = "tablet",
      l = {
        extend: function (e, t) {
          var d = {};
          for (var n in e)
            d[n] = t[n] && t[n].length % 2 == 0 ? t[n].concat(e[n]) : e[n];
          return d;
        },
        has: function (e, t) {
          return (
            "string" == typeof e &&
            -1 !== t.toLowerCase().indexOf(e.toLowerCase())
          );
        },
        lowerize: function (e) {
          return e.toLowerCase();
        },
        major: function (e) {
          return "string" == typeof e
            ? e.replace(/[^\d\.]/g, "").split(".")[0]
            : void 0;
        },
        trim: function (e) {
          return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        },
      },
      u = {
        rgx: function (e, t) {
          for (var d, n, r, o, i, a, s = 0; s < t.length && !i; ) {
            var l = t[s],
              u = t[s + 1];
            for (d = n = 0; d < l.length && !i; )
              if ((i = l[d++].exec(e)))
                for (r = 0; r < u.length; r++)
                  (a = i[++n]),
                    "object" == typeof (o = u[r]) && o.length > 0
                      ? 2 == o.length
                        ? (this[o[0]] =
                            "function" == typeof o[1]
                              ? o[1].call(this, a)
                              : o[1])
                        : 3 == o.length
                        ? (this[o[0]] =
                            "function" != typeof o[1] ||
                            (o[1].exec && o[1].test)
                              ? a
                                ? a.replace(o[1], o[2])
                                : void 0
                              : a
                              ? o[1].call(this, a, o[2])
                              : void 0)
                        : 4 == o.length &&
                          (this[o[0]] = a
                            ? o[3].call(this, a.replace(o[1], o[2]))
                            : void 0)
                      : (this[o] = a || void 0);
            s += 2;
          }
        },
        str: function (e, t) {
          for (var d in t)
            if ("object" == typeof t[d] && t[d].length > 0) {
              for (var n = 0; n < t[d].length; n++)
                if (l.has(t[d][n], e)) return "?" === d ? void 0 : d;
            } else if (l.has(t[d], e)) return "?" === d ? void 0 : d;
          return e;
        },
      },
      c = {
        browser: {
          oldsafari: {
            version: {
              "1.0": "/8",
              1.2: "/1",
              1.3: "/3",
              "2.0": "/412",
              "2.0.2": "/416",
              "2.0.3": "/417",
              "2.0.4": "/419",
              "?": "/",
            },
          },
        },
        device: {
          amazon: { model: { "Fire Phone": ["SD", "KF"] } },
          sprint: {
            model: { "Evo Shift 4G": "7373KT" },
            vendor: { HTC: "APA", Sprint: "Sprint" },
          },
        },
        os: {
          windows: {
            version: {
              ME: "4.90",
              "NT 3.11": "NT3.51",
              "NT 4.0": "NT4.0",
              2000: "NT 5.0",
              XP: ["NT 5.1", "NT 5.2"],
              Vista: "NT 6.0",
              7: "NT 6.1",
              8: "NT 6.2",
              8.1: "NT 6.3",
              10: ["NT 6.4", "NT 10.0"],
              RT: "ARM",
            },
          },
        },
      },
      f = {
        browser: [
          [
            /(opera\smini)\/([\w\.-]+)/i,
            /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,
            /(opera).+version\/([\w\.]+)/i,
            /(opera)[\/\s]+([\w\.]+)/i,
          ],
          [n, i],
          [/(opios)[\/\s]+([\w\.]+)/i],
          [[n, "Opera Mini"], i],
          [/\s(opr)\/([\w\.]+)/i],
          [[n, "Opera"], i],
          [
            /(kindle)\/([\w\.]+)/i,
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
            /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
            /(?:ms|\()(ie)\s([\w\.]+)/i,
            /(rekonq)\/([\w\.]*)/i,
            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i,
          ],
          [n, i],
          [/(konqueror)\/([\w\.]+)/i],
          [[n, "Konqueror"], i],
          [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
          [[n, "IE"], i],
          [/(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i],
          [[n, "Edge"], i],
          [/(yabrowser)\/([\w\.]+)/i],
          [[n, "Yandex"], i],
          [/(puffin)\/([\w\.]+)/i],
          [[n, "Puffin"], i],
          [/(focus)\/([\w\.]+)/i],
          [[n, "Firefox Focus"], i],
          [/(opt)\/([\w\.]+)/i],
          [[n, "Opera Touch"], i],
          [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],
          [[n, "UCBrowser"], i],
          [/(comodo_dragon)\/([\w\.]+)/i],
          [[n, /_/g, " "], i],
          [/(windowswechat qbcore)\/([\w\.]+)/i],
          [[n, "WeChat(Win) Desktop"], i],
          [/(micromessenger)\/([\w\.]+)/i],
          [[n, "WeChat"], i],
          [/(brave)\/([\w\.]+)/i],
          [[n, "Brave"], i],
          [/(qqbrowserlite)\/([\w\.]+)/i],
          [n, i],
          [/(QQ)\/([\d\.]+)/i],
          [n, i],
          [/m?(qqbrowser)[\/\s]?([\w\.]+)/i],
          [n, i],
          [/(BIDUBrowser)[\/\s]?([\w\.]+)/i],
          [n, i],
          [/(2345Explorer)[\/\s]?([\w\.]+)/i],
          [n, i],
          [/(MetaSr)[\/\s]?([\w\.]+)/i],
          [n],
          [/(LBBROWSER)/i],
          [n],
          [/xiaomi\/miuibrowser\/([\w\.]+)/i],
          [i, [n, "MIUI Browser"]],
          [/;fbav\/([\w\.]+);/i],
          [i, [n, "Facebook"]],
          [/safari\s(line)\/([\w\.]+)/i, /android.+(line)\/([\w\.]+)\/iab/i],
          [n, i],
          [/headlesschrome(?:\/([\w\.]+)|\s)/i],
          [i, [n, "Chrome Headless"]],
          [/\swv\).+(chrome)\/([\w\.]+)/i],
          [[n, /(.+)/, "$1 WebView"], i],
          [/((?:oculus|samsung)browser)\/([\w\.]+)/i],
          [[n, /(.+(?:g|us))(.+)/, "$1 $2"], i],
          [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],
          [i, [n, "Android Browser"]],
          [/(sailfishbrowser)\/([\w\.]+)/i],
          [[n, "Sailfish Browser"], i],
          [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],
          [n, i],
          [/(dolfin)\/([\w\.]+)/i],
          [[n, "Dolphin"], i],
          [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
          [[n, "Chrome"], i],
          [/(coast)\/([\w\.]+)/i],
          [[n, "Opera Coast"], i],
          [/fxios\/([\w\.-]+)/i],
          [i, [n, "Firefox"]],
          [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
          [i, [n, "Mobile Safari"]],
          [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
          [i, n],
          [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
          [[n, "GSA"], i],
          [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
          [n, [i, u.str, c.browser.oldsafari.version]],
          [/(webkit|khtml)\/([\w\.]+)/i],
          [n, i],
          [/(navigator|netscape)\/([\w\.-]+)/i],
          [[n, "Netscape"], i],
          [
            /(swiftfox)/i,
            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,
            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
            /(links)\s\(([\w\.]+)/i,
            /(gobrowser)\/?([\w\.]*)/i,
            /(ice\s?browser)\/v?([\w\._]+)/i,
            /(mosaic)[\/\s]([\w\.]+)/i,
          ],
          [n, i],
        ],
        cpu: [
          [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
          [["architecture", "amd64"]],
          [/(ia32(?=;))/i],
          [["architecture", l.lowerize]],
          [/((?:i[346]|x)86)[;\)]/i],
          [["architecture", "ia32"]],
          [/windows\s(ce|mobile);\sppc;/i],
          [["architecture", "arm"]],
          [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
          [["architecture", /ower/, "", l.lowerize]],
          [/(sun4\w)[;\)]/i],
          [["architecture", "sparc"]],
          [
            /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i,
          ],
          [["architecture", l.lowerize]],
        ],
        device: [
          [/\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i],
          [d, o, [r, s]],
          [/applecoremedia\/[\w\.]+ \((ipad)/],
          [d, [o, "Apple"], [r, s]],
          [/(apple\s{0,1}tv)/i],
          [
            [d, "Apple TV"],
            [o, "Apple"],
          ],
          [
            /(archos)\s(gamepad2?)/i,
            /(hp).+(touchpad)/i,
            /(hp).+(tablet)/i,
            /(kindle)\/([\w\.]+)/i,
            /\s(nook)[\w\s]+build\/(\w+)/i,
            /(dell)\s(strea[kpr\s\d]*[\dko])/i,
          ],
          [o, d, [r, s]],
          [/(kf[A-z]+)\sbuild\/.+silk\//i],
          [d, [o, "Amazon"], [r, s]],
          [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],
          [
            [d, u.str, c.device.amazon.model],
            [o, "Amazon"],
            [r, a],
          ],
          [/android.+aft([bms])\sbuild/i],
          [d, [o, "Amazon"], [r, "smarttv"]],
          [/\((ip[honed|\s\w*]+);.+(apple)/i],
          [d, o, [r, a]],
          [/\((ip[honed|\s\w*]+);/i],
          [d, [o, "Apple"], [r, a]],
          [
            /(blackberry)[\s-]?(\w+)/i,
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
            /(hp)\s([\w\s]+\w)/i,
            /(asus)-?(\w+)/i,
          ],
          [o, d, [r, a]],
          [/\(bb10;\s(\w+)/i],
          [d, [o, "BlackBerry"], [r, a]],
          [
            /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i,
          ],
          [d, [o, "Asus"], [r, s]],
          [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
          [
            [o, "Sony"],
            [d, "Xperia Tablet"],
            [r, s],
          ],
          [
            /android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
          ],
          [d, [o, "Sony"], [r, a]],
          [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
          [o, d, [r, "console"]],
          [/android.+;\s(shield)\sbuild/i],
          [d, [o, "Nvidia"], [r, "console"]],
          [/(playstation\s[34portablevi]+)/i],
          [d, [o, "Sony"], [r, "console"]],
          [/(sprint\s(\w+))/i],
          [
            [o, u.str, c.device.sprint.vendor],
            [d, u.str, c.device.sprint.model],
            [r, a],
          ],
          [
            /(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i,
            /(zte)-(\w*)/i,
            /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i,
          ],
          [o, [d, /_/g, " "], [r, a]],
          [/(nexus\s9)/i],
          [d, [o, "HTC"], [r, s]],
          [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i],
          [d, [o, "Huawei"], [r, a]],
          [/(microsoft);\s(lumia[\s\w]+)/i],
          [o, d, [r, a]],
          [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
          [d, [o, "Microsoft"], [r, "console"]],
          [/(kin\.[onetw]{3})/i],
          [
            [d, /\./g, " "],
            [o, "Microsoft"],
            [r, a],
          ],
          [
            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
            /mot[\s-]?(\w*)/i,
            /(XT\d{3,4}) build\//i,
            /(nexus\s6)/i,
          ],
          [d, [o, "Motorola"], [r, a]],
          [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
          [d, [o, "Motorola"], [r, s]],
          [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
          [
            [o, l.trim],
            [d, l.trim],
            [r, "smarttv"],
          ],
          [/hbbtv.+maple;(\d+)/i],
          [
            [d, /^/, "SmartTV"],
            [o, "Samsung"],
            [r, "smarttv"],
          ],
          [/\(dtv[\);].+(aquos)/i],
          [d, [o, "Sharp"], [r, "smarttv"]],
          [
            /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
            /((SM-T\w+))/i,
          ],
          [[o, "Samsung"], d, [r, s]],
          [/smart-tv.+(samsung)/i],
          [o, [r, "smarttv"], d],
          [
            /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
            /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,
            /sec-((sgh\w+))/i,
          ],
          [[o, "Samsung"], d, [r, a]],
          [/sie-(\w*)/i],
          [d, [o, "Siemens"], [r, a]],
          [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]*)/i],
          [[o, "Nokia"], d, [r, a]],
          [/android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i],
          [d, [o, "Acer"], [r, s]],
          [/android.+([vl]k\-?\d{3})\s+build/i],
          [d, [o, "LG"], [r, s]],
          [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
          [[o, "LG"], d, [r, s]],
          [/(lg) netcast\.tv/i],
          [o, d, [r, "smarttv"]],
          [
            /(nexus\s[45])/i,
            /lg[e;\s\/-]+(\w*)/i,
            /android.+lg(\-?[\d\w]+)\s+build/i,
          ],
          [d, [o, "LG"], [r, a]],
          [/(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i],
          [o, d, [r, s]],
          [/android.+(ideatab[a-z0-9\-\s]+)/i],
          [d, [o, "Lenovo"], [r, s]],
          [/(lenovo)[_\s-]?([\w-]+)/i],
          [o, d, [r, a]],
          [/linux;.+((jolla));/i],
          [o, d, [r, a]],
          [/((pebble))app\/[\d\.]+\s/i],
          [o, d, [r, "wearable"]],
          [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],
          [o, d, [r, a]],
          [/crkey/i],
          [
            [d, "Chromecast"],
            [o, "Google"],
          ],
          [/android.+;\s(glass)\s\d/i],
          [d, [o, "Google"], [r, "wearable"]],
          [/android.+;\s(pixel c)[\s)]/i],
          [d, [o, "Google"], [r, s]],
          [/android.+;\s(pixel( [23])?( xl)?)[\s)]/i],
          [d, [o, "Google"], [r, a]],
          [
            /android.+;\s(\w+)\s+build\/hm\1/i,
            /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,
            /android.+(mi[\s\-_]*(?:a\d|one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,
            /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i,
          ],
          [
            [d, /_/g, " "],
            [o, "Xiaomi"],
            [r, a],
          ],
          [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i],
          [
            [d, /_/g, " "],
            [o, "Xiaomi"],
            [r, s],
          ],
          [/android.+;\s(m[1-5]\snote)\sbuild/i],
          [d, [o, "Meizu"], [r, a]],
          [/(mz)-([\w-]{2,})/i],
          [[o, "Meizu"], d, [r, a]],
          [/android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})\s+build/i],
          [d, [o, "OnePlus"], [r, a]],
          [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],
          [d, [o, "RCA"], [r, s]],
          [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],
          [d, [o, "Dell"], [r, s]],
          [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],
          [d, [o, "Verizon"], [r, s]],
          [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],
          [[o, "Barnes & Noble"], d, [r, s]],
          [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],
          [d, [o, "NuVision"], [r, s]],
          [/android.+;\s(k88)\sbuild/i],
          [d, [o, "ZTE"], [r, s]],
          [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],
          [d, [o, "Swiss"], [r, a]],
          [/android.+[;\/]\s*(zur\d{3})\s+build/i],
          [d, [o, "Swiss"], [r, s]],
          [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],
          [d, [o, "Zeki"], [r, s]],
          [
            /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
            /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i,
          ],
          [[o, "Dragon Touch"], d, [r, s]],
          [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],
          [d, [o, "Insignia"], [r, s]],
          [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],
          [d, [o, "NextBook"], [r, s]],
          [
            /android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i,
          ],
          [[o, "Voice"], d, [r, a]],
          [/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],
          [[o, "LvTel"], d, [r, a]],
          [/android.+;\s(PH-1)\s/i],
          [d, [o, "Essential"], [r, a]],
          [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],
          [d, [o, "Envizen"], [r, s]],
          [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],
          [o, d, [r, s]],
          [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],
          [d, [o, "MachSpeed"], [r, s]],
          [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],
          [o, d, [r, s]],
          [/android.+[;\/]\s*TU_(1491)\s+build/i],
          [d, [o, "Rotor"], [r, s]],
          [/android.+(KS(.+))\s+build/i],
          [d, [o, "Amazon"], [r, s]],
          [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],
          [o, d, [r, s]],
          [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i],
          [[r, l.lowerize], o, d],
          [/[\s\/\(](smart-?tv)[;\)]/i],
          [[r, "smarttv"]],
          [/(android[\w\.\s\-]{0,9});.+build/i],
          [d, [o, "Generic"]],
        ],
        engine: [
          [/windows.+\sedge\/([\w\.]+)/i],
          [i, [n, "EdgeHTML"]],
          [/webkit\/537\.36.+chrome\/(?!27)/i],
          [[n, "Blink"]],
          [
            /(presto)\/([\w\.]+)/i,
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,
            /(icab)[\/\s]([23]\.[\d\.]+)/i,
          ],
          [n, i],
          [/rv\:([\w\.]{1,9}).+(gecko)/i],
          [i, n],
        ],
        os: [
          [/microsoft\s(windows)\s(vista|xp)/i],
          [n, i],
          [
            /(windows)\snt\s6\.2;\s(arm)/i,
            /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,
            /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i,
          ],
          [n, [i, u.str, c.os.windows.version]],
          [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
          [
            [n, "Windows"],
            [i, u.str, c.os.windows.version],
          ],
          [/\((bb)(10);/i],
          [[n, "BlackBerry"], i],
          [
            /(blackberry)\w*\/?([\w\.]*)/i,
            /(tizen)[\/\s]([\w\.]+)/i,
            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i,
          ],
          [n, i],
          [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],
          [[n, "Symbian"], i],
          [/\((series40);/i],
          [n],
          [/mozilla.+\(mobile;.+gecko.+firefox/i],
          [[n, "Firefox OS"], i],
          [
            /(nintendo|playstation)\s([wids34portablevu]+)/i,
            /(mint)[\/\s\(]?(\w*)/i,
            /(mageia|vectorlinux)[;\s]/i,
            /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
            /(hurd|linux)\s?([\w\.]*)/i,
            /(gnu)\s?([\w\.]*)/i,
          ],
          [n, i],
          [/(cros)\s[\w]+\s([\w\.]+\w)/i],
          [[n, "Chromium OS"], i],
          [/(sunos)\s?([\w\.\d]*)/i],
          [[n, "Solaris"], i],
          [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],
          [n, i],
          [/(haiku)\s(\w+)/i],
          [n, i],
          [
            /cfnetwork\/.+darwin/i,
            /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i,
          ],
          [
            [i, /_/g, "."],
            [n, "iOS"],
          ],
          [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i],
          [
            [n, "Mac OS"],
            [i, /_/g, "."],
          ],
          [
            /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,
            /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,
            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
            /(unix)\s?([\w\.]*)/i,
          ],
          [n, i],
        ],
      },
      h = function (t, d) {
        if (
          ("object" == typeof t && ((d = t), (t = void 0)),
          !(this instanceof h))
        )
          return new h(t, d).getResult();
        var n =
            t ||
            (e && e.navigator && e.navigator.userAgent
              ? e.navigator.userAgent
              : ""),
          r = d ? l.extend(f, d) : f;
        return (
          (this.getBrowser = function () {
            var e = { name: void 0, version: void 0 };
            return (
              u.rgx.call(e, n, r.browser), (e.major = l.major(e.version)), e
            );
          }),
          (this.getCPU = function () {
            var e = { architecture: void 0 };
            return u.rgx.call(e, n, r.cpu), e;
          }),
          (this.getDevice = function () {
            var e = { vendor: void 0, model: void 0, type: void 0 };
            return u.rgx.call(e, n, r.device), e;
          }),
          (this.getEngine = function () {
            var e = { name: void 0, version: void 0 };
            return u.rgx.call(e, n, r.engine), e;
          }),
          (this.getOS = function () {
            var e = { name: void 0, version: void 0 };
            return u.rgx.call(e, n, r.os), e;
          }),
          (this.getResult = function () {
            return {
              ua: this.getUA(),
              browser: this.getBrowser(),
              engine: this.getEngine(),
              os: this.getOS(),
              device: this.getDevice(),
              cpu: this.getCPU(),
            };
          }),
          (this.getUA = function () {
            return n;
          }),
          (this.setUA = function (e) {
            return (n = e), this;
          }),
          this
        );
      };
    (h.VERSION = "0.7.20"),
      (h.BROWSER = { NAME: n, MAJOR: "major", VERSION: i }),
      (h.CPU = { ARCHITECTURE: "architecture" }),
      (h.DEVICE = {
        MODEL: d,
        VENDOR: o,
        TYPE: r,
        CONSOLE: "console",
        MOBILE: a,
        SMARTTV: "smarttv",
        TABLET: s,
        WEARABLE: "wearable",
        EMBEDDED: "embedded",
      }),
      (h.ENGINE = { NAME: n, VERSION: i }),
      (h.OS = { NAME: n, VERSION: i }),
      "undefined" != typeof exports
        ? ("undefined" != typeof module &&
            module.exports &&
            (exports = module.exports = h),
          (exports.UAParser = h))
        : "function" == typeof define && define.amd
        ? define(function () {
            return h;
          })
        : e && (e.UAParser = h);
    var $ = e && (e.jQuery || e.Zepto);
    if (void 0 !== $ && !$.ua) {
      var p = new h();
      ($.ua = p.getResult()),
        ($.ua.get = function () {
          return p.getUA();
        }),
        ($.ua.set = function (e) {
          p.setUA(e);
          var t = p.getResult();
          for (var d in t) $.ua[d] = t[d];
        });
    }
  })("object" == typeof window ? window : this),
  function () {
    "use strict";
    var e = { function: !0, object: !0 },
      t = (e[typeof window] && window) || this,
      d = e[typeof exports] && exports,
      n = e[typeof module] && module && !module.nodeType && module,
      r = d && n && "object" == typeof global && global;
    !r || (r.global !== r && r.window !== r && r.self !== r) || (t = r);
    var o = Math.pow(2, 53) - 1,
      i = /\bOpera/,
      a = Object.prototype,
      s = a.hasOwnProperty,
      l = a.toString;
    function u(e) {
      return (e = String(e)).charAt(0).toUpperCase() + e.slice(1);
    }
    function c(e) {
      return (e = m(e)), /^(?:webOS|i(?:OS|P))/.test(e) ? e : u(e);
    }
    function f(e, t) {
      for (var d in e) s.call(e, d) && t(e[d], d, e);
    }
    function h(e) {
      return null == e ? u(e) : l.call(e).slice(8, -1);
    }
    function $(e) {
      return String(e).replace(/([ -])(?!$)/g, "$1?");
    }
    function p(e, t) {
      var d = null;
      return (
        (function (e, t) {
          var d = -1,
            n = e ? e.length : 0;
          if ("number" == typeof n && -1 < n && n <= o)
            for (; ++d < n; ) t(e[d], d);
          else f(e, t);
        })(e, function (n, r) {
          d = t(d, n, r, e);
        }),
        d
      );
    }
    function m(e) {
      return String(e).replace(/^ +| +$/g, "");
    }
    var g = (function e(d) {
      var n = t,
        r = d && "object" == typeof d && "String" != h(d);
      r && ((n = d), (d = null));
      var o = n.navigator || {},
        a = o.userAgent || "";
      d = d || a;
      var s,
        u,
        g,
        v,
        y,
        C = r
          ? !!o.likeChrome
          : /\bChrome\b/.test(d) && !/internal|\n/i.test(l.toString()),
        b = "Object",
        w = r ? b : "ScriptBridgingProxyObject",
        k = r ? b : "Environment",
        B = r && n.java ? "JavaPackage" : h(n.java),
        x = r ? b : "RuntimeObject",
        P = /\bJava/.test(B) && n.java,
        S = P && h(n.environment) == k,
        A = P ? "a" : "\u03b1",
        L = P ? "b" : "\u03b2",
        T = n.document || {},
        M = n.operamini || n.opera,
        I = i.test((I = r && M ? M["[[Class]]"] : h(M))) ? I : (M = null),
        E = d,
        N = [],
        _ = null,
        D = d == a,
        O = D && M && "function" == typeof M.version && M.version(),
        R = p(
          [
            { label: "EdgeHTML", pattern: "Edge" },
            "Trident",
            { label: "WebKit", pattern: "AppleWebKit" },
            "iCab",
            "Presto",
            "NetFront",
            "Tasman",
            "KHTML",
            "Gecko",
          ],
          function (e, t) {
            return (
              e ||
              (RegExp("\\b" + (t.pattern || $(t)) + "\\b", "i").exec(d) &&
                (t.label || t))
            );
          }
        ),
        F = p(
          [
            "Adobe AIR",
            "Arora",
            "Avant Browser",
            "Breach",
            "Camino",
            "Electron",
            "Epiphany",
            "Fennec",
            "Flock",
            "Galeon",
            "GreenBrowser",
            "iCab",
            "Iceweasel",
            "K-Meleon",
            "Konqueror",
            "Lunascape",
            "Maxthon",
            { label: "Microsoft Edge", pattern: "(?:Edge|Edg|EdgA|EdgiOS)" },
            "Midori",
            "Nook Browser",
            "PaleMoon",
            "PhantomJS",
            "Raven",
            "Rekonq",
            "RockMelt",
            { label: "Samsung Internet", pattern: "SamsungBrowser" },
            "SeaMonkey",
            { label: "Silk", pattern: "(?:Cloud9|Silk-Accelerated)" },
            "Sleipnir",
            "SlimBrowser",
            { label: "SRWare Iron", pattern: "Iron" },
            "Sunrise",
            "Swiftfox",
            "Vivaldi",
            "Waterfox",
            "WebPositive",
            { label: "Yandex Browser", pattern: "YaBrowser" },
            { label: "UC Browser", pattern: "UCBrowser" },
            "Opera Mini",
            { label: "Opera Mini", pattern: "OPiOS" },
            "Opera",
            { label: "Opera", pattern: "OPR" },
            "Chromium",
            "Chrome",
            { label: "Chrome", pattern: "(?:HeadlessChrome)" },
            { label: "Chrome Mobile", pattern: "(?:CriOS|CrMo)" },
            { label: "Firefox", pattern: "(?:Firefox|Minefield)" },
            { label: "Firefox for iOS", pattern: "FxiOS" },
            { label: "IE", pattern: "IEMobile" },
            { label: "IE", pattern: "MSIE" },
            "Safari",
          ],
          function (e, t) {
            return (
              e ||
              (RegExp("\\b" + (t.pattern || $(t)) + "\\b", "i").exec(d) &&
                (t.label || t))
            );
          }
        ),
        j = H([
          { label: "BlackBerry", pattern: "BB10" },
          "BlackBerry",
          { label: "Galaxy S", pattern: "GT-I9000" },
          { label: "Galaxy S2", pattern: "GT-I9100" },
          { label: "Galaxy S3", pattern: "GT-I9300" },
          { label: "Galaxy S4", pattern: "GT-I9500" },
          { label: "Galaxy S5", pattern: "SM-G900" },
          { label: "Galaxy S6", pattern: "SM-G920" },
          { label: "Galaxy S6 Edge", pattern: "SM-G925" },
          { label: "Galaxy S7", pattern: "SM-G930" },
          { label: "Galaxy S7 Edge", pattern: "SM-G935" },
          "Google TV",
          "Lumia",
          "iPad",
          "iPod",
          "iPhone",
          "Kindle",
          { label: "Kindle Fire", pattern: "(?:Cloud9|Silk-Accelerated)" },
          "Nexus",
          "Nook",
          "PlayBook",
          "PlayStation Vita",
          "PlayStation",
          "TouchPad",
          "Transformer",
          { label: "Wii U", pattern: "WiiU" },
          "Wii",
          "Xbox One",
          { label: "Xbox 360", pattern: "Xbox" },
          "Xoom",
        ]),
        G = p(
          {
            Apple: { iPad: 1, iPhone: 1, iPod: 1 },
            Alcatel: {},
            Archos: {},
            Amazon: { Kindle: 1, "Kindle Fire": 1 },
            Asus: { Transformer: 1 },
            "Barnes & Noble": { Nook: 1 },
            BlackBerry: { PlayBook: 1 },
            Google: { "Google TV": 1, Nexus: 1 },
            HP: { TouchPad: 1 },
            HTC: {},
            Huawei: {},
            Lenovo: {},
            LG: {},
            Microsoft: { Xbox: 1, "Xbox One": 1 },
            Motorola: { Xoom: 1 },
            Nintendo: { "Wii U": 1, Wii: 1 },
            Nokia: { Lumia: 1 },
            Oppo: {},
            Samsung: {
              "Galaxy S": 1,
              "Galaxy S2": 1,
              "Galaxy S3": 1,
              "Galaxy S4": 1,
            },
            Sony: { PlayStation: 1, "PlayStation Vita": 1 },
            Xiaomi: { Mi: 1, Redmi: 1 },
          },
          function (e, t, n) {
            return (
              e ||
              ((t[j] ||
                t[/^[a-z]+(?: +[a-z]+\b)*/i.exec(j)] ||
                RegExp("\\b" + $(n) + "(?:\\b|\\w*\\d)", "i").exec(d)) &&
                n)
            );
          }
        ),
        U = p(
          [
            "Windows Phone",
            "KaiOS",
            "Android",
            "CentOS",
            { label: "Chrome OS", pattern: "CrOS" },
            "Debian",
            { label: "DragonFly BSD", pattern: "DragonFly" },
            "Fedora",
            "FreeBSD",
            "Gentoo",
            "Haiku",
            "Kubuntu",
            "Linux Mint",
            "OpenBSD",
            "Red Hat",
            "SuSE",
            "Ubuntu",
            "Xubuntu",
            "Cygwin",
            "Symbian OS",
            "hpwOS",
            "webOS ",
            "webOS",
            "Tablet OS",
            "Tizen",
            "Linux",
            "Mac OS X",
            "Macintosh",
            "Mac",
            "Windows 98;",
            "Windows ",
          ],
          function (e, t) {
            var n,
              r,
              o,
              i,
              a = t.pattern || $(t);
            return (
              !e &&
                (e = RegExp("\\b" + a + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(
                  d
                )) &&
                ((n = e),
                (r = a),
                (o = t.label || t),
                (i = {
                  "10.0": "10",
                  6.4: "10 Technical Preview",
                  6.3: "8.1",
                  6.2: "8",
                  6.1: "Server 2008 R2 / 7",
                  "6.0": "Server 2008 / Vista",
                  5.2: "Server 2003 / XP 64-bit",
                  5.1: "XP",
                  5.01: "2000 SP1",
                  "5.0": "2000",
                  "4.0": "NT",
                  "4.90": "ME",
                }),
                r &&
                  o &&
                  /^Win/i.test(n) &&
                  !/^Windows Phone /i.test(n) &&
                  (i = i[/[\d.]+$/.exec(n)]) &&
                  (n = "Windows " + i),
                (n = String(n)),
                r && o && (n = n.replace(RegExp(r, "i"), o)),
                (e = n =
                  c(
                    n
                      .replace(/ ce$/i, " CE")
                      .replace(/\bhpw/i, "web")
                      .replace(/\bMacintosh\b/, "Mac OS")
                      .replace(/_PowerPC\b/i, " OS")
                      .replace(/\b(OS X) [^ \d]+/i, "$1")
                      .replace(/\bMac (OS X)\b/, "$1")
                      .replace(/\/(\d)/, " $1")
                      .replace(/_/g, ".")
                      .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "")
                      .replace(/\bx86\.64\b/gi, "x86_64")
                      .replace(/\b(Windows Phone) OS\b/, "$1")
                      .replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1")
                      .split(" on ")[0]
                  ))),
              e
            );
          }
        );
      function H(e) {
        return p(e, function (e, t) {
          var n = t.pattern || $(t);
          return (
            !e &&
              (e =
                RegExp("\\b" + n + " *\\d+[.\\w_]*", "i").exec(d) ||
                RegExp("\\b" + n + " *\\w+-[\\w]*", "i").exec(d) ||
                RegExp(
                  "\\b" + n + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)",
                  "i"
                ).exec(d)) &&
              ((e = String(
                t.label && !RegExp(n, "i").test(t.label) ? t.label : e
              ).split("/"))[1] &&
                !/[\d.]+/.test(e[0]) &&
                (e[0] += " " + e[1]),
              (t = t.label || t),
              (e = c(
                e[0]
                  .replace(RegExp(n, "i"), t)
                  .replace(RegExp("; *(?:" + t + "[_-])?", "i"), " ")
                  .replace(RegExp("(" + t + ")[-_.]?(\\w)", "i"), "$1 $2")
              ))),
            e
          );
        });
      }
      function z(e) {
        return p(e, function (e, t) {
          return (
            e ||
            (RegExp(
              t + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)",
              "i"
            ).exec(d) || 0)[1] ||
            null
          );
        });
      }
      if (
        ((R = R && [R]),
        /\bAndroid\b/.test(U) &&
          !j &&
          (s = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(d)) &&
          (j = m(s[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null),
        G && !j
          ? (j = H([G]))
          : G &&
            j &&
            (j = j
              .replace(RegExp("^(" + $(G) + ")[-_.\\s]", "i"), G + " ")
              .replace(RegExp("^(" + $(G) + ")[-_.]?(\\w)", "i"), G + " $2")),
        (s = /\bGoogle TV\b/.exec(j)) && (j = s[0]),
        /\bSimulator\b/i.test(d) && (j = (j ? j + " " : "") + "Simulator"),
        "Opera Mini" == F &&
          /\bOPiOS\b/.test(d) &&
          N.push("running in Turbo/Uncompressed mode"),
        "IE" == F && /\blike iPhone OS\b/.test(d)
          ? ((G = (s = e(d.replace(/like iPhone OS/, ""))).manufacturer),
            (j = s.product))
          : /^iP/.test(j)
          ? ((F = F || "Safari"),
            (U =
              "iOS" +
              ((s = / OS ([\d_]+)/i.exec(d))
                ? " " + s[1].replace(/_/g, ".")
                : "")))
          : "Konqueror" == F && /^Linux\b/i.test(U)
          ? (U = "Kubuntu")
          : (G &&
              "Google" != G &&
              ((/Chrome/.test(F) && !/\bMobile Safari\b/i.test(d)) ||
                /\bVita\b/.test(j))) ||
            (/\bAndroid\b/.test(U) &&
              /^Chrome/.test(F) &&
              /\bVersion\//i.test(d))
          ? ((F = "Android Browser"),
            (U = /\bAndroid\b/.test(U) ? U : "Android"))
          : "Silk" == F
          ? (/\bMobi/i.test(d) || ((U = "Android"), N.unshift("desktop mode")),
            /Accelerated *= *true/i.test(d) && N.unshift("accelerated"))
          : "UC Browser" == F && /\bUCWEB\b/.test(d)
          ? N.push("speed mode")
          : "PaleMoon" == F && (s = /\bFirefox\/([\d.]+)\b/.exec(d))
          ? N.push("identifying as Firefox " + s[1])
          : "Firefox" == F && (s = /\b(Mobile|Tablet|TV)\b/i.exec(d))
          ? ((U = U || "Firefox OS"), (j = j || s[1]))
          : !F ||
            (s = !/\bMinefield\b/i.test(d) && /\b(?:Firefox|Safari)\b/.exec(F))
          ? (F &&
              !j &&
              /[\/,]|^[^(]+?\)/.test(d.slice(d.indexOf(s + "/") + 8)) &&
              (F = null),
            (s = j || G || U) &&
              (j ||
                G ||
                /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(U)) &&
              (F =
                /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(U) ? U : s) +
                " Browser"))
          : "Electron" == F &&
            (s = (/\bChrome\/([\d.]+)\b/.exec(d) || 0)[1]) &&
            N.push("Chromium " + s),
        (O =
          O ||
          z([
            "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
            "Version",
            $(F),
            "(?:Firefox|Minefield|NetFront)",
          ])),
        (s =
          ("iCab" == R && 3 < parseFloat(O)
            ? "WebKit"
            : /\bOpera\b/.test(F) &&
              (/\bOPR\b/.test(d) ? "Blink" : "Presto")) ||
          (/\b(?:Midori|Nook|Safari)\b/i.test(d) &&
            !/^(?:Trident|EdgeHTML)$/.test(R) &&
            "WebKit") ||
          (!R &&
            /\bMSIE\b/i.test(d) &&
            ("Mac OS" == U ? "Tasman" : "Trident")) ||
          ("WebKit" == R &&
            /\bPlayStation\b(?! Vita\b)/i.test(F) &&
            "NetFront")) && (R = [s]),
        "IE" == F && (s = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(d) || 0)[1])
          ? ((F += " Mobile"),
            (U = "Windows Phone " + (/\+$/.test(s) ? s : s + ".x")),
            N.unshift("desktop mode"))
          : /\bWPDesktop\b/i.test(d)
          ? ((F = "IE Mobile"),
            (U = "Windows Phone 8.x"),
            N.unshift("desktop mode"),
            (O = O || (/\brv:([\d.]+)/.exec(d) || 0)[1]))
          : "IE" != F &&
            "Trident" == R &&
            (s = /\brv:([\d.]+)/.exec(d)) &&
            (F && N.push("identifying as " + F + (O ? " " + O : "")),
            (F = "IE"),
            (O = s[1])),
        D)
      ) {
        if (
          ((v = "global"),
          (y = null != (g = n) ? typeof g[v] : "number"),
          /^(?:boolean|number|string|undefined)$/.test(y) ||
            ("object" == y && !g[v]))
        )
          h((s = n.runtime)) == w
            ? ((F = "Adobe AIR"), (U = s.flash.system.Capabilities.os))
            : h((s = n.phantom)) == x
            ? ((F = "PhantomJS"),
              (O =
                (s = s.version || null) &&
                s.major + "." + s.minor + "." + s.patch))
            : "number" == typeof T.documentMode &&
              (s = /\bTrident\/(\d+)/i.exec(d))
            ? ((s = +s[1] + 4) != (O = [O, T.documentMode])[1] &&
                (N.push("IE " + O[1] + " mode"), R && (R[1] = ""), (O[1] = s)),
              (O = "IE" == F ? String(O[1].toFixed(1)) : O[0]))
            : "number" == typeof T.documentMode &&
              /^(?:Chrome|Firefox)\b/.test(F) &&
              (N.push("masking as " + F + " " + O),
              (F = "IE"),
              (O = "11.0"),
              (R = ["Trident"]),
              (U = "Windows"));
        else if (
          (P &&
            ((E = (s = P.lang.System).getProperty("os.arch")),
            (U =
              U ||
              s.getProperty("os.name") + " " + s.getProperty("os.version"))),
          S)
        ) {
          try {
            (O = n.require("ringo/engine").version.join(".")), (F = "RingoJS");
          } catch (r) {
            (s = n.system) &&
              s.global.system == n.system &&
              ((F = "Narwhal"), (U = U || s[0].os || null));
          }
          F = F || "Rhino";
        } else
          "object" == typeof n.process &&
            !n.process.browser &&
            (s = n.process) &&
            ("object" == typeof s.versions &&
              ("string" == typeof s.versions.electron
                ? (N.push("Node " + s.versions.node),
                  (F = "Electron"),
                  (O = s.versions.electron))
                : "string" == typeof s.versions.nw &&
                  (N.push("Chromium " + O, "Node " + s.versions.node),
                  (F = "NW.js"),
                  (O = s.versions.nw))),
            F ||
              ((F = "Node.js"),
              (E = s.arch),
              (U = s.platform),
              (O = (O = /[\d.]+/.exec(s.version)) ? O[0] : null)));
        U = U && c(U);
      }
      if (
        (O &&
          (s =
            /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(O) ||
            /(?:alpha|beta)(?: ?\d)?/i.exec(
              d + ";" + (D && o.appMinorVersion)
            ) ||
            (/\bMinefield\b/i.test(d) && "a")) &&
          ((_ = /b/i.test(s) ? "beta" : "alpha"),
          (O =
            O.replace(RegExp(s + "\\+?$"), "") +
            ("beta" == _ ? L : A) +
            (/\d+\+?/.exec(s) || ""))),
        "Fennec" == F ||
          ("Firefox" == F && /\b(?:Android|Firefox OS|KaiOS)\b/.test(U)))
      )
        F = "Firefox Mobile";
      else if ("Maxthon" == F && O) O = O.replace(/\.[\d.]+/, ".x");
      else if (/\bXbox\b/i.test(j))
        "Xbox 360" == j && (U = null),
          "Xbox 360" == j && /\bIEMobile\b/.test(d) && N.unshift("mobile mode");
      else if (
        (!/^(?:Chrome|IE|Opera)$/.test(F) &&
          (!F || j || /Browser|Mobi/.test(F))) ||
        ("Windows CE" != U && !/Mobi/i.test(d))
      )
        if ("IE" == F && D)
          try {
            null === n.external && N.unshift("platform preview");
          } catch (r) {
            N.unshift("embedded");
          }
        else
          (/\bBlackBerry\b/.test(j) || /\bBB10\b/.test(d)) &&
          (s =
            (RegExp(j.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(d) ||
              0)[1] || O)
            ? ((U =
                ((s = [s, /BB10/.test(d)])[1]
                  ? ((j = null), (G = "BlackBerry"))
                  : "Device Software") +
                " " +
                s[0]),
              (O = null))
            : this != f &&
              "Wii" != j &&
              ((D && M) ||
                (/Opera/.test(F) && /\b(?:MSIE|Firefox)\b/i.test(d)) ||
                ("Firefox" == F && /\bOS X (?:\d+\.){2,}/.test(U)) ||
                ("IE" == F &&
                  ((U && !/^Win/.test(U) && 5.5 < O) ||
                    (/\bWindows XP\b/.test(U) && 8 < O) ||
                    (8 == O && !/\bTrident\b/.test(d))))) &&
              !i.test((s = e.call(f, d.replace(i, "") + ";"))) &&
              s.name &&
              ((s = "ing as " + s.name + ((s = s.version) ? " " + s : "")),
              i.test(F)
                ? (/\bIE\b/.test(s) && "Mac OS" == U && (U = null),
                  (s = "identify" + s))
                : ((s = "mask" + s),
                  (F = I ? c(I.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera"),
                  /\bIE\b/.test(s) && (U = null),
                  D || (O = null)),
              (R = ["Presto"]),
              N.push(s));
      else F += " Mobile";
      (s = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(d) || 0)[1]) &&
        ((s = [parseFloat(s.replace(/\.(\d)$/, ".0$1")), s]),
        "Safari" == F && "+" == s[1].slice(-1)
          ? ((F = "WebKit Nightly"), (_ = "alpha"), (O = s[1].slice(0, -1)))
          : (O != s[1] &&
              O != (s[2] = (/\bSafari\/([\d.]+\+?)/i.exec(d) || 0)[1])) ||
            (O = null),
        (s[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(d) || 0)[1]),
        537.36 == s[0] &&
          537.36 == s[2] &&
          28 <= parseFloat(s[1]) &&
          "WebKit" == R &&
          (R = ["Blink"]),
        (s =
          D && (C || s[1])
            ? (R && (R[1] = "like Chrome"),
              s[1] ||
                ((s = s[0]) < 530
                  ? 1
                  : s < 532
                  ? 2
                  : s < 532.05
                  ? 3
                  : s < 533
                  ? 4
                  : s < 534.03
                  ? 5
                  : s < 534.07
                  ? 6
                  : s < 534.1
                  ? 7
                  : s < 534.13
                  ? 8
                  : s < 534.16
                  ? 9
                  : s < 534.24
                  ? 10
                  : s < 534.3
                  ? 11
                  : s < 535.01
                  ? 12
                  : s < 535.02
                  ? "13+"
                  : s < 535.07
                  ? 15
                  : s < 535.11
                  ? 16
                  : s < 535.19
                  ? 17
                  : s < 536.05
                  ? 18
                  : s < 536.1
                  ? 19
                  : s < 537.01
                  ? 20
                  : s < 537.11
                  ? "21+"
                  : s < 537.13
                  ? 23
                  : s < 537.18
                  ? 24
                  : s < 537.24
                  ? 25
                  : s < 537.36
                  ? 26
                  : "Blink" != R
                  ? "27"
                  : "28"))
            : (R && (R[1] = "like Safari"),
              (s = s[0]) < 400
                ? 1
                : s < 500
                ? 2
                : s < 526
                ? 3
                : s < 533
                ? 4
                : s < 534
                ? "4+"
                : s < 535
                ? 5
                : s < 537
                ? 6
                : s < 538
                ? 7
                : s < 601
                ? 8
                : s < 602
                ? 9
                : s < 604
                ? 10
                : s < 606
                ? 11
                : s < 608
                ? 12
                : "12")),
        R &&
          (R[1] +=
            " " +
            (s += "number" == typeof s ? ".x" : /[.+]/.test(s) ? "" : "+")),
        "Safari" == F && (!O || 45 < parseInt(O))
          ? (O = s)
          : "Chrome" == F &&
            /\bHeadlessChrome/i.test(d) &&
            N.unshift("headless")),
        "Opera" == F && (s = /\bzbov|zvav$/.exec(U))
          ? ((F += " "),
            N.unshift("desktop mode"),
            "zvav" == s ? ((F += "Mini"), (O = null)) : (F += "Mobile"),
            (U = U.replace(RegExp(" *" + s + "$"), "")))
          : "Safari" == F && /\bChrome\b/.exec(R && R[1])
          ? (N.unshift("desktop mode"),
            (F = "Chrome Mobile"),
            (O = null),
            (U = /\bOS X\b/.test(U) ? ((G = "Apple"), "iOS 4.3+") : null))
          : /\bSRWare Iron\b/.test(F) && !O && (O = z("Chrome")),
        O &&
          0 == O.indexOf((s = /[\d.]+$/.exec(U))) &&
          -1 < d.indexOf("/" + s + "-") &&
          (U = m(U.replace(s, ""))),
        U &&
          -1 != U.indexOf(F) &&
          !RegExp(F + " OS").test(U) &&
          (U = U.replace(RegExp(" *" + $(F) + " *"), "")),
        R &&
          !/\b(?:Avant|Nook)\b/.test(F) &&
          (/Browser|Lunascape|Maxthon/.test(F) ||
            ("Safari" != F && /^iOS/.test(U) && /\bSafari\b/.test(R[1])) ||
            (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(
              F
            ) &&
              R[1])) &&
          (s = R[R.length - 1]) &&
          N.push(s),
        N.length && (N = ["(" + N.join("; ") + ")"]),
        G && j && j.indexOf(G) < 0 && N.push("on " + G),
        j && N.push((/^on /.test(N[N.length - 1]) ? "" : "on ") + j),
        U &&
          ((s = / ([\d.+]+)$/.exec(U)),
          (u = s && "/" == U.charAt(U.length - s[0].length - 1)),
          (U = {
            architecture: 32,
            family: s && !u ? U.replace(s[0], "") : U,
            version: s ? s[1] : null,
            toString: function () {
              var e = this.version;
              return (
                this.family +
                (e && !u ? " " + e : "") +
                (64 == this.architecture ? " 64-bit" : "")
              );
            },
          })),
        (s = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(E)) && !/\bi686\b/i.test(E)
          ? (U &&
              ((U.architecture = 64),
              (U.family = U.family.replace(RegExp(" *" + s), ""))),
            F &&
              (/\bWOW64\b/i.test(d) ||
                (D &&
                  /\w(?:86|32)$/.test(o.cpuClass || o.platform) &&
                  !/\bWin64; x64\b/i.test(d))) &&
              N.unshift("32-bit"))
          : U &&
            /^OS X/.test(U.family) &&
            "Chrome" == F &&
            39 <= parseFloat(O) &&
            (U.architecture = 64);
      var W = {};
      return (
        (W.description = d = d || null),
        (W.layout = R && R[0]),
        (W.manufacturer = G),
        (W.name = F),
        (W.prerelease = _),
        (W.product = j),
        (W.ua = d),
        (W.version = F && O),
        (W.os = U || {
          architecture: null,
          family: null,
          version: null,
          toString: function () {
            return "null";
          },
        }),
        (W.parse = e),
        (W.toString = function () {
          return this.description || "";
        }),
        W.version && N.unshift(O),
        W.name && N.unshift(F),
        U &&
          F &&
          (U != String(U).split(" ")[0] || (U != F.split(" ")[0] && !j)) &&
          N.push(j ? "(" + U + ")" : "on " + U),
        N.length && (W.description = N.join(" ")),
        W
      );
    })();
    "function" == typeof define && "object" == typeof define.amd && define.amd
      ? ((t.platform = g),
        define(function () {
          return g;
        }))
      : d && n
      ? f(g, function (e, t) {
          d[t] = e;
        })
      : (t.platform = g);
  }.call(this);
