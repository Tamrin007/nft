(function(global, doc, $, ns, undefined) {
  var colors = ['#4A89DC', '#ED5566', '#57A863'];
  var timers = [];

  $('.slot-button').on('click', function() {
    stopTimer($(this).attr('data-slot'));
    console.log(timers);
  });

  startTimer(0, 200);
  startTimer(1, 200);
  startTimer(2, 200);

  function startTimer(i, interval) {
    if (i > 3) return;
    timers[i] = setInterval(function() {
      switch (i) {
        case 0:
          $('.top').css('background-color', colors[Math.floor(Math.random()*3)]);
          break;
        case 1:
          $('.middle').css('background-color', colors[Math.floor(Math.random()*3)]);
          break;
        case 2:
          $('.bottom').css('background-color', colors[Math.floor(Math.random()*3)]);
          break
      }
    }, interval);
  }

  function stopTimer(i) {
    clearInterval(timers[i]);
  }

})(this, document, jQuery, this.nft);

