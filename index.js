/*(function(){
  $('.menu-left').click(function(){
    
    $('.intro').toggleClass('active')
  /*   $('section').toggleClass('active')
    $('#menu-left').toggleClass('active')
   
  })
 
})()
$('.menu-left').on('click', function() {
	$('.intro').toggleClass('abrir');
});*/

$(function() {
  var Accordion = function(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var links = this.el.find(".content h5");
    // Evento
    links.on("click", { el: this.el, multiple: this.multiple }, this.dropdown);
  };

  Accordion.prototype.dropdown = function(e) {
    var $el = e.data.el;
    ($this = $(this)), ($next = $this.next());

    $next.slideToggle();
    $this.parent().toggleClass("open");

    if (!e.data.multiple) {
      $el
        .find(".content li")
        .not($next)
        .slideUp()
        .parent()
        .removeClass("open");
    }
  };

  var accordion = new Accordion($("#menu-left"), true);
});
$(document).ready(function(e){
  $('#itemObjetivos').on('click', function(){
    $('#content').load('objetivos.html')
  });
});
$(document).ready(function(e){
  $('#itemActividad').on('click', function(){
    $('#content').load('actividad.html')
  });
});
$(document).ready(function(e){
  $('#itemTema1').on('click', function(){
    $('#content').load('tema1.html')
  });
});

$(document).ready(function() {
  $('.has-animation').each(function(index) {
    $(this).delay($(this).data('delay')).queue(function(){
      $(this).addClass('animate-in');
    });
  });
});

 (function(){
            'use strict';

            var $mainButton = $(".main-button"),
                $closeButton = $(".close-button"),
                $buttonWrapper = $(".button-wrapper"),
                $ripple = $(".ripple"),
                $layer = $(".layered-content");

            $mainButton.on("click", function(){
                $buttonWrapper.addClass("clicked").delay(900).queue(function(next){
                    $layer.addClass("active");
                    next();
                });
            });

            $closeButton.on("click", function(){
                $layer.removeClass("active");
                $buttonWrapper.removeClass("clicked");
            });
            
        })();