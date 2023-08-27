/**
 * @author WissenIstNacht
 *
 * This file contains the InsertionSort class. It implements the bubblesort
 * algorithm in a series of steps that can be visualized.
 */

import {swap} from './bubbleSort';
import {Instruction} from './instruction';
import {SortingAlgorithm} from './sortingAlgorithm';

export class InsertionSort extends SortingAlgorithm {
  constructor(arrayLength: number) {
    super(arrayLength);
  }

  sort(): void {
    let a = this.array;
    for (let k = 0; k < a.length; k++) {
      for (let i = k - 1; i >= 0; i--) {
        // For a given pass, item is compared with items to its left. Visually,
        // it looks better to select the right item first (contrary to bubble
        // sort).
        this.instructions.push(new Instruction(i + 1, 0, 'SELECT_ITEM'));
        this.instructions.push(new Instruction(i + 1, i, 'SELECT_COMPARE'));
        if (a[i] > a[i + 1]) {
          this.instructions.push(new Instruction(i, i + 1, 'ORDER_WRONG'));
          a = swap(a, i, i + 1);
          this.instructions.push(new Instruction(i, i + 1, 'SWAP'));
          this.instructions.push(new Instruction(i, i + 1, 'UNSELECT_ITEM'));
        } else {
          this.instructions.push(new Instruction(i, i + 1, 'ORDER_CORRECT'));
          this.instructions.push(new Instruction(i, i + 1, 'UNSELECT_ITEM'));
          break;
        }
      }
    }
    this.instructions.push(new Instruction(0, 0, 'ALL_DONE'));
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
