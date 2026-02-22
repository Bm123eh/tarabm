var lastWidth = document.documentElement.clientWidth;

let VideoPlaying = false, VideoFrameDisplay = false;
var WebsiteTest = true;

var today = new Date();
var formattedDate = today.getFullYear().toString().slice(2) +
String(today.getMonth() + 1).padStart(2, '0') +
String(today.getDate()).padStart(2, '0');

var ThisTablet = window.matchMedia( "(min-width: 481px) and (max-width: 800px)" );
var ThisLaptop = window.matchMedia( "(min-width: 801px) and (max-width: 1200px)" );
var ThisDesktop = window.matchMedia( "(min-width: 1201px) and (max-width: 2000px)" );
var ThisTV = window.matchMedia( "(min-width: 2001px) and (max-width: 10000px)" );
var MobileAboveX = window.matchMedia( "(min-width: 801px) and (max-width: 10000px)" );

window.addEventListener('DOMContentLoaded', () => {
startAjax('WebRef', {
method: 'POST',
url: 'PostData.php',
data: {
    RefreshSession: true,
    email: $('#forR02').val(),
    token: $('#forR16').val()
}
})
makeDraggableAll('.WebLogs, .SelectAction');
document.querySelector('.forElem').value = localStorage.getItem('savedElem') || '';
document.querySelector('.forProp').value = localStorage.getItem('savedProp') || '';
/* ADD VISITIORS COUNTS */
let lastDate = localStorage.getItem('lastDate');
let today = new Date().toISOString().split('T')[0];

if (lastDate !== today) {
$.post('PostData.php', { setVisitorCount: true }, function(response) {
if (response === 'success') {
$.post('PostData.php', { getVisitorCount: true }, function(response) {
$('.TVisitors span').text(response);
localStorage.setItem('lastDate', today);
});
}
});
}else{
$.post('PostData.php', { getVisitorCount: true }, function(response) {
$('.TVisitors span').text(response);
localStorage.setItem('lastDate', today);
});
}
/* PRE CLICK COUNT OF HOME */
setActiveNav(0);
triggerClick(0);
fetchVisitorData();

/* ADD INFO IN DATABASE */
setTimeout(function(){
let R17value = document.getElementById("forR17")?.value;
if (R17value && R17value.includes("<")) {
    document.body.insertAdjacentHTML("beforeend", R17value);
}
}, 1000)
/* CHECK ALL PROPERTIES WHEN LOADED */
checkAllProperties();
/* SAVED ALL VALUES */
let savedElem = localStorage.getItem('savedElem')
let savedProp = localStorage.getItem('savedProp')
if (savedElem) document.querySelector('.forElem').value = savedElem;
if (savedProp){
document.querySelector('.forProp').value = savedProp;

$('.SummaryElemProp, .ElemProp input:nth-child(2), .ElemProp nav button:nth-child(2)').show();
$('.ElemProp button:nth-child(1)').text('Show').click();
}
document.documentElement.style.height = `${window.innerHeight}px`;
document.body.style.height = `${window.innerHeight}px`; 
/* HOME SOCIAL MEDIA ACCOUNTS STATS */
SetAndGetSCStats(); 
/* FOUND ON PROFILE.JS */  
SetSMBodyHt();
SetComBodyHt();
ComUserLeft();
}) /* DOM END */
    
var UserStat = localStorage.getItem("UserStat"); 

$('.navs, .Nav6').not('.Nav3').click(function () {
$('.VideoFrameWhiteSpace2, .VideoInfos').hide();   
})
$('.navs').click(function () {
$('.BGBelowNav, .BGAboveNav').slideUp();
})

var myNavSwitch;
var YTabs = false;
$('.Nav1').click(function(){
if(AttrNav.value != "1" || $('.Nav6 button').text() == 'Close'){
setActiveNav(0);
triggerClick(0);
$('.ProTopBTN .CloseBTN').click();
if($('.Nav6 button').text() == 'Close'){
$('.Nav6 button').text('Profile').bg('blue');
}
/* FOUND ON DATABASE.JS */
AjaxAbort();
DisabledNav();
exitAjax();
$('.BodyHandler').css('top', '-100vh');
$('.BodyHandler').eq(0).animate({
    top: '0px',
    'height': '100svh'
}, EnabledNav); 
setTimeout(function(){
AttrNav.value = "1";
}, 10);   
}
if($('#eventYTData').val() == 1){
if(!Theater){
$('.MiniVid').click();    
}
}else{
$('.iFrame, .VideoNav').hide();    
}
});
$('.Nav2').click(function(){
exitAjax();
if(AttrNav.value != "2" || $('.Nav6 button').text() == 'Close'){
setActiveNav(1);
triggerClick(1);
if($('.Nav6 button').text() == 'Close'){
$('.Nav6 button').text('Profile').bg('blue');
}
AjaxAbort();
DisabledNav();
$('.BodyHandler').css('top', '-100vh');
$('.BodyHandler').eq(1).animate({
    top: '0px',
    zIndex: '1',
    height: '100svh'
}, function () {
EnabledNav();
}); 
setTimeout(function(){
AttrNav.value = "2";
}, 10);   
}
if($('#eventYTData').val() == 1){
if(!Theater){
$('.MiniVid').click();    
}
}else{
$('.iFrame, .VideoNav').hide();    
}
});
$('.Nav3').click(function(){
if(AttrNav.value != "3" || $('.Nav6 button').text() == 'Close'){
setActiveNav(2);
triggerClick(2);
$('.ProTopBTN .CloseBTN').click();
if($('.Nav6 button').text() == 'Close'){
$('.Nav6 button').text('Profile').bg('blue');
}
exitAjax();
AjaxAbort();
//AjaxAbort();
DisabledNav();
FetchBlogs();
$('.BodyHandler').css('top', '-100vh');
$('.BodyHandler').eq(2).animate({
    top: '0px',
    zIndex: '1',
    height: '100svh'
}, function (){
EnabledNav();
$('.VideoFrameWhiteSpace2').show();
}); 
setTimeout(function(){
AttrNav.value = "3";
}, 10); 
} 
if(VideoFrameDisplay){
$('.iFrame').show();
$('.VideoNav1').flex();
VideoListTop();
}
if(Theater){
$('.dragDiv').flex();
$('.dragDiv').css('opacity', 1);
setTimeout(function (){
$('.ExpandVid').click();
}, 10);
setTimeout(function (){
$('.dragDiv').hide();
}, 20)
} 
});

$('.Nav4').click(function(){
if(AttrNav.value != "4" || $('.Nav6 button').text() == 'Close'){
setActiveNav(3);
triggerClick(3);
if($('.Nav6 button').text() == 'Close'){
$('.Nav6 button').text('Profile').bg('blue');
}
AjaxAbort();
DisabledNav();
exitAjax();
$('.BodyHandler').css('top', '-100vh');
$('.BodyHandler').eq(3).animate({
    top: '0px',
    zIndex: '1',
    height: '100svh'
}, function () {
EnabledNav();
}).css('overflow', 'scroll'); 
setTimeout(function(){
AttrNav.value = "4";
}, 10);   
}
if($('#eventYTData').val() == 1){
if(!Theater){
$('.MiniVid').click();    
}
}else{
$('.iFrame, .VideoNav').hide();    
}
});
$('.Nav5').click(function(){
AjaxAbort();
if(AttrNav.value != "5" || $('.Nav6 button').text() == 'Close'){
setActiveNav(4);
triggerClick(4);
if($('.Nav6 button').text() == 'Close'){
$('.Nav6 button').text('Profile').bg('blue');
}
DisabledNav();
exitAjax();
$('.BodyHandler').css('top', '-100vh');
$('.BodyHandler').eq(4).animate({
    top: '0px',
    zIndex: '1',
    height: '100svh'
}, EnabledNav); 
setTimeout(function(){
AttrNav.value = "5";
}, 10); 
}
if($('#eventYTData').val() == 1){
if(!Theater){
$('.MiniVid').click();    
}
}else{
$('.iFrame, .VideoNav').hide();    
}
});


$('.Nav6').click(function(){
$('.NavIcon img:nth-child(2)').hide();
$('.NavIcon img:nth-child(1)').show();
if($('.Nav6 button').text() == 'Profile'){
setActiveNav(5);
triggerClick(5);
$('.navs').removeClass('ActiveNav')
AjaxAbort();
DisabledNav();
exitAjax();
$('.BodyHandler').css('top', '-100vh');
$('.BodyHandler').eq(5).animate({
    top: '0px',
    zIndex: '1',
    height: '100svh'
}, EnabledNav);
$('.ProfileContainer').removeClass('flipped')
setTimeout(function(){
$('.Nav6 button').text('Close').bg('red');
if(window.matchMedia( "(max-width: 700.49px)").matches){
$('.ProfileContainer').ht($('.Profile').height());
}else{
$('.ProfileContainer').ht('100vh');
}
}, 10); 
}//if Close
else{
$(`.Nav${AttrNav.value}`).trigger('click');
$('.Nav6 button').text('Profile').bg('blue');
}
if($('#eventYTData').val() == 1){
if(!Theater){
$('.MiniVid').click();    
}
}else{
$('.iFrame, .VideoNav').hide();    
}
});


/* NAVIGATION CONTROL STARS HERE */
$('.navs').click(function () {
$('.navs').removeClass('ActiveNav');
$(this).addClass('ActiveNav');
setTimeout(function (){
if(AttrNav.value != 5){
$('.NavIcon img:nth-child(2)').hide();
$('.NavIcon img:nth-child(1)').show();
}else{
$('.NavIcon img:nth-child(1)').hide();
$('.NavIcon img:nth-child(2)').show();
}
}, 100)
})


$('.SearchBar ion-icon').click(function () {
let x = document.querySelector('.SearchBar input');
/* 300PX TO 600PX */
if(window.matchMedia( "(min-width: 300px) and (max-width: 600px)" ).matches){
if(x.style.width == "" || x.style.width == "0px"){
x.value = "";
$('.SearchBar input').css({
    'borderColor': 'blue',
    'background': 'white',
    'color': 'blue'
}).animate({
    'width': '100%'
}, 'linear', function () {
$('.SearchBar input').focus();    
}).attr('readonly', false);    
}else{
if(x.value.length > 0){
alert('You Search ' + $('.SearchBar input').val())    
}
}
}
/* 801PX TO 1000PX */
if(window.matchMedia( "(min-width: 801px) and (max-width: 1000px)" ).matches){
if(x.style.width == "" || x.style.width == "0px"){
x.value = "";
$('.SearchBar input').css({
    'borderColor': 'blue',
    'background': 'white',
    'color': 'blue'
}).animate({
    'width': '100%'
}, 'linear', function () {
$('.SearchBar input').focus();    
}).attr('readonly', false);    
}else{
if(x.value.length > 0){
alert('You Search ' + $('.SearchBar input').val())    
}
}    
}
/* 1001PX TO 1200PX */
if(window.matchMedia( "(min-width: 1001px) and (max-width: 1200px)" ).matches){
if(x.style.width != "100%"){

$('.SearchBar input').animate({
    'width': '100%'
}, 'linear', function () {
$('.SearchBar input').focus();    
}).attr('readonly', false);    
}else{
if(x.value.length > 0){
alert('You Search ' + $('.SearchBar input').val())    
}
}    
}
/* 1201PX TO 1400PX */
if(window.matchMedia( "(min-width: 1201px) and (max-width: 1400px)" ).matches){
if(x.style.width == "" || x.style.width == "0px"){
x.value = "";
$('.SearchBar input').css({
    'borderColor': 'blue',
    'background': 'white',
    'color': 'blue'
}).animate({
    'width': '100%'
}, 'linear', function () {
$('.SearchBar input').focus();    
}).attr('readonly', false);    
}else{
if(x.value.length > 0){
alert('You Search ' + $('.SearchBar input').val())    
}
}    
}
})
$('.SearchBar input').focus(function () {
if(window.matchMedia( "(min-width: 1001px) and (max-width: 1200px)" ).matches){
$(this).css({
'width':'100%',
'transition': '0.4s linear'
});    
}
if(window.matchMedia( "(min-width: 1401px) and (max-width: 1900px)" ).matches){
$(this).css({
    'width': '100%',
    'transition': 'width 0.4s linear'
});
}
if($(this).val().length > 0){
$(this).select();
}
})

$('.SearchBar input').blur(function () {
/* 300PX TO 600PX */
/* 801PX TO 1000PX */
/* 1201PX TO 1400PX */
if(window.matchMedia( "(min-width: 300px) and (max-width: 600px)" ).matches || window.matchMedia( "(min-width: 801px) and (max-width: 1000px)" ).matches || window.matchMedia( "(min-width: 1201px) and (max-width: 1400px)" ).matches){
$(this).animate({
'width': '0'
}, '400', 'linear', function () {
$(this).css({
    'borderColor': 'transparent',
    'background': 'transparent',
    'color': 'transparent'
})
}).attr('readonly', true);  
}
/* 1001PX TO 1200PX */
if(window.matchMedia( "(min-width: 1001px) and (max-width: 1200px)" ).matches){
$(this).css({
    'width': 'clamp(6.25rem, -9.4692rem + 25.1256vw, 9.375rem)',
    'transition': 'width 0.4s linear'
});   
}
/* 1401PX TO 1900PX */
if(window.matchMedia("(min-width: 1401px) and (max-width: 1800px)").matches){
  $(this).css({
  'width': 'clamp(10rem, -10.0501rem + 26.7112vw, 20rem)',
  'transition': 'width 0.4s linear'
});
}
})

function NavResponsive() {
/* 200PX TO 600PX */
if(window.matchMedia( "(min-width: 200px) and (max-width: 600px)" ).matches){
//$('.AuthBTN').appendTo('.upperNav');  
$('.SearchBar input').css({
    'borderColor': 'transparent',
    'background': 'transparent',
    'color': 'transparent',
    'width': '0px'
}).attr('readonly', true);     
}
/* 601PX TO 800PX */
if(window.matchMedia( "(min-width: 601px) and (max-width: 800px)" ).matches){
$('.SearchBar input').css({
    'borderColor': 'blue',
    'background': 'white',
    'color': 'blue',
    'width': '100%'
}).attr('readonly', false); 
//$('.AuthBTN').appendTo('.upperNav'); 
}
/* 801PX TO 1200PX */
if(window.matchMedia( "(min-width: 801px) and (max-width: 1200px)" ).matches){
$('.SearchBar input').css({
    'borderColor': 'transparent',
    'background': 'transparent',
    'color': 'transparent',
    'width': '0px'
}).attr('readonly', true);       
}
/* 1001PX TO 1200PX */
if(window.matchMedia( "(min-width: 1001px) and (max-width: 1200px)" ).matches){
$('.SearchBar input').css({
    'borderColor': 'blue',
    'background': 'white',
    'color': 'blue',
    'width': 'clamp(6.25rem, -9.4692rem + 25.1256vw, 9.375rem)'
}).attr('readonly', false);    
}
/* 1201PX TO 1400PX */
if(window.matchMedia( "(min-width: 1201px) and (max-width: 1400px)" ).matches){
$('.SearchBar input').css({
    'borderColor': 'transparent',
    'background': 'transparent',
    'color': 'transparent',
    'width': '0px'
}).attr('readonly', true);    
}
/* 1401PX TO 1800PX */
if(window.matchMedia( "(min-width: 1401px) and (max-width: 1800px)" ).matches){
$('.SearchBar input').css({
    'borderColor': 'blue',
    'background': 'white',
    'color': 'blue',
    'width': 'clamp(10rem, -10.0501rem + 26.7112vw, 20rem)'
}).attr('readonly', false);    
}
/* 1801PX TO 2500PX */
if(window.matchMedia("(min-width: 1801px) and (max-width: 2500px)").matches){
$('.SearchBar input').css({
    'borderColor': 'blue',
    'background': 'white',
    'color': 'blue',
    'width': '100%'
}).attr('readonly', false);    
}
/* 801PX TO BEYOND */
if(window.matchMedia( "(min-width: 801px)" ).matches){
//$('.AuthBTN').prependTo('.lastNav');  
}
$('.BodyHandler').css('padding-top', $('.navHandler').outerHeight());
}

function gapLine(name){
var sets={
a:[8,10,12,14,16],
b:[10,20,30,40,50],
c:[30,20,20,0,0]
}

if(!sets[name])return null

var w=window.innerWidth
var i=0

if(w>=300.5&&w<=700.49)i=0
else if(w>=700.5&&w<=1000.49)i=1
else if(w>=1000.5&&w<=1500.49)i=2
else if(w>=1500.5&&w<=2000.49)i=3
else if(w>=2000.5)i=4

return sets[name][i]
}

/* RESIZE FUNCTIONS */
let lastWidth3 = window.innerWidth;
$(window).resize(function () {
let currentWidth = window.innerWidth;
ProfileHTop();
ProfileHHt();
ProCenHeight();
BrowserHeight = window.innerHeight;  
if (currentWidth !== lastWidth3) {
NavResponsive();   
ComUserLeft();
} 
})
$(window).ready(function () {
NavResponsive(); 
ProfileHTop();
ProCenHeight();
})
/* NAVIGATION CONTROL ENDS HERE */

function DisabledNav() {
$('.navs').css('pointer-events', 'none');
}
function EnabledNav() {
$('.navs').css('pointer-events', 'auto');
}

/* KNOW WHAT ID TO FOCUS */
/* THIS IS TO AVOID P*RN */
$(document).on('focus', '#MemesOwner, #MemesMessage, #FPOwner, #FPCaption, #ContactMessage, #J10D, #J14H', function () {
$('#NameOfInput').val($(this).attr('id'));
})

/* DON'T ALLOW FORBIDDEN WORDS*/
$(document).on('keyup change input', NameOfInput.value, function () {
let y = NameOfInput.value;
if(y){
let z = document.getElementById(y);
let x = z.value.toLowerCase();

let a = "p", b = "o", c = "r", d = "n";
let aa = "h", bb = "a", cc = "c", dd = "k";
if(x.includes(a+b+c+d)){
$(z).val(replaceForbiddenA($(z).val()));
}
if(x.includes(aa+bb+cc+dd)){
$(z).val(replaceForbiddenB($(z).val()));
}    
}
})

function replaceForbiddenA(text) {
const forbiddenWord = 'p' + 'o' + 'r' + 'n';
  const replacement = "p*rn";
  const newText = text.replace(new RegExp(forbiddenWord, 'gi'), replacement);
return newText;
}
function replaceForbiddenB(text) {
const forbiddenWord = 'h' + 'a' + 'c' + 'k';
  const replacement = "h*ck";
  const newText = text.replace(new RegExp(forbiddenWord, 'gi'), replacement);
return newText;
}

function getDateTime() {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  return `${formattedDate} ${formattedTime}`;
}

function getDateOnly() {
let a = new Date(); 
let b = a.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  }); 
  return `${b}`;    
}


function getTimeOnly() {
let a = new Date();
let b = a.toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit'
  });
  return `${b}`;    
}
/* Calculate Age */
function calcAge(birthDate, currentDate) {
let birth = new Date(birthDate);
let today = new Date(currentDate);
let age = today.getFullYear() - birth.getFullYear();
let monthDiff = today.getMonth() - birth.getMonth();
let dayDiff = today.getDate() - birth.getDate();
if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
age--;
}
return age;
}


/* Formate Date ex. 2001 Jan 05 */
function formatDate(dateString) {
  let [a, b, c] = dateString.split('/');
  let x = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${c} ${x[a - 1]} ${b.padStart(2, '0')}`;
}

var LoadingLogo = `
<div class="LogoHandler">
<div class="LoadingLogo">
<div class="LogoBe">
<p>B</p><p>e</p>   
</div> 
<div class="LogoAl">
<p>A</p><p>lways</p>   
</div> 
<div class="LogoMi">
<p>M</p><p>ine</p>   
</div>    
</div>  
<h4></h4>
</div>
`;


/* IF TRY AGAIN IN NO INTERNET */
var WifiInterval;    
$(document).on('click', '#TryInt', function () {
CheckOnline();
$('.WoInternet').removeClass('WoInternet');
$('.NoWifiHandler #Loading').show();
$('.NoInt').addClass('hidden');
$('#TryInt').addClass('hidden');
setTimeout(function(){
$('.Innest').css('border-top-color', 'red');    
}, 500);
setTimeout(function(){
$('.Inner').css('border-top-color', '#ff6915');            
}, 1000);
setTimeout(function(){
$('.Outer').css('border-top-color', '#00ff03');            
}, 1500);
setTimeout(function(){
$('.Outest').css('border-top-color', 'blue');            
}, 2000); 
setTimeout(function(){
$('.Innest').css('border-top-color', 'transparent');    
$('.Inner').css('border-top-color', 'transparent');            
$('.Outer').css('border-top-color', 'transparent');            
$('.Outest').css('border-top-color', 'transparent');                
}, 2500);  
WifiInterval = setInterval(function () {
setTimeout(function(){
    $('.Innest').css('border-top-color', 'red');    
}, 500);
setTimeout(function(){
$('.Inner').css('border-top-color', '#ff6915');            
}, 1000);
setTimeout(function(){
$('.Outer').css('border-top-color', '#00ff03');            
}, 1500);
setTimeout(function(){
$('.Outest').css('border-top-color', 'blue');            
}, 2000);
setTimeout(function(){
$('.Innest').css('border-top-color', 'transparent');    
$('.Inner').css('border-top-color', 'transparent');            
$('.Outer').css('border-top-color', 'transparent');            
$('.Outest').css('border-top-color', 'transparent');                
}, 2500);
}, 2500)    
})




function CheckOnline() {
$.ajax({
    url: 'PostData.php',
    type: 'HEAD',
    timeout: '5000',
    success: function() { 
let funcname = Err203.value;
let eventname = Err204.value;
if (!!funcname) {
eval(funcname)();
setTimeout(function(){
    Err203.value = ""; 
}, 10); 
}else if(!!eventname){
let x = document.querySelector(eventname);
console.log(x);
x.click();
setTimeout(function(){
Err204.value = "";  
}, 10);  
}
$('.NoWifiHandler').hide();
$('.Outest').addClass('WoInternet');
$('.Outer').addClass('WoInternet');
$('.Inner').addClass('WoInternet');
$('.Innest').addClass('WoInternet');
$('.NoWifiHandler h3').addClass('hidden');
$('.NoInt').removeClass('hidden');
$('#TryInt').removeClass('hidden');  
clearInterval(WifiInterval)  
    },
    error: function (a, b) {
    
$('.NoWifiHandler').hide();
$('.Outest').addClass('WoInternet');
$('.Outer').addClass('WoInternet');
$('.Inner').addClass('WoInternet');
$('.Innest').addClass('WoInternet');
$('.NoWifiHandler h3').addClass('hidden');
$('.NoWifiHandler #Loading').hide();
$('.NoInt').removeClass('hidden');
$('#TryInt').removeClass('hidden');  
clearInterval(WifiInterval)  
setTimeout(function(){ 
$('.NoWifiHandler').show();
}, 10);
if(b == "error"){
$('.NoInt p').text('No Internet Connection');
}else if(b == "timeout"){
$('.NoInt p').text('Request Timeout due of unstable Internet Connection');
}       
    }
});    
if(Err204.value == '.SM_Submit'){
$('.BTN1_SM').click();
$('.SM_Submit').click();
}    
}

$('.NoWifiHandler h4').click(function () {
$('.NoWifiHandler').hide();
$('.Outest').addClass('WoInternet');
$('.Outer').addClass('WoInternet');
$('.Inner').addClass('WoInternet');
$('.Innest').addClass('WoInternet');
$('.NoWifiHandler #Loading').hide();
$('.NoInt').removeClass('hidden');
$('#TryInt').removeClass('hidden');  
clearInterval(WifiInterval)  
})

/* HIDE ALL BOXES */
function ClickClose(event) {
TransBG.removeAttribute('onclick');
$('#TransBG').hide();
document.querySelector(event).click();
};
/* AVOID SCROLL IF TRANSBG DISPLAY */
$('.BodyHandler').scroll(function () {
if($('#TransBG').is(':visible')){
$('.BodyHandler').css('overflow', 'hidden');  
}
})

/* ENABLE SCROLL IS TRANSBG HIDDEN */
$('.CloseBTN').click(function () {
$('.BodyHandler').css('overflow', 'scroll');       
})

/* DISPLAY MAINTENANCE */
var MaintenanceTrue = `
<div class="MaintenancePage">
<div>
<h3>This <span id="forSection">Section</span><span id="forPage" class="hidden">Page</span> is Under Maintenance</h3>    
</div>
<img src="svg/maintenance.svg">          
<div>
<h2>We will back soon!</h2>    
</div>
</div>
`;

/* ALERT BOX BTN CONTROLLER */
/* IF USER CLICK YES */
UserYes.addEventListener("click", function(){
$('.AlertBox').removeClass('class');
if(AlertNumber.value == '001'){
UsersLogOut(check912.checked)   
}else if(AlertNumber.value == '002'){
$('.AlertBox').hide().removeFilter();
reqHDPhoto();
$('.ContactMessage').val('Hello there, the Photo Preview is not aligned on the Photo Code ' + $('.photoCodeInput').val() +'. Can you check? Thanks!');
$('._subject').val('About Wrong Photo');
if(!validateEmail($('.ContactEmail').val())){
$('.ContactEmail').focus();
}
}
});

UserNo.addEventListener("click", function(){
$('.AlertBox').slideUp();
$('.AlertBox').removeClass('class').removeFilter();
$('.BGBelowNav, .BGAboveNav').hide();
});


$('.SearchBar input').keyup(function () {
$('.formAdmin').hide();
if($(this).val() == 0){
//DISPLAY DEBUGINPUT 
$('.DebugInput').show();  
}
if($(this).val() == 1){
//DISPLAY CLAMPGENERATOR
$('.clampGeneratorV3').slideDown();  
}
if($(this).val() == 2){
//DISPLAY VISITOR'S DATA
$('.visitorsData').show();  
}
if($(this).val() == 3){
//DISPLAY CHECK PROPERTIES MANUAL
$('.checkProp').show();  
}
if($(this).val() == 4){
//DISPLAY CHECK PROPERTIES MANUAL
$('.propCheckerBox').show();  
}
if($(this).val() == 5){
$('.WebLogs').show()
}
if($(this).val() == 6){
$('.clampGeneratorV6').slideDown(); 
}
$(this).animate({
'width': '0'
}, '400', 'linear', function () {
$(this).css({
    'borderColor': 'transparent',
    'background': 'transparent',
    'color': 'transparent'
})
}).attr('readonly', true).val('');  
})

$('.ElemProp button:nth-child(1)').click(function (){
if($(this).text() == 'Show'){
$(this).hide();
$('.SummaryElemProp').show();
checkProperties();
$('.ElemProp nav button:nth-child(2)').show();
}else{
$(this).text('Show');
$('.ElemProp input:nth-child(2)').slideDown().focus();
}
})
function checkProperties() {
 let elemInput = document.querySelector('.forElem')
 let propInput = document.querySelector('.forProp')
 let selectors = elemInput.value.trim().split(/\s+/)
 let props = propInput.value.trim().split(/\s+/)
 let output = ''

 // Do not overwrite localStorage
 if (!localStorage.getItem('savedElem')) localStorage.setItem('savedElem', elemInput.value)
 if (!localStorage.getItem('savedProp')) localStorage.setItem('savedProp', propInput.value)

 selectors.forEach(raw => {
  let selector = raw
  if (!raw.includes('.') && !raw.includes('#')) selector = '.' + raw

  let elements = document.querySelectorAll(selector)
  output += `<b>Elements:</b> ${raw} (${elements.length} match)<br><b>Properties:</b><br>`

  if (elements.length === 0) {
   output += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(no match)<br><br>`
   return
  }

  let el = elements[0]
  let styles = getComputedStyle(el)
  props.forEach(prop => {
   let val = styles.getPropertyValue(prop).trim()

   if (val === 'auto' && ['height', 'width', 'top', 'left', 'right', 'bottom'].includes(prop)) {
    const rect = el.getBoundingClientRect()
    const map = {
     height: rect.height || el.offsetHeight,
     width: rect.width || el.offsetWidth,
     top: rect.top,
     left: rect.left,
     right: rect.right,
     bottom: rect.bottom
    }
    val = map[prop] !== undefined ? Math.round(map[prop]) : 'auto'
   } else {
    val = val.endsWith('px') ? parseFloat(val) : val
   }

   // ✅ Create input button for each value (copyable)
   output += `<input type="button" value="${prop}: ${val}" onclick="navigator.clipboard.writeText('${val}')"><br>`
  })

  output += `<br>`
 })

 document.querySelector('.SummaryElemProp').innerHTML = output
}

// ✅ Auto-refresh when window resizes
window.addEventListener('resize', checkProperties)

function clearAllElemProp() {
$('.ElemProp button:nth-child(2), .ElemProp input:nth-child(2)').hide();
$('.ElemProp button:nth-child(1)').show().text('Properties');
 document.querySelector('.forElem').value = ''
 document.querySelector('.forProp').value = ''
$('.SummaryElemProp').hide(); document.querySelector('.SummaryElemProp').innerHTML = ''
 localStorage.removeItem('savedElem')
 localStorage.removeItem('savedProp')
}

$('.forElem').keyup(function (){
if($('.forProp').val().length > 0){
$('.ElemProp button:nth-child(1)').slideDown().text('Show');
}else{
$('.ElemProp button:nth-child(1)').slideDown().text('Properties');
}
})

$('.forProp').keyup(function (){
$('.ElemProp button:nth-child(1)').slideDown().text('Show');
})

/* CHECK PROPERTIES AUTOMATICALLY */
const allElements = [
  '.Form_Body',
  '.ProfileFront',
  '.ContactHandler',
  '.ProfileBG',
  '.ProfileContent',
  '.SecretMessage',
  '.SM_Container',
  '.navHandler',
  '.ProTopBTN'
]

const allProps = [
  'height',
  'width',
  'position',
  'top',
  'display'
]

function checkAllProperties() {
  let output = ''

  allElements.forEach(raw => {
    let selector = raw
    let elements = document.querySelectorAll(selector)
    let label = selector.startsWith('.') ? selector.slice(1) : selector.startsWith('#') ? selector.slice(1) : selector
    output += `<b>Elements:</b> ${label} (${elements.length} match(es))<br><b>Properties:</b><br>`

    if (elements.length === 0) {
      output += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(no match)<br><br>`
      return
    }

    let el = elements[0]
    let styles = getComputedStyle(el)

    allProps.forEach(prop => {
      let val = styles.getPropertyValue(prop).trim()

      if (val === 'auto' && ['height', 'width', 'top', 'left', 'right', 'bottom', 'padding-top'].includes(prop)) {
        const rect = el.getBoundingClientRect()
        const map = {
          height: rect.height || el.offsetHeight,
          width: rect.width || el.offsetWidth,
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom
        }
        val = map[prop] !== undefined ? Math.round(map[prop]) : 'auto'
      } else {
        val = val.endsWith('px') ? parseFloat(val) : val
      }

      // ✅ Output button with VALUE ONLY (no "height: ")
      output += `${prop}: <input type="text" value="${val}" id="${label + '_'}" onchange="alert('Hello')" onclick="navigator.clipboard.writeText('${val}')"><br>`
    })

    output += `<br>`
  })  
    document.querySelector('.propResultArea').innerHTML = output
}

// ✅ Refresh when resized
window.addEventListener('resize', function(){
checkAllProperties();
SetSMBodyHt();
SetComBodyHt();
})

function getSpecs(selector, props){
let el=document.querySelector(selector)
if(!el)return null
let styles=getComputedStyle(el)
let list=props.trim().split(/\s+/)
let total=0
let multi=list.length>1
for(let prop of list){
let val=styles.getPropertyValue(prop).trim()
if(val==='auto'){
if(multi){val=0}else{
if(['height','width','top','left','right','bottom','padding-top'].includes(prop)){
let rect=el.getBoundingClientRect()
let map={
height:rect.height||el.offsetHeight,
width:rect.width||el.offsetWidth,
top:rect.top,
left:rect.left,
right:rect.right,
bottom:rect.bottom
}
val=map[prop]!==undefined?Math.round(map[prop]):'auto'
}
return val
}
}else{
if(val.endsWith('px'))val=parseFloat(val)
else if(multi&&isNaN(val))val=0
}
if(multi)total+=Number(val)||0
else return val
}
return multi?total:null
}



function PropVal(elemName, propName) {
  let selector = elemName.startsWith('.') || elemName.startsWith('#') ? elemName : '.' + elemName
  let el = document.querySelector(selector)
  if (!el) return null

  let styles = getComputedStyle(el)
  let val = styles.getPropertyValue(propName).trim()

  if (val === 'auto' && ['height', 'width', 'top', 'left', 'right', 'bottom'].includes(propName)) {
    const rect = el.getBoundingClientRect()
    const map = {
      height: rect.height || el.offsetHeight,
      width: rect.width || el.offsetWidth,
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom
    }
    val = map[propName] !== undefined ? Math.round(map[propName]) : 'auto'
  } else {
    val = val.endsWith('px') ? parseFloat(val) : val
  }

  return val
}

function TotalVal(elementsStr, propName) {
 let total = 0
 let names = elementsStr.trim().split(/\s+/)

 names.forEach(name => {
  name = name.replace(/,/g, '').trim(); // remove commas just in case
let selector = name.startsWith('.') || name.startsWith('#') ? name : '.' + name
  let el = document.querySelector(selector)
  if (!el) return

  let styles = getComputedStyle(el)
  let val = styles.getPropertyValue(propName).trim()

  if (val === 'auto' && ['height', 'width', 'top', 'left', 'right', 'bottom'].includes(propName)) {
   const rect = el.getBoundingClientRect()
   const map = {
    height: rect.height || el.offsetHeight,
    width: rect.width || el.offsetWidth,
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom
   }
   val = map[propName] !== undefined ? Math.round(map[propName]) : 0
  } else {
   val = val.endsWith('px') ? parseFloat(val) : parseFloat(val)
  }

  if (!isNaN(val)) total += val
 })

 return total
}

function submitContactUs() {
 if (AttrNav.value == 2) {
   $('#PitikPhoto').click();
 }
 if ($('.forProNav2').is(':visible')) {
   $('.Com_Stat').val(1);
   $('.Adm_Reply').removeClass('forceHidden');
   $('.Com_Open').removeClass('forceHidden');
   setTimeout(function(){
     CommunityStat();
   }, 10);
 }
 if (AttrNav.value == 3) {
   $('.BlogsForm').show();
 }
}



const navInputs = document.querySelectorAll('.TimePerNav input');
const timeTrackers = Array.from(navInputs).map(() => ({ time: 0, interval: null }));

let currentNav = null;

function startNavTimer(index) {
  if (timeTrackers[index].interval) return;

  timeTrackers[index].interval = setInterval(() => {
    timeTrackers[index].time++;
    navInputs[index].value = timeTrackers[index].time;

    if (timeTrackers[index].time >= 60) {
      timeTrackers[index].time = 0;
      navInputs[index].value = 0;
      triggerFunction(index);
    }
  }, 1000);
}

function stopAllTimers() {
  timeTrackers.forEach(tracker => {
    if (tracker.interval) {
      clearInterval(tracker.interval);
      tracker.interval = null;
    }
  });
}

function setActiveNav(index) {
  stopAllTimers();
  currentNav = index;
  startNavTimer(index);
}


function FlyDrone(){
$('.DroneHandler').css('transition', '0.8s linear');
if(window.matchMedia( "(min-width: 301px) and (max-width: 600px)").matches){
$('.DroneHandler').css('transform', 'scale(8)');
}else if(window.matchMedia( "(min-width: 601px) and (max-width: 1000px)").matches){
$('.DroneHandler').css('transform', 'scale(15)');
}else if(window.matchMedia( "(min-width: 1001px) and (max-width: 1500px)").matches){
$('.DroneHandler').css('transform', 'scale(25)');
}else{
$('.DroneHandler').css('transform', 'scale(35)');
}
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[m];
  });
}

function validateEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
  return emailRegex.test(email);
}

function validateText(length, text){
 return text && text.length >= length;
}

function test(){
setTimeout(function(){
console.log('Hello Test');
},20000)
}

function GetPut(elem,parent,display='show'){
var p

if(typeof parent=='string')p=document.querySelector(parent)
else if(parent.jquery)p=parent[0]
else p=parent

if(!p)return

// convert elem to array of elements
var elems=[]
var autoWrapper=null

if(typeof elem=='string'){
if(elem.trim().startsWith('<')){
var tmp=document.createElement('div')
tmp.innerHTML=elem.trim()
elems=Array.from(tmp.children)
}else{
var sel=document.querySelectorAll(elem)
elems=Array.from(sel)
}
}else if(elem.jquery){
elems=Array.from(elem)

// check if elems are .children() of a parent
if(elem.length>0){
var commonParent=elem[0].parentElement
if(commonParent && Array.from(commonParent.children).every(ch=>elems.includes(ch))){
autoWrapper=document.createElement('div')
autoWrapper.className=commonParent.className
elems.forEach(ch=>autoWrapper.appendChild(ch))
elems=[autoWrapper]
}
}
}else if(elem instanceof Element){
elems=[elem]
}else if(NodeList.prototype.isPrototypeOf(elem)||Array.isArray(elem)){
elems=Array.from(elem)
}else return

// append each element and set display
elems.forEach(function(e){
p.appendChild(e)
if(display=='hide')e.style.display='none'
else if(display=='flex')e.style.display='flex'
else e.style.display='block'
})

// reset CSS of other children except newly appended
Array.from(p.children).forEach(function(child){
if(!elems.includes(child)){
child.style.opacity='0'
child.style.pointerEvents='none'
}
})
}

function ExistElem(child,parent){
var c,p,tmp

if(typeof child=='string'){
if(child.trim().startsWith('<')){
tmp=document.createElement('div')
tmp.innerHTML=child.trim()
c=tmp.firstElementChild
}else{
c=document.querySelector(child)
}
}else if(child.jquery){
c=child[0]
}else{
c=child
}

if(typeof parent=='string')p=document.querySelector(parent)
else if(parent.jquery)p=parent[0]
else p=parent

if(!c||!p)return false

return p.contains(c)
}
