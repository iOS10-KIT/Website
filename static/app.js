document.addEventListener("DOMContentLoaded", function() {

  var parallaxBackground = document.getElementById('parallax-wrapper');
  var parallaxHeight = parallaxBackground.clientHeight;
  var mouseEffectImage = document.getElementById('hero-header');
  var downloadButton = document.getElementById('download-button');

  downloadButton.addEventListener('click', trackDownloads);

  window.requestAnimationFrame = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(callback) { window.setTimeout(callback, 1000 / 60) };

  window.onscroll = function() {
    var box = parallaxBackground.getBoundingClientRect();
    var value = box.top - window.innerHeight;
    var delimiter = 100;

    if (value - delimiter < 0
      && value + parallaxHeight + window.innerHeight + delimiter > 0) {
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
    var percentageChange = 0.1;
    var x = 50 - (mouseX - maximumHorizontal) * percentageChange / maximumHorizontal;
    var y = 100 - (mouseY - maximumVertical) * percentageChange / maximumVertical;

    mouseEffectImage.style.backgroundPosition = x + "% " + y + "%" ;
  }

  function trackDownloads() {
    ga('send', 'event', {
      eventCategory: 'Download',
      eventAction: 'click'
    });
  }

  function updatePicture() {
    var box = parallaxBackground.getBoundingClientRect();
    var value = box.top - window.innerHeight;
    var bottom = parallaxHeight + window.innerHeight;
    var minimum = 20;
    var maximum = 60;
    var formula = (Math.abs(value) * maximum + minimum * bottom - minimum * Math.abs(value)) / bottom;

    parallaxBackground.style.backgroundPosition = "50% " + formula + "%";
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
