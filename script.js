const pages=[...document.querySelectorAll('.page')];
const links=[...document.querySelectorAll('nav a')];
const nav=document.getElementById('nav');
const menu=document.querySelector('.menu');
const progress=document.querySelector('.progress span');

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id));
    }
  });
},{threshold:.55});
pages.forEach(p=>observer.observe(p));

document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded','false');
}));
menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
});

function updateProgress(){
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.height=(max>0?(scrollY/max)*100:0)+'%';
}
addEventListener('scroll',updateProgress,{passive:true});
addEventListener('resize',updateProgress);updateProgress();

if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  addEventListener('pointermove',e=>{
    document.documentElement.style.setProperty('--mx',e.clientX+'px');
    document.documentElement.style.setProperty('--my',e.clientY+'px');
  },{passive:true});
}
