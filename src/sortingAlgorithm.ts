/**
 * @author WissenIstNacht
 * Date:
 *
 * This file contains a super class that provide generic code for implementing a
 * sorting algorithm visualization.
 *
 */

import p5 from 'p5';
import {getColor} from './util';

export abstract class SortingAlgorithm {
  unsortedArray: number[];
  array: number[];
  length: number;
  lowest: number;

  constructor(arrayLength: number) {
    this.length = arrayLength;
    this.unsortedArray = this.createRandomArray(this.length);
    this.array = Array.from(this.unsortedArray);

    this.lowest = this.length;
  }

  /** Creates a random array for this instance of a sorting algorithm
   *  visualization.
   */
  createRandomArray(arrayLength: number): number[] {
    const xs = [];
    const shuffledArray = [];

    for (let i = 1; i <= arrayLength; i++) {
      xs.push(i);
    }

    for (let i = arrayLength; i > 0; i--) {
      const r = Math.floor(i * Math.random());
      shuffledArray.push(xs[r]);
      xs.splice(r, 1);
    }

    return shuffledArray;
  }

  abstract reset(): void;

  /** Draws the rectangles representing the elements on the canvas.
   *
   * Elements that are displayed as grey rectangles. However, some elements are
   * highlighted to improve visualization. This can be done by passing (0, 1 or
   * 2) column objects to the method.
   *
   * @param {ArrayElement} special_elem1 First highlighted element
   * @param {ArrayElement} special_elem2 Second highlighted element
   */
  render(s: p5, special_elem1?: ArrayElement, special_elem2?: ArrayElement) {
    // get indices if there are special elements to highlight.
    let index1 = special_elem1 ? special_elem1.index : -1;
    let index2 = special_elem2 ? special_elem2.index : -1;

    let r = 4;
    let unit = (s.width * 0.9) / (this.length * (r + 1) - 1);
    let rect_y = s.height / 20;
    let rect_w = r * unit;

    //draw array elements, taking into account special elements
    for (let k = 0; k < this.length; k++) {
      if (k == index1) {
        s.fill(special_elem1?.color || getColor(s, 'bg'));
      } else if (k == index2) {
        s.fill(special_elem2?.color || getColor(s, 'bg'));
      } else if (k >= this.lowest) {
        s.fill(getColor(s, 'green'));
      } else {
        s.fill(200);
      }
      let rect_x = s.width / 20 + k * (r + 1) * unit;
      let rect_h = s.map(
        this.array[k],
        1,
        this.length,
        s.height / 20,
        (9 * s.height) / 10
      );
      s.rect(rect_x, rect_y, rect_w, rect_h);
    }
  }

  abstract step(s: p5): void;
}

export class ArrayElement {
  index: number;
  color: p5.Color;

  constructor(index: number, color: p5.Color) {
    this.index = index;
    this.color = color;
  }
}
