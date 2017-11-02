function update(deltaMs, state) {
    let graphics = state.graphics;
    graphics.clear();
    for(let circle of state.circles) {
        graphics.beginFill(circle.color);
        graphics.drawCircle(circle.x, circle.y, circle.r);
    }
}

function randomPosition(dimensionLength, margin) {
    return Math.random() * (dimensionLength - (margin * 2)) + margin;
}

function animateCirclePosition(circle, screen) {
    let animation = anime({
        targets: circle,
        x: randomPosition(screen.width, circle.r),
        y: randomPosition(screen.height, circle.r),
        easing: 'easeOutSine',
        duration: Math.floor(Math.random() * 500 + 1500),
        loop: false,
        autoplay: false,
    });
    animation.finished.then(function() {
        animateCirclePosition(circle, screen).play();
    });
    return animation;
}

function initializeAnimations(circles, screen) {
    for(let circle of circles) {
        let animation = animateCirclePosition(circle, screen);
        animation.seek(Math.random() * animation.duration);
        animation.play();
    }
}

function generateCircles(count, screen) {
    let result = [];
    const r = 20;
    for(let i = 0; i < count; i++) {
        const circle = {
            x: randomPosition(screen.width, r),
            y: randomPosition(screen.height, r),
            r: r,
            color: anime.random(0x000000, 0xFFFFFF)
        };
        result.push(circle);
    }
    return result;
}

(function() {
    let app = new PIXI.Application(
        window.innerWidth,
        window.innerHeight,
        {
            view: document.getElementById("main"),
            autoResize: true,
            antialias: true
        }
    );

    let graphics = new PIXI.Graphics();
    graphics.beginFill(0xFF0000);
    graphics.drawCircle(100, 100, 90);
    app.stage.addChild(graphics);

    const circleCount = 70;
    let circles = generateCircles(circleCount, app.screen);
    initializeAnimations(circles, app.screen);
    let state = {
        app: app,
        circles: circles,
        graphics: graphics,
    };
    app.ticker.add(function(delta){
        update(delta, state);
    });
})();