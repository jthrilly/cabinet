/* exported App, timedStages */
/* global global, require, $, Hammer, video, snapshot,localMediaStream:true,hdConstraints,ctx, canvas, slideTimer, Codebird */
/* jshint devel:true,unused:false */

var App = function App() {
  'use strict';
  var app = {};
  var resetTimer;
  var overlayOpen = false;
  var opening = false;
  var animating = false;
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
      if (!animating) {
          if (!opening) {
              opening = true;
              if (!overlayOpen) {
                  console.log($(e.target).attr('class').split(' '));
                  currentItem = $(e.target).attr('class').split(' ').pop(); // This will put the last class name (item-n) in the currentItem var. Not a jQuery object though!
                  console.log('current item is:'+ currentItem);
                  app.openOverlay();
              } else {
                  app.closeOverlay();
                  currentItem = null;
              }

          } else {
              return false;
          }
      }
  }

  app.init = function() {
      $('.cabinet-item').hammer().bind('tap', tapHandler);
      $('.back').hammer().bind('tap', app.closeOverlay);

      if (typeof global !== 'undefined') {
          global.gui = require('nw.gui');
          global.gui.Window.get().enterFullscreen();
      }

  };

  app.openOverlay = function() {
      if (!animating) {
          $('.blackout').fadeIn();
          $('.'+currentItem).addClass('front');
          animating = true;
          console.log('loading content.');
          // Ajax load the item content into the container div
          $('.item-content').load('../items/'+currentItem+'.html', function() {
              $('.swiper-container').hide();
              // Once we are finished loading, set up the animation stuff
              $('.'+currentItem).addClass('active');
              $('.overlay').addClass('active');
              opening = false;
              overlayOpen = true;
              setTimeout(function () {
                  $('.'+currentItem).fadeOut();
                  $('.swiper-container').fadeIn();
                  $.each($('.content-row > *'), function(index, value) {
                      setTimeout(function () {
                          $(value).addClass('para-shown');
                      }, (index+2)*250);
                  });
                  setTimeout(function () {
                      animating = false;
                  }, ($('.content-row > *').length+2)*250);

              }, 1000);
          });
      }

  };

  app.closeOverlay = function() {
      if(!animating) {
          animating = true;
          $('.swiper-container').hide();
          $('.'+currentItem).fadeIn();
          $('.'+currentItem).removeClass('active');
          $('.overlay').removeClass('active');
          $('.content-row > *').removeClass('para-shown');
          setTimeout(function () {
              opening = false;
              overlayOpen = false;
              $.when($('.blackout').fadeOut()).done(function(){
                  $('.cabinet-item').removeClass('front');
                  $('.item-content').empty();
                  animating = false;
              });
          }, 1000);
      }

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
