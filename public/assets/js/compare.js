$(function () {
    $(":checkbox[name='checkbox']").change(function () {
        if ($(":checkbox[name='checkbox']:checked").length == 2) {
            $(':checkbox:not(:checked)').prop('disabled', true);
            $('#compare').prop('disabled', false);
        }
        else
            $(':checkbox:not(:checked)').prop('disabled', false);
    });
    $("#compare").click(function () {
        var mobiles = $('input[name="checkbox"]:checked').map(function () {
            return this.value;
        }).get();
        var firstphone=mobiles[0];
        var secondphone=mobiles[1];
        var twophone={
            mobile1:firstphone,
            mobile2:secondphone
        }
        $.ajax("/compare", {
            'method': 'POST',
            data: twophone,
            'success': function() {
            
                    document.location = '/comparejoie';
            
            }
          }).then(
            function() {
            
              console.log("dgdagcdg");
              // Reload the page to get the updated list
              
            }
          );
        });
    });


