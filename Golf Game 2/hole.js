// hole.js
export const Hole = {
    x: 500,  // Position of the hole (adjust as needed)
    y: 500,
    radius: 15,
    color: 'black',

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    },

    contains(ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.hypot(dx, dy);
        return distance < this.radius + ball.radius / 10;
    },

    dragToHole(ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        ball.vx = dx * 0.05; // Adjust the dragging speed as needed
        ball.vy = dy * 0.05;
    }
};