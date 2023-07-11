import p5 from 'p5';
import {sortAnimation} from './sketch';

export const inputs = {
  bRun: document.getElementById('b_run') as HTMLButtonElement,
  bReset: document.getElementById('b_reset') as HTMLButtonElement,
  ddAlgorithm: document.getElementById('dd_form') as HTMLSelectElement,
  tfArraySize: document.getElementById('tf_arraySize') as HTMLInputElement,
};

const canvas = document.querySelector('#canvasHolder') as HTMLElement;
new p5(sortAnimation, canvas);
