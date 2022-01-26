function parseBool(value, defaultValue) {
  return (value == 'true' || value == 'false' || value === true || value === false) && JSON.parse(value) || defaultValue;
}
var campaignIds = {
'default': "61eea7ddf6b22f00013ff769",
}
var cookieDomain = ""
var cookieDuration = parseInt("30") || 30
var registerViewOncePerSession = parseBool("false", false)
var lastPaidClickAttribution = false
var firstClickAttribution = false
var attribution = "lastpaid"
if (attribution === 'lastpaid') {
  lastPaidClickAttribution = true
}
else if (attribution === 'firstclick')  {
  lastPaidClickAttribution = false
  firstClickAttribution = true
}
else if (attribution === 'lastclick')  {
  lastPaidClickAttribution = false
  firstClickAttribution = false
}

var ourCookie = getCookie('rtkclickid-store')

var rtkClickID;
function removeParam(key, sourceURL) {
var rtn = sourceURL.split("?")[0],
param, params_arr = [],
queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
if (queryString !== "") {
    params_arr = queryString.split("&");
    for (var i = params_arr.length - 1; i >= 0; i -= 1) {
        param = params_arr[i].split("=")[0];
        if (param === key) {
            params_arr.splice(i, 1);
        }
    }
    rtn = rtn + "?" + params_arr.join("&");
}
return rtn;
};
var urlParams = new URLSearchParams(window.location.search);
var locSearch = window.location.search
locSearch = locSearch.substring(1)
var pixelParams = "&" + locSearch
var campaignID = urlParams.get('cmpid')
var souceKey = urlParams.get('tsource');
if (!campaignID) {
campaignID = campaignIds['default']
}
var initialSrc = "https://truely.rdtk.io/"+campaignID+"?format=json";
for (var i = 1; i <= 10; i++) {
initialSrc = removeParam("sub" + i, initialSrc)
};
var rawData;
initialSrc = removeParam("cost", initialSrc);
initialSrc = removeParam("ref_id", initialSrc);
var replaceLink = function(match, offset, string) {
var nextSymbol = string.charAt(offset+ match.length)
var nextSymbol2 = string.charAt(offset+ match.length+1)
nextSymbol = parseInt(nextSymbol)
nextSymbol2 = parseInt(nextSymbol2)
if (!isNaN(nextSymbol) && !isNaN(nextSymbol2)) {
  return "https://truely.rdtk.io/click/"+nextSymbol+nextSymbol2+"?clickid="+rtkClickID+"&"
}
else if (!isNaN(nextSymbol)) {
  return "https://truely.rdtk.io/click/"+nextSymbol+"?clickid="+rtkClickID+"&"
}
else {
  return "https://truely.rdtk.io/click?clickid="+rtkClickID+"&"
}
}
if (!urlParams.get('rtkcid')) {
rtkxhr = new XMLHttpRequest;
rtkxhr.onreadystatechange = function() {
    if (rtkxhr.readyState == 4 && rtkxhr.status == 200) {
        rawData = JSON.parse(rtkxhr.responseText);
        rtkClickID = rawData.clickid;
        setSessionClickID();
        if (ourCookie === null || ourCookie === undefined || ourCookie === 'undefined' || !firstClickAttribution) {
            setCookie();
          }
          if(document.getElementsByTagName("body")[0].innerHTML.indexOf("https://truely.rdtk.io/click/") > -1){
        document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML.replace(/https:\/\/truely.rdtk.io\/click\/?/g, replaceLink);
      }
      else {
        document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML.replace(/https:\/\/truely.rdtk.io\/click/g, replaceLink);
      }
        rtkxhrr = new XMLHttpRequest;
        if(sessionStorage.getItem('viewOnce') !== 1) {
            rtkxhrr.open("GET", "https://truely.rdtk.io/view?clickid="+rawData.clickid)
            rtkxhrr.send();
        }
        if (registerViewOncePerSession) {
            sessionStorage.setItem('viewOnce', '1')
        }
    }
}
if (!sessionStorage.getItem('rtkclickid')) {
   rtkxhr.open("GET", initialSrc+pixelParams);
   rtkxhr.send();
}
else {
    rtkClickID = sessionStorage.getItem('rtkclickid')
    if (ourCookie === null || ourCookie === undefined || ourCookie === 'undefined' || !firstClickAttribution) {
        setCookie();
      }
      if(document.getElementsByTagName("body")[0].innerHTML.indexOf("https://truely.rdtk.io/click/") > -1){
          document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML.replace(/https:\/\/truely.rdtk.io\/click\/?/g, replaceLink);
      }
      else {
          document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML.replace(/https:\/\/truely.rdtk.io\/click/g, replaceLink);
      }
    rtkxhrr = new XMLHttpRequest;
    if(sessionStorage.getItem('viewOnce') !== 1) {
        rtkxhrr.open("GET", "https://truely.rdtk.io/view?clickid="+rtkClickID)
        rtkxhrr.send();
    }
    if (registerViewOncePerSession) {
        sessionStorage.setItem('viewOnce', '1')
    }
}
}
else {
rtkClickID = urlParams.get('rtkcid')
if (ourCookie === null || ourCookie === undefined || ourCookie === 'undefined') {
    setCookie();
}
xhrTrack = new XMLHttpRequest;
if(sessionStorage.getItem('viewOnce') !== 1) {
    xhrTrack.open("GET", "https://truely.rdtk.io/view?clickid="+rtkClickID )
    xhrTrack.send();
}
if (registerViewOncePerSession) {
    sessionStorage.setItem('viewOnce', '1')
  }
  if(document.getElementsByTagName("body")[0].innerHTML.indexOf("https://truely.rdtk.io/click/") > -1){
      document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML.replace(/https:\/\/truely.rdtk.io\/click\/?/g, replaceLink);
  }
  else {
      document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML.replace(/https:\/\/truely.rdtk.io\/click/g, replaceLink);
  }
setSessionClickID()
}
function setCookie(){
  var cookieName = "rtkclickid-store", cookieValue = rtkClickID ,expirationTime = 86400 * cookieDuration * 1000,
  date = new Date(), dateTimeNow = date.getTime();
  date.setTime(dateTimeNow + expirationTime); var date = date.toUTCString();
 document.cookie = cookieName+"="+cookieValue+"; expires="+date+"; path=/; domain=" + cookieDomain
}
function setSessionClickID() {
  sessionStorage.setItem('rtkclickid', rtkClickID);
}
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
