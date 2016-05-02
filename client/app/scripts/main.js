'use strict';
(function() {

  $(function(){

    let prodUrl = "http://hipstercoding.appspot.com/api/";

    var sendPreference = function(preference){
      $.ajax({
        type: "POST",
        url: prodUrl+ "preference/insert",
        data: {
          "animal": preference.animal
        },
        success: function(data){
          var snackbarContainer = document.querySelector('#demo-snackbar-example');
          var data = {
            message: preference.funnyMessage,
            timeout: 2000,
            actionText: 'Undo'
          };
          snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
      });
    }

    var processData = function(data){
      var entries = data.entities.length;
      var dogs = 0;
      var cats = 0;
      data.entities.forEach(function(entry){
        if(entry.data.animal === "dog"){
          dogs++;
        }
        else {
          cats++;
        }
      });
      $('#loading-data').removeClass('is-active');
      printData(dogs,cats);
    }

    var printData = function(dogs, cats){
      var dogsP = dogs/(dogs+cats);
      var catsP = 1-dogsP;

      $('#dogs-bar').attr('height', dogsP);
      $('#cats-bar').attr('height', catsP);

      var dogsN = (100*dogsP).toFixed(2);
      var catsN = (100-dogsN).toFixed(2);

      $('#dogs-num').html(dogsN+"%");
      $('#cats-num').html(catsN+"%");

    }

    $('section.cards #dog a').click(function(e){
      e.stopPropagation();
      var preference = {
        animal : 'dog',
        funnyMessage : 'Los perritos molan mucho'
      };
      sendPreference(preference);
    });

    $('section.cards #cat a').click(function(e){
      e.stopPropagation();
      var preference = {
        animal : 'cat',
        funnyMessage : 'Los gatetes molan mucho'
      };
      sendPreference(preference);
    });

    $('section.cards #data a').click(function(e){
      e.stopPropagation();
      $('#loading-data').addClass('is-active');
      $.ajax({
        type: "GET",
        url: prodUrl+ "preference/getAll",
        success: function(data){
          processData(data);
        }
      });
    });

    // Do not delay load of page with async functionality: Wait for window load
    window.addEventListener('load',function(){


    }); // End of window load

  }); // End of jQuery context

})(); // End of use strict
