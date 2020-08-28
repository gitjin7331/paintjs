const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode"); 
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR; 
ctx.lineWidth = 2.5;

let painting = false;
let filling = false; 

function onMouseMove(event){
    /* offsetX, Y : 해당 이벤트가 발생하는 구역 내의 좌표 */
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting(event) {
    painting = true;
}

function stopPainting(event) {
    painting = false;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color; 
}

function handleRangeChange(event){
    const { value } = event.target; /* {변수명} = event.target 변수명이 타켓 */
    ctx.lineWidth = value;
}

function handleModeClick(event){
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"; 
    }
}

function handleCanvasClick(){
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCavasSave(event){
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "my_painting";
    link.click(); 
}

if(canvas){
    /* mousemove : 마우스를 움직이면 발생하는 이벤트 */
    canvas.addEventListener("mousemove", onMouseMove);
    /* mousedown : 마우스를 클릭하고 있을 경우 발생 */  
    canvas.addEventListener("mousedown", startPainting);  
    /* mouseup : 마우스를 클릭하지 않은 상태 */ 
    canvas.addEventListener("mouseup", stopPainting);
    /* mouseleave : 마우스가 캔버스를 벗어났을 때 */
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
); /* color는 array안의 각각의 아이템을 대표하는 변수  */

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn){
    saveBtn.addEventListener("click", handleCavasSave);
}
