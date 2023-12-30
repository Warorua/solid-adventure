var FiltersEnabled = 0; // if your not going to use transitions or filters in any of the tips set this to 0
var spacer="&nbsp; &nbsp; &nbsp; ";

// email notifications to admin
notifyAdminNewMembers0Tip=["", spacer+"No email notifications to admin."];
notifyAdminNewMembers1Tip=["", spacer+"Notify admin only when a new member is waiting for approval."];
notifyAdminNewMembers2Tip=["", spacer+"Notify admin for all new sign-ups."];

// visitorSignup
visitorSignup0Tip=["", spacer+"If this option is selected, visitors will not be able to join this group unless the admin manually moves them to this group from the admin area."];
visitorSignup1Tip=["", spacer+"If this option is selected, visitors can join this group but will not be able to sign in unless the admin approves them from the admin area."];
visitorSignup2Tip=["", spacer+"If this option is selected, visitors can join this group and will be able to sign in instantly with no need for admin approval."];

// bypass table
bypass_addTip=["",spacer+"This option allows all members of the group to add records to the 'Bypass' table. A member who adds a record to the table becomes the 'owner' of that record."];

bypass_view0Tip=["",spacer+"This option prohibits all members of the group from viewing any record in the 'Bypass' table."];
bypass_view1Tip=["",spacer+"This option allows each member of the group to view only his own records in the 'Bypass' table."];
bypass_view2Tip=["",spacer+"This option allows each member of the group to view any record owned by any member of the group in the 'Bypass' table."];
bypass_view3Tip=["",spacer+"This option allows each member of the group to view all records in the 'Bypass' table."];

bypass_edit0Tip=["",spacer+"This option prohibits all members of the group from modifying any record in the 'Bypass' table."];
bypass_edit1Tip=["",spacer+"This option allows each member of the group to edit only his own records in the 'Bypass' table."];
bypass_edit2Tip=["",spacer+"This option allows each member of the group to edit any record owned by any member of the group in the 'Bypass' table."];
bypass_edit3Tip=["",spacer+"This option allows each member of the group to edit any records in the 'Bypass' table, regardless of their owner."];

bypass_delete0Tip=["",spacer+"This option prohibits all members of the group from deleting any record in the 'Bypass' table."];
bypass_delete1Tip=["",spacer+"This option allows each member of the group to delete only his own records in the 'Bypass' table."];
bypass_delete2Tip=["",spacer+"This option allows each member of the group to delete any record owned by any member of the group in the 'Bypass' table."];
bypass_delete3Tip=["",spacer+"This option allows each member of the group to delete any records in the 'Bypass' table."];

// clients table
clients_addTip=["",spacer+"This option allows all members of the group to add records to the 'Clients' table. A member who adds a record to the table becomes the 'owner' of that record."];

clients_view0Tip=["",spacer+"This option prohibits all members of the group from viewing any record in the 'Clients' table."];
clients_view1Tip=["",spacer+"This option allows each member of the group to view only his own records in the 'Clients' table."];
clients_view2Tip=["",spacer+"This option allows each member of the group to view any record owned by any member of the group in the 'Clients' table."];
clients_view3Tip=["",spacer+"This option allows each member of the group to view all records in the 'Clients' table."];

clients_edit0Tip=["",spacer+"This option prohibits all members of the group from modifying any record in the 'Clients' table."];
clients_edit1Tip=["",spacer+"This option allows each member of the group to edit only his own records in the 'Clients' table."];
clients_edit2Tip=["",spacer+"This option allows each member of the group to edit any record owned by any member of the group in the 'Clients' table."];
clients_edit3Tip=["",spacer+"This option allows each member of the group to edit any records in the 'Clients' table, regardless of their owner."];

clients_delete0Tip=["",spacer+"This option prohibits all members of the group from deleting any record in the 'Clients' table."];
clients_delete1Tip=["",spacer+"This option allows each member of the group to delete only his own records in the 'Clients' table."];
clients_delete2Tip=["",spacer+"This option allows each member of the group to delete any record owned by any member of the group in the 'Clients' table."];
clients_delete3Tip=["",spacer+"This option allows each member of the group to delete any records in the 'Clients' table."];

// math table
math_addTip=["",spacer+"This option allows all members of the group to add records to the 'Math' table. A member who adds a record to the table becomes the 'owner' of that record."];

math_view0Tip=["",spacer+"This option prohibits all members of the group from viewing any record in the 'Math' table."];
math_view1Tip=["",spacer+"This option allows each member of the group to view only his own records in the 'Math' table."];
math_view2Tip=["",spacer+"This option allows each member of the group to view any record owned by any member of the group in the 'Math' table."];
math_view3Tip=["",spacer+"This option allows each member of the group to view all records in the 'Math' table."];

math_edit0Tip=["",spacer+"This option prohibits all members of the group from modifying any record in the 'Math' table."];
math_edit1Tip=["",spacer+"This option allows each member of the group to edit only his own records in the 'Math' table."];
math_edit2Tip=["",spacer+"This option allows each member of the group to edit any record owned by any member of the group in the 'Math' table."];
math_edit3Tip=["",spacer+"This option allows each member of the group to edit any records in the 'Math' table, regardless of their owner."];

math_delete0Tip=["",spacer+"This option prohibits all members of the group from deleting any record in the 'Math' table."];
math_delete1Tip=["",spacer+"This option allows each member of the group to delete only his own records in the 'Math' table."];
math_delete2Tip=["",spacer+"This option allows each member of the group to delete any record owned by any member of the group in the 'Math' table."];
math_delete3Tip=["",spacer+"This option allows each member of the group to delete any records in the 'Math' table."];

// token table
token_addTip=["",spacer+"This option allows all members of the group to add records to the 'Token' table. A member who adds a record to the table becomes the 'owner' of that record."];

token_view0Tip=["",spacer+"This option prohibits all members of the group from viewing any record in the 'Token' table."];
token_view1Tip=["",spacer+"This option allows each member of the group to view only his own records in the 'Token' table."];
token_view2Tip=["",spacer+"This option allows each member of the group to view any record owned by any member of the group in the 'Token' table."];
token_view3Tip=["",spacer+"This option allows each member of the group to view all records in the 'Token' table."];

token_edit0Tip=["",spacer+"This option prohibits all members of the group from modifying any record in the 'Token' table."];
token_edit1Tip=["",spacer+"This option allows each member of the group to edit only his own records in the 'Token' table."];
token_edit2Tip=["",spacer+"This option allows each member of the group to edit any record owned by any member of the group in the 'Token' table."];
token_edit3Tip=["",spacer+"This option allows each member of the group to edit any records in the 'Token' table, regardless of their owner."];

token_delete0Tip=["",spacer+"This option prohibits all members of the group from deleting any record in the 'Token' table."];
token_delete1Tip=["",spacer+"This option allows each member of the group to delete only his own records in the 'Token' table."];
token_delete2Tip=["",spacer+"This option allows each member of the group to delete any record owned by any member of the group in the 'Token' table."];
token_delete3Tip=["",spacer+"This option allows each member of the group to delete any records in the 'Token' table."];

/*
	Style syntax:
	-------------
	[TitleColor,TextColor,TitleBgColor,TextBgColor,TitleBgImag,TextBgImag,TitleTextAlign,
	TextTextAlign,TitleFontFace,TextFontFace, TipPosition, StickyStyle, TitleFontSize,
	TextFontSize, Width, Height, BorderSize, PadTextArea, CoordinateX , CoordinateY,
	TransitionNumber, TransitionDuration, TransparencyLevel ,ShadowType, ShadowColor]

*/

toolTipStyle=["white","#00008B","#000099","#E6E6FA","","images/helpBg.gif","","","","\"Trebuchet MS\", sans-serif","","","","3",400,"",1,2,10,10,51,1,0,"",""];

applyCssFilter();
