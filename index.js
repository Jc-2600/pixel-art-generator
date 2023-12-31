let container = document.querySelector(".container")
let gridButton = document.getElementById("submit-grid")
let clearGridButton = document.getElementById("clear-grid")
let gridWidth = document.getElementById("width-range")
let gridHeigth = document.getElementById("heigth-range")
let colorButton = document.getElementById("color-input")
let eraseBtn = document.getElementById("erase-btn")
let printBtn = document.getElementById("print-btn")
let widthValue = document.getElementById("width-value")
let heigtValue = document.getElementById("heigth-value")


//Creamos los eventos para las acciones del mouse

let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    mobe: "touchmove",
    up: "touchend",
  },
};

let deviceType = ""

let draw = false
let erase = false

const isTouchDevice = () =>{
    try{
        document.createEvent("TouchEvent")
        deviceType = "touch"
        return true
    }catch (e){
        deviceType = "mouse"
        return false
    }
}

isTouchDevice()

gridButton.addEventListener("click", ()=>{
    container.innerHTML = "";
    let count = 0; 
    for (let i = 0; i < gridHeigth.value; i++) {
        count += 2;
        let div = document.createElement("div")
        div.classList.add("gridRow");

        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            let col = document.createElement("div")
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${count}`);
            col.addEventListener(events[deviceType].down, ()=>{
                draw = true
                if(erase){
                    col.style.backgroundColor = "transparent"
                }else{
                    col.style.backgroundColor = colorButton.value
                }
            })

            col.addEventListener(events[deviceType].move, (e)=>{
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY
                ).id;
                checker(elementId);
            })

            col.addEventListener(events[deviceType].up, ()=>{
                draw = false;
            })

            div.appendChild(col);
        }
        container.appendChild(div)
    }
})

function checker(elementId){
    let gridColumns = document.querySelectorAll(".gridCol")
    gridColumns.forEach((element)=>{
        if(elementId == element.id){
            if(draw && !erase){
                element.style.backgroundColor = colorButton.value;
            }else if(draw && erase){
                element.style.backgroundColor = "transparent";
            }
        }
    })
}

clearGridButton.addEventListener("click", ()=>{
    container.innerHTML = "";
})

eraseBtn.addEventListener("click", ()=>{
    erase = true;
    console.log("I'm here in  erase")
})

printBtn.addEventListener("click", ()=>{
    erase = false;
    console.log("I'm here in  erase");
})

gridWidth.addEventListener("input", ()=>{
    widthValue.innerHTML = gridWidth.value <= 9 ? `0${gridWidth.value}` : gridWidth.value;
})

gridHeigth.addEventListener("input", ()=>{
    heigtValue.innerHTML = gridHeigth.value <= 9 ? `0${gridHeigth.value}` : gridHeigth.value;
})


window.onload = ()=>{
    gridWidth.value = 0;
    gridHeigth.value = 0;
}
















