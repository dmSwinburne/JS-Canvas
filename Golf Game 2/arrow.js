// arrow.js
export const Arrow = {
    length: 50,
    angle: 0,
    color: 'red',
    spinSpeed: 0.2,  // Angular velocity for the arrow's spin

    draw(ctx, ball){
        ctx.save();
        ctx.translate(ball.x, ball.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.moveTo(0, -this.length);
        ctx.lineTo(-10, -this.length + 20);
        ctx.lineTo(10, -this.length + 20);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
        
    },

    update(){
        this.angle += this.spinSpeed;
    }
};

