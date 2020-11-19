/**
 * @author WissenIstNacht
 * Date: 25-02-2020
 * 
 * This class implements bubbleSort s.t. each step of the algorithm can be
 * viualized using a drawing loop. Given an (unsorted) array, the algorithm
 * needs to be advanced through each step using the step() function. 
 * 
 */

class BubbleSort extends SortingAlgorithm {

  // After pass i, the largest element of the unsorted part is guaranteed to be at the
  // i-th rightest index. Lowest denotes the currently lowest correctly placed element.
  // I.e., lowest == this.l - i, where i are the passes starting at 0.
  constructor(arrayLength) {
    super(arrayLength)
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
        this.render(null, null);
        this.action = 1;
        break;
      case 1:
        let se = new ArrayElement(this.indx, BLUE)
        this.render(se, null);
        this.action = 2;
        break;
      case 2:
        if (this.a[this.indx] > this.a[this.indx + 1]) {
          let se1 = new ArrayElement(this.indx, BLUE)
          let se2 = new ArrayElement(this.indx + 1, RED)
          this.render(se1, se2);
          this.action = 3;
        } else {
          let se1 = new ArrayElement(this.indx, BLUE)
          let se2 = new ArrayElement(this.indx + 1, GREEN)
          this.render(se1, se2);
          this.action = 0;
          this.indx++;
        }
        break;
      case 3:
        let t = this.a[this.indx];
        this.a[this.indx] = this.a[this.indx + 1];
        this.a[this.indx + 1] = t;

        let se1 = new ArrayElement(this.indx, GREEN)
        let se2 = new ArrayElement(this.indx + 1, GREEN)
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

function swap(a, i, j) {
  let t = a[i];
  a[i] = a[j];
  a[j] = t;
  return a
}
