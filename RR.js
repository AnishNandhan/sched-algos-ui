// class Process {
//   constructor(id, at, BT) {
//     this.id = id;
//     this.AT = AT;
//     this.BT = BT;
//     this.RT = BT;
//     this.tAT = 0;
//     this.WT = 0;
//     this.ct = 0;
//   }
// }

function roundRobinScheduling(processes, quantum) {
  console.log(processes)
  const n = processes.length;
  let currentTime = 0;
  let completedProcesses = 0;
  let totalWT = 0;
  let totalTAT = 0;

  processes.sort((a, b) => a.AT - b.AT);

  for(let i = 0; i < n ; i++) {
    processes[i].RT = processes[i].BT
  }


  while (completedProcesses < n) {
    for (let i = 0; i < n; i++) {
      if (processes[i].RT > 0) {
        const executionTime = Math.min(processes[i].RT, quantum);
        currentTime += executionTime;
        processes[i].RT -= executionTime;

        if (processes[i].RT === 0) {
          processes[i].CT = currentTime;
          processes[i].TAT = processes[i].CT - processes[i].AT;
          processes[i].WT = processes[i].TAT - processes[i].BT;
          totalWT += processes[i].WT;
          totalTAT += processes[i].TAT;
          completedProcesses++;
          console.log(processes[i])
        }
      }
    }
  }

  const avgWT = totalWT / n;
  const avgTAT = totalTAT / n;

  addText("PID&emsp;AT&emsp;BT&emsp;CT&emsp;WT&emsp;TAT", "sub-head");
  processes.forEach(process => {
    addText(
      `${process.id}&emsp;&emsp;&nbsp;${process.AT}&emsp;&ensp;${process.BT}&emsp;&ensp;${process.CT}&emsp;&nbsp;${process.WT}&emsp;&ensp;${process.TAT}`
    );
  });

  addText(`Average Waiting Time: ${avgWT}`);
  addText(`Average Turnaround Time: ${avgTAT}`);

  return {
    processes,
    avgWT,
    avgTAT,
  };
}

// // Example usage
// const processes = [
//   new Process("P1", 0, 5),
//   new Process("P2", 1, 3),
//   new Process("P3", 2, 4),
//   new Process("P4", 4, 2),
// ];

// const quantum = 2;

// // SoRT processes based on arrival time
// // processes.soRT((a, b) => a.AT - b.AT);

// const result = roundRobinScheduling(processes, quantum);

// console.log("PID\tAT\tBT\tCT\tWT\tTAT");
// for (const process of result.processes) {
//   console.log(
//     `${process.id}\t${process.AT}\t${process.BT}\t${process.ct}\t${process.WT}\t${process.TAT}`
//   );
// }

// console.log(`Average Waiting Time: ${result.avgWT}`);
// console.log(`Average Turnaround Time: ${result.avgTAT}`);

