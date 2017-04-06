window.onload = function() {
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    ball = {
      x: 100,
      y: 100
    };

  tweenX(ball, 800, 1000, easeInQuad);

  function tweenX(obj, targetX, duration, easingFunc) {
    var startX = obj.x,
      changeX = targetX - startX,
      startTime = new Date();
    update();

    function update() {
      var time = new Date() - startTime;
      if (time < duration) {
        obj.x = easingFunc(time, startX, changeX, duration);
        requestAnimationFrame(update);
      }
      else {
        time = duration;
        obj.x = easingFunc(time, startX, changeX, duration);
      }
      render();
    }
  }

  function render() {
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.arc(ball.x, ball.y, 20, 0, Math.PI * 2, false);
    context.fill();
  }

  //simple linear tweening - no easing
  //t: current time, b: beginning value, c: change in value, d: duration
  function linearTween(t, b, c, d) {
    return c * t / d + b;
  }

  //t and d can be in frames or (m)seconds ?
  function easeInQuad(t, b, c, d) {
    return c*(t/=d)*t + b;
  }

  function easeOutQuad(t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
  }

  function easeInOutQuad(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  }

};
