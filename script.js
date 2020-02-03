var canvas = document.getElementById("my_canvas");
var context = canvas.getContext("2d");

var width = canvas.width = window.clientWidth;
var height = canvas.height = window.clientHeight;
var elements = []

function randomInteger(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }
class element {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.angle = Math.floor(Math.random()*360);
        this.colors = []
        this.red = randomInteger(0,255);
        this.colors.push(this.red);
        this.green = randomInteger(0,255);
        this.colors.push(this.green);
        this.blue = randomInteger(0,255);
        this.colors.push(this.blue);

        this.color = 'rgb('+[this.red,this.green,this.blue].join(',')+')';
        this.radius = randomInteger(6,12);
        this.speed = 2;
        this.direction = {
            x:Math.cos(this.angle)*this.radius,
            y:Math.sin(this.angle)*this.radius
        };
        this.area = this.radius*this.radius;
        this.type = ""
        this.canvasNumber =""
    }

    update() {
        this.x +=this.direction.x;
        this.y +=this.direction.y
        this.border()
    };
    border() {
        if(this.x>=width || this.x<=0){
            this.direction.x *=-1;
        }
        if(this.y>=height || this.y<=0){
            this.direction.y *=-1
        }
    };
    make(i){
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        let figure = Math.floor(Math.random()*100);
        if(figure<50){
            context.rect(this.x, this.y, this.radius,this.radius);
            this.type = "rectangle"
            this.canvasNumber = i
        }
        else{
            context.arc(this.x,this.y,this.radius,0,Math.PI*2);
            this.type = "circle"
            this.canvasNumber = i 
        }
        context.fillStyle = "white"
        context.fill()
        context.closePath();
        
    }
}
function build(){
    for(var i = 0;i<20;i++){
        elements.push(new element())
    }
    console.log(elements)
    move()
}
function move(){
    context.fillRect(0,0,width,height);
    for(let i=0;i<elements.length;i++){
            elements[i].update();
            elements[i].make(i+1);
    }
}

build()
