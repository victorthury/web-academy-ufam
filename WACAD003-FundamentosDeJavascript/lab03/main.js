// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// bola
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

Ball.prototype.update = function () {
  if (this.x + this.size >= width) {
    this.velX = -this.velX;
  }

  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }

  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < shapes.length; j++) {
    if (!(this === shapes[j])) {
      const dx = this.x - shapes[j].x;
      const dy = this.y - shapes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + shapes[j].size) {
        shapes[j].color = this.color = randomHsl(color);
      }
    }
  }
};

// quadrado
function Square(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Square.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.size, this.size);
};

Square.prototype.update = function () {
  if (this.x + this.size >= width) {
    this.velX = -this.velX;
  }

  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }

  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

Square.prototype.collisionDetect = function () {
  for (let j = 0; j < shapes.length; j++) {
    if (!(this === shapes[j])) {
      const dx = this.x - shapes[j].x;
      const dy = this.y - shapes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + shapes[j].size) {
        shapes[j].color = this.color = randomHsl(color);
      }
    }
  }
};

// triangulo
function Triangle(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Triangle.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x - this.size / 2, this.y + this.size);
  ctx.lineTo(this.x + this.size / 2, this.y + this.size);

  ctx.closePath();
  ctx.fill();
};

Triangle.prototype.update = function () {
  if (this.x + this.size >= width) {
    this.velX = -this.velX;
  }

  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }

  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

Triangle.prototype.collisionDetect = function () {
  for (let j = 0; j < shapes.length; j++) {
    if (!(this === shapes[j])) {
      const dx = this.x - shapes[j].x;
      const dy = this.y - shapes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + shapes[j].size) {
        shapes[j].color = this.color = randomHsl(color);
      }
    }
  }
};

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < shapes.length; i++) {
    shapes[i].draw();
    shapes[i].update();
    shapes[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

const color = prompt(
  "Insira uma cor, escreva azul, verde e vermelho"
).toLocaleLowerCase();

if (color === "azul") {
  alert("Você escolheu a cor azul!");
} else if (color === "verde") {
  alert("Você escolheu a cor verde!");
} else {
  alert(
    "Você escolheu vermelho. Caso tenha escrito errado, esse será o padrão"
  );
}

function randomHsl(color) {
  let baseHue;
  if (color === "azul") {
    baseHue = 240;
  } else if (color === "verde") {
    baseHue = 120;
  } else {
    baseHue = 0;
  }

  let saturation = 100; // sempre bem saturada
  let lightness = 15 + Math.random() * 70; // varia de 30% a 70%

  return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
}

let shapes = [];

while (shapes.length < 25) {
  let size = random(10, 20);
  let shape;
  let randomShapeGenerator = random(1, 3);

  if (randomShapeGenerator === 1) {
    shape = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomHsl(color),
      size
    );
  } else if (randomShapeGenerator == 2) {
    shape = new Square(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomHsl(color),
      size
    );
  } else {
    shape = new Triangle(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomHsl(color),
      size
    );
  }

  shapes.push(shape);
}

loop();
