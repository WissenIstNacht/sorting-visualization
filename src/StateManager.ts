/**
 * @author WissenIstNacht
 *
 * This class implements a state machine that manages the page's state.
 *
 * The machine manages 3 states: An idle state (0), a running state (1) and a
 * pausing state(1). The next state is determined as a function of the user's
 * press of a button and the current state.
 */

import {State, Trigger} from './state';

export class StateManager {
  currState: State;

  constructor(initialState: State) {
    this.currState = initialState;
    this.currState.update();
  }

  changeState(trigger: Trigger) {
    this.currState = this.currState.next(trigger);
    this.currState.update();
  }
}
