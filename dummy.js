var a1=document.getElementById('btn1');
a1.addEventListener('click',colour);

var count=0;
function colour(){
var a=['red','pink','orange'];
if(count==a.length){
    count=0;
}
var d=document.getElementById('outer');
d.style.backgroundColor=a[count];
count++;
}
var a2=document.getElementById('btn2');
a2.addEventListener('click', myFunction);
var count1=0;
function myFunction(){
 var s=['circle','rectangle'];
    if(count1==s.length){
        count1=0;
    }
    
  document.getElementById("myDIV").className = s[count1];
  count1++;
}


var a2=document.getElementById('btn2');
a2.addEventListener('click', myFunction);
var count1=0;
function myFunction() {
 var s=['circle','rectangle'];
    if(count1==s.length){
        count1=0;
    }
  document.getElementById("inner").className = s[count1];
  count1++;
}