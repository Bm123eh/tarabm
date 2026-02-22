const colors={
'rgb(0, 0, 255)':'blue',
'rgb(255, 0, 0)':'red',
'rgb(0, 128, 0)':'green',
'rgb(255, 255, 0)':'yellow',
'rgb(0, 0, 0)':'black',
'rgb(255, 255, 255)':'white',
'rgb(128, 128, 128)':'gray',
'rgb(255, 165, 0)':'orange',
'rgb(128, 0, 128)':'purple'
};

$.fn.color=function(a){
if(a===undefined){
let rgb=this.first().css('color');
return colors[rgb]||rgb;
}
return this.each(function(){
$(this).css('color',a);
});
};

$.fn.bg=function(a){
if(a===undefined){
let rgb=this.first().css('background-color');
return colors[rgb]||rgb;
}
return this.each(function(){
$(this).css('background-color',a);
});
};

$.fn.border=function(a){
return this.each(function(){
$(this).css('border',a);
});
};

$.fn.borderC=function(a){
if(a===undefined){
let rgb=this.first().css('border-color');
let borderStyle=this.first().css('border-style');
if(borderStyle==='none') {
alert('No border found');
}
return colors[rgb]||rgb;
}
return this.each(function(){
$(this).css('border-color',a);
});
};

$.fn.flex = function() {
return this.each(function() {
$(this).css("display", "flex");
});
};

$.fn.ht = function(a) {
if(a === undefined) return this.first().height();
if(a === true) return this.first().outerHeight();
return this.each(function() {
$(this).css('height', a);
});
};

$.fn.wd = function(a) {
if(a === undefined) return this.first().width();
if(a === true) return this.first().outerWidth();
return this.each(function() {
$(this).css('width', a);
});
};

$.fn.clamp = function(properties, rangeKey, minVal, maxVal) {
return this.each(function() {
var el = $(this);
var presets = {
a: [301, 600],
b: [601, 800],
c: [801, 1000],
d: [1001, 1200]
};
var range = presets[rangeKey] || rangeKey.split('-').map(Number);
var minW = range[0], maxW = range[1];

var isPercent = String(minVal).includes('%') || String(maxVal).includes('%');
var unit = isPercent ? '%' : 'px';

var min = parseFloat(minVal);
var max = parseFloat(maxVal);
var diff = max - min;
var scale = (diff * 100) / (maxW - minW);
var base = min - scale * (minW / 100);

var value = `clamp(${min}${unit}, ${base.toFixed(4)}${unit} + ${scale.toFixed(4)}vw, ${max}${unit})`;

properties.split(' ').forEach(function(prop) {
el.css(prop, value);
});
});
};

function setBrain(k,v){localStorage.setItem(k,v)}
function getBrain(k){return localStorage.getItem(k)}
function zapBrain(k){localStorage.removeItem(k)}

$.fn.readonly=function(a = true){
return this.each(function() {
$(this).attr('readonly', a);
});
}

function allot(a,b){
let o={};o[a]=true;
b.split(' ').forEach(c=>{
let el=$('.'+c);
if(!el.is('input,textarea')){
PostError('.allot()','data is not input or textarea');
return;
}
o[c]=el.val();
});
return o;
}

$.fn.disabled=function(a = true){
return this.each(function() {
$(this).attr('disabled', a);
});
}

$.fn.maxlength = function(a){
return this.each(function() {
$(this).on('keyup change input', function() {
$(this).val($(this).val().substring(0, a));
});
});
};

$.fn.resetForm = function() {
  return this.each(function() {
    this.reset();
  });
};

function Responsive(...args){
 let rules=''
 for(let i=0;i<args.length;i+=2){
  let [minW,maxW]=args[i].split('-').map(Number)
  let css=args[i+1]

  css=css.replace(/(\d+)%-(\d+)%/g,(m,min,max)=>{
   return `clamp(${min}%, calc(${min}% + (${max}-${min}) * ((100vw - ${minW}px)/(${maxW}-${minW}))), ${max}%)`
  })

  rules+=`@media(min-width:${minW}px) and (max-width:${maxW}px){${css}}`
 }

 let style=document.querySelector('#ResponsiveStyles')||document.createElement('style')
 style.id='ResponsiveStyles'
 style.textContent=rules
 document.head.appendChild(style)
}

$.fn.gap=function(a){
if(a===undefined){
let b=this.first().css('gap');
let cls=this.first().attr('class')?.split(' ')[0];
let id=this.first().attr('id');
let identifier=cls?"class: '"+cls+"'":"id: '"+id+"'";
if(b==='' || b==='auto'){
if(window.outerWidth===400){
console.error('The gap of '+identifier+' is auto or not set. Unable to calculate number.');
}else{
alert('The gap of '+identifier+' is auto or not set. Unable to calculate number.');
}
return NaN;
}
return parseInt(b);
}
return this.each(function(){
$(this).css('gap',a);
});
};

$.fn.pd = function(a) {
if(a === undefined) return parseInt(this.first().css('padding'));
return this.each(function() {
$(this).css('padding', a);
});
};

$.fn.pdT = function(a) {
if(a === undefined) return parseInt(this.first().css('padding-top'));
return this.each(function() {
$(this).css('padding-top', a);
});
};

$.fn.pdB = function(a) {
if(a === undefined) return parseInt(this.first().css('padding-bottom'));
return this.each(function() {
$(this).css('padding-bottom', a);
});
};

$.fn.pdR = function(a) {
if(a === undefined) return parseInt(this.first().css('padding-right'));
return this.each(function() {
$(this).css('padding-right', a);
});
};

$.fn.pdL = function(a) {
if(a === undefined) return parseInt(this.first().css('padding-left'));
return this.each(function() {
$(this).css('padding-left', a);
});
};

$.fn.top=function(a){
if(a===undefined){
let b=this.first().css('top');
let cls=this.first().attr('class')?.split(' ')[0];
let id=this.first().attr('id');
let identifier=cls?"class: '"+cls+"'":"id: '"+id+"'";
if(b==='auto'){
if(window.outerWidth===400){
console.error('The top of '+identifier+' is auto. Unable to calculate number.');
}else{
alert('The top of '+identifier+' is auto. Unable to calculate number.');
}
return NaN;
}
return parseInt(b);
}
return this.each(function(){
$(this).css('top',a);
});
};

$.fn.right=function(a){
if(a===undefined){
let b=this.first().css('right');
let cls=this.first().attr('class')?.split(' ')[0];
let id=this.first().attr('id');
let identifier=cls?"class: '"+cls+"'":"id: '"+id+"'";
if(b==='auto'){
if(window.outerWidth===400){
console.error('The right of '+identifier+' is auto. Unable to calculate number.');
}else{
alert('The right of '+identifier+' is auto. Unable to calculate number.');
}
return NaN;
}
return parseInt(b);
alert('Functionized');
}
return this.each(function(){
$(this).css('right',a);
});
};

$.fn.bottom=function(a){
if(a===undefined){
let b=this.first().css('bottom');
let cls=this.first().attr('class')?.split(' ')[0];
let id=this.first().attr('id');
let identifier=cls?"class: '"+cls+"'":"id: '"+id+"'";
if(b==='auto'){
if(window.outerWidth===400){
console.error('The bottom of '+identifier+' is auto. Unable to calculate number.');
}else{
alert('The bottom of '+identifier+' is auto. Unable to calculate number.');
}
return NaN;
}
return parseInt(b);
}
return this.each(function(){
$(this).css('bottom',a);
});
};

$.fn.left=function(a){
if(a===undefined){
let b=this.first().css('left');
let cls=this.first().attr('class')?.split(' ')[0];
let id=this.first().attr('id');
let identifier=cls?"class: '"+cls+"'":"id: '"+id+"'";
if(b==='auto'){
if(window.outerWidth===400){
console.error('The left of '+identifier+' is auto. Unable to calculate number.');
}else{
alert('The left of '+identifier+' is auto. Unable to calculate number.');
}
return NaN;
}
return parseInt(b);
}
return this.each(function(){
$(this).css('left',a);
});
};

$.fn.flexToggle = function(animate = false, duration = 400, callback = () => {}) {
 return this.each(function() {
  const $el = $(this);
  if ($el.css("display") === "none") {
   if (animate) {
    $el.css("display", "flex").hide().slideDown(duration, callback);
   } else {
    $el.css("display", "flex");
    callback();
   }
  } else {
   if (animate) {
    $el.slideUp(duration, function() {
     $el.css("display", "none");
     callback();
    });
   } else {
    $el.css("display", "none");
    callback();
   }
  }
 });
};

$.fn.flexDown = function(duration = 400) {
 return this.each(function() {
  const $el = $(this);
   $el.css("display", "flex").hide().slideDown(duration);
 });
};

$.fn.heightDown = function(display = 'block', duration = 400, callback) {
if (typeof display === 'number') {
duration = display;
display = 'block';
}
return this.each(function() {
var el = $(this);
var autoHeight = el.css('height', 'auto').outerHeight();
el.css('height', 0).css('display', display).animate({ height: autoHeight }, duration, 'linear', function() {
el.css('height', 'auto');
if (callback && typeof callback === 'function') callback();
});
});
};

$.fn.heightUp = function(duration = 400, callback) {
return this.each(function() {
var el = $(this);
var currentHeight = el.outerHeight();
el.animate({ height: 0 }, duration, 'linear', function() {
el.css('display', 'none');
if (callback && typeof callback === 'function') callback();
});
});
};


$.fn.flexToggle = function() {
return this.each(function() {
let a = $(this).css('display');
$(this).css('display', a == 'flex' ? 'none' : 'flex');
    });
};

$.fn.flexCenter = function() {
return this.each(function() {
$(this).css({
    'display': 'flex',
    'justify-content': 'center',
    'align-items': 'center'
});      
   });
};

$.fn.borderR = function(a) {
return this.each(function() {
$(this).css('border-radius', a);      
   });
};



$.fn.popUp = function(a, b) {
return this.each(function() {
let duration = 400, display = 'block';
if (typeof a === 'number') {
duration = a;
if (typeof b === 'string') display = b;
} else if (typeof a === 'string') {
display = a;
}
$(this).css({
'transform': 'scale(0)',
'display': display,
'transition': `transform ${duration}ms`
});
setTimeout(() => {
$(this).css('transform', 'scale(1)');
}, 50);
});
};

$.fn.addFilter = function(value = '5px') {
 return this.each(function() {
  const $target = $(this);
  const filterValue = (typeof value === 'string' && value.includes('px')) ? value : `${value}px`;
  $('body *').not($target.add($target.find('*'))).not('.UIBanner, .Loader, .UIBanner2, .UIBanner *, .UIBanner2 *')
   .css({
    'filter': `blur(${filterValue})`,
    'pointer-events': 'none'
   });
  $target.add($target.find('*')).css('pointer-events', 'auto');
  document.querySelector('body').style.touchAction = "none";
 });
};

$.fn.removeFilter = function() {
 return this.each(function() {
  const $target = $(this);
  $('body *').not($target.add($target.find('*'))).not('.UIBanner, .UIBanner2, .UIBanner *, .UIBanner2 *')
   .css({
    'filter': '',
    'pointer-events': ''
   });
  document.querySelector('body').style.touchAction = "pan-down";
 });
};

function hidePopUpForm(){
$('.BGPopDown').hide();
}

function PopUpForm(element, animate='show', filter=null){
 const bg = document.querySelector('.BGPopDown')
 const body = document.body

 bg.innerHTML = ''
 const el = (typeof element === 'string') ? $(element)[0] : element
 bg.append(el);
 el.dataset.animate = animate

 bg.style.pointerEvents = 'auto'
 body.classList.add('no-scroll')
 bg.style.transition = 'background 0.3s, backdrop-filter 0.3s'
 bg.style.display = 'block'

 // set filter / bg
 if(filter != null){
  if(filter >= 1){ bg.style.backdropFilter = `blur(${filter}px)`; bg.style.background='transparent' }
  else{ bg.style.background=`rgba(0,0,0,${filter})`; bg.style.backdropFilter='none' }
 }else{ bg.style.backdropFilter='none'; bg.style.background='transparent' }

 $(el).hide()

 // show animation
 switch(animate){
  case 'slideDown': $(el).slideDown(200); break
  case 'slideUp': $(el).slideUp(200); break
  case 'slideLeft': $(el).slideLeft(200); break
  case 'slideRight': $(el).slideRight(200); break
  default: $(el).show()
 }

 // click outside to hide
 bg.onclick = e=>{
  if(e.target !== bg) return
  const el = bg.children[0]
  if(!el) return

  // determine hide animation
  let hideAnim='show'
  switch(el.dataset.animate){
   case 'slideDown': hideAnim='slideUp'; break
   case 'slideUp': hideAnim='slideDown'; break
   case 'slideLeft': hideAnim='slideRight'; break
   case 'slideRight': hideAnim='slideLeft'; break
  }

  // fade out BG
  bg.style.background='transparent'
  bg.style.backdropFilter='none'
exitAjax();
  const end = ()=>{
   bg.style.pointerEvents='none'
   bg.innerHTML=''
   body.classList.remove('no-scroll');
  }

  // hide animation
  switch(hideAnim){
   case 'slideUp': $(el).slideUp(200, end); break
   case 'slideDown': $(el).slideDown(200, end); break
   case 'slideLeft': $(el).slideLeft(200, end); break
   case 'slideRight': $(el).slideRight(200, end); break
   default: $(el).hide(); end()
  }
 }
}

$.fn.slideRight = function(duration=400){
 return this.each(function(){
 alert('Functionized');
  let $el = $(this)
  $el.stop(true) // stop ongoing animation

  // get all original dimensions and paddings/margins
  let style = window.getComputedStyle(this)
  let w = $el.outerWidth()
  let pL = parseFloat(style.paddingLeft)
  let pR = parseFloat(style.paddingRight)
  let mL = parseFloat(style.marginLeft)
  let mR = parseFloat(style.marginRight)

  // prepare element for horizontal animation
  $el.css({
   display: 'block',
   overflow: 'hidden',
   width: 0,
   paddingLeft: 0,
   paddingRight: 0,
   marginLeft: 0,
   marginRight: 0
  })

  $el.animate({
   width: w,
   paddingLeft: pL,
   paddingRight: pR,
   marginLeft: mL,
   marginRight: mR
  }, duration, ()=>{
   $el.css({overflow:'', width:'', paddingLeft:'', paddingRight:'', marginLeft:'', marginRight:''})
  })
 })
}

$.fn.slideLeft = function(duration=400){
 return this.each(function(){
  let $el = $(this)
  $el.stop(true)
  
  let style = window.getComputedStyle(this)
  let pL = parseFloat(style.paddingLeft)
  let pR = parseFloat(style.paddingRight)
  let mL = parseFloat(style.marginLeft)
  let mR = parseFloat(style.marginRight)

  $el.css({overflow:'hidden'})
  $el.animate({
   width: 0,
   paddingLeft: 0,
   paddingRight: 0,
   marginLeft: 0,
   marginRight: 0
  }, duration, ()=>{
   $el.hide()
   $el.css({width:'', paddingLeft:'', paddingRight:'', marginLeft:'', marginRight:'', overflow:''})
  })
 })
}

$.fn.gridCol = function(a, b) {
 return this.css('grid-template-columns', `repeat(${a}, minmax(${b}%, 1fr))`);
};

$.fn.popDown = function(duration = 400) {
return this.each(function() {
$(this).css({
'transform': 'scale(1)',
'transition': `transform ${duration}ms`
});
setTimeout(() => {
$(this).css('transform', 'scale(0)');
}, 10);
setTimeout(() => {
$(this).css('display', 'none');
}, duration + 10);
});
};

$.fn.ontouchable = function(a = true) {
return this.each(function() {
if(a){
$(this).css({
'z-index': -1,
'pointer-events': 'none',
'opacity': 0
});      
}else{
$(this).css({
'z-index': 'auto',
'pointer-events': 'auto',
'opacity': 1
});      
}
   });
};

$.fn.togglePop = function(a, b) {
return this.each(function() {
const $el = $(this);
let duration = 400, display = 'block';

if (typeof a === 'number') {
duration = a;
if (typeof b === 'string') display = b;
} else if (typeof a === 'string') {
display = a;
}

if (!$el.is(':visible')) {
$el.popUp(duration, display);
} else {
$el.popDown(duration);
}
});
};

$.fn.zI = function(a = 'auto') {
return this.each(function() {
$(this).css('z-index', a);      
   });
};

$.fn.transxPx = function(a) {
  if (a === undefined) {
let b = window.getComputedStyle(this[0]).transform;
if (b === 'none') return 0;
let c = b.split(',');
let d = parseFloat(c[4].trim());
    return d;
}
return this.each(function() {
let b = window.getComputedStyle(this).transform;
let c;
if (b === 'none') {
  c = ['1', '0', '0', '1', '0', '0'];
} else {
  b = b.replace('matrix(', '').replace(')', '');
  c = b.split(',');
}
  let aa = parseFloat(c[0].trim());
  let bb = parseFloat(c[1].trim());
  let cc = parseFloat(c[2].trim());
  let dd = parseFloat(c[3].trim());
  let ee = parseFloat(c[5].trim());
  $(this).css('transform', `matrix(${aa},${bb},${cc},${dd},${a},${ee})`);
});
};

$.fn.transxPt = function(a) {
  if (a === undefined) {
let b = window.getComputedStyle(this[0]).transform;
if (b === 'none') return 0;
let c = b.split(',');
let d = parseFloat(c[4].trim());
let e = this.outerWidth();
let f = (d / e) * 100;
return f;
    
  }
return this.each(function() {
let e = $(this).outerWidth();
let h = (a / 100) * e;
let b = window.getComputedStyle(this).transform;
let c;
if (b === 'none') {
  c = ['1', '0', '0', '1', '0', '0'];
} else {
  b = b.replace('matrix(', '').replace(')', '');
  c = b.split(',');
}
  let aa = parseFloat(c[0].trim());
  let bb = parseFloat(c[1].trim());
  let cc = parseFloat(c[2].trim());
  let dd = parseFloat(c[3].trim());
  let ee = parseFloat(c[5].trim());
  $(this).css('transform', `matrix(${aa},${bb},${cc},${dd},${h},${ee})`);
});
};

$.fn.transyPx = function(a) {
  if (a === undefined) {
let b = window.getComputedStyle(this[0]).transform;  
if (b === 'none') return 0;
let c = b.split(',');
let d = parseFloat(c[5].trim());
    return d;
    
}
return this.each(function() {
let b = window.getComputedStyle(this).transform;
let c;
if (b === 'none') {
  c = ['1', '0', '0', '1', '0', '0'];
} else {
  b = b.replace('matrix(', '').replace(')', '');
  c = b.split(',');
}
  let aa = parseFloat(c[0].trim());
  let bb = parseFloat(c[1].trim());
  let cc = parseFloat(c[2].trim());
  let dd = parseFloat(c[3].trim());
  let ee = parseFloat(c[4].trim());
  $(this).css('transform', `matrix(${aa},${bb},${cc},${dd},${ee},${a})`);
});
}

$.fn.transyPt = function(a) {
  if (a === undefined) {
let b = window.getComputedStyle(this[0]).transform;
if (b === 'none') return 0;
let c = b.split(',');
let d = parseFloat(c[5].trim());
let e = this.outerHeight();
let f = (d / e) * 100;
return f;
    
  }
return this.each(function() {
let e = $(this).outerHeight();
let h = (a / 100) * e;
let b = window.getComputedStyle(this).transform;
let c;
if (b === 'none') {
  c = ['1', '0', '0', '1', '0', '0'];
} else {
  b = b.replace('matrix(', '').replace(')', '');
  c = b.split(',');
}
  let aa = parseFloat(c[0].trim());
  let bb = parseFloat(c[1].trim());
  let cc = parseFloat(c[2].trim());
  let dd = parseFloat(c[3].trim());
  let ee = parseFloat(c[4].trim());
  $(this).css('transform', `matrix(${aa},${bb},${cc},${dd},${ee},${h})`);
});
};

$.fn.transPx = function(a = 0, b = 0) {
return this.each(function() {
$(this).transxPx(a).transyPx(b)    
   });
};

$.fn.transPt = function(a = 0, b = 0) {
return this.each(function() {
$(this).transxPt(a).transyPt(b)    
   });
};

$.fn.centered = function(a = 'rel') {
return this.each(function() {
if(a == 'flex'){
$(this).parent().flex().css({
    'justify-content': 'center',
    'align-items': 'center'
})
}else if(a == 'abs'){
$(this).css({
    'top': '50%',
    'left': '50%'
}).transPt(-50,-50).pos('abs').parent().pos('rel');
}else{
let x = $(window).outerWidth(); 
let y = $(window).outerHeight();   
let m = $(this).outerWidth();
let n = $(this).outerHeight();
let e = (x - m) / 2;
let f = (y - n) / 2;
$(this).css({
    'top': f,
    'left': e
}).pos('rel');
}
   });
};

$.fn.time = function(a, callback) {
return this.each(function() {
let duration = 400;
let transitionValue = 'all 0.4s linear';
if (typeof a === 'function') {
callback = a;
a = undefined;
}
if (a !== undefined) {
transitionValue = a;
let match = a.match(/(\d+\.?\d*)s/);
if (match) duration = parseFloat(match[1]) * 1000;
}
$(this).css('transition', transitionValue);
if (typeof callback === 'function') {
setTimeout(() => callback.call(this), duration);
}
});
};

$.fn.require=function(type,length){
 let input=this;
 let val=input.val().trim();
 let result=true; // true = valid, else string error code

 if(!val){
  result="Error1"; // empty
 }else if(type==='email'){
  if(!validateEmail(val)) result="Error2"; // invalid email
 }else if(type==='text'){
  if(length==null) throw new Error("Text type requires length");
  if(!validateText(length,val)) result="Error2"; // below required length
 }

 if(result!==true){
  input.css('border-color','red').focus();
 }else{
  input.css('border-color','');
 }

 return result;
}

$.fn.typing=function(handler){
return this.on('input keyup change', function(e){
$('.UIBanner, .UIBanner2').stop(true,true).hide().removeClass('Active Active2').css('opacity',1);
if(typeof handler==='function') handler.call(this,e);
});
}

$.fn.swapLayer = function(a, b) {
 $(a).css('z-index', 200)
 $(b).css('z-index', -1)
 return this
}

$.fn.pos = function(a = 'sta') {
return this.each(function() {
if(a == 'rel'){
$(this).css('position', 'relative');  
}else if(a == 'abs'){
$(this).css('position', 'absolute');
}else if(a == 'fix'){
$(this).css('position', 'fixed');
}else if(a == 'sti'){
$(this).css('position', 'sticky');
}else{
$(this).css('position', 'static');
}
   });
};

$.fn.beforeSubmit = function(txt){
  return this.prop('disabled', true).css('background', 'grey').text(txt);
}
$.fn.afterSubmit = function(txt){
  return this.prop('disabled', false).css('background', 'blue').text(txt);
}

$.fn.param = function(a = 'alert') {
 return this.each(function() {
  const $el = $(this);
let transX1 = $el.transxPx();
let transX2 = $el.transxPt();
let transY1 = $el.transyPx();
let transY2 = $el.transyPt();  
  let visibility = $el.is(':visible') ? 'Yes' : 'No';

  // Get parent
  let parent = $el.parent();
  let parentIdentifier = parent.length ? (parent.attr('class') ? '.' + parent.attr('class').split(' ')[0] : parent.attr('id') ? '#' + parent.attr('id') : 'No Parent') : 'No Parent';

  // Get previous and next elements
  let prev = $el.prev();
  let next = $el.next();

  function getIdentifier(el) {
   return el.length ? (el.attr('class') ? '.' + el.attr('class').split(' ')[0] : el.attr('id') ? '#' + el.attr('id') : '<' + el.prop('tagName').toLowerCase() + '>') : 'None';
  }

  let divBefore = getIdentifier(prev);
  let divNext = getIdentifier(next);

  let x = 'Width: ' + $el.outerWidth() + 
          ' Height: ' + $el.outerHeight() + 
          '\nBackground: ' + $el.css('background-color') + 
          '\nColor: ' + $el.css('color') + 
          '\nBorderRadius: '  + $el.css('border-radius') + 
          '\nBorder: ' + $el.css('border') + 
          '\nMargin: ' + $el.css('top') + ' ' + $el.css('left') + ' ' + $el.css('bottom') + ' ' + $el.css('right') + 
          '\nDisplay is ' + $el.css('display') + ' with ' + $el.css('justify-content') + 
          '\nPosition: ' + $el.css('position') + 
          '\nX-Axis: ' + transX1 + 'px || ' + transX2 + '%' +
          '\nY-Axis: ' + transY1 + 'px || ' + transY2 + '%' +
          '\nVisible?: ' + visibility + 
          '\nOverflow: ' + $el.css('overflow') + 
          '\nParent: ' + parentIdentifier +
          '\nSee Between: ' + divBefore + ' and ' + divNext;

  if(a == 'console'){
   console.log(x);
  } else if(a == 'alert'){
   alert(x);
  } else {
   console.warn('.param() uses two parameters: "alert" for alert() or "console" for console.log()');
  }
 });
};
