/**
 * @author WissenIstNacht
 *
 * This class implements a state machine that manages the page's state.
 *
 * The machine manages 3 states: An idle state (0), a running state (1) and a
 * pausing state(1). The next state is determined as a function of the user's
 * press of a button and the current state.
 */

import {BubbleSort} from './bubbleSort';
import {InsertionSort} from './insertionSort';
import {inputs} from './main';
import {SortingAlgorithm} from './sortingAlgorithm';

export class StateManager {
  state: number;
  isRunning: boolean;
  sorter: SortingAlgorithm | null;

  constructor() {
    this.state = 0;
    this.isRunning = false;
    this.sorter = null;
  }

  // The following methods change the page's state

  idle2run() {
    const tfArraySize = document.getElementById(
      'tf_arraySize'
    ) as HTMLInputElement;
    // if text field is empty when run is pressed, visualization falls back to
    // default of 10 elemensts.
    const numb_Elements = parseInt(tfArraySize.value ?? '10') ?? 10;

    const ddAlgorithm = document.getElementById('dd_form') as HTMLSelectElement;
    const algo_type = ddAlgorithm.value;
    switch (algo_type) {
      case 'bubbleSort':
        this.sorter = new BubbleSort(numb_Elements);
        break;
      case 'insertionSort':
        this.sorter = new InsertionSort(numb_Elements);
        break;
      default:
        break;
    }
    this.state = 1;
    inputs.bReset.disabled = false;
    this.isRunning = true;
    inputs.bRun.textContent = 'Pause';
  }

  run2pause() {
    this.state = 2;
    this.isRunning = false;
    inputs.bRun.textContent = 'Continue';
  }

  pause2run() {
    this.state = 1;
    this.isRunning = true;
    inputs.bRun.textContent = 'Pause';
  }

  any2idle() {
    this.state = 0;
    this.isRunning = false;
    inputs.bReset.disabled;
    inputs.bRun.textContent = 'Run';
  }

  // The following methods determine the next state based on the user input and
  // the current state.

  pressedRun() {
    switch (this.state) {
      case 0:
        this.idle2run();
        break;
      case 1:
        this.run2pause();
        break;
      case 2:
        this.pause2run();
        break;
      default:
        console.error('State machine in undefined state!');
        break;
    }
  }

  pressedReset() {
    this.any2idle();
  }
}
