(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[499], {
  1865: function (e, t, n) {
    (window.__NEXT_P = window.__NEXT_P || []).push(["/get_card", function () {
      return n(7785)
    }])
  }, 7785: function (e, t, n) {
    "use strict";
    n.r(t);

    var a = n(3842), s = n(9722), r = n(169), o = n(5230), l = n.n(o), i = n(4246), c = (n(7378), n(6677)), d = n(9894), u = n.n(d), m = n(8039);
    n(1263);
    t.default = function () {
      (0, c.useRouter)();

      var e = (0, m.cI)(), t = e.register, n = e.handleSubmit, o = e.formState.errors;
      console.log(o);

      var d = function () {
        var e = (0, a.Z)(l().mark((function e(t) {
          var n, a, s, r, o, i, c;
          return l().wrap((function (e) {
            for (;
              ;
            )switch (e.prev = e.next) {
              case 0: return console.log(t), "https://dev.evopay.africa:8443/api/v1/auth/", n = "https://dev.evopay.africa:9443/stk/register", "https://dev.evopay.africa:9443/stk/top-up", a = "https://dev.evopay.africa:8443/api/v1/parking/pmvc/", e.next = 7, fetch("https://dev.evopay.africa:8443/api/v1/auth/", {
                method: "POST", headers: {
                  "Content-Type": "application/json", "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Origin": "https://dev.evopay.africa"
                }, body: JSON.stringify({
                  username: "mvc@evogroup.africa", password: "evopay.2022!"
                })
              }).then((function (e) {
                return e.json()
              })).catch((function (e) {
                return console.log(e)
              }));
              case 7: return s = e.sent, console.log(s), e.next = 11, fetch(n, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json", "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Origin": "https://dev.evopay.africa",
                  Authorization: "".concat(s.authenticationToken)
                },
                body: JSON.stringify({
                  amount: 1, phoneNumber: t.phone, siteId: "9663", cardNo: "PK0300010045"
                })
              }).then((function (e) {
                return e.json()
              })).catch((function (e) {
                return console.log(e)
              }));
              case 11: return r = e.sent, console.log(r), e.next = 15, fetch(a + t.card, {
                method: "GET", headers: {
                  "Content-Type": "application/json", "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Origin": "https://dev.evopay.africa", Authorization: "".concat(s.authenticationToken)
                }
              }).then((function (e) {
                return e.json()
              })).catch((function (e) {
                return console.log(e)
              }));
              case 15: return o = e.sent, console.log(o), o.firstName = t.first_name, o.lastName = t.last_name, o.phoneNumber = t.phone, o.email = t.email, o.idNo = t.id_passport, e.next = 24, fetch(a + "update/" + t.card, {
                method: "PUT", headers: {
                  "Content-Type": "application/json", "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Origin": "https://dev.evopay.africa", Authorization: "".concat(s.authenticationToken)
                }, body: JSON.stringify(o)
              }).then((function (e) {
                return e.json()
              })).catch((function (e) {
                return console.log(e)
              }));
              case 24: return i = e.sent, console.log(i), e.next = 28, fetch(a + "activate/" + t.card, {
                method: "PUT", headers: {
                  "Content-Type": "application/json", "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Origin": "https://dev.evopay.africa", Authorization: "".concat(s.authenticationToken)
                }, body: JSON.stringify(o)
              }).then((function (e) {
                return e.json()
              })).catch((function (e) {
                return console.log(e)
              }));
              case 28: c = e.sent, console.log(c);
              case 30: case "end": return e.stop()
            }
          }), e)
        })));
        return function (t) {
          return e.apply(this, arguments)
        }
      }();
      return (0, i.jsxs)("div", {
        className: "min-h-screen bg-white flex", children: [(0, i.jsx)("div", {
          className: "flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24", children: (0, i.jsxs)("div", {
            className: "mx-auto w-full max-w-sm", children: [(0, i.jsxs)("div", {
              className: "text-center border-b pb-8", children: [(0, i.jsx)("img", {
                className: "mx-auto h-12 w-auto", src: "/favicon.png", alt: "Evopay"
              }), (0, i.jsx)("h2", {
                className: "mt-6 text-3xl leading-9 font-extrabold text-gray-900 text-center", children: "Get Card"
              })]
            }), (0, i.jsx)("div", {
              className: "mt-8", children: (0, i.jsxs)("div", {
                className: "mt-4", children: [(0, i.jsxs)("form", {
                  onSubmit: n(d), children: [(0, i.jsxs)("div", {
                    children: [(0, i.jsx)("label", {
                      htmlFor: "first_name", className: "block text-sm font-medium leading-5 text-gray-700", children: "First Name"
                    }), (0, i.jsx)("div", {
                      className: "mt-1 rounded-md shadow-sm", children: (0, i.jsx)("input", (0, r.Z)((0, s.Z)({
                      }, t("first_name", {
                        required: !0
                      })), {
                        name: "first_name", placeholder: "First Name", type: "text", required: !0, className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      }))
                    }), o.first_name && (0, i.jsxs)("div", {
                      className: "bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded relative", role: "alert", children: [(0, i.jsx)("strong", {
                        className: "font-bold", children: "An Error Occurred. "
                      }), (0, i.jsx)("span", {
                        className: "block sm:inline", children: "Please put in the correct details."
                      })]
                    })]
                  }), (0, i.jsxs)("div", {
                    children: [(0, i.jsx)("label", {
                      htmlFor: "last_name", className: "block text-sm font-medium leading-5 text-gray-700", children: "Last Name"
                    }), (0, i.jsx)("div", {
                      className: "mt-1 rounded-md shadow-sm", children: (0, i.jsx)("input", (0, r.Z)((0, s.Z)({
                      }, t("last_name", {
                        required: !0
                      })), {
                        name: "last_name", placeholder: "Last Name", type: "text", required: !0, className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      }))
                    })]
                  }), (0, i.jsxs)("div", {
                    children: [(0, i.jsx)("label", {
                      htmlFor: "id_passport", className: "block text-sm font-medium leading-5 text-gray-700", children: "ID/Passport Number"
                    }), (0, i.jsx)("div", {
                      className: "mt-1 rounded-md shadow-sm", children: (0, i.jsx)("input", (0, r.Z)((0, s.Z)({
                      }, t("id_passport", {
                        required: !0
                      })), {
                        name: "id_passport", placeholder: "ID/Passport Number", type: "text", required: !0, className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      }))
                    })]
                  }), (0, i.jsxs)("div", {
                    children: [(0, i.jsx)("label", {
                      htmlFor: "phone", className: "block text-sm font-medium leading-5 text-gray-700", children: "Phone Number"
                    }), (0, i.jsx)("div", {
                      className: "mt-1 rounded-md shadow-sm", children: (0, i.jsx)("input", (0, r.Z)((0, s.Z)({
                      }, t("phone", {
                        required: !0, pattern: /^(?:254|\+254|0)?((?:(?:7(?:(?:[01249][0-9])|(?:5[789])|(?:6[89])))|(?:1(?:[1][0-5])))[0-9]{6})$/
                      })), {
                        name: "phone", placeholder: "Phone Number", type: "tel", required: !0, className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      }))
                    })]
                  }), (0, i.jsxs)("div", {
                    children: [(0, i.jsx)("label", {
                      htmlFor: "card", className: "block text-sm font-medium leading-5 text-gray-700", children: "Card Number"
                    }), (0, i.jsx)("div", {
                      className: "mt-1 rounded-md shadow-sm", children: (0, i.jsx)("input", (0, r.Z)((0, s.Z)({
                      }, t("card", {
                        required: !0
                      })), {
                        name: "card", placeholder: "Card Number", type: "text", required: !0, className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      }))
                    })]
                  }), (0, i.jsxs)("div", {
                    children: [(0, i.jsx)("label", {
                      htmlFor: "email", className: "block text-sm font-medium leading-5 text-gray-700", children: "Email Address"
                    }), (0, i.jsx)("div", {
                      className: "mt-1 rounded-md shadow-sm", children: (0, i.jsx)("input", (0, r.Z)((0, s.Z)({
                      }, t("email", {
                        required: !0
                      })), {
                        name: "email", placeholder: "Email Address", type: "email", required: !0, className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      }))
                    })]
                  }), (0, i.jsx)("div", {
                    className: "mt-6 flex items-center justify-between", children: (0, i.jsxs)("div", {
                      className: "flex items-center", children: [(0, i.jsx)("input", (0, r.Z)((0, s.Z)({
                      }, t("terms_conditions", {
                        required: !0
                      })), {
                        type: "checkbox", name: "terms_conditions", className: "form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      })), (0, i.jsxs)("label", {
                        htmlFor: "terms_conditions", className: "ml-2 block text-sm leading-5 text-gray-900", children: ["I have read and agree to the ", (0, i.jsx)(u(), {
                          href: "/terms", children: (0, i.jsx)("a", {
                            className: "text-indigo-800", href: "", children: "Terms and Conditions"
                          })
                        })]
                      })]
                    })
                  }), (0, i.jsx)("div", {
                    className: "mt-6 mb-6", children: (0, i.jsx)("span", {
                      className: "block w-full rounded-md shadow-sm", children: (0, i.jsx)("button", {
                        type: "submit", className: "w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out", children: "Submit"
                      })
                    })
                  })]
                }), (0, i.jsxs)("div", {
                  className: "", children: [(0, i.jsx)("h3", {
                    className: "font-bold uppercase", children: "Participating Sites:"
                  }), (0, i.jsx)("p", {
                    children: "The Junction Mall, Westgate Mall, Garden City Mall, Sameer Business Park, T-Mall, The Nairobi Hospital, TRM, The Oval, The Hub Karen, Holy Family Basilica, Sarit Centre & Yaya Centre"
                  })]
                })]
              })
            })]
          })
        }), (0, i.jsx)("div", {
          className: "hidden lg:block relative w-0 flex-1", children: (0, i.jsx)("img", {
            className: "absolute inset-0 h-full w-full object-cover", src: "/bg-orange.jpg", alt: ""
          })
        })]
      })
    }
  }
}, function (e) {
  e.O(0, [78, 197, 774, 888, 179], (function () {
    return t = 1865, e(e.s = t);

    var t
  }));

  var t = e.O();
  _N_E = t
}]);
