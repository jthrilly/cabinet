/* exported App, timedStages */
/* global Hammer, video, snapshot,localMediaStream:true,hdConstraints,ctx, canvas, slideTimer, Codebird */
/* jshint devel:true,unused:false */
var App = function App() {

  var app = {};
  var resetTimer;
  var overlayOpen = false;

  function tapHandler() {
    console.log('yo');
  }

  app.init = function() {

      $('.item-1').hammer().bind("tap", tapHandler);

      app.resetTimer();

  };

  app.showItem = function(item) {

  };


  app.openOverlay = function() {

  };

  app.closeOverlay = function() {

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
