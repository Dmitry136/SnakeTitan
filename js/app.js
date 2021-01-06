// делаем новый див с классом field
let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');
// делаем див с классом exel и разбиваем его на циклы 100 штук
for (let i = 1; i < 101; i++) {
   let excel = document.createElement('div');
   field.appendChild(excel);
   excel.classList.add('excel');
}

// присваеваем координаты для каждой ячейки excel
let excel = document.getElementsByClassName('excel');
let x = 1,
   y = 10;

for (let i = 0; i < excel.length; i++) {
   if (x > 10) {
      x = 1;
      y--;
   }
   excel[i].setAttribute('posX', x);
   excel[i].setAttribute('posY', y);
   x++;
}

// задаем позицию змеи на поле
function generateSnake() {
   let posX = Math.round(Math.random() * (10 - 3) + 3);
   let posY = Math.round(Math.random() * (10 - 1) + 1);
   return [posX, posY];
}

let cordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + cordinates[0] + '"][posY = "' + cordinates[1] + '"]'),
document.querySelector('[posX = "' + (cordinates[0] - 1) + '"][posY = "' + cordinates[1] + '"]'),
document.querySelector('[posX = "' + (cordinates[0] - 2) + '"][posY = "' + cordinates[1] + '"]')];

for (let i = 0; i < snakeBody.length; i++) {
   snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('head');

// создаем мышь и ее позицию
let mouse;

function createMouse() {
   function generateMouse() {
      let posX = Math.round(Math.random() * (10 - 3) + 3);
      let posY = Math.round(Math.random() * (10 - 1) + 1);
      return [posX, posY];
   }

   let mouseCordinates = generateMouse();
   mouse = document.querySelector('[posX = "' + (mouseCordinates[0] - 2) + '"][posY = "' + mouseCordinates[1] + '"]');

   while (mouse.classList.contains('snakeBody')) {
      let mouseCordinates = generateMouse();
      mouse = document.querySelector('[posX = "' + (mouseCordinates[0] - 2) + '"][posY = "' + mouseCordinates[1] + '"]');

   }

   mouse.classList.add('mouse');
}

createMouse();
let direction = 'right';
let steps = false;

let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
display: block;
margin: auto;
margin-top: 40px;
font-size: 30px;
color: teal`;

let score = 0;
input.value = `Ваши набранные очки: ${score}`;

function move() {
   let snakeCordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
   snakeBody[0].classList.remove('head');
   snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
   snakeBody.pop();

   if (direction == 'right') {
      if (snakeCordinates[0] < 10) {
         snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCordinates[0] + 1) + '"][posY = "' + snakeCordinates[1] + '"]'));
      } else {
         snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCordinates[1] + '"]'));
      }
   } else if (direction == 'left') {
      if (snakeCordinates[0] > 1) {
         snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCordinates[0] - 1) + '"][posY = "' + snakeCordinates[1] + '"]'));
      } else {
         snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCordinates[1] + '"]'));
      }
   } else if (direction == 'up') {
      if (snakeCordinates[1] < 10) {
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "' + (+snakeCordinates[1] + 1) + '"]'));
      } else {
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "1"]'));
      }
   } else if (direction == 'down') {
      if (snakeCordinates[1] > 1) {
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "' + (snakeCordinates[1] - 1) + '"]'));
      } else {
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "10"]'));
      }
   }

   if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
      mouse.classList.remove('mouse');
      let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
      let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
      snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
      createMouse();
      score++;
      input.value = `Ваши набранные очки: ${score}`;
   }

   if (snakeBody[0].classList.contains('snakeBody')) {
      setTimeout(() => {
         alert(`Титаны Вас съели. Ваши набранные очки: ${score}`);
      }, 300);

      clearInterval(interval);
      snakeBody[0].style.background = 'url(../img/sdefault.png) center no-repeat';
      snakeBody[0].style.backgroundSize = "cover";
   }

   snakeBody[0].classList.add('head');
   for (let i = 0; i < snakeBody.length; i++) {
      snakeBody[i].classList.add('snakeBody');
   }

   steps = true;
}

let interval = setInterval(move, 200);

window.addEventListener('keydown', function (e) {
   if (steps == true) {
      if (e.keyCode == 37 && direction != 'right') {
         direction = 'left';
         steps = false;
      }
      else if (e.keyCode == 38 && direction != 'down') {
         direction = 'up';
         steps = false;
      }
      else if (e.keyCode == 39 && direction != 'left') {
         direction = 'right';
         steps = false;
      }
      else if (e.keyCode == 40 && direction != 'up') {
         direction = 'down';
         steps = false;
      }
   }

});