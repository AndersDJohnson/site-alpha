
$(function () {


  $.stellar({
    responsive: true,
    horizontalScrolling: false,
    hideDistantElements: false,// doesn't work for flow content
    positionProperty: 'transform'
  });

  var normalizeOffsets = function (e) {
    var offset = $(e.currentTarget).offset();
    return {
      left: e.pageX - offset.left,
      top: e.pageY - offset.top
    };
  };

  var ratioOffsets = function (e) {
    var normals = normalizeOffsets(e);
    var $target = $(e.currentTarget);
    return {
      left: normals.left / $target.width(),
      top: normals.top / $target.height()
    };
  };


  $('.top').on('mousemove', function (e) {
    var ratios = ratioOffsets(e);
    var left = ratios.left * 100;
    var top = ratios.top * 100;
    var $target = $(e.currentTarget);
    $target.css({
      background: 'radial-gradient(circle at ' + left + '% ' + top + '%, ' +
        '#FF5573 0%, purple 100%)'
    });
  });


  // var i = 0;
  // var a = 5;
  // setInterval(function () {
  //   a = a > 0 && i > 89 ? -a : (a < 0 && i < 11 ? -a : a);
  //   i += a;
  //   document.querySelector('.top').style.background = 'radial-gradient(ellipse at ' + i + '% 100%, #FF5573 0%, purple 100%)';
  // }, 100);

});
