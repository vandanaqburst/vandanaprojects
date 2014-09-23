var open = false;
var xmlhttp;
var DEBUG = false; 
 var global_associationid = ' '
  var global_associationid = getCookie("AssociationID");
if (DEBUG == false) {
    if (ReadCookie('SessionGUID') == null) {
        if (window.location.href != login) {
            window.location = login;
        }
    }
}
var ERROR_INVALID_LOGIN = 'the information that was entered does not match what is on file. please try again.  if you continue to have problems, please contact NCGA or your State Association.';
var ERROR_NO_RECORDS_FOUND = 'no records were found';
var EXPIREDAYS = 1

var LOADING ='<span class="err" id="loading">   <i class="icon-refresh icon-spin"></i> loading...</span> '
var SearchBookmark = 0;
var SearchMaxBookmark = 0;

function hidestatus() {
    window.status = 'Welcome to NCGA Membership Online Portal'
    return true
}

if (document.layers)
    document.captureEvents(Event.MOUSEOVER | Event.MOUSEOUT)

document.onmouseover = hidestatus
document.onmouseout = hidestatus

function CloseSidePanel() {
    $('#page').animate({ left: '0px' }, 0)
    $('.appBody').css({ "overflow": "auto" });
    $('#sdPnl').hide();
}
function OpenSidePanel() {
    $('#page').animate({ left: '200px' }, 0)
    $('.appBody').css({ "overflow": "hidden" });
    $('#sdPnl').show();
}
function ToggleSidePanel() {
    if (open) {
        open = false;
        CloseSidePanel();
    }
    else {
        open = true;
        OpenSidePanel();
    }

}
 
 

//Dynamically assign height
function sizeContent() {
    //var newHeight = $("html").height() - $("#header").height() - $("#footer").height() + "px";

    var newHeight = $(document).height();
    if (newHeight > 0) {
        $("#sdPnl").css("height", newHeight);
    }
    else {
        newHeight=400;
        $("#sdPnl").css("height", newHeight);
    }
}

//BUILD  Layout------------------------------ 
function BuildSideMenuButton() {
    document.write('<div class="mnubt">');
    document.write('<a class="bt" style="text-decoration:none;" id="btlftMnu"  onClick="ToggleSidePanel()"><i class="icon-reorder"></i> MENU </a>');
    document.write('</div>');
}
function BuildHeader() {
    document.write('<div id="header"  class="brdr" >');
   // document.write('<span class="fnt28" style="display:inline;margin-left:10px;">Welcome to CAMMS  </span>');
    //<span id="fnt18" style="margin-left:10px;width:100%;" > your online membership management portal</span>            
    document.write('<div class="logo"  > ');
    document.write(' <img onclick="NavToHome();" src="Shared/shared/Images/NCGA.Corn.logo.png" class="smlLogo"/>');
   document.write(' </div>');
   document.write(' </div>');
   $('#divBackground').hide();

}
function BuildFooter() {
    document.write('<div id="footer" class="brdr"> </div>');
}
function BuildLoadingArea() {
    document.write('<div  id="divLoading"  class="loading"></div><div id="divForeground" class="center" style="z-index:10;"></div>');
    $('#divLoading').hide();
    $('#divForeground').hide();
}
function BuildSideMenu() {
    document.write('<div id="sdPnl"  class="brdr"> <!--the hidden panel &#9776;-->');
    document.write('<div   > <!--the hidden panel -->');
    document.write('<div id="sdCntnt" >');
    document.write('<ul >  ');

    document.write('<li class="brdr"> <i class=\"icon-home\" ></i> Home</li> ');
    document.write('<li  class="brdr"> <i class=\"icon-search\" ></i> Search</li> ');
    document.write('<li  class="brdr"> <i class=\"icon-plus\" ></i>  New Membership</li> ');
    document.write('<li  class="brdr"> <i class=\"icon-repeat\" ></i> Renewal</li> ');
    document.write('<li  class="brdr"> <i class=\"icon-bar-chart\" ></i> Reports</li> ');
    document.write('<li  class="brdr"> <i class=\"icon-group\" ></i> Committees</li> ');
    document.write('<li  class="brdr"> <i class=\"icon-key\" ></i> Admin</li> ');
    document.write('</ul >  ');

    document.write('</div>	');
    document.write('</div>	');
    document.write('</div>');
    $('#sdPnl').hide();
    $('.appBody').css({ "overflow": "auto" });
    sizeContent();


}
function ShowBackGround() {
    $('body').css({ "background-color": "#EFEFEF" });

    $('#divLoading').hide();
    $('#divForeground').hide();
    $('#divBackground').show();
}
 

function WelcomePage()
{
    var anchor ='<a onclick="ShowBackGround()" style="word-wrap: break-word;font-weight: normal;color: #003300; font-variant:none;text-decoration: none;cursor: hand; cursor: pointer; ">';
    var htmlCode = anchor + '<img src="Shared/shared/Images/NCGA.Corn.logo.sml.png" style="margin-top:20%" /></a><br />';
    htmlCode = htmlCode + anchor + '<span id="processNotes"  style="font-size: 28px; ">Welcome to the Online Membership Management</span></a> ';
    htmlCode = htmlCode + anchor + '<br/><span id="processNotes" ">managed by National Corn Grower Association</span></a> ';
    loadWaiting(htmlCode);
    setTimeout("ShowBackGround()", 2000);

}
function loading(message) {
    var htmlCode = '<img src="Shared/shared/Images/NCGA.Corn.logo.sml.png" style="margin-top:20%" /><br />';
    htmlCode = htmlCode + LOADING + ' &nbsp;<span id="processNotes"  style="font-size: 13px;color: #003300;word-wrap: break-word;">' + message + '</span> ';
    loadWaiting(htmlCode);
}
function loadingWithLink(header, message) {
    var anchor = ' <a onclick="ShowBackGround()" style="margin-top:20%;word-wrap: break-word;font-weight: normal;color: #003300; font-variant:none;text-decoration: none;cursor: hand; cursor: pointer; ">';
    var htmlCode = '';
    htmlCode = htmlCode + anchor + '<span id="processNotes"  style="font-size: 20px;font-weight: bold; ">' + header + '</span></a> ';
    htmlCode = htmlCode + anchor + '<br/><span style="font-size: 15px; " ">' + message + '</span></a> ';
    htmlCode = htmlCode + anchor + '<br/><span style="font-size: 15px; " "> click here to continue</span></a> ';
    loadWaiting(htmlCode);
}

function loadWaiting(htmlCode)
{
    //alert("Loading");
    $('#divLoading').show();
    $('#divForeground').show();
    document.getElementById("divForeground").innerHTML = htmlCode;
    //$('body').css({ "background-color": "#CCCC00" });
    $('body').css({ "background-color": "#FFFFFF" });

    $('#divBackground').hide();
}

//END BUILD  Layout------------------------------

//SYSTEM METHODS
function InitializeRequest(packet) {
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //Send the proper header information along with the request
    xmlhttp.setRequestHeader("Content-length", packet.length);
    xmlhttp.setRequestHeader("Connection", "close");

}
function CleanJson(result) {
   // result = result.replace('<br/>', '');
    return result;
}
function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}
function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}
function ReadCookie(key) {
    return getCookie(key);
}
function loadCookie(key, value) {
    setCookie(key, value, EXPIREDAYS);
}
//SYSTEM METHODS

//MEMBER SEARCH----------------------------------
function BuildAuthenticationString(login) {
    var auth = "auth=yes";
    if (login == true) {
        auth = "auth=login"
    }
    else {
        auth = "auth=@UserUID|" + ReadCookie('UserID') + "~@SessionGUID|" + ReadCookie('SessionGUID') + "~@SessionID|" + ReadCookie('SessionID');
    }
    return auth;
}
function deleteCookies() {
    var empty = null;
    loadCookie('UserName', empty);
    loadCookie('First Name', empty);
    loadCookie('Last Name', empty);
    loadCookie('AssociationID', empty);
    loadCookie('UserID', empty);
    loadCookie('SessionGUID', empty);
    loadCookie('SessionID', empty);
    loadCookie('searchCriteria', empty);
}
function Authenticate() {
    deleteCookies();
    loading("Authenticating user information..");
    var packet = BuildAuthenticationString(true) + "&act=login&pak=@UserUID|0~@UserID|" + $("#username").val() + "~@Password|" + $("#password").val() + "";
    InitializeRequest( packet);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var result = CleanJson(xmlhttp.responseText);
            if (result == "99") {
                var output = ERROR_INVALID_LOGIN;
//                document.getElementById("err").innerHTML = output;
                loadingWithLink("Error Message", output);
            }
            else{
                var obj = jQuery.parseJSON(result);
                var output = obj.aaData[0].FirstName;
                window.localStorage.clear();
                
                loadCookie('UserName', obj.aaData[0].UserID);
                loadCookie('First Name', obj.aaData[0].FirstName);
                loadCookie('Last Name', obj.aaData[0].LastName);
                loadCookie('AssociationID', obj.aaData[0].AssociationID);
                loadCookie('UserID', obj.aaData[0].UserUID);
                loadCookie('SessionGUID', obj.aaData[0].SessionGUID);
                loadCookie('SessionID', obj.aaData[0].SessionID);

                window.location.replace("Home.html");
            }
            //output += result.UserName + ' : ' + result.Password + "<br/>";
        }
    }
    xmlhttp.send(packet)
}
//-----------------------------------------------
//MEMBER SEARCH----------------------------------

function BuildSearch() {

    document.write('<div class="srch"  > ');
    document.write('<div class="input-prepend" style="text-align:center;">');
    document.write('<span class="add-on"><i class="icon-search"></i></span>');
    document.write('<input name="topsearch" type="text"  placeholder="search..."   id="topsearch" title="search memberid, name, buiness or email"   />');
   // document.write('<a class="bt bgPrimary smlFont" style="text-decoration:none;" onclick="SetBookmark(0);TopMemberSearch();"> Search </a>');

    document.write('</div>');

    document.write('</div>');
    $("#topsearch").keyup(function (event) {
        if (event.keyCode == 13) {
            TopMemberSearch(0);
        }
    });

}
function ShowSubSection(section) {
    loadingWithLink("Section", "Loading " + section);
}