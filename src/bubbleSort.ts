/**
 * @author WissenIstNacht
 * Date: 25-02-2020
 *
 * This file contains the BubbleSort class. It implements the bubblesort
 * algorithm in a series of steps that can be visualized.
 */

import {Instruction} from './instruction';
import {SortingAlgorithm} from './sortingAlgorithm';

export class BubbleSort extends SortingAlgorithm {
  constructor(arrayLength: number) {
    super(arrayLength);
  }

  sort() {
    let a = this.array;

    for (let j = 0; j < a.length; j++) {
      for (let i = 0; i < a.length - j - 1; i++) {
        this.instructions.push(new Instruction(i, i, 'SELECT_ITEM'));
        this.instructions.push(new Instruction(i, i + 1, 'SELECT_COMPARE'));
        if (a[i] > a[i + 1]) {
          this.instructions.push(new Instruction(i, i + 1, 'ORDER_WRONG'));
          a = swap(a, i, i + 1);
          this.instructions.push(new Instruction(i, i + 1, 'SWAP'));
        } else {
          this.instructions.push(new Instruction(i, i + 1, 'ORDER_CORRECT'));
        }
        this.instructions.push(new Instruction(i, i + 1, 'UNSELECT_ITEM'));
      }
      this.instructions.push(new Instruction(a.length - j - 1, 0, 'ITEM_DONE'));
    }
    this.instructions.push(new Instruction(0, 0, 'ALL_DONE'));
  }
}

/** Simple implementation of bubblesort
 *
 * @param {array} a array that's to be sorted
 *
 * @returns {array} sorted array.
 */
// @ts-ignore
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
