/**
 * @author WissenIstNacht
 * Date: 
 * 
 * This class 
 * 
 */

class StateManager {

  constructor() {
    this.state = 0;
    this.is_running = false;
    this.sorter = null;
    this.BACKGROUND = color("#DEDEDE");
    frameRate(2)
  }


  idle2run() {
    // collect input data
    this.sorter = new BubbleSort(10);
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