/**
 * @author WissenIstNacht
 *
 * This file contains the InsertionSort class. It implements the bubblesort algorithm in a
 * series of steps that can be visualized.
 */

class InsertionSort extends SortingAlgorithm {
  constructor(arrayLength) {
    super(arrayLength);
    this.highest = 1;
    this.indx = 1;
    this.action = 0;
    this.done = false;
  }

  step() {
    background(255);
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
        // comparison mode - compared element either green/red, depending on correctness.
        if (this.a[this.indx - 1] > this.a[this.indx]) {
          let se1 = new ArrayElement(this.indx, BLUE);
          let se2 = new ArrayElement(this.indx - 1, RED);
          this.render(se1, se2);
          this.action = 3;
        } else {
          let se1 = new ArrayElement(this.indx, BLUE);
          let se2 = new ArrayElement(this.indx - 1, GREEN);
          this.render(se1, se2);
          this.done = true;
          this.action = 0;
        }
        break;
      case 3:
        //confirmation mode - compared elements are in correct order.
        this.a = swap(this.a, this.indx, this.indx - 1);

        let se1 = new ArrayElement(this.indx, GREEN);
        let se2 = new ArrayElement(this.indx - 1, GREEN);
        this.render(se1, se2);
        this.action = 0;
        this.indx--;
        break;
      default:
        break;
    }
    if (this.done) {
      this.highest++;
      this.indx = this.highest;
      this.done = false;
    }
  }
}

function insertionSort(a) {
  let n = a.length;
  for (let i = 0; i < n; i++) {
    console.log(a);
    let j = i - 1;
    while (j >= 0) {
      if (a[j] > a[j + 1]) {
        a = swap(a, j, j + 1);
      } else {
        break;
      }
      j--;
    }
  }
  return a;
}
