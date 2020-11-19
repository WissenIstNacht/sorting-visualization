/**
 * @author WissenIstNacht
 * Date: 25-02-2020
 * 
 * This class implements bubbleSort s.t. each step of the algorithm can be
 * viualized using a drawing loop. Given an (unsorted) array, the algorithm
 * needs to be advanced through each step using the step() function. 
 * 
 */

class BubbleSort {


  // After pass i, the largest element of the unsorted part is guaranteed to be at the
  // i-th rightest index. Lowest denotes the currently lowest correctly placed element.
  // I.e., lowest == this.l - i, where i are the passes starting at 0.
  constructor(arrayLength) {
    this.a = [];
    this.l = arrayLength;

    this.xs = [];
    for (let i = 1; i <= this.l; i++) {
      this.xs.push(i);
    }
    for (let i = this.l; i > 0; i--) {
      let r = floor(i * random());
      this.a.push(this.xs[r]);
      this.xs.splice(r, 1);
    }
    this.lowest = this.l;
    this.indx = 0;
    this.action = 0;
  }

  step() {
    background(255);
    scale(1, -1);
    translate(0, -height);

    fill(200);
    strokeWeight(2);

    switch (this.action) {
      case 0:
        this.render(-1, null, -1, null);
        this.action = 1;
        break;
      case 1:
        this.render(this.indx, BLUE, -1, null);
        this.action = 2;
        break;
      case 2:
        if (this.a[this.indx] > this.a[this.indx + 1]) {
          this.render(this.indx, BLUE, this.indx + 1, RED);
          this.action = 3;
        } else {
          this.render(this.indx, BLUE, this.indx + 1, GREEN);
          this.action = 0;
          this.indx++;
        }
        break;
      case 3:
        let t = this.a[this.indx];
        this.a[this.indx] = this.a[this.indx + 1];
        this.a[this.indx + 1] = t;

        this.render(this.indx, GREEN, this.indx + 1, GREEN);
        this.action = 0;
        this.indx++;
        break;
      default:
        break;
    }
    if (this.indx == this.lowest - 1) {
      this.indx = 0;
      this.lowest--;
    }
  }

  // Draws a rectangle representing an element on the canvas.
  render(indx1, col1, indx2, col2) {
    let r = 4;
    let unit = width * 0.9 / (this.l * (r + 1) - 1);
    let rect_y = height / 20;
    let rect_w = r * unit;

    for (let k = 0; k < this.l; k++) {
      if (k == indx1) {
        fill(col1);
      } else if (k == indx2) {
        fill(col2);
      } else if (k >= this.lowest) {
        fill(GREEN);
      } else {
        fill(200);
      }
      let rect_x = width / 20 + k * (r + 1) * unit;
      let rect_h = map(this.a[k], 1, this.l, height / 20, 9 * height / 10);
      rect(rect_x, rect_y, rect_w, rect_h);
    }
  }
}


function bubbleSort(a) {
  for (let j = 0; j < a.length; j++) {
    for (let i = 0; i < a.length - j - 1; i++) {
      if (a[i] > a[i + 1]) {
        let t = a[i];
        a[i] = a[i + 1];
        a[i + 1] = t;
      }
    }
  }
  return a;
}
