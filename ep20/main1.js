window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p0 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        },
        p1 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        },
        p2 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        },
        cp = {};

    cp.x = p1.x * 2 - (p0.x + p2.x) / 2;
    cp.y = p1.y * 2 - (p0.y + p2.y) / 2;

    drawPoint(p0);
    drawPoint(p1);
    drawPoint(p2);
    drawPoint(cp);
    
    context.strokeStyle = "lightgray";
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.lineTo(cp.x, cp.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();

    context.strokeStyle = "black";
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.quadraticCurveTo(cp.x, cp.y, p2.x, p2.y);
    context.stroke();

    function drawPoint(p) {
        context.beginPath();
        context.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
        context.fill();
    }

};


