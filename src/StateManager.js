/**
 * @author WissenIstNacht
 * 
 * This class implements a state machine that manages the page's state. 
 * 
 * The machine manages 3 states: An idle state (0), a running state (1) and a
 * pausing state(1). The next state is determined as a function of the user's 
 * press of a button and the current state. 
 */

class StateManager {

  constructor() {
    this.state = 0;
    this.is_running = false;
    this.sorter = null;
    this.BACKGROUND = color("#DEDEDE");
    frameRate(2)
  }

  // The following methods change the page's state

  idle2run() {
    let numb_Elements = document.getElementById("tf_arraySize").value
    if (numb_Elements === "") {
      // if text field is empty when run is pressed, visualization falls back to default
      // of 10 elemensts. 
      this.sorter = new InsertionSort(10);
    } else {
      this.sorter = new InsertionSort(numb_Elements);
    }
    this.state = 1;
    b_reset.disabled = false;
    this.is_running = true;
    b_run.textContent = "Pause";
  }

  run2pause() {
    this.state = 2;
    this.is_running = false;
    b_run.textContent = "Continue";
  }

  pause2run() {
    this.state = 1;
    this.is_running = true;
    b_run.textContent = "Pause";
  }

  any2idle() {
    this.state = 0;
    this.is_running = false;
    b_reset.disabled;
    b_run.textContent = "Run";
    background("white");
  }


  // The following methods determine the next state based on the user input and
  // the current state.

  pressedRun() {
    switch (this.state) {
      case 0:
        this.idle2run()
        break;
      case 1:
        this.run2pause()
        break;
      case 2:
        this.pause2run()
        break;
      default:
        console.error("State machine in undefined state!")
        break;
    }
  }

  pressedReset() {
    this.any2idle()
  }
}
