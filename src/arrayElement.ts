export type ElementState =
  | 'NEUTRAL'
  | 'NEUTRAL_SELECT'
  | 'FALSE_SELECT'
  | 'CORRECT_SELECT'
  | 'COMPARE_SELECT';

export class ArrayElement {
  value: number;
  state: ElementState;

  constructor(elementValue: number) {
    this.value = elementValue;
    this.state = 'NEUTRAL';
  }

  setState(newState: ElementState) {
    this.state = newState;
  }
}
