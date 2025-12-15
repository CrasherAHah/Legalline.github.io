let slides=document.querySelectorAll('.slide');
let dots=document.querySelectorAll('.dot');
let idx=0;

function show(n){
  slides.forEach(s=>s.classList.remove('active'));
  dots.forEach(d=>d.classList.remove('active'));
  slides[n].classList.add('active');
  dots[n].classList.add('active');
  idx=n;
}

document.querySelector('.next').onclick=()=>show((idx+1)%slides.length);
document.querySelector('.prev').onclick=()=>show((idx-1+slides.length)%slides.length);

dots.forEach((d,i)=>d.onclick=()=>show(i));

show(0);
