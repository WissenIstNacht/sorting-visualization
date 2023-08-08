/**
 * @author WissenIstNacht
 *
 * This file contains the InsertionSort class. It implements the bubblesort
 * algorithm in a series of steps that can be visualized.
 */

import p5 from 'p5';
import {swap} from './bubbleSort';
import {ArrayElement, SortingAlgorithm} from './sortingAlgorithm';
import {getColor} from './util';

export class InsertionSort extends SortingAlgorithm {
  highest: number;
  index: number;
  action: number;
  done: boolean;

  constructor(arrayLength: number) {
    super(arrayLength);
    this.highest = 1;
    this.index = 1;
    this.action = 0;
    this.done = false;
  }

  reset(): void {
    this.array = Array.from(this.unsortedArray);
    this.highest = 1;
    this.index = 1;
    this.action = 0;
    this.done = false;
  }

  step(s: p5) {
    s.background(getColor(s, 'bg'));
    s.scale(1, -1);
    s.translate(0, -s.height);

    s.fill(200);
    s.strokeWeight(2);

    switch (this.action) {
      case 0:
        //base case - all elements gray.
        this.render(s);
        this.action = 1;
        break;
      case 1:
        //selection mode - selected element colored blue.
        let se = new ArrayElement(this.index, getColor(s, 'blue'));
        this.render(s, se);
        this.action = 2;
        break;
      case 2:
        // comparison mode - compared element either green/red, depending on
        // correctness.
        if (this.array[this.index - 1] > this.array[this.index]) {
          let se1 = new ArrayElement(this.index, getColor(s, 'blue'));
          let se2 = new ArrayElement(this.index - 1, getColor(s, 'red'));
          this.render(s, se1, se2);
          this.action = 3;
        } else {
          let se1 = new ArrayElement(this.index, getColor(s, 'blue'));
          let se2 = new ArrayElement(this.index - 1, getColor(s, 'green'));
          this.render(s, se1, se2);
          this.done = true;
          this.action = 0;
        }
        break;
      case 3:
        //confirmation mode - compared elements are in correct order.
        this.array = swap(this.array, this.index, this.index - 1);

        let se1 = new ArrayElement(this.index, getColor(s, 'green'));
        let se2 = new ArrayElement(this.index - 1, getColor(s, 'green'));
        this.render(s, se1, se2);
        this.action = 0;
        this.index--;
        break;
      default:
        break;
    }
    if (this.done) {
      this.highest++;
      this.index = this.highest;
      this.done = false;
    }
  }
}

/** Simple implementation of insertion sort.
 *
 * @param {array} a array that's to be sorted
 *
 * @returns {array} sorted array.
 */
// @ts-ignore
function insertionSort<T>(a: T[]) {
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
