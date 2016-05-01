'use strict';
(function() {

  $(function(){

    $('section.cards #dog a').click(function(e){
      e.stopPropagation();
      $.ajax({
        type: "POST",
        url: "http://hipstercoding.appspot.com/api/preference/insert",
        data: {
          "animal": "dog"
        },
        success: function(data){
          var snackbarContainer = document.querySelector('#demo-snackbar-example');
          var data = {
            message: 'Los perritos molan mucho',
            timeout: 2000,
            actionText: 'Undo'
          };
          snackbarContainer.MaterialSnackbar.showSnackbar(data);
        },
      });
    });

    $('section.cards #cat a').click(function(e){
      e.stopPropagation();
      $.ajax({
        type: "POST",
        url: "http://hipstercoding.appspot.com/api/preference/insert",
        data: {
          "animal": "cat"
        },
        success: function(data){
          var snackbarContainer = document.querySelector('#demo-snackbar-example');
          var data = {
            message: 'Los gatetes molan mucho',
            timeout: 2000,
            actionText: 'Undo'
          };
          snackbarContainer.MaterialSnackbar.showSnackbar(data);
        },
      });
    });

    // Do not delay load of page with async functionality: Wait for window load
    window.addEventListener('load',function(){


    }); // End of window load

  }); // End of jQuery context

})(); // End of use strict
