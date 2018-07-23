/*var bodyW = $(window).height();

$('body').height(bodyW);

$(window).resize(function() {
  var bodyW = $(window).height();
$('body').height(bodyM);  
});*/

 $('.tabs a').click(function(){
  $this = $(this);
 

  $('.panel').hide();
  $('.tabs').removeClass('active').addClass('inactive');
  $this.addClass('active').blur();
  
  var panelContainerColor = $this.css('background-color');

  $('.panelContainer').css({backgroundColor: panelContainerColor});
  
  var panel = $this.attr('href');
  
  $(panel).fadeIn(350);
  
  return false;
 
});//end click

$('.tabs li:third a').click();

(function(){
  var images = [],
  fo = {
    init : function(){
      //detectar todas las instancias que tengan la clase .fo
      var wrapper = document.getElementById('content'),
      photos = document.querySelectorAll(".picture")

      for(var i = 0; i < photos.length; i++){
        
        var opts = photos[i].getAttribute('data-options'),
        imgAttrs = {
          id : i,
          src : photos[i].getAttribute('href'),
          title : photos[i].getAttribute('alt'),
          options : opts
        }

        console.log(imgAttrs)

        images.push(imgAttrs)

      }
      var content = '<ul style="margin: 0 -42px">'
      for(var i = 0; i < images.length; i++){

        //detectar si es imagen ó video
        //?autoplay=1
        //console.log(fo.getExtension(images[i].src).indexOf('.jpg') > -1)
        content += '<li class="fancy-image">'
        if(fo.getExtension(images[i].src)[0].indexOf('jpg') > -1 || fo.getExtension(images[i].src)[0].indexOf('png') > -1 || fo.getExtension(images[i].src)[0].indexOf('gif') > -1){
          content += '<a href="#image-'+i+'" onclick="fo.viewPhoto('+i+',\'photo\')"><img src="'+images[i].src+'" /><h3>'+images[i].title+'</h3></a>'
        }else{
          content += '<a href="#video-'+i+'" onclick="fo.viewPhoto('+i+',\'video\')"><img src="'+fo.getYTThumbnail(images[i].src,'big')+'" /><h3>'+images[i].title+'</h3></a>'
        }
        content += '</li>'
      }
      content += '</ul>'

      wrapper.innerHTML = content;
      wrapper.style.display = 'block'
      
    },
    getYTThumbnail : function(url,size){
        if(url === null){ return ""; }

        size = (size === null) ? "big" : size;
        var vid;
        var results;

        results = url.match("[\\?&]v=([^&#]*)");

        vid = ( results === null ) ? url : results[1];

        if(size == "small"){
          return "https://img.youtube.com/vi/"+vid+"/2.jpg";
        }else {
          return "https://img.youtube.com/vi/"+vid+"/0.jpg";
        }
    },
    getExtension : function(file){
      return (/[.]/.exec(file)) ? /[^.]+$/.exec(file) : undefined;
    },
    transformYTURL : function(url){
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    },
    viewPhoto : function(id,type){

      var overlay = document.createElement('div'),
      overlayContent = document.createElement('div'),
      photo = document.createElement('img'),
      iframe = document.createElement('iframe'),
      title = document.createElement('h3'),
      closeBtn = document.createElement('a'),
      closeIcon = document.createElement('i'),
      textTitle = document.createTextNode(images[id].title)//<images[id]

      if(type == 'photo'){
        photo.setAttribute('src',images[id].src)
        photo.setAttribute('title',images[id].title)
        title.appendChild(textTitle)
        overlay.setAttribute('class','overlay')
        overlayContent.setAttribute('class','overlay-content')
        closeIcon.setAttribute('class','close icon ion-close-round')
        closeBtn.appendChild(closeIcon)


        overlayContent.appendChild(closeBtn)
        overlayContent.appendChild(photo)
        overlayContent.appendChild(title)

        overlayContent.style.width = 'auto'

        if(window.innerWidth <= 480){
          overlayContent.style.width = '80%'
        }

      }else{
        //console.log(JSON.parse(images[id].options))
        title.appendChild(textTitle)
        overlay.setAttribute('class','overlay')
        overlayContent.setAttribute('class','overlay-content')
        closeIcon.setAttribute('class','close icon ion-close-round')
        closeBtn.appendChild(closeIcon)
        iframe.setAttribute('src','https://www.youtube.com/embed/'+fo.transformYTURL(images[id].src)+'?autoplay='+JSON.parse(images[id].options).autoPlay)


        overlayContent.appendChild(closeBtn)
        overlayContent.appendChild(iframe)
        overlayContent.appendChild(title)

        overlayContent.style.width = '80%'

        /*if(window.innerWidth > 400){
          overlayContent.style.height = '80%'
        }*/

      }

      if(images.length > 0){
        //mostrar flechas de anterior siguient
        var anterior = document.createElement('a'),
        siguiente = document.createElement('a'),
        flechaAnt = document.createElement('i'),
        flechaSig = document.createElement('i')

        flechaAnt.setAttribute('class','prev icon ion-chevron-left')
        flechaSig.setAttribute('class','next icon ion-chevron-right')

        anterior.appendChild(flechaAnt)
        siguiente.appendChild(flechaSig)

        overlayContent.appendChild(anterior)
        overlayContent.appendChild(siguiente)

        if(id == 0){
          flechaAnt.remove()
        }else{
          if(id+1 == images.length){
            flechaSig.remove()
          }
        }

        console.log(id,images.length)

        flechaAnt.addEventListener("click", function(){
          //cambiar de elemento
          if(id <= images.length){
            //anterior
            //buscar el elemento anterior
            var opts = JSON.parse(images[id-1].options)
            if(null == opts){
              overlay.remove()
              fo.viewPhoto(id-1,'photo')
            }else{
              overlay.remove()
              fo.viewPhoto(id-1,'video')
            }
            //console.log(id,opts)
            //fo.viewPhoto(id-1,type)
          }
        })

        flechaSig.addEventListener("click", function(){
          //cambiar de elemento
          //buscar
          var opts = JSON.parse(images[id+1].options)
          console.log(opts)
          if(null == opts){
            overlay.remove()
            fo.viewPhoto(id+1,'photo')
          }else{
            overlay.remove()
            fo.viewPhoto(id+1,'video')
          }
        })
      }

      overlay.appendChild(overlayContent)
      
      overlay.style.opacity = 0;

      document.body.appendChild(overlay)

      setTimeout(function(){
        overlay.style.opacity = 1;
      },100)
      
      //evento clic de cerrar
      closeBtn.addEventListener("click", function(){
        //eliminar el overlay creado
        overlay.style.opacity = 0;
        setTimeout(function(){
          overlay.remove()
        },250)
        
      })

    }
  }

  window.fo = fo

})();

(function(exports) {
    
    'use strict';
    
    function PinterestGrid(options) {
       this.settings = Object.assign({
           delay: 100,
           shorterFirst: true,
           gutter: 6
       }, options);
       this.loaded = false;
       this.transform = _getTransformProperty();
       
       // Objetos del DOM
       this.$container = (options.container instanceof Node) 
            ? options.container 
            : document.querySelector(options.container);
       if (!this.$container) return false;
       
       this.$itemCollection = (options.item instanceof NodeList)
            ? options.item
            : this.$container.querySelectorAll(options.item);
       if (!this.$itemCollection || this.$itemCollection.length === 0) return false;
       
       if (!this.loaded) {
           return this.init();
       }
    }

    PinterestGrid.prototype.init = function() {
        // 1. Cambiar Estado
        this.loaded = true;
        
        // 2. Resetear Contenedor
        this.$container.style.width = '';
        
        // 3. Medidas y calculo de columnas
        var gutter = parseInt(this.settings.gutter);
        var containerWidth = this.$container.getBoundingClientRect().width;
        var itemsWidth = this.$itemCollection[0].getBoundingClientRect().width + gutter;
        var cols = Math.max(Math.floor((containerWidth - gutter) / itemsWidth), 1);
        
        // 4. Nuevo tamaño de contenedor
        containerWidth = (itemsWidth * cols + gutter) + 'px';
        this.$container.style.width = containerWidth;
        this.$container.style.position = 'relative';
        
        // 5. Posiciones de primera fila
        var itemsPosY = [];
        var itemsPosX = [];
        for (var i = 0; i < cols; i++) {
            itemsPosX.push(i * itemsWidth + gutter);
            itemsPosY.push(gutter);
        }
        
        // 6. Recorrer elementos
        Array.from(this.$itemCollection).forEach(function(item, i) {
            var firstItem, itemIndex, posX, posY;
            
            if (this.settings.shorterFirst) {
                // 7.a Espacio mas pequeño primero
                firstItem = itemsPosY.slice(0).sort(function(a, b){ return a - b }).shift();
                itemIndex = itemsPosY.indexOf(firstItem);
            } else {
                // 7.b Order natural
                itemIndex = i % cols;
            }
            
            posX = itemsPosX[itemIndex];
            posY = itemsPosY[itemIndex];
            
            // 8. Posicionamiento
            item.style.position = 'absolute';
            item.style.webkitBackfaceVisibility = item.style.backfaceVisibility = 'hidden';
            item.style[this.transform] = 'translate3d(' + posX + 'px, ' + posY + 'px, 0)';
            
            // 9. Actualización de posición eje Y
            itemsPosY[itemIndex] += item.getBoundingClientRect().height + gutter;
            
            // 10. Asignación de clases
            if (!/loaded/.test(item.className)) {
                setTimeout(function() {
                    item.classList.add(item.className.split(' ')[0] + '--loaded');
                }, (parseInt(this.settings.delay) * i));
            }
            
        }.bind(this));
        
        // 11. Altura del contenedor
        var containerHeight = itemsPosY.slice(0).sort(function(a, b) { return a - b }).pop();
        this.$container.style.height = containerHeight + 'px';
        
        // 12. Clase del contenedor
        if (!/loaded/.test(this.$container.className)) {
            this.$container.classList.add(this.$container.className.split(' ')[0] + '--loaded');
        }
        
        // 13. Ejecución de callback
        if (typeof this.settings.callback === 'function') {
            this.settings.callback(this.$itemCollection);
        }
    };


    function _getTransformProperty() {
        var style = document.createElement('div').style;
        var transform;
        var vendorProp;

        if (undefined !== style[vendorProp = 'webkitTransform']) {
            transform = vendorProp;
        }

        if (undefined !== style[vendorProp = 'msTransform']) {
            transform = vendorProp;
        }

        if (undefined !== style[vendorProp = 'transform']) {
            transform = vendorProp;
        }

        return transform;
    }

    
    // AMD
    if (typeof define === 'function' && define.amd) {
        define(function(){ return PinterestGrid });
    }
    
    // CommonJS
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = PinterestGrid;
    }
    
    // Global
    else {
        exports.PinterestGrid = PinterestGrid;
    }
} (this));

 (function () {
        'use strict';
        
        window.onload = function(){
        fo.init()

       //setTimeout(function(){

        // 1. Plugin
            var grid = new PinterestGrid({
                container: '.fancy-overlay',
                item: '.fancy-image',
                gutter: 10,
                delay: 200
            });
            
            // 2. Redimensionamiento
            window.addEventListener('resize', function() {
                grid.init();
                console.log('here')
            });

            // 3. Reajuste al cargar imagenes
            Array.from(document.querySelectorAll('.fancy-image img')).forEach(function(item) {
                item.addEventListener('load', function() {
                    grid.init();
                    item.removeEventListener('load');
                }, false);
            });

      // },100)
    }
        
    } ());


