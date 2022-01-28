
let currentColor = 'black'
let canDraw = false

let mouseX = 0
let mouseY = 0

let screen = document.querySelector('#tela')
let ctx = screen.getContext('2d')

// functions
const colorClick = (e) => {
    let color = e.target.dataset.color
    currentColor = color

    document.querySelector('.color.active').classList.remove('active')
    e.target.classList.add('active')
}

const mouseDown = (e) => {
    canDraw = true
    mouseX = e.pageX - screen.offsetLeft//para pegar o tamanho do canvas
    mouseY = e.pageY - screen.offsetTop


}

const mouseMove = (e) => {
    if(canDraw) {
        
        draw(e.pageX, e.pageY) 
    }
}

const mouseUp = () => {
    canDraw = false
}

const draw = (x, y) => {
    let pointX = x - screen.offsetLeft
    let pointY = y - screen.offsetTop

    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.lineJoin = "round"
    ctx.moveTo(mouseX, mouseY)
    ctx.lineTo(pointX, pointY)
    ctx.closePath()
    ctx.strokeStyle = currentColor
    ctx.stroke()

    mouseX = pointX
    mouseY = pointY
}

const clearScreen = () => {
    ctx.setTransform(1,0,0,1,0,0)
    ctx.clearReact(0,0, ctx.canvas.width, ctx.canvas.height)
}

// events
document
    .querySelectorAll('.colorArea .color')  
    .forEach(item => item.addEventListener('click', colorClick))

document.querySelector('.clear').addEventListener('click', clearScreen)

screen.addEventListener('mousedown', mouseDown)
screen.addEventListener('mousemove', mouseMove)
screen.addEventListener('mouseup', mouseUp)