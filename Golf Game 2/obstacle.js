import { Ball } from "./ball.js";

export class Obstacle {
    static instances = [];

    constructor(x, y, size, colour = 'grey') {
        this.x = x;
        this.y = y;
        this.width = size;
        this.height = size;
        this.colour = colour;

        Obstacle.instances.push(this);
    }

    draw(ctx) {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    handleCollision(ball) {
        const collisionInfo = detectCollision(this, ball);
        if (!collisionInfo.collision) return;

        const side = collisionInfo.side;

        if (side === 'left') {
            ball.vx = -Math.abs(ball.vx);
        } else if (side === 'right') {
            ball.vx = Math.abs(ball.vx);
        } else if (side === 'top') {
            ball.vy = -Math.abs(ball.vy);
        } else if (side === 'bottom') {
            ball.vy = Math.abs(ball.vy);
        }
    }

    update(ctx, ball) {
        this.handleCollision(ball);
        this.draw(ctx);
    }

    static drawAll(ctx, ball) {
        for (const obstacle of Obstacle.instances) {
            obstacle.update(ctx, ball);
        }
    }

    static clearAll() {
        Obstacle.instances = [];
    }
}

function detectCollision(obstacle, ball) {
    const obstacleLeft = obstacle.x;
    const obstacleRight = obstacle.x + obstacle.width;
    const obstacleTop = obstacle.y;
    const obstacleBottom = obstacle.y + obstacle.height;

    const ballLeft = ball.x - ball.radius;
    const ballRight = ball.x + ball.radius;
    const ballTop = ball.y - ball.radius;
    const ballBottom = ball.y + ball.radius;

    if (obstacleRight > ballLeft &&
        obstacleLeft < ballRight &&
        obstacleBottom > ballTop &&
        obstacleTop < ballBottom) {
        
        const overlapLeft = ballRight - obstacleLeft;
        const overlapRight = obstacleRight - ballLeft;
        const overlapTop = ballBottom - obstacleTop;
        const overlapBottom = obstacleBottom - ballTop;

        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

        if (minOverlap === overlapLeft) {
            return { collision: true, side: 'left' };
        } else if (minOverlap === overlapRight) {
            return { collision: true, side: 'right' };
        } else if (minOverlap === overlapTop) {
            return { collision: true, side: 'top' };
        } else if (minOverlap === overlapBottom) {
            return { collision: true, side: 'bottom' };
        }
    }

    return { collision: false };
}
