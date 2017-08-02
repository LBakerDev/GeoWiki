
$.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?')
            .done(function (area) {
                area1 = area.city;
            });
function search_url(pattern) {
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ pattern +"&format=json&callback=?"
    return url;
}

$(document).ready(function () {
   // var area1;
    $("#clearBtn").hide();
    $("body").removeClass("background");

    //find users current location
    $(".btn-primary").on("click", function (e) {
        //e.preventDefault();
        $(".jumbotron").fadeOut();
        $("body").addClass("background");
        //clears any previous search results
        $('#results').fadeOut();
        $("#clearBtn").show();
        
        var url = search_url(area1);
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: 'jsonp',
            success: function (data, status, jqXHR) {
                var resultElement="";
           
            for(var i=0; i<data[1].length; i++) {

                resultElement = resultElement + ("<div><div class='liResults'><a target='_blank'href="+data[3][i]+"><h2>" + data[1][i]+
                 "</h2><p>" + data[2][i] + "</p></a></div></div>");
            }
            $("#results").html(resultElement);
            $("#searchTerm").val("");
            $("#results").fadeIn();
            
            },
            error: function (errorMessage) {
            }
        });
    });
    //find user location based on user entry
    $("#proceedBtn").on("click", function (e) {
        
        $('#results').fadeOut();
        e.preventDefault();
        if($("#searchTerm").val()=="") {
            alert("Please enter a location");
            return false;
        }
         $(".jumbotron").fadeOut();
        var pattern = $("#searchTerm").val();
        var url = search_url(pattern);
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: 'jsonp',
            success: function (data, status, jqXHR) {
               
                var resultElement="";
           
            for(var i=0; i<data[1].length; i++) {
             // $.each(results, function (results, data) {
                  console.log(data[i]);
                resultElement = resultElement + ("<div><div class='liResults'><a target='_blank' href="+data[3][i]+"><h2>" + data[1][i]+
                 "</h2><p>" + data[2][i] + "</p></a></div></div>");
            }
            $("#results").html(resultElement);
            $("#results").fadeIn();
            $("body").addClass("background");            
            },
            error: function (errorMessage) {
            }
        });
        $("#clearBtn").fadeIn();
    });

    //clear results and remove clear button
    $("#clearBtn").on("click", function () {
        
        $("#clearBtn").fadeOut();
        $("#results").fadeOut();
        $(".jumbotron").fadeIn();
        $("body").removeClass("background");

    })

    $("#home").on("click", function () {
        $("#results").fadeOut();
        $(".jumbotron").fadeIn();
        $("#searchTerm").val("")
        $("body").removeClass("background");

        
    })
});
