//main JSP
function saveNonIndiDDEFormAutoApproved()
{
   document.regPinNonIndiDDEForm.action="${pageContext.request.contextPath}/frontController.do?actionCode=KRASUBMITPINNONINDDDEFRM&isAutoApprv=1";
       document.regPinNonIndiDDEForm.submit();
}

function saveNIDDEFormSendForVerf()
{
  resetErrorList();
  if(checkforPinSec1() && checkMandatoryDocumentforSubmission() && checkBenefProfLossRatio() && checkFormDatesonSubmit() && chechNonIndiBranchDtl() && chkPersonAssBussRow() && personAssosCheckDirectorPartner() && calculateAnnualTO('REG') )
  {
    if(obligationCheck('dtPlaceDtls',3))
    {
      if(obligationCheck('dtIADtls',1))
      {
        
        var rtnFlag;
        
        if(document.getElementById('isDstReg1').checked){
addConactJson.field[15].rule[0].rule = [{"required":"n","type":"bussnamewithspecialchrs","minLength":"1","maxLength":"50"}];
addConactJson.field[15].rule[0].type="bussnamewithspecialchrs";
addConactJson.field[15].rule[0].dispName ="Name of Contact Person";

}
else{
addConactJson.field[15].rule[0].rule = [{"required":"n","type":"email","minLength":"5","maxLength":"50"}];
addConactJson.field[15].rule[0].type="email";
addConactJson.field[15].rule[0].dispName ="Secondary Email Address"; 
}
        rtnFlag =validateFormFields(bussDetailsJson,addConactJson,smsSubJson,tribBondRadioJson,oblisec2Json,subsidiaryJson,triAddConactJson,bankAccountJson);
        getErrTabToggle('TabView','15');	
        if(rtnFlag)
        {
          var actCounter = 0;
          var tab_id ='dtEcoActDtls';
          var srcTable = document.getElementById(tab_id);
          var isEcoRow=false;
          for (var r = 1; r < srcTable.rows.length; r++){
            colValArray = (document.getElementById("id_"+tab_id+"_"+r).value).split(columnsDelimiter);
            isEcoRow=true;
                if(trim(colValArray[1].split(propertyValueDelimiter)[1]).toLowerCase()=='p' && document.getElementById('id_'+tab_id+'_'+r+'_1').name!='deleted'
                  && null!=document.getElementById('id_'+tab_id+'_'+r+'_2') &&   document.getElementById('id_'+tab_id+'_'+r+'_2').name!='Modifying')
                    {
                    actCounter ++ ;
                    
                    }
            }
          if(!isEcoRow)
          {
            alert('Please select atleast one Economic Activity');
            enableRequiredTab('in_dtEcoActDtls_3');
            return false;
          }
          if (actCounter == 0)
          {
            alert('Please select primary Type for atleast one Economic Activity');
            enableRequiredTab('in_dtEcoActDtls_3');
            return false;
          }
          
          var vatBool = true;
          //var tribuAddBool = true;
          var estateTrustBool = true;
          
          if(document.getElementById('chkNIObliVat').checked)
            vatBool = validatevatJsonForm();
          
          if(vatBool &&  estateTrustBool)
            {
            
            if(null!=document.getElementById('txtNIIdenExistPin').value && document.getElementById('txtNIIdenExistPin').value!='')
            {
              disabledElements(document.getElementById('page2'),false);
            }
            if(null == document.getElementById("eserviceFlag").value || document.getElementById("eserviceFlag").value== "" || document.getElementById("eserviceFlag").value == 'null')
            {
              if(document.getElementById('captcahText') != null && document.getElementById('captcahText').value=="")
              {
                alert('Please enter answer of the arithmetic operation.');
                enableRequiredTab('captcahText');
                return false;
              }
              else
              {
                if(!validateCaptcha(document.getElementById('captcahText')))
                {
                  alert("You did not enter the correct value for the Arithmetical Question field. Please read the expression and enter the correct the answer");
                  document.getElementById('captcahText').value='';	
                  enableRequiredTab('captcahText');
                  ajaxCaptchaLoad();
                  return false;
                }
              }
            }
            if(!checkNIModifyingStatus()){
              return false;
            }
            var emailId=document.getElementById('txtNIIdenMainEmail').value;
            alert("You have registered "+emailId+" as your primary email address in iTax. All further communications from iTax system will be sent to this email-id, please click on yes to confirm that you would to receive all communication throuhg the email you have provided.");

            
            
            //to check otp field
            
            if(document.getElementById('sendOtpNONINDI').disabled == false)
               {
               alert('Please click "Send OTP" button to get OTP at your mentioned email addrress.');
               return false;
               }
               
            
            
             var otp=document.getElementById('otpText1').value;
             if(otp == null || otp == "")
               {
               
               alert('Please Enter OTP');
               return false;
               }
            
            //to check otp field
            
            
            
            if(confirm('Do you want to submit the data?'))
            {
              //for special char handling in add rows : START
              if(document.getElementById('dtPlaceDtls'))
              createSkipFieldForAddRow('dtPlaceDtls','eRegForm');
              if(document.getElementById('estateTrust'))
              createSkipFieldForAddRow('estateTrust','eRegForm');
              if(document.getElementById('dtIADtls'))
              createSkipFieldForAddRow('dtIADtls','eRegForm');
              if(document.getElementById('dtPersonDtls'))
              createSkipFieldForAddRow('dtPersonDtls','eRegForm');
              if(document.getElementById('dtTributoryDtls'))
              createSkipFieldForAddRow('dtTributoryDtls','eRegForm');
              if(document.getElementById('dtAuthAgentDtls'))
              createSkipFieldForAddRow('dtAuthAgentDtls','eRegForm');
              //for special char handling in add rows : END
              document.getElementById('accMonth').disabled=false;
              disabledElements(document.getElementById('page2'),false);
              document.getElementById('cmbNIIdenBussTyp').disabled=false;
              document.getElementById('cmbNIIdenBussSubTyp').disabled=false;
              document.getElementById('txtSoiBussCertRegNum').disabled=false;
              document.getElementById('cmbRegSubComp').disabled=false;
              disableSubmit();
              if(null!=document.getElementById("eserviceFlag").value && document.getElementById("eserviceFlag").value== "eservices"){
                  document.regPinNonIndiDDEForm.action="eRegIndi.htm?actionCode=saveNonIndiOnlineFormByIA";
                  submitform(document.regPinNonIndiDDEForm);
              }
              else
                {
                  document.regPinNonIndiDDEForm.action="eRegIndi.htm?actionCode=saveNonIndiOnlineForm";
                  submitform(document.regPinNonIndiDDEForm);
                }
              //document.regPinNonIndiDDEForm.submit();
            }
            else
            {
              isPINExists(document.getElementById('txtNIIdenExistPin'));
              
            }
          }
        }else
        {
          tabview_switch('TabView', '15');
          hideAndShowTable("errorDiv");
          getErrTabToggle('TabView','15');	
        }
      }
    }
  }
}

function disableSubmit()
{
  document.getElementById('saveReg6').disabled=true;
  document.getElementById('saveRegET').disabled=true;
}
//JSP 1
function setBussSubtype()
{
  var subType =document.getElementById('cmbNIIdenBussSubTyp');
  subType.disabled=false;
  subType.className='form101_combo form101_combo_width';
  subType.options.length=0;
  subType.options[0]=new Option("--Select--","");
  var selectedValue=document.getElementById('cmbNIIdenBussTyp').value;
  if(selectedValue=="COMP")
  {
    subType.options[1]=new Option("Public Company","PUBCOMP");
    subType.options[2]=new Option("Private Company","PVTCOMP");
    // subType.options[3]=new Option("Parastatal Company","PARSCOMP");
    subType.options[3]=new Option("Foreign Company","FRGNCOMP");
    subType.options[4]=new Option("EPZ Company","EPZCOMP");
    subType.options[5]=new Option("SEZ Company","SEZCOMP");

  }
  else if(selectedValue=="GOVINS")
  {
    subType.options[1]=new Option("Ministry","MINISTRY");
    subType.options[2]=new Option("Parastatal Company","PARASCOM");
    subType.options[3]=new Option("Local Authority","LOCAUTH");
  }
  else if(selectedValue=="OTHERS")
  {
    subType.options[1]=new Option("Club, Society or Association","CLSOCASS");
    //subType.options[2]=new Option("Estate or Trusts","ESTTRST");
    subType.options[2]=new Option("Partnership","PRTNRSHP");
    subType.options[3]=new Option("Government Schools","GOVTSCHL");
    //added by Gaurav: START
    subType.options[4]=new Option("Estates","ESTAT");
    subType.options[5]=new Option("Private Trust (With beneficiary)","PVTTRST");
    subType.options[6]=new Option("Corporate Trust (Without beneficiary)","CORPTRST");
    //added by Gaurav: END
    //added by Pharis,Sam and Vincent: START
    subType.options[7]=new Option("Family Trust","FMTRST");
    //added by Pharis,Sam and Vincent: End
    //added by Ruth on 24/01/2022: START
    subType.options[8]=new Option("Political Party","PLTCPTY");
    subType.options[9]=new Option("Trade Union","TRDUNION");
    //added by Ruth on 24/01/2022: End
  } 
  else
  {
    subType.disabled=true;
    subType.className='form101_combo form101_combo_width readonlyInput';
  }

}

// for economic activity list 

function clearEcoActRow(){

  document.getElementById('cmbNIEcoActcode').value='';
  document.getElementById('cmbSubActcode').value='';
  document.getElementById('cmbNIIdenmainYesOrNo').value='';
  document.getElementById('txtNIIdentradeName').value='';
  
}
function disablePin(){
  if(document.getElementById('txtNIIdenExistPinN').checked)
  {
    document.getElementById('txtNIIdenExistPin').value='';
    document.getElementById('txtNIIdenExistPin').disabled = true;
    document.getElementById('txtNIIdenExistPin').className = 'form101_textfcurr form101_textfcurr_width readonlyInput';
  }
  else
  {
    document.getElementById('txtNIIdenExistPin').disabled = false;
    document.getElementById('txtNIIdenExistPin').className = 'form101_textfcurr form101_textfcurr_width';
    //document.getElementById('txtNIIdenExistPin').focus();
  }
}
//JSP 2
function showHideRegDate(displayFlag,compId) {/*
  //displayTdLblId = compId + 'RegLbl';
  imgButton = 'div'+textId;
  if(displayFlag)
  {
    //document.getElementById(displayTdLblId).style.display='block';
    //document.getElementById(displayTdDtId).style.display='block';
    document.getElementById(textId).disabled = false;
    document.getElementById(textId).className='form101_textfcurr form101_textfcurr_width textonlyRight';
    document.getElementById(imgButton).style.display='block';
    
    // document.getElementById(textId).value='';
  }else
  {
    //document.getElementById(displayTdLblId).style.display='none';
    //document.getElementById(displayTdDtId).style.display='none';
    document.getElementById(textId).disabled = true;
    document.getElementById(textId).className='form101_textfcurr form101_textfcurr_width textonlyRight readonlyInput';
    document.getElementById(imgButton).style.display='none';
    // document.getElementById(textId).value='';
  }*/
  displayTdLblId = compId + 'RegLbl';
  displayTdDtId = compId + 'RegDt';
  imgButton = 'div'+compId;
  //displayTdRowId = compId + 'Row';
  if (displayFlag) {
    document.getElementById(displayTdLblId).style.display = 'block';
    document.getElementById(displayTdDtId).style.display = 'block';
    document.getElementById(imgButton).style.display='block';
    document.getElementById(compId).className='form101_textfcurr form101_textfcurr_width textonlyRight';
    //document.getElementById(displayTdRowId).style.display = 'block';
  } else {
    document.getElementById(displayTdLblId).style.display = 'none';
    document.getElementById(displayTdDtId).style.display = 'none';
    document.getElementById(imgButton).style.display='none';
  //document.getElementById(displayTdRowId).style.display = 'none';
  }
}
//JSP 3

function clearPlaceDtlsRow(){
   document.getElementById('txtNIAddPBbranchName').value='';
  
  document.getElementById('txtNIAddPBLR').value='';
  document.getElementById('txtNIAddPBBuilding').value='';
  document.getElementById('txtNIAddPBStrtRoad').value='';
  document.getElementById('txtNIAddPBArea').value='';
  document.getElementById('cmbNIAddPBCity').value='';	
  document.getElementById('cmbNIAddPBDistrict').value='';
  document.getElementById('txtArNIAddPBDescAddr').value='';
  
  document.getElementById('cmbNIAddPBPostalCode').value='';
  document.getElementById('cmbNIAddPBTown').value='';
  document.getElementById('txtNIAddPBPOBox').value='';
  
  document.getElementById('txtNIAddPBTelNo').value='';
  document.getElementById('txtNIAddPBMobNo').value='';
  document.getElementById('txtNIAddPBMainEmail').value='';
  document.getElementById('txtNIAddPBSecEmail').value='';
  
  document.getElementById('txtNIAddPBwebsite').value='';
  
  document.getElementById('chkNIAddPBITComp').value='';
  document.getElementById('calNIAddPBregDtITComp').value='';
  
  document.getElementById('chkNIAddPBITPrtnr').value='';
  document.getElementById('calNIAddPBregDtITPrtnr').value='';
  
  document.getElementById('chkNIAddPBITWth').value='';
  document.getElementById('calNIAddPBregDtITWth').value='';
  
  document.getElementById('chkNIAddPBITPaye').value='';
  document.getElementById('calNIAddPBregDtITPaye').value='';
  
  document.getElementById('chkNIAddPBVat').value='';
  document.getElementById('calNIAddPBregDtVat').value='';
  
  document.getElementById('chkNIAddPBImpVatServ').value='';
  document.getElementById('calNIAddPBregDtImpVatServ').value='';
  
  
}

//JSP 4

function clearPersonDtlsRow(){
  //document.getElementById('txtNIPABNidNum').value='';
  document.getElementById('txtNIPABFName').value='';
  document.getElementById('txtNIPABMName').value='';
  document.getElementById('txtNIPABLName').value='';	
  document.getElementById('calNIPABDOB').value='';
  document.getElementById('rdoNIPABsexM').value='';
  document.getElementById('rdoNIPABsexF').value='';
  document.getElementById('txtNIPABBlockNo').value='';
  document.getElementById('txtNIPABBuilding').value='';
  document.getElementById('txtNIPABStrtRoad').value='';
  document.getElementById('txtNIPABCity').value='';
  document.getElementById('txtNIPABCounty').value='';
  document.getElementById('txtNIPABDistrict').value='';
  document.getElementById('txtNIPABLocality').value='';
  document.getElementById('txtNIPABDescAddr').value='';
  
  document.getElementById('txtNIPABpostalCode').value='';
  document.getElementById('txtNIPABTown').value='';
  document.getElementById('txtNIPABPOBox').value='';
  
  document.getElementById('txtNIPABAddLine1').value='';
  document.getElementById('txtNIPABAddLine2').value='';
  document.getElementById('txtNIPABAddLine3').value='';
  document.getElementById('txtNIPABAddCntry').value='';
  
  document.getElementById('txpSoiBussNm').value='';
  document.getElementById('txpSoiBussCommDt').value='';
  document.getElementById('txpSoiBussRegDt').value='';	
  document.getElementById('txpSoiBussCertRegNum').value='';
  
}
function chkNonIndiIndi()
{
  document.getElementById('indDetails').style.display='';
  document.getElementById('nonIndiDetails').style.display='none';
}
function validateAsscPrsnDtlsPin(pin)
{
  toUpperPin(pin.id);
  
  if(validatePersonAssoBussJson(pin.id))
  {
    if(document.getElementById('in_dtPersonDtls_3').value=='PARTNER'||document.getElementById('in_dtPersonDtls_3').value=='DIRECTOR')
      {
        if(validatePIN(pin,''))
        {
          fetchRegTxprInfoFrmPin(pin);
        }
        else
        {
          clearPersonDtlsRow();
        }
      }
    
    else 	
    {
      if(validatePIN(pin,'INDI'))
      {
        fetchRegTxprInfoFrmPin(pin);
      }
      else
      {
        clearPersonDtlsRow();
      }
    }
  }
  else
  {
    clearPersonDtlsRow();
  }
  
  
}

function fetchRegTxprInfoFrmPin(objPin){
  if(null!=objPin.value && objPin.value!='')
    {   
    FetchRegistrationDtl.fetchRegTxprInfoFrmPin(objPin.value, {async:false,callback:function(data) {
      if(data != 'null' &&  data != null){
        if(data != null)
        {
          if(data.isMigrated!=null && data.isMigrated)
          {
            document.getElementById('isMigrated').value=data.isMigrated;
            document.getElementById('in_dtPersonDtls_4').value='';
            alert('Please register Directors/Partner PIN on iTax first before registering the company PIN.');
            return false;
          }
          //added by margi for enhancement-1 CR: limited liability partnership changes:16/12/2016
          if(data.txprNonindiDtlDTO!= null && data.taxPayerType=='NONINDI')
          {
            if(data.txprNonindiDtlDTO.businessType !=null && data.txprNonindiDtlDTO.businessType !='' && data.txprNonindiDtlDTO.businessType =='OTHERS' && data.txprNonindiDtlDTO.businessSubtype !=null && data.txprNonindiDtlDTO.businessSubtype !='' && data.txprNonindiDtlDTO.businessSubtype =='PRTNRSHP')
              {							
            document.getElementById('in_dtPersonDtls_4').value='';
            alert('Please enter Valid IT2C Registred PIN in Partner PIN.');
            return false;
               }
            else
            {
            if(data.txprNonindiDtlDTO.businessName!=null && data.txprNonindiDtlDTO.businessName!='')
              document.getElementById('txpSoiBussNm').value=data.txprNonindiDtlDTO.businessName;
            if(data.txprNonindiDtlDTO.businessCommencedDtStr!=null && data.txprNonindiDtlDTO.businessCommencedDtStr!='')
              document.getElementById('txpSoiBussCommDt').value=data.txprNonindiDtlDTO.businessCommencedDtStr;
            if(data.txprNonindiDtlDTO.bussRegDateStr!=null && data.txprNonindiDtlDTO.bussRegDateStr!='')
              document.getElementById('txpSoiBussRegDt').value=data.txprNonindiDtlDTO.bussRegDateStr;
            if(data.txprNonindiDtlDTO.bussCertRegNum!=null && data.txprNonindiDtlDTO.bussCertRegNum!='')
              document.getElementById('txpSoiBussCertRegNum').value=data.txprNonindiDtlDTO.bussCertRegNum;
            document.getElementById('indDetails').style.display='none';
            document.getElementById('nonIndiDetails').style.display='';
            /*if(data.txprIndDtlsDTO.middleName!=null && data.txprIndDtlsDTO.middleName!='')
              document.getElementById('txtNIPABMName').value=data.txprIndDtlsDTO.middleName;
            if(data.txprIndDtlsDTO.middleName!=null && data.txprIndDtlsDTO.middleName!='')
              document.getElementById('txtNIPABMName').value=data.txprIndDtlsDTO.middleName;
            if(data.txprIndDtlsDTO.middleName!=null && data.txprIndDtlsDTO.middleName!='')
              document.getElementById('txtNIPABMName').value=data.txprIndDtlsDTO.middleName;*/
            }
          }
          if(data.txprIndDtlsDTO!= null && data.taxPayerType=='INDI'){
            /*if(data.txprIndDtlsDTO.nidNo!=null && data.txprIndDtlsDTO.nidNo!='')
              document.getElementById('txtNIPABNidNum').value=data.txprIndDtlsDTO.nidNo;*/
            if(data.txprIndDtlsDTO.firstName!=null && data.txprIndDtlsDTO.firstName!='')
              document.getElementById('txtNIPABFName').value=data.txprIndDtlsDTO.firstName;
            if(data.txprIndDtlsDTO.middleName!=null && data.txprIndDtlsDTO.middleName!='')
              document.getElementById('txtNIPABMName').value=data.txprIndDtlsDTO.middleName;
            if(data.txprIndDtlsDTO.surName!=null && data.txprIndDtlsDTO.surName!='')
              document.getElementById('txtNIPABLName').value=data.txprIndDtlsDTO.surName;
            if(data.txprIndDtlsDTO.birthDt!=null && data.txprIndDtlsDTO.birthDt!='')
            {
            var month = "";
            if(data.txprIndDtlsDTO.birthDt.getMonth()+1<10)
               month = "0"+(data.txprIndDtlsDTO.birthDt.getMonth()+1);
            else
               month = data.txprIndDtlsDTO.birthDt.getMonth()+1;
            document.getElementById('calNIPABDOB').value=data.txprIndDtlsDTO.birthDt.getDate()+"/"+(month)+"/"+
              data.txprIndDtlsDTO.birthDt.getFullYear();
            }
            if(data.txprIndDtlsDTO.gender!=null && data.txprIndDtlsDTO.gender!='')
            {
              if(data.txprIndDtlsDTO.gender=='M')
                document.getElementById('rdoNIPABsexM').checked= true;
              else
                document.getElementById('rdoNIPABsexF').checked= true;
            }
              //document.getElementById('rdoNIPABsex').value=data.txprIndDtlsDTO.gender;
            document.getElementById('indDetails').style.display='';
            document.getElementById('nonIndiDetails').style.display='none';
          }
          if(data.txprIndDtlsDTO == null){
            alert('Please enter valid PIN');
          }
          if(data.txprAddressDtlsDTO!=null){
            if(data.txprAddressDtlsDTO.addressLine1!=null && data.txprAddressDtlsDTO.addressLine1!='')
            {
              if(data.txprAddressDtlsDTO.addressLine1!=null && data.txprAddressDtlsDTO.addressLine1!='')
                document.getElementById('txtNIPABAddLine1').value=data.txprAddressDtlsDTO.addressLine1;
              if(data.txprAddressDtlsDTO.addressLine2!=null && data.txprAddressDtlsDTO.addressLine2!='')
                document.getElementById('txtNIPABAddLine2').value=data.txprAddressDtlsDTO.addressLine2;
              if(data.txprAddressDtlsDTO.addressLine3!=null && data.txprAddressDtlsDTO.addressLine3!='')
                document.getElementById('txtNIPABAddLine3').value=data.txprAddressDtlsDTO.addressLine3;
              if(data.txprAddressDtlsDTO.countryId!=null && data.txprAddressDtlsDTO.countryId!='')
                document.getElementById('txtNIPABAddCntry').value=data.txprAddressDtlsDTO.countryId;
              document.getElementById('txtNIPABNonResidentAddr').style.display='block';
              document.getElementById('txtNIPABResidentAddr').style.display='none';
              //document.getElementById('addr2').display='none';
            }
            else
            {
              if(data.txprAddressDtlsDTO.blockNo!=null && data.txprAddressDtlsDTO.blockNo!='')
                document.getElementById('txtNIPABBlockNo').value=data.txprAddressDtlsDTO.blockNo;
              if(data.txprAddressDtlsDTO.buildname!=null && data.txprAddressDtlsDTO.buildname!='')
                document.getElementById('txtNIPABBuilding').value=data.txprAddressDtlsDTO.buildname;
              if(data.txprAddressDtlsDTO.streetAddr!=null && data.txprAddressDtlsDTO.streetAddr!='')
                document.getElementById('txtNIPABStrtRoad').value=data.txprAddressDtlsDTO.streetAddr;
              if(data.txprAddressDtlsDTO.cityName!=null && data.txprAddressDtlsDTO.cityName!='')
                document.getElementById('txtNIPABCity').value=data.txprAddressDtlsDTO.cityName;
              if(data.txprAddressDtlsDTO.countyId!=null && data.txprAddressDtlsDTO.countyId!='')
                document.getElementById('txtNIPABCounty').value=data.txprAddressDtlsDTO.countyId;
              
              selectDistrictByCountry('txtNIPABCounty','txtNIPABDistrict');
              if(data.txprAddressDtlsDTO.districtId!=null && data.txprAddressDtlsDTO.districtId!='')
                document.getElementById('txtNIPABDistrict').value=data.txprAddressDtlsDTO.districtId;
              
              selectLocalityByDistrict('txtNIPABDistrict','txtNIPABLocality');
              if(data.txprAddressDtlsDTO.localityId!=null && data.txprAddressDtlsDTO.localityId!='')
                document.getElementById('txtNIPABLocality').value=data.txprAddressDtlsDTO.localityId;
              if(data.txprAddressDtlsDTO.descriptiveAddress!=null && data.txprAddressDtlsDTO.descriptiveAddress!='')
                document.getElementById('txtNIPABDescAddr').value=data.txprAddressDtlsDTO.descriptiveAddress;
              if(data.txprAddressDtlsDTO.postalCode!=null && data.txprAddressDtlsDTO.postalCode!='')
                document.getElementById('txtNIPABTown').value=data.txprAddressDtlsDTO.postalCode;
              var comboBox = document.getElementById('txtNIPABTown');
              var selectedIndex = comboBox.selectedIndex;
              document.getElementById('txtNIPABpostalCode').value=comboBox.options[selectedIndex].text;
              if(data.txprAddressDtlsDTO.poBox!=null && data.txprAddressDtlsDTO.poBox!='')
                document.getElementById('txtNIPABPOBox').value=data.txprAddressDtlsDTO.poBox;
              
              document.getElementById('txtNIPABNonResidentAddr').style.display='none';
              document.getElementById('txtNIPABResidentAddr').style.display='block';
            }
          }else{
            alert('Please enter valid PIN');
          }
        }
        else
        {
          document.getElementById('in_dtPersonDtls_4').value='';
          alert('Please enter valid PIN');
          document.getElementById('in_dtPersonDtls_4').focus();
            
        }
      }
      else
      {
        alert('Please enter valid PIN');
        document.getElementById('in_dtPersonDtls_4').value='';
      }
    },errorHandler:function(message) { alert("There is some server issue. Please try again later.");}//Updated on 05/01/2014 for changing alert message in case server not found
    });
    }
  else{
    return false;
  }
}
//JSP 5


function validateAuthorisedAgentDtlsNonIndi(pin)
{
  toUpperPin(pin.id);
  if(validateauthAgentJson(pin.id))
  {
    if(validatePIN(pin,''))
    {
      getAgentDtls(pin,'NONINDI');
    }
    else
    {
      document.getElementById('agenFirstName').value='';
      document.getElementById('agenMiddleName').value='';
      document.getElementById('agenLastName').value='';
      document.getElementById('txtNIAATelPhnNum').value='';
      document.getElementById('txtNIAAmobNum').value='';
      document.getElementById('txtNIAAEmail').value='';
    }
  }
  else
  {
    document.getElementById('agenFirstName').value='';
    document.getElementById('agenMiddleName').value='';
    document.getElementById('agenLastName').value='';
    document.getElementById('txtNIAATelPhnNum').value='';
    document.getElementById('txtNIAAmobNum').value='';
    document.getElementById('txtNIAAEmail').value='';
  }
  
  
}

function validateInterAgentDtlsNonIndi(pin)
{
  toUpperPin(pin.id);
  
  if(validateinterAgentJsonJson(pin.id))
  {
    if(validatePIN(pin,''))
    {
      getInterAgentDtls(pin);
    }
    else
    {
      document.getElementById("in_dtIADtls_10").value='';
      document.getElementById("in_dtIADtls_11").value='';
      document.getElementById("in_dtIADtls_12").value='';
      document.getElementById('in_dtIADtls_5').value='';
      document.getElementById('in_dtIADtls_6').value='';
      document.getElementById('in_dtIADtls_7').value='';
      
    }
  }
  else
  {
    document.getElementById("in_dtIADtls_10").value='';
    document.getElementById("in_dtIADtls_11").value='';
    document.getElementById("in_dtIADtls_12").value='';
    document.getElementById('in_dtIADtls_5').value='';
    document.getElementById('in_dtIADtls_6').value='';
    document.getElementById('in_dtIADtls_7').value='';
    
  }
  
  
}


function showHideDtIA()
{
  var compVal = document.getElementById('in_dtIADtls_14').value; 
  if(compVal=='PAR'){
    document.getElementById('in_dtIADtls_4').disabled=false;
    document.getElementById('in_dtIADtls_4').className='form101_combo form101_combo_width';
  }else{
    document.getElementById('in_dtIADtls_4').selectedIndex =0;
    document.getElementById('in_dtIADtls_4').disabled=true;
    document.getElementById('in_dtIADtls_4').className='form101_combo form101_combo_width readonlyInput';
  }
}


function clearInterAgentDtlsRow (){
  document.getElementById('txtIAPin').value='';
  document.getElementById('cmbIAAuthTyp').value='';
  document.getElementById('cmbIATaxObli').value='';
  document.getElementById('txtIATelPhnNum').value='';
  document.getElementById('txtIAmobNum').valuev;
  document.getElementById('txtIAEmail').value='';
  document.getElementById('txtIAAuthDtSince').value='';
  document.getElementById('txtIAauthDtUpto').value='';
  document.getElementById('txtIAFname').value='';
  document.getElementById('txtIALname').value='';
}

//JSP 6

function validateNonIndiTrbtryDtls(pin,name,email)
{
  /*if(document.getElementById('in_dtTributoryDtls_3').value=='50')
  {
    toUpperPin(pin.id);
    
    if(validatetributoryBondJson(pin.id))
    {
      if(validatePIN(pin,''))
      {
        fetchTxprCommonDtlsByPin(pin,name,email);
      }
      else
      {
        document.getElementById(name).value = "";
        document.getElementById(email).value = "";
        document.getElementById("in_dtTributoryDtls_7").value = "";
      }
    }
    else
    {
      document.getElementById(name).value = "";
      document.getElementById(email).value = "";
      document.getElementById("in_dtTributoryDtls_7").value = "";
    }
  }*/
  
  if(document.getElementById('in_dtTributoryDtls_3').value=='60' || 
      document.getElementById('in_dtTributoryDtls_3').value=='50')
  {
    toUpperPin(pin.id);
    
    if(validatetributoryBondJson(pin.id))
    {
      if(validatePIN(pin,'NONINDI'))
      {
        chkPndLiabAndBussForAmalComp(pin,name,email);
      }
      else
      {
        document.getElementById(name).value = "";
        document.getElementById(email).value = "";
        document.getElementById("in_dtTributoryDtls_7").value = "";
      }
    }
    else
    {
      document.getElementById(name).value = "";
      document.getElementById(email).value = "";
      document.getElementById("in_dtTributoryDtls_7").value = "";
    }
  }
  else
  {
    alert('Please select Type of Bond');
    document.getElementById('in_dtTributoryDtls_4').value='';
    document.getElementById('in_dtTributoryDtls_5').value='';
    document.getElementById('in_dtTributoryDtls_6').value='';
    document.getElementById('in_dtTributoryDtls_7').value='';
  }
}

function clearTributoryRow(){
  document.getElementById('bondType').value='';
  document.getElementById('pin').value='';
  document.getElementById('taxPayerName').value='';
  document.getElementById('mainEmail').value='';
  document.getElementById('dateAmalgamation').value='';
}

  // JSP1 ADD ROW
/*function clearNames (){
  document.getElementById('txtIAFname').value='';
  document.getElementById('txtIAmidNm').value='';
  document.getElementById('txtIALname').value='';
}*/
function validateAddrowActivity(){
  tab_id ='dtEcoActDtls';
  var srcTable = document.getElementById(tab_id);
  for (var r = 1; r < srcTable.rows.length; r++){
    colValArray = (document.getElementById("id_"+tab_id+"_"+r).value).split(columnsDelimiter);
        if(trim(colValArray[1].split(propertyValueDelimiter)[1]).toLowerCase()=='p' && trim(colValArray[1].split(propertyValueDelimiter)[1]).toLowerCase()==trim(document.getElementById('in_'+tab_id+'_4').value).toLowerCase() && document.getElementById('id_'+tab_id+'_'+r+'_1').name!='deleted'
          && null!=document.getElementById('id_'+tab_id+'_'+r+'_2') &&   document.getElementById('id_'+tab_id+'_'+r+'_2').name!='Modifying')
            {
              alert('Please select only one activity as Primary Activity.');
              return false; 
            }
    }
  return validateecoActJsononAdd();
}
function addrowActivity (tab_id)
{
    if(validateAddrowActivity())
      addrow(tab_id,'2','4');
}
function setAdditionalPlaceData ()
{
  
  tab_id= 'dtPlaceDtls';
  document.getElementById('in_'+tab_id+'_6').value='';
  
  /*if(document.getElementById('in_'+tab_id+'_20').checked)
    document.getElementById('in_'+tab_id+'_6').value = document.getElementById('in_'+tab_id+'_6').value +" "+ document.getElementById('in_'+tab_id+'_20').title;
  if(document.getElementById('in_'+tab_id+'_21').checked)
    document.getElementById('in_'+tab_id+'_6').value = document.getElementById('in_'+tab_id+'_6').value +" "+ document.getElementById('in_'+tab_id+'_21').title;*/
  if(document.getElementById('in_'+tab_id+'_20').checked)
  {
    if(''!=document.getElementById('in_'+tab_id+'_6').value)
      document.getElementById('in_'+tab_id+'_6').value = document.getElementById('in_'+tab_id+'_6').value +","+ document.getElementById('in_'+tab_id+'_20').title;
    else
      document.getElementById('in_'+tab_id+'_6').value = document.getElementById('in_'+tab_id+'_6').value +" "+ document.getElementById('in_'+tab_id+'_20').title;
  }
  if(document.getElementById('in_'+tab_id+'_21').checked)
  {
    if(''!=document.getElementById('in_'+tab_id+'_6').value)
      document.getElementById('in_'+tab_id+'_6').value = document.getElementById('in_'+tab_id+'_6').value +","+ document.getElementById('in_'+tab_id+'_21').title;
    else
      document.getElementById('in_'+tab_id+'_6').value = document.getElementById('in_'+tab_id+'_6').value +" "+ document.getElementById('in_'+tab_id+'_21').title;
  }
  
  return validateaddPlaceBussJsononAdd();
}
function hideDateImg()
{
  showHideBrnchRegDate(false,'in_dtPlaceDtls_20','in_dtPlaceDtls_22');
  showHideBrnchRegDate(false,'in_dtPlaceDtls_21','in_dtPlaceDtls_23');
  //showHideBrnchRegDate(false,'in_dtPlaceDtls_22','in_dtPlaceDtls_26');
  //showHideBrnchRegDate(false,'in_dtPlaceDtls_23','in_dtPlaceDtls_27');
  modifyDescAddCount('dtPlaceDtls');
}
function addrowAdditionalPlaces(tab_id){
  if(setAdditionalPlaceData())
  {
    addrow(tab_id,'4','22');
    hideDateImg();
  }
}
function addrowInterAgent(tab_id){
  document.getElementById('in_'+tab_id+'_13').value = document.getElementById('in_'+tab_id+'_4').value ;
  document.getElementById('typeOfAuth').value = document.getElementById('in_'+tab_id+'_14').value ;
  if(beforeAddrowValidationInterAgent ())
    addrow(tab_id,'7','12');
}
function beforeAddrowValidationInterAgent ()
{
  tab_id = 'dtIADtls';
  var srcTable = document.getElementById(tab_id);
  for (var r = 1; r < srcTable.rows.length; r++){
    colValArray = (document.getElementById("id_"+tab_id+"_"+r).value).split(columnsDelimiter);
    if((colValArray[11].split(propertyValueDelimiter)[1])=='ATX' && document.getElementById('id_'+tab_id+'_'+r+'_1').name!='deleted' && null!=document.getElementById('id_'+tab_id+'_'+r+'_2') &&   document.getElementById('id_'+tab_id+'_'+r+'_2').name!='Modifying')
    {
      alert('You cannot add any other data as you have already added agent who is authorised for All Taxes.');
      return false;
    }
    if((colValArray[11].split(propertyValueDelimiter)[1])=='PAR' && document.getElementById('in_'+tab_id+'_14').value == 'ATX' && document.getElementById('id_'+tab_id+'_'+r+'_1').name!='deleted' && null!=document.getElementById('id_'+tab_id+'_'+r+'_2') &&   document.getElementById('id_'+tab_id+'_'+r+'_2').name!='Modifying')
    {
      alert('Please delete all other agents who are given partial authorization.');
      return false;
    }
    else
    {
      if(colValArray[1].split(propertyValueDelimiter)[1]==document.getElementById('in_'+tab_id+'_13').value && document.getElementById('id_'+tab_id+'_'+r+'_1').name!='deleted' && null!=document.getElementById('id_'+tab_id+'_'+r+'_2') &&   document.getElementById('id_'+tab_id+'_'+r+'_2').name!='Modifying')
            {
              alert('You cannot select the same obligation again.');
              return false; 
            }
    }
       }
  return validateinterAgentJsononAdd();
}
function addrowTribuBond (tab_id){
  document.getElementById('in_'+tab_id+'_8').value = document.getElementById('in_'+tab_id+'_3').value ;
  if (modifyTrib())
  {
    addrow(tab_id,'5','6');
    return true;
  }
  else
    return false;
}
function modifyTrib()
{
  resetErrorList();
  var rtnFlag = validateFormFields(tributoryBondJson);
  getErrTabToggle('TabView','15');	
  if(!rtnFlag)
  {
    tabview_switch('TabView', '15');
    hideAndShowTable("errorDiv");
  }
  else
  {
    var tab_id='dtTributoryDtls';
    var tribTable = document.getElementById(tab_id);
    var tribPin = document.getElementById("in_dtTributoryDtls_4").value;
    for (var r = 1; r < tribTable.rows.length; r++)
    {
      colValArray = (document.getElementById('id_'+tab_id+'_'+r).value).split(columnsDelimiter);
      if((trim(colValArray[0].split(propertyValueDelimiter)[1])==document.getElementById("in_dtTributoryDtls_3").value) && ('50'==document.getElementById("in_dtTributoryDtls_3").value))
      {
          if(trim(document.getElementById("id_"+tab_id+"_"+r+"_1").innerHTML)!="deleted" && null!=document.getElementById('id_'+tab_id+'_'+r+'_2') && document.getElementById('id_'+tab_id+'_'+r+'_2').name!='Modifying')
          {
            alert('You cannot have more than one Legal Representative.');	
            return false;
             }
      }
      if(trim(tribTable.rows[r].cells[4].innerHTML)==tribPin)
      {
          if(trim(document.getElementById("id_"+tab_id+"_"+r+"_1").innerHTML)!="deleted" && null!=document.getElementById('id_'+tab_id+'_'+r+'_2') && document.getElementById('id_'+tab_id+'_'+r+'_2').name!='Modifying')
          {
            alert("This PIN is already entered");
            return false;
             }
      }
      }
  }
  return rtnFlag;
}
//for fetching data from by ajax request
function getBussDtlsFromRegNum(obj)
{
  var bussTypeVal = document.getElementById("cmbNIIdenBussTyp").value;
  
  if(bussTypeVal==null || bussTypeVal=="")
  {
    alert('Please select Business Type');
    document.getElementById('calSoiBussRegDt').value='';
    document.getElementById('txtSoiBussNm').value='';
    obj.value='';
    return false;
  }
  
  var bussSubTypeVal = document.getElementById("cmbNIIdenBussSubTyp").value;
  
  if((document.getElementById("cmbNIIdenBussSubTyp").disabled==false) && (bussSubTypeVal==null || bussSubTypeVal==""))
  {
    alert('Please select Business Subtype');
    document.getElementById('calSoiBussRegDt').value='';
    document.getElementById('txtSoiBussNm').value='';
    obj.value='';
    return false;
  }
  
  if(null!=obj.value && obj.value!='')
    {   
    toUpperPin(obj.id);
    FetchRegistrationDtl.fetchCompDtlNonIndiReg(obj.value, {async:false,callback:function(data) {
      if(data != 'null' &&  data != null)
      {
        if (data.isAlreadyReg !=null && data.isAlreadyReg)
        {
            
          alert("A PIN has already been issued for the Business Registration Number "+obj.value+", consult KRA Station/ nearest Itax Support Centre to be assisted.");
          document.getElementById('calSoiBussRegDt').value='';
          document.getElementById('txtSoiBussNm').value='';
          obj.value='';
          obj.focus();
        }
        else if (data.isAlreadyRegisteredMig!=null && data.isAlreadyRegisteredMig)
        {
          //alert('Business registration number is already registered with PIN '+data.pinNoforRegBRGMig+'. Please use iPage functionality.');
          

          alert("One of the taxpayer has listed the Business Registration Number under Business Income. Please consult KRA Station or nearest iTax Support Centre to have the Business Registration number de-linked from the PIN to enable you register the Company PIN on iTax.");
          document.getElementById('txtSoiBussNm').value="";
          document.getElementById('calSoiBussRegDt').value="";
          obj.value='';
          obj.focus();
        }
        /*else if(checkForBusinessType()) //For COMP-REG Change on 26/05/2015
        {
          if (data.bussRegDate !=null)
          {
            if(data.isValidNum != null && data.isValidNum)
            {
              var month = "";
              if(data.bussRegDate.getMonth()+1<10)
              {
                month = "0"+(data.bussRegDate.getMonth()+1);
              }
              else
              {
                 month = data.bussRegDate.getMonth()+1;	
              }
              document.getElementById('calSoiBussRegDt').value=data.bussRegDate.getDate()+"/"+(month)+"/"+
              data.bussRegDate.getFullYear();
              document.getElementById('txtSoiBussNm').value=data.businessName;
              checkDateValidation('calSoiBussCommDt','calSoiBussRegDt','Business Commencement Date can't be before the Business Registration Date');
            }
            else
            {
            
              document.getElementById('calSoiBussRegDt').value='';
              document.getElementById('txtSoiBussNm').value='';
              obj.value='';
              obj.focus();
              alert('Invalid Bussiness Registration Number');
                
            }
          }
          else
          {
            document.getElementById('calSoiBussRegDt').value='';
            document.getElementById('txtSoiBussNm').value='';
            obj.value='';
            obj.focus();
            alert('Business Registration Date is missing. Request you to please contact System Administrator.');
          }
          
        }*/
        }
      else
      {
        document.getElementById('calSoiBussRegDt').value='';
        document.getElementById('txtSoiBussNm').value='';
        obj.value='';
        obj.focus();
        alert('Error in fetching data');
      }
    },errorHandler:function(message) { alert("There is some server issue. Please try again after sometime."); return false;}//Updated on 05/01/2014 for changing alert message in case server not found
    });
    }
  else{
    document.getElementById('calSoiBussRegDt').value='';
    document.getElementById('txtSoiBussNm').value='';
    obj.value='';
    obj.focus();
    return false;
  }
}
var ecoActJson={"field":[{"name":"in_dtEcoActDtls_3","rule":[{"required":"y","dispName":"Section"}]},
                         {"name":"in_dtEcoActDtls_5","rule":[{"required":"y","dispName":"Group"}]},
                         {"name":"in_dtEcoActDtls_6","rule":[{"required":"y","dispName":"Description"}]},
                         /*{"name":"in_dtEcoActDtls_7","rule":[{"required":"n","dispName":"Class"}]},*/
                         /*{"name":"in_dtEcoActDtls_8","rule":[{"required":"n","dispName":"Sub Class"}]},*/
                         {"name":"in_dtEcoActDtls_4","rule":[{"required":"y","dispName":"Type"}]}
                   ]};
/*
 * 
 * if(!rtnFlag)
{
  tabview_switch('TabView', '15');
  hideAndShowTable("errorDiv");
}
 */
function validateecoActJson(id) 
{
  var rtnFlag = validateFormFieldOnEvent(id, ecoActJson);
  getErrTabToggle('TabView','15');
  if(!rtnFlag)
  {
    tabview_switch('TabView', '15');
    hideAndShowTable("errorDiv");
  }
  return rtnFlag;
}
function validateecoActJsononAdd()
{
  resetErrorList();
  var rtnFlag = validateFormFields(ecoActJson);
  getErrTabToggle('TabView','15');	
  if(!rtnFlag)
  {
    tabview_switch('TabView', '15');
    hideAndShowTable("errorDiv");
  }
  else
  {
    var newRow="";
    
    if(document.getElementById('in_dtEcoActDtls_3').value!=null && trim(document.getElementById('in_dtEcoActDtls_3').value)!=null && trim(document.getElementById('in_dtEcoActDtls_3').value)!='')
    {
      newRow=newRow+trim(document.getElementById('in_dtEcoActDtls_3').value);
      if(document.getElementById('in_dtEcoActDtls_5').value!=null && trim(document.getElementById('in_dtEcoActDtls_5').value)!=null && trim(document.getElementById('in_dtEcoActDtls_5').value)!='')
      {
        newRow=newRow+trim(document.getElementById('in_dtEcoActDtls_5').value);
        if(document.getElementById('in_dtEcoActDtls_6').value!=null && trim(document.getElementById('in_dtEcoActDtls_6').value)!=null && trim(document.getElementById('in_dtEcoActDtls_6').value)!='')
        {
          newRow=newRow+trim(document.getElementById('in_dtEcoActDtls_6').value);
          /*if(document.getElementById('in_dtEcoActDtls_7').value!=null && trim(document.getElementById('in_dtEcoActDtls_7').value)!=null && trim(document.getElementById('in_dtEcoActDtls_7').value)!='')
          {
            newRow=newRow+trim(document.getElementById('in_dtEcoActDtls_7').value);
            if(document.getElementById('in_dtEcoActDtls_8').value!=null && trim(document.getElementById('in_dtEcoActDtls_8').value)!=null && trim(document.getElementById('in_dtEcoActDtls_8').value)!='')
            {
              newRow=newRow+trim(document.getElementById('in_dtEcoActDtls_8').value);
            }
          }*/
        }
      }
    }
    var tab_id='dtEcoActDtls';
    var rentTable = document.getElementById(tab_id);
    for (var r = 1; r < rentTable.rows.length; r++)
    {
      if(trim(document.getElementById("id_"+tab_id+"_"+r+"_1").innerHTML)!="deleted" && null!=document.getElementById('id_'+tab_id+'_'+r+'_2') && document.getElementById('id_'+tab_id+'_'+r+'_2').name!='Modifying')
      {
        var oldRow="";
        colValArray = (document.getElementById("id_"+tab_id+"_"+r).value).split(columnsDelimiter);
      
        if(colValArray[0].split(propertyValueDelimiter)[1] != null && trim(colValArray[0].split(propertyValueDelimiter)[1])!=null && trim(colValArray[0].split(propertyValueDelimiter)[1])!='')
        {
          oldRow=oldRow+trim(colValArray[0].split(propertyValueDelimiter)[1]);
          if(colValArray[2].split(propertyValueDelimiter)[1] != null && trim(colValArray[2].split(propertyValueDelimiter)[1])!=null && trim(colValArray[2].split(propertyValueDelimiter)[1])!='')
          {
            oldRow=oldRow+trim(colValArray[2].split(propertyValueDelimiter)[1]);
            if(colValArray[3].split(propertyValueDelimiter)[1] != null && trim(colValArray[3].split(propertyValueDelimiter)[1])!=null && trim(colValArray[3].split(propertyValueDelimiter)[1])!='')
            {
              oldRow=oldRow+trim(colValArray[3].split(propertyValueDelimiter)[1]);
              if(colValArray[4].split(propertyValueDelimiter)[1] != null && trim(colValArray[4].split(propertyValueDelimiter)[1])!=null && trim(colValArray[4].split(propertyValueDelimiter)[1])!='')
              {
                oldRow=oldRow+trim(colValArray[4].split(propertyValueDelimiter)[1]);
                if(colValArray[5].split(propertyValueDelimiter)[1] != null && trim(colValArray[5].split(propertyValueDelimiter)[1])!=null && trim(colValArray[5].split(propertyValueDelimiter)[1])!='')
                {
                  oldRow=oldRow+trim(colValArray[5].split(propertyValueDelimiter)[1]);
                }
              }
            }
          }
        }
        
        if(oldRow != '' && newRow != '')
        {
          if(oldRow==newRow)
          {
            alert('Please declare particular Economic Activity (combination of Sector, Division, Group, Class, Sub Class) only once.');
            return false;
          }
        }
         }
      }
  }
  
  /*if(rtnFlag)
  {
    addrowActivity('dtEcoActDtls');
  }*/
  return rtnFlag;
}

function showHideVat(flag)
{
if(flag){
  document.getElementById('txtPSTaxSupplyThirdYr').disabled=false;
  document.getElementById('txtPSExSupplyThirdYr').disabled=false;
  document.getElementById('txtPSExportedThirdYr').disabled=false;
  
  document.getElementById('txtPSTaxSupplySeYr').disabled=false;
  document.getElementById('txtPSExSupplySeYr').disabled=false;
  document.getElementById('txtPSExportedSeYr').disabled=false;
  
  document.getElementById('txtPSTaxSupplyLastYr').disabled=false;
  document.getElementById('txtPSExSupplyLastYr').disabled=false;
  document.getElementById('txtPSExportedLastYr').disabled=false;
  
  document.getElementById('txtPSTaxSupplyNextYr').disabled=false;
  document.getElementById('txtPSExSupplyNextYr').disabled=false;
  document.getElementById('txtPSExportedNextYr').disabled=false;
  setStyleOnTurnoverSection('form101_textfcurr form101_textfcurr_width');
}else{
  clearVatData(false);
  document.getElementById('txtPSTaxSupplyThirdYr').disabled=true;
  document.getElementById('txtPSExSupplyThirdYr').disabled=true;
  document.getElementById('txtPSExportedThirdYr').disabled=true;
  
  document.getElementById('txtPSTaxSupplySeYr').disabled=true;
  document.getElementById('txtPSExSupplySeYr').disabled=true;
  document.getElementById('txtPSExportedSeYr').disabled=true;
  
  document.getElementById('txtPSTaxSupplyLastYr').disabled=true;
  document.getElementById('txtPSExSupplyLastYr').disabled=true;
  document.getElementById('txtPSExportedLastYr').disabled=true;
  
  document.getElementById('txtPSTaxSupplyNextYr').disabled=true;
  document.getElementById('txtPSExSupplyNextYr').disabled=true;
  document.getElementById('txtPSExportedNextYr').disabled=true;
  setStyleOnTurnoverSection('form101_textfcurr form101_textfcurr_width readonlyInput');
}
}

function setStyleOnTurnoverSection(style){
document.getElementById('txtPSTaxSupplyThirdYr').className=style;
document.getElementById('txtPSExSupplyThirdYr').className=style;
document.getElementById('txtPSExportedThirdYr').className=style;

document.getElementById('txtPSTaxSupplySeYr').className=style;
document.getElementById('txtPSExSupplySeYr').className=style;
document.getElementById('txtPSExportedSeYr').className=style;

document.getElementById('txtPSTaxSupplyLastYr').className=style;
document.getElementById('txtPSExSupplyLastYr').className=style;
document.getElementById('txtPSExportedLastYr').className=style;

document.getElementById('txtPSTaxSupplyNextYr').className=style;
document.getElementById('txtPSExSupplyNextYr').className=style;
document.getElementById('txtPSExportedNextYr').className=style;
}

function enablePartnerShip(obj)
{
var businessType=document.getElementById('cmbNIIdenBussSubTyp');
var businessTp=document.getElementById('cmbNIIdenBussTyp');
if(businessTp !=null && businessTp.value !=null && businessTp.value !='' )
{
if(businessType !=null && businessType.value !=null && businessType.value !='' )
{
if(document.getElementById('cmbNIIdenBussTyp').value =='OTHERS')
{
  if(businessType.value=='PRTNRSHP' && obj.checked)
  {
    document.getElementById('chkNIObliITPrtnr').checked=true;
    //showHideRegDate(true,'chkNIObliITPrtnr');
    showHideRegDate(false,'chkNIObliITPrtnr','calNIObliregDtITPrtnr');

    createIntermAgentObli(document.getElementById('chkNIObliITPrtnr'));
    //document.getElementById('chkNIObliITTot').checked=false;
    //document.getElementById("chkNIObliITTot").disabled=false;
    //showHideRegDate(true,'chkNIObliITTot');
    //createIntermAgentObli(document.getElementById('chkNIObliITTot'));
    document.getElementById('chkNIObliITComp').checked=false;
    //showHideRegDate(false,'chkNIObliITComp');
    showHideRegDate(false,'chkNIObliITComp','calNIObliregDtITComp');

    createIntermAgentObli(document.getElementById('chkNIObliITComp'));
    
    if(document.getElementById('chkNIObliITPrtnr').checked)
    {
      document.getElementById('calNIObliregDtITPrtnr').value=document.getElementById('calSoiBussCommDt').value;
      document.getElementById('calNIObliregDtITComp').value="";
    }
    document.getElementById("accMonth").value="12";
    document.getElementById("accMonth").disabled=true;
    setRegDate(document.getElementById("calSoiBussCommDt"));
    return true;
  }
  else
  {
    //commented By Margi for remove onchange of subtype obligation auto selected
    /*document.getElementById('chkNIObliITComp').checked=true;
    showHideRegDate(true,'chkNIObliITComp');
    document.getElementById('chkNIObliITPrtnr').checked=false;
    showHideRegDate(false,'chkNIObliITPrtnr');
    document.getElementById('chkNIObliITTot').checked=false;
    showHideRegDate(false,'chkNIObliITTot');
    createIntermAgentObli(document.getElementById('chkNIObliITComp'));
    createIntermAgentObli(document.getElementById('chkNIObliITPrtnr'));
    createIntermAgentObli(document.getElementById('chkNIObliITTot'));

    document.getElementById("cmbNIIdenAccPeriod").value="";
    document.getElementById("cmbNIIdenAccPeriod").disabled=false;*/
    
    document.getElementById('chkNIObliITPrtnr').checked=false;
    //showHideRegDate(false,'chkNIObliITPrtnr');
    showHideRegDate(false,'chkNIObliITPrtnr','calNIObliregDtITPrtnr');

    document.getElementById('chkNIObliITTot').checked=false;
    //showHideRegDate(false,'chkNIObliITTot');
    showHideRegDate(false,'chkNIObliITTot','calNIObliregDtTot');
    alert('You can not register with Income Tax Partnership as your business sub type is not Partnership');

    return false;

  }
}else{
  /*document.getElementById('chkNIObliITComp').checked=true;
  showHideRegDate(true,'chkNIObliITComp');
  document.getElementById('chkNIObliITPrtnr').checked=false;
  showHideRegDate(false,'chkNIObliITPrtnr');
  document.getElementById('chkNIObliITTot').checked=false;
  showHideRegDate(false,x'chkNIObliITTot');
  createIntermAgentObli(document.getElementById('chkNIObliITComp'));
  createIntermAgentObli(document.getElementById('chkNIObliITPrtnr'));
  createIntermAgentObli(document.getElementById('chkNIObliITTot'));

  document.getElementById("cmbNIIdenAccPeriod").value="";
  document.getElementById("cmbNIIdenAccPeriod").disabled=false;*/
    if(document.getElementById('chkNIObliITPrtnr').checked){
      alert('You can not register with Income Tax Partnership as your business sub type is not Partnership');
    
    document.getElementById('chkNIObliITPrtnr').checked=false;
    //showHideRegDate(false,'chkNIObliITPrtnr');
    showHideRegDate(false,'chkNIObliITPrtnr','calNIObliregDtITPrtnr');

    document.getElementById('chkNIObliITTot').checked=false;
    //showHideRegDate(false,'chkNIObliITTot');
    showHideRegDate(false,'chkNIObliITTot','calNIObliregDtTot');
           return false;

  }
  
}
}
else{
  
  document.getElementById('chkNIObliITPrtnr').checked=false;
  alert('You can not register with Income Tax Partnership as your business sub type is not Partnership');
      return false;
}
}
else{
  if(document.getElementById('cmbNIIdenBussTyp').value == ""){
  alert('Please select Business Type.');
  document.getElementById('chkNIObliITPrtnr').checked=false;
  }
      return false;
}

}
function enableEstateTrust(val)
{
if(document.getElementById('cmbNIIdenBussTyp').value =='OTHERS')
{
  if(val=='ESTTRST')
  {
    // enable estate trust section
    showTab('TabView', '6');
    
  }else{
    // hide estate trust section
    hideTab('TabView', '6');
  }
}else{
  // enable estate trust section
  hideTab('TabView', '6');
}
changeSubmitSec5(true);
}
function checkforPrnrshp (obj)
{
if(!obj.checked)
{
  alert('You cannot uncheck this selection');
  obj.checked = true;
  return false;
}else
  return true;
}
function changeinSection3 (flag , nextId)
{
if(flag)
  document.getElementById(nextId).checked = true;
else
  document.getElementById(nextId).checked = false;
}
function checkForSection2 (obj, secTwoId)
{
if(document.getElementById(secTwoId).checked)
{
  return true;
}else if (obj.checked){
  alert('Please change your selection in Taxpyer Obligation section First');
  if(obj.checked)
    obj.checked = false;
  else
    obj.checked = true;
  return false;	
}else
  return true;
}
function clearDate(date,div)
{
if(!document.getElementById(date.id).checked)
{
  document.getElementById(div).value = '';
  return false;
}
return true;
}

// additional places of bussiness JSON

var addPlaceBussJson={"field":[{"name":"in_dtPlaceDtls_3","rule":[{"required":"y","type":"bussnamewithspecialchrs","maxLength":"100","dispName":"Branch Name"}]},
                             {"name":"in_dtPlaceDtls_7","rule":[{"required":"n","type":"alphanumericspecialchara","dispName":"LR Number","maxLength":"50"}]},
                             {"name":"in_dtPlaceDtls_8","rule":[{"required":"y","type":"alphanumericspecialcharaemp","dispName":"Building","maxLength":"50"}]},
                             {"name":"in_dtPlaceDtls_9","rule":[{"required":"y","type":"alphanumericspecialchara","dispName":"Street/Road","maxLength":"50"}]},
                             {"name":"in_dtPlaceDtls_10","rule":[{"required":"y","type":"alphanumericspecialcharacity","dispName":"City/Town","maxLength":"50"}]},
                             {"name":"in_dtPlaceDtls_11","rule":[{"required":"y","dispName":"County"}]},
                             {"name":"in_dtPlaceDtls_12","rule":[{"required":"y","dispName":"District"}]},
                             {"name":"in_dtPlaceDtls_24","rule":[{"required":"y","dispName":"Tax area/Locality"}]},
                             {"name":"in_dtPlaceDtls_13","rule":[{"required":"n","type":"alphanumericspecialcharaemp","dispName":"Descriptive Address","maxLength":"200"}]},
                             {"name":"in_dtPlaceDtls_14","rule":[{"required":"y","dispName":"Postal Code"}]},
                             {"name":"in_dtPlaceDtls_15","rule":[{"required":"y","dispName":"Town"}]},
                             {"name":"in_dtPlaceDtls_16","rule":[{"required":"y","type":"onlynumeric","dispName":"P.O.Box","minLength":"1","maxLength":"15"}]},
                             {"name":"in_dtPlaceDtls_17","rule":[{"required":"n","type":"onlynumeric","minLength":"8","maxLength":"15","dispName":"Telephone Number"}]},
                             {"name":"in_dtPlaceDtls_4","rule":[{"required":"y","type":"onlynumeric","minLength":"8","maxLength":"15","dispName":"Mobile Number"}]},
                             {"name":"in_dtPlaceDtls_5","rule":[{"required":"y","type":"email","minLength":"5","maxLength":"50","dispName":"Main Email Address"}]},
                             {"name":"in_dtPlaceDtls_18","rule":[{"required":"n","type":"email","minLength":"5","maxLength":"50","dispName":"Secondary Email Address"}]},
                             {"name":"in_dtPlaceDtls_19","rule":[{"required":"n","type":"alphanumeric","maxLength":"50","dispName":"Website"}]},
                             {"name":"in_dtPlaceDtls_22","rule":[{"required":"n","dispName":"Income Tax PAYE Registration Date","dependent":[{"ids":"in_dtPlaceDtls_20","values":"7","rule":[{"required":"y","type":"date"}]}]}]},
                             {"name":"in_dtPlaceDtls_23","rule":[{"required":"n","dispName":"Value Added Tax Registration Date","dependent":[{"ids":"in_dtPlaceDtls_21","values":"9","rule":[{"required":"y","type":"date"}]}]}]}
                 ]};
//Added on 20/03/2014 Start
var tribBondRadioJson={"field":[{"name":"isQuesTrbBond1","rule":[{"required":"y","dispName":"\'Was your business formed as a result of acquisition or amalgamation?\' "}]}]};
//End
//Added on 20/03/2014 Start 
var smsSubJson={"field":[{"name":"rdoTxprSmsReg1","rule":[{"required":"y","dispName":"\'Would you like to Subscribe/Unsubscribe of receiving alerts through SMS?\' "}]}]};
//End
function validateaddPlaceBussJson(id) 
{
var rtnFlag = validateFormFieldOnEvent(id, addPlaceBussJson);
getErrTabToggle('TabView','15');	
if(!rtnFlag)
{
  tabview_switch('TabView', '15');
  hideAndShowTable("errorDiv");
}
return rtnFlag;
}
function validateaddPlaceBussJsononAdd()
{
resetErrorList();
var rtnFlag = validateFormFields(addPlaceBussJson);
getErrTabToggle('TabView','15');	
if(!rtnFlag)
{
  tabview_switch('TabView', '15');
  hideAndShowTable("errorDiv");
}
/* if(rtnFlag)
{
  rtnFlag=validateBussActDtlsForAdd();
} */
if(rtnFlag){
  var branchNotExists = checkBranchNotExists();
  return branchNotExists;
}
return rtnFlag;
}

// taxpyaer obligaions JSON

//additional places of bussiness JSON
//calNIObliregDtITComp
var bussObligationJson={"field":[{"name":"calNIObliregDtITComp","rule":[{"required":"n","type":"date","dispName":"Income Tax Company Registration Date"}]},
                               {"name":"calNIObliregDtITPrtnr","rule":[{"required":"n","type":"date","dispName":"Income Tax Partnership Registration Date"}]},
                               {"name":"calNIObliregDtITPaye","rule":[{"required":"n","type":"date","dispName":"Income Tax PAYE Registration Date"}]},
                               {"name":"calNIObliregDtVat","rule":[{"required":"n","type":"date","dispName":"Value Added Tax Registration Date"}]},
                               {"name":"calNIObliregDtITDST","rule":[{"required":"n","type":"date","dispName":"Digital Service Tax Registration Date"}]}
                 ]};
function validateabussObligationJson(id) 
{
var rtnFlag = validateFormFieldOnEvent(id, bussObligationJson);
getErrTabToggle('TabView','15');
if(!rtnFlag)
{
  tabview_switch('TabView', '15');
  hideAndShowTable("errorDiv");
}
return rtnFlag;
}
function validatebussObligationJsonForm()
{

var rtnFlag = validateFormFields(bussObligationJson);
getErrTabToggle('TabView','15');	
if(!rtnFlag)
{
  tabview_switch('TabView', '15');
  hideAndShowTable("errorDiv");
}
/*if(rtnFlag)
{
  rtnFlag=validateBussActDtlsForAdd();
}*/
return rtnFlag;
}



//Non Indi identification address and contact JSON

var addConactJson={"field":[
                             {"name":"txtNIIdenBlockNo","rule":[{"required":"n","type":"alphanumericspecialchara","dispName":"LR Number","maxLength":"50"}]},
                             {"name":"txtNIIdenBuilding","rule":[{"required":"y","type":"alphanumericspecialcharaemp","dispName":"Building","maxLength":"50"}]},
                             {"name":"txtNIIdenStrtRoad","rule":[{"required":"y","type":"alphanumericspecialchara","dispName":"Street/Road","maxLength":"50"}]},
                             {"name":"txtNIIdenCity","rule":[{"required":"y","type":"alphanumericspecialcharacity","dispName":"City/Town","maxLength":"50"}]},
                             {"name":"txtNIIdenCounty","rule":[{"required":"y","dispName":"County"}]},
                             {"name":"txtNIIdenLocality","rule":[{"required":"y","dispName":"Tax Area/Locality"}]},
                             {"name":"txtNIIdenDistrict","rule":[{"required":"y","dispName":"District"}]},
                             {"name":"txtNIIdenDescAddr","rule":[{"required":"n","type":"alphanumericspecialcharaemp","dispName":"Descriptive Address","maxLength":"200"}]},
                             {"name":"txtNIIdenpostalCode","rule":[{"required":"y","dispName":"Postal Code"}]},                
                             {"name":"txtNIIdenPOBox","rule":[{"required":"y","type":"onlynumeric","dispName":"P.O. Box","minLength":"1","maxLength":"15"}]},
                             {"name":"txtNIIdenTelNo","rule":[{"required":"n","type":"onlynumeric","dispName":"Telephone Number","minLength":"8","maxLength":"15"}]},
                             {"name":"txtNIIdenMobNo1","rule":[{"required":"y","type":"onlynumeric","minLength":"8","maxLength":"15","dispName":"Mobile Number (1)"}]},
                             {"name":"txtNIIdenMobNo2","rule":[{"required":"n","type":"onlynumeric","minLength":"8","maxLength":"15","dispName":"Mobile Number (2)"}]},
                             {"name":"txtNIIdenMobNo3","rule":[{"required":"n","type":"onlynumeric","minLength":"8","maxLength":"15","dispName":"Mobile Number (3)"}]},
                             {"name":"txtNIIdenMainEmail","rule":[{"required":"y","type":"email","minLength":"5","maxLength":"50","dispName":"Main Email Address"}]},
                             {"name":"txtNIIdenSecEmail","rule":[{"required":"n","type":"email","minLength":"5","maxLength":"50","dispName":"Secondary Email Address"}]},
                             {"name":"txtNIIdenwebsite","rule":[{"required":"n","type":"alphanumeric","maxLength":"50","dispName":"Website"}]}
                 ]};

var addConactJsonDst={"field":[
                             {"name":"txtNIIdenBlockNo","rule":[{"required":"n","type":"alphanumericspecialchara","dispName":"LR Number","maxLength":"50"}]},
                             {"name":"txtNIIdenBuilding","rule":[{"required":"y","type":"alphanumericspecialcharaemp","dispName":"Building","maxLength":"50"}]},
                             {"name":"txtNIIdenStrtRoad","rule":[{"required":"y","type":"alphanumericspecialchara","dispName":"Street/Road","maxLength":"50"}]},
                             {"name":"txtNIIdenCity","rule":[{"required":"y","type":"alphanumericspecialcharacity","dispName":"City/Town","maxLength":"50"}]},
                             {"name":"txtNIIdenCounty","rule":[{"required":"y","dispName":"County"}]},
                             {"name":"txtNIIdenLocality","rule":[{"required":"y","dispName":"Tax Area/Locality"}]},
                             {"name":"txtNIIdenDistrict","rule":[{"required":"y","dispName":"District"}]},
                             {"name":"txtNIIdenDescAddr","rule":[{"required":"n","type":"alphanumericspecialcharaemp","dispName":"Descriptive Address","maxLength":"200"}]},
                             {"name":"txtNIIdenpostalCode","rule":[{"required":"y","dispName":"Postal Code"}]},                
                             {"name":"txtNIIdenPOBox","rule":[{"required":"y","type":"onlynumeric","dispName":"P.O. Box","minLength":"1","maxLength":"15"}]},
                             {"name":"txtNIIdenTelNo","rule":[{"required":"n","type":"onlynumeric","dispName":"Telephone Number","minLength":"8","maxLength":"15"}]},
                             {"name":"txtNIIdenMobNo1","rule":[{"required":"y","type":"onlynumeric","minLength":"8","maxLength":"15","dispName":"Mobile Number (1)"}]},
                             {"name":"txtNIIdenMobNo2","rule":[{"required":"n","type":"onlynumeric","minLength":"8","maxLength":"15","dispName":"Mobile Number (2)"}]},
                             {"name":"txtNIIdenMobNo3","rule":[{"required":"n","type":"onlynumeric","minLength":"8","maxLength":"15","dispName":"Mobile Number (3)"}]},
                             {"name":"txtNIIdenMainEmail","rule":[{"required":"y","type":"email","minLength":"5","maxLength":"50","dispName":"Main Email Address"}]},
                             {"name":"txtNIIdenSecEmail","rule":[{"required":"n","type":"bussnamewithspecialchrs","minLength":"1","maxLength":"50","dispName":"Name Of Contact Person"}]},
                             {"name":"txtNIIdenwebsite","rule":[{"required":"n","type":"alphanumeric","maxLength":"50","dispName":"Website"}]}
                 ]};                   
function validateaddConactJson(id) 
{
if(document.getElementById('isDstReg1').checked){
addConactJson.field[15].rule[0].rule = [{"required":"n","type":"bussnamewithspecialchrs","minLength":"1","maxLength":"50"}];
addConactJson.field[15].rule[0].dispName ="Name of Contact Person";

}
else{
addConactJson.field[15].rule[0].rule = [{"required":"n","type":"email","minLength":"5","maxLength":"50"}];
addConactJson.field[15].rule[0].dispName ="Secondary Email Address"; 

}
var rtnFlag = validateFormFieldOnEvent(id, addConactJson);
getErrTabToggle('TabView','15');
if(!rtnFlag)
{
  tabview_switch('TabView', '15');
  hideAndShowTable("errorDiv");
}
return rtnFlag;
}

function validateaddConactJsonDst(id) 
{
var rtnFlag = validateFormFieldOnEvent(id, addConactJsonDst);
getErrTabToggle('TabView','15');
if(!rtnFlag)
{
  tabview_switch('TabView', '15');
  hideAndShowTable("errorDiv");
}
return rtnFlag;
}

// bussiness details JSON
var bussDetailsJson={"field":[
                             {"name":"cmbNIIdenBussTyp","rule":[{"required":"y","dispName":"Business Type"}]},
                             {"name":"cmbNIIdenBussSubTyp","rule":[{"required":"y","dispName":"Business Sub Type"}]},
                             {"name":"txtSoiBussCertRegNum","rule":[{"required":"y","type":"alphanumericspecialchara","dispName":"Business Registration Certificate Number","maxLength":"20"}]},
                             {"name":"tradingBusName","rule":[{"required":"n","type":"bussnamewithspecialchrs","dispName":"Trading /Business Name-If different than registered name", "maxLength":"100"}]},
                             {"name":"calSoiBussCommDt","rule":[{"required":"y","type":"date","dispName":"Business Commencement Date"}]},
                             {"name":"txtSoiBussNm","rule":[{"required":"y","type":"bussnamewithspecialchrs","dispName":"Business Name", "maxLength":"100"}]},
                             {"name":"calSoiBussRegDt","rule":[{"required":"y","type":"date","dispName":"Business Registration Date"}]},
                             {"name":"accMonth","rule":[{"required":"y","dispName":"Accounting Period"}]},
                             {"name":"isBusinessBranch","rule":[{"required":"y","dispName":"Does your business have any branches ?"}]},
                             {"name":"isLegalRepresentative","rule":[{"required":"y","dispName":"Do you wish to declare Legal Representative ?"}]},
                             {"name":"legalRepresentativePin","rule":[{"required":"n","dispName":"Legal Representative PIN","dependent":[{"ids":"isLegalRepresentative","values":"YES","rule":[{"required":"y","type":"alphanumericwithoutspace"}]}]}]},
                             {"name":"txtTxprKENssfNo","rule":[{"required":"n","type":"numericwithalphacharax","dispName":"NSSF Number"}]},
                             {"name":"calepzEffectiveDateVal","rule":[{"required":"n","dispName":"EPZ Effective Date","dependent":[{"ids":"cmbNIIdenBussSubTyp","values":"EPZCOMP","rule":[{"required":"y","type":"date"}]}]}]},
                             {"name":"calsezEffectiveDateVal","rule":[{"required":"n","dispName":"SEZ Effective Date","dependent":[{"ids":"cmbNIIdenBussSubTyp","values":"SEZCOMP","rule":[{"required":"y","type":"date"}]}]}]}
                 ]};
function validateabussDetailsJson(id) 
{
var rtnFlag = validateFormFieldOnEvent(id, bussDetailsJson);
getErrTabToggle('TabView','15');
if(!rtnFlag)
{
  tabview_switch('TabView', '15');
  hideAndShowTable("errorDiv");
}
return rtnFlag;
}

//Person associated with Business JSON
var personAssoBussJson={"field":[
                               {"name":"in_dtPersonDtls_3","rule":[{"required":"y","dispName":"Nature of Association"}]},
                               {"name":"in_dtPersonDtls_4","rule":[{"required":"y","type":"alphanumericwithoutspace","dispName":"PIN"}]},
                               {"name":"in_dtPersonDtls_5","rule":[{"required":"n","dispName":"Profit/Loss Sharing Ratio","dependent":[{"ids":"in_dtPersonDtls_3","values":"PARTNER","rule":[{"required":"y","type":"numeric","maxLength":"5"}]}]}]},
                               {"name":"in_dtPersonDtls_7","rule":[{"required":"n","dispName":"Other","dependent":[{"ids":"in_dtPersonDtls_3","values":"OTHER","rule":[{"required":"y","type":"alpha","maxLength":"50"}]}]}]},
                               {"name":"txtNIPABFName","rule":[{"required":"n","type":"bussnamewithspecialchrs","dispName":"Associated person First Name"}]},
                               {"name":"txtNIPABMName","rule":[{"required":"n","type":"bussnamewithspecialchrs","dispName":"Associated person Middle Name"}]},
                               {"name":"txtNIPABLName","rule":[{"required":"n","type":"bussnamewithspecialchrs","dispName":"Associated person Last Name"}]}
                   ]};
function validatePersonAssoBussJson(id) 
{
var rtnFlag = validateFormFieldOnEvent(id, personAssoBussJson);
getErrTabToggle('TabView','15');
if(!rtnFlag)
{
  tabview_switch('TabView', '15');
  hideAndShowTable("errorDiv");
}
return rtnFlag;
}
function validatePersonAssoBussJsononAdd()
{
resetErrorList();

var rtnFlag = validateFormFields(personAssoBussJson);
getErrTabToggle('TabView','15');	
if(!rtnFlag)
{
  tabview_switch('TabView', '15');
  hideAndShowTable("errorDiv");
}
return rtnFlag;
}

// authorised agent JSON
/*
var authAgentJson={"field":[
                             {"name":"cmbNIAAIsaa","rule":[{"required":"y","dispName":"Do you have any Authorized Agent?"}]},
                               {"name":"txtIAPin","rule":[{"required":"n","dispName":"Authorised Agent PIN","dependent":[{"ids":"cmbNIAAIsaa","values":"Yes","rule":[{"required":"y","type":"alphanumericwithoutspace"}]}]}]},
                               {"name":"calNIAAAuthDtSince","rule":[{"required":"n","dispName":"Agent Authorization Date Since","dependent":[{"ids":"cmbNIAAIsaa","values":"Yes","rule":[{"required":"y","type":"date"}]}]}]},
                               {"name":"calNIAAauthDtUpto","rule":[{"required":"n","dispName":"Agent Authorization Date Upto","dependent":[{"ids":"cmbNIAAIsaa","values":"Yes","rule":[{"required":"y","type":"date"}]}]}]}
                   ]};
function validateauthAgentJson(id) 
{
  var rtnFlag = validateFormFieldOnEvent(id, authAgentJson);
  getErrTabToggle('TabView','15');	
  if(!rtnFlag)
{
  tabview_switch('TabView', '15');
  hideAndShowTable("errorDiv");
}
  return rtnFlag;
}*/

//Subsidiary JSON
var subsidiaryJson={"field":[
                               {"name":"cmbRegSubComp","rule":[{"required":"y","dispName":"Is the Company you are registering a Subsidiary Company?"}]},
                                 {"name":"cmbCompResi","rule":[{"required":"n","dispName":"Is the Principal Holding Company Resident in Kenya?","dependent":[{"ids":"cmbRegSubComp","values":"Yes","rule":[{"required":"y"}]}]}]},
                                 {"name":"txtHoldCompPIN","rule":[{"required":"n","dispName":"Holding Company PIN","dependent":[{"ids":"cmbCompResi","values":"Yes","rule":[{"required":"y","type":"alphanumericwithoutspace"}]}]}]},
                                 {"name":"txtCompName","rule":[{"required":"n","dispName":"Name of Company","dependent":[{"ids":"cmbCompResi","values":"No","rule":[{"required":"y","type":"bussnamewithspecialchrs"}]}]}]},
                                 {"name":"cmbCompCountry","rule":[{"required":"n","dispName":"Country in which Company is located","dependent":[{"ids":"cmbCompResi","values":"No","rule":[{"required":"y"}]}]}]}
                                ]};

  function validateSubsidiaryJson(id) 
  {
    var rtnFlag = validateFormFieldOnEvent(id, subsidiaryJson);
    getErrTabToggle('TabView','15');	
    if(!rtnFlag)
  {
    tabview_switch('TabView', '15');
    hideAndShowTable("errorDiv");
  }
    return rtnFlag;
  }
 
//Intermediary  agent JSON
var interAgentJson={"field":[
                                 {"name":"in_dtIADtls_3","rule":[{"required":"y","dispName":"Intermediary Agent PIN"}]},
                                 {"name":"in_dtIADtls_8","rule":[{"required":"y","type":"date","dispName":"Intermediary Agent Authorization Date Since"}]},
                                 {"name":"in_dtIADtls_9","rule":[{"required":"n","type":"date","dispName":"Intermediary Agent Authorization Date Upto"}]},
                                 {"name":"in_dtIADtls_14","rule":[{"required":"y","dispName":"Type of Authorization"}]},
                                 {"name":"in_dtIADtls_4","rule":[{"required":"n","dispName":"Tax Obligation","dependent":[{"ids":"in_dtIADtls_14","values":"PAR","rule":[{"required":"y"}]}]}]},
                                 {"name":"in_dtIADtls_10","rule":[{"required":"n","type":"bussnamewithspecialchrs","dispName":"Intermediary Agent First name"}]},
                                 {"name":"in_dtIADtls_11","rule":[{"required":"n","type":"bussnamewithspecialchrs","dispName":"Intermediary Agent Middle name"}]},
                                 {"name":"in_dtIADtls_12","rule":[{"required":"n","type":"bussnamewithspecialchrs","dispName":"Intermediary Agent Last name"}]} 
                     ]};
  function validateinterAgentJsonJson(id) 
  {
    var rtnFlag = validateFormFieldOnEvent(id, interAgentJson);
    getErrTabToggle('TabView','15');
    if(!rtnFlag)
  {
    tabview_switch('TabView', '15');
    hideAndShowTable("errorDiv");
  }
    return rtnFlag;
  }
  function validateinterAgentJsononAdd()
  {
    resetErrorList();
    var rtnFlag = validateFormFields(interAgentJson);
    getErrTabToggle('TabView','15');	
    if(!rtnFlag)
    {
      tabview_switch('TabView', '15');
      hideAndShowTable("errorDiv");
    }
    /*if(rtnFlag)
    {
      rtnFlag=validateBussActDtlsForAdd();
    }*/
    return rtnFlag;
  }
//Tributory Bond JSON
  var tributoryBondJson={"field":[
                                   {"name":"in_dtTributoryDtls_3","rule":[{"required":"y","dispName":"Type of Bond"}]},
                                   {"name":"in_dtTributoryDtls_4","rule":[{"required":"y","type":"alphanumericwithoutspace","dispName":"PIN"}]},
                                   {"name":"in_dtTributoryDtls_7","rule":[{"required":"y","type":"date","dispName":"the Date of Acquisition/Amalgamation"}]},
                                   {"name":"in_dtTributoryDtls_5","rule":[{"required":"n","type":"bussnamewithspecialchrs","dispName":"Taxpayer Name(Tributory bond)"}]}
                       ]};
    function validatetributoryBondJson(id) 
    {
      var rtnFlag = validateFormFieldOnEvent(id, tributoryBondJson);
      getErrTabToggle('TabView','15');	
      if(!rtnFlag)
  {
    tabview_switch('TabView', '15');
    hideAndShowTable("errorDiv");
  }
      return rtnFlag;
    }
    function validatetributoryBondJsononAdd()
    {
    resetErrorList();
      var rtnFlag = validateFormFields(tributoryBondJson);
      getErrTabToggle('TabView','15');	
      if(!rtnFlag)
      {
        tabview_switch('TabView', '15');
        hideAndShowTable("errorDiv");
      }
      /*if(rtnFlag)
      {
        rtnFlag=validateBussActDtlsForAdd();
      }*/
      return rtnFlag;
    }
    
// Trbutory address contact details JSON    
    var triAddConactJson={"field":[
                                {"name":"cmbIsAlterAdd","rule":[{"required":"y","dispName":"Do you have an Alternative Address?"}]},
                                {"name":"txtNIAAdBlockNo","rule":[{"required":"n","dispName":"LR Number","dependent":[{"ids":"cmbIsAlterAdd","values":"Yes","rule":[{"required":"n","type":"alphanumericspecialchara","maxLength":"50"}]}]}]},
                                {"name":"txtNIAAdBuilding","rule":[{"required":"n","dispName":"Building","dependent":[{"ids":"cmbIsAlterAdd","values":"Yes","rule":[{"required":"y","type":"alphanumericspecialcharaemp","maxLength":"50"}]}]}]},
                                {"name":"txtNIAAdStrtRoad","rule":[{"required":"n","dispName":"Street/Road","dependent":[{"ids":"cmbIsAlterAdd","values":"Yes","rule":[{"required":"y","type":"alphanumericspecialchara","maxLength":"50"}]}]}]},
                                {"name":"txtNIAAdCity","rule":[{"required":"n","dispName":"City/Town","dependent":[{"ids":"cmbIsAlterAdd","values":"Yes","rule":[{"required":"y","type":"alphanumericspecialcharacity","maxLength":"50"}]}]}]},
                                {"name":"txtNIAAdCounty","rule":[{"required":"n","dispName":"County","dependent":[{"ids":"cmbIsAlterAdd","values":"Yes","rule":[{"required":"y"}]}]}]},
                                {"name":"txtNIAAdDistrict","rule":[{"required":"n","dispName":"District","dependent":[{"ids":"cmbIsAlterAdd","values":"Yes","rule":[{"required":"y"}]}]}]},
                                {"name":"txtNIAAdLocality","rule":[{"required":"n","dispName":"Tax Area/Locality","dependent":[{"ids":"cmbIsAlterAdd","values":"Yes","rule":[{"required":"y"}]}]}]},
                                {"name":"txtNIAAdDescAddr","rule":[{"required":"n","dispName":"Descriptive Address","dependent":[{"ids":"cmbIsAlterAdd","values":"Yes","rule":[{"required":"n","type":"alphanumericspecialcharaemp","maxLength":"200"}]}]}]},
                                {"name":"txtNIAAdpostalCode","rule":[{"required":"n","dispName":"Postal Code","dependent":[{"ids":"cmbIsAlterAdd","values":"Yes","rule":[{"required":"y"}]}]}]},
                                {"name":"txtNIAAdTown","rule":[{"required":"n","dispName":"Town","dependent":[{"ids":"cmbIsAlterAdd","values":"Yes","rule":[{"required":"y"}]}]}]},
                                {"name":"txtNIAAdPOBox","rule":[{"required":"n","dispName":"P.O. Box","dependent":[{"ids":"cmbIsAlterAdd","values":"Yes","rule":[{"required":"y","type":"onlynumeric","minLength":"1","maxLength":"15"}]}]}]},
                                {"name":"txtNIAAdTelNo","rule":[{"required":"n","dispName":"Telephone Number","dependent":[{"ids":"cmbIsAlterAdd","values":"Yes","rule":[{"required":"n","type":"onlynumeric","minLength":"8","maxLength":"15"}]}]}]},
                                {"name":"txtNIAAdMobNo1","rule":[{"required":"n","dispName":"Mobile Number","dependent":[{"ids":"cmbIsAlterAdd","values":"Yes","rule":[{"required":"y","type":"onlynumeric","minLength":"8","maxLength":"15"}]}]}]},
                                {"name":"txtNIAAdMainEmail","rule":[{"required":"n","dispName":"Main Email Address","dependent":[{"ids":"cmbIsAlterAdd","values":"Yes","rule":[{"required":"y","type":"email","minLength":"5","maxLength":"50"}]}]}]}
                                
                    ]};
 function validatetriAddConactJson(id) 
 {
   var rtnFlag = validateFormFieldOnEvent(id, triAddConactJson);
   getErrTabToggle('TabView','15');	
   if(!rtnFlag)
{
  tabview_switch('TabView', '15');
  hideAndShowTable("errorDiv");
}
   return rtnFlag;
 }
 
function clearVatData(flag)
{
if(!flag)
{
  document.getElementById('txtPSTaxSupplyThirdYr').value= '';
  document.getElementById('txtPSExSupplyThirdYr').value= '';
  document.getElementById('txtPSExportedThirdYr').value= '';
  
  document.getElementById('txtPSTaxSupplySeYr').value= '';
  document.getElementById('txtPSExSupplySeYr').value= '';
  document.getElementById('txtPSExportedSeYr').value= '';
  
  document.getElementById('txtPSTaxSupplyLastYr').value= '';
  document.getElementById('txtPSExSupplyLastYr').value= '';
  document.getElementById('txtPSExportedLastYr').value= '';
  
  document.getElementById('txtPSTaxSupplyNextYr').value= '';
  document.getElementById('txtPSExSupplyNextYr').value= '';
  document.getElementById('txtPSExportedNextYr').value= '';
  
}
}
//VAT JSON    
var vatJson={"field":[
                          {"name":"txtPSTaxSupplyThirdYr","rule":[{"required":"n","type":"currency","dispName":"Turnover Third Year (Taxable Supplies in Kenya)","dependent":[{"ids":"chkNIObliVat","values":"9","rule":[{"required":"n","type":"currency","minLength":"1","maxLength":"19"}]}]}]},
                          {"name":"txtPSExSupplyThirdYr","rule":[{"required":"n","type":"currency","dispName":"Turnover Third Year (Exempt Supplies in Kenya)","dependent":[{"ids":"chkNIObliVat","values":"9","rule":[{"required":"n","type":"currency","minLength":"1","maxLength":"19"}]}]}]},
                          {"name":"txtPSExportedThirdYr","rule":[{"required":"n","type":"currency","dispName":"Turnover Third Year (Exports)","dependent":[{"ids":"chkNIObliVat","values":"9","rule":[{"required":"n","type":"currency","minLength":"1","maxLength":"19"}]}]}]},
                          
                          {"name":"txtPSTaxSupplySeYr","rule":[{"required":"n","type":"currency","dispName":"Turnover Second Year (Taxable Supplies in Kenya)","dependent":[{"ids":"chkNIObliVat","values":"9","rule":[{"required":"n","type":"currency","minLength":"1","maxLength":"19"}]}]}]},
                          {"name":"txtPSExSupplySeYr","rule":[{"required":"n","type":"currency","dispName":"Turnover Second Year (Exempt Supplies in Kenya)","dependent":[{"ids":"chkNIObliVat","values":"9","rule":[{"required":"n","type":"currency","minLength":"1","maxLength":"19"}]}]}]},
                          {"name":"txtPSExportedSeYr","rule":[{"required":"n","type":"currency","dispName":"Turnover Second Year (Exports)","dependent":[{"ids":"chkNIObliVat","values":"9","rule":[{"required":"n","type":"currency","minLength":"1","maxLength":"19"}]}]}]},
                          
                          {"name":"txtPSTaxSupplyLastYr","rule":[{"required":"n","type":"currency","dispName":"Turnover Last Year (Taxable Supplies in Kenya)","dependent":[{"ids":"chkNIObliVat","values":"9","rule":[{"required":"n","type":"currency","minLength":"1","maxLength":"19"}]}]}]},
                          {"name":"txtPSExSupplyLastYr","rule":[{"required":"n","type":"currency","dispName":"Turnover Last Year (Exempt Supplies in Kenya)","dependent":[{"ids":"chkNIObliVat","values":"9","rule":[{"required":"n","type":"currency","minLength":"1","maxLength":"19"}]}]}]},
                          {"name":"txtPSExportedLastYr","rule":[{"required":"n","type":"currency","dispName":"Turnover Last Year (Exports)","dependent":[{"ids":"chkNIObliVat","values":"9","rule":[{"required":"n","type":"currency","minLength":"1","maxLength":"19"}]}]}]},
                          
                          {"name":"txtPSTaxSupplyNextYr","rule":[{"required":"n","type":"currency","dispName":"Estimate Turnover Next Year (Taxable Supplies in Kenya)","dependent":[{"ids":"chkNIObliVat","values":"9","rule":[{"required":"y","type":"currency","minLength":"1","maxLength":"19"}]}]}]},
                          {"name":"txtPSExSupplyNextYr","rule":[{"required":"n","type":"currency","dispName":"Estimate Turnover Next Year (Exempt Supplies in Kenya)","dependent":[{"ids":"chkNIObliVat","values":"9","rule":[{"required":"y","type":"currency","minLength":"1","maxLength":"19"}]}]}]},
                          {"name":"txtPSExportedNextYr","rule":[{"required":"n","type":"currency","dispName":"Estimate Turnover Next Year (Exports)","dependent":[{"ids":"chkNIObliVat","values":"9","rule":[{"required":"y","type":"currency","minLength":"1","maxLength":"19"}]}]}]}
                          
              ]};
function validateVatJson(id) 
{
var rtnFlag = validateFormFieldOnEvent(id, vatJson);
getErrTabToggle('TabView','15');
if(!rtnFlag)
{
  tabview_switch('TabView', '15');
  hideAndShowTable("errorDiv");
}
return rtnFlag;
}
function validatevatJsonForm()
{
var rtnFlag = validateFormFields(vatJson);
getErrTabToggle('TabView','15');	
if(!rtnFlag)
{
  tabview_switch('TabView', '15');
  hideAndShowTable("errorDiv");
}
/*if(rtnFlag)
{
  rtnFlag=validateBussActDtlsForAdd();
}*/
return rtnFlag;
}
function gotoNextVat()
{
if (document.getElementById('cmbNIIdenBussSubTyp').value=='ESTTRST' && document.getElementById('cmbNIIdenBussTyp').value=='OTHERS'){
  tabview_switch('TabView', '6');
}else{
  saveNIDDEFormSendForVerf();
}
}
function gotoNextExcise()
{
if (document.getElementById('cmbNIIdenBussSubTyp').value=='ESTTRST' && document.getElementById('cmbNIIdenBussTyp').value=='OTHERS')
{
  tabview_switch('TabView', '6');
}
}
function gotoNextForBussBranch(goTo){
if(goTo=='next'){
  if (null!=document.getElementById('isBusinessBranch').value && document.getElementById('isBusinessBranch').value=='Yes'){
    tabview_switch('TabView', '3');		
  }
  if(document.getElementById('isDstReg1').checked){
    tabview_switch('TabView', '5');	
  }
  else{
    tabview_switch('TabView', '4');
  }
}else if(goTo=='prev'){
  if (null!=document.getElementById('isBusinessBranch').value && document.getElementById('isBusinessBranch').value=='Yes'){
    tabview_switch('TabView', '3');
  }
  if(document.getElementById('isDstReg1').checked){
    tabview_switch('TabView', '2');	
  }
  else{
    tabview_switch('TabView', '2');
  }
}

}
function gotoPrevFromET()
{
tabview_switch('TabView', '5');
}
function showHideAlterAddDiv(compVal)
{
if(compVal.toLowerCase()=='yes'){
  document.getElementById('alterAddDtls').style.display='block';
}else{
  document.getElementById('alterAddDtls').style.display='none';
}
}
function checkAssociateType()
{
var bussType=document.getElementById('cmbNIIdenBussSubTyp').value;
if(document.getElementById('cmbNIIdenBussTyp').value!='')
{
  if(bussType != "PRTNRSHP")
  {
    if(document.getElementById('in_dtPersonDtls_3').value=='PARTNER')
    {
      alert('Please select Director in case of Company under Section D :persons associated with Business. You can select Business Associate along with Director.');
      document.getElementById('in_dtPersonDtls_3').value = '';
      return false;
    }else
      return true;
    
  }
  else
  {
    if(document.getElementById('in_dtPersonDtls_3').value=='DIRECTOR')
    {
      alert("Please select Partner in case of Partnership.");
      document.getElementById('in_dtPersonDtls_3').value = '';
      
      return false;
    }
    else if(document.getElementById('in_dtPersonDtls_3').value=='BUSASS')
    {
      alert("Please select Partner in case of Partnership.");
      document.getElementById('in_dtPersonDtls_3').value = '';
      
      return false;
    }else
      return true;
  }
}else
  return true;
}

function chkPersonAssBussRow()
{
var subType = document.getElementById('cmbNIIdenBussSubTyp').value;
var tab_id= 'dtPersonDtls';

  var srcTable = document.getElementById(tab_id);
  for (var r = 1; r < srcTable.rows.length; r++)
  {
    
    colValArray = (document.getElementById("id_"+tab_id+"_"+r).value).split(columnsDelimiter);
    
        if((trim(colValArray[0].split(propertyValueDelimiter)[1])=='DIRECTOR') && document.getElementById('id_'+tab_id+'_'+r+'_1').name!='deleted' && null!=document.getElementById('id_'+tab_id+'_'+r+'_2') &&   document.getElementById('id_'+tab_id+'_'+r+'_2').name!='Modifying')
          { 
          if(subType=='PRTNRSHP')
          {
            alert('Please delete the row having associate type DIRECTOR in Person Associated details section');
            enableRequiredTab('in_dtPersonDtls_3');
            return false;
          
          }
          }
        if((trim(colValArray[0].split(propertyValueDelimiter)[1])=='PARTNER') && document.getElementById('id_'+tab_id+'_'+r+'_1').name!='deleted' && null!=document.getElementById('id_'+tab_id+'_'+r+'_2') &&   document.getElementById('id_'+tab_id+'_'+r+'_2').name!='Modifying')
          { 
          if(subType!='PRTNRSHP')
          {
            if(!document.getElementById('isDstReg1').checked){
            alert('Please delete the row having associate type PARTNER in Person Associated details section');
            enableRequiredTab('in_dtPersonDtls_3');
            return false;
            }
          }
          }
  }
  return true;

}
function setDataforPersonAssBuss()
{

var tab_id= 'dtPersonDtls';
if (validatePersonAssoBussJsononAdd())
{
  if(checkAssociateType())
  {
  var srcTable = document.getElementById(tab_id);
  for (var r = 1; r < srcTable.rows.length; r++)
  {
    
    colValArray = (document.getElementById("id_"+tab_id+"_"+r).value).split(columnsDelimiter);
    
        if(trim(colValArray[0].split(propertyValueDelimiter)[1])==document.getElementById('in_'+tab_id+'_3').value && document.getElementById('id_'+tab_id+'_'+r+'_1').name!='deleted' && null!=document.getElementById('id_'+tab_id+'_'+r+'_2') &&   document.getElementById('id_'+tab_id+'_'+r+'_2').name!='Modifying')
          { 
          if((colValArray[1].split(propertyValueDelimiter)[1])==document.getElementById('in_'+tab_id+'_4').value)
          {
            
            alert('You cannot select the same associations for the same PIN');
            return false;
          }
          
         } 
       
      else if (trim(colValArray[0].split(propertyValueDelimiter)[1])!=document.getElementById('in_'+tab_id+'_3').value && document.getElementById('id_'+tab_id+'_'+r+'_1').name!='deleted' && null!=document.getElementById('id_'+tab_id+'_'+r+'_2') &&   document.getElementById('id_'+tab_id+'_'+r+'_2').name!='Modifying')
         {
        if((colValArray[1].split(propertyValueDelimiter)[1])==document.getElementById('in_'+tab_id+'_4').value)
          {
            alert('You cannot enter same PIN for two different Natures of Association');
            return false;
          }
         }
  }
  document.getElementById('in_dtPersonDtls_6').value=document.getElementById('in_dtPersonDtls_3').value;
  return true;

  }
  else
  {
    return false;
  }
}

else
  
  {return false;}
}
function addRowEstateTrst(tab_id)
{
if(validateEstateTrustJsonAddRow())
{
  addrow(tab_id,'6','21');
  clearBenefData();
}
}
function addrowPersonwithBuss (tab_id)
{
if(setDataforPersonAssBuss())
{
  addrow(tab_id,'3','5');
  clearPersonDtlsRow();
}
}


var oblisec2Json={"field":[{"name":"calNIObliregDtITComp","rule":[{"required":"n","dispName":"Income Tax Company Registration Date","dependent":[{"ids":"chkNIObliITComp","values":"4","rule":[{"required":"y","type":"date"}]}]}]},
                       {"name":"calNIObliregDtITPrtnr","rule":[{"required":"n","dispName":"Income Tax Partnership Registration Date","dependent":[{"ids":"chkNIObliITPrtnr","values":"5","rule":[{"required":"y","type":"date"}]}]}]},
                       {"name":"calNIObliregDtITPaye","rule":[{"required":"n","dispName":"Income Tax PAYE Registration Date","dependent":[{"ids":"chkNIObliITPaye","values":"7","rule":[{"required":"y","type":"date"}]}]}]},
                       {"name":"calNIObliregDtVat","rule":[{"required":"n","dispName":"Value Added Tax Registration Date","dependent":[{"ids":"chkNIObliVat","values":"9","rule":[{"required":"y","type":"date"}]}]}]},
                       {"name":"calNIObliregDtITDST","rule":[{"required":"n","dispName":"Digital Service Tax Registration Date","dependent":[{"ids":"chkNIObliITDST","values":"44","rule":[{"required":"y","type":"date"}]}]}]}
                       
       ]};

function validateoblisec2Json(id) 
{
var rtnFlag = validateFormFieldOnEvent(id, oblisec2Json);
getErrTabToggle('TabView','15');	
if(!rtnFlag)
{
  tabview_switch('TabView', '15');
  hideAndShowTable("errorDiv");
}
return rtnFlag;
}
function validateDate(date)
{

if(validateoblisec2Json(date.id))
{checkBussRegDate(date);}
return true;
}
function createIntermAgentObli(compObj){
if(compObj.checked){
  var obliOption = document.createElement("option");
    obliOptionId = "interAg_obli_"+compObj.value;
    obliOptionValue = compObj.value;
    obliOptionText="";
  if(obliOptionValue==4){obliOptionText="Income Tax Company";}
  if(obliOptionValue==5){obliOptionText="Income Tax Partnership";}
  if(obliOptionValue==7){obliOptionText="Income Tax PAYE";}
  if(obliOptionValue==9){obliOptionText="Value Added Tax";}
  if(obliOptionValue==8){obliOptionText="Turn Over Tax";}
  obliOption.text = obliOptionText;
    obliOption.value = obliOptionValue;
    obliOption.title = obliOptionText;
    
    var objIAObligationDtl = document.getElementById("in_dtIADtls_4");
    var i;
  for (i = objIAObligationDtl.length - 1; i>=0; i--) 
  {
    if (objIAObligationDtl.options[i].value==compObj.value) 
    {
     return;
    }
  }
    objIAObligationDtl.options[objIAObligationDtl.options.length] = obliOption; 
    
    
    //alert("Yes Bhavesh 3"+document.getElementById("in_dtIADtls_4"));
    //document.getElementById("in_dtIADtls_4").add(obliOption);  
  //  alert("Yes Bhavesh 4");
}
else
{
  var obliInterAg = document.getElementById("in_dtIADtls_4");
  var i;
  for (i = obliInterAg.length - 1; i>=0; i--) 
  {
    if (obliInterAg.options[i].value==compObj.value) 
    {
      obliInterAg.remove(i);
    }
  }
}
}


function checkforPinSec1 ()
{
if(!document.getElementById('txtNIIdenExistPinY').checked && !document.getElementById('txtNIIdenExistPinN').checked)
{
  alert('Please select if you have previously applied for or been issued a PIN?');
  enableRequiredTab('txtNIIdenExistPinY');
  return false;
  
}
else if(document.getElementById('txtNIIdenExistPinY').checked)
{
  if(document.getElementById('txtNIIdenExistPin').value!='')
  {
    if(checkForExistingPinNonIndi())
    {
      
      /*if(validatePIN(document.getElementById('txtNIIdenExistPin').value,'NONINDI'))
      {
        return true;
      }
      else
      {
        return false;
      }
      */
      return true;
    }
    else
    {
      return false;
    }
  }
  else 
  {
    alert('Please Enter Existing PIN');
    enableRequiredTab('txtNIIdenExistPin');
    return false;
  }
}
return true;

/*else
  tabview_switch('TabView', '2');
}*/
}
function obligationCheck(tab_id,arrayCount)
{

  var srcTable = document.getElementById(tab_id);
  if(tab_id=='dtIADtls')
  {
    for (var r = 1; r < srcTable.rows.length; r++)
    {
      var count = 0;
      colValArray = (document.getElementById("id_"+tab_id+"_"+r).value).split(columnsDelimiter);
      
      if((colValArray[11].split(propertyValueDelimiter)[1])!="ATX")
      {
      
        var objIAObligationDtl = document.getElementById("in_dtIADtls_4");
          var i;
          var obliName;
      
        for (i = objIAObligationDtl.length - 1; i>0; i--) 
        {
            obliName = objIAObligationDtl.options[i].value;
            if(trim(colValArray[arrayCount].split(propertyValueDelimiter)[1])==obliName&& document.getElementById('id_'+tab_id+'_'+r+'_1').name!='deleted' && null!=document.getElementById('id_'+tab_id+'_'+r+'_2') &&   document.getElementById('id_'+tab_id+'_'+r+'_2').name!='Modifying')
            {
              count++;
            }
        }
      
        if(count==0)
        {
          
          if(trim(document.getElementById("id_"+tab_id+"_"+r+"_1").innerHTML)!="deleted")
          {
            alert('Please delete the row '+srcTable.rows[r].cells[4].innerHTML+' in Intermediary Agent details');
            enableRequiredTab('in_dtIADtls_3');
            return false;
          }
        }
      }
    }
  }
  else
  {
    for (var s = 1; s < srcTable.rows.length; s++)
    {
      var counter = 0;
      colValArray = (document.getElementById("id_"+tab_id+"_"+s).value).split(columnsDelimiter);
      
      
        var obligationDtl = document.getElementById("in_dtIADtls_4");
          var j;
          var obligationName;
          var taxbligation = colValArray[[arrayCount]].split(propertyValueDelimiter)[1].split(',');
          
          if(taxbligation!='')
          {
            for(var t=0;t<taxbligation.length;t++)
          {
              counter=0;
              for (j = obligationDtl.length - 1; j>0; j--) 
              {	
                
                obligationName = obligationDtl.options[j].text;
              
                if(trim(taxbligation[t]).toLowerCase()==trim("Income Tax PAYE(for Employer only)").toLowerCase())
                {
                  obligationName = obligationName+"(for Employer only)";
                }
                
                if(trim(taxbligation[t]).toLowerCase()==trim(obligationName).toLowerCase()&& document.getElementById('id_'+tab_id+'_'+s+'_1').name!='deleted' &&   document.getElementById('id_'+tab_id+'_'+s+'_2').name!='Modifying')
                {
                  counter++;
                }
                
            }
              
              if(counter==0)
              {
                
                if(trim(document.getElementById("id_"+tab_id+"_"+s+"_1").innerHTML)!="deleted")
                {
                  alert('Please delete the row having '+taxbligation[t]+' in Additional Business Branch details');
                  enableRequiredTab('in_dtPlaceDtls_3');
                  return false;
                }
              }
           }
            if(trim(document.getElementById("id_"+tab_id+"_"+s+"_1").innerHTML)!="deleted")
          {
            //  var compDt=trim(colValArray[21].split(propertyValueDelimiter)[1]);
             // var prtnrDt=trim(colValArray[22].split(propertyValueDelimiter)[1]);
              var payeDt=trim(colValArray[19].split(propertyValueDelimiter)[1]);
              var vatDt=trim(colValArray[20].split(propertyValueDelimiter)[1]);
              /*if(''!=compDt)
              {
                if(!fnCompareDates(document.getElementById('calNIObliregDtITComp').value,compDt))
                {
                if(document.getElementById('calNIObliregDtITComp').value!=compDt)
                {
                  alert('Branch Income Tax Company registration Date should be greater than or equal to Income Tax Company registration Date.');
                  return false;
                }
                
                }
              }
              if(''!=prtnrDt)
              {
                if(!fnCompareDates(document.getElementById('calNIObliregDtITPrtnr').value,prtnrDt))
                {
                if(document.getElementById('calNIObliregDtITPrtnr').value!=prtnrDt)
                {
                  alert('Branch Income Tax Partnership registration Date should be greater than or equal to Income Tax Partnership registration Date.');
                  return false;
                }
                
                }
              }*/
              if(''!=payeDt)
              {
                if(!fnCompareDates(document.getElementById('calNIObliregDtITPaye').value,payeDt))
                {
                if(document.getElementById('calNIObliregDtITPaye').value!=payeDt)
                {
                  alert('Branch Income Tax PAYE Registration Date should be greater than or equal to Income Tax PAYE Registration Date');
                  enableRequiredTab('in_dtPlaceDtls_3');
                  return false;
                }
                
                }
              }
              if(''!=vatDt)
              {
                if(!fnCompareDates(document.getElementById('calNIObliregDtVat').value,vatDt))
                {
                if(document.getElementById('calNIObliregDtVat').value!=vatDt)
                {
                  alert('Branch VAT registration Date should be greater than or equal to Value Added Tax registration Date.');
                  enableRequiredTab('in_dtPlaceDtls_3');
                  obj.value='';
                  return false;
                }
                
                }
              }
          }
          }
    }
    
  }
return true;
}
function checkForExistingPinNonIndi()
{
var pin = document.getElementById("txtNIIdenExistPin").value;
if(pin!='' || null!=pin)
{
  var tab_id = "dtPersonDtls";
  var srcTable = document.getElementById(tab_id);
  for (var r = 1; r < srcTable.rows.length; r++)
  {
    if(trim(document.getElementById("id_"+tab_id+"_"+r+"_1").innerHTML)!="deleted")
    {
          if(trim(srcTable.rows[r].cells[4].innerHTML)==pin)
          {
            alert("PIN "+trim(srcTable.rows[r].cells[4].innerHTML)+" entered at Associated Person section matches with Already Existing PIN");
            return false;
          }
    }
     }
  var authorisedPin = document.getElementById("txtIAPin").value;
  if(null!=authorisedPin || authorisedPin!='')
  {
    if(authorisedPin==pin)
    {
      alert("PIN "+authorisedPin+" entered at Authorised agent section matches with Already existing PIN");	
      return false;
    }
  }
  
  tab_id = 'dtIADtls';
  var agentTable = document.getElementById(tab_id);
  for (var s = 1; s < agentTable.rows.length; s++)
  {
    if(trim(agentTable.rows[s].cells[3].innerHTML)==pin)
    {
        if(trim(document.getElementById("id_"+tab_id+"_"+s+"_1").innerHTML)!="deleted")
        {
          alert("PIN "+trim(agentTable.rows[s].cells[3].innerHTML)+" entered at Intermediary agent section matches with Already existing PIN");	
          return false;
           }
    }
  }
   tab_id='dtTributoryDtls';
  var tribTable = document.getElementById(tab_id);
  for (var t = 1; t < tribTable.rows.length; t++)
  {
    if(trim(tribTable.rows[t].cells[4].innerHTML)==pin)
    {
        if(trim(document.getElementById("id_"+tab_id+"_"+t+"_1").innerHTML)!="deleted")
        {
          alert("PIN "+trim(tribTable.rows[t].cells[4].innerHTML)+" entered at Tributory bond section matches with Already existing PIN");	
          return false;
           }
    }
    }
  
}
return true;
}
function checkVatDate(obj){

obj.value = trim(obj.value);
if(checkdate(obj))
{if(document.getElementById('isDstReg1').checked){
  if(document.getElementById('calSoiBussCommDt').value !='' && null !=document.getElementById('calSoiBussCommDt').value){
   var commDt =document.getElementById('calSoiBussCommDt').value;
   var dateFormatDate = commDt.slice(0, 2);	 
   var dateFormatMonth = commDt.slice(3, 5);
   var dateFormatYear = commDt.slice(6, 10);
   var totalFormat = dateFormatMonth + "/" + dateFormatDate + "/" + dateFormatYear;
   
   commDt  = new Date(totalFormat);
   var vatDt = obj.value;
   var dateFormatDate = vatDt.slice(0, 2);	 
   var dateFormatMonth = vatDt.slice(3, 5);
   var dateFormatYear = vatDt.slice(6, 10);
   var totalFormat = dateFormatMonth + "/" + dateFormatDate + "/" + dateFormatYear;
   vatDt  = new Date(totalFormat);
   if(vatDt.getTime() < commDt.getTime()){ 
     alert('The Registration Date should be on or after Business Commencement Date. ');
     obj.value='';
     return false;
   }
   else
     return true;
}
else{
  alert('Please enter Business Commencement Date first.');
  obj.value='';
  return false;
}
}
  if(document.getElementById('chkNIObliITComp').checked==true)
  {
    if(document.getElementById('calNIObliregDtITComp').value =='')
    {
      alert('Please enter Income Tax Company registration Date First');
      obj.value= '';
      return false;
    }
    else{
      if(fnCompareDates(document.getElementById('calNIObliregDtITComp').value,obj.value))
        {
              return true;
      }else
      {
        obj.value ='';
        obj.focus();
        alert('Value Added Tax registration Date cannot be before Income Tax Company registration Date');
        return false;
      }
    }
  }
  else if(document.getElementById('chkNIObliITPrtnr').checked==true)
  {
    if(document.getElementById('calNIObliregDtITPrtnr').value =='')
    {
      alert('Please enter Income Tax Partnership registration Date First');
      obj.value='';
      return false;
    }
    else{
      if(fnCompareDates(document.getElementById('calNIObliregDtITPrtnr').value,obj.value))
        {
              return true;
      }else
      {
        obj.value ='';
        obj.focus();
        alert('Value Added Tax registration Date cannot be before Income Tax Partnership registration Date');
        return false;
      }
    }
  }
  if(document.getElementById('chkNIObliITTot').checked)
  {
    if(document.getElementById('calNIObliregDtTot').value !='')
    {
      if(!isEqual(document.getElementById('calNIObliregDtTot').value,obj.value))
      {
        if(dateCheck(document.getElementById('calNIObliregDtTot').value,obj.value))
          {
          obj.value ='';
          obj.focus();
          alert(type+' Registration Date cannot be before Income Tax Turnover Tax Registration Date');
          return false;
        }
      }
    }
  }
  else
    return false;
}else
  return false;
}
function checkPayeeDate(obj){

obj.value = trim(obj.value);
if(checkdate(obj))
{
  if(document.getElementById('chkNIObliITComp').checked==true)
  {
    if(document.getElementById('calNIObliregDtITComp').value =='')
    {
      alert('Please enter Income tax company registration Date First');
      obj.value='';
      return false;
    }
    else{
      if(fnCompareDates(document.getElementById('calNIObliregDtITComp').value,obj.value))
        {
              return true;
      }else
      {
        obj.value ='';
        obj.focus();
        alert('Income Tax PAYE registration Date cannot be before Income Tax Company registration Date');
        return false;
      }
    }
  }
  else if(document.getElementById('chkNIObliITPrtnr').checked==true)
  {
    if(document.getElementById('calNIObliregDtITPrtnr').value =='')
    {
      alert('Please enter Income Tax Partnership registration Date First');
      obj.value='';
      return false;
    }
    else{
      if(fnCompareDates(document.getElementById('calNIObliregDtITPrtnr').value,obj.value))
        {
              return true;
      }else
      {
        obj.value ='';
        obj.focus();
        alert('Income Tax PAYE registration Date cannot be before Income Tax Partnership registration Date');
        return false;
      }
    }
  }
  else if(document.getElementById('chkNIObliITTot').checked)
  {
    if(document.getElementById('calNIObliregDtTot').value !='')
    {
      if(!isEqual(document.getElementById('calNIObliregDtTot').value,obj.value))
      {
        if(dateCheck(document.getElementById('calNIObliregDtTot').value,obj.value))
          {
          obj.value ='';
          obj.focus();
          alert('Income Tax PAYE Registration Date cannot be before Income Tax Turnover Tax Registration Date');
          return false;
        }
      }
    }
  }
  else
    return false;
}else
  return false;
}
function chkCommEPZDate(obj)
{
var EPZDt = trim(document.getElementById('calepzEffectiveDateVal').value);
if (obj.value!='' && EPZDt!='')
{
  obj.value = trim(obj.value);
  
  if(!fnCompareDates(EPZDt,obj.value))
    {
      obj.value ='';
    alert('Business Commencement Date cannot be before EPZ Date');
    return false;
  }
}
return true;
}
function checkBussRegDate (obj)
{
if (allowTodayAndPastDateServer(obj.id))
{
  var commncDt = trim(document.getElementById('calSoiBussCommDt').value);
  if (commncDt!='')
  {
    obj.value = trim(obj.value);
    
    if(!fnCompareDates(obj.value,commncDt))
      {
        obj.value ='';
      obj.focus();
      alert('Date cannot be after Business Commencement Date');
      return false;
    }
  }
  /*else
  {
    alert('Please enter Business Commencement Date First');
    obj.value ='';
    return false;
  }*/
  
  
  var regDt = trim(document.getElementById('calSoiBussRegDt').value);
  if (regDt!='')
  {
    if(!fnCompareDates(regDt,obj.value))
    {
      obj.value ='';
      obj.focus();
      alert('Date cannot be before Business Registration Date');
      return false;
    }
  }
}
else
{
  return false;
}
return true;	
}
function changeSubmitSec5(flag)
{
if(flag)
{
  //enable next for page 5, disable submit of page 5
  document.getElementById('fiveNext').style.display="";
   document.getElementById('fiveSubmit').style.display="none";
}
if (document.getElementById('cmbNIIdenBussSubTyp').value=='ESTTRST' && document.getElementById('cmbNIIdenBussTyp').value=='OTHERS'){
  if(null == document.getElementById("eserviceFlag").value || document.getElementById("eserviceFlag").value== "" || document.getElementById("eserviceFlag").value == 'null')
  showHideCaptcha('captchaOnEstateTrust');
}else{
  document.getElementById('fiveNext').style.display="none";
   document.getElementById('fiveSubmit').style.display="";
   if(null == document.getElementById("eserviceFlag").value || document.getElementById("eserviceFlag").value== "" || document.getElementById("eserviceFlag").value == 'null')
   showHideCaptcha('captchaOnPage6');
}
}
/*function showHideAgentData(val)
{
if(val=='Yes')
  document.getElementById('authAgentDiv').style.display="";
else
  document.getElementById('authAgentDiv').style.display="none";
}*/
function fetchSubactData ()
{
var srcTable = document.getElementById('dtEcoActDtls');

for (var r = 1; r < srcTable.rows.length; r++)
{
      if(null!= document.getElementById('id_dtEcoActDtls_'+r+'_2') && document.getElementById('id_dtEcoActDtls_'+r+'_2').name=='Modifying')
        colValArray = (document.getElementById("id_dtEcoActDtls_"+r).value).split(columnsDelimiter);
}
//for division
var activityDivision= document.getElementById('in_dtEcoActDtls_5');
FetchRegistrationDtl.fetchEcoSubActDtls(colValArray[0].split(propertyValueDelimiter)[1], function(data) 
{
  if(data != 'null' &&  data != null)
  {
    var newOptions = []; 
    newOptions.push( new Option("--Select--", "") );
        
    dwr.util.removeAllOptions(activityDivision); 
    
    activityDivision.length = 0;
        for ( var j = 0 ; j < newOptions.length ; j++ )
          activityDivision.options.add( newOptions[j] );
        
    dwr.util.addOptions(activityDivision,data,'ecoActMstId','economicActivityName');	
    activityDivision.disabled = false;	
    
            activityDivision.value = colValArray[2].split(propertyValueDelimiter)[1];
            // for group
            var activityGroup= document.getElementById('in_dtEcoActDtls_6');
            
            FetchRegistrationDtl.fetchEcoSubActDtls(colValArray[2].split(propertyValueDelimiter)[1], function(data) 
            {
              if(data != 'null' &&  data != null)
              {
                dwr.util.removeAllOptions(activityGroup); 
                var newOptions = []; 
                newOptions.push( new Option("--Select--", "") );
                    
                
                activityGroup.length = 0;
                    for ( var j = 0 ; j < newOptions.length ; j++ )
                      activityGroup.options.add( newOptions[j] );
                    
                dwr.util.addOptions(activityGroup,data,'ecoActMstId','economicActivityName');	
                activityGroup.disabled = false;	
                        activityGroup.value = colValArray[3].split(propertyValueDelimiter)[1];
                        //for class
                        //var activityClass= document.getElementById('in_dtEcoActDtls_7');
                        
                        /*FetchRegistrationDtl.fetchEcoSubActDtls(colValArray[3].split(propertyValueDelimiter)[1], function(data) 
                        {
                          if(data != 'null' &&  data != null)
                          {
                            dwr.util.removeAllOptions(activityClass); 
                            var newOptions = []; 
                            newOptions.push( new Option("--Select--", "") );
                                
                            
                            activityClass.length = 0;
                                for ( var j = 0 ; j < newOptions.length ; j++ )
                                  activityClass.options.add( newOptions[j] );
                                
                            dwr.util.addOptions(activityClass,data,'ecoActMstId','economicActivityName');	
                            activityClass.disabled = false;	
                                    activityClass.value = colValArray[4].split(propertyValueDelimiter)[1];

                                    //for sub class
                                    var activitySubclass= document.getElementById('in_dtEcoActDtls_8');
                                    
                                    FetchRegistrationDtl.fetchEcoSubActDtls(colValArray[4].split(propertyValueDelimiter)[1], function(data) 
                                    {
                                      if(data != 'null' &&  data != null)
                                      {
                                        dwr.util.removeAllOptions(activitySubclass);
                                        var newOptions = []; 
                                        newOptions.push( new Option("--Select--", "") );
                                            
                                        
                                        
                                        activitySubclass.length = 0;
                                            for ( var j = 0 ; j < newOptions.length ; j++ )
                                              activitySubclass.options.add( newOptions[j] );
                                            
                                        dwr.util.addOptions(activitySubclass,data,'ecoActMstId','economicActivityName');	
                                        activitySubclass.disabled = false;	
                                                activitySubclass.value = colValArray[5].split(propertyValueDelimiter)[1];
                                      }
                                      else
                                      {
                                        activitySubclass.value='';
                                        activitySubclass.disabled=true;
                                      }
                                    
                                    });
                          }
                          else
                          {
                            activityClass.value='';
                            activityClass.disabled=true;
                          }
                        
                        });*/
              }
              else
              {
                activityGroup.value='';
                activityGroup.disabled=true;
              }
            
            });
  }
  else
  {
    activityDivision.value='';
    activityDivision.disabled=true;
  }

});
}
function estateTrustModify ()
{
var tab_id= 'estateTrust';
var srcTable = document.getElementById('estateTrust');

for (var r = 1; r < srcTable.rows.length; r++)
{
      if(null!= document.getElementById('id_estateTrust_'+r+'_2') && document.getElementById('id_estateTrust_'+r+'_2').name=='Modifying')
        colValArray = (document.getElementById("id_estateTrust_"+r).value).split(columnsDelimiter);
}	
enableBeneficiaryInfo(trim(colValArray[0].split(propertyValueDelimiter)[1]).toLowerCase());
if("A18"==document.getElementById('in_estateTrust_3').value)
{
  fetchRegTxprFrmPinEstatePIN(document.getElementById('in_estateTrust_4'));
}
else
{
  fetchRegTxprFrmPinEstatePIN(document.getElementById('in_estateTrust_7'));
}
//Added by Ravi Patel (537640)
modifyDescAddCount('estateTrust');
//Ended by Ravi Patel (537640)
}
function validateBeneficiaryInfo(pin)
{
toUpperPin(pin.id);
if(validateEstateTrustJson(pin.id))
{
  if(validatePIN(pin,'INDI'))
  {
    
    fetchRegTxprFrmPinEstatePIN(pin);
    
  }
  else
  {
    
    clearEstateDtls();
  }
}
else
{
    clearEstateDtls();
}
}
function clearEstateDtls()
{
document.getElementById('txtTxprNonIndiETFName').value = '';
document.getElementById('txtTxprNonIndiETMidName').value='';
document.getElementById('txtTxprNonIndiETLName').value='';
document.getElementById('calTxprNonIndiETDOB').value='';	
document.getElementById('rdoTxprNonIndiETGenderM').checked= false;
document.getElementById('rdoTxprNonIndiETGenderF').checked= false;
document.getElementById('txtTxprNonIndiETBlockNo').value='';
document.getElementById('txtTxprNonIndiETBuilding').value='';
document.getElementById('txtTxprNonIndiETStrtRoad').value='';
document.getElementById('txtTxprNonIndiETCity').value='';
document.getElementById('txtTxprNonIndiETCounty').value='';
document.getElementById('txtTxprNonIndiETDistrict').value='';
document.getElementById('txtTxprNonIndiETLocality').value='';
document.getElementById('txtTxprNonIndiETDescAddr').value='';
document.getElementById('txtTxprNonIndiETTown').value='';
document.getElementById('txtTxprNonIndiETpostalCode').value='';
document.getElementById('txtTxprNonIndiETPOBox').value='';
document.getElementById('txtTxprNonIndiETAddLine1').value='';
document.getElementById('txtTxprNonIndiETAddLine2').value='';
document.getElementById('txtTxprNonIndiETAddLine3').value='';
document.getElementById('txtTxprNonIndiETAddCntry').value='';
}
function enableBeneficiaryInfo(ageVal)
{
if(ageVal.toLowerCase() == ("A18").toLowerCase())
{
  document.getElementById('in_estateTrust_7').value='';
  document.getElementById('in_estateTrust_5').value='';
  document.getElementById('in_estateTrust_6').value='';
  document.getElementById('in_estateTrust_9').value='';
  document.getElementById('in_estateTrust_10').value='';
  document.getElementById('in_estateTrust_11').checked= false;
  document.getElementById('in_estateTrust_12').checked= false;
  document.getElementById("divPIN").style.display = 'block';
  document.getElementById("divProfitLoss").style.display = 'block';
  document.getElementById("divAutoPopulate").style.display = 'block';
  document.getElementById("divBeneficiary").style.display = 'none';
  document.getElementById("divGaurdPIN").style.display = 'none';
}
if(ageVal.toLowerCase() == ("B18").toLowerCase())
{
  document.getElementById("divPIN").style.display = 'none';
  document.getElementById("divProfitLoss").style.display = 'block';
  document.getElementById("divAutoPopulate").style.display = 'block';
  document.getElementById("divBeneficiary").style.display = 'block';
  document.getElementById("divGaurdPIN").style.display = 'block';
  document.getElementById('in_estateTrust_4').value='';
}
clearBenefData();
}
function clearRatio()
{
document.getElementById('in_estateTrust_8').value='';
}
// Estate Trust JSON

var estateTrustJSON={"field":[
                                {"name":"in_estateTrust_3","rule":[{"required":"y","dispName":"Age of the Beneficiary","rule":[{"required":"y"}]}]},
                               {"name":"in_estateTrust_4","rule":[{"required":"n","dispName":"Beneficiary PIN","dependent":[{"ids":"in_estateTrust_3","values":"A18","rule":[{"required":"y","type":"alphanumericwithoutspace"}]}]}]},
                               {"name":"in_estateTrust_8","rule":[{"required":"y","dispName":"Profit Loss Ratio","type":"numeric","maxLength":"5"}]},
                               {"name":"in_estateTrust_7","rule":[{"required":"n","dispName":"Gaurdian PIN","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"y","type":"alphanumericwithoutspace"}]}]}]},
                               {"name":"in_estateTrust_5","rule":[{"required":"n","dispName":"Beneficiary First Name","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"n","type":"bussnamewithspecialchrs","maxLength":"100"}]}]}]},
                               {"name":"in_estateTrust_9","rule":[{"required":"n","dispName":"Beneficiary Middle Name","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"n","type":"bussnamewithspecialchrs","maxLength":"100"}]}]}]},
                               {"name":"in_estateTrust_6","rule":[{"required":"n","dispName":"Beneficiary Last Name","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"n","type":"bussnamewithspecialchrs","maxLength":"100"}]}]}]},
                               {"name":"in_estateTrust_10","rule":[{"required":"n","dispName":"Beneficiary Date of Birth","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"y","type":"date"}]}]}]},
                               {"name":"in_estateTrust_11","rule":[{"required":"n","dispName":"Beneficiary Sex","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"y"}]}]}]},
                               {"name":"in_estateTrust_13","rule":[{"required":"n","dispName":"LR Number","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"n","type":"alphanumericspecialchara","maxLength":"50"}]}]}]},
                               {"name":"in_estateTrust_14","rule":[{"required":"n","dispName":"Building","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"y","type":"alphanumericspecialcharaemp","maxLength":"50"}]}]}]},
                               {"name":"in_estateTrust_15","rule":[{"required":"n","dispName":"Street/Road","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"y","type":"alphanumericspecialchara","maxLength":"50"}]}]}]},
                               {"name":"in_estateTrust_16","rule":[{"required":"n","dispName":"Tax Area/Locality","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"y"}]}]}]},
                               {"name":"in_estateTrust_17","rule":[{"required":"n","dispName":"City/Town","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"y","type":"alphanumericspecialcharacity","maxLength":"50"}]}]}]},
                               {"name":"in_estateTrust_18","rule":[{"required":"n","dispName":"District","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"y"}]}]}]},
                               {"name":"in_estateTrust_19","rule":[{"required":"n","dispName":"County","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"y"}]}]}]},
                               {"name":"in_estateTrust_20","rule":[{"required":"n","dispName":"Descriptive Address","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"n","type":"alphanumericspecialcharaemp","maxLength":"200"}]}]}]},
                               {"name":"in_estateTrust_21","rule":[{"required":"n","dispName":"Postal Code","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"y"}]}]}]},
                               {"name":"in_estateTrust_22","rule":[{"required":"n","dispName":"Town","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"n"}]}]}]},
                               {"name":"in_estateTrust_23","rule":[{"required":"n","dispName":"P.O.Box","dependent":[{"ids":"in_estateTrust_3","values":"B18","rule":[{"required":"y","minLength":"1","maxLength":"15","type":"onlynumeric"}]}]}]}
                   ]};
function validateEstateTrustJson(id) 
{
  var rtnFlag = validateFormFieldOnEvent(id, estateTrustJSON);
  getErrTabToggle('TabView','15');	
  if(!rtnFlag)
{
  tabview_switch('TabView', '15');
  hideAndShowTable("errorDiv");
}
  return rtnFlag;
}
function checkPLRatio(obj)
{
  var pLRatio=obj.value;
  if(convertToShillingFormatForBlank(obj,'')){
      var ratio = parseFloat(pLRatio);
    if(ratio>100)
    {
      alert('Please Enter Profit Loss Ratio less than or equal to 100');
      return false;
    }
    else
    {
      return true;
    }
  }else{
    return false;
  }
}
function validateEstateTrustJsonAddRow()
{
resetErrorList();
  var rtnFlag = validateFormFields(estateTrustJSON);
  getErrTabToggle('TabView','15');	
  if(!rtnFlag)
  {
    tabview_switch('TabView', '15');
    hideAndShowTable("errorDiv");
  }
  return rtnFlag;
}
function clearBenefData()
{
  document.getElementById('txtTxprNonIndiETFName').value='';
  document.getElementById('txtTxprNonIndiETMidName').value='';
  document.getElementById('txtTxprNonIndiETLName').value='';
  document.getElementById('calTxprNonIndiETDOB').value='';
  document.getElementById('rdoTxprNonIndiETGenderM').checked= false;
  document.getElementById('rdoTxprNonIndiETGenderF').checked= false;
  document.getElementById('txtTxprNonIndiETBlockNo').value='';
  document.getElementById('txtTxprNonIndiETBuilding').value='';
  document.getElementById('txtTxprNonIndiETStrtRoad').value='';
  document.getElementById('txtTxprNonIndiETCity').value='';
  document.getElementById('txtTxprNonIndiETCounty').value='';
  document.getElementById('txtTxprNonIndiETDistrict').value='';
  document.getElementById('txtTxprNonIndiETLocality').value='';
  document.getElementById('txtTxprNonIndiETDescAddr').value='';
  document.getElementById('txtTxprNonIndiETTown').value='';
  document.getElementById('txtTxprNonIndiETpostalCode').value='';
  document.getElementById('txtTxprNonIndiETPOBox').value='';
  document.getElementById('txtTxprNonIndiETAddLine1').value='';
  document.getElementById('txtTxprNonIndiETAddLine2').value='';
  document.getElementById('txtTxprNonIndiETAddLine3').value='';
  document.getElementById('txtTxprNonIndiETAddCntry').value='';
  modifyDescAddCount('estateTrust');
}

function fetchRegTxprFrmPinEstatePIN(objPin){
  if(null!=objPin.value && objPin.value!='')
    {   
    FetchRegistrationDtl.fetchRegTxprInfoFrmPin(objPin.value,{async:false,callback: function(data) {
      if(data != 'null' &&  data != null){
        if(data != null){
          if(data.txprIndDtlsDTO!= null){
            
            if(data.txprIndDtlsDTO.firstName!=null && data.txprIndDtlsDTO.firstName!='')
              document.getElementById('txtTxprNonIndiETFName').value=data.txprIndDtlsDTO.firstName;
            if(data.txprIndDtlsDTO.middleName!=null && data.txprIndDtlsDTO.middleName!='')
              document.getElementById('txtTxprNonIndiETMidName').value=data.txprIndDtlsDTO.middleName;
            if(data.txprIndDtlsDTO.surName!=null && data.txprIndDtlsDTO.surName!='')
              document.getElementById('txtTxprNonIndiETLName').value=data.txprIndDtlsDTO.surName;
            if(data.txprIndDtlsDTO.birthDt!=null && data.txprIndDtlsDTO.birthDt!='')
            {
            var month = "";
            if(data.txprIndDtlsDTO.birthDt.getMonth()+1<10)
               month = "0"+(data.txprIndDtlsDTO.birthDt.getMonth()+1);
            else
               month = data.txprIndDtlsDTO.birthDt.getMonth()+1;
            document.getElementById('calTxprNonIndiETDOB').value=data.txprIndDtlsDTO.birthDt.getDate()+"/"+(month)+"/"+
              data.txprIndDtlsDTO.birthDt.getFullYear();
            }
            if(data.txprIndDtlsDTO.gender!=null && data.txprIndDtlsDTO.gender!='')
            {
              if(data.txprIndDtlsDTO.gender=='M')
                document.getElementById('rdoTxprNonIndiETGenderM').checked= true;
              else
                document.getElementById('rdoTxprNonIndiETGenderF').checked= true;
            }
              //document.getElementById('rdoNIPABsex').value=data.txprIndDtlsDTO.gender;
          }
          else{
            alert('Please enter valid PIN');
          }
          if(data.txprAddressDtlsDTO!=null){
            if(data.txprAddressDtlsDTO.addressLine1!=null && data.txprAddressDtlsDTO.addressLine1!='')
            {
              if(data.txprAddressDtlsDTO.addressLine1!=null && data.txprAddressDtlsDTO.addressLine1!='')
                document.getElementById('txtTxprNonIndiETAddLine1').value=data.txprAddressDtlsDTO.addressLine1;
              if(data.txprAddressDtlsDTO.addressLine2!=null && data.txprAddressDtlsDTO.addressLine2!='')
                document.getElementById('txtTxprNonIndiETAddLine2').value=data.txprAddressDtlsDTO.addressLine2;
              if(data.txprAddressDtlsDTO.addressLine3!=null && data.txprAddressDtlsDTO.addressLine3!='')
                document.getElementById('txtTxprNonIndiETAddLine3').value=data.txprAddressDtlsDTO.addressLine3;
              if(data.txprAddressDtlsDTO.countryId!=null && data.txprAddressDtlsDTO.countryId!='')
                document.getElementById('txtTxprNonIndiETAddCntry').value=data.txprAddressDtlsDTO.countryId;
              document.getElementById('txtTxprNonIndiETNonResidentAddr').style.display='block';
              document.getElementById('txtTxprNonIndiETResidentAddr').style.display='none';
            }
            else
            {
              if(data.txprAddressDtlsDTO.blockNo!=null && data.txprAddressDtlsDTO.blockNo!='')
                document.getElementById('txtTxprNonIndiETBlockNo').value=data.txprAddressDtlsDTO.blockNo;
              if(data.txprAddressDtlsDTO.buildname!=null && data.txprAddressDtlsDTO.buildname!='')
                document.getElementById('txtTxprNonIndiETBuilding').value=data.txprAddressDtlsDTO.buildname;
              if(data.txprAddressDtlsDTO.streetAddr!=null && data.txprAddressDtlsDTO.streetAddr!='')
                document.getElementById('txtTxprNonIndiETStrtRoad').value=data.txprAddressDtlsDTO.streetAddr;
              if(data.txprAddressDtlsDTO.cityName!=null && data.txprAddressDtlsDTO.cityName!='')
                document.getElementById('txtTxprNonIndiETCity').value=data.txprAddressDtlsDTO.cityName;
              if(data.txprAddressDtlsDTO.countyId!=null && data.txprAddressDtlsDTO.countyId!='')
                document.getElementById('txtTxprNonIndiETCounty').value=data.txprAddressDtlsDTO.countyId;
              
              selectDistrictByCountry('txtTxprNonIndiETCounty','txtTxprNonIndiETDistrict');
              if(data.txprAddressDtlsDTO.districtId!=null && data.txprAddressDtlsDTO.districtId!='')
                document.getElementById('txtTxprNonIndiETDistrict').value=data.txprAddressDtlsDTO.districtId;
              
              selectLocalityByDistrict('txtTxprNonIndiETDistrict','txtTxprNonIndiETLocality');
              if(data.txprAddressDtlsDTO.localityId!=null && data.txprAddressDtlsDTO.localityId!='')
                document.getElementById('txtTxprNonIndiETLocality').value=data.txprAddressDtlsDTO.localityId;
              if(data.txprAddressDtlsDTO.descriptiveAddress!=null && data.txprAddressDtlsDTO.descriptiveAddress!='')
                document.getElementById('txtTxprNonIndiETDescAddr').value=data.txprAddressDtlsDTO.descriptiveAddress;
              if(data.txprAddressDtlsDTO.postalCode!=null && data.txprAddressDtlsDTO.postalCode!='')
                document.getElementById('txtTxprNonIndiETTown').value=data.txprAddressDtlsDTO.postalCode;
              var comboBox = document.getElementById('txtTxprNonIndiETTown');
              var selectedIndex = comboBox.selectedIndex;
              document.getElementById('txtTxprNonIndiETpostalCode').value=comboBox.options[selectedIndex].text;
              if(data.txprAddressDtlsDTO.poBox!=null && data.txprAddressDtlsDTO.poBox!='')
                document.getElementById('txtTxprNonIndiETPOBox').value=data.txprAddressDtlsDTO.poBox;
              document.getElementById('txtTxprNonIndiETNonResidentAddr').style.display='none';
              document.getElementById('txtTxprNonIndiETResidentAddr').style.display='block';
            }
          }else{
            alert('Please enter valid PIN');
          }
        }
        else
        {
          objPin.value='';
          alert('Please enter valid PIN');
          objPin.focus();
            
        }
      }
      else
      {
        alert('Please enter valid PIN');
        objPin.value='';
      }
    },errorHandler:function(message) { alert("There is some server issue. Please try again later.");}//Updated on 05/01/2014 for changing alert message in case server not found
    });
    }
  else{
    return false;
  }
}
function fetchRegTxprInfoFrmPinAmend()
{
  this.fetchRegTxprInfoFrmPin(document.getElementById('in_dtPersonDtls_4'));
  checkPrtnr();
}
function setTownValsec3 ()
{
  var postalCode = document.getElementById('in_dtPlaceDtls_15');
  document.getElementById('in_dtPlaceDtls_14').value=postalCode.options[postalCode.options.selectedIndex].text;
  showHideBrnchRegDate(document.getElementById('in_dtPlaceDtls_20').checked,'in_dtPlaceDtls_20','in_dtPlaceDtls_22');
  showHideBrnchRegDate(document.getElementById('in_dtPlaceDtls_21').checked,'in_dtPlaceDtls_21','in_dtPlaceDtls_23');
  //showHideBrnchRegDate(document.getElementById('in_dtPlaceDtls_22').checked,'in_dtPlaceDtls_22','in_dtPlaceDtls_26');
  //showHideBrnchRegDate(document.getElementById('in_dtPlaceDtls_23').checked,'in_dtPlaceDtls_23','in_dtPlaceDtls_27');
  
  //Added by Ravi Patel (537640)
  modifyDescAddCount('dtPlaceDtls');
  //Ended by Ravi Patel (537640)
}
function checkPrtnr ()
{
  checkAssociateType();
  if (document.getElementById('in_dtPersonDtls_3').value=='PARTNER'){
    document.getElementById('in_dtPersonDtls_5').disabled = false;
    document.getElementById('in_dtPersonDtls_5').className='form101_textfcurr form101_textfcurr_width';
    
    document.getElementById('in_dtPersonDtls_7').value='';
    document.getElementById('in_dtPersonDtls_7').disabled = true;
    document.getElementById('in_dtPersonDtls_7').className='form101_textfcurr form101_textfcurr_width readonlyInput';
  }else if(document.getElementById('in_dtPersonDtls_3').value=='OTHER'){
    document.getElementById('in_dtPersonDtls_5').value='';
    document.getElementById('in_dtPersonDtls_5').disabled = true;
    document.getElementById('in_dtPersonDtls_5').className='form101_textfcurr form101_textfcurr_width readonlyInput';
    
    document.getElementById('in_dtPersonDtls_7').disabled = false;
    document.getElementById('in_dtPersonDtls_7').className='form101_textfcurr form101_textfcurr_width';
  }else{
    document.getElementById('in_dtPersonDtls_7').value='';
    document.getElementById('in_dtPersonDtls_7').disabled = true;
    document.getElementById('in_dtPersonDtls_7').className='form101_textfcurr form101_textfcurr_width readonlyInput';
    
    document.getElementById('in_dtPersonDtls_5').value='';
    document.getElementById('in_dtPersonDtls_5').disabled = true;
    document.getElementById('in_dtPersonDtls_5').className='form101_textfcurr form101_textfcurr_width readonlyInput';
  }
}
function enableEpzDate(val)
{

  if(document.getElementById('cmbNIIdenBussTyp').value =='COMP')
  {
    if(val=='EPZCOMP')
    {
      document.getElementById('calepzEffectiveDateVal').value='';
      document.getElementById('calepzEffectiveDateVal').disabled = false;
      document.getElementById('epzEffectDateComp').disabled = false;
      document.getElementById('calepzEffectiveDateVal').className='form101_textfcurr form101_textfcurr_width textonlyRight';
      document.getElementById('divepzEffectDateComp').style.display ='block';
      
    }else{
      document.getElementById('calepzEffectiveDateVal').value='';
      validateabussDetailsJson('calepzEffectiveDateVal');
      document.getElementById('calepzEffectiveDateVal').disabled = true;
      document.getElementById('epzEffectDateComp').disabled = true;
      document.getElementById('calepzEffectiveDateVal').className='form101_textfcurr form101_textfcurr_width textonlyRight readonlyInput';
      document.getElementById('divepzEffectDateComp').style.display ='none';
    }
  }else{
    document.getElementById('calepzEffectiveDateVal').value='';
    validateabussDetailsJson('calepzEffectiveDateVal');
    document.getElementById('calepzEffectiveDateVal').disabled = true;
    document.getElementById('calepzEffectiveDateVal').className='form101_textfcurr form101_textfcurr_width textonlyRight readonlyInput';
    document.getElementById('epzEffectDateComp').className='';
    document.getElementById('divepzEffectDateComp').style.display ='none';
  }

}

function enableAmgDate(val)
{
  document.getElementById('in_dtTributoryDtls_4').value='';
  document.getElementById('in_dtTributoryDtls_5').value='';
  document.getElementById('in_dtTributoryDtls_6').value='';
  document.getElementById('in_dtTributoryDtls_7').value='';
}

function showHideBrnchRegDate(displayFlag, compId,textId) 
{
  imgButton = 'div'+compId;
  if(displayFlag)
  {
    document.getElementById(textId).disabled = false;
    document.getElementById(textId).className='form101_textfcurr form101_textfcurr_width textonlyRight';
    document.getElementById(imgButton).style.display='block';
  }
  else
  {
    document.getElementById(textId).value='';
    document.getElementById(textId).disabled = true;
    document.getElementById(textId).className='form101_textfcurr form101_textfcurr_width textonlyRight readonlyInput';
    document.getElementById(imgButton).style.display='none';
  }
}
/*function checkBrnchCompDate(obj)
{
  obj.value = trim(obj.value);
  if(validateaddPlaceBussJson(obj.id))
  {
    if (allowTodayAndPastDate(obj.id))
    {
      if(document.getElementById('chkNIObliITComp').checked==true)
      {
        if(document.getElementById('calNIObliregDtITComp').value =='')
        {
          alert('Please enter Income Tax Company registration Date First');
          obj.value='';
          return false;
        }
        else
        {
          if(!fnCompareDates(document.getElementById('calNIObliregDtITComp').value,obj.value))
            {
            if(document.getElementById('calNIObliregDtITComp').value!=obj.value)
            {
              alert('Branch Income Tax Company registration Date should be greater than or equal to Income Tax Company registration Date.');
              obj.value='';
              return false;
            }
            
            }
          if(!chkBrnchCompPrtnrDt(obj))
          {
            return false;
          }
          return true;
        }
      }
    }
    return false;
  }
  else
  {
    return false;
  }
}
function checkBrnchPrtnrDate(obj)
{
  obj.value = trim(obj.value);
  if(validateaddPlaceBussJson(obj.id))
  {
    if (allowTodayAndPastDate(obj.id))
    {
      if(document.getElementById('chkNIObliITPrtnr').checked==true)
      {
        if(document.getElementById('calNIObliregDtITPrtnr').value =='')
        {
          alert('Please enter Income Tax Partnership registration Date First');
          obj.value='';
          return false;
        }
        else
        {
          if(!fnCompareDates(document.getElementById('calNIObliregDtITPrtnr').value,obj.value))
            {
            if(document.getElementById('calNIObliregDtITPrtnr').value!=obj.value)
            {
              alert('Branch Income Tax Partnership registration Date should be greater than or equal to Income Tax Partnership registration Date.');
              obj.value='';
              return false;
            }
            
            }
          if(!chkBrnchCompPrtnrDt(obj))
          {
            return false;
          }
          return true;
        }
      }
    }
    return false;
  }
  else
  {
    return false;
  }
}*/
//TODO
function checkBrnchPayeDate(obj,branchId)
{
  obj.value = trim(obj.value);
  
  
  if(validateaddPlaceBussJson(obj.id))
  {
    if (allowTodayAndPastDateServer(obj.id))
    {
      if(document.getElementById('chkNIObliITPaye').checked==true)
      {
        if(document.getElementById('calNIObliregDtITPaye').value =='')
        {
          alert('Please enter Income Tax PAYE registration Date First');
          obj.value='';
          return false;
        }
        else
        {
          if(!fnCompareDates(document.getElementById('calNIObliregDtITPaye').value,obj.value))
            {
            if(document.getElementById('calNIObliregDtITPaye').value!=obj.value)
            {
              alert('Branch Income Tax PAYE Registration Date should be greater than or equal to Income Tax PAYE Registration Date.');
              obj.value='';
              return false;
            }
            
            }//START
          else
          {
            if(document.getElementById('regType').value=='NORMALREG')
            {
              return allowdBranchChange(document.getElementById('calNIObliregDtITPaye').value,obj);
            }
                    
          }
          
          if(!chkBrnchPayeeDt(obj))
          {
            return false;
          }
          return true;
        }
      }
    }
    return false;
  }
  else
  {
    return false;
  }
}
function checkBrnchVatDate(obj,branchId)
{
  obj.value = trim(obj.value);
  if(validateaddPlaceBussJson(obj.id))
  {
    if (allowTodayAndPastDateServer(obj.id))
    {
      if(document.getElementById('chkNIObliVat').checked==true)
      {
        if(document.getElementById('calNIObliregDtVat').value =='')
        {
          alert('Please enter VAT registration Date First');
          obj.value='';
          return false;
        }
        else
        {
          if(!fnCompareDates(document.getElementById('calNIObliregDtVat').value,obj.value))
            {
            if(document.getElementById('calNIObliregDtVat').value!=obj.value)
            {
              alert('Branch Value Added Tax Registration Date should be greater than or equal to Value Added Tax Registration Date.');
              obj.value='';
              return false;
            }
            
            }
          else
          {
            if(document.getElementById('regType').value=='NORMALREG')
            {
              return allowdBranchChange(document.getElementById('calNIObliregDtVat').value,obj);
            }
            
          }
          
          if(!chkBrnchVatDt(obj))
          {
            return false;
          }
          return true;
        }
      }
    }
    return false;
  }
  else
  {
    return false;
  }
}
function chkBrnchPayeeDt(obj){
  
  obj.value = trim(obj.value);
  if(checkdate(obj))
  {
    /*if(document.getElementById('in_dtPlaceDtls_20').checked==true)
    {
      if(document.getElementById('in_dtPlaceDtls_24').value =='')
      {
        alert('Please enter Income Tax Company registration Date First');
        obj.value='';
        return false;
      }
      else{
        if(fnCompareDates(document.getElementById('in_dtPlaceDtls_24').value,obj.value))
          {
                return true;
        }else
        {
          obj.value ='';
          alert('Income Tax PAYE registration Date cannot be before Income Tax Company registration Date');
          return false;
        }
      }
    }
    else if(document.getElementById('in_dtPlaceDtls_21').checked==true)
    {
      if(document.getElementById('in_dtPlaceDtls_25').value =='')
      {
        alert('Please enter Income Tax Partnership registration Date First');
        obj.value='';
        return false;
      }
      else{
        if(fnCompareDates(document.getElementById('in_dtPlaceDtls_25').value,obj.value))
          {
                return true;
        }else
        {
          obj.value ='';
          alert('Income Tax PAYE  registration Date cannot be before Income Tax Partnership registration Date');
          return false;
        }
      }
    }
    else*/
      return true;
  }else
    return false;
}
function chkBrnchVatDt(obj){
  
  obj.value = trim(obj.value);
  if(checkdate(obj))
  {
    /*if(document.getElementById('in_dtPlaceDtls_20').checked==true)
    {
      if(document.getElementById('in_dtPlaceDtls_24').value =='')
      {
        alert('Please enter Income tax company registration Date First');
        obj.value= '';
        return false;
      }
      else{
        if(fnCompareDates(document.getElementById('in_dtPlaceDtls_24').value,obj.value))
          {
                return true;
        }else
        {
          obj.value ='';
          alert('Value Added Tax registration Date cannot be before Income tax company registration Date');
          return false;
        }
      }
    }
    else if(document.getElementById('in_dtPlaceDtls_21').checked==true)
    {
      if(document.getElementById('in_dtPlaceDtls_25').value =='')
      {
        alert('Please enter Income Tax Partnership registration Date First');
        obj.value='';
        return false;
      }
      else{
        if(fnCompareDates(document.getElementById('in_dtPlaceDtls_25').value,obj.value))
          {
                return true;
        }else
        {
          obj.value ='';
          alert('Value Added Tax registration Date cannot be before Income Tax Partnership registration Date');
          return false;
        }
      }
    }
    else*/
      return true;
  }else
    return false;
}
/*function chkBrnchCompPrtnrDt(obj){
  
  obj.value = trim(obj.value);
  if(checkdate(obj))
  {
    if(document.getElementById('in_dtPlaceDtls_22').checked==true)
    {
      if(document.getElementById('in_dtPlaceDtls_26').value !='')
      {
        if(!fnCompareDates(document.getElementById('in_dtPlaceDtls_26').value,obj.value))
          {
                return true;
        }else
        {
          obj.value ='';
          alert('This Date cannot be after Income Tax PAYE registration Date');
          return false;
        }
      }
      return true;
    }
    else if(document.getElementById('in_dtPlaceDtls_23').checked==true)
    {
      if(document.getElementById('in_dtPlaceDtls_27').value !='')
      {
        if(!fnCompareDates(document.getElementById('in_dtPlaceDtls_27').value,obj.value))
          {
                return true;
        }else
        {
          obj.value ='';
          alert('This Date cannot be after Value Added Tax registration Date');
          return false;
        }
      }
      return true;
    }
    else
      return true;
  }else
    return false;
}*/
function checkforKenya (coutryObj)
{
  
  if (trim(coutryObj.options[coutryObj.options.selectedIndex].text).toLowerCase() == 'kenya')
  {
    alert('You cannot select Kenya as your subsidiary company country because your Principal Holding Company is not Resident in Kenya.Please consult any KRA Station or nearest iTax Support Centre for more advice');
    coutryObj.value='';
    return false;
  }
  else
    return true;
}
function checkBenefDob (obj)
{
  if(validateEstateTrustJson(obj.id))
  {
    if (allowTodayAndPastDateServer(obj.id))
    {
      if(chkAge(obj.id,18))
      {
        return true;
          /*var commncDt = trim(document.getElementById('calSoiBussCommDt').value);
          if (commncDt!='')
          {
            obj.value = trim(obj.value);
            
            if(!fnCompareDates(commncDt,obj.value))
              {
                    return true;
            }else
            {
              obj.value ='';
              alert('Beneficiary Date of Birth cannot be after Business Commencement Date');
              return false;
            }
          }
          else
          {
            alert('Please enter Business Commencement Date First');
            obj.value ='';
            return false;
          }*/
      }
    }else
      return false;
  }
  return false;
}
function checkCommDt(obj)
{
  if(validateabussDetailsJson(obj.id) )
    
  { if(!document.getElementById('isDstReg1').checked){fnCheckPastDtCommon(obj);}
    if(obj.value !='' && document.getElementById('calSoiBussRegDt').value!='')
    {
      if(checkDateValidation(obj.id,'calSoiBussRegDt','The Business Commencement Date cannot be before the Business Registration Date. Please consult any KRA Station or nearest iTax Support Centre to have these dates adjusted to enable you proceed with registration.'))
      {
        return true;
      }
      else
      {
        return false;
      }
        /*var benefBrthDt = trim(document.getElementById('in_estateTrust_10').value);
        if (benefBrthDt!='')
        {
          obj.value = trim(obj.value);
          if(fnCompareDates(benefBrthDt,obj.value))
            {
                  return true;
          }else
          {
            obj.value ='';
            alert('Business Commencement Date cannot be before Beneficiary Date of Birth');
            return false;
          }
        }
        else
          return true;*/
    }else{
      
    //Added by Vaidehi for DST Changes : STarts
  if(document.getElementById('isDstReg1').checked){
    
       var prdToDt =obj.value;
       var dateFormatDate = prdToDt.slice(0, 2);	 
       var dateFormatMonth = prdToDt.slice(3, 5);
       var dateFormatYear = prdToDt.slice(6, 10);
       var totalFormat = dateFormatMonth + "/" + dateFormatDate + "/" + dateFormatYear;
       var againNewDate = new Date(totalFormat);
       var dt = new Date('01/01/2021');
       if(againNewDate.getTime() < dt.getTime()){ 
         alert('The Business Commencement Date cannot be before 01/01/2021.');
         obj.value='';
         return false;
       }
       else{
         document.getElementById('calNIObliregDtITDST').value=obj.value;
         document.getElementById('calNIObliregDtVat').value=obj.value;
         
         
         return true;
       }	 }
    
      return true;
    
    }
  
  }
  
return false;
}
function checkBussRegDt(obj)
{
  if(validateabussDetailsJson(obj.id) ){
    if(!document.getElementById('isDstReg1').checked){
    fnCheckPastDtCommon(obj);}

    if(obj.value !='' && document.getElementById('calSoiBussCommDt').value!='')
    {
      if(checkDateValidation('calSoiBussCommDt',obj.id,'Business Registration Date cannot be after the Business Commencement Date'))
      {
        return true;
      }
      else
      {
        return false;
      }
        
    }else{
      if(document.getElementById('isDstReg1').checked){
        
         var prdToDt =obj.value;
         var dateFormatDate = prdToDt.slice(0, 2);	 
         var dateFormatMonth = prdToDt.slice(3, 5);
         var dateFormatYear = prdToDt.slice(6, 10);
         var totalFormat = dateFormatMonth + "/" + dateFormatDate + "/" + dateFormatYear;
         var againNewDate = new Date(totalFormat);
         var dt = new Date('01/01/2021');
         if(againNewDate.getTime() < dt.getTime()){ 
           alert('The Business Registration Date cannot be before 01/01/2021.');
           obj.value='';
           return false;
         }
         else{
           return true;
         }	
         }
      else
      {
        return true;
      }
      
      
      
      
    }
  }
  return false;
} 
function checkFormDatesonSubmit()
{
  if (document.getElementById('calSoiBussCommDt') !=null && document.getElementById('calSoiBussCommDt').value=='')
  {
    alert('Please enter Business Commencement Date');
    enableRequiredTab('calSoiBussCommDt');
    return false;
  }
  else
  {
    if (document.getElementById('chkNIObliITComp') !=null && document.getElementById('chkNIObliITComp').checked)
    {
      if (document.getElementById('calNIObliregDtITComp') !=null && document.getElementById('calNIObliregDtITComp').value=='')
      {
        alert('Please enter Income Tax Company Registration Date');
        enableRequiredTab('calNIObliregDtITComp');
        return false;
      }
    }
    else if (document.getElementById('chkNIObliITPrtnr') !=null && document.getElementById('chkNIObliITPrtnr').checked)
    {
      if (document.getElementById('calNIObliregDtITPrtnr') !=null && document.getElementById('calNIObliregDtITPrtnr').value=='')
      {
        alert('Please enter Income Tax Partnership Registration Date');
        enableRequiredTab('calNIObliregDtITPrtnr');
        return false;
      }
    }
    
    // compare with paye date
    if (document.getElementById('chkNIObliITPaye') !=null && document.getElementById('chkNIObliITPaye').checked)
    {
      if (document.getElementById('calNIObliregDtITPaye') !=null && document.getElementById('calNIObliregDtITPaye').value=='')
      {
        alert('Please enter Income Tax PAYE Registration Date');
        enableRequiredTab('calNIObliregDtITPaye');
        return false;
      }else
      {
        if(fnCompareDates(document.getElementById('calSoiBussCommDt').value,document.getElementById('calNIObliregDtITPaye').value))
          {
                return true;
        }else
        {
          document.getElementById('calNIObliregDtITPaye').value.value ='';
          alert('The Business Commencement Date cannot be after the PAYE Obligation Date. Please consult any KRA Station or nearest iTax Support Centre to have these dates adjusted to enable you proceed with registration.');
          enableRequiredTab('calNIObliregDtITPaye');
          return false;
        }
      }
    }
    //compare with VAT date
    if (document.getElementById('chkNIObliVat') !=null && document.getElementById('chkNIObliVat').checked)
    {
      if (document.getElementById('calNIObliregDtVat') !=null && document.getElementById('calNIObliregDtVat').value=='')
      {
        alert('Please enter Value Added Tax Registration Date');
        enableRequiredTab('calNIObliregDtVat');
        return false;
      }else
      {
        if(fnCompareDates(document.getElementById('calSoiBussCommDt').value,document.getElementById('calNIObliregDtVat').value))
          {
                return true;
        }else
        {
          document.getElementById('calNIObliregDtVat').value ='';
          alert('The Business Commencement Date cannot be after the VAT Obligation Date. Please consult any KRA Station or nearest iTax Support Centre to have these dates adjusted to enable you proceed with registration.');
          enableRequiredTab('calNIObliregDtVat');
          return false;
        }
      }
    }
    if (document.getElementById('chkNIObliITDST') !=null && document.getElementById('chkNIObliITDST').checked)
    {
      if (document.getElementById('calNIObliregDtITDST') !=null && document.getElementById('calNIObliregDtITDST').value=='')
      {
        alert('Please enter Digital Service Tax Registration Date');
        enableRequiredTab('calNIObliregDtITDST');
        return false;
      }else
      {
        if(fnCompareDates(document.getElementById('calSoiBussCommDt').value,document.getElementById('calNIObliregDtITDST').value))
          {
                return true;
        }else
        {
          document.getElementById('calNIObliregDtITPaye').value.value ='';
          alert('The Business Commencement Date cannot be after the Digital Services Tax Obligation Date. Please consult any KRA Station or nearest iTax Support Centre to have these dates adjusted to enable you proceed with registration.');
          enableRequiredTab('calNIObliregDtITDST');
          return false;
        }
      }
    }
    return true;
  }	
}
function setAmalDt()
{
  var val=document.getElementById('in_dtTributoryDtls_3').value;
  if(val=='60' || val=='50'){
    document.getElementById('in_dtTributoryDtls_7').disabled = false;
    document.getElementById('divAmgCal').style.display="block";
  }else{
    document.getElementById('in_dtTributoryDtls_7').value='';
    document.getElementById('in_dtTributoryDtls_7').disabled = true;
    document.getElementById('divAmgCal').style.display="none";
  }
}
function setRegDate(obj1)
{
  if(obj1.value !='' && allowTodayAndPastDateServer(obj1.id))
  {
    if (document.getElementById('chkNIObliITComp').checked)
    {
      document.getElementById('calNIObliregDtITComp').value=obj1.value;
      document.getElementById('calNIObliregDtITPrtnr').value="";
    }
    else if(document.getElementById('chkNIObliITPrtnr').checked)
    {
      document.getElementById('calNIObliregDtITPrtnr').value=obj1.value;
      document.getElementById('calNIObliregDtITComp').value="";
    }
    else if(document.getElementById('chkNIObliITTot').checked)
    {
      //document.getElementById('calNIObliregDtTot').value=obj1.value;
      document.getElementById('calNIObliregDtITComp').value="";
    }
  }else
  {
    document.getElementById('calNIObliregDtITPrtnr').value="";
    document.getElementById('calNIObliregDtITComp').value="";
    document.getElementById('calNIObliregDtTot').value="";
    
  }
}
function checkCommenceDate(obj1)
{
  var obj = '';
  var msg='';
  if (document.getElementById('chkNIObliITComp').checked)
  {
    obj =document.getElementById('calNIObliregDtITComp');
    msg='Income Tax Company';
  }
  else if(document.getElementById('chkNIObliITPrtnr').checked)
  {
    obj= document.getElementById('calNIObliregDtITPrtnr');
    msg='Income Tax Partnership';
  }
  if(obj.value !='' && validateoblisec2Json(obj.id))
  {
    if (allowTodayAndPastDateServer(obj.id))
    {
      var commncDt = trim(document.getElementById('calSoiBussCommDt').value);
      if (commncDt!='' && allowTodayAndPastDateServer('calSoiBussCommDt'))
      {
        obj.value = trim(obj.value);
        if(isEqual(commncDt,obj.value))
          {
                return true;
        }else
        {
          obj1.value ='';
          alert(msg+' Registration Date should be same as Business Commencement Date');
          return false;
        }
      }else
        return true;
    }else
      return false;
  }else
    return true;
}
//beneficiary profit loss ratio less than or equal to 100
function checkBenefProfLossRatio(){
  if(document.getElementById('cmbNIIdenBussTyp').value =='OTHERS' && document.getElementById('cmbNIIdenBussSubTyp').value=='ESTTRST')
  {
    var tab_id = "estateTrust";
    var srcTable = document.getElementById(tab_id);
    var total =0;
    for (var r = 1; r < srcTable.rows.length; r++){
      colValArray = (document.getElementById("id_"+tab_id+"_"+r).value).split(columnsDelimiter);
          if(document.getElementById('id_'+tab_id+'_'+r+'_1').name!='deleted' && null!=document.getElementById('id_'+tab_id+'_'+r+'_2') && document.getElementById('id_'+tab_id+'_'+r+'_2').name!='Modifying')
          {
            if(!isNaN(eval(trim(colValArray[5].split(propertyValueDelimiter)[1]))))
              total = Number(total) + eval(trim(colValArray[5].split(propertyValueDelimiter)[1]));
          }
    }
    if(total>100)
    {
      alert('Please ensure that the profit loss ratio for partners under section D: Persons Associated with Business equals to 100. Please amend this section to enable you proceed');
      enableRequiredTab('in_estateTrust_3');
      return false;
    }
    else
      return true;
  }else
    return true;
}
function checkAmalDate(obj)
{
if (allowTodayAndPastDateServer(obj.id)){
  var commncDt = trim(document.getElementById('calSoiBussCommDt').value);
  if (commncDt!=''){
    obj.value = trim(obj.value);
    if(!fnCompareDates(obj.value,commncDt)){
            return true;
    }else{
      obj.value ='';
      alert('Date of Amalgamation cannot be same as or before Business Commencement Date. Please consult any KRA Station or nearest iTax Support Centre to have these dates adjusted to enable you proceed with registration.');
      return false;
    }
  }else{
    alert('Please enter Business Commencement Date First');
    obj.value ='';
    return false;
  }
}else
  return false;
}

function enableBussinessInfo()
{
if(checkForBusinessType()) 
{
  //For COMP-REG Change on 26/05/2015
  /*document.getElementById("txtSoiBussNm").readOnly=true;
  document.getElementById("txtSoiBussNm").className='form101_textfcurr form101_textfcurr_width readonlyInput';
  document.getElementById("calSoiBussRegDt").readOnly=true;
  document.getElementById("calSoiBussRegDt").className='form101_textfcurr form101_textfcurr_width textonlyRight readonlyInput';
  document.getElementById("bussRegDate").style.display="none"; */ 
}	
else
{
  document.getElementById("txtSoiBussNm").readOnly=false;
  document.getElementById("txtSoiBussNm").className='form101_textfcurr form101_textfcurr_width';
  document.getElementById("calSoiBussRegDt").readOnly=false;
  document.getElementById("calSoiBussRegDt").className='form101_textfcurr form101_textfcurr_width textonlyRight';
  document.getElementById("bussRegDate").style.display="";  
}
document.getElementById("txtSoiBussCertRegNum").value="";
document.getElementById("txtSoiBussNm").value="";
document.getElementById("calSoiBussRegDt").value="";
document.getElementById("calSoiBussCommDt").value="";
document.getElementById('calNIObliregDtITPrtnr').value="";
document.getElementById('calNIObliregDtITComp').value="";
}

function checkForBusinessType()
{
var subCompObj = document.getElementById("cmbNIIdenBussSubTyp");
var subCompVal = subCompObj.options[subCompObj.selectedIndex].value;

if(subCompVal=='PUBCOMP' || subCompVal=='PVTCOMP' || subCompVal=='FRGNCOMP' || subCompVal=='EPZCOMP' || subCompVal == 'PRTNRSHP')
{
  return true;
}
else
{
  return false;
}
}
function enableBrnchPaye(obj)
{
if(obj.checked)
{
  document.getElementById("in_dtPlaceDtls_20").disabled=false;
}else{
  document.getElementById("in_dtPlaceDtls_20").disabled=true;
  document.getElementById("in_dtPlaceDtls_20").checked=false;
  showHideBrnchRegDate(false,"in_dtPlaceDtls_20",'in_dtPlaceDtls_22');
}
}
function enableBrnchVAT(obj)
{
if(obj.checked)
{
  document.getElementById("in_dtPlaceDtls_21").disabled=false;
}else{
  document.getElementById("in_dtPlaceDtls_21").disabled=true;
  document.getElementById("in_dtPlaceDtls_21").checked=false;
  showHideBrnchRegDate(false,"in_dtPlaceDtls_21",'in_dtPlaceDtls_23');
}
}

function enableSubsidiarySec(val)
{
//If Business Type is other than company than set subsidiary company to No and disable the section
if(val =='COMP' || val == '')
{
  document.getElementById("cmbRegSubComp").selectedIndex=0;
  changeInSubsidiaryComp("");
  document.getElementById('cmbRegSubComp').disabled=false;
  document.getElementById("cmbRegSubComp").className='form101_combo form101_combo_width';
}
else
{
  document.getElementById("cmbRegSubComp").selectedIndex=2;
  changeInSubsidiaryComp("No");
  document.getElementById('cmbRegSubComp').disabled=true;
  document.getElementById("cmbRegSubComp").className='form101_combo form101_combo_width readonlyInput';
}
}

function checkBussinessType(val)
{
if(val != '')
{
  if(document.getElementById("cmbNIIdenBussTyp").selectedIndex == 0)
  {
    alert("Please select Business Type first.");
    document.getElementById("cmbRegSubComp").selectedIndex=0;
    return false;
  }
}
return true;
}

function validateLegalRepPIN(pin){
if(null!=pin.value && pin.value!=''){
  toUpperPin(pin.id);
  if(validatePIN(pin,'')){
    FetchRegistrationDtl.fetchPinDeatilsReg(pin.value, {async:false,callback: function(data) {
      if(data == null || data == ''){
        pin.value='';
        alert('Please enter valid PIN');
        pin.focus();
      }
    },errorHandler:function(message) { alert("There is some server issue. Please try again later."); return false;}//Updated on 05/01/2014 for changing alert message in case server not found
    });
  }else{
    pin.value = "";
  }
}
}

function hideShowBranchTab(compVal,tabId){
if(compVal.toLowerCase()=='yes'){  
  showTab('TabView',tabId);
}else{
  hideTab('TabView',tabId);
}
}

function chechNonIndiBranchDtl(){
if(null!=document.getElementById('isBusinessBranch').value && document.getElementById('isBusinessBranch').value=='Yes'){
  var branchTable = document.getElementById('dtPlaceDtls');
  var isBranchRow=false;
  for (var r = 1; r < branchTable.rows.length; r++){
    var del = document.getElementById('id_dtPlaceDtls_'+r+'_1').name;
    if(null!=del && del!='' && del.toUpperCase()!='DELETED'){
      isBranchRow=true;
    }
  }
  if(!isBranchRow){
    alert('Please enter branch details.');
    return false;
  }
}
return true;
}
function chkValidateNssfNumber(nssfNumber)
{
rtnFlg=true;
if(nssfNumber!=null && nssfNumber!=''){

  FetchRegistrationDtl.chkValidateNssfNumber(nssfNumber,{async:false,callback:function(data){
    if(null!=data && data!=''){
      alert(data);
      rtnFlg=false;
      
    }
  },errorHandler:function(message) { alert("There is some server issue. Please try again later."); return false;}//Updated on 05/01/2014 for changing alert message in case server not found
  }
  );
}
return rtnFlg;
}

/*added for SEZ effective date--ali*/
function enablesezDate(val)
{
  if(document.getElementById('cmbNIIdenBussTyp').value =='COMP')
  {
    if(val=='SEZCOMP')
    {
      document.getElementById('calsezEffectiveDateVal').value='';
      document.getElementById('calsezEffectiveDateVal').disabled = false;
      document.getElementById('sezEffectDateComp').disabled = false;
      document.getElementById('calsezEffectiveDateVal').className='form101_textfcurr form101_textfcurr_width textonlyRight';
      document.getElementById('divsezEffectDateComp').style.display ='block';
      document.getElementById('sezEfDtMand').innerHTML='*';
    }else{
      document.getElementById('calsezEffectiveDateVal').value='';
      validateabussDetailsJson('calsezEffectiveDateVal');
      document.getElementById('calsezEffectiveDateVal').disabled = true;
      document.getElementById('sezEffectDateComp').disabled = true;
      document.getElementById('calsezEffectiveDateVal').className='form101_textfcurr form101_textfcurr_width textonlyRight readonlyInput';
      document.getElementById('divsezEffectDateComp').style.display ='none';
      document.getElementById('sezEfDtMand').innerHTML='';
    }
  }else{
    document.getElementById('calsezEffectiveDateVal').value='';
    validateabussDetailsJson('calsezEffectiveDateVal');
    document.getElementById('calsezEffectiveDateVal').disabled = true;
    document.getElementById('calsezEffectiveDateVal').className='form101_textfcurr form101_textfcurr_width textonlyRight readonlyInput';
    document.getElementById('sezEffectDateComp').className='';
    document.getElementById('divsezEffectDateComp').style.display ='none';
    document.getElementById('sezEfDtMand').innerHTML='';
  }
}
function checkSezStartDt(obj)
{
if(allowTodayAndPastDateServer(obj.id)){
  var sezStartDt  =  trim(document.getElementById('sezStartDt').value);
  if (sezStartDt!='')
  {
    if(!fnCompareDates(sezStartDt,obj.value))
    {
      obj.value ='';
      obj.focus();
      alert('SEZ effective date earlier than 1st Jan 2016 is not allowed');
      return false;
    }
  }
//}
else
{
  alert('Please enter SEZ Effective Date First');
  obj.value ='';
  return false;
}
return true;	
}
else{
  return false;
}
}

function checkMandatoryDocumentforSubmission()
{
  if(document.getElementsByName('fileUploadBean.file[0]')[0].value=='')
  {
    alert("Please choose file to upload.");
    return false;
  }
  else{
    var msg=checkFile(document.getElementsByName('fileUploadBean.file[0]')[0]);
    
    if(msg!=''){
      alert(msg);
      return false;
    }
  }
return true;
}

function checkFile(file)
{
var filename=file.value;
var fileNameLength=filename.length;
var fileExt=filename.substring(fileNameLength-4);
var msg="";
if(filename=="" || filename==null)
{
  return null;
}
else{
  var fileSize = file.files[0].size;
  }

//	if(!(fileExt==".jfif" || fileExt==".tiff"|| fileExt==".txt" || fileExt==".tif" || fileExt==".zip" || fileExt==".bmp" || fileExt==".pdf" || fileExt==".doc" || fileExt=="docx" || fileExt==".PDF" || fileExt==".DOC" || fileExt=="DOCX" || fileExt=="xlsx" || fileExt==".xls" || fileExt=="jpeg" || fileExt==".png" || fileExt==".jpg" || fileExt==".PNG" || fileExt=="XLSX" || fileExt=="JPEG" || fileExt==".JPG" || fileExt==".XLS" || fileExt==".GIF" || fileExt==".gif" || fileExt==".ODS" || fileExt==".ods"))
//	{
//		msg="Please upload attachment of allowed file type.\n";
//		msg=msg+"Allowed file types are .doc, .docx, .pdf, .xls, .xlsx, .jpeg, .png, .gif, .ods, jfif, tiff, tif, zip, bmp, txt\n";
//				
//	}
if(fileSize>=5*1048476)
{
  msg=msg+"Please upload file having size upto 5MB";
  
}
return msg;
}
/*allowTodayAndPastDateServer*/
/*added for SEZ effective date--ali*/
function disableWrite() {
window.event.returnValue = "";
}
function validateFileExtensionAndSizeManReact(fldId,maximumFileSize)
{

var filename = $(fldId).val();
var fileNameLength=filename.length;
var fileExt=filename.substring(fileNameLength-4);
var msg="";
if(filename=="" || filename==null)
{
  alert("Please upload file.");
  return false;
}
else{
  var fileSize = fldId.files[0].size;
}

//	if(!/(\.doc|\.docx|\.xls|\.xlsx|\.jpg|\.jpeg|\.png|\.gif|\.ods|\.jfif|\.tiff|\.tif|\.zip|\.bmp|\.txt|\.pdf)$/i.test(filename))
//	 {
//		alert("Invalid file type.");
//
//		$(fldId).val('');
//
//		return false;
//	}
if(fileSize>=(maximumFileSize*1024))
{
  alert('Please upload file with size upto ' + maximumFileSize + ' KB');
  $(fldId).val('');
  return false;
}
return true;

}
function checkCompPartDate(obj)
{
if(!isSlashDtFrmt(obj)){return false;}
if(document.getElementById('chkNIObliITPaye').checked)
{
  if(document.getElementById('calNIObliregDtITPaye').value !='')
  {
    if(!isEqual(document.getElementById('calNIObliregDtITPaye').value,obj.value))
    {
      if(dateCheck(obj.value,document.getElementById('calNIObliregDtITPaye').value))
        {
        obj.value ='';
        obj.focus();
        alert('Registration Date cannot be after Income Tax PAYE Registration Date');
        return false;
      }
    }
  }
}
if(document.getElementById('chkNIObliVat').checked)
{
  
  if(document.getElementById('calNIObliregDtVat').value !='')
  {
    if(!isEqual(document.getElementById('calNIObliregDtVat').value,obj.value))
    {
      if(dateCheck(obj.value,document.getElementById('calNIObliregDtVat').value))
        {
        obj.value ='';
        obj.focus();
        alert('Registration Date cannot be after Value Added Tax Registration Date');
        return false;
      }
    }
  }
  
  
}
if(document.getElementById('chkNIObliITTot').checked)
{
  
  if(document.getElementById('calNIObliregDtTot').value !='')
  {
    if(!isEqual(document.getElementById('calNIObliregDtTot').value,obj.value))
    {
      if(dateCheck(obj.value,document.getElementById('calNIObliregDtTot').value))
        {
        obj.value ='';
        obj.focus();
        alert('Registration Date cannot be after Turnover Tax Registration Date');
        return false;
      }
    }
  }
  
  
}
return true;
}


function dateCheck(str1,str2)
{
  var dt1  = parseInt(str1.substring(0,2),10); 
  var mon1 = parseInt(str1.substring(3,5),10); 
      mon1 = mon1-1;
  var yr1  = parseInt(str1.substring(6,10),10); 
  var dt2  = parseInt(str2.substring(0,2),10); 
  var mon2 = parseInt(str2.substring(3,5),10); 
      mon2 = mon2-1;
  var yr2  = parseInt(str2.substring(6,10),10); 
  var date = new Date(yr1, mon1, dt1); 
  var date2 = new Date(yr2, mon2, dt2); 
  if(date >= date2) 
      return true;
  else 
      return false;
}

function chkTotDt(totConstDate,obj,amdFlg)
{
if(allowTodayAndPastDate(obj.id))
{
  if(!dateCheck(obj.value,totConstDate))
    {
    obj.value ='';
    obj.focus();
    alert('Turnover Tax Registration Date should be on or after 01/04/2020.');
    return false;
    }
  if(document.getElementById('calSoiBussCommDt').value !='')
  {
    if(!isEqual(document.getElementById('calSoiBussCommDt').value,obj.value))
    {
      if(dateCheck(document.getElementById('calSoiBussCommDt').value,obj.value))
        {
        obj.value ='';
        obj.focus();
        alert('Income Tax Turnover Tax Registration Date cannot be before Business Commencement Date');
        return false;
      }
    }
  }
  if(document.getElementById('chkNIObliITPrtnr').checked)
{
  if(document.getElementById('calNIObliregDtITPrtnr').value !='')
  {
    if(!isEqual(document.getElementById('calNIObliregDtITPrtnr').value,obj.value))
    {
      if(dateCheck(document.getElementById('calNIObliregDtITPrtnr').value,obj.value))
        {
        obj.value ='';
        obj.focus();
        alert('Income Tax Turnover Tax Registration Date cannot be before Income Tax Partnership Registration Date');
        return false;
      }
    }
  }
}
  if(document.getElementById('chkNIObliITPaye').checked)
  {
    if(document.getElementById('calNIObliregDtITPaye').value !='')
    {
      if(null!=amdFlg && "Y"==amdFlg)
      {
        
          if(!isEqual(document.getElementById('calNIObliregDtITPaye').value,obj.value))
          {
            if(dateCheck(obj.value,document.getElementById('calNIObliregDtITPaye').value))
              {
              obj.value ='';
              obj.focus();
              alert('Turnover Tax Registration Date cannot be after Income Tax PAYE Registration Date');
              return false;
            }
          }
        
      }else
      {
        if(!isEqual(document.getElementById('calNIObliregDtITPaye').value,obj.value))
        {
          if(dateCheck(obj.value,document.getElementById('calNIObliregDtITPaye').value))
            {
            obj.value ='';
            obj.focus();
            alert('Turnover Tax Registration Date cannot be after Income Tax PAYE Registration Date');
            return false;
          }
        }
      }
    }
  }
  return true;
}
return false;
}
//added By Margi for TOT Addition:START

function turnoverTaxClicked(obj,isMigrated)
{
/*if(document.getElementById('chkIncTaxResi').checked && obj.checked)
{
  alert("You cannot select Income Tax Resident and Turnover Tax together.");
  obj.checked=false;
  return false;
}

if(document.getElementById('chkIncTaxNonResi').checked && obj.checked)
{
  alert("You cannot select Income Tax Non-Resident and Turnover Tax together.");
  obj.checked=false;
  return false;
}*/
//if(eitherVatOrTot(obj)){
  //showHideTotTab(obj.checked);
  createIntermAgentObli(obj); 
  showHideRegDate(obj.checked,obj.id,'calNIObliregDtTot');
  document.getElementById('calNIObliregDtTot').disabled=false;
  if(isMigrated=='Y')
  {
    if(obj.checked)
    {
      document.getElementById('txtPSTaxSupplyNextYr').value='0';
      document.getElementById('txtPSExSupplyNextYr').value='0';
      document.getElementById('txtPSExportedNextYr').value='0';
    }else
    {
      clearVatAnnexureDtl();
    }
    
  }else{
    enableTotVat(obj.checked);
  }
  //return true;
  //}
//return false;
}
function calculateAnnualVAT(ddeFlag , amdFlag)
{
if(document.getElementById("chkNIObliVat").checked==true)
{
  var msgFlag=false;
  var toThirdYr=(ifNaNValue('txtPSTaxSupplyThirdYr')+ifNaNValue('txtPSExSupplyThirdYr')+ifNaNValue('txtPSExportedThirdYr')).toFixed(2);
  var toSecondYr=(ifNaNValue('txtPSTaxSupplySeYr')+ifNaNValue('txtPSExSupplySeYr')+ifNaNValue('txtPSExportedSeYr')).toFixed(2);
  var toLastYr=(ifNaNValue('txtPSTaxSupplyLastYr')+ifNaNValue('txtPSExSupplyLastYr')+ifNaNValue('txtPSExportedLastYr')).toFixed(2);
  var toNextYr=(ifNaNValue('txtPSTaxSupplyNextYr')+ifNaNValue('txtPSExSupplyNextYr')+ifNaNValue('txtPSExportedNextYr')).toFixed(2);
  
  if(toThirdYr<5000000.00 && toSecondYr<5000000.00 && toLastYr<5000000.00 && toNextYr<5000000.00)
  {
    msgFlag=true;
  }
  
  if(msgFlag==true)
  {
    if(ddeFlag=='Y')
    {
      if(amdFlag=='Y')
      {
        //Amendment DDE
        if(confirm('The Taxpayer is eligible to register for Turnover Tax as the turnover of neither of the four years exceed 5 million Ksh. Do you still want to request to register for Value Added Tax?'))
        {
          return true;
        }
        else
        {
          /*showHideRegDate(false,"chkVat");
          showHideRegDate(false,"chkIncTaxResi");
          document.getElementById('chkIncTaxResi').checked = false;
          document.getElementById('chkIncTaxResi').disabled = false;
          d;ocument.getElementById('chkVat').checked = false;
          document.getElementById('chkVat').disabled = false;*/
          tabview_switch('TabView', '1');
          //showHideVatTab(false);
          hideTab('TabView',7);
          /*if(document.getElementById('section7Vat') != null)
          {
            document.getElementById('section7Vat').disabled=true;
            document.getElementById('section7Vat').checked=false;
          }
          if(document.getElementById('sectionTot') != null)
          {
            document.getElementById('sectionTot').disabled=true;
            document.getElementById('sectionTot').checked=false;
          }*/
          return false;	
        }
      }
      else
      {
        //Registration DDE
        if(confirm('The Taxpayer is eligible to register for Turnover Tax as the turnover of neither of the four years exceed 5 million Ksh. Do you still want to request to register for Value Added Tax?'))
        {
          return true;
        }
        else
        {
          showHideRegDate(false,"chkNIObliVat");
          //showHideRegDate(false,"chkIncTaxResi");
          //document.getElementById('chkIncTaxResi').checked = false;
          document.getElementById('chkNIObliVat').checked = false;						
          tabview_switch('TabView', '2');						
          showHideVatTab(false);	
          return false;	
        }			
      }
    }
    else
    {
      if(amdFlag=='Y')
      {
        //Made alert condition based i.e. show only for obligation change for PR 316. on 09/01/2015
        //Amendment Verfication
         if(obligationChng=="Y")
         {
          if(confirm('The Taxpayer is eligible to register for Turnover Tax as the turnover of neither of the four years exceed 5 million Ksh. Are you still want to approve the request of Taxpayer to register for Value Added Tax?'))
          {
            return true;
          }
          else
          {
            return false;
          }
        }
        
        return true;
      }
      else
      {
        //Registration Verification
        if(confirm('The Taxpayer is eligible to register for Turnover Tax as the turnover of neither of the four years exceed 5 million Ksh. Are you still want to approve the request of Taxpayer to register for Value Added Tax?'))
        {
          return true;
        }
        else
        {
          return false;
        }
      }
    }
  }
}
return true;
}
function calculateAnnualTO(ddeFlag)
{
if(document.getElementById("chkNIObliITTot").checked==true){
  var toThirdYr=(ifNaNValue('txtPSTaxSupplyThirdYr')+ifNaNValue('txtPSExSupplyThirdYr')+ifNaNValue('txtPSExportedThirdYr')).toFixed(2);
  var toSecondYr=(ifNaNValue('txtPSTaxSupplySeYr')+ifNaNValue('txtPSExSupplySeYr')+ifNaNValue('txtPSExportedSeYr')).toFixed(2);
  var toLastYr=(ifNaNValue('txtPSTaxSupplyLastYr')+ifNaNValue('txtPSExSupplyLastYr')+ifNaNValue('txtPSExportedLastYr')).toFixed(2);
  var toNextYr=(ifNaNValue('txtPSTaxSupplyNextYr')+ifNaNValue('txtPSExSupplyNextYr')+ifNaNValue('txtPSExportedNextYr')).toFixed(2);
  var msg="";
  var msgFlag=false;
  //var totTurnOverLimit=document.getElementById("totTurnOverLimit").value;
  var totTurnOverLimit=parseFloat(document.getElementById("totTurnOverLimit").value);
  var totTurnOverMinLimit=parseFloat(document.getElementById("totTurnOverMinLimit").value);
      var msgMin="";
  var msgFlagMin=false;           

  if(toThirdYr<totTurnOverMinLimit && toSecondYr<totTurnOverMinLimit && toLastYr<totTurnOverMinLimit && toNextYr<totTurnOverMinLimit){
    if(msgMin!=""){msgMin=msgMin+",";}
    msgMin=msgMin+"third Year";
    msgFlagMin=true;
  }  

  if(msgFlagMin==true){
    alert('Please register for Value Added Tax as the turnover of atleast one of the four years is less than '+totTurnOverMinLimit/1000000+' million Ksh.');
    enableRequiredTab('chkNIObliITTot');
    return false;
  }
  if(toThirdYr>totTurnOverLimit){
    if(msg!=""){msg=msg+",";}
    msg=msg+"Third Year";
    msgFlag=true;
  }
  if(toSecondYr>totTurnOverLimit){
    if(msg!=""){msg=msg+",";}
    msg=msg+"Second Year";
    msgFlag=true;
  }
  if(toLastYr>totTurnOverLimit){
    if(msg!=""){msg=msg+",";}
    msg=msg+"Last Year";
    msgFlag=true;
  }
  if(toNextYr>totTurnOverLimit){
    if(msg!=""){msg=msg+",";}
    msg=msg+"Next Year(Estimated)";
    msgFlag=true;
  }

  if(msgFlag==true){
    alert('Please register for Value Added Tax as the turnover of atleast one of the four years exceeds '+totTurnOverLimit/1000000+' million Ksh.');
    enableRequiredTab('chkNIObliITTot');
    return false;
  }
  return true;
}
return true;
}
function ifNaNValue(elementId)
{
  if(isNaN(eval(removeCommaFrmInput(document.getElementById(elementId).value))))
  return 0;
  else
  return eval(removeCommaFrmInput(document.getElementById(elementId).value));
}
function enableTotVat(flag)
{
  disabledElements(document.getElementById('taxSupplDiv'),!flag);
  if(!flag)
  {
    clearVatAnnexureDtl();
  }
}
//added By Margi FOr TOT Addition :END

function enableTOT(obj)
{
var businessType=document.getElementById('cmbNIIdenBussSubTyp');
//if(businessType !=null && businessType.value !='' && obj.checked)
//{
if(!document.getElementById('chkNIObliITComp').checked)
{
  //if(businessType.value=='PRTNRSHP')
  //{
    //document.getElementById('chkNIObliITPrtnr').disabled=false;
    //showHideRegDate(true,'chkNIObliITPrtnr');
    //createIntermAgentObli(document.getElementById('chkNIObliITPrtnr'));
    //document.getElementById('chkNIObliITTot').checked=false;
  if(obj.checked)
    {
    document.getElementById("chkNIObliITTot").disabled=false;
    document.getElementById("calNIObliregDtTot").disabled=false;
    //	showHideRegDate(true,'chkNIObliITTot');
      showHideRegDate(true,'chkNIObliITTot','calNIObliregDtTot');
      createIntermAgentObli(document.getElementById('chkNIObliITTot'));
      document.getElementById('chkNIObliITComp').checked=false;

      showHideRegDate(false,'chkNIObliITComp','calNIObliregDtITComp');
      createIntermAgentObli(document.getElementById('chkNIObliITComp'));
      
      document.getElementById("accMonth").value="12";
      document.getElementById("accMonth").disabled=true;
      setRegDate(document.getElementById("calSoiBussCommDt"));
      return true;}
  else
    {
    showHideRegDate(false,'chkNIObliITTot','calNIObliregDtTot');

    }
    
    /*}
  else
  {		
    alert('You can not register with Income Tax Turnover Tax as your business sub type is not Partnership');
    document.getElementById('chkNIObliITTot').checked=false;
    return false;
  }*/
}else{
  
  alert('You can not register Income Tax Turnover Tax and Income Tax Company together.');
  document.getElementById('chkNIObliITTot').checked=false;
      return false;
}
//}
/*else{
  if(document.getElementById('cmbNIIdenBussTyp').value == ""){
  alert('Please select Business Type.');
  document.getElementById('chkNIObliITTot').checked=false;
  return false;
  } }*/ 	
}
function enableCompany(obj)
{
var businessType=document.getElementById('cmbNIIdenBussSubTyp');
if(document.getElementById('chkNIObliITTot').checked)
{
  alert('You can not register Income Tax Turnover Tax and Income Tax Company together.');
  document.getElementById('chkNIObliITComp').checked=false;
}
if(document.getElementById('cmbNIIdenBussTyp') !=null && document.getElementById('cmbNIIdenBussTyp').value !=null && document.getElementById('cmbNIIdenBussTyp').value !="")
  {
if(((businessType !=null && businessType.value !='') ||businessType.disabled)  && obj.checked)
{
  
if(document.getElementById('cmbNIIdenBussTyp').value =='OTHERS')
{
  if(businessType.value=='PRTNRSHP')
  {
    alert('You can not register with Income Tax Compony as your business type is Partnership Firm.');
    document.getElementById('chkNIObliITComp').checked=false;
    /*document.getElementById('chkNIObliITPrtnr').checked=true;
    showHideRegDate(true,'chkNIObliITPrtnr');
    createIntermAgentObli(document.getElementById('chkNIObliITPrtnr'));
    document.getElementById('chkNIObliITTot').checked=false;
    document.getElementById("chkNIObliITTot").disabled=false;
    showHideRegDate(true,'chkNIObliITTot');
    createIntermAgentObli(document.getElementById('chkNIObliITTot'));
    document.getElementById('chkNIObliITComp').checked=false;

    showHideRegDate(false,'chkNIObliITComp');
    createIntermAgentObli(document.getElementById('chkNIObliITComp'));
    
    document.getElementById("cmbNIIdenAccPeriod").value="12";
    document.getElementById("cmbNIIdenAccPeriod").disabled=true;
*/		}
  else
  {
    document.getElementById('chkNIObliITComp').checked=true;
    //showHideRegDate(true,'chkNIObliITComp');
    showHideRegDate(false,'chkNIObliITComp','calNIObliregDtITComp');
    document.getElementById('calNIObliregDtITComp').disabled = false;
    /*document.getElementById('calNIObliregDtITComp').className='form101_textfcurr form101_textfcurr_width textonlyRight';
    //imgButton = 'div'+'chkNIObliITComp';
    //document.getElementById(imgButton).style.display='block';
    document.getElementById('chkNIObliITPrtnr').checked=false;*/
    //showHideRegDate(false,'chkNIObliITPrtnr');
    showHideRegDate(true,'chkNIObliITPrtnr','calNIObliregDtITPrtnr');
    if (document.getElementById('chkNIObliITComp').checked)
    {
      document.getElementById('calNIObliregDtITComp').value=document.getElementById('calSoiBussCommDt').value;
      document.getElementById('calNIObliregDtITPrtnr').value="";
    }
    document.getElementById('chkNIObliITTot').checked=false;
    //showHideRegDate(false,'chkNIObliITTot');
    showHideRegDate(false,'chkNIObliITTot','calNIObliregDtTot');

    createIntermAgentObli(document.getElementById('chkNIObliITComp'));
    createIntermAgentObli(document.getElementById('chkNIObliITPrtnr'));
    createIntermAgentObli(document.getElementById('chkNIObliITTot'));

    document.getElementById("accMonth").value="";
    document.getElementById("accMonth").disabled=false;
    setRegDate(document.getElementById("calSoiBussCommDt"));
          return true;
  }
}else{
  
  document.getElementById('chkNIObliITComp').checked=true;
  //showHideRegDate(true,'chkNIObliITComp');
  showHideRegDate(false,'chkNIObliITComp','calNIObliregDtITComp');
  //document.getElementById('calNIObliregDtITComp').disabled = false;
  //document.getElementById('calNIObliregDtITComp').className='form101_textfcurr form101_textfcurr_width textonlyRight';
  //imgButton = 'div'+'chkNIObliITComp';
  //document.getElementById(imgButton).style.display='block';
  document.getElementById('chkNIObliITPrtnr').checked=false;
  //showHideRegDate(false,'chkNIObliITPrtnr');
  showHideRegDate(false,'chkNIObliITPrtnr','calNIObliregDtITPrtnr');
  if (document.getElementById('chkNIObliITComp').checked)
  {
    document.getElementById('calNIObliregDtITComp').value=document.getElementById('calSoiBussCommDt').value;
    document.getElementById('calNIObliregDtITPrtnr').value="";
  }
  document.getElementById('chkNIObliITTot').checked=false;
  //showHideRegDate(false,'chkNIObliITTot');
  showHideRegDate(false,'chkNIObliITTot','calNIObliregDtTot');

  createIntermAgentObli(document.getElementById('chkNIObliITComp'));
  createIntermAgentObli(document.getElementById('chkNIObliITPrtnr'));
  createIntermAgentObli(document.getElementById('chkNIObliITTot'));

  document.getElementById("accMonth").value="";
  document.getElementById("accMonth").disabled=false;
  setRegDate(document.getElementById("calSoiBussCommDt"));
      return true;
}
}
else
  {
  if(document.getElementById('cmbNIIdenBussTyp').value ==''){
    alert('select Business Type.');
    document.getElementById('chkNIObliITComp').checked=false;
    showHideRegDate(false,'chkNIObliITComp','calNIObliregDtITComp');

    return false;
  }
  
  }
  }
else
{
if(document.getElementById('cmbNIIdenBussTyp').value ==''){
  alert('select Business Type.');
  document.getElementById('chkNIObliITComp').checked=false;
  showHideRegDate(false,'chkNIObliITComp','calNIObliregDtITComp');

  return false;
}

}
}
function checkPayee(obj){
if(obj.checked == true && obj.disabled==false){
  document.getElementById('overlay').style.display="block";
  document.getElementById('payeMsg').style.display="block";
  document.getElementById('vatMsg').style.display="none";
  ModalDialogBox();
  }
else{
  document.getElementById('overlay').style.display="none";
  document.getElementById('payeMsg').style.display="none";
  document.getElementById('TREMSG').style.display="none";
}	
}

function checkVatee(obj){
if(obj.checked == true && obj.disabled==false){
  document.getElementById('overlay').style.display="block";
  document.getElementById('vatMsg').style.display="block";
  document.getElementById('payeMsg').style.display="none";
  ModalDialogBox();
  }
else{
  document.getElementById('overlay').style.display="none";
  document.getElementById('vatMsg').style.display="none";
  document.getElementById('TREMSG').style.display="none";
}	
}
function showHideRegDate(displayFlag,compId,textId) {
//displayTdLblId = compId + 'RegLbl';
imgButton = 'div'+compId;
if(displayFlag)
{
  //document.getElementById(displayTdLblId).style.display='block';
  //document.getElementById(displayTdDtId).style.display='block';
  document.getElementById(textId).disabled = false;
  document.getElementById(textId).className='form101_textfcurr form101_textfcurr_width textonlyRight';
  document.getElementById(imgButton).style.display='block';
  
  // document.getElementById(textId).value='';
}else
{
  //document.getElementById(displayTdLblId).style.display='none';
  //document.getElementById(displayTdDtId).style.display='none';
  document.getElementById(textId).disabled = true;
  document.getElementById(textId).className='form101_textfcurr form101_textfcurr_width textonlyRight readonlyInput';
  document.getElementById(imgButton).style.display='none';
  document.getElementById(textId).value='';
}
}

function setRegDateDst(obj1)
{
  if(obj1.value !='' )
  {
    if (document.getElementById('chkNIObliITDST').checked)
    {
      document.getElementById('calNIObliregDtITDST').value=obj1.value;
    }
     if(document.getElementById('chkNIObliVat').checked)
    {
      document.getElementById('calNIObliregDtVat').value=obj1.value;
    }
    
  }else
  {
    document.getElementById('calNIObliregDtITDST').value="";
    document.getElementById('calNIObliregDtVat').value="";
    
  }
}