import * as physics from "./physics.js";

export class Circle {
    static instances = [];

    constructor(position = [0, 0], direction = [true, true], radius = 10) {
        this.position = {
            x: position[0],
            y: position[1]
        };
        this.radius = radius;
        let v = 7.5;
        this.velocity = {
            x: direction[1] ? v : -v,
            y: direction[0] ? v : -v
        };
        this.color = this.randomColor();

        Circle.instances.push(this);
    }

    randomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    update(canvas, mouse) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        physics.wallCollision(this, canvas);
        physics.collision(this);
        if (mouse) {
            physics.mouseCollision(this, mouse);
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    static drawCircles(amount, canvas) {
        for (let i = 0; i < amount; i++) {
            new Circle([Math.random() * canvas.width, Math.random() * canvas.height], [Math.random() > 0.5, Math.random() > 0.5]);
        }
    }

    static drawAll(ctx, mouse) {
        for (const circle of Circle.instances) {
            circle.draw(ctx);
            circle.update(ctx.canvas, mouse);
        }
    }
}
