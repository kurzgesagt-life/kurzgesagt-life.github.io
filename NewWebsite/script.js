// Controls
const prtclMax = 100;
const prtclRad = 1.5;
const prtclDel = 80;
const prtclSpd = 0.5;
const prtclFade = 0.04;

const prtclColBg = "#15151D";
const prtclCol0 = "#04f";
const prtclCol1 = "#026";
const prtclCol2 = "#f04";

var title = document.getElementsByClassName('title')[0];
canvas.width = window.innerWidth;
canvas.height = 500;
let ctx = canvas.getContext("2d");
var stopAnimation = 0;

let particles = [];

function Particle() {
  let r = Math.random();
  this.life = r * 1000;
  this.x = canvas.width / 2 + (Math.random() * 200 - Math.random() * 200);
  this.y = canvas.height / 2 + (Math.random() * 200 - Math.random() * 200);
  this.ang = 0;
  this.spd = 0.4 + Math.random() * 0.8;

  this.rad =
    r > 0.2 ? Math.random() * prtclRad : Math.random() * prtclRad * 1.5;
  this.rad = r > 0.8 ? Math.random() * prtclRad * 2 : this.rad;
  this.col = r > 0.7 ? prtclCol0 : prtclCol1;
  this.col = r > 0.9 ? prtclCol2 : this.col;
}
Particle.prototype.render = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
  ctx.lineWidth = 2;
  ctx.fillStyle = this.col;
  ctx.fill();
  ctx.closePath();
};
Particle.prototype.update = function () {
  this.x += prtclSpd * Math.cos(this.ang) * this.spd;
  this.y += prtclSpd * Math.sin(this.ang) * this.spd;
  this.ang += Math.random() * 0.4 - 0.2;
  this.spd += (Math.random() - 0.5) * 0.05;

  if (this.x < 0 || this.x > canvas.width - this.rad) {
    return false;
  }
  if (this.y < 0 || this.y > canvas.height - this.rad) {
    return false;
  }
  this.life++;
  return true;
};

function rnd(min, max) {
  return Math.random() * (max - min) + min;
}

function addParticles(num) {
  let pushParticle = function () {
    if (particles.length < prtclMax) particles.push(new Particle());
  };
  for (let i = 0; i < num; ++i) {
    setTimeout(pushParticle, i * prtclDel);
  }
}

function scrolldown() {
  if( window.scrollY < window.innerHeight) {
    $('body,html').animate({scrollTop: window.innerHeight}, 800);
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    console.log(top);

  }

}

function pageScroll() {
  window.scrollBy(0,1);
  scrolldelay = setTimeout(pageScroll,10);
}

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  clear();
  particles = [];
  addParticles(prtclMax);
}

function loop() {
  particles = particles.filter((p) => p.update());
  particles.forEach((p) => {
      p.render();
  });
  fade();
  if (stopAnimation != 1) {
      requestAnimationFrame(loop);
  }
}

function clear() {
  ctx.fillStyle = prtclColBg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function fade() {
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = prtclFade;
  clear();
  //ctx.globalCompositeOperation = "lighten";
  ctx.globalAlpha = 1;
}

window.onload = function () {
  window.onresize = () => init();

  init();
  loop();
};
