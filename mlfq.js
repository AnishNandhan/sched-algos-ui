let n
let Q1 = []
let Q2 = []
let Q3 = []

function sortByArrival() {
    let temp
    let i, j
    for(i = 0; i < n; i++) {
        for(j = i + 1; j < n; j++) {
            if(Q1[i].AT > Q1[j.AT]) {
                temp = Q1[i]
                Q1[i] = Q1[j]
                Q1[j] = temp
            }
        }
    }
}

function sched(arr) {
    let i, j, k = 0, r = 0, time = 0, tq1 = 5, tq2 = 8, flag = 0, c
    let totalTAT = 0, totalWT = 0

    Q1 = arr
    n = arr.length
    
    for(i = 0; i < n; i++) {
        Q1[i].RT = Q1[i].BT
    }

    sortByArrival(Q1)

    time = Q1[0].AT
    
    addText("Process in first queue following RR with qt=5", "sub-head")
    addText("Process&emsp;&emsp;RT&emsp;&emsp;WT&emsp;&emsp;TAT&emsp;&emsp;", "sub-head")

    for(i = 0; i < n; i++) {
        if(Q1[i].RT <= tq1) {
            time += Q1[i].RT
            Q1[i].RT = 0
            Q1[i].WT = time - Q1[i].AT - Q1[i].BT
            Q1[i].TAT = time - Q1[i].AT
            totalTAT += Q1[i].TAT
            totalWT += Q1[i].WT
            addText(Q1[i].id + "&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;" + Q1[i].BT + "&emsp;&emsp;&emsp;" + Q1[i].WT + "&emsp;&emsp;&emsp;" + Q1[i].TAT, "num")
        }
        else {
            // Q2[k].WT = time
            time += tq1
            Q1[i].RT -= tq1
            // Q2[k].BT = Q1[i].RT
            // Q2[k].id = Q1[i].id
            Q2.push(new Proc(Q1[i].id, time, Q1[i].RT))
            Q2[k].RT = Q2[k].BT
            // Q2[k].TAT += time - Q2[k].AT
            k += 1
            flag = 1
        }
    }

    if (flag == 1) {
        addText("Process in second queue following RR with qt=8", "sub-head")
        addText("Process&emsp;&emsp;RT&emsp;&emsp;WT&emsp;&emsp;TAT&emsp;&emsp;", "sub-head")
    }

    for(i = 0; i < k; i++) {
        if(Q2[i].RT <= tq2) {
            time += Q2[i].RT
            Q2[i].RT = 0
            Q2[i].WT = time - tq1- Q2[i].BT
            Q2[i].TAT = time - Q2[i].AT
            totalTAT += Q2[i].TAT
            totalWT += Q2[i].WT
            addText(Q2[i].id + "&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;" + Q2[i].BT + "&emsp;&emsp;&emsp;" + Q2[i].WT + "&emsp;&emsp;&emsp;" + Q2[i].TAT, "num")
        }
        else {
            // Q3[r].AT=time
            time+=tq2
            Q2[i].RT-=tq2
            // Q3[r].BT=Q2[i].RT            
            // Q3[r].id=Q2[i].id
            Q3.push(new Proc(Q2[i].id, time, Q2[i].RT))
            Q3[r].RT=Q3[r].BT
            // Q3[r].TAT += time - Q3[r].AT
            r=r+1
            flag=2
        }
    }

    if(flag == 2) {
        addText("Process in third queue following FCFS", "sub-head")
        addText("Process&emsp;&emsp;RT&emsp;&emsp;WT&emsp;&emsp;TAT&emsp;&emsp;", "sub-head")
    }

    for(i = 0; i < r; i++) {
        if(i == 0) {
            Q3[i].CT = Q3[i].BT + time -tq1 - tq2
        }
        else {
            Q3[i].CT = Q3[i-1].CT + Q3[i].BT
        }
    }

    for(i = 0; i < r; i++) {
        Q3[i].TAT = Q3[i].CT
        Q3[i].WT = Q3[i].TAT - Q3[i].BT
        totalTAT += Q3[i].TAT
        totalWT += Q3[i].WT
        addText(Q3[i].id + "&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;" + Q3[i].BT + "&emsp;&emsp;&emsp;" + Q3[i].WT + "&emsp;&emsp;&emsp;" + Q3[i].TAT, "num")
    }
    addText("Average Waiting Time:   " + totalWT / n, "sub-head")
    addText("Average Turnaroung Time:   " + totalTAT / n, "sub-head")
}