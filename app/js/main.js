/* exported App, timedStages */
/* global $, Hammer, video, snapshot,localMediaStream:true,hdConstraints,ctx, canvas, slideTimer, Codebird */
/* jshint devel:true,unused:false */

var App = function App() {
  'use strict';
  var app = {};
  var resetTimer;
  var overlayOpen = false;
  var opening = false;
  var currentItem;
  var content = {
      'item-1': {
          'title': 'An Item Name',
          'content': '<p>Some content.</p>'
      },
      'item-2': {
          'title': 'An Item Name',
          'content': '<p>Some content.</p>'
      }
  };

  function tapHandler(e) {
      if (!opening) {
          opening = true;
          console.log('tapped');
          $(e.target).addClass('front');
          if (!overlayOpen) {
              $('.blackout').fadeIn();
              currentItem = e.target;
              app.openOverlay();
          } else {
              app.closeOverlay();
              currentItem = null;
          }

      } else {
          return false;
      }

  }

  app.init = function() {
      $('.cabinet-item').hammer().bind('tap', tapHandler);
      $('.back').hammer().bind('tap', app.closeOverlay);
  };

  app.openOverlay = function() {
      setTimeout(function () {
          console.log('openoverlay');
          $(currentItem).toggleClass('active');
          $('.overlay').toggleClass('active');
          opening = false;
          overlayOpen = true;
          $('.cabinet-item').removeClass('front');
          setTimeout(function () {
              $.each($('.content-row > *'), function(index, value) {
                  setTimeout(function () {
                      $(value).addClass('para-shown');
                  }, (index+2)*350);
              });
          }, 400);
      }, 400);
  };

  app.closeOverlay = function() {
      $(currentItem).toggleClass('active');
      $('.overlay').toggleClass('active');
      $('.content-row > *').removeClass('para-shown');
      console.log('closeoverlay');
      setTimeout(function () {
          opening = false;
          overlayOpen = false;
          $('.cabinet-item').removeClass('front');
          $('.blackout').fadeOut();
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
