import {State, Trigger} from '../state';

export class InvalidStateChangeTrigger<T extends State> extends Error {
  constructor(trigger: Trigger, state: T) {
    super(`Invalid state change trigger <${trigger}> used in <${state}>`);
  }
}

export class AlgorithmNotImplemented extends Error {
  constructor(algorithm: string) {
    super(`The algorithm ${algorithm} is not yet implemented.`);
  }
}
