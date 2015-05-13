/* exported App, timedStages */
/* global Hammer, video, snapshot,localMediaStream:true,hdConstraints,ctx, canvas, slideTimer, Codebird */
/* jshint devel:true,unused:false */
var App = function App() {

  var app = {};
  var resetTimer;
  var overlayOpen = false;
  var opening = false;

  function tapHandler(e) {
      if (!opening) {
          opening = true;
          console.log('tapped');
          $(e.target).addClass('front');
          $('.blackout').fadeToggle();

          if (!overlayOpen) {
              app.openOverlay(e.target);
          } else {
              app.closeOverlay(e.target);
          }

      } else {
          return false;
      }

  }

  app.init = function() {
      $('.cabinet-item').hammer().bind("tap", tapHandler);
  };

  app.openOverlay = function(target) {
      setTimeout(function () {
          console.log('openoverlay');
          $(target).toggleClass('active');
          $('.overlay').toggleClass('active');
          opening = false;
          overlayOpen = true;
          $('.cabinet-item').removeClass('front');
      }, 500);
  };

  app.closeOverlay = function(target) {
      $(target).toggleClass('active');
      $('.overlay').toggleClass('active');
      console.log('closeoverlay');
      setTimeout(function () {
          opening = false;
          overlayOpen = false;
          $('.cabinet-item').removeClass('front');
      }, 1000);
  };

  app.toggleOverlay = function() {
      if (overlayOpen) {
          app.closeOverlay();
      } else {
          app.openOverlay();
      }
  };

  app.reset = function() {
  };

  app.resetTimer = function () {

    resetTimer = setInterval(function () {
      app.reset();
    }, 900000); // 15 minutes in milliseconds

  };

  return app;
};
