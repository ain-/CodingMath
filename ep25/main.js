window.onload = function() {
  var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      fl = 300,
      points = [];

  context.translate(width / 2, height / 2);

  points[0] = {x: -500, y: -500, z: 1000 };
  points[1] = {x: 500, y: -500, z: 1000 };
  points[2] = {x: 500, y: -500, z: 500 };
  points[3] = {x: -500, y: -500, z: 500 };
  points[4] = {x: -500, y: 500, z: 1000 };
  points[5] = {x: 500, y: 500, z: 1000 };
  points[6] = {x: 500, y: 500, z: 500 };
  points[7] = {x: -500, y: 500, z: 500 };

  function project() {
    for(var i = 0; i < points.length; i++) {
      var p = points[i],
        scale = fl / (fl + p.z);
      p.sx = p.x * scale;
      p.sy = p.y * scale;
    }
  }

  function drawLine() {
    var p = points[arguments[0]];
    context.moveTo(p.sx, p.sy);

    for(var i = 1; i < arguments.length; i++) {
      p = points[arguments[i]];
      context.lineTo(p.sx, p.sy);
    }
  }

  update();

  function update() {
    context.clearRect(-width / 2, -height / 2, width, height);
    project();

    context.beginPath();
    drawLine(0, 1, 2, 3, 0);
    drawLine(4, 5, 6, 7, 4);
    drawLine(0, 4);
    drawLine(1, 5);
    drawLine(2, 6);
    drawLine(3, 7);
    context.stroke();

    requestAnimationFrame(update);
  }

};
