document.addEventListener("DOMContentLoaded", function() {

  var parallaxBackground = document.getElementById('parallax-wrapper');
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
