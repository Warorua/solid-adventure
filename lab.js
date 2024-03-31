function I() { return { value: void 0, done: !0 } } return d.prototype = m, n(_, "constructor", { value: m, configurable: !0 }), n(m, "constructor", { value: d, configurable: !0 }), d.displayName = s(m, i, "GeneratorFunction"), e.isGeneratorFunction = function (e) { var t = "function" == typeof e && e.constructor; return !!t && (t === d || "GeneratorFunction" === (t.displayName || t.name)) }, e.mark = function (e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, m) : (e.__proto__ = m, s(e, i, "GeneratorFunction")), e.prototype = Object.create(_), e }, e.awrap = function (e) { return { __await: e } }, b(y.prototype), s(y.prototype, c, (function () { return this })), e.AsyncIterator = y, e.async = function (t, r, n, a, o) {
  void 0 === o && (o = Promise); var c = new y(u(t, r, n, a), o); return e.isGeneratorFunction(r) ? c : c.next()
    .then((function (e) {
      return e.done ? e.value : c.next()
    }))
}, b(_), s(_, i, "Generator"), s(_, o, (function () { return this })), s(_, "toString", (function () { return "[object Generator]" })), e.keys = function (e) {
  var t = Object(e), r = []; for (var n in t) r.push(n); return r.reverse()
    , function e() {
      for (; r.length;) {
        var n = r.pop()
          ; if (n in t) return e.value = n, e.done = !1, e
      } return e.done = !0, e
    }
}, e.values = x, w.prototype = {
  constructor: w, reset: function (e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(j), !e) for (var t in this) "t" === t.charAt(0) && r.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0) }, stop: function () { this.done = !0; var e = this.tryEntries[0].completion; if ("throw" === e.type) throw e.arg; return this.rval }, dispatchException: function (e) { if (this.done) throw e; var t = this; function n(r, n) { return c.type = "throw", c.arg = e, t.next = r, n && (t.method = "next", t.arg = void 0), !!n } for (var a = this.tryEntries.length - 1; a >= 0; --a) { var o = this.tryEntries[a], c = o.completion; if ("root" === o.tryLoc) return n("end"); if (o.tryLoc <= this.prev) { var i = r.call(o, "catchLoc"), s = r.call(o, "finallyLoc"); if (i && s) { if (this.prev < o.catchLoc) return n(o.catchLoc, !0); if (this.prev < o.finallyLoc) return n(o.finallyLoc) } else if (i) { if (this.prev < o.catchLoc) return n(o.catchLoc, !0) } else { if (!s) throw new Error("try statement without catch or finally"); if (this.prev < o.finallyLoc) return n(o.finallyLoc) } } } }, abrupt: function (e, t) { for (var n = this.tryEntries.length - 1; n >= 0; --n) { var a = this.tryEntries[n]; if (a.tryLoc <= this.prev && r.call(a, "finallyLoc") && this.prev < a.finallyLoc) { var o = a; break } } o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null); var c = o ? o.completion : {}; return c.type = e, c.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, p) : this.complete(c) }, complete: function (e, t) { if ("throw" === e.type) throw e.arg; return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), p }, finish: function (e) { for (var t = this.tryEntries.length - 1; t >= 0; --t) { var r = this.tryEntries[t]; if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), j(r), p } }, catch: function (e) { for (var t = this.tryEntries.length - 1; t >= 0; --t) { var r = this.tryEntries[t]; if (r.tryLoc === e) { var n = r.completion; if ("throw" === n.type) { var a = n.arg; j(r) } return a } } throw new Error("illegal catch attempt") }, delegateYield: function (e, t, r) { return this.delegate = { iterator: x(e), resultName: t, nextLoc: r }, "next" === this.method && (this.arg = void 0), p }
}, e}var yf = bf()
  .mark(Mf), Ef = bf()
    .mark(Yf), Of = bf()
      .mark(Kf), Sf = bf()
        .mark(Hf), jf = bf()
          .mark(zf), wf = bf()
            .mark(Zf), xf = bf()
              .mark(qf), If = bf()
                .mark(Wf), Lf = bf()
                  .mark(Jf), kf = bf()
                    .mark(Xf), Cf = bf()
                      .mark(Qf), Nf = bf()
                        .mark($f), Af = bf()
                          .mark(ed), Rf = bf()
                            .mark(td), Pf = bf()
                              .mark(rd), Tf = bf()
                                .mark(nd), Uf = bf()
                                  .mark(ad), Df = bf()
                                    .mark(od), Ff = bf()
                                      .mark(cd), Gf = bf()
                                        .mark(id), Bf = bf()
                                          .mark(sd), Vf = function (e) { return e.user }; function Mf(e) {
                                            var t, r, n, a, o, c, i, s; return bf()
                                              .wrap((function (u) {
                                                for (; ;)switch (u.prev = u.next) {
                                                  case 0: return u.prev = 0, t = e.data, r = t.firstTimeLogin, n = Object(ko.a)(t, vf), u.next = 4, Object(v.b)(mf.loginUser, n); case 4: return a = u.sent, o = a.data.token, c = r ? "jwt-token-password" : "jwt-token", localStorage.setItem(c, o), p.a.defaults.headers.common.Authorization = "Bearer ".concat(o), u.next = 11, Object(v.b)(pf.a.decodeToken); case 11: return i = u.sent, u.next = 14, Object(v.c)(Object(hf.t)(Object(Z.camelizeKeys)(i))); case 14: u.next = 21; break; case 16: return u.prev = 16, u.t0 = u.catch(0), s = b(u.t0), u.next = 21, Object(v.c)(Object(hf.s)(s)); case 21: case "end": return u.stop()
                                                }
                                              }), yf, null, [[0, 16]])
                                          } function Yf() {
                                            return bf()
                                              .wrap((function (e) {
                                                for (; ;)switch (e.prev = e.next) {
                                                  case 0: return e.next = 2, Object(v.f)(ju.q, Mf); case 2: case "end": return e.stop()
                                                }
                                              }), Ef)
                                          } function Kf(e) {
                                            var t, r; return bf()
                                              .wrap((function (n) {
                                                for (; ;)switch (n.prev = n.next) {
                                                  case 0: return n.prev = 0, n.next = 3, Object(v.b)(mf.loginUser, e.data); case 3: return t = n.sent, n.next = 6, Object(v.c)(Object(hf.A)(t.data)); case 6: n.next = 13; break; case 8: return n.prev = 8, n.t0 = n.catch(0), r = b(n.t0), n.next = 13, Object(v.c)(Object(hf.z)(r)); case 13: case "end": return n.stop()
                                                }
                                              }), Of, null, [[0, 8]])
                                          } function Hf() {
                                            return bf()
                                              .wrap((function (e) {
                                                for (; ;)switch (e.prev = e.next) {
                                                  case 0: return e.next = 2, Object(v.f)(ju.x, Kf); case 2: case "end": return e.stop()
                                                }
                                              }), Sf)
                                          } function zf() {
                                            return bf()
                                              .wrap((function (e) {
                                                for (; ;)switch (e.prev = e.next) {
                                                  case 0: return e.next = 2, Object(v.f)(ju.u, Kf); case 2: case "end": return e.stop()
                                                }
                                              }), jf)
                                          } function Zf(e) {
                                            var t; return bf()
                                              .wrap((function (e) {
                                                for (; ;)switch (e.prev = e.next) {
                                                  case 0: return e.prev = 0, e.next = 3, Object(v.b)(mf.getAllUsers); case 3: return t = e.sent, e.next = 6, Object(v.c)(Object(hf.n)(Object(Z.camelizeKeys)(t.data))); case 6: e.next = 10; break; case 8: e.prev = 8, e.t0 = e.catch(0); case 10: case "end": return e.stop()
                                                }
                                              }), wf, null, [[0, 8]])
                                          } function qf() {
                                            return bf()
                                              .wrap((function (e) {
                                                for (; ;)switch (e.prev = e.next) {
                                                  case 0: return e.next = 2, Object(v.f)(ju.k, Zf); case 2: case "end": return e.stop()
                                                }
                                              }), xf)
                                          } function Wf(e) {
                                            var t, r, n, a, o; return bf()
                                              .wrap((function (c) {
                                                for (; ;)switch (c.prev = c.next) {
                                                  case 0: return t = e.data, r = t.isProfile, n = Object(ko.a)(t, gf), c.prev = 1, a = Object(Z.decamelizeKeys)(n), c.next = 5, Object(v.b)(mf.changePassword, a); case 5: return c.next = 7, Object(v.c)(Object(hf.f)()
                                                  ); case 7: if (localStorage.removeItem("jwt-token-password"), !r) { c.next = 12; break } return _.a.success("Password Changed Successfully"), c.next = 12, Object(v.c)(Object(L.a)()
                                                  ); case 12: c.next = 20; break; case 14: return c.prev = 14, c.t0 = c.catch(1), o = b(c.t0), r && _.a.error(o), c.next = 20, Object(v.c)(Object(hf.e)(o)); case 20: case "end": return c.stop()
                                                }
                                              }), If, null, [[1, 14]])
                                          } function Jf() {
                                            return bf()
                                              .wrap((function (e) {
                                                for (; ;)switch (e.prev = e.next) {
                                                  case 0: return e.next = 2, Object(v.f)(ju.b, Wf); case 2: case "end": return e.stop()
                                                }
                                              }), Lf)
                                          } function Xf(e) {
                                            var t, r, n, a, o; return bf()
                                              .wrap((function (c) {
                                                for (; ;)switch (c.prev = c.next) {
                                                  case 0: return c.prev = 0, c.next = 3, Object(v.b)(mf.createUser, e.data); case 3: return t = c.sent, r = t.data, n = r.data, a = r.success, c.next = 7, Object(v.c)(Object(hf.l)(Object(Z.camelizeKeys)(n))); case 7: _.a.success(a), c.next = 15; break; case 10: return c.prev = 10, c.t0 = c.catch(0), o = b(c.t0), c.next = 15, Object(v.c)(Object(hf.k)(o)); case 15: case "end": return c.stop()
                                                }
                                              }), kf, null, [[0, 10]])
                                          } function Qf() {
                                            return bf()
                                              .wrap((function (e) {
                                                for (; ;)switch (e.prev = e.next) {
                                                  case 0: return e.next = 2, Object(v.f)(ju.f, Xf); case 2: case "end": return e.stop()
                                                }
                                              }), Cf)
                                          } function $f(e) {
                                            var t; return bf()
                                              .wrap((function (r) {
                                                for (; ;)switch (r.prev = r.next) {
                                                  case 0: return r.prev = 0, r.next = 3, Object(v.b)(mf.validateStaffId, e.data); case 3: return t = r.sent, r.next = 6, Object(v.c)(Object(hf.B)(!0)); case 6: return r.next = 8, Object(v.c)({ type: ju.j, data: t.data.data }); case 8: r.next = 14; break; case 10: return r.prev = 10, r.t0 = r.catch(0), r.next = 14, Object(v.c)(Object(hf.B)(!1)); case 14: case "end": return r.stop()
                                                }
                                              }), Nf, null, [[0, 10]])
                                          } function ed() {
                                            return bf()
                                              .wrap((function (e) {
                                                for (; ;)switch (e.prev = e.next) {
                                                  case 0: return e.next = 2, Object(v.f)(ju.D, $f); case 2: case "end": return e.stop()
                                                }
                                              }), Af)
                                          } function td(e) {
                                            var t, r, n, a, o; return bf()
                                              .wrap((function (c) {
                                                for (; ;)switch (c.prev = c.next) {
                                                  case 0: return c.prev = 0, c.next = 3, Object(v.b)(mf.addERPPortalUser, e.data); case 3: return t = c.sent, r = t.data, n = r.data, a = r.success, c.next = 7, Object(v.c)(Object(hf.c)(Object(Z.camelizeKeys)(n))); case 7: return c.next = 9, Object(v.c)(Object(L.a)()
                                                  ); case 9: _.a.success(a), c.next = 18; break; case 12: return c.prev = 12, c.t0 = c.catch(0), o = b(c.t0), _.a.error(o), c.next = 18, Object(v.c)(Object(hf.b)(o)); case 18: case "end": return c.stop()
                                                }
                                              }), Rf, null, [[0, 12]])
                                          } function rd() {
                                            return bf()
                                              .wrap((function (e) {
                                                for (; ;)switch (e.prev = e.next) {
                                                  case 0: return e.next = 2, Object(v.f)(ju.a, td); case 2: case "end": return e.stop()
                                                }
                                              }), Pf)
                                          }