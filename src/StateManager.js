/**
 * @author WissenIstNacht
 * Date: 
 * 
 * This class 
 * 
 */

class StateManager {

    constructor() {
        this.is_running = false;
        this.sorter = new BubbleSort(10);
        this.BACKGROUND = color("#DEDEDE");
        frameRate(2)
    }

    startPressed() {
        b_reset.disabled = false;
        if (this.is_running) {
            this.is_running = false;
            b_run.textContent = "Run";
        } else {
            this.is_running = true;
            b_run.textContent = "Pause";
        }
    }

    resetPressed() {
        this.is_running = false;
        b_reset.disabled;
        b_run.textContent = "Run";
        background("white");
        this.sorter = new BubbleSort(10);
    }
}