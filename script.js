const pages=[...document.querySelectorAll('.page')];
const nav=document.querySelector('.nav');
const menu=document.querySelector('.menu');
const progress=document.querySelector('.progress span');

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');

      const id=entry.target.id;
      document.querySelectorAll('.nav a').forEach(link=>{
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + id
        );
      });
    }
  });
},{threshold:.35});

pages.forEach(page=>observer.observe(page));

menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
});

document.querySelectorAll('.nav a').forEach(link=>{
  link.addEventListener('click',()=>{
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
  });
});

function updateProgress(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const value=max>0 ? (window.scrollY/max)*100 : 0;
  progress.style.height=value+'%';
}

window.addEventListener('scroll',updateProgress,{passive:true});
window.addEventListener('resize',updateProgress);
updateProgress();
