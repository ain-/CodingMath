window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particleA = particle.create(utils.randomRange(0, width),
                                    utils.randomRange(0, height),
                                    utils.randomRange(0, 50),
                                    utils.randomRange(0, Math.PI * 2)),
        particleB = particle.create(utils.randomRange(0, width),
                                    utils.randomRange(0, height),
                                    utils.randomRange(0, 50),
                                    utils.randomRange(0, Math.PI * 2)),
        k = 0.01,
        separation = 100;

    particleA.friction = 0.9;
    particleA.radius = 20;  

    particleB.friction = 0.9;
    particleB.radius = 20; 

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        particleA.update();
        particleB.update();

        context.beginPath();
        context.arc(particleA.position.getX(), particleA.position.getY(),
                    particleA.radius, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.arc(particleB.position.getX(), particleB.position.getY(),
                    particleB.radius, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.moveTo(particleA.position.getX(), particleA.position.getY());
        context.lineTo(particleB.position.getX(), particleB.position.getY());
        context.stroke();

        requestAnimationFrame(update);
    }

};


