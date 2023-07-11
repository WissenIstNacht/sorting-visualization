import p5 from 'p5';
import {BubbleSort} from './bubbleSort';
import {InsertionSort} from './insertionSort';
import {inputs} from './main';
import {SortingAlgorithm} from './sortingAlgorithm';
import {getColor} from './util';

export type Trigger = 'run' | 'reset';

export abstract class State {
  abstract next(arg: Trigger): State;
  abstract update(): void;
  abstract draw(s: p5): void;
}

export class InitialState extends State {
  next(arg: Trigger): State {
    switch (arg) {
      case 'reset':
        throw new Error('state not implemented');
      case 'run':
        const numb_Elements = parseInt(inputs.tfArraySize.value ?? '10') ?? 10;
        const algo_type = inputs.ddAlgorithm.value;
        let newSorter;
        switch (algo_type) {
          case 'bubbleSort':
            newSorter = new BubbleSort(numb_Elements);
            break;
          case 'insertionSort':
            newSorter = new InsertionSort(numb_Elements);
            break;
          default:
            throw new Error('Illegal algorithm input in InitialState');
        }
        return new RunningState(newSorter);
    }
  }

  update(): void {
    inputs.bReset.disabled = true;
    inputs.bRun.textContent = 'Run';
  }

  draw(s: p5): void {
    const text = "Press 'Run'\n to start the animation";
    s.fill(getColor(s, 'fg'));
    s.background(getColor(s, 'bg'));
    s.textSize(24).textAlign('center').textStyle('bold');
    s.text(text, s.width / 2, s.height / 3);
  }

  toString() {
    return 'InitialState';
  }
}

export class RunningState extends State {
  sorter: SortingAlgorithm;

  constructor(s: SortingAlgorithm) {
    super();
    this.sorter = s;
  }

  next(arg: Trigger): State {
    switch (arg) {
      case 'reset':
        return new InitialState();
      case 'run':
        return new PausingState(this.sorter);
    }
  }

  update(): void {
    inputs.bRun.textContent = 'Pause';
    inputs.bReset.disabled = false;
  }

  draw(s: p5): void {
    this.sorter.step(s);
  }

  toString() {
    return 'RunningState';
  }
}

export class PausingState extends State {
  sorter: SortingAlgorithm;

  constructor(s: SortingAlgorithm) {
    super();
    this.sorter = s;
  }

  next(arg: Trigger): State {
    switch (arg) {
      case 'reset':
        return new InitialState();
      case 'run':
        return new RunningState(this.sorter);
    }
  }

  update(): void {
    inputs.bRun.textContent = 'Continue';
  }

  draw(s: p5): void {}

  toString() {
    return 'PausingState';
  }
}

// TODO: Add an idle state when algorithm is done running.
// export class IdleState extends State {
//   next(arg: Trigger): State {
//     switch (arg) {
//       case 'reset':
//         return new InitialState();
//       case 'run':
//         throw new Error('Invalid trigger in Idle State');
//     }
//   }

//   update(): void {
//     return;
//   }

//   draw(s: p5): void {
//     s.text('Press Run to Start the animation.', 0, 0);
//   }
// }
