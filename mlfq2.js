class Process {
    constructor(id, arrivalTime, burstTime) {
      this.id = id;
      this.arrivalTime = arrivalTime;
      this.burstTime = burstTime;
      this.remainingTime = burstTime;
    }
  }
  
  class Scheduler {
    constructor(procs) {
      this.procs = procs;
      this.quantum = 1;
      this.levels = [[], [], []]; // Three priority levels
      this.ganttChart = [];
      this.time = 0;
    }
  
    run() {
      while (this.procs.length > 0 || this.levels.some(level => level.length > 0)) {
        this.updateQueue();
        this.executeProcess();
        this.time++;
      }
    }
  
    updateQueue() {
      while (this.procs.length > 0 && this.procs[0].arrivalTime === this.time) {
        const process = this.procs.shift();
        this.levels[0].push(process);
      }
    }
  
    executeProcess() {
      let i;  
      let executedProcess = null;
      for (i = 0; i < this.levels.length; i++) {
        const currentLevel = this.levels[i];
        if (currentLevel.length > 0) {
          const process = currentLevel.shift();
          executedProcess = process;
          this.ganttChart.push({ processId: process.id, startTime: this.time });
          break;
        }
      }
  
      if (executedProcess) {
        executedProcess.remainingTime -= this.quantum;
        if (executedProcess.remainingTime > 0) {
          const nextLevelIndex = Math.min(this.levels.length - 1, i + 1);
          this.levels[nextLevelIndex].push(executedProcess);
        } else {
          this.ganttChart[this.ganttChart.length - 1].endTime = this.time + this.quantum + executedProcess.remainingTime;
        }
      } else {
        this.ganttChart.push({ processId: null, startTime: this.time });
      }
    }
  }
  
  // Example usage
  function sched(arr) {


    const procs = [];

    arr.forEach(p => {
        procs.push(new Process(p.id, p.AT, p.BT))
    })
      
      const scheduler = new Scheduler(procs);
      scheduler.run();
      
      const ganttChartElement = document.getElementById('ganttChart');
      const ganttChart = scheduler.ganttChart;
      
      ganttChart.forEach(entry => {
        const processBar = document.createElement('div');
        processBar.classList.add('process-bar');
        processBar.style.width = `${entry.endTime - entry.startTime}0px`;
        processBar.textContent = entry.processId !== null ? `P${entry.processId}` : 'Idle';
        ganttChartElement.appendChild(processBar);
      });
  }
  
  