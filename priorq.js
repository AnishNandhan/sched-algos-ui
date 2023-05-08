 function pq(arr) {
    let l = arr;
    let li = []
    arr.forEach((item) => {li.push(item) })
    let d = {};
    let di = {};
    let tot = 0;

    for (let k = 0; k < l.length; k++) {
      tot += l[k].BT;
    }
    let smalltime=l[0].AT
    for (let i = 0; i < l.length; i++) {
      let s = i;
      if(l[i].AT<smalltime){
        smalltime=l[i].AT
      }
      for (let j = i; j < l.length; j++) {
        if (l[j].prior < l[s].prior) {
          s = j;
        }
      }
      [l[i], l[s]] = [l[s], l[i]];
    }
    let i = 0;
    let initial = 0;
    let key;
    console.log(arr[initial].AT)
    if(arr[initial].AT==undefined){
        console.log("yea...");
    }
    addText("&emsp;", "sub-head");
    addText("pid&emsp;&emsp;&emsp;&emsp;initial time&emsp;&emsp;&emsp;&emsp;end time ", "sub-head");
    tot=tot+smalltime
    while (i < tot && l.length!=0) {
      if (l[initial].AT <= i && initial == 0) {
        let temp = i;
        i = i + l[initial].BT;
        addText(l[initial].id + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + temp + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + i, "num");
        console.log("  ", l[initial].id, "           ", temp, "           ", i);
        if (!(l[initial].id in d)) {
          key=l[initial].id
          di[key]=i
          d[key] = temp - l[initial].AT;
        }
        else{
          key=l[initial].id
          d[key] =d[key]+ temp - di[key];
          di[key]=i
        }
        l.splice(initial, 1);
        initial = 0;
      } else if (l[initial].AT <= i && initial != 0) {
        let temp = i;
        l[initial].minus();
        i = i + 1;
        addText(l[initial].id + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + temp + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + i, "num");
        console.log("  ", l[initial].id, "           ", temp, "           ", i);
        if (!(l[initial].id in d)) {
            key=l[initial].id
            di[key]=i
            d[key] = temp - l[initial].AT;
          }
          else{
            key=l[initial].id
            d[key] =d[key]+ temp - di[key];
            di[key]=i
          }
        if(l[initial].BT==0){
            l.splice(initial,1)
        }
      initial = 0;
    } else {
        if(l.length==1){
            i=i+1;
        }else{
            if((l.length-1)==initial){
                i=i+1
                initial=0
            }
            else{
                initial += 1;
            }
        }
    }
  }
  addText("&emsp;", "sub-head")
addText("process&emsp;&emsp;&emsp;&emsp;priority&emsp;&emsp;&emsp;&emsp;&emsp;BT&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;AT&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;WT&emsp;&emsp;&emsp;&emsp;&emsp;TAT", "sub-head");
  console.log(" ");
  console.log("process    priority    BT    AT    WT    TAT");
  i=0;
  let val;
  for (let i = 0; i < li.length; i++) {
    key=li[i].id
    val=li[i].BBT + d[key]
    if(d[key]==undefined){
        d[key]=0
        val=li[i].BT
    }
    addText(li[i].id + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + li[i].prior+ "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;" + li[i].BBT+ "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" +li[i].AT+ "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;" +d[key]+ "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" +val, "num");
    console.log(li[i].id, "          ", li[i].prior, "      ", li[i].BBT, "    ", li[i].AT, "    ", d[key], "    ", li[i].BBT + d[key]);
  }
}
