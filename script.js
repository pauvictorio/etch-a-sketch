// Grid
const grid = document.querySelector('.grid');

let color = 'black';
let rgb = false;


// Handle RGB
function createRGB() {
  const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

  // Assign random values to R, G, B
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);

  rgb = true;

  return `rgb(${r}, ${g}, ${b})`;
}


// Handle grid creation
function createGrid(size) {
  const activateGrid = document.querySelector('.btn-grid-activate');

  // Restart grid whenever createGrid is called
  while (grid.firstChild) {
    grid.innerHTML = '';
  }

  // Loop size number of times (from slider value)
  for (let i = 1; i <= size * size; i++) {

    // Create div inside grid
    const gridElement = document.createElement('div');

    gridElement.classList.add('grid-element');

    // Change size of grid-elements
    gridElement.style.height = `${1 / size * 100}%`;
    gridElement.style.width = `${1 / size * 100}%`;

    grid.appendChild(gridElement);

    // Change grid-elements' color on mouseover event
    gridElement.addEventListener('mouseover', () => {
      if (rgb) gridElement.style.background = createRGB();

      else { gridElement.style.background = color; }
    });

    // Toggle grid border
    activateGrid.addEventListener('click', () => {
      gridElement.classList.toggle('grid-active')
    });
  }
}


// Menu
const clearButton = document.querySelector('.clear');
const colorPicker = document.querySelector('#color');
const toggleRGB = document.querySelector('.rgb');
const slider = document.querySelector('.slider');
const sliderText = document.querySelector('.slider-text');

let mousedown = false;

// Handle range slider
function sliderSize() {
  // Change value of slider
  this.setAttribute('value', this.value);

  // Change text inside to indicate the size
  sliderText.textContent = `${this.value} x ${this.value}`;

  if (mousedown) {
    createGrid(this.value);
  }
}


// Change color on input
colorPicker.addEventListener('input', () => {
  // Turn off RGB
  rgb = false;

  color = colorPicker.value;
})


// Toggle RGB
toggleRGB.addEventListener('click', createRGB);


// Clear the grid's color
clearButton.addEventListener('click', e => {
  createGrid(slider.value);
});


// Add event listeners to range slider
slider.addEventListener('click', sliderSize);
slider.addEventListener('mousedown', () => mousedown = true);
slider.addEventListener('mouseup', () => mousedown = false);
slider.addEventListener('mousemove', sliderSize);


// Load the grid
window.addEventListener('load', () => {
  sliderText.textContent = `${slider.value} x ${slider.value}`;
  createGrid(slider.value);
});