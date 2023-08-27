import {ArrayElement} from './arrayElement';

export type Operation =
  | 'SELECT_ITEM'
  | 'SELECT_COMPARE'
  | 'ORDER_CORRECT'
  | 'ORDER_WRONG'
  | 'SWAP'
  | 'UNSELECT_ITEM'
  | 'ITEM_DONE'
  | 'ALL_DONE';

export class Instruction {
  firstTarget: number;
  secondTarget: number;
  operation;

  constructor(ft: number, st: number, action: Operation) {
    this.firstTarget = ft;
    this.secondTarget = st;
    this.operation = action;
  }

  apply(array: ArrayElement[]): void {
    switch (this.operation) {
      case 'SELECT_ITEM':
        array[this.firstTarget].setState('NEUTRAL_SELECT');
        break;
      case 'SELECT_COMPARE':
        array[this.firstTarget].setState('NEUTRAL_SELECT');
        array[this.secondTarget].setState('COMPARE_SELECT');
        break;
      case 'ORDER_CORRECT':
        array[this.firstTarget].setState('NEUTRAL_SELECT');
        array[this.secondTarget].setState('CORRECT_SELECT');
        break;
      case 'ORDER_WRONG':
        array[this.firstTarget].setState('NEUTRAL_SELECT');
        array[this.secondTarget].setState('FALSE_SELECT');
        break;
      case 'SWAP':
        let temp = array[this.secondTarget];
        array[this.secondTarget] = array[this.firstTarget];
        array[this.firstTarget] = temp;
        array[this.firstTarget].setState('CORRECT_SELECT');
        array[this.secondTarget].setState('CORRECT_SELECT');
        break;
      case 'UNSELECT_ITEM':
        array[this.firstTarget].setState('NEUTRAL');
        array[this.secondTarget].setState('NEUTRAL');
        break;
      case 'ITEM_DONE':
        array[this.firstTarget].setState('CORRECT_SELECT');
        break;
      case 'ALL_DONE':
        array.forEach(ae => ae.setState('CORRECT_SELECT'));
        break;
    }
  }
}
