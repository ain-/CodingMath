window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p = particle.create(0, height / 2, 10, 0),
        fl = 300,
        shapes = [],
        numShapes = 7,
        centerZ = 1000,
        radius = 1000,
        baseAngle = 0,
        rotationSpeed = 0.01;
    
    for (var i = 0; i < numShapes; i += 1) {
        var shape = {
            y: 0,
            angle: Math.PI * 2 / numShapes * i,
            color: '#' + utils.randomRange(10, 99).toString().slice(0, 2) + 
                utils.randomRange(10, 99).toString().slice(0, 2) +
                utils.randomRange(10, 99).toString().slice(0, 2)
        };
        shape.x = Math.cos(shape.angle + baseAngle) * radius;
        shape.z = centerZ + Math.sin(shape.angle + baseAngle) * radius;
        shapes.push(shape);

    }

    context.translate(width / 2, height / 2);

    document.body.addEventListener("mousemove", function(event) {
        rotationSpeed = (event.clientX - width / 2) * 0.00005;
    });

    update();

    function update() {
        baseAngle += rotationSpeed;
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

            shape.x = Math.cos(shape.angle + baseAngle) * radius;
            shape.z = centerZ + Math.sin(shape.angle + baseAngle) * radius;
        }
        requestAnimationFrame(update);

    }

    function zsort(cardA, cardB) {
        return cardB.z - cardA.z;
    }


   

};


