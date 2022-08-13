const slider = document.querySelector('.slider');
const text = document.querySelector('.text');
const etch = document.querySelector('.etch');

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

function changeDivSize() {
  const canvs = document.querySelectorAll('.canv');

  canvs.forEach(canv => {
    canv.style.width = `${1 / slider.value * 100}%`;
    canv.style.height = `${1 / slider.value * 100}%`;
  });
}

function generateDivs(numDivs) {
  etch.innerHTML = '';
  for (let i = 1; i <= numDivs; i++) {
    for (let j = 1; j <= numDivs; j++) {
      etch.innerHTML += `<div class="canv"></div>`;
    } 
  }
  changeDivSize();
}


function slideSizer() {
  this.setAttribute('value', this.value);
  text.textContent = `${this.value} x ${this.value}`;

  generateDivs(this.value);  
}


slider.addEventListener('click', slideSizer);
slider.addEventListener('mousemove', debounce(slideSizer));


window.addEventListener('load', () => {
  text.textContent = `${slider.value} x ${slider.value}`;
  generateDivs(slider.value);
});