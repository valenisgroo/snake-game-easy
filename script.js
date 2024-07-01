let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};
let juego;

function crearFondo() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function crearSerpiente() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function dibujarComida() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function actualizar(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

document.addEventListener('keydown', actualizar);

function iniciarJuego() {
    if (snake[0].x >= 16 * box || snake[0].x < 0 || snake[0].y >= 16 * box || snake[0].y < 0) {
        clearInterval(juego);
        document.getElementById("restart").style.display = "block";
        alert('GAME OVER');
        return;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(juego);
            document.getElementById("restart").style.display = "block";
            alert('GAME OVER');
            return;
        }
    }

    crearFondo();
    crearSerpiente();
    dibujarComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

function startGame() {
    resetGame();  
}

function resetGame() {
    document.getElementById("restart").style.display = "none";
    clearInterval(juego);
    iniciarVariables();
    crearFondo();
    crearSerpiente();
    dibujarComida();
    juego = setInterval(iniciarJuego, 100);
}

function iniciarVariables() {
    snake = [{ x: 8 * box, y: 8 * box }];
    direction = "right";
    food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    };
}

iniciarVariables();
crearFondo();
crearSerpiente();
dibujarComida();
