[{
  name: 'AddRequest',
  method: 'POST',
  api: 'customers',
  resource: 'customerRequests',
  json: '/customers/AddRequest.json'
},
{
  name: 'GetCustomer',
  method: 'GET',
  api: 'customers',
  json: '/customers/GetCustomer.json',
  resource: ''
},
{
  name: 'GetCustomerByParams',
  method: 'GET',
  api: 'customers',
  resource: ''
},
{
  name: 'PatchCustomer',
  method: 'PATCH',
  api: 'customers',
  resource: ''
},
{

  name: 'GetAccounts',
  method: 'GET',
  api: 'accounts',
  json: '/accounts/GetAccounts.json',

  resource: ''
},
{
  name: 'GetAccountBalance',
  method: 'GET',
  api: 'accounts',
  json: '/accounts/GetAccounts.json',
  resource: 'balance'
},
{
  name: 'GetAccount',
  method: 'GET',
  api: 'accounts',
  json: '/accounts/GetAccount.json',
  resource: ''
},
{
  name: 'GetServices',
  method: 'GET',
  api: 'accounts',
  json: '/accounts/GetServices.json',
  resource: 'services'
},
{
  name: 'GetDetailServices',
  method: 'GET',
  api: 'accounts',
  json: '/accounts/GetDetailServices.json',
  resource: 'additionalData'
},
{

  name: 'GetSelfReads',
  method: 'GET',
  api: 'accounts',
  json: '/accounts/GetSelfReads.json',

  resource: 'selfReads'
},
{
  name: 'GetSelfReadsAvaliable',
  method: 'GET',
  api: 'accounts',
  json: '/accounts/GetSelfReadsAvaliable.json',
  resource: 'selfReadsAvailable'
},
{
  name: 'GetSelfReadPeriod',
  method: 'GET',
  api: 'selfReadsPeriod',
  resource: ''
},
{
  name: 'PostSelfRead',
  method: 'POST',
  api: 'accounts',
  json: '/EmptyJSON.json',
  resource: 'selfReads'
},
{
  name: 'PutBillsPaperLess',
  method: 'PUT',
  api: 'accounts',
  json: '/EmptyJSON.json',
  resource: 'billsPaperLess'
},
{

  name: 'DeletetBillsPaperLess',
  method: 'POST',
  api: 'accounts',
  json: '/EmptyJSON.json',

  resource: 'billsPaperLess'
},
{
  name: 'GetBillPaperLess',
  method: 'GET',
  api: 'accounts',
  resource: 'billsPaperLess',
  json: '/accounts/GetBillPaperLess.json'
},
{
  name: 'GetDocuments',
  method: 'GET',
  api: 'accounts',
  json: '/accounts/GetDocuments.json',
  resource: 'documents'
},
{
  name: 'GetRecharge',
  method: 'GET',
  api: {
    qa: 'accountServices',
    prod: 'services'
  },
  json: '/services/GetRecharge.json',
  resource: 'recharges'
},
{
  name: 'GetBills',
  method: 'GET',
  api: {
    qa: 'accountServices',
    prod: 'services'
  },
  json: '/services/GetBills.json',
  resource: 'bills'
},

{
  name: 'GetDMSBill',
  method: 'GET',
  api: 'pdfbill',
  resource: '',
  integration: !0, integrationApi: 'service/pdfbill'
},
{
  name: 'GetConsumption',
  method: 'GET',
  api: {
    qa: 'accountServices',
    prod: 'services'
  },
  json: '/services/GetConsumption.json',
  resource: 'usages'
},
{
  name: 'GetMeters',
  method: 'GET',
  api: {
    qa: 'accountServices',
    prod: 'services'
  },
  json: '/services/GetMeters.json',
  resource: 'meters'
},
{
  name: 'GetTypeC',
  method: 'GET',
  api: {
    qa: 'accountServices',
    prod: 'services'
  },
  json: '/services/GetTypeC.json',
  resource: 'usageTypes'
},
{

  name: 'GetEntries',

  method: 'GET',
  api: 'accounts',
  resource: 'entries'
},
{
  name: 'GetAgreement',
  method: 'GET',
  api: 'accounts',
  json: '/accounts/GetAgreement.json',
  resource: 'agreement'
},
{
  name: 'PutselfReader',
  method: 'PUT',
  api: 'sectorSupplies',
  json: '/EmptyJSON.json',
  resource: 'selfReader'
},
{
  name: 'DeleteselfReader',
  method: 'POST',
  api: 'sectorSupplies',
  json: '/EmptyJSON.json',
  resource: 'selfReader'
},
{
  name: 'sectorSupplies',
  method: 'GET',
  api: 'sectorSupplies',
  json: '/sectorSupplies/sectorSupplies.json',
  resource: ''
},
{

  name: 'GetListData',
  method: 'GET',

  api: 'listData',
  json: '/listData/GetListData.json',
  resource: ''
},
{
  name: 'Register',
  method: 'POST',
  api: 'users',
  json: '/EmptyJSON.json',
  resource: ''
},
{
  name: 'Login',
  method: 'PATCH',
  api: 'users',
  json: '/users/Login.json',
  resource: 'login'
},
{
  name: 'ChangePassword',
  method: 'PATCH',
  api: 'users',
  json: '/EmptyJSON.json',
  resource: 'password'
},
{
  name: 'ForgetPassword',
  method: 'GET',
  api: 'users',
  json: '/EmptyJSON.json',
  resource: 'password'
},
{
  name: 'GetModernToken',
  method: 'POST',
  json: '/token/GetModernToken.json',
  api: 'token',
  resource: ''
},

{
  name: 'GetBill',
  method: 'GET',
  api: 'documents',
  resource: 'pdf',
  json: '/documents/GetBill.pdf'
},
{
  name: 'GetMovements',
  method: 'GET',
  api: 'accounts',
  resource: 'entriesSummary'
},
{
  name: 'QuestionAndSuggestion',
  method: 'POST',
  api: 'rccs',
  json: '/EmptyJSON.json',
  resource: 'suggestion'
},
{
  name: 'QuestionAndSuggestionList',
  method: 'GET',
  api: 'rccs',
  json: '/rccs/QuestionAndSuggestionList.json',
  resource: ''
},
{
  name: 'NewClaim',
  method: 'POST',
  json: '/rccs/NewClaim.json',
  api: 'rccs',
  resource: 'complaint'
},
{

  name: 'NewQuestion',
  method: 'POST',

  api: 'rccs',
  json: '/rccs/NewQuestion.json',
  resource: 'question'
},
{
  name: 'EditPersonalData',
  method: 'PATCH',
  api: 'customers',
  resource: '',
  json: '/EmptyJSON.json'
},
{
  name: 'GetStreets',
  method: 'GET',
  json: '/streets/GetStreets.json',
  api: 'streets',
  resource: ''
},
{
  name: 'RequestContract',
  method: 'POST',
  json: '/serviceRequests/RequestContract.json',
  api: 'serviceRequests',
  resource: ''
},
{
  name: 'CheckContract',
  method: 'GET',
  json: '/sectorSupplies/CheckContract.json',
  api: 'sectorSupplies',
  resource: ''
},
{

  name: 'GetSupplyAddress',
  method: 'GET',

  api: 'accounts',
  resource: ''
},
{
  name: 'GetSupply',
  method: 'GET',
  json: '/supplies/GetSupply.json',
  api: 'supplies',
  resource: ''
},
{
  name: 'GetSectorSupplies',
  method: 'GET',
  json: '/supplies/GetSectorSupplies.json',
  api: 'supplies',
  resource: 'sectorSupplies'
},
{
  name: 'GetAccountSectorSupplies',
  method: 'GET',
  api: 'sectorSupplies',
  resource: ''
},
{
  name: 'GetContractible',
  method: 'GET',
  api: 'supplies',
  resource: 'contractible'
},
{
  name: 'NewWorkRequest',
  method: 'POST',
  api: 'workRequests',
  resource: ''
},
{

  name: 'UploadWorkRequestDocs',
  method: 'POST',

  api: 'workRequests',
  resource: 'doc'
},
{
  name: 'GetWorkRequests',
  method: 'GET',
  api: 'workRequests',
  json: '/workRequests/GetWorkRequests.json',
  resource: ''
},
{
  name: 'GetWortRequestAttributes',
  method: 'GET',
  api: 'attributes',
  resource: ''
},
{
  name: 'UploadServiceRequestDocs',
  method: 'POST',
  json: '/EmptyJSON.json',
  api: 'serviceRequests',
  resource: 'doc'
},
{
  name: 'GetServiceRequest',
  method: 'GET',
  api: 'serviceRequests',
  json: '/serviceRequests/GetServiceRequest.json',
  resource: ''
},
{

  name: 'GetOutages',
  method: 'GET',
  api: 'outage',
  json: '/outage/outage.json',

  resource: 'all',
  integration: !0, integrationApi: 'service/outage'
},
{
  name: 'GetNewOutageListData',
  method: 'GET',
  api: 'outage',
  json: '/outage/outage.json',
  resource: 'new',
  integration: !0, integrationApi: 'service/outage'
},
{
  name: 'PostNewOutage',
  method: 'POST',
  api: 'outage',
  json: '/outage/outage.json',
  resource: 'new',
  integration: !0, integrationApi: 'service/outage'
},
{
  name: 'GetShutDowns',
  method: 'GET',
  api: 'shutdown',
  json: '/outage/shutdown.json',
  resource: '',
  integration: !0
},
{

  name: 'PayByMpesa',
  method: 'POST',
  api: 'paybympesa',

  resource: '',
  integration: !0
},
{
  name: 'GetPrePaymentRecharges',
  method: 'GET',
  api: 'prePaymentRecharges',
  json: '/services/GetPrePaymentRecharges.json',
  resource: ''
},
{
  name: 'GetImportantTips',
  method: 'GET',
  api: 'tipsInformation',
  json: '/tips/ImportantTips.json',
  resource: ''
},
{
  name: 'GetJuaForSureContractor',
  method: 'GET',
  api: 'juaforsure',
  json: '/juaforsure/contractorService.json',
  resource: 'juaforsureContractor',
  integration: !0, integrationApi: 'services'
},
{

  name: 'GetJuaForSureKPLC',
  method: 'GET',
  api: 'juaforsure',
  json: '/juaforsure/kplcJuaService.json',

  resource: 'juaforsureKplc',
  integration: !0, integrationApi: 'services'
},
{
  name: 'GetMedicalBeneficiary',
  method: 'GET',
  api: 'juaforsure',
  json: '/juaforsure/medicalBalanceService.json',
  resource: 'getMedicalBeneficiary',
  integration: !0, integrationApi: 'services'
},
{
  name: 'GetMedicalBalance',
  method: 'GET',
  api: 'juaforsure',
  json: '/juaforsure/beneficiariesService.json',
  resource: 'getMedicalBalance',
  integration: !0, integrationApi: 'services'
},
{
  name: 'GetNotifications',
  method: 'GET',
  api: 'notifications',
  resource: ''
},
{

  name: 'SetNotificationsReading',

  method: 'PUT',
  api: 'notifications',
  resource: 'setNotificationsReading'
},
{
  name: 'GetNotificationsTypeByAccount',
  method: 'GET',
  api: 'notificationsTypeList',
  resource: ''
},
{
  name: 'SetModiftNotifications',
  method: 'POST',
  api: 'notificationsTypeList',
  resource: ''
},
{
  name: 'SearchByMeterOrAccount',
  method: 'GET',
  api: 'publicData',
  resource: 'newContractList'
},
{
  name: 'GetAccountByMeterNumber',
  method: 'GET',
  api: 'publicData',
  resource: 'accountReference'
},
{

  name: 'GetTariffs',
  method: 'GET',
  api: 'calculator',
  json: '/billCalculator/GetTarrifs.json',

  resource: 'tariffs'
},
{
  name: 'GetSSTariffs',
  method: 'GET',
  api: 'sscalculator',
  json: '/billCalculator/GetTarrifs.json',
  resource: 'sstarifs',
  integration: !0, integrationApi: 'service/sscalculator'
},
{
  name: 'GetConsumptionTypes',
  method: 'GET',
  api: 'calculator',
  json: '/billCalculator/GetConsumptionTypes.json',
  resource: 'consumptionTypes'
},
{
  name: 'PostBillCalculator',
  method: 'POST',
  api: 'calculator',
  json: '/billCalculator/PostBillCalculatorResults.json',
  resource: ''
},
{

  name: 'GetWHTCerts',
  method: 'GET',
  api: 'rccs',
  json: '/wht/GetWHTCertList.json',

  resource: 'whtcertificateList'
},
{
  name: 'GetWHTCertBills',
  method: 'GET',
  api: 'rccs',
  json: '/wht/GetWHTCertAssociatedBills.json',
  resource: 'whtcertificateList/bills'
},
{
  name: 'GetWHTRequests',
  method: 'GET',
  api: 'rccs',
  json: '/wht/GetWHTCertAssociatedBills.json',
  resource: 'whtcertificateRequested'
},
{
  name: 'SubmitWHTCert',
  method: 'POST',
  api: 'rccs',
  json: '/wht/GetWHTCertAssociatedBills.json',
  resource: 'whtcertificate'
},
{

  name: 'SubmitWHTCertDocument',
  method: 'POST',
  api: 'whtcertificate',
  json: '/wht/GetWHTCertAssociatedBills.json',

  resource: 'doc'
},
{
  name: 'GetCorporateAccounts',
  method: 'GET',
  api: 'corporateAccounts',
  json: '/accounts/GetCorporateAccounts.json',
  resource: ''
},
{
  name: 'GetCorporateLinkedAccounts',
  method: 'GET',
  api: 'corporateAccounts',
  json: '/accounts/GetCorporateAccounts.json',
  resource: 'linkedAccounts'
},
{
  name: 'GetCorporateHistoryLinkedAccounts',
  method: 'GET',
  api: 'corporateAccounts',
  json: '/accounts/GetCorporateAccounts.json',
  resource: 'linkedHistoricAccounts'
},
{

  name: 'GetCorporateSummaryLetters',
  method: 'GET',
  api: 'corporateAccounts',

  json: '/accounts/summaryLetters.json',
  resource: 'summaryLetters'
},
{
  name: 'GetCorporateSummaryLetterDocuments',
  method: 'GET',
  api: 'summaryLetters',
  json: '/accounts/GetCorporateSummaryLetterDocuments.json',
  resource: 'documents'
},
{
  name: 'GetCorporateSummaryLetterXls',
  method: 'GET',
  api: 'corporateAccounts/summaryLetters/xls',
  json: '/accounts/GetCorporateSummaryLetterDocuments.json',
  resource: ''
},
{

  name: 'GetCorporateSummaryLetterPdf',
  method: 'GET',
  api: 'corporateAccounts',
  json: '/accounts/GetCorporateSummaryLetterDocuments.json',

  resource: 'summaryLetters/pdf'
},
{
  name: 'GetCorporateSummaryLetterTxt',
  method: 'GET',
  api: 'corporateAccounts/summaryLetters/txt',
  json: '/accounts/GetCorporateSummaryLetterDocuments.json',
  resource: ''
},
{
  name: 'SendSelfReadPhoto',
  method: 'POST',
  api: 'selfReads',
  resource: 'loadPhoto'
},
{
  name: 'SSRegistration',
  method: 'POST',
  api: 'selfService',
  resource: 'registerSelfserviceUser',
  integration: !0, integrationApi: 'services',
  rawResponse: !0
},
{

  name: 'TenantRegistration',
  method: 'POST',
  api: '',
  resource: 'registerSelfserviceUser',

  integration: !0
},
{
  name: 'TenantLogin',
  method: 'POST',
  api: 'tenant',
  resource: 'login',
  integration: !0
},
{
  name: 'TenantChangePassword',
  method: 'POST',
  api: 'tenant',
  resource: 'changepassword',
  integration: !0
},
{
  name: 'AddNewAccount',
  method: 'POST',
  api: 'selfService',
  resource: 'addNewAccount',
  integration: !0, integrationApi: 'services'
},
{
  name: 'GetSSAccounts',
  method: 'GET',
  api: 'selfService',
  resource: 'ssAccounts',
  integration: !0, integrationApi: 'services'
},
{

  name: 'RemoveSelfServiceAccount',
  method: 'POST',
  api: 'selfService',
  resource: 'removeSSAccount',

  integration: !0, integrationApi: 'services'
},
{
  name: 'GetSelfServiceAccountDetails',
  method: 'GET',
  api: 'selfService',
  resource: 'ssUserTenant',
  integration: !0, integrationApi: 'services'
},
{
  name: 'SaveSelfServiceAccountDetails',
  method: 'POST',
  api: 'selfService',
  resource: 'ssUserTenant',
  integration: !0, integrationApi: 'services'
},
{
  name: 'SendVerificationCode',
  method: 'POST',
  api: 'selfService',
  resource: 'sendVerificationCode',
  integration: !0, integrationApi: 'services'
},
{

  name: 'GetSelfServiceExistingUser',
  method: 'GET',
  api: 'selfService',

  resource: 'existingInCMSUser',
  integration: !0, integrationApi: 'services'
},
{
  name: 'AccountBalance',
  method: 'GET',
  api: 'accountBalance',
  resource: ''
},
{
  name: 'AccountBalancePdf',
  method: 'GET',
  api: 'balancePdf',
  resource: '',
  integration: !0
},
{
  name: 'GetNewSupplyForm',
  method: 'PATCH',
  api: 'workRequestForms',
  resource: 'newSupply',
  integration: !0, rawResponse: !0
},
{
  name: 'GetSelfReaderTenants',
  method: 'POST',
  api: 'selfReads',
  resource: 'selfReaderTenants'
}]