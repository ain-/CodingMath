window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p = particle.create(0, height / 2, 10, 0),
        fl = 300,
        shapes = [],
        numShapes = 100;
    
    for (var i = 0; i < numShapes; i += 1) {
        shapes[i] = {
            x: utils.randomRange(-1000, 1000),
            y: utils.randomRange(-1000, 1000),
            z: utils.randomRange(0, 10000),
            color: '#' + utils.randomRange(10, 99).toString().slice(0, 2) + 
                utils.randomRange(10, 99).toString().slice(0, 2) +
                utils.randomRange(10, 99).toString().slice(0, 2)
        };
    }

    context.translate(width / 2, height / 2);

    update();

    function update() {
        shapes.sort(zsort);
        context.clearRect(-width / 2, -height / 2, width, height);
        for (var i = 0; i < numShapes; i += 1) {
            var shape = shapes[i],
                perspective = fl / (fl + shape.z);
            
            context.save();
            context.scale(perspective, perspective);
            context.translate(shape.x, shape.y);
            context.fillStyle = shape.color;
            context.fillRect(-100, -100, 200, 200);
            context.restore();

            shape.z += 5;
            if (shape.z > 10000) {
                shape.z = 0;
            }
        }
        requestAnimationFrame(update);

    }

    function zsort(cardA, cardB) {
        return cardB.z - cardA.z;
    }


   

};


