import { Circle } from './circleClass.js';

// Select the canvas element
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mouse position and velocity
const mouse = { x: 0, y: 0, vx: 0, vy: 0 };
let lastMousePosition = { x: 0, y: 0 };

// Update mouse position and velocity on mousemove
canvas.addEventListener('mousemove', (event) => {
    const deltaX = event.clientX - lastMousePosition.x;
    const deltaY = event.clientY - lastMousePosition.y;

    mouse.vx = deltaX;
    mouse.vy = deltaY;

    mouse.x = event.clientX;
    mouse.y = event.clientY;

    lastMousePosition.x = event.clientX;
    lastMousePosition.y = event.clientY;
});

// Create multiple circles
Circle.drawCircles(1000, canvas);

// Animation function
function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Circle.drawAll(ctx, mouse);

    // Call animate function again
    requestAnimationFrame(animate);
}

// Start the animation
animate();
