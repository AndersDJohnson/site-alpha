
$(function () {



  $('body').on('click', '.work-item .trigger', function () {
    $(this).closest('.work-item').toggleClass('flipped');
  });

  $('body').on('mouseenter', '.work-item', function () {
    $(this).addClass('flipped');
  });
  $('body').on('mouseleave', '.work-item', function () {
    $(this).removeClass('flipped');
  });


  $.stellar({
    responsive: true,
    horizontalScrolling: false,
    hideDistantElements: false,// doesn't work for flow content
    positionProperty: 'transform'
  });

  var normalizeOffsets = function (e, $el) {
    $el = $el || $(e.currentTarget);
    var offset = $el.offset();
    return {
      left: e.pageX - offset.left,
      top: e.pageY - offset.top
    };
  };

  var ratioOffsets = function (e, $el) {
    var normals = normalizeOffsets(e, $el);
    $el = $el || $(e.currentTarget);
    return {
      left: normals.left / $el.width(),
      top: normals.top / $el.height()
    };
  };

  var constrain = function (val, min, max) {
    return Math.max(min, Math.min(max, val));
  };


  var $top = $('.top');
  var $body = $('body');

  $body.on('mousemove', function (e) {
    var ratiosBody = ratioOffsets(e);
    var ratios = ratioOffsets(e, $top);

    var left = ratiosBody.left;
    var top = ratios.top;

    top = constrain(top, 0, 1);
    left = constrain(left, 0, 1);

    var percLeft = left * 100;
    var percTop = top * 100;

    var factor = -8;

    var shadowLeft = (left - 0.5) * factor;
    var shadowTop = (top - 0.5) * factor;
    $top.css({
      background: 'radial-gradient(circle at ' + percLeft + '% ' + percTop + '%, ' +
        '#FF5573 0%, purple 100%)',
      'text-shadow': shadowLeft + 'px ' + shadowTop + 'px ' +
        '8px rgba(0,0,0,0.5)'
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
