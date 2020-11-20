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
  RED = color(255, 152, 178);
  GREEN = color(152, 255, 204);
  BLUE = color(152, 229, 255);

  // initialize inputs
  b_run = document.getElementById('b_run');
  b_run.onclick = () => { s.pressedRun(); }

  b_reset = document.getElementById('b_reset')
  b_reset.onclick = () => { s.pressedReset(); }
  b_reset.disabled = true

  rb_automatic = select("#rb_automatic");
  rb_manual = select("#rb_manual");
  dd_algo = select("#dd_algo");
  in_arrayLength = select("#in_arrayLength");

  //initialize canvas
  canvasHolder = select("#canvasHolder")
  canvas = createCanvas(600, 400);
  canvas.parent(canvasHolder);

  let t = new SomeClass(10)
}

function draw() {
  if (s.is_running) {
    s.sorter.step();
  }
}
