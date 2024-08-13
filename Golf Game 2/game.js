import { Ball } from './ball.js';
import { Arrow } from './arrow.js';
import { Hole } from './hole.js';
import { Obstacle } from './obstacle.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const slider = document.getElementById('slider');
const addObstacleButton = document.getElementById('addObstacleButton');
const strokesEle = document.getElementById('numOfStrokes');

let power = 50;
let isShooting = false;
let isSpinning = true;
let draggingToHole = false;
let strokes = 0;

function hitBall() {
    if (isShooting && Ball.isStopped) {
        const rad = Arrow.angle - Math.PI / 2;
        Ball.vx = Math.cos(rad) * power * 0.1;
        Ball.vy = Math.sin(rad) * power * 0.1;
        isShooting = false;
        isSpinning = false;
        strokes ++;
        strokesEle.innerHTML = `Num of Stokes: ${strokes}`
        generateBlocks(10);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        isShooting = true;
    }
});

function resetGame() {
    Ball.x = 50;
    Ball.y = 50;
    Ball.vx = 0;
    Ball.vy = 0;
    draggingToHole = false;
    Obstacle.clearAll();
    strokes = 0;
    strokesEle.innerHTML = `Num of Stokes: ${strokes}`
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isSpinning) {
        Arrow.update();
        if(strokes === 10){
            resetGame();
        }
    }

    hitBall();
    Ball.update(canvas);
    Hole.draw(ctx);
    Obstacle.drawAll(ctx, Ball);
    Ball.draw(ctx);
    Arrow.draw(ctx, Ball);

    if (Hole.contains(Ball)) {
        draggingToHole = true;
    } else {
        draggingToHole = false;
    }

    if (draggingToHole) {
        Hole.dragToHole(Ball);
        if (Math.hypot(Hole.x - Ball.x, Hole.y - Ball.y) < 1) {
            Ball.vx = 0;
            Ball.vy = 0;
            setTimeout(resetGame, 1000);
        }
    }

    if (Ball.isStopped) {
        isSpinning = true;
    } else {
        isSpinning = false;
    }

    requestAnimationFrame(update);
}

slider.addEventListener('input', (e) => {
    power = parseInt(e.target.value);
});

const numOfCells = 20;

addObstacleButton.addEventListener('click', () => {
    const cellSize = Math.min(canvas.width, canvas.height) / numOfCells;
    const x = Math.floor(Math.random() * numOfCells) * cellSize;
    const y = Math.floor(Math.random() * numOfCells) * cellSize;
    new Obstacle(x, y, cellSize);
});

function generateBlocks(amount){
    for(let i = 0; i < amount; i++){
        const cellSize = Math.min(canvas.width, canvas.height) / numOfCells;
        const x = Math.floor(Math.random() * numOfCells) * cellSize;
        const y = Math.floor(Math.random() * numOfCells) * cellSize;
        new Obstacle(x, y, cellSize);
    }
}
update();
