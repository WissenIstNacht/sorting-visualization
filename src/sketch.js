/**
 * @author WissenIstNacht
 * Date: 17-11-2020
 *
 * This file holds a canvas-based SPA visualizing various sorting algorithms.
 *
 * It been built using the P5.js library.
 */

function setup() {
  s = new StateManager();
  BG = getBackgroundColor();
  RED = color(255, 152, 178);
  GREEN = color(152, 255, 204);
  BLUE = color(152, 229, 255);

  // initialize inputs
  b_run = document.getElementById('b_run');
  b_run.onclick = () => {
    s.pressedRun();
  };

  b_reset = document.getElementById('b_reset');
  b_reset.onclick = () => {
    s.pressedReset();
  };
  b_reset.disabled = true;

  dd_form = document.getElementById('dd_form');
  dd_form.addEventListener('change', ev => {
    let descriptions = document.getElementsByClassName('description');

    function itemHiding(item, descriptionType) {
      let isSelected = item.id === descriptionType;
      if (isSelected) {
        item.removeAttribute('hidden');
      } else {
        item.setAttribute('hidden', true);
      }
    }

    switch (ev.target.value) {
      case 'bubbleSort':
        for (let i = 0; i < descriptions.length; i++) {
          itemHiding(descriptions.item(i), 'bubbleSortDescription');
        }
        break;
      case 'insertionSort':
        for (let i = 0; i < descriptions.length; i++) {
          itemHiding(descriptions.item(i), 'insertionSortDescription');
        }
        break;
      // Add cases for new algorithms.
      default:
        break;
    }
  });

  //initialize canvas
  canvasHolder = select('#canvasHolder');
  const {width: canvasWidth} = canvasHolder?.size();
  const canavasHeight = (canvasWidth * 2) / 3;
  canvas = createCanvas(canvasWidth, canavasHeight);
  canvas.parent(canvasHolder);
  background(BG);
}

function draw() {
  if (s.is_running) {
    s.sorter.step();
  }
}

function getBackgroundColor() {
  const bgHex = window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches
    ? '#434c5e'
    : 'white';
  return color(bgHex);
}
