const sections=[...document.querySelectorAll('.svg-section')];
const nav=document.querySelector('nav');
const menu=document.querySelector('.menu');
const progress=document.querySelector('.progress span');

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      const id=entry.target.id;
      document.querySelectorAll('nav a').forEach(a=>{
        a.classList.toggle('active',a.getAttribute('href')==='#'+id);
      });
    }
  });
},{threshold:.35});
sections.forEach(s=>observer.observe(s));

menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',open);
});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded','false');
}));

function updateProgress(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.height=(max>0 ? (scrollY/max)*100 : 0)+'%';
}
window.addEventListener('scroll',updateProgress,{passive:true});
updateProgress();

if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  window.addEventListener('pointermove',e=>{
    document.documentElement.style.setProperty('--mx',e.clientX+'px');
    document.documentElement.style.setProperty('--my',e.clientY+'px');
  },{passive:true});
}
