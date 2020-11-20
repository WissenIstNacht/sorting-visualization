/**
 * @author WissenIstNacht
 * Date: 
 *
 * This file contains a super class that provide generic code for implementing a sorting
 * algorithm visualization.  
 *
 */

class SortingAlgorithm {

  constructor(arrayLength) {
    this.a = [];
    this.l = arrayLength;

    this.createRandomArray()
    this.lowest = this.l;
    this.indx = 0;
    this.action = 0;
  }

  /** Creates a random array for this instance of a sorting algorithm visualization.
   */
  createRandomArray() {
    this.xs = [];
    for (let i = 1; i <= this.l; i++) {
      this.xs.push(i);
    }
    for (let i = this.l; i > 0; i--) {
      let r = floor(i * random());
      this.a.push(this.xs[r]);
      this.xs.splice(r, 1);
    }
  }

  /** Draws the rectangles representing the elements on the canvas.
   * 
   * Elements that are displayed as grey rectangles. However, some elements are
   * highlighted to improve visualization. This can be done by passing (0, 1 or 2) column
   * objects to the method.
   * 
   * @param {ArrayElement} special_elem1 First highlighted element 
   * @param {ArrayElement} special_elem2 Second highlighted element
   */
  render(special_elem1, special_elem2) {
    // get indices there are special elements to highlight. 
    let indx1 = special_elem1 ? special_elem1.index : -1
    let indx2 = special_elem2 ? special_elem2.index : -1

    let r = 4;
    let unit = width * 0.9 / (this.l * (r + 1) - 1);
    let rect_y = height / 20;
    let rect_w = r * unit;

    //draw array elements, taking into account special elements
    for (let k = 0; k < this.l; k++) {
      if (k == indx1) {
        fill(special_elem1.color);
      } else if (k == indx2) {
        fill(special_elem2.color);
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


class ArrayElement {

  constructor(index, color) {
    this.index = index
    this.color = color
  }
}
