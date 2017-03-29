window.onload = function() {
  var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      fl = 300,
      points = [],
      needsUpdate = true,
      centerZ = 1500;

  context.translate(width / 2, height / 2);

  points[0] = {x: -500, y: -500, z: 500 };
  points[1] = {x: 500, y: -500, z: 500 };
  points[2] = {x: 500, y: -500, z: -500 };
  points[3] = {x: -500, y: -500, z: -500 };
  points[4] = {x: -500, y: 500, z: 500 };
  points[5] = {x: 500, y: 500, z: 500 };
  points[6] = {x: 500, y: 500, z: -500 };
  points[7] = {x: -500, y: 500, z: -500 };

  function project() {
    for(var i = 0; i < points.length; i++) {
      var p = points[i],
        scale = fl / (fl + p.z + centerZ);
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

  function translateModel(x, y, z) {
    for (var i = 0; i < points.length; i++) {
      points[i].x += x;
      points[i].y += y;
      points[i].z += z;
    }
    needsUpdate = true;
  }

  function rotateX(angle) {
    var cos = Math.cos(angle),
      sin = Math.sin(angle);

    for (var i = 0; i < points.length; i++) {
      var p = points[i],
        y = p.y * cos - p.z * sin,
        z = p.z * cos + p.y * sin;
      p.y = y;
      p.z = z;
    }
    needsUpdate = true;
  }

  function rotateY(angle) {
    var cos = Math.cos(angle),
      sin = Math.sin(angle);

    for (var i = 0; i < points.length; i++) {
      var p = points[i],
        x = p.x * cos - p.z * sin,
        z = p.z * cos + p.x * sin;
      p.x = x;
      p.z = z;
    }
    needsUpdate = true;
  }

  function rotateZ(angle) {
    var cos = Math.cos(angle),
      sin = Math.sin(angle);

    for (var i = 0; i < points.length; i++) {
      var p = points[i],
        x = p.x * cos - p.y * sin,
        y = p.y * cos + p.x * sin;
      p.x = x;
      p.y = y;
    }
    needsUpdate = true;
  }

  document.body.addEventListener("keydown", function(event) {
    switch(event.keyCode) {
      case 37: // left
        if (event.ctrlKey) {
          rotateY(0.05);
        } else {
          translateModel(-20, 0, 0);
        }
        break;
      case 39: // right
        if (event.ctrlKey) {
          rotateY(-0.05);
        } else {
          translateModel(20, 0, 0);
        }
        break;
      case 38: // up
        if (event.shiftKey) {
          translateModel(0, 0, 20);
        }
        else if (event.ctrlKey) {
          rotateX(0.05);
        }
        else {
          translateModel(0, -20, 0);
        }
        break;
      case 40: // down
        if (event.shiftKey) {
          translateModel(0, 0, -20);
        }
        else if (event.ctrlKey) {
          rotateX(-0.05);
        }
        else {
          translateModel(0, 20, 0);
        }
        break;
      case 87: //w
        rotateZ(0.05);
        break;
      case 83: //s
        rotateZ(-0.05);
        break;
    }
  });

  update();

  function update() {
    if (needsUpdate) {
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
      needsUpdate = false;
    }

    requestAnimationFrame(update);
  }

};
