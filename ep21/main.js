window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        targetCanvas = document.getElementById("target"),
        targetContext = targetCanvas.getContext("2d"),
        width = canvas.width = targetCanvas.width = window.innerWidth,
        height = canvas.height = targetCanvas.width = window.innerHeight,
        p = particle.create(0, height / 2, 10, 0);

    targetContext.beginPath();
    targetContext.arc(width / 2, height / 2, 200, 0, Math.PI * 2, false);
    targetContext.fill();

};


