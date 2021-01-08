let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let startbutton = document.getElementById('start');

startbutton.addEventListener("click", start);

//width and height of screen -4 for the canvas border
width = canvas.width;
height = canvas.height;

let started = false;
let cars = [];

class Car {
    constructor(p) {
        this.width = 80;
        this.height = 25;
        this.x = 10;
        this.y = p.y || 50;
        this.speed = p.speed || 2;
        this.bodycolour = p.bodycolour || "red";
        this.windowcolour = p.windowcolour || "white";
        this.number = p.number || "1";
    }

    move() {
        //increment velocity
        //if car hits left or right sides, change its horizontal direction
        if (this.x + 70 >= canvas.width || this.x - this.size <= 0) {
            win(this.number);
        }

        this.x += 2 * this.speed;
        this.speed = random(1, 5);
    }

    //draw car using x, y, size and colour
    draw() {
        //body
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.bodycolour;
        ctx.fill();

        //roof
        ctx.beginPath();
        ctx.rect(this.x + 10, this.y - 15, this.width - 20, this.height);
        ctx.fillStyle = this.bodycolour;
        ctx.fill();

        //windows
        ctx.beginPath();
        ctx.rect(this.x + 14, this.y - 10, 22, 20);
        ctx.fillStyle = this.windowcolour;
        ctx.fill();
        ctx.beginPath();
        ctx.rect(this.x + 44, this.y - 10, 22, 20);
        ctx.fillStyle = this.windowcolour;
        ctx.fill();

        //wheels
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.x + 15, this.y + 30, 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.x + 65, this.y + 30, 10, 0, 2 * Math.PI);
        ctx.fill();

        //number
        ctx.font = "bold 30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(this.number, this.x + this.width / 2, this.y + this.height / 2 + 10);
        ctx.fillStyle = "black";
        ctx.strokeText(this.number, this.x + this.width / 2, this.y + this.height / 2 + 10);
    }
}

function run() {
    if (ctx) {
        createCars();
        drawCar();
    }
}

function win(number) {
    alert("Car " + number + " won!");
    started = false;
    cars = [];
    createCars();
};

function createCars() {
    fetch("http://www.colr.org/json/colors/random/8", { cache: "no-cache" }).then(function (response) {
        response.json().then(function (json) {
            console.log(json.colors[0].hex);
            while (cars.length < 4) {
                let c = new Car({
                    y: cars.length * 100 + 200,
                    bodycolour: "#" + json.colors[cars.length].hex,
                    windowcolour: "#" + json.colors[cars.length + 4].hex,
                    speed: random(1, 5),
                    number: cars.length + 1,
                });
                cars.push(c);
            }
        });
    });
}

function drawCar() {
    //fill screen with white
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    //draw each car and then move it
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw();
        if (started == true) {
            cars[i].move();
        }
    }
    requestAnimationFrame(drawCar);
}

function random(min, max) {
    //return random value in range min - max
    return num = Math.floor(Math.random() * (max - min + 1)) + min;
}

function start() {
    started = true;
}

run();
