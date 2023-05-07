const f = document.getElementById("p-form")
const node = f.children[0]
const outp = document.getElementById("output-box")

const addbtn = document.getElementById("add-process")
const delbtn = document.getElementById("del-process")
const submit = document.getElementById("submit")


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
            ))
        }
    });

    let opt = document.getElementById("sched-alg").value

    switch (opt) {
        case 'mlfq':
            console.log(opt)
            sched(processes)
            break
        case 'priority':
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

