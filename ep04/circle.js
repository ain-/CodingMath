window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;
    
    var centerY = height / 2,
        centerX = width / 2,
        radius = 200,    
        angle = 0,
        numObjects = 10,
        slice = Math.PI * 2 / numObjects,
        x, y;

    for (var i = 0; i < numObjects; i += 1) {
        angle = i * slice;
        x = centerX + Math.cos(angle) * radius;
        y = centerY + Math.sin(angle) * radius;
        context.beginPath();
        context.arc(x, y, 10, 0, Math.PI * 2, false);
        context.fill();
    }

};