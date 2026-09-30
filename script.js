const sections = [...document.querySelectorAll('.art-section')];
const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu-btn');
const progress = document.querySelector('.progress span');

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      const id = entry.target.id;
      document.querySelectorAll('.nav a').forEach(link=>{
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
},{threshold:.35});

sections.forEach(section=>observer.observe(section));

menu.addEventListener('click',()=>{
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav a').forEach(link=>{
  link.addEventListener('click',()=>{
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
  });
});

function updateProgress(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.height = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
}
window.addEventListener('scroll', updateProgress, {passive:true});
window.addEventListener('resize', updateProgress);
updateProgress();
