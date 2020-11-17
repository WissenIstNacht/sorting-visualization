/**
 * @author WissenIstNacht
 * Date: 17-11-2020
 * 
 * This sketch 
 * 
 */

// inputs
let b_start, b_stop;
let rb_automatic, rb_manual;
let dd_algo;
let in_arrayLength;
let canvasHolder;
let s;

function setup() {
    // initialize inputs
    b_start = select("#b_start");
    b_start.mousePressed(() => { s.drawing = true; })

    b_stop = select("#b_stop");
    b_stop.mousePressed(() => { s.drawing = false; })

    rb_automatic = select("#rb_automatic");
    rb_manual = select("#rb_manual");
    dd_algo = select("#dd_algo");
    in_arrayLength = select("#in_arrayLength");
    
    //initialize canvas
    canvasHolder = select("#canvasHolder")
    canvas = createCanvas(600, 400);
    canvas.parent(canvasHolder);
    // background(millis() % 255);
    
    sorter = new BubbleSort(10);
    s = new StateManager();
    frameRate(2)
}

function draw() {
    if (s.drawing) {
        sorter.step();
    }
}