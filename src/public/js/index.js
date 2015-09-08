
$(function () {


  $.stellar({
    responsive: true,
    horizontalScrolling: false,
    hideDistantElements: false,// doesn't work for flow content
    positionProperty: 'transform'
  });


  // var i = 0;
  // var a = 5;
  // setInterval(function () {
  //   a = a > 0 && i > 89 ? -a : (a < 0 && i < 11 ? -a : a);
  //   i += a;
  //   document.querySelector('.top').style.background = 'radial-gradient(ellipse at ' + i + '% 100%, #FF5573 0%, purple 100%)';
  // }, 100);

});
