let f
let node

const m = document.getElementById("p-form-mlfq")
const p = document.getElementById("p-form-priority")
const r = document.getElementById("p-form-rr")

f = m

const outp = document.getElementById("output-box")
const sel = document.getElementById("sched-alg")
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
    node = f.children[0]
}


addbtn.addEventListener("click", () => {
    const clone = node.cloneNode(true)
    clone.children[0].value = ""
    clone.children[1].value = ""
    clone.children[2].value = ""
    f.appendChild(clone)
})

delbtn.addEventListener("click", () => {
    if(f.childElementCount == 1) {
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
                process.children[3] ? parseInt(process.children[3].value) : null
            ))
        }
    });

    switch (opt) {
        case 'mlfq':
            sched(processes)
            break
        case 'priority':
            console.log(processes)
            console.log(opt)
            break
        case 'rr':
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

