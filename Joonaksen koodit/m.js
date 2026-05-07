
//pelin tarkoitusena oli kerätä 4 paria alle kymmenessä yrityksessä. X:llä ei ole paria.
//pelisttä:puuttuu pelin resetointi, voittamisen tunnistanimen, yrityslisääminen

'use strict';
const nappi = document.querySelector('button');
let clickcount=0
let yritykset=0


let kortit= []
let x;
let y;
function patterns(){



y= Math.random()
x= Math.random();
if (x<0.2){kortit= ['♥','♦','♠','X','♣','♣','♦','♥','♠','X']}
else if (x=>0.2 && x<0.4)
{kortit= ['♦','♥','♣','♦','♠','♠','♣','X','♥','X']}
  else if (x=>0.4 && x<0.6)
  {kortit= ['♣','♠','♦','♥','♣','X','♦','♠','♥','X']}
  else if (x>=0.6 && x<0.8)
  {kortit= ['♦','♥','♣','♦','♠','♠','♣','X','♥','X']}
  else {kortit= ['♦','♣','♥','♣','♠','♠','X','♦','♥','X'
  ]}}



//nappi.addEventListener('click', function(evt){alert('Peli alkaa')
//korttiklik.addEventListener('click', function(evt) {alert(kortti1)})
//});

//const korttiklik = document.querySelector(".grid-container");



const nappi0 = document.querySelector('button');

function aloitus(evt){
  alert('Peli alkaa!');patterns();

}

nappi0.addEventListener('click', aloitus);

const nappi1 = document.querySelector('.item:nth-child(1)');
const nappi2 = document.querySelector('.item:nth-child(2)');
const nappi3 = document.querySelector('.item:nth-child(3)');
const nappi4 = document.querySelector('.item:nth-child(4)');
const nappi5 = document.querySelector('.item:nth-child(5)');
const nappi6 = document.querySelector('.item:nth-child(6)');
const nappi7 = document.querySelector('.item:nth-child(7)');
const nappi8 = document.querySelector('.item:nth-child(8)');
const nappi9 = document.querySelector('.item:nth-child(9)');
function popup(evt){
  alert(kortit[3]);
}


const item1 = document.querySelector('.grid-container .item:nth-child(1)');
function klikkortti1(evt){evt.target.textContent = (kortit[0]);evt.target.style.fontSize = "xx-large";}
item1.addEventListener('click',klikkortti1)

const item2 = document.querySelector('.grid-container .item:nth-child(2)');
function klikkortti2(evt){evt.target.textContent = (kortit[1]);evt.target.style.fontSize = "xx-large";}
item2.addEventListener('click',klikkortti2)

const item3 = document.querySelector('.grid-container .item:nth-child(3)');
function klikkortti3(evt){evt.target.textContent = (kortit[2]);evt.target.style.fontSize = "xx-large";}
item3.addEventListener('click',klikkortti3)

const item4 = document.querySelector('.grid-container .item:nth-child(4)');
function klikkortti4(evt){evt.target.textContent = (kortit[3]);evt.target.style.fontSize = "xx-large";}
item4.addEventListener('click',klikkortti4)

const item5 = document.querySelector('.grid-container .item:nth-child(5)');
function klikkortti5(evt){evt.target.textContent = (kortit[4]);evt.target.style.fontSize = "xx-large";}
item5.addEventListener('click',klikkortti5)

const item6 = document.querySelector('.grid-container .item:nth-child(6)');
function klikkortti6(evt){evt.target.textContent = (kortit[5]);evt.target.style.fontSize = "xx-large";}
item6.addEventListener('click',klikkortti6)

const item7 = document.querySelector('.grid-container .item:nth-child(7)');
function klikkortti7(evt){evt.target.textContent = (kortit[6]);evt.target.style.fontSize = "xx-large";}
item7.addEventListener('click',klikkortti7)

const item8 = document.querySelector('.grid-container .item:nth-child(8)');
function klikkortti8(evt){evt.target.textContent = (kortit[7]);evt.target.style.fontSize = "xx-large";}
item8.addEventListener('click',klikkortti8)

const item9 = document.querySelector('.grid-container .item:nth-child(9)');
function klikkortti9(evt){evt.target.textContent = (kortit[8]);evt.target.style.fontSize = "xx-large";}
item9.addEventListener('click',klikkortti9)





    //MAAT = ["♠", "♥", "♦", "♣"]