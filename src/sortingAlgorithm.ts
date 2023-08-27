/**
 * @author WissenIstNacht
 * Date:
 *
 * This file contains a super class that provide generic code for implementing a
 * sorting algorithm visualization.
 *
 */

import p5 from 'p5';

import {ArrayElement} from './ArrayElement';
import {Instruction} from './instruction';
import {getColor} from './util';

export abstract class SortingAlgorithm {
  unsortedArray: number[];
  array: number[];
  length: number;
  currArray: ArrayElement[];
  instructions: Instruction[];
  instructionsPointer: number;

  constructor(arrayLength: number) {
    this.length = arrayLength;
    this.unsortedArray = this.createRandomArray(this.length);
    this.array = Array.from(this.unsortedArray);

    this.currArray = this.unsortedArray.map(v => new ArrayElement(v));
    this.instructions = [];
    this.instructionsPointer = 0;
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

  abstract sort(): void;

  reset(): void {
    this.currArray = this.unsortedArray.map(v => new ArrayElement(v));
    this.instructionsPointer = 0;
  }

  /** Draws the rectangles representing the elements on the canvas.
   *
   * Elements that are displayed as grey rectangles. However, some elements are
   * highlighted to improve visualization. This can be done by passing (0, 1 or
   * 2) column objects to the method.
   *
   * @param {ArrayElement} special_elem1 First highlighted element
   * @param {ArrayElement} special_elem2 Second highlighted element
   */
  render(s: p5) {
    s.background(getColor(s, 'bg'));
    s.scale(1, -1);
    s.translate(0, -s.height);

    s.fill(200);
    s.strokeWeight(2);

    const r = 4;
    const horizontalUnit = (s.width * 0.9) / (this.length * (r + 1) - 1);
    const verticalUnit = s.height / 20;
    const rect_y = verticalUnit;
    const rect_w = r * horizontalUnit;

    for (let k = 0; k < this.length; k++) {
      const ae = this.currArray[k];

      let color: p5.Color;
      switch (ae.state) {
        case 'NEUTRAL':
          color = s.color(200);
          break;
        case 'NEUTRAL_SELECT':
          color = getColor(s, 'blue');
          break;
        case 'COMPARE_SELECT':
          color = getColor(s, 'blue');
          break;
        case 'CORRECT_SELECT':
          color = getColor(s, 'green');
          break;
        case 'FALSE_SELECT':
          color = getColor(s, 'red');
          break;
      }

      const rect_x = s.width / 20 + k * (r + 1) * horizontalUnit;
      const rect_h = s.map(
        ae.value,
        1,
        this.length,
        verticalUnit,
        18 * verticalUnit
      );
      s.fill(color);
      s.rect(rect_x, rect_y, rect_w, rect_h);
    }
  }

  step(): void {
    this.instructions[this.instructionsPointer].apply(this.currArray);
    this.instructionsPointer += 1;
  }
}
