window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;
    
    var centerY = height * .5,
        centerX = width * .5,
        baseRadius = 100,
        offset = 50,
        speed = .1,
        angle = 0;
    
    render();

    function render() {
        var radius = baseRadius + Math.sin(angle) * offset;

        context.clearRect(0, 0 , width, height);
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        context.fill();

        angle += speed;

        requestAnimationFrame(render);
    }
};