/**
 * @author WissenIstNacht
 * Date: 25-02-2020
 *
 * This file contains the BubbleSort class. It implements the bubblesort
 * algorithm in a series of steps that can be visualized.
 */

import p5 from 'p5';
import {ArrayElement, SortingAlgorithm} from './sortingAlgorithm';
import {getColor} from './util';

export class BubbleSort extends SortingAlgorithm {
  // After pass i, the largest element of the unsorted part is guaranteed to be
  // at the i-th rightest index. Lowest denotes the currently lowest correctly
  // placed element.
  // I.e., lowest == this.l - i, where i are the passes starting at 0.
  lowest: number;
  index: number;
  action: number;

  constructor(arrayLength: number) {
    super(arrayLength);
    this.lowest = this.length;
    this.index = 0;
    this.action = 0;
  }

  /** Strepwise implementation of bubblesort algorithm
   */
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
        if (this.array[this.index] > this.array[this.index + 1]) {
          let se1 = new ArrayElement(this.index, getColor(s, 'blue'));
          let se2 = new ArrayElement(this.index + 1, getColor(s, 'red'));
          this.render(s, se1, se2);
          this.action = 3;
        } else {
          let se1 = new ArrayElement(this.index, getColor(s, 'blue'));
          let se2 = new ArrayElement(this.index + 1, getColor(s, 'green'));
          this.render(s, se1, se2);
          this.action = 0;
          this.index++;
        }
        break;
      case 3:
        //confirmation mode - compared elements are in correct order.
        this.array = swap(this.array, this.index, this.index + 1);

        let se1 = new ArrayElement(this.index, getColor(s, 'green'));
        let se2 = new ArrayElement(this.index + 1, getColor(s, 'green'));
        this.render(s, se1, se2);
        this.action = 0;
        this.index++;
        break;
      default:
        break;
    }
    if (this.index == this.lowest - 1) {
      this.index = 0;
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
function bubbleSort<T>(a: T[]) {
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
export function swap<T>(a: T[], i: number, j: number) {
  let t = a[i];
  a[i] = a[j];
  a[j] = t;
  return a;
}
