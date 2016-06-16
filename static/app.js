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
      parallaxBackground.style.backgroundPosition = "0% 20%";
    }
  }

  window.onmousemove = function() {
    var event = window.event;
    var maximumVertical = window.innerHeight * 0.9 / 2;
    var maximumHorizontal = window.innerWidth / 2;
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    if (maximumVertical - 100 >= mouseY && maximumVertical + 100 <= mouseY
    && maximumHorizontal - 100 >= mouseX && maximumHorizontal + 100 <= mouseX) {
      console.log('Center');
    }

    mouseEffectImage.style.backgroundPosition = "50% 100%";
  }

  function updatePicture() {
    var percentage = convertPercentage(window.scrollY) / (parallaxRect.top - 400);
    parallaxBackground.style.backgroundPosition = "0% " + percentage * 30 + "%";
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
