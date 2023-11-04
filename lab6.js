function submitCountyForm(obj)
{
	var obligation=obj;
	/*if(removeCommaFrmInput(document.getElementById("txtAmountPayable").value)<=0)
	{
		alert(totalAmtPayebleGreaterThenZero);
		return false;
	}*/
	
	if(obligation=="LL")
	{
		if(document.getElementById("txtTotalAmountPaidCountyLL").value==null || document.getElementById("txtTotalAmountPaidCountyLL").value=="")
		{
			alert(totalAmtGreaterThenZero);
			return false;
		}
		if(parseInt(removeCommaFrmInput(document.getElementById("txtTotalAmountPaidCountyLL").value))<=0)
		{
			alert(totalAmtGreaterThenZero);
			return false;
		}
		/*if(parseInt(removeCommaFrmInput(document.getElementById("txtTotalAmountPaidCountyLL").value))>parseInt(removeCommaFrmInput(document.getElementById("txtAmountPayableLL").value)))
			{
			alert('"Total Amount to be paid" cannot be greater than "Outstanding Amount"');
			return false;
			}*/
	}
	else if(obligation=="SBP")
	{
		if(document.getElementById("txtMobileNo").value==null ||document.getElementById("txtMobileNo").value=="")
		{
		alert ('Please enter mobile number');
		return false;
		}
		if(document.getElementById("txtEmailAdd").value==null ||document.getElementById("txtEmailAdd").value=="")
		{
		alert ('Please enter Email Id');
		return false;
		}
		//check for email id and mobile number
		if(document.getElementById("txtTotalAmountPaidCountySBP").value==null || document.getElementById("txtTotalAmountPaidCountySBP").value=="")
		{
			alert(totalAmtGreaterThenZero);
			return false;
		}
		if(parseInt(removeCommaFrmInput(document.getElementById("txtTotalAmountPaidCountySBP").value))<=0)
		{
			alert(totalAmtGreaterThenZero);
			return false;
		}
}
	
	if(saveConfirm())
	{
		//document.getElementById("txtAmountPayable").value=removeCommaFrmInput(document.getElementById("txtAmountPayable").value);
		if(obligation=="LL")
		{
			document.getElementById("txtTotalAmountPaidCountyLL").value=removeCommaFrmInput(document.getElementById("txtTotalAmountPaidCountyLL").value);
		}
		if(obligation=="SBP")
		{
			document.getElementById("txtTotalAmountPaidCountyLL").value=removeCommaFrmInput(document.getElementById("txtTotalAmountPaidCountyLL").value);
		}
		document.getElementById('cmdSaveOblig').disabled=true;
		document.getElementById('cmdClearOblig').disabled=true;
		document.getElementById('back').disabled=true;
		document.getElementById('hidPaymentType').value='SAT';
		document.getElementById('hidObligationType').value='NTR';
		document.getElementById('hidObligationId').value=document.getElementById('countySubHeadRevenueStream').value;
		document.paymentRegForm.action="paymentRegistration.htm?actionCode=saveObligationDetail";
		document.paymentRegForm.submit();
		return true;
	}
	}


function onChangeCountySubHead(obj)
{
	if (obj.value=="LL")
	{
		document.getElementById('LandRateLeaseHoldDtlset').style.display="";
		document.getElementById('SBPDtlset').style.display="none";
	}
	else if(obj.value=="SBP")
	{
		document.getElementById('LandRateLeaseHoldDtlset').style.display="none";
		document.getElementById('SBPDtlset').style.display="";
		
	}


}


function fetchCountyDetailsLandLease(type)
{
	if (type=="upn")
		{
		type="UPN-Unique Parcel Number";
		document.getElementById('txtLrNumberLL').value= "";
		document.getElementById('txtBlockNo').value="";
		document.getElementById('txtPlotNo').value="";	
		}else if(type=="block"){
			type="Block Number";
			document.getElementById('txtLrNumberLL').value= "";
			document.getElementById('txtUpn').value="";
			document.getElementById('txtPlotNo').value="";
			
		}else if(type=="plot"){
			type="Plot Number";
			document.getElementById('txtLrNumberLL').value= "";
			document.getElementById('txtUpn').value="";
			document.getElementById('txtBlockNo').value="";
			
		}else if(type=="lr"){
			type="LR Number";
			document.getElementById('txtBlockNo').value= "";
			document.getElementById('txtUpn').value="";
			document.getElementById('txtPlotNo').value="";
			
		}
	var upn=document.getElementById('txtUpn').value;
	var blockNo=document.getElementById('txtBlockNo').value;
	var plotNo=document.getElementById('txtPlotNo').value;
	var lrNo=document.getElementById('txtLrNumberLL').value;
	var countyName=document.getElementById('countyName').value;
	var isCounty="true";
	var val=0;
	var value="";
	if (upn!=null && upn!="")
		{
		val=1;
		value=upn;
		}else if(blockNo!=null && blockNo!="")
		   {
			val=2;
			value=blockNo;
			}else if(plotNo!=null && plotNo!="")
			   {
				val=3;
				value=plotNo;
				}
			else if(lrNo!=null && lrNo!="")
				   {
					val=4;
					value=lrNo;
					}
	FetchCountyTaxDetails.fetchCountyDetailsLandLease(value,val,countyName,{async:false,callback: function(data){
		if (data!=null && data!="" && data!="null"){
			
			if (upn!=null && upn!="")
				{
					
				document.getElementById('txtLrNumberLL').readOnly= true;
				$('#txtLrNumberLL').addClass('readonlyInput');
				document.getElementById('txtBlockNo').readOnly= true;
				$('#txtBlockNo').addClass('readonlyInput');
				document.getElementById('txtPlotNo').readOnly= true;	
				$('#txtPlotNo').addClass('readonlyInput');
				document.getElementById('txtAmountPayableLL').readOnly= true;
				document.getElementById('txtRatePayer').readOnly= true;
				document.getElementById('txtValuation').readOnly= true;	
				document.getElementById('txtSubCountyLL').readOnly= true;
				document.getElementById('txtCoOwner').readOnly= true;
				document.getElementById('txtSubCountyLL').readOnly= true;	
				document.getElementById('txtWardLL').readOnly= true;
				document.getElementById('txtLandUse').readOnly= true;
				document.getElementById('txtPropDocType').readOnly= true;
				document.getElementById('txtPlotSize').readOnly= true;
				document.getElementById('txtPhyLocProp').readOnly= true;
				document.getElementById('txtValuation').readOnly= true;
				
				document.getElementById('txtUpn').value= data.upn;
				document.getElementById('txtBlockNo').value=data.blockNo;
				document.getElementById('txtPlotNo').value=data.plotNo;					
				document.getElementById('txtLrNumberLL').value=data.lrNumber;
				document.getElementById('txtRatePayer').value=data.ratePayer;
				document.getElementById('txtCoOwner').value=data.coOwner;
				document.getElementById('txtSubCountyLL').value=data.subCounty;
				document.getElementById('txtWardLL').value=data.ward;
				document.getElementById('txtLandUse').value=data.landUse;
				document.getElementById('txtPropDocType').value=data.propDocType;
				document.getElementById('txtPlotSize').value=data.plotSize;	
				document.getElementById('txtPhyLocProp').value=data.phyLocProp;	
				document.getElementById('txtValuation').value=data.valuation;
				document.getElementById('txtAmountPayableLL').value=data.amountPayable;
				document.getElementById('txtTotalAmountPaidCountyLL').value=null;
					}else if(blockNo!=null && blockNo!="")
					   {
						document.getElementById('txtUpn').readOnly= true;
						$('#txtUpn').addClass('readonlyInput');
						$('#txtLrNumberLL').addClass('readonlyInput');
						$('#txtPlotNo').addClass('readonlyInput');
						document.getElementById('txtLrNumberLL').readOnly= true;
						//document.getElementById('txtBlockNo').readOnly= true;
						document.getElementById('txtPlotNo').readOnly= true;	
						document.getElementById('txtAmountPayableLL').readOnly= true;
						document.getElementById('txtRatePayer').readOnly= true;
						document.getElementById('txtValuation').readOnly= true;	
						document.getElementById('txtSubCountyLL').readOnly= true;
						document.getElementById('txtCoOwner').readOnly= true;
						document.getElementById('txtSubCountyLL').readOnly= true;	
						document.getElementById('txtWardLL').readOnly= true;
						document.getElementById('txtLandUse').readOnly= true;
						document.getElementById('txtPropDocType').readOnly= true;
						document.getElementById('txtPlotSize').readOnly= true;
						document.getElementById('txtPhyLocProp').readOnly= true;
						document.getElementById('txtValuation').readOnly= true;
						//document.getElementById('txtLrNumber').readOnly= true;
						document.getElementById('txtPlotNo').readOnly= true;	
						document.getElementById('txtUpn').value= data.upn;
						document.getElementById('txtBlockNo').value=data.blockNo;
						document.getElementById('txtPlotNo').value=data.plotNo;					
						document.getElementById('txtLrNumberLL').value=data.lrNumber;
						document.getElementById('txtRatePayer').value=data.ratePayer;
						document.getElementById('txtCoOwner').value=data.coOwner;
						document.getElementById('txtSubCountyLL').value=data.subCounty;
						document.getElementById('txtWardLL').value=data.ward;
						document.getElementById('txtLandUse').value=data.landUse;
						document.getElementById('txtPropDocType').value=data.propDocType;
						document.getElementById('txtPlotSize').value=data.plotSize;	
						document.getElementById('txtPhyLocProp').value=data.phyLocProp;	
						document.getElementById('txtValuation').value=data.valuation;
						document.getElementById('txtAmountPayableLL').value=data.amountPayable;
						document.getElementById('txtTotalAmountPaidCountyLL').value=null;
						}else if(plotNo!=null && plotNo!="")
						   {
							$('#txtUpn').addClass('readonlyInput');
							$('#txtLrNumberLL').addClass('readonlyInput');
							$('#txtBlockNo').addClass('readonlyInput');
							document.getElementById('txtUpn').readOnly= true;
							document.getElementById('txtLrNumberLL').readOnly= true;
							document.getElementById('txtBlockNo').readOnly= true;
							document.getElementById('txtAmountPayableLL').readOnly= true;
							document.getElementById('txtRatePayer').readOnly= true;
							document.getElementById('txtValuation').readOnly= true;	
							document.getElementById('txtSubCountyLL').readOnly= true;
							document.getElementById('txtCoOwner').readOnly= true;
							
							document.getElementById('txtWardLL').readOnly= true;
							document.getElementById('txtLandUse').readOnly= true;
							document.getElementById('txtPropDocType').readOnly= true;
							document.getElementById('txtPlotSize').readOnly= true;
							document.getElementById('txtPhyLocProp').readOnly= true;
							document.getElementById('txtValuation').readOnly= true;
							
							document.getElementById('txtUpn').value= data.upn;
							document.getElementById('txtBlockNo').value=data.blockNo;
							document.getElementById('txtPlotNo').value=data.plotNo;					
							document.getElementById('txtLrNumberLL').value=data.lrNumber;
							document.getElementById('txtRatePayer').value=data.ratePayer;
							document.getElementById('txtCoOwner').value=data.coOwner;
							document.getElementById('txtSubCountyLL').value=data.subCounty;
							document.getElementById('txtWardLL').value=data.ward;
							document.getElementById('txtLandUse').value=data.landUse;
							document.getElementById('txtPropDocType').value=data.propDocType;
							document.getElementById('txtPlotSize').value=data.plotSize;	
							document.getElementById('txtPhyLocProp').value=data.phyLocProp;	
							document.getElementById('txtValuation').value=data.valuation;
							document.getElementById('txtAmountPayableLL').value=data.amountPayable;
							document.getElementById('txtTotalAmountPaidCountyLL').value=null;
							}
							else if(lrNo!=null && lrNo!="")
								{
								$('#txtUpn').addClass('readonlyInput');
								$('#txtBlockNo').addClass('readonlyInput');
								$('#txtPlotNo').addClass('readonlyInput');
								document.getElementById('txtUpn').readOnly= true;
								document.getElementById('txtBlockNo').readOnly= true;
								document.getElementById('txtPlotNo').readOnly= true;	
								document.getElementById('txtAmountPayableLL').readOnly= true;
								document.getElementById('txtRatePayer').readOnly= true;
								document.getElementById('txtValuation').readOnly= true;	
								document.getElementById('txtSubCountyLL').readOnly= true;
								document.getElementById('txtCoOwner').readOnly= true;
								
								document.getElementById('txtWardLL').readOnly= true;
								document.getElementById('txtLandUse').readOnly= true;
								document.getElementById('txtPropDocType').readOnly= true;
								document.getElementById('txtPlotSize').readOnly= true;
								document.getElementById('txtPhyLocProp').readOnly= true;
								document.getElementById('txtValuation').readOnly= true;
								
								
								document.getElementById('txtUpn').value= data.upn;
								document.getElementById('txtBlockNo').value=data.blockNo;
								document.getElementById('txtPlotNo').value=data.plotNo;					
								document.getElementById('txtLrNumberLL').value=data.lrNumber;
								document.getElementById('txtRatePayer').value=data.ratePayer;
								document.getElementById('txtCoOwner').value=data.coOwner;
								document.getElementById('txtSubCountyLL').value=data.subCounty;
								document.getElementById('txtWardLL').value=data.ward;
								document.getElementById('txtLandUse').value=data.landUse;
								document.getElementById('txtPropDocType').value=data.propDocType;
								document.getElementById('txtPlotSize').value=data.plotSize;	
								document.getElementById('txtPhyLocProp').value=data.phyLocProp;	
								document.getElementById('txtValuation').value=data.valuation;
								document.getElementById('txtAmountPayableLL').value=data.amountPayable;
								document.getElementById('txtTotalAmountPaidCountyLL').value=null;
								}
			
				}
		else
			{
			alert("Invalid "+type+".");
						
			}
	    }
	});
}


function fetchSingleBusinessPermitDtl(type)
{
	if (type=="sbp")
	{ type="Single Business Permit Number";
	document.getElementById('txtBrn').value= "";
	}else if(type=="brn"){
		type="Business Registration Number";
		document.getElementById('txtSbp').value= "";
	}
	var sbp=document.getElementById('txtSbp').value;
	var brn=document.getElementById('txtBrn').value;
	var countyName=document.getElementById('countyName').value;
	var val=0;
	var value="";
	var isSBP="true";
	if (sbp!=null && sbp!="")
		{
		val=1;
		value=sbp;
		}else if(brn!=null && brn!="")
		   {
			val=2;
			value=brn;
			}
	FetchCountySingleBusinessPermitTaxDetails.fetchCountySingleBusinessPermitTaxDetails(value,val,countyName,{async:false,callback: function(data){
		if (data!=null && data!="" && data!="null")
		{
			if (sbp!=null && sbp!="")
			{
				$('#txtBrn').addClass('readonlyInput');
				//document.getElementById('txtSbp').readOnly= true;
				document.getElementById('txtBrn').readOnly= true;
				//document.getElementById('txtMobileNo').readOnly= true;
				//document.getElementById('txtEmailAdd').readOnly= true;
				document.getElementById('txtCategoryCode').readOnly= true;
				document.getElementById('txtSubCatCode').readOnly= true;
				document.getElementById('txtDescription').readOnly= true;
				document.getElementById('txtNoOfEmp').readOnly= true;
				document.getElementById('txtPhyAdd').readOnly= true;
				document.getElementById('txtLrNumberSBP').readOnly= true;
				document.getElementById('txtBpa').readOnly= true;
				document.getElementById('txtUpnSBP').readOnly= true;
				document.getElementById('txtBusinessNameSBP').readOnly= true;
				document.getElementById('txtAmountPayableSBP').readOnly= true;
				document.getElementById('txtSolidWasteConservancyPayable').readOnly= true;
				document.getElementById('txtFireAmountPayable').readOnly= true;
				document.getElementById('txtPublicHealthPayable').readOnly= true;
				document.getElementById('txtAnyOtherPayable').readOnly= true;
				document.getElementById('txtAmountPayableSBP').readOnly= true;
				document.getElementById('txtSbp').value= data.sbp;
				document.getElementById('txtBrn').value=data.brn;
				document.getElementById('txtMobileNo').value=data.mobileNumber;					
				document.getElementById('txtEmailAdd').value=data.emailAdd;
				document.getElementById('txtCategoryCode').value=data.categoryCode;
				document.getElementById('txtSubCatCode').value=data.subCatCode;
				document.getElementById('txtDescription').value=data.description;
				document.getElementById('txtNoOfEmp').value=data.noOfEmp;

				document.getElementById('txtSubCountySBP').value=data.subCounty;
				document.getElementById('txtWardSBP').value=data.ward;

				document.getElementById('txtPhyAdd').value=data.phyAdd;
				document.getElementById('txtLrNumberSBP').value=data.lrNumber;	
				document.getElementById('txtBpa').value=data.bpa;
				document.getElementById('txtUpnSBP').value=data.upn;
				document.getElementById('txtSBPAmountPayable').value=data.sbpAmountPayable;
				document.getElementById('txtSolidWasteConservancyPayable').value=data.solidWasteConservancyPayable;	
				document.getElementById('txtBusinessNameSBP').value=data.businessName;
				document.getElementById('txtFireAmountPayable').value=data.fireAmountPayable;	
				document.getElementById('txtPublicHealthPayable').value=data.publicHealthPayable;
				document.getElementById('txtAnyOtherPayable').value=data.anyOtherPayable;
				var amountPayable=data.sbpAmountPayable+data.publicHealthPayable+data.anyOtherPayable+data.solidWasteConservancyPayable+data.fireAmountPayable;
				//document.getElementById('txtAmountPayableSBP').value=data.amountPayable;	
				document.getElementById('txtAmountPayableSBP').value=amountPayable;	
				document.getElementById('txtTotalAmountPaidCountySBP').value=amountPayable;

			}
			else if(brn!=null && brn!="")
			{
				document.getElementById('txtSbp').readOnly= true;
				$('#txtSbp').addClass('readonlyInput');				
				//document.getElementById('txtBrn').readOnly= true;
				//document.getElementById('txtMobileNo').readOnly= true;
				//document.getElementById('txtEmailAdd').readOnly= true;
				document.getElementById('txtCategoryCode').readOnly= true;
				document.getElementById('txtSubCatCode').readOnly= true;
				document.getElementById('txtDescription').readOnly= true;
				document.getElementById('txtNoOfEmp').readOnly= true;
				document.getElementById('txtPhyAdd').readOnly= true;
				document.getElementById('txtLrNumberSBP').readOnly= true;
				document.getElementById('txtBpa').readOnly= true;
				document.getElementById('txtBusinessNameSBP').readOnly= true;
				document.getElementById('txtUpnSBP').readOnly= true;
				document.getElementById('txtAmountPayableSBP').readOnly= true;
				document.getElementById('txtSolidWasteConservancyPayable').readOnly= true;
				document.getElementById('txtFireAmountPayable').readOnly= true;
				document.getElementById('txtPublicHealthPayable').readOnly= true;
				document.getElementById('txtAnyOtherPayable').readOnly= true;
				document.getElementById('txtAmountPayableSBP').readOnly= true;
				document.getElementById('txtSbp').value= data.sbp;
				document.getElementById('txtBrn').value=data.brn;
				document.getElementById('txtMobileNo').value=data.mobileNumber;					
				document.getElementById('txtEmailAdd').value=data.emailAdd;
				document.getElementById('txtCategoryCode').value=data.categoryCode;
				document.getElementById('txtSubCatCode').value=data.subCatCode;
				document.getElementById('txtDescription').value=data.description;
				document.getElementById('txtNoOfEmp').value=data.noOfEmp;
				document.getElementById('txtSubCountySBP').value=data.subCounty;
				document.getElementById('txtWardSBP').value=data.ward;
				document.getElementById('txtBusinessNameSBP').value=data.businessName;
				document.getElementById('txtPhyAdd').value=data.phyAdd;
				document.getElementById('txtLrNumberSBP').value=data.lrNumber;	
				document.getElementById('txtBpa').value=data.bpa;	
				document.getElementById('txtUpnSBP').value=data.upn;
				document.getElementById('txtSBPAmountPayable').value=data.sbpAmountPayable;
				document.getElementById('txtSolidWasteConservancyPayable').value=data.solidWasteConservancyPayable;	
				document.getElementById('txtFireAmountPayable').value=data.fireAmountPayable;	
				document.getElementById('txtPublicHealthPayable').value=data.publicHealthPayable;
				document.getElementById('txtAnyOtherPayable').value=data.anyOtherPayable;
				var amountPayable=data.sbpAmountPayable+data.publicHealthPayable+data.anyOtherPayable+data.solidWasteConservancyPayable+data.fireAmountPayable;
				//document.getElementById('txtAmountPayableSBP').value=data.amountPayable;	
				document.getElementById('txtAmountPayableSBP').value=amountPayable;	
				document.getElementById('txtTotalAmountPaidCountySBP').value=amountPayable;
			}

		}
		else{
			alert("Invalid "+type+".");
			}
	    }
	});
}

function isContactNoSBP(id) 
{
	var rtnVal=false;
	var testReg=new RegExp('^(?=.*[1-9])\\d*\\.?\\d*$'); 
	rtnVal= testReg.test(document.getElementById(id).value);
	if(document.getElementById(id).value.length<8)
		rtnVal=false;
	return rtnVal;	 
}

function emailError()
{
	alert ('Please enter correct Email id');
	document.getElementById('txtEmailAdd').value="";
}


function contactError()
{
	alert ('Please enter correct mobile no.');
	document.getElementById('txtMobileNo').value="";
}

