
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

    //find users current location
    $("#btn1").on("click", function (e) {
        //e.preventDefault();
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
            },
            error: function (errorMessage) {
            }
        });
    });
    //find user location based on user entry
    $("#proceedBtn").on("click", function (e) {
        e.preventDefault();
        if($("#searchTerm").val()=="") {
            alert("Please enter a location");
            return false;
        }
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
            },
            error: function (errorMessage) {
            }
        });
        $("#clearBtn").show();
    });

    //clear results and remove clear button
    $("#clearBtn").on("click", function () {
        $(".liResults").remove();
        $("#clearBtn").fadeOut();

    })
});