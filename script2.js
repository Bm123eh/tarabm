let activeInterval = null;
let slowInterval = null;
let percent = 0;
let failTimeout = null;

function setLoadStatus(status) {
 localStorage.removeItem('LoadStatus');
 localStorage.setItem('LoadStatus', status);
}

function getLoadStatus() {
 return localStorage.getItem('LoadStatus');
}

function removeLoadStatus(){
 localStorage.removeItem('LoadStatus');
}

/* LOADAJAX */
function loadAjax(parent, format, width, name, callback, exit=false, sets = false){
let saved = [parent, format, width, name, callback.name, exit, sets];
localStorage.setItem('lastAjax', JSON.stringify(saved));
clearTimeout(failTimeout)
if (parent && parent !== 'body' && !parent.startsWith('.') && !parent.startsWith('#')) parent = '.' + parent
if (!$('.ThisLoader').parent().is(parent))
$(parent).append($('.ThisLoader'))
$('.LoaderFail').hide().top(0);

if (parent != 'body'){
$('.ThisLoader').removeClass('Centered');
$(parent).css('display','flex').height($('.ThisLoader').height())
} else {
if(getLoadStatus() == null){
$('.ThisLoader').addClass('Centered').slideDown().flex().stop(true, true);
}else{
$('.ThisLoader').addClass('Centered');

}
}
setLoadStatus('Loading');

 if (typeof callback === "function") callback()

 if(format == 'L1'){
  $('.ThisLoader').css({ display: 'flex', width: width })
  $('.LoaderLine').css('background', '#55ff58')
  if(!sets && percent == 0){
   $('.LoaderLine').css('width', 0)
   percent = 0
  }
  $('.LoaderText').text(name + ' (' + percent + '%)').css('color', 'blue')
 }
 if(exit){
 $('.LoaderExit').css('display', 'flex');
 if(typeof exit === 'function'){
 $('.LoaderExit').on('click', function(){
  exitAjax(exit)
 })
}else{
 $('.LoaderExit').on('click', function(){
  exitAjax(false)
 })
}
 }else{
 $('.LoaderExit').hide()
 }

 // limit range based on current percent
 let maxRange = typeof sets === 'number' ? sets : 90
 let minRange = Math.max(10, percent + 1) // never go below current percent
 let time = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange
//let time = 98;

 if(time <= percent) time = percent + 1 // guarantee forward motion

 let duration = 2000
 let stepTime = Math.max(15, duration / Math.max(1, (time - percent))) // prevent glitch

 if(activeInterval) clearInterval(activeInterval)
 if(slowInterval) clearInterval(slowInterval)

 activeInterval = setInterval(() => {
  if (percent >= time) {
   clearInterval(activeInterval)
   $('.LoaderText').text(name + ' (' + time + '%)')
   $('.LoaderLine').css('width', time + '%')
   slowInterval = setInterval(() => {
    if (percent < 99) {
     percent++
     $('.LoaderText').text(name + ' (' + percent + '%)')
     $('.LoaderLine').css('width', percent + '%')
     let ninenine = null;
     if(percent == 99){
     clearTimeout(ninenine)
ninenine = setTimeout(function (){
failAjax('Timeout: Please Try Again', rerunLastAjax, null, null);
}, 5000)
     }
     if (getLoadStatus() == 'Cancelled') {
      clearInterval(slowInterval)
      percent = 0
      $('.LoaderText').text('Please Wait...')
      $('.LoaderLine').css('width','0%')
      removeLoadStatus()
     }
    } else if(percent == 99){
     clearInterval(slowInterval)
    }
   }, 400)
  } else {
   percent++
   $('.LoaderText').text(name + ' (' + percent + '%)')
   $('.LoaderLine').css('width', percent + '%')
   if (getLoadStatus() == 'Cancelled') {
    clearInterval(activeInterval)
    percent = 0
    $('.LoaderLine').css('width','0%')
    removeLoadStatus()
   }
  }
 }, stepTime)
}

//loadAjax('body', 'L1', '92%', 'This Is Test', testsite, false, false);

function testsite(){
setTimeout(function (){
alert('Functionized');
}, 20000)
}

function rerunLastAjax(){
  let saved = JSON.parse(localStorage.getItem('lastAjax'));
  if(saved){
    loadAjax(saved[0], saved[1], saved[2], saved[3], saved[4], saved[5], saved[6]);    
  }
}

/* DONEAJAX */
function doneAjax(time = 'end', callback){
 if(time !== 'end'){
  if(time.includes('-')){
   let [a,b] = time.split('-').map(Number)
   a = Math.max(a, percent + 1) // make sure it's ahead of current
   time = Math.floor(Math.random() * (b - a + 1)) + a
  }else{
   alert('Error Parameters setting duration')
  }
 }else{
  time = 100
 }

 let h4 = document.querySelector('.LoaderText'),
     lineLoad = document.querySelector('.LoaderLine'),
     length = h4.textContent.length,
     x = length - 6,
     text = h4.textContent.substring(0, x)

 duration = 400
 stepTime = Math.max(15, duration / Math.max(1, (time - percent))) // prevent blink

 if(activeInterval) clearInterval(activeInterval)
 if(slowInterval) clearInterval(slowInterval)

 activeInterval = setInterval(() => {
  if(percent >= time){
   clearInterval(activeInterval)
   h4.textContent = text + ' (' + time + '%)'
   lineLoad.style.width = time + '%'
   percent = time
   if(typeof callback === 'function' && getLoadStatus() != 'Cancelled'){
    setTimeout(() => {
     callback()
     removeLoadStatus()
     if(time == 100){     
     setLoadStatus('Loaded')
     exitAjax();
     percent = 0
     }
    },10)
   }
  } else {
   percent++
   h4.textContent = text + ' (' + percent + '%)'
   lineLoad.style.width = percent + '%'
   setLoadStatus('Loading')
   if(getLoadStatus() == 'Cancelled'){
    clearInterval(activeInterval)
    percent = 0
    h4.textContent = '0%'
    lineLoad.style.width = '0%'
    removeLoadStatus()
   }
  }
 }, stepTime)
}

function failAjax(text, tryagain, report, learnmore, exit = false){
$('.failbtn1, .failbtn2, .failbtn3').hide()
setLoadStatus('Failed');
percent = 0;
let a = $('.ThisLoader').parent().attr('class').trim();
let b = a.length,
parent = a.substring(8, b);
$('.' + parent).animate({
'margin-bottom': $('.LoaderFail').outerHeight() + gapLine('a')
});
clearInterval(slowInterval)
clearInterval(activeInterval)
$('.ThisLoader').css('display', 'flex');
$('.LoaderLine').css({
background: 'red',
width: '100%'
})
$('.LoaderText').text(text).css('color', 'white');
if(tryagain){
if (typeof tryagain === "function") {
$('.failbtn1').css('display', 'flex').off('click').on('click', function () {
tryagain();
percent = 0;
$('.LoaderLine').css({
background: '#55ff58',
width: 0
})
$('.LoaderFail').css('top', 0);
});
}
}
if(report){
if (typeof report === "function") {
$('.failbtn2').css('display', 'flex').off('click').on('click', function () {
report();
percent = 0;
$('.failbtn2').hide()
});
}
}
if(learnmore){
if (typeof learnmore === "function") {
$('.failbtn3').css('display', 'flex').off('click').on('click', function () {
learnmore();
percent = 0;
$('.failbtn3').hide()
});
}
}
if(!tryagain && !report && !learnmore){
clearTimeout(failTimeout)
failTimeout = setTimeout(function(){
let parent = $('.ThisLoader').parent()
if(parent.prop('tagName').toLowerCase() !== 'body'){
parent.slideUp()
}
$('.ThisLoader').slideUp(function(){
$(this).appendTo('body').hide()

})
}, 3000)
}else{
$('.LoaderFail').hide()
$('.LoaderFail').flex().animate({
top: '110%',
display: 'flex'
}, function (){
$('.LoaderExit').css('display', 'flex');
});
}
$('.LoaderFail div').width('33.3%');
if(exit){
 if(typeof exit === 'function'){
 $('.LoaderExit').on('click', function(){
  exitAjax(exit)
 })
}else{
 $('.LoaderExit').on('click', function(){
  exitAjax(false)
 })
}
 }
}

/* EXITAJAX */
function exitAjax(callback){
$('.LoaderFail').animate({
top: '0'
});
$('.ThisLoader').slideUp(function(){
percent = 0;
});
let prevParent = $('.ThisLoader').parent();
setTimeout(function(){
if(!getLoadStatus()){
$('.ThisLoader').appendTo('.HideLoader');
}
}, 25)
setTimeout(function(){
if(!prevParent.is('body')){
prevParent.slideUp()
}
}, 50)
stopAjax();
removeLoadStatus();
if(callback){
if (typeof callback === "function") {
callback();
}else{
$(callback).click();
}
}
}

$.fn.where = function(txt, head, n, nav, yesBTN, noBTN, row = true){
//txt = The TextDisplayed
//head = HeadIcon displayed if true, false if otherwise
//n = The Alert Number to control Yes or No
//nav = Show the ckeckbox
//yesBTN = The name of the button
//noBTN = The name of the button
//row = the flexDirection of ComfirmBTN
$('.AlertBox').show();
$('.InfoWarn p').text(txt);
$('#AlertNumber').val(n);
if(head){
$('.HeadIcon').removeClass('forceHidden').flex();
}else{
$('.HeadIcon').addClass('forceHidden');
}
if(nav){
$('.OtherNav').show();
}else{
$('.OtherNav').hide();
}
if(row){
$('.ConfirmBTN').css('flex-direction', 'row');
}else{
$('.ConfirmBTN').css('flex-direction', 'row-reverse');
}
if(yesBTN){
$('#UserYes').text(yesBTN);
}else{
$('#UserYes').text('Yes');
}
if(noBTN){
$('#UserNo').text(noBTN);
}else{
$('#UserNo').text('No');
}
}

function CloseThisDiv(parentSelector, animate, withBG = false) {
let parent = $(event.target).closest(parentSelector);
if (animate) {
if (withBG) {
parent.slideUp();
$(".BGBelowNav, .BGAboveNav").slideUp(500);      
}
} else {
    parent.hide();
}
}

$('.IconAbove').click(function () {
if($('.DebugInput').is(':visible')){
$('.DebugInput').hide()    
}else{
$('.DebugInput').show()    
}  
})

$('.DInav button').click(function () {
$('.DInav button').removeClass();
$(this).addClass('Active');
let x = parseInt($(this).data('id'));
$('.DIbody').addClass('forceHidden');
$('.DIbody').eq(x-1).removeClass('forceHidden').flex();
})

let UserLong, UserLat, city, place, country;

const getLocation = () => {
    fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((data) => {
let City1 = data.city;
let ip = data.ip;
if (ip) {
fetch(`https://api.ipgeolocation.io/v2/ipgeo?apiKey=afefe1b3880b4530959196f673f31d9a&ip=${ip}`)
  .then(response => response.json())
  .then((result) => {
let provA = result.location.district;
let provB = provA.substring(0, 11);
let province = provA;
if(provB == 'Province of'){
let length = provA.length;
province = provA.substring(12, length)
}
setBrain('loc1', City1 + ', '  + province)
setBrain('loc2', result.location.city + ', '  + province)
$('#currLoc').text(City1 + ', ' + province);
  })
  .catch(error => alert('error', error)); 
   }
    });
};
//getLocation();
function PostError(a, b) {
let data = $('<div></div>');
$('<p></p>').text(a).appendTo(data);
$('<input>').attr('value', b).appendTo(data);
$('.forLatestError').append(data);
PostLog(b, true);
// Increment the .WebLogo number
let logo = $('.WebLogo');
let count = parseInt(logo.text());
if (isNaN(count)) count = 0;
logo.text(count + 1);
}

function PostLog(txt, isError = false) {
  let now = new Date();
  let time = now.toLocaleTimeString('en-US', { hour12: true });
  let nav = document.createElement("nav");
  let pTime = document.createElement("p");
  let pTxt = document.createElement("p");
  pTime.textContent = time;
  pTxt.textContent = txt;
  if (isError) {
    pTxt.style.color = "red";
    pTime.style.color = "red";
  } else {
    pTxt.style.color = "blue";
    pTime.style.color = "blue";  
  }
  nav.appendChild(pTime);
  nav.appendChild(pTxt);
  document.querySelector(".ListLogs").appendChild(nav);
  $('.WebLogs').show();
}



var FM_AJAX, FP_AJAX, FM_AJAX_, FP_AJAX_, SM_AJAX, COM_AJAX, RB_AJAX, UpdatePro;
function AjaxAbort() {
    const ajaxRequests = [FM_AJAX, FP_AJAX, FM_AJAX_, FP_AJAX_, SM_AJAX, COM_AJAX, UpdatePro];

    ajaxRequests.forEach(req => {
        if (req && typeof req.abort === "function") {
            req.abort();          
        }
    });
}

let isAborted = false;

window.AjaxRegistry = {}

function startAjax(name, opt) {
  if (opt) {
    AjaxRegistry[name] = { request: $.ajax(opt), options: opt }
    localStorage.setItem("activeAjax", name)
  } else if (AjaxRegistry[name]) {
    AjaxRegistry[name].request = $.ajax(AjaxRegistry[name].options)
    localStorage.setItem("activeAjax", name)
  } else {
    throw new Error("No ajax config found for " + name)
  }
  return AjaxRegistry[name].request
}

function stopAjax() {
let savedAjax = localStorage.getItem("activeAjax")
if(getLoadStatus() == 'Loading') {
if (!savedAjax) return

let ajaxObj = AjaxRegistry[savedAjax]
if (ajaxObj && ajaxObj.request) {
isAborted = true
ajaxObj.request.abort()
PostError(savedAjax, savedAjax + ' is aborted')
} 
}

  delete AjaxRegistry[savedAjax]
  localStorage.removeItem("activeAjax")
}
/* FOR ADMIN FEATURES START */

/* FOR ADMIN FEATURES END */

/* UIBANNER FOR NOTIFICATION */
function UIBannerGood(a){
let x = $('.UIBanner');
let y = $('.UIBanner2');

function watchNotifLine($el) {
  const line = $el.find('.notifLine');
  line.removeClass('notifLine2')[0].offsetWidth;
  line.addClass('notifLine2');
  setTimeout(() => {
$el.data('fading', true).animate({ opacity: 0 }, 600, 'linear', function () {
$el.hide().removeClass('Active Active2').css('opacity', 1).data('fading', false);
});
}, 3400);
}

function showAndWatch($el, text) {
  $el.stop(true, true).show().css('display', 'flex').addClass('Active').bg('blue').find('p').text(text);
  watchNotifLine($el);
}


if(x.hasClass('Active')){
  x.removeClass('Active').addClass('Active2');
  if(y.hasClass('Active2')){
    y.stop(true, true).hide().removeClass('Active Active2');
    setTimeout(function (){
      showAndWatch(y, a);
    }, 10);
  }else{
    showAndWatch(y, a);
  }
}else if(x.hasClass('Active2')){
  x.stop(true, true).hide().removeClass('Active Active2');
  setTimeout(function (){
    showAndWatch(x, a);
  }, 10);
  y.removeClass('Active').addClass('Active2');
}else{
  showAndWatch(x, a);
}
}

function UIBannerBad(a){
let x = $('.UIBanner');
let y = $('.UIBanner2');

function watchNotifLine($el) {
  const line = $el.find('.notifLine');
  line.removeClass('notifLine2')[0].offsetWidth;
  line.addClass('notifLine2');
  setTimeout(() => {
$el.data('fading', true).animate({ opacity: 0 }, 600, 'linear', function () {
$el.hide().removeClass('Active Active2').css('opacity', 1).data('fading', false);
});
}, 3400);
}

function showAndWatch($el, text) {
  $el.stop(true, true).show().flex().addClass('Active').bg('red').find('p').text(text);
  watchNotifLine($el);
}

if(x.hasClass('Active')){
  x.removeClass('Active').addClass('Active2');
  if(y.hasClass('Active2')){
    y.stop(true, true).hide().removeClass('Active Active2');
    setTimeout(function (){
      showAndWatch(y, a);
    }, 10);
  }else{
    showAndWatch(y, a);
  }
}else if(x.hasClass('Active2')){
  x.stop(true, true).hide().removeClass('Active Active2');
  setTimeout(function (){
    showAndWatch(x, a);
  }, 10);
  y.removeClass('Active').addClass('Active2');
}else{
  showAndWatch(x, a);
}
}

$('.UIBanner ion-icon').click(function (){
$('.UIBanner').fadeOut(600, 'linear');
})
$('.UIBanner2 ion-icon').click(function (){
$('.UIBanner2').fadeOut(600, 'linear');
})
function genClass(){
return Math.random().toString(36).substring(2,8)
}


async function checkInternet(){
 return new Promise(resolve=>{
  const s=document.createElement('script')
  s.onload=()=>{s.remove();resolve(true)}
  s.onerror=()=>{s.remove();resolve(false)}
  s.src='https://unpkg.com/ionicons@7.4.0/dist/ionicons/ionicons.js?'+Date.now()
  document.head.appendChild(s)
 })
}



/* END */

/* 
$('.Nav1').click(function() {
history.pushState(true, '', '/home');
});

$('.Nav2').click(function() {
history.pushState(true, '', '/gallery');
});

$('.Nav3').click(function() {
history.pushState(true, '', '/blogs');
});

$('.Nav4').click(function() {
history.pushState(true, '', '/memes');
});

$('.Nav5').click(function() {
history.pushState(true, '', '/profile');
});



$(window).on('popstate', function(e) {
 let state = e.originalEvent.state;
if(state){
const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
if(path == 'home'){
$('.navs').removeClass('ActiveNav');
$('.Nav1').addClass('ActiveNav');
$('.BodyHandler').css('top', '-100vh');
$('.BodyHandler').eq(0).animate({
    top: '0px',
    zIndex: '1'
}, EnabledNav).css('overflow', 'hidden'); 
setTimeout(function(){
AttrNav.value = "1";
}, 10); 
}else if(path == 'gallery'){
$('.navs').removeClass('ActiveNav');
$('.Nav2').addClass('ActiveNav');
$('.BodyHandler').css('top', '-100vh');
$('.BodyHandler').eq(1).animate({
    top: '0px',
    zIndex: '1'
}, EnabledNav).css('overflow', 'hidden'); 
setTimeout(function(){
AttrNav.value = "2";
}, 10); 
}else if(path == 'blogs'){
$('.navs').removeClass('ActiveNav');
$('.Nav3').addClass('ActiveNav');
$('.BodyHandler').css('top', '-100vh');
$('.BodyHandler').eq(2).animate({
    top: '0px',
    zIndex: '1'
}, EnabledNav).css('overflow', 'hidden'); 
setTimeout(function(){
AttrNav.value = "3";
}, 10); 
}else if(path == 'memes'){
$('.navs').removeClass('ActiveNav');
$('.Nav4').addClass('ActiveNav');
$('.BodyHandler').css('top', '-100vh');
$('.BodyHandler').eq(3).animate({
    top: '0px',
    zIndex: '1'
}, EnabledNav).css('overflow', 'hidden'); 
setTimeout(function(){
AttrNav.value = "4";
}, 10); 
}else if(path == 'profile'){
$('.navs').removeClass('ActiveNav');
$('.Nav5').addClass('ActiveNav');
$('.BodyHandler').css('top', '-100vh');
$('.BodyHandler').eq(4).animate({
    top: '0px',
    zIndex: '1'
}, EnabledNav).css('overflow', 'hidden'); 
setTimeout(function(){
AttrNav.value = "5";
}, 10); 
}
}else{
$('.Nav1').click()
}
});
 */
