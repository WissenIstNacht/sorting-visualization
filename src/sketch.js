/**
 * @author WissenIstNacht
 * Date: 
 * 
 * This sketch ... 
 * 
 */
let drawing = false;
let sorter = null;
let GREEN, RED, BLUE;

// inputs
let b_start, b_stop;
let rb_automatic, rb_manual;
let dd_algo;
let in_arrayLength;
let canvasHolder

function setup() {
    // initialize inputs
    b_start = select("#b_start");
    b_start.mousePressed(() => { drawing = true; })
    b_stop = select("#b_stop");
    // b_start.mousePressed(() => { drawing = false; })
    rb_automatic = select("#rb_automatic");
    rb_manual = select("#rb_manual");
    dd_algo = select("#dd_algo");
    in_arrayLength = select("#in_arrayLength");
    canvasHolder = select("#canvasHolder")

    //initialize canvas
    canvas = createCanvas(600, 400);
    canvas.parent(canvasHolder);
    background(millis() % 255);
    frameRate(1);
    
    RED = color(255, 152, 178);
    GREEN = color(152, 255, 204), 
    BLUE = color(152, 229, 255);
    
    sorter = new BubbleSort(10);
}

function draw() {
    if (drawing) {
        bcol = millis() % 255;
        background(bcol);
        console.log(bcol);
        sorter.step();
    }
}

function keyPressed() {}
