cbx.ns("cbx.form.listeners");
canvas.env.options.form.errorLblPosition = "bottom";
CWEH.registerHandler(
  "MOBILE_TRANSFER_MPESA_APP",
  CWEC.AFTER_TEMPLATE_LOAD,
  function (a) {
    checkModuleStatus("CRMOB").then(
      function (c) {
        if (c.MODULE_STATUS == 1) {
          CBXDOWNLOADMGR.requestScripts(
            cbx.downloadProvider.getMergedArray(["FORM_CONTAINER"]),
            function () {
              var e = new cbx.form.FormManager({
                formId: "PMNTDET",
                extraParams: { APP_ID: "CRMOB" },
              });
              var d = {};
              d.appWidget = "MOBILE_TRANSFER_MPESA_APP";
              d.formConRenderType = "APP";
              CBXFORMCONTAINER.getWindowByFormObj(e, "COOP_SEND_MPESA_PMNT", d);
            }
          );
        } else {
          var b = new canvas.Dialog({
            title: "NOTE",
            dialogType: "MESSAGE",
            message: c.DISPLAY_MSG,
            okHandler: function (d) {
              if (b) {
                b.close();
                canvas.launch({ workspaceId: "COOP_FUND_TRANSFER_WS" });
              } else {
                arguments[0].close();
              }
            },
          });
          b.show();
        }
      },
      function (b) {}
    );
  }
);
cbx.form.listeners.COOP_MPESA_PAYMENT_DETAILS = Class(cbx.Observable, {
  constructor: function (a) {
    this.fm = a.fm;
  },
  registerHandlers: function () {
    this.fm.registerHandler("cbxpreinitialize", function (c, b) {
      if (ct.isDefined(ct.MpesaBeneObj) && !ct.isEmpty(ct.MpesaBeneObj)) {
        c.model.setValue(
          "MPESA_BEN_MSISDN",
          ct.MpesaBeneObj.BENEFICIARY_ACC_NO
        );
        c.setEnabledFields(["MOBILE_RADIO"], false);
        ct.MpesaBeneObj = {};
      } else {
        if (ct.isDefined(ct.quickmPesaObj) && !ct.isEmpty(ct.quickmPesaObj)) {
          c.model.setValue("MPESA_BEN_MSISDN", ct.quickmPesaObj.acc_no);
          c.model.setValue("AMOUNT", ct.quickmPesaObj.ref_no);
          c.setEnabledFields(["MOBILE_RADIO"], false);
          ct.quickmPesaObj = {};
        }
      }
    });
    this.fm.registerHandler("cbxclick", "B2C_BACK1", function (c, b, e, d) {
      canvas.launch({ workspaceId: "COOP_FUND_TRANSFER_WS" });
    });
    this.fm.registerHandler("cbxclick", "B2C_BACK2", function (c, b, e, d) {
      canvas.launch({ workspaceId: "COOP_FUND_TRANSFER_WS" });
    });
    var a = this;
    this.fm.registerHandler("cbxchange", "MOBILE_RADIO", function (c, b, g, d) {
      var f = d;
      if (f == "myNumber") {
        if (ct.systempreferences.isHybrid()) {
          $(".btn_pick_contact").hide();
        }
        var e = {
          INPUT_ACTION: "COOP_GET_MOBNUM",
          INPUT_FUNCTION_CODE: "CRMOB",
          INPUT_LANGUAGE_ID: iportal.preferences.getPrimaryLang(),
          INPUT_PRODUCT: "ACCSVS",
          INPUT_SUB_PRODUCT: "ACCTXN",
          PAGE_CODE_TYPE: "STRAN",
          PRODUCT_NAME: "ACCSVS",
          CUST_NO: d,
        };
        cbx.ajax({
          params: e,
          success: function (h, i) {
            var l = h;
            var k = l.ALL_RECORDS;
            var j = k.MSISDN;
            a.fm.model.setValue("MPESA_BEN_MSISDN", j);
            a.fm.setEnabledFields(["MPESA_BEN_MSISDN"], false);
          },
          failure: function (h, i) {
            var j = new iportal.Dialog({
              title: "MESSAGE",
              dialogType: "MESSAGE",
              message: rb.MSG_REC_FND,
              okHandler: function () {
                if (j) {
                  j.close();
                } else {
                  arguments[0].close();
                }
              },
            }).show();
          },
          scope: this,
        });
      } else {
        if (ct.systempreferences.isHybrid()) {
          $(".btn_pick_contact").show();
        }
        a.fm.model.setValue("MPESA_BEN_MSISDN", "");
        a.fm.setEnabledFields(["MPESA_BEN_MSISDN"], true);
      }
    });
    this.fm.registerHandler(
      "cbxchange",
      "DEBIT_ACCOUNT",
      function (c, b, f, d) {
        if (d != null && d != undefined && d.trim() != "") {
          var e = {
            INPUT_ACTION: "COOP_ACCOUNT_DETAIL",
            INPUT_FUNCTION_CODE: "COMM",
            INPUT_LANGUAGE_ID: iportal.preferences.getPrimaryLang(),
            INPUT_PRODUCT: "ACCSVS",
            INPUT_SUB_PRODUCT: "ACCTXN",
            PAGE_CODE_TYPE: "STRAN",
            PRODUCT_NAME: "ACCSVS",
            DEBIT_ACCOUNT: d,
          };
          cbx.ajax({
            params: e,
            success: function (h, j) {
              var n = h;
              var m = n.ALL_RECORDS;
              var g = m.ACCOUNT_AVAIL_BAL;
              var l = m.ACCOUNT_CURRENCY;
              var i = m.BRANCH_CODE;
              var k = m.INPUT_ACCOUNT_TYPE;
              ct.mpesaAccountID = c.model.getValue("DEBIT_ACCOUNT_DISP_VAL");
              c.model.setValue("AVAIL_BALANCE", g);
              c.model.setValue(
                "AVAIL_BALANCE_LBL",
                numberWithCommas(parseFloat(g).toFixed(2)) + " " + l
              );
              c.model.setValue("CURRENCY", l);
              c.model.setValue("BRANCH_CODE", i);
              c.model.setValue("INPUT_ACCOUNT_TYPE", k);
              c.model.setValue("DEBIT_ACC_NAME", m.ACC_NAME);
            },
            failure: function (g, h) {
              var i = new iportal.Dialog({
                title: "MESSAGE",
                dialogType: "MESSAGE",
                message: rb.MSG_REC_FND,
                okHandler: function () {
                  if (i) {
                    i.close();
                  } else {
                    arguments[0].close();
                  }
                },
              }).show();
            },
            scope: this,
          });
        }
      }
    );
    this.fm.registerHandler("cbxpostformrender", function (b) {
      if (ct.systempreferences.isHybrid()) {
        $("#PMNTDET-MPESA_BEN_MSISDN").after(
          "<button type='button' class='btn_pick_contact' onclick='pickContact()'>CNTCT</button>"
        );
        $(".btn_pick_contact").hide();
        document.addEventListener("populateContactField", function (c) {
          b.model.setValue("MPESA_BEN_MSISDN", c.detail);
        });
      }
    });
  },
});
CFLR.registerListener("PMNTDET", cbx.form.listeners.COOP_MPESA_PAYMENT_DETAILS);
var finalFormData = null;
CABR.registerHandler("NEXT", "COOP_SEND_MPESA_SUMMARY_CONTAINER", function (a) {
  new cbx.formcontainer.defaultActionBtnHandler(a);
});
CABR.registerHandler("NEXT", "COOP_SEND_MPESA_PMNT", function (a) {
  var b = a.formObj;
  b.model.setValue("INPUT_DEBIT_CURRENCY", b.model.md.CURRENCY);
  b.model.setValue("PAYMENT_AMOUNT", b.model.md.AMOUNT);
  b.model.setValue("DEBIT_ACC_NO", b.model.md.DEBIT_ACCOUNT);
  b.model.setValue("TRANSFER_CURRENCY", b.model.md.CURRENCY);
  b.model.setValue("DEBIT_CURRENCY", b.model.md.CURRENCY);
  b.model.setValue("CREDIT_CURRENCY", b.model.md.CURRENCY);
  b.model.setValue("NARRATION", b.model.md.NARRATION);
  commonBalanceAndLimitValidation(
    b,
    "CRMOB",
    "CRMOB_V",
    "ACCSVS",
    "ACCTXN",
    "STRAN"
  ).then(function (d) {
    var c = b.model.md.dataContinue || "";
    if (!ct.isEmpty(c) && ct.stringToBoolean(c)) {
      cbx.form.listeners.getMpesaChargesPromise(b).then(function (e) {
        if (
          typeof b.model.getValue("MPESA_BEN_MSISDN") != "undefined" &&
          b.model.getValue("MPESA_BEN_MSISDN") != ""
        ) {
          var f = {
            INPUT_ACTION: "VALIDATE_DETAILS",
            INPUT_FUNCTION_CODE: "COMM",
            INPUT_LANGUAGE_ID: iportal.preferences.getPrimaryLang(),
            INPUT_PRODUCT: "ACCSVS",
            INPUT_SUB_PRODUCT: "ACCTXN",
            PAGE_CODE_TYPE: "STRAN",
            PRODUCT_NAME: "ACCSVS",
            MPESA_BEN_MSISDN: b.model.getValue("MPESA_BEN_MSISDN"),
          };
          cbx.ajax({
            params: f,
            success: function (h, i) {
              var l = h.MSISDN_RESULT;
              var j = l.DEST_MSISDN;
              var g = l.DEST_MSISDN_STATUS;
              var m = l.DEST_MSISDN_STATUS_DESC;
              if (g == "Invalid") {
                b.markInvalid("MPESA_BEN_MSISDN", m);
                return false;
              } else {
                b.model.setValue("FORMATTED_MSISDN", j);
                b.clearInvalid("MPESA_BEN_MSISDN");
                var k = CRB.getBundle("coop");
                if (
                  parseFloat(e.total) > parseFloat(b.model.md.AVAIL_BALANCE)
                ) {
                  b.markInvalid("AMOUNT", k.LBL_INSUFFICIENT_BAL_ERROR);
                  return false;
                } else {
                  b.clearInvalid("AMOUNT");
                }
                if (a.formObj.isFormValid()) {
                  b.model.setValue(
                    "MPESA_SUM_DBT_AMNT_LBL",
                    numberWithCommas(e.total) + " " + b.model.md.CURRENCY
                  );
                  b.model.setValue("MPESA_SUM_DBT_AMNT", e.total.toString());
                  b.model.setValue(
                    "MPESA_BANK_FEE",
                    e.totalBankCharge.toString() + " " + b.model.md.CURRENCY
                  );
                  b.model.setValue(
                    "MPESA_EXCISE_DUTY",
                    e.feesAndCharge.VAT + " " + b.model.md.CURRENCY
                  );
                  b.model.setValue("MPESA_SUM_COST", e.totalCharge.toString());
                  b.model.setValue("MAP_DATA", e.feesAndCharge);
                  b.model.setValue("INPUT_DEBIT_CURRENCY", b.model.md.CURRENCY);
                  b.model.setValue("NARRATION", b.model.md.NARRATION);
                  CBXDOWNLOADMGR.requestScripts(
                    cbx.downloadProvider.getMergedArray(["FORM_CONTAINER"]),
                    function () {
                      var n = new cbx.form.FormManager({
                        formId: "COOP_SEND_MPESA_SUMMARY",
                        modelData: b.model.md,
                      });
                      $(n.wrapperPanel).addClass("SUMMARY_PAGE");
                      var o = {};
                      o.appWidget = "MOBILE_TRANSFER_MPESA_APP";
                      o.formConRenderType = "APP";
                      CBXFORMCONTAINER.getWindowByFormObj(
                        n,
                        "COOP_SEND_MPESA_SUMMARY_CONTAINER",
                        o
                      );
                    }
                  );
                }
              }
            },
            failure: function (g, h) {
              var i = new iportal.Dialog({
                title: "MESSAGE",
                dialogType: "MESSAGE",
                message: rb.MSG_REC_FND,
                okHandler: function () {
                  if (i) {
                    i.close();
                  } else {
                    arguments[0].close();
                  }
                },
              }).show();
            },
            scope: this,
          });
        }
      });
    }
  });
});
cbx.form.listeners.COOP_SEND_MPESA_SUMMARY = Class(cbx.Observable, {
  constructor: function (a) {
    this.fm2 = finalFormData;
    this.fm = a.fm;
  },
  registerHandlers: function () {
    this.fm.registerHandler("cbxclick", "SUMM_BACK1", function (c, b, e, d) {
      var a = c.model.md;
      CBXDOWNLOADMGR.requestScripts(
        cbx.downloadProvider.getMergedArray(["FORM_CONTAINER"]),
        function () {
          var f = new cbx.form.FormManager({ formId: "PMNTDET", modelData: a });
          var g = {};
          g.appWidget = "MOBILE_TRANSFER_MPESA_APP";
          g.formConRenderType = "APP";
          CBXFORMCONTAINER.getWindowByFormObj(f, "COOP_SEND_MPESA_PMNT", g);
        }
      );
    });
    this.fm.registerHandler("cbxclick", "SUMM_BACK2", function (b, a, d, c) {
      canvas.launch({ workspaceId: "COOP_FUND_TRANSFER_WS" });
    });
    this.fm.registerHandler("cbxpreinitialize", function (i, f) {
      var d = false;
      if (i.additionalConfig != undefined) {
        if (
          i.additionalConfig.PRECONFIRM != undefined &&
          i.additionalConfig.PRECONFIRM == "Y"
        ) {
          $(i.wrapperPanel).addClass("OTP_PAGE");
          i.setVisibleFields(
            [
              "LABEL_FIELD902",
              "TXN_AMT",
              "MPESA_SUM_TO",
              "MPESAWALLET",
              "MPESA_SUM_NARRATION",
              "LABEL_FIELD196",
              "MPESA_SUM_FROM_ACCOUNT",
              "MPESA_SUM_AMOUNT_LBL",
              "MPESA_SUM_DBT_AMNT_LBL",
              "PMNT_DET_NARRATION",
              "PMNT_DET_TNC",
              "PMNT_DET_EMAAILADVC",
              "BRANCH_CODE",
              "MPESA_BANK_FEE",
              "MPESA_PARTNER_FEE",
              "MPESA_EXCISE_DUTY",
              "TXN_AMT_LBL",
              "AVAIL_BALANCE_LBL",
              "TITLE_FIELD565",
              "SAVE_FAV",
            ],
            false
          );
        }
      } else {
        var h = new Date();
        var k = h.getDate();
        var b = h.getMonth() + 1;
        var c = h.getFullYear();
        if (k < 10) {
          k = "0" + k;
        }
        if (b < 10) {
          b = "0" + b;
        }
        h = k + "/" + b + "/" + c;
        var e = i.getModelData();
        i.model.setValue("DEBIT_ACC_NO", e.DEBIT_ACCOUNT);
        i.model.setValue("INPUT_TRANSFER_CCY", e.CURRENCY);
        i.model.setValue("FUNCTION_TYPE", "CRMOB");
        i.model.setValue("TRANS_CURRENCY", e.CURRENCY);
        var g = cbx.retail.app.form;
        var j = e.CURRENCY;
        var a = e.AMOUNT;
        g.constructLimitParams(i, j, a);
        i.model.setValue("PAYMENT_AMOUNT", e.AMOUNT);
        i.model.setValue("INPUT_TRANSFER_AMOUNT", e.AMOUNT);
        i.model.setValue("PAYMENT_DATE", h);
        i.model.setValue("TXN_AMT", e.AMOUNT);
        i.model.setValue(
          "TXN_AMT_LBL",
          numberWithCommas(parseFloat(e.AMOUNT).toFixed(2)) +
            " " +
            i.model.md.CURRENCY
        );
        i.model.setValue("MPESA_SUM_TO", e.FORMATTED_MSISDN);
        i.model.setValue("MPESA_SUM_FROM_ACCOUNT", ct.mpesaAccountID);
        i.model.setValue("MPESAWALLET", "MPESA");
        i.model.setValue("PMNT_DET_NARRATION", e.NARRATION);
        i.model.setValue("BRANCH_CODE", e.BRANCH_CODE);
      }
    });
    this.fm.registerHandler("cbxclick", "RESEND_OTP", function (b, a, d) {
      var c = cbx.retail.app.form;
      b.clearValues(["KEY_OTP"]);
      c.resendReauth(b, "STRAN", "OTP");
    });
    this.fm.registerHandler("cbxpostformrender", function (b, a, d, c) {
      setTimeout(function () {
        $(b.wrapperPanel).find("#OTP_FORM-KEY_OTP").focus();
      }, 100);
    });
  },
});
CFLR.registerListener(
  "COOP_SEND_MPESA_SUMMARY",
  cbx.form.listeners.COOP_SEND_MPESA_SUMMARY
);
cbx.form.listeners.COOP_SEND_MPESA_NARRATION = Class(cbx.Observable, {
  constructor: function (a) {
    this.fm = a.fm;
  },
  registerHandlers: function () {
    this.fm.registerHandler("cbxpreinitialize", function (b, a) {
      console.log("narration form");
    });
    this.fm.registerHandler("cbxclick", "NARR_BACK1", function (c, b, e, d) {
      var a = c.model.md;
      CBXDOWNLOADMGR.requestScripts(
        cbx.downloadProvider.getMergedArray(["FORM_CONTAINER"]),
        function () {
          var f = new cbx.form.FormManager({
            formId: "PMNTDET",
            extraParams: { APP_ID: "CRMOB" },
            modelData: a,
          });
          var g = {};
          g.appWidget = "MOBILE_TRANSFER_MPESA_APP";
          g.formConRenderType = "APP";
          CBXFORMCONTAINER.getWindowByFormObj(f, "COOP_SEND_MPESA_PMNT", g);
        }
      );
    });
    this.fm.registerHandler("cbxclick", "NARR_BACK2", function (b, a, d, c) {
      canvas.launch({ workspaceId: "COOP_FUND_TRANSFER_WS" });
    });
  },
});
CFLR.registerListener("PMNTDET2", cbx.form.listeners.COOP_SEND_MPESA_NARRATION);
function numberWithCommas(a) {
  var b = a.toString().split(".");
  b[0] = b[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return b.join(".");
}
CABR.registerHandler("NEXT", "COOP_MPESA_PMNT2_CONTAINER", function (a) {
  if (a.formObj.isFormValid()) {
    var b = a.formObj;
    CBXDOWNLOADMGR.requestScripts(
      cbx.downloadProvider.getMergedArray(["FORM_CONTAINER"]),
      function () {
        var c = new cbx.form.FormManager({
          formId: "COOP_SEND_MPESA_SUMMARY",
          modelData: b.model.md,
        });
        $(c.wrapperPanel).addClass("SUMMARY_PAGE");
        var d = {};
        d.appWidget = "MOBILE_TRANSFER_MPESA_APP";
        d.formConRenderType = "APP";
        CBXFORMCONTAINER.getWindowByFormObj(
          c,
          "COOP_SEND_MPESA_SUMMARY_CONTAINER",
          d
        );
      }
    );
  }
});
cbx.form.listeners.getMpesaChargesPromise = function (a) {
  if (a.isFormValid()) {
    return new Promise(function (c, b) {
      var d = {
        INPUT_ACTION: "GET_FEES",
        INPUT_FUNCTION_CODE: "COMM",
        SOURCE_FUNCTION_CODE: "CRMOB",
        INPUT_LANGUAGE_ID: iportal.preferences.getPrimaryLang(),
        INPUT_MODE: "FETCH_BENEFICIARY_DETAILS",
        INPUT_PRODUCT: "ACCSVS",
        INPUT_SUB_PRODUCT: "ACCTXN",
        PAGE_CODE_TYPE: "STRAN",
        PRODUCT_NAME: "ACCSVS",
        INPUT_DEBIT_CURRENCY: a.model.md.CURRENCY || "",
        INPUT_ACCOUNT_TYPE: a.model.md.INPUT_ACCOUNT_TYPE || "S",
        EXCHANGE_AMOUNT: a.model.md.AMOUNT || "",
        ACC_TYPE: a.model.md.INPUT_ACCOUNT_TYPE || "SAMinBal",
        INPUT_CHANNEL_ID: "3",
      };
      cbx.ajax({
        params: d,
        async: false,
        success: function (f, i) {
          var g = f;
          var h = g.FEE_CHARGES;
          h.MPESA_FEE = h.PARTNER_FEE;
          var j = parseFloat(
            parseFloat(h.ESTIMATED_FEE) +
              parseFloat(h.VAT) +
              parseFloat(h.MPESA_FEE) +
              parseFloat(a.model.md.AMOUNT)
          ).toFixed(2);
          var k = parseFloat(
            parseFloat(h.ESTIMATED_FEE) +
              parseFloat(h.VAT) +
              parseFloat(h.MPESA_FEE)
          ).toFixed(2);
          var e = parseFloat(
            parseFloat(h.ESTIMATED_FEE) + parseFloat(h.MPESA_FEE)
          ).toFixed(2);
          c({ total: j, totalCharge: k, totalBankCharge: e, feesAndCharge: h });
        },
        failure: function (e, f) {
          iportal.jsutil.hideLoadingMsgOnBody();
          var g = new iportal.Dialog({
            title: "MESSAGE",
            dialogType: "MESSAGE",
            message: rb.MSG_REC_FND,
            okHandler: function () {
              if (g) {
                g.close();
              } else {
                arguments[0].close();
              }
            },
          }).show();
        },
        scope: this,
      });
    });
  }
};
CABR.registerHandler("CANCEL", "COOP_SEND_MPESA_PMNT", function (a) {
  canvas.launch({ workspaceId: "COOP_FUND_TRANSFER_WS" });
});
CABR.registerHandler("CANCEL", "COOP_MPESA_PMNT2_CONTAINER", function (a) {
  canvas.launch({ workspaceId: "COOP_FUND_TRANSFER_WS" });
});
CABR.registerHandler(
  "CANCEL",
  "COOP_SEND_MPESA_SUMMARY_CONTAINER",
  function (a) {
    canvas.launch({ workspaceId: "COOP_FUND_TRANSFER_WS" });
  }
);
