const pages=[...document.querySelectorAll('.page')];
const links=[...document.querySelectorAll('nav a')];
const nav=document.querySelector('nav');
const menu=document.querySelector('.menu');
const progress=document.querySelector('.progress span');

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id=entry.target.id;
      links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));
    }
  });
},{threshold:.45});
pages.forEach(p=>observer.observe(p));

menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
});
links.forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded','false');
}));

function progressBar(){
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.height=(max>0?(scrollY/max)*100:0)+'%';
}
addEventListener('scroll',progressBar,{passive:true});
addEventListener('resize',progressBar);
progressBar();
