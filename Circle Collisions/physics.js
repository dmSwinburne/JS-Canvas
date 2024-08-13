import { Circle } from "./circleClass.js";

export const wallCollision = (circle, canvas) => {
    // Handle collision with left wall
    if (circle.position.x - circle.radius < 0) {
        circle.position.x = circle.radius; // Move the circle to the edge
        circle.velocity.x = -circle.velocity.x; // Reverse velocity
    }
    // Handle collision with right wall
    else if (circle.position.x + circle.radius > canvas.width) {
        circle.position.x = canvas.width - circle.radius; // Move the circle to the edge
        circle.velocity.x = -circle.velocity.x; // Reverse velocity
    }

    // Handle collision with top wall
    if (circle.position.y - circle.radius < 0) {
        circle.position.y = circle.radius; // Move the circle to the edge
        circle.velocity.y = -circle.velocity.y; // Reverse velocity
    }
    // Handle collision with bottom wall
    else if (circle.position.y + circle.radius > canvas.height) {
        circle.position.y = canvas.height - circle.radius; // Move the circle to the edge
        circle.velocity.y = -circle.velocity.y; // Reverse velocity
    }
};

export const distanceFormula = (object1, object2) => {
    return Math.sqrt(
        Math.pow(object1.position.x - object2.position.x, 2) +
        Math.pow(object1.position.y - object2.position.y, 2)
    );
};

export function isColliding(circle1, circle2) {
    const distance = distanceFormula(circle1, circle2);

    return distance < (circle1.radius + circle2.radius);
}

export function handleCollision(circle1, circle2) {
    const dx = circle2.position.x - circle1.position.x;
    const dy = circle2.position.y - circle1.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return; // Prevent division by zero

    const normalX = dx / distance;
    const normalY = dy / distance;

    const relativeVelocityX = circle2.velocity.x - circle1.velocity.x;
    const relativeVelocityY = circle2.velocity.y - circle1.velocity.y;

    const dotProduct = (relativeVelocityX * normalX) + (relativeVelocityY * normalY);

    // Assume equal mass for simplicity, otherwise use mass in the impulse calculation
    const restitution = 0.7; // Less than 1 for realistic collision
    const impulse = (2 * dotProduct) / (circle1.radius + circle2.radius);

    // Update velocities based on impulse
    circle1.velocity.x += impulse * normalX * restitution;
    circle1.velocity.y += impulse * normalY * restitution;
    circle2.velocity.x -= impulse * normalX * restitution;
    circle2.velocity.y -= impulse * normalY * restitution;

    // Move circles apart to prevent overlap
    const overlap = circle1.radius + circle2.radius - distance;
    circle1.position.x -= overlap * normalX / 2;
    circle1.position.y -= overlap * normalY / 2;
    circle2.position.x += overlap * normalX / 2;
    circle2.position.y += overlap * normalY / 2;
}

export function collision(circle1) {
    for (const circle2 of Circle.instances) {
        if (circle1 !== circle2 && isColliding(circle1, circle2)) {
            handleCollision(circle1, circle2);
        }
    }
}

export function mouseCollision(circle, mouse) {
    const mouseObj = { position: mouse, radius: 50, velocity: { x: mouse.vx, y: mouse.vy } }; // Increase radius to 20 for larger hitbox
    if (isColliding(circle, mouseObj)) {
        handleCollision(circle, mouseObj);

        // Move circle out of the mouse hitbox
        const dx = circle.position.x - mouse.x;
        const dy = circle.position.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const overlap = mouseObj.radius + circle.radius - distance;
        
        if (overlap > 0) {
            const normalX = dx / distance;
            const normalY = dy / distance;
            circle.position.x += normalX * overlap;
            circle.position.y += normalY * overlap;
        }
    }
}
