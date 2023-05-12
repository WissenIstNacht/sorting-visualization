/**
 * @author WissenIstNacht
 * Date: 25-02-2020
 *
 * This file contains the BubbleSort class. It implements the bubblesort
 * algorithm in a series of steps that can be visualized.
 */

class BubbleSort extends SortingAlgorithm {
  // After pass i, the largest element of the unsorted part is guaranteed to be
  // at the i-th rightest index. Lowest denotes the currently lowest correctly
  // placed element.
  // I.e., lowest == this.l - i, where i are the passes starting at 0.
  constructor(arrayLength) {
    super(arrayLength);
    this.lowest = this.l;
    this.indx = 0;
    this.action = 0;
  }

  /** Strepwise implementation of bubblesort algorithm
   */
  step() {
    background(BG);
    scale(1, -1);
    translate(0, -height);

    fill(200);
    strokeWeight(2);

    switch (this.action) {
      case 0:
        //base case - all elements gray.
        this.render(null, null);
        this.action = 1;
        break;
      case 1:
        //selection mode - selected element colored blue.
        let se = new ArrayElement(this.indx, BLUE);
        this.render(se, null);
        this.action = 2;
        break;
      case 2:
        // comparison mode - compared element either green/red, depending on
        // correctness.
        if (this.a[this.indx] > this.a[this.indx + 1]) {
          let se1 = new ArrayElement(this.indx, BLUE);
          let se2 = new ArrayElement(this.indx + 1, RED);
          this.render(se1, se2);
          this.action = 3;
        } else {
          let se1 = new ArrayElement(this.indx, BLUE);
          let se2 = new ArrayElement(this.indx + 1, GREEN);
          this.render(se1, se2);
          this.action = 0;
          this.indx++;
        }
        break;
      case 3:
        //confirmation mode - compared elements are in correct order.
        this.a = swap(this.a, this.indx, this.indx + 1);

        let se1 = new ArrayElement(this.indx, GREEN);
        let se2 = new ArrayElement(this.indx + 1, GREEN);
        this.render(se1, se2);
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
}

/** Simple implementation of bubblesort
 *
 * @param {array} a array that's to be sorted
 *
 * @returns {array} sorted array.
 */
function bubbleSort(a) {
  for (let j = 0; j < a.length; j++) {
    for (let i = 0; i < a.length - j - 1; i++) {
      if (a[i] > a[i + 1]) {
        a = swap(a, i, i + 1);
      }
    }
  }
  return a;
}

/** Swaps the location of two elements in an array
 *
 * @param {array} a
 * @param {number} i Location of element in array
 * @param {number} j Location of element in array
 *
 * @returns {array} sorted array.
 */
function swap(a, i, j) {
  let t = a[i];
  a[i] = a[j];
  a[j] = t;
  return a;
}
