document.addEventListener("DOMContentLoaded", function() {

  var parallaxBackground = document.getElementById('parallax-wrapper');
  var mouseEffectImage = document.getElementById('hero-header');
  var parallaxRect = parallaxBackground.getBoundingClientRect();

  window.requestAnimationFrame = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(callback) { window.setTimeout(callback, 1000 / 60) };

  window.onscroll = function() {
    if (convertPercentage(window.scrollY) >= parallaxRect.top - 1000
    && convertPercentage(window.scrollY) <= parallaxRect.top + 600) {
      window.requestAnimationFrame(updatePicture)
    } else {
      parallaxBackground.style.backgroundPosition = "50% 20%";
    }
  }

  window.onmousemove = function() {
    var event = window.event;
    var maximumVertical = window.innerHeight * 0.9 / 2;
    var maximumHorizontal = window.innerWidth / 2;
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    var delimiter = 20;
    var percentageChange = 1;

    if (mouseY > maximumVertical * 2) { return; }

    var x = 50 - (mouseX - maximumHorizontal) * percentageChange / maximumHorizontal;
    var y = 100 - (mouseY - maximumVertical) * percentageChange / maximumVertical;

    mouseEffectImage.style.backgroundPosition = x + "% " + y + "%" ;
  }

  function updatePicture() {
    var percentage = convertPercentage(window.scrollY) / (parallaxRect.top - 400);
    parallaxBackground.style.backgroundPosition = "50% " + percentage * 30 + "%";
  }

  function convertPercentage(percentage) {
    if (typeof(percentage) === "string") {
      percentage = parseFloat(percentage.replace("%", ""));
      percentage = percentage * window.innerHeight / 100;
    }

    return percentage;
  }

  function convertPixels(pixels) {
    pixels = pixels * 100 / window.innerHeight;
    return pixels;
  }
});
