let f
let node

const m = document.getElementById("p-form-mlfq")
const p = document.getElementById("p-form-priority")
const r = document.getElementById("p-form-rr")

f = m
node = f.children[1]

const outp = document.getElementById("para-container")
const sel = document.getElementById("sched-alg")
sel.selectedIndex = 0
let opt = sel.value

const addbtn = document.getElementById("add-process")
const delbtn = document.getElementById("del-process")
const submit = document.getElementById("submit")

sel.onchange = (e) => {
    opt = sel.value

    switch (opt) {
        case 'mlfq':
            f = m
            m.style.display = "block"
            p.style.display = "none"
            r.style.display = "none"
            break;
        case 'priority':
            f = p
            m.style.display = "none"
            p.style.display = "block"
            r.style.display = "none"
            break;
        case 'rr':
            f = r
            m.style.display = "none"
            p.style.display = "none"
            r.style.display = "block"
            break;    
        default:
            break;
    }
    node = f.children[1]

    Array.from(outp.children).forEach(c => {
        c.remove()
    })
}


addbtn.addEventListener("click", () => {
    const clone = node.cloneNode(true)
    clone.children[0].value = ""
    clone.children[1].value = ""
    clone.children[2].value = ""
    if(clone.children[3]) {
        clone.children[3].value = ""
    }
    f.appendChild(clone)
})

delbtn.addEventListener("click", () => {
    if(f.childElementCount == 2) {
        console.log("Only one process present")
        return
    }
    f.removeChild(f.lastChild)
})

submit.addEventListener("click", () => {
    Array.from(outp.children).forEach(c => {
        c.remove()
    })

    let processes = []
    Array.from(f.children).forEach(process => {
        if(process.children[0].value && process.children[1].value && process.children[2].value) {
            processes.push(new Proc(
                process.children[0].value,
                parseInt(process.children[1].value),
                parseInt(process.children[2].value),
                process.children[3] ? parseInt(process.children[3].value) : 1
            ))
        }
    });

    switch (opt) {
        case 'mlfq':
            sched(processes)
            break
        case 'priority':
            pq(processes)
            console.log(opt)
            break
        case 'rr':
            roundRobinScheduling(processes, 5)
            console.log(opt) 
            break
        default:
            console.log("burgir")
    }

    
})

function addText(text, clas = "") {
    let para = document.createElement("p")
    para.innerHTML = text
    para.className = clas

    outp.appendChild(para)
}

