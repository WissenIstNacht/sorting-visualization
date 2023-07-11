/**
 * @author WissenIstNacht
 * Date: 17-11-2020
 *
 * This file holds a canvas-based SPA visualizing various sorting algorithms.
 *
 * It been built using the P5.js library.
 */

import p5 from 'p5';

import {StateManager} from './StateManager';
import {inputs} from './main';
import {InitialState} from './state';
import {getColor} from './util';

export const sortAnimation = (s: p5) => {
  let stateManager: StateManager;

  s.setup = () => {
    // initialize inputs
    stateManager = new StateManager(new InitialState());
    inputs.bRun.onclick = () => {
      stateManager.changeState('run');
    };

    inputs.bReset.onclick = () => {
      stateManager.changeState('reset');
    };
    inputs.bReset.disabled = true;
    inputs.ddAlgorithm.addEventListener('change', ev => {
      let descriptions = document.getElementsByClassName('description');

      function itemHiding(item: Element | null, descriptionType: string) {
        let isSelected = item?.id === descriptionType;
        if (isSelected) {
          item?.removeAttribute('hidden');
        } else {
          item?.setAttribute('hidden', 'true');
        }
      }
      const t = ev.target as HTMLSelectElement;
      switch (t.value) {
        case 'bubbleSort':
          for (let i = 0; i < descriptions.length; i++) {
            itemHiding(descriptions.item(i), 'bubbleSortDescription');
          }
          break;
        case 'insertionSort':
          for (let i = 0; i < descriptions.length; i++) {
            itemHiding(descriptions.item(i), 'insertionSortDescription');
          }
          break;
        // Add cases for new algorithms.
        default:
          break;
      }
    });

    //initialize canvas
    const canvasHolder = s.select('#canvasHolder');
    const {width: canvasWidth} = canvasHolder?.size() as {
      width: number;
      height: number;
    };
    const canavasHeight = (canvasWidth * 2) / 3;
    const canvas = s.createCanvas(canvasWidth, canavasHeight);
    canvas.parent(canvasHolder!);
    s.background(getColor(s, 'bg'));
    s.frameRate(2);
  };

  s.draw = () => {
    stateManager.currState.draw(s);
  };
};
