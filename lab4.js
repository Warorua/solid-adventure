var currntDate = null;
function getAgentDtls(element, flag) {
  var pinNum = element.value;
  FetchRegistrationDtl.getAuthAgentDtlsByPIN(pinNum, {
    async: false,
    callback: function (data) {
      if (null == data) {
        //alert('The entered agent PIN is not authorized agent of KRA. Please enter the authorized agent PIN.');
        alert(
          "The entered agent PIN is not recognized by KRA as an authorized agent. Please enter a valid authorized agent's PIN."
        );
        document.getElementById(element.id).value = "";
        document.getElementById("in_dtAuthAgentDtls_9").value = "";
        document.getElementById("in_dtAuthAgentDtls_4").value = "";
        document.getElementById("in_dtAuthAgentDtls_5").value = "";
        document.getElementById("in_dtAuthAgentDtls_6").value = "";
        return false;
      }
      if (data.agentName != null)
        document.getElementById("in_dtAuthAgentDtls_9").value = data.agentName;
      if (data.agentPhone != null)
        document.getElementById("in_dtAuthAgentDtls_4").value = data.agentPhone;
      if (data.agentMobile != null)
        document.getElementById("in_dtAuthAgentDtls_5").value =
          data.agentMobile;
      if (data.emailId != null)
        document.getElementById("in_dtAuthAgentDtls_6").value = data.emailId;
    },
    errorHandler: function (message) {
      alert("There is some server issue. Please try again later.");
      return false;
    }, //Updated on 05/01/2014 for changing alert message in case server not found
  });
}

// for populating sub activity on ajax request
function getEcoSubActDtls(obj, subactivityObj) {
  if (null != obj.value && obj.value != "") {
    FetchRegistrationDtl.fetchEcoSubActDtls(obj.value, {
      async: false,
      callback: function (data) {
        if (data != "null" && data != null) {
          dwr.util.removeAllOptions(subactivityObj);

          document.getElementById(subactivityObj).disabled = false;
          document.getElementById(subactivityObj).className =
            "form101_combo form101_combo_width";
          var newOpt1 = new Option("--Select--", "");
          document.getElementById(subactivityObj).options[0] = newOpt1;
          document.getElementById(subactivityObj).selectedIndex = 0;

          dwr.util.addOptions(
            subactivityObj,
            data,
            "ecoActMstId",
            "economicActivityName"
          );
        } else {
          //added on 22/04/2014 by garima for defect resolution
          //alert('Record Not Found');
          //obj.value='';
          var subAct = document.getElementById(subactivityObj);
          subAct.options.length = 0;
          subAct.add(new Option("--Select--", ""));
          subAct.disabled = true;

          if (
            document.getElementById("in_dtRenDtls_6") &&
            document.getElementById("in_dtRenDtls_6").disabled == true
          ) {
            /*var subCls=document.getElementById('in_dtRenDtls_7');		
						subCls.options.length=0;
						subCls.add(new Option("--Select--",""));
						subCls.disabled=true;*/
          } else {
            /* if(document.getElementById('in_dtRenDtls_7'))
					  {
					   document.getElementById('in_dtRenDtls_7').disabled=false;
					  }*/
          }
        }
      },
      errorHandler: function (message) {
        alert("There is some server issue. Please try again later.");
        return false;
      }, //Updated on 05/01/2014 for changing alert message in case server not found
    });
  } else {
    alert("Please select Activity");
  }
}
function getInterAgentDtls(element) {
  var pinNum = element.value;
  FetchRegistrationDtl.getInterAgentDtlByPIN(pinNum, {
    async: false,
    callback: function (data) {
      if (null == data) {
        alert("Please enter valid PIN");
        document.getElementById(element.id).value = "";
        document.getElementById("in_dtIADtls_10").value = "";
        document.getElementById("in_dtIADtls_11").value = "";
        document.getElementById("in_dtIADtls_12").value = "";
        document.getElementById("in_dtIADtls_5").value = "";
        document.getElementById("in_dtIADtls_6").value = "";
        document.getElementById("in_dtIADtls_7").value = "";
        return false;
      }
      if (data.alertMsg == null || data.alertMsg == "") {
        if (data.firstName != null)
          document.getElementById("in_dtIADtls_10").value = data.firstName;
        if (data.middleName != null)
          document.getElementById("in_dtIADtls_11").value = data.middleName;
        if (data.lastName != null)
          document.getElementById("in_dtIADtls_12").value = data.lastName;
        if (data.agentPhone != null)
          document.getElementById("in_dtIADtls_5").value = data.agentPhone;
        if (data.agentMobile != null)
          document.getElementById("in_dtIADtls_6").value = data.agentMobile;
        if (data.emailId != null)
          document.getElementById("in_dtIADtls_7").value = data.emailId;
      } else {
        element.value = "";
        document.getElementById("in_dtIADtls_10").value = "";
        document.getElementById("in_dtIADtls_11").value = "";
        document.getElementById("in_dtIADtls_12").value = "";
        document.getElementById("in_dtIADtls_5").value = "";
        document.getElementById("in_dtIADtls_6").value = "";
        document.getElementById("in_dtIADtls_7").value = "";
        alert(data.alertMsg);
      }
    },
    errorHandler: function (message) {
      alert("There is some server issue. Please try again later.");
      return false;
    }, //Updated on 05/01/2014 for changing alert message in case server not found
  });
}
function getdetailsByPIN(taxpayerPin, name) {
  if (null != taxpayerPin.value && taxpayerPin.value != "") {
    FetchRegistrationDtl.fetchPinDeatilsReg(taxpayerPin.value, {
      async: false,
      callback: function (data) {
        if (data != null) {
          if (name != "") document.getElementById(name).value = data;
        } else {
          taxpayerPin.value = "";
          alert("Please enter valid PIN");
          taxpayerPin.focus();
        }
      },
      errorHandler: function (message) {
        alert("There is some server issue. Please try again later.");
        return false;
      }, //Updated on 05/01/2014 for changing alert message in case server not found
    });
  } else {
    return false;
  }
}
function getEmployerByPIN(taxpayerPin, name) {
  if (null != taxpayerPin.value && taxpayerPin.value != "") {
    FetchRegistrationDtl.fetchEmployerDeatils(taxpayerPin.value, {
      async: false,
      callback: function (data) {
        if (data != null) {
          if (data == "NPAYE") {
            //alert('The PIN you have entered is not registered as Employer(PAYE).');

            alert(
              "The entered PIN " +
                taxpayerPin.value +
                " is not registered  for employer's tax obligation (PAYE)."
            );
            document.getElementById(name).value = "";
            taxpayerPin.value = "";
            taxpayerPin.focus();
          } else if (data == "NIPG") {
            //alert('The PIN you have entered has not updated iPage.');
            alert(
              "The entered employer's PIN " +
                taxpayerPin.value +
                " has not updated their iPage."
            );
            document.getElementById(name).value = "";
            taxpayerPin.value = "";
            taxpayerPin.focus();
          } else if (data == "NOTPAYEIPAGE") {
            document.getElementById(name).value = "";
            taxpayerPin.value = "";
            alert(
              "The PIN you have entered has not processed iPage and not registered as Employer(PAYE) as well."
            );
            taxpayerPin.focus();
          } else if (data == "INPIN") {
            document.getElementById(name).value = "";
            taxpayerPin.value = "";
            alert("The PIN you have entered is not valid PIN of iTax.");
            taxpayerPin.focus();
          } else {
            if (name) {
              document.getElementById(name).value = data;
            }
          }
        } else {
          taxpayerPin.value = "";
          document.getElementById(name).value = "";
          //alert('Please enter valid Employer\'s PIN');
          alert(
            "Entered employer PIN does not match records held by KRA. Please enter valid Employer's PIN"
          );
          taxpayerPin.focus();
        }
      },
      errorHandler: function (message) {
        alert("There is some server issue. Please try again later.");
        return false;
      }, //Updated on 05/01/2014 for changing alert message in case server not found
    });
  } else {
    return false;
  }
}
function fetchStationDtls(objCounty, stationId) {
  if (null != objCounty.value && objCounty.value != "") {
    FetchRegistrationDtl.fetchStationDtls(objCounty.value, {
      async: false,
      callback: function (data) {
        if (data != "null" && data != null) {
          dwr.util.removeAllOptions(stationId);
          dwr.util.addOptions(stationId, data, "locationId", "locationName");
          document.getElementById(stationId).disabled = false;
        } else {
          objCounty.value = "";
          alert("Error found in fetching station details");
          objCounty.focus();
        }
      },
      errorHandler: function (message) {
        alert("There is some server issue. Please try again later.");
      }, //Updated on 05/01/2014 for changing alert message in case server not found
    });
  } else {
    //alert('Error while fetching data...');
    alert("Error while fetching station data.");
  }
}
function fnCheckPastDtCommon(form) {
  if (currntDate != "" && currntDate != null) {
    if (
      trim(currntDate) != trim(form.value) &&
      fnCompareDates(currntDate, form.value)
    ) {
      alert("Date cannot be a Future Date.");
      form.value = "";
      form.focus();
      return false;
    }
    return true;
  } else {
    var currentDate = new Date();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();
    if (day <= 9) day = "0" + day;
    if (month <= 9) month = "0" + month;
    var todayDate = day + "/" + month + "/" + year;
    if (
      trim(todayDate) != trim(form.value) &&
      fnCompareDates(todayDate, form.value)
    ) {
      alert("Date cannot be a Future Date.");
      form.value = "";
      form.focus();
      return false;
    }
    return true;
  }
}

function fnCheckDtCommon(form, name) {
  if (currntDate != "" && currntDate != null) {
    if (
      trim(currntDate) != trim(form.value) &&
      fnCompareDates(currntDate, form.value)
    ) {
      alert(
        name +
          " cannot be a Future Date.Please consult respective KRA station for correction of your data."
      );
      form.focus();
      return false;
    }
    return true;
  } else {
    var currentDate = new Date();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();
    if (day <= 9) day = "0" + day;
    if (month <= 9) month = "0" + month;
    var todayDate = day + "/" + month + "/" + year;
    if (
      trim(todayDate) != trim(form.value) &&
      fnCompareDates(todayDate, form.value)
    ) {
      alert(
        name +
          " cannot be a Future Date.Please consult respective KRA station for correction of your data."
      );
      form.value = "";
      form.focus();
      return false;
    }
    return true;
  }
}
//OBJ = where date is placed
//txtId = id of date in box
//msg to display
function checkAgentDate(objId, txtId, msg, agentType) {
  if (checkDateValidation(objId, txtId, msg)) {
    document.getElementById(txtId).disabled = false;
    document.getElementById(objId).disabled = false;
    document.getElementById(agentType).disabled = false;
  }
}
function checkDateValidation(objId, txtId, msg, clearObjId) {
  if (
    document.getElementById(objId).value != null &&
    document.getElementById(objId).value != ""
  ) {
    document.getElementById(objId).value = trim(
      document.getElementById(objId).value
    );
    if (!checkdate(document.getElementById(objId))) return false;
  }
  if (
    document.getElementById(txtId).value != null &&
    document.getElementById(txtId).value != ""
  ) {
    document.getElementById(txtId).value = trim(
      document.getElementById(txtId).value
    );
    if (!checkdate(document.getElementById(txtId))) return false;
  }

  if (
    fnCompareDates(
      document.getElementById(txtId).value,
      document.getElementById(objId).value
    )
  ) {
    return true;
  } else {
    if (null != clearObjId && clearObjId != "") {
      document.getElementById(clearObjId).value = "";
    } else {
      document.getElementById(objId).value = "";
    }
    alert(msg);
    return false;
  }
}
/*
function enableOthers(val)
{
	if(val == 'OTHER')
	{
		document.getElementById('txtVatRlfOtherOrg').disabled = false;
	}
	else
	{
		document.getElementById('txtVatRlfOtherOrg').value="";
		document.getElementById('txtVatRlfOtherOrg').disabled = true;
	}
}*/
function checkEmail(emailObj, secondEmailId) {
  var mainEmail = emailObj.value;
  var secndEmail = "";
  if (document.getElementById(secondEmailId) != null)
    secndEmail = document.getElementById(secondEmailId).value;
  if (secndEmail != null && secndEmail != "") {
    if (mainEmail.toLowerCase() == secndEmail.toLowerCase()) {
      alert(
        "Main Email Address and Secondary Email Address cannot be same. Please enter different Email Address."
      );
      emailObj.value = "";
      emailObj.focus();
      return false;
    } else return true;
  } else {
    return true;
  }
}
function checkEmailAgent(emailObj, secondEmailId) {
  var mainEmail = emailObj.value;
  var secndEmail = "";
  if (document.getElementById(secondEmailId) != null)
    secndEmail = document.getElementById(secondEmailId).value;
  if (secndEmail != null && secndEmail != "") {
    if (mainEmail.toLowerCase() == secndEmail.toLowerCase()) {
      alert(
        "Intermediary Agent Email Address and Authorised Agent Email Address cannot be same. Please enter different Email Address."
      );
      emailObj.value = "";
      emailObj.focus();
      return false;
    } else return true;
  } else return true;
}
function checkMainEmail(secondEmail) {
  var mail;
  if (
    null != document.getElementById("rdoCiti1") &&
    document.getElementById("rdoCiti1").checked == true
  ) {
    mail = document.getElementById("txtTxprKELocMainEmail").value;
  } else if (
    null != document.getElementById("rdoCiti2") &&
    document.getElementById("rdoCiti2").checked == true
  ) {
    mail = document.getElementById("txtTxprNKELocMainEmail").value;
  } else if (
    null != document.getElementById("rdoCiti3") &&
    document.getElementById("rdoCiti3").checked == true
  ) {
    mail = document.getElementById("txtTxprNKENRLocMainEmail").value;
  } else if (null != document.getElementById("txtNIIdenMainEmail")) {
    mail = document.getElementById("txtNIIdenMainEmail").value;
  }
  if ("" != mail && "" != secondEmail.value) {
    if (mail == secondEmail.value) {
      alert(
        "This Email Address and Main Email Address of Section A cannot be same. Please enter different Email Address."
      );
      secondEmail.value = "";
      secondEmail.focus();
      return false;
    }
  }
  return true;
}
function checkOtherEmail(email) {
  if ("" != email.value) {
    /*if(email.value==document.getElementById('in_dtISBussDtls_6').value)
		{
			alert('Main Email Address of Section A and Main Email Address of Business cannot be same. Please enter different Email Address.');
			email.value ='';
			email.focus();
			return false;
		}*/
    if (email.value == document.getElementById("in_dtISBussDtls_13").value) {
      //alert('Main Email Address of Section A and Secondary Email Address of Business cannot be same. Please enter different Email Address.');
      alert(
        "Main Email Address of indicated in Section A (Basic Information) and Secondary Email Address of Business cannot be same. Please enter different Email Address."
      );
      email.value = "";
      email.focus();
      return false;
    }
    /*if(email.value==document.getElementById('in_dtBussBrnchDtls_6').value)
		{
			alert('Main Email Address of Section A and Main Email Address of Business branch cannot be same. Please enter different Email Address.');
			email.value ='';
			email.focus();
			return false;
		}*/
    if (email.value == document.getElementById("in_dtBussBrnchDtls_20").value) {
      alert(
        "Main Email Address of Section A and Secondary Email Address of Business branch cannot be same. Please enter different Email Address."
      );
      email.value = "";
      email.focus();
      return false;
    }
    if (email.value == document.getElementById("in_dtIADtls_7").value) {
      alert(
        "Main Email address of Section A and Email address of Intemediary Agent cannot be same. Please enter different Email Address."
      );
      email.value = "";
      email.focus();
      return false;
    }
    if (email.value == document.getElementById("in_dtAuthAgentDtls_6").value) {
      //alert('Main Email address of Section A and Email address of Authorized Agent cannot be same. Please enter different Email Address.');
      alert(
        "Main Email Address of indicated in Section A (Basic Information) and Email address of Authorized Agent cannot be same. Please enter different Email Address."
      );
      email.value = "";
      email.focus();
      return false;
    }
    if (email.value == document.getElementById("txtAltAdEmail").value) {
      //alert('Main Email Address of Section A and Email address of Alternative Address cannot be same. Please enter different Email Address.');
      alert(
        "Main Email Address indicated in Section A (Basic Information) and Email address of Alternative Address cannot be same. Please enter different Email Address."
      );
      email.value = "";
      email.focus();
      return false;
    }
  }

  return true;
}
function checkNonIndiOtherMail(email) {
  if ("" != email.value) {
    if (email.value == document.getElementById("txtNIIdenSecEmail").value) {
      alert(
        "Main Email Address and Secondary Email Address cannot be same. Please enter different Email Address."
      );
      email.value = "";
      email.focus();
      return false;
    }
    if (email.value == document.getElementById("in_dtPlaceDtls_6").value) {
      alert(
        "Main Email Address of Section A and Main Email Address of Additional Place of Business cannot be same. Please enter different Email Address."
      );
      email.value = "";
      email.focus();
      return false;
    }
    if (email.value == document.getElementById("in_dtPlaceDtls_21").value) {
      alert(
        "Main Email Address of Section A and Secondary Email Address of Additional Place of Business cannot be same. Please enter different Email Address."
      );
      email.value = "";
      email.focus();
      return false;
    }
    if (email.value == document.getElementById("in_dtIADtls_7").value) {
      //alert('Main Email address of Section A and Email address of Intemediary Agent cannot be same. Please enter different Email Address.');
      alert(
        "Main Email Address of indicated in Section A (Basic Information) and Email address of Intemediary Agent cannot be same. Please enter different Email Address."
      );
      email.value = "";
      email.focus();
      return false;
    }
    if (email.value == document.getElementById("in_dtAuthAgentDtls_6").value) {
      alert(
        "Main Email address of Section A and Email address of Authorized Agent cannot be same. Please enter different Email Address."
      );
      email.value = "";
      email.focus();
      return false;
    }
    if (email.value == document.getElementById("txtNIAAdMainEmail").value) {
      alert(
        "Main Email Address of Section A and Email address of Alternative Address cannot be same. Please enter different Email Address."
      );
      email.value = "";
      email.focus();
      return false;
    }
  }

  return true;
}

function fetchTxprCommonDtlsByPin(taxpayerPin, name, email) {
  if (null != taxpayerPin.value && taxpayerPin.value != "") {
    FetchRegistrationDtl.fetchTxprCommonDtlsByPin(taxpayerPin.value, {
      async: false,
      callback: function (data) {
        if (data != null) {
          if (data.isValidPin != null && data.isValidPin) {
            if (name != "" && data.taxPayerName != null)
              document.getElementById(name).value = data.taxPayerName;
            if (email != "" && data.taxPayerEmail != null)
              document.getElementById(email).value = data.taxPayerEmail;
            if (
              null != document.getElementById("txtSpouseGenderForCheck") &&
              data.gender != null
            ) {
              document.getElementById("txtSpouseGenderForCheck").value =
                data.gender;
            }
          } else {
            taxpayerPin.value = "";
            taxpayerPin.focus();
            alert("Please enter a Valid PIN");
          }
        } else {
          taxpayerPin.value = "";
          alert("Error in fetching data");
          taxpayerPin.focus();
        }
      },
      errorHandler: function (message) {
        alert("There is some server issue. Please try again later.");
        return false;
      }, //Updated on 05/01/2014 for changing alert message in case server not found
    });
  } else {
    return false;
  }
}

function fetchTxprDtlsForTrbIndi(taxpayerPin, name, email, bondId, taxPayerId) {
  if (null != taxpayerPin.value && taxpayerPin.value != "") {
    var bondType = document.getElementById(bondId).value;
    var payerId = "";
    if (null != taxPayerId && taxPayerId != "") {
      payerId = document.getElementById(taxPayerId).value;
    }

    FetchRegistrationDtl.fetchTxprCommonDtlsTrbIndi(
      taxpayerPin.value,
      bondType,
      payerId,
      {
        async: false,
        callback: function (data) {
          if (data != null) {
            if (data.isValidPin != null && data.isValidPin) {
              if (name != "" && data.taxPayerName != null)
                document.getElementById(name).value = data.taxPayerName;
              if (email != "" && data.taxPayerEmail != null)
                document.getElementById(email).value = data.taxPayerEmail;
              if (
                null != document.getElementById("txtSpouseGenderForCheck") &&
                data.gender != null
              ) {
                document.getElementById("txtSpouseGenderForCheck").value =
                  data.gender;
              }
            } else {
              if (
                data.spouseDuplicacyMsg != null &&
                data.spouseDuplicacyMsg != ""
              ) {
                alert(data.spouseDuplicacyMsg);
                taxpayerPin.value = "";
                document.getElementById(name).value = "";
                document.getElementById(email).value = "";
                taxpayerPin.focus();
              } else {
                alert("Please enter a Valid PIN");
                taxpayerPin.value = "";
                document.getElementById(name).value = "";
                document.getElementById(email).value = "";
                taxpayerPin.focus();
              }
            }
          } else {
            taxpayerPin.value = "";
            alert("Error in fetching data");
            taxpayerPin.focus();
          }
        },
        errorHandler: function (message) {
          alert("There is some server issue. Please try again later.");
          return false;
        }, //Updated on 05/01/2014 for changing alert message in case server not found
      }
    );
  } else {
    return false;
  }
}

function fetchTxprCommonDtlsByPinStopNdRegd(taxpayerPin, name, email) {
  if (null != taxpayerPin.value && taxpayerPin.value != "") {
    FetchRegistrationDtl.fetchTxprCommonDtlsByPinRegdNdStop(taxpayerPin.value, {
      async: false,
      callback: function (data) {
        if (data != null) {
          if (data.isValidPin != null && data.isValidPin) {
            if (name != "" && data.taxPayerName != null)
              document.getElementById(name).value = data.taxPayerName;
            if (email != "" && data.taxPayerEmail != null)
              document.getElementById(email).value = data.taxPayerEmail;
            if (
              null != document.getElementById("txtSpouseGenderForCheck") &&
              data.gender != null
            ) {
              document.getElementById("txtSpouseGenderForCheck").value =
                data.gender;
            }
          } else {
            taxpayerPin.value = "";
            taxpayerPin.focus();
            alert("Please enter a Valid PIN");
          }
        } else {
          taxpayerPin.value = "";
          alert("Error in fetching data");
          taxpayerPin.focus();
        }
      },
      errorHandler: function (message) {
        alert("There is some server issue. Please try again later.");
        return false;
      }, //Updated on 05/01/2014 for changing alert message in case server not found
    });
  } else {
    return false;
  }
}

/**
 *  method to validate pin for indi and non indi.
 *  pass category INDI and NONINDI as per validation.
 *  for both indi and non indi pass blank
 *  added by prakhar chaubey
 */
function validatePIN(form, category) {
  var pinTyp = "";
  if (category == "INDI") {
    pinTyp = " Individual";
  }
  if (category == "NONINDI") {
    pinTyp = " Non-Individual";
  }

  var pin = form.value;

  if (pin == null || pin == "") {
    alert(pinTyp + " PIN is required.");
    return false;
  }
  if (securityCheck(form.id)) {
    if (pin.length == 11) {
      if (!(pin.substring(0, 1).toString() == "A") && category == "INDI") {
        alert("Please enter Individual PIN.");
        form.value = "";
        return false;
      } else if (
        !(pin.substring(0, 1).toString() == "P") &&
        category == "NONINDI"
      ) {
        alert("Please enter Non Individual PIN.");
        form.value = "";
        return false;
      } else if (category == "") {
        if (
          !(
            pin.substring(0, 1).toString() == "A" ||
            pin.substring(0, 1).toString() == "P"
          )
        ) {
          alert("Please enter valid PIN.");
          form.value = "";
          return false;
        }
      }
      if (isNaN(pin.substring(1, 10).toString())) {
        alert("Please enter valid " + pinTyp + " PIN.");
        form.value = "";
        return false;
      }
      var charCode = pin.substring(10).toString();
      var check = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      flag = 0;
      for (var i = 0; i < check.length; i++) {
        if (charCode == check.charAt(i)) {
          flag = 1;
        }
      }
      if (flag == 0) {
        alert("Please enter valid " + pinTyp + " PIN.");
        form.value = "";
        return false;
      } else flag = 0;
    } else {
      alert("Please enter valid " + pinTyp + " PIN.");
      form.value = "";
      return false;
    }
  } else {
    alert("Malicious Code Found. Please Enter valid data.");
    form.value = "";
    return false;
  }

  return true;
}

// added by parth for converting string to upper case

function toUpperPin(uname) {
  var s = document.getElementById(uname).value;
  s = s.toUpperCase();
  document.getElementById(uname).value = s;
  return true;
}
function valSuppPin(obj) {
  if (null != obj.value && obj.value != "") {
    toUpperPin(obj.id);
    if (validatePIN(obj, "NONINDI")) {
      getdetailsByPIN(obj, "");
    }
  }
}
function removeCommaFrmInput(val) {
  var valString = "" + val;
  if (valString == "") valString = "";
  else {
    while (valString.indexOf(",") != -1) {
      valString = valString.replace(",", "");
    }
  }
  return valString;
}

/* start: convertToKenyanShillingFormatVal: for number to curancy format*/
function convertToKenyanShillingFormatVal(obj) {
  valStr = obj.value;
  if (
    valStr != "" &&
    valStr != 0 &&
    valStr != "NaN" &&
    typeof valStr != "undefined"
  ) {
    var val = "" + valStr;
    val = removeCommaFrmInput(val);
    if (val == "") {
      return false;
    }
    var sign = "";
    if (val.charAt(0) == "-") {
      val = val.substring(1);
      if (!(val.length > 0)) {
        val = "0";
      }
      sign = "-";
    }
    var decimalFlag;
    if (val.indexOf(".") != -1) {
      decimalFlag = true;
      val = val.substring(0, val.indexOf("."));
    }
    while (val.charAt(0) == "0" && val != "0") {
      val = val.substring(1, val.length);
    }

    var str = "0123456789";
    for (j = 0; j < val.length; j++) {
      if (str.indexOf(val.charAt(j)) == -1) {
        val = "";
        obj.value = val;
        alert("Please enter numeric data in this field");
        decimalFlag = false;
        return 0;
      }
    }

    var valGr8 = false;
    if (val.length > 15) {
      valGr8 = true;
      alert("The absolute part cannot be greater than 15 digits");
      obj.value = "";
      valGr8 = false;
      return valGr8;
      //val = val.substring(0,15);
    }

    var result = "";
    if (val.length > 3) {
      val = parseInt(val);
      var i = 1;
      while (val != 0) {
        var temp = "" + (val % 1000);
        while (temp.length < 3) {
          temp = "0" + temp;
        }
        result = "," + temp + result;
        val = parseInt(val / 1000);
      }
    } else {
      val = parseInt(val);
      result = "" + val;
    }
    if (result.charAt(0) == ",") {
      result = result.substring(1);
    }

    while (result.charAt(0) == "0" && result != "0") {
      result = result.substring(1, result.length);
    }
    if (result == "") {
      result = "0";
    }
    val = sign + result;

    obj.value = val;
    return val;
  } else {
    return 0;
  }
}

/* end: convertToKenyanShillingFormatVal: for number to curancy format*/

function checkBranchNotExists() {
  branchNotExists = true;
  var addPlaceBussTable = document.getElementById("dtPlaceDtls");

  var branchNm = document.getElementById("in_dtPlaceDtls_3").value;
  if (null == branchNm && branchNm == "") {
    alert("Please enter branch name.");
    return false;
  }
  //Updated by Garima for unique branch email check
  var branchEmail = document.getElementById("in_dtPlaceDtls_5").value;
  if (null == branchEmail && branchEmail == "") {
    alert("Please enter branch email address.");
    return false;
  }
  //Added to prevent duplicate SITE ID :: START
  var stationIdPsd = document.getElementById("stationIdPsd").value;
  if (stationIdPsd == "70") {
    var mdaSiteId = document.getElementById("in_dtPlaceDtls_26").value;
  }
  //Added to prevent duplicate SITE ID :: END

  for (var r = 1; r < addPlaceBussTable.rows.length; r++) {
    var colVal = document.getElementById("id_dtPlaceDtls_" + r).value;
    var del = document.getElementById("id_dtPlaceDtls_" + r + "_1").name;
    //var mod = document.getElementById('id_dtPlaceDtls_'+r+'_2').name;
    colValArray = colVal.split(columnsDelimiter);
    for (var i = 0; i < colValArray.length - 1; i++) {
      var propertyName = colValArray[i].split(propertyValueDelimiter)[0];
      var propertyValue = colValArray[i].split(propertyValueDelimiter)[1];
      if (
        null != propertyName &&
        propertyName != "" &&
        null != del &&
        del != ""
      ) {
        if (
          propertyName == "brnchName" &&
          del.toUpperCase() != "DELETED" &&
          null != document.getElementById("id_dtPlaceDtls_" + r + "_2") &&
          document
            .getElementById("id_dtPlaceDtls_" + r + "_2")
            .name.toUpperCase() != "MODIFYING"
        ) {
          if (
            null != propertyValue &&
            propertyValue != "" &&
            propertyValue == branchNm
          ) {
            alert("This branch name is already declared.");
            return false;
          }
        } else if (
          propertyName == "emailId" &&
          del.toUpperCase() != "DELETED" &&
          null != document.getElementById("id_dtPlaceDtls_" + r + "_2") &&
          document
            .getElementById("id_dtPlaceDtls_" + r + "_2")
            .name.toUpperCase() != "MODIFYING"
        ) {
          if (
            null != propertyValue &&
            propertyValue != "" &&
            propertyValue == branchEmail
          ) {
            alert("This branch email address is already declared.");
            return false;
          }
        }
        //Added to prevent duplicate SITE ID :: START
        else if (
          stationIdPsd == "70" &&
          propertyName == "mdaSiteId" &&
          del.toUpperCase() != "DELETED" &&
          null != document.getElementById("id_dtPlaceDtls_" + r + "_2") &&
          document
            .getElementById("id_dtPlaceDtls_" + r + "_2")
            .name.toUpperCase() != "MODIFYING"
        ) {
          if (
            null != propertyValue &&
            propertyValue != "" &&
            propertyValue == mdaSiteId
          ) {
            alert("This Site ID is already declared.");
            return false;
          }
        }
        //Added to prevent duplicate SITE ID :: END
      }
    }
  }
  return true;
}
function convertToShillingFormatForBlank(obj, decimalFlag) {
  if (
    obj.value != "" &&
    obj.value != "NaN" &&
    typeof obj.value != "undefined"
  ) {
    if (obj.value == 0) {
      obj.value = "0.00";
      return true;
    }

    if (typeof decimalFlag == "undefined") {
      decimalFlag = true;
    }
    var val = convertToUgandianShillingFormatValWithDecimal(
      obj.value,
      decimalFlag
    );
    if (val == false) {
      obj.value = "";
      return false;
    } else {
      obj.value = val;
      return true;
    }
  } else {
    return true;
  }
}
function convertToUgandianShillingFormatValWithDecimal(valStr, decAlertFlag) {
  if (
    valStr != "" &&
    valStr != 0 &&
    valStr != "NaN" &&
    typeof valStr != "undefined"
  ) {
    var val = "" + valStr;
    var decimalPart = "";
    var decCnt = 0;

    val = removeCommaFrmInput(val);

    if (val == "") {
      return false;
    }
    var sign = "";
    if (val.charAt(0) == "-") {
      val = val.substring(1);
      if (!(val.length > 0)) {
        val = "0";
      }
      sign = "-";
    }

    var decimalFlag;
    if (val.split(".").length > 2) {
      alert("Invalid number entered with more than one decimal part.");
      return 0;
    }
    if (val.indexOf(".") != -1) {
      decimalFlag = true;
      decimalPart = val.substring(val.indexOf("."));
      val = val.substring(0, val.indexOf("."));
      if (val == "") {
        val = "0";
      }
    }

    while (val.charAt(0) == "0" && val != "0") {
      val = val.substring(1, val.length);
    }

    var str = "0123456789";

    for (j = 0; j < val.length; j++) {
      if (str.indexOf(val.charAt(j)) == -1) {
        val = "";
        alert("Please enter numeric data in this field");
        decimalFlag = false;
        return false;
      }
    }
    for (j = 1; j < decimalPart.length; j++) {
      if (str.indexOf(decimalPart.charAt(j)) == -1) {
        alert("Please enter numeric data in this field");
        return false;
      }
    }

    var valGr8 = false;
    if (val.length > 15) {
      valGr8 = true;
      val = val.substring(0, 15);
    }
    var deciGr8 = false;

    if (decimalPart.length > 3) {
      deciGr8 = true;
      decimalPart = decimalPart.substring(0, 3);
    }

    // to display 00 in decimal while blank
    if (decimalPart.length == 0) {
      decimalPart = ".00";
    }

    var result = "";
    if (val.length > 3) {
      val = parseInt(val);
      var i = 1;
      while (val != 0) {
        var temp = "" + (val % 1000);
        while (temp.length < 3) {
          temp = "0" + temp;
        }
        result = "," + temp + result;
        val = parseInt(val / 1000);
      }
    } else {
      val = parseInt(val);
      result = "" + val;
    }
    if (result.charAt(0) == ",") {
      result = result.substring(1);
    }

    while (result.charAt(0) == "0" && result != "0") {
      result = result.substring(1, result.length);
    }
    if (result == "") {
      result = "0";
    }
    val = sign + result + "" + decimalPart;
    if (valGr8) {
      alert("The absolute part cannot be greater than 15 digits");
      valGr8 = false;
    }
    if (deciGr8 && decAlertFlag) {
      alert("The decimal part cannot be greater than 2 digits");
      deciGr8 = false;
    }
    return val;
  } else {
    return 0;
  }
}

function isUniqueEmailId(obj, category, taxpayerId) {
  var rtnFlg = true;
  if (
    null != obj.value &&
    obj.value != "" &&
    null != category &&
    category != ""
  ) {
    FetchRegistrationDtl.isUniqueEmailId(obj.value, category, taxpayerId, {
      async: false,
      callback: function (data) {
        if (null != data) {
          if (data == false) {
            alert(
              "This Email id is already registered with another taxpayer/Branch."
            );
            obj.value = "";
            rtnFlg = data;
          }
        }
      },
      errorHandler: function (message) {
        alert("There is some server issue. Please try again later.");
        return false;
      },
    });
  }
  return rtnFlg;
}

function chkPendingTaskOnStationChange(category) {
  rtnFlg = true;
  var districtId, taxpayerId;
  var previousDistrictId;
  if (
    null != document.getElementById("mainDistrictId") &&
    null != document.getElementById("mainDistrictId").value &&
    document.getElementById("mainDistrictId").value != ""
  ) {
    previousDistrictId = document.getElementById("mainDistrictId").value;
  }
  if (null != category && category != "") {
    if (category == "INDI") {
      if (
        null != document.getElementById("amndIndiData") &&
        document.getElementById("amndIndiData").checked
      ) {
        if (document.getElementById("rdoCiti1").checked) {
          districtId = document.getElementById("txtTxprKELocDistrict").value;
        } else if (document.getElementById("rdoCiti2").checked) {
          districtId = document.getElementById("txtTxprNKELocDistrict").value;
        }
        taxpayerId = document.getElementById("taxPayerId").value;
        if (
          districtId != null &&
          districtId != "" &&
          taxpayerId != null &&
          taxpayerId != ""
        ) {
          if (null != previousDistrictId && previousDistrictId != "") {
            if (previousDistrictId == districtId) {
              return true;
            }
          }
          FetchRegistrationDtl.chkPendingTaskOnStationChange(
            districtId,
            taxpayerId,
            {
              async: false,
              callback: function (data) {
                if (null != data && data != "") {
                  alert(data);
                  rtnFlg = false;
                }
              },
              errorHandler: function (message) {
                alert("There is some server issue. Please try again later.");
                return false;
              }, //Updated on 05/01/2014 for changing alert message in case server not found
            }
          );
        }
      }
    } else if (category == "NINDI") {
      if (
        null != document.getElementById("section1") &&
        document.getElementById("section1").checked
      ) {
        districtId = document.getElementById("txtNIIdenDistrict").value;
        taxpayerId = document.getElementById("taxPayerId").value;
        if (
          districtId != null &&
          districtId != "" &&
          taxpayerId != null &&
          taxpayerId != ""
        ) {
          if (null != previousDistrictId && previousDistrictId != "") {
            if (previousDistrictId == districtId) {
              return true;
            }
          }
          FetchRegistrationDtl.chkPendingTaskOnStationChange(
            districtId,
            taxpayerId,
            {
              async: false,
              callback: function (data) {
                if (null != data && data != "") {
                  alert(data);
                  rtnFlg = false;
                }
              },
              errorHandler: function (message) {
                alert("There is some server issue. Please try again later.");
                return false;
              }, //Updated on 05/01/2014 for changing alert message in case server not found
            }
          );
        }
      }
    }
  }
  return rtnFlg;
}

function beforeAddrowValidationAutherizedAgent() {
  tab_id = "dtAuthAgentDtls";
  var srcTable = document.getElementById(tab_id);
  var counter = 0;
  for (var r = 1; r < srcTable.rows.length; r++) {
    colValArray = document
      .getElementById("id_" + tab_id + "_" + r)
      .value.split(columnsDelimiter);
    if (
      colValArray[0].split(propertyValueDelimiter)[1] ==
        document.getElementById("in_" + tab_id + "_3").value &&
      document.getElementById("id_" + tab_id + "_" + r + "_1").name !=
        "deleted" &&
      null != document.getElementById("id_" + tab_id + "_" + r + "_2") &&
      document.getElementById("id_" + tab_id + "_" + r + "_2").name !=
        "Modifying"
    ) {
      //alert('You cannot enter the same Authorized Agent again.');
      alert("Authorized Agent's PIN may only be declared once.");
      return false;
    }

    if (
      document.getElementById("id_" + tab_id + "_" + r + "_1").name !=
        "deleted" &&
      null != document.getElementById("id_" + tab_id + "_" + r + "_2") &&
      document.getElementById("id_" + tab_id + "_" + r + "_2").name !=
        "Modifying"
    ) {
      counter++;
    }

    if (counter == 3) {
      //alert('You can add maximum three Authorized agent.');
      alert("You are allowed a maximum of three Authorized agent.");
      return false;
    }
  }
  return true;
}

function validateAuthAgentJsononAdd() {
  resetErrorList();
  if (modifyAA()) {
    addrow("dtAuthAgentDtls", "6", "7");
    return true;
  }
  return false;
}

function modifyAA() {
  resetErrorList();
  var rtnFlag = validateFormFields(authAgentJson);

  getErrTabToggle("TabView", "15");
  if (!rtnFlag) {
    tabview_switch("TabView", "15");
    hideAndShowTable("errorDiv");
  } else {
    if (beforeAddrowValidationAutherizedAgent()) return true;
    else return false;
  }
  return rtnFlag;
}
var authAgentJson = {
  field: [
    {
      name: "in_dtAuthAgentDtls_3",
      rule: [
        {
          required: "y",
          dispName: "Authorised Agent PIN",
          minLength: "11",
          maxLength: "11",
        },
      ],
    },
    {
      name: "in_dtAuthAgentDtls_7",
      rule: [
        {
          required: "y",
          type: "date",
          dispName: "Agent Authorization Date Since",
        },
      ],
    },
    {
      name: "in_dtAuthAgentDtls_8",
      rule: [
        {
          required: "n",
          type: "date",
          dispName: "Agent Authorization Date Upto",
        },
      ],
    },
  ],
};
function validateauthAgentJson(id) {
  var rtnFlag = validateFormFieldOnEvent(id, authAgentJson);
  getErrTabToggle("TabView", "15");
  if (!rtnFlag) {
    tabview_switch("TabView", "15");
    hideAndShowTable("errorDiv");
  }
  return rtnFlag;
}

function validateAuthorisedAgentDtls(pin) {
  toUpperPin(pin.id);
  if (validateAgentFields(pin.id)) {
    if (validatePIN(pin, "")) {
      getAgentDtls(pin, "");
    } else {
      document.getElementById("in_dtAuthAgentDtls_9").value = "";
      document.getElementById("in_dtAuthAgentDtls_4").value = "";
      document.getElementById("in_dtAuthAgentDtls_5").value = "";
      document.getElementById("in_dtAuthAgentDtls_6").value = "";
    }
  } else {
    document.getElementById("in_dtAuthAgentDtls_9").value = "";
    document.getElementById("in_dtAuthAgentDtls_4").value = "";
    document.getElementById("in_dtAuthAgentDtls_5").value = "";
    document.getElementById("in_dtAuthAgentDtls_6").value = "";
  }
}
function validateAgentFields(id) {
  var rtnFlag = validateFormFieldOnEvent(id, authAgentJson);
  getErrTabToggle("TabView", "15");
  if (!rtnFlag) {
    tabview_switch("TabView", "15");
    hideAndShowTable("errorDiv");
  }
  return rtnFlag;
}
function checkDisableSecAuth() {
  if (document.getElementById("in_dtAuthAgentDtls_3").disabled) {
    alert("Please enable this section");
    return false;
  } else return true;
}

function personAssosCheckDirectorPartner() {
  var rtnFlag = true;
  var srcTable = document.getElementById("dtPersonDtls");
  if (
    null != document.getElementById("cmbNIIdenBussTyp").value &&
    document.getElementById("cmbNIIdenBussTyp").value != "" &&
    document.getElementById("cmbNIIdenBussTyp").value == "COMP"
  ) {
    var countDirector = 0;
    var countIndiPin = 0;
    var assocEntPinNum = null;
    for (var r = 1; r < srcTable.rows.length; r++) {
      var colVal = document.getElementById("id_dtPersonDtls_" + r).value;
      //var modyfying=document.getElementById('id_dtPersonDtls_'+r+'_2').name;
      var del = document.getElementById("id_dtPersonDtls_" + r + "_1").name;
      var rowChecked = false;
      colValArray = colVal.split(columnsDelimiter);
      for (var i = 0; i < colValArray.length - 1; i++) {
        var propertyName = colValArray[i].split(propertyValueDelimiter)[0];
        var propertyValue = colValArray[i].split(propertyValueDelimiter)[1];
        if (
          null != propertyName &&
          propertyName != "" &&
          null != del &&
          del != ""
        ) {
          if (
            (propertyName == "associatedEntityType" ||
              propertyName == "cmbNIPABAsscNat") &&
            del.toUpperCase() != "DELETED" &&
            null != document.getElementById("id_dtPersonDtls_" + r + "_2") &&
            document
              .getElementById("id_dtPersonDtls_" + r + "_2")
              .name.toUpperCase() != "MODIFYING"
          ) {
            if (
              null != propertyValue &&
              propertyValue != "" &&
              propertyValue == "DIRECTOR"
            ) {
              if (!rowChecked) {
                countDirector++;
                rowChecked = true;
              }
            }
          }
          //
          else if (
            propertyName == "tin" &&
            colValArray[0].split(propertyValueDelimiter)[1] == "DIRECTOR" &&
            del.toUpperCase() != "DELETED" &&
            null != document.getElementById("id_dtPersonDtls_" + r + "_2") &&
            document
              .getElementById("id_dtPersonDtls_" + r + "_2")
              .name.toUpperCase() != "MODIFYING"
          ) {
            if (null != propertyValue && propertyValue != "") {
              assocEntPinNum = propertyValue;
              if (assocEntPinNum.substring(0, 1).toString() == "A") {
                countIndiPin++;
              }
            }
          }
          //
        }
      }
    }
    if (
      document.getElementById("isDstReg1") != null &&
      !document.getElementById("isDstReg1").checked
    ) {
      if (
        countDirector <
        parseInt(document.getElementById("PersonAssocMin").value)
      ) {
        alert(
          "Please add atleast " +
            document.getElementById("PersonAssocMin").value +
            " records of director in Persons associated with Business"
        );
        enableRequiredTab("in_dtPersonDtls_3");
        rtnFlag = false;
      }
      if (
        countDirector >
        parseInt(document.getElementById("PersonAssocMax").value)
      ) {
        alert(
          "Please add atmost " +
            document.getElementById("PersonAssocMax").value +
            " records of director in Persons associated with Business"
        );
        enableRequiredTab("in_dtPersonDtls_3");
        rtnFlag = false;
      }
      if (countIndiPin == 0) {
        alert("Please add atleast one Individual PIN as Director.");
        rtnFlag = false;
      }
    }
  } else if (
    null != document.getElementById("cmbNIIdenBussTyp").value &&
    document.getElementById("cmbNIIdenBussTyp").value != "" &&
    document.getElementById("cmbNIIdenBussTyp").value == "OTHERS" &&
    null != document.getElementById("cmbNIIdenBussSubTyp").value &&
    document.getElementById("cmbNIIdenBussSubTyp").value != "" &&
    document.getElementById("cmbNIIdenBussSubTyp").value == "PRTNRSHP"
  ) {
    var countPartner = 0;
    var total = 0;
    for (var r = 1; r < srcTable.rows.length; r++) {
      var colVal = document.getElementById("id_dtPersonDtls_" + r).value;
      //var modyfying=document.getElementById('id_dtPersonDtls_'+r+'_2').name;
      var del = document.getElementById("id_dtPersonDtls_" + r + "_1").name;
      colValArray = colVal.split(columnsDelimiter);
      for (var i = 0; i < colValArray.length - 1; i++) {
        var propertyName = colValArray[i].split(propertyValueDelimiter)[0];
        var propertyValue = colValArray[i].split(propertyValueDelimiter)[1];
        if (
          null != propertyName &&
          propertyName != "" &&
          null != del &&
          del != ""
        ) {
          if (
            (propertyName == "associatedEntityType" ||
              propertyName == "cmbNIPABAsscNat") &&
            del.toUpperCase() != "DELETED" &&
            null != document.getElementById("id_dtPersonDtls_" + r + "_2") &&
            document
              .getElementById("id_dtPersonDtls_" + r + "_2")
              .name.toUpperCase() != "MODIFYING"
          ) {
            if (
              null != propertyValue &&
              propertyValue != "" &&
              propertyValue == "PARTNER"
            ) {
              countPartner++;
            }
          } else if (
            propertyName == "profitLossSharingRatio" &&
            del.toUpperCase() != "DELETED" &&
            null != document.getElementById("id_dtPersonDtls_" + r + "_2") &&
            document
              .getElementById("id_dtPersonDtls_" + r + "_2")
              .name.toUpperCase() != "MODIFYING"
          ) {
            if (null != propertyValue && propertyValue != "") {
              if (!isNaN(propertyValue)) {
                total = Number(total) + eval(propertyValue);
              }
            }
          }
        }
      }
    }
    total = total.toFixed(2);
    if (countPartner < 2) {
      alert(
        "Please add atleast 2 records of partner in Persons associated with Business"
      );
      enableRequiredTab("in_dtPersonDtls_3");
      rtnFlag = false;
    }
    if (total > 100) {
      alert(
        "Please enter Profit / Loss Sharing Ratio between the Partner(s) such that the total is equal to 100 percent."
      );
      enableRequiredTab("in_dtPersonDtls_3");
      rtnFlag = false;
    } else if (total < 100 && total > 0) {
      alert(
        "Please enter Profit / Loss Sharing Ratio between the Partner(s) such that the total is equal to 100 percent."
      );
      enableRequiredTab("in_dtPersonDtls_3");
      rtnFlag = false;
    }
  }
  return rtnFlag;
}

function validateCaptcha(element) {
  var captchaValue = element.value;
  var captchaFlag = false;
  if (!checkCaptchaValue(element)) {
    return false;
  }
  FetchRegistrationDtl.validateCaptcha(captchaValue, {
    async: false,
    callback: function (data) {
      if (null != data && data) {
        captchaFlag = true;
      } else {
        captchaFlag = false;
      }
    },
    errorHandler: function (message) {
      alert(
        "There is some server issue. Please try again later for successful request."
      );
      return false;
    }, //Updated on 05/01/2014 for changing alert message in case server not found
  });

  return captchaFlag;
}

function checkAlphaNumeric(id) {
  var len, str, str1, i;
  str = document.getElementById(id).value;
  len = str.length;
  str1 =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:-_,/ .\n";
  for (i = 0; i < len; i++) {
    if (str1.indexOf(str.charAt(i)) == -1) {
      if (str.charCodeAt(i) == 13) continue;
      alert("Special Characters are not allowed");
      document.getElementById(id).value = "";
      return false;
    }
  }
  return true;
}
//added by hardik for migration
function fetchTxprCommonDtlsByPinMig(taxpayerPin, name, email) {
  if (null != taxpayerPin.value && taxpayerPin.value != "") {
    FetchRegistrationDtl.fetchTxprCommonDtlsByPinMig(taxpayerPin.value, {
      async: false,
      callback: function (data) {
        if (data != null) {
          if (data.isValidPin != null && data.isValidPin) {
            if (name != "" && data.taxPayerName != null)
              document.getElementById(name).value = data.taxPayerName;
            if (email != "" && data.taxPayerEmail != null)
              document.getElementById(email).value = data.taxPayerEmail;
            if (
              null != document.getElementById("txtSpouseGenderForCheck") &&
              data.gender != null
            ) {
              document.getElementById("txtSpouseGenderForCheck").value =
                data.gender;
            }
          } else {
            taxpayerPin.value = "";
            taxpayerPin.focus();
            alert("Please enter a Valid PIN");
          }
        } else {
          taxpayerPin.value = "";
          alert("Error in fetching data");
          taxpayerPin.focus();
        }
      },
      errorHandler: function (message) {
        alert("There is some server issue. Please try again later.");
        return false;
      }, //Updated on 05/01/2014 for changing alert message in case server not found
    });
  } else {
    return false;
  }
}

function showHideBankAccountDtls(compVal) {
  if (compVal == "Yes") {
    document.getElementById("divBankAccountDtls").style.display = "block";
  } else {
    document.getElementById("divBankAccountDtls").style.display = "none";
  }
}

function validateBankAccountFields(id) {
  var rtnFlag = validateFormFieldOnEvent(id, bankAccountJson);
  getErrTabToggle("TabView", "15");
  if (!rtnFlag) {
    tabview_switch("TabView", "15");
    hideAndShowTable("errorDiv");
  }
  return rtnFlag;
}
var bankAccountJson = {
  field: [
    {
      name: "cmbHaveBankAccountDtls",
      rule: [{ required: "y", dispName: "Do you have Bank Details" }],
    },
    {
      name: "cmbBankName",
      rule: [
        {
          required: "n",
          dispName: "Bank",
          dependent: [
            {
              ids: "cmbHaveBankAccountDtls",
              values: "Yes",
              rule: [{ required: "y" }],
            },
          ],
        },
      ],
    },
    {
      name: "cmbBnkBranch",
      rule: [
        {
          required: "n",
          dispName: "Branch",
          dependent: [
            {
              ids: "cmbHaveBankAccountDtls",
              values: "Yes",
              rule: [{ required: "y" }],
            },
          ],
        },
      ],
    },
    {
      name: "txtBankCity",
      rule: [
        {
          required: "n",
          dispName: "City",
          dependent: [
            {
              ids: "cmbHaveBankAccountDtls",
              values: "Yes",
              rule: [{ required: "y", type: "alpha", maxLength: "50" }],
            },
          ],
        },
      ],
    },
    {
      name: "txtBankAccName",
      rule: [
        {
          required: "n",
          dispName: "Account Holder's Name",
          dependent: [
            {
              ids: "cmbHaveBankAccountDtls",
              values: "Yes",
              rule: [
                {
                  required: "y",
                  type: "bussnamewithspecialchrs",
                  maxLength: "50",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "txtBnkAccNumber",
      rule: [
        {
          required: "n",
          dispName: "Account Number",
          dependent: [
            {
              ids: "cmbHaveBankAccountDtls",
              values: "Yes",
              rule: [
                { required: "y", type: "onlyalphanumeric", maxLength: "20" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

function getBankBranch(obj) {
  if (null != obj.value && obj.value != "") {
    FetchRegistrationDtl.fetchBankBranchDatabyBankId(obj.value, {
      async: false,
      callback: function (data) {
        if (data != "null" && data != null) {
          dwr.util.removeAllOptions("cmbBnkBranch");
          dwr.util.addOptions("cmbBnkBranch", data, "branchId", "branchName");
          document.getElementById("cmbBnkBranch").disabled = false;
          document.getElementById("cmbBnkBranch").className =
            "form101_combo form101_combo_width";
        } else {
          obj.value = "";
          dwr.util.removeAllOptions("cmbBnkBranch");
          document.getElementById("cmbBnkBranch").disabled = true;
          document.getElementById("cmbBnkBranch").className =
            "form101_combo form101_combo_width readonlyInput";
          //alert('Error found in fetching branch details');
          obj.focus();
        }
      },
      errorHandler: function (message) {
        alert("There is some server issue. Please try again later.");
        return false;
      }, //Updated on 05/01/2014 for changing alert message in case server not found
    });
  } else {
    dwr.util.removeAllOptions("cmbBnkBranch");
    document.getElementById("cmbBnkBranch").disabled = true;
    document.getElementById("cmbBnkBranch").className =
      "form101_combo form101_combo_width readonlyInput";
    return false;
  }
}

function checkDOBAndNID() {
  if (
    null != document.getElementById("txtTxprKENatId").value &&
    "" != document.getElementById("txtTxprKENatId").value
  ) {
    getNatRegDtlsByNIDAndDOB(
      document.getElementById("txtTxprKENatId"),
      document.getElementById("calKeTxprDOB"),
      document.getElementById("calKeTxprDOB")
    );
  } else return true;
}
function checkNssfNumber() {
  if (
    null != document.getElementById("txtTxprKENssfNo").value &&
    "" != document.getElementById("txtTxprKENssfNo").value
  ) {
    flag = chkValidateNssfNumber(
      document.getElementById("txtTxprKENssfNo").value
    );
    if (!flag) {
      document.getElementById("txtTxprKENssfNo").value = "";
    }
  } else return true;
}
function checkNssfNKENumber() {
  flag = true;
  if (
    null != document.getElementById("txtTxprNKENssfNo").value &&
    "" != document.getElementById("txtTxprNKENssfNo").value
  ) {
    flag = chkValidateNssfNumber(
      document.getElementById("txtTxprNKENssfNo").value
    );
    if (!flag) {
      document.getElementById("txtTxprNKENssfNo").value = "";
    }
  } else return true;
}

function checkNINssfNumber() {
  flag = true;
  if (
    null != document.getElementById("txtNITxprNssfNo").value &&
    "" != document.getElementById("txtNITxprNssfNo").value
  ) {
    flag = chkValidateNssfNumber(
      document.getElementById("txtNITxprNssfNo").value
    );
    if (!flag) {
      document.getElementById("txtNITxprNssfNo").value = "";
    }
  } else return true;
}

function checkNIDANDDOB() {
  if (
    null != document.getElementById("calKeTxprDOB").value &&
    "" != document.getElementById("calKeTxprDOB").value
  ) {
    getNatRegDtlsByNIDAndDOB(
      document.getElementById("txtTxprKENatId"),
      document.getElementById("calKeTxprDOB"),
      document.getElementById("txtTxprKENatId")
    );
  } else return true;
}

function checkAlienIDANDDOB() {
  if (
    null != document.getElementById("calNkeTxprDOB").value &&
    "" != document.getElementById("calNkeTxprDOB").value
  ) {
    getAlianDtlsByAIDAndDOB(
      document.getElementById("txtTxprNKEAlainId"),
      document.getElementById("calNkeTxprDOB"),
      document.getElementById("txtTxprNKEAlainId")
    );
  } else return true;
}

function checkDOBAndAlienID() {
  if (
    null != document.getElementById("txtTxprNKEAlainId").value &&
    "" != document.getElementById("txtTxprNKEAlainId").value &&
    "null" != document.getElementById("txtTxprNKEAlainId").value
  ) {
    getAlianDtlsByAIDAndDOB(
      document.getElementById("txtTxprNKEAlainId"),
      document.getElementById("calNkeTxprDOB"),
      document.getElementById("calNkeTxprDOB")
    );
  } else return true;
}

function limitText(limitField) {
  if (limitField.value.length > 400) {
    limitField.value = limitField.value.substring(0, 400);
    alert(
      "The maximum length for Other Reason is 400 characters.Please enter Other Reason having less than 400 characters"
    );
    return false;
  }
  return true;
}

function checkUpto(obj, sinceId) {
  var upto = obj.value;
  var since = document.getElementById(sinceId).value;

  if ("" != since) {
    if (fnCompareDates(upto, since)) {
      alert(
        "Authorization Date Upto should be after Authorization Date Since."
      );
      obj.value = "";
      obj.focus();
      return false;
    }
  }
  return true;
}
function checkSince(obj, upToId) {
  var since = obj.value;
  var upto = document.getElementById(upToId).value;

  if ("" != upto) {
    if (fnCompareDates(upto, since)) {
      alert(
        "Authorization Date Since should be before Authorization Date Upto."
      );
      obj.value = "";
      obj.focus();
      return false;
    }
  }
  return true;
}

//Added by Ravi Patel (537640)
function limitText(limitField, limitCount, limitNum) {
  if (limitField.value.length > limitNum) {
    limitField.value = limitField.value.substring(0, limitNum);
  } else {
    limitCount.value = limitNum - limitField.value.length;
  }
}
//Ended by Ravi Patel (537640)

function checkNIModifyingStatus() {
  var tabArr = new Array();

  var tab1 = new Array();
  tab1[0] = "dtEcoActDtls";
  tab1[1] = "Economic Activity Details";
  tabArr[0] = tab1;

  var tab2 = new Array();
  tab2[0] = "dtPlaceDtls";
  tab2[1] = "Additional Place of Business";
  tabArr[1] = tab2;

  var tab3 = new Array();
  tab3[0] = "dtPersonDtls";
  tab3[1] = "Persons associated with Business";
  tabArr[2] = tab3;

  var tab4 = new Array();
  tab4[0] = "dtAuthAgentDtls";
  tab4[1] = "Agent authorized";
  tabArr[3] = tab4;

  var tab5 = new Array();
  tab5[0] = "dtIADtls";
  tab5[1] = "Intermediary Agent";
  tabArr[4] = tab5;

  var tab6 = new Array();
  tab6[0] = "dtTributoryDtls";
  tab6[1] = "Tributary Bonds";
  tabArr[5] = tab6;

  var tab7 = new Array();
  tab7[0] = "estateTrust";
  tab7[1] = "Information of Beneficiary in case of Estate/Trusts";
  tabArr[6] = tab7;

  if (checkModifyingData(tabArr)) {
    return true;
  } else {
    return false;
  }
}

function checkIndiModifyingStatus() {
  var tabArr = new Array();

  var tab1 = new Array();
  tab1[0] = "dtPartTrstDtls";
  tab1[1] = "Partnership, Corporate and Trust Information";
  tabArr[0] = tab1;

  var tab2 = new Array();
  tab2[0] = "dtEmpDtls";
  tab2[1] = "Source of Income(Employment)";
  tabArr[1] = tab2;

  var tab3 = new Array();
  tab3[0] = "dtISBussDtls";
  tab3[1] = "Source of Income(Business)";
  tabArr[2] = tab3;

  var tab4 = new Array();
  tab4[0] = "dtRenDtls";
  tab4[1] = "Economic Activity";
  tabArr[3] = tab4;

  var tab5 = new Array();
  tab5[0] = "dtBussBrnchDtls";
  tab5[1] = "Additional Place of Business";
  tabArr[4] = tab5;

  var tab6 = new Array();
  tab6[0] = "dtAuthAgentDtls";
  tab6[1] = "Authorized Agent";
  tabArr[5] = tab6;

  var tab7 = new Array();
  tab7[0] = "dtIADtls";
  tab7[1] = "Intermediary Agent";
  tabArr[6] = tab7;

  var tab8 = new Array();
  tab8[0] = "dtTributoryDtls";
  tab8[1] = "Tributary Bonds";
  tabArr[7] = tab8;

  if (checkModifyingData(tabArr)) {
    return true;
  } else {
    return false;
  }
}

//Updated  by Foram Joshi
function checkAccMnthForAmendment(accMnth, compVal) {
  if (null != compVal && compVal != "" && accMnth != null && accMnth != "") {
    var oldMnth = parseInt(accMnth);
    var newMnth = parseInt(compVal);
    var curDate = new Date();
    var curMnth = parseInt(curDate.getMonth() + 1);
    var conValue = parseInt(newMnth + 12 - curMnth);
    if (oldMnth != newMnth) {
      if (conValue >= 12) {
        if (conValue - 12 < 6) {
          alert(
            "Request for change in Accounting Month under subsection (1A) must be made at least six months before the date to which the accounts are intended to be made up."
          );
          return false;
        }
      } else if (conValue < 6) {
        alert(
          "Request for change in Accounting Month under subsection (1A) must be made at least six months before the date to which the accounts are intended to be made up."
        );
        return false;
      }
    }
  }
  return true;
}
//Ended by Foram Joshi

function chkPndLiabAndBussForAmalComp(taxpayerPin, name, email) {
  if (null != taxpayerPin.value && taxpayerPin.value != "") {
    FetchRegistrationDtl.chkPndLiabAndBussForAmalComp(taxpayerPin.value, {
      async: false,
      callback: function (data) {
        if (data != null) {
          if (data.isValidPin != null && data.isValidPin) {
            var ispnd = false;
            var msg = "";
            var i = 1;
            if (data.isPndLiab != null && data.isPndLiab) {
              ispnd = true;
              //msg=i+") You have "+data.pndLiab.toFixed(2)+" pending liability.\n";
              msg =
                i +
                ") You have pending liability of " +
                data.pndLiab.toFixed(2) +
                "KSh.\n";
              i++;
            }
            if (data.isPndBuss != null && data.isPndBuss) {
              ispnd = true;
              //msg+=i+") You have "+data.pndBuss+" pending business.";
              msg += i + ") You have " + data.pndBuss + " pending return/s.";
            }

            if (!ispnd) {
              if (name != "" && data.taxPayerName != null)
                document.getElementById(name).value = data.taxPayerName;
              if (email != "" && data.taxPayerEmail != null)
                document.getElementById(email).value = data.taxPayerEmail;
              if (
                null != document.getElementById("txtSpouseGenderForCheck") &&
                data.gender != null
              ) {
                document.getElementById("txtSpouseGenderForCheck").value =
                  data.gender;
              }
            } else {
              taxpayerPin.value = "";
              document.getElementById(name).value = "";
              document.getElementById(email).value = "";
              document.getElementById("in_dtTributoryDtls_7").value = "";
              alert(msg);
            }
          } else {
            taxpayerPin.value = "";
            taxpayerPin.focus();
            alert("Please enter a Valid PIN");
          }
        } else {
          taxpayerPin.value = "";
          alert("Error in fetching data");
          taxpayerPin.focus();
        }
      },
      errorHandler: function (message) {
        alert("There is some server issue. Please try again later.");
        return false;
      }, //Updated on 05/01/2014 for changing alert message in case server not found
    });
  } else {
    return false;
  }
}

function checkPinStatusAmal(entityTypId, pinId, amalDtId) {
  if (null != document.getElementById(entityTypId).value) {
    var entityPin = document.getElementById(pinId).value;
    var amalDt = document.getElementById(amalDtId).value;
    if (
      null != entityPin &&
      entityPin != "" &&
      null != amalDt &&
      amalDt != ""
    ) {
      FetchRegistrationDtl.validatePinCnclAmalgamation(entityPin, amalDt, {
        async: false,
        callback: function (data) {
          if (null != data && data != "") {
            alert(data);
            document.getElementById("in_dtTributoryDtls_4").value = "";
            document.getElementById("in_dtTributoryDtls_5").value = "";
            document.getElementById("in_dtTributoryDtls_6").value = "";
          }
        },
        errorHandler: function (message) {
          alert("There is some server issue. Please try again later.");
        }, //Updated on 05/01/2014 for changing alert message in case server not found
      });
    }
  }
}

function enableDisableComp(compVal, depCompId) {
  if (compVal.toLowerCase() == "yes") {
    document.getElementById(depCompId).disabled = false;
    document.getElementById(depCompId).className =
      "form101_textfcurr form101_textfcurr_width";
  } else {
    document.getElementById(depCompId).value = "";
    document.getElementById(depCompId).disabled = true;
    document.getElementById(depCompId).className =
      "form101_textfcurr form101_textfcurr_width readonlyInput";
  }
}

function controlSectionByQues(tableId, sectionId, compVal) {
  if (compVal == "Y") {
    document.getElementById(sectionId).style.display = "block";
    return true;
  } else {
    document.getElementById(sectionId).style.display = "none";
    clearall(tableId);
    return true;
  }
}

function showHideBranchAsPerAddedData() {
  var showHideBrnchTab = false;
  var srcTable = document.getElementById("dtISBussDtls");
  var branchTabId = document.getElementById("form_indi_branch_tab_id").value;
  loopBranchData: for (var r = 1; r < srcTable.rows.length; r++) {
    var colVal = document.getElementById("id_dtISBussDtls_" + r).value;
    var del = document.getElementById("id_dtISBussDtls_" + r + "_1").name;
    colValArray = colVal.split(columnsDelimiter);
    for (var i = 0; i < colValArray.length - 1; i++) {
      var propertyName = colValArray[i].split(propertyValueDelimiter)[0];
      var propertyValue = colValArray[i].split(propertyValueDelimiter)[1];
      if (
        null != propertyName &&
        propertyName != "" &&
        null != del &&
        del != ""
      ) {
        if (
          propertyName == "addBusinessBranch" &&
          del.toUpperCase() != "DELETED"
        ) {
          if (
            null != propertyValue &&
            propertyValue != "" &&
            propertyValue == "Yes"
          ) {
            showHideBrnchTab = true;
            break loopBranchData;
          }
        }
      }
    }
  }

  if (showHideBrnchTab) {
    showTab("TabView", branchTabId);
  } else {
    hideTab("TabView", branchTabId);
    clearall("dtBussBrnchDtls");
  }
}

function isTabHide(TabViewId, id) {
  var TabView = document.getElementById(TabViewId);
  var Tabs = TabView.firstChild;
  while (Tabs.className != "Tabs") Tabs = Tabs.nextSibling;

  var Tab = Tabs.firstChild;
  var i = 0;
  var isHide = false;
  do {
    if (Tab.tagName == "A") {
      i++;
      if (i == id) {
        if (
          null != Tab.style.display &&
          Tab.style.display != "" &&
          Tab.style.display == "none"
        ) {
          isHide = true;
        }
        break;
      }
    }
  } while ((Tab = Tab.nextSibling));
  return isHide;
}

function validateAddRowQuestionForIndi() {
  if (
    !(
      (null != document.getElementById("isQuesPartDirtTrst1") &&
        document.getElementById("isQuesPartDirtTrst1").checked) ||
      (null != document.getElementById("isQuesPartDirtTrst2") &&
        document.getElementById("isQuesPartDirtTrst2").checked)
    )
  ) {
    alert(
      "Please select Are you a partner, director or trustee in any other entity?"
    );
    return false;
  } else if (
    null != document.getElementById("isQuesPartDirtTrst1") &&
    document.getElementById("isQuesPartDirtTrst1").checked
  ) {
    if (
      null != document.getElementById("counter_dtPartTrstDtls") &&
      document.getElementById("counter_dtPartTrstDtls").value == "0"
    ) {
      alert("Please add Entity Details(partner, director or trustee).");
      return false;
    }
  }
  if (
    !(
      (null != document.getElementById("isQuesTrbBond1") &&
        document.getElementById("isQuesTrbBond1").checked) ||
      (null != document.getElementById("isQuesTrbBond2") &&
        document.getElementById("isQuesTrbBond2").checked)
    )
  ) {
    alert("Please select Do you want to declare Tributary Bonds?");
    return false;
  } else if (
    null != document.getElementById("isQuesTrbBond1") &&
    document.getElementById("isQuesTrbBond1").checked
  ) {
    if (
      null != document.getElementById("counter_dtTributoryDtls") &&
      document.getElementById("counter_dtTributoryDtls").value == "0"
    ) {
      alert("Please add Tributary Bonds details.");
      return false;
    }
  }
  return true;
}

function validateNIAddRowQuestionNonIndi() {
  if (
    !(
      (null != document.getElementById("isQuesTrbBond2") &&
        document.getElementById("isQuesTrbBond2").checked) ||
      (null != document.getElementById("isQuesTrbBond1") &&
        document.getElementById("isQuesTrbBond1").checked)
    )
  ) {
    alert(
      "Please select Was your business was formed as a result of acquisition or amalgamation?"
    );
    return false;
  } else if (
    null != document.getElementById("isQuesTrbBond1") &&
    document.getElementById("isQuesTrbBond1").checked
  ) {
    if (
      null != document.getElementById("counter_dtTributoryDtls") &&
      document.getElementById("counter_dtTributoryDtls").value == "0"
    ) {
      alert("Please add Acquisition/Amalgamation details.");
      return false;
    }
  }
  return true;
}

function checkIndiTributaryQuestion() {
  if (
    null != document.getElementById("counter_dtTributoryDtls") &&
    "" != document.getElementById("counter_dtTributoryDtls")
  ) {
    var noOfRow = parseInt(
      document.getElementById("counter_dtTributoryDtls").value
    );
    if (noOfRow > 0) {
      document.getElementById("isQuesTrbBond1").checked = true;
      controlSectionByQues("dtTributoryDtls", "tributoryId", "Y");
    } else {
      document.getElementById("isQuesTrbBond2").checked = true;
      controlSectionByQues("dtTributoryDtls", "tributoryId", "N");
    }
  }
}

function checkIndiPartnerTrustQuestion() {
  if (
    null != document.getElementById("counter_dtPartTrstDtls") &&
    "" != document.getElementById("counter_dtPartTrstDtls")
  ) {
    var noOfRow = parseInt(
      document.getElementById("counter_dtPartTrstDtls").value
    );
    if (noOfRow > 0) {
      document.getElementById("isQuesPartDirtTrst1").checked = true;
      controlSectionByQues("dtPartTrstDtls", "secPartTrst", "Y");
    } else {
      document.getElementById("isQuesPartDirtTrst2").checked = true;
      controlSectionByQues("dtPartTrstDtls", "secPartTrst", "N");
    }
  }
}
function checkNonIndiTributaryQuestion() {
  if (
    null != document.getElementById("counter_dtTributoryDtls") &&
    "" != document.getElementById("counter_dtTributoryDtls")
  ) {
    var noOfRow = parseInt(
      document.getElementById("counter_dtTributoryDtls").value
    );
    if (noOfRow > 0) {
      document.getElementById("isQuesTrbBond1").checked = true;
      controlSectionByQues("dtTributoryDtls", "fldstTrbBobdNI", "Y");
    } else {
      document.getElementById("isQuesTrbBond2").checked = true;
      controlSectionByQues("dtTributoryDtls", "fldstTrbBobdNI", "N");
    }
  }
}

var ecoActList = new Array();

function getEcoSubDtls(obj, subactivityObj) {
  if (null != obj.value && obj.value != "") {
    document.getElementById(subactivityObj).className =
      "form101_combo form101_combo_width";
    afterEcoSubAct(obj.value, subactivityObj);
  } else {
    var subAct = document.getElementById(subactivityObj);
    subAct.options.length = 0;
    subAct.add(new Option("--Select--", ""));
    subAct.disabled = true;
  }
}
function afterEcoSubAct(parentId, gsubActivityObj) {
  document.getElementById(gsubActivityObj).options.length = 0;
  document.getElementById(gsubActivityObj).add(new Option("--Select--", ""));
  var optionId = "";
  var optionValue = "";
  var data = false;
  if (ecoActList.length == 0) {
    return false;
  }
  for (i = 0; i < ecoActList.length; i++) {
    if (parentId == ecoActList[i][2]) {
      data = true;
      var oOption = document.createElement("option");
      optionId = ecoActList[i][0];
      optionValue = ecoActList[i][1];

      oOption.text = optionValue;
      oOption.value = optionId;
      oOption.title = optionValue;

      document.getElementById(gsubActivityObj).add(oOption);
    }
  }
  if (data) {
    document.getElementById(gsubActivityObj).disabled = false;
  } else {
    document.getElementById(gsubActivityObj).className =
      "readonlyInput form101_combo_width";
    document.getElementById(gsubActivityObj).disabled = true;
    if (parentId == "22" || parentId == "23") {
      var str = gsubActivityObj;
      var res = str.split("s_");
      var num = parseInt(res[1]) + 1;
      var answer = res[0] + "s_" + num;

      document.getElementById(answer).options.length = 0;
      document.getElementById(answer).add(new Option("--Select--", ""));
      document.getElementById(answer).disabled = true;
      document.getElementById(answer).className =
        "readonlyInput form101_combo_width";

      num = parseInt(res[1]) + 2;
      answer = res[0] + "s_" + num;

      document.getElementById(answer).options.length = 0;
      document.getElementById(answer).add(new Option("--Select--", ""));
      document.getElementById(answer).disabled = true;
      document.getElementById(answer).className =
        "readonlyInput form101_combo_width";
    }
  }
}
function fetchSubDataNonIndi() {
  var srcTable = document.getElementById("dtEcoActDtls");

  for (var r = 1; r < srcTable.rows.length; r++) {
    if (
      document.getElementById("id_dtEcoActDtls_" + r + "_2").name == "Modifying"
    )
      colValArray = document
        .getElementById("id_dtEcoActDtls_" + r)
        .value.split(columnsDelimiter);
  }
  //for division
  var activityDivision = document.getElementById("in_dtEcoActDtls_5");
  if (
    subActDtls(
      colValArray[0].split(propertyValueDelimiter)[1],
      activityDivision
    )
  ) {
    activityDivision.disabled = false;

    activityDivision.value = colValArray[2].split(propertyValueDelimiter)[1];
    // for group
    var activityGroup = document.getElementById("in_dtEcoActDtls_6");

    subActDtls(colValArray[2].split(propertyValueDelimiter)[1], activityGroup);
    {
      activityGroup.disabled = false;
      activityGroup.value = colValArray[3].split(propertyValueDelimiter)[1];
      //for class
      /*var activityClass= document.getElementById('in_dtEcoActDtls_7');

		        		        	subActDtls(colValArray[3].split(propertyValueDelimiter)[1],activityClass) 
		        		        	{
		        		        			activityClass.disabled = false;	
		        		        		        	activityClass.value = colValArray[4].split(propertyValueDelimiter)[1];

		        		        		        	//for sub class
		        		        		        	var activitySubclass= document.getElementById('in_dtEcoActDtls_8');

		        		        		        	subActDtls(colValArray[4].split(propertyValueDelimiter)[1],activitySubclass) 
		        		        		        	{
	        		        		        			activitySubclass.disabled = false;	
		        		        		            	activitySubclass.value = colValArray[5].split(propertyValueDelimiter)[1];
		        		        		        	}
		        		            }*/
    }
  }
}

function fetchSubDataIndi() {
  var tab_id = "dtRenDtls";

  var srcTable = document.getElementById(tab_id);
  for (var r = 1; r < srcTable.rows.length; r++) {
    if (
      null != document.getElementById("id_" + tab_id + "_" + r + "_2") &&
      document.getElementById("id_" + tab_id + "_" + r + "_2").name ==
        "Modifying"
    )
      colValArray = document
        .getElementById("id_" + tab_id + "_" + r)
        .value.split(columnsDelimiter);
  }
  //for division
  var activityDivision = document.getElementById("in_" + tab_id + "_5");
  var activityGroup = document.getElementById("in_" + tab_id + "_6");
  var activityClass = document.getElementById("in_" + tab_id + "_7");
  var activitySubclass = document.getElementById("in_" + tab_id + "_8");
  subActDtls(colValArray[0].split(propertyValueDelimiter)[1], activityDivision);
  {
    activityDivision.disabled = false;
    activityDivision.value = colValArray[2].split(propertyValueDelimiter)[1];
    // for group
    subActDtls(colValArray[2].split(propertyValueDelimiter)[1], activityGroup);
    {
      activityGroup.disabled = false;
      activityGroup.value = colValArray[3].split(propertyValueDelimiter)[1];
      //for class
      subActDtls(
        colValArray[3].split(propertyValueDelimiter)[1],
        activityClass
      );
      {
        activityClass.disabled = false;
        activityClass.value = colValArray[4].split(propertyValueDelimiter)[1];
        //for sub class
        subActDtls(
          colValArray[4].split(propertyValueDelimiter)[1],
          activitySubclass
        );
        {
          activitySubclass.disabled = false;
          activitySubclass.value = colValArray[5].split(
            propertyValueDelimiter
          )[1];
        }
      }
    }
  }
}

function subActDtls(parentId, gsubActivityObj) {
  if (parentId != "null" && parentId != null && parentId != "") {
    gsubActivityObj.options.length = 0;
    gsubActivityObj.add(new Option("--Select--", ""));
    var optionId = "";
    var optionValue = "";
    var data = false;

    if (parentId != "22" && parentId != "23") {
      if (ecoActList.length == 0) {
        return false;
      }
      for (i = 0; i < ecoActList.length; i++) {
        if (parentId == ecoActList[i][2]) {
          data = true;
          var oOption = document.createElement("option");
          optionId = ecoActList[i][0];
          optionValue = ecoActList[i][1];

          oOption.text = optionValue;
          oOption.value = optionId;
          oOption.title = optionValue;

          gsubActivityObj.add(oOption);
        }
      }
      if (data) {
        gsubActivityObj.disabled = false;
      } else {
        /*gsubActivityObj.className = 'readonlyInput form101_combo_width';*/
        gsubActivityObj.disabled = true;
      }
    } else {
      gsubActivityObj.disabled = true;
      document.getElementById("in_dtEcoActDtls_6").options.length = 0;
      document
        .getElementById("in_dtEcoActDtls_6")
        .add(new Option("--Select--", ""));
      //document.getElementById("in_dtEcoActDtls_7").options.length=0;
      //document.getElementById("in_dtEcoActDtls_7").add(new Option("--Select--",""));

      document.getElementById("in_dtEcoActDtls_6").disabled = true;
      //document.getElementById("in_dtEcoActDtls_7").disabled = true;
    }
  }
  return true;
}

function checkCaptchaValue(captchaElement) {
  var captchaValue = captchaElement.value;
  var flag = true;
  var regExp = new RegExp(/^[0-9\-]*$/g);
  if (!regExp.test(captchaValue)) {
    /*alert("Please enter valid set of characters in captcha field.");
		captchaElement.value ='';*/
    flag = false;
    return flag;
  } else {
    if (!(captchaValue.indexOf("-") == -1 || captchaValue.indexOf("-") == 0)) {
      /* alert("Please enter valid set of characters in captcha field.(negative sign is allowed only for negative numbers in result)");
				captchaElement.value ='';*/
      flag = false;
      return flag;
    }
  }
  return flag;
}

/**
 * function to allow Today And Past Date
 * added by Garima Jain
 */

function allowTodayAndPastDateServer(dateId) {
  if (document.getElementById(dateId).value != "") {
    if (currntDate != "" && currntDate != null) {
      if (
        trim(currntDate) != trim(document.getElementById(dateId).value) &&
        fnCompareDates(currntDate, document.getElementById(dateId).value)
      ) {
        alert("Date cannot be a Future Date.");
        document.getElementById(dateId).value = "";
        document.getElementById(dateId).focus();
        return false;
      }
      return true;
    } else {
      //
      var serverDate = new Date();
      var curmonth = parseInt(serverDate.getMonth() + 1);
      if (curmonth < 10) {
        curmonth = "0" + curmonth;
      }
      var curyear = parseInt(serverDate.getFullYear());
      var curday = parseInt(serverDate.getDate());
      if (curday < 10) {
        curday = "0" + curday;
      }
      var todayDate = curday + "-" + curmonth + "-" + curyear;

      if (maxDate(dateId, todayDate)) {
        return true;
      } else {
        alert("Date should not be future date");
        document.getElementById(dateId).value = "";
        return false;
      }
      //
    }
  }
  return false;
}

function highlightCRFieldWithId(fieldId, isCombo) {
  if (document.getElementById(fieldId)) {
    document.getElementById(fieldId).style.backgroundColor = "#C96976";
    document.getElementById(fieldId).title = "This filed not require approval.";
  }
}

function highlightCRFieldWithName(fieldName, isCombo) {
  if (document.getElementsByName(fieldName)) {
    document.getElementsByName(fieldName)[0].style.backgroundColor = "#C96976";
    document.getElementsByName(fieldName)[0].title =
      "This filed not require approval.";
  }
}
function displayNote() {
  $("#div_autoapprovenote").fadeIn("slow");
}
function closeNote() {
  $("#div_autoapprovenote").fadeOut("slow");
}

function checkUniqueEmailBranch(branchEmail, amend) {
  var mainEmail = document.getElementById("txtNIIdenMainEmail").value;
  if (mainEmail.toUpperCase() == branchEmail.value.toUpperCase()) {
    alert(
      "Branch email address cannot be same as main email address of taxpayer."
    );
    branchEmail.value = "";
    return false;
  }
  if (amend == "Y") {
    if (
      null != document.getElementById("section3") &&
      document.getElementById("section3").checked
    ) {
      var email = branchEmail;
      isUnq = isUniqueEmailId(
        email,
        "BRCHCONT",
        document.getElementById("taxPayerId").value
      );
      return isUnq;
    } else {
      return true;
    }
  } else {
    var email = branchEmail;
    isUnq = isUniqueEmailId(email, "BRCHCONT", null);
    return isUnq;
  }
}

function allowdBranchChange(mainOblDate, obj) {
  if ("" != obj.value) {
    if (mainOblDate == obj.value) {
      return true;
    }
    var dt2 = parseInt(obj.value.substring(0, 2), 10);
    if (dt2 != "1") {
      alert(
        "Branch Obligation registration date can be either same as obligation registration date or Branch Obligation registration date can be form 1st of any month."
      );
      obj.value = "";
      obj.focus();
      return false;
    } else {
      return true;
    }
  }
}
function isBranchReturnFiled(obj, obliagtionId, taxpayerId) {
  var rtnFlg = false;
  if (
    null != obj.value &&
    obj.value != "" &&
    null != obliagtionId &&
    obliagtionId != ""
  ) {
    FetchRegistrationDtl.isBranchReturnFiled(
      obj.value,
      obliagtionId,
      taxpayerId,
      {
        async: false,
        callback: function (data) {
          if (null != data) {
            if (data == true) {
              alert(
                "You cannot amend branch obligation registration date as this branch hase already started retrun filing."
              );
              rtnFlg = true;
            }
          }
        },
        errorHandler: function (message) {
          alert("There is some server issue. Please try again later.");
          return false;
        },
      }
    );
  }
  return rtnFlg;
}

function allowdBranchChangeiPage(oblRolloutDate, obj) {
  //var oblAfterRollout
  if (null != oblRolloutDate && "" != oblRolloutDate) {
    if (dateCheck(oblRolloutDate, obj.value) && oblRolloutDate != obj.value) {
      alert(
        "Branch Obligation Registration cannot be before Rollout date of HQ which is " +
          oblRolloutDate
      );
      obj.value = "";
      obj.focus();
      return false;
    }
  }

  var dt2 = parseInt(obj.value.substring(0, 2), 10);
  if (dt2 != "1") {
    alert(
      "Branch Obligation registration date can be from 1st of any month after rollout date."
    );
    obj.value = "";
    obj.focus();
    return false;
  } else {
    return true;
  }
}

function branchDateIpageChk(todayDate, obj) {
  var branchOblDate = obj.value;
  var dt1 = parseInt(todayDate.substring(0, 2), 10);
  var mon1 = parseInt(todayDate.substring(3, 5), 10);
  var yr1 = parseInt(todayDate.substring(6, 10), 10);
  var dt2 = parseInt(branchOblDate.substring(0, 2), 10);
  var mon2 = parseInt(branchOblDate.substring(3, 5), 10);
  var yr2 = parseInt(branchOblDate.substring(6, 10), 10);

  if (mon2 == mon1 && dt2 == 1 && yr1 == yr2) {
    return true;
  } else {
    alert(
      "Branch obligation registration date should be 1st of current month."
    );
    obj.value = "";
    obj.focus();
    return false;
  }
}

function dateCheck(str1, str2) {
  var dt1 = parseInt(str1.substring(0, 2), 10);
  var mon1 = parseInt(str1.substring(3, 5), 10);
  mon1 = mon1 - 1;
  var yr1 = parseInt(str1.substring(6, 10), 10);
  var dt2 = parseInt(str2.substring(0, 2), 10);
  var mon2 = parseInt(str2.substring(3, 5), 10);
  mon2 = mon2 - 1;
  var yr2 = parseInt(str2.substring(6, 10), 10);
  var date = new Date(yr1, mon1, dt1);
  var date2 = new Date(yr2, mon2, dt2);
  if (date >= date2) return true;
  else return false;
}

function convertUpperCase(id) {
  if (document.getElementById(id) && document.getElementById(id).value != "") {
    document.getElementById(id).value = document
      .getElementById(id)
      .value.toUpperCase();
  }
}

//added by Margi for wht cert dt
function getWhtCertificateDate(obj, taxpayerId) {
  var rtnFlg = true;
  if (null != obj && null != taxpayerId) {
    if (
      null != obj.value &&
      obj.value != "" &&
      null != taxpayerId.value &&
      taxpayerId.value != ""
    ) {
      FetchRegistrationDtl.getWhtCertificateDate(taxpayerId.value, {
        async: false,
        callback: function (data) {
          if (null != data && data != "") {
            var txnDate = data;
            if (txnDate != null && txnDate != "") {
              if (Date.parse(txnDate) != Date.parse(obj)) {
                // if(!compareDateUptoandDateSince(txnDate,objName.value))
                if (!fnCompareDates(obj.value, txnDate)) {
                  alert(
                    "You have been given Withholding Credit for VAT obligation on Transaction Date " +
                      txnDate +
                      ". Please enter Value Added Tax Registration Date same as or before " +
                      txnDate +
                      " in Tax Obligation."
                  );
                  //obj.value= "";
                  obj.focus();
                  rtnFlg = false;
                } else if (isEqual(txnDate, obj.value)) {
                  rtnFlg = true;
                }
              }
              return true;
            }
          }
        },
        errorHandler: function (message) {
          alert("There is some server issue. Please try again later.");
          return false;
        },
      });
    }
  }
  return rtnFlg;
}
//added by shivangi

function validateNssfNumber(nssfNo) {
  var rtnFlg = true;
  if (null != nssfNo && nssfNo != "") {
    FetchRegistrationDtl.chkValidateNssfNumber(nssfNo, {
      async: false,
      callback: function (data) {
        if (null != data) {
          alert(data);

          document.getElementById("txtTxprKENssfNo").value = "";

          document.getElementById("txtTxprNKENssfNo").value = "";
        }
      },
      errorHandler: function (message) {
        alert("There is some server issue. Please try again later.");
        return false;
      },
    });
  }
  return rtnFlg;
}

//added  by  prakash  for  otp  generartion

function sendTheOTP(value) {
  var emailAddress = value;
  var rtnFlg = true;

  if (null != emailAddress && "" != emailAddress) {
    /*showProgressbar();*/
    var regtype = document.getElementById("regTypeOTP").value;
    //added by prakash for otp
    if (regtype == "OTP") {
      var refId = document.getElementById("taxPayerId").value;
      var refNo = document.getElementById("taxPayerId").value;
      var refType = "NEW_OTP";
      var category = "TPCONT";

      if (null != refId && refId != "") {
        FetchRegistrationDtl.isUniqueEmailId(emailAddress, category, refId, {
          async: false,
          callback: function (data) {
            if (null != data) {
              if (data == false) {
                alert(
                  "This Email id is already registered with another taxpayer/Branch."
                );
                document.getElementById("EmailId").value = "";
                //document.getElementById('sendOtp').style.display='none';
                document.getElementById("EmailId").focus();
                rtnFlg = false;
              }
              if (data == true) {
                FetchRegistrationDtl.sendOtp(
                  emailAddress,
                  refId,
                  refNo,
                  refType
                );
                showEnterOtpNverifyOtp();
                DisableSendOtpNEmailId();
                rtnFlg = false;
              }
            }
          },
          errorHandler: function (message) {
            alert("There is some server issue. Please try again later.");
            return false;
          },
        });
      }
    }

    if (regtype == "INDI") {
      var nationality = document.querySelector(
        'input[name="customVo.taxPayerIndDtlsDTO.citizenshipCode"]:checked'
      ).value;
      if (nationality == "KE") {
        document.getElementById("sendOtpKE").disabled = true;
        document.getElementById("otpTextKE").readOnly = false;
        document.getElementById("otpTextKE").className =
          "form101_textfcurr form101_textfcurr_width";
        var refId = document.getElementById("calKeTxprDOB").value;
        var refNo = document.getElementById("txtTxprKENatId").value;
        var refType = "EREG_IND";
      }
      if (nationality == "NKE") {
        document.getElementById("otpTextNK").readOnly = false;
        document.getElementById("otpTextNK").className =
          "form101_textfcurr form101_textfcurr_width";
        var refId = document.getElementById("calNkeTxprDOB").value;
        var refNo = document.getElementById("txtTxprNKEAlainId").value;
        var refType = "EREG_IND";
        document.getElementById("sendOtpNKE").disabled = true;
      }
      if (nationality == "NKENR") {
        document.getElementById("otpTextNKNR").readOnly = false;
        document.getElementById("otpTextNKNR").className =
          "form101_textfcurr form101_textfcurr_width";
        var refId = document.getElementById("calTxprNKENRDOB").value;
        var refNo = document.getElementById("txttxprNKENRPassNo").value;
        var refType = "EREG_IND";
        document.getElementById("sendOtpNKNR").disabled = true;
      }
    }

    if (regtype == "NONINDI") {
      var refId = document.getElementById("calSoiBussRegDt").value;
      var refNo = document.getElementById("txtSoiBussCertRegNum").value;
      var refType = "EREG_NIND";
      document.getElementById("sendOtpNONINDI").disabled = true;
    }
    if (regtype == "AMD_IND") {
      var nationality = document.querySelector(
        'input[name="customVo.taxPayerIndDtlsDTO.citizenshipCode"]:checked'
      ).value;
      if (nationality == "KE") {
        document.getElementById("sendOtpKE").disabled = true;
        document.getElementById("otpTextKE").readOnly = false;
        document.getElementById("otpTextKE").className =
          "form101_textfcurr form101_textfcurr_width";
        var refId = document.getElementById("taxPayerId").value;
        var refNo = document.getElementById("txtAmdPinNum").value;
        var refType = "AMD_IND";
      }
      if (nationality == "NKE") {
        document.getElementById("otpTextNK").readOnly = false;
        document.getElementById("otpTextNK").className =
          "form101_textfcurr form101_textfcurr_width";
        var refId = document.getElementById("taxPayerId").value;
        var refNo = document.getElementById("txtAmdPinNum").value;
        var refType = "AMD_IND";
        document.getElementById("sendOtpNKE").disabled = true;
      }
      if (nationality == "NKENR") {
        document.getElementById("otpTextNKNR").readOnly = false;
        document.getElementById("otpTextNKNR").className =
          "form101_textfcurr form101_textfcurr_width";
        var refId = document.getElementById("taxPayerId").value;
        var refNo = document.getElementById("txtAmdPinNum").value;
        var refType = "AMD_IND";
        document.getElementById("sendOtpNKNR").disabled = true;
      }
    }
    if (regtype == "AMD_NIND") {
      document.getElementById("otpText1").readOnly = false;
      document.getElementById("otpText1").className =
        "form101_textfcurr form101_textfcurr_width";
      var refId = document.getElementById("taxPayerId").value;
      var refNo = document.getElementById("txtAmdPinNum").value;
      var refType = "AMD_NIND";
      document.getElementById("sendOtpNONINDI").disabled = true;
    }

    if (regtype == "NONINDI_MIG") {
      document.getElementById("otpText1").readOnly = false;
      document.getElementById("otpText1").className =
        "form101_textfcurr form101_textfcurr_width";
      var refId = document.getElementById("taxPayerId").value;
      var refNo = document.getElementById("txtNIIdenExistPin").value;
      var refType = "NONDI_MIG";
      document.getElementById("sendOtpNONINDI").disabled = true;
    }

    if (regtype == "IND_MIG") {
      var nationality = document.querySelector(
        'input[name="customVo.taxPayerIndDtlsDTO.citizenshipCode"]:checked'
      ).value;
      if (nationality == "KE") {
        document.getElementById("sendOtpKE").disabled = true;
        document.getElementById("otpTextKE").readOnly = false;
        document.getElementById("otpTextKE").className =
          "form101_textfcurr form101_textfcurr_width";
        var refId = document.getElementById("taxPayerId").value;
        var refNo = document.getElementById("txtNIIdenExistPin").value;
        var refType = "IND_MIG";
      }
      if (nationality == "NKE") {
        document.getElementById("sendOtpNKE").disabled = true;
        document.getElementById("otpTextNK").readOnly = false;
        document.getElementById("otpTextNK").className =
          "form101_textfcurr form101_textfcurr_width";
        var refId = document.getElementById("taxPayerId").value;
        var refNo = document.getElementById("txtNIIdenExistPin").value;
        var refType = "IND_MIG";
      }
      if (nationality == "NKENR") {
        document.getElementById("sendOtpNKNR").disabled = true;
        document.getElementById("otpTextNKNR").readOnly = false;
        document.getElementById("otpTextNKNR").className =
          "form101_textfcurr form101_textfcurr_width";
        var refId = document.getElementById("taxPayerId").value;
        var refNo = document.getElementById("txtNIIdenExistPin").value;
        var refType = "IND_MIG";
      }
    }

    if (rtnFlg == true) {
      FetchRegistrationDtl.sendOtp(emailAddress, refId, refNo, refType);
    }
  } else {
    alert("please enter email address");
  }
}
//added by prakash  for  verifiaction  of otp
function ValidateOTP() {
  var OTP = document.getElementById("encryptedOTP").value;
  var rcpntIntrmKey = document.getElementById("rcpntIntrmKey").value;
  var regtype = document.getElementById("regTypeOTP").value;
  if (null != OTP && "" != OTP) {
    if (regtype == "OTP") {
      var mail = document.getElementById("EmailId").value;
      var emailAddress = document.getElementById("emailID").value;
      var code = "TPCONT";
      var refId = document.getElementById("taxPayerId").value;
      var refNo = document.getElementById("taxPayerId").value;
      var refType = "NEW_OTP";
    }

    FetchRegistrationDtl.verifyOTP(OTP, refId, refNo, refType, rcpntIntrmKey, {
      async: false,
      callback: function (message) {
        if (null != message) {
          if (message === "4") {
            alert(
              "The Code you have entered is invalid, please note that you are left with four more attempts."
            );
          }
          if (message === "3") {
            alert(
              "The Code you have entered is invalid, please note that you are left with three more attempts."
            );
          }
          if (message === "2") {
            alert(
              "The Code you have entered is invalid, please note that you are left with two more attempts."
            );
          }
          if (message === "SUCCESS") {
            if (regtype == "OTP") {
              if (mail != emailAddress) {
                FetchRegistrationDtl.updateEmail(mail, refId, code);
              }

              alert(
                "Your Email verification process for " +
                  mail +
                  " has been completed. To proceed click OK."
              );
              document.getElementById("ISEmailVerified").value = "Y";

              //DisablePopUps();
              //goHome();
            }
          }
          if (message === "LASTATTEMPT") {
            alert(
              "The Code you have entered is invalid, please note that you are left with one more attempt."
            );
          }
          if (message === "OTP_INACTIVATED") {
            alert(
              "Please note that you have exceeded maximum number of unsuccessful attempts. You will be redirected to homepage and you are requested to validate your email again by login in KRA iTax Portal."
            );
            document.OTPForm.action = "main.htm";

            document.getElementById("actionCode").value =
              "showSessionOutHomePage";

            document.OTPForm.submit();
          }
        }
      },
    });
  } else {
    document.getElementById("EnterOtp").style.backgroundColor =
      "rgb(226, 98, 80)";
    alert("Please enter Verification Code.");
    return false;
  }
}

function showEnterOtpNverifyOtp() {
  document.getElementById("enterOtp").style.display = "block";
  document.getElementById("verifyOtp").style.display = "block";
}

function DisableSendOtpNEmailId() {
  document.getElementById("EmailId").disabled = true;
  document.getElementById("send").disabled = true;
  document.getElementById("send").style.color = "#d4d6d8";
  document.getElementById("send").style.cursor = "not-allowed";
}

/* added by gaurav :START */

function getSubGroup(obj) {
  if (null != obj.value && obj.value != "") {
    FetchRegistrationDtl.fetchSubProfessionDataById(obj.value, {
      async: false,
      callback: function (data) {
        if (data != "null" && data != null) {
          dwr.util.removeAllOptions("subgroup");
          dwr.util.addOptions(
            "subgroup",
            data,
            "cpmSubProfessionMstId",
            "subProfession"
          );
          document.getElementById("subgroup").disabled = false;
          document.getElementById("subgroup").className =
            "form101_combo form101_combo_width";
        } else {
          obj.value = "";
          dwr.util.removeAllOptions("subgroup");
          document.getElementById("subgroup").disabled = true;
          document.getElementById("subgroup").className =
            "form101_combo form101_combo_width readonlyInput";
          //alert('Error found in fetching branch details');
          obj.focus();
        }
      },
      errorHandler: function (message) {
        alert("There is some server issue. Please try again later.");
        return false;
      }, //Updated on 05/01/2014 for changing alert message in case server not found
    });
  } else {
    dwr.util.removeAllOptions("cmbBnkBranch");
    document.getElementById("cmbBnkBranch").disabled = true;
    document.getElementById("cmbBnkBranch").className =
      "form101_combo form101_combo_width readonlyInput";
    return false;
  }
}

//addded by Gaurav:END

//Start::added for TRE:MOM-Economic activity and profession change  :Ali(978185)

function updateEcoActivityNonindi() {
  var section = document.getElementById("section").value;
  var group = document.getElementById("group").value;
  var description = document.getElementById("description").value;
  var updateId = document.getElementById("EcoActId").value;

  if (
    section != null &&
    "" != section &&
    group != null &&
    "" != group &&
    description != null &&
    "" != description &&
    updateId != null &&
    "" != updateId
  ) {
    FetchRegistrationDtl.updateEcoActivityNonindi(
      section,
      group,
      description,
      updateId,
      {
        async: false,
        callback: function (message) {
          if (null != message) {
            if (message === "success") {
              alert("Selected Economic Activities updated Successfully");
              document.getElementById("EcoActUpdate").value = "Y";

              // DisablePopUps();
              //goHome();
            } else {
              alert(
                "There is issue in updating data.Kindly update on your next login"
              );
              DisablePopUps();
              goHome();
            }
          }
        },
      }
    );
  } else {
    alert("Please select economic activities to be updated.");
    return false;
  }
}

function updateProfessionIndi() {
  var major = document.getElementById("majorgrp").value;
  var sub = document.getElementById("subgrp").value;
  var minor = document.getElementById("minorgrp").value;
  var taxPayerId = document.getElementById("taxPayerId").value;

  if (
    major != null &&
    "" != major &&
    sub != null &&
    "" != sub &&
    minor != null &&
    "" != minor
  ) {
    FetchRegistrationDtl.updateProfessionIndi(major, sub, minor, taxPayerId, {
      async: false,
      callback: function (message) {
        if (null != message) {
          if (message === "success") {
            alert("Selected Profession updated Successfully");
            document.getElementById("proffUpdate").value = "Y";
            // DisablePopUps();
            // goHome();
          } else {
            alert(
              "There is issue in updating data.Kindly update on your next login"
            );
            DisablePopUps();
            goHome();
          }
        }
      },
    });
  } else {
    alert("Please select profession to be updated.");
    return false;
  }
}

function checkisUpdatedEcoAct() {
  var flag1 = false;
  if (
    document.getElementById("EcoActUpdate").value != null &&
    document.getElementById("EcoActUpdate").value === "N"
  ) {
    flag1 = true;
    return flag1;
  }
  return flag1;
}

function isEmailVerified() {
  var flag = false;
  if (
    document.getElementById("ISEmailVerified").value != null &&
    document.getElementById("ISEmailVerified").value === "N"
  ) {
    flag = true;
    return flag;
  }
  return flag;
}

/* Mobile OTP : START*/
function ValidateMobileOTP() {
  var OTP = document.getElementById("EnterSMSOtp").value;
  var regtype = document.getElementById("regTypeOTP").value; //TODO: verify the element
  if (null != OTP && "" != OTP) {
    if (regtype == "OTP") {
      var mobile_number = document.getElementById("MobileNo").value;
      var mobileNumber = document.getElementById("MobileNo").value;
      var code = "TPCONT";
      var refId = document.getElementById("taxPayerId").value;
      var refNo = document.getElementById("taxPayerId").value;
      var refType = "SMSOTP";
    }

    FetchRegistrationDtl.verifyMobileOtp(
      OTP,
      mobileNumber,
      refId,
      refNo,
      refType,
      {
        async: false,
        callback: function (message) {
          if (null != message) {
            if (message === "4") {
              alert(
                "The Code you have entered is invalid, please note that you are left with four more attempts."
              );
            }
            if (message === "3") {
              alert(
                "The Code you have entered is invalid, please note that you are left with three more attempts."
              );
            }
            if (message === "2") {
              alert(
                "The Code you have entered is invalid, please note that you are left with two more attempts."
              );
            }
            if (message === "SUCCESS") {
              if (regtype == "OTP") {
                if (mobile_number != mobileNumber) {
                  //FetchRegistrationDtl.updateEmail(mail,refId,code);
                }

                alert(
                  "Your mobile number verification process for " +
                    mobileNumber +
                    " has been completed. To proceed click OK."
                );
                document.getElementById("isMobileVerified").value = "Y";

                //DisablePopUps();
                //goHome();
                //document.getElementById('OTP').style.display="none";
              }
            }
            if (message === "LASTATTEMPT") {
              alert(
                "The Code you have entered is invalid, please note that you are left with one more attempt."
              );
            }
            if (message === "OTP_INACTIVATED") {
              alert(
                "Please note that you have exceeded maximum number of unsuccessful attempts. You will be redirected to homepage and you are requested to validate your mobile number again by login in KRA iTax Portal."
              );
              document.OTPForm.action = "main.htm";

              document.getElementById("actionCode").value =
                "showSessionOutHomePage";

              document.OTPForm.submit();
            }
          }
        },
      }
    );
  } else {
    document.getElementById("EnterOtp").style.backgroundColor =
      "rgb(226, 98, 80)";
    alert("Please enter Verification Code.");
    return false;
  }
}
function isMobileVerified() {
  var flag = false;
  console.log("OTP :: " + document.getElementById("isMobileVerified").value);
  if (
    document.getElementById("isMobileVerified").value != null &&
    document.getElementById("isMobileVerified").value === "N"
  ) {
    //	    if(document.getElementById("isMobileVerified").value === '')
    flag = true;
    return flag;
  }
  return flag;
}
/* Mobile OTP : END*/

function checkisUpdatedProfession() {
  var flag1 = false;
  if (
    document.getElementById("proffUpdate").value != null &&
    document.getElementById("proffUpdate").value === "N"
  ) {
    flag1 = true;
    return flag1;
  }
  return flag1;
}

function selectSubProffByMajor(majorId, subId, subtValue) {
  var selectedMajorId = "";
  var isSubProfessionComboLength = 0;

  selectedMajorId = document.getElementById(majorId).value;
  isSubProfessionComboLength = document.getElementById(subId).length;

  for (var i = isSubProfessionComboLength; i > 0; i--) {
    document.getElementById(subId).remove(i);
  }

  if (selectedMajorId != "") {
    var index = 0;
    var arrayLength = subProfessionArray.length;
    while (index < arrayLength) {
      if (subProfessionArray[index].majorProfessionId == selectedMajorId) {
        var optionObj = document.createElement("option");
        optionObj.text = subProfessionArray[index].description;
        optionObj.value = subProfessionArray[index].subProfessionId;
        optionObj.title = subProfessionArray[index].description;
        if (subtValue == subProfessionArray[index].subProfessionId) {
          optionObj.selected = "selected";
        }
        document.getElementById(subId).options[
          document.getElementById(subId).options.length
        ] = optionObj;
      }
      index++;
    }
  }
}
function selectMinorProffBySub(subId, minorId, minorvalue) {
  var selectedSubId = "";
  var isMinorComboLength = 0;

  selectedSubId = document.getElementById(subId).value;
  isMinorComboLength = document.getElementById(minorId).length;

  for (var i = isMinorComboLength; i > 0; i--) {
    document.getElementById(minorId).remove(i);
  }
  if (selectedSubId != "") {
    var index = 0;
    var arrayLength = minorProfessionArray.length;
    while (index < arrayLength) {
      if (minorProfessionArray[index].subProfessionId == selectedSubId) {
        var optionObj = document.createElement("option");
        optionObj.text = minorProfessionArray[index].description;
        optionObj.value = minorProfessionArray[index].minorProfessionId;
        optionObj.title = minorProfessionArray[index].description;
        if (
          minorvalue &&
          minorvalue == minorProfessionArray[index].minorProfessionId
        ) {
          optionObj.selected = "selected";
        }

        document.getElementById(minorId).options[
          document.getElementById(minorId).options.length
        ] = optionObj;
      }
      index++;
    }
  }
}

function hideLogout() {
  document.getElementById("logOut").style.display = "none";
}

function getMinorGroup(obj) {
  if (null != obj && obj != "") {
    FetchRegistrationDtl.fetchMinorProfessionDataById(obj, {
      async: false,
      callback: function (data) {
        if (data != "null" && data != null) {
          dwr.util.removeAllOptions("minorgroup");
          dwr.util.addOptions(
            "minorgroup",
            data,
            "cpmMinorProfessionMstId",
            "minorProfession"
          );
          document.getElementById("minorgroup").disabled = false;
          document.getElementById("minorgroup").className =
            "form101_combo form101_combo_width";
        } else {
          obj.value = "";
          dwr.util.removeAllOptions("minorgroup");
          document.getElementById("minorgroup").disabled = true;
          document.getElementById("minorgroup").className =
            "form101_combo form101_combo_width readonlyInput";
          //alert('Error found in fetching branch details');
          obj.focus();
        }
      },
      errorHandler: function (message) {
        alert("There is some server issue. Please try again later.");
        return false;
      }, //Updated on 05/01/2014 for changing alert message in case server not found
    });
  } else {
    dwr.util.removeAllOptions("minorgroup");
    document.getElementById("minorgroup").disabled = true;
    document.getElementById("minorgroup").className =
      "form101_combo form101_combo_width readonlyInput";
    return false;
  }
}

function checkvalidation() {
  var a = document.getElementById("proffUpdate").value;
  var b = document.getElementById("EcoActUpdate").value;
  var c = document.getElementById("ISEmailVerified").value;
  var d = document.getElementById("isMobileVerified").value;

  if (a == "N" || b == "N" || c == "N" || d == "N") {
    return false;
  }
  DisablePopUps();
  goHome();
  return true;
}

/* 15/10/2021  */

function DisablePopUps() {
  document.getElementById("overlay").style.display = "none";
  DisableModalPopUps();
}

function DisableModalPopUps() {
  document.getElementById("OTP").style.display = "none";
  //window.location=window.location+"#OTP";
}
/* 15/10/2021  */

function disableprofession() {
  document.getElementById("cmbTxprProfId").disabled = true;
  document.getElementById("cmbTxprProfId").className =
    "form101_combo form101_combo_width readonlyInput";

  document.getElementById("subgroup").disabled = true;
  document.getElementById("subgroup").className =
    "form101_combo form101_combo_width readonlyInput";

  document.getElementById("minorgroup").disabled = true;
  document.getElementById("minorgroup").className =
    "form101_combo form101_combo_width readonlyInput";
}

function totchanges() {
  var idval = null;

  if (document.getElementById("rdoCiti1").checked == true) {
    idval = "txtTxprKELoc";
  } else if (document.getElementById("rdoCiti2").checked == true) {
    idval = "txtTxprNKELoc";
  } else if (document.getElementById("rdoCiti3").checked == true) {
    idval = "txtTxprNKENRLoc";
  } else {
    alert("please select citizenship");
    document.getElementById("isTotReg2").checked = true;
    return false;
  }
  if (idval == "txtTxprNKENRLoc") {
    // document.getElementById('chkIncTaxTo').disabled=false;
    document.getElementById(idval + "AddLine1").value = "TOT Recruitment";
    // document.getElementById(idval + 'Building').className='form101_combo form101_combo_width readonlyInput';
    // document.getElementById(idval + 'Building').readOnly=true;

    document.getElementById(idval + "AddLine2").value =
      "Times Tower-TOT Recruitment";
    // document.getElementById(idval + 'StrtRoad').className='form101_combo form101_combo_width readonlyInput';
    //document.getElementById(idval + 'StrtRoad').readOnly=true;

    document.getElementById(idval + "AddLine3").value = "Nairobi ";
    //document.getElementById(idval + 'City').className='form101_combo form101_combo_width readonlyInput';
    // document.getElementById(idval + 'City').readOnly=true;
  } else {
    // document.getElementById('chkIncTaxTo').disabled=false;
    document.getElementById(idval + "Building").value = "TOT Recruitment";
    // document.getElementById(idval + 'Building').className='form101_combo form101_combo_width readonlyInput';
    // document.getElementById(idval + 'Building').readOnly=true;

    document.getElementById(idval + "StrtRoad").value =
      "Times Tower-TOT Recruitment";
    // document.getElementById(idval + 'StrtRoad').className='form101_combo form101_combo_width readonlyInput';
    //document.getElementById(idval + 'StrtRoad').readOnly=true;

    document.getElementById(idval + "City").value = "Nairobi ";
    //document.getElementById(idval + 'City').className='form101_combo form101_combo_width readonlyInput';
    // document.getElementById(idval + 'City').readOnly=true;

    document.getElementById(idval + "County").value = 30;
    // document.getElementById(idval + 'County').className='form101_combo form101_combo_width readonlyInput';
    //document.getElementById(idval + 'County').readOnly=true;
    selectDistrictByCountry("txtTxprKELocCounty", "txtTxprKELocDistrict");

    document.getElementById(idval + "District").value = 4375;
    // document.getElementById(idval + 'District').className='form101_combo form101_combo_width readonlyInput';
    //document.getElementById(idval + 'District').readOnly=true;
    selectLocalityByDistrict("txtTxprKELocDistrict", "txtTxprKELocLocality");

    document.getElementById(idval + "Locality").value = 637;
    // document.getElementById(idval + 'Locality').className='form101_combo form101_combo_width readonlyInput';
    // document.getElementById(idval + 'Locality').readOnly=true;

    document.getElementById(idval + "postalCode").value = "TOTPostal";
    //document.getElementById(idval + 'postalCode').className='form101_combo form101_combo_width readonlyInput';
    //document.getElementById(idval + 'postalCode').readOnly=true;

    document.getElementById(idval + "Town").value = "00000";
    //document.getElementById(idval + 'Town').className='form101_combo form101_combo_width readonlyInput';
    //document.getElementById(idval + 'Town').readOnly=true;

    document.getElementById(idval + "POBox").value = "0000";
    //document.getElementById(idval + 'POBox').className='form101_combo form101_combo_width readonlyInput';
    //document.getElementById(idval + 'POBox').readOnly=true;
  }

  document.getElementById(idval + "MainEmail").value =
    "TOT.RECRUITMENT@KRA.GO.KE";
  setbusinessEmailTot(idval);

  document.getElementById("cmbIsAlterAdd").value = "No";
  // document.getElementById('cmbIsAlterAdd').className='form101_combo form101_combo_width readonlyInput';
  //document.getElementById('cmbIsAlterAdd').disabled=true;

  document.getElementById("cmbHaveBankAccountDtls").value = "No";
  //document.getElementById('cmbHaveBankAccountDtls').className='form101_combo form101_combo_width readonlyInput';
  //document.getElementById('cmbHaveBankAccountDtls').disabled=true;

  document.getElementById("isQuesPartDirtTrst2").checked = true;
  //document.getElementById('isQuesPartDirtTrst2').disabled=true;

  document.getElementById("isQuesTrbBond2").checked = true;

  document.getElementById("chkIncTaxTo").checked = true;
  turnoverTaxClicked(document.getElementById("chkIncTaxTo"));
  //document.getElementById('chkIncTaxTo').disabled=true;
  //date format

  var today = document.getElementById("sysDate").value;

  /*	 var today = new Date();
	 var dd = today.getDate();

	 var mm = today.getMonth()+1; 
	 var yyyy = today.getFullYear();
	 if(dd<10) 
	 {
	     dd='0'+dd;
	 } 

	 if(mm<10) 
	 {
	     mm='0'+mm;
	 }
	 
	 today = dd+'/'+mm+'/'+yyyy;*/

  //date format

  document.getElementById("regDtIncTaxTo").value = today;

  ////document.getElementById('regDtIncTaxTo').className='form101_combo form101_combo_width readonlyInput';
  //document.getElementById('regDtIncTaxTo').readOnly=true;
  document.getElementById("divregDtIncTaxTo").style.display = "none";

  document.getElementById("txtPSTaxSupplyNextYr").value = 0.0;
  document.getElementById("txtPSTaxSupplyNextYr").disabled = false;
  document.getElementById("txtPSExSupplyNextYr").value = 0.0;
  document.getElementById("txtPSExSupplyNextYr").disabled = false;
  document.getElementById("txtPSExportedNextYr").value = 0.0;
  document.getElementById("txtPSExportedNextYr").disabled = false;

  document.getElementById("cmbSoiEmpIncome").value = "No";
  document.getElementById("cmbSoiRentalInc").value = "No";

  document.getElementById("cmbSoiBussInc").value = "Yes";
  thirdOnchange("cmbSoiBussInc");
  showHideBussActDiv("Yes");
  showHideEcoAct();

  //document.getElementById('in_dtISBussDtls_3').value='TOT';
  document.getElementById("in_dtISBussDtls_7").value = today;
  document.getElementById("in_dtISBussDtls_4").value = "TOT Recruitment";
  document.getElementById("in_dtISBussDtls_8").value = today;
  document.getElementById("in_dtISBussDtls_9").value =
    "TOT Recruitment,Times Tower, Nairobi , Kasarani District, Roysambu, 00000 ";
  document.getElementById("in_dtISBussDtls_11").value = "No";
  document.getElementById("in_dtISBussDtls_14").value = "No";
  // document.getElementById('in_dtISBussDtls_5').value= document.getElementById(idval + 'MobNo1').value;
  // document.getElementById('in_dtISBussDtls_6').value= document.getElementById(idval + 'MainEmail').value;

  //bussActAdd();

  //document.getElementById('a_dtISBussDtls').href=null;

  document.getElementById("in_dtRenDtls_3").value = 819;
  getEcoSubDtls(document.getElementById("in_dtRenDtls_3"), "in_dtRenDtls_5");
  document.getElementById("in_dtRenDtls_5").value = 820;
  getEcoSubDtls(document.getElementById("in_dtRenDtls_5"), "in_dtRenDtls_6");
  document.getElementById("in_dtRenDtls_6").value = 821;
  document.getElementById("in_dtRenDtls_4").value = "P";

  addRentalDtls();
}

function isNotTot() {
  if (document.getElementById("isTotReg1").checked) {
    return false;
  } else {
    return true;
  }
}

function setbusinessContactTot() {
  var idval = "txtTxprKELoc";
  document.getElementById("in_dtISBussDtls_5").value = document.getElementById(
    idval + "MobNo1"
  ).value;
}

function setbusinessEmailTot(idval) {
  // var idval='txtTxprKELoc';
  document.getElementById("in_dtISBussDtls_6").value = document.getElementById(
    idval + "MainEmail"
  ).value;
}

function disabletot() {
  document.getElementById("isTot").style.display = "none";
}

function enabletot() {
  document.getElementById("isTot").style.display = "block";
}

function totchangesAmendment() {
  var idval = null;

  if (document.getElementById("rdoCiti1").checked == true) {
    idval = "txtTxprKELoc";
  }
  if (document.getElementById("rdoCiti2").checked == true) {
    idval = "txtTxprNKELoc";
  }
  if (document.getElementById("rdoCiti3").checked == true) {
    idval = "txtTxprNKENRLoc";
  }

  document.getElementById("chkIncTaxTo").disabled = false;
  if (idval == "txtTxprNKENRLoc") {
    // document.getElementById('chkIncTaxTo').disabled=false;
    document.getElementById(idval + "AddLine1").value = "TOT Recruitment";
    // document.getElementById(idval + 'Building').className='form101_combo form101_combo_width readonlyInput';
    // document.getElementById(idval + 'Building').readOnly=true;

    document.getElementById(idval + "AddLine2").value =
      "Times Tower-TOT Recruitment";
    // document.getElementById(idval + 'StrtRoad').className='form101_combo form101_combo_width readonlyInput';
    //document.getElementById(idval + 'StrtRoad').readOnly=true;

    document.getElementById(idval + "AddLine3").value = "Nairobi ";
    //document.getElementById(idval + 'City').className='form101_combo form101_combo_width readonlyInput';
    // document.getElementById(idval + 'City').readOnly=true;
  } else {
    if (document.getElementById(idval + "Building").value == "") {
      document.getElementById(idval + "Building").value = "TOT Recruitment";
      //document.getElementById(idval + 'Building').className='form101_combo form101_combo_width readonlyInput';
      // document.getElementById(idval + 'Building').readOnly=true;
    }

    if (document.getElementById(idval + "StrtRoad").value == "") {
      document.getElementById(idval + "StrtRoad").value =
        "Times Tower-TOT Recruitment";
      //document.getElementById(idval + 'StrtRoad').className='form101_combo form101_combo_width readonlyInput';
      // document.getElementById(idval + 'StrtRoad').readOnly=true;
    }

    if (document.getElementById(idval + "City").value == "") {
      document.getElementById(idval + "City").value = "Nairobi ";
      // document.getElementById(idval + 'City').className='form101_combo form101_combo_width readonlyInput';
      // document.getElementById(idval + 'City').readOnly=true;
    }

    if (document.getElementById(idval + "County").value == "") {
      document.getElementById(idval + "County").value = 30;
      // document.getElementById(idval + 'County').className='form101_combo form101_combo_width readonlyInput';
      // document.getElementById(idval + 'County').readOnly=true;
      selectDistrictByCountry(idval + "County", idval + "District");
    }

    if (document.getElementById(idval + "District").value == "") {
      document.getElementById(idval + "District").value = 4375;
      //document.getElementById(idval + 'District').className='form101_combo form101_combo_width readonlyInput';
      // document.getElementById(idval + 'District').readOnly=true;
      selectLocalityByDistrict(idval + "District", idval + "Locality");
    }

    if (document.getElementById(idval + "Locality").value == "") {
      document.getElementById(idval + "Locality").value = 637;
      // document.getElementById(idval + 'Locality').className='form101_combo form101_combo_width readonlyInput';
      // document.getElementById(idval + 'Locality').readOnly=true;
    }

    if (document.getElementById(idval + "postalCode").value == "") {
      document.getElementById(idval + "postalCode").value = "TOTPostal";
      // document.getElementById(idval + 'postalCode').className='form101_combo form101_combo_width readonlyInput';
      //document.getElementById(idval + 'postalCode').readOnly=true;
    }

    if (document.getElementById(idval + "Town").value == "") {
      document.getElementById(idval + "Town").value = "00000";
      // document.getElementById(idval + 'Town').className='form101_combo form101_combo_width readonlyInput';
      //document.getElementById(idval + 'Town').readOnly=true;
    }

    if (document.getElementById(idval + "POBox").value == "") {
      document.getElementById(idval + "POBox").value = "0000";
      // document.getElementById(idval + 'POBox').className='form101_combo form101_combo_width readonlyInput';
      //document.getElementById(idval + 'POBox').readOnly=true;
    }
  }

  document.getElementById("cmbIsAlterAdd").value = "No";
  // document.getElementById('cmbIsAlterAdd').className='form101_combo form101_combo_width readonlyInput';
  //document.getElementById('cmbIsAlterAdd').disabled=true;

  document.getElementById("cmbHaveBankAccountDtls").value = "No";
  //document.getElementById('cmbHaveBankAccountDtls').className='form101_combo form101_combo_width readonlyInput';
  //document.getElementById('cmbHaveBankAccountDtls').disabled=true;

  document.getElementById("isQuesPartDirtTrst2").checked = true;
  //document.getElementById('isQuesPartDirtTrst2').disabled=true;
  document.getElementById("isQuesTrbBond2").checked = true;

  document.getElementById("chkIncTaxTo").checked = true;
  turnoverTaxClicked(document.getElementById("chkIncTaxTo"));
  // document.getElementById('chkIncTaxTo').disabled=true;
  //date format
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = dd + "/" + mm + "/" + yyyy;

  //date format

  //document.getElementById('regDtIncTaxTo').value=today;

  //changes for ITR disabled

  document.getElementById("chkIncTaxResi").disabled = true;

  document.getElementById("txtPSTaxSupplyNextYr").value = 0.0;
  //document.getElementById('txtPSTaxSupplyNextYr').disabled=true;
  document.getElementById("txtPSExSupplyNextYr").value = 0.0;
  // document.getElementById('txtPSExSupplyNextYr').disabled=true;
  document.getElementById("txtPSExportedNextYr").value = 0.0;
  //document.getElementById('txtPSExportedNextYr').disabled=true;

  //changes for itr reg date alignment
  document.getElementById("itrMand").style.display = "inline";

  document.getElementById("cmbSoiEmpIncome").value = "No";
  document.getElementById("cmbSoiRentalInc").value = "No";

  if (document.getElementById("cmbSoiBussInc").value == "No") {
    document.getElementById("cmbSoiBussInc").value = "Yes";
    thirdOnchange("cmbSoiBussInc");
    showHideBussActDiv("Yes");
    showHideEcoAct();

    //document.getElementById('in_dtISBussDtls_3').value='TOT';
    document.getElementById("in_dtISBussDtls_7").value = today;
    document.getElementById("in_dtISBussDtls_4").value = "TOT Recruitment";
    document.getElementById("in_dtISBussDtls_8").value = today;
    document.getElementById("in_dtISBussDtls_9").value =
      "TOT Recruitment,Times Tower, Nairobi , Kasarani District, Roysambu, 00000 ";
    document.getElementById("in_dtISBussDtls_11").value = "No";
    document.getElementById("in_dtISBussDtls_14").value = "No";
    document.getElementById("in_dtISBussDtls_5").value =
      document.getElementById(idval + "MobNo1").value;
    document.getElementById("in_dtISBussDtls_6").value =
      document.getElementById(idval + "MainEmail").value;

    //bussActAdd();
  }

  //check source of income section of amendment
  document.getElementById("amdEcoAct").click();

  //document.getElementById('a_dtISBussDtls').href=null;
  if (document.getElementById("dtRenDtls").rows.length == 1) {
    document.getElementById("in_dtRenDtls_3").value = 819;
    getEcoSubDtls(document.getElementById("in_dtRenDtls_3"), "in_dtRenDtls_5");
    document.getElementById("in_dtRenDtls_5").value = 820;
    getEcoSubDtls(document.getElementById("in_dtRenDtls_5"), "in_dtRenDtls_6");
    document.getElementById("in_dtRenDtls_6").value = 821;
    document.getElementById("in_dtRenDtls_4").value = "P";

    addRentalDtls();
  }
}

function setemailTotKE() {
  document.getElementById("txtTxprKELocMainEmail").value =
    "TOT.RECRUITMENT@KRA.GO.KE";
}

function setemailTotNKE() {
  document.getElementById("txtTxprNKELocMainEmail").value =
    "TOT.RECRUITMENT@KRA.GO.KE";
}

function setemailTotNKENR() {
  document.getElementById("txtTxprNKENRLocMainEmail").value =
    "TOT.RECRUITMENT@KRA.GO.KE";
}
//End::added for TRE:MOM-Economic activity and profession change  :Ali(978185)
