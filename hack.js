(this["webpackJsonpe-construction_portal"] =
  this["webpackJsonpe-construction_portal"] || []).push([
  [30],
  {
    1148: function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return n;
      });
      var n = function (e) {
        return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
    },
    1155: function (e, t, a) {
      "use strict";
      t.a = function () {
        var e = new Date();
        return e.getMonth() + 1 <= 6
          ? e.getFullYear() - 1 + "-" + e.getFullYear()
          : e.getFullYear() + "-" + (e.getFullYear() + 1);
      };
    },
    1238: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(29),
        c = a(1296),
        l = a(291),
        r = a(1248),
        o = a(1112),
        i = a(918),
        s = a(919),
        u = a(921),
        m = a(1197),
        d = a.n(m),
        b = a(1196),
        p = a.n(b),
        h = a(0),
        f = a.n(h),
        y = a(175),
        v = a(35),
        g = a.n(v),
        E = a(87),
        _ = a(1155),
        O = a(1148),
        j = a(211);
      t.default = function () {
        var e = Object(E.b)(E.a.CORE_API),
          t = Object(h.useState)([]),
          a = Object(n.a)(t, 2),
          m = a[0],
          b = a[1],
          v = Object(h.useState)([]),
          w = Object(n.a)(v, 2),
          x = w[0],
          C = w[1],
          S = Object(h.useState)([]),
          A = Object(n.a)(S, 2),
          N = A[0],
          k = A[1],
          F = Object(h.useState)([]),
          M = Object(n.a)(F, 2),
          D = M[0],
          I = M[1],
          R = new Date(),
          Y = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ][R.getMonth()],
          J = R.getFullYear(),
          W = Object(_.a)();
        Object(h.useEffect)(function () {
          g.a
            .get("".concat(e, "/api/analytics/department_total/"))
            .then(function (e) {
              var t = e.data.results[0].department_totals;
              b(t);
            })
            .catch(function (e) {}),
            g.a
              .get("".concat(e, "/api/analytics/application_type_total/"))
              .then(function (e) {
                var t = e.data.results[0].application_type_total;
                C(t);
              })
              .catch(function (e) {}),
            g.a
              .get("".concat(e, "/api/analytics/sub_county/"))
              .then(function (e) {
                var t = e.data.results[0].sub_county;
                k(t);
              })
              .catch(function (e) {}),
            g.a
              .get("".concat(e, "/api/analytics/ward/"))
              .then(function (e) {
                var t = e.data.results[0].ward;
                I(t);
              })
              .catch(function (e) {});
        }, []);
        var K = o.a.TabPane,
          L = function () {
            return f.a.createElement(
              o.a,
              { defaultActiveKey: "1" },
              f.a.createElement(
                K,
                {
                  tab: f.a.createElement(
                    "span",
                    null,
                    f.a.createElement(c.a, null),
                    "Cumulative"
                  ),
                  key: "1",
                },
                f.a.createElement(T, null)
              ),
              f.a.createElement(
                K,
                {
                  tab: f.a.createElement(
                    "span",
                    null,
                    f.a.createElement(c.a, null),
                    "FY. ",
                    W
                  ),
                  key: "2",
                },
                f.a.createElement(P, null)
              ),
              f.a.createElement(
                K,
                {
                  tab: f.a.createElement(
                    "span",
                    null,
                    f.a.createElement(l.a, null),
                    Y,
                    ", ",
                    J
                  ),
                  key: "3",
                },
                f.a.createElement(P, null)
              )
            );
          },
          P = function () {
            return f.a.createElement(
              f.a.Fragment,
              null,
              f.a.createElement(
                i.a,
                {
                  gutter: { xs: 8, sm: 16, md: 24, lg: 32 },
                  style: {
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  },
                },
                f.a.createElement(
                  s.a,
                  {
                    className: "gutter-row",
                    span: 12,
                    style: {
                      height: "500px",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    },
                  },
                  f.a.createElement(
                    "span",
                    { style: { fontSize: "26px" } },
                    "Coming Soon"
                  )
                )
              )
            );
          },
          T = function () {
            return f.a.createElement(
              f.a.Fragment,
              null,
              f.a.createElement(
                i.a,
                { gutter: { xs: 8, sm: 16, md: 24, lg: 32 } },
                f.a.createElement(
                  s.a,
                  { className: "gutter-row", span: 12 },
                  f.a.createElement(
                    u.a,
                    { dataSource: x },
                    f.a.createElement(
                      p.a,
                      {
                        title: "Application Type Performance Analysis",
                        className: "fw-bold",
                      },
                      f.a.createElement(d.a, {
                        title: "Application Type",
                        dataIndex: "application_submission__type__name",
                        key: "application_submission__type__name",
                      }),
                      f.a.createElement(d.a, {
                        title: "Approvals",
                        dataIndex: "count",
                        key: "count",
                        render: function (e) {
                          return "".concat(Object(j.a)(e));
                        },
                      }),
                      f.a.createElement(d.a, {
                        title: "Amount",
                        dataIndex: "total",
                        key: "total",
                        render: function (e) {
                          return "KES. ".concat(Object(O.a)(e));
                        },
                      })
                    )
                  )
                ),
                f.a.createElement(
                  s.a,
                  { className: "gutter-row", span: 12 },
                  f.a.createElement(
                    u.a,
                    { dataSource: m, bordered: !0 },
                    f.a.createElement(
                      p.a,
                      {
                        title: "Departmental Cumulative Performance",
                        className: "fw-bold",
                      },
                      f.a.createElement(d.a, {
                        title: "Department",
                        dataIndex:
                          "application_submission__type__department__name",
                        key: "application_submission__type__department__name",
                      }),
                      f.a.createElement(d.a, {
                        title: "Approvals",
                        dataIndex: "count",
                        key: "count",
                        render: function (e) {
                          return "".concat(Object(j.a)(e));
                        },
                      }),
                      f.a.createElement(d.a, {
                        title: "Amount",
                        dataIndex: "total",
                        key: "total",
                        render: function (e) {
                          return "KES. ".concat(Object(O.a)(e));
                        },
                      })
                    )
                  )
                )
              ),
              f.a.createElement(
                i.a,
                { gutter: { xs: 8, sm: 16, md: 24, lg: 32 } },
                f.a.createElement(
                  s.a,
                  { className: "gutter-row", span: 12 },
                  f.a.createElement(
                    u.a,
                    { dataSource: N },
                    f.a.createElement(
                      p.a,
                      {
                        title: "Subcounties Performance Analysis",
                        className: "fw-bold",
                      },
                      f.a.createElement(d.a, {
                        title: "Sub-County",
                        dataIndex: "application_submission__sub_county",
                        key: "application_submission__sub_county",
                      }),
                      f.a.createElement(d.a, {
                        title: "Approvals",
                        dataIndex: "count",
                        key: "count",
                        render: function (e) {
                          return "".concat(Object(j.a)(e));
                        },
                      }),
                      f.a.createElement(d.a, {
                        title: "Amount",
                        dataIndex: "total",
                        key: "total",
                        render: function (e) {
                          return "KES. ".concat(Object(O.a)(e));
                        },
                      })
                    )
                  )
                ),
                f.a.createElement(
                  s.a,
                  { className: "gutter-row", span: 12 },
                  f.a.createElement(
                    u.a,
                    { dataSource: D },
                    f.a.createElement(
                      p.a,
                      {
                        title: "Wards Performance Analysis",
                        className: "fw-bold",
                      },
                      f.a.createElement(d.a, {
                        title: "Ward",
                        dataIndex: "application_submission__ward",
                        key: "application_submission__ward",
                      }),
                      f.a.createElement(d.a, {
                        title: "Approvals",
                        dataIndex: "count",
                        key: "count",
                        render: function (e) {
                          return "".concat(Object(j.a)(e));
                        },
                      }),
                      f.a.createElement(d.a, {
                        title: "Amount",
                        dataIndex: "total",
                        key: "total",
                        render: function (e) {
                          return "KES. ".concat(Object(O.a)(e));
                        },
                      })
                    )
                  )
                )
              )
            );
          };
        return f.a.createElement(
          f.a.Fragment,
          null,
          f.a.createElement(
            i.a,
            { className: "page" },
            f.a.createElement(y.i, {
              name: "Application Reports",
              text: "View and Filter Application Reports",
              Icon: r.a,
            }),
            f.a.createElement(
              "div",
              { className: "topHeader", style: { marginTop: "15px" } },
              f.a.createElement(
                o.a,
                { defaultActiveKey: "1" },
                f.a.createElement(
                  K,
                  { tab: "Revenue Reports", key: "1" },
                  f.a.createElement(L, null)
                )
              )
            )
          )
        );
      };
    },
    1289: function (e, t, a) {},
    1290: function (e, t, a) {},
    1330: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(29),
        c = a(0),
        l = a.n(c),
        r = a(1148),
        o = a(922),
        i = a(918),
        s = a(919),
        u = a(1116),
        m = a(945),
        d = (a(1289), a(1290), a(1239)),
        b = a.n(d),
        p = a(1155),
        h = (new Date().getFullYear(), Object(p.a)()),
        f = {
          series: [{ name: "Monthly Revenue", data: [], color: "#363" }],
          options: {
            title: { text: "Monthly Revenues for FY. ".concat(h) },
            chart: {
              type: "bar",
              width: "100%",
              height: "auto",
              toolbar: { show: !1 },
            },
            plotOptions: {
              bar: { horizontal: !1, columnWidth: "90%", borderRadius: 5 },
            },
            dataLabels: { enabled: !1 },
            stroke: { show: !0, width: 1, colors: ["transparent"] },
            grid: { show: !0, borderColor: "#ccc", strokeDashArray: 2 },
            xaxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              labels: {
                show: !0,
                align: "right",
                minWidth: 0,
                maxWidth: 160,
                style: {
                  colors: [
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                  ],
                },
              },
            },
            yaxis: {
              labels: {
                show: !0,
                align: "right",
                minWidth: 0,
                maxWidth: 2e8,
                style: {
                  colors: [
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                  ],
                },
              },
            },
            tooltip: {
              y: {
                formatter: function (e) {
                  return "KSh " + e;
                },
              },
            },
          },
        };
      var y = function (e) {
          var t = e.data;
          return l.a.createElement(
            l.a.Fragment,
            null,
            l.a.createElement(
              "div",
              { id: "chart" },
              l.a.createElement(b.a, {
                className: "bar-chart",
                options: f.options,
                series: [{ name: "Monthly Revenue", data: t, color: "#363" }],
                type: "bar",
                height: 360,
              })
            )
          );
        },
        v = (new Date().getFullYear(), Object(p.a)()),
        g = {
          series: [
            {
              name: "Submissions",
              data: [
                7e3, 4e3, 8e3, 2e3, 9e3, 3e3, 8e3, 3200, 1e4, 6e3, 12e3, 6e3,
              ],
              color: "#d3b83e",
            },
            {
              name: "Approvals",
              data: [
                4500, 1750, 4700, 1750, 7e3, 2200, 6700, 2760, 8e3, 4500, 9e3,
                5800,
              ],
              color: "#363",
            },
          ],
          options: {
            title: {
              text: "Monthly Applications Submissions & Approvals for FY. ".concat(
                v
              ),
            },
            chart: {
              type: "bar",
              width: "100%",
              height: "auto",
              toolbar: { show: !1 },
            },
            plotOptions: {
              bar: { horizontal: !1, columnWidth: "90%", borderRadius: 5 },
            },
            dataLabels: { enabled: !1 },
            stroke: { show: !0, width: 1, colors: ["transparent"] },
            grid: { show: !0, borderColor: "#ccc", strokeDashArray: 2 },
            xaxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              labels: {
                show: !0,
                align: "right",
                minWidth: 0,
                maxWidth: 160,
                style: {
                  colors: [
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                  ],
                },
              },
            },
            yaxis: {
              labels: {
                show: !0,
                align: "right",
                minWidth: 0,
                maxWidth: 2e8,
                style: {
                  colors: [
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                    "#000",
                  ],
                },
              },
            },
            tooltip: {
              y: {
                formatter: function (e) {
                  return e;
                },
              },
            },
          },
        };
      var E = function (e) {
          return (
            e.data,
            l.a.createElement(
              l.a.Fragment,
              null,
              l.a.createElement(
                "div",
                { id: "chart2" },
                l.a.createElement(b.a, {
                  className: "bar-chart",
                  options: g.options,
                  series: g.series,
                  type: "bar",
                  height: 360,
                })
              )
            )
          );
        },
        _ = a(1238),
        O = a(175),
        j = a(35),
        w = a.n(j),
        x = a(87),
        C = a(211);
      t.default = function () {
        var e = Object(x.b)(x.a.CORE_API),
          t = Object(c.useState)(""),
          a = Object(n.a)(t, 2),
          d = a[0],
          b = a[1],
          h = Object(c.useState)(""),
          f = Object(n.a)(h, 2),
          v = f[0],
          g = f[1],
          j = Object(c.useState)(""),
          S = Object(n.a)(j, 2),
          A = S[0],
          N = S[1],
          k = Object(c.useState)(""),
          F = Object(n.a)(k, 2),
          M = F[0],
          D = F[1],
          I = Object(c.useState)(""),
          R = Object(n.a)(I, 2),
          Y = R[0],
          J = R[1],
          W = Object(c.useState)(""),
          K = Object(n.a)(W, 2),
          L = K[0],
          P = K[1],
          T = Object(c.useState)(""),
          z = Object(n.a)(T, 2),
          Z = z[0],
          V = z[1],
          B = Object(c.useState)(""),
          H = Object(n.a)(B, 2),
          q = H[0],
          G = H[1],
          Q = Object(c.useState)(""),
          U = Object(n.a)(Q, 2),
          X = U[0],
          $ = U[1],
          ee = Object(c.useState)([]),
          te = Object(n.a)(ee, 2),
          ae = te[0],
          ne = te[1],
          ce = new Date(),
          le = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ][ce.getMonth()],
          re = ce.getFullYear(),
          oe = Object(p.a)(),
          ie = o.a.Title,
          se =
            (o.a.Text,
            [
              l.a.createElement(
                "svg",
                {
                  width: "22",
                  height: "22",
                  viewBox: "0 0 20 20",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  key: 0,
                },
                l.a.createElement("path", {
                  d: "M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z",
                  fill: "#fff",
                }),
                l.a.createElement("path", {
                  d: "M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z",
                  fill: "#fff",
                }),
                l.a.createElement("path", {
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                  d: "M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z",
                  fill: "#fff",
                })
              ),
            ]),
          ue = [
            {
              label: "Today\u2019s Revenue",
              title: "KES ".concat(Object(r.a)(Number(L))),
              icon: se,
              bnb: "bnb2",
            },
            {
              label: "".concat(le, " ").concat(re, " Revenue"),
              title: "KES ".concat(Object(r.a)(Number(Z))),
              icon: se,
              bnb: "redtext",
            },
            {
              label: "FY. ".concat(oe, " Revenue"),
              title: "KES ".concat(Object(r.a)(Number(q))),
              icon: se,
              bnb: "redtext",
            },
            {
              label: "Cumulative Revenue",
              title: "KES ".concat(Object(r.a)(Number(X))),
              icon: se,
            },
          ],
          me = [
            { label: "Draft Submissions", title: Object(C.a)(d) },
            { label: "Today's New  Applications", title: Object(C.a)(v) },
            {
              label: "".concat(le, " ").concat(re, " New  Applications"),
              title: Object(C.a)(A),
            },
            {
              label: "FY. ".concat(oe, " New  Applications"),
              title: Object(C.a)(M),
            },
            { label: "Cumulative applications", title: Object(C.a)(Y) },
          ];
        return (
          Object(c.useEffect)(function () {
            w.a
              .get("".concat(e, "/api/analytics/draft/"))
              .then(function (e) {
                var t;
                b(
                  null === (t = e.data.results[0]) || void 0 === t
                    ? void 0
                    : t.draft_submission
                );
              })
              .catch(function (e) {}),
              w.a
                .get("".concat(e, "/api/analytics/today_submission/"))
                .then(function (e) {
                  var t;
                  g(
                    null === (t = e.data.results[0]) || void 0 === t
                      ? void 0
                      : t.today_submissions
                  );
                })
                .catch(function (e) {}),
              w.a
                .get("".concat(e, "/api/analytics/monthly_submission/"))
                .then(function (e) {
                  var t;
                  N(
                    null === (t = e.data.results[0]) || void 0 === t
                      ? void 0
                      : t.monthly_submissions
                  );
                })
                .catch(function (e) {}),
              w.a
                .get("".concat(e, "/api/analytics/yearly_submission/"))
                .then(function (e) {
                  var t;
                  D(
                    null === (t = e.data.results[0]) || void 0 === t
                      ? void 0
                      : t.yearly_submissions[0]
                  );
                })
                .catch(function (e) {}),
              w.a
                .get("".concat(e, "/api/analytics/cumulative_submission/"))
                .then(function (e) {
                  var t;
                  J(
                    null === (t = e.data.results[0]) || void 0 === t
                      ? void 0
                      : t.cumulative_submissions
                  );
                })
                .catch(function (e) {}),
              w.a
                .get("".concat(e, "/api/analytics/today_revenue/"))
                .then(function (e) {
                  var t;
                  P(
                    null === (t = e.data.results[0]) || void 0 === t
                      ? void 0
                      : t.today_amount
                  );
                })
                .catch(function (e) {}),
              w.a
                .get("".concat(e, "/api/analytics/monthly_revenue/"))
                .then(function (e) {
                  var t;
                  V(
                    null === (t = e.data.results[0]) || void 0 === t
                      ? void 0
                      : t.monthly_revenue
                  );
                })
                .catch(function (e) {}),
              w.a
                .get("".concat(e, "/api/analytics/yearly_revenue/"))
                .then(function (e) {
                  var t;
                  G(
                    null === (t = e.data.results[0]) || void 0 === t
                      ? void 0
                      : t.yearly_revenue
                  );
                })
                .catch(function (e) {}),
              w.a
                .get("".concat(e, "/api/analytics/cumulative_revenue/"))
                .then(function (e) {
                  var t;
                  $(
                    null === (t = e.data.results[0]) || void 0 === t
                      ? void 0
                      : t.cumulative_amount
                  );
                })
                .catch(function (e) {}),
              w.a
                .get("".concat(e, "/api/analytics/graph_monthly/"))
                .then(function (e) {
                  var t = e.data.results[0].monthly_income.filter(function (e) {
                      return (
                        new Date(
                          null === e || void 0 === e ? void 0 : e.month
                        ).getFullYear() === new Date().getFullYear()
                      );
                    }),
                    a = [];
                  t.sort(function (e, t) {
                    return (
                      (null === e || void 0 === e ? void 0 : e.month) -
                      (null === t || void 0 === t ? void 0 : t.month)
                    );
                  });
                  for (
                    var n = function (e) {
                        if (
                          t.some(function (t) {
                            return (
                              new Date(
                                null === t || void 0 === t ? void 0 : t.month
                              ).getMonth() === e
                            );
                          })
                        ) {
                          var n = t.findIndex(function (t) {
                            return (
                              new Date(
                                null === t || void 0 === t ? void 0 : t.month
                              ).getMonth() === e
                            );
                          });
                          a.push(t[n].total_income);
                        } else a.push(0);
                      },
                      c = 0;
                    c < 12;
                    c++
                  )
                    n(c);
                  ne(a);
                })
                .catch(function (e) {});
          }, []),
          l.a.createElement(
            i.a,
            { className: "page" },
            l.a.createElement(O.i, {
              name: "Dashboard & Statistics",
              text: "NPDMS Management System",
              Icon: m.a,
            }),
            l.a.createElement(
              "div",
              { className: "pageContainer" },
              l.a.createElement(
                i.a,
                { className: "rowgap-vbox", gutter: [24, 0] },
                ue.map(function (e, t) {
                  return l.a.createElement(
                    s.a,
                    {
                      key: t,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 6,
                      xl: 6,
                      className: "mb-24",
                    },
                    l.a.createElement(
                      u.a,
                      { bordered: !1, className: "criclebox" },
                      l.a.createElement(
                        "div",
                        {
                          className: "number",
                          style: {
                            textAlign: "center",
                            color: "white",
                            background: "#46944c",
                          },
                        },
                        l.a.createElement(
                          i.a,
                          { align: "middle", gutter: [24, 0] },
                          l.a.createElement(
                            s.a,
                            { xs: 24 },
                            l.a.createElement("span", null, e.label),
                            l.a.createElement(
                              ie,
                              {
                                level: 1,
                                style: {
                                  color: "white",
                                  fontSize: "2rem",
                                  fontWeight: "bolder",
                                },
                              },
                              e.title
                            )
                          )
                        )
                      )
                    )
                  );
                })
              ),
              l.a.createElement(
                i.a,
                {
                  gutter: [24, 0],
                  style: { color: "#000000", justifyContent: "center" },
                },
                me.map(function (e, t) {
                  return l.a.createElement(
                    s.a,
                    {
                      key: t,
                      className: "mb-24 md: flex justify-between fw-bold",
                    },
                    l.a.createElement(
                      u.a,
                      { bordered: !1, className: "criclebox" },
                      l.a.createElement(
                        i.a,
                        {
                          gutter: [24, 0],
                          className: "number",
                          style: { width: "250px" },
                        },
                        l.a.createElement(
                          "div",
                          {
                            style: {
                              verticalAlign: "middle",
                              display: "flex-column",
                              color: "#000000",
                              textAlign: "center",
                              justifyContent: "center",
                              width: "100%",
                            },
                          },
                          l.a.createElement("span", null, e.label),
                          " ",
                          l.a.createElement(ie, { level: 4 }, " ", e.title)
                        )
                      )
                    )
                  );
                })
              ),
              l.a.createElement(
                i.a,
                { gutter: [24, 0] },
                l.a.createElement(
                  s.a,
                  { xs: 24, sm: 24, md: 12, lg: 12, xl: 10 },
                  l.a.createElement(y, { data: ae })
                ),
                l.a.createElement(
                  s.a,
                  {
                    xs: 24,
                    sm: 24,
                    md: 12,
                    lg: 12,
                    xl: 14,
                    className: "mb-24",
                  },
                  l.a.createElement(E, { data: [] })
                )
              ),
              l.a.createElement(_.default, null)
            )
          )
        );
      };
    },
  },
]);
