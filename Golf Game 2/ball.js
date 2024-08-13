// ball.js
export const Ball = {
    x: 50,
    y: 50,
    radius: 10,
    color: 'white',
    vx: 0,
    vy: 0,
    isStopped: true,

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    },

    update(canvas){
        this.x += this.vx;
        this.y += this.vy;
    
        this.isStopped = Math.abs(Ball.vx) <= 0.01 && Math.abs(Ball.vy) <= 0.01;

        // Bounce off the walls
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vx *= -0.8; // Dampen velocity
        } else if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius;
            this.vx *= -0.8; // Dampen velocity
        }
    
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.vy *= -0.8; // Dampen velocity
        } else if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.vy *= -0.8; // Dampen velocity
        }
    
        // Increase friction to make ball stop faster
        this.vx *= 0.98;
        this.vy *= 0.98;
    },
};
