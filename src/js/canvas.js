import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

const gravity = 0.6
const fiction = 0.99

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener('click', () => {
  init()
})

// Objects
function Ball(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx;
    this.dy = dy;
    this.radius = radius
    this.color = color

    this.draw = function() {
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      c.fillStyle = this.color
      c.fill()
      c.stroke
      c.closePath()
    }
  
    this.update = function() {
      if(this.x + radius > innerWidth || this.x - radius < 0){
        this.dx = -this.dx
      }
      if(this.y + radius + this.dy> innerHeight){
        this.dy = -this.dy * fiction
      }else{
        this.dy += gravity
      }

      this.x += this.dx
      this.y += this.dy
      this.draw()
    }
}

function randomNumber(min, max){
  return Math.floor((Math.random() * (max - min + 1) + min));
}

function randomColor(array){
  return array[randomNumber(0, array.length)]
}

// Implementation
let ballArray = []

function init() {
  ballArray = []

  for (let i = 0; i < 400; i++) {
    let radius = randomNumber(5, 30);
    let x = randomNumber(radius, innerWidth-radius)
    let y = randomNumber(radius, innerHeight-radius)
    let dx = randomNumber(-2, 2)
    let dy = randomNumber(-2, 2)
    let color = randomColor(colors)
    ballArray.push(new Ball(x, y, dx, dy, radius, color))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  for(let i = 0; i < ballArray.length; i++){
    ballArray[i].update();
  }

  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update()
  // })
}

init()
animate()
