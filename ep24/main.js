window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p = particle.create(0, height / 2, 10, 0),
        fl = 300,
        points = [],
        numPoints = 200,
        centerZ = 2000,
        radius = 1000,
        baseAngle = 0,
        rotationSpeed = 0.01;
    
    for (var i = 0; i < numPoints; i += 1) {
        var point = {
            y: 0,
            angle: 0.2 * i,
            y: 2000 - 4000 / numPoints * i,
            color: '#' + utils.randomRange(10, 99).toString().slice(0, 2) + 
                utils.randomRange(10, 99).toString().slice(0, 2) +
                utils.randomRange(10, 99).toString().slice(0, 2)
        };
        point.x = Math.cos(point.angle + baseAngle) * radius;
        point.z = centerZ + Math.sin(point.angle + baseAngle) * radius;
        points.push(point);

    }

    context.translate(width / 2, height / 2);

    document.body.addEventListener("mousemove", function(event) {
        rotationSpeed = (event.clientX - width / 2) * 0.00005;
    });

    update();

    function update() {
        baseAngle += rotationSpeed;
        points.sort(zsort);
        context.clearRect(-width / 2, -height / 2, width, height);
        for (var i = 0; i < numPoints; i += 1) {
            var point = points[i],
                perspective = fl / (fl + point.z);
            
            context.save();
            context.scale(perspective, perspective);
            context.translate(point.x, point.y);
            context.fillStyle = point.color;
            context.beginPath();
            context.arc(0, 0, 40, 0, Math.PI * 2, false);
            context.fill();
            context.restore();

            point.x = Math.cos(point.angle + baseAngle) * radius;
            point.z = centerZ + Math.sin(point.angle + baseAngle) * radius;
        }
        requestAnimationFrame(update);

    }

    function zsort(cardA, cardB) {
        return cardB.z - cardA.z;
    }


   

};


